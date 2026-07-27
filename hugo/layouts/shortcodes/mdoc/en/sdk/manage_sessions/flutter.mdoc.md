## Tracking from background isolates

Starting with v3, Datadog Flutter SDK is capable of monitoring from multiple isolates, but monitoring must be initialized from the background isolate:

When initializing your background isolate, call `DatadogSdk.instance.attachToBackgroundIsolate`. For example:

```dart
Future<void> _spawnIsolate() async {
    final receivePort = ReceivePort();
    receivePort.listen((message) {
      //
    });
    await Isolate.spawn(_backgroundWork, receivePort.sendPort);
  }

void _backgroundWork(SendPort port) async {
  await DatadogSdk.instance.attachToBackgroundIsolate();

  // Your background work
}
```

`attachToBackgroundIsolate` must be called **after** Datadog is initialized in your main isolate, otherwise the call silently fails and tracking is not available.

If you are using [Datadog Tracking HTTP Client][10] to automatically track resources, `attachToBackgroundIsolate` automatically starts tracking resources from the calling isolate. However, using `Client` from the `http` package or `Dio` requires you to re-initialize HTTP tracking for those packages from the background isolate.

## Clear all data

Use `clearAllData` to clear all data that has not been sent to Datadog.

```dart
DatadogSdk.instance.clearAllData();
```

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```dart
final sessionId = await DatadogSdk.instance.rum?.getCurrentSessionId()
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/flutter/setup/
[3]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries/
[4]: /getting_started/tagging/#defining-tags
[5]: /real_user_monitoring/connect_rum_and_traces/?tab=browserrum#how-are-rum-resources-linked-to-traces
[6]: https://github.com/openzipkin/b3-propagation#single-headers
[7]: https://github.com/openzipkin/b3-propagation#multiple-headers
[8]: https://www.w3.org/TR/trace-context/#tracestate-header
[9]: /real_user_monitoring/application_monitoring/browser/frustration_signals/
[10]: https://pub.dev/packages/datadog_tracking_http_client
[11]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[12]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[13]: /serverless/aws_lambda/distributed_tracing/
[14]: /real_user_monitoring/application_monitoring/flutter/data_collected
[15]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[16]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[17]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[18]: /real_user_monitoring/application_monitoring/mobile_vitals/?tab=flutter
[19]: https://pub.dev/packages/datadog_grpc_interceptor
[20]: https://pub.dev/packages/datadog_gql_link
[21]: https://pub.dev/packages/datadog_dio
[22]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries
