---
title: Search and Manage Deployments 
description: Learn how to search and manage your deployments.
further_reading:
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Search and filter pipeline executions"
---

## Overview

The [Deployments page][1] is useful for developers who want to keep an eye on the deployments for their environments.

{{< img src="/continuous_delivery/search/deployments.png" text="The Deployments page in Datadog" style="width:100%" >}}

This page answers the following questions:

- Are deployments for your environments succeeding?
- If not, what's the root cause?

You can access high-level accumulation and trends, including:

- An overview of the health of the whole environment, with aggregated stats for deployment executions.
- A window to quickly spotting and fixing immediate, urgent issues like broken deployments in production.
- How each deployment was executed, over time, and with what results and trends.
- The breakdown of where time is spent in each deployment, over time, so you can focus your improvement efforts where it makes the biggest difference.

## Search for deployments

To see your deployments, navigate to [**CI** > **Deployments**][1].

The [Deployments page][1] shows aggregate stats for the default branch of each pipeline over the selected time frame, as well as the status of the latest pipeline execution. Use this page to see all your deployments and get a quick view of their health. The Deployments page shows metrics for your environment.

Metrics shown include the number of executions and failures, the failure rate, the median duration, and the 95th percentile duration. This information reveals which deployments are high-usage and potentially high resource consumers. The last deployment result, duration, and last status shows you the effect of the last commit.

You can filter the page by deployment name to see the deployments you're most concerned with. Click on a deployment that is slow or failing to dig into details that show what commit might have introduced the performance regression or failed deployment.

## Deployment details and executions

Click into a specific deployment to see the Deployment page which provides views of the data for the deployment you selected over a specified time frame.

{{< img src="continuous_delivery/search/deployments_page.png" alt="Deployment page for a single deployment" style="width:100%;">}}

Get insights on the selected deployment such as the number of succeeded and failed deployments over time, the average deployment duration, number of rollbacks, and the failure rate. There are also summary tables for deployment executions so you can quickly sort them in terms of name, environment, duration, or rollback status.

The deployment executions list shows all the times that a deployment ran during the selected time frame, for the selected environment. Use the facets on the left side to filter the list to exactly the deployment execution you want to see, and click on an execution to see additional details on the Deployment Details side panel.

{{< img src="continuous_delivery/search/details_side_panel.png" alt="Deployment Details side panel on the Deployments page" style="width:100%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments