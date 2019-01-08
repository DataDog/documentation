---
title: Widgets
kind: documentation
further_reading:
- link: "graphing/dashboards/"
  tag: "Documentation"
  text: "Learn how to create Dashboards in Datadog"
- link: "graphing/dashboards/shared_graph"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "graphing/dashboards/template_variables"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
---

Use widgets through the [Screenboard API][1]:
For [create][2]/[read][3]/[update][4] endpoints, the body is one JSON payload describing the Screenboard widgets:

Base Payload :
```
# Replace the API and/or APP key below
# with the ones for your account

{
  "board_title": "My Board",

  // Options, e.g.: height, width, etc.

  "widgets": [
    // Put a list of widgets here.
  ]
}
```

Each type of widget is described below:

## Timeseries
*Supported on Screenboards and Timeboards*

The Timeseries visualization is great for showing one or more metrics, Log events, or APM events over time. The time window depends on what is selected on the [Timeboard][5] or in the graph on a [Screenboard][6].
Timeseries can be displayed as **lines**, **areas**, and **bars**.

**Note**: Define log Analytics query (still in beta) exactly as in the [Log Explorer][7].

{{< img src="graphing/dashboards/widgets/references-graphing-timeseries-example.png" alt="Timeseries" responsive="true" style="width:80%;">}}

Example of Timeseries widget for the [API][1]
```
{
  "viz": "timeseries",

  // Title
  "title": true,
  "title_size": 16,
  "title_align": "left",
  "title_text": "My Metric (m/s)",

  // Sizing
  "height": 13,
  "width": 47,

  // Positioning
  "y": 28,
  "x": 32,

  // Widget Parameters
  "time": {
    "live_span": "1h" // Choose from: [1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d, 2d, 1w, 1mo, 3mo, 6mo, 1y]
  },
  "tile_def": {
    "viz": "timeseries",
    "requests": [
      {
         "q": "sum:my.important.metric{*} by {host}"
      }
    ],
    "events": [
      {
        "q": "tags:release"
      }
    ]
  }
}
```

### Overlay events on your graph

You can correlate Events to Metrics on Dashboards thanks to the Event Overlay Feature.

#### Via the UI Editor

{{< img src="graphing/faq/event_overlay_ui.png" alt="event_overlay_ui" responsive="true" >}}

#### Via the JSON tab
{{< img src="graphing/faq/event_overlay_json.png" alt="event_overlay_json" responsive="true" >}}

In addition to being able to overlay events within the UI dashboard editor through the search field, you can also modify the JSON to add any event from Datadog. The general format is:

* `"events": "search query"`

For instance, to indicate that you want events for host X and tag Y:

* `"events": "host:X tags:Y"`

or if you're looking to display all errors:

* `"events": "status:error"`

## Query Value
*Supported on Screenboards and Timeboards*

Query values display the current value of a given metric query, with conditional formatting (such as a green/yellow/red background) to convey whether or not the value is in the expected range.
The value displayed by a query value need not represent an instantaneous measurement.
The widget can display the latest value reported, or an aggregate computed from all query values across the time window. These visualizations provide a narrow but unambiguous window into your infrastructure.query

{{< img src="graphing/dashboards/widgets/references-graphing-queryvalue-example.png" alt="Query value widget" responsive="true" style="width:50%;">}}

Example of Query Value widget for the [API][1]

```
{
  "viz": "query_value",

  // Title
  "title": true,
  "title_size": 16,
  "title_text": "Throughput",
  "title_align": "left",

  // Sizing
  "height": 4,
  "width": 14,

  // Positioning
  "y": 21,
  "x": 65,

  // Widget Parameters
  "aggregator": "avg", // Choose from: [avg, sum, min, max]
  "query": "sum:dd.sobotka.throughput.actual{*}",
  "conditional_formats": [
    {
      "color": "white_on_green",
      "invert": false,
      "comparator": ">", // Choose from: [>, >=, <, <=]
      "value": 20000
    }
  ],
  "text_align": "left",
  "precision": 1,
  "time": {
    "live_span": "1h" // Choose from: [1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d, 2d, 1w, 1mo, 3mo, 6mo, 1y]
  },
  "text_size": "auto",
  "unit": "/s" // Give a custom unit or use "auto"
}
```

### What does "Take the X value from the displayed timeframe" mean?

{{< img src="graphing/dashboards/widgets/query_value_widget.png" alt="query_value_widget" responsive="true" style="width:50%;">}}

The Query Value Widget only displays one Value, unlike a timeseries for example, that displays several points.

Let's say you are on a Timeseries and you are currently displaying the past hour, this button allows you to either display the `avg` / `max` / `min` / `avg` / `sum` / `last value` of ALL points that are rendered during that 1 hour range timeframe - depending on the aggregation chosen above.

## Heatmap
*Supported on Screenboards and Timeboards*

The Heatmap visualization is great for showing metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square is.

{{< img src="graphing/dashboards/widgets/references-graphing-heatmap-example.png" alt="Heatmap" responsive="true" style="width:80%;">}}

## Distribution
*Supported on Screenboards and Timeboards*

The Distribution visualization is another way of showing metrics aggregated across many tags, such as *hosts*. Unlike the Heatmap, Distribution's x-axis is the quantity rather than time.

{{< img src="graphing/dashboards/widgets/references-graphing-distribution-example.png" alt="Distribution" responsive="true" style="width:80%;">}}

## Toplist
*Supported on Screenboards and Timeboards*

The Toplist visualization is perfect when you want to see the list of hosts with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc.

{{< img src="graphing/dashboards/widgets/references-graphing-toplist-example.png" alt="TopList" responsive="true" style="width:80%;">}}

## Change
*Supported on Screenboards and Timeboards*

The Change graph shows you the change in a value over the time period chosen.

{{< img src="graphing/dashboards/widgets/references-graphing-change-example.png" alt="Change graph" responsive="true" style="width:80%;">}}

## Hostmap
*Supported on Screenboards and Timeboards*

The Hostmap graphs any metric for any subset of hosts on the same hostmap visualization available from the main [Infrastructure Hostmap][8] menu.

{{< img src="graphing/dashboards/widgets/references-graphing-hostmap-example.png" alt="Hostmap" responsive="true" >}}

## Free Text
*Supported on Screenboards only*

Free text is a widget that allows you to add headings to your [Screenboard][9].

This is commonly used to state the overall purpose of the dashboard.

## Event Timeline
*Supported on Screenboards only*

The event timeline is a widget version of the timeline that appears at the top of the [Event Stream view][10].

{{< img src="graphing/dashboards/widgets/references-graphing-eventtimeline-example.png" alt="Timeseries" responsive="true" style="width:80%;">}}

## Event Stream
*Supported on Screenboards only*

The event stream is a widget version of the stream of events on the [Event Stream view][11].

{{< img src="graphing/dashboards/widgets/references-graphing-eventstream-example.png" alt="Timeseries" responsive="true" style="width:70%;">}}

**This widgets displays only the 100 most recent events**

Example of Event Stream widget for the [API][1]

```
{
    "viz": "event_stream"

    // Title
    "title": false,

    // Sizing
    "height": 57,
    "width": 59,

    // Positioning
    "y": 18,
    "x": 84,

    // Widgets Parameters
    "query": "tags:release",
    "time": {
      "live_span": "1h" // Choose from: [1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d, 2d, 1w, 1mo, 3mo, 6mo, 1y]
    }
}
```

## Image
*Supported on Screenboards only*

Image allows you to embed an image on your dashboard. Images can be PNG, JPG, or even animated GIF files.

Example of Image widget for the [API][1]

```
{
  "viz": "image",

  // Sizing
  "height": 20,
  "width": 32,

  // Positioning
  "y": 7,
  "x": 32

  // Widget Parameters
  "url": "http://path/to/image.jpg" // Note that you shouldn't hotlink to images you don't own.
}
```

## Note
*Supported on Screenboards only*

Note widget is similar to Free Text widget, but allows for more formatting options:

* An arrow can be added to the text box that appears on the dashboard. This is commonly used to document the structure of the dashboard.

* Use `href` to create internal links in Datadog.
  {{< img src="graphing/dashboards/widgets/using_link_note_widget.gif" alt="Using links in note widget" responsive="true" >}}

Example of Note widget for the [API][1]

```
{
    "viz": "note",

    // Title
    "title": false,

    // Sizing
    "height": 15,
    "width": 30,

    // Positioning
    "x": 1,
    "y": 28,

    // Widget Parameters
    "html": "Put your note text in here.",
    "text_align": "left",
    "font_size": 14,
    "bgcolor": "yellow", // Choose from: [yellow, blue, pink, gray, white, red, green]
    "tick": true,
    "tick_pos": "50%",
    "tick_edge": "right" // Choose from: [top, right, bottom, left]
    "auto_refresh": true // Defaults to false
}
```

## Alert Graph
*Supported on Screenboards only*

Alert graphs are timeseries graphs showing the current status of any monitor defined on your system.

Example of Alert Graph widget for the [API][1]

```
{
   "title_size": 16,
   "viz_type": "timeseries",
   "title": true,
   "title_align": "left",
   "title_text": "u",
   "height": 13,
   "width": 47,
   "alert_id": "<ENTER ID>",
   "time": {
    "live_span": "1h" // Choose from: [1m, 5m, 10m, 15m, 30m, 1h, 4h, 1d, 2d, 1w, 1mo, 3mo, 6mo, 1y, alert]
   },
   "y": 2,
   "x": 6,
   "isShared": false,
   "viz": "alert_graph",
   "add_timeframe": false
}
```

## Alert Value
*Supported on Screenboards only*

Alert values are query values showing the current value of the metric in any monitor defined on your system.
## Iframe
*Supported on Screenboards only*

The Iframe widget allows you to embed a portion of any other web page on your dashboard.

## Check Status
*Supported on Screenboards only*

Check status shows the current status or number of results for any check performed.
## Service Summary
*Supported on Screenboards only*

The service summary displays the top portion of any APM trace in your Screenboard.

{{< img src="graphing/dashboards/widgets/references-graphing-servicesummary-example.png" alt="Timeseries" responsive="true" style="width:80%;">}}

## Monitor Summary
*Supported on Screenboards only*

Monitor summary is a summary view of all monitors on your system, or a subset based on a query.

{{< img src="graphing/dashboards/widgets/references-graphing-monitorsummary-example.png" alt="Timeseries" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/#screenboards
[2]: /api/#create-a-screenboard
[3]: /api/#get-a-screenboard
[4]: /api/#update-a-screenboard
[5]: /graphing/dashboards/timeboard
[6]: /graphing/dashboards/screenboard
[7]: /logs/explorer/analytics/#log-graph-query
[8]: /graphing/infrastructure/hostmap
[9]: /graphing/dashboards/screenboard
[10]: https://app.datadoghq.com/event/stream
[11]: /graphing/event_stream
