---
description: 개별 여정의 상태, KPI, 정의 및 다른 여정과의 관계를 검토하세요.
further_reading:
- link: /journey_monitoring/
  tag: 문서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/map/
  tag: 문서
  text: Journey Monitoring 맵에 대해 알아보기
- link: /journey_monitoring/status/
  tag: 문서
  text: 여정 상태에 대해 알아보기
title: 여정 개요 페이지
---
## 여정 탐색 {#explore-a-journey}

[맵][6] 또는 [카탈로그](#journey-catalog)에서 여정을 클릭하면 여정 개요에 [상태][2], [핵심 성과 지표(KPI)][4], [시작 및 종료 이벤트][5]와 업스트림 및 다운스트림 여정이 표시됩니다.

현재 선택한 여정의 타일을 클릭하여 [세부 정보 보고서][1]를 여세요. 업스트림 또는 다운스트림 여정의 타일을 클릭하여 해당 여정의 보고서를 여세요.

{{< img src="journey_monitoring/journey-monitoring-overview.png" alt="개별 여정의 핵심 성과 지표, 상태, 정의 및 업스트림·다운스트림 여정을 보여주는 개요" style="width:100%;" >}}

## 업스트림 및 다운스트림 여정 {#upstream-and-downstream-journeys}

Datadog은 공유된 시작 및 종료 이벤트를 기반으로 관련 여정을 식별합니다.

- **업스트림 여정**은 현재 선택한 여정의 시작 이벤트 중 하나에 해당하는 이벤트로 종료됩니다.
- **다운스트림 여정**은 현재 선택한 여정의 종료 이벤트 중 하나에 해당하는 이벤트로 시작됩니다.

이러한 관계를 사용하여 업스트림 여정이 현재 선택한 여정에 영향을 미치는지, 또는 현재 선택한 여정이 다운스트림 여정에 영향을 미치는지 조사하세요.

## 여정 카탈로그 {#journey-catalog}

여정 카탈로그에는 생성된 여정과 [추천 여정][3]이 나열됩니다. 생성된 각 여정에는 KPI와 **Healthy**, **Degraded** 또는 **Missing coverage** 상태가 표시됩니다. 추천 여정에는 **Suggested** 라벨이 표시됩니다.

카탈로그에서 다음 작업을 수행할 수 있습니다.

- 여정 검색
- 여정 필터링 및 정렬
- 팀 소유권별 여정 필터링
- 상태가 저하된 여정 식별
- 추천 여정 조회

카탈로그에서 여정을 클릭하면 개요에 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/journey_monitoring/details_report/
[2]: /ko/journey_monitoring/status/
[3]: /ko/journey_monitoring/suggested_journeys/
[4]: /ko/journey_monitoring/details_report/#traffic-and-conversion-trends
[5]: /ko/journey_monitoring/configuring_journeys/#define-start-and-end-conditions