--- 
title: Correlating Agent Observability and APM
description: Learn how to navigate between Agent Observability spans and APM spans so you can gain insights into LLM-specific operations and your broader application ecosystem.
aliases:
  - /llm_observability/guide/llm_observability_and_apm
further_reading: 
- link: "/llm_observability/terms/" 
  tag: "Documentation" 
  text: "Learn about Agent Observability Spans"
- link: "/glossary/#span/" 
  tag: "Documentation" 
  text: "Learn about APM Spans"
- link: "https://www.datadoghq.com/blog/troubleshooting-rag-llms/"
  tag: "Blog"
  text: "Troubleshooting RAG-based LLM applications"
---

## Overview

This guide explains how you can use both Agent Observability and APM to correlate Agent Observability and APM [spans][6] in Datadog. 

By instrumenting your LLM-specific operations with Agent Observability and your broader application with APM, you can accomplish the following:



* Understand end-to-end visibility: Explore upstream and downstream requests of your LLM applications within the context of your entire application.
* From APM, dive deeper into Agent Observability: Investigate whether or not an issue with your application is specific to LLM-specific applications, such as a call to OpenAI.

## Setup

The Agent Observability SDK is built on APM's dd-tracer. This allows you to use Agent Observability with [Application Performance Monitoring (APM)][7]

If you are using the [Agent Observability SDK for Python][1] along with APM's [`dd-tracer`][2], you can navigate between spans in Datadog APM and Agent Observability without additional setup.

If you are using the [Agent Observability API][3] with `dd-tracer` for APM:

1. Use the appropriate method to obtain the span ID from the tracer (for example, using `span.Context().SpanID()` for the Go tracer).
1. Include the captured span IDs in all of the Agent Observability API requests. This links APM and Agent Observability spans in Datadog.

## Navigate between spans

By using this integration, you can correlate data across your application stack and understand how your LLM applications interact with other components. You can also resolve issues more quickly and optimize your application's performance.

{{< img src="llm_observability/guides/apm/end_to_end_tracing.mp4" alt="This video demonstrates the ability to navigate between Agent Observability spans and APM spans in Datadog" style="width:100%" video=true >}}

### From Agent Observability to APM

To understand the broader context of your LLM operations within your application ecosystem, select an Agent Observability span in the [Agent Observability Explorer][4] and click {{< ui >}}APM span{{< /ui >}} to navigate to the relevant APM span.

{{< img src="llm_observability/guides/apm/llm_span.png" alt="An Agent Observability span with a related APM span that you can navigate to from the Traces page in Agent Observability" style="width:100%;" >}}

### From APM to Agent Observability 

To access LLM-specific insights, select an APM span in the [Trace Explorer][5] and click {{< ui >}}View Span{{< /ui >}} in the Agent Observability section on the {{< ui >}}Info{{< /ui >}} tab to navigate to the corresponding Agent Observability span.

{{< img src="llm_observability/guides/apm/apm_span.png" alt="An APM span with a related Agent Observability span that you can navigate to from the Traces page in APM" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/setup/sdk/
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[3]: /llm_observability/setup/api/
[4]: https://app.datadoghq.com/llm/traces
[5]: https://app.datadoghq.com/apm/traces
[6]: /llm_observability/terms/#spans
[7]: /tracing