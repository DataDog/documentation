---
title: Getting started with APM
kind: documentation
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "/tracing/services/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "/tracing/services/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "/tracing/services/resource"
  tag: "Documentation"
  text: Dive into your resource performances and traces
- link: "/tracing/services/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

{{< vimeo 203196972 >}}

APM collects metrics on your app’s performance at three levels of granularity: _services_, _resources_, and _trace_ level.

## Services

[A service](/tracing/services/service) is a set of processes that do the same job. For instance, a simple web application may consist of two services:

* A single `webapp` service
* A single `database` service

A more complex environment may break this out into 6 services:

* 3 separate services:

  * `webapp`
  * `admin`
  * `query`

* 3 external services:

  * `master-db`
  * `replica-db`
  * `yelp-api`

### Service Types

APM automatically assigns services one of four types: web, database, cache, custom.

### Naming Services

APM automatically assigns names to your services; however you can also name them explicitly. See instructions for: [Go](/tracing/setup/go/), [Java](/tracing/setup/java/#configuration), [Python](/tracing/setup/python/), [Ruby](/tracing/setup/ruby/).

Service names:

* Must be lowercase, alphanumeric characters
* Cannot have more than 50 characters
* Cannot contain spaces (spaces are replaced with underscores)
* Must adhere to metric naming rules

### Service Monitoring

APM measures the following at the individual service level:

* Request volume/rate
* Latency (avg/p75/p90/p95/p99/max)
* Apdex score (web services only)
* Error volume/rate
* Sub-Services (total time spent/%of time spent/avg time per request of your service by services or type)

You can also [alert](/monitors/monitor_types/apm/) on any service level metric. Read more about monitoring services in APM on the [service list](/tracing/services) and [service dashboard](/tracing/services/service) pages.

## Resources

[A resource](/tracing/serviecs/resource) is an individual endpoint or query for a specific service.

* **For a web application**: some examples might be a canonical URL, such as `/user/home` or a handler function like `web.user.home` (often referred to as “routes” in MVC frameworks).
* **For a SQL database**: a resource is be the query itself, such as `SELECT * FROM users WHERE id = ?`.

### Resource Names and Cardinality

APM automatically assigns names to your resources; however you can also name them explicitly. See instructions for: [Go](/tracing/setup/go/), [Java](/tracing/setup/java/#configuration), [Python](/tracing/setup/python/), [Ruby](/tracing/setup/ruby/).

Resource names:

* Must be lowercase, alphanumeric characters
* Cannot exceed 5000 bytes

Resources should be grouped together under a canonical name, such as `/user/home` rather than having `/user/home?id=100` and `/user/home?id=200` as separate resources. This allows APM to aggregate statistics in a meaningful way and prevents an explosion in the number of unique aggregate resources to be stored in Datadog. As such, there is a hard limit on the cardinality of resources.

### Resource Monitoring

APM measures the following at the individual resource level:

* Request volume/rate
* Latency (avg/p75/p90/p95/p99/max)
* Apdex score (web services only)
* Error volume/rate
* Sub-Services (total time spent/%of time spent/avg time per request of your service by services or type)

You can also [alert](/monitors/monitor_types/apm/) on any resource level metric. Read more about monitoring resources in APM on the [resource dashboard](/tracing/services/resource) page.

## Traces

Traces measure the timings of operations executed in an individual request. For example, a trace may track a single, complicated web request- even if multiple resources and machines are required to handle the request, all of its function calls and sub-requests are captured within a single trace.

### Spans

Spans represent one logical unit of work within a trace. Each span consists of a start time, a duration, and optional tags / metadata.

{{< img src="getting_started/trace_span_image.png" alt="Trace span image" responsive="true" popup="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
