---
title: Reliability Overview
further_reading:
- link: "/tracing/software_catalog/"
  tag: "Documentation"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Engineering Reports are in Preview. TODO: link to sign-up form.
{{< /callout >}}

## Overview

The Reliability Overview report supports aggregated views of SLOs and Incidents to help executive leadership understand your organization's reliability at a glance. With this report, you can:
- Customize your SLO or Incident groupings to be based on service, team, or other tags or properties that have been added to your SLOs or Incidents.
- Use a summary Score, based on the remaining error budget of the underlying SLOs, to understand SLO performance across different groups and identify areas of improvement.
- Explore daily, weekly, and monthly historical reliability trends over the last 12 months to understand performance over time.

Access the Reliability Overview report by clicking on the "Overview" tab in IDP and selecting "Reliability Overview" in the lefthand menu. 

**Note:** If you have not opted into the Datadog IDP Preview, you can access the Reliability Overview report by clicking on the "Reports" tab at the top of the Software Catalog page.


## Interact with your Reliability Overview report

### Adjust your view

You can update your Reliability Overview report view in the following ways:
 
- **Switch the aggregation between "Service" or "Team"**: View your organization's SLO and Incident performance by service/team groupings to identify top- and bottom-performing areas. 

   **Note**: Service/team groupings are based on the `service` or `team` tags from your SLOs and properties from your Incidents.

- **View "Daily", "Weekly", or "Monthly" historical information**: Update the historical SLO and Incident trends to your desired granularity.
- **Apply additional filters to scope the data**: Filter by teams, services, and incident severity and state.

### Schedule reports

Set up scheduled reports for your stakeholders that will be delivered as PDFs through Email or Slack on a recurring basis.

To schedule reports, click on **Schedule Report** in the top right corner (or **Manage Reports** if you've already set up reports). Refer to the [Scheduled Reports documentation][1] for more information.

### Customize your report 

On the upper right corner of the report, click the kebab menu and select **Clone as a Dashboard** to create a dashboard with content from the Reliability Overview report. The dashboard reflects the "team" aggregated view and includes weekly historical trends. 

To customize the dashboard, you can:
- Update the SLO Summary table to group by any tag you have added to your SLOs (for example, you can create a view grouped by "user journey")
- Add widgets that are not included in the default view
- Add filters to the existing widgets (for example, you can filter Incidents based on "Detection Method" not provided in the out-of-the-box report)

### Use the SLO summary score

{{% summary_score %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/sharing/scheduled_reports/



