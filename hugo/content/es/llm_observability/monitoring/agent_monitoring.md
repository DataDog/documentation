---
aliases:
- /es/llm_observability/agent_monitoring
further_reading:
- link: https://www.datadoghq.com/blog/openai-agents-llm-observability/
  tag: Blog
  text: Monitorizar tus agents de OpenAI con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/monitor-ai-agents/
  tag: Blog
  text: Monitorizar, resolver problemas y mejorar los agents de IA con Datadog
- link: https://www.datadoghq.com/blog/llm-observability-bedrock-agents/
  tag: Blog
  text: Monitorizar agents construidos en Amazon Bedrock con Datadog LLM Observability
title: Monitorización del Agent
---

## Información general

LLM Observability te permite monitorizar, solucionar problemas y mejorar tus aplicaciones con agent. Con el SDK de LLM Observability para Python, puedes monitorizar el estado y calidad de tus sistemas de uno o múltiples agents construidos sobre [el SDK de Agents de OpenAI][1], [LangGraph][2], o [CrewAI][3].

Para tus aplicaciones con agent, LLM Observability te permite:

- Monitorizar la tasa de error, acumulación de latencia o coste 
- Visualizar las decisiones de los agents, como las herramientas utilizadas o el agent al que se ha encomendado una tarea
- Rastrear y solucionar las solicitudes de extremo a extremo de las ejecuciones de los agents


{{< callout url="http://www.datadoghq.com/product-preview/llm-observability" btn_hidden="false" header="Únete a la vista previa">}}
La visualización basada en gráficos de LLM para sistemas con agent está en vista previa.
{{< /callout >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/setup/auto_instrumentation?tab=python#openai-agents
[2]: /es/llm_observability/setup/auto_instrumentation?tab=python#langgraph
[3]: /es/llm_observability/setup/auto_instrumentation?tab=python#crew-ai