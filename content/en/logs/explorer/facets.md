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

Use dimensions when you need to filter your logs against specific value(s). Dimensions are also valuable when you 


### Measures (quantitative facets)



### Measures (quantitative facets)


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




