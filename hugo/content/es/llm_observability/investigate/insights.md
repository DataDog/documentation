---
description: Agent Observability Insights identifica problemas recurrentes de costo
  y confiabilidad en las trazas existentes y recomienda soluciones.
further_reading:
- link: /llm_observability/investigate/cost/
  tag: Documentación
  text: Haga un seguimiento de los costos de LLM
- link: /llm_observability/investigate/evaluations/
  tag: Documentación
  text: Evalúe sus aplicaciones de LLM
- link: /llm_observability/build_with_ai/mcp_server/
  tag: Documentación
  text: Conecte agentes de IA a Agent Observability
title: Insights
---
## Descripción general {#overview}

Agent Observability Insights analiza automáticamente las trazas que Agent Observability recibe de su aplicación para encontrar problemas recurrentes de costo y confiabilidad. Use Insights para priorizar qué corregir sin revisar las trazas una por una.

Cada insight incluye:

- Una causa raíz que describe el comportamiento recurrente
- Una evaluación de impacto basada en las llamadas o sesiones afectadas
- Evidencia de traza y tramo que respalda el hallazgo
- Una solución recomendada y una forma de validarla

<div class="alert alert-info">Insights no requiere configuración adicional. Datadog analiza las trazas que su aplicación ya envió a Agent Observability.</div>

## Cómo funciona Insights {#how-insights-works}

Datadog analiza trazas recientes en múltiples llamadas o sesiones para identificar problemas recurrentes de costo y confiabilidad. Verifica el comportamiento esperado, como reintentos exitosos o respuestas largas requeridas por la tarea.

Datadog agrupa los hallazgos con la misma causa raíz en un único insight. Los análisis posteriores actualizan el insight y lo resuelven automáticamente cuando el problema ya no aparece. Si el problema regresa, Datadog lo muestra de nuevo.

### Tipos de insight {#insight-types}

| Categoría | Tipo de insight | Qué identifica |
|---|---|---|
| Costo | Almacenamiento en caché de prompts ineficiente | Contenido de prompt reutilizable que pierde el caché del proveedor y aumenta el costo de los tokens de entrada. |
| Costo | Resultados de herramientas grandes | Resultados de herramientas que agregan contenido innecesario a solicitudes posteriores del modelo y aumentan el uso de tokens o la presión sobre el contexto. |
| Costo | Salida de modelo detallada | Respuestas o razonamiento del modelo que utilizan más tokens de salida de los que requiere la tarea. |
| Confiabilidad | Bucles de reintento de llamadas a herramientas | Llamadas repetidas a la misma herramienta que utilizan argumentos casi idénticos y no logran avanzar. |
| Confiabilidad | Violaciones de reglas de prompt | Comportamiento del Agent que infringe una regla explícita en un prompt, habilidad o descripción de herramienta. |

## Comprenda el impacto y la evidencia {#understand-impact-and-evidence}

Dependiendo del tipo, una Cost Insight muestra el gasto recuperable estimado o el costo exacto del trabajo del modelo que no produjo un resultado utilizable. Los Reliability Insights muestran las llamadas o sesiones confirmadas afectadas por el problema.

Abra las trazas y tramos vinculados para comparar la evidencia con la causa raíz establecida. El rastro de investigación muestra los pasos y la evidencia de respaldo que produjeron el hallazgo.

## Revise y actúe sobre los insights {#review-and-act-on-insights}

1. En Datadog, vaya a [**AI Observability > Agent Observability > Insights**][1].
2. Utilice la descripción general y los filtros para priorizar los insights por aplicación, tipo, gravedad, estado o impacto.
3. Abra un insight para revisar el hallazgo.
4. Aplique y valide la solución recomendada. Puede usar **Fix with Bits** o un agente de codificación compatible con MCP. Con acceso de lectura y escritura a Work Management, también puede crear o vincular un ticket de Jira o una incidencia de Linear.
5. Establezca el estado en **Para revisión**, **En curso**, **Completado** o **Ignorado** para registrar su decisión. Datadog establece el estado en **Resuelto automáticamente** cuando un análisis posterior ya no encuentra el problema.

Los insights aparecen en la página de resumen de una aplicación. Los Cost Insights también aparecen en la página **Cost** junto al gasto relacionado.

## Utilice Insights con un agente de codificación {#use-insights-with-a-coding-agent}

Conecte el [Datadog MCP Server][2] a un agente de codificación compatible con MCP. El agente puede recuperar la causa raíz, la evidencia, la solución recomendada y la guía de validación de un insight para implementar y probar un cambio.

### Automatice las revisiones y correcciones de insights {#automate-insight-reviews-and-fixes}

Configure un flujo de trabajo recurrente en su agente de codificación para revisar y corregir insights. Por ejemplo:

```text
Use Datadog MCP to list Agent Observability insights with status `for_review` for `<ML_APP>`. Prioritize the returned Insights by severity. For each Insight, review the evidence, implement and validate the recommended fix, and update the insight status based on the result.
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/insights
[2]: /es/llm_observability/build_with_ai/mcp_server/