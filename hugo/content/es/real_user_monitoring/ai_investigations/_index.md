---
description: Las investigaciones agenticas de Datadog aportan un análisis de causa
  raíz en primera instancia directamente a sus flujos de trabajo de RUM.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Aprenda sobre el RUM Explorer
title: Investigaciones de IA
---
## Resumen {#overview}

Investigar una mala experiencia de usuario en RUM generalmente significa alternar entre reproducciones de sesión, paneles de errores, trazas y líneas de tiempo de rendimiento para reconstruir qué salió mal. Las investigaciones de IA automatizan ese triaje de primera instancia. El agente de RUM de Datadog inspecciona los datos adjuntos a sus vistas y presenta hallazgos de causa raíz clasificados y categorizados directamente en su flujo de trabajo de RUM.

Esta página lista los tipos de investigación disponibles.

## Investigación de IA de vista única {#single-view-ai-investigation}

Realice una investigación agentica en una sola vista de RUM para investigar problemas de rendimiento o identificar oportunidades de optimización en esa página o pantalla específica. El agente de RUM de Datadog inspecciona el evento de vista y sus subeventos para identificar causas raíz de fuentes que abarcan la aplicación, el backend, bibliotecas de terceros y el entorno de red del usuario.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="Una Investigación de IA de Vista Única que presenta hallazgos de causa raíz para una vista de RUM." style="width:100%;" >}}

Para más información, consulte [Investigación de IA de Vista Única][1].

## Investigación de IA de Múltiples Vistas {#multi-view-ai-investigation}

Realice una investigación agentica en una muestra de vistas que comparten un vital de rendimiento lento. La Investigación de IA de Múltiples Vistas extiende el mismo análisis agentico a una población de vistas, ayudándole a identificar qué corregir cuando un par (vista × vital) entero es consistentemente lento entre los usuarios. Disponible desde la página de Optimización para Tiempo de Carga, Pintura de Contenido Más Grande, Primera Pintura de Contenido y Interacción hasta la Siguiente Pintura.

{{< img src="real_user_monitoring/ai_investigations/multi-view-ai-investigation-recommendations.png" alt="La página de Optimización para un vital de rendimiento, mostrando tarjetas de recomendación clasificadas con un botón de Investigar en cada una." style="width:100%;" >}}

Para más información, consulte [Investigación de IA de Múltiples Vistas][2].

## Investigación de IA de Operación {#operation-ai-investigation}

Realice una investigación agentica sobre una sola operación en [Monitoreo de Operaciones][3]. El agente analiza tanto la tasa de éxito como la latencia de la operación, presentando investigaciones enfocadas para cada modo de falla (errores, tiempos de espera, abandono) y para regresiones de latencia.

{{< img src="real_user_monitoring/ai_investigations/operation-ai-investigation-recommendations.png" alt="La página de Operaciones para una operación, mostrando un resumen de salud en lenguaje sencillo y tarjetas de recomendación clasificadas con insignias de prioridad." style="width:100%;" >}}

Para más información, consulte [Investigación de IA de Operación][4].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/ai_investigations/single_view_ai_investigation/
[2]: /es/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
[3]: /es/real_user_monitoring/operations_monitoring/
[4]: /es/real_user_monitoring/ai_investigations/operation_ai_investigation/