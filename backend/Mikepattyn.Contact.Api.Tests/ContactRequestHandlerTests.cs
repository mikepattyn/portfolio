using System.Net;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;
using Mikepattyn.Contact.Api;
using Mikepattyn.Email;

namespace Mikepattyn.Contact.Api.Tests;

public class ContactRequestHandlerTests
{
    [Fact]
    public async Task HandleAsync_ReturnsAcceptedAndSendsEmail_WhenRequestIsValid()
    {
        var sender = new RecordingEmailSender();
        var turnstile = new FakeTurnstileVerifier(success: true);
        var handler = new ContactRequestHandler(sender, turnstile, deliveryAddress: "info@mikepattyn.nl");

        var response = await handler.HandleAsync(CreateRequest(new
        {
            name = "Alex",
            email = "alex@example.com",
            message = "Hello",
            turnstileToken = "valid-token",
            _honey = "",
        }));

        Assert.Equal((int)HttpStatusCode.Accepted, response.StatusCode);
        var sent = Assert.Single(sender.Requests);
        Assert.Equal("contact", sent.TemplateId);
        Assert.Equal("info@mikepattyn.nl", sent.To);
        Assert.Equal("alex@example.com", sent.ReplyTo);
        Assert.Equal("Alex", sent.Data["name"]);
    }

    [Fact]
    public async Task HandleAsync_ReturnsBadRequest_WhenHoneypotFilled()
    {
        var handler = new ContactRequestHandler(
            new RecordingEmailSender(),
            new FakeTurnstileVerifier(success: true),
            deliveryAddress: "info@mikepattyn.nl"
        );

        var response = await handler.HandleAsync(CreateRequest(new
        {
            name = "Alex",
            email = "alex@example.com",
            message = "Hello",
            turnstileToken = "valid-token",
            _honey = "bot",
        }));

        Assert.Equal((int)HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task HandleAsync_ReturnsForbidden_WhenTurnstileFails()
    {
        var handler = new ContactRequestHandler(
            new RecordingEmailSender(),
            new FakeTurnstileVerifier(success: false),
            deliveryAddress: "info@mikepattyn.nl"
        );

        var response = await handler.HandleAsync(CreateRequest(new
        {
            name = "Alex",
            email = "alex@example.com",
            message = "Hello",
            turnstileToken = "invalid-token",
            _honey = "",
        }));

        Assert.Equal((int)HttpStatusCode.Forbidden, response.StatusCode);
    }

    [Fact]
    public async Task HandleAsync_ReturnsMethodNotAllowed_ForNonPostRequests()
    {
        var handler = new ContactRequestHandler(
            new RecordingEmailSender(),
            new FakeTurnstileVerifier(success: true),
            deliveryAddress: "info@mikepattyn.nl"
        );

        var response = await handler.HandleAsync(new APIGatewayProxyRequest
        {
            HttpMethod = "GET",
            Path = "/api/contact",
        });

        Assert.Equal((int)HttpStatusCode.MethodNotAllowed, response.StatusCode);
    }

    private static APIGatewayProxyRequest CreateRequest(object body) =>
        new()
        {
            HttpMethod = "POST",
            Path = "/api/contact",
            Body = JsonSerializer.Serialize(body),
        };

    private sealed class RecordingEmailSender : IEmailSender
    {
        public List<EmailSendRequest> Requests { get; } = [];

        public Task SendAsync(EmailSendRequest request, CancellationToken cancellationToken = default)
        {
            Requests.Add(request);
            return Task.CompletedTask;
        }
    }

    private sealed class FakeTurnstileVerifier(bool success) : ITurnstileVerifier
    {
        public Task<bool> VerifyAsync(
            string token,
            string? remoteIp,
            CancellationToken cancellationToken = default
        ) => Task.FromResult(success);
    }
}
