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
## 概要{#overview}

このページでは、Datadog Feature Flags SDK を使用して Android または Android TV アプリケーションをインスツルメントする方法について説明します。Datadog Feature Flags は、アプリ内の機能の可用性をリモートで制御し、安全に実験を行い、自信を持って新しいエクスペリエンスを提供するための統一された方法を提供します。

Android 用 Datadog Feature Flags SDK は、Feature Flag 管理のオープン標準である [OpenFeature][1] 上に構築されています。このガイドでは、SDK のインストール方法、Datadog プロバイダーの設定方法、およびアプリケーションでのフラグの評価方法について説明します。

<div class="alert alert-info">ほとんどのアプリケーションでは、OpenFeature API が推奨されるアプローチです。同じアプリケーション内で複数の独立した評価コンテキストが必要な場合は、「<a href="#direct-flagsclient-integration-advanced">ダイレクト FlagsClient インテグレーション</a>」を参照してください。</div>

## はじめに{#getting-started}

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

// 3. Enable Feature Flags with a bounded initialization timeout
Flags.enable(
    FlagsConfiguration.Builder()
        .initializationTimeout(2_000L)
        .build()
)

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

## インストール{#installation}

アプリケーションモジュールの `build.gradle` ファイルに Datadog Feature Flags SDK と OpenFeature Provider を Gradle 依存関係として追加します。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"
    implementation "com.datadoghq:dd-sdk-android-flags-openfeature:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

## SDK の初期化{#initialize-the-sdk}

アプリのライフサイクルのできるだけ早い段階 (通常は `Application` クラスの `onCreate()` メソッド内) で Datadog を初期化してください。これにより、すべての Feature Flags の評価とテレメトリが正しくキャプチャされるようになります。クライアントトークンの作成については、[クライアントトークン][2] を参照してください。

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

## フラグを有効にする{#enable-flags}

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

<div class="alert alert-warning">OpenFeature Kotlin SDK は、単一のグローバルプロバイダーと評価コンテキストを使用します。同じアプリ内で複数の独立した評価コンテキストが必要な場合 (例: マルチユーザーアプリで異なるユーザーの場合など) は、「<a href="#direct-flagsclient-integration-advanced">ダイレクト FlagsClient インテグレーション</a>」を参照してください。</div>

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

<div class="alert alert-info">OpenFeature 属性はフラットな <code>Value</code> プリミティブを使用する必要があります。たとえば、 <code>Value.String()</code>、<code>Value.Integer()</code>、<code>Value.Double()</code>、または <code>Value.Boolean()</code>です。ターゲティングキーは、セッション間で一貫したフラグ評価を確実に行えるよう、同一ユーザーに対して同じにすることが必要です。匿名ユーザーの場合は、たとえば <code>SharedPreferences</code>に保存される永続的な UUID を使用してください。</div>

## フラグを評価する{#evaluate-flags}

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

### 整数および倍精度数のフラグ{#integer-and-double-flags}

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

他のタイプについても同様の詳細取得メソッドである `getBooleanDetails()`、`getIntegerDetails()`、`getDoubleDetails()`、および `getObjectDetails()` が存在します。

フラグの詳細は、評価の動作をデバッグし、ユーザーが特定の値を受け取った理由を理解する上で役立ちます。

## プロバイダーイベントを監視する {#observe-provider-events}

<div class="alert alert-info">プロバイダーイベントの監視は、 <code>dd-sdk-android-flags-openfeature</code> 3.6.0 以降で利用可能です。同じバージョンを <code>dd-sdk-android-flags</code>にも使用してください。</div>

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

## フラグ評価テレメトリおよび実験参加を制御する{#control-flag-evaluation-telemetry-and-experiment-participation}

フラグ評価テレメトリのオプトアウトには、バージョン `3.16.0` 以降が必要です。Experimentation のオプトアウトには、バージョン `3.17.0` 以降が必要です。`dd-sdk-android-flags` と `dd-sdk-android-flags-openfeature` は同じバージョンを使用してください。両方の制御は独立しており、デフォルトで無効になっています。共通の概念については、「[フラグ評価と Experimentation のオプトアウト][4]」を参照してください。

