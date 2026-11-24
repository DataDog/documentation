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
Los SDK de DDOT implementan las API de OpenTelemetry para trazas, métricas y registros, y leen las variables de entorno estándar del SDK de OpenTelemetry (`OTEL_*`). Puede mantener su configuración de OpenTelemetry existente al adoptar los SDK de DDOT y utilizar solo algunas configuraciones de Datadog (`DD_*`) para las capacidades específicas de Datadog.

Esta página describe las variables de entorno para configurar los SDK de DDOT, incluidas las diferencias de soporte por lenguaje. También cubre los SDK de Datadog para Ruby y PHP, los cuales leen estas variables de entorno de OpenTelemetry para las API de métricas y registros de OpenTelemetry, pero no son SDK de DDOT.

Las reglas de precedencia en esta página describen cómo los *SDK de DDOT* resuelven la configuración en atributos de recursos de OpenTelemetry (por ejemplo, `service.name`, `deployment.environment.name`, `service.version`).

<div class="alert alert-danger">
  Para evitar que aparezcan valores duplicados en Datadog para la misma clave de etiqueta, no configure variables de entorno de Datadog (<code>DD_*</code>) y de OpenTelemetry (<code>OTEL_*</code>) para el mismo concepto. Elija una convención.
  <br>
  Consulte la <a href="/tracing/trace_collection/library_config/">página de configuración del SDK</a> correspondiente para obtener valores predeterminados y más información.
</div>

## Requisitos de red {#network-requirements}

{{% otel-network-requirements %}}

## Configurar señales {#configure-signals}

Configure trazas, métricas y registros en los SDK de DDOT con las siguientes variables de entorno. Establezca los valores explícitamente para las señales que recopile. Consulte [Soporte de la API de OpenTelemetry][14] para obtener instrucciones de configuración.

Para conocer los valores predeterminados específicos del lenguaje y configuraciones adicionales, consulte:

| Lenguaje del SDK | Referencia de configuración |
|---|---|
| .NET | [.NET Core][1] o [.NET Framework][2] |
| Go | [Configuración del SDK de Go][3] |
| Java | [Configuración del SDK de Java][4] |
| Node.js | [Configuración del SDK de Node.js][5] |
| PHP | [Configuración del SDK de PHP][6] |
| Python | [Configuración del SDK de Python][7] |
| Ruby | [Configuración del SDK de Ruby][8] |

`DD_TRACE_OTEL_ENABLED`
: **Descripción**: Habilita la compatibilidad con la API de trazas de OpenTelemetry. <br>
**Configuración**: Establezca `DD_TRACE_OTEL_ENABLED=true` para habilitar la compatibilidad con la API. Para exportar trazas a través de OTLP, también configure `OTEL_TRACES_EXPORTER=otlp`. Habilitar la compatibilidad con la API por sí solo no cambia el exportador de trazas. Consulte [Exportación de trazas OTLP del SDK de DDOT][17] para obtener instrucciones de configuración.

`DD_TRACE_OTEL_SEMANTICS_ENABLED`
: **Descripción**: Habilita las convenciones semánticas de OpenTelemetry para trazas. <br>
**Predeterminado**: `false`<br>
**Notas**: Para obtener orientación sobre la instrumentación HTTP y la versión del SDK, consulte [Semántica de trazas de OpenTelemetry][21].

`DD_METRICS_OTEL_ENABLED`
: **Descripción**: Habilita la recopilación y exportación OTLP de métricas generadas por la API de métricas de OpenTelemetry. <br>
**Configuración**: Establezca `DD_METRICS_OTEL_ENABLED=true` para habilitar el soporte de métricas y `OTEL_METRICS_EXPORTER=otlp` para seleccionar la exportación OTLP.

