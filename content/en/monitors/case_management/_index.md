---
title: Case Management
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/"
  tag: "blog"
  text: "Automate common security tasks and stay ahead of threats with Datadog Workflows and Cloud SIEM"
---

## Overview

Datadog Case Management provides a centralized place to track, triage, and troubleshoot issues. Create cases from alerts, security signals, and Error Tracking issues that you want to investigate.

You can assign cases to users or teams, establishing clear lines of ownership that persist throughout the lifespan of the case. Populate your cases with graphs, logs, and other telemetry data from across Datadog alongside information from external tools, such as messaging and issue-tracking apps.

## View, filter, and manage

Find [Case Management][1] in the Service Management menu.

### Filter cases

Use **Inboxes** to filter the list of cases to the ones most relevant to your work. Datadog automatically creates inboxes with filters for cases assigned to you, created by you, or associated with your [Teams][2].

To filter cases based on a search query, create a custom inbox:
1. On the [Case Management page][1], next to **Other Inboxes**, click **Add**. The [Create a new inbox][3] page appears.
1. Give the inbox a **Name**
1. In the search box, enter a query. The **Inbox Preview** refreshes to show you the cases that match the current search query.
1. Click **Save Inbox**.

### Bulk actions

Make bulk edits to cases from the [Case Management page][1]:
1. Use the checkboxes to select one or more cases. The top of the list updates to show bulk edit options.
1. Use the drop-down menus to **Set status**, **Assign**, **Set priority**, or perform **More actions**. Or, click **Archive**.

## Create or update a case

You can create or update cases from several locations in Datadog:
- Monitors
- Security signals
- Error Tracking for Logs
- Workflows
- The Case Management page

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /account_management/teams/
[3]: https://app.datadoghq.com/cases/contexts/new
