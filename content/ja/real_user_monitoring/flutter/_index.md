---
description: Flutter プロジェクトから RUM データを収集します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter のソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: Flutter モニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## セットアップ

### UI でアプリケーションの詳細を指定

1. [Datadog アプリ][1]で、**UX Monitoring** > **RUM Applications** > **New Application** へ移動します。
2. アプリケーションタイプとして `Flutter` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
4. クライアント IP またはジオロケーションデータの自動ユーザーデータ収集を無効にするには、これらの設定のチェックボックスをオフにします。詳しくは、[RUM Flutter データ収集][7]をご覧ください。

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Datadog で Flutter 用 RUM アプリケーションを作成する" style="width:90%;">}}

データの安全性を確保するために、クライアントトークンを使用する必要があります。クライアントトークンの設定方法については、[クライアントトークンのドキュメント][2]を参照してください。

### アプリケーションをインスツルメントする

Datadog Flutter SDK for RUM を初期化するには、[セットアップ][3]を参照してください。

## ビューの自動追跡

[Datadog Flutter Plugin][4] は、MaterialApp 上の `DatadogNavigationObserver` を使用して、自動的に名前付きルートを追跡することができます。

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

これは名前付きルートを使用している場合、または `PageRoute` の `settings` パラメーターに名前を指定した場合に動作します。

また、`DatadogRouteAwareMixin` プロパティと `DatadogNavigationObserverProvider` プロパティを組み合わせて使用すると、RUM ビューを自動的に起動したり停止したりすることができます。`DatadogRouteAwareMixin` を使って、`initState` から `didPush` へとロジックを移動させます。

ビューの名前を変更したり、カスタムパスを供給するには、[`viewInfoExtractor`][8] コールバックを提供します。この関数は、`defaultViewInfoExtractor` を呼び出すことによって、オブザーバーのデフォルト動作にフォールバックすることができます。例:

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


## リソースの自動追跡

[Datadog Tracking HTTP Client][5] パッケージを使用して、RUM ビューからリソースと HTTP 呼び出しの自動追跡を有効にします。

パッケージを `pubspec.yaml` に追加し、初期化ファイルに以下を追加します。

```dart
final configuration = DdSdkConfiguration(
  // 構成
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**注**: Datadog Tracking HTTP Client は、[`HttpOverrides.global`][9] を変更します。独自のカスタム `HttpOverrides` を使用している場合は、[`DatadogHttpOverrides`][10] を継承する必要があるかもしれません。この場合、`enableHttpTracking` を呼び出す必要はありません。`datadog_tracking_http_client` >= 1.3 のバージョンでは、`HttpOverrides.current` の値をチェックし、これをクライアント作成に使用するので、 Datadog を初期化する前に `HttpOverrides.global` を必ず初期化しておく必要だけがあります。

Datadog [分散型トレーシング][6]を有効にするには、構成オブジェクトの `DdSdkConfiguration.firstPartyHosts` プロパティを、分散型トレーシングをサポートするドメインに設定する必要があります。また、`RumConfiguration` で `tracingSamplingRate` を設定することで、分散型トレーシングのサンプリングレートを変更することができます。

- `firstPartyHosts` はワイルドカードを許可しませんが、与えられたドメインのサブドメインにマッチします。例えば、`api.example.com` は `staging.api.example.com` と `prod.api.example.com` にマッチし、`news.example.com` にはマッチしません。

- `RumConfiguration.tracingSamplingRate` はデフォルトのサンプリングレートを 20% に設定します。すべてのリソースリクエストを完全な分散型トレースにしたい場合は、この値を `100.0` に設定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: /ja/real_user_monitoring/flutter/#setup
[4]: https://pub.dev/packages/datadog_flutter_plugin
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /ja/serverless/distributed_tracing
[7]: /ja/real_user_monitoring/flutter/data_collected/
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html