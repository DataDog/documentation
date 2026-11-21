Application launch monitoring helps you understand how fast your Android app becomes usable after a user taps the app icon. Use it to identify slow startup times, track performance regressions, and optimize the user's first impression of your app.

## How it works

During initialization, the RUM Android SDK creates a view called `ApplicationLaunch`. This view's start time matches the start of the Android process. The `ApplicationLaunch` view includes any logs, actions, and resources created before your first call to `startView`.

{% alert level="danger" %}
The `application_start` action is not collected in Android SDK versions 3.5.0+. The `rum.measure.app.startup_time metric` is marked as deprecated but continues to report data from devices running app versions that use older SDK versions.
{% /alert %}

In Android SDK versions 3.5.0+, the time to initial display (TTID) and time to full display (TTFD) are collected during the application launch period.

| Measurement | Summary | Details |
|-------------|---------|---------|
| [Time to initial display][1] | The time it takes to display the first frame of the app's UI. | The time taken for an app to produce its first frame, including process initialization during a cold start, activity creation during a cold or warm start, and displaying the first frame. |
| [Time to full display][2] | The time it takes for an app to become interactive for the user. | The time taken to display the first frame of the app's UI, as well as the content that loads asynchronously after the initial frame is displayed. |

Each time to initial display and time to full display is categorized by launch type:
- [Cold start][3]: The application is launched from scratch. Cold starts happen when the application is launched for the first time since device boot or since the system terminated the process of the application.
- [Warm start][4]: The application is launched using a subset of the operations that take place during a cold start. Warm starts result from situations such as a user backing out of the application or re-launching the application. Warm starts can also result from the user launching the `Activity` when the OS-process already exists, such as the arrival of a silent push or `WorkManager` job execution.

## Automated tracking

The Android SDK automatically measures the time to initial display (TTID) for the `ApplicationLaunch` view. No setup is required for TTID. The TTID can be optionally profiled using the [Android profiler][5].

## Manual tracking

The time to full display (TTFD) isn't measured automatically. Call `GlobalRumMonitor.get().reportAppFullyDisplayed()` when your app reaches its own definition of "fully drawn":

```kotlin
class HomeActivity : AppCompatActivity() {

    private val viewModel: HomeViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        setContentView(R.layout.activity_home)
        super.onCreate(savedInstanceState)

        viewModel.uiState.observe(this) { state ->
            if (state.isLoaded) {
                 GlobalRumMonitor.get().reportAppFullyDisplayed()
            }
        }
    }
}
```

If you use `reportFullyDrawn` to identify the moment of full display, use [`getFullyDrawnReporter`][6] to subscribe and call `GlobalRumMonitor.get().reportAppFullyDisplayed()` from there instead.

{% alert level="danger" %}
If the time to full display is not defined, the Android SDK only collects the TTID.
{% /alert %}

## Explore application launch data

### RUM summary

The TTID and TTFD are presented in the RUM Summary under Mobile Performance. The standalone Mobile Performance Dashboard also contains distribution visuals for TTID and TTFD.

{% img src="real_user_monitoring/android/android-rum-summary-app-launch.png" alt="Android RUM Summary" style="width:90%;" /%}

### Vital events

The time to initial display and time to full display are presented as vital events in the RUM session. They are also found under the first view after the `ApplicationLaunch` view. TTID and TTFD are captured if the user launches the application in the session. Neither the TTID nor the TTFD appear if the user does not launch the application during the session.

{% img src="real_user_monitoring/android/android-app-launch-session.png" alt="Android session side panel" style="width:90%;" /%}

The TTID and TTFD can be queried in the RUM Sessions Explorer using the following attributes on the vital event type:
- `@vital.type:app_launch`
- `@vital.name:time_to_initial_display` or `@vital.name:time_to_full_display`

Each TTID and TTFD side panel contains a distribution visualization, an indication of whether the launch was cold or warm, and an event waterfall.

{% img src="real_user_monitoring/android/android-ttid-vital.png" alt="Time to initial display vital event" style="width:90%;" /%}

### Metrics

The time to initial display and time to full display are calculated as metrics:
- `rum.measure.app.startup_to_initial_display`, which represents the time to initial display
- `rum.measure.app.startup_to_full_display`, which represents the time to full display

These metrics contain the `@vital.startup_type` attribute to specify the launch type for accurate monitoring.

{% alert level="danger" %}
The `rum.measure.app.startup_to_full_display` metric is not calculated if the time to full display is undefined.
{% /alert %}

[1]: https://developer.android.com/topic/performance/vitals/launch-time#time-initial
[2]: https://developer.android.com/topic/performance/vitals/launch-time#time-full
[3]: https://developer.android.com/topic/performance/vitals/launch-time#cold
[4]: https://developer.android.com/topic/performance/vitals/launch-time#warm
[5]: /real_user_monitoring/enrich_rum_data/collect_frontend_profiles/?platform=android
[6]: https://developer.android.com/reference/androidx/activity/ComponentActivity#getFullyDrawnReporter()
