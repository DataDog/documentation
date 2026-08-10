<!--
This partial contains troubleshooting content for the .NET MAUI SDK.
It can be included in the .NET MAUI SDK troubleshooting page or in the unified client_sdks view.
-->

## Overview

If you encounter issues while using the Datadog .NET MAUI SDK, check the [open issues on GitHub][1] for known problems and solutions. If you continue to have trouble, contact [Datadog Support][2] for further assistance.

## Enable verbose SDK logging

You can enable verbose SDK logging to help diagnose issues. Set `Verbosity` on the SDK configuration — all internal messages at or above the provided level are written to Logcat (Android) and to the Xcode debugger console (iOS):

```csharp
using Datadog.Maui;
using Datadog.Maui.Configuration;

DdSdk.Initialize(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    Verbosity = SdkVerbosity.DEBUG,
});
```

Supported levels: `DEBUG`, `INFO`, `WARN`, `ERROR`. The same property can be set via JSON ([File-based configuration][3]):

```json
{ "Verbosity": "DEBUG" }
```

Enable verbose logging only while diagnosing — the additional log volume can affect application performance on debug devices.

## No RUM events appear in Datadog

Work through the checks below in order.

### 1. Confirm the SDK is initialized

`DdSdk.Initialize` (Pattern 2) and `.UseDatadog(...)` (Pattern 1) must run before any other Datadog API call. If you initialize from a non-default location (for example, a feature flag–gated startup path), make sure that code runs on every cold launch.

With verbose logging enabled, the SDK prints a startup message confirming the active site, environment, and feature set.

### 2. Confirm tracking consent is `Granted`

If `TrackingConsent` is `Pending` or `NotGranted`, the SDK does not send any data. Update the consent at runtime after the user accepts your privacy dialog:

```csharp
DdSdk.SetTrackingConsent(TrackingConsent.Granted);
```

See [Set tracking consent (GDPR compliance)][4] for the full state machine.

### 3. Confirm the right Datadog site

The default site is `Us1`. If your organization is on a different site (`Us3`, `Us5`, `Eu1`, `Ap1`, `Ap2`, `Us1Fed`), set `Site` accordingly on `DdSdkConfiguration`. The site selector at the top of these documentation pages updates code samples to match.

### 4. Confirm the application ID and client token

A wrong application ID silently drops events server-side. Double-check the values against the application you created in [**Digital Experience** > **Add an Application**][5].

## Events appear, but stack traces are not symbolicated

For native iOS and Android crashes, dSYMs (iOS) and `mapping.txt` (Android) must be uploaded to Datadog. See [Get deobfuscated stack traces][6] for the full pipeline.

For managed C# stack traces, Portable PDB files must be bundled in the published app. See [Bundle Portable PDB files for C# stack traces][7].

## C# errors and native crashes appear twice

When `NativeCrashReportEnabled = true`, an unhandled C# exception that crashes the app is reported both as a managed C# error (via `AppDomain.UnhandledException`) and as a native crash (via the platform crash reporter). This is intentional — the two events share a session and view so you can correlate them. To keep only one, filter with [`ErrorEventMapper`][8].

## Automatic actions are bucketed under the wrong view

`TapGestureRecognizer.Tapped` and `SwipeGestureRecognizer.Swiped` only fire on completion, so a tap or swipe that triggers a navigation is recorded against the destination view rather than the source. This is a known limitation that affects only `View`s with explicit gesture recognizers; `Button` and `ImageButton` taps are not affected. See [Known limitation: gesture-driven navigation][9].

## View attributes attach to the wrong view

`DdRum.AddViewAttribute` runs against the view that is active in the SDK at the time of the call. If you call it from a page constructor or `OnAppearing`, the SDK has not yet called `StartView` for the new page, and the attribute lands on the previous view.

Call `AddViewAttribute` from `OnNavigatedTo` instead — by then the SDK has started the destination view. See [Add view attributes][10].

## `dotnet publish` finishes but symbols are not uploaded

The MSBuild target skips silently when `datadog-ci` is missing or `DATADOG_API_KEY` is unset. The terminal logger hides those messages by default — add `-v n -tl:off` to `dotnet publish` to see them:

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true -v n -tl:off
```

See [Symbol upload troubleshooting][11] for the full diagnostic list.

[1]: https://github.com/DataDog/dd-sdk-maui/issues
[2]: /help/
[3]: /real_user_monitoring/application_monitoring/maui/setup/#initialize-the-datadog-sdk
[4]: /real_user_monitoring/application_monitoring/maui/setup/#set-tracking-consent-gdpr-compliance
[5]: https://app.datadoghq.com/rum/application/create
[6]: /real_user_monitoring/application_monitoring/maui/error_tracking/#get-deobfuscated-stack-traces
[7]: /real_user_monitoring/application_monitoring/maui/error_tracking/#bundle-portable-pdb-files-for-c-stack-traces
[8]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#modify-or-drop-rum-events
[9]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#known-limitation-gesture-driven-navigation
[10]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#add-view-attributes
[11]: /real_user_monitoring/application_monitoring/maui/error_tracking/#troubleshooting
