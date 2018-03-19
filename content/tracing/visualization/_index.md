---
title: Getting started with APM
kind: documentation
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Dive into your resource performance and traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

APM collects metrics on your app’s performance at four levels of granularity: _services_, _resources_, _traces_, and _spans_ level.

## Services

**A service is a set of processes that do the same job.**  
For instance, a simple web application may consist of two services: 

* A single `webapp` service and a single `database` service.

While a more complex environment may break it out into 6 services: 

* 3 separate services: `webapp`, `admin`, and `query`.
* 3 separate external service:  `master-db`,  `replica-db`, and `yelp-api`.

APM automatically assigns names to your services; however you can also name them explicitly. See instructions for: [Go](https://godoc.org/github.com/DataDog/dd-trace-go/tracer#service), [Java](/tracing/setup/java/#configuration), [Python](http://pypi.datadoghq.com/trace/docs/#get-started), [Ruby](http://www.rubydoc.info/gems/ddtrace/).

Service names:

* **Must be lowercase, alphanumeric characters**.
* **Cannot have more than 50 characters**.
* **Cannot contain spaces** (spaces are replaced with underscores).
* must adhere to [metric naming rules](/developers/metrics/).

**Note**: Service must have a type attached, APM automatically assigns services one of four types: web, database, cache, custom.

You can also [alert](/monitors/monitor_types/apm/) on any service level metric. Read more about monitoring services in APM on the [service list](/tracing/visualization/services_list/) and [service dashboard](/tracing/visualization/service) pages.

## Resources

**A Resource is particular action for a service**.  

* **For a web application**: some examples might be a canonical URL, such as `/user/home` or a handler function like `web.user.home` (often referred to as “routes” in MVC frameworks).
* **For a SQL database**: a resource is be the query itself, such as `SELECT * FROM users WHERE id = ?`.

Resources should be grouped together under a canonical name, like `/user/home` rather than have `/user/home?id=100` and `/user/home?id=200` as separate resources. APM automatically assigns names to your resources; however you can also name them explicitly. See instructions for: [Go](/tracing/setup/go/), [Java](/tracing/setup/java/#configuration), [Python](/tracing/setup/python/), [Ruby](/tracing/setup/ruby/).

These resources can be found after clicking on a particular [service](/tracing/visualization/service).

Resource names: 

* **Must be lowercase, alphanumeric characters**
* **Cannot exceed 5000 bytes**

[Alert](/tracing/faq/how-to-create-a-monitor-over-every-resource-apm) on any resource level metric. Read more about monitoring resources in APM on the [resource dashboard](/tracing/visualization/resource) page.

### Resource Cardinality

When a resource such as URL or SQL query cannot be aggregated, it significantly increases the cardinality of resources (ie. the number of unique aggregate resources) to be stored in Datadog.  

Having a very high cardinality of resources makes Datadog less usable:

* Too much entries in the resource list is not optimal for navigation.
* Statistics are less relevant (as they are too fragmented).

As a result we have a hard limit on the cardinality of resources for a given service.


### Trace

**A trace is used to track the time spent by an application processing a single operation, each trace consists of one or more spans.**  

For example, a trace can be used to track the entire time spent processing a complicated web request. Even though the request may require multiple resources and machines to handle the request, all of these function calls and sub-requests would be encapsulated within a single trace.

### Spans

**A span represents a logical unit of work in the system.**  

Spans are associated with a [service](/tracing/visualization/service) and optionally a [resource](/tracing/visualization/resource). Each span consists of a start time, a duration, and optional tags. For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger operation. Spans can be nested within each other, and in those instances will have a parent-child relationship.

{{< img src="getting_started/trace_span_image.png" alt="Trace span image" responsive="true" popup="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
