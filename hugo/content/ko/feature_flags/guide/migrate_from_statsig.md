---
description: Statsig에서 Datadog Feature Flags로 Feature Flags를 마이그레이션하는 방법을 알아보세요.
further_reading:
- link: /feature_flags/
  tag: 설명서
  text: Feature Flags 개요
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
title: Statsig에서 Feature Flags 마이그레이션하기
---
## 개요 {#overview}

이 가이드는 Statsig에서 [Datadog Feature Flags][1]로 Feature Flags 로직을 마이그레이션하는 과정을 설명합니다. 개념 매핑, SDK 설치, 초기화 및 Feature Flag 평가를 다룹니다.

## 요약 체크리스트 {#summary-checklist}

* `@statsig/js-client`를 `@datadog/openfeature-browser`로 교체하세요.
* `statsig.initialize`를 `OpenFeature.setProviderAndWait`으로 교체하세요.
* `checkGate`를 `client.getBooleanValue`로 변환하세요.
* `getDynamicConfig`를 `client.getObjectValue` 또는 `client.getStringValue`로 변환하세요.
* `getLayer`를 `client.getObjectValue`로 변환하고 반환된 JSON 객체에서 필드를 역참조하세요.
* 사용자를 식별하고 백분율 기반 무작위화를 유도하려면 컨텍스트에서 `targetingKey`를 사용하세요.
* Statsig 플래그를 Datadog에서 다시 만드세요.
* 서버 측 앱의 경우 `@openfeature/server-sdk`를 사용하고 단일 전역 컨텍스트 대신 요청별 평가 컨텍스트를 전달하세요.

## Datadog에서 플래그 다시 만들기 {#recreate-flags-in-datadog}

애플리케이션에서 SDK 호출을 전환하기 전에 Statsig 게이트, 동적 구성 및 레이어를 Datadog의 플래그로 다시 만드세요. Datadog UI에서 **Software Delivery** > **Feature Flags**로 이동하여 Statsig 키, 변형 유형 및 타겟팅 규칙과 일치하는 Feature Flags를 만드세요.

## 개념 매핑 {#conceptual-mapping}

Statsig와 Datadog의 핵심 개념은 비슷하지만 용어는 약간 다릅니다.

| Statsig 개념 | Datadog 개념 | 참고 |
| :---- | :---- | :---- |
| **Feature Gate** | **Feature Flag**(부울) | 기본 켜기/끄기 토글입니다. |
| **동적 구성** | **Feature Flag**(JSON/문자열 변형) | Datadog의 Feature Flag는 문자열, JSON 또는 숫자를 반환할 수 있으며, Statsig의 동적 구성 사용 사례를 포괄합니다. |
| **레이어** | **Feature Flag**(JSON 변형) | JSON 값 Feature Flag를 사용하고 반환된 객체에서 필드를 읽으세요. 이는 Statsig 레이어에서 값을 역참조하는 것과 유사합니다. |
| **실험** | **Feature Flag**(타겟팅 포함) | Datadog 플래그는 실험을 실행하도록 백분율 기반 롤아웃 및 특정 타겟팅 규칙으로 구성할 수 있습니다. 플래그를 [Datadog 실험][5]에 연결하여 사용자 결과에 미치는 영향을 측정하세요. |
| **사용자/StatsigUser** | **평가 컨텍스트** | 플래그를 평가하기 위해 SDK에 전달되는 컨텍스트(속성)입니다. |

## 설치 {#installation}

Datadog은 [OpenFeature][6]와 함께 사용할 수 있도록 Feature Flag SDK를 설계했습니다. 이는 Datadog을 기본 공급자로 사용하면서 공급업체 중립적인 API를 제공합니다.

Statsig 제거:

{{< code-block lang="bash" >}}
npm uninstall @statsig/js-client
# or
yarn remove @statsig/js-client
{{< /code-block >}}

Datadog 및 OpenFeature 설치:

{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
# or
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}

