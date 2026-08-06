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
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Rastrea, compara y optimiza tus prompts LLM con Datadog LLM Observability
title: Referencia del SDK de LLM Observability
---
## Descripción general {#overview}

Los SDK de LLM Observability de Datadog proveen instrumentación automática, así como APIs de instrumentación manual, para ofrecer observabilidad e información sobre tus aplicaciones LLM.

## Configuración {#setup}

### Requisitos {#requirements}

- Una [clave de API de Datadog][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- El último `ddtrace` paquete está instalado (se requiere Python 3.7+):
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- El último `dd-trace` paquete está instalado (se requiere Node.js 16+):
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- Has descargado el último [`dd-trace-java` JAR][1]. El SDK de LLM Observability es compatible con `dd-trace-java` v1.51.0+ (se requiere Java 8+).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuración de línea de comandos" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Habilita LLM Observability ejecutando tu aplicación usando el comando `ddtrace-run` y especificando las variables de entorno requeridas.

**Nota**: `ddtrace-run` activa automáticamente todas las integraciones de LLM Observability.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables de entorno para la configuración de línea de comandos {#environment-variables-for-command-line-setup}

`DD_SITE`
: requerido - _cadena_
<br />Sitio de Datadog destino para el envío de datos LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requerido - _entero o cadena_
<br />Alterna para habilitar el envío de datos a LLM Observability. Debería estar configurado en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional - _cadena_
<br />El nombre de tu aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un span raíz dado, consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `ddtrace==3.14.0`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es requerido si no estás utilizando el Agente de Datadog, en cuyo caso esto debería configurarse en `1` o `true`.

`DD_API_KEY`
: opcional - _cadena_
<br />Tu clave de API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}

{{% tab "Node.js" %}}
Habilita LLM Observability ejecutando tu aplicación con `NODE_OPTIONS="--import dd-trace/initialize.mjs"` y especificando las variables de entorno requeridas.

**Nota**: `dd-trace/initialize.mjs` activa automáticamente todas las integraciones de APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables de entorno para la configuración de línea de comandos {#environment-variables-for-command-line-setup-1}

`DD_SITE`
: requerido - _cadena_
<br />El sitio de Datadog para enviar tus datos LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requerido - _entero o cadena_
<br />Alterna para habilitar el envío de datos a LLM Observability. Debería estar configurado en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional - _cadena_
<br />El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un tramo raíz dado, consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `dd-trace@5.66.0`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es requerido si no estás utilizando el Agente de Datadog, en cuyo caso esto debería configurarse en `1` o `true`.

`DD_API_KEY`
: opcional - _cadena_
<br />Tu clave de API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Habilita LLM Observability ejecutando tu aplicación con `dd-trace-java` y especificando los parámetros requeridos como variables de entorno o propiedades del sistema.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables de entorno y propiedades del sistema {#environment-variables-and-system-properties}

Puedes proporcionar los siguientes parámetros como variables de entorno (por ejemplo, `DD_LLMOBS_ENABLED`) o como propiedades del sistema Java (por ejemplo, `dd.llmobs_enabled`).

`DD_SITE` o `dd.site`
: requerido - _cadena_
<br />Sitio de Datadog destino para el envío de datos LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` o `dd.llmobs.enabled`
: requerido - _entero o cadena_
<br />Alternar para habilitar el envío de datos a LLM Observability. Debería estar configurado en `1` o `true`.

`DD_LLMOBS_ML_APP` o `dd.llmobs.ml.app`
: opcional - _cadena_
<br />El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un tramo raíz dado, consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece de forma predeterminada al valor de [`DD_SERVICE`][1], o al valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión 1.54.0 de `dd-trace-java`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED` o `dd.llmobs.agentless.enabled`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es requerido si no estás utilizando el Agente de Datadog, en cuyo caso esto debe establecerse en `1` o `true`.

`DD_API_KEY` o `dd.api.key`
: opcional - _cadena_
<br />Tu clave de API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración en código" level="h3" expanded=false id="in-code-setup" %}}

En lugar de usar [configuración de línea de comandos](#command-line-setup), también puedes habilitar LLM Observability programáticamente.

{{< tabs >}}
{{% tab "Python" %}}

Utiliza la función `LLMObs.enable()` para habilitar LLM Observability.

<div class="alert alert-info">
No uses este método de configuración con el <code>ddtrace-run</code> comando.
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
<br />El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para una traza dada, consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_LLMOBS_ML_APP`.

`integrations_enabled` - **predeterminado**: `true`
: opcional - _booleano_
<br />Una bandera para habilitar automáticamente el rastreo de llamadas LLM para las integraciones de LLM soportadas por Datadog. Si no se proporciona, todas las integraciones de LLM soportadas están habilitadas por defecto. Para evitar el uso de las integraciones de LLM, establece este valor en `false`.

`agentless_enabled`
: opcional - _booleano_ - **predeterminado**: `false`
<br />Solo es necesario si no estás utilizando el Agente de Datadog, en cuyo caso esto debería establecerse en `True`. Esto configura la biblioteca `ddtrace` para no enviar ningún dato que requiera el Agente de Datadog. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_LLMOBS_AGENTLESS_ENABLED`.

`site`
: opcional - _cadena_
<br />El sitio de Datadog para enviar los datos de tu LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto se establece en el valor de `DD_SITE`.

`api_key`
: opcional - _cadena_
<br />Tu clave de API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog. Si no se proporciona, esto se establece en el valor de `DD_API_KEY`.

`env`
: opcional - _cadena_
<br />El nombre del entorno de tu aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se proporciona, esto se establece en el valor de `DD_ENV`.

`service`
: opcional - _cadena_
<br />El nombre del servicio utilizado para tu aplicación. Si no se proporciona, esto se establece en el valor de `DD_SERVICE`.

[1]: /es/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
No utilice este método de configuración con el <code>dd-trace/initialize.mjs</code> comando.
</div>

Utilice la `init()` función para habilitar la Observabilidad LLM.

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
<br />El nombre de tu aplicación LLM, servicio o proyecto, bajo el cual se agrupan todos los rastros y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un rastreo dado, consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece en el valor de `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: opcional - _booleano_ - **predeterminado**: `false`
<br />Solo es necesario si no estás utilizando el Agente de Datadog, en cuyo caso esto debe configurarse en `true`. Esto configura la biblioteca `dd-trace` para no enviar ningún dato que requiera el Agente de Datadog. Si no se proporciona, esto se establece por defecto en el valor de `DD_LLMOBS_AGENTLESS_ENABLED`.

**Opciones para la configuración general del rastreador**:

`site`
: opcional - _cadena_
<br />El sitio de Datadog para enviar los datos de tu LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto se establece en el valor de `DD_SITE`.

`env`
: opcional - _cadena_
<br />El nombre del entorno de tu aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se proporciona, esto se establece por defecto en el valor de `DD_ENV`.

`service`
: opcional - _cadena_
<br />El nombre del servicio utilizado para tu aplicación. Si no se proporciona, esto se establece en el valor de `DD_SERVICE`.

##### Variables de entorno {#environment-variables}

Establece los siguientes valores como variables de entorno. No se pueden configurar programáticamente.

`DD_API_KEY`
: opcional - _cadena_
<br />Tu clave de API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración de AWS Lambda" level="h3" expanded=false id="aws-lambda-setup" %}}

Para instrumentar una función existente de AWS Lambda con LLM Observability, puedes utilizar la Extensión de Datadog y las respectivas capas de lenguaje.

1. Abre un Cloudshell en la consola de AWS.
2. Instala el cliente de Datadog CLI.

```shell
npm install -g @datadog/datadog-ci
```
3. Configura la clave API de Datadog y el sitio.

```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si ya tienes o prefieres usar un secreto en Secrets Manager, puedes establecer la clave API utilizando el ARN del secreto:

```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Instala tu función Lambda con LLM Observability (esto requiere al menos la versión 77 de la capa de extensión de Datadog).
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

4. Invoca tu función Lambda y verifica que las trazas de LLM Observability sean visibles en la interfaz de usuario de Datadog.

Limpia manualmente las trazas de LLM Observability utilizando el método `flush` antes de que la función Lambda retorne.

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


Después de instalar el SDK y ejecutar tu aplicación, deberías esperar ver algunos datos en LLM Observability provenientes de la auto-instrumentación. La instrumentación manual puede ser utilizada para capturar marcos personalizados o operaciones de bibliotecas que aún no son compatibles.

## Instrumentación manual {#manual-instrumentation}

{{< tabs >}}
{{% tab "Python" %}}

Para capturar una operación de LLM, se puede usar un decorador de función para instrumentar fácilmente los flujos de trabajo:

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

o un enfoque basado en un administrador de contexto para capturar operaciones de grano fino:

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


Para una lista de tipos de tramos disponibles, consulta la [documentación de Tipos de tramos][1]. Para un trazado más granular de operaciones dentro de funciones, consulta [Trazado de tramos utilizando métodos en línea](#tracing-spans-using-inline-methods).

[1]: /es/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Para trazar un tramo, utiliza `llmobs.wrap(options, function)` como un envoltorio de función para la función que deseas trazar. Para una lista de tipos de tramos disponibles, consulta la [documentación de Tipos de tramos][1]. Para un trazado más granular de operaciones dentro de funciones, consulta [Trazado de tramos utilizando métodos en línea](#tracing-spans-using-inline-methods).

### Tipos de tramos {#span-kinds}

Los tipos de tramo son requeridos y se especifican en el objeto `options` que se pasa a las funciones de trazado `llmobs` (`trace`, `wrap` y `decorate`). Consulta la [documentación de Tipos de tramos][1] para una lista de tramos soportados.

**Nota:** Los tramos con un tipo de tramo inválido no se envían a LLM Observability.

### Captura automática de argumentos/salida/nombre de función {#automatic-function-argumentoutputname-capturing}

`llmobs.wrap` (junto con [`llmobs.decorate`](#function-decorators-in-typescript) para TypeScript) intenta capturar automáticamente las entradas, salidas y el nombre de la función que se está rastreando. Si necesita anotar manualmente un tramo, consulte [Enriqueciendo tramos](#enriching-spans). Las entradas y salidas que anotes anularán la captura automática. Además, para anular el nombre de la función, pasa la `name` propiedad en el objeto de opciones a la función `llmobs.wrap`:

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
- Si la función toma un callback como su último parámetro, entonces el tramo finaliza cuando se llama a ese callback.
- Si la función no acepta un callback y no devuelve una Promesa, entonces el tramo finaliza al final de la ejecución de la función.

El siguiente ejemplo demuestra la segunda condición, donde el último argumento es un callback:

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

Si la aplicación no utiliza la función de callback, se recomienda usar un bloque rastreado en línea en su lugar. consulta [Rastreando tramos utilizando métodos en línea](#tracing-spans-using-inline-methods) para más información.

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

### Iniciando un tramo {#starting-a-span}

Existen múltiples métodos para iniciar un tramo, según el tipo de tramo que estés iniciando. Consulta la [documentación de Tipos de tramos][1] para una lista de tramos soportados.

Todos los tramos se inician como una instancia de objeto de `LLMObsSpan`. Cada tramo tiene métodos que puedes usar para interactuar con él y registrar datos.

### Finalizando un tramo {#finishing-a-span}

Los tramos deben completarse para que la traza se envíe y sea visible en la aplicación de Datadog.

Para finalizar un tramo, llama a `finish()` en una instancia del objeto tramo. Si es posible, envuelve el tramo en un bloque `try/finally` para asegurar que se envíe, incluso si ocurre una excepción.

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

### Las llamadas a LLM {#llm-calls}

<div class="alert alert-info">Si estás utilizando algún proveedor o marco de LLM que sea compatible con <a href="/llm_observability/instrumentation/auto_instrumentation/">las integraciones de LLM de Datadog</a>, no necesitas iniciar manualmente un tramo de LLM para rastrear estas operaciones.</div>

<div class="alert alert-info">Si estás instrumentando manualmente un tramo de LLM, debes registrar los conteos de tokens (como <code>input_tokens</code>, <code>output_tokens</code>, y <code>total_tokens</code>) tú mismo anotando el tramo. Consulta <a href="#enriching-spans">Enriqueciendo tramos</a> para más información.</div>

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a LLM, utiliza el decorador de función `ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: requerido - _cadena_
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`model_provider`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br />El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `model_provider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una llamada de LLM, especifique el tipo de tramo como `llm`, y opcionalmente especifique los siguientes argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se predetermina al nombre de la función rastreada.

`modelProvider`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Trazado de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una llamada de LLM, importe y llame al siguiente método con los argumentos que se enumeran a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el tipo de tramo.

`modelName`
: opcional - _Cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`modelProvider`
: opcional - _Cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

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


### Flujos de trabajo {#workflows}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un tramo de flujo de trabajo, utiliza el decorador de función `ddtrace.llmobs.decorators.workflow()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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

Para rastrear un tramo de flujo de trabajo, especifique el tipo de tramo como `workflow`, y opcionalmente especifique argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un tramo de flujo de trabajo, importa y llama al siguiente método con los argumentos listados a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el tipo de tramo.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

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
Para rastrear la ejecución de un agente, utiliza el decorador de función `ddtrace.llmobs.decorators.agent()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.
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
Para rastrear la ejecución de un agente, especifica el tipo de tramo como `agent`, y opcionalmente especifica argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear la ejecución de un agente, importa y llama al siguiente método con los argumentos que se enumeran a continuación

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el nombre de la función rastreada.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Llamadas a herramientas {#tool-calls}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a una herramienta, utiliza el decorador de función `ddtrace.llmobs.decorators.tool()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una llamada a una herramienta, especifica el tipo de tramo como `tool`, y opcionalmente especifica argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una llamada a una herramienta, importa y llama al siguiente método con los argumentos que se enumeran a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el nombre de la función rastreada.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo sobrescribe el nombre de la aplicación de ML suministrado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tareas {#tasks}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un tramo de tarea, utiliza el decorador de función `LLMObs.task()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un tramo de tarea, especifique el tipo de tramo como `task`, y opcionalmente especifique argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece por defecto en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un tramo de tarea, importe y llame al siguiente método con los argumentos listados a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece por defecto en el nombre de la función rastreada.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación ML suministrado al inicio de la aplicación. Proporcionar un valor no nulo anula el nombre de la aplicación ML suministrado al inicio de la aplicación. Consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Incrustaciones {#embeddings}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una operación de incrustación, utilice el decorador de función `LLMObs.embedding()`.

**Nota**: Anotar la entrada de un tramo de incrustación requiere un formato diferente al de otros tipos de tramos. Consulte [Enriqueciendo tramos](#enriching-spans) para más detalles sobre cómo especificar entradas de incrustación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: requerido - _cadena_
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece en el nombre de la función rastreada.

`model_provider`
: opcional - _cadena_ - **predeterminado**: `"custom"`

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una operación de incrustación, especifique el tipo de tramo como `embedding`, y opcionalmente especifique argumentos en el objeto de opciones.

**Nota**: Anotar la entrada de un tramo de incrustación requiere un formato diferente al de otros tipos de tramos. Consulte [Enriqueciendo tramos](#enriching-spans) para más detalles sobre cómo especificar entradas de incrustación.

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
<br/>El ID de la sesión de usuario subyacente. Consulte [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un tramo de recuperación, use el decorador de función `ddtrace.llmobs.decorators.retrieval()`.

**Nota**: Anotar la salida de un tramo de recuperación requiere un formato diferente al de otros tipos de tramos. Consulte [Enriqueciendo tramos](#enriching-spans) para más detalles sobre cómo especificar salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece por defecto en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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

Para rastrear un tramo de recuperación, especifique el tipo de tramo como `retrieval`, y opcionalmente especifique los siguientes argumentos en el objeto de opciones.

**Nota**: Anotar la salida de un tramo de recuperación requiere un formato diferente al de otros tipos de tramos. Consulte [Enriqueciendo tramos](#enriching-spans) para más detalles sobre cómo especificar salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece por defecto en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Seguimiento de múltiples aplicaciones](#tracing-multiple-applications) para más información.

{{% /collapse-content %}}

#### Ejemplo {#example-17}

A continuación se incluye también un ejemplo de cómo anotar un tramo. Consulte [Enriqueciendo tramos](#enriching-spans) para más información.

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

## Anidando tramos {#nesting-spans}

Iniciar un nuevo tramo antes de que el tramo actual haya terminado traza automáticamente una relación padre-hijo entre los dos tramos. El tramo padre representa la operación más grande, mientras que el tramo hijo representa una suboperación más pequeña anidada dentro de ella.

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


## Enriqueciendo tramos {#enriching-spans}

<div class="alert alert-info">
El <code>metrics</code> parámetro aquí se refiere a valores numéricos adjuntos como atributos en tramos individuales — no <a href="/llm_observability/monitoring/metrics/">métricas de la plataforma Datadog</a>. Para ciertas claves reconocidas como <code>input_tokens</code>, <code>output_tokens</code>, y <code>total_tokens</code>, Datadog utiliza estos atributos de span para generar métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.tokens</code>) para su uso en tableros y monitores.
</div>

{{< tabs >}}
{{% tab "Python" %}}
El SDK proporciona el método `LLMObs.annotate()` para enriquecer tramos con entradas, salidas y metadatos.

El método `LLMObs.annotate()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-span-arguments" %}}

`span`
: opcional - _tramo_ - **predeterminado**: el tramo activo actual
<br />El tramo a anotar. Si `span` no se proporciona (como al usar decoradores de función), el SDK anota el tramo activo actual.

`input_data`
: opcional - _tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para tramos que no son LLM) o una lista de diccionarios con este formato: `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}`, donde `"tool_calls"` son una lista opcional de diccionarios de llamadas a herramientas con claves requeridas: `"name"`, `"arguments"`, y claves opcionales: `"tool_id"`, `"type"`, y `"tool_results"` son una lista opcional de diccionarios de resultados de herramientas con clave requerida: `"result"`, y claves opcionales: `"name"`, `"tool_id"`, `"type"` para escenarios de llamadas a funciones. **Nota**: Los tramos de incrustación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "..."}`.

`output_data`
: opcional - _tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para tramos que no son LLM) o una lista de diccionarios con este formato: `{"content": "...", "role": "...", "tool_calls": ...}`, donde `"tool_calls"` son una lista opcional de diccionarios de llamadas a herramientas con claves requeridas: `"name"`, `"arguments"`, y claves opcionales: `"tool_id"`, `"type"` para escenarios de llamadas a funciones. **Nota**: Los tramos de recuperación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: opcional - _lista de diccionarios_
<br />Lista de diccionarios de definición de herramientas para escenarios de llamadas a funciones. Cada definición de herramienta debe tener una clave requerida `"name": "..."` y claves opcionales `"description": "..."` y `"schema": {...}`.

`metadata`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante a la operación de entrada o salida descrita por el tramo (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional - _diccionario_
<br />Un diccionario de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes a la operación descrita por el tramo (`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token`, etc.). La unidad para `time_to_first_token` está en segundos, similar a la métrica `duration` que se emite por defecto.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el tramo. Ejemplos de claves: `session`, `env`, `system`, y `version`. Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
El SDK proporciona el método `llmobs.annotate()` para anotar tramos con entradas, salidas y metadatos.

El método `LLMObs.annotate()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
: opcional - _tramo_ - **predeterminado**: el tramo activo actual
<br />El tramo a anotar. Si `span` no se proporciona (como al usar envolturas de funciones), el SDK anota el tramo activo actual.

`annotationOptions`
: requerido - _objeto_
<br />Un objeto de diferentes tipos de datos para anotar el tramo.

El objeto `annotationOptions` puede contener lo siguiente:

`inputData`
: opcional - _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para tramos que no son LLM) o una lista de diccionarios con este formato: `{role: "...", contenido: "..."}` (para tramos LLM).  **Nota**: Los tramos de incrustación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "..."}`.

`outputData`
: opcional - _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para tramos que no son LLM) o una lista de objetos con este formato: `{role: "...", content: "..."}` (para tramos LLM). **Nota**: Los tramos de recuperación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante para la operación de entrada o salida descrita por el tramo (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional - _objeto_
<br />Un objeto de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes para la operación descrita por el tramo (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas respecto al contexto del tramo (`session`, `environment`, `system`, `versioning`, etc.). Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
El SDK proporciona varios métodos para anotar tramos con entradas, salidas, métricas y metadatos.

### Anotando entradas y salidas {#annotating-inputs-and-outputs}

Utilice el método miembro `annotateIO()` de la interfaz `LLMObsSpan` para agregar datos de entrada y salida estructurados a un `LLMObsSpan`. Esto incluye argumentos opcionales y objetos de mensaje de LLM.

#### Argumentos {#arguments}

Si un argumento es nulo o está vacío, no sucede nada. Por ejemplo, si `inputData` es una cadena no vacía mientras que `outputData` es nulo, entonces solo se registra `inputData`.

`inputData`
: opcional - _Cadena_ o _Lista<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para tramos que no son LLM) o una lista de `LLMObs.LLMMessage`s para tramos LLM.

`outputData`
: opcional - _Cadena_ o _Lista<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para tramos que no son LLM) o una lista de `LLMObs.LLMMessage`s para tramos LLM.

#### Mensajes LLM {#llm-messages}
Los tramos LLM deben ser anotados con mensajes LLM utilizando el objeto `LLMObs.LLMMessage`.

El objeto `LLMObs.LLMMessage` puede ser instanciado llamando a `LLMObs.LLMMessage.from()` con los siguientes argumentos:

`role`
: requerido - _Cadena_
<br />Una cadena que describe el rol del autor del mensaje.

`content`
: requerido - _Cadena_
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

### Agregando métricas {#adding-metrics}

#### Agregar métricas en bloque {#bulk-add-metrics}

El método miembro `setMetrics()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar múltiples métricas en bloque:

##### Argumentos {#arguments-1}

`metrics`
: requerido - _Mapa<String, Número>_
<br /> Un mapa de claves serializables en JSON y valores numéricos que los usuarios pueden agregar para registrar métricas relevantes a la operación descrita por el tramo (por ejemplo, `input_tokens`, `output_tokens` o `total_tokens`).

#### Agregar una métrica única {#add-a-single-metric}

El método miembro `setMetric()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una métrica única:

#####  Argumentos {#arguments-2}

`key`
:  requerido - _ CharSequence_
<br /> El nombre de la métrica.

`value`
: requerido - _int_, _long_, o _double_
<br /> El valor de la métrica.

####  Ejemplos {#examples}

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

###  Agregando etiquetas {#adding-tags}

Para más información sobre etiquetas, consulte [Introducción a las Etiquetas][1].

####  Agregar etiquetas en bloque {#bulk-add-tags}

El método miembro `setTags()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar múltiples etiquetas en bloque:

##### Argumentos {#arguments-3}

`tags`
:  requerido - _ Map<String, Object>_
<br /> Un mapa de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas para describir el contexto del tramo (por ejemplo, `session`, `environment`, `system` o `version`).

#### Agregar una etiqueta única {#add-a-single-tag}

El método miembro `setTag()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una etiqueta única:

##### Argumentos {#arguments-4}

`key`
: requerido - _Cadena_
<br /> La clave de la etiqueta.

`value`
: requerido - _int_, _long_, _doble_, _booleano_, o _Cadena_
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

### Anotando errores {#annotating-errors}

#### Agregando un Throwable (recomendado) {#adding-a-throwable-recommended}

El método miembro `addThrowable()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para adjuntar un throwable con una traza de pila:

##### Argumentos {#arguments-5}

`throwable`
: requerido - _Throwable_
<br /> El throwable/excepción que ocurrió.

#### Agregando un mensaje de error {#adding-an-error-message}

El `setErrorMessage()` método miembro de la `LLMObsSpan` interfaz acepta el siguiente argumento para adjuntar una cadena de error:

##### Argumentos {#arguments-6}

`errorMessage`
: requerido - _Cadena_
<br /> El mensaje del error.

#### Estableciendo una bandera de error {#setting-an-error-flag}

El `setError()` método miembro de la `LLMObsSpan` interfaz acepta el siguiente argumento para indicar un error con la operación:

##### Argumentos {#arguments-7}

`error`
: requerido - _booleano_
<br /> `true` si el tramo tuvo un error.

####  Ejemplos {#examples-2}

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

### Anotando metadatos {#annotating-metadata}

El método `setMetadata()` miembro de la interfaz `LLMObsSpan` acepta los siguientes argumentos:

`metadata`
: requerido - _Map<String, Object>_
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

### Anotando tramos auto-instrumentados {#annotating-auto-instrumented-spans}

{{< tabs >}}
{{% tab "Python" %}}

El método `LLMObs.annotation_context()` del SDK devuelve un administrador de contexto que se puede usar para modificar todos los tramos auto-instrumentados iniciados mientras el contexto de anotación está activo.

El método `LLMObs.annotation_context()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: opcional - _str_
<br />Nombre que reemplaza el nombre del tramo para cualquier tramo auto-instrumentado que se inicie dentro del contexto de anotación.

`prompt`
: opcional - _diccionario_
<br />Un diccionario que representa el prompt utilizado para una llamada a LLM. Consulte la documentación del objeto [Prompt](#prompt-tracking-arguments) para el esquema completo y las claves admitidas. También puede importar el objeto `Prompt` de `ddtrace.llmobs.utils` y pasarlo como el argumento `prompt`. **Nota**: Este argumento solo se aplica a los tramos LLM.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el tramo. Ejemplos de claves: `session`, `env`, `system` y `version`. Para más información sobre las etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

El `llmobs.annotationContext()` del SDK acepta una función de callback que se puede usar para modificar todos los tramos auto-instrumentados iniciados mientras se está dentro del contexto de la función de callback.

El método `llmobs.annotationContext()` acepta las siguientes opciones en el primer argumento:

{{% collapse-content title="Opciones" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: opcional - _str_
<br />Nombre que reemplaza el nombre del tramo para cualquier tramo auto-instrumentado que se inicie dentro del contexto de anotación.

`tags`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el tramo. Ejemplos de claves: `session`, `env`, `system` y `version`. Para más información sobre las etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

Adjunte metadatos estructurados del prompt al tramo del LLM para que pueda reproducir resultados, auditar cambios y comparar el rendimiento del prompt entre versiones. Al usar plantillas, la Observabilidad del LLM también proporciona [seguimiento de versiones](#version-tracking) basado en cambios en el contenido de la plantilla.

{{< tabs >}}
{{% tab "Python" %}}
Utilice `LLMObs.annotation_context(prompt=...)` para adjuntar metadatos del prompt antes de la llamada al LLM. Para más detalles sobre la anotación de tramos, consulte [Enriqueciendo tramos](#enriching-spans).

#### Argumentos {#arguments-8}

{{% collapse-content title="Argumentos" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requerido - diccionario
<br />Un diccionario tipado que sigue el esquema de Prompt a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h4" expanded=false id="prompt-structure" %}}

Claves soportadas:

- `id` (str): Identificador lógico para este prompt. Debería ser único por `ml_app`. Por defecto es `{ml_app}-unnamed_prompt`
- `version` (str): Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Consulta [seguimiento de versiones](#version-tracking) para más detalles.
- `variables` (Dict[str, str]): Variables utilizadas para llenar los marcadores de posición de la plantilla.
- `template` (str): Cadena de plantilla con marcadores de posición (por ejemplo, `"Traducir {{text}} to {{lang}}"`).
- `chat_template` (List[Mensaje]): Forma de plantilla de múltiples mensajes. Proporcione una lista de `{ "role": "<role>", "content": "<template string with placeholders>" }` objetos.
- `tags` (Dict[str, str]): Etiquetas para adjuntar a la ejecución del prompt.
- `rag_context_variables` (List[str]): Claves de variables que contienen contenido de verdad contextual. Utilizado para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `rag_query_variables` (List[str]): Claves de variables que contienen la consulta del usuario. Utilizado para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).

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

Cuando utilice la plantilla de prompt de LangChain con auto-instrumentación, asigne plantillas a variables con nombres significativos. La auto-instrumentación utiliza estos nombres para identificar los prompts.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Utilice `llmobs.annotationContext({ prompt: ... }, () => { ... })` para adjuntar metadatos del prompt antes de la llamada al LLM. Para más detalles sobre la anotación de tramos, consulte [Enriqueciendo tramos](#enriching-spans).

#### Argumentos {#arguments-9}

{{% collapse-content title="Opciones" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requerido - objeto
<br />Un objeto que sigue el esquema de Prompt a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h4" expanded=false id="prompt-structure" %}}

Propiedades soportadas:

- `id` (cadena): Identificador lógico para este prompt. Debería ser único por `ml_app`. Por defecto es `{ml_app}-unnamed_prompt`
- `version` (string): Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Consulta [seguimiento de versiones](#version-tracking) para más detalles.
- `variables` (Record<string, string>): Variables utilizadas para llenar los marcadores de posición de la plantilla.
- `template` (string | List[Message]): Template string with placeholders (for example, `"Translate {{texto}} a {{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }` objects.
- `tags` (Record<string, string>): Etiquetas para adjuntar a la ejecución del prompt.
- `contextVariables` (string[]): Claves de variables que contienen el contenido de ground truth y de contexto. Utilizado para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `queryVariables` (string[]): Claves de variables que contienen la consulta del usuario. Utilizado para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).

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
- Anotar un prompt solo está disponible en los tramos de LLM.
- Coloca la anotación inmediatamente antes de la llamada al proveedor para que se aplique al tramo de LLM correcto.
- Utiliza un prompt único `id` para distinguir diferentes prompts dentro de tu aplicación.
- Mantén las plantillas estáticas utilizando la sintaxis de placeholder (como `{{variable_name}}`) and define dynamic content in the `variables` section.
- Para múltiples llamadas de LLM auto-instrumentadas dentro de un bloque, utiliza un contexto de anotación para aplicar los mismos metadatos de prompt en todas las llamadas. Consulta [Anotando tramos auto-instrumentados](#annotating-auto-instrumented-spans).

### Seguimiento de versiones {#version-tracking}

LLM Observability proporciona versionado automático para tus prompts cuando no se especifica una versión explícita. Cuando proporcionas un `template` o `chat_template` en los metadatos de tu prompt sin una etiqueta `version`, el sistema genera automáticamente una versión al calcular un hash del contenido de la plantilla. Si proporcionas una etiqueta `version`, LLM Observability utiliza la etiqueta de versión que especificaste en lugar de generar una automáticamente.

El sistema de versionado funciona de la siguiente manera:
- **Versionado automático**: Cuando no se proporciona una etiqueta `version`, LLM Observability calcula un hash del contenido de `template` o `chat_template` para generar automáticamente un identificador de versión numérico.
- **Versionado manual**: Cuando se proporciona una etiqueta `version`, LLM Observability utiliza tu etiqueta de versión especificada exactamente como se proporcionó.
- **Historial de versiones**: Tanto las versiones auto-generadas como las manuales se mantienen en el historial de versiones para rastrear la evolución del prompt a lo largo del tiempo.

Esto te brinda la flexibilidad de confiar en la gestión automática de versiones basada en cambios en el contenido de la plantilla, o mantener el control total sobre el versionado con tus propias etiquetas de versión.

## Monitoreo de costos {#cost-monitoring}
Adjunta métricas de tokens (para seguimiento automático de costos) o métricas de costos (para seguimiento manual de costos) a tus tramos de LLM/embedding. Las métricas de tokens permiten a Datadog calcular costos utilizando los precios del proveedor, mientras que las métricas de costo te permiten proporcionar tu propio precio al usar modelos personalizados o no soportados. Para más detalles, consulta [Costos][14].

Si estás utilizando instrumentación automática, las métricas de tokens y de costos aparecen en tus tramos automáticamente. Si estás instrumentando manualmente, sigue la guía a continuación.

<div class="alert alert-info">En este contexto, "métricas de tokens" y "métricas de costos" se refieren a pares clave-valor numéricos que adjuntas a los tramos a través del <code>metrics</code> parámetro del <code>LLMObs.annotate()</code> método. Estos son distintos de <a href="/llm_observability/monitoring/metrics/">las métricas de observabilidad LLM de la plataforma Datadog</a>. Para claves reconocidas como <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code>, y <code>output_cost</code>, Datadog utiliza estos atributos de tramo para generar métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.cost</code>) para su uso en tableros y seguimiento.</div>

{{< tabs >}}
{{% tab "Python" %}}

#### Caso de uso: Usando un proveedor de modelo común {#use-case-using-a-common-model-provider}
Datadog admite proveedores de modelos comunes como OpenAI, Azure OpenAI, Anthropic y Google Gemini. Al usar estos proveedores, solo necesitas anotar tu solicitud LLM con `model_name`, `model_provider` y el uso de tokens. Datadog calcula automáticamente el costo estimado basado en los precios del proveedor.

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

#### Caso de uso: Usando un modelo personalizado {#use-case-using-a-custom-model}
Para modelos personalizados o no soportados, debes anotar el tramo manualmente con los datos de costo.

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
{{< /tabs >}}


## Evaluaciones {#evaluations}

El SDK de Observabilidad LLM proporciona métodos para exportar y enviar tus evaluaciones a Datadog.

<div class="alert alert-info">Para construir evaluadores reutilizables basados en clases (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) con metadatos de resultados ricos, consulta la <a href="/llm_observability/guide/evaluation_developer_guide/">Guía del Desarrollador de Evaluaciones</a>.</div>

Las evaluaciones deben unirse a un solo tramo. Puedes identificar el tramo objetivo usando cualquiera de estos dos métodos:
- _Unión basada en etiquetas_ - Une una evaluación usando un par de clave-valor de etiqueta único que se establece en un solo tramo. La evaluación fallará al unirse si el par de clave-valor de la etiqueta coincide con múltiples tramos o con ningún tramo.
- _Referencia directa al tramo_ - Une una evaluación usando la combinación única de ID de traza e ID de tramo.

### Exportando un tramo {#exporting-a-span}
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` se puede usar para extraer el contexto de un tramo. Este método es útil para asociar tu evaluación con el tramo correspondiente.

#### Argumentos {#arguments-10}
El método `LLMObs.export_span()` acepta el siguiente argumento:

`span`
: opcional - _Tramo_
<br />El tramo del cual extraer el contexto (ID de tramo e ID de traza). Si no se proporciona (como al usar decoradores de función), el SDK exporta el tramo activo actual.

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
`llmobs.exportSpan()` se puede usar para extraer el contexto de un tramo. Necesitarás usar este método para asociar tu evaluación con el tramo correspondiente.

#### Argumentos {#arguments-11}

El método `llmobs.exportSpan()` acepta el siguiente argumento:

`span`
: opcional - _Tramo_
<br />El tramo para extraer el contexto del tramo (tramo e IDs de traza) de. Si no se proporciona (como al usar envolturas de función), el SDK exporta el tramo activo actual.

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

### Enviando evaluaciones {#submitting-evaluations}

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` se puede usar para enviar tu evaluación personalizada asociada con un tramo dado.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> está en desuso y se eliminará en la próxima versión principal de ddtrace (4.0). Para migrar, renombra tu <code>LLMObs.submit_evaluation_for</code> llamadas con <code>LLMObs.submit_evaluation</code>.</div>

**Nota**: Las evaluaciones personalizadas son evaluadores que implementas y alojas tú mismo. Estos difieren de las evaluaciones listas para usar, que son calculadas automáticamente por Datadog utilizando evaluadores integrados. Para configurar evaluaciones listas para usar en tu aplicación, usa la página [**Observabilidad LLM** > **Configuraciones** > **Evaluaciones**][1] en Datadog.

El método `LLMObs.submit_evaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: requerido - _cadena_
<br />El nombre de la evaluación.

`metric_type`
: requerido - _cadena_
<br />El tipo de la evaluación. Debe ser `categorical`, `score`, `boolean` o `json`.

`value`
: requerido - _cadena, tipo numérico o diccionario_
<br />El valor de la evaluación. Debe ser una cadena (`metric_type==categorical`), entero/flotante (`metric_type==score`), booleano (`metric_type==boolean`) o diccionario (`metric_type==json`).

`span`
: opcional - _diccionario_
<br />Un diccionario que identifica de manera única el tramo asociado con esta evaluación. Debe contener `span_id` (cadena) y `trace_id` (cadena). Usa [`LLMObs.export_span()`](#exporting-a-span) para generar este diccionario.

`span_with_tag_value`
: opcional - _diccionario_
<br />Un diccionario que identifica de manera única el tramo asociado con esta evaluación. Debe contener `tag_key` (cadena) y `tag_value` (cadena).

   **Nota**: Exactamente uno de `span` o `span_with_tag_value` es requerido. Proporcionar ambos, o ninguno, genera un ValueError.

`ml_app`
: requerido - _cadena_
<br />El nombre de la aplicación de ML.

`timestamp_ms`
: opcional - _entero_
<br />La marca de tiempo unix en milisegundos cuando se generó el resultado de la métrica de evaluación. Si no se proporciona, el valor predeterminado será la hora actual.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor de cadena que los usuarios pueden agregar como etiquetas relacionadas con la evaluación. Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

`assessment`
: opcional - _cadena_
<br />Una evaluación de esta evaluación. Los valores aceptados son `pass` y `fail`.

`reasoning`
: opcional - _cadena_
<br />Una explicación textual del resultado de la evaluación.

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

`llmobs.submitEvaluation()` se puede usar para enviar su evaluación personalizada asociada con un tramo dado.

El método `llmobs.submitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: requerido - _diccionario_
<br />El contexto del tramo con el que se asocia la evaluación. Esto debe ser la salida de `LLMObs.export_span()`.

`evaluationOptions`
: requerido - _objeto_
<br />Un objeto de los datos de evaluación.

El objeto `evaluationOptions` puede contener lo siguiente:

`label`
: requerido - _cadena_
<br />El nombre de la evaluación.

`metricType`
: requerido - _cadena_
<br />El tipo de la evaluación. Debe ser uno de "categórico", "puntaje", "booleano" o "json".

`value`
: requerido - _cadena o numérico_
<br />El valor de la evaluación. Debe ser una cadena (para categórico `metric_type`), número (para puntaje `metric_type`), booleano (para booleano `metric_type`), o un objeto JSON (para json `metric_type`).

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor de cadena que los usuarios pueden agregar como etiquetas relacionadas con la evaluación. Para más información sobre las etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

Utilice `LLMObs.SubmitEvaluation()` para enviar su evaluación personalizada asociada con un tramo dado.

El método `LLMObs.SubmitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: requerido - _LLMObsSpan_
<br />El contexto del tramo con el que se asocia la evaluación.

`label`
: requerido - _Cadena_
<br />El nombre de la evaluación.

`categoricalValue` o `scoreValue`
: requerido - _Cadena_ o _doble_
<br />El valor de la evaluación. Debe ser una cadena (para evaluaciones categóricas) o un doble (para evaluaciones de puntaje).

`tags`
: opcional - _Mapa<String, Object>_
<br />Un diccionario de pares clave-valor de cadenas utilizado para etiquetar la evaluación. Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).
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

## Procesamiento de tramos {#span-processing}

Para modificar los datos de entrada y salida en tramos, puede configurar una función procesadora. La función procesadora tiene acceso a las etiquetas de tramo para permitir la modificación condicional de entrada/salida. Las funciones procesadoras pueden devolver el tramo modificado para emitirlo, o devolver `None`/`null` para evitar que el tramo sea emitido por completo. Esto es útil para filtrar tramos que contienen datos sensibles o que cumplen ciertos criterios.

{{< tabs >}}
{{% tab "Python" %}}

### Ejemplo {#example-29}

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


### Ejemplo: modificación condicional con auto-instrumentación {#example-conditional-modification-with-auto-instrumentation}

Al usar auto instrumentación, el tramo no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en tramos auto-instrumentados, se puede usar `annotation_context()` además de un procesador de tramos.

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

### Ejemplo: evitando que los tramos sean emitidos {#example-preventing-spans-from-being-emitted}

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

### Ejemplo {#example-30}

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

### Ejemplo: modificación condicional con auto-instrumentación {#example-conditional-modification-with-auto-instrumentation-1}

Al usar auto instrumentación, el tramo no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en tramos auto-instrumentados, se puede usar `llmobs.annotationContext()` además de un procesador de tramos.

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

### Ejemplo: evitando que los tramos sean emitidos {#example-preventing-spans-from-being-emitted-1}

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

El seguimiento de sesiones permite asociar múltiples interacciones con un usuario dado.

{{< tabs >}}
{{% tab "Python" %}}
Al iniciar un tramo raíz para una nueva traza o un tramo en un nuevo proceso, especifique el argumento `session_id` con el ID de cadena de la sesión de usuario subyacente, que se envía como una etiqueta en el tramo. Opcionalmente, también puede especificar las etiquetas `user_handle`, `user_name` y `user_id`.

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
| `session_id` | El ID que representa una única sesión de usuario, por ejemplo, una sesión de chat. |
| `user_handle` | El identificador del usuario de la sesión de chat. |
| `user_name` | El nombre del usuario de la sesión de chat. |
| `user_id` | El ID del usuario de la sesión de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Al iniciar un span raíz para una nueva traza o span en un nuevo proceso, especifique el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Al iniciar un tramo raíz para una nueva traza o un tramo en un nuevo proceso, especifique el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente, que se envía como una etiqueta en el tramo.

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

## Trazado distribuido {#distributed-tracing}

El SDK admite el trazado a través de servicios o servidores distribuidos. El trazado distribuido funciona propagando información de tramo a través de solicitudes web.

{{< tabs >}}
{{% tab "Python" %}}

La biblioteca `ddtrace` proporciona algunas integraciones listas para usar que admiten el trazado distribuido para populares [marcos web][1] y bibliotecas de [HTTP][2]. Si su aplicación realiza solicitudes utilizando estas bibliotecas compatibles, puede habilitar el trazado distribuido ejecutando:
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si su aplicación no utiliza ninguna de estas bibliotecas compatibles, puede habilitar el trazado distribuido propagando manualmente la información de tramo hacia y desde los encabezados HTTP. El SDK proporciona los métodos auxiliares `LLMObs.inject_distributed_headers()` y `LLMObs.activate_distributed_headers()` para inyectar y activar contextos de trazado en los encabezados de solicitud.

### Inyectando encabezados distribuidos {#injecting-distributed-headers}

El método `LLMObs.inject_distributed_headers()` toma un tramo e inyecta su contexto en los encabezados HTTP para ser incluidos en la solicitud. Este método acepta los siguientes argumentos:

`request_headers`
: requerido - _diccionario_
<br />Los encabezados HTTP para extender con atributos de contexto de trazado.

`span`
: opcional - _tramo_ - **predeterminado**: `The current active span.`
<br />El tramo para inyectar su contexto en los encabezados de solicitud proporcionados. Cualquier tramo (incluidos aquellos con decoradores de función), se predetermina al tramo activo actual.

### Activando encabezados distribuidos {#activating-distributed-headers}

El método `LLMObs.activate_distributed_headers()` toma encabezados HTTP y extrae atributos de contexto de trazado para activar en el nuevo servicio.

**Nota**: Debe llamar a `LLMObs.activate_distributed_headers()` antes de iniciar cualquier tramo en su servicio descendente. Los tramos iniciados previamente (incluidos los de decoradores de función) no se capturan en el trazado distribuido.

Este método acepta el siguiente argumento:

`request_headers`
: requerido - _diccionario_
<br />Los encabezados HTTP para extraer atributos de contexto de trazado.


### Ejemplo {#example-31}

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

La biblioteca `dd-trace` proporciona integraciones listas para usar que soportan trazado distribuido para populares [marcos web][1]. Requerir el trazador habilita automáticamente estas integraciones, pero puede desactivarlas opcionalmente con:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /es/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


## Trazado avanzado {#advanced-tracing}

{{< tabs >}}
{{% tab "Python" %}}
### Trazando tramos usando métodos en línea {#tracing-spans-using-inline-methods}

Para cada tipo de tramo, la clase `ddtrace.llmobs.LLMObs` proporciona un método en línea correspondiente para trazar automáticamente la operación que implica un bloque de código dado. Estos métodos tienen la misma firma de argumentos que sus contrapartes de decorador de función, con la adición de que `name` predetermina el tipo de tramo (`llm`, `workflow`, etc.) si no se proporciona. Estos métodos pueden ser utilizados como administradores de contexto para finalizar automáticamente el tramo después de que se complete el bloque de código encerrado.

#### Ejemplo {#example-32}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Persistiendo un tramo a través de contextos {#persisting-a-span-across-contexts}

Para iniciar y detener manualmente un tramo a través de diferentes contextos o ámbitos:

1. Inicie un tramo manualmente utilizando los mismos métodos (por ejemplo, el método `LLMObs.workflow` para un tramo de flujo de trabajo), pero como una llamada de función simple en lugar de como un administrador de contexto.
2. Pase el objeto de tramo como un argumento a otras funciones.
3. Detenga el tramo manualmente con el método `span.finish()`. **Nota**: el tramo debe finalizarse manualmente, de lo contrario no se envía.

#### Ejemplo {#example-33}

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

`LLMObs.flush()` es una función bloqueante que envía todos los datos de observabilidad de LLM en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación salga hasta que se envíen todas las trazas de observabilidad de LLM.

### Rastreando múltiples aplicaciones {#tracing-multiple-applications}

El SDK admite el rastreo de múltiples aplicaciones de LLM desde el mismo servicio.

Puede configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de su aplicación de LLM, en la que todos los tramos generados se agrupan por defecto.

Para anular esta configuración y usar un nombre de aplicación de LLM diferente para un tramo raíz dado, pase el argumento `ml_app` con el nombre de cadena de la aplicación de LLM subyacente al iniciar un tramo raíz para una nueva traza o un tramo en un nuevo proceso.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Trazando tramos usando métodos en línea {#tracing-spans-using-inline-methods-1}

El SDK `llmobs` proporciona un método en línea correspondiente para rastrear automáticamente la operación que implica un bloque de código dado. Estos métodos tienen la misma firma de argumentos que sus contrapartes de envoltura de función, con la adición de que `name` es obligatorio, ya que el nombre no puede inferirse de un callback anónimo. Este método finalizará el tramo bajo las siguientes condiciones:

- Si la función devuelve una Promesa, entonces el tramo termina cuando la promesa es resuelta o rechazada.
- Si la función toma un callback como su último parámetro, entonces el tramo termina cuando ese callback es llamado.
- Si la función no acepta un callback y no devuelve una Promesa, entonces el tramo termina al final de la ejecución de la función.

#### Ejemplo sin un callback {#example-without-a-callback}

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Ejemplo con un callback {#example-with-a-callback}

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

El tipo de retorno de esta función coincide con el tipo de retorno de la función rastreada:

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

El SDK de Observabilidad LLM de Node.js ofrece una `llmobs.decorate` función que sirve como un decorador de funciones para aplicaciones de TypeScript. El comportamiento de rastreo de esta función es el mismo que `llmobs.wrap`.

#### Ejemplo {#example-34}

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

`llmobs.flush()` es una función bloqueante que envía todos los datos de observabilidad de LLM en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación salga hasta que se envíen todas las trazas de observabilidad de LLM.

### Trazando múltiples aplicaciones {#tracing-multiple-applications-1}

El SDK admite el rastreo de múltiples aplicaciones LLM desde el mismo servicio.

Puede configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de su aplicación de LLM, en la que todos los tramos generados se agrupan por defecto.

Para anular esta configuración y usar un nombre de aplicación de LLM diferente para un tramo raíz dado, pase el argumento `mlApp` con el nombre de cadena de la aplicación de LLM subyacente al iniciar un tramo raíz para una nueva traza o un tramo en un nuevo proceso.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Directrices para nombrar aplicaciones {#application-naming-guidelines}

El nombre de su aplicación (el valor de `DD_LLMOBS_ML_APP`) debe seguir estas directrices:

- Debe ser una cadena Unicode en minúsculas
- Puede tener hasta 193 caracteres de longitud
- No puede contener guiones bajos contiguos o al final
- Puede contener los siguientes caracteres:
   - Alfanuméricos
   - Guiones bajos
   - Guiones
   - Dos puntos
   - Períodos
   - Barra

## Lectura adicional {#further-reading}

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