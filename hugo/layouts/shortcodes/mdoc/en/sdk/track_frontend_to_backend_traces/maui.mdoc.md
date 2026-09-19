### Setup

**Note**: Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

1. Set up [RUM .NET MAUI Monitoring][1].

2. Set the `FirstPartyHosts` option in your `DdSdkConfiguration` to define the list of internal, first-party origins called by your MAUI application, along with the tracing header types to use for each:
    ```csharp
    builder
        .UseMauiApp<App>()
        .UseDatadog(new DdSdkConfiguration
        {
            ClientToken = "<CLIENT_TOKEN>",
            Environment = "<ENV_NAME>",
            TrackingConsent = TrackingConsent.Granted,
            Service = "<SERVICE_NAME>",
            FirstPartyHosts = new List<FirstPartyHost>
            {
                new() { Match = "api.example.com", HeaderTypes = new List<TracingHeaderType> { TracingHeaderType.Datadog, TracingHeaderType.TraceContext } }
            },
        })
        .UseDatadogTrace()
        // ...
    ```

    By default, all subdomains of a listed host are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

    `TracingHeaderType` is an enum representing the following tracing header types:
      - `TracingHeaderType.Datadog`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.TraceContext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)

    If you use file-based configuration, set `FirstPartyHosts` in your configuration JSON:
    ```json
    {
      "FirstPartyHosts": [
        { "Match": "api.example.com", "HeaderTypes": ["Datadog", "TraceContext"] }
      ]
    }
    ```

[1]: /real_user_monitoring/application_monitoring/maui/setup/
