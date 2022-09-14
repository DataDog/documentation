---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/error_tracking.md
description: エラー追跡を使用して Flutter のエラーを追跡する方法を紹介します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter ソースコード
- link: real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: エラートラッキングについて
kind: documentation
title: Flutter のクラッシュレポートとエラー追跡
---
## 概要

クラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。

<div class="alert alert-info">
Flutter アプリケーションで `--split-debug-info` と `--obfuscate` フラグを指定した場合の Dart スタックトレースはサポートされていません。
</div>

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

Datadog Flutter SDK for RUM をまだセットアップしていない場合は、[アプリ内セットアップ手順][2]に従うか、[Flutter セットアップドキュメント][3]を参照してください。

### クラッシュレポートの追加

初期化スニペットを更新し、`nativeCrashReportEnabled` を `true` に設定することで iOS と Android のネイティブクラッシュレポートを有効化します。

例:

```dart
final configuration = DdSdkConfiguration(
  clientToken: 'DD_CLIENT_TOKEN'
  env: 'DD_ENV'
  site: DatadogSite.us1,
  trackingConsent: TrackingConsent.granted,
  nativeCrashReportEnabled: true, // このフラグを設定します
  loggingConfiguration: LoggingConfiguration(),
  rumConfiguration: 'DD_APP_ID',
);
DatadogSdk.instance.initialize(configuration);
```

## iOS の DSYM を Datadog に手動でアップロードする

iOS のクラッシュレポートは生のフォーマットで収集され、そのほとんどがメモリアドレスを含んでいます。これらのアドレスを読みやすいシンボル情報にマッピングするために、Datadog は .dSYM ファイルを必要とし、これはアプリケーションのビルドプロセスで生成されます。

### dYSM ファイルを探す

すべての iOS アプリケーションは、アプリケーションモジュールごとに .dSYM ファイルを生成しています。これらのファイルは、アプリケーションのバイナリサイズを最小化し、より高速なダウンロードを可能にします。各アプリケーションのバージョンは、.dSYM ファイルのセットを含んでいます。

### dSYM ファイルのアップロード

Datadog に .dSYM ファイルをアップロードすることで、エラーの関連スタックトレースの各フレームのファイルパスと行番号にアクセスすることができるようになります。

アプリケーションがクラッシュし、アプリケーションを再起動すると、Datadog iOS SDK は Datadog にクラッシュレポートをアップロードします。

dSYM ファイルをアップロードするには、[@datadog/datadog-ci][4] のコマンドラインツールを使用します。デフォルトでは、Flutter はこれらの DSYM ファイルを `./build/ios/archive/Runner.xcarchive/dSYMs` に追加します。`flutter build ipa` でアプリケーションをビルドした後、以下のシェルコマンドを実行し、dSYM を Datadog にアップロードします。

```sh
export DATADOG_API_KEY="<API KEY>"

npx @datadog/datadog-ci dsyms upload ./build/ios/archive/Runner.xcarchive/dSYMs
```

EU エンドポイントを使用するツールを構成するには、`DATADOG_SITE` 環境変数を `datadoghq.eu` に設定します。インテークエンドポイントに完全な URL を上書きするには、`DATADOG_DSYM_INTAKE_URL` 環境変数を定義します。

## Android ProGuard のマッピングファイルを Datadog に手動でアップロードする

Android ビルドで `--obfuscate` パラメーターを使用していて、トレースの難読化を解除したい場合、ProGuard マッピングファイルを Datadog にアップロードする必要があります。[Datadog Android SDK Gradle プラグイン][5]は、マッピングファイルを Datadog に直接アップロードすることをサポートしています。

以下の行を `./android/app/build.gradle` ファイルに追加することで、プラグインを構成することができます。

```
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}
```

さらに、アップロードの構成が必要な場合は、`./android/app/build.gradle` ファイルの末尾に以下を追加してください。

```
datadog {
    // versionName はオプションです。デフォルトでは、Android プラグイン構成のバージョン名から読み込まれ、
    // ビルド時に pubspec.yaml で設定されます
    versionName = "1.3.0" 
    serviceName = "my-service" // オプション。デフォルトでは、Android プラグイン構成のパッケージ名から読み込まれます
    site = "US" // オプション。"US"、"EU"、"GOV" のいずれかを選択できます。デフォルトは "US" です
}
```

`flutter build apk` または `flutter build appbundle` で Flutter アプリケーションをビルドした後、以下のシェルコマンドを使用してマッピングファイルを Datadog にアップロードしてください。

```sh
export DD_API_KEY="<API KEY>"

cd android
./gradlew uploadMappingRelease
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/dd-sdk-android-gradle-plugin