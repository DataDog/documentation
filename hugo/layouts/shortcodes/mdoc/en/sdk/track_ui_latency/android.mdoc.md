### Time to network settled

Time to Network Settled (TNS) is calculated automatically. It measures the time between the start of a view and the completion of all resources that started within 100ms of the view's start.

To customize the 100ms threshold, set `setInitialResourceIdentifier()` with a `TimeBasedInitialResourceIdentifier`:

```kotlin
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.networksettled.TimeBasedInitialResourceIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setInitialResourceIdentifier(TimeBasedInitialResourceIdentifier(500)) // Set threshold to 0.5s
   .build()
```

For more control over which resources count as "initial," implement your own `InitialResourceIdentifier`.

### Interaction to next view

Interaction to Next View (INV) is calculated automatically. It uses the last tap, click, or swipe action occurring within a 3-second threshold before the view starts.

To customize the 3-second threshold, set `setLastInteractionIdentifier()` with a `TimeBasedInteractionIdentifier`:

```kotlin
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.interactiontonextview.TimeBasedInteractionIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setLastInteractionIdentifier(TimeBasedInteractionIdentifier(5000)) // Set threshold to 5s
   .build()
```

For more control over which interactions count as the "last interaction," implement your own `LastInteractionIdentifier`.

### View loading time

To notify the SDK that your view finished loading, call `addViewLoadingTime(override=)` through `GlobalRumMonitor` when your view is fully loaded and displayed:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
@OptIn(ExperimentalRumApi::class)
fun onViewLoaded() {
   GlobalRumMonitor.get().addViewLoadingTime(override = false)
}
```

{% /tab %}
{% tab label="Java" %}

```java
@OptIn(markerClass = ExperimentalRumApi.class)
public void onViewLoaded() {
   GlobalRumMonitor.get().addViewLoadingTime(override);
}
```

{% /tab %}
{% /tabs %}

Use `override` to replace the previously calculated loading time for the current view. This API is experimental and might change.

### Custom timings

To measure how long a specific part of your app takes, such as a hero image appearing, use `addTiming`:

{% tabs %}
{% tab label="Kotlin" %}

```kotlin
fun onHeroImageLoaded() {
      GlobalRumMonitor.get().addTiming("hero_image")
}
```

{% /tab %}
{% tab label="Java" %}

```java
public void onHeroImageLoaded() {
   GlobalRumMonitor.get().addTiming("hero_image");
}
```

{% /tab %}
{% /tabs %}

### Understanding performance timings

All view timings are measured relative to the view's start. The exact moment a view starts depends on the type of instrumentation used for tracking views. For more details, see [Views instrumentation versus app life cycle](/real_user_monitoring/application_monitoring/android/data_collected/#views_instrumentation_versus_app_lifecycle).

### Troubleshooting

When using the default `TimeBasedInitialResourceIdentifier` and `TimeBasedInteractionIdentifier`, TNS and INV timings may be missing in specific cases:

- `@view.interaction_to_next_view_time` (INV) is not set for the first view of a session if no tap, click, or swipe actions were tracked in the previous view, or if the interval between the last such action and the start of the current view exceeds 3 seconds.
- `@view.network_settled_time` (TNS) is unavailable if no resources were tracked during the view, or if none started within the initial 100ms of the view.

To maximize the accuracy of TNS and INV, consider adjusting time thresholds in the default predicates to align with your app's behavior, or implement custom predicates tailored to your needs.

### Mobile vitals

The following telemetry provides insight into your application's performance, inspired by frameworks such as [Android Vitals](https://developer.android.com/topic/performance/vitals). Mobile Vitals range from poor, moderate, to good. View them by navigating to {% ui %}Digital Experience{% /ui %} > {% ui %}Performance Summary{% /ui %} and selecting your application.

| Measurement | Description |
| --- | --- |
| Refresh rate | For a smooth, [jank-free](https://developer.android.com/topic/performance/vitals/render#common-jank) user experience, your application should render frames in under 60Hz. RUM tracks the application's [main thread display refresh rate](https://developer.android.com/guide/topics/media/frame-rate) using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. **Note:** Refresh rates are normalized on a range of zero to 60fps. For example, if your application runs at 100fps on a device capable of rendering 120fps, Datadog reports 50fps in {% ui %}Mobile Vitals{% /ui %}. |
| Slow renders | With slow rendering, you can monitor which views are taking longer than 16ms or 60Hz to render, using the same refresh rate attributes above. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames](https://developer.android.com/topic/performance/vitals/frozen). RUM tracks `long task` events with the duration for any task taking longer than 100ms to complete, letting you monitor which views appear frozen to your end users. |
| Application not responding | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` ([ANR](https://developer.android.com/topic/performance/vitals/anr)) error triggers. RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR. |
| Crash-free sessions by version | An [application crash](https://developer.android.com/topic/performance/vitals/crash) is reported due to an unexpected exit in the application, typically caused by an unhandled exception or signal. RUM tracks complete crash reports and presents trends over time with [Error Tracking](/real_user_monitoring/error_tracking/android). |
| CPU ticks per second | High CPU usage impacts the [battery life](https://developer.android.com/topic/performance/power) on your users' devices. RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. |
| Memory utilization | High memory usage can lead to [OutOfMemoryError](https://developer.android.com/reference/java/lang/OutOfMemoryError), which causes the application to crash. RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. |
