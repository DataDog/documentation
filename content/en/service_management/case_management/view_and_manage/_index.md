---
title: View and Manage Cases
further_reading:
- link: "service_management/case_management/settings"
  tag: "Documentation"
  text: "Case settings"
---

## Overview

{{< img src="/service_management/case_management/view_and_manage/view_and_manage_overview_cropped.png" alt="Case Management page showing view of all cases, option to select status, and view assigned members" style="width:100%;" >}}

On the [Case Management page][1], cases can be sorted by creation date, status, or priority. By default, cases are sorted by creation date. 

To make bulk edits to cases within a project, use the checkboxes to select one or more cases. Then, use the drop-down menus to perform actions in bulk, such as status management, assignment, and archiving. When cases are moved to a different project, the cases are assigned a new case ID. The old case URL does not redirect to the new case. 

## Keyboard shortcuts
Use the following keyboard shortcuts for swift navigation:

| Action              | Shortcut       |
| ------------------  | ----------     |
| Move up             | `↑` or `K`     |
| Move down           | `↓` or `J`     |
| Select case         | `X`            |
| View selected case  | `Enter` or `O` |
| Create a case       | `C`            |
| Set status          | `S`            |
| Assign to user      | `A`            |
| Set priority        | `P`            |
| Move to project     | `V`            |
| Archive / unarchive | `E`            |

## Search cases

Within a project, you can search for cases by:
- **attribute key-value pairs**: For example, to find all cases created from Event Correlation patterns, search for `creation_source:Event Management`. For cases created from individual events, search for `creation_source:Event`.
- **title**: Surround your search term with double quotes. For example, to find all of your cases containing the term "kubernetes pods" in the title, search for `"kubernetes pods."`

To compose a more complex query, you can use the following case sensitive Boolean operators: `AND`, `OR`, and `-` (exclusion). For example, `priority:(P2 OR P3)` returns cases of either priority `P2` or `P3`. 

Additionally, you can search for cases across all projects using the global search bar in the top left corner.

## Create a view

A **view** is a saved query filter that allows you to scope a list of cases down to what's most relevant to you. Projects have default views for each of the statuses: open, in progress, closed, and archived. In addition, there are default views for cases assigned to you and created by you. 

To create a custom view:
1. Select **Add View** from within a project.
1. Give the view a name.
1. In the search box, enter a query. The preview refreshes to show you the cases that match the current search query.
1. (Optional) Send a notification with third-party tools such as Slack, Microsoft Teams, PagerDuty, or Webhooks. Click **+ Add Recipient Type** and select from the pre-configured channels or recipients. See [Create notifications and tickets ][2] to learn more about the available tools and options.
1. Click **Save view**.

## Case details

{{< img src="/service_management/case_management/view_and_manage/case_details_overview.png" alt="Case detail view of an example case that was escalated" style="width:100%;" >}}

The Case Details page acts as the single source of truth on what is going on with the investigation. Each case has the following properties: 

Status
: All cases default to open upon creation. As you progress through the case, you can change it to in progress and closed. Type `S` to change the status of a case. 

Priority
: By default, a priority is not defined. You can set the priority of the case to P1 - Critical, P2 - High, P3 - Medium, P4 - Low, P5 - Info. Type `P` to set the priority of a case. 

Assignee
: Unassigned by default. To assign it to a user, type `A`. To assign it to yourself, type `I`. 

Attributes
: Adding attributes allow for organization and filtering. By default, all cases have the following attributes: team, datacenters, services, environments, and versions. 

Archiving
: Archiving a case removes it from searches. Type `E` to archive a case.

Activity timeline
: Each case automatically creates an activity timeline to capture real-time updates to status, assignee, priority, signals, and any comments added. If you're tagged in a comment, you receive an email. Type `M` to add a comment and `Cmd + Enter` to submit it.

## Take action

Use Case Management to gather information, context, and resources to determine the proper action to take. This includes further investigation, escalating to an incident, or closing out a case.

From an individual case:
- [Create an investigative notebook][3]: Gather investigation information and collaborate with your team members.
- [Declare an incident][4]: Escalate a case to an incident and kick off your incident response process. 
- Manually create a Jira issue: Use `Shift + J` to create a Jira issue. For more information on how to configure automatic Jira issue creation and bidirectional synchronization, see the [Settings][5] documentation. 
- Manually create a ServiceNow incident: Use `Shift + N` to create a ServiceNow incident. 
- [Meet on CoScreen][6]: Share screens for collaborative debugging 
- Close out the case: Let the team know that no further action is needed. Update the status of the case to closed.

## Case Analytics

{{< img src="/service_management/case_management/view_and_manage/view_and_manage_case_analytics.png" alt="Graph editor showing the cases options selected as a data source" style="width:100%;" >}}

Case Analytics is a queryable data source for aggregated case statistics. You can query these analytics in a variety of graph widgets in both [Dashboards][7] and [Notebooks][3] to analyze team productivity and identify patterns in issues. 

The following widgets support Case Analytics: timeseries, top list, query value, table, tree map, pie chart, change, and list. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /service_management/case_management/create_notifications_and_third_party_tickets
[3]: /notebooks/
[4]: /service_management/incident_management/#describing-the-incident
[5]: /service_management/case_management/settings/#jira
[6]: /coscreen/
[7]: https://docs.datadoghq.com/dashboards/
