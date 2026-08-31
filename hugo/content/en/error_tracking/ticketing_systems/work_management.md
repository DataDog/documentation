---
title: Integrate Work Management with Error Tracking
aliases:
- /error_tracking/ticketing_systems/case_management/
is_beta: false
private: false
further_reading:
  - link: '/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Error Tracking Explorer'
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Issue States in Error Tracking'
  - link: '/incident_response/work_management/'
    tag: 'Documentation'
    text: 'Work Management'
---

## Overview

Integrate Work Management with Error Tracking to create and link Work Management work items to Error Tracking issues. With Work Management for Error Tracking, you can:

- Create Work Management work items directly from the Error Tracking issue panel
- Group multiple Error Tracking issues into a single work item
- Automatically route issues to specific Work Management projects using automation rules
- Automatically create Work Management work items for Error Tracking issues matching specific criteria.

## Setup

You need the following [permissions][1] to use the Work Management integration for Error Tracking:

- Error Tracking Read
- Error Tracking Issue Write
- Cases Read
- Cases Write

## Create a work item from an issue

You can create a Work Management work item directly from the issue panel to group investigation efforts on that issue:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the {{< ui >}}Actions{{< /ui >}} dropdown, click {{< ui >}}Add Case{{< /ui >}}.
4. Choose the Work Management project in which the work item should be created. By default, the work item will automatically be created in the Error Tracking project.
5. Click {{< ui >}}Create{{< /ui >}} to create the work item.

After it is created, the work item is linked to the Error Tracking issue. The work item link then appears in the issue panel, and the issue status automatically changes to {{< ui >}}REVIEWED{{< /ui >}}.

When an issue is linked to a work item, their state, assignee, and comments are two-way synced.
See [State dual-way sync between issues and work items](#state-dual-way-sync-between-issues-and-work-items) for more information on how the issue state and work item status are synced.

## Group multiple issues into a single work item

You can attach multiple Error Tracking issues to a single Work Management work item to group correlated issues into a single unit of work:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the {{< ui >}}Actions{{< /ui >}} dropdown, click {{< ui >}}Add Case{{< /ui >}}.
4. In the {{< ui >}}Add to Existing Case{{< /ui >}} tab, select the work item in which you want to group your issues.
5. Click {{< ui >}}Attach to Case{{< /ui >}} to attach the issue to the work item.
6. Repeat these actions on all the issues you want to add to this group.

All linked Error Tracking issues appear in the work item view, providing a consolidated view of related errors.

When several issues are linked to a work item, their state, assignee and comments are two-way synced. See [State dual-way sync between issues and work items](#state-dual-way-sync-between-issues-and-work-items) for more information on how the issues states and work item status are synced.

The relationship between work items and issues is a 1:N relationship. A single work item can be linked to multiple issues, but an issue can only be linked to one single work item.

## State dual-way sync between issues and work items

### Single Error Tracking issue linked to single Work Management work item

When a single Error Tracking issue is linked to a Work Management work item, their states are two-way synced. The issue state is mapped to
the default status of the corresponding work item status group:

| Error Tracking Issue State | Work Management Status Group |
|----------------------------|------------------------------|
| {{< ui >}}FOR REVIEW{{< /ui >}}  | {{< ui >}}Open{{< /ui >}}        |
| {{< ui >}}REVIEWED{{< /ui >}}    | {{< ui >}}In Progress{{< /ui >}} |
| {{< ui >}}RESOLVED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}IGNORED{{< /ui >}}     | {{< ui >}}Closed{{< /ui >}}      |
| {{< ui >}}EXCLUDED{{< /ui >}}    | {{< ui >}}Closed{{< /ui >}}      |

### Multiple Error Tracking issues linked to single Work Management work item

When multiple Error Tracking issues are linked to the same Work Management work item, there is also a sync between their states, depending on the situation:
- If you update the status of the work item, all linked issues are updated following the state mapping described in the previous paragraph.
- If you update the state of an issue, the resulting state of other linked issues and the work item follows these rules:

| State before                                                       | Action                                                 | Resulting state                                                                                 |
|--------------------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| The case is {{< ui >}}CLOSED{{< /ui >}} and all issues are {{< ui >}}RESOLVED{{< /ui >}}.                | You update one issue to {{< ui >}}FOR REVIEW{{< /ui >}}.                  | The case is {{< ui >}}OPEN{{< /ui >}} but all other issues remain {{< ui >}}RESOLVED{{< /ui >}}.                                      |
| The case is {{< ui >}}OPEN{{< /ui >}} and all issues are {{< ui >}}FOR REVIEW{{< /ui >}}.                | You update one issue to {{< ui >}}RESOLVED{{< /ui >}}.                    | The case is {{< ui >}}OPEN{{< /ui >}}, one issue is {{< ui >}}RESOLVED{{< /ui >}}, all other issues remain {{< ui >}}FOR REVIEW{{< /ui >}}.              |
| The case is {{< ui >}}CLOSED{{< /ui >}} and you have one unlinked issue {{< ui >}}FOR REVIEW{{< /ui >}}. | You link the {{< ui >}}FOR REVIEW{{< /ui >}} issue to your {{< ui >}}CLOSED{{< /ui >}} case. | The case is {{< ui >}}CLOSED{{< /ui >}} and all issues are {{< ui >}}RESOLVED{{< /ui >}} (including the newly linked issue).          |
| The case is {{< ui >}}OPEN{{< /ui >}} and you have one unlinked {{< ui >}}RESOLVED{{< /ui >}} issue.     | You link the {{< ui >}}RESOLVED{{< /ui >}} issue to your {{< ui >}}OPEN{{< /ui >}} case.     | The case is {{< ui >}}OPEN{{< /ui >}} and all issues are {{< ui >}}FOR REVIEW{{< /ui >}} except the new one which remains {{< ui >}}RESOLVED{{< /ui >}}. |

## Automation rules

You can configure rules to match specific issues to Work Management projects. For example, when an issue matches a rule, any work item created manually or automatically for that issue defaults into the project specified by that rule.

### Setup

To create automation rules for your Error Tracking issues, you need one (1) of the following [permissions][1] :
- Error Tracking Write
- Error Tracking Settings Write

### Create an automation rule

To create an automation rule for Work Management:

1. Navigate to [Error Tracking Settings][3], in the {{< ui >}}Ticketing & Automation{{< /ui >}} section.
2. Click {{< ui >}}New Rule{{< /ui >}}.
3. Configure the rule:
    - {{< ui >}}Match Criteria{{< /ui >}}: Define conditions that issues must meet to trigger the rule
    - {{< ui >}}Project{{< /ui >}}: Select the destination Work Management project when work items are created from issues that match the rule
    - {{< ui >}}Auto-create{{< /ui >}}: Optionally enable automatic work item creation when issues match
4. Click {{< ui >}}Save Rule{{< /ui >}}.

### Match criteria

Configure rules based on the following attributes:

- {{< ui >}}Service{{< /ui >}}: Match issues from specific services (for example, `service:web-store`)
- {{< ui >}}Team{{< /ui >}}: Match issues based on [Issue Team Ownership][4] (for example, `team:Shopist`)

You can combine multiple criteria to create precise routing rules. The issue matching query supports the following operators:

- `AND`: logical AND (for example, `service:web-store AND team:Shopist`)
- `OR`: logical OR (for example, `service:web-store OR team:Shopist`)
- `-`: logical NOT (for example, `service:web-store -team:Shopist`)

<div class="alert alert-info"> Rules are ordered. The first rule that matches an issue is applied.</div>

### Automatic work item creation

When adding an automation rule, you can enable automatic work item creation for issues matching your rule.

By default, when a new Error Tracking issue is created, rules are evaluated and the first rule that matches is applied. If automatic work item creation is enabled on that matching rule, a new Work Management work item is created in the project specified in your rule, and attached to the matching issue.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[3]: https://app.datadoghq.com/error-tracking/settings/automation/
[4]: /error_tracking/issue_team_ownership/
