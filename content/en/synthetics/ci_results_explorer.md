---
title: CI Results Explorer
kind: documentation
description: Examine CI jobs executing Synthetic tests.
aliases: 
  - /synthetics/cicd_testing/ci_results_explorer
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Synthetic tests into your CI/CD pipeline"
- link: "https://learn.datadoghq.com/enrol/index.php?id=37"
  tag: "Learning Center"
  text: "Learn how to run Synthetic tests in CI/CD pipelines"
- link: "/synthetics/search/"
  tag: "Documentation"
  text: "Learn how to search through your Synthetic objects"
  
---

## Overview

The CI Results Explorer provides visibility into the CI jobs executing your Synthetic tests. 

{{< img src="synthetics/ci_results_explorer/ci_results_explorer.png" alt="CI Results Explorer" style="width:100%;">}}

You can:

* Investigate each CI job execution to identify and troubleshoot failing test results.
* Compare test results executed against various devices and browsers to pinpoint cross browser and device issues.
* Keep track of the progress of your tests in CI pipelines.
* Identify flaky tests to fix.

## Explore test batches

The CI Results Explorer displays batches of tests run by [Synthetics and your CI/CD provider][1]. Every batch corresponds with a call to the Datadog API (through one of your [CI/CD Integrations][1], the [datadog-ci][2] NPM package, or directly through the API endpoint) and triggers one or several test executions. 

1. Click on a batch to open a side panel containing batch CI metadata and batch test results. 
2. Explore the test executions performed as part of the batch and pinpoint test failures. 
3. Click on a failing test result to see the detailed **Test Result** page and investigate the root cause of the issue.

## Search

### Facets and tags

The panel on the left side of the page lists several facets you can use to search through your batches.

**Batch** facets allow you to filter on attributes of your batches.

| Facet            | Description                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | The status of the batch: `Passed`, `Failed`, and `In Progress`. |
| `Duration`       | The overall duration of the batch.                          |
| `ID`             | The batch ID.                                        |

**Git** facets allow you to filter on Git-related attributes of your batches.

| Facet       | Description                               |
|-------------|-------------------------------------------|
| `Branch`    | The branch associated with the batch.     |
| `Commit SHA`| The commit SHA associated with the batch. |
| `Repository URL`| The URL of the Git repository associated with the batch. |
| `Tag`       | The Git tag associated with the batch.    |

**CI** facets allow you to filter on CI-related attributes of your batches.

| Facet          | Description                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | The CI provider associated with the batch.  |
| `Job Name`      | The job name associated with the batch.     |
| `Job URL`      | The job URL associated with the batch.      |
| `Pipeline ID`  | The pipeline ID associated with the batch.  |
| `Pipeline Name` | The pipeline or repository name associated with the batch. |
| `Pipeline Number` | The pipeline or build number associated with the batch. |
| `Pipeline URL` | The pipeline URL associated with the batch. |
| `Stage Name`   | The stage name associated with the batch.   |

**Test result** facets allow you to filter on attributes of the test results executed as part of your batches.

| Facet            | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Execution Rule` | The execution rule associated with the test result of the batch: `Blocking`, `Non Blocking`, and `Skipped`. |
| `Fast Retries`   | The number of fast retries associated with the test result of the batch.                                |
| `Location`       | The location associated with the test result of the batch.                                              |
| `Test ID`        | The test ID associated with the test result of the batch.                                               |
| `Test Name`      | The test name associated with the test result of the batch.                                             |

### Create your query

To query the CI Results Explorer data, use the [same query syntax][3] as you do on the **Tests** page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/cicd_integrations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /synthetics/search/
