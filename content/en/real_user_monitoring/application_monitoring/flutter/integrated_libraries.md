---
title: Flutter Libraries for RUM
description: "Integrate popular Flutter libraries with RUM SDK for automatic monitoring of HTTP requests, navigation, and other app functionality."
aliases:
- /real_user_monitoring/flutter/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/flutter
- /real_user_monitoring/mobile_and_tv_monitoring/flutter/integrated_libraries
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: "Source Code"
  text: Source code for dd-sdk-flutter
---

This page lists integrated libraries you can use for Flutter applications.

## Routing and automatic view tracking

If you are using Flutter Navigator v2.0, your setup for automatic view tracking differs depending on your routing middleware. This section explains how to integrate with the most popular routing packages.

### go_router

Because [go_router][2] uses the same observer interface as Flutter Navigator v1, you can add `DatadogNavigationObserver` to other observers as a parameter to `GoRouter`.

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

If you are using ShellRoutes, you need to supply a separate observer to each `ShellRoute`, as shown below. See [this bug][3] for more information.

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

[AutoRoute][4] can use a `DatadogNavigationObserver` provided as one of the `navigatorObservers` as part of its `config` method.

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

This new object replaces the simpler `DatadogNavigationObserver`.

### Beamer

[Beamer][5] can use the `DatadogNavigationObserver` as an argument to `BeamerDelegate`:

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

## Web view tracking

Real User Monitoring allows you to monitor web views and eliminate blind spots in your hybrid mobile applications.

The Datadog Flutter SDK has packages for working with both [`webview_flutter`][8] and [`flutter_inappwebview`][9]. For more information, refer to the [Web View Tracking documentation page][10].

## gRPC

Datadog provides [`datadog_grpc_interceptor`][6] for use with the [grpc Flutter package][7]. The gRPC interceptor automatically tracks gRPC requests as RUM Resources and enables distributed tracing with APM.

### Setup

Add `datadog_grpc_interceptor` to your `pubspec.yaml` or by running `flutter pub add datadog_grpc_interceptor` from your terminal:

```yaml
dependencies:
  # Other dependencies
  datadog_grpc_interceptor: ^1.1.0
```

To use this plugin, create an instance of `DatadogGrpcInterceptor`, then pass it to your generated gRPC client:

```dart
import 'package:datadog_grpc_interceptor/datadog_grpc_interceptor.dart'

// Initialize Datadog - be sure to set the [DatadogConfiguration.firstPartyHosts] member
// Enable Datadog Distributed Tracing
final config = DatadogConfiguration(
  // ...
  firstPartyHosts = ['localhost']
)

// Create the gRPC channel
final channel = ClientChannel(
  'localhost',
  port: 50051,
  options: ChannelOptions(
    // ...
  ),
);

// Create the gRPC interceptor with the supported channel
final datadogInterceptor = DatadogGrpcInterceptor(DatadogSdk.instance, channel);

// Create the gRPC client, passing in the Datadog interceptor
final stub = GreeterClient(channel, interceptors: [datadogInterceptor]);
```

## GraphQL (gql_link)

Datadog provides [`datadog_gql_link`][1] for use with most GraphQL Flutter libraries, including `graphql_flutter` and `ferry`. The link automatically tracks GraphQL requests as RUM resources, adds query names, mutation names, and variables as attributes of the Resource, and enables distributed tracing in APM.

### Setup

Add `datadog_gql_link` to your `pubspec.yaml` or by running `flutter pub add datadog_gql_link` from your terminal:

```yaml
dependencies:
  # Other dependencies
  datadog_gql_link: ^1.0.0
```

When creating your GraphQL link, add the `DatadogGqlLink` above your terminating link. For example:

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```

If you are tracking non-GraphQL network calls with `datadog_tracking_http_client`, you need to configure the tracking plugin to ignore requests to your GraphQL endpoint. Otherwise, GraphQL resources are reported twice, and APM traces may be broken. Ignore your GraphQL endpoint by using the `ignoreUrlPatterns` parameter added to `datadog_tracking_http_client` version 2.1.0.

```dart
final datadogConfig = DatadogConfiguration(
    // Your configuration
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```

## Dio

<div class="alert alert-info">
For most Dio setups, use Datadog Tracking Http Client instead of the specialized Dio interceptor. Only use the Dio interceptor if you're using a non-standard Dio `HttpClientAdapter` that cannot be tracked by Datadog Tracking Http Client.
</div>

Datadog provides [`datadog_dio`][6] for use with the [Dio Flutter package][7]. The Dio interceptor automatically tracks requests from a given Dio client as RUM Resources and enables distributed tracing with APM.

### Setup

Add `datadog_dio` to your `pubspec.yaml` or by running `flutter pub add datadog_dio` from your terminal:

```yaml
dependencies:
  # Other dependencies
  datadog_dio: ^1.0.0
```

To use this plugin, call `addDatadogInterceptor` at the end of your Dio initialization:

```dart
import 'package:datadog_dio/datadog_dio.dart'

// Initialize Datadog - be sure to set the [DatadogConfiguration.firstPartyHosts] member
// Enable Datadog Distributed Tracing
final config = DatadogConfiguration(
  // ...
  firstPartyHosts = ['localhost']
)

// Create our Dio client
final dio = Dio()
  // Dio configuration...
  ..addDatadogInterceptor(DatadogSdk.instance);
```

Calling `addDatadogInterceptor` adds the Datadog interceptor as the first interceptor in your list. This ensures all network requests from Dio are sent to Datadog, since other interceptors may not forward information down the chain. Call `addDatadogInterceptor` after completing all other Dio configuration.

### Use with other Datadog Network Tracking

To track all network requests, including those made by `dart:io` and widgets like `NetworkImage`, use `datadog_tracking_http_client` to capture these requests. However, depending on your setup, the global override method used in `enableHttpTracking` may cause resources to be double reported (once by the global override and once by the Dio interceptor)

To avoid this, use the `ignoreUrlPatterns` parameter when calling `enableHttpTracking` to ignore requests made by your Dio client.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_gql_link
[2]: https://pub.dev/packages?q=go_router
[3]: https://github.com/flutter/flutter/issues/112196
[4]: https://pub.dev/packages/auto_route
[5]: https://pub.dev/packages/beamer
[6]: https://pub.dev/packages/datadog_grpc_interceptor
[7]: https://pub.dev/packages/grpc
[8]: https://pub.dev/packages/webview_flutter
[9]: https://pub.dev/packages/flutter_inappwebview
[10]: /real_user_monitoring/application_monitoring/web_view_tracking?tab=flutter
[11]: https://pub.dev/packages/datadog_dio