### フラグ評価テレメトリを制御する{#control-flag-evaluation-telemetry}

バージョン `3.16.0` 以降では、基盤となるクライアントでテレメトリのオプトアウトを有効にします。ユーザーの設定を OpenFeature コンテキストで型付きブール値として指定します。

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.Value

val provider = FlagsClient.Builder()
    .enableEvaluationTelemetryOptOutParameter(true)
    .build()
    .asOpenFeatureProvider()
val initialContext = ImmutableContext(
    targetingKey = "user-123",
    attributes = mapOf("dd_evaluation_telemetry_opt_out" to Value.Boolean(true))
)
OpenFeatureAPI.setProviderAndWait(provider, initialContext = initialContext)
{{< /code-block >}}

コルーチンから `setProviderAndWait` を実行します。ターゲティングキーおよびその他の属性を保持したまま、`OpenFeatureAPI.setEvaluationContext` で設定を更新します。最新の設定は、保留中または失敗した割り当ての更新中を含め、テレメトリを直ちに抑制します。

ネイティブの Flags クライアントの場合は、文字列のコンテキスト属性ではなく、型付きセッターを使用してください。

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.setEvaluationTelemetryOptOut

val flagsClient = FlagsClient.Builder()
    .enableEvaluationTelemetryOptOutParameter(true)
    .build()
flagsClient.setEvaluationTelemetryOptOut(true)
{{< /code-block >}}

`setEvaluationTelemetryOptOut(false)` を呼び出してテレメトリを再開します。ユーザーまたは設定が変更されたときに、この決定を更新してください。ネイティブのターゲティングコンテキストには文字列が含まれますが、文字列の `"true"` では抑制は有効になりません。

### プロバイダーを構成する{#configure-the-provider}

Datadog を初期化し、Flags を有効にした後、クライアントを構築する前に両方の制御を構成してください。以下の例では、バージョン `3.17.0` 以降が必要です。これにより、フラグ評価テレメトリが抑制され、ユーザーは実験の割り当てから直ちに除外されます。

{{< code-block lang="kotlin" >}}
import com.datadog.android.flags.ExperimentationOptOutMode
import com.datadog.android.flags.FlagsClient
import com.datadog.android.flags.openfeature.asOpenFeatureProvider
import dev.openfeature.kotlin.sdk.ImmutableContext
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.Value

val provider = FlagsClient.Builder()
    .enableEvaluationTelemetryOptOutParameter(true)
    .experimentationOptOutMode(ExperimentationOptOutMode.IMMEDIATE)
    .build()
    .asOpenFeatureProvider()

val preferenceTimestamp = "2026-10-30T12:00:00Z" // Use the user's stored preference.
val attributes = mapOf(
    "tier" to Value.String("premium"),
    "dd_evaluation_telemetry_opt_out" to Value.Boolean(true),
    "dd_experimentation_opt_out_at" to Value.String(preferenceTimestamp)
)
OpenFeatureAPI.setProviderAndWait(
    provider,
    initialContext = ImmutableContext(targetingKey = "user-123", attributes = attributes)
)
{{< /code-block >}}

コルーチンから `setProviderAndWait` を実行します。クライアントは最初に作成した場所で構成し、これらのオプションを変更するために同じ名前のクライアントを別途作成しないでください。

有効にすると、フラグ評価のオプトアウトにより、新しい評価イベント、集計カウント、および自動 RUM フラグ注釈が抑制されます。文字列 `"true"` ではなく、`Value.Boolean(true)` を使用してください。これはフラグ値を変更したり、実験へのエクスポージャーを抑制したりするものではなく、以前に記録されたテレメトリを削除することもありません。

### 実験ポリシーを選択する{#choose-an-experimentation-policy}

