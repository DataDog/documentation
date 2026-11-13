## Automated tracking

The underlying Android and iOS SDKs automatically measure the time to initial display (TTID). No setup is required for TTID.

## Manual tracking

The time to full display (TTFD) isn't measured automatically. Call `GlobalRumMonitor.get().reportAppFullyDisplayed()` when your app reaches its own definition of "fully drawn". Only the first call in a RUM session has any effect.

```kotlin
@OptIn(ExperimentalRumApi::class)
fun onHomeScreenLoaded() {
    GlobalRumMonitor.get().reportAppFullyDisplayed()
}
```

`reportAppFullyDisplayed` is marked `@ExperimentalRumApi`, so opt in to use it.

If time to full display isn't defined, the SDK only collects TTID.
