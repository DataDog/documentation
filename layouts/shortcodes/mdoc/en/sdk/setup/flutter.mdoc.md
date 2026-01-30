<!--
This partial contains setup instructions for the Flutter SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the Flutter SDK. RUM includes Error Tracking by default, but if you have purchased Error Tracking as a standalone product, see the [Error Tracking setup guide][2] for specific steps.

## Setup

### Step 1 - Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][3].
2. Choose `Flutter` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][6].

### Step 2 - Instrument your application

First, make sure you have your environment set up properly for each platform.

{% alert level="info" %}
Datadog supports Flutter Monitoring for iOS, Android, and Web for Flutter 3.27+.
{% /alert %}

Datadog supports Flutter Web starting with v3 of the SDK, with a few known limitations.

* Long running actions (`startAction` and `stopAction`) are not supported
* Actions (`addAction`) and manually reported Resources (`startResource` and `stopResource`) do not properly associate with Errors or Actions.
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

For Android, your `minSdkVersion` version must be >= 23, and your `compileSdkVersion` must be >= 35. Clients using Flutter after 3.27 will usually have these variables set to Flutter constants (`flutter.minSdkVersion` and `flutter.compileSdkVersion`), and they do not have to be manually changed.

If you are using Kotlin, it should be a version >= 2.1.0. Flutter versions above 3.27 will emit a waring stating that older versions of Kotlin will not be supported, and will provide instructions for updating.

These constraints are usually held in your `android/app/build.gradle` file, or in your `android/gradle.properties` file.

#### Web

For Web, add the following to your `index.html` under the `head` tag:

```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/{% region-param key="flutter_web_logs_cdn_path" /%}"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/{% region-param key="flutter_web_rum_cdn_path" /%}"></script>
```

This loads the CDN-delivered Datadog Browser SDKs for Logs and RUM. The synchronous CDN-delivered version of the Browser SDK is the only version supported by the Datadog Flutter Plugin.

#### Add the plugin

1. Add the following to your `pubspec.yaml` file:

```yaml
dependencies:
  datadog_flutter_plugin: ^3.0.0
```

2. Create a configuration object for each Datadog feature (such as Logs or RUM) with the following snippet. If you do not pass a configuration for a given feature, that feature is disabled.

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

For more information on available configuration options, see the [DatadogConfiguration object documentation][7].

To ensure the safety of your data, you must use a client token. You cannot use Datadog API keys to configure the Datadog [Flutter Plugin][8].

* If you are using RUM, set up a **Client Token** and **Application ID**.
* If you are only using Logs, initialize the library with a client token.

### Step 3 - Initialize the library

You can initialize the library using one of two methods in your `main.dart` file.

* Use `DatadogSdk.runApp` to automatically set up [Error Tracking][9].

```dart
await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
  runApp(const MyApp());
})
```

* You can also manually set up [Error Tracking][9]. `DatadogSdk.runApp` calls `WidgetsFlutterBinding.ensureInitialized`, so if you are not using `DatadogSdk.runApp`, you need to call this method prior to calling `DatadogSdk.instance.initialize`.

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

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while initializing the Flutter RUM SDK. The rate is a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

For example, to keep only 50% of sessions, use:

```dart
final config = DatadogConfiguration(
    // other configuration...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        sessionSamplingRate: 50.0,
    ),
);
```

#### Set tracking consent (GDPR compliance)

To be compliant with the GDPR regulation, the Datadog Flutter SDK requires the `trackingConsent` value during initialization.

Set `trackingConsent` to one of the following values:

* `TrackingConsent.pending`: The Datadog Flutter SDK starts collecting and batching the data but does not send it to Datadog. It waits for the new tracking consent value to decide what to do with the batched data.
* `TrackingConsent.granted`: The Datadog Flutter SDK starts collecting the data and sends it to Datadog.
* `TrackingConsent.notGranted`: The Datadog Flutter SDK does not collect any data, which means no logs, traces, or events are sent to Datadog.

To change the tracking consent value after the SDK is initialized, use the `DatadogSdk.setTrackingConsent` API call.

The SDK changes its behavior according to the new value. For example, if the current tracking consent is `TrackingConsent.pending`:

* You change it to `TrackingConsent.granted`, the SDK sends all current and future data to Datadog;
* You change it to `TrackingConsent.notGranted`, the SDK wipes all current data and does not collect any future data.

#### Manage user data collection

To manage user data collection settings for client IP or geolocation data:

1. Go to **Manage Applications**.
2. Select your application.
3. Click **User Data Collection**, then toggle the settings to enable/disable **Collect geolocation data** and **Collect client IP data**.

For more information about the data collected, see [Flutter Data Collected][4].

## Automatically track views

If you are using Flutter Navigator v2.0, your setup for automatic view tracking differs depending on your routing middleware. See [Flutter Integrated Libraries][12] for instructions on how to integrate with [go_router][10], [AutoRoute][11], and [Beamer][13].

### Flutter Navigator v1

The Datadog Flutter Plugin can automatically track named routes using the `DatadogNavigationObserver` on your MaterialApp:

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

This works if you are using named routes or if you have supplied a name to the `settings` parameter of your `PageRoute`.

If you are not using named routes, you can use `DatadogRouteAwareMixin` in conjunction with the `DatadogNavigationObserverProvider` widget to start and stop your RUM views automatically. With `DatadogRouteAwareMixin`, move any logic from `initState` to `didPush`.

### Flutter Navigator v2

If you are using Flutter Navigator v2.0, which uses the `MaterialApp.router` named constructor, the setup varies based on the routing middleware you are using, if any. Since [`go_router`][10] uses the same observer interface as Flutter Navigator v1, `DatadogNavigationObserver` can be added to other observers as a parameter to `GoRouter`.

```dart
final _router = GoRouter(
  routes: [
    // Your route information here
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // Your remaining setup
)
```

For examples that use routers other than `go_router`, see [Automatically track views](#automatically-track-views).

### Renaming Views

For all setups, you can rename views or supply custom paths by providing a [`viewInfoExtractor`][14] callback. This function can fall back to the default behavior of the observer by calling `defaultViewInfoExtractor`. For example:

```dart
RumViewInfo? infoExtractor(Route<dynamic> route) {
  var name = route.settings.name;
  if (name == 'my_named_route') {
    return RumViewInfo(
      name: 'MyDifferentName',
      attributes: {'extra_attribute': 'attribute_value'},
    );
  }

  return defaultViewInfoExtractor(route);
}

var observer = DatadogNavigationObserver(
  datadogSdk: DatadogSdk.instance,
  viewInfoExtractor: infoExtractor,
);
```

## Automatically track actions

Use [`RumUserActionDetector`][15] to track user taps that happen in a given Widget tree:

```dart
RumUserActionDetector(
  rum: DatadogSdk.instance.rum,
  child: Scaffold(
    appBar: AppBar(
      title: const Text('RUM'),
    ),
    body: // Rest of your application
  ),
);
```

`RumUserActionDetector` automatically detects tap user actions that occur in its tree and sends them to RUM. It detects interactions with several common Flutter widgets.

For most Button types, the detector looks for a `Text` widget child, which it uses for the description of the action. In other cases it looks for a `Semantics` object child, or an `Icon` with its `Icon.semanticsLabel` property set.

Alternatively, you can enclose any Widget tree with a [`RumUserActionAnnotation`][16], which uses the provided description when reporting user actions detected in the child tree, without changing the Semantics of the tree.

```dart
Container(
  margin: const EdgeInsets.all(8),
  child: RumUserActionAnnotation(
    description: 'My Image Button',
    child: InkWell(
      onTap: onTap,
      child: Column(
        children: [
          FadeInImage.memoryNetwork(
            placeholder: kTransparentImage,
            image: image,
          ),
          Center(
            child: Text(
              text,
              style: theme.textTheme.headlineSmall,
            ),
          )
        ],
      ),
    ),
  ),
);
```

## Sending data when device is offline

The Flutter SDK ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the Flutter SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the Flutter SDK does not use too much disk space.

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: https://app.datadoghq.com/rum/application/create
[4]: /real_user_monitoring/application_monitoring/flutter/data_collected/
[5]: https://app.datadoghq.com/error-tracking/settings/setup/client/
[6]: /account_management/api-app-keys/#client-tokens
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: /real_user_monitoring/error_tracking/flutter
[10]: https://pub.dev/packages?q=go_router
[11]: https://pub.dev/packages/auto_route
[12]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries/
[13]: https://pub.dev/packages/beamer
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[15]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html
[16]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html

