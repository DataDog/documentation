---
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentación
  text: Mecanismos de ingesta
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentación
  text: Página de control de la ingesta
private: true
title: Muestreo basado en recursos
---

{{< callout url="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Request access to the beta!" >}}
Las reglas de muestreo configuradas de forma remota están en fase beta. Para solicitar acceso, completa este formulario.
{{< /callout >}}

## Información general

La configuración remota te permite configurar dinámicamente las [frecuencias de muestreo de ingesta por servicio y nombre de recurso][7], desde la interfaz de usuario de Datadog, sin tener que volver a desplegar tu servicio.

## Requisitos

- Datadog Agent [7.41.1][2] o posterior.
- [Configuración remota][3] activada para tu Agent.
- [Permisos] `APM Remote Configuration Write`[4]. Si no tienes estos permisos, pide a tu administrador de Datadog que actualice tus permisos desde Parámetros de organización.

### Versión de la biblioteca de rastreo

A continuación, se indica la versión mínima de biblioteca de rastreo necesaria para esta función:

Lenguaje  | Versión mínima requerida
----------|--------------------------
Java      | [v1.34.0][5]
Go        | [v1.64.0][6]
Python    | [v.2.9.0][10]
Ruby      | [v2.0.0][11]
Node.js   | [v5.16.0][12]
PHP       | _Próximamente_
.NET      | [v.2.53.2][13]
C++       | _Próximamente_

## Consulta las frecuencias de muestreo por recurso en la página de Control de la ingesta

Para ver las frecuencias de muestreo configuradas por recurso, ve al [Resumen de ingesta del servicio][1] en los Controles de ingesta. La tabla enumera la frecuencia de muestreo aplicada por recurso de servicio.

{{< img src="/tracing/guide/resource_based_sampling/resource_sampling_rates.png" alt="Tabla de frecuencias de muestreo por recurso" style="width:100%;">}}

- La columna `Ingested bytes` muestra los bytes ingeridos de tramos (spans) del servicio y el recurso, mientras que la columna `Downstream bytes` muestra los bytes ingeridos desde tramos en los que la decisión de muestreo se toma a partir de ese servicio y recurso, incluidos los bytes de los servicios de descarga en la cadena de llamadas.
- La columna `Configuration` muestra desde dónde se está aplicando la frecuencia de muestreo de recursos:
  - `Automatic` si se aplica el [mecanismo de muestreo por defecto basado en el título][8] del Agent.
  - `Local Configured` si se ha establecido localmente una [regla de muestreo][7] en la biblioteca de rastreo.
  - `Remote Configured` si se ha configurado una regla de muestreo remota desde la interfaz de usuario de Datadog. Para saber cómo configurar reglas de muestreo desde la página de control de la ingesta, lee la sección sobre [configuración remota de reglas de muestreo](#remotely-configure-sampling-rules-for-the-service).

## Configurar remotamente reglas de muestreo para el servicio

Para configurar frecuencias de muestreo para el servicio por nombre de recurso: 
1. Haz clic en **Manage Ingestion rate** (Gestionar tasa de ingesta). Si la opción de configuración remota está desactivada, asegúrate de que se cumplen todos los [requisitos](#compatibility-requirements) enumerados.
   {{< img src="/tracing/guide/resource_based_sampling/sampling_configuration_modal.png" alt="Modo de configuración" style="width:100%;">}}
1. Haz clic en **Add new rule** (Añadir nueva regla) para establecer las frecuencias de muestreo de algunos recursos. Las reglas de muestreo utilizan la coincidencia de patrones globales, por lo que puedes utilizar comodines (`*`) para coincidir con varios recursos al mismo tiempo.
1. Haz clic en **Apply** (Aplicar) para guardar la configuración.

La configuración debería surtir efecto en menos de un minuto. Puedes observar los cambios de configuración desde el [Live Search Explorer][9].

En el **Service Ingestion Summary** (Resumen de ingesta del servicio), los recursos a los que se aplica la frecuencia de muestreo remota deben aparecer como `Remote Configured` en la columna **Configuration** (Configuración).



## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[3]: /es/agent/remote_config
[4]: /es/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.63.1
[7]: /es/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /es/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /es/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.53.2