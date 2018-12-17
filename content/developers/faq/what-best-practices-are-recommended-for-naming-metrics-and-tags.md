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
---

---

We recommend certain best practices for naming metrics and tags.

**For metrics the rules defined are**:

* Metric names must start with a letter
* Can only contain Ascii alphanumerics, underscore and periods (other characters will get converted to underscores)
* Should not exceed 200 characters (though less than 100 is generally preferred from a UI perspective)
* Unicode is not supported
* We recommend avoiding spaces

Metrics reported by the Agent are in a pseudo-hierarchical dotted format (e.g. `http.nginx.response_time`). We say pseudo-hierarchical because we're not actually enforcing a hierarchy or doing anything with it, but we have aspirations to use it to infer things about servers (e.g. "hey, I see hostA and hostB are reporting 'http.nginx.*', those must be web frontends").

**Best practices for naming tags**:

* Tags must start with a letter
* May contain alphanumerics, underscores, minuses, colons, periods and slashes
Other characters will get converted to underscores
* Tags can be up to 200 characters long and support unicode
* Tags will be converted to lowercase
* For optimal functionality, we recommend constructing tags that use the `key:value` syntax

Examples of commonly used metric tag keys are env, instance, name, and role.

{{< partial name="whats-next/whats-next.html" >}}

