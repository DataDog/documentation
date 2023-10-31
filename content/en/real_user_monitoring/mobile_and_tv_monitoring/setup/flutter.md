---
title: RUM Flutter Monitoring Setup
kind: documentation
description: Collect RUM data from your Flutter projects.
aliases:
    - /real_user_monitoring/flutter/
    - /real_user_monitoring/flutter/setup
code_lang: flutter
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
  tag: Documentation
  text: RUM Flutter Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM

---
## Overview

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the real-time performance and user journeys of your application's individual users.

## Setup

### Specify application details in the UI

1. In the [Datadog app][1], navigate to **UX Monitoring** > **RUM Applications** > **New Application**.
2. Choose `Flutter` as the application type.
3. Provide an application name to generate a unique Datadog application ID and client token.
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM Flutter Data Collected][7].

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Create a RUM application for Flutter in Datadog" style="width:90%;">}}

To ensure the safety of your data, you must use a client token. For more information about setting up a client token, see the [Client Token documentation][2].

### Instrument your application

To initialize the Datadog Flutter SDK for RUM, see [Setup][3].

## Automatically track views

### Flutter Navigator v1

The [Datadog Flutter Plugin][4] can automatically track named routes using the `DatadogNavigationObserver` on your MaterialApp:

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

If you are using Flutter Navigator v2.0, which uses the `MaterialApp.router` named constructor, the setup varies based on the routing middleware you are using, if any. Since [go_router][11], uses the same observer interface as Flutter Navigator v1, so the `DatadogNavigationObserver` can be added to other observers as a parameter to `GoRouter`.

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
final configuration = DdSdkConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Note**: The Datadog Tracking HTTP Client modifies [`HttpOverrides.global`][9]. If you are using your own custom `HttpOverrides`, you may need to inherit from [`DatadogHttpOverrides`][10]. In this case, you do not need to call `enableHttpTracking`. Versions of `datadog_tracking_http_client` >= 1.3 check the value of `HttpOverrides.current` and use this for client creation, so you only need to make sure to initialize `HttpOverrides.global` prior to initializing Datadog.

In order to enable Datadog [Distributed Tracing][6], you must set the `DdSdkConfiguration.firstPartyHosts` property in your configuration object to a domain that supports distributed tracing. You can also modify the sampling rate for distributed tracing by setting the `tracingSamplingRate` on your `RumConfiguration`.

- `firstPartyHosts` does not allow wildcards, but matches any subdomains for a given domain. For example, `api.example.com` matches `staging.api.example.com` and `prod.api.example.com`, not `news.example.com`.

- `RumConfiguration.tracingSamplingRate` sets a default sampling rate of 20%. If you want all resources requests to generate a full distributed trace, set this value to `100.0`.


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

Alternatively, you can enclose any Widget tree with a [`RumUserActionAnnotation``][14], which uses the provided description when reporting user actions detected in the child tree, without changing the Semantics of the tree.

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
[2]: /account_management/api-app-keys/#client-tokens
[3]: /real_user_monitoring/flutter/#setup
[4]: https://pub.dev/packages/datadog_flutter_plugin
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /serverless/distributed_tracing
[7]: /real_user_monitoring/flutter/data_collected/
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[11]: https://pub.dev/packages/go_router
[12]: /real_user_monitoring/flutter/advanced_configuration/#automatic-view-tracking
[13]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html
