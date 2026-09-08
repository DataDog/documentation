.NET MAUI RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collected documentation][1] for the events and default attributes the SDK reports. You can also enrich user session information and gain finer control over what's collected by tracking custom events.

### Custom views

For setup steps covering both automatic and manual view tracking, see [Track navigation][2].

In addition to [tracking views automatically][3], you can track specific views manually. Stop tracking when the view is no longer visible.

```csharp
// Start a view
DdRum.StartView("home_screen", "Home");

// Stop the view
DdRum.StopView("home_screen");
```

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time with the `AddTiming` API. The timing measure is relative to the start of the current RUM view. For example, you can time how long it takes for your hero image to appear:

```csharp
void OnHeroImageLoaded()
{
    DdRum.AddTiming("hero_image");
}
```

After the timing is sent, it is accessible as `@view.custom_timings.<timing_name>` — for example, `@view.custom_timings.hero_image`. You must [create a measure][4] before graphing it in RUM analytics or in dashboards.

### Set the view loading time

The SDK can record how long a view took to become interactive. Call `AddViewLoadingTime` from the page code that knows when the view is fully ready:

```csharp
// Record the view's loading time once
DdRum.AddViewLoadingTime(overwrite: false);
```

Pass `overwrite: true` to replace a previously-recorded value for the same view.

### Add view attributes

`AddViewAttribute` and `RemoveViewAttribute` attach key-value pairs to the active view event. Call `AddViewAttribute` **after** the view has been started by the SDK — with automatic view tracking enabled, override `OnNavigatedTo` on your page (not the constructor or `OnAppearing`). By the time `OnNavigatedTo` runs, the SDK has already called `StartView` for the destination, so the attribute is attached to the right view.

```csharp
protected override void OnNavigatedTo(NavigatedToEventArgs args)
{
    base.OnNavigatedTo(args);
    DdRum.AddViewAttribute("screen_variant", "A");
}

// Later, to remove it:
DdRum.RemoveViewAttribute("screen_variant");
```

### Custom actions

For setup steps, see [Track user interactions][5].

In addition to [tracking actions automatically][3], you can track specific custom user actions (such as taps, clicks, and scrolls) with `DdRum.AddAction`. For continuous action tracking (for example, a user scrolling a list), use `StartAction` and `StopAction`.

```csharp
// Single-shot action
DdRum.AddAction(RumActionType.Tap, "Login Button");

// Continuous action
DdRum.StartAction(RumActionType.Scroll, "Feed Scroll");
// ... user scrolling ...
DdRum.StopAction(RumActionType.Scroll, "Feed Scroll");
```

### Custom resources

For setup steps covering both automatic and manual resource tracking, see [Track network requests][6].

In addition to [tracking resources automatically][3], you can track specific custom resources (such as network requests and third-party provider APIs) with `DdRum.StartResource` and `DdRum.StopResource`. Provide a stable resource key, the HTTP method, and the URL when you start, and the status code, kind, and size when you stop.

```csharp
DdRum.StartResource("api-call-1", RumResourceMethod.Get, "https://api.example.com/users");
// ... fetch the resource ...
DdRum.StopResource("api-call-1", 200, RumResourceKind.Xhr, 2048);
```

### Track long-running operations

Use the operation API to track multi-step flows such as a checkout, file upload, or onboarding sequence. Operations span across views.

```csharp
// Start the operation
DdRum.StartOperation(
    "checkout",
    operationKey: "op-1",
    new Dictionary<string, object> { { "step", "payment" } });

// On success
DdRum.SucceedOperation("checkout", operationKey: "op-1");

// On failure
DdRum.FailOperation(
    "checkout",
    OperationFailure.Error,
    operationKey: "op-1",
    new Dictionary<string, object> { { "error_code", 500 } });
```

### Custom errors

To track a specific error, notify the SDK with the message, source, and a stack trace string. See the [Attributes collected documentation][1].

```csharp
DdRum.AddError("Something went wrong", RumErrorSource.Source, "stacktrace here");
```

[1]: /real_user_monitoring/setup/data_collected/?platform=maui
[2]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=maui
[3]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#customize-automatic-tracking
[4]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=maui
[6]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=maui
