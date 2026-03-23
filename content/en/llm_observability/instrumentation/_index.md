---
title: LLM Observability Instrumentation
further_reading:
    - link: '/llm_observability/auto_instrumentation'
      tag: 'Auto instrumentation'
      text: 'Get started quickly with Automatic Instrumentation'
    - link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
      tag: Blog
      text: Datadog LLM Observability natively supports OpenTelemetry GenAI Semantic Conventions
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

##### Decorator quick-reference

The following examples show how to add LLM Observability instrumentation to your functions. The `@workflow`, `@agent`, `@tool`, and `@task` decorators automatically capture function inputs and outputs. For full arguments and options, see the [SDK Reference Documentation][2].

{{< tabs >}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow, agent, tool, task, llm, retrieval

@workflow
def my_pipeline(input_data):
    # Top-level entry point for a static sequence of operations
    ...

@agent
def my_agent(user_message):
    # Autonomous agent with dynamic decision-making
    ...

@tool
def call_external_api(query):
    # Calls to external services, APIs, or databases
    ...

@task
def preprocess_data(raw_input):
    # Internal processing steps (no external calls)
    ...

@llm(model_name="gpt-4o", model_provider="openai")
def invoke_llm(prompt):
    # Direct LLM call (only needed if not using auto-instrumentation)
    ...
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({ llmobs: { mlApp: '<ML_APP>' } })
const llmobs = tracer.llmobs

// Top-level entry point for a static sequence of operations
myPipeline = llmobs.wrap({ kind: 'workflow' }, myPipeline)

// Autonomous agent with dynamic decision-making
myAgent = llmobs.wrap({ kind: 'agent' }, myAgent)

// Calls to external services, APIs, or databases
callExternalApi = llmobs.wrap({ kind: 'tool' }, callExternalApi)

// Internal processing steps (no external calls)
preprocessData = llmobs.wrap({ kind: 'task' }, preprocessData)

// Direct LLM call (only needed if not using auto-instrumentation)
invokeLlm = llmobs.wrap({ kind: 'llm', modelName: 'gpt-4o', modelProvider: 'openai' }, invokeLlm)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;

// Top-level entry point for a static sequence of operations
LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-pipeline", null, null);

// Autonomous agent with dynamic decision-making
LLMObsSpan agentSpan = LLMObs.startAgentSpan("my-agent", null, null);

// Calls to external services, APIs, or databases
LLMObsSpan toolSpan = LLMObs.startToolSpan("call-external-api", null, null);

// Internal processing steps (no external calls)
LLMObsSpan taskSpan = LLMObs.startTaskSpan("preprocess-data", null, null);

// Direct LLM call (only needed if not using auto-instrumentation)
LLMObsSpan llmSpan = LLMObs.startLLMSpan("invoke-llm", "gpt-4o", "openai", null, null);

// Call span.finish() after each operation completes
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Instrumentation is additive. Add imports and decorators to your existing functions without modifying their signatures, return values, or internal logic. Do not restructure or refactor code to accommodate instrumentation.</div>

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