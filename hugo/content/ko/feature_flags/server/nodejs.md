---
description: Node.js 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/server/
  tag: 문서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/dd_libraries/nodejs/
  tag: 문서
  text: Node.js 트레이싱
- link: /tracing/
  tag: 문서
  text: Application Performance Monitoring(APM)이란?
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
- link: /feature_flags/concepts/configuration_sources/
  tag: 개념
  text: 서버 SDK 구성 소스
title: Node.js Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Datadog Feature Flags SDK를 사용하여 Node.js 애플리케이션을 계측하는 방법을 설명합니다. Node.js SDK는 Feature Flags 관리를 위한 오픈 표준인 [OpenFeature][2]와 통합됩니다. `dd-trace` 6.12.0 이상에서는 기본적으로 Datadog 관리 CDN에서 직접 플래그 구성을 로드합니다.

Agentless Node.js는 플래그를 로컬에서 평가하고 실험 노출 이벤트를 전송합니다. 호환되는 로컬 EVP(Event Platform Proxy) 릴레이를 우선적으로 사용합니다. 호환되는 릴레이를 사용할 수 없는 경우 노출 이벤트를 직접 전송합니다. EVP 플래그 평가 이벤트는 전송하지 않습니다.

## 시작하기 {#getting-started}

기본 Agentless 설정을 위해서는 다음이 필요합니다.

- **Datadog Node.js SDK** `dd-trace` 버전 **6.12.0 이상**
- Datadog [API 키][3]
- Datadog 사이트
- **@openfeature/server-sdk** 버전 1.20.0 이상 1.21.0 미만

## 설치 및 초기화 {#installing-and-initializing}

Feature Flagging 기능은 Application Performance Monitoring(APM)을 통해 제공됩니다. Feature Flags 지원과 함께 APM을 애플리케이션에 통합하려면 `dd-trace`를 설치하고 Datadog OpenFeature 공급자를 초기화하세요. 자세한 APM 설치 지침은 [Node.js 애플리케이션 트레이싱][1]을 참조하세요.

```shell
npm install dd-trace@^6.12.0 @openfeature/server-sdk
```

### Agentless 전달 구성 {#configure-agentless-delivery}

애플리케이션 프로세스에서 API 키, Datadog 사이트 및 환경을 구성하세요.

```shell
DD_API_KEY=<YOUR_API_KEY>
DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<YOUR_ENVIRONMENT>
```

Feature Flags 활성화 또는 소스 설정이 필요하지 않습니다. 아래와 같이 `tracer.openfeature`에 액세스하여 OpenFeature에 등록하면 폴링이 시작됩니다. `dd-trace`만 설치하거나 초기화한다고 해서 Feature Flags CDN 트래픽이 생성되지는 않습니다.

코드에서 공급자를 초기화합니다.

```javascript
import { OpenFeature } from '@openfeature/server-sdk'
import tracer from 'dd-trace';

tracer.init();

// Accessing tracer.openfeature activates the default agentless source.
// setProviderAndWait resolves after the selected source loads, so flags
// evaluate against real configuration data instead of default values.
try {
  await OpenFeature.setProviderAndWait(tracer.openfeature);
} catch (err) {
  // If initialization fails, evaluations return default values until the
  // provider receives its first configuration. Log the error so it's visible.
  console.error('Datadog feature flag provider failed to initialize', err);
}
```

이 예제들은 `await`을 최상위 수준에서 사용할 수 있는 ESM 모듈을 사용합니다. CommonJS에서는 최상위 `await`을 비동기 함수로 감싸야 합니다.

대부분의 애플리케이션은 데이터베이스 연결 열기나 구성 로드와 같은 다른 비동기 시작 작업도 실행합니다. 이러한 프로미스를 공급자 프로미스와 함께 시작한 후 이를 그룹으로 기다리면, 전체 시작 시간이 모든 작업의 ​​합계가 아닌 가장 느린 작업의 소요 시간에 근접하게 유지됩니다.

