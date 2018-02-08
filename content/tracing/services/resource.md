---
title: Resource
kind: Documentation
---

{{< img src="tracing/services/resource/ressource.png" alt="Ressource" responsive="true" popup="true">}}

## Definition

**A Resource is particular query to a service**.  

* For a web application: some examples might be a canonical URL like `/user/home` or a handler function like `web.user.home` (often referred to as "routes" in MVC frameworks).  
* For a SQL database: a resource would be the SQL of the query itself like `select * from users where id = ?`.

Resources should be grouped together under a canonical name, like `/user/home` rather than have `/user/home?id=100` and `/user/home?id=200` as separate resources.

These resources can be found after clicking on a particular [service](/tracing/services/#resource).

Resource names: 

* **must be lowercase, alphanumeric characters**
* **cannot exceed 5000 bytes**
* **contain spaces** (spaces are replaced with underscores)
* Must adhere to [metric naming rules](/developers/metrics/).

### Resource Cardinality

When a resource such as URL or SQL query cannot be aggregated, it significantly increases the cardinality of resources (ie. the number of unique aggregate resources) to be stored in Datadog. 

Having a very high cardinality of resources is not useful and becomes difficult to deal with on the Datadog side as each aggregate resources needs to be stored.

As a result we have a hard limit on the cardinality of resources for a given service. This can be triggered when:

//
//
//
//
//
//


## Out of the box graphs

Datadog provides out of the box graphs for any given Resource:

* Requests - Choose to display:
    *  The **Total amount of requests** 
    *  The amount of **Requests per second**
* Latency -  Choose to display:
    *  The Avg/p75/p90/p95/p99/Max latency of your traced requests 
* Error - Choose to display:
    * The **Total amount of errors** 
    * The amount of **Errors per second** 
    * The **% Error Rate** 
* Sub-Services: When there is multiple service involved a 4th graph is available that breaks down your **Total time spent**/**%of time spent**/**Avg time per request** of your service by *services* or *type*.

{{< img src="tracing/services/service/resource_otb_graphs.png" alt="Out of the bow resource graphs" responsive="true" popup="true" style="width:90%;">}}

### Export to Timeboard

On the upper-right corner of each graphs click on the little arrow in order to export your graph into a pre-existing [Timeboard](/graphing/dashboard/timeboard):

{{< img src="tracing/services/service/save_to_timeboard.png" alt="Save to timeboard" responsive="true" popup="true" style="width:40%;">}}

### Latency distribution

In addition to all those graph there is a resource latency distribution graph

{{< img src="tracing/services/resource/resource_latency_distribution.png" alt="Latency distribution" responsive="true" popup="true" style="width:90%;">}}

Zoom on this graph to filter corresponding traces

## Trace

Consult the list of sampled traces associated to your service:

[Refer to our dedicated trace documentation to learn more](/tracing/services/trace).

{{< img src="tracing/services/resource/traces_list.png" alt="Traces list" responsive="true" popup="true" style="width:90%;">}}