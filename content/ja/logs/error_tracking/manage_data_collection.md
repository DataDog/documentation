---
title: Manage Data Collection
kind: documentation
is_beta: true
private: true
description: Learn how to control costs in Error Tracking.
further_reading:
- link: /monitors/types/error_tracking
  tag: Documentation
  text: Learn about Error Tracking Monitors
- link: /tracing/error_tracking
  tag: Documentation
  text: Learn about Error Tracking for Backend Services
---

## Overview

Error Tracking provides fine-grained control of which errors to ingest, helping you reduce noise and avoid unexpected costs.

You can define what data is included in Error Tracking in two ways:

1. [Rules](#rules-inclusion)
2. [Rate Limits](#rate-limits)

You can configure both rules and rate limits on the [**Logs** > **Error Tracking** > **Settings**][1] page. 

## Rules

Rules allow you to select which errors are ingested into Error Tracking.

Each rule consists of:
- An inclusion filter, which contains a [log search query][3], such as `service:my-web-store`.
- Optionally, one or more nested exclusion filters to further refine the rule. For example, an exclusion filter might use the `env:staging` query to exclude staging logs.

A given rule can be toggled on or off. An error event is included if it matches a query in one of the active inclusion filters, and it does not match any active nested exclusion queries.

**Note:** Error events that get accepted by a rule might still be excluded from Error Tracking if they lack the [required attributes][2].

### Evaluation order

Rules are evaluated in order, with the evaluation stopping at the first matching rule. The priority of the rules and their nested filters depends on their order in the list.

### Default rules

By default, Error Tracking has an `*` inclusion filter and no exclusion filters. This means all error logs with the [requirements][2] to be fingerprinted are ingested into Error Tracking.

### Add a rule

To add a rule (inclusion filter):
1. Navigate to [Error Tracking Settings][1].
1. Click **Add New Rule**.
1. Enter a name in the **Name** field.
1. Enter a [log search query][3] in the **Define rule query** field.
1. Click **Add new rule.**
1. Optionally, reorder the rules to change their [evaluation order](#evaluation-order). Click and drag the six-dot icon on a given rule to move the rule up or down in the list.

{{< img src="logs/error_tracking/reorder_filters.png" alt="On the right side of each rule is a six-dot icon, which you can drag vertically to reorder rules." style="width:80%;">}}

### Add a nested exclusion filter to a rule

1. Expand the rule for which you want to add an exclusion filter. 
1. Click **Add Exclusion Filter**.
    {{< img src="logs/error_tracking/filters.png" alt="Expand a rule to see the Add Exclusion Filter option." style="width:70%;">}}
1. Enter a name in the **Name** field.
1. Enter a [log search query][3] in the **Define exclusion filter query** field.
1. Click **Save Exclusion Filter**.

## Rate limits

Rate limits allow you to control the number of indexed error logs included in Error Tracking per day. This cap applies to all indexed error logs that match the inclusion filter of a [rule](#rules).

After the daily cap is reached, ingestion stops until the next day. You can modify or remove the cap at any time.

### Set a rate limit

To set a rate limit:
1. Navigate to [**Logs** > **Error Tracking** > **Settings**][1].
1. Click **Rate Limits**.
1. Edit the **errors/month** field.
1. Click **Save Rate Limit**.

{{< img src="logs/error_tracking/rate_limit.png" alt="On the left side of this page, under 'Set your Rate Limit below,' is a drop-down menu where you can set your rate limit." style="width:70%;">}}

A `Rate limit applied` event is generated when the rate limit is reached. See the [Event Management documentation][4] for details on viewing and using events.

{{< img src="logs/error_tracking/rate_limit_reached_event.png" alt="Screenshot of a 'Rate limit applied' event in the Event Explorer. The event's status is INFO, the source is Error Tracking, the timestamp reads '6h ago', and the title is 'Rate limit applied.' The event is tagged 'source:error_tracking'. The message reads 'Your rate limit has been applied as more than 60000000 logs error events were sent to Error Tracking. Rate limit can be changed from the ingestion control page. " style="width:70%;">}}

## Monitoring usage

You can monitor your Error Tracking usage by setting up monitors and alerts for the `datadog.estimated_usage.error_tracking.logs.events` metric, which tracks the number of ingested error logs. 

This metric is available by default at no additional cost, and its data is retained for 15 months.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/rules
[2]: /logs/error_tracking/#setup
[3]: /logs/explorer/search_syntax/
[4]: /service_management/events/
