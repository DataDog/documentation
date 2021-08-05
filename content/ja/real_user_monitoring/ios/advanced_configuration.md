---
title: RUM iOS の高度なコンフィギュレーション
kind: documentation
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-ios'
    tag: Github
    text: dd-sdk-ios ソースコード
  - link: /real_user_monitoring
    tag: ドキュメント
    text: Datadog Real User Monitoring
---
まだ SDK をインストールしていない場合は、[アプリ内セットアップ手順][1]に従うか、[iOS RUM セットアップドキュメント][2]を参照してください。

## ユーザーセッションの充実

iOS RUM は、ユーザーアクティビティ、画面、エラー、ネットワークリクエストなどの属性を自動的に追跡します。RUM イベントおよびデフォルト属性については、[RUM データ収集ドキュメント][3]をご参照ください。カスタムイベントを追跡することで、ユーザーセッション情報を充実させ、収集された属性をより細かく制御することが可能になります。

### カスタムビュー

[ビューを自動追跡する][4]ほか、特定のさまざまなビューがインタラクティブに確認できるようになると追跡することも可能になります (viewControllers)。ビューが確認できなくなったら、`Global.rum` で以下のメソッドを使用して追跡を停止します。

- `.startView(viewController:)`
- `.stopView(viewController:)`

例:
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
`DDRUMMonitor` クラスで詳細およびその他のオプションをご確認ください。

### 独自のパフォーマンスタイミングを追加

RUM のデフォルト属性に加えて、`addTiming(name:)` API を使用して、アプリケーションが時間を費やしている場所を測定できます。タイミング測定は、現在の RUM ビューの開始を基準にしています。たとえば、ヒーロー画像が表示されるまでにかかる時間を計ることができます。

```swift
func onHeroImageLoaded() {
    Global.rum.addTiming(name: "hero_image")
} 
```

タイミングが送信されると、タイミングは `@view.custom_timings.<timing_name>` (たとえば `@view.custom_timings.hero_image`) としてアクセス可能になります。RUM 分析またはダッシュボードでグラフを作成する前に、[メジャーを作成][5]する必要があります。


### カスタムアクション

[アクションを自動追跡する][6]ほか、`addUserAction(type:name:)` で特定のカスタムユーザーアクション（タップ、クリック、スクロールなど）を追跡することも可能です。`Global.rum` に瞬間的な RUM アクション (例: `.tap`) を手動で登録するには、次を使用します。
- `.addUserAction(type:name:)`

または、継続的な RUM アクション (例: `.scroll`) の場合は、次を使用します。
- `.startUserAction(type:name:)`
- `.stopUserAction(type:)`

例:
```swift
// `UIViewController` で:

@IBAction func didTapDownloadResourceButton(_ sender: Any) {
    Global.rum.addUserAction(
        type: .tap,
        name: (sender as? UIButton).currentTitle ?? "",
    )
}
```

**注**: `.startUserAction(type:name:)` と `.stopUserAction(type:)` を使用する場合、アクション `type` は同じである必要があります。これは、SDK がアクションの開始と完了を一致させるために必要です。

`DDRUMMonitor` クラスで詳細およびその他のオプションをご確認ください。

### カスタムリソース

[リソースを自動追跡する][7]ほか、ネットワークリクエストやサードパーティプロバイダ API などの特定のカスタムリソースを追跡することも可能です。RUM リソースを手動で収集するには、`Global.rum` で次のメソッドを使用します。
- `.startResourceLoading(resourceKey:request:)`
- `.stopResourceLoading(resourceKey:response:)`
- `.stopResourceLoadingWithError(resourceKey:error:)`
- `.stopResourceLoadingWithError(resourceKey:errorMessage:)`

例:
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

**注**: 両方の呼び出しで `resourceKey` に使用される `String` は、呼び出すリソースに対して一意である必要があります。これは、SDK がリソースの開始と完了を一致させるために必要です。

`DDRUMMonitor` クラスで詳細およびその他のオプションをご確認ください。

### カスタムエラー

特定のエラーを追跡するには、エラーが発生したときにメッセージ、ソース、例外、追加属性で `Global.rum` に通知します。[エラー属性ドキュメント][8]をご参照ください。

```swift
Global.rum.addError(message: "error message.")
```

詳細と使用可能なオプションについては、`DDRUMMonitor` クラスのコードドキュメントのコメントを参照してください。


## カスタムグローバル属性の追跡

