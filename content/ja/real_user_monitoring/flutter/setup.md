---
description: RUM とセッションリプレイまたはログ管理のために Flutter Monitoring をセットアップします。
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
title: セットアップ
---
## 概要

ログ管理またはリアルユーザーモニタリング (RUM) をセットアップするには、[Datadog Flutter プラグイン][1]を使用します。セットアップ手順は、ログ、RUM、またはその両方を使用する決定に基づいて異なる場合がありますが、セットアップ手順の大部分は一貫しています。

## 前提条件

まず、各プラットフォームに対して環境が適切にセットアップされていることを確認します。

<div class="alert alert-info">
Datadog は、Flutter 2.8+ の iOS と Android の Flutter Monitoring をサポートしています。Flutter Web のサポートはアルファ版です。
</div>

### iOS

iOS の Podfile は `ios/Podfile` にあり、`use_frameworks!` を true に設定し (Flutter のデフォルト)、ターゲット iOS のバージョンを >= 11.0 に設定する必要があります。

この制約は、通常 Podfile の先頭行にコメントアウトされ、次のように記述されます。

```ruby
platform :ios, '11.0'
```

`11.0` は、対応させたい iOS の最小バージョンが 11.0 以上であれば、自由に置き換えることができます。

### Android

Android の場合、`minSdkVersion` のバージョンは >= 19 でなければならず、Kotlin を使用している場合は、バージョン >= 1.6.21 である必要があります。これらの制約は通常、`android/app/build.gradle` ファイルに保持されています。

### Web

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

## セットアップ

1. 以下を `pubspec.yaml` ファイルに追加します。

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^1.3.0
   ```
2. 以下のスニペットで、Datadog の各機能 (ログや RUM など) の構成オブジェクトを作成します。ある機能に対して構成を渡さない場合、その機能は無効化されます。

   ```dart
   // Determine the user's consent to be tracked
   final trackingConsent = ...
   final configuration = DdSdkConfiguration(
     clientToken: '<CLIENT_TOKEN>',
     env: '<ENV_NAME>',
     site: DatadogSite.us1,
     trackingConsent: trackingConsent,
     nativeCrashReportEnabled: true,
     loggingConfiguration: LoggingConfiguration(
       sendNetworkInfo: true,
       printLogsToConsole: true,
     ),
     rumConfiguration: RumConfiguration(
       applicationId: '<RUM_APPLICATION_ID>',
     )
   );
   ```

利用可能な構成オプションの詳細については、[DdSdkConfiguration オブジェクトのドキュメント][5]を参照してください。

データの安全性を確保するために、クライアントトークンを使用する必要があります。Datadog API キーは、Datadog Flutter プラグインを構成するために使用することはできません。

- RUM を使用する場合、**Client Token** と **Application ID** を設定します。
- ログのみを使用する場合は、クライアントトークンでライブラリを初期化します。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][3]を参照してください。

### ライブラリの初期化

RUM の初期化は、`main.dart` ファイル内の 2 つの方法のうちの 1 つを使用して行うことができます。

1. [エラー追跡][4]を自動的に設定する `DatadogSdk.runApp` を使用します。

   ```dart
   await DatadogSdk.runApp(configuration, () async {
     runApp(const MyApp());
   })
   ```

2. または、手動で[エラー追跡][4]とリソース追跡を設定します。`DatadogSdk.runApp` は `WidgetsFlutterBinding.ensureInitialized` を呼び出すので、`DatadogSdk.runApp` を使用しない場合は、`DatadogSdk.instance.initialize` を呼び出す前にこのメソッドを呼び出す必要があります。

   ```dart
   runZonedGuarded(() async {
     WidgetsFlutterBinding.ensureInitialized();
     final originalOnError = FlutterError.onError;
     FlutterError.onError = (details) {
       FlutterError.presentError(details);
       DatadogSdk.instance.rum?.handleFlutterError(details);
       originalOnError?.call(details);
     };

     await DatadogSdk.instance.initialize(configuration);

     runApp(const MyApp());
   }, (e, s) {
     DatadogSdk.instance.rum?.addErrorInfo(
       e.toString(),
       RumErrorSource.source,
       stackTrace: s,
     );
   });
   ```

### RUM セッションのサンプリング

アプリケーションが Datadog RUM に送信するデータを制御するには、[Flutter RUM SDK を初期化][2]し、RUM セッションのサンプリングレートを 0～100 の間に指定します。デフォルトでは、`sessionSamplingRate` は 100 (すべてのセッションを維持) に設定されます。

たとえば、セッションの使用の 50% のみを維持するには、

```dart
final config = DdSdkConfiguration(
    // 他の構成...
    rumConfiguration: RumConfiguration(
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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_flutter_plugin
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/account_management/api-app-keys/#client-tokens
[4]: /ja/real_user_monitoring/error_tracking/flutter
[5]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DdSdkConfiguration-class.html