---
aliases:
- /es/tracing/trace_ingestion/mechanisms
description: Descripción general de los mecanismos en el trazador y el agente que
  controlan la ingestión de trazas.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Controles de ingestión
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Retención de rastros
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métricas de uso
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimización de Datadog a escala: observabilidad rentable en Zendesk'
title: Mecanismos de ingestión
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Reglas de muestreo de ingestión" >}}


Múltiples mecanismos son responsables de elegir si los lapsos generados por sus aplicaciones se envían a Datadog (_ingerido_). La lógica detrás de estos mecanismos se encuentra en las [bibliotecas de rastreo] [1] y en el Datadog Agent. Dependiendo de la configuración, se ingiere todo o parte del tráfico generado por los servicios instrumentados.

A cada lapso ingerido, se adjunta una **razón de ingestión** única que hace referencia a uno de los mecanismos descritos en esta página. [Métricas de uso][2] `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` están etiquetados por `ingestion_reason`.

Utilice el panel [Motivos de ingestión][3] para investigar en contexto cada uno de estos motivos de ingestión. Obtenga una visión general del volumen atribuido a cada mecanismo, para saber rápidamente en qué opciones de configuración centrarse.

## Muestreo basado en cabezales

El mecanismo de muestreo predeterminado se llama _muestreo basado en_ la cabeza. La decisión de mantener o eliminar un rastro se toma al principio del rastro, al comienzo del [tramo raíz] [4]. Esta decisión se propaga a otros servicios como parte de su contexto de solicitud, por ejemplo, como un encabezado de solicitud HTTP.

Debido a que la decisión se toma al principio del rastro y luego se transmite a todas las partes del rastro, se garantiza que el rastro se mantenga o se suelte en su conjunto.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Muestreo basado en cabeza" style="width:100%;" >}}

