---
title: Experiment Approvals
description: Review experiment starts, traffic increases, winner rollouts, and cancellations before they change traffic. Configure approval requirements and permissions for requesters and reviewers.
further_reading:
- link: "/experiments/plan_and_launch_experiments/"
  tag: "Documentation"
  text: "Plan and Launch Experiments"
- link: "/feature_flags/concepts/approvals/"
  tag: "Documentation"
  text: "Feature Flags Approvals"
- link: "/feature_flags/concepts/permissions/"
  tag: "Documentation"
  text: "Permissions and Access Control for Feature Flags"
---

## Overview

Experiment approvals let teams review an experiment's proposed settings before those settings affect traffic. Experiments that use a Datadog feature flag follow the [approval requirements][1] on that flag and its environment.

You can request approval to:

- Start an experiment.
- Increase an active experiment's traffic exposure.
- Roll out a winning variant and end the experiment.
- Cancel an experiment.

Submitting a request saves the proposed settings for review. **Approval alone does not change traffic.** Applying an approved request performs the action with the reviewed settings. Requesters cannot approve their own requests unless they have the **Feature Flag Approvals Override** permission.

## Configure approval requirements

Configure approvals before linking an experiment to a flag. Choose either of these scopes:

| Scope | Configuration | Effect |
|---|---|---|
| A feature flag | On the flag details page, open **Settings > Approvals** and enable **Require approval on changes to this flag for all production environments**. | Requires approval for that flag in environments marked as production. |
| An environment | Open **Feature Flags > Settings > Environments**, select the environment, enable **Mark as production environment**, then enable **Require feature flag approval**. Confirm with **Enable approvals**. | Requires approval for flag changes in that environment. |

A request requires approval if either setting applies. Turning off the flag-level setting does not remove an environment-level requirement.

Enabling approvals on a flag requires `feature_flag_config_write` and Contributor or Editor access to the flag. Disabling approvals also requires `feature_flag_approvals_override`. Changing environment settings requires `feature_flag_environment_config_write`.

The flag's approval setting cannot change while an experiment is linked to it. Pending requests and active experiments with approved traffic can also prevent environment changes. See [Troubleshooting](#troubleshooting).

## Permissions

[Organization permissions][2] and access to the individual flag and experiment both apply. Receiving a notification does not grant access to review or apply a request.

### Organization permissions

Use the following permission identifiers when configuring roles:

| Permission | Purpose |
|---|---|
| `product_analytics_experiments_read` | View experiments. |
| `feature_flag_config_read` | View feature flag configuration. |
| `feature_flag_environment_config_read` | View environment configuration. |
| `feature_flag_config_write` | Open the approval request and use the submission, review, and apply workflow. |
| `product_analytics_experiments_write` | Submit or apply an experiment action. Not required to approve without applying or to reject a request. |
| `feature_flag_environment_config_write` | Configure environment approval requirements. Not required for an ordinary requester or reviewer. |
| `feature_flag_approvals_override` | Override the normal approval requirement, including for your own request, or disable approvals on an existing flag. Does not replace the permissions required to apply the experiment action. |

### Access to the flag and experiment

The following table assumes the three read permissions above, `feature_flag_config_write`, and permission to view both resources. Configure flag access under [**Settings > Permissions**][3] and experiment access under **Experiment actions > Permissions**.

| Action | Additional organization permission | Experiment access | Feature flag access |
|---|---|---|---|
| Submit a request | `product_analytics_experiments_write` | Editor | Contributor or Editor |
| Approve another user's request without applying it, or reject it | None | Viewer | Editor |
| Apply an approved request | `product_analytics_experiments_write` | Editor | Contributor or Editor |
| Approve and apply another user's request | `product_analytics_experiments_write` | Editor | Editor |
| Discard your own pending or approved request | None | Viewer | Contributor or Editor |
| Discard another user's pending or approved request | None | Viewer | Editor |
| Override and apply your own request | `product_analytics_experiments_write` and `feature_flag_approvals_override` | Editor | Contributor or Editor |

A user with `feature_flag_approvals_override` can approve or reject without flag Editor access, but still needs the read and workflow permissions above. Applying the change also requires experiment Editor access and flag Contributor or Editor access.

### Allow a user to submit but not approve

1. Grant the three read permissions above, `feature_flag_config_write`, and `product_analytics_experiments_write` through a Datadog role.
2. Give the user **Editor** access to the experiment.
3. Restrict the feature flag's permissions and give the user **Contributor** access to that flag.
4. Check the user's other roles, teams, and direct grants. Do not grant flag **Editor** access or `feature_flag_approvals_override` through another assignment.

An unrestricted flag does not enforce this separation. A Contributor can submit requests and apply a request after an authorized reviewer approves it, but cannot approve or reject requests. Grant a reviewer **Editor** access to the flag. A reviewer who also applies experiment changes needs `product_analytics_experiments_write` and **Editor** access to the experiment.

## Request approval to start an experiment

