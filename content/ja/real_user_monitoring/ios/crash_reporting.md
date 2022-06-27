---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/crash_reporting.md
further_reading:
- link: https://datadoghq.com/blog/ios-crash-reporting-datadog/
  tag: ブログ
  text: iOS のクラッシュレポートとエラー追跡のご紹介
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: iOS のクラッシュレポートとエラー追跡
---
## 概要

iOS のクラッシュとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

 - 集計済みの iOS クラッシュダッシュボードおよび属性
 - シンボル化された iOS クラッシュレポート
 - iOS エラー追跡とトレンド分析

スタックトレースを記号化するために、dSYM ファイルを見つけて Datadog にアップロードしてください。その後、テストクラッシュを実行し、アプリケーションを再起動することによって、構成を確認します。

クラッシュレポートは [**Error Tracking**][8] に表示されます。

## セットアップ

まだ iOS SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[iOS RUM セットアップドキュメント][2]を参照してください。

### クラッシュレポートの追加

依存関係マネージャーに従ってパッケージを追加し、初期化スニペットを更新します。

{{< tabs >}}
{{% tab "CocoaPods" %}}
`DatadogSDKCrashReporting` を `Podfile` に追加します。
```ruby
platform :ios, '11.0'
use_frameworks!

target 'App' do
  pod 'DatadogSDKCrashReporting'
end
```
{{% /tab %}}
{{% tab "Swift パッケージマネージャー" %}}
`https://github.com/DataDog/dd-sdk-ios` にパッケージを追加し、`DatadogCrashReporting` をアプリケーションターゲットにリンクします。

**注:** `Datadog` や `DatadogStatic` ライブラリにリンクする場合、代わりに `DatadogCrashReporting` にリンクしてください。

{{% /tab %}}
{{% tab "Carthage" %}}
`github "DataDog/dd-sdk-ios"` を `Cartfile` に追加し、 `DatadogCrashReporting.xcframework` をアプリケーションターゲットにリンクします。
{{% /tab %}}
{{< /tabs >}}

初期化スニペットを更新してクラッシュレポートを含めます。

```
import DatadogCrashReporting

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
    .builderUsing(
        rumApplicationID: "<rum_application_id>",
        clientToken: "<client_token>",
        environment: "<environment_name>"
    )
    .trackUIKitActions()
    .trackUIKitRUMViews()
    .enableCrashReporting(using: DDCrashReportingPlugin())
    .build()
)
Global.rum = RUMMonitor.initialize()
```

## クラッシュレポートのシンボル化

クラッシュレポートは生のフォーマットで収集され、そのほとんどがメモリアドレスを含んでいます。これらのアドレスを読みやすいシンボル情報にマッピングするために、Datadog は dSYM ファイルを必要とし、これはアプリケーションのビルドまたは配布プロセスで生成されます。

### dSYM ファイルを探す

すべての iOS アプリケーションは、アプリケーションモジュールごとに dSYM ファイルを生成しています。これらのファイルは、アプリケーションのバイナリサイズを最小化し、より高速なダウンロードを可能にします。各アプリケーションのバージョンは、dSYM ファイルのセットを含んでいます。

お使いの環境によっては、App Store Connect から dSYM ファイルをダウンロードするか、ローカルマシンで検索する必要があります。

| ビットコード有効 | 説明                                                                                                                                                                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 〇             | dSYM ファイルは、[App Store Connect][6] でアプリケーションのビルド処理が完了すると、利用可能になります。                                                                                                                                                                                                    |
| ✕              | Xcode は、アプリケーションのビルドの最後に、dSYM ファイルを`$DWARF_DSYM_FOLDER_PATH` にエクスポートします。`DEBUG_INFORMATION_FORMAT` ビルド設定が、**DWARF with dSYM File** に設定されていることを確認します。デフォルトでは、Xcode プロジェクトは、Release プロジェクトの構成で、`DEBUG_INFORMATION_FORMAT` を **DWARF with dSYM File** にのみ設定します。 |

### dSYM ファイルのアップロード

Datadog に dSYM ファイルをアップロードすることで、エラーの関連スタックトレースの各フレームのファイルパス、行番号、コードスニペットにアクセスすることができるようになります。

アプリケーションがクラッシュし、アプリケーションを再起動すると、iOS SDK は Datadog にクラッシュレポートをアップロードします。

#### Datadog CI

dSYM ファイルのアップロードには、コマンドラインツール [@datadog/datadog-ci][5] を使用することができます。

```sh
export DATADOG_API_KEY="<API KEY>"

// dSYM ファイルを含む zip ファイルがある場合
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// dSYM ファイルを含むフォルダがある場合
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**注**: EU エンドポイントを使用するツールを構成するには、`DATADOG_SITE` 環境変数を `datadoghq.eu` に設定します。インテークエンドポイントに完全な URL を上書きするには、`DATADOG_DSYM_INTAKE_URL` 環境変数を定義します。

また、Fastlane や GitHub Actions をワークフローで使用している場合は、`datadog-ci` の代わりにこれらのインテグレーションを利用することができます。

#### Fastlane Plugin

Datadogプラグインを使用すると、Fastlane の構成から Datadog に dSYM ファイルをアップロードすることができます。

1. プロジェクトに [`fastlane-plugin-datadog`][3] を追加します。

   ```sh
   fastlane add_plugin datadog
   ```

2. シンボルをアップロードするために Fastlane を構成します。

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

詳細は、[`fastlane-plugin-datadog`][3] を参照してください。

#### GitHub Action

[Datadog Upload dSYMs GitHub Action][4] は、GitHub Action のジョブでシンボルをアップロードできるようにするものです。

```yml
name: Upload dSYM Files

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Generate/Download dSYM Files
        uses: ./release.sh

      - name: Upload dSYMs to Datadog
        uses: DataDog/upload-dsyms-github-action@v1
        with:
          api_key: ${{ secrets.DATADOG_API_KEY }}
          site: datadoghq.com
          dsym_paths: |
            path/to/dsyms/folder
            path/to/zip/dsyms.zip
```

詳しくは、[dSYMs コマンド][7]をご覧ください。

## クラッシュレポートの検証

iOS のクラッシュレポートとエラー追跡の構成を確認するには、RUM アプリケーションでクラッシュを発生させ、Datadog にエラーが表示されることを確認します。

1. iOS シミュレーターまたは実機でアプリケーションを実行します。デバッガが接続されていないことを確認してください。そうしないと、iOS SDK が行う前に、Xcode がクラッシュをキャプチャします。
2. クラッシュを含むコードを実行します。

   ```swift
   func didTapButton() {
   fatalError(“Crash the app”)
   }
   ```

3. クラッシュが発生したら、アプリケーションを再起動し、iOS SDK が [**Error Tracking**][8] にクラッシュレポートをアップロードするのを待ちます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/ios
[3]: https://github.com/DataDog/datadog-fastlane-plugin
[4]: https://github.com/marketplace/actions/datadog-upload-dsyms
[5]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://appstoreconnect.apple.com/
[7]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md
[8]: https://app.datadoghq.com/rum/error-tracking