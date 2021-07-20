---
title: Database Monitoring FAQ
kind: documentation
description: Database Monitoring frequently asked questions
further_reading:
- link: "/tk/tk/"
  tag: "Documentation"
  text: "tktk"

---

## Which database technologies are supported?

TODO: fill in the table

## What is the performance impact of Database Monitoring?

TODO

## Does the Datadog agent collect sensitive information?

TODO

## Which queries are tracked?

Datadog Database Monitoring collects per-query metrics for the top 200 normalized queries measured by their total time spent executing on the host. This limit is applied only to each collection interval (10 seconds by default), so the total number of tracked queries can exceed the configured limit over longer periods of time.

Query samples have no limits on the number of unique normalized queries tracked, but the sampling is biased towards queries which are slow or frequent. It is possible for a query sample to be selected, but have no associated query metrics. This is the case when the query was slow or frequent for a brief period of time, but was not sustained enough to become a top query.

## What are "Other Queries?"

“Other Queries” represent the metrics of all queries which do appear in the top 200 by their total execution time on the database. Because the performance of a particular query can change over time, the metrics for a particular query may sometimes be tracked as a distinct normalized query and other times counted in the “Other Queries.”

TODO: screenshot

## Can the agent be configured to connect to proxies, load balancers, and connection poolers?

The agent must connect directly to the host being monitored. If the database is self-hosted, then “localhost” or the socket is preferred. The agent should not connect to the database through a proxy, load balancer, or connection pooler such as pgbouncer. While this can be an anti-pattern for client applications, each agent must have knowledge of the underlying hostname and should be “sticky” to a single host, even in cases of failover. If the Datadog agent connects to different hosts while it is running, the value of metrics may be incorrect.

### AWS Aurora

Specifically for AWS Aurora, the agent should connect to the “instance endpoint.”  AWS Aurora provides a “cluster endpoint” which allows client applications to connect to a reader or writer instance without knowledge of the underlying database host. While this is desirable for applications, the agent must be aware of all instances.

