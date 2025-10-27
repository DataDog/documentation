---
title: Scorecards Performance
aliases:
- /software_catalog/eng_reports/scorecards_performance
further_reading:
- link: "software_catalog/scorecards/"
  tag: "Documentation"
  text: "Datadog Scorecards"
- link: "dashboards/"
  tag: "Documentation"
  text: "Datadog Dashboards"
---

## Overview

The Scorecards Performance report includes an organization-wide view of Scorecard performance by teams and rules, including historical trends. With this report, you can:
- Identify highest and lowest performing teams by Scorecards and rules. 
- Filter information based on team, scorecard, rule, application, tier, and lifecycle.
- Explore historical info for the last 12 months to identify trends over time.

Access the Scorecards Performance report by searching for "Engineering Reports" (or clicking on the **Overview** tab in IDP) and selecting **Scorecards Performance** in the left-hand menu. 

{{< img src="tracing/eng_reports/scorecards-landing2.png" alt="Default view of the Scorecards Performance report, with the Performance by Scorecard sub-section visible" style="width:100%;" >}} 

## Interact with your Scorecard Performance report

### Adjust your view

{{< img src="tracing/eng_reports/scorecards-filtered2.png" alt="Scorecard Performance report with an arrow highlighting the filtering options" style="width:100%;" >}} 

By default, the Scorecards Performance report breaks down data by team, which allows you to identify the highest- and lowest-performing teams across all Scorecards, specific Scorecards, or individual rules.

You can update your Scorecard Performance report view in the following ways:

- **Switch the aggregation between "Service" or "Team"**: View your organization's Scorecard performance by service/team groupings to identify top- and bottom-performing areas. 
- **Add filters to scope the data**: Filter by teams, services, scorecards, rules, systems, tiers, and lifecycles.

**Note**: The data in the Scorecards Performance report reflects information for active Scorecard rules at any point in time. This means you will see historical information for rules that are now disabled. 

### Schedule reports

Set up scheduled reports for your stakeholders that are delivered as PDFs through email or Slack on a recurring basis.

To schedule reports, click on **Schedule Report** in the top right corner (or **Manage Reports** if you've already set up reports). Refer to the [Scheduled Reports documentation][1] for more information.

### Customize your report

On the upper right corner of the report, click the three-dot menu and select **Clone as a Dashboard** to create a dashboard with content from the Scorecards Performance report. The dashboard reflects the "team" aggregated view. 

To customize the dashboard, you can:
- Update the Scorecard leaderboard view to aggregate by dimensions other than team or service (for example, you can create a leaderboard view by "system" or "tier")
- Add widgets that are not included in the default view
- Add filters to the existing widgets

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/dashboards/sharing/scheduled_reports/


