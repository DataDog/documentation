---
aliases:
- /es/tracing/runtime_metrics/java
code_lang: java
code_lang_weight: 10
description: Obtén información adicional sobre el rendimiento de tu aplicación Java
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
title: Métricas de tiempo de ejecución de Java
type: multi-code-lang
---

## Configuración automática

La recopilación de métricas de JVM está habilitada por defecto para Java Tracer v0.29.0+. Puedes deshabilitarla con un parámetro de configuración en el cliente de rastreo, ya sea mediante una propiedad del sistema, `-Ddd.jmxfetch.enabled=false`, or through an environment variable, `DD_JMXFETCH_ENABLED=false. `. As of v0.64.0+, you can also use the `variable de entorno DD_RUNTIME_METRICS_ENABLED=false` para deshabilitarla.

Las métricas de tiempo de ejecución de JVM se pueden ver en correlación con tus servicios de Java. Consulta el [Catálogo de servicios][1] en Datadog.

{{< img src="tracing/runtime_metrics/jvm-runtime.png" alt="Tiempo de ejecución de JVM" >}}

Por defecto, las métricas de tiempo de ejecución de tu aplicación se envían al Datadog Agent con DogStatsD por el puerto `8125`. Asegúrate de que [DogStatsD está habilitado para el Agent][2].

Si estás ejecutando el Agent como un contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [se establece en true][3] y que el puerto `8125` está abierto en el Agent. Además, para:

- **Kubernetes**: _debes_ [vincular el puerto DogStatsD a un puerto host][4].
- **ECS**: [Establece los indicadores apropiados en la definición de tu tarea][5].

Alternativamente, el Agent puede ingerir métricas con un Unix Domain Socket (UDS) como alternativa al transporte UDP. Para más información, lee [DogStatsD en Unix Domain Socket][9].

**Notas**:

- Para la interfaz de usuario de tiempo de ejecución, se admite `dd-trace-java` >= [`0.24.0`][6].
- Para asociar métricas de JVM dentro de las gráficas de llamas, asegúrate de que `env: tag` (distingue entre mayúsculas y minúsculas) está configurada y coincide en tu entorno.
- Para que las métricas de JVM aparezcan en la Página de servicios cuando usas Fargate, asegúrate de que `DD_DOGSTATSD_TAGS` está configurado en tu tarea del Agent, y coincide con la `env: tag` de ese servicio.

## Datos recopilados

Las siguientes métricas se recopilan por defecto por proceso de JVM después de activar las métricas de JVM.

{{< get-metrics-from-git "java" >}}

Además de mostrar estas métricas en tu Página de servicios de APM, Datadog proporciona un [dashboard de tiempo de ejecución de JVM predeterminado][7].

Se pueden añadir métricas de JVM adicionales mediante archivos de configuración que se pasan utilizando `dd.jmxfetch.config.dir` y `dd.jmxfetch.config`. También puedes activar integraciones de JMX y Datadog existentes de forma individual con el parámetro `dd.jmxfetch.<INTEGRATION_NAME>.enabled=true`. Esto introduce automáticamente la configuración de los archivos de configuración de JMX existentes de Datadog. Consulta [integración de JMX][8] para obtener más información sobre la configuración.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/developers/dogstatsd/#setup
[3]: /es/agent/docker/#dogstatsd-custom-metrics
[4]: /es/developers/dogstatsd/?tab=kubernetes#agent
[5]: /es/agent/amazon_ecs/#create-an-ecs-task
[6]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[7]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[8]: /es/integrations/java/#configuration
[9]: /es/developers/dogstatsd/unix_socket/