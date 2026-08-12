---
aliases:
- /ja/real_user_monitoring/flutter/
- /ja/real_user_monitoring/flutter/setup
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter
description: Flutter プロジェクトから RUM と Error Tracking のデータを収集します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration
  tag: ドキュメント
  text: RUM Flutter の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: dd-sdk-flutter のソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
title: Flutter 監視のセットアップ
---
## 概要

このページでは、Flutter SDK を使って、[Real User Monitoring (RUM)][1] と [Error Tracking][2] の両方をアプリケーションに組み込む方法を説明します。以下の手順に従って、Error Tracking を含む RUM のインスツルメント、またはスタンドアロン製品として購入した Error Tracking のみのインスツルメントを設定できます。

## セットアップ

Flutter アプリケーションから Datadog に RUM または Error Tracking のデータ送信を開始するには:

### ステップ 1 - UI でアプリケーションの詳細を指定する

{{< tabs >}}
{{% tab "RUM" %}}

1. Datadog で、[**Digital Experience** > **Add an Application**][1] に移動します。
2. アプリケーションタイプとして `Flutter` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
4. クライアント IP または位置情報データの自動収集を無効にするには、該当する設定のチェック ボックスをオフにします。詳しくは [Flutter 収集データ][2] を参照してください。

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Datadog で Flutter 用 RUM アプリケーションを作成する" style="width:90%;">}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1] に移動します。
2. アプリケーションタイプとして `Flutter` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
4. クライアント IP または位置情報データのいずれかの自動収集を無効にする場合も、該当する設定のチェック ボックスをオフにします。詳しくは [Flutter 収集データ][2] を参照してください。

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application-1.png" alt="Datadog で Flutter 用のアプリケーションを作成する" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ja/real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{< /tabs >}}

データの安全性を確保するために、クライアントトークンを使用する必要があります。クライアントトークンの設定方法については、[クライアントトークンのドキュメント][3]を参照してください。

### ステップ 2 - アプリケーションをインスツルメントする

まず、各プラットフォームで環境が正しくセットアップされていることを確認してください。

<div class="alert alert-info">
Datadog は Flutter 3.0+ の iOS と Android 向けに Flutter Monitoring をサポートしています。
</div>

Datadog は Flutter Web を正式にはサポートしていません。ただし、モバイル アプリ向けの現行 Flutter SDK では、追加設定なしで利用できる監視もあります。既知の制限は次のとおりです:

 * Flutter から報告されるすべてのアクションは、type が `custom` としてラベル付けされます。
 * 長時間実行されるアクション (`startAction` と `stopAction`) はサポートされません。
 * RUM リソースを手動で報告する (`startResource` と `stopResource`) ことはサポートされません。
 * イベント マッパーはサポートされません。
 * ロガーに付与するタグはサポートされません。
 * `addUserExtraInfo` はサポートされません。
 * `stopSession` はサポートされません。

Flutter Web のサポートは予定していませんが、Datadog の優先順位はフィードバックに基づいて見直されることがよくあります。Flutter Web アプリがあり、Datadog SDK でパフォーマンスを監視したい場合は、カスタマー サポート チームに連絡して、この機能要望をエスカレーションしてください。

#### iOS

`ios/Podfile` にある iOS の Podfile では、`use_frameworks!` を true に設定する必要があります。これは Flutter のデフォルトです。さらに、ターゲット iOS バージョンは 11.0 以上 (>= 11.0) に設定してください。

この制約は、通常 Podfile の先頭行にコメントアウトされ、次のように記述されます。

```ruby
platform :ios, '11.0'
```

`11.0` は、対応させたい iOS の最小バージョンが 11.0 以上であれば、自由に置き換えることができます。

#### Android

Android の場合、`minSdkVersion` は 21 以上 (>= 21) である必要があります。Kotlin を使用している場合は、バージョン 1.8.0 以上 (>= 1.8.0) にしてください。これらの制約は通常 `android/app/build.gradle` ファイルで管理されています。

