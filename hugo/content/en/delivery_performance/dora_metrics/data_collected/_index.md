---
title: DORA Metrics Data Collected
description: "Learn about DORA Metrics events, fields, tags, and change lead time stages for deployment frequency, change lead time, and change failure analysis."
aliases:
- /dora_metrics/data_collected/
further_reading:
- link: '/delivery_performance/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/delivery_performance/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up data sources for DORA Metrics'
- link: '/metrics/'
  tag: 'Documentation'
  text: 'Learn about metrics'
- link: '/getting_started/tagging/'
  tag: 'Documentation'
  text: 'Getting started with Tags'
---

## Overview

DORA Metrics generates events that have associated fields and tags.

| Event Type | Description |
| :--- | :--- |
|Deployment | A single code deployment uniquely identified by env, service, and version tags.<br><br>Deployments can be [marked as failed][17] and are used to compute deployment frequency, change failure rate, and failed deployment recovery time.
|Pull Request | A pull request included in a deployment. Contains metadata such as author, reviewers, labels, and time spent drafting, reviewing, and merging. Commits are nested within their associated pull request.<br><br>Pull requests are used to analyze code review workflows and PR-level cycle time.
|Commit | An event generated for each individual commit included in a deployment. Contains metadata and is automatically linked to the corresponding deployment. Commits are nested within their associated pull request.<br><br>Commits are used to compute change lead time.

**Note**: DORA Metrics events have a 2-year retention period.

### Default tags

All events contain the following tags if any are available:

- `service`
- `team`
- `env`
- `version`
- `source`
- `repository_id`

For more information about using tags, see [Getting Started with Tags][6].

### Custom tags

Deployment events can be enriched with custom tags to filter DORA Metrics. There are two potential sources for these tags:

- Catalog: If a deployment event is associated with services in Catalog, it is automatically enriched with the `language` tag and the [custom tags defined in the Service Definitions][13].
- DORA Metrics API: Up to 100 user-provided custom tags can be added to deployment events in the [API][7].

For more information about using custom tags in DORA Metrics, see [DORA Metrics Overview][16].

## Event-specific fields

### Deployment fields

| Field                      | Description                |
|----------------------------|----------------------------|
| `Duration` | Duration of the deployment. |
| `Avg Change Lead Time`      | The average duration of [change lead time](#commit-fields) of all commits.  |
| `Avg Time to PR Ready`          | The average duration of [time to PR ready](#commit-fields) of all commits. |
| `Avg Review Time`       | The average duration of [review time](#commit-fields) of all commits. |
| `Avg Merge Time`       | The average duration of [merge time](#commit-fields) of all commits. |
| `Avg Time to Deploy`       | The average duration of [time to deploy](#commit-fields) of all commits. |
| `Number of Commits`        | Count of all commits included in a deployment. |
| `Deployment Type` | Type of deployment (`standard`, `rollback`, or `rollforward`). |
| `Change Failure` | Boolean indicating whether a deployment is marked as a change failure. |
| `Recovery Time` | Duration in seconds between a failed deployment's `finished_at` and its remediation's `finished_at`. Only available for deployments marked as change failures. |
| `Remediation Type` | The type of remediation applied (`rollback` or `rollforward`). Only available for deployments marked as change failures. |

### Pull request fields

| Field  | Description                |
|------------|----------------------------|
| `PR Cycle Time`       | Total duration from the first commit to merge. |
| `Time to PR Ready`       | Duration from the first commit to when the PR is marked as ready for review. |
| `Review Time`       | Duration from PR being marked ready for review to approval. |
| `Merge Time`       | Duration from PR approval to merging. |
| `Time to Deploy`       | Duration from merging to the start of deployment. |
| `Deploy Time`       | Duration from start of deployment to end of deployment. |
| `Number of Commits`       | Count of commits included in the pull request. |
| `Number of Reviewers`       | Count of reviewers who reviewed the pull request. |
| `Number of Files Changed` | Count of files changed in the pull request. Only available for GitHub. |
| `Number of Lines Added` | Count of lines added in the pull request. Only available for GitHub. |
| `Number of Lines Deleted` | Count of lines deleted in the pull request. Only available for GitHub. |
| `Total Number of Lines Changed` | Total count of lines added and deleted in the pull request. Only available for GitHub. |
| `Time to First Human Review` | Duration until the pull request receives its first review from a human. Only available for GitHub. |
| `Number of Comments` | Count of comments on the pull request. Only available for GitHub. |
| `Number of Human Comments` | Count of comments on the pull request from humans. Only available for GitHub. |
| `Fully Automated` | Boolean indicating whether the pull request was created and merged without human involvement. |
| `Creator Bot Type` | Type of bot that created the pull request. |
| `Creator Bot Name` | Name of the bot that created the pull request. |
| `Time CI Failing` | Total duration that CI remained in a failing state across commits in the pull request. Requires CI Visibility. |
| `Test Session Duration` | Total duration of test sessions for the pull request's head or merge commit. Requires Test Optimization. |
| `Test Session Duration After Approval` | Total duration of test sessions for the pull request's head or merge commit after the pull request was approved. Requires Test Optimization. |
| `Time to Pass` | Duration from the first CI attempt until the first successful pipeline execution for the pull request's head or merge commit. Requires CI Visibility. |
| `Time to Pass After Approval` | Duration from the first CI attempt after pull request approval until the first successful pipeline execution for the pull request's head or merge commit. Requires CI Visibility. |
| `Patch Coverage` | Percentage of new or modified lines in the pull request's head or merge commit that are covered by tests. Requires Code Coverage. |


### Commit fields

| Field  | Description                |
|------------|----------------------------|
| `Change Lead Time`       | Duration it takes for a commit to get into production. |
| `Time to PR Ready`       | Duration from commit creation to when the PR is marked as ready for review. |
| `Review Time`       | Duration from PR being marked ready for review to approval. |
| `Merge Time`       | Duration from PR approval to merging. |
| `Time to Deploy`       | Duration from merging to start of deployment. |
| `Deploy Time`       | Duration from start of deployment to end of deployment. |
| `Has Failed Jobs` | Boolean indicating whether any CI job execution failed for the commit, including failures that passed after a retry. Requires CI Visibility. |
| `Has Failed Tests` | Boolean indicating whether any test execution failed because of a non-flaky test in the commit. Requires Test Optimization. |
| `Has New Flaky Tests` | Boolean indicating whether any new flaky tests were detected in the commit's test sessions. Requires Test Optimization. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /events/explorer/
[2]: /api/latest/metrics/#query-timeseries-points
[3]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /getting_started/tagging/
[7]: /api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/metrics/
[10]: /delivery_performance/dora_metrics/setup/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /delivery_performance/dora_metrics/setup/#limitations
[13]: https://www.datadoghq.com/blog/service-catalog-setup/
[16]: /delivery_performance/dora_metrics/
[17]: /delivery_performance/dora_metrics/change_failure_detection/
