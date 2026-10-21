---
title: Experiment Approvals
description: Require review before starting an experiment, increasing traffic, rolling out a winner, or canceling. Configure requester and reviewer permissions.
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

Experiment approvals let teams review experiment starts, traffic increases, winner rollouts, and cancellations before they affect traffic. Experiments that use Datadog Feature Flags follow the approval requirements on their flag and environment.

**Submitting a request or approving it without applying does not change traffic.** Applying the request performs the action with the reviewed settings.

## Set up approvals

[Require approvals][1] on the feature flag for production environments, or on the experiment's environment. Either setting requires approval; disabling one does not override the other.

Configure flag approvals before linking an experiment, because a linked experiment prevents changes to that setting. Enabling flag approvals requires `feature_flag_config_write` and flag Contributor or Editor access; disabling them also requires `feature_flag_approvals_override`. Environment settings require `feature_flag_environment_config_write`.

## Submit a request

1. Open the experiment and choose an action:

   | Action | Where to start | Effect when applied |
   |---|---|---|
   | Start | [Create a draft][4], configure it, and click **Preview Experiment Setup**. | Starts the experiment and its configured duration. |
   | Increase traffic | Edit traffic exposure in the targeting and randomization settings. | Increases exposure while preserving targeting and the relative variant split. |
   | Roll out a winner | Open **Propose Decision for Approval** and choose the winning variant. | Ends the experiment and serves the winner to the reviewed targeting and exposure, not necessarily all traffic. |
   | Cancel | Open **Propose Decision for Approval** and select **Cancel experiment due to a bug or configuration issue**. | Removes the experiment's targeting rule and marks it canceled. Other flag rules and the default variant determine subsequent evaluations. |

2. Review the proposed settings and their effect on the flag. For a start request, also check the duration, flag enablement, and any removal of a variant override.
3. Describe the change, select at least one notification recipient, and submit the request for review.

## Review and apply

1. Open the request from its notification, experiment, or flag page.
2. Review the requester, description, environment, and proposed changes.
3. Select **Approve** to approve without applying, **Approve & Apply** to perform both actions, or **Reject** to reject the request.
4. For a request approved without applying, an authorized user can select **Apply Changes**, or **Start Experiment** for a start request.

Requesters cannot approve their own requests unless they have **Feature Flag Approvals Override**. With that permission, select **Override & Apply** to proceed without another reviewer's approval. Override does not bypass resource access, unsupported configurations, or conflicts.

To change a submitted proposal, use **Discard** or **Delete suggestion**, then submit a new request. This removes the proposal, not the experiment. Pending and approved requests block conflicting changes until applied or discarded; pending requests can also be rejected. Applied requests cannot be discarded. Further changes to a running experiment's traffic still require approval.

## Permissions

[Organization permissions][2] and access to the individual experiment and flag both apply. Notifications do not grant access.

The workflow requires these organization permissions and permission to view both resources:

- `product_analytics_experiments_read`
- `feature_flag_config_read`
- `feature_flag_environment_config_read`
- `feature_flag_config_write`

The following requirements are additional to that baseline. Configure flag access under [**Settings > Permissions**][3] and experiment access under **Experiment actions > Permissions**.

| Action | Additional organization permission | Experiment access | Feature flag access |
|---|---|---|---|
| Submit a request or apply an approved request | `product_analytics_experiments_write` | Editor | Contributor or Editor |
| Approve another user's request without applying, or reject it | None | Viewer | Editor |
| Approve and apply another user's request | `product_analytics_experiments_write` | Editor | Editor |
| Discard your own pending or approved request | None | Viewer | Contributor or Editor |
| Discard another user's pending or approved request | None | Viewer | Editor |
| Override and apply your own request | `product_analytics_experiments_write` and `feature_flag_approvals_override` | Editor | Contributor or Editor |

`feature_flag_approvals_override` also allows approval or rejection without flag Editor access. It does not replace the baseline permissions or the permissions needed to apply an experiment change.

### Allow submission but not approval

Grant the baseline permissions, `product_analytics_experiments_write`, experiment **Editor** access, and **Contributor** access on a restricted flag. Do not grant flag **Editor** access or `feature_flag_approvals_override` through any role, team, or direct assignment.

This user can submit requests and apply approved requests, but cannot approve or reject them. An unrestricted flag does not enforce this separation.

## Supported configurations

- Use standard A/B experiments with **Datadog Feature Flags**. Canary deployments, bandits, and externally managed randomization are outside this workflow.
- Start requests require immediate starts and fixed traffic, without progressive or paused steps, automated guardrail actions, or APM retention actions.
- Traffic increases and winner rollouts require active, fixed traffic, an enabled flag without a forced variant, and no automated guardrail or APM retention actions. Winner requests cannot have a scheduled traffic stop; a planned analysis duration is supported.
- Traffic increases cannot change targeting or the relative variant split. Traffic decreases and arbitrary edits to running experiments are not supported.
- Cancellation also supports progressive and paused traffic configurations.

Secondary metrics used to evaluate experiment health are supported; they are distinct from automated guardrail actions.

## Troubleshooting

- **Approval settings cannot change:** A linked experiment prevents flag-level changes. Pending requests or active experiments with approved traffic can block environment changes. Resolve the requests or finish or cancel the affected experiments through their approval workflow before retrying.
- **The request is stale or conflicts:** Refresh the page and inspect the experiment, flag, and conflicting request. Apply or discard an approved request, or reject or discard a pending request. Discard and resubmit a proposal whose reviewed settings are no longer valid.
- **Another user's action is not visible:** Refresh the page or reopen the request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/approvals/
[2]: /account_management/rbac/
[3]: /feature_flags/concepts/permissions/#granular-access-on-individual-flags
[4]: /experiments/plan_and_launch_experiments/
