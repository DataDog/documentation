---
title: Custom Grouping
kind: documentation
description: Customize how error spans are grouped into issues.
further_reading:
  - link: '/tracing/error_tracking'
    tag: 'Documentation'
    text: 'Learn about Error Tracking for Backend Services' 
---

## Overview

Error Tracking intelligently groups similar errors into issues with a default strategy. By using _custom fingerprinting_, you can gain full control over the grouping decision and customize the grouping behavior for your error spans.

Provide an `error.fingerprint` span tag that Error Tracking can use to group error spans into issues. While the value of the `error.fingerprint` attribute does not have any particular format or requirement, the content must be a string.

If `error.fingerprint` is provided, the grouping behavior follows these rules:

* Custom grouping takes precedence over the default strategy.
* Custom grouping can be applied only to a subset of your error spans and can coexist with the default strategy.
* The content of `error.fingerprint` is used as-is without any modification.
* Spans from the same service and with the same `error.fingerprint` attribute are grouped into the same issue.
* Spans with different `service` attributes are grouped into different issues.

## Setup

Custom grouping only needs an error span and an `error.fingerprint` string span tag.

If you aren't already collecting APM traces with Datadog, see the [APM documentation][1] to set up APM.

### Example

If you're already sending APM spans, add a new `error.fingerprint` tag to your error span.

Here's an example in Python:

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

Exception information is captured and attached to a span if there is one active when the exception is raised.
In this case, `my-custom-grouping-material` is used to group these error spans into a single
issue in Error Tracking.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
