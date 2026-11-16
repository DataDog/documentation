---
title: Agent Tracking
description: Use Agent Tracking to monitor your agents, their versions, and what each version costs.

further_reading:
  - link: "/llm_observability/instrument/prompt_tracking"
    tag: "Documentation"
    text: "Prompt Tracking"
  - link: "/llm_observability/guide/agent_monitoring"
    tag: "Documentation"
    text: "Agent Monitoring"
---

## Overview

Agent Tracking groups the spans in your application by the agent that produced them, so you can monitor each agent, compare its versions, and see how its configuration changed between versions.

Agent Tracking enables you to:
- See all agents in your application, with call volume, latency, tokens, estimated cost, and error rate
- Find your most expensive and slowest agents
- Break down an agent's activity by version
- Compare two versions side by side, including a diff of their instructions, tools, and model
- Jump to the spans for an agent or a specific version

{{< img src="llm_observability/monitoring/agent-tracking-hero.png" alt="Agents section of an app's Overview in Agent Observability, showing Agent Usage, Recent agents, Most Expensive Agents, and Highest Latency Agents." style="width:100%;" >}}

Agent Tracking is built on three pieces of data:

| Data | What it does | How it is set |
|------|--------------|---------------|
| Agent attribution | Links each LLM, tool, and embedding span to the agent responsible for it | Automatic |
| Agent version | Identifies which version of an agent produced a trace | Manual |
| Agent manifest | Describes the agent's configuration: instructions, tools, model, and model settings | Automatic for some frameworks, or manual |

## Set up Agent Tracking

### Agent attribution

Agent attribution requires no code changes. When a span starts, the SDK finds its nearest `agent` ancestor and records that agent's name and span ID on the span under `meta.agent_attribution`. Attribution propagates across services through distributed tracing headers.

Spans with no `agent` ancestor are not attributed.

#### Supported SDK versions

| SDK | Minimum version |
|-----|-----------------|
| Python | 4.13.0 |
| Node.js | 5.121.0 or 6.10.0 |
| Java | 1.66.0 |

### Agent version

Set a version on your agent span. The version is set as an `agent_version` tag on the agent span and on the spans started under it in the same process. Agent Tracking uses the tag on the agent's LLM and embedding spans to break down tokens and cost by version.

{{< tabs >}}
{{% tab "Python" %}}
Requires `ddtrace` v4.14.0+.

**Note**: On versions before v4.17.0, child spans are not tagged automatically. Tag them with `LLMObs.annotation_context(tags={"agent_version": "v2"})` to break down tokens and cost by version.

```python
from ddtrace.llmobs import LLMObs

with LLMObs.agent(name="travel_planner", version="v2"):
    ...
```

You can also pass `agent={"version": "v2"}` to `LLMObs.annotate()` or `LLMObs.annotation_context()`.
{{% /tab %}}
{{% tab "Node.js" %}}
Requires `dd-trace` v5.134.0+ or v6.23.0+.

```javascript
const { llmobs } = require('dd-trace')

llmobs.trace({ kind: 'agent', name: 'travel_planner', version: 'v2' }, () => {
  // ...
})
```

The version must not contain a comma. You can also declare it with `llmobs.annotate({ agent: { version: 'v2' } })` or `llmobs.annotationContext({ agent: { version: 'v2' } }, fn)`.
{{% /tab %}}
{{% tab "Java" %}}
Requires `dd-trace-java` v1.66.0+.

```java
LLMObsSpan agentSpan = LLMObs.startAgentSpan("travel_planner", null, null, "v2");
```

The version propagates only when passed to `startAgentSpan`. Setting the `agent_version` tag afterward with `setTag` only tags that span.
{{% /tab %}}
{{< /tabs >}}

### Agent manifest

The agent manifest describes how an agent is configured. Agent Tracking uses it to show what changed between versions.

#### Automatic

The Python SDK reports a manifest automatically for agents built with supported frameworks. Each integration reports the manifest fields that its framework makes available, so the fields can differ by framework. Supported frameworks include PydanticAI, OpenAI Agents SDK, CrewAI, LangGraph, Google ADK, and Claude Agent SDK.

#### Manual

