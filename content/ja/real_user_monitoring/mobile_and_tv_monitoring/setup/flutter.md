---
aliases:
- /ja/real_user_monitoring/flutter/
- /ja/real_user_monitoring/flutter/setup
code_lang: flutter
code_lang_weight: 30
description: Collect RUM data from your Flutter projects.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
  tag: Documentation
  text: RUM Flutter Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM
kind: documentation
title: RUM Flutter Monitoring Setup
type: multi-code-lang
---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

## Setup

### Specify application details in the UI

1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][1].
2. Choose `Flutter` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM Flutter Data Collected][7].

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Create a RUM application for Flutter in Datadog" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][2].

### Instrument your application

First, ensure that you have your environment set up properly for each platform.

<div class="alert alert-info">
Datadog supports Flutter Monitoring for iOS and Android for Flutter 3.0+.
</div>

Datadog does not officially support Flutter Web, but the current Flutter SDK for mobile apps allows you to achieve some out-of-the-box monitoring. Here are known limitations:
  * All Actions reported from Flutter are labeled with type `custom`.
  * Long running actions (`startAction` / `stopAction`) are not supported.
  * Manually reporting RUM resources (`startResource` / `stopResource`) is not supported.
  * Event mappers are not currently supported.
  * Tags on loggers are not currently supported.
  * `addUserExtraInfo` is not supported.
  * `stopSession` is not supported.

No Flutter Web support is planned, but Datadog's priorities are often re-evaluated based on your feedback. If you have a Flutter Web app and would want to use Datadog RUM to monitor its performance, reach out to your customer support team and escalate this feature request.

#### iOS

Your iOS Podfile, located in `ios/Podfile`, must have `use_frameworks!` set to true (which is the default in Flutter) and must set its target iOS version >= 11.0.

This constraint is usually commented out on the top line of the Podfile, and should read:

```ruby
platform :ios, '11.0'
```

You can replace `11.0` with any minimum version of iOS you want to support that is 11.0 or higher.

#### Android

For Android, your `minSdkVersion` version must be >= 21, and if you are using Kotlin, it should be a version >= 1.8.0. These constraints are usually held in your `android/app/build.gradle` file.

### Web

For Web, add the following to your `index.html` under the `head` tag, for **{{<region-param key="dd_site_name">}}** site:
{{< site-region region="us" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v5.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v5.js"></script>
```
{{</ site-region>}}

This loads the CDN-delivered Datadog Browser SDKs for Logs and RUM. The synchronous CDN-delivered version of the Browser SDK is the only version supported by the Datadog Flutter Plugin.

#### Add the plugin

1. Add the following to your `pubspec.yaml` file:

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^2.0.0
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

For more information on available configuration options, see the [DatadogConfiguration object documentation][3].

To ensure the safety of your data, you must use a client token. You cannot use Datadog API keys to configure the Datadog Flutter Plugin.

- If you are using RUM, set up a **Client Token** and **Application ID**.
- If you are only using Logs, initialize the library with a client token.

## Instrument your Application

### Initialize the library

You can initialize RUM using one of two methods in your `main.dart` file.

1. Use `DatadogSdk.runApp` which automatically sets up [Error Tracking][4].

   ```dart
   await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
     runApp(const MyApp());
   })
   ```

2. Alternatively, manually set up [Error Tracking][4] and resource tracking. `DatadogSdk.runApp` calls `WidgetsFlutterBinding.ensureInitialized`, so if you are not using `DatadogSdk.runApp`, you need to call this method prior to calling `DatadogSdk.instance.initialize`.

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

### Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while initializing the Flutter RUM SDK as a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

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

## Automatically track views

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

If you are using Flutter Navigator v2.0, which uses the `MaterialApp.router` named constructor, the setup varies based on the routing middleware you are using, if any. Since [`go_router`][11] uses the same observer interface as Flutter Navigator v1, `DatadogNavigationObserver` can be added to other observers as a parameter to `GoRouter`.

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

For examples that use routers other than `go_router`, see [Advanced Configuration - Automatic View Tracking][12].


### Renaming Views

For all setups, you can rename views or supply custom paths by providing a [`viewInfoExtractor`][8] callback. This function can fall back to the default behavior of the observer by calling `defaultViewInfoExtractor`. For example:

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

## Automatically track resources

Use the [Datadog Tracking HTTP Client][5] package to enable automatic tracking of resources and HTTP calls from your RUM views.

Add the package to your `pubspec.yaml` and add the following to your initialization file:

```dart
final configuration = DatadogConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Note**: The Datadog Tracking HTTP Client modifies [`HttpOverrides.global`][9]. If you are using your own custom `HttpOverrides`, you may need to inherit from [`DatadogHttpOverrides`][10]. In this case, you do not need to call `enableHttpTracking`. Versions of `datadog_tracking_http_client` >= 1.3 check the value of `HttpOverrides.current` and use this for client creation, so you only need to make sure to initialize `HttpOverrides.global` prior to initializing Datadog.

In order to enable Datadog [Distributed Tracing][6], you must set the `DatadogConfiguration.firstPartyHosts` property in your configuration object to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `tracingSamplingRate` on your `DatadogRumConfiguration`.

- `firstPartyHosts` does not allow wildcards, but matches any subdomains for a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, not `news.example.com`.

- `DatadogRumConfiguration.traceSampleRate` sets a default sampling rate of 20%. If you want all resources requests to generate a full distributed trace, set this value to `100.0`.


## Automatically track actions

Use [`RumUserActionDetector`][13] to track user taps that happen in a given Widget tree:

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

Alternatively, you can enclose any Widget tree with a [`RumUserActionAnnotation`][14], which uses the provided description when reporting user actions detected in the child tree, without changing the Semantics of the tree.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[4]: /ja/real_user_monitoring/error_tracking/flutter
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /ja/serverless/distributed_tracing
[7]: /ja/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[11]: https://pub.dev/packages/go_router
[12]: /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter#automatic-view-tracking
[13]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html