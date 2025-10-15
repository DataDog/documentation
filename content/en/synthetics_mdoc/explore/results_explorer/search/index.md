---
title: Search Test Batches
description: Examine batches of executed CI jobs and troubleshoot failing test results.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Search and Manage Synthetic Tests >
  Synthetic Monitoring & Testing Results Explorer > Search Test Batches
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/explore/results_explorer/search/index.html
---

# Search Test Batches

## Overview{% #overview %}

After selecting a time frame from the dropdown menu on the top right, you can search for batches of CI jobs by clicking on the **CI Batches** event type in the [Synthetic Monitoring & Testing Results Explorer](https://app.datadoghq.com/synthetics/explorer/).

{% image
   source="https://datadog-docs.imgix.net/images/continuous_testing/explorer/results_explorer.b6219b5ef0e902371c3007ce1ae5e702.png?auto=format"
   alt="CI batches in the Synthetic Monitoring & Testing Results Explorer" /%}

You can use facets to accomplish the following actions:

- Observe the latest batches of tests running in a CI pipeline.
- Aggregate CI batches and identify test IDs to add into your CI pipeline.
- Compare the number of failing test runs by their blocking status.

## Explore facets{% #explore-facets %}

The facets panel on the left lists several facets you can use to search through your batches. To start customizing the search query, click through the list of facets starting with **Batch**.

### Batch attributes{% #batch-attributes %}

**Batch** facets allow you to filter on your batches' attributes.

| Facet            | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| `Summary Status` | The status of the batch: `Passed`, `Failed`, and `In Progress`. |
| `Duration`       | The overall duration of the batch.                              |
| `ID`             | The batch ID.                                                   |

### CI attributes{% #ci-attributes %}

**CI** facets allow you to filter on your batches' CI-related attributes.

| Facet             | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `CI Provider`     | The CI provider associated with the batch.                 |
| `Job Name`        | The job name associated with the batch.                    |
| `Job URL`         | The job URL associated with the batch.                     |
| `Pipeline ID`     | The pipeline ID associated with the batch.                 |
| `Pipeline Name`   | The pipeline or repository name associated with the batch. |
| `Pipeline Number` | The pipeline or build number associated with the batch.    |
| `Pipeline URL`    | The pipeline URL associated with the batch.                |
| `Stage Name`      | The stage name associated with the batch.                  |

### Test result attributes{% #test-result-attributes %}

**Test result** facets allow you to filter on your executed test results' attributes.

| Facet            | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `Execution Rule` | The execution rule associated with the test result of the batch: `Blocking`, `Non Blocking`, and `Skipped`. |
| `Fast Retries`   | The number of fast retries associated with the test result of the batch.                                    |
| `Location`       | The location associated with the test result of the batch.                                                  |
| `Test ID`        | The test ID associated with the test result of the batch.                                                   |
| `Test Name`      | The test name associated with the test result of the batch.                                                 |

### Git attributes{% #git-attributes %}

**Git** facets allow you to filter on your batches' Git-related attributes.

| Facet            | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `Author Email`   | The email address of the commit author.                  |
| `Branch`         | The branch associated with the batch.                    |
| `Commit SHA`     | The commit SHA associated with the batch.                |
| `Repository URL` | The URL of the Git repository associated with the batch. |
| `Tag`            | The Git tag associated with the batch.                   |

To filter on batches of CI jobs run over the past day, create a search query such as `@ci.provider.name:github` and set the time range to `1d`.

For more information about searching for CI batches, see [Search Syntax](https://docs.datadoghq.com/continuous_testing/explorer/search_syntax).

## Further reading{% #further-reading %}

- [Learn about the Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/synthetics/explore/results_explorer)
