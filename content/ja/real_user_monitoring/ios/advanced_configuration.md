---
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/advanced_configuration.md
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Github
  text: dd-sdk-ios ソースコード
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

[ビューを自動追跡する](#automatically-track-views)ほか、`viewControllers` などの特定のさまざまなビューがインタラクティブに確認できるようになると追跡することも可能になります。ビューが確認できなくなったら、`Global.rum` で以下のメソッドを使用して追跡を停止します。

- `.startView(viewController:)`
- `.stopView(viewController:)`

例:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// `UIViewController` で:

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    Global.rum.startView(viewController: self)
}

override func viewDidDisappear(_ animated: Bool) {
  super.viewDidDisappear(animated)
  Global.rum.stopView(viewController: self)
}
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// in your `UIViewController`:

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];

    [DDGlobal.rum startViewWithViewController:self name:nil attributes:nil];
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];

    [DDGlobal.rum stopViewWithViewController:self attributes:nil];
}
```
{{% /tab %}}
{{< /tabs >}}

[`DDRUMMonitor` クラス][9]で詳細およびその他のオプションをご確認ください。

### 独自のパフォーマンスタイミングを追加

RUM のデフォルト属性に加えて、`addTiming(name:)` API を使用して、アプリケーションが時間を費やしている場所を測定できます。タイミング測定は、現在の RUM ビューの開始を基準にしています。

たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
func onHeroImageLoaded() {
    Global.rum.addTiming(name: "hero_image")
} 
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
- (void)onHeroImageLoad {
    [DDGlobal.rum addTimingWithName:@"hero_image"];
}
```
{{% /tab %}}
{{< /tabs >}}

一度設定したタイミングは `@view.custom_timings.<timing_name>` としてアクセス可能です。例えば、`@view.custom_timings.hero_image` のようになります。

ダッシュボードで視覚化を作成するには、まず[メジャーの作成][4]を行います。

### カスタムアクション

[アクションを自動的に追跡する](#automatically-track-user-actions)ことに加えて、`addUserAction(type:name:)` API を使って、特定のカスタムユーザーアクション (タップ、クリック、スクロール) を追跡することができます。

`Global.rum` に `.tap` のような瞬間的な RUM アクションを手動で登録するには、 `.addUserAction(type:name:)` を使用します。`.scroll` のような連続した RUM アクションを登録するには、`.startUserAction(type:name:)` または `.stopUserAction(type:)` を使用します。

例:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// `UIViewController` で:

@IBAction func didTapDownloadResourceButton(_ sender: UIButton) {
    Global.rum.addUserAction(
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
    [DDGlobal.rum addUserActionWithType:DDRUMUserActionTypeTap name:name attributes:@{}];
}
```
{{% /tab %}}
{{< /tabs >}}

**注**: `.startUserAction(type:name:)` と `.stopUserAction(type:)` を使用する場合、アクション `type` は同じである必要があります。これは、RUM iOS SDK がアクションの開始と完了を一致させるために必要です。

[`DDRUMMonitor` クラス][9]で詳細およびその他のオプションをご確認ください。

### カスタムリソース

[リソースを自動追跡する](#automatically-track-network-requests)ほか、ネットワークリクエストやサードパーティプロバイダ API などの特定のカスタムリソースを追跡することも可能です。RUM リソースを手動で収集するには、`Global.rum` で次のメソッドを使用します。

- `.startResourceLoading(resourceKey:request:)`
- `.stopResourceLoading(resourceKey:response:)`
- `.stopResourceLoadingWithError(resourceKey:error:)`
- `.stopResourceLoadingWithError(resourceKey:errorMessage:)`

例:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// ネットワーククライアントで:

Global.rum.startResourceLoading(
    resourceKey: "resource-key", 
    request: request
)

Global.rum.stopResourceLoading(
    resourceKey: "resource-key",
    response: response
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// ネットワーククライアントで:

[DDGlobal.rum startResourceLoadingWithResourceKey:@"resource-key"
                                          request:request
                                       attributes:@{}];

[DDGlobal.rum stopResourceLoadingWithResourceKey:@"resource-key"
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
Global.rum.addError(message: "error message.")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[DDGlobal.rum addErrorWithMessage:@"error message." source:DDRUMErrorSourceCustom stack:nil attributes:@{}];
```
{{% /tab %}}
{{< /tabs >}}

詳細と使用可能なオプションについては、[`DDRUMMonitor` クラス][9]のコードドキュメントのコメントを参照してください。

## カスタムグローバル属性の追跡

RUM iOS SDK が自動的に取得する[デフォルトの RUM 属性][7]に加えて、RUM イベントにカスタム属性などのコンテキスト情報を追加して、Datadog 内の観測可能性を高めることができます。

カスタム属性を使用すると、観察されたユーザーの行動に関する情報 (カート値、マーチャント層、広告キャンペーンなど) をコードレベルの情報 (バックエンドサービス、セッションタイムライン、エラーログ、ネットワークヘルスなど) でフィルタリングおよびグループ化することができます。

### カスタムグローバル属性の設定

カスタムグローバル属性を設定するには、`Global.rum.addAttribute(forKey:value:)` を使用します。

* 属性を追加するには、`Global.rum.setAttribute(forKey: "some key", value: "some value")` を使用します。
* 値を更新するには、`Global.rum.setAttribute(forKey: "some key", value: "some other value")`を使用します。
* キーを削除するには、`Global.rum.removeAttribute(forKey: "some key")` を使用します。

### ユーザーセッションの追跡

RUM セッションにユーザー情報を追加すると、次のことが簡単になります。

* 特定のユーザーのジャーニーをたどる
* エラーの影響を最も受けているユーザーを把握する
* 最も重要なユーザーのパフォーマンスを監視する

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="RUM UI のユーザー API"  >}}

