---
title: RUM Flutter Advanced Configuration
kind: documentation
description: Learn how to configure Flutter Monitoring.
code_lang: flutter
type: multi-code-lang
code_lang_weight: 30
aliases:
    - /real_user_monitoring/flutter/advanced_configuration
    - /real_user_monitoring/otel
    - /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
    - /real_user_monitoring/mobile_and_tv_monitoring/setup/otel
    - /real_user_monitoring/flutter/otel_support/
further_reading:
- link: "https://github.com/DataDog/dd-sdk-flutter"
  tag: Source Code
  text: Source code for dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: "https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/"
  tag: Blog
  text: Monitor Flutter application performance with Datadog Mobile RUM

---
## Overview

If you have not set up the Datadog Flutter SDK for RUM yet, follow the [in-app setup instructions][1] or refer to the [RUM Flutter setup documentation][2]. Learn how to set up [OpenTelemetry with RUM Flutter](#opentelemetry-setup).

## Automatic View Tracking

If you are using Flutter Navigator v2.0, your setup for automatic view tracking differs depending on your routing middleware. Here, we document how to integrate with the most popular routing packages.

### go_router

Since [go_router][8], uses the same observer interface as Flutter Navigator v1, so the `DatadogNavigationObserver` can be added to other observers as a parameter to `GoRouter`.

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
);
```

If you are using ShellRoutes, you need to supply a separate observer to each `ShellRoute`, as shown below. See [this bug][11] for more information.

```dart
final _router = GoRouter(
  routes: [
    ShellRoute(build: shellBuilder),
    routes: [
      // Additional routes
    ],
    observers: [
      DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
    ],
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // Your remaining setup
);
```

Additionally, if you are using `GoRoute`'s `pageBuilder` parameter over its `builder` parameter, ensure that you are passing on the `state.pageKey` value and the `name` value to your `MaterialPage`.

```dart
GoRoute(
  name: 'My Home',
  path: '/path',
  pageBuilder: (context, state) {
    return MaterialPage(
      key: state.pageKey,       // Necessary for GoRouter to call Observers
      name: name,               // Needed for Datadog to get the right route name
      child: _buildContent(),
    );
  },
),
```

### AutoRoute

[AutoRoute][9] can use a `DatadogNavigationObserver` provided as one of the `navigatorObservers` as part of its `config` method.

```dart
return MaterialApp.router(
  routerConfig: _router.config(
    navigatorObservers: () => [
      DatadogNavigationObserver(
        datadogSdk: DatadogSdk.instance,
      ),
    ],
  ),
  // Your remaining setup
);
```

However, if you are using AutoRoute's tab routing, you need to extend Datadog's default observer with AutoRoute's `AutoRouteObserver` interface.

```dart
class DatadogAutoRouteObserver extends DatadogNavigationObserver
    implements AutoRouterObserver {
  DatadogAutoRouteObserver({required super.datadogSdk});

  // only override to observer tab routes
  @override
  void didInitTabRoute(TabPageRoute route, TabPageRoute? previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }

  @override
  void didChangeTabRoute(TabPageRoute route, TabPageRoute previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }
}
```

This new object replaces the simpler `DatadogNavigationObserver` in creation of AutoRoute's config.

### Beamer

[Beamer][10] can use the `DatadogNavigationObserver` as an argument to `BeamerDelegate`:

```dart
final routerDelegate = BeamerDelegate(
  locationBuilder: RoutesLocationBuilder(
    routes: {
      // Your route config
    },
  ),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ]
);
```

## Enrich user sessions

Flutter RUM automatically tracks attributes such as user activity, views (using the `DatadogNavigationObserver`), errors, native crashes, and network requests (using the Datadog Tracking HTTP Client). See the [RUM Data Collection documentation][3] to learn about the RUM events and default attributes. You can further enrich user session information and gain finer control over the attributes collected by tracking custom events.

### Add your own performance timing

In addition to RUM's default attributes, you can measure where your application is spending its time by using `DdRum.addTiming`. The timing measure is relative to the start of the current RUM view.

For example, you can time how long it takes for your hero image to appear:

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

Once you set the timing, it is accessible as `@view.custom_timings.<timing_name>`. For example, `@view.custom_timings.hero_image`.

To create visualizations in your dashboards, [create a measure][4] first.

### Track user actions

You can track specific user actions such as taps, clicks, and scrolls using `DdRum.addAction`.

To manually register instantaneous RUM actions such as `RumActionType.tap`, use `DdRum.addAction()`. For continuous RUM actions such as `RumActionType.scroll`, use `DdRum.startAction()` or `DdRum.stopAction()`.

For example:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addAction(
        RumActionType.tap,
        resourceName,
    );
}
```

