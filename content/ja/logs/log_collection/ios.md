---
description: iOS アプリケーションからログを収集する。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: dd-sdk-ios ソースコード
- link: logs/explorer
  tag: ドキュメント
  text: ログの調査方法
title: iOS ログ収集
---
## 概要

[Datadog の `dd-sdk-ios` クライアント側ロギングライブラリ][1]を使用すると、iOS アプリケーションから Datadog へログを送信すると共に、次の機能を利用できます。

* Datadog に JSON 形式でネイティブに記録する。
* デフォルトを使用し、送信される各ログにカスタム属性を追加する。
* 実際のクライアント IP アドレスとユーザーエージェントを記録する。
* 自動一括ポストによって最適化されたネットワークの利用を活用します。

`dd-sdk-ios` ライブラリは、iOS 11 以降の全バージョンをサポートしています。

## セットアップ

1. パッケージマネージャーに応じてライブラリを依存関係として宣言します。

{{< tabs >}}
{{% tab "CocoaPods" %}}

[CocoaPods][6] を使用して、 `dd-sdk-ios`をインストールできます。
```
pod 'DatadogCore'
pod 'DatadogLogs'
```

[6]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Apple の Swift Package Manager を使用して統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

プロジェクトで、以下のライブラリをリンクします。
```
DatadogCore
DatadogLogs
```

{{% /tab %}}
{{% tab "Carthage" %}}

[Carthage][7] を使用して、 `dd-sdk-ios`をインストールできます。
```
github "DataDog/dd-sdk-ios"
```

Xcode で、以下のフレームワークをリンクします。
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogLogs.xcframework
```

[7]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. アプリケーションコンテキストと [Datadog クライアントトークン][2]でライブラリを初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の iOS アプリケーションの IPA バイトコードで公開されてしまうため、[Datadog API キー][3]を使用して `dd-sdk-ios` ライブラリを構成することはできません。

クライアントトークンのセットアップについて、詳しくは[クライアントトークンに関するドキュメント][2]を参照してください。

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .eu1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us3,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us5,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us1_fed,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .ap1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

GDPR 規定を遵守するため、SDK は初期化時に `trackingConsent` の値を求めます。
`trackingConsent` は以下のいずれかの値になります。

- `.pending`: - SDK はデータの収集とバッチ処理を開始しますが、Datadog へは送信しません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
- `.granted`: SDK はデータの収集を開始し、Datadog へ送信します。
- `.notGranted`: SDK はデータを収集しません。ログ、トレース、RUM イベントは Datadog に送信されません。 

SDK の初期化後に追跡同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。

SDK は新しい値に応じて動作を変更します。例えば、現在の追跡に関する同意が `.pending` であった場合:

- `.granted` に変更すると、SDK は現在および今後のすべてのデータを Datadog に送信します。
- `.notGranted` に変更すると、SDK は現在のデータをすべて消去し、今後のデータ収集を停止します。

データは Datadog にアップロードされる前に、[アプリケーションサンドボックス][6]のキャッシュディレクトリ (`Library/Caches`) に平文で保存されます。キャッシュディレクトリはデバイスにインストールされた他のアプリからは読み取ることができません。

アプリケーションを作成する際、開発ログを有効にし、提供されたレベルと同等以上の優先度を持つ SDK のすべての内部メッセージをコンソールにログ出力するようにしてください。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{% /tab %}}
{{< /tabs >}}

3. `Logger` の構成：

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let logger = Logger.create(
    with: Logger.Configuration(
        name: "<logger name>",
        networkInfoEnabled: true,
        remoteLogThreshold: .info,
        consoleLogFormat: .shortWith(prefix: "[iOS App] ")
    )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDLoggerConfiguration *configuration = [[DDLoggerConfiguration alloc] init];
configuration.networkInfoEnabled = YES;
configuration.remoteLogThreshold = [DDLogLevel info];
configuration.printLogsToConsole = YES;

DDLogger *logger = [DDLogger createWithConfiguration:configuration];
```
{{% /tab %}}
{{< /tabs >}}

