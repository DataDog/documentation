---
title: Flutter Monitoring
kind: documentation
description: Collect RUM data from your Flutter projects.
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

Alternatively, you can use the `DatadogRouteAwareMixin` property in conjunction with the `DatadogNavigationObserverProvider` property to start and stop your RUM views automatically. With `DatadogRouteAwareMixin`, move any logic from `initState` to `didPush`.

To rename your views or supply custom paths, provide a [`viewInfoExtractor`][8] callback. This function can fall back to the default behavior of the observer by calling `defaultViewInfoExtractor`. For example:

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
