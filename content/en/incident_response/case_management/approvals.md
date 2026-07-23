---
title: Case approvals
further_reading:
- link: "/incident_response/case_management/automation_rules"
  tag: "Documentation"
  text: "Case automation rules"
- link: "/incident_response/case_management"
  tag: "Documentation"
  text: "Case Management"
---

## Overview

Case approvals let you request sign-off from one or more team members before taking action on a case, supporting change management workflows. This feature is available on all standard and custom case types. All approval activity is tracked in the case's activity timeline.

## Requesting approvals

To request approval on a case:
1. From a case, click the **More Options** icon on the right-hand side.
1. Select **Request approval**.
1. Use the **Add reviewer** dropdown to select one or more users.
1. (Optional) Enter a message in the **Describe your request** field.
1. Click **Request**.

**Note**: The request cannot be edited after any reviewer has responded.

After requesting approval, a **Reviewers** section appears in the case details panel. Each reviewer's name and current status (Requested, Approved, or Declined) is displayed. To modify the reviewers list, click the edit icon next to **Reviewers**. All approval events are recorded in the case's activity timeline.

{{< img src="incident_response/case_management/approvals/case_approvals_overview.png" alt="Case details page showing the Reviewers panel" style="width:100%;" >}}

### Notifications

- Approvers are notified by email when their approval is requested.
- The requester is notified each time an approval or decline is received.

### Permissions

| Action | Required permission |
|---|---|
| Request approval on a case | Cases Write |
| Be added as an approver on a case | Cases Read |
| Approve or decline a case | Cases Read |

For more information, see [Datadog Role Permissions][2].

## Automation rules

You can trigger case automation rules based on case approval events. For instance, you can trigger a workflow to automatically update a case status once all approvals are received.

Available triggers include:
- First, each, or all approvals a case receives
- First or each decline a case receives

See [Case automation rules][1] for setup instructions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/case_management/automation_rules
[2]: /account_management/rbac/permissions/#case-and-incident-management
