---
title: Geomap Widget
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

The geomap widget visualizes geographic data with shaded regions or points. It can be used to:
- View user sessions by country.
- Filter to see a list of all sessions in a new tab.
- View user sessions filtered by employee.
- Monitor performance metrics like load time, core web vitals, and percent of views with errors.

{{< img src="/dashboards/widgets/geomap/geomap-points.png" alt="Geomap visualization with the points overlay" >}}

## Setup

{{< img src="dashboards/widgets/geomap/geomap_setup2.png" alt="Geomap Graph your data section of widget configuration">}}

### Configuration
1. Choose the visualization layer:
    * **Regions**: Aggregate measures at a country level.
    * **Points**: Overlay events as points on the map to display geographic event data.

2. Choose the data to graph: <br>
  **Note**: Support for data sources varies based on the visualization layer you select.
  {{< tabs >}}
  {{% tab "Regions" %}}
  |  Data source    | Notes    | 
  | --------------  | -------- |
  |Log Events   | The group by tag must include a country ISO Code following the alpha-2 ISO format. You can use the [GeoIP Processor][1] to do this, or manually include the [tags on ingest][2]. See the [Log search documentation][3] to configure a log event query.|
  |Metric   | The group by tag must include a country ISO Code following the alpha-2 ISO format. You can [generate metrics from ingested logs][4], or manually include the [tags on ingest][2]. See the [querying documentation][5] to configure a metric query.|
  |RUM   | See the [RUM documentation][6] to configure a RUM query. |
  |SLO | See the [SLO search documentation][7] to configure an SLO query. |
  |Security Signals <br> Application Security <br> Audit Trail | See the [Log search documentation][3] to configure a query. |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /logs/logs_to_metrics/
  [5]: /dashboards/querying/
  [6]: /real_user_monitoring/explorer/search_syntax/
  [7]: /service_management/service_level_objectives/#searching-slos
  {{% /tab %}}

  {{% tab "Points" %}}
  |  Data source | Notes |
  | -----------  | ----- | 
  |Log Events   | The group by tag must include a country ISO Code following the alpha-2 ISO format. You can use the [GeoIP Processor][1] to do this, or manually include the [tags on ingest][2]. See the [Log search documentation][3] to configure a log event query. |
  |RUM   | See the [RUM documentation][4] to configure a RUM query. |

  [1]: /logs/log_configuration/processors/#geoip-parser
  [2]: /getting_started/tagging/#define-tags
  [3]: /logs/search_syntax/
  [4]: /real_user_monitoring/explorer/search_syntax/
  {{% /tab %}}
  {{< /tabs >}}

3. Optional: Configure your view box to specify where you want to focus the map initially.

### Options

#### Context links

[Context links][7] are enabled by default, you can toggle them on or off. Context links connect dashboard widgets with other pages (in Datadog, or third-party).

## API

This widget can be used with the **[Dashboards API][8]**. See the following table for the [widget JSON schema definition][9]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/processors/#geoip-parser
[2]: /getting_started/tagging/#define-tags
[3]: /logs/search_syntax/
[4]: /logs/logs_to_metrics/
[5]: /dashboards/querying/
[6]: /real_user_monitoring/explorer/search_syntax/
[7]: /dashboards/guide/context-links/
[8]: /api/latest/dashboards/
[9]: /dashboards/graphing_json/widget_json/
