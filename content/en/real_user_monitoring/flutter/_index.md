---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/README.md
description: Collect RUM data from your Flutter projects.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter Source code
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
kind: documentation
title: Flutter Monitoring
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your Flutter application’s individual users.

RUM supports monitoring for Flutter Android and iOS applications for Flutter 2.8+.

## Current Datadog SDK Versions

[//]: # (SDK Table)

| iOS SDK | Android SDK | Browser SDK |
| :-----: | :---------: | :---------: |
| 1.12.0-beta2 | 1.14.0-beta1 | v4.11.2 |

[//]: # (End SDK Table)

### iOS

Your iOS Podfile must have `use_frameworks!` (which is true by default in Flutter) and target iOS version >= 11.0.

### Android

On Android, your `minSdkVersion` must be >= 19, and if you are using Kotlin, it should be version >= 1.5.31.

### Web

`⚠️ Datadog support for Flutter Web is still in early development`

On Web, add the following to your `index.html` under your `head` tag:

```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
```

This loads the CDN-delivered Datadog Browser SDKs for Logs and RUM. The synchronous CDN-delivered version of the Datadog Browser SDK is the only version supported by the Flutter plugin.

## Setup

### Specify application details in the UI

1. In the [Datadog app][1], navigate to **UX Monitoring** > **RUM Applications** > **New Application**.
2. Choose `Flutter` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.

{{< img src="real_user_monitoring/flutter/image_flutter.png" alt="Create a RUM application in Datadog workflow" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][4].

### Create configuration object

Create a configuration object for each Datadog feature (such as Logs and RUM) with the following snippet. By not passing a configuration for a given feature, it is disabled.

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

For more information on available configuration options, see the [DdSdkConfiguration object][9] documentation.

### Initialize the library

You can initialize RUM using one of two methods in the `main.dart` file.

1. Use `DatadogSdk.runApp`, which automatically sets up error reporting and resource tracing. 

   ```dart
   await DatadogSdk.runApp(configuration, () async {
     runApp(const MyApp());
   })
   ```

2. Alternatively, you can manually set up error tracking and resource tracking. Because `DatadogSdk.runApp` calls `WidgetsFlutterBinding.ensureInitialized`, if you are not using `DatadogSdk.runApp`, you need to call this method prior to calling `DatadogSdk.instance.initialize`.

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

### Send Logs

After initializing Datadog with a `LoggingConfiguration`, you can use the default instance of `logs` to send logs to Datadog.

```dart
DatadogSdk.instance.logs?.debug("A debug message.");
DatadogSdk.instance.logs?.info("Some relevant information?");
DatadogSdk.instance.logs?.warn("An important warning…");
DatadogSdk.instance.logs?.error("An error was met!");
```

You can also create additional loggers with the `createLogger` method:

```dart
final myLogger = DatadogSdk.instance.createLogger(
  LoggingConfiguration({
    loggerName: 'Additional logger'
  })
);

myLogger.info('Info from my additional logger.');
```

Tags and attributes set on loggers are local to each logger.

### Track RUM views

The Datadog Flutter Plugin can automatically track named routes using the `DatadogNavigationObserver` on your MaterialApp.

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

This works if you are using named routes or if you have supplied a name to the `settings` parameter of your `PageRoute`.

Alternately, you can use the `DatadogRouteAwareMixin` property in conjunction with the `DatadogNavigationObserverProvider` property to start and stop your RUM views automatically. With `DatadogRouteAwareMixin`, move any logic from `initState` to `didPush`. 

### Automatic Resource Tracking

You can enable automatic tracking of resources and HTTP calls from your RUM views using the [Datadog Tracking HTTP Client][7] package. Add the package to your `pubspec.yaml`, and add the following to your initialization:

```dart
final configuration = DdSdkConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

In order to enable Datadog Distributed Tracing, the `DdSdkConfiguration.firstPartyHosts` property in your configuration object must be set to a domain that supports distributed tracing. You can also modify the sampling rate for Datadog distributed tracing by setting the `tracingSamplingRate` on your `RumConfiguration`.

## Data Storage

### Android

Before data is uploaded to Datadog, it is stored in cleartext in your application's cache directory.
This cache folder is protected by [Android's Application Sandbox][6], meaning that on most devices,
this data can't be read by other applications. However, if the mobile device is rooted, or someone
tampers with the Linux kernel, the stored data might become readable.

### iOS

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`)
of your [application sandbox][2], which can't be read by any other app installed on the device.

## Contributing

Pull requests are welcome. First, open an issue to discuss what you would like to change. 

For more information, read the [Contributing guidelines][4].

## License

For more information, see [Apache License, v2.0][5].

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[4]: https://github.com/DataDog/dd-sdk-flutter/blob/main/CONTRIBUTING.md
[5]: https://github.com/DataDog/dd-sdk-flutter/blob/main/LICENSE
[6]: https://source.android.com/security/app-sandbox
[7]: https://pub.dev/packages/datadog_tracking_http_client
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DdSdkConfiguration-class.html
