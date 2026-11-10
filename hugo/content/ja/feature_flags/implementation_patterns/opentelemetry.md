---
description: OpenTelemetry をトレースに使用するアプリケーションに Datadog Feature Flags を追加します。
further_reading:
- link: /feature_flags/server/
  tag: ドキュメント
  text: サーバーサイドの Feature Flags
- link: /opentelemetry/instrument/dd_sdks/api_support/
  tag: ドキュメント
  text: OpenTelemetry API サポート
- link: /remote_configuration/
  tag: ドキュメント
  text: Remote Configuration
title: OpenTelemetry を使用した Feature Flags
---
## 概要{#overview}

トレースに [OpenTelemetry (OTel)][2] を使用するアプリケーションに [Datadog Feature Flags][1] を追加できます。Datadog は 2 つの統合オプションをサポートしています。どちらの場合も、Feature Flags は正しく評価され、既存の OpenTelemetry API インスツルメンテーションコードは変更されません。

トレースプロバイダーの初期化を変更できるかどうかに基づいて、統合オプションを選択してください。

- **オプション A:** Datadog SDK を TracerProvider として登録する
- **オプション B:** Datadog SDK を OpenTelemetry と並行して実行する

トレースプロバイダーの初期化を変更できる場合は、オプション A が推奨されます。トレースプロバイダーを変更できない場合は、オプション B を使用して、OTel トレースパイプラインを変更せずに Feature Flags を採用してください。

## 前提条件 {#prerequisites}

お使いの言語向けの Datadog [サーバーサイドFeature Flags][1] インストールガイドに従ってください。

## オプション A: Datadog SDK を TracerProvider として登録する {#option-a-register-the-datadog-sdk-as-the-tracerprovider}

このオプションでは、Datadog SDK が `TracerProvider` として OTel SDK を置き換えます。既存の OpenTelemetry API インスツルメンテーションコード (スパン、属性、イベント、およびコンテキスト伝播) はそのまま維持されます。

<div class="alert alert-warning">トレースの重複を避けるため、既存の OpenTelemetry TracerProvider およびエクスポーターの初期化をすべて削除してください。</div>

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="csharp" filename="Program.cs" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var ffProvider = new DatadogProvider();
await Api.Instance.SetProviderAsync(ffProvider);

var client = Api.Instance.GetClient("my-service");

// Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

詳細については、[OpenTelemetry API サポート (.NET)](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net&platform=traces) を参照してください。

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="go" filename="main.go" >}}
import (
    "log"

    ddotel "github.com/DataDog/dd-trace-go/v2/ddtrace/opentelemetry"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
    "go.opentelemetry.io/otel"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    // Register the Datadog SDK as the OpenTelemetry TracerProvider
    otelProvider := ddotel.NewTracerProvider()
    defer otelProvider.Shutdown()
    otel.SetTracerProvider(otelProvider)

    // Register the Datadog OpenFeature provider
    flagProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := flagProvider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(flagProvider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")

    // Your existing OpenTelemetry API calls continue to work unchanged
}
{{< /code-block >}}

詳細については、[OpenTelemetry API サポート (Go)](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go&platform=traces) を参照してください。

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry API calls continue to work unchanged */
{{< /code-block >}}

**注**: トレースに関しては、OpenTelemetry SDK ではなく、OpenTelemetry API のみに依存してください。詳細については、[OpenTelemetry API サポート (Java)](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java&platform=traces) を参照してください。フラグ評価メトリクスを出力するには、OpenTelemetry SDK メトリクスおよび OTLP エクスポーターの依存関係も必要です。[サーバーサイドフラグ評価メトリクスの設定][3] を参照してください。

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';
import * as otel from '@opentelemetry/api';

tracer.init({
  experimental: {
    flaggingProvider: {
      enabled: true,
    },
  },
});

// Register the Datadog SDK as the OpenTelemetry TracerProvider
const provider = new tracer.TracerProvider();
provider.register();

// Register the Datadog OpenFeature provider
OpenFeature.setProvider(tracer.openfeature);

// Your existing @opentelemetry/api calls continue to work unchanged:
const otelTracer = otel.trace.getTracer('my-service');
otelTracer.startActiveSpan('my-operation', (span) => { ... });
{{< /code-block >}}

詳細については、[OpenTelemetry API サポート (Node.js)](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces) をご覧ください。

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="python" filename="app.py" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

# Register the Datadog OpenFeature provider
provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()

# Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

詳細については、[OpenTelemetry API サポート (Python)](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python&platform=traces) をご覧ください。

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="ruby" filename="app.rb" >}}
require 'datadog'
require 'opentelemetry/sdk'
require 'datadog/opentelemetry'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

