---
aliases:
- /es/tracing/llm_observability/sdk/python
- /es/llm_observability/sdk/python
- /es/llm_observability/setup/sdk/python
- /es/llm_observability/setup/sdk/nodejs
- /es/llm_observability/setup/sdk
- /es/llm_observability/setup/sdk/java
- /es/llm_observability/sdk/java
- /es/llm_observability/sdk/
- /es/llm_observability/instrumentation/custom_instrumentation
- /es/tracing/llm_observability/trace_an_llm_application
- /es/llm_observability/setup
description: Documentación de referencia para los Agent Observability SDKs para Python,
  Node.js y Java, que cubre la instrumentación automática y manual.
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Rastree, compare y optimice sus prompts de LLM con Datadog LLM Observability
title: Referencia del Agent Observability SDK
---
## Descripción general {#overview}

Los Agent Observability SDKs proporcionan instrumentación automática, así como APIs de instrumentación manual para brindar observabilidad y conocimientos sobre sus aplicaciones de LLM.

## Configuración {#setup}

### Requisitos {#requirements}

- Una [clave de API de Datadog][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- El paquete `ddtrace` más reciente está instalado (se requiere Python 3.7+):
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- El paquete `dd-trace` más reciente está instalado (se requiere Node.js 16+):
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- Ha descargado el [`dd-trace-java` JAR][1] más reciente. El Agent Observability SDK es compatible con `dd-trace-java` v1.51.0+ (se requiere Java 8+).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuración de línea de comandos" level="h4" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Habilite Agent Observability ejecutando su aplicación mediante el comando `ddtrace-run` y especificando las variables de entorno requeridas.

**Nota**: `ddtrace-run` activa automáticamente todas las integraciones de Agent Observability.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables de entorno para la configuración de línea de comandos {#environment-variables-for-command-line-setup}

`DD_SITE`
: requerido - _cadena_
<br />Sitio de Datadog de destino para el envío de datos de LLM. Su sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: obligatorio - _entero o cadena_
<br />Interruptor para habilitar el envío de datos a Agent Observability. Debe establecerse en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte las [Pautas de nomenclatura de aplicaciones](#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para anular este valor para un tramo raíz determinado, consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, el valor predeterminado es el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `ddtrace==3.14.0`, este es un **campo obligatorio**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es obligatorio si no está utilizando el Datadog Agent, en cuyo caso debe establecerse en `1` o `true`.

`DD_LLMOBS_SAMPLE_RATE`
: opcional - _flotante_ - **predeterminado**: `1.0`
<br />La fracción de trazas retenidas por Agent Observability. Consulte [Muestreo de trazas](#trace-sampling).

`DD_API_KEY`
: opcional - _string_
<br />Su clave de API de Datadog. Solo es necesario si no está utilizando el Datadog Agent.

`DD_MCP_CAPTURE_INTENT`
: opcional - _entero o string_ - **predeterminado**: `false`
<br />Cuando se establece en `1` o `true`, agrega un argumento a cada herramienta de servidor MCP solicitando que el modelo de llamada describa por qué eligió llamar a la herramienta. La intención se registra en el tramo de la herramienta.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}


{{% tab "Node.js" %}}
Habilite Agent Observability ejecutando su aplicación con `NODE_OPTIONS="--import dd-trace/initialize.mjs"` y especificando las variables de entorno requeridas.

**Nota**: `dd-trace/initialize.mjs` activa automáticamente todas las integraciones de APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables de entorno para la configuración de línea de comandos {#environment-variables-for-command-line-setup-1}

`DD_SITE`
: requerido - _cadena_
<br />El sitio de Datadog para enviar sus datos de LLM. Su sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: obligatorio - _entero o cadena_
<br />Interruptor para habilitar el envío de datos a Agent Observability. Debe establecerse en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte las [pautas de nomenclatura de aplicaciones](#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para anular este valor para un tramo raíz determinado, consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, el valor predeterminado es el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `dd-trace@5.66.0`, este es un **campo obligatorio**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es obligatorio si no está utilizando el Datadog Agent, en cuyo caso debe establecerse en `1` o `true`.

`DD_LLMOBS_SAMPLE_RATE`
: opcional - _float_ - **predeterminado**: `1.0`
<br />La fracción de trazas retenidas por Agent Observability. Consulte [Muestreo de trazas](#trace-sampling).

`DD_API_KEY`
: opcional - _string_
<br />Su clave de API de Datadog. Solo es necesario si no está utilizando el Datadog Agent.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Habilite Agent Observability ejecutando su aplicación con `dd-trace-java` y especificando los parámetros requeridos como variables de entorno o propiedades del sistema.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables de entorno y propiedades del sistema {#environment-variables-and-system-properties}

Puede proporcionar los siguientes parámetros como variables de entorno (por ejemplo, `DD_LLMOBS_ENABLED`) o como propiedades del sistema Java (por ejemplo, `dd.llmobs_enabled`).

`DD_SITE` o `dd.site`
: obligatorio - _cadena_
<br />Sitio de Datadog de destino para el envío de datos de LLM. Su sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` o `dd.llmobs.enabled`
: obligatorio - _entero o cadena_
<br />Interruptor para habilitar el envío de datos a Agent Observability. Debe establecerse en `1` o `true`.

`DD_LLMOBS_ML_APP` o `dd.llmobs.ml.app`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte [Pautas de nomenclatura de aplicaciones](#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para anular este valor para un tramo raíz determinado, consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, el valor predeterminado es el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión 1.54.0 de `dd-trace-java`, este es un **campo obligatorio**.

`DD_LLMOBS_AGENTLESS_ENABLED` o `dd.llmobs.agentless.enabled`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es necesario si no está utilizando el Datadog Agent, en cuyo caso esto debe establecerse en `1` o `true`.

`DD_API_KEY` o `dd.api.key`
: opcional - _cadena_
<br />Su clave de API de Datadog. Solo es necesario si no está utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración en el código" level="h4" expanded=false id="in-code-setup" %}}

En lugar de usar [configuración de línea de comandos](#command-line-setup), también puede habilitar Agent Observability mediante programación.

{{< tabs >}}
{{% tab "Python" %}}

Use la función `LLMObs.enable()` para habilitar Agent Observability.

<div class="alert alert-info">
No utilice este método de configuración con el <code>ddtrace-run</code> comando.
</div>

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  site="<YOUR_DATADOG_SITE>",
  agentless_enabled=True,
)
{{< /code-block >}}

##### Parámetros {#parameters}

`ml_app`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte [Pautas de nomenclatura de aplicaciones](#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para anular este valor para una traza determinada, consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, este valor predeterminado es el valor de `DD_LLMOBS_ML_APP`.

`integrations_enabled` - **predeterminado**: `true`
: opcional - _booleano_
<br />Una bandera para habilitar automáticamente el rastreo de llamadas LLM para las [LLM integrations][1] compatibles con Datadog. Si no se proporciona, todas las integraciones de LLM compatibles se habilitan de forma predeterminada. Para evitar el uso de las integraciones de LLM, establezca este valor en `false`.

`agentless_enabled`
: opcional - _booleano_ - **predeterminado**: `false`
<br />Solo es necesario si no está utilizando el Datadog Agent, en cuyo caso esto debe establecerse en `True`. Esto configura la biblioteca `ddtrace` para que no envíe ningún dato que requiera el Datadog Agent. Si no se proporciona, esto toma el valor de `DD_LLMOBS_AGENTLESS_ENABLED` de forma predeterminada.

`site`
: opcional - _cadena_
<br />El sitio de Datadog para enviar sus datos de LLM. Su sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto toma el valor de `DD_SITE` de forma predeterminada.

`api_key`
: opcional - _cadena_
<br />Su clave de API de Datadog. Solo es necesario si no está utilizando el Datadog Agent. Si no se proporciona, esto toma el valor de `DD_API_KEY` de forma predeterminada.

`env`
: opcional - _cadena_
<br />El nombre del entorno de su aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se proporciona, esto toma el valor de `DD_ENV` de forma predeterminada.

`service`
: opcional - _cadena_
<br />El nombre del servicio utilizado para su aplicación. Si no se proporciona, esto toma el valor predeterminado de `DD_SERVICE`.

`sample_rate`
: opcional - _número de punto flotante_
<br />La fracción de trazas retenidas por Agent Observability. Requiere `ddtrace` 4.12.0 o posterior. Cuando se establece, esto tiene prioridad sobre `DD_LLMOBS_SAMPLE_RATE`. Consulte [Muestreo de trazas](#trace-sampling).

`capture_intent`
: opcional - _booleano_ - **predeterminado**: `false`
<br />Cuando se establece en `True`, agrega un argumento a cada herramienta de servidor MCP solicitando que el modelo que realiza la llamada describa por qué eligió llamar a la herramienta. La intención se registra en el tramo de la herramienta. Si no se proporciona, esto toma el valor predeterminado de `DD_MCP_CAPTURE_INTENT`.

[1]: /es/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
No utilice este método de configuración con el <code>dd-trace/initialize.mjs</code> comando.
</div>

Use la función `init()` para habilitar Agent Observability.

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    agentlessEnabled: true,
  },
  site: "<YOUR_DATADOG_SITE>",
  env: "<YOUR_ENV>",
});

const llmobs = tracer.llmobs;
{{< /code-block >}}

**Opciones para la configuración de `llmobs`**

`mlApp`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte [Pautas de nomenclatura de aplicaciones](#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para anular este valor para una traza determinada, consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto toma el valor predeterminado de `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: opcional - _booleano_ - **predeterminado**: `false`
<br />Solo es necesario si no está utilizando el Datadog Agent, en cuyo caso esto debe establecerse en `true`. Esto configura la biblioteca `dd-trace` para que no envíe ningún dato que requiera el Datadog Agent. Si no se proporciona, esto toma el valor predeterminado de `DD_LLMOBS_AGENTLESS_ENABLED`.

`sampleRate`
: opcional - _number_
<br />La fracción de trazas retenidas por Agent Observability. Requiere `dd-trace` 5.110.0 o posterior. Cuando se establece, esto tiene prioridad sobre `DD_LLMOBS_SAMPLE_RATE`. Consulte [Muestreo de trazas](#trace-sampling).

**Opciones para la configuración general del trazador**:

`site`
: opcional - _cadena_
<br />El sitio de Datadog para enviar sus datos de LLM. Su sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto toma el valor de `DD_SITE` de forma predeterminada.

`env`
: opcional - _cadena_
<br />El nombre del entorno de su aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se proporciona, esto toma el valor predeterminado de `DD_ENV`.

`service`
: opcional - _cadena_
<br />El nombre del servicio utilizado para su aplicación. Si no se proporciona, esto toma el valor de `DD_SERVICE` de forma predeterminada.

##### Variables de entorno {#environment-variables}

Establezca los siguientes valores como variables de entorno. No se pueden configurar mediante programación.

`DD_API_KEY`
: opcional - _cadena_
<br />Su clave de API de Datadog. Solo es necesario si no está utilizando el Datadog Agent.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración de AWS Lambda" level="h4" expanded=false id="aws-lambda-setup" %}}

Para instrumentar una función de AWS Lambda existente con Agent Observability, puede usar la Datadog Extension y las capas de lenguaje respectivas.

1. Abra un Cloudshell en la consola de AWS.
2. Instale el cliente CLI de Datadog

```shell
npm install -g @datadog/datadog-ci
```
3. Establezca la clave de API y el sitio de Datadog

```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si ya tiene o prefiere usar un secreto en Secrets Manager, puede establecer la clave de API usando el ARN del secreto:

```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Instale su función Lambda con Agent Observability (esto requiere al menos la versión 77 de la Datadog Extension).
{{< tabs >}}
{{% tab "Python" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Node.js" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Java" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}
{{< /tabs >}}

4. Invoque su función Lambda y verifique que las trazas de Agent Observability sean visibles en la interfaz de usuario de Datadog.

Vacíe manualmente las trazas de Agent Observability usando el método `flush` antes de que la función Lambda regrese.

{{< tabs >}}
{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs
def handler():
  # function body
  LLMObs.flush()
```
{{% /tab %}}

{{% tab "Node.js" %}}

```javascript
import tracer from 'dd-trace';
const llmobs = tracer.llmobs;

export const handler = async (event) => {
  // your function body
  llmobs.flush();
};
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


Después de instalar el SDK y ejecutar su aplicación, debería esperar ver algunos datos en Agent Observability provenientes de la instrumentación automática. La instrumentación manual se puede utilizar para capturar marcos de trabajo personalizados u operaciones de bibliotecas que aún no son compatibles.

## Muestreo de trazas {#trace-sampling}

<div class="alert alert-info">El muestreo de trazas está disponible en el SDK de Python (<code>ddtrace</code> 4.12.0 o posterior) y el SDK de Node.js (<code>dd-trace</code> 5.110.0 o posterior). El SDK de Java no admite el muestreo de trazas.</div>

El muestreo de trazas establece la fracción de trazas que Agent Observability retiene. Debido a que la facturación de Agent Observability se basa en el volumen de tramos que envía, establecer una tasa de muestreo es una forma de controlar su costo de Agent Observability. El SDK toma la decisión de muestreo en el tramo raíz y la aplica a todos los tramos secundarios de ese tramo raíz, incluidos los tramos creados en servicios descendentes a través del [rastreo distribuido](#distributed-tracing).

El muestreo no afecta sus [métricas de Agent Observability](/llm_observability/monitoring/metrics/), incluidas las [métricas de tokens y costos](/llm_observability/monitoring/cost/) y otras métricas operativas. Debido a que los spans no muestreados se descartan después de que Datadog ingiere sus rastreos, estas métricas siguen basándose en el 100% del tráfico instrumentado de su aplicación, independientemente de la tasa de muestreo especificada. El muestreo de trazas también es independiente de los controles en la aplicación, como las [reglas de automatización](/llm_observability/monitoring/automation_rules/) y el [muestreo de trazas de APM](/tracing/trace_pipeline/ingestion_mechanisms/), que se aplican después de la ingestión.

Configure la tasa de muestreo mediante uno de estos dos mecanismos:

- **Variable de entorno** (`DD_LLMOBS_SAMPLE_RATE`): se aplica tanto a la [configuración de línea de comandos](#command-line-setup) como a la [configuración en el código](#in-code-setup).
- **Parámetro en el código** (`sample_rate` en Python, `sampleRate` en Node.js): se pasa a `LLMObs.enable()` en Python, o bajo `llmobs` en Node.js, cuando habilita el SDK con la [configuración en el código](#in-code-setup). Cuando se establece, tiene prioridad sobre `DD_LLMOBS_SAMPLE_RATE`.

La tasa de muestreo es un número de punto flotante entre `0.0` (no retener trazas) y `1.0` (retener todas las trazas). El valor predeterminado es `1.0`. Los valores fuera de rango se ignoran.

{{< tabs >}}
{{% tab "Python" %}}
Establezca la tasa de muestreo con la variable de entorno:

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

O pase `sample_rate` a `LLMObs.enable()`, lo cual tiene prioridad sobre la variable de entorno:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  sample_rate=0.5,
)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Establezca la tasa de muestreo con la variable de entorno:

{{< code-block lang="shell" >}}
DD_LLMOBS_SAMPLE_RATE=0.5 NODE_OPTIONS="--import dd-trace/initialize.mjs" <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

O pase `sampleRate` bajo `llmobs` a `init()`, lo cual tiene prioridad sobre la variable de entorno:

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    sampleRate: 0.5,
  },
});

const llmobs = tracer.llmobs;
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Instrumentación manual {#manual-instrumentation}

{{< tabs >}}
{{% tab "Python" %}}

Para capturar una operación de LLM, se puede utilizar un decorador de funciones para instrumentar flujo de trabajo fácilmente:

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

o un enfoque basado en gestor de contexto para capturar operaciones detalladas:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

with LLMObs.llm(model="gpt-4o"):
    call_llm()
    LLMObs.annotate(
        metrics={
            "input_tokens": ...,
            "output_tokens": ...,
        },
    )
{{< /code-block >}}


Para obtener una lista de los tipos de tramo disponibles, consulte la [documentación de Tipos de Tramo][1]. Para un rastreo más detallado de las operaciones dentro de las funciones, consulte [Rastreo de tramos mediante métodos en línea](#tracing-spans-using-inline-methods).

[1]: /es/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Para rastrear un tramo, utilice `llmobs.wrap(options, function)` como un envoltorio de función para la función que desea rastrear. Para obtener una lista de los tipos de tramo disponibles, consulte la [documentación de Tipos de Tramo][1]. Para un rastreo más detallado de las operaciones dentro de las funciones, consulte [Rastreo de tramos mediante métodos en línea](#tracing-spans-using-inline-methods).

### Tipos de tramos {#span-kinds}

Los tipos de tramos son obligatorios y se especifican en el objeto `options` pasado a las funciones de rastreo `llmobs` (`trace`, `wrap` y `decorate`). Consulte la [documentación de Tipos de Tramo][1] para obtener una lista de los tipos de tramos admitidos.

**Nota:** Los tramos con un tipo de tramo no válido no se envían a Agent Observability.

### Captura automática de argumentos/salida/nombre de función {#automatic-function-argumentoutputname-capturing}

`llmobs.wrap` (junto con [`llmobs.decorate`](#function-decorators-in-typescript) para TypeScript) intenta capturar automáticamente las entradas, las salidas y el nombre de la función que se está rastreando. Si necesita anotar un tramo manualmente, consulte [Enriquecimiento de tramos](#enriching-spans). Las entradas y salidas que usted anote anularán la captura automática. Además, para anular el nombre de la función, pase la propiedad `name` en el objeto de opciones a la función `llmobs.wrap`:

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Condiciones para finalizar un tramo para una función envuelta {#conditions-for-finishing-a-span-for-a-wrapped-function}

`llmobs.wrap` extiende el comportamiento subyacente de [`tracer.wrap`][2]. El tramo subyacente creado cuando se llama a la función se finaliza bajo las siguientes condiciones:

- Si la función devuelve una Promesa, entonces el tramo finaliza cuando la promesa se resuelve o se rechaza.
- Si la función toma una devolución de llamada como su último parámetro, entonces el tramo finaliza cuando se llama a esa devolución de llamada.
- Si la función no acepta una devolución de llamada y no devuelve una Promesa, entonces el tramo finaliza al terminar la ejecución de la función.

El siguiente ejemplo demuestra la segunda condición, donde el último argumento es una devolución de llamada:

#### Ejemplo {#example}

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res, next) {
  const err = ... // user application logic
  // the span for this function is finished when `next` is called
  next(err)
}
myAgentMiddleware = llmobs.wrap({ kind: 'agent' }, myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

Si la aplicación no utiliza la función de devolución de llamada, se recomienda utilizar un bloque de rastreo en línea en su lugar. Consulte [Rastreo de tramos mediante métodos en línea](#tracing-spans-using-inline-methods) para obtener más información.

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res) {
  // the `next` callback is not being used here
  return llmobs.trace({ kind: 'agent', name: 'myAgentMiddleware' }, () => {
    return res.status(200).send('Hello World!')
  })
}

app.use(myAgentMiddleware)

{{< /code-block >}}

[1]: /es/llm_observability/terms/
[2]: /es/tracing/trace_collection/custom_instrumentation/nodejs/dd-api/?tab=wrapper
{{% /tab %}}
{{% tab "Java" %}}

### Inicio de un tramo {#starting-a-span}

Existen múltiples métodos para iniciar un tramo, según el tipo de tramo que esté iniciando. Consulte la [documentación de Tipos de Tramo][1] para obtener una lista de los tipos de tramo admitidos.

Todos los tramos se inician como una instancia de objeto de `LLMObsSpan`. Cada tramo tiene métodos que puede utilizar para interactuar con el tramo y registrar datos.

### Finalización de un tramo {#finishing-a-span}

Los tramos deben finalizar para que la traza se envíe y sea visible en la aplicación de Datadog.

Para finalizar un tramo, llame a `finish()` en una instancia de objeto de tramo. Si es posible, envuelva el tramo en un bloque `try/finally` para asegurarse de que el tramo se envíe incluso si ocurre una excepción.

#### Ejemplo {#example-1}

```java
    try {
        LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", "ml-app-override", "session-141");
        // user logic
        // interact with started span
    } finally {
      workflowSpan.finish();
    }
```

[1]: /es/llm_observability/terms/#span-kinds
{{% /tab %}}
{{< /tabs >}}

### Llamadas a LLM {#llm-calls}

<div class="alert alert-info">Si está utilizando algún proveedor o marco de trabajo de LLM que sea compatible con las <a href="/llm_observability/instrumentation/auto_instrumentation/">integraciones de LLM de Datadog</a>, no necesita iniciar manualmente un tramo de LLM para rastrear estas operaciones.</div>

<div class="alert alert-info">Si está instrumentando manualmente un tramo de LLM, debe registrar los conteos de tokens (como por ejemplo <code>input_tokens</code>, <code>output_tokens</code>, y <code>total_tokens</code>) usted mismo mediante la anotación del tramo. Consulte <a href="#enriching-spans">Enriquecimiento de tramos</a> para obtener más información.</div>

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a un LLM, utilice el decorador de función `ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: obligatorio - _string_
<br/>El nombre del LLM invocado.

`name`
: opcional - _string_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`model_provider`
: opcional - _string_ - **predeterminado**: `"custom"`
<br />El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `model_provider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`session_id`
: opcional - _string_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`ml_app`
: opcional - _string_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-2}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(prompt):
    completion = ... # user application logic to invoke LLM
    LLMObs.annotate(
        input_data=[{"role": "user", "content": prompt}],
        output_data=[{"role": "assistant", "content": completion}],
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
    )
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear una llamada a un LLM, especifique el tipo de tramo como `llm` y, opcionalmente, especifique los siguientes argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: opcional - _string_ - **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: opcional - _string_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`modelProvider`
: opcional - _string_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`sessionId`
: opcional - _string_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional - _string_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-3}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: prompt }],
    outputData: [{ role: "assistant", content: completion }],
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear una llamada a un LLM, importe y llame al siguiente método con los argumentos enumerados a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: opcional - _string_
<br/>El nombre de la operación. Si no se proporciona, `spanName` toma como valor predeterminado el tipo de tramo.

`modelName`
: opcional - _string_ - **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`modelProvider`
: opcional - _string_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`mlApp`
: opcional - _string_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

`sessionId`
: opcional - _string_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-4}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "total_tokens", 955
    ));
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Flujo de trabajo {#workflows}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un tramo de flujo de trabajo, utilice el decorador de función `ddtrace.llmobs.decorators.workflow()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: opcional - _string_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-5}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Para rastrear un tramo de flujo de trabajo, especifique el tipo de tramo como `workflow` y, opcionalmente, especifique los argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-6}

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear un tramo de flujo de trabajo, importe y llame al siguiente método con los argumentos enumerados a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` toma como valor predeterminado el tipo de tramo.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-7}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String executeWorkflow() {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", null, "session-141");
    String workflowResult = workflowFn(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return workflowResult;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Agentes {#agents}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear la ejecución de un agente, utilice el decorador de función `ddtrace.llmobs.decorators.agent()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.
{{% /collapse-content %}}

#### Ejemplo {#example-8}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear la ejecución de un agente, especifique el tipo de tramo como `agent` y, opcionalmente, especifique los argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-9}

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear la ejecución de un agente, importe y llame al siguiente método con los argumentos enumerados a continuación

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` toma como valor predeterminado el nombre de la función rastreada.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Llamadas a herramientas {#tool-calls}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a una herramienta, utilice el decorador de función `ddtrace.llmobs.decorators.tool()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-10}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear una llamada a una herramienta, especifique el tipo de tramo como `tool` y, opcionalmente, especifique los argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-11}

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear una llamada a una herramienta, importe y llame al siguiente método con los argumentos enumerados a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` toma como valor predeterminado el nombre de la función rastreada.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para obtener más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tareas {#tasks}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un tramo de tarea, utilice el decorador de función `LLMObs.task()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-12}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear un tramo de tarea, especifique el tipo de tramo como `task` y, opcionalmente, especifique los argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-13}

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear un tramo de tarea, importe y llame al siguiente método con los argumentos enumerados a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` toma como valor predeterminado el nombre de la función rastreada.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulte [Traza de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Incrustaciones {#embeddings}

{{< tabs >}}
{{% tab "Python" %}}
Para trazar una operación de incrustación, utilice el decorador de función `LLMObs.embedding()`.

**Nota**: La anotación de la entrada de un tramo de incrustación requiere un formato diferente al de otros tipos de tramo. Consulte [Enriquecimiento de tramos](#enriching-spans) para obtener más detalles sobre cómo especificar las entradas de incrustación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: obligatorio - _cadena_
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece en el nombre de la función trazada.

`model_provider`
: opcional - _cadena_ - **predeterminado**: `"custom"`

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-14}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear una operación de incrustación, especifique el tipo de tramo como `embedding` y, opcionalmente, especifique los argumentos en el objeto de opciones.

**Nota**: La anotación de la entrada de un tramo de incrustación requiere un formato diferente al de otros tipos de tramo. Consulte [Enriquecimiento de tramos](#enriching-spans) para obtener más detalles sobre cómo especificar las entradas de incrustación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece en el nombre de la función rastreada.

`modelProvider`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-15}

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{< /tabs >}}

### Recuperaciones {#retrievals}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un tramo de recuperación, utilice el decorador de función `ddtrace.llmobs.decorators.retrieval()`.

**Nota**: La anotación de la salida de un tramo de recuperación requiere un formato diferente al de otros tipos de tramos. Consulte [Enriquecimiento de tramos](#enriching-spans) para obtener más detalles sobre cómo especificar las salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-16}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import retrieval

@retrieval
def get_relevant_docs(question):
    context_documents = ... # user application logic
    LLMObs.annotate(
        input_data=question,
        output_data = [
            {"id": doc.id, "score": doc.score, "text": doc.text, "name": doc.name} for doc in context_documents
        ]
    )
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Para rastrear un tramo de recuperación, especifique el tipo de tramo como `retrieval` y, opcionalmente, especifique los siguientes argumentos en el objeto de opciones.

**Nota**: La anotación de la salida de un tramo de recuperación requiere un formato diferente al de otros tipos de tramos. Consulte [Enriquecimiento de tramos](#enriching-spans) para obtener más detalles sobre cómo especificar las salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` toma como valor predeterminado el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para obtener más información.

{{% /collapse-content %}}

#### Ejemplo {#example-17}

A continuación también se incluye un ejemplo de cómo anotar un tramo. Consulte [Enriquecimiento de tramos](#enriching-spans) para obtener más información.

{{< code-block lang="javascript" >}}
function getRelevantDocs (question) {
  const contextDocuments = ... // user application logic
  llmobs.annotate({
    inputData: question,
    outputData: contextDocuments.map(doc => ({
      id: doc.id,
      score: doc.score,
      text: doc.text,
      name: doc.name
    }))
  })
  return
}
getRelevantDocs = llmobs.wrap({ kind: 'retrieval' }, getRelevantDocs)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Anidación de tramos {#nesting-spans}

Iniciar un nuevo tramo antes de que finalice el tramo actual rastrea automáticamente una relación padre-hijo entre los dos tramos. El tramo padre representa la operación más grande, mientras que el tramo hijo representa una suboperación anidada más pequeña dentro de ella.

{{< tabs >}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # performs data extraction on the document
    return

@task
def preprocess_document(document):
    ... # preprocesses a document for data extraction
    return
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
function preprocessDocument (document) {
  ... // preprocesses a document for data extraction
  return
}
preprocessDocument = llmobs.wrap({ kind: 'task' }, preprocessDocument)

function extractData (document) {
  preprocessDocument(document)
  ... // performs data extraction on the document
  return
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)
{{< /code-block >}}
{{% /tab %}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;

public class MyJavaClass {
  public void preprocessDocument(String document) {
  LLMObsSpan taskSpan = LLMObs.startTaskSpan("preprocessDocument", null, "session-141");
   ...   // preprocess document for data extraction
   taskSpan.annotateIO(...); // record the input and output
   taskSpan.finish();
  }

  public String extractData(String document) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("extractData", null, "session-141");
    preprocessDocument(document);
    ... // perform data extraction on the document
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
  }
}

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## Enriquecimiento de tramos {#enriching-spans}

<div class="alert alert-info">
El <code>metrics</code> El parámetro aquí se refiere a valores numéricos adjuntos como atributos en tramos individuales, no a <a href="/llm_observability/monitoring/metrics/">métricas de la plataforma Datadog</a>. Para ciertas claves reconocidas como <code>input_tokens</code>, <code>output_tokens</code>, y <code>total_tokens</code>, Datadog utiliza estos atributos de tramo para generar las métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.tokens</code>) para su uso en tableros y monitores.
</div>

{{< tabs >}}
{{% tab "Python" %}}
El SDK proporciona el método `LLMObs.annotate()` para enriquecer los tramos con entradas, salidas y metadatos.

El método `LLMObs.annotate()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h3" expanded=false id="annotating-span-arguments" %}}

`span`
: opcional - _tramo_ - **predeterminado**: el tramo activo actual
<br />El tramo que se va a anotar. Si `span` no se proporciona (como al usar decoradores de funciones), el SDK anota el tramo activo actual.

`input_data`
: opcional - _Tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para tramos que no son LLM) o una lista de diccionarios con este formato: `{"content": \"...\", \"role\": \"...\", \"tool_calls\": ..., \"tool_results\": ..., \"audio_parts\": ..., \"image_parts\": ...}`, donde `"tool_calls"` son una lista opcional de diccionarios de llamadas a herramientas con las claves requeridas: `"name"`, `"arguments"`, y las claves opcionales: `"tool_id"`, `"type"`, y `"tool_results"` son una lista opcional de diccionarios de resultados de herramientas con la clave requerida: `"result"`, y las claves opcionales: `"name"`, `"tool_id"`, `"type"` para escenarios de llamada a funciones. `"audio_parts"` y `"image_parts"` son listas opcionales de diccionarios de medios para tramos multimodales, cada una con un `"mime_type"` requerido y exactamente uno de `"content"` (medios codificados en base64, incluidos en línea) o `"attachment_key"`. **Nota**: Los tramos de incrustación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "..."}`.

`output_data`
: opcional - _Tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para tramos que no son LLM) o una lista de diccionarios con este formato: `{"content": "...", "role": "...", "tool_calls": ..., "audio_parts": ..., "image_parts": ...}`, donde `"tool_calls"` son una lista opcional de diccionarios de llamadas a herramientas con las claves requeridas: `"name"`, `"arguments"`, y las claves opcionales: `"tool_id"`, `"type"` para escenarios de llamada a funciones. `"audio_parts"` y `"image_parts"` son listas opcionales de diccionarios de medios para tramos multimodales, cada una con un `"mime_type"` requerido y exactamente uno de `"content"` (medios codificados en base64, incluidos en línea) o `"attachment_key"`. **Nota**: Los tramos de recuperación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: opcional - _lista de diccionarios_
<br />Lista de diccionarios de definición de herramientas para escenarios de llamada a funciones. Cada definición de herramienta debe tener una clave `"name": "..."` obligatoria y claves `"description": "..."` y `"schema": {...}` opcionales.

`metadata`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante para la operación de entrada o salida descrita por el tramo (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional - _diccionario_
<br />Un diccionario de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes para la operación descrita por el tramo (`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token`, etc.). La unidad para `time_to_first_token` está en segundos, similar a la métrica `duration` que se emite de forma predeterminada.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el tramo. Claves de ejemplo: `session`, `env`, `system` y `version`. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`cost_tags`
: opcional - _lista de cadenas_
<br />Una lista de claves de etiqueta (ya establecidas con `tags` o anotadas previamente en el mismo tramo) para propagar como etiquetas personalizadas en las métricas de costo y tokens de LLM generadas. Las entradas que no hacen referencia a una clave de etiqueta existente se omiten. Consulte [Monitoreo de costos](#cost-monitoring) para obtener más detalles.

{{% /collapse-content %}}

#### Ejemplo {#example-18}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import embedding, llm, retrieval, workflow

@llm(model_name="model_name", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        span=None,
        input_data=[{"role": "user", "content": "Hello world!"}],
        output_data=[{"role": "assistant", "content": "How can I help?"}],
        metadata={"temperature": 0, "max_tokens": 200},
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
        tags={"host": "host_name"},
    )
    return resp

@workflow
def extract_data(document):
    resp = llm_call(document)
    LLMObs.annotate(
        input_data=document,
        output_data=resp,
        tags={"host": "host_name"},
    )
    return resp

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data={"text": "Hello world!"},
        output_data=[0.0023064255, -0.009327292, ...],
        metrics={"input_tokens": 4},
        tags={"host": "host_name"},
    )
    return

@retrieval(name="get_relevant_docs")
def similarity_search():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data="Hello world!",
        output_data=[{"text": "Hello world is ...", "name": "Hello, World! program", "id": "document_id", "score": 0.9893}],
        tags={"host": "host_name"},
    )
    return

@llm(model_name="gpt-realtime", model_provider="openai")
def voice_turn(user_audio_bytes):
    import base64
    resp = ... # multimodal (audio) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "Hey, how are you?",  # transcript of the input audio
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(user_audio_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[
            {
                "role": "assistant",
                "content": "Hey! I'm doing great, thanks for asking. How about you?",
                "audio_parts": [
                    {"mime_type": "audio/wav", "content": base64.b64encode(resp.audio_bytes).decode("utf-8")}
                ],
            }
        ],
    )
    return resp

@llm(model_name="gpt-4o", model_provider="openai")
def describe_image(image_bytes):
    import base64
    resp = ... # multimodal (vision) llm call here
    LLMObs.annotate(
        span=None,
        input_data=[
            {
                "role": "user",
                "content": "What is in this image?",
                "image_parts": [
                    {"mime_type": "image/png", "content": base64.b64encode(image_bytes).decode("utf-8")}
                ],
            }
        ],
        output_data=[{"role": "assistant", "content": "The image shows a golden retriever puppy."}],
    )
    return resp

{{< /code-block >}}

Los mensajes anotados con `audio_parts` o `image_parts` se muestran como reproductores de audio e imágenes integrados en la visualización de traza:

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Un tramo de LLM en la visualización de traza de Agent Observability. El mensaje de entrada del usuario muestra un reproductor de audio integrado con la transcripción 'Hey, how are you?', y el mensaje de salida del asistente muestra un control de 'Click to play audio' con la transcripción 'Hey!'. Estoy muy bien, gracias por preguntar. ¿Y usted?" style="width:100%;" >}}

{{< img src="llm_observability/instrumentation/image_example.png" alt="Un tramo de LLM en la visualización de traza de Agent Observability. El mensaje de entrada del usuario muestra el aviso 'What is in this image?' con una foto integrada de un cachorro negro, y el mensaje de salida del asistente lo describe como un cachorro de Labrador Retriever negro sobre una superficie de madera." style="width:100%;" >}}

{{% /tab %}}

{{% tab "Node.js" %}}
El SDK proporciona el método `llmobs.annotate()` para anotar tramos con entradas, salidas y metadatos.

El método `LLMObs.annotate()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h3" expanded=false id="annotating-span-arguments" %}}
`span`
: opcional - _tramo_ - **predeterminado**: el tramo activo actual
<br />El tramo que se va a anotar. Si no se proporciona `span` (como al usar envoltorios de funciones), el SDK anota el tramo activo actual.

`annotationOptions`
: obligatorio - _objeto_
<br />Un objeto de diferentes tipos de datos con el cual anotar el tramo.

El objeto `annotationOptions` puede contener lo siguiente:

`inputData`
: opcional - _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para tramos que no son de LLM) o una lista de diccionarios con este formato: `{role: \"...\", content: \"...\", audioParts: [...], imageParts: [...]}` (para tramos de LLM). `audioParts` y `imageParts` son listas opcionales de objetos multimedia para tramos multimodales, cada una con un `mimeType` obligatorio y exactamente uno de `content` (medios codificados en base64, incluidos en línea) o `attachmentKey`. **Nota**: Los tramos de incrustación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "..."}`.

`outputData`
: opcional - _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para tramos que no son de LLM) o una lista de objetos con este formato: `{role: "...", content: "...", audioParts: [...], imageParts: [...]}` (para tramos de LLM). `audioParts` y `imageParts` son listas opcionales de objetos multimedia para tramos multimodales, cada una con un `mimeType` requerido y exactamente uno de `content` (medios codificados en base64, incluidos en línea) o `attachmentKey`. **Nota**: Los tramos de recuperación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante para la operación de entrada o salida descrita por el tramo (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional - _objeto_
<br />Un objeto de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes para la operación descrita por el tramo (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas relacionadas con el contexto del tramo (`session`, `environment`, `system`, `versioning`, etc.). Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`costTags`
: opcional - _arreglo de cadenas_
<br />Una lista de claves de etiqueta (ya establecidas con `tags` o anotadas previamente en el mismo span) para propagar como etiquetas personalizadas en las métricas de costo y tokens de LLM generadas. Las entradas que no hacen referencia a una clave de etiqueta existente se omiten. Consulte [Monitoreo de costos](#cost-monitoring) para obtener detalles.

{{% /collapse-content %}}

#### Ejemplo {#example-19}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: "Hello world!" }],
    outputData: [{ role: "assistant", content: "How can I help?" }],
    metadata: { temperature: 0, max_tokens: 200 },
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 },
    tags: { host: "host_name" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind:'llm', modelName: 'modelName', modelProvider: 'modelProvider' }, llmCall)

function extractData (document) {
  const resp = llmCall(document)
  llmobs.annotate({
    inputData: document,
    outputData: resp,
    tags: { host: "host_name" }
  })
  return resp
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)

function performEmbedding () {
  ... // user application logic
  llmobs.annotate(
    undefined, { // this can be set to undefined or left out entirely
      inputData: { text: "Hello world!" },
      outputData: [0.0023064255, -0.009327292, ...],
      metrics: { input_tokens: 4 },
      tags: { host: "host_name" }
    }
  )
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)

function similaritySearch () {
  ... // user application logic
  llmobs.annotate(undefined, {
    inputData: "Hello world!",
    outputData: [{ text: "Hello world is ...", name: "Hello, World! program", id: "document_id", score: 0.9893 }],
    tags: { host: "host_name" }
  })
  return
}
similaritySearch = llmobs.wrap({ kind: 'retrieval', name: 'getRelevantDocs' }, similaritySearch)

function voiceTurn (userAudioBytes) {
  const resp = ... // multimodal (audio) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "Hey, how are you?", // transcript of the input audio
        audioParts: [{ mimeType: "audio/wav", content: userAudioBytes.toString("base64") }]
      }
    ],
    outputData: [
      {
        role: "assistant",
        content: "Hey! I'm doing great, thanks for asking. How about you?",
        audioParts: [{ mimeType: "audio/wav", content: resp.audioBuffer.toString("base64") }]
      }
    ]
  })
  return resp
}
voiceTurn = llmobs.wrap({ kind: 'llm', modelName: 'gpt-audio', modelProvider: 'openai' }, voiceTurn)

function describeImage (imageBytes) {
  const resp = ... // multimodal (vision) llm call here
  llmobs.annotate({
    inputData: [
      {
        role: "user",
        content: "What is in this image?",
        imageParts: [{ mimeType: "image/png", content: imageBytes.toString("base64") }]
      }
    ],
    outputData: [{ role: "assistant", content: "The image shows a golden retriever puppy." }]
  })
  return resp
}
describeImage = llmobs.wrap({ kind: 'llm', modelName: 'gpt-4o', modelProvider: 'openai' }, describeImage)

{{< /code-block >}}

Los mensajes anotados con `audioParts` o `imageParts` se muestran como reproductores de audio integrados y como imágenes en el trace view:

{{< img src="llm_observability/instrumentation/audio_example.png" alt="Un tramo de LLM en el Agent Observability trace view. El mensaje de entrada del USUARIO muestra un reproductor de audio integrado con la transcripción 'Hey, how are you?', y el mensaje de salida del ASISTENTE muestra un control de 'Click to play audio' con la transcripción 'Hey! Estoy muy bien, gracias por preguntar. ¿Y usted?" style="width:100%;" >}}

{{< img src="llm_observability/instrumentation/image_example.png" alt="Un tramo de LLM en la visualización de Agent Observability trace. El mensaje de entrada del USUARIO muestra el aviso 'What is in this image?' con una foto integrada de un cachorro negro, y el mensaje de salida del ASISTENTE lo describe como un cachorro de Labrador Retriever negro sobre una superficie de madera." style="width:100%;" >}}

Para las finalizaciones de chat de audio de OpenAI, `audioParts` también se capturan automáticamente mediante [las integraciones de LLM de Datadog](/llm_observability/instrumentation/auto_instrumentation/); no se requiere anotación manual. A diferencia de `audioParts`, `imageParts` no se capturan automáticamente actualmente y deben anotarse manualmente; la captura automática está planificada para una versión futura.

{{% /tab %}}
{{% tab "Java" %}}
El SDK proporciona varios métodos para anotar tramos con entradas, salidas, métricas y metadatos.

### Anotación de entradas y salidas {#annotating-inputs-and-outputs}

Utilice el método de miembro `annotateIO()` de la interfaz `LLMObsSpan` para agregar datos de entrada y salida estructurados a un `LLMObsSpan`. Esto incluye argumentos opcionales y objetos de mensaje LLM.

#### Argumentos {#arguments}

Si un argumento es nulo o está vacío, no sucede nada. Por ejemplo, si `inputData` es una cadena no vacía mientras que `outputData` es nulo, entonces solo se registra `inputData`.

`inputData`
: opcional - _String_ o _List<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para tramos que no son LLM) o una lista de `LLMObs.LLMMessage` para tramos LLM.

`outputData`
: opcional - _String_ o _List<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para tramos que no son LLM) o una lista de `LLMObs.LLMMessage` para tramos LLM.

#### Mensajes LLM {#llm-messages}
Los tramos LLM deben anotarse con mensajes LLM utilizando el objeto `LLMObs.LLMMessage`.

El objeto `LLMObs.LLMMessage` puede instanciarse llamando a `LLMObs.LLMMessage.from()` con los siguientes argumentos:

`role`
: obligatorio - _String_
<br />Una cadena que describe el rol del autor del mensaje.

`content`
: obligatorio - _String_
<br />Una cadena que contiene el contenido del mensaje.

#### Ejemplo {#example-20}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String systemMessage = "You are a helpful assistant";
    Response chatResponse = ... // user application logic to invoke LLM
    llmSpan.annotateIO(
      Arrays.asList(
        LLMObs.LLMMessage.from("user", userInput),
        LLMObs.LLMMessage.from("system", systemMessage)
      ),
      Arrays.asList(
        LLMObs.LLMMessage.from(chatResponse.role, chatResponse.content)
      )
    );
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Agregar métricas {#adding-metrics}

#### Agregar métricas de forma masiva {#bulk-add-metrics}

El método miembro `setMetrics()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar varias métricas de forma masiva:

##### Argumentos {#arguments-1}

`metrics`
: obligatorio - _Map<String, Number>_
<br /> Un mapa de claves serializables en JSON y valores numéricos que los usuarios pueden agregar para registrar métricas relevantes para la operación descrita por el tramo (por ejemplo, `input_tokens`, `output_tokens` o `total_tokens`).

#### Agregar una sola métrica {#add-a-single-metric}

El método miembro `setMetric()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una sola métrica:

##### Argumentos {#arguments-2}

`key`
: obligatorio - _CharSequence_
<br /> El nombre de la métrica.

`value`
: obligatorio - _int_, _long_ o _double_
<br /> El valor de la métrica.

#### Ejemplos {#examples}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "time_per_output_token", 0.1773
    ));
    llmSpan.setMetric("total_tokens", 955);
    llmSpan.setMetric("time_to_first_token", 0.23);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Agregar etiquetas {#adding-tags}

Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas][1].

#### Agregar etiquetas de forma masiva {#bulk-add-tags}

El método miembro `setTags()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar varias etiquetas de forma masiva:

##### Argumentos {#arguments-3}

`tags`
: obligatorio - _Map<String, Object>_
<br /> Un mapa de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas para describir el contexto del tramo (por ejemplo, `session`, `environment`, `system` o `version`).

#### Agregar una sola etiqueta {#add-a-single-tag}

El método miembro `setTag()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una sola etiqueta:

##### Argumentos {#arguments-4}

`key`
: obligatorio - _String_
<br /> La clave de la etiqueta.

`value`
: obligatorio - _int_, _long_, _double_, _boolean_ o _String_
<br /> El valor de la etiqueta.

#### Ejemplos {#examples-1}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setTags(Map.of(
      "chat_source", "web",
      "users_in_chat", 3
    ));
    llmSpan.setTag("is_premium_user", true);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### Anotación de errores {#annotating-errors}

