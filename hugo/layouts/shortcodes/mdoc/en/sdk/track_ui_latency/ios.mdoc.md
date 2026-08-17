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

To [create a measure][1] from a custom timing in the RUM Explorer, use the `@view.custom_timings.<timing_name>` attribute.

For troubleshooting missing TNS/INV values and how loading times are calculated relative to the view life cycle, see [iOS Monitoring App Performance][2].

For additional mobile performance metrics, such as slow renders, hitches, and hangs, see [Mobile Vitals][3].

[1]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[2]: /real_user_monitoring/application_monitoring/ios/monitoring_app_performance/
[3]: /real_user_monitoring/application_monitoring/mobile_vitals/?tab=ios
