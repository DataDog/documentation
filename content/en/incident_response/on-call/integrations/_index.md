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
To use an integration marked **(Preview)**, or to request one that isn't listed, request access through product preview form.
{{< /callout >}}

{{< card-grid card_width="150px" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" src="integrations_logos/slack.png" alt="Slack" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" src="integrations_logos/microsoft_teams.png" alt="Microsoft Teams" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" src="integrations_logos/prometheus.png" alt="Prometheus Alertmanager" >}}
  {{< image-card href="/integrations/pingdom/#page-a-datadog-on-call-team" src="integrations_logos/pingdom.png" alt="Pingdom" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" src="integrations_logos/sentry.png" alt="Sentry" >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" src="integrations_logos/amazon_sns.png" alt="Amazon SNS" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" src="integrations_logos/azure.png" alt="Azure Monitor" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" src="integrations_logos/zabbix.png" alt="Zabbix" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" src="integrations_logos/nagios.png" alt="Nagios" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" src="integrations_logos/catchpoint.png" alt="Catchpoint" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" src="integrations_logos/sumo_logic.png" alt="Sumo Logic" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" src="integrations_logos/new_relic.png" alt="New Relic" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/bugsnag.png" alt="BugSnag" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Coralogix" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Cronitor" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/uptime.png" alt="uptime.com" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Dynatrace" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/servicenow.png" alt="ServiceNow" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/jira.png" alt="Jira" subtitle="(Preview)" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="LogicMonitor" subtitle="(Preview)" >}}
{{< /card-grid >}}

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
