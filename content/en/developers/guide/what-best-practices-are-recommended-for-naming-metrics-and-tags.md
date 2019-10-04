---
title: What best practices are recommended for naming metrics and tags?
kind: faq
further_reading:
- link: "developers/metrics"
  tag: "Documentation"
  text: "Learn more about Datadog metrics"
- link: "/tagging"
  tag: "Documentation"
  text: "Getting started with tags"
aliases:
  - /developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
---

Datadog recommends certain best practices for naming metrics and tags.

**Rules and best practices for naming metrics**:

* Metric names must start with a letter.
* Can only contain ASCII alphanumerics, underscores, and periods. Other characters are converted to underscores.
* Should not exceed 200 characters (though less than 100 is generally preferred from a UI perspective)
* Unicode is not supported.
* It is recommended to avoid spaces.

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). This is described as pseudo-hierarchical because a hierarchy is not actually enforced, but the structure is used to infer certain relationships (e.g. "I see hostA and hostB are reporting 'http.nginx.\*', those must be web frontends").

**Note**: Metric names are case sensitive in Datadog.

**Rules and best practices for naming tags**:

* Tags must start with a letter.
* May contain alphanumerics, underscores, minuses, colons, periods, and slashes. Other characters are converted to underscores.
* Tags can be up to 200 characters long and support Unicode.
* Tags are converted to lowercase.
* For optimal functionality, it is recommended to use the `key:value` syntax.

Examples of commonly used metric tag keys are `env`, `instance`, `name`, and `role`.

{{< partial name="whats-next/whats-next.html" >}}