モバイル SDK により自動的に取得される[デフォルトの RUM 属性][11]に加えて、カスタム属性などのコンテキスト情報を RUM イベントに追加し、Datadog 内の可観測性を強化することも可能です。カスタム属性により、コードレベルの情報（バックエンドサービス、セッションタイムライン、エラーログ、ネットワークの状態など）を利用して、観察されたユーザー行動（カート内の金額、マーチャントティア、広告キャンペーンなど）を分類することができます。

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

```swift
Datadog.setUserInfo(id: "1234", name: "John Doe", email: "john@doe.com")
```

## 初期化パラメーター

ライブラリを初期化するよう Datadog のコンフィギュレーションを作成する際、`Datadog.Configuration.Builder` で以下のメソッドを使用できます。

`set(endpoint: DatadogEndpoint)`
: データが送信される Datadog サーバーエンドポイントを設定します。

`set(batchSize: BatchSize)`
: Datadog にアップロードされるバッチデータの希望サイズを設定します。この値は、SDK により実行されるリクエストのサイズと数に影響を与えます（小さいバッチの場合、リクエストは多くなりますが、各バッチのサイズが小さくなります）。利用できる値は `.small`、`.medium`、`.large` です。

`set(uploadFrequency: UploadFrequency)`
: Datadog へのデータアップロードの希望頻度を設定します。利用できる値は `.frequent`、`.average`、`.rare` です。

### RUM コンフィギュレーション

`enableRUM(_ enabled: Bool)`
: RUM 機能を有効化または無効化します。

`set(rumSessionsSamplingRate: Float)`
: RUM セッションにサンプルレートを設定します。`rumSessionsSamplingRate` の値は `0.0`～`100.0` の間である必要があります。`0.0` はセッションが送信されないこと、`100.0` はすべてのセッションが Datadog に送信されることを意味します。構成されない場合、デフォルト値の `100.0` が使用されます。

`trackUIKitRUMViews(using predicate: UIKitRUMViewsPredicate)`
: `UIViewControllers` の RUM ビューとしての追跡を有効にします。パラメーター (`trackUIKitRUMViews()`) なしでこの API を呼び出して `predicate` のデフォルト実装を使用するか、アプリに合わせてカスタマイズした[独自の `UIKitRUMViewsPredicate`][4] を実装します。

`trackUIKitActions(_ enabled: Bool)`
: ユーザーインタラクション（タップ）の RUM アクションとしての追跡を有効にします。

`trackURLSession(firstPartyHosts: Set<String>)`
: `URLSession` タスク（ネットワークリクエスト）の RUM リソースとしての追跡を有効にします。パラメーター `firstPartyHosts` は、`first-party` リソースとしてカテゴライズされ、挿入されるトレース情報を持つ（トレース機能が有効な場合）ホストを定義します。

`setRUMViewEventMapper(_ mapper: @escaping (RUMViewEvent) -> RUMViewEvent)`
: ビューのデータスクラビングコールバックを設定します。Datadog に送信される前のビューイベントの修正に使用可能です。詳しくは、[RUM イベントの修正またはドロップ][9]をご参照ください。

`setRUMResourceEventMapper(_ mapper: @escaping (RUMResourceEvent) -> RUMResourceEvent?)`
: リソースのデータスクラビングコールバックを設定します。Datadog に送信される前のリソースイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ][9]をご参照ください。

`setRUMActionEventMapper(_ mapper: @escaping (RUMActionEvent) -> RUMActionEvent?)`
: アクションのデータスクラビングコールバックを設定します。Datadog に送信される前のアクションイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ][9]をご参照ください。

`setRUMErrorEventMapper(_ mapper: @escaping (RUMErrorEvent) -> RUMErrorEvent?)`
: エラーのデータスクラビングコールバックを設定します。Datadog に送信される前のエラーイベントの修正またはドロップに使用可能です。詳しくは、[RUM イベントの修正またはドロップ][9]をご参照ください。

`setRUMResourceAttributesProvider(_ provider: @escaping (URLRequest, URLResponse?, Data?, Error?) -> [AttributeKey: AttributeValue]?)`
: インターセプトされたリソースのカスタム属性を提供するクロージャーを設定します。SDK により収集される各リソースに、`provider` クロージャーが呼び出されます。このクロージャーはタスク情報と共に呼び出され、カスタムリソース属性を返すか、属性がアタッチされない場合は `nil` を返します。

### ログのコンフィギュレーション

`enableLogging(_ enabled: Bool)`
: ロギング機能を有効化または無効化します。

