---
aliases:
- /es/tracing/runtime_metrics/python
code_lang: python
code_lang_weight: 20
description: Obtén información adicional sobre el rendimiento de tu aplicación Python
  con las métricas de tiempo de ejecución asociadas a tus trazas (traces).
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conecta tus logs y trazas
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumenta tu aplicación de forma manual para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Métricas de tiempo de ejecución de Python
type: multi-code-lang
---

## Configuración automática

La recopilación de métricas de tiempo de ejecución puede activarse con el parámetro de entorno `DD_RUNTIME_METRICS_ENABLED=true` cuando se ejecuta con `ddtrace-run`.

Si no utilizas `ddtrace-run`, puedes activar la recopilación de métricas de tiempo de ejecución en el código:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

Las métricas de tiempo de ejecución se pueden ver en correlación con tus servicios de Python. Consulta el [Catálogo de servicios][1] en Datadog.

**Nota**: Para la interfaz de usuario de tiempo de ejecución, se admite `ddtrace` >= [`0.24.0`][2].

Por defecto, las métricas de tiempo de ejecución de tu aplicación se envían al Datadog Agent con DogStatsD en el puerto `8125`. Asegúrate de que [DogStatsD está habilitado para el Agent][3].
Si estás ejecutando el Agent como un contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [está configurado como true][4] y que el puerto `8125` está abierto en el Agent.
En Kubernetes, [vincula el puerto de DogStatsD a un puerto host][5]; en ECS, [establece los indicadores apropiados en tu definición de tarea][6].

Alternativamente, el Agent puede ingerir métricas con un Unix Domain Socket (UDS) como alternativa al transporte UDP. Para más información, lee [DogStatsD en Unix Domain Socket][8].

## Datos recopilados

Las siguientes métricas se recopilan por defecto después de activar las métricas de tiempo de ejecución:

{{< get-metrics-from-git "python" >}}

Además de mostrar estas métricas en tu Página de servicios de APM, Datadog proporciona un [dashboard de métricas de tiempo de ejecución de Python predeterminado][7].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://github.com/DataDog/dd-trace-py/releases/tag/v0.24.0
[3]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[4]: /es/agent/docker/#dogstatsd-custom-metrics
[5]: /es/developers/dogstatsd/?tab=kubernetes#agent
[6]: /es/agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30267/python-runtime-metrics
[8]: /es/developers/dogstatsd/unix_socket/