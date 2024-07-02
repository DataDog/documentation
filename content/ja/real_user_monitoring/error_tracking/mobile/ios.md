---
title: iOS Crash Reporting and Error Tracking
aliases:
- /real_user_monitoring/ios/crash_reporting/
- /real_user_monitoring/error_tracking/ios
type: multi-code-lang
code_lang: ios
code_lang_weight: 20
description: Set up Error Tracking for your iOS projects.
further_reading:
- link: "https://github.com/DataDog/dd-sdk-ios"
  tag: ソースコード
  text: Source code for dd-sdk-ios
- link: "https://datadoghq.com/blog/ios-crash-reporting-datadog/"
  tag: Blog
  text: Introducing iOS Crash Reporting and Error Tracking
- link: real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking

---
## 概要

iOS のクラッシュレポートとエラー追跡を有効にすると、リアルユーザーモニタリングで包括的なクラッシュレポートとエラートレンドを取得できます。この機能により、以下にアクセスが可能になります。

 - 集計済みの iOS クラッシュダッシュボードおよび属性
 - シンボル化された iOS クラッシュレポート
 - iOS エラー追跡とトレンド分析

スタックトレースを記号化するために、.dSYM ファイルを見つけて Datadog にアップロードしてください。その後、テストクラッシュを実行し、アプリケーションを再起動することによって、構成を確認します。

クラッシュレポートは [**Error Tracking**][1] に表示されます。

## セットアップ

If you have not set up the iOS SDK yet, follow the [in-app setup instructions][2] or see the [iOS RUM setup documentation][3].

### クラッシュレポートの追加

To enable Crash Reporting, make sure to also enable [RUM][3] and, or [Logs][4]. Then, add the package according to your dependency manager and update your initialize snippet.  

{{< tabs >}}
{{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して、`dd-sdk-ios` をインストールできます。
```
pod 'DatadogCrashReporting'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。
```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][1] を使用して、`dd-sdk-ios` をインストールできます。
```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。
```
DatadogCrashReporting.xcframework
CrashReporter.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

初期化スニペットを更新してクラッシュレポートを含めます。

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ), 
  trackingConsent: trackingConsent
)

CrashReporting.enable()
```

### Add app hang reporting

App hangs are an iOS-specific type of error that happens when the application is unresponsive for too long.

By default, app hangs reporting is **disabled**, but you can enable it and set your own threshold to monitor app hangs that last more than a specified duration by using the `appHangThreshold` initialization parameter. A customizable threshold allows you to find the right balance between fine-grained and noisy observability. See [Notes][5] for more guidance on what to set this value to.

App hangs are reported through the RUM iOS SDK (not through [Logs][4]).

When enabled, any main thread pause that is longer than the specified `appHangThreshold` is considered a "hang" in [**Error Tracking**][1]. There are two types of hangs:

- **Fatal app hang**: How a hang gets reported if it never gets recovered and the app is terminated. Fatal app hangs are marked as a "Crash" in Error Tracking.

  {{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang.png" alt="A fatal app hang in the Error Tracking page." style="width:60%;" >}}

- **Non-fatal app hang**: How a hang gets reported if the app recovers from a relatively short hang and continues running. Non-fatal app hangs do not have a "Crash" mark on them in Error Tracking.

  {{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang.png" alt="A non-fatal app hang in the Error Tracking page." style="width:60%;" >}}

#### Enable app hang monitoring

To enable app hang monitoring:

1. Update the initialization snippet with the `appHangThreshold` parameter:

   ```swift
   RUM.enable(
       with: RUM.Configuration(
           applicationID: "<rum application id>",
           appHangThreshold: 0.25
       )
   )
   ```

2. Set the `appHangThreshold` parameter to the minimal duration you want app hangs to be reported. For example, enter `0.25` to report hangs lasting at least 250 ms. See [Notes][5] for more guidance on what to set this value to.

   Make sure you follow the steps below to get [deobfuscated stack traces][6].

#### 注

- Apple only considers hangs lasting more than 250 ms in their hang rate metrics in Xcode Organizer. Datadog recommends starting with a similar value for the `appHangThreshold` (in other words, set it to `0.25`) and then lowering it or increasing it incrementally to find the right setup.

- To filter out most of the noisy hangs, we recommend settling on an `appHangThreshold` between 2 and 3 seconds.

- The minimum value the `appHangThreshold` option can be set to is `0.1` seconds (100 ms). However, setting the threshold to such small values may lead to an excessive reporting of hangs.

- The SDK implements a secondary thread for monitoring app hangs. To reduce CPU utilization, it tracks hangs with a tolerance of 2.5%, which means some hangs that last close to the `appHangThreshold` may not be reported.

#### Disable app hang monitoring

To disable app hang monitoring, update the initialization snippet and set the `appHangThreshold` parameter to `nil`.

## Get deobfuscated stack traces

Mapping files are used to deobfuscate stack traces, which helps in debugging errors. Using a unique build ID that gets generated, Datadog automatically matches the correct stack traces with the corresponding mapping files. This ensures that regardless of when the mapping file was uploaded (either during pre-production or production builds), the correct information is available for efficient QA processes when reviewing crashes and errors reported in Datadog.

For iOS applications, the matching of stack traces and symbol files relies on their `uuid` field.

### クラッシュレポートのシンボル化

Crash reports are collected in a raw format and mostly contain memory addresses. To map these addresses into legible symbol information, Datadog requires .`dSYM` files, which are generated in your application's build or distribution process.

### Find your .dSYM file

Every iOS application produces `.dSYM` files for each application module. These files minimize an application's binary size and enable faster download speed. Each application version contains a set of `.dSYM` files. 

お使いの環境によっては、App Store Connect から `.dSYM` ファイルをダウンロードするか、ローカルマシンで検索する必要があります。

| ビットコード有効 | 説明 |
|---|---|
| はい | `.dSYM` files are available after [App Store Connect][7] completes processing your application's build. |
| いいえ | Xcode は、アプリケーションのビルドの最後に、`.dSYM` ファイルを`$DWARF_DSYM_FOLDER_PATH` にエクスポートします。`DEBUG_INFORMATION_FORMAT` ビルド設定が、**DWARF with dSYM File** に設定されていることを確認します。デフォルトでは、Xcode プロジェクトは、Release プロジェクトの構成で、`DEBUG_INFORMATION_FORMAT` を **DWARF with dSYM File** にのみ設定します。 |

### Upload your .dSYM file

By uploading your `.dSYM` file to Datadog, you gain access to the file path and line number of each frame in an error's related stack trace.

アプリケーションがクラッシュし、アプリケーションを再起動すると、iOS SDK は Datadog にクラッシュレポートをアップロードします。

**注**: バージョンに変更がない場合、ソースマップを再アップロードしても既存のものはオーバーライドされません。

### Use Datadog CI to upload your .dSYM file

You can use the command line tool [@datadog/datadog-ci][8] to upload your `.dSYM` file:

```sh
export DATADOG_API_KEY="<API KEY>"

