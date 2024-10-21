---
title: Flutter Libraries for RUM
code_lang: flutter
type: multi-code-lang
code_lang_weight: 30
aliases:
- /real_user_monitoring/flutter/integrated_libraries/
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: "Source Code"
  text: Source code for dd-sdk-flutter
- link: /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries
  tag: Documentation
  text: Integrated Libraries
---

This page lists integrated libraries you can use for Flutter applications.

## GraphQL (gql_link)

Datadog provides [`datadog_gql_link`][1] for use with most GraphQL Flutter libraries, including `graphql_flutter` and `ferry`.

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

If you are tracking non-GraphQL network calls with `datadog_tracking_http_client`, you need to configure the tracking plugin to ignore requests to your GraphQL endpoint. Otherwise, GraphQL resources will be reported twice, and APM traces may be broken. Ignore your GraphQL endpoint by using the `ignoreUrlPatterns` parameter added to `datadog_tracking_http_client` version 2.1.0.

```dart
final datadogConfig = DatadogConfiguration(
    // Your configuration
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```

## Automatic view tracking

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_gql_link
[2]: https://pub.dev/packages?q=go_router
[3]: https://github.com/flutter/flutter/issues/112196
[4]: https://pub.dev/packages/auto_route
[5]: https://pub.dev/packages/beamer
