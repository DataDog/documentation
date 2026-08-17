### Automated tracking

The Android SDK automatically creates an `ApplicationLaunch` view during initialization and measures the time to initial display (TTID) for it. No setup is required for TTID.

### Manual tracking

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

If you use `reportFullyDrawn` to identify the moment of full display, use [`getFullyDrawnReporter`][1] to subscribe and call `GlobalRumMonitor.get().reportAppFullyDisplayed()` from there instead.

If time to full display isn't defined, the SDK only collects TTID.

For TTID/TTFD definitions, cold/warm start categorization, vital events, and metrics, see [Android Application Launch Monitoring][2].

[1]: https://developer.android.com/reference/androidx/activity/ComponentActivity#getFullyDrawnReporter()
[2]: /real_user_monitoring/application_monitoring/android/application_launch_monitoring/
