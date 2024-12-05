---
aliases:
- /es/tracing/runtime_metrics/dotnet
code_lang: dotnet
code_lang_weight: 50
description: Obtén información adicional sobre el rendimiento de tu aplicación .NET
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
- link: https://www.datadoghq.com/blog/dotnet-runtime-metrics/
  tag: Blog
  text: Monitorizar métricas de tiempo de ejecución de .NET con Datadog
title: Métricas de tiempo de ejecución de .NET
type: multi-code-lang
---

## Compatibilidad de las métricas de tiempo de ejecución

- .NET Framework 4.6.1 o posterior
- .NET Core 3.1
- .NET 5
- .NET 6
- .NET 7
- .NET 8

## Configuración automática

Habilita la recopilación de métricas de tiempo de ejecución en .NET Tracer 1.23.0+ con la variable de entorno `DD_RUNTIME_METRICS_ENABLED=true`.

Ve las métricas de tiempo de ejecución en correlación con tus servicios de .NET. Consulta el [Catálogo de servicios][1] en Datadog.

Por defecto, las métricas de tiempo de ejecución de tu aplicación se envían al Datadog Agent con DogStatsD por el puerto `8125`. Asegúrate de que [DogStatsD está habilitado para el Agent][2].

Si estás ejecutando el Agent como un contenedor, asegúrate de que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [se establece en true][3] y que el puerto `8125` está abierto en el Agent. Además, para:

- **Kubernetes**: _debes_ [vincular el puerto DogStatsD a un puerto host][4].
- **ECS**: [Establece los indicadores apropiados en la definición de tu tarea][5].

Alternativamente, el Agent puede ingerir métricas con un Unix Domain Socket (UDS) como alternativa al transporte UDP. Para más información, lee [DogStatsD en Unix Domain Socket][7].

## Datos recopilados

Las siguientes métricas se recopilan por defecto después de activar las metricas de .NET.

{{< get-metrics-from-git "dotnet" >}}

Además de mostrar estas métricas en tu Página de servicios de APM, Datadog proporciona un [dashboard de tiempo de ejecución de .NET predeterminado][6].

## Permisos adicionales para IIS

En .NET Framework, las métricas se recopilan mediante contadores de rendimiento. Los usuarios en sesiones de inicio de sesión no interactivas (que incluyen cuentas de grupos de aplicaciones IIS y algunas cuentas de servicio) deben añadirse al grupo **Usuarios de monitorización de rendimiento** para acceder a los datos del contador.

Los grupos de aplicaciones IIS utilizan cuentas especiales que no aparecen en lista de usuarios. Para añadirlas al grupo de usuarios de monitorización de rendimiento, busca `IIS APPPOOL\<name of the pool>`. Por ejemplo, el usuario para el DefaultAppPool sería `IIS APPPOOL\DefaultAppPool`.

Puedes hacer esto desde la interfaz de usuario "Gestión de ordenadores" o desde una acción de comando del administrador:

```
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /es/developers/dogstatsd/#setup
[3]: /es/agent/docker/#dogstatsd-custom-metrics
[4]: /es/developers/dogstatsd/?tab=kubernetes#agent
[5]: /es/agent/amazon_ecs/#create-an-ecs-task
[6]: https://app.datadoghq.com/dash/integration/30412/net-runtime-metrics
[7]: /es/developers/dogstatsd/unix_socket/