using System.Net;
using System.Text.Json;
using Amazon.Lambda.APIGatewayEvents;

namespace Mikepattyn.Contact.Api;

public static class ApiGatewayJsonResponse
{
    public static APIGatewayProxyResponse Create(HttpStatusCode statusCode, object body) =>
        new()
        {
            StatusCode = (int)statusCode,
            Headers = CreateHeaders(),
            Body = JsonSerializer.Serialize(body),
        };

    public static Dictionary<string, string> CreateHeaders() =>
        new()
        {
            ["Content-Type"] = "application/json",
            ["Access-Control-Allow-Origin"] = "*",
            ["Access-Control-Allow-Headers"] = "Content-Type",
            ["Access-Control-Allow-Methods"] = "POST, OPTIONS",
        };
}
