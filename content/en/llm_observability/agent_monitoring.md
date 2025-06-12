---
title: Agent Monitoring
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability is not available for your selected <a href="/getting_started/site/">Datadog site</a> ({{< region-param key="dd_site_name" >}}). </div>
{{< /site-region >}}

## Overview

LLM Observability allows you to monitor, troubleshoot, and improve your agentic applications. With the LLM Observability SDK for Python, you can monitor the health and quality of your single- or multi-agentic systems built on [OpenAI Agents SDK][1], [LangGraph][2], or [CrewAI][3].

For your agentic applications, LLM Observability allows you to:

- Monitor error rate, latency build up, or cost 
- Visualize agent decisions, such as tools used or agent a task was handed off to
- Trace and troubleshoot end-to-end requests of agent executions 


{{< callout url="http://www.datadoghq.com/product-preview/llm-observability" btn_hidden="false" header="Join the Preview!">}}
LLM Observability's Graph-based Visualization for Agentic Systems is in Preview.
{{< /callout >}}

[1]: /llm_observability/setup/auto_instrumentation?tab=python#openai-agents
[2]: /llm_observability/setup/auto_instrumentation?tab=python#langgraph
[3]: /llm_observability/setup/auto_instrumentation?tab=python#crew-ai
