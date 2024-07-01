---
title: Span Tag Semantics
kind: documentation
further_reading:
    - link: logs/log_configuration/attributes_naming_convention
      tag: Documentation
      text: Learn more about standard attributes for Log Management
    - link: /real_user_monitoring/browser/data_collected
      tag: Documentation
      text: Data collected for RUM Browser
    - link: /tracing/trace_explorer/query_syntax/
      tag: Documentation
      text: Learn how to explore your traces
---

## Overview

[Datadog tracing libraries][1] provide out-of-the-box support for instrumenting a variety of libraries.
These instrumentations generate spans to represent logical units of work in distributed systems.
Each span consists of [span tags][2] to provide additional information on the unit of work happening in the system. Naming conventions describe the name and content that can be used in span events.

<div class="alert alert-info">To find a comprehensive list of all span tags, reserved attributes, and naming conventions, see <a href="/standard-attributes/?product=apm">Default Standard Attributes.</a></div>

## Span tag naming conventions

There are a variety of span tags to describe work happening in the system. For example, there are span tags to describe the following domains:

- **Reserved**: Attributes that are always present on all spans.
- **Core**: Instrumentation used and the kind of operation.
- **Network communications**: Work units corresponding to network communications.
- **HTTP requests**: HTTP client and server spans.
- **Database**: Database spans.
- **Message queue**: Messaging system spans.
- **Remote procedure calls**: Spans corresponding to remote procedure calls such as RMI or gRPC.
- **Errors**: Errors associated with spans.

For more information, see [Default Standard Attributes][6].

## Span tags and span attributes

Span tags and span attributes are similar but distinct concepts:

- [Span tags](#span-tags) are the context around the span.
- [Span attributes](#span-attributes) are the content of the span.

### Span tags

Span tags are the context around the span. Some examples include:

- **Host tags**: `hostname`, `availability-zone`, `cluster-name`
- **Container tags**: `container_name`, `kube_deployment`, `pod_name`

Tags are usually enriched from other data sources like tags sourced from host, container, or service catalog. These tags are added to the span to describe the context. For example, tags might describe the properties of the host and the container the span is coming from, or the properties of the services the span is emitted from.

To find span tags in Datadog, go to the **Infrastructure** tab in the Trace side panel:

{{< img src="/tracing/attributes/span-tags.png" alt="Span tags on Infrastructure tab." style="width:100%;" >}}

### Span attributes

Span attributes are the content of the span. Some example include:

- `http.url`
- `http.status_code`
- `error.message`

To query span attributes, use the the `@` character followed by the attribute name in the search box. For example, `@http.url`.

To find span attributes in Datadog, go to the **Info** tab in the Trace side panel:

{{< img src="/tracing/attributes/span-attributes.png" alt="Span attributes on Info tab." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: /glossary/#span-tag
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /tracing/setup_overview/configure_data_security/
[5]: /tracing/trace_collection/library_config/
[6]: /standard-attributes/?product=apm
