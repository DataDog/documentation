---
title: Disable RUM
description: Learn how to fully disable Real User Monitoring, including removing the SDK from your application and deleting the application from Datadog.
further_reading:
- link: '/real_user_monitoring/application_monitoring/browser/'
  tag: 'Documentation'
  text: 'RUM Browser Monitoring'
- link: '/real_user_monitoring/guide/monitor-your-rum-usage'
  tag: 'Guide'
  text: 'Monitor your RUM usage'
- link: '/real_user_monitoring/guide/sampling-browser-plans'
  tag: 'Guide'
  text: 'Configure RUM sampling'
---

## Overview

Disabling RUM involves two independent components:

- **The SDK in your application**: collects user session data and sends it to Datadog. Removing or disabling the SDK stops data from being sent from user browsers.
- **The RUM application in Datadog**: stores the application configuration, dashboards, and monitors. Deleting the application removes it from the Datadog UI.

These two components are independent. Disabling one does not automatically disable the other. To fully stop data collection and remove the application from Datadog, you must address both.

## Understand what happens if you only disable one component

| Action | Result |
|---|---|
| Delete application from Datadog UI, but SDK still in your code | The application is marked as disabled. The SDK continues running in your code, but Datadog rejects the data at intake—events are not ingested or billed. |
| Remove SDK from your code, but application still in Datadog | No new data is sent. The application remains visible in Datadog with a "no data" state, and its dashboards and monitors remain intact. |

## Disable the SDK in your application

Choose one of the following approaches depending on your goal.

### Revoke the client token

To stop data ingestion without deploying code changes, revoke the client token in Datadog. The SDK continues running in your application and collecting data, but Datadog rejects all submissions with a 403 error. Revoking a token takes approximately 2 hours to take effect across all intake endpoints.

To revoke a client token, go to [**Organization Settings** > **Client Tokens**][2], find the token for your application, and revoke it.

### Skip initialization

If you do not initialize the Datadog SDK, all SDK methods remain safe to call and do nothing. The SDK logs a one-time warning but does not throw errors. This is useful if you want to remove the initialization call from your code without removing every call site immediately.

### Pause data collection without removing the SDK

Set the session sample rate to `0` to stop sending data without removing the SDK from your codebase. This lets you re-enable RUM later without changing your deployment pipeline.

{{% collapse-content title="Browser" level="h4" id="pause-browser" %}}

This takes effect after the next page load.

{{< tabs >}}
{{% tab "CDN async" %}}

```javascript
DD_RUM.onReady(function() {
  DD_RUM.init({
    // ... other options
    sessionSampleRate: 0,
    sessionReplaySampleRate: 0,
  });
});
```

{{% /tab %}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  // ... other options
  sessionSampleRate: 0,
  sessionReplaySampleRate: 0,
});
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="iOS" level="h4" id="pause-ios" %}}

This takes effect after the next app launch. To stop collection immediately without a relaunch, use `Datadog.set(trackingConsent: .notGranted)` instead. Any data already captured before that call is still sent to Datadog.

```swift
let configuration = RUM.Configuration(
    applicationID: "<RUM_APPLICATION_ID>",
    sessionSampleRate: 0
)
```

To stop collection immediately:

```swift
Datadog.set(trackingConsent: .notGranted)
```

{{% /collapse-content %}}

{{% collapse-content title="Android" level="h4" id="pause-android" %}}

This takes effect after the next app launch. To stop collection immediately without a relaunch, use `Datadog.setTrackingConsent(TrackingConsent.NOT_GRANTED)` instead. Any data already captured before that call is still sent to Datadog.

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .setSessionSampleRate(0.0f)
    .build()
Rum.enable(rumConfig)
```

To stop collection immediately:

```kotlin
Datadog.setTrackingConsent(TrackingConsent.NOT_GRANTED)
```

{{% /collapse-content %}}

{{% collapse-content title="Flutter" level="h4" id="pause-flutter" %}}

This takes effect after the next app launch. `sessionSamplingRate` controls RUM sessions. To also disable Session Replay, set `replaySampleRate: 0.0`. To stop collection immediately without a relaunch, use `setTrackingConsent` instead. Any data already captured before that call is still sent to Datadog.

```dart
final config = DatadogConfiguration(
    // other configuration...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<RUM_APPLICATION_ID>',
        sessionSamplingRate: 0.0,
    ),
);
```

To stop collection immediately:

```dart
await DatadogSdk.instance.setTrackingConsent(TrackingConsent.notGranted);
```

{{% /collapse-content %}}

### Remove the SDK from your application

{{% collapse-content title="Browser" level="h4" id="remove-browser" %}}

{{< tabs >}}
{{% tab "CDN async" %}}

Remove the `<script>` block from the `<head>` of your HTML pages.

{{% /tab %}}
{{% tab "npm" %}}

Remove the SDK initialization code and the package:

```shell
npm uninstall @datadog/browser-rum
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="iOS" level="h4" id="remove-ios" %}}

Remove the Datadog pod from your Podfile, then run:

```shell
pod install
```

Remove any remaining Datadog initialization and import statements from your code. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.

{{% /collapse-content %}}

{{% collapse-content title="Android" level="h4" id="remove-android" %}}

Remove the Datadog dependency from your `build.gradle` file, then sync your project. Remove any remaining Datadog initialization and import statements from your code. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.

{{% /collapse-content %}}

{{% collapse-content title="Flutter" level="h4" id="remove-flutter" %}}

Remove the Datadog packages from your `pubspec.yaml` file, then run:

```shell
flutter pub get
```

Remove any remaining Datadog initialization and import statements from your code. After removal, there may be residual cached data on the device. This data is not sent to Datadog and is eventually cleared by the operating system.

{{% /collapse-content %}}

## Delete the RUM application from Datadog

After disabling the SDK, delete the RUM application from Datadog to remove its configuration, dashboards, and monitors.

1. In Datadog, go to [**Digital Experience** > **RUM Applications**][1].
1. Find your application and click the settings icon.
1. Select **Delete application**.
1. Confirm the deletion.

Deleting an application is permanent. All associated data, monitors, and dashboards for that application are removed from Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: https://app.datadoghq.com/organization-settings/client-tokens