1. [Create a draft experiment][4] with a Datadog feature flag in an environment that requires approval.
2. Configure its targeting, variants, traffic exposure, metrics, and duration. Use an immediate start with fixed traffic; see [Supported configurations](#supported-configurations).
3. Click **Preview Experiment Setup** to open **Request approval to start this experiment**.
4. Review the environment, flag, targeting, traffic percentage, and variant split.
5. In **Describe your experiment**, explain the proposed change. Select at least one notification recipient.
6. Click **Submit for review**.

The experiment stays in draft until someone applies the request. Submitting does not start the experiment or change flag traffic. The request also records any proposed flag enablement or removal of a variant override so the reviewer can assess those effects.

## Review and apply a request

1. Open the notification link or the request from the experiment or flag page. Depending on the request state, the link is labeled **View suggestion**, **Review suggestion**, or **View request**.
2. Review the description, requester, environment, targeting, traffic exposure, and variant split. For a start request, check the duration; for a winner or cancellation request, check the proposed outcome and effect on the flag's rules.
3. Choose an action:
   - **Approve** saves approval without applying the change.
   - **Approve & Apply** approves and performs the action together.
   - **Reject** rejects the request and leaves traffic unchanged. Optionally, add a comment.
4. If you approved without applying, an authorized user can return and select **Apply Changes** or, for an approved start request, **Start Experiment**.

Applying a start request begins the experiment and its configured duration at application time. Applying an increase, winner rollout, or cancellation changes the active experiment only at that point.

### Override a request

On their own pending request, a user with **Feature Flag Approvals Override** can select **Override & Apply**. This option performs the action without approval from another user. Assign override permission only to users who need this exception.

Override does not bypass access checks, unsupported configurations, stale settings, or conflicts with another request.

## Request changes to an active experiment

### Increase traffic exposure

1. Open the experiment's targeting and randomization settings and edit its traffic exposure.
2. Choose a percentage greater than the active exposure, up to 100%.
3. Review **Request approval to increase traffic exposure**, describe the change, select notification recipients, and submit it for review.

The request preserves the targeting and relative split between variants. For example, increasing exposure from 20% to 40% with a 50/50 split increases each variant's share of matching traffic from 10% to 20%. Traffic stays at 20% until the request is applied.

### Roll out a winner

1. Open **Propose Decision for Approval** on the experiment.
2. Choose the winning variant and review **Request approval to roll out [variant] and end this experiment**.
3. Review the targeting, traffic exposure, and decision summary. Select notification recipients and click **Submit for Review**.

Applying the request ends the experiment and serves the winner to the approved share of matching traffic. Choosing a winner does not necessarily send all application traffic to that variant: the reviewed targeting and exposure still apply.

### Cancel an experiment

1. Open **Propose Decision for Approval** and select **Cancel experiment due to a bug or configuration issue**.
2. Review **Request approval to cancel this experiment**, explain the reason, and select notification recipients.
3. Click **Submit for Review**.

Applying the cancellation removes that experiment's targeting rule and marks the experiment canceled. Other flag rules and the default serve determine subsequent evaluations. Submitting or approving the cancellation without applying it leaves the experiment and its traffic settings unchanged.

## Manage request states

| State | Effect |
|---|---|
| Pending review | The proposed action has not taken effect. A reviewer can approve or reject it, or an authorized user can discard it. |
| Approved, not applied | The action still has not taken effect. An authorized user can apply or discard it. |
| Applied | The experiment action has taken effect. The request cannot be discarded. |
| Rejected or discarded | The request does not change traffic. Create a request to propose a different change. |

To change a submitted proposal, discard it and submit a new request. Use **Discard** in the request sidebar or **Delete suggestion** where available. This removes the proposal, not the experiment.

A pending or approved request reserves the affected configuration against conflicting changes, including other flag requests. Open **View conflicting request** to inspect the existing proposal. Resolve it before submitting a conflicting change. After applying a start or traffic increase, the running experiment's traffic remains protected by the experiment approval workflow.

## Supported configurations

- Approvals apply to standard A/B experiments that use **Datadog Feature Flags**. Canary deployments, bandit experiments, and experiments with externally managed randomization are outside this workflow.
- Start requests support immediate starts with fixed traffic. Scheduled starts, progressive rollout steps, paused steps, and automated guardrail or APM retention actions are not supported in a start request.
- Traffic increase and winner requests require active, fixed traffic, an enabled flag without a forced variant, and no automated guardrail or APM retention actions.
- A traffic increase request must increase exposure and cannot change targeting or the relative variant split.
- Winner requests do not support traffic steps with a scheduled stop. A planned experiment analysis duration is supported.
- Cancellation requests can also cancel experiments with progressive or paused traffic configurations.
- The workflow does not support traffic decreases or arbitrary edits to a running experiment.

Secondary metrics used to evaluate experiment health are distinct from automated guardrail actions. These limits do not prevent adding secondary metrics to an experiment.

## Troubleshooting

| Situation | What to check |
|---|---|
| Cannot enable approvals on a flag | Configure approval requirements before linking an experiment. Check flag Contributor or Editor access and `feature_flag_config_write`. |
| Cannot change an environment's approval settings | Pending requests or active experiments with approved traffic can block changes. Resolve the pending requests or conclude the affected experiments through their approval workflow before retrying. A rejected settings update does not change the environment. |
| Can submit but cannot approve | Contributor access allows submission, not approval. A different user with flag Editor access must review the request, unless an authorized override user acts. |
| Can approve but cannot apply | Applying also requires `product_analytics_experiments_write`, experiment Editor access, and flag Contributor or Editor access. |
| Request is stale or conflicts with another change | Refresh the page and inspect the current experiment and flag settings. Resolve any conflicting request; discard and resubmit a proposal if its reviewed settings are no longer valid. |
| Another user acted, but the page still shows the old request state | Refresh the page or reopen the request to load its latest state. |
| Expected an approval request but the action changes traffic directly | Check that the flag's approval requirement applies to the selected production environment, or that the environment itself requires approval. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/approvals/
[2]: /account_management/rbac/
[3]: /feature_flags/concepts/permissions/#granular-access-on-individual-flags
[4]: /experiments/plan_and_launch_experiments/
