---
aliases:
- /es/tracing/trace_ingestion/mechanisms
description: Descripción general de los mecanismos en el SDK y el Datadog Agent que
  controlan la ingesta de trazas.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentación
  text: Ingestion Control
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentación
  text: Retención de trazas
- link: /tracing/trace_pipeline/metrics/
  tag: Documentación
  text: Métricas de uso
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimización de Datadog a escala: observabilidad rentable en Zendesk'
- link: https://learn.datadoghq.com/courses/apm-rate-limit-retention
  tag: Centro de aprendizaje
  text: Limitación de tasa y retención de APM
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Centro de arquitectura
  text: 'Dominio del rastreo distribuido: desafíos de volumen de datos y el enfoque
    de Datadog para un muestreo eficiente'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Centro de arquitectura
  text: 'Optimización del rastreo distribuido: mejores prácticas para mantenerse dentro
    del presupuesto y capturar trazas críticas'
title: Mecanismos de ingesta
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Reglas de muestreo de ingesta" >}}


Múltiples mecanismos determinan si los tramos generados por sus aplicaciones se envían a Datadog (_tramos ingeridos_). La lógica detrás de estos mecanismos se encuentra en los [SDKs][1] y en el Datadog Agent. Dependiendo de la configuración, se ingiere todo o parte del tráfico generado por los servicios instrumentados.

Cada tramo ingerido tiene una **razón de ingesta** única que hace referencia a uno de los mecanismos descritos en esta página. Las [métricas de uso][2] `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` están etiquetadas por `ingestion_reason`.

Utilice el [tablero de Razones de ingesta][3] para investigar cada razón de ingesta en contexto e identificar en qué opciones de configuración enfocarse.

## Muestreo basado en el inicio {#head-based-sampling}

El mecanismo de muestreo predeterminado se llama _muestreo basado en el inicio_. La decisión de conservar o descartar un tramo se toma al inicio del [tramo raíz][4] y luego se propaga a otros servicios como parte de su contexto de solicitud (por ejemplo, como un encabezado de solicitud HTTP).

Debido a que la decisión se toma al principio de la traza y se transmite a todas las partes, la traza se conserva o se descarta en su totalidad.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Muestreo basado en el inicio" style="width:100%;" >}}

