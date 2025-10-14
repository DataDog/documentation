---
title: DORA Metrics
aliases:
- /software_catalog/eng_reports/dora_metrics
further_reading:
- link: "/dora_metrics"
  tag: "Documentation"
  text: "Datadog DORA Metrics"
- link: "dashboards/"
  tag: "Documentation"
  text: "Datadog Dashboards"
---

## Overview

The DORA Metrics report includes an organization-wide view of software development velocity and stability metrics, including historical trends. With this report, you can:
- View a breakdown of DORA metrics by service, team, or environment.
- Explore historical info and understand which services and teams are performing best vs. underperforming.
- Filter information based on service, team, repository id, environment, and other tags.
- Leverage monthly Datadog recommendations to improve your organization's software delivery performance.

Access the DORA Metrics report by searching for "Engineering Reports" (or clicking on the **Overview** tab in IDP) and selecting **DORA Metrics** in the left-hand menu. 

{{< img src="tracing/eng_reports/dora-metrics-report.png" alt="Default view of the Scorecards Performance report, with the Performance by Scorecard sub-section visible" style="width:100%;" >}} 

## Interact with your DORA Metrics report

### Adjust your view

By default, the Scorecards Performance report breaks down data by service, which allows you to understand DORA metrics performance across all your services.

You can update your DORA Metrics report view in the following ways:

- **Switch the aggregation grouping**: View your organization's DORA metrics grouped by **Service**, **Team**, or **Env** to identify top- and bottom-performing areas. 
- **Add filters to scope the data**: Filter by service, team, repository id, environment, and other tags.

### Schedule reports

Set up scheduled reports for your stakeholders that are delivered as PDFs through email or Slack on a recurring basis.

To schedule reports, click on **Schedule Report** in the top right corner (or **Manage Reports** if you've already set up reports). Refer to the [Scheduled Reports documentation][1] for more information.

### Customize your report

On the upper right corner of the report, click the three-dot menu and select **Clone as a Dashboard** to create a dashboard with content from the DORA Metrics report. The dashboard reflects the "service" aggregated view. 

To customize the dashboard, you can:
- Change the time frame for widgets showing historical trends
- Add widgets that are not included in the default view
- Add filters to the existing widgets

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/dashboards/sharing/scheduled_reports/


