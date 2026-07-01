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

Datadog On-Call supports multiple triggering sources beyond native Datadog monitors. Use third-party tools to send Pages directly to your On-Call teams, so alerts from any part of your stack reach the right responders through your configured escalation policies.

{{< card-grid card_width="200px" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" src="integrations_logos/slack.png" alt="Slack" title="Slack" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" src="integrations_logos/microsoft_teams.png" alt="Microsoft Teams" title="Microsoft Teams" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" src="integrations_logos/prometheus.png" alt="Prometheus Alertmanager" title="Prometheus Alertmanager" >}}
  {{< image-card href="/integrations/pingdom/#page-a-datadog-on-call-team" src="integrations_logos/pingdom.png" alt="Pingdom" title="Pingdom" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" src="integrations_logos/sentry.png" alt="Sentry" title="Sentry" >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" src="integrations_logos/amazon_sns.png" alt="Amazon CloudWatch" title="Amazon CloudWatch" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" src="integrations_logos/azure.png" alt="Azure Monitor" title="Azure Monitor" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" src="integrations_logos/zabbix.png" alt="Zabbix" title="Zabbix" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" src="integrations_logos/nagios.png" alt="Nagios" title="Nagios" >}}
  {{< image-card href="/integrations/catchpoint/#events" src="integrations_logos/catchpoint.png" alt="Catchpoint" title="Catchpoint" >}}
{{< /card-grid >}}

## Other tools

If your tool is not listed above, use the [Datadog Events API][1] to trigger On-Call pages from any source that can make an HTTP request.

Post an event with the following parameters:

| Parameter | Value |
|-----------|-------|
| `alert_type` | `error` |
| `aggregation_key` | A string that groups related alerts into a single Page. |
| `title` | A short description of the alert. |
| `text` | Include `@oncall-<team_handle>` to route the Page to the correct On-Call team. |

The `@oncall-<team_handle>` mention in `text` determines which On-Call team receives the Page. Replace `<team_handle>` with your team's handle as configured in Datadog.

[1]: https://docs.datadoghq.com/api/latest/events/post-an-event/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
