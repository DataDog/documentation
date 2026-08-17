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

For troubleshooting missing TNS/INV values and how loading times are calculated relative to the view life cycle, see [Android Monitoring App Performance][1].

For additional mobile performance metrics, such as slow renders, frozen frames, and ANRs, see [Mobile Vitals][2].

[1]: /real_user_monitoring/application_monitoring/android/monitoring_app_performance/
[2]: /real_user_monitoring/application_monitoring/mobile_vitals/?tab=android
