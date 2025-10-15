---
title: Understand How Synthetic Test Retries Determine Monitor Status
description: Learn how a Synthetic test retry affects the associated monitor status.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Understand How Synthetic Test Retries Determine Monitor Status
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/synthetic-test-retries-monitor-status/index.html
---

# Understand How Synthetic Test Retries Determine Monitor Status

## Overview{% #overview %}

To reduce alert fatigue, Synthetic tests can be retried when a test run fails. If you have configured a test to be retried on failures, this is a *fast retry*.

With a fast retry, Datadog runs a Synthetic test multiple times before transitioning the test's monitor to alert and sending you a notification. For more information about monitors associated with your Synthetic tests, see [Use Synthetic Test Monitors](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors/).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/synthetics_test_retries/fast_retries.4d044cd77ddf4b8d542657364c2a4543.png?auto=format"
   alt="Failed test runs with fast retries" /%}

## Group evaluations{% #group-evaluations %}

While fast retry results are used in the local group evaluation, only the final retry is taken into account in the total group evaluation. The original run and all intermediate retries are discarded from the evaluation.

{% dl %}

{% dt %}
Local Group Evaluation
{% /dt %}

{% dd %}
Evaluation of the location status.
{% /dd %}

{% dt %}
Total Group Evaluation
{% /dt %}

{% dd %}
Evaluation of the test status.
{% /dd %}

{% /dl %}

A run that is still failing after it has reached the maximum number of retries is considered final, and this final result is taken into account in the total group evaluation.

## Retries that overlap with other test runs{% #retries-that-overlap-with-other-test-runs %}

In this example, a Synthetic test is scheduled to run every three minutes, and has a retry configured to a maximum of two times with a delay of two minutes.

The evaluation only takes the final retry into account for the total group evaluation.

When all retries fail:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/synthetics_test_retries/diagram_1.503da1845682ce22daecd9bd909b5464.png?auto=format"
   alt="A test run which was retried twice and failed on all retries, evaluated as a local group and as a total group" /%}

Or when a retry is successful:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/synthetics_test_retries/diagram_2.9ed2e92597ade8574e0be0361079ef52.png?auto=format"
   alt="A test run which was retried twice and succeeded on the third retry, evaluated as a local group and as a total group" /%}

**Note:** Depending on what you set for the `minFailureDuration` and `minLocationsFailed` parameters, you may see different behavior.

## Timestamps{% #timestamps %}

The system populates the timestamp for a final result with the time when the test was retried, not the time the test was originally scheduled. Results are considered at the timestamp when the test was started. Due to the test's execution time, there may be a small delay before the results become available for the evaluation.

## Further reading{% #further-reading %}

- [Learn about Synthetic test monitors](https://docs.datadoghq.com/synthetics/guide/synthetic-test-monitors/)
- [Learn about Synthetic test runs](https://docs.datadoghq.com/continuous_testing/explorer/search_runs/)
