---
code_lang: ios
code_lang_weight: 20
description: iOS アプリケーションの包括的なクラッシュレポートと Error Tracking を有効にして、詳細なレポートで問題を監視および解決します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-watchos-visionos-datadog-rum/
  tag: ブログ
  text: Datadog RUM を用いて watchOS および visionOS アプリを監視します。
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
title: iOS Crash Reporting と Error Tracking
type: multi-code-lang
---
## 概要{#overview}

iOS Crash Reporting と Error Tracking を有効にすると、包括的なクラッシュレポートとエラーのトレンドを取得できます。この機能により、以下にアクセスできます。

 - 集計済みの iOS クラッシュダッシュボードおよび属性
 - シンボル化された iOS クラッシュレポート
 - iOS Error Tracking によるトレンド分析

スタックトレースをシンボル化するには、`.dSYM` ファイルを見つけて Datadog にアップロードします。次に、テストクラッシュを実行してアプリケーションを再起動し、構成を確認します。

クラッシュレポートは [{{< ui >}}Error Tracking{{< /ui >}}][1] に表示されます。

## 互換性{#compatibility}

iOS SDK と互換性のあるオペレーティングシステムのバージョンとプラットフォームのリストについては、[サポートされているバージョン][15] を参照してください。

## セットアップ {#setup}

iOS または tvOS アプリケーションから Datadog に Error Tracking データの送信を開始するには、次のようにします。

### ステップ 1 - iOS SDK を依存関係として宣言する {#step-1-declare-the-ios-sdk-as-a-dependency}

パッケージマネージャーに応じて、iOS ライブラリを依存関係として宣言します。Datadog は Swift Package Manager (SPM) の使用を推奨しています。

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。

```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。

```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して `dd-sdk-ios` をインストールできます。

```
pod 'DatadogCore'
pod 'DatadogRUM'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][1] を使用して `dd-sdk-ios` をインストールできます。

```
github "DataDog/dd-sdk-ios"
```

**注**: Datadog は、ビルド済みの Carthage バイナリを提供していません。つまり、Carthage はソースから SDK をビルドします。
SDK をビルドして統合するには、以下を実行してください。

```
carthage bootstrap --use-xcframeworks --no-use-binaries
```

ビルド後、以下の XCFrameworks を Xcode プロジェクトに追加します (「フレームワーク、ライブラリ、および埋め込みコンテンツ」セクション)。

```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### ステップ 2 - UI でアプリケーションの詳細を指定する {#step-2-specify-application-details-in-the-ui}

1. [{{< ui >}}Error Tracking{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}][2] (設定) > [{{< ui >}}Browser and Mobile{{< /ui >}}] (ブラウザとモバイル) に移動します。
2. [{{< ui >}}New Application{{< /ui >}}] (新規アプリケーション) をクリックします。
3. アプリケーション名を入力し、アプリケーションタイプとして [{{< ui >}}iOS{{< /ui >}}] を選択します。
4. [{{< ui >}}Create Application{{< /ui >}}] (アプリケーションの作成) をクリックして、一意の Datadog アプリケーション ID とクライアントトークンを生成します。

### ステップ 3 - ライブラリの初期化 {#step-3-initialize-the-library}

#### 初期化スニペットの更新 {#update-the-initialization-snippet}

初期化スニペットでは、環境名とサービス名を設定します。

データの安全性を確保するため、クライアントトークンを使用する必要があります。`dd-sdk-ios` ライブラリの設定に [Datadog API キー][5] のみを使用した場合、それらは iOS アプリケーションのバイトコード内でクライアント側に公開されてしまいます。

クライアントトークンの設定方法については、[クライアントトークンのドキュメント][6] を参照してください。

SDK は、アプリのライフサイクルのできる限り早い段階、具体的には `AppDelegate` の `application(_:didFinishLaunchingWithOptions:)` コールバックで初期化する必要があります。こうすると、アプリの起動時間を含むすべての測定値が正しくキャプチャされます。SwiftUI で構築されたアプリの場合、`@UIApplicationDelegateAdaptor` を使用して `AppDelegate` にフックできます。

<div class="alert alert-warning">SDK を他の場所 (ビューの読み込み中など) で初期化すると、特にアプリ起動時のパフォーマンスで、テレメトリが不正確になったり欠落したりする可能性があります。</div>

