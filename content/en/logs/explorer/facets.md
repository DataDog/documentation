---
title: Log Facets
kind: documentation
description: 'Log Facets and Facet Panel'
aliases:
    - /logs/facets
further_reading:
    - link: 'logs/explorer/analytics'
      tag: 'Documentation'
      text: 'Perform Log Analytics'
    - link: 'logs/explorer/patterns'
      tag: 'Documentation'
      text: 'Detect patterns inside your logs'
    - link: 'logs/processing'
      tag: 'Documentation'
      text: 'Learn how to process your logs'
    - link: 'logs/explorer/saved_views'
      tag: 'Documentation'
      text: 'Automatically configure your Log Explorer'
---

{{< img src="logs/explorer/facet/facets_in_explorer.gif" alt="Facets in Explorer Facet" style="width:100%;">}}

## Overview

Facets are user-defined tags and attributes from your indexed logs. They are meant for either qualitative or quantitative data analysis. As such, you can use them in your Log Explorer to:

- [Search upon your logs][1]
- [Define log patterns][2]
- [Perform Log analytics][3]

Facets also allow you to manipulate your logs in your [log monitors][4], log widgets in [dashboards][5], and [notebooks][6].

**Note**: You do not need facets to support [log processing][7], [livetail search][8], [archive][9] forwarding, rehydration, or [metric generation][10] from logs. You also do not need facets for routing logs through to [Pipelines][11] and [Indexes][12] with filters, or excluding or sampling logs from indexes with [exclusion filters][13]. In all these contexts, autocomplete capabilities rely on existing facets, but any input matching incoming logs would work.

### Qualitative facets
#### Dimensions

Use qualitative facets when you need:

- To **filter** your logs against specific value(s). For instance, create a facet on an `environment` [tag][14] to scope troubleshooting down to development, staging, or production environments.
- To **get relative insights** for values. For instance, create a facet on `http.network.client.geoip.country.iso_code` to see the top countries most impacted per number of 5XX errors on your [NGINX][15] web access logs, enriched with the Datadog [GeoIP Processor][16].
- To **count unique values**. For instance, create a facet on `user.email` from your [Kong][17] logs to know how many users connect every day to your website.

#### Types

Qualitative facets can have a string or numerical (integer) type. While assigning string type to a dimension works in all case, using integer types on a dimension enables range filtering on top of all aforementioned capabilities. For instance, `http.status_code:[200 TO 299]` is a valid query to use on a integer-type dimension. See [search syntax][1] for reference.

### Quantitative facets
#### Measures

Use measures when you need:

- To **aggregate values** from multiple logs. For instance, create a measure on the size of tiles served by the [Varnish cache][18] of a map server and keep track of the **average** daily throughput, or top-most referrers per **sum** of tile size requested.
- To **range filter** your logs. For instance, create a measure on the execution time of [Ansible][19] tasks, and see the list of servers having the most runs taking more than 10s.
- To **sort logs** against that value. For instance, create a measure on the amount of payments performed with your [Python][20] microservice. You can then search all the logs, starting with the one with the highest amount.

#### Types

Measures come with either a (long) integer or double value, for equivalent capabilities.

#### Units

Measures support units in **time** or **size** for easier handling of orders of magnitude at query time and display time.

| type        | unit(s)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte / kibibyte / mebibyte / gibibyte / tebibyte / pebibyte / exbibyte                                                                                                                                                                                                                                               |
| TIME        | nanosecond / microsecond / millisecond / second / minute / hour / day / week                                                                                                                                                                                                                                               |

Unit is a property of the measure itself, not of the field. For example, consider a `duration` measure in nanoseconds: you have logs from `service:A` where `duration:1000` stands for 1000 milliseconds, and other logs from `service:B` where `duration:500` stands for 500 microseconds:

1. Scale duration into nanoseconds for all logs flowing in with the [arithmetic processor][21]. Use a `*1000000` multiplier on logs from `service:A`, and a `*1000` multiplier on logs from `service:B`.
2. Use `duration:>20ms` (see [search syntax][1] for reference) to consistently query logs from both services at once, and see an aggregated result of max `1 min`.

## Facet panel

