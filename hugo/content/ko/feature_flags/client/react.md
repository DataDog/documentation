---
description: React 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 Feature Flags
- link: https://openfeature.dev/docs/reference/sdks/client/web/react/
  tag: OpenFeature
  text: OpenFeature React SDK
- link: /real_user_monitoring/application_monitoring/browser/
  tag: 설명서
  text: 브라우저 모니터링
title: React Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 React 애플리케이션을 계측하는 방법을 설명합니다. Datadog Feature Flags는 앱의 기능 가용성을 원격으로 제어하고, 안전하게 실험하며, 새로운 경험을 안심하고 제공할 수 있는 통합된 방법을 제공합니다.

React용 Datadog Feature Flags SDK는 Feature Flag 관리를 위한 개방형 표준인 [OpenFeature][1]를 기반으로 구축되었습니다. 이 가이드에서는 SDK를 설치하고, Datadog 공급자를 구성하며, React 컴포넌트에서 플래그를 평가하는 방법을 설명합니다.

## 설치 {#installation}

선호하는 패키지 관리자를 사용하여 Datadog OpenFeature 공급자와 OpenFeature React SDK를 설치합니다.

{{< tabs >}}
{{% tab "npm" %}}
{{< code-block lang="bash" >}}
npm install @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "yarn" %}}
{{< code-block lang="bash" >}}
yarn add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}

{{% tab "pnpm" %}}
{{< code-block lang="bash" >}}
pnpm add @datadog/openfeature-browser @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 공급자 초기화 {#initialize-the-provider}

`DatadogProvider` 인스턴스를 생성하고 OpenFeature에 등록합니다. React 컴포넌트를 렌더링하기 전, 애플리케이션에서 최대한 빨리 이 작업을 수행하세요. 실시간 브라우저 Feature Flags 구성을 위해서는 `applicationId`, `clientToken`, `site` 및 `env`가 필요합니다. 클라이언트 토큰을 생성하려면 [클라이언트 토큰][2]을 참조하세요.

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">브라우저 Feature Flags는 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>{{< /site-region >}}

```javascript
import { DatadogProvider } from '@datadog/openfeature-browser';

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

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같은 단일한 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

평가 컨텍스트와 함께 공급자를 설정합니다.

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';

const evaluationContext = {
  targetingKey: 'user-123',
  user_id: '123',
  email: 'user@example.com',
  tier: 'premium',
};

OpenFeature.setProvider(provider, evaluationContext);
{{< /code-block >}}

<div class="alert alert-info">는 <code>targetingKey</code> 백분율 기반 타겟팅의 무작위화 대상으로 사용됩니다. 플래그가 대상의 백분율(예: 50%)을 타겟팅할 때, <code>targetingKey</code> 는 사용자가 어떤 '버킷'에 속하는지 결정합니다. 사용자의 <code>targetingKey</code> 가 동일한 경우 주어진 플래그에 대해 항상 동일한 변형을 받습니다.</div>

## 애플리케이션 래핑 {#wrap-your-application}

`OpenFeatureProvider` 컴포넌트로 애플리케이션을 래핑하세요. 이렇게 하면 React 컨텍스트를 통해 모든 하위 컴포넌트에서 Feature Flags를 사용할 수 있습니다.

{{< code-block lang="jsx" >}}
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
  return (
    <OpenFeatureProvider>
      <YourApp />
    </OpenFeatureProvider>
  );
}
{{< /code-block >}}

## 플래그 평가 {#evaluate-flags}

OpenFeature React SDK는 컴포넌트 내에서 플래그를 평가하기 위한 후크를 제공합니다. 각 후크는 구성한 평가 컨텍스트를 기반으로 플래그 값을 반환합니다.

### 불리언 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `useBooleanFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';

function CheckoutButton() {
  const isNewCheckoutEnabled = useBooleanFlagValue('new_checkout_button', false);

  if (isNewCheckoutEnabled) {
    return <NewCheckoutButton />;
  }

  return <LegacyCheckoutButton />;
}
{{< /code-block >}}

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `useStringFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useStringFlagValue } from '@openfeature/react-sdk';

function ThemedComponent() {
  const theme = useStringFlagValue('ui_theme', 'light');

  switch (theme) {
    case 'dark':
      return <DarkTheme />;
    case 'light':
    default:
      return <LightTheme />;
  }
}
{{< /code-block >}}

### 숫자 플래그 {#number-flags}

제한, 백분율, 승수와 같은 숫자 플래그에는 `useNumberFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useNumberFlagValue } from '@openfeature/react-sdk';