// dSYM ファイルを含む zip ファイルがある場合
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// dSYM ファイルを含むフォルダがある場合
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**注**: EU エンドポイントを使用するツールを構成するには、`DATADOG_SITE` 環境変数を `datadoghq.eu` に設定します。インテークエンドポイントに完全な URL を上書きするには、`DATADOG_DSYM_INTAKE_URL` 環境変数を定義します。

また、Fastlane や GitHub Actions をワークフローで使用している場合は、`datadog-ci` の代わりにこれらのインテグレーションを利用することができます。

### Use Fastlane plugin to upload your .dSYM file

The Fastlane plugin helps you upload `.dSYM` files to Datadog from your Fastlane configuration.

1. Add [`fastlane-plugin-datadog`][9] to your project.

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

For more information, see [`fastlane-plugin-datadog`][9].

### Use GitHub Actions to upload your .dSYM file

The [Datadog Upload dSYMs GitHub Action][10] allows you to upload your symbols in your GitHub Action jobs:

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

For more information, see [dSYMs commands][11].

## 制限

{{< site-region region="us,us3,us5,eu,gov" >}}
dSYM files are limited to **500** MB.
{{< /site-region >}}
{{< site-region region="ap1" >}}
dSYM files are limited to **500** MB.
{{< /site-region >}}

## Test your implementation

iOS のクラッシュレポートとエラー追跡の構成を確認するには、RUM アプリケーションでクラッシュを発生させ、Datadog にエラーが表示されることを確認します。

1. iOS シミュレーターまたは実機でアプリケーションを実行します。デバッガが接続されていないことを確認してください。そうしないと、iOS SDK が行う前に、Xcode がクラッシュをキャプチャします。
2. クラッシュを含むコードを実行します。

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. After the crash happens, restart your application and wait for the iOS SDK to upload the crash report in [**Error Tracking**][1].

**注:** RUM は iOS v14+ arm64 および arm64e アーキテクチャのシステムシンボルファイルのシンボル化に対応しています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /real_user_monitoring/ios
[4]: /logs/log_collection/ios
[5]: /real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#notes
[6]: /real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#get-deobfuscated-stack-traces
[7]: https://appstoreconnect.apple.com/
[8]: https://www.npmjs.com/package/@datadog/datadog-ci
[9]: https://github.com/DataDog/datadog-fastlane-plugin
[10]: https://github.com/marketplace/actions/datadog-upload-dsyms
[11]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md
