---
beta: true
dependencies:
  - 'https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection.md'
description: iOS アプリケーションから RUM データを収集します。
kind: documentation
title: iOS RUM 収集
---
[Datadog の `dd-sdk-ios` クライアント側 RUM SDK][2] を使用すると、iOS アプリケーションから Datadog へ[リアルユーザーモニタリングのデータ][1]を送信すると共に、次の機能を利用できます。

* アプリのパフォーマンスおよびデモグラフィックに関する全体像を把握。
* 最も遅いリソースを特定。
* OS およびデバイスタイプ別にエラーを分析。

## セットアップ

1. パッケージマネージャーに応じてライブラリを依存関係として宣言します。最新のベータ版については、Datadog の[リリースページ][3]を参照してください。

    {{< tabs >}}
    {{% tab "CocoaPods" %}}

[CocoaPods][4] を使用して、`dd-sdk-ios` をインストールできます。
```
pod 'DatadogSDK'
```

[4]: https://cocoapods.org/

    {{% /tab %}}
    {{% tab "Swift Package Manager (SPM)" %}}

Apple の [Swift Package Manager][5] を使用して SDK を統合するには、`Package.swift` に以下を依存関係として追加します。
```swift
.package(url: "https://github.com/DataDog/dd-sdk-ios.git", .upToNextMajor(from: "1.0.0"))
```

[5]: https://swift.org/package-manager/

    {{% /tab %}}
    {{% tab "Carthage" %}}

[Carthage][6] を使用して、`dd-sdk-ios` をインストールできます。
```
github "DataDog/dd-sdk-ios"
```

[6]: https://github.com/Carthage/Carthage

    {{% /tab %}}
    {{< /tabs >}}

