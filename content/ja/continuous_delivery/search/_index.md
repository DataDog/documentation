---
description: Learn how to search and manage your deployments.
further_reading:
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Search and filter pipeline executions
title: Search and Manage Deployments
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

The [**Deployments** page][1] is useful for developers who want to keep an eye on the deployments for their environments.

{{< img src="/continuous_delivery/search/deployments.png" text="The Deployments page in Datadog" style="width:100%" >}}

Access high-level accumulation and trends, including:

- An overview of the health of the whole environment, with aggregated stats for deployment executions.
- A window for spotting and fixing immediate, urgent issues like broken deployments in production.
- How each deployment was executed, over time, and with what results and trends.

## Search for deployments

To see your deployments, navigate to [**Software Delivery** > **CD Visibility** > **Deployments**][1].

The **Deployments** page shows aggregate stats for deployments over the selected time frame, as well as the status of the latest deployment execution. Use this page to see all your deployments and get a view of their health. The Deployments page shows metrics for your environments.

Metrics shown include the number of executions and failures, the failure rate, the median duration, and the 95th percentile duration. This information reveals which deployments are high-usage and potentially high resource consumers. The last deployment result, duration, and last status shows you the effect of the latest changes.

<div class="alert alert-info">Partial deployment executions are excluded from the statistics aggregation to avoid incorrect measures. You can use the Partial Deployment facet to search for these deployments: <code>@deployment.partial_deployment:*</code>.</div>

You can filter the page by deployment name to see the deployments you're most concerned with. Click on a deployment that is slow or failing to dig into details that show what commit might have introduced the failure.

## Deployment details and executions

Click into a specific deployment to see the **Deployment**page, which provides views of the data for the deployment you selected over a specified time frame.

{{< img src="continuous_delivery/search/deployments_page.png" alt="Deployment page for a single deployment" style="width:100%;">}}

Get insights on the selected deployment such as the number of successful and failed deployments over time, the average deployment duration, number of rollbacks, and the failure rate. There are also summary tables for deployment executions so you can sort them in terms of name, environment, duration, or rollback status.

The deployment executions list shows all the times that a deployment ran during the selected time frame, for the selected environment. Use the facets on the left side to filter the list to the deployment execution you want to see, and click on an execution to see additional details on the Deployment Details side panel.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployment Details side panel on the Deployments page" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments