---
title: Agent Observability Guides
disable_toc: true
cascade:
    algolia:
        rank: 20
        category: Guide
        subcategory: Agent Observability Guides
---

{{< whatsnext desc="Agent Observability Guides:" >}}
    {{< nextlink href="/llm_observability/quickstart/" >}}Trace an LLM Application{{< /nextlink >}}
    {{< nextlink href="/llm_observability/guide/trace-an-llm-application-in-aws-lambda" >}}Trace an LLM Application in AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/llm_observability/guide/monitor_proxy_services" >}}Trace Proxy and Gateway Services{{< /nextlink >}}
    {{< nextlink href="/llm_observability/configure/evaluations/" >}}Evaluations{{< /nextlink >}}
    {{< nextlink href="/llm_observability/improve/experiments/setup" >}}Set up and use Agent Observability Experiments{{< /nextlink >}}
    {{< nextlink href="/llm_observability/instrument/agent_observability_and_apm" >}}Using Agent Observability and APM{{< /nextlink >}}
    {{< nextlink href="/llm_observability/guide/monitor_mcp_client" >}}Monitor MCP Clients{{< /nextlink >}}
    {{< nextlink href="/llm_observability/guide/crewai_guide" >}}Using the Datadog-CrewAI integration for Agent Observability{{< /nextlink >}}
    {{< nextlink href="/llm_observability/guide/nextjs_guide" >}}Instrument a Next.js Application for Agent Observability{{< /nextlink >}}
    {{< nextlink href="/llm_observability/guide/agent_monitoring" >}}Agent Monitoring{{< /nextlink >}}
    {{< nextlink href="/llm_observability/configure/evaluations/evaluation_developer_guide" >}}Evaluation Developer Guide: Build custom evaluators{{< /nextlink >}}
    {{< nextlink href="/llm_observability/build_with_ai/claude_code_skills" >}}Analyze LLM Applications with Claude Code Skills{{< /nextlink >}}
{{< /whatsnext >}}

## Set up Agent Observability

If you have not already set up Agent Observability, use one of the following SDKs. Experiments require both a Datadog API key and application key.

1. Install the Agent Observability SDK:

{{< tabs >}}
{{% tab "Python" %}}
```shell
pip install ddtrace>=4.3.0
```
{{% /tab %}}

{{% tab "Node.js" %}}
```shell
npm install dd-trace
```
{{% /tab %}}
{{< /tabs >}}

2. Enable Agent Observability:

{{< tabs >}}
{{% tab "Python" %}}
```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
    api_key="<YOUR_API_KEY>",  # defaults to DD_API_KEY environment variable
    app_key="<YOUR_APP_KEY>",  # defaults to DD_APP_KEY environment variable
    site="datadoghq.com",      # defaults to DD_SITE environment variable
    project_name="<YOUR_PROJECT>"  # defaults to DD_LLMOBS_PROJECT_NAME environment variable, or "default-project" if the environment variable is not set
)
```
{{% /tab %}}

{{% tab "Node.js" %}}
Set `DD_API_KEY` and `DD_APP_KEY` in your environment, then initialize `dd-trace` in your application entrypoint:

```javascript
const tracer = require('dd-trace').init({
  service: '<YOUR_SERVICE>',
  site: 'datadoghq.com',
  llmobs: {
    mlApp: '<YOUR_ML_APP_NAME>',
    projectName: '<YOUR_PROJECT>',
    agentlessEnabled: true,
  },
})

const { experiments } = tracer.llmobs
```

The `projectName` value identifies the Experiments project that contains your datasets and experiments. The `mlApp` value identifies the LLM application used for Agent Observability traces. You can configure these values independently. If `projectName` is not configured, Experiments uses `default-project`; `mlApp` and `service` are not used as Experiments project-name fallbacks. If you use command-line setup, also provide the application key because experiments use the Experiments API:

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_APP_KEY=<YOUR_APP_KEY> \
DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> DD_LLMOBS_PROJECT_NAME=<YOUR_PROJECT> \
NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

For more information, see the [Node.js tracer command-line setup](/llm_observability/instrument/sdk?tab=nodejs#command-line-setup).
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">You must supply both an <code>api_key</code> and <code>app_key</code> for Python, or set both <code>DD_API_KEY</code> and <code>DD_APP_KEY</code> for Node.js.</div>

Your Datadog site is {{< region-param key="dd_site" code="true" >}}. If your site differs, replace `datadoghq.com` in the examples with your Datadog site.

### APM Trace correlation

To correlate your Experiment spans with [APM Traces](/llm_observability/instrument/agent_observability_and_apm/), run Agent Observability through a Datadog Agent and keep `agentless_enabled` or `agentlessEnabled` set to `False` or `false` (the default). The Agent forwards trace data to APM, which enables Experiment ↔ APM Trace correlation.

{{< tabs >}}
{{% tab "Python" %}}
```python
LLMObs.enable(
    api_key="<YOUR_API_KEY>",
    app_key="<YOUR_APP_KEY>",
    site="datadoghq.com",
    agentless_enabled=False,  # default — required for APM Trace correlation
    project_name="<YOUR_PROJECT>",
)
```
{{% /tab %}}

{{% tab "Node.js" %}}
```javascript
const tracer = require('dd-trace').init({
  service: '<YOUR_SERVICE>',
  site: 'datadoghq.com',
  llmobs: {
    mlApp: '<YOUR_ML_APP_NAME>',
    projectName: '<YOUR_PROJECT>',
    agentlessEnabled: false, // default — required for APM Trace correlation
  },
})
```
{{% /tab %}}
{{< /tabs >}}

If you are running without an Agent (for example, in a notebook or CI environment), you can set `agentless_enabled=True` or `agentlessEnabled: true`, but corresponding APM spans are not generated for Experiment spans from agentless runs.
