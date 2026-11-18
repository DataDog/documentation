---
aliases:
- /ko/journey_monitoring/details_report/variants/
description: 여정의 시작 이벤트와 종료 이벤트 사이에서 사용자가 이동하는 경로를 정의하고 비교하세요.
further_reading:
- link: /journey_monitoring/
  tag: 문서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/configuring_journeys/
  tag: 문서
  text: 여정 구성
- link: /journey_monitoring/details_report/
  tag: 문서
  text: 여정 세부 보고서에 대해 알아보기
title: 여정 변형
---
<div class="alert alert-info">여정 변형을 사용하려면 <a href="/product_analytics/">Product Analytics</a>의 평가판을 사용 중이거나 유료 구독이 활성화되어 있어야 합니다.</div>

## 개요 {#overview}

**변형**은 여정의 [시작 및 종료 이벤트][8] 사이의 특정 이동 경로를 나타냅니다. 변형을 사용하여 동일한 여정에서 자주 나타나는 경로별 [핵심 성과 지표(KPI)][3]와 텔레메트리 데이터를 비교하세요.

## 변형 생성 {#create-a-variant}

여정을 생성하거나 기존 여정을 편집할 때 다음과 같이 변형을 추가합니다.

1. 고유한 이름을 입력합니다.
2. 여정의 시작 이벤트와 종료 이벤트 사이에 중간 [action 또는 view 이벤트][9]를 하나 이상 추가합니다.
3. 필요시 [속성 필터][10]를 추가하여 변형을 특정 코호트로 제한합니다.
4. 여정을 저장합니다.

중간 이벤트를 추가하면 [퍼널][4]이 업데이트됩니다. 각 단계의 규모, 전환율 및 평균 전환 시간을 보여줍니다.

### 추천 변형 {#suggested-variants}

Datadog은 중간 action 및 view 이벤트에서 자주 발생하는 순서를 분석하고 해당 경로를 기반으로 변형을 추천합니다. 추천 변형은 여정을 직접 생성하거나, [추천 여정][1]을 기반으로 생성하거나, 기존 여정을 편집할 때 표시됩니다.

{{< img src="journey_monitoring/journey-monitoring-details-report-variants.png" alt="왼쪽에 변형 패널이 있고 각 변형 단계의 전환 메트릭을 보여주는 퍼널 시각화가 표시된 Journey Monitoring 세부 정보 보고서" style="width:100%;" >}}

## 변형 분석 {#analyze-variants}

[여정 세부 정보 보고서][2]에서 변형을 선택하여 해당 경로의 메트릭과 텔레메트리 데이터만 표시하도록 필터링하세요. 필터링된 데이터를 사용하여 경로별 규모, 전환율, 평균 전환 시간, [프런트엔드 오류][5], [RUM 작업][6] 및 [Synthetic 테스트 적용 범위][7]를 비교하세요.

## 변형 삭제 {#delete-a-variant}

여정 세부 정보 보고서에서 변형 위로 마우스를 가져간 다음 삭제 아이콘을 클릭하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/journey_monitoring/suggested_journeys/
[2]: /ko/journey_monitoring/details_report/
[3]: /ko/journey_monitoring/details_report/#traffic-and-conversion-trends
[4]: /ko/product_analytics/charts/funnel_analysis/
[5]: /ko/error_tracking/
[6]: /ko/real_user_monitoring/operations_monitoring/
[7]: /ko/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[8]: /ko/journey_monitoring/configuring_journeys/#define-start-and-end-conditions
[9]: /ko/product_analytics/data_collected/
[10]: /ko/journey_monitoring/configuring_journeys/#attribute-filters