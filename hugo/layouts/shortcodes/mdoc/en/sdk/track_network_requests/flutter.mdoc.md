### Automated resource collection

To automatically track network requests as RUM resources, use the [Datadog Tracking HTTP Client][1] package and call `enableHttpTracking()` after RUM is enabled:

```dart
import 'package:datadog_tracking_http_client/datadog_tracking_http_client.dart';

DatadogSdk.instance.rum?.enableHttpTracking();
```

Configure `firstPartyHosts` on your RUM configuration to enable distributed tracing for requests made to those hosts. Use `traceSampleRate` to control what percentage of resources include trace information (default 20%).

If your app runs network calls from a background isolate, use `attachToBackgroundIsolate` to continue tracking those resources automatically. Packages other than the Tracking HTTP Client, such as `http` or Dio, need to be re-initialized on the background isolate.

For gRPC, GraphQL, or Dio-specific instrumentation, see [Flutter Integrated Libraries][2].

### Manual resource collection

To track a custom resource around its load, start and stop it:

```dart
DdRum.instance.startResource(resourceKey, RumHttpMethod.get, url);
// ... perform the request ...
DdRum.instance.stopResource(resourceKey, statusCode, RumResourceType.native, size);
```

If the request fails, use `stopResourceWithErrorInfo` instead.

For header capture and custom resource attributes, see [Flutter Advanced Configuration][3].

[1]: https://pub.dev/packages/datadog_tracking_http_client
[2]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries
[3]: /real_user_monitoring/application_monitoring/flutter/advanced_configuration/#automatically-track-resources
