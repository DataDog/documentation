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

Use experiment approvals to require review before starting an experiment, increasing traffic, rolling out a winner, or canceling. Experiments that use Datadog Feature Flags follow the approval requirements on their flag and environment. The UI also calls an approval request a *suggestion*.

<div class="alert alert-info">Submitting a request or approving it without applying does not change traffic. Applying the request performs the action with the reviewed settings.</div>

## Prerequisites

- Use a standard A/B experiment with **Datadog Feature Flags**. For setup, see [Plan and Launch Experiments][4].
- [Require approvals][1] on the flag for production environments, or on the experiment's environment. If either setting is on, the experiment requires approval. Turning off one setting does not override the other. Configure flag approvals before you link an experiment, because a linked experiment prevents changes to that setting.
- Give requesters and reviewers the permissions listed in the [Permissions][5] section. Notifications do not grant access.

## Supported configurations

- Experiment approvals are not supported for canary deployments, bandits, or experiments with externally managed randomization.
- Start requests require immediate starts and fixed traffic, without progressive or paused steps, automated guardrail actions, or APM retention actions.
- Traffic increases and winner rollouts require active, fixed traffic. The flag must be enabled without a forced variant, and the experiment cannot use automated guardrail or APM retention actions. Winner requests cannot have a scheduled traffic stop. A planned analysis duration is supported.
- Traffic increases cannot change targeting or the relative variant split. Traffic decreases and arbitrary edits to running experiments are not supported.
- Cancellation also supports progressive and paused traffic configurations.

Secondary metrics that evaluate experiment health are supported. They are separate from automated guardrail actions.

## Submit a request

1. Open the experiment and choose an action:

   | Action | Where to start | Effect when applied |
   |---|---|---|
   | Start | [Create a draft][4], configure it, and click {{< ui >}}Preview Experiment Setup{{< /ui >}}. | Starts the experiment and its configured duration. |
   | Increase traffic | Edit traffic exposure in the targeting and randomization settings. | Increases exposure while preserving targeting and the relative variant split. |
   | Roll out a winner | Open {{< ui >}}Propose Decision for Approval{{< /ui >}} and choose the winning variant. | Ends the experiment and serves the winning variant using the reviewed targeting rules and traffic exposure, not necessarily all traffic. |
   | Cancel | Open {{< ui >}}Propose Decision for Approval{{< /ui >}} and select {{< ui >}}Cancel experiment due to a bug or configuration issue{{< /ui >}}. | Removes the experiment's targeting rule and marks it canceled. Other flag rules and the default variant determine which variant is served. |

2. Review the proposed settings and their effect on the flag. For a start request, also check the duration and any changes to flag enablement or variant overrides. A variant override forces a single variant.
3. Describe the change, select at least one notification recipient, and click {{< ui >}}Submit for Review{{< /ui >}}.

After you submit, the request status is **Pending**. A start request leaves the experiment in draft. Other requests leave the running experiment unchanged.

## Review and apply

1. Open the request from its notification, experiment, or flag page.
2. Review the requester, description, environment, and proposed changes.
3. Select {{< ui >}}Approve{{< /ui >}} to approve without applying, {{< ui >}}Approve & Apply{{< /ui >}} to perform both actions, or {{< ui >}}Reject{{< /ui >}} to reject the request.
4. To apply an approved request, select {{< ui >}}Apply Changes{{< /ui >}} or, for a start request, {{< ui >}}Start Experiment{{< /ui >}}.

Requesters cannot approve their own requests unless they have **Feature Flag Approvals Override**. With that permission, select {{< ui >}}Override & Apply{{< /ui >}} to proceed without another reviewer's approval. Override still requires access to the experiment and flag and cannot apply unsupported or conflicting changes.

After applying the request, check that the experiment's status and traffic settings match the reviewed settings. For a start request, the configured duration begins when you apply it.

For example, consider an experiment that exposes 20% of the traffic matching its targeting rules, split equally between two variants. A request to increase exposure to 40% leaves exposure at 20%, even after a reviewer selects {{< ui >}}Approve{{< /ui >}}. Applying the approved request raises exposure to 40% and keeps the 50/50 variant split.

### Request statuses

| Status | Meaning | Traffic changed by this request? |
|---|---|---|
| Pending | Awaiting review. | No |
| Approved | Approved but awaiting application. | No |
| Applied | The reviewed action has taken effect. | Yes, as described in the [Submit a request](#submit-a-request) section. |
| Rejected | A reviewer declined the request. | No |
| Withdrawn | A pending request was removed using {{< ui >}}Delete suggestion{{< /ui >}} on the experiment page or {{< ui >}}Discard{{< /ui >}} in the review sidebar. | No |
| Discarded | An approved request was removed using {{< ui >}}Discard{{< /ui >}} in the review sidebar before it was applied. | No |

To change a pending or approved request, select {{< ui >}}Discard{{< /ui >}} or {{< ui >}}Delete suggestion{{< /ui >}}, then submit a new request. Discarding removes the request, not the experiment. Pending and approved requests block conflicting changes until someone applies or removes them. Reviewers can also reject pending requests. You cannot discard an applied request.

## Permissions

Users need both [organization permissions][2] and access to the experiment and feature flag.

The workflow requires these baseline organization permissions, plus read access to both the experiment and the flag:

- `product_analytics_experiments_read`
- `feature_flag_config_read`
- `feature_flag_environment_config_read`
- `feature_flag_config_write`

Each action also requires the access in the following table. Configure flag access under [{{< ui >}}Settings{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}}][3] and experiment access under {{< ui >}}Experiment actions{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}}.

| Action | Additional organization permission | Experiment access | Feature flag access |
|---|---|---|---|
| Submit a request or apply an approved request | `product_analytics_experiments_write` | Editor | Contributor or Editor |
| Approve another user's request without applying, or reject it | None | Viewer | Editor |
| Approve and apply another user's request | `product_analytics_experiments_write` | Editor | Editor |
| Discard your own pending or approved request | None | Viewer | Contributor or Editor |
| Discard another user's pending or approved request | None | Viewer | Editor |
| Override and apply your own request | `product_analytics_experiments_write` and `feature_flag_approvals_override` | Editor | Contributor or Editor |

`feature_flag_approvals_override` also allows approval or rejection without flag Editor access. It does not replace the baseline permissions or the permissions needed to apply an experiment change.

Configuring approval requirements on an environment requires `feature_flag_environment_config_write`.

### Allow submission but not approval

Grant the baseline permissions, `product_analytics_experiments_write`, experiment **Editor** access, and **Contributor** access on a restricted flag. Do not grant flag **Editor** access or `feature_flag_approvals_override` through any role, team, or direct assignment.

A user with this configuration can submit requests and apply approved requests, but cannot approve or reject them. An unrestricted flag does not enforce this separation.

## Troubleshooting

- **Approval settings cannot change**: A linked experiment prevents flag-level changes. Pending requests or active experiments with approved traffic can block environment changes. Resolve the requests or finish or cancel the affected experiments through their approval workflow before retrying.
- **The request is stale or conflicts**: Refresh the page and inspect the experiment, flag, and conflicting request. Apply or discard an approved request, or reject or discard a pending request. Discard and resubmit a request whose reviewed settings are no longer valid.
- **Another user's action is not visible**: Refresh the page or reopen the request.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/concepts/approvals/
[2]: /account_management/rbac/
[3]: /feature_flags/concepts/permissions/#granular-access-on-individual-flags
[4]: /experiments/plan_and_launch_experiments/
[5]: #permissions
