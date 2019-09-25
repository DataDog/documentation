---
title: Metric Correlations
kind: documentation
further_reading:
- link: "graphing/dashboards"
  tag: "Documentation"
  text: "Datadog Dashboards"
- link: "graphing/notebooks"
  tag: "Documentation"
  text: "Datadog Notebooks"
- link: "/tracing/visualization/service"
  tag: "Documentation"
  text: "APM Service Page"
- link: "/watchdog"
  tag: "Documentation"
  text: "Watchdog"
---

## Overview

Correlations search for related metrics that exhibit irregular behavior around a selected metric. Metric candidates are sourced from integrations, systems, dashboards, APM, and custom metrics.

Correlations are in public beta for all Datadog accounts. No setup is required.

## Search

Search for metric correlations from dashboards, notebooks, APM pages, and Watchdog stories.

* Left click on a graph and select **Find correlated metrics**. Datadog automatically searches an area of the graph.
* From a full screen graph, click the **Correlations** tab and select the timeframe to search.

{{< img src="graphing/correlations/dashboard_search1.png" alt="Dashboard search" responsive="true" style="width:80%;">}}

{{< img src="graphing/correlations/dashboard_search2.png" alt="Dashboard search" responsive="true" style="width:80%;">}}

### Edit

Click the **Edit Search** button to update the default search settings.

* Click and drag on graph to set the timeframe for your correlations search.
* Define where the correlations are from (APM services, integrations, dashboards, or custom metrics).
* `Auto-select` or `Custom select` from specific categories.
* At least one selection is required to search custom metrics.

{{< img src="graphing/correlations/edit_search.png" alt="Edit search" responsive="true" style="width:80%;">}}

### Results

A list of search results is displayed below the search graph with the following:

* **Type**: A graphic representing the source type (APM service, integration, dashboard, or custom metric)
* **Source**: The name of the source for the correlated metrics                               
* **Correlations**: The number of correlated metrics found                                          
* **Preview**: A preview graph of the correlated metrics                                       

{{< img src="graphing/correlations/search_results.png" alt="Search results" responsive="true" style="width:80%;">}}

## Investigate

Select a row from the results list to investigate the details.

* Similar to dashboards, hovering over a graph creates a time-synced line on the other graphs.
* To view all sources, remove the filter in the menu.
* Sources for each metric are linked by name.
* Use the export icon to export the graph to a dashboard, notebook, or copy the query.

{{< img src="graphing/correlations/detail_view.png" alt="Detail view" responsive="true" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
