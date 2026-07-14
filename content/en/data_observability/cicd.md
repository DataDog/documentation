---
title: CI/CD
description: Automatically check pull requests that modify dbt models for downstream impact and data drift before they merge.
further_reading:
    - link: '/data_observability/'
      tag: 'Documentation'
      text: 'Data Observability Overview'
    - link: '/data_observability/data_catalog/'
      tag: 'Documentation'
      text: 'Data Catalog'
    - link: '/data_observability/lineage/'
      tag: 'Documentation'
      text: 'Lineage'
    - link: '/data_observability/quality_monitoring/'
      tag: 'Documentation'
      text: 'Quality Monitoring'
    - link: '/data_observability/jobs_monitoring/'
      tag: 'Documentation'
      text: 'Jobs Monitoring'
---

## Overview

{{< img src="data_observability/cicd/cicd-overview.png" alt="The CI/CD feature report page" style="width:100%;" >}}

Data Observability CI/CD checks run automatically when you open a pull request (PR) that modifies dbt models. The checks give you the information you need to decide whether a change is safe to merge.

Datadog posts the results as a comment on your PR, and the comment updates each time you push new changes. A full report is also available in Datadog, and you get a link to it in the PR comment.

## Check types

### Impact Lineage

Impact Lineage builds a graph of everything downstream of your changed dbt models. Use it to assess the blast radius of a change before merging. See which tables, dashboards, and other consumers depend on the models you modified, and route review to the right owners.

See [Lineage][1] for more detail on how Datadog builds and navigates lineage graphs.

### Drift Detection

Drift Detection compares the data produced by your models before and after your changes using a series of statistical checks. Use it to confirm that a model change produces the expected output, or to catch unintended side effects such as significant row-count changes, null-rate shifts, or cardinality changes in a column's values.

## Setup

### 1. Connect your source control provider and dbt project

1. Connect your [source-control provider][2]. CI/CD checks support GitHub and GitLab.
2. Connect the [supported data source account][3] where your dbt models run.
3. Connect your [dbt Cloud][4] or [dbt Core][5] project to Datadog. You can also connect your dbt project while configuring CI/CD checks.

### 2. Select your dbt project and repository

1. From the CI/CD settings, click {{< ui >}}Add CI/CD Checks{{< /ui >}}.
2. Select the dbt project you want to add checks for.
3. Select the main job for the project. This is the job with the most knowledge of your dbt schema.
4. If Datadog doesn't automatically infer the repository from your source-control provider, select it manually.

{{< img src="data_observability/cicd/cicd-connection.png" alt="The CI/CD feature creation page" style="width:100%;" >}}

#### Advanced settings

If your dbt project doesn't live at the root of your repository, you can specify the path to your dbt project in the advanced settings.

### 3. Configure checks

You can enable each check independently. Enabling all checks yields the richest reports.

#### Impact Lineage

Impact lineage generates a graph of the downstream assets that may be affected by your model changes.

##### General settings

| Setting                            | Description                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | Enable this option to run the check on draft pull or merge requests. |

#### Drift Detection

Drift detection compares the current state of your data on the branch to a baseline and flags any deviations. For Datadog to understand which models ran as part of a CI pipeline, you must send OpenLineage events from your CI job. Datadog uses these events as triggers for drift detection checks. See the [OpenLineage setup documentation][6] for instructions on how to set up OpenLineage.

##### General settings

| Setting                            | Description                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | Enable this option to run the check on draft pull or merge requests.                                                                                          |
| `Threshold`                        | The threshold for drift detection (for example, `0.1` for 10% drift). If a metric exceeds this threshold, it shows up as a warning in the check results.      |
| `Downstream Checks`                | When a dbt model changes, drift detection checks are generated for it and any downstream dbt models. This setting controls how far downstream the checks run. |

##### dbt Cloud

| Setting      | Description                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job URL` | The locator for the dbt Cloud CI job that's triggered by pull requests, materializes dbt models for CI, and sends OpenLineage events to Datadog. These typically look like `https://cloud.getdbt.com/...`. |

##### dbt Core

| Setting            | Description                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | The name of the job that's triggered by pull requests, materializes dbt models for CI, and sends OpenLineage events to Datadog.                                                                                                                   |
| `CI Job Namespace` | The OPENLINEAGE_NAMESPACE variable specified when sending OpenLineage events from the job specified above. See [Set the environment variables][7]. If you don't set this variable when sending OpenLineage events, you don't need to specify it here. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/lineage/
[2]: /integrations/#cat-source-control
[3]: /data_observability/quality_monitoring/#supported-data-sources
[4]: /data_observability/jobs_monitoring/dbt/?tab=dbtcloud
[5]: /data_observability/jobs_monitoring/dbt/?tab=dbtcore
[6]: /data_observability/jobs_monitoring/openlineage/
[7]: /data_observability/jobs_monitoring/dbt/?tab=dbtcore#set-the-environment-variables
