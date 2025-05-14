---
title: Overview Pages
further_reading:
- link: "actions/app_builder"
  tag: "Documentation"
  text: "Learn more about App Builder"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
The Developer Landing Page is in Preview. Request access [here][LINK].
{{< /callout >}}

## Overview

Datadog's Internal Developer Platform (IDP) ships with **overview pages** that surface the information most relevant to each stakeholder:
- **Developers** see their open tickets, pull-request queues, and team's service information.
- **SREs** and **engineering managers** track metrics like product reliability, service health, and scorecard performance.

## Developer overview page

The developer overview page centralizes the following information about your team and services:
- Your team's Monitors, Incidents, and SLOs
- Your Jira tickets and GitHub PRs
- Your team's Services and Scorecard performance
- Your Issues, Errors, and Watchdog alerts

### Using the developer overview page 

#### Getting started

Before your team can use the developer overview page, a platform admin must connect the page widgets to data sources:

1. Find the developer overview page by selecting the **Overview** tab in IDP and selecting **My Workspace** in the left-hand menu. 
1. Select `+ Connect data` on each widget to link Jira, GitHub, and Datadog. The widgets show demo data until you complete this step. 

#### Personalizing your view

Provide values for the page-level filters to tailor the developer overview page to your username and team: 
- **Team**: Name of your [Datadog Team][8] 
- **Github_Org**: Name of your GitHub Organization
- **Github_Team**: Name of your GitHub Team
- **Github_Username**: Your GitHub username

**Note**: These filters persist when you return to **My Workspace**. 

#### Clone for further customization

If the developer overview page doesn't meet your workflow needs, you can clone the page to create a customizable dashboard outside of the IDP overview page.

1. Select **Clone as dashboard** to create a customizable dashboard.
1. Edit the dashboard: add or remove widgets, embed third-party data, or edit the layout. For example:
   - Create a widget to capture PagerDuty on call information. 
   - Add a Note widget to create an "announcements" section at the top of the page to capture important updates for your organization.
   
   See the [Embedded Apps][2] documentation to learn more about creating widgets.

### Default widgets

The following widgets are included by default on the developer overview page.

#### Monitors, incidents, and SLOs

Shows live signals from Datadog [Monitors][6], [Incident Management][3], and [SLOs][7]. Widgets remain empty until these products are enabled.

#### Jira Tickets

Lists open Jira issues assigned to your email. Tickets with the status **Done** are excluded.

#### GitHub PRs

- **My open PRs** — Pull requests you have opened.  
- **My assigned PRs** — Pull requests you are assigned to review.
- **My team's PRs** — Pull requests opened by teammates in the selected GitHub team.

#### Team services and scorecard performance

- **My team's services** — Lists services owned by the selected **Team** filter.  
- **Scorecard performance by service** — Displays the average score across all scorecards for each service.

#### Issues and Errors

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

