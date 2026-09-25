---
aliases:
- /ja/feature_flags/setup/android/
description: OpenFeature 標準 API を使用して、Android および Android TV アプリケーション用の Datadog Feature
  Flags をセットアップします。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイドの Feature Flags
- link: https://openfeature.dev/docs/reference/technologies/client/kotlin/
  tag: 外部
  text: OpenFeature Kotlin SDK
- link: /real_user_monitoring/android/
  tag: ドキュメント
  text: Android および Android TV のモニタリング
- link: /feature_flags/guide/proxy_sdk_traffic/
  tag: ガイド
  text: Feature Flag SDK トラフィックのプロキシ
title: Android および Android TV の Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して Android または Android TV アプリケーションをインスツルメントする方法について説明します。Datadog Feature Flags は、アプリ内の機能の可用性をリモートで制御し、安全に実験を行い、自信を持って新しいエクスペリエンスを提供するための統一された方法を提供します。

Android 用 Datadog Feature Flags SDK は、Feature Flag 管理のオープン標準である [OpenFeature][1] 上に構築されています。このガイドでは、SDK のインストール方法、Datadog プロバイダーの設定方法、およびアプリケーションでのフラグの評価方法について説明します。

<div class="alert alert-info">ほとんどのアプリケーションでは、OpenFeature API が推奨されるアプローチです。同じアプリケーション内で複数の独立した評価コンテキストが必要な場合は、<a href="#direct-flagsclient-integration-advanced">Direct FlagsClient Integration</a> を参照してください。</div>

## はじめに {#getting-started}

Android アプリで Feature Flags を機能させるための最小限の例を以下に示します。

```kotlin
// 1. Add dependencies (see Installation section)

// 2. Initialize the Datadog Android SDK (in Application.onCreate)
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()
Datadog.initialize(this, configuration, TrackingConsent.GRANTED)

// 3. Enable Feature Flags
Flags.enable()

// 4. Create and set up the OpenFeature provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()
OpenFeatureAPI.setProviderAndWait(provider)

// 5. Set evaluation context (who is the user)
OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf("tier" to Value.String("premium"))
    )
)

// 6. Evaluate flags anywhere in your app
val client = OpenFeatureAPI.getClient()
val isEnabled = client.getBooleanValue("my-feature", false)
```

このガイドの残りの部分では、各ステップについて詳しく説明します。

## インストール {#installation}

アプリケーションモジュールの `build.gradle` ファイルに Datadog Feature Flags SDK と OpenFeature Provider を Gradle 依存関係として追加します。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"
    implementation "com.datadoghq:dd-sdk-android-flags-openfeature:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## SDK の初期化 {#initialize-the-sdk}

アプリのライフサイクルの早い段階 (通常は `Application` クラスの `onCreate()` メソッド内) で Datadog を初期化してください。これにより、すべての Feature Flags の評価とテレメトリが正しくキャプチャされるようになります。クライアントトークンの作成については、[クライアントトークン][2] を参照してください。

```kotlin
val configuration = Configuration.Builder(
    clientToken = "<CLIENT_TOKEN>",
    env = "<ENV_NAME>",
    variant = "<APP_VARIANT_NAME>"
)
    .useSite(DatadogSite.{{< region-param key="dd_site_name" code="true" >}})
    .build()

Datadog.initialize(this, configuration, TrackingConsent.GRANTED)
```

## フラグを有効にする {#enable-flags}

Datadog を初期化した後、`Flags` を有効にして現在の Datadog Android SDK インスタンスにアタッチし、プロバイダーの作成とフラグ評価の準備を行います。

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.Flags

Flags.enable()
{{< /code-block >}}

構成オブジェクトを渡すこともできます。[高度な構成](#advanced-configuration)を参照してください。

## プロバイダーを作成および構成する {#create-and-configure-the-provider}

`FlagsClient` を作成し、`asOpenFeatureProvider()` 拡張機能を使って OpenFeature プロバイダーに変換します。アプリの起動時に 1 回実行してください。

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

// Create and configure the provider
val provider = FlagsClient.Builder().build().asOpenFeatureProvider()

// Set it as the OpenFeature provider
OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

<div class="alert alert-info">OpenFeature プロバイダーは Datadog を <code>FlagsClient</code> 内部的にラップします。これは実装の詳細です。一度設定すれば、標準の OpenFeature API のみを通じて操作できます。</div>

<div class="alert alert-warning">OpenFeature Kotlin SDK は、単一のグローバルプロバイダーと評価コンテキストを使用します。同じアプリ内で複数の独立した評価コンテキストが必要な場合 (例: マルチユーザーアプリで異なるユーザーの場合など) は、<a href="#direct-flagsclient-integration-advanced">Direct FlagsClient Integration</a> を参照してください。</div>

## 評価コンテキストを設定する {#set-the-evaluation-context}

`ImmutableContext` を使用して、フラグの評価が誰または何に適用されるかを定義します。評価コンテキストには、どのフラグバリエーションを返すかを決定するために使用されるユーザー情報やセッション情報が含まれます。適切なターゲティングを確実に行うため、フラグを評価する前にこれを設定してください。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.Value

OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to Value.String("user@example.com"),
            "tier" to Value.String("premium")
        )
    )
)
{{< /code-block >}}