| モード| 有効なオプトアウトタイムスタンプがある場合の動作|
| --- | --- |
| `ExperimentationOptOutMode.DISABLED` | タイムスタンプを無視します。これがデフォルトです。|
| `ExperimentationOptOutMode.IMMEDIATE` | すべての実験割り当てを除外します。通常の機能割り当ては引き続き利用可能です。|
| `ExperimentationOptOutMode.FUTURE_EXPERIMENTS_ONLY` | タイムスタンプ以降にアクティブ化された割り当て、またはアクティブ化メタデータがない割り当てを除外します。それ以前の割り当ては引き続き対象となります。|

「今後の実験のみ」モードでは、以前の登録状況ではなく、割り当てのアクティブ化時刻を確認します。古い割り当てによって、ユーザーが初めて割り当てられることもあります。どちらの有効モードも即座に適用されます。将来のタイムスタンプを設定しても、設定変更のスケジュールはされません。

ユーザーがオプトアウトを選択したときのタイムスタンプを保存してください。アプリケーションの再起動間や、設定を共有するクライアント間で再利用してください。`2026-10-30T12:00:00Z` のように、タイムゾーンを含む有効なタイムスタンプを使用してください。有効モードで無効なタイムスタンプが指定されると、割り当てリクエストが阻止され、評価は無効なコンテキストエラーとともにアプリケーションのデフォルト値を返します。

有効な実験モードを使用するには、選択したポリシーに対するバックエンドのサポートが必要です。コンテキストの変更中、一致する割り当てが利用可能になるまで評価はアプリケーションのデフォルトを返します。これは、コンテキストにオプトアウトのタイムスタンプがない場合にも適用されます。

バージョン `3.17.0` で `ErrorCode.INVALID_CONTEXT` が追加されました。アップグレード時には、網羅的なKotlin `when` 式を更新してください。

### 設定を更新する{#update-the-preference}

別のクライアントを作成するのではなく、既存のクライアントのコンテキストを更新してください。ターゲティングキーおよびその他のアプリケーション属性を保持してください。フラグ評価のテレメトリを再開するには、`dd_evaluation_telemetry_opt_out` をブール値 `false` に設定します。実験を再度許可するには、`dd_experimentation_opt_out_at` を削除します。

{{< code-block lang="kotlin" >}}
val updatedAttributes = attributes.toMutableMap()
updatedAttributes["dd_evaluation_telemetry_opt_out"] = Value.Boolean(false)
updatedAttributes.remove("dd_experimentation_opt_out_at")
OpenFeatureAPI.setEvaluationContext(
    ImmutableContext(targetingKey = "user-123", attributes = updatedAttributes)
)
{{< /code-block >}}

これらの制御は、アプリケーションの同意システムに代わるものではありません。割り当てリクエストや、許可された実験へのエクスポージャーには、引き続きユーザーデータが含まれる可能性があります。

## 高度な構成{#advanced-configuration}

### グローバルな構成{#global-configuration}

`Flags.enable()` API は、以下にリストされているオプションで構成を任意に設定できます。これらの設定は、すべてのプロバイダーにグローバルに適用されます。

{{< code-block lang="kotlin" >}}
val config = FlagsConfiguration.Builder()
    .initializationTimeout(2_000L)
    // configure additional options here
    .build()

Flags.enable(config)
{{< /code-block >}}

`initializationTimeout(timeoutMs)`
: 最初の評価コンテキストが利用可能になるまで待機する最大時間 (ミリ秒)。このタイムアウトは、キャッシュされたデータの読み込み、割り当ての取得、応答の読み取りとデコード、割り当ての保存、および準備完了状態の公開を対象としています。これにより HTTP クライアントのタイムアウトは変更されません。割り当て操作はタイムアウト後も継続され、完了時にクライアントを `Ready` に移行させることができます。

このタイムアウトは、最初の `setEvaluationContext` 呼び出しにのみ適用されます。その呼び出しは、操作が失敗した場合や開始されなかった場合でも、時間が経てばタイムアウトになります。それ以降の呼び出しには初期化タイマーはありません。デフォルトは `5_000` ミリ秒です。タイムアウトを無効にするには、0 または負の値を設定します。タイムアウトが経過したとき、一致するキャッシュ済みの割り当てが利用可能であれば、クライアントは `Stale` になります。それ以外の場合は、`Error` になります。

