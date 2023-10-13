---
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: dd-sdk-ios のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: RUM & セッションリプレイ
kind: documentation
title: RUM iOS の高度なコンフィギュレーション
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

RUM のデフォルト属性に加えて、`addTiming(name:)` API を使用して、アプリケーションが時間を費やしている場所を測定できます。タイミング測定は、現在の RUM ビューの開始を基準にしています。

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

[アクションを自動的に追跡する](#automatically-track-user-actions)ことに加えて、`addAction(type:name:)` API を使って、特定のカスタムユーザーアクション (タップ、クリック、スクロール) を追跡することができます。

`RUMMonitor.shared()` に `.tap` のような瞬間的な RUM アクションを手動で登録するには、`.addAction(type:name:)` を使用します。`.scroll` のような連続した RUM アクションを登録するには、`.startAction(type:name:)` または `.stopAction(type:name:)` を使用します。

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

**注**: `.startAction(type:name:)` と `.stopAction(type:name:)` を使用する場合、アクション `type` は同じである必要があります。これは、RUM iOS SDK がアクションの開始と完了を一致させるために必要です。

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

// ネットワーククライアントで:

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

**注**: 両方の呼び出しで `resourceKey` に使用される `String` は、呼び出すリソースに対して一意である必要があります。これは、RUM iOS SDK がリソースの開始と完了を一致させるために必要です。

[`DDRUMMonitor` クラス][9]で詳細およびその他のオプションをご確認ください。

### カスタムエラー

特定のエラーを追跡するには、エラーが発生したときにメッセージ、ソース、例外、追加属性で `Global.rum` に通知します。[エラー属性ドキュメント][5]をご参照ください。

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

RUM iOS SDK が自動的に取得する[デフォルトの RUM 属性][7]に加えて、RUM イベントにカスタム属性などのコンテキスト情報を追加して、Datadog 内の観測可能性を高めることができます。

カスタム属性を使用すると、観察されたユーザーの行動に関する情報 (カート値、マーチャント層、広告キャンペーンなど) をコードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークヘルスなど) でフィルタリングおよびグループ化することができます。

### カスタムグローバル属性の設定

カスタムグローバル属性を設定するには、`RUMMonitor.shared().addAttribute(forKey:value:)` を使用します。

* 属性を追加するには、`RUMMonitor.shared().addAttribute(forKey: "some key", value: "some value")` を使用します。
* 値を更新するには、`RUMMonitor.shared().addAttribute(forKey: "some key", value: "some other value")` を使用します。
* キーを削除するには、`RUMMonitor.shared().removeAttribute(forKey: "some key")` を使用します。

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

ユーザーセッションを識別するには、`setUserInfo(id:name:email:)` API を使用します。例:

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

アプリのアーキテクチャに基づき、さらに動的なソリューションを使用することも可能です。

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

リソース (ネットワークリクエスト) を自動追跡し、最初の 1 バイトまでまたは DNS 解決などのタイミング情報を取得するには、RUM を有効にする際に `urlSessionTracking` オプションを使用して、監視する `URLSession` に `DatadogURLSessionDelegate` を設定します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let session = URLSession(
    configuration: .default,
    delegate: DatadogURLSessionDelegate(),
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

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

これにより、インスツルメントされた `session` とともに送信されたすべてのリクエストが追跡されます。`example.com` ドメインに一致するリクエストは "first party" とマークされ、トレース情報がバックエンドに送信されて [RUM リソースがトレースに接続されます][1]。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces?tab=browserrum

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

カスタム属性をリソースに追加するには、RUM を有効にする際に `URLSessionTracking.resourceAttributesProvider` オプションを使用します。属性を提供するクロージャーを設定することで、追跡したリソースに追加の属性をアタッチして返すことができます。

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
    viewEventMapper: { viewEvent in 
        return viewEvent
    }
    resourceEventMapper: { resourceEvent in
        return resourceEvent
    }
    actionEventMapper: { actionEvent in
        return actionEvent
    }
    errorEventMapper: { errorEvent in
        return errorEvent
    }
    longTaskEventMapper: { longTaskEvent in
        return longTaskEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull viewEvent) {
    return viewEvent;
}];

[configuration setErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull errorEvent) {
    return errorEvent;
}];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];

