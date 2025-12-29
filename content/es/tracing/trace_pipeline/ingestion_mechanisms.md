---
aliases:
- /es/tracing/trace_ingestion/mechanisms
description: Información general sobre los mecanismos del rastreador y el Agent que
  controlan la ingesta de trazas (traces).
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentación
  text: Controles de la ingesta
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentación
  text: Retención de trazas
- link: /tracing/trace_pipeline/métricas/
  tag: Documentación
  text: Métricas de uso
title: Mecanismos de ingesta
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Reglas para el muestro de la ingesta" >}}


Son varios los mecanismos responsables de decidir si los tramos (spans) generados por tus aplicaciones se envían a Datadog (_tramos ingeridos_). La lógica de estos mecanismos está en las [bibliotecas de rastreo][1] y en el Datadog Agent. Según la configuración, el tráfico generado por los servicios instrumentados puede ingerirse de forma total o parcial.

A cada tramo ingerido, se le adjunta un **motivo de ingesta** único en referencia a uno de los mecanismos que se describen en esta página. Las [métricas de uso][2] `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` tienen la etiqueta (tag) `ingestion_reason`.

Utiliza el [Dashboard de motivos de ingesta][3] para investigar todos los motivos de ingesta en contexto. Obtén información general sobre el volumen atribuido a cada mecanismo para identificar rápidamente las opciones de configuración pertinentes.

## Muestreo basado en la fase inicial

El mecanismo de muestreo que se usa por defecto se denomina _head-based sampling_ (muestreo basado en la fase inicial). La decisión sobre si se conserva o se descarta la traza se toma en el momento preciso en el que esta comienza, al inicio del [tramo raíz][4]. Luego, se propaga la decisión a los demás servicios como parte del contexto de la solicitud, por ejemplo, como un encabezado de la solicitud HTTP.

Como la decisión se toma al comienzo de la traza y, luego, se transmite a todas las partes de esta, existe la garantía de que se conservará o descartará la traza completa.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Muestro basado en la fase inicial" style="width:100%;" >}}

