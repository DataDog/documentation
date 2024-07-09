---
aliases:
- /es/tracing/advanced/runtime_metrics/
- /es/tracing/runtime_metrics/
description: Obtén información adicional sobre el rendimiento de una aplicación con
  las métricas de tiempo de ejecución asociadas a tus trazas (traces).
kind: documentación
title: Métricas de tiempo de ejecución
type: multi-code-lang
---

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="Traza de tiempo de ejecución de JVM" >}}

Habilita la recopilación de métricas de tiempo de ejecución en el cliente de rastreo para obtener información adicional sobre el rendimiento de una aplicación. Las métricas de tiempo de ejecución pueden verse en el contexto de un [servicio][1], correlacionarse en la Vista de traza en el momento de una solicitud determinada y utilizarse en cualquier lugar de la plataforma. Selecciona tu lenguaje a continuación para saber cómo recopilar automáticamente tus métricas de tiempo de ejecución:

{{< partial name="apm/apm-runtime-metrics.html" >}}
<br>

[1]: /es/tracing/glossary/#services