#### Web

"Web の場合は、**{{<region-param key="dd_site_name">}}** サイト向けに、 `index.html` の `head` タグ内に次の内容を追加してください:
{{< site-region region="us" >}}"
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
{{< site-region region="ap2" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap2/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap2/v5/datadog-rum-slim.js"></script>
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

これにより、Logs と RUM 用の CDN 配信 Datadog Browser SDK が読み込まれます。Datadog Flutter プラグインでサポートされるのは、同期の CDN 配信版 Browser SDK のみです。

#### プラグインを追加する

1. 以下を `pubspec.yaml` ファイルに追加します。

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^2.0.0
   ```
2. 以下のスニペットを使って、Logs や RUM など Datadog の各機能ごとに設定オブジェクトを作成します。特定の機能に設定を渡さない場合、その機能は無効になります。

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

利用できる設定オプションの詳細は、[DatadogConfiguration オブジェクトのドキュメント][4] を参照してください。

データを安全に扱うため、クライアント トークンを使用する必要があります。Datadog API キーは、Datadog の [Flutter プラグイン][5] の設定には使用できません。

- RUM を使用する場合は、**Client Token** と **Application ID** を設定してください。
- Logs のみを使用する場合は、クライアント トークンでライブラリを初期化します。


### ステップ 3 - ライブラリを初期化する

`main.dart` ファイルで、次の 2 通りの方法のいずれかを使ってライブラリを初期化できます。

- `DatadogSdk.runApp` を使用すると、[Error Tracking][6] が自動的に設定されます。

   ```dart
   await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
     runApp(const MyApp());
   })
   ```

- [Error Tracking][6] とリソース トラッキングは手動で設定することもできます。`DatadogSdk.runApp` は `WidgetsFlutterBinding.ensureInitialized` を呼び出すため、`DatadogSdk.runApp` を使わない場合は `DatadogSdk.instance.initialize` を呼び出す前にこのメソッドを実行してください。

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

#### セッションのサンプリングレート

アプリケーションが Datadog RUM に送信するデータ量を制御するには、Flutter RUM SDK の初期化時に RUM セッションのサンプリング レートを指定できます。レートは 0 から 100 のパーセンテージです。デフォルトでは `sessionSamplingRate` は 100 に設定されており、すべてのセッションを保持します。

たとえばセッションの 50% だけを保持するには、次のようにします:

```dart
final config = DatadogConfiguration(
    // 他の構成...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        sessionSamplingRate: 50.0,
    ),
);
```

#### トラッキングの同意を設定 (GDPR の遵守)

GDPR 規則に準拠するため、Datadog Flutter SDK では初期化時に `trackingConsent` の値が必要です。

`trackingConsent` に以下のいずれかの値を設定します。

- `TrackingConsent.pending`: Datadog Flutter SDK はデータの収集とバッチ処理を開始しますが、Datadog には送信しません。新しい追跡に関する同意の値を待って、バッチされたデータをどうするかを決定します。
- `TrackingConsent.granted`: Datadog Flutter SDK はデータの収集を開始し、Datadog へ送信します。
- `TrackingConsent.notGranted`: Datadog Flutter SDK はデータを一切収集しません。そのため、ログ、トレース、イベントは Datadog に送信されません。

SDK の初期化後に追跡同意の値を変更するには、`DatadogSdk.setTrackingConsent` API 呼び出しを使用します。

SDK は新しい値に応じて動作を変更します。例えば、現在の追跡に関する同意が `TrackingConsent.pending` であった場合:

- これを `TrackingConsent.granted` に変更すると、SDK は現在と未来のすべてのデータを Datadog に送信します。
- これを `TrackingConsent.notGranted` に変更すると、SDK は現在のデータをすべて消去し、今後のデータ収集は行いません。

## ビューの自動追跡

Flutter Navigator v2.0 を使用している場合、自動ビュー トラッキングの設定はルーティング ミドルウェアによって異なります。[Flutter 統合ライブラリ][12] を参照し、[go_router][7]、[AutoRoute][9]、[Beamer][10] との統合方法を確認してください。

### Flutter Navigator v1

Datadog Flutter プラグインは、MaterialApp で `DatadogNavigationObserver` を使用することで、名前付きルートを自動でトラッキングできます:

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

これは名前付きルートを使用している場合、または `PageRoute` の `settings` パラメーターに名前を指定した場合に動作します。

名前付きルートを使用していない場合は、`DatadogNavigationObserverProvider` ウィジェットと組み合わせて `DatadogRouteAwareMixin` を使用することで、RUM ビューを自動で開始 / 停止できます。`DatadogRouteAwareMixin` を使用する場合は、`initState` の処理を `didPush` に移してください。

### Flutter Navigator v2

`MaterialApp.router` という名前付きコンストラクターを使う Flutter Navigator v2.0 の場合も、ルーティング ミドルウェアの有無や種類によって設定が変わります。[`go_router`][7] は Flutter Navigator v1 と同じオブザーバー インターフェースを使用するため、`DatadogNavigationObserver` を `GoRouter` のパラメータとして他のオブザーバーに追加できます。

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
)
```

