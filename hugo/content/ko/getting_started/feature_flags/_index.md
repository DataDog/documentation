---
description: 통합 모니터링 기능, 실시간 메트릭 및 OpenFeature와 호환되는 점진적 롤아웃을 통해 기능 출시를 관리하세요.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 SDK
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 SDK
- link: https://www.datadoghq.com/blog/feature-flags/
  tag: 블로그
  text: Datadog Feature Flags로 기능을 더 빠르고 안전하게 출시하기
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: 블로그
  text: 통합 데이터로 실험 과정에서 속도와 품질의 균형을 맞추는 방법
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: 블로그
  text: Datadog Feature Flags가 클라우드 제공업체의 장애에 유연하게 대응하는 방법
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: 블로그
  text: 가드레일 메트릭을 활용하고 릴리스를 수동으로 감시하는 번거로움 줄이기
- link: https://www.datadoghq.com/blog/ab-testing/
  tag: 블로그
  text: 모든 팀이 A/B 테스트를 수행해야 하는 이유
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: 블로그
  text: 성장을 둔화시키는 제품 신호 지연 격차
site_support_id: getting_started_feature_flags
title: Feature Flags 시작하기
---
## 개요 {#overview}

Datadog Feature Flag는 기능 배포를 효과적으로 관리할 수 있는 통합 기능을 제공하며 내장된 모니터링 기능과 Datadog 플랫폼 전반의 원활한 통합을 지원합니다.

- **실시간 메트릭:** 각 변형을 수신하는 사용자 및 플래그가 애플리케이션의 상태 및 성능에 미치는 영향에 대해 실시간으로 이해할 수 있습니다.

- **일반적인 플래그 유형 지원:** 부울, 문자열, 정수, 숫자(float/double) 또는 JSON 변형을 사용할 수 있습니다. JavaScript SDK는 정수 및 숫자 변형 모두에 `getNumberValue()`를 사용하는 반면, Java, Swift, Kotlin 및 Python은 별도의 정수 및 부동 소수점 평가 메서드를 노출합니다.

- **실험을 위한 설계:** A/B 테스트를 위해 특정 대상을 타겟팅하고 카나리 릴리스를 통해 기능을 점진적으로 롤아웃하며, 회귀가 감지되면 자동으로 롤백합니다.

- **OpenFeature 호환:** OpenFeature 표준을 기반으로 구축되어 기존 OpenFeature 구현과 호환되며 특정 공급업체에 종속되지 않는 기능 플래그 관리 방식을 제공합니다.

## Feature Flags SDK {#feature-flags-sdks}

이 가이드는 JavaScript 브라우저 SDK를 예시로 사용합니다. 다음 SDK 중 하나를 사용해 모든 애플리케이션에 Datadog Feature Flags를 통합할 수 있습니다.

