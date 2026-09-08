---
description: RUM without Limits에서 보존 필터가 작동하는 방식을 알아보세요.
further_reading:
- link: /real_user_monitoring/guide/retention_filter_best_practices/
  tag: 가이드
  text: 보존 필터 모범 사례
- link: /real_user_monitoring/rum_without_limits/
  tag: 설명서
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: 설명서
  text: 메트릭으로 성능 분석
- link: /real_user_monitoring/rum_without_limits/retention_quotas
  tag: 설명서
  text: 보존 할당량으로 비용 제어
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: 블로그
  text: 보존 필터로 프론트엔드 및 백엔드 데이터 통합 및 상호 연결
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: 학습 센터
  text: '인터랙티브 실험실: RUM 보존 필터'
title: 보존 필터로 데이터 보존
---
{{< learning-center-callout header="학습 센터에서 RUM 보존 필터 사용해 보기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  RUM 보존 필터를 사용하여 저장할 세션 데이터를 제어하고 관측 가능성 예산을 최적화하는 방법을 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

보존 필터는 RUM 세션 탐색기에서 사용되는 것과 유사한 쿼리 집합으로, RUM 이벤트(세션, 조회, 액션, 리소스 등)가 수집될 때 해당 이벤트에 대해 실행됩니다. 이러한 필터는 세션을 30일의 표준 RUM 보존 기간 동안 저장할지, 아니면 삭제할지 결정합니다.

**보존율**은 보존하려는 일치 세션의 백분율을 지정하며, 이를 통해 더 나은 비용 제어가 가능합니다. 필터는 개별 이벤트를 기준으로 매칭되지만 샘플링 결정이 내려지면 기본 세션의 모든 이벤트가 유지되어 사용자 세션에 대한 엔드투엔드 가시성이 보장됩니다.

## 작동 방식 {#how-it-works}

세션은 사전 정의된 쿼리를 기반으로 구성 이벤트 중 하나와 보존 필터가 일치하는 즉시 저장되며 구성된 보존율에 따라 샘플링됩니다.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-2.png" alt="보존 필터의 논리적 흐름과 이것이 최종적으로 보존되는 세션 수에 미치는 영향을 보여주는 다이어그램입니다." style="width:80%" >}}

보존 필터의 논리적 흐름은 다음과 같습니다.

- 모든 RUM 이벤트가 첫 번째로 수신된 필터부터 시작하여 각 필터에 대해 순차적으로 평가됩니다.
- 이벤트 `A`가 필터와 일치하면 보존율에 따라 전체 세션을 샘플링할지, 아니면 향후 이벤트가 평가될 때까지 기다릴지 결정됩니다. 두 경우 모두 이벤트 `A`가 후속 보존 필터에 대해 더 이상 평가되지 않습니다. **보존 필터의 순서가 중요**한 이유는 바로 이 때문입니다.
- 보존된 세션이 저장되어 세션 탐색기 및 기타 RUM 페이지에서 액세스할 수 있습니다. 이 세션에서 발생하는 새로운 이벤트는 보존 필터 목록을 거치지 않지만 완전한 가시성을 보장하기 위해 자동으로 유지됩니다.

**참고**:

- 이벤트가 어떤 필터와도 일치하지 않거나 필터와 일치하더라도 구성된 보존율에 따라 세션을 보존하지 않기로 결정된 경우, 동일한 세션의 향후 이벤트는 계속해서 평가됩니다. 결과적으로 세션이 보존될 수 있습니다.
- 시간이 지남에 따라 업데이트되는 이벤트 속성에서 필터를 정의할 때는 주의하세요. 예를 들어, 오류가 2개 미만인 세션을 보존하는 필터는 오류 수가 실시간으로 업데이트되고 모든 세션이 0에서 시작하기 때문에 실수로 세션을 보존할 수 있습니다. 업데이트되는 필드에는 '크거나 같음'(≥) 조건을 사용하세요(예: `@session.error.count >= 2`). 아니면 `@session.is_active: false` 또는 `@view.is_active: false`를 추가하여 변경 가능한 세션 및 조회 객체가 보존 필터에 대해 평가되기 전에 완료되도록 하세요.
- 저희의 SDK는 이벤트를 Datadog으로 보내기 전에 일괄 처리 및 압축하며, 업로드에 실패한 이벤트는 기기의 대기열 끝으로 돌아갑니다. 따라서 이벤트 `B`가 이벤트 `A`보다 먼저 평가될 수 있지만 모든 이벤트는 누락을 방지하기 위해 결국 보존 필터 목록에 대해 평가됩니다.

## 보존 필터가 리플레이와 함께 작동하는 방식 {#how-retention-filters-work-with-replays}

보존 필터를 사용하여 리플레이가 포함된 세션 샘플링을 관리할 수 있습니다. 리플레이가 포함된 세션에 요금이 청구될 때마다 세션 이벤트와 비디오 녹화본이 모두 유지되고 해당 요금이 청구됩니다. 즉, SDK에서 세션의 100%와 리플레이의 100%를 수집하는 경우, 보존 필터가 세션을 유지할 때마다 Datadog은 세션과 리플레이를 모두 유지하고 해당 요금을 청구합니다.

**참고**: Datadog의 모바일 SDK도 고정 샘플 속도에 의존하는 대신 조건부로 녹화를 시작하고 중지하는 API를 제공하지만 기본적으로 Browser SDK에 의해 강제로 녹화된 리플레이만 보존됩니다.

## 영구 보존 필터 {#permanent-retention-filters}

영구 보존 필터는 수정, 비활성화 또는 삭제할 수 없는 사전 정의된 보존 필터입니다. 이 필터는 보존 필터 목록의 맨 위에 위치합니다.

{{< img src="real_user_monitoring/rum_without_limits/permanent-retention-filters.png" alt="보존 필터 목록 맨 위에 표시된 세 가지 영구 보존 필터입니다." style="width:100%" >}}

세 가지 영구 보존 필터가 있습니다.

- {{< ui >}}RUM-APM Flat Sampling{{< /ui >}}: 수집된 분산 트레이스가 포함된 세션의 1%를 보존하고 APM에서 해당 트레이스를 인덱싱합니다. 이러한 세션 및 해당 트레이스는 **RUM 청구 또는 APM 청구 대상이 아닙니다**.
- {{< ui >}}Synthetics Sessions{{< /ui >}}: [Synthetic Monitoring][1]에 의해 생성된 모든 세션을 보존합니다. 이러한 세션은 Synthetic Monitoring에 따라 청구되며 **RUM 청구 대상이 아닙니다**.
- {{< ui >}}Sessions with forced replays{{< /ui >}}: [강제 수집][2] 메커니즘을 통해 리플레이가 강제로 수집된 모든 세션을 보존합니다.

<div class="alert alert-info">RUM-APM 고정 샘플링 영구 보존 필터는 다음 SDK에만 적용됩니다. <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

## 보존 필터 생성 {#creating-a-retention-filter}

보존 필터를 생성하려면 다음 단계를 따르세요.

1. [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}][3]로 이동합니다.
1. RUM 애플리케이션을 생성하거나 기존 애플리케이션을 클릭합니다.
1. 'Product Settings'에서 {{< ui >}}Retention Filters{{< /ui >}} 페이지로 이동합니다.
1. {{< ui >}}+ Add Retention Filter{{< /ui >}} 버튼을 클릭합니다.
1. 보존 필터에 설명이 포함된 이름을 지정합니다.
1. 드롭다운에서 이벤트 유형을 선택하고 쿼리를 입력합니다. [RUM 탐색기][4]에서 작성할 수 있는 모든 쿼리는 보존 필터에서 작동합니다.
1. 선택적으로, 보존 쿼리와 일치하는 세션에 대한 보존율을 설정합니다. {{< ui >}}Generate Estimate{{< /ui >}}를 클릭하여 이 비율을 설정하는 데 도움을 받을 수 있습니다.

새 필터가 보존 필터 목록의 맨 아래에 추가됩니다. Datadog이 새 필터를 전파하고 샘플링 결정을 시작하는 데에는 몇 초 정도 걸립니다.

## 필터 수정 {#modifying-filters}

{{< img src="real_user_monitoring/rum_without_limits/modifying-filters.png" alt="보존 필터 위에 마우스를 올려 수정하세요." style="width:100%" >}}

### 필터 편집 {#edit-a-filter}

기존 필터를 수정하려면 다음 단계를 따르세요.

1. 필터 위에 마우스를 올리고 {{< ui >}}Edit{{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}Save Changes{{< /ui >}}를 클릭합니다.

### 필터 복제 {#duplicate-a-filter}

필터를 복제하려면 다음 단계를 따르세요.

1. 필터 위에 마우스를 올리고 {{< ui >}}Duplicate{{< /ui >}} 아이콘을 클릭합니다.
1. 필터를 원하는 대로 수정한 다음 {{< ui >}}Save Changes{{< /ui >}}를 클릭합니다.

### 필터 삭제{#delete-a-filter}

보존 필터를 삭제하려면 다음 단계를 따르세요.

1. 필터 위에 마우스를 올리고 {{< ui >}}Delete{{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

### 필터 비활성화{#disable-a-filter}

비활성화된 필터는 단순히 이벤트를 무시하며 샘플링 결정을 내리지 않습니다. 목록으로 들어오는 이벤트는 비활성화된 필터를 건너뜁니다.

필터 오른쪽에 있는 토글을 사용하여 필터를 비활성화하거나 활성화하세요.

### 필터 재정렬{#reorder-filters}

필터를 끌어다 놓아 원하는 위치로 재정렬하세요.

## 보존 필터를 사용하여 세션 제외 {#excluding-sessions-using-retention-filters}

RUM without Limits는 보존 필터를 사용하여 제외할 세션이 아닌 유지할 세션을 지정합니다. 보존 비율을 0%로 설정할 수 없습니다(기본값: 1%). 또한 낮은 보존 비율을 설정하는 것은 효과적인 제외 전략이 아닙니다. 구성 내의 다른 필터에 의해 세션이 계속 보존될 수 있기 때문입니다.

특정 환경, 애플리케이션 버전, 기기 유형 또는 기타 기준의 세션이 보존되지 않도록 하려면 **모든 필터의 쿼리 내에** 제외 항목을 명시적으로 추가하세요. 예를 들면 다음과 같습니다.

- 모든 보존 필터에 `-version:(1* OR 2*)`를 추가하면 애플리케이션의 이전 버전 1 및 2에서 발생한 이벤트가 절대 유지되지 않습니다.
- 모든 보존 필터에 `-@device.type:Bot`을 추가하면 검색 엔진 크롤러 및 기타 자체 선언된 봇이 제외됩니다.
- 모든 보존 필터에 `-@geo.country:"South Korea"`를 추가하면 대한민국에서 발생하는 모든 세션이 제외됩니다.

예를 들어, 대한민국에서 발생하는 세션을 제외하고 다른 모든 세션은 보존하려면 쿼리 `-@geo.country:"South Korea"`를 사용하는 필터를 생성하고 보존 비율을 100%로 설정합니다.

**참고**: 특정 이벤트가 보존되는 것을 방지할 방법은 없습니다. 부정 쿼리(예: RUM 오류를 타겟팅하는 보존 필터에 `-@error.message:"Script error."` 추가)를 사용하여 원치 않는 이벤트의 볼륨을 최소화할 수 있지만 다른 보존 필터가 필터링하려는 이벤트가 포함된 세션에 대해 긍정적인 보존 결정을 내릴 수도 있습니다.

## 할당량을 통한 보존 제한 {#capping-retention-with-quotas}

보존 필터 전반에서 하루에 보존되는 총 세션 수를 제한하려면 [보존 할당량으로 비용 제어][9]를 참조하세요.

## 교차 제품 보존 필터 {#cross-product-retention-filters}

교차 제품 보존 필터를 사용하면 서로 다른 제품 간의 상관 관계를 최적화하여 더 풍부한 텔레메트리를 보존할 수 있습니다. RUM 보존 필터를 구성할 때 APM 트레이스에 대한 교차 제품 보존 필터를 활성화할 수 있습니다.

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-overview.png" alt="APM 트레이스에 대해 교차 제품 보존 필터가 활성화된 RUM 보존 필터입니다." style="width:100%" >}}

{{< ui >}}APM traces filter{{< /ui >}}는 사용 가능한 트레이스가 있는 상위 RUM 보존 필터에 의해 보존된 세션의 지정된 비율에 대해 APM 트레이스를 인덱싱합니다.

**참고**: APM 트레이스의 가용성은 **트레이스 샘플링 SDK 구성**에 따라 달라집니다(<a href="/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum">RUM과 APM 트레이스 상호 연결</a> 방법 알아보기).

  <div class="alert alert-info">APM 트레이스 필터는 다음 버전의 SDK와만 호환됩니다. <br> - Browser 6.5.0+ <br> - Android 3.0.0+ <br> - iOS 3.3.0+ <br> - React Native 3.0.0+ <br> - Flutter 3.0.0+ <br></div>

<div class="alert alert-danger">교차 제품 보존 필터를 구성하면 APM 인덱싱 볼륨이 증가할 수 있습니다.</div>

RUM 탐색기에서 **인덱싱된 APM 트레이스가 포함된 세션을 찾으려면** `@session.has_indexed_apm_traces:true`를 쿼리하세요.

### 예시 {#example}

다음과 같이 구성된 고유한 RUM 보존 필터를 설정하는 구성을 고려해 보세요.

{{< img src="real_user_monitoring/rum_without_limits/cross-product-retention-filters-apm-only.png" alt="60%의 보존율로 오류를 타겟팅하는 RUM 보존 필터와 APM 트레이스에 대해 25%로 설정된 교차 제품 필터 집합입니다." style="width:60%" >}}

트레이스의 40%를 샘플링하도록 SDK를 구성한 경우, 결과는 다음과 같습니다.

- 수집된 RUM 세션 중 40%의 APM에서 트레이스가 수집됩니다.
- 하나 이상의 오류가 있는 수집된 RUM 세션 중 60%가 보존됩니다.
- 보존된 세션 중 25% x 40% = 10%의 APM 트레이스가 인덱싱됩니다.

<div class="alert alert-info">교차 제품 보존 필터는 해당 RUM 보존 필터에 의해 보존된 세션에만 적용됩니다. 즉, RUM 보존 및 교차 제품 필터 모두에서 필터 순서가 중요합니다.<br><br>

자세한 내용은 <a href="/real_user_monitoring/rum_without_limits/retention_filters/#how-it-works">작동 방식</a>을 참조하세요.</div>

### 영구 필터의 교차 제품 보존 필터 {#cross-product-retention-filters-on-permanent-filters}

교차 제품 보존 필터는 <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">영구 보존 필터</a>에서도 사용할 수 있습니다. APM 트레이스 필터는 **Synthetic Monitoring 세션 및 강제 리플레이 필터가 있는 세션에서만 편집할 수 있습니다**.

<div class="alert alert-danger">Synthetics 또는 강제 리플레이 영구 필터의 교차 제품 보존 필터를 통해 인덱싱된 APM 트레이스는 APM 청구 대상입니다.</div>

## 모범 사례 {#best-practices}

[보존 필터 모범 사례][5]를 참조하세요.

## API {#api}

보존 필터와 교차 제품 보존 필터는 [API][6] 또는 Datadog 전용 [Terraform 모듈][7]을 통해 관리할 수 있습니다.

## 다음 단계 {#next-steps}

[메트릭][8]으로 성능을 분석합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/
[2]: /ko/session_replay/setup_and_configuration/?platform=browser&tab=npm#start-or-stop-the-recording-manually
[3]: https://app.datadoghq.com/rum/list
[4]: /ko/real_user_monitoring/explorer/
[5]: /ko/real_user_monitoring/guide/retention_filter_best_practices
[6]: /ko/api/latest/rum-retention-filters/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/data-sources/rum_retention_filters
[8]: /ko/real_user_monitoring/rum_without_limits/metrics
[9]: /ko/real_user_monitoring/rum_without_limits/retention_quotas