---
title: Create monitor dependencies
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
aliases:
- /monitors/faq/can-i-create-monitor-dependencies
---

While Datadog does fully support [composite monitors][1], there is not an official way to create alerting trees.

Some Datadog users have combined webhook notifications with downtime scoping via the Datadog API to achieve a similar result.

At a high level, the setup for this is as follows:

* Alert A triggers and has an `@webhook-notification`.
* Notification reaches out to the [Datadog downtime API][2] by `$scope` to mute any other alerts.
* When Alert A resolves, use a different @webhook-notification to remove the downtimes from the same $scope.
It should be noted that this can impact previously scheduled downtimes if you have an active downtime overlapping with the defined [$scope][3].

First, [create the webhooks][4]:
{{< img src="monitors/guide/mute_demo_webhook.png" alt="mute_demo_webhook" >}}

Full text for API endpoints (2nd input box for each in the left column):

Mute: `https://api.datadoghq.com/api/v1/downtime?api_key=XXX&application_key=XXX`

Unmute: `https://api.datadoghq.com/api/v1/downtime/cancel/by_scope?api_key=XXX&application_key=XXX`

And the webhook content for both:

```json
{"scope": "$ALERT_SCOPE"}
```

Then, create "Alert A" - for example- a no-data alert for a grouped percentage of hosts for each Availability zone.
{{< img src="monitors/guide/alert_exammple.png" alt="alert_example" >}}

Then, in the alert message, you'll want to use the @notify webhook to mute all subsequent hosts in that Availability Zone when it triggers, and unmute when the alert resolves:
{{< img src="monitors/guide/mute_demo_msg.png" alt="mute_demo_msg" >}}

Here is that full sample markup:

```text
That's alot of missing data - check first to see if there is an AWS outage?
{{#is_alert}}
{{availability-zone.name}} is missing 50% of data!! ALL OTHER ALERTS FOR {{availability-zone.name}} WILL BE AUTOMUTED
@webhook-mute-ALL-monitor-scope
{{/is_alert}}

{{#is_alert_recovery}}
{{availability-zone.name}} is NO LONGER missing 50% of data!! ALL OTHER ALERTS FOR {{availability-zone.name}} ARE UNMUTED
@webhook-unmute-ALL-monitor-scope
{{/is_alert_recovery}}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/composite/
[2]: /api/v1/downtimes/
[3]: /api/v1/downtimes/#cancel-downtimes-by-scope
[4]: https://app.datadoghq.com/account/settings#integrations/webhooks
