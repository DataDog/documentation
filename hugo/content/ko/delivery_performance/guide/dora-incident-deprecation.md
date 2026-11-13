---
description: 'DORA Metrics의 인시던트 수집 및 보고 기능 지원 중단: 타임라인, 영향을 받는 사람 및 인시던트 보고 마이그레이션
  방법.'
further_reading:
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: 설명서
  text: 변경 실패 탐지에 대해 알아보기
- link: /incident_response/incident_management/analytics_and_reporting/
  tag: 설명서
  text: Incident Management Analytics를 사용한 인시던트 보고
- link: /delivery_performance/dora_metrics/
  tag: 설명서
  text: DORA Metrics에 대해 알아보기
private: true
title: DORA Metrics의 인시던트 수집 및 보고 기능 지원 중단
---
**2027년 1월 31일**부터 DORA Metrics는 새로운 인시던트를 수집하지 않습니다. 이러한 변경의 영향을 받는 항목은 다음과 같습니다.

- 제거되는 DORA 인시던트 추적 뷰
- 비활성화되어 4xx 오류를 반환하는 DORA 실패 및 인시던트 수집 및 삭제 API
- [DORA Metrics 설정][1]의 **PagerDuty** 데이터 소스(인시던트 전달 중단)
- DORA Metrics 설정의 **Datadog Incidents** 데이터 소스(새로운 인시던트를 DORA Metrics로 가져오는 작업 중단)

Datadog은 [DORA Metrics 설정][1]의 인시던트 구성도 제거합니다.

이 날짜 이전에 수집된 인시던트는 사용자 지정 대시보드에서 계속 사용할 수 있으며, DORA API [list][5] 및 [get][9] 엔드포인트로 여전히 쿼리할 수 있습니다.

이는 변경 실패율 및 배포 실패 복구 시간의 계산 방식에 영향을 주지 않습니다. 2026년 1월부터 이러한 지표는 인시던트 이벤트가 아닌 [변경 실패 탐지][2]를 사용합니다.

[Datadog Incident Management][3]에 인시던트 및 인시던트 기록이 있는 경우, 해당 데이터도 영향을 받지 않습니다. DORA Metrics와 독립적으로 인시던트를 선언, 관리 및 보고할 수 있습니다.

## 데이터 소스별 조치 {#actions-by-data-source}

조직이 다음 중 무엇을 통해 DORA Metrics에서 인시던트 데이터를 전송하거나 읽는지 여부에 따라 취해야 할 조치가 달라집니다.

- DORA Metrics 설정의 **Datadog Incidents** 데이터 소스
- DORA Metrics 설정의 **PagerDuty** 데이터 소스
- **DORA 실패 API**(`POST /api/v2/dora/failure`) 또는 지원이 중단된 **DORA 인시던트 API**(`POST /api/v2/dora/incident`)

### Datadog Incidents 데이터 소스 {#datadog-incidents-data-source}

DORA Metrics 설정의 **Datadog Incidents** 데이터 소스에서 가져온 인시던트는 DORA Metrics가 아닌 Datadog Incident Management에 저장됩니다. 인시던트 기록은 Incident Management에서 계속 사용할 수 있습니다.

DORA 인시던트 추적 뷰를 참조하는 대시보드, 노트북 또는 저장된 쿼리가 있는 경우 2027년 1월 31일 이전에 [Incident Management Analytics][4]를 사용하도록 업데이트하세요. 그렇지 않으면 별도의 조치가 필요하지 않습니다.

### PagerDuty 데이터 소스 또는 DORA 실패 및 인시던트 API {#pagerduty-data-source-or-dora-failure-and-incident-apis}

2027년 1월 31일 이전:

1. 스크립트 및 CI/CD pipelines에서 다음 엔드포인트에 대한 호출을 제거하세요. 이 날짜 이후에는 해당 엔드포인트가 비활성화되어 4xx 오류를 반환합니다.
   - `POST /api/v2/dora/failure` 및 `POST /api/v2/dora/incident`
   - `DELETE /api/v2/dora/failure/{failure_id}`
1. 인시던트 데이터의 공백을 방지하려면 지속적인 보고 작업을 [대안](#alternatives-for-incident-reporting) 중 하나로 이전하세요.

인시던트 기록을 내보낼 필요는 없습니다. 이 날짜 이전에 수집된 인시던트는 사용자 지정 대시보드와 DORA API [list][5] 및 [get][9] 엔드포인트를 통해 계속 사용할 수 있습니다.

## 인시던트 보고를 위한 대안 {#alternatives-for-incident-reporting}

| 인시던트 소스 | 대신 사용 |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | 트리거된 이벤트와 해결된 이벤트를 Events Explorer로 가져오는 [Datadog PagerDuty 통합][6]. 이 통합은 DORA Metrics의 PagerDuty 데이터 소스와는 별개입니다. |
| API를 통해 전송된 사용자 지정 인시던트 이벤트 | 쿼리 및 대시보드에 사용할 이벤트를 Events Explorer로 전송하는 [Datadog Events API][7]. Datadog에서 인시던트를 선언하고 관리하려면 [Datadog Incident Management][3]를 사용하세요. |

<div class="alert alert-info">이러한 대안은 인시던트 보고만 지원합니다. <a href="/delivery_performance/dora_metrics/change_failure_detection/">변경 실패 탐지</a>를 사용하는 DORA 안정성 메트릭은 제공하지 않습니다.</div>

## 도움/도움말 받기 {#get-help}

영향을 평가하거나 인시던트 보고를 업데이트하는 데 도움이 필요하면 [Datadog 지원][8]에 문의하세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /ko/delivery_performance/dora_metrics/change_failure_detection/
[3]: /ko/incident_response/incident_management/
[4]: /ko/incident_response/incident_management/analytics_and_reporting/
[5]: /ko/api/latest/dora-metrics/get-a-list-of-incident-events/
[6]: /ko/integrations/pagerduty/
[7]: /ko/api/latest/events/post-an-event/
[8]: /ko/help/
[9]: /ko/api/latest/dora-metrics/get-an-incident-event/