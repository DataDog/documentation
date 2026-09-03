<!--
This partial contains advanced configuration instructions for the .NET MAUI SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or see the [.NET MAUI RUM setup documentation][2].

## Enrich user sessions

.NET MAUI RUM automatically tracks attributes such as user activity, screens, errors, and network requests. See the [RUM Data Collected documentation][3] for the events and default attributes the SDK reports. You can also enrich user session information and gain finer control over what's collected by tracking custom events.

### Custom views

In addition to [tracking views automatically](#customize-automatic-tracking), you can track specific views manually. Stop tracking when the view is no longer visible.

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

In addition to [tracking actions automatically](#customize-automatic-tracking), you can track specific custom user actions (such as taps, clicks, and scrolls) with `DdRum.AddAction`. For continuous action tracking (for example, a user scrolling a list), use `StartAction` and `StopAction`.

```csharp
// Single-shot action
DdRum.AddAction(RumActionType.Tap, "Login Button");

// Continuous action
DdRum.StartAction(RumActionType.Scroll, "Feed Scroll");
// ... user scrolling ...
DdRum.StopAction(RumActionType.Scroll, "Feed Scroll");
```

### Custom resources

In addition to [tracking resources automatically](#customize-automatic-tracking), you can track specific custom resources (such as network requests and third-party provider APIs) with `DdRum.StartResource` and `DdRum.StopResource`. Provide a stable resource key, the HTTP method, and the URL when you start, and the status code, kind, and size when you stop.

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

To track a specific error, notify the SDK with the message, source, and a stack trace string. See the [Attributes collected documentation][3].

```csharp
DdRum.AddError("Something went wrong", RumErrorSource.Source, "stacktrace here");
```

## Track custom global attributes

In addition to the [default RUM attributes][3] captured by the SDK, you can attach contextual information — such as feature flags, experiment IDs, plan tier, or other business attributes — to every event the SDK sends.

### Track user sessions

Adding user information to your RUM sessions helps you:
* Follow the journey of a given user
* Identify which users are most impacted by errors
* Monitor performance for your most important users

| Attribute | Type | Description |
|---|---|---|
| `usr.id` | String | (Required) Unique user identifier. |
| `usr.name` | String | (Optional) User friendly name, displayed by default in the RUM UI. |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI when the user name isn't present. |

```csharp
// Set the user (id is required)
DdSdk.SetUserInfo("user-123", "Jane Doe", "jane@example.com",
    new Dictionary<string, object> { { "plan", "premium" } });

// Append extra fields to the user later (merges with what's already there)
DdSdk.AddUserExtraInfo(new Dictionary<string, object> { { "subscription", "annual" } });

// Clear the user (for example, on sign-out)
DdSdk.ClearUserInfo();
```

### Track account sessions

For B2B applications, `DdSdk.SetAccountInfo` attaches an account identity to every event. Use it together with — not instead of — user info.

```csharp
DdSdk.SetAccountInfo("acct-456", "Acme Corp",
    new Dictionary<string, object> { { "tier", "enterprise" } });

DdSdk.AddAccountExtraInfo(new Dictionary<string, object> { { "region", "us-east" } });

DdSdk.ClearAccountInfo();
```

### Track global attributes

Global attributes are attached to every RUM, Log, and Trace event the SDK emits.

```csharp
// Add one attribute
DdSdk.AddAttribute("plan", "premium");

// Add several at once
DdSdk.AddAttributes(new Dictionary<string, object>
{
    { "plan", "premium" },
    { "experiment", "new-checkout-flow" }
});

// Remove one
DdSdk.RemoveAttribute("experiment");

// Remove several
DdSdk.RemoveAttributes(new List<string> { "plan", "experiment" });
```

## Customize automatic tracking

By default, the SDK automatically tracks:

- **Views**: MAUI page navigations via `Application.PageAppearing` (one app-level event covering Shell route changes, `Navigation.PushAsync`, and modals). For Shell apps, the destination route is resolved at `Shell.Navigating` time and used as the view name (for example, `MainPage/DetailPage`).
- **Actions**: User interactions with buttons, switches, checkboxes, pickers, and gesture recognizers. `Button` and `ImageButton` taps fire on `Pressed` (not `Clicked`) so the action is recorded against the source view before any navigation triggered by a `Clicked` handler can shift the active view. A consequence is that an abandoned press (finger dragged off the button before release) is recorded as a tap.
- **Resources**: HTTP requests via `DiagnosticListener` (every `HttpClient` request, including those issued by third-party libraries).

To customize or disable any of these, configure `DdRumConfiguration`:

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",

    // Disable an automatic tracker
    AutomaticViewTracking = false,
    AutomaticActionTracking = false,
    AutomaticResourceTracking = false,

    // Or customize the view name
    ViewNamePredicate = (page) => page switch
    {
        MainPage => "Home",
        _ => null  // use the default name
    },

    // Skip specific pages from view tracking
    ViewTrackingPredicate = (page) => page is not SplashPage,

    // Filter or modify auto-tracked actions
    ActionEventMapper = (action) =>
    {
        if (action.Name.Contains("Debug")) return null;  // drop
        return action;
    },

    // Filter or modify auto-tracked resources
    ResourceEventMapper = (resource) =>
    {
        if (resource.Url.Contains("analytics")) return null;  // drop
        return resource;
    },
});
```

### View naming priority

View names are resolved in this order:

1. Custom `ViewNamePredicate` (if set and returns a non-null value).
2. Resolved Shell route (forward and back navigations both produce absolute paths like `MainPage/DetailPage`).
3. Page class name.

Pages pushed via `Navigation.PushAsync` (which Shell internally assigns synthetic `D_FAULT_…` routes) fall through to the page class name.

### Action target naming priority

Action target names are resolved in this order:

1. `AutomationId`
2. `StyleId` (the `x:Name` attribute)
3. The control's type name

Use `ActionEventMapper` to override the resolved name further.

### Known limitation: gesture-driven navigation

`TapGestureRecognizer.Tapped` and `SwipeGestureRecognizer.Swiped` only fire on completion. If a tap or swipe handler triggers a navigation, the resulting action is bucketed under the destination view rather than the source. This applies only to `View`s with explicit gesture recognizers; `Button` and `ImageButton` taps are unaffected.

## Modify or drop RUM events

Use `ErrorEventMapper` to modify or drop error events before they're sent to Datadog. The mapper receives a `DdRumErrorEvent` with `Message`, `Source`, `Stacktrace`, `Context`, and `TimestampMs` properties, and applies to both automatic and manual errors.

```csharp
DdRum.Enable(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",
    ErrorEventMapper = errorEvent =>
    {
        // Attach extra context to every error
        errorEvent.Context["team"] = "mobile";

        // Drop errors matching a pattern
        if (errorEvent.Message.Contains("ignore-this"))
            return null;

        // Modify the message
        errorEvent.Message = "[MyApp] " + errorEvent.Message;

        return errorEvent;
    }
});
```

Return `null` to drop the event entirely.

`ActionEventMapper` and `ResourceEventMapper` work the same way and apply to actions and resources captured by the automatic trackers.

## Stop the current session

Call `DdRum.StopSession` to terminate the current RUM session. A new session is created the next time an event is recorded (for example, a new view or a tap).

```csharp
DdRum.StopSession();
```

## Proxy configuration

To route all SDK traffic through a proxy, pass a `ProxyConfiguration` when initializing the SDK:

```csharp
DdSdk.Initialize(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    ProxyConfiguration = new ProxyConfiguration
    {
        Type = ProxyType.Http,
        Address = "proxy.example.com",
        Port = 8080,
        Username = "user",       // optional, HTTP/HTTPS only
        Password = "password"    // optional, HTTP/HTTPS only
    }
});
```

Supported proxy types: `Http`, `Https`, `Socks`. Authentication is supported for HTTP and HTTPS proxies only.

The same configuration can be loaded from a JSON file:

```json
{
  "ClientToken": "<CLIENT_TOKEN>",
  "Environment": "<ENV_NAME>",
  "ProxyConfiguration": {
    "Type": "Http",
    "Address": "proxy.example.com",
    "Port": 8080,
    "Username": "user",
    "Password": "password"
  }
}
```

## Custom endpoints

For testing against a local mock server, an on-premises Datadog deployment, or a corporate proxy, the Logs and Traces features accept a custom endpoint at enable time:

```csharp
DdLogs.Enable(new DdLogsConfiguration
{
    CustomEndpoint = "https://logs-proxy.example.com/v1/input"
});

DdTrace.Enable(new DdTraceConfiguration
{
    CustomEndpoint = "https://traces-proxy.example.com/v1/input"
});
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/maui/setup
[3]: /real_user_monitoring/application_monitoring/maui/data_collected
[4]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
