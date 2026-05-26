---
aliases:
- /es/tracing/advanced/runtime_metrics/
- /es/tracing/metrics/runtime_metrics/dotnet
- /es/tracing/metrics/runtime_metrics/java
- /es/tracing/metrics/runtime_metrics/nodejs
- /es/tracing/metrics/runtime_metrics/python
- /es/tracing/metrics/runtime_metrics/ruby
- /es/tracing/runtime_metrics/dotnet
- /es/tracing/runtime_metrics/java
- /es/tracing/runtime_metrics/nodejs
- /es/tracing/runtime_metrics/python
- /es/tracing/runtime_metrics/ruby
description: Obtén información adicional sobre el rendimiento de una aplicación con
  las métricas de tiempo de ejecución asociadas a tus trazas.
further_reading:
- link: /opentelemetry/integrations/runtime_metrics/
  tag: Documentación
  text: Métricas de Tiempo de Ejecución de OpenTelemetry
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Correlaciona tus registros y trazas
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumenta manualmente tu aplicación para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Métricas de Tiempo de Ejecución
---
## Resumen {#overview}

Las métricas de tiempo de ejecución monitorean el uso de memoria de tu aplicación, la recolección de basura y la paralelización. Los SDK de Datadog recopilan automáticamente estas métricas para entornos compatibles y las envían al Datadog Agent.

Estas métricas te ayudan a identificar cuellos de botella, solucionar problemas de rendimiento y optimizar la utilización de recursos. Al ver las métricas de tiempo de ejecución junto con trazas y registros, obtienes una visibilidad completa sobre la salud y el rendimiento de tu aplicación.

Si instrumentas tu aplicación con OpenTelemetry en lugar de las bibliotecas de trazado de Datadog, consulta [Métricas de Tiempo de Ejecución de OpenTelemetry][10] para las instrucciones de configuración.

## Compatibilidad {#compatibility}

Las métricas de tiempo de ejecución están disponibles para varios lenguajes de programación y entornos de ejecución, con diferentes niveles de soporte y opciones de configuración. 

{{< tabs >}}
{{% tab "Java" %}}

- **Habilitado por defecto**: Sí
- **Versión de la Biblioteca**: 0.29.0+
- **Entornos de Ejecución**: Java 8+

<div class="alert alert-danger">La recopilación de métricas JMX no es compatible en entornos de AWS Lambda.</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **Habilitado por defecto**: No
  - **Versión de la biblioteca**: 0.30.0+
  - **Nivel de soporte**: Vista previa
  - **Entornos de ejecución**: Todas las versiones de Python soportadas

{{% /tab %}}

{{% tab "Ruby" %}}

  - **Habilitado por defecto**: No
  - **Versión de la biblioteca**: 0.44.0+
  - **Entornos de ejecución**: Todas las versiones de Ruby soportadas


<div class="alert alert-info">Debes agregar la gema <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> a tu aplicación.</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **Habilitado por defecto**: No
  - **Versión de la biblioteca**: 1.18.0+
  - **Entornos de ejecución**: Todas las versiones de Go soportadas

{{% /tab %}}

{{% tab "Node.js" %}}

  - **Habilitado por defecto**: No
  - **Versión de la biblioteca**: 3.0.0+
  - **Entornos de ejecución**: Todas las versiones de Node.js soportadas

{{% /tab %}}

{{% tab ".NET" %}}

  - **Habilitado por defecto**: Sí, en .NET 6+ (v3.40.0+).
  - **Versión de la biblioteca**: 1.23.0+
  - **Entornos de ejecución**: .NET Framework 4.6.1+ y .NET Core 3.1+ (incluyendo .NET 5 y versiones más recientes).

#### Permisos para Internet Information Services (IIS) (solo .NET Framework) {#permissions-for-internet-information-services-iis-net-framework-only}

En .NET Framework, las métricas se recopilan utilizando contadores de rendimiento. Los usuarios en sesiones de inicio de sesión no interactivas (que incluyen cuentas de pool de aplicaciones de IIS y algunas cuentas de servicio) deben ser añadidos al **grupo Usuarios de Seguimiento del Rendimiento** para acceder a los datos de contadores.

