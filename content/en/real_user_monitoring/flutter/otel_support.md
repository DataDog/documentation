---
title: OpenTelemetry Support
kind: documentation
description: Learn about using OpenTelemetry with RUM Flutter.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
The [Datadog Tracking HTTP Client][1] package and [gRPC Interceptor][2] package both support distributed traces through both automatic header generation and header ingestion.

## Datadog header generation

When configuring your tracking client or gRPC Interceptor, you can specify the types of tracing headers you want Datadog to generate. For example, if you want to send `b3` headers to `example.com` and `tracecontext` headers for `myapi.names`, you can do so with the following code:

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

You can use this object during initial configuration:

```dart
// For default Datadog HTTP tracing:
final configuration = DatadogConfiguration(
    // configuration
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

You can then enable tracing as usual.

This information is merged with any hosts set on `DdSdkConfiguration.firstPartyHosts`. Hosts specified in `firstPartyHosts` generate Datadog Tracing Headers by default.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://pub.dev/packages/datadog_tracking_http_client
[2]: https://pub.dev/packages/datadog_grpc_interceptor
[3]: https://github.com/openzipkin/b3-propagation#single-headers
[4]: https://github.com/openzipkin/b3-propagation#multiple-headers
[5]: https://www.w3.org/TR/trace-context/#tracestate-header