Puede establecer tasas de muestreo para el muestreo basado en la cabeza en dos lugares:
- En el nivel **[de agente](#in-the-agent)** (predeterminado)
- En el nivel de **[biblioteca de rastreo](#in-tracing-libraries-user-defined-rules)**: cualquier mecanismo de biblioteca de rastreo anula la configuración del agente.

### En el agente
`ingestion_reason: auto`

, el agente Datadog envía continuamente tasas de muestreo a las bibliotecas de rastreo para aplicarlas en la raíz de los rastros. El Agente ajusta las tarifas para alcanzar un objetivo de diez trazas por segundo, distribuidas a los servicios en función del tráfico.

Por ejemplo, si el `A` de servicio tiene más tráfico que el `B` de servicio, el agente puede variar la frecuencia de muestreo de los `A` de manera que el `A` no guarde más de siete trazas por segundo, y ajustar de manera similar la frecuencia de muestreo de los `B` de manera que el `B` no guarde más de tres trazas por segundo, para un total de 10 trazas por segundo.

#### Configuración remota

La configuración de la tasa de muestreo en el Agente se puede configurar de forma remota si está utilizando la versión [7.42.0][20] o superior del Agente. Para empezar, configure [Configuración remota][21] y, a continuación, configure el parámetro `ingestion_reason` desde la [Página de control de la ingestión][5]. Configuración remota le permite cambiar el parámetro sin tener que reiniciar el agente. La configuración establecida remotamente tiene prioridad sobre las configuraciones locales, incluidas las variables de entorno y los ajustes de `datadog.yaml`.

#### Configuración local

Establecer el tracespersecond objetivo del Agente en su archivo de configuración principal (`datadog.yaml`) o como variable de entorno :
```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Nota**:
- La frecuencia de muestreo de rastreo por segundo establecida en el agente solo se aplica a las bibliotecas de rastreo de Datadog. No tiene ningún efecto en otras bibliotecas de rastreo como OpenTelemetry SDKs.
-  El objetivo no es un valor fijo. En realidad, fluctúa dependiendo de los picos de tráfico y otros factores.

Todos los tramos de un rastro muestreado con el agente Datadog [calculan automáticamente frecuencias](#in-the-agent) de muestreo etiquetadas con el `auto` de la razón de la ingestión. La etiqueta `ingestion_reason` también se establece en [métricas de uso][2]. Los servicios que utilizan el mecanismo predeterminado Datadog Agent se etiquetan como `Automatic` en la columna Configuración [Página de control de ingesta][5].

### En bibliotecas de rastreo: reglas definidas por
`ingestion_reason: rule`

 el usuarioPara obtener un control más detallado, utilice las opciones de configuración de muestreo de bibliotecas de rastreo:
- Establezca una **tasa de muestreo específica para aplicar a la raíz del rastreo**, por servicio o nombre de recurso, anulando el [mecanismo predeterminado](#in-the-agent) del
-  agente.Establezca un **límite de tasa** en el número de rastreos ingeridos por segundo. El límite de velocidad predeterminado es de 100 trazas por segundo por instancia de servicio (cuando se utiliza el [mecanismo predeterminado](#in-the-agent) Agent, se ignora el limitador de velocidad).

**Nota**: Las reglas de muestreo también son controles de muestreo basados en la cabeza. Si el tráfico de un servicio es superior al máximo de trazas por segundo configurado, entonces las trazas se eliminan en la raíz. No crea rastros incompletos.

La configuración se puede establecer por variables de entorno o directamente en el código:

{{< tabs >}}
{{% tab "Java" %}}
**Configuración remota A**

 partir de la versión <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, para aplicaciones Java, establezca las tasas de muestreo byservice y byresource desde la IU de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones Java, establezca porservicio y porrecurso (a partir de la versión [v1.26.0][3] para el muestreo basado en recursos) las tasas de muestreo con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas para el `GET /checkout` de recursos del `my-service` de servicios y el 20% de las trazas de otros puntos finales, establezca:

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

El valor del nombre del servicio es sensible a mayúsculas y minúsculas y debe coincidir con el caso del nombre del servicio real.

Configure un límite de velocidad configurando la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor de `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` queda obsoleto. Usa `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya ha establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, establezca `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]`.

Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Java][2].

[1]: /es/tracing/guide/resource_based_sampling
[2]: /es/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Configuración remota A**

 partir de la versión <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, para aplicaciones Python, establezca las tasas de muestreo byservice y byresource desde la IU de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [Guía de muestreo basado en recursos][3].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
Para las aplicaciones Python, establezca las tasas de muestreo byservice y byresource (a partir de la versión [v2.8.0][1] para el muestreo basado en recursos) con la variable de entorno de `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas para el `GET /checkout` de recursos del `my-service` de servicios y el 20% de las trazas de otros puntos finales, establezca:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de velocidad configurando la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor de `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` queda obsoleto. Usa `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya ha establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, establezca `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]`.

Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /es/tracing/trace_collection/dd_libraries/python
[3]: /es/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Rubí" %}}
**Configuración remota A**

 partir de la versión <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, para aplicaciones Ruby, establezca las tasas de muestreo byservice y byresource desde la IU de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
Para aplicaciones Ruby, establezca una tasa de muestreo global para la biblioteca mediante la variable de entorno de `DD_TRACE_SAMPLE_RATE`. Establecer tasas de muestreo por servicio con la variable de entorno de `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio nombrado `my-service` y el 10% del resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Configure un límite de velocidad configurando la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor de `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Rubíes][1].

[1]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Configuración remota A**

 partir de la versión <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, para las aplicaciones Go, establezca las tasas de muestreo por servicio y por recurso desde la IU de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>. 

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en este [artículo][3].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones Go, establezca las tasas de muestreo byservice y byresource (a partir de la versión [v1.60.0][2] para muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100% de las trazas para el `GET /checkout` de recursos del `my-service` de servicios y el 20% de las trazas de otros puntos finales, establezca:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de velocidad configurando la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor de `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` queda obsoleto. Usa `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya ha establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, establezca `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]`.

Lea más sobre los controles de muestreo en [Documentación de la biblioteca de seguimiento][1].

[1]: /es/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /es/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuración remota A**

 partir de la versión <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, para las aplicaciones de Node.js, establezca las tasas de muestreo byservice y byresource desde la IU de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para las aplicaciones de Node.js, establezca una tasa de muestreo global en la biblioteca mediante la variable de entorno de `DD_TRACE_SAMPLE_RATE`.

También puede establecer tasas de muestreo por servicio. Por ejemplo, para enviar el 50% de las trazas para el servicio nombrado `my-service` y el 10% para el resto de las trazas:

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

Configure un límite de velocidad configurando la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor de `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuración remota A**

 partir de la versión <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, para aplicaciones PHP, establezca las tasas de muestreo byservice y byresource desde la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">Página de control</a>.

