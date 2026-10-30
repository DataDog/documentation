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

<div class="alert alert-info">Agent Tracking is in Preview.</div>

## Overview

Agent Tracking groups the spans in your application by the agent that produced them, so you can monitor each agent, compare its versions, and see how its configuration changed between versions.

Agent Tracking enables you to:
- See all agents in your application, with call volume, latency, tokens, estimated cost, and error rate
- Find your most expensive and slowest agents
- Break down an agent's activity by version
- Compare two versions side by side, including a diff of their instructions, tools, and model
- Jump to the spans for an agent or a specific version

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

| SDK | Minimum version |
|-----|-----------------|
| Python | `dd-trace` v4.13.0 |
| Node.js | `dd-trace` TBD |
| Java | `dd-trace-java` v1.66.0 |
| Go | `dd-trace-go` TBD |

### Agent version

Set a version on your agent span. The version is set as an `agent_version` tag on the agent span and on the spans started under it in the same process. Agent Tracking uses the tag on the agent's LLM and embedding spans to break down tokens and cost by version.

{{< tabs >}}
{{% tab "Python" %}}
Requires `dd-trace` v4.14.0+. In versions before TBD, only the agent span is tagged. To break down tokens and cost by version on those versions, add the `agent_version` tag to the agent's child spans with `LLMObs.annotation_context(tags={"agent_version": "v2"})`.

```python
from ddtrace.llmobs import LLMObs

with LLMObs.agent(name="travel_planner", version="v2"):
    ...
```

You can also set the version on the active agent span with `LLMObs.annotate()`, or on every agent span in a block with `LLMObs.annotation_context()`:

```python
with LLMObs.annotation_context(agent={"version": "v2"}):
    run_agent()
```

A version set with `annotate()` after the agent has started only reaches spans started after the call.
{{% /tab %}}
{{% tab "Node.js" %}}
Requires `dd-trace` TBD.

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

The Go SDK does not support manual agent versioning.

### Agent manifest

The agent manifest describes how an agent is configured. Agent Tracking uses it to show what changed between versions.

#### Automatic

The Python SDK reports a manifest automatically for agents built with PydanticAI. Other framework integrations report a partial manifest, which may not render fully.

#### Manual

{{< tabs >}}
{{% tab "Python" %}}
Requires `dd-trace` v4.16.0+. Pass an `agent` dictionary to `LLMObs.annotate()` on an agent span, or to `LLMObs.annotation_context()` to apply it to every agent span in a block:

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
Requires `dd-trace` TBD.

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

All manifest fields are optional. Values that cannot be reported are dropped, and later annotations update the manifest field by field.

| Field | Description |
|-------|-------------|
| `name` | The agent's name. Defaults to the agent span's name. |
| `instructions` | The system instructions the agent runs with. |
| `model` | The model the agent is configured to call. |
| `model_settings` | Inference parameters such as `temperature`, `max_tokens`, and `top_p`. Provider-specific keys are dropped. |
| `tools` | The tools the agent can call. Each tool requires a `name` and accepts an optional `description` and `parameters`. |

## Use Agent Tracking in Agent Observability

View your app in Agent Observability and open the {{< ui >}}Overview{{< /ui >}}. The {{< ui >}}Agents{{< /ui >}} section features the following information:

- {{< ui >}}Agent Usage{{< /ui >}}: A timeseries chart displaying calls per agent over time
- {{< ui >}}Recent agents{{< /ui >}}: Each agent's last seen time, number of versions, p95 latency, tokens, estimated cost, span count, and error rate
- {{< ui >}}Most Expensive Agents{{< /ui >}}: Agents ranked by estimated cost
- {{< ui >}}Highest Latency Agents{{< /ui >}}: Agents ranked by p95 duration

Tokens and cost are summed from the LLM and embedding spans attributed to each agent.

Click an agent to open a side panel with metrics broken down by version. Select a version to see its instructions and manifest, or click {{< ui >}}Compare{{< /ui >}} to diff two versions. Click {{< ui >}}View Spans{{< /ui >}} to open Trace Explorer filtered to that agent or version.

## Limitations

- **Nearest agent only**: A span is attributed to its nearest agent ancestor. When one agent calls another, the LLM calls made by the inner agent count toward the inner agent only, not the outer one.
- **Agents are identified by name**: Two agents with the same name are combined, and renaming an agent starts a new history.
- **Version propagation is in-process**: `agent_version` does not propagate across services.
- **Version comparison**: The diff covers instructions, tools, and model. Other manifest fields are displayed but not compared.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
