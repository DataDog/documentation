---
description: 기본 제공 통합 또는 일반 웹훅을 사용하여 타사 모니터링, 경보 및 인시던트 도구에서 Datadog On-Call Pages를
  트리거하세요.
further_reading:
- link: /incident_response/on-call/
  tag: 문서
  text: Datadog On-Call
- link: /incident_response/on-call/pages/
  tag: 문서
  text: 페이지
- link: /incident_response/on-call/routing_rules/
  tag: 문서
  text: 라우팅 규칙
title: On-Call 통합
---
## 개요 {#overview}

Datadog On-Call은 기본 Datadog 모니터 외에도 여러 트리거 소스를 지원합니다. 타사 모니터링, 경보 및 인시던트 관리 도구를 사용하여 On-Call Teams로 직접 Page를 보내세요. 스택의 모든 부분에서 발생하는 경보는 구성된 에스컬레이션 정책을 통해 적절한 담당자에게 전달됩니다. 자세한 내용은 [페이지 트리거][1]를 참조하세요.

이 페이지에 나열된 각 기본 제공 통합에는 해당 통합 타일에 설정 지침이 포함되어 있습니다. 이 지침은 페이지를 보내도록 타사 도구를 구성하는 방법을 다룹니다. 또한 경보를 Datadog On-Call 팀에 매핑하는 방법도 다룹니다. 도구에 기본 제공 통합이 없는 경우 대신 [일반 웹훅 통합](#generic-webhook-integration)을 사용하세요.

## 사용 가능한 통합 {#available-integrations}

Datadog On-Call은 다음 도구에 대한 기본 페이징 지원을 포함합니다.

{{< card-grid >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" integration_id="amazon-sns" alt="Amazon SNS" title="Amazon SNS" style="catalog" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" integration_id="azure-monitor" alt="Azure Monitor" title="Azure Monitor" style="catalog" >}}
  {{< image-card href="/integrations/bugsnag/#page-a-datadog-on-call-team" integration_id="bugsnag" alt="Bugsnag" title="Bugsnag" style="catalog" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" integration_id="catchpoint" alt="Catchpoint" title="Catchpoint" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" integration_id="microsoft-teams" alt="Microsoft Teams" title="Microsoft Teams" style="catalog" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" integration_id="nagios" alt="Nagios" title="Nagios" style="catalog" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" integration_id="new-relic" alt="New Relic" title="New Relic" style="catalog" >}}
  {{< image-card href="/integrations/pingdom-v3/#page-a-datadog-on-call-team" integration_id="pingdom-v3" alt="Pingdom" title="Pingdom" style="catalog" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" integration_id="prometheus" alt="Prometheus Alertmanager" title="Prometheus Alertmanager" style="catalog" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" integration_id="sentry" alt="Sentry" title="Sentry" style="catalog" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" integration_id="slack" alt="Slack" title="Slack" style="catalog" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" integration_id="sumo-logic" alt="Sumo Logic" title="Sumo Logic" style="catalog" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" integration_id="zabbix" alt="Zabbix" title="Zabbix" style="catalog" >}}
{{< /card-grid >}}

## 미리 보기 통합 {#preview-integrations}

다음 통합은 [미리 보기](https://www.datadoghq.com/product-preview/on-call-integrations/)로 제공되고 있습니다. 타일을 선택하여 액세스를 요청하세요.

<!-- Tiles below use `integration_id` so the logo renders the same way as a published integration tile. For vendors without a published logo, integration_id falls back to a matching static/images/integrations_logos/<id>.svg — 생성된 자리 표시자 아바타(공급업체 브랜드 색상에 이니셜 표시). -->

{{< card-grid >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="bigpanda" alt="BigPanda" title="BigPanda" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="checkly" alt="Checkly" title="Checkly" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="chronosphere" alt="Chronosphere" title="Chronosphere" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="coralogix" alt="Coralogix" title="Coralogix" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="cronitor" alt="Cronitor" title="Cronitor" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="dynatrace-mcp" alt="Dynatrace" title="Dynatrace" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="grafana-mcp" alt="Grafana" title="Grafana" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jenkins" alt="Jenkins" title="Jenkins" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="jira" alt="Jira" title="Jira" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="logicmonitor" alt="LogicMonitor" title="LogicMonitor" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="nodeping" alt="NodePing" title="NodePing" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="prtg-paessler" alt="PRTG(Paessler)" title="PRTG(Paessler)" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="servicenow" alt="ServiceNow" title="ServiceNow" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="site24x7" alt="Site24x7" title="Site24x7" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="splunk-mcp" alt="Splunk" title="Splunk" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="statuscake" alt="StatusCake" title="StatusCake" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptime" alt="uptime.com" title="uptime.com" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptimerobot" alt="UptimeRobot" title="UptimeRobot" style="catalog" >}}
{{< /card-grid >}}

## 일반 웹훅 통합 {#generic-webhook-integration}

사용 중인 도구가 목록에 없으면 [Datadog Events API][2]를 사용하여 HTTP 요청을 보낼 수 있는 모든 소스에서 On-Call Page를 트리거하세요.

다음 파라미터로 이벤트를 게시하세요.

| 파라미터 | 값 |
|-----------|-------|
| <code style="white-space: nowrap;">aggregation_key</code> | 경보에 대한 고유한 사용자 지정 식별자입니다. Datadog은 중복 제거를 위해 이 값을 사용합니다. 수신 경보의 `aggregation_key`가 이미 트리거된 Page와 일치하면 Datadog은 Page를 생성하지 않습니다. Datadog은 또한 이 값을 사용하여 복구 이벤트를 해당 열린 Page와 연결합니다. |
| <code style="white-space: nowrap;">category</code> | 이벤트 유형입니다. Page를 트리거하려면 `alert`로 설정합니다. |
| <code style="white-space: nowrap;">text</code> | 경보 메시지의 본문입니다. Page를 올바른 On-Call 팀으로 라우팅하려면 `@oncall-<TEAM_HANDLE>`을 포함합니다. |
| <code style="white-space: nowrap;">title</code> | 경보에 대한 짧은 요약입니다. Page의 제목으로 표시됩니다. |

`text`의 `@oncall-<TEAM_HANDLE>` 멘션에 따라 Page를 수신할 On-Call 팀이 결정됩니다. `<TEAM_HANDLE>`을 Datadog에 구성된 팀 핸들로 바꾸세요.

{{% collapse-content title="예시: 요청 본문" level="h4" %}}

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "alert_unique_identifier",
      "attributes": {
        "priority": "1",
        "status": "error"
      },
      "category": "alert",
      "message": "@oncall-database Something is broken!",
      "title": "High memory usage"
    },
    "type": "event"
  }
}
```

{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/on-call/pages/#trigger-a-page
[2]: https://docs.datadoghq.com/ko/api/latest/events/post-an-event/