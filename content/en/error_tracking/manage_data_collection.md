---
title: Manage Data Collection
description: Learn how to control costs in Error Tracking.
further_reading:
- link: '/monitors/types/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'
- link: '/tracing/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Backend Services'
---

## Overview

Error Tracking provides fine-grained control of which errors to ingest, helping you reduce noise and avoid unexpected costs.

You can define what data is included in Error Tracking in two ways:

- [Rules](#rules-inclusion)
- [Rate limits](#rate-limits)

You can configure both rules and rate limits on the [**Error Tracking** > **Settings**][1] page. 

## Rules

Rules allow you to select which errors are ingested into Error Tracking. They apply to both billable and non-billable errors. 

Each rule consists of:
- A scope: an inclusion filter, which contains a search query, such as `service:my-web-store`.
- Optionally, one or more nested exclusion filters to further refine the rule. For example, an exclusion filter might use the `env:staging` query to exclude staging errors.

A given rule can be toggled on or off. An error event is included if it matches a query in one of the active inclusion filters _and_ it does not match any active nested exclusion queries.

**Note:** Error events that get accepted by a rule might still be excluded from Error Tracking if they lack the [required attributes][2].

### Evaluation order

Rules are evaluated in order, with the evaluation stopping at the first matching rule. The priority of the rules and their nested filters depends on their order in the list.

### Default rules

By default, Error Tracking has an `*` inclusion filter and no exclusion filters. This means all error with the [requirements][2] to be fingerprinted are ingested into Error Tracking.

### Add a rule

To add a rule (inclusion filter):
1. Navigate to [Error Tracking Settings][1].
2. Click **Add New Rule**.
3. Choose the **Error Tracking source** the rule should be applied to.
4. Enter a search query in the **Define scope** field.
5. Optionally, **Add Exclusion** filters and a description to the rule.
6. Click **Save Changes**
7. Optionally, reorder the rules to change their [evaluation order](#evaluation-order). Click and drag the six-dot icon on a given rule to move the rule up or down in the list.

{{< img src="logs/error_tracking/reorder_filters.png" alt="On the right side of each rule is a six-dot icon, which you can drag vertically to reorder rules." style="width:80%;">}}


## Rate limits

Rate limits allow you to control the number of billable errors included in Error Tracking per day. This cap applies to all errors that match the filters of a [rule](#rules).

After the daily cap is reached, ingestion stops until the next day. You can modify or remove the cap at any time.

### Set a rate limit

To set a rate limit:
1. Navigate to [**Error Tracking** > **Settings**][1].
1. Click **Rate Limits**.
1. Edit the **errors/month** field.
1. Click **Save Rate Limit**.

{{< img src="logs/error_tracking/rate_limit.png" alt="On the left side of this page, under 'Set your Rate Limit below,' is a drop-down menu where you can set your rate limit." style="width:70%;">}}

A `Rate limit applied` event is generated when you reach the rate limit. See the [Event Management documentation][4] for details on viewing and using events.

{{< img src="logs/error_tracking/rate_limit_reached_event.png" alt="Screenshot of a 'Rate limit applied' event in the Event Explorer. The event's status is INFO, the source is Error Tracking, the timestamp reads '6h ago', and the title is 'Rate limit applied.' The event is tagged 'source:error_tracking'. The message reads 'Your rate limit has been applied as more than 60000000 logs error events were sent to Error Tracking. Rate limit can be changed from the ingestion control page. " style="width:70%;">}}

## Monitoring usage

You can monitor your Error Tracking on Logs usage by setting up monitors and alerts for the `datadog.estimated_usage.error_tracking.logs.events` metric, which tracks the number of ingested error logs. 

This metric is available by default at no additional cost, and its data is retained for 15 months.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/rules
[2]: /error_tracking/troubleshooting/?tab=java#errors-are-not-found-in-error-tracking
[4]: /service_management/events/
