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

Define a search query for your Audit Logs. For example, if you want to be alerted when an API key is making a suspicious amount of requests, set `count by` to API Key ID, `@metadata.api_key.id`. You can then group by specific User ID, `@usr.id`, or User email, `@usr.email`, to receive a notification about which user is making the requests.

### Set alert conditions

Set an alert threshold of greater than a certain value to send a notification. For example, if you want to set the max amount of API requests to 15, set the alert threshold to `Alert threshold > 15`. Set the warning threshold to any number before 15 to receive a warning notification.

You can also choose to automatically resolve an event from a triggered state. Set a value between `[Never]` (default) and `After 24 Hours`.

### Say what's happening

Create a notification name. For example, `API requests threshold met for {{@usr.id}}`.

Create a monitor message. This can include the steps required for team members to resolve the issue and who to notify.

You can then select a value from `[Never]` to `Every 24 Hours` to renotify if the monitor has not been resolved. You can also set tags and priority to better correlate data in the event of an incident.

### Notify your team

Select or input services and team members to notify. For example, alert your on-call Compliance team by Pagerduty, or alert yourself or your team by email to begin assessment of an issue as it is occurring.

You can also select if you want to notify a service or team when an alert is modified with the `Do Not Notify` dropdown option.


