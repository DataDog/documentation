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
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" src="integrations_logos/amazon-sns_small.svg" alt="Amazon SNS" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" src="integrations_logos/azure-monitor_small.svg" alt="Azure Monitor" >}}
  {{< image-card href="/integrations/bugsnag/#page-a-datadog-on-call-team" src="integrations_logos/bugsnag_small.svg" alt="Bugsnag" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" src="integrations_logos/catchpoint_small.svg" alt="Catchpoint" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" src="integrations_logos/microsoft-teams_small.svg" alt="Microsoft Teams" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" src="integrations_logos/nagios_small.svg" alt="Nagios" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" src="integrations_logos/new-relic_small.svg" alt="New Relic" >}}
  {{< image-card href="/integrations/pingdom-v3/#page-a-datadog-on-call-team" src="integrations_logos/pingdom-v3_small.svg" alt="Pingdom" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" src="integrations_logos/prometheus_small.svg" alt="Prometheus Alertmanager" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" src="integrations_logos/sentry_small.svg" alt="Sentry"  >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" src="integrations_logos/slack_small.svg" alt="Slack" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" src="integrations_logos/sumo-logic_small.svg" alt="Sumo Logic" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" src="integrations_logos/zabbix_small.svg" alt="Zabbix" >}}
{{< /card-grid >}}

{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" >}}
The following integrations are available as a Preview: BigPanda, Checkly, Chronosphere, Coralogix, Cronitor, Dynatrace, Grafana, Jenkins, Jira, LogicMonitor, NodePing, PRTG (Paessler), ServiceNow, Site24x7, Splunk, StatusCake, uptime.com, and UptimeRobot. To request access, see the product preview form.
{{< /callout >}}

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
