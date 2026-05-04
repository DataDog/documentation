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
## Resumen {#overview}

Los SDK de Observabilidad de LLM de Datadog proporcionan instrumentación automática así como APIs de instrumentación manual para ofrecer visibilidad y conocimientos sobre tus aplicaciones de LLM.

## Configuración {#setup}

### Requisitos {#requirements}

- Una [clave API de Datadog][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- El último paquete `ddtrace` está instalado (se requiere Python 3.7+):
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- El último paquete `dd-trace` está instalado (se requiere Node.js 16+):
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- Has descargado el último [`dd-trace-java` JAR][1]. El SDK de Observabilidad de LLM es compatible con `dd-trace-java` v1.51.0+ (se requiere Java 8+).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuración de línea de comandos" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Habilita la Observabilidad de LLM ejecutando tu aplicación usando el comando `ddtrace-run` y especificando las variables de entorno requeridas.

**Nota**: `ddtrace-run` activa automáticamente todas las integraciones de Observabilidad de LLM.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables de entorno para la configuración de línea de comandos {#environment-variables-for-command-line-setup}

`DD_SITE`
: requerido - _cadena_
<br />Sitio de Datadog de destino para la presentación de datos de LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requerido - _entero o cadena_
<br />Alternar para habilitar el envío de datos a LLM Observability. Debería establecerse en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los rastros y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un span raíz dado, consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `ddtrace==3.14.0`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es requerido si no está utilizando el Agente de Datadog, en cuyo caso esto debería establecerse en `1` o `true`.

`DD_API_KEY`
: opcional - _cadena_
<br />Su clave API de Datadog. Solo es requerido si no está utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}

{{% tab "Node.js" %}}
Habilite LLM Observability ejecutando su aplicación con `NODE_OPTIONS="--import dd-trace/initialize.mjs"` y especificando las variables de entorno requeridas.

**Nota**: `dd-trace/initialize.mjs` activa automáticamente todas las integraciones de APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables de entorno para la configuración de línea de comandos {#environment-variables-for-command-line-setup-1}

`DD_SITE`
: requerido - _cadena_
<br />El sitio de Datadog para enviar sus datos de LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: requerido - _entero o cadena_
<br />Alternar para habilitar el envío de datos a LLM Observability. Debería establecerse en `1` o `true`.

`DD_LLMOBS_ML_APP`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los rastros y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un span raíz dado, consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión `dd-trace@5.66.0`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es requerido si no está utilizando el Agente de Datadog, en cuyo caso esto debería establecerse en `1` o `true`.

`DD_API_KEY`
: opcional - _cadena_
<br />Su clave API de Datadog. Solo es requerido si no está utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Habilite LLM Observability ejecutando su aplicación con `dd-trace-java` y especificando los parámetros requeridos como variables de entorno o propiedades del sistema.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables de entorno y propiedades del sistema {#environment-variables-and-system-properties}

Puede proporcionar los siguientes parámetros como variables de entorno (por ejemplo, `DD_LLMOBS_ENABLED`) o como propiedades del sistema Java (por ejemplo, `dd.llmobs_enabled`).

`DD_SITE` o `dd.site`
: requerido - _cadena_
<br />Sitio de Datadog de destino para la presentación de datos de LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` o `dd.llmobs.enabled`
: requerido - _entero o cadena_
<br />Alternar para habilitar la presentación de datos a LLM Observability. Debería estar configurado en `1` o `true`.

`DD_LLMOBS_ML_APP` o `dd.llmobs.ml.app`
: opcional - _cadena_
<br />El nombre de su aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los trazos y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un span raíz dado, consulte [Trazando múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece de forma predeterminada en el valor de [`DD_SERVICE`][1], o el valor de un `DD_LLMOBS_ML_APP` propagado desde un servicio ascendente.
<br />**Nota**: Antes de la versión 1.54.0 de `dd-trace-java`, este es un **campo requerido**.

`DD_LLMOBS_AGENTLESS_ENABLED` o `dd.llmobs.agentless.enabled`
: opcional - _entero o cadena_ - **predeterminado**: `false`
<br />Solo es requerido si no está utilizando el Agente de Datadog, en cuyo caso esto debería estar configurado en `1` o `true`.

`DD_API_KEY` o `dd.api.key`
: opcional - _cadena_
<br />Tu clave de API de Datadog. Solo es requerido si no está utilizando el Agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración en el código" level="h3" expanded=false id="in-code-setup" %}}

En lugar de usar [la configuración de línea de comandos](#command-line-setup), también puedes habilitar la Observabilidad LLM de manera programática.

{{< tabs >}}
{{% tab "Python" %}}

Utiliza la `LLMObs.enable()` función para habilitar la Observabilidad LLM.

<div class="alert alert-info">
No utilices este método de configuración con el comando <code>ddtrace-run</code>.
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
<br />El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todos los trazos y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [las pautas de nomenclatura de aplicaciones](#application-naming-guidelines) para los caracteres permitidos y otras restricciones. Para sobrescribir este valor para un trazo dado, consulta [Trazando múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece por defecto en el valor de `DD_LLMOBS_ML_APP`.

`integrations_enabled` - **por defecto**: `true`
: opcional - _booleano_
<br />Una bandera para habilitar automáticamente el trazado de llamadas LLM para las [integraciones LLM][1] soportadas por Datadog. Si no se proporciona, todas las integraciones LLM soportadas están habilitadas por defecto. Para evitar usar las integraciones LLM, establece este valor en `false`.

`agentless_enabled`
: opcional - _booleano_ - **por defecto**: `false`
<br />Solo es requerido si no estás utilizando el Agente de Datadog, en cuyo caso esto debe establecerse en `True`. Esto configura la `ddtrace` biblioteca para no enviar ningún dato que requiera el Agente de Datadog. Si no se proporciona, esto se establece por defecto en el valor de `DD_LLMOBS_AGENTLESS_ENABLED`.

`site`
: opcional - _cadena_
<br />El sitio de Datadog para enviar tus datos de LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto se establece por defecto al valor de `DD_SITE`.

`api_key`
: opcional - _cadena_
<br />Tu clave API de Datadog. Solo es requerido si no está utilizando el Agente de Datadog. Si no se proporciona, esto se establece por defecto al valor de `DD_API_KEY`.

`env`
: opcional - _cadena_
<br />El nombre del entorno de tu aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se proporciona, esto se establece por defecto al valor de `DD_ENV`.

`service`
: opcional - _cadena_
<br />El nombre del servicio utilizado para tu aplicación. Si no se proporciona, esto se establece por defecto al valor de `DD_SERVICE`.

[1]: /es/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
No utilices este método de configuración con el comando <code>dd-trace/initialize.mjs</code>.
</div>

Utiliza la `init()` función para habilitar la Observabilidad LLM.

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
<br />El nombre de tu aplicación, servicio o proyecto de LLM, bajo el cual se agrupan todos los rastros y spans. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta [Directrices de nomenclatura de aplicaciones](#application-naming-guidelines) para caracteres permitidos y otras restricciones. Para anular este valor para un rastreo dado, consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications). Si no se proporciona, esto se establece por defecto al valor de `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: opcional - _booleano_ - **por defecto**: `false`
<br />Solo es necesario si no estás utilizando el Agente de Datadog, en cuyo caso esto debe establecerse en `true`. Esto configura la biblioteca `dd-trace` para no enviar ningún dato que requiera el Agente de Datadog. Si no se proporciona, esto se establece por defecto al valor de `DD_LLMOBS_AGENTLESS_ENABLED`.

**Opciones para la configuración general del rastreador**:

`site`
: opcional - _cadena_
<br />El sitio de Datadog para enviar los datos de tu LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}. Si no se proporciona, esto se establece por defecto al valor de `DD_SITE`.

`env`
: opcional - _cadena_
<br />El nombre del entorno de tu aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se proporciona, esto se establece por defecto al valor de `DD_ENV`.

`service`
: opcional - _cadena_
<br />El nombre del servicio utilizado para tu aplicación. Si no se proporciona, esto se establece por defecto al valor de `DD_SERVICE`.

##### Variables de entorno {#environment-variables}

Establece los siguientes valores como variables de entorno. No se pueden configurar programáticamente.

`DD_API_KEY`
: opcional - _cadena_
<br />Tu clave API de Datadog. Solo es requerido si no está utilizando el Agente de Datadog.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="AWS Lambda Setup" level="h3" expanded=false id="aws-lambda-setup" %}}

