---
title: Audit Trail Monitor
aliases:
    - /monitors/create/types/audit_logs/
    - /monitors/create/types/audit_trail/
description: "Alert when a specified type of audit trail event is detected or exceeds a threshold."
further_reading:
- link: /account_management/audit_trail/
  tag: Documentation
  text: Learn more about Audit Trail
- link: /monitors/notifications/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
---

## Overview

Audit Trail monitors alert you when a specified type of audit event exceeds a user-defined threshold over a given period of time.

## Monitor creation

To create an [Audit Trail monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Audit Trail*.

### Define the search query

Define a search query for your Audit Events. Search queries follow the same [search syntax][2] as in the Log Explorer.

For example, if you want to be alerted when a specific API key is making a certain number of requests, set `count by` to that API key ID, `@metadata.api_key.id`. You can then group by a specific user ID, `@usr.id`, or user email, `@usr.email`, to receive a notification specifying which user is making the request.

### Set alert conditions

Set an alert threshold for the value you want to be alerted on. For example, if you want to be alerted when the number of API requests reaches 15 or above, set the alert threshold for number of API requests to `Alert threshold > 15`. Set the warning threshold to any number before 15 to receive a warning prior to a threshold being met.

You can also choose to never resolve, or to automatically resolve, an event from a triggered state. Set a value between `[Never]` (default) and `After 24 Hours`.

### Say what's happening

Create a notification name. For example, `API requests threshold met for {{[@usr.id].name}}`. You can use [variables][3] to automatically populate a username, email, etc. in the title to quickly gain insight into which account or user is triggering an alert.

Create a monitor message. This can include the steps required for team members to resolve an incident if one is occurring.

You can then select a value from `[Never]` to `Every 24 Hours` to renotify you if the monitor has not been resolved. You can also set tags and priority to better correlate data in the event of an incident.

### Configure notifications and automations

Select services and team members to notify. For example, you can alert your on-call compliance team with PagerDuty, or alert your team by Slack or email to begin assessment of the alert.

You can also select if you want to notify a service or team when an alert is modified with the `Do Not Notify` dropdown option.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/audit
[2]: /logs/explorer/search_syntax/
[3]: /monitors/notify/variables/