#### Agregar un Throwable (recomendado) {#adding-a-throwable-recommended}

El método miembro `addThrowable()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para adjuntar un throwable con una traza de pila:

##### Argumentos {#arguments-5}

`throwable`
: obligatorio - _Throwable_
<br /> El throwable/excepción que ocurrió.

#### Agregar un mensaje de error {#adding-an-error-message}

El método miembro `setErrorMessage()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para adjuntar una cadena de error:

##### Argumentos {#arguments-6}

`errorMessage`
: obligatorio - _String_
<br /> El mensaje del error.

#### Configuración de una bandera de error {#setting-an-error-flag}

El método miembro `setError()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para indicar un error en la operación:

##### Argumentos {#arguments-7}

`error`
: obligatorio - _booleano_
<br /> `true` si el tramo dio error.

#### Ejemplos {#examples-2}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();
    }
    return chatResponse;
  }
}
```

### Anotación de metadatos {#annotating-metadata}

El método miembro `setMetadata()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos:

`metadata`
: obligatorio - _Map<String, Object>_
<br />Un mapa de pares clave-valor serializables en JSON que contiene metadatos relevantes para la operación de entrada o salida descrita por el tramo.

#### Ejemplo {#example-21}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    llmSpan.setMetadata(
      Map.of(
        "temperature", 0.5,
        "is_premium_member", true,
        "class", "e1"
      )
    );
    String chatResponse = ... // user application logic to invoke LLM
    return chatResponse;
  }
}
```

