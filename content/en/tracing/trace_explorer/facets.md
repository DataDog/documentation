---
title: Span Facets
kind: documentation
description: 'Trace Facets and Facet Panel'
aliases:
    - /tracing/facets
further_reading:
    - link: 'tracing/trace_explorer/'
      tag: 'Documentation'
      text: 'Trace Explorer'
---

## Overview

Facets are user-defined tags and attributes from your spans. They are meant for either qualitative or quantitative data analysis. As such, you can use them in the Trace Explorer to:

- [Search and filter upon your spans][1]
- [Perform trace analytics][2]

Facets also allow you to manipulate your spans in your [trace analytics monitors][3], and APM queries in [dashboards][4] and [notebooks][5].

{{< img src="tracing/trace_explorer/facets/facet_panel.png" alt="Facets panel" style="width:80%;">}}

{{< site-region region="us,eu,gov,us3,us5" >}}

**Note**: You do not need facets to support span [search][1] and analytics, [metric generation][2] from spans, or span indexing with [retention filters][3].

In all these contexts, autocomplete capabilities rely on existing facets, but any input matching incoming spans would work.

[1]: /tracing/trace_explorer/search
[2]: /tracing/generate_metrics
[3]: /tracing/trace_retention/#retention-filters

{{< /site-region >}}

### Qualitative facets

Use qualitative facets when you need to:
- **Get relative insights** for values. For instance, create a facet on `datacenter` span tag to scope down the investigation to one specific region when slow requests are detected.
- **Count unique values**. For instance, create a facet on `usr.email` to see how many distinct users experience errors while loading a specific resource.
- Frequently **filter** your spans against particular values. For instance, create a facet on an environment tag to scope troubleshooting down to development, staging, or production environments.

**Note:** Although it is not required to create facets to filter on tags, defining them on tags that you often use during investigations can help reduce your time to resolution.

### Quantitative facets (measures)

Use measures when you need to:
- **Aggregate** values from multiple traces. For example, create a measure on the number of rows in Cassandra and view the P95 or top-most referrers per sum of file size requested.
- Numerically compute the **highest latency services** for shopping cart values over $1000.
- **Filter continuous values**. For example, the size in bytes of each payload chunk of a video stream.

#### Types

Measures come with either a (long) integer or double value, for equivalent capabilities.

#### Units

Measures support units (**time** in seconds or **size** in bytes) for handling of orders of magnitude at query time and display time. Unit is a property of the measure itself, not of the field.

For example, consider a `duration` measure in nanoseconds: you have some spans from `service:A` where `duration:1000` stands for `1000 milliseconds`, and some span tags from `service:B` where `duration:500` stands for `500 microseconds`:
- Use `duration:>20ms` (see [query syntax][1] for reference) to consistently query span tags from both services at once.

## Facet panel

The search bar provides the most comprehensive set of interactions to filter and group your data. However, for most cases, the facet panel is likely to be a more straightforward way to navigate into your data. Open a facet to see a summary of its content for the scope of the current query.

The search bar and url automatically reflect your selections.

- **Facets (qualitative)** come with a top list of unique values, and a count of spans matching each of them.
- **Measures** come with a slider indicating minimum and maximum values. Use the slider, or input numerical values, to scope the search query to different bounds.

### Hide facets

Your organization has a whole collection of facets to address its comprehensive set of use cases across all different teams using traces. Most likely, only a subset of these facets is valuable to you in a specific troubleshooting context.

**Hide facets** you don't need on a routine basis, to keep only the most relevant facets for your troubleshooting sessions.

{{< img src="tracing/trace_explorer/facets/hide_facets.png" alt="Hide Facet" style="width:30%;">}}

Hidden facets are still visible in the facet search (see the [Filter Facet](#filter-facets) section) in case you need it. Unhide hidden facets from there.

{{< img src="logs/explorer/facet/unhide_facet.png" alt="Unhide Facet" style="width:30%;">}}

#### Hidden facets and teammates

Hiding facets is specific to your own troubleshooting context and does not impact your teammates' view, unless you update a [Saved View][6]. Hidden facets is part of the context saved in a saved view.

### Group facets

Facets are grouped into meaningful themes, to ease navigation in the facet list. Assigning or reassigning a group for a facet (see how to [manage facets](#manage-facets)) is only a matter of display in the facet list, and has no impact on search and analytics capabilities.

{{< img src="tracing/trace_explorer/facets/group_facets.png" alt="Group Facets" style="width:30%;">}}

### Filter facets

Use the search box on facets to scope down the whole facet list and navigate more quickly to the one you need to interact with. Facet search uses both facet display name and facet field name to scope results.

{{< img src="tracing/trace_explorer/facets/filter_facets.png" alt="Search Facet" style="width:30%;">}}

## Manage facets

### Out-of-the-box facets

Most common facets such as `Status` and `Service` come out-of-the-box, so you can start troubleshooting right away once your spans are ingested.

### Create facets

As a matter of good practice, always consider using an existing facet rather than creating a new one. Using a unique facet for information of a similar nature fosters cross-team collaboration.

#### Trace side panel

The easiest way to create a facet is to add it from the trace side panel, so that most of the facet details (field path, underlying type) are pre-filled. Navigate in the [Trace Explorer][1] to whichever span of interest containing the field to create a facet on. Open the trace side-panel for this span, click on the corresponding field (either in the span tags or in infrastructure tags) and create a facet from there:

- If the field has a string value, only facet creation is available.
- If the field has a numerical value, both facet and measure creation are available.

{{< img src="tracing/trace_explorer/facets/create_facet.png" alt="Add Facet from tags" style="width:50%;">}}

#### Facet list

In case finding a matching span is not an option, create a new facet directly from the facet panel using the _add facet_ button.

Define the underlying field (key) name for this facet:

- Use tag key name for infrastructure tags.
- Use the attribute path for span attributes, with `@` prefix.

Autocomplete based on the content in spans of the current views helps you to define the proper field name. But you can use virtually any value here, specifically in the case that you don't yet have matching spans received by Datadog.

{{< img src="tracing/trace_explorer/facets/create_facet_from_scratch.png" alt="Add Facet from scratch" style="width:30%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/query_syntax/
[2]: /tracing/trace_explorer/group/
[3]: /monitors/create/types/apm/?tab=analytics
[4]: /dashboards/widgets/
[5]: /notebooks/
[6]: /trace/trace_explorer/saved_views/
