---
title: Use Estimated Usage Metrics

description: Learn about estimated usage metrics generated from your Synthetic tests.
further_reading:
- link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
  tag: 'Blog'
  text: 'Best practices for creating end-to-end tests'
- link: '/synthetics/api_tests'
  tag: 'Documentation'
  text: 'Create an API Test'
- link: '/synthetics/multistep'
  tag: 'Documentation'
  text: 'Create a Multistep API Test'
- link: '/synthetics/browser_tests'
  tag: 'Documentation'
  text: 'Create a Browser Test'
---

## Overview 

Synthetic tests come with [estimated usage metrics][1] that allow you to keep track of your usage. These metrics notably enable you to:

* Understand how your usage evolves over time.
* Visualize which teams, applications, or services are contributing the most to your Synthetics usage.
* Alert on unexpected usage spikes that can impact your billing.

To visualize or alert on your Synthetics usage, use the following queries:

* [Single][2] and [Multistep API tests][3]: `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [Browser tests][4]: `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

For a higher level of refinement, scope or group these metrics by tags associated with your test, such as `team` or `application`. 

You can graph and monitor these metrics against static thresholds as well as use machine learning based algorithms like [anomaly detection][5] or [forecast][6] to ensure you do not get alerted for expected usage growth.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/billing/usage_metrics/#types-of-usage
[2]: /synthetics/api_tests
[3]: /synthetics/multistep
[4]: /synthetics/browser_tests
[5]: /monitors/types/anomaly/
[6]: /monitors/types/forecasts
