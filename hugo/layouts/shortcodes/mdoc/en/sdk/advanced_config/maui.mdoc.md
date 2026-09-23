<!--
This partial contains advanced configuration instructions for the .NET MAUI SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or see the [.NET MAUI RUM setup documentation][2].

## Enrich user sessions

For setup steps that enrich RUM events with custom views, actions, resources, and errors, see [Add Custom Context](/real_user_monitoring/enrich_rum_data/add_custom_context/?platform=maui).

## Track custom global attributes

In addition to the [default RUM attributes][3] captured by the SDK, you can attach contextual information — such as feature flags, experiment IDs, plan tier, or other business attributes — to every event the SDK sends.

### Track user sessions

See [Track user IDs][8] for instructions on adding user information to your RUM sessions.

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

For setup steps, see [Modify or Drop RUM Events](/real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=maui).

## Stop the current session

For setup steps, see [Manage Data Collection](/real_user_monitoring/setup/enable_rum/manage_data_collection/?platform=maui).

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
[3]: /real_user_monitoring/setup/data_collected/?platform=maui
[4]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /real_user_monitoring/setup/enable_rum/track_network_requests/?platform=maui
[6]: /real_user_monitoring/setup/enable_rum/track_navigation/?platform=maui
[7]: /real_user_monitoring/setup/enable_rum/track_user_interactions/?platform=maui
[8]: /real_user_monitoring/enrich_rum_data/track_user_ids/?platform=maui
