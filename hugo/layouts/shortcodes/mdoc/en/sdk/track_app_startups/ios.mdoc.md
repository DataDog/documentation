Application launch monitoring helps you understand how fast your app becomes usable after a user opens it on their Apple device. Use it to identify slow startup times, track performance regressions, and optimize the user's first impression of your app.

## How it works

During initialization, the RUM iOS SDK creates a view called `ApplicationLaunch`. This view's start time matches the start of the iOS process. The `ApplicationLaunch` view includes any logs, actions, and resources created before your first call to `startView`.

{% alert level="danger" %}
The `application_start` action is not collected in iOS SDK versions 3.5.0+. The `rum.measure.app.startup_time metric` is marked as deprecated but continues to report data from devices running app versions that use older SDK versions.
{% /alert %}

In iOS SDK versions 3.5.0+, the time to initial display (TTID) and time to full display (TTFD) are collected during the application launch period.

| Measurement | Summary | Details |
|-------------|---------|---------|
| Time to initial display | The time it takes to display the first frame of the app's UI. | The time taken for an app to produce its first frame, including process initialization, scene and view hierarchy creation, and initial UI rendering. The splash screen, which the iOS manages, is not included in this calculation. |
| Time to full display | The time it takes for an app to become interactive for the user. | The time it takes to display the first frame of the app's UI, as well as the content that loads asynchronously after the initial frame is displayed. |

Each time to initial display and time to full display is categorized by launch type. iOS does not tell an app whether a launch is [cold or warm][1], so the iOS SDK uses a heuristic. It compares the current app process with the previous app process that ran the SDK, including processes that iOS started in the background:
- Cold start: The SDK labels a launch as a cold start when it has no saved state from a previous launch (for example, on the first launch after an install), when the app version changed, when the device rebooted since that previous process started, or when more than 7 days passed since it started. The 7 days are measured from the start of the previous app process, not from the last time the user used the app.
- Warm start: The SDK labels every other launch of a new app process as a warm start. This includes launches after the user force quits the app, after iOS terminates the app in the background, and after a crash. Apple also considers a launch cold when iOS has removed the app's code and frameworks from memory, for example after the user played a memory-intensive game. The SDK cannot detect this, so these launches are labeled as warm starts.

Either cold or warm starts can be [prewarmed][2], which is an iOS-specific optimization starting from iOS 15. In this scenario, the system proactively prepares the app process in the background to improve future launch times. Prewarming typically occurs when:
- The device has recently rebooted.
- The system predicts that the user is likely to open the application soon.
- The OS is executing background optimization routines.

For prewarmed launches, the SDK measures the time to initial display from when the SDK is loaded, not from the start of the process. Prewarmed durations are not directly comparable with other launches, so filter on `@vital.is_prewarmed` when you compare launch durations.

## Automated tracking

The iOS SDK automatically measures the time to initial display (TTID) for the `ApplicationLaunch` view. No setup is required for TTID. The TTID can be optionally profiled using the [iOS profiler][3].

The SDK drops TTID if the first frame is rendered more than 60 seconds after launch, and doesn't collect TTID for background launches.

## Manual tracking

Every app defines "fully drawn" differently, so the SDK doesn't automatically measure the time to full display (TTFD). Call `RUMMonitor.shared().reportAppFullyDisplayed()` when your app reaches that state:

```swift
@MainActor
class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        Task { await loadData() }
    }

    private func loadData() async {
        let url = URL(string: "https://api.example.com/data")!
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            updateUI(with: data)
        } catch {
            // Handle the error if needed
        }

        // Mark the app as fully displayed
        RUMMonitor.shared().reportAppFullyDisplayed()
    }
}
```

Send the signal only after the UI has been updated with the received content or the error has been handled. Only the first call counts, and the SDK ignores calls made more than 90 seconds after launch.

{% alert level="danger" %}
If the time to full display is not defined, the iOS SDK only collects the time to initial display.
{% /alert %}

## Explore application launch data

### RUM Summary

The time to initial display and time to full display are presented in the {% ui %}RUM Summary{% /ui %} under {% ui %}Mobile Performance{% /ui %}. The standalone {% ui %}Mobile Performance Dashboard{% /ui %} also contains distribution visuals for time to initial display and time to full display.

{% img src="real_user_monitoring/ios/ios-rum-summary-app-launch.png" alt="iOS RUM Summary" style="width:90%;" /%}

### Vital events

The time to initial display and time to full display are presented as vital events in the RUM session. They are also found under the first view after the `ApplicationLaunch` view. TTID and TTFD are captured at most once per app process, when the user launches the application or opens a prewarmed app. Returning to an app that is still running in the background does not produce TTID or TTFD, and neither does a process that iOS starts in the background, such as for a background fetch.

{% img src="real_user_monitoring/ios/ios-app-launch-session.png" alt="iOS session side panel" style="width:90%;" /%}

The TTID and TTFD can be queried in the {% ui %}RUM Sessions Explorer{% /ui %} using the following attributes on the vital event type:
- `@vital.type:app_launch`
- `@vital.name:time_to_initial_display` or `@vital.name:time_to_full_display`

Each TTID and TTFD side panel contains a distribution visualization, an indication of whether the launch was cold or warm, and an event waterfall.

{% img src="real_user_monitoring/ios/ios-ttid-vital.png" alt="Time to initial display vital event" style="width:90%;" /%}

### Metrics

The time to initial display and time to full display are calculated as metrics:
- `rum.measure.app.startup_to_initial_display`, which represents the time to initial display
- `rum.measure.app.startup_to_full_display`, which represents the time to full display

These metrics contain attributes to specify the launch type for accurate monitoring:
- `@vital.startup_type`
- `@vital.is_prewarmed`

{% alert level="danger" %}
The `rum.measure.app.startup_to_full_display` metric is not calculated if the time to full display is undefined.
{% /alert %}

[1]: https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time
[2]: https://developer.apple.com/documentation/uikit/about-the-app-launch-sequence
[3]: /real_user_monitoring/enrich_rum_data/collect_frontend_profiles/?platform=ios
