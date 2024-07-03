---
aliases:
- /ja/synthetics/explorer/search
description: Examine batches of executed CI jobs and troubleshoot failing test results.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentation
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
kind: documentation
title: Search Test Batches
---

## Overview

After selecting a time frame from the dropdown menu on the top right, you can search for batches of CI jobs by clicking on the **CI Batches** event type in the [Synthetic Monitoring & Testing Results Explorer][1].

{{< img src="continuous_testing/explorer/results_explorer.png" alt="CI batches in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}

You can use facets to accomplish the following actions:

- Observe the latest batches of tests running in a CI pipeline.
- Aggregate CI batches and identify test IDs to add into your CI pipeline.
- Compare the number of failing test runs by their blocking status.

## Explore facets

The facets panel on the left lists several facets you can use to search through your batches. To start customizing the search query, click through the list of facets starting with **Batch**.

### Batch attributes

**Batch** facets allow you to filter on your batches' attributes.

| Facet            | Description                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | The status of the batch: `Passed`, `Failed`, and `In Progress`. |
| `Duration`       | The overall duration of the batch.                          |
| `ID`             | The batch ID.                                               |

### CI attributes

**CI** facets allow you to filter on your batches' CI-related attributes.

| Facet          | Description                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | The CI provider associated with the batch.  |
| `Job Name`     | The job name associated with the batch.     |
| `Job URL`      | The job URL associated with the batch.      |
| `Pipeline ID`  | The pipeline ID associated with the batch.  |
| `Pipeline Name` | The pipeline or repository name associated with the batch. |
| `Pipeline Number` | The pipeline or build number associated with the batch. |
| `Pipeline URL` | The pipeline URL associated with the batch. |
| `Stage Name`   | The stage name associated with the batch.   |

### Test result attributes

**Test result** facets allow you to filter on your executed test results' attributes.

| Facet            | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| <code>Execution&nbsp;Rule</code> | The execution rule associated with the test result of the batch: `Blocking`, `Non Blocking`, and `Skipped`. |
| `Fast Retries`   | The number of fast retries associated with the test result of the batch.                                |
| `Location`       | The location associated with the test result of the batch.                                              |
| `Test ID`        | The test ID associated with the test result of the batch.                                               |
| `Test Name`      | The test name associated with the test result of the batch.                                             |

### Git attributes

**Git** facets allow you to filter on your batches' Git-related attributes.

| Facet       | Description                               |
|-------------|-------------------------------------------|
| `Author Email` | The email address of the commit author. |
| `Branch`    | The branch associated with the batch.     |
| `Commit SHA`| The commit SHA associated with the batch. |
| `Repository URL`| The URL of the Git repository associated with the batch. |
| `Tag`       | The Git tag associated with the batch.    |

To filter on batches of CI jobs run over the past day, create a search query such as `@ci.provider.name:github` and set the time range to `1d`.

For more information about searching for CI batches, see [Search Syntax][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ja/continuous_testing/explorer/search_syntax