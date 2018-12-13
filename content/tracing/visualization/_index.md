---
title: Getting started with APM
kind: documentation
aliases:
  - /tracing/terminology/
  - /tracing/faq/what-is-the-difference-between-type-service-resource-and-name
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: "Learn how to setup APM tracing with your application"
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: "Discover the list of services reporting to Datadog"
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: "Learn more about services in Datadog"
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: "Dive into your resource performance and traces"
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: "Understand how to read a Datadog Trace"
---

APM collects metrics on your app's performance at four levels of granularity: _services_, _resources_, _traces_, and _spans_ level.

## Services

**A service is a set of processes that do the same job.**
For instance, a simple web application may consist of two services:

* A single `webapp` service and a single `database` service.

While a more complex environment may break it out into 6 services:

* 3 separate services: `webapp`, `admin`, and `query`.
* 3 separate external service:  `master-db`,  `replica-db`, and `yelp-api`.

APM automatically assigns names to your services; however you can also name them explicitly. See instructions for: [Go][1], [Java][2], [Python][3], [Ruby][4].

Service names:

* **Must be lowercase, alphanumeric characters**.
* **Cannot have more than 50 characters**.
* **Cannot contain spaces** (spaces are replaced with underscores).
* must adhere to [metric naming rules][5].

**Note**: Services must have a type attached, APM automatically assigns services one of four types: web, database, cache, custom.

You can also [alert][6] on any service level metric. Read more about monitoring services in APM on the [service list][7] and [service dashboard][8] pages.

## Resources

**A Resource is a particular action for a service**.

* **For a web application**: some examples might be a canonical URL, such as `/user/home` or a handler function like `web.user.home` (often referred to as "routes" in MVC frameworks).
* **For a SQL database**: a resource is the query itself, such as `SELECT * FROM users WHERE id = ?`.

Resources should be grouped together under a canonical name, like `/user/home` rather than have `/user/home?id=100` and `/user/home?id=200` as separate resources. APM automatically assigns names to your resources; however you can also name them explicitly. See instructions for: [Go][9], [Java][2], [Python][10], [Ruby][11].

These resources can be found after clicking on a particular [service][8].

Resource names:

* **Must be lowercase, alphanumeric characters**
* **Cannot exceed 5000 bytes**

[Alert][12] on any resource level metric. Read more about monitoring resources in APM on the [resource dashboard][13] page.

### Resource Cardinality

When a resource such as URL or SQL query cannot be aggregated, it significantly increases the cardinality of resources (ie. the number of unique aggregate resources) to be stored in Datadog.

Having a very high cardinality of resources makes Datadog less usable:

* Too many entries in the resource list is not optimal for navigation.
* Statistics are less relevant (as they are too fragmented).

As a result we have a hard limit on the cardinality of resources for a given service.

### Trace

**A trace is used to track the time spent by an application processing a single operation, each trace consists of one or more spans.**

For example, a trace can be used to track the entire time spent processing a complicated web request. Even though the request may require multiple resources and machines to handle the request, all of these function calls and sub-requests would be encapsulated within a single trace.

### Spans

**A span represents a logical unit of work in the system.**

Spans are associated with a [service][8] and optionally a [resource][13]. Each span consists of a start time, a duration, and optional tags. For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger operation. Spans can be nested within each other, and in those instances will have a parent-child relationship.

{{< img src="getting_started/trace_span_image.png" alt="Trace span image" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer/#service
[2]: /tracing/setup/java/#configuration
[3]: http://pypi.datadoghq.com/trace/docs/index.html#getting-started
[4]: http://www.rubydoc.info/gems/ddtrace
[5]: /developers/metrics
[6]: /monitors/monitor_types/apm
[7]: /tracing/visualization/services_list
[8]: /tracing/visualization/service
[9]: /tracing/setup/go
[10]: /tracing/setup/python
[11]: /tracing/setup/ruby
[12]: /tracing/faq/how-to-create-a-monitor-over-every-resource-apm
[13]: /tracing/visualization/resource
