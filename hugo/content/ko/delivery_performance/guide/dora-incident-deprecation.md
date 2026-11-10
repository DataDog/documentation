---
description: 'DORA Metrics의 인시던트 수집 및 보고 기능 지원 중단: 타임라인, 영향을 받는 사람 및 인시던트 보고 마이그레이션
  방법.'
further_reading:
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: 문서
  text: 변경 실패 탐지에 대해 알아보기
- link: /incident_response/incident_management/analytics_and_reporting/
  tag: 문서
  text: Incident Management Analytics를 사용한 인시던트 보고
- link: /delivery_performance/dora_metrics/
  tag: 문서
  text: DORA Metrics에 대해 알아보기
private: true
title: DORA Metrics의 인시던트 수집 및 보고 기능 지원 중단
---
**2026년 12월 31일**부터 DORA Metrics는 인시던트 데이터를 수집하거나 표시하지 않으며, **2027년 3월 31일**부터는 DORA Metrics에 저장된 인시던트에 액세스할 수 없습니다. 이러한 변경의 영향을 받는 항목은 다음과 같습니다.

- DORA Metrics의 인시던트 보기
- DORA 인시던트 API
- [DORA Metrics 설정][1]의 PagerDuty 및 Datadog Incidents 데이터 소스
- DORA 인시던트 데이터를 사용하는 모든 대시보드, 노트북 또는 저장된 쿼리

이는 변경 실패율 및 배포 실패 복구 시간의 계산 방식에는 영향을 미치지 않습니다. 두 메트릭은 인시던트 이벤트가 아닌 [변경 실패 탐지][2]를 사용하기 때문입니다.

[Datadog Incident Management][3]에 인시던트 및 인시던트 기록이 있는 경우, 해당 데이터도 영향을 받지 않습니다. DORA Metrics와 독립적으로 인시던트를 선언, 관리 및 보고할 수 있습니다.

## 데이터 소스별 조치 {#actions-by-data-source}

조직이 다음 중 무엇을 통해 DORA Metrics에서 인시던트 데이터를 전송하거나 읽는지 여부에 따라 취해야 할 조치가 달라집니다.

- DORA Metrics 설정의 **Datadog Incidents** 데이터 소스
- DORA Metrics 설정의 **PagerDuty** 데이터 소스
- **DORA 인시던트 API**(`POST /api/v2/dora/incident`)

### Datadog Incidents 데이터 소스 {#datadog-incidents-data-source}

DORA Metrics 설정의 **Datadog Incidents** 데이터 소스에서 가져온 인시던트는 DORA Metrics가 아닌 Datadog Incident Management에 저장됩니다. 인시던트 기록은 Incident Management에서 계속 사용할 수 있으므로 내보내기 마감일(2027년 3월 31일)은 적용되지 않습니다.

DORA 인시던트 데이터를 참조하는 대시보드, 노트북 또는 저장된 쿼리가 있는 경우 2026년 12월 31일 이전에 [Incident Management Analytics][4]를 사용하도록 업데이트하세요. 그렇지 않으면 별도의 조치가 필요하지 않습니다.

### PagerDuty 데이터 소스 또는 DORA 인시던트 API {#pagerduty-data-source-or-dora-incident-api}

DORA Metrics 설정의 **PagerDuty** 데이터 소스 또는 **DORA 인시던트 API**를 통해 가져온 인시던트는 DORA Metrics에 저장되므로 두 날짜 모두 적용됩니다. 인시던트 보고 및 기록을 유지하려면 다음 작업을 수행하세요.

1. 2026년 12월 31일 이전:
   - 인시던트 수집 엔드포인트(`POST /api/v2/dora/incident`) 및 인시던트 삭제 엔드포인트에 대한 호출을 제거합니다.
   - 인시던트 데이터의 공백을 방지하려면 진행 중인 보고를 [대안](#alternatives-for-incident-reporting) 중 하나로 이동하세요.
1. 2027년 3월 31일 이전:
   - [인시던트 이벤트 API][5]를 사용하여 보관하려는 인시던트 기록을 내보내거나 대시보드 데이터를 CSV로 다운로드합니다.
   - DORA 인시던트 데이터를 참조하는 대시보드, 노트북 또는 저장된 쿼리를 업데이트하거나 사용 중지하세요.

## 인시던트 보고를 위한 대안 {#alternatives-for-incident-reporting}

| 인시던트 소스 | 대신 사용 |
| --- | --- |
| Datadog Incident Management | [Incident Management Analytics][4] |
| PagerDuty | 트리거된 이벤트와 해결된 이벤트를 Events Explorer로 가져오는 [Datadog PagerDuty 통합][6]. 이 통합은 DORA Metrics의 PagerDuty 데이터 소스와는 별개입니다. |
| API를 통해 전송된 사용자 지정 인시던트 이벤트 | 쿼리 및 대시보드에 사용할 이벤트를 Events Explorer로 전송하는 [Datadog Events API][7]. Datadog에서 인시던트를 선언하고 관리하려면 [Datadog Incident Management][3]를 사용하세요. |

<div class="alert alert-info">이러한 대안은 인시던트 보고만 지원합니다. <a href="/delivery_performance/dora_metrics/change_failure_detection/">변경 실패 탐지</a>를 사용하는 DORA 안정성 메트릭은 제공하지 않습니다.</div>

## 타임라인 {#timeline}

| 날짜 | 변경 |
| --- | --- |
| 2026년 12월 31일 | DORA Metrics에서 인시던트 수신이 중단됩니다. <br>- 인시던트 수집 및 삭제 API가 비활성화됩니다.<br>- DORA Metrics의 PagerDuty 데이터 소스가 인시던트 전달을 중단합니다.<br>- Datadog Incidents 데이터가 DORA Metrics에 표시되지 않습니다.<br>이 날짜 이전에 수집된 인시던트는 2027년 3월 31일까지 조회하고 내보낼 수 있습니다. Datadog에서는 [DORA Metrics 설정][1]에서 인시던트 구성을 제거합니다. |
| 2027년 3월 31일 | 이전에 DORA Metrics를 통해 전송된 인시던트를 조회하거나 내보낼 수 없습니다. |

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