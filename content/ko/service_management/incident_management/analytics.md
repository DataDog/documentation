---
aliases:
- /ko/monitors/incident_management/analytics
description: 대시보드 및 노트북에서 집계된 사건 관리 통계를 추적하고 분석합니다.
title: 인시던트 관리 분석
---

## 개요

{{< img src="service_management/incidents/incident_analytics.mp4" alt="인시던트 관리 분석" video=true style="width:80%;">}}

인시던트 관리 분석은 집계된 인시던트 통계에 대해 질의 요청 가능한 데이터 소스입니다. [대시보드][1] 및 [노트북][2]의 다양한 그래프 위젯에서 이러한 분석을 질의하여, 시간 경과에 따른 인시던트 대응 기록을 분석할 수 있습니다. 출발점을 제공하기 위해 Datadog은 필요에 따라 복제하고 사용자 지정할 수 있도록 인시던트 관리 개요 [대시보드 템플릿][3] 및 [노트북 템플릿][4]을 제공합니다.

다음 위젯은 인시던트 관리 분석을 지원합니다:

* 시계열
* 상위 목록
* 쿼리 값

### 측정

Datadog은 쿼리 분석을 구성하기 위해 즉시 다음과 같은 집계 측정값을 제공합니다.

1. 개수 (*)
2. 고객이 영향을 받는 지속기간
3. 활성화 상태 지속기간 (인시던트가 `Active` 상태에 있었던 시간)
4. 안정 상태 지속기간 (인시던트가 `Stable` 상태에 있었던 시간)
5. 수리 시간 (고객 영향 종료 타임스탬프 - 인시던트 생성 타임스탬프)
6. 해결 시간 (해결된 타임스탬프 - 생성된 타임스탬프)

이러한 기본값 외에도, [인시던트 설정][7]에서 사용자 지정 *숫자* 속성 필드를 추가하여 새 측정값을 만들 수 있습니다. 

### 그래프 설정

인시던트 관리 분석 데이터를 사용하여 그래프를 설정하려면, 다음 단계를 따라하세요:

1. [시각화를 선택합니다][5]
2. 데이터 소스 드롭다운 메뉴에서 `Incidents`를 선택합니다.
3. 노란색 드롭다운 메뉴에서 측적값을 선택합니다. 
     - **기본 통계:** 인시던트의 수를 개수합니다. 
4. 측정값에 대한 집계를 선택합니다. 
5. (부수적인) 측정값에 대한 반영을 선택합니다.
6. (부수적인) 검색 표시줄을 사용하여 통계를 인시던트의 특정 하위 집합으로 필터링합니다.
7. (부수적인) 분홍색 드롭다운 메뉴에서 패싯을 선택하여 그룹별로 측정값을 나누고 표시할 제한된 수의 그룹을 선택합니다.
8. [그래프 제목 정하기][6]
9. 위젯을 저장합니다. 

**예시:** 서비스에 따른 주간 정전이 고객에게 영향을 미치는 지속기간

1. 위젯: 타임 시리즈 라인 그래프
2. 데이터소스: `Incidents`
3. 측정: `Customer Impact Duration`
4. 통계: `avg`
5. 반영: `1w`
6. 필터: `severity:("SEV-1" OR "SEV-2")`
7. 그룹: `Services`, 상위 5개로 제한

{{< img src="service_management/incidents/incident_analytics_query_example.jpeg" alt="인시던트 분석 쿼리 예시" style="width:80%;">}}

[1]: /ko/dashboards/
[2]: /ko/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /ko/dashboards/querying/#select-your-visualization
[6]: /ko/dashboards/querying/#create-a-title
[7]: /ko/service_management/incident_management/incident_settings#property-fields