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
  text: Rastrea, compara y optimiza tus prompts de LLM con la Observabilidad de LLM
    de Datadog
title: Referencia del SDK de Observabilidad de LLM
---
## Descripción general

Los SDK de Observabilidad de LLM de Datadog proporcionan instrumentación automática así como APIs de instrumentación manual para ofrecer observabilidad y conocimientos sobre tus aplicaciones de LLM.

## Configuración

### Requisitos

 Una [clave API de Datadog][1].

[1]: https://app.datadoghq.com/organizationsettings/apikeys

{{< tabs >}}
{{% tab "Python" %}}
 El último paquete `ddtrace` está instalado (se requiere Python 3.7+):
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
 El último paquete `ddtrace` está instalado (se requiere Node.js 16+):
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
 Has descargado el último [`ddtracejava` JAR][1]. El SDK de Observabilidad de LLM es compatible con `ddtracejava` v1.51.0+ (se requiere Java 8+).

[1]: https://github.com/DataDog/ddtracejava
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuración de línea de comandos" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Habilita la Observabilidad de LLM ejecutando tu aplicación usando el comando `ddtracerun` y especificando las variables de entorno requeridas.

**Nota**: `ddtracerun` activa automáticamente todas las integraciones de Observabilidad de LLM.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables de entorno para la configuración de línea de comandos

