---
aliases:
- /ja/real_user_monitoring/ios/getting_started
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/_index.md
description: iOS および tvOS アプリケーションから RUM データを収集します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: dd-sdk-ios ソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM データの調査方法
kind: documentation
title: RUM iOS モニタリング
---
Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## セットアップ

1. SDK を依存関係として宣言します。
2. UI でアプリケーションの詳細を指定します。
3. ライブラリを初期化します。
4. RUM モニター、`DDURLSessionDelegate` を初期化してデータ送信を開始します。

**注:** Datadog iOS SDK に対応するバージョンは iOS v11 以降です。iOS SDK は、tvOS にも対応しています。

### SDK を依存関係として宣言

1. パッケージマネージャーに応じて [dd-sdk-ios][1] を依存関係として宣言します。


| パッケージマネージャー            | インストール方法                                                                         |
|----------------------------|---------------------------------------------------------------------------------------------|
| [CocoaPods][2]             | `pod 'DatadogSDK'`                                                                          |
| [Swift Package Manager][3] | `.package(url: "https://github.com/DataDog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))` |
| [Carthage][4]              | `github "DataDog/dd-sdk-ios"`                                                               |

### UI でアプリケーションの詳細を指定

1. **UX Monitoring** > **RUM Applications** で **New Application** をクリックします。
2. [Datadog UI][5] で、**Application Type** に `iOS` を選択し、新しいアプリケーション名を入力して一意の Datadog アプリケーション ID とクライアントトークンを生成します。

{{< img src="real_user_monitoring/ios/screenshot_rum.png" alt="RUM イベント階層" style="width:100%;border:none" >}}

データの安全性を確保するため、`dd-sdk-ios` ライブラリの構成に [Datadog API キー][6]を使用しないでください。その代わり、クライアントトークンを使用すると、iOS アプリケーションバイトコード内のクライアント側で API キーが公開されないようにできます。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][7]を参照してください。

### ライブラリの初期化

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us1)
        .trackUIKitRUMViews()
        .trackUIKitActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .eu1)
        .trackUIKitRUMViews()
        .trackUIKitActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint eu1]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us3)
        .trackUIKitRUMViews()
        .trackUIKitActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us3]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us5)
        .trackUIKitRUMViews()
        .trackUIKitActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us5]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    appContext: .init(),
    trackingConsent: trackingConsent,
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application_id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .us1_fed)
        .trackUIKitRUMViews()
        .trackUIKitActions()
        .trackURLSession()
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];
[builder setWithServiceName:@"app-name"];
[builder setWithEndpoint:[DDEndpoint us1_fed]];
[builder trackUIKitRUMViews];
[builder trackUIKitRUMActions];
[builder trackURLSessionWithFirstPartyHosts:[NSSet new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

RUM SDK は、SDK の初期化時に提供されたオプションに従いユーザーセッションを自動的に追跡します。EU ユーザーに対する GDPR コンプライアンスおよびその他の[初期化パラメーター][9]を SDK コンフィギュレーションに追加するには、[トラッキングに関する同意の設定ドキュメント][8]を参照してください。

### RUM モニターと `DDURLSessionDelegate` の初期化

RUM Monitor を構成して登録します。通常は `AppDelegate` コードで、一度だけ実行する必要があります。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import Datadog

Global.rum = RUMMonitor.initialize()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDGlobal.rum = [[DDRUMMonitor alloc] init];
```
{{% /tab %}}
{{< /tabs >}}

`URLSession` インスタンスからリソースとして送信されるリクエストを監視するには、`DDURLSessionDelegate()` をその `URLSession` の `delegate` として割り当てます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[DDNSURLSessionDelegate alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

## iOS のクラッシュレポートとエラー追跡

iOS のクラッシュレポートとエラー追跡では、問題と最新の利用可能なエラーが表示されます。エラーの詳細と JSON を含む属性を RUM エクスプローラーで表示できます。

<div class="alert alert-info"><p>クラッシュレポートとエラー追跡はベータ版で利用できます。サインアップするには、<a href="https://docs.datadoghq.com/real_user_monitoring/ios/crash_reporting">クラッシュレポート (ベータ版)</a> をご覧ください。</p>
</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/dd-sdk-ios
[2]: https://cocoapods.org/
[3]: https://swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage
[5]: https://app.datadoghq.com/rum/create
[6]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[8]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/advanced_configuration/#set-tracking-consent-gdpr-compliance
[9]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/advanced_configuration/#initialization-parameters