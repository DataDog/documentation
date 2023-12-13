---
title: Automatic Instrumentation
kind: documentation
algolia:
  tags: ['apm automatic instrumentation']
---

## Overview

Automatic instrumentation allows you to create spans automatically for your application. It allows you to capture observability data from a wide range of standard operations and popular frameworks with minimal manual intervention. You can automatically instrument your application when you install the Datadog Agent with [Single Step Instrumentation][5] or when you [manually add Datadog tracing libraries][6] to your code.

## Getting started

Follow the relevant documentation for your automatic instrumentation approach to learn more:

{{< tabs >}}
{{% tab "Single Step Instrumentation (Beta)" %}}

If you install or update a Datadog Agent with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM. This allows you to automatically instrument your application, without any additional installation or configuration steps.

To get started, read the [Single Step Instrumentation][1] documentation.

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm

{{% /tab %}}

{{% tab "Datadog libraries" %}}

Set up your application to send traces using one of the following official Datadog tracing libraries:

{{< partial name="apm/apm-languages.html" >}}

To instrument an application written in a language that does not have official library support, see the list of [community tracing libraries][1].

[1]: /developers/community/libraries/#apm-tracing-client-libraries
{{% /tab %}}
{{< /tabs >}}

## Use cases

Some situations when you might use automatic instrumentation include:

- Capturing essential observability data across common libraries and languages with minimal configuration.
- Enabling real-time monitoring with pre-configured settings for immediate insights into application performance.
- Simplifying the observability setup for projects where [custom instrumentation][7] is not required.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/add_span_md_and_graph_it/
[2]: /tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /tracing/trace_collection/custom_instrumentation/


