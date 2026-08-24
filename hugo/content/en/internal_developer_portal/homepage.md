---
title: Homepage
site_support_id: idp
description: The Internal Developer Portal Homepage gives you a centralized view of your team's entities, GitHub pull requests, GitLab merge requests, Jira and Linear tickets, and Datadog Work Items in one place.
aliases:  
- /software_catalog/developer_homepage  
- /internal_developer_portal/developer_homepage  
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-idp-homepage/"
  tag: "Blog"
  text: "Start your day with the IDP Homepage"
- link: "/integrations/github/"  
  tag: "Documentation"  
  text: "Learn about the GitHub integration"
- link: "/integrations/gitlab-source-code/"  
  tag: "Documentation"  
  text: "Learn about the GitLab Source Code integration"
- link: "/integrations/jira/#configure-a-jira-webhook"  
  tag: "Documentation"  
  text: "Learn about the Jira integration"
- link: "/integrations/linear/#configure-a-linear-webhook"  
  tag: "Documentation"  
  text: "Learn about the Linear integration"
---

{{< img src="tracing/software_catalog/idp_homepage_2.png" alt="The IDP Homepage showing pull requests awaiting review and assigned tickets." style="width:100%;" >}}

## Overview

The [IDP Homepage][5] provides a centralized view of your team's entities and your daily tasks.  

With this view, you can:
- View key information about your team's entities, including scorecards, recent deployments, monitors, issues, incidents, dashboards, and on-call status. 
- Track tasks assigned to you across GitHub, GitLab, Jira, and Linear.
- Identify alerting monitors or failed deployments.

## Prerequisites

The Homepage aggregates data from your Datadog integrations. Configure the following before using the Homepage.

**GitHub**
Required for the **GitHub** tab in **Your PRs**. An administrator configures the GitHub integration and webhook, and each user signs in with their GitHub account. [Set up the GitHub integration][1].

**GitLab Source Code**
Required for the **GitLab** tab in **Your PRs**. An administrator configures the GitLab Source Code integration and webhook, and each user signs in with their GitLab account. [Set up the GitLab Source Code integration][2].

**Jira**
Required for the **Jira** tab in **Your Tickets**. An administrator configures the Jira integration and webhook. [Set up the Jira webhook][3].

**Linear**
Required for the **Linear** tab in **Your Tickets**. An administrator configures the Linear integration and webhook. [Set up the Linear webhook][4].

## Configure the Homepage 

Click **Configure** at the top of the [IDP Homepage][5] to personalize the page. The **Homepage settings** panel opens with two tabs: **Section layout** and **Integrations**. After you make changes, click **Save** to apply them, or **Cancel** to discard them.

### Section layout

The **Section layout** tab controls which sections appear on the Homepage and the order in which they display. The available sections are: **Your PRs**, **Your Tickets**, **Services & Entities**, and **Apps**.

- To reorder a section, drag it by its handle to a new position.
- To show or hide a section, click the visibility icon next to it.
- To restore the default sections and order, click **Reset Layout**.

### Integrations 

The **Integrations** tab controls which integrations are enabled and what each shows on the Homepage. Integrations are grouped by the section they populate, such as **PRs** and **Work Items**.

Each integration has a toggle to enable or disable it. When you disable an integration, its data no longer appears on the Homepage. Depending on the integration, you can also: 

- Select which connected account, instance, or organization to display. For example, the GitLab integration includes an **Instance** selector.
- Open the integration's configuration to manage its connection. For example, the GitHub integration includes a **Configure** option. 

## Your PRs

The **Your PRs** section consolidates your personal action items from source control, so you can track the pull requests and merge requests assigned to you without leaving the Homepage. Switch between the **GitHub** and **GitLab** tabs to view each source.

{{< img src="tracing/software_catalog/your_prs_table.png" alt="The Your PRs section showing GitHub pull requests grouped by status." style="width:100%;" >}}

### GitHub

The **GitHub** tab consolidates your personal action items from GitHub, displaying PRs in the following states:

- **Needs your review**
- **Returned to you**  
- **Approved**  
- **Waiting for reviewers**
- **Drafts**
- **Recently merged**

Each PR includes:

- **Repository and PR number**  
- **Title**  
- **Status** (Open / Draft / Merged)  
- **Assignee / Reviewer**  

After you sign in with your GitHub account, the tab loads your pull requests, grouped by status.

