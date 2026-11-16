---
description: 트레이싱에 OpenTelemetry를 사용하는 애플리케이션에 Datadog Feature Flags를 추가합니다.
further_reading:
- link: /feature_flags/server/
  tag: 문서
  text: 서버 측 Feature Flags
- link: /opentelemetry/instrument/dd_sdks/api_support/
  tag: 문서
  text: OpenTelemetry API Support
- link: /remote_configuration/
  tag: 문서
  text: Remote Configuration
title: OpenTelemetry와 Feature Flags 함께 사용하기
---
## 개요 {#overview}

트레이싱에 [OpenTelemetry(OTel)][2]을 사용하는 애플리케이션에 [Datadog Feature Flags][1]를 추가할 수 있습니다. Datadog은 두 가지 통합 옵션을 지원합니다. 두 경우 모두 기능 플래그가 올바르게 평가되며 기존 OpenTelemetry API 계측 코드는 변경되지 않습니다.

트레이싱 프로바이더의 초기화 방식을 변경할 수 있는지에 따라 통합 옵션을 선택합니다.

- **옵션 A:** Datadog SDK를 TracerProvider로 등록
- **옵션 B:** OpenTelemetry와 함께 Datadog SDK 실행

트레이싱 프로바이더의 초기화 방식을 변경할 수 있다면 옵션 A를 사용하는 것이 좋습니다. 트레이싱 프로바이더를 변경할 수 없다면 옵션 B를 사용하여 OTel 트레이스 파이프라인을 변경하지 않고 기능 플래그를 도입합니다.

## 전제 조건 {#prerequisites}

사용하는 언어에 해당하는 Datadog [Server-Side Feature Flags][1] 설치 가이드에 따라 진행합니다.

## 옵션 A: Datadog SDK를 TracerProvider로 등록 {#option-a-register-the-datadog-sdk-as-the-tracerprovider}

이 옵션에서는 Datadog SDK가 OTel SDK를 대신하여 `TracerProvider` 역할을 합니다. 기존 OpenTelemetry API 계측 코드(스팬, 속성, 이벤트 및 컨텍스트 전파)는 그대로 유지됩니다.

<div class="alert alert-warning">중복 트레이스를 방지하려면 기존 OpenTelemetry TracerProvider 및 익스포터 초기화를 제거합니다.</div>

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

자세한 내용은 [.NET용 OpenTelemetry API 지원](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=dot_net&platform=traces)을 참조하세요.

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

자세한 내용은 [Go용 OpenTelemetry API 지원](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=go&platform=traces)을 참조하세요.

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

**참고**: 트레이싱에는 OpenTelemetry SDK가 아닌 OpenTelemetry API에만 의존해야 합니다. 자세한 내용은 [Java용 OpenTelemetry API 지원](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=java&platform=traces)을 참조하세요. 플래그 평가 메트릭을 내보내려면 OpenTelemetry SDK 메트릭 및 OTLP 익스포터 종속성도 필요합니다. 자세한 내용은 [서버 측 플래그 평가 메트릭 설정][3]을 참조하세요.

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

자세한 내용은 [Node.js용 OpenTelemetry API 지원](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=node_js&platform=traces)을 참조하세요.

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

자세한 내용은 [Python용 OpenTelemetry API 지원](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=python&platform=traces)을 참조하세요.

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

자세한 내용은 [Ruby용 OpenTelemetry API 지원](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=ruby&platform=traces)을 참조하세요.

{{% /tab %}}
{{% tab "PHP" %}}

**참고**: OpenFeature 어댑터에는 PHP 8 이상이 필요합니다.

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

자세한 내용은 [PHP용 OpenTelemetry API 지원](/opentelemetry/instrument/dd_sdks/api_support/?prog_lang=php&platform=traces)을 참조하세요.

{{% /tab %}}
{{< /tabs >}}

## 옵션 B: OpenTelemetry와 함께 Datadog SDK 실행{#option-b-run-the-datadog-sdk-alongside-opentelemetry}

이 옵션에서 기존 OTel SDK는 트레이싱용 `TracerProvider`로 계속 사용됩니다. Remote Configuration을 통해 기능 플래그를 전달하는 용도로만 Datadog SDK를 추가합니다. 기존 OTel SDK 초기화, 익스포터 및 계측은 변경되지 않습니다.

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

**참고**: 플래그 평가 메트릭을 내보내려면 OpenTelemetry SDK 메트릭 및 OTLP 익스포터 종속성을 추가합니다. 자세한 내용은 [서버 측 플래그 평가 메트릭 설정][3]을 참조하세요.

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

**참고**: OpenFeature 어댑터에는 PHP 8 이상이 필요합니다.

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

## 기능 플래그 평가 {#evaluate-feature-flags}

프로바이더를 초기화한 후 OpenFeature 클라이언트를 사용하여 플래그를 평가합니다. 플래그 평가는 로컬에 캐시된 구성을 사용하므로 평가 시 네트워크 요청이 발생하지 않습니다.

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

두 통합 옵션 모두에서 기능 플래그는 동일한 방식으로 평가됩니다. 플래그 구성은 동일한 Remote Configuration 채널을 통해 전달됩니다.

전체 설정 지침, 타입이 지정된 getter, 평가 컨텍스트 요구 사항 및 테스트 패턴은 사용 중인 언어의 [서버 측 SDK 설명서][1]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/server/
[2]: https://opentelemetry.io/
[3]: /ko/feature_flags/guide/server_flag_evaluation_metrics/