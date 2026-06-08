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

The following integrations are supported:

| Integration | Trigger method |
|-------------|---------------|
| [Slack](#slack) | Slash command |
| [Prometheus Alertmanager](#prometheus-alertmanager) | Webhook |
| [Pingdom](#pingdom) | Webhook |
| [Sentry](#sentry) | Webhook (with forwarder) |

## Slack

{{% collapse-content title="Set up the Slack integration" level="h3" %}}

Use the Datadog Slack app to manage On-Call operations directly from Slack.

### Prerequisites

- The [Datadog Slack app][1] installed in your Slack workspace
- On-Call enabled for your Datadog organization

### Trigger a Page from Slack

Run the following slash command in any Slack channel:

```
/dd page
```

Select the team to page and provide a title and description for the Page.

Pages sent from Slack are always `high` urgency.

{{% /collapse-content %}}

## Prometheus Alertmanager

{{% collapse-content title="Set up the Prometheus Alertmanager integration" level="h3" %}}

Route Prometheus alerts to Datadog On-Call through Alertmanager's webhook receiver.

### Prerequisites

- A running Prometheus and Alertmanager setup
- A Datadog API key

### Setup

Edit your `alertmanager.yml` to add a Datadog webhook receiver. Set `group_by` to `['alertname']` so Alertmanager sends one alert per payload, as the Datadog endpoint accepts only one event at a time.

```yaml
receivers:
- name: datadog-oncall
  webhook_configs:
  - send_resolved: true
    url: 'https://event-management-intake.datadoghq.com/api/v2/events/webhook?dd-api-key=<DATADOG_API_KEY>&integration_id=prometheus&oncall_team=<TEAM_HANDLE>'
route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 5m
  receiver: datadog-oncall
  repeat_interval: 3h
```

Replace `<DATADOG_API_KEY>` with your Datadog API key and `<TEAM_HANDLE>` with your On-Call team handle.

Restart your services after saving the configuration:

```shell
sudo systemctl restart prometheus.service alertmanager.service
```

### How it works

When Alertmanager fires an alert, it sends a POST request to the Datadog event intake endpoint. Datadog routes the resulting event to the specified On-Call team based on the `oncall_team` parameter.

Setting `send_resolved: true` ensures Alertmanager notifies Datadog when alerts clear, which automatically resolves the corresponding Page. Resolved notifications may be delayed until the next `group_interval`.

To route different alerts to different On-Call teams, define multiple receivers with different `oncall_team` values and use `matchers` in your route configuration to direct alerts accordingly.

{{% /collapse-content %}}

## Pingdom

{{% collapse-content title="Set up the Pingdom integration" level="h3" %}}

Route Pingdom uptime check alerts to Datadog On-Call through a webhook integration.

### Prerequisites

- A Pingdom account with at least one configured uptime check
- A Datadog API key

### Setup

1. In Pingdom, go to [**Integrations > Integrations**][2].
1. Click **Add new**.
1. Enter a name for the integration.
1. In the **URL** field, enter the following webhook URL:
   ```
   https://event-management-intake.datadoghq.com/api/v2/events/webhook?dd-api-key=<DATADOG_API_KEY>&integration_id=pingdom-v3&oncall_team=<TEAM_HANDLE>
   ```
   Replace `<DATADOG_API_KEY>` with your Datadog API key and `<TEAM_HANDLE>` with your On-Call team handle.
1. Click **Save integration**.

After saving, enable the integration on your uptime checks:

1. Go to [**Monitoring > Uptime**][3].
1. Open the check you want to configure.
1. Select the checkbox next to the integration you created.

### How it works

When a Pingdom check changes status (for example, from up to down), Pingdom sends a POST request to the configured webhook URL. Datadog routes the resulting event to the specified On-Call team. When the check recovers, Pingdom sends a resolved notification that automatically closes the Page.

{{% /collapse-content %}}

## Sentry

{{% collapse-content title="Set up the Sentry integration" level="h3" %}}

Route Sentry alerts to Datadog On-Call through an internal integration and webhook forwarder.

### Prerequisites

- Sentry admin access to create internal integrations
- A deployed webhook forwarder service (Sentry does not support custom headers on webhook requests, so an intermediate service is required to inject the Datadog API key)
- A Datadog API key

### Setup

#### Step 1: Deploy a webhook forwarder

Deploy an intermediate service that:
- Receives POST requests from Sentry
- Injects the required Datadog API key as a query parameter
- Forwards the payload to the following Datadog endpoint:
  ```
  https://event-management-intake.datadoghq.com/api/v2/events/webhook?dd-api-key=<DATADOG_API_KEY>&integration_id=sentry&oncall_team=<TEAM_HANDLE>
  ```

Replace `<DATADOG_API_KEY>` with your Datadog API key and `<TEAM_HANDLE>` with your On-Call team handle.

#### Step 2: Create a Sentry internal integration

1. In Sentry, go to **Settings > Developer Settings > Internal Integrations**.
1. Click **Create New Integration**.
1. Enter a name (for example, `Datadog On-Call`).
1. Set the **Webhook URL** to your forwarder's public URL.
1. Enable **Alert Rule Action**.
1. Set the following permissions:
   - **Issue & Event**: Read
   - **Alerts**: Read
1. Enable webhooks for `issue` and `error` event types.
1. Save the integration.

#### Step 3: Configure an alert rule

1. In your Sentry project, go to **Settings > Alerts > Issue Alerts**.
1. Create or edit an alert rule.
1. Add the action **Send a notification using your internal integration** and select the integration you created.
1. Click **Send Test Notification** to confirm delivery.

### How it works

When Sentry fires an alert, it sends a POST request to your forwarder, which relays it to the Datadog event intake endpoint. Datadog routes the resulting event to the specified On-Call team.

The aggregation key used to correlate and resolve events depends on the event type:

| Event type | Aggregation key |
|------------|-----------------|
| Error events | Issue ID parsed from `data.error.issue_url` (the URL path segment after `issues/`) |
| Issue events | `data.issue.id` (truncated to 100 characters; MD5-hashed if over the limit) |

{{% /collapse-content %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/slack/?tab=datadogforslack
[2]: https://my.pingdom.com/integrations/settings
[3]: https://my.pingdom.com/newchecks/checks
