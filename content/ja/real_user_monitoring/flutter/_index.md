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
## 概要

Datadog Real User Monitoring (RUM) を使用すると、Flutter アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## プラットフォーム対応

| Android | iOS |  Web | MacOS | Linux | Windows |
| :-----: | :-: | :---: | :-: | :---: | :----: |
|   ✅    | ✅  |  🚧   | ❌  |  ❌   |   ❌   |

## 現在の Datadog SDK のバージョン

[//]: # (SDK Table)

| iOS SDK | Android SDK | Browser SDK |
| :-----: | :---------: | :---------: |
| 1.11.0-beta2 | 1.12.0-alpha2 | ❌ |

[//]: # (End SDK Table)


### iOS

iOS の Podfile は `use_frameworks!` (Flutter のデフォルトでは true) で、iOS のバージョン >= 11.0 をターゲットにしている必要があります。

### Android

Android では、`minSdkVersion` が >= 19 である必要があり、Kotlin を使用している場合は、バージョン >= 1.5.31 である必要があります。

## セットアップ

Logs と Tracing には、Datadog のクライアントトークンが必要です。RUM を使用している場合は、アプリケーション ID が必要です。

### UI でアプリケーションの詳細を指定

1. [**UX Monitoring** > **RUM Applications** > **New Application**][1] へ移動します。
2. アプリケーションタイプとして `flutter` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. **+ Create New RUM Application** をクリックします。

データの安全性を確保するため、クライアントトークンを使用する必要があります。`@datadog/mobile-react-native` ライブラリの構成に [Datadog API キー][2]のみを使用した場合、クライアント側で React Native アプリケーションのコード内で公開されます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][3]を参照してください。

### Datadog の構成

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
    applicationId: '<RUM_APPLICATION_ID',
  )
);
```

### ライブラリの初期化

Datadog の初期化は、`main.dart` ファイル内の 2 つのメソッドのうちの 1 つを使用して行うことができます。

1. エラーレポートとリソーストレースを自動的にセットアップする `DatadogSdk.runApp` を使用します。これは、Datadog を初期化する最もシンプルな方法です。

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

### RUM ビューの追跡

Datadog Flutter Plugin は、MaterialApp 上の `DatadogNavigationObserver` を使用して、自動的に名前付きルートを追跡することができます。

```dart
MaterialApp(
  home: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(),
  ],
);
```

これは名前付きルートを使用している場合、または `PageRoute` の `settings` パラメーターに名前を指定した場合のみ動作します。

また、`DatadogRouteAwareMixin` プロパティと `DatadogNavigationObserverProvider` プロパティを組み合わせて使用すると、RUM ビューを自動的に起動したり停止したりすることができます。`DatadogRouteAwareMixin` を使って、`initState` から `didPush` へとロジックを移動させます。

### リソースの自動追跡

[Datadog Tracking HTTP Client][7] パッケージを使用すると、RUM ビューからリソースと HTTP 呼び出しの自動追跡を有効にすることができます。このパッケージを `pubspec.yaml` に追加し、初期設定に以下を追加します。

```dart
final configuration = DdSdkConfiguration(
  // 構成
)..enableHttpTracking()
```

Datadog の分散型トレーシングを有効にしたい場合は、`DdSdkConfiguration.firstPartyHosts` コンフィギュレーションオプションも設定する必要があります。

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