---
aliases:
- /ja/real_user_monitoring/flutter/
- /ja/real_user_monitoring/flutter/setup
code_lang: flutter
code_lang_weight: 30
description: Flutter プロジェクトから RUM データを収集します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
  tag: ドキュメント
  text: RUM Flutter の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter のソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの確認方法
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
kind: ドキュメント
title: RUM Flutter モニタリングのセットアップ
type: multi-code-lang
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

まず、各プラットフォームに対して環境が適切にセットアップされていることを確認します。

<div class="alert alert-info">
Datadog は、Flutter 2.8+ の iOS と Android の Flutter Monitoring をサポートしています。Flutter Web のサポートはアルファ版です。
</div>

#### iOS

iOS の Podfile は `ios/Podfile` にあり、`use_frameworks!` を true に設定し (Flutter のデフォルト)、ターゲット iOS のバージョンを >= 11.0 に設定する必要があります。

この制約は、通常 Podfile の先頭行にコメントアウトされ、次のように記述されます。

```ruby
platform :ios, '11.0'
```

`11.0` は、対応させたい iOS の最小バージョンが 11.0 以上であれば、自由に置き換えることができます。

#### Android

Android の場合、`minSdkVersion` のバージョンは 19 以上でなければならず、Kotlin を使用している場合はバージョン 1.6.21 以上であるべきです。これらの制約は、通常 `android/app/build.gradle` ファイルにあります。

#### Web

Web の場合、`index.html` の `head` タグ内に以下のコードを追加します (**{{<region-param key="dd_site_name">}}** サイトの場合): 
{{< site-region region="us" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v4/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
```
{{</ site-region>}}

これにより、ログと RUM 用の CDN 経由で配信される Datadog Browser SDK がロードされます。Datadog Flutter プラグインがサポートしているのは、Browser SDK の同期 CDN 配信バージョンのみです。

#### プラグインの追加

1. 以下を `pubspec.yaml` ファイルに追加します。

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^1.3.0
   ```
2. 以下のスニペットで、Datadog の各機能 (ログや RUM など) の構成オブジェクトを作成します。ある機能に対して構成を渡さない場合、その機能は無効化されます。

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

利用可能な構成オプションの詳細については、[DatadogConfiguration オブジェクトのドキュメント][3]を参照してください。

データの安全性を確保するために、クライアントトークンを使用する必要があります。Datadog API キーは、Datadog Flutter プラグインを構成するために使用することはできません。

- RUM を使用する場合、**Client Token** と **Application ID** を設定します。
- ログのみを使用する場合は、クライアントトークンでライブラリを初期化します。

## アプリケーションのインスツルメンテーション

### ライブラリの初期化

RUM の初期化は、`main.dart` ファイル内の 2 つの方法のうちの 1 つを使用して行うことができます。

1. [エラー追跡][4]を自動的に設定する `DatadogSdk.runApp` を使用します。

   ```dart
   await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
     runApp(const MyApp());
   })
   ```

2. または、手動で[エラー追跡][4]とリソース追跡を設定します。`DatadogSdk.runApp` は `WidgetsFlutterBinding.ensureInitialized` を呼び出すので、`DatadogSdk.runApp` を使用しない場合は、`DatadogSdk.instance.initialize` を呼び出す前にこのメソッドを呼び出す必要があります。

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

### RUM セッションのサンプリング

アプリケーションが Datadog RUM に送信するデータを制御するには、Flutter RUM SDK を初期化し、RUM セッションのサンプリングレートを 0～100 の間に指定します。デフォルトでは、`sessionSamplingRate` は 100 (すべてのセッションを維持) に設定されます。

例えば、セッションの 50% のみを維持するには、

```dart
final config = DatadogConfiguration(
    // 他の構成...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        sessionSamplingRate: 50.0,
    ),
);
```

### 追跡の同意を設定する

GDPR 規制を遵守するため、Datadog Flutter SDK は初期化時に `trackingConsent` の値を要求します。

`trackingConsent` に以下のいずれかの値を設定します。

- `TrackingConsent.pending`: Datadog Flutter SDK はデータの収集とバッチ処理を開始しますが、Datadog には送信しません。新しい追跡に関する同意の値を待って、バッチされたデータをどうするかを決定します。
- `TrackingConsent.granted`: Datadog Flutter SDK はデータの収集を開始し、Datadog へ送信します。
- `TrackingConsent.notGranted`: Datadog Flutter SDK はデータを収集しないため、ログ、トレース、RUM イベントなどが Datadog に送信されることはありません。

SDK の初期化後に追跡同意値を変更するには、`DatadogSdk.setTrackingConsent` API 呼び出しを使用します。

SDK は新しい値に応じて動作を変更します。例えば、現在の追跡に関する同意が `TrackingConsent.pending` であった場合:

- これを `TrackingConsent.granted` に変更すると、SDK は現在と未来のすべてのデータを Datadog に送信します。
- これを `TrackingConsent.notGranted` に変更すると、SDK は現在のデータをすべて消去し、今後のデータ収集は行いません。

## ビューの自動追跡

### Flutter Navigator v1

Datadog Flutter Plugin は、MaterialApp 上の `DatadogNavigationObserver` を使用して、自動的に名前付きルートを追跡することができます。

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

これは名前付きルートを使用している場合、または `PageRoute` の `settings` パラメーターに名前を指定した場合に動作します。

名前付きルートを使用していない場合は、`DatadogRouteAwareMixin` と `DatadogNavigationObserverProvider` ウィジェットを組み合わせて使用すると、RUM ビューを自動的に起動したり停止したりすることができます。`DatadogRouteAwareMixin` を使って、`initState` から `didPush` へとロジックを移動させます。

### Flutter Navigator v2

Flutter Navigator v2.0 を使用しており、その中で `MaterialApp.router` という名前付きコンストラクタを使用している場合、使用しているルーティングミドルウェアによってセットアップ方法が異なります。[`go_router`][11] は Flutter Navigator v1 と同じオブザーバーインターフェースを使用するため、`GoRouter` へのパラメーターとして `DatadogNavigationObserver` を他のオブザーバーに追加することができます。

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

`go_router` 以外のルーターを使用する例については、[高度な構成 - ビューの自動追跡][12]を参照してください。


### ビューの名前変更

あらゆるセットアップで、[`viewInfoExtractor`][8] コールバックを提供することによりビューの名前を変更したりカスタムパスを提供したりできます。この関数は、`defaultViewInfoExtractor` を呼び出すことによって、オブザーバーのデフォルト動作にフォールバックすることができます。例:

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

[Datadog Tracking HTTP Client][5] パッケージを使用して、RUM ビューからリソースと HTTP コールの自動追跡を有効にします。

パッケージを `pubspec.yaml` に追加し、初期化ファイルに以下を追加します。

```dart
final configuration = DatadogConfiguration(
  // 構成
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**注**: Datadog Tracking HTTP Client は、[`HttpOverrides.global`][9] を変更します。独自のカスタム `HttpOverrides` を使用している場合は、[`DatadogHttpOverrides`][10] を継承する必要があるかもしれません。この場合、`enableHttpTracking` を呼び出す必要はありません。バージョン `datadog_tracking_http_client` 1.3 以上では、`HttpOverrides.current` の値をチェックし、これをクライアント作成に使用するので、Datadog を初期化する前に `HttpOverrides.global` を必ず初期化しておく必要があります。

Datadog [分散型トレーシング][6]を有効にするには、構成オブジェクトの `DatadogConfiguration.firstPartyHosts` プロパティを、分散型トレーシングをサポートするドメインに設定する必要があります。また、`DatadogRumConfiguration` で `tracingSamplingRate` を設定することで、分散型トレーシングのサンプリングレートを変更することができます。

- `firstPartyHosts` はワイルドカードを許可しませんが、与えられたドメインのサブドメインにマッチします。例えば、`api.example.com` は `staging.api.example.com` と `prod.api.example.com` にマッチし、`news.example.com` にはマッチしません。

- `DatadogRumConfiguration.traceSampleRate` はデフォルトのサンプリングレートを 20% に設定します。すべてのリソースリクエストを完全な分散型トレースにしたい場合は、この値を `100.0` に設定します。


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

代わりに、任意のウィジェットツリーを [`RumUserActionAnnotation`][14] で囲むことができます。この場合、ツリーのセマンティクスを変更することなく、子ツリーで検出されたユーザーアクションを報告するときに、指定された説明を使用します。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[4]: /ja/real_user_monitoring/error_tracking/flutter
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /ja/serverless/distributed_tracing
[7]: /ja/real_user_monitoring/flutter/data_collected/
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[11]: https://pub.dev/packages/go_router
[12]: /ja/real_user_monitoring/flutter/advanced_configuration/#automatic-view-tracking
[13]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html