4. 次のいずれかのメソッドで、カスタムログエントリを Datadog に直接送信します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.debug("A debug message.")
logger.info("Some relevant information?")
logger.notice("Have you noticed?")
logger.warn("An important warning...")
logger.error("An error was met!")
logger.critical("Something critical happened!")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger debug:@"A debug message."];
[logger info:@"Some relevant information?"];
[logger notice:@"Have you noticed?"];
[logger warn:@"An important warning..."];
[logger error:@"An error was met!"];
[logger critical:@"Something critical happened!"];
```
{{% /tab %}}
{{< /tabs >}}

**注:** 新規作成した RUM ビューにカスタム iOS ログを追加するには、`viewDidAppear` メソッドを使ってログを適用します。`viewDidAppear` が発生する前に `viewDidLoad` などでログを適用する場合、ログはその前の RUM ビューに適用され、厳密にはこれも依然としてアクティブなビューです。

5. (任意) ログメッセージと一緒に `attributes` のマップを提供し、発行されたログに属性を追加します。マップの各エントリーは属性として追加されます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.info("Clicked OK", attributes: ["context": "onboarding flow"])
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger info:@"Clicked OK" attributes:@{@"context": @"onboarding flow"}];
```
{{% /tab %}}
{{< /tabs >}}

## 高度なロギング

### 初期化

ログを Datadog に送信するようにロガーを初期化する際に、`Logger.Configuration` の次のメソッドを使用できます。

| メソッド | 説明 |
|---|---|
| `Logger.Configuration.networkInfoEnabled` | すべてのログに `network.client.*` 属性を追加します。デフォルトで記録されるデータには、`reachability` (`yes`、`no`、`maybe`)、`available_interfaces` (`wifi`、`cellular` など)、`sim_carrier.name` (例: `AT&T - US`)、`sim_carrier.technology` (`3G`、`LTE` など)、`sim_carrier.iso_country` (例: `US`)があります。 |
| `Logger.Configuration.service` | Datadog に送信されるすべてのログにアタッチされる `service` [標準属性][4]の値を設定します。 |
| `Logger.Configuration.consoleLogFormat` | デバッガコンソールにログを送信します。 |
| `Logger.Configuration.remoteSampleRate` | Datadog に送信するログのサンプルレートを設定します。 |
| `Logger.Configuration.name` | Datadog に送信されるすべてのログにアタッチされる `logger.name` 属性の値を設定します。 |

### グローバルコンフィギュレーション

以下の方法に従って、指定されたロガーによって送信されるすべてのログにタグと属性を追加または削除します。

#### グローバルタグ

##### タグを追加

`addTag(withKey:value:)` メソッドを使い、指定されたロガーから送信されるすべてのログにタグを追加します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// これにより、"build_configuration:debug" タグが追加されます
logger.addTag(withKey: "build_configuration", value: "debug")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addTagWithKey:@"build_configuration" value:@"debug"];
```
{{% /tab %}}
{{< /tabs >}}

`<TAG_VALUE>` は `String` である必要があります。

##### タグを削除

`removeTag(withKey:)` メソッドを使い、指定されたロガーから送信されるすべてのログからタグを削除します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// これにより "build_configuration" で始まるすべてのタグが削除されます
logger.removeTag(withKey: "build_configuration")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeTagWithKey:@"build_configuration"];
```
{{% /tab %}}
{{< /tabs >}}

詳しくは、[タグ入門][5]をご覧ください。

#### グローバル属性

##### 属性を追加

デフォルトで、ロガーにより送信されるすべてのログに次の属性が追加されます。

* `http.useragent` と抽出された `device` と `OS` プロパティ
* `network.client.ip` と抽出された地理的プロパティ (`country`, `city`)
* `logger.version`、Datadog SDK バージョン
* `logger.thread_name`, (`main`, `background`)
* `version`、`Info.plist` から抽出されたクライアントのアプリバージョン
* `environment`、SDK の初期化に使われる環境名

`addAttribute(forKey:value:)` メソッドを使い、指定されたロガーから送信されるすべてのログにカスタム属性を追加します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// これにより、文字列値を持つ "device-model" 属性が追加されます
logger.addAttribute(forKey: "device-model", value: UIDevice.current.model)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addAttributeForKey:@"device-model" value:UIDevice.currentDevice.model];
```
{{% /tab %}}
{{< /tabs >}}

`<ATTRIBUTE_VALUE>` には、`String`、`Date`、カスタム `Codable` データモデルなど、`Encodable` に準拠したものを指定することができます。

##### 属性を削除

`removeAttribute(forKey:)` メソッドを使い、指定されたロガーから送信されるすべてのログからカスタム属性を削除します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// これにより、"device-model" 属性は今後送信されるすべてのログから削除されます。
logger.removeAttribute(forKey: "device-model")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeAttributeForKey:@"device-model"];
```
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/logs/processing/attributes_naming_convention/
[5]: /ja/getting_started/tagging/
[6]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web