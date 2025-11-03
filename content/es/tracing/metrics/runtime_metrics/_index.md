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
  las métricas de tiempo de ejecución asociadas a tus trazas (traces).
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Correlacionar logs y trazas
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumenta tu aplicación de forma manual para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
title: Métricas de tiempo de ejecución
---

## Información general

Las métricas de tiempo de ejecución monitorizan el uso de memoria, la recolección de basura y la paralelización de tu aplicación. Las bibliotecas de rastreo de Datadog recopilan automáticamente estas métricas de entornos compatibles y las envían al Agent.

Estas métricas te permiten identificar cuellos de botella, solucionar problemas de rendimiento y optimizar el uso de los recursos. Al consultar las métricas de tiempo de ejecución junto con las trazas y los logs, obtendrás una visibilidad completa del estado y el rendimiento de tu aplicación.

## Compatibilidad

Las métricas de tiempo de ejecución están disponibles para varios lenguajes de programación y tiempos de ejecución, con distintos niveles de compatibilidad y opciones de configuración.

{{< tabs >}}
{{% tab "Java" %}}

- **Activado por defecto**: Sí
- **Versión de la librería**: 0.29.0 o posterior
- **Tiempos de ejecución**: Java 8 o posterior

<div class="alert alert-danger">La recopilación de métricas de JMX no es compatible con los entornos AWS Lambda.</div>

{{% /tab %}}

{{% tab "Python" %}}

  - **Activado por defecto**: No
  - **Versión de la librería**: 0.30.0 o posterior
  - **Nivel de compatibilidad**: Vista previa
  - **Tiempos de ejecución**: Todas las versiones de Python compatibles

{{% /tab %}}

{{% tab "Ruby" %}}

  - **Activado por defecto**: No
  - **Versión de la librería**: 0.44.0 o posterior
  - **Tiempos de ejecución**: Todas las versiones de Ruby compatibles


<div class="alert alert-info">Debes añadir la gema <a href="https://rubygems.org/gems/dogstatsd-ruby">dogstatsd-ruby</a> a tu aplicación.</div>

{{% /tab %}}

{{% tab "Go" %}}

  - **Activado por defecto**: No
  - **Versión de la librería**: 1.18.0 o posterior
  - **Tiempos de ejecución**: Todas las versiones de Go compatibles

{{% /tab %}}

{{% tab "Node.js" %}}

  - **Activado por defecto**: No
  - **Versión de la librería**: 3.0.0 o posterior
  - **Tiempos de ejecución**: Todas las versiones de Node.js compatibles

{{% /tab %}}

{{% tab ".NET" %}}

  - **Activado por defecto**: No
  - **Versión de la librería**: 1.23.0 o posterior
  - **Tiempos de ejecución**: .NET Framework 4.6.1 o posterior y .NET Core 3.1 o posterior (incluyendo .NET 5 y posteriores).

#### Permisos para Internet Information Services (IIS)

En .NET Framework, las métricas se recopilan mediante contadores de rendimiento. Los usuarios en sesiones de inicio de sesión no interactivas (que incluyen cuentas de grupos de aplicaciones IIS y algunas cuentas de servicio) deben añadirse al grupo **Usuarios de monitorización de rendimiento** para acceder a los datos del contador.

Los grupos de aplicaciones IIS utilizan cuentas especiales que no aparecen en lista de usuarios. Para añadirlas al grupo de usuarios de monitorización de rendimiento, busca `IIS APPPOOL\<name of the pool>`. Por ejemplo, el usuario para el DefaultAppPool sería `IIS APPPOOL\DefaultAppPool`.

Puedes hacer esto desde la interfaz de usuario "Gestión de ordenadores" o desde una acción de comando del administrador:

```shell
net localgroup "Performance Monitor Users" "IIS APPPOOL\DefaultAppPool" /add
```

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-danger">No se admiten métricas en tiempo de ejecución para PHP.</div>

{{% /tab %}}
{{% tab "C++" %}}

<div class="alert alert-danger">No se admiten métricas en tiempo de ejecución para C++.</div>

{{% /tab %}}
{{< /tabs >}}

## Instrucciones de instalación

Para configurar las métricas en tiempo de ejecución, debes configurar tanto el Datadog Agent como tu aplicación.

### 1. Configurar el Datadog Agent

Habilita [DogStatsD para el Agent][2]. Por defecto, el Datadog Agent está configurado para ingerir métricas con UDP a través del puerto `8125`.

{{% collapse-content title="Configuración específica de contenedor" level="h4" expanded=false %}}

Cuando el Agent se ejecuta en entornos de contenedores, es necesaria una configuración adicional:

1. Define `dogstatsd_non_local_traffic: true` en tu [archivo de configuración principal`datadog.yaml`][8], o define la [variable de entorno][3] `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true`.
2. Sigue estas instrucciones de configuración específica de contenedor:

{{< partial name="apm/apm-runtime-metrics-containers.html" >}}

<br>

{{< site-region region="us3,us5,eu,gov,ap1,ap2" >}}

3. Define `DD_SITE` en el Datadog Agent como {{< region-param key="dd_site" code="true" >}} para asegurarte de que el Agent envía los datos a la localización Datadog correcta.

