---
aliases:
- /es/tracing/llm_observability/sdk/nodejs
- /es/llm_observability/sdk/nodejs
code_lang: nodejs
code_lang_weight: 30
title: Referencia del SDK de LLM Observability para Node.js
type: lenguaje de código múltiple
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

El SDK de LLM Observability para Node.js mejora la observabilidad de tus aplicaciones de LLM basadas en JavaScript. El SDK es compatible con las versiones 16 y posteriores de Node.js. Para obtener información sobre la compatibilidad de integración de LLM Observability, consulta [Auto Instrumentation][5].

Puedes instalar y configurar el rastreo de varias operaciones como flujos de trabajo, tareas y llamadas a la API con funciones envueltas o bloques rastreados. También puedes anotar estas trazas (traces) con metadatos para obtener una visión más profunda del rendimiento y el comportamiento de tus aplicaciones, así como admitir varios servicios de LLM o modelos del mismo entorno.

## Configuración

### Requisitos previos

1. Debes tener instalada la última versión del paquete `dd-trace`:

{{< code-block lang="shell">}}
npm install dd-trace
{{< /code-block >}}

2. LLM Observability requiere una clave de API de Datadog (consulta [las instrucciones para crear una clave de API][1]).

### Configuración de la línea de comandos

Ejecuta tu aplicación con `NODE_OPTIONS="--import dd-trace/initialize.mjs"` y especifica las variables de entorno requeridas para activar LLM Observability.

**Nota**: `dd-trace/initialize.mjs` activa automáticamente todas las integraciones de APM.

