---
title: Overview Pages
further_reading:
- link: "actions/app_builder"
  tag: "Documentation"
  text: "Learn more about App Builder"
---

## Overview

Datadog's Internal Developer Platform (IDP) ships with **overview pages** that surface the information most relevant to each stakeholder:

- **Developers** see their open tickets, pull-request queues, and team's service information.
- **SREs** and **engineering managers** track metrics like product reliability, service health, and scorecard performance.

{{< callout url="#" btn_hidden="true" header="false" >}}
The Developer Landing Page is in Preview. Request access [here][LINK].
{{< /callout >}}

## Developer overview page

The **developer overview page** centralizes information from different platforms so you can view and manage your team and services in one place. The overview page includes:
- Your team's Monitors, Incidents, and SLOs
- Your Jira tickets and GitHub PRs
- Your team's Services and Scorecard performance
- Your Issues, Errors, and Watchdog alerts

### Getting started

Find the developer overview page by clicking on the **Overview** tab in IDP and selecting **My Workspace** in the lefthand menu. 

1. **Connect data sources**: Choose **+ Connect data** to link Jira, GitHub, and Datadog. The widgets show demo data until you complete this step. 
1. **Set page filters**: Provide values for the page-level filters. These filters persist when you return to **My Workspace**. 
   - **Team**: Name of your [Datadog Team][8] 
   - **Github_Org**: Name of your GitHub Organization
   - **Github_Team**: Name of your GitHub Team
   - **Github_Username**: Your GitHub username
1. **(Optional) Customize your view**: Select **Clone as dashboard** to add or remove widgets, embed third-party data, or edit the layout. For example, you can:
   - Create a widget to PagerDuty on call information. 
   - Add a Note widget to create an "announcements" section at the top of the page to capture important updates for your organization.
   
   See the [Embedded Apps][2] documentation to learn more about creating widgets.

### Page features

#### Monitors, incidents, and SLOs

Shows live signals from Datadog [Monitors][6], [Incident Management][3], and [SLOs][7]. Widgets remain empty until those products are enabled.

#### Jira Tickets

Lists open Jira issues assigned to your email. Tickets with the status **Done** are excluded.

#### GitHub PRs

- **My open PRs** — Pull requests you have opened.  
- **My assigned PRs** — Pull requests you are assigned to review.
- **My team's PRs** — Pull requests opened by teammates in the selected GitHub team.

#### Team services and scorecard performance

- **My team's services** — Lists services owned by the selected **Team** filter.  
- **Scorecard performance by service** — Displays the average score across all scorecards for each service.

#### Issues and Errors Watchdog alerts

Surfaces issues and errors detected by [Datadog Incidents][3] and [Error Tracking][4]. Widgets remain empty until these products are enabled.

#### Watchdog alerts

Captures alerts from [Datadog Watchdog][5].

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

