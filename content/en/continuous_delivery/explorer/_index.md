---
title: Continuous Delivery Visibility Explorer
description: Learn about the CD Visibility Explorer for deployment executions.
further_reading:
- link: "/continuous_delivery/deployments/"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/continuous_delivery/explorer/saved_views"
  tag: "Documentation"
  text: "Learn about Saved Views"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

The [CD Visibility Explorer][4] allows you to [search and filter](#search-and-filter), [analyze](#analyze), [visualize](#visualize), and [export](#export) deployment executions at multiple levels using any tag.

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="Deployment execution results appearing in the CD Visibility Explorer" width="100%" >}}

## Search and filter

You can narrow down, broaden, or shift your focus on a subset of deployment executions by clicking on the facets to the left or writing your own custom query in the search bar. When you select and deselect facets, the search bar automatically reflects your changes. Similarly, you can modify the search bar query or write a query from scratch in the search bar to select and deselect the facets on the left.

- To learn how to search for deployment executions, see [Search and Manage][1].
- To learn how to create queries, see [Search Syntax][2].

## Analyze

To derive or consolidate information, group your queried deployment executions into higher-level entities such as fields, patterns, and transactions. [Facets][3] are not required to search for attributes, but you can use facets to accomplish the following actions:

- Search and keep track of the progress of deployments in your environments.
- Investigate every deployment result to identify and troubleshoot failing deployments.

## Visualize

Select a visualization type to display the outcomes of your filters and aggregations, and better understand your deployment executions. For example, you can view your deployment results in a list to organize your deployment data into columns. Or, view deployment results in a timeseries graph to measure your deployment data over time.

## Export

Export your [view][5] in the [CD Visibility Explorer][4] to reuse it later or in different contexts.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_delivery/search
[2]: /continuous_delivery/explorer/search_syntax
[3]: /continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /continuous_delivery/explorer/saved_views