2. アプリケーションコンテキストと [Datadog クライアントトークン][7]でライブラリを初期化します。セキュリティ上の理由から、クライアントトークンを使用する必要があります。API キーがクライアント側の iOS アプリケーションの IPA バイトコードで公開されてしまうため、[Datadog API キー][9]を使用して `dd-sdk-ios` ライブラリを構成することはできません。クライアントトークンの設定に関する詳細は、[クライアントトークンに関するドキュメント][7]を参照してください。また、アプリケーション ID を提供する必要があります ([RUM の使用方法ページ][8]で説明されているように、Javascript RUM アプリケーションを作成します)。

    {{< tabs >}}
    {{% tab "US" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application-id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .build()
)
```

    {{% /tab %}}
    {{% tab "EU" %}}

```swift
Datadog.initialize(
    appContext: .init(),
    configuration: Datadog.Configuration
        .builderUsing(
            rumApplicationID: "<rum_application-id>",
            clientToken: "<client_token>",
            environment: "<environment_name>"
        )
        .set(serviceName: "app-name")
        .set(endpoint: .eu)
        .build()
)
```

    {{% /tab %}}
    {{< /tabs >}}

3. RUM Monitor を構成して登録します。通常は `AppDelegate` コードで、一度だけ実行する必要があります。

    ```swift
    import Datadog

    Global.rum = RUMMonitor.initialize()
    ```

RUM SDK には、次の 2 つのインスツルメンテーション方法があります。

- 自動インスツルメンテーション (推奨) - SDK は、ビュー、リソース、アクション、エラーを自動的に追跡します。
- 手動インスツルメンテーション - コードをインスツルメントして RUM イベントを送信します。

**注**: 両方の方法を混在させることができます。

## 自動インスツルメンテーション

### RUM ビュー

RUM ビューの追跡を有効にするには、SDK を構成するときに `.trackUIKitRUMViews()` オプションを使用します。
```swift
Datadog.Configuration
   .builderUsing(...)
   .trackUIKitRUMViews()
   .build()

Global.rum = RUMMonitor.initialize()
```

RUM ビューの追跡をカスタマイズするには、`.trackUIKitRUMViews(using: predicate)` を使用し、`UIKitRUMViewsPredicate` プロトコルに準拠する `predicate` の独自の実装を提供します。
```swift
public protocol UIKitRUMViewsPredicate {
    func rumView(for viewController: UIViewController) -> RUMView?
}
```

`rumView(for:)` 実装内で、アプリは特定の `UIViewController` インスタンスが RUM ビューを開始するかどうかを決定する必要があります (この場合は `nil` を返します)。`RUMView` の戻り値は、少なくとも作成された RUM ビューの `path` を指定する必要があります。詳細については、コードドキュメントのコメントを参照してください。

**注**: SDK は、アプリの実行中に何度も `rumView(for:)` を呼び出します。predicate の実装は、SDK 呼び出しの順序に依存しないようにする必要があります。

### RUM リソース

RUM リソースの追跡を有効にするには、SDK を構成するときに `.track(firstPartyHosts:)` オプションを使用します。
```swift
Datadog.Configuration
   .builderUsing(...)
   .track(firstPartyHosts: ["your.domain.com"])
   .build()

Global.rum = RUMMonitor.initialize()
```
また、監視する `URLSession` の `delegate` として `DDURLSessionDelegate()` を割り当てます。次に例を示します。
```swift
let session = URLSession(
    configuration: .default,
    delegate: DDURLSessionDelegate(),
    delegateQueue: nil
)
```

これにより、SDK は `URLSession` のこのインスタンスから送信されたリクエストを追跡します。URL が `firstPartyHosts` と一致するリクエストは、RUM Explorer で "first party" として追加でマークされます。

### RUM アクション

RUM アクションの追跡を有効にするには、SDK を構成するときに `.trackUIKitActions()` オプションを使用します。
```
Datadog.Configuration
   .builderUsing(...)
   .trackUIKitActions()
   .build()

Global.rum = RUMMonitor.initialize()
```

これにより、SDK はアプリで発生するすべての重要なタップを追跡します。プライバシー上の理由から、オンスクリーンキーボードによるやり取りはすべて無視されます。

### RUM エラー

すべての "error" および "critical" ログは RUM エラーとして報告され、現在の RUM ビューにリンクされます。
```swift
logger.error("message")
logger.critical("message")
```

同様に、エラーとしてマークされたすべての終了した APM スパンは、RUM エラーとして報告されます。
```swift
span.setTag(key: OTTags.error, value: true)
```

## 手動インスツルメンテーション

### RUM ビュー

`Global.rum` で次のメソッドを使用して、RUM リソースを手動で収集します。
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
詳細と使用可能なオプションについては、`DDRUMMonitor` クラスのコードドキュメントのコメントを参照してください。

### RUM リソース

`Global.rum` で次のメソッドを使用して、RUM リソースを手動で収集します。
* `.startResourceLoading(resourceKey:request:)`
* `.stopResourceLoading(resourceKey:response:)`
* `.stopResourceLoadingWithError(resourceKey:error:)`
* `.stopResourceLoadingWithError(resourceKey:errorMessage:)`

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

詳細と使用可能なオプションについては、`DDRUMMonitor` クラスのコードドキュメントのコメントを参照してください。

### RUM アクション

瞬間的な RUM アクション (例: `.tap`) を手動で登録するには、次を使用します。
* `.addAction(type:name:)`

または、継続的な RUM アクション (例: `.scroll`) の場合は、次を使用します。
* `.startUserAction(type:name:)`
* および `.stopUserAction(type:)`

`Global.rum` で

例:
```swift
// `UIViewController` で:

@IBAction func didTapDownloadResourceButton(_ sender: Any) {
    Global.rum.addAction(
        type: .tap,
        name: (sender as? UIButton).currentTitle ?? "",
    )
}
```

**注**: `.startUserAction(type:name:)` と `.stopUserAction(type:)` を使用する場合、アクション `type` は同じである必要があります。これは、SDK がリソースの開始と完了を一致させるために必要です。

詳細と使用可能なオプションについては、`DDRUMMonitor` クラスのコードドキュメントのコメントを参照してください。

### RUM エラー

`Global.rum` で次のメソッドを使用して、RUM エラーを手動で収集します。
- `.addError(message:)`
- `.addError(error:)`

例:
```swift
// コードのどこでも:

Global.rum.addError(message: "error message.")
```

詳細と使用可能なオプションについては、`DDRUMMonitor` クラスのコードドキュメントのコメントを参照してください。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/data_collected/
[2]: https://github.com/DataDog/dd-sdk-ios
[3]: https://github.com/DataDog/dd-sdk-ios/releases
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[8]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/#setup
[9]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
