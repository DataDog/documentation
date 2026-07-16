---
description: 필요한 RUM 데이터만 유지하면서 애플리케이션의 성능 메트릭에 대한 완전한 가시성을 유지하세요.
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: 설명서
  text: 보존 필터를 사용하여 데이터를 유지하세요.
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: 가이드
  text: 보존 필터 모범 사례
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: 설명서
  text: 메트릭으로 성능 분석
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: 설명서
  text: 보존 할당량으로 비용 제어
- link: https://www.datadoghq.com/blog/rum-without-limits/
  tag: 블로그
  text: 'RUM without Limits™ 소개: 모든 것을 캡처하고 중요한 것만 유지'
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: 학습 센터
  text: '인터랙티브 실험실: RUM 보존 필터'
title: RUM without Limits
---
<div class="alert alert-info">RUM without Limits는 비약정 RUM 플랜을 가진 고객에게 자동으로 활성화됩니다. 계정 팀이나 <a href="/help/">Datadog 지원</a>에 문의하여 이 기능을 활성화하세요.</div>

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-overview.png" alt="예상 사용 메트릭 세부정보 사이드 패널" style="width:90%" >}}

## 개요 {#overview}

RUM without Limits는 세션 데이터 수집을 인덱싱과 분리하여 RUM 세션 볼륨에 대한 유연성을 제공합니다. 이를 통해 다음을 수행할 수 있습니다.

- 사전 샘플링 결정이나 코드 변경 없이 Datadog UI에서 보존 필터를 동적으로 설정합니다.
- 오류나 성능 문제가 있는 세션을 유지하고, 사용자 상호작용이 적은 세션과 같이 덜 중요한 세션은 폐기합니다.

세션의 일부만 유지하더라도 Datadog은 모든 수집된 세션에 대한 [성능 메트릭][1]을 제공합니다. 이는 세션 데이터의 일부만 유지되더라도 애플리케이션의 상태와 성능에 대한 정확하고 장기적인 개요를 보장합니다.

**참고**: RUM without Limits 모드에서는 [성능 모니터링 요약 페이지][7]에서 기본 필터만 사용할 수 있습니다. 이를 통해 전체 데이터 세트를 볼 수 있으며, 데이터가 샘플링되고 이벤트 특성보다 사용 가능한 태그가 적기 때문에 왜곡된 성능 메트릭을 방지합니다.

이 페이지는 관측 가능성 예산 내에서 RUM 세션 볼륨을 관리하는 데 도움이 되는 RUM without Limits의 핵심 구성 요소를 알려줍니다.

### 새로운 애플리케이션을 위한 {#for-new-applications}

새로운 애플리케이션에서 RUM without Limits를 시작하려면 [계측][2] 단계에서:

1.  `sessionSampleRate`을 100%로 설정해야 합니다. Datadog은 최적의 가시성과 메트릭 정확성을 위해 이 비율로 설정할 것을 권장합니다.

2. 관측 가능성 요구 사항을 충족하는 `sessionReplaySampleRate`를 선택하세요.

3. [APM 통합이 활성화][3]된 애플리케이션의 경우, APM 백엔드 트레이스가 `traceSampleRate`(브라우저), `traceSampler`(안드로이드) 또는 `sampleRate`(iOS)와 함께 수집되도록 원하는 세션 비율을 구성하세요.

4. RUM SDK가 트레이스를 유지하지 않기로 결정한 세션에 대해 백엔드 SDK가 자체 샘플링 결정을 내릴 수 있도록 `traceContextInjection: sampled`을 활성화하세요.

   <div class="alert alert-danger">단계 1, 3 및 4는 APM 트레이스 수집에 영향을 미칠 수 있습니다. 수집된 스팬 볼륨이 안정적으로 유지되도록 <code>traceSampleRate</code> 구성을 이전에 구성된 <code>sessionSampleRate</code>값에 맞춥니다. 예를 들어, 이전에 <code>sessionSampleRate</code> 값을 10%로 설정하고 RUM without Limits를 위해 100%로 올렸다면, 동일한 양의 트레이스를 수집하기 위해 <code>traceSampleRate</code> 값을 100%에서 10%로 감소시킵니다.</div>