<div class="alert alert-info"><code>initializationTimeout</code> が利用可能なのは <code>dd-sdk-android-flags</code> 3.14.0 以降です。</div>

`trackExposures()`
: `true` (デフォルト) の場合、SDK はフラグが評価されると自動的に_エクスポージャーイベント_を記録します。これらのイベントには、どのフラグにアクセスされたか、どのバリアントが提供されたか、どのようなコンテキストで提供されたかに関するメタデータが含まれています。これらは Datadog に送信されるため、後で機能の採用状況を分析できます。テレメトリなしでローカルでの評価のみが必要な場合は、: `trackExposures(false)` で無効にできます。

`rumIntegrationEnabled()`
: `true` (デフォルト) の場合、フラグ評価は RUM で追跡され、ユーザーセッションと関連付けることができます。これにより、_「バリアント B のユーザーはより多くのエラーを経験しているか」_といった分析が可能になります。アプリで RUM を使用していない場合、このフラグは影響しないため、デフォルト値のままにしておいても問題ありません。RUM インテグレーションを無効にするには、`rumIntegrationEnabled(false)` を使用してください。

`gracefulModeEnabled()`
: SDK が API の不適切な使用をどのように処理するかを制御します。たとえば、`Flags.enable()` を呼び出す前にクライアントを作成する、同じ名前で重複するクライアントを作成する、またはまだ作成されていないクライアントを取得するなどです。

  Graceful Mode の正確な動作は、ビルド構成によって異なります。

  * **リリースビルド**: SDK は常に Graceful Mode を強制します。誤用があった場合、`Datadog.setVerbosity()` が構成されていれば、内部的にログに記録されるだけです。
  * **デバッグビルド** (デフォルトの `gracefulModeEnabled = true` を使用): SDK は常にコンソールに警告を記録します。
  * **デバッグビルド** (`gracefulModeEnabled = false` を使用): SDK は API の誤用に対して `IllegalStateException` を発生させ、構成ミスを早期に検出する上で役立つフェイルファストのアプローチを強制します。

  開発フェーズや QA フェーズに応じて `gracefulModeEnabled()` を調整できます。

### プロバイダーごとの構成{#per-provider-configuration}

作成する前に、カスタムエンドポイントで個々のプロバイダーを構成できます。

{{< code-block lang="kotlin" >}}
val provider = FlagsClient.Builder()
    .useCustomFlagEndpoint("https://your-proxy.example.com/flags")
    .useCustomExposureEndpoint("https://your-proxy.example.com/exposure")
    .useCustomEvaluationEndpoint("https://your-proxy.example.com/evaluations")
    .build()
    .asOpenFeatureProvider()

OpenFeatureAPI.setProviderAndWait(provider)
{{< /code-block >}}

## ダイレクト FlagsClient インテグレーション (高度){#direct-flagsclient-integration-advanced}

ほとんどのアプリケーションでは、上記で説明した OpenFeature API が推奨されるアプローチです。ただし、OpenFeature の抽象化ではサポートされていない特定の要件がある場合は、Datadog `FlagsClient` を直接使用できます。

**FlagsClient を直接使用するのは、次の場合だけにしてください。**

- 同じアプリ内で**複数の独立した評価コンテキスト**が必要な場合 (たとえば、マルチユーザーアプリでユーザーごとに異なるコンテキストを使用する場合など)
- **ネイティブの Kotlin 型**を直接操作したい場合 (`Value.Structure` ではなく `JSONObject` を使用する)
- インスタンスごとのクライアントのライフサイクルと構成に対して**きめ細かな制御**が必要な場合

### インストール (FlagsClient){#installation-flagsclient}

ダイレクト API のみが必要な場合は、OpenFeature の依存関係を省略できます。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-flags:<latest-version>"

    // Recommended: RUM integration drives analysis and enriches RUM session data
    implementation "com.datadoghq:dd-sdk-android-rum:<latest-version>"
}
{{< /code-block >}}

