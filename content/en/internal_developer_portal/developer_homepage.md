---
title: Developer Homepage
aliases:  
- /software_catalog/developer_homepage  
further_reading:  
- link: "/integrations/github/"  
  tag: "Documentation"  
  text: "Learn about the GitHub Integration"   

---

{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" d_target="#signupModal" btn_hidden="false" header="Join the Preview for Developer Homepage!" >}}
{{< /callout >}}

## Overview

The [Developer Homepage][3] provides a centralized view of your team's entities and your daily tasks.  

With this view, you can:
- View key information about your team's entities, including scorecards, recent deployments, monitors, issues, incidents, dashboards, and on-call status. 
- Track tasks assigned to you across GitHub and Jira.
- Identify alerting monitors or failed deployments.

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

If your organization hasn't configured the GitHub integration, this section displays an empty state with a prompt to enable it from the [GitHub Integration tile][1]. To read PRs from GitHub, this integration requires the following permissions: 
- Members: Read
- Metadata: Read
- Pull Requests: Read
- Contents: Read
- Checks: Read
- Statuses: Read

If you have installed multiple Github Accounts within Datadog, you will need to give users Integrations Read permission with Datadog to toggle between PRs on multiple accounts.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /integrations/github/  
[2]: /integrations/jira/
[3]: https://app.datadoghq.com/idp/overview/developer
