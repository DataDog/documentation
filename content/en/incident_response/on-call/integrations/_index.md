---
title: On-Call Integrations
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

Datadog On-Call supports multiple triggering sources beyond native Datadog monitors. Use third-party tools to send Pages directly to your On-Call teams. Alerts from any part of your stack then reach the right responders through your configured escalation policies.

{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" >}}
To use an integration marked **(Preview)**, or to request one that isn't listed, request access through the product preview form.
{{< /callout >}}

<style>
.oncall-integrations-grid .card-grid-card .card-body {
  justify-content: flex-end;
}
</style>

<div class="oncall-integrations-grid">
{{< card-grid card_width="150px" image_width="50" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" src="integrations_logos/slack_avatar.svg" alt="Slack" title="Slack" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" src="integrations_logos/microsoft-teams_avatar.svg" alt="Microsoft Teams" title="Microsoft Teams" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" src="integrations_logos/prometheus_avatar.svg" alt="Prometheus Alertmanager" title="Prometheus Alertmanager" >}}
  {{< image-card href="/integrations/pingdom-v3/#page-a-datadog-on-call-team" src="integrations_logos/pingdom-v3_avatar.svg" alt="Pingdom" title="Pingdom" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" src="integrations_logos/sentry_avatar.svg" alt="Sentry" title="Sentry" >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" src="integrations_logos/amazon-sns_avatar.svg" alt="Amazon SNS" title="Amazon SNS" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" src="integrations_logos/azure-monitor-alerts_avatar.svg" alt="Azure Monitor" title="Azure Monitor" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" src="integrations_logos/zabbix_avatar.svg" alt="Zabbix" title="Zabbix" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" src="integrations_logos/nagios_avatar.svg" alt="Nagios" title="Nagios" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" src="integrations_logos/catchpoint_avatar.svg" alt="Catchpoint" title="Catchpoint" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" src="integrations_logos/sumo-logic_avatar.svg" alt="Sumo Logic" title="Sumo Logic" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" src="integrations_logos/new-relic_avatar.svg" alt="New Relic" title="New Relic" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/bugsnag_avatar.svg" alt="Bugsnag" title="Bugsnag" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Coralogix" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Cronitor" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/uptime_avatar.svg" alt="uptime.com" title="uptime.com" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Dynatrace" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/servicenow_avatar.svg" alt="ServiceNow" title="ServiceNow" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/jira_avatar.svg" alt="Jira" title="Jira" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="LogicMonitor" subtitle="(Preview)" >}}
{{< /card-grid >}}
</div>

## Other tools

If your tool is not listed, use the [Datadog Events API][1] to trigger On-Call Pages from any source that can make an HTTP request.

Post an event with the following parameters:

| Parameter | Value |
|-----------|-------|
| `alert_type` | `error` |
| `aggregation_key` | A string that groups related alerts into a single Page. |
| `title` | A short description of the alert. |
| `text` | Include `@oncall-<TEAM_HANDLE>` to route the Page to the correct On-Call team. |

The `@oncall-<TEAM_HANDLE>` mention in `text` determines which On-Call team receives the Page. Replace `<TEAM_HANDLE>` with your team's handle as configured in Datadog.

[1]: https://docs.datadoghq.com/api/latest/events/post-an-event/

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
