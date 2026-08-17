### View loading time

To notify the SDK that your view finished loading, call `addViewLoadingTime` on `DatadogSdk.instance.rum` when your view is fully loaded and ready to display:

```dart
DatadogSdk.instance.rum?.addViewLoadingTime(override);
```

Use `override` to replace the previously calculated loading time for the current view. This API is experimental and might change.

### Custom timings

To measure how long a specific part of your app takes, such as a hero image appearing, use `addTiming`:

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

To [create a measure][1] from a custom timing in the RUM Explorer, use the `@view.custom_timings.<timing_name>` attribute.

Time to Network Settled and Interaction to Next View aren't available for the Flutter SDK yet.

For additional mobile performance metrics, such as slow renders and jank, see [Mobile Vitals][2].

[1]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /real_user_monitoring/application_monitoring/mobile_vitals/?tab=flutter
