---
description: Java アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
  tag: ドキュメント
  text: Java APM と分散型トレーシング
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドのフラグ評価メトリクスをセットアップする
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースのリッチ化をセットアップする
- link: /feature_flags/concepts/flag_graphs/
  tag: コンセプト
  text: Feature Flag グラフ
- link: /feature_flags/concepts/configuration_sources/
  tag: コンセプト
  text: サーバー SDK 構成ソース
title: Java Feature Flags
---
## 概要{#overview}

このページでは、Java アプリケーションに Datadog Feature Flags を追加する方法を説明します。バージョン 1.66.0 以降では、`dd-openfeature` はデフォルトで Datadog が管理する CDN から直接フラグ構成を読み込みます。この Agentless ソースは、Datadog Agent に接続できない長時間実行サーバーやサーバーレスランタイムをサポートしています。

Datadog プロバイダーは [OpenFeature](https://openfeature.dev/) 標準を実装しています。構成の配信には `dd-java-agent` が使用されます。Agentless 配信では外部の Datadog Agent が不要になりますが、`dd-java-agent` は引き続き JVM に読み込む必要があります。

Agentless Java は、フラグをローカルで評価し、実験エクスポージャーイベントと集計された Event Platform Proxy (EVP) フラグ評価イベントタイプを送信します。互換性のあるローカルテレメトリリレーを優先します。互換性のあるリレーが利用できない場合は、両方のイベントタイプを直接送信します。

## 互換性要件 {#compatibility-requirements}

デフォルトのエージェントレスセットアップには、以下が必要です。

- **Java 11 以降**
- **Datadog Java エージェント** (`dd-java-agent`、`-javaagent` で読み込み): バージョン **1.66.0** 以降
- **Datadog OpenFeature プロバイダー** (`com.datadoghq:dd-openfeature`、ビルド依存関係として追加): バージョン **1.66.0** 以降
- **OpenFeature SDK**: バージョン **1.20.1** 以降
- Datadog [**API キー**][7]
- Datadog [**サイト**][14]

`dd-java-agent` と `dd-openfeature` は同じバージョンを使用してください。Agentless 配信では、個別の Datadog Agent サービスは必要ありません。

<div class="alert alert-info">サーバーレス Java の場合、ランタイムは <code>-javaagent</code> JVM オプションをサポートしている必要があります。このオプションは、Java コマンドまたは <code>JAVA_TOOL_OPTIONS</code>を通じて渡すことができます。例については、<a href="/serverless/google_cloud_run/functions/java/?tab=maven">Cloud Run Functions</a> または <a href="/serverless/google_cloud_run/containers/in_container/java/">Cloud Run コンテナ</a> の Java セットアップを参照してください。</div>

Datadog の Java バージョンとフレームワークのサポートのリストについては、[互換性要件](/tracing/trace_collection/compatibility/java/)を参照してください。

## はじめに {#getting-started}

OpenFeature の依存関係をインストールし、JVM に Java Agent を追加します。

## インストール {#installation}

Datadog OpenFeature プロバイダーと OpenFeature SDK の依存関係が必要です。

{{< tabs >}}
{{% tab "Gradle (Groovy)" %}}
以下の依存関係を `build.gradle` に追加します。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.66.0'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle (Kotlin)" %}}
以下の依存関係を `build.gradle.kts` に追加します。

{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation("dev.openfeature:sdk:1.20.1")

    // Datadog OpenFeature Provider
    implementation("com.datadoghq:dd-openfeature:1.66.0")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
以下の依存関係を `pom.xml` に追加します。

{{< code-block lang="xml" filename="pom.xml" >}}
<dependencies>
    <!-- OpenFeature SDK for flag evaluation -->
    <dependency>
        <groupId>dev.openfeature</groupId>
        <artifactId>sdk</artifactId>
        <version>1.20.1</version>
    </dependency>

    <!-- Datadog OpenFeature Provider -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-openfeature</artifactId>
        <version>1.66.0</version>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Gradle および Maven のインストール例では、`dd-openfeature` と OpenFeature SDK の特定のバージョンが固定されています。サポートされている最小バージョンについては、[互換性要件](#compatibility-requirements)を参照してください。

フラグ評価メトリクスは、フラグ構成とは別のテレメトリパスを使用します。[サーバーサイドのフラグ評価メトリクスをセットアップする][8]を参照してください。

### JVM への Java エージェントの追加{#add-the-java-agent-to-the-jvm}

`-javaagent` JVM オプションを使用して `dd-java-agent` を読み込みます。インストール手順については、[JVM への Java SDK の追加](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-sdk-to-the-jvm)を参照してください。

ランタイムが Java コマンドを制御している場合は、`JAVA_TOOL_OPTIONS` でオプションを設定します。例については、[Cloud Run Functions][15] または [Cloud Run コンテナ][16] の Java セットアップを参照してください。

## 構成 {#configuration}

### Agentless 配信を構成する{#configure-agentless-delivery}

アプリケーションプロセスで API キー、Datadog サイト、および環境を構成してください。

{{< code-block lang="bash" >}}
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_VERSION=<YOUR_APP_VERSION>

java -javaagent:/path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

Feature Flags の有効化やソース設定は必要ありません。ポーリングを開始するには、Datadog OpenFeature プロバイダーを初期化します。

## OpenFeature プロバイダーの初期化 {#initialize-the-openfeature-provider}

アプリケーションの起動コードで Datadog OpenFeature プロバイダーを初期化します。プロバイダーは、選択されている構成ソースを開始します。

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;
import dev.openfeature.sdk.exceptions.ProviderNotReadyError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {
    private static final Logger logger = LoggerFactory.getLogger(App.class);
    private static Client client;

    public static void main(String[] args) throws Exception {
        // Initialize the Datadog provider
        logger.info("Initializing Datadog OpenFeature Provider...");
        OpenFeatureAPI api = OpenFeatureAPI.getInstance();

        try {
            // Set provider and wait for initial configuration (recommended)
            api.setProviderAndWait(new Provider());
            client = api.getClient("my-app");
            logger.info("OpenFeature provider initialized successfully");
        } catch (ProviderNotReadyError e) {
            // Handle gracefully - app will use default flag values
            logger.warn("Provider not ready (configuration unavailable), continuing with defaults", e);
            client = api.getClient("my-app");
            logger.info("App will use default flag values until provider is ready");
        } catch (Exception e) {
            logger.error("Failed to initialize OpenFeature provider", e);
            throw e;
        }

        // Your application code here
    }
}
{{< /code-block >}}

選択されているソースから初期フラグ構成が提供されるまで評価をブロックするには、`setProviderAndWait()` を使用します。これにより、アプリケーションがトラフィックの処理を開始する前にフラグが読み込まれます。デフォルトの初期化タイムアウトは 30 秒です。

`ProviderNotReadyError`は、初期化中にプロバイダーがタイムアウトするとスローされる OpenFeature SDK 例外です。これをキャッチすることで、構成の配信が利用できない場合に、デフォルトのフラグ値でアプリケーションを開始できます。キャッチされない場合、例外が伝播し、アプリケーションの起動が妨げられる可能性があります。この例外は、可用性の要件に基づいて処理してください。

### 非同期初期化{#asynchronous-initialization}

非ブロッキングの初期化を行うには、`setProvider()` を使用してプロバイダーイベントをリッスンします。

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
Client client = api.getClient();

// Listen for provider state changes
client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flags ready!");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Provider configuration is stale");
});

// Set provider asynchronously
api.setProvider(new Provider());
{{< /code-block >}}

## 評価コンテキストを設定する {#set-the-evaluation-context}

評価コンテキストは、フラグ評価の対象 (ユーザー、デバイス、セッション) を定義します。ターゲティングルールに基づいて、返されるフラグバリエーションを決定します。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性が文字列、数値、ブール値といったフラットなプリミティブ値でなければなりません。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

// Create an evaluation context with a targeting key and attributes
EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

// Use the context for flag evaluations (see next section)
{{< /code-block >}}

`targetingKey` (例: `user-123`) は、一貫したフラグ評価とパーセンテージベースのロールアウトに使用されるプライマリ識別子です。通常はユーザー ID、セッション ID、またはデバイス ID です。

## フラグを評価する {#evaluate-flags}

OpenFeature クライアントを使用して Feature Flags を評価します。すべてのフラグタイプ (Boolean、string、integer、double、object) がサポートされています。

{{< tabs >}}
{{% tab "Boolean" %}}
{{< code-block lang="java" >}}
// Simple Boolean evaluation
boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}

// Get detailed evaluation result
import dev.openfeature.sdk.FlagEvaluationDetails;

FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

logger.info("Value: {}", details.getValue());
logger.info("Variant: {}", details.getVariant());
logger.info("Reason: {}", details.getReason());
{{< /code-block >}}
{{% /tab %}}

{{% tab "文字列" %}}
{{< code-block lang="java" >}}
// Evaluate string flags (e.g., UI themes, API endpoints)
String theme = client.getStringValue("ui.theme", "light", context);

String apiEndpoint = client.getStringValue(
    "payment.api.endpoint",
    "https://api.example.com/v1",
    context
);
{{< /code-block >}}
{{% /tab %}}

{{% tab "数値" %}}
{{< code-block lang="java" >}}
// Integer flags (e.g., limits, quotas)
int maxRetries = client.getIntegerValue("retries.max", 3, context);

// Double flags (e.g., thresholds, rates)
double discountRate = client.getDoubleValue("pricing.discount.rate", 0.0, context);
{{< /code-block >}}
{{% /tab %}}

{{% tab "オブジェクト" %}}
{{< code-block lang="java" >}}
import dev.openfeature.sdk.Value;

// Evaluate object/JSON flags for complex configuration
Value config = client.getObjectValue("ui.config", new Value(), context);

// Access structured data
if (config.isStructure()) {
    Value timeout = config.asStructure().getValue("timeout");
    Value endpoint = config.asStructure().getValue("endpoint");
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## エラー処理 {#error-handling}

OpenFeature SDK はデフォルト値パターンを使用します。何らかの理由で評価が失敗した場合、指定したデフォルト値が返されます。

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ErrorCode;

// Check evaluation details for errors
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

if (details.getErrorCode() != null) {
    switch (details.getErrorCode()) {
        case FLAG_NOT_FOUND:
            logger.warn("Flag does not exist: {}", "checkout.new");
            break;
        case PROVIDER_NOT_READY:
            logger.warn("Provider not initialized yet");
            break;
        case TARGETING_KEY_MISSING:
            logger.warn("Evaluation context missing targeting key");
            break;
        case TYPE_MISMATCH:
            logger.error("Flag value type doesn't match requested type");
            break;
        default:
            logger.error("Evaluation error for flag: {}", "checkout.new", details.getErrorCode());
    }
}
{{< /code-block >}}

### 一般的なエラーコード{#common-error-codes}

| エラーコード | 説明 | 解決策 |
|------------|-------------|------------|
| `PROVIDER_NOT_READY` | 初期構成が受信されませんでした | プロバイダーが初期化されるまで待機するか、`setProviderAndWait()` | を使用します
| `FLAG_NOT_FOUND` | フラグが構成内に存在しません | フラグキーを確認するか、Datadog UI でフラグを作成します |
| `TARGETING_KEY_MISSING` | 評価コンテキストにターゲティングキーがありません | コンテキストを作成する際にターゲティングキーを指定します |
| `TYPE_MISMATCH` | フラグ値を要求された型に変換できません | フラグの型に適した評価メソッドを使用します|
| `INVALID_CONTEXT` | 評価コンテキストが null です | 有効な評価コンテキストを指定します |

## 高度な構成 {#advanced-configuration}

ソースの選択と運用設定の標準的なリファレンスとして、[サーバー SDK 構成ソース][9]を使用してください。

- [Agentless 配信を構成する][12]: ポーリング、リクエストタイムアウト、エンドポイント設定を含む
- [カスタム Agentless エンドポイントを使用する][10]: 高度なテスト、ローカル開発、またはオペレーター管理のプロキシの場合
- [Agent Remote Configuration を使用する][13]:Agent 管理配信を維持する
- [既存の Remote Configuration セットアップを移行する][11]: および非推奨の `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 設定を削除する

Agentless モードでは、Java は実験エクスポージャーイベントおよび集約されたフラグ評価イベントに対して、互換性のあるローカルテレメトリリレーを優先します。互換性のあるリレーが利用できない場合は、両方のイベントタイプを直接送信します。直接パスでは、アプリケーションの `DD_API_KEY` 設定と `DD_SITE` 設定が使用されます。Agent なしのいサーバーレス環境では、ローカルテレメトリリレーとして [`serverless-init`][17] を使用できます。

`feature_flag.evaluations` メトリクスは、[サーバーサイドフラグ評価メトリクス][8]ガイドの個別の OTLP セットアップを使用します。

利用可能なグラフ作成の詳細については、[Feature Flag グラフ](/feature_flags/concepts/flag_graphs/)を参照してください。

### カスタム初期化タイムアウト {#custom-initialization-timeout}

プロバイダーが初期構成を待機する時間を設定します。

{{< code-block lang="java" >}}
import datadog.trace.api.openfeature.Provider;
import java.util.concurrent.TimeUnit;

Provider.Options options = new Provider.Options()
    .initTimeout(10, TimeUnit.SECONDS);

api.setProviderAndWait(new Provider(options));
{{< /code-block >}}

### 構成変更イベント {#configuration-change-events}

選択した構成ソースからの更新をリッスンします。

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Flag configuration updated: {}", event.getMessage());
    // Optionally re-evaluate flags or trigger cache refresh
});
{{< /code-block >}}

`PROVIDER_CONFIGURATION_CHANGED` はオプションの OpenFeature イベントです。Datadog プロバイダーのドキュメントで、ご使用のバージョンでこのイベントがサポートされているかどうかを確認してください。

### 複数のクライアント{#multiple-clients}

名前付きクライアントを使用して、ドメインまたはチームごとにコンテキストとフラグを整理します。

{{< code-block lang="java" >}}
// Named clients share the same provider instance but can have different contexts
Client checkoutClient = api.getClient("checkout");
Client analyticsClient = api.getClient("analytics");

// Each client can have its own evaluation context
EvaluationContext checkoutContext = new MutableContext("session-abc");
EvaluationContext analyticsContext = new MutableContext("user-123");

boolean newCheckout = checkoutClient.getBooleanValue(
    "checkout.ui.new", false, checkoutContext
);

boolean enhancedAnalytics = analyticsClient.getBooleanValue(
    "analytics.enhanced", false, analyticsContext
);
{{< /code-block >}}

`Provider` インスタンスはグローバルに共有されます。クライアント名は整理の目的でのみ使用され、個別のプロバイダーインスタンスは作成されません。すべてのクライアントは、同じ基盤となる Datadog プロバイダーとフラグ構成を使用します。

## ベストプラクティス {#best-practices}

### 初期化を早期に実行する{#initialize-early}
アプリケーションのライフサイクルの早期段階 (`main()` 内またはアプリケーションの起動時など) で OpenFeature プロバイダーを初期化します。これにより、ビジネスロジックが実行される前にフラグの準備が完了しているようになります。

### 意味のあるデフォルト値を使用する{#use-meaningful-default-values}
フラグの評価が失敗した場合でも安全な動作を維持できるよう、常に適切なデフォルト値を指定してください。

{{< code-block lang="java" >}}
// Good: Safe default that maintains current behavior
boolean useNewAlgorithm = client.getBooleanValue("algorithm.new", false, context);

// Good: Conservative default for limits
int rateLimit = client.getIntegerValue("rate.limit", 100, context);
{{< /code-block >}}

### コンテキストを一度作成する{#create-context-once}
リクエスト/ユーザー/セッションごとに評価コンテキストを一度だけ作成し、すべてのフラグ評価でそのコンテキストを再利用します。

{{< code-block lang="java" >}}
// In a web filter or request handler
EvaluationContext userContext = new MutableContext(userId)
    .add("email", user.getEmail())
    .add("tier", user.getTier());

// Reuse context for all flags in this request
boolean featureA = client.getBooleanValue("feature.a", false, userContext);
boolean featureB = client.getBooleanValue("feature.b", false, userContext);
{{< /code-block >}}

フラグ評価のたびに評価コンテキストを再作成すると、不要なオーバーヘッドが発生します。リクエストライフサイクルの開始時にコンテキストを一度作成し、その後のすべてのフラグ評価にそのコンテキストを渡します。

### 初期化の失敗を処理する (オプション){#handle-initialization-failures-optional}
デフォルトのフラグ値でアプリケーションが機能する場合は、初期化の失敗を処理することを検討してください。

{{< code-block lang="java" >}}
try {
    api.setProviderAndWait(new Provider());
} catch (ProviderNotReadyError e) {
    // Log error and continue with defaults
    logger.warn("Feature flags not ready, using defaults", e);
    // Application will use default values for all flags
}
{{< /code-block >}}

機能フラグがアプリケーションの動作に不可欠な場合は、例外を伝播して起動を阻止します。

### 一貫したターゲティングキーを使用する{#use-consistent-targeting-keys}
ターゲットキーには、一貫性のある安定した識別子を使用してください。
- **推奨**: ユーザー ID、セッション ID、デバイス ID
- **非推奨**: タイムスタンプ、ランダムな値、頻繁に変更される ID

### フラグ評価を監視する{#monitor-flag-evaluation}
詳細な評価結果をロギングとデバッグに使用してください。

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("feature.critical", false, context);

logger.info("Flag: {} | Value: {} | Variant: {} | Reason: {}",
    "feature.critical",
    details.getValue(),
    details.getVariant(),
    details.getReason()
);
{{< /code-block >}}

## テスト {#testing}

実際の `DatadogProvider` を使用して専用の Datadog テスト環境に対してテストを行うか、OpenFeature の `InMemoryProvider` に置き換えてテストコード内でフラグ値を直接制御することができます。このセクションでは、テストを外部から隔離し、オフライン環境でも実行可能なインメモリ方式について説明します。`InMemoryProvider` は `dev.openfeature:sdk` に同梱されているため (すでにテストスコープの依存関係であるため)、追加のライブラリは不要です。`dev.openfeature:sdk` がまだない場合は、テスト構成にこれを追加してください。

{{< code-block lang="java" >}}
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.providers.memory.Flag;
import dev.openfeature.sdk.providers.memory.InMemoryProvider;
import java.util.Map;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CheckoutFlagTest {
    private Client client;

    @BeforeEach
    void setUp() {
        Map<String, Flag<?>> flags = Map.of(
            "new-checkout-flow", Flag.<Boolean>builder()
                .variant("on", true)
                .variant("off", false)
                .defaultVariant("on")
                .build(),
            "ui-theme", Flag.<String>builder()
                .variant("dark", "dark")
                .variant("light", "light")
                .defaultVariant("light")
                .build()
        );

        OpenFeatureAPI api = OpenFeatureAPI.getInstance();
        api.setProviderAndWait(new InMemoryProvider(flags));
        client = api.getClient();
    }

    @AfterEach
    void tearDown() {
        OpenFeatureAPI.getInstance().shutdown();
    }

    @Test
    void newCheckoutEnabledByDefault() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false));
    }

    @Test
    void missingFlagReturnsDefault() {
        assertFalse(client.getBooleanValue("does-not-exist", false));
    }
}
{{< /code-block >}}

`OpenFeatureAPI.getInstance()` はシングルトンです。常に `@AfterEach` (または同等のもの) で `shutdown()` を呼び出してください。このようにしないと、プロバイダーの状態がテストクラス間で漏洩し、スイートが不安定になる原因となります。

Spring Boot テストでは、`InMemoryProvider` を `@TestConfiguration` Bean または `@SpringBootTest` クラスの `@BeforeAll` フックで登録します。OpenFeature API シングルトンは Spring コンテキストの存続期間中保持されるため、初期化は一度だけ実行すれば十分です。

## トラブルシューティング {#troubleshooting}

**Flagging プラットフォーム**から、選択した構成ソースを経由して **Java SDK** に到達するフラグデータパスを追跡します。Agentless と Remote Configuration では要件が異なります。接続のトラブルシューティングを行う前に、アクティブなソースを検証してください。

### 1. Flagging プラットフォーム: フラグ構成を検証する{#1-flagging-platform-verify-flag-configuration}

インフラストラクチャーを確認する前に、フラグ自体が正しく設定されていることを確認してください。

1. フラグがターゲット環境に対して**有効**になっており、無効になっていないこと。フラグは各環境でデフォルトで無効になっています。
2. フラグが**正しい環境** (`DD_ENV`) をターゲットにしていること。フラグは特定のサービスをターゲットにするのではなく、有効な環境内のすべてのサービスに適用されます。
3. `DD_ENV` の値が [[{{< ui >}}Feature Flag Environments{{< /ui >}}] (機能フラグ環境)][5] に表示されること。表示されない場合、この環境はまだフラグトラフィックを受信していません。

### 2. 構成ソースを検証する{#2-verify-the-configuration-source}

#### Agentless {#agentless}

1. `dd-openfeature` および `dd-java-agent` がバージョン 1.66.0 以降であることを確認します。両方のコンポーネントで同じバージョンを使用してください。
2. JVM が `-javaagent` を使用して `dd-java-agent` を読み込んでいることを、Java コマンドまたは `JAVA_TOOL_OPTIONS` のいずれかで確認します。
3. `DD_FEATURE_FLAGS_ENABLED` が設定されていないか、または `true` に設定されていることを確認します。
4. `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless` が設定されているか、ソースおよびレガシープロバイダーの設定が行われていないことを確認します。
5. アプリケーションコードにより Datadog OpenFeature プロバイダーが初期化されることを確認します。
6. アプリケーションプロセスで `DD_API_KEY`、`DD_SITE`、および `DD_ENV` が構成されていることを確認します。
7. アプリケーションが Datadog へのアウトバウンド HTTPS リクエストを実行できることを確認します。
8. `DD_TRACE_DEBUG=true` を有効にして、Feature Flags Agentless エンドポイントからの認証、タイムアウト、または不正なペイロードに関するメッセージを確認します。

#### Agent Remote Configuration{#agent-remote-configuration}

1. `dd-openfeature` および `dd-java-agent` がバージョン 1.66.0 以降であることを確認します。両方のコンポーネントで同じバージョンを使用してください。
2. `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config` が設定されていることを確認します。移行期間中、ソースが設定されていない場合には `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` でも Remote Configuration が選択されます。
3. `DD_FEATURE_FLAGS_ENABLED` が設定されていないか、または `true` に設定されていることを確認します。
4. Agent 7.55 以降が実行されており、到達可能であることを確認します。[APM 接続エラー][2]を参照してください。
5. Agent で Remote Configuration が有効になっていることを確認します。無効になっている場合は、`datadog.yaml` で `remote_configuration.enabled: true` を設定するか、`DD_REMOTE_CONFIGURATION_ENABLED=true` を設定します。[Remote Configuration][1] を参照してください。
6. `DD_API_KEY` が Agent で有効であり、ターゲット組織に属していることを確認します。
7. `DD_SITE` が Agent で正しく設定されていることを確認します。[Agent サイトの問題][3]を参照してください。
8. `datadog-agent status` を実行し、Remote Configuration セクションを確認します。[Agent のコマンド][6]を参照してください。

### 3. SDK: Java SDK の状態を確認する{#3-sdk-verify-java-sdk-state}

#### デバッグログを有効にする{#enable-debug-logging}

Feature Flags の起動メッセージを有効にするには、`DD_TRACE_DEBUG=true` を設定します。デフォルトの Agentless ソースの場合、プロバイダーの初期化後に CDN ポーリングが開始されることを確認してください。

`remote_config` を指定すると、プロバイダーは Java エージェント内のブリッジを使用します。古いエージェントでは、必要なエージェントバージョンを示すプロバイダー初期化エラーが発生します。CDN 配信にはフォールバックしません。

#### プロバイダーの状態変化を監視する {#monitor-provider-state-changes}

プロバイダーのライフサイクルの遷移を監視するために、アプリケーション起動時の早い段階でイベントリスナーを追加します。イベントリスナーは、初期化後の接続の変化を検出します。

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flag provider is ready");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Feature flag provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Feature flag provider configuration is stale");
});

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Feature flag configuration updated");
});
{{< /code-block >}}

通常の動作後の `PROVIDER_ERROR` または `PROVIDER_STALE` イベントは、選択された構成ソースで中断が発生したことを示します。

#### プロバイダーの準備ができていない {#provider-not-ready}

プロバイダーが選択されたソースから最初の構成を受信する前にフラグ評価が試行されると、`PROVIDER_NOT_READY` が返されます。

一般的な原因:

- **非同期初期化**: `setProviderAndWait()` の代わりに `setProvider()` が使用されました。最初の構成が到着する前の評価は `PROVIDER_NOT_READY` を返します。
- **初期化タイムアウト**: `setProviderAndWait()` がタイムアウトし (デフォルトは 30 秒)、`ProviderNotReadyError` がスローされましたが、キャッチされました。アプリケーションは、最初の構成を待機している間もフラグの評価を継続します。

`PROVIDER_NOT_READY` がポーリング間隔および初期化間隔を超えて継続する場合は、選択されているソースを再度確認してください。

#### デバッグフラグ評価 {#debug-flag-evaluations}

フラグが予期しない値を返す場合は、`getBooleanValue()` の代わりに `getBooleanDetails()` を使用してください。`Details` バリアントは、プロバイダーの内部状態を公開する `FlagEvaluationDetails` オブジェクトを返します。

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("your.flag.key", false, context);

logger.info("Flag evaluation details: value={}, variant={}, reason={}, errorCode={}",
    details.getValue(),
    details.getVariant(),
    details.getReason(),
    details.getErrorCode());
{{< /code-block >}}

`reason` および `errorCode` を確認して、プロバイダーが特定の値を返した理由を理解してください。

#### 型不一致エラー {#type-mismatch-errors}

評価メソッドがフラグに設定されている型と一致しない場合には `TYPE_MISMATCH` が返されます。各フラグタイプに対して正しいメソッド (`getBooleanValue()`、`getStringValue()`、`getIntegerValue()`、`getDoubleValue()`) を使用してください。

### 4. Flagging プラットフォーム: データが Datadog に表示されることを検証する{#4-flagging-platform-verify-data-appears-in-datadog}

<div class="alert alert-warning">サポートされているテレメトリパスが構成されていない場合、Java はエクスポージャーイベントまたは <code>feature_flag.evaluations</code> メトリクスをエクスポートしません。これらが存在していない場合、構成またはローカル評価の読み込みが失敗したということではありません。</div>

#### フラグ評価メトリクス {#flag-evaluation-metrics}

フラグ評価の数は、フラグキー、結果バリアント、および評価理由でタグ付けされた `feature_flag.evaluations` カウンターメトリクスとして Datadog に表示されます。完全なセットアップガイドとトラブルシューティングの手順については、<a href="/feature_flags/guide/server_flag_evaluation_metrics/">サーバーサイドのフラグ評価メトリクスをセットアップする</a>を参照してください。

#### 実験エクスポージャー {#experiment-exposures}

選択された構成パスがエクスポージャーをサポートしている場合、エクスポージャーは実験に関連付けられたフラグに対してのみ表示されます。標準の機能フラグはエクスポージャーイベントを生成しません。エクスポージャーが欠落している場合:

1. Datadog UI で、フラグが実験に関連付けられていることを確認します。
2. Agent API キーと接続を確認します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/remote_configuration/
[2]: /ja/tracing/troubleshooting/connection_errors/
[3]: /ja/agent/troubleshooting/site/
[5]: https://app.datadoghq.com/feature-flags/settings/environments
[6]: /ja/agent/configuration/agent-commands/
[7]: /ja/account_management/api-app-keys/#api-keys
[8]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[9]: /ja/feature_flags/concepts/configuration_sources/
[10]: /ja/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[11]: /ja/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[12]: /ja/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[13]: /ja/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[14]: /ja/getting_started/site/
[15]: /ja/serverless/google_cloud_run/functions/java/?tab=maven
[16]: /ja/serverless/google_cloud_run/containers/in_container/java/
[17]: /ja/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry