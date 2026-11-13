---
description: PHP アプリケーション用に Datadog Feature Flags をセットアップします。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /tracing/trace_collection/dd_libraries/php/
  tag: ドキュメント
  text: PHP トレーシング
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: ガイド
  text: サーバーサイドの Feature Flag 評価メトリクスをセットアップする
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: ガイド
  text: Feature Flags の APM トレースのリッチ化をセットアップする
- link: /feature_flags/concepts/flag_graphs/
  tag: コンセプト
  text: Feature Flag グラフ
title: PHP Feature Flags
---
## 概要 {#overview}

このページでは、Datadog Feature Flags SDK を使用して PHP アプリケーションをインスツルメントする方法について説明します。PHP SDK は、Datadog SDK の Remote Configuration を使用して、フラグの更新をリアルタイムで受信します。

PHP SDK は、2 つのアプリケーション API を提供します。

- **Datadog PHP API**: PHP 7 または PHP 8 アプリケーションで `DDTrace\FeatureFlags\Client` を使用します。
- **OpenFeature アダプター**: [OpenFeature][1] 標準 API を使用する PHP 8 アプリケーションで `DDTrace\OpenFeature\DataDogProvider` を使用します。

フラグの評価はローカルで高速に行われます。SDK はローカルにキャッシュされた構成データを使用するため、評価中にネットワークリクエストは発生しません。

## 前提条件 {#prerequisites}

PHP Feature Flags SDK をセットアップする前に、以下の条件を満たしていることを確認してください。

- **Datadog Agent** ([Remote Configuration][2] が有効であること)
- **Datadog [API キー][3]** が Datadog Agent で構成されていること
- **Datadog PHP SDK** `datadog/dd-trace` バージョン 1.21.0 以降
- **サポートされている PHP ランタイム**: Datadog PHP API の場合は PHP 7 以降、OpenFeature アダプターの場合は PHP 8 以降
- **OpenFeature PHP SDK** `open-feature/sdk` バージョン 2.1 以降 (OpenFeature アダプターを使用する場合)

以下の環境変数を設定します。

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Required: Enable Remote Configuration in the SDK
export DD_REMOTE_CONFIG_ENABLED=true

# Required: Service identification
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_VERSION=<YOUR_APP_VERSION>

# Required for flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

<div class="alert alert-info"> <code>EXPERIMENTAL_</code> プレフィックスは後方互換性のために保持されていますが、プロバイダー自体は安定しています。</div>

必要なトレーサーのバージョンや Agent OTLP のセットアップを含む `feature_flag.evaluations` の構成については、[サーバーサイドのフラグ評価メトリクスをセットアップする][6] を参照してください。利用可能なグラフ作成の詳細については、[Feature Flag グラフ][7] を参照してください。

## インストール {#installation}

Feature Flagging は、Application Performance Monitoring (APM) によって提供されます。[PHP アプリケーションのトレース][4] に従って、Datadog PHP トレーサーをインストールおよび構成します。

PHP 8 アプリケーションで OpenFeature アダプターを使用する場合は、以下のように OpenFeature PHP SDK をインストールします。

{{< code-block lang="bash" >}}
composer require open-feature/sdk:^2.1
{{< /code-block >}}

## SDK の初期化 {#initialize-the-sdk}

PHP ランタイムとアプリケーションアーキテクチャに一致する API を選択します。

### PHP 7 および PHP 8: Datadog API {#php-7-and-php-8-datadog-api}

PHP 7 または PHP 8 アプリケーションで `DDTrace\FeatureFlags\Client` を直接使用します:

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();
{{< /code-block >}}

### PHP 8: OpenFeature アダプター {#php-8-openfeature-adapter}

PHP 8 アプリケーションでは、Datadog を OpenFeature プロバイダーとして登録できます:

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');
{{< /code-block >}}

