---
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

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

Datadog Flutter SDK for RUM をまだセットアップしていない場合は、[アプリ内セットアップ手順][2]に従うか、[Flutter セットアップドキュメント][3]を参照してください。

### ネイティブクラッシュレポートの追加

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

アプリケーションが致命的なクラッシュに見舞われた場合、アプリケーションが再起動すると、Datadog Flutter SDK は Datadog にクラッシュレポートをアップロードします。致命的でないエラーの場合、Datadog Flutter SDK はこれらのエラーを他の RUM データと共にアップロードします。


## Datadog へのシンボルファイルのアップロード

ネイティブ iOS クラッシュレポートは生のフォーマットで収集され、そのほとんどがメモリアドレスを含んでいます。これらのアドレスを読みやすいシンボル情報にマッピングするために、Datadog は .dSYM ファイルのアップロードを必要とし、これはアプリケーションのビルドプロセスで生成されます。

`--split-debug-info` オプションセットと `--obfuscate` オプションセットでビルドされたすべてのクラッシュレポートについて、その Android Proguard マッピングファイルと Flutter ビルドプロセスによって生成された Dart シンボルファイルをアップロードする必要があります。


コマンドラインツール [@datadog/datadog-ci][4] は、必要なファイル (dSYMs、Android Proguard Mapping、Dart Symbol Files) を 1 つのコマンドでアップロードすることに対応しています。

まず、上記の手順で `datadog-ci` ツールをインストールし、プロジェクトのルートに `datadog-ci.json` ファイルを作成し、API キーと (オプションで) Datadog サイトを記述します。
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // datadoghq.com を使用している場合はオプション
}
```

このファイルには API キーが含まれているため、バージョン管理にはチェックインしないでください。

代わりに、環境変数 `DATADOG_API_KEY` と `DATADOG_SITE` を設定することも可能です。

次に、以下のコマンドを使用して、クラッシュレポートのシンボル化および難読化解除に必要なすべてのファイルをアップロードすることができます。
```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms
```

オプションの完全なリストは、`datadog-ci` [Flutter Symbols のドキュメント][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/flutter/#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols