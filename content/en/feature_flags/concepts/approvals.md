---
title: Approvals
description: Require approvals before feature flag changes apply in production environments.
further_reading:
- link: "/feature_flags/concepts/permissions"
  tag: "Documentation"
  text: "Permissions and Access Control"
- link: "/feature_flags/concepts/environments"
  tag: "Documentation"
  text: "Environments"
---

## Overview

Approvals help you control what changes are made to feature flags and by whom. In addition to [granular access control](/feature_flags/concepts/permissions), you can require approvals for changes to certain flags or production environments before those changes take effect.

## Require approvals on an environment

1. Navigate to <a href="https://app.datadoghq.com/feature-flags/settings/environments"><strong>Feature Flags &gt; Settings &gt; Environments</strong></a>.
2. Select the environment you want to configure.
3. If it is not already a production environment, mark it as a [production environment](/feature_flags/concepts/environments/#production-environments).
4. Enable the option to require approvals.

{{< img src="getting_started/feature_flags/environment-approvals.png" alt="Edit Environment dialog with Mark as production environment and Require feature flag approval options." style="width:100%;" >}}


After you enable approvals, subsequent changes that impact application behavior in that environment require approval from another user with the **Editor** role on the flag before they can be applied. Examples include:

- Enabling or disabling a flag
- Modifying targeting rules
- Archiving a flag

## Require approvals on a feature flag

### New flag

When creating a flag, toggle **Require approval on changes to this flag for all production environments** to enable approvals for that flag in every production environment.

{{< img src="getting_started/feature_flags/configure-flag-approvals-on-creation.png" alt="Create feature flag flow showing Approvals and notifications with Require approval on changes to this flag for all production environments enabled." style="width:100%;" >}}

### Existing flag

<div class="alert alert-info">
Enabling or disabling approvals on an existing flag requires the organization permission <strong>Feature Flag Approvals Override</strong>, in addition to edit access on the flag. The same permission allows users to bypass or override the approvals workflow; see <a href="#override-approvals">Override approvals</a>.
</div>

1. Navigate to your flag's details page.
2. Open **Settings > Approvals**.
3. Toggle **Require approval on changes to this flag for all production environments**.

{{< img src="getting_started/feature_flags/flag-approvals-modal.png" alt="Approvals modal on a feature flag showing the Require approval on changes to this flag for all production environments toggle and a Save button." style="width:100%;" >}}

## Approval workflow

### Submit changes for review

When you make a change that requires approval, a **Submit Changes For Review** modal appears. The modal prompts you to:

- Enter a description of the change
- Select a notification channel (for example, Slack or Microsoft Teams) for the approval request

You can delete a pending change after creating it if you need to modify the submission.

### Approve, reject, or apply

Approvers see a diff, a description of the change, and the affected environment. From the approval request, they can:

- **Reject** the change suggestion
- **Approve** the change suggestion without applying it
- **Approve & apply** the change in one step

Approving a change suggestion does not apply it. The approved change remains visible on the flag, and you can apply it at any time after approval.

### Apply approved changes

After a change is approved, apply it when you are ready for it to take effect in the affected environment. You do not need to submit the change for review again.

### Override approvals

The **Feature Flag Approvals Override** organization permission serves two purposes:

- **Existing flags:** Required to enable approvals for a flag that already exists (in addition to [granular edit access](/feature_flags/concepts/permissions) on that flag).
- **Workflow bypass:** Allows holders to bypass the approvals workflow where that option is available, so changes can proceed without the usual review and approval steps.

Treat this permission as highly sensitive: assign it only to people who may need to change approval requirements or make exceptions to governance. Organization permissions are granted through [Datadog roles](/account_management/rbac/); see [Permissions and Access Control](/feature_flags/concepts/permissions) for related Feature Flags permissions.

## Find flags with pending approvals

On the Feature Flags search page, toggle the **Pending Approvals** filter to view flags with changes awaiting approval.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