OpenFeature プロバイダーは、Remote Configuration が初期フラグ構成を配信するまでデフォルト値を返します。ビジネスロジックがフラグを評価する前にフラグ構成が読み込まれるようにするために、アプリケーションの起動時の早い段階でプロバイダーを初期化してください。

## 評価コンテキストを設定する {#set-the-evaluation-context}

フラグのターゲティング対象となるユーザーまたはエンティティを識別する評価コンテキストを定義します。ターゲティングキーは、パーセンテージロールアウトなど、一貫したトラフィックディストリビューションに使用されます。追加の属性により、「米国のユーザーに対して有効にする」や「プレミアム層のユーザーに対して有効にする」といったターゲティングルールが可能になります。

### Datadog API {#datadog-api}

Datadog PHP API の場合、`targetingKey` キーと `attributes` キーを含む配列としてコンテキストを渡します:

{{< code-block lang="php" >}}
$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ],
];
{{< /code-block >}}

### OpenFeature アダプター {#openfeature-adapter}

OpenFeature アダプターの場合、OpenFeature PHP SDK の `EvaluationContext` を使用します:

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;

$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'email' => 'user@example.com',
        'country' => 'US',
        'tier' => 'premium',
        'age' => 25,
    ])
);
{{< /code-block >}}

<div class="alert alert-warning">評価コンテキストの属性は、文字列、数値、ブール値といったフラットなプリミティブ値である必要があります。ネストされた配列、オブジェクト、および null 値は、ターゲティングおよびエクスポージャーレポートでは無視されます。</div>

## フラグを評価する {#evaluate-flags}

クライアントを設定した後、アプリケーション全体でフラグを評価できます。各フラグは一意の文字列キーによって識別され、想定されるタイプの値を返すタイプ指定されたメソッドで評価されます。フラグが存在しない場合や評価できない場合、SDK は提供されたデフォルト値を返します。

### ブールフラグ {#boolean-flags}

オン/オフや真/偽の条件を表すフラグには、`getBooleanValue` を使用します:

{{< code-block lang="php" >}}
$enabled = $flags->getBooleanValue('new-checkout-flow', false, $context);

if ($enabled) {
    showNewCheckout();
} else {
    showLegacyCheckout();
}
{{< /code-block >}}

OpenFeature を使用する場合:

{{< code-block lang="php" >}}
$enabled = $client->getBooleanValue('new-checkout-flow', false, $context);
{{< /code-block >}}

### 文字列フラグ {#string-flags}

複数のバリアントや構成文字列を選択するフラグには、`getStringValue` を使用します:

{{< code-block lang="php" >}}
$theme = $flags->getStringValue('ui-theme', 'light', $context);

switch ($theme) {
    case 'dark':
        setDarkTheme();
        break;
    case 'light':
    default:
        setLightTheme();
        break;
}
{{< /code-block >}}

### 数値フラグ {#numeric-flags}

数値フラグの場合、`getIntegerValue` または `getFloatValue` を使用します。これらのメソッドは、機能が制限、パーセンテージ、乗数などの数値パラメーターに依存する場合に適しています。

{{< code-block lang="php" >}}
$maxItems = $flags->getIntegerValue('cart-max-items', 20, $context);

$discountRate = $flags->getFloatValue('discount-rate', 0.0, $context);
{{< /code-block >}}

### オブジェクトフラグ {#object-flags}

構造化データの場合、`getObjectValue` を使用します。これは PHP 配列を返します。

{{< code-block lang="php" >}}
$config = $flags->getObjectValue('feature-config', [
    'maxRetries' => 3,
    'timeout' => 30,
], $context);

$maxRetries = $config['maxRetries'] ?? 3;
$timeout = $config['timeout'] ?? 30;
{{< /code-block >}}

### フラグ評価の詳細 {#flag-evaluation-details}

フラグの値だけでなく詳細情報が必要な場合は、`get<Type>Details` メソッドを使用します。これらは、評価された値とその評価を説明するメタデータの両方を返します。

