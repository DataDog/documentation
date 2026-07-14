---
aliases:
- /ja/real_user_monitoring/ios
- /ja/real_user_monitoring/ios/getting_started
- /ja/real_user_monitoring/ios/swiftui/
- /ja/real_user_monitoring/swiftui/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/swiftui/
beta: true
code_lang: ios
code_lang_weight: 20
description: iOS と tvOS アプリケーションから RUM または Error Tracking のデータを収集します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
  tag: ドキュメント
  text: RUM iOS の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-ios
  tag: ソースコード
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM データの調査方法
- link: /real_user_monitoring/error_tracking/ios/
  tag: ドキュメント
  text: iOS のエラーの追跡方法について
- link: /real_user_monitoring/ios/swiftui/
  tag: ドキュメント
  text: SwiftUI アプリケーションのインスツルメンテーションについて
- link: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
  tag: ドキュメント
  text: RUM iOS および tvOS のモニタリングのサポート対象バージョン
title: iOS と tvOS のモニタリング セットアップ
type: multi-code-lang
---

## 概要

このページでは、iOS SDK を使用して、[リアル ユーザー モニタリング (RUM)][1] と [Error Tracking][2] の両方に向けてアプリケーションをインスツルメント化する方法を説明します。RUM (Error Tracking を含む) または単体製品として Error Tracking を購入している場合は、以下の手順に従ってアプリケーションをインスツルメント化できます。

## セットアップ

1. SDK を依存関係として宣言します。
2. UI でアプリケーションの詳細を指定します。
3. ライブラリを初期化します。
4. データの送信を開始するには、Datadog Monitor を初期化し、`URLSessionInstrumentation` を有効にします。

### SDK を依存関係として宣言

Declare the library as a dependency depending on your package manager. Swift Package Manager (SPM) is recommended.

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。
```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して、`dd-sdk-ios` をインストールできます。
```
pod 'DatadogCore'
pod 'DatadogRUM'
```


[1]: https://cocoapods.org/
{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][1] を使用して、`dd-sdk-ios` をインストールできます。
```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

### UI でアプリケーションの詳細を指定

{{< tabs >}}
{{% tab "RUM" %}}

1. [**Digital Experience** > **Add an Application**][1] に移動します。
2. アプリケーションタイプとして `iOS` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. Web ビューをインスツルメントするには、**Instrument your webviews** トグルをクリックします。詳しくは、[Web ビュー追跡][2]を参照してください。
4. クライアント IP やジオロケーション データに関する自動ユーザー データ収集を無効にするには、該当する設定のトグルを使用します。詳細は [RUM iOS で収集されるデータ][3] を参照してください。

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Datadog で iOS 用 RUM アプリケーションを作成する" style="width:100%;border:none" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/ios/web_view_tracking/
[3]: /ja/real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1] に移動します。
2. アプリケーションタイプとして `iOS` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. Web ビューをインスツルメントするには、**Instrument your webviews** トグルをクリックします。詳しくは、[Web ビュー追跡][2]を参照してください。
4. クライアント IP やジオロケーション データに関する自動ユーザー データ収集を無効にするには、該当する設定のトグルを使用します。詳細は [iOS で収集されるデータ][3] を参照してください。

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Datadog で iOS 用アプリケーションを作成" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ja/real_user_monitoring/ios/web_view_tracking/
[3]: /ja/real_user_monitoring/ios/data_collected/

{{% /tab %}}
{{< /tabs >}}

データの安全性を確保するために、クライアント トークンを必ず使用してください。`dd-sdk-ios` ライブラリの構成に [Datadog API キー][3] のみを使用した場合、iOS アプリケーションのバイト コード内でクライアント サイドに露出します。

クライアント トークンの設定についての詳細は、[クライアント トークンのドキュメント][4] を参照してください。

### ライブラリの初期化

初期化スニペットでは、環境名、サービス名、バージョン番号を設定します。以下の例では、`app-name` はデータを生成するアプリケーションのバリアントを指定します。

詳細は [タグの使用][5] を参照してください。

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
@import DatadogObjc;

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
@import DatadogObjc;

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
@import DatadogObjc;

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
@import DatadogObjc;

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
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

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
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

iOS SDK は、SDK の初期化時に指定したオプションに応じてユーザー セッションを自動的にトラッキングします。EU ユーザー向けの GDPR 準拠やその他の [初期化パラメーター][6] を SDK 構成に追加するには、[トラッキング同意の設定に関するドキュメント](#set-tracking-consent-gdpr-compliance) を参照してください。

### RUM セッションのサンプリング

<div class="alert alert-danger">セッションのサンプルレートの設定はError Tracking には適用されません。</div>

アプリケーションが Datadog RUM に送信するデータを制御するには、[RUM iOS SDK の初期化][7] 時に RUM セッションのサンプリング レートを指定できます。レートは 0 から 100 の間のパーセンテージです。既定では、`sessionSamplingRate` は 100 (すべてのセッションを保持) に設定されています。

たとえば、セッションの使用の 50% のみを維持するには、

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

### トラッキングの同意を設定 (GDPR の遵守)

GDPR 規制を遵守するため、RUM iOS SDK は初期化時に追跡に関する同意を求めます。

`trackingConsent` 設定は以下のいずれかの値で示されます。

1. `.pending`: RUM iOS SDK はデータの収集とバッチ処理を開始しますが、Datadog へは送信しません。RUM iOS SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
2. `.granted`: RUM iOS SDK はデータの収集を開始し、Datadog へ送信します。
3. `.notGranted`: RUM iOS SDK は一切のデータを収集しません。Datadog にはログ、トレース、イベントは送信されません。

RUM iOS SDK の初期化後に追跡同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。RUM iOS SDK は、新しい値に応じて動作を変更します。

たとえば、現在の追跡同意が `.pending` の場合: 

- 値を `.granted` に変更すると、RUM iOS SDK は現在および今後のすべてのデータを Datadog に送信します。
- 値を `.notGranted` に変更すると、RUM iOS SDK は現在のすべてのデータを消去し、今後のデータを収集しません。

### Datadog Monitor を初期化し、`URLSessionInstrumentation` を有効にする

Datadog Monitor を構成して登録します。これは 1 回だけ、通常は `AppDelegate` のコード内で実行します:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking()
  )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.uiKitViewsPredicate = [DDDefaultUIKitRUMViewsPredicate new];
configuration.uiKitActionsPredicate = [DDDefaultUIKitRUMActionsPredicate new];
[configuration setURLSessionTracking:[DDRUMURLSessionTracking new]];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{% /tabs %}}

`URLSession` インスタンスから送信されるリクエストをリソースとして監視するには、デリゲート タイプに対して `URLSessionInstrumentation` を有効にし、`URLSession` にデリゲート インスタンスを渡します:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}


### ビューをインスツルメントする

Datadog iOS SDK は、`SwiftUI` アプリケーションのビューをインスツルメント化できます。このインスツルメント化は、`UIKit` と `SwiftUI` のハイブリッド アプリケーションでも機能します。

`SwiftUI.View` をインスツルメントするためには、以下のメソッドをビュー宣言に追加します。

```swift
import SwiftUI
import DatadogRUM

struct FooView: View {

    var body: some View {
        FooContent {
            ...
        }
        .trackRUMView(name: "Foo")
    }
}
```

`trackRUMView(name:)` メソッドは、`SwiftUI` のビューが画面に表示される時と消える時にビューを開始および停止します。

### タップアクションをインスツルメントする

Datadog iOS SDK は、`SwiftUI` アプリケーションのタップ アクションをインスツルメント化できます。このインスツルメント化は、`UIKit` と `SwiftUI` のハイブリッド アプリケーションでも機能します。

`SwiftUI.View` のタップアクションをインスツルメントするためには、以下のメソッドをビュー宣言に追加します。

```swift
import SwiftUI
import DatadogRUM

struct BarView: View {

    var body: some View {
        Button("BarButton") { {
            ...
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## バックグラウンドイベントの追跡

<div class="alert alert-info"><p>バックグラウンドイベントを追跡すると、セッションが追加され、課金に影響を与える可能性があります。ご質問は、<a href="https://docs.datadoghq.com/help/">Datadog サポートまでお問い合わせ</a>ください。</p>
</div>

アプリケーションがバックグラウンドにあるとき (例えば、アクティブなビューがないとき)、クラッシュやネットワークリクエストなどのイベントを追跡することができます。

Datadog の構成で、初期化時に以下のスニペットを追加します。

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## iOS エラーの追跡

[iOS Crash Reporting と Error Tracking][7] は、アプリケーション内のあらゆる問題と最新のエラーを表示します。エラーの詳細や JSON を含む属性は [RUM Explorer][9] で表示できます。

## デバイスがオフラインの時のデータ送信

iOS SDK は、ユーザー デバイスがオフラインのときでもデータの可用性を確保します。ネットワークが弱いエリアやデバイスのバッテリーが少ない場合、すべてのイベントはまずローカル デバイスにバッチで保存されます。ネットワークが利用可能になり、かつ iOS SDK がエンド ユーザーの体験に影響を与えないよう十分なバッテリー レベルになったら、すぐに送信されます。アプリケーションがフォアグラウンドにある間にネットワークが利用できない場合や、データのアップロードが失敗した場合は、そのバッチは送信に成功するまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: iOS SDK が過剰なディスク容量を使用しないよう、ディスク上のデータは古くなりすぎた場合に自動的に破棄されます。

## サポートされるバージョン

iOS SDK と互換性のある OS バージョンおよびプラットフォームの一覧は、[サポート対象バージョン][10] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/error_tracking/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/account_management/api-app-keys/#client-tokens
[5]: /ja/getting_started/tagging/using_tags/#rum--session-replay
[6]: /ja/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[7]: https://github.com/DataDog/dd-sdk-ios
[8]: /ja/real_user_monitoring/error_tracking/ios/
[9]: /ja/real_user_monitoring/explorer/
[10]: /ja/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/