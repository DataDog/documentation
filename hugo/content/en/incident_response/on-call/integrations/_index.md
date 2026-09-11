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

- [Amazon SNS][3]
- [Azure Monitor][4]
- [Bugsnag][5]
- [Catchpoint][6]
- [Microsoft Teams][7]
- [Nagios][8]
- [New Relic][9]
- [Pingdom][10]
- [Prometheus Alertmanager][11]
- [Sentry][12]
- [Slack][13]
- [Sumo Logic][14]
- [Zabbix][15]

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
[3]: /integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns
[4]: /integrations/azure-monitor-alerts/#page-a-datadog-on-call-team
[5]: /integrations/bugsnag/#page-a-datadog-on-call-team
[6]: /integrations/catchpoint/#trigger-on-call-pages
[7]: /incident_response/on-call/pages/#through-microsoft-teams
[8]: /integrations/nagios/?tab=host#trigger-on-call-pages
[9]: /integrations/new-relic/#trigger-on-call-pages
[10]: /integrations/pingdom-v3/#page-a-datadog-on-call-team
[11]: /integrations/prometheus/?tab=v2preferred#prometheus-alertmanager
[12]: /integrations/sentry/#page-a-datadog-on-call-team
[13]: /incident_response/on-call/pages/#through-slack
[14]: /integrations/sumo-logic/#trigger-on-call-pages
[15]: /integrations/zabbix/#trigger-on-call-pages
