---
title: Homepage
site_support_id: idp
description: The Internal Developer Portal Homepage gives you a centralized view of your team's entities, GitHub pull requests, Jira tickets, and Datadog Work Items in one place.
aliases:  
- /software_catalog/developer_homepage  
- /internal_developer_portal/developer_homepage  
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-idp-homepage/"
  tag: "Blog"
  text: "Start your day with the IDP Homepage"
- link: "/integrations/github/"  
  tag: "Documentation"  
  text: "Learn about the GitHub Integration"
- link: "/integrations/gitlab-source-code/"  
  tag: "Documentation"  
  text: "Learn about the GitLab Integration"
- link: "/integrations/jira/#configure-a-jira-webhook"  
  tag: "Documentation"  
  text: "Learn about the Jira Integration"
- link: "/integrations/linear/#configure-a-linear-webhook"  
  tag: "Documentation"  
  text: "Learn about the Linear Integration"
---

{{< img src="tracing/software_catalog/idp_homepage.png" alt="IDP Homepage showing a personalized view of pull requests awaiting review and tickets" style="width:100%;" >}} 

## Overview

The [IDP Homepage][5] provides a centralized view of your team's entities and your daily tasks.  

With this view, you can:
- View key information about your team's entities, including scorecards, recent deployments, monitors, issues, incidents, dashboards, and on-call status. 
- Track tasks assigned to you across GitHub, GitLab, Jira, and Linear.
- Identify alerting monitors or failed deployments.

## Prerequisites

The Homepage aggregates data from your Datadog integrations. To populate the task sections, configure the following integrations and webhooks before using the Homepage:

- **GitHub**: An administrator installs and configures the GitHub integration, and sets up a GitHub webhook so that repository events (such as pull request activity) reach Datadog in real time. The **GitHub PRs** section requires this webhook to display current pull request data. Each user also signs in with their own GitHub account to load the pull requests relevant to them. For setup steps, see [GitHub][1].
- **GitLab**: An administrator installs and configures the GitLab integration and sets up a GitLab webhook so that repository events (such as merge request activity) reach Datadog in real time. The **GitLab** tab in the **Your PRs** section requires this integration to display current merge request data. Each user also signs in with their own GitLab account to load the merge requests relevant to them. For setup steps, see [GitLab][2]. 
- **Jira**: Configure the Jira integration, and set up a Jira webhook so that issue events reach Datadog. The **Jira** tab in the **Your Tickets** section requires this webhook to display your assigned issues. For setup steps, see [Configure a Jira webhook][3].
- **Linear**: An administrator installs the Linear integration and sets up a Linear webhook so that issue events reach Datadog. The **Linear** tab in the **Your Tickets** section requires this integration to display your assigned issues. After setup, Datadog detects your assigned issues automatically. For setup steps, see [Configure a Linear webhook][4].

## Configure the Homepage 

To personalize the Homepage, click **Configure** at the top of the [IDP Homepage][5]. The **Homepage settings** panel opens with two tabs: **Section layout** and **Integrations**. After you make changes, click **Save** to apply them, or **Cancel** to discard them. 

### Section layout

The **Section layout** tab controls which sections appear on the Homepage and the order in which they display. The available sections are **Your PRs**, **Your Tickets**, **Services & Entities**, and **Apps**. 

- To reorder a section, drag it by its handle to a new position.
- To show or hide a section, click the visibility icon next to it.
- To restore the default sections and order, click **Reset Layout**.

### Integrations 

The **Integrations** tab controls which integrations are enabled and what each one shows on the Homepage. Integrations are grouped by the section they populate, such as **PRs** and **Work Items**. 

Each integration has a toggle to enable or disable it. When you disable an integration, its data no longer appears on the Homepage. Depending on the integration, you can also: 

- Select which connected account, instance, or organization to display. For example, the GitLab integration includes an **Instance** selector.
- Open the integration's configuration to manage its connection. For example, the GitHub integration includes a **Configure** option. 

## Your PRs

The **Your PRs** section consolidates your personal action items from source control, so you can track the pull requests and merge requests assigned to you without leaving the Homepage. Switch between the **GitHub** and **GitLab** tabs to view each source

{{< img src="tracing/software_catalog/your_prs_table.png" alt="PRs assigned to the user" style="width:100%;" >}}  

### GitHub

The **GitHub** tab consolidates your personal action items from GitHub, displaying PRs in the following states:

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

This tab requires two setup steps, in order: an administrator connects the GitHub integration for the organization, and each user signs in with their own GitHub account. After you authorize access, the tab loads your pull requests, grouped by status. 

If your organization has not configured the GitHub integration, this tab displays an empty state with a prompt to enable it from the [GitHub integration tile][1]. To read PRs from GitHub, this integration requires the following permissions:

- Members: Read
- Metadata: Read
- Pull Requests: Read
- Contents: Read
- Statuses: Read
- Checks: Read

The tab also requires a configured GitHub webhook so that pull request events reach Datadog in real time. For setup steps, see [GitHub][1]. 

If you have multiple GitHub orgs connected within Datadog, users must have the Datadog Integrations Read Permissions to toggle between orgs.

### GitLab

The **GitLab** tab consolidates your personal action items from GitHub, displaying merge requests in the following states: 

- **Needs your review**
- **Returned to you**
- **Approved**
- **Waiting for reviewers**
- **Drafts**
- **Recently merged**

Each merge request includes: 

- **Project and MR number**
- **Title**
- **Status**
- **Pipeline status**
- **Assignee / Reviewer**
- **Last Updated timestamp**

Like GitHub, this tab requires two setup steps, in order: an administrator connects the GitLab integration for the organization, and each user signs in with their own GitLab account. After you authorize access, the tab loads your merge requests, grouped by status. 

If your organization has not configured the GitLab integration, this tab displays an empty state with a prompt to enable it from the GitLab integration tile. For setup steps, see [GitLab Source Code][2]. 

If you have multiple GitLab instances connected within Datadog, use the **Instance** selector to choose which instance to view. 

## Your tickets

The **Your Tickets** section consolidates the items assigned to you across Jira, Linear, and Datadog Work Management, so you can track your open work without leaving the Homepage. Switch between the **Jira**, **Linear**, and **Work Items** tabs to view each source, and use **Display** to change how items are shown.

{{< img src="tracing/software_catalog/your_tickets_table.png" alt="Tickets assigned to the user" style="width:100%;" >}}  

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

An administrator configures the Jira integration and sets up a Jira webhook so that issue events reach Datadog. After setup, your assigned tickets appear automatically. For setup steps, see [Configure a Jira webhook][3].

### Linear

The **Linear** tab lists the Linear issues assigned to you, grouped by status category: **To Do**, **In Progress**, and **Done**. Each issue includes: 

- **Key**
- **Title**
- **Status**
- **Created**
- **Updated**
- **Priority**
- **Due**

An administrator authorizes the Linear integration for the organization. After setup, Datadog detects your assigned issues, and they appear automatically. For setup steps, see [Linear][4]. 

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
[2]: /integrations/gitlab-source-code/
[3]: /integrations/jira/#configure-a-jira-webhook
[4]: /integrations/linear/#configure-a-linear-webhook
[5]: https://app.datadoghq.com/idp/home
[6]: /service_management/case_management
[7]: /actions/app_builder/
[8]: /actions/datadog_apps

