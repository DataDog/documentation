## Automatically track resources

Use the [Datadog Tracking HTTP Client][10] package to enable automatic tracking of resources and HTTP calls from your views.

Add the package to your `pubspec.yaml` and add the following to your initialization file:

```dart
final configuration = DatadogConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Note**: The Datadog Tracking HTTP Client modifies [`HttpOverrides.global`][11]. If you are using your own custom `HttpOverrides`, you may need to inherit from [`DatadogHttpOverrides`][12]. In this case, you do not need to call `enableHttpTracking`. Versions of `datadog_tracking_http_client` >= 1.3 check the value of `HttpOverrides.current` and use this for client creation, so you only need to make sure to initialize `HttpOverrides.global` prior to initializing Datadog.

To enable Datadog [distributed tracing][13], you must set the `DatadogConfiguration.firstPartyHosts` property in your configuration object to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `traceSampleRate` on your `DatadogRumConfiguration`.

- `firstPartyHosts` does not allow wildcards, but matches any subdomains for a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, not `news.example.com`.

- `DatadogRumConfiguration.traceSampleRate` sets a default sampling rate of 20%. If you want all resources requests to generate a full distributed trace, set this value to `100.0`.

### Track resources from other packages

While `Datadog Tracking HTTP Client` can track most common network calls in Flutter, Datadog supplies packages for integration into specific networking libraries, including gRPC, GraphQL and Dio. For more information about these libraries, see [Integrated Libraries][22].

### Track custom resources

In addition to tracking resources automatically using the [Datadog Tracking HTTP Client][16], you can track specific custom resources such as network requests or third-party provider APIs using the [following methods][17]:

- `DdRum.startResource`
- `DdRum.stopResource`
- `DdRum.stopResourceWithError`
- `DdRum.stopResourceWithErrorInfo`

For example:

```dart
// in your network client:

DatadogSdk.instance.rum?.startResource(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// Later

DatadogSdk.instance.rum?.stopResource(
    "resource-key",
    200,
    RumResourceType.image
);
```

The `String` used for `resourceKey` in both calls must be unique for the resource you are calling in order for the Flutter Datadog SDK to match a resource's start with its completion.

## OpenTelemetry setup

All of Datadog's automatic network tracking packages ([Datadog Tracking HTTP Client][10], [gRPC Interceptor][19], [GQL Link][20], and [Dio Interceptor][21]) support distributed traces through both automatic header generation and header ingestion. This section describes how to use OpenTelemetry with RUM Flutter.

### Datadog header generation

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

This information is merged with any hosts set on `DatadogConfiguration.firstPartyHosts`. Hosts specified in `firstPartyHosts` generate Datadog Tracing Headers by default.

## Check first party hosts

To determine if a specific URI is a first party host, use `isFirstPartyHost`.

For example:
```dart
var host = 'example.com'
if (DatadogSdk.instance.isFirstPartyHost(host)){
 print('$host is a first party host.');
}
```

[10]: https://pub.dev/packages/datadog_tracking_http_client
[11]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[12]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[13]: /serverless/aws_lambda/distributed_tracing/
[16]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[17]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[19]: https://pub.dev/packages/datadog_grpc_interceptor
[20]: https://pub.dev/packages/datadog_gql_link
[21]: https://pub.dev/packages/datadog_dio
[22]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries
