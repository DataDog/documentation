---
title: Understand How Synthetic Test Retries Determine Monitor Status
kind: guide
description: Learn how a Synthetic test retry affects the associated monitor status.
further_reading:
- link: /synthetics/guide/synthetic-test-monitors/
  tag: Documentation
  text: Learn about Synthetic test monitors
- link: /continuous_testing/explorer/search_runs/
  tag: Documentation
  text: Learn about Synthetic test runs
---

## Overview

To reduce alert fatigue, Synthetic tests can be retried when a test run fails. If you have configured a test to be retried on failures, this is a _fast retry_. 

With a fast retry, Datadog runs a Synthetic test multiple times before transitioning the test's monitor to alert and sending you a notification. For more information about monitors associated with your Synthetic tests, see [Use Synthetic Test Monitors][3].

{{< img src="synthetics/guide/synthetics_test_retries/fast_retries.png" alt="Failed test runs with fast retries" style="width:100%;">}}


## Group evaluations

While fast retry results are used in the local group evaluation, only the final retry is taken into account in the total group evaluation. The original run and all intermediate retries are discarded from the evaluation.

Local Group Evaluation
: Evaluation of the location status.

Total Group Evaluation
: Evaluation of the test status.

A run that is still failing after it has reached the maximum number of retries is considered final, and this final result is taken into account in the total group evaluation. 

## Retries that overlap with other test runs

In this example, a Synthetic test is scheduled to run every three minutes, and has a retry configured to a maximum of two times with a delay of two minutes.  

The evaluation only takes the final retry into account for the total group evaluation. 

When all retries fail:

{{< img src="synthetics/guide/synthetics_test_retries/diagram_1.png" alt="A test run which was retried twice and failed on all retries, evaluated as a local group and as a total group" style="width:100%;">}}

Or when a retry is successful:

{{< img src="synthetics/guide/synthetics_test_retries/diagram_2.png" alt="A test run which was retried twice and succeeded on the third retry, evaluated as a local group and as a total group" style="width:100%;">}}

**Note:** Depending on what you set for the `minFailureDuration` and `minLocationsFailed` parameters, you may see different behavior.

## Timestamps

The system populates the timestamp for a final result with the time when the test was retried, not the time the test was originally scheduled. Results are considered at the timestamp when the test was started. Due to the test's execution time, there may be a small delay before the results become available for the evaluation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/explorer/search_runs/
[2]: https://app.datadoghq.com/synthetics/explorer
[3]: /synthetics/guide/synthetic-test-monitors/