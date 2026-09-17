using System.Net.Http.Headers;
using System.Text.Json;

namespace Mikepattyn.Contact.Api;

public sealed class TurnstileVerifier : ITurnstileVerifier
{
    private const string SiteVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    private readonly HttpClient _httpClient;
    private readonly string _secret;

    public TurnstileVerifier(HttpClient httpClient, string secret)
    {
        _httpClient = httpClient;
        _secret = secret;
    }

    public async Task<bool> VerifyAsync(
        string token,
        string? remoteIp,
        CancellationToken cancellationToken = default
    )
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            return false;
        }

        using var content = new FormUrlEncodedContent(BuildFormFields(token, remoteIp));
        content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

        using var response = await _httpClient.PostAsync(SiteVerifyUrl, content, cancellationToken);
        if (!response.IsSuccessStatusCode)
        {
            return false;
        }

        await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
        var payload = await JsonSerializer.DeserializeAsync<TurnstileSiteVerifyResponse>(
            stream,
            cancellationToken: cancellationToken
        );

        return payload?.Success == true;
    }

    private IEnumerable<KeyValuePair<string, string>> BuildFormFields(string token, string? remoteIp)
    {
        yield return new KeyValuePair<string, string>("secret", _secret);
        yield return new KeyValuePair<string, string>("response", token);

        if (!string.IsNullOrWhiteSpace(remoteIp))
        {
            yield return new KeyValuePair<string, string>("remoteip", remoteIp);
        }
    }

    private sealed record TurnstileSiteVerifyResponse(
        [property: System.Text.Json.Serialization.JsonPropertyName("success")] bool Success
    );
}

internal static class TurnstileSecretResolver
{
    internal static string Resolve(ISecretReader? secretReader = null)
    {
        var directSecret = Environment.GetEnvironmentVariable("TurnstileSecret");
        if (!string.IsNullOrWhiteSpace(directSecret))
        {
            return directSecret;
        }

        var secretArn = Environment.GetEnvironmentVariable("TurnstileSecretArn");
        if (string.IsNullOrWhiteSpace(secretArn))
        {
            throw new InvalidOperationException(
                "Configure TurnstileSecret or TurnstileSecretArn."
            );
        }

        secretReader ??= new SecretsManagerSecretReader();
        return secretReader.ReadSecret(secretArn);
    }
}