function CartDisplay() {
  const maxItems = useNumberFlagValue('max_cart_items', 20);

  return <Cart maxItems={maxItems} />;
}
{{< /code-block >}}

### 객체 플래그 {#object-flags}

구조화된 구성 데이터에는 `useObjectFlagValue(key, defaultValue)`를 사용하세요.

{{< code-block lang="jsx" >}}
import { useObjectFlagValue } from '@openfeature/react-sdk';

function Banner() {
  const config = useObjectFlagValue('promo_banner', {
    color: '#00A3FF',
    message: 'Welcome!',
  });

  return <PromoBanner color={config.color} message={config.message} />;
}
{{< /code-block >}}

### Suspense 지원 {#suspense-support}

내장 [suspense](https://react.dev/reference/react/Suspense) 지원을 사용하면 공급자 초기화가 완료될 때까지 또는 컨텍스트가 변경될 때 Feature Flags가 적용된 컴포넌트가 표시되지 않도록 할 수 있습니다. 이 기능을 사용하려면 후크 옵션에 `{ suspend: true }`를 전달하세요.

예:

{{< code-block lang="jsx" >}}
import { useBooleanFlagValue } from '@openfeature/react-sdk';
import { Suspense } from 'react';

function Content() {
  // Display a loading message if the component uses feature flags and the provider is not ready
  return (
    <Suspense fallback={"Loading..."}>
      <WelcomeMessage />
    </Suspense>
  );
}

function WelcomeMessage() {
  const showNewMessage = useBooleanFlagValue('show-new-welcome-message', false, { suspend: true });

  return (
    <>
      {showNewMessage ? (
        <p>Welcome! You're seeing the new experience.</p>
      ) : (
        <p>Welcome back!</p>
      )}
    </>
  );
}
{{< /code-block >}}

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 외에 추가 정보가 필요한 경우 세부 정보 후크를 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

* `useBooleanFlagDetails(key, defaultValue)`
* `useStringFlagDetails(key, defaultValue)`
* `useNumberFlagDetails(key, defaultValue)`
* `useObjectFlagDetails(key, defaultValue)`

예:

{{< code-block lang="jsx" >}}
import { useStringFlagDetails } from '@openfeature/react-sdk';

function PaywallLayout() {
  const details = useStringFlagDetails('paywall_layout', 'control');

  console.log(details.value);   // Evaluated value (for example: "A", "B", or "control")
  console.log(details.variant); // Variant name, if applicable
  console.log(details.reason);  // Description of why this value was chosen

  return <Layout variant={details.value} />;
}
{{< /code-block >}}

Feature Flag 세부 정보는 평가 동작을 디버깅하고 사용자가 특정 값을 받은 이유를 이해하는 데 도움이 됩니다.

## 전체 예시 {#complete-example}

React 애플리케이션에서 Datadog Feature Flags를 설정하고 사용하는 방법을 보여주는 전체 예시는 다음과 같습니다.

```jsx
import { Suspense } from 'react';
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeatureProvider, OpenFeature, useBooleanFlagValue } from '@openfeature/react-sdk';

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

OpenFeature.setProvider(provider, evaluationContext);

// Wrap your app with the OpenFeatureProvider and Suspense for loading state
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <OpenFeatureProvider suspendUntilReady>
        <Page />
      </OpenFeatureProvider>
    </Suspense>
  );
}

// Use feature flags in your components
function Page() {
  const showNewFeature = useBooleanFlagValue('new_feature', false);

  return (
    <div>
      {showNewFeature ? <NewFeature /> : <ExistingFeature />}
    </div>
  );
}
```

## 평가 컨텍스트 업데이트 {#update-the-evaluation-context}

초기화 후 평가 컨텍스트를 업데이트(예: 사용자가 로그인할 때)하려면`OpenFeature.setContext()`를 사용하세요.

{{< code-block lang="javascript" >}}
// When a user logs in
await OpenFeature.setContext({
  targetingKey: user.id,
  user_id: user.id,
  email: user.email,
  plan: user.plan,
});
{{< /code-block >}}

## 브라우저 공급자 옵션 구성 {#configure-browser-provider-options}

React 공급자는 다음과 같은 선택적 설정을 지원하는 Datadog 브라우저 공급자를 사용합니다.

| 옵션 | 기본값 | 사용 |
| --- | --- | --- |
| `enableExposureLogging` | `true` | 노출 이벤트를 노출 수집기로 전송합니다. |
| `enableFlagEvaluationTracking` | `true` | 집계된 평가 텔레메트리를 전송합니다. |
| `enableRumFeatureFlagTracking` | `true` | 브라우저 RUM을 사용할 수 있는 경우 RUM 이벤트에 플래그 평가를 추가합니다. 이 옵션을 활성화하면 RUM 청구 이벤트 수가 증가할 수 있습니다. |
| `flagEvaluationTrackingInterval` | `10000`ms | 평가 텔레메트리를 위한 플러시 간격입니다. |
| `initialFlagsConfiguration` | unset | 가져오기에 실패할 경우 대체 수단으로 컨텍스트와 일치하는 사전 계산 데이터를 제공합니다. [초기 사전 계산 대체 데이터][3]를 참조하세요. |
| `flaggingProxy` | 설정되지 않음 | `site` 대신 프록시를 통해 플래그를 가져옵니다. |
| `customHeaders` | 설정되지 않음 | 플래그 가져오기 요청에 헤더를 추가합니다. |
| `overwriteRequestHeaders` | `false` | 기본 요청 헤더를 `customHeaders`로 바꿉니다. |

`DatadogProvider`는 여전히 React 애플리케이션에 권장되는 브라우저 공급자입니다. 애플리케이션 자체의 구성 전달 또는 컨텍스트 변경 전반의 로컬 규칙 평가에 대해서는 [브라우저 규칙 기반 평가][4]를 참조하세요. 이 고급 설정을 사용하려면 명시적인 구성 새로 고침과 추적 수명 주기 관리가 필요합니다.

## 테스트 {#testing}

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `TypedInMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에서는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 보여줍니다. `TypedInMemoryProvider`는 `@openfeature/web-sdk`에서 내보냅니다. 이를 개발 의존성으로 설치하고 테스트 대상 컴포넌트를 렌더링하기 전에 등록합니다.

{{< code-block lang="javascript" >}}
import { OpenFeature } from '@openfeature/react-sdk';
import { TypedInMemoryProvider } from '@openfeature/web-sdk';

await OpenFeature.setProviderAndWait(new TypedInMemoryProvider({
  new_checkout_button: {
    variants: { on: true, off: false },
    defaultVariant: 'on',
    disabled: false,
  },
}));
{{< /code-block >}}

Web SDK 플래그 형태에는 `variants`, `defaultVariant` 및 `disabled`가 필요합니다. 테스트 과정에서 플래그가 지정된 컴포넌트를 즉시 렌더링할 때 suspense 경쟁 상태를 방지하려면 `setProviderAndWait`(`setProvider` 아님)를 사용합니다. React 트리를 마운트하는 컴포넌트 테스트의 경우, `@openfeature/react-sdk`는 하위 항목을 인메모리 공급자로 래핑하는 `OpenFeatureTestProvider` 컴포넌트도 내보냅니다. 자세한 내용은 [OpenFeature React SDK 문서](https://openfeature.dev/docs/reference/technologies/client/web/react)를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/
[2]: /ko/account_management/api-app-keys/#client-tokens
[3]: /ko/feature_flags/client/javascript/#supply-initial-precomputed-fallback-data
[4]: /ko/feature_flags/implementation_patterns/browser_rules_based_evaluation/