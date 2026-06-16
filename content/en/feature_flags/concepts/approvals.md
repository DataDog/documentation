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

Approvals help you control what changes are made to feature flags and by whom. In addition to [granular access control](/feature_flags/concepts/permissions/), you can require approvals for changes to certain flags or production environments before those changes take effect.

## Require approvals on an environment

1. Mark the environment as a [production environment](/feature_flags/concepts/environments/#production-environments).
2. Navigate to **Feature Flags > Settings > Environments**.
3. Select the environment and enable the option to require approvals.

After you enable approvals, subsequent changes that impact application behavior in that environment require approval from a user with edit access to the flag. Examples include:

- Enabling or disabling the flag
- Modifying targeting rules
- Archiving the flag

## Require approvals on a feature flag

### New flag

When creating a flag, toggle **Require approval on changes to this flag for all production environments** to enable approvals for that flag in every production environment.

### Existing flag

1. Navigate to your flag's details page.
2. Open **Settings > Approvals**.
3. Toggle **Require approval on changes to this flag for all production environments**.

## Approval workflow

### Submit changes for review

When you make a change that requires approval, a **Submit Changes For Review** modal appears. The modal prompts you to:

- Enter a description of the change
- Select a notification channel (for example Slack or Microsoft Teams) for the approval request

You can delete a pending change after creating it if you need to modify the submission.

### Approve or reject

Approvers see a diff, a description of the change, and the affected environment. They can approve or reject the change.

<div class="alert alert-warning">
Approving a change <strong>applies the change automatically</strong>.
</div>

## Find flags with pending approvals

On the Feature Flags search page, toggle the **Pending Approvals** filter to view flags with changes awaiting approval.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
