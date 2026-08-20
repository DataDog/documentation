## Automatically track views

By default, the SDK tracks views through `Application.PageAppearing` (one app-level event covering Shell route changes, `Navigation.PushAsync`, and modals). For Shell apps, the destination route is resolved at `Shell.Navigating` time and used as the view name (for example, `MainPage/DetailPage`).

To customize or disable automatic view tracking, configure `DdRumConfiguration`:

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",

    // Disable automatic view tracking
    AutomaticViewTracking = false,

    // Or customize the view name
    ViewNamePredicate = (page) => page switch
    {
        MainPage => "Home",
        _ => null  // use the default name
    },

    // Skip specific pages from view tracking
    ViewTrackingPredicate = (page) => page is not SplashPage,
});
```

### View naming priority

View names are resolved in this order:

1. Custom `ViewNamePredicate` (if set and returns a non-null value).
2. Resolved Shell route (forward and back navigations both produce absolute paths like `MainPage/DetailPage`).
3. Page class name.

Pages pushed with `Navigation.PushAsync` (which Shell internally assigns synthetic `D_FAULT_…` routes) fall through to the page class name.

### Known limitation: gesture-driven navigation

`TapGestureRecognizer.Tapped` and `SwipeGestureRecognizer.Swiped` only fire on completion. If a tap or swipe handler triggers a navigation, the resulting action is bucketed under the destination view rather than the source. This applies only to `View`s with explicit gesture recognizers; `Button` and `ImageButton` taps are unaffected.

## Custom views

In addition to tracking views automatically, you can track specific views manually. Stop tracking when the view is no longer visible.

```csharp
// Start a view
DdRum.StartView("home_screen", "Home");

// Stop the view
DdRum.StopView("home_screen");
```

For more advanced configuration options, see [Advanced Configuration][1].

[1]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#customize-automatic-tracking
