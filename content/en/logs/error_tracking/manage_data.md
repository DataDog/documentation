---
title: Error Tracking Managing Data
kind: documentation
is_beta: true
private: true
description: Learn how to control costs in Error Tracking.
further_reading:
- link: '/monitors/types/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking Monitors'
- link: '/tracing/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Backend Services'
---

{{< beta-callout url="#" btn_hidden="true" >}}
Error Tracking Logs is beta. Billing begins in March 2024. The pricing plan starts at $0.25 per 1k error events, per month.
{{< /beta-callout >}}

## Overview

Error Tracking provides fine-grained control so you can choose what data and how much data to include in Error Tracking to avoid unexpected costs. These controls are located on the **Logs** > **Error Tracking** > [**Settings**][1] page. 

There are two ways that you can control what data is included in Error Tracking:
1. [Rules](#rules-inclusion-and-exclusion-filters)
2. [Rate Limits](#rate-limit)

## Rules: Inclusion and Exclusion Filters
Rules allow you to select which errors to be included in Error Tracking. An error event is included if it matches one of the inclusion filters and it does not match any of its nested exclusion filters.

By default, Error Tracking has an `*` inclusion filter and no exclusion filters. This means all error logs with the [requirements][2] to be fingerprinted are ingested into Error Tracking.

Rules are evaluated in order, with the evaluation stopping at the first matching rule. Error events that get accepted by a rule might still be excluded from Error Tracking if they lack the [required attributes][2].

To add a rule (inclusion filter):
1. Navigate to [Error Tracking Settings][1].
3. Click **Add Rule**.

To add a nested exclusion filter:
1. Navigate to [Error Tracking Settings][1].
2. Expand the rule for which you want to add an exclusion filter. 
3. Click **Add an Exclusion Filter**.

{{< img src="logs/error_tracking/filters.png" alt="inclusion and exclusion filter set up" style="width:70%;">}}

Inclusion and exclusion filters are defined by a query, and an active/inactive toggle:

* Default **query** is `*` for inclusion filters, which means all indexed error logs with required attributes are included. Narrow down inclusion filter by creating nested exclusion filters to only include a subset of error events [with a log query][3].
* Default **toggle** is active, meaning all indexed errors logs are actually included according to the inclusion filter configuration. Toggle this to inactive to ignore this filter.

**Note**: Rules for Error Tracking are only evaluated with the first **active** inclusion and corresponding nested exclusion filter they match. The priority of the rules and their nested filters depends on their order in the list.

Use drag and drop on the list of rules to reorder them according to your use case.

{{< img src="logs/error_tracking/reorder_filters.png" alt="reorder filters" style="width:80%;">}}


## Rate Limits
Rate limits allow you to set hard-limit to the number of indexed error logs included in Error Tracking per day. This cap is applied across all indexed error logs that should have been included in Error Tracking (such as after inclusion and exclusion filters are applied).

After the daily cap is reached, additional error logs are excluded from Error Tracking.

You can modify or remove the cap at any given time - simply set a rate limit in number of errors per month

{{< img src="logs/error_tracking/rate_limit.png" alt="rate limit setting" style="width:70%;">}}

An event is generated when the rate limit is reached:

{{< img src="logs/error_tracking/rate_limit_reached_event.png" alt="rate limit notification" style="width:70%;">}}

## Estimated Usage Metric
By default, [Error Tracking estimated usage metrics][4] are available to track the number of ingested error logs. These metrics are free and kept for 15 months:
- `datadog.estimated_usage.error_tracking.logs.events`

You can monitor your Error Tracking usage by setting up monitors and alerts.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error-tracking/settings/rules
[2]: /logs/error_tracking/#setup
[3]: /logs/explorer/search_syntax/
[4]: /account_management/billing/usage_metrics/
