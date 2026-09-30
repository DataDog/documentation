---
code_lang: go
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/v1
  tag: Código fuente
  text: Código fuente
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: Sitio externo
  text: Página del paquete
- link: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace
  tag: Sitio externo
  text: page (página) de paquete v2
- link: /tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y traces (trazas)
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de traces (trazas)
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración de la biblioteca de rastreo de Go
type: lenguaje de código múltiple
---

Después de [instalar la biblioteca de rastreo con tu código, configura el Agent para recopilar datos de APM y activa la integración de Go][1], inicia el rastreador y configura la biblioteca como desees. {{% tracing-go-v2 %}}

Datadog recomienda utilizar `DD_ENV`, `DD_SERVICE` y `DD_VERSION` para configurar `env`, `service` y `version` para tus servicios.

Lee la documentación [Etiquetado de servicios unificados][2] para obtener recomendaciones sobre cómo configurar estas variables de entorno. Estas variables están disponibles para las versiones 1.24.0+ del rastreador de Go.

También puedes optar por proporcionar `env`, `service` y `version` a través de la API del rastreador:

```go
package main

import (
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // When the tracer is stopped, it will flush everything it has to the Datadog Agent before quitting.
    // Make sure this line stays in your main function.
    defer tracer.Stop()

    // If you expect your application to be shut down by SIGTERM (for example, a container in Kubernetes),
    // you might want to listen for that signal and explicitly stop the tracer to ensure no data is lost
    sigChan := make(chan os.Signal, 1)
    signal.Notify(sigChan, syscall.SIGTERM)
    go func() {
        <-sigChan
        tracer.Stop()
    }()
}
```

El rastreador de Go admite variables de entorno y funciones adicionales para su configuración.
Consulta todas las opciones disponibles en la [documentación de configuración][20] (o la [documentación de configuración v1][3]).

### Etiquetado de servicios unificados

`DD_VERSION`
: Configura la versión de la aplicación, por ejemplo: `1.2.3`, `6c44da20`, `2020.02.13`

`DD_SERVICE`
: El nombre del servicio que se utilizará para esta aplicación.

`DD_ENV`
: Configura el entorno de la aplicación, por ejemplo: producción, preproducción, almacenamiento provisional.

### Trazas (traces)

`DD_TRACE_ENABLED`
: **Predeterminado**: `true` <br>
Habilita la instrumentación de marcos web y bibliotecas. Cuando es false, el código de la aplicación no genera ninguna trace (traza).<br/>
Consulta también [DD_APM_TRACING_ENABLED][21].

`DD_TRACE_AGENT_PORT`
: **Predeterminado**: `8126` <br>
Sustituye el puerto predeterminado del Agent para el envío de traces (trazas) de Datadog. Se ignora si `DD_TRACE_AGENT_URL` está configurado. Si la [configuración del Agent][13] configura `receiver_port` o `DD_APM_RECEIVER_PORT` a algo distinto del `8126` predeterminado, entonces la configuración de la biblioteca `DD_DOGSTATSD_PORT` debe coincidir con ella.

`DD_TRACE_AGENT_URL`
: **Predeterminada**: `null` <br>
Sustituye la URL del Agent utilizada para el envío de traces (trazas). Admite los protocolos `http://`, `https://` y `unix://`. Tiene prioridad sobre `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` si se configura.

`DD_TRACE_RATE_LIMIT`
: Número máximo de tramos para muestrear por segundo, por cada proceso Go. Por defecto es 100, cuando DD_TRACE_SAMPLE_RATE está configurado. De lo contrario, delega la limitación de frecuencias al Datadog Agent .

`DD_TRACE_STARTUP_LOGS`
: **Por defecto: `true` <br>
Habilita la configuración del inicio y el log de diagnóstico.

`DD_TRACE_DEBUG`
**Por defecto**: `false`<br>
Habilita el registro de depuración del rastreador.

`DD_SERVICE_MAPPING`
: **Por defecto: `null` <br>
Cambia dinámicamente el nombre de los servicios mediante la configuración. Los servicios pueden separarse con comas o espacios, por ejemplo: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