When using `DdRum.startAction` and `DdRum.stopAction`, the `type` action must be the same for the Datadog Flutter SDK to match an action's start with its completion.

### Track custom resources

In addition to tracking resources automatically using the [Datadog Tracking HTTP Client][5], you can track specific custom resources such as network requests or third-party provider APIs using the [following methods][6]:

- `DdRum.startResource`
- `DdRum.stopResource`
- `DdRum.stopResourceWithError`
- `DdRum.stopResourceWithErrorInfo`

For example:

```dart
// in your network client:

DatadogSdk.instance.rum?.startResource(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// Later

DatadogSdk.instance.rum?.stopResource(
    "resource-key",
    200,
    RumResourceType.image
);
```

The `String` used for `resourceKey` in both calls must be unique for the resource you are calling in order for the Flutter Datadog SDK to match a resource's start with its completion.

### Track custom errors

To track specific errors, notify `DdRum` when an error occurs with the message, source, exception, and additional attributes.

```dart
DatadogSdk.instance.rum?.addError("This is an error message.");
```

## Track custom global attributes

In addition to the [default RUM attributes][3] captured by the Datadog Flutter SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

Custom attributes allow you to filter and group information about observed user behavior (such as the cart value, merchant tier, or ad campaign) with code-level information (such as backend services, session timeline, error logs, and network health).

### Set a custom global attribute

To set a custom global attribute, use `DdRum.addAttribute`.

* To add or update an attribute, use `DdRum.addAttribute`.
* To remove the key, use `DdRum.removeAttribute`.

### Track user sessions

Adding user information to your RUM sessions makes it easy to:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in the RUM UI" style="width:90%" >}}

The following attributes are **optional**, provide **at least** one of them:

| Attribute | Type   | Description                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Unique user identifier.                                                                                  |
| `usr.name`  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

To identify user sessions, use `DatadogSdk.setUserInfo`.

For example:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

## Modify or drop RUM events

**Note**: This feature is not yet available for Flutter web applications.

To modify attributes of a RUM event before it is sent to Datadog or to drop an event entirely, use the Event Mappers API when configuring the Flutter RUM SDK:

```dart
final config = DatadogConfiguration(
    // other configuration...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        rumViewEventMapper = (event) => event,
        rumActionEventMapper = (event) => event,
        rumResourceEventMapper = (event) => event,
        rumErrorEventMapper = (event) => event,
        rumLongTaskEventMapper = (event) => event,
    ),
);
```

Each mapper is a function with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent, or dropping the event entirely.

For example, to redact sensitive information in a RUM Resource's `url`, implement a custom `redacted` function and use it in `rumResourceEventMapper`:

```dart
    rumResourceEventMapper = (event) {
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
```

Returning `null` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog. The value returned from the view event mapper must not be `null`.

Depending on the event's type, only some specific properties can be modified:

