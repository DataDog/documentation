---
title: Facet Panel
kind: documentation
description: "Slice and dice"
aliases:
    - /logs/search
further_reading:
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/explorer/patterns"
  tag: "Documentation"
  text: "Detect patterns inside your logs"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer/saved_views"
  tag: "Documentation"
  text: "Automatically configure your Log Explorer"
---


## What are facets for?

Facets are the special fields (tags and attributes) of indexed logs you use for [search][1], [patterns][3] and [analytics][2] in the Log Explorer, in [Log Monitors][4], or Log Widgets in [Dashboards][5] and [Notebooks][6].


*Note: Facets support fast search and analytics capabilities around all **indexed** logs. You don't need facets to support [log processing][7], or [livetail search][8], [archive][9] forwarding and rehydration, or [metric generation][10] from logs. Neither for routing logs through to [Pipelines][11] and [Indexes][12] with filters, or excluding or sampling logs from indexes with [exclusion filters][13]. In all these context, autocomplete capabilities rely on existing facets but any input matching incoming logs would work.

Facets are meant for either qualitative and quantitative data. For quantitative data, Datadog specifically uses the word "Measure" instead of "Facet". For qualitative data, facets can be seen as "Dimensions". 


### Dimensions (qualitative facets)

Use dimensions when you need:

* to **filter** your logs against specific value(s). For instance, create a facet on an `environment` [tag][14] to scope troubleshooting down to development, staging or production environments.

* to **get relative insights** per values. For instance, create a facet on a `http.network.client.geoip.country.iso_code` to see what are the top countries most impacted per number of 5XX errors on your [NGINX][15] web acess logs enriched with our Datadog GeoIP Processor.

* to **count unique values**. For instance create a facet on a `user.email` from your [Kong][16] logs, to know how many users per day connects to your website.

Dimensions can be of string or numerical (integer) type. While assigning string type to a dimension work in any case, using integer type on a dimension enables range filtering on top of all aforementioned capabilities. For instance, `http.status_code:[200 TO 299]` is a valid query to use on a integer-type dimension. See [search query language][17] for reference.


### Measures (quantitative facets)

Use measures when you need:

* to **aggregate values** from multiple logs. For instance, create a measure on the size of tiles served by the [Varnish cache][18] of a map server and keep track of the **average** daily throughput, or top-most referrers per **sum** of tile size requested.

* to **range filter** your logs. For instance, create a measure on the execution time of [Ansible][19] taks, and see the list of servers having most runs taking more than 10s. 

* to **sort logs** against that value. For instance, create a measure on the amount of payments performed with your [Python][20] microservice. And search all the logs, starting with the one with highest amount. 

Measures come with either (long) integer or double value, for equivalent capabilities.


## Curate Facets

### Out-of-the-box facets

Most common facets such as `Host`, `Service` or `URL Path` or `Duration` come out-of-the-box to start troubleshooting right away once your logs are flowing into log indexes.

Facets on [Reserved Attributes][5] are available by default.

### Create Facets


{{< tabs >}}
{{% tab "Dimensions" %}}


To start using an attribute as a facet or in the search, click on it and add it as a facet:

{{< img src="logs/explorer/create_facet.png" style="width:50%;" alt="Create Facet"  style="width:30%;">}}

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], the Facet Panel, and in the [Log Analytics query][2].


{{% /tab %}}

{{% tab "Measures" %}}


A measure is a attribute with a numerical value contained in your logs.

**Create a Measure**:

To start using an attribute as a measure, click on a numerical attribute of your log:

Once this is done, the value of this attribute is stored **for all new logs** and can be used in [the search bar][1], the Facet Panel, and in the [Log Analytics query][2].

**Select the Measure Unit**:

Each measure has its own unit that is then used for display in the Log Explorer columns, Log stream widgets in dashboards, and Log Analytics.

{{% /tab %}}
{{< /tabs >}}


### Alias Facets



## The Facet Panel


### List of Facets

A facet displays all the distinct members of an attribute or a tag and provides some basic analytics, such as the number of logs represented. Facets allow you to pivot or filter your datasets based on a given attribute. To filter, select the values that you want to see.

{{< img src="logs/explorer/facets_demo.png" alt="Facets demo"  style="width:80%;">}}



### Hidden Facets




## Setup

After being processed with the help of pipelines and processors, your logs attributes can be indexed as facets or measures in order to be accessible for your [context](#context) creation and [Log Analytics][3].

**Note**: 

* To leverage the most out of your Log explorer view, make sure your logs attributes follow [Datadog attribute naming convention][4].


[1] /logs/explorer/search/
[2] /logs/explorer/patterns/
[3] /logs/explorer/analytics/
[4] /monitors/monitor_types/log/
[5] /dashboards/widgets/
[6] /notebooks/

[7] /logs/processing/processors
[8] /logs/live_tail/
[9] /logs/archives/
[10] /logs/logs_to_metrics/

[11] /logs/processing/pipelines/
[12] /logs/indexes#indexes-filters
[13] /logs/indexes#exclusion-filters

[14] /tagging/assigning_tags
[15] /integrations/nginx/
[16] /integrations/kong/
[17] /logs/explorer/search/#search-syntax

[18] /integrations/varnish/
[19] /integrations/ansible/
[20] /integrations/python/



[5] /logs/processing/#reserved-attributes


