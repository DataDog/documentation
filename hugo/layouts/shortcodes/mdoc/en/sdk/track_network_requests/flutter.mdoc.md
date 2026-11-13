## Automated resource collection

Use the [Datadog Tracking HTTP Client][1] package to enable automatic tracking of resources and HTTP calls from your views.

Add the package to your `pubspec.yaml` and add the following to your initialization file:

```dart
final configuration = DatadogConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Note**: The Datadog Tracking HTTP Client modifies [`HttpOverrides.global`][2]. If you are using your own custom `HttpOverrides`, you may need to inherit from [`DatadogHttpOverrides`][3]. In this case, you do not need to call `enableHttpTracking`. Versions of `datadog_tracking_http_client` >= 1.3 check the value of `HttpOverrides.current` and use this for client creation, so you only need to initialize `HttpOverrides.global` before initializing Datadog.

To enable Datadog [distributed tracing][4], set the `DatadogConfiguration.firstPartyHosts` property in your configuration object to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `traceSampleRate` on your `DatadogRumConfiguration`.

- `firstPartyHosts` does not allow wildcards, but matches any subdomains for a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, not `news.example.com`.
- `DatadogRumConfiguration.traceSampleRate` sets a default sampling rate of 20%. If you want all resources requests to generate a full distributed trace, set this value to `100.0`.

If your app runs network calls from a background isolate, call `attachToBackgroundIsolate` from that isolate to continue tracking those resources automatically. Packages other than the Tracking HTTP Client, such as `http` or Dio, need to be re-initialized on the background isolate. For details, see [Tracking from background isolates][5].

### Add custom attributes to automatically tracked resources

For resources tracked by `datadog_tracking_http_client`, implement `DatadogTrackingHttpClientListener` to attach custom attributes to individual RUM resource events. Pass the listener to `enableHttpTracking(clientListener: ...)` before initializing the SDK.

The `requestStarted` and `responseFinished` callbacks receive the same mutable `userAttributes` map for each resource. Add or update attributes in either callback. Only the attributes remaining after `responseFinished` are sent to Datadog for that resource.

```dart
import 'dart:io';

import 'package:datadog_tracking_http_client/datadog_tracking_http_client.dart';

class ResourceAttributesListener implements DatadogTrackingHttpClientListener {
  @override
  void requestStarted({
    required Object resourceKey,
    required HttpClientRequest request,
    required Map<String, Object?> userAttributes,
  }) {
    userAttributes['request_host'] = request.uri.host;
  }

  @override
  void responseFinished({
    required Object resourceKey,
    required HttpClientResponse response,
    required Map<String, Object?> userAttributes,
    Object? error,
  }) {
    userAttributes['response_status'] = response.statusCode;
  }
}

// Add the listener to your configuration before initializing the SDK.
configuration.enableHttpTracking(
  clientListener: ResourceAttributesListener(),
);
```

### Capture resource headers

When tracking resources automatically, you can capture HTTP request and response headers on RUM Resources by setting `trackResourceHeaders` on `DatadogRumConfiguration`. This option applies to all Datadog HTTP tracking clients (Tracking HTTP Client, `DatadogClient`, Dio Interceptor, and GQL Link), but does not apply to the gRPC Interceptor. This option is disabled by default.

Captured headers appear on the RUM Resource event under `resource.request.headers` and `resource.response.headers`. You can query them in the RUM Explorer.

```dart
DatadogRumConfiguration(
  applicationId: '<rum-application-id>',
  trackResourceHeaders: ResourceHeadersExtractor(),
)
```

With no arguments, `ResourceHeadersExtractor` captures a predefined set of safe headers:

| Direction | Headers |
|-----------|---------|
| Request | `cache-control`, `content-type` |
| Response | `age`, `cache-control`, `content-encoding`, `content-length`, `content-type`, `etag`, `expires`, `server-timing`, `vary`, `x-cache` |

To capture additional headers in addition to the defaults, pass them through `captureHeaders`. To skip the defaults, set `includeDefaults: false`.

```dart
DatadogRumConfiguration(
  applicationId: '<rum-application-id>',
  trackResourceHeaders: ResourceHeadersExtractor(
    captureHeaders: ['x-request-id', 'x-custom-header'],
  ),
)
```

{% alert level="info" %}
Sensitive headers, such as tokens and API keys, are filtered out automatically, even if you list them explicitly.
{% /alert %}

### Track resources from other packages

While the [Datadog Tracking HTTP Client][1] can track most common network calls in Flutter, Datadog supplies packages for integration into specific networking libraries, including gRPC, GraphQL, and Dio. For more information about these libraries, see [Flutter Integrated Libraries][6].

### Check first party hosts

To determine whether a specific host is a first party host, use `isFirstPartyHost`:

```dart
var host = 'example.com';
if (DatadogSdk.instance.isFirstPartyHost(host)) {
  print('$host is a first party host.');
}
```

## Manual resource collection

In addition to tracking resources automatically, you can track specific custom resources such as network requests or third-party provider APIs using the [following methods][7]:

- `DdRum.startResource`
- `DdRum.stopResource`
- `DdRum.stopResourceWithError`
- `DdRum.stopResourceWithErrorInfo`

To attach custom attributes to an individual resource, pass an attributes map to `startResource` or `stopResource`. The attributes are optional positional arguments. For `stopResource`, pass the resource size, or `null` if it is unknown, before the attributes map.

For example:

```dart
// in your network client:

DatadogSdk.instance.rum?.startResource(
    "resource-key",
    RumHttpMethod.get,
    url,
    {'image_source': 'catalog'},
);

// Later

DatadogSdk.instance.rum?.stopResource(
    "resource-key",
    200,
    RumResourceType.image,
    null,
    {'cache_hit': false},
);
```

The `String` used for `resourceKey` in both calls must be unique for the resource you are calling for the Flutter Datadog SDK to match a resource's start with its completion. If the request fails, use `stopResourceWithErrorInfo` instead.

For the attributes collected for resources, see [Data Collected][8].

[1]: https://pub.dev/packages/datadog_tracking_http_client
[2]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[3]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[4]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=flutter
[5]: /real_user_monitoring/setup/enable_rum/advanced_configuration/?platform=flutter#tracking-from-background-isolates
[6]: /real_user_monitoring/setup/additional_plugins/?platform=flutter
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[8]: /real_user_monitoring/setup/data_collected/?platform=flutter