<div class="alert alert-info">OpenFeature 属性はフラットな <code>Value</code> プリミティブを使用する必要があります。例: <code>Value.String()</code>、<code>Value.Integer()</code>、<code>Value.Double()</code>、または <code>Value.Boolean()</code>。ターゲティングキーは、セッション間で一貫したフラグ評価を確実に行えるよう、同一ユーザーに対して一貫性を持たせる必要があります。匿名ユーザーの場合は、たとえば以下に保存される永続的な UUID を使用してください。 <code>SharedPreferences</code>。</div>

## フラグを評価する {#evaluate-flags}

プロバイダーと評価コンテキストを設定した後、アプリ全体でフラグの値を読み取ることができます。フラグの評価は_ローカルで即座に_行われます。SDK はローカルにキャッシュされたデータを使用するため、フラグを評価する際にネットワークリクエストは発生しません。これにより、メインスレッドで安全に評価を実行できます。

各フラグは_キー_ (一意の文字列) によって識別され、想定されるタイプの値を返すタイプ指定されたメソッドで評価できます。フラグが存在しない場合や評価できない場合、SDK は提供されたデフォルト値を返します。

まず、OpenFeature クライアントを取得します。

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI

val client = OpenFeatureAPI.getClient()
{{< /code-block >}}

### ブールフラグ {#boolean-flags}

ブールフラグは、オン/オフまたは真/偽の条件を表します。

