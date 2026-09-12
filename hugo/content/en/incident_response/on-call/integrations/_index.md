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

For other ways to trigger a Page, see [Trigger a Page][2].

{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" >}}
To use an integration marked **Preview**, or to request one that isn't listed, request access through the product preview form.
{{< /callout >}}

<style>
.oncall-integrations-grid .card-grid-card .card-body {
  justify-content: flex-end;
}
</style>

<div class="oncall-integrations-grid">
{{< card-grid card_width="150px" image_width="50" >}}
  {{< image-card href="/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns" src="integrations_logos/amazon-sns_avatar.svg" alt="Amazon SNS" title="Amazon SNS" >}}
  {{< image-card href="/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team" src="integrations_logos/azure-monitor-alerts_avatar.svg" alt="Azure Monitor" title="Azure Monitor" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/bigpanda_avatar.svg" alt="BigPanda" title="BigPanda" subtitle="Preview" >}}
  {{< image-card href="/integrations/bugsnag/#page-a-datadog-on-call-team" src="integrations_logos/bugsnag_avatar.svg" alt="Bugsnag" title="Bugsnag" >}}
  {{< image-card href="/integrations/catchpoint/#trigger-on-call-pages" src="integrations_logos/catchpoint_avatar.svg" alt="Catchpoint" title="Catchpoint" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/checkly_avatar.svg" alt="Checkly" title="Checkly" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/chronosphere_avatar.svg" alt="Chronosphere" title="Chronosphere" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/coralogix_avatar.svg" alt="Coralogix" title="Coralogix" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/cronitor_avatar.svg" alt="Cronitor" title="Cronitor" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/dynatrace_avatar.svg" alt="Dynatrace" title="Dynatrace" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/grafana_avatar.svg" alt="Grafana" title="Grafana" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/jenkins_avatar.svg" alt="Jenkins" title="Jenkins" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/jira_avatar.svg" alt="Jira" title="Jira" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/logicmonitor_avatar.svg" alt="LogicMonitor" title="LogicMonitor" subtitle="Preview" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-microsoft-teams" src="integrations_logos/microsoft-teams_avatar.svg" alt="Microsoft Teams" title="Microsoft Teams" >}}
  {{< image-card href="/integrations/nagios/?tab=host#trigger-on-call-pages" src="integrations_logos/nagios_avatar.svg" alt="Nagios" title="Nagios" >}}
  {{< image-card href="/integrations/new-relic/#trigger-on-call-pages" src="integrations_logos/new-relic_avatar.svg" alt="New Relic" title="New Relic" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/nodeping_avatar.svg" alt="NodePing" title="NodePing" subtitle="Preview" >}}
  {{< image-card href="/integrations/pingdom-v3/#page-a-datadog-on-call-team" src="integrations_logos/pingdom-v3_avatar.svg" alt="Pingdom" title="Pingdom" >}}
  {{< image-card href="/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager" src="integrations_logos/prometheus_avatar.svg" alt="Prometheus Alertmanager" title="Prometheus Alertmanager" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/prtg_avatar.svg" alt="PRTG (Paessler)" title="PRTG (Paessler)" subtitle="Preview" >}}
  {{< image-card href="/integrations/sentry/#page-a-datadog-on-call-team" src="integrations_logos/sentry_avatar.svg" alt="Sentry" title="Sentry" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/servicenow_avatar.svg" alt="ServiceNow" title="ServiceNow" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/site24x7_avatar.svg" alt="Site24x7" title="Site24x7" subtitle="Preview" >}}
  {{< image-card href="/incident_response/on-call/pages/#through-slack" src="integrations_logos/slack_avatar.svg" alt="Slack" title="Slack" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/splunk_avatar.svg" alt="Splunk" title="Splunk" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/statuscake_avatar.svg" alt="StatusCake" title="StatusCake" subtitle="Preview" >}}
  {{< image-card href="/integrations/sumo-logic/#trigger-on-call-pages" src="integrations_logos/sumo-logic_avatar.svg" alt="Sumo Logic" title="Sumo Logic" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/uptime_avatar.svg" alt="uptime.com" title="uptime.com" subtitle="Preview" >}}
  {{< image-card href="https://www.datadoghq.com/product-preview/on-call-integrations/" src="integrations_logos/uptimerobot_avatar.svg" alt="UptimeRobot" title="UptimeRobot" subtitle="Preview" >}}
  {{< image-card href="/integrations/zabbix/#trigger-on-call-pages" src="integrations_logos/zabbix_avatar.svg" alt="Zabbix" title="Zabbix" >}}
{{< /card-grid >}}
</div>

## Generic webhook integration

If your tool is not listed, use the [Datadog Events API][1] to trigger On-Call Pages from any source that can make an HTTP request.

Post an event with the following parameters:

<table>
  <colgroup>
    <col style="width:25%">
    <col style="width:75%">
  </colgroup>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>aggregation_key</code></td>
      <td>A unique, user-defined identifier for the alert. Datadog uses this value for deduplication: if an incoming alert's <code>aggregation_key</code> matches an already triggered Page, Datadog doesn't create a new Page. Datadog also uses this value to link a recovery event to its open Page.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>The type of event. Set to <code>alert</code> to trigger a Page.</td>
    </tr>
    <tr>
      <td><code>text</code></td>
      <td>The body of the alert message. Include <code>@oncall-&lt;TEAM_HANDLE&gt;</code> to route the Page to the correct On-Call team.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>A short summary of the alert. Displayed as the Page's title.</td>
    </tr>
  </tbody>
</table>

The `@oncall-<TEAM_HANDLE>` mention in `text` determines which On-Call team receives the Page. Replace `<TEAM_HANDLE>` with your team's handle as configured in Datadog.

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

[1]: https://docs.datadoghq.com/api/latest/events/post-an-event/
[2]: /incident_response/on-call/pages/#trigger-a-page

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
