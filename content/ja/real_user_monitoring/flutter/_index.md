---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/README.md
description: Flutter プロジェクトから RUM データを収集します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: ブログ
  text: Datadog Mobile RUM による Flutter アプリケーションのパフォーマンス監視
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter ソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: Flutter モニタリング
---
<div class="alert alert-info"><p>Flutter モニタリングはベータ版です。</p>
</div>


## 概要

Datadog Real User Monitoring (RUM) を使用すると、Flutter アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

RUM は、モバイル Flutter の Android および iOS アプリケーションの監視をサポートしています。

## 現在の Datadog SDK のバージョン

[//]: # (SDK Table)

| iOS SDK | Android SDK | Browser SDK |
| :-----: | :---------: | :---------: |
| 1.11.0-rc1 | 1.12.0-alpha2 | v4.11.2 |

[//]: # (End SDK Table)

### iOS

iOS の Podfile は `use_frameworks!` (Flutter のデフォルトでは true) で、iOS のバージョン >= 11.0 をターゲットにしている必要があります。

### Android

Android では、`minSdkVersion` が >= 19 である必要があり、Kotlin を使用している場合は、バージョン >= 1.5.31 である必要があります。

### Web

`⚠️ Flutter Web の Datadog サポートはまだ初期開発中です`

Web の場合、`index.html` の `head` タグの下に以下を追加します。

```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
```

これは、CDN 配信された Datadog Logging および RUM Browser SDK をロードします。Browser SDK の同期 CDN 配信バージョンは、Flutter プラグインでサポートされる唯一のバージョンであることに注意してください。

## セットアップ

### UI でアプリケーションの詳細を指定

1. [Datadog アプリ][1]で、**UX Monitoring** > **RUM Applications** > **New Application** へ移動します。
2. アプリケーションタイプとして `Flutter` を選択します。
3. アプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。

{{< img src="real_user_monitoring/flutter/image_flutter.png" alt="Datadog ワークフローで RUM アプリケーションを作成" style="width:90%;">}}

データの安全性を確保するために、クライアントトークンを使用する必要があります。クライアントトークンの設定方法については、[クライアントトークンのドキュメント][4]を参照してください。

### コンフィギュレーションオブジェクトの作成

以下のスニペットで、Datadog の各機能 (Logging、Tracing、RUM など) のコンフィグレーションオブジェクトを作成します。ある機能に対してコンフィギュレーションを渡さないことで、その機能は無効化されます。

```dart
// 追跡に対するユーザーの同意の判断
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
  tracingConfiguration: TracingConfiguration(
    sendNetworkInfo: true,
  ),
  rumConfiguration: RumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
  )
);
```

### ライブラリの初期化

RUM の初期化は、`main.dart` ファイル内の 2 つのメソッドのうちの 1 つを使用して行うことができます。

1. エラーレポートとリソーストレースを自動的にセットアップする `DatadogSdk.runApp` を使用します。

   ```dart
   await DatadogSdk.runApp(configuration, () async {
     runApp(const MyApp());
   })
   ```

2. また、手動でエラー追跡とリソース追跡を設定することもできます。`DatadogSdk.runApp` は `WidgetsFlutterBinding.ensureInitialized` を呼び出すので、`DatadogSdk.runApp` を使用しない場合は、`DatadogSdk.instance.initialize` を呼び出す前にこのメソッドを呼び出す必要があります。

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

### ログを送信する

Datadog を `LoggingConfiguration` で初期化した後、`logs` のデフォルトインスタンスを使用して Datadog にログを送信することができます。

```dart
DatadogSdk.instance.logs?.debug("A debug message.");
DatadogSdk.instance.logs?.info("Some relevant information?");
DatadogSdk.instance.logs?.warn("An important warning...");
DatadogSdk.instance.logs?.error("An error was met!");
```

また、`createLogger` メソッドを使用して、追加のロガーを作成することも可能です。

```dart
final myLogger = DatadogSdk.instance.createLogger(
  LoggingConfiguration({
    loggerName: 'Additional logger'
  })
);

myLogger.info('Info from my additional logger.');
```

ロガーに設定されたタグおよび属性は、各ロガーにローカルです。

### RUM ビューの追跡

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

また、`DatadogRouteAwareMixin` プロパティと `DatadogNavigationObserverProvider` プロパティを組み合わせて使用すると、RUM ビューを自動的に起動したり停止したりすることができます。`DatadogRouteAwareMixin` を使って、`initState` から `didPush` へとロジックを移動させます。

### リソースの自動追跡

[Datadog Tracking HTTP Client][7] パッケージを使用すると、RUM ビューからリソースと HTTP 呼び出しの自動追跡を有効にすることができます。このパッケージを `pubspec.yaml` に追加し、初期設定に以下を追加します。

```dart
final configuration = DdSdkConfiguration(
  // 構成
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

Datadog 分散型トレーシングを有効にするには、構成オブジェクトの `DdSdkConfiguration.firstPartyHosts` プロパティを、分散型トレーシングをサポートするドメインに設定する必要があります。また、`RumConfiguration` で `tracingSamplingRate` を設定することで、Datadog 分散型トレーシングのサンプリングレートを変更することができます。

## トラブルシューティング

### Cocoapods 問題

Datadog SDK を追加した後、Cocoapods から投げられるエラーのために iOS アプリケーションのビルドに問題がある場合、エラーを確認してください。最も一般的なエラーは、Cocoapods から最新のネイティブライブラリを取得する問題で、これは `ios` ディレクトリで以下を実行することで解決できます。

```bash
pod install --repo-update
```

もう一つのよくあるエラーは、Apple Silicon Mac での FFI ライブラリの読み込みの問題です。 以下のようなエラーが表示された場合:

```bash
LoadError - dlsym(0x7fbbeb6837d0, Init_ffi_c): symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `<top (required)>'
```

[Flutter のドキュメント][8]にある、Apple Silicon で Flutter を使うための手順に従います。

### sdkVerbosity の設定

アプリは実行できるのに、Datadog サイトで期待するデータが表示されない場合は、`DatadogSdk.initialize` を呼び出す前に、コードに以下を追加してみてください。

```dart
DatadogSdk.instance.sdkVerbosity = Verbosity.verbose;
```

これにより、SDK が何をしているか、どのようなエラーに遭遇しているかについての追加情報が出力され、お客様と Datadog サポートが問題を絞り込むのに役立つ場合があります。

## データストレージ

### Android

データが Datadog にアップロードされる前に、アプリケーションのキャッシュディレクトリに平文で保存されます。このキャッシュフォルダは、[Android のアプリケーションサンドボックス][6]によって保護されており、ほとんどのデバイスで、このデータは他のアプリケーションによって読み取られることはありません。しかし、モバイルデバイスがルート化されていたり、誰かが Linux カーネルをいじったりすると、保存されているデータが読めるようになる可能性があります。

### iOS

データは Datadog にアップロードされる前に、[アプリケーションサンドボックス][2]のキャッシュディレクトリ (`Library/Caches`) に平文で保存され、デバイスにインストールされた他のアプリからは読み取ることができません。

## 寄稿

プルリクエストを歓迎します。まず、課題を開いて、何を変更したいかを議論してください。

詳しくは、[寄稿ガイドライン][4]をご覧ください。

## ライセンス

詳細については、[Apache ライセンス、v2.0][5] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[4]: https://github.com/DataDog/dd-sdk-flutter/blob/main/CONTRIBUTING.md
[5]: https://github.com/DataDog/dd-sdk-flutter/blob/main/LICENSE
[6]: https://source.android.com/security/app-sandbox
[7]: https://pub.dev/packages/datadog_tracking_http_client
[8]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon