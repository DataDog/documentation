---
description: 統合されたオブザーバビリティ、リアルタイムメトリクス、OpenFeature 互換の段階的ロールアウトを使用して、機能のデリバリーを管理します。
further_reading:
- link: /feature_flags/client/
  tag: ドキュメント
  text: クライアントサイド SDK
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイド SDK
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: ブログ
  text: Datadog Feature Flags で、より迅速かつ安全に機能をリリース
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: ブログ
  text: 統合データを通じて、実験におけるスピードと品質を両立させる方法
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: ブログ
  text: Datadog Feature Flags はいかにしてクラウドプロバイダーの障害に対して回復力を維持するか
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: ブログ
  text: ガードレールメトリクスを活用し、リリースの監視から解放されましょう
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: ブログ
  text: すべてのチームが A/B テストを行うべき
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: ブログ
  text: 成長を鈍化させる製品シグナルのレイテンシーギャップ
site_support_id: getting_started_feature_flags
title: Feature Flags の利用を開始する
---
## 概要{#overview}

Datadog Feature Flags は、組み込みのオブザーバビリティとプラットフォーム全体でのシームレスな統合により、機能のデリバリーを管理するための強力で統合された方法を提供します。

- **リアルタイムメトリクス:** どのユーザーがどのバリアントを受け取っているか、またフラグがアプリケーションの健全性やパフォーマンスにどのような影響を与えているかを、すべてリアルタイムで把握できます。

- **一般的なフラグタイプをサポート:** ブール値、文字列、整数、数値 (浮動小数点数/倍精度浮動小数点数)、JSON バリアントを使用できます。JavaScript SDK は整数と数値の両方のバリアントに `getNumberValue()` を使用しますが、Java、Swift、Kotlin、Python では、整数と浮動小数点数の評価メソッドが個別に公開されています。

- **実験に最適:** A/B テストで特定のオーディエンスをターゲットにし、カナリアリリースで機能を段階的にロールアウトし、リグレッションが検出された場合には自動的にロールバックを行うことも可能です。

- **OpenFeature 互換:** OpenFeature 標準に基づいて構築されており、既存の OpenFeature 実装との互換性を確保し、ベンダーニュートラルな Feature Flag 管理アプローチを実現します。

## Feature Flags SDK{#feature-flags-sdks}

このガイドでは、例として JavaScript ブラウザ SDK を使用します。Datadog Feature Flags は、以下のいずれかの SDK を使用して任意のアプリケーションに統合できます。

### クライアントサイド SDK{#client-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/flutter/" src="integrations_logos/flutter_large.svg" alt="Dart and Flutter" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

### サーバーサイド SDK{#server-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

## 環境を設定する{#configure-your-environments}

組織には、開発、ステージング、本番環境用に事前設定された環境がすでに用意されていることでしょう。環境クエリ、本番環境のマーキング、および環境の管理に関する詳細については、「[環境][4]」を参照してください。

## 最初の Feature Flags を作成する{#create-your-first-feature-flag}

<div class="alert alert-info">
<a href="/feature_flags/feature_flag_mcp_server/">Feature Flags MCP Server</a> を使用して、Feature Flags を自動的に設定できます。接続後、AI エージェントに「アプリで Datadog Feature Flags を設定するのを手伝って」と指示してください。MCP サーバーがコードベースをレビューし、使用している言語やフレームワークに必要な SDK およびコードスニペットをインストールします。
</div>

### ステップ 1: SDK をインポートして初期化する{#step-1-import-and-initialize-the-sdk}

フラグが評価される環境に適した SDK を選択し、Datadog Feature Flags プロバイダーを初期化します。

{{< tabs >}}
{{% tab "JavaScript ブラウザ" %}}

プロジェクトの依存関係として、`@datadog/openfeature-browser`、`@openfeature/web-sdk`、および`@openfeature/core` をインストールします。

{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

次に、SDK を初期化するために、プロジェクトに以下を追加します。

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Browser Feature Flags は、選択された <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>{{< /site-region >}}

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
    // Required client-side Datadog credentials
    applicationId: '<APPLICATION_ID>',
    clientToken: '<CLIENT_TOKEN>',
    site: '{{< region-param key="dd_site" code="true" >}}',
    env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
    service: '<SERVICE_NAME>',
    version: '1.0.0'
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
{{< /code-block >}}

<div class="alert alert-info">ブラウザ SDK は 3 つの独立したテレメトリストリームを出力し、これらはすべてデフォルトで有効になっています。<code>enableExposureLogging</code> 評価ごとのエクスポージャーイベントをエクスポージャーインテークに送信します。<code>enableFlagEvaluationTracking</code> 集計された評価テレメトリをフラグ評価インテークに送信します。<code>enableRumFeatureFlagTracking</code> フラグ評価を RUM イベントに付加します。これは RUM の使用量に影響を与える可能性のある設定です。不要なストリームのみを無効にしてください。</div>

{{% /tab %}}
{{% tab "Node.js サーバー" %}}

`dd-trace` と OpenFeature サーバー SDK をインストールします。

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

環境変数を使用してプロバイダーを有効にします。

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

または、コード内でプロバイダーを有効にします。

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    }
  }
});

// Wait for the provider to initialize before evaluating flags.
await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

OpenFeature SDK と Datadog OpenFeature プロバイダーの依存関係を追加します。

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.63.0'
}
{{< /code-block >}}

プロバイダーを有効にし、Java トレーサーを使用してアプリケーションを起動します。

{{< code-block lang="bash" >}}
# Required: Enable the feature flagging provider
# The EXPERIMENTAL_ prefix is historical; the provider is no longer experimental.
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

フラグ評価メトリクスを出力するには、OpenTelemetry SDK の依存関係を追加し、OTLP エンドポイントを設定します。「[サーバーサイドのフラグ評価メトリクスを設定する][9]」を参照してください。

Datadog OpenFeature プロバイダーを登録します。

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

環境変数を使用してプロバイダーを有効にします。

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

Datadog Python SDK と OpenFeature SDK をインストールします。

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

Datadog OpenFeature プロバイダーを登録します。

{{< code-block lang="python" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

# Initialize the tracer (required for Remote Configuration)
tracer.configure()

# Create and register the Datadog provider
provider = DataDogProvider()
api.set_provider(provider)

# Create an OpenFeature client
client = api.get_client()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### 認証情報の概要{#credentials-at-a-glance}

| 認証情報| 使用者| 保存場所| 機密情報であるか|
| --- | --- | --- | --- |
| クライアントトークン| ブラウザ、モバイル、およびゲーム SDK| クライアントアプリケーションの設定| いいえ – 公開クライアントコードに含めても安全|
| アプリケーション ID| ブラウザおよび RUM 対応クライアント SDK| クライアントアプリケーションの設定| いいえ – 公開識別子|
| API キー| サーバーサイド Remote Configuration 用の Datadog Agent| Agent 設定のみ| はい – サーバーサイドのみに保持|

API キーをブラウザ、モバイル、またはゲームアプリケーションに埋め込まないでください。

OpenFeature SDK の設定オプションに関する詳細は、その[ドキュメント][1]を参照してください。クライアントトークンおよびアプリケーション ID の作成に関する詳細は、「[API キーとアプリケーションキー][3]」を参照してください。

### ステップ 2: Feature Flag を作成する{#step-2-create-a-feature-flag}

Datadog で [{{< ui >}}Create Feature Flag{{< /ui >}}][2] に移動し、以下を設定します。

- **名前とキー**: フラグの表示名とコード内で参照されるキー
- **SDK 配信チャネル**: フラグ設定を受け取る SDK を制御、「[配信チャネル][6]」を参照
- **バリアントタイプ**および**バリアント値**: 「[バリアントとフラグタイプ][5]」を参照

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}、{{< ui >}}variant keys{{< /ui >}}、および {{< ui >}}variant values{{< /ui >}} は、クライアント SDK に送信される場合、公開されているものとみなす必要があります。
</div>

{{< img src="getting_started/feature_flags/create-feature-flags-2.png" alt="Feature Flag を作成する" style="width:100%;" >}}

### ステップ 3: フラグを評価し、Feature Flag のコードを記述する{#step-3-evaluate-the-flag-and-write-feature-code}

アプリケーションコード内で SDK を使用してフラグを評価し、新しい機能をゲート制御します。

<div class="alert alert-warning">Datadog Feature Flags では、評価コンテキスト属性として、文字列、数値、ブール値といったフラットなプリミティブ値を使用する必要があります。ネストされたオブジェクトや配列は渡さないでください。これらはサポートされておらず、エクスポージャーデータが破棄される原因となる可能性があります。</div>

{{< tabs >}}
{{% tab "JavaScript ブラウザ" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/web-sdk';

const client = OpenFeature.getClient();

// If applicable, set relevant attributes on the client's global context
// (e.g. org id, user email)
await OpenFeature.setContext({
    org_id: 2,
    user_id: 'user-123',
    email: 'user@example.com',
    targetingKey: 'user-123'
});

// This is what the SDK returns if the flag is disabled in
// the current environment
const fallback = false;

const showFeature = await client.getBooleanValue('show-new-feature', fallback);
if (showFeature) {
    // Feature code here
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js サーバー" %}}

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const isNewCheckoutEnabled = await client.getBooleanValue(
    'new-checkout-flow', // flag key
    false, // default value
    evaluationContext, // context
);

if (isNewCheckoutEnabled) {
    showNewCheckoutFlow();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "email": "user@example.com",
        "tier": "premium"
    }
)

enabled = client.get_boolean_value("new-checkout-flow", False, eval_ctx)

if enabled:
    show_new_checkout()
else:
    show_legacy_checkout()
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

このステップを完了したら、アプリケーションを再デプロイしてこれらの変更を反映させます。その他の使用例については、上記にリンクされているプラットフォーム固有の SDK ページを参照してください。

### ステップ 4: ターゲティングルールを定義し、Feature Flag を有効にする{#step-4-define-targeting-rules-and-enable-the-feature-flag}

[ターゲティングルール][7]を設定して、どのサブジェクトが各バリアントを受け取るかを定義します。ルールを保存した後、選択した環境でフラグを有効にします。

<div class="alert alert-info">
一般的なベストプラクティスとして、本番環境の前にステージング環境で変更をロールアウトしてください。
</div>

パーセンテージベースのロールアウトについては、「[トラフィックの分割とランダム化][8]」を参照してください。

### ステップ 5: ロールアウトを監視する{#step-5-monitor-your-rollout}

Feature Flags の詳細ページから機能のロールアウトを監視します。このページでは、リアルタイムのエクスポージャー追跡や、{{< ui >}}error rate{{< /ui >}} や {{< ui >}}page load time{{< /ui >}} などのメトリクスを確認できます。フラグを使用して段階的に機能をリリースする際、Datadog UI の{{< ui >}}Real-time metric overview{{< /ui >}} パネルを表示して、その機能がアプリケーションのパフォーマンスに与える影響を確認してください。

{{< img src="getting_started/feature_flags/real-time-flag-metrics-2.png" alt="リアルタイムフラグメトリクスパネル" style="width:100%;" >}}

サーバーサイドアプリケーションの場合、フラグ評価メトリクスを有効にして、各バリアントが返される頻度を追跡し、ダッシュボードでデータをグラフ化することもできます。「[サーバーサイドのフラグ評価メトリクスを設定する][9]」を参照してください。Feature Flags データを APM トレースに添付し、フラグのバリアントごとにトレースをフィルタリングする方法については、「[Feature Flags のための APM トレースエンリッチメントの設定][10]」を参照してください。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#client-tokens
[4]: /ja/feature_flags/concepts/environments/
[5]: /ja/feature_flags/concepts/variants_and_flag_types/
[6]: /ja/feature_flags/concepts/distribution_channels/
[7]: /ja/feature_flags/concepts/targeting_rules/
[8]: /ja/feature_flags/concepts/traffic_splitting/
[9]: /ja/feature_flags/guide/server_flag_evaluation_metrics/
[10]: /ja/feature_flags/guide/apm_trace_enrichment/