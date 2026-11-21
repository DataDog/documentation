---
aliases:
- /ja/feature_flags/setup/ios/
description: iOS および tvOS アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: /real_user_monitoring/ios/
  tag: ドキュメント
  text: iOS と tvOS のモニタリング
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: ガイド
  text: Feature Flag SDK トラフィックのプロキシ
title: iOS および tvOS の Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して iOS または tvOS アプリケーションをインスツルメントする方法について説明します。Datadog Feature Flags は、アプリ内の機能の可用性をリモートで制御し、安全に実験を行い、自信を持って新しいエクスペリエンスを提供するための統一された方法を提供します。

このガイドでは、SDK のインストールと有効化、`FlagsClient` の作成と使用、および高度なオプションの構成方法について説明します。

## インストール {#installation}

`DatadogFlags` をプロジェクトの依存関係として宣言します。推奨されるインストール方法は Swift Package Manager (SPM) です。

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}
Apple の Swift Package Manager を使用して Datadog Feature Flags SDK をインストールするには、`Package.swift`ファイルに以下を依存関係として追加します。

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
{{< /code-block >}}

プロジェクトで、以下のライブラリをリンクします。

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}
{{% /tab %}}

{{% tab "CocoaPods" %}}
[CocoaPods][1] を使用して Datadog Feature Flags SDK をインストールするには、`Podfile`で以下の Pod を宣言します。

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}

[1]: https://cocoapods.org/
{{% /tab %}}

{{% tab "Carthage" %}}
[Carthage][1] を使用して Datadog Feature Flags SDK をインストールするには、`Cartfile`に `dd-sdk-ios` を追加します。

{{< code-block lang="swift" >}}
github "DataDog/dd-sdk-ios"
{{< /code-block >}}

**注**: Datadog は、ビルド済みの Carthage バイナリを提供していません。つまり、Carthage はソースから SDK をビルドします。SDK をビルドして統合するには、以下を実行してください。

{{< code-block lang="bash" >}}
carthage bootstrap --use-xcframeworks --no-use-binaries
{{< /code-block >}}

ビルド後、以下の XCFramework を Xcode プロジェクト ({{< ui >}}Frameworks, Libraries, and Embedded Content{{< /ui >}} セクション) に追加してください。

{{< code-block lang="swift" >}}
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogFlags.xcframework
{{< /code-block >}}

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

## SDK の初期化 {#initialize-the-sdk}

アプリのライフサイクルの早い段階 (通常は `application(_:didFinishLaunchingWithOptions:)` 内、SwiftUI アプリの場合は `@UIApplicationDelegateAdaptor` を使用) で Datadog を初期化してください。これにより、すべての Feature Flags の評価とテレメトリが確実に正しくキャプチャされるようになります。クライアントトークンの作成については、[クライアントトークン][2] を参照してください。

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

## フラグを有効にする {#enable-flags}

Datadog の初期化後に、`Flags` を有効にして現在の Datadog iOS SDK インスタンスにアタッチし、クライアントの作成とフラグ評価の準備を行います。

{{< code-block lang="swift" >}}
import DatadogFlags

Flags.enable()
{{< /code-block >}}

構成オブジェクトを渡すこともできます。[高度な構成](#advanced-configuration)を参照してください。

## クライアントの作成と取得{#create-and-retrieve-a-client}

通常はアプリの起動時にクライアントを一度作成します。

{{< code-block lang="swift" >}}
FlagsClient.create() // Creates the default client
{{< /code-block >}}

アプリ内のどこからでも同じクライアントを取得できます。

{{< code-block lang="swift" >}}
let flagsClient = FlagsClient.shared() // Retrieves the "default" client
{{< /code-block >}}

`name`パラメーターを指定することで、複数のクライアントを作成および取得することもできます。

{{< code-block lang="swift" >}}
FlagsClient.create(name: "checkout")
let flagsClient = FlagsClient.shared(named: "checkout")
{{< /code-block >}}

<div class="alert alert-info">指定された名前のクライアントがすでに存在する場合は、既存のインスタンスが再利用されます。</div>

## 評価コンテキストを設定する {#set-the-evaluation-context}

`FlagsEvaluationContext` を使用して、フラグの評価が誰または何に適用されるかを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用されるユーザー情報やセッション情報が含まれます。適切なターゲティングを確実に行うため、フラグを評価する前にこのメソッドを呼び出してください。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

{{< code-block lang="swift" >}}
flagsClient.setEvaluationContext(
    FlagsEvaluationContext(
        targetingKey: "user-123",
        attributes: [
            "email": .string("user@example.com"),
            "tier":  .string("premium")
        ]
    )
)
{{< /code-block >}}

このメソッドは、非同期にサーバーからフラグの割り当てを取得します。オプションの完了コールバックを提供するか、async/await バリアントを使用することで、コンテキスト評価の結果を処理できます。

{{< code-block lang="swift" >}}
do {
    try await flagsClient.setEvaluationContext(evaluationContext)
    // Context set successfully
} catch {
    print("Failed to set context: \(error)")
}
{{< /code-block >}}

## フラグを評価する {#evaluate-flags}

`FlagsClient` を作成してその評価コンテキストを設定した後に、アプリ全体でフラグ値の読み取りを開始できます。フラグの評価は_ローカルで即座に_行われます。SDK はローカルにキャッシュされたデータを使用するため、フラグを評価する際にネットワークリクエストは発生しません。これにより、メインスレッドで安全に評価を実行できます。

各フラグは_キー_ (一意の文字列) によって識別され、想定されるタイプの値を返す_タイプ指定されたゲッター_ で評価できます。フラグが存在しない場合や評価できない場合、SDK は提供されたデフォルト値を返します。

### ブールフラグ {#boolean-flags}

オン/オフや真/偽の条件を表すフラグには、`getBooleanValue(key:defaultValue:)` を使用します:たとえば、次のようになります。

{{< code-block lang="swift" >}}
let isNewCheckoutEnabled = flagsClient.getBooleanValue(
    key: "checkout.new",
    defaultValue: false
)

if isNewCheckoutEnabled {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### 文字列フラグ {#string-flags}

複数のバリアントや構成文字列を選択するフラグには、`getStringValue(key:defaultValue:)` を使用します。たとえば、次のようになります。

{{< code-block lang="swift" >}}
let theme = flagsClient.getStringValue(
    key: "ui.theme",
    defaultValue: "light"
)

switch theme {
case "light":
    setLightTheme()
case "dark":
    setDarkTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### 整数およびダブルフラグ {#integer-and-double-flags}

数値フラグの場合、`getIntegerValue(key:defaultValue:)` または `getDoubleValue(key:defaultValue:)` を使用します。これらは、機能が制限、パーセンテージ、乗数などの数値パラメーターに依存する場合に適しています。

{{< code-block lang="swift" >}}
let maxItems = flagsClient.getIntegerValue(
    key: "cart.items.max",
    defaultValue: 20
)

let priceMultiplier = flagsClient.getDoubleValue(
    key: "pricing.multiplier",
    defaultValue: 1.0
)
{{< /code-block >}}

### オブジェクトフラグ {#object-flags}

構造化データや JSON のようなデータには `getObjectValue(key:defaultValue:)` を使用してください。このメソッドは `AnyValue` を返します。これはプリミティブ、配列、または辞書を表すことができます。オブジェクトフラグは、複数のプロパティをまとめて提供する必要があるリモート構成シナリオで役立ちます。たとえば、次のようになります。

{{< code-block lang="swift" >}}
let config = flagsClient.getObjectValue(
    key: "ui.config",
    defaultValue: .dictionary([
        "color": .string("#00A3FF"),
        "fontSize": .integer(14)
    ])
)
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値に加えて詳細情報が必要な場合は、`get<Type>Details` メソッドを使用します。これらのメソッドは、評価された値とその評価を説明するメタデータの両方を返します。

* `getBooleanDetails(key:defaultValue:) -> FlagDetails<Bool>`
* `getStringDetails(key:defaultValue:) -> FlagDetails<String>`
* `getIntegerDetails(key:defaultValue:) -> FlagDetails<Int>`
* `getDoubleDetails(key:defaultValue:) -> FlagDetails<Double>`
* `getObjectDetails(key:defaultValue:) -> FlagDetails<AnyValue>`

たとえば、次のようになります。

{{< code-block lang="swift" >}}
let details = flagsClient.getStringDetails(
    key: "paywall.layout",
    defaultValue: "control"
)

print(details.value)    // Evaluated value (for example: "A", "B", or "control")
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.error)    // The error that occurred during evaluation, if any
{{< /code-block >}}

フラグの詳細は、評価の動作をデバッグし、ユーザーが特定の値を受け取った理由を理解する上で役立つことがあります。

## 状態の変化を監視する{#observe-state-changes}

<div class="alert alert-info">状態の監視 ( <code>FlagsClient.state</code> を使用) は <code>dd-sdk-ios</code> 3.11.0 以降で利用可能です。</div>

`flagsClient.state` を使用して、`FlagsClient` がフラグを評価する準備ができているかどうかを確認し、その状態が変化したときに対応するようにします。状態の変化は、`setEvaluationContext` を呼び出し、SDK がそのコンテキストの割り当てを取得したときに発生します。

{{< code-block lang="swift" >}}
final class FeatureFlagStateObserver: FlagsStateListener {
    func flagsStateDidChange(_ newState: FlagsClientState) {
        switch newState {
        case .notReady:
            // The client has not loaded assignments yet.
            break
        case .reconciling:
            // The client is fetching assignments for a context change.
            break
        case .ready:
            // Assignments are loaded and available for evaluation.
            break
        case .stale:
            // Cached assignments are available, but the latest fetch failed.
            break
        case .error:
            // No assignments are available for evaluation.
            break
        }
    }
}

let observer = FeatureFlagStateObserver()
flagsClient.state.addListener(observer)

let currentState = flagsClient.state.currentState
{{< /code-block >}}

更新を受け取る間は、リスナーへの強力な参照を保持してください。リスナーは登録時に現在の状態を受け取り、その後、将来の状態変更を受け取ります。

## OpenFeature を使用する場合:{#use-with-openfeature}

上記の例では、Datadog の `FlagsClient` API を直接使用しています。[OpenFeature](https://openfeature.dev/) 標準 API を使用する場合、Datadog は`FlagsClient` をラップし、`OpenFeatureAPI.shared` を介してそれを公開する iOS 用 OpenFeature プロバイダーを提供しています。どちらのインターフェイスでも同じフラグデータが提供されます。アプリに適した API を選択してください。

<div class="alert alert-info">iOS OpenFeature ブリッジ (<a href="https://github.com/DataDog/dd-openfeature-provider-swift"><code>dd-openfeature-provider-swift</code></a>) は、1.0 より前のパッケージとして利用できます。1.0 に達するまでは、バージョン更新に破壊的変更が含まれる可能性があります。OpenFeature を介して統合する場合はこのセクションを使用してください。最も安定した iOS API サーフェスには <code>FlagsClient</code> を直接使用してください。</div>

### OpenFeature プロバイダーのインストール {#install-the-openfeature-provider}

`dd-openfeature-provider-swift` を `Package.swift` に追加します。

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/DataDog/dd-openfeature-provider-swift.git", .upToNextMajor(from: "0.2.0"))
{{< /code-block >}}

`DatadogOpenFeatureProvider` 製品をアプリターゲットにリンクします。このブリッジは OpenFeature Swift SDK 0.3.0 に依存しています。

### OpenFeature の初期化 {#initialize-openfeature}

[SDK の初期化](#initialize-the-sdk)で説明するように、Datadog を初期化して Flags を有効にします。次に `DatadogProvider` を作成して `OpenFeatureAPI.shared` に登録します。

{{< code-block lang="swift" >}}
import DatadogCore
import DatadogFlags
import DatadogOpenFeatureProvider
import OpenFeature

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .{{< region-param key="dd_datacenter_lowercase" code="true" >}},
        service: "<service name>"
    ),
    trackingConsent: .granted
)

Flags.enable()

let context = MutableContext(targetingKey: "user-123")
let provider = DatadogProvider()
await OpenFeatureAPI.shared.setProviderAndWait(provider: provider, initialContext: context)
{{< /code-block >}}

`setProviderAndWait` は `async` であり、例外をスローしません。このメソッドが戻ったら、プロバイダーの準備が完了しており、フラグ評価ではキャッシュされた値が使用されます。

### 評価コンテキストを設定する {#set-the-evaluation-context-1}

評価コンテキストは、フラグの評価が誰または何に適用されるかを示します。上記のようにプロバイダー登録時に渡すか、後で更新します。

{{< code-block lang="swift" >}}
let updatedContext = MutableContext(
    targetingKey: "user-123",
    structure: MutableStructure(attributes: [
        "email": Value.string("user@example.com"),
        "tier":  Value.string("premium")
    ])
)

await OpenFeatureAPI.shared.setEvaluationContextAndWait(evaluationContext: updatedContext)
{{< /code-block >}}

`targetingKey` はパーセンテージロールアウトのランダム化対象であり、同じキーは特定のフラグに対して常に同じバリアントを受け取ります。

### {#evaluate-flags-1}フラグを評価する

グローバルな OpenFeature クライアントを取得し、型付きゲッターを呼び出します。

{{< code-block lang="swift" >}}
let client = OpenFeatureAPI.shared.getClient()

let isNewCheckoutEnabled = client.getBooleanValue(key: "checkout.new", defaultValue: false)

let theme = client.getStringValue(key: "ui.theme", defaultValue: "light")

let maxItems = client.getIntegerValue(key: "cart.items.max", defaultValue: 20)

let priceMultiplier = client.getDoubleValue(key: "pricing.multiplier", defaultValue: 1.0)

let config = client.getObjectValue(
    key: "ui.config",
    defaultValue: Value.structure([
        "color": Value.string("#00A3FF"),
        "fontSize": Value.integer(14)
    ])
)
{{< /code-block >}}

評価は同期的に行われ、メインスレッドで実行しても安全です。SDK のローカルキャッシュから読み取るため、ネットワークリクエストは発生しません。`getIntegerValue` は `Int64` を返すことに注意してください。必要に応じて、呼び出しサイトで `Int` にキャストしてください。

### フラグ評価の詳細 {#flag-evaluation-details-1}

値の他に、理由、バリアント、または評価エラーが必要な場合は、`get<Type>Details` メソッドを使用します。

{{< code-block lang="swift" >}}
let details = client.getStringDetails(key: "paywall.layout", defaultValue: "control")

print(details.value)    // Evaluated value
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Reason (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode) // Error code, if evaluation failed
{{< /code-block >}}

### プロバイダーイベントを監視する {#observe-provider-events}

<div class="alert alert-info">Datadog OpenFeature プロバイダーのプロバイダーイベント監視は、 <code>dd-openfeature-provider-swift</code> 0.2.0 以降で利用可能です。バージョン 0.2.0 は <code>dd-sdk-ios</code> 3.13.0 以降に依存しています。</div>

OpenFeature プロバイダーイベントに対応するには、`OpenFeatureAPI.shared.observe()` を使用します。Datadog OpenFeature プロバイダーは、基盤となる `FlagsClient` の状態に基づいて、`.ready`、`.stale`、および `.error` を出力します。OpenFeature SDK は、評価コンテキストが変更されたときに `.reconciling` や `.contextChanged` などのライフサイクルイベントを出力することもできます。

{{< code-block lang="swift" >}}
import Combine
import OpenFeature

final class FeatureFlagEventObserver {
    private var cancellable: AnyCancellable?

    func startObserving() {
        cancellable = OpenFeatureAPI.shared.observe().sink { event in
            guard let event else {
                return
            }

            switch event {
            case .ready:
                // The provider is ready to evaluate flags.
                break
            case .stale:
                // Cached assignments are available, but they may be out of date.
                break
            case .error(_, _):
                // The provider cannot evaluate flags.
                break
            case .reconciling:
                // The provider is reconciling after a context change.
                break
            case .contextChanged:
                // The context change completed.
                break
            case .configurationChanged:
                // The provider configuration changed.
                break
            }
        }
    }
}
{{< /code-block >}}

## 高度な構成 {#advanced-configuration}

`Flags.enable()` API は、以下にリストされているオプションで構成を任意に設定できます。

{{< code-block lang="swift" >}}
var config = Flags.Configuration()
Flags.enable(with: config)
{{< /code-block >}}

`trackExposures`
:  `true` (デフォルト) の場合、SDK はフラグが評価されると自動的に_エクスポージャーイベント_を記録します。これらのイベントには、どのフラグにアクセスされたか、どのバリアントが提供されたか、どのようなコンテキストで提供されたかに関するメタデータが含まれています。これらは Datadog に送信されるため、後で機能の採用状況を分析できます。テレメトリなしでローカルでの評価のみが必要な場合は、このオプションを無効にできます

`rumIntegrationEnabled`
: `true` (デフォルト) の場合、フラグ評価は RUM で追跡され、ユーザーセッションと関連付けることができます。これにより、_「バリアント B のユーザーはより多くのエラーを経験しているか」_といった分析が可能になります。アプリで RUM を使用していない場合、このフラグは影響しないため、デフォルト値のままにしておいても問題ありません。

`gracefulModeEnabled`
: SDK が `FlagsClient` API の不適切な使用をどのように処理するかを制御します。たとえば、`Flags.enable()` を呼び出す前にクライアントを作成する、同じ名前で重複するクライアントを作成する、またはまだ作成されていないクライアントを取得する場合などです。

  Graceful Mode の正確な動作は、ビルド構成によって異なります。

  * **リリースビルド**: SDK は常に Graceful Mode を強制します: 誤用があった場合、`Datadog.verbosityLevel` が構成されていれば、内部的にログにのみ記録されます。
  * **デバッグビルド** (デフォルトの `gracefulModeEnabled = true` を使用): SDK は常にコンソールに警告を記録します。
  * **デバッグビルド** (`gracefulModeEnabled = false` を使用): SDK は誤った API 使用に対して `fatalError` を発生させ、構成ミスを早期に検出する上で役立つフェイルファストのアプローチを強制します。

  開発フェーズや QA フェーズに応じて `gracefulModeEnabled` を調整できます。

`customFlagsEndpoint`
: フラグの割り当てを取得するためのカスタムサーバー URL を構成します。

`customExposureEndpoint`
: フラグのエクスポージャーデータを送信するためのカスタムサーバー URL を構成します。

`customEvaluationEndpoint`
: フラグ評価テレメトリを送信するためのカスタムサーバー URL を構成します。

`customFlagsHeaders`
: `customFlagsEndpoint` へのリクエストに付加する追加の HTTP ヘッダーを設定します。独自のフラグサービスを利用する場合の、認証やルーティングに役立ちます。

## テスト {#testing}

上記の例では、Datadog の `FlagsClient` API を直接使用しています。[OpenFeature](https://openfeature.dev/) ブリッジを使用する場合や、OpenFeature API に関連するテストを作成する場合は、コードにより制御されるフラグ値をインメモリプロバイダーに置き換えます。

専用の Datadog テスト環境に対してテストするには、実際の `DatadogProvider` を使用するか、これをインメモリの `FeatureProvider` に置き換えてテストコード内で直接フラグ値を制御できます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。OpenFeature Swift SDK には [`InMemoryProvider`][3] が付属していないため、テストでは代わりに小さいカスタム `FeatureProvider` を使用します。

{{< code-block lang="swift" >}}
import Combine
import OpenFeature
import XCTest
@testable import MyApp

// Minimal in-memory provider for tests. Copy into your test target.
final class InMemoryTestProvider: FeatureProvider {
    var hooks: [any Hook] = []
    var metadata: ProviderMetadata = Metadata(name: "in-memory-test")
    private let subject = CurrentValueSubject<ProviderEvent?, Never>(.ready)
    private let bools: [String: Bool]
    private let strings: [String: String]

    init(bools: [String: Bool] = [:], strings: [String: String] = [:]) {
        self.bools = bools
        self.strings = strings
    }

    func observe() -> AnyPublisher<ProviderEvent?, Never> { subject.eraseToAnyPublisher() }

    func initialize(initialContext: EvaluationContext?) async throws {}

    func onContextSet(oldContext: EvaluationContext?, newContext: EvaluationContext) async throws {}

    func getBooleanEvaluation(key: String, defaultValue: Bool, context: EvaluationContext?) throws -> ProviderEvaluation<Bool> {
        ProviderEvaluation(value: bools[key] ?? defaultValue, variant: bools[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) throws -> ProviderEvaluation<String> {
        ProviderEvaluation(value: strings[key] ?? defaultValue, variant: strings[key] == nil ? "default" : "static", reason: Reason.staticReason.rawValue)
    }

    func getIntegerEvaluation(key: String, defaultValue: Int64, context: EvaluationContext?) throws -> ProviderEvaluation<Int64> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) throws -> ProviderEvaluation<Double> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    func getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) throws -> ProviderEvaluation<Value> {
        ProviderEvaluation(value: defaultValue, variant: "default", reason: Reason.staticReason.rawValue)
    }

    private struct Metadata: ProviderMetadata { var name: String? }
}

final class CheckoutFlagTests: XCTestCase {
    override func tearDown() {
        OpenFeatureAPI.shared.clearProvider()
    }

    func testNewCheckoutEnabled() async throws {
        let provider = InMemoryTestProvider(bools: ["new-checkout-flow": true])
        await OpenFeatureAPI.shared.setProviderAndWait(provider: provider)

        let client = OpenFeatureAPI.shared.getClient()
        XCTAssertTrue(client.getBooleanValue(key: "new-checkout-flow", defaultValue: false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI.shared` はグローバルシングルトンであるため、あるテストのフラグが別のテストに漏洩しないように、`tearDown` 内で `clearProvider()` を呼び出してください。`setProviderAndWait(provider:)` は `async` であり、例外をスローしないため、`try` は不要です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/account_management/api-app-keys/#client-tokens