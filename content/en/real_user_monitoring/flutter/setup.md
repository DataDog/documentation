---
title: Setup
kind: documentation
description: Setup Flutter Monitoring for RUM & Session Replay or Log Management.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

Use the [Datadog Flutter Plugin][1] to set up Log Management or Real User Monitoring (RUM). The setup instructions may vary based on your decision to use Logs, RUM, or both, but most of the setup steps are consistent.

## Prerequisites

First, ensure that you have your environment set up properly for each platform.

<div class="alert alert-info">
Datadog supports Flutter Monitoring for iOS and Android for Flutter 2.8+. Support for Flutter Web is in alpha.
</div>

### iOS

Your iOS Podfile, located in `ios/Podfile`, must have `use_frameworks!` set to true (which is the default in Flutter) and must set its target iOS version >= 11.0.

This constraint is usually commented out on the top line of the Podfile, and should read:

```ruby
platform :ios, '11.0'
```

You can replace `11.0` with any minimum version of iOS you want to support that is 11.0 or higher.

### Android

For Android, your `minSdkVersion` version must be >= 19, and if you are using Kotlin, it should be a version >= 1.6.21. These constraints are usually held in your `android/app/build.gradle` file.

### Web

For Web, add the following to your `index.html` under the `head` tag, for **{{<region-param key="dd_site_name">}}** site:
{{< site-region region="us" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
```
{{</ site-region>}}

This loads the CDN-delivered Datadog Browser SDKs for Logs and RUM. The synchronous CDN-delivered version of the Browser SDK is the only version supported by the Datadog Flutter Plugin.

## Setup

1. Add the following to your `pubspec.yaml` file:

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^1.3.0
   ```
2. Create a configuration object for each Datadog feature (such as Logs or RUM) with the following snippet. If you do not pass a configuration for a given feature, that feature is disabled.

   ```dart
   // Determine the user's consent to be tracked
   final trackingConsent = ...
   final configuration = DdSdkConfiguration(
     clientToken: '<CLIENT_TOKEN>',
     env: '<ENV_NAME>',
     site: DatadogSite.us1,
     trackingConsent: trackingConsent,
     nativeCrashReportEnabled: true,
     loggingConfiguration: LoggingConfiguration(
       sendNetworkInfo: true,
       printLogsToConsole: true,
     ),
     rumConfiguration: RumConfiguration(
       applicationId: '<RUM_APPLICATION_ID>',
     )
   );
   ```

For more information on available configuration options, see the [DdSdkConfiguration object documentation][5].

To ensure the safety of your data, you must use a client token. You cannot use Datadog API keys to configure the Datadog Flutter Plugin.

- If you are using RUM, set up a **Client Token** and **Application ID**.
- If you are only using Logs, initialize the library with a client token.

For more information about setting up a client token, see the [Client Token documentation][3].

### Initialize the library

You can initialize RUM using one of two methods in your `main.dart` file.

1. Use `DatadogSdk.runApp` which automatically sets up [Error Tracking][4].

   ```dart
   await DatadogSdk.runApp(configuration, () async {
     runApp(const MyApp());
   })
   ```

2. Alternatively, manually set up [Error Tracking][4] and resource tracking. `DatadogSdk.runApp` calls `WidgetsFlutterBinding.ensureInitialized`, so if you are not using `DatadogSdk.runApp`, you need to call this method prior to calling `DatadogSdk.instance.initialize`.

   ```dart
   runZonedGuarded(() async {
     WidgetsFlutterBinding.ensureInitialized();
     final originalOnError = FlutterError.onError;
     FlutterError.onError = (details) {
       FlutterError.presentError(details);
       DatadogSdk.instance.rum?.handleFlutterError(details);
       originalOnError?.call(details);
     };

     await DatadogSdk.instance.initialize(configuration);

     runApp(const MyApp());
   }, (e, s) {
     DatadogSdk.instance.rum?.addErrorInfo(
       e.toString(),
       RumErrorSource.source,
       stackTrace: s,
     );
   });
   ```

### Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the Flutter RUM SDK][2] as a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

For example, to keep only 50% of sessions, use:

```dart
final config = DdSdkConfiguration(
    // other configuration...
    rumConfiguration: RumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        sessionSamplingRate: 50.0,
    ),
);
```

### Set tracking consent

To be compliant with the GDPR regulation, the Datadog Flutter SDK requires the `trackingConsent` value at initialization.

Set `trackingConsent` to one of the following values:

- `TrackingConsent.pending`: The Datadog Flutter SDK starts collecting and batching the data but does not send it to Datadog. It waits for the new tracking consent value to decide what to do with the batched data.
- `TrackingConsent.granted`: The Datadog Flutter SDK starts collecting the data and sends it to Datadog.
- `TrackingConsent.notGranted`: The Datadog Flutter SDK does not collect any data, which means no logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the SDK is initialized, use the `DatadogSdk.setTrackingConsent` API call.

The SDK changes its behavior according to the new value. For example, if the current tracking consent is `TrackingConsent.pending`:

- You change it to `TrackingConsent.granted`, the SDK sends all current and future data to Datadog;
- You change it to `TrackingConsent.notGranted`, the SDK wipes all current data and does not collect any future data.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_flutter_plugin
[2]: https://app.datadoghq.com/rum/application/create
[3]: /account_management/api-app-keys/#client-tokens
[4]: /real_user_monitoring/error_tracking/flutter
[5]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DdSdkConfiguration-class.html
