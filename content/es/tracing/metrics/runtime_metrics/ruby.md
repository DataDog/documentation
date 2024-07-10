---
aliases:
- /es/tracing/runtime_metrics/ruby
code_lang: ruby
code_lang_weight: 30
description: Obtén información adicional sobre el rendimiento de tu aplicación Ruby
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
title: Métricas de tiempo de ejecución de Ruby
type: multi-code-lang
---

<div class="alert alert-warning">
Esta función está en fase beta pública.
</div>

## Configuración automática

La recopilación de métricas de tiempo de ejecución utiliza el gem [`dogstatsd-ruby`][1] para enviar métricas a través de DogStatsD al Agent. Para recopilar métricas de tiempo de ejecución, debes añadir este gem a tu aplicación Ruby y asegurarte de que [DogStatsD está habilitado para el Agent][2].

La recopilación de métricas está desactivada por defecto. Puedes activarla al establecer la variable de entorno `DD_RUNTIME_METRICS_ENABLED` en `true`, o con la siguiente configuración en tu aplicación Ruby:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  # Para activar la recopilación de métricas de tiempo de ejecución, establece en `true`. Por defecto es `false`
  # También puedes establecer DD_RUNTIME_METRICS_ENABLED=true para configurarlo.
  c.runtime_metrics.enabled = true

  # Opcionalmente, puedes configurar la instancia de DogStatsD utilizada para enviar las métricas de tiempo de ejecución.
  # DogStatsD se configura automáticamente con la configuración automática si `dogstatsd-ruby` está disponible.
  # Puedes configurar con el host y puerto del Datadog agent; por defecto 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

Las métricas de tiempo de ejecución se pueden ver en correlación con tus servicios de Ruby. Consulta el [Catálogo de servicios][3] en Datadog.

Por defecto, las métricas de tiempo de ejecución de tu aplicación se envían al Datadog Agent con DogStatsD en el puerto `8125`. Asegúrate de que [DogStatsD está habilitado para el Agent][2].
Si estás ejecutando el Agent como un contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [está configurado como true][4] y que el puerto `8125` está abierto en el Agent.
En Kubernetes, [vincula el puerto de DogStatsD a un puerto host][5]; en ECS, [establece los indicadores apropiados en tu definición de tarea][6].

Alternativamente, el Agent puede ingerir métricas con un Unix Domain Socket (UDS) como alternativa al transporte UDP. Para más información, lee [DogStatsD en Unix Domain Socket][8].

## Datos recopilados

Las siguientes métricas se recopilan por defecto después de activar las métricas de tiempo de ejecución.

{{< get-metrics-from-git "ruby" >}}

Además de mostrar estas métricas en tu Página de servicios de APM, Datadog proporciona un [dashboard de tiempo de ejecución de Ruby predeterminado][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://rubygems.org/gems/dogstatsd-ruby
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[3]: https://app.datadoghq.com/apm/service
[4]: /es/agent/docker/#dogstatsd-custom-metrics
[5]: /es/developers/dogstatsd/?tab=kubernetes#agent
[6]: /es/agent/amazon_ecs/#create-an-ecs-task
[7]: https://app.datadoghq.com/dash/integration/30268/ruby-runtime-metrics
[8]: /es/developers/dogstatsd/unix_socket/