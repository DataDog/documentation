---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/alai97/flutter-monitoring-docs-edit/packages/datadog_flutter_plugin/README.md
description: Collect RUM data from your Flutter projects.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter Source code
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
kind: documentation
title: Flutter Monitoring
---
<p align="center">
  {{< img src="dd-logo.png" alt="Datadog logo" style="width:30%;">}}
</p>

## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your Flutter application’s individual users.

## Platform Support

| Android | iOS |  Web | MacOS | Linux | Windows |
| :-----: | :-: | :---: | :-: | :---: | :----: |
|   ✅    | ✅  |  🚧   | ❌  |  ❌   |   ❌   |

## Current Datadog SDK Versions

[//]: # (SDK Table)

iOS SDK | Android SDK | Browser SDK 
:-----: | :---------: | :---------: 
1.9.0 | 1.12.0-alpha2 | ❌

[//]: # (End SDK Table)


### iOS

Your iOS Podfile must have `use_frameworks!` (which is true by default in Flutter) and target iOS version >= 11.0.

### Android

On Android, your `minSdkVersion` must be >= 19, and if you are using Kotlin, it should be version >= 1.5.31.

## Setup

You need a Datadog client token for Logs and Tracing. If you are using RUM, you need an application ID.

### Specify application details in the UI

1. Navigate to [**UX Monitoring** > **RUM Applications** > **New Application**][1].
2. Select `flutter` as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. Click **+ Create New RUM Application**.

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][2] to configure the `@datadog/mobile-react-native` library, they would be exposed client-side in the React Native application's code. 

For more information about setting up a client token, see the [Client Token documentation][3].

### Configure Datadog

Create a configuration object for each Datadog feature (such as Logging, Tracing, and RUM) with the following snippet. By not passing a configuration for a given feature, it is disabled.

```dart
// Determine the user's consent to be tracked
final trackingConsent = ...
final configuration = DdSdkConfiguration(
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
  trackingConsent: trackingConsent,
  nativeCrashReportEnabled: true,
  loggingConfiguration: LoggingConfiguration(
    sendNetworkInfo: true,
    printLogsToConsole: true,
  ),
  tracingConfiguration: TracingConfiguration(
    sendNetworkInfo: true,
  ),
  rumConfiguration: RumConfiguration(
    applicationId: '<RUM_APPLICATION_ID',
  )
);
```

### Initialize the library

You can initialize Datadog using one of two methods in the `main.dart` file.

1. Use `DatadogSdk.runApp`, which automatically sets up error reporting and resource tracing. This is the simplest way to initialize Datadog.

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

### Track RUM views

The Datadog Flutter Plugin can automatically track named routes using the `DatadogNavigationObserver` on your MaterialApp.

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(),
  ],
);
```

This only works if you are using named routes or if you have supplied a name to the `settings` parameter of your `PageRoute`.

Alternately, you can use the `DatadogRouteAwareMixin` property in conjunction with the `DatadogNavigationObserverProvider` property to start and stop you RUM views automatically. With `DatadogRouteAwareMixin`, move any logic from `initState` to `didPush`. 

## Contributing

Pull requests are welcome. First, open an issue to discuss what you would like to change. 

For more information, read the [Contributing guidelines][4].

## License

For more information, see [Apache License, v2.0][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[4]: https://github.com/DataDog/dd-sdk-flutter/blob/main/CONTRIBUTING.md
[5]: https://github.com/DataDog/dd-sdk-flutter/blob/main/LICENSE
