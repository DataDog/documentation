---
title: Work Item Approvals
aliases:
- /incident_response/case_management/approvals/
further_reading:
- link: "/incident_response/work_management/automation_rules"
  tag: "Documentation"
  text: "Work item automation rules"
- link: "/incident_response/work_management"
  tag: "Documentation"
  text: "Work Management"
---

## Overview

Work item approvals let you request sign-off from one or more team members before taking action on a work item, supporting change management workflows. This feature is available on all standard and custom work item types. All approval activity is tracked in the work item's activity timeline.

## Requesting approvals

To request approval on a work item:
1. From a work item, click the **More Options** icon on the right-hand side.
1. Select **Request approval**.
1. Use the **Add reviewer** dropdown to select one or more users.
1. (Optional) Enter a message in the **Describe your request** field.
1. Click **Request**.

**Note**: The request cannot be edited after any reviewer has responded.

After requesting approval, a **Reviewers** section appears in the work item details panel. Each reviewer's name and current status (Requested, Approved, or Declined) is displayed. To modify the reviewers list, click the edit icon next to **Reviewers**. All approval events are recorded in the work item's activity timeline.

### Notifications

- Approvers are notified by email when their approval is requested.
- The requester is notified each time an approval or decline is received.

### Permissions

| Action | Required permission |
|---|---|
| Request approval on a work item | Cases Write |
| Be added as an approver on a work item | Cases Read |
| Approve or decline a work item | Cases Read |

For more information, see [Datadog Role Permissions][2].

## Automation rules

You can trigger work item automation rules based on work item approval events. For instance, you can trigger a workflow to automatically update a work item status once all approvals are received.

Available triggers include:
- First, each, or all approvals a work item receives
- First or each decline a work item receives

See [Work item automation rules][1] for setup instructions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/work_management/automation_rules
[2]: /account_management/rbac/permissions/#case-and-incident-management