The search bar provides the most comprehensive set of interactions to slice and dice your data. However, for most cases, the facet panel is likely to be a more straightforward way to navigate into your data. Open a facet to see a summary of its content for the scope of the current query.

**Facets (qualitative)** come with a top list of unique values, and a count of logs matching each of them:

{{< img src="logs/explorer/facet/dimension_facet.png" alt="Dimension Facet" style="width:30%;">}}

Scope the search query clicking on either value. Clicking on a value toggles the search on this unique value and all values. Clicking on checkboxes adds or removes this specific value from the list of all values, you can also search upon its content:

{{< img src="logs/explorer/facet/dimension_facet_wildcard.png" alt="Facet Autocomplete" style="width:30%;">}}

**Measures** come with a slider indicating minimum and maximum values. Use the slider, or input numerical values, to scope the search query to different bounds.

{{< img src="logs/explorer/facet/measure_facet.png" alt="Measures facet" style="width:30%;">}}

### Hide facets

Your organization has a whole collection of facets to address its comprehensive set of use cases across all different teams using logs. Most likely, however, only a subset of these facets is valuable to you in a specific troubleshooting context. Hide facets you don't need on a routine basis, to keep only the most relevant facets for your troubleshooting sessions.

{{< img src="logs/explorer/facet/hide_facet.png" alt="Hide Facet" style="width:30%;">}}

