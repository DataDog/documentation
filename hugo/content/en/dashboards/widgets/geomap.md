---
title: Geomap Widget
description: Visualize geographic data with shaded regions or points to display location-based metrics and patterns.
widget_type: geomap
aliases:
- /graphing/widgets/geomap/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Notebooks"
---

The Geomap widget visualizes geographic data with shaded regions or points. It can be used to:
- View user sessions by country.
- Filter to see a list of all sessions in a new tab.
- View user sessions filtered by employee.
- Monitor performance metrics like load time, core web vitals, and percent of views with errors.
- Monitor the health of physical locations, such as stores or devices, by plotting metrics on a map.

{{< img src="/dashboards/widgets/geomap/geomap_zoom_region.mp4" alt="Zooming to a region in the Geomap widget" video=true >}}

## Setup

{{< img src="dashboards/widgets/geomap/geomap_setup3.png" alt="Geomap Graph your data section of widget configuration">}}

### Configuration
1. Choose the visualization layer:
    * {{< ui >}}Regions{{< /ui >}}: Aggregate measures at a country or country subdivisions level.
    * {{< ui >}}Points{{< /ui >}}: Overlay events as points on the map to display geographic event data.

2. Choose the data to graph: <br>
  **Note**: Support for data sources varies based on the visualization layer you select.
  {{< tabs >}}
  {{% tab "Regions" %}}
  |  Data source    | Notes    |
  | --------------  | -------- |
  |Log Events   | The group by tag must include a country ISO Code (alpha-2 ISO format) or a country subdivision ISO Code (ISO-3166-2 format). You can use the [GeoIP Processor][1] to do this, or manually include the [tags on ingest][2]. See the [Log search documentation][3] to configure a log event query.|
  |Metric   | The group by tag must include a country ISO Code (alpha-2 ISO format) or a country subdivision ISO Code (ISO-3166-2 format). You can [generate metrics from ingested logs][4], or manually include the [tags on ingest][2]. See the [querying documentation][5] to configure a metric query.|
  |RUM   | See the [RUM documentation][6] to configure a RUM query. |
  |SLO | See the [SLO search documentation][7] to configure an SLO query. |
  |Security Signals <br> App and API Protection <br> Audit Trail | See the [Log search documentation][3] to configure a query. |

  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/investigate_problems/explore_retained_data/search_syntax/
  [7]: /service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Points" %}}
  |  Data source | Notes |
  | -----------  | ----- |
  |Log Events   | The group by tag must include a country ISO Code following the alpha-2 ISO format. You can use the [GeoIP Processor][1] to do this, or manually include the [tags on ingest][2]. See the [Log search documentation][3] to configure a log event query. |
  |RUM   | See the [RUM documentation][4] to configure a RUM query. |
  |Metric   | Metric queries don't include geographic coordinates. To plot metrics, join your query with a reference table that supplies latitude and longitude coordinates. See [Plot metrics with a reference table](#plot-metrics-with-a-reference-table). |

  **Note**: The Points layer shows a maximum of 100,000 events at a time.
  
  [1]: /logs/log_configuration/processors/geoip_parser/
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/investigate_problems/explore_retained_data/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. (Optional) Under {{< ui >}}Visual Options{{< /ui >}}, use the {{< ui >}}Set widget default view{{< /ui >}} dropdown to select where to initially focus the map. Select {{< ui >}}Custom{{< /ui >}} to define a custom region, or search for the name of a country, state, or province.

### Plot metrics with a reference table

Metric queries don't include geographic coordinates. To plot metrics on a {{< ui >}}Points{{< /ui >}} layer, join your metric query with a [reference table][10] that supplies latitude and longitude coordinates. The reference table can also provide metadata, such as location names, to display on the map.

Before you start, set up the following:
- A metric tagged with a value that identifies each location, such as `store_id`.
- A reference table with a column whose values match that tag, plus a latitude column and a longitude column for each location. Column names don't need to follow a specific format because you map them in the widget editor.

To plot metrics with a reference table:

1. Add a Geomap widget to a dashboard and select the {{< ui >}}Points{{< /ui >}} layer.
1. In the source selector, choose {{< ui >}}Metrics{{< /ui >}} and write your metric query.
1. Specify the type of join and the reference table that you want to join with your metrics. The Geomap widget offers two join types: {{< ui >}}All locations{{< /ui >}} (left join) and {{< ui >}}Locations with data only{{< /ui >}} (inner join).
1. Define the join condition with the metric tag, such as `store_id`, and the matching reference table column. For more information about joins, see [Reference Table Joins with Metrics][11].
1. For {{< ui >}}latitude{{< /ui >}} and {{< ui >}}longitude{{< /ui >}}, select the reference table columns that contain each location's coordinates.
1. (Optional) Add conditional formatting rules to color points based on their metric values. For example, define thresholds that turn points green, yellow, or red to highlight status.
1. (Optional) Under {{< ui >}}Tooltip Fields{{< /ui >}}, select additional reference table columns, such as a store name, to display in the point tooltip.

### Options

#### Context links

[Context links][7] are enabled by default, you can toggle them on or off. Context links connect dashboard widgets with other pages (in Datadog, or third-party).

#### Visual formatting rules

Customize the color of regions or points in your Geomap widget with conditional rules.

## API

This widget can be used with the **[Dashboards API][8]**. See the following table for the [widget JSON schema definition][9]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors/geoip_parser/
[2]: /getting_started/tagging/#define-tags
[3]: /logs/search_syntax/
[4]: /logs/logs_to_metrics/
[5]: /dashboards/querying/
[6]: /real_user_monitoring/investigate_problems/explore_retained_data/search_syntax/
[7]: /dashboards/guide/context-links/
[8]: /api/latest/dashboards/
[9]: /dashboards/graphing_json/widget_json/
[10]: /reference_tables/
[11]: /metrics/reference_table_joins_with_metrics/
