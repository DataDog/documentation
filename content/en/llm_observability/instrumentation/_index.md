---
title: LLM Observability Instrumentation
further_reading:
    - link: '/llm_observability/auto_instrumentation'
      tag: 'Auto instrumentation'
      text: 'Get started quickly with Automatic Instrumentation'
---


To get started with Datadog LLM Observability, instrument your LLM application or agent(s) by choosing from several approaches based on your programming language and setup. Datadog provides comprehensive instrumentation options designed to capture detailed traces, metrics, and evaluations from your LLM applications and agents with minimal code changes.

## Instrumentation Options
You can instrument your application with the Python, Node.js, or Java SDKs, or by using the LLM Observability API.

### SDK-based instrumentation (Recommended)
Datadog provides native SDKs that offer the most comprehensive LLM observability features:
| Language | SDK Available | Auto-Instrumentation | Custom Instrumentation |
| -------- | ------------- | -------------------- | ---------------------- |
| Python | Python 3.7+ | {{< X >}} | {{< X >}} |
| Node.js | Node.js 16+ | {{< X >}} | {{< X >}} |
| Java | Java 8+ | | {{< X >}} |


To instrument an LLM application with the SDK:
1. Install the LLM Observability SDK
2. Configure the SDK by providing [the required environment variables][6] in your application startup command, or programmatically [in-code][7]. Ensure you have configured your Datadog API key, Datadog site, and machine learning (ML) app name.

#### Auto-instrumentation
Auto-instrumentation captures LLM calls for Python and Node.js applications without requiring code changes. It allows you to get out-of-the-box traces and observability into popular frameworks and providers. For additional details and a full list of supported frameworks and providers, see the [Auto-instrumentation Documentation][1].

Auto-instrumentation automatically captures:
- Input prompts and output completions
- Token usage and costs
- Latency and error information
- Model parameters (temperature, max_tokens, etc.)
- Framework-specific metadata

<div class="alert alert-info">When using supported frameworks, no manual span creation is required for LLM calls. The SDK automatically creates appropriate spans with rich metadata.</div>

#### Custom instrumentation
All supported SDKs provide advanced capabilities for custom instrumentation of your LLM applications in addition to auto-instrumentation, including:
- Manual span creation using function decorators or context managers
- Complex workflow tracing for multi-step LLM applications
- Agent monitoring for autonomous LLM agents
- Custom evaluations and quality measurements
- Session tracking for user interactions

To learn more, see the [SDK Reference Documentation][2].

### HTTP API instrumentation
If your language is not supported by the SDKs or you are using custom integrations, you can instrument your application using Datadog's HTTP API.

The API allows you to:
- Submit spans directly via HTTP endpoints
- Send custom evaluations associated with spans
- Include full trace hierarchies for complex applications
- Annotate spans with inputs, outputs, metadata, and metrics

API endpoints:
- [Spans API][4]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v1/trace/spans`
- [Evaluations API][5]: `POST` `https://api.{{< region-param key="dd_site" code="true" >}}/api/intake/llm-obs/v2/eval-metric`

To learn more, see the [HTTP API Documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /llm_observability/auto_instrumentation
[2]: /llm_observability/instrumentation/sdk
[3]: /llm_observability/setup/api
[4]: /llm_observability/instrumentation/api/?tab=model#spans-api
[5]: /llm_observability/instrumentation/api/?tab=model#evaluations-api
[6]: /llm_observability/instrumentation/sdk#command-line-setup
[7]: /llm_observability/instrumentation/sdk#in-code-setup