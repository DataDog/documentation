---
title: RUM iOS Advanced Configuration
code_lang: ios
type: multi-code-lang
code_lang_weight: 20
aliases:
    - /real_user_monitoring/ios/advanced_configuration
further_reading:
  - link: "https://github.com/DataDog/dd-sdk-ios"
    tag: ソースコード
    text: Source code for dd-sdk-ios
  - link: /real_user_monitoring
    tag: Documentation
    text: RUM & Session Replay
  - link: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
    tag: ドキュメント
    text: RUM iOS and tvOS monitoring supported versions
---

まだ RUM iOS SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[RUM iOS セットアップドキュメント][2]を参照してください。

## ユーザーセッションの充実

iOS RUM は、ユーザーアクティビティ、画面、エラー、ネットワークリクエストなどの属性を自動的に追跡します。RUM イベントおよびデフォルト属性については、[RUM データ収集ドキュメント][3]をご参照ください。カスタムイベントを追跡することで、ユーザーセッション情報を充実させ、収集された属性をより細かく制御することが可能になります。

### カスタムビュー

[ビューを自動追跡する](#automatically-track-views)ほか、`viewControllers` などの特定のさまざまなビューがインタラクティブに確認できるようになると追跡することも可能になります。ビューが確認できなくなったら、`RUMMonitor.shared()` で以下のメソッドを使用して追跡を停止します。

- `.startView(viewController:)`
- `.stopView(viewController:)`

例:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// `UIViewController` で:
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
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;
// `UIViewController` で:

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

詳細や利用可能なオプションについては、`DDRUMMonitor` クラスで [GitHub 上の関連ファイル][9]をフィルタリングしてご確認ください。

### 独自のパフォーマンスタイミングを追加

In addition to RUM's default attributes, you can measure where your application is spending its time by using the `addTiming(name:)` API. The timing measure is relative to the start of the current RUM view.

たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    let rum = RUMMonitor.shared()
    rum.addTiming(name: "hero_image")
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [[DDRUMMonitor shared] addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

一度設定したタイミングは `@view.custom_timings.<timing_name>` としてアクセス可能です。例えば、`@view.custom_timings.hero_image` のようになります。

ダッシュボードで視覚化を作成するには、まず[メジャーの作成][4]を行います。

### カスタムアクション

In addition to [tracking actions automatically](#automatically-track-user-actions), you can track specific custom user actions (taps, clicks, and scrolls) with the `addAction(type:name:)` API.

To manually register instantaneous RUM actions such as `.tap` on `RUMMonitor.shared()`, use `.addAction(type:name:)`. For continuous RUM actions such as `.scroll`, use `.startAction(type:name:)` or `.stopAction(type:name:)`.

例:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogRUM

// `UIViewController` で:

let rum = RUMMonitor.shared()

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    rum.addAction(
        type: .tap,
        name: sender.currentTitle ?? "",
    )
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (IBAction)didTapDownloadResourceButton:(UIButton *)sender {
    NSString *name = sender.currentTitle ? sender.currentTitle : @"";
    [[DDRUMMonitor shared] addActionWithType:DDRUMActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**Note**: When using `.startAction(type:name:)` and `.stopAction(type:name:)`, the action `type` must be the same. This is necessary for the RUM iOS SDK to match an action start with its completion.

[`DDRUMMonitor` クラス][9]で詳細およびその他のオプションをご確認ください。

### カスタムリソース

[リソースを自動追跡する](#automatically-track-network-requests)ほか、ネットワークリクエストやサードパーティプロバイダー API などの特定のカスタムリソースを追跡することも可能です。RUM リソースを手動で収集するには、`RUMMonitor.shared()` で次のメソッドを使用します。

- `.startResource(resourceKey:request:)`
- `.stopResource(resourceKey:response:)`
- `.stopResourceWithError(resourceKey:error:)`
- `.stopResourceWithError(resourceKey:message:)`

例:

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
{{% tab "Objective-C" %}}
```objective-c
// ネットワーククライアントで:

[[DDRUMMonitor shared] startResourceWithResourceKey:@"resource-key"
                                            request:request
                                         attributes:@{}];

[[DDRUMMonitor shared] stopResourceWithResourceKey:@"resource-key"
                                          response:response
                                        attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

**Note**: The `String` used for `resourceKey` in both calls must be unique for the resource you are calling. This is necessary for the RUM iOS SDK to match a resource's start with its completion.

[`DDRUMMonitor` クラス][9]で詳細およびその他のオプションをご確認ください。

### カスタムエラー

To track specific errors, notify `RUMMonitor` when an error occurs with the message, source, exception, and additional attributes. Refer to the [Error Attributes documentation][5].

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

詳細と使用可能なオプションについては、[`DDRUMMonitor` クラス][9]のコードドキュメントのコメントを参照してください。

## カスタムグローバル属性の追跡

In addition to the [default RUM attributes][7] captured by the RUM iOS SDK automatically, you can choose to add additional contextual information (such as custom attributes) to your RUM events to enrich your observability within Datadog.

カスタム属性を使用すると、観察されたユーザーの行動に関する情報 (カート値、マーチャント層、広告キャンペーンなど) をコードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークヘルスなど) でフィルタリングおよびグループ化することができます。

### カスタムグローバル属性の設定

カスタムグローバル属性を設定するには、`RUMMonitor.shared().addAttribute(forKey:value:)` を使用します。

* To add an attribute, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* To update the value, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* To remove the key, use `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

**Note**: You can't create facets on custom attributes if you use spaces or special characters in your key names. For example, use `forKey: "store_id"` instead of `forKey: "Store ID"`.

### ユーザーセッションの追跡

RUM セッションにユーザー情報を追加すると、次のことが簡単になります。

* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API" >}}

以下の属性は**任意**で、**少なくとも 1 つ**提供する必要があります。

| 属性   | タイプ   | 説明                                                                                              |
|-------------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | 文字列 | 一意のユーザー識別子。                                                                                  |
| `usr.name`  | 文字列 | RUM UI にデフォルトで表示されるユーザーフレンドリーな名前。                                                  |
| `usr.email` | 文字列 | ユーザー名が存在しない場合に RUM UI に表示されるユーザーのメール。Gravatar をフェッチするためにも使用されます。 |

To identify user sessions, use the `setUserInfo(id:name:email:)` API.

例:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDDatadog setUserInfoWithId:@"1234" name:@"John Doe" email:@"john@doe.com" extraInfo:@{}];
```
{{% /tab %}}
{{< /tabs >}}

## 初期化パラメーター

ライブラリを初期化するよう Datadog の構成を作成する際、`Datadog.Configuration` で以下のプロパティを使用できます。

`site`
: データが送信される Datadog サーバーエンドポイントを設定します。

`batchSize`
: Datadog にアップロードされるバッチデータの希望サイズを設定します。この値は、RUM iOS SDK により実行されるリクエストのサイズと数に影響を与えます (小さいバッチの場合、リクエストは多くなりますが、各リクエストのサイズが小さくなります)。利用できる値は `.small`、`.medium`、`.large` などです。

`uploadFrequency`
: Datadog へのデータアップロードの希望頻度を設定します。利用できる値は `.frequent`、`.average`、`.rare` などです。

### RUM 構成

RUM を有効にする際は、`RUM.Configuration` で以下のプロパティを使用することができます。

`sessionSampleRate`
: RUM セッションにサンプルレートを設定します。`sessionSampleRate` の値は `0.0`～`100.0` の間である必要があります。`0.0` はセッションが送信されないこと、`100.0` はすべてのセッションが Datadog に送信されることを意味します。構成されない場合、デフォルト値の `100.0` が使用されます。

`uiKitViewsPredicate`
: `UIViewControllers` の RUM ビューとしての追跡を有効にします。`DefaultUIKitRUMViewsPredicate` を設定して `predicate` のデフォルト実装を使用するか、アプリに合わせてカスタマイズした[独自の `UIKitRUMViewsPredicate`](#automatically-track-views) を実装します。

`uiKitActionsPredicate`
: ユーザーインタラクション (タップ) を RUM アクションとして追跡できるようにします。`DefaultUIKitRUMActionsPredicate` を設定して `predicate` のデフォルト実装を使用するか、アプリに合わせてカスタマイズした[独自の `UIKitRUMActionsPredicate`](#automatically-track-user-actions) を実装します。

`urlSessionTracking`
: `URLSession` タスク (ネットワークリクエスト) の RUM リソースとしての追跡を有効にします。パラメーター `firstPartyHostsTracing` は、`first-party` リソースとしてカテゴライズされ (RUM 機能が有効な場合)、挿入されるトレース情報を持つ (トレース機能が有効な場合) ホストを定義します。`resourceAttributesProvider` パラメーターは、インターセプトされたリソースのカスタム属性を提供するクロージャーを設定します。クロージャーの呼び出しは、RUM iOS SDK により収集されるリソースごとに行われます。このクロージャーはタスク情報と共に呼び出され、カスタムリソース属性を返すか、属性がアタッチされない場合は `nil` を返します。

`viewEventMapper`
: ビューのデータスクラビングコールバックを設定します。Datadog に送信される前のビューイベントの修正に使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`resourceEventMapper`
: リソースのデータスクラビングコールバックを設定します。Datadog に送信される前のリソースイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`actionEventMapper`
: アクションのデータスクラビングコールバックを設定します。Datadog に送信される前のアクションイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`errorEventMapper`
: エラーのデータスクラビングコールバックを設定します。Datadog に送信される前のエラーイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`longTaskEventMapper`
: ロングタスクのデータスクラビングコールバックを設定します。Datadog に送信される前のロングタスクイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`vitalsUpdateFrequency`
: モバイルバイタルを収集する好ましい頻度を設定します。設定可能な値は以下の通りです: `.frequent` (100ms 毎)、`.average` (500ms 毎)、`.rare` (1s 毎)、`.never` (バイタル監視を無効にする)

`appHangThreshold`
: Sets the threshold for reporting app hangs. The minimum allowed value for this option is `0.1` seconds. To disable app hangs reporting, set this to `nil`. For more information, see [Add app hang reporting][10].

### ビューの自動追跡

ビューを自動的に追跡するには (`UIViewControllers`)、RUM を有効にする際に `uiKitViewsPredicate` オプションを使用します。デフォルトで、ビューの名前はビューコントローラーのクラス名になります。カスタマイズするには、`UIKitRUMViewsPredicate` プロトコルに準拠する `predicate` の独自の実装を提供します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```swift
@objc
public protocol DDUIKitRUMViewsPredicate: AnyObject {
    func rumView(for viewController: UIViewController) -> DDRUMView?
}
```
{{% /tab %}}
{{< /tabs >}}

`rumView(for:)` 実装内で、アプリは特定の `UIViewController` インスタンスが RUM ビューを開始 (値を返す) またはしない (`nil` を返す) ことを決定する必要があります。`RUMView` の戻り値は `name` を指定する必要があり、作成された RUM ビューに追加の `attributes` を提供する場合があります。

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
{{% tab "Objective-C" %}}
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

You can even come up with a more dynamic solution depending on your app's architecture.

たとえば、ビューコントローラーが一定して `accessibilityLabel` を使用する場合、アクセシビリティラベルの値別にビューに名前を付けることができます。

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
{{% tab "Objective-C" %}}
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

**注**: RUM iOS SDK は、アプリの実行中に何度も `rumView(for:)` を呼び出します。実装をすばやく、シングルスレッドにすることをおすすめします。

### ユーザーアクションの自動追跡

ユーザーのタップ操作を自動的に追跡するには、RUM を有効にする際に `uiKitActionsPredicate` オプションを使用します。

### ネットワークリクエストの自動追跡

To automatically track resources (network requests) and get their timing information such as time to first byte or DNS resolution, use the `urlSessionTracking` option when enabling RUM and enable `URLSessionInstrumentation`:

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

また、`urlSessionTracking` を使用してファーストパーティホストを構成することも可能です。これにより、RUM で特定のドメインに一致するリソースを "first party" と分類し、トレース情報をバックエンドに伝播します (トレーシング機能が有効な場合)。ネットワークトレースは、調整可能なサンプリングレートでサンプリングされます。デフォルトでは、20% のサンプリングが適用されます。

たとえば、`example.com` をファーストパーティホストとして構成し、RUM およびトレース機能の両方を有効にします。

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
        delegateClass: SessionDelegate.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: SessionDelegate(),
    delegateQueue: nil
)
```

これにより、インスツルメントされた `session` とともに送信されたすべてのリクエストが追跡されます。`example.com` ドメインに一致するリクエストは "first party" とマークされ、トレース情報がバックエンドに送信されて [RUM リソースがトレースに接続されます][1]。

[1]: https://docs.datadoghq.com/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
DDRUMURLSessionTracking *urlSessionTracking = [DDRUMURLSessionTracking new];
[urlSessionTracking setFirstPartyHostsTracing:[DDRUMFirstPartyHostsTracing alloc] initWithHosts:@[@"example.com"] sampleRate:20];
[configuration setURLSessionTracking:urlSessionTracking];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{< /tabs >}}

To add custom attributes to resources, use the `URLSessionTracking.resourceAttributesProvider` option when enabling the RUM. By setting attributes provider closure, you can return additional attributes to be attached to tracked resource.

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

If you don't want to track requests, you can disable URLSessionInstrumentation for the delegate type:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.disable(delegateClass: SessionDelegate.self)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDURLSessionInstrumentation disableWithDelegateClass:[SessionDelegate class]];
```
{{% /tab %}}
{{< /tabs >}}

### エラーの自動追跡

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
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

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
{{% tab "Objective-C" %}}
```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```
{{% /tab %}}
{{< /tabs >}}

## RUM イベントの変更または削除

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
{{% tab "Objective-C" %}}
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

Each mapper is a Swift closure with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent.

例えば、RUM Resource の `url` に含まれる機密情報を編集するには、カスタム `redacted(_:) -> String` 関数を実装して、 `resourceEventMapper` で使用します。

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
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull RUMResourceEvent) {
    return RUMResourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

エラー、リソース、またはアクションマッパーから `nil` を返すと、イベントが完全にドロップされます。イベントは Datadog に送信されません。ビューイベントマッパーから返された値は `nil` であってはなりません (ビューをドロップするには、`UIKitRUMViewsPredicate` の実装をカスタマイズします。詳しくは、[ビューの自動追跡](#automatically-track-views)を参照してください)。

イベントのタイプに応じて、一部の特定のプロパティのみを変更できます。

| イベントタイプ       | 属性キー                     | 説明                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `RUMViewEvent.view.name`             | ビューの名前。                        |
|                  | `RUMViewEvent.view.url`              | ビューの URL。                         |
| RUMActionEvent   | `RUMActionEvent.action.target?.name` | アクションの名前。                      |
|                  | `RUMActionEvent.view.url`            | このアクションにリンクされているビューの URL。   |
| RUMErrorEvent    | `RUMErrorEvent.error.message`        | エラーメッセージ。                           |
|                  | `RUMErrorEvent.error.stack`          | エラーのスタックトレース。                 |
|                  | `RUMErrorEvent.error.resource?.url`  | エラーが参照するリソースの URL。 |
|                  | `RUMErrorEvent.view.url`             | このエラーにリンクされているビューの URL。    |
| RUMResourceEvent | `RUMResourceEvent.resource.url`      | リソースの URL。                     |
|                  | `RUMResourceEvent.view.url`          | このリソースにリンクされているビューの URL。 |

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```swift
RumMonitor.shared().currentSessionID(completion: { sessionId in
  currentSessionId = sessionId
})
```

## トラッキングの同意を設定 (GDPR の遵守)

GDPR 規制を遵守するため、RUM iOS SDK は初期化時に追跡に関する同意を求めます。

`trackingConsent` 設定は以下のいずれかの値で示されます。

1. `.pending`: RUM iOS SDK はデータの収集とバッチ処理を開始しますが、Datadog へは送信しません。RUM iOS SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
2. `.granted`: RUM iOS SDK はデータの収集を開始し、Datadog へ送信します。
3. `.notGranted`: RUM iOS SDK はデータを収集しません。ログ、トレース、RUM イベントは Datadog に送信されません。 

RUM iOS SDK の初期化後に追跡同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。RUM iOS SDK は、新しい値に応じて動作を変更します。

たとえば、現在の追跡同意が `.pending` の場合: 

- 値を `.granted` に変更すると、RUM iOS SDK は現在および今後のすべてのデータを Datadog に送信します。
- 値を `.notGranted` に変更すると、RUM iOS SDK は現在のすべてのデータを消去し、今後のデータを収集しません。

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。ネットワークが利用可能で、RUM iOS SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: ディスク上のデータは、古すぎる場合は RUM iOS SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/ios
[3]: /real_user_monitoring/ios/data_collected
[4]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[7]: /real_user_monitoring/ios/data_collected?tab=session#default-attributes
[9]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogObjc/Sources/RUM/RUM%2Bobjc.swift
[10]: /real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