### 클라이언트 측 SDK {#client-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
  {{< image-card href="/feature_flags/client/flutter/" src="integrations_logos/flutter_large.svg" alt="Dart 및 Flutter" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/feature_flags/client/javascript/" src="integrations_logos/javascript_large.svg" alt="JavaScript" >}}
  {{< image-card href="/feature_flags/client/react/" src="integrations_logos/react_large.svg" alt="React" >}}
  {{< image-card href="/feature_flags/client/reactnative/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/feature_flags/client/ios/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/feature_flags/client/unity/" src="integrations_logos/rum-unity_large.svg" alt="Unity" >}}
{{< /card-grid >}}

### 서버 측 SDK {#server-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/server/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
  {{< image-card href="/feature_flags/server/go/" src="integrations_logos/go-metro.png" alt="Go" >}}
  {{< image-card href="/feature_flags/server/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/feature_flags/server/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/feature_flags/server/php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/feature_flags/server/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/feature_flags/server/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
{{< /card-grid >}}

## 환경 구성 {#configure-your-environments}

조직 내에 이미 개발, 스테이징 및 프로덕션용 사전 구성된 환경이 있을 수 있습니다. 환경 쿼리, 프로덕션 마킹 및 환경 관리에 대한 자세한 내용은 [환경][4]을 참조하세요.

## 첫 번째 기능 플래그 만들기 {#create-your-first-feature-flag}

<div class="alert alert-info">
<a href="/feature_flags/feature_flag_mcp_server/">Feature Flags MCP 서버</a>를 사용하여 Feature Flags를 자동으로 설정할 수 있습니다. 연결 후 AI 에이전트에게 "내 앱에서 Datadog Feature Flags를 설정하게 도와줘."라고 요청하세요. MCP 서버가 코드베이스를 검토하고 사용 중인 언어 및 프레임워크에 필요한 SDK와 코드 스니펫을 설치합니다.
</div>

### 1단계: SDK 가져오기 및 초기화 {#step-1-import-and-initialize-the-sdk}

플래그가 평가되는 위치와 일치하는 SDK를 선택하고 Datadog Feature Flags 공급자를 초기화하세요.

{{< tabs >}}
{{% tab "JavaScript 브라우저" %}}

먼저 `@datadog/openfeature-browser`, `@openfeature/web-sdk` 및 `@openfeature/core`를 프로젝트의 종속성으로 설치하세요.

{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

그런 다음, 프로젝트에 다음을 추가해 SDK를 초기화하세요.

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">브라우저 Feature Flags는 선택한 <a href="/getting_started/site">Datadog 사이트</a>에서 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

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

<div class="alert alert-info">브라우저 SDK는 기본적으로 모두 활성화된 세 가지 독립적인 텔레메트리 스트림을 내보냅니다. <code>enableExposureLogging</code> 평가별 노출 이벤트를 노출 수집기로 전송합니다. <code>enableFlagEvaluationTracking</code> 집계된 평가 텔레메트리를 플래그 평가 수집기로 전송합니다. <code>enableRumFeatureFlagTracking</code> 플래그 평가를 RUM 이벤트에 첨부하며, RUM 사용량에 영향을 줄 수 있는 설정입니다. 필요하지 않은 스트림만 비활성화하세요.</div>

{{% /tab %}}
{{% tab "Node.js 서버" %}}

`dd-trace` 및 OpenFeature 서버 SDK를 설치하세요.

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

환경 변수로 공급자를 활성화하세요.

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

또는 코드에서 공급자를 활성화하세요.

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

OpenFeature SDK 및 Datadog OpenFeature 공급자 종속성을 추가하세요.

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.63.0'
}
{{< /code-block >}}

공급자를 활성화하고 Java 트레이서를 사용하여 애플리케이션을 시작하세요.

{{< code-block lang="bash" >}}
# Required: Enable the feature flagging provider
# The EXPERIMENTAL_ prefix is historical; the provider is no longer experimental.
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

java -javaagent:path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

플래그 평가 메트릭을 내보내려면 OpenTelemetry SDK 종속성을 추가하고 OTLP 엔드포인트를 구성하세요. [서버 측 플래그 평가 메트릭 설정][9]을 참조하세요.

Datadog OpenFeature 공급자를 등록하세요.

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

환경 변수로 공급자를 활성화하세요.

{{< code-block lang="bash" >}}
# Required: Enable the feature flags provider
export DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true

# Optional: Enable flag evaluation metrics
export DD_METRICS_OTEL_ENABLED=true
{{< /code-block >}}

Datadog Python SDK 및 OpenFeature SDK를 설치하세요.

{{< code-block lang="bash" >}}
pip install ddtrace openfeature-sdk
{{< /code-block >}}

Datadog OpenFeature 공급자를 등록하세요.

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

#### 자격 증명 요약 {#credentials-at-a-glance}

| 자격 증명 | 사용 대상 | 위치 | 민감성 여부 |
| --- | --- | --- | --- |
| 클라이언트 토큰 | 브라우저, 모바일 및 게임 SDK | 클라이언트 애플리케이션 구성 | 아니요 — 공개 클라이언트 코드에 포함해도 안전함 |
| 애플리케이션 ID | 브라우저 및 RUM 기반 클라이언트 SDK | 클라이언트 애플리케이션 구성 | 아니요 — 공개 식별자 |
| API 키 | 서버 측 Remote Configuration을 위한 Datadog Agent | Agent 구성 전용 | 예 — 서버 측에서만 유지 |

브라우저, 모바일 또는 게임 애플리케이션에 API 키를 넣지 마세요.

OpenFeature SDK 구성 옵션에 대한 자세한 내용은 [설명서][1]에서 확인할 수 있습니다. 클라이언트 토큰 및 애플리케이션 ID 만들기에 대한 자세한 내용은 [API 및 애플리케이션 키][3]를 참고하세요.

### 2단계: 기능 플래그 만들기 {#step-2-create-a-feature-flag}

Datadog에서 [{{< ui >}}Create Feature Flag{{< /ui >}}][2]로 이동하여 다음 항목을 구성하세요.

- **이름 및 키**: 플래그의 표시 이름과 코드에서 참조할 키
- **SDK 배포 채널**: 플래그 구성을 수신할 SDK 제어([배포 채널][6] 참고)
- **변형 유형** 및 **변형 값**: [변형 및 플래그 유형][5] 참고

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}, {{< ui >}}variant keys{{< /ui >}} 및 {{< ui >}}variant values{{< /ui >}}는 클라이언트 SDK에 전송될 때 공개된 정보로 간주해야 합니다.
</div>

{{< img src="getting_started/feature_flags/create-feature-flags-2.png" alt="Feature Flag 만들기" style="width:100%;" >}}

### 3단계: 플래그 평가 및 기능 코드 작성 {#step-3-evaluate-the-flag-and-write-feature-code}

애플리케이션 코드에서 SDK를 사용해 플래그를 평가하고 새 기능을 제어하세요.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 부울과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< tabs >}}
{{% tab "JavaScript 브라우저" %}}

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
{{% tab "Node.js 서버" %}}

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

이 단계를 완료한 후 애플리케이션을 다시 배포해 변경 사항을 적용하세요. 추가 사용 예시는 위에 링크된 플랫폼별 SDK 페이지에서 확인할 수 있습니다.

### 4단계: 타겟팅 규칙 정의 및 기능 플래그 활성화{#step-4-define-targeting-rules-and-enable-the-feature-flag}

[타겟팅 규칙][7]을 구성해 각 변형을 적용할 대상을 정의합니다. 규칙을 저장한 후 선택한 환경에서 플래그를 활성화합니다.

<div class="alert alert-info">
일반적으로 운영 환경에 적용하기 전에 스테이징 환경에서 변경 사항을 롤아웃하는 것이 좋습니다.
</div>

비율별 롤아웃은 [트래픽 분할 및 무작위화][8]를 확인하세요.

### 5단계: 롤아웃 모니터링 {#step-5-monitor-your-rollout}

기능 플래그 세부 정보 페이지에서 실시간 노출 추적, {{< ui >}}error rate{{< /ui >}} 및 {{< ui >}}page load time{{< /ui >}} 등의 메트릭을 확인해 기능 롤아웃을 모니터링할 수 있습니다. 플래그를 통해 기능을 점진적으로 출시하면서 Datadog UI의 {{< ui >}}Real-time metric overview{{< /ui >}} 패널을 통해 해당 기능이 애플리케이션 성능에 미치는 영향을 확인합니다.

{{< img src="getting_started/feature_flags/real-time-flag-metrics-2.png" alt="실시간 플래그 메트릭 패널" style="width:100%;" >}}

서버 측 애플리케이션의 경우 플래그 평가 메트릭을 활성화하여 각 변형이 반환되는 빈도를 추적하고 대시보드에서 데이터를 그래프로 표시할 수도 있습니다. [서버 측 플래그 평가 메트릭 설정][9]을 참조하세요. Feature Flags 데이터를 APM 트레이스에 연결하고 Feature Flags 변형별로 트레이스를 필터링하려면 [Feature Flags에 대한 APM 트레이스 보강 설정][10]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/technologies/client/web/
[2]: https://app.datadoghq.com/feature-flags/create
[3]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#client-tokens
[4]: /ko/feature_flags/concepts/environments/
[5]: /ko/feature_flags/concepts/variants_and_flag_types/
[6]: /ko/feature_flags/concepts/distribution_channels/
[7]: /ko/feature_flags/concepts/targeting_rules/
[8]: /ko/feature_flags/concepts/traffic_splitting/
[9]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[10]: /ko/feature_flags/guide/apm_trace_enrichment/