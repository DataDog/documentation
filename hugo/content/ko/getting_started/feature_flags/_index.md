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
  text: Datadog Feature Flag로 기능을 더 빠르고 안전하게 출시하기
- link: https://www.datadoghq.com/blog/experimental-data-datadog/
  tag: 블로그
  text: 통합 데이터로 실험 과정에서 속도와 품질의 균형을 맞추는 방법
- link: https://www.datadoghq.com/blog/datadog-feature-flags-cloud-resilience/
  tag: 블로그
  text: Datadog Feature Flag가 클라우드 제공업체의 장애에 유연하게 대응하는 방법
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: 블로그
  text: 가드레일 메트릭을 활용하고 릴리스를 수동으로 감시하는 번거로움 줄이기
site_support_id: getting_started_feature_flags
title: Feature Flag 시작하기
---
## 개요 {#overview}

Datadog Feature Flag는 기능 배포를 효과적으로 관리할 수 있는 통합 기능을 제공하며 내장된 모니터링 기능과 Datadog 플랫폼 전반의 원활한 통합을 지원합니다.

- **실시간 메트릭:** 각 변형을 수신하는 사용자 및 플래그가 애플리케이션의 상태 및 성능에 미치는 영향에 대해 실시간으로 이해할 수 있습니다.

- **모든 데이터 유형 지원:** 사용 사례에 따라 불리언, 문자열, 숫자 또는 전체 JSON 객체를 사용할 수 있습니다.

- **실험을 위한 설계:** A/B 테스트를 위해 특정 대상을 타겟팅하고 카나리 릴리스를 통해 기능을 점진적으로 롤아웃하며, 회귀가 감지되면 자동으로 롤백합니다.

- **OpenFeature 호환:** OpenFeature 표준을 기반으로 구축되어 기존 OpenFeature 구현과 호환되며 특정 공급업체에 종속되지 않는 기능 플래그 관리 방식을 제공합니다.

## Feature Flag SDK {#feature-flags-sdks}

이 가이드는 JavaScript 브라우저 SDK를 예시로 사용합니다. 다음 SDK 중 하나를 사용해 모든 애플리케이션에 Datadog Feature Flag를 통합할 수 있습니다.

### 클라이언트 측 SDK {#client-side-sdks}

{{< card-grid card_width="200px" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/feature_flags/client/android/" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/feature_flags/client/angular/" src="integrations_logos/angular_large.svg" alt="Angular" >}}
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

### 1단계: SDK 가져오기 및 초기화 {#step-1-import-and-initialize-the-sdk}

먼저 `@datadog/openfeature-browser`, `@openfeature/web-sdk` 및 `@openfeature/core`를 프로젝트의 종속성으로 설치하세요.

```
yarn add @datadog/openfeature-browser @openfeature/web-sdk @openfeature/core
```

그런 다음, 프로젝트에 다음을 추가해 SDK를 초기화하세요.

```js
import { DatadogProvider } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

// Initialize the provider
const provider = new DatadogProvider({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
    enableExposureLogging: true, // Can impact RUM costs if enabled
    site: 'datadoghq.com',
    env: '<YOUR_ENV>', // Same environment normally passed to the RUM SDK
    service: '<SERVICE_NAME>',
    version: '1.0.0'
});

// Set the provider
await OpenFeature.setProviderAndWait(provider);
```

<div class="alert alert-warning">다음 <code>enableExposureLogging</code> 을 <code>true</code> 로 설정하면 노출 이벤트가 RUM을 통해 Datadog으로 전송되므로 <a href="https://docs.datadoghq.com/real_user_monitoring/">RUM</a> 비용에 영향을 줄 수 있습니다. 기능 노출 또는 가드레일 메트릭 상태를 추적할 필요가 없다면 비활성화할 수 있습니다.</div>

OpenFeature SDK 구성 옵션에 대한 자세한 내용은 [설명서][1]에서 확인할 수 있습니다. 클라이언트 토큰 및 애플리케이션 ID 만들기에 대한 자세한 내용은 [API 및 애플리케이션 키][3]를 참고하세요.

### 2단계: 기능 플래그 만들기 {#step-2-create-a-feature-flag}

Datadog에서 [{{< ui >}}Create Feature Flag{{< /ui >}}][2]로 이동하여 다음 항목을 구성하세요.

- **이름 및 키**: 플래그의 표시 이름과 코드에서 참조할 키
- **변형 유형** 및 **변형 값**: [변형 및 플래그 유형][5] 참고
- **배포 채널**: [배포 채널][6] 참고

<div class="alert alert-warning">
  {{< ui >}}Flag keys{{< /ui >}}, {{< ui >}}variant keys{{< /ui >}} 및 {{< ui >}}variant values{{< /ui >}}는 클라이언트 SDK에 전송될 때 공개된 정보로 간주해야 합니다.
</div>

{{< img src="getting_started/feature_flags/create-feature-flags.png" alt="Feature Flag 만들기" style="width:100%;" >}}

### 3단계: 플래그 평가 및 기능 코드 작성 {#step-3-evaluate-the-flag-and-write-feature-code}

애플리케이션 코드에서 SDK를 사용해 플래그를 평가하고 새 기능을 제어하세요.

```js
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
```

이 단계를 완료한 후 애플리케이션을 다시 배포해 변경 사항을 적용하세요. SDK의 [설명서][1]에서 추가 사용 예시를 확인할 수 있습니다.

### 4단계: 타겟팅 규칙 정의 및 기능 플래그 활성화{#step-4-define-targeting-rules-and-enable-the-feature-flag}

[타겟팅 규칙][7]을 구성해 각 변형을 적용할 대상을 정의합니다. 규칙을 저장한 후 선택한 환경에서 플래그를 활성화합니다.

<div class="alert alert-info">
일반적으로 운영 환경에 적용하기 전에 스테이징 환경에서 변경 사항을 롤아웃하는 것이 좋습니다.
</div>

비율별 롤아웃은 [트래픽 분할 및 무작위화][8]를 확인하세요.

### 5단계: 롤아웃 모니터링 {#step-5-monitor-your-rollout}

기능 플래그 세부 정보 페이지에서 실시간 노출 추적, {{< ui >}}error rate{{< /ui >}} 및 {{< ui >}}page load time{{< /ui >}} 등의 메트릭을 확인해 기능 롤아웃을 모니터링할 수 있습니다. 플래그를 통해 기능을 점진적으로 출시하면서 Datadog UI의 {{< ui >}}Real-Time Metric Overview{{< /ui >}} 패널을 통해 해당 기능이 애플리케이션 성능에 미치는 영향을 확인합니다.

{{< img src="getting_started/feature_flags/real-time-flag-metrics.png" alt="실시간 플래그 메트릭 패널" style="width:100%;" >}}

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