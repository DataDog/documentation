### Notify the SDK that your view finished loading

iOS RUM tracks the time it takes for your view to load. To notify the SDK that your view has finished loading, call the `addViewLoadingTime` method on `DatadogRum`.
Call this method when your view is fully loaded and ready to be displayed to the user:

```dart
  DatadogSdk.instance.rum?.addViewLoadingTime(override);
```

Use the `override` option to replace the previously calculated loading time for the current view.

After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

**Note**: This API is still experimental and might change in the future.

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using `DdRum.addTiming`. The timing measure is relative to the start of the current RUM view.

For example, you can time how long it takes for your hero image to appear:

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

After you set the timing, it is accessible as `@view.custom_timings.<timing_name>`. For example, `@view.custom_timings.hero_image`.

To create visualizations in your dashboards, [create a measure][15] first.

## Flutter-specific performance metrics

To enable the collection of Flutter-specific performance metrics, set `reportFlutterPerformance: true` in `DatadogRumConfiguration`. Widget build and raster times are displayed in [Mobile Vitals][18].

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
