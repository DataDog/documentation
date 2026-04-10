---
title: Configure
description: Configure dashboard details, template variables, permissions, and access controls to customize your Datadog dashboards.
disable_toc: false
further_reading:
- link: "/dashboards/"
  tag: "Documentation"
  text: "Dashboards Overview"
---

## Overview

Dashboards provide visibility into your data across Datadog products. Add details and configurations to expedite troubleshooting and add focus to the information you are visualizing.

Configure individual dashboards to:
- [Add details and descriptive information on what the dashboard visualizes](#dashboard-details)
- [View configuration actions to customize your dashboard display and view dashboard related activities](#configuration-actions)
- [Restrict access to individual dashboards with Permissions](#permissions)
- [Customize views with template variables](#template-variables)
- [Organize widgets into named sections with Tabs](#tabs)

## Dashboard details

From an individual dashboard, hover over the dashboard title to view and edit dashboard details. A panel opens which displays the title and the creator.

{{< img src="dashboards/suggested_dashboards.png" alt="Dashboard details highlighting editable title, suggested dashboards, and Teams features" style="width:70%;" >}}

Update Markdown-supported dashboard descriptions or associate [teams][1] with a dashboard:

1. Hover the dashboard title. A dropdown panel opens.
1. Click on the dashboard title or description to edit them.
1. Click the check button, to change the title.
1. Select up to 5 teams from the {{< ui >}}Teams{{< /ui >}} dropdown.
1. (Optional) Add `[[suggested_dashboards]]` inside the dashboard description for a list of suggested dashboards. These dashboards are recommended based on the user activity in your organization and how often users go from this dashboard to other dashboards.

## Template variables

 Template variables allow you to focus your dashboards on a particular subset of hosts, containers, or services based on tags or facets. See the [Template variables][2] documentation to learn how to:
 - Add and configure dashboard template variables
 - Apply template variables to dashboard widgets
 - Use template variables to create Saved views

## Tabs

Use tabs to organize widgets into named sections within a single dashboard. Tabs help manage large dashboards by grouping related widgets together, reducing visual clutter, and letting viewers navigate directly to the content they need.

### Create and manage tabs

To add a tab, click on the **Add Widgets** dropdown at the top of the dashboard and click **Add New Tab**. New tabs are named automatically (for example, "Tab 1", "Tab 2") and a dashboard supports up to 100 tabs. Add subsequent tabs using the **+** button on the tab bar.

To **rename** a tab, double-click the tab name to edit it inline, or open the tab's options menu (⋮) and select **Rename**. Tab names support up to 100 characters.

To **reorder** tabs, drag and drop them into the desired position.

To **delete** a tab, open the tab's options menu (⋮) and select **Delete**.

### Move widgets to a tab

In edit mode, open a widget's share menu and select **Move to tab**, then choose a destination tab or create a new one. If the selected widget is a group, all nested widgets move together. If the selected widget is a nested widget, it becomes a top-level widget in the destination tab. The widget is placed in the next available position on the destination tab.

## Configuration actions

Click {{< ui >}}Configure{{< /ui >}} to open a menu of configuration options available for your dashboard, including:

| Configuration    | Description |
| ----------- | ----------- |
| {{< ui >}}Clone dashboard{{< /ui >}} | Copy the entire dashboard to a new dashboard. You are prompted to name the clone. |
| {{< ui >}}Display UTC time{{< /ui >}} | Toggle between UTC time and your default time zone. |
| {{< ui >}}Include Flex Logs{{< /ui >}} | Control whether widgets search [Flex Logs][3] or [Standard Indexed][4] logs. Switch between recent and historical data without editing individual widgets. This is a user-level preference that persists across sessions for this dashboard. |
| {{< ui >}}Increase density{{< /ui >}} | High-density mode displays group widgets in a dashboard side-by-side for increased widget density. This mode turns on by default on large screens for dashboards that use group widgets. |
| {{< ui >}}Keyboard&nbsp;shortcuts{{< /ui >}} | View a list of available keyboard shortcuts. |
| {{< ui >}}Pause Auto-Refresh{{< /ui >}} | Pause automatic refresh by default for dashboards with relative time ranges to optimize compute usage and reduce background activity. This setting applies to all users who view the dashboard. |
| {{< ui >}}TV Mode{{< /ui >}} | Toggle to display key performance metrics on large screens or TVs. For more information, see [Using TV mode for Dashboards][5]. |
| {{< ui >}}Version history{{< /ui >}} | Preview, restore, or clone your dashboard's version history. For more information, see the [Version History guide][6]. |
| {{< ui >}}View audit events{{< /ui >}} | See who is using this dashboard within your organization. As an individual, you can see a stream of your own actions. For more information, see [Datadog Audit Trail][7]. |

### Notifications

Enable notifications tracking to receive change notifications for a dashboard. Any user in the organization can enable this for themselves, regardless of administrative privileges.

When notifications are activated for a dashboard, an event is created in the [Events Explorer][8]. This event provides information on text changes, widget changes, dashboard cloning, and dashboard deletion, along with the name of the user performing the action. View change events for a specific dashboard in the event explorer by searching:

```text
tags:(audit AND dash) <DASHBOARD_NAME>
```

### Copy, import, or export dashboard JSON

Copy, import, or export a dashboard's JSON by clicking the {{< ui >}}Configure{{< /ui >}} icon (upper right) with the following options:

| Option                          | Description                                                                                                                                                                |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| {{< ui >}}Copy&nbsp;dashboard&nbsp;JSON{{< /ui >}}   | Copy the dashboard's JSON to your clipboard.                                                                                                                               |
| {{< ui >}}Import&nbsp;dashboard&nbsp;JSON{{< /ui >}} | Paste or import your JSON to the dashboard. This option overwrites all content on the dashboard. If the JSON is already on your clipboard, use `Ctrl V` (`Cmd V` for Mac). |
| {{< ui >}}Export&nbsp;dashboard&nbsp;JSON{{< /ui >}} | Download a JSON file containing the JSON of your dashboard.                                                                                                                |

Options for copying or exporting the JSON can also be accessed from the {{< ui >}}Share{{< /ui >}} icon in the upper right.

### Delete dashboard

<div class="alert alert-danger">Dashboards must be unstarred before deletion.</div>

Use this option to permanently delete your dashboard. Use the preset {{< ui >}}Recently Deleted{{< /ui >}} list to restore deleted dashboards. Dashboards in {{< ui >}}Recently Deleted{{< /ui >}} are permanently deleted after 30 days. For more information, see the [Dashboard list][9] documentation.

## Permissions

<div class="alert alert-info"><em>View</em> restrictions on individual dashboards are available upon request to anyone on a paid plan. Reach out to your account team or <a href="/help/">Datadog support</a> to enable this feature.</div>

{{< img src="dashboards/access_popup.png" alt="Dialog box with dropdown menu allowing users to choose a role to access the dashboard." style="width:70%;">}}

Use granular access controls to limit the [roles][10] that may edit a particular dashboard:
1. While viewing a dashboard, click on the cog {{< ui >}}Configure{{< /ui >}} in the upper right.
1. Select {{< ui >}}Permissions{{< /ui >}}.
1. Click {{< ui >}}Restrict Access{{< /ui >}}.
1. The dialog box updates to show that members of your organization have {{< ui >}}Viewer{{< /ui >}} access by default.
1. Use the dropdown to select one or more roles, teams, or users that may edit the dashboard.
1. Click {{< ui >}}Add{{< /ui >}}.
1. The dialog box updates to show that the role you selected has the {{< ui >}}Editor{{< /ui >}} permission.
1. Click {{< ui >}}Save{{< /ui >}}.

**Note:** To maintain your edit access to the dashboard, the system requires you to include at least one role that you are a member of before saving. For more information about roles, see the [RBAC documentation][10].

To restore general access to a dashboard with restricted access, follow the steps below:
1. While viewing a dashboard, click on the cog {{< ui >}}Configure{{< /ui >}} in the upper right.
1. Select {{< ui >}}Permissions{{< /ui >}}.
1. Click {{< ui >}}Restore Full Access{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.

If the dashboard was created with the deprecated "read only" setting, the access control list pre-populates with a list of roles that have the Access Management (`user_access_manage`) permission.

If you manage your dashboards with Terraform, you can use the latest version of the Datadog Terraform provider to control which roles can edit your dashboards. For more information, see the [Terraform Dashboard role restriction guide][11].

The access indicator appears at the top right of each edit-restricted dashboard. Depending on your permissions, it may say {{< ui >}}Gain Edit Access{{< /ui >}} or {{< ui >}}Request Edit Access{{< /ui >}}. Click the access indicator to understand your access permissions and what steps to take to edit the dashboard.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/teams/
[2]: /dashboards/template_variables/
[3]: /logs/log_configuration/flex_logs/
[4]: /logs/log_configuration/indexes
[5]: /dashboards/guide/tv_mode
[6]: /dashboards/guide/version_history/
[7]: /account_management/audit_trail/
[8]: /events/
[9]: /dashboards/list
[10]: /account_management/rbac/
[11]: /dashboards/guide/how-to-use-terraform-to-restrict-dashboard-edit/
