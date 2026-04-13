---
description: Monitoriza tus tokens y costos de LLM.
title: Costo
---
{{< img src="llm_observability/cost_tracking_overview.png" alt="Visualización de costos de una aplicación en LLM Observability." style="width:100%;" >}}

LLM Observability de Datadog calcula automáticamente un costo estimado de cada solicitud de LLM, utilizando los modelos de precios públicos de los proveedores y los counts de tokens anotados en los spans (tramos) de LLM/integración.

Al agregar esta información en todas las traces (trazas) y aplicaciones, puedes obtener información sobre los patrones de uso de tus modelos de LLM y su efecto en el gasto global.

Casos prácticos:
- Ver y comprender de dónde procede el gasto de LLM, a nivel de modelo, la solicitud y la aplicación
- Rastreo de los cambios en el uso y costo de los tokens a lo largo del tiempo para evitar de forma proactiva facturas más elevadas en el futuro
- Correlacionar el costo de LLM con el rendimiento general de la aplicación, las versiones de los modelos, los proveedores de modelos y los detalles de las solicitudes en una única vista

## Configurar costos de monitorización

Datadog ofrece dos formas de monitorizar tus costos de LLM:
- [Automático](#automatic): Utilizar las tarifas de precios públicos de [proveedores de LLM admitidos](#supported-providers).
- [Manual](#manual): Para tarifas de precios personalizadas, modelos autoalojados o proveedores no compatibles, suministra manualmente tus propios valores de costo.

### Automático 
Si tus solicitudes de LLM implican a alguno de los [proveedores admitidos de la lista](#supported-providers), Datadog calcula automáticamente el costo de cada solicitud basándose en lo siguiente:

- Counts de tokens adjuntos al LLM/span (tramo) de integración, proporcionados mediante [autoinstrumentación][1] o mediante anotación manual del usuario.
- Tarifas de precios públicos del proveedor del modelo

### Manual
Para suministrar manualmente la información de costos, sigue los steps (UI) / pasos (generic) de instrumentación descritos en [Referencia de kit de desarrollo de software (SDK)][2] o [API][3].

<div class="alert alert-info">Si proporcionas información parcial sobre los costos, Datadog intenta calcular la información que falta. Por ejemplo, si proporcionas un costo total, pero no los valores de los costos de entrada/salida, Datadog utiliza los precios del proveedor y los valores de los tokens anotados en tu span (tramo) para calcular los valores de los costos de entrada/salida. Esto puede provocar un desajuste entre el costo total proporcionado manualmente y la suma de los costos de entrada/salida calculados por Datadog. Datadog siempre muestra el costo total proporcionado tal cual, incluso si estos valores difieren.</div>

## Proveedores compatibles
Datadog calcula automáticamente el costo de las solicitudes de LLM realizadas a los siguientes proveedores admitidos utilizando la información sobre precios disponible públicamente de su documentación oficial.

<div class="alert alert-info">Datadog solo admite costos de monitorización de los modelos basados en texto.</div>

- OpenAI: [Precios de OpenAI][4]
- Antrópico: [Precios de Claude][5]
- Azure OpenAI: [Precios de Azure OpenAI][6]
    - En aras de la coherencia, Datadog utiliza las tarifas de US East 2 y Global Standard Deployment para todas las solicitudes.
- Google Gemini: [Precios de Gemini][7]

## Métricas
Encontrarás las métricas de costos en [Métricas de LLM Observability][8].

Las métricas de costos incluyen una tag (etiqueta) `source` para indicar dónde se originó el valor:
- `source:auto` — calculado automáticamente
- `source:user` — provisto manualmente


## Ver costos en LLM Observability
Visualiza tu aplicación en LLM Observability y selecciona **Costs** (Costos) a la izquierda. Las funciones _Vista de costos_:
- Información general de alto nivel del uso de tu LLM a lo largo del tiempo, incluidos el **Total Cost** (Costo total), el **Cost Change** (Cambio de costo), el **Total Tokens** (Total de tokens) y el **Token Change** (Cambio de tokens).
- **Desglose por tipo de token**: Desglose del uso de tokens, junto con los costos asociados.
- **Desglose por proveedor/modelo** o **identificación/versión de avisos**: Costo y uso de tokens desglosados por proveedor y modelo de LLM o por avisos individuales o versiones de avisos (con tecnología de [Rastreo de avisos][9])
- **Llamadas de LLM más costosas**: Una lista de sus solicitudes más costosas

{{< img src="llm_observability/cost_tracking_trace.png" alt="Datos de costos en el detalle de traces (trazas)." style="width:100%;" >}}

Los datos de costos también están disponibles en las traces (trazas) y spans (tramos) de tu aplicación, lo que te permite comprender los costos a nivel de la solicitud (trace (traza)) y de la operación (span (tramo)).
Haz clic en cualquier trace (traza) o span (tramo) para abrir una vista detallada del panel lateral que incluye métricas de costos de la trace (traza) completa y de cada llamada de LLM individual.
En la parte superior de la vista de traces (trazas), el banner muestra información de costos agregados de la trace (traza) completa, incluido el costo estimado y los tokens totales. Al pasar el ratón sobre estos valores, se muestra un desglose de los costos/tokens de entrada y salida.

Al seleccionar un span (tramo) de LLM individual, se muestran métricas de costos similares específicas de esa solicitud de LLM.

[1]: /es/llm_observability/instrumentation/auto_instrumentation
[2]: /es/llm_observability/instrumentation/sdk/?tab=python#monitoring-costs
[3]: /es/llm_observability/instrumentation/api/#metrics
[4]: https://platform.openai.com/docs/pricing
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#model-pricing
[6]: https://azure.microsoft.com/en-us/pricing/details/cognitive-services/openai-service/
[7]: https://ai.google.dev/gemini-api/docs/pricing#standard
[8]: /es/llm_observability/monitoring/metrics/#llm-cost-metrics
[9]: /es/llm_observability/monitoring/prompt_tracking