### トレーシングのコンフィギュレーション

`enableTracing(_ enabled: Bool)`
: トレーシング機能を有効化または無効化します。

`setSpanEventMapper(_ mapper: @escaping (SpanEvent) -> SpanEvent)`
: スパンのデータスクラビングコールバックを設定します。Datadog に送信される前のスパンイベントの修正またはドロップに使用可能です。

### ビューの自動追跡

ビューを自動的に追跡するには (`UIViewControllers`)、SDK の構成時に `.trackUIKitRUMViews()` オプションを使用します。デフォルトで、ビューの名前はビューコントローラーのクラス名になります。カスタマイズするには、`.trackUIKitRUMViews(using: predicate)` を使用して、`UIKitRUMViewsPredicate` プロトコルに準拠する `predicate` の独自の実装を提供します。

```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```

`rumView(for:)` 実装内で、アプリは特定の `UIViewController` インスタンスが RUM ビューを開始 (値を返す) またはしない (`nil` を返す) ことを決定する必要があります。`RUMView` の戻り値は `name` を指定する必要があり、作成された RUM ビューに追加の `attributes` を提供する場合があります。

たとえば、述語を構成して、アプリの各ビューコントローラーに明示的なタイプチェックを使用できます。
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

アプリのアーキテクチャに基づき、さらに動的なソリューションを使用することも可能です。たとえば、ビューコントローラーが一定して `accessibilityLabel` を使用する場合、アクセシビリティラベルの値別にビューに名前を付けることができます。
```swift
class YourCustomPredicate: UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView? {
        if let accessibilityLabel = viewController.accessibilityLabel {
            return .init(name: accessibilityLabel)
        } else {
            return nil
        }
    }
}
```

**注**: SDK は、アプリの実行中に何度も `rumView(for:)` を呼び出します。実装をすばやく、シングルスレッドにすることをおすすめします。

### ネットワークリクエストの自動追跡

リソース (ネットワークリクエスト) を自動追跡し、最初の 1 バイトまでまたは DNS 解決などのタイミング情報を取得するには、SDK の構成時に `.trackURLSession()` オプションを使用して、監視する `URLSession` に `DDURLSessionDelegate` を設定します。
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

また、`.trackURLSession(firstPartyHosts:)` を使用してファーストパーティホストを構成することも可能です。これにより、RUM で一致する特定のドメインを "first party" と分類し、トレース情報をバックエンドに伝播します（トレーシング機能が有効の場合）。

たとえば、`example.com` をファーストパーティホストとして構成し、RUM およびトレース機能の両方を有効にします。
```swift
Datadog.initialize(
    // ...
    configuration: Datadog.Configuration
        .builderUsing(/* ... */)
        .trackUIKitRUMViews()
        .trackURLSession(firstPartyHosts: ["example.com"])
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
これにより、インスツルメントされた `session` と共に送信されたすべてのリクエストが追跡されます。`example.com` ドメインに一致するリクエストは "first party" とマークされ、トレース情報がバックエンドに送信されて [RUM リソースがトレースに接続されます][10]。

カスタム属性をリソースに追加するには、SDK の構成時に `.setRUMResourceAttributesProvider(_ :)` オプションを使用します。属性を提供するクロージャーを設定することで、追跡したリソースに追加の属性をアタッチして返すことができます。

たとえば、HTTP リクエストと応答ヘッダーを RUM リソースに追加できます。
```swift
.setRUMResourceAttributesProvider { request, response, data, error in
    return [
        "request.headers" : redactedHeaders(from: request),
        "response.headers" : redactedHeaders(from: response)
    ]
}

```

### RUM エラーの自動追跡

`Logger` と送信されたすべての "error" および "critical" ログは自動的に RUM エラーとして報告され、現在の RUM ビューにリンクされます。
```swift
let logger = Logger.builder.build()

