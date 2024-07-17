---
title: Search and Manage Deployments
description: Learn how to search and manage your deployments.
further_reading:
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Search and filter pipeline executions"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## Deployments

To see an overview of your deployments, navigate to [**Software Delivery** > **CD Visibility** > **Deployments**][1].

The [**Deployments** page][1] shows stats aggregated by services and environments over the selected time frame, as well as the status of the latest deployment execution. Use this page to see all your service deployments and get a view of their health.
The metrics shown include the number of executions and failures, the failure rate, the median duration, and the 95th percentile duration. This information reveals which deployments have a higher probability of failure and which deployments are taking the most time to be executed. The effect of the latest changes can be seen by checking the status, revision and time of the last deployment result.

<div class="alert alert-info">Deployments without services configured and partial deployment executions are excluded from the statistics aggregation of the Deployments page. You can search for these deployments in the Deployment Executions page: <code>@deployment.partial_deployment:* OR -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="The Deployments page in Datadog" style="width:100%" >}}

If you have different ways of deploying a service to an environment, you can expand the deployment rows to see stats further filtered by deployment name.

The **Deployment** page provides you high-level information, including:

- An overview of the health of the different services and environments, with aggregated stats.
- A window for spotting and fixing immediate, urgent issues like broken deployments in production.
- How each service deployment was executed, over time, and the results and trends.

## Deployment details

Click into a specific service deployment to see the **Deployment Details** page, which provides views of the data for the service deployment you selected over a specified time frame.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Deployment page for a single deployment" style="width:100%;">}}

Get insights on the selected service deployment such as the number of successful and failed deployments over time, the average deployment duration, number of rollbacks, and the failure rate. The bottom part of the page shows a table with the deployment executions for the service, based on the environment filter selected.

## Deployment executions

The [**Deployment Executions** page][2] shows all the times that a deployment ran during the selected time frame. Use the facets on the left side to filter the list of deployment executions, and click on an execution to see additional details on the Deployment Execution Details side panel.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployment Details side panel on the Deployments page" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments
[2]: https://app.datadoghq.com/ci/deployments/executions
