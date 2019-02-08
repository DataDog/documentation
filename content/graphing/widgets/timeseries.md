---
title: Timeseries Widget
kind: documentation
further_reading:
- link: "graphing/dashboards/timeboard/"
  tag: "Documentation"
  text: "Timeboards"
---

{{< img src="graphing/widgets/references-graphing-timeseries-example.png" alt="Timeseries" responsive="true" style="width:80%;">}}

## Overview

The Timeseries visualization allows you to show one or more metrics, Log events, or APM events evolution over time. The time window depends on what is selected on the [Timeboard][5] or in the graph on a [Screenboard][6].
Timeseries can be displayed as **lines**, **areas**, and **bars**.

**Note**: Define the Log Analytics query exactly as in the [Log Explorer][7].

## Option
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

## API