Puedes configurar la frecuencias de muestreo para el muestreo basado en la fase inicial en dos lugares:
- En el **[Agent](#in-the-agent)** (por defecto)
- A nivel de la **[biblioteca de rastreo](#in-tracing-libraries-user-defined-rules)**: los mecanismos de la biblioteca de rastreo sustituyen a la configuración del Agent.

### En el Agent
`ingestion_reason: auto`

El Datadog Agent envía las frecuencias de muestreo de forma continua a las bibliotecas de rastreo para aplicarlas a la raíz de las trazas. El Agent ajusta las frecuencias para alcanzar el objetivo general de diez trazas por segundo, las cuales se distribuyen entre los servicios en función del tráfico.

Por ejemplo, si el servicio `A` tiene más tráfico que el servicio `B`, el Agent podría modificar la frecuencia de muestreo de `A` para que `A` no conserve más de siete trazas por segundo y ajustar de un modo similar la frecuencia de muestreo de `B` para que `B` no conserve más de tres trazas por segundo, de modo que se obtenga un total de 10 trazas por segundo.

#### Configuración remota

La configuración de la frecuencia de muestreo en el Agent se puede configurar de forma remota si utilizas el Agent versión [7.42.0][20] o posterior. Para empezar, configura la [configuración remota][21] y, a continuación, configura el parámetro `ingestion_reason` desde la [página de Control de la ingesta][5]. La configuración remota te permite cambiar el parámetro sin tener que reiniciar el Agent. La configuración remota tiene prioridad sobre las configuraciones locales, incluidas las variables de entorno y la configuración de `datadog.yaml`.

#### Configuración local

Define el objetivo de trazas por segundo del Agent en su archivo principal de la configuración (`datadog.yaml`) o a modo de variable de entorno:
```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Notas**:
- La frecuencia de muestreo de trazas por segundo configurada en el Agent solo se aplica a las bibliotecas de rastreo de Datadog. No tiene ningún efecto en otras bibliotecas de rastreo como OpenTelemetry SDK.
- El objetivo no es un valor fijo. En realidad, fluctúa en función de los picos de tráfico y otros factores.

Todos los tramos de una traza muestreada utilizando el Datadog Agent [frecuencias de muestreo calculadas automáticamente](#in-the-agent) se etiquetan (tag) con el motivo de la ingesta `auto`. La etiqueta del `ingestion_reason` también se configura en las [métricas de uso][2]. Los servicios que utilizan el mecanismo por defecto del Datadog Agent se etiquetan (label) como `Automatic` en la columna de configuración de la [Página de control de la ingesta][5].

### En las bibliotecas de rastreo: reglas definidas por el usuario
`ingestion_reason: rule`

Para llevar a cabo un control más pormenorizado, utiliza las opciones de configuración de muestreo de la biblioteca de rastreo:
- Configura una **frecuencia de muestreo específica que se aplicará a la raíz del rastreo**, por servicio y/o nombre del recurso, sustituyendo el [mecanismo por defecto] del Agent(#in-the-agent).
- Configura un **límite de frecuencia** para restringir el número de trazas ingeridas por segundo. El límite de la frecuencia por defecto es de 100 trazas por segundo por instancia de servicio (cuando se utiliza el [mecanismo por defecto](#in-the-agent) del Agent, se omite el limitador de frecuencia).

**Nota**: Las reglas de muestreo son también controles de muestreo basado en la fase inicial. Si el tráfico para un servicio es superior al máximo configurado de trazas por segundo, entonces las trazas se descartan en la raíz. No se crean trazas incompletas.

La configuración se puede definir a través de las variables de entorno o directamente en el código:

{{< tabs >}}
{{% tab "Java" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, para las aplicaciones Java, configura las frecuencias de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">página de control de la ingesta</a>.

Para obtener más información sobre cómo configurar remotamente las frecuencias de muestreo por servicio y por recurso, consulta [Guía de muestreo basado en los recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**

Para las aplicaciones Java, configura las frecuencias de muestreo por servicio y por recurso (a partir de la versión [v1.26.0][3] para el muestreo basado en los recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100 % de las trazas para el recurso `GET /checkout` del servicio `my-service` y el 20 % de las trazas de otros endpoints, configura:

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

El valor del nombre del servicio distingue entre mayúsculas y minúsculas y debe coincidir con el nombre real de servicio.

Define la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia del servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Utiliza `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya has establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, establece`DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]` en su lugar.

Más información sobre los controles de muestreo en la [documentación de bibliotecas de rastreo de Java][2].

[1]: /es/tracing/guide/resource_based_sampling
[2]: /es/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, para las aplicaciones Python, configura las frecuencias de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">página de control de la ingesta</a>.

Más información sobre cómo configurar de forma remota frecuencias de muestreo por servicio y por recurso en la [guía de muestreo basado en recursos][3].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**
Para las aplicaciones Python, configura las frecuencias de muestreo por servicio y por recurso (a partir de la versión [v2.8.0][1] para el muestreo basado en recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100 % de las trazas para el recurso `GET /checkout` del servicio `my-service` y el 20 % de las trazas de otros endpoints, configura:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Utiliza `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya has establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, establece `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]` en su lugar.

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.8.0
[2]: /es/tracing/trace_collection/dd_libraries/python
[3]: /es/tracing/guide/resource_based_sampling/
{{% /tab %}}
{{% tab "Ruby" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, para las aplicaciones Ruby, configura las frecuencias de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">página de control de la ingesta</a>.

Para obtener más información sobre cómo configurar remotamente las frecuencias de muestreo por servicio y por recurso, consulta [Guía de muestreo basado en los recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**
Para aplicaciones Ruby, configura una frecuencia de muestreo global para la biblioteca utilizando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Configura frecuencias de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Obtén más información sobre los controles de muestreo en la [documentación acerca de la biblioteca de rastreo de Ruby][1].

[1]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, para las aplicaciones Go, configura las frecuencias de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">página de control de la ingesta</a>.

Más información sobre cómo configurar remotamente frecuencias de muestreo por servicio y por recurso en este [artículo][3].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**

Para las aplicaciones Go, establece las frecuencias de muestreo por servicio y por recurso (a partir de la versión [v1.60.0][2] para el muestreo basado en los recursos) con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100 % de las trazas para el recurso `GET /checkout` del servicio `my-service` y el 20 % de las trazas de otros endpoints, configura:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Define la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` está obsoleto. Utiliza `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya has establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, establece `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]` en su lugar.

Obtén más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Go][1].

[1]: /es/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
[3]: /es/tracing/guide/resource_based_sampling
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, para las aplicaciones Node.js, configura las frecuencias de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">página de control de la ingesta</a>.

Para obtener más información sobre cómo configurar remotamente las frecuencias de muestreo por servicio y por recurso, consulta [Guía de muestreo basado en los recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones Node.js, configura una frecuencia de muestreo global en la biblioteca utilizando la variable de entorno `DD_TRACE_SAMPLE_RATE`.

También puedes configurar las frecuencias de muestreo por servicio. Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % para el resto de las trazas:

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

Define la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, para las aplicaciones PHP, configura las frecuencias de muestreo por servicio y por recurso desde la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">página de control de la ingesta</a>.

Para obtener más información sobre cómo configurar remotamente las frecuencias de muestreo por servicio y por recurso, consulta [Guía de muestreo basado en los recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**

Para aplicaciones PHP, configura una frecuencia de muestreo global para la biblioteca con la variable de entorno `DD_TRACE_SAMPLE_RATE`. Configura frecuencias de muestreo por servicio utilizando la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50% de las trazas del servicio denominado `my-service`, el 20% de las trazas de otros endpoints y el 10% del resto de las trazas, configura:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Obtén más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de PHP][1].

[1]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, para las aplicaciones C++, configura las frecuencias de muestreo por servicio y por recurso desde la interfaz de usuario de la <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">página de control de la ingesta</a>.

Para obtener más información sobre cómo configurar remotamente las frecuencias de muestreo por servicio y por recurso, consulta [Guía de muestreo basado en los recursos][1].

**Nota**: La configuración remota tiene prioridad sobre la configuración local.

**Configuración local**
A partir de [v0.1.0][1], la biblioteca C++ de Datadog admite las siguientes configuraciones:
- Frecuencia de muestreo global: variable de entorno `DD_TRACE_SAMPLE_RATE`
- Frecuencias de muestreo por servicio: variable de entorno `DD_TRACE_SAMPLING_RULES`.
- Configuración del límite de frecuencia: variable de entorno `DD_TRACE_RATE_LIMIT`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de las trazas:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ no proporciona integraciones para la instrumentación automática, pero la utiliza el rastreo de proxies como Envoy, Nginx o Istio. Lee más sobre cómo configurar el muestreo para proxies en [Rastrear proxies][2].

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
[2]: /es/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
Para las aplicaciones .NET, establece una frecuencia de rastreo global para la biblioteca utilizando la variable de entorno `DD_TRACE_SAMPLE_RATE`. Define las frecuencias de muestreo por servicio con la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de las trazas del servicio llamado `my-service` y el 10 % del resto de las trazas:

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

<div class="alert alert-info">A partir de la versión 2.35.0, si la <a href="/remote_configuration">configuración remota del Agent</a> está activada donde se ejecuta el servicio, puedes configurar un <code>DD_TRACE_SAMPLE_RATE</code> por servicio en la interfaz de usuario del <a href="/tracing/software_catalog">Catálogo de software</a>.</div>

Define la variable de entorno `DD_TRACE_RATE_LIMIT` en un número de trazas por segundo por instancia de servicio para configurar un límite de frecuencia. Si no se define ningún valor `DD_TRACE_RATE_LIMIT`, se aplicará un límite de 100 trazas por segundo.

Lee más acerca de los controles de muestreo en la [documentación de bibliotecas de rastreo de .NET][1].\
Más información sobre la [configuración de variables de entorno para .NET][2].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core?tab=registryeditor#configuring-process-environment-variables
{{% /tab %}}
{{< /tabs >}}

**Nota**: Todos los tramos de una traza muestreada utilizando una configuración de biblioteca de rastreo se etiquetan (tag) con el motivo de la ingesta `rule`. Los servicios  configurados con reglas de muestreo definidas por el usuario se marcan como `Configured` en la columna de configuración de la [Página de control de la ingesta][5].

## Trazas con errores o poco frecuentes

Para las trazas que no se capturan a través del muestreo basado en la fase inicial, existen dos mecanismos de muestreo adicionales del Datadog Agent para asegurar la conservación y la ingesta de trazas críticas y diversas. Estos dos muestreadores conservan un conjunto diverso de trazas locales (conjuntos de tramos del mismo host) mediante la captura de todas las combinaciones de un conjunto predeterminado de etiquetas (tags):

- **Trazas con errores**: Es importante muestrear los errores, dado que así se pueden observar los posibles errores del sistema.
- **Trazas poco frecuentes**: Muestrear las trazas poco frecuentes te permite mantener la visibilidad sobre la totalidad del sistema, puesto que te aseguras de que los servicios y recursos con poco tráfico se sigan monitorizando.

**Nota**: Los muestreadores de trazas con errores o poco frecuentes se omitirán en los servicios en los que hayas configurado las [reglas de muestreo de bibliotecas](#in-tracing-libraries-user-defined-rules).

### Trazas con errores
`ingestion_reason: error`

El muestreador de trazas con errores captura fragmentos de trazas que contienen tramos con errores no capturados mediante el muestreo basado en la fase inicial. Puedes capturar hasta 10 trazas con errores por segundo (por Agent). Esto garantiza una visibilidad completa de los errores cuando la frecuencia del muestreo basado en la fase inicial es baja.

Con el Agent 7.33 y sus versiones posteriores, puedes configurar el muestreador de errores en el archivo principal de configuración del Agent (`datadog.yaml`) o con las variables de entorno:
```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Muestreo de errores" style="width:100%;" >}}

**Notas**:
1. Establece el parámetro en `0` para desactivar el muestreador de errores.
2. El muestreador de errores captura trazas locales con tramos con errores en el nivel del Agent. Si se distribuye la traza, no hay ninguna garantía de que la traza completa se envíe a Datadog.
3. Por defecto, los tramos descartados mediante las reglas de rastreo de la biblioteca o la lógica personalizada como `manual.drop` se **excluyen** en el muestreador de errores.

#### Datadog Agent 7.42.0 y superiores

El muestreo de errores se puede configurar de forma remota si utilizas el Agent versión [7.42.0][20] o superior. Sigue la [documentación][21] para habilitar la configuración remota en tus Agents. Con la configuración remota, puedes habilitar la recopilación de tramos poco frecuentes sin tener que reiniciar el Datadog Agent.

#### Datadog Agent 6/7.41.0 y superiores

Para sustituir el comportamiento por defecto de modo que el muestreador de errores **incluya** los tramos descartados a través de las reglas de la biblioteca de rastreo o la lógica personalizada como `manual.drop`, activa la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el Datadog Agent (o el contenedor del Trace Agent dedicado en el pod del Datadog Agent en Kubernetes).


#### Datadog Agent 6/7.33 a 6/7.40.x

El comportamiento por defecto del muestreo de errores no puede modificarse para estas versiones del Agent. Actualiza el Datadog Agent al Datadog Agent 6/7.41.0 y superiores.


### Trazas poco frecuentes
`ingestion_reason: rare`

El muestreador de trazas poco frecuentes envía un conjunto de tramos poco frecuentes a Datadog. Puede capturar hasta 5 trazas por segundo con combinaciones de `env`, `service`, `name`, `resource`, `error.type` y `http.status` (por Agent). Además, garantiza la visibilidad de los recursos con poco tráfico cuando la frecuencia del muestreo basado en la fase inicial es baja.

**Nota**: El muestreador de trazas poco frecuentes captura las trazas locales en el nivel del Agent. Si la traza se distribuye, no habrá forma de garantizar el envío de la traza completa a Datadog.

#### Datadog Agent 7.42.0 y superiores

La frecuencia de muestreo de trazas poco frecuentes se puede configurar de forma remota si utilizas el Agent versión [7.42.0][20] o superior. Sigue la [documentación][21] para habilitar la configuración remota en tus Agents. Con la configuración remota, puedes cambiar el valor del parámetro sin tener que reiniciar el Datadog Agent .

#### Datadog Agent 6/7.41.0 y superiores

Por defecto, el muestreador de trazas poco frecuentes está **no activado**.

**Nota: Cuando se **habilita**, los tramos descartados a través de las reglas de la biblioteca de rastreo o la lógica personalizada como `manual.drop` se **excluyen** en este muestreador.

Para configurar el muestreador de trazas poco frecuentes, actualiza la configuración `apm_config.enable_rare_sampler` en el archivo principal de la configuración del Agent (`datadog.yaml`) o con la variable de entorno `DD_APM_ENABLE_RARE_SAMPLER` :

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Para evaluar los tramos descartados a través de las reglas de la biblioteca de rastreo o la lógica personalizada como `manual.drop`,
 activa la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el Trace Agent .


#### Datadog Agent 6/7.33 a 6/7.40.x

Por defecto, el muestreador de trazas poco frecuentes está activado.

**Nota: Cuando **está activado**, los tramos descartados a través de las reglas de la biblioteca de rastreo o la lógica personalizada como `manual.drop` **están excluidos** en este muestreador. Para incluir estos tramos en esta lógica, actualiza al Datadog Agent 6.41.0/7.41.0 o superior.

Para cambiar la configuración por defecto del muestreador de trazas poco frecuentes, actualiza la configuración `apm_config.disable_rare_sampler` en el archivo principal de la configuración del Agent (`datadog.yaml`) o con la variable entorno `DD_APM_DISABLE_RARE_SAMPLER` :

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forzar la conservación y el descarte
`ingestion_reason: manual`

El mecanismo de muestreo basado en la fase inicial se puede sustituir en la biblioteca de rastreo. Por ejemplo, si necesitas monitorizar una transacción crítica, puedes forzar la conservación de la traza asociada. Por otro lado, también puedes forzar el descarte de la traza en caso de que contenga información repetitiva o innecesaria, como los checks de estado.

- Configura Manual Keep en un tramo para indicar que se deben ingerir este y todos los tramos secundarios. El rastreo resultante puede aparecer incompleto en la interfaz de usuario si el tramo en cuestión no es el tramo raíz de la traza.

- Configura Manual Drop en un tramo para asegurarte de que **no** se ingiera ningún tramo secundario. Los [muestreadores de trazas con errores y poco frecuentes](#error-and-rare-traces) se ignorarán en el Agent.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Conserva manualmente una traza:

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

Descarta manualmente una traza:

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

Conserva manualmente una traza:

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

Descarta manualmente una traza:

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

Conserva manualmente una traza:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Descarta manualmente una traza:

```ruby
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Conserva manualmente una traza:

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

Descarta manualmente una traza:

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

Conserva manualmente una traza:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Descarta manualmente una traza:

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

Conserva manualmente una traza:

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

Descarta manualmente una traza:

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


Conserva manualmente una traza:

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

Descarta manualmente una traza:

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

Conserva manualmente una traza:

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

Descarta manualmente una traza:

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

La conservación manual de las trazas debe realizarse antes de la propagación del contexto. Si se mantiene después de la propagación del contexto, el sistema no puede asegurar que se mantenga la traza completa en todos los servicios. La conservación de la traza manual se configura en la ubicación del cliente del rastreo, por lo que la ubicación del Agent o del servidor todavía puede descartar la traza de acuerdo con las reglas de muestreo.


## Tramos únicos
`ingestion_reason: single_span`

Si necesitas muestrear un tramo específico, pero no necesitas que esté disponible la traza completa, las bibliotecas de rastreo te permiten establecer una frecuencia de muestreo que se configurará para un tramo único.

Por ejemplo, si estás creando [métricas desde tramos][6] para monitorizar servicios específicos, puedes configurar las reglas de muestreo de tramos para garantizar que estas métricas estén basadas en el 100 % del tráfico de la aplicación, sin tener que ingerir el 100 % de las trazas para todas las solicitudes que fluyen a través del servicio.

Esta función está disponible para el Datadog Agent v[7.40.0][19] o posterior.

**Nota**: Las reglas de muestreo de tramos únicos **no pueden** utilizarse para descartar tramos que se conservan mediante el [muestreo basado en la fase inicial](#head-based-sampling), solo para conservar tramos adicionales que se descartan a través del muestreo basado en la fase inicial.

{{< tabs >}}
{{% tab "Java" %}}
A partir de la biblioteca de rastreo [versión 1.7.0][1], para las aplicaciones Java, establece las reglas de muestreo del **tramo** del nombre por servicio y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el 100 % de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta 50 tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Java][2].

[1]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.7.0
[2]: /es/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
Desde la versión [v1.4.0][1], para las aplicaciones Python, establece las reglas de muestreo del **tramo** del nombre por servicio y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Python][2].

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.4.0
[2]: /es/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Ruby" %}}
A partir de la versión [v1.5.0][1], para las aplicaciones Ruby, establece las reglas de muestreo del **tramo** del nombre por servicio y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Ruby][2].

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.5.0
[2]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
A partir de la versión [v1.41.0][1], para las aplicaciones Go, establece las reglas de muestreo del **tramo** del nombre por servicio y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
A partir de la versión [v1.60.0][3], para las aplicaciones Go, establece las reglas de muestreo del **tramo** por recurso y por etiquetas (tags) con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio para el recurso `POST /api/create_issue`, para la etiqueta (tag) `priority` con el valor `high`:

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Go][2].

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.41.0
[2]: /es/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
Para las aplicaciones Node.js, establece las reglas de muestreo del **tramo** del nombre por servicio y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
A partir de la versión [v0.77.0][1], para las aplicaciones PHP, establece las reglas de muestreo del **tramo** del nombre por servicio y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de PHP][2].

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.77.0
[2]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
A partir de la versión [v0.1.0][1], para las aplicaciones C++, establece las reglas de muestreo del **tramo** por servicio  y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
A partir de la versión [v2.18.0][1], para las aplicaciones .NET, establece las reglas de muestreo del **tramo** por servicio y por operación con la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar `100%` de los tramos del servicio llamado `my-service`, para la operación `http.request`, hasta `50` tramos por segundo:

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

Más información sobre los controles de muestreo en la [documentación de la biblioteca de rastreo de .NET][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.18.0
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"> El mecanismo <a href="/tracing/legacy_app_analytics/">App Analytics</a> está totalmente obsoleto. Para ingerir tramos individuales sin la traza completa, utiliza la configuración de <a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">muestreo de tramo único</a>. Para ingerir trazas completas, utiliza las configuraciones de muestreo <a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">Head-Based</a>.</div>

## Tramos ingeridos por productos

### Trazas de RUM
`ingestion_reason:rum`

Una solicitud de una aplicación web o móvil genera una traza cuando se instrumentan los servicios del backend. [La integración de APM con Real User Monitoring][7] vincula las solicitudes de aplicaciones web y móviles a sus trazas de backend correspondientes para que puedas ver todos tus datos de frontend y backend a través de una sola lente.

Empezando con la versión `4.30.0` del SDK del navegador RUM, puedes controlar los volúmenes ingeridos y mantener un muestreo de las trazas del backend mediante la configuración del parámetro de inicialización `traceSampleRate`. Establece `traceSampleRate` en un número entre `0` y `100`.
Si no se establece ningún valor `traceSampleRate`, por defecto, el 100 % de las trazas procedentes de las solicitudes del navegador se envían a Datadog.

De un modo similar, controla la frecuencia de muestreo de trazas en otros SDK utilizando parámetros parecidos:

| SDK         | Parámetro             | Versión mínima    |
|-------------|-----------------------|--------------------|
| Navegador     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _La frecuencia de muestreo se informa en la página de control de la ingesta desde [1.13.0][16]_. |
| Android     | `traceSampleRate`   | [1.13.0][10] _La frecuencia de muestreo se informa en la página de control de la ingesta desde [1.15.0][17]_. |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _La frecuencia de muestreo se indica en la página de control de la ingesta desde [1.2.0][18]_.  |

### Trazas Synthetic
`ingestion_reason:synthetics` y `ingestion_reason:synthetics-browser`

Los tests de HTTP y del navegador generan trazas cuando se instrumentan los servicios del backend. [La integración de APM con tests Synthetic][13] vincula tus tests Synthetic con las trazas correspondientes del backend. Ve desde una ejecución de test que no aprobó a la causa raíz del problema mirando la traza generada por esa ejecución de test.

Por defecto, el 100 % de los tests de HTTP Synthetic y del navegador generan trazas del backend.

### Otros productos

Algunos motivos adicionales de la ingesta se atribuyen a tramos generados por productos específicos de Datadog:

| Producto    | Motivo de la ingesta                    | Descripción del mecanismo de ingesta |
|------------|-------------------------------------|---------------------------------|
| Serverless | `lambda` y `xray`                   | Tus trazas recibidas desde las [aplicaciones Serverless][14] se rastrean con las bibliotecas de rastreo de Datadog o la integración con AWS X-Ray. |
| Protección de las aplicaciones y las API     | `appsec`                            | Trazas ingeridas de las bibliotecas de rastreo de Datadog y marcadas por [AAP][15] como amenazas. |
| Data Jobs Monitoring    | `data_jobs`                            | Trazas ingeridas desde la integración de Datadog Java Tracer Spark o la integración con Databricks. |

## Mecanismos de ingesta en OpenTelemetry
`ingestion_reason:otel`

Según tu configuración con los SDK de OpenTelemetry (mediante la utilización de OpenTelemetry Collector o el Datadog Agent), tienes muchas formas de controlar el muestreo de la ingesta. Consulta el [Muestreo de la ingesta con OpenTelemetry][22] para obtener más información sobre las opciones disponibles para el muestreo en el nivel de OpenTelemetry SDK, OpenTelemetry Collector y el Datadog Agent en diversas configuraciones de OpenTelemetry.

## Referencias adicionales

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