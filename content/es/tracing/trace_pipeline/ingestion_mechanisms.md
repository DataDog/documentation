---
aliases:
- /es/tracing/trace_ingestion/mechanisms
description: Descripción general de los mecanismos en el trazador y el agente que
  controlan la ingestión de trazas.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Ingestion Control
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Retención de trazas
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métricas de uso
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimizando Datadog a gran escala: Observabilidad rentable en Zendesk'
title: Mecanismos de Ingestión
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Reglas de Muestreo de Ingestión" >}}


Múltiples mecanismos son responsables de elegir si los tramos generados por sus aplicaciones son enviados a Datadog (_ingresados_). La lógica detrás de estos mecanismos radica en las [bibliotecas de trazado][1] y en el Agente de Datadog. Dependiendo de la configuración, todo o parte del tráfico generado por los servicios instrumentados es ingresado.

A cada tramo ingresado se le adjunta una única **razón de ingestión** que se refiere a uno de los mecanismos descritos en esta página. [Métricas de uso][2] `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` están etiquetadas por `ingestion_reason`.

Utilice el [tablero de razones de ingestión][3] para investigar en contexto cada una de estas razones de ingestión. Obtenga una descripción general del volumen atribuido a cada mecanismo, para saber rápidamente en qué opciones de configuración centrarse.

## Muestreo basado en la cabeza

El mecanismo de muestreo predeterminado se llama _muestreo basado en la cabeza_. La decisión de mantener o descartar una traza se toma al principio de la traza, al inicio del [tramo raíz][4]. Esta decisión se propaga a otros servicios como parte de su contexto de solicitud, por ejemplo, como un encabezado de solicitud HTTP.

Debido a que la decisión se toma al principio de la traza y luego se transmite a todas las partes de la traza, se garantiza que la traza se mantenga o se descarte en su totalidad.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Muestreo basado en la cabeza" style="width:100%;" >}}

Puede establecer tasas de muestreo para el muestreo basado en la cabeza en dos lugares:
- A nivel de **[Agente](#in-the-agent)** (predeterminado)
- A nivel de **[biblioteca de trazado](#in-tracing-libraries-user-defined-rules)**: cualquier mecanismo de biblioteca de trazado anula la configuración del Agente.

### En el Agente
`ingestion_reason: auto`

El Agente de Datadog envía continuamente tasas de muestreo a las bibliotecas de trazado para aplicar en la raíz de las trazas. El Agente ajusta las tasas para lograr un objetivo de diez trazas por segundo en total, distribuidas a los servicios dependiendo del tráfico.

Por ejemplo, si el servicio `A` tiene más tráfico que el servicio `B`, el Agente podría variar la tasa de muestreo para `A` de tal manera que `A` no mantenga más de siete trazas por segundo, y ajustar de manera similar la tasa de muestreo para `B` de tal manera que `B` no mantenga más de tres trazas por segundo, para un total de 10 trazas por segundo.

#### Configuración remota

La configuración de la tasa de muestreo en el Agente se puede configurar de forma remota si estás utilizando la versión del Agente [7.42.0][20] o superior. Para comenzar, configura [Remote Configuration][21] y luego configura el parámetro `ingestion_reason` desde la [Ingestion Control page][5]. Remote Configuration te permite cambiar el parámetro sin tener que reiniciar el Agent. La configuración establecida de forma remota tiene prioridad sobre las configuraciones locales, incluidas las variables de entorno y configuraciones de `datadog.yaml`.

#### Configuración local

Establece el objetivo de trazas por segundo del Agent en su archivo de configuración principal (`datadog.yaml`) o como una variable de entorno:

```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Notas**:
- La tasa de muestreo de trazos por segundo establecida en el Agente solo se aplica a las bibliotecas de trazado de Datadog. No tiene efecto en otras bibliotecas de trazado como los SDK de OpenTelemetry.
- El objetivo no es un valor fijo. En realidad, fluctúa dependiendo de los picos de tráfico y otros factores.

Todos los tramos de una traza muestreada utilizando el Datadog Agent [tasas de muestreo calculadas automáticamente](#in-the-agent) están etiquetados con la razón de ingestión `auto`. La etiqueta `ingestion_reason` también se establece en [métricas de uso][2]. Los servicios que utilizan el mecanismo predeterminado del Agent de Datadog están etiquetados como `Automatic` en la columna de Configuración de la [Ingestion Control Page][5].

### En bibliotecas de trazado: reglas definidas por el usuario
`ingestion_reason: rule`

Para un control más granular, utilice las opciones de configuración de muestreo de la biblioteca de trazado:
- Establezca una **tasa de muestreo específica** que se aplique a la raíz del trazado, por servicio y/o nombre de recurso, sobreescribiendo el [mecanismo predeterminado](#in-the-agent) del Agente.
- Establece un **límite de tasa** en el número de trazas ingresadas por segundo. El límite de tasa predeterminado es de 100 trazas por segundo por instancia de servicio (cuando se utiliza el [mecanismo predeterminado](#in-the-agent) del Agente, se ignora el limitador de tasa).

**Nota**: Las reglas de muestreo también son controles de muestreo basados en la cabeza. Si el tráfico para un servicio es mayor que el máximo configurado de trazas por segundo, entonces las trazas se descartan en la raíz. No crea trazas incompletas.

La configuración se puede establecer mediante variables de entorno o directamente en el código:

{{< tabs >}}
{{% tab "Java" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, para aplicaciones Java, configure las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar remotamente las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones Java, configure las tasas de muestreo por servicio y por recurso (a partir de la versión [v1.26.0][3] para muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas para el recurso `GET /checkout` del servicio `my-service`, y el 20% de las trazas de otros puntos de conexión, configure:

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

El valor del nombre del servicio es sensible a mayúsculas y debe coincidir con el caso del nombre real del servicio.

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` a un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está en desuso. Utilice `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya configuró `DD_TRACE_SAMPLE_RATE` a `0.1`, configure `DD_TRACE_SAMPLING_RULES` a `[{"sample_rate":0.1}]` en su lugar.

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de Java][2].

[1]: /es/tracing/guide/resource_based_sampling
[2]: /es/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, para aplicaciones Python, configure las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar remotamente las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][3].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**
Para aplicaciones Python, configure las tasas de muestreo por servicio y por recurso (a partir de la versión [v2.8.0][1] para muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas para el recurso `GET /checkout` del servicio `my-service`, y el 20% de las trazas de otros puntos de conexión, configure:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` a un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está en desuso. Utilice `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya configuró `DD_TRACE_SAMPLE_RATE` a `0.1`, configure `DD_TRACE_SAMPLING_RULES` a `[{"sample_rate":0.1}]` en su lugar.

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /es/tracing/trace_collection/dd_libraries/python
[3]: /es/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, para aplicaciones Ruby, configure las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar remotamente las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**
Para aplicaciones de Ruby, establece una tasa de muestreo global para la biblioteca utilizando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Establece las tasas de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service` y el 10% del resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` a un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lee más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de Ruby][1].

[1]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Ve" %}}
**Remote Configuration**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, para aplicaciones de Go, establezca las tasas de muestreo por servicio y por recurso desde la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a> UI. 

Lee más sobre cómo configurar remotamente las tasas de muestreo por servicio y recurso en este [artículo][3].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones de Go, establece las tasas de muestreo por servicio y por recurso (a partir de la versión [v1.60.0][2] para muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas para el recurso `GET /checkout` del servicio `my-service`, y el 20% de las trazas de otros puntos de conexión, configure:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` a un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está en desuso. Utilice `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya configuró `DD_TRACE_SAMPLE_RATE` a `0.1`, configure `DD_TRACE_SAMPLING_RULES` a `[{"sample_rate":0.1}]` en su lugar.

Lee más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de Go][1].

[1]: /es/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /es/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, para aplicaciones de Node.js, establece las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Página de Control de Ingesta</a>.

Lea más sobre cómo configurar remotamente las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones de Node.js, establece una tasa de muestreo global en la biblioteca utilizando la variable de entorno `DD_TRACE_SAMPLE_RATE`.

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

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` a un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lee más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, para aplicaciones PHP, configure las tasas de muestreo por servicio y por recurso desde la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">Ingestion Control Page</a>.

Lea más sobre cómo configurar remotamente las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones PHP, establezca una tasa de muestreo global para la biblioteca utilizando la `DD_TRACE_SAMPLE_RATE` variable de entorno. Establece las tasas de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service`, el 20% de las trazas de otros puntos de conexión y el 10% para el resto de las trazas, configure:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de PHP][1].

[1]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, para aplicaciones C++, configure las tasas de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar remotamente las tasas de muestreo por servicio y recurso en la [guía de muestreo basado en recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**
A partir de [v0.1.0][1], la biblioteca de C++ de Datadog admite las siguientes configuraciones:
- Tasa de muestreo global: `DD_TRACE_SAMPLE_RATE` variable de entorno
- Tasas de muestreo por servicio: `DD_TRACE_SAMPLING_RULES` variable de entorno.
- Configuración de límite de tasa: `DD_TRACE_RATE_LIMIT` variable de entorno.

Por ejemplo, para enviar el 50% de las trazas para el servicio llamado `my-service` y el 10% para el resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ no proporciona integraciones para instrumentación automática, pero se utiliza mediante el trazado por proxy como Envoy, Nginx o Istio. Lea más sobre cómo configurar el muestreo para proxies en [Tracing proxies][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /es/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Para aplicaciones .NET, establezca una tasa de muestreo global para la biblioteca utilizando la `DD_TRACE_SAMPLE_RATE` variable de entorno. Establezca las tasas de muestreo por servicio con la `DD_TRACE_SAMPLING_RULES` variable de entorno.

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

<div class="alert alert-info">A partir de la versión 2.35.0, si <a href="/remote_configuration">Agent Remote Configuration</a> está habilitada donde se ejecuta el servicio, puede establecer un <code>DD_TRACE_SAMPLE_RATE</code> por servicio en la interfaz de usuario del <a href="/tracing/software_catalog">Software Catalog</a> UI.</div>

Configure un límite de tasa estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` a un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lea más sobre los controles de muestreo en la [.NET tracing library documentation][1].\
Lee más sobre [la configuración de variables de entorno para .NET][2].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**Nota**: Todos los tramos de un rastro muestreado utilizando una configuración de biblioteca de trazado están etiquetados con la razón de ingestión `rule`. Los servicios configurados con reglas de muestreo definidas por el usuario están marcados como `Configured` en la columna Configuration de la [Ingestion Control Page][5].

## Trazas de error y trazas raras

Para las trazas que no son capturadas por el muestreo basado en la cabeza, dos mecanismos adicionales de muestreo del Agente de Datadog aseguran que las trazas críticas y diversas se mantengan e ingresen. Estos dos muestreadores mantienen un conjunto diverso de trazas locales (conjunto de tramos del mismo host) al capturar todas las combinaciones de un conjunto predeterminado de etiquetas:

- **Trazas de error**: Muestrear errores es importante para proporcionar visibilidad sobre posibles fallas del sistema.
- **Trazas raras**: Muestrear trazas raras te permite mantener visibilidad sobre tu sistema en su totalidad, asegurando que los servicios y recursos de bajo tráfico aún sean monitoreados.

**Nota**: Los muestreadores de errores y raras son ignorados para los servicios para los cuales estableciste [reglas de muestreo de biblioteca](#in-tracing-libraries-user-defined-rules).

### Trazas de error
`ingestion_reason: error`

El muestreador de errores captura partes de trazas que contienen tramos de error que no son capturados por el muestreo basado en la cabeza. Captura trazas de error hasta una tasa de 10 trazas por segundo (por Agente). Asegura una visibilidad completa sobre errores cuando la tasa de muestreo basada en la cabeza es baja.

Con la versión 7.33 del Agente en adelante, puedes configurar el muestreador de errores en el archivo de configuración principal del Agente (`datadog.yaml`) o con variables de entorno:

```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Muestreo de errores" style="width:100%;" >}}

**Notas**:
1. Establezca el parámetro en `0` para deshabilitar el muestreador de errores.
2. El muestreador de errores captura trazas locales con tramos de error a nivel de Agente. Si la traza es distribuida, no hay garantía de que la traza completa se envíe a Datadog.
3. Por defecto, las trazas descartadas por las reglas de la biblioteca de trazado o lógica personalizada como `manual.drop` están **excluidas** bajo el muestreador de errores.

#### Datadog Agent 7.42.0 y superior

El muestreo de errores es configurable de forma remota si está utilizando la versión del Agente [7.42.0][20] o superior. Siga la [documentación][21] para habilitar la configuración remota en sus Agentes. Con la configuración remota, puede habilitar la recolección de tramos raros sin tener que reiniciar el Datadog Agent.

#### Datadog Agent 6/7.41.0 y superior

Para anular el comportamiento predeterminado de modo que los tramos descartados por las reglas de la biblioteca de trazado o lógica personalizada como `manual.drop` estén **incluidos** por el muestreador de errores, habilite la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el Datadog Agent (o el contenedor dedicado de Trace Agent dentro del pod de Datadog Agent en Kubernetes).


#### Datadog Agent 6/7.33 a 6/7.40.x

El comportamiento predeterminado del muestreo de errores no se puede cambiar para estas versiones de Agente. Actualice el Datadog Agent a Datadog Agent 6/7.41.0 y superior.


### Trazas raras
`ingestion_reason: rare`

El muestreador raro envía un conjunto de tramos raros a Datadog. Captura combinaciones de `env`, `service`, `name`, `resource`, `error.type` y `http.status` hasta 5 trazas por segundo (por Agente). Asegura visibilidad en recursos de bajo tráfico cuando la tasa de muestreo basada en la cabeza es baja.

**Nota**: El muestreador raro captura trazas locales a nivel de Agente. Si la traza está distribuida, no hay forma de garantizar que la traza completa se enviará a Datadog.

#### Datadog Agent 7.42.0 y superior

La tasa de muestreo rara es configurable de forma remota si está utilizando la versión del Agente [7.42.0][20] o superior. Siga la [documentación][21] para habilitar la configuración remota en sus Agentes. Con la configuración remota, puede cambiar el valor del parámetro sin tener que reiniciar el Datadog Agent.

#### Datadog Agent 6/7.41.0 y superior

Por defecto, el muestreador raro **no está habilitado**.

**Nota**: Cuando **está habilitado**, los tramos descartados por las reglas de la biblioteca de trazado o lógica personalizada como `manual.drop` son **excluidos** bajo este muestreador.

Para configurar el muestreador raro, actualice la `apm_config.enable_rare_sampler` configuración en el archivo de configuración principal del Datadog Agent (`datadog.yaml`) o con la variable de entorno `DD_APM_ENABLE_RARE_SAMPLER`:

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Para evaluar los tramos descartados por las reglas de la biblioteca de trazado o lógica personalizada como `manual.drop`,
 habilite la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el Trace Agent.


#### Datadog Agent 6/7.33 a 6/7.40.x

Por defecto, el muestreador raro está habilitado.

**Nota**: Cuando **está habilitado**, los tramos descartados por las reglas de la biblioteca de trazado o lógica personalizada como `manual.drop` **son excluidos** bajo este muestreador. Para incluir estos tramos en esta lógica, actualice a Datadog Agent 6.41.0/7.41.0 o superior.

Para cambiar la configuración predeterminada del muestreador raro, actualice la `apm_config.disable_rare_sampler` configuración en el archivo de configuración principal del Datadog Agent (`datadog.yaml`) o con la variable de entorno `DD_APM_DISABLE_RARE_SAMPLER`:

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Force keep and drop
`ingestion_reason: manual`

El mecanismo de muestreo basado en la cabeza puede ser anulado a nivel de la biblioteca de trazado. Por ejemplo, si necesita monitorear una transacción crítica, puede forzar que la traza asociada se mantenga. Por otro lado, para información innecesaria o repetitiva como las verificaciones de salud, puede forzar que la traza se descarte.

- Establezca Manual Keep en un tramo para indicar que este y todos los tramos hijos deben ser ingeridos. La traza resultante puede parecer incompleta en la interfaz de usuario si el tramo en cuestión no es el tramo raíz de la traza.

- Establezca Manual Drop en un tramo para asegurarse de que **ningún** tramo hijo sea ingerido. [Los muestreadores de errores y los muestreadores raros](#error-and-rare-traces) serán ignorados en el Datadog Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Mantenga manualmente una traza:

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

Elimine manualmente una traza:

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

Mantenga manualmente una traza:

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

Elimine manualmente una traza:

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

Mantenga manualmente una traza:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Elimine manualmente una traza:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Mantenga manualmente una traza:

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

Elimine manualmente una traza:

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

Mantenga manualmente una traza:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Elimine manualmente una traza:

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

Mantenga manualmente una traza:

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

Elimine manualmente una traza:

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


Mantenga manualmente una traza:

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

Elimine manualmente una traza:

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

Mantenga manualmente una traza:

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

Elimine manualmente una traza:

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
{{< /programming-lang-wrapper >}}

La conservación manual de trazas debe realizarse antes de la propagación del contexto. Si se mantiene después de la propagación del contexto, el sistema no puede garantizar que se conserve toda la traza a través de los servicios. La conservación manual de trazas se establece en la ubicación del cliente de rastreo, por lo que la traza aún puede ser eliminada por el Datadog Agent o la ubicación del servidor según las reglas de muestreo.


## Tramos individuales
`ingestion_reason: single_span`

Si necesita muestrear un tramo específico, pero no necesita que la traza completa esté disponible, las bibliotecas de rastreo le permiten establecer una tasa de muestreo que se puede configurar para un solo tramo.

Por ejemplo, si está construyendo [métricas a partir de tramos][6] para el seguimiento de servicios específicos, puede configurar reglas de muestreo de tramos para garantizar que estas métricas se basen en el 100% del tráfico de la aplicación, sin tener que ingerir el 100% de las trazas de todas las solicitudes que fluyen a través del servicio.

Esta función está disponible para Datadog Agent v[7.40.0][19]+.

**Nota**: Las reglas de muestreo de tramos individuales **no** se pueden usar para descartar tramos que son conservados por el muestreo basado en cabeza, solo para conservar tramos adicionales que son descartados por el muestreo basado en cabeza.

{{< tabs >}}
{{% tab "Java" %}}
A partir de la biblioteca de rastreo [versión 1.7.0][1], para aplicaciones Java, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la `DD_SPAN_SAMPLING_RULES` variable de entorno.

Por ejemplo, para recolectar el 100% de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta 50 tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de traza de Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /es/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
A partir de la versión [v1.4.0][1], para aplicaciones Python, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la `DD_SPAN_SAMPLING_RULES` variable de entorno.

Por ejemplo, para recolectar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Lea más sobre los controles de muestreo en la [documentación de la biblioteca de traza de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /es/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
A partir de la versión [v1.5.0][1], para aplicaciones Ruby, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la `DD_SPAN_SAMPLING_RULES` variable de entorno.

Por ejemplo, para recolectar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de traza de Ruby][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
A partir de la versión [v1.41.0][1], para aplicaciones Go, establezca las reglas de muestreo de **tramo** por servicio y por nombre de operación con la `DD_SPAN_SAMPLING_RULES` variable de entorno.

Por ejemplo, para recolectar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
A partir de la versión [v1.60.0][3], para aplicaciones Go, establezca las reglas de muestreo de tramos por recurso y por etiqueta con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio para el recurso `POST /api/create_issue`, para la etiqueta `priority` con valor `high`:

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

Lee más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de Go][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /es/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Para aplicaciones de Node.js, establece las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recolectar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lee más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
A partir de la versión [v0.77.0][1], para aplicaciones de PHP, establece las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recolectar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lee más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
A partir de la versión [v0.1.0][1], para aplicaciones de C++, establece las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recolectar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
A partir de la versión [v2.18.0][1], para aplicaciones de .NET, establece las reglas de muestreo de **tramo** por servicio y por nombre de operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recolectar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

Lee más sobre los controles de muestreo en la [documentación de la biblioteca de trazado de .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"> El mecanismo de <a href="/tracing/legacy_app_analytics/">App Analytics</a> está completamente obsoleto. Para ingerir tramos individuales sin la traza completa, utiliza la configuración de <a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">Muestreo de Tramo Único</a>. Para ingerir trazas completas, utiliza configuraciones de <a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">Muestreo Basado en Cabeza</a>.</div>

## Tramos de producto ingeridos

### Trazas de RUM
`ingestion_reason:rum`

Una solicitud de una aplicación web o móvil genera una traza cuando los servicios de backend están instrumentados. [La integración de APM con Real User Monitoring][7] vincula las solicitudes de aplicaciones web y móviles a sus trazas de backend correspondientes para que puedas ver tus datos completos de frontend y backend a través de una sola lente.

A partir de la versión `4.30.0` del SDK de RUM para navegador, puedes controlar los volúmenes ingeridos y mantener un muestreo de las trazas de backend configurando el parámetro de inicialización `traceSampleRate`. Establece `traceSampleRate` a un número entre `0` y `100`.
Si no se establece ningún valor de `traceSampleRate`, se envía un 100% de las trazas provenientes de las solicitudes del navegador a Datadog por defecto.

De manera similar, controla la tasa de muestreo de trazas en otros SDK utilizando parámetros similares:

| SDK         | Parámetro             | Versión mínima    |
|-------------|-----------------------|--------------------|
| Navegador     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _La tasa de muestreo se informa en la página de Ingestion Control desde [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _La tasa de muestreo se informa en la página de Ingestion Control desde [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _La tasa de muestreo se informa en la página de Ingestion Control desde [1.2.0][18]_  |

### Trazas sintéticas
`ingestion_reason:synthetics` y `ingestion_reason:synthetics-browser`

Las pruebas de HTTP y navegador generan trazas cuando los servicios de backend están instrumentados. [La integración de APM con Synthetic Testing][13] vincula tus pruebas sintéticas con las trazas de backend correspondientes. Navega desde una ejecución de prueba que falló hasta la causa raíz del problema observando la traza generada por esa ejecución de prueba.

Por defecto, el 100% de las pruebas sintéticas de HTTP y navegador generan trazas de backend.

### Otros productos

Algunas razones adicionales de ingesta se atribuyen a tramos que son generados por productos específicos de Datadog:

| Producto    | Razón de Ingesta                    | Descripción del Mecanismo de Ingesta |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` y `xray`                   | Tus trazas recibidas de las [aplicaciones Serverless][14] trazadas con Datadog Tracing Libraries o la integración de AWS X-Ray. |
| App and API Protection     | `appsec`                            | Trazas ingeridas de Datadog Tracing Libraries y marcadas por [AAP][15] como una amenaza. |
| Data Observability: Jobs Monitoring    | `data_jobs`                            | Trazas ingeridas desde la integración de Datadog Java Tracer Spark o la integración de Databricks. |

## Mecanismos de ingestión en OpenTelemetry
`ingestion_reason:otel`

Dependiendo de tu configuración con los SDK de OpenTelemetry (usando el OpenTelemetry Collector o el Datadog Agent), tienes múltiples formas de controlar el muestreo de ingestión. Consulta [Muestreo de Ingestión con OpenTelemetry][22] para obtener detalles sobre las opciones disponibles para el muestreo a nivel de SDK de OpenTelemetry, OpenTelemetry Collector y Datadog Agent en varias configuraciones de OpenTelemetry.

## Lectura adicional

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