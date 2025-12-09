---
title: Metrics Explorer
description: "Explore all of your metrics and perform analytics."
aliases:
  - /graphing/metrics/explorer/
further_reading:
  - link: "/metrics/summary/"
    tag: "Documentation"
    text: "Metrics Summary"
  - link: "/metrics/distributions/"
    tag: "Documentation"
    text: "Metrics Distributions"
  - link: "/dashboards/guide/quick-graphs/"
    tag: "Documentation"
    text: "Quick Graphs"
  - link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
    tag: Blog
    text: Manage metric volume and tags in your environment with Observability Pipelines
    
---

## Overview

The [Metrics Explorer][1] is a basic interface for examining your metrics in Datadog. For more advanced options, create a [notebook][2] or dashboard ([screenboard][3], or [timeboard][4]).

## Natural language queries

{{< callout url="https://www.datadoghq.com/product-preview/natural-language-querying-for-metrics/">}}
Natural Language Querying (NLQ) on the Metrics Explorer is in Preview. If you're interested in this feature, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}


Use Natural Language Queries (NLQ) to describe what you're looking for in plain English. Datadog automatically translates your request into a structured metric query, understanding context such as your services, attributes, and tags. This makes it easier to explore metrics without needing to write complex syntax.

To access this feature, click **Ask** in the search field and type your query.

{{< img src="/metrics/explorer/metrics_nlq_example_10152025.mp4" alt="Natural language query in Metrics Explorer showing how to search for metrics using plain English phrases" video=true >}}

To disable NLQ for your organization, you must have [org_management permissions][11]. Navigate to **Organization Settings > Preferences** and toggle off the Natural Language Queries feature.

## Graphing

Use the query editor to customize the graph displayed on the Metrics Explorer page.

You can specify the time frame in the top right corner of the page. The default is **Past 1 Hour**.

{{< img src="metrics/explorer/metrics_explorer.png" alt="Metrics Explorer displaying two queries on a bar graph" style="width:80%;" >}}

Metrics that are not reported in the last 24 hours do not appear in the query editor. You can add these metrics to your graphs manually by entering the metric name or full query.

### Scope

Define a filtering scope with the **from** text box by selecting or searching for tag values. For example, you can use the **from** text box to filter metric values from a specific host, cluster, environment, or region.

### Space aggregation

Define the [space aggregation][5] used to combine a metric's values.

The possible options are:

* Average of reported values (default)
* Max of reported values
* Min of reported values
* Sum of reported values

**Note**: The options may differ based on the metric type selected.

### Functions and formulas

You can optionally add functions to your query using the function button. Not all functions are available for all metric types. For more information, see the [querying][6] documentation. 

### Split graph

Use the **Split Graph** button to view the data split into individual graphs by values for tags such as region, service, or environment.

### Export

Use the **Export** button (<i class="icon-export"></i>) to export your graph:

- Copy a link to the graph for sharing
- Add it to an [incident][8]
- Create a [monitor][9]
- Save it to a [dashboard][10]
- Save it to a [notebook][2] 

### Quick Graphs

With Quick Graphs, you have more options to visualize your data, without needing to create a [Dashboard][4] or [Notebook][2]. These graphs are useful for understanding and troubleshooting issues without creating permanent dashboards or complex visualization setups.

For more information, see the [Quick Graphs][7] documentation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /notebooks/
[3]: /dashboards/#screenboards
[4]: /dashboards/#get-started
[5]: /metrics/introduction/#space-aggregation
[6]: /dashboards/querying/#advanced-graphing
[7]: /dashboards/guide/quick-graphs/
[8]: /service_management/incident_management/
[9]: /monitors/
[10]: /dashboards/
[11]: /account_management/rbac/permissions/#access-management
