---
title: Android Monitoring App Performance
description: "Track Android app performance with custom view timings, network metrics, and user interaction measurements for better user experience."
aliases:
  - /real_user_monitoring/mobile_and_tv_monitoring/android/monitoring_app_performance
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

View timings help you understand the performance of your application from a user's perspective. RUM comes with both out-of-the-box automatic timings (`Time-to-Network-Settled` and `Interaction-to-Next-View`), as well as a precise API for notifying that the view has finished loading (as only you, as a developer, can know this with certainty).

### Time to network settled
The **Time-to-Network-Settled (TNS)** measures the time it takes for a view to be fully loaded with all relevant network calls initiated at the start of the view. TNS is represented by the `@view.network_settled_time` attribute in RUM view events.

By default, TNS is calculated as the time elapsed between the start of the view and the completion of all resources that started within 100ms of the view's start. This behavior is controlled by the `TimeBasedInitialResourceIdentifier`, which classifies such resources as "initial."

To customize the default 100ms threshold for TNS calculation, you can adjust the threshold value in the `TimeBasedInitialResourceIdentifier` and set it using `setInitialResourceIdentifier()` configuration. This allows you to include resources that start within a custom time window after the view starts:

```javascript
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.networksettled.TimeBasedInitialResourceIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setInitialResourceIdentifier(TimeBasedInitialResourceIdentifier(500)) // Set threshold to 0.5s
   .build()
```

If you need more control over which resources are considered "initial" in TNS, you can provide your own implementation of the `InitialResourceIdentifier` interface. This enables you to define custom classification logic based on resource properties like ID or start time.

### Interaction to next view
The **Interaction-to-Next-View (INV)** measures the time between the last user interaction in the previous view and the start of the current view. INV is represented by the `@view.interaction_to_next_view_time `attribute in RUM view events.

By default, INV is calculated from the last **tap**, **click**, or **swipe** action occurring within a **3-second** threshold before the view starts. This behavior is controlled by the `TimeBasedInteractionIdentifier`, which classifies such actions as the "last interaction."

To customize the default 3-second threshold for ITNV calculation, you can adjust the threshold value in the `TimeBasedInteractionIdentifier` and set it using the `setLastInteractionIdentifier()` configuration. This allows you to include actions within a custom time window before the next view starts.

```javascript
import com.datadog.android.rum.RumConfiguration
import com.datadog.android.rum.metric.interactiontonextview.TimeBasedInteractionIdentifier

val rumConfig = RumConfiguration.Builder(applicationId)
   .setLastInteractionIdentifier(TimeBasedInteractionIdentifier(5000)) // Set threshold to 5s
   .build()
   ```

If you need more control over which interactions are considered "last interaction" in INV, you can implement your own predicate by conforming to the `LastInteractionIdentifier` protocol. This enables you to define custom classification logic based on action properties like type or timestamp.

### Notify the SDK that your view finished loading

Android RUM tracks the time it takes for your view to load. To notify the SDK that your view has finished loading, call the `addViewLoadingTime(override=)` method
through the `GlobalRumMonitor` instance. Call this method when your view is fully loaded and displayed to the user:

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       @OptIn(ExperimentalRumApi::class)
       fun onViewLoaded() {
            GlobalRumMonitor.get().addViewLoadingTime(override = false)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       @OptIn(markerClass = ExperimentalRumApi.class)
       public void onViewLoaded() {
            GlobalRumMonitor.get().addViewLoadingTime(override);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

Use the `override` option to replace the previously calculated loading time for the current view.

After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

**Note**: This API is still experimental and might change in the future.

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using the `addTiming` API. The timing measure is relative to the start of the current RUM view. For example, you can time how long it takes for your hero image to appear:
{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
      fun onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

Once the timing is sent, the timing is accessible as `@view.custom_timings.<timing_name>`. For example: `@view.custom_timings.hero_image`. You must [create a measure][1] before graphing it in RUM analytics or in dashboards. 

## Understanding performance timings
All view timings are measured relative to the view's start. The exact moment a view starts depends on the type of instrumentation used for tracking views. For more details, see [Views instrumentation versus app lifecycle][2].

## Troubleshooting
When using the default `TimeBasedInitialResourceIdentifier` and `TimeBasedInteractionIdentifier`, TNS and INV timings may be missing in specific cases:

- `@view.interaction_to_next_view_time` (INV) is not set for the first view of a session if no tap, click, or swipe actions were tracked in the previous view, or if the interval between the last such action and the start of the current view exceeds 3 seconds.
- `@view.network_settled_time` (TNS) is unavailable if no resources were tracked during the view, or if none started within the initial 100ms of the view.

To maximize the accuracy of TNS and INV, consider adjusting time thresholds in the default predicates to align with your app's behavior, or implement custom predicates tailored to your needs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /real_user_monitoring/application_monitoring/android/data_collected/#views_instrumentation_versus_app_lifecycle