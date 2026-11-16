---
description: 애플리케이션에서 구성을 관리하고 필요시 추적 훅을 사용하는 고급 브라우저 설정에는 DatadogCoreProvider를 사용하세요.
further_reading:
- link: /feature_flags/client/javascript/
  tag: 문서
  text: JavaScript Feature Flags
- link: /feature_flags/concepts/evaluation_context/
  tag: 문서
  text: 평가 컨텍스트
- link: /feature_flags/concepts/distribution_channels/
  tag: 문서
  text: 배포 채널
title: 브라우저 규칙 기반 평가
---
## 개요 {#overview}

**대부분의 브라우저 애플리케이션에는 `DatadogProvider`를 사용하세요.** 구성 가져오기, 컨텍스트 업데이트, 기본 제공 텔레메트리를 관리합니다. 설정 방법은 [JavaScript Feature Flags][1]를 참조하세요.

`DatadogCoreProvider` 는 애플리케이션에서 제공하는 구성을 평가하는 고급 OpenFeature 호환 프로바이더입니다. 구성을 가져오거나 폴링하지 않고 추적 훅을 설치하거나 텔레메트리를 전송하지도 않습니다. 규칙 기반 구성을 사용하면 OpenFeature 컨텍스트가 변경될 때 새 할당 정보를 가져오지 않고 로컬에서 타겟팅 규칙을 평가합니다.

## 이 접근 방식을 사용하는 경우 {#when-to-use-this-approach}

애플리케이션에 다음 기능 중 하나 이상이 필요한 경우 `DatadogCoreProvider`를 선택하세요.

- 컨텍스트가 변경될 때마다 구성 요청을 보내지 않고도 변경된 컨텍스트에 대한 타겟팅 규칙을 평가합니다.
- 서버에서 렌더링한 부트스트랩 페이로드 등 애플리케이션에서 제어하는 전달 경로를 통해 구성을 제공합니다.
- 구성 새로 고침을 제어하고 애플리케이션에 필요한 추적 통합만 조합합니다.

구성의 가용성과 최신 상태 유지 및 추적 수명 주기는 애플리케이션에서 관리합니다.

## 전제 조건 {#prerequisites}

- [JavaScript 설치 지침][2]에 따라 `@datadog/openfeature-browser` 2.0.0 이상, `@openfeature/web-sdk` 및 `@openfeature/core`를 설치합니다. 예시에서는 npm 패키지를 가져오는 방식을 사용합니다.
- Datadog에서 규칙을 가져오려면 [클라이언트 토큰][3], 환경 이름 및 Datadog 사이트를 제공합니다.
- 조직에서 클라이언트 규칙 전달을 활성화하려면 **Feature Flag Environment Config Write** 권한이 필요합니다. 설정이 이미 활성화된 경우 SDK를 사용하는 데 이 권한은 필요하지 않습니다. [권한 및 액세스 제어][9]를 참조하세요.
- 브라우저에 적합한 플래그만 **Client** [배포 채널][4]에 배포합니다.

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">브라우저 Feature Flags는 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}}).</div>{{< /site-region >}}

<div class="alert alert-warning">브라우저에 전달된 구성은 검사할 수 있으며, 여기에는 구성에 포함된 모든 타겟팅 규칙과 값이 포함됩니다. 민감한 구성과 권한 부여 관련 결정은 서버에서 처리하세요. 클라이언트 측 기능 플래그는 액세스 제어 수단이 아닙니다.</div>

## 시작하기 {#getting-started}

세션 도중 평가 컨텍스트가 반복적으로 변경되는 브라우저 애플리케이션에서는 `fetchRulesConfiguration()`을 `DatadogCoreProvider`와 함께 사용하세요. 규칙을 한 번 로드한 다음 이후 평가와 컨텍스트 변경 시 프로바이더와 구성을 재사용하세요.

Feature Flags 요금은 로컬 평가가 아닌 [월간 플래그 구성 요청(MFCR)][7] 수를 기준으로 산정됩니다. 최초 규칙 가져오기와 이후 새로 고침은 MFCR에 포함되지만 로컬 컨텍스트 변경은 포함되지 않습니다.

### 클라이언트 규칙 전달 활성화 {#enable-client-rules-delivery}

규칙을 가져오기 전에 조직의 클라이언트 규칙 전달을 활성화합니다. 이 설정은 기본적으로 비활성화되어 있습니다.

1. **Feature Flags** > **Settings** > [**Flag Delivery**][8]를 엽니다.
2. **Allow local rule evaluation in client SDKs**를 활성화합니다.
3. **Save**를 클릭합니다.

이 설정은 플래그별 [**Client** 배포 채널][4]과 별개입니다. 표준 사전 계산 방식의 `DatadogProvider` 설정에는 이 옵션이 필요하지 않습니다.

### 규칙 가져오기 및 초기화 {#fetch-rules-and-initialize}

`DatadogCoreProvider` 및 `fetchRulesConfiguration`을 `@datadog/openfeature-browser/rules-based`에서 가져옵니다. 규칙을 가져오고 결과의 유효성을 검사한 후 프로바이더에 제공합니다.

```javascript
import {
  DatadogCoreProvider,
  fetchRulesConfiguration,
} from '@datadog/openfeature-browser/rules-based';
import { OpenFeature } from '@openfeature/web-sdk';

const configurationOptions = {
  clientToken: '<CLIENT_TOKEN>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
};

async function loadRulesConfiguration() {
  const configuration = await fetchRulesConfiguration(configurationOptions);
  if (!configuration.rules) {
    throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
  }
  return configuration;
}

const configuration = await loadRulesConfiguration();
const provider = new DatadogCoreProvider();
provider.setConfiguration(configuration);

const domain = 'browser-flags';
await OpenFeature.setProviderAndWait(domain, provider, {
  targetingKey: 'user-123',
  plan: 'free',
});

const client = OpenFeature.getClient(domain);
const enabled = client.getBooleanValue('checkout_new', false);
```

가져오기 헬퍼가 구성 요청을 전송합니다. 프로바이더를 등록하거나 플래그를 평가하는 과정에서는 구성을 가져오지 않습니다. 이 헬퍼는 애플리케이션에서 전송을 제어할 수 있도록 `fetch` 구현과 중단용 `signal`도 지원합니다.

애플리케이션 시작 과정에서 초기화 오류를 포착하고 재시도할지 기본 동작으로 계속 진행할지 결정하세요. `setProviderAndWait()`가 거부되었다면 프로바이더가 준비된 상태라고 가정하지 마세요.

### 평가 컨텍스트 변경 {#change-the-evaluation-context}

컨텍스트를 업데이트할 때 동일한 도메인을 사용합니다.

{{< code-block lang="javascript" >}}
await OpenFeature.setContext(domain, {
  targetingKey: 'user-456',
  plan: 'premium',
});

const enabledForUpdatedContext = client.getBooleanValue('checkout_new', false);
{{< /code-block >}}

규칙 구성은 메모리에 유지되며 새로운 컨텍스트를 기준으로 평가됩니다. 컨텍스트가 변경될 때마다 `loadRulesConfiguration()`을 다시 호출하지 마세요. 구성 요청이 이루어지지 않습니다. 필요시 추적 훅을 사용하여 평가 관련 텔레메트리를 전송할 수 있습니다.

[플랫 컨텍스트 속성][5]을 사용하고 타겟팅에 필요한 속성을 명시적으로 제공하세요. `DatadogCoreProvider`는 RUM에서 사용자 속성을 자동으로 복사하지 않습니다.

## 구성 새로 고침 {#refresh-configuration}

프로바이더는 플래그 변경 사항을 폴링하지 않습니다. 애플리케이션에서 구성을 새로 고칠 시점을 정한 다음 후속 평가 전에 구성을 교체합니다.

{{< code-block lang="javascript" >}}
try {
  const nextConfiguration = await loadRulesConfiguration();
  provider.setConfiguration(nextConfiguration);
} catch (error) {
  console.warn('Could not refresh flag configuration; keeping the previous configuration.', error);
}
{{< /code-block >}}

가져오기 또는 구문 분석에 실패하면 프로바이더는 이전 구성을 계속 사용합니다. 이 예시에서는 오류를 기록하며 애플리케이션의 최신 상태 유지 요구 사항에 따라 재시도 기능을 추가할 수 있습니다. Datadog에서 변경한 사항은 애플리케이션이 업데이트된 구성을 제공하기 전까지 해당 프로바이더에 반영되지 않습니다.

## 선택 사항: 이식 가능한 구성 제공 {#optional-supply-portable-configuration}

브라우저에서 규칙을 가져오는 대신 애플리케이션에서 직렬화된 규칙 구성을 전달할 수 있습니다. 이미 가져온 규칙 구성에 `configurationToString(configuration)`을 호출하여 이 문자열을 생성합니다. `@datadog/openfeature-browser/rules-based`에서 이 헬퍼를 가져옵니다.

서버에서 렌더링한 부트스트랩 페이로드 등을 통해 애플리케이션에서 결과 문자열을 브라우저로 전달합니다. 아래의 `<SERIALIZED_RULES_CONFIGURATION>`을 해당 문자열로 바꾸고 초기화 예시의 `loadRulesConfiguration()` 호출 대신 다음 코드를 사용합니다.

{{< code-block lang="javascript" >}}
import { configurationFromString } from '@datadog/openfeature-browser/rules-based';

const configuration = configurationFromString('<SERIALIZED_RULES_CONFIGURATION>');
if (!configuration.rules) {
  throw new Error(configuration.rulesError ?? 'Expected a rules-based configuration');
}
{{< /code-block >}}

직렬화된 문자열은 규칙 엔드포인트에서 반환한 원시 바이너리 응답과 다릅니다. HTML에 구성을 포함할 때는 프레임워크의 안전한 직렬화 메커니즘을 사용하세요. 문자열을 구문 분석하고 제공하는 과정에서는 구성 요청이 발생하지 않습니다.

### 사전 계산된 구성 {#precomputed-configurations}

사전 계산된 구성에는 특정 컨텍스트에 대한 할당 정보가 포함되며 다른 컨텍스트에서 재평가할 수 있는 규칙은 포함되지 않습니다. 이 구성을 `DatadogCoreProvider`에 제공하는 경우 `getPrecomputedContext(configuration)`에서 반환된 컨텍스트를 `setProviderAndWait()`에 전달합니다. 컨텍스트가 일치하지 않으면 invalid-context 오류가 발생하며 프로바이더는 대체 할당 정보를 가져오지 않습니다.

## 필요시 추적 훅 추가 {#add-optional-tracking-hooks}

프로바이더는 기본적으로 추적하지 않고 평가를 수행합니다. 애플리케이션에 필요한 통합만 추가합니다.

| 팩토리 | 동작 |
| --- | --- |
| `createDatadogExposureLoggingHook(trackingOptions)` | 대상 노출 이벤트의 중복을 제거하고 일괄 처리합니다. |
| `createDatadogEvaluationLoggingHook(trackingOptions)` | 플래그 평가 텔레메트리를 집계하고 전송합니다. |
| `createDatadogRumTrackingHook()` | 기존 전역 `DD_RUM` 인스턴스에 플래그 평가 결과를 추가합니다. RUM을 초기화하거나 평가 컨텍스트를 채우지 않습니다. |

`composeDatadogTrackingHooks()`를 사용하여 선택한 통합을 한꺼번에 초기화하고 종료합니다. 추적이 필요한 평가를 수행하기 전에 초기화 예시의 클라이언트에 해당 훅을 등록합니다.

```javascript
import {
  composeDatadogTrackingHooks,
  createDatadogExposureLoggingHook,
  createDatadogEvaluationLoggingHook,
  createDatadogRumTrackingHook,
} from '@datadog/openfeature-browser/rules-based';

const trackingOptions = {
  clientToken: '<CLIENT_TOKEN>',
  applicationId: '<APPLICATION_ID>',
  site: '{{< region-param key="dd_site" code="true" >}}',
  env: '<ENV_NAME>',
  service: '<SERVICE_NAME>',
};

const tracking = composeDatadogTrackingHooks(
  createDatadogExposureLoggingHook(trackingOptions),
  createDatadogEvaluationLoggingHook(trackingOptions),
  createDatadogRumTrackingHook(),
);

await tracking.initialize();
client.addHooks(...tracking.hooks);

const trackedValue = client.getBooleanValue('checkout_new', false);
```

이 훅은 해당 클라이언트 인스턴스를 통해 수행한 평가에서만 실행됩니다. 추적 대상 평가에는 동일한 클라이언트를 계속 사용합니다. 특정 통합을 제외하려면 해당 통합의 가져오기와 팩토리 호출을 생략합니다. RUM 추적을 사용하려면 [Browser RUM][6]을 `DD_RUM`으로 사용할 수 있어야 하며 RUM 과금 대상 이벤트 수가 증가할 수 있습니다.

노출 및 평가 훅은 `initialize()`가 완료될 때까지 이벤트를 수집하지 않습니다. 노출 이벤트는 일괄 처리되고 중복 제거되므로 평가를 반복해도 추가 노출 요청이 발생하지 않을 수 있습니다.

추적이 더 이상 필요하지 않으면 훅 등록을 해제하고 관련 리소스를 종료합니다.

{{< code-block lang="javascript" >}}
client.clearHooks();
await tracking.shutdown();
{{< /code-block >}}

`clearHooks()`는 해당 클라이언트에서 **모든 클라이언트 수준 훅**을 제거합니다. 이 예시에서는 클라이언트가 해당 추적 설정에만 사용된다고 가정합니다. 전역 훅이나 프로바이더 훅은 제거하지 않습니다. `shutdown()`은 마지막 플러시를 요청하고 추적 타이머와 구독을 중지합니다. 다만 함수가 반환되더라도 모든 네트워크 요청이 완료되었다는 보장은 없습니다. 훅을 제거하거나 코어 프로바이더를 제거하는 것만으로는 수동으로 생성한 추적 리소스가 종료되지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/client/javascript/
[2]: /ko/feature_flags/client/javascript/#installation
[3]: /ko/account_management/api-app-keys/#client-tokens
[4]: /ko/feature_flags/concepts/distribution_channels/
[5]: /ko/feature_flags/concepts/evaluation_context/#context-attributes
[6]: /ko/real_user_monitoring/application_monitoring/browser/
[7]: /ko/feature_flags/concepts/monthly_flag_configuration_requests/
[8]: https://app.datadoghq.com/feature-flags/settings/flag-delivery
[9]: /ko/feature_flags/concepts/permissions/