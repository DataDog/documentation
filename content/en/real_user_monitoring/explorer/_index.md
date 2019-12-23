---
title: RUM Explorer
kind: documentation
aliases:
- /real_user_monitoring/rum_explorer
further_reading:
- link: "/real_user_monitoring/explorer/search"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/rum_explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
---

{{< img src="real_user_monitoring/explorer/rum_explorer.png" alt="RUM explorer" responsive="true" >}}

The Real User Monitoring (RUM) Explorer allow you to explore all your views collected from your different applications.

## Context

Build up a context to explore your views in your RUM Explorer page first by selecting the proper [time range](#time-range) then by using the [search bar][1] to filter your views and analytics.

### Time Range

It appears directly under the search bar as a timeline. The time range feature allows you to display view in the view steam or analytics within a given time period.

Quickly change the time range by selecting a preset range from the dropdown:

{{< img src="real_user_monitoring/explorer/rum_time_selector.png" alt="Rum time selector" responsive="true" style="width:40%;">}}

All of the search parameters are contained within the URL. You can share your view by sharing the URL.

## Vizualisation

Click on any view to open the views panel and see more details (Resources, Traces, Errors, User Action, Long task, Logs, or Attributes) about it:

{{< img src="real_user_monitoring/explorer/rum_views.png" alt="Rum View" responsive="true" style="width:80%;">}}

## Setup - Facets & Measures

After [being collected][2], your views attributes can be indexed as facets or measures in order to be accessible for your [context](#context) creation and [analytics][3].

Note: To leverage the most out of your RUM Explorer page, make sure your views attributes follow [Datadog attribute naming convention][4].

{{< tabs >}}
{{% tab "Facets" %}}

A facet displays all the distinct members of an attribute or a tag and provides some basic analytics, such as the number of views represented. Facets allow you to pivot or filter your datasets based on a given attribute. To filter, select the values that you want to see.

{{< img src="real_user_monitoring/explorer/rum_facet.png" alt="Facets demo" responsive="true" style="width:80%;">}}

**Create a Facet**:

To start using an attribute as a facet or in the search, click on it and add it as a facet in the:

{{< img src="real_user_monitoring/explorer/create_facet.png" style="width:50%;" alt="Create Facet" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new views** and can be used in [the search bar][1], the facets panel, and in the [RUM Analytics query][2].

[1]: /real_user_monitoring/explorer/search/#search
[2]: /real_user_monitoring/rum_analytics
{{% /tab %}}
{{% tab "Measures" %}}

A measure is an attribute with a numerical value contained in your views.

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your views:

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="Create a measure" responsive="true" style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new views** and can be used in [the search bar][1], the facets panel, and in the [RUM Analytics query][2].

**Select the Measure Unit**:

Each measure has its own unit that is then used for display in the RUM Explorer columns and RUM Analytics.

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="Edit a measure" responsive="true" style="width:50%;">}}

[1]: /real_user_monitoring/explorer/search/#search
[2]: /real_user_monitoring/rum_analytics
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/search/#search-syntax
[2]: /real_user_monitoring/installation
[3]: /real_user_monitoring/explorer/analytics
[4]: /logs/processing/attributes_naming_convention/
