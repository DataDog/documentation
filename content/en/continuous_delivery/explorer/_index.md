---
title: Explore CD Visibility Deployments
description: Learn about how to query and visualize CD Visibility deployments.
further_reading:
- link: "/continuous_delivery/features"
  tag: "Documentation"
  text: "Learn about CD Visibility Features"
- link: "/continuous_delivery/deployments/"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/continuous_delivery/explorer/saved_views"
  tag: "Documentation"
  text: "Learn about Saved Views"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview!" >}}
CD Visibility is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

## Deployments

To see an overview of your deployments, navigate to [**Software Delivery** > **CD Visibility** > **Deployments**][6].

The [**Deployments** page][6] shows stats aggregated by services and environments over the selected time frame, as well as the status of the latest deployment execution. Use this page to see all your service deployments and get a view of their health.
The metrics shown include the number of executions and failures, the failure rate, the median duration, and the 95th percentile duration. This information reveals which deployments have a higher probability of failure and which deployments are taking the most time to be executed. The effect of the latest changes can be seen by checking the status, revision and time of the last deployment result.

<div class="alert alert-info">Deployments with no services configured and partial deployment executions are excluded from the statistics aggregation of the Deployments page. You can search for these deployments in the Deployment Executions page: <code>@deployment.partial_deployment:* OR -@deployment.service:*</code>.</div>

{{< img src="/continuous_delivery/search/deployments_2.png" text="The Deployments page in Datadog" style="width:100%" >}}

If you have different ways of deploying a service to an environment, you can expand the deployment rows to see stats further filtered by deployment name.

The **Deployment** page provides you high-level information, including:

- An overview of the health of the different services and environments, with aggregated stats.
- A window for spotting and fixing immediate, urgent issues like broken deployments in production.
- How each service deployment was executed, over time, and the results and trends.

### Deployment details

Click into a specific service deployment to see the **Deployment Details** page, which provides views of the data for the service deployment you selected over a specified time frame.

{{< img src="continuous_delivery/search/deployments_page_2.png" alt="Deployment page for a single deployment" style="width:100%;">}}

Get insights on the selected service deployment such as the number of successful and failed deployments over time, the average deployment duration, number of rollbacks, and the failure rate. The bottom part of the page shows a table with the deployment executions for the service, based on the environment filter selected.

## Deployment executions

The [**Deployment Executions** page][4] shows all the times that a deployment ran during the selected time frame. Use the facets on the left side to filter the list of deployment executions, and click on an execution to see additional details on the Deployment Execution Details side panel.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployment Details side panel on the Deployments page" style="width:100%;">}}

When a deployment is correctly associated to a pipeline in CI Visibility, the deployment executions panel contains a new **Pipeline** tab from which the pipeline trace is visible. From this tab, you can navigate to CI Visibility by clicking the **View Full Pipeline** link at the top:

{{< img src="ci/cd-ci-correlation-pipeline-tab.png" alt="Deployment executions panel with Pipeline tab" style="width:100%;">}}

Additional setup might be required to associate a deployment to a CI pipeline. For more information, see the setup page for your CD provider.

The [Deployment Executions page][4] allows you to [search and filter](#search-and-filter), [analyze](#analyze), [visualize](#visualize), and [export](#export) deployment executions at multiple levels using any tag.

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="Deployment execution results appearing in the CD Visibility Explorer" width="100%" >}}

### Search and filter

You can narrow down, broaden, or shift your focus on a subset of deployment executions by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left. To learn how to create queries, see [Search Syntax][2].

### Analyze

To derive or consolidate information, group your queried deployment executions into higher-level entities such as fields, patterns, and transactions. [Facets][3] are not required to search for attributes, but you can use facets to accomplish the following actions:

- Search and keep track of the progress of deployments in your environments.
- Investigate every deployment result to identify and troubleshoot failing deployments.

### Visualize

Select a visualization type to display the outcomes of your filters and aggregations, and better understand your deployment executions. For example, you can view your deployment results in a list to organize your deployment data into columns. Or, view deployment results in a timeseries graph to measure your deployment data over time.

### Export

Export your [view][5] in the [Deployment Executions page][4] to reuse it later or in different contexts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_delivery/search
[2]: /continuous_delivery/explorer/search_syntax
[3]: /continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /continuous_delivery/explorer/saved_views
[6]: https://app.datadoghq.com/ci/deployments