Puede establecer tasas de muestreo para el muestreo basado en el inicio en dos lugares:
- A nivel del **[Agent](#in-the-agent)** (predeterminado)
- A nivel del **[SDK](#in-sdks-user-defined-rules)**: cualquier mecanismo del SDK anula la configuración del Agent.

### En el Agent {#in-the-agent}
`ingestion_reason: auto`

El Datadog Agent envía continuamente tasas de muestreo a los SDK para aplicarlas en la raíz de las trazas. El Agent ajusta las tasas para lograr un objetivo de diez trazas por segundo en general, distribuidas a los servicios según el tráfico.

Por ejemplo, si el servicio `A` tiene más tráfico que el servicio `B`, el Agent podría variar la tasa de muestreo para `A` de modo que `A` mantenga no más de siete trazas por segundo, y ajustar de manera similar la tasa de muestreo para `B` de modo que `B` mantenga no más de tres trazas por segundo, para un total de 10 trazas por segundo.

#### Remote Configuration {#remote-configuration}

La configuración de la tasa de muestreo en el Agent se puede configurar de forma remota si utiliza la versión [7.42.0][20] del Agent o superior. Para comenzar, configure [Remote Configuration][21] y luego configure el parámetro `ingestion_reason` desde la [Ingestion Control page][5]. Remote Configuration le permite cambiar el parámetro sin reiniciar el Agent. La configuración establecida de forma remota tiene prioridad sobre las configuraciones locales, incluidas las variables de entorno y los ajustes de `datadog.yaml`.

#### Configuración local {#local-configuration}

Establezca el objetivo de trazas por segundo del Agent en su archivo de configuración principal (`datadog.yaml`) o como una variable de entorno:

```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Notas**:
- La tasa de muestreo de trazas por segundo establecida en el Agent solo se aplica a los SDK de Datadog. No tiene efecto en otros SDK, como los SDK de OpenTelemetry.
- El objetivo no es un valor fijo. En realidad, fluctúa dependiendo de los picos de tráfico y otros factores.

Los tramos de las trazas muestreadas por las [tasas de muestreo automático](#in-the-agent) del Datadog Agent están etiquetados con el motivo de ingesta `auto`. La etiqueta `ingestion_reason` también se establece en [métricas de uso][2]. Los servicios que utilizan este mecanismo predeterminado se etiquetan como `Automatic` en la columna Configuración de la [Ingestion Control Page][5].

### En SDKs: reglas definidas por el usuario {#in-sdks-user-defined-rules}
`ingestion_reason: rule`

Para un control más granular, utilice las opciones de configuración de muestreo del SDK:
- Establezca una **tasa de muestreo específica para aplicar a la raíz de la traza** por nombre de servicio o recurso, anulando el [mecanismo predeterminado](#in-the-agent) del Agent.
- Establezca un **límite de tasa** en la cantidad de trazas ingeridas por segundo. El límite de tasa predeterminado es de 100 trazas por segundo por instancia de servicio. Al usar el [mecanismo predeterminado](#in-the-agent) del Agent, se ignora el limitador de tasa.

**Nota**: Las reglas de muestreo también son controles de muestreo basados en el inicio (head-based). Si el tráfico de un servicio es mayor que el máximo configurado de trazas por segundo, las trazas se descartan en la raíz. No crea trazas incompletas.

La configuración se puede establecer mediante variables de entorno o directamente en el código:

{{< tabs >}}
{{% tab "Java" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, para aplicaciones Java, establezca las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones Java, establezca las tasas de muestreo por servicio y por recurso (a partir de la versión [v1.26.0][3] para el muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas del recurso `GET /checkout` del servicio `my-service`, y el 20% de las trazas de otros puntos finales, configure:

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

El valor del nombre del servicio distingue entre mayúsculas y minúsculas y debe coincidir con el nombre real del servicio.

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` al máximo de trazas por segundo por instancia de servicio. Si no se establece ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Use `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya estableció `DD_TRACE_SAMPLE_RATE` en `0.1`, establezca `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]` en su lugar.

Lea más sobre los controles de muestreo en la [documentación del SDK de Java][2].

[1]: /es/tracing/guide/resource_based_sampling
[2]: /es/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, para aplicaciones Python, establezca las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][3].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
Para aplicaciones Python, establezca las tasas de muestreo por servicio y por recurso (a partir de la versión [v2.8.0][1] para el muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas del recurso `GET /checkout` del servicio `my-service`, y el 20% de las trazas de otros puntos finales, configure:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` al máximo de trazas por segundo por instancia de servicio. Si no se establece ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Use `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya estableció `DD_TRACE_SAMPLE_RATE` en `0.1`, establezca `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]` en su lugar.

Lea más sobre los controles de muestreo en la [documentación del SDK de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /es/tracing/trace_collection/dd_libraries/python
[3]: /es/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, para aplicaciones Ruby, establezca las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
Para aplicaciones Ruby, establezca una tasa de muestreo global para la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Establezca las tasas de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service` y el 10% del resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` al máximo de trazas por segundo por instancia de servicio. Si no se establece ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lea más sobre los controles de muestreo en la [documentación del SDK de Ruby][1].

[1]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, para aplicaciones Go, establezca las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>. 

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en este [artículo][3].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones Go, establezca las tasas de muestreo por servicio y por recurso (a partir de la versión [v1.60.0][2] para el muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas del recurso `GET /checkout` del servicio `my-service`, y el 20% de las trazas de otros puntos finales, configure:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` al máximo de trazas por segundo por instancia de servicio. Si no se establece ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Use `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya estableció `DD_TRACE_SAMPLE_RATE` en `0.1`, establezca `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]` en su lugar.

Lea más sobre los controles de muestreo en la [documentación del SDK de Go][1].

[1]: /es/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /es/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, para aplicaciones Node.js, establezca las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones Node.js, establezca una tasa de muestreo global en la biblioteca utilizando la variable de entorno `DD_TRACE_SAMPLE_RATE`.

También puede establecer tasas de muestreo por servicio. Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service` y el 10% para el resto de las trazas:

