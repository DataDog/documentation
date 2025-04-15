---
title: SLO Performance Dashboard for Leadership
further_reading:
- link: "service_management/service_level_objectives/"
  tag: "Documentation"
  text: "Overview of Service Level Objectives"
---

{{< jqmath-vanilla >}}

## Overview

The SLO Performance Summary Dashboard supports aggregated views of SLOs to help executive leadership understand your organization's reliability at a glance. With this out-of-the-Box (OOTB) dashboard, you can:

- Customize your SLO groupings to be based on service, team, user journey, or any other tag that has been added to your SLOs.
- Use a summary Score, based on the remaining error budget of the underlying SLOs, to understand SLO performance across different groups and identify areas of improvement.

<div class="alert alert-info">The SLO Performance Summary Dashboard is in Preview.</div>

Access your OOTB SLO Performance Summary Dashboard by filtering for `SLO Performance Summary` in the search query of the [**Dashboard List**][1] or by clicking on the **Analytics** button on the top right corner of the [SLO status page][2].

{{< img src="service_management/service_level_objectives/ootb_dashboard/slo-ootb-dashboard.png" alt="Default OOTB SLO Dashboard by Service Tag" >}}

## Interact with your SLO performance summary dashboard

By default, the SLO Performance Summary Dashboard is based on the `service` tag added to your SLOs. This allows you to view your organization's SLO performance by service groupings to understand which services are performing best and worst. 

### Summary score

{{% dashboards/summary_score %}}

### Customize your SLO performance summary dashboard

{{% dashboards/customize_slo_perf_summary_db %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/slo
[3]: /service_management/service_level_objectives/#slo-tags
[4]: /dashboards/template_variables/#add-a-template-variable
