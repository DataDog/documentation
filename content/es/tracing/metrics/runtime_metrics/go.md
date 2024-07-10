---
aliases:
- /es/tracing/runtime_metrics/go
code_lang: go
code_lang_weight: 60
description: Obtén información adicional sobre el rendimiento de tu aplicación Go
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
  text: Explorar tus servicios, recursos y trazas
title: Métricas de tiempo de ejecución de Go
type: multi-code-lang
---

## Configuración automática

Para activar la recopilación de métricas de tiempo de ejecución en Go, inicia el rastreador utilizando la opción `WithRuntimeMetrics`:

```go
tracer.Start(tracer.WithRuntimeMetrics())
```

Ve las métricas de tiempo de ejecución en correlación con tus servicios de Go en el [Catálogo de servicios][1] en Datadog.

Por defecto, las métricas de tiempo de ejecución de tu aplicación se envían cada 10 segundos al Datadog Agent con DogStatsD. Asegúrate de que [DogStatsD está activado para el Agent][2]. Si tu dirección DogStatsD del Datadog Agent difiere de la predeterminada `localhost:8125`, utiliza la opción [`WithDogstatsdAddress`][3] (disponible a partir de 1.18.0) o las variables de entorno `DD_AGENT_HOST` y `DD_DOGSTATSD_PORT`.

Si no se utiliza `WithDogstatsdAddress`, el rastreador intenta determinar la dirección de servicio de statsd de acuerdo con las siguientes reglas:
  1. Busca `/var/run/datadog/dsd.socket` y utilízalo si está presente. SI NO, continúa con #2.
  2. El host viene determinado por `DD_AGENT_HOST` y por defecto es "localhost".
  3. El puerto se obtiene del Agent. Si no está presente, se determina mediante `DD_DOGSTATSD_PORT`, y por defecto es `8125`.

Si estás ejecutando el Agent como contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [está configurado como true][4], y de que el puerto `8125` está abierto en el Agent. Además, para Kubernetes o ECS, sigue las directrices que se indican a continuación:

- **Kubernetes**: _debes_ [vincular el puerto DogStatsD a un puerto host][5].
- **ECS**: [Establece los indicadores apropiados en la definición de tu tarea][6].

Alternativamente, el Agent puede ingerir métricas con un Unix Domain Socket (UDS) como alternativa al transporte UDP. Para más información, lee [DogStatsD en Unix Domain Socket][8].

## Datos recopilados

Las siguientes métricas se recopilan por defecto después de activar las metricas de Go.

{{< get-metrics-from-git "go" >}}

Además de mostrar estas métricas en tu Página de servicios de APM, Datadog proporciona un [dashboard de tiempo de ejecución de Go predeterminado][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/developers/dogstatsd/#setup
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[4]: /es/agent/docker/#dogstatsd-custom-metrics
[5]: /es/developers/dogstatsd/?tab=kubernetes#agent
[6]: /es/agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30587/go-runtime-metrics
[8]: /es/developers/dogstatsd/unix_socket/