`DD_LOGS_OTEL_ENABLED`
: **Descripción**: Habilita al SDK para recopilar registros de las API y bibliotecas de registro compatibles y exportarlos en formato OTLP. <br>
**Configuración**: Establezca `DD_LOGS_OTEL_ENABLED=true` para habilitar la recopilación de registros. Establezca `DD_LOGS_OTEL_ENABLED=false` para deshabilitar la recopilación automática de registros.

### Exportar métricas de tiempo de ejecución a través de OTLP {#export-runtime-metrics-over-otlp}

Para recopilar métricas de tiempo de ejecución y exportarlas a través de OTLP, utilice un SDK que cumpla con los [requisitos previos de métricas de tiempo de ejecución][20] y establezca:

```text
DD_RUNTIME_METRICS_ENABLED=true
DD_METRICS_OTEL_ENABLED=true
OTEL_METRICS_EXPORTER=otlp
```

Esta configuración habilita la recopilación de métricas de tiempo de ejecución y envía las métricas al punto de conexión de métricas OTLP configurado. Consulte la [configuración de OTLP específica de métricas][18] para ver los ajustes del punto de conexión.

## Configuración general del SDK {#general-sdk-configuration}
Los SDK de Datadog admiten las siguientes opciones generales del SDK de OpenTelemetry. Para obtener más información, consulte la [documentación de OpenTelemetry][9] relacionada.

`OTEL_SERVICE_NAME`
: **Convención de Datadog**: `DD_SERVICE`<br>
Establece el atributo de recurso `service.name`<br>
**Notas**: Al determinar el atributo de recurso final `service.name`, el SDK utiliza esta variable como entrada para determinar el `service.name` final. Consulte las `service.name` notas en `OTEL_RESOURCE_ATTRIBUTES` para conocer el orden de precedencia completo.<br>

`OTEL_LOG_LEVEL`
: **Convención de Datadog**: `DD_LOG_LEVEL`<br>
Nivel de registro utilizado por el registrador del SDK<br>
**Notas**: Un nivel de registro de debug también corresponde a `DD_TRACE_DEBUG=true`<br>
En los SDK de Node.js y PHP, esto corresponde a `DD_TRACE_LOG_LEVEL` <br>
En el SDK de Go, solo se admiten los valores correspondientes entre `OTEL_LOG_LEVEL` y `DD_TRACE_DEBUG`:<br>
  - `info`|`false`
  - `debug`|`true`<br>
**No se admite en**: los SDK de Python, .NET, Ruby y Go<br>

`OTEL_PROPAGATORS`
: **Convención de Datadog**: `DD_TRACE_PROPAGATION_STYLE`<br>
Propagadores que se utilizarán, en una lista separada por comas<br>
**Notas**: Los únicos valores admitidos para la mayoría de los SDK de Datadog son `tracecontext`, `b3`, `b3multi`, `none`, `datadog`. `xray` también es compatible con el SDK de Java<br>
Se deben eliminar los valores duplicados para registrar un `Propagator` solo una vez<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: **Convención de Datadog**: `DD_TRACE_SAMPLE_RATE`<br>
`OTEL_TRACES_SAMPLER`: Muestreador que se utilizará para trazas y `OTEL_TRACES_SAMPLER_ARG`: Valor de cadena que se utilizará como argumento del muestreador<br>
**Notas**: El valor especificado solo se utiliza si `OTEL_TRACES_SAMPLER` está configurado. Cada tipo de muestreador define su propia entrada esperada, si corresponde. La entrada no válida o no reconocida DEBE registrarse y DEBE ignorarse en todos los demás aspectos. En tales casos, la implementación DEBE comportarse como si `OTEL_TRACES_SAMPLER_ARG` no estuviera configurado<br>
Valores asignados entre `OTEL_TRACES_SAMPLER` y `DD_TRACE_SAMPLE_RATE`:<br>
  - `parentbased_always_on`|`1.0`
  - `parentbased_always_off`|`0.0`
  - `parentbased_traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`
  - `always_on`|`1.0`
  - `always_off`|`0.0`
  - `traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`

`OTEL_TRACES_EXPORTER`
: **Descripción**: Selecciona el exportador de trazas. <br>
**Configuración**: Establezca `otlp` para exportar trazas a través de OTLP. Para deshabilitar el rastreo de Datadog, establezca `DD_TRACE_ENABLED=false`. Siga [Exportación de trazas OTLP del SDK de DDOT][17] para configurar la exportación de trazas OTLP.

`OTEL_METRICS_EXPORTER`
: **Descripción**: Especifica el exportador de métricas que se utilizará. <br>
**Notas**: Los únicos valores aceptados son `otlp` y `none`. Un valor de `none` deshabilita la emisión de métricas de OTel, así como las métricas de tiempo de ejecución de APM (equivalente a `DD_RUNTIME_METRICS_ENABLED=false`) <br>
**Valor predeterminado**: `otlp`

`OTEL_RESOURCE_ATTRIBUTES`
: **Convención de Datadog**: `DD_TAGS` <br>
**Descripción**: Pares clave-valor que se utilizarán como atributos de recurso de OpenTelemetry. <br>
**Notas**: El SDK resuelve los ajustes superpuestos utilizando primero la configuración de Datadog (`DD_*`).
    - `service.name` (corresponde a `DD_SERVICE`): El SDK resuelve el valor con la siguiente precedencia: <br>
        1. Valor de `DD_SERVICE` <br>
        2. Valor de `OTEL_SERVICE_NAME` <br>
        3. Valor de la clave `service` en `DD_TAGS` <br>
        4. Valor de la clave `service.name` en `OTEL_RESOURCE_ATTRIBUTES`
    - `deployment.environment.name` (corresponde a `DD_ENV`): El SDK resuelve el valor con la siguiente precedencia: <br>
        1. Valor de `DD_ENV` <br>
        2. Valor de la clave `env` en `DD_TAGS` <br>
        3. Valor de la clave `deployment.environment.name` en `OTEL_RESOURCE_ATTRIBUTES` <br>
        4. Valor de `deployment.environment` en `OTEL_RESOURCE_ATTRIBUTES`
    - `service.version` (corresponde a `DD_VERSION`): El SDK resuelve el valor con la siguiente precedencia: <br>
        1. Valor de `DD_VERSION` <br>
        2. Valor de la clave `version` en `DD_TAGS` <br>
        3. Valor de la clave `service.version` en `OTEL_RESOURCE_ATTRIBUTES`
    - **Atributos adicionales**: Pueden agregarse a través de la configuración `DD_TAGS` o `OTEL_RESOURCE_ATTRIBUTES` si `DD_TAGS` no está establecido.

  <div class="alert alert-danger">
    Aunque el SDK resuelve estos ajustes internamente para la telemetría emitida, el Datadog Agent recopila etiquetas de todas las fuentes configuradas sin que unas sobrescriban a otras. Configurar servicio/entorno/versión usando múltiples entradas (por ejemplo, ambos <code>DD_ENV</code> y <code>OTEL_RESOURCE_ATTRIBUTES</code>) puede hacer que aparezcan varios valores en Datadog (por ejemplo, <code>env:prod</code> y <code>env:dev</code>).
    Para evitar duplicados, configure cada concepto usando solo una convención.
  </div>

`OTEL_SDK_DISABLED`
: **Descripción**: Deshabilita el soporte de OpenTelemetry para trazas, métricas y registros. <br>
**Notas**: Cuando se establece en `true`, esto establece efectivamente `DD_TRACE_OTEL_ENABLED=false`, `DD_LOGS_OTEL_ENABLED=false` y `DD_METRICS_OTEL_ENABLED=false`.<br>
**SDK de Ruby y Go**: El SDK de OpenTelemetry se activa automáticamente al importarlo y configurarlo, por lo que este ajuste no es aplicable.

## Configuración del exportador OTLP {#otlp-exporter-configuration}
Los SDK de DDOT admiten las siguientes opciones de [OpenTelemetry OTLP Exporter][13].

Las variables específicas de señal (como `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`) siempre tienen prioridad sobre sus contrapartes generales (como `OTEL_EXPORTER_OTLP_PROTOCOL`).

### Configuración general de OTLP {#general-otlp-configuration}

`OTEL_EXPORTER_OTLP_PROTOCOL`
: **Descripción**: Especifica el protocolo de transporte que se utilizará para todas las señales, a menos que se anule. <br>
**Valores aceptados**: `grpc`, `http/protobuf`, `http/json`. <br>
**Predeterminado**: Dependiente del SDK. El SDK de Datadog tiene como objetivo coincidir con el protocolo predeterminado del SDK de OpenTelemetry oficial correspondiente para ese lenguaje.

`OTEL_EXPORTER_OTLP_ENDPOINT`
: **Descripción**: Especifica la URL base para enviar datos OTLP para todas las señales, a menos que se anule. <br>
**Predeterminado (gRPC)**: `http://localhost:4317`. <br>
**Predeterminado (HTTP)**: `http://localhost:4318`.

`OTEL_EXPORTER_OTLP_HEADERS`
: **Descripción**: Especifica una lista separada por comas de pares clave-valor que se utilizarán como encabezados en todas las solicitudes OTLP salientes (por ejemplo, `api-key=key,other-config=value`).

`OTEL_EXPORTER_OTLP_TIMEOUT`
: **Descripción**: Especifica el tiempo de espera (en milisegundos) para todas las solicitudes OTLP salientes, a menos que se anule. <br>
**Predeterminado**: `10000` (10 s).

### Configuración de OTLP específica para métricas {#metrics-specific-otlp-configuration}

Para obtener más detalles sobre la especificación oficial de estas variables, consulte la [documentación de OpenTelemetry OTLP Metrics Exporter][15].

`OTEL_EXPORTER_OTLP_METRICS_PROTOCOL`
: **Descripción**: Especifica el protocolo de transporte OTLP que se utilizará para los datos de métricas. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_PROTOCOL` general. <br>
**Valores aceptados**: `grpc`, `http/protobuf`, `http/json`. <br>
**Predeterminado**: Dependiente del SDK. El SDK de Datadog tiene como objetivo coincidir con el protocolo predeterminado del SDK de OpenTelemetry oficial correspondiente para ese lenguaje.

`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
: **Descripción**: Especifica la URL para enviar datos de métricas OTLP. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_ENDPOINT` general. <br>
**Predeterminado (gRPC)**: `http://localhost:4317`. <br>
**Predeterminado (HTTP)**: `http://localhost:4318/v1/metrics`. <br>
**Notas**: Para protocolos HTTP, el SDK añadirá automáticamente `/v1/metrics` si se utiliza el `OTEL_EXPORTER_OTLP_ENDPOINT` general como alternativa.

`OTEL_EXPORTER_OTLP_METRICS_HEADERS`
: **Descripción**: Especifica una lista de pares clave-valor separados por comas que se utilizarán como encabezados en las solicitudes de métricas OTLP salientes (por ejemplo, `api-key=key,other-config=value`). Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_HEADERS` general.

`OTEL_EXPORTER_OTLP_METRICS_TIMEOUT`
: **Descripción**: Especifica el tiempo de espera (en milisegundos) para una única solicitud de métricas OTLP saliente. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_TIMEOUT` general. <br>
**Predeterminado**: `10000` (10 s).

### Configuración de OTLP específica para registros {#logs-specific-otlp-configuration}

`OTEL_EXPORTER_OTLP_LOGS_PROTOCOL`
: **Descripción**: Especifica el protocolo de transporte OTLP para registros. Tiene prioridad sobre `OTEL_EXPORTER_OTLP_PROTOCOL`.
: **Valores aceptados**: `grpc`, `http/protobuf`, `http/json` <br>
: **Predeterminado**: dependiente del SDK. El SDK de Datadog tiene como objetivo coincidir con el protocolo predeterminado del SDK de OpenTelemetry oficial correspondiente para ese lenguaje.

`OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`
: **Descripción**: Especifica la URL para enviar registros OTLP. Tiene prioridad sobre `OTEL_EXPORTER_OTLP_ENDPOINT`.
: **Predeterminado (gRPC)**: `http://localhost:4317`
: **Predeterminado (HTTP)**: `http://localhost:4318/v1/logs`

`OTEL_EXPORTER_OTLP_LOGS_HEADERS`
: **Descripción**: Especifica una lista separada por comas de pares clave-valor que se utilizarán como encabezados en las solicitudes de registros OTLP salientes. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_HEADERS` general.

`OTEL_EXPORTER_OTLP_LOGS_TIMEOUT`
: **Descripción**: Especifica el tiempo de espera (en milisegundos) para una sola solicitud de registros OTLP saliente. Tiene prioridad sobre el `OTEL_EXPORTER_OTLP_TIMEOUT` general. <br>
**Predeterminado**: `10000` (10 s).

## Configuración del SDK de métricas de OpenTelemetry {#opentelemetry-metrics-sdk-configuration}

Los SDK de Datadog admiten las siguientes opciones del SDK de métricas de OpenTelemetry.

`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE`
: **Descripción**: Especifica la agregación `temporality` que se debe usar para cada tipo de instrumento. <br>
**Valores aceptados**: `Cumulative`, `Delta`, `LowMemory`. Para obtener más detalles, consulte la [especificación de OpenTelemetry][15]. <br>
**Predeterminado**: `delta` <br>
**Notas**: Este valor predeterminado `delta` es la [configuración recomendada de Datadog][16] y difiere del valor predeterminado de la especificación de OpenTelemetry.

`OTEL_METRIC_EXPORT_INTERVAL`
: **Descripción**: Especifica el intervalo de tiempo (en milisegundos) entre los intentos de exportación de métricas. <br>
**Predeterminado**: `10000` (10 s) <br>
**Notas**: Este valor predeterminado es la configuración recomendada de Datadog y difiere del valor predeterminado de 60000 ms de la especificación de OpenTelemetry.

`OTEL_METRIC_EXPORT_TIMEOUT`
: **Descripción**: Especifica el tiempo máximo permitido (en milisegundos) para recopilar y exportar métricas. <br>
**Predeterminado**: `7500` (7,5 s) <br>
**Notas**: Este valor predeterminado es la configuración recomendada de Datadog y difiere del valor predeterminado de 30000 ms de la especificación de OpenTelemetry.

## Configuración del SDK de logs de OpenTelemetry {#opentelemetry-logs-sdk-configuration}

Los SDK de Datadog admiten las siguientes opciones del SDK de logs de OpenTelemetry.

`OTEL_LOGS_EXPORTER`
: **Descripción**: Configura el exportador de logs de OpenTelemetry. <br>
**Configuración**: Siga [OpenTelemetry API Support][14] para configurar la exportación de logs. Para deshabilitar la recopilación automática de logs, establezca `DD_LOGS_OTEL_ENABLED=false`.

`OTEL_BLRP_MAX_QUEUE_SIZE`
: **Descripción**: El número máximo de registros de log que se mantendrán en memoria. Los registros nuevos se descartan cuando se alcanza el límite. <br>
**Predeterminado**: `2048`

`OTEL_BLRP_SCHEDULE_DELAY`
: **Descripción**: El intervalo de tiempo (en milisegundos) entre dos operaciones de exportación consecutivas. <br>
**Predeterminado**: `1000` (1 s)

`OTEL_BLRP_EXPORT_TIMEOUT`
: **Descripción**: La duración máxima (en milisegundos) permitida para una sola exportación antes de la cancelación. <br>
**Predeterminado**: `30000` (30 s)

`OTEL_BLRP_MAX_EXPORT_BATCH_SIZE`
: **Descripción**: El número máximo de registros de log en una sola carga útil de OTLP. <br>
**Predeterminado**: `512`

## Configuración específica de Java {#java-specific-configuration}
Los SDK de Datadog admiten las siguientes opciones de configuración de OpenTelemetry específicas de Java. Para obtener más información, consulte la [documentación de OpenTelemetry sobre la configuración del agente de Java][10].

`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: **Convención de Datadog**: `!DD_INTEGRATIONS_ENABLED` <br>
Establezca en `false` para deshabilitar toda la instrumentación en el Agent<br>
**Notas**: Valores asignados entre `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` y `DD_INTEGRATIONS_ENABLED`:<br>
  - `true`|`false`
  - `false`|`true`

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **Descripción**: Habilita o deshabilita la instrumentación de sustitución directa de OTel indicada<br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: **Convención de Datadog**: `DD_TRACE_CONFIG` <br>
Ruta a un archivo de propiedades de Java válido que contiene la configuración del agente<br>
**Notas**: Cuando OTEL_JAVAAGENT_CONFIGURATION_FILE y DD_TRACE_CONFIG están configurados, aplicamos la configuración de ambos archivos. Esta es una excepción a la regla habitual donde la configuración de Datadog anula la de OTel<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: **Convención de Datadog**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezados HTTP. Las instrumentaciones del cliente HTTP capturan los valores de los encabezados de solicitud HTTP para todos los nombres de encabezado configurados<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OTel sigue la convención de nombres de etiquetas de OTel de `http.request.header.<header-name>` en lugar de la convención de Datadog de `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: **Convención de Datadog**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezados HTTP. Las instrumentaciones del cliente HTTP capturan los valores de los encabezados de respuesta HTTP para todos los nombres de encabezado configurados<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OTel sigue la convención de nombres de etiquetas de OTel de `http.response.header.<header-name>` en lugar de la convención de Datadog de `http.response.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: **Convención de Datadog**: `DD_TRACE_REQUEST_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezados HTTP. Las instrumentaciones del servidor HTTP capturan los valores de los encabezados de solicitud HTTP para todos los nombres de encabezado configurados<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OTel sigue la convención de nombres de etiquetas de OTel de `http.request.header.<header-name>` en lugar de la convención de Datadog de `http.request.headers.<header-name>`<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: **Convención de Datadog**: `DD_TRACE_RESPONSE_HEADER_TAGS` <br>
Una lista separada por comas de nombres de encabezados HTTP. Las instrumentaciones del servidor HTTP capturan los valores de los encabezados de respuesta HTTP para todos los nombres de encabezado configurados<br>
**Notas**: El etiquetado de encabezados configurado mediante variables de entorno de OTel sigue la convención de OTel para los nombres de etiquetas de `http.response.header.<header-name>` en lugar de la convención de Datadog de `http.response.headers.<header-name>`<br>

`OTEL_JAVAAGENT_EXTENSIONS`
: **Convención de Datadog**: `DD_TRACE_EXTENSIONS_PATH` <br>
Una lista separada por comas de rutas de acceso a archivos jar de extensión o a carpetas que contienen archivos jar. Si apunta a una carpeta, cada archivo jar de esa carpeta se trata como una extensión separada e independiente. <br>

## Lecturas adicionales {#further-reading}

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
[14]: /es/opentelemetry/instrument/ddot_sdks/api_support/
[15]: https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/#additional-environment-variable-configuration
[16]: /es/opentelemetry/guide/otlp_delta_temporality/
[17]: /es/opentelemetry/instrument/ddot_sdks/#enable-otlp-trace-export
[18]: #metrics-specific-otlp-configuration
[20]: /es/tracing/metrics/runtime_metrics/#export-runtime-metrics-over-otlp
[21]: /es/opentelemetry/instrument/ddot_sdks/#opentelemetry-trace-semantics