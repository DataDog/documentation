## Automatically track views

If you are using Flutter Navigator v2.0, your setup for automatic view tracking differs depending on your routing middleware. See [Flutter Integrated Libraries][1] for instructions on how to integrate with [go_router][2], [AutoRoute][3], and [Beamer][4].

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

If you are using Flutter Navigator v2.0, which uses the `MaterialApp.router` named constructor, the setup varies based on the routing middleware you are using, if any. Since [`go_router`][2] uses the same observer interface as Flutter Navigator v1, `DatadogNavigationObserver` can be added to other observers as a parameter to `GoRouter`.

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

For examples that use routers other than `go_router`, see [Flutter Navigator v1](#flutter-navigator-v1).

### Renaming views

For all setups, you can rename views or supply custom paths by providing a [`viewInfoExtractor`][5] callback. This function can fall back to the default behavior of the observer by calling `defaultViewInfoExtractor`. For example:

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

[1]: /real_user_monitoring/application_monitoring/flutter/integrated_libraries/
[2]: https://pub.dev/packages?q=go_router
[3]: https://pub.dev/packages/auto_route
[4]: https://pub.dev/packages/beamer
[5]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
