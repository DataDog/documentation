---
title: Trace Metrics Namespace
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

The trace metrics namespace is `trace.<name>.<metrics>{<tags>}` where

* `<name>`: is the name of the operation i.e. the `span.name`: (*redis.command*, *pylons.request*, *rails.request*, *mysql.query*)
* `<metrics>` is about the hits, errors or latency ("request.hits", etc.)
* `<tags>` the metrics are tagged by service & resource.

So for pylons it might be `trace.pylons.request.hits{service:web_server}`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