logger.error("message")
logger.critical("message")
```

同様に、エラーとしてマークされたすべての終了スパンは、RUM エラーとして報告されます。
```swift
let span = Global.sharedTracer.startSpan(operationName: "operation")
// ... `error` をキャプチャ
span.setError(error)
span.finish()
```

## RUM イベントの変更または削除

Datadog に送信される前に RUM イベントの属性を変更したり、イベントを完全に削除したりするには、SDK を構成するときにイベントマッパー API を使用します。
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
各マッパーは、`(T) -> T?` のシグネチャを持つ Swift クロージャです。ここで、`T` は具体的な RUM イベントタイプです。これにより、イベントが送信される前にイベントの一部を変更できます。たとえば、RUM リソースの `url` で機密情報を編集するには、カスタムの `redacted(_:) -> String` 関数を実装し、それを `RUMResourceEventMapper` で使用します。

```swift
.setRUMResourceEventMapper { resourceEvent in
    var resourceEvent = resourceEvent
    resourceEvent.resource.url = redacted(resourceEvent.resource.url)
    return resourceEvent
}
```

エラー、リソース、またはアクションマッパーから `nil` を返すと、イベントが完全にドロップされます（Datadog に送信されません）。ビューイベントマッパーから返された値は `nil` であってはなりません（ビューをドロップするには、`UIKitRUMViewsPredicate` の実装をカスタマイズします。詳しくは、[ビューの自動追跡][4]を参照してください）。

イベントのタイプに応じて、一部の特定のプロパティのみを変更できます。

| イベントタイプ       | 属性キー                     | 説明                             |
|------------------|-----------------------------------|-----------------------------------------|
| RUMViewEvent     | `viewEvent.view.name`             | ビューの名前                        |
|                  | `viewEvent.view.url`              | ビューの URL                         |
| RUMActionEvent   | `actionEvent.action.target?.name` | アクションの名前                      |
|                  | `actionEvent.view.url`            | このアクションにリンクされているビューの URL   |
| RUMErrorEvent    | `errorEvent.error.message`        | エラーメッセージ                           |
|                  | `errorEvent.error.stack`          | エラーのスタックトレース                 |
|                  | `errorEvent.error.resource?.url`  | エラーが参照するリソースの URL |
|                  | `errorEvent.view.url`             | このエラーにリンクされているビューの URL    |
| RUMResourceEvent | `resourceEvent.resource.url`      | リソースの URL                     |
|                  | `resourceEvent.view.url`          | このリソースにリンクされているビューの URL |

## トラッキングの同意を設定（GDPR の遵守）

GDPR 規定を遵守するため、SDK は初期化時に追跡に関する同意を求めます。
`trackingConsent` の設定は以下のいずれかの値になります。

1. `.pending` - the SDK はデータの収集とバッチ処理を開始しますが、Datadog へは送信しません。SDK はバッチ処理が完了したデータをどうするかについての新たな同意値が得られるまで待機します。
2. `.granted` - SDK はデータの収集を開始し、Datadog へ送信します。
3. `.notGranted` - SDK はデータを収集しません。ログ、トレース、RUM イベントは Datadog に送信されません。 

SDK の初期化後に追跡同意値を変更するには、`Datadog.set(trackingConsent:)` API 呼び出しを使用します。
SDK は、新しい値に応じて動作を変更します。たとえば、現在の追跡同意が `.pending` の場合: 

- `.granted` に変更すると、SDK は現在および今後のすべてのデータを Datadog に送信します。
- `.notGranted` に変更すると、SDK は現在のすべてのデータを消去し、今後のデータを収集しません。

## RUM セッションのサンプリング

アプリケーションが Datadog RUM に送信するデータを制御するには、[SDK を初期化][1]し、RUM セッションのサンプリングレートを 0～100 の間に指定します。

たとえば、セッションの使用の 50% のみを維持するには、
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

## デバイスがオフラインの時のデータ送信

RUM では、ユーザーのデバイスがオフラインのときにもデータを確実に利用できます。ネットワークの状態が悪いエリアやデバイスのバッテリーが非常に少ないなどの場合でも、すべての RUM イベントは最初にローカルデバイスにバッチで格納されます。ネットワークが利用可能で、SDK がエンドユーザーのエクスペリエンスに影響を与えないようにバッテリーの残量が十分にあれば、バッチはすぐに送信されます。アプリケーションがフォアグラウンドにあるときにネットワークが利用できない場合、またはデータのアップロードが失敗した場合、バッチは正常に送信されるまで保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: ディスク上のデータは、古すぎる場合は SDK がディスク容量を使いすぎないようにするために自動的に破棄されます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/rum/application/create
[2]: /ja/real_user_monitoring/ios
[3]: /ja/real_user_monitoring/ios/data_collected
[4]: #automatically-track-views
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[6]: #automatically-track-actions
[7]: #automatically-track-network-requests
[8]: /ja/real_user_monitoring/ios/data_collected/?tab=error#error-attributes
[9]: #modify-or-drop-rum-events
[10]: https://docs.datadoghq.com/ja/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[11]: /ja/real_user_monitoring/ios/data_collected?tab=session#default-attributes