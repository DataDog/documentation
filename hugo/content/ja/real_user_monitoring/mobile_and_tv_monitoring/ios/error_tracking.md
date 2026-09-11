---
title: iOS Crash Reporting と Error Tracking
---

## 概要

iOS Crash Reporting と Error Tracking を有効にすると、包括的なクラッシュ レポートとエラーのトレンドを取得できます。この機能により、以下にアクセスできます:

 - 集約された iOS クラッシュ ダッシュボードと属性
 - シンボリケート済みの iOS クラッシュ レポート
 - iOS Error Tracking によるトレンド分析

スタック トレースをシンボリケートするには、`.dSYM` ファイルを見つけて Datadog にアップロードします。次に、テスト クラッシュを実行してアプリケーションを再起動し、構成を検証します。

クラッシュ レポートは [**Error Tracking**][1] に表示されます。

## セットアップ

iOS SDK をまだセットアップしていない場合は、[アプリ内セットアップ手順][2] に従うか、[iOS セットアップ ドキュメント][3] を参照してください。

### クラッシュ レポーティングを追加

Crash Reporting を有効にするには、使用している依存関係マネージャに応じてパッケージを追加し、初期化スニペットを更新します。

{{< tabs >}}
{{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して `dd-sdk-ios` をインストールできます:
```
pod 'DatadogCrashReporting'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に次を依存関係として追加します:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、次のライブラリをリンクします:
```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][1] を使用して `dd-sdk-ios` をインストールできます:
```
github "DataDog/dd-sdk-ios"
```

Xcode で、次のフレームワークをリンクします:
```
DatadogCrashReporting.xcframework
CrashReporter.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

初期化スニペットを更新して Crash Reporting を含める

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

### アプリ ハング レポーティングを追加

アプリ ハングは、アプリケーションが長時間応答しないときに発生する iOS 固有のエラー タイプです。

既定ではアプリ ハングのレポーティングは **無効** ですが、初期化パラメータ `appHangThreshold` を使用すると有効化でき、指定した時間を超えるアプリ ハングを監視するための独自のしきい値を設定できます。しきい値を調整できることで、きめ細かな観測性とノイズの多さのバランスを最適化できます。設定の詳細は [アプリ ハングのしきい値を構成する][5] を参照してください。

アプリ ハングは iOS SDK を通じてレポートされます ([Logs][4] ではありません)。

有効化すると、指定した `appHangThreshold` より長いメイン スレッドの一時停止は、[**Error Tracking**][1] で _ハング_ と見なされます。ハングには 2 種類あります:

- **致命的なアプリ ハング**: ハングから回復せず、アプリが終了された場合のレポート方法です。致命的なアプリ ハングには、Error Tracking と RUM Explorer で「Crash」のマークが付きます。

  {{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang.png" alt="Error パネルのサイドに表示された致命的なアプリ ハングの例。" style="width:60%;" >}}

- **非致命的なアプリ ハング**: 比較的短いハングからアプリが回復し、実行を継続した場合のレポート方法です。非致命的なアプリ ハングには、Error Tracking と RUM Explorer で「Crash」のマークは付きません。

  {{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang.png" alt="Error パネルのサイドに表示された非致命的なアプリ ハングの例。" style="width:60%;" >}}

#### アプリ ハング監視を有効化

アプリ ハング監視を有効にするには:

1. [Crash Reporting を有効化][19]

2. 初期化スニペットに `appHangThreshold` パラメータを追加して更新します:

   ```swift
   RUM.enable(
       with: RUM.Configuration(
           applicationID: "<application id>",
           appHangThreshold: 0.25
       )
   )
   ```

3. アプリ ハングをレポートしたい最小の継続時間に `appHangThreshold` を設定します。たとえば、少なくとも 250 ms のハングをレポートするには `0.25` を指定します。設定の考え方は [アプリ ハングのしきい値を構成する][5] を参照してください。

   必ず、以下の手順に従って [難読化解除済みのスタック トレース][6] を取得できるようにしてください。

#### アプリ ハングのしきい値を構成する

- Apple は Xcode Organizer のハング率メトリクスで 250 ms を超えるハングのみを対象とします。Datadog は、`appHangThreshold` の初期値として同様に `0.25` を設定し、その後、適切な設定が見つかるまで段階的に下げるまたは上げることを推奨します。

- ノイズとなるハングの大半をふるい落とすには、`appHangThreshold` を 2～3 秒に設定することをおすすめします。

- `appHangThreshold` に設定できる最小値は `0.1` 秒 (100 ms) です。ただし、しきい値を極端に小さくすると、ハングの過剰なレポートにつながる可能性があります。

- SDK はアプリ ハングを監視するためのセカンダリ スレッドを実装しています。CPU 使用率を抑えるため、2.5% の許容誤差でハングを追跡します。そのため、`appHangThreshold` に近い長さの一部のハングはレポートされない場合があります。


#### アプリ ハング監視を無効化

アプリ ハング監視を無効にするには、初期化スニペットを更新し、パラメータ `appHangThreshold` を `nil` に設定します。

### ウォッチドッグ ターミネーションのレポーティングを追加

Apple エコシステムでは、オペレーティング システムがウォッチドッグ メカニズムを用いてアプリケーションの健全性を監視し、応答しなくなったり、CPU やメモリなどのリソースを過剰に消費した場合に終了させます。これらのウォッチドッグ ターミネーションは致命的で、復旧できません (詳細は公式の [Apple ドキュメント][12] を参照)。

既定ではウォッチドッグ ターミネーションのレポーティングは **無効** ですが、初期化パラメータ `trackWatchdogTerminations` を使用して有効化できます。

有効化すると、次回のアプリケーション起動時に、ヒューリスティックに基づいて前回のユーザー セッションにウォッチドッグ ターミネーションがレポートされ、紐付けられます:

- その間にアプリケーションがアップグレードされていないこと

- アプリが `exit` も `abort` も呼び出していないこと

- 例外、または致命的な [アプリ ハング][13] によるクラッシュではないこと

- ユーザーによって強制終了されていないこと

- デバイスが再起動していないこと (OS のアップグレードを含む)

{{< img src="real_user_monitoring/error_tracking/ios-watchdog-termination.png" alt="Error Tracking のサイド パネルに表示されたウォッチドッグ ターミネーションの例。" style="width:60%;" >}}

#### ウォッチドッグ ターミネーションのレポーティングを有効化

ウォッチドッグ ターミネーションのレポーティングを有効化するには:

1. [Crash Reporting を有効化][19]

2. 初期化スニペットを `trackWatchdogTerminations` フラグで更新します:

    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<application id>",
            trackWatchdogTerminations: true
        )
    )
    ```

#### ウォッチドッグ ターミネーションのレポーティングを無効化

ウォッチドッグ ターミネーションのレポーティングを無効化するには、初期化スニペットを更新し、パラメータ `trackWatchdogTerminations` を `false` に設定します。

## 難読化解除済みのスタック トレースを取得する

マッピング ファイルはスタック トレースの難読化を解除するために使用され、エラーのデバッグに役立ちます。生成される一意のビルド ID を使用して、Datadog は正しいスタック トレースを対応するマッピング ファイルに自動的に照合します。これにより、マッピング ファイルのアップロード時期がいつであっても (プレ プロダクション ビルドでもプロダクション ビルドでも)、Datadog にレポートされたクラッシュやエラーをレビューする際に、効率的な QA プロセスのための正しい情報を利用できます。

iOS アプリケーションでは、スタック トレースとシンボル ファイルの照合は、それぞれの `uuid` フィールドに基づいて行われます。

### クラッシュ レポートをシンボリケートする

クラッシュ レポートは生の形式で収集され、多くはメモリ アドレスを含みます。これらのアドレスを可読なシンボル情報にマップするために、Datadog では `dSYM` ファイルが必要です。`dSYM` ファイルはアプリケーションのビルドまたは配布プロセスで生成されます。

### .dSYM ファイルを見つける

すべての iOS アプリケーションは、各アプリケーション モジュールごとに `.dSYM` ファイルを生成します。これらのファイルはアプリケーションのバイナリ サイズを最小化し、ダウンロード 速度の向上に寄与します。各アプリケーション バージョンには `.dSYM` ファイル一式が含まれます。

セットアップによっては、`.dSYM` ファイルを App Store Connect からダウンロードするか、ローカル マシン上で見つける必要があります。

| Bitcode Enabled | 説明 |
|---|---|
| Yes | [App Store Connect][7] がアプリケーションのビルド処理を完了した後に、`.dSYM` ファイルが利用可能になります。 |
| No | Xcode は、アプリケーションのビルドの最後に `.dSYM` ファイルを `$DWARF_DSYM_FOLDER_PATH` に書き出します。ビルド設定 `DEBUG_INFORMATION_FORMAT` が **DWARF with dSYM File** に設定されていることを確認してください。既定では、Xcode プロジェクトは Release プロジェクト構成でのみ `DEBUG_INFORMATION_FORMAT` を **DWARF with dSYM File** に設定します。 |

### .dSYM ファイルをアップロードする

`.dSYM` ファイルを Datadog にアップロードすると、エラーに関連するスタック トレース内の各フレームのファイル パスと行番号にアクセスできます。

アプリケーションがクラッシュし、再起動されると、iOS SDK がクラッシュ レポートを Datadog にアップロードします。

**注**: バージョンが変更されていない場合、ソース マップを再アップロードしても既存のものは上書きされません。

### Datadog CI を使用して .dSYM ファイルをアップロードする

コマンド ライン ツール [@datadog/datadog-ci][8] を使用して、`.dSYM` ファイルをアップロードできます:

```sh
export DATADOG_API_KEY="<API KEY>"

// dSYM ファイルを含む zip ファイルがある場合
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// dSYM ファイルを含むフォルダがある場合
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**注**: ツールを EU エンドポイントで使用するには、環境変数 `DATADOG_SITE` を `datadoghq.eu` に設定します。インテーク エンドポイントの完全な URL を上書きするには、環境変数 `DATADOG_DSYM_INTAKE_URL` を定義します。

あるいは、ワークフローで Fastlane または GitHub Actions を使用している場合は、`datadog-ci` の代わりに、これらの連携を活用できます:

### Fastlane プラグインを使用して .dSYM ファイルをアップロードする

Fastlane プラグインは、Fastlane 構成から Datadog に `.dSYM` ファイルをアップロードするのに役立ちます。

1. [`fastlane-plugin-datadog`][9] をプロジェクトに追加します。

   ```sh
   fastlane add_plugin datadog
   ```

2. シンボルをアップロードするように Fastlane を構成します。

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

詳細は [`fastlane-plugin-datadog`][9] を参照してください。

### GitHub Actions を使用して .dSYM ファイルをアップロードする

[Datadog Upload dSYMs GitHub Action][10] を使用すると、GitHub Actions のジョブ内でシンボルをアップロードできます:

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

詳細は [dSYMs コマンド][11] を参照してください。

## 制限事項

各 dSYM ファイルのサイズ上限は **2 GB** です。

## 実装をテストする

iOS Crash Reporting と Error Tracking の構成を検証するには、アプリケーションでクラッシュを発生させ、Datadog にエラーが表示されることを確認します。

1. アプリケーションを iOS シミュレータまたは実機で実行します。デバッガがアタッチされていないことを確認します。そうしないと、 iOS SDK より前に Xcode がクラッシュを捕捉します。
2. クラッシュを含むコードを実行します:

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. クラッシュ後、アプリケーションを再起動し、 iOS SDK が [**Error Tracking**][1] にクラッシュ レポートをアップロードするのを待ちます。

**注**: Error Tracking は、iOS v14+ の arm64 および arm64e アーキテクチャ向けのシステム シンボル ファイルのシンボリケーションをサポートします。


[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /ja/real_user_monitoring/ios
[4]: /ja/logs/log_collection/ios
[5]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#configure-the-app-hang-threshold
[6]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#get-deobfuscated-stack-traces
[7]: https://appstoreconnect.apple.com/
[8]: https://www.npmjs.com/package/@datadog/datadog-ci
[9]: https://github.com/DataDog/datadog-fastlane-plugin
[10]: https://github.com/marketplace/actions/datadog-upload-dsyms
[11]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md
[12]: https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
[13]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#add-app-hang-reporting
[14]: /ja/real_user_monitoring/mobile_and_tv_monitoring/mobile_vitals?tab=ios#telemetry
[15]: https://developer.apple.com/documentation/xcode/analyzing-responsiveness-issues-in-your-shipping-app#View-your-apps-hang-rate
[16]: https://developer.apple.com/documentation/metrickit/mxhangdiagnostic
[17]: /ja/real_user_monitoring/explorer/search/#facets
[18]: /ja/dashboards/widgets/timeseries
[19]: /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#add-crash-reporting