```javascript
tracer.init({
    ingestion: {
        sampler: {
            sampleRate: 0.1,
            rules: [
                { sampleRate: 0.5, service: 'my-service' }
            ]
        }
    }
});
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` al máximo de trazas por segundo por instancia de servicio. Si no se establece ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lea más sobre los controles de muestreo en la [documentación del SDK de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, para aplicaciones PHP, establezca las tasas de muestreo por servicio y por recurso desde la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">Página de Ingestion Control</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones PHP, establezca una tasa de muestreo global para la biblioteca utilizando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Establezca las tasas de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service`, el 20% de las trazas de otros endpoints y el 10% para el resto de las trazas, establezca:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Lea más sobre los controles de muestreo en la [documentación del SDK de PHP][1].

[1]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, para aplicaciones C++, establezca las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Página de Ingestion Control</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
A partir de la [v0.1.0][1], la biblioteca de C++ de Datadog admite las siguientes configuraciones:
- Tasa de muestreo global: `DD_TRACE_SAMPLE_RATE` variable de entorno
- Tasas de muestreo por servicio: `DD_TRACE_SAMPLING_RULES` variable de entorno.
- Configuración de límite de tasa: `DD_TRACE_RATE_LIMIT` variable de entorno.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service` y el 10% para el resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ no proporciona integraciones para la instrumentación automática, pero es utilizado por el rastreo de proxy como Envoy, NGINX o Istio. Lea más sobre cómo configurar el muestreo para proxies en [Rastreo de proxies][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /es/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab "Rust" %}}
**Configuración local**

Para aplicaciones Rust, establezca las tasas de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service` y el 10% para el resto de las trazas:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5},{"sample_rate": 0.1}]'
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` al máximo de trazas por segundo por instancia de servicio. Si no se establece ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lea más sobre los controles de muestreo en la [documentación del SDK de Rust][1].

[1]: /es/tracing/trace_collection/dd_libraries/rust
{{% /tab %}}
{{% tab ".NET" %}}
Para aplicaciones .NET, establezca una tasa de muestreo global para la biblioteca usando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Establezca las tasas de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service` y el 10% para el resto de las trazas:

```
#using powershell
$env:DD_TRACE_SAMPLE_RATE=0.1
$env:DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'

#using JSON file   
{
    "DD_TRACE_SAMPLE_RATE": "0.1",
    "DD_TRACE_SAMPLING_RULES": "[{\"service\": \"my-service\", \"resource\": \"GET /checkout\", \"sample_rate\": 0.5}]"
}
```

<div class="alert alert-info">A partir de la versión 2.35.0, si la <a href="/remote_configuration">Remote Configuration del Agent</a> está habilitada donde se ejecuta el servicio, puede establecer una por servicio <code>DD_TRACE_SAMPLE_RATE</code> en la interfaz de usuario del <a href="/internal_developer_portal/catalog/">Catalog</a>.</div>

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` al máximo de trazas por segundo por instancia de servicio. Si no se establece ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lea más sobre los controles de muestreo en la [documentación del SDK de .NET][1].\
Lea más sobre [cómo configurar variables de entorno para .NET][2].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**Nota**: Todos los spans de una traza muestreada mediante una configuración de SDK están etiquetados con el motivo de Ingestion Control `rule`. Los servicios configurados con reglas de muestreo definidas por el usuario se marcan como `Configured` en la columna Configuración de la [Ingestion Control Page][5].

## Trazas de error y poco frecuentes {#error-and-rare-traces}

Para las trazas que no fueron capturadas por el muestreo basado en el inicio, dos mecanismos de muestreo adicionales del Datadog Agent capturan trazas críticas y diversas que de otro modo se descartarían. Estos muestreadores mantienen un conjunto diverso de trazas locales (spans del mismo servidor) al capturar todas las combinaciones de un conjunto predeterminado de etiquetas:

- **Trazas de error**: El muestreo de errores proporciona visibilidad sobre posibles fallas del sistema.
- **Trazas poco frecuentes**: El muestreo de trazas poco frecuentes mantiene la visibilidad de los servicios y recursos de bajo tráfico en todo su sistema.

**Nota**: Los muestreadores de errores y de trazas poco frecuentes se ignoran para los servicios en los que usted establece [reglas de muestreo de biblioteca](#in-sdks-user-defined-rules).

### Trazas de error {#error-traces}
`ingestion_reason: error`

El muestreador de errores captura partes de trazas que contienen tramos de error que no fueron capturados por el muestreo basado en el inicio, a una tasa de hasta 10 trazas por segundo por Agent. Esto ayuda a mantener la visibilidad de los errores cuando la tasa de muestreo basada en el inicio es baja.

Con la versión 7.33 del Agent en adelante, puede configurar el muestreador de errores en el archivo de configuración principal del Agent (`datadog.yaml`) o con variables de entorno:

```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Muestreo de errores" style="width:100%;" >}}

**Notas**:
1. Establezca el parámetro en `0` para deshabilitar el muestreador de errores.
2. El muestreador de errores captura trazas de error locales a nivel del Agent. Si la traza está distribuida, es posible que la traza completa no se envíe a Datadog.
3. De forma predeterminada, los tramos descartados por las reglas del SDK o la lógica personalizada, como `manual.drop`, están **excluidos** bajo el muestreador de errores.

#### Datadog Agent 7.42.0 y superior {#datadog-agent-7420-and-higher}

El muestreo de errores se puede configurar de forma remota si utiliza la versión [7.42.0][20] o superior del Agent. Siga la [documentación][21] para habilitar la configuración remota en sus Agents. Con la configuración remota, puede habilitar la recopilación de tramos poco frecuentes sin reiniciar el Datadog Agent.

#### Datadog Agent 6/7.41.0 y superior {#datadog-agent-67410-and-higher}

Para anular el comportamiento predeterminado, de modo que los tramos descartados por las reglas del SDK o la lógica personalizada, como `manual.drop`, sean **incluidos** por el muestreador de errores, habilite la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el Datadog Agent (o en el contenedor dedicado del Trace Agent dentro del pod del Datadog Agent en Kubernetes).

#### Datadog Agent 6/7.33 a 6/7.40.x {#datadog-agent-6733-to-6740x}

El comportamiento predeterminado del muestreo de errores no se puede cambiar para estas versiones del Agent. Actualice el Datadog Agent a Datadog Agent 6/7.41.0 o superior.

### Trazas poco frecuentes {#rare-traces}
`ingestion_reason: rare`

El muestreador de casos poco frecuentes envía un conjunto de trazas poco frecuentes a Datadog. Detecta combinaciones de `env`, `service`, `name`, `resource`, `error.type` y `http.status` a una velocidad de hasta 5 trazas por segundo por Agent. Esto ayuda a mantener la visibilidad de los recursos con poco tráfico cuando la tasa de muestreo basada en el inicio es baja.

**Nota**: El muestreador de casos poco frecuentes captura trazas locales a nivel del Agent. Si la traza está distribuida, no hay garantía de que la traza completa se envíe a Datadog.

#### Datadog Agent 7.42.0 y superior {#datadog-agent-7420-and-higher-1}

El muestreo de casos poco frecuentes se puede configurar de forma remota si utiliza la versión [7.42.0][20] o superior del Agent. Siga la [documentación][21] para habilitar la configuración remota en sus Agents. Con la configuración remota, puede cambiar el valor del parámetro sin reiniciar el Datadog Agent.

#### Datadog Agent 6/7.41.0 y superior {#datadog-agent-67410-and-higher-1}

De forma predeterminada, el muestreador de casos poco frecuentes **no está habilitado**.

**Nota**: Cuando está **habilitado**, los spans descartados por las reglas del SDK o por lógica personalizada como `manual.drop` son **excluidos** bajo este muestreador.

Para configurar el muestreador de casos poco frecuentes, actualice el ajuste `apm_config.enable_rare_sampler` en el archivo de configuración principal del Agente (`datadog.yaml`) o con la variable de entorno `DD_APM_ENABLE_RARE_SAMPLER`:

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Para evaluar los tramos descartados por las reglas del SDK o por lógica personalizada, como `manual.drop`, habilite la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el Trace Agent.

#### Datadog Agent 6/7.33 a 6/7.40.x {#datadog-agent-6733-to-6740x-1}

De forma predeterminada, el muestreador de casos poco frecuentes está habilitado.

**Nota**: Cuando está **habilitado**, los tramos descartados por las reglas del SDK o por lógica personalizada, como `manual.drop` **, son excluidos** bajo este muestreador. Para incluir estos tramos en esta lógica, actualice a Datadog Agent 6.41.0/7.41.0 o superior.

Para cambiar la configuración predeterminada del muestreador de casos poco frecuentes, actualice el ajuste `apm_config.disable_rare_sampler` en el archivo de configuración principal del Agente (`datadog.yaml`) o con la variable de entorno `DD_APM_DISABLE_RARE_SAMPLER`:

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forzar mantener y descartar {#force-keep-and-drop}
`ingestion_reason: manual`

El mecanismo de muestreo basado en el inicio (head-based) puede ser anulado a nivel del SDK. Por ejemplo, si necesita monitorear una transacción crítica, puede forzar que se conserve la traza asociada. Por otro lado, para información innecesaria o repetitiva, como las verificaciones de estado (health checks), puede forzar que se descarte la traza.

- Establezca Manual Keep en un tramo para indicar que este y todos los tramos secundarios deben ser ingeridos. La traza resultante podría aparecer incompleta en la interfaz de usuario si el tramo en cuestión no es el tramo raíz de la traza.

- Establezca Manual Drop en un tramo para asegurarse de que **ningún** tramo secundario sea ingerido. Los [muestreadores de errores y de casos poco frecuentes](#error-and-rare-traces) son ignorados en el Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,rust" >}}
{{< programming-lang lang="java" >}}

Conserve manualmente una traza:

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always keep the trace
        span.setTag(DDTags.MANUAL_KEEP, true);
        // method impl follows
    }
}
```

Descarte manualmente una traza:

```java
import datadog.trace.api.DDTags;
import io.opentracing.Span;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        Span span = GlobalTracer.get().activeSpan();
        // Always Drop the trace
        span.setTag(DDTags.MANUAL_DROP, true);
        // method impl follows
    }
}
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Conserve manualmente una traza:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Keep the Trace
    span.set_tag(MANUAL_KEEP_KEY)
    # method impl follows
```

Descarte manualmente una traza:

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Drop the Trace
    span.set_tag(MANUAL_DROP_KEY)
    # method impl follows
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Conserve manualmente una traza:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Descarte manualmente una traza:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Conserve manualmente una traza:

```Go
package main

import (
    "log"
    "net/http"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext" 
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always keep this trace:
    span.SetTag(ext.ManualKeep, true)
    //method impl follows

}
```

Descarte manualmente una traza:

```Go
package main

import (
    "log"
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/ext"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Always drop this trace:
    span.SetTag(ext.ManualDrop, true)
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Conserve manualmente una traza:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Descarte manualmente una traza:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always drop the trace
span.setTag(tags.MANUAL_DROP)
//method impl follows

```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Conserve manualmente una traza:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always keep this trace
    span.SetTag(Datadog.Trace.Tags.ManualKeep, "true");
    //method impl follows
}
```

Descarte manualmente una traza:

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("my-operation"))
{
    var span = scope.Span;

    // Always drop this trace
    span.SetTag(Datadog.Trace.Tags.ManualDrop, "true");
    //method impl follows
}
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


Conserve manualmente una traza:

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always keep this trace
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
  }
?>
```

Descarte manualmente una traza:

```php
<?php
  $tracer = \DDTrace\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // Always drop this trace
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
  }
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Conserve manualmente una traza:

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto span = tracer.create_span(span_cfg);
// Always keep this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_KEEP));
//method impl follows
```

Descarte manualmente una traza:

```cpp
...
#include <datadog/tags.h>
#include <datadog/trace_segment.h>
#include <datadog/sampling_priority.h>
...

using namespace dd = datadog::tracing;

dd::SpanConfig span_cfg;
span_cfg.resource = "operation_name";

auto another_span = tracer.create_span(span_cfg);
// Always drop this trace
span.trace_segment().override_sampling_priority(int(dd::SamplingPriority::USER_DROP));
//method impl follows
```

{{< /programming-lang >}}
{{< programming-lang lang="rust" >}}

<div class="alert alert-info">El SDK de Rust utiliza la API de OpenTelemetry y no es compatible con Datadog <code>ManualKeep</code>/<code>ManualDrop</code> etiquetas. Para forzar la conservación o el descarte de una traza en Rust, establezca el atributo de OpenTelemetry <code>sampling.priority</code> en el tramo raíz utilizando <a href="/tracing/trace_collection/custom_instrumentation/rust">instrumentación personalizada</a>.</div>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Establezca Manual Keep antes de la propagación del contexto. Si se establece después de la propagación del contexto, es posible que la traza completa no se conserve en todos los servicios. Debido a que esta decisión se establece en el cliente de traza, la traza aún puede ser descartada por el Agent o el servidor según las reglas de muestreo.


## Tramos únicos {#single-spans}
`ingestion_reason: single_span`

Si necesita muestrear un tramo específico pero no necesita la traza completa, los SDK le permiten establecer una tasa de muestreo para un solo tramo.

Por ejemplo, si está creando [métricas a partir de tramos][6] para hacer un seguimiento de servicios específicos, puede configurar reglas de muestreo de tramo para que estas métricas se basen en el 100% del tráfico de la aplicación, sin ingerir el 100% de las trazas para todas las solicitudes que fluyen a través del servicio.

Esta función está disponible para Datadog Agent v[7.40.0][19]+.

**Nota**: Las reglas de muestreo de tramo único **no pueden** utilizarse para descartar tramos que se conservan mediante [muestreo basado en el inicio](#head-based-sampling), solo para conservar tramos adicionales que son descartados por el muestreo basado en el inicio.

{{< tabs >}}
{{% tab "Java" %}}
A partir de la versión [1.7.0][1] del SDK, para aplicaciones Java, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el 100% de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta 50 tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación del SDK de Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /es/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
A partir de la versión [v1.4.0][1], para aplicaciones Python, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación del SDK de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /es/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
A partir de la versión [v1.5.0][1], para aplicaciones Ruby, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación del SDK de Ruby][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
A partir de la versión [v1.41.0][1], para aplicaciones Go, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
A partir de la versión [v1.60.0][3], para aplicaciones Go, establezca las reglas de muestreo de **tramo** por recurso y por etiquetas con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio para el recurso `POST /api/create_issue`, para la etiqueta `priority` con el valor `high`:

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

Lea más sobre los controles de muestreo en la [documentación del SDK de Go][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /es/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Para aplicaciones de Node.js, establezca reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación del SDK de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
A partir de la versión [v0.77.0][1], para aplicaciones de PHP, establezca reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación del SDK de PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
A partir de la versión [v0.1.0][1], para aplicaciones de C++, establezca reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab "Rust" %}}
Para aplicaciones de Rust, establezca reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
{{% /tab %}}
{{% tab ".NET" %}}
A partir de la versión [v2.18.0][1], para aplicaciones de .NET, establezca reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

Lea más sobre los controles de muestreo en la [documentación del SDK de .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">El mecanismo heredado <a href="/tracing/legacy_app_analytics/">App Analytics</a> está totalmente obsoleto. Utilice <strong>muestreo de tramo único</strong> (descrito anteriormente) para ingerir tramos individuales, o <a href="#head-based-sampling">muestreo basado en el inicio</a> para ingerir trazas completas.</div>

## Tramos ingeridos por el producto {#product-ingested-spans}

### Trazas de RUM {#rum-traces}
`ingestion_reason:rum`

Una solicitud de una aplicación web o móvil genera una traza cuando los servicios de backend están instrumentados. [La integración de APM con Real User Monitoring][7] vincula las solicitudes de aplicaciones web y móviles con sus trazas de backend correspondientes para que pueda ver sus datos completos de frontend y backend a través de una sola lente.

A partir de la versión `4.30.0` del SDK de navegador de RUM, puede controlar los volúmenes ingeridos y mantener un muestreo de las trazas de backend configurando el parámetro de inicialización `traceSampleRate`. Establezca `traceSampleRate` en un número entre `0` y `100`.
Si no se establece ningún valor `traceSampleRate`, se envía a Datadog un valor predeterminado del 100% de las trazas provenientes de las solicitudes del navegador.

También puede controlar la tasa de muestreo de trazas en otros SDK:

| SDK         | Parámetro             | Versión mínima    |
|-------------|-----------------------|--------------------|
| Browser     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _La tasa de muestreo se informa en la Ingestion Control Page desde [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _La tasa de muestreo se informa en la Ingestion Control Page desde [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _La tasa de muestreo se informa en la Ingestion Control Page desde [1.2.0][18]_  |

### Trazas sintéticas {#synthetic-traces}
`ingestion_reason:synthetics` y `ingestion_reason:synthetics-browser`

Las pruebas HTTP y de navegador generan trazas cuando los servicios de backend están instrumentados. [La integración de APM con Synthetic Testing][13] vincula sus pruebas Synthetic con las trazas de backend correspondientes. Navegue desde una ejecución de prueba que falló hasta la causa raíz del problema observando la traza generada por esa ejecución de prueba.

De forma predeterminada, el 100% de las pruebas Synthetic HTTP y de navegador generan trazas de backend.

### Otros productos {#other-products}

Algunos motivos de ingesta adicionales se atribuyen a tramos generados por productos específicos de Datadog:

| Producto    | Motivo de ingesta                    | Descripción del mecanismo de ingesta |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` y `xray`                   | Sus trazas recibidas de las [aplicaciones Serverless][14] trazadas con SDKs de Datadog o la integración de AWS X-Ray. |
| Protección de aplicaciones y API     | `appsec`                            | Trazas ingeridas desde SDKs de Datadog y marcadas por [AAP][15] como una amenaza. |
| Data Observability: Jobs Monitoring    | `data_jobs`                            | Trazas ingeridas desde la integración de Spark del Datadog Java Tracer o la integración de Databricks. |

## Mecanismos de ingesta en OpenTelemetry {#ingestion-mechanisms-in-opentelemetry}
`ingestion_reason:otel`

Dependiendo de su configuración con los SDK de OpenTelemetry (usando el OpenTelemetry Collector o el Datadog Agent), tiene varias formas de controlar el muestreo de ingesta. Consulte [Ingestion Sampling with OpenTelemetry][22] para obtener detalles sobre las opciones disponibles para el muestreo a nivel de SDK de OpenTelemetry, OpenTelemetry Collector y Datadog Agent en varias configuraciones de OpenTelemetry.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/
[2]: /es/tracing/trace_pipeline/metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /es/tracing/glossary/#trace-root-span
[5]: /es/tracing/trace_pipeline/ingestion_controls/
[6]: /es/tracing/trace_pipeline/generate_metrics/
[7]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[8]: https://github.com/DataDog/browser-sdk/releases/tag/v4.30.0
[9]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.11.0
[10]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.13.0
[11]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv1.0.0
[12]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.0.0
[13]: /es/synthetics/apm/
[14]: /es/serverless/distributed_tracing/
[15]: /es/security/application_security/
[16]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.13.0
[17]: https://github.com/DataDog/dd-sdk-android/releases/tag/1.15.0
[18]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/1.2.0
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.40.0
[20]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[21]: /es/tracing/guide/remote_config/
[22]: /es/opentelemetry/guide/ingestion_sampling_with_opentelemetry