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

1. Connect your [source-control provider][2]. CI/CD checks support GitHub, GitLab, Bitbucket Cloud, and Azure DevOps.
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

Drift detection compares the current state of your data on the branch to a baseline and flags any deviations. Datadog uses the dbt runs from your CI pipeline as the triggers for drift detection checks. For **dbt Core**, you must send OpenLineage events from your CI job so Datadog receives these runs. See the [OpenLineage setup documentation][6]. For **dbt Cloud**, configure the CI job that runs on pull requests in the `CI Job URL` setting in the [dbt Cloud](#dbt-cloud) section.

Datadog must also be able to read the tables your CI job builds to compare them. The role you created during Snowflake setup (`DATADOG_ROLE` by default) needs `USAGE` and `SELECT` on the database your CI job materializes models to. Datadog's Snowflake integration setup includes a `grant_database_access` procedure that grants this on all current and future tables and views in every schema of a database. Run it for the database your CI job writes to:

```sql
CALL grant_database_access('["<CI_DATABASE>"]', '<ROLE_NAME>');
```

If your CI creates an ephemeral, per-pull-request database, call the procedure as part of that provisioning step so each new database is readable. See [Snowflake setup][8] for the procedure definition. Without this access, Datadog receives the CI run but cannot query the CI tables, and drift detection fails.

For **dbt Core**, drift detection also requires the pull request number to be attached to your OpenLineage events through the `sourceCodeLocation` facet. This requires `openlineage-dbt` version 1.46.0 or later and the `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false` environment variable. See [Set the environment variables][7]. If your dbt Core CI job runs inside a container, it needs additional setup. See the [Running your dbt Core CI job in a container](#running-your-dbt-core-ci-job-in-a-container) section.

##### General settings

| Setting                            | Description                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | Enable this option to run the check on draft pull or merge requests.                                                                                          |
| `Threshold`                        | The threshold for drift detection (for example, `0.1` for 10% drift). If a metric exceeds this threshold, it shows up as a warning in the check results.      |
| `Downstream Checks`                | When a dbt model changes, drift detection checks are generated for it and any downstream dbt models. This setting controls how far downstream the checks run. |

##### dbt Cloud

| Setting      | Description                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job URL` | The locator for the dbt Cloud CI job that's triggered by pull requests and materializes dbt models for CI. Datadog receives this job's run events through the dbt Cloud integration. These typically look like `https://cloud.getdbt.com/...`. |

**Bitbucket Cloud and Azure DevOps**

If your Azure DevOps repository uses dbt Cloud's native Azure DevOps integration (Enterprise plans), CI jobs start automatically. Skip this section.

Otherwise, start the CI job from your pipeline with the [dbt Cloud Administrative API][9]. First, replace these placeholders in the example for your CI provider:

| Placeholder | Value |
| ----------- | ----- |
| `<DBT_CLOUD_HOST>` | Your dbt Cloud hostname, for example `cloud.getdbt.com`. |
| `<ACCOUNT_ID>` | Your account ID from the dbt Cloud CI job URL. |
| `<CI_JOB_ID>` | Your CI job ID from the same URL. |

{{< tabs >}}
{{% tab "Bitbucket Pipelines" %}}

1. Create a dbt Cloud API token that can run jobs.
2. In Bitbucket, save the token as a secured repository variable named `DBT_API_KEY`.
3. Add the following step to `bitbucket-pipelines.yml`. If your file already contains `pipelines`, add this step under `pipelines > pull-requests > '**'`.

```yaml
pipelines:
  pull-requests:
    '**':
      - step:
          name: Trigger dbt Cloud CI job
          script:
            - |
              curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
                -H "Authorization: Token $DBT_API_KEY" \
                -H "Content-Type: application/json" \
                -d "{\"cause\": \"Bitbucket PR #$BITBUCKET_PR_ID\",
                     \"git_sha\": \"$BITBUCKET_COMMIT\",
                     \"non_native_pull_request_id\": $BITBUCKET_PR_ID,
                     \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$BITBUCKET_PR_ID\"}"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

For a repository in Azure Repos:

1. Create a dbt Cloud API token that can run jobs.
2. Save the token as a secret Azure Pipelines variable named `DBT_API_KEY`.
3. Add a [build validation branch policy][10] on the target branch to run your pipeline for pull requests.
4. Add this Bash step to your pipeline's `steps` section. The `env` block passes the secret and pull request values to the script, and the `condition` skips the step on builds that aren't for a pull request.

```yaml
steps:
  - bash: |
      curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
        -H "Authorization: Token $DBT_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"cause\": \"Azure DevOps PR #$PR_NUMBER\",
             \"git_sha\": \"$HEAD_SHA\",
             \"non_native_pull_request_id\": $PR_NUMBER,
             \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$PR_NUMBER\"}"
    displayName: Trigger dbt Cloud CI job
    condition: eq(variables['Build.Reason'], 'PullRequest')
    env:
      DBT_API_KEY: $(DBT_API_KEY)
      PR_NUMBER: $(System.PullRequest.PullRequestId)
      HEAD_SHA: $(System.PullRequest.SourceCommitId)
```

{{% /tab %}}
{{< /tabs >}}

**Notes**:
- Include both `non_native_pull_request_id` and `git_sha`, and set `git_sha` to the pull request's head commit. Datadog uses both to match the run to the pull request.
- `schema_override` keeps CI tables out of your production schemas. Including the job ID keeps two CI jobs from writing to the same schema.
- dbt Cloud doesn't drop these schemas for API-triggered runs. Clean them up on a schedule.

##### dbt Core

| Setting            | Description                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | The name of the job that's triggered by pull requests, materializes dbt models for CI, and sends OpenLineage events to Datadog.                                                                                                                   |
| `CI Job Namespace` | The OPENLINEAGE_NAMESPACE variable specified when sending OpenLineage events from the job specified above. See [Set the environment variables][7]. If you don't set this variable when sending OpenLineage events, you don't need to specify it here. |

**Bitbucket Cloud and Azure DevOps**

First, complete the setup in [Set the environment variables][7]. Then, in the step that runs `dbt-ol`, set these two variables to the values for your CI provider:

- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER`
- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION`

| CI provider | `PULL_REQUEST_NUMBER` | `VERSION` |
| ----------- | --------------------- | --------- |
| Bitbucket Pipelines | `$BITBUCKET_PR_ID` | `$BITBUCKET_COMMIT` |
| Azure Pipelines with Azure Repos | `$(System.PullRequest.PullRequestId)` | `$(System.PullRequest.SourceCommitId)` |
| Azure Pipelines with a GitHub repository | `$(System.PullRequest.PullRequestNumber)` | `$(System.PullRequest.SourceCommitId)` |

Set `VERSION` explicitly. On these providers, pull request builds check out a merge commit, so the commit detected from git is not the pull request's head commit, and the run doesn't match the pull request.

For Azure Repos, add a [build validation branch policy][10] on the target branch so the pipeline runs with pull request context.

#### Running your dbt Core CI job in a container

If your CI runner launches dbt Core with `docker run`, pass the repository URL, pull request head commit SHA, and pull request number into the container. The container does not inherit the runner's git context automatically.

Datadog needs all three values in the `sourceCodeLocation` facet to match the run to the pull request and display drift results.

For **GitHub Actions**, read the values on the runner and pass them into the container:

```shell
# On the CI runner, before launching the container:
PR_NUMBER=$(jq -r '.pull_request.number'  "$GITHUB_EVENT_PATH")
HEAD_SHA=$(jq -r '.pull_request.head.sha' "$GITHUB_EVENT_PATH")   # the pull request's head commit, not the merge commit
REPO_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}"

docker run \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__REPO_URL="$REPO_URL" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER="$PR_NUMBER" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION="$HEAD_SHA" \
  <YOUR_IMAGE> <YOUR_DBT_OL_COMMAND>
```

The workflow must run when a pull request is opened or updated:

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

For other CI providers, replace the values assigned to `PR_NUMBER`, `HEAD_SHA`, and `REPO_URL` in the example above. Run the job as a pull request pipeline (a GitLab merge request pipeline, a Bitbucket `pull-requests` pipeline, or an Azure Pipelines build started by a build validation policy). Otherwise, these values are empty.

{{< tabs >}}
{{% tab "GitLab CI" %}}

```shell
PR_NUMBER="$CI_MERGE_REQUEST_IID"
# In merged results pipelines, use $CI_MERGE_REQUEST_SOURCE_BRANCH_SHA instead.
HEAD_SHA="$CI_COMMIT_SHA"
REPO_URL="$CI_PROJECT_URL"
```

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

```shell
PR_NUMBER="$BITBUCKET_PR_ID"
HEAD_SHA="$BITBUCKET_COMMIT"
REPO_URL="https://bitbucket.org/$BITBUCKET_REPO_FULL_NAME"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

```shell
# For a GitHub repository, use $SYSTEM_PULLREQUEST_PULLREQUESTNUMBER instead.
PR_NUMBER="$SYSTEM_PULLREQUEST_PULLREQUESTID"
HEAD_SHA="$SYSTEM_PULLREQUEST_SOURCECOMMITID"
REPO_URL="$SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI"
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_observability/lineage/
[2]: /integrations/#cat-source-control
[3]: /data_observability/quality_monitoring/#supported-data-sources
[4]: /data_observability/jobs_monitoring/dbt/?tab=dbtcloud
[5]: /data_observability/jobs_monitoring/dbt/?tab=dbtcore
[6]: /data_observability/jobs_monitoring/openlineage/
[7]: /data_observability/jobs_monitoring/dbt/?tab=dbtcore#set-the-environment-variables
[8]: /data_observability/quality_monitoring/data_warehouses/snowflake/
[9]: https://docs.getdbt.com/docs/deploy/ci-jobs#trigger-a-ci-job-with-the-api-
[10]: https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies#build-validation
