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

Datadog On-Call supports multiple triggering sources beyond native Datadog monitors. Use third-party tools to send Pages directly to your On-Call Teams. Alerts from any part of your stack then reach the right responders through your configured escalation policies.

For other ways to trigger a Page, see [Trigger a Page][2].

{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" >}}
To use an integration marked **Preview**, or to ask about one that isn't listed, request access through the product preview form.
{{< /callout >}}

## Available integrations

Datadog On-Call includes native paging support for the following tools:

- [Amazon SNS](/integrations/amazon-sns/#page-a-datadog-on-call-team-from-sns)
- [Azure Monitor](/integrations/azure-monitor-alerts/#page-a-datadog-on-call-team)
- [Bugsnag](/integrations/bugsnag/#page-a-datadog-on-call-team)
- [Catchpoint](/integrations/catchpoint/#trigger-on-call-pages)
- [Microsoft Teams](/incident_response/on-call/pages/#through-microsoft-teams)
- [Nagios](/integrations/nagios/?tab=host#trigger-on-call-pages)
- [New Relic](/integrations/new-relic/#trigger-on-call-pages)
- [Pingdom](/integrations/pingdom-v3/#page-a-datadog-on-call-team)
- [Prometheus Alertmanager](/integrations/prometheus/?tab=v2preferred#prometheus-alertmanager)
- [Sentry](/integrations/sentry/#page-a-datadog-on-call-team)
- [Slack](/incident_response/on-call/pages/#through-slack)
- [Sumo Logic](/integrations/sumo-logic/#trigger-on-call-pages)
- [Zabbix](/integrations/zabbix/#trigger-on-call-pages)

The following integrations are available as a Preview: BigPanda, Checkly, Chronosphere, Coralogix, Cronitor, Dynatrace, Grafana, Jenkins, Jira, LogicMonitor, NodePing, PRTG (Paessler), ServiceNow, Site24x7, Splunk, StatusCake, uptime.com, and UptimeRobot. To request access, see the product preview form.

## Generic webhook integration

If your tool is not listed, use the [Datadog Events API][1] to trigger On-Call Pages from any source that can make an HTTP request.

Post an event with the following parameters:

| Parameter | Value |
|-----------|-------|
| `aggregation_key` | A unique, user-defined identifier for the alert. Datadog uses this value for deduplication: If an incoming alert's `aggregation_key` matches an already triggered Page, Datadog doesn't create a new Page. Datadog also uses this value to link a recovery event to its open Page. |
| `category` | The type of event. Set to `alert` to trigger a Page. |
| `text` | The body of the alert message. Include `@oncall-<TEAM_HANDLE>` to route the Page to the correct On-Call Team. |
| `title` | A short summary of the alert. Displayed as the Page's title. |

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

[1]: https://docs.datadoghq.com/api/latest/events/post-an-event/
[2]: /incident_response/on-call/pages/#trigger-a-page

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
