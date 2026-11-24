---
title: Baseline Monitors
description: "Learn how Datadog creates, tunes, and removes APM monitors for the entry points of your services."
further_reading:
- link: "/monitors/types/apm/"
  tag: "Documentation"
  text: "APM Monitor"
- link: "/monitors/notify/notification_rules/"
  tag: "Documentation"
  text: "Monitor Notification Rules"
- link: "/bits_ai/bits_detection/"
  tag: "Documentation"
  text: "Bits Detection"
---

{{< callout url="#" btn_hidden="true" header="false">}}
  Baseline Monitors is in Preview. Contact your Datadog representative to request access.
{{< /callout >}}

## Overview

Baseline Monitors gives every APM service in scope a standard set of monitors. Datadog creates the monitors, sets their thresholds from the production behavior of each service, and keeps them current as services change. Your team does not have to create or maintain them by hand.

For each entry point of a service, Datadog creates three monitors:

| Monitor | Signal | Alerts when |
|---|---|---|
| High error rate | Errors | The error rate of the entry point goes above the threshold. |
| High latency | Latency | The latency of the entry point goes above the threshold. |
| Low traffic | Requests | The request rate of the entry point goes below the threshold. |

An entry point is a server or consumer operation (`span.kind:server` or `span.kind:consumer`) where requests come into the service from outside it.

Your existing monitors stay in place. Baseline Monitors does not change or delete monitors that your team creates.

### Baseline Monitors and Bits Detection

Baseline Monitors and [Bits Detection][1] both create monitors for your APM services, but they solve different problems:

- **Baseline Monitors** gives every in-scope service the same minimum coverage: error rate, latency, and traffic on each entry point. You turn it on from the Monitor Settings page. Baseline Monitors is included at no additional cost.
- **Bits Detection** finds the endpoints that are most critical to your users and business, and adapts its detection to them. You turn it on by creating an Autonomous Ops scope. Bits Detection is a paid product.

You can use both features at the same time.

## Enable Baseline Monitors

### Permissions

| Action | Required permissions |
|---|---|
| View Baseline Monitors settings | Monitors Read (`monitors_read`) |
| Turn Baseline Monitors on or off for the organization, or cover all services | Monitor Configuration Policy Write (`monitor_config_policy_write`) |
| Add or remove a service | Monitor Configuration Policy Write (`monitor_config_policy_write`) |
| Add or remove a team | Monitor Configuration Policy Write (`monitor_config_policy_write`), or membership in the team |

Users without the required permission can view the settings but cannot change them.

### Turn on Baseline Monitors

1. Go to [**Monitors > Settings > Automation & Agents**][2].
1. In the **Baseline Monitors** section, select the **Org** scope and turn on **Baseline Monitors**.
1. Choose which services to cover:
   - To cover every service, turn on **Cover all services**.
   - To cover only some services, leave **Cover all services** off. Then select the **Team** or **Service** scope, and add each team or service that you want to cover.

A team or service gets Baseline Monitors only when Baseline Monitors is turned on for the organization.

Datadog creates the first monitors within about one hour.

To stop Baseline Monitors, turn the setting off for the organization, or remove the team or service. Datadog applies the change on its next run.

## How Baseline Monitors works

Datadog checks each enabled organization **every hour**. In each check, Datadog creates the monitors that are missing, tunes the existing monitors, and deletes the monitors that are no longer needed.

### Monitor creation

Datadog creates a monitor for an entry point only when all of these conditions are true:

- The service is in an enabled scope.
- The service reports data in the default environment of your organization.
- The entry point had APM data in the last 7 days.
- Datadog can recommend a threshold from the recent history of the entry point.

Each monitor is scoped to the service, the entry point, and the environment. Its message describes what is happening and links to the related service and traces.

### Required tags

Your organization's [monitor tag policies][3] can require a tag on every monitor. Datadog takes the value of that tag from the [service definition][4] of the monitor's service. Datadog adds the tag when it creates the monitor, and it keeps the tag on existing monitors, drafts included:

- If the monitor does not have the required tag, Datadog adds it. This includes a tag that a user deleted.
- If the service definition changes the value, Datadog updates the tag on the monitor.
- If a user sets a different value on the monitor, Datadog keeps the user's value.

Datadog creates the monitor without the required tag when the service definition:

- Does not set the tag.
- Sets more than one value for the tag.
- Sets a value that the tag policy does not allow.

For Baseline Monitors to have the required tags, set each required tag to one allowed value in the service definition.

### Monitor tuning

Datadog checks the threshold of each published Baseline Monitor about **once every 7 days**. Datadog changes the threshold only when:

- The new recommended threshold differs from the current threshold by 20% or more.
- Datadog has high confidence in the new recommendation.
- Datadog did not change the threshold of that monitor in the last 7 days.

If you edit the threshold of a Baseline Monitor, Datadog does not change that threshold again.

### Monitor deletion

Datadog deletes a Baseline Monitor when:

- The service or the entry point leaves the enabled scope. For example, the entry point stops receiving traffic, or you remove the service from the scope.
- The monitor stays in the **No Data** state for more than 7 days.

**Note**: You can delete a Baseline Monitor. If its entry point still meets the [monitor creation](#monitor-creation) conditions, Datadog creates the monitor again after a 7-day cooldown period.

## Notifications

### Draft and published monitors

A Baseline Monitor is either **draft** or **published**. A draft monitor evaluates its query and shows its status, but it does not send notifications. A published monitor sends notifications.

During the Preview, Datadog creates every Baseline Monitor as a draft. Review the monitor, and publish it when you want it to send notifications.

### Noise protection

Before Datadog creates a monitor, it replays the monitor over the last 7 days. Datadog creates the monitor as a draft if, in that period, the monitor would have:

- Changed into the alert state more than 3 times.
- Been in the alert state for more than 10% of the time.
- Been in the alert state at the end of the period.

Datadog also checks published Baseline Monitors over time. If a published monitor becomes too noisy, Datadog first tries a new threshold. If the new threshold does not fix the noise, Datadog moves the monitor to draft, so it stops sending notifications. The monitor and its history stay available for review.

Datadog never moves a monitor to draft if you published it, edited it, or muted it.

### Alert routing

Every Baseline Monitor has the tag `managed_monitor:true`. Datadog creates one [monitor notification rule][5] that matches this tag. The rule sends each alert to the notification channels of the monitor's team.

To receive Baseline Monitor alerts:

1. Assign an owning team to each service in its [service definition][4].
1. Configure notification channels for each team in [Teams][6].

If the team of a monitor has no notification channels, the alert goes to no one.

To stop all Baseline Monitor notifications for your organization, set the Baseline notification rule to inactive. If you delete the rule, Datadog creates it again.

## View Baseline Monitors

To list Baseline Monitors, go to [**Monitors > List**][7] and search for `tag:managed_monitor:true`.

**Note**: The **Auto-managed** filter in the left panel shows both Baseline Monitors and Bits Detection monitors. To see only Baseline Monitors, use the search above.

## Edit Baseline Monitors

You can edit, publish, or mute a Baseline Monitor in the same way as any other monitor. After you edit a Baseline Monitor:

- Datadog does not change the threshold that you set.
- Datadog does not move the monitor to draft.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_detection/
[2]: https://app.datadoghq.com/monitors/settings/posture
[3]: /monitors/settings/#tag-policies
[4]: /internal_developer_portal/catalog/entity_model/
[5]: /monitors/notify/notification_rules/
[6]: /account_management/teams/manage/
[7]: https://app.datadoghq.com/monitors/manage
