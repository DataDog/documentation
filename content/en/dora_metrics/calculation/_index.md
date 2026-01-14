---
title: DORA Metrics Calculation
description: Learn how DORA metrics are calculated in Datadog.
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/dora_metrics/data_collected/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics Data Collected'
- link: '/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up data sources for DORA Metrics'
---

{{< jqmath-vanilla >}}

## Overview

This page explains how Datadog calculates each of the four key DORA metrics.

## Deployment Frequency

Deployment frequency is calculated based on the count of deployment events over a specific time frame.

## Change Lead Time

For a single Git commit, change lead time (CLT) is calculated as time from the creation of the commit to when the deployment including that commit was executed.

To calculate change lead time for a deployment, Datadog runs a git log between the deployment commit SHA and the previous deployment commit SHA to find all the commits being deployed. Then, it aggregates the related change lead time values for all these commits. Datadog doesn't store the actual content of files in your repository, only Git commit and tree objects.

### Example

{{< img src="dora_metrics/git_log_example.png" alt="An example of a detected rollback deployment" style="width:75%;" >}}

In the graph above, C is the first commit, followed by C1 and C2. A feature branch is created from C2 with commit C3, then merged back into main with merge commit C4. C4 has two parents: C2 and C3.

1. The first deployment is created from C1. Because this is the first deployment Datadog sees with Git data, there is no previous deployment to compare against, so change lead time (CLT) is not computed yet.

2. A second deployment is created from C4 and finishes at 7 pm. Datadog calculates CLT for this deployment as follows:
   * Identify the previous deployment commit: C1.
   * Run `git log C1..C4` to find all commits that are reachable from C4 but not from C1. In this example that set is C2, C3, and C4.
     Remove merge commits from this set, since they do not introduce new code on their own. That leaves C2 and C3.
   * For each remaining commit, compute CLT as `deployment_finished_at - commit_timestamp`:
     * C3: 7 pm - 4 pm = 3 hours
     * C2: 7 pm - 3 pm = 4 hours
   * For this deployment, Datadog then aggregates these values, for example:
     * Average CLT: 3.5 hours
     * Max CLT: 4 hours
     * Min CLT: 3 hours

At a higher level, DORA metrics in Datadog use the median across deployments, which is preferred because it is less sensitive to outliers and gives a more accurate and reliable view of typical performance.

### Recommendations

Using commit-level granularity provides a more accurate view of engineering performance. At the deployment level, metrics are calculated as an average of averages, which can obscure key insights. This approach treats all deployments equally, even if one contains one commit and another contains ten, misrepresenting their impact.

### Limitations

* Change lead time is not available for the first deployment of a service that includes Git information.
* Change lead time is not available if the most recent deployment of a service was more than 60 days ago.
* The Change Lead Time calculation includes a maximum of 5000 commits per deployment.
* When using "Squash" to merge pull requests:
  * For GitHub and GitLab: Metrics are emitted for the original commits.
  * For other Git providers: Metrics are emitted for the new commit added to the target branch.
* When using "Rebase", either manually or to merge pull requests:
  * For all Git providers: Metrics are calculated using the original commit timestamps, but the SHA shown reflects the newly created rebased commit.

## Change lead time stages

Datadog breaks down change lead time into the following fields, which represent the different stages from commit creation to deployment.

**Note**: These fields are measured for every commit and not per deployment or pull request. There are several edge cases depending on the way the commits were introduced to the deployment. For details, see the [limitations](#limitations) below.

| Metric                     | Description                |
|----------------------------|----------------------------|
| `Time to PR Ready`          | Time from when the commit is created until the PR is ready for review. This metric is only available for commits made before the PR is marked as ready for review. |
| `Review Time`          | Time from when the PR is marked ready for review until it receives the last approval. This metric is only available for commits made before the PR is approved. |
| `Merge Time`          | Time from the last approval until the PR is merged. |
| `Time to Deploy` | Time from PR merge to start of deployment. If a commit has no associated PR, this metric is calculated as the time from commit creation to start of deployment. |
| `Deploy Time`          | Time from start of deployment to end of deployment. This metric is not available if there is no deployment duration information. |

These stages are only computed when the source of the repository metadata is GitHub or GitLab, and for most stages, there must be a pull request (PR) associated with a commit. A commit is associated with a PR if the commit is first introduced to the target branch when merging that PR. If a commit has no associated PR, only `Time to Deploy` and `Deploy Time` fields are available.

### Limitations

* Change lead time stage breakdown metrics are only available for GitHub and GitLab.
* When using "Rebase", either manually or to merge pull requests:
  * For all Git providers: Because rebased commits are not associated with any pull request, the change lead time breakdown is unavailable for these commits.

## Change Failure Rate

The Change Failure Rate, the percentage of deployments causing a failure in production, is calculated as:

 $$\text"Change Failure Rate" = \text"Number of change failures" / (\text"Total deployments" - \text"Rollback deployments")$$

A deployment is marked as a change failure through the detection of Rollbacks and Rollforward deployments. For more information, see the [Change Failure Detection documentation][1].

### Limitations

* Rollback detection requires Git metadata (commit SHA) or version tags. Deployments without this metadata cannot be classified as rollbacks.
* Rollforward detection requires PR metadata (titles, labels, branch names) or version tags. Deployments without this metadata cannot be classified as rollforwards.

## Failed deployment recovery time

Failed deployment recovery time is calculated as the duration between the change that resulted in degraded service and its remediation, either through a rollback or rollforward deployment.

### Limitations

* For static rules, recovery time is calculated between the matched deployment and the immediately preceding deployment.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dora_metrics/change_failure_detection/
