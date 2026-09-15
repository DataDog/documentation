---
description: Aprenda a configurar el muestreo basado en recursos para controlar la
  ingesta de traza según recursos y puntos de conexión específicos para la optimización
  de costos.
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentación
  text: Mecanismos de ingesta
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentación
  text: Página de Ingestion Control
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Centro de arquitectura
  text: 'Optimización del rastreo distribuido: mejores prácticas para mantenerse dentro
    del presupuesto y capturar trazas críticas'
site_support_id: resource_based_sampling
title: Muestreo basado en recursos
---
## Descripción general {#overview}

El Remote Configuration le permite establecer dinámicamente [tasas de muestreo por servicio y nombre de recurso][7], desde la Datadog UI, sin tener que volver a implementar su servicio.

## Requisitos {#requirements}

- Datadog Agent [7.41.1][2] o superior.
- [Remote Configuration][3] habilitada para su Datadog Agent.
- `APM Remote Configuration Write` [permisos][4]. Si no tiene estos permisos, solicite a su administrador de Datadog que actualice sus permisos desde la configuración de su organización.

### Versión de la librería de traza {#tracing-library-version}

A continuación encontrará la versión mínima del SDK requerida para la función:

Lenguaje  | Versión mínima requerida
----------|--------------------------
Java      | [v1.34.0][5]
Go        | [v1.64.0][6]
Python    | [v.2.9.0][10]
Ruby      | [v2.4.0][11]
Node.js   | [v5.16.0][12]
PHP       | [v1.4.0][15]
.NET      | [v.2.53.2][13]
C++       | [v0.2.2][14]

## Consulte las tasas de muestreo por recurso en la página de Ingestion Control {#see-sampling-rates-by-resource-in-the-ingestion-control-page}

Para ver las tasas de muestreo configuradas por recurso, navegue a los controles de Ingestion Control [resumen de ingesta del servicio][1]. La tabla enumera la tasa de muestreo aplicada por recurso del servicio.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tabla de tasas de muestreo por recurso" style="width:100%;">}}

- La columna `Ingested bytes` muestra los bytes ingeridos de los tramos del servicio y recurso, mientras que la columna `Downstream bytes` muestra los bytes ingeridos de los tramos donde la decisión de muestreo se toma a partir de ese servicio y recurso, incluyendo los bytes de los servicios descendentes en la cadena de llamadas.
- La columna `Configuration` muestra desde dónde se aplica la tasa de muestreo del recurso: 
  - `Automatic` si se aplica el [mecanismo de muestreo basado en cabeceras predeterminado][8] del Agent.
  - `Local Configured` si se estableció una [regla de muestreo de traza][7] localmente en el SDK.
  - `Remote Configured` si se estableció una regla de muestreo de trazas remota desde la interfaz de usuario de Datadog. Para aprender a configurar reglas de muestreo de traza desde la página de Ingestion Control, lea la sección sobre [configuración remota de reglas de muestreo de traza](#remotely-configure-sampling-rules-for-the-service).

## Configure de forma remota las reglas de muestreo de traza para el servicio {#remotely-configure-sampling-rules-for-the-service}

Para configurar tasas de muestreo para el servicio por nombre de recurso: 
1. Haga clic en {{< ui >}}Manage Ingestion rate{{< /ui >}}. Si la opción de Remote Configuration está deshabilitada, asegúrese de que se cumplan todos los [requisitos](#compatibility-requirements) enumerados.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_modal.png" alt="Modal de configuración" style="width:100%;">}}
1. Haga clic en {{< ui >}}Add new rule{{< /ui >}} para establecer tasas de muestreo para algunos recursos. Las reglas de muestreo utilizan coincidencia de patrones glob, por lo que puede usar comodines (`*`) para hacer coincidir varios recursos al mismo tiempo.
1. Haga clic en {{< ui >}}Apply{{< /ui >}} para guardar la configuración.

La configuración debería surtir efecto en menos de un minuto. Puede observar los cambios de configuración desde el [Live Search Explorer][9].

Desde el {{< ui >}}Service Ingestion Summary{{< /ui >}}, los recursos para los cuales la tasa de muestreo se aplica de forma remota deberían mostrarse como `Remote Configured` en la columna {{< ui >}}Configuration{{< /ui >}}.



## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[3]: /es/tracing/guide/remote_config/
[4]: /es/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.63.1
[7]: /es/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /es/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /es/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.4.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.53.2
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0