Lea más acerca de cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones PHP, establezca una tasa de muestreo global para la biblioteca mediante la variable de entorno de `DD_TRACE_SAMPLE_RATE`. Establecer tasas de muestreo por servicio con la variable de entorno de `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio nombrado `my-service`, el 20% de las trazas de otros puntos finales y el 10% para el resto de las trazas, establezca:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de PHP][1].

[1]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuración remota A**

 partir de la versión <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, para aplicaciones C++, establezca las tasas de muestreo porservicio y porrecurso desde la IU de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">Ingestion Control Page</a>.

Lea más sobre cómo configurar de forma remota las tasas de muestreo por servicio y recurso en la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
A partir de [v0.1.0][1], la biblioteca Datadog C++ admite las siguientes configuraciones:
- Velocidad de muestreo global: `DD_TRACE_SAMPLE_RATE` variable
-  de entornoVelocidades de muestreo por servicio: `DD_TRACE_SAMPLING_RULES` variable de entorno.
- Ajuste del límite de velocidad: `DD_TRACE_RATE_LIMIT` variable de entorno.

Por ejemplo, para enviar el 50% de las trazas para el servicio nombrado `my-service` y el 10% para el resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ no proporciona integraciones para instrumentación automática, pero es utilizado por proxy de rastreo como Envoy, Nginx o Istio. Lea más sobre cómo configurar el muestreo para proxys en [Proxies de seguimiento][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /es/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Para aplicaciones .NET, establezca una tasa de muestreo global para la biblioteca mediante la variable de entorno de `DD_TRACE_SAMPLE_RATE`. Establecer tasas de muestreo por servicio con la variable de entorno de `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas para el servicio nombrado `my-service` y el 10% para el resto de las trazas:

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

<div class="alert alert-info">A partir de la versión 2.35.0, si la <a href="/remote_configuration">configuración remota del</a> agente está habilitada donde se ejecuta el servicio, puede establecer una <code>DD_TRACE_SAMPLE_RATE</code> por servicio en la interfaz de usuario del <a href="/tracing/software_catalog">catálogo de software</a>.</div>

Configure un límite de velocidad configurando la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio. Si no se establece ningún valor de `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de .NET][1].\
Más información sobre [configuración de variables de entorno para .NET][2].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**Nota**: Todos los lapsos de un trazo muestreado usando una configuración de biblioteca de rastreo se etiquetan con la razón de ingestión `rule`. Los servicios configurados con reglas de muestreo definidas por el usuario se marcan como `Configured` en la columna [Página de control de la ingestión][5] Configuración.

## 

Para los rastros no capturados por el muestreo basado en la cabeza, dos mecanismos de muestreo adicionales de Datadog Agent se aseguran de que se mantengan e ingieran rastros críticos y diversos. Estos dos muestreadores guardan un conjunto diverso de trazas locales (conjunto de tramos del mismo host) capturando todas las combinaciones de un conjunto predeterminado de etiquetas:

- **Rastros de error**: Los errores de muestreo son importantes para proporcionar visibilidad sobre posibles fallos del sistema.
- **Rastros raros**: El muestreo de rastros raros le permite mantener la visibilidad en su sistema en su conjunto, asegurándose de que los servicios y recursos de bajo tráfico aún se monitorean.

**Nota**: Los muestreadores de errores y raros se ignoran para los servicios para los que establece [reglas de muestreo](#in-tracing-libraries-user-defined-rules).

### Rastros de error
`ingestion_reason: error`

El muestreador de error captura trozos de rastros que contienen tramos de error que no son capturados por el muestreo basado en la cabeza. Captura trazas de error hasta una tasa de 10 trazas por segundo (por agente). Garantiza una visibilidad completa de los errores cuando la tasa de muestreo basada en la cabeza es baja.

Con Agent versión 7.33 y versiones posteriores, puede configurar el muestreador de errores en el archivo de configuración principal de Agent (`datadog.yaml`) o con variables de entorno:
```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Muestreo de errores" style="width:100%;" >}}

