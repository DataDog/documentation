---
description: Información general sobre los mecanismos del trazador y Agent que controlan
  la ingesta de trazas (traces).
further_reading:
- link: /tracing/trace_ingestion/ingestion_controls/
  tag: Documentación
  text: Controles de ingesta
- link: /tracing/trace_retention/
  tag: Documentación
  text: Retención de trazas
- link: /tracing/trace_ingestion/usage_metrics/
  tag: Documentación
  text: Métricas de uso
kind: documentación
title: Mecanismos de ingesta
---

Son varios los mecanismos responsables de decidir si los tramos (spans) generados por tus aplicaciones se envían a Datadog (_tramos ingeridos_). Estos mecanismos están presentes en las [bibliotecas de trazado][1] y en Datadog Agent. Dependiendo de la configuración, el tráfico generado por los servicios instrumentados puede ingerirse tanto de forma total como parcial.

A cada tramo ingerido, se le adjunta un **motivo de ingesta** único en referencia a uno de los mecanismos que se describen en esta página. [Métricas de uso][2] `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` tienen la etiqueta `ingestion_reason`.

Usa el [dashboard Motivos de ingesta][3] para investigar todos los motivos de ingesta en contexto. Obtén información general sobre el volumen atribuido a cada mecanismo para identificar rápidamente las opciones de configuración pertinentes.

## Head-based sampling (muestreo basado en la fase inicial)

El mecanismo de muestreo que se usa de forma predeterminada se denomina _head-based sampling (muestreo basado en la fase inicial)_. La decisión sobre si se conserva o se descarta la traza se toma en el momento preciso en el que esta comienza, al inicio del [tramo raíz][4]. Luego, se propaga la decisión a los demás servicios como parte del contexto de solicitud, por ejemplo, como un encabezado de solicitud HTTP.

Como la decisión se toma al comienzo de la traza y, luego, se transmite a todas las partes de la misma, existe la garantía de que la traza se conservará o descartará en su totalidad.

