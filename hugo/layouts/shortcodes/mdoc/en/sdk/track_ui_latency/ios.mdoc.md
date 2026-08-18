### Time to network settled

Time to Network Settled (TNS) is calculated automatically. It measures the time between the start of a view and the completion of all resources that started within 100ms of the view's start.

To customize the 100ms threshold, set `networkSettledResourcePredicate` with a `TimeBasedTNSResourcePredicate`:

```swift
RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    networkSettledResourcePredicate: TimeBasedTNSResourcePredicate(
        threshold: 0.5 // Set threshold to 0.5s
    )
  )
)
```

For more control over which resources count as "initial," implement your own `NetworkSettledResourcePredicate`.

### Interaction to next view

Interaction to Next View (INV) is calculated automatically. It uses the last tap, click, or swipe action occurring within a 3-second threshold before the view starts.

To customize the 3-second threshold, set `nextViewActionPredicate` with a `TimeBasedINVActionPredicate`:

```swift
RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    nextViewActionPredicate: TimeBasedINVActionPredicate(
        maxTimeToNextView: 5 // Set threshold to 5s
    )
  )
)
```

For more control over which interactions count as the "last interaction," implement your own `NextViewActionPredicate`.

### View loading time

To notify the SDK that your view finished loading, call `addViewLoadingTime(override:)` through `RUMMonitor.shared()` when your view is fully loaded and displayed:

{% tabs %}
{% tab label="Swift" %}

```swift
RUMMonitor.shared().addViewLoadingTime(override: false)
```

{% /tab %}
{% tab label="Objective-C" %}

```objectivec
[[DDRUMMonitor shared] addViewLoadingTimeWithOverride:false];
```

{% /tab %}
{% /tabs %}

Use `override` to replace the previously calculated loading time for the current view. This API is experimental and might change.

### Custom timings

To measure how long a specific part of your app takes, such as a hero image appearing, use `addTiming(name:)`:

{% tabs %}
{% tab label="Swift" %}

```swift
RUMMonitor.shared().addTiming(name: "hero_image")
```

{% /tab %}
{% tab label="Objective-C" %}

```objectivec
[[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
```

{% /tab %}
{% /tabs %}

To [create a measure](/real_user_monitoring/explorer/search/#setup-facets-and-measures) from a custom timing in the RUM Explorer, use the `@view.custom_timings.<timing_name>` attribute.

### Understanding performance timings

All view timings are measured relative to the view's start. The exact moment a view starts depends on the type of instrumentation used for tracking views. For more details, see [Views instrumentation versus app life cycle](/real_user_monitoring/application_monitoring/ios/data_collected/#views-instrumentation-versus-app-lifecycle).

### Troubleshooting

When using the default `TimeBasedTNSResourcePredicate` and `TimeBasedINVActionPredicate`, TNS and INV timings may be missing in specific cases:

- `@view.interaction_to_next_view_time` (INV) is not set for the first view of a session if no tap, click, or swipe actions were tracked in the previous view, or if the interval between the last such action and the start of the current view exceeds 3 seconds.
- `@view.network_settled_time` (TNS) is unavailable if no resources were tracked during the view, or if none started within the initial 100ms of the view.

To maximize the accuracy of TNS and INV, consider adjusting time thresholds in the default predicates to align with your app's behavior, or implement custom predicates tailored to your needs.

### Mobile vitals

The following telemetry provides insight into your application's performance, inspired by frameworks such as [Apple's MetricKit](https://developer.apple.com/documentation/metrickit). Mobile Vitals range from poor, moderate, to good. View them by navigating to {% ui %}Digital Experience{% /ui %} > {% ui %}Performance Summary{% /ui %} and selecting your application.

| Measurement | Description |
| --- | --- |
| Refresh rate | For a smooth, jank-free user experience, your application should render frames in under 60Hz. RUM tracks the application's main thread display refresh rate using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. **Note:** Refresh rates are normalized on a range of zero to 60fps. |
| Slow renders | With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render, using the same refresh rate attributes above. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. RUM tracks `long task` events with the duration for any task taking longer than 100ms to complete, letting you monitor which views appear frozen to your end users. |
| Crash-free sessions by version | An [application crash](https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs) is reported due to an unexpected exit in the application, typically caused by an unhandled exception or signal. RUM tracks complete crash reports and presents trends over time with [Error Tracking](/real_user_monitoring/error_tracking/mobile/ios/). |
| Hang rate | As defined by Apple, the hang rate of an application corresponds to "the number of seconds per hour that the app is unresponsive, while only counting periods of unresponsiveness of more than 250 ms." To compute the hang rate of your application on Datadog, enable [app hang reporting](/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-app-hang-reporting) and follow the [dedicated section](/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#compute-the-hang-rate-of-your-application). |
| CPU ticks per second | High CPU usage impacts the [battery life](https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/) on your users' devices. RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. |
| Memory utilization | High memory usage can lead to [watchdog terminations](/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting), which causes a poor user experience. RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. |
