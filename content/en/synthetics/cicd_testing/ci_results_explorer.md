---
title: CI Results Explorer
kind: documentation
description: Drill down into CI jobs executing Synthetic tests.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Synthetic tests into your CI/CD pipeline"
- link: "https://learn.datadoghq.com/course/view.php?id=37"
  tag: "Learning Center"
  text: "Learn how to run Synthetic tests in CI/CD pipelines"
- link: "/synthetics/search/"
  tag: "Documentation"
  text: "Learn how to search through your Synthetic objects"
  
---

## Overview

The CI Results Explorer gives you visibility into your CI jobs executing Synthetic tests. It allows you to:

* Drill down into each CI job execution to identify and troubleshoot failing test results
* Compare test results executed against various devices and browsers to pinpoint cross browser and device issues
* Keep track of the progress of your tests in CI pipelines
* Identify flaky tests that might need to be fixed

{{< img src="synthetics/ci/ci_results_explorer/ci_results_explorer.jpeg" alt="CI Results Explorer"  style="width:100%;">}}

## Exploring batches

The CI Results Explorer displays all batches of tests executed via the [Synthetic CI/CD testing integration][1]. Each batch corresponds to a call to the Datadog API (via the NPM package or directly via the API endpoint) to trigger one or several test executions . 

When clicking on a batch, a side panel containing batch CI metadata as well as batch test results shows up, allowing you to look into all test executions that were performed as part of this batch and pinpoint any test failure. You can then click on any failing test result to be redirected to the detailed test result page and look into the root cause of the issue more thoroughly.

## Search

### Facets and tags

The panel on the left side of the page lists several facets you can use to search through your batches:

**Batch** facets allow you to filter on attributes of your batches:

| Facet            | Description                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | The status of the batch: `Passed`, `Failed`, `In Progress`. |
| `Duration`       | The overall duration of the batch.                          |
| `ID`             | The id of the batch.                                        |

**Git** facets allow you to filter on Git-related attributes of your batches:

| Facet       | Description                               |
|-------------|-------------------------------------------|
| `Branch`    | The branch associated with the batch.     |
| `Commit SHA`| The commit SHA associated with the batch. |

**CI** facets allow you to filter on CI-related attributes of your batches:

| Facet          | Description                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | The CI provider associated with the batch.  |
| `Pipeline URL` | The pipeline URL associated with the batch. |

**Test result** facets allow you to filter on attributes of the test results executed as part of your batches:

| Facet            | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Execution Rule` | The execution rule associated with the test result of the batch: `Blocking`, `Non Blocking`, `Skipped`. |
| `Fast Retries`   | The number of fast retries associated with the test result of the batch.                                |
| `Location`       | The location associated with the test result of the batch.                                              |
| `Test ID`        | The test id associated with the test result of the batch.                                               |
| `Test Name`      | The test name associated with the test result of the batch.                                             |

### Create your query

The query syntax of the CI Results Explorer is the same as the one used to query tests on the **Tests** page. Learn more about how to create queries [here][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/ci/
[2]: /synthetics/search/
