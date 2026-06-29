<!--
This partial contains data collected information for the .NET MAUI SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

## Overview

The Datadog .NET MAUI SDK for RUM generates events with associated telemetry and attributes. Telemetry are quantifiable values that can be used for measurements related to the event. Attributes are non-quantifiable values used to slice telemetry values (group by) in the RUM Explorer.

Most .NET MAUI Monitoring data is collected by the native Datadog iOS and Android SDKs for RUM, and is retained for the same periods of time.

* For iOS event-specific telemetry and attributes, see [RUM iOS Data Collected][1].
* For Android event-specific telemetry and attributes, see [RUM Android Data Collected][2].

## What's collected by the .NET MAUI layer

These events originate from the .NET MAUI SDK before being forwarded to the native iOS or Android SDK. They use the same event schemas as iOS and Android above, with the following MAUI-specific notes:

| Event | Trigger | Notes |
|---|---|---|
| **View** | MAUI page navigation (`Application.PageAppearing`) — including Shell route changes, `Navigation.PushAsync`, and modals | `view.name` is the resolved Shell route (for example, `MainPage/DetailPage`) or, for non-Shell navigations, the page class name. See [view naming priority][3]. |
| **Action** | Taps on `Button`, `ImageButton`, `Switch`, `CheckBox`, `Picker`, and `TapGestureRecognizer`/`SwipeGestureRecognizer` | `action.target.name` is resolved from `AutomationId` → `StyleId` (`x:Name`) → control type name. See [action target naming priority][4]. |
| **Resource** | Every `HttpClient` request, tracked via `DiagnosticListener` (includes requests issued by third-party libraries) | Captured at the .NET layer rather than the platform layer, so requests issued by managed code are visible even when they don't surface through the native HTTP stack. |
| **Error** | Unhandled C# exceptions (`AppDomain.UnhandledException`), unobserved task exceptions (`TaskScheduler.UnobservedTaskException`), and (optionally) native iOS/Android crashes when `NativeCrashReportEnabled = true` | C# errors include the managed stack trace; native crashes include the platform stack trace. See [Crash Reporting and Error Tracking][5]. |

## Disabling automatic data collection

In Datadog, navigate to [**Digital Experience** > **Performance Monitoring** > **Application List**][6] to access your application's settings. To stop collecting client IPs or geolocation data, uncheck the corresponding settings.

To customize or disable individual MAUI trackers in code, see [Advanced Configuration > Customize automatic tracking][7].

[1]: /real_user_monitoring/application_monitoring/ios/data_collected/#event-specific-attributes
[2]: /real_user_monitoring/application_monitoring/android/data_collected/#event-specific-attributes
[3]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#view-naming-priority
[4]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#action-target-naming-priority
[5]: /real_user_monitoring/application_monitoring/maui/error_tracking/
[6]: https://app.datadoghq.com/rum/list
[7]: /real_user_monitoring/application_monitoring/maui/advanced_configuration/#customize-automatic-tracking
