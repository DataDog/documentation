### Setup

**Note**: Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

1. Set up [RUM iOS Monitoring][1].

2. Enable `RUM` and URLSession instrumentation with the `urlSessionTracking` configuration and `firstPartyHostsTracing` parameter:
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ]
                )
            )
        )
    )
    ```

   By default, all subdomains of listed hosts are traced. For instance, if you add `example.com`, you also enable tracing for `api.example.com` and `foo.example.com`.

   Trace ID injection works when you are providing a `URLRequest` to the `URLSession`. Distributed tracing does not work when you are using a `URL` object.

3. _(Optional)_ For detailed timing breakdown (DNS resolution, SSL handshake, time to first byte, connection time, and download duration), enable `URLSessionInstrumentation` for your `SessionDelegate` type:
    ```swift
    URLSessionInstrumentation.enableDurationBreakdown(
        with: .init(
            delegateClass: <YourSessionDelegate>.self
        )
    )

    let session = URLSession(
        configuration: ...,
        delegate: <YourSessionDelegate>(),
        delegateQueue: ...
    )
    ```

   **Note**: Distributed tracing works automatically, but trace timings are more accurate after enabling `URLSessionInstrumentation`.

4. _(Optional)_ Set the `sampleRate` parameter to keep a defined percentage of the backend traces. If not set, 100% of the traces coming from application requests are sent to Datadog.

     To keep 20% of backend traces:
    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<rum application id>",
            urlSessionTracking: .init(
                firstPartyHostsTracing: .trace(
                    hosts: [
                        "example.com",
                        "api.yourdomain.com"
                    ],
                    sampleRate: 20
                )
            )
        )
    )
    ```
**Note**: `sampleRate` **does not** impact RUM sessions sampling. Only backend traces are sampled out.

### Verifying setup

1. Run your application from Xcode.
2. Go to a screen in your application.
3. Open Xcode's [Network Connections and HTTP Traffic instrument][2].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK](#how-rum-resources-are-linked-to-traces).

### OpenTelemetry support

1. Set up RUM to connect with APM as described above.

2. Use `.traceWithHeaders(hostsWithHeaders:sampleRate:)` instead of `.trace(hosts:sampleRate:)` as follows:
    ```swift
      RUM.enable(
          with: RUM.Configuration(
              applicationID: "<rum application id>",
              urlSessionTracking: .init(
                  firstPartyHostsTracing: .traceWithHeaders(
                      hostsWithHeaders: [
                          "api.example.com": [.tracecontext]
                      ],
                      sampleRate: 100
                  )
              )
          )
      )
    ```
    `.traceWithHeaders(hostsWithHeaders:sampleRate:)` takes `Dictionary<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `.datadog`: Datadog's propagator (`x-datadog-*`)
      - `.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

[1]: /real_user_monitoring/ios/
[2]: https://developer.apple.com/documentation/foundation/url_loading_system/analyzing_http_traffic_with_instruments
