---
description: 모니터링 사용 패턴을 분석하고, 사용하지 않거나 중복된 모니터링을 식별하며, 모니터링 관리 모범 사례를 적용하여 경보 품질을
  향상시키고 불필요한 소음을 줄이는 방법을 알아보세요.
further_reading:
- link: monitors/guide/monitor_best_practices
  tag: Documentation
  text: 모니터링 모범 사례
- link: monitors/quality
  tag: Documentation
  text: 모니터링 품질
title: 모니터링 혼잡 정리
---
## 개요

시간이 지남에 따라 모니터링 혼잡이 쌓이면 불필요한 경보, 중복 경보, 운영 마찰 증가가 발생합니다. 이 가이드는 혼잡한 모니터링을 식별하고 정리하는 명확한 접근 방식을 제시하며, 경보 워크플로를 효율화하는 데 도움이 되는 사용 사례를 제공합니다.

또한 시스템이 성장함에 따라 모니터링 전략을 확장하고 관리하기 쉬울 수 있도록 모니터링 환경을 깨끗하게 유지하기 위한 모범 사례를 제공합니다.

### 전제 조건

[모니터링 쓰기 권한][10]이 있어야 합니다.

### 사용 사례

이 가이드는 모니터링 혼잡을 정리하기 위한 주요 사용 사례를 다룹니다.

**[장기간 음소거된 모니터링](#mutedforalongperiodoftime)**: 몇 주 또는 몇 달 동안 음소거된 모니터링입니다.
**[ALERT 상태에 장기간 머무른 모니터링](#inthealertedstateforalongperiodoftime)**: 인지되거나 해결되지 않은 채 비정상적으로 오랜 시간 "Alert" 상태에 있는 모니터링입니다.
**[중복 모니터링](#duplicatemonitors)**: 동일한 조건, 메트릭, 서비스에 대해 여러 모니터링이 트리거되는 경우로, 팀 단절이나 조정 부족으로 인해 발생합니다.
**[플랩 및 소음이 많은 모니터링](#flappyandnoisymonitors)**: 자주 트리거되고 해제되는 모니터링(즉, "플랩") 또는 낮은 가치의 경보가 다량 발생하는 모니터링입니다.
**[잘못 구성된 모니터링](#misconfiguredmonitors)**: 대시보드 연결이 끊기거나 평가 지연이 누락되거나 경보 구성 요소가 누락 또는 잘못되었거나 태그 및 명명 규칙이 오래된 모니터링입니다.

## 장기간 음소거된 모니터링

모니터링은 장애, 보안 위협, 성능 문제에 대한 조기 경고 시스템 역할을 합니다. 그러나 장기간 음소거된 모니터링은 이 목적을 무색하게 하며, 장기 음소거는 해당 모니터링이 구식이거나 관련성이 없거나 소음이 과다하여 유용하지 않다는 신호인 경우가 많습니다. 이러한 모니터링은 검토 후 적절하게 조정하여 다시 활성화하거나 폐기하여 혼잡을 줄이고 경보 환경에서 오래된 모니터링을 제거해야 합니다.

가치가 없는 모니터링을 정리하고 장기간 음소거된 모니터링을 기간이 정해진 일정으로 바꾸세요.

### 1. 모니터링 점검

장기간 음소거된 모니터링을 감사하여 실제로 필요한지 또는 유용한지 확인합니다. 일부 모니터링은 정당한 이유로 음소거되어 있을 수 있으므로, 삭제하지 않도록 주의해야 합니다.

이러한 모니터링을 보려면 [모니터링 품질][1] 페이지로 이동하여 60일 이상 음소거된 모니터링 목록을 찾습니다. 또한 [**모니터링 목록**][8]에서 `muted_elapsed:<number_of_days>d` 쿼리를 사용하여 음소거된 모니터링을 찾을 수 있습니다.

목록을 확보한 후, 모니터링 품질 페이지에서 개별 모니터링을 조치하거나 2단계와 3단계를 통해 일괄 삭제할 수 있습니다.

### 2. 모니터링 ID 목록 가져오기

변경 사항을 프로그래밍 방식으로 자동화하려면 모니터링 ID 목록을 가져옵니다. 먼저 60일 이상 음소거된 모니터링을 대상으로 시작합니다.

다음 CURL 명령어가 해당 정보를 가져옵니다.

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("muted_duration_over_sixty_days")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_muted.csv
```

가독성을 위해 CSV 파일 형태로 모니터링 세부 정보를 가져옵니다. 쿼리를 특정 사용 사례에 맞게 조정할 수 있습니다.

### 3. 모니터링 삭제

2단계에서 확보한 60일 이상 음소거된 모니터링 목록을 기반으로, 다음 스크립트를 사용하여 모니터링을 삭제할 수 있습니다. 스크립트를 실행하기 전에 표에서 모니터링 ID 열을 **첫 번째**로 배치합니다.

```shell
input_file="monitors_muted.csv"
tail -n +2 "$input_file" | awk -F',' '{print $1}' | while read -r monitor_id; do
    echo "Deleting monitor ID: $monitor_id"

    curl -X DELETE "{{< region-param key=dd_api >}}/api/v1/monitor/${monitor_id}" \
        -H "Accept: application/json" \
        -H "DD-API-KEY: ${DD_API_KEY}" \
        -H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
    echo "Deleted monitor: $monitor_id"
done
```

## ALERT 상태에 장기간 머무른 모니터링

지속적인 경보는 두 가지 문제를 나타낼 수 있습니다. 문제 자체가 조치 불가하거나 모니터링 임계값이 잘못 구성된 경우입니다. 두 경우 모두 경보에 대한 신뢰를 떨어뜨려 경보 피로를 유발합니다. 이러한 모니터링은 검토 후 편집하거나 제거해야 합니다.

60일 이상 ALERT 상태에 있는 모니터링 목록을 가져오는 방법은 다음과 같습니다.

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("alerted_too_long")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_alerted_too_long.csv
```

삭제하려면 [모니터링 삭제 명령](#3deletethemonitors)의 동일한 절차를 사용합니다. `input_file`을 `monitors_alerted_too_long.csv`로 교체합니다.

## 중복 모니터링

태그만 다른 별도의 모니터링을 생성하면 불필요한 중복이 발생할 수 있습니다. 예를 들어, `prod`용 CPU 사용량 모니터링과 `staging`용 모니터링을 각각 만들면 모니터링 수가 증가합니다.

중복 모니터링은 불필요한 소음과 혼란을 초래합니다. 많은 경우, 이러한 모니터링을 적절한 범위와 태그가 지정된 하나의 [**다중 경보** 모니터링][2]에 통합하여 중복을 줄이고 경보를 더 쉽게 관리할 수 있습니다.

경보를 트리거한 태그 값에 따라 다른 알림을 보내야 하는 경우, [모니터링 변수][3]를 사용하여 임계값을 위반한 태그에 따라 메시지를 동적으로 맞춤 설정할 수 있습니다.

## 플랩 및 소음이 많은 모니터링

소음이 많은 모니터링은 팀을 실제 문제에 둔감하게 만듭니다. 플래핑(모니터링이 자주 경보와 복구 상태를 오가는 현상)은 불안정한 임계값, 평가 지연 누락 또는 시스템 불안정을 나타냅니다.

소음을 줄이려면 모니터링의 평가 집계와 임계값 구성을 검토하세요. 경보 동작을 안정화하도록 설정을 조정하고, 모니터링이 더 이상 가치가 없으면 삭제하세요.

다음은 경보가 많이 발생하는 모니터링 목록을 가져오는 방법입니다.

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("noisy_monitor")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > noisy_monitors.csv
```

삭제하려면 [모니터링 삭제 명령](#3deletethemonitors)의 동일한 절차를 사용합니다. `input_file`을 `noisy_monitors.csv`로 바꿉니다.

## 잘못 구성된 모니터링

잘못 구성된 모니터링은 활성화된 모니터링으로서 올바르게 사용할 수 있지만, 알림을 받지 못하기 때문에 비효율적입니다. 이러한 잘못된 구성은 모니터링의 신뢰성을 떨어뜨리고 디버깅이나 분류를 어렵게 만듭니다. 이들을 정리하면 경보가 정확하고 실행 가능하며 관측 워크플로에 통합됩니다.

### 깨진 핸들
[**모니터링 품질 페이지**][4]를 사용하여 핸들이 깨진 모니터링을 시각화합니다. 이러한 모니터링의 알림은 목적지에 도달하지 못합니다.

**Datadog 권장 사항**: 모니터링 수신자를 검토하여 올바르게 전달되는지 확인하거나 모니터링을 삭제하세요.

핸들이 잘못 구성된 모니터링 목록을 가져오는 방법은 다음과 같습니다.

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("broken_at_handle")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_broken_handle.csv
```

삭제하려면 [모니터링 삭제 명령](#3deletethemonitors)의 동일한 절차를 사용합니다. `input_file`을 `monitors_broken_handle.csv`로 바꿉니다.

### 지연 누락
이 문제는 주로 AWS 메트릭을 기반으로 하는 모니터링에 영향을 미칩니다. Datadog은 API를 통해 AWS 메트릭을 가져오기 때문에 데이터가 사용 가능해지기까지 내장 지연이 존재합니다. 이를 고려하지 않으면, 불완전하거나 지연된 데이터로 인해 모니터링이 오탐을 트리거할 수 있습니다.

영향을 받은 모니터링은 [모니터링 품질][4] 페이지에서 찾을 수 있으며, 이 페이지에 평가 지연이 누락된 모니터링이 플래그됩니다.

**Datadog 권장 사항**: AWS 메트릭을 사용하는 모든 모니터링에 지연 시간을 추가하세요. 300초(5분)의 지연은 일반적으로 데이터 수집 지연을 고려하기에 충분합니다.

지연이 누락된 모니터링 목록을 가져오는 방법은 다음과 같습니다.

```shell
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("crawler_metric_missing_eval_delay")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_delay.csv
```

자세한 내용은 [AWS 문제 해결 가이드][7]를 참조하세요.

### 구성 요소 누락

복합 조건 모니터링은 두 개 이상의 모니터링(구성 요소라고 함)의 논리적 조합에 따라 상태를 평가합니다. 이 구성 요소 모니터링 중 하나라도 삭제되거나 사용할 수 없게 되면, 복합 조건 모니터링은 유효하지 않거나 신뢰할 수 없게 됩니다.

구성 요소가 누락되었다는 것은 일반적으로 복합 조건 모니터링이 생성된 후 원래 입력 모니터링 중 적어도 하나가 제거되었음을 의미합니다. 이로 인해 복합 조건 모니터링이 불완전해지고 경보 동작에서 잠재적으로 오해를 불러일으킬 수 있습니다.

**Datadog 권장 사항**: 복합 조건 모니터링을 검토하여 누락된 구성 요소를 교체 또는 복원하거나 복합 조건 모니터링을 삭제하세요. 누락된 구성 요소가 있는 복합 조건 모니터링 목록은 [모니터링 품질][4] 페이지에서 확인할 수 있습니다.

프로그래밍 방식으로 누락된 구성 요소가 있는 모니터링 목록을 가져오는 방법:

```bash
curl -s -X GET "{{< region-param key=dd_api >}}/api/v1/monitor/search" \
  -H "DD-API-KEY: ${API_KEY}" \
  -H "DD-APPLICATION-KEY: ${APP_KEY}" \
  -H "Content-Type: application/json" | jq -r '
  .monitors[]
  | select(.quality_issues != null and (.quality_issues | index("composite_has_deleted_constituents")))
  | [.id, .name, (.quality_issues | join(";"))]
  | @csv' > monitors_missing_constituent.csv
```

삭제하려면 [모니터링 삭제 명령](#3deletethemonitors)의 동일한 절차를 사용합니다. `input_file`을 `monitors_missing_constituent.csv`로 바꿉니다.

자세한 내용은 [복합 조건 모니터링][11]를 참조하세요.

## 모니터링 혼잡 방지를 위한 모범 사례

| 모범 사례 | 설명 | 구현 |
||||
| **중복 제거** | 약간 다른 범위(지역, 팀, 환경 등)로 동일한 신호를 추적하는 여러 모니터링을 생성하지 마세요. | 태그가 있는 **모니터링 그룹화**를 사용하세요. 관리 및 확장이 용이합니다. |
| **명확한 소유권 설정** | 모든 모니터링에는 경보를 적절한 담당자에게 전달하고 혼란을 방지할 수 있는 명확한 소유자가 있어야 합니다. | `team:` 태그 및 알림 핸들(`@slackxyz`, `@pagerdutytwilio`)을 사용하세요. [모니터링 목록][8]에서 **Creator** 필터를 사용하여 가장 빈번한 모니터링 생성자를 검토할 수 있습니다. |
| **소음이 많거나 비활성 모니터링 검토** | 너무 자주 경보를 보내거나 전혀 경보를 보내지 않는 모니터링은 피로감을 유발하거나 잘못된 구성 신호를 나타낼 수 있습니다. | [**모니터링 품질 페이지**][4]를 사용하여 소음이 많거나 깨졌거나 오래된 모니터링을 식별하고 정리하세요. |
| **모니터링 템플릿 활용** | 일반적인 패턴(예: RED 메트릭 또는 API 대기 시간)에는 템플릿을 사용하여 중복을 줄이고 표준화를 보장하세요. | [재사용 가능한 템플릿][5]을 사용하여 팀 전체에서 중복을 줄이고 표준화를 유지하세요. |
| **태깅 정책 수립** | 일관되고 의미 있는 태그를 사용하면 모니터링을 쉽게 필터링, 그룹화 및 라우팅할 수 있습니다. | 일관된 태그(예: `service:`, `env:`, `team:`)를 사용하고 [태깅 정책][6]을 수립하세요. 이를 통해 범위별 대시보드, 경보, 규정 준수가 가능해집니다. |
| **모니터링 품질 대시보드** | 팀, 서비스, 환경 전반에서 모니터링 상태 트렌드를 시각화하여 사전에 문제를 식별하고 개선 사항을 추적하세요. | [**모니터링 품질 대시보드**](#templatemonitorqualitydashboard)를 설정하여 시간 경과에 따른 개선 사항을 추적하고 대규모 정리 작업의 우선순위를 정하세요. |

## 템플릿 모니터링 품질 대시보드

시작하는 데 도움이 되도록 다음 JSON 대시보드 정의를 Datadog 계정에 직접 가져올 수 있습니다.

1. 앱에서 [**Dashboards**][9]로 이동하여 **New Dashboard**를 클릭합니다.
2. 페이지 상단에서 **Configure**를 클릭하고 **Import dashboard JSON....**를 선택합니다.
3. 아래 JSON을 복사하여 모니터링 품질 대시보드를 구성합니다.

```json
{
  "title": "Monitor Quality OOTB Dashboard",
  "description": "",
  "widgets": [
    {
      "id": 8853380235542346,
      "definition": {
        "type": "note",
        "content": "This Monitor Quality dashboard provides a comprehensive view of monitor quality metrics, broken down by `team` and `service`. Its goal is to help you easily analyze and act on monitor quality data, enabling you to schedule reports, download insights as PDFs, and more.\n\n**Key Features:**\n- Team and Service Views: You can filter the dashboard either by team or by service, but not both simultaneously. If you filter by `team`, refer to the [Team Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107838741&to_ts=1732280638741&live=false&tile_focus=4548404374449802) for relevant insights. If you filter by `service`, explore the [Service Section](https://app.datadoghq.com/dashboard/u7b-4n7-gn5/monitor-quality-ootb-dashboard?fromUser=false&refresh_mode=paused&from_ts=1732107865224&to_ts=1732280665224&live=false&tile_focus=2841959907422822) for detailed information.\n- Monitor-Level Details: For a deeper dive into specific impacted monitors, navigate to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality).\n- Seamless Navigation: Use the context links provided in the dashboard to jump directly to the [Monitor Quality page](https://app.datadoghq.com/monitors/quality), pre-filtered with the same criteria you've applied on the dashboard.\n\nThis dashboard is designed to give you both a high-level overview and actionable paths to improve your monitoring posture.",
        "background_color": "white",
        "font_size": "14",
        "text_align": "left",
        "vertical_align": "center",
        "show_tick": false,
        "tick_pos": "50%",
        "tick_edge": "left",
        "has_padding": true
      },
      "layout": { "x": 0, "y": 0, "width": 12, "height": 3 }
    },
    {
      "id": 4548404374449802,
      "definition": {
        "title": "General overview - by team",
        "background_color": "blue",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 2449119265341574,
            "definition": {
              "type": "note",
              "content": "This section is powered by the `datadog.monitor.suggested_monitor_health_by_team` metric, which is emitted daily.\n\nThe monitor counts reported in this metric exclude synthetic monitors.\n\nThese counts represent the total number of suggestions for monitor quality improvements, broken down by team.\n\nUse the `team` filter to view insights specific to your team.\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "white",
              "font_size": "14",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 3001209940385798,
            "definition": {
              "title": "Distribution of Quality Improvements by Type",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{$team,$service} by {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "sunburst",
              "hide_total": false,
              "legend": { "type": "automatic" },
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$team}}"
                }
              ]
            },
            "layout": { "x": 5, "y": 0, "width": 7, "height": 4 }
          },
          {
            "id": 498569597362654,
            "definition": {
              "title": "Evolution of Quality Improvements by Type over Time",
              "title_size": "16",
              "title_align": "left",
              "show_legend": false,
              "legend_layout": "auto",
              "legend_columns": ["avg", "min", "max", "value", "sum"],
              "time": { "hide_incomplete_cost_data": true },
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [{ "formula": "query1" }],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{$team,$service} by {suggestion_type}"
                    }
                  ],
                  "response_format": "timeseries",
                  "style": {
                    "palette": "datadog16",
                    "order_by": "values",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$team}}"
                }
              ]
            },
            "layout": { "x": 0, "y": 4, "width": 12, "height": 4 }
          },
          {
            "id": 1376609088194674,
            "definition": {
              "title": "Top Teams Impacted",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" }
              }
            },
            "layout": { "x": 0, "y": 8, "width": 12, "height": 4 }
          },
          {
            "id": 718136447073638,
            "definition": {
              "type": "note",
              "content": "Monitors with Missing Recipients per Team",
              "background_color": "vivid_blue",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 12, "width": 6, "height": 1 }
          },
          {
            "id": 2393792996475864,
            "definition": {
              "type": "note",
              "content": "Monitors with Broken Handles per Team",
              "background_color": "vivid_green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 12, "width": 6, "height": 1 }
          },
          {
            "id": 4443082314028290,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- no notification handle found in monitor body\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 3954366540293996,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- notification handle is not valid\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 13, "width": 6, "height": 2 }
          },
          {
            "id": 2546970864549118,
            "definition": {
              "title": "Monitors with Missing Recipients per Team",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:missing_at_handle,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "blue"
              }
            },
            "layout": { "x": 0, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 3744392131942638,
            "definition": {
              "title": "Monitors with Broken Handles per Team",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:broken_at_handle,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "green"
              }
            },
            "layout": { "x": 6, "y": 15, "width": 6, "height": 5 }
          },
          {
            "id": 2751217590574740,
            "definition": {
              "type": "note",
              "content": "Monitors Muted for Too Long",
              "background_color": "purple",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 5158165900159898,
            "definition": {
              "type": "note",
              "content": "Monitors Generating a High Volume of Alerts",
              "background_color": "green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 20, "width": 6, "height": 1 }
          },
          {
            "id": 8032070484951580,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been muted for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4153429942317530,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor generates the top 5% of alerts over the past 10 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 2 }
          },
          {
            "id": 4158897740932848,
            "definition": {
              "title": "Monitors Muted for Too Long",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "semantic"
              }
            },
            "layout": { "x": 0, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 5392245250417816,
            "definition": {
              "title": "Monitors Generating a High Volume of Alerts",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:noisy_monitor,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": { "display": { "type": "stacked" }, "palette": "grey" }
            },
            "layout": { "x": 6, "y": 23, "width": 6, "height": 5 }
          },
          {
            "id": 1271026446632020,
            "definition": {
              "type": "note",
              "content": "Monitors Stuck in Alert State",
              "background_color": "vivid_yellow",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 6315895116466318,
            "definition": {
              "type": "note",
              "content": "Composite Monitors have Deleted Components",
              "background_color": "gray",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 28, "width": 6, "height": 1 }
          },
          {
            "id": 8251226565664096,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been alerting for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 1329067816249636,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor is a composite one and has deleted components\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 2 }
          },
          {
            "id": 7052384595427880,
            "definition": {
              "title": "Monitors Stuck in Alert State",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:alerted_too_long,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "orange"
              }
            },
            "layout": { "x": 0, "y": 31, "width": 6, "height": 5 }
          },
          {
            "id": 2768363536962548,
            "definition": {
              "title": "Composite Monitors have Deleted Components",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_team{!team:none,suggestion_type:composite_has_deleted_constituents ,$team,$service} by {team,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{team}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 31, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": { "x": 0, "y": 3, "width": 12, "height": 37 }
    },
    {
      "id": 2841959907422822,
      "definition": {
        "title": "General overview - by service",
        "background_color": "pink",
        "show_title": true,
        "type": "group",
        "layout_type": "ordered",
        "widgets": [
          {
            "id": 3801590205295194,
            "definition": {
              "type": "note",
              "content": "This section is powered by the `datadog.monitor.suggested_monitor_health_by_service` metric, which is emitted daily.\n\nThe monitor counts reported in this metric exclude synthetic monitors.\n\nThese counts represent the total number of suggestions for monitor quality improvements, broken down by service.\n\nUse the `service` filter to view insights specific to your team.\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "white",
              "font_size": "14",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 0, "width": 5, "height": 4 }
          },
          {
            "id": 8418200284207718,
            "definition": {
              "title": "Distribution of Quality Improvements by Type",
              "title_size": "16",
              "title_align": "left",
              "time": { "hide_incomplete_cost_data": true },
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team,$service} by {suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "style": { "palette": "datadog16" },
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 500,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "type": "sunburst",
              "hide_total": false,
              "legend": { "type": "automatic" },
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "layout": { "x": 5, "y": 0, "width": 7, "height": 4 }
          },
          {
            "id": 8281740697966220,
            "definition": {
              "title": "Evolution of Quality Improvements by Type over Time",
              "title_size": "16",
              "title_align": "left",
              "show_legend": false,
              "legend_layout": "auto",
              "legend_columns": ["avg", "min", "max", "value", "sum"],
              "time": { "hide_incomplete_cost_data": true },
              "type": "timeseries",
              "requests": [
                {
                  "formulas": [{ "formula": "query1" }],
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{$team, $service} by {suggestion_type}"
                    }
                  ],
                  "response_format": "timeseries",
                  "style": {
                    "palette": "datadog16",
                    "order_by": "values",
                    "line_type": "solid",
                    "line_width": "normal"
                  },
                  "display_type": "line"
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{$service}}"
                }
              ]
            },
            "layout": { "x": 0, "y": 4, "width": 12, "height": 4 }
          },
          {
            "id": 5048429332292860,
            "definition": {
              "title": "Top services impacted",
              "title_size": "16",
              "title_align": "left",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" }
              }
            },
            "layout": { "x": 0, "y": 8, "width": 12, "height": 5 }
          },
          {
            "id": 2233801928907094,
            "definition": {
              "type": "note",
              "content": "Monitors with Missing Recipients per Service",
              "background_color": "vivid_blue",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 13, "width": 6, "height": 1 }
          },
          {
            "id": 7329031300309162,
            "definition": {
              "type": "note",
              "content": "Monitors with Broken Handles per Service",
              "background_color": "vivid_green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 13, "width": 6, "height": 1 }
          },
          {
            "id": 7627510169738418,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- no notification handle found in monitor body\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 2826082028591748,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- notification handle is not valid\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 14, "width": 6, "height": 2 }
          },
          {
            "id": 5050954942402816,
            "definition": {
              "title": "Monitors with Missing Recipients per Service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:missing_at_handle,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "blue"
              }
            },
            "layout": { "x": 0, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 7809748805807956,
            "definition": {
              "title": "Monitors with Broken Handles per Service",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:broken_at_handle,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "green"
              }
            },
            "layout": { "x": 6, "y": 16, "width": 6, "height": 5 }
          },
          {
            "id": 8416588682594596,
            "definition": {
              "type": "note",
              "content": "Monitors Muted for Too Long",
              "background_color": "purple",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 4951606729784970,
            "definition": {
              "type": "note",
              "content": "Monitors Generating a High Volume of Alerts",
              "background_color": "green",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 21, "width": 6, "height": 1 }
          },
          {
            "id": 1778359756038190,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been muted for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 8559060613933804,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor generates the top 5% of alerts over the past 10 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 22, "width": 6, "height": 2 }
          },
          {
            "id": 7041249940897320,
            "definition": {
              "title": "Monitors Muted for Too Long",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:muted_duration_over_sixty_days,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "semantic"
              }
            },
            "layout": { "x": 0, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 7810615049061724,
            "definition": {
              "title": "Monitors Generating a High Volume of Alerts",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:noisy_monitor,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "grey"
              }
            },
            "layout": { "x": 6, "y": 24, "width": 6, "height": 5 }
          },
          {
            "id": 5108940190121326,
            "definition": {
              "type": "note",
              "content": "Monitors Stuck in Alert State",
              "background_color": "vivid_yellow",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 4931941666409286,
            "definition": {
              "type": "note",
              "content": "Composite Monitors have Deleted Components",
              "background_color": "gray",
              "font_size": "18",
              "text_align": "center",
              "vertical_align": "center",
              "show_tick": false,
              "tick_pos": "50%",
              "tick_edge": "left",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 29, "width": 6, "height": 1 }
          },
          {
            "id": 6520923360190496,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor has been alerting for at least 60 days\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 0, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 1364025765104008,
            "definition": {
              "type": "note",
              "content": "Monitor counts reported in this metric satisfy the following conditions:\n- the monitor is a composite one and has deleted components\n- monitor type is not `synthetics`\n\n_You can use the context links to jump to the list of affected monitors._",
              "background_color": "yellow",
              "font_size": "14",
              "text_align": "left",
              "vertical_align": "center",
              "show_tick": true,
              "tick_pos": "50%",
              "tick_edge": "bottom",
              "has_padding": true
            },
            "layout": { "x": 6, "y": 30, "width": 6, "height": 2 }
          },
          {
            "id": 3670188762233230,
            "definition": {
              "title": "Monitors Stuck in Alert State",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "orange"
              }
            },
            "layout": { "x": 0, "y": 32, "width": 6, "height": 5 }
          },
          {
            "id": 9006201303765196,
            "definition": {
              "title": "Composite Monitors have Deleted Components",
              "type": "toplist",
              "requests": [
                {
                  "queries": [
                    {
                      "name": "query1",
                      "data_source": "metrics",
                      "query": "sum:datadog.monitor.suggested_monitor_health_by_service{!service:none,suggestion_type:alerted_too_long,$team,$service} by {service,suggestion_type}",
                      "aggregator": "last"
                    }
                  ],
                  "response_format": "scalar",
                  "formulas": [{ "formula": "query1" }],
                  "sort": {
                    "count": 10,
                    "order_by": [
                      { "type": "formula", "index": 0, "order": "desc" }
                    ]
                  }
                }
              ],
              "custom_links": [
                {
                  "label": "See list of monitors",
                  "link": "https://app.datadoghq.com/monitors/quality?q={{service}}"
                }
              ],
              "style": {
                "display": { "type": "stacked", "legend": "automatic" },
                "palette": "datadog16"
              }
            },
            "layout": { "x": 6, "y": 32, "width": 6, "height": 5 }
          }
        ]
      },
      "layout": {
        "x": 0,
        "y": 40,
        "width": 12,
        "height": 38,
        "is_column_break": true
      }
    }
  ],
  "template_variables": [
    {
      "name": "team",
      "prefix": "team",
      "available_values": [],
      "default": "*"
    },
    {
      "name": "service",
      "prefix": "service",
      "available_values": [],
      "default": "*"
    }
  ],
  "layout_type": "ordered",
  "notify_list": [],
  "reflow_type": "fixed"
}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/quality
[2]: /ko/monitors/guide/alert_aggregation/#multialert
[3]: /ko/monitors/notify/variables/?tab=is_alert#conditionalvariables
[4]: https://app.datadoghq.com/monitors/quality?order=desc
[5]: https://app.datadoghq.com/monitors/templates?q=&amp;origination=installed&amp;p=1
[6]: https://app.datadoghq.com/monitors/settings/policies
[7]: /ko/integrations/guide/awsintegrationtroubleshooting/#metricsdelayed
[8]: https://app.datadoghq.com/monitors/manage
[9]: https://app.datadoghq.com/dashboard/lists
[10]: /ko/account_management/rbac/permissions/#monitors
[11]: /ko/monitors/types/composite/