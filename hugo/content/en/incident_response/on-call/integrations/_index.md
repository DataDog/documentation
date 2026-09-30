---
title: On-Call Integrations
description: Trigger Datadog On-Call Pages from third-party monitoring, alerting, and incident tools using native integrations or a generic webhook.
further_reading:
- link: '/incident_response/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
- link: '/incident_response/on-call/pages/'
  tag: 'Documentation'
  text: 'Pages'
- link: '/incident_response/on-call/routing_rules/'
  tag: 'Documentation'
  text: 'Routing Rules'
---

## Overview

Datadog On-Call supports multiple triggering sources beyond native Datadog monitors. Use third-party monitoring, alerting, and incident management tools to send Pages directly to your On-Call Teams. Alerts from any part of your stack then reach the right responders through your configured escalation policies. For more information, see [Trigger a Page][1].

Each native integration listed on this page includes setup instructions on its own integration tile. These instructions cover how to configure the third-party tool to send a Page. They also cover how to map its alerts to a Datadog On-Call Team. If your tool doesn't have a native integration, use the [generic webhook integration](#generic-webhook-integration) instead.

## Available integrations

Datadog On-Call includes native paging support for the following tools:

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

## Preview integrations

The following integrations are available as a [Preview](https://www.datadoghq.com/product-preview/on-call-integrations/). Select a tile to request access.

<!-- Tiles below use `integration_id` so the logo renders the same way as a published integration tile. For vendors without a published logo, integration_id falls back to a matching static/images/integrations_logos/<id>.svg — a generated placeholder avatar (initials on the vendor's brand color). -->

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
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="prtg-paessler" alt="PRTG (Paessler)" title="PRTG (Paessler)" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="servicenow" alt="ServiceNow" title="ServiceNow" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="site24x7" alt="Site24x7" title="Site24x7" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="splunk-mcp" alt="Splunk" title="Splunk" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="statuscake" alt="StatusCake" title="StatusCake" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptime" alt="uptime.com" title="uptime.com" style="catalog" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" integration_id="uptimerobot" alt="UptimeRobot" title="UptimeRobot" style="catalog" >}}
{{< /card-grid >}}

## Generic webhook integration

If your tool is not listed, use the [Datadog Events API][2] to trigger On-Call Pages from any source that can make an HTTP request.

Post an event with the following parameters:

| Parameter | Value |
|-----------|-------|
| <code style="white-space: nowrap;">aggregation_key</code> | A unique, user-defined identifier for the alert. Datadog uses this value for deduplication: If an incoming alert's `aggregation_key` matches an already triggered Page, Datadog doesn't create a Page. Datadog also uses this value to link a recovery event to its open Page. |
| <code style="white-space: nowrap;">category</code> | The type of event. Set to `alert` to trigger a Page. |
| <code style="white-space: nowrap;">text</code> | The body of the alert message. Include `@oncall-<TEAM_HANDLE>` to route the Page to the correct On-Call Team. |
| <code style="white-space: nowrap;">title</code> | A short summary of the alert. Displayed as the Page's title. |

The `@oncall-<TEAM_HANDLE>` mention in `text` determines which On-Call Team receives the Page. Replace `<TEAM_HANDLE>` with your team's handle as configured in Datadog.

{{% collapse-content title="Example: Request body" level="h4" %}}

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/on-call/pages/#trigger-a-page
[2]: https://docs.datadoghq.com/api/latest/events/post-an-event/