### クライアントの作成と取得 (FlagsClient){#create-and-retrieve-a-client-flagsclient}

通常はアプリの起動時にクライアントを一度作成します。

{{< code-block lang="kotlin" >}}
FlagsClient.Builder().build() // Creates the default client
{{< /code-block >}}

アプリ内のどこからでも同じクライアントを取得できます。

{{< code-block lang="kotlin" >}}
val flagsClient = FlagsClient.get() // Retrieves the "default" client
{{< /code-block >}}

`name` パラメーターを指定すれば、複数のクライアントを作成および取得することもできます。

{{< code-block lang="kotlin" >}}
FlagsClient.Builder("checkout").build()
val flagsClient = FlagsClient.get("checkout")
{{< /code-block >}}

<div class="alert alert-info">指定された名前のクライアントがすでに存在する場合は、既存のインスタンスが再利用されます。</div>

### 評価コンテキストの設定 (FlagsClient){#set-the-evaluation-context-flagsclient}

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

### ダイレクトクライアントの状態変化を監視する{#observe-direct-client-state-changes}

<div class="alert alert-info"> <code>flagsClient.state</code> を使用したダイレクトクライアントの状態監視機能が利用可能なのは <code>dd-sdk-android-flags</code> 3.4.0 以降です。</div>

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

リスナーは登録時に現在の状態を受け取り、その後、将来の状態変更を受け取ります。コールバックは高速に処理し、長時間かかる作業は別のスレッドにディスパッチします。監視を行うコンポーネントが停止したときに `flagsClient.state.removeListener(listener)` を呼び出します。

### フラグの評価 (FlagsClient){#evaluate-flags-flagsclient}

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

{{% collapse-content title="整数および倍精度数のフラグ" level="h4" %}}
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

### API の比較{#api-comparison}

このテーブルは、OpenFeature API と `FlagsClient` API の主な違いを示しており、要件に合ったインテグレーションを選択するのに役立ちます。

| 機能 | **OpenFeature** | **FlagsClient** |
|---------|----------------|-----------------|
| **API 標準** | OpenFeature (ベンダーに依存しない)| Datadog 固有|
| **評価コンテキスト** | グローバル/静的 | クライアントインスタンスごと |
| **構造化フラグ** | `Value.Structure` | `JSONObject` |
| **型安全性** | OpenFeature `Value` 型 | Kotlin ネイティブ型 |
| **ベンダーロックイン** | 低い (ベンダーに依存しない) | 高い (Datadog 固有) |
| **状態管理** | フローベースの監視 | 手動リスナー登録 |

## テスト{#testing}

実際の Datadog プロバイダーを使用して専用の Datadog テスト環境に対してテストを行うか、これをインメモリの `FeatureProvider` に置き換えてテストコード内でフラグ値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。アップストリームの OpenFeature Kotlin SDK には [`InMemoryProvider`][3] が含まれていないため、テストでは小さなカスタム `FeatureProvider` が使用されます。以下の例では `OpenFeatureAPI` のプロバイダーを置き換えています。本番コードで Datadog `FlagsClient` ラッパーを直接使用している場合、テストでは `FlagsClient` ではなく、ラッパーが使用するのと同じ `OpenFeatureAPI` クライアントを通じてアサーションを行う必要があります。

テスト構成に `kotlinx-coroutines-test` を追加してください (SDK の `initialize` は `suspend` 関数です)

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

`OpenFeatureAPI` はプロセス全体のシングルトンであるため、テストで JVM を共有する場合はテストクラス間でリセットしてください。`setProviderAndWait` を `runTest { ... }` でラップしてください。これは `suspend` であるため、通常の `@Before` メソッドから呼び出すことはできません。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ja/account_management/api-app-keys/#client-tokens
[3]: https://github.com/open-feature/kotlin-sdk/pull/226

[4]: /ja/feature_flags/concepts/opt_out/