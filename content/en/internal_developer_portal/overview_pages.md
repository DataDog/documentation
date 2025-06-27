---
title: Overview Pages
aliases:
- /software_catalog/overview_pages
further_reading:
- link: "actions/app_builder"
  tag: "Documentation"
  text: "App Builder"
- link: "monitors/"
  tag: "Documentation"
  text: "Datadog Monitors"
- link: "service_management/incident_management/"
  tag: "Documentation"
  text: "Incident Management"
- link: "service_management/service_level_objectives/"
  tag: "Documentation"
  text: "Service Level Objectives"
- link: "error_tracking"
  tag: "Documentation"
  text: "Error Tracking"
- link: "watchdog"
  tag: "Documentation"
  text: "Watchdog"
site_support_id: overview_pages
---

{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" d_target="#signupModal" btn_hidden="false" header="Join the Preview for the Developer Overview Page!" >}}
{{< /callout >}}

## Overview

Datadog's Internal Developer Platform (IDP) ships with **overview pages** that surface the information most relevant to each stakeholder:
- Developers get a centralized view of their action items, issues, and team's service information.
- SREs and engineering managers get a big-picture view of product reliability, service health, scorecard performance, and other key metrics across their teams. 

## Developer overview page

{{< img src="tracing/eng_reports/developer-overview-page.png" alt="The developer overview page in the My Workspace section of Internal Developer Portal, with an Overview showing high-level alert, incident, and SLO metrics, and a My Tasks section showing JIRA tickets" style="width:100%;" >}}

The developer overview page centralizes the following information about your team and services:
- Your team's Monitors, Incidents, and SLOs
- Your GitHub PRs
- Your team's Services and Scorecard performance
- Your Issues, Errors, and Watchdog alerts

### Using the developer overview page

#### Get started

The "My Pull Requests" widget displayed on the developer overview page are powered by [Datadog App Builder][9] and initially show demo data.

To use the developer overview page with your data, [connect your data sources][10]:
1. Find the developer overview page by selecting the **Overview** tab in IDP and selecting **My Workspace** in the left-hand menu. 
1. For this widget:

   1. Click **+ Connect Data**.
   1. Create a new connection or select an existing one. 
   
   <br>
   After you save your selection, the widget displays data from your connection. You can change the selected connection by clicking Change Connection in the widget.

<div class="alert alert-info">Connecting data is a one-time setup task; the selected connections apply for your entire team.</div>
   
#### Personalize your view

Provide values for the filters at the top of the page to personalize your view:
- **Team**: Name of your [Datadog Team][8] 
- **Github_Org**: Name of your GitHub Organization
- **Github_Username**: Your GitHub username

<div class="alert alert-info">These filter values persist when you return to "My Workspace".</div>

### Page features

The following widgets are included by default on the developer overview page.

#### Monitors, incidents, and SLOs

Shows live signals from Datadog [Monitors][6], [Incident Management][3], and [SLOs][7]. Widgets remain empty until these products are enabled.

#### GitHub pull requests

Lists open pull requests that you have created and those you are assigned to review, based on the GitHub organization and username you've provided.

#### Team services and scorecard performance

- **My team's services**: Lists services owned by the selected **Team** filter.  
- **Scorecard performance by service**: Displays the average score across all scorecards for each service owned by the selected **Team** filter.

#### Issues and errors

Surfaces issues and errors detected by [Datadog Incidents][3] and [Error Tracking][4]. Widgets remain empty until these products are enabled.

#### Watchdog alerts

Captures alerts from [Datadog Watchdog][5].

### Clone for further customization

If you need to customize your view, click **Clone as dashboard** at the top right hand side. This creates a dashboard prefilled with content from the **My Workspace** page. 

Here are some example customizations you can make with the cloned dashboard:
- Create [Embedded Apps][2] using Datadog's [Action Catalog][11] to display additional third-party data (for example, display PagerDuty on call information).
- Update the overall layout and design of your view by resizing, rearranging, and adding/removing [widgets][12].
- Use a [Note][13] widget to add an announcement and updates section with relevant information for your organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/app_builder
[2]: /actions/app_builder/embedded_apps/
[3]: /service_management/incident_management/
[4]: /error_tracking/
[5]: /watchdog/
[6]: /monitors/
[7]: /service_management/service_level_objectives/
[8]: /account_management/teams/
[9]: /actions/app_builder/#apps-created-by-datadog
[10]: /actions/connections
[11]: /actions/actions_catalog/
[12]: /dashboards/widgets/
[13]: /dashboards/widgets/note/