**Nota**:
1. Establezca el parámetro en `0` para desactivar el muestreador de errores.
2. El muestreador de errores captura trazas locales con intervalos de error en el nivel de agente. Si el rastreo se distribuye, no hay garantía de que el rastreo completo se envíe a Datadog.
3. De forma predeterminada, los lapsos descartados por las reglas de la biblioteca de rastreo o la lógica personalizada, como `manual.drop`, se **excluyen** en el muestreador de errores.

#### 

El muestreo de errores se puede configurar de forma remota si utiliza la versión [7.42.0][20] o superior de Agent. Siga la [documentación][21] para habilitar la configuración remota en sus Agentes. Con la configuración remota, es capaz de habilitar la recopilación de lapsos raros sin tener que reiniciar el Datadog Agent.

#### 

Para anular el comportamiento predeterminado de modo que los lapsos dejados de lado por las reglas de la biblioteca de rastreo o la lógica personalizada, como `manual.drop`, sean **incluidos** por el muestreador de errores, habilite la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el agente Datadog (o el contenedor dedicado del agente de rastreo dentro del módulo del agente Datadog en Kubernetes).


#### 

El comportamiento predeterminado de muestreo de errores no se puede cambiar para estas versiones de Agent. Actualice el Datadog Agent a Datadog Agent 6/7.41.0 y superior.


### Rastros raros
`ingestion_reason: rare`

 El sampler raro envía un conjunto de lapsos raros a Datadog. Captura combinaciones de `env`, `service`, `name`, `resource`, `error.type` y `http.status` de hasta 5 trazas por segundo (por agente). Garantiza la visibilidad de los recursos de tráfico bajos cuando la tasa de muestreo basada en la cabeza es baja.

**Nota**: El sampler raro captura rastros locales a nivel de agente. Si el rastreo se distribuye, no hay manera de garantizar que el rastreo completo se enviará a Datadog.

####  Agente de Datadog 7.42.0 y superior

La frecuencia de muestreo rara se puede configurar de forma remota si utiliza la versión Agent [7.42.0][20] o superior. Siga la [documentación][21] para habilitar la configuración remota en sus Agentes. Con la configuración remota, puede cambiar el valor del parámetro sin tener que reiniciar el Datadog Agent.

#### Datadog Agent 6/7.41.0 y superior

De forma predeterminada, el sampler raro **no está habilitado**.

** Nota**: Cuando **está habilitado**, los lapsos eliminados por las reglas de la biblioteca de rastreo o la lógica personalizada, como `manual.drop`, se **excluyen** en este sampler.

Para configurar el sampler raro, actualice la configuración de `apm_config.enable_rare_sampler` en el archivo de configuración principal del agente (`datadog.yaml`) o con la variable de entorno `DD_APM_ENABLE_RARE_SAMPLER`:

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Para evaluar los lapsos perdidos mediante el trazado de reglas de biblioteca o lógica personalizada como `manual.drop`,
 habilite la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el agente de seguimiento.


#### Agente de datadog 6/7.33 a 6/7.40.x

De forma predeterminada, el sampler raro está activado.

**Nota**: Cuando **está activado**, los lapsos eliminados por las reglas de la biblioteca de trazado o la lógica personalizada, como los `manual.drop`, **se excluyen** en este sampler. Para incluir estos lapsos en esta lógica, actualice a Datadog Agent 6.41.0/7.41.0 o superior.

Para cambiar la configuración predeterminada del sampler raro, actualice la configuración de `apm_config.disable_rare_sampler` en el archivo de configuración principal del agente (`datadog.yaml`) o con la variable de entorno `DD_APM_DISABLE_RARE_SAMPLER`:

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forzar mantener y soltar
`ingestion_reason: manual`

 El mecanismo de muestreo basado en la cabeza se puede anular a nivel de biblioteca de rastreo. Por ejemplo, si necesita supervisar una transacción crítica, puede forzar que se mantenga el rastro asociado. Por otro lado, para información innecesaria o repetitiva como chequeos de salud, puede forzar que se elimine el rastro.

-  Establecer Manual Mantenga en un lapso para indicar que se debe ingerir este y todos los lapsos infantiles. La traza resultante puede aparecer incompleta en la IU si el lapso en cuestión no es el lapso raíz de la traza.