Para instrumentar una función de AWS Lambda existente con LLM Observability, puedes usar la Extensión de Datadog y las respectivas capas de lenguaje.

1. Abre un Cloudshell en la consola de AWS.
2. Instala el cliente CLI de Datadog

```shell
npm install -g @datadog/datadog-ci
```
3. Establece la clave API de Datadog y el sitio

```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si ya tienes o prefieres usar un secreto en Secrets Manager, puedes establecer la clave API utilizando el ARN del secreto:

```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Instala tu función Lambda con LLM Observability (esto requiere al menos la versión 77 de la capa de Extensión de Datadog)
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

4. Invoca tu función Lambda y verifica que los rastros de LLM Observability sean visibles en la interfaz de usuario de Datadog.

Limpie manualmente los rastros de observabilidad de LLM utilizando el método `flush` antes de que la función Lambda regrese.

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


Después de instalar el SDK y ejecutar su aplicación, debe esperar ver algunos datos en la observabilidad de LLM a partir de la auto-instrumentación. La instrumentación manual se puede utilizar para capturar marcos personalizados o operaciones de bibliotecas que aún no están soportadas.

## Instrumentación manual {#manual-instrumentation}

{{< tabs >}}
{{% tab "Python" %}}

Para capturar una operación de LLM, se puede utilizar un decorador de función para instrumentar fácilmente los flujos de trabajo:

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


