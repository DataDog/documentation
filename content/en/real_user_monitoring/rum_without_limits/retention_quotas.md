---
title: Control Costs with Retention Quotas
description: Learn how to cap the number of retained RUM sessions per day with retention quotas.
further_reading:
  - link: '/real_user_monitoring/rum_without_limits/'
    tag: Documentation
    text: RUM without Limits
  - link: '/real_user_monitoring/rum_without_limits/retention_filters'
    tag: Documentation
    text: Retain Data with Retention Filters
  - link: '/real_user_monitoring/rum_without_limits/metrics'
    tag: Documentation
    text: Analyze Performance with Metrics
  - link: '/real_user_monitoring/guide/retention_filter_best_practices/'
    tag: Guide
    text: Retention Filter Best Practices
---

{{< callout url="https://www.datadoghq.com/product-preview/rum-retention-quotas/" btn_hidden="false" header="Join the Preview">}}
Retention Quotas are in Preview.
{{< /callout >}}

## Overview

Retention quotas let you cap the number of sessions retained per day across your retention filters.

This gives you tighter cost control and prevents unexpected billing spikes caused by traffic surges or misconfigured filters.

## How quotas work

You define a daily quota as a maximum number of retained sessions. After the quota is reached, you can choose one of two behaviors:

- **Stop retention**: Datadog retains no additional sessions for the rest of the day and drops all incoming sessions until the quota resets.
- **Slow down retention**: Retention continues but at a slower rate. Datadog retains only 10% of sessions that would normally be retained.

## Setup

To set up a retention quota for an application:

1. In Datadog, navigate to **Digital Experience > Real User Monitoring > Manage Applications**.
2. Select your application.
3. Go to **Product Settings > Retention Filters**.
4. Set a daily quota threshold, a reset time, and a behavior when the quota is reached.

{{< img src="real_user_monitoring/rum_without_limits/retention-quotas-configuration.png" alt="The retention quota configuration panel showing the daily quota threshold, reset time, and behavior options." style="width:80%" >}}

<div class="alert alert-info">Quotas do not apply to sessions retained by <a href="/real_user_monitoring/rum_without_limits/retention_filters/#permanent-retention-filters">Permanent Retention Filters</a>.</div>

Configuration is done at the application level, which means you can apply different retention strategies per application. Any configuration change (quota limit, retention behavior, reset time) is instantly applied.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
