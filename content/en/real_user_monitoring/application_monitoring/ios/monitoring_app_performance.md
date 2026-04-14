---
title: iOS Monitoring App Performance
description: "Track iOS app performance with custom view timings, network metrics, and user interaction measurements for enhanced user experience."
aliases:
  - /real_user_monitoring/mobile_and_tv_monitoring/ios/monitoring_app_performance
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: "Source Code"
  text: Source code for dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
---
## Overview

View timings help you understand the performance of your application from a user's perspective. RUM comes with both out-of-the-box automatic timings (`Time-to-Network-Settled` and `Interaction-to-Next-View`), as well as a precise API for notifying that the view has finished loading (as only you, as a developer, can know this with certainty).

### Time to network settled

The **Time-to-Network-Settled (TNS)** measures the time it takes for a view to be fully loaded with all relevant network calls initiated at the start of the view. TNS is represented by the `@view.network_settled_time` attribute in RUM view events.

By default, TNS is calculated as the time elapsed between the start of the view and the completion of all resources that started within 100ms of the view's start. This behavior is controlled by the `TimeBasedTNSResourcePredicate`, which classifies such resources as "initial."
To customize the default 100ms threshold for TNS calculation, you can adjust the threshold value in the `TimeBasedTNSResourcePredicate` and set it for the `networkSettledResourcePredicate` configuration option. This allows you to include resources that start within a custom time window after the view starts:

```javascript
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    networkSettledResourcePredicate: TimeBasedTNSResourcePredicate(
        threshold: 0.5 // Set threshold to 0.5s
    )
  )
)

```

If you need more control over which resources are considered "initial" in TNS, you can implement your own predicate by conforming to the `NetworkSettledResourcePredicate` protocol. This enables you to define custom classification logic based on resource properties like URL or start time.

### Interaction to next view

The **Interaction-to-Next-View (INV)** measures the time between the last user interaction in the previous view and the start of the current view. INV is represented by the `@view.interaction_to_next_view_time` attribute in RUM view events.


By default, INV is calculated from the last **tap**, **click**, or **swipe** action occurring within a **3-second** threshold before the view starts. This behavior is controlled by the `TimeBasedINVActionPredicate`, which classifies such actions as the "last interaction."

To customize the default 3-second threshold for ITNV calculation, you can adjust the `maxTimeToNextView` value in the `TimeBasedINVActionPredicate` and set it for the `nextViewActionPredicate` configuration option. This allows you to include actions within a custom time window before the next view starts.

```javascript
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    nextViewActionPredicate: TimeBasedINVActionPredicate(
        maxTimeToNextView: 5 // Set threshold to 5s
    )
  )
)

```

If you need more control over which interactions are considered "last interaction" in INV, you can implement your own predicate by conforming to the `NextViewActionPredicate` protocol. This enables you to define custom classification logic based on action properties like type, name, or time to the next view.


### Notify the SDK that your view finished loading

iOS RUM tracks the time it takes for your view to load. To notify the SDK that your view has finished loading, call the `addViewLoadingTime(override:)` method
through the `RUMMonitor` instance. Call this method when your view is fully loaded and displayed to the user:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
@_spi(Experimental)
import DatadogRUM

func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addViewLoadingTime(override: false)
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
(void)onHeroImageLoad {
    [[DDRUMMonitor shared] addViewLoadingTimeWithOverride:NO | YES];
}
```
{{% /tab %}}
{{< /tabs >}}

Use the `override` option to replace the previously calculated loading time for the current view.

After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

**Note**: This API is still experimental and might change in the future.

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using the `addTiming(name:)` API. The timing measure is relative to the start of the current RUM view.

For example, you can time how long it takes for your hero image to appear:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addTiming(name: "hero_image")
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

Once you set the timing, it is accessible as `@view.custom_timings.<timing_name>`. For example, `@view.custom_timings.hero_image`.

To create visualizations in your dashboards, [create a measure][1] first.

## Understanding performance timings
All view timings are measured relative to the view's start. The exact moment a view starts depends on the type of instrumentation used for tracking views. For more details, see [Views instrumentation versus app lifecycle][2].

## Troubleshooting
When using the default `TimeBasedInitialResourceIdentifier` and `TimeBasedInteractionIdentifier`, TNS and INV timings may be missing in specific cases:

- `@view.interaction_to_next_view_time` (INV) is not set for the first view of a session if no **tap**, **click**, or **swipe** actions were tracked in the previous view, or if the interval between the last such action and the start of the current view exceeds 3 seconds.
- `@view.network_settled_time` (TNS) is unavailable if no resources were tracked during the view, or if none started within the initial 100ms of the view.

To maximize the accuracy of TNS and INV, consider adjusting time thresholds in the default predicates to align with your app's behavior, or implement custom predicates tailored to your needs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /real_user_monitoring/application_monitoring/ios/data_collected/#views-instrumentation-versus-app-lifecycle

