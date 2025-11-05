---
aliases:
- /es/opentelemetry/interoperability/environment_variable_support
further_reading:
- link: /tracing/trace_collection/library_config/dotnet-core
  tag: Documentación
  text: Configuración del SDK de .NET Core
- link: /tracing/trace_collection/library_config/dotnet-framework
  tag: Documentación
  text: Configuración del SDK de .NET Framework
- link: /tracing/trace_collection/library_config/go
  tag: Documentación
  text: Configuración del SDK de Go
- link: /tracing/trace_collection/library_config/java
  tag: Documentación
  text: Configuración del SDK de Java
- link: /tracing/trace_collection/library_config/nodejs
  tag: Documentación
  text: Configuración del SDK de Node.js
- link: /tracing/trace_collection/library_config/php
  tag: Documentación
  text: Configuración del SDK de PHP
- link: /tracing/trace_collection/library_config/python
  tag: Documentación
  text: Configuración del SDK de Python
- link: /tracing/trace_collection/library_config/ruby
  tag: Documentación
  text: Configuración del SDK de Ruby
title: Uso de las variables de entorno de OpenTelemetry con los SDK de Datadog
---

Los SDK de Datadog implementan las API de rastreo de OpenTelemetry, lo que te permite utilizar variables de entorno de OpenTelemetry para configurar el rastreo de Datadog en tus aplicaciones. Sustituye el SDK de OpenTelemetry por el SDK de Datadog en tu aplicación para recibir trazas (traces) y telemetría adicional Datadog con cambios mínimos en tu configuración existente.
Esta página describe las opciones de SDK de OpenTelemetry compatibles con Datadog.

<div class="alert alert-info">Si se configuran variables de entorno de Datadog y de OpenTelemetry, Datadog tiene prioridad. Los valores por defecto de Datadog también sustituyen los valores por defecto de OpenTelemetry. Consulta la <a href="/tracing/trace_collection/library_config/">página de configuración de SDK</a> correspondiente para conocer los valores por defecto y obtener más información.</div>

## Configuración general de SDK
Los SDK de Datadog admiten las siguientes opciones generales de SDK de OpenTelemetry. Para obtener más información, consulta la [documentación de OpenTelemetry][9] relacionada.

`OTEL_SERVICE_NAME`
: ****Convención Datadog****: `DD_SERVICE`<br>
Define el nombre del servicio<br>
**Notas**: Si `service.name` también se proporciona en `OTEL_RESOURCE_ATTRIBUTES`, entonces `OTEL_SERVICE_NAME` tiene prioridad<br>

`OTEL_LOG_LEVEL`
: ****Convención Datadog****: `DD_LOG_LEVEL`<br>
Nivel de log utilizado por el generador de logs del SDK<br>
**Notas**: Un nivel de log de depuración también se asigna a `DD_TRACE_DEBUG=true`<br>
En los SDK de Node.js y PHP se asigna a `DD_TRACE_LOG_LEVEL` <br>
En el SDK de Go solo se admiten valores asignados entre `OTEL_LOG_LEVEL` y `DD_TRACE_DEBUG`:<br>
  - `info`|`false`
  - `debug`|`true`<br>
**No compatible con los SDK de Python.NET, Ruby, y Go<br>

`OTEL_PROPAGATORS`
: ****Convención Datadog****: `DD_TRACE_PROPAGATION_STYLE`<br>
Propagadores que deben utilizarse como listas separadas por comas.<br>
**Notas**: Los únicos valores compatibles con la mayoría de los SDK de Datadog son `tracecontext`, `b3`, `b3multi`, `none`, `datadog`. `xray` también es compatible con el SDK de Java.<br>
Los valores DEBEN estar deduplicados para registrar un `Propagator` solo una vez.<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: ****Convención Datadog****: `DD_TRACE_SAMPLE_RATE`<br>
`OTEL_TRACES_SAMPLER`: Muestreador que debe utilizarse para trazas y `OTEL_TRACES_SAMPLER_ARG`: Valor de cadena que se debe utilizar como argumento del muestreador.<br>
**Notas**: El valor especificado solo se utiliza si `OTEL_TRACES_SAMPLER` está configurado. Cada tipo de muestreador define su propia entrada esperada, si la hay. Las entradas no válidas o no reconocidas DEBEN registrarse y DEBEN ignorarse. En tales casos, la implementación DEBE comportarse como si `OTEL_TRACES_SAMPLER_ARG` no estuviera configurado.<br>
Valores asignados entre `OTEL_TRACES_SAMPLER` y `DD_TRACE_SAMPLE_RATE`:<br>
  - `parentbased_always_on`|`1.0`
  - `parentbased_always_off`|`0.0`
  - `parentbased_traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`
  - `always_on`|`1.0`
  - `always_off`|`0.0`
  - `traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`

`OTEL_TRACES_EXPORTER`
: ****Convención Datadog****: `DD_TRACE_ENABLED=false` <br>
Exportador de trazas que se debe utilizar<br>
**Notas**: Solo se acepta un valor `none`<br>

`OTEL_METRICS_EXPORTER`
: ****Convención Datadog****: `DD_RUNTIME_METRICS_ENABLED=false` <br>
Exportador de métricas que se debe utilizar<br>
**Notas**: Solo se acepta un valor `none`<br>

`OTEL_RESOURCE_ATTRIBUTES`
: ****Convención Datadog****: `DD_TAGS` <br>
Pares clave-valor que se deben utilizar como atributos de recursos. Consulta [Convenciones semánticas de recursos][11] para ver más detalles<br>
**Notas**: Solo se utilizan los 10 primeros pares clave-valor y los valores siguientes se descartan<br>
`deployment.environment` y `deployment.environment.name` se asignan a la variable de entorno `DD_ENV`<br>
`service.name` se asigna a la variable de entorno `DD_SERVICE`<br>
`service.version` se asigna a la variable de entorno `DD_VERSION`<br>


`OTEL_SDK_DISABLED`
: ****Convención Datadog****: `!DD_TRACE_OTEL_ENABLED` <br>
Desactivar el SDK para todas las señales<br>
**Notas**: Valores asignados entre `OTEL_SDK_DISABLED` y `DD_TRACE_OTEL_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`<br>
**SDK de Ruby Go**: El SDK de OpenTelemetry se activa automáticamente al importarlo y configurarlo, por lo que este ajuste no es aplicable.

## Java-específico Configuración
Los SDK de Datadog admiten las siguientes opciones de configuración de OpenTelemetry específicas de Java. Para obtener más información, consulta la [documentación de OpenTelemetry sobre la configuración del Agent Java][10].


`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: ****Convención Datadog****: `!DD_INTEGRATIONS_ENABLED` <br>
Configurar como `false` para desactivar toda la instrumentación en el Agent<br>
**Notas**: Valores asignados entre `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` y `DD_INTEGRATIONS_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **Descripción**: Activa/desactiva la instrumentación drop-in OTel nombrada.<br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: ****Convención Datadog****: `DD_TRACE_CONFIG` <br>
Ruta al archivo de propiedades Java válido que contiene la configuración del Agent<br>
**Notas**: Cuando OTEL_JAVAAGENT_CONFIGURATION_FILE y DD_TRACE_CONFIG están ambos configurados, aplicamos la configuración de ambos archivos. Esta es una excepción a la regla habitual en la que la configuración de Datadog tiene prioridad sobre la de OTel.<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: ****Convención Datadog****: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
Una lista separada por comas de nombres de cabeceras HTTP. Las instrumentaciones de clientes HTTP capturan los valores de cabecera de solicitudes HTTP de todos los nombres de cabecera configurados<br>
**Notas**: El etiquetado de cabeceras configurado utilizando variables de entorno OTel sigue la convención de nombres de las etiquetas (tags) OTel de `http.request.header.<header-name>`, en lugar de la convención Datadog de `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: ****Convención Datadog****: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
Una lista separada por comas de nombres de cabeceras HTTP. Las instrumentaciones de clientes HTTP capturan los valores de cabecera de respuestas HTTP de todos los nombres de cabecera configurados<br>
**Notas**: El etiquetado de cabeceras configurado utilizando variables de entorno OTel sigue la convención de nombres de las etiquetas OTel de `http.response.header.<header-name>`, en lugar de la convención Datadog de `http.response.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: ****Convención Datadog****: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
Una lista separada por comas de nombres de cabeceras HTTP. Las instrumentaciones de servidores HTTP capturan los valores de cabecera de solicitudes HTTP de todos los nombres de cabecera configurados<br>
**Notas**: El etiquetado de cabeceras configurado utilizando variables de entorno OTel sigue la convención de nombres de las etiquetas OTel de `http.request.header.<header-name>`, en lugar de la convención Datadog de `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: ****Convención Datadog****: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
Una lista separada por comas de nombres de cabeceras HTTP. Las instrumentaciones de servidores HTTP capturan los valores de cabecera de respuestas HTTP de todos los nombres de cabecera configurados<br>
**Notas**: El etiquetado de cabeceras configurado utilizando variables de entorno OTel sigue la convención de nombres de las etiquetas OTel de `http.response.header.<header-name>`, en lugar de la convención Datadog de `http.response.headers.<header-name>`<br>

`OTEL_JAVAAGENT_EXTENSIONS`
: ****Convención Datadog****: `DD_TRACE_EXTENSIONS_PATH` <br>
Una lista separada por comas de rutas a archivos de extensión jar o carpetas que contienen archivos jar. Si apunta a una carpeta, cada archivo jar de esa carpeta se trata como una extensión separada e independiente. <br>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/library_config/dotnet-core
[2]: /es/tracing/trace_collection/library_config/dotnet-framework
[3]: /es/tracing/trace_collection/library_config/go
[4]: /es/tracing/trace_collection/library_config/java
[5]: /es/tracing/trace_collection/library_config/nodejs
[6]: /es/tracing/trace_collection/library_config/php
[7]: /es/tracing/trace_collection/library_config/python
[8]: /es/tracing/trace_collection/library_config/ruby
[9]: https://opentelemetry.io/docs/specs/otel/configuration/SDK-environment-variables/#general-SDK-configuration
[10]: https://opentelemetry.io/docs/zero-code/java/agent/configuration/#configuring-the-agent
[11]: https://opentelemetry.io/docs/specs/semconv/resource/#semantic-attributes-with-dedicated-environment-variable
[12]: /es/tracing/trace_collection/library_config/_index