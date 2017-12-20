---
title: How do I overlay events onto my dashboards?
kind: faq
customnav: graphingnav
---

You can correlate Events to Metrics on Dashboards thanks to the Event Overlay Feature. 

## Via the UI Editor

{{< img src="graphing/faq/event_overlay_ui.png" alt="event_overlay_ui" responsive="true" popup="true">}}

## Via the JSON tab
{{< img src="graphing/faq/event_overlay_json.png" alt="event_overlay_json" responsive="true" popup="true">}}

In addition to being able to overlay events within the UI dashboard editor through the search field, you can also modify the JSON to add any event from Datadog. The general format is:

* `"events": "search query"`

For instance, to indicate that you want events for host X and tag Y:

* `"events": "host:X tags:Y"`

or if you’re looking to display all errors:

* `"events": "status:error"`

## Events related to Template Variables

Template variables bring flexibility into Dashboarding.
Let's say you have the following template variable : 

{{< img src="graphing/faq/template_event_overlay.png" alt="template_event_overlay" responsive="true" popup="true">}}

To use the Event Overlay feature use the following syntax

* `"events": "tags:$availability-zone"`