{{< code-block lang="php" >}}
$details = $flags->getBooleanDetails('new-feature', false, $context);

printf("Value: %s\n", $details->getValue() ? 'true' : 'false');
printf("Variant: %s\n", $details->getVariant() ?? 'none');
printf("Reason: %s\n", $details->getReason());

if ($details->isError()) {
    printf("Error Code: %s\n", $details->getErrorCode());
    printf("Error Message: %s\n", $details->getErrorMessage());
}
{{< /code-block >}}

フラグの詳細は、評価の動作をデバッグし、ユーザーが特定の値を受け取った理由を理解する上で役立ちます。

## 完全な例 {#complete-examples}

以下の例では、初期化、評価コンテキスト、タイプ付き評価、および評価の詳細を組み合わせています。

### PHP 7 および PHP 8: Datadog API {#php-7-and-php-8-datadog-api-1}

{{< code-block lang="php" >}}
<?php

use DDTrace\FeatureFlags\Client;

$flags = new Client();

$context = [
    'targetingKey' => 'user-123',
    'attributes' => [
        'country' => 'US',
        'tier' => 'premium',
    ],
];

$details = $flags->getStringDetails('checkout-copy', 'control', $context);

if ($details->isError()) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $details->getErrorCode(),
        $details->getErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

### PHP 8: OpenFeature アダプター {#php-8-openfeature-adapter-1}

