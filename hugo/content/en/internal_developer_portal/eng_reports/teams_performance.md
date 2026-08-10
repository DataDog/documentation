---
title: Teams Performance
description: Assess team operational health across incident response, SLO performance, and DORA metrics, with filtering by team and team hierarchy. 
further_reading:
- link: "/service_level_objectives/"
  tag: "Documentation"
  text: "Service Level Objectives"
- link: "/incident_response/incident_management/"
  tag: "Documentation"
  text: "Incident Management"
- link: "/delivery_performance/dora_metrics/"
  tag: "Documentation"
  text: "DORA Metrics" 
---

## Overview

The Teams Performance report brings together a team's operational health across incident response, SLO performance, and DORA metrics in a single view. Use it to see how your teams are performing across incidents, reliability, and software delivery without moving between separate products. 

With this report, you can: 
- Assess incident response, SLO performance, and DORA metrics for your teams in one place.
- Break down each domain by team to identify which teams need attention.
- Filter by team and [team hierarchy][1] to focus on your organization or specific subteams.
- Explore trends across the selected time range to catch regressions early.

The Teams Performance report pulls data from Datadog [Incident Management][2], [Service Level Objectives][3], and [DORA Metrics][4]. Each domain populates after its source is set up. 

Access the Teams Performance report by navigating to **Reports** in your Internal Developer Portal and selecting **Teams Performance** in the left-hand emnu. . 

{{< img src="tracing/eng_reports/teams-performance-landing.png" alt="Default view of the Teams Performance report, showing the Incident Response section" style="width:100%;" >}} 

## Interact with your Teams Performance report 

### Adjust your view

You can update your Teams Performance report view in the following ways: 
- **Filter by team**: Scope the report to one or more teams. Managers and directors can filter by [team hierarchy][1] to view aggregated metrics for their organization or focus on specific subteams.
- **Change the time range**: Set the lookback window for statuses and trends using the time selector in the top-right corner.

**Note**: Incidents, SLOs, and services that are not associated with a team appear in the **without teams** and **N/A** groupings. Assign [teams][5] to include them in the per-team breakdown. 


[1]: /account_management/teams/manage/#subteams-hierarchical-teams
[2]: /incident_response/incident_management/
[3]: /service_level_objectives/
[4]: /delivery_performance/dora_metrics/
[5]: /account_management/teams/
