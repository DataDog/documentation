---
aliases:
- /ja/real_user_monitoring/ios/advanced_configuration
- /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
- /ja/real_user_monitoring/mobile_and_tv_monitoring/ios/advanced_configuration
description: ユーザーセッションの拡張、カスタムイベントの追跡、より良いインサイトの取得を目的としたデータ収集の制御のために iOS RUM SDK の高度な設定を構成します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Source Code
  text: ddsdkios のソースコード
- link: /real_user_monitoring
  tag: Documentation
  text: RUM およびセッションリプレイ
- link: /real_user_monitoring/application_monitoring/ios/supported_versions/
  tag: Documentation
  text: RUM iOS および tvOS モニタリングサポート対象バージョン
- link: https://github.com/DataDog/dd-sdk-ios-apollo-interceptor
  tag: Source Code
  text: Apollo iOS 用の Datadog インテグレーション
title: iOS の高度な構成
---
まだ RUM iOS SDK のセットアップを完了していない場合は、[アプリ内セットアップ手順][1] に従うか、[RUM iOS セットアップドキュメント][2] を参照してください。

##ユーザーセッションの拡張

iOS RUM は、ユーザーの活動、画面、エラー、ネットワークリクエストなどの属性を自動的に追跡します。RUM イベントとデフォルト属性については、[RUM データ収集ドキュメント][3] を参照してください。ユーザーセッション情報をさらに拡張し、カスタムイベントを追跡することで、収集される属性をより細かく制御できます。

###カスタムビュー

[ビューを自動追跡する](#automaticallytrackviews) ほか、`viewControllers` などの特定のビューが表示され、操作可能になった際に追跡することもできます。ビューが表示されなくなったときに追跡を停止するには、`RUMMonitor.shared()` 内の以下のメソッドを使用します。

 `.startView(viewController:)`
 `.stopView(viewController:)`

たとえば、以下のとおりです。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

// in your `UIViewController`:
let rum = RUMMonitor.shared()

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@import DatadogRUM;
// in your `UIViewController`:

DDRUMMonitor *rum = [DDRUMMonitor shared];

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [rum stopViewWithViewController:self attributes:nil];
}
```
{{% /tab %}}
{{< /tabs >}}

詳細および利用可能なオプションについては、[GitHub の `RUMMonitorProtocol` を参照してください][4]。

###カスタムアクション

[アクションを自動追跡する] (#automaticallytrackuseractions) ほか、`addAction(type:name:)` API を使用して、特定のカスタムユーザーアクション (タップ、クリック、スクロール) も追跡することができます。

`RUMMonitor.shared()` 上での `.tap` などの瞬間的な RUM アクションを手動で登録するには、`.addAction(type:name:)` を使用します。`.scroll` のような継続的な RUM アクションには、`.startAction(type:name:)` または `.stopAction(type:)` を使用します。

たとえば、以下のとおりです。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

// in your `UIViewController`:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? ""
    )
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**注意**: `.startAction(type:name:)` と `.stopAction(type:)` を使用する際には、アクションの `type` は同じでなければなりません。これは、RUM iOS SDK がアクションの開始とその完了を一致させるために必要です。

詳細および利用可能なオプションについては、[GitHub の `RUMMonitorProtocol` を参照してください][4]。

###カスタムリソース

[リソースを自動的に追跡する](#automaticallytracknetworkrequests) ほか、ネットワークリクエストやサードパーティプロバイダー API などの特定のカスタムリソースを追跡することもできます。`RUMMonitor.shared()` で次のメソッドを使用して、RUM リソースを手動で収集します。

 `.startResource(resourceKey:request:)`
 `.stopResource(resourceKey:response:)`
 `.stopResourceWithError(resourceKey:error:)`
 `.stopResourceWithError(resourceKey:message:)`

たとえば、以下のとおりです。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

// in your network client:

let rum = RUMMonitor.shared()

rum.startResource(
    resourceKey: "resource-key",
    request: request
)

rum.stopResource(
    resourceKey: "resource-key",
    response: response
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
// in your network client:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**注意**: 両方の呼び出しにおいて `resourceKey` に使用される `String` は、呼び出しているリソースに対して一意である必要があります。これは、RUM iOS SDK がリソースの開始と完了を一致させるために必要です。

詳細および利用可能なオプションについては、[GitHub の `RUMMonitorProtocol` を参照してください][4]。

###カスタムエラー

特定のエラーを追跡するには、エラーが発生したときに `RUMMonitor.shared()` に通知するために、次のメソッドのいずれかを使用します。

 `.addError(message:)`
 `.addError(error:)`

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

詳細および利用可能なオプションについては、[GitHub の `RUMMonitorProtocol`][4] および [エラー属性のドキュメント][5] を参照してください。

##カスタムグローバル属性の追跡

RUM iOS SDK が自動的に取得する [デフォルトの RUM 属性][6] に加えて、RUM イベントにカスタム属性などのコンテキスト情報を追加して、Datadog 内の観測可能性を高めることができます。

カスタム属性を使用すると、観察されたユーザーの行動に関する情報 (カート値、マーチャント層、広告キャンペーンなど) をコードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークヘルスなど) でフィルタリングおよびグループ化することができます。

<div class="alert alert-info">カスタム属性は、ターゲットを絞った小規模の情報 (例: ID、フラグ、短いラベル) を目的としています。完全な HTTP レスポンスペイロードなどの大きなオブジェクトを添付することは避けてください。添付すると、イベントサイズが大幅に増加し、パフォーマンスに影響を与える可能性があります。</div>

###カスタムグローバル属性の設定

カスタムグローバル属性を設定するには、`RUMMonitor.shared().addAttribute(forKey:value:)` を使用します。

* 属性を追加するには、`RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")` を使用します。
* 値を更新するには、`RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")` を使用します。
*キーを削除するには、`RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")` を使用します。