{{< code-block lang="php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;
use OpenFeature\OpenFeatureAPI;

$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('checkout-service', '1.0.0');
$context = new EvaluationContext(
    'user-123',
    new Attributes([
        'country' => 'US',
        'tier' => 'premium',
    ])
);

$details = $client->getStringDetails('checkout-copy', 'control', $context);
$error = $details->getError();

if ($error !== null) {
    error_log(sprintf(
        'Flag evaluation failed: %s %s',
        $error->getResolutionErrorCode()->getValue(),
        $error->getResolutionErrorMessage()
    ));
}

if ($details->getValue() === 'treatment') {
    showTreatmentCopy();
} else {
    showControlCopy();
}
{{< /code-block >}}

## コンテキストなしの評価 {#evaluation-without-context}

評価コンテキストを指定せずにフラグを評価できます。これは、ユーザー固有のターゲティングを必要としないグローバルなフラグに役立ちます。

{{< code-block lang="php" >}}
$maintenanceMode = $flags->getBooleanValue('maintenance-mode', false);

if ($maintenanceMode) {
    http_response_code(503);
    echo 'Service temporarily unavailable';
    return;
}
{{< /code-block >}}

## テスト {#testing}

実際の Datadog プロバイダーを使用して専用の Datadog テスト環境に対してテストを行うか、ユニットテストで機能フラグの評価をテストダブルに置き換えることができます。

OpenFeature PHP SDK 2.1 には、組み込みのインメモリプロバイダーは含まれていません。ユニットテストでは、機能フラグの評価をアプリケーションインターフェイスの背後にラップし、偽の実装を注入します。

{{< code-block lang="php" filename="FeatureFlags.php" >}}
<?php

use DDTrace\FeatureFlags\Client;

interface FeatureFlagReader
{
    public function getBooleanValue($flagKey, $defaultValue, array $context = []);
}

final class DatadogFeatureFlagReader implements FeatureFlagReader
{
    private $client;

    public function __construct(Client $client = null)
    {
        $this->client = $client ?: new Client();
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return $this->client->getBooleanValue($flagKey, $defaultValue, $context);
    }
}

final class InMemoryFeatureFlagReader implements FeatureFlagReader
{
    private $flags;

    public function __construct(array $flags)
    {
        $this->flags = $flags;
    }

    public function getBooleanValue($flagKey, $defaultValue, array $context = [])
    {
        return array_key_exists($flagKey, $this->flags)
            ? (bool) $this->flags[$flagKey]
            : $defaultValue;
    }
}
{{< /code-block >}}

テストのセットアップでその偽の実装を使用します。

{{< code-block lang="php" filename="CheckoutTest.php" >}}
$flags = new InMemoryFeatureFlagReader([
    'new-checkout-flow' => true,
]);

$checkout = new CheckoutService($flags);

self::assertTrue($checkout->usesNewCheckoutFlow('user-123'));
{{< /code-block >}}

## トラブルシューティング {#troubleshooting}

### 機能フラグが常にデフォルト値を返す {#feature-flags-always-return-default-values}

機能フラグが予期せず常にデフォルト値を返す場合は、以下をチェックしてください。

- `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true` がアプリケーション環境に設定されていることを確認します。
- Datadog Agent の設定で Remote Configuration が有効になっていることを確認します。
- `DD_SERVICE` と `DD_ENV` が設定されており、フラグ用に構成されたサービスおよび環境と一致していることを確認します。
- Datadog PHP SDK のバージョンに機能フラグのサポートが含まれていることを確認します。
- PHP プロセスが Datadog Agent と通信できることをチェックします。

### OpenFeature プロバイダーが見つかりません {#openfeature-provider-not-found}

OpenFeature アダプターは、PHP 8 アプリケーションでのみ利用可能です。`DDTrace\OpenFeature\DataDogProvider` が見つからない場合:

- アプリケーションが PHP 8 以降で実行されていることを確認します。
- `open-feature/sdk` が Composer を通じてインストールされていることを確認します。
- Datadog PHP トレーサーのバージョンに機能フラグのサポートが含まれていることを確認します。

### ターゲティングルールが一致しない {#targeting-rules-do-not-match}

ターゲティングルールが想定どおりに一致しない場合:

- 評価対象のユーザー、組織、セッション、またはエンティティに対して、安定した `targetingKey` を設定します。
- Datadog API を使用する際は、`attributes` キーの下にカスタムターゲティングデータを渡します。
- フラットなプリミティブ属性のみを使用します。ネストされた配列、オブジェクト、および null 値は無視されます。
- `DD_ENV` の値が [{{< ui >}}Feature Flag Environments{{< /ui >}}][5] に表示されることを確認します。

### Datadog でフラグのメトリクスとエクスポージャーを確認します {#verify-flag-metrics-and-exposures-in-datadog}

#### フラグ評価メトリクス {#flag-evaluation-metrics}

PHP トレーサーに対して `DD_METRICS_OTEL_ENABLED=true` が設定されている場合、フラグ評価カウントが Datadog に表示されます。各評価は、フラグキー、結果バリアント、および評価理由でタグ付けされた `feature_flag.evaluations` カウンターメトリクスを出力します。このメトリクスが表示されない場合は、環境で `DD_METRICS_OTEL_ENABLED=true` が設定されていること、およびお使いの PHP トレーサーのバージョンがフラグ評価メトリクスをサポートしていることを確認します。Agent OTLP レシーバーの設定とトラブルシューティングについては、[サーバーサイドフラグ評価メトリクスをセットアップする][6] を参照してください。

#### 実験のエクスポージャー {#experiment-exposures}

エクスポージャーは、実験に関連付けられたフラグに対してのみ Datadog に表示されます。実験に関連付けられていない標準のフィーチャーフラグは、エクスポージャーイベントを生成しません。エクスポージャーが欠落している場合:

1. Datadog UI で、フラグが実験に関連付けられていることを確認してください。
2. Agent の `DD_API_KEY` が正しいこと、および Agent がイベントを受信していることを確認してください。
3. 評価コンテキストがフラットなプリミティブ属性を使用していることを確認してください。ネストされた配列、オブジェクト、および null 値は、エクスポージャーレポートでは無視されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ja/agent/remote_config/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/tracing/trace_collection/dd_libraries/php/
[5]: /ja/feature_flags/concepts/environments/
[6]: /ja/feature_flags/guide/server_flag_evaluation_metrics/