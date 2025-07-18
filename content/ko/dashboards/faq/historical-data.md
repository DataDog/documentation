---
aliases:
- /ko/graphing/faq/how-do-i-delete-a-host-or-metric-from-the-ui/
- /ko/graphing/faq/is-it-possible-to-query-historical-data-after-a-host-has-been-destroyed/
- /ko/agent/faq/i-stopped-my-agent-but-i-m-still-seeing-the-host/
- /ko/graphing/faq/historical-data
kind: faq
title: 과거 데이터
---

## 그래프화

Datadog에 대한 데이터 리포트를 중단하면 특정 기간 후에 메트릭, 태그 및 호스트가 Datadog UI에 더 이상 표시되지 않습니다.

| 항목                                 | 종료  |
|--------------------------------------|----------|
| 호스트                                | 2시간  |
| 메트릭                              | 24시간 |
| 템플릿 변수 드롭다운의 태그 | 48시간 |
| 다른 드롭다운의 태그             | 12시간 |
| APM `env` 태그                       | 60일  |

데이터가 나열되지 않더라도 [JSON editor][1]로 데이터를 쿼리할 수 있습니다. 호스트 이름 또는 태그를 쿼리하여 간단하게 해결할 수 있습니다.

호스트를 자주 변경하려는 경우 `datadog.yaml`의 [Agent][2]에 태그를 추가하거나, [Infrastructure list][3](사용자 태그)를 사용하세요.

## 삭제하기

### 메트릭 및 태그

메트릭이나 태그를 즉시 삭제할 수 있는 방법은 없습니다. 위 목록은 더 이상 리포트하지 않는 메트릭 또는 태그가 UI에 유지되는 기간을 보여줍니다.

모니터의 경우 메트릭 스트림은 종료 기간 후에 더 이상 고려되지 않습니다.

대시보드의 경우 메트릭 또는 태그는 종료 기간 후에 시각화 상태로 표시되지만 UI 편집기를 사용하여 그래프화하기 위한 드롭다운에서는 사용할 수 없습니다. 해당 메트릭 또는 태그는 [JSON][1] 메소드를 사용하여 계속 그래프화할 수 있습니다.

### 호스트

에이전트를 실행 중이고 의도적으로 호스트를 [중지][4] 또는 [제거][5]했다면 2시간 동안 새로운 데이터를 확인하지 못한 모든 호스트가 UI에서 사라집니다. 이들을 계속 쿼리할 수는 있습니다. 그러나 드롭다운, 인프라스트럭처 목록 또는 호스트 맵에는 표시되지 않습니다.

[1]: /ko/dashboards/graphing_json/
[2]: /ko/agent/
[3]: /ko/infrastructure/
[4]: /ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: /ko/agent/guide/how-do-i-uninstall-the-agent/