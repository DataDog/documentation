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
  text: Realiza un seguimiento, compara y optimiza tus indicaciones para modelos de
    lenguaje grande (LLM) con Datadog LLM Observability
title: Referencia del SDK de observabilidad de LLM
---
## Resumen general

Los SDK de observabilidad para modelos de lenguaje grande (LLM) de Datadog ofrecen instrumentación automática, así como API de instrumentación manual, para proporcionar observabilidad e información sobre tus aplicaciones de LLM. Requisitos de configuración

## 

- : 

### Una [clave de API de Datadog][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- El `ddtrace`paquete más reciente está instalado (se requiere Python 3.7 o superior):
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- Se ha instalado la última versión`dd-trace` del paquete (se requiere Node.js 16 o superior):
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- Has descargado el último [`dd-trace-java`JAR][1]. El SDK de observabilidad de LLM es compatible con`dd-trace-java`la versión 1.51.0 o posterior (se requiere Java 8 o posterior).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Configuración desde la línea de comandos" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
Habilita la observabilidad de LLM ejecutando tu aplicación con el`ddtrace-run`comando y especificando las variables de entorno necesarias. 

**Nota**: activa`ddtrace-run` automáticamente todas las integraciones de observabilidad de LLM.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

#### Variables de entorno para la configuración de la línea de comandos

`DD_SITE`
: cadena obligatoria. Sitio_
<br /> de _Datadog de destino para el envío de datos de LLM. Tu sitio web es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: Obligatorio: _entero o cadena_
<br />. Activa esta opción para permitir el envío de datos a LLM Observability. Debe configurarse en`1`  o `true`.

`DD_LLMOBS_ML_APP`
: cadena_
<br /> _opcional. El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todos los rastros y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte las directrices [de nomenclatura ](#application-naming-guidelines)de aplicaciones para conocer los caracteres permitidos y otras restricciones. Para anular este valor en un tramo raíz concreto, consulta la sección[ «Seguimiento de varias aplicaciones](#tracing-multiple-applications)». Si no se especifica, el valor predeterminado es [`DD_SERVICE`][1] o el valor propagado`DD_LLMOBS_ML_APP`desde un servicio anterior. 
<br />**Nota**: Antes de la versión `ddtrace==3.14.0`, este campo es **obligatorio**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional  _entero o cadena_  **por defecto**: `false`
<br />solo es obligatorio si no utilizas el agente de Datadog; en ese caso, debe establecerse en`1`  o `true`.

`DD_API_KEY`
: cadena_
<br /> _opcional. Tu clave API de Datadog. Solo es necesario si no utilizas el agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}

{{% tab "Node.js" %}}
Habilita la observabilidad de LLM ejecutando tu aplicación con`NODE_OPTIONS="--import dd-trace/initialize.mjs"`  y especificando las variables de entorno necesarias. 

**Nota**:  activa`dd-trace/initialize.mjs` automáticamente todas las integraciones de APM.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

#### Variables de entorno para la configuración de la línea de comandos

`DD_SITE`
: cadena_
<br /> _obligatoria. El sitio de Datadog al que enviar tus datos de LLM. Tu sitio web es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: Obligatorio: _entero o cadena_
<br />. Activa esta opción para permitir el envío de datos a LLM Observability. Debe configurarse en`1`  o `true`.

