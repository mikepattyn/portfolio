using System.Diagnostics.CodeAnalysis;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Mikepattyn.Email;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Mikepattyn.Contact.Api;

public class Function
{
    private readonly ContactRequestHandler _handler;

    [ExcludeFromCodeCoverage]
    public Function()
        : this(ContactRequestHandlerFactory.CreateFromEnvironment())
    { }

    internal Function(ContactRequestHandler handler)
    {
        _handler = handler;
    }

    public Task<APIGatewayProxyResponse> FunctionHandler(
        APIGatewayProxyRequest request,
        ILambdaContext context
    )
    {
        context.Logger.LogInformation($"Contact API: {request.HttpMethod} {request.Path}");
        return _handler.HandleAsync(request);
    }
}

internal static class ContactRequestHandlerFactory
{
    internal static ContactRequestHandler CreateFromEnvironment()
    {
        var templatesDirectory = Path.Combine(AppContext.BaseDirectory, "Templates");
        var emailSender = EmailServiceFactory.CreateFromEnvironment(templatesDirectory);
        var turnstileSecret = TurnstileSecretResolver.Resolve();
        var turnstileVerifier = new TurnstileVerifier(new HttpClient(), turnstileSecret);
        var deliveryAddress =
            Environment.GetEnvironmentVariable("ContactDeliveryAddress") ?? "info@mikepattyn.nl";

        return new ContactRequestHandler(emailSender, turnstileVerifier, deliveryAddress);
    }
}