Para una lista de tipos de span disponibles, consulte la [documentación de Tipos de Span][1]. Para un rastreo más granular de operaciones dentro de funciones, consulte [Rastreo de spans utilizando métodos en línea](#tracing-spans-using-inline-methods).

[1]: /es/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Para rastrear un span, use `llmobs.wrap(options, function)` como un envoltorio de función para la función que desea rastrear. Para una lista de tipos de span disponibles, consulte la [documentación de Tipos de Span][1]. Para un rastreo más granular de operaciones dentro de funciones, consulte [Rastreo de spans utilizando métodos en línea](#tracing-spans-using-inline-methods).

### Tipos de Span {#span-kinds}

Los tipos de span son requeridos y se especifican en el objeto `options` que se pasa a las funciones de rastreo `llmobs` (`trace`, `wrap` y `decorate`). Consulte la [documentación de Tipos de Span][1] para una lista de tipos de span soportados.

**Nota:** Los spans con un tipo de span inválido no se envían a la observabilidad de LLM.

### Captura automática de argumentos/salida/nombre de función {#automatic-function-argumentoutputname-capturing}

`llmobs.wrap` (junto con [`llmobs.decorate`](#function-decorators-in-typescript) para TypeScript) intenta capturar automáticamente las entradas, salidas y el nombre de la función que se está rastreando. Si necesita anotar manualmente un span, consulte [Enriqueciendo spans](#enriching-spans). Las entradas y salidas que anote sobrescribirán la captura automática. Además, para sobrescribir el nombre de la función, pase la propiedad `name` en el objeto de opciones a la función `llmobs.wrap`:

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Condiciones para finalizar un span para una función envuelta {#conditions-for-finishing-a-span-for-a-wrapped-function}

`llmobs.wrap` extiende el comportamiento subyacente de [`tracer.wrap`][2]. El intervalo subyacente creado cuando se llama a la función se finaliza bajo las siguientes condiciones:

- Si la función devuelve una Promesa, entonces el intervalo finaliza cuando la promesa se resuelve o se rechaza.
- Si la función toma un callback como su último parámetro, entonces el intervalo finaliza cuando se llama a ese callback.
- Si la función no acepta un callback y no devuelve una Promesa, entonces el intervalo finaliza al final de la ejecución de la función.

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

Si la aplicación no utiliza la función de callback, se recomienda usar un bloque trazado en línea en su lugar. Consulta [Trazando intervalos usando métodos en línea](#tracing-spans-using-inline-methods) para más información.

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

### Iniciando un intervalo {#starting-a-span}

Existen múltiples métodos para iniciar un intervalo, según el tipo de intervalo que estés iniciando. Consulte la [documentación de Tipos de Span][1] para una lista de tipos de span soportados.

Todos los intervalos se inician como una instancia de objeto de `LLMObsSpan`. Cada intervalo tiene métodos que puedes usar para interactuar con el intervalo y registrar datos.

### Finalizando un intervalo {#finishing-a-span}

Los intervalos deben finalizarse para que el rastro sea enviado y visible en la aplicación de Datadog.

Para finalizar un intervalo, llama a `finish()` en una instancia de objeto de intervalo. Si es posible, envuelve el intervalo en un bloque `try/finally` para asegurar que el intervalo se envíe incluso si ocurre una excepción.

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

### Llamadas LLM {#llm-calls}

<div class="alert alert-info">Si estás utilizando algún proveedor o marco de LLM que sea compatible con <a href="/llm_observability/instrumentation/auto_instrumentation/">las integraciones de LLM de Datadog</a>, no necesitas iniciar manualmente un intervalo de LLM para rastrear estas operaciones.</div>

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a un LLM, utiliza el decorador de función `ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: requerido - _cadena_
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece por defecto en el nombre de la función rastreada.

`model_provider`
: opcional - _cadena_ - **por defecto**: `"custom"`
<br />El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establece `model_provider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

{{% /collapse-content %}}

#### Ejemplo {#example-2}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
Para rastrear una llamada a un LLM, especifica el tipo de intervalo como `llm`, y opcionalmente especifica los siguientes argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: opcional - _cadena_ - **por defecto**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece en el nombre de la función rastreada.

`modelProvider`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Vea [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

{{% /collapse-content %}}

#### Ejemplo {#example-3}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
Para rastrear una llamada LLM, importe y llame al siguiente método con los argumentos que se enumeran a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece en el tipo de intervalo.

`modelName`
: opcional - _Cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`modelProvider`
: opcional - _Cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el costo estimado en dólares estadounidenses, establezca `modelProvider` en uno de los siguientes valores: `openai`, `azure_openai` o `anthropic`.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML suministrado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

{{% /collapse-content %}}

#### Ejemplo {#example-4}

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


### Flujos de trabajo {#workflows}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un intervalo de flujo de trabajo, use el decorador de función `ddtrace.llmobs.decorators.workflow()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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

Para rastrear un intervalo de flujo de trabajo, especifique el tipo de intervalo como `workflow`, y opcionalmente especifique argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un intervalo de flujo de trabajo, importe y llame al siguiente método con los argumentos que se enumeran a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece en el tipo de intervalo.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML suministrado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

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
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.
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
Para rastrear la ejecución de un agente, especifique el tipo de intervalo como `agent`, y opcionalmente especifique argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear la ejecución de un agente, importe y llame al siguiente método con los argumentos que se enumeran a continuación

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
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML suministrado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

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
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una llamada a una herramienta, especifique el tipo de intervalo como `tool`, y opcionalmente especifique argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una llamada a una herramienta, importe y llame al siguiente método con los argumentos que se enumeran a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el nombre de la función rastreada.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML suministrado al inicio de la aplicación. Consulte [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tareas {#tasks}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear un intervalo de tarea, utilice el decorador de función `LLMObs.task()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Consulte [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un intervalo de tarea, especifique el tipo de intervalo como `task`, y opcionalmente especifique argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Vea [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un intervalo de tarea, importe y llame al siguiente método con los argumentos que se enumeran a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: opcional - _Cadena_
<br/>El nombre de la operación. Si no se proporciona, `spanName` se establece de forma predeterminada en el nombre de la función rastreada.

`mlApp`
: opcional - _Cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Proporcionar un valor no nulo anula el nombre de la aplicación de ML proporcionado al inicio de la aplicación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

`sessionId`
: opcional - _Cadena_
<br/>El ID de la sesión de usuario subyacente. Vea [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Embeddings {#embeddings}

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una operación de embedding, use el decorador de función `LLMObs.embedding()`.

**Nota**: Anotar la entrada de un span de embedding requiere un formato diferente al de otros tipos de span. Vea [Enriqueciendo spans](#enriching-spans) para más detalles sobre cómo especificar entradas de embedding.

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
<br/>El ID de la sesión de usuario subyacente. Vea [Seguimiento de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear una operación de embedding, especifique el tipo de span como `embedding`, y opcionalmente especifique argumentos en el objeto de opciones.

**Nota**: Anotar la entrada de un span de embedding requiere un formato diferente al de otros tipos de span. Vea [Enriqueciendo spans](#enriching-spans) para más detalles sobre cómo especificar entradas de embedding.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece como el nombre de la función rastreada.

`modelProvider`
: opcional - _cadena_ - **predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Vea [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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
Para rastrear un intervalo de recuperación, use el decorador de función `ddtrace.llmobs.decorators.retrieval()`.

**Nota**: Anotar la salida de un intervalo de recuperación requiere un formato diferente al de otros tipos de intervalos. Vea [Enriqueciendo intervalos](#enriching-spans) para más detalles sobre cómo especificar salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`session_id`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Vea [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`ml_app`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

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

Para rastrear un intervalo de recuperación, especifique el tipo de intervalo como `retrieval`, y opcionalmente especifique los siguientes argumentos en el objeto de opciones.

**Nota**: Anotar la salida de un intervalo de recuperación requiere un formato diferente al de otros tipos de intervalos. Vea [Enriqueciendo intervalos](#enriching-spans) para más detalles sobre cómo especificar salidas de recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: opcional - _cadena_
<br/>El nombre de la operación. Si no se proporciona, `name` se establece de forma predeterminada en el nombre de la función rastreada.

`sessionId`
: opcional - _cadena_
<br/>El ID de la sesión de usuario subyacente. Vea [Rastreo de sesiones de usuario](#tracking-user-sessions) para más información.

`mlApp`
: opcional - _cadena_
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Vea [Rastreo de múltiples aplicaciones](#tracing-multiple-applications) para más información.

{{% /collapse-content %}}

#### Ejemplo {#example-17}

Lo siguiente también incluye un ejemplo de anotar un intervalo. Vea [Enriqueciendo intervalos](#enriching-spans) para más información.

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

## Anidando spans {#nesting-spans}

Iniciar un nuevo span antes de que el span actual termine automáticamente traza una relación padre-hijo entre los dos spans. El span padre representa la operación más grande, mientras que el span hijo representa una suboperación más pequeña anidada dentro de ella.

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


## Enriqueciendo spans {#enriching-spans}

<div class="alert alert-info">
El parámetro <code>metrics</code> aquí se refiere a valores numéricos adjuntos como atributos en spans individuales — no a <a href="/llm_observability/monitoring/metrics/">métricas de la plataforma Datadog</a>. Para ciertas claves reconocidas como <code>input_tokens</code>, <code>output_tokens</code> y <code>total_tokens</code>, Datadog utiliza estos atributos de span para generar métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.tokens</code>) para su uso en tableros y monitores.
</div>

{{< tabs >}}
{{% tab "Python" %}}
El SDK proporciona el método `LLMObs.annotate()` para enriquecer spans con entradas, salidas y metadatos.

El método `LLMObs.annotate()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-span-arguments" %}}

`span`
: opcional - _Span_ - **predeterminado**: el span activo actual
<br />El span a anotar. Si `span` no se proporciona (como cuando se utilizan decoradores de función), el SDK anota el span activo actual.

`input_data`
: opcional - _tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para spans que no son LLM) o una lista de diccionarios con este formato: `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}`, donde `"tool_calls"` son una lista opcional de diccionarios de llamadas a herramientas con claves requeridas: `"name"`, `"arguments"`, y claves opcionales: `"tool_id"`, `"type"`, y `"tool_results"` son una lista opcional de diccionarios de resultados de herramientas con clave requerida: `"result"`, y claves opcionales: `"name"`, `"tool_id"`, `"type"` para escenarios de llamadas a funciones. **Nota**: Los spans de incrustación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "..."}`.

`output_data`
: opcional - _tipo serializable en JSON o lista de diccionarios_
<br />Ya sea un tipo serializable en JSON (para spans que no son LLM) o una lista de diccionarios con este formato: `{"content": "...", "role": "...", "tool_calls": ...}`, donde `"tool_calls"` son una lista opcional de diccionarios de llamadas a herramientas con claves requeridas: `"name"`, `"arguments"`, y claves opcionales: `"tool_id"`, `"type"` para escenarios de llamadas a funciones. **Nota**: Los spans de recuperación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: opcional - _lista de diccionarios_
<br />Lista de diccionarios de definición de herramientas para escenarios de llamadas a funciones. Cada definición de herramienta debe tener una clave requerida `"name": "..."` y claves opcionales `"description": "..."` y `"schema": {...}`.

`metadata`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante a la operación de entrada o salida descrita por el intervalo (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional - _diccionario_
<br />Un diccionario de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes a la operación descrita por el intervalo (`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token`, etc.). La unidad para `time_to_first_token` está en segundos, similar a la métrica `duration` que se emite por defecto.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el intervalo. Ejemplos de claves: `session`, `env`, `system`, y `version`. Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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
El SDK proporciona el método `llmobs.annotate()` para anotar intervalos con entradas, salidas y metadatos.

El método `LLMObs.annotate()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
: opcional - _Span_ - **predeterminado**: el span activo actual
<br />El span a anotar. Si `span` no se proporciona (como cuando se utilizan envolturas de función), el SDK anota el intervalo activo actual.

`annotationOptions`
: requerido - _objeto_
<br />Un objeto de diferentes tipos de datos para anotar el intervalo.

El objeto `annotationOptions` puede contener lo siguiente:

`inputData`
: opcional - _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para intervalos que no son LLM) o una lista de diccionarios con este formato: `{role: "...", content: "..."}` (para intervalos LLM).  **Nota**: Los intervalos de incrustación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "..."}`.

`outputData`
: opcional - _tipo serializable en JSON o lista de objetos_
<br />Ya sea un tipo serializable en JSON (para intervalos que no son LLM) o una lista de objetos con este formato: `{role: "...", content: "..."}` (para intervalos LLM). **Nota**: Los intervalos de recuperación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como información de metadatos relevante a la operación de entrada o salida descrita por el intervalo (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional - _objeto_
<br />Un objeto de claves serializables en JSON y valores numéricos que los usuarios pueden agregar como métricas relevantes a la operación descrita por el intervalo (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas respecto al contexto del intervalo (`session`, `environment`, `system`, `versioning`, etc.). Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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
El SDK proporciona varios métodos para anotar intervalos con entradas, salidas, métricas y metadatos.

### Anotando entradas y salidas {#annotating-inputs-and-outputs}

Utilice el método miembro `annotateIO()` de la interfaz `LLMObsSpan` para agregar datos de entrada y salida estructurados a un `LLMObsSpan`. Esto incluye argumentos opcionales y objetos de mensaje LLM.

#### Argumentos {#arguments}

Si un argumento es nulo o está vacío, no sucede nada. Por ejemplo, si `inputData` es una cadena no vacía mientras que `outputData` es nulo, entonces solo se registra `inputData`.

`inputData`
: opcional - _Cadena_ o _Lista<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para intervalos no LLM) o una lista de `LLMObs.LLMMessage`s para intervalos LLM.

`outputData`
: opcional - _Cadena_ o _Lista<LLMObs.LLMMessage>_
<br />Ya sea una cadena (para intervalos no LLM) o una lista de `LLMObs.LLMMessage`s para intervalos LLM.

#### Mensajes LLM {#llm-messages}
Los intervalos LLM deben ser anotados con mensajes LLM utilizando el objeto `LLMObs.LLMMessage`.

El `LLMObs.LLMMessage` objeto puede ser instanciado llamando a `LLMObs.LLMMessage.from()` con los siguientes argumentos:

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
<br /> Un mapa de claves serializables en JSON y valores numéricos que los usuarios pueden agregar para registrar métricas relevantes a la operación descrita por el intervalo (por ejemplo, `input_tokens`, `output_tokens` o `total_tokens`).

#### Agregar una sola métrica {#add-a-single-metric}

El método miembro `setMetric()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una sola métrica:

##### Argumentos {#arguments-2}

`key`
: requerido - _Secuencia de caracteres_
<br /> El nombre de la métrica.

`value`
: requerido - _int_, _long_ o _double_
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

### Agregando etiquetas {#adding-tags}

Para más información sobre etiquetas, consulte [Introducción a las Etiquetas][1].

#### Agregar etiquetas en bloque {#bulk-add-tags}

El método miembro `setTags()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar múltiples etiquetas en bloque:

##### Argumentos {#arguments-3}

`tags`
: requerido - _Mapa<String, Object>_
<br /> Un mapa de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas para describir el contexto del intervalo (por ejemplo, `session`, `environment`, `system` o `version`).

#### Agregar una sola etiqueta {#add-a-single-tag}

El método miembro `setTag()` de la interfaz `LLMObsSpan` acepta los siguientes argumentos para adjuntar una sola etiqueta:

##### Argumentos {#arguments-4}

`key`
: requerido - _Cadena_
<br /> La clave de la etiqueta.

`value`
: requerido - _int_, _long_, _double_, _boolean_ o _Cadena_
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

El método miembro `addThrowable()` de la interfaz `LLMObsSpan` acepta el siguiente argumento para adjuntar un throwable con un rastreo de pila:

##### Argumentos {#arguments-5}

`throwable`
: requerido - _Throwable_
<br /> El throwable/excepción que ocurrió.

#### Agregando un mensaje de error {#adding-an-error-message}

El método `setErrorMessage()` del interfaz `LLMObsSpan` acepta el siguiente argumento para adjuntar una cadena de error:

##### Argumentos {#arguments-6}

`errorMessage`
: requerido - _Cadena_
<br /> El mensaje del error.

#### Estableciendo una bandera de error {#setting-an-error-flag}

El método `setError()` del interfaz `LLMObsSpan` acepta el siguiente argumento para indicar un error con la operación:

##### Argumentos {#arguments-7}

`error`
: requerido - _booleano_
<br /> `true` si el intervalo tuvo un error.

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

### Anotando metadatos {#annotating-metadata}

El método `setMetadata()` del interfaz `LLMObsSpan` acepta los siguientes argumentos:

`metadata`
: requerido - _Mapa<String, Object>_
<br />Un mapa de pares clave-valor serializables en JSON que contiene metadatos relevantes para la operación de entrada o salida descrita por el intervalo.

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

### Anotando intervalos auto-instrumentados {#annotating-auto-instrumented-spans}

{{< tabs >}}
{{% tab "Python" %}}

El método `LLMObs.annotation_context()` del SDK devuelve un administrador de contexto que se puede usar para modificar todos los intervalos auto-instrumentados iniciados mientras el contexto de anotación está activo.

El método `LLMObs.annotation_context()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: opcional - _str_
<br />Nombre que reemplaza el nombre del intervalo para cualquier intervalo auto-instrumentado que se inicie dentro del contexto de anotación.

`prompt`
: opcional - _diccionario_
<br />Un diccionario que representa el aviso utilizado para una llamada a LLM. Consulte la [documentación del objeto Prompt](#prompt-tracking-arguments) para el esquema completo y las claves soportadas. También puede importar el `Prompt` objeto desde `ddtrace.llmobs.utils` y pasarlo como el argumento `prompt`. **Nota**: Este argumento solo se aplica a los rangos de LLM.

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el rango. Claves de ejemplo: `session`, `env`, `system` y `version`. Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

El `llmobs.annotationContext()` del SDK acepta una función de callback que se puede usar para modificar todos los rangos auto-instrumentados iniciados mientras se está dentro del alcance de la función de callback.

El método `llmobs.annotationContext()` acepta las siguientes opciones en el primer argumento:

{{% collapse-content title="Opciones" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: opcional - _str_
<br />Nombre que reemplaza el nombre del intervalo para cualquier intervalo auto-instrumentado que se inicie dentro del contexto de anotación.

`tags`
: opcional - _objeto_
<br />Un objeto de pares clave-valor serializables en JSON que los usuarios pueden agregar como etiquetas en el rango. Claves de ejemplo: `session`, `env`, `system` y `version`. Para más información sobre etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

Adjunte metadatos estructurados del prompt al rango de LLM para que pueda reproducir resultados, auditar cambios y comparar el rendimiento del prompt entre versiones. Al usar plantillas, la Observabilidad de LLM también proporciona [seguimiento de versiones](#version-tracking) basado en cambios en el contenido de la plantilla.

{{< tabs >}}
{{% tab "Python" %}}
Utilice `LLMObs.annotation_context(prompt=...)` para adjuntar metadatos del prompt antes de la llamada a LLM. Para más detalles sobre la anotación de rangos, consulte [Enriqueciendo rangos](#enriching-spans).

#### Argumentos {#arguments-8}

{{% collapse-content title="Argumentos" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requerido - diccionario
<br />Un diccionario escrito que sigue el esquema de Prompt a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h4" expanded=false id="prompt-structure" %}}

Claves soportadas:

- `id` (str): Identificador lógico para este prompt. Debería ser único por `ml_app`. Por defecto es `{ml_app}-unnamed_prompt`
- `version` (str): Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Ver [seguimiento de versiones](#version-tracking) para más detalles.
- `variables` (Dict[str, str]): Variables utilizadas para poblar los marcadores de posición de la plantilla.
- `template` (str): Cadena de plantilla con marcadores de posición (por ejemplo, `"Traducir {{texto}} a {{lang}}"`).
- `chat_template` (List[Message]): Forma de plantilla de múltiples mensajes. Proporcionar una lista de `{ "role": "<role>", "content": "<template string with placeholders>" }` objetos.
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

Cuando utilices la plantilla de prompts de LangChain con auto-instrumentación, asigna las plantillas a variables con nombres significativos. La auto-instrumentación utiliza estos nombres para identificar los prompts.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog HEADANCHOR:translation-template-will-be-used-to-identify-the-template-in-datadog:ENDANCHOR
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Utilice `llmobs.annotationContext({ prompt: ... }, () => { ... })` para adjuntar metadatos del prompt antes de la llamada a LLM. Para más detalles sobre la anotación de rangos, consulte [Enriqueciendo rangos](#enriching-spans).

#### Argumentos {#arguments-9}

{{% collapse-content title="Opciones" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: requerido - objeto
<br />Un objeto que sigue el esquema de Prompt a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura del prompt" level="h4" expanded=false id="prompt-structure" %}}

Propiedades soportadas:

- `id` (cadena): Identificador lógico para este prompt. Debería ser único por `ml_app`. Por defecto es `{ml_app}-unnamed_prompt`
- `version` (cadena): Etiqueta de versión para el prompt (por ejemplo, "1.0.0"). Ver [seguimiento de versiones](#version-tracking) para más detalles.
- `variables` (Registro<string, cadena>): Variables utilizadas para llenar los marcadores de posición de la plantilla.
- `template` (cadena | Lista<Mensaje>): Cadena de plantilla con marcadores de posición (por ejemplo, `"Traducir {{texto}} a {{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }` objects.
- `tags` (Registro<string, cadena>): Etiquetas para adjuntar a la ejecución del prompt.
- `contextVariables` (cadena[]): Claves de variable que contienen contenido de verdad fundamental/contexto. Utilizado para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).
- `queryVariables` (cadena[]): Claves de variable que contienen la consulta del usuario. Utilizado para [detección de alucinaciones](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination).

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
- La anotación de un prompt solo está disponible en los intervalos de LLM.
- Coloca la anotación inmediatamente antes de la llamada al proveedor para que se aplique al intervalo de LLM correcto.
- Utiliza un prompt único `id` para distinguir diferentes prompts dentro de tu aplicación.
- Mantén las plantillas estáticas utilizando la sintaxis de marcadores de posición (como `{{variable_name}}`) and define dynamic content in the `sección de variables.
- Para múltiples llamadas de LLM auto-instrumentadas dentro de un bloque, utiliza un contexto de anotación para aplicar los mismos metadatos de prompt en todas las llamadas. Consulta [Anotando tramos auto-instrumentados](#annotating-auto-instrumented-spans).

### Seguimiento de versiones {#version-tracking}

LLM Observability proporciona versionado automático para tus prompts cuando no se especifica una versión explícita. Cuando proporcionas un `template` o `chat_template` en los metadatos de tu prompt sin una etiqueta `version`, el sistema genera automáticamente una versión al calcular un hash del contenido de la plantilla. Si proporcionas una etiqueta `version`, LLM Observability utiliza la etiqueta de versión que especificaste en lugar de generar una automáticamente.

El sistema de versionado funciona de la siguiente manera:
- **Versionado automático**: Cuando no se proporciona una etiqueta `version`, LLM Observability calcula un hash del contenido de `template` o `chat_template` para generar automáticamente un identificador de versión numérico.
- **Versionado manual**: Cuando se proporciona una etiqueta `version`, LLM Observability utiliza la etiqueta de versión que especificaste exactamente como la proporcionaste.
- **Historial de versiones**: Tanto las versiones auto-generadas como las manuales se mantienen en el historial de versiones para rastrear la evolución del prompt a lo largo del tiempo.

Esto te brinda la flexibilidad de confiar en la gestión automática de versiones basada en cambios en el contenido de la plantilla, o mantener el control total sobre el versionado con tus propias etiquetas de versión.

## Monitoreo de costos {#cost-monitoring}
Adjunta métricas de tokens (para seguimiento automático de costos) o métricas de costos (para seguimiento manual de costos) a tus tramos de LLM/embedding. Las métricas de tokens permiten a Datadog calcular costos utilizando precios del proveedor, mientras que las métricas de costos te permiten suministrar tu propio precio al usar modelos personalizados o no soportados. Para más detalles, consulta [Costos][14].

Si estás utilizando instrumentación automática, las métricas de tokens y costos aparecen en tus tramos automáticamente. Si estás instrumentando manualmente, sigue la guía a continuación.

<div class="alert alert-info">En este contexto, "métricas de tokens" y "métricas de costos" se refieren a pares clave-valor numéricos que adjuntas a los tramos a través del parámetro <code>metrics</code> del método <code>LLMObs.annotate()</code>. Estos son distintos de <a href="/llm_observability/monitoring/metrics/">métricas de LLM Observability de la plataforma Datadog</a>. Para las claves reconocidas como <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code> y <code>output_cost</code>, Datadog utiliza estos atributos de span para generar métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.cost</code>) para su uso en tableros y monitores.</div>

{{< tabs >}}
{{% tab "Python" %}}

#### Caso de uso: Usando un proveedor de modelo común {#use-case-using-a-common-model-provider}
Datadog admite proveedores de modelo comunes como OpenAI, Azure OpenAI, Anthropic y Google Gemini. Al usar estos proveedores, solo necesita anotar su solicitud de LLM con `model_name`, `model_provider` y el uso de tokens. Datadog calcula automáticamente el costo estimado basado en la tarifa del proveedor.

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
Para modelos personalizados o no soportados, debe anotar el span manualmente con los datos de costo.

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

El SDK de Observabilidad de LLM proporciona métodos para exportar y enviar sus evaluaciones a Datadog.

<div class="alert alert-info"> Para construir evaluadores reutilizables basados en clases (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) con metadatos de resultados ricos, consulte la <a href="/llm_observability/guide/evaluation_developer_guide/">Guía del Desarrollador de Evaluaciones</a>.</div>

Las evaluaciones deben unirse a un solo span. Puede identificar el span objetivo utilizando cualquiera de estos dos métodos:
- _Unión basada en etiquetas_ - Una evaluación se une utilizando un par de clave-valor de etiqueta único que se establece en un solo span. La evaluación fallará al unirse si el par de clave-valor de la etiqueta coincide con múltiples spans o con ningún span.
- _Referencia directa de span_ - Una evaluación se une utilizando la combinación del ID de traza único del span y el ID del span.

### Exportando un span {#exporting-a-span}
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` se puede usar para extraer el contexto del span de un span. Este método es útil para asociar su evaluación con el span correspondiente.

#### Argumentos {#arguments-10}
El método `LLMObs.export_span()` acepta el siguiente argumento:

`span`
: opcional - _Span_
<br />El span para extraer el contexto del span (span e IDs de traza) desde. Si no se proporciona (como al usar decoradores de función), el SDK exporta el span activo actual.

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
`llmobs.exportSpan()` se puede usar para extraer el contexto del span de un span. Necesitarás usar este método para asociar tu evaluación con el span correspondiente.

#### Argumentos {#arguments-11}

El método `llmobs.exportSpan()` acepta el siguiente argumento:

`span`
: opcional - _Span_
<br />El span para extraer el contexto del span (span e IDs de traza) desde. Si no se proporciona (como al usar envolturas de función), el SDK exporta el span activo actual.

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
`LLMObs.submit_evaluation()` se puede usar para enviar tu evaluación personalizada asociada con un span dado.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> está en desuso y será eliminado en la próxima versión principal de ddtrace (4.0). Para migrar, renombra tus llamadas a <code>LLMObs.submit_evaluation_for</code> con <code>LLMObs.submit_evaluation</code>.</div>

**Nota**: Las evaluaciones personalizadas son evaluadores que implementas y alojas tú mismo. Estos difieren de las evaluaciones listas para usar, que son calculadas automáticamente por Datadog usando evaluadores integrados. Para configurar evaluaciones listas para usar para tu aplicación, utiliza la página [**LLM Observability** > **Configuraciones** > **Evaluaciones**][1] en Datadog.

El método `LLMObs.submit_evaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: requerido - _cadena_
<br />El nombre de la evaluación.

`metric_type`
: requerido - _cadena_
<br />El tipo de la evaluación. Debe ser `categorical`, `score`, `boolean` o `json`.

`value`
: requerido - _cadena, tipo numérico, o dict_
<br />El valor de la evaluación. Debe ser una cadena (`metric_type==categorical`), entero/flotante (`metric_type==score`), booleano (`metric_type==boolean`), o dict (`metric_type==json`).

`span`
: opcional - _diccionario_
<br />Un diccionario que identifica de manera única el rango asociado con esta evaluación. Debe contener `span_id` (cadena) y `trace_id` (cadena). Utilice [`LLMObs.export_span()`](#exporting-a-span) para generar este diccionario.

`span_with_tag_value`
: opcional - _diccionario_
<br />Un diccionario que identifica de manera única el rango asociado con esta evaluación. Debe contener `tag_key` (cadena) y `tag_value` (cadena).

   **Nota**: Exactamente uno de `span` o `span_with_tag_value` es requerido. Proporcionar ambos, o ninguno, genera un ValueError.

`ml_app`
: requerido - _cadena_
<br />El nombre de la aplicación de ML.

`timestamp_ms`
: opcional - _entero_
<br />La marca de tiempo unix en milisegundos cuando se generó el resultado de la métrica de evaluación. Si no se proporciona, esto se establece por defecto en la hora actual.

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

`llmobs.submitEvaluation()` se puede usar para enviar su evaluación personalizada asociada con un intervalo dado.

El método `llmobs.submitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: requerido - _diccionario_
<br />El contexto del intervalo para asociar la evaluación. Esto debería ser la salida de `LLMObs.export_span()`.

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
: requerido - _tipo de cadena o numérico_
<br />El valor de la evaluación. Debe ser una cadena (para categórico `metric_type`), número (para puntaje `metric_type`), booleano (para booleano `metric_type`), o un objeto JSON (para json `metric_type`).

`tags`
: opcional - _diccionario_
<br />Un diccionario de pares clave-valor de cadenas que los usuarios pueden agregar como etiquetas relacionadas con la evaluación. Para más información sobre las etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).

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

Utilice `LLMObs.SubmitEvaluation()` para enviar su evaluación personalizada asociada con un intervalo dado.

El método `LLMObs.SubmitEvaluation()` acepta los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: requerido - _LLMObsSpan_
<br />El contexto del intervalo para asociar la evaluación.

`label`
: requerido - _Cadena_
<br />El nombre de la evaluación.

`categoricalValue` o `scoreValue`
: requerido - _Cadena_ o _doble_
<br />El valor de la evaluación. Debe ser una cadena (para evaluaciones categóricas) o un doble (para evaluaciones de puntaje).

`tags`
: opcional - _Mapa<String, Object>_
<br />Un diccionario de pares clave-valor de cadenas utilizados para etiquetar la evaluación. Para más información sobre las etiquetas, consulte [Introducción a las Etiquetas](/getting_started/tagging/).
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

## Procesamiento de span {#span-processing}

Para modificar los datos de entrada y salida en los spans, puedes configurar una función procesadora. La función procesadora tiene acceso a las etiquetas de span para habilitar la modificación condicional de entrada/salida. Las funciones procesadoras pueden devolver el span modificado para emitirlo, o devolver `None`/`null` para evitar que el span sea emitido por completo. Esto es útil para filtrar spans que contienen datos sensibles o que cumplen ciertos criterios.

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


# If using LLMObs.enable() HEADANCHOR:if-using-llmobsenable:ENDANCHOR
LLMObs.enable(
  ...
  span_processor=redact_processor,
)
# else when using `ddtrace-run` HEADANCHOR:else-when-using-ddtrace-run:ENDANCHOR
LLMObs.register_processor(redact_processor)

with LLMObs.llm("invoke_llm_with_no_output"):
    LLMObs.annotate(tags={"no_output": "true"})
{{< /code-block >}}


### Ejemplo: modificación condicional con auto-instrumentación {#example-conditional-modification-with-auto-instrumentation}

Al usar auto-instrumentación, el span no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en spans auto-instrumentados, se puede usar `annotation_context()` además de un procesador de spans.

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

### Ejemplo: evitando que los spans sean emitidos {#example-preventing-spans-from-being-emitted}

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

# This span will be filtered out and not sent to Datadog HEADANCHOR:this-span-will-be-filtered-out-and-not-sent-to-datadog:ENDANCHOR
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

Al usar auto-instrumentación, el span no siempre es accesible contextualmente. Para modificar condicionalmente las entradas y salidas en spans auto-instrumentados, se puede usar `llmobs.annotationContext()` además de un procesador de spans.

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

### Ejemplo: evitando que los spans sean emitidos {#example-preventing-spans-from-being-emitted-1}

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

### Etiquetas de seguimiento de sesiones {#session-tracking-tags}

| Etiqueta | Descripción |
|---|---|
| `session_id` | El ID que representa una única sesión de usuario, por ejemplo, una sesión de chat. |
| `user_handle` | El identificador del usuario de la sesión de chat. |
| `user_name` | El nombre del usuario de la sesión de chat. |
| `user_id` | El ID del usuario de la sesión de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Al iniciar un span raíz para un nuevo rastro o span en un nuevo proceso, especifique el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Al iniciar un span raíz para un nuevo rastro o span en un nuevo proceso, especifique el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

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

El SDK admite el trazado a través de servicios o hosts distribuidos. El trazado distribuido funciona propagando la información del span a través de solicitudes web.

{{< tabs >}}
{{% tab "Python" %}}

La biblioteca `ddtrace` proporciona algunas integraciones listas para usar que admiten el trazado distribuido para populares [marcos web][1] y bibliotecas de [HTTP][2]. Si su aplicación realiza solicitudes utilizando estas bibliotecas compatibles, puede habilitar el trazado distribuido ejecutando:
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si su aplicación no utiliza ninguna de estas bibliotecas compatibles, puede habilitar el trazado distribuido propagando manualmente la información del span hacia y desde los encabezados HTTP. El SDK proporciona los métodos auxiliares `LLMObs.inject_distributed_headers()` y `LLMObs.activate_distributed_headers()` para inyectar y activar contextos de trazado en los encabezados de solicitud.

### Inyectando encabezados distribuidos {#injecting-distributed-headers}

El método `LLMObs.inject_distributed_headers()` toma un span e inyecta su contexto en los encabezados HTTP que se incluirán en la solicitud. Este método acepta los siguientes argumentos:

`request_headers`
: requerido - _diccionario_
<br />Los encabezados HTTP para extender con atributos de contexto de trazado.

`span`
: opcional - _Span_ - **predeterminado**: `The current active span.`
<br />El span para inyectar su contexto en los encabezados de solicitud proporcionados. Cualquier span (incluidos aquellos con decoradores de función), esto se predetermina al span activo actual.

### Activando encabezados distribuidos {#activating-distributed-headers}

El método `LLMObs.activate_distributed_headers()` toma encabezados HTTP y extrae atributos de contexto de trazado para activar en el nuevo servicio.

**Nota**: Debe llamar a `LLMObs.activate_distributed_headers()` antes de iniciar cualquier span en su servicio aguas abajo. Los spans iniciados previamente (incluidos los spans de decoradores de función) no se capturan en el trazo distribuido.

Este método acepta el siguiente argumento:

`request_headers`
: requerido - _diccionario_
<br />Los encabezados HTTP para extraer atributos del contexto de trazado.


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

La `dd-trace` biblioteca proporciona integraciones listas para usar que soportan trazado distribuido para [marcos web][1] populares. Requerir el trazador habilita automáticamente estas integraciones, pero puedes desactivarlas opcionalmente con:

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
### Trazado de intervalos utilizando métodos en línea {#tracing-spans-using-inline-methods}

Para cada tipo de intervalo, la clase `ddtrace.llmobs.LLMObs` proporciona un método en línea correspondiente para trazar automáticamente la operación que implica un bloque de código dado. Estos métodos tienen la misma firma de argumento que sus contrapartes de decorador de función, con la adición de que `name` por defecto es el tipo de intervalo (`llm`, `workflow`, etc.) si no se proporciona. Estos métodos pueden ser utilizados como administradores de contexto para finalizar automáticamente el intervalo después de que se complete el bloque de código encerrado.

#### Ejemplo {#example-32}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Persistiendo un intervalo a través de contextos {#persisting-a-span-across-contexts}

Para iniciar y detener manualmente un intervalo a través de diferentes contextos o ámbitos:

1. Iniciar un intervalo manualmente utilizando los mismos métodos (por ejemplo, el método `LLMObs.workflow` para un intervalo de flujo de trabajo), pero como una llamada de función simple en lugar de como un administrador de contexto.
2. Pasa el objeto de intervalo como un argumento a otras funciones.
3. Detén el intervalo manualmente con el método `span.finish()`. **Nota**: el intervalo debe ser finalizado manualmente, de lo contrario no se envía.

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

`LLMObs.flush()` es una función de bloqueo que envía todos los datos de observabilidad de LLM en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación se cierre hasta que se envíen todos los rastros de observabilidad de LLM.

### Rastreando múltiples aplicaciones {#tracing-multiple-applications}

El SDK admite el rastreo de múltiples aplicaciones de LLM desde el mismo servicio.

Puedes configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de tu aplicación de LLM, en la que se agrupan por defecto todos los spans generados.

Para anular esta configuración y usar un nombre de aplicación de LLM diferente para un span raíz dado, pasa el argumento `ml_app` con el nombre de cadena de la aplicación de LLM subyacente al iniciar un span raíz para un nuevo rastro o un span en un nuevo proceso.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Trazado de intervalos utilizando métodos en línea {#tracing-spans-using-inline-methods-1}

El SDK `llmobs` proporciona un método en línea correspondiente para rastrear automáticamente la operación que implica un bloque de código dado. Estos métodos tienen la misma firma de argumento que sus contrapartes de envoltura de función, con la adición de que `name` es requerido, ya que el nombre no puede inferirse de un callback anónimo. Este método finalizará el span bajo las siguientes condiciones:

- Si la función devuelve una Promesa, entonces el span finaliza cuando la promesa se resuelve o se rechaza.
- Si la función toma un callback como su último parámetro, entonces el span finaliza cuando se llama a ese callback.
- Si la función no acepta un callback y no devuelve una Promesa, entonces el span finaliza al final de la ejecución de la función.

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

### Decoradores de función en TypeScript {#function-decorators-in-typescript}

El SDK de observabilidad de LLM de Node.js ofrece una función `llmobs.decorate` que sirve como un decorador de función para aplicaciones de TypeScript. El comportamiento de rastreo de esta función es el mismo que `llmobs.wrap`.

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

`llmobs.flush()` es una función de bloqueo que envía todos los datos de observabilidad de LLM en búfer al backend de Datadog. Esto puede ser útil en entornos sin servidor para evitar que una aplicación se cierre hasta que se envíen todos los rastros de observabilidad de LLM.

### Rastreando múltiples aplicaciones {#tracing-multiple-applications-1}

El SDK admite el rastreo de múltiples aplicaciones de LLM desde el mismo servicio.

Puedes configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de tu aplicación de LLM, en la que se agrupan por defecto todos los spans generados.

Para anular esta configuración y usar un nombre de aplicación de LLM diferente para un span raíz dado, pasa el argumento `mlApp` con el nombre de cadena de la aplicación de LLM subyacente al iniciar un span raíz para un nuevo rastro o un span en un nuevo proceso.

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

El nombre de su aplicación (el valor de `DD_LLMOBS_ML_APP`) debe seguir estas pautas:

- Debe ser una cadena Unicode en minúsculas
- Puede tener hasta 193 caracteres de longitud
- No puede contener guiones bajos contiguos o al final
- Puede contener los siguientes caracteres:
   - Alfanuméricos
   - Guiones bajos
   - Guiones
   - Dos puntos
   - Puntos
   - Barras

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