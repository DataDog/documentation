---
title: Geomap Widget
kind: documentation
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
    * RUM: See [the RUM documentation][1] to configure a RUM query. 
    * Log Events: See [the log search documentation][2] to configure a log event query.
      * **Note**: The group by tag must include a country ISO Code following the alpha-2 ISO format. You can use the [GeoIP Processor][3] to do this, or manually include the [tags on ingest][4].
    * Metric: See the [querying][5] documentation to configure a metric query. 
      * **Note**: The group by tag must include a country ISO Code following the alpha-2 ISO format. You can [generate metrics from ingested logs][6], or manually include the [tags on ingest][4].

2. Optional: configure your view box depending on where you'd like to zoom into on the map by defailt.

### Options

#### Global time

On screenboards and notebooks, choose whether your widget has a custom timeframe or uses the global timeframe.

#### Title

Display a custom title for your widget by activating the `Show a Title` check box:

{{< img src="dashboards/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

Optionally define its size and alignment.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/analytics/?tab=timeseries#build-an-analytics-query
[2]: /logs/search_syntax/
[3]: /logs/processing/processors/?tab=ui#geoip-parser
[4]: /getting_started/tagging/#defining-tags
[5]: /dashboards/querying/
[6]: /logs/logs_to_metrics/
