--- 
title: Correlating LLM Observability and APM
description: Learn how to navigate between LLM Observability spans and APM spans so you can gain insights into LLM-specific operations and your broader application ecosystem.
aliases:
  - /llm_observability/guide/llm_observability_and_apm
further_reading: 
- link: "/llm_observability/terms/" 
  tag: "Documentation" 
  text: "Learn about LLM Observability Spans"
- link: "/glossary/#span/" 
  tag: "Documentation" 
  text: "Learn about APM Spans"
- link: "https://www.datadoghq.com/blog/troubleshooting-rag-llms/"
  tag: "Blog"
  text: "Troubleshooting RAG-based LLM applications"
---

## Overview

This guide explains how you can use both LLM Observability and APM to correlate LLM Observability and APM [spans][6] in Datadog. 

By instrumenting your LLM-specific operations with LLM Observability and your broader application with APM, you can accomplish the following:



* Understand end-to-end visibility: Explore upstream and downstream requests of your LLM applications within the context of your entire application.
* From APM, dive deeper into LLM Observability: Investigate whether or not an issue with your application is specific to LLM-specific applications, such as a call to OpenAI.

## Setup

The LLM Observability SDK is built on APM's dd-tracer. This allows you to use LLM Observability with [Application Performance Monitoring (APM)][7]

If you are using the [LLM Observability SDK for Python][1] along with APM's [`dd-tracer`][2], you can navigate between spans in Datadog APM and LLM Observability without additional setup.

If you are using the [LLM Observability API][3] with `dd-tracer` for APM:

1. Use the appropriate method to obtain the span ID from the tracer (for example, using `span.Context().SpanID()` for the Go tracer).
1. Include the captured span IDs in all of the LLM Observability API requests. This links APM and LLM Observability spans in Datadog.

## Navigate between spans

By using this integration, you can correlate data across your application stack and understand how your LLM applications interact with other components. You can also resolve issues more quickly and optimize your application's performance.

{{< img src="llm_observability/guides/apm/end_to_end_tracing.mp4" alt="This video demonstrates the ability to navigate between LLM Observability spans and APM spans in Datadog" style="width:100%" video=true >}}

### From LLM Observability to APM

To understand the broader context of your LLM operations within your application ecosystem, select an LLM Observability span in the [LLM Observability Explorer][4] and click **APM span** to navigate to the relevant APM span.

{{< img src="llm_observability/guides/apm/llm_span.png" alt="An LLM Observability span with a related APM span that you can navigate to from the Traces page in LLM Observability" style="width:100%;" >}}

### From APM to LLM Observability 

To access LLM-specific insights, select an APM span in the [Trace Explorer][5] and click **View Span** in the LLM Observability section on the **Info** tab to navigate to the corresponding LLM Observability span.

{{< img src="llm_observability/guides/apm/apm_span.png" alt="An APM span with a related LLM Observability span that you can navigate to from the Traces page in APM" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/setup/sdk/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[3]: /llm_observability/setup/api/
[4]: https://app.datadoghq.com/llm/traces
[5]: https://app.datadoghq.com/apm/traces
[6]: /llm_observability/terms/#spans
[7]: /tracing