# Enable remote configuration and OpenFeature integration
Datadog.configure do |c|
  c.remote.enabled = true
  c.open_feature.enabled = true
end

# Register the Datadog OpenFeature provider
OpenFeature::SDK.configure do |c|
  c.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
end

client = OpenFeature::SDK.build_client

# Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

詳細については、[OpenTelemetry API サポート (Ruby)](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby&platform=traces) をご覧ください。

{{% /tab %}}
{{% tab "PHP" %}}

**注**: OpenFeature アダプターには PHP 8 以降が必要です。

{{< code-block lang="bash" filename=".env" >}}
DD_TRACE_OTEL_ENABLED=true
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="php" filename="app.php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

// Register the Datadog OpenFeature provider
$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');

// Your existing OpenTelemetry API calls continue to work unchanged
{{< /code-block >}}

詳細については、[OpenTelemetry API サポート (PHP)](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=php&platform=traces) をご覧ください。

{{% /tab %}}
{{< /tabs >}}

## オプション B: Datadog SDK を OpenTelemetry と並行して実行する{#option-b-run-the-datadog-sdk-alongside-opentelemetry}

このオプションでは、既存の OTel SDK がトレースの `TracerProvider` として維持されます。Remote Configuration を通じて、Feature Flags の配信のためにのみ Datadog SDK を追加します。OTel SDK の初期化、エクスポーター、およびインスツルメンテーションは変更されません。

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="csharp" filename="Program.cs" >}}
using OpenFeature;
using Datadog.FeatureFlags.OpenFeature;

// Register the Datadog OpenFeature provider
var provider = new DatadogProvider();
await Api.Instance.SetProviderAsync(provider);

var client = Api.Instance.GetClient("my-service");

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="go" filename="main.go" >}}
import (
    "log"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
    ddopenfeature "github.com/DataDog/dd-trace-go/v2/openfeature"
    "github.com/open-feature/go-sdk/openfeature"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    // Register the Datadog OpenFeature provider
    flagProvider, err := ddopenfeature.NewDatadogProvider(ddopenfeature.ProviderConfig{})
    if err != nil {
        log.Fatalf("Failed to create provider: %v", err)
    }
    if ddProvider, ok := flagProvider.(*ddopenfeature.DatadogProvider); ok {
        defer ddProvider.Shutdown()
    }

    if err := openfeature.SetProviderAndWait(flagProvider); err != nil {
        log.Fatalf("Failed to set provider: %v", err)
    }

    client := openfeature.NewClient("my-service")

    // Your existing OpenTelemetry SDK initialization stays unchanged
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
DD_VERSION=<YOUR_APP_VERSION>
{{< /code-block >}}

**注**: フラグ評価メトリクスを出力するには、OpenTelemetry SDK メトリクスと OTLP エクスポーターの依存関係を追加してください。詳細については、[サーバーサイドフラグ評価メトリクスの設定][3] をご覧ください。

{{< code-block lang="java" filename="Main.java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;

// Register the Datadog OpenFeature provider
OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new Provider());
Client client = api.getClient("my-app");

/* Your existing OpenTelemetry SDK initialization stays unchanged */
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="javascript" filename="app.js" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init({
  plugins: false,
  experimental: {
    flaggingProvider: {
      enabled: true,
    },
  },
});

// Register the Datadog OpenFeature provider
OpenFeature.setProvider(tracer.openfeature);

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="python" filename="app.py" >}}
from ddtrace import tracer
from openfeature import api
from ddtrace.openfeature import DataDogProvider

