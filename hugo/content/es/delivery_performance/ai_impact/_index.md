---
aliases:
- /es/dora_metrics/ai-impact/
- /es/dora_metrics/ai_impact/
description: Mida el impacto de los asistentes de codificación de IA en el rendimiento
  de su entrega de software.
further_reading:
- link: /delivery_performance/ai_impact/setup
  tag: Documentación
  text: Configure AI Impact
- link: /delivery_performance/dora_metrics/
  tag: Documentación
  text: Obtenga información sobre DORA Metrics
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentación
  text: Configure DORA Metrics.
- link: /delivery_performance/dora_metrics/calculation/
  tag: Documentación
  text: Aprenda cómo se calculan las DORA Metrics
- link: https://www.datadoghq.com/blog/devex-measurement-pitfalls-ai-era/
  tag: Blog
  text: 5 errores que debe evitar al medir la experiencia del desarrollador en la
    era de la IA
- link: https://www.datadoghq.com/blog/ai-impact/
  tag: Blog
  text: Mida el impacto real de las herramientas de codificación de IA en la entrega
    de software con Datadog AI Impact
- link: https://www.datadoghq.com/blog/how-to-measure-developer-experience-in-the-ai-era/
  tag: Blog
  text: Cómo medir la experiencia del desarrollador en la era de la IA
title: Impacto de la IA
---
{{< callout url="#" btn_hidden="true" header="¡Únase a la vista previa!" >}}
AI Impact está disponible para todos los clientes de Datadog en versión preliminar.
{{< /callout >}}

## Descripción general {#overview}

AI Impact mide cómo las herramientas de codificación de IA (incluidos los asistentes de codificación, los agentes de revisión y los agentes autónomos) afectan el rendimiento de su entrega de software. Datadog detecta la contribución de la IA desde varios tipos de fuentes. Las fuentes incluyen patrones de coautoría en metadatos de confirmación, integraciones de proveedores, etiquetas de solicitudes de extracción y datos que usted mismo envía.

## Primeros pasos {#getting-started}

Datadog detecta automáticamente cierta actividad de IA después de configurar [DORA Metrics][1] con datos de despliegue, confirmación y solicitudes de extracción. Las herramientas de IA pueden identificarse a través de firmas de coautoría, comentarios de revisión y otra información de autor en las confirmaciones que comúnmente indican la participación de la IA. Para capturar de manera más completa la actividad de IA en su organización, consulte [Set Up AI Impact][2] para configurar fuentes y reglas de mapeo que identifiquen sus herramientas de IA específicas y sus contribuciones.

## Métricas de impacto {#impact-metrics}

| Métrica | Definición |
|--------|------------|
| PR asistidas por IA | PR que contienen al menos una confirmación asistida por IA, divididas por el total de PR. |
| Rendimiento de PR | Número de PR implementadas por usuario por día para autores asistidos por IA en comparación con autores no asistidos. |
| Tiempo de ciclo de PR | Tiempo mediano desde la primera confirmación de una PR hasta su fusión para PR asistidas por IA en comparación con PR no asistidas. |
| Tasa de fallos en cambios | Tasa de fallos ponderada por la proporción de confirmaciones asistidas por IA en cada despliegue, en comparación con la tasa ponderada para confirmaciones no asistidas. Por ejemplo, si una implementación fallida tiene 3 de 10 confirmaciones asistidas por IA, solo el 30% de ese fallo se atribuye a la IA. |
| Tiempo de recuperación | Tiempo de recuperación mediano de las implementaciones fallidas que contienen confirmaciones asistidas por IA en comparación con las implementaciones que no las tienen. |

<div class="alert alert-info">La tasa de fallos en cambios solo incluye las implementaciones vinculadas a cambios en el código. Las implementaciones únicamente de configuración o de infraestructura se excluyen para ayudar a que la comparación refleje el impacto de la IA en los fallos relacionados con el código. Esto difiere de la Tasa de Fallos de Cambios de DORA estándar, que cuenta todos los tipos de implementaciones.</div>

<div class="alert alert-info">Solo para GitHub, las métricas a nivel de PR excluyen los PR cuyas confirmaciones son totalmente creadas por bots. Esto mantiene la actividad automatizada fuera de la línea base sin IA.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/delivery_performance/dora_metrics/setup/
[2]: /es/delivery_performance/ai_impact/setup/