{{< /site-region >}}

{{% /collapse-content %}}

### 2. Configurar la aplicación

Configura las métricas de tiempo de ejecución en tu aplicación utilizando variables de entorno. Algunos lenguajes también permiten configurar métricas de tiempo de ejecución [directamente en el código](#code-based-configuration).

#### Variables de entorno

Utiliza las siguientes variables de entorno para configurar métricas de tiempo de ejecución en tu aplicación:

`DD_RUNTIME_METRICS_ENABLED`
: **Por defecto**: `true` para Java, `false` para todos los demás lenguajes <br>
**Descripción**: Activa la recopilación de métricas de tiempo de ejecución. Las métricas se envían al Datadog Agent, según lo configurado para la aplicación instrumentada.

`DD_RUNTIME_METRICS_RUNTIME_ID_ENABLED`
: **Por defecto**: `true` para Java, `false` para Node.js, Ruby y Python. No existe para .NET y Go. Siempre se indica `runtime_id`. <br>
**Descripción**: Habilita métricas en tiempo de ejecución mejoradas, proporcionando una etiqueta (tag) `runtime_id` junto con cada métrica. `runtime_id` representa el identificador de procesos de la aplicación y te permite correlacionar directamente las métricas de tiempo de ejecución con aplicaciones individuales en ejecución.

`DD_AGENT_HOST`
: **Por defecto**: `localhost` <br>
**Descripción**: Define la dirección del host para el envío de métricas de la librería de rastreo. Puede ser un nombre de host o una dirección IP.

`DD_DOGSTATSD_PORT`
: **Por defecto**: `8125` <br>
**Descripción**: Define el puerto para el envío de métricas de la librería de rastreo.

#### Configuración basada en códigos

Además de las variables de entorno, algunos lenguajes permiten configurar métricas de tiempo de ejecución directamente en el código.

{{< tabs >}}
{{% tab "Java" %}}

Sólo puedes activar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables).

Sin embargo, puedes ampliar las métricas recopiladas añadiendo métricas JMX personalizadas. Para obtener más información, consulta la documentación de la [integración JMX][100].

[100]: /es/integrations/java/
{{% /tab %}}

{{% tab "Python" %}}

Puedes activar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

```python
from ddtrace.runtime import RuntimeMetrics
RuntimeMetrics.enable()
```

<div class="alert alert-danger">Esto sólo se aplica si no estás utilizando <code>ddtrace-run</code></div>
{{% /tab %}}

{{% tab "Ruby" %}}

Puedes activar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

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

Puedes activar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

```go
// Basic configuration
tracer.Start(tracer.WithRuntimeMetrics())

// With custom DogStatsD address
tracer.Start(
  tracer.WithRuntimeMetrics(),
  tracer.WithDogstatsdAddr("custom-host:8125")
)
```

La opción `WithDogstatsdAddr` te permite especificar una dirección personalizada para el servidor DogStatsD. Utiliza la opción [`WithDogstatsdAddr`][101] (o [`WithDogstatsdAddress` v1][100]), si tu dirección difiere de la predeterminada `localhost:8125`. (Disponible para la v1.18.0 o posterior)

[100]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithDogstatsdAddress
[101]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#WithDogstatsdAddr
{{% /tab %}}

{{% tab "Node.js" %}}

Puedes activar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables) o en código:

```js
const tracer = require('dd-trace').init({
  // Other tracer options...
  runtimeMetrics: true
})
```
{{% /tab %}}

{{% tab ".NET" %}}

Sólo puedes activar las métricas de tiempo de ejecución con [variables de entorno](#environment-variables).

{{% /tab %}}
{{< /tabs >}}

## Dashboards

Una vez finalizada la configuración, puedes ver las métricas de tiempo de ejecución en:

- Página con información del servicio instrumentado
- Pestaña **Métricas** del gráfico de llama
- Dashboards de tiempo de ejecución por defecto

{{< img src="tracing/runtime_metrics/jvm_runtime_trace.png" alt="Traza de tiempo de ejecución de JVM" >}}

## Solucionar problemas
- Para asociar métricas de tiempo de ejecución dentro de los gráficos de llama, asegúrate de que la etiqueta `env` (que distingue entre mayúsculas y minúsculas) está configurada y coincide en todo tu entorno.
- Para que las métricas de tiempo de ejecución aparezcan en la página del servicio al utilizar Fargate, asegúrate de que `DD_DOGSTATSD_TAGS` está configurado en la tarea de tu Agent y que la etiqueta `env` configurada coincide con la `env` del servicio instrumentado.

## Datos recopilados

Cada lenguaje compatible recopila un conjunto de métricas de tiempo de ejecución que proporcionan información sobre el uso de la memoria, la recolección de basura, el uso de la CPU y otros indicadores de rendimiento.

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/developers/dogstatsd/#setup
[3]: /es/agent/docker/#dogstatsd-custom-metrics
[7]: /es/developers/dogstatsd/unix_socket/
[8]: /es/agent/configuration/agent-configuration-files/#main-configuration-file