以下の属性は**任意**で、**少なくとも 1 つ**提供する必要があります。

| 属性 | タイプ   | 説明                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
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

ライブラリを初期化するよう Datadog のコンフィギュレーションを作成する際、`Datadog.Configuration.Builder` で以下のメソッドを使用できます。

`set(endpoint: DatadogEndpoint)`
: データが送信される Datadog サーバーエンドポイントを設定します。

`set(batchSize: BatchSize)`
: Datadog にアップロードされるバッチデータの希望サイズを設定します。この値は、RUM iOS SDK により実行されるリクエストのサイズと数に影響を与えます（小さいバッチの場合、リクエストは多くなりますが、各リクエストのサイズが小さくなります）。利用できる値は `.small`、`.medium`、`.large` などです。

`set(uploadFrequency: UploadFrequency)`
: Datadog へのデータアップロードの希望頻度を設定します。利用できる値は `.frequent`、`.average`、`.rare` などです。

`set(mobileVitalsFrequency: VitalsFrequency)`
: モバイルバイタルを収集する好ましい頻度を設定します。設定可能な値は以下の通りです: `.frequent` (100ms 毎)、`.average` (500ms 毎)、`.rare` (1s 毎)、`.never` (バイタル監視を無効にする)

### RUM コンフィギュレーション

`enableRUM(_ enabled: Bool)`
: RUM 機能を有効化または無効化します。

`set(rumSessionsSamplingRate: Float)`
: RUM セッションにサンプルレートを設定します。`rumSessionsSamplingRate` の値は `0.0`～`100.0` の間である必要があります。`0.0` はセッションが送信されないこと、`100.0` はすべてのセッションが Datadog に送信されることを意味します。構成されない場合、デフォルト値の `100.0` が使用されます。

