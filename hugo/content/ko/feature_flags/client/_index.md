---
aliases:
- /ko/feature_flags/setup/
description: 클라이언트 측 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/
  tag: 설명서
  text: Feature Flags에 대해 알아보기
- link: /getting_started/feature_flags/
  tag: 설명서
  text: Feature Flags 시작
- link: feature_flags/server/
  tag: 설명서
  text: 서버 측 Feature Flags
title: 클라이언트 측 Feature Flags
---
## 개요 {#overview}

애플리케이션용 Datadog Feature Flags를 설정하세요. 아래 플랫폼별 가이드에 따라 Feature Flags를 애플리케이션에 통합하고 Feature Flags 데이터 수집을 시작합니다.

Datadog Feature Flags는 Feature Flags API를 위한 공급업체 중립적 오픈 소스 사양인 [OpenFeature 표준](https://openfeature.dev/docs/reference/intro/)을 기반으로 구축되었습니다. 공급자, 평가 컨텍스트, 후크와 같은 OpenFeature 개념을 처음 접하는 경우 [OpenFeature 개념 설명서](https://openfeature.dev/docs/category/concepts)를 참조하세요.

{{< card-grid card_width="200px">}}
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

## 플랫폼별 텔레메트리 옵션 {#telemetry-options-by-platform}

웹, 모바일, Unity 공급자는 유사한 텔레메트리 제어 기능을 제공하며 옵션 이름은 플랫폼마다 다릅니다. 노출된 옵션 각각의 기본값은 `true`이므로 나열된 동작은 기본적으로 활성화되어 있습니다. 이를 비활성화하려면 옵션을 `false`로 설정하세요.

아래의 웹 옵션은 권장 브라우저 공급자인 `DatadogProvider`에 적용됩니다. 고급 `DatadogCoreProvider`는 텔레메트리를 자동으로 활성화하지 않습니다. 이를 사용하는 애플리케이션은 추적 후크를 명시적으로 등록하고 수명 주기를 관리합니다. [브라우저 규칙 기반 평가][1]를 참조하세요.

<div class="alert alert-info">iOS OpenFeature 브리지(<a href="https://github.com/DataDog/dd-openfeature-provider-swift">dd-openfeature-provider-swift</a>)는 1.0 이전 패키지로 사용할 수 있습니다. 1.0 버전에 도달하기 전까지 버전 업데이트에는 주요 변경 사항이 포함될 수 있습니다. 가장 안정적인 iOS API 환경을 사용하려면 <code>FlagsClient</code> API를 직접 사용하세요.</div>

### 노출 이벤트 전송 {#send-exposure-events}

기본값: `true`. 비활성화하려면 `false`로 설정합니다.

- **웹** (`@datadog/openfeature-browser`): `enableExposureLogging`
- **Android** (`dd-sdk-android-flags`): `trackExposures`
- **Dart 및 Flutter** (`datadog_flags`, `datadog_flags_flutter`): `trackExposures`
- **iOS** (`DatadogFlags`): `trackExposures`
- **React Native**: `trackExposures`
- **Unity**: `trackExposures`

### 집계된 평가 텔레메트리 전송 {#send-aggregated-evaluation-telemetry}

기본값: `true`. 비활성화하려면 `false`로 설정합니다.

- **웹** (`@datadog/openfeature-browser`): `enableFlagEvaluationTracking`
- **Android** (`dd-sdk-android-flags`): `trackEvaluations`
- **Dart 및 Flutter** (`datadog_flags`, `datadog_flags_flutter`): `trackEvaluations`
- **iOS** (`DatadogFlags`): `trackEvaluations`
- **React Native**: 노출되지 않음
- **Unity**: `trackEvaluations`

### RUM에 평가 연결 {#attach-evaluations-to-rum}

기본값: `true`. 비활성화하려면 `false`로 설정합니다.

- **웹** (`@datadog/openfeature-browser`): `enableRumFeatureFlagTracking`
- **Android** (`dd-sdk-android-flags`): `rumIntegrationEnabled`
- **Flutter** (`datadog_flags_flutter`): `rumIntegrationEnabled`
- **iOS** (`DatadogFlags`): `rumIntegrationEnabled`
- **React Native**: `rumIntegrationEnabled`
- **Unity**: 노출되지 않음

## 인메모리 공급자로 테스트 {#testing-with-in-memory-providers}

Datadog은 다음과 같은 테스트 접근 방식을 지원합니다.

- **통합 테스트**: `DatadogProvider`를 전용 테스트 환경으로 지정하고 Datadog UI에서 플래그 값을 제어합니다. 이 방식은 CDN을 통해 전달되는 플래그 할당을 포함하여 실제 제공자를 엔드투엔드로 테스트합니다.
- **단위 테스트**: `DatadogProvider`를 OpenFeature 표준 `InMemoryProvider`(해당 언어에서 인메모리 공급자를 사용할 수 없는 경우, 이에 상응하는 테스트 스텁)으로 교체하고 테스트 코드에서 플래그 값을 직접 설정합니다. 이렇게 하면 테스트가 외부 환경과 격리되고 오프라인 상태로 유지됩니다.

이 섹션에서는 인메모리 접근 방식을 다룹니다. OpenFeature API는 런타임에 공급자를 교체할 수 있도록 설계되었으므로 애플리케이션 코드는 변경되지 않으며, 테스트 설정 중에 등록된 공급자만 변경됩니다.

일반적인 테스트는 다음 패턴을 따릅니다.

1. 테스트 설정에서 플래그 키와 변형의 맵을 빌드합니다.
2. OpenFeature API를 통해 해당 맵으로 `InMemoryProvider`를 등록합니다.
3. 테스트 중인 단위에서 OpenFeature 클라이언트를 호출합니다. `InMemoryProvider`는 테스트 설정에서 구성된 플래그 할당을 반환합니다.
4. 테스트 종료 시 공급자를 재설정하여 테스트 간 상태 누출을 방지합니다.

구체적인 테스트 예시는 사용 중인 플랫폼의 SDK 페이지(이 페이지 상단에서 선택)를 참조하세요.

## 컨텍스트 속성 요구 사항 {#context-attribute-requirements}

<div class="alert alert-warning">
평가 컨텍스트 속성은 중첩되지 않은 원시 값(문자열, 숫자, 불리언)이어야 합니다. 중첩된 객체와 배열은 <strong>지원되지 않으며</strong> 이를 사용하면 노출 이벤트가 별도 경고 없이 폐기될 수 있습니다.
</div>

평가 컨텍스트에서 평면 속성을 사용하세요.

{{< code-block lang="javascript" >}}
const evaluationContext = {
  targetingKey: 'user-123',
  userId: 'user-123',
  tier: 'premium',
  age: 25
};

await OpenFeature.setProviderAndWait(provider, evaluationContext);
{{< /code-block >}}

중첩된 객체와 배열을 피하세요.

{{< code-block lang="javascript" >}}
// These attributes will cause exposure events to be dropped
const evaluationContext = {
  targetingKey: 'user-123',
  user: { id: 'user-123' },        // nested object - NOT SUPPORTED
  features: ['beta', 'analytics']  // array - NOT SUPPORTED
};
{{< /code-block >}}

## 추가 자료 {#further-reading}

백분율 기반 롤아웃 및 결정론적 버킷팅에 대해서는 [트래픽 분할 및 무작위화](/feature_flags/concepts/traffic_splitting/)를 참조하세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/implementation_patterns/browser_rules_based_evaluation/