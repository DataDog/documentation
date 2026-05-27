---
title: Integrate Linear with Error Tracking
is_beta: false
private: false
site_support_id: linear_error_tracking
further_reading:
  - link: '/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Error Tracking Explorer'
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Issue States in Error Tracking'
  - link: '/integrations/linear/'
    tag: 'Documentation'
    text: 'Linear Integration'
---

## Overview

Integrate Linear with Error Tracking to create and link Linear issues to Error Tracking issues. With this integration, you can:

- Create Linear issues directly from the Error Tracking issue panel
- Group multiple Error Tracking issues into a single Linear issue

## Prerequisites

1. Set up the [Linear integration for Datadog][7].
2. Make sure you have the following [permissions][1]:
   - Error Tracking Read
   - Error Tracking Issue Write
   - Cases Read
   - Cases Write
   - Integrations Read

## Create a Linear issue from an Error Tracking issue

Create a Linear issue directly from the issue panel to group investigation efforts on that issue:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the **Actions** dropdown, click **Add Linear issue**.
4. Choose the Linear workspace and team for the new Linear issue.
5. Optionally, open Data Sync settings to configure how data syncs between Datadog and Linear.
6. Click **Create** to create the Linear issue.

{{< img src="error_tracking/create-linear-issue.png" alt="Create a Linear issue from an Error Tracking issue" style="width:100%;" >}}

After the Linear issue is created, it is linked to the Error Tracking issue and appears in the issue panel. The Error Tracking issue status automatically changes to **REVIEWED**.

When an Error Tracking issue is linked to a Linear issue, the state, assignee, and comments are two-way synced. For details, see [State two-way sync between Error Tracking issues and Linear issues](#state-two-way-sync-between-error-tracking-issues-and-linear-issues).

## Group multiple Error Tracking issues into a single Linear issue

Attach multiple Error Tracking issues to a single Linear issue to group correlated issues into a single unit of work:

1. Navigate to the [Error Tracking Explorer][2].
2. Click on an issue to open the issue panel.
3. In the issue panel, in the **Actions** dropdown, click **Add Linear issue**.
4. In the **Add to Existing** tab, paste the URL of the Linear issue in which you want to group your Error Tracking issues.
5. Optionally, open Data Sync settings to configure how data syncs between Datadog and Linear.
6. Click **Link to Issue** to attach the Error Tracking issue to the Linear issue.
7. Repeat these actions on all the Error Tracking issues you want to add to this group.

{{< img src="error_tracking/add-to-existing-linear-issue.png" alt="Add an Error Tracking issue to an existing Linear issue" style="height:300px;" >}}

When several Error Tracking issues are linked to a single Linear issue, the state, assignee, and comments are two-way synced. For details, see [State two-way sync between Error Tracking issues and Linear issues](#state-two-way-sync-between-error-tracking-issues-and-linear-issues).

The relationship between Linear issues and Error Tracking issues is a 1:N relationship. A single Linear issue can be linked to multiple Error Tracking issues, but an Error Tracking issue can be linked to only one Linear issue.

## State two-way sync between Error Tracking issues and Linear issues

If two-way sync is enabled and configured between Datadog and Linear teams, the states of Error Tracking issues and Linear issues are mirrored. If you encounter unexpected behavior, see the [Troubleshooting](#troubleshooting) section for how to fix your configuration.

### Single Error Tracking issue linked to single Linear issue

When a single Error Tracking issue is linked to a Linear issue, their states are two-way synced. The mapping between these states can be configured in the Data Sync settings of the Linear issue creation form:

{{< img src="error_tracking/linear-status-mapping.png" alt="Map Error Tracking issue states to Linear issue states" style="width:100%;" >}}

### Multiple Error Tracking issues linked to single Linear issue

When multiple Error Tracking issues are linked to the same Linear issue, their states sync depending on the action you take. If you update the status of the Linear issue, all linked Error Tracking issues are updated to mirror this state according to your mapping.

Assuming that your mapping is defined as follows:

| Case Management status group | Linear issue state |
|------------------------------|--------------------|
| `Open`                       | `Todo`             |
| `In Progress`                | `In Progress`      |
| `Closed`                     | `Done`             |

If you update the state of an Error Tracking issue, the resulting state of other linked Error Tracking issues and the Linear issue follows these rules:

| Initial state                                                                  | Action                                                          | Resulting state                                                                                       |
|--------------------------------------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| The Linear issue is `Done` and all linked Error Tracking issues are `Resolved`. | Update one Error Tracking issue to `For Review`.                | The Linear issue changes to `Todo`. The other linked Error Tracking issues remain `Resolved`.         |
| The Linear issue is `Todo` and all linked Error Tracking issues are `For Review`. | Update one Error Tracking issue to `Resolved`.                  | The Linear issue stays `Todo`. The updated Error Tracking issue is `Resolved`; the others remain `For Review`. |
| The Linear issue is `Done`, and an unlinked Error Tracking issue is `For Review`. | Link the `For Review` Error Tracking issue to the Linear issue. | The Linear issue stays `Done`. All linked Error Tracking issues are `Resolved`, including the newly linked one. |
| The Linear issue is `Todo`, and an unlinked Error Tracking issue is `Resolved`. | Link the `Resolved` Error Tracking issue to the Linear issue.   | The Linear issue stays `Todo`. The other linked Error Tracking issues remain `For Review`, and the newly linked one stays `Resolved`. |

## Troubleshooting

If you experience unexpected behaviors using ticketing systems with Error Tracking, see the following troubleshooting steps. If you continue to have trouble, reach out to [Datadog support][5].

### Sync is broken between Linear and Error Tracking

If you experience syncing issues between your Linear issues and the corresponding Error Tracking issues (such as the Error Tracking issue state not being updated when you close the Linear issue), verify that the following steps are all properly configured:

1. In the issue panel, make sure that the Error Tracking issue is correctly linked to the Linear issue.
2. Verify that Case Management is correctly configured to sync with Linear.

   Datadog automatically creates a Case Management case to link Error Tracking issues and Linear issues. To check the configuration:
   - From the issue panel, open the linked Case Management case to find its project.
   - In Case Management settings, verify that the Linear integration is enabled for this project.
   - Verify that the correct Linear workspace and team are configured.

   {{< img src="error_tracking/enable-linear-for-case-management-project.png" alt="Enable Linear for your Case Management project" style="width:100%;" >}}

3. In Case Management settings, make sure that sync between Case Management and Linear is enabled for this project. Check that the fields you want to sync are configured for two-way sync between Datadog and Linear.

   {{< img src="error_tracking/sync-data-between-case-management-and-linear.png" alt="Sync data between Case Management and Linear" style="width:100%;" >}}

4. In your Linear settings, check that a webhook is configured to automatically sync updates between Datadog and Linear. If the webhook is missing, [add a Linear webhook][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/
[2]: https://app.datadoghq.com/error-tracking/
[5]: /help/
[6]: /integrations/linear/#configure-a-linear-webhook
[7]: /integrations/linear/