[configuration setActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull actionEvent) {
    return actionEvent;
}];

[configuration setLongTaskEventMapper:^DDRUMLongTaskEvent * _Nullable(DDRUMLongTaskEvent * _Nonnull longTaskEvent) {
    return longTaskEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

各マッパーは `(T) -> T?` というシグネチャを持つ Swift のクロージャーで、 `T` は具象的な RUM イベントの型です。これは、送信される前にイベントの一部を変更することができます。

例えば、RUM Resource の `url` に含まれる機密情報を編集するには、カスタム `redacted(_:) -> String` 関数を実装して、 `resourceEventMapper` で使用します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    resourceEventMapper: { resourceEvent in
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];

[configuration setResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

エラー、リソース、またはアクションマッパーから `nil` を返すと、イベントが完全にドロップされます。イベントは Datadog に送信されません。ビューイベントマッパーから返された値は `nil` であってはなりません (ビューをドロップするには、`UIKitRUMViewsPredicate` の実装をカスタマイズします。詳しくは、[ビューの自動追跡](#automatically-track-views)を参照してください)。

イベントのタイプに応じて、一部の特定のプロパティのみを変更できます。

| イベントタイプ       | 属性キー                     | 説明                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `viewEvent.view.name`             | ビューの名前。                        |
|                  | `viewEvent.view.url`              | ビューの URL。                         |
| RUMActionEvent   | `actionEvent.action.target?.name` | アクションの名前。                      |
|                  | `actionEvent.view.url`            | このアクションにリンクされているビューの URL。   |
| RUMErrorEvent    | `errorEvent.error.message`        | エラーメッセージ。                           |
|                  | `errorEvent.error.stack`          | エラーのスタックトレース。                 |
|                  | `errorEvent.error.resource?.url`  | エラーが参照するリソースの URL。 |
|                  | `errorEvent.view.url`             | このエラーにリンクされているビューの URL。    |
| RUMResourceEvent | `resourceEvent.resource.url`      | リソースの URL。                     |
|                  | `resourceEvent.view.url`          | このリソースにリンクされているビューの URL。 |

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

## RUM セッションのサンプリング

アプリケーションが Datadog RUM に送信するデータを制御するには、[RUM iOS SDK を初期化][1]し、RUM セッションのサンプリングレートを 0～100 の間に指定します。

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

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。ネットワークが利用可能で、RUM iOS SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: ディスク上のデータは、古すぎる場合は RUM iOS SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## Datadog データのアップロードにカスタムプロキシを構成する

アプリがカスタムプロキシの後ろにあるデバイスで実行されている場合、RUM iOS SDK のデータアップローダーに通知して、すべてのトラッキングデータが関連する構成でアップロードされるようにすることができます。

iOS SDK の初期化時に、プロキシ構成にて指定します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    proxyConfiguration: [
        kCFNetworkProxiesHTTPEnable: true, 
        kCFNetworkProxiesHTTPPort: 123, 
        kCFNetworkProxiesHTTPProxy: "www.example.com", 
        kCFProxyUsernameKey: "proxyuser", 
        kCFProxyPasswordKey: "proxypass" 
    ]
  ), 
  trackingConsent: trackingConsent
)
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.proxyConfiguration = @{
    (NSString *)kCFNetworkProxiesHTTPEnable: @YES,
    (NSString *)kCFNetworkProxiesHTTPPort: @123,
    (NSString *)kCFNetworkProxiesHTTPProxy: @"www.example.com",
    (NSString *)kCFProxyUsernameKey: @"proxyuser",
    (NSString *)kCFProxyPasswordKey: @"proxypass"
}];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}

詳しくは、[URLSessionConfiguration.connectionProxyDictionary][8] のドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/ios
[3]: /ja/real_user_monitoring/ios/data_collected
[4]: /ja/real_user_monitoring/explorer/search/#setup-facets-and-measures
[5]: /ja/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /ja/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[7]: /ja/real_user_monitoring/ios/data_collected?tab=session#default-attributes
[8]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[9]: https://github.com/DataDog/dd-sdk-ios/blob/56e972a6d3070279adbe01850f51cb8c0c929c52/DatadogObjc/Sources/RUM/RUM%2Bobjc.swift