`trackUIKitRUMViews(using predicate: UIKitRUMViewsPredicate)`
: `UIViewControllers` の RUM ビューとしての追跡を有効にします。パラメーター (`trackUIKitRUMViews()`) なしでこの API を呼び出して `predicate` のデフォルト実装を使用するか、アプリに合わせてカスタマイズした[独自の `UIKitRUMViewsPredicate`](#automatically-track-views) を実装します。

`trackUIKitRUMActions(using predicate: UIKitRUMUserActionsPredicate)`
: ユーザーインタラクション (タップ) を RUM アクションとして追跡できるようにします。パラメーター (`trackUIKitRUMActions()`) なしでこの API を呼び出して `predicate` のデフォルト実装を使用するか、アプリに合わせてカスタマイズした[独自の `UIKitRUMUserActionsPredicate`](#automatically-track-user-actions) を実装します。

`trackURLSession(firstPartyHosts: Set<String>)`
: `URLSession` タスク（ネットワークリクエスト）の RUM リソースとしての追跡を有効にします。パラメーター `firstPartyHosts` は、`first-party` リソース (RUM 機能が有効な場合) としてカテゴライズされ、挿入されるトレース情報を持つ（トレース機能が有効な場合）ホストを定義します。

`setRUMViewEventMapper(_ mapper: @escaping (RUMViewEvent) -> RUMViewEvent)`
: ビューのデータスクラビングコールバックを設定します。Datadog に送信される前のビューイベントの修正に使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`setRUMResourceEventMapper(_ mapper: @escaping (RUMResourceEvent) -> RUMResourceEvent?)`
: リソースのデータスクラビングコールバックを設定します。Datadog に送信される前のリソースイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`setRUMActionEventMapper(_ mapper: @escaping (RUMActionEvent) -> RUMActionEvent?)`
: アクションのデータスクラビングコールバックを設定します。Datadog に送信される前のアクションイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`setRUMErrorEventMapper(_ mapper: @escaping (RUMErrorEvent) -> RUMErrorEvent?)`
: エラーのデータスクラビングコールバックを設定します。Datadog に送信される前のエラーイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ](#modify-or-drop-rum-events)をご参照ください。

`setRUMResourceAttributesProvider(_ provider: @escaping (URLRequest, URLResponse?, Data?, Error?) -> [AttributeKey: AttributeValue]?)`
: インターセプトされたリソースのカスタム属性を提供するクロージャーを設定します。RUM iOS SDK により収集される各リソースに、`provider` クロージャーが呼び出されます。このクロージャーはタスク情報と共に呼び出され、カスタムリソース属性を返すか、属性がアタッチされない場合は `nil` を返します。

### ログのコンフィギュレーション

`enableLogging(_ enabled: Bool)`
: ロギング機能を有効化または無効化します。

### トレーシングのコンフィギュレーション

`enableTracing(_ enabled: Bool)`
: トレーシング機能を有効化または無効化します。

`setSpanEventMapper(_ mapper: @escaping (SpanEvent) -> SpanEvent)`
: スパンのデータスクラビングコールバックを設定します。Datadog に送信される前のスパンイベントの修正またはドロップに使用可能です。

### ビューの自動追跡

ビューを自動的に追跡するには (`UIViewControllers`)、RUM iOS SDK の構成時に `.trackUIKitRUMViews()` オプションを使用します。デフォルトで、ビューの名前はビューコントローラーのクラス名になります。カスタマイズするには、`.trackUIKitRUMViews(using: predicate)` を使用して、`UIKitRUMViewsPredicate` プロトコルに準拠する `predicate` の独自の実装を提供します。

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

ユーザーのタップ操作を自動的に追跡するには、RUM iOS SDK を構成するときに `.trackUIKitActions()` オプションを使用します。

### ネットワークリクエストの自動追跡

リソース (ネットワークリクエスト) を自動追跡し、最初の 1 バイトまでまたは DNS 解決などのタイミング情報を取得するには、RUM iOS SDK の構成時に `.trackURLSession()` オプションを使用して、監視する `URLSession` に `DDURLSessionDelegate` を設定します。

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

また、`.trackURLSession(firstPartyHosts:)` を使用してファーストパーティホストを構成することも可能です。これにより、RUM で一致する特定のドメインを "first party" と分類し、トレース情報をバックエンドに伝播します（トレーシング機能が有効の場合）。ネットワークトレースは、調整可能なサンプリングレートでサンプリングされます。デフォルトでは、20% のサンプリングが適用されます。

たとえば、`example.com` をファーストパーティホストとして構成し、RUM およびトレース機能の両方を有効にします。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .trackUIKitRUMViews()
        .trackURLSession(firstPartyHosts: ["example.com"])
        .set(tracingSamplingRate: 20)
        .build()
)

Global.rum = RUMMonitor.initialize()
Global.sharedTracer = Tracer.initialize()

let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

これにより、インスツルメントされた `session` と共に送信されたすべてのリクエストが追跡されます。`example.com` ドメインに一致するリクエストは "first party" とマークされ、トレース情報がバックエンドに送信されて [RUM リソースがトレースに接続されます][1]。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces?tab=browserrum

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

// ...
[builder trackUIKitRUMViews];
[builder trackURLSessionWithFirstPartyHosts:[NSSet setWithArray:@[@"example.com"]]];
[builder setWithTracingSamplingRate:20];

DDGlobal.rum = [[DDRUMMonitor alloc] init];
DDGlobal.sharedTracer = [[DDTracer alloc] initWithConfiguration:[DDTracerConfiguration new]];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

カスタム属性をリソースに追加するには、RUM iOS SDK の構成時に `.setRUMResourceAttributesProvider(_ :)` オプションを使用します。属性を提供するクロージャーを設定することで、追跡したリソースに追加の属性をアタッチして返すことができます。

たとえば、HTTP リクエストと応答ヘッダーを RUM リソースに追加できます。

```swift
.setRUMResourceAttributesProvider { request, response, data, error in
    return [
        "request.headers" : redactedHeaders(from: request),
        "response.headers" : redactedHeaders(from: response)
    ]
}
```

### エラーの自動追跡

`Logger` と送信されたすべての "error" および "critical" ログは自動的に RUM エラーとして報告され、現在の RUM ビューにリンクされます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let logger = Logger.builder.build()

logger.error("message")
logger.critical("message")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDLogger *logger = [[DDLogger builder] build];
[logger error:@"message"];
[logger critical:@"message"];
```
{{% /tab %}}
{{< /tabs >}}

同様に、エラーとしてマークされたすべての終了スパンは、RUM エラーとして報告されます。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let span = Global.sharedTracer.startSpan(operationName: "operation")
// ... `error` をキャプチャ
span.setError(error)
span.finish()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
// ... capture the `error`
id<OTSpan> span = [DDGlobal.sharedTracer startSpan:@"operation"];
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
Datadog.Configuration
    .builderUsing(...)
    .setRUMViewEventMapper { viewEvent in 
        return viewEvent
    }
    .setRUMErrorEventMapper { errorEvent in
        return errorEvent
    }
    .setRUMResourceEventMapper { resourceEvent in
        return resourceEvent
    }
    .setRUMActionEventMapper { actionEvent in
        return actionEvent
    }
    .build()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

[builder setRUMViewEventMapper:^DDRUMViewEvent * _Nonnull(DDRUMViewEvent * _Nonnull viewEvent) {
    return viewEvent;
}];

[builder setRUMErrorEventMapper:^DDRUMErrorEvent * _Nullable(DDRUMErrorEvent * _Nonnull errorEvent) {
    return errorEvent;
}];

[builder setRUMResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    return resourceEvent;
}];

[builder setRUMActionEventMapper:^DDRUMActionEvent * _Nullable(DDRUMActionEvent * _Nonnull actionEvent) {
    return actionEvent;
}];

[builder build];
```
{{% /tab %}}
{{< /tabs >}}

各マッパーは `(T) -> T?` というシグネチャを持つ Swift のクロージャで、 `T` は具象的な RUM イベントの型です。これは、送信される前にイベントの一部を変更することができます。

例えば、RUM Resource の `url` に含まれる機密情報をリダクティングするには、カスタム `redacted(_:) -> String` 関数を実装して、 `RUMResourceEventMapper` で使用します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
.setRUMResourceEventMapper { resourceEvent in
    var resourceEvent = resourceEvent
    resourceEvent.resource.url = redacted(resourceEvent.resource.url)
    return resourceEvent
}
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[builder setRUMResourceEventMapper:^DDRUMResourceEvent * _Nullable(DDRUMResourceEvent * _Nonnull resourceEvent) {
    resourceEvent.resource.url = redacted(resourceEvent.resource.url);
    return resourceEvent;
}];
```
{{% /tab %}}
{{< /tabs >}}

エラー、リソース、またはアクションマッパーから `nil` を返すと、イベントが完全にドロップされます。イベントは Datadog に送信されません。ビューイベントマッパーから返された値は `nil` であってはなりません（ビューをドロップするには、`UIKitRUMViewsPredicate` の実装をカスタマイズします。詳しくは、[ビューの自動追跡](#automatically-track-views)を参照してください）。

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

## トラッキングの同意を設定（GDPR の遵守）

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
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .set(rumSessionsSamplingRate: 50.0)
        // ...
        .build()
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

// ...
[builder setWithRumSessionsSamplingRate:50];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。ネットワークが利用可能で、RUM iOS SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: ディスク上のデータは、古すぎる場合は RUM iOS SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。

## Datadog データのアップロードにカスタムプロキシを構成する

アプリがカスタムプロキシの後ろにあるデバイスで実行されている場合、RUM iOS SDK のデータアップローダーに通知して、すべてのトラッキングデータが関連するコンフィギュレーションでアップロードされるようにすることができます。

RUM iOS SDK の初期化時に、プロキシコンフィギュレーションにて指定します。

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .set(proxyConfiguration: [
            kCFNetworkProxiesHTTPEnable: true, 
            kCFNetworkProxiesHTTPPort: 123, 
            kCFNetworkProxiesHTTPProxy: "www.example.com", 
            kCFProxyUsernameKey: "proxyuser", 
            kCFProxyPasswordKey: "proxypass" 
        ])
        // ...
        .build()
)
```

{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfigurationBuilder *builder = [DDConfiguration builderWithRumApplicationID:@"<rum_application_id>"
                                                                   clientToken:@"<client_token>"
                                                                   environment:@"<environment_name>"];

// ...
[builder setWithProxyConfiguration:@{
    (NSString *)kCFNetworkProxiesHTTPEnable: @YES,
    (NSString *)kCFNetworkProxiesHTTPPort: @123,
    (NSString *)kCFNetworkProxiesHTTPProxy: @"www.example.com",
    (NSString *)kCFProxyUsernameKey: @"proxyuser",
    (NSString *)kCFProxyPasswordKey: @"proxypass"
}];

[DDDatadog initializeWithAppContext:[DDAppContext new]
                    trackingConsent:trackingConsent
                      configuration:[builder build]];
```
{{% /tab %}}
{{< /tabs >}}

詳しくは、[URLSessionConfiguration.connectionProxyDictionary][8] のドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/ja/real_user_monitoring/ios
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/data_collected
[4]: https://docs.datadoghq.com/ja/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[7]: https://docs.datadoghq.com/ja/real_user_monitoring/ios/data_collected?tab=session#default-attributes
[8]: https://developer.apple.com/documentation/foundation/urlsessionconfiguration/1411499-connectionproxydictionary
[9]: https://github.com/DataDog/dd-sdk-ios/blob/master/Sources/Datadog/DDRUMMonitor.swift