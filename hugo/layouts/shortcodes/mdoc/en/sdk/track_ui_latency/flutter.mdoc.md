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

To [create a measure](/real_user_monitoring/explorer/search/#setup-facets-and-measures) from a custom timing in the RUM Explorer, use the `@view.custom_timings.<timing_name>` attribute.

Time to Network Settled and Interaction to Next View aren't available for the Flutter SDK yet.

### Mobile vitals

The following telemetry provides insight into your application's performance. Mobile Vitals range from poor, moderate, to good. View them by navigating to {% ui %}Digital Experience{% /ui %} > {% ui %}Performance Summary{% /ui %} and selecting your application.

| Measurement | Description |
| --- | --- |
| Refresh rate | For a smooth, [jank-free](https://docs.flutter.dev/perf/ui-performance) user experience, your application should render frames in under 60Hz. RUM tracks the application's [main thread display refresh rate](https://docs.flutter.dev/tools/devtools/performance) using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. **Note:** Refresh rates are normalized on a range of zero to 60fps. |
| Slow renders | With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render, using the same refresh rate attributes above. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. RUM tracks `long task` events with the duration for any task taking longer than 100ms to complete, letting you monitor which views appear frozen to your end users. |
| Application not responding | On Android, when the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR](https://developer.android.com/topic/performance/vitals/anr)) error triggers. RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR. |
| Crash-free sessions by version | An [application crash](https://docs.flutter.dev/reference/crash-reporting) is reported due to an unexpected exit in the application, typically caused by an unhandled exception or signal. RUM tracks complete crash reports and presents trends over time with [Error Tracking](/real_user_monitoring/error_tracking/flutter). |
| CPU ticks per second | High CPU usage impacts the battery life on your users' devices. RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. |
| Memory utilization | High memory usage can lead to [out-of-memory crashes](https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms), which causes a poor user experience. RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. |
| Widget build time | This is the duration of time taken to build the frame on the UI thread. For smooth animations, this should not exceed 16ms for 60 FPS, and 8ms for 120 FPS. High values here mean you need to look into optimizing your build methods for this view. See [Control Build Cost](https://docs.flutter.dev/perf/best-practices#control-build-cost) in the Flutter documentation. |
| Raster time | This is the duration of time taken to rasterize the frame on the raster thread. For smooth animations, this should not exceed 16ms for 60 FPS, and 8ms for 120 FPS. High values here may mean your view is complex to render. See [Identifying Problems in the GPU Graph](https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph) in the Flutter documentation. |
