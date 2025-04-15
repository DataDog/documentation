---
title: Reliability Overview
further_reading:
- link: "/tracing/software_catalog/"
  tag: "Documentation"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Eng Reports are in Preview/LA (link to preview signup form if needed, link to form to gather feedback on other report types customers want)
{{< /callout >}}

## Overview

The Reliability Overview report supports aggregated views of SLOs and Incidents to help executive leadership understand your organization's reliability at a glance. With this report, you can:
- Customize your SLO or Incident groupings to be based on service, team, or other tags or properties that have been added to your SLOs or Incidents.
- Use a summary Score, based on the remaining error budget of the underlying SLOs, to understand SLO performance across different groups and identify areas of improvement.
- Explore daily, weekly, and monthly historical reliability trends over the last 12 months to understand performance over time.

Access the Reliability Overview report by clicking on the "Overview" tab in IDP and selecting "Reliability Overview" in the lefthand menu. 

**Note:** If you have not opted into the Datadog IDP Preview, you can access the Reliability Overview report by clicking on the "Reports" tab at the top of the Software Catalog page.


## Interact with your Reliability Overview report

By default, the Reliability Overview report aggregates data by service or team, using the `service` or `team` tags from your SLOs and properties from your Incidents. This allows you assess SLO performance across service or team groupings to identify top- and bottom-performing areas.

### Summary score

{{% dashboards/summary_score %}}

### Customize your dashboard

{{% dashboards/customize_slo_perf_summary_db %}}

### Schedule reports
You can set up scheduled reports for your stakeholders that will be delivered via Email or Slack on a recurring basis. Refer to the Scheduled Reports documentation for more information.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