{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = client.getBooleanValue(
    key = "checkout.new",
    defaultValue = false
)

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### 文字列フラグ {#string-flags}

文字列フラグは、複数のバリアントや構成文字列から選択します。

{{< code-block lang="kotlin" >}}
val theme = client.getStringValue(
    key = "ui.theme",
    defaultValue = "light"
)

when (theme) {
    "light" -> setLightTheme()
    "dark" -> setDarkTheme()
    else -> setLightTheme()
}
{{< /code-block >}}

### 整数およびダブルフラグ {#integer-and-double-flags}

数値フラグは、機能が制限、パーセンテージ、乗数などの数値パラメーターに依存する場合に適しています。

{{< code-block lang="kotlin" >}}
val maxItems = client.getIntegerValue(
    key = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = client.getDoubleValue(
    key = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}

### 構造化フラグ {#structured-flags}

構造化フラグは、JSON のようなデータとして複数のプロパティをまとめて提供する必要があるリモート構成シナリオで役立ちます。

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.Value

val config = client.getObjectValue(
    key = "ui.config",
    defaultValue = Value.Structure(mapOf(
        "color" to Value.String("#00A3FF"),
        "fontSize" to Value.Integer(14)
    ))
)

// Access nested values
val color = config.asStructure()?.get("color")?.asString()
val fontSize = config.asStructure()?.get("fontSize")?.asInteger()
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値以上の情報が必要な場合は、評価された値、バリアント名、理由、エラーコードなど、詳細な評価メタデータを取得できます。

{{< code-block lang="kotlin" >}}
val details = client.getStringDetails(
    key = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Reason for this value (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.errorCode)  // Error code, if any
{{< /code-block >}}

他のタイプについても同様の詳細取得メソッドが存在します。`getBooleanDetails()`、`getIntegerDetails()`、`getDoubleDetails()`、および `getObjectDetails()`。

フラグの詳細は、評価の動作をデバッグし、ユーザーが特定の値を受け取った理由を理解する上で役立ちます。

## プロバイダーイベントを監視する {#observe-provider-events}

<div class="alert alert-info">プロバイダーイベントの監視は、 <code>dd-sdk-android-flags-openfeature</code> 3.6.0 以降で利用可能です。同じバージョンを <code>dd-sdk-android-flags</code>に使用してください。</div>

プロバイダーの状態変化に対応するには、`OpenFeatureAPI.observe()` を使用してください。Datadog OpenFeature プロバイダーは、基盤となる `FlagsClient` の状態に基づいて、`ProviderReady`、`ProviderStale`、および `ProviderError` を出力します。

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.launch

val stateJob = lifecycleScope.launch {
    OpenFeatureAPI.observe<OpenFeatureProviderEvents>()
        .catch {
            // Handle Flow collection errors.
        }
        .collect { event ->
            when (event) {
                is OpenFeatureProviderEvents.ProviderReady -> {
                    // The provider is ready to evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderStale -> {
                    // Cached assignments are available, but they may be out of date.
                }
                is OpenFeatureProviderEvents.ProviderError -> {
                    // The provider cannot evaluate flags.
                }
                is OpenFeatureProviderEvents.ProviderConfigurationChanged -> {
                    // The provider configuration changed.
                }
                else -> {
                    // Handle other OpenFeature provider events as needed.
                }
            }
        }
}
{{< /code-block >}}

監視コンポーネントが停止したときに収集ジョブをキャンセルしてください。たとえば、Android の `Activity` または `Fragment` で `lifecycleScope` から、あるいは `ViewModel` の `viewModelScope` から収集します。

## 高度な構成 {#advanced-configuration}

### グローバルコンフィギュレーション {#global-configuration}

`Flags.enable()` API は、以下にリストされているオプションで構成を任意に設定できます。これらの設定は、すべてのプロバイダーにグローバルに適用されます。

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    // configure options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`trackExposures()`
:  `true` (デフォルト) の場合、SDK はフラグが評価されると自動的に_エクスポージャーイベント_を記録します。これらのイベントには、どのフラグにアクセスされたか、どのバリアントが提供されたか、どのようなコンテキストで提供されたかに関するメタデータが含まれています。これらは Datadog に送信されるため、後で機能の採用状況を分析できます。テレメトリなしでローカルでの評価のみが必要な場合は以下で無効にできます: `trackExposures(false)`。

`rumIntegrationEnabled()`
: `true` (デフォルト) の場合、フラグ評価は RUM で追跡され、ユーザーセッションと関連付けることができます。これにより、_「バリアント B のユーザーはより多くのエラーを経験しているか」_といった分析が可能になります。アプリで RUM を使用していない場合、このフラグは影響しないため、デフォルト値のままにしておいても問題ありません。RUM インテグレーションを無効にするには、`rumIntegrationEnabled(false)` を使用してください。

`gracefulModeEnabled()`
: SDK が API の不適切な使用をどのように処理するかを制御します。たとえば、`Flags.enable()` を呼び出す前にクライアントを作成する、同じ名前で重複するクライアントを作成する、またはまだ作成されていないクライアントを取得する場合などです。

  Graceful Mode の正確な動作は、ビルド構成によって異なります。

  * **リリースビルド**: SDK は常に Graceful Mode を強制します。誤用があった場合、`Datadog.setVerbosity()` が構成されていれば、内部的にログにのみ記録されます。
  * **デバッグビルド** (デフォルトの `gracefulModeEnabled = true` を使用): SDK は常にコンソールに警告を記録します。
  * **デバッグビルド** (`gracefulModeEnabled = false` を使用): SDK は誤った API 使用に対して `IllegalStateException` を発生させ、構成ミスを早期に検出する上で役立つフェイルファストのアプローチを強制します。

  開発フェーズや QA フェーズに応じて `gracefulModeEnabled()` を調整できます。

### プロバイダーごとの構成 {#per-provider-configuration}

個々のプロバイダーを作成する前に、カスタムエンドポイントで構成できます。

{{< code-block lang="kotlin" >}}
val provider = FlagsClient.Builder()
    .useCustomFlagEndpoint("https://your-proxy.example.com/flags")
    .useCustomExposureEndpoint("https://your-proxy.example.com/exposure")
    .useCustomEvaluationEndpoint("https://your-proxy.example.com/evaluations")
    .build()
    .asOpenFeatureProvider()

OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

## Direct FlagsClient インテグレーション (高度) {#direct-flagsclient-integration-advanced}

ほとんどのアプリケーションでは、上記で説明した OpenFeature API が推奨されるアプローチです。ただし、OpenFeature の抽象化ではサポートされていない特定の要件がある場合は、Datadog `FlagsClient` を直接使用できます。

**FlagsClient を直接使用するのは次のような場合のみにしてください。**

- 同じアプリ内で**複数の独立した評価コンテキスト**が必要な場合 (例: マルチユーザーアプリでユーザーごとに異なるコンテキストを使用する場合など)
- **ネイティブ Kotlin タイプ**を直接扱いたい場合 (`JSONObject` ではなく `Value.Structure`)
- クライアントのライフサイクルとインスタンスごとの構成に対して**きめ細かい制御**が必要な場合

### インストール (FlagsClient) {#installation-flagsclient}

直接 API のみが必要な場合は、OpenFeature の依存関係を省略できます。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

### クライアントの作成と取得 (FlagsClient) {#create-and-retrieve-a-client-flagsclient}

通常はアプリの起動時にクライアントを一度作成します。

{{< code-block lang="kotlin" >}}
FlagsClient.Builder().build() // Creates the default client
{{< /code-block >}}

アプリ内のどこからでも同じクライアントを取得できます。

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.get() // Retrieves the "default" client
{{< /code-block >}}

`name`パラメーターを指定することで、複数のクライアントを作成および取得することもできます。

{{< code-block lang="kotlin" >}}
FlagsClient.Builder("checkout").build()
val flagsClient = FlagsClient.get("checkout")
{{< /code-block >}}

<div class="alert alert-info">指定された名前のクライアントがすでに存在する場合は、既存のインスタンスが再利用されます。</div>

### 評価コンテキスト (FlagsClient) を設定する {#set-the-evaluation-context-flagsclient}

{{< code-block lang="kotlin" >}}
flagsClient.setEvaluationContext(
    EvaluationContext(
        targetingKey = "user-123",
        attributes = mapOf(
            "email" to "user@example.com",
            "tier" to "premium"
        )
    )
)
{{< /code-block >}}

このメソッドは、バックグラウンドで非同期にサーバーからフラグの割り当てを取得します。この操作は非ブロッキングで、スレッドセーフです。フラグの更新は、バックグラウンド操作が完了した後の後続の評価で利用可能になります。

### ダイレクトクライアントの状態変更を監視する {#observe-direct-client-state-changes}

<div class="alert alert-info"> <code>flagsClient.state</code> によるダイレクトクライアントの状態監視は <code>dd-sdk-android-flags</code> 3.4.0 以降で利用可能です。</div>

`flagsClient.state` を使用して、現在のダイレクトクライアントの状態をチェックするか、状態変更のリスナーを登録します。

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsStateListener
import com.datadog.android.flags.model.FlagsClientState

val listener = object : FlagsStateListener {
    override fun onStateChanged(newState: FlagsClientState) {
        when (newState) {
            FlagsClientState.NotReady -> {
                // The client has not loaded assignments yet.
            }
            FlagsClientState.Reconciling -> {
                // The client is fetching assignments for a context change.
            }
            FlagsClientState.Ready -> {
                // Assignments are loaded and available for evaluation.
            }
            FlagsClientState.Stale -> {
                // Cached assignments are available, but the latest fetch failed.
            }
            is FlagsClientState.Error -> {
                // No assignments are available for evaluation.
            }
        }
    }
}

flagsClient.state.addListener(listener)

val currentState = flagsClient.state.getCurrentState()
{{< /code-block >}}

リスナーは登録時に現在の状態を受け取り、その後、将来の状態変更を受け取ります。コールバックは高速に処理し、長時間かかる作業は別のスレッドにディスパッチしてください。監視コンポーネントが停止するときに `flagsClient.state.removeListener(listener)` を呼び出してください。

### フラグの評価 (FlagsClient) {#evaluate-flags-flagsclient}

{{% collapse-content title="ブールフラグ" level="h4" %}}
{{< code-block lang="kotlin" >}}
val isNewCheckoutEnabled = flagsClient.resolveBooleanValue(
    flagKey = "checkout.new",
    defaultValue = false
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="文字列フラグ" level="h4" %}}
{{< code-block lang="kotlin" >}}
val theme = flagsClient.resolveStringValue(
    flagKey = "ui.theme",
    defaultValue = "light"
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="整数およびダブルフラグ" level="h4" %}}
{{< code-block lang="kotlin" >}}
val maxItems = flagsClient.resolveIntValue(
    flagKey = "cart.items.max",
    defaultValue = 20
)

val priceMultiplier = flagsClient.resolveDoubleValue(
    flagKey = "pricing.multiplier",
    defaultValue = 1.0
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="構造化フラグ" level="h4" %}}
{{< code-block lang="kotlin" >}}
import org.json.JSONObject