If your organization has not configured the GitHub integration, this tab displays an empty state with a prompt to enable it from the [GitHub integration tile][1]. To read PRs from GitHub, this integration requires the following permissions:

- Members: Read
- Metadata: Read
- Pull Requests: Read
- Contents: Read
- Statuses: Read
- Checks: Read

If you have multiple GitHub orgs connected within Datadog, users must have the Datadog Integrations Read Permissions to toggle between orgs.

### GitLab

The **GitLab** tab consolidates your personal action items from GitLab, displaying merge requests in the following states:

- **Needs your review**
- **Returned to you**
- **Approved**
- **Waiting for reviewers**
- **Drafts**
- **Recently merged**

Each merge request includes: 

- **Title and MR number**, with the author who opened it
- **Project or repository context** and **labels**
- **Status** (for example, Open, Draft, or Merged)
- **Pipeline status**, including pipeline failures and other merge blockers
- **Reviewers, approvers, and review state**
- **Comment counts**, including resolved and unresolved discussion counts
- **Age**, shown as the time since the last update

After you sign in with your GitLab account, the tab loads your merge requests, grouped by status. For setup steps, see [GitLab Source Code][2].

If your organization has not configured the GitLab Source Code integration, this tab displays an empty state with a prompt to enable it from the [GitLab Source Code integration tile][2].

If you have multiple GitLab instances connected within Datadog, use the **Instance** selector to choose which instance to view. 

## Your tickets

The **Your Tickets** section consolidates the items assigned to you across Jira, Linear, and Datadog Work Management, so you can track your open work without leaving the Homepage. Switch between the **Jira**, **Linear**, and **Work Items** tabs to view each source, and use **Display** to change how items are shown.

{{< img src="tracing/software_catalog/your_tickets_table.png" alt="The Your Tickets section showing Jira tickets grouped by status." style="width:100%;" >}}

### Jira

The **Jira** tab lists the Jira tickets assigned to you, grouped by status category: **To Do**, **In Progress**, and **Done**. Each ticket includes: 

- **Key**
- **Title** (with a comment count when comments exist)
- **Status** 
- **Created**
- **Updated**
- **Priority**
- **Due**

After setup, your assigned tickets appear automatically. For setup steps, see [Configure a Jira webhook][3].

### Linear

The **Linear** tab lists the Linear issues assigned to you, grouped by status category: **To Do**, **In Progress**, and **Done**. Each issue includes: 

- **Key**
- **Title**
- **Status**
- **Created**
- **Updated**
- **Priority**
- **Due**

After setup, your assigned issues appear automatically. For setup steps, see [Configure a Linear webhook][4].

### Work Items

The **Work Items** tab lists the Datadog Work Management work items assigned to you, grouped by status: **Open**, **In Progress**, and **Closed**. Each group shows a count.

Each work item includes:

- **Case key**
- **Title** (with a comment count when comments exist)
- **Status**
- **Updated**
- **Priority**
- **Due date**
- **Assignee**

Work items appear automatically when they are assigned to you. For more information, see [Work Management][6].

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

- **App Builder**: A low-code, drag-and-drop builder for internal tools. Apps combine prebuilt UI components, Datadog data sources (such as metrics, logs, and monitors), and out-of-the-box actions for services such as GitHub and AWS. For more information, see [App Builder][7].
- **Datadog Apps**: A code-based path for apps you build locally with React and TypeScript (or JavaScript), using a CLI and your standard development workflow. Choose Datadog Apps when you need team collaboration with source control and CI/CD, AI-assisted local development, integration with services beyond the Action Catalog, or full control over the app's UI and logic. For more information, see [Datadog Apps][8].

To make a custom app available here, first publish it and define its permissions so that your team can view and use it.

To add an app to the Homepage:

1. In the **Apps** section, click **Add App**.
2. Choose a **blueprint** to start from a prebuilt app, or choose a **custom app** that your organization has already built.
3. Configure the app, then add it to the Homepage.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /integrations/github/  
[2]: /integrations/gitlab-source-code/
[3]: /integrations/jira/#configure-a-jira-webhook
[4]: /integrations/linear/#configure-a-linear-webhook
[5]: https://app.datadoghq.com/idp/home
[6]: /service_management/case_management
[7]: /actions/app_builder/
[8]: /actions/datadog_apps

