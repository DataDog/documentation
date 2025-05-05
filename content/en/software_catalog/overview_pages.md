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

1. Find the developer overview page by clicking on the **Overview** tab in IDP and selecting **My Workspace** in the lefthand menu. 
1. Choose **+ Connect data** to link Jira, GitHub, and Datadog. The widgets, powered by [Datadog App Builder][1], show demo data until you complete this step. 
1. 

Each user must provide values for the 4 filters at the top of the overview page to customize their view:
- Team: Name of your Datadog Team 
- Github_Org: Name of your GitHub Organization
- Github_Team: Name of your GitHub Team
- Github_Username: Your GitHub username

Note: Once you set the filter values, they will persist when you return to "My Workspace". 

### Page features

#### Monitors, incidents, and SLOs

This information is based on Datadog Monitors, Incident, and SLOs. If you are not yet using these Datadog products, this information will not be populated.

#### Jira Tickets

The “My Jira Tickets” widget displays open Jira tickets that are assigned to you based on your email. Tickets with a status of “Done” are filtered out. 

#### GitHub PRs

- “My Open PRs” shows open PRs that you have created. “My Assigned PRs” shows open PRs where you’re a reviewer. Both of these widgets show all PRs across your GitHub organization. 
- “My Team’s PRs” shows all PRs created by members of your GitHub team based on the dashboard’s time window.

#### Team's services and scorecard performance

“My Team’s Services” and “Scorecard Performance by Service” includes information based on the “Team” filter value you provide. The Score is based on the average score across all Scorecards for each service.

#### Issues and errors

This information is based on Datadog Incidents and Error Tracking. If you are not yet using these Datadog products, this information will not be populated.

#### Watchdog alerts

Refer to Datadog Watchdog docs for more information.

## Customize your developer overview

To customize your view, click the “Clone as Dashboard” button at the top right hand side. This will create a Dashboard with content from the “My Workspace” page. Here are some example customizations you can do with the cloned Dashboard:

- Display additional types of 3rd party data by creating new Embedded Apps using Datadog’s Action Catalog (e.g., display PagerDuty on call info)
- Update the overall layout and design of your view by re-sizing, re-arranging, and adding/removing widgets
- Add an announcement and updates section with relevant information for your organization (using a Note widget)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/app_builder

