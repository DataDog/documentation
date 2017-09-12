---
title: Exploration
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

The Log explorer is an optimized view which makes it easy to do any kind of troubleshooting and data exploration.


On this view you have:


* [Time range](#time-range)
* [Log list](#log-list)
* [Columns](#columns)
* [Search Bar](#search-bar)
* [Facets](#facets)

## Time Range
## Log list
## Columns
## Search bar

The search query language is based on the Lucene query string:

[Apache Lucene - Query Parser Syntax](http://lucene.apache.org/core/2_9_4/queryparsersyntax.html)

All search parameters are contained in the url, so it is very simple to share your view.

### Search syntax
A query is broken up into terms and operators.

There are two types of terms:

* A **Single Term** is a single word such as "test" or "hello".

* A **Phrase** is a group of words surrounded by double quotes such as "hello dolly".

Multiple terms can be combined together with Boolean operators to form a more complex query.

Here are the available boolean operators:

||||
|Operator | Description | Example |
| `AND` | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | authentication AND failure |
| `OR` | **Union**: either terms is contained in the selected events| authentication OR password|
| `-` | **Exclusion**: the following term is NOT in the event |authentication AND -password|

//////////////////////////////////////////
////////////////////////////////////////// To do add link attributes
//////////////////////////////////////////

Search on specific [attributes]() (need to add them as facet first) => appname:nginx

### Wildcards
To perform a multi-character wildcard search, use the `*` symbol as follows:

* `appname:web*`  matches every log message that have an appname starting by “web”.
* `hello*` matches all log message starting with hello
* `*hello` matches all log message that ends with hello

### Tags

Your logs inherit tags from their [host](https://docs.datadoghq.com/hostnames/) and [integrations](https://docs.datadoghq.com/integrations/). 
They can be used in the search and in facets as well. However for the search bar, there are specific rules for the tags:

All search parts relating to tags will be prefixed with tags: 
* `tags:test` is searching for the tag #test.
* `tags:("env:prod" OR test)` matches all logs with the tag #env:prod or the tag #test 
* `tags:("service:srvA" OR "service:srvB")` or `tags:(service:(srvA OR srvB))` Matches all logs that contains tags #service:srvA or #service:srvB.
* `tags:("env:prod" AND -”version:beta”)` matches all logs that contains #env:prod and that do not contains #version:beta


## Facets 

A facet displays all the values expressed by an attribute or a tag. This is also a handle to easily filter over your data.

A Facet helps you to break down your datasets over user(s), appname(s), etc ...

### Create a Facet

To start using an attribute or a tag in a Facet or in the search, you simply need to click on it and add it as a Facet:
 
Once this is done, the value of this attribute for all new logs is  stored and can be used for search either in the search bar or in the Facet Panel

### Facet Panel

Use facets to easily filters on your logs. The search bar and url will automatically reflect your selections.

### Expanded view

You can expand a facet and access advanced search options.
Include or exclude pattern within a facet.
For example: You want to have all host starting by “i-06”. 