-  Establezca Suelte manualmente un lapso para asegurarse de que **no** se ingiera lapso hijo. Los [muestrarios de errores](#error-and-rare-traces) y raros serán ignorados en el Agente.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Mantenga un registro manual:

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

Suelta manualmente un rastro:

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

Mantenga un registro manual:

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

Suelta manualmente un rastro:

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

Mantenga un registro manual:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Suelta manualmente un rastro:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Mantenga un registro manual:

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

Suelta manualmente un rastro:

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

Mantenga un registro manual:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Suelta manualmente un rastro:

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

Mantenga un registro manual:

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

Suelta manualmente un rastro:

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


Mantenga un registro manual:

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

Suelta manualmente un rastro:

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

Mantenga un registro manual:

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

Suelta manualmente un rastro:

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

El seguimiento manual debe ocurrir antes de la propagación del contexto. Si se mantiene después de la propagación del contexto, el sistema no puede garantizar que todo el rastro se mantenga en todos los servicios. El seguimiento manual se establece en la ubicación del cliente de seguimiento, por lo que el seguimiento aún se puede eliminar por la ubicación del agente o del servidor en función de las reglas de muestreo. 


## Expansiones individuales
`ingestion_reason: single_span`

Si necesita muestrear una extensión específica, pero no necesita que el seguimiento completo esté disponible, las bibliotecas de seguimiento le permiten establecer una tasa de muestreo para configurarse para una sola extensión.

Por ejemplo, si está construyendo [métricas de spans][6] para supervisar servicios específicos, puede configurar reglas de muestreo de span para garantizar que estas métricas se basan en el 100% del tráfico de la aplicación, sin tener que ingerir el 100% de los rastros de todas las solicitudes que fluyen a través del servicio.

Esta característica está disponible para Datadog Agent v[7.40.0][19]+.

**Nota**: Las reglas de muestreo de tramo único **no** se pueden usar para eliminar tramos que se mantienen mediante [muestreo basado en](#head-based-sampling) la cabeza, solo para mantener tramos adicionales que se eliminan mediante muestreo basado en la cabeza.

{{< tabs >}}
{{% tab "Java" %}}
Comenzando en la biblioteca de rastreo [versión 1.7.0][1], para aplicaciones Java, establezca reglas de muestreo de **extensión** de nombres de byservice y byoperation con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recoger el 100% de los lapsos del servicio denominado `my-service`, para la operación `http.request`, hasta 50 lapsos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /es/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
A partir de la versión [v1.4.0][1], para las aplicaciones Python, establezca reglas de muestreo de **extensión** de nombre de byservice y byoperation con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos desde el servicio denominado `my-service`, para el `http.request` de operación, hasta lapsos de `50` por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /es/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Rubí" %}}
A partir de la versión [v1.5.0][1], para las aplicaciones Ruby, establezca reglas de muestreo de **extensión** de nombre de byservice y byoperation con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos desde el servicio denominado `my-service`, para el `http.request` de operación, hasta lapsos de `50` por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Rubíes][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
A partir de la versión [v1.41.0][1], para las aplicaciones Go, establezca reglas de muestreo de **extensión** de nombres de servicio y operación con la variable de entorno de `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos desde el servicio denominado `my-service`, para el `http.request` de operación, hasta lapsos de `50` por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
A partir de la versión [v1.60.0][3], para las aplicaciones Go, establezca reglas de muestreo de **extensión** por recursos y etiquetas con la variable de entorno de `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos del servicio para el `POST /api/create_issue` de recursos, para la etiqueta `priority` con `high` de valor:

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

Lea más sobre los controles de muestreo en [Documentación de la biblioteca de seguimiento][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /es/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Para las aplicaciones de Node.js, establezca reglas de muestreo de **expansión** de nombre de servicio y operación con la variable de entorno de `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos desde el servicio denominado `my-service`, para el `http.request` de operación, hasta lapsos de `50` por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [Documentación de la biblioteca de rastreo de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
A partir de la versión [v0.77.0][1], para aplicaciones PHP, establezca reglas de muestreo de **extensión** de nombres de byservice y byoperation con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos desde el servicio denominado `my-service`, para el `http.request` de operación, hasta lapsos de `50` por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
A partir de la versión [v0.1.0][1], para aplicaciones C++, establezca reglas de muestreo de **extensión** de nombres de servicio y operación con la variable de entorno de `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos desde el servicio denominado `my-service`, para el `http.request` de operación, hasta lapsos de `50` por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
A partir de la versión [v2.18.0][1], para aplicaciones .NET, establezca reglas de muestreo de **extensión** de nombres de servicio y operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los lapsos desde el servicio denominado `my-service`, para el `http.request` de operación, hasta lapsos de `50` por segundo:

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

Lea más sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"> El mecanismo <a href="/tracing/legacy_app_analytics/">de App Analytics</a> está totalmente obsoleto. Para ingerir lapsos individuales sin el rastro completo, utilice la configuración de <a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">muestreo de lapso único</a>. Para ingerir trazas completas, utilice configuraciones de <a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">muestreo HeadBased</a>.</div>

## SpansRUM

###  TracesUna
`ingestion_reason:rum`

 solicitud de una aplicación web o móvil genera un rastreo cuando se instrumentan los servicios de backend. [La integración de APM con Real User Monitoring][7] vincula las solicitudes de aplicaciones web y móviles a sus correspondientes trazas de backend para que pueda ver sus datos completos de frontend y backend a través de una lente.

A partir de la versión `4.30.0` del SDK del navegador RUM, puede controlar los volúmenes ingeridos y mantener un muestreo de los rastros del backend configurando el parámetro de inicialización de `traceSampleRate`. Establezca `traceSampleRate` en un número entre `0` y `100`.
Si no se establece ningún valor de `traceSampleRate`, se envía a Datadog un valor predeterminado del 100% de los rastros procedentes de las solicitudes del navegador.

Del mismo modo, controle la tasa de muestreo de rastros en otros SDK utilizando parámetros similares:

| SDK         | Parameter             | Minimum version    |
|-------------|-----------------------|--------------------|
| Browser     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] La tasa _de muestreo se informa en la página de control de la ingestión desde [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] La tasa _de muestreo se informa en la página de control de la ingestión desde [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] La tasa _de muestreo se informa en la página de control de la ingestión desde [1.2.0][18]_  |

### Las trazas sintéticas
`ingestion_reason:synthetics` y las pruebas `ingestion_reason:synthetics-browser`

HTTP y del navegador generan rastros cuando se instrumentan los servicios de backend. [La integración de APM con Synthetic Testing][13] vincula sus pruebas sintéticas con las trazas de backend correspondientes. Navegue desde una ejecución de prueba que no pudo llegar a la causa raíz del problema mirando el rastro generado por esa ejecución de prueba.

Por defecto, el 100% de las pruebas sintéticas HTTP y de navegador generan trazas de backend.

### Otros productos

Algunas razones de ingestión adicionales se atribuyen a lapsos generados por productos específicos de Datadog:Motivo de 

| ingestión    |  del producto                    | Mecanismo de ingestión Descripción |
|------------|-------------------------------------|---------------------------------|
| , sin servicio | `lambda` y `xray`                   | sus rastros recibidos de las [aplicaciones sin servicio] [14] rastreados con bibliotecas de rastreo de Datadog o la integración de rayos X de AWS. |
| Protección de aplicaciones y API     | `appsec`                            | Rastros ingeridos de bibliotecas de rastreo de Datadog y marcados por [AAP] [15] como una amenaza. |
| Observabilidad de datos: Monitoreo de trabajos    | `data_jobs`                            | Rastros ingeridos de la integración de Datadog Java Tracer Spark o la integración de Databricks. |

## Mecanismos de ingestión en OpenTelemetry
`ingestion_reason:otel`

Dependiendo de su configuración con los SDK de OpenTelemetry (usando el recopilador de OpenTelemetry o el agente de Datadog), tiene múltiples formas de controlar el muestreo de ingestión. Consulte [Muestreo por ingestión con OpenTelemetry][22] para obtener más detalles sobre las opciones disponibles para el muestreo en el nivel de OpenTelemetry SDK, OpenTelemetry Collector y Datadog Agent en varias configuraciones de OpenTelemetry.

## 

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