```shell
DD_SITE={{< region-param key="dd_site" code="true" >}} DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

`DD_SITE`
: obligatorio; _cadena_.
<br />El sitio de Datadog para enviar tus datos de LLM. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`DD_LLMOBS_ENABLED`
: obligatorio; _número entero o cadena_.
<br />Activa esta opción para enviar los datos a LLM Observability. Debe establecerse en `1` o `true`.

`DD_LLMOBS_ML_APP`
: obligatorio; _cadena_.
<br />El nombre de tu aplicación, servicio o proyecto de LLM, donde se agrupan todas las trazas y tramos (spans). Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta las [Directrices de denominación de aplicaciones](#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para anular este valor en un tramo raíz específico, consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications).

`DD_LLMOBS_AGENTLESS_ENABLED`
: opcional; _número entero o cadena_. **Valor predeterminado**: `false`.
<br />Solo se requiere si no utilizas el Datadog Agent, en cuyo caso se debe establecer en `1` o `true`.

`DD_API_KEY`
: opcional; _cadena_.
<br />Tu clave de API de Datadog. Solo se requiere si no utilizas el Datadog Agent.

### Configuración del código

Activa LLM Observability mediante programación a través de la función `init()` en lugar de ejecutarla con el comando `dd-trace/initialize.mjs`. **Nota**: No utilices este método de configuración con el comando `dd-trace/initialize.mjs`.

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

Estas opciones se establecen en la configuración de `llmobs`:

`mlApp`
: opcional; _cadena_.
<br />El nombre de tu aplicación, servicio o proyecto de LLM, donde se agrupan todas las trazas y tramos. Esto ayuda a distinguir entre diferentes aplicaciones o experimentos. Consulta las [Directrices de denominación de aplicaciones](#application-naming-guidelines) para conocer los caracteres permitidos y otras restricciones. Para anular este valor en una traza específica, consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications). Si no se especifica, el valor predeterminado es `DD_LLMOBS_ML_APP`.

`agentlessEnabled`
: opcional; _booleano_. **Valor predeterminado**: `false`.
<br />Solo se requiere si no utilizas el Datadog Agent, en cuyo caso debe establecerse en `true`. Esto configura la biblioteca `dd-trace` para no enviar ningún dato que requiera el Datadog Agent. Si no se especifica, el valor predeterminado es `DD_LLMOBS_AGENTLESS_ENABLED`.

Estas opciones pueden establecerse en la configuración general del rastreador:

`env`
: opcional; _cadena_.
<br />El nombre del entorno de tu aplicación (ejemplos: `prod`, `pre-prod`, `staging`). Si no se especifica, el valor predeterminado es `DD_ENV`.

`service`
: opcional; _cadena_.
<br />El nombre del servicio utilizado para tu aplicación. Si no se especifica, el valor predeterminado es `DD_SERVICE`.

`DD_API_KEY` y `DD_SITE` se leen desde las [variables de entorno](#in-code-setup) para su configuración, por lo que no se pueden configurar mediante programación.

### Configuración de AWS Lambda

Utiliza la función `llmobs.flush()` para enviar todos los tramos restantes del rastreador a LLM Observability al final de la función de Lambda.

#### Directrices de denominación de aplicaciones

El nombre de tu aplicación (el valor de `DD_LLMOBS_ML_APP`) debe ser una cadena Unicode en minúsculas. Puede contener los caracteres que se indican abajo:

- Caracteres alfanuméricos
- Guiones bajos
- Signos de resta
- Dos puntos
- Puntos
- Barras

El nombre puede tener hasta 193 caracteres y no puede contener guiones bajos contiguos ni finales.

## Rastreo de tramos

Para rastrear un tramo, utiliza `llmobs.wrap(options, function)` como envoltura de función en la función que deseas rastrear. Para ver una lista de los tipos de tramo disponibles, consulta la [documentación de tipos de tramos][2]. Para lograr un rastreo más detallado de las operaciones dentro de las funciones, consulta [Rastreo de tramos con métodos en línea](#tracing-spans-using-inline-methods).

### Tipos de tramos

Los tipos de tramos son obligatorios, y se especifican en el objeto `options` que se pasa a las funciones de rastreo de `llmobs` (`trace`, `wrap` y `decorate`). Consulta la [documentación de tipos de tramos][2] para ver una lista de los tipos de tramos compatibles.

**Nota:** Los tramos con un tipo de tramo no válido no se envían a LLM Observability.

### Captura automática de los argumentos, las salidas y el nombre de una función

`llmobs.wrap`, junto con [`llmobs.decorate`](#function-decorators-in-typescript) para TypeScript, intenta capturar automáticamente las entradas, las salidas y el nombre de la función que se rastrea. Si necesitas anotar manualmente un tramo, consulta [Anotación de un tramo](#annotating-a-span). Las entradas y salidas que anotes anularán la captura automática. Además, para anular el nombre de la función, pasa la propiedad `name` del objeto options a la función `llmobs.wrap`:

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // lógica de la aplicación del usuario
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### Tramo de LLM

**Nota**: Si utilizas cualquier proveedor o marco de LLM compatible con las [integraciones de LLM de Datadog][5], no necesitas iniciar manualmente un tramo de LLM para rastrear estas operaciones.

Para rastrear un tramo de LLM, especifica el tipo de tramo como `llm` y, de manera opcional, especifica los siguientes argumentos en el objeto options.

#### Argumentos

`modelName`
: opcional; _cadena_. **Valor predeterminado**: `"custom"`.
<br/>El nombre del LLM invocado.

`name`
: opcional; _cadena_.
<br/>El nombre de la operación. Si no se especifica, `name` es de forma predeterminada el nombre de la función rastreada.

`modelProvider`
: opcional; _cadena_. **Valor predeterminado**: `"custom"`.
<br/>El nombre del proveedor del modelo.

`sessionId`
: opcional; _cadena_.
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de las sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional; _cadena_.
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications) para obtener más información.

#### Ejemplo

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // lógica de la aplicación del usuario para invocar a LLM
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

### Tramo de flujo de trabajo

Para rastrear un tramo de LLM, especifica el tipo de tramo como `workflow` y, de manera opcional, especifica los siguientes argumentos en el objeto options.

#### Argumentos

`name`
: opcional; _cadena_.
<br/>El nombre de la operación. Si no se especifica, `name` es de forma predeterminada el nombre de la función rastreada.

`sessionId`
: opcional; _cadena_.
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de las sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional; _cadena_.
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications) para obtener más información.

#### Ejemplo

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // lógica de la aplicación del usuario
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

### Tramo de Agent

Para rastrear un tramo de LLM, especifica el tipo de tramo como `agent` y, de manera opcional, especifica los siguientes argumentos en el objeto options.

#### Argumentos

`name`
: opcional; _cadena_.
<br/>El nombre de la operación. Si no se especifica, `name` es de forma predeterminada el nombre de la función rastreada.

`sessionId`
: opcional; _cadena_.
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de las sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional; _cadena_.
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications) para obtener más información.

#### Ejemplo

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // lógica de la aplicación del usuario
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

### Tramo de herramienta

Para rastrear un tramo de LLM, especifica el tipo de tramo como `tool` y, de manera opcional, especifica los siguientes argumentos en el objeto options.

#### Argumentos

`name`
: opcional; _cadena_.
<br/>El nombre de la operación. Si no se especifica, `name` es de forma predeterminada el nombre de la función rastreada.

`sessionId`
: opcional; _cadena_.
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de las sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional; _cadena_.
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications) para obtener más información.

#### Ejemplo

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // lógica de la aplicación del usuario
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

### Tramo de tarea

Para rastrear un tramo de LLM, especifica el tipo de tramo como `task` y, de manera opcional, especifica los siguientes argumentos en el objeto options.

#### Argumentos

`name`
: opcional; _cadena_.
<br/>El nombre de la operación. Si no se especifica, `name` es de forma predeterminada el nombre de la función rastreada.

`sessionId`
: opcional; _cadena_.
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de las sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional; _cadena_.
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications) para obtener más información.

#### Ejemplo

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // lógica de la aplicación del usuario
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

### Tramo de inserción

Para rastrear un tramo de LLM, especifica el tipo de tramo como `embedding` y, de manera opcional, especifica los siguientes argumentos en el objeto options.

**Nota**: La anotación de las entradas de un tramo de inserción requiere un formato diferente al de otros tipos de tramos. Consulta [Anotación de un tramo](#annotating-a-span) para obtener más detalles sobre cómo especificar entradas de inserción.

#### Argumentos

`modelName`
: opcional; _cadena_. **Valor predeterminado**: `"custom"`.
<br/>El nombre del LLM invocado.

`name`
: opcional; _cadena_.
<br/>El nombre de la operación. Si no se especifica, `name` se establece de forma predeterminada como el nombre de la función rastreada.

`modelProvider`
: opcional; _cadena_. **Valor predeterminado**: `"custom"`.
<br/>El nombre del proveedor del modelo.

`sessionId`
: opcional; _cadena_.
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de las sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional; _cadena_.
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications) para obtener más información.

#### Ejemplo

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // lógica de la aplicación del usuario
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}

### Tramo de recuperación

Para rastrear un tramo de LLM, especifica el tipo de tramo como `retrieval` y, de manera opcional, especifica los siguientes argumentos en el objeto options.

**Nota**: La anotación de las salidas de un tramo de recuperación requiere un formato diferente al de otros tipos de tramos. Consulta [Anotación de un tramo](#annotating-a-span) para obtener más detalles sobre cómo especificar salidas de recuperación.

#### Argumentos

`name`
: opcional; _cadena_.
<br/>El nombre de la operación. Si no se especifica, `name` es de forma predeterminada el nombre de la función rastreada.

`sessionId`
: opcional; _cadena_.
<br/>El ID de la sesión de usuario subyacente. Consulta [Rastreo de las sesiones de usuario](#tracking-user-sessions) para obtener más información.

`mlApp`
: opcional; _cadena_.
<br/>El nombre de la aplicación de ML a la que pertenece la operación. Consulta [Rastreo de varias aplicaciones](#tracing-multiple-applications) para obtener más información.

#### Ejemplo

A continuación se incluye también un ejemplo de anotación de un tramo. Para obtener más información, consulta [Anotación de un tramo](#annotating-a-span).

{{< code-block lang="javascript" >}}
function getRelevantDocs (question) {
  const contextDocuments = ... // lógica de la aplicación del usuario
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

### Condiciones de finalización de un tramo para una función envuelta

`llmobs.wrap` extiende el comportamiento subyacente de [`tracer.wrap`][6]. El tramo subyacente creado cuando se llama a la función finaliza bajo las siguientes condiciones:

- Si la función devuelve Promise, el tramo finaliza cuando la promesa se resuelve o se rechaza.
- Si la función toma una devolución de llamada como el último parámetro, entonces el tramo finaliza cuando se llama a esa devolución de llamada.
- Si la función no acepta una devolución de llamada y no devuelve Promise, entonces el tramo finaliza al final de la ejecución de la función.

En el siguiente ejemplo, se demuestra la segunda condición, en la que el último argumento es una devolución de llamada:

#### Ejemplo

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res, next) {
  const err = ... // lógica de la aplicación del usuario
  // el tramo de esta función finaliza cuando se llama a `next`
  next(err)
}
myAgentMiddleware = llmobs.wrap({ kind: 'agent' }, myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

Si la aplicación no utiliza la función de devolución de llamada, lo recomendado es usar un bloque rastreado en línea en su lugar. Consulta [Rastreo de tramos con métodos en línea](#tracing-spans-using-inline-methods) para obtener más información.

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res) {
  // la devolución de llamada `next` no se utiliza aquí
  return llmobs.trace({ kind: 'agent', name: 'myAgentMiddleware' }, () => {
    return res.status(200).send('Hello World!')
  })
}

app.use(myAgentMiddleware)

{{< /code-block >}}

## Rastreo de las sesiones de usuario

El rastreo de sesiones permite asociar varias interacciones a un usuario determinado. Al iniciar un tramo raíz para una nueva traza o tramo en un nuevo proceso, especifica el argumento `sessionId` con el ID de cadena de la sesión de usuario subyacente:

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # lógica de la aplicación del usuario
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}

## Anotación de un tramo

El SDK incluye el método `llmobs.annotate()` para anotar tramos con entradas, salidas y metadatos.

### Argumentos

El método `LLMObs.annotate()` acepta los siguientes argumentos:

`span`
: opcional; _tramo_. **Valor predeterminado**: el tramo activo actual.
<br />El tramo que se va a anotar. Si no se especifica `span` (como cuando se utilizan envolturas de función), el SDK anota el tramo activo actual.

`annotationOptions`
: obligatorio; _objeto_.
<br />Un objeto de diferentes tipos de datos con los que se va a anotar el tramo.

El objeto `annotationOptions` puede contener lo siguiente:

`inputData`
: opcional; _tipo JSON serializable o lista de objetos_.
<br />Un tipo JSON serializable (para tramos que no son de LLM) o una lista de diccionarios con este formato: `{role: "...", content: "..."}` (para tramos de LLM). **Nota**: Los tramos de inserción son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "..."}`.

