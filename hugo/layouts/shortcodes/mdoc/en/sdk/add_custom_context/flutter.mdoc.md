Flutter RUM automatically tracks attributes such as user activity, views (using the `DatadogNavigationObserver`), errors, native crashes, and network requests (using the Datadog Tracking HTTP Client). See the [RUM Data Collection documentation][1] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Notify the SDK that your view finished loading

For setup steps, see [Track UI latency][2].

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

To create visualizations in your dashboards, [create a measure][3] first.

### Track user actions

You can track specific user actions such as taps, clicks, and scrolls using `DdRum.addAction`.

To manually register instantaneous RUM actions such as `RumActionType.tap`, use `DdRum.addAction()`. For continuous RUM actions such as `RumActionType.scroll`, use `DdRum.startAction()` or `DdRum.stopAction()`.

For example:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addAction(
        RumActionType.tap,
        resourceName,
    );
}
```

When using `DdRum.startAction` and `DdRum.stopAction`, the `type` action must be the same for the Datadog Flutter SDK to match an action's start with its completion.

### Track custom resources

In addition to tracking resources automatically using the [Datadog Tracking HTTP Client][4], you can track specific custom resources such as network requests or third-party provider APIs using the [following methods][5]:

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

### Track custom errors

To track specific errors, notify `DdRum` when an error occurs with the message, source, exception, and additional attributes.

```dart
DatadogSdk.instance.rum?.addError("This is an error message.");
```

[1]: /real_user_monitoring/setup/data_collected/?platform=flutter
[2]: /real_user_monitoring/setup/enable_rum/track_ui_latency/?platform=flutter
[3]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[4]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[5]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
