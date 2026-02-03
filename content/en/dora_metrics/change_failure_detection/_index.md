---
title: Change Failure Detection
description: "Learn how to configure change failure detection in DORA Metrics using rollbacks, revert PRs, and custom PR filters."
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up data sources for DORA Metrics'
---

{{< jqmath-vanilla >}}

## Overview

Datadog Change Failure Detection automatically identifies deployments that remediate previously failed deployments. By connecting deployment data with failure events, it provides a complete view of delivery performance, helping teams balance release velocity with operational stability.

A **change failure** is a deployment that causes issues in production and requires remediation. Change failures are used to calculate the following metrics:

- [Change Failure Rate][2]
: The percentage of deployments causing a failure in production, calculated as the following:

 $$\text"Change Failure Rate" = \text"Number of change failures" / \text"Number of total deployments"$$

- [Failed Deployment Recovery Time][3]
: The median duration between a failed deployment and its remediation, either through a rollback or rollforward deployment.

Change Failure Detection identifies two types of remediation deployments:
- **Rollbacks**: Automatically detected when a previously deployed version is redeployed
- **Rollforwards**: Detected through custom rules that match metadata patterns (such as revert PRs and hotfix labels)


## Rollbacks

A rollback occurs when a previously deployed version is redeployed to restore the system after a failed or faulty change.

### How rollback classification works

A deployment is classified as a rollback when it deploys a version that matches a previously deployed version but differs from the immediately preceding deployment.

- If Git metadata is present, the match is based on the commit SHA.
- If Git metadata is not present, the match is based on the version tag.

When a rollback is detected, the change failure is the first deployment after the rollback target (the version you reverted to).

### Example: Rollback detection

For the sequence V1 → V2 → V3 → V1, the rollback target is the original V1, so V2 is marked as the change failure and V1 as a rollback deployment.

{{< img src="dora_metrics/rollback_example.png" alt="An example of a detected rollback deployment" style="width:100%;" >}}

**Note**: Redeploying the same version back‑to‑back (for example, V1 → V1) is not considered a rollback.

## Rollforwards

A rollforward occurs when a new deployment is made to fix or override a failed or faulty change. Unlike rollbacks (which redeploy a previous version), rollforwards deploy new code to remediate issues. This can include revert pull requests that restore previous behavior through a new release.

Rollforwards are detected through custom rules that match deployment metadata patterns. Custom rules are configured in the [DORA Settings page][1].

## Custom rules

You can define custom rules to automatically classify rollforward deployments based on repository or release metadata. Rules can operate in two ways:
- **Linking deployments**: Match deployments through shared variable values (for example, PR number or version)
- **Static patterns**: Match metadata patterns without variables (for example, labels or branch names)

### Rules linked to failed deployments

Use these rules to identify rollforward deployments that should be linked to a specific earlier failed deployment. These rules use regular expression (regex) patterns with variables to match deployments through shared references.

You can enter regex rules that include one of these variables:
| Variable      | Description            |
|---------------|-----------------------|
| `$pr_title`   | Matches PR titles     |
| `$pr_number`  | Matches PR numbers    |
| `$version`    | Matches version tags  |

#### How variable-based classification works

When a rule matches a deployment, the following actions occur:
1. The variable value is extracted from the current deployment.
2. The system finds the earlier deployment with the same extracted value.
3. The current deployment is marked as a rollforward linked to that earlier deployment.
4. The earlier deployment is marked as the change failure.

These rules work best when the failed deployment can be identified by a shared commit SHA, version tag, or PR reference.

#### Example: Revert pull requests

Revert pull requests are a common recovery pattern. For example, a PR titled `Revert "Add feature X"` references the original PR.

```
Revert "$pr_title"
```

When a PR title matches this pattern, the following actions occur:
1. The system extracts the original PR title from the revert PR (the value of `$pr_title`).
2. It finds the earlier deployment that includes that original PR title.
3. The current deployment (with the revert) is marked as the rollforward.
4. The earlier deployment is marked as the change failure.

**Note**: If the original PR isn't found in any prior deployment, or if both the original PR and its revert are in the same deployment, no classification is applied.

### Static rules

Static rules classify rollforward deployments based on metadata patterns without using variables. These rules match broad indicators of remediation.

You can define regex rules that match specific types of metadata. The following table shows some example patterns you can use, but you may adjust them to fit your processes:

| Metadata Type    | Example Regex Pattern   | Description                         |
|------------------|------------------------|-------------------------------------|
| **PR title**         | `.*rollforward.*`      | Matches PR titles containing `rollforward`   |
| **PR label**         | `.*hotfix.*`           | Matches PR labels containing `hotfix`        |
| **PR branch name**      | `recovery/.*`          | Matches branch names starting with `recovery/`|
| **Commit&nbsp;message**      | `^Revert ".*"$ `          | Matches commit messages starting with `Revert` and ending with `"`|
| **Version tag**      | `.*_hotfix`            | Matches version tags ending with `_hotfix`   |

#### How static rule classification works

When a static rule matches a deployment, the following actions occur:
1. The current deployment is marked as a rollforward.
2. The immediately preceding deployment is marked as the change failure.

Use static rules for broad remediation indicators like hotfix labels, branch prefixes, or version tag conventions.


### Default rules

Datadog provides default rules that are automatically enabled:

- **Revert PRs**: PR titles following revert naming conventions (for example, "Revert" referencing a prior PR) are treated as rollforwards. The earlier deployment containing the original change is marked as the change failure, using the variable-based linking rules described above.
- **Hotfix indicators**: PR labels, titles, or branch names containing "hotfix" are treated as rollforwards, with the preceding deployment marked as the change failure.

These default rules are fully configurable in the [DORA metrics settings][1] page. They are intended as opinionated starting points that interpret common signals as likely rollforward activity. You should adapt the patterns (such as naming conventions, labels, or version tags) as needed to reflect your own workflows and improve accuracy over time.

## Update deployment status

While automatic detection and custom rules handle most cases, you can still manually update a deployment's status to mark it as a change failure or mark a change failure as stable.

### When to update deployment status

Consider manually updating a deployment's status in the following scenarios:
- A deployment caused production issues but was not detected as a change failure.
- A deployment was incorrectly classified as a change failure (false positive).
- You need to immediately reflect the correct status for reporting purposes.

### Update status through the API

Use the [DORA Metrics API][4] to update a deployment's status programmatically. The following example marks a deployment as a change failure and links it to a rollback remediation:

```shell
curl -X PATCH "https://api.datadoghq.com/api/v2/dora/deployment/{deployment_id}" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-d @- << EOF
{
  "data": {
    "attributes": {
      "change_failure": true,
      "remediation": {
        "id": "eG42zNIkVjM",
        "type": "rollback"
      }
    },
    "id": "z_RwVLi7v4Y",
    "type": "dora_deployment_patch_request"
  }
}
EOF
```

The `remediation` field is optional, but required to calculate failed deployment recovery time.

### Update status through the UI

To update a deployment's status from the Datadog UI:

1. Navigate to **Software Delivery** > **DORA Metrics** and click [**View Deployments**][5].
2. Click on a deployment to open the deployment details panel.
3. In the deployment details panel, select the **Deployment status** from the dropdown to mark the deployment as failed or stable.

{{< img src="dora_metrics/deployment_status_update.mp4" alt="Updating a deployment's change failure status from the Datadog UI" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /dora_metrics/calculation/#change-failure-rate
[3]: /dora_metrics/calculation/#failed-deployment-recovery-time
[4]: /api/latest/dora-metrics/#patch-a-deployment-event
[5]: https://app.datadoghq.com/ci/dora?detail=deployments