`DD_TRACE_PARTIAL_FLUSH_ENABLED`
: **Por defecto**: `false` <br>
Permite la descarga incremental de trazas de gran tamaño al Datadog Agent, reduciendo la posibilidad de rechazo por parte del Agent. Utilízalo sólo cuando tengas trazas de mucha antigüedad o trazas con muchos tramos. Los valores válidos son `true` o `false`. Añadido en la versión 1.54.0. Sólo es compatible con el Datadog Agent v7.26.0 o posterior.


`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **Por defecto**: `1000`<br>
Número de tramos en una traza que pueden descargarse parcialmente en el Datadog Agent. Para que ocurra la descarga parcial, `DD_TRACE_PARTIAL_FLUSH_ENABLED` debe ser `true`.
Añadido en la versión 1.54.0. Sólo es compatible con el Datadog Agent v7.26.0 o posterior.

`DD_TRACE_CLIENT_IP_ENABLED`
: **Por defecto: `false` <br>
Habilita la recopilación de IP de clientes a partir de cabeceras IP relevantes en tramos de solicitudes HTTP.
Añadido en la versión 1.47.0

`DD_TRACE_HEADER_TAGS`
: **Por defecto: `null` <br>
Lista de cabeceras HTTP separadas por comas que se utilizarán como etiquetas de tramos. También puedes especificar un campo "asignado" para renombrar una cabecera de solicitud como etiqueta. La configuración se puede definir globalmente con esta variable de entorno, o a nivel de la integración, utilizando las opciones especificadas en la [documentación de Go][15]. Esta función es compatible con cabeceras [HTTP1][16].<br>
**Ejemplos:**<br>
  - Captura la cabecera de solicitud `my-header`: `"DD_TRACE_HEADER_TAGS=my-header"`
  - Captura las cabeceras de solicitud `my-header-1` y `my-header-2`: `"DD_TRACE_HEADER_TAGS=my-header1,my-header-2"`
  - Captura la cabecera de solicitud `my-header` y renómbrala `my-tag`: `"DD_TRACE_HEADER_TAGS=my-header:my-tag"`

`DD_TAGS`
: **Predeterminada**: ninguna <br>
Lista de tags (etiquetas) predeterminadas que se añaden a cada span (tramo), métrica y perfil. Las tags (etiquetas) pueden estar separadas por comas o espacios, por ejemplo: `layer:api,team:intake,key:value` o `layer:api team:intake key:value`. Los pares clave-valor deben ser de tipos convertible en cadenas.

### Agent  

`DD_AGENT_HOST`
: **Predeterminado**: `localhost` <br>
Sustituye la dirección del host predeterminada de traces (trazas) del Agent para el envío de traces (trazaa). Se ignora si `DD_TRACE_AGENT_URL` está configurada.

`DD_DOGSTATSD_PORT`
: **Por defecto: `8125` <br>
Anula el puerto por defecto del Trace Agent para el envío de métricas de DogStatsD. Si la [configuración del Agent][13] define `dogstatsd_port` o `DD_DOGSTATSD_PORT` con un valor distinto del valor predeterminado `8125`, la configuración de la biblioteca `DD_DOGSTATSD_PORT` debe coincidir con él.

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
**Por defecto**: `true` <br>
Datadog puede recopilar [información del entorno y de diagnóstico de tu sistema][6] para mejorar el producto. Cuando es falso, no se recopilan estos datos de telemetría.

### Métricas de tiempos de ejecución

`DD_RUNTIME_METRICS_ENABLED`
: **Por defecto: `false` <br>
Habilita la recopilación de [métricas de tiempo de ejecución][17].
Añadido en la versión 1.26.0.

### Propagación del contexto de rastreo

`DD_TRACE_PROPAGATION_STYLE`
: **¨Predeterminado**: `datadog,tracecontext,baggage` <br>
Configura el estilo de inserción y extracción de encabezado de traces (trazas). Consulta [Propagación del contexto de traces (trazas) de Go][18] para obtener más información.

## Configuración del nombre del entorno APM

El [nombre del entorno de APM][7] puede configurarse [en el Agent][8] o utilizando la opción de inicio [WithEnv][20] del rastreador.

## Referencias adicionales

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
[17]: /es/tracing/metrics/runtime_metrics/?tab=go
[18]: /es/tracing/trace_collection/trace_context_propagation/
[19]: /es/opentelemetry/interoperability/environment_variable_support
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#StartOption
[21]: /es/tracing/trace_collection/library_config/#traces
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib