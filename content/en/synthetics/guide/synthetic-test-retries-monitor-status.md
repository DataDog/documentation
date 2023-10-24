---
title: Understand How Synthetic Test Retries Determine Monitor Status
kind: guide
description: Learn how a Synthetic test retry affects the associated monitor status.
further_reading:
- link: "/synthetics/guide/synthetic-test-monitors/"
  tag: "Documentation"
  text: "Learn about Synthetic test monitors"
- link: "/continuous_testing/explorer/search_runs/"
  tag: "Documentation"
  text: "Learn about Synthetic test runs"
---

## Overview

Synthetic tests can be retried when, or if, a [test run][1] fails. If you have configured a test to be retried on failures, this is a _fast retry_, and the failed test run results appear in the [Synthetic Monitoring & Continuous Testing Explorer][2].

{{< img src="synthetics/guide/synthetics_test_retries/failed_test_runs.png" alt="Failed test runs in the Synthetic Monitoring & Continuous Testing Explorer" style="width:100%;">}}

For more information about monitors associated with your Synthetic tests, see [Using Synthetic Test Monitors][3].

Fast retry results are used in the local group evaluation, but are ignored in the total group evaluation. 

Local Group Evaluation
: This is the definition for a local group eval.

Total Group Evaluation
: This is the definition for a total group eval.

A run that is still failing after it has reached the maximum number of retries is considered final, and this final result is taken into account in the total group evaluation. 

### Retries that overlap with other test runs

In this example, a Synthetic test is scheduled to run every three minutes, and has a retry configured to a maximum of two times with a delay of two minutes.  

{{< img src="synthetics/guide/synthetics_test_retries/diagram_tobereplaced.png" alt="A test run which was retried twice and failed on all retries, evaluated as a local group and as a total group" style="width:100%;">}}

The alerting evaluator only takes the final retry into account for the total group evaluation. Depending on what you set for the `minFailureDuration` and `minLocationsFailed` parameters, this example may not result in a failed evaluation for the monitor, but instead reveal itself as inconsistencies in the (test or retry?) scheduling.

### Timestamps

The timestamp for a final result is when the test was retried at, not the time the test was originally scheduled. Results are considered at the timestamp when the test was started. Due to the test's execution time and the time it takes for results to propagate, there may be a small delay before the results become available for the alerting evaluator once the final result's timestamp is used for the evaluation, from a few seconds for API tests, up to a few minutes for heavy browser tests. 

The alerting evaluator is triggered every 30 seconds for each monitor associated with a Synthetic test, and considers all the results that were available at that time, ordered by timestamp.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/explorer/search_runs/
[2]: https://app.datadoghq.com/synthetics/explorer
[3]: /synthetics/guide/synthetic-test-monitors/