tracer.configure()

# Register the Datadog OpenFeature provider
provider = DataDogProvider()
api.set_provider(provider)
client = api.get_client()

# Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="ruby" filename="app.rb" >}}
require 'datadog'
require 'open_feature/sdk'
require 'datadog/open_feature/provider'

Datadog.configure do |c|
  c.remote.enabled = true
  c.open_feature.enabled = true
end

# Register the Datadog OpenFeature provider
OpenFeature::SDK.configure do |c|
  c.set_provider_and_wait(Datadog::OpenFeature::Provider.new)
end

client = OpenFeature::SDK.build_client

# Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

**注**: OpenFeature アダプターには PHP 8 以降が必要です。

{{< code-block lang="bash" filename=".env" >}}
DD_APM_TRACING_ENABLED=false
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

{{< code-block lang="php" filename="app.php" >}}
<?php

require_once __DIR__ . '/vendor/autoload.php';

use DDTrace\OpenFeature\DataDogProvider;
use OpenFeature\OpenFeatureAPI;

// Register the Datadog OpenFeature provider
$api = OpenFeatureAPI::getInstance();
$api->setProvider(new DataDogProvider());

$client = $api->getClient('my-service');

// Your existing OpenTelemetry SDK initialization stays unchanged
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Feature Flags の評価{#evaluate-feature-flags}

プロバイダーを初期化した後、OpenFeature クライアントを使用して Feature Flags を評価します。フラグ評価にはローカルにキャッシュされた構成が使用されるため、評価時にネットワークリクエストは発生しません。

{{< tabs >}}
{{% tab ".NET" %}}

{{< code-block lang="csharp" >}}
using OpenFeature.Model;

var evalCtx = EvaluationContext.Builder()
    .SetTargetingKey("user-123")
    .Set("companyID", "acme-corp")
    .Build();

var isEnabled = await client.GetBooleanValueAsync("my-flag", false, evalCtx);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Go" %}}

{{< code-block lang="go" >}}
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "companyID": "acme-corp",
    },
)

enabled, err := client.BooleanValue(context.Background(), "my-flag", false, evalCtx)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

EvaluationContext context = new MutableContext("user-123")
    .add("companyID", "acme-corp");

boolean isEnabled = client.getBooleanValue("my-flag", false, context);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/server-sdk';

const client = OpenFeature.getClient();

const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const isEnabled = await client.getBooleanValue(
  'my-flag',
  false,
  evaluationContext,
);
{{< /code-block >}}

{{% /tab %}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={"companyID": "acme-corp"},
)

is_enabled = client.get_boolean_value("my-flag", False, eval_ctx)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Ruby" %}}

{{< code-block lang="ruby" >}}
context = OpenFeature::SDK::EvaluationContext.new(
  targeting_key: 'user-123',
  companyID: 'acme-corp',
)

is_enabled = client.fetch_boolean_value(
  flag_key: 'my-flag',
  default_value: false,
  evaluation_context: context,
)
{{< /code-block >}}

{{% /tab %}}
{{% tab "PHP" %}}

{{< code-block lang="php" >}}
use OpenFeature\implementation\flags\Attributes;
use OpenFeature\implementation\flags\EvaluationContext;

$context = new EvaluationContext(
    'user-123',
    new Attributes(['companyID' => 'acme-corp'])
);

$isEnabled = $client->getBooleanValue('my-flag', false, $context);
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

どちらの統合オプションでも、Feature Flags は同じ方法で評価されます。Feature Flags の構成は、同じ Remote Configuration チャネルを通じて配信されます。

完全なセットアップ手順、型付きゲッター、評価コンテキストの要件、およびテストパターンについては、お使いの言語の [サーバーサイド SDK ドキュメント][1] をご覧ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/feature_flags/server/
[2]: https://opentelemetry.io/
[3]: /ja/feature_flags/guide/server_flag_evaluation_metrics/