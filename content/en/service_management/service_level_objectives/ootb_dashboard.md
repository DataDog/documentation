---
title: OOTB SLO Performance Summary Dashboard
further_reading:
- link: "service_management/service_level_objectives/"
  tag: "Documentation"
  text: "Overview of Service Level Objectives"
---

{{< jqmath-vanilla >}}

## Overview

The Out-of-the-Box (OOTB) SLO Performance Summary Dashboard supports aggregated views of SLOs to help engineering leadership understand your organization's reliability at a glance. With this dashboard, you can:

- Customize your SLO groupings to be based on service, team, user journey, or any other tag that has been added to your SLOs.
- Use a summary Score, based on the remaining error budget of the underlying SLOs, to understand SLO performance across different groups and identify areas of improvement.

{{< callout url="http://datadoghq.com/private-beta/ootb-slo-dashboard/" btn_hidden="false" header="Try Out the OOTB SLO Dashboard">}}
The OOTB SLO Performance Dashboard is in Private Beta. Complete the form to request access.
{{< /callout >}}

Access your OOTB SLO Dashbord by filtering for `SLO Performance Summary` in the search query of the [**Dashboard List**][1] or by clicking on the **Analytics** button on the top right corner of the [SLO status page][2].

{{< img src="service_management/service_level_objectives/ootb_dashboard/slo-default-ootb-dashboard.png" alt="Default OOTB SLO Dashboard by Service Tag" >}}

## Interact with your OOTB SLO dashboard

By default, the OOTB dashboard is based on the `service` tag added to your SLOs. This allows you to view your organization's SLO performance by service groupings to understand which services are performing best and worst. 

### Summary score

The **SLO Summary** widget in the OOTB dashboard includes a "Score". It is designed as a summary metric for engineering leadership to understand the performance of a group of SLOs. The Score is calculated based on the average remaining error budget of the underlying SLOs, which is then mapped to a score between 0 - 100:

- The Score is "passing" (green/yellow) when most SLOs are **not** breached and have remaining error budget
- The Score is "failing" (red) when many SLOs are out of error budget or a few SLOs are far out of error budget
- SLOs in the "No Data" state are not considered in the Score

### Customize your OOTB SLO dashboard

To customize your OOTB SLO dashboard, click **Configure** in the dashboard and select **Clone dashboard**. The default OOTB dashboard is configured based on the `service` tag that's been added to SLOs. You can update the dashboard to be based on any [SLO tag][3] by taking the following steps:

- Update the configuration for every widget in the default OOTB dashboard to use your desired tag, instead of `service`
- Add a [template variable][4] based on your desired tag (or replace the existing `service` template variable)


For instance, if you have added a `journey` tag to your SLOs, you can clone the OOTB dashboard and customize it to be based on the `journey` tag:

{{< img src="service_management/service_level_objectives/ootb_dashboard/slo-dashboard-by-journey.mp4" alt="OOTB SLO Dashboard by Journey Tag" video=true style="width:80%;" >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/slo
[3]: /service_management/service_level_objectives/#slo-tags
[4]: /dashboards/template_variables/#add-a-template-variable
