---
title: What best practices are recommended for naming metrics and tags?
kind: faq
further_reading:
- link: "/developers/metrics/"
  tag: "Documentation"
  text: "Learn more about Datadog metrics"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
aliases:
  - /developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
---

Datadog recommends certain best practices for naming metrics, tags, and services.

## Rules and best practices for naming metrics

* Metric names must start with a letter.
* Can only contain ASCII alphanumerics, underscores, and periods. Other characters are converted to underscores.
* Should not exceed 200 characters (though less than 100 is generally preferred from a UI perspective)
* Unicode is not supported.
* It is recommended to avoid spaces.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). This is described as pseudo-hierarchical because a hierarchy is not actually enforced, but the structure is used to infer certain relationships (e.g. "I see hostA and hostB are reporting `http.nginx.*`, those must be web frontends").

**Note**: Metric names are case sensitive in Datadog.

## Rules and best practices for naming tags

As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][1] documentation.

* Tags must start with a letter.
* May contain alphanumerics, underscores, minuses, colons, periods, and slashes. Other characters are converted to underscores.
* Any trailing underscore will get removed, whether if it originated from a converted character or if it was in the original tag value.
* Contiguous underscores will be reduced to a single underscore.
* Tags can be up to 200 characters long and support Unicode.
* Tags are converted to lowercase.
* For optimal functionality, it is recommended to use the `key:value` syntax.

Examples of commonly used metric tag keys are `instance`, `name`, and `role`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