一括操作 (複数の属性を一度に変更する) でのパフォーマンスを向上させるには、`.addAttributes(_:)` と `.removeAttributes(forKeys:)` を使用してください。

**注意**: キー名にスペースや特殊文字を使用すると、カスタム属性にファセットを作成することはできません。たとえば、`forKey: "Store ID"` の代わりに `forKey: "store_id"` を使用してください。

###ユーザーセッションの追跡

RUM セッションにユーザー情報を追加すると、次のことが簡単になります。

*特定のユーザーのジャーニーをたどる
*エラーの影響を最も受けているユーザーを把握する
*最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI 内のユーザー API" >}}

| 属性 | タイプ | 説明 |
|  |  |  |
`usr.id`    | 文字列 | (必須) 一意のユーザー識別子。                                             |
`usr.name`  | 文字列 | (オプション) RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。             |
`usr.email` | 文字列 | (オプション) ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。|

ユーザーセッションを識別するには、`Datadog.setUserInfo(id:name:email:)` API を使用します。

たとえば、以下のとおりです。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

##バックグラウンドイベントの追跡

<div class="alert alert-info"><p>バックグラウンドイベントの追跡は、追加のセッションを引き起こす可能性があり、課金に影響を与えることがあります。質問がある場合は、<a href="https://docs.datadoghq.com/help/">Datadog サポートにお問い合わせください。</a></p>
</div>

アプリケーションがバックグラウンドにあるとき (たとえば、アクティブなビューがないとき)、クラッシュやネットワークリクエストなどのイベントを追跡することができます。

バックグラウンドイベントを追跡するには、Datadog の構成で、初期化時に以下のスニペットを追加します。

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

##初期化パラメーター

ライブラリを初期化するために Datadog の構成を作成する際、`Datadog.Configuration` で以下のプロパティを使用できます。

`backgroundTasksEnabled`
: このフラグは、`UIApplication` メソッド `beginBackgroundTask(expirationHandler:)` と `endBackgroundTask:` がバックグラウンドアップロードを実行するために使用されるかどうかを決定します。このフラグを有効にすると、アプリがバックグラウンドで動作する時間が 30 秒増加することがあります。タスクは、アップロードするものがない場合や、インターネット接続がない、またはバッテリー残量が少ないなど、アップロードを妨げる要因に直面した場合に通常停止します。デフォルトでは、このフラグは `false` に設定されています。

`batchProcessingLevel`
: バッチ処理レベルは、1 回の読み取り/アップロードサイクル内で遅延なしに順次処理される最大バッチ数を定義します。デフォルト値は `.medium` です。

`batchSize`
: Datadog にアップロードされるバッチデータの好ましいサイズを設定します。この値は、RUM iOS SDK によって実行されるリクエストのサイズと数に影響します (バッチサイズが小さいほどリクエスト数は増えますが、各リクエストのサイズは小さくなります)。利用可能な値には、`.small`、`.medium`、`.large` が含まれます。

`bundle`
: 現在の実行可能ファイルを含むバンドルオブジェクトです。

`clientToken`
: RUM クライアントトークン (RUM、ログ、APM をサポート) または通常のクライアントトークン (ログと APM をサポート) のいずれかです。

`encryption`
: `DataEncryption` プロトコルに準拠したオブジェクトを提供することによって、ディスク上のデータ永続性に使用するデータ暗号化を行います。

`enabled`
: Datadog に送信される環境名です。`staging` や `production` など、異なる環境によってイベントをフィルタリングするために使用できます。

`proxyConfiguration`
: トラッキングデータを Datadog のインテークにアップロードするためのカスタムプロキシを有効にするために使用できるプロキシ構成属性です。

`serverDateProvider`
: カスタム NTP 同期インターフェイスです。デフォルトでは、Datadog SDK は [NTP Pool Project][7] が提供する専用 NTP プールと同期します。異なるプールを使用するか、何も操作を行わない `ServerDateProvider` の実装を設定すると、SDK インスタンスと Datadog サーバー間が同期されなくなる場合があります。これにより、RUM セッションや分散トレースにおいて、大幅な時間ずれが発生する可能性があります。

`service`
: Datadog に送信されるデータに関連付けられたサービス名です。デフォルト値はアプリケーションバンドル識別子です。

