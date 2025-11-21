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

Failed deployments are used to calculate the following metrics:

- Change Failure Rate
: Calculated as `Number of change failures`/(`Number of total deployments - Number of rollback deployments`)

- Failed Deployment Recovery Time
: The median duration between a failed deployment and its remediation, either through a rollback or rollforward deployment.

Change Failure Detection identifies rollbacks and rollforward deployments, including those implemented through revert PRs or detected via PR filters, in line with the DORA definition of remediation.


## Rollback

A rollback occurs when a previously deployed version is redeployed to restore the system after a failed or faulty change.

#### How classification works

A deployment is classified as a `rollback` when it deploys a version that matches a previously deployed version but differs from the immediately preceding deployment.

- If Git metadata is present, the match is based on the commit SHA.
- If Git metadata is not present, the match is based on the version tag.

When a rollback is detected, the change failure is the first deployment after the rollback target (the version you reverted to).

#### Example

For the sequence V1 → V2 → V3 → V1, the rollback target is the original V1, so V2 is marked as the change failure and V1 as a rollback deployment.

{{< img src="dora_metrics/rollback_example.png" alt="An example of a detected rollback deployment" style="width:100%;" >}}

**Note**: Redeploying the same version back‑to‑back (e.g., V1 → V1) is not considered a rollback.

## Rollforward

A rollforward occurs when a new deployment is made to fix or override a failed or faulty change, which can include a revert pull request that restores the previous behavior through a new release.

### Revert PRs

Datadog detects when a deployment includes a pull request that reverts a previous change, helping you identify recovery actions made through Git.

#### How classification works

A deployment is treated as a rollforward when it includes a PR titled "Revert PRx" (where PRx is the title of the original PR).

- If PRx shipped in an earlier deployment V1 (V1 ≠ current deployment):
  - Deployment V1 is marked as a change failure.
  - Current deployment (with "Revert PRx") is marked as a rollforward.
- If PRx isn't found in any prior deployment, or PRx and its revert are shipped together in the same deployment: no classification is applied.

#### Example

Deployment V1 includes PR_123 and later, deployment V3 includes "Revert PR_123". V1 is marked as the change failure and V3 as a roll-forward deployment.

### Custom filters

DORA Metrics lets you define custom filters to automatically classify recovery deployments based on repository or release metadata.

#### What can you filter on

- PR labels (e.g., `hotfix`)
- PR title patterns (e.g. `*rollforward*`)
- Feature branch name patterns (e.g. `recovery/*`)
- Deployment version tag patterns (e.g. `{failed_version_tag}_*`)

#### How classification works

- Any deployment that matches a defined filter is marked as a roll‑forward.
- The immediately previous deployment (the one just before the roll‑forward) is marked as the change failure.
- For deployment version tag patterns: if the new version contains a version tag that has been deployed previously, it is marked as a rollforward and the previously deployed version is marked as failed.

#### Default filters

By default, any PR label, title, or branch name containing `hotfix` matches and is treated as a roll‑forward (with the preceding deployment marked as the change failure).

#### Example

Deployment V2 includes a PR labeled `hotfix`. V1 is marked as a roll‑forward, and the previous deployment to V1 is marked as a change failure.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