Hidden facets are still visible in the facet search (see the [Filter Facet](#filter-facets) section) in case you need it. Unhide hidden facets from there.

{{< img src="logs/explorer/facet/unhide_facet.png" style="width:50%;" alt="Unhide Facet" style="width:30%;">}}

Hidden facets are also hidden from auto-complete in the search bar, and drop down (such as measure, group-by) in analytics for the Log Explorer. However, hidden facets are still valid for search queries (in case you copy-paste a log-explorer link for instance).

Hidden facets have no impact aside from the log explorer (for instance: live tail, monitors, or widget definitions in dashboards).

#### Hidden facets and teammates

Hiding facets is specific to your own troubleshooting context and won't impact your teammates' view, unless you update a [Saved View][22]. Hidden facets is part of the context saved in a saved view.

### Group facets

Facets are grouped into meaningful themes, to ease navigation in the facet list. Assigning or reassigning a group for a facet (see how to [manage facets](#manage-facets)) is only a matter of display in the facet list, and has no impact on search and analytics capabilities.

{{< img src="logs/explorer/facet/group_facets.png" alt="Group Facet" style="width:30%;">}}

### Filter facets

Use the search box on facets to scope down the whole facet list and jump more quickly to the very one you need to interact with. Facet search uses both facet display name and facet field name to scope down results.

{{< img src="logs/explorer/facet/search_facet.png" alt="Search Facet" style="width:30%;">}}

### Aliased facets

Some facets may have been aliased (see the [alias facet](#alias-facets) section). Aliased facets are still valid for slicing and dicing, but are considered deprecated by your organization:

{{< img src="logs/explorer/facet/aliased_facet.png" alt="Aliased Facet" style="width:30%;">}}

When troubleshooting, it is more likely for you to find content from other teams (alongside content from your team) in the _standard_ facet rather than the _aliased_ facet. This makes correlation on content from diverse origins more straightforward.

If you see an aliased facet in your facet list, consider using the _standard_ facet instead by clicking the **switch to alias** menu item. This action hides the aliased facet and unhides the standard facet. If doing so makes you update a saved view, consider saving the saved view so that the aliasing applies to everyone using this saved view.

{{< img src="logs/explorer/facet/switch_facet.png" alt="Switch Facet" style="width:30%;">}}

You may wish to keep the non-standard _aliased_ version of the facet if you are troubleshooting against old content (before the aliasing for this facet has been setup by your organization).

## Manage facets

### Out-of-the-box facets

Most common facets such as `Host`, `Service`, `URL Path`, or `Duration` come out-of-the-box to start troubleshooting right away once your logs are flowing into log indexes.

Facets on [Reserved Attributes][23] and most [Standard Attributes][24] are available by default.

### Index facet

The index facet is a specific facet that appears only if your organization has [multiple indexes][25], and/or if you have active [historical views][26]. Use this facet if you want to scope down your query to a subset of your indexes.

{{< img src="logs/explorer/facet/index_facet_.png" alt="Create Facet" style="width:30%;">}}

### Create facets

As a matter of good practice, always consider using an existing facet rather than creating a new one (see the [alias facets](#alias-facets) section). Using a unique facet for information of a similar nature fosters cross-team collaboration.

**Note**: Once a facet is created, its content is populated **for all new logs** flowing in **either** index. For an optimal usage of the Log Management solution, Datadog recommends using at most 1000 facets.

#### Log side panel

The easiest way to create a facet is to add it from the log side panel, where most of the facet details—such as the field name or the underlying type of data—are pre-filled and it's only a matter of double-checking. Navigate in the [Log Explorer][1] to whichever log of interest bearing the field to create a facet on. Open the side-panel for this log, click on the corresponding field (either in tags or in attributes) and create a facet from there:

- If the field has a string value, only facet creation is available.
- If the field has a numerical value, both facet and measure creation are available.

{{< img src="logs/explorer/facet/create_facet_from_attribute.png" alt="Create Facet from attribute" style="width:30%;">}}

**Note**: As a best practice, it is recommended to use no more than 1000 facets.

#### Facet list

In case finding a matching log is not an option, create a new facet directly from the facet panel using the _add facet_ button.

Define the underlying field (key) name for this facet:

- Use tag key name for tags.
- Use the attribute path for attributes, with `@` prefix.

Autocomplete based on the content in logs of the current views helps you to define the proper field name. But you can use virtually any value here, specifically in the case that you don't yet have matching logs flowing in your indexes.

{{< img src="logs/explorer/facet/create_facet_from_scratch.png" alt="Create Facet from scratch" style="width:30%;">}}

### Alias facets

Gathering similar content under a unique facet enables cross-team analytics and eases cross-team troubleshooting—see [Naming Convention][24] for reference.

Use aliasing as an option to smoothly realign teams that rely on inconsistent naming conventions. With aliasing, you can have them all using the standard facet emerging for your organization.

#### Aliasing facet to facet

This is the best option if multiple teams in your organization already created multiple facets for similar content.

When aliasing an _aliased_ facet towards a _standard_ facet:

- Users can use either aliased and standard facets for troubleshooting. You may prefer the standard one, which eases correlation of content flowing from diverse and possibly heterogeneous sources.
- Users are nudged to use the standard facet in place of the aliased one.

To alias a facet towards a standard one, select the `Alias to...` action item in the facet menu. Pick the destination facets from all the [standard][27] ones existing for your organization.

{{< img src="logs/explorer/facet/alias_modal.png" alt="alias modal" style="width:30%;">}}

#### Aliasing attribute to facet

This is the best option if you onboard logs flowing from new sources. Rather than creating a facet for some field on those logs, and right after deprecating this facet by aliasing it to a standard facet, alias the field directly to an existing facet:

{{< img src="logs/explorer/facet/alias_facet_from_attribute.png" alt="Alias facet from attribute" style="width:30%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/search_syntax/
[2]: /logs/explorer/patterns/
[3]: /logs/explorer/analytics/
[4]: /monitors/monitor_types/log/
[5]: /dashboards/widgets/
[6]: /notebooks/
[7]: /logs/processing/processors/
[8]: /logs/live_tail/
[9]: /logs/archives/
[10]: /logs/logs_to_metrics/
[11]: /logs/processing/pipelines/
[12]: /logs/indexes/#indexes-filters
[13]: /logs/indexes/#exclusion-filters
[14]: /getting_started/tagging/assigning_tags/
[15]: /integrations/nginx/
[16]: /logs/processing/processors/?tab=ui#geoip-parser
[17]: /integrations/kong/
[18]: /integrations/varnish/
[19]: /integrations/ansible/
[20]: /integrations/python/
[21]: /logs/processing/processors/?tab=ui#arithmetic-processor
[22]: /logs/explorer/saved_views/
[23]: /logs/processing/#reserved-attributes
[24]: /logs/processing/attributes_naming_convention/
[25]: /logs/indexes/#indexes
[26]: /logs/archives/rehydrating/
[27]: /logs/processing/attributes_naming_convention/#standard-attribute-list