[1]: /es/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

### Anotación de tramos auto-instrumentados {#annotating-auto-instrumented-spans}

{{< tabs >}}
{{% tab "Python" %}}

El método `LLMObs.annotation_context()` del SDK devuelve un administrador de contexto que puede utilizarse para modificar todos los tramos auto-instrumentados iniciados mientras el contexto de anotación está activo.

El método `LLMObs.annotation_context()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: opcional - _str_
<br />Nombre que sobrescribe el nombre del tramo para cualquier tramo auto-instrumentado que se inicie dentro del contexto de anotación.

`prompt`
: opcional - _diccionario_
<br />Un diccionario que representa el prompt utilizado para una llamada a un LLM. Consulte la documentación del [objeto Prompt](#prompt-tracking-arguments) para ver el esquema completo y las claves admitidas. También puede importar el objeto `Prompt` desde `ddtrace.llmobs.utils` y pasarlo como el argumento `prompt`. **Nota**: Este argumento solo se aplica a los tramos de LLM.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden añadir como etiquetas en el tramo. Claves de ejemplo: `session`, `env`, `system` y `version`. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`cost_tags`
: opcional - _lista de strings_
<br />Una lista de etiquetas clave para propagar como etiquetas personalizadas en las métricas de costo y tokens del LLM generado. Cada entrada debe hacer referencia a una clave presente en `tags` al inicio del tramo (proporcionada al mismo contexto o a un contexto principal); las claves de etiqueta añadidas posteriormente con `LLMObs.annotate()` no se conservan. Consulte [Monitoreo de costos](#cost-monitoring) para obtener más detalles.

{{% /collapse-content %}}

#### Ejemplo {#example-22}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def rag_workflow(user_question):
    context_str = retrieve_documents(user_question).join(" ")

    with LLMObs.annotation_context(
        prompt = Prompt(
            id="chatbot_prompt",
            version="1.0.0",
            template="Please answer the question using the provided context: {{question}}\n\nContext:\n{{context}}",
            variables={
                "question": user_question,
                "context": context_str,
            }
        ),
        tags = {
            "retrieval_strategy": "semantic_similarity"
        },
        name = "augmented_generation"
    ):
        completion = openai_client.chat.completions.create(...)
    return completion.choices[0].message.content

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

El `llmobs.annotationContext()` del SDK acepta una función de callback que puede utilizarse para modificar todos los tramos auto-instrumentados iniciados mientras se está dentro del contexto de la función de callback.

El método `llmobs.annotationContext()` acepta las siguientes opciones en el primer argumento:

{{% collapse-content title="Opciones" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: opcional - _str_
<br />Nombre que sobrescribe el nombre del tramo para cualquier tramo auto-instrumentado que se inicie dentro del contexto de anotación.

`tags`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden añadir como etiquetas en el tramo. Claves de ejemplo: `session`, `env`, `system` y `version`. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`costTags`
: opcional - _lista de strings_
<br />Una lista de etiquetas clave para propagar como etiquetas personalizadas en las métricas de costo y tokens del LLM generado. Cada entrada debe hacer referencia a una clave presente en `tags` al inicio del tramo (proporcionada al mismo contexto o a un contexto principal); las claves de etiqueta agregadas posteriormente con `llmobs.annotate()` no se conservan. Consulte [Monitoreo de costos](#cost-monitoring) para obtener detalles.

{{% /collapse-content %}}

#### Ejemplo {#example-23}

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function ragWorkflow(userQuestion) {
    const contextStr = retrieveDocuments(userQuestion).join(" ");

    const completion = await llmobs.annotationContext({
      tags: {
        retrieval_strategy: "semantic_similarity"
      },
      name: "augmented_generation"
    }, async () => {
      const completion = await openai_client.chat.completions.create(...);
      return completion.choices[0].message.content;
    });
}

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Seguimiento de prompts {#prompt-tracking}

Adjunte metadatos estructurados del prompt al tramo de LLM para que pueda reproducir resultados, auditar cambios y comparar el rendimiento del prompt entre versiones. Al usar plantillas, Agent Observability también proporciona [seguimiento de versiones](#version-tracking) basado en cambios en el contenido de la plantilla.

{{< tabs >}}
{{% tab "Python" %}}
Use `LLMObs.annotation_context(prompt=...)` para adjuntar metadatos del prompt antes de la llamada al LLM. Para obtener más detalles sobre la anotación de tramos, consulte [Enriquecimiento de tramos](#enriching-spans).

#### Argumentos {#arguments-8}

{{% collapse-content title="Argumentos" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: obligatorio - diccionario
<br />Un diccionario tipado que sigue el esquema de Prompt a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h5" expanded=false id="prompt-structure" %}}

Claves admitidas:

- `id` (str): Identificador lógico para este prompt. Debe ser único por `ml_app`. El valor predeterminado es `{ml_app}-unnamed_prompt`
- `version` (str): Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Consulte [seguimiento de versiones](#version-tracking) para obtener más detalles.
- `variables` (Dict[str, str]): Variables utilizadas para completar los marcadores de posición de la plantilla.
- `template` (str): Cadena de plantilla con marcadores de posición (por ejemplo, `"Translate {{text}} a {{lang}}\"`).
- `chat_template` (List[Message]): Forma de plantilla de mensajes múltiples. Proporcione una lista de objetos `{ "role": "<role>", "content": "<template string with placeholders>" }`.
- `tags` (Dict[str, str]): Etiquetas para adjuntar a la ejecución del prompt.
- `rag_context_variables` (List[str]): Claves de variables que contienen contenido de verdad fundamental/contexto. Se utiliza para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `rag_query_variables` (List[str]): Claves de variables que contienen la consulta del usuario. Se utiliza para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).