val config = flagsClient.resolveStructureValue(
    flagKey = "ui.config",
    defaultValue = JSONObject().apply {
        put("color", "#00A3FF")
        put("fontSize", 14)
    }
)
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="フラグ評価の詳細" level="h4" %}}
{{< code-block lang="kotlin" >}}
val details = flagsClient.resolve(
    flagKey = "paywall.layout",
    defaultValue = "control"
)

print(details.value)      // Evaluated value (for example: "A", "B", or "control")
print(details.variant)    // Variant name, if applicable
print(details.reason)     // Description of why this value was chosen
print(details.errorCode)  // The error that occurred during evaluation, if any
{{< /code-block >}}
{{% /collapse-content %}}

### API の比較 {#api-comparison}

このテーブルは、OpenFeature および `FlagsClient` API の主な違いを強調しており、要件に合ったインテグレーションを選択する上で役立ちます。

| Feature | **OpenFeature** | **FlagsClient** |
|---------|----------------|-----------------|
| **API 標準** | OpenFeature (ベンダーニュートラル) | Datadog 固有 |
| **評価コンテキスト** | グローバル/静的 | クライアントインスタンスごと |
| **構造化フラグ** | `Value.Structure` | `JSONObject` |
| **タイプの安全性** | OpenFeature `Value` タイプ | Kotlin ネイティブタイプ |
| **ベンダーロックイン** | 低 (ベンダーニュートラル) | 高 (Datadog 固有) |
| **状態管理** | フローに基づく監視 | 手動リスナー登録 |

