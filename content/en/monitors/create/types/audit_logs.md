---
title: Audit Logs Monitor
kind: documentation
description: "alert when a specified type of audit log exceeds a threshold"
further_reading:
- link: "/account_settings/audit_logs/"
  tag: "Documentation"
  text: "Learn more about Audit Logs"
- link: "/monitors/notifications/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

## Overview

Audit Log monitors alert when a specified type of audit log exceeds a user-defined threshold over a given period of time.

## Monitor creation

To create an [Audit Logs monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Audit Logs*.

### Define the search query

Define a search query for your Audit Logs. Search queries follow the same [search syntax][2] as in the Log Explorer.

For example, if you want to be alerted when an API key is making a certain amount of requests, set `count by` to API Key ID, `@metadata.api_key.id`. You can then group by specific User ID, `@usr.id`, or User email, `@usr.email`, to receive a notification specifying which user is making the request.

### Set alert conditions

Set an alert threshold of greater than a certain value. For example, if you want to set the max amount of API requests to 15, set the alert threshold to `Alert threshold > 15`. Set the warning threshold to any number before 15 to receive a warning prior to a threshold being met.

You can also choose to never resolve, or to automatically resolve, an event from a triggered state. Set a value between `[Never]` (default) and `After 24 Hours`.

### Say what's happening

Create a notification name. For example, `API requests threshold met for {{@usr.id}}`. You can use [template variables][3] to automatically populate a username, email, etc. in the title to quickly gain insight into which account or user is triggering an alert.

Create a monitor message. This can include the steps required for team members to resolve an incident if it is occurring.

You can then select a value from `[Never]` to `Every 24 Hours` to renotify if the monitor has not been resolved. You can also set tags and priority to better correlate data in the event of an incident.

### Notify your team

Select services and team members to notify. For example, alert your on-call Compliance team by Pagerduty, or alert your team by Slack or email to begin assessment of the alert.

You can also select if you want to notify a service or team when an alert is modified with the `Do Not Notify` dropdown option.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/audit
[2]: /logs/explorer/search_syntax/
[3]: /getting_started/monitors/#say-whats-happening
