---
title: Change Failure Detection
description: "Learn how to configure change failure detection in DORA Metrics using rollbacks, revert PRs, and custom PR filters."
aliases:
- /continuous_integration/dora_metrics/change_failure_detection/
further_reading:
- link: '/dora_metrics/'
  tag: 'Documentation'
  text: 'Learn about DORA Metrics'
- link: '/dora_metrics/setup/'
  tag: 'Documentation'
  text: 'Set up data sources for DORA Metrics'
---

{{< callout url="" btn_hidden="true" header="Coming Soon!" >}}
Change Failure Detection is in Preview.
{{< /callout >}}

## Overview

Datadog Change Failure Detection automatically identifies deployments that remediate previously failed deployments. By connecting deployment data with failure events, it provides a complete view of delivery performance, helping teams balance release velocity with operational stability.

A **change failure** is a deployment that causes issues in production and requires remediation. Change failures are used to calculate the following metrics:

- Change Failure Rate
: Calculated as `Number of change failures`/(`Number of total deployments - Number of rollback deployments`)

- Failed Deployment Recovery Time
: The median duration between a failed deployment and its remediation, either through a rollback or rollforward deployment.

Change Failure Detection identifies two types of remediation deployments:
- **Rollbacks**: Automatically detected when a previously deployed version is redeployed
- **Rollforwards**: Detected through custom rules that match metadata patterns (e.g., revert PRs, hotfix labels)


## Rollback

A rollback occurs when a previously deployed version is redeployed to restore the system after a failed or faulty change.

### How classification works

A deployment is classified as a `rollback` when it deploys a version that matches a previously deployed version but differs from the immediately preceding deployment.

- If Git metadata is present, the match is based on the commit SHA.
- If Git metadata is not present, the match is based on the version tag.

When a rollback is detected, the change failure is the first deployment after the rollback target (the version you reverted to).

### Example

For the sequence V1 → V2 → V3 → V1, the rollback target is the original V1, so V2 is marked as the change failure and V1 as a rollback deployment.

{{< img src="dora_metrics/rollback_example.png" alt="An example of a detected rollback deployment" style="width:100%;" >}}

**Note**: Redeploying the same version back‑to‑back (e.g., V1 → V1) is not considered a rollback.

## Rollforward

A rollforward occurs when a new deployment is made to fix or override a failed or faulty change. Unlike rollbacks (which redeploy a previous version), rollforwards deploy new code to remediate issues. This can include revert pull requests that restore previous behavior through a new release.

Rollforwards are detected through custom rules that match deployment metadata patterns. Custom rules are configured in the [DORA Settings page][1].

## Custom rules

DORA Metrics lets you define custom rules to automatically classify rollforward deployments based on repository or release metadata. Rules can operate in two ways:
- **Linking deployments**: Match deployments through shared variable values (e.g., PR number, version)
- **Static patterns**: Match metadata patterns without variables (e.g., labels, branch names)

### Rules linked to failed deployments

Use these rules to identify rollforward deployments that should be linked to a specific earlier failed deployment. These rules use regex patterns with variables to match deployments through shared references.

You can enter regex rules that include one of these variables:
- `$pr_title` - Matches PR titles
- `$pr_number` - Matches PR numbers
- `$version` - Matches version tags

#### How classification works

When a rule matches:
1. The variable value is extracted from the current deployment.
2. The system finds the earlier deployment with the same extracted value.
3. The current deployment is marked as a rollforward linked to that earlier deployment.
4. The earlier deployment is marked as the change failure.

These rules work best when the failed deployment can be identified by a shared commit SHA, version tag, or PR reference.

#### Example - Revert PRs

Revert pull requests are a common recovery pattern. For example, a PR titled `Revert "Add feature X"` references the original PR.

```
Revert "$pr_title"
```

When a PR title matches this pattern:
- The system extracts the original PR title from the revert PR (the value of `$pr_title`)
- It finds the earlier deployment that included that original PR
- The earlier deployment is marked as the change failure
- The current deployment (with the revert) is marked as the rollforward

**Note**: If the original PR isn't found in any prior deployment, or if both the original PR and its revert are in the same deployment, no classification is applied.

### Static rules

Static rules classify rollforward deployments based on metadata patterns without using variables. These rules match broad indicators of remediation.

You can enter regex rules that match:
- PR labels (e.g., `.*hotfix.*`)
- PR title patterns (e.g., `.*rollforward.*`)
- Branch name patterns (e.g., `recovery/.*`)
- Version tag patterns (e.g., `.*_hotfix`)

#### How classification works

When a static rule matches:
1. The current deployment is marked as a rollforward.
2. The immediately preceding deployment is marked as the change failure.

Use static rules for broad remediation indicators like hotfix labels, branch prefixes, or version tag conventions.


### Default rules

Datadog provides default rules that are automatically enabled:

- **Revert PRs**: PR titles following revert naming conventions (e.g., "Revert" referencing a prior PR) are treated as rollforwards. The earlier deployment containing the original change is marked as the change failure, using the variable-based linking rules described above.
- **Hotfix and incident indicators**: PR labels, titles, or branch names containing “hotfix” or “incident” are treated as rollforwards, with the preceding deployment marked as the change failure.

These default rules are fully configurable in the [DORA Settings][1] page, so teams can adapt the patterns (for example, naming conventions or labels) to match their own workflows.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