## テスト {#testing}

Datadog の実際のプロバイダーを使用して専用の Datadog テスト環境に対してテストを行うか、インメモリの `FeatureProvider` に置き換えてテストコード内でフラグ値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。アップストリームの OpenFeature Kotlin SDK には [`InMemoryProvider`][3] が付属していないため、テストでは小さいカスタム `FeatureProvider` を使用します。以下の例では `OpenFeatureAPI` のプロバイダーを置き換えています。本番コードで Datadog `FlagsClient` ラッパーを直接使用している場合、テストではラッパーが使用するのと同じ `OpenFeatureAPI` クライアントを通じてアサートを行う必要があり、`FlagsClient` を通じて行ってはいけません。

テスト構成に `kotlinx-coroutines-test` を追加します (SDK の `initialize` は `suspend` 関数です)。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    testImplementation 'org.jetbrains.kotlinx:kotlinx-coroutines-test:1.8.1'
}
{{< /code-block >}}

{{< code-block lang="kotlin" >}}
import dev.openfeature.kotlin.sdk.*
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.Test
import kotlin.test.assertTrue

class FakeProvider(private val flags: Map<String, Any>) : FeatureProvider {
    override val hooks = emptyList<Hook<*>>()
    override val metadata = object : ProviderMetadata { override val name = "fake" }
    private val events = MutableSharedFlow<OpenFeatureProviderEvents>(replay = 1)

    override suspend fun initialize(initialContext: EvaluationContext?) {
        // No-op. The SDK emits ProviderReady after initialize returns.
    }
    override fun shutdown() {}
    override suspend fun onContextSet(old: EvaluationContext?, new: EvaluationContext) {}

    override fun getBooleanEvaluation(key: String, defaultValue: Boolean, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Boolean) ?: defaultValue)
    override fun getStringEvaluation(key: String, defaultValue: String, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? String) ?: defaultValue)
    override fun getIntegerEvaluation(key: String, defaultValue: Int, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Int) ?: defaultValue)
    override fun getDoubleEvaluation(key: String, defaultValue: Double, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Double) ?: defaultValue)
    override fun getObjectEvaluation(key: String, defaultValue: Value, context: EvaluationContext?) =
        ProviderEvaluation(value = (flags[key] as? Value) ?: defaultValue)

    override fun observe(): Flow<OpenFeatureProviderEvents> = events
}

class CheckoutFlagsTest {
    private lateinit var client: Client

    @Before
    fun setUp() = runTest {
        OpenFeatureAPI.setProviderAndWait(
            FakeProvider(mapOf("new-checkout-flow" to true))
        )
        client = OpenFeatureAPI.getClient()
    }

    @Test
    fun newCheckoutEnabled() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false))
    }
}
{{< /code-block >}}

`OpenFeatureAPI` はプロセス全体のシングルトンであるため、テストで JVM を共有する場合はテストクラス間でリセットしてください。`setProviderAndWait` を `runTest { ... }` でラップします。`suspend` であるため、通常の `@Before` メソッドから呼び出すことはできません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://github.com/open-feature/kotlin-sdk/pull/226