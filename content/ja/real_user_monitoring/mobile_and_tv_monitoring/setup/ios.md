---
title: RUM iOS and tvOS Monitoring Setup
kind: documentation
beta: true
description: "Collect RUM data from your iOS and tvOS applications."
aliases:
  - /real_user_monitoring/ios
  - /real_user_monitoring/ios/getting_started
  - /real_user_monitoring/ios/swiftui/
  - /real_user_monitoring/swiftui/
  - /real_user_monitoring/mobile_and_tv_monitoring/swiftui/
code_lang: ios
type: multi-code-lang
code_lang_weight: 20
further_reading:
 - link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
   tag: Documentation
   text: RUM iOS Advanced Configuration
 - link: "https://github.com/DataDog/dd-sdk-ios"
   tag: ソースコード
   text: Source code for dd-sdk-ios
 - link: /real_user_monitoring
   tag: Documentation
   text: Learn how to explore your RUM data
 - link: /real_user_monitoring/error_tracking/ios/
   tag: Documentation
   text: Learn how to track iOS errors
 - link: /real_user_monitoring/ios/swiftui/
   tag: Documentation
   text: Learn about instrumenting SwiftUI applications
 - link: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
   tag: ドキュメント
   text: RUM iOS and tvOS monitoring supported versions
---

## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## セットアップ

1. SDK を依存関係として宣言します。
2. UI でアプリケーションの詳細を指定します。
3. ライブラリを初期化します。
4. RUM モニター、`DatadogURLSessionDelegate` を初期化してデータ送信を開始します。

**注:** Datadog iOS SDK に対応するバージョンは iOS v11 以降です。Datadog iOS SDK は、tvOS にも対応しています。

### SDK を依存関係として宣言

パッケージマネージャーに応じてライブラリを依存関係として宣言します。

{{< tabs >}}
{{% tab "CocoaPods" %}}

[CocoaPods][1] を使用して、`dd-sdk-ios` をインストールできます。
```
pod 'DatadogCore'
pod 'DatadogRUM'
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
DatadogCore
DatadogRUM
```

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

1. Navigate to [**Digital Experience** > **Add an Application**][8].
2. アプリケーションタイプとして `iOS` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。
3. To instrument your web views, click the **Instrument your webviews** toggle. For more information, see [Web View Tracking][9].
4. To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings. For more information, see [RUM iOS Data Collected][10].

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Datadog で iOS 用 RUM アプリケーションを作成する" style="width:100%;border:none" >}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][11] to configure the `dd-sdk-ios` library, they would be exposed client-side in the iOS application's byte code.

For more information about setting up a client token, see the [Client token documentation][12].

### ライブラリの初期化

初期化スニペットでは、環境名、サービス名、バージョン番号を設定します。以下の例では、`app-name` がデータを生成するアプリケーションのバリアントを指定します。

For more information, see [Using Tags][13].

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

The RUM iOS SDK automatically tracks user sessions depending on options provided at the SDK initialization. To add GDPR compliance for your EU users and other [initialization parameters][14] to the SDK configuration, see the [Set tracking consent documentation][15].

### RUM モニターを初期化し、`URLSessionInstrumentation` を有効にします

RUM Monitor を構成して登録します。通常は `AppDelegate` コードで、一度だけ実行する必要があります。

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

リソースとして `URLSession` インスタンスから送られてくるリクエストを監視するには、デリゲートタイプの `URLSessionInstrumentation` を有効にして、デリゲートインスタンスを `URLSession` に渡します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: SessionDelegate.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[SessionDelegate class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[SessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

### RUM セッションのサンプリング

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM iOS SDK][16] as a percentage between 0 and 100.

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

### ビューをインスツルメントする

The Datadog iOS SDK for RUM allows you to instrument views of `SwiftUI` applications. The instrumentation also works with hybrid `UIKit` and `SwiftUI` applications. 

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

`trackRUMView(name:)` メソッドは、`SwiftUI` ビューがスクリーンから現れたり消えたりしたときに、RUM ビューを開始したり停止したりします。

### タップアクションをインスツルメントする

The Datadog iOS SDK for RUM allows you to instrument tap actions of `SwiftUI` applications. The instrumentation also works with hybrid `UIKit` and `SwiftUI` applications. 

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

[iOS Crash Reporting and Error Tracking][17] displays any issues in your application and the latest available errors. You can view error details and attributes including JSON in the [RUM Explorer][18].

## サポートされるバージョン

See [Supported versions][19] for a list operating system versions and platforms that are compatible with the RUM iOS SDK.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/microsoft/plcrashreporter/issues/288
[2]: https://developer.apple.com/xcode/
[3]: https://developer.apple.com/news/?id=jd9wcyov
[4]: /logs/log_collection/ios/?tab=swiftpackagemanagerspm
[5]: /logs/log_collection/ios/?tab=carthage
[6]: https://github.com/DataDog/dd-sdk-ios/tree/develop/DatadogExtensions/Alamofire
[7]: https://github.com/microsoft/plcrashreporter
[8]: https://app.datadoghq.com/rum/application/create
[9]: /real_user_monitoring/ios/web_view_tracking/
[10]: /real_user_monitoring/ios/data_collected/
[11]: /account_management/api-app-keys/#api-keys
[12]: /account_management/api-app-keys/#client-tokens
[13]: /getting_started/tagging/using_tags/#rum--session-replay
[14]: /real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[15]: /real_user_monitoring/ios/advanced_configuration/#set-tracking-consent-gdpr-compliance
[16]: https://github.com/DataDog/dd-sdk-ios
[17]: /real_user_monitoring/error_tracking/ios/
[18]: /real_user_monitoring/explorer/
[19]: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
