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
description: Obtenga información adicional sobre el rendimiento de una aplicación
  con las métricas de tiempo de ejecución asociadas a sus trazas.
further_reading:
- link: /opentelemetry/integrations/runtime_metrics/
  tag: Documentación
  text: Métricas de tiempo de ejecución de OpenTelemetry
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Correlacione sus registros y trazas
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumente manualmente su aplicación para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
title: Runtime Metrics
---
## Descripción general {#overview}

Las métricas de tiempo de ejecución monitorean el uso de memoria, la recolección de basura y la paralelización de su aplicación. Los SDK de Datadog recopilan automáticamente estas métricas para los entornos compatibles.

Estas métricas le ayudan a identificar cuellos de botella, solucionar problemas de rendimiento y optimizar la utilización de recursos. Al ver las métricas de tiempo de ejecución junto con las trazas y los registros, obtiene una visibilidad integral de la salud y el rendimiento de su aplicación.

Para las métricas de tiempo de ejecución recopiladas por los SDK de OpenTelemetry de origen, consulte [Métricas de tiempo de ejecución de OpenTelemetry][10] para obtener instrucciones de configuración.

## Compatibilidad {#compatibility}

Las métricas de tiempo de ejecución están disponibles para varios lenguajes de programación y entornos de ejecución, con distintos niveles de soporte y opciones de configuración. 

{{< tabs >}}
{{% tab "Java" %}}

- **Habilitado de forma predeterminada**: Sí
- **Versión de la biblioteca**: 0.29.0+
- **Entornos de ejecución**: Java 8+

<div class="alert alert-danger">La recopilación de métricas JMX no se admite en entornos de AWS Lambda.</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **Habilitado de forma predeterminada**: No
  - **Versión de la biblioteca**: 0.30.0+
  - **Nivel de soporte**: Vista previa
  - **Entornos de ejecución**: Todas las versiones de Python compatibles

{{% /tab %}}

{{% tab "Ruby" %}}

  - **Habilitado de forma predeterminada**: No
  - **Versión de la biblioteca**: 0.44.0+
  - **Entornos de ejecución**: Todas las versiones de Ruby compatibles


<div class="alert alert-info">Debe agregar la gema <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> a su aplicación.</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **Habilitado de forma predeterminada**: No
  - **Versión de la biblioteca**: 1.18.0+
  - **Entornos de ejecución**: Todas las versiones de Go compatibles

{{% /tab %}}

{{% tab "Node.js" %}}

  - **Habilitado de forma predeterminada**: No
  - **Versión de la biblioteca**: 3.0.0+
  - **Entornos de ejecución**: Todas las versiones de Node.js compatibles

{{% /tab %}}

{{% tab ".NET" %}}

  - **Habilitado de forma predeterminada**: Sí, en .NET 6+ (v3.40.0+).
  - **Versión de la biblioteca**: 1.23.0+
  - **Entornos de ejecución**: .NET Framework 4.6.1+ y .NET Core 3.1+ (incluidos .NET 5 y versiones posteriores).

#### Permisos para Internet Information Services (IIS) (solo .NET Framework) {#permissions-for-internet-information-services-iis-net-framework-only}

En .NET Framework, las métricas se recopilan mediante contadores de rendimiento. Los usuarios en sesiones de inicio de sesión no interactivas (lo que incluye cuentas de grupos de aplicaciones de IIS y algunas cuentas de servicio) deben agregarse al grupo {{< ui >}}Performance Monitoring Users{{< /ui >}} para acceder a los datos de los contadores.

Los grupos de aplicaciones de IIS utilizan cuentas especiales que no aparecen en la lista de usuarios. Para agregarlos al grupo Performance Monitoring Users, busque `IIS APPPOOL\<name of the pool>`. Por ejemplo, el usuario para DefaultAppPool sería `IIS APPPOOL\DefaultAppPool`.

Esto se puede hacer desde la interfaz de usuario de "Computer Management" o desde un símbolo del sistema de administrador:

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

Las siguientes instrucciones exportan métricas de tiempo de ejecución a través de DogStatsD. Para la exportación OTLP, consulte [Exportar métricas de tiempo de ejecución a través de OTLP][12].

Para configurar las métricas de tiempo de ejecución, necesita configurar tanto el Datadog Agent como su aplicación.

### 1. Configure el Datadog Agent {#1-configure-the-datadog-agent}

Habilite [DogStatsD para el Agent][2]. De forma predeterminada, el Datadog Agent está configurado para ingerir métricas con UDP a través del puerto `8125`.

{{% collapse-content title="Configuración específica del contenedor" level="h4" expanded=false %}}

Cuando ejecute el Agent en entornos en contenedores, se requiere configuración adicional:

1. Verifique que el tráfico no local de DogStatsD esté habilitado. Esta configuración está habilitada de forma predeterminada. Si la ha deshabilitado previamente, establezca `dogstatsd_non_local_traffic: true` en su [`datadog.yaml` archivo de configuración principal][8], o establezca la [variable de entorno][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. Siga estas instrucciones de configuración específicas del contenedor:

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,gov2,ap1,ap2,uk1" >}}

3. Establezca `DD_SITE` en el Datadog Agent con el valor {{< region-param key="dd_site" code="true" >}} para asegurarse de que el Agent envíe datos a la ubicación correcta de Datadog.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. Configure su aplicación {#2-configure-your-application}

Configure las métricas de tiempo de ejecución en su aplicación usando variables de entorno. Algunos lenguajes también admiten la configuración de métricas de tiempo de ejecución [directamente en el código](#code-based-configuration).

#### Variables de entorno {#environment-variables}

Utilice las siguientes variables de entorno para configurar las métricas de tiempo de ejecución en su aplicación:

`DD_RUNTIME_METRICS_ENABLED`
: **Predeterminado**: `true` para Java y .NET 6+ (v3.40.0+), `false` para todos los demás lenguajes y entornos de ejecución. <br>
**Descripción**: Habilita la recopilación de métricas de tiempo de ejecución. Las métricas se envían al Datadog Agent, según la configuración de la aplicación instrumentada.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Predeterminado**: `true` para Java, `false` para Node.js, Ruby y Python. No existe para .NET y Go; el `runtime_id` siempre se reporta. <br>
**Descripción**: Habilita métricas de tiempo de ejecución mejoradas, proporcionando una etiqueta `runtime_id` junto con cada métrica. El `runtime_id` representa el identificador de proceso de la aplicación y le permite correlacionar directamente las métricas de tiempo de ejecución con las aplicaciones en ejecución individuales. 

`DD_AGENT_HOST`
: **Predeterminado**: `localhost` <br>
**Descripción**: Establece la dirección del servidor para el envío de métricas del SDK. Puede ser un nombre de servidor o una dirección IP.

`DD_DOGSTATSD_PORT`
: **Predeterminado**: `8125` <br>
**Descripción**: Establece el puerto para el envío de métricas del SDK.

`DD_RUNTIME_METRICS_DIAGNOSTICS_METRICS_API_ENABLED`
: **Predeterminado**: `true` a partir de la versión v3.40.0+ del trazador en .NET 8+ y en .NET 6/7 cuando `DD_RUNTIME_METRICS_ENABLED` no está configurado explícitamente; de lo contrario, `false`. <br>
**Descripción**: Disponible a partir de .NET 6. Controla si el trazador de .NET utiliza la nueva API [`System.Diagnostics.Metrics`][9] para recopilar las métricas en lugar del recopilador basado en `EventListener`.

#### Configuración basada en código {#code-based-configuration}

Además de las variables de entorno, algunos lenguajes admiten la configuración de métricas de tiempo de ejecución directamente en el código.

{{< tabs >}}
{{% tab "Java" %}}

Solo puede habilitar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables).

Sin embargo, puede ampliar las métricas recopiladas añadiendo métricas JMX personalizadas. Para obtener más información, consulte la documentación de [JMX Integration][100].

[100]: /es/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

Puede habilitar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en el código:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-danger">Esto solo se aplica si no está utilizando <code>ddtrace-run</code></div>
{{% /tab %}}

{{% tab "Ruby" %}}

Puede habilitar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en el código:

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

Puede habilitar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en el código:

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

La opción `WithDogstatsdAddr` le permite especificar una dirección personalizada para el servidor DogStatsD. Utilice la opción [`WithDogstatsdAddr`][101] (o [`WithDogstatsdAddress` v1][100]) si su dirección difiere de la `localhost:8125` predeterminada. (Disponible para 1.18.0+)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

Puede habilitar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en el código:

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

Solo puede habilitar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables).

{{% /tab %}}
{{< /tabs >}}

## Exportar métricas de tiempo de ejecución mediante OTLP {#export-runtime-metrics-over-otlp}

Utilice uno de los siguientes SDK de DDOT para exportar métricas de tiempo de ejecución mediante OTLP:

| SDK | Versión mínima del SDK | Requisito de tiempo de ejecución |
|-----|---------------------|---------------------|
| Java | v1.63.0 | Java 8+ |
| .NET | v3.44.0 | .NET 6+ |
| Node.js | v5.107.0 | Una versión de Node.js compatible con el SDK |
| Go | v2.10.0 | Una versión de Go compatible con el SDK |

Para conocer las variables de entorno y la configuración del punto de conexión, consulte [Exportar métricas de tiempo de ejecución mediante OTLP][11].

## Dashboards {#dashboards}

Una vez completada la configuración, puede ver las métricas de tiempo de ejecución en:

- La página de detalles del servicio instrumentado
- La pestaña {{< ui >}}Metrics{{< /ui >}} de gráfico de flama
- Paneles predeterminados de tiempo de ejecución

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="JVM Runtime Trace" >}}

## Solución de problemas {#troubleshooting}
- Para asociar métricas de tiempo de ejecución dentro de los gráficos de flama, asegúrese de que la etiqueta `env` (que distingue entre mayúsculas y minúsculas) esté configurada y coincida en todo su entorno.
- Para que las métricas de tiempo de ejecución aparezcan en la página del servicio al usar Fargate, asegúrese de que `DD_DOGSTATSD_TAGS` esté configurado en su tarea de Agent y que la etiqueta `env` configurada coincida con el `env` del servicio instrumentado.

## Datos recopilados {#data-collected}

Cada lenguaje compatible recopila un conjunto de métricas de tiempo de ejecución que proporcionan información sobre el uso de memoria, la recolección de basura, la utilización de CPU y otros indicadores de rendimiento.

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/extend/dogstatsd/#setup
[3]: /es/agent/docker/#dogstatsd-custom-metrics
[7]: /es/extend/dogstatsd/unix_socket/
[8]: /es/agent/configuration/agent-configuration-files/#main-configuration-file
[9]: https://learn.microsoft.com/dotnet/api/system.diagnostics.metrics
[10]: /es/opentelemetry/integrations/runtime_metrics/
[11]: /es/opentelemetry/config/environment_variable_support/#export-runtime-metrics-over-otlp
[12]: #export-runtime-metrics-over-otlp