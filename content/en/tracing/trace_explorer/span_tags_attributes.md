---
title: Span Tags, Attributes, and Facets
description: 'Span Facets and Facet Panel'
aliases:
 - /tracing/trace_explorer/facets
further_reading:
- link: 'tracing/trace_explorer/'
  tag: 'Documentation'
  text: 'Learn about the Trace Explorer'
---

## Overview

Span metadata is composed of **attributes** and **tags**.

* **[Span attributes](#span-attributes)** are the content of the span, collected with automatic or manual instrumentation in the application

* **[Span tags](#span-tags)** are enrichments of context related to the span, for instance host or container tags describing the infrastructure the service is running on. 

You can query spans by any span tag and attribute from the [trace explorer][6].

### Reserved attributes

Reserved attributes are a subset of span attributes that are present on every span. These attributes are queryable without prepending the `@` character. The full list of reserved attributes is: `env`, `service`, `operation_name`, `resource_name`, `status`, `ingestion_reason`, `trace_id`. Refer to the [APM terms and concepts][10] for a full definition of these terms.

### Span attributes

Span attributes are the content of your span. These are collected out-of-the-box in tracing libraries using automatic instrumentation, manually using custom instrumentation, or remapped in the Datadog backend based on source attributes (see [peer attributes][11], remapped from some source attributes). To search on a specific span attribute, you must prepend an `@` character at the beginning of the attribute key.

For instance, to find spans representing calls to a `users` table from a postgres database, use the following query: `@peer.db.name:users @peer.db.system:postgres`.

### Span tags

Span tags are context around your span, enriched based on the host or the container the service the span is emitted from is running on. You don't need to prepend an `@` character to query for span tags.

## Facets

You can create **facets** on top of span tags and attributes to map an attribute to the right type (for example, string or int) and for these attributes to show up in the facet list.

**Note**: [Creating facets](#creating-facets) is **not required** for [searching spans][7], [generating metrics from spans][8], or [indexing spans with retention filters][9].

{{< img src="tracing/trace_explorer/facets/facet_panel.png" alt="The Facets panel in the Trace Explorer" style="width:90%;">}}

### Qualitative facets

Use qualitative facets when you need to:

- **Get relative insights** for values. For example, create a facet on a `datacenter` span tag to scope down the investigation to one specific region when slow requests are detected.
- **Count unique values**. For example, create a facet on `usr.email` to see how many distinct users experience errors while loading a specific resource.
- Frequently **filter** your spans against particular values. For example, create a facet on an environment tag to scope troubleshooting down to development, staging, or production environments.<br>

**Note:** Although facets are not required for filtering on tags, defining facets for tags that you often use during investigations can help reduce your time to resolution.

### Quantitative facets (measures)

Use measures when you need to:
- **Aggregate** values from multiple traces. For example, create a measure on the number of rows in Cassandra and view the p95 or top-most referrers per sum of file size requested.
- Numerically compute the **highest latency services**, for example, for shopping cart values over $1000.
- **Filter continuous values**, for example, the size in bytes of each payload chunk of a video stream.

#### Measure types

Measures have either a (long) integer or double value, for equivalent capabilities.

#### Units

Measures support units (**time** in seconds or **size** in bytes) for handling of orders of magnitude at query time and display time. The unit is a property of the measure itself, not of the field.

For example, consider a `duration` measure in nanoseconds. Suppose spans from `service:A` have `duration:1000`, meaning `1000 milliseconds`. Supposed spans from `service:B` have `duration:500`, meaning `500 microseconds`. Use `duration:>20ms` to consistently query span tags from both services at once. Read [query syntax][1] for more reference information about queries.

## Facet panel

The search bar provides the most comprehensive set of interactions to filter and group your data. However, for many cases, the facet panel is a straightforward way to navigate into your data. Open a facet to see a summary of its content for the scope of the current query.

The search bar and URL automatically reflect your selections from the facet panel.

- **Facets (qualitative)** come with a top list of unique values, and a count of spans matching each of them.
- **Measures (quantitative)** come with a slider indicating minimum and maximum values. Use the slider, or input numerical values, to scope the search query to different bounds.

### Hiding facets

Your organization has many facets to address use cases across the various teams that use traces. Most likely, only a subset of these facets is valuable to you in a specific troubleshooting context.

**Hide facets** that you don't need on a routine basis, to keep only the most relevant facets for your troubleshooting sessions.

{{< img src="tracing/trace_explorer/facets/hide_facets.png" alt="Hide Facet" style="width:30%;">}}

Hidden facets are still visible in the facet search (see the [Filter Facet](#filtering-facets) section) in case you need it. Unhide hidden facets from facet search.

{{< img src="logs/explorer/facet/unhide_facet.png" alt="Unhide Facet" style="width:30%;">}}

#### Hidden facets and teammates

Hiding facets is specific to your own troubleshooting context and does not impact your teammates' view, unless you update a saved view. Hidden facets is part of the context saved in a saved view.

### Grouping facets

Facets are grouped into meaningful themes in the facet list. Assigning or reassigning a group for a facet affects only the facet list, and has no impact on search or analytics.

{{< img src="tracing/trace_explorer/facets/group_facets.png" alt="Group Facets" style="width:30%;">}}

### Filtering facets

Use the search facets box on the facet panel to scope the whole facet list and navigate more quickly to the one facet you need to interact with. Search facets uses the facet display name and field name to scope results.

{{< img src="tracing/trace_explorer/facets/filter_facets.png" alt="Search Facet" style="width:30%;">}}

## Creating facets

Creating a facet on a span attribute/tag is not a mandatory step to search for spans. Facets are useful if you wish to add a meaningful description to a specific span attribute, or if you want the span attribute values to appear on the Facet list on the left-hand side of the span list.

### Creating facets from the trace side panel

The easiest way to create a facet is to add it from the trace side panel so that most of the facet details (such as the field path and underlying type) are pre-filled. In the [Trace Explorer][1], navigate to a span of interest that contains the field to create a facet on. Open the trace side-panel for this span by selecting the span from the list. Click on the desired field (either in span tags or in infrastructure tags) and create a facet from there:

- If the field has a numerical value, you can create either a facet or a measure.
- If the field has a string value, only facet creation is available.

{{< img src="tracing/trace_explorer/facets/create_facet.png" alt="Add Facet from tags" style="width:50%;">}}

### Creating facets from the facet list

If finding a span that has the desired field is not an option, create a facet directly from the facet panel by clicking **+ Add**.

Define the underlying field (key) name for this facet:

- Use tag key name for infrastructure tags.
- Use the attribute path for span attributes, with `@` prefix.

Autocomplete based on the content in spans of the current views helps you to define the proper field name. But you can use virtually any value here, specifically in the case that you don't yet have matching spans received by Datadog.

{{< img src="tracing/trace_explorer/facets/create_facet_from_scratch.png" alt="Add Facet from scratch" style="width:30%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_explorer/query_syntax/
[2]: /tracing/trace_explorer/group/
[3]: /monitors/types/apm/?tab=analytics
[4]: /dashboards/widgets/
[5]: /notebooks/
[6]: /tracing/trace_explorer/
[7]: /tracing/trace_explorer/search
[8]: /tracing/trace_pipeline/generate_metrics
[9]: /tracing/trace_pipeline/trace_retention/#retention-filters
[10]: /tracing/glossary
[11]: /tracing/services/inferred_services#peer-tags