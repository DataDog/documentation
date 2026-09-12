---
title: Pathways
aliases:
- /real_user_monitoring/product_analytics/sankey
- /product_analytics/sankey
- /product_analytics/journeys/sankey
- /product_analytics/journeys/pathways
further_reading:
- link: '/dashboards/widgets/sankey/'
  tag: Documentation
  text: Build Sankey widgets in Dashboards
---

Pathways charts visualize all user journeys across your application to analyze the critical path.

{{< img src="/product_analytics/journeys/pathways/pathways_chart.png" alt="The default Pathways diagram for an app" style="width:90%;" >}}

Each node represents a view the user visited. The thickness of each node represents the count of user sessions on that page. A page with fewer visitors has a thinner node in the diagram.

If a user visits the same page multiple times during their session, that page is only counted once.

Action events are not supported in pathways charts.

## Create a pathways chart

Build a pathways chart around a single view, then choose whether to show the steps users take before or after it.

1. In {{< ui >}}Product Analytics{{< /ui >}}, select {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Pathways{{< /ui >}}.

1. {{< ui >}}Select a step{{< /ui >}} in your user journey to explore, and use the adjacent dropdown to display steps {{< ui >}}before{{< /ui >}} or {{< ui >}}after{{< /ui >}} it.

   <div class="alert alert-tip">Pathways charts support [Datadog wildcards][1], so you can match multiple views with a single entry, such as `/department/*`.</div>

1. (Optional) Filter chart results based on properties such as country or device type using {{< ui >}}Filter by{{< /ui >}} criteria.

## Analyze a pathways chart

After you build a pathways chart, the diagram displays the most common paths users took across the selected number of steps.

Each node shows the percentage and number of sessions that reached that view relative to the previous step. Hover over a node to see the exact count. Dropoff represents sessions that stopped before reaching another view within the selected number of steps.

{{< img src="/product_analytics/journeys/pathways/pathways_analysis.png" alt="A Pathways chart with numbered callouts for the top paths and steps controls, the time range selector, a diagram node, an open node menu, and the Build Funnel button." style="width:90%;" >}}

You can refine a pathways chart in various ways to zero in on the paths you want to analyze.

1. Use the view controls to change how many paths display, and how many steps each path includes.

2. Use the time range selector to change the period of data the chart analyzes.

3. A node represents a view a user visited. The thickness of a node reflects the number of sessions that reached that view.

4. Click a node to open a menu with options to start a new pathways chart from that view (in either direction), view all visits to the view in Analytics, view a sample session replay, or view heatmap data.

5. Click {{< ui >}}Build Funnel{{< /ui >}}, then click the nodes you want to include. Click {{< ui >}}Create Funnel From Selection{{< /ui >}} to convert your selection into a [funnel][2], a chart that tracks conversion through a fixed, ordered sequence of steps.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/search_syntax/#wildcards
[2]: /product_analytics/charts/funnel_analysis/