En lo que se refiere al head-based sampling (muestreo basado en la fase inicial), la frecuencia del muestreo puede configurarse en dos lugares:
- En **[Agent](#in-the-agent)** (predeterminado)
- En la **[biblioteca de trazado](#in-tracing-libraries-user-defined-rules)**: los mecanismos de la biblioteca de trazado anulan la configuración de Agent.

### En Agent
`ingestion_reason: auto`

Datadog Agent envía las frecuencias de muestreo de forma continua a las bibliotecas de trazado para aplicarlas a la raíz de las trazas. Agent ajusta las frecuencias para alcanzar el objetivo general de diez trazas por segundo, las cuales se distribuyen entre los servicios en función del tráfico.

Pongamos un ejemplo: si el servicio `A` tiene más tráfico que el servicio `B`, Agent podría modificar la frecuencia de muestreo de `A` para que `A` no conserve más de siete trazas por segundo y modificar la frecuencia de muestreo de `B` para que `B` no conserve más de tres trazas por segundo. De este modo, se obtendría igualmente un total de 10 trazas por segundo.

Define la cantidad de trazas por segundo objetivo de Agent en su archivo de configuración principal (`datadog.yaml`) o a modo de variable de entorno:
```
@param max_traces_per_second - integer - optional - default: 10
@env DD_APM_MAX_TPS - integer - optional - default: 10
```

**Nota**: La frecuencia de muestreo de trazas por segundo que se define en Agent solo se aplica a las bibliotecas de trazado de Datadog. Es decir, no influye en las demás bibliotecas de trazado, como los kits de desarrollo de software (SDK) de OpenTelemetry.

Todos los tramos de una traza muestreada con las [frecuencias de muestreo calculadas automáticamente](#in-the-agent) de Datadog Agent tienen la etiqueta con el motivo de ingesta `auto`. En las [métricas de uso][2], también se configura la etiqueta `ingestion_reason`. Los servicios que usan el mecanismo predeterminado de Datadog Agent se califican como `Automatic` en la columna Configuración de la [página Controles de ingesta][5] 

### En las bibliotecas de trazado: reglas definidas por el usuario
`ingestion_reason: rule`

Para llevar a cabo un control más exhaustivo, usa las opciones de configuración de muestreo de la biblioteca de trazado:
- Configura una **frecuencia de muestreo específica para todos los servicios raíz** de la biblioteca. Ten en cuenta que esto anulará el [mecanismo predeterminado](#in-the-agent) de Agent.
- Configura una **frecuencia de muestreo para determinados servicios raíz** o para determinados nombres de operaciones de tramos.
- Configura un **límite de frecuencia** para restringir el número de trazas ingeridas por segundo. El límite de frecuencia predeterminado es de 100 trazas por segundo e instancia de servicio. (Cuando se usa el [mecanismo predeterminado](#in-the-agent) de Agent, se omite el limitador de frecuencia).

**Nota**: Estas reglas también actúan como controles de head-based sampling (muestreo basado en la fase inicial). Si el tráfico de un servicio supera el número máximo de trazas por segundo configurado, las trazas se descartarán en la raíz o fase inicial. En ningún caso se crearán trazas incompletas.

La configuración puede definirse en función de las variables de entorno o directamente en el código:

{{< tabs >}}
{{% tab "Java" %}}
Para las aplicaciones de Java, establece una frecuencia de muestreo general en la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Define las frecuencias de muestreo en función del servicio con la variable de entorno `DD_TRACE_SAMPLING_SERVICE_RULES`.

Por ejemplo, para enviar el 20 % de las trazas del servicio llamado `my-service`:

```
# usando la propiedad del sistema
java -Ddd.trace.sampling.service.rules=my-service:0.2 -javaagent:dd-java-agent.jar -jar my-app.jar

# usando variables de entorno
export DD_TRACE_SAMPLING_SERVICE_RULES=my-service:0.2
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo e instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de trazado de Java][1].

[1]: /es/tracing/setup_overview/setup/java
{{% /tab %}}
{{% tab "Python" %}}
Para las aplicaciones de Python, establece una frecuencia de muestreo general en la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Define las frecuencias de muestreo en función del servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de trazas:

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": "my-service", "sample_rate": 0.5}]
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo e instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de trazado de Python][1].

[1]: /es/tracing/setup_overview/setup/python
{{% /tab %}}
{{% tab "Ruby" %}}
Para las aplicaciones de Ruby, establece una frecuencia de muestreo general en la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`.

También puedes configurar las frecuencias de muestreo en función del servicio. Por ejemplo, para enviar el 20 % de las trazas del servicio llamado `my-service`:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.sampler = Datadog::Tracing::Sampling::PrioritySampler.new(
    post_sampler: Datadog::Tracing::Sampling::RuleSampler.new(
      [
        # Muestrear todas las trazas 'my-service' al 20,00 %:
        Datadog::Tracing::Sampling::SimpleRule.new(service: 'my-service', sample_rate: 0.2000)
      ]
    )
  )
end
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo e instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de trazado de Ruby][1].

[1]: /es/tracing/setup_overview/setup/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
Para las aplicaciones de Go, establece una frecuencia de muestreo general en la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Define las frecuencias de muestreo en función del servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de trazas:

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo e instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de trazado de Go][1].

[1]: /es/tracing/setup_overview/setup/go
{{% /tab %}}
{{% tab "NodeJS" %}}
Para las aplicaciones de Node.js, establece una frecuencia de muestreo general en la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`.

También puedes configurar las frecuencias de muestreo en función del servicio. Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de trazas:

```javascript
tracer.init({
  ingestion:
    sampler: {
      sampleRate: 0.1,
      rules: [
        { sampleRate: 0.5, service: 'my-service' }
      ]
    }
  }
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo e instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de trazado de NodeJS][1].

[1]: /es/tracing/setup_overview/setup/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
Para las aplicaciones de PHP, establece una frecuencia de muestreo general en la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Define las frecuencias de muestreo en función del servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de trazas:

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de trazado de PHP][1].

[1]: /es/tracing/setup_overview/setup/php
{{% /tab %}}
{{% tab "C++" %}}
De la versión `1.3.2` en adelante, la biblioteca C++ de Datadog admite las siguientes configuraciones:
- Frecuencia de muestreo general: variable de entorno `DD_TRACE_SAMPLE_RATE`
- Frecuencias de muestreo en función del servicio: variable de entorno `DD_TRACE_SAMPLING_RULES`.
- Configuración del límite de frecuencia: variable de entorno `DD_TRACE_RATE_LIMIT`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de trazas:

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

C++ no ofrece integraciones para llevar a cabo una instrumentación predefinida, pero se usa para trazar proxies como Envoy, Nginx o Istio. Obtén más información sobre cómo configurar el muestreo de proxies en [Trazar proxies][1].

[1]: /es/tracing/setup_overview/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Para las aplicaciones de .NET, establece una frecuencia de muestreo general en la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Define las frecuencias de muestreo en función del servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de trazas:

```
@env DD_TRACE_SAMPLE_RATE=0.1
@env DD_TRACE_SAMPLING_RULES=[{"service": `my-service`, "sample_rate": 0.5}]
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo e instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de trazado de .NET][1].

[1]: /es/tracing/setup_overview/setup/dotnet-core
{{% /tab %}}
{{< /tabs >}}

**Nota**: Todos los tramos de una traza muestreada con la configuración de una biblioteca de trazado están etiquetados con el motivo de ingesta `rule`. Los servicios configurados con reglas de muestreo definidas por el usuario aparecen con la marca `Configured` en la columna Configuración de la [página de Controles de ingesta][5].

## Trazas con errores o poco frecuentes

Para la conservación e ingesta de las trazas de naturaleza crítica o diversa que el head-based sampling (muestreo basado en la fase inicial) no consiga capturar, existen dos mecanismos de muestreo adicionales de Datadog Agent. Estos dos muestreadores pueden conservar un conjunto diverso de trazas locales (o tramos del mismo host) mediante la captura de todas las combinaciones de conjuntos de etiquetas predeterminados:

- **Trazas con errores**: Es importante muestrear los errores, dado que así se pueden observar los potenciales fallos del sistema.
- **Trazas poco frecuentes**: Muestrear las trazas poco frecuentes te permite mantener la visibilidad sobre la totalidad del sistema, puesto que te aseguras de que los servicios y recursos con poco tráfico se sigan monitorizando.

**Nota**: Los muestreadores de trazas con errores o poco frecuentes se omitirán en los servicios en los que hayas configurado [reglas de muestreo en bibliotecas](#in-tracing-libraries-user-defined-rules).

### Trazas con errores
`ingestion_reason: error`

El muestreador de trazas con errores captura fragmentos de trazas que contienen tramos con errores no detectados por el head-based sampling (muestreo basado en la fase inicial). Puede capturar hasta 10 trazas con errores por segundo (por Agent) y garantiza una visibilidad completa de los errores cuando la frecuencia del head-based sampling es baja.

Con Agent 7.33 y sus versiones posteriores, puedes configurar el muestreador de trazas con errores en el archivo de configuración principal de Agent (`datadog.yaml`) o con las variables de entorno:
```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

**Nota**: Configura el parámetro como `0` para deshabilitar el muestreador de trazas con errores.

**Nota**: El muestreador de trazas con errores captura las trazas locales que presentan tramos con errores en Agent. Si la traza se distribuye, no habrá forma de garantizar el envío de la traza completa a Datadog.


### Trazas poco frecuentes
`ingestion_reason: rare`

El muestreador de trazas poco frecuentes envía un conjunto de tramos poco frecuentes a Datadog. Puede capturar hasta 5 trazas por segundo con combinaciones de `env`, `service`, `name`, `resource`, `error.type` y `http.status` (por Agent). Además, garantiza la visibilidad de los recursos con poco tráfico cuando la frecuencia del head-based sampling (muestreo basado en la fase inicial) es baja.

Con Agent 7.33 y sus versiones posteriores, puedes deshabilitar el muestreador de trazas poco frecuentes en el archivo de configuración principal de Agent (`datadog.yaml`) o con una variable de entorno:

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

**Nota**: El muestreador de trazas poco frecuentes captura las trazas locales en Agent. Si la traza se distribuye, no habrá forma de garantizar el envío de la traza completa a Datadog.

## Forzar la conservación y el descarte
`ingestion_reason: manual`

El mecanismo head-based sampling (muestreo basado en la fase inicial) se puede anular en la biblioteca de trazado. Por ejemplo, si necesitas monitorizar una transacción crítica, puedes forzar la conservación de la traza asociada. Por otro lado, también puedes forzar el descarte de una traza en caso de que contenga información repetitiva o innecesaria, como los checks de estado.

- Define `ManualKeep` en un tramo para indicar que se debe ingerir tanto este tramo como los que dependen de él. La traza resultante podría aparecer incompleta en la IU si el tramo en cuestión no es el tramo raíz de la traza.
```
// in dd-trace-go
span.SetTag(ext.ManualKeep, true)
```
- Define ManualDrop para asegurarte de que **no** se ingiera ningún tramo secundario. De este modo, se omitirán los [muestreadores de trazas con errores y poco frecuentes](#error-and-rare-traces) en Agent.
```
span.SetTag(ext.ManualDrop, true)
```

## Tramos únicos (App Analytics)
`ingestion_reason: analytic`

<div class="alert alert-warning">
El 20 de octubre de 2020, se reemplazó App Analytics por Tracing without Limits., ya que se trata de un mecanismo obsoleto con información de configuración relevante para la versión legacy de App Analytics. En su lugar, usa el <a href="#head-based-sampling">head-based sampling (muestreo basado en la fase inicial)</a> con las nuevas opciones de configuración para disponer de un control total sobre tu ingesta de datos.
</div>

Si tienes que muestrear un tramo en concreto, pero sin necesidad de que toda la traza esté disponible, ten en cuenta que los trazadores permiten configurar una frecuencia de muestreo para un solo tramo. El tramo se ingerirá con la frecuencia configurada, incluso si se ha descartado la traza a la que pertenece.

### En las bibliotecas de trazado

Para usar el mecanismo de análisis, habilítalo con una variable de entorno o en el código. Asimismo, define la frecuencia de muestreo que quieres que se aplique a todos los tramos `analytics_enabled`:

{{< tabs >}}
{{% tab "Variables de entorno" %}}

```
@env  DD_TRACE_ANALYTICS_ENABLED - boolean - optional false
```
{{% /tab %}}
{{% tab "API de código" %}}

```
// en dd-trace-go
// configurar analytics_enabled de forma predeterminada
tracerconfig.WithAnalytics(on bool)
// establecer frecuencia de muestreo sin formato para aplicarla a todos los tramos analytics_enabled
tracerconfig.SetAnalyticsRate(0.4)
```

{{% /tab %}}
{{< /tabs >}}

Etiqueta todos los tramos con `analytics_enabled:true`. Asimismo, especifica la frecuencia de muestreo que quieres asociar al tramo:
```
// en dd-trace-go
// crear un tramo analytics_enabled
span.SetTag(ext.AnalyticsEvent, true)
// crear un tramo analytics_enabled con una frecuencia de 0,5
s := tracer.StartSpan("redis.cmd", AnalyticsRate(0.5))
```

### En Agent

En Agent, se configura un limitador de frecuencia adicional de 200 tramos por segundo. Si se alcanza el límite, se descartarán algunos tramos, por lo que estos no se transferirán a Datadog.

Define la frecuencia en el archivo de configuración principal de Agent (`datadog.yaml`) o a modo de variable de entorno:
```
@param max_events_per_second - integer - optional 200
@env DD_APM_MAX_EPS - integer - optional 200
```

## Tramos ingeridos por productos

### Trazas de RUM
`ingestion_reason:rum`

Una solicitud de una aplicación web o móvil genera una traza cuando se instrumentan los servicios backend. [La integración de APM con Real User Monitoring (RUM)][6] vincula las solicitudes de aplicaciones web y móviles con sus correspondientes trazas backend para que puedas ver todos los datos frontend y backend en un solo lugar.

Con el SKD del navegador RUM `4.10.0` y sus versiones posteriores, puedes configurar el parámetro de inicialización `tracingSampleRate` para controlar los volúmenes ingeridos y conservar un muestreo de las trazas backend. Define `tracingSampleRate` con un número entre `0` y `100`.
Si no se define ningún valor `tracingSampleRate`, se enviará a Datadog de forma predeterminada el 100 % de las trazas procedentes de las solicitudes del navegador.

De un modo similar, controla la frecuencia de muestreo de trazas en otros SDK usando parámetros parecidos:

| SDK         | Parámetro             | Versión válida más antigua   |
|-------------|-----------------------|-------------------|
| Navegador     | `tracingSampleRate`   | [v4.10.0][7]      |
| iOS         | `tracingSamplingRate` | [1.11.0][8]       |
| Android     | `traceSamplingRate`   | [1.13.0][9]       |
| Flutter     | `tracingSamplingRate` | [1.0.0-beta.2][10] |
| React Native | `tracingSamplingRate` | [1.0.0-rc6][11]   |

### Trazas sintéticas
`ingestion_reason:synthetics` y `ingestion_reason:synthetics-browser`

Los tests de HTTP y del navegador generan trazas cuando se instrumentan los servicios backend. [La integración de APM con las pruebas sintéticas][12] vincula tus pruebas sintéticas con sus correspondientes trazas backend. Observa la traza generada por la ejecución de una prueba fallida para pasar de esa prueba a la causa raíz del problema.

De forma predeterminada, el 100 % de las pruebas sintéticas de HTTP y del navegador generan trazas backend.

### Otros productos

Algunos motivos adicionales de ingesta se atribuyen a tramos generados por productos específicos de Datadog:

| Producto    | Motivo de ingesta                    | Descripción del mecanismo de ingesta |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` y `xray`                   | Trazas que recibes de las [aplicaciones serverless][13] y que han sido trazadas con las bibliotecas de trazado de Datadog o la integración de AWS X-Ray. |
| Application Security Monitoring (ASM)     | `appsec`                            | Trazas ingeridas desde las bibliotecas de trazado de Datadog y señaladas como una amenaza por [ASM][14]. |


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/setup_overview/setup/
[2]: /es/tracing/trace_ingestion/usage_metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /es/tracing/visualization/#trace-root-span
[5]: /es/tracing/trace_ingestion/control_page
[6]: /es/real_user_monitoring/connect_rum_and_traces/
[7]: https://github.com/DataDog/browser-sdk/releases/tag/v4.10.0
[8]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.11.0
[9]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.13.0
[10]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_tracking_http_client%2Fv1.0.0-beta.2
[11]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0-rc6
[12]: /es/synthetics/apm/
[13]: /es/serverless/distributed_tracing/
[14]: /es/security_platform/application_security/