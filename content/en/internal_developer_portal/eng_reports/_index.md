---
title: Engineering Report
further_reading:
- link: "/service_level_objectives/"
  tag: "Documentation"
  text: "Service Level Objectives"
- link: "/incident_response/incident_management/"
  tag: "Documentation"
  text: "Incident Management"
- link: "software_catalog/scorecards/"
  tag: "Documentation"
  text: "Datadog Scorecards"
- link: "/dora_metrics"
  tag: "Documentation"
  text: "DORA Metrics"
- link: "https://www.datadoghq.com/blog/idp-engineering-reports/"
  tag: "Blog"
  text: "Track engineering metrics with customizable, executive-ready reports in Datadog's IDP"
---

## Overview

Engineering Reports provide you with out-of-the-box, executive-level reports on product reliability, adherence to engineering standards, DORA metrics, and more. You can use these reports to uncover key insights, identify gaps, and drive improvements across your organization. The reports include aggregated views of key engineering metrics that are well suited for directors and executive leadership.

Managers and directors who oversee multiple teams can filter reports by [team hierarchies][1] to view aggregated metrics for their organization or focus on specific subteams.

{{< img src="tracing/internal_developer_portal/team-hierarchy-filter-with-report.png" alt="The DORA report with a filter dropdown showing a hierarchical team structure and a subset of subteams selected" style="width:100%;" >}}

Datadog's IDP supports two types of reports:
- **Out-of-the-box (OOTB) Engineering Reports**: Reports designed by Datadog that let you assess engineering metrics across your organization
- [**Custom Reports**][2]: Any Datadog Dashboards that your organization has added to your IDP Overview Page

{{< whatsnext desc="Explore the following OOTB Engineering Reports:" >}}
    {{< nextlink href="/software_catalog/eng_reports/reliability_overview/" >}}Reliability Overview: Summary of your organization's reliability based on SLO performance and Incident trends.{{< /nextlink >}}
    {{< nextlink href="/software_catalog/eng_reports/scorecards_performance" >}}Scorecards Performance: Organization-wide view of Scorecard performance broken down by teams and rules.{{< /nextlink >}}
    {{< nextlink href="/software_catalog/eng_reports/dora_metrics" >}}DORA Metrics: Software development velocity and stability metrics broken down by services and teams.{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/teams/manage/#subteams-hierarchical-teams
[2]: /internal_developer_portal/eng_reports/custom_reports

