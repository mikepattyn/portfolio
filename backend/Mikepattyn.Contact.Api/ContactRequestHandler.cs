using System.Net;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;
using Mikepattyn.Email;

namespace Mikepattyn.Contact.Api;

public sealed class ContactRequestHandler
{
    private readonly IEmailSender _emailSender;
    private readonly ITurnstileVerifier _turnstileVerifier;
    private readonly string _deliveryAddress;

    public ContactRequestHandler(
        IEmailSender emailSender,
        ITurnstileVerifier turnstileVerifier,
        string deliveryAddress
    )
    {
        _emailSender = emailSender;
        _turnstileVerifier = turnstileVerifier;
        _deliveryAddress = deliveryAddress;
    }

    public async Task<APIGatewayProxyResponse> HandleAsync(APIGatewayProxyRequest request)
    {
        if (request.HttpMethod == "OPTIONS")
        {
            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.NoContent,
                Headers = ApiGatewayJsonResponse.CreateHeaders(),
            };
        }

        if (!string.Equals(request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
        {
            return ApiGatewayJsonResponse.Create(
                HttpStatusCode.MethodNotAllowed,
                new { message = "Method not allowed" }
            );
        }

        var payload = JsonSerializer.Deserialize<ContactFormPayload>(
            request.Body ?? "{}",
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );

        if (payload is null
            || string.IsNullOrWhiteSpace(payload.Email)
            || string.IsNullOrWhiteSpace(payload.Message)
            || string.IsNullOrWhiteSpace(payload.TurnstileToken))
        {
            return ApiGatewayJsonResponse.Create(
                HttpStatusCode.BadRequest,
                new { message = "Invalid contact payload" }
            );
        }

        if (!string.IsNullOrWhiteSpace(payload.Honey))
        {
            return ApiGatewayJsonResponse.Create(
                HttpStatusCode.BadRequest,
                new { message = "Invalid contact payload" }
            );
        }

        // Behind CloudFront, SourceIp is a CloudFront edge address, not the visitor who
        // solved the challenge; a mismatched remoteip makes Turnstile reject valid tokens.
        var turnstileValid = await _turnstileVerifier.VerifyAsync(payload.TurnstileToken, remoteIp: null);
        if (!turnstileValid)
        {
            return ApiGatewayJsonResponse.Create(
                HttpStatusCode.Forbidden,
                new { message = "Turnstile verification failed" }
            );
        }

        await _emailSender.SendAsync(
            new EmailSendRequest(
                TemplateId: "contact",
                Data: new Dictionary<string, string>
                {
                    ["name"] = payload.Name ?? string.Empty,
                    ["email"] = payload.Email,
                    ["message"] = payload.Message,
                },
                To: _deliveryAddress,
                ReplyTo: payload.Email
            )
        );

        return ApiGatewayJsonResponse.Create(
            HttpStatusCode.Accepted,
            new { message = "Message sent" }
        );
    }

    private sealed class ContactFormPayload
    {
        public string? Name { get; init; }
        public string? Email { get; init; }
        public string? Message { get; init; }

        [System.Text.Json.Serialization.JsonPropertyName("turnstileToken")]
        public string? TurnstileToken { get; init; }

        [System.Text.Json.Serialization.JsonPropertyName("_honey")]
        public string? Honey { get; init; }
    }
}
