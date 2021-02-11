---
title: RUM Explorer
kind: documentation
aliases:
- /real_user_monitoring/rum_explorer
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/rum_explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
---

{{< img src="real_user_monitoring/explorer/rum_explorer.png" alt="RUM explorer"  >}}

The Real User Monitoring (RUM) Explorer allows you to explore all data collected from your different applications. It gives you access to granular information about your RUM events, allowing you to:
- Navigate user sessions
- Investigate performance issues affecting views, resources or actions
- Troubleshoot application errors

## Navigate the explorer

{{< img src="real_user_monitoring/explorer/explorer_tabs.png" alt="RUM explorer tabs"  >}}

The RUM explorer displays all event types by default. Each tab gives you access to a customized list with relevant columns for the selected RUM event type. 

### Event side panel

{{< img src="real_user_monitoring/explorer/event_side_panel.png" alt="RUM event side panel"  >}}

Clicking a row in the RUM explorer opens the event side panel. It shows all the information relative to a RUM event. For views and actions, the waterfall is displayed along with related resources and errors.

### Attributes tab

RUM collects context information by default. You can add any additional context attributes with the Global Context API.

{{< img src="real_user_monitoring/explorer/attributes_tab.png" alt="RUM event side panel attributes tab"  >}}

## Context

Build up a context to explore your RUM events in your RUM Explorer page first by selecting the proper [time range](#time-range), and then by using the [search bar][1] to filter your RUM events and analytics.

### Time range

The time range appears directly under the search bar as a timeline. This feature allows you to display RUM events in the explorer stream or analytics within a given time period.

Quickly change the time range by selecting a preset range from the dropdown (or [entering a custom time frame][2]):

{{< img src="real_user_monitoring/explorer/rum_time_selector.png" alt="Rum time selector"  style="width:50%;">}}

All of the search parameters are contained within the URL. You can share your view by sharing the URL.


## Setup facets and measures

After being collected, your RUM events attributes can be indexed as facets or measures in order to be accessible for your [context](#context) creation and [analytics][3].

{{< tabs >}}
{{% tab "Facets" %}}

A facet displays all the distinct members of an attribute or a tag and provides some basic analytics, such as the number of RUM events represented. Facets allow you to pivot or filter your datasets based on a given attribute. To filter, select the values that you want to see.

{{< img src="real_user_monitoring/explorer/rum_facet.png" alt="Facets demo"  style="width:80%;">}}

**Create a Facet**:

To start using an attribute as a facet or in the search, click on it and add it as a facet:

{{< img src="real_user_monitoring/explorer/create_facet.png" style="width:50%;" alt="Create Facet"  style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new views** and can be used in [the search bar][1], the facets panel, and in the [RUM Analytics query][2].

[1]: /real_user_monitoring/explorer/search/#search
[2]: /real_user_monitoring/rum_analytics/
{{% /tab %}}
{{% tab "Measures" %}}

A measure is an attribute with a numerical value contained in your RUM events.

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your views:

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="Create a measure"  style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new RUM events** and can be used in [the search bar][1], the facets panel, and in the [RUM Analytics query][2].

**Select the Measure Unit**:

Each measure has its own unit that is then used for display in the RUM Explorer columns and RUM Analytics.

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="Edit a measure"  style="width:50%;">}}

[1]: /real_user_monitoring/explorer/search/#search
[2]: /real_user_monitoring/rum_analytics/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/search/#search-syntax
[2]: /dashboards/guide/custom_time_frames
[3]: /real_user_monitoring/explorer/analytics/
