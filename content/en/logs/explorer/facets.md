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

Facets are the special fields (tags and attributes) of your **indexed** logs you use for [search][XXX] and [analytics][XXX] in the Log Explorer, in Log Monitors and Log Widgets in Dashboards and Notebooks.

Facets are meant for either qualitative and quantitative data. For quantitative data, Datadog specifically uses the word "Measure" instead of "Facet". For qualitative data, facets can be seen as "Dimensions". 


### Dimensions (qualitative facets)

Use dimensions when you need:

* to **filter** your logs against specific value(s). For instance, create a facet on an `environment` [tag][YYY] to scope troubleshooting down to development, staging or production environments.

* to **get relative insights** per values. For instance, create a facet on a `http.network.client.geoip.country.iso_code` to see what are the top countries most impacted per number of 5XX errors on your [NGINX][YYY] web acess logs enriched with our Datadog GeoIP Processor.

* to **count unique values**. For instance create a facet on a `user.email` from your [Kong] logs, to know how many users per day connects to your website.

Dimensions can be of string or numerical (integer) type. While assigning string type to a dimension work in any case, using integer type on a dimension enables range filtering. For instance, `http.status_code:[200 TO 299]` is a valid query to use on a integer-type dimension. See [search query language][XXX] for reference.


### Measures (quantitative facets)

Use measures when you need:

* to **aggregate values** from multiple logs. For instance, create a measure on the size of tiles served by the [Varnish cache][YYY] of a map server and keep track of the **average** daily throughput, or top-most referrers per **sum** of tile size requested.

* to **range filter** your logs. For instance, create a measure on the execution time of [Ansible][YYY] taks, and see the list of servers having most runs taking more than 10s. 

* to **sort logs** against that value. For instance, create a measure on the amount of payments performed with your [Python] microservice. And search all the logs, starting with the one with highest amount. 

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




[YYY] /integrations/varnish/
[YYY] /integrations/nginx/
[YYY] /integrations/ansible/
[YYY] /integrations/python/
[YYY] /integrations/kong/
[YYY] /tagging/assigning_tags

[5] /logs/processing/#reserved-attributes

[M] /monitors/monitor_types/log/

