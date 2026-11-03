---
description: Revise las recomendaciones automatizadas para optimizar los volúmenes
  de registros mediante la exclusión, el muestreo o la conversión de patrones de registros
  de alto volumen a métricas.
further_reading:
- link: logs/log_configuration/indexes/#exclusion-filters
  tag: Documentación
  text: Filtros de exclusión
- link: logs/log_configuration/logs_to_metrics/
  tag: Documentación
  text: Registros a métricas
title: Optimizador de registros
---
## Descripción general {#overview}

Optimizador de registros le ayuda a identificar patrones de registros que generan grandes volúmenes de datos repetitivos o ruidosos. Datadog analiza sus registros indexados y recomienda acciones, como excluir, muestrear o convertir registros a métricas, para que pueda optimizar los volúmenes de registros y centrarse en la información más relevante para la resolución de problemas y el análisis.

Esta función se basa en [Logging without Limits™][1] y complementa herramientas como [Filtros de exclusión][2] y [Registros a métricas][3].

{{< img src="/logs/log_configuration/log_optimizer/log_optimizer_main.png" alt="Página de inicio del Optimizador de registros en Datadog, vea recomendaciones para reducir el volumen de registros y el ruido." style="width:100%;" >}}

## Cómo funciona {#how-it-works}

Datadog revisa continuamente sus registros **indexados** para encontrar patrones que generan volúmenes de datos grandes o repetitivos. Una vez al día, el Optimizador de registros evalúa estos patrones según las mejores prácticas de Datadog e identifica los registros que podrían beneficiarse de la optimización.

El Optimizador de registros sugiere acciones (como excluir mensajes de nivel de depuración, muestrear registros rutinarios o convertir mensajes estáticos a métricas) para que pueda reducir el ruido sin perder visibilidad de eventos importantes.

<div class="alert alert-danger">El Optimizador de registros no tiene en cuenta los filtros de exclusión ni las conversiones de registros a métricas existentes. Revise su configuración antes de aplicar nuevas acciones para evitar duplicados.</div>

### Qué analiza Datadog {#what-datadog-analyzes}

* **Registros indexados:** El análisis se centra en los registros almacenados en sus índices Standard y Flex.
* **Patrones de alto volumen:** Datadog detecta patrones que representan una parte significativa de su volumen total de registros.
* **Consistencia y contenido del mensaje:** Los registros con mensajes repetidos o de baja variabilidad se evalúan como posibles candidatos para la optimización. Por ejemplo, si los mensajes de registro indican operaciones exitosas (como "proceso ejecutado con éxito"), el Optimizador de registros puede recomendar excluir esos registros para reducir el ruido.
* **Hacer un seguimiento del uso en toda la plataforma:** Datadog compara los patrones recomendados con su lista de active monitors para mostrarle dónde se utilizan sus registros. 

### Acciones recomendadas {#recommended-actions}

Cada recomendación incluye una explicación y una acción sugerida.

| Recomendación | Descripción | Ejemplo típico |
| :---- | :---- | :---- |
| {{< ui >}}Exclude{{< /ui >}} | Deje de indexar registros que añaden ruido y dificultan la concentración en señales críticas. | Mensajes de nivel de depuración o salida detallada del sistema. |
| {{< ui >}}Sample{{< /ui >}} | Reduzca el porcentaje de registros repetitivos para disminuir el ruido sin perder visibilidad. | Registros con muy poca variabilidad (donde campos como marcas de tiempo o IDs podrían ser el único cambio) |
| {{< ui >}}Convert to metric{{< /ui >}} | Reemplace los registros repetidos con una métrica para realizar un seguimiento de los conteos o tendencias a lo largo del tiempo. | Registros que siempre muestran el mismo mensaje o estado. |

## Revise y aplique las recomendaciones {#review-and-apply-recommendations}

Navegue a la página [{{< ui >}}Log Optimizer{{< /ui >}}][4] para visualizar patrones de registros, mensajes de muestra, datos de volumen y explicaciones en lenguaje sencillo para cada recomendación.

Para aplicar una recomendación:

1. Haga clic en una recomendación para abrir el panel lateral.
2. Haga clic en un botón de acción ({{< ui >}}Exclude Logs{{< /ui >}}, {{< ui >}}Sample Logs{{< /ui >}} o {{< ui >}}Create Metric{{< /ui >}}).

El cambio entra en vigor inmediatamente en su configuración. Sin embargo, la página Log Optimizer no se actualiza hasta que se ejecute el siguiente análisis diario, por lo que la recomendación puede seguir apareciendo temporalmente.

Además, cree un ticket para iniciar una revisión con otros equipos de su organización. Abra un ticket de Jira o cree un elemento de trabajo con Datadog Work Management. Para las recomendaciones que haya abordado, márquelas como resueltas para ocultarlas del feed de recomendaciones.

{{% collapse-content title="Caso de estudio: Excluya datos de registros repetitivos usando el Log Optimizer" level="h3" expanded=false %}}

{{< img src="/logs/log_configuration/log_optimizer/log_recommendation_side_panel.png" alt="Panel lateral de recomendaciones del optimizador de registros que muestra acciones y detalles de patrones" style="width:100%;" >}}

Cuando revisa la página {{< ui >}}Log Optimizer{{< /ui >}}, nota un patrón de alto volumen del servicio `shopist-support`. El mensaje "Verifying ticket" aparece más de 1.3 millones de veces cada día en múltiples hosts.

Datadog detecta esto como un patrón repetitivo que no cambia y recomienda convertirlo en una métrica y excluir el registro de la indexación. Usted revisa la recomendación, confirma que estos registros son repetitivos y aplica la exclusión directamente desde el panel lateral {{< ui >}}Recommendation{{< /ui >}}.

Los registros de errores críticos del mismo servicio permanecen visibles, lo que le permite concentrarse en señales significativas sin perder la observabilidad. Después del siguiente análisis diario, su configuración actualizada mostraría una reducción en el volumen indexado.
{{% /collapse-content %}}

## Seguimiento de cambios aplicados {#track-applied-changes}

La aplicación de una recomendación crea un filtro de exclusión o una métrica a partir del registro. Para ver esa definición de filtro o métrica, cambiarla o eliminarla, vaya a la página correspondiente:

* **Filtros de exclusión**: página [{{< ui >}}Logs Indexes{{< /ui >}}][5]
* **Conversiones de registros a métricas**: página [{{< ui >}}Metrics Configuration{{< /ui >}}][6]

Puede editar o eliminar estas configuraciones en cualquier momento desde sus respectivas páginas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/logging_without_limits/
[2]: /es/logs/indexes/#exclusion-filters
[3]: /es/logs/logs_to_metrics/
[4]: https://app.datadoghq.com/logs/optimizer
[5]: https://app.datadoghq.com/logs/pipelines/indexes
[6]: https://app.datadoghq.com/logs/pipelines/generate-metrics