`DD_LLMOBS_ML_APP`
: cadena_
<br /> _opcional. El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todos los rastros y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte las directrices [de nomenclatura ](#application-naming-guidelines)de aplicaciones para conocer los caracteres permitidos y otras restricciones. Para anular este valor en un tramo raíz concreto, consulta la sección[ «Seguimiento de varias aplicaciones](#tracing-multiple-applications)». Si no se especifica, el valor predeterminado es [`DD_SERVICE`][1] o el valor propagado`DD_LLMOBS_ML_APP`desde un servicio anterior. 
<br />**Nota**: Antes de la versión `dd-trace@5.66.0`, este campo es **obligatorio**.

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional  _entero o cadena_  **por defecto**: `false`
<br />solo es obligatorio si no utilizas el agente de Datadog; en ese caso, debe establecerse en`1`  o `true`.

`DD_API_KEY`
: cadena_
<br /> _opcional. Tu clave API de Datadog. Solo es necesario si no utilizas el agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

Habilite la observabilidad de LLM ejecutando su aplicación con`dd-trace-java`  y especificando los parámetros necesarios como variables de entorno o propiedades del sistema.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### Variables de entorno y propiedades del sistema

Puede especificar los siguientes parámetros como variables de entorno (por ejemplo, `DD_LLMOBS_ENABLED`) o como propiedades del sistema Java (por ejemplo, `dd.llmobs_enabled`).

`DD_SITE` o `dd.site`
: cadena obligatoria. Sitio_
<br /> de _Datadog de destino para el envío de datos de LLM. Tu sitio web es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED` o `dd.llmobs.enabled`
: Obligatorio: _entero o cadena_
<br />. Activa esta opción para permitir el envío de datos a LLM Observability. Debe configurarse en`1`  o `true`.

`DD_LLMOBS_ML_APP` o `dd.llmobs.ml.app`
: cadena_
<br /> _opcional. El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todos los rastros y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte las directrices [de nomenclatura ](#application-naming-guidelines)de aplicaciones para conocer los caracteres permitidos y otras restricciones. Para anular este valor en un tramo raíz concreto, consulta la sección[ «Seguimiento de varias aplicaciones](#tracing-multiple-applications)». Si no se especifica, el valor por defecto es [`DD_SERVICE`][1], o el valor propagado`DD_LLMOBS_ML_APP`desde un servicio anterior. 
<br />**Nota**: Antes de la versión 1.54.0 de `dd-trace-java`, este campo es **obligatorio**.

`DD_LLMOBS_AGENTLESS_ENABLED` o `dd.llmobs.agentless.enabled`
: opcional  _entero o cadena_  **por defecto**: `false`
<br />solo es obligatorio si no utilizas el agente de Datadog; en ese caso, debe establecerse en`1`  o `true`.

`DD_API_KEY` o `dd.api.key`
: cadena_
<br /> _opcional. Tu clave API de Datadog. Solo es necesario si no utilizas el agente de Datadog.

[1]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración de Incode" level="h3" expanded=false id="in-code-setup" %}}

En lugar de utilizar la [configuración desde la ](#command-line-setup)línea de comandos, también puedes habilitar LLM Observability mediante programación.

{{< tabs >}}
{{% tab "Python" %}}

Utiliza la`LLMObs.enable()`función para habilitar la observabilidad de LLM.

<div class="alert alert-info">
No utilices este método de configuración con el comando<code> </code>ddtracerun.
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
: cadena_
<br /> _opcional. El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todos los rastros y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte las directrices [de nomenclatura ](#application-naming-guidelines)de aplicaciones para conocer los caracteres permitidos y otras restricciones. Para anular este valor en un seguimiento concreto, consulta la sección[ «Seguimiento de varias aplicaciones](#tracing-multiple-applications)». Si no se especifica, el valor predeterminado es`DD_LLMOBS_ML_APP` .

`integrations_enabled`  **por defecto**: `true`
: _
<br />booleano_ opcional. Un indicador para habilitar el seguimiento automático de las llamadas a modelos de lenguaje grande (LLM) para las [integraciones de LLM][1] compatibles con Datadog. Si no se especifica lo contrario, todas las integraciones de LLM compatibles están habilitadas de forma predeterminada. Para evitar el uso de las integraciones de LLM, establece este valor en `false`.

`agentless_enabled`
: opcional  _booleano_  **valor predeterminado**: `false`
<br />Solo es necesario si no utilizas el agente de Datadog; en ese caso, debe establecerse en `True`. Esto configura la`ddtrace`biblioteca para que no envíe ningún dato que requiera el agente de Datadog. Si no se especifica, el valor predeterminado es`DD_LLMOBS_AGENTLESS_ENABLED` .

`site`
: cadena_
<br /> _opcional. El sitio de Datadog al que enviar tus datos de LLM. Tu sitio web es {{< region-param key="dd_site" code="true" >}}. Si no se especifica, el valor predeterminado es `DD_SITE`.

`api_key`
: cadena_
<br /> _opcional. Tu clave API de Datadog. Solo es necesario si no utilizas el agente de Datadog. Si no se especifica, el valor predeterminado es`DD_API_KEY` .

`env`
: cadena_
<br /> _opcional. El nombre del entorno de tu aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se especifica, el valor predeterminado es`DD_ENV` .

`service`
: cadena_
<br /> _opcional. El nombre del servicio que utiliza tu aplicación. Si no se especifica, el valor predeterminado es`DD_SERVICE` .

[1]: /es/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
No utilices este método de configuración con el comando<code> </code>ddtrace/initialize.mjs.
</div>

Utiliza la`init()`función para habilitar la observabilidad de LLM.

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

**Opciones de`llmobs`configuración**

`mlApp`
: cadena_
<br /> _opcional. El nombre de tu aplicación, servicio o proyecto LLM, bajo el cual se agrupan todos los rastros y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulte las directrices [de nomenclatura ](#application-naming-guidelines)de aplicaciones para conocer los caracteres permitidos y otras restricciones. Para anular este valor en un seguimiento concreto, consulta la sección[ «Seguimiento de varias aplicaciones](#tracing-multiple-applications)». Si no se especifica, el valor predeterminado es`DD_LLMOBS_ML_APP` .

`agentlessEnabled`
: opcional  _booleano_  **valor predeterminado**: `false`
<br />Solo es necesario si no utilizas el agente de Datadog; en ese caso, debe establecerse en `true`. Esto configura la`dd-trace`biblioteca para que no envíe ningún dato que requiera el agente de Datadog. Si no se especifica, el valor predeterminado es`DD_LLMOBS_AGENTLESS_ENABLED` .

**Opciones para la configuración general **del rastreador:

`site`
: cadena_
<br /> _opcional. El sitio de Datadog al que enviar tus datos de LLM. Tu sitio web es {{< region-param key="dd_site" code="true" >}}. Si no se especifica, el valor predeterminado es `DD_SITE`.

`env`
: cadena_
<br /> _opcional. El nombre del entorno de tu aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se especifica, el valor predeterminado es`DD_ENV` .

`service`
: cadena_
<br /> _opcional. El nombre del servicio que utiliza tu aplicación. Si no se especifica, el valor predeterminado es el de las variables`DD_SERVICE` de entorno

##### .

Establezca los siguientes valores como variables de entorno. No se pueden configurar mediante programación.

`DD_API_KEY`
: cadena_
<br /> _opcional. Tu clave API de Datadog. Solo es necesario si no utilizas el agente de Datadog.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configuración de AWS Lambda" level="h3" expanded=false id="aws-lambda-setup" %}}

Para implementar la observabilidad de LLM en una función de AWS Lambda ya existente, puedes utilizar la extensión de Datadog y las capas de lenguaje correspondientes. 

1. Abre un CloudShell en la consola de AWS. 
2. Instala el cliente de la CLI de Datadog
```shell
npm install -g @datadog/datadog-ci
```
3. Configura la clave de la API de Datadog y el sitio
```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
Si ya dispone de un secreto en Secrets Manager o prefiere utilizarlo, puede configurar la clave de API utilizando el ARN del secreto:
```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. Instala tu función Lambda con LLM Observability (para ello se requiere, como mínimo, la versión 77 de la capa de extensiones de Datadog)
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

4. Ejecuta tu función Lambda y comprueba que los rastros de LLM Observability se ven en la interfaz de usuario de Datadog.

Borra manualmente los rastros de observabilidad de LLM utilizando el`flush`método antes de que la función Lambda devuelva un resultado.

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


Una vez instalado el SDK y ejecutada la aplicación, deberías ver algunos datos en LLM Observability gracias a la instrumentación automática. La instrumentación manual se puede utilizar para capturar marcos personalizados u operaciones de bibliotecas que aún no son compatibles.

## Instrumentación manual

{{< tabs >}}
{{% tab "Python" %}}

Para registrar una operación de un modelo de lenguaje grande (LLM), se puede utilizar un decorador de funciones para instrumentar fácilmente los flujos de trabajo:

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

o un enfoque basado en un gestor de contexto para capturar operaciones de gran precisión:

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


Para ver una lista de los tipos de intervalos disponibles, consulta la [documentación sobre tipos de intervalos][1]. Para obtener un seguimiento más detallado de las operaciones dentro de las funciones, consulta [«Seguimiento de intervalos mediante métodos en línea](#tracing-spans-using-inline-methods)».

[1]: /es/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

Para rastrear un intervalo, utiliza`llmobs.wrap(options, function)`  como envoltura de la función que deseas rastrear. Para ver una lista de los tipos de intervalos disponibles, consulta la [documentación sobre tipos de intervalos][1]. Para obtener un seguimiento más detallado de las operaciones dentro de las funciones, consulta [«Seguimiento de intervalos mediante métodos en línea](#tracing-spans-using-inline-methods)». 

### Tipos de intervalos

Se requieren tipos de intervalo, que se especifican en el`options`objeto que se pasa a las funciones`llmobs` de rastreo (`trace`, `wrap`, y `decorate`). Consulte la [documentación sobre tipos de span][1] para ver una lista de los tipos de span compatibles. 

**Nota:** Los spans con un tipo de span no válido no se envían a LLM Observability. La captura

###  automática de argumentos, salidas

`llmobs.wrap` y nombres de funciones (junto con[`llmobs.decorate`](#function-decorators-in-typescript)  para TypeScript) intenta capturar automáticamente las entradas, las salidas y el nombre de la función que se está rastreando. Si necesitas anotar manualmente un fragmento, consulta la sección[ «Enriquecimiento de fragmentos](#enriching-spans)». Las entradas y salidas que anotes anularán la captura automática. Además, para anular el nombre de la función, pasa la`name`propiedad del objeto de opciones a la`llmobs.wrap`función:

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Las condiciones para completar un intervalo en una función envuelta

`llmobs.wrap` amplían el comportamiento subyacente de [`tracer.wrap`][2]. El intervalo subyacente creado al invocar la función finaliza en las siguientes condiciones: 

- si la función devuelve una Promise, el intervalo finaliza cuando la Promise se resuelve o se rechaza; 
- si la función toma una función de devolución de llamada como último parámetro, el intervalo finaliza cuando se invoca dicha función de devolución de llamada; 
- si la función no acepta una función de devolución de llamada y no devuelve una Promise, el intervalo finaliza al término de la ejecución de la función.

El siguiente ejemplo ilustra la segunda condición, en la que el último argumento es una función de devolución de llamada:

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

Si la aplicación no utiliza la función de devolución de llamada, se recomienda utilizar en su lugar un bloque de seguimiento en línea. Para obtener más información, consulta [](#tracing-spans-using-inline-methods)«Seguimiento de intervalos mediante métodos en línea».

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

### Inicio de un tramo

Existen varios métodos para iniciar un span, dependiendo del tipo de span que se vaya a iniciar. Consulte la [documentación sobre tipos de span][1] para ver una lista de los tipos de span compatibles.

Todos los tramos se inician como una instancia del objeto`LLMObsSpan` . Cada tramo cuenta con métodos que puedes utilizar para interactuar con él y registrar datos.

### Finalización de un tramo

Los tramos deben estar completados para que el rastreo se envíe y sea visible en la aplicación de Datadog.

Para cerrar un span, llama a`finish()`  en una instancia del objeto span. Si es posible, envuelve el elemento `span` en un`try/finally`elemento `block` para garantizar que el `span` se envíe aunque se produzca una excepción. 

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

[1]: /es/llm_observability/terms/#span-kinds
{{% /tab %}}
{{< /tabs >}}

### Llamadas de LLM

<div class="alert alert-info">Si utilizas algún proveedor o marco de LLM compatible con las integraciones<a href="/llm_observability/instrumentation/auto_instrumentation/"> de LLM de</a> Datadog, no es necesario que inicies manualmente un span de LLM para rastrear estas operaciones.</div>

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a LLM, utiliza el decorador de funciones`ddtrace.llmobs.decorators.llm()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: cadena_
<br/> _obligatoria. El nombre del modelo de lenguaje grande (LLM) invocado.

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`model_provider`
: cadena _opcional_**  valor predeterminado**: `"custom"`
<br />El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el coste estimado en dólares estadounidenses, establezca`model_provider`  en uno de los siguientes valores: `openai`, `azure_openai`, o `anthropic`.

`session_id`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`ml_app`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear una llamada a LLM, especifica el tipo de intervalo como `llm`, y, si lo deseas, especifica los siguientes argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: cadena _opcional_**  valor predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`modelProvider`
: cadena _opcional_**  valor predeterminado**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el coste estimado en dólares estadounidenses, establezca`modelProvider`  en uno de los siguientes valores: `openai`, `azure_openai`, o `anthropic`.

`sessionId`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`mlApp`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear una llamada a LLM, importa y ejecuta el siguiente método con los argumentos que se indican a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>: el nombre de la operación. Si no se especifica,`spanName`se utiliza por defecto el tipo «span».

`modelName`
: opcional  _Cadena_  **por defecto**: `"custom"`
<br/>El nombre del LLM invocado.

`modelProvider`
: opcional  _Cadena_  **por defecto**: `"custom"`
<br/>El nombre del proveedor del modelo.
<br />**Nota**: Para mostrar el coste estimado en dólares estadounidenses, establezca`modelProvider`  en uno de los siguientes valores: `openai`, `azure_openai`, o `anthropic`.

`mlApp`
: opcional  _Cadena_
<br/>: el nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Si se introduce un valor distinto de nulo, se anula el nombre de la aplicación de ML indicado al iniciar la aplicación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

`sessionId`
: opcional  _Cadena_
<br/>: el ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

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
Para rastrear un intervalo de flujo de trabajo, utiliza el decorador de funciones`ddtrace.llmobs.decorators.workflow()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`session_id`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`ml_app`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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

Para rastrear un intervalo de flujo de trabajo, especifica el tipo de intervalo como `workflow`, y, si lo deseas, especifica argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`sessionId`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`mlApp`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear un intervalo de flujo de trabajo, importe y llame al siguiente método con los argumentos que se indican a continuación:

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>: el nombre de la operación. Si no se especifica,`spanName`se utiliza por defecto el tipo «span».

`mlApp`
: opcional  _Cadena_
<br/>: el nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Si se introduce un valor distinto de nulo, se anula el nombre de la aplicación de ML indicado al iniciar la aplicación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

`sessionId`
: opcional  _Cadena_
<br/>: el ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

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
Para rastrear la ejecución de un agente, utiliza el decorador de funciones`ddtrace.llmobs.decorators.agent()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`session_id`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`ml_app`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.
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
Para rastrear la ejecución de un agente, especifica el tipo de span como `agent`, y, si lo deseas, especifica los argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`sessionId`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`mlApp`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear la ejecución de un agente, importe y llame al siguiente método con los argumentos que se indican a continuación
```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>: el nombre de la operación. Si no se especifica,`spanName`se utiliza por defecto el nombre de la función rastreada.

`mlApp`
: opcional  _Cadena_
<br/>: el nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Si se introduce un valor distinto de nulo, se anula el nombre de la aplicación de ML indicado al iniciar la aplicación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

`sessionId`
: opcional  _Cadena_
<br/>: el ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Llamadas de herramientas

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una llamada a una herramienta, utiliza el decorador de funciones`ddtrace.llmobs.decorators.tool()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`session_id`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`ml_app`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear una llamada a una herramienta, especifica el tipo de intervalo como `tool`, y, si lo deseas, especifica los argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`sessionId`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`mlApp`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear una llamada a una herramienta, importe y llame al siguiente método con los argumentos que se indican a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>: el nombre de la operación. Si no se especifica,`spanName`se utiliza por defecto el nombre de la función rastreada.

`mlApp`
: opcional  _Cadena_
<br/>: el nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Si se introduce un valor distinto de nulo, se anula el nombre de la aplicación de ML indicado al iniciar la aplicación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

`sessionId`
: opcional  _Cadena_
<br/>: el ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Tareas

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear la duración de una tarea, utiliza el decorador de funciones`LLMObs.task()`.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`session_id`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`ml_app`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear un intervalo de tareas, especifica el tipo de intervalo como `task`, y, si lo deseas, indica los argumentos en el objeto de opciones.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`sessionId`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`mlApp`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear un ámbito de tarea, importa y llama al siguiente método con los argumentos que se indican a continuación:

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="Argumentos" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: opcional  _Cadena_
<br/>: el nombre de la operación. Si no se especifica,`spanName`se utiliza por defecto el nombre de la función rastreada.

`mlApp`
: opcional  _Cadena_
<br/>: el nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Si se introduce un valor distinto de nulo, se anula el nombre de la aplicación de ML indicado al iniciar la aplicación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

`sessionId`
: opcional  _Cadena_
<br/>: el ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Incrustaciones

{{< tabs >}}
{{% tab "Python" %}}
Para rastrear una operación de incrustación, utiliza el decorador de funciones`LLMObs.embedding()`. 

**Nota**: La anotación de la entrada de un intervalo de incrustación requiere un formato diferente al de otros tipos de intervalos. Consulte [«Enriching spans» ](#enriching-spans)para obtener más detalles sobre cómo especificar entradas de incrustación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: cadena_
<br/> _obligatoria. El nombre del modelo de lenguaje grande (LLM) invocado.

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se establece como el nombre de la función rastreada.

`model_provider`
: cadena _opcional_**  valor predeterminado**: `"custom"`

`session_id`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`ml_app`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para rastrear una operación de incrustación, especifica el tipo de fragmento como `embedding`, y, si lo deseas, especifica los argumentos en el objeto de opciones. 

**Nota**: La anotación de la entrada de un fragmento de incrustación requiere un formato diferente al de otros tipos de fragmentos. Consulte [«Enriching spans» ](#enriching-spans)para obtener más detalles sobre cómo especificar entradas de incrustación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: cadena _opcional_**  valor predeterminado**: `"custom"`
<br/>El nombre del LLM invocado.

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se establece como el nombre de la función rastreada.

`modelProvider`
: cadena _opcional_**; valor predeterminado**: `"custom"`
<br/>el nombre del proveedor del modelo.

`sessionId`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`mlApp`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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
Para identificar un fragmento de recuperación, utiliza el decorador de funciones`ddtrace.llmobs.decorators.retrieval()`. 

**Nota**: La anotación de la salida de un fragmento de recuperación requiere un formato diferente al de otros tipos de fragmentos. Consulte [«Enriquecimiento de ](#enriching-spans)fragmentos» para obtener más detalles sobre cómo especificar los resultados de la recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`session_id`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`ml_app`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

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

Para rastrear un fragmento de recuperación, especifica el tipo de fragmento como `retrieval`, y, si lo deseas, especifica los siguientes argumentos en el objeto de opciones. 

**Nota**: La anotación de la salida de un fragmento de recuperación requiere un formato diferente al de otros tipos de fragmentos. Consulte [«Enriquecimiento de ](#enriching-spans)fragmentos» para obtener más detalles sobre cómo especificar los resultados de la recuperación.

{{% collapse-content title="Argumentos" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: cadena_
<br/> _opcional. El nombre de la operación. Si no se especifica,`name`se utiliza por defecto el nombre de la función rastreada.

`sessionId`
: cadena_
<br/> _opcional. El ID de la sesión de usuario subyacente. Consulte [«Seguimiento de sesiones de ](#tracking-user-sessions)usuario» para obtener más información.

`mlApp`
: cadena_
<br/> _opcional. El nombre de la aplicación de aprendizaje automático a la que pertenece la operación. Consulte [«Seguimiento de varias ](#tracing-multiple-applications)solicitudes» para obtener más información.

{{% /collapse-content %}}

#### Ejemplo

A continuación se incluye también un ejemplo de cómo anotar un fragmento. Para más información, consulta [](#enriching-spans)«Enriquecimiento de intervalos».

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

## Intervalos de anidación

Al iniciar un nuevo tramo antes de que el tramo actual haya finalizado, se establece automáticamente una relación de jerarquía entre ambos tramos. El span principal representa la operación más amplia, mientras que el span secundario representa una suboperación anidada más pequeña dentro de ella.

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


## Enriquecimiento de vanos

<div class="alert alert-info">
El <code>parámetro</code> «metrics» se refiere aquí a los valores numéricos asociados como atributos a cada tramo concreto, y no a las métricas de<a href="/llm_observability/monitoring/metrics/"> la plataforma</a> Datadog. En el caso de determinadas claves reconocidas, como <code>input_tokens</code>, <code>output_tokens </code>y <code>total_tokens</code>, Datadog utiliza estos atributos de span para generar las métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.tokens</code>) para su uso en paneles y monitores.
</div>

{{< tabs >}}
{{% tab "Python" %}}
El SDK ofrece un método`LLMObs.annotate()`para enriquecer los fragmentos con entradas, salidas y metadatos.

El`LLMObs.annotate()`método admite los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-span-arguments" %}}

`span`
: opcional  _Span_  **por defecto**: el span activo actual
<br />. El span que se va a anotar. Si no`span` se proporciona (como ocurre al utilizar decoradores de funciones), el SDK anota el span activo actual.

`input_data`
: tipo serializable en JSON o lista de _diccionarios _
<br />(opcional). Puede ser un tipo serializable en JSON (para fragmentos que no sean de modelos de lenguaje grande) o una lista de diccionarios con este formato: `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}`, donde`"tool_calls"`  es una lista opcional de diccionarios de llamadas a herramientas con las claves obligatorias: `"name"`, `"arguments"`, y las claves opcionales: `"tool_id"`, `"type"`, y`"tool_results"`  es una lista opcional de diccionarios de resultados de herramientas con la clave obligatoria: `"result"`, y las claves opcionales: `"name"`, `"tool_id"`,`"type"`  para escenarios de llamada a funciones. **Nota**: Los intervalos de incrustación son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "..."}`.

`output_data`
: tipo serializable en _JSON (opcional) o lista de _
<br />diccionarios. Puede ser un tipo serializable en JSON (para fragmentos que no sean de LLM) o una lista de diccionarios con este formato: `{"content": "...", "role": "...", "tool_calls": ...}`, donde`"tool_calls"`  es una lista opcional de diccionarios de llamadas a herramientas con las claves obligatorias: `"name"`,`"arguments"` , y las claves opcionales: `"tool_id"`,`"type"`  para casos de llamada a funciones. **Nota**: Los intervalos de búsqueda son un caso especial y requieren una cadena o un diccionario (o una lista de diccionarios) con este formato: `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: lista _opcional de _
<br />diccionarios. Lista de diccionarios de definición de herramientas para situaciones de llamada a funciones. Cada definición de herramienta debe incluir una clave `"name": "..."`obligatoria y las claves opcionales`"description": "..."``"schema": {...}`  y .

`metadata`
: opcional  __
<br />dictionaryUn diccionario de pares clave-valor serializables en JSON que los usuarios pueden añadir como metadatos relevantes para la operación de entrada o salida descrita por el span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional  _diccionario_
<br />: un diccionario de claves serializables en JSON y valores numéricos que los usuarios pueden añadir como métricas relevantes para la operación descrita por el span (`input_tokens`, `output_tokens`,`total_tokens` `time_to_first_token`, , etc.). La unidad de`time_to_first_token`  es el segundo, al igual que la`duration`  métrica, que se muestra por defecto.

`tags`
: opcional  __
<br />dictionaryUn diccionario de pares clave-valor serializables en JSON que los usuarios pueden añadir como etiquetas al elemento span. Ejemplos de teclas: `session`, `env`, `system`, y `version`. Para obtener más información sobre las etiquetas, consulta la sección[ «Introducción a las etiquetas](/getting_started/tagging/)».

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
El SDK ofrece un método`llmobs.annotate()`para anotar fragmentos con entradas, salidas y metadatos.

El`LLMObs.annotate()`método admite los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
: opcional  _Span_  **por defecto**: el span activo actual
<br />. El span que se va a anotar. Si no`span` se proporciona (como ocurre al utilizar envoltorios de funciones), el SDK anota el span activo actual.

`annotationOptions`
: obligatorio  _objectUn_
<br /> objeto de distintos tipos de datos con el que anotar el fragmento.

El`annotationOptions`objeto puede contener lo siguiente:

`inputData`
: opcional  Tipo _serializable en JSON o lista de objetos_
<br />. Puede ser un tipo serializable en JSON (para fragmentos que no sean de LLM) o una lista de diccionarios con este formato:`{role: "...", content: "..."}`  (para fragmentos de LLM).  **Nota**: Los elementos «span» incrustados constituyen un caso especial y requieren una cadena de caracteres o un objeto (o una lista de objetos) con este formato: `{text: "..."}`.

`outputData`
: opcional  Tipo _serializable en JSON o lista de objetos_
<br />. Puede ser un tipo serializable en JSON (para fragmentos que no sean de LLM) o una lista de objetos con este formato:`{role: "...", content: "..."}`  (para fragmentos de LLM). **Nota**: Los intervalos de recuperación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: objeto opcional_
<br />. Un_ objeto compuesto por pares clave-valor serializables en JSON que los usuarios pueden añadir como metadatos relevantes para la operación de entrada o salida descrita por el span (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: objeto _opcional_
<br />. Un objeto compuesto por claves serializables en JSON y valores numéricos que los usuarios pueden añadir como métricas relevantes para la operación descrita por el span (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: opcional  __
<br />objetoUn objeto compuesto por pares clave-valor serializables en JSON que los usuarios pueden añadir como etiquetas relacionadas con el contexto del elemento span (`session`, `environment`,`system` `versioning`, , etc.). Para obtener más información sobre las etiquetas, consulta la sección[ «Introducción a las etiquetas](/getting_started/tagging/)».

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
El SDK ofrece varios métodos para anotar fragmentos con entradas, salidas, métricas y metadatos. Anotación

###  de entradas y salidas

Utiliza el método`annotateIO()` de miembro de la`LLMObsSpan`interfaz para añadir datos estructurados de entrada y salida a un `LLMObsSpan`. Esto incluye argumentos opcionales y objetos de mensaje LLM. 

#### Argumentos

Si un argumento es nulo o está vacío, no ocurre nada. Por ejemplo, si`inputData`  es una cadena no vacía y`outputData`  es nulo, solo`inputData`se registra .

`inputData`
: opcional  _cadena_ o _lista<LLMObs.LLMMessage>_
<br />Puede ser una cadena (para fragmentos que no sean de LLM) o una lista de `LLMObs.LLMMessage`cadenas para fragmentos de LLM.

`outputData`
: opcional  _cadena_ o _lista<LLMObs.LLMMessage>_
<br />Puede ser una cadena (para fragmentos que no sean de LLM) o una lista de `LLMObs.LLMMessage`cadenas para fragmentos de LLM. Mensajes

####  de LLM
Los intervalos de LLM deben anotarse con mensajes de LLM utilizando el`LLMObs.LLMMessage`objeto.

El`LLMObs.LLMMessage`objeto se puede instanciar llamando a la función`LLMObs.LLMMessage.from()`con los siguientes argumentos:

`role`
: obligatorio  _Cadena_
<br />: una cadena que describe la función del autor del mensaje.

`content`
: obligatorio  _StringUna_
<br /> cadena que contiene el contenido del mensaje.

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
```

### Añadir métricas

#### : añadir métricas de forma masiva El método`setMetrics()` `member` de la`LLMObsSpan`interfaz `` acepta los siguientes argumentos para añadir varias métricas de forma masiva: 

##### Argumentos

`metrics`: obligatorio _`Map&lt;string, number>`
_
<br /> Una tabla de claves JSONserializable y valores numéricos que los usuarios pueden añadir para registrar métricas relevantes para la operación descrita por el span (por ejemplo, `input_tokens`, `output_tokens`, o `total_tokens`).

#### Añadir una única métrica El método`setMetric()` de miembro de`LLMObsSpan`la interfaz acepta los siguientes argumentos para añadir una única métrica:

##### Argumentos

`key` : obligatorio  _CharSequence_
<br /> El nombre de la métrica.

`value` : obligatorio  _int_, _long _o _double_
<br /> El valor de la métrica.

#### Ejemplos ```java
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

### Añadir etiquetas Para obtener más información sobre las etiquetas, consulta [Introducción a las etiquetas][1].Añadir etiquetas

####  de forma masiva El método `setTags()``member` de la`LLMObsSpan`interfaz `Interface` admite los siguientes argumentos para añadir varias etiquetas a la vez:

##### Argumentos

`tags`: obligatorio _`Map&lt;string, object>`
_
<br /> Un mapa de pares clave-valor serializables en JSON que los usuarios pueden añadir como etiquetas para describir el contexto del span (por ejemplo, `session`, `environment`, `system`, o `version`).

#### Añadir una sola etiqueta El método`setTag()` miembro de la`LLMObsSpan`interfaz acepta los siguientes argumentos para añadir una sola etiqueta:

##### Argumentos

`key` : obligatorio  _String_
<br /> La clave de la etiqueta.

`value` : obligatorio  _int_, _long_, _double_, _boolean _o _String_
<br /> El valor de la etiqueta.

#### Ejemplos ```java
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

### Anotar errores

#### : añadir un objeto `Throwable` (recomendado)

El método`addThrowable()` de miembro de la`LLMObsSpan`interfaz acepta el siguiente argumento para adjuntar un objeto `Throwable` con un seguimiento de la pila: 

##### Argumentos

`throwable`
: obligatorio  _Throwable: _
<br />la excepción que se ha producido. 

#### Añadir un mensaje de error

El método`setErrorMessage()` de miembro de la`LLMObsSpan`interfaz acepta el siguiente argumento para adjuntar una cadena de error: 

##### Argumentos

`errorMessage`
: obligatorio  _Cadena_
<br /> El mensaje del error. Establecimiento

####  de un indicador de error

El método`setError()` de miembro de la`LLMObsSpan`interfaz acepta el siguiente argumento para indicar un error en la operación: 

##### Argumentos

`error`
: booleano_ obligatorio_
<br />`true` si se ha producido un error en el span. 

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
```

### Anotación de metadatos: El método`setMetadata()` de miembro de la`LLMObsSpan`interfaz acepta los siguientes argumentos:

`metadata` : obligatorio  _Map&lt;string, object>
_
<br />Un mapa de pares clave-valor serializables en JSON que contiene metadatos relevantes para la operación de entrada o salida descrita por el span.

#### Ejemplo ```java
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

### Anotación de intervalos autoinstrumentados

{{< tabs >}}
{{% tab "Python" %}}

El método`LLMObs.annotation_context()` del SDK devuelve un gestor de contexto que se puede utilizar para modificar todos los intervalos autoinstrumentados iniciados mientras el contexto de anotación está activo.

El`LLMObs.annotation_context()`método admite los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: strName__
<br /> opcional que anula el nombre del intervalo para cualquier intervalo autoinstrumentado que se inicie dentro del contexto de la anotación.

`prompt`
: opcional  _dictionary_
<br />: un diccionario que representa la solicitud utilizada para una llamada al modelo de lenguaje grande (LLM). Consulte la [documentación del](#prompt-tracking-arguments) objeto Prompt para ver el esquema completo y las claves compatibles. También puedes importar el`Prompt`objeto desde`ddtrace.llmobs.utils`  y pasarlo como argumento`prompt`. **Nota**: Este argumento solo se aplica a los fragmentos de LLM.

`tags`
: opcional  __
<br />dictionaryUn diccionario de pares clave-valor serializables en JSON que los usuarios pueden añadir como etiquetas al elemento span. Ejemplos de teclas: `session`, `env`, `system`, y `version`. Para obtener más información sobre las etiquetas, consulta la sección[ «Introducción a las etiquetas](/getting_started/tagging/)».

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

El SDK`llmobs.annotationContext()`admite una función de devolución de llamada que se puede utilizar para modificar todos los intervalos instrumentados automáticamente que se hayan iniciado dentro del ámbito de dicha función.

El`llmobs.annotationContext()`método admite las siguientes opciones en el primer argumento:

{{% collapse-content title="Opciones" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: strName__
<br /> opcional que anula el nombre del intervalo para cualquier intervalo autoinstrumentado que se inicie dentro del contexto de la anotación.

`tags`
: opcional  _objeto_
<br />: un objeto compuesto por pares clave-valor serializables en JSON que los usuarios pueden añadir como etiquetas al elemento `span`. Ejemplos de teclas: `session`, `env`, `system`, y `version`. Para obtener más información sobre las etiquetas, consulta la sección[ «Introducción a las etiquetas](/getting_started/tagging/)».

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

## Seguimiento inmediato

Adjunta metadatos estructurados de las instrucciones al fragmento del modelo de lenguaje grande (LLM) para poder reproducir los resultados, auditar los cambios y comparar el rendimiento de las instrucciones entre las distintas versiones. Al utilizar plantillas, LLM Observability también ofrece un seguimiento[ de versiones](#version-tracking) basado en los cambios realizados en el contenido de las plantillas.

{{< tabs >}}
{{% tab "Python" %}}
Utiliza`LLMObs.annotation_context(prompt=...)`  para añadir metadatos de la solicitud antes de la llamada al modelo de lenguaje grande (LLM). Para obtener más información sobre las anotaciones de span, consulta [«Enriquecimiento de spans](#enriching-spans)». 

#### Argumentos

{{% collapse-content title="Argumentos" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: obligatorio  dictionary
<br />: un diccionario tipado que siga el esquema Prompt que se indica a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura de la consigna" level="h4" expanded=false id="prompt-structure" %}}

Teclas admitidas:

- `id` (str): Identificador lógico de este indicador. Debe ser único por `ml_app`. Por defecto:`{ml_app}-unnamed_prompt`
- `version`(str): etiqueta de versión para el indicador (por ejemplo, «1.0.0»). Consulte el historial[ de ](#version-tracking)versiones para obtener más detalles.
- `variables` (Dict[str, str]): Variables utilizadas para rellenar los marcadores de posición de la plantilla.
- `template` (str): Cadena de plantilla con marcadores de posición (por ejemplo, `"Traducir {{text}} a {{lang}}"`).
- `chat_template` (List[Message]): Formulario de plantilla para mensajes múltiples. Proporcione una lista de`{ "role": "<role>", "content": "<template string with placeholders>" }`objetos.
- `tags` (Dict[str, str]): Etiquetas que se adjuntarán a la ejecución de la indicación.
- `rag_context_variables` (List[str]): Claves de variables que contienen el contenido de referencia o contexto. Se utiliza para detectar[ alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).
- `rag_query_variables` (List[str]): Claves variables que contienen la consulta del usuario. Se utiliza para detectar[ alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).

{{% /collapse-content %}}

#### Ejemplo: mensaje de singletemplate

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

#### Ejemplo: Plantillas de prompts de LangChain

Cuando utilices las plantillas de prompts de LangChain con autoinstrumentación, asigna las plantillas a variables con nombres significativos. La autoinstrumentación utiliza estos nombres para identificar las indicaciones.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

Utiliza`llmobs.annotationContext({ prompt: ... }, () => { ... })`  para añadir metadatos de la solicitud antes de la llamada al modelo de lenguaje grande (LLM). Para obtener más información sobre las anotaciones de span, consulta [«Enriquecimiento de spans](#enriching-spans)». 

#### Argumentos

{{% collapse-content title="Opciones" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: obligatorio  
<br />objetoUn objeto que siga el esquema de Prompt que se indica a continuación.

{{% /collapse-content %}}

{{% collapse-content title="Estructura de la consigna" level="h4" expanded=false id="prompt-structure" %}}

Propiedades admitidas:

- `id` (cadena): Identificador lógico de este mensaje. Debe ser único por `ml_app`. Por defecto:`{ml_app}-unnamed_prompt`
- `version`(cadena): etiqueta de versión para el mensaje de aviso (por ejemplo, «1.0.0»). Consulte el historial[ de ](#version-tracking)versiones para obtener más detalles.
- `variables` (Record&lt;cadena, cadena>
): Variables utilizadas para rellenar los marcadores de posición de la plantilla.
- `template` (cadena | Lista[Mensaje]): Cadena de plantilla con marcadores de posición (por ejemplo, `"Traducir {{text}} a Objetos `{{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }`.
- `tags` (Record&lt;string, string>
): Etiquetas que se deben adjuntar a la ejecución de la indicación.
- `contextVariables` (string[]): Claves de variables que contienen el contenido de referencia o contexto. Se utiliza para detectar[ alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).
- `queryVariables` (string[]): Claves variables que contienen la consulta del usuario. Se utiliza para detectar[ alucinaciones](/llm_observability/evaluations/managed_evaluations/?tab=openai#hallucination).

{{% /collapse-content %}}

#### Ejemplo: mensaje de singletemplate

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
- : La posibilidad de anotar una solicitud solo está disponible en los segmentos del modelo de lenguaje grande (LLM). 
- Coloca la anotación inmediatamente antes de la llamada al proveedor para que se aplique al segmento correcto del LLM. 
- Utiliza una solicitud única para `id`distinguir entre las diferentes solicitudes dentro de tu aplicación. 
- Mantén las plantillas estáticas utilizando la sintaxis de marcadores de posición (como `Sección «Variables» de {{`) and define dynamic content in the `variable_name}}. Si
-  hay varias llamadas a LLM autoinstrumentadas dentro de un bloque, utiliza un contexto de anotación para aplicar los mismos metadatos de la solicitud a todas las llamadas. Consulte [«Anotación de intervalos ](#annotating-auto-instrumented-spans)autoinstrumentados». Seguimiento

###  de versiones

LLM Observability ofrece un control automático de versiones para tus indicaciones cuando no se especifica una versión explícita. Cuando incluyes un`template`  o`chat_template`  en los metadatos de tu indicación sin una`version`etiqueta , el sistema genera automáticamente una versión calculando un hash del contenido de la plantilla. Si incluyes una`version`etiqueta, LLM Observability utilizará la etiqueta de versión que hayas especificado en lugar de generar una automáticamente.

El sistema de control de versiones funciona de la siguiente manera:
- **Control de versiones automático**: cuando no se proporciona ninguna`version`etiqueta `version`, LLM Observability calcula un hash del contenido`template`del `prompt` o`chat_template`del `model` para generar automáticamente un identificador de versión numérico.**
- **Control de versiones manual: cuando se proporciona una`version`etiqueta `version`, LLM Observability utiliza la etiqueta de versión especificada tal y como se ha proporcionado**
- **.Historial de versiones: tanto las versiones generadas automáticamente como las manuales se conservan en el historial de versiones para realizar un seguimiento de la evolución del `prompt` a lo largo del tiempo.

Esto te ofrece la flexibilidad de recurrir a la gestión automática de versiones basada en los cambios del contenido de las plantillas, o bien mantener un control total sobre el control de versiones mediante tus propias etiquetas de versión.

## Control de costes
Adjunta métricas de tokens (para el seguimiento automático de costes) o métricas de costes (para el seguimiento manual de costes) a tus intervalos de LLM/incrustación. Las métricas de tokens permiten a Datadog calcular los costes utilizando los precios del proveedor, mientras que las métricas de costes te permiten introducir tus propios precios cuando utilizas modelos personalizados o no compatibles. Para más información, consulta [Costes][14].

Si utilizas la instrumentación automática, las métricas de tokens y de costes aparecerán automáticamente en tus spans. Si estás realizando la instrumentación manualmente, sigue las instrucciones que se indican a continuación.

<div class="alert alert-info">En este contexto, los términos «métricas de token» y «métricas de coste» se refieren a pares numéricos de clave-valor que se asocian a los tramos mediante el <code>parámetro</code> metrics del método <code>LLMObs.annotate()</code>. Estas métricas son distintas de las métricas de observabilidad de los <a href="/llm_observability/monitoring/metrics/">modelos de lenguaje</a> grande (LLM) de la plataforma Datadog. En el caso de claves reconocidas como <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost </code>y <code>output_cost</code>, Datadog utiliza estos atributos de span para generar las métricas de plataforma correspondientes (como <code>ml_obs.span.llm.input.cost</code>) para su uso en paneles y monitores.</div>

{{< tabs >}}
{{% tab "Python" %}}

#### Caso de uso: Uso de un proveedor de modelos común
Datadog es compatible con proveedores de modelos habituales como OpenAI, Azure OpenAI, Anthropic y Google Gemini. Al utilizar estos proveedores, solo tienes que incluir en tu solicitud al modelo de lenguaje grande (LLM)`model_provider` la`model_name` información sobre el uso de tokens. Datadog calcula automáticamente el coste estimado basándose en las tarifas del proveedor.

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

#### Caso de uso: Uso de un modelo personalizado
En el caso de modelos personalizados o no compatibles, debes anotar manualmente los datos de costes en el tramo.

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

El SDK de observabilidad de LLM ofrece métodos para exportar y enviar tus evaluaciones a Datadog.

<div class="alert alert-info">Para crear evaluadores reutilizables basados en clases (<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>) con metadatos de resultados detallados, consulta la Guía para </a>desarrolladores<a href="/llm_observability/guide/evaluation_developer_guide/"> de evaluación.</div>

Las evaluaciones deben estar unidas en un solo tramo. Puedes identificar el span de destino mediante cualquiera de estos dos métodos: Unión basada
- _ en etiquetas_: une una evaluación utilizando un par clave-valor único que se asigne a un único span. La evaluación no se unirá si el par clave-valor de la etiqueta coincide con varios tramos o con ningún tramo. Referencia
- _ directa a _un tramo: une una evaluación utilizando la combinación única del ID de rastreo y el ID del tramo. 

### Exportación de un tramo
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()` se puede utilizar para extraer el contexto de un elemento «span». Este método resulta útil para asociar tu evaluación al intervalo correspondiente. 

#### Argumentos
El`LLMObs.export_span()`método admite el siguiente argumento:

`span`
: opcional  _Span_
<br />: el span del que se va a extraer el contexto del span (ID de span y de rastreo). Si no se especifica (como ocurre al utilizar decoradores de funciones), el SDK exporta el span activo actual. 

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
`llmobs.exportSpan()` se puede utilizar para extraer el contexto de un elemento «span». Deberás utilizar este método para asociar tu evaluación al span correspondiente. 

#### Argumentos

El`llmobs.exportSpan()`método admite el siguiente argumento:

`span`
: opcional  _Span_
<br />: el span del que se va a extraer el contexto del span (ID de span y de rastreo). Si no se especifica (como ocurre al utilizar envoltorios de funciones), el SDK exporta el span activo actual. 

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

### Envío de evaluaciones

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()` se puede utilizar para enviar tu evaluación personalizada relacionada con un tramo determinado.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> está en desuso y se eliminará en la próxima versión principal de ddtrace (4.0). Para realizar la migración, cambia el nombre de tus <code>llamadas a `LLMObs.</code>submit_evaluation_for` por `<code>LLMObs.submit_evaluation`</code>.</div>

**Nota**: Las evaluaciones personalizadas son evaluadores que tú mismo implementas y alojas. Estas difieren de las evaluaciones predeterminadas, que Datadog calcula automáticamente mediante evaluadores integrados. Para configurar evaluaciones predeterminadas para tu aplicación, utiliza la página [**LLM Observability** > **Configuración** > **Evaluaciones**][1] en Datadog.

El`LLMObs.submit_evaluation()`método admite los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: cadena_
<br /> _obligatoria. El nombre de la evaluación.

`metric_type`
: cadena _
<br />obligatoria. _El tipo de la evaluación. Debe ser `categorical`, `score`,`boolean`  o `json`.

`value`
: cadena, tipo numérico _o diccionario_
<br /> obligatorio. El valor de la evaluación. Debe ser una cadena (`metric_type==categorical`), un entero o un número real (`metric_type==score`), un valor booleano (`metric_type==boolean`) o un diccionario (`metric_type==json`).

`span`
: opcional  _dictionary_
<br />: un diccionario que identifica de forma única el span asociado a esta evaluación. Debe contener`span_id`  (cadena) y`trace_id`  (cadena). Utiliza[`LLMObs.export_span()`](#exporting-a-span)  para generar este diccionario.

`span_with_tag_value`
: opcional  _dictionary_
<br />: un diccionario que identifica de forma única el span asociado a esta evaluación. Debe contener`tag_key`  (cadena) y`tag_value`  (cadena). 

   **Nota**: Se requiere `span_with_tag_value`exactamente uno de los dos`span`:  o . Si se proporcionan ambos, o ninguno, se produce un error «ValueError».

`ml_app`
: cadena_
<br /> _obligatoria. El nombre de la aplicación de aprendizaje automático.

`timestamp_ms`
: entero_
<br /> _opcional. La marca de tiempo Unix, expresada en milisegundos, en la que se generó el resultado de la métrica de evaluación. Si no se especifica, se utilizará por defecto la hora actual.

`tags`
: opcional  _diccionario_
<br />: un diccionario de pares clave-valor de tipo cadena que los usuarios pueden añadir como etiquetas relacionadas con la evaluación. Para obtener más información sobre las etiquetas, consulta la sección[ «Introducción a las etiquetas](/getting_started/tagging/)».

`assessment`
: cadena_
<br /> _opcional. Una valoración de esta evaluación. Los valores válidos son`pass`  y `fail`.

`reasoning`
: cadena_
<br /> _opcional. Una explicación textual del resultado de la evaluación.

`metadata`
: opcional  _diccionario_
<br />: un diccionario que contiene metadatos estructurados de forma arbitraria asociados al resultado de la evaluación.
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

`llmobs.submitEvaluation()` se puede utilizar para enviar tu evaluación personalizada relacionada con un tramo determinado.

El`llmobs.submitEvaluation()`método admite los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: obligatorio  __
<br />dictionaryEl contexto de span al que se asociará la evaluación. Este debería ser el resultado de `LLMObs.export_span()`.

`evaluationOptions`
: obligatorio  __
<br />objetoUn objeto de los datos de evaluación.

El`evaluationOptions`objeto puede contener lo siguiente:

`label`
: cadena_
<br /> _obligatoria. El nombre de la evaluación.

`metricType`
: cadena _
<br />obligatoria. _El tipo de la evaluación. Debe ser «categorical», «score», «boolean» o «json».

`value`
: tipo _
<br />de cadena o _numérico obligatorio. El valor de la evaluación. Debe ser una cadena (para «categorical»`metric_type`), un número (para «score»`metric_type`), un valor booleano (para «boolean»`metric_type`) o un objeto JSON (para «json»`metric_type`).

`tags`
: opcional  _diccionario_
<br />: un diccionario de pares clave-valor de tipo cadena que los usuarios pueden añadir como etiquetas relacionadas con la evaluación. Para obtener más información sobre las etiquetas, consulta la sección[ «Introducción a las etiquetas](/getting_started/tagging/)».

`assessment`
: cadena_
<br /> _opcional. Una valoración de esta evaluación. Los valores válidos son`pass`  y `fail`.

`reasoning`
: cadena_
<br /> _opcional. Una explicación textual del resultado de la evaluación.

`metadata`
: opcional  _dictionary_
<br />: un objeto JSON que contiene metadatos estructurados de forma arbitraria asociados al resultado de la evaluación.
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

Utiliza`LLMObs.SubmitEvaluation()`  para enviar tu evaluación personalizada relacionada con un tramo determinado.

El`LLMObs.SubmitEvaluation()`método admite los siguientes argumentos:

{{% collapse-content title="Argumentos" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan` : obligatorio  __
<br />LLMObsSpan: el contexto de span al que se asociará la evaluación.

`label` : obligatorio  _String: _
<br />el nombre de la evaluación.

`categoricalValue` o`scoreValue`  : obligatorio  _Cadena_ o _dobleEl_
<br /> valor de la evaluación. Debe ser una cadena (para evaluaciones categóricas) o un número de tipo double (para evaluaciones con puntuación).

`tags` : opcional  _Map&lt;string, object>
_
<br />Un diccionario de pares clave-valor de cadenas que se utiliza para etiquetar la evaluación. Para obtener más información sobre las etiquetas, consulta la sección[ «Introducción a las etiquetas](/getting_started/tagging/)».
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

## Procesamiento de tramos

Para modificar los datos de entrada y salida en los tramos, puedes configurar una función de procesador. La función del procesador tiene acceso a las etiquetas de intervalo para permitir la modificación condicional de la entrada y la salida. Las funciones del procesador pueden devolver el span modificado para emitirlo, o bien devolver `None`/`null` para evitar que el span se emita por completo. Esto resulta útil para filtrar los fragmentos que contienen datos confidenciales o que cumplen determinados criterios.

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

Cuando se utiliza la instrumentación automática, el intervalo no siempre es accesible en el contexto. Para modificar de forma condicional las entradas y salidas en tramos con instrumentación automática,`annotation_context()`se puede utilizar además de un procesador de tramos.

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

### Ejemplo: evitar que se emitan los elementos «span»

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

Cuando se utiliza la instrumentación automática, el intervalo no siempre es accesible en el contexto. Para modificar de forma condicional las entradas y salidas en tramos con instrumentación automática,`llmobs.annotationContext()`se puede utilizar además de un procesador de tramos.

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

### Ejemplo: evitar que se emitan los elementos «span»

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


## Seguimiento de las sesiones de los usuarios

El seguimiento de sesiones te permite asociar varias interacciones a un usuario concreto.

{{< tabs >}}
{{% tab "Python" %}}
Al iniciar un tramo raíz para un nuevo seguimiento o tramo en un nuevo proceso, especifique el`session_id`argumento con el identificador de cadena de la sesión de usuario subyacente, que se envía como etiqueta en el tramo. Si lo deseas, también puedes especificar las etiquetas`user_handle` , `user_name``user_id`, y .

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

### Etiquetas de seguimiento

|  |  |
|---|---|
| `session_id` |  de sesiónEtiquetaDescripciónEl identificador que representa una sesión de usuario individual, por ejemplo, una sesión de chat. |
| `user_handle` | El identificador del usuario de la sesión de chat. |
| `user_name` | El nombre del usuario de la sesión de chat. |
| `user_id` | El identificador del usuario de la sesión de chat. |
{{% /tab %}}

{{% tab "Node.js" %}}
Al iniciar un tramo raíz para un nuevo seguimiento o tramo en un nuevo proceso, especifique el`sessionId`argumento con el identificador de cadena de la sesión de usuario subyacente:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
Al iniciar un tramo raíz para un nuevo seguimiento o tramo en un nuevo proceso, especifique el`sessionId`argumento con el identificador de cadena de la sesión de usuario subyacente:

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

## Seguimiento distribuido

El SDK permite realizar un seguimiento a través de servicios o hosts distribuidos. El rastreo distribuido funciona propagando la información de los intervalos a través de las solicitudes web.

{{< tabs >}}
{{% tab "Python" %}}

La`ddtrace`biblioteca ofrece algunas integraciones listas para usar que admiten el rastreo distribuido para los [marcos web][1] y las bibliotecas [HTTP][2] más populares. Si tu aplicación realiza solicitudes utilizando estas bibliotecas compatibles, puedes habilitar el seguimiento distribuido ejecutando:
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

Si tu aplicación no utiliza ninguna de estas bibliotecas compatibles, puedes habilitar el rastreo distribuido propagando manualmente la información de los spans hacia y desde los encabezados HTTP. El SDK proporciona los métodos `LLMObs.inject_distributed_headers()`auxiliares  y`LLMObs.activate_distributed_headers()`  para insertar y activar contextos de seguimiento en los encabezados de las solicitudes.

### Inserción de encabezados distribuidos

El`LLMObs.inject_distributed_headers()`método toma un span e inserta su contexto en los encabezados HTTP para que se incluyan en la solicitud. Este método admite los siguientes argumentos:

`request_headers`
: diccionario__
<br /> obligatorio. Los encabezados HTTP que se van a ampliar con atributos de contexto de rastreo.

`span`
: opcional  _Span_  **por defecto**: `The current active span.`
<br />El span cuyo contexto se insertará en los encabezados de la solicitud proporcionados. En cualquier span (incluidos aquellos con decoradores de funciones), el valor predeterminado es el span activo actual. Activación

###  de encabezados distribuidos

El`LLMObs.activate_distributed_headers()`método toma los encabezados HTTP y extrae los atributos del contexto de rastreo para activarlos en el nuevo servicio. 

**Nota**: Debes llamar a este método`LLMObs.activate_distributed_headers()` antes de iniciar cualquier tramo en tu servicio posterior. Los intervalos iniciados anteriormente (incluidos los intervalos de decoradores de funciones) no se recogen en el seguimiento distribuido.

Este método admite el siguiente argumento:

`request_headers`
: diccionario__
<br /> obligatorio. Los encabezados HTTP para extraer los atributos del contexto de rastreo. 


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
[2]: /es/tracing/trace_collection/compatibility/python/#library-compatibility
{{% /tab %}}
{{% tab "Node.js" %}}

La`dd-trace`biblioteca ofrece integraciones listas para usar que admiten el rastreo distribuido para los [marcos web] más populares. Al especificar el trazador, estas integraciones se activan automáticamente, pero puedes desactivarlas si lo deseas mediante:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /es/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


## Trazado avanzado

{{< tabs >}}
{{% tab "Python" %}}
### Seguimiento de tramos mediante métodos en línea

Para cada tipo de intervalo, la`ddtrace.llmobs.LLMObs`clase ofrece un método en línea correspondiente que permite rastrear automáticamente la operación que implica un bloque de código determinado. Estos métodos tienen la misma firma de argumentos que sus homólogos decoradores de funciones, con la diferencia de que, si no se especifica`name`, se utiliza por defecto el tipo de span (`llm`, `workflow`, etc.). Estos métodos pueden utilizarse como gestores de contexto para cerrar automáticamente el elemento `span` una vez finalizado el bloque de código que contiene. 

#### Ejemplo

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

### Mantener un span entre contextos

Para iniciar y detener manualmente un span en diferentes contextos o ámbitos: 

1. Inicie un span manualmente utilizando los mismos métodos (por ejemplo, el`LLMObs.workflow`método para un span de flujo de trabajo), pero como una simple llamada a una función en lugar de como un gestor de contexto. 
2. Pase el objeto span como argumento a otras funciones. 
3. Detenga el span manualmente con el`span.finish()`método. **Nota**: el span debe completarse manualmente; de lo contrario, no se enviará. 

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

#### El vaciado forzado en entornos sin servidor

`LLMObs.flush()` es una función de bloqueo que envía todos los datos de observabilidad de LLM almacenados en el búfer al backend de Datadog. Esto puede resultar útil en entornos sin servidor para evitar que una aplicación se cierre hasta que se hayan enviado todos los rastros de observabilidad de LLM. Seguimiento

###  de varias aplicaciones

El SDK permite realizar el seguimiento de varias aplicaciones LLM desde un mismo servicio.

Puedes configurar una variable de entorno`DD_LLMOBS_ML_APP` con el nombre de tu aplicación LLM, en la que se agrupan por defecto todos los fragmentos generados.

Para anular esta configuración y utilizar un nombre de aplicación LLM diferente para un span raíz determinado, pasa el`ml_app`argumento con el nombre de la aplicación LLM subyacente al iniciar un span raíz para un nuevo rastreo o un span en un nuevo proceso.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
### Seguimiento de tramos mediante métodos en línea

El`llmobs`SDK ofrece un método en línea específico para rastrear automáticamente la ejecución de un bloque de código determinado. Estos métodos tienen la misma firma de argumentos que sus homólogos envolventes de función, con la salvedad de que`name`se requiere , ya que el nombre no se puede deducir a partir de una llamada de retorno anónima. Este método completará el span en las siguientes condiciones: 

- si la función devuelve una Promise, el span se completará cuando la Promise se resuelva o se rechace; 
- si la función toma una función de llamada de retorno como último parámetro, el span se completará cuando se llame a dicha función de llamada de retorno; 
- si la función no acepta una función de llamada de retorno y no devuelve una Promise, el span se completará al finalizar la ejecución de la función. 

#### Ejemplo sin función de llamada de retorno

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### Ejemplo con una función de devolución de llamada

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

El SDK de observabilidad de Node.js LLM ofrece una`llmobs.decorate`función que actúa como decorador de funciones para aplicaciones de TypeScript. El comportamiento de rastreo de esta función es el mismo que el `llmobs.wrap`de .

#### Example

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

### El vaciado forzado en entornos sin servidor

`llmobs.flush()` es una función de bloqueo que envía todos los datos de observabilidad de LLM almacenados en el búfer al backend de Datadog. Esto puede resultar útil en entornos sin servidor para evitar que una aplicación se cierre hasta que se hayan enviado todos los rastros de observabilidad de LLM. Seguimiento

###  de varias aplicaciones

El SDK permite realizar el seguimiento de varias aplicaciones LLM desde un mismo servicio.

Puedes configurar una variable de entorno`DD_LLMOBS_ML_APP` con el nombre de tu aplicación LLM, en la que se agrupan por defecto todos los fragmentos generados.

Para anular esta configuración y utilizar un nombre de aplicación LLM diferente para un span raíz determinado, pasa el`mlApp`argumento con el nombre de la aplicación LLM subyacente al iniciar un span raíz para un nuevo rastreo o un span en un nuevo proceso.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Directrices para la denominación de aplicaciones

El nombre de tu aplicación (el valor de `DD_LLMOBS_ML_APP`) debe cumplir las siguientes normas:

- Debe ser una cadena Unicode en minúsculasPuede 
- tener una longitud máxima de 193 
- caracteresNo puede contener guiones bajos 
- contiguos ni al finalPuede contener los siguientes caracteres:
   - Caracteres alfanuméricosGuiones bajosSignos
   - 
   - 
   - 
   - 
   - 

##  menosDos puntosPuntosBarrasInformación adicional

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