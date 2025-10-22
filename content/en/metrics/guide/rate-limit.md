---
title: Events Generated from Rate Limited Metrics
private: true
further_reading:
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Custom Metrics"
- link: "/metrics/guide/custom_metrics_governance/"
  tag: "Documentation"
  text: "Best Practices for Custom Metrics Governance"
---

## Overview 

Submitting metrics to Datadog with large numbers of unique tag values on a given key can result in high [cardinality][1]. Most often, this is caused by unbounded tags.

Unbounded and high cardinality tags can impact your account's performance and stability. To protect your account, Datadog monitors metric increases and notifies you when these submissions are rate-limited.

This guide explains:
- Rate limit events
- Monitoring rate-limiting events and identifying rate-limited metrics
- Managing unbounded tags and removing metric rate limitations


## Datadog rate limit events

{{< img src="/metrics/guide/rate_limit/rate_limit_events.png" alt="Rate limit events in the Events Explorer with an example event in the detail side panel" style="width:100%;" >}}

When Datadog notices a cardinality increase, before any rate limits are applied, a warning [event][2] is created. If the metric cardinality continues to increase, a rate limit might be applied. If the metric is rate limited, a second event is generated stating a rate limit has been placed. View these events in the [Event Explorer][3]. 

<div class="alert alert-danger">Datadog does not send a notification for every subsequent rate-limiting event. As a best practice, build an Event Monitor to send alerts when metrics are rate-limited in the future.</div>

## Monitor rate limit events

An [Event Monitor][3] can be configured to send a notification for any rate limit events. 

1. Define the query as: 
   ```
   tags:metric-rate-limit source:datadog
   ```
1. Set the alert threshold as `above or equal to 1`.  
1. In the monitor message, configure recipients to be notified when the monitor triggers. 

{{< img src="/metrics/guide/rate_limit/event_monitor_config.png" alt="Event monitor configuration for a rate limit event" style="width:90%;" >}}

## What to do with unbounded tags

To remove the rate limit, you need to review the unbounded tags that are shown in the event. First, determine if all tags-values reported in the event are necessary. Next, adjust the metric submission to only use tags that are contributing valuable insights.

For more information, see the [Best Practices for Custom Metrics Governance][4] guide.

## Submit a request to remove the rate limit

<div class="alert alert-danger">Only a Datadog Admin can request a removal of a metric rate limit. If you are not an Admin, make sure to include an Admin on the support ticket so they can confirm the request.</div>

After making the changes to remove the unbounded tags, submit a request to [Datadog Support][5] to remove the rate limit. In your request, provide the following information: 
- Name of the rate-limited metric 
- Link to the rate limit event in the Event Platform
- Confirmation that a configuration change removed the unbounded tags


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/custom_metrics/?tab=countrate#effect-of-adding-tags
[2]: https://docs.datadoghq.com/service_management/events/
[3]: https://docs.datadoghq.com/monitors/types/event/
[4]: https://docs.datadoghq.com/metrics/guide/custom_metrics_governance/
[5]: https://docs.datadoghq.com/help/