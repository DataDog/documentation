---
title: Metric Correlations
kind: documentation
aliases:
    - /graphing/correlations/
further_reading:
- link: "/dashboards/"
  tag: "Documentation"
  text: "Datadog Dashboards"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Datadog Notebooks"
- link: "/tracing/visualization/service/"
  tag: "Documentation"
  text: "APM Service Page"
- link: "/watchdog/"
  tag: "Documentation"
  text: "Watchdog"
---

## Overview

Metric Correlations can help you find potential root causes for an observed issue by searching for other metrics that exhibited irregular behavior around the same time. Correlations scans your metrics from different sources such as dashboards, integrations, APM, and custom metrics.

## Search

You can start your metric correlations exploration from any of your dashboards, notebooks, APM, Watchdog stories, or monitor status pages.

* Left click on any graph and select **Find correlated metrics**.
* From a full-screen graph, click the **Correlations** tab.
* Correlations *tries* to automatically detect the area of interest (anomalous behavior) for your metric.
* If the area of interest is not selected automatically or needs adjustment, you can manually draw the area of interest from the [edit search](#edit) option.
* Datadog searches for other metrics that exhibited anomalous behavior in a time aligned with the area of interest.

{{< img src="dashboards/correlations/dashboard_search1.png" alt="Dashboard search" style="width:80%;">}}

{{< img src="dashboards/correlations/dashboard_search2.png" alt="Dashboard search" style="width:80%;">}}

**Note**: Correlation searches are available for a single metric. For graphs with multiple metrics, select the series of interest. From a full-screen graph, select one series on the graph legend, then click the **Correlations** tab.

### Edit

You can customize the default search parameters by clicking the **Edit Search** button, or by clicking on the graph.

* Click and drag on the graph to set the timeframe for your correlations search. If an area is already selected (pink box), you can move or resize the selection.
* Define the sources you want correlations to search from (APM services, integrations, dashboards, or custom metrics).
* `Auto-select` or `Custom select` from specific categories. For custom metrics, at least one selection is required.
* Custom metrics is the only category not selected by default. Choose metric namespaces or single metrics to search correlations upon.
* Use the tag filter box to scope the search by a tag.

{{< img src="dashboards/correlations/edit_search.png" alt="Edit search" style="width:80%;">}}

### Results

A list of search results is displayed below the search graph with the following:

* **Type**: A graphic representing the source type (APM service, integration, dashboard, or custom metric).
* **Source**: The name of the source for the correlated metrics.
* **Correlations**: The number of correlated metrics found.
* **Preview**: A preview graph of the correlated metrics.

{{< img src="dashboards/correlations/search_results.png" alt="Search results" style="width:80%;">}}

As results load, you can explore the details without waiting for all results. When the search is finished, the message "Search completed!" appears.

## Investigate

Select a row from the results list to investigate the details.

* Similar to dashboards, hovering over a graph creates a time-synced line on all other graphs.
* To view all sources, remove the filter in the menu.
* Sources for each metric are linked by name. For example, dashboard names link to the dashboard.
* Use the export icon to export the graph to a dashboard, notebook, or copy the query.

{{< img src="dashboards/correlations/detail_view.png" alt="Detail view" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
