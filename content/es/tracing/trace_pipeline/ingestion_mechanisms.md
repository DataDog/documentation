---
aliases:
- /es/tracing/trace_ingestion/mechanisms
description: Resumen de los mecanismos del rastreador y del agente que controlan la
  ingesta de trazas.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Medidas de control de la ingestión
- link: /tracing/trace_pipeline/trace_retention/
  tag: Documentation
  text: Retención de trazas
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métricas de uso
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#improving-tracing-efficiency-through-targeted-changes
  tag: Blog
  text: 'Optimización de Datadog a gran escala: observabilidad rentable en Zendesk'
title: Mecanismos de ingestión
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Normas de muestreo por ingestión" >}}


Hay varios mecanismos que determinan si los intervalos generados por tus aplicaciones se envían a Datadog (se ingieren). La lógica que subyace a estos mecanismos reside en las [bibliotecas de rastreo][1] y en el agente de Datadog. Dependiendo de la configuración, se recoge todo o parte del tráfico generado por los servicios instrumentados.

A cada intervalo de tiempo registrado se le asigna un **motivo de registro** único que hace referencia a uno de los mecanismos descritos en esta página. [Métricas de uso][2] `datadog.estimated_usage.apm.ingested_bytes` y `datadog.estimated_usage.apm.ingested_spans` están etiquetadas con `ingestion_reason`.

Utiliza el [panel de motivos de ingestión][3] para analizar cada uno de estos motivos de ingestión en su contexto. Obtén una visión general del volumen atribuido a cada mecanismo para saber rápidamente en qué opciones de configuración debes centrarte.

## Muestreo basado en la cabeza

El mecanismo de muestreo predeterminado se denomina «muestreo basado en el encabezado». La decisión de mantener o descartar un rastro se toma al inicio del rastro, al comienzo del [tramo raíz][4]. Esta decisión se transmite posteriormente a otros servicios como parte del contexto de su solicitud, por ejemplo, como un encabezado de solicitud HTTP.

Dado que la decisión se toma al inicio del seguimiento y luego se transmite a todas las partes del mismo, se garantiza que el seguimiento se mantenga o se descarte en su totalidad.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Muestreo basado en la cabeza" style="width:100%;" >}}

Puedes configurar las frecuencias de muestreo para el muestreo basado en la posición de la cabeza en dos lugares:
 En el nivel **[Agente](#intheagent)** (predeterminado)
 A nivel de la **[biblioteca de rastreo](#intracinglibrariesuserdefinedrules)**: cualquier mecanismo de la biblioteca de rastreo anula la configuración del agente.

### En el agente
`motivo_de_ingestión: automático`

El agente de Datadog envía continuamente tasas de muestreo a las bibliotecas de rastreo para que se apliquen en el origen de los rastros. El agente ajusta las velocidades para alcanzar un objetivo global de diez trazas por segundo, que se distribuyen entre los servicios en función del tráfico.

Por ejemplo, si el servicio «A» tiene más tráfico que el servicio «B», el agente podría modificar la frecuencia de muestreo de «A» de modo que «A» no guarde más de siete trazas por segundo, y ajustar de forma similar la frecuencia de muestreo de «B» para que «B» no guarde más de tres trazas por segundo, lo que da un total de 10 trazas por segundo.

#### Configuración remota

La configuración de la frecuencia de muestreo en el agente se puede configurar de forma remota si se utiliza la versión [7.42.0][20] del agente o una superior. Para empezar, configura la [Configuración remota][21] y, a continuación, configura el parámetro `ingestion_reason` desde la [página de control de ingestión][5]. La configuración remota te permite modificar los parámetros sin necesidad de reiniciar el agente. La configuración establecida de forma remota tiene prioridad sobre las configuraciones locales, incluidas las variables de entorno y los ajustes de `datadog.yaml`.

#### Configuración local

Configure el valor de «tracespersecond» del agente en su archivo de configuración principal (`datadog.yaml`) o como variable de entorno:
```
@param target_traces_per_second - integer - optional - default: 10
@env DD_APM_TARGET_TPS - integer - optional - default: 10
```

**Notas**:
 La frecuencia de muestreo de trazas por segundo configurada en el agente solo se aplica a las bibliotecas de rastreo de Datadog. No afecta a otras bibliotecas de rastreo, como los SDK de OpenTelemetry.
 El objetivo no es un valor fijo. En realidad, varía en función de los picos de tráfico y otros factores.

Todos los tramos de un trazo muestreado mediante el agente de Datadog [frecuencias de muestreo calculadas automáticamente](#intheagent) se etiquetan con el motivo de ingestión «auto». La etiqueta «ingestion_reason» también se aplica a las [métricas de uso][2]. Los servicios que utilizan el mecanismo predeterminado del agente de Datadog aparecen etiquetados como «Automático» en la columna «Configuración» de la [página de control de ingestión][5].

### En las bibliotecas de rastreo: reglas definidas por el usuario
`motivo_de_ingestión: regla`

Para un control más preciso, utiliza las opciones de configuración de muestreo de la biblioteca de rastreo:
 Establece una **frecuencia de muestreo** específica que se aplicará a la raíz del trazo, por servicio y/o nombre de recurso, anulando el [mecanismo predeterminado](#intheagent) del agente.
 Establece un **límite de frecuencia** para el número de trazas importadas por segundo. El límite de frecuencia predeterminado es de 100 trazas por segundo por instancia de servicio (cuando se utiliza el agente [mecanismo predeterminado](#intheagent), se ignora el limitador de frecuencia).

**Nota**: Las reglas de muestreo son también controles de muestreo basados en la cabecera. Si el tráfico de un servicio supera el número máximo de trazas por segundo configurado, las trazas se descartan en la raíz. No genera trazas incompletas.

La configuración se puede establecer mediante variables de entorno o directamente en el código:

{{< tabs >}}
{{% tab "Java" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0">1.34.0</a>, en el caso de las aplicaciones Java, se pueden configurar las frecuencias de muestreo «by service» y «by resource» desde la interfaz de usuario de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">la página de control de ingestión</a>.

Para obtener más información sobre cómo configurar de forma remota las frecuencias de muestreo por servicio y recurso, consulta la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

En el caso de las aplicaciones Java, configura las frecuencias de muestreo «by-service» y «by-resource» (a partir de la versión [v1.26.0][3] para el muestreo basado en recursos) mediante la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100 % de los rastros del recurso `GET /checkout` del servicio `myservice`, y el 20 % de los rastros de otros puntos finales, configura lo siguiente:

```
# using system property
java -Ddd.trace.sampling.rules='[{"service": "my-service", "resource": "GET /checkout", "sample_rate":1},{"service": "my-service", "sample_rate":0.2}]' -javaagent:dd-java-agent.jar -jar my-app.jar

# using environment variables
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

El valor del nombre del servicio distingue entre mayúsculas y minúsculas y debe coincidir con el nombre real del servicio.

Configure un límite de frecuencia estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo por instancia de servicio. Si no se ha establecido ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` ha quedado obsoleto. Utiliza `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya has establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, configura `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]`.

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Java][2].

[1]: /es/guía-de-rastreo/muestreo-basado-en-recursos
[2]: /es/tracing/trace_collection/dd_libraries/java
[3]: https://github.com/DataDog/ddtracejava/releases/tag/v1.26.0
{{% /tab %}}
{{% tab "Python" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.0">2.9.0</a>, en el caso de las aplicaciones de Python, se pueden configurar las frecuencias de muestreo «by service» y «by resource» desde la interfaz de usuario de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">la página de control de ingestión</a>.

Para obtener más información sobre cómo configurar de forma remota las frecuencias de muestreo por servicio y recurso, consulta la [Guía de muestreo basado en recursos][3].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
En el caso de las aplicaciones de Python, configura las frecuencias de muestreo byservice y byresource (a partir de la versión [v2.8.0][1] para el muestreo basado en recursos) mediante la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100 % de los rastros del recurso `GET /checkout` del servicio `myservice`, y el 20 % de los rastros de otros puntos finales, configura lo siguiente:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de frecuencia estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo por instancia de servicio. Si no se ha establecido ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` ha quedado obsoleto. Utiliza `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya has establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, configura `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]`.

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Python][2].

[1]: https://github.com/DataDog/ddtracepy/releases/tag/v2.8.0
[2]: /es/tracing/trace_collection/dd_libraries/python
[3]: /es/guía_de_rastreo/muestreo_basado_en_recursos/
{{% /tab %}}
{{% tab "Rubí" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0">2.0.0</a>, en las aplicaciones Ruby, se pueden configurar las frecuencias de muestreo «by service» y «by resource» desde la interfaz de usuario de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">la página de control de ingestión</a>.

Para obtener más información sobre cómo configurar de forma remota las frecuencias de muestreo por servicio y recurso, consulta la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
En el caso de las aplicaciones Ruby, configura una frecuencia de muestreo global para la biblioteca mediante la variable de entorno `DD_TRACE_SAMPLE_RATE`. Configure las frecuencias de muestreo de los servicios mediante la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de los rastros del servicio denominado «myservice» y el 10 % del resto de los rastros:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

Configure un límite de frecuencia estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo por instancia de servicio. Si no se ha establecido ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Ruby][1].

[1]: /es/tracing/trace_collection/dd_libraries/ruby#sampling
{{% /tab %}}
{{% tab "Go" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-go/releases/tag/v1.64.0">1.64.0</a>, para las aplicaciones Go, configura las frecuencias de muestreo «by service» y «by resource» desde la interfaz de usuario <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">de la página de control de ingestión</a>. 

Para obtener más información sobre cómo configurar de forma remota las frecuencias de muestreo por servicio y recurso, consulta este [artículo][3].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

En las aplicaciones Go, configura las frecuencias de muestreo de «by-service» y «by-resource» (a partir de la versión [v1.60.0][2] para el muestreo basado en recursos) mediante la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para capturar el 100 % de los rastros del recurso `GET /checkout` del servicio `myservice`, y el 20 % de los rastros de otros puntos finales, configura lo siguiente:

```
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource": "GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Configure un límite de frecuencia estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo por instancia de servicio. Si no se ha establecido ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

**Nota**: El uso de `DD_TRACE_SAMPLE_RATE` ha quedado obsoleto. Utiliza `DD_TRACE_SAMPLING_RULES` en su lugar. Por ejemplo, si ya has establecido `DD_TRACE_SAMPLE_RATE` en `0.1`, configura `DD_TRACE_SAMPLING_RULES` en `[{"sample_rate":0.1}]`.

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca Go Tracing][1].

[1]: /es/tracing/trace_collection/dd_libraries/go
[2]: https://github.com/DataDog/ddtracego/releases/tag/v1.60.0
[3]: /es/guía_de_rastreo/muestreo_basado_en_recursos
{{% /tab %}}
{{% tab "Node.js" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0">5.16.0</a>, para las aplicaciones de Node.js, configura las frecuencias de muestreo «by service» y «by resource» desde la interfaz de usuario de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">la página de control de ingestión</a>.

Para obtener más información sobre cómo configurar de forma remota las frecuencias de muestreo por servicio y recurso, consulta la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**

En el caso de las aplicaciones Node.js, configura una frecuencia de muestreo global en la biblioteca mediante la variable de entorno `DD_TRACE_SAMPLE_RATE`.

También puedes configurar las frecuencias de muestreo por servicio. Por ejemplo, para enviar el 50 % de los rastros del servicio denominado «myservice» y el 10 % del resto de los rastros:

```javascript```
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

Configure un límite de frecuencia estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo por instancia de servicio. Si no se ha establecido ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0">1.4.0</a>, en el caso de las aplicaciones PHP, configura las frecuencias de muestreo «by service» y «by resource» desde la <a href="https://app.datadoghq.com/apm/traces/ingestion-control">página de control de ingestión</a>.

Para obtener más información sobre cómo configurar de forma remota las frecuencias de muestreo por servicio y recurso, consulta la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración de Remotelyset tiene prioridad sobre la configuración local.

**Configuración local**

En el caso de las aplicaciones PHP, configura una frecuencia de muestreo global para la biblioteca mediante la variable de entorno `DD_TRACE_SAMPLE_RATE`. Configure las frecuencias de muestreo de los servicios mediante la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de los rastros del servicio denominado «myservice», el 20 % de los rastros de otros puntos finales y el 10 % del resto de los rastros, configura lo siguiente:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "resource":"GET /checkout", "sample_rate": 1},{"service": "my-service", "sample_rate": 0.2}]'
```

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de PHP][1].

[1]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
**Configuración remota**

A partir de la versión <a href="https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2">0.2.2</a>, en el caso de las aplicaciones en C++, configura las frecuencias de muestreo «by service» y «by resource» desde la interfaz de usuario de <a href="/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rate">la página de control de ingestión</a>.

Para obtener más información sobre cómo configurar de forma remota las frecuencias de muestreo por servicio y recurso, consulta la [Guía de muestreo basado en recursos][1].

**Nota**: La configuración establecida de forma remota tiene prioridad sobre la configuración local.

**Configuración local**
A partir de la versión [v0.1.0][1], la biblioteca de Datadog para C++ admite las siguientes configuraciones:
 Frecuencia de muestreo global: variable de entorno `DD_TRACE_SAMPLE_RATE`
 Frecuencias de muestreo por servicio: variable de entorno `DD_TRACE_SAMPLING_RULES`.
 Configuración del límite de frecuencia: variable de entorno `DD_TRACE_RATE_LIMIT`.

Por ejemplo, para enviar el 50 % de los rastros del servicio denominado «myservice» y el 10 % del resto de los rastros:

```
export DD_TRACE_SAMPLE_RATE=0.1
export DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.5}]'
```

C++ no ofrece integraciones para la instrumentación automática, pero se utiliza en sistemas de rastreo de proxies como Envoy, Nginx o Istio. Para obtener más información sobre cómo configurar el muestreo para los proxies, consulta [Rastreo de proxies][2].

[1]: https://github.com/DataDog/ddtracecpp/releases/tag/v0.1.0
[2]: /es/tracing/trace_collection/proxy_setup
{{% /tab %}}
{{% tab ".NET" %}}
En el caso de las aplicaciones .NET, configura una frecuencia de muestreo global para la biblioteca mediante la variable de entorno `DD_TRACE_SAMPLE_RATE`. Configure las frecuencias de muestreo de los servicios mediante la variable de entorno `DD_TRACE_SAMPLING_RULES`.

Por ejemplo, para enviar el 50 % de los rastros del servicio denominado «myservice» y el 10 % del resto de los rastros:

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

<div class="alert alert-info">Starting in version 2.35.0, if <a href="/remote_configuration">Agent Remote Configuration</a> is enabled where the service runs, you can set a per-service <code>DD_TRACE_SAMPLE_RATE</code> in the <a href="/tracing/software_catalog">Software Catalog</a> UI.</div>

Configure un límite de frecuencia estableciendo la variable de entorno `DD_TRACE_RATE_LIMIT` con un número de trazas por segundo por instancia de servicio. Si no se ha establecido ningún valor para `DD_TRACE_RATE_LIMIT`, se aplica un límite de 100 trazas por segundo.

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de .NET][1].
Más información sobre [cómo configurar las variables de entorno para .NET][2].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnetcore
[2]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnetcore?tab=registryeditor#configuración_de_las_variables_de_entorno_del_proceso
{{% /tab %}}
{{< /tabs >}}

**Nota**: Todos los tramos de un rastreo muestreado mediante una configuración de biblioteca de rastreo se etiquetan con el motivo de ingestión `rule`. Los servicios configurados con reglas de muestreo definidas por el usuario aparecen marcados como «Configurado» en la columna «Configuración» de la [página de control de ingestión][5].

## Errores y trazas poco frecuentes

En el caso de los rastros que no se recogen mediante el muestreo basado en cabezales, dos mecanismos de muestreo adicionales del agente de Datadog garantizan que se conserven y se incorporen los rastros críticos y diversos. Estos dos muestreadores conservan un conjunto variado de rastros locales (conjunto de tramos procedentes del mismo host) al capturar todas las combinaciones de un conjunto predeterminado de etiquetas:

 **Rastros de errores**: Los errores de muestreo son importantes para detectar posibles fallos del sistema.
 **Trazas poco frecuentes**: El muestreo de trazas poco frecuentes te permite mantener una visión global de tu sistema, garantizando que los servicios y recursos con poco tráfico sigan siendo supervisados.

**Nota**: Los muestreadores de error y los muestreadores poco frecuentes se ignoran en los servicios para los que se hayan definido [reglas de muestreo de bibliotecas](#intracinglibrariesuserdefinedrules).

### Registros de errores
`motivo_de_la_ingestión: error`

El muestreador de errores detecta fragmentos de trazas que contienen intervalos de error que no son detectados por el muestreo basado en el inicio. Captura trazas de error a una velocidad de hasta 10 trazas por segundo (por agente). Garantiza una visibilidad completa de los errores cuando la frecuencia de muestreo basada en el cabezal es baja.

A partir de la versión 7.33 del agente, puedes configurar el muestreador de errores en el archivo de configuración principal del agente (`datadog.yaml`) o mediante variables de entorno:
```
@param errors_per_second - integer - optional - default: 10
@env DD_APM_ERROR_TPS - integer - optional - default: 10
```

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Muestreo por error" style="width:100%;" >}}

**Notas**:
1. Establece el parámetro en `0` para desactivar el muestreador de errores.
2. El muestreador de errores captura trazas locales con intervalos de error a nivel de agente. Si el seguimiento está distribuido, no hay garantía de que se envíe el seguimiento completo a Datadog.
3. De forma predeterminada, los tramos descartados por las reglas de la biblioteca de rastreo o por lógica personalizada, como `manual.drop`, quedan **excluidos** del muestreador de errores.

#### Datadog Agent 7.42.0 y versiones posteriores

El muestreo de errores se puede configurar de forma remota si utilizas la versión [7.42.0][20] del agente o superior. Sigue la [documentación][21] para habilitar la configuración remota en tus agentes. Con la configuración remota, puedes habilitar la recopilación de intervalos poco frecuentes sin necesidad de reiniciar el agente de Datadog.

#### Agente de Datadog 6/7.41.0 y versiones posteriores

Para anular el comportamiento predeterminado y que el muestreador de errores **incluya** los tramos descartados por las reglas de la biblioteca de rastreo o por lógica personalizada, como `manual.drop`, habilita la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el agente de Datadog (o en el contenedor dedicado del agente de rastreo dentro del pod del agente de Datadog en Kubernetes).


#### Agente de Datadog 6/7.33 a 6/7.40.x

El comportamiento predeterminado del muestreo de errores no se puede modificar en estas versiones del agente. Actualiza el agente de Datadog a la versión 6/7.41.0 o superior.


### Rastros poco comunes
`motivo_de_ingestión: poco frecuente`

El muestreador de eventos poco frecuentes envía un conjunto de intervalos poco frecuentes a Datadog. Detecta combinaciones de `env`, `service`, `name`, `resource`, `error.type` y `http.status` a un ritmo de hasta 5 trazas por segundo (por agente). Garantiza la visibilidad de los recursos con poco tráfico cuando la frecuencia de muestreo basada en el cabezal es baja.

**Nota**: El muestreador aleatorio recoge datos locales a nivel de agente. Si el rastreo está distribuido, no hay forma de garantizar que se envíe el rastreo completo a Datadog.

#### Datadog Agent 7.42.0 y versiones posteriores

La frecuencia de muestreo poco habitual se puede configurar de forma remota si utilizas la versión [7.42.0][20] del agente o superior. Sigue la [documentación][21] para habilitar la configuración remota en tus agentes. Gracias a la configuración remota, puedes modificar el valor de los parámetros sin necesidad de reiniciar el agente de Datadog.

#### Agente de Datadog 6/7.41.0 y versiones posteriores

Por defecto, el muestreador de rarezas **no está activado**.

**Nota**: Cuando está **activado**, los tramos descartados por las reglas de la biblioteca de rastreo o por lógica personalizada, como `manual.drop`, quedan **excluidos** de este muestreador.

Para configurar el muestreador de eventos poco frecuentes, actualiza el parámetro `apm_config.enable_rare_sampler` en el archivo de configuración principal del agente (`datadog.yaml`) o mediante la variable de entorno `DD_APM_ENABLE_RARE_SAMPLER`:

```
@params apm_config.enable_rare_sampler - boolean - optional - default: false
@env DD_APM_ENABLE_RARE_SAMPLER - boolean - optional - default: false
```

Para evaluar los intervalos eliminados mediante el seguimiento de las reglas de la biblioteca o de una lógica personalizada, como `manual.drop`,
 Habilita la función con: `DD_APM_FEATURES=error_rare_sample_tracer_drop` en el agente de rastreo.


#### Agente de Datadog 6/7.33 a 6/7.40.x

Por defecto, el muestreador de rareza está activado.

**Nota**: Cuando **está activado**, los tramos descartados por las reglas de la biblioteca de seguimiento o por lógica personalizada, como `manual.drop`, **quedan excluidos** en este muestreador. Para incluir estos intervalos en esta lógica, actualiza a Datadog Agent 6.41.0/7.41.0 o una versión posterior.

Para modificar la configuración predeterminada del muestreador «rare», actualiza el parámetro `apm_config.disable_rare_sampler` en el archivo de configuración principal del agente (`datadog.yaml`) o mediante la variable de entorno `DD_APM_DISABLE_RARE_SAMPLER`:

```
@params apm_config.disable_rare_sampler - boolean - optional - default: false
@env DD_APM_DISABLE_RARE_SAMPLER - boolean - optional - default: false
```

## Forzar mantener y soltar
`motivo_de_ingestión: manual`

El mecanismo de muestreo basado en cabezales se puede anular a nivel de la biblioteca de seguimiento. Por ejemplo, si necesitas supervisar una transacción crítica, puedes forzar que se conserve el seguimiento asociado. Por otro lado, en el caso de información innecesaria o repetitiva, como los controles de estado, puedes forzar que se omita el seguimiento.

 Establece la opción «Manual Keep» en un span para indicar que este y todos sus spans secundarios deben ser incluidos. El seguimiento resultante podría aparecer incompleto en la interfaz de usuario si el intervalo en cuestión no es el intervalo raíz del seguimiento.

 Establece la opción «Manual Drop» en un span para asegurarte de que **ningún** span secundario sea incluido. [Los muestreadores de errores y casos excepcionales](#errorandraretraces) se ignorarán en el agente.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Llevar un registro manualmente:

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

Eliminar manualmente un trazo:

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

Llevar un registro manualmente:

```python```
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    # Always Keep the Trace
    span.set_tag(MANUAL_KEEP_KEY)
    # method impl follows
```

Eliminar manualmente un trazo:

```python```
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

Llevar un registro manualmente:

```ruby```
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.keep! # Affects the active trace
  # Method implementation follows
end
```

Eliminar manualmente un trazo:

```ruby```
Datadog::Tracing.trace(name, options) do |span, trace|
  trace.reject! # Affects the active trace
  # Method implementation follows
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

Llevar un registro manualmente:

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

Eliminar manualmente un trazo:

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

Llevar un registro manualmente:

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// Always keep the trace
span.setTag(tags.MANUAL_KEEP)
//method impl follows

```

Eliminar manualmente un trazo:

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

Llevar un registro manualmente:

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

Eliminar manualmente un trazo:

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


Llevar un registro manualmente:

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

Eliminar manualmente un trazo:

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

Llevar un registro manualmente:

```cpp```
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

Eliminar manualmente un trazo:

```cpp```
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

El registro manual de trazas debe realizarse antes de la propagación del contexto. Si se conserva tras la propagación del contexto, el sistema no puede garantizar que se mantenga el rastro completo en todos los servicios. La retención manual de trazas se configura en la ubicación del cliente, por lo que el agente o el servidor pueden seguir descartando la traza según las reglas de muestreo.


## Tramos únicos
`motivo_de_ingestión: single_span`

Si necesitas tomar una muestra de un tramo concreto, pero no necesitas disponer del seguimiento completo, las bibliotecas de seguimiento te permiten configurar una frecuencia de muestreo específica para un solo tramo.

Por ejemplo, si estás creando [métricas a partir de spans][6] para supervisar servicios específicos, puedes configurar reglas de muestreo de spans para garantizar que estas métricas se basen en el 100 % del tráfico de la aplicación, sin tener que recopilar el 100 % de los rastros de todas las solicitudes que pasan por el servicio.

Esta función está disponible para Datadog Agent v[7.40.0][19] y versiones posteriores.

**Nota**: Las reglas de muestreo de intervalos únicos **no pueden** utilizarse para eliminar intervalos que se mantienen mediante el [muestreo basado en el encabezado](#headbasedsampling), sino únicamente para conservar intervalos adicionales que se eliminan mediante dicho muestreo.

{{< tabs >}}
{{% tab "Java" %}}
A partir de la biblioteca de rastreo [versión 1.7.0][1], para aplicaciones Java, se deben configurar las reglas de muestreo **span** por nombre de servicio y por nombre de operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el 100 % de los spans del servicio denominado «myservice», para la operación «http.request», con un máximo de 50 spans por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Java][2].

[1]: https://github.com/DataDog/ddtracejava/releases/tag/v1.7.0
[2]: /es/tracing/trace_collection/dd_libraries/java
{{% /tab %}}
{{% tab "Python" %}}
A partir de la versión [v1.4.0][1], en las aplicaciones de Python, se deben configurar las reglas de muestreo **span** por nombre de servicio y por nombre de operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los tramos del servicio denominado `myservice`, para la operación `http.request`, con un máximo de `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```


Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Python][2].

[1]: https://github.com/DataDog/ddtracepy/releases/tag/v1.4.0
[2]: /es/tracing/trace_collection/dd_libraries/python
{{% /tab %}}
{{% tab "Rubí" %}}
A partir de la versión [v1.5.0][1], en las aplicaciones Ruby, se deben configurar las reglas de muestreo **span** por nombre de servicio y operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los tramos del servicio denominado `myservice`, para la operación `http.request`, con un máximo de `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Ruby][2].

[1]: https://github.com/DataDog/ddtracerb/releases/tag/v1.5.0
[2]: /es/tracing/trace_collection/dd_libraries/ruby#muestreo
{{% /tab %}}
{{% tab "Go" %}}
A partir de la versión [v1.41.0][1], para las aplicaciones Go, configura las reglas de muestreo **span** por nombre de servicio y por nombre de operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los tramos del servicio denominado `myservice`, para la operación `http.request`, con un máximo de `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```
A partir de la versión [v1.60.0][3], en las aplicaciones Go, se deben configurar las reglas de muestreo **span** por recurso y por etiqueta mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los intervalos de tiempo del servicio para el recurso `POST /api/create_issue`, para la etiqueta `priority` con el valor `high`:

```
@env DD_SPAN_SAMPLING_RULES=[{"resource": "POST /api/create_issue", "tags": { "priority":"high" }, "sample_rate":1.0}]
```

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca Go Tracing][2].

[1]: https://github.com/DataDog/ddtracego/releases/tag/v1.41.0
[2]: /es/tracing/trace_collection/dd_libraries/go
[3]: https://github.com/DataDog/ddtracego/releases/tag/v1.60.0
{{% /tab %}}
{{% tab "Node.js" %}}
En el caso de las aplicaciones Node.js, configura las reglas de muestreo **span** por nombre de servicio y por nombre de operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los tramos del servicio denominado `myservice`, para la operación `http.request`, con un máximo de `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de Node.js][1].

[1]: /es/tracing/trace_collection/dd_libraries/nodejs
{{% /tab %}}
{{% tab "PHP" %}}
A partir de la versión [v0.77.0][1], en las aplicaciones PHP, se deben configurar las reglas de muestreo **span** por nombre de servicio y operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los tramos del servicio denominado `myservice`, para la operación `http.request`, con un máximo de `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de PHP][2].

[1]: https://github.com/DataDog/ddtracephp/releases/tag/0.77.0
[2]: /es/tracing/trace_collection/dd_libraries/php
{{% /tab %}}
{{% tab "C++" %}}
A partir de la versión [v0.1.0][1], en las aplicaciones C++, se deben configurar las reglas de muestreo **span** por nombre de servicio y por nombre de operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los tramos del servicio denominado `myservice`, para la operación `http.request`, con un máximo de `50` tramos por segundo:

```
@env DD_SPAN_SAMPLING_RULES=[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]
```

[1]: https://github.com/DataDog/ddtracecpp/releases/tag/v0.1.0
{{% /tab %}}
{{% tab ".NET" %}}
A partir de la versión [v2.18.0][1], en las aplicaciones .NET, se deben configurar las reglas de muestreo **span** por nombre de servicio y por nombre de operación mediante la variable de entorno `DD_SPAN_SAMPLING_RULES`.

Por ejemplo, para recopilar el `100 %` de los tramos del servicio denominado `myservice`, para la operación `http.request`, con un máximo de `50` tramos por segundo:

```
#using powershell
$env:DD_SPAN_SAMPLING_RULES='[{"service": "my-service", "name": "http.request", "sample_rate":1.0, "max_per_second": 50}]'

#using JSON file   
{
    "DD_SPAN_SAMPLING_RULES": "[{\"service\": \"my-service\", \"name\": \"http.request\", \"sample_rate\": 1.0, \"max_per_second\": 50}]"
}
```

Para obtener más información sobre los controles de muestreo, consulta la [documentación de la biblioteca de rastreo de .NET][2].

[1]: https://github.com/DataDog/ddtracedotnet/releases/tag/v2.18.0
[2]: /es/tracing/trace_collection/dd_libraries/dotnetcore
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"> The <a href="/tracing/legacy_app_analytics/">App Analytics</a> mechanism is fully deprecated. To ingest single spans without the complete trace, use the <a href="/tracing/trace_pipeline/ingestion_mechanisms#single-spans">Single Span sampling</a> configuration. To ingest complete traces, use <a href="/tracing/trace_pipeline/ingestion_mechanisms#head-based-sampling">Head-Based sampling</a> configurations.</div>

## Intervalos de tiempo de ingestión de productos

### RUM Traces
`motivo_de_ingestión:ron`

Una solicitud procedente de una aplicación web o móvil genera un rastreo cuando los servicios de backend están instrumentados. [La integración de APM con Real User Monitoring][7] vincula las solicitudes de las aplicaciones web y móviles con sus correspondientes trazas de backend, lo que te permite ver todos los datos de frontend y backend desde una única perspectiva.

A partir de la versión `4.30.0` del SDK de RUM para navegadores, puedes controlar los volúmenes de datos procesados y conservar una muestra de los rastros del backend configurando el parámetro de inicialización `traceSampleRate`. Establece `traceSampleRate` en un número comprendido entre `0` y `100`.
Si no se establece ningún valor para `traceSampleRate`, se envía a Datadog, por defecto, el 100 % de los trazas procedentes de las solicitudes del navegador.

Del mismo modo, se puede controlar la frecuencia de muestreo de trazas en otros SDK utilizando parámetros similares:

| SDK         | Parámetro             | Versión mínima    |
||||
| Navegador     | `traceSampleRate`     | [v4.30.0][8]       |
| iOS         | `tracingSamplingRate` | [1.11.0][9] _La frecuencia de muestreo se muestra en la página de control de ingestión desde la versión [1.13.0][16]_ |
| Android     | `traceSampleRate`   | [1.13.0][10] _La frecuencia de muestreo se muestra en la página de control de ingestión desde la versión [1.15.0][17]_ |
| Flutter     | `tracingSamplingRate` | [1.0.0][11] |
| React Native | `tracingSamplingRate` | [1.0.0][12] _La tasa de muestreo se muestra en la página de control de ingestión desde la versión [1.2.0][18]_  |

### Huellas sintéticas
`ingestion_reason:synthetics` y `ingestion_reason:syntheticsbrowser`

Las pruebas HTTP y de navegador generan trazas cuando se instrumentan los servicios de backend. [La integración de APM con las pruebas sintéticas][13] vincula tus pruebas sintéticas con los trazas del backend correspondientes. Averigua cuál es la causa principal del problema a partir de una ejecución de prueba que ha fallado, analizando el registro generado por dicha ejecución.

Por defecto, el 100 % de las pruebas sintéticas de HTTP y de navegador generan trazas del backend.

### Otros productos

Hay otros motivos de ingestión que se atribuyen a los intervalos generados por productos específicos de Datadog:

| Producto    | Motivo de la ingestión                    | Descripción del mecanismo de ingestión |
||||
| Sin servidor | `lambda` y `xray`                   | Tus trazas recibidas de las [aplicaciones sin servidor][14] rastreadas con las bibliotecas de rastreo de Datadog o la integración de AWS XRay. |
| Protección de aplicaciones y API     | `appsec`                            | Trazas capturadas desde las bibliotecas de trazado de Datadog y marcadas por [AAP][15] como una amenaza. |
| Observabilidad de datos: Supervisión de trabajos    | `data_jobs`                            | Trazas importadas desde la integración de Datadog Java Tracer con Spark o desde la integración de Databricks. |

## Mecanismos de ingestión en OpenTelemetry
`motivo_de_ingestión:hotel`

Dependiendo de cómo tengas configurados los SDK de OpenTelemetry (ya sea con el OpenTelemetry Collector o con el Datadog Agent), dispones de varias formas de controlar el muestreo de la ingesta. Consulte [Muestreo de ingesta con OpenTelemetry][22] para obtener más información sobre las opciones de muestreo disponibles a nivel del SDK de OpenTelemetry, OpenTelemetry Collector y el agente de Datadog en diversas configuraciones de OpenTelemetry.

## Lecturas recomendadas

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/dd_libraries/
[2]: /es/tracing/trace_pipeline/metrics/
[3]: https://app.datadoghq.com/dash/integration/apm_ingestion_reasons
[4]: /es/tracing/glossary/#tracerootspan
[5]: /es/tracing/trace_pipeline/ingestion_controls/
[6]: /es/tracing/trace_pipeline/generate_metrics/
[7]: /es/supervisión_de_usuarios_reales/correlación_con_otros_datos_de_telemetría/apm/
[8]: https://github.com/DataDog/browsersdk/releases/tag/v4.30.0
[9]: https://github.com/DataDog/ddsdkios/releases/tag/1.11.0
[10]: https://github.com/DataDog/ddsdkandroid/releases/tag/1.13.0
[11]: https://github.com/DataDog/ddsdkflutter/releases/tag/datadog_flutter_plugin%2Fv1.0.0
[12]: https://github.com/DataDog/ddsdkreactnative/releases/tag/1.0.0
[13]: /es/sintéticos/apm/
[14]: /es/serverless/distributed_tracing/
[15]: /es/seguridad/seguridad_de_las_aplicaciones/
[16]: https://github.com/DataDog/ddsdkios/releases/tag/1.13.0
[17]: https://github.com/DataDog/ddsdkandroid/releases/tag/1.15.0
[18]: https://github.com/DataDog/ddsdkreactnative/releases/tag/1.2.0
[19]: https://github.com/DataDog/datadogagent/releases/tag/7.40.0
[20]: https://github.com/DataDog/datadogagent/releases/tag/7.42.0
[21]: /es/tracing/guide/remote_config/
[22]: /es/opentelemetry/guide/ingestion_sampling_with_opentelemetry