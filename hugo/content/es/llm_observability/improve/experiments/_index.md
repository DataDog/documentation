---
aliases:
- /es/llm_observability/experiments_preview
- /es/llm_observability/experiments/
description: Una descripción general de la función de experimentos de Agent Observability.
further_reading:
- link: /llm_observability/improve/experiments/setup
  tag: Documentación
  text: Configurar y utilizar experimentos de Agent Observability
- link: https://www.datadoghq.com/blog/llm-experiments/
  tag: Blog
  text: Cree y haga un seguimiento de experimentos de LLM con Datadog
- link: https://www.datadoghq.com/blog/llm-otel-semantic-convention
  tag: Blog
  text: Datadog LLM Observability admite de forma nativa las convenciones semánticas
    de GenAI de OpenTelemetry
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Impulsar el ROI de la IA: cómo Datadog conecta el costo, el rendimiento y
    la infraestructura para que usted pueda escalar de manera responsable'
- link: https://www.datadoghq.com/blog/llm-observability-at-datadog-nlq
  tag: Blog
  text: Cómo redujimos nuestro tiempo de depuración de agentes NLQ de horas a minutos
    con LLM Observability
- link: https://www.datadoghq.com/blog/offline-llm-evaluations/
  tag: Blog
  text: 'Evaluación offline para agentes de IA: mejores prácticas'
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Evalúe, optimice y asegure su pila de IA de Google Cloud con Datadog
- link: https://www.datadoghq.com/blog/llm-experimentation-autoresearch/
  tag: Blog
  text: Cómo hicimos que un agente de optimización de consultas SQL fuera un 59% más
    preciso utilizando autoresearch y Agent Observability
- link: https://www.datadoghq.com/blog/from-traces-to-experiments-a-loop-for-improving-ai-agents/
  tag: Blog
  text: 'De trazas a experimentos: un ciclo para mejorar los agentes de IA'
title: Experimentos
---
{{< img src="llm_observability/experiments/Experiments_LLMO.png" alt="Agent Observability, para visualizar experimentos. Encabezado: 'Comparando 6 experimentos en 9 campos'. Visualización de gráfico de líneas que muestra la precisión, exactitud, duración, costo estimado y otras métricas de varios experimentos." style="width:100%;" >}}

Agent Observability [Experiments][1] admite todo el ciclo de vida de la creación de aplicaciones y agentes de LLM. Le ayuda a comprender cómo los cambios en los prompts, modelos, proveedores o la arquitectura del sistema afectan el rendimiento. Con esta función, usted puede:

- Crear y versionar conjuntos de datos
- Ejecutar y gestionar experimentos
- Comparar resultados para evaluar el impacto

## Recetarios {#cookbooks}

Para obtener ejemplos detallados de lo que puede hacer con los experimentos de LLM, consulte los [Jupyter notebooks][2] proporcionados por Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/testing/experiments
[2]: https://github.com/DataDog/llm-observability/tree/main/experiments/notebooks