{{% /collapse-content %}}

#### Ejemplo: prompt de plantilla única {#example-single-template-prompt}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def answer_question(text):
    # Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    with LLMObs.annotation_context(prompt={
        "id": "translation-template",
        "version": "1.0.0",
        "chat_template": [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        "variables": {"lang": "fr", "text": text},
        "tags": {"team": "nlp"}
    }):
        # Example provider call (replace with your client)
        completion = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"Translate to fr: {text}"}]
        )
    return completion
{{< /code-block >}}

#### Ejemplo: plantillas de prompt de LangChain {#example-langchain-prompt-templates}

Cuando utilice la creación de plantillas de prompt de LangChain con auto-instrumentación, asigne plantillas a variables con nombres significativos. La auto-instrumentación utiliza estos nombres para identificar los prompts.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Use `llmobs.annotationContext({ prompt: ... }, () => { ... })` para adjuntar metadatos del prompt antes de la llamada al LLM. Para obtener más detalles sobre la anotación de tramos, consulte [Enriquecimiento de tramos](#enriching-spans).

#### Argumentos {#arguments-9}

{{% collapse-content title="Opciones" level="h5" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requerido - objeto
<br />Un objeto que sigue el esquema de Prompt a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h5" expanded=false id="prompt-structure" %}}

Propiedades admitidas:

- `id` (string): Identificador lógico para este prompt. Debe ser único por `ml_app`. El valor predeterminado es `{ml_app}-unnamed_prompt`
- `version` (string): Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Consulte [seguimiento de versiones](#version-tracking) para obtener más detalles.
- `variables` (Record<string, string>): Variables utilizadas para completar los marcadores de posición de la plantilla.
- `template` (string | List[Message]): Cadena de plantilla con marcadores de posición (por ejemplo, `"Translate {{text}} a {{lang}}\"`). Alternatively, a list of `{ \"role\": \"<role>\", \"content\": \"<template string with placeholders>\" }` objetos.
- `tags` (Record<string, string>): Etiquetas para adjuntar a la ejecución del prompt.
- `contextVariables` (string[]): Claves de variables que contienen contenido de verdad fundamental/contexto. Se utiliza para la [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `queryVariables` (string[]): Claves de variables que contienen la consulta del usuario. Se utiliza para la [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).

{{% /collapse-content %}}

#### Ejemplo: prompt de plantilla única {#example-single-template-prompt-1}

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function answerQuestion(text) {
    // Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    return llmobs.annotationContext({
      prompt: {
        id: "translation-template",
        version: "1.0.0",
        chat_template: [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        variables: {"lang": "fr", "text": text},
        tags: {"team": "nlp"}
      }
    }, () => {
      // Example provider call (replace with your client)
      return openaiClient.chat.completions.create({
          model: "gpt-4o",
          messages: [{"role": "user", "content": f"Translate to fr: {text}"}]
        });
    });
}
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

#### Notas {#notes}
- La anotación de un prompt solo está disponible en tramos de LLM.
- Coloque la anotación inmediatamente antes de la llamada al proveedor para que se aplique al tramo de LLM correcto.
- Utilice un prompt único `id` para distinguir diferentes prompts dentro de su aplicación.
- Mantenga las plantillas estáticas utilizando la sintaxis de marcador de posición (como `{{variable_name}}`) and define dynamic content in the `sección de variables`.
- Para múltiples llamadas de LLM auto-instrumentadas dentro de un bloque, utilice un contexto de anotación para aplicar los mismos metadatos de prompt en todas las llamadas. Consulte [Anotación de tramos auto-instrumentados](#annotating-auto-instrumented-spans).

### Seguimiento de versiones {#version-tracking}

Agent Observability proporciona control de versiones automático para sus prompts cuando no se especifica una versión explícita. Cuando usted proporciona un `template` o `chat_template` en los metadatos de su prompt sin una etiqueta `version`, el sistema genera automáticamente una versión calculando un hash del contenido de la plantilla. Si usted proporciona una etiqueta `version`, Agent Observability utiliza la etiqueta de versión que usted especificó en lugar de generar una automáticamente.

El sistema de control de versiones funciona de la siguiente manera:
- **Control de versiones automático**: Cuando no se proporciona una etiqueta `version`, Agent Observability calcula un hash del contenido de `template` o `chat_template` para generar automáticamente un identificador de versión numérico
- **Control de versiones manual**: Cuando se proporciona una etiqueta `version`, Agent Observability utiliza la etiqueta de versión que usted especificó exactamente como se proporcionó
- **Historial de versiones**: Tanto las versiones generadas automáticamente como las manuales se mantienen en el historial de versiones para rastrear la evolución del prompt a lo largo del tiempo

Esto le brinda la flexibilidad de confiar en la gestión automática de versiones basada en los cambios del contenido de la plantilla, o mantener el control total sobre el control de versiones con sus propias etiquetas de versión.

## Captura de intención de MCP {#mcp-intent-capture}

Para obtener información sobre por qué se llamaron sus herramientas MCP, habilite la captura de intención en su servidor MCP. Cuando está habilitado, el SDK agrega un argumento a cada herramienta del servidor MCP solicitando que el modelo que realiza la llamada describa por qué eligió llamar a la herramienta. La intención se registra en el tramo de la herramienta, lo que le ayuda a mejorar sus definiciones y descripciones de herramientas.

{{< tabs >}}
{{% tab "Python" %}}

Habilite la captura de intención de MCP con la variable de entorno `DD_MCP_CAPTURE_INTENT`:

{{< code-block lang="shell" >}}
DD_MCP_CAPTURE_INTENT=1 DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

O bien, habilítela mediante programación con el parámetro `capture_intent` en `LLMObs.enable()`:

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  capture_intent=True,
)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Monitoreo de costos{#cost-monitoring}
Adjunte métricas de tokens (para el seguimiento automático de costos) o métricas de costos (para el seguimiento manual de costos) a sus tramos de LLM/embedding. Las métricas de tokens permiten a Datadog calcular los costos utilizando los precios del proveedor, mientras que las métricas de costos le permiten proporcionar sus propios precios cuando utiliza modelos personalizados o no compatibles. Para obtener más detalles, consulte [Costos][14].

Si utiliza la instrumentación automática, las métricas de tokens y costos aparecen en sus tramos automáticamente. Si está instrumentando manualmente, siga la guía a continuación.

<div class="alert alert-info">En este contexto, "métricas de tokens" y "métricas de costos" se refieren a pares clave-valor numéricos que usted adjunta a los tramos a través del <code>metrics</code> parámetro del <code>LLMObs.annotate()</code> método. Estos son distintos de las <a href="/llm_observability/monitoring/metrics/">métricas de Agent Observability de la plataforma Datadog</a>. Para claves reconocidas como <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code>, y <code>output_cost</code>, Datadog utiliza estos atributos de tramo para generar métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.cost</code>) para su uso en tableros y monitores.</div>

### Caso de uso: Uso de un proveedor de modelos común{#use-case-using-a-common-model-provider}
Datadog admite proveedores de modelos comunes como OpenAI, Azure OpenAI, Anthropic y Google Gemini. Al usar estos proveedores, solo necesita anotar su solicitud de LLM con el nombre del modelo, el proveedor del modelo y el uso de tokens. Datadog calcula automáticamente el costo estimado según los precios del proveedor.

Para obtener más información sobre lo que representa cada token y cómo los calcula Datadog, consulte [Cómo se calculan los conteos de tokens][16].

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate token metrics
    LLMObs.annotate(
        metrics={
          "input_tokens": 50,
          "output_tokens": 120,
          "total_tokens": 170,
          "non_cached_input_tokens": 13,  # optional
          "cache_read_input_tokens": 22,  # optional
          "cache_write_input_tokens": 15, # optional
        },
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_tokens: 50,
      output_tokens: 120,
      total_tokens: 170,
      non_cached_input_tokens: 13,  // optional
      cache_read_input_tokens: 22,  // optional
      cache_write_input_tokens: 15  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "gpt-5.1", "openai", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_tokens", 50,
      "output_tokens", 120,
      "total_tokens", 170,
      "non_cached_input_tokens", 13,  // optional
      "cache_read_input_tokens", 22,  // optional
      "cache_write_input_tokens", 15  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Caso de uso: Uso de un modelo personalizado{#use-case-using-a-custom-model}
Para modelos personalizados o no compatibles, debe anotar el tramo manualmente con los datos de costo en dólares.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="custom_model", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate cost metrics
    LLMObs.annotate(
        metrics={
          "input_cost": 3,
          "output_cost": 7,
          "total_cost": 10,
          "non_cached_input_cost": 1,    # optional
          "cache_read_input_cost": 0.6,  # optional
          "cache_write_input_cost": 1.4, # optional
        },
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: {
      input_cost: 3,
      output_cost: 7,
      total_cost: 10,
      non_cached_input_cost: 1,    // optional
      cache_read_input_cost: 0.6,  // optional
      cache_write_input_cost: 1.4  // optional
    }
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'custom_model', modelProvider: 'model_provider' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;
import java.util.Map;

public class MyJavaClass {
  public String llmCall(String prompt) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("llm-call", "custom_model", "model_provider", null, null);
    String resp = ... // llm call here
    llmSpan.setMetrics(Map.of(
      "input_cost", 3,
      "output_cost", 7,
      "total_cost", 10,
      "non_cached_input_cost", 1,    // optional
      "cache_read_input_cost", 0.6,  // optional
      "cache_write_input_cost", 1.4  // optional
    ));
    llmSpan.finish();
    return resp;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Adición de etiquetas personalizadas a las métricas de costo y tokens{#adding-custom-tags-to-cost-and-tokens-metrics}
De forma predeterminada, las métricas de costo y tokens de LLM incluyen un conjunto fijo de etiquetas predeterminadas como `model_name`, `model_provider` y `ml_app`. Para desglosar el gasto en LLM por atributos específicos de su aplicación (como equipo, cliente o función), marque un subconjunto de las claves de etiqueta existentes del tramo para propagarlas a esas métricas como etiquetas personalizadas. Para ver casos de uso de ejemplo como tableros y monitores personalizados, consulte [Etiquetas personalizadas en métricas de tokens y métricas de costos][15].

Cada entrada debe ser una cadena y debe hacer referencia a una clave ya proporcionada a través del parámetro `tags` del tramo en el momento en que se aplica la anotación. Al anotar un solo tramo, la clave puede proporcionarse a través de `tags` en la misma llamada de anotación o en una anotación anterior en el mismo tramo. Al usar un contexto de anotación, solo califican las claves presentes en `tags` al inicio del tramo; las claves agregadas posteriormente mediante anotaciones de tramo individuales no se conservan. Las entradas que no hacen referencia a una clave de etiqueta existente se omiten.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        metrics={"input_tokens": 50, "output_tokens": 120, "total_tokens": 170},
        tags={"team": "nlp", "customer_tier": "enterprise", "host": "host_name"},
        cost_tags=["team", "customer_tier"],
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const resp = ... // llm call here
  llmobs.annotate({
    metrics: { input_tokens: 50, output_tokens: 120, total_tokens: 170 },
    tags: { team: 'nlp', customer_tier: 'enterprise', host: 'host_name' },
    costTags: ['team', 'customer_tier']
  })
  return resp
}
llmCall = llmobs.wrap({ kind: 'llm', modelName: 'gpt-5.1', modelProvider: 'openai' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

También puede propagar etiquetas de esta manera a través de un contexto de anotación para aplicarlas a todos los tramos auto-instrumentados iniciados dentro del contexto.

{{< tabs >}}
{{% tab "Python" %}}

{{< code-block lang="python" >}}
with LLMObs.annotation_context(
    tags={"team": "nlp", "customer_tier": "enterprise"},
    cost_tags=["team", "customer_tier"],
):
    resp = ... # llm call here
{{< /code-block >}}

{{% /tab %}}
{{% tab "Node.js" %}}

{{< code-block lang="javascript" >}}
llmobs.annotationContext({
  tags: { team: 'nlp', customer_tier: 'enterprise' },
  costTags: ['team', 'customer_tier']
}, () => {
  const resp = ... // llm call here
})
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Evaluaciones{#evaluations}

El SDK de Agent Observability proporciona métodos para exportar y enviar sus evaluaciones a Datadog.

<div class="alert alert-info">Para crear evaluadores reutilizables basados en clases (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) con metadatos de resultados enriquecidos, consulte la <a href="/llm_observability/guide/evaluation_developer_guide/">Guía para desarrolladores de evaluaciones</a>.</div>

Las evaluaciones deben unirse a un único tramo. Puede identificar el tramo de destino utilizando cualquiera de estos dos métodos:
- _Unión basada en etiquetas_ - Una evaluación utilizando un par clave-valor de etiqueta único que se establece en un único tramo. La evaluación no podrá unirse si el par clave-valor de la etiqueta coincide con múltiples tramos o con ningún tramo.
- _Referencia directa al tramo_ - Una evaluación utilizando la combinación única del ID de traza y el ID de tramo.

### Exportación de un tramo {#exporting-a-span}
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` se puede utilizar para extraer el contexto de tramo de un tramo. Este método es útil para asociar su evaluación con el tramo correspondiente.

#### Argumentos {#arguments-10}
El método `LLMObs.export_span()` acepta el siguiente argumento:

`span`
: opcional - _Span_
<br />El tramo del cual extraer el contexto de tramo (IDs de tramo y de traza). Si no se proporciona (como cuando se utilizan decoradores de funciones), el SDK exporta el tramo activo actual.

#### Ejemplo {#example-24}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
`llmobs.exportSpan()` se puede utilizar para extraer el contexto de tramo de un tramo. Necesitará utilizar este método para asociar su evaluación con el tramo correspondiente.

#### Argumentos {#arguments-11}

El método `llmobs.exportSpan()` acepta el siguiente argumento:

`span`
: opcional - _Span_
<br />El tramo del cual extraer el contexto de tramo (IDs de tramo y de traza). Si no se proporciona (como cuando se utilizan envoltorios de funciones), el SDK exporta el tramo activo actual.

#### Ejemplo {#example-25}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### Envío de evaluaciones {#submitting-evaluations}

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` se puede usar para enviar su evaluación personalizada asociada con un tramo determinado.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> está obsoleta y se eliminará en la próxima versión principal de ddtrace (4.0). Para migrar, cambie el nombre de sus <code>LLMObs.submit_evaluation_for</code> llamadas con <code>LLMObs.submit_evaluation</code>.</div>

**Nota**: Las evaluaciones personalizadas son evaluadores que usted mismo implementa y aloja. Estas difieren de las evaluaciones listas para usar, que Datadog calcula automáticamente mediante evaluadores integrados. Para configurar evaluaciones listas para usar para su aplicación, utilice la página [**Agent Observability** > **Settings** > **Evaluations**][1] en Datadog.

El método `LLMObs.submit_evaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: obligatorio - _cadena_
<br />El nombre de la evaluación.

`metric_type`
: obligatorio - _cadena_
<br />El tipo de evaluación. Debe ser `categorical`, `score`, `boolean` o `json`.

`value`
: obligatorio - _cadena, tipo numérico o dict_
<br />El valor de la evaluación. Debe ser una cadena (`metric_type==categorical`), un entero/flotante (`metric_type==score`), un booleano (`metric_type==boolean`) o un diccionario (`metric_type==json`).

`span`
: opcional - _diccionario_
<br />Un diccionario que identifica de forma única el tramo asociado con esta evaluación. Debe contener `span_id` (cadena) y `trace_id` (cadena). Use [`LLMObs.export_span()`](#exporting-a-span) para generar este diccionario.

`span_with_tag_value`
: opcional - _diccionario_
<br />Un diccionario que identifica de forma única el tramo asociado con esta evaluación. Debe contener `tag_key` (cadena) y `tag_value` (cadena).

   **Nota**: Se requiere exactamente uno de `span` o `span_with_tag_value`. Proporcionar ambos, o ninguno, genera un ValueError.

`ml_app`
: obligatorio - _cadena_
<br />El nombre de la aplicación de ML.

`timestamp_ms`
: opcional - _entero_
<br />La marca de tiempo unix en milisegundos cuando se generó el resultado de la métrica de evaluación. Si no se proporciona, esto toma el tiempo actual por defecto.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor de cadena que los usuarios pueden agregar como etiquetas con respecto a la evaluación. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`assessment`
: opcional - _cadena_
<br />Una evaluación de esta evaluación. Los valores aceptados son `pass` y `fail`.

`reasoning`
: opcional - _cadena_
<br />Una explicación de texto del resultado de la evaluación.

`metadata`
: opcional - _diccionario_
<br />Un diccionario que contiene metadatos estructurados arbitrarios asociados con el resultado de la evaluación.
{{% /collapse-content %}}

#### Ejemplo {#example-26}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via a tag key-value pair
    msg_id = get_msg_id()
    LLMObs.annotate(
        tags = {'msg_id': msg_id}
    )

    LLMObs.submit_evaluation(
        span_with_tag_value = {
            "tag_key": "msg_id",
            "tag_value": msg_id
        },
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span_context = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )
    return completion
{{< /code-block >}}

[1]: https://app.datadoghq.com/llm/evaluations

{{% /tab %}}

{{% tab "Node.js" %}}

`llmobs.submitEvaluation()` se puede usar para enviar su evaluación personalizada asociada con un tramo determinado.

El método `llmobs.submitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: obligatorio - _diccionario_
<br />El contexto del tramo con el que asociar la evaluación. Este debe ser el resultado de `LLMObs.export_span()`.

`evaluationOptions`
: obligatorio - _objeto_
<br />Un objeto de los datos de evaluación.

El objeto `evaluationOptions` puede contener lo siguiente:

`label`
: obligatorio - _cadena_
<br />El nombre de la evaluación.

`metricType`
: obligatorio - _cadena_
<br />El tipo de la evaluación. Debe ser uno de \"categorical\", \"score\", \"boolean\" o \"json\".

`value`
: obligatorio - _cadena o tipo numérico_
<br />El valor de la evaluación. Debe ser una cadena (para `metric_type` categórica), un número (para `metric_type` puntuación), un booleano (para `metric_type` booleano) o un objeto JSON (para `metric_type` json).

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor de cadena que los usuarios pueden agregar como etiquetas relacionadas con la evaluación. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`assessment`
: opcional - _cadena_
<br />Una evaluación de esta evaluación. Los valores aceptados son `pass` y `fail`.

`reasoning`
: opcional - _cadena_
<br />Una explicación textual del resultado de la evaluación.

`metadata`
: opcional - _diccionario_
<br />Un objeto JSON que contiene metadatos estructurados arbitrarios asociados con el resultado de la evaluación.
{{% /collapse-content %}}

#### Ejemplo {#example-27}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  llmobs.submitEvaluation(spanContext, {
    label: "harmfulness",
    metricType: "score",
    value: 10,
    tags: { evaluationProvider: "ragas" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

[1]: /es/getting_started/tagging/
{{% /tab %}}
{{% tab "Java" %}}

Utilice `LLMObs.SubmitEvaluation()` para enviar su evaluación personalizada asociada con un tramo determinado.

El método `LLMObs.SubmitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: obligatorio - _LLMObsSpan_
<br />El contexto del tramo con el que asociar la evaluación.

`label`
: obligatorio - _Cadena_
<br />El nombre de la evaluación.

`categoricalValue` o `scoreValue`
: obligatorio - _cadena_ o _doble_
<br />El valor de la evaluación. Debe ser una cadena (para evaluaciones categóricas) o un doble (para evaluaciones de puntuación).

`tags`
: opcional - _Mapa<Cadena, Objeto>_
<br />Un diccionario de pares clave-valor de cadena utilizados para etiquetar la evaluación. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).
{{% /collapse-content %}}

#### Ejemplo {#example-28}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();

      // submit evaluations
      LLMObs.SubmitEvaluation(llmSpan, "toxicity", "toxic", Map.of("language", "english"));
      LLMObs.SubmitEvaluation(llmSpan, "f1-similarity", 0.02, Map.of("provider", "f1-calculator"));
    }
    return chatResponse;
  }
}
{{< /code-block >}}

[1]: /es/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

### Envío de comentarios del usuario final {#submitting-end-user-feedback}

La retroalimentación del usuario final captura la entrada de los usuarios de su aplicación LLM, como calificaciones de pulgar hacia arriba o hacia abajo, si un usuario aceptó el cambio de un agente y comentarios de texto libre. A diferencia de una evaluación, la retroalimentación incluye la identidad de quien la envía y puede dirigirse a un tramo, una traza, una sesión o una entidad definida por el cliente. Para obtener más información, consulte [Retroalimentación del usuario final](/llm_observability/evaluations/end_user_feedback/).

{{< tabs >}}
{{% tab "Python" %}}
Use `LLMObs.submit_feedback()` para enviar retroalimentación del usuario final asociada con un tramo, traza, sesión o entidad definida por el cliente.

El método `LLMObs.submit_feedback()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
: obligatorio - _cadena_
<br />El nombre de la métrica de retroalimentación. No debe contener un `.`.

`metric_type`
: obligatorio - _cadena_
<br />El tipo de retroalimentación. Debe ser `categorical`, `score`, `boolean`, `json` o `text`.

`value`
: obligatorio - _cadena, tipo numérico, booleano o dict_
<br />El valor de la retroalimentación. Debe ser una cadena (`metric_type==categorical` o `metric_type==text`), un número entero o de punto flotante (`metric_type==score`), un booleano (`metric_type==boolean`) o un dict (`metric_type==json`).

`submitter`
: obligatorio - _diccionario_
<br />Un diccionario que identifica quién envió la retroalimentación. Debe contener un `id` (cadena) que no esté vacío y puede contener un `type` (cadena) opcional, como `user`.

`span`
: opcional - _diccionario_
<br />Un diccionario que identifica el tramo asociado con esta retroalimentación. Use [`LLMObs.export_span()`](#exporting-a-span) para generar este diccionario.

`span_id`
: opcional - _cadena_
<br />El ID del tramo asociado con esta retroalimentación.

`trace_id`
: opcional - _cadena_
<br />El ID de la traza asociada con esta retroalimentación.

`session_id`
: opcional - _cadena_
<br />El ID de la sesión asociado con esta retroalimentación.

`feedback_join_key`
: opcional - _cadena_
<br />Una clave definida por el cliente asociada con esta retroalimentación, como un ID de incidente o un ID de ticket. Para conectar la retroalimentación a sus tramos, primero anótelos con una etiqueta `feedback_join_key` que contenga el mismo valor. Consulte [Enriquecimiento de tramos](#enriching-spans).

   **Nota**: Se requiere exactamente uno de `span`, `span_id`, `trace_id`, `session_id` o `feedback_join_key`. Proporcionar más de uno, o ninguno, genera un `ValueError`.

`ml_app`
: opcional - _cadena_
<br />El nombre de la aplicación de ML. Si no se proporciona, se utiliza de forma predeterminada la aplicación de ML configurada para el SDK.

`timestamp_ms`
: opcional - _entero_
<br />La marca de tiempo Unix en milisegundos cuando se generó la retroalimentación. Si no se proporciona, esto toma el tiempo actual por defecto.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor de cadena que los usuarios pueden agregar como etiquetas con respecto a la retroalimentación. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`assessment`
: opcional - _cadena_
<br />Una evaluación de esta retroalimentación. Los valores aceptados son `pass` y `fail`.

`reasoning`
: opcional - _cadena_
<br />Una explicación textual de la retroalimentación.
{{% /collapse-content %}}

#### Ejemplo {#example-29}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)

    # submitting feedback for a trace
    LLMObs.submit_feedback(
        label="thumbs",
        metric_type="categorical",
        value="down",
        submitter={"id": "user-123", "type": "user"},
        trace_id=span_context["trace_id"],
        assessment="fail",
    )

    # connecting the span to a customer-defined entity
    LLMObs.annotate(tags={"feedback_join_key": "incident-123"})

    # submitting feedback for that entity
    LLMObs.submit_feedback(
        label="user_comment",
        metric_type="text",
        value="The investigation missed the customer impact.",
        submitter={"id": "user-123", "type": "user"},
        feedback_join_key="incident-123",
    )
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Use `llmobs.submitFeedback()` para enviar retroalimentación del usuario final asociada con un tramo, traza, sesión o entidad definida por el cliente.

El método `llmobs.submitFeedback()` acepta un objeto de opciones con las siguientes propiedades:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label`
: obligatorio - _cadena_
<br />El nombre de la métrica de retroalimentación. No debe contener un `.`.

`metricType`
: obligatorio - _cadena_
<br />El tipo de retroalimentación. Debe ser uno de `categorical`, `score`, `boolean`, `json` o `text`.

`value`
: obligatorio - _cadena, número, booleano u objeto_
<br />El valor de la retroalimentación. Debe ser una cadena (para los tipos de métrica `categorical` y `text`), un número (para `score`), un booleano (para `boolean`) o un objeto JSON (para `json`).

`submitter`
: obligatorio - _objeto_
<br />Un objeto que identifica quién envió los comentarios. Debe contener un `id` (cadena) que no esté vacío y puede contener un `type` (cadena) opcional, como `user`.

`span`
: opcional - _objeto_
<br />El contexto del tramo al que se adjuntará la retroalimentación. Esto debe ser el resultado de [`llmobs.exportSpan()`](#exporting-a-span).

`spanId`
: opcional - _cadena_
<br />El ID del tramo al que se adjuntarán los comentarios.

`traceId`
: opcional - _cadena_
<br />El ID de la traza al que se adjuntarán los comentarios.

`sessionId`
: opcional - _cadena_
<br />El ID de la sesión a la que se adjuntará la retroalimentación.

`feedbackJoinKey`
: opcional - _cadena_
<br />Una clave definida por el cliente a la que se adjuntará la retroalimentación, como un ID de incidente o un ID de ticket. Establezca la misma clave en sus tramos para conectar la retroalimentación con ellos.

   **Nota**: Se requiere exactamente uno de `span`, `spanId`, `traceId`, `sessionId` o `feedbackJoinKey`. Proporcionar más de uno, o ninguno, genera un error.

`mlApp`
: opcional - _cadena_
<br />El nombre de la aplicación de ML. Si no se proporciona, se utiliza de forma predeterminada la aplicación de ML configurada para el SDK.

`timestampMs`
: opcional - _número_
<br />La marca de tiempo Unix en milisegundos en la que se generó la retroalimentación. Si no se proporciona, esto toma el tiempo actual por defecto.

`tags`
: opcional - _objeto_
<br />Un objeto de pares clave-valor de cadena que los usuarios pueden agregar como etiquetas relacionadas con la retroalimentación. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`assessment`
: opcional - _cadena_
<br />Una evaluación de esta retroalimentación. Los valores aceptados son `pass` y `fail`.

`reasoning`
: opcional - _cadena_
<br />Una explicación textual de la retroalimentación.
{{% /collapse-content %}}

#### Ejemplo {#example-30}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()

  // submitting feedback for a trace
  llmobs.submitFeedback({
    label: 'thumbs',
    metricType: 'boolean',
    value: true,
    submitter: { id: 'user-123', type: 'user' },
    traceId: spanContext.traceId,
    assessment: 'pass'
  })

  // connecting the span to a customer-defined entity
  llmobs.annotate({
    tags: { feedback_join_key: 'incident-123' }
  })

  // submitting feedback for that entity
  llmobs.submitFeedback({
    label: 'user_comment',
    metricType: 'text',
    value: 'This answer was helpful.',
    submitter: { id: 'user-123', type: 'user' },
    feedbackJoinKey: 'incident-123'
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Use `LLMObs.submitFeedback()` para enviar retroalimentación del usuario final asociada con un tramo, traza, sesión o entidad definida por el cliente. Cree la retroalimentación con `LLMObs.Feedback.builder()`.

El generador acepta los siguientes métodos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-feedback-arguments" %}}
`label(String label)`
: obligatorio
<br />El nombre de la métrica de retroalimentación. No debe contener un `.`.

`categoricalValue(String)`, `scoreValue(double)`, `booleanValue(boolean)`, `jsonValue(Map<String, Object>)` o `textValue(String)`
: obligatorio
<br />El valor de la retroalimentación. Establezca exactamente uno de estos métodos, el cual también determina el tipo de métrica.

`submitter(String id, String type)` o `submitter(Submitter submitter)`
: obligatorio
<br />Identifica al usuario que envió la retroalimentación. El `id` debe ser una cadena no vacía. El `type` es un calificador opcional, como `user`.

`span(LLMObsSpan span)`, `spanId(String)`, `traceId(String)`, `sessionId(String)` o `feedbackJoinKey(String)`
: obligatorio
<br />La entidad a la cual adjuntar la retroalimentación. Establezca exactamente uno de estos métodos. Use `feedbackJoinKey` para una entidad definida por el cliente, como un ID de incidente o un ID de ticket, y establezca la misma clave en sus tramos para conectar la retroalimentación con ellos.

`mlApp(String mlApp)`
: opcional
<br />El nombre de la aplicación de ML. Si no se proporciona, esto toma como valor predeterminado la aplicación de ML configurada para el tracer.

`timestampMs(long timestampMs)`
: opcional
<br />La marca de tiempo Unix en milisegundos cuando se generó la retroalimentación. Si no se proporciona, esto toma el tiempo actual por defecto.

`tags(Map<String, Object> tags)` o `tag(String key, Object value)`
: opcional
<br />Pares clave-valor utilizados para etiquetar la retroalimentación. Para obtener más información sobre las etiquetas, consulte [Introducción a las etiquetas](/getting_started/tagging/).

`assessment(Assessment assessment)`
: opcional
<br />Una evaluación de la retroalimentación. Los valores aceptados son `LLMObs.Feedback.Assessment.PASS` y `LLMObs.Feedback.Assessment.FAIL`.

`reasoning(String reasoning)`
: opcional
<br />Una explicación de texto de la retroalimentación.
{{% /collapse-content %}}

**Nota**: `LLMObs.submitFeedback()` valida la retroalimentación y arroja un `IllegalArgumentException` cuando Agent Observability está habilitado y la retroalimentación no es válida, como cuando falta el usuario que envió la retroalimentación. Cuando Agent Observability está deshabilitada, o el Agent no está conectado, la llamada es una operación nula.

#### Ejemplo {#example-31}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      // connecting the span to a customer-defined entity
      llmSpan.setTag("feedback_join_key", "incident-123");
      llmSpan.finish();

      // submitting feedback for a trace
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .traceId(llmSpan.getTraceId().toString())
              .label("thumbs")
              .booleanValue(true)
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.PASS)
              .reasoning("answered the question")
              .build());

      // submitting feedback for that entity
      LLMObs.submitFeedback(
          LLMObs.Feedback.builder()
              .feedbackJoinKey("incident-123")
              .label("user_comment")
              .textValue("The answer missed the customer impact.")
              .submitter("user-123", "end_user")
              .assessment(LLMObs.Feedback.Assessment.FAIL)
              .build());
    }
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Procesamiento de tramo {#span-processing}

Para modificar los datos de entrada y salida en los tramos, puede configurar una función de procesador. La función de procesador tiene acceso a las etiquetas del tramo para permitir la modificación condicional de entrada y salida. Las funciones de procesador pueden devolver el tramo modificado para emitirlo, o devolver `None`/`null` para evitar que el tramo se emita por completo. Esto es útil para filtrar tramos que contienen datos confidenciales o que cumplen con ciertos criterios.

{{< tabs >}}
{{% tab "Python" %}}

### Ejemplo {#example-32}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_output") == "true":
        for message in span.output:
            message["content"] = ""
    return span


# If using LLMObs.enable()
LLMObs.enable(
  ...
  span_processor=redact_processor,
)
# else when using `ddtrace-run`
LLMObs.register_processor(redact_processor)

with LLMObs.llm("invoke_llm_with_no_output"):
    LLMObs.annotate(tags={"no_output": "true"})
{{< /code-block >}}


### Ejemplo: modificación condicional con instrumentación automática {#example-conditional-modification-with-auto-instrumentation}

Al usar instrumentación automática, el tramo no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en tramos instrumentados automáticamente, `annotation_context()` se puede usar además de un procesador de tramos.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_input") == "true":
        for message in span.input:
            message["content"] = ""
    return span

LLMObs.register_processor(redact_processor)


def call_openai():
    with LLMObs.annotation_context(tags={"no_input": "true"}):
        # make call to openai
        ...
{{< /code-block >}}

### Ejemplo: evitar que se emitan tramos {#example-preventing-spans-from-being-emitted}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan
from typing import Optional

def filter_processor(span: LLMObsSpan) -> Optional[LLMObsSpan]:
    # Skip spans that are marked as internal or contain sensitive data
    if span.get_tag("internal") == "true" or span.get_tag("sensitive") == "true":
        return None  # This span will not be emitted

    # Process and return the span normally
    return span

LLMObs.register_processor(filter_processor)

# This span will be filtered out and not sent to Datadog
with LLMObs.workflow("internal_workflow"):
    LLMObs.annotate(tags={"internal": "true"})
    # ... workflow logic
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

### Ejemplo {#example-33}

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function redactProcessor(span) {
  if (span.getTag("no_output") === "true") {
    for (const message of span.output) {
      message.content = ""
    }
  }
  return span
}

llmobs.registerProcessor(redactProcessor)
{{< /code-block >}}

### Ejemplo: modificación condicional con instrumentación automática {#example-conditional-modification-with-auto-instrumentation-1}

Al usar instrumentación automática, el tramo no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en tramos instrumentados automáticamente, `llmobs.annotationContext()` se puede usar además de un procesador de tramos.

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function redactProcessor(span) {
  if (span.getTag("no_input") == "true") {
    for (const message of span.input) {
      message.content = "";
    }
  }

  return span;
}

llmobs.registerProcessor(redactProcessor);

async function callOpenai() {
  await llmobs.annotationContext({ tags: { no_input: "true" } }, async () => {
    // make call to openai
  });
}
{{< /code-block >}}

### Ejemplo: evitar que se emitan tramos {#example-preventing-spans-from-being-emitted-1}

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function filterProcessor(span) {
  // Skip spans that are marked as internal or contain sensitive data
  if (span.getTag("internal") === "true" || span.getTag("sensitive") === "true") {
    return null  // This span will not be emitted
  }

  // Process and return the span normally
  return span
}

llmobs.registerProcessor(filterProcessor)

// This span will be filtered out and not sent to Datadog
function internalWorkflow() {
  return llmobs.trace({ kind: 'workflow', name: 'internalWorkflow' }, (span) => {
    llmobs.annotate({ tags: { internal: "true" } })
    // ... workflow logic
  })
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Seguimiento de sesiones de usuario {#tracking-user-sessions}

El seguimiento de sesiones le permite asociar múltiples interacciones con un usuario determinado.

{{< tabs >}}
{{% tab "Python" %}}
Al iniciar un tramo raíz para una nueva traza o tramo en un nuevo proceso, especifique el argumento `session_id` con el ID de cadena de la sesión de usuario subyacente, el cual se envía como una etiqueta en el tramo. Opcionalmente, también puede especificar las etiquetas `user_handle`, `user_name` y `user_id`.

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(session_id="<SESSION_ID>")
def process_user_message():
    LLMObs.annotate(
        ...
        tags = {"user_handle": "poodle@dog.com", "user_id": "1234", "user_name": "poodle"}
    )
    return
{{< /code-block >}}

### Etiquetas de seguimiento de sesión {#session-tracking-tags}

| Etiqueta | Descripción |
|---|---|
| `session_id` | El ID que representa una sola sesión de usuario, por ejemplo, una sesión de chat. |
| `user_handle` | El identificador para el usuario de la sesión de chat. |
| `user_name` | El nombre para el usuario de la sesión de chat. |
| `user_id` | El ID para el usuario de la sesión de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Al iniciar un tramo raíz para una nueva traza o tramo en un nuevo proceso, especifique el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Al iniciar un tramo raíz para una nueva traza o tramo en un nuevo proceso, especifique el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String processChat(int userID) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("incoming-chat", null, "session-" + System.currentTimeMillis() + "-" + userID);
    String chatResponse = answerChat(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Rastreo distribuido {#distributed-tracing}

El SDK admite el rastreo a través de servicios o hosts distribuidos. El rastreo distribuido funciona propagando información de tramo a través de solicitudes web.

{{< tabs >}}
{{% tab "Python" %}}

La biblioteca `ddtrace` proporciona algunas integraciones listas para usar que admiten el rastreo distribuido para bibliotecas populares de [marco web][1] y [HTTP][2]. Si su aplicación realiza solicitudes utilizando estas bibliotecas compatibles, puede habilitar el rastreo distribuido ejecutando:
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si su aplicación no utiliza ninguna de estas bibliotecas compatibles, puede habilitar el rastreo distribuido propagando manualmente la información de tramo hacia y desde los encabezados HTTP. El SDK proporciona los métodos auxiliares `LLMObs.inject_distributed_headers()` y `LLMObs.activate_distributed_headers()` para inyectar y activar contextos de rastreo en los encabezados de solicitud.

### Inyección de encabezados distribuidos {#injecting-distributed-headers}

El método `LLMObs.inject_distributed_headers()` toma un tramo e inyecta su contexto en los encabezados HTTP para que se incluyan en la solicitud. Este método acepta los siguientes argumentos:

`request_headers`
: obligatorio - _diccionario_
<br />Los encabezados HTTP que se deben extender con atributos de contexto de rastreo.

`span`
: opcional - _Tramo_ - **predeterminado**: `The current active span.`
El <br /> tramo en el cual inyectar su contexto en los encabezados de solicitud proporcionados. Cualquier tramo (incluidos aquellos con decoradores de función), esto usa de forma predeterminada el tramo activo actual.

### Activación de encabezados distribuidos {#activating-distributed-headers}

El método `LLMObs.activate_distributed_headers()` toma encabezados HTTP y extrae atributos de contexto de rastreo para activarlos en el nuevo servicio.

**Nota**: Debe llamar a `LLMObs.activate_distributed_headers()` antes de iniciar cualquier tramo en su servicio descendente. Los tramos iniciados anteriormente (incluidos los tramos de decoradores de función) no se capturan en el rastreo distribuido.

Este método acepta el siguiente argumento:

`request_headers`
: requerido - _diccionario_
<br />Los encabezados HTTP para extraer atributos de contexto de rastreo.


### Ejemplo {#example-34}

{{< code-block lang="python" filename="client.py" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def client_send_request():
    request_headers = {}
    request_headers = LLMObs.inject_distributed_headers(request_headers)
    send_request("<method>", request_headers)  # arbitrary HTTP call
{{< /code-block >}}

{{< code-block lang="python" filename="server.py" >}}
from ddtrace.llmobs import LLMObs

def server_process_request(request):
    LLMObs.activate_distributed_headers(request.headers)
    with LLMObs.task(name="process_request") as span:
        pass  # arbitrary server work
{{< /code-block >}}

[1]: /es/tracing/trace_collection/compatibility/python/#integrations
[2]: /es/tracing/trace_collection/compatibility/python/#library-compatibility
{{% /tab %}}
{{% tab "Node.js" %}}

La biblioteca `dd-trace` proporciona integraciones listas para usar que admiten el rastreo distribuido para [marcos web][1] populares. Requerir el tracer habilita automáticamente estas integraciones, pero puede deshabilitarlas opcionalmente con:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /es/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


## Rastreo avanzado {#advanced-tracing}

{{< tabs >}}
{{% tab "Python" %}}
### Rastreo de tramos mediante métodos en línea {#tracing-spans-using-inline-methods}

Para cada tipo de tramo, la clase `ddtrace.llmobs.LLMObs` proporciona un método en línea correspondiente para rastrear automáticamente la operación que implica un bloque de código determinado. Estos métodos tienen la misma firma de argumentos que sus contrapartes de decorador de funciones, con la adición de que `name` toma como valor predeterminado el tipo de tramo (`llm`, `workflow`, etc.) si no se proporciona. Estos métodos se pueden utilizar como administradores de contexto para finalizar automáticamente el tramo después de que se complete el bloque de código incluido.

#### Ejemplo {#example-35}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Persistencia de un tramo entre contextos {#persisting-a-span-across-contexts}

Para iniciar y detener manualmente un tramo entre diferentes contextos o ámbitos:

1. Inicie un tramo manualmente utilizando los mismos métodos (por ejemplo, el método `LLMObs.workflow` para un tramo de flujo de trabajo), pero como una llamada de función simple en lugar de como un administrador de contexto.
2. Pase el objeto tramo como argumento a otras funciones.
3. Detenga el tramo manualmente con el método `span.finish()`. **Nota**: el tramo debe finalizarse manualmente, de lo contrario no se enviará.

#### Ejemplo {#example-36}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    workflow_span = LLMObs.workflow(name="process_message")
    ... # user application logic
    separate_task(workflow_span)
    return

def separate_task(workflow_span):
    ... # user application logic
    workflow_span.finish()
    return
{{< /code-block >}}

#### Forzar el vaciado en entornos sin servidor {#force-flushing-in-serverless-environments}

`LLMObs.flush()` es una función de bloqueo que envía todos los datos de Agent Observability almacenados en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación se cierre hasta que se envíen todas las trazas de Agent Observability.

### Rastrear múltiples aplicaciones {#tracing-multiple-applications}

El SDK admite el rastreo de múltiples aplicaciones LLM desde el mismo servicio.

Puede configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de su aplicación LLM, en la cual se agrupan de forma predeterminada todos los tramos generados.

Para anular esta configuración y usar un nombre de aplicación LLM diferente para un tramo raíz determinado, pase el argumento `ml_app` con el nombre de cadena de la aplicación LLM subyacente al iniciar un tramo raíz para una nueva traza o un tramo en un nuevo proceso.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Rastrear tramos mediante métodos en línea {#tracing-spans-using-inline-methods-1}

El SDK `llmobs` proporciona un método en línea correspondiente para rastrear la operación que conlleva un bloque de código determinado. Estos métodos tienen la misma firma de argumentos que sus contrapartes de envoltura de funciones, con la adición de que `name` es obligatorio, ya que el nombre no puede inferirse de una devolución de llamada anónima. Este método finalizará el tramo bajo las siguientes condiciones:

- Si la función devuelve una Promesa, entonces el tramo finaliza cuando la promesa se resuelve o se rechaza.
- Si la función toma una devolución de llamada como su último parámetro, entonces el tramo finaliza cuando se llama a esa devolución de llamada.
- Si la función no acepta una devolución de llamada y no devuelve una Promesa, entonces el tramo finaliza al final de la ejecución de la función.

#### Ejemplo sin una devolución de llamada {#example-without-a-callback}

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Ejemplo con una devolución de llamada {#example-with-a-callback}

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, (workflowSpan, cb) => {
    ... // user application logic
    let maybeError = ...
    cb(maybeError) // the span will finish here, and tag the error if it is not null or undefined
    return
  })
}
{{< /code-block >}}

El tipo de retorno de esta función coincide con el tipo de retorno de la función trazada:

{{< code-block lang="javascript" >}}
function processMessage () {
  const result = llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return 'hello world'
  })

  console.log(result) // 'hello world'
  return result
}
{{< /code-block >}}

### Decoradores de funciones en TypeScript {#function-decorators-in-typescript}

El SDK de Agent Observability para Node.js ofrece una función `llmobs.decorate` que sirve como decorador de funciones para aplicaciones de TypeScript. El comportamiento de rastreo de esta función es el mismo que `llmobs.wrap`.

#### Ejemplo {#example-37}

{{< code-block lang="javascript" >}}
// index.ts
import tracer from 'dd-trace';
tracer.init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
  },
});

const { llmobs } = tracer;

class MyAgent {
  @llmobs.decorate({ kind: 'agent' })
  async runChain () {
    ... // user application logic
    return
  }
}

{{< /code-block >}}

### Forzar el vaciado en entornos sin servidor {#force-flushing-in-serverless-environments-1}

`llmobs.flush()` es una función de bloqueo que envía todos los datos de Agent Observability almacenados en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación se cierre hasta que se envíen todas las trazas de Agent Observability.

### Rastrear múltiples aplicaciones {#tracing-multiple-applications-1}

El SDK admite el rastreo de múltiples aplicaciones LLM desde el mismo servicio.

Puede configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de su aplicación LLM, en la cual se agrupan de forma predeterminada todos los tramos generados.

Para anular esta configuración y usar un nombre de aplicación LLM diferente para un tramo raíz determinado, pase el argumento `mlApp` con el nombre de cadena de la aplicación LLM subyacente al iniciar un tramo raíz para una nueva traza o un tramo en un nuevo proceso.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Pautas para nombrar aplicaciones {#application-naming-guidelines}

El nombre de su aplicación (el valor de `DD_LLMOBS_ML_APP`) debe seguir estas pautas:

- Debe ser una cadena Unicode en minúsculas
- Puede tener hasta 193 caracteres de longitud
- No puede contener guiones bajos contiguos o al final
- Puede contener los siguientes caracteres:
   - Alfanuméricos
   - Guiones bajos
   - Signos menos
   - Dos puntos
   - Puntos
   - Barras diagonales

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /es/llm_observability/terms/
[9]: /es/getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: /es/tracing/trace_collection/compatibility/python/#integrations
[12]: /es/tracing/trace_collection/compatibility/python/#library-compatibility
[13]: /es/llm_observability/instrumentation/auto_instrumentation/
[14]: /es/llm_observability/monitoring/cost
[15]: /es/llm_observability/monitoring/cost/#custom-tags-on-cost-and-tokens-metrics
[16]: /es/llm_observability/monitoring/cost/#how-token-counts-are-calculated