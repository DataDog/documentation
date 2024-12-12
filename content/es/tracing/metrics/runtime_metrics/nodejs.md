---
aliases:
- /es/tracing/runtime_metrics/nodejs
code_lang: nodejs
code_lang_weight: 40
description: Obtén información adicional sobre el rendimiento de tu aplicación Node.js
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
title: Métricas de tiempo de ejecución de Node.js
type: multi-code-lang
---

<div class="alert alert-warning">
Esta función está en fase beta pública.
</div>

## Configuración automática

La recopilación de métricas de tiempo de ejecución puede activarse con un parámetro de configuración en el cliente de rastreo, ya sea a través de la opción del rastreador: `tracer.init({ runtimeMetrics: true })` o a través de la variable de entorno: `DD_RUNTIME_METRICS_ENABLED=true`


   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_RUNTIME_METRICS_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

{{% /tab %}}
{{% tab "In code" %}}

```js
const tracer = require('dd-trace').init({
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3',
  runtimeMetrics: true
})
```

{{% /tab %}}
{{< /tabs >}}

Las métricas de tiempo de ejecución se pueden ver en correlación con tus servicios de Node. Consulta el [Catálogo de servicios][1] en Datadog.

Por defecto, las métricas de tiempo de ejecución de tu aplicación se envían al Datadog Agent con DogStatsD en el puerto `8125`. Asegúrate de que [DogStatsD está habilitado para el Agent][2].
Si estás ejecutando el Agent como un contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [está configurado como true][3] y que el puerto `8125` está abierto en el Agent.
En Kubernetes, [vincula el puerto de DogStatsD a un puerto host][4]; en ECS, [establece los indicadores apropiados en tu definición de tarea][5].

Alternativamente, el Agent puede ingerir métricas con un Unix Domain Socket (UDS) como alternativa al transporte UDP. Para más información, lee [DogStatsD en Unix Domain Socket][7].

## Datos recopilados

Las siguientes métricas se recopilan por defecto después de activar las métricas de tiempo de ejecución.

{{< get-metrics-from-git "node" >}}

Además de mostrar estas métricas en tu Página de servicios de APM, Datadog proporciona un [dashboard de tiempo de ejecución de Node predeterminado][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#setup
[3]: /es/agent/docker/#dogstatsd-custom-metrics
[4]: /es/developers/dogstatsd/?tab=kubernetes#agent
[5]: /es/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30269/node-runtime-metrics
[7]: /es/developers/dogstatsd/unix_socket/