`site`
: データが送信される Datadog サーバーエンドポイントです。デフォルト値は `.us1` です。

`uploadFrequency`
: Datadog へのデータアップロードの好ましい頻度です。利用可能な値には、`.frequent`、`.average`、`.rare` が含まれます。

###RUM 構成

RUM を有効にする際は、`RUM.Configuration` で以下のプロパティを使用することができます。

`actionEventMapper`
: アクションのデータスクラビングコールバックを設定します。これを使用して、アクションイベントを Datadog に送信する前に修正または削除することができます。詳細については、[RUM イベントの修正または削除](#modifyordroprumevents) を参照してください。

`appHangThreshold`
: アプリがハングしたときに報告するための閾値を設定します。このオプションの最小許容値は `0.1` 秒です。報告を無効にするには、この値を `nil` に設定します。詳細については、[アプリハング報告の追加][8] を参照してください。

`applicationID`
: RUM アプリケーション識別子です。

`customEndpoint`
: RUM データを送信するためのカスタムサーバー URL です。

`errorEventMapper`
: エラーのデータスクラビングコールバックです。これを使用して、エラーイベントを Datadog に送信する前に修正または削除することができます。詳細については、[RUM イベントの修正または削除](#modifyordroprumevents) を参照してください。

`longTaskEventMapper`
: 長いタスクのデータスクラビングコールバックです。これは、長いタスクイベントを Datadog に送信する前に修正または削除するために使用できます。詳細については、[RUM イベントの修正または削除](#modifyordroprumevents) を参照してください。

`longTaskThreshold`
: RUM の長いタスク追跡の閾値 (秒単位) です。デフォルトでは、`0.1` 秒に設定されます。

`networkSettledResourcePredicate`
: TimetoNetworkSettled (TNS) ビューのタイミング計算のために「初期」リソースを分類するために使用される述語です。

`nextViewActionPredicate`
: InteractiontoNextView (INV) タイミング計算のために「最後」のアクションを分類するために使用される述語です。

`onSessionStart`
: (オプション) RUM がセッションを開始するときに呼び出されるメソッドです。

`resourceEventMapper`
: リソースのデータスクラビングコールバックです。リソースイベントを Datadog に送信する前の修正または削除に使用できます。詳細については、[RUM イベントの修正または削除](#modifyordroprumevents) を参照してください。

`sessionSampleRate`
: RUM セッションのサンプリングレートです。`sessionSampleRate` の値は、`0.0` と `100.0` の間でなければなりません。`0.0` に設定されているとセッションが送信されません。`100.0` に設定されているとすべてのセッションが Datadog に送信されます。デフォルト値は `100.0` です。

`telemetrySampleRate`
: Datadog によって利用される SDK 内部のテレメトリのサンプリングレートです。このレートは、トレースシステムに報告されるリクエストの数を制御します。これは `0` と `100` の間の値でなければなりません。デフォルトでは、`20` に設定されています。

`trackAnonymousUser`
: 有効にすると、SDK はアプリ起動間で保持される、一意かつ個人情報を含まない匿名ユーザー ID を生成します。この ID は各 RUM セッションに添付されるため、個人データを収集せずに同じユーザー/デバイスから発生するセッションをリンクできるようになります。デフォルトでは、`true` に設定されています。

`trackBackgroundEvents`
: アクティブなビューがないときに RUM イベントが追跡されるかどうかを決定します。デフォルトでは、`false` に設定されています。

`trackFrustrations`
ユーザーのフラストレーションの自動追跡が有効かどうかを決定します。デフォルトでは、`true` に設定されています。

`trackMemoryWarnings`
: メモリ警告の自動追跡が有効かどうかを決定します。デフォルトでは、`true` に設定されています。

`trackWatchdogTerminations`
: SDK が Watchdog によって実行されるアプリケーションの終了を追跡するかどうかを決定します。デフォルト設定は `false` です。

`uiKitActionsPredicate`
ユーザーのインタラクション (タップ) を RUM アクションとして追跡することを有効にします。`DefaultUIKitRUMActionsPredicate` を設定することで `predicate` のデフォルト実装を使用するか、アプリにカスタマイズされた [独自の`UIKitRUMActionsPredicate`](#automaticallytrackuseractions) を実装することができます。

`uiKitViewsPredicate`
`UIViewControllers` を RUM ビューとして追跡することを有効にします。`DefaultUIKitRUMViewsPredicate` を設定することで `predicate` のデフォルト実装を使用するか、アプリにカスタマイズされた[独自の`UIKitRUMViewsPredicate`](#automaticallytrackviews)を実装することができます。

`urlSessionTracking`
: `URLSession` タスク (ネットワークリクエスト) を RUM リソースとして追跡することを有効にします。`firstPartyHostsTracing` パラメーターは、`firstparty` リソースとして分類されるホスト (RUM が有効な場合)、およびトレーシング情報が注入されるホスト (トレーシング機能が有効な場合) を定義します。`resourceAttributesProvider` パラメーターは、RUM iOS SDK によって収集された各リソースに対して呼び出されるインターセプトされたリソースのカスタム属性を提供するクロージャを定義します。このクロージャはタスク情報と共に呼び出され、カスタムリソース属性を返すか、属性を添付しない場合は `nil` を返すことができます。

`viewEventMapper`
: ビューのデータスクラビングコールバックです。ビューイベントを Datadog に送信する前に修正するために使用できます。詳細については、[RUM イベントの修正または削除](#modifyordroprumevents) を参照してください。

`vitalsUpdateFrequency`
: モバイルバイタルを収集するための好ましい頻度です。利用可能な値には、`.frequent` (100ms ごと)、`.average` (500ms ごと)、`.rare` (1 秒ごと)、および `.never` (バイタルモニタリングを無効) が含まれます。

###ビューの自動追跡

UIKit と SwiftUI を使用してビューを自動的に追跡できます。

{{% collapse-content title="UIKit" level="h4" expanded=true id="auto-track-views-uikit" %}}

ビューを自動的に追跡するには (`UIViewControllers`)、RUM を有効にする際に `uiKitViewsPredicate` オプションを使用します。デフォルトでは、ビューはビューコントローラーのクラス名で命名されます。これをカスタマイズするには、`predicate` を実装し、`UIKitRUMViewsPredicate` プロトコルに準拠させてください。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

`rumView(for:)` の実装内で、アプリは特定の `UIViewController` インスタンスが RUM ビューを開始する (値を返す) か開始しない (`nil` を返す) を決定する必要があります。返される `RUMView` 値は、`name` を指定し、作成された RUM ビューの追加の `attributes` を提供することができます。

たとえば、述語を構成して、アプリの各ビューコントローラーに明示的なタイプチェックを使用できます。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        switch viewController {
        case is HomeViewController:     return .init(name: "Home")
        case is DetailsViewController:  return .init(name: "Details")
        default:                        return nil
        }
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if ([viewController isKindOfClass:[HomeViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Home" attributes:@{}];
    }

    if ([viewController isKindOfClass:[DetailsViewController class]]) {
        return [[DDRUMView alloc] initWithName:@"Details" attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

アプリのアーキテクチャに基づき、さらに動的なソリューションを使用することも可能です。

たとえば、ビューコントローラーが `accessibilityLabel` を一貫して使用する場合、アクセシビリティラベルの値に基づいてビューに名前を付けることができます。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {

    func rumView(for viewController: UIViewController) -> RUMView? {
        guard let accessibilityLabel = viewController.accessibilityLabel else {
            return nil
        }

        return RUMView(name: accessibilityLabel)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@interface YourCustomPredicate : NSObject<DDUIKitRUMViewsPredicate>

@end

@implementation YourCustomPredicate

- (DDRUMView * _Nullable)rumViewFor:(UIViewController * _Nonnull)viewController {
    if (viewController.accessibilityLabel) {
        return [[DDRUMView alloc] initWithName:viewController.accessibilityLabel attributes:@{}];
    }

    return nil;
}

@end
```
{{% /tab %}}
{{< /tabs >}}

**注**: RUM iOS SDK は、アプリが実行中の間に `rumView(for:)` を何度も呼び出します。Datadog は、その実装を迅速かつシングルスレッドに保つことを推奨しています。
{{% /collapse-content %}}

{{% collapse-content title="SwiftUI" level="h4" expanded=true id="auto-track-views-swiftui" %}}

SwiftUI でビューを自動的に追跡するには、RUM を有効にする際に `swiftUIViewsPredicate` オプションを使用します。

SwiftUI ビュー名を抽出するメカニズムは、リフレクションに依存しています。そのため、ビュー名が常に意味のあるものになるとは限りません。意味のある名前を抽出できない場合、`AutoTracked_HostingController_Fallback` や `AutoTracked_NavigationStackController_Fallback` のような一般的な名前が使用されます。

デフォルトの述語 (`DefaultSwiftUIRUMViewsPredicate`) を使用するか、`SwiftUIRUMViewsPredicate` プロトコルの独自の実装を提供して、ビュー名をカスタマイズまたはフィルタリングできます。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
public protocol SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView?
}

// Example: Custom predicate to ignore fallback names and rename views
class CustomSwiftUIPredicate: SwiftUIRUMViewsPredicate {
    func rumView(for extractedViewName: String) -> RUMView? {
        if extractedViewName == "AutoTracked_HostingController_Fallback" ||
           extractedViewName == "AutoTracked_NavigationStackController_Fallback" {
            return nil // Ignore fallback names
        }
        if extractedViewName == "MySpecialView" {
            return RUMView(name: "Special")
        }
        return RUMView(name: extractedViewName)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@protocol DDSwiftUIRUMViewsPredicate <NSObject>
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName;
@end

@interface CustomSwiftUIPredicate : NSObject <DDSwiftUIRUMViewsPredicate>
@end

@implementation CustomSwiftUIPredicate
- (DDRUMView * _Nullable)rumViewFor:(NSString * _Nonnull)extractedViewName {
    if ([extractedViewName isEqualToString:@"AutoTracked_HostingController_Fallback"] ||
        [extractedViewName isEqualToString:@"AutoTracked_NavigationStackController_Fallback"]) {
        return nil; // Ignore fallback names
    }
    if ([extractedViewName isEqualToString:@"MySpecialView"]) {
        return [[DDRUMView alloc] initWithName:@"Special" attributes:@{}];
    }
    return [[DDRUMView alloc] initWithName:extractedViewName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}

**注:**
 Datadog は、アプリが完全に SwiftUI で構築されている場合でも、UIKit ビューの追跡を有効にすることを推奨しています。
タブバーは自動的に追跡されません。各タブビューに対して [手動追跡](#customviews) を使用して、確実に追跡されるようにしてください。
自動追跡と手動追跡の両方を使用すると、イベントが重複して表示されることがあります。これを避けるためには、単一のインスツルメンテーション方法を使用するか、重複を除外するためのカスタム述語を使用してください。
{{% /collapse-content %}}

###ユーザーアクションの自動追跡

#### UIKit

UIKit を使用してユーザーのタップ操作を自動的に追跡するには、RUM を有効にする際に `uiKitActionsPredicate` オプションを設定してください。

#### SwiftUI

SwiftUI でユーザーのタップ操作を自動的に追跡するには、RUMを有効にする際に `swiftUIActionsPredicate` オプションを有効にしてください。

**注:**
 Datadogは、純粋な SwiftUI アプリでも UIKit アクショントラッキングを有効にすることを推奨しています。多くのインタラクティブコンポーネントは、内部的に UIKit で実装されています。
tvOS では、リモコンの押下インタラクションのみが追跡されます。これには UIKit の述語のみが必要です。純粋な SwiftUI アプリを持っていても、tvOS でリモコンの押下を追跡したい場合は、UIKit のインスツルメンテーションも有効にする必要があります。
実装は iOS 18 以上と iOS 17 以下で異なります。
   **iOS 18以上:** ほとんどのインタラクションは、正しいコンポーネント名 (例: `SwiftUI_Button`、`SwiftUI_NavigationLink`) で確実に追跡されます。
   **iOS 17以下:** SDK はインタラクティブコンポーネントと非インタラクティブコンポーネントを区別できません (たとえば、Button と Label)。そのため、アクションは `SwiftUI_Unidentified_Element` として報告されます。
自動追跡と手動追跡の両方を使用すると、イベントが重複して表示されることがあります。これは既知の制限です。これを避けるためには、自動または手動のいずれか 1 つのインスツルメンテーションタイプのみを使用してください。
デフォルトの述語 `DefaultSwiftUIRUMActionsPredicate` を使用するか、アクションをフィルタリングまたは名前変更するために独自のものを提供できます。iOS 18 以上の信頼できるトラッキングのみを希望する場合は、レガシー検出 (iOS 17 以下) を無効にすることもできます。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
// Use the default predicate by disabling iOS 17 and below detection
let predicate = DefaultSwiftUIRUMActionsPredicate(isLegacyDetectionEnabled: false)

// Use your own predicate
class CustomSwiftUIActionsPredicate: SwiftUIRUMActionsPredicate {
    func rumAction(for componentName: String) -> RUMAction? {
        // Custom logic to filter or rename actions
        return RUMAction(name: componentName)
    }
}
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
// Use the default predicate by disabling iOS 17 and below detection
DDDefaultSwiftUIRUMActionsPredicate *swiftUIActionsPredicate = [[DDDefaultSwiftUIRUMActionsPredicate alloc] initWithIsLegacyDetectionEnabled:NO];

// Use your own predicate
@protocol DDSwiftUIRUMActionsPredicate <NSObject>
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName;
@end

@interface CustomSwiftUIActionsPredicate : NSObject <DDSwiftUIRUMActionsPredicate>
@end

@implementation CustomSwiftUIActionsPredicate
- (DDRUMAction * _Nullable)rumActionFor:(NSString * _Nonnull)componentName {
    // Custom logic to filter or rename actions
    return [[DDRUMAction alloc] initWithName:componentName attributes:@{}];
}
@end
```
{{% /tab %}}
{{< /tabs >}}

####iOS バージョンによるアクションレポート

以下の表は、iOS 17 と iOS 18 におけるユーザーインタラクションの報告の違いを示しています。

| **コンポーネント**    | **iOS 18 で報告される名前**                          | **iOS 17 で報告される名前**             |
||||
| Button           | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |
| NavigationLink   | NavigationLink                                    | SwiftUI_Unidentified_Element         |
| Menu             | SwiftUI_Menu (およびそのアイテムは _UIContextMenuCell として) | SwiftUI_Menu (およびそのアイテムは _UIContextMenuCell として) |
| Link             | SwiftUI_Button                                    | SwiftUI_Unidentified_Element         |

###ネットワークリクエストの自動追跡

ネットワークリクエストは、`urlSessionTracking` 構成で RUM を有効にした後、自動的に追跡されます。

####(オプション) 詳細なタイミングの内訳の有効化

詳細なタイミングの内訳 (DNS 解決、SSL ハンドシェイク、最初のバイトまでの時間、接続時間、ダウンロード時間) を取得するには、デリゲートタイプに対して `URLSessionInstrumentation` を有効にします。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
URLSessionInstrumentation.enableDurationBreakdown(
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
{{% tab "ObjectiveC" %}}

```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

**注**:
 `URLSessionInstrumentation` がない場合でも、ネットワークリクエストは追跡されます。これを有効にすると、パフォーマンス分析のための詳細なタイミングの内訳が提供されます。
レスポンスデータは、`resourceAttributesProvider` コールバック (`RUM.Configuration.URLSessionTracking` で設定) で利用可能で、自動モードの完了ハンドラーを持つタスクと、`URLSessionInstrumentation` を有効にした後のすべてのタスクに対して利用できます。
特定のリクエストを追跡から除外するには、`resourceEventMapper` を `RUM.Configuration` で使用します ([RUMイベントの変更または削除](#modifyordroprumevents) を参照)。

<div class="alert alert-info">デリゲートの保持に注意してください。
Datadog のインスツルメンテーションは直接的にメモリリークを引き起こすことはありませんが、<code>URLSession</code> デリゲートに依存しています。<a href="https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters"> Apple のドキュメント</a>によると
「セッションオブジェクトは、アプリが終了するか、セッションを明示的に無効にするまで、デリゲートへの強い参照を保持します。<code>invalidateAndCancel()</code> または <code>finishTasksAndInvalidate()</code> メソッドを呼び出してセッションを無効にしない限り、アプリは終了するまでメモリリークが発生します」。
メモリリークを避けるために、もはや必要のない <code>URLSession</code> インスタンスを無効にすることを確認してください。
</div>


アプリ内に計測したいデリゲートタイプが複数ある場合は、各デリゲートタイプに対して `URLSessionInstrumentation.enable(with:)` を呼び出すことができます。

また、`urlSessionTracking` を使用してファーストパーティホストを構成することができます。このクラスは、指定されたドメインに一致するリソースを RUM の「ファーストパーティ」として分類し、トレース情報をバックエンドに伝播します (トレースを有効にしている場合)。ネットワークトレースは、調整可能なサンプリングレートでサンプリングされます。デフォルトでは、20% のサンプリングが適用されます。

たとえば、`example.com` をファーストパーティホストとして構成し、RUM およびトレース機能の両方を有効にすることができます。

[10]: https://developer.apple.com/documentation/foundation/urlsession/init(configuration:delegate:delegatequeue:)#parameters
{{< tabs >}}
{{% tab "Swift" %}}

```swift

import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        firstPartyHostsTracing: .trace(hosts: ["example.com"], sampleRate: 20)
    )
  )
)

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

これにより、インスツルメンテーション済みの `session` とともに送信されたすべてのリクエストが追跡されます。`example.com` ドメインに一致するリクエストは「ファーストパーティ」とマークされ、トレース情報がバックエンドに送信されて [RUM リソースがそのトレースに接続されます][1]。


[1]: https://docs.datadoghq.com/ja/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@import DatadogRUM;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

リソースにカスタム属性を追加するには、RUM を有効にする際に `URLSessionTracking.resourceAttributesProvider` オプションを使用してください。属性プロバイダークロージャを設定することで、追跡されたリソースに添付される追加の属性を返すことができます。

たとえば、HTTP リクエストと応答ヘッダーを RUM リソースに追加できます。

```swift
RUM.enable(
  with: RUM.Configuration(
    ...
    urlSessionTracking: RUM.Configuration.URLSessionTracking(
        resourceAttributesProvider: { request, response, data, error in
            return [
                "request.headers" : redactedHeaders(from: request),
                "response.headers" : redactedHeaders(from: response)
            ]
        }
    )
  )
)
```

リクエストを追跡したくない場合は、デリゲートタイプの URLSessionInstrumentation を無効にすることができます。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
URLSessionInstrumentation.disable(delegateClass: <YourSessionDelegate>.self)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[<YourSessionDelegate> class]];
```
{{% /tab %}}
{{< /tabs >}}

####Apollo のインスツルメンテーション
iOS アプリケーションで Apollo のインスツルメンテーションを有効にすると、RUM により GraphQL のエラーやパフォーマンスが可視化されます。GraphQL リクエストはすべて単一のエンドポイントに送信され、エラーが発生しても「200 OK」を返すことが多いため、デフォルトの HTTP インスツルメンテーションはコンテキストが不足しています。有効化により、RUM は操作名、操作タイプ、および変数 (オプションでペイロード) をキャプチャできます。これにより、各ネットワークリクエストの詳細なコンテキストが提供されます。

このインテグレーションは、Apollo iOS 1.0 以降 および Apollo iOS 2.0 以降の両方をサポートしています。以下の Apollo iOS バージョンの指示に従ってください。

1. [設定][2] Datadog iOS RUM で RUM モニタリングを行います。

2. 次の内容をご使用のアプリケーションの `Package.swift` ファイルに追加します。

   ```swift
   dependencies: [
       // For Apollo iOS 1.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "1.0.0"))
    
       // For Apollo iOS 2.0+
       .package(url: "https://github.com/DataDog/dd-sdk-ios-apollo-interceptor", .upToNextMajor(from: "2.0.0"))
   ]
   ```

   または、Xcode を使用して追加することもできます。
   1. **ファイル** → **パッケージ依存関係の追加** に移動します。
   2. リポジトリの URL `https://github.com/DataDog/ddsdkiosapollointerceptor` を入力します。
   3. ご使用の Apollo メジャーバージョンに一致するパッケージバージョンを選択してください (Apollo iOS 1.0 以降の場合は `1.x.x` を、Apollo iOS 2.0 以降の場合は `2.x.x` を選択します)。

3. ご使用の Apollo iOS バージョンに基づいてネットワークインスツルメンテーションを設定します。

   {{< tabs >}}
   {{% tab "Apollo iOS 1.0+" %}}

   Apollo の組み込み URLSessionClient のためにネットワークインスツルメンテーションを設定します。

   ```swift
   import Apollo

   URLSessionInstrumentation.enable(with: .init(delegateClass: URLSessionClient.self))
   ```

   Apollo Client 設定に Datadog インターセプターを追加します。

   ```swift
   import Apollo
   import DatadogApollo

   class CustomInterceptorProvider: DefaultInterceptorProvider {
       override func interceptors<Operation: GraphQLOperation>(for operation: Operation) -> [ApolloInterceptor] {
           var interceptors = super.interceptors(for: operation)
           interceptors.insert(DatadogApolloInterceptor(), at: 0)
           return interceptors
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Apollo iOS 2.0+" %}}

   提供された `DatadogApolloDelegate` と `DatadogApolloURLSession` を使用してネットワークインスツルメンテーションを構成します。

   ```swift
   import Apollo
   import DatadogApollo
   import DatadogCore

   // Create the Datadog delegate
   let delegate = DatadogApolloDelegate()

   // Create the custom URLSession wrapper
   let customSession = DatadogApolloURLSession(
       configuration: .default,
       delegate: delegate
   )

   // Enable Datadog instrumentation for the delegate
   URLSessionInstrumentation.enable(
       with: .init(delegateClass: DatadogApolloDelegate.self)
   )

   // Configure Apollo Client with the custom session
   let networkTransport = RequestChainNetworkTransport(
       urlSession: customSession,
       interceptorProvider: NetworkInterceptorProvider(),
       store: store,
       endpointURL: url
   )
   ```

   Datadog インターセプターを使用してインターセプタープロバイダーを作成します。

   ```swift
   import Apollo
   import DatadogApollo

   struct NetworkInterceptorProvider: InterceptorProvider {
       func graphQLInterceptors<Operation>(for operation: Operation) -> [any GraphQLInterceptor] where Operation : GraphQLOperation {
           return [DatadogApolloInterceptor()] + DefaultInterceptorProvider.shared.graphQLInterceptors(for: operation)
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

   これにより、Datadog RUM はリクエストからオペレーションの種類、名前、変数、および (オプションで) ペイロードを自動的に抽出し、GraphQL リクエストの RUM リソースを拡張させます。

   <div class="alert alert-info">
     <ul>
       <li>このインテグレーションは、Apollo iOS バージョン <code>1.0 以降</code>および <code>2.0 以降</code>をサポートしています。</li>
       <li>この <code>query</code> と <code>mutation</code> タイプの操作は追跡されますが、<code>subscription</code> 操作は追跡されません。</li>
       <li>GraphQL ペイロードの送信はデフォルトで無効になっています。これを有効にするには、<code>sendGraphQLPayloads</code> フラグを <code>DatadogApolloInterceptor</code> コンストラクタに次のように設定します。</li>
     </ul>

     <pre><code class="language-swift">
   let datadogInterceptor = DatadogApolloInterceptor(sendGraphQLPayloads: true)
     </code></pre>
   </div>

###エラーの自動追跡

`Logger` と送信されたすべての "error" および "critical" ログは自動的に RUM エラーとして報告され、現在の RUM ビューにリンクされます。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

同様に、エラーとしてマークされたすべての終了スパンは、RUM エラーとして報告されます。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

##RUM イベントの変更または削除

Datadog に送信される前に RUM イベントの属性を変更したり、イベントを完全に削除したりするには、RUM iOS SDK を構成するときに Event Mappers API を使用します。

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    viewEventMapper: { RUMViewEvent in
        return RUMViewEvent
    }
    resourceEventMapper: { RUMResourceEvent in
        return RUMResourceEvent
    }
    actionEventMapper: { RUMActionEvent in
        return RUMActionEvent
    }
    errorEventMapper: { RUMErrorEvent in
        return RUMErrorEvent
    }
    longTaskEventMapper: { RUMLongTaskEvent in
        return RUMLongTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull RUMViewEvent) {
    return RUMViewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull RUMErrorEvent) {
    return RUMErrorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull RUMActionEvent) {
    return RUMActionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull RUMLongTaskEvent) {
    return RUMLongTaskEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

各マッパーは、`(T) > T?` のシグネチャを持つ Swift クロージャです。ここで、`T` は具体的な RUM イベントタイプです。これにより、イベントが送信される前にその一部を変更することができます。

たとえば、RUM Resource の `url` に含まれる機密情報をマスクするには、カスタム `redacted(_:) > String` 関数を実装し、それを `resourceEventMapper` で使用します:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    resourceEventMapper: { RUMResourceEvent in
        var RUMResourceEvent = RUMResourceEvent
        RUMResourceEvent.resource.url = redacted(RUMResourceEvent.resource.url)
        return RUMResourceEvent
    }
)
```
{{% /tab %}}
{{% tab "ObjectiveC" %}}

```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

エラー、リソース、アクションのマッパーから `nil` を返すと、イベントは破棄され、Datadog に送信されません。ビューイベントマッパーから返される値は `nil` であってはなりません (ビューを除外するには、`UIKitRUMViewsPredicate` の実装をカスタマイズしてください。詳細は [ビューの自動追跡について](#automaticallytrackviews) をご覧ください)。

イベントのタイプに応じて、一部の特定のプロパティのみを変更できます。

| イベントタイプ       | 属性キー                        | 説明                                      |
|  |  |  |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | アクションの名前。                             |
|                  | `RUMActionEvent.view.url`            | このアクションにリンクされたビューの URL。          |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | エラーメッセージ。                                  |
|                  | `RUMErrorEvent.error.stack`          | エラーのスタックトレース。                        |
|                  | `RUMErrorEvent.error.resource?.url`  | エラーが参照するリソースの URL。        |
|                  | `RUMErrorEvent.view.url`             | このエラーにリンクされたビューの URL。           |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | リソースの URL。                            |
|                  | `RUMResourceEvent.view.url`          | このリソースにリンクされたビューの URL。        |
| RUMViewEvent     | `RUMViewEvent.view.name`             | ビューの名前。                               |
|                  | `RUMViewEvent.view.url`              | ビューの URL。                                |
|                  | `RUMViewEvent.view.referrer`         | ページの初期ビューへのリンク URL。|

##RUM セッション ID の取得

RUM セッション ID を取得すると、トラブルシューティングの際に役立ちます。たとえば、セッション ID をサポートリクエスト、メール、またはバグレポートに添付することで、サポートチームが後で Datadog でユーザーセッションを見つけることができます。

ランタイム中に `sessionStarted` イベントを待たずに RUM セッション ID にアクセスできます。

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

##トラッキングの同意を設定 (GDPR の遵守)

GDPR 規制を遵守するため、RUM iOS SDK は初期化時に追跡に関する同意を求めます。

`trackingConsent` 設定は以下のいずれかの値で示されます。

1. `.pending`: RUM iOS SDK はデータの収集とバッチ処理を開始しますが、Datadog には送信しません。RUM iOS SDK は、バッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
2. `.granted`: RUM iOS SDK はデータの収集を開始し、Datadog へ送信します。
3. `.notGranted`: RUM iOS SDK はデータを収集しません。ログ、トレース、または RUM イベントは Datadog に送信されません。

RUM iOS SDK の初期化後にトラッキング同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。RUM iOS SDK は新しい値に応じて動作を変更します。

たとえば、現在のトラッキング同意が `.pending` の場合は以下のようになります。

 値を `.granted` に変更すると、RUM iOS SDK は現在および今後のすべてのデータを Datadog に送信します。
 値を `.notGranted` に変更すると、RUM iOS SDK は現在のすべてのデータを消去し、今後のデータを収集しません。

##ユーザー属性の追加

`Datadog.addUserExtraInfo(_:)` API を使用して、以前に設定したプロパティに追加のユーザー属性を追加できます。

```swift
import DatadogCore

Datadog.addUserExtraInfo(["company": "Foo"])
```

##データ管理

iOS SDK は最初にイベントをローカルに保存し、[取り込み仕様][9] の条件が満たされたときにのみイベントをアップロードします。

###すべてのデータのクリア

SDK によって保存されたすべての未送信データを `Datadog.clearAllData()` API を使用して削除するオプションがあります。

```swift
import DatadogCore

Datadog.clearAllData()
```

###データ収集の停止

`Datadog.stopInstance()` API を使用すると、名前付き SDK インスタンス (名前が `nil` の場合はデフォルトインスタンス) のデータ収集およびアップロードを停止できます。

```swift
import DatadogCore

Datadog.stopInstance()
```

このメソッドを呼び出すと、SDK や RUM などのすべてのアクティブな機能が無効になります。データ収集を再開するには、SDK を再初期化する必要があります。動的に設定を変更したい場合にこの API を使用できます。

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/application_monitoring/ios
[3]: /ja/real_user_monitoring/application_monitoring/ios/data_collected/
[4]: https://github.com/DataDog/ddsdkios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /ja/real_user_monitoring/application_monitoring/ios/data_collected/?tab=error#errorattributes
[6]: /ja/real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#defaultattributes
[7]: https://www.ntppool.org/en/
[8]: /ja/real_user_monitoring/error_tracking/mobile/ios/#addapphangreporting
[9]: /ja/real_user_monitoring/application_monitoring/ios/setup