5. 애플리케이션을 배포해 구성을 적용합니다.

### 기존 애플리케이션의 경우 {#for-existing-applications}
기존 RUM 사용자는 RUM without Limits를 완전히 사용하려면 애플리케이션을 재배포해야 합니다. 모든 애플리케이션에 대해 세션 샘플링 비율이 100%인지 확인하세요.

#### 단계 1: 샘플링 비율 조정 {#step-1-adjust-sampling-rates}
이미 리플레이를 수집하고 있다면, 세션 샘플링 비율을 높이면 동일한 수의 리플레이를 수집하기 위해 리플레이 샘플링 비율을 줄여야 합니다(아래 예 참조). 리플레이 샘플링 비율은 기존 세션 샘플링 비율을 기반으로 합니다.

전:

```java
   sessionSampleRate: 20,
   sessionReplaySampleRate: 10,
```

후:

```java
   sessionSampleRate: 100,
   sessionReplaySampleRate: 2,
```

1. [**Digital Experiences > Real User Monitoring > Manage Applications**][4]로 이동합니다.
1. 이동할 애플리케이션을 클릭합니다.
1. **SDK Configuration** 탭을 클릭합니다.
1.  `sessionSampleRate`가 100%로 설정되어 있는지 확인합니다.
1. 세션 샘플 비율을 높이기 전에 동일한 수의 리플레이가 수집되도록 `sessionReplaySampleRate`을 설정합니다.
1.  생성된 코드 스니펫을 사용하여 소스 코드를 업데이트하고 애플리케이션을 재배포하여 새로운 구성이 적용되도록 합니다.

#### 2단계: 트레이스 조정 {#step-2-adjust-tracing}

`sessionSampleRate`를 증가시킨 경우, RUM SDK가 백엔드 트레이스의 샘플링 결정을 재정의할 수 있는 능력이 있으므로 수집된 APM 스팬의 수를 증가시킬 수 있습니다.

이를 완화하기 위해 `traceSampleRate`을 100% 미만의 비율로 설정하고(이전에 설정된 `sessionSampleRate`으로) RUM SDK가 트레이스를 유지하지 않기로 결정한 세션에 대해 백엔드 SDK가 자체 샘플링 결정을 내릴 수 있도록 `traceContextInjection: sampled`을 설정합니다.

####  3단계: 보존 필터 생성 {#step-3-create-retention-filters}

모바일 애플리케이션에서는 여러 동시 버전이 함께 존재할 수 있습니다. 그러나 기존 버전이 반드시 100%의 세션을 전송하는 것은 아니므로, 새로운 보존 필터를 생성하면 Datadog에서 이러한 애플리케이션 버전에 대해 사용할 수 있는 데이터가 줄어듭니다.

Datadog은 SDK 샘플링 비율이 100%로 설정되었는지 여부와 관계없이 모든 애플리케이션 버전에 대해 동일한 보존 필터를 생성할 것을 권장합니다. 결국, 일부 세션이 일부 이전 버전에 대해 수집되지 않더라도 모든 가치 있는 세션은 여전히 수집됩니다.

제안된 보존 필터 및 사용 사례를 [보존 필터 모범 사례][5]에서 확인하세요.

## 다음 단계 {#next-steps}

[보존 필터][6]를 생성하고 구성합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/rum_without_limits/metrics
[2]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[3]: /ko/real_user_monitoring/platform/connect_rum_and_traces/
[4]: https://app.datadoghq.com/rum/list
[5]: /ko/real_user_monitoring/guide/retention_filter_best_practices/
[6]: /ko/real_user_monitoring/rum_without_limits/retention_filters
[7]: https://app.datadoghq.com/rum/performance-monitoring