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

The **SLO Summary** widget in the OOTB dashboard includes a "Score". It is designed as a summary metric for executive leadership to understand the performance of a group of SLOs. The Score is calculated based on the average remaining error budget of the underlying SLOs, which is then mapped to a score between 0 - 100:

- The Score is "passing" (green/yellow) when most SLOs are **not** breached and have remaining error budget
- The Score is "failing" (red) when many SLOs are out of error budget or a few SLOs are far out of error budget
- SLOs in the "No Data" state are not considered in the Score

#### Score calculation details

The Score is calculated as follows:
- Average the remaining error budget of the SLOs (the minimum error budget is set to -200%, so any SLO with a lower error budget will be counted as -200% in the average)
- The average error budget (between -200 and 100) is mapped to a Score between 0 and 100
- The color and status of the Score is set based on the thresholds below

Note that an average remaining error budget of 0% corresponds to a Score value of 66.667. The Score's status and color is based on the following thresholds:
- **Red:** 0 ≤ Score < 66.667
- **Yellow:** 66.667 ≤ Score < 80
- **Green:** 80 ≤ Score ≤ 100

### Customize your SLO performance summary dashboard

To customize your SLO Performance Summary Dashboard, click **Configure** in the dashboard and select **Clone dashboard**. The default dashboard is configured based on the `service` tag that's been added to SLOs. You can update the dashboard to be based on any [SLO tag][3] by taking the following steps:

- Update the configuration for every widget in the default dashboard to use your desired tag, instead of `service`
- Add a [template variable][4] based on your desired tag (or replace the existing `service` template variable)


For instance, if you have added a `journey` tag to your SLOs, you can clone the SLO Performance Summary Dashboard and customize it to be based on the `journey` tag:

{{< img src="service_management/service_level_objectives/ootb_dashboard/slo-dashboard-flow.mp4" alt="OOTB SLO Dashboard by Journey Tag" video=true style="width:80%;" >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/slo
[3]: /service_management/service_level_objectives/#slo-tags
[4]: /dashboards/template_variables/#add-a-template-variable
