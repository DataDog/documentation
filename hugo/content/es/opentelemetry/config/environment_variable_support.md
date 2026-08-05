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
title: Interoperabilidad de variables de entorno de OpenTelemetry
---

Los SDKs de Datadog implementan las APIs de OpenTelemetry para trazas, métricas y logs. Esto te permite utilizar variables de entorno estándar de OpenTelemetry para configurar tu aplicación mientras recibes telemetría adicional de Datadog con cambios mínimos en tu configuración existente.

Este página describe las variables de entorno de Datadog compatibles para la interoperabilidad de OpenTelemetry.

Las reglas de precedencia en esta página describen cómo los *SDKs de Datadog* resuelven la configuración en atributos de recursos de OpenTelemetry (por ejemplo, `service.name`, `deployment.environment.name`, `service.version`).

<div class="alert alert-danger">
  Para evitar que aparezcan valores duplicados en Datadog para la misma clave de etiqueta, no configures las variables de entorno de Datadog (<code>DD_*</code>) y OpenTelemetry (<code>OTEL_*</code>) para el mismo concepto. Elige una convención.
  <br>
  Consulta la <a href="/tracing/trace_collection/library_config/">página de configuración de SDK</a> pertinente para los valores predeterminados y más información.
</div>

## Requisitos de la red

{{% otel-network-requirements %}}

**Nota**: Incluso cuando `DD_METRICS_OTEL_ENABLED=true`, las métricas de tiempo de ejecución estándar se siguen emitiendo a través de DogStatsD.

## Configuración del SDK de Datadog
Estas variables de entorno permiten al SDK de Datadog ingerir datos de la API de métricas y logs de OpenTelemetry. Para obtener guías sobre cómo instrumentar tu aplicación, consulta la [documentación de instrumentación específica del lenguaje][14].

`DD_TRACE_OTEL_ENABLED`
: **Descripción**: habilita la interoperabilidad de OpenTelemetry del SDK de Datadog para trazas. <br>
**Por defecto**: `false`<br>
**Notas**: El valor por defecto es `true` en el SDK de Java.

`DD_METRICS_OTEL_ENABLED`
: **Descripción**: habilita los componentes de instrumentación automática del SDK de Datadog para recopilar y emitir métricas generadas por la API de métricas de OpenTelemetry. <br>
**Predeterminado**: `false`

`DD_LOGS_OTEL_ENABLED`
: **Descripción**: habilita el SDK de Datadog para recopilar y exportar logs en el formato OpenTelemetry Protocol. <br>
**Notas**: Para la mayoría de los lenguajes, esto habilita la compatibilidad con la API de logs de OpenTelemetry. Para .NET, permite interceptar los registradores integrados. <br>
**Por defecto**: `false`

## Configuración general de SDK
Los SDK de Datadog admiten las siguientes opciones generales de SDK de OpenTelemetry. Para obtener más información, consulta la [documentación de OpenTelemetry][9] relacionada.

`OTEL_SERVICE_NAME`
: **Convención de Datadog**: `DD_SERVICE`<br>
Establece el atributo de recurso `service.name`<br>
**Notas**: Al determinar el atributo de recurso `service.name` final, el kit de desarrollo de software (SDK) utiliza esta variable como entrada para determinar el `service.name` final. Consulta las notas de `service.name` en `OTEL_RESOURCE_ATTRIBUTES` para conocer el orden de precedencia completo.<br>

`OTEL_LOG_LEVEL`
: **Convención de Datadog**: `DD_LOG_LEVEL`<br>
Nivel de log utilizado por el SDK registrador<br>
**Notas**: Un nivel de log de depuración también se asigna a `DD_TRACE_DEBUG=true`<br>
En los SDKs de Node.js y PHP se asigna a `DD_TRACE_LOG_LEVEL` <br>
En el SDK de Go solo se admiten valores asignados entre `OTEL_LOG_LEVEL` y `DD_TRACE_DEBUG`:<br>
  - `info`|`false`
  - `debug`|`true`<br>
**No compatible con los SDK de Python.NET, Ruby, y Go<br>

`OTEL_PROPAGATORS`
: **Convención de Datadog**: `DD_TRACE_PROPAGATION_STYLE`<br>
Los propagadores deben utilizarse como una lista separada por comas.<br>
**Notas**: Los únicos valores compatibles con la mayoría de los SDK de Datadog son `tracecontext`, `b3`, `b3multi`, `none`, `datadog`. `xray` también es compatible con el SDK de Java.<br>
Los valores deben ser deduplicados para registrar un `Propagator` solo una vez<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: **Convención de Datadog**: `DD_TRACE_SAMPLE_RATE`<br>
`OTEL_TRACES_SAMPLER`: muestreador a utilizar para trazas y `OTEL_TRACES_SAMPLER_ARG`: Valor de cadena a utilizar como argumento del muestreador.<br>
**Notas**: El valor especificado solo se utiliza si `OTEL_TRACES_SAMPLER` está configurado. Cada tipo de muestreador define su propia entrada esperada, si la hay. Las entradas no válidas o no reconocidas DEBEN registrarse y, por lo demás, DEBEN ignorarse. En tales casos, la aplicación DEBE comportarse como si `OTEL_TRACES_SAMPLER_ARG` no estuviera activado.<br>
Valores asignados entre `OTEL_TRACES_SAMPLER` y `DD_TRACE_SAMPLE_RATE`:<br>
  - `parentbased_always_on`|`1.0`
  - `parentbased_always_off`|`0.0`
  - `parentbased_traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`
  - `always_on`|`1.0`
  - `always_off`|`0.0`
  - `traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`

`OTEL_TRACES_EXPORTER`
: **Convención de Datadog**: `DD_TRACE_ENABLED=false` <br>
Exportador de trazas a utilizar<br>
**Notas**: Solo se acepta el valor `none`<br>

`OTEL_METRICS_EXPORTER`
: **Descripción**: especifica el exportador de métricas a utilizar. <br>
**Notas**: Los únicos valores aceptados son `OpenTelemetry Protocol` y `none`. Un valor de `none` deshabilita la emisión de métricas de OpenTelemetry, así como las métricas de tiempo de ejecución de APM (equivalente a `DD_RUNTIME_METRICS_ENABLED=false`). <br>
**Por defecto**: `OpenTelemetry Protocol`

`OTEL_RESOURCE_ATTRIBUTES`
: **Convención de Datadog**: `DD_TAGS` <br>
**Descripción**: pares clave-valor que se utilizarán como atributos del recurso de OpenTelemetry. <br>
**Notas**: El kit de desarrollo de software (SDK) resuelve las configuraciones solapadas utilizando primero la configuración de Datadog (`DD_*`).
    - `service.name` (corresponde a `DD_SERVICE`): el kit de desarrollo de software (SDK) resuelve el valor con la siguiente precedencia: <br>
        1. Valor de `DD_SERVICE` <br>
        2. Valor de la clave `service` en `DD_TAGS` <br>
        3. Valor de `OTEL_SERVICE_NAME` <br>
        4. Valor de la clave `service.name` en `OTEL_RESOURCE_ATTRIBUTES`
    - `deployment.environment.name` (se asigna a `DD_ENV`): el kit de desarrollo de software (SDK) resuelve el valor con la siguiente precedencia: <br>
        1. Valor de `DD_ENV` <br>
        2. Valor de la clave `env` en `DD_TAGS` <br>
        3. Valor de la clave `deployment.environment.name` en `OTEL_RESOURCE_ATTRIBUTES` <br>
        4. Valor de `deployment.environment` en `OTEL_RESOURCE_ATTRIBUTES`
    - `service.version` (se asigna a `DD_VERSION`): el kit de desarrollo de software (SDK) resuelve el valor con la siguiente precedencia: <br>
        1. Valor de `DD_VERSION` <br>
        2. Valor de la clave `version` en `DD_TAGS` <br>
        3. Valor de la clave `service.version` en `OTEL_RESOURCE_ATTRIBUTES`
    - **Atributos adicionales**: pueden añadirse a través de la configuración de `DD_TAGS`, o de `OTEL_RESOURCE_ATTRIBUTES` si `DD_TAGS` no está configurado.

  <div class="alert alert-danger">
    Aunque el kit de desarrollo de software (SDK) resuelve estos ajustes internamente para la telemetría emitida, el Datadog Agent recopila etiquetas de todas las fuentes configuradas sin anularlas. Configurar el servicio/entorno/versión utilizando múltiples entradas (por ejemplo, tanto <code>DD_ENV</code> como <code>OTEL_RESOURCE_ATTRIBUTES</code>) puede dar lugar a que aparezcan múltiples valores en Datadog (por ejemplo, <code>env:prod</code> y <code>env:dev</code>).
    Para evitar valores duplicados, configura cada concepto utilizando una sola convención.
  </div>

`OTEL_SDK_DISABLED`
: **Descripción**: desactiva la interoperabilidad de OpenTelemetry del SDK de Datadog para todas las señales. <br>
**Notas**: Cuando se establece en `true`, esto establece efectivamente `DD_TRACE_OTEL_ENABLED=false`, `DD_LOGS_OTEL_ENABLED=false` y `DD_METRICS_OTEL_ENABLED=false`.<br>
**SDKs de Ruby y Go**: el SDK de OpenTelemetry se activa automáticamente en la importación y configuración, por lo que este ajuste no es aplicable.

## Configuración del exportador de OpenTelemetry Protocol
Los SDK de Datadog admiten las siguientes opciones del  [Exportador de OpenTelemetry Protocol][13].

Las variables específicas de una señal (como `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`) siempre tienen prioridad sobre sus variables homólogas generales (como `OTEL_EXPORTER_OTLP_PROTOCOL`).

### Configuración general de OpenTelemetry Protocol

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **Descripción**: especifica el protocolo de transporte a utilizar para todas las señales a menos que se anule. <br>
**Valores aceptados**: `grpc`, `http/protobuf`, `http/json`. <br>
**Predeterminado**: dependiente del kit de desarrollo de software (SDK). El SDK de Datadog pretende coincidir con el protocolo por defecto del SDK de OpenTelemetry oficial correspondiente para ese lenguaje.

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **Descripción**: especifica la URL base para el envío de datos de OpenTelemetry Protocol a todas las señales a menos que se anule. <br>
**Por defecto (gRPC)**: `http://localhost:4317`. <br>
**Por defecto (HTTP)**: `http://localhost:4318`.

`OTEL_EXPORTER_OTLP_HEADERS`
: **Descripción**: especifica una lista separada por comas de pares clave-valor que se utilizarán como encabezados en todas las solicitudes salientes de OpenTelemetry Protocol (por ejemplo, `api-key=key,other-config=value`).

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **Descripción**: especifica el tiempo de espera (en milisegundos) para todas las solicitudes salientes de OpenTelemetry Protocol a menos que se anule. <br>
**Predeterminado**: `10000` (10s).

### Configuración de OpenTelemetry Protocol específica para métricas

Para más detalles sobre la especificación oficial de estas variables, consulta la [documentación del Exportador de métricas de OpenTelemetry Protocol][15].

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **Descripción**: especifica el protocolo de transporte de OpenTelemetry Protocol a utilizar para los datos de métricas. Tiene prioridad sobre el protocolo general `OTEL_EXPORTER_OTLP_PROTOCOL`. <br>
**Valores aceptados**: `grpc`, `http/protobuf`, `http/json`. <br>
**Por defecto**: dependiente del kit de desarrollo de software (SDK). El SDK de Datadog pretende coincidir con el protocolo por defecto del SDK de OpenTelemetry oficial correspondiente para ese lenguaje.

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **Descripción**: especifica la URL para el envío de datos de métricas de OpenTelemetry Protocol. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_ENDPOINT` general. <br>
**Por defecto (gRPC)**: `http://localhost:4317`. <br>
**Por defecto (HTTP)**: `http://localhost:4318/v1/metrics`. <br>
**Notas**: Para protocolos HTTP, el kit de desarrollo de software (SDK) añadirá automáticamente `/v1/metrics` si se utiliza `OTEL_EXPORTER_OTLP_ENDPOINT` como alternativa.

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **Descripción**: especifica una lista separada por comas de pares clave-valor que se utilizarán como encabezado en las solicitudes salientes de métricas de OpenTelemetry Protocol (por ejemplo, `api-key=key,other-config=value`). Tiene precedencia sobre el campo general `OTEL_EXPORTER_OTLP_HEADERS`.

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **Descripción**: especifica el tiempo de espera (en milisegundos) para una única solicitud saliente de métricas de OpenTelemetry Protocol. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_TIMEOUT` general. <br>
**Predeterminado**: `10000` (10s).

### Configuración de OpenTelemetry Protocol específica para logs

`OTEL_EXPORTER_OTLP_LOGS_PROTOCOL`
: **Descripción**: especifica el protocolo de transporte de OpenTelemetry Protocol para los logs. Tiene prioridad sobre `OTEL_EXPORTER_OTLP_PROTOCOL`.
: **Valores aceptados**: `grpc`, `http/protobuf`, `http/json` <br>
: **Por defecto**: dependiente del kit de desarrollo de software (SDK). El SDK de Datadog pretende coincidir con el protocolo por defecto del SDK de OpenTelemetry oficial correspondiente para ese lenguaje

`OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`
: **Descripción**: especifica la URL de envío de los logs de OpenTelemetry Protocol. Tiene prioridad sobre `OTEL_EXPORTER_OTLP_ENDPOINT`.
: **Por defecto (gRPC)**: `http://localhost:4317`
: **Por defecto (HTTP)**: `http://localhost:4318/v1/logs`

`OTEL_EXPORTER_OTLP_LOGS_HEADERS`
: **Descripción**: especifica una lista separada por comas de pares clave-valor que se utilizarán como encabezado en las solicitudes salientes de logs de OpenTelemetry Protocol. Prevalece sobre la opción general `OTEL_EXPORTER_OTLP_HEADERS`.

`OTEL_EXPORTER_OTLP_LOGS_TIMEOUT`
: **Descripción**: especifica el tiempo de espera (en milisegundos) para una única solicitud saliente de logs de OpenTelemetry Protocol. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_TIMEOUT` general. <br>
**Predeterminado**: `10000` (10s).

## Configuración del SDK de métricas de OpenTelemetry

Los SDK de Datadog admiten las siguientes opciones del SDK de métricas de OpenTelemetry.

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Descripción**: especifica la agregación `temporality` a utilizar para cada tipo de instrumento. <br>
**Valores aceptados**: `Cumulative`, `Delta`, `LowMemory`. Para más detalles, consulta la [especificación de OpenTelemetry][15]. <br>
**Por defecto**: `delta` <br>
**Notas**: Este valor por defecto `delta` es [la configuración recomendada de Datadog][16] y difiere del valor por defecto de la especificación de OpenTelemetry.

`OTEL_METRIC_EXPORT_INTERVAL`
: **Descripción**: especifica el intervalo de tiempo (en milisegundos) entre los intentos de exportación de métricas. <br>
**Predeterminado**: `10000` (10s) <br>
**Notas**: Este valor predeterminado es la configuración recomendada de Datadog y difiere del valor predeterminado de 60000ms de la especificación de OpenTelemetry.

`OTEL_METRIC_EXPORT_TIMEOUT`
: **Descripción**: especifica el tiempo máximo permitido (en milisegundos) para recopilar y exportar métricas. <br>
**Predeterminado**: `7500` (7.5s) <br>
**Notas**: Este valor predeterminado es la configuración recomendada por Datadog y difiere del valor predeterminado de 30000ms de la especificación de OpenTelemetry.

## Configuración del SDK de logs de OpenTelemetry

Los SDK de Datadog admiten las siguientes opciones del SDK de logs de OpenTelemetry.

`OTEL_LOGS_EXPORTER`
: **Descripción**: especifica el exportador de logs a utilizar. <br>
**Valores aceptados**: `OpenTelemetry Protocol`, `none`. Un valor de `none` desactiva la emisión de logs de OpenTelemetry. <br>
**Por defecto**: `OpenTelemetry Protocol`

`OTEL_BLRP_MAX_QUEUE_SIZE`
: **Descripción**: el número máximo de registros de log a mantener en memoria. Los nuevos registros se eliminan cuando se alcanza el límite. <br>
**Por defecto**: `2048`

`OTEL_BLRP_SCHEDULE_DELAY`
: **Descripción**: el intervalo de tiempo (en milisegundos) entre dos operaciones de exportación consecutivas. <br>
**Predeterminado**: `1000` (1s)

`OTEL_BLRP_EXPORT_TIMEOUT`
: **Descripción**: la duración máxima (en milisegundos) permitida para una sola exportación antes de la cancelación. <br>
**Predeterminado**: `30000` (30s)

`OTEL_BLRP_MAX_EXPORT_BATCH_SIZE`
: **Descripción**: el número máximo de registros de log en una sola carga útil de OpenTelemetry Protocol. <br>
**Por defecto**: `512`

## Java-específico Configuración
Los SDK de Datadog admiten las siguientes opciones de configuración de OpenTelemetry específicas de Java. Para obtener más información, consulta la [documentación de OpenTelemetry sobre la configuración del Agent Java][10].

`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: **Convención de Datadog**: `!DD_INTEGRATIONS_ENABLED` <br>
Establézcalo en `false` para desactivar toda la instrumentación en el Agent<br>
**Notas**: Valores asignados entre `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` y `DD_INTEGRATIONS_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **Descripción**: Activa/desactiva la instrumentación drop-in OTel nombrada.<br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: **Convención de Datadog**: `DD_TRACE_CONFIG` <br>
Ruta al archivo de propiedades de Java válido que contiene la configuración del agent.<br>
**Notas**: Cuando OTEL_JAVAAGENT_CONFIGURATION_FILE y DD_TRACE_CONFIG están ambos definidos se aplica la configuración de ambos archivos. Esta es una excepción a la regla habitual según la cual la configuración de Datadog prevalece sobre la de OpenTelemetry.<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: **Convención de Datadog**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezado HTTP. Las instrumentaciones de cliente HTTP capturan los valores de encabezado de solicitud HTTP para todos los nombres de encabezado configurados<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OpenTelemetry sigue la convención de nombres de etiquetas de OpenTelemetry de `http.request.header.<header-name>` en lugar de la convención de Datadog de `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: **Convención de Datadog**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezado HTTP. Las instrumentaciones de cliente HTTP capturan los valores de encabezado de respuesta HTTP para todos los nombres de encabezado configurados<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OpenTelemetry sigue la convención de nombres de etiquetas de OpenTelemetry de `http.response.header.<header-name>` en lugar de la convención de Datadog de `http.response.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: **Convención de Datadog**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezado HTTP. Las instrumentaciones del servidor HTTP capturan los valores de los encabezados de solicitud HTTP para todos los nombres de encabezados configurados<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OpenTelemetry sigue la convención de nombres de etiquetas de OpenTelemetry de `http.request.header.<header-name>` en lugar de la convención de Datadog de `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: **Convención de Datadog**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezado HTTP. Las instrumentaciones del servidor HTTP capturan los valores de los encabezados de respuesta HTTP para todos los nombres de encabezado configurados.<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OpenTelemetry sigue la convención de nombres de etiquetas de OpenTelemetry de `http.response.header.<header-name>` en lugar de la convención de Datadog de `http.response.headers.<header-name>`<br>

`OTEL_JAVAAGENT_EXTENSIONS`
: **Convención de Datadog**: `DD_TRACE_EXTENSIONS_PATH` <br>
Una lista separada por comas de rutas a archivos jar de extensión, o carpetas que contienen archivos jar. Si apunta a una carpeta, cada archivo jar en esa carpeta se trata como una extensión separada e independiente. <br>

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
[13]: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
[14]: /es/opentelemetry/instrument/api_support/
[15]: https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/#additional-environment-variable-configuration
[16]: /es/opentelemetry/guide/otlp_delta_temporality/