詳しくは、[タグの使用方法][7] をご覧ください。

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .eu1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us3,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us5,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us1_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov2" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us2_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us2_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap2" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap2,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap2];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="uk1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .uk1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite uk1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

#### Web ビューのインスツルメント化 (オプション) {#instrument-your-webviews-optional}

お好きな依存関係マネージャーを使用して、DatadogWebViewTracking モジュールを追加します。

Web コンテンツ内のエラーやパフォーマンスの問題を追跡するには、WKWebView インスタンスの WebView Tracking を有効にします。こうすると、埋め込み Web ページ内で発生する JavaScript エラー、ネットワークリクエスト、およびユーザーインタラクションを監視でき、ハイブリッドアプリの Web コンポーネントを完全に可視化できます。

追跡するホストをドメインのリストを提供して指定します。指定されたホストからの Web コンテンツのみが監視され、Datadog に報告されます。

```swift
import DatadogWebViewTracking

let webview = WKWebView(...)

// start tracking webviews
WebViewTracking.enable(webView: webview, hosts: ["foo.bar"])

//stop tracking webviews (after the user stops navigating the web page)
WebViewTracking.disable(webView: webview)
```

詳細については、[Web ビュー追跡][3] を参照してください。

### ステップ 4 - クラッシュレポートの追加 {#step-4-add-crash-reporting}

クラッシュレポートは、Error Tracking が統合インターフェースで表示するエラーに加え、アプリが予期せず終了した際の致命的なクラッシュをキャプチャします。

クラッシュレポートを有効にするには、使用している依存関係マネージャーに応じてパッケージを追加し、初期化スニペットを更新します。

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。

```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。

```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して `dd-sdk-ios` をインストールできます。

```
pod 'DatadogCrashReporting'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][1] を使用して `dd-sdk-ios` をインストールできます。

```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。

```
DatadogCrashReporting.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

初期化スニペットを更新してクラッシュレポートを含めます。

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(...)

CrashReporting.enable()
```

### ステップ 5 - アプリハングレポートを追加 {#step-5-add-app-hang-reporting}

