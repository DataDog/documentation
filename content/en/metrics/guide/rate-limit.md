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

Unbounded and high cardinality tags can impact your account’s performance and stability. To protect your account, Datadog monitors metric increases and notifies you when these submissions are rate-limited.

This guide explains:
- What rate limit events are
- How to monitor rate-limiting events so you are aware of which metrics are being rate-limited
- Actions to take to reduce cardinality to remove metric rate limitation


## Datadog rate limit events

When Datadog notices an increase in cardinality, before any rate limits are applied, an [event][2] is created as a warning. If the metric cardinality continues to increase, we may apply a rate limit. If your metric is rate limited, a second event is generated stating a rate limit has been placed. View these events in the [Event Explorer][3]. 

<div class="alert alert-warning">Datadog does not send a notification for every subsequent rate limiting event. We recommend that you build an Event Monitor to alert when your metrics are rate limited in the future.</div>

## Monitor rate limit events

An [Event Monitor][3] can be configured to send a notification for any rate limit events. 

1. Define the query as: 
   ```
   tags:metric-rate-limit source:datadog
   ```
1. Set the alert threshold as `above or equal to 1`.  
1. In the monitor message, configure recipients to be notified when the monitor triggers. 

{{< img src="/metrics/guide/rate_limit/event_monitor_config.png" alt="Event monitor configuration for a rate limit event" style="width:90%;" >}}

## Reduce metric cardinality

To remove the rate limit, you need to review the unbounded tags that are shown in the event. We recommend checking if all the tags are necessary and adjust the submission of the metric so that these tags are not present in such high cardinality.

For more information, see the [Best Practices for Custom Metrics Governance][4] guide.

## Submit a request to remove the rate limit

<div class="alert alert-warning">Only a Datadog Admin can request a removal of a metric rate limit. If you are not an Admin, make sure to include an Admin on the support ticket so they can confirm the request.</div>

After making the changes to remove the unbounded tags, submit a request to [Datadog Support][5] to remove the rate limit. In your request, provide the following information: 
- Name of the metric that was being rate limited 
- Link to the rate limit event in the Event Platform
- Confirmation a configuration change was done to remove the unbounded tags. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/custom_metrics/?tab=countrate#effect-of-adding-tags
[2]: https://docs.datadoghq.com/service_management/events/
[3]: https://docs.datadoghq.com/monitors/types/event/
[4]: https://docs.datadoghq.com/metrics/guide/custom_metrics_governance/
[5]: https://docs.datadoghq.com/help/