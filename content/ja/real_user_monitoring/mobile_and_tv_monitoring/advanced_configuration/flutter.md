---
aliases:
- /ja/real_user_monitoring/flutter/advanced_configuration
- /ja/real_user_monitoring/otel
- /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/otel
- /ja/real_user_monitoring/flutter/otel_support/
code_lang: flutter
code_lang_weight: 30
description: Learn how to configure Flutter Monitoring.
further_reading:
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
title: RUM Flutter Advanced Configuration
type: multi-code-lang
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

## トラッキングの同意を設定（GDPR と CCPA の遵守）

データ保護とプライバシーポリシーに準拠するため、Flutter RUM SDK は初期化時に追跡に関する同意を求めます。

`trackingConsent` 設定は以下のいずれかの値で示されます。

1. `TrackingConsent.pending`: Flutter RUM SDK はデータの収集とバッチ処理を開始しますが、Datadog には送信しません。Flutter RUM SDK は新しい追跡に関する同意の値を待って、バッチされたデータをどうするかを決定します。
2. `TrackingConsent.granted`: Flutter RUM SDK はデータの収集を開始し、Datadog へ送信します。
3. `TrackingConsent.notGranted`: Flutter RUM SDK はデータを収集しません。ログ、トレース、RUM イベントなどが Datadog に送信されることはありません。

Flutter RUM SDK の初期化後に追跡同意値を変更するには、`DatadogSdk.setTrackingConsent` API 呼び出しを使用します。Flutter RUM SDK は、新しい値に応じて動作を変更します。

例えば、現在の追跡同意が `TrackingConsent.pending` で、その値を `TrackingConsent.granted` に変更すると、Flutter RUM SDK は以前に記録したデータと今後のデータをすべて Datadog に送ります。

同様に、値を `TrackingConsent.pending` から `TrackingConsent.notGranted` に変更すると、Flutter RUM SDK はすべてのデータを消去し、今後データを収集しないようにします。

## Flutter 固有のパフォーマンスメトリクス

Flutter 固有のパフォーマンスメトリクスの収集を有効にするには、`DatadogRumConfiguration` で `reportFlutterPerformance: true` を設定します。ウィジェットのビルド時間とラスター時間は[モバイルバイタル][17]に表示されます。

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。ネットワークが利用可能で、Flutter RUM SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドで実行している状態でネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: ディスク上のデータは、古すぎる場合は Flutter RUM SDK がディスク容量を使いすぎないようにするために自動的に削除されます。

## OpenTelemetry setup

The [Datadog Tracking HTTP Client][12] package and [gRPC Interceptor][13] package both support distributed traces through both automatic header generation and header ingestion. This section describes how to use OpenTelemetry with RUM Flutter.

### Datadog のヘッダー生成

追跡クライアントや gRPC インターセプターを構成する際に、Datadog に生成させたい追跡ヘッダーの種類を指定することができます。例えば、`example.com` には `b3` ヘッダーを、`myapi.names` には `tracecontext` ヘッダーを送信したい場合、以下のコードで実現できます。

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

このオブジェクトは、初期構成時に使用することができます。

```dart
// For default Datadog HTTP tracing:
final configuration = DatadogConfiguration(
    // configuration
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

その後、通常通りトレースを有効にすることができます。

This information is merged with any hosts set on `DatadogConfiguration.firstPartyHosts`. Hosts specified in `firstPartyHosts` generate Datadog Tracing Headers by default.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter#setup
[3]: /ja/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[4]: /ja/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
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
[17]: /ja/real_user_monitoring/mobile_and_tv_monitoring/mobile_vitals/?tab=flutter