`DD_SITE`
: requerido  _cadena_
<br />Sitio de Datadog de destino para la presentación de datos de LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requerido  _entero o cadena_
<br />Alternar para habilitar la presentación de datos a la Observabilidad de LLM. Debería estar configurado en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional  _cadena_
<br />El nombre de tu aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los trazos y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta las [directrices de nomenclatura de aplicaciones](#applicationnamingguidelines) para los caracteres permitidos y otras restricciones. Para anular este valor para un span raíz dado, consulta [Trazando múltiples aplicaciones](#tracingmultipleapplications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `ddtrace==3.14.0`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional  _entero o cadena_  **predeterminado**: `false`
<br />Solo es necesario si no estás utilizando el Agente de Datadog, en cuyo caso esto debe establecerse en `1` o `true`.

`DD_API_KEY`
: opcional  _cadena_
<br />Tu clave API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#noncontainerizedenvironment
{{% /tab %}}

{{% tab "Node.js" %}}
Habilita la Observabilidad LLM ejecutando tu aplicación con `NODE_OPTIONS="import ddtrace/initialize.mjs"` y especificando las variables de entorno requeridas.

**Nota**: `ddtrace/initialize.mjs` activa automáticamente todas las integraciones de APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables de entorno para la configuración de línea de comandos

`DD_SITE`
: requerido  _cadena_
<br />El sitio de Datadog para enviar tus datos LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requerido  _entero o cadena_
<br />Alternar para habilitar la presentación de datos a la Observabilidad de LLM. Debería estar configurado en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional  _cadena_
<br />El nombre de tu aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los trazos y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta las [directrices de nomenclatura de aplicaciones](#applicationnamingguidelines) para los caracteres permitidos y otras restricciones. Para anular este valor para un span raíz dado, consulta [Trazando múltiples aplicaciones](#tracingmultipleapplications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `ddtrace@5.66.0`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional  _entero o cadena_  **predeterminado**: `false`
<br />Solo es necesario si no estás utilizando el Agente de Datadog, en cuyo caso esto debe establecerse en `1` o `true`.

`DD_API_KEY`
: opcional  _cadena_
<br />Tu clave API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#noncontainerizedenvironment
{{% /tab %}}
{{% tab "Java" %}}

Habilita la Observabilidad LLM ejecutando tu aplicación con `ddtracejava` y especificando los parámetros requeridos como variables de entorno o propiedades del sistema.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables de entorno y propiedades del sistema

Puedes proporcionar los siguientes parámetros como variables de entorno (por ejemplo, `DD_LLMOBS_ENABLED`) o como propiedades del sistema Java (por ejemplo, `dd.llmobs_enabled`).

`DD_SITE` o `dd.site`
: requerido  _cadena_
<br />Sitio de Datadog de destino para la presentación de datos de LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` o `dd.llmobs.enabled`
: requerido  _entero o cadena_
<br />Alternar para habilitar la presentación de datos a la Observabilidad de LLM. Debería estar configurado en `1` o `true`.

`DD_LLMOBS_ML_APP` o `dd.llmobs.ml.app`
: opcional  _cadena_
<br />El nombre de tu aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los trazos y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta las [directrices de nomenclatura de aplicaciones](#applicationnamingguidelines) para los caracteres permitidos y otras restricciones. Para anular este valor para un span raíz dado, consulta [Trazando múltiples aplicaciones](#tracingmultipleapplications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión 1.54.0 de `ddtracejava`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED` o `dd.llmobs.agentless.enabled`
: opcional  _entero o cadena_  **predeterminado**: `false`
<br />Solo es necesario si no estás utilizando el Agente de Datadog, en cuyo caso esto debe establecerse en `1` o `true`.

`DD_API_KEY` o `dd.api.key`
: opcional  _cadena_
<br />Tu clave API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#noncontainerizedenvironment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración de Incode" level="h3" expanded=false id="in-code-setup" %}}

En lugar de usar [configuración de línea de comandos](#commandlinesetup), también puedes habilitar la Observabilidad de LLM de manera programática.

{{< tabs >}}
{{% tab "Python" %}}

Usa la función `LLMObs.enable()` para habilitar la Observabilidad de LLM.

<div class="alert alert-info">
Do not use this setup method with the <code>ddtrace-run</code> command.
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

##### Parámetros

`ml_app`
: opcional  _cadena_
<br />El nombre de tu aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los trazos y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta las [directrices de nomenclatura de aplicaciones](#applicationnamingguidelines) para los caracteres permitidos y otras restricciones. Para anular este valor para un seguimiento dado, consulta [Rastreando múltiples aplicaciones](#tracingmultipleapplications). Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_LLMOBS_ML_APP`.

`integrations_enabled`  **predeterminado**: `true`
: opcional  _booleano_
<br />Una bandera para habilitar automáticamente el rastreo de llamadas a LLM para las [integraciones de LLM][1] soportadas por Datadog. Si no se proporciona, todas las integraciones de LLM soportadas están habilitadas por defecto. Para evitar usar las integraciones de LLM, establece este valor en `false`.

`agentless_enabled`
: opcional  _booleano_  **predeterminado**: `false`
<br />Solo es necesario si no estás usando el Agente de Datadog, en cuyo caso esto debe establecerse en `True`. Esto configura la biblioteca `ddtrace` para no enviar ningún dato que requiera el Agente de Datadog. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_LLMOBS_AGENTLESS_ENABLED`.

`site`
: opcional  _cadena_
<br />El sitio de Datadog para enviar tus datos LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_SITE`.

`api_key`
: opcional  _cadena_
<br />Tu clave API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_API_KEY`.

`env`
: opcional  _cadena_
<br />El nombre del entorno de tu aplicación (ejemplos: `prod`, `preprod`, `staging`). Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_ENV`.

`service`
: opcional  _cadena_
<br />El nombre del servicio utilizado para tu aplicación. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_SERVICE`.

[1]: /es/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
Do not use this setup method with the <code>dd-trace/initialize.mjs</code> command.
</div>

Usa la función `init()` para habilitar la Observabilidad LLM.

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
: opcional  _cadena_
<br />El nombre de tu aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los trazos y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta las [directrices de nomenclatura de aplicaciones](#applicationnamingguidelines) para los caracteres permitidos y otras restricciones. Para anular este valor para un seguimiento dado, consulta [Rastreando múltiples aplicaciones](#tracingmultipleapplications). Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: opcional  _booleano_  **predeterminado**: `false`
<br />Solo es necesario si no estás utilizando el Agente de Datadog, en cuyo caso esto debe establecerse en `true`. Esto configura la biblioteca `ddtrace` para no enviar ningún dato que requiera el Agente de Datadog. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_LLMOBS_AGENTLESS_ENABLED`.

**Opciones para la configuración general del rastreador**:

`site`
: opcional  _cadena_
<br />El sitio de Datadog para enviar tus datos LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_SITE`.

`env`
: opcional  _cadena_
<br />El nombre del entorno de tu aplicación (ejemplos: `prod`, `preprod`, `staging`). Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_ENV`.

`service`
: opcional  _cadena_
<br />El nombre del servicio utilizado para tu aplicación. Si no se proporciona, esto se establece de forma predeterminada al valor de `DD_SERVICE`.

##### Variables de entorno

Establece los siguientes valores como variables de entorno. No se pueden configurar programáticamente.

`DD_API_KEY`
: opcional  _cadena_
<br />Tu clave API de Datadog. Solo es necesario si no estás utilizando el Agente de Datadog.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración de AWS Lambda" level="h3" expanded=false id="aws-lambda-setup" %}}

Para instrumentar una función de AWS Lambda existente con Observabilidad LLM, puedes usar la Extensión de Datadog y las capas de lenguaje respectivas.

1. Abre un Cloudshell en la consola de AWS.
2. Instala el cliente de Datadog CLI
```shell
npm install -g @datadog/datadog-ci
```
3. Establece la clave de API de Datadog y el sitio
```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si ya tienes o prefieres usar un secreto en el Administrador de Secretos, puedes establecer la clave de API utilizando el ARN del secreto:
```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Instala tu función Lambda con LLM Observability (esto requiere al menos la versión 77 de la capa de extensión de Datadog)
{{< tabs >}}
{{% tab "Python" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} e {{< latest-lambda-layer-version layer="extension" >}} llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Node.js" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} e {{< latest-lambda-layer-version layer="extension" >}} llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Java" %}}
```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} e {{< latest-lambda-layer-version layer="extension" >}} llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}
{{< /tabs >}}

4. Invoca tu función Lambda y verifica que los trazas de LLM Observability sean visibles en la interfaz de usuario de Datadog.

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


Después de instalar el SDK y ejecutar tu aplicación, deberías esperar ver algunos datos en LLM Observability provenientes de la autoinstrumentación. La instrumentación manual se puede utilizar para capturar marcos personalizados o operaciones de bibliotecas que aún no están soportadas.

## Instrumentación manual

{{< tabs >}}
{{% tab "Python" %}}

Para capturar una operación LLM, se puede usar un decorador de función para instrumentar fácilmente los flujos de trabajo:

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

o un enfoque basado en contextmanager para capturar operaciones detalladas:

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


Para una lista de tipos de span disponibles, consulta la [documentación de Tipos de Span][1]. Para un trazado más granular de operaciones dentro de funciones, consulta [Trazando spans usando métodos en línea](#tracingspansusinginlinemethods).

[1]: /es/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Para trazar un span, usa `llmobs.wrap(options, function)` como un envoltorio de función para la función que deseas trazar. Para una lista de tipos de span disponibles, consulta la [documentación de Tipos de Span][1]. Para un trazado más granular de operaciones dentro de funciones, consulta [Trazando spans usando métodos en línea](#tracingspansusinginlinemethods).

### Tipos de Span

Los tipos de span son requeridos y se especifican en el objeto `options` pasado a las funciones de trazado de `llmobs` (`trace`, `wrap` y `decorate`). Consulta la [documentación de Tipos de Span][1] para obtener una lista de los tipos de span soportados.

**Nota:** Los spans con un tipo de span inválido no se envían a LLM Observability.

### Captura automática de argumentos/salidas/nombres de función

`llmobs.wrap` (junto con [`llmobs.decorate`](#functiondecoratorsintypescript) para TypeScript) intenta capturar automáticamente las entradas, salidas y el nombre de la función que se está rastreando. Si necesitas anotar manualmente un span, consulta [Enriqueciendo spans](#enrichingspans). Las entradas y salidas que anotes anularán la captura automática. Además, para anular el nombre de la función, pasa la propiedad `name` en el objeto de opciones a la función `llmobs.wrap`:

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Condiciones para finalizar un span para una función envuelta

`llmobs.wrap` extiende el comportamiento subyacente de [`tracer.wrap`][2]. El span subyacente creado cuando se llama a la función se finaliza bajo las siguientes condiciones:

 Si la función devuelve una Promesa, entonces el span finaliza cuando la promesa se resuelve o se rechaza.
 Si la función toma un callback como su último parámetro, entonces el span finaliza cuando se llama a ese callback.
 Si la función no acepta un callback y no devuelve una Promesa, entonces el span finaliza al final de la ejecución de la función.

El siguiente ejemplo demuestra la segunda condición, donde el último argumento es un callback:

#### Ejemplo

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

Si la aplicación no utiliza la función de callback, se recomienda usar un bloque rastreado en línea en su lugar. Consulta [Rastreando spans usando métodos en línea](#tracingspansusinginlinemethods) para más información.

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
[2]: /es/tracing/trace_collection/custom_instrumentation/nodejs/ddapi/?tab=wrapper
{{% /tab %}}
{{% tab "Java" %}}

### Iniciando un span

Existen múltiples métodos para iniciar un span, según el tipo de span que estés iniciando. Consulta la [documentación de Tipos de Span][1] para obtener una lista de los tipos de span soportados.

Todos los spans se inician como una instancia de objeto de `LLMObsSpan`. Cada span tiene métodos que puedes usar para interactuar con el span y registrar datos.

### Finalizando un span

Los spans deben ser finalizados para que el rastro sea enviado y visible en la aplicación de Datadog.

Para finalizar un span, llama a `finish()` en una instancia de objeto span. Si es posible, envuelve el span en un bloque `try/finally` para asegurar que el span se envíe incluso si ocurre una excepción.

#### Ejemplo
```java
    try {
        LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", "ml-app-override", "session-141");
        // user logic
        // interact with started span
    } finally {
      workflowSpan.finish();
    }
```

[1]: /es/llm_observability/terms/#spankinds
{{% /tab %}}
{{< /tabs >}}

### Llamadas a LLM

<div class="alert alert-info">If you are using any LLM providers or frameworks that are supported by <a href="/llm_observability/instrumentation/auto_instrumentation/">Datadog's LLM integrations</a>, you do not need to manually start an LLM span to trace these operations.</div>

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a LLM, usa el decorador de función `ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: requerido  _cadena_
<br/>El nombre del LLM invocado.

`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`model_provider`
: opcional  _string_  **por defecto**: `"custom"`
<br />El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establece `model_provider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`session_id`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`ml_app`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear una llamada de LLM, especifica el tipo de intervalo como `llm`, y opcionalmente especifica los siguientes argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: opcional  _string_  **por defecto**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`modelProvider`
: opcional  _string_  **por defecto**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establece `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai`, o `anthropic`.

`sessionId`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`mlApp`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear una llamada de LLM, importa y llama al siguiente método con los argumentos listados a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el tipo de intervalo.

`modelName`
: opcional  _Cadena_  **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`modelProvider`
: opcional  _Cadena_  **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establece `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai`, o `anthropic`.

`mlApp`
: opcional  _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

`sessionId`
: opcional  _Cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Flujos de trabajo

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un intervalo de flujo de trabajo, utiliza el decorador de función `ddtrace.llmobs.decorators.workflow()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`session_id`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`ml_app`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Para rastrear un intervalo de flujo de trabajo, especifica el tipo de intervalo como `workflow`, y opcionalmente especifica argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`sessionId`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`mlApp`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear un intervalo de flujo de trabajo, importa y llama al siguiente método con los argumentos listados a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el tipo de intervalo.

`mlApp`
: opcional  _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

`sessionId`
: opcional  _Cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

{{% /collapse-content %}}

#### Ejemplo

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


### Agentes

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear la ejecución de un agente, utiliza el decorador de función `ddtrace.llmobs.decorators.agent()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`session_id`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`ml_app`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.
{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear la ejecución de un agente, especifica el tipo de span como `agent`, y opcionalmente especifica argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`sessionId`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`mlApp`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear la ejecución de un agente, importa y llama al siguiente método con los argumentos listados a continuación.
```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` por defecto es el nombre de la función rastreada.

`mlApp`
: opcional  _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

`sessionId`
: opcional  _Cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Llamadas a herramientas

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a una herramienta, utiliza el decorador de función `ddtrace.llmobs.decorators.tool()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`session_id`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`ml_app`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear una llamada a una herramienta, especifica el tipo de span como `tool`, y opcionalmente especifica argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: opcional  _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` por defecto es el nombre de la función rastreada.

`sessionId`
: opcional  _cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

`mlApp`
: opcional  _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear una llamada a una herramienta, importa y llama al siguiente método con los argumentos listados a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` por defecto es el nombre de la función rastreada.

`mlApp`
: opcional  _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

`sessionId`
: opcional  _Cadena_
<br/>La ID de la sesión de usuario subyacente. Consulta [Seguimiento de sesiones de usuario](#trackingusersessions) para más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tareas

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un intervalo de tarea, utiliza el decorador de función `LLMObs.task()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`nombre`
: _cadena_ opcional
<br/>El nombre de la operación. Si no se proporciona, `nombre` por defecto es el nombre de la función rastreada.

`id_sesión`
: _cadena_ opcional
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#trackingusersessions) para más información.

`ml_app`
: _cadena_ opcional
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear un intervalo de tarea, especifica el tipo de intervalo como `tarea`, y opcionalmente especifica argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`nombre`
: _cadena_ opcional
<br/>El nombre de la operación. Si no se proporciona, `nombre` por defecto es el nombre de la función rastreada.

`idSesion`
: _cadena_ opcional
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#trackingusersessions) para más información.

`mlApp`
: _cadena_ opcional
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear un intervalo de tarea, importa y llama al siguiente método con los argumentos que se enumeran a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: opcional  _String_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el nombre de la función rastreada.

`mlApp`
: opcional  _String_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación ML proporcionado al inicio de la aplicación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

`idSesion`
: opcional  _String_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#trackingusersessions) para más información.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Embeddings

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una operación de embedding, utiliza el decorador de función `LLMObs.embedding()`.

**Nota**: Anotar la entrada de un intervalo de embedding requiere un formato diferente al de otros tipos de intervalos. Consulta [Enriqueciendo intervalos](#enrichingspans) para más detalles sobre cómo especificar entradas de embedding.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: requerido  _string_
<br/>El nombre del LLM invocado.

`nombre`
: _cadena_ opcional
<br/>El nombre de la operación. Si no se proporciona, `name` se establece en el nombre de la función rastreada.

`model_provider`
: opcional  _string_  **predeterminado**: `"custom"`

`id_sesión`
: _cadena_ opcional
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#trackingusersessions) para más información.

`ml_app`
: _cadena_ opcional
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear una operación de embedding, especifica el tipo de intervalo como `embedding`, y opcionalmente especifica argumentos en el objeto de opciones.

**Nota**: Anotar la entrada de un intervalo de embedding requiere un formato diferente al de otros tipos de intervalos. Consulta [Enriqueciendo intervalos](#enrichingspans) para más detalles sobre cómo especificar entradas de embedding.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: opcional  _string_  **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`nombre`
: _cadena_ opcional
<br/>El nombre de la operación. Si no se proporciona, `name` se establece en el nombre de la función rastreada.

`modelProvider`
: opcional  _string_  **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.

`idSesion`
: _cadena_ opcional
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#trackingusersessions) para más información.

`mlApp`
: _cadena_ opcional
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{< /tabs >}}

### Recuperaciones

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un intervalo de recuperación, utiliza el decorador de función `ddtrace.llmobs.decorators.retrieval()`.

**Nota**: Anotar la salida de un intervalo de recuperación requiere un formato diferente al de otros tipos de intervalos. Consulta [Enriqueciendo intervalos](#enrichingspans) para más detalles sobre cómo especificar las salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`nombre`
: _cadena_ opcional
<br/>El nombre de la operación. Si no se proporciona, `nombre` por defecto es el nombre de la función rastreada.

`id_sesión`
: _cadena_ opcional
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#trackingusersessions) para más información.

`ml_app`
: _cadena_ opcional
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

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

Para rastrear un intervalo de recuperación, especifica el tipo de intervalo como `recuperación`, y opcionalmente especifica los siguientes argumentos en el objeto de opciones.

**Nota**: Anotar la salida de un intervalo de recuperación requiere un formato diferente al de otros tipos de intervalos. Consulta [Enriqueciendo intervalos](#enrichingspans) para más detalles sobre cómo especificar las salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`nombre`
: _cadena_ opcional
<br/>El nombre de la operación. Si no se proporciona, `nombre` por defecto es el nombre de la función rastreada.

`idSesion`
: _cadena_ opcional
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#trackingusersessions) para más información.

`mlApp`
: _cadena_ opcional
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracingmultipleapplications) para más información.

{{% /collapse-content %}}

#### Ejemplo

Lo siguiente también incluye un ejemplo de anotación de un intervalo. Consulta [Enriqueciendo intervalos](#enrichingspans) para más información.

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

## Anidando intervalos

Iniciar un nuevo intervalo antes de que el intervalo actual haya terminado rastrea automáticamente una relación padre-hijo entre los dos intervalos. El intervalo padre representa la operación más grande, mientras que el intervalo hijo representa una suboperación más pequeña anidada dentro de ella.

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


## Enriqueciendo intervalos

<div class="alert alert-info">
The <code>metrics</code> parameter here refers to numeric values attached as attributes on individual spans — not <a href="/llm_observability/monitoring/metrics/">Datadog platform metrics</a>. For certain recognized keys such as <code>input_tokens</code>, <code>output_tokens</code>, and <code>total_tokens</code>, Datadog uses these span attributes to generate corresponding platform metrics (such as <code>ml_obs.span.llm.input.tokens</code>) for use in dashboards and monitors.
</div>

{{< tabs >}}
{{% tab "Python" %}}
El SDK proporciona el método `LLMObs.annotate()` para enriquecer intervalos con entradas, salidas y metadatos.

El método `LLMObs.annotate()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-span-arguments" %}}

`intervalo`
: opcional  _Intervalo_  **por defecto**: el intervalo activo actual
<br />El intervalo a anotar. Si no se proporciona `intervalo` (como al usar decoradores de función), el SDK anota el intervalo activo actual.

`datos_entrada`
: opcional  _tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para tramos no LLM) o una lista de diccionarios con este formato: {"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}, donde "tool_calls" es una lista opcional de diccionarios de llamadas a herramientas con claves requeridas: "name", "arguments", y claves opcionales: "tool_id", "type", y "tool_results" es una lista opcional de diccionarios de resultados de herramientas con clave requerida: "result", y claves opcionales: "name", "tool_id", "type" para escenarios de llamadas a funciones. **Nota**: Los tramos de incrustación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: {"text": "..."}.

`output_data`
: opcional  _tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para tramos no LLM) o una lista de diccionarios con este formato: {"content": "...", "role": "...", "tool_calls": ...}, donde "tool_calls" es una lista opcional de diccionarios de llamadas a herramientas con claves requeridas: "name", "arguments", y claves opcionales: "tool_id", "type" para escenarios de llamadas a funciones. **Nota**: Los tramos de recuperación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: {"text": "...", "name": "...", "score": float, "id": "..."}.

`tool_definitions`
: lista opcional _de diccionarios_
<br />Lista de diccionarios de definiciones de herramientas para escenarios de llamadas a funciones. Cada definición de herramienta debe tener una clave requerida "name": "..." y claves opcionales "description": "..." y "schema": {...}.

`metadata`
: diccionario opcional _de_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante a la operación de entrada o salida descrita por el tramo ("model_temperature", "max_tokens", "top_k", etc.).

`metrics`
: diccionario opcional _de_
<br />Un diccionario de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes a la operación descrita por el tramo ("input_tokens", "output_tokens", "total_tokens", "time_to_first_token", etc.). La unidad para "time_to_first_token" es en segundos, similar a la métrica "duration" que se emite por defecto.

`tags`
: diccionario opcional _de_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el tramo. Ejemplos de claves: "session", "env", "system", y "version". Para más información sobre etiquetas, consulta [Introducción a las Etiquetas](/getting_started/tagging/).

{{% /collapse-content %}}

#### Ejemplo

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
`intervalo`
: opcional  _Intervalo_  **por defecto**: el intervalo activo actual
<br />El intervalo a anotar. Si no se proporciona `span` (como al usar envolturas de función), el SDK anota el span activo actual.

`annotationOptions`
: requerido  _objeto_
<br />Un objeto de diferentes tipos de datos para anotar el span.

El objeto `annotationOptions` puede contener lo siguiente:

`inputData`
: opcional  _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para spans no LLM) o una lista de diccionarios con este formato: `{role: "...", content: "..."}` (para spans LLM).  **Nota**: Los spans de incrustación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "..."}`.

`outputData`
: opcional  _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para spans no LLM) o una lista de objetos con este formato: `{role: "...", content: "..."}` (para spans LLM). **Nota**: Los spans de recuperación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: opcional  _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante para la operación de entrada o salida descrita por el span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional  _objeto_
<br />Un objeto de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes para la operación descrita por el span (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: opcional  _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas respecto al contexto del span (`session`, `environment`, `system`, `versioning`, etc.). Para más información sobre etiquetas, consulta [Introducción a las Etiquetas](/getting_started/tagging/).

{{% /collapse-content %}}

#### Ejemplo

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
El SDK proporciona varios métodos para anotar spans con entradas, salidas, métricas y metadatos.

### Anotando entradas y salidas

Utiliza el método miembro `annotateIO()` de la interfaz `LLMObsSpan` para agregar datos estructurados de entrada y salida a un `LLMObsSpan`. Esto incluye argumentos opcionales y objetos de mensaje LLM.

#### Argumentos

Si un argumento es nulo o está vacío, no sucede nada. Por ejemplo, si `inputData` es una cadena no vacía mientras que `outputData` es nulo, entonces solo se registra `inputData`.

`inputData`
: opcional  _Cadena_ o _Lista<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para tramos no LLM) o una lista de `LLMObs.LLMMessage`s para tramos LLM.

`outputData`
: opcional  _Cadena_ o _Lista<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para tramos no LLM) o una lista de `LLMObs.LLMMessage`s para tramos LLM.

#### Mensajes LLM
Los tramos LLM deben ser anotados con Mensajes LLM usando el objeto `LLMObs.LLMMessage`.

El objeto `LLMObs.LLMMessage` puede ser instanciado llamando a `LLMObs.LLMMessage.from()` con los siguientes argumentos:

`rol`
: requerido  _Cadena_
<br />Una cadena que describe el rol del autor del mensaje.

`contenido`
: requerido  _Cadena_
<br />Una cadena que contiene el contenido del mensaje.

#### Ejemplo

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
``` ### Agregando métricas #### Agregar métricas en bloque El método miembro `setMetrics()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar múltiples métricas en bloque: ##### Argumentos `métricas` : requerido  _Mapa&lt;string, número>
_
<br /> Un mapa de claves serializables en JSON y valores numéricos que los usuarios pueden agregar para registrar métricas relevantes a la operación descrita por el tramo (por ejemplo, `input_tokens`, `output_tokens` o `total_tokens`).

#### Agregar una sola métrica

El método miembro `setMetric()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una sola métrica:

##### Argumentos

`clave`
: requerido  _CharSequence_
<br /> El nombre de la métrica.

`valor`
: requerido  _int_, _long_, o _double_
<br /> El valor de la métrica.

#### Ejemplos

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
``` ### Agregando etiquetas Para más información sobre etiquetas, consulta [Introducción a las Etiquetas][1]. #### Agregar etiquetas en bloque El método miembro `setTags()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar múltiples etiquetas en bloque: ##### Argumentos `tags` : requerido  _Map&lt;string, object>
_
<br /> Un mapa de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas para describir el contexto del span (por ejemplo, `sesión`, `entorno`, `sistema`, o `versión`).

#### Agregar una sola etiqueta

El método miembro `setTag()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una sola etiqueta:

##### Argumentos

`clave`
: requerido  _Cadena_
<br /> La clave de la etiqueta.

`valor`
: requerido  _int_, _long_, _double_, _boolean_, o _String_
<br /> El valor de la etiqueta.

#### Ejemplos

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

### Anotando errores

#### Agregando un Throwable (recomendado)

El método miembro `addThrowable()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para adjuntar un throwable con un rastreo de pila:

##### Argumentos

`throwable`
: requerido  _Throwable_
<br /> El throwable/excepción que ocurrió.

#### Agregando un mensaje de error

El método miembro `setErrorMessage()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para adjuntar una cadena de error:

##### Argumentos

`errorMessage`
: requerido  _Cadena_
<br /> El mensaje del error.

#### Estableciendo una bandera de error

El método miembro `setError()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para indicar un error con la operación:

##### Argumentos

`error`
: requerido  _booleano_
<br /> `true` si el span tuvo un error.

#### Ejemplos

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
``` ### Anotando metadatos El método miembro `setMetadata()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos: `metadata` : requerido  _Mapa&lt;string, objeto>
_
<br />Un mapa de pares clave-valor serializables en JSON que contiene metadatos relevantes para la operación de entrada o salida descrita por el span.

#### Ejemplo
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

### Anotando spans autoinstrumentados

{{< tabs >}}
{{% tab "Python" %}}

El método `LLMObs.annotation_context()` del SDK devuelve un administrador de contexto que se puede usar para modificar todos los spans autoinstrumentados iniciados mientras el contexto de anotación está activo.

El método `LLMObs.annotation_context()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`nombre`
: opcional  _str_
<br />Nombre que reemplaza el nombre del span para cualquier span autoinstrumentado que se inicie dentro del contexto de anotación.

`prompt`
: diccionario opcional _de_
<br />Un diccionario que representa el prompt utilizado para una llamada LLM. Consulta la documentación del [objeto Prompt](#prompttrackingarguments) para el esquema completo y las claves soportadas. También puedes importar el objeto `Prompt` de `ddtrace.llmobs.utils` y pasarlo como el argumento `prompt`. **Nota**: Este argumento solo se aplica a los spans de LLM.

`tags`
: diccionario opcional _de_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el tramo. Ejemplos de claves: "session", "env", "system", y "version". Para más información sobre etiquetas, consulta [Introducción a las Etiquetas](/getting_started/tagging/).

{{% /collapse-content %}}

#### Ejemplo

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

El `llmobs.annotationContext()` del SDK acepta una función de callback que se puede usar para modificar todos los spans autoinstrumentados iniciados mientras se está dentro del alcance de la función de callback.

El método `llmobs.annotationContext()` acepta las siguientes opciones en el primer argumento:

{{% collapse-content title="Opciones" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`nombre`
: opcional  _str_
<br />Nombre que reemplaza el nombre del span para cualquier span autoinstrumentado que se inicie dentro del contexto de anotación.

`tags`
: opcional  _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el span. Ejemplos de claves: "session", "env", "system", y "version". Para más información sobre etiquetas, consulta [Introducción a las Etiquetas](/getting_started/tagging/).

{{% /collapse-content %}}

#### Ejemplo

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

## Seguimiento de prompts

Adjunta metadatos estructurados del prompt al span de LLM para que puedas reproducir resultados, auditar cambios y comparar el rendimiento del prompt entre versiones. Al usar plantillas, LLM Observability también proporciona [seguimiento de versiones](#versiontracking) basado en cambios en el contenido de la plantilla.

{{< tabs >}}
{{% tab "Python" %}}
Usa `LLMObs.annotation_context(prompt=...)` para adjuntar metadatos del prompt antes de la llamada a LLM. Para más detalles sobre la anotación de spans, consulta [Enriqueciendo spans](#enrichingspans).

#### Argumentos

{{% collapse-content title="Argumentos" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: diccionario requerido
<br />Un diccionario tipado que sigue el esquema de Prompt a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h4" expanded=false id="prompt-structure" %}}

Claves soportadas:

 `id` (str): Identificador lógico para este prompt. Debería ser único por `ml_app`. Por defecto es `{ml_app}unnamed_prompt`
 `version` (str): Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Consulta [seguimiento de versiones](#versiontracking) para más detalles.
 `variables` (Dict[str, str]): Variables utilizadas para poblar los marcadores de posición de la plantilla.
 `template` (str): Cadena de plantilla con marcadores de posición (por ejemplo, `"Traducir {{text}} a {{lang}}"`).
 `chat_template` (Lista[Mensaje]): Forma de plantilla de múltiples mensajes. Proporciona una lista de `{ "rol": "<role>", "contenido": "<template string with placeholders>" }` objetos.
 `tags` (Dict[str, str]): Etiquetas para adjuntar a la ejecución del aviso.
 `rag_context_variables` (Lista[str]): Claves de variable que contienen contenido de verdad/ contexto. Usado para [detección de alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).
 `rag_query_variables` (Lista[str]): Claves de variable que contienen la consulta del usuario. Usado para [detección de alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).

{{% /collapse-content %}}

#### Ejemplo: aviso de plantilla única

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

#### Ejemplo: plantillas de aviso de LangChain

Cuando uses la plantilla de aviso de LangChain con autoinstrumentación, asigna plantillas a variables con nombres significativos. La autoinstrumentación utiliza estos nombres para identificar los avisos.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Usa `llmobs.annotationContext({ prompt: ... }, () => { ... })` para adjuntar metadatos del aviso antes de la llamada al LLM. Para más detalles sobre la anotación de spans, consulta [Enriqueciendo spans](#enrichingspans).

#### Argumentos

{{% collapse-content title="Opciones" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: objeto requerido
<br />Un objeto que sigue el esquema de aviso a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h4" expanded=false id="prompt-structure" %}}

Propiedades soportadas:  `id` (cadena): Identificador lógico para este aviso. Debería ser único por `ml_app`. Por defecto es `{ml_app}unnamed_prompt`  `version` (cadena): Etiqueta de versión para el aviso (por ejemplo, "1.0.0"). Consulta [seguimiento de versiones](#versiontracking) para más detalles.  `variables` (Registro&lt;string, string>)
): Variables utilizadas para llenar los marcadores de posición de la plantilla.  `template` (cadena | Lista&lt;Mensaje>): Cadena de plantilla con marcadores de posición (por ejemplo, `"Traducir {{text}} a {{lang}}"`). Alternativamente, una lista de `{ "rol": "<role>", "contenido": "<template string with placeholders>" }` objetos.  `tags` (Registro&lt;string, string>)
): Etiquetas para adjuntar a la ejecución del aviso.  `contextVariables` (cadena[]): Claves de variable que contienen contenido de verdad de referencia/contexto. Usado para [detección de alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).  `queryVariables` (cadena[]): Claves de variable que contienen la consulta del usuario. Usado para [detección de alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).

{{% /collapse-content %}}

#### Ejemplo: aviso de plantilla única

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

#### Notas
 Anotar un aviso solo está disponible en los intervalos de LLM.
 Coloca la anotación inmediatamente antes de la llamada al proveedor para que se aplique al intervalo de LLM correcto.
 Usa un `id` de aviso único para distinguir diferentes avisos dentro de tu aplicación.
 Mantén las plantillas estáticas utilizando la sintaxis de marcadores de posición (como `{{nombre_variable}}`) y define el contenido dinámico en la sección de `variables`.
 Para múltiples llamadas de LLM autoinstrumentadas dentro de un bloque, usa un contexto de anotación para aplicar los mismos metadatos de aviso en todas las llamadas. Consulta [Anotando intervalos autoinstrumentados](#annotatingautoinstrumentedspans).

### Seguimiento de versiones

LLM Observability proporciona versionado automático para tus avisos cuando no se especifica una versión explícita. Cuando proporcionas un `template` o `chat_template` en los metadatos de tu aviso sin una etiqueta de `version`, el sistema genera automáticamente una versión al calcular un hash del contenido de la plantilla. Si proporcionas una etiqueta de `version`, LLM Observability utiliza la etiqueta de versión que especificaste en lugar de generar una automáticamente.

El sistema de versionado funciona de la siguiente manera:
 **Versionado automático**: Cuando no se proporciona una etiqueta de `versión`, LLM Observability calcula un hash del contenido de `template` o `chat_template` para generar automáticamente un identificador de versión numérico.
 **Versionado manual**: Cuando se proporciona una etiqueta de `versión`, LLM Observability utiliza la etiqueta de versión que especificaste exactamente como la proporcionaste.
 **Historial de versiones**: Tanto las versiones autogeneradas como las manuales se mantienen en el historial de versiones para rastrear la evolución de los prompts a lo largo del tiempo.

Esto te brinda la flexibilidad de confiar en la gestión automática de versiones basada en los cambios en el contenido del template, o mantener el control total sobre el versionado con tus propias etiquetas de versión.

## Monitoreo de costos
Adjunta métricas de tokens (para el seguimiento automático de costos) o métricas de costos (para el seguimiento manual de costos) a tus spans de LLM/embedding. Las métricas de tokens permiten a Datadog calcular costos utilizando los precios del proveedor, mientras que las métricas de costos te permiten proporcionar tu propio precio al usar modelos personalizados o no soportados. Para más detalles, consulta [Costos][14].

Si estás utilizando instrumentación automática, las métricas de tokens y costos aparecen en tus spans automáticamente. Si estás instrumentando manualmente, sigue la guía a continuación.

<div class="alert alert-info">In this context, "token metrics" and "cost metrics" refer to numeric key-value pairs you attach to spans through the <code>metrics</code> parameter of the <code>LLMObs.annotate()</code> method. These are distinct from <a href="/llm_observability/monitoring/metrics/">Datadog platform LLM Observability metrics</a>. For recognized keys such as <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code>, and <code>output_cost</code>, Datadog uses these span attributes to generate corresponding platform metrics (such as <code>ml_obs.span.llm.input.cost</code>) for use in dashboards and monitors.</div>

{{< tabs >}}
{{% tab "Python" %}}

#### Caso de uso: Usando un proveedor de modelos común
Datadog soporta proveedores de modelos comunes como OpenAI, Azure OpenAI, Anthropic y Google Gemini. Al usar estos proveedores, solo necesitas anotar tu solicitud de LLM con `model_name`, `model_provider` y el uso de tokens. Datadog calcula automáticamente el costo estimado basado en los precios del proveedor.

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

#### Caso de uso: Usando un modelo personalizado
Para modelos personalizados o no soportados, debes anotar el span manualmente con los datos de costo.

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


## Evaluaciones

El SDK de LLM Observability proporciona métodos para exportar y enviar tus evaluaciones a Datadog.

<div class="alert alert-info">For building reusable, class-based evaluators (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) with rich result metadata, see the <a href="/llm_observability/guide/evaluation_developer_guide/">Evaluation Developer Guide</a>.</div>

Las evaluaciones deben unirse a un solo span. Puedes identificar el rango objetivo utilizando cualquiera de estos dos métodos:
 _Unión basada en etiquetas_ Une una evaluación utilizando un par de etiquetas de clave-valor único que se establece en un solo rango. La evaluación no se unirá si el par de clave-valor de la etiqueta coincide con múltiples rangos o con ningún rango.
 _Referencia directa al rango_ Une una evaluación utilizando la combinación del ID de traza único del rango y el ID del rango.

### Exportando un rango
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` se puede utilizar para extraer el contexto del rango de un rango. Este método es útil para asociar tu evaluación con el rango correspondiente.

#### Argumentos
El método `LLMObs.export_span()` acepta el siguiente argumento:

`intervalo`
: opcional  _Rango_
<br />El rango del cual extraer el contexto del rango (IDs de rango y de traza). Si no se proporciona (como al usar decoradores de función), el SDK exporta el rango activo actual.

#### Ejemplo

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
`llmobs.exportSpan()` se puede utilizar para extraer el contexto del rango de un rango. Necesitarás usar este método para asociar tu evaluación con el rango correspondiente.

#### Argumentos

El método `llmobs.exportSpan()` acepta el siguiente argumento:

`intervalo`
: opcional  _Rango_
<br />El rango del cual extraer el contexto del rango (IDs de rango y de traza). Si no se proporciona (como al usar envolturas de función), el SDK exporta el rango activo actual.

#### Ejemplo

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

### Enviando evaluaciones

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` se puede utilizar para enviar tu evaluación personalizada asociada con un rango dado.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> is deprecated and will be removed in the next major version of ddtrace (4.0). To migrate, rename your <code>LLMObs.submit_evaluation_for</code> calls with <code>LLMObs.submit_evaluation</code>.</div>

**Nota**: Las evaluaciones personalizadas son evaluadores que implementas y alojas tú mismo. Estas difieren de las evaluaciones listas para usar, que son calculadas automáticamente por Datadog utilizando evaluadores integrados. Para configurar evaluaciones listas para usar para tu aplicación, utiliza la página [**LLM Observability** > **Configuraciones** > **Evaluaciones**][1] en Datadog.

El método `LLMObs.submit_evaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}
`etiqueta`
: requerido  _string_
<br />El nombre de la evaluación.

`tipo_metrica`
: requerido  _string_
<br />El tipo de la evaluación. Debe ser `categórico`, `puntaje`, `booleano` o `json`.

`valor`
: requerido _cadena, tipo numérico o diccionario_
<br />El valor de la evaluación. Debe ser una cadena (`tipo_metrica==categórico`), entero/flotante (`tipo_metrica==puntaje`), booleano (`tipo_metrica==booleano`), o diccionario (`tipo_metrica==json`).

`intervalo`
: diccionario opcional _de_
<br />Un diccionario que identifica de manera única el intervalo asociado con esta evaluación. Debe contener `span_id` (cadena) y `trace_id` (cadena). Utiliza [`LLMObs.export_span()`](#exportandounintervalo) para generar este diccionario.

`intervalo_con_valor_etiqueta`
: diccionario opcional _de_
<br />Un diccionario que identifica de manera única el intervalo asociado con esta evaluación. Debe contener `clave_etiqueta` (cadena) y `valor_etiqueta` (cadena).

   **Nota**: Se requiere exactamente uno de `intervalo` o `intervalo_con_valor_etiqueta`. Proporcionar ambos, o ninguno, genera un ValueError.

`ml_app`
: requerido  _string_
<br />El nombre de la aplicación de ML.

`timestamp_ms`
: opcional _entero_
<br />La marca de tiempo unix en milisegundos cuando se generó el resultado de la métrica de evaluación. Si no se proporciona, esto se establece de forma predeterminada en la hora actual.

`tags`
: diccionario opcional _de_
<br />Un diccionario de pares clave-valor de cadenas que los usuarios pueden agregar como etiquetas relacionadas con la evaluación. Para más información sobre etiquetas, consulta [Introducción a las Etiquetas](/getting_started/tagging/).

`evaluación`
: _cadena_ opcional
<br />Una evaluación de esta evaluación. Los valores aceptados son `aprobado` y `reprobado`.

`razonamiento`
: _cadena_ opcional
<br />Una explicación en texto del resultado de la evaluación.

`metadata`
: diccionario opcional _de_
<br />Un diccionario que contiene metadatos estructurados arbitrarios asociados con el resultado de la evaluación.
{{% /collapse-content %}}

#### Ejemplo

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

`llmobs.submitEvaluation()` se puede usar para enviar tu evaluación personalizada asociada con un intervalo dado.

El método `llmobs.submitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: requerido  _diccionario_
<br />El contexto del intervalo para asociar la evaluación. Esto debería ser la salida de `LLMObs.export_span()`.

`evaluationOptions`
: requerido  _objeto_
<br />Un objeto de los datos de evaluación.

El objeto `evaluationOptions` puede contener lo siguiente:

`label`
: requerido  _cadena_
<br />El nombre de la evaluación.

`metricType`
: requerido  _cadena_
<br />El tipo de la evaluación. Debe ser uno de "categórico", "puntaje", "booleano" o "json".

`value`
: requerido  _cadena o tipo numérico_
<br />El valor de la evaluación. Debe ser una cadena (para `metric_type` categórico), un número (para `metric_type` de puntaje), un booleano (para `metric_type` booleano) o un objeto JSON (para `metric_type` json).

`tags`
: opcional  _diccionario_
<br />Un diccionario de pares clave-valor de cadenas que los usuarios pueden agregar como etiquetas relacionadas con la evaluación. Para más información sobre etiquetas, consulta [Introducción a las Etiquetas](/getting_started/tagging/).

`assessment`
: opcional  _cadena_
<br />Una evaluación de esta evaluación. Los valores aceptados son `pass` y `fail`.

`reasoning`
: opcional  _cadena_
<br />Una explicación en texto del resultado de la evaluación.

`metadata`
: opcional  _diccionario_
<br />Un objeto JSON que contiene metadatos estructurados arbitrarios asociados con el resultado de la evaluación.
{{% /collapse-content %}}

#### Ejemplo

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

Usa `LLMObs.SubmitEvaluation()` para enviar tu evaluación personalizada asociada con un intervalo dado.

El método `LLMObs.SubmitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: requerido  _LLMObsSpan_
<br />El contexto del intervalo para asociar la evaluación.

`label`
: requerido  _String_
<br />El nombre de la evaluación.

`categoricalValue` o `scoreValue`
: requerido  _String_ o _double_
<br />El valor de la evaluación. Debe ser una cadena (para evaluaciones categóricas) o un doble (para evaluaciones de puntaje). `tags` : opcional  _Map&lt;string, object>
_
<br />Un diccionario de pares clave-valor de cadenas utilizado para etiquetar la evaluación. Para más información sobre etiquetas, consulta [Introducción a las Etiquetas](/getting_started/tagging/).
{{% /collapse-content %}}

#### Ejemplo

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

## Procesamiento de spans

Para modificar los datos de entrada y salida en spans, puedes configurar una función procesadora. La función procesadora tiene acceso a las etiquetas de span para permitir la modificación condicional de entrada/salida. Las funciones procesadoras pueden devolver el span modificado para emitirlo, o devolver `None`/`null` para evitar que el span sea emitido por completo. Esto es útil para filtrar spans que contienen datos sensibles o que cumplen ciertos criterios.

{{< tabs >}}
{{% tab "Python" %}}

### Ejemplo

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


### Ejemplo: modificación condicional con autoinstrumentación

Al usar autoinstrumentación, el span no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en spans autoinstrumentados, se puede usar `annotation_context()` además de un procesador de spans.

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

### Ejemplo: evitando que los spans sean emitidos

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

### Ejemplo

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

### Ejemplo: modificación condicional con autoinstrumentación

Al usar autoinstrumentación, el span no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en spans autoinstrumentados, se puede usar `llmobs.annotationContext()` además de un procesador de spans.

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

### Ejemplo: evitando que los spans sean emitidos

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


## Seguimiento de sesiones de usuario

El seguimiento de sesiones te permite asociar múltiples interacciones con un usuario dado.

{{< tabs >}}
{{% tab "Python" %}}
Al iniciar un span raíz para un nuevo rastro o span en un nuevo proceso, especifica el argumento `session_id` con el ID de cadena de la sesión de usuario subyacente, que se envía como una etiqueta en el span. Opcionalmente, también puedes especificar las etiquetas `user_handle`, `user_name` y `user_id`.

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

### Etiquetas de seguimiento de sesiones

| Etiqueta | Descripción |
|||
| `session_id` | El ID que representa una única sesión de usuario, por ejemplo, una sesión de chat. |
| `user_handle` | El identificador del usuario de la sesión de chat. |
| `user_name` | El nombre del usuario de la sesión de chat. |
| `user_id` | El ID del usuario de la sesión de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Al iniciar un span raíz para un nuevo rastro o span en un nuevo proceso, especifica el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Al iniciar un span raíz para un nuevo rastro o span en un nuevo proceso, especifica el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

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

## Trazado distribuido

El SDK soporta el trazado a través de servicios o hosts distribuidos. El trazado distribuido funciona propagando información de span a través de solicitudes web.

{{< tabs >}}
{{% tab "Python" %}}

La biblioteca `ddtrace` proporciona algunas integraciones listas para usar que soportan el trazado distribuido para populares [frameworks web][1] y bibliotecas de [HTTP][2]. Si tu aplicación realiza solicitudes utilizando estas bibliotecas soportadas, puedes habilitar el trazado distribuido ejecutando:
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si tu aplicación no utiliza ninguna de estas bibliotecas soportadas, puedes habilitar el trazado distribuido propagando manualmente la información de span hacia y desde los encabezados HTTP. El SDK proporciona los métodos auxiliares `LLMObs.inject_distributed_headers()` y `LLMObs.activate_distributed_headers()` para inyectar y activar contextos de trazado en los encabezados de solicitud.

### Inyectando encabezados distribuidos

El método `LLMObs.inject_distributed_headers()` toma un span e inyecta su contexto en los encabezados HTTP que se incluirán en la solicitud. Este método acepta los siguientes argumentos:

`request_headers`
: requerido  _diccionario_
<br />Los encabezados HTTP que se extenderán con atributos de contexto de trazado.

`span`
: opcional  _Span_  **por defecto**: `El span activo actual.`
<br />El span cuyo contexto se inyectará en los encabezados de solicitud proporcionados. Cualquier span (incluyendo aquellos con decoradores de función), esto por defecto es el span activo actual.

### Activando encabezados distribuidos

El método `LLMObs.activate_distributed_headers()` toma encabezados HTTP y extrae atributos de contexto de trazado para activar en el nuevo servicio.

**Nota**: Debes llamar a `LLMObs.activate_distributed_headers()` antes de iniciar cualquier span en tu servicio descendente. Los spans iniciados previamente (incluyendo spans de decoradores de función) no se capturan en el trazado distribuido.

Este método acepta el siguiente argumento:

`request_headers`
: requerido  _diccionario_
<br />Los encabezados HTTP de los cuales extraer atributos de contexto de trazado.


### Ejemplo

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
[2]: /es/tracing/trace_collection/compatibility/python/#librarycompatibility
{{% /tab %}}
{{% tab "Node.js" %}}

La biblioteca `ddtrace` proporciona integraciones listas para usar que soportan trazado distribuido para populares [marcos web][1]. Requerir el tracer habilita automáticamente estas integraciones, pero puedes deshabilitarlas opcionalmente con:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /es/tracing/trace_collection/compatibility/nodejs/#webframeworkcompatibility
{{% /tab %}}
{{< /tabs >}}


## Trazado avanzado

{{< tabs >}}
{{% tab "Python" %}}
### Trazado de spans utilizando métodos en línea

Para cada tipo de span, la clase `ddtrace.llmobs.LLMObs` proporciona un método en línea correspondiente para trazar automáticamente la operación que implica un bloque de código dado. Estos métodos tienen la misma firma de argumentos que sus contrapartes de decorador de función, con la adición de que `name` por defecto es el tipo de span (`llm`, `workflow`, etc.) si no se proporciona. Estos métodos se pueden usar como administradores de contexto para finalizar automáticamente el span después de que se complete el bloque de código encerrado.

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Persistiendo un span a través de contextos

Para iniciar y detener manualmente un span a través de diferentes contextos o ámbitos:

1. Inicia un span manualmente utilizando los mismos métodos (por ejemplo, el método `LLMObs.workflow` para un span de flujo de trabajo), pero como una llamada de función simple en lugar de como un administrador de contexto.
2. Pasa el objeto span como un argumento a otras funciones.
3. Detén el span manualmente con el método `span.finish()`. **Nota**: el span debe ser finalizado manualmente, de lo contrario no se envía.

#### Ejemplo

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

#### Forzar el vaciado en entornos sin servidor

`LLMObs.flush()` es una función bloqueante que envía todos los datos de observabilidad LLM en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación salga hasta que se envíen todos los trazados de observabilidad LLM.

### Trazando múltiples aplicaciones

El SDK admite el trazado de múltiples aplicaciones LLM desde el mismo servicio.

Puedes configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de tu aplicación LLM, en la que todos los spans generados se agrupan por defecto.

Para anular esta configuración y usar un nombre de aplicación LLM diferente para un span raíz dado, pasa el argumento `ml_app` con el nombre de cadena de la aplicación LLM subyacente al iniciar un span raíz para un nuevo trazado o un span en un nuevo proceso.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Trazado de spans utilizando métodos en línea

El SDK `llmobs` proporciona un método en línea correspondiente para trazar automáticamente la operación que implica un bloque de código dado. Estos métodos tienen la misma firma de argumentos que sus contrapartes de envoltura de función, con la adición de que `name` es requerido, ya que el nombre no se puede inferir de un callback anónimo. Este método finalizará el span bajo las siguientes condiciones:

 Si la función devuelve una Promesa, entonces el span finaliza cuando la promesa se resuelve o se rechaza.
 Si la función toma un callback como su último parámetro, entonces el span finaliza cuando se llama a ese callback.
 Si la función no acepta un callback y no devuelve una Promesa, entonces el span finaliza al final de la ejecución de la función.

#### Ejemplo sin un callback

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Ejemplo con un callback

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

### Decoradores de funciones en TypeScript

El SDK de Observabilidad LLM de Node.js ofrece una función `llmobs.decorate` que sirve como un decorador de funciones para aplicaciones de TypeScript. El comportamiento de rastreo de esta función es el mismo que `llmobs.wrap`.

#### Ejemplo

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

### Forzar el vaciado en entornos sin servidor

`llmobs.flush()` es una función bloqueante que envía todos los datos de Observabilidad LLM en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación salga hasta que se envíen todos los trazados de observabilidad LLM.

### Trazando múltiples aplicaciones

El SDK admite el trazado de múltiples aplicaciones LLM desde el mismo servicio.

Puedes configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de tu aplicación LLM, en la que todos los spans generados se agrupan por defecto.

Para anular esta configuración y usar un nombre de aplicación LLM diferente para un span raíz dado, pasa el argumento `mlApp` con el nombre de cadena de la aplicación LLM subyacente al iniciar un span raíz para un nuevo rastreo o un span en un nuevo proceso.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Directrices para nombrar aplicaciones

El nombre de tu aplicación (el valor de `DD_LLMOBS_ML_APP`) debe seguir estas directrices:

 Debe ser una cadena Unicode en minúsculas
 Puede tener hasta 193 caracteres de longitud
 No puede contener guiones bajos contiguos o finales
 Puede contener los siguientes caracteres:
    Alfanuméricos
    Guiones bajos
    Guiones
    Dos puntos
    Puntos
    Barra

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/openai/openaipython
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchainai/langchain
[7]: /es/account_management/apiappkeys/#addanapikeyorclienttoken
[8]: /es/llm_observability/terms/
[9]: /es/getting_started/tagging/
[10]: https://github.com/DataDog/llmobservability
[11]: /es/tracing/trace_collection/compatibility/python/#integrations
[12]: /es/tracing/trace_collection/compatibility/python/#librarycompatibility
[13]: /es/llm_observability/instrumentation/auto_instrumentation/
[14]: /es/llm_observability/monitoring/cost