アプリハングは、iOS-特有のエラータイプで、長い時間アプリケーションが無反応になったときに起こります。アプリハングは iOS SDK を通じてレポートされます ([ログ][10] ではありません)。デフォルトでは、アプリハングレポートは **無効**になっていますが、これを有効にして独自のしきい値を設定することで、`appHangThreshold` 初期化パラメーターで指定した期間よりも長く続くアプリハングを監視することができます。有効にすると、指定した `appHangThreshold` よりも長いメインスレッドの停止は、[{{< ui >}}Error Tracking{{< /ui >}}][1] において「ハング」とみなされます。カスタマイズ可能なしきい値により、詳細な監視とノイズの多い監視の間の適切なバランスを見つけることができます。この値の設定に関する詳細については、[アプリハングのしきい値を設定する](#configure-app-hang-threshold)を参照してください。

ハングには 2 種類あります。

- **致命的なアプリハング**: ハングから回復せず、アプリが終了した場合のレポート方法。致命的なアプリハングは、Error Tracking および RUM エクスプローラーで「クラッシュ」としてマークされます。

  {{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang-1.png" alt="[Error] (エラー) サイドパネルに表示された致命的なアプリハング。" style="width:100%;" >}}

- **致命的ではないアプリハング**: アプリが比較的短いハングから回復し、実行を継続した場合のレポート方法。致命的ではないアプリハングには、Error Tracking および RUM エクスプローラーで「クラッシュ」のマークは付きません。

  {{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang-1.png" alt="[Error] サイドパネルに表示された致命的ではないアプリハング。" style="width:100%;" >}}

{{% collapse-content title="アプリハング監視の有効化" level="h4" expanded=false id="enable-app-hang-monitoring" %}}

アプリハングの監視を有効にするには、次のようにします。

1. [クラッシュレポートを有効にする](#step-4---add-crash-reporting)。

2. 初期化スニペットを更新し、`appHangThreshold` パラメーターにアプリハングをレポートする最小期間 (秒単位) を設定します。たとえば、250ms 以上のハングをレポートするには `0.25` を使用します。

   ```swift
   RUM.enable(
       with: RUM.Configuration(
           applicationID: "<application id>",
           appHangThreshold: 0.25
       )
   )
   ```

   この値の設定に関する詳細については、[アプリハングのしきい値を設定する](#configure-app-hang-threshold)を参照してください。

   以下の手順に従って[難読化解除されたスタックトレース](#step-6---get-deobfuscated-stack-traces)を取得してください。これにより、難解なメモリアドレスが読み取り可能な関数名と行番号に変換され、効率的なデバッグが可能になります。

{{% /collapse-content %}}

{{% collapse-content title="アプリハングしきい値の構成" level="h4" expanded=false id="configure-app-hang-threshold" %}}

監視のニーズに基づいて適切なしきい値を選択してください。

- **開発およびデバッグの場合は次のようにします。**
  - `appHangThreshold: 0.25` 秒 (250ms) から開始すれば、ほとんどのパフォーマンスの問題がキャッチされます
  - 段階的に調整 (増減) して、特定のニーズに最適な設定を見つけます
- **本番環境監視の場合は次のようにします。**
  - `appHangThreshold` を `2.0` ～ `3.0` 秒の間に設定して、ノイズとなるハングを除外し、重大なパフォーマンスの問題に集中します
  - これはユーザーエクスペリエンスの期待値と一致しており、2 秒未満のハングはユーザーにあまり意識されません

#### しきい値の制限 {#threshold-limits}
- 最小値: `0.1` 秒 (100ms) - ただし、しきい値をこれほど小さい値に設定すると、ハングが過剰に報告される可能性があります。
- 推奨範囲: `0.25` ～ `3.0` 秒
- SDK は CPU 使用率を削減するために 2.5% の許容誤差を使用します。つまり、継続時間が `appHangThreshold` に近い一部のハングは報告されない場合があります

##### 構成例 {#configuration-example}

```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        appHangThreshold: 2.0  // Report hangs lasting 2+ seconds
    )
)
```

{{% /collapse-content %}}

{{% collapse-content title="アプリハング監視の無効化" level="h4" expanded=false id="set-tracking-consent" %}}

アプリハング監視を無効にするには、初期化スニペットを更新し、`appHangThreshold` パラメーターを `nil` に設定します。

{{% /collapse-content %}}

### ステップ 6 - 難読化解除されたスタックトレースを取得する {#step-6-get-deobfuscated-stack-traces}

クラッシュレポートは未加工の形式で収集され、そのほとんどにはメモリアドレスが含まれています。これらのアドレスを読み取り可能なシンボル情報にマッピングする (シンボル化と呼ばれるプロセス) ために、Datadog は `.dSYM` ファイルを必要とします。これは、アプリケーションのビルドまたは配布プロセスで生成されます。

**注:** Error Tracking は、iOS v14+ arm64 および arm64e アーキテクチャ向けのシステムシンボルファイルのシンボル化をサポートします。`.dSYM` ファイルのサイズは、それぞれ **2GB** に制限されています。

エラーのデバッグを支援するため、Datadog は一意に生成されたビルド ID を使用してスタックトレースを難読化解除し、対応するマッピングファイルと照合します。このプロセスはマッピングファイルが本番環境前のビルドと本番環境ビルドのどちらでアップロードされたかに関係なく実行されるので、Datadog でクラッシュやエラーを確認する際の効率的な QA プロセスに必要な情報が確実に提供されます。

iOS アプリケーションの場合、スタックトレースとシンボルファイルの照合は、それらの `uuid` フィールドに依存します。

{{% collapse-content title=".dSYM ファイルを検索する" level="h4" expanded=false id="find-your-dsym-files" %}}

すべての iOS アプリケーションは、各アプリケーションモジュールに対して `.dSYM` ファイルを生成します。これらのファイルは、アプリケーションのバイナリサイズを最小化し、ダウンロード速度を高速化します。各アプリケーションバージョンには、一連の `.dSYM` ファイルが含まれています。

設定によっては、App Store Connect から `.dSYM` ファイルをダウンロードするか、ローカルマシンで検索する必要があります。

| Bitcode 有効 | 説明 |
|---|---|
| はい | `.dSYM` ファイルは、[App Store Connect][12] がアプリケーションのビルド処理を完了した後に利用可能になります。|
| いいえ | Xcode はアプリケーションのビルド終了時に `.dSYM` ファイルを `$DWARF_DSYM_FOLDER_PATH` にエクスポートします。`DEBUG_INFORMATION_FORMAT` ビルド設定が {{< ui >}}DWARF with dSYM File{{< /ui >}} に設定されていることを確認してください。デフォルトでは、Xcode プロジェクトは Release プロジェクト構成に対してのみ `DEBUG_INFORMATION_FORMAT` を {{< ui >}}DWARF with dSYM File{{< /ui >}} に設定します。|

{{% /collapse-content %}}

{{% collapse-content title=".dSYM ファイルをアップロードする" level="h4" expanded=false id="upload-your-dsym-files" %}}

Datadog に `.dSYM` ファイルをアップロードすることで、エラーの関連スタックトレースの各フレームのファイルパスと行番号にアクセスすることができるようになります。

アプリケーションがクラッシュし、アプリケーションを再起動すると、iOS SDK は Datadog にクラッシュレポートをアップロードします。

**注**: 同じアプリケーションバージョンの `.dSYM` ファイルを再アップロードしても、既存のファイルは上書きされません。

{{< tabs >}}
{{% tab "Datadog CI" %}}

コマンドラインツール [@datadog/datadog-ci][1] を使用して `.dSYM` ファイルをアップロードできます:

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**注**: EU エンドポイントを使用してツールを構成するには、`DATADOG_SITE` 環境変数を `datadoghq.eu` に設定します。取り込みエンドポイントの完全な URL を上書きするには、`DATADOG_DSYM_INTAKE_URL` 環境変数を定義します。

  たとえば、異なる Datadog サイト用に構成するには、次のようにします。

  ```sh
  # For EU endpoint
  export DATADOG_SITE="datadoghq.eu"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip

  # For custom intake URL
  export DATADOG_DSYM_INTAKE_URL="https://your-custom-endpoint.com"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip
  ```

[1]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{% tab "Fastlane" %}}

Fastlane プラグインを使用すると、Fastlane の構成から `.dSYM` ファイルを Datadog にアップロードできます。

1. プロジェクトに [`fastlane-plugin-datadog`][1] を追加します。

   ```sh
   fastlane add_plugin datadog
   ```

2. Fastlane を構成し、シンボルをアップロードします。

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

詳しくは、[`fastlane-plugin-datadog`][1] をご覧ください。

[1]: https://github.com/DataDog/datadog-fastlane-plugin

{{% /tab %}}
{{% tab "GitHub Actions" %}}

[Datadog Upload dSYMs GitHub Action][1] (Datadog dSYMs アップロード GitHub Action) を使用すると、GitHub Action ジョブでシンボルをアップロードできます。

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

詳しくは、[dSYMs コマンド][2] をご覧ください。

[1]: https://github.com/marketplace/actions/datadog-upload-dsyms
[2]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/dsyms/README.md

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## 実装をテストする {#test-your-implementation}

iOS Crash Reporting と Error Tracking の構成を検証するには、アプリケーションでクラッシュを発生させ、Datadog にエラーが表示されることを確認します。

1. iOS シミュレーターまたは実機でアプリケーションを実行します。デバッガーが接続されていないことを確認してください。接続されていると、iOS SDK よりも先に Xcode がクラッシュをキャプチャしてしまいます。
2. クラッシュを含むコードを実行します。

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. クラッシュが発生したら、アプリケーションを再起動し、iOS SDK が [{{< ui >}}Error Tracking{{< /ui >}}][1] にクラッシュレポートをアップロードするのを待ちます。

## Error Tracking の高度な機能 {#advanced-error-tracking-features}

{{% collapse-content title="トラッキングの同意を設定 (GDPR の遵守)" level="h3" expanded=false id="set-tracking-consent" %}}

GDPR 規制を遵守するため、iOS SDK は初期化時にトラッキング同意値を求めます。

`trackingConsent` 設定には、以下のいずれかの値を指定できます。

1. `.pending`: iOS SDK はデータの収集とバッチ処理を開始しますが、Datadog には送信しません。iOS SDK は、バッチ化されたデータの取り扱いを決定する新たなトラッキング同意値が得られるまで待機します。
2. `.granted`: iOS SDK はデータの収集を開始し、Datadog へ送信します。
3. `.notGranted`: iOS SDK はデータを収集せず、ログ、トレース、イベントを Datadog に送信しません。

iOS SDK の初期化後に**追跡同意値を変更する**には、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。iOS SDK は新しい値に応じて動作を変更します。

たとえば、現在のトラッキング同意が `.pending` の場合:

- 値を `.granted` に変更すると、iOS SDK は現在および今後のすべてのデータを Datadog に送信します。
- 値を `.notGranted` に変更すると、iOS SDK は現在のすべてのデータを消去し、今後データを収集しません。

{{% /collapse-content %}}

{{% collapse-content title="セッションのサンプリングレート" level="h3" expanded=false id="sample-session-rates" %}}

アプリケーションが Datadog に送信するデータを制御するために、[iOS SDK の初期化][14] 時にセッションのサンプリングレートを指定できます。レートは 0 から 100 までのパーセンテージです。デフォルトでは、`sessionSamplingRate` は 100 に設定されています (すべてのセッションを保持)。

たとえば、セッションの 50% のみを維持するには、次を使用します。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let configuration = RUM.Configuration(
    applicationID: "<application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="デバイスがオフラインの時のデータ送信" level="h3" expanded=false id="sending-data-device-offline" %}}

iOS SDK は、エンドユーザーのデバイスがオフラインのときでもデータが利用可能な状態を維持します。ネットワークが不安定な地域やデバイスのバッテリー残量が少ない場合、デバイスはまずすべてのイベントをバッチに保存します。ネットワークが利用可能になり、バッテリー残量が十分にあって確実に iOS SDK がユーザーエクスペリエンスに影響を与えないようになると、デバイスはすぐにデータを送信します。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータアップロードが失敗した場合、デバイスはアップロードが正常に完了するまでバッチを保持します。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: iOS SDK が過剰なディスク容量を使用しないよう、データが古くなりすぎた場合、デバイスはディスク上のデータを自動的に破棄します。

{{% /collapse-content %}}

{{% collapse-content title="Watchdog による終了のレポートの追加" level="h3" expanded=false id="add-watchdog-terminations-reporting" %}}

Apple エコシステムでは、オペレーティングシステムが Watchdog メカニズムを使用してアプリケーションの健全性を監視し、アプリケーションが応答しなくなった場合や CPU やメモリなどのリソースを過剰に消費した場合にアプリケーションを終了させます。これらの Watchdog による終了は致命的であり、回復できません (詳細は公式の [Apple ドキュメント][13] を参照してください)。

デフォルトでは、Watchdog による終了のレポートは**無効**になっていますが、`trackWatchdogTerminations` 初期化パラメーターを使用して有効にできます。

有効にすると、以下のすべての条件が満たされている場合、次回のアプリケーション起動時に、アプリは Watchdog による終了をレポートし、以前のユーザーセッションにアタッチします。

- その間にアプリケーションがアップグレードされていないこと、

- かつ、`exit` も `abort` も呼び出していないこと、

- かつ、例外や致命的な[アプリハング](#step-5---add-app-hang-reporting)が原因でクラッシュしていないこと、

- かつ、ユーザーによって強制終了されていないこと、

- かつ、デバイスが再起動 (オペレーティングシステムのアップグレードを含む) していないこと。

{{< img src="real_user_monitoring/error_tracking/ios-watchdog-termination-1.png" alt="[Error Tracking] サイドパネルの Watchdog による終了" style="width:100%;" >}}

#### Watchdog による終了のレポートを有効にする {#enable-watchdog-terminations-reporting}

Watchdog による終了のレポートを有効にするには、次のようにします。

1. [クラッシュレポートを有効にする](#step-4---add-crash-reporting)。

2. フラグ`trackWatchdogTerminations`を使用して初期化スニペットを更新します。

    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<application id>",
            trackWatchdogTerminations: true
        )
    )
    ```

#### Watchdog による終了のレポートを無効にする {#disable-watchdog-terminations-reporting}

Watchdog による終了のレポートを無効にするには、初期化スニペットを更新し、`trackWatchdogTerminations`パラメーターを`false`に設定します。

{{% /collapse-content %}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/error-tracking/settings/setup/client
[3]: /ja/real_user_monitoring/ios/web_view_tracking/
[4]: /ja/real_user_monitoring/ios/data_collected/
[5]: /ja/account_management/api-app-keys/#api-keys
[6]: /ja/account_management/api-app-keys/#client-tokens
[7]: /ja/getting_started/tagging/using_tags/#rum--session-replay
[8]: /ja/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[9]: /ja/real_user_monitoring/explorer/
[10]: /ja/logs/log_collection/ios
[12]: https://appstoreconnect.apple.com/
[13]: https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
[14]: https://github.com/DataDog/dd-sdk-ios
[15]: /ja/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/