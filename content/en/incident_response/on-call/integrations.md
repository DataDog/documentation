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

{{< beta-callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" >}}
To use an integration marked "Preview", or to request a new integration, request access.
{{< /beta-callout >}}

{{< integration-tile-grid >}}
  {{< integration-tile href="/incident_response/on-call/pages/#through-slack" logo_id="slack" src="integrations_logos/slack.png" alt="Slack" title="Slack" >}}
  {{< integration-tile href="/incident_response/on-call/pages/#through-microsoft-teams" logo_id="microsoft-teams" src="integrations_logos/microsoft_teams.png" alt="Microsoft Teams" title="Microsoft Teams" >}}
  {{< integration-tile href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" logo_id="prometheus" src="integrations_logos/prometheus.png" alt="Prometheus Alertmanager" title="Prometheus Alertmanager" >}}
  {{< integration-tile href="/integrations/pingdom/#page-a-datadog-on-call-team" logo_id="pingdom-v3" src="integrations_logos/pingdom.png" alt="Pingdom" title="Pingdom" >}}
  {{< integration-tile href="/integrations/sentry/#page-a-datadog-on-call-team" logo_id="sentry" src="integrations_logos/sentry.png" alt="Sentry" title="Sentry" >}}
  {{< integration-tile href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" logo_id="amazon-sns" src="integrations_logos/amazon_sns.png" alt="Amazon CloudWatch" title="Amazon CloudWatch" >}}
  {{< integration-tile href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" logo_id="azure" src="integrations_logos/azure.png" alt="Azure Monitor" title="Azure Monitor" >}}
  {{< integration-tile href="/integrations/zabbix/#trigger-on-call-pages" logo_id="zabbix" src="integrations_logos/zabbix.png" alt="Zabbix" title="Zabbix" >}}
  {{< integration-tile href="/integrations/nagios/?tab=host#trigger-on-call-pages" logo_id="nagios" src="integrations_logos/nagios.png" alt="Nagios" title="Nagios" >}}
  {{< integration-tile href="/integrations/catchpoint/#events" logo_id="catchpoint" src="integrations_logos/catchpoint.png" alt="Catchpoint" title="Catchpoint" >}}
  {{< integration-tile href="/integrations/sumo-logic/#trigger-on-call-pages" logo_id="sumo-logic" src="integrations_logos/sumo_logic.png" alt="Sumo Logic" title="Sumo Logic" >}}
  {{< integration-tile href="/integrations/new-relic/#trigger-on-call-pages" logo_id="new-relic" src="integrations_logos/new_relic.png" alt="New Relic" title="New Relic" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" logo_id="bugsnag" src="integrations_logos/bugsnag.png" alt="BugSnag" title="BugSnag" preview="true" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Coralogix" preview="true" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Cronitor" preview="true" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" logo_id="uptime" src="integrations_logos/uptime.png" alt="uptime.com" title="uptime.com" preview="true" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="Dynatrace" preview="true" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" logo_id="servicenow" src="integrations_logos/servicenow.png" alt="ServiceNow" title="ServiceNow" preview="true" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" logo_id="jira" src="integrations_logos/jira.png" alt="Jira" title="Jira" preview="true" >}}
  {{< integration-tile href="https://www.datadoghq.com/product-preview/on-call-integrations/" title="LogicMonitor" preview="true" >}}
{{< /integration-tile-grid >}}

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
