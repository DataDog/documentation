---
title: Reliability Overview
aliases:
- /software_catalog/eng_reports/reliability_overview/
further_reading:
- link: "/service_management/service_level_objectives/"
  tag: "Documentation"
  text: "Service Level Objectives"
- link: "service_management/incident_management/"
  tag: "Documentation"
  text: "Incident Management"
- link: "dashboards/"
  tag: "Documentation"
  text: "Datadog Dashboards"
---

## Overview

The Reliability Overview report supports aggregated views of SLOs and Incidents to help executive leadership understand your organization's reliability at a glance. With this report, you can:
- Customize your SLO or Incident groupings to be based on service, team, or other tags or properties that have been added to your SLOs or Incidents.
- Use a summary score, based on the remaining error budget of the underlying SLOs, to understand SLO performance across different groups and identify areas of improvement.
- Explore daily, weekly, and monthly historical reliability trends over the last 12 months to understand performance over time.

Access the Reliability Overview report by searching for "Engineering Reports" (or clicking on the**Overview** tab in IDP) and selecting **Reliability Overview** in the left-hand menu. 

{{< img src="tracing/eng_reports/reliability-overview-landing2.png" alt="Default view of the Reliability Overview report, which shows SLO Performance data" style="width:100%;" >}} 

## Interact with your Reliability Overview report

### Adjust your view

{{< img src="tracing/eng_reports/reliability-overview-filtered2.png" alt="Reliability Overview page with an arrow highlighting the filtering options" style="width:100%;" >}} 

You can update your Reliability Overview report view in the following ways:
 
- **Switch the aggregation between "Service" or "Team"**: View your organization's SLO and Incident performance by service/team groupings to identify top- and bottom-performing areas. 

   **Note**: Service/team groupings are based on the **service** or **team** tag added to your SLOs, and the **services** or **teams** properties added to your Incidents.

- **View daily, weekly, or monthly historical information**: Update the historical SLO and Incident trends to your desired granularity.
- **Add filters to scope the data**: Filter by teams, services, and incident severity and state.

### Schedule reports

Set up scheduled reports for your stakeholders that are delivered as PDFs through email or Slack on a recurring basis.

To schedule reports, click on **Schedule Report** in the top right corner (or **Manage Reports** if you've already set up reports). Refer to the [Scheduled Reports documentation][1] for more information.

### Customize your report

On the upper right corner of the report, click the three-dot menu and select **Clone as a Dashboard** to create a dashboard with content from the Reliability Overview report. 

To customize the dashboard, you can:
- Update the SLO Summary table to group by any tag you have added to your SLOs (for example, you can create a view grouped by "user journey")
- Add widgets that are not included in the default view
- Add filters to the existing widgets (for example, you can filter Incidents based on "Detection Method")

## Use the SLO summary score

{{< img src="tracing/eng_reports/slo-summary-score2.png" alt="The SLO Summary widget, including the SLO summary score" style="width:100%;" >}}

The **SLO Summary** widget includes a "score". It is designed as a summary metric for executive leadership to understand the performance of a group of SLOs. The score is calculated based on the average remaining error budget of the underlying SLOs, which is then mapped to a score between 0 - 100:

- The score is "passing" (green/yellow) when most SLOs are **not** breached and have remaining error budget.
- The score is "failing" (red) when many SLOs are out of error budget or a few SLOs are far out of error budget.
- SLOs in the "No Data" state are not considered in the score.

### Score calculation details

The score is calculated as follows:

{{< jqmath-vanilla >}}

$$
\text"Average Remaining Error Budget"
      = {∑_{i=0}^{n}\\text"[Remaining Error Budget]"_i} / n
$$

$$
\text"Score"
      = {max(\text"[Average Remaining Error Budget]"\,-200) + 200} / 300 * 100
$$


- Average the remaining error budget of the SLOs (the minimum error budget is set to -200%, so any SLO with a lower error budget will be counted as -200% in the average).
- Map the average error budget (between -200 and 100) to a score between 0 and 100.
- Set the color and status of the score based on the following thresholds:
  - **Red:** 0 ≤ Score < 66.667
  - **Yellow:** 66.667 ≤ Score < 80
  - **Green:** 80 ≤ Score ≤ 100

**Note**: An average remaining error budget of 0% corresponds to a Score value of 66.667. 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/sharing/scheduled_reports/



