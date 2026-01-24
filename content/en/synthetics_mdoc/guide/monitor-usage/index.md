---
title: Use Estimated Usage Metrics
description: Learn about estimated usage metrics generated from your Synthetic tests.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Use
  Estimated Usage Metrics
sourceUrl: https://docs.datadoghq.com/synthetics/guide/monitor-usage/index.html
---

# Use Estimated Usage Metrics

## Overview{% #overview %}

Synthetic tests come with [estimated usage metrics](https://docs.datadoghq.com/account_management/billing/usage_metrics/#types-of-usage) that allow you to keep track of your usage. These metrics notably enable you to:

- Understand how your usage evolves over time.
- Visualize which teams, applications, or services are contributing the most to your Synthetic Monitoring usage.
- Alert on unexpected usage spikes that can impact your billing.

To visualize or alert on your Synthetic Monitoring usage, use the following queries:

- [Single](https://docs.datadoghq.com/synthetics/api_tests) and [Multistep API tests](https://docs.datadoghq.com/synthetics/multistep): `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

- [Browser tests](https://docs.datadoghq.com/synthetics/browser_tests): `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

**Note:** The pricing for browser test run (A browser test run is a simulation of a web transaction, up to 25 steps.)s is based on the number of steps. See [Pricing documentation](https://www.datadoghq.com/pricing/?product=synthetic-monitoring#synthetic-monitoring-api--browser-what-counts-as-a-browser-test-run) for more information.

For a higher level of refinement, scope or group these metrics by tags associated with your test, such as `team` or `application`.

You can graph and monitor these metrics against static thresholds as well as use machine learning based algorithms like [anomaly detection](https://docs.datadoghq.com/monitors/types/anomaly/) or [forecast](https://docs.datadoghq.com/monitors/types/forecasts) to ensure you do not get alerted for expected usage growth.

## Further Reading{% #further-reading %}

- [Best practices for creating end-to-end tests](https://www.datadoghq.com/blog/test-creation-best-practices/)
- [Create an API Test](https://docs.datadoghq.com/synthetics/api_tests)
- [Create a Multistep API Test](https://docs.datadoghq.com/synthetics/multistep)
- [Create a Browser Test](https://docs.datadoghq.com/synthetics/browser_tests)
