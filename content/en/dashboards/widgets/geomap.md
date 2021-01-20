---
title: Geomap Widget
kind: documentation
widget_type: "geomap"
aliases:
    - /graphing/widgets/geomap/
further_reading:
- link: "/dashboards/timeboards/"
  tag: "Documentation"
  text: "Timeboards"
- link: "/dashboards/screenboards/"
  tag: "Documentation"
  text: "Screenboards"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
- link: "/notebooks/"
  tag: "Documentation"
  text: "Notebooks"
---

The geomap widget graphs any metric that has a country tag or facet.

{{< img src="dashboards/widgets/geomap/geomap.png" alt="Geomap" >}}

## Setup

{{< img src="dashboards/widgets/geomap/geomap_setup.png" alt="Top List"  style="width:80%;">}}

### Configuration

1. Choose the data to graph:
    * RUM: See [the RUM documentation][2] to configure a RUM query. 
    * Log Events: See [the log search documentation][3] to configure a log event query.
      * Note: The group by tag must include a country ISO Code. You can use the [GeoIP Processor][6] to do this, or manually include the [tags on ingest][8].
    * Metric: See the [querying][1] documentation to configure a metric query. 
      * Note: The group by tag must include a country ISO Code. You can [Generate Metrics from Injested Logs][7], or manually include the [tags on ingest][8].

2. Optional: configure your view box depending on where you'd like to zoom into on the map by defailt.

### Options

#### Global time

On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.

## API

This widget can be used with the **Dashboards API**. Refer to the [Dashboards API][4] documentation for additional reference.

The dedicated [widget JSON schema definition][5] for the top list widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/querying/
[2]: /real_user_monitoring/explorer/analytics/?tab=timeseries#build-an-analytics-query
[3]: /logs/search_syntax/
[4]: /api/v1/dashboards/
[5]: /dashboards/graphing_json/widget_json/
[6]: /logs/processing/processors/?tab=ui#geoip-parser
[7]: /logs/logs_to_metrics/
[8]: /getting_started/tagging/#defining-tags
