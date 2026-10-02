<!--
This partial contains setup instructions for the Flutter SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your Flutter applications with the Datadog Flutter SDK.

The Flutter SDK supports [Real User Monitoring (RUM)][1], [Error Tracking][2], [Product Analytics][6], and [Session Replay][7].

## Setup

{% stepper level="h4" %}

{% step title="Add the dependencies" %}

First, make sure your environment is set up for each platform.

{% alert level="info" %}
Datadog supports Flutter Monitoring for iOS, Android, and Web for Flutter 3.27+.
{% /alert %}

Datadog supports Flutter Web starting with v3 of the SDK, with a few known limitations.

* Long running actions (`startAction` and `stopAction`) are not supported
* Event mappers are not supported.

#### iOS

The Datadog SDK for Flutter supports integration with both Cocoapods and Swift Package Manager (SPM).

If you are using Cocoapods, your iOS Podfile, located in `ios/Podfile`, must have `use_frameworks!` set to true (which is the default in Flutter) and must set its target iOS version >= 12.0.

This constraint is usually commented out on the top line of the Podfile, and should read:

```ruby
platform :ios, '12.0'
```

You can replace `12.0` with any minimum version of iOS you want to support that is 12.0 or higher.

#### Android

For Android, your `minSdkVersion` version must be >= 23, and your `compileSdkVersion` must be >= 35. Clients using Flutter after 3.27 usually have these variables set to Flutter constants (`flutter.minSdkVersion` and `flutter.compileSdkVersion`), and they do not have to be manually changed.

If you are using Kotlin, it should be a version >= 2.1.0. Flutter versions above 3.27 emit a warning stating that older versions of Kotlin are not supported, and provide instructions for updating.

These constraints are usually held in your `android/app/build.gradle` file, or in your `android/gradle.properties` file.

#### Web

For Web, add the following to your `index.html` under the `head` tag:

```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/{% region-param key="flutter_web_logs_cdn_path" /%}"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/{% region-param key="flutter_web_rum_cdn_path" /%}"></script>
```

This loads the CDN-delivered Datadog Browser SDKs for Logs and RUM. The synchronous CDN-delivered version of the Browser SDK is the only version supported by the Datadog Flutter Plugin.

#### Add the plugin

Add the following to your `pubspec.yaml` file:

```yaml
dependencies:
  datadog_flutter_plugin: ^3.0.0
```

{% /step %}

{% step title="Initialize the SDK" %}

Create a configuration object for each Datadog feature (such as Logs or RUM) with the following snippet. If you do not pass a configuration for a given feature, that feature is disabled.

```dart
// Determine the user's consent to be tracked
final trackingConsent = ...
final configuration = DatadogConfiguration(
  clientToken: '<CLIENT_TOKEN>',
  env: '<ENV_NAME>',
  site: DatadogSite.us1,
  nativeCrashReportEnabled: true,
  loggingConfiguration: DatadogLoggingConfiguration(),
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
  )
);
```

For more information on available configuration options, see the [DatadogConfiguration object documentation][3].

To secure data, you must use a client token. You cannot use Datadog API keys to configure the Datadog [Flutter Plugin][4].

* If you are using RUM, set up a {% ui %}Client Token{% /ui %} and {% ui %}Application ID{% /ui %}.
* If you are only using Logs, initialize the library with a client token.

You can initialize the library using one of two methods in your `main.dart` file.

* Use `DatadogSdk.runApp` to automatically set up [Error Tracking][5].

```dart
await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
  runApp(const MyApp());
})
```

* You can also manually set up [Error Tracking][5]. `DatadogSdk.runApp` calls `WidgetsFlutterBinding.ensureInitialized`, so if you are not using `DatadogSdk.runApp`, you need to call this method prior to calling `DatadogSdk.instance.initialize`.

```dart
WidgetsFlutterBinding.ensureInitialized();
final originalOnError = FlutterError.onError;
FlutterError.onError = (details) {
  DatadogSdk.instance.rum?.handleFlutterError(details);
  originalOnError?.call(details);
};
final platformOriginalOnError = PlatformDispatcher.instance.onError;
PlatformDispatcher.instance.onError = (e, st) {
  DatadogSdk.instance.rum?.addErrorInfo(
    e.toString(),
    RumErrorSource.source,
    stackTrace: st,
  );
  return platformOriginalOnError?.call(e, st) ?? false;
};
await DatadogSdk.instance.initialize(configuration, TrackingConsent.granted);
runApp(const MyApp());
```

You can adjust the session sample rate with the `sessionSamplingRate` parameter, but Datadog recommends using [retention filters][8] to control retained volume. For details, see [Manage Sessions][9].

{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}

To be compliant with the GDPR regulation, the Datadog Flutter SDK requires the `trackingConsent` value during initialization.

Set `trackingConsent` to one of the following values:

* `TrackingConsent.pending`: The Datadog Flutter SDK starts collecting and batching the data but does not send it to Datadog. It waits for the new tracking consent value to decide what to do with the batched data.
* `TrackingConsent.granted`: The Datadog Flutter SDK starts collecting the data and sends it to Datadog.
* `TrackingConsent.notGranted`: The Datadog Flutter SDK does not collect any data, which means no logs, traces, or events are sent to Datadog.

To change the tracking consent value after the SDK is initialized, use the `DatadogSdk.setTrackingConsent` API call.

The SDK changes its behavior according to the new value. For example, if the current tracking consent is `TrackingConsent.pending`:

* You change it to `TrackingConsent.granted`, the SDK sends all current and future data to Datadog;
* You change it to `TrackingConsent.notGranted`, the SDK wipes all current data and does not collect any future data.

{% /step %}

{% step title="Enable RUM to start sending data" %}

RUM is enabled when you pass a `rumConfiguration` to the SDK configuration. To configure what RUM collects, such as views, user interactions, and network requests, continue to [Enable the Datadog RUM Module][10].

{% /step %}

{% /stepper %}

## Sending data when device is offline

The Flutter SDK helps make data available when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough so the Flutter SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old so the Flutter SDK does not use too much disk space.

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/mobile/flutter/
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[4]: https://pub.dev/packages/datadog_flutter_plugin
[5]: /real_user_monitoring/setup/enable_rum/track_errors/?platform=flutter
[6]: /product_analytics/
[7]: /session_replay/?platform=flutter
[8]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[9]: /real_user_monitoring/setup/enable_rum/manage_sessions/?platform=flutter
[10]: /real_user_monitoring/setup/enable_rum/?platform=flutter
