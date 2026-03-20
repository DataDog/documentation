---
title: Integrate Case Management with Error Tracking
is_beta: false
private: false
further_reading:
  - link: '/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Error Tracking Explorer'
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Issue States in Error Tracking'
  - link: '/service_management/case_management/'
    tag: 'Documentation'
    text: 'Case Management'
---

## Overview

Integrate Case Management with Error Tracking to create and link Case Management cases to Error Tracking issues. With Case Management for Error Tracking, you can:

- Create Case Management cases directly from the Error Tracking issue panel
- Group multiple Error Tracking issues into a single case
- Automatically route issues to specific Case Management projects using automation rules
- Automatically create Case Management cases for Error Tracking issues matching specific criteria.

## Setup

You need the following [permissions][1] to use the Case Management integration for Error Tracking:

- Error Tracking Read
- Error Tracking Issue Write
- Cases Read
- Cases Write

## Create a case from an issue

You can create a Case Management case directly from the issue panel to group investigation efforts on that issue:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the **Actions** dropdown, click **Add Case**.
4. Choose the Case Management project in which the case should be created. By default, the case will automatically be created in the Error Tracking project.
5. Click **Create** to create the case.

{{< img src="error_tracking/create-case.png" alt="Create a Case Management case from an Error Tracking issue" style="width:100%;" >}}

After it is created, the case is linked to the Error Tracking issue. The case link then appears in the issue panel, and the issue status automatically changes to **REVIEWED**.

When an issue is linked to a case, their state, assignee, and comments are two-way synced.
See [State dual-way sync between issues and cases](#state-dual-way-sync-between-issues-and-cases) for more information on how the issue state and case status are synced.

## Group multiple issues into a single case

You can attach multiple Error Tracking issues to a single Case Management case to group correlated issues into a single unit of work:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the **Actions** dropdown, click **Add Case**.
4. In the **Add to Existing Case** tab, select the case in which you want to group your issues.
5. Click **Attach to Case** to attach the issue to the case.
6. Repeat these actions on all the issues you want to add to this group.

{{< img src="error_tracking/add-to-existing-case.png" alt="Add an Error Tracking issue to an existing case" >}}

All linked Error Tracking issues appear in the case view, providing a consolidated view of related errors.

{{< img src="error_tracking/group-issues-into-a-case.png" alt="Link multiple Error Tracking issues to a single case" >}}

When several issues are linked to a case, their state, assignee and comments are two-way synced. See [State dual-way sync between issues and cases](#state-dual-way-sync-between-issues-and-cases) for more information on how the issues states and case status are synced.

The relationship between cases and issues is a 1:N relationship. A single case can be linked to multiple issues, but an issue can only be linked to one single case.

## State dual-way sync between issues and cases

### Single Error Tracking issue linked to single Case Management case

When a single Error Tracking issue is linked to a Case Management case, their states are two-way synced. The issue state is mapped to
the default status of the corresponding case status group:

| Error Tracking Issue State | Case Management Status Group |
|----------------------------|------------------------------|
| FOR REVIEW                 | Open                         |
| REVIEWED                   | In Progress                  |
| RESOLVED                   | Closed                       |
| IGNORED                    | Closed                       |
| EXCLUDED                   | Closed                       |

### Multiple Error Tracking issues linked to single Case Management case

When multiple Error Tracking issues are linked to the same Case Management case, there is also a sync between their states, depending on the situation:
- If you update the status of the case, all linked issues are updated following the state mapping described in the previous paragraph.
- If you update the state of an issue, the resulting state of other linked issues and the case follows these rules:

| State before                                                       | Action                                                 | Resulting state                                                                                 |
|--------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| The case is `CLOSED` and all issues are `RESOLVED`.                | You update one issue to `FOR REVIEW`.                  | The case is `OPEN` but all other issues remain `RESOLVED`.                                      |
| The case is `OPEN` and all issues are `FOR REVIEW`.                | You update one issue to `RESOLVED`.                    | The case is `OPEN`, one issue is `RESOLVED`, all other issues remain `FOR REVIEW`.              |
| The case is `CLOSED` and you have one unlinked issue `FOR REVIEW`. | You link the `FOR REVIEW` issue to your `CLOSED` case. | The case is `CLOSED` and all issues are `RESOLVED` (including the newly linked issue).          |
| The case is `OPEN` and you have one unlinked `RESOLVED` issue.     | You link the `RESOLVED` issue to your `OPEN` case.     | The case is `OPEN` and all issues are `FOR REVIEW` except the new one which remains `RESOLVED`. |

## Automation rules

You can configure rules to match specific issues to Case Management projects. For example, when an issue matches a rule, any case created manually or automatically for that issue defaults into the project specified by that rule.

### Setup

To create automation rules for your Error Tracking issues, you need one (1) of the following [permissions][1] :
- Error Tracking Write
- Error Tracking Settings Write

### Create an automation rule

To create an automation rule for Case Management:

1. Navigate to [Error Tracking Settings][3], in the **Ticketing & Automation** section.
2. Click **New Rule**.
3. Configure the rule:
    - **Match Criteria**: Define conditions that issues must meet to trigger the rule
    - **Project**: Select the destination Case Management project when cases are created from issues that match the rule
    - **Auto-create**: Optionally enable automatic case creation when issues match
4. Click **Save Rule**.

{{< img src="error_tracking/create-case-management-automation-rule.png" alt="Create a Case Management automation rule" style="width:100%;" >}}

### Match criteria

Configure rules based on the following attributes:

- **Service**: Match issues from specific services (for example, `service:web-store`)
- **Team**: Match issues based on [Issue Team Ownership][4] (for example, `team:Shopist`)

You can combine multiple criteria to create precise routing rules. The issue matching query supports the following operators:

- `AND`: logical AND (for example, `service:web-store AND team:Shopist`)
- `OR`: logical OR (for example, `service:web-store OR team:Shopist`)
- `-`: logical NOT (for example, `service:web-store -team:Shopist`)

<div class="alert alert-info"> Rules are ordered. The first rule that matches an issue is applied.</div>

### Automatic case creation

When adding an automation rule, you can enable automatic case creation for issues matching your rule.

{{< img src="error_tracking/enable-auto-case-creation.png" alt="Enable automatic case creation" style="height:300px;" >}}

By default, when a new Error Tracking issue is created, rules are evaluated and the first rule that matches is applied. If automatic case creation is enabled on that matching rule, a new Case Management case is created in the project specified in your rule, and attached to the matching issue.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /error_tracking/issue_team_ownership/
