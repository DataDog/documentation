<!--
This partial contains setup instructions for the .NET MAUI SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the .NET MAUI SDK. RUM includes Error Tracking by default, but if you have purchased Error Tracking as a standalone product, see the [Error Tracking setup guide][2] for specific steps.

The Datadog .NET MAUI SDK supports .NET 9.0 and .NET 10.0, with iOS 15.0+ and Android API level 23+.

## Setup

{% stepper %}

{% step title="Add the Datadog SDK as a NuGet dependency" %}
Add a `PackageReference` to [`Datadog.Maui`][3] in your MAUI project's `.csproj` file:

```xml
<PackageReference Include="Datadog.Maui" Version="<latest_version>" />
```
{% /step %}

{% step title="Specify application details in the UI" %}

1. Navigate to [**Digital Experience** > **Add an Application**][4].
2. Select `.NET MAUI` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM .NET MAUI Data Collected][5].

{% alert level="info" %}
If you've purchased Error Tracking as a standalone product (without RUM), navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][6] instead.
{% /alert %}

To ensure the safety of your data, you must use a client token. If you use only [Datadog API keys][7] to configure the Datadog SDK, they are exposed client-side in the .NET MAUI application's compiled assemblies.

For more information about setting up a client token, see the [Client Token documentation][8].
{% /step %}

{% step title="Initialize the Datadog SDK" %}

The SDK exposes two initialization patterns. Choose the pattern that matches your app's hosting style. See [`TrackingConsent`](#set-tracking-consent-gdpr-compliance) to add GDPR compliance for your EU users, and [other configuration options][9] to initialize the library.

#### Pattern 1: Builder extensions (recommended)

Chain the `UseDatadog*` extensions onto your `MauiAppBuilder` in `MauiProgram.CreateMauiApp`:

```csharp
using Datadog.Maui;
using Datadog.Maui.Configuration;
using Datadog.Maui.Hosting;

public static MauiApp CreateMauiApp()
{
    var builder = MauiApp.CreateBuilder();
    builder
        .UseMauiApp<App>()
        .UseDatadog(new DdSdkConfiguration
        {
            ClientToken = "<CLIENT_TOKEN>",
            Environment = "<ENV_NAME>",
            TrackingConsent = TrackingConsent.Granted,
            Service = "<SERVICE_NAME>",{% region-param key="maui_site_config" /%}
            NativeCrashReportEnabled = true,
            FirstPartyHosts = new List<FirstPartyHost>
            {
                new() { Match = "api.example.com", HeaderTypes = new List<TracingHeaderType> { TracingHeaderType.Datadog, TracingHeaderType.TraceContext } }
            },
        })
        .UseDatadogLogs()
        .UseDatadogTrace()
        .UseDatadogRum(new DdRumConfiguration
        {
            ApplicationId = "<APPLICATION_ID>",
            SessionSampleRate = 100.0,
        });

    return builder.Build();
}
```

#### Pattern 2: Standalone calls

For apps that already have a custom host pipeline, or that want to enable features lazily, call the static APIs directly. Call `DdRum.Enable` from a page constructor (or any time after `Application.Current` is set) so its automatic page and action trackers can subscribe to MAUI's `Application` events.

```csharp
using Datadog.Maui;
using Datadog.Maui.Configuration;

public static MauiApp CreateMauiApp()
{
    var builder = MauiApp.CreateBuilder();
    builder.UseMauiApp<App>();

    DdSdk.Initialize(new DdSdkConfiguration
    {
        ClientToken = "<CLIENT_TOKEN>",
        Environment = "<ENV_NAME>",
        TrackingConsent = TrackingConsent.Granted,
        // ...
    });

    return builder.Build();
}

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();

        DdLogs.Enable();
        DdTrace.Enable();
        DdRum.Enable(new DdRumConfiguration { ApplicationId = "<APPLICATION_ID>" });
    }
}
```

#### File-based configuration

You can also load the SDK configuration from a JSON file at runtime:

```json
{
  "ClientToken": "<CLIENT_TOKEN>",
  "Environment": "<ENV_NAME>",
  "Site": "Us1",
  "Service": "<SERVICE_NAME>",
  "TrackingConsent": "Granted",
  "FirstPartyHosts": [
    { "Match": "api.example.com", "HeaderTypes": ["Datadog", "TraceContext"] }
  ]
}
```

```csharp
string json = File.ReadAllText("appsettings.json");
var config = FileBasedConfiguration.ParseJsonConfig(json);
DdSdk.Initialize(config);
```
{% /step %}

{% step title="Sample RUM sessions" %}

To control the data your application sends to Datadog RUM, you can specify a sample rate for RUM sessions during initialization. The rate is a percentage between 0 and 100. By default, `SessionSampleRate` is set to `100.0` (keep all sessions).

```csharp
.UseDatadogRum(new DdRumConfiguration
{
    ApplicationId = "<APPLICATION_ID>",
    // Send 75% of RUM sessions to Datadog
    SessionSampleRate = 75.0,
})
```
{% /step %}

{% step title="Enable RUM to start sending data" %}

By default, the SDK automatically tracks views, actions, and resources:

- **Views**: MAUI page navigations via `Application.PageAppearing` (one app-level event covering Shell route changes, `Navigation.PushAsync`, and modals).
- **Actions**: User interactions with buttons, switches, checkboxes, pickers, and gesture recognizers.
- **Resources**: HTTP requests via `DiagnosticListener` (all `HttpClient` requests, including third-party libraries).

To customize or disable automatic tracking, see [Advanced Configuration][9].

When RUM is enabled, C# error tracking is automatically started. Unhandled exceptions (`AppDomain.UnhandledException`) and unobserved task exceptions (`TaskScheduler.UnobservedTaskException`) are captured and reported as RUM errors. You can also manually report errors with `DdRum.AddError`.

### Set tracking consent (GDPR compliance)

To be compliant with GDPR, the SDK requires the tracking consent value at initialization. Tracking consent can be one of the following values:

- `TrackingConsent.Pending`: The SDK starts collecting and batching the data, but does not send it to the collection endpoint. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.Granted`: The SDK starts collecting the data and sends it to the data collection endpoint.
- `TrackingConsent.NotGranted`: The SDK does not collect any data. You are not able to manually send any logs, traces, or RUM events.

To update the tracking consent after the SDK is initialized, call `DdSdk.SetTrackingConsent(<NEW_CONSENT>)`. The SDK changes its behavior according to the new consent. For example, if the current tracking consent is `TrackingConsent.Pending` and you update it to:

- `TrackingConsent.Granted`: The SDK sends all current batched data and future data directly to the data collection endpoint.
- `TrackingConsent.NotGranted`: The SDK wipes all batched data and does not collect any future data.

```csharp
// For example, after the user accepts a consent dialog:
DdSdk.SetTrackingConsent(TrackingConsent.Granted);
```
{% /step %}

{% /stepper %}

## Track errors

[.NET MAUI Crash Reporting and Error Tracking][10] displays any issues in your application and the latest available errors. You can view error details and attributes including JSON in the [RUM Explorer][11].

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches.

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/mobile/maui/
[3]: https://www.nuget.org/packages/Datadog.Maui
[4]: https://app.datadoghq.com/rum/application/create
[5]: /real_user_monitoring/application_monitoring/maui/data_collected
[6]: https://app.datadoghq.com/error-tracking/settings/setup/client
[7]: /account_management/api-app-keys/#api-keys
[8]: /account_management/api-app-keys/#client-tokens
[9]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/
[10]: /real_user_monitoring/error_tracking/mobile/maui/
[11]: /real_user_monitoring/explorer/
