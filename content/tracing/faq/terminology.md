---
title: Terminology
kind: faq
---

| Term          | Definition                                                          | Note                                                                                                                                             |
| :----         | :-----                                                              | :---                                                                                                                                             |
| [Service][1]  | Name of a set of processes that do the same job                     | Services are displayed on the [Datadog Services list][2] and have [out of the box performances graphs][3].                                       |
| [Resource][4] | Particular action for a service                                     | Resources are available on the [Resources list for each service][5] and have [out of the box performances graphs][6]                             |
| [Trace][7]    | Representation of a request as it flows across a distributed system | A trace can be collected in [any language][8]. Traces are found in the [Traces list for each resources][9] or in the [Trace search directly][10] |
| [Span][11]    | A logical unit of work in the system                                | Spans are associated with a [service][1] and optionally a [resource][4]. Each span consists of a start time, a duration, and optional tags.      |

[1]: /tracing/visualization/service
[2]: /tracing/visualization/services_list
[3]: /tracing/visualization/service/#out-of-the-box-graphs
[4]: /tracing/visualization/resource
[5]: /tracing/visualization/service/#resources
[6]: /tracing/visualization/resource/#out-of-the-box-graphs
[7]: /tracing/visualization/trace
[8]: /tracing/setup
[9]: /tracing/visualization/resource/#traces
[10]: /tracing/visualization/search
[11]: /tracing/visualization/trace/#spans