`outputData`
: opcional; _tipo JSON serializable o lista de objetos_.
<br />Un tipo JSON serializable (para tramos que no son de LLM) o una lista de objetos con este formato: `{role: "...", content: "..."}` (para tramos de LLM). **Nota**: Los tramos de recuperación son un caso especial y requieren una cadena o un objeto (o una lista de objetos) con este formato: `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: opcional; _objeto_.
<br />Un objeto de pares de clave-valor JSON serializables que los usuarios pueden añadir como información de metadatos relevante para la operación de entrada o salida que describe el tramo (`model_temperature`, `max_tokens`, `top_k`, etc.).

`metrics`
: opcional; _objeto_.
<br />Un objeto de claves JSON serializables y valores numéricos que los usuarios pueden añadir como métricas relevantes para la operación que describe el tramo (`input_tokens`, `output_tokens`, `total_tokens`, etc.).

`tags`
: opcional; _objeto_.
<br />Un objeto de pares de clave-valor JSON serializables que los usuarios pueden añadir como etiquetas en relación con el contexto del tramo (`session`, `environment`, `system`, `versioning`, etc.). Para obtener más información sobre las etiquetas, consulta [Empezando con las etiquetas (tags)][3].

### Ejemplo

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // lógica de la aplicación del usuario para invocar a LLM
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
  ... // lógica de la aplicación del usuario
  llmobs.annotate(
    undefined, { // esto puede establecerse como indefinido o descartarse por completo
      inputData: { text: "Hello world!" },
      outputData: [0.0023064255, -0.009327292, ...],
      metrics: { input_tokens: 4 },
      tags: { host: "host_name" }
    }
  )
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)

function similaritySearch () {
  ... // lógica de la aplicación del usuario
  llmobs.annotate(undefined, {
    inputData: "Hello world!",
    outputData: [{ text: "Hello world is ...", name: "Hello, World! program", id: "document_id", score: 0.9893 }],
    tags: { host: "host_name" }
  })
  return
}
similaritySearch = llmobs.wrap({ kind: 'retrieval', name: 'getRelevantDocs' }, similaritySearch)

{{< /code-block >}}

## Evaluaciones

El SDK de LLM Observability incluye los métodos `llmobs.exportSpan()` y `llmobs.submitEvaluation()` para ayudar a que tu aplicación de LLM rastreada envíe evaluaciones a LLM Observability.

### Exportación de un tramo

`llmobs.exportSpan()` puede utilizarse para extraer el contexto del tramo de un tramo. Tendrás que utilizar este método para asociar tu evaluación con el tramo correspondiente.

#### Argumentos

El método `llmobs.exportSpan()` acepta el siguiente argumento:

`span`
: opcional; _tramo_.
<br />El tramo del que se va a extraer el contexto del tramo (los ID de tramo y traza). Si no se especifica (como cuando se utilizan envolturas de función), el SDK exporta el tramo activo actual.

#### Ejemplo

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // lógica de la aplicación del usuario para invocar a LLM
  const spanContext = llmobs.exportSpan()
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}


### Enviar evaluaciones

`llmobs.submitEvaluation()` puede utilizarse para enviar una evaluación personalizada asociada a un determinado tramo.

#### Argumentos

El método `llmobs.submitEvaluation()` acepta los siguientes argumentos:

`span_context`
: obligatorio; _diccionario_.
<br />El contexto del tramo al que se va a asociar la evaluación. Debería ser la salida de `LLMObs.export_span()`.

`evaluationOptions`
: obligatorio; _objeto_.
<br />Un objeto de los datos de evaluación.

El objeto `evaluationOptions` puede contener lo siguiente:

`label`
: obligatorio; _cadena_.
<br />El nombre de la evaluación.

`metricType`
: obligatorio; _cadena_.
<br />El tipo de evaluación. Debe ser "categórica" o "puntuación".

`value`
: obligatorio; _cadena o tipo numérico_.
<br />El valor de la evaluación. Debe ser una cadena (para categórico `metric_type`) o un número (para puntuación `metric_type`).

`tags`
: opcional; _diccionario_.
<br />Un diccionario de pares de clave-valor de cadena que los usuarios pueden añadir como etiquetas con respecto a la evaluación. Para obtener más información sobre las etiquetas, consulta [Empezando con las etiquetas (tags)][3].

### Ejemplo

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // lógica de la aplicación del usuario para invocar a LLM
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

## Rastreo avanzado

### Rastreo de tramos con métodos en línea

El SDK `llmobs` incluye un método en línea correspondiente para rastrear automáticamente la operación que implica un bloque de código determinado. Estos métodos tienen la misma firma de argumentos que sus homólogos de envoltura de función, con el añadido de que se requiere `name`, ya que el nombre no se puede deducir de una devolución de llamada anónima. Este método finalizará el tramo bajo las siguientes condiciones:

- Si la función devuelve Promise, el tramo finaliza cuando la promesa se resuelve o se rechaza.
- Si la función toma una devolución de llamada como el último parámetro, entonces el tramo finaliza cuando se llama a esa devolución de llamada.
- Si la función no acepta una devolución de llamada y no devuelve Promise, entonces el tramo finaliza al final de la ejecución de la función.

#### Ejemplo sin una devolución de llamada

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // lógica de la aplicación del usuario
    return
  })
}
{{< /code-block >}}

#### Ejemplo con una devolución de llamada

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, (workflowSpan, cb) => {
    ... // lógica de la aplicación del usuario
    let maybeError = ...
    cb(maybeError) // el tramo finalizará aquí y se etiquetará el error si no es nulo o indefinido
    return
  })
}
{{< /code-block >}}

El tipo de devolución de esta función coincide con el tipo de devolución de la función rastreada:

{{< code-block lang="javascript" >}}
function processMessage () {
  const result = llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // lógica de la aplicación del usuario
    return 'hello world'
  })

  console.log(result) // 'hola, mundo'
  return result
}
{{< /code-block >}}

### Decoradores de función en TypeScript

El SDK de Observabilidad LLM para Node.js incluye una función `llmobs.decorate` que sirve como decorador de función para aplicaciones de TypeScript. Este comportamiento de rastreo de funciones es el mismo que `llmobs.wrap`.

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
    ... // lógica de la aplicación del usuario
    return
  }
}

{{< /code-block >}}

### Descarga forzada en entornos serverless

`llmobs.flush()` es una función de bloqueo que envía todos los datos de LLM Observability almacenados en búfer al backend de Datadog. Esto puede ser útil en entornos serverless para evitar que una aplicación se desconecte hasta que se envíen todas las trazas de LLM Observability.

### Rastreo de varias aplicaciones

El SDK admite el rastreo de varias aplicaciones de LLM desde el mismo servicio.

Puedes configurar una variable de entorno `DD_LLMOBS_ML_APP` con el nombre de tu aplicación de LLM, en la que se agruparán de forma predeterminada todos los tramos generados.

Si quieres anular esta configuración y utilizar el nombre de una aplicación de LLM diferente en un tramo raíz determinado, pasa el argumento `mlApp` con el nombre de cadena de la aplicación de LLM subyacente al iniciar un tramo raíz para una nueva traza o tramo en un nuevo proceso.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // lógica de la aplicación del usuario
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

### Rastreo distribuido

El SDK admite el rastreo a través de servicios o hosts distribuidos. El rastreo distribuido funciona mediante la propagación de la información del tramo a través de las solicitudes web.

La biblioteca `dd-trace` incluye integraciones listas para usar que admiten el trazado distribuido de [marcos web][4] populares. Requerir el rastreador activa automáticamente estas integraciones, pero puedes desactivarlas de manera opcional con el siguiente código:

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // desactiva la integración http
{{< /code-block >}}


[1]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /es/llm_observability/terms/
[3]: /es/getting_started/tagging/
[4]: /es/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
[5]: /es/llm_observability/setup/auto_instrumentation/?tab=nodejs
[6]: /es/tracing/trace_collection/custom_instrumentation/nodejs/dd-api/?tab=wrapper