`go_router` 以外のルーターを使う例については、[ビューを自動でトラッキングする](#automatically-track-views) を参照してください。


### ビューの名称変更

どのセットアップでも、[`viewInfoExtractor`][11] コールバックを用意すれば、ビューの名称を変更したりカスタム パスを指定したりできます。この関数は `defaultViewInfoExtractor` を呼び出すことで、オブザーバーのデフォルト動作にフォールバックできます。例:

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

## アクションの自動追跡

[`RumUserActionDetector`][13] を使用して、指定したウィジェットツリーで発生したユーザータップを追跡します。

```dart
RumUserActionDetector(
  rum: DatadogSdk.instance.rum,
  child: Scaffold(
    appBar: AppBar(
      title: const Text('RUM'),
    ),
    body: // アプリケーションの残り
  ),
);
```

`RumUserActionDetector` は、ツリー内で発生したタップユーザーアクションを自動的に検出し、RUM に送信します。いくつかの一般的な Flutter ウィジェットとのインタラクションを検出します。

ほとんどのボタンタイプでは、ディテクタは `Text` ウィジェットの子要素を探し、アクションの説明に使用します。その他の場合は `Semantics` オブジェクトの子要素、または `Icon.semanticsLabel` プロパティが設定された `Icon` を探します。

別の方法として、任意の Widget ツリーを [`RumUserActionAnnotation`][14] で囲むこともできます。これにより、子ツリーで検出されたユーザー アクションを報告する際に、ツリーの Semantics を変更せずに指定した description が使用されます。

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

## デバイスがオフラインの時のデータ送信

Flutter SDK は、ユーザー デバイスがオフラインでもデータを利用できるようにします。ネットワークが不安定な地域やデバイスのバッテリー残量が少ない場合、すべてのイベントはまずローカル デバイスにバッチとして保存されます。ネットワークが利用可能になり、かつ Flutter SDK がエンド ユーザー体験に影響しない程度にバッテリー残量が十分になった時点で送信されます。アプリケーションがフォアグラウンドで動作している間にネットワークが利用できない場合や、データのアップロードが失敗した場合でも、そのバッチは正常に送信できるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: ディスク上のデータは、古くなりすぎると自動的に削除されます。これは、Flutter SDK がディスク容量を過度に消費しないようにするためです。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/error_tracking/
[3]: /ja/account_management/api-app-keys/#client-tokens
[4]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[5]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[6]: /ja/real_user_monitoring/error_tracking/flutter
[7]: https://pub.dev/packages?q=go_router
[8]: /ja/real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration/#automatic-view-tracking
[9]: https://pub.dev/packages/auto_route
[10]: https://pub.dev/packages/beamer
[11]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[12]: /ja/real_user_monitoring/mobile_and_tv_monitoring/flutter/integrated_libraries/
[13]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html