{{< tabs >}}
{{% tab "Python" %}}
Requires `ddtrace` v4.16.0+. Pass an `agent` dictionary to `LLMObs.annotate()` on an agent span, or to `LLMObs.annotation_context()` to apply it to every agent span in a block:

```python
from ddtrace.llmobs import LLMObs

with LLMObs.agent(name="travel_planner") as span:
    LLMObs.annotate(
        span=span,
        agent={
            "version": "v2",
            "instructions": "You help users plan trips.",
            "model": "gpt-4o",
            "model_settings": {"temperature": 0.2},
            "tools": [
                {
                    "name": "search_flights",
                    "description": "Search for flights between two cities.",
                    "parameters": {"origin": {"type": "string", "required": True}},
                },
            ],
        },
    )
```
{{% /tab %}}
{{% tab "Node.js" %}}
Requires `dd-trace` v5.132.0+ or v6.21.0+.

```javascript
llmobs.trace({ kind: 'agent', name: 'travel_planner' }, () => {
  llmobs.annotate({
    agent: {
      version: 'v2',
      instructions: 'You help users plan trips.',
      model: 'gpt-4o',
      modelSettings: { temperature: 0.2 },
      tools: [{ name: 'search_flights', description: 'Search for flights between two cities.' }]
    }
  })
})
```
{{% /tab %}}
{{% tab "Java" %}}
Requires `dd-trace-java` v1.67.0+.

```java
agentSpan.annotateAgentManifest(
    LLMObs.AgentManifest.builder()
        .instructions("You help users plan trips.")
        .model("gpt-4o")
        .tools(List.of(LLMObs.AgentTool.from("search_flights")))
        .build());
```
{{% /tab %}}
{{< /tabs >}}

All manifest fields are optional. Keys that are not in the following table are dropped, and each later annotation updates only the fields that it sets.

| Field | Description |
|-------|-------------|
| `name` | The agent's name. Defaults to the agent span's name. |
| `instructions` | The system instructions the agent runs with. |
| `model` | The model the agent is configured to call. |
| `model_settings` | Inference parameters such as `temperature`, `max_tokens`, and `top_p`. Provider-specific keys are dropped. |
| `tools` | The tools the agent can call. Each tool requires a `name` and accepts an optional `description` and `parameters`. |

{{< img src="llm_observability/monitoring/agent-version-manifest.png" alt="A single agent version in the agent side panel, showing its tools along with usage, cost, and latency charts." style="width:100%;" >}}

## Use Agent Tracking in Agent Observability

View your app in Agent Observability and open the {{< ui >}}Overview{{< /ui >}}. The {{< ui >}}Agents{{< /ui >}} section contains:

- {{< ui >}}Agent Usage{{< /ui >}}: A timeseries chart displaying calls per agent over time
- {{< ui >}}Recent agents{{< /ui >}}: Each agent's last seen time, number of versions, p95 latency, tokens, estimated cost, span count, and error rate
- {{< ui >}}Most Expensive Agents{{< /ui >}}: Agents ranked by estimated cost
- {{< ui >}}Highest Latency Agents{{< /ui >}}: Agents ranked by p95 duration

Tokens and cost are summed from the LLM and embedding spans attributed to each agent.

Click an agent to open a side panel with metrics broken down by version. Select a version to see its instructions and manifest.

{{< img src="llm_observability/monitoring/agent-version-details.png" alt="Agent side panel showing usage by version and a table of versions with spans, tokens, cost, latency, and error rate." style="width:100%;" >}}

Click {{< ui >}}Compare{{< /ui >}} to diff two versions side by side, including their instructions, tools, and model.

{{< img src="llm_observability/monitoring/agent-version-compare.png" alt="Two agent versions compared side by side, with a diff of their instructions and usage by version." style="width:100%;" >}}

Click {{< ui >}}View Spans{{< /ui >}} to open [Trace Explorer][1] filtered to that agent or version.

## Agent Tracking limitations

- **Nearest agent only**: A span is attributed to its nearest agent ancestor. When one agent calls another, the LLM calls made by the inner agent count toward the inner agent only, not the outer one.
- **Agents are identified by name**: Two agents with the same name are combined, and renaming an agent starts a new history.
- **Version propagation is in-process**: `agent_version` does not propagate across services.
- **Version comparison**: The diff covers instructions, tools, and model. Other manifest fields are displayed but not compared.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/traces
