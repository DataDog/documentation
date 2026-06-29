### Custom views

In addition to [tracking views automatically][4], you can also track specific distinct views (such as activities and fragments) manually. Stop tracking when the view is no longer visible.

```kotlin
// to start view
GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)

// to stop view
GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
```

### Automatically track views

#### Android

To automatically track your views (such as activities and fragments), provide a tracking strategy at initialization. Depending on your application's architecture, you can choose one of the following strategies:

`ActivityViewTrackingStrategy`
: Every activity in your application is considered a distinct view.

`FragmentViewTrackingStrategy`
: Every fragment in your application is considered a distinct view.

`MixedViewTrackingStrategy`
: Every activity or fragment in your application is considered a distinct view.

`NavigationViewTrackingStrategy`
: Recommended for Android Jetpack Navigation library users. Each Navigation destination is considered a distinct view.

For instance, to set each fragment as a distinct view, use the following configuration in your [setup][1]:

```kotlin
// in common source set
val rumConfig = RumConfiguration.Builder(applicationId)
  .apply {
    platformSpecificSetup(this)
  }
  .build()

internal expect fun platformSpecificSetup(
    rumConfigurationBuilder: RumConfiguration.Builder
)

// in Android source set
internal actual fun platformSpecificSetup(
    rumConfigurationBuilder: RumConfiguration.Builder
) {
    rumConfigurationBuilder.useViewTrackingStrategy(
        FragmentViewTrackingStrategy(...)
    )
}
```

For `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy`, or `MixedViewTrackingStrategy`, you can filter which `Fragment` or `Activity` is tracked as a RUM View by providing a `ComponentPredicate` implementation in the constructor:

```kotlin
val strategy = ActivityViewTrackingStrategy(
    trackExtras = true,
    componentPredicate = object : ComponentPredicate<Activity> {
        override fun accept(component: Activity): Boolean {
            return true
        }

        override fun getViewName(component: Activity): String? = null
    }
)
```

**Note**: By default, the library is using `ActivityViewTrackingStrategy`. If you decide not to provide a view tracking strategy, you must manually send the views by calling the `startView` and `stopView` methods yourself.

#### iOS

To automatically track views (`UIViewController`s), use the `trackUiKitViews` method when enabling RUM. By default, views are named with the view controller's class name. To customize it, provide your own implementation of the `uiKitViewsPredicate` that conforms to `UIKitRUMViewsPredicate` interface.

Inside the `createView(viewController: UIViewController)` implementation, your app should decide if a given `UIViewController` instance should start the RUM view (return value) or not (return `null`). The returned `RUMView` value must specify the `name` and may provide additional `attributes` for the created RUM view.

For instance, you can configure the predicate to use explicit type check for each view controller in your app:

```kotlin
class YourCustomPredicate: UIKitRUMViewsPredicate {

    override fun createView(viewController: UIViewController): RUMView? {
        return when (viewController) {
          is HomeViewController -> RUMView("Home")
          is DetailsViewController -> RUMView("Details")
          else -> null
        }
    }
}
```

You can even come up with a more dynamic solution depending on your app's architecture.

**Note**: By default, UIKit view tracking is not enabled.

[1]: https://app.datadoghq.com/rum/application/create
[4]: /real_user_monitoring/application_monitoring/kotlin_multiplatform/advanced_configuration/#automatically-track-views
