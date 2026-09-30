---
aliases:
- /ja/real_user_monitoring/error_tracking/flutter
code_lang: flutter
code_lang_weight: 40
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/error_tracking.md
description: Error Tracking を使用して Flutter のエラーを追跡する方法を学びます。
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソース コード
  text: dd-sdk-flutter のソース コード
- link: real_user_monitoring/error_tracking/
  tag: ドキュメント
  text: Error Tracking について学ぶ
title: Flutter の Crash Reporting と Error Tracking
type: multi-code-lang
---
## 概要

Real User Monitoring と併用して Crash Reporting と Error Tracking を有効化すると、包括的なクラッシュ レポートとエラーのトレンドを取得できます。

クラッシュ レポートは [**Error Tracking**][1] に表示されます。

## セットアップ

まだ Datadog Flutter SDK をセットアップしていない場合は、 [アプリ内セットアップ手順][2] に従うか、 [Flutter セットアップ ドキュメント][3] を参照してください。

### Dart エラー トラッキングを追加

`DatadogSdk.runApp` を使用している場合、 Datadog Flutter SDK はキャッチされない Dart 例外を自動的に追跡してレポートします。

`DatadogSdk.runApp` を使用して **いない** 場合は、 Datadog を初期化する前に、次のコードで Dart エラー トラッキングを手動で設定する必要があります:

```dart
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
```

### ネイティブ クラッシュ レポートを追加

iOS と Android 向けにネイティブ クラッシュ レポートを有効化するには、初期化スニペットを更新し、`nativeCrashReportEnabled` を `true` に設定します。

例:

```dart
final configuration = DatadogConfiguration(
  clientToken: '<DD_CLIENT_TOKEN>'
  env: '<DD_ENV>'
  site: DatadogSite.us1,
  nativeCrashReportEnabled: true, // Set this flag
  loggingConfiguration: DatadogLoggingConfiguration(),
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<DD_APP_ID>',
  ),
);
```

アプリケーションが致命的なクラッシュを起こした場合、Datadog Flutter SDK はアプリの再起動後にクラッシュ レポートを Datadog にアップロードします。致命的でないエラーについては、Datadog Flutter SDK は他の RUM データとともにこれらのエラーをアップロードします。

## 難読化解除済みのスタック トレースを取得

マッピング ファイルはスタック トレースの難読化解除に使用され、エラーのデバッグに役立ちます。生成される一意のビルド ID を用いて、Datadog は対応するマッピング ファイルと正しいスタック トレースを自動的に照合します。これにより、マッピング ファイルがいつアップロードされたか (プレプロダクションまたはプロダクション ビルド中) に関係なく、Datadog に報告されたクラッシュやエラーをレビューする際に、効率的な QA プロセスのための正しい情報が利用可能になります。

Flutter アプリケーションでは、スタック トレースとソース マップの対応付けは、それらの `service`、`version`、`variant`、`architecture` フィールドに依存します。

### シンボル ファイルを Datadog にアップロード

ネイティブ iOS のクラッシュ レポートは生の形式で収集され、主にメモリ アドレスを含みます。これらのアドレスを可読なシンボル情報にマッピングするには、アプリケーションのビルド プロセスで生成される .dSYM ファイルを Datadog にアップロードする必要があります。

`--split-debug-info` オプションや `--obfuscate` オプションを設定してビルドされた Flutter の iOS および Android アプリケーションから送信されるクラッシュ レポートおよびエラーも、生または難読化された形式になります。これらのアプリケーションでは、Flutter のビルド プロセスで生成される Android Proguard マッピング ファイルと Dart シンボル ファイルをアップロードする必要があります。

Flutter Web アプリケーションから送信されるエラーは、マッピングされていない JavaScript のファイルと行番号を含みます。これらは Dart のファイルと行番号にマッピングする必要があります。このようなアプリケーションでは、Flutter のビルド プロセスで生成された JavaScript ソース マップをアップロードする必要があります。

[@datadog/datadog-ci][4] コマンド ライン ツールは、必要なファイル (dSYM、Android Proguard マッピング、Dart シンボル ファイル) を 1 回のコマンドでアップロードすることをサポートします。

まず、上記の手順に従って `datadog-ci` ツールをインストールし、プロジェクトのルートに `datadog-ci.json` ファイルを作成して、API キーと (任意で) Datadog サイトを含めます:
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // datadoghq.com を使用している場合はオプション
}
```

このファイルには API キーが含まれるため、バージョン管理にコミットしないでください。 

または、`DATADOG_API_KEY` と `DATADOG_SITE` の環境変数を設定することもできます。

次に、クラッシュ レポートのシンボリケーションと難読化解除に必要なすべてのファイルを、次のコマンドでアップロードできます:
```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms
```

**注**: バージョンが変更されていない場合、ソース マップを再アップロードしても既存のものは上書きされません。 

利用可能なオプションの全一覧については、`datadog-ci` の [Flutter Symbols ドキュメント][5] を参照してください。

### アップロード済みのシンボル ファイルを一覧表示

すべてのアップロード済みシンボルを表示するには、[RUM Debug Symbols][10] ページを参照してください。

## 制限事項

マッピング ファイルは、それぞれのサイズが **500 MB** に制限されています。一方、dSYM ファイルは各 **2 GB** まで対応できます。

## 実装をテストする

Flutter の Crash Reporting と Error Tracking 設定を検証するには、アプリケーションで意図的にエラーを発生させ、Datadog にエラーが表示されることを確認します。

1. アプリケーションをシミュレーター、エミュレーター、または実機で実行します。iOS で実行している場合は、デバッガがアタッチされていないことを確認してください。そうでないと、Datadog SDK より先に Xcode がクラッシュを捕捉します。
2. エラーやクラッシュを含むコードを実行します。例えば:

   ```dart
   void throwError() {
    throw Exception("My Exception")
   }
   ```

3. クラッシュに至らない難読化済みのエラー レポートについては、 [**Error Tracking**][8] でシンボリケーションと難読化解除を確認できます。
4. クラッシュの場合は、クラッシュ発生後にアプリケーションを再起動し、Flutter SDK が [**Error Tracking**][8] にクラッシュ レポートをアップロードするまで待ちます。

### フレーバーとビルド番号

Datadog は `service-name`、`version`、`flavor` の組み合わせを使用して、難読化解除に必要な正しいシンボルを特定します。クラッシュ レポートに完全な情報を含めるには、`datadog-ci` コマンドに渡すパラメーターと、 [DatadogConfiguration][6] で設定するパラメーターが厳密に一致している必要があります。

Flutter でアプリの [フレーバー][7] を使用している場合は、 [DatadogConfiguration.flavor][8] でフレーバー名を設定する必要があります。フレーバーは自動検出できないためです。その後、 `datadog-ci` コマンドの `--flavor` パラメーターにこれを渡します:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --flavor my_flavor
```

Datadog SDK は、 `pubspec.yaml` に指定されたアプリケーションのバージョン番号を、ビルド番号を含まない範囲まで自動的に検出します。アプリケーションでバージョンにビルド番号を含めており、ビルドごとにシンボルをアップロードする必要がある場合は、 [DatadogConfiguration.version][9] にそのバージョンを追加してください。その後、 `datadog-ci` コマンドの `--version` パラメーターにこれを渡します:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --version 1.2.3+22
```

**注**: Datadog はバージョンのタグ付けに `+` を使用できません。すべてのツールは、Datadog でバージョン タグを検索可能にするために `+` を `-` に自動置換します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[7]: https://docs.flutter.dev/deployment/flavors
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html
[10]: https://app.datadoghq.com/source-code/setup/rum