Los pools de aplicaciones de IIS utilizan cuentas especiales que no aparecen en la lista de usuarios. Para añadirlos al grupo Usuarios de Seguimiento del Rendimiento, busque `IIS APPPOOL\<name of the pool>`. Por ejemplo, el usuario para el DefaultAppPool sería `IIS APPPOOL\DefaultAppPool`.

Esto se puede hacer desde la interfaz de "Computer Management" o desde un símbolo del sistema de administrador:

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-danger">Las métricas de tiempo de ejecución para PHP no son compatibles.</div>

{{% /tab %}}
{{% tab "C++" %}}

<div class="alert alert-danger">Las métricas de tiempo de ejecución para C++ no son compatibles.</div>

{{% /tab %}}
{{< /tabs >}}

## Instrucciones de configuración {#setup-instructions}

Para configurar las métricas de tiempo de ejecución, debes configurar tanto el Datadog Agent como tu aplicación.

### 1. Configura el Datadog Agent {#1-configure-the-datadog-agent}

Habilita [DogStatsD para el Datadog Agent][2]. Por defecto, el Datadog Agent está configurado para ingerir métricas con UDP a través del puerto `8125`.

{{% collapse-content title="Configuración específica del contenedor" level="h4" expanded=false %}}

Al ejecutar el Datadog Agent en entornos contenedorizados, se requiere configuración adicional:

1. Verifica que el tráfico no local de DogStatsD esté habilitado. Esta configuración está habilitada por defecto. Si anteriormente lo has deshabilitado, configura `dogstatsd_non_local_traffic: true` en tu archivo principal de configuración [`datadog.yaml`][8], o establece la [variable de entorno][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. Sigue estas instrucciones de configuración específicas del contenedor:

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,gov2,ap1,ap2" >}}

3. Establece `DD_SITE` en el Datadog Agent para {{< region-param key="dd_site" code="true" >}} para garantizar que el Datadog Agent envíe datos a la ubicación correcta de Datadog.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. Configura tu aplicación {#2-configure-your-application}

Configura las métricas de tiempo de ejecución en tu aplicación utilizando variables de entorno. Algunos lenguajes también permiten configurar métricas de tiempo de ejecución [directamente en el código](#code-based-configuration).

#### Variables de entorno {#environment-variables}

Utiliza las siguientes variables de entorno para configurar métricas de tiempo de ejecución en tu aplicación:

`DD_RUNTIME_METRICS_ENABLED`
: **Predeterminado**: `true` para Java y .NET 6+ (v3.40.0+), `false` para todos los demás lenguajes y entornos de ejecución. <br>
**Descripción**: Habilita la recopilación de métricas de tiempo de ejecución. Las métricas se envían al Datadog Agent, según lo configurado para la aplicación instrumentada.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Predeterminado**: `true` para Java, `false` para Node.js, Ruby y Python. No existe para .NET y Go; el `runtime_id` siempre se informa. <br>
**Descripción**: Habilita métricas de tiempo de ejecución mejoradas, proporcionando una `runtime_id` etiqueta junto con cada métrica. La `runtime_id` representa el identificador de proceso de la aplicación y te permite correlacionar directamente las métricas de tiempo de ejecución con aplicaciones individuales en ejecución. 

`DD_AGENT_HOST`
: **Predeterminado**: `localhost` <br>
**Descripción**: Establece la dirección del servidor para el envío de métricas del SDK. Puede ser un nombre de servidor o una dirección IP.

`DD_DOGSTATSD_PORT`
: **Predeterminado**: `8125` <br>
**Descripción**: Establece el puerto para el envío de métricas del SDK.

`DD_RUNTIME_METRICS_DIAGNOSTICS_METRICS_API_ENABLED`
: **Predeterminado**: `true` iniciando el rastreador v3.40.0+ en .NET 8+ y (.NET 6/7 cuando `DD_RUNTIME_METRICS_ENABLED` no está configurado explícitamente), de lo contrario `false`. <br>
**Descripción**: Disponible a partir de .NET 6. Controla si el rastreador de .NET utiliza la nueva API de [`System.Diagnostics.Metrics`][9] para recopilar las métricas en lugar del colector basado en `EventListener`.

#### Configuración basada en código {#code-based-configuration}

Además de las variables de entorno, algunos lenguajes permiten configurar métricas de tiempo de ejecución directamente en el código.

{{< tabs >}}
{{% tab "Java" %}}

Solo puedes habilitar métricas de tiempo de ejecución con [variables de entorno](#environment-variables).

Sin embargo, puedes ampliar las métricas recopiladas agregando métricas JMX personalizadas. Para más información, consulta la documentación de [Integración JMX][100].

[100]: /es/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

Puedes habilitar métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-danger">Esto solo se aplica si no estás utilizando <code>ddtrace-run</code></div>
{{% /tab %}}

{{% tab "Ruby" %}}

Puedes habilitar métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'datadog' # Use 'ddtrace' if you're using v1.x

Datadog.configure do |c|
  c.runtime_metrics.enabled = true

  # Optionally, you can configure the DogStatsD instance used for sending runtime metrics.
  # DogStatsD is automatically configured with default settings if `dogstatsd-ruby` is available.
  # You can configure with host and port of Datadog agent; defaults to 'localhost:8125'.
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```
{{% /tab %}}

{{% tab "Go" %}}

Puedes habilitar métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

La opción `WithDogstatsdAddr` te permite especificar una dirección personalizada para el servidor DogStatsD. Utiliza la opción [`WithDogstatsdAddr`][101] (o [`WithDogstatsdAddress` v1][100]) si tu dirección difiere de la predeterminada `localhost:8125`. (Disponible para 1.18.0+)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

Puedes habilitar métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

Solo puedes habilitar métricas de tiempo de ejecución con [variables de entorno](#environment-variables).

{{% /tab %}}
{{< /tabs >}}

## Tableros {#dashboards}

Una vez que la configuración esté completa, puedes ver las métricas de tiempo de ejecución en:

- La página de detalles del servicio instrumentado
- La gráfica de llamas, pestaña **Métricas**
- Tableros de tiempo de ejecución predeterminados

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="Traza de tiempo de ejecución de JVM" >}}

## Solución de problemas {#troubleshooting}
- Para asociar métricas de tiempo de ejecución dentro de flame graphs, asegúrese de que la etiqueta `env` (sensible a mayúsculas) esté configurada y coincida en su entorno.
- Para que las métricas de tiempo de ejecución aparezcan en la página del servicio al usar Fargate, asegúrese de que `DD_DOGSTATSD_TAGS` esté configurado en su tarea de Agent, y que la etiqueta `env` configurada coincida con el `env` del servicio instrumentado.

## Datos recopilados {#data-collected}

Cada lenguaje soportado recopila un conjunto de métricas de tiempo de ejecución que proporcionan información sobre el uso de memoria, la recolección de basura, la utilización de CPU y otros indicadores de rendimiento.

{{< tabs >}}
{{< tab "Java" >}}
{{< get-metrics-from-git "java" >}}
{{< /tab >}}

{{< tab "Python" >}}
{{< get-metrics-from-git "python" >}}
{{< /tab >}}

{{< tab "Ruby" >}}
{{< get-metrics-from-git "ruby" >}}
{{< /tab >}}

{{< tab "Go" >}}
{{< get-metrics-from-git "go" >}}
{{< /tab >}}

{{< tab "Node.js" >}}
{{< get-metrics-from-git "node" >}}
{{< /tab >}}

{{< tab ".NET" >}}
{{< get-metrics-from-git "dotnet" >}}
{{< /tab >}}
{{< /tabs >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/extend/dogstatsd/#setup
[3]: /es/agent/docker/#dogstatsd-custom-metrics
[7]: /es/extend/dogstatsd/unix_socket/
[8]: /es/agent/configuration/agent-configuration-files/#main-configuration-file
[9]: https://learn.microsoft.com/dotnet/api/system.diagnostics.metrics
[10]: /es/opentelemetry/integrations/runtime_metrics/