```javascript
// Start feature flag setup alongside your other startup tasks, then await them together.
const [_, db] = await Promise.all([
  // Catch here so a failed provider init does not reject the whole batch.
  // Evaluations return default values until the provider receives its config.
  OpenFeature.setProviderAndWait(tracer.openfeature).catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  }),
  connectToDatabase(), // your application's other async startup work
]);
// db is connected and the server can start; flags evaluate against real configuration, or fall back to defaults if initialization failed.
```

위와 같이 공급자가 준비될 때까지 시작을 차단하는 방식은 대부분의 애플리케이션에서 잘 작동합니다. 초기화가 완료되기 전에 애플리케이션이 요청 처리를 시작해야 하는 경우, 다음 전략 중 하나를 선택하세요.

### 초기화 전 기본값 수락{#accepting-default-values-before-initialization}

처음 몇 번의 요청에 대해 실제 값을 제공하는 것보다 시작 시 응답성이 더 중요한 경우, 초기화를 기다리지 않고 `setProvider`를 호출할 수 있습니다. `setProvider`는 동기식이므로, 선택한 구성 소스가 백그라운드에서 로드될 때까지 클라이언트는 기본값을 반환합니다.

```javascript
OpenFeature.setProvider(tracer.openfeature);
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

###  공급자 초기화 대기 {#waiting-for-provider-initialization}

서버가 실제 구성 데이터에 대해 평가하면서도 즉시 수신을 시작하도록 하려면, 요청 시점까지 대기를 연기할 수 있습니다. 초기화 프로미스를 저장한 다음, 플래그를 평가하기 전에 각 요청 핸들러에서 해당 프로미스를 기다리세요. 초기화가 완료되기 전에 도착한 요청은 초기화가 끝날 때까지 기다립니다.

```javascript
// Attach the catch once, at creation. This logs a failed initialization a
// single time and keeps the shared promise from rejecting on every request;
// evaluations return default values until the provider receives its first
// configuration.
const initializationPromise = OpenFeature.setProviderAndWait(tracer.openfeature)
  .catch((err) => {
    console.error('Datadog feature flag provider failed to initialize', err);
  });
const client = OpenFeature.getClient();

app.get('/my-endpoint', async (req, res) => {

  const flagKey = 'my-flag';
  const defaultValue = false;
  const evaluationContext = {
    targetingKey: req.session?.userID ?? 'unknown', // targetingKey is required context
    companyID: req.session?.companyID
  };

  // Wait for initialization if necessary. The promise is already handled
  // above, so awaiting it here never throws, even if initialization failed.
  await initializationPromise;

  // Note: evaluations are synchronous, but return a Promise type
  //       to follow the OpenFeature provider specifications
  const value = await client.getBooleanValue(flagKey, defaultValue, evaluationContext);

  if (value) {
    res.send('feature enabled!');
  } else {
    res.send('feature disabled!');
  }

});
```

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

`EvaluationContext`를 사용하여 플래그 평가가 적용되는 사람 및 대상을 정의하세요. 평가 컨텍스트에는 반환할 플래그 변형을 결정하는 데 사용되는 사용자 또는 세션 정보가 포함될 수 있습니다. 플래그를 평가하기 전에 `OpenFeature.setContext` 메서드를 호출하여 적절한 타겟팅을 보장할 수 있습니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같이 중첩되지 않은 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

## 플래그 평가 {#evaluate-flags}

[Installing and initializing](#installing-and-initializing) 섹션에 설명된 대로 `OpenFeature` 클라이언트를 만든 후, 앱 전체에서 플래그 값을 읽기 시작할 수 있습니다. 플래그 평가는 로컬에 캐시된 데이터를 사용하므로 플래그를 평가할 때 네트워크 요청이 발생하지 않습니다.

각 플래그는 _키_(고유 문자열)로 식별되며 예상되는 유형의 값을 반환하는 _유형화된 getter_로 평가할 수 있습니다. 각 플래그가 존재하지 않거나 평가할 수 없는 경우, SDK는 제공된 기본값을 반환합니다.

### 불리언 플래그 {#boolean-flags}

on/off 또는 true/false 조건을 나타내는 플래그에는 `getBooleanValue()`를 사용합니다. 선택적으로 특정 타겟팅 규칙에 대한 컨텍스트를 설정하세요.

```javascript
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
```

### 문자열 플래그 {#string-flags}

여러 변형 또는 구성 문자열 중에서 선택하는 플래그에는 `getStringValue()`를 사용합니다. 예시:

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID
};

const searchAlgorithm = await client.getStringValue(
  'search-algorithm', // flag key
  'basic', // default value
  evaluationContext,
);

switch (searchAlgorithm) {
  case 'basic':
      return basicSearch(query);
  case 'fuzzy':
      return fuzzySearch(query);
  case 'semantic':
      return semanticSearch(query);
  default:
      return basicSearch(query);
}
```

### 숫자 플래그 {#number-flags}

숫자 플래그의 경우 `getNumberValue()`를 사용합니다. 이는 기능이 제한, 백분율 또는 승수와 같은 숫자 파라미터에 의존할 때 적합합니다.

```javascript
const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const maxItems = await client.getNumberValue(
    'max-cart-items', // flag key
    20, // default value
    evaluationContext,
);

const priceMultiplier = await client.getNumberValue(
    'pricing-multiplier', // flag key
    1.3, // default value
    evaluationContext,
);
```

### 객체 플래그 {#object-flags}

구조화된 JSON 데이터의 경우 `getObjectValue()`를 사용합니다. 이 메서드는 `object`를 반환하며, 이 값은 기본 형식, 배열 또는 딕셔너리를 나타낼 수 있습니다. 객체 플래그는 여러 속성을 함께 제공해야 할 때 유용합니다.

```javascript
const defaultConfig = {
  color: '#00A3FF',
  fontSize: 14,
};

const evaluationContext = {
  targetingKey: req.session?.userID ?? 'unknown',
  companyID: req.session?.companyID,
};

const config = await client.getObjectValue('ui-config', defaultConfig, evaluationContext);
```

### 플래그 평가 세부 정보 {#flag-evaluation-details}

플래그 값 외에 추가 정보가 필요한 경우 `get<Type>Details` 함수를 사용하세요. 이 메서드는 평가된 값과 평가 이유를 설명하는 메타데이터를 모두 반환합니다.

* `getBooleanDetails() -> Promise<EvaluationDetails<boolean>>`
* `getStringDetails() -> Promise<EvaluationDetails<string>>`
* `getNumberDetails() -> Promise<EvaluationDetails<number>>`
* `getObjectDetails() -> Promise<EvaluationDetails<JsonValue>>`

예시:

```javascript
const details = await client.getStringDetails('paywall-layout', 'control', evaluationContext);

console.log(details.value);        // Evaluated value (for example: "A", "B", or "control")
console.log(details.variant);      // Variant name, if applicable
console.log(details.reason);       // Description of why this value was chosen (for example: "TARGETING_MATCH")
console.log(details.errorCode);    // The error that occurred during evaluation, if any
console.log(details.errorMessage); // A more detailed message of the error that occurred, if any
console.log(details.flagMetadata); // Additional information about the evaluation
```

## 고급 구성 {#advanced-configuration}

소스 선택 및 운영 설정에 대한 표준 참조로 [서버 SDK 구성 소스][6]를 사용하세요.

- 폴링, 요청 시간 초과 및 엔드포인트 설정을 포함하여 [Agentless 전송을 구성][9]
- 고급 테스트, 로컬 개발 또는 운영자가 관리하는 프록시에 대해 [사용자 지정 Agentless 엔드포인트를 사용][7]
- Agent가 관리하는 전달을 유지하기 위해 [Agent Remote Configuration을 사용][10]
- [기존 Remote Configuration 설정을 마이그레이션][8]하고 더 이상 사용되지 않는 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 설정을 제거

Agentless 모드에서 Node.js는 사용 가능한 경우 호환되는 로컬 텔레메트리 릴레이를 사용합니다. 호환되는 릴레이를 사용할 수 없는 경우 실험 노출 이벤트를 직접 보냅니다. Agent가 없는 Serverless 환경의 경우 [`serverless-init`][11]를 로컬 텔레메트리 릴레이로 사용할 수 있습니다.

`feature_flag.evaluations` 메트릭은 [서버 측 플래그 평가 메트릭][4] 가이드의 별도 OTLP 설정을 사용합니다. 지원되는 Agent 또는 Serverless 텔레메트리 수신기가 필요합니다. 사용 가능한 그래프 작성에 대한 자세한 내용은 [Feature Flag 그래프][5]를 참조하세요.

## 테스트 {#testing}

실제 `tracer.openfeature` 공급자를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `TypedInMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 설명합니다. `TypedInMemoryProvider`는 `@openfeature/server-sdk`와 함께 제공되므로 추가 종속성이 필요하지 않습니다.

인메모리 공급자를 사용할 때는 `tracer.init()`를 호출하거나 `tracer.openfeature`를 공급자로 설정하지 마세요. 이는 기존 동작을 대체하는 것입니다.

OpenFeature API는 Node.js 프로세스당 하나의 싱글톤입니다. 한 테스트 파일의 상태가 다음 파일로 유출되지 않도록 `afterAll`에서 `OpenFeature.close()` 또는 `OpenFeature.clearProviders()`로 재설정하세요.

```javascript
// flags.test.js
import { beforeAll, beforeEach, afterAll, expect, test } from 'vitest';
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';

const flags = {
  'new-checkout-flow': {
    variants: { on: true, off: false },
    defaultVariant: 'off',
    disabled: false,
    contextEvaluator: (ctx) => (ctx.companyID === 'beta-co' ? 'on' : 'off'),
  },
};

let provider;

beforeAll(async () => {
  provider = new TypedInMemoryProvider(flags);
  await OpenFeature.setProviderAndWait(provider);
});

beforeEach(() => {
  // Reset flag state between tests to prevent cross-test pollution.
  provider.putConfiguration(flags);
});

afterAll(async () => {
  await OpenFeature.close();
});

test('beta company sees new checkout', async () => {
  const client = OpenFeature.getClient();
  const value = await client.getBooleanValue('new-checkout-flow', false, {
    targetingKey: 'user-1',
    companyID: 'beta-co',
  });
  expect(value).toBe(true);
});

test('non-beta company falls back to default', async () => {
  const client = OpenFeature.getClient();
  const details = await client.getBooleanDetails('new-checkout-flow', false, {
    targetingKey: 'user-2',
    companyID: 'acme',
  });
  expect(details.value).toBe(false);
  expect(details.variant).toBe('off');
});
```

위 스니펫은 최고 수준의 ESM 지원을 위해 Vitest를 사용합니다. Jest에서도 동일한 패턴이 작동합니다. Jest 사용자는 프로젝트가 ESM인 경우 `--experimental-vm-modules`가 필요할 수 있습니다. 제네릭이 아닌 `InMemoryProvider` 내보내기는 더 이상 사용되지 않으므로 `TypedInMemoryProvider`를 사용하는 것이 좋습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: https://openfeature.dev/
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[5]: /ko/feature_flags/concepts/flag_graphs/
[6]: /ko/feature_flags/concepts/configuration_sources/
[7]: /ko/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[8]: /ko/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[9]: /ko/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[10]: /ko/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[11]: /ko/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry