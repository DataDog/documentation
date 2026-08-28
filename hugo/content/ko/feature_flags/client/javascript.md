---
description: 브라우저 JavaScript 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: https://openfeature.dev/docs/reference/sdks/client/web/
  tag: OpenFeature
  text: OpenFeature Web SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: 설명서
  text: 브라우저 모니터링
- link: /feature_flags/browser_developer_extension/
  tag: 설명서
  text: 브라우저 개발자 확장 프로그램
title: JavaScript Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 브라우저 JavaScript 애플리케이션을 계측하는 방법을 설명합니다. Datadog Feature Flags는 앱의 기능 가용성을 원격으로 제어하고, 안전하게 실험하며, 새로운 경험을 안심하고 제공할 수 있는 통합된 방법을 제공합니다.

JavaScript용 Datadog Feature Flags SDK는 Feature Flags 관리를 위한 개방형 표준인 [OpenFeature][1]를 기반으로 구축되었습니다. 이 가이드에서는 SDK를 설치하고, Datadog 공급자를 구성하며, 애플리케이션에서 Feature Flags를 평가하는 방법을 설명합니다.

## 설치 {#installation}

선호하는 패키지 관리자를 사용하여 Datadog OpenFeature 공급자와 OpenFeature Web SDK를 설치합니다.

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 공급자 초기화 {#initialize-the-provider}

Datadog 자격 증명이 포함된 `DatadogProvider` 인스턴스를 생성합니다. 실시간 브라우저 Feature Flags 구성을 위해서는 `applicationId`, `clientToken`, `site` 및 `env`가 필요합니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][2]을 참조하세요.

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">브라우저 Feature Flags는 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>{{< /site-region >}}

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  // Required
  // applicationId is a unique identifier to distinguish multiple frontend applications.
  // This should match the app ID you provide to your RUM SDK.
  applicationId: '<APPLICATION_ID>',
  // Required
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});
```

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

평가 컨텍스트를 사용하여 플래그 평가가 누구 또는 무엇에 적용되는지 정의합니다. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 사용자 또는 세션 정보가 포함됩니다. 타겟팅 규칙에서 이러한 속성을 참조하여 각 변형을 표시할 대상을 제어하세요.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 부울과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
  email: 'user@example.com',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">해당 <code>targetingKey</code> 은(는) 백분율 기반 타겟팅의 무작위화 대상으로 사용됩니다. 플래그가 대상의 백분율(예: 50%)을 타겟팅할 때, <code>targetingKey</code> 은(는) 사용자가 어떤 '버킷'에 속하는지 결정합니다. 사용자의 <code>targetingKey</code> 이(가) 동일한 경우 주어진 플래그에 대해 항상 동일한 변형을 받습니다.</div>

대부분의 애플리케이션은 시작 시 다른 서비스에서 데이터를 가져오거나 구성을 로드하는 것과 같은 여러 비동기 작업을 실행합니다. 이 예시는 기능 플래그 초기화만 보여줍니다. 각 시작 프라미스를 순차적으로 기다리기보다는 모든 시작 프라미스를 함께 시작하고 결과가 필요하기 직전에 그룹으로 기다리는 것이 좋습니다(예: `Promise.all` 사용). 이렇게 하면 전체 시작 시간이 모든 작업의 합계가 아닌 가장 느린 작업과 비슷하게 유지됩니다.

## 플래그 평가 {#evaluate-flags}

공급자가 초기화된 후에는 애플리케이션 어디에서나 플래그를 평가할 수 있습니다. 플래그 평가는 _로컬에서 즉시_ 수행됩니다. SDK는 로컬에 캐시된 데이터를 사용하므로 플래그를 평가할 때 네트워크 요청이 발생하지 않습니다.

### 클라이언트 가져오기 {#get-a-client}

플래그를 평가하려면 OpenFeature 클라이언트를 검색하세요.

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
{{< /code-block >}}

### 부울 플래그 {#boolean-flags}

켜짐/꺼짐 또는 참/거짓 조건을 나타내는 플래그에는 `getBooleanValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="javascript" >}}
const isNewCheckoutEnabled = client.getBooleanValue('checkout_new', false);

if (isNewCheckoutEnabled) {
  showNewCheckoutFlow();
} else {
  showLegacyCheckout();
}
{{< /code-block >}}

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `getStringValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="javascript" >}}
const theme = client.getStringValue('ui_theme', 'light');

switch (theme) {
  case 'dark':
    setDarkTheme();
    break;
  case 'light':
  default:
    setLightTheme();
}
{{< /code-block >}}

### 숫자 플래그 {#number-flags}

제한, 백분율, 승수와 같은 숫자 플래그에는 `getNumberValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="javascript" >}}
const maxItems = client.getNumberValue('cart_items_max', 20);
const priceMultiplier = client.getNumberValue('pricing_multiplier', 1.0);
{{< /code-block >}}

### 개체 플래그 {#object-flags}

구조화된 구성 데이터에는 `getObjectValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="javascript" >}}
const config = client.getObjectValue('promo_banner_config', {
  color: '#00A3FF',
  message: 'Welcome!',
});
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

Feature Flag 값 이외의 정보가 필요할 때는 세부 정보 메서드를 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

{{< code-block lang="javascript" >}}
const details = client.getBooleanDetails('checkout_new', false);

console.log(details.value);       // Evaluated value (true or false)
console.log(details.variant);     // Variant name, if applicable
console.log(details.reason);      // Why this value was chosen
console.log(details.errorCode);   // Error code, if evaluation failed
{{< /code-block >}}

## 완전한 예 {#complete-example}

JavaScript 애플리케이션에서 Datadog Feature Flags를 설정하고 사용하는 방법을 보여주는 완전한 예는 다음과 같습니다.

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the Datadog provider
const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
});

// Set the evaluation context
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  user_role: 'admin',
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);

// Get the client and evaluate flags
const client = OpenFeature.getClient();
const showNewFeature = client.getBooleanValue('new_feature', false);

if (showNewFeature) {
  console.log('New feature is enabled!');
}
```

## 평가 컨텍스트 업데이트 {#update-the-evaluation-context}

초기화 후 평가 컨텍스트를 업데이트(예: 사용자가 로그인할 때)하려면`OpenFeature.setContext()`를 사용하세요.

{{< code-block lang="javascript" >}}
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## 브라우저 공급자 옵션 구성 {#configure-browser-provider-options}

웹 공급자는 다음 선택적 설정도 지원합니다.

| 옵션 | 기본값 | 사용 |
| --- | --- | --- |
| `enableExposureLogging` | `true` | 노출 이벤트를 노출 수집기로 전송합니다. |
| `enableFlagEvaluationTracking` | `true` | 집계된 평가 텔레메트리를 전송합니다. |
| `enableRumFeatureFlagTracking` | `true` | 브라우저 RUM을 사용할 수 있는 경우 RUM 이벤트에 플래그 평가를 추가합니다. 이 옵션을 활성화하면 RUM 청구 이벤트 수가 증가할 수 있습니다. |
| `flagEvaluationTrackingInterval` | `10000`ms | 평가 텔레메트리를 위한 플러시 간격입니다. |
| `initialFlagsConfiguration` | `{}` | 미리 계산된 플래그로 부트스트랩합니다. |
| `flaggingProxy` | 설정되지 않음 | `site` 대신 프록시를 통해 플래그를 가져옵니다. |
| `customHeaders` | 설정되지 않음 | 플래그 가져오기 요청에 헤더를 추가합니다. |
| `overwriteRequestHeaders` | `false` | 기본 요청 헤더를 `customHeaders`로 바꿉니다. |

## 브라우저에서 플래그 재정의 {#override-flags-in-your-browser}

조직의 플래그를 탐색하고 개발 중에 로컬에서 재정의하려면 `DatadogDevtools` 래퍼를 공급자 스택에 구성하고 [Datadog Browser SDK 개발자 확장][3]의 **Feature Flags** 탭을 사용하세요.

## 테스트 {#testing}

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `InMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. `InMemoryProvider`는 `@openfeature/web-sdk`에서 직접 내보내므로 추가 종속성이 필요하지 않습니다.

서버 측 SDK와 달리 Web SDK는 초기화 후 플래그를 동기식으로 평가합니다. 공급자가 준비되었는지 확인하려면 `beforeEach`에서 `await` `setProviderAndWait`을 한 번 실행하세요.

{{< code-block lang="javascript" >}}
import { beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/web-sdk';

const flags = {
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
  ui_theme: {
    variants: { dark: 'dark', light: 'light' },
    defaultVariant: 'light',
    disabled: false,
  },
};

beforeEach(async () => {
  await OpenFeature.setProviderAndWait(new TypedInMemoryProvider(flags));
});

afterAll(async () => {
  await OpenFeature.close();
});

test('new checkout button is enabled by default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('new_checkout_button', false)).toBe(true);
});

test('missing flag returns default', () => {
  const client = OpenFeature.getClient();
  expect(client.getBooleanValue('does-not-exist', false)).toBe(false);
});
{{< /code-block >}}

Web SDK 플래그 형태에는 `variants`, `defaultVariant` 및 `disabled`가 필요합니다. 이 필드 중 하나라도 생략하면 TypeScript 컴파일에 실패합니다. 런타임에서 알 수 없는 플래그 키를 평가할 경우 제공된 기본값이 반환됩니다. 유형 검사된 플래그 구성을 위해 더 이상 사용되지 않는 `InMemoryProvider` 대신 `TypedInMemoryProvider`를 사용하세요. Jest + jsdom에서도 동일한 테스트 패턴이 작동합니다. `vitest` 가져오기를 `@jest/globals`로 바꾸고, 프로젝트에 `jest-environment-jsdom`을 추가하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: /ko/feature_flags/browser_developer_extension/