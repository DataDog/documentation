---
title: Tracing Terminology
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: tracingnav
---
### Overview

In order to get the most from tracing, it's important to understand the terms used, the data they represent and how they work together.

#### Trace

Used to track the time spent by an application processing a single operation. For example, a trace can be used to track the entire time spent processing a complicated web request. Even though the request may require multiple resources and machines to handle the request, all of these function calls and sub-requests would be encapsulated within a single trace.

#### Span

Represents a logical unit of work in the system. Each trace consists of one or more spans. Spans are associated with a service and optionally a resource. Each span consists of a start time, a duration, and optional tags. For example, a span can describe the time spent on a distributed call on a separate machine, or the time spent in a small component within a larger operation. Spans can be nested within each other, and in those instances will have a parent-child relationship.

![Visualizing tracing terms](/static/images/tracing-terminology.png "Visualizing tracing terms")

#### Service
The name of a set of processes that do the same job. For instance, a simple web application may consist of two services: a single `webapp` service and a single `database` service, while a more complex environment may break it out into 6 services: 3 separate `webapp`, `admin`, and `query` services, along with a `master-db`, a `replica-db`, and a `yelp-api` external service.

#### Resource

A particular query to a service. For a web application, some examples might be a canonical URL like `/user/home` or a handler function like `web.user.home` (often referred to as "routes" in MVC frameworks). For a sql database, a resource would be the sql of the query itself like `select * from users where id = ?`.

The Tracing backend can track thousands (not millions or billions) of unique resources per service, so resources should be grouped together under a canonical name, like `/user/home` rather than have `/user/home?id=100` and `/user/home?id=200` as separate resources.
