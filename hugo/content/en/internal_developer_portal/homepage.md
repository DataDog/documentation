---
title: Homepage
description: The Internal Developer Portal Homepage gives you a centralized view of your team's entities, GitHub pull requests, Jira tickets, and Datadog Cases in one place.
aliases:  
- /software_catalog/developer_homepage  
- /internal_developer_portal/developer_homepage  
further_reading:  
- link: "/integrations/github/"  
  tag: "Documentation"  
  text: "Learn about the GitHub Integration"   

---

{{< img src="tracing/software_catalog/idp_homepage.png" alt="IDP Homepage showing a personalized view of GitHub pull requests awaiting review and Jira tickets" style="width:100%;" >}} 

## Overview

The [IDP Homepage][3] provides a centralized view of your team's entities and your daily tasks.  

With this view, you can:
- View key information about your team's entities, including scorecards, recent deployments, monitors, issues, incidents, dashboards, and on-call status. 
- Track tasks assigned to you across GitHub and Jira.
- Identify alerting monitors or failed deployments.

## Prerequisites

The Homepage aggregates data from your Datadog integrations. To populate the task sections, configure the following integrations and webhooks before using the Homepage:

- **GitHub**: Install and configure the GitHub integration, and set up a GitHub webhook so that repository events (such as pull request activity) reach Datadog in real time. The **GitHub PRs** section requires this webhook to display current pull request data. For setup steps, see [GitHub][1].
- **Jira**: Configure the Jira integration, and set up a Jira webhook so that issue events reach Datadog. The **Jira** tab in the **Your Tickets** section requires this webhook to display your assigned issues. For setup steps, see [Configure a Jira webhook][2].

## GitHub PRs

{{< img src="tracing/software_catalog/github_prs_table.png" alt="PRs assigned to the user" style="width:100%;" >}}  

The **GitHub PRs** section consolidates your personal action items from GitHub, displaying PRs in the following states:
- **Needs your review**
- **Returned to you**  
- **Approved**  
- **Waiting for reviewers**
- **Recently merged**  

Each PR includes:
- **Repository and PR number**  
- **Title**  
- **Status** (Open / Draft / Merged)  
- **Assignee / Reviewer**  

If your organization has not configured the GitHub integration, this section displays an empty state with a prompt to enable it from the [GitHub integration tile][1]. To read PRs from GitHub, this integration requires the following permissions:

- Members: Read
- Metadata: Read
- Pull Requests: Read
- Contents: Read
- Statuses: Read
- Checks: Read

In addition to these permissions, the **GitHub PRs** section requires a configured GitHub webhook so that pull request events reach Datadog in real time. For setup steps, see [GitHub][1]. 

If you have multiple GitHub orgs connected within Datadog, users must have the Datadog Integrations Read Permissions to toggle between orgs.

## Your tickets

{{< img src="tracing/software_catalog/homepage_tickets.png" alt="Your Tickets section showing Jira and Cases tabs with items assigned to the user" style="width:100%;" >}}

The **Your Tickets** section consolidates the items assigned to you across Jira and Datadog Case Management, so you can track your open work without leaving the Homepage. Switch between the **Jira** and **Cases** tabs to view each source, and use **Display** to change how items are shown.

### Jira

The **Jira** tab lists the Jira tickets assigned to you, grouped by status category: **To Do**, **In Progress**, and **Done**. Each ticket includes: 

- **Key**
- **Title** (with a comment count when comments exist)
- **Status** 
- **Created**
- **Updated**
- **Priority**
- **Due**
- **Assignee**

### Cases

The **Cases** tab lists the Datadog Case Management cases assigned to you, grouped by status: **Open**, **In Progress**, and **Closed**. Each group shows a count.

Each case includes:

- **Case key**
- **Title** (with a comment count when comments exist)
- **Status**
- **Updated**
- **Priority**
- **Due date**
- **Assignee**

Cases appear automatically when they are assigned to you. For more information, see [Case Management][4].

## Services and entities

{{< img src="tracing/software_catalog/services_entities_table.png" alt="Services & entities for the user" style="width:100%;" >}}  

The **Services & Entities** section displays your team's key services and entities, aggregated automatically from linked Datadog products and integrations. You can filter by recently viewed entities, entities owned by your team, or entities you've favorited.

Each entity includes the following information:

| Field | Description |
|--------|-------------|
| **Type** | The entity type (for example, Service, Monitor, or Incident). |
| **Name** | The entity's display name or identifier. |
| **Scorecards** | A summary of the entity's health based on reliability, performance, and error budgets. |
| **Last Deploy** | The most recent deployment detected by APM or CI integrations. |
| **Monitors** | The number and status of monitors associated with the entity. |
| **Issues** | Active issues related to the entity, aggregated from linked tracking tools. |
| **Incidents** | Open incidents associated with the team's entities. |
| **Dashboards** | Key dashboards linked to the entity. |
| **On-Call** | The current on-call responder for the team or entity. |


## Extend the Homepage with custom apps 

In addition to the built-in sections, the **Apps** section lets you add custom apps to the Homepage, so you can bring together the data and actions you find most useful, whether they come from Datadog, an internal tool, or a third-party service. Datadog provides two ways to build these apps: 

- **App Builder**: A low-code, drag-and-drop builder for internal tools. Apps combine prebuilt UI components, Datadog data sources (such as metrics, logs, and monitors), and out-of-the-box actions for services such as GitHub and AWS. For more information, see [App Builder][5].
- **Datadog Apps**: A code-based path for apps you build locally with React and TypeScript (or JavaScript), using a CLI and your standard development workflow. Choose Datadog Apps when you need team collaboration with source control and CI/CD, AI-assisted local development, integration with services beyond the Action Catalog, or full control over the app's UI and logic. For more information, see [Datadog Apps][6].

To make a custom app available here, first publish it and define its permissions so that your team can view and use it.

To add an app to the Homepage:

1. In the **Apps** section, click **Add App**.
2. Choose a **blueprint** to start from a prebuilt app, or choose a **custom app** that your organization has already built.
3. Configure the app, then add it to the Homepage.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /integrations/github/  
[2]: /integrations/jira/#configure-a-jira-webhook
[3]: https://app.datadoghq.com/idp/home
[4]: /service_management/case_management
[5]: /actions/app_builder/
[6]: /actions/datadog_apps
