---
title: What best practices are recommended for naming metrics and tags?

further_reading:
- link: "/metrics/"
  tag: "Documentation"
  text: "Learn more about Datadog metrics"
- link: "/getting_started/tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
aliases:
  - /developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
---

Naming convention is an art and possibly one of the most difficult decisions to agree on. Defining a naming convention for your metrics, tags, and services is crucial to have a clean, readable, and maintainable telemetry data. Here are some recommendations:

* Provide descriptive and meaningful names: the metrics or tags clearly describe the purpose or meaning of the value.
* Adhere to the format and limitations described below.
* Avoid abbreviations that might have multiple meanings
* Maintain consistency across all teams, apps, and services.
* Avoid reserved keywords that might cause clashes with the other tags or metrics.
* In the case of metrics, prefix them with a namespace depicting the application or service generating the data.

## Rules and best practices for naming metrics

* Metric names must start with a letter.
* Can only contain ASCII alphanumerics, underscores, and periods. Other characters are converted to underscores.
* Should not exceed 200 characters (though less than 100 is generally preferred from a UI perspective)
* Unicode is not supported.
* It is recommended to avoid spaces.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format, for example: `http.nginx.response_time`. This is described as pseudo-hierarchical because a hierarchy is not actually enforced, but the structure is used to infer certain relationships, for example: _"I see hostA and hostB are reporting `http.nginx.*`, those must be web frontends"_).

**Note**: Metric names are case sensitive in Datadog.

## Rules and best practices for naming tags

As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, see [Unified service tagging][1].

* Tags must start with a letter.
* May contain alphanumerics, underscores, minuses, colons, periods, and slashes. Other characters are converted to underscores.
* A trailing underscore is removed, whether if it originated from a converted character or if it was in the original tag value.
* Contiguous underscores are reduced to a single underscore.
* Tags can be up to 200 characters long (including both key and value) and support Unicode. Additional characters beyond this limit are truncated.
* Tags are converted to lowercase.
* For optimal functionality, it is recommended to use the `key:value` syntax.

Examples of commonly used metric tag keys are `instance`, `name`, and `role`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