| Event Type       | Attribute key                     | Description                                   |
|------------------|-----------------------------------|-----------------------------------------------|
| RumViewEvent     | `viewEvent.view.url`              | URL of the view.                              |
|                  | `viewEvent.view.referrer`         | Referrer of the view.                         |
| RumActionEvent   | `actionEvent.action.target?.name` | Name of the action.                           |
|                  | `actionEvent.view.referrer`       | Referrer of the view linked to this action.   |
|                  | `actionEvent.view.url`            | URL of the view linked to this action.        |
| RumErrorEvent    | `errorEvent.error.message`        | Error message.                                |
|                  | `errorEvent.error.stack`          | Stacktrace of the error.                      |
|                  | `errorEvent.error.resource?.url`  | URL of the resource the error refers to.      |
|                  | `errorEvent.view.referrer`        | Referrer of the view linked to this action.   |
|                  | `errorEvent.view.url`             | URL of the view linked to this error.         |
| RumResourceEvent | `resourceEvent.resource.url`      | URL of the resource.                          |
|                  | `resourceEvent.view.referrer`     | Referrer of the view linked to this action.   |
|                  | `resourceEvent.view.url`          | URL of the view linked to this resource.      |

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```dart
final sessionId = await DatadogSdk.instance.rum?.getCurrentSessionId()
```

## Set tracking consent (GDPR & CCPA compliance)

In order to be compliant with data protection and privacy policies, the Flutter RUM SDK requires the tracking consent value at initialization.

The `trackingConsent` setting can be one of the following values:

1. `TrackingConsent.pending`: The Flutter RUM SDK starts collecting and batching the data but does not send it to Datadog. The Flutter RUM SDK waits for the new tracking consent value to decide what to do with the batched data.
2. `TrackingConsent.granted`: The Flutter RUM SDK starts collecting the data and sends it to Datadog.
3. `TrackingConsent.notGranted`: The Flutter RUM SDK does not collect any data. No logs, traces, or RUM events are sent to Datadog.

To change the tracking consent value after the Flutter RUM SDK is initialized, use the `DatadogSdk.setTrackingConsent` API call. The Flutter RUM SDK changes its behavior according to the new value.

For example, if the current tracking consent is `TrackingConsent.pending` and you change the value to `TrackingConsent.granted`, the Flutter RUM SDK sends all previously recorded and future data to Datadog.

Likewise, if you change the value from `TrackingConsent.pending` to `TrackingConsent.notGranted`, the Flutter RUM SDK wipes all data and does not collect any future data.

## Flutter-specific performance metrics

To enable the collection of Flutter-specific performance metrics, set `reportFlutterPerformance: true` in `DatadogRumConfiguration`. Widget build and raster times are displayed in [Mobile Vitals][17].

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In cases of low-network areas, or when the device battery is too low, all RUM events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough to ensure the Flutter RUM SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old to ensure the Flutter RUM SDK does not use too much disk space.

## OpenTelemetry setup

The [Datadog Tracking HTTP Client][12] package and [gRPC Interceptor][13] package both support distributed traces through both automatic header generation and header ingestion. This section describes how to use OpenTelemetry with RUM Flutter.

### Datadog header generation

When configuring your tracking client or gRPC Interceptor, you can specify the types of tracing headers you want Datadog to generate. For example, if you want to send `b3` headers to `example.com` and `tracecontext` headers for `myapi.names`, you can do so with the following code:

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

You can use this object during initial configuration:

```dart
// For default Datadog HTTP tracing:
final configuration = DatadogConfiguration(
    // configuration
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

You can then enable tracing as usual.

This information is merged with any hosts set on `DatadogConfiguration.firstPartyHosts`. Hosts specified in `firstPartyHosts` generate Datadog Tracing Headers by default.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/mobile_and_tv_monitoring/setup/flutter#setup
[3]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[4]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogNavigationObserver-class.html
[8]: https://pub.dev/packages?q=go_router
[9]: https://pub.dev/packages/auto_route
[10]: https://pub.dev/packages/beamer
[11]: https://github.com/flutter/flutter/issues/112196
[12]: https://pub.dev/packages/datadog_tracking_http_client
[13]: https://pub.dev/packages/datadog_grpc_interceptor
[14]: https://github.com/openzipkin/b3-propagation#single-headers
[15]: https://github.com/openzipkin/b3-propagation#multiple-headers
[16]: https://www.w3.org/TR/trace-context/#tracestate-header
[17]: /real_user_monitoring/mobile_and_tv_monitoring/mobile_vitals/?tab=flutter