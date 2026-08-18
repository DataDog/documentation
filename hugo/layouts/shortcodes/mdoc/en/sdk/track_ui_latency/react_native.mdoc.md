### Time to network settled

Time to Network Settled (TNS) is calculated automatically. It measures the time between the start of a view and the completion of all resources that started within a threshold of the view's start.

To customize the threshold (0.1 seconds by default), set `initialResourceThreshold` when initializing the SDK:

```javascript
DdSdkReactNative.initialize({
    ...
    initialResourceThreshold: 0.5, // Set threshold to 0.5s
})
```

### View loading time

To notify the SDK that your view finished loading, call `addViewLoadingTime` on `DdRum` when your view is fully loaded and ready to display:

```javascript
DdRum.addViewLoadingTime(true);
```

Use the `overwrite` parameter to replace the previously calculated loading time for the current view. This API is experimental.

### Custom timings

To measure how long a specific part of your app takes, add a custom timing:

```javascript
DdRum.addTiming('<timing-name>');
```

Interaction to Next View isn't available for the React Native SDK yet.

### Mobile vitals

The following telemetry provides insight into your application's performance. Mobile Vitals range from poor, moderate, to good. View them by navigating to {% ui %}Digital Experience{% /ui %} > {% ui %}Performance Summary{% /ui %} and selecting your application.

| Measurement | Description |
| --- | --- |
| Refresh rate | For a smooth, [jank-free](http://jankfree.org/) user experience, your application should render frames in under 60Hz. RUM tracks the application's [main thread display refresh rate](https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames) using `@view.refresh_rate_average` and `@view.refresh_rate_min` view attributes. **Note:** Refresh rates are normalized on a range of zero to 60fps. |
| JS Refresh rate | RUM tracks the application's javascript thread display refresh rate using `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min`, and `@view.js_refresh_rate.max` view attributes. |
| Slow renders | With slow rendering, you can monitor which views have an average frame rate under 55fps. |
| Frozen frames | Frames that take longer than 700ms to render appear as stuck and unresponsive in your application. These are classified as [frozen frames](https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames). RUM tracks `long task` events with the duration for any task taking longer than 100ms to complete. |
| Application not responding | When the UI thread of an application is blocked for more than 5 seconds, an `Application Not Responding` (ANR) error triggers. RUM tracks ANR occurrences and captures the entire stack trace that blocks the main thread when it encounters an ANR. |
| Crash-free sessions by version | An [application crash](https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native) is reported due to an unexpected exit in the application, typically caused by an unhandled exception or signal. RUM tracks complete crash reports and presents trends over time with Error Tracking. |
| CPU ticks per second | High CPU usage impacts the [battery life](https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/) on your users' devices. RUM tracks CPU ticks per second for each view and the CPU utilization over the course of a session. The recommended range is <40 for good and <60 for moderate. |
| Memory utilization | High memory usage can lead to [out-of-memory crashes](https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/), which causes a poor user experience. RUM tracks the amount of physical memory used by your application in bytes for each view, over the course of a session. The recommended range is <200MB for good and <400MB for moderate. |
