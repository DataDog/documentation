---
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Código fuente
  text: Código fuente
- link: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
  tag: Sitio externo
  text: Página del paquete
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
- link: /tracing/trace_collection/trace_context_propagation/go/
  tag: Documentación
  text: Propagación del contexto de rastreo
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración de la librería de rastreo de Go
type: lenguaje de código múltiple
---

Después de [configurar la librería de rastreo con tu código, configurar el Agent para recopilar datos de APM y activa la integración Go][1]. También puedes configurar la librería de rastreo como prefieras.

Datadog recomienda utilizar `DD_ENV`, `DD_SERVICE`, y `DD_VERSION` para configurar `env`, `service` y `version` para tus servicios.

Para obtener recomendaciones sobre cómo configurar estas variables de entorno, consulta la documentación sobre [etiquetado unificado de servicios][2]. Estas variables están disponibles para las versiones 1.24.0 o posterior del rastreador Go.

También puedes optar por proporcionar `env`, `service` y `version` a través de la API del rastreador:

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // Cuando el rastreador está detenido, descargará todo lo que contiene en el Datadog Agent antes de cerrarse.
    // Asegúrate de conservar esta línea en tu función principal.
    defer tracer.Stop()
}
```

El rastreador Go admite variables de entorno y funciones adicionales en su configuración.
Consulta todas las opciones disponibles en la [documentación de configuración][3].

`DD_VERSION`
: Define la versión de la aplicación, por ejemplo: `1.2.3`, `6c44da20`, `2020.02.13`

`DD_SERVICE`
: El nombre de servicio que se utilizará para esta aplicación.

`DD_ENV`
: Define el entorno de la aplicación, por ejemplo: producción, pre-producción, staging.

`DD_AGENT_HOST`
: **Por defecto: `localhost` <br>
Anula la dirección del host por defecto del Trace Agent para el envío de trazas.

`DD_TRACE_AGENT_PORT`
: **Por defecto: `8126` <br>
Anula el puerto por defecto del Trace Agent para el envío de trazas de Datadog. Si la [configuración del Agent][13] configura `receiver_port` o `DD_APM_RECEIVER_PORT` con un valor distinto al predeterminado `8126`, la configuración de la librería `DD_DOGSTATSD_PORT` debe coincidir con él.

`DD_DOGSTATSD_PORT`
: **Por defecto: `8125` <br>
Anula el puerto por defecto del Trace Agent para el envío de métricas de DogStatsD. Si la [configuración del Agent][13] configura `dogstatsd_port` o `DD_DOGSTATSD_PORT` con un valor distinto al predeterminado `8125`, la configuración de la librería `DD_DOGSTATSD_PORT` debe coincidir con él.

`DD_TRACE_SAMPLING_RULES`
: **Por defecto**: `nil`<br>
Una matriz JSON de objetos. Cada objeto debe tener una `"sample_rate"`. Los campos `"name"`,`"service"`, `"resource"` y `"tags"` son opcionales. El valor de `"sample_rate"` debe estar comprendido entre `0.0` y `1.0` (inclusive). Las reglas se aplican en el orden configurado para determinar la frecuencia de muestreo de la traza.

<div class="alert alert-info">La compatibilidad con el muestreo por recurso y etiquetas (tags) está en fase beta.</div>

Para obtener más información, consulta [Mecanismos de consumo][4].<br>
**Ejemplos:**<br>
  - Configura la frecuencia de muestreo en 20%: `'[{"sample_rate": 0.2}]'`.
  - Configura la frecuencia de muestreo en 10% para servicios que comienzan por 'a' y para el nombre del tramo (span) que comienza por 'b', y configura la frecuencia de muestreo en 20% para todos los demás servicios: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`.
  - Configura la frecuencia de muestreo en 40% para servicios que tienen el nombre de recurso`HTTP GET`: `'[{"resource": "HTTP GET", "sample_rate": 0.4}]'`.
  - Configura la frecuencia de muestreo en 100% para servicios que tienen una etiqueta `tier` con el valor `premium`: `'[{"tags": {"tier":"premium"}, "sample_rate": 1}]'`.

`DD_TRACE_SAMPLE_RATE`
: **Por defecto**: `nil`<br>
Habilita el control de la frecuencia de consumo.

`DD_SPAN_SAMPLING_RULES`
: **Por defecto**: `nil`<br>
Una matriz JSON de objetos. Cada objeto debe tener un `"sample_rate"`. Los campos `"name"`,`"service"`, `"resource"` y `"tags"` son opcionales. Se aplican reglas en el orden configurado para determinar la frecuencia de muestreo de tramos. El valor de `sample_rate` debe estar comprendido entre 0,0 y 1,0 (inclusive).

<div class="alert alert-info">La compatibilidad con el muestreo por recurso y etiquetas está en fase beta.</div>

Para obtener más información, consulta [Mecanismos de consumo][5].<br>
**Ejemplos:**<br>
  - Define la frecuencia de muestreo de tramos en 50% para el nombre de servicio `my-service` y de operación `http.request`, hasta 50 trazas por segundo: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`
  - Configura la frecuencia de muestreo en 100% para servicios que tienen una etiqueta `priority` con el valor `high`: `'[{"tags": {"priority":"high"}, "sample_rate": 1}]'`.

`DD_TRACE_RATE_LIMIT`
: Número máximo de tramos a muestrear por segundo, por cada proceso Go. Por defecto es 100 cuando DD_TRACE_SAMPLE_RATE está configurado. De lo contrario, delega la limitación de frecuencias al Datadog Agent .

`DD_TAGS`
: **Por defecto**: [] <br>
Una lista de etiquetas por defecto que se añadirá a cada tramo y perfil. Las etiquetas pueden separarse con comas o espacios, por ejemplo: `layer:api,team:intake,key:value` o `layer:api team:intake key:value`.

`DD_TRACE_STARTUP_LOGS`
: **Por defecto: `true` <br>
Habilita la configuración del inicio y el log de diagnóstico.

`DD_TRACE_DEBUG`
**Por defecto**: `false`<br>
Habilita el registro de depuración en el rastreador.

`DD_TRACE_ENABLED`
: **Por defecto: `true` <br>
Habilita la instrumentación de web frameworks y bibliotecas. Cuando es falso, el código de la aplicación no genera trazas.

`DD_SERVICE_MAPPING`
: **Por defecto: `null` <br>
Cambia dinámicamente el nombre de los servicios mediante configuración. Los servicios pueden separarse por comas o espacios, por ejemplo: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
**Por defecto**: `true` <br>
Datadog puede recopilar [información de entorno y de diagnóstico sobre tu sistema][4] para mejorar el producto. Cuando es falso, no se recopilan estos datos de telemetría.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Por defecto**: `false` <br>
Permite la descarga incremental de trazas de gran tamaño al Datadog Agent, reduciendo la posibilidad de rechazo por parte del Agent. Utilízala sólo cuando tengas trazas de mucha antigüedad o trazas con muchos tramos. Los valores válidos son `true` o `false`. Añadido en la versión 1.54.0. Sólo es compatible con el Datadog Agent v7.26.0 o posterior.


`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Por defecto**: `1000`<br>
Número de tramos dentro de una traza que puede ser parcialmente descargada en el Datadog Agent . `DD_TRACE_PARTIAL_FLUSH_ENABLED` debe ser `true` para que ocurra la descarga parcial.
Añadido en la versión 1.54.0. Sólo es compatible con el Datadog Agent v7.26.0 o posterior.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Por defecto: `false` <br>
Habilita la recopilación de IP de clientes a partir de cabeceras IP relevantes en tramos de solicitudes HTTP.
Añadido en la versión 1.47.0

`DD_TRACE_HEADER_TAGS`
: **Por defecto: `null` <br>
Lista de cabeceras HTTP separadas por comas que se utilizarán como span tagss. También puedes especificar un campo "asignado" para renombrar una cabecera de solicitud como una etiqueta. La configuración se puede establecer globalmente con esta variable de entorno, o a nivel de la integración, utilizando las opciones especificadas en la [documentación de Go][15]. Esta función es compatible con cabeceras [HTTP1][16].<br>
**Ejemplos:**<br>
  - Captura la cabecera de solicitud `my-header`: `"DD_TRACE_HEADER_TAGS=my-header"`
  - Captura la cabecera de solicitud `my-header-1` y `my-header-2`: `"DD_TRACE_HEADER_TAGS=my-header1,my-header-2"`
  - Captura la cabecera de solicitud `my-header-1` y renómbrala `my-tag`: `"DD_TRACE_HEADER_TAGS=my-header:my-tag"`

`DD_RUNTIME_METRICS_ENABLED`
: **Por defecto: `false` <br>
Habilita la recopilación de [métricas de tiempo de ejecución][17].
Añadido en la versión 1.26.0.

`DD_TRACE_PROPAGATION_STYLE`
: **Por defecto: `datadog,tracecontext` <br>
Configura el estilo de inyección y extracción de cabeceras de trazas. Para obtener más información, consulta [Propagación del contexto de rastreo Go][18].

## Configuración del nombre del entorno APM

El [nombre del entorno APM][7] puede configurarse [en el Agent][8] o utilizando la opción de inicio [WithEnv][3] del rastreador.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/go
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[4]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[5]: /es/tracing/trace_pipeline/ingestion_mechanisms/?tab=go#pagetitle
[6]: /es/tracing/configure_data_security#telemetry-collection
[7]: /es/tracing/advanced/setting_primary_tags_to_scope/#environment
[8]: /es/getting_started/tracing/#environment-name
[9]: https://github.com/openzipkin/b3-propagation
[13]: /es/agent/configuration/network/#configure-ports
[14]: https://github.com/w3c/trace-context
[15]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[16]: https://www.rfc-editor.org/rfc/rfc7230#section-3.2
[17]: https://docs.datadoghq.com/es/tracing/metrics/runtime_metrics/go
[18]: https://docs.datadoghq.com/es/tracing/trace_collection/trace_context_propagation/go/
[19]: /es/opentelemetry/interoperability/environment_variable_support
