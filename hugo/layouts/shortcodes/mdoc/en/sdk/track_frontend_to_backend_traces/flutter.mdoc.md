### Setup

**Note**: Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

1. Set up [RUM Flutter Monitoring][1].

2. Follow the instructions under [Automatically track resources][2] to include the Datadog Tracking HTTP Client package and enable HTTP tracking. This includes the following changes to your initialization to add a list of internal, first-party origins called by your Flutter application:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHosts: ['example.com', 'api.yourdomain.com'],
    )..enableHttpTracking()
    ```

### Verifying setup

1. Run your application using your preferred IDE or `flutter run`.
2. Go to a screen in your application.
3. Open Flutter's [Dev Tools][3] and navigate to [Network View][4].
4. Check the request headers for a RUM resource and verify that the [required headers are set by the SDK](#how-rum-resources-are-linked-to-traces).

### OpenTelemetry support

1. Set up RUM to connect with APM as described above.

2. Use `firstPartyHostsWithTracingHeaders` instead of `firstPartyHosts` as follows:
    ```dart
    final configuration = DatadogConfiguration(
      // ...
      // added configuration
      firstPartyHostsWithTracingHeaders: {
        'example.com': { TracingHeaderType.tracecontext },
      },
    )..enableHttpTracking()
    ```

    `firstPartyHostsWithTracingHeaders` takes `Map<String, Set<TracingHeaderType>>` as a parameter, where the key is a host and the value is a list of supported tracing header types.

    `TracingHeaderType` in an enum representing the following tracing header types:
      - `TracingHeaderType.datadog`: Datadog's propagator (`x-datadog-*`)
      - `TracingHeaderType.tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/) (`traceparent`)
      - `TracingHeaderType.b3`: [B3 single header](https://github.com/openzipkin/b3-propagation#single-header) (`b3`)
      - `TracingHeaderType.b3multi`: [B3 multiple headers](https://github.com/openzipkin/b3-propagation#multiple-headers) (`X-B3-*`)

[1]: /real_user_monitoring/application_monitoring/flutter/setup/
[2]: /real_user_monitoring/application_monitoring/flutter/advanced_configuration#automatically-track-resources
[3]: https://docs.flutter.dev/tools/devtools/overview
[4]: https://docs.flutter.dev/tools/devtools/network
