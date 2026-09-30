---
further_reading:
- link: /agent/remote_config/
  tag: Documentación
  text: Configuración remota
title: Configuración en tiempo de ejecución
---

<div class="alert alert-info">Esta función está en fase beta pública.</div>

## Información general

La configuración en tiempo de ejecución te permite modificar la configuración de la librería APM desde la interfaz de usuario Datadog, sin necesidad de reiniciar tu aplicación o servicio. No necesitas esperar a un nuevo despliegue o a un cambio de código para actualizar tu configuración. En su lugar, actualízala inmediatamente mediante la configuración en tiempo de ejecución.

{{< img src="/tracing/runtime_config/runtime-config-nav.mp4" alt="Consulta el Catálogo de servicios para utilizar la configuración en tiempo de ejecución." video="true" style="width:100%;">}}

## Requisitos previos

- [Datadog Agent][2] 7.41.1 o superior.
- [Configuración remota][1] activada para tu Agent.
- [Permisos][4] `APM Remote Configuration Read` y `APM Remote Configuration Write`.
  **Nota**: Si no tienes estos permisos, pide a tu administrador de Datadog que actualice tus permisos desde los parámetros de la organización.

## Utilización de la configuración en tiempo de ejecución

Para realizar cambios en la configuración de un servicio en tiempo de ejecución:

1. Ve al [Catálogo de servicios][3] en APM.
1. Sitúate sobre el servicio del que quieres actualizar la configuración.
1. Haz clic en **Full Page** (Página completa), junto al nombre del servicio.
1. Haz clic en **Service Info** (Información del servicio).
1. En la pestaña **Setup Guidance** (Guía para la configuración), haz clic en **Edit** (Editar).
1. Cambia las opciones de configuración, según sea necesario. Para obtener más detalles, consulta las [opciones de configuración compatibles](#supported-configuration-options).
1. Haz clic en **Apply Configuration** (Aplicar configuración).

En **Active Library Configuration** (Configuración de librería activa), puedes ver qué opciones están configuradas para este servicio y el entorno seleccionado:

{{< img src="/tracing/runtime_config/active-library-config.png" alt="Desde la pestaña Guía para la configuración, puedes ver la configuración de tu biblioteca activa." style="width:100%;">}}

En este ejemplo, puedes ver que la inyección de logs está habilitada para el entorno de staging a través en dos instancias. Una instancia se refiere a una instancia del cliente de configuración remota. Debería haber una instancia por cada proceso de tu aplicación.

Puedes saber cuándo se han aplicado correctamente los cambios de configuración consultando el texto **X Applied***. En este ejemplo, la configuración se ha aplicado correctamente a las dos instancias.

## Opciones de configuración compatibles

Las siguientes opciones son compatibles con la configuración en tiempo de ejecución. Para cada lenguaje, se indica la versión de rastreador necesaria:

| Opción                                                                                                                                 | Java      | JavaScript              | Python   | .NET      | Ruby      | Go        | C++ |
|----------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------|----------|-----------|-----------|-----------|-|
| <h5>Frecuencia de muestreo personalizada</h5> Define una frecuencia de muestreo global para la librería utilizando `DD_TRACE_SAMPLE_RATE`.                                  | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.4.0+` | `2.33.0+` | `1.13.0+` | `1.59.0+` | `0.2.0+` |
| <h5>Inyección de logs</h5> Inyecta automáticamente identificadores de correlación de rastreo para correlacionar logs y trazas, habilitando `DD_LOGS_INJECTION`. | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.6.0+` | `2.33.0+` | `1.13.0+` |           | |
| </h5>Etiquetas de cabeceras HTTP</h5> Añada valores de cabeceras HTTP como etiquetas en trazas, utilizando `DD_TRACE_HEADER_TAGS`.                                        | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.6.0+` | `2.33.0+` | `1.13.0+` | `1.59.0+` | |
| Etiquetas de tramos personalizadas</h5> Añade las etiquetas especificadas a cada tramo, utilizando `DD_TAGS`.                                                              | `1.31.0+` | `4.23.0+` `3.44.0+`     | `2.5.0+` | `2.44.0+` |           | `1.59.0+` | `0.2.0+` |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/remote_config/
[2]: /es/agent/
[3]: /es/tracing/service_catalog/
[4]: /es/account_management/rbac/permissions/
[5]: /es/tracing/trace_explorer/trace_view
