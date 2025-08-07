---
aliases:
- /ja/real_user_monitoring/flutter/integrated_libraries/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/flutter
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: dd-sdk-flutter のソースコード
title: RUM 用 Flutter ライブラリ
---

このページでは、Flutter アプリケーションで使用できる統合ライブラリを一覧表示しています。

## ルーティングとビューの自動追跡

Flutter Navigator v2.0 を使用している場合、ビューの自動追跡の設定はルーティングミドルウェアによって異なります。このセクションでは、最も一般的なルーティングパッケージとの統合方法を説明します。

### go_router

[go_router][2] は Flutter Navigator v1 と同じオブザーバーインターフェイスを使用しているため、`GoRouter` のパラメーターとして他のオブザーバーに `DatadogNavigationObserver` を追加することができます。

```dart
final _router = GoRouter(
  routes: [
    // ルート情報をここに
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // 残りのセットアップ
);
```

ShellRoutes を使用している場合は、以下のようにそれぞれの `ShellRoute` に個別のオブザーバーを指定する必要があります。詳しくは[このバグ][3]を参照してください。

```dart
final _router = GoRouter(
  routes: [
    ShellRoute(build: shellBuilder),
    routes: [
      // 追加ルート
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
  // 残りのセットアップ
);
```

また、`GoRoute` の `pageBuilder` パラメーターを `builder` パラメーターに代えて使用している場合は、`state.pageKey` の値と `name` の値を `MaterialPage` に渡すようにしてください。

```dart
GoRoute(
  name: 'My Home',
  path: '/path',
  pageBuilder: (context, state) {
    return MaterialPage(
      key: state.pageKey,       // GoRouter がオブザーバーを呼び出すのに必要
      name: name,               // Datadog が正しいルート名を取得するのに必要
      child: _buildContent(),
    );
  },
),
```

### AutoRoute

[AutoRoute][4] は `config` メソッドの一部として `navigatorObservers` の 1 つとして提供された `DatadogNavigationObserver` を使用することができます。

```dart
return MaterialApp.router(
  routerConfig: _router.config(
    navigatorObservers: () => [
      DatadogNavigationObserver(
        datadogSdk: DatadogSdk.instance,
      ),
    ],
  ),
  // 残りのセットアップ
);
```

ただし、AutoRoute のタブルーティングを使用する場合は、Datadog のデフォルトオブザーバーを AutoRoute の `AutoRouteObserver` インターフェイスで拡張する必要があります。

```dart
class DatadogAutoRouteObserver extends DatadogNavigationObserver
    implements AutoRouterObserver {
  DatadogAutoRouteObserver({required super.datadogSdk});

  // オブザーバータブルートへのオーバーライドのみ
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

この新しいオブジェクトは、従来のシンプルな `DatadogNavigationObserver` を置き換えます。

### Beamer

[Beamer][5] では、`BeamerDelegate` の引数として `DatadogNavigationObserver` を使用することができます。

```dart
final routerDelegate = BeamerDelegate(
  locationBuilder: RoutesLocationBuilder(
    routes: {
      // ルート構成
    },
  ),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ]
);
```

## Web ビュー追跡

リアルユーザーモニタリングにより、ハイブリッドモバイルアプリケーションの Web ビューを監視し、死角をなくすことができます。

Datadog Flutter SDK には、[`webview_flutter`][8] と [`flutter_inappwebview`][9] の両方を扱うためのパッケージがあります。詳細については、[Web ビュー追跡のドキュメントページ][10]を参照してください。

## gRPC

Datadog は [grpc Flutter パッケージ][7] で使用するための [`datadog_grpc_interceptor`][6] を提供します。gRPC インターセプターは gRPC リクエストを RUM リソースとして自動的に追跡し、APM による分散型トレーシングを可能にします。

### セットアップ

`pubspec.yaml` に `datadog_grpc_interceptor` を追加するか、ターミナルから `flutter pub add datadog_grpc_interceptor` を実行します。

```yaml
dependencies:
  # Other dependencies
  datadog_grpc_interceptor: ^1.1.0
```

このプラグインを使用するには、`DatadogGrpcInterceptor` のインスタンスを作成し、生成した gRPC クライアントに渡します。

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

Datadog は `graphql_flutter` や `ferry` を含むほとんどの GraphQL Flutter ライブラリで使用するための [`datadog_gql_link`][1] を提供します。このリンクは、GraphQL リクエストを RUM リソースとして自動的に追跡し、クエリ名、ミューテーション名、変数をリソースの属性として追加し、APM で分散型トレーシングを可能にします。

### セットアップ

`pubspec.yaml` に `datadog_gql_link` を追加するか、ターミナルから `flutter pub add datadog_gql_link` を実行します。

```yaml
dependencies:
  # 他の依存関係
  datadog_gql_link: ^1.0.0
```

GraphQL リンクを作成するときは、終端リンクの上に `DatadogGqlLink` を追加します。例:

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```

`datadog_tracking_http_client` を使って非 GraphQL ネットワークコールを追跡している場合は、GraphQL エンドポイントへのリクエストを無視するように追跡プラグインを構成する必要があります。そうしないと、GraphQL リソースが 2 回レポートされ、APM トレースが壊れる可能性があります。`datadog_tracking_http_client` バージョン 2.1.0 に追加された `ignoreUrlPatterns` パラメーターを使用して、GraphQL エンドポイントを無視します。

```dart
final datadogConfig = DatadogConfiguration(
    // あなたの構成
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```



## その他の参考資料

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
[10]: /ja/real_user_monitoring/mobile_and_tv_monitoring/web_view_tracking?tab=flutter