**참고**: React 애플리케이션의 경우 `@openfeature/react-sdk`도 설치하세요. [React Feature Flags][7]를 참고하세요. 서버 측 구현의 경우 [서버 측 및 동적 컨텍스트](#server-side-and-dynamic-context) 섹션을 참고하거나, 다른 언어의 경우 [서버 측 Feature Flags][2]를 참고하세요.

## 초기화 {#initialization}

`statsig.initialize()` 호출을 OpenFeature 공급자 설정으로 대체해야 합니다. 등록 시점에 평가 컨텍스트를 `setProviderAndWait`에 전달하여 플래그가 처음부터 올바른 사용자에 대해 평가되도록 하세요.

### Statsig(이전) {#statsig-old}

{{< code-block lang="javascript" >}}
import { StatsigClient } from '@statsig/js-client';

const client = new StatsigClient('client-sdk-key', { userID: 'user-123' });
await client.initializeAsync();
{{< /code-block >}}

### Datadog(새 버전) {#datadog-new}

{{< code-block lang="javascript" >}}
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';
{{< /code-block >}}

{{< code-block lang="javascript" >}}
// Configure the Datadog provider
const provider = new DatadogProvider({
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: 'datadoghq.com', // or datadoghq.eu, etc.
  env: 'production', // Environment from which to fetch flag configurations
});

// Set the evaluation context and register the provider together
const evaluationContext = {
  targetingKey: 'user-123', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info"> <code>targetingKey</code> 항목은 백분율 기반 타겟팅의 무작위화 대상으로 사용됩니다. 플래그가 대상의 백분율(예: 50%)을 타겟팅할 때, <code>targetingKey</code> 항목은 사용자가 어떤 '버킷'에 속하는지 결정합니다. 사용자의 <code>targetingKey</code> 항목이 동일한 경우 주어진 플래그에 대해 항상 동일한 변형을 받습니다.</div>

클라이언트 토큰 및 애플리케이션 ID 만들기에 대한 자세한 내용은 [API 및 애플리케이션 키][4]를 참고하세요.

## 플래그 평가(게이트 검사) {#evaluate-flags-check-gates}

`checkGate` 호출을 OpenFeature의 `getBooleanValue`로 교체하세요.

### Statsig(이전){#statsig-old-1}

{{< code-block lang="javascript" >}}
const isEnabled = client.checkGate('new_homepage_design');

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

### Datadog(새 버전) {#datadog-new-1}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

// The second argument is the fallback value (default) if the flag fails to fetch
const isEnabled = client.getBooleanValue('new_homepage_design', false);

if (isEnabled) {
  // Show new design
} else {
  // Show old design
}
{{< /code-block >}}

## 구성 가져오기(동적 구성){#get-configuration-dynamic-configs}

`getDynamicConfig` 또는 `getExperiment`를 사용하여 부울이 아닌 값(문자열, JSON, 숫자)을 검색하던 경우 OpenFeature에서 적절한 유형의 메서드를 사용하세요.

### Statsig(이전){#statsig-old-2}

{{< code-block lang="javascript" >}}
const config = client.getDynamicConfig('banner_config');
const title = config.get('title', 'Welcome');
{{< /code-block >}}

### Datadog(새 버전) {#datadog-new-2}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

// Assuming your Datadog flag 'banner_config' returns a JSON object variant
const bannerConfig = client.getObjectValue<{ title: string }>('banner_config', { title: 'Welcome' });
const title = bannerConfig.title;
{{< /code-block >}}

## 레이어를 JSON 객체 Feature Flags에 매핑{#map-layers-to-json-object-flags}

Statsig 레이어는 관련 매개변수를 하나의 평가 아래로 그룹화합니다. Datadog에서는 JSON 값 Feature Flag를 사용하고 반환된 객체에서 필요한 필드를 읽으세요.

### Statsig(이전){#statsig-old-3}

{{< code-block lang="javascript" >}}
const layer = client.getLayer('user_promo_experiments');
const promoTitle = layer.get('title', 'Welcome to Statsig!');
const discount = layer.get('discount', 0.1);
{{< /code-block >}}

### Datadog(새 버전) {#datadog-new-3}

{{< code-block lang="typescript" >}}
const client = OpenFeature.getClient();

const promoConfig = client.getObjectValue<{ title: string; discount: number }>('user_promo_experiments', {
  title: 'Welcome!',
  discount: 0.1,
});
const promoTitle = promoConfig.title;
const discount = promoConfig.discount;
{{< /code-block >}}

## 로그인 후 사용자 컨텍스트 업데이트{#update-user-context-after-login}

Statsig는 `updateUser`를 사용하여 사용자 컨텍스트를 업데이트합니다. OpenFeature 및 Datadog에서는 초기화 후 `OpenFeature.setContext()`로 컨텍스트를 업데이트하세요(예: 사용자 로그인 후).

### Statsig(이전){#statsig-old-4}

{{< code-block lang="javascript" >}}
await client.updateUserAsync({
  userID: 'user-456',
  email: 'employee@company.com',
  custom: { plan: 'premium' },
});
{{< /code-block >}}

### Datadog(새 버전) {#datadog-new-4}

{{< code-block lang="javascript" >}}
// Update the context for all future flag evaluations
await OpenFeature.setContext({
  targetingKey: 'user-456', // Identifies the user and drives percentage-based randomization
  email: 'employee@company.com',
  plan: 'premium',
});
{{< /code-block >}}

## 추적 및 노출{#tracking-and-exposure}

Statsig에서는 게이트를 검사하면 자동으로 노출이 기록됩니다.

Datadog에서 플래그 텔레메트리는 다음 두 가지 범주로 나뉩니다.

**노출 로깅**은 대상이 특정 플래그 변형을 수신했음을 기록합니다. 각 노출 이벤트에는 플래그 키, 제공된 변형 및 평가 컨텍스트가 포함됩니다. 노출 데이터를 사용하여 실험 결과와 기능 채택률을 분석하세요.

**평가 로깅**은 각 변형이 반환되는 빈도를 기록합니다. 클라이언트 SDK는 기본적으로 집계된 평가 횟수를 전송합니다. 서버 SDK는 평가 로깅을 활성화한 후에만 `feature_flag.evaluations` 메트릭을 내보냅니다.

1. **클라이언트 SDK**: 노출 로깅은 기본적으로 활성화되어 있습니다. SDK는 노출 이벤트를 노출 수집기로 전송합니다. **Feature Flags** 목록에서 조회할 수 있습니다. 노출 추적이 필요하지 않은 경우 `enableExposureLogging: false` 구성에서 `DatadogProvider`를 설정하세요.

<div class="alert alert-warning">다음 <code>enableRumFeatureFlagTracking</code> 항목을 <code>true</code> 항목으로 설정하면 RUM 이벤트에 플래그 평가를 추가하므로 <a href="/real_user_monitoring/">RUM</a> 비용에 영향을 줄 수 있습니다. 두 <code>enableExposureLogging</code> 및 <code>enableRumFeatureFlagTracking</code> 항목은 클라이언트 SDK에 대해 기본적으로 켜져 있습니다.</div>

2. **서버 SDK**: 노출 로깅은 기본적으로 켜져 있습니다. 평가 로깅은 기본적으로 꺼져 있습니다. 서버 SDK에서 평가 메트릭을 전송하려면 OpenTelemetry 메트릭(예: `DD_METRICS_OTEL_ENABLED=true`)을 활성화하고 [Server-Side Feature Flags][2]의 언어별 지침을 따르세요.

## 서버 측 및 동적 컨텍스트 {#server-side-and-dynamic-context}

이전 섹션에서는 브라우저 및 클라이언트 측 마이그레이션을 다루었으며, 여기서는 평가 컨텍스트가 일반적으로 사용자 세션 기간 동안 정적으로 유지됩니다. 서버 측 애플리케이션은 다른 SDK를 사용하며 클라이언트 토큰 대신 Datadog API 키로 인증합니다. 또한 일반적으로 각 수신 요청에 대해 새로운 평가 컨텍스트를 빌드합니다.

서버 SDK를 초기화하기 전에 필요한 환경 변수를 구성하세요.

{{< code-block lang="bash" >}}
DD_API_KEY=<DATADOG_API_KEY>
DD_SITE=<DATADOG_SITE>
DD_ENV=<ENVIRONMENT_NAME>
{{< /code-block >}}

전체 Agent 및 애플리케이션 구성 옵션 목록은 [Server-Side Feature Flags][2]를 참조하세요.

서버 측 SDK를 설치합니다. 이 예제는 [Node.js Feature Flags SDK][3]를 사용합니다.

{{< code-block lang="bash" >}}
npm install dd-trace @openfeature/server-sdk
{{< /code-block >}}

Datadog 트레이서를 통해 공급자를 등록합니다.

{{< code-block lang="javascript" >}}
import tracer from 'dd-trace';
import { OpenFeature } from '@openfeature/server-sdk';

tracer.init();

await OpenFeature.setProviderAndWait(tracer.openfeature);
{{< /code-block >}}

### Statsig(이전) {#statsig-old-5}

{{< code-block lang="javascript" >}}
// The Statsig server SDK takes the user in each call
const isEnabled = statsig.checkGate(user, 'new_homepage_design');
{{< /code-block >}}

### Datadog(새 버전) {#datadog-new-5}

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown',
  };

  const isEnabled = await client.getBooleanValue('new_homepage_design', false, evaluationContext);
  res.send(isEnabled ? 'New design' : 'Old design');
});
{{< /code-block >}}

브라우저 SDK는 모든 플래그 평가에 대해 설정된 평가 컨텍스트를 사용합니다. 사용자가 로그인하거나 속성이 변경될 때 `OpenFeature.setContext()`로 해당 사용자 컨텍스트를 업데이트할 수 있습니다. 하나의 프로세스가 여러 사용자를 처리하므로 서버 SDK는 대신 각 플래그 평가 호출에 새로운 평가 컨텍스트를 전달합니다.

다른 서버 언어에 대해서는 [Server-Side Feature Flags][2]를 참조하세요.

[1]: /ko/feature_flags/
[2]: /ko/feature_flags/server/
[3]: /ko/feature_flags/server/nodejs/
[4]: /ko/account_management/api-app-keys/
[5]: /ko/experiments/
[6]: https://openfeature.dev/
[7]: /ko/feature_flags/client/react/