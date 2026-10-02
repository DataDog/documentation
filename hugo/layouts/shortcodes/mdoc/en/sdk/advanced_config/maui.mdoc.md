<!--
This partial contains advanced configuration instructions for the .NET MAUI SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or see the [.NET MAUI RUM setup documentation][2].

## Track operations

Use the operation API to track multi-step flows such as a checkout, file upload, or onboarding sequence. Operations span across views.

```csharp
// Start the operation
DdRum.StartOperation(
    "checkout",
    operationKey: "op-1",
    new Dictionary<string, object> { { "step", "payment" } });

// On success
DdRum.SucceedOperation("checkout", operationKey: "op-1");

// On failure
DdRum.FailOperation(
    "checkout",
    OperationFailure.Error,
    operationKey: "op-1",
    new Dictionary<string, object> { { "error_code", 500 } });
```

For more information, see [Track Critical Operations][3].

## Proxy configuration

To route all SDK traffic through a proxy, pass a `ProxyConfiguration` when initializing the SDK:

```csharp
DdSdk.Initialize(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    ProxyConfiguration = new ProxyConfiguration
    {
        Type = ProxyType.Http,
        Address = "proxy.example.com",
        Port = 8080,
        Username = "user",       // optional, HTTP/HTTPS only
        Password = "password"    // optional, HTTP/HTTPS only
    }
});
```

Supported proxy types: `Http`, `Https`, `Socks`. Authentication is supported for HTTP and HTTPS proxies only.

The same configuration can be loaded from a JSON file:

```json
{
  "ClientToken": "<CLIENT_TOKEN>",
  "Environment": "<ENV_NAME>",
  "ProxyConfiguration": {
    "Type": "Http",
    "Address": "proxy.example.com",
    "Port": 8080,
    "Username": "user",
    "Password": "password"
  }
}
```

## Custom endpoints

For testing against a local mock server, an on-premises Datadog deployment, or a corporate proxy, the Logs and Traces features accept a custom endpoint at enable time:

```csharp
DdLogs.Enable(new DdLogsConfiguration
{
    CustomEndpoint = "https://logs-proxy.example.com/v1/input"
});

DdTrace.Enable(new DdTraceConfiguration
{
    CustomEndpoint = "https://traces-proxy.example.com/v1/input"
});
```

## Enrich RUM data

To add custom context, user information, and more to your RUM events, see [Enrich RUM Data][4].

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/setup/install/?platform=maui
[3]: /real_user_monitoring/track_critical_operations/
[4]: /real_user_monitoring/enrich_rum_data/
