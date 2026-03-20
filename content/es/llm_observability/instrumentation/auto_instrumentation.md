---
aliases:
- /es/tracing/llm_observability/auto_instrumentation
- /es/llm_observability/auto_instrumentation
- /es/llm_observability/setup/auto_instrumentation
- /es/llm_observability/sdk/auto_instrumentation
further_reading:
- link: /llm_observability/instrumentation/sdk/
  tag: Documentation
  text: Referencia del SDK de Observabilidad LLM
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Rastree, compare y optimice sus prompts de LLM con la Observabilidad LLM de
    Datadog
- link: https://www.datadoghq.com/blog/mcp-client-monitoring
  tag: Blog
  text: Obtenga visibilidad de extremo a extremo en los clientes de MCP con la Observabilidad
    LLM de Datadog
title: Instrumentación automática para la Observabilidad LLM
---
## Resumen

La Observabilidad LLM de Datadog puede rastrear y anotar automáticamente las llamadas a los marcos y bibliotecas de LLM compatibles a través de varias [integraciones de LLM](#llm-integrations). Cuando [ejecute su aplicación LLM con el SDK de Observabilidad LLM][2], estas integraciones de LLM están habilitadas por defecto y proporcionan trazas y observabilidad listas para usar, sin que tenga que cambiar su código.

<div class="alert alert-info">La instrumentación automática funciona para llamadas a <a href="#supported-frameworks-and-libraries">marcos y bibliotecas compatibles</a>. Para rastrear otras llamadas (por ejemplo: llamadas a API, consultas a bases de datos, funciones internas), consulte la <a href="/llm_observability/instrumentation/sdk">referencia del SDK de Observabilidad LLM</a> para saber cómo agregar instrumentación manual.</div>


### Marcos y bibliotecas compatibles
{{< tabs >}}
{{% tab "Python" %}}
| Marco                                       | Versiones compatibles | Versión del rastreador |
|-------------------------------------------------|--------------------|----------------|
| [Amazon Bedrock](#amazon-bedrock)               | >= 1.31.57         | >= 2.9.0       |
| [Agentes de Amazon Bedrock](#amazon-bedrock-agents) | >= 1.38.26         | >= 3.10.0      |
| [Anthropic](#anthropic)                         | >= 0.28.0          | >= 2.10.0      |
| [CrewAI](#crewai)                               | >= 0.105.0         | >= 3.5.0       |
| [Google ADK](#google-adk)                       | >= 1.0.0           | >= 3.15.0      |
| [Google GenAI](#google-genai)                   | >= 1.21.1          | >= 3.11.0      |
| [LangChain](#langchain)                         | >= 0.0.192         | >= 2.9.0       |
| [LangGraph](#langgraph)                         | >= 0.2.23          | >= 3.10.1      |
| [LiteLLM](#litellm)                             | >= 1.70.0          | >= 3.9.0       |
| [MCP](#mcp)                                     | >= 1.10.0          | >= 3.11.0      |
| [OpenAI](#openai), [Azure OpenAI](#openai)      | >= 0.26.5          | >= 2.9.0       |
| [OpenAI Agents](#openai-agents)                 | >= 0.0.2           | >= 3.5.0       |
| [Pydantic AI](#pydantic-ai)                     | >= 0.3.0           | >= 3.11.0      |
| [Strands Agents](#strands-agents)               | >= 1.11.0          | Cualquiera            |
| [Vertex AI](#vertex-ai)                         | >= 1.71.1          | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| Marco                                  | Versiones Soportadas | Versión del Trazador                              |
|--------------------------------------------|--------------------|---------------------------------------------|
| [Amazon Bedrock](#amazon-bedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS), >=5.71.0 (ESM)             |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercel-ai-sdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)             |
| [VertexAI](#vertex-ai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |
| [Google GenAI](#google-genai)              | >= 1.19.0          | >= 5.81.0 (CJS), >=5.81.0 (ESM)             |

{{% collapse-content title="Soporte para Módulos ESMAScript (ESM)" level="h4" expanded=false id="esm-support" %}}
La instrumentación automática para proyectos ESM es compatible a partir de `dd-trace@>=5.38.0`. Para habilitar la instrumentación automática en sus proyectos ESM, ejecute su aplicación con la siguiente opción de Node:

```bash
--import dd-trace/register.js
```

Para [la configuración de línea de comandos](/llm_observability/instrumentation/sdk/?tab=nodejs#command-line-setup), utiliza la siguiente opción en su lugar:

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

##### Solución de problemas: Cargador personalizado para incompatibilidad de módulos

Si hay errores al iniciar su aplicación al usar esta opción, es probable que haya una incompatibilidad de módulos. Puede crear su propio archivo de gancho excluyendo el módulo y el archivo en cuestión:

```javascript
// hook.mjs

import { register } from 'node:module';

register('import-in-the-middle/hook.mjs', import.meta.url, {
  parentURL: import.meta.url,
  data: { exclude: [
    /langsmith/,
    /openai\/_shims/,
    /openai\/resources\/chat\/completions\/messages/,
    // Add any other modules you want to exclude
  ]}
});
```

Para usar este cargador personalizado, ejecute su aplicación con la siguiente opción de Node:

```bash
--import ./hook.mjs
```
{{% /collapse-content %}}

{{% collapse-content title="Soporte para aplicaciones empaquetadas (esbuild, Webpack)" level="h4" expanded=false id="bundling-support" %}}
Para usar integraciones de Observabilidad LLM en aplicaciones empaquetadas (esbuild, Webpack), debe excluir los módulos de estas integraciones del empaquetado.

##### esbuild
Si está utilizando esbuild, consulte [Empaquetado con el rastreador de Node.js](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling).

##### Webpack
Para Webpack, especifique la integración correspondiente en la sección `externals` de la configuración de webpack:

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    fallback: {
      graphql: false,
    }
  },
  externals: {
    openai: 'openai'
  }
}
```
{{% /collapse-content %}}

{{% collapse-content title="Soporte para Next.js" level="h4" expanded=false id="nextjs-support" %}}
Inicialice correctamente el rastreador en su aplicación para asegurar que la auto-instrumentación funcione correctamente. Si está utilizando TypeScript o ESM para su aplicación Next.js, inicialice el rastreador en un archivo `instrumentation.{ts/js}` de la siguiente manera, especificando sus opciones de configuración como variables de entorno:

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const initializeImportName = 'dd-trace/initialize.mjs';
    await import(/* webpackIgnore: true */ initializeImportName as 'dd-trace/initialize.mjs')
  }

  // ...
}
```

De lo contrario, para aplicaciones Next.js en CommonJS, puede usar la función `init` directamente:

```javascript
// instrumentation.js
const tracer = require('dd-trace')

function register () {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    tracer.init({}); // specify options here or they will be read from environment variables
  }

  // ...
}

module.exports = register;
```


Luego, asegúrese de especificar `dd-trace` y cualquier otra integración soportada en `serverExternalPackages` en su archivo `next.config.{ts/js}`:

```javascript
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', 'openai'], // add any other supported integrations here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Java" %}}
| Marco                                  | Versiones Soportadas | Versión del Rastreador |
|--------------------------------------------|--------------------|----------------|
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 1.59.0      |

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">La observabilidad de LLM de Datadog también admite cualquier marco que emita nativamente spans compatibles con la convención semántica de OpenTelemetry GenAI v1.37+</a>, sin requerir el rastreador de Datadog. Consulte <a href="/llm_observability/instrumentation/otel_instrumentation">Instrumentación de OpenTelemetry</a> para más detalles.</div>

## Integraciones de LLM

Las integraciones de LLM de Datadog capturan latencia, errores, parámetros de entrada, mensajes de entrada y salida, y uso de tokens (cuando esté disponible) para las llamadas rastreadas.

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de Amazon Bedrock][1] proporciona instrumentación automática para las llamadas al modelo de chat del SDK de Python de Amazon Bedrock Runtime (usando [Boto3][2]/[Botocore][3]).

### Métodos rastreados

La integración de Amazon Bedrock instrumenta los siguientes métodos:

- [Mensajes de chat][4]:
  - `InvokeModel`
- [Mensajes de chat transmitidos][5]:
  -  `InvokeModelWithResponseStream`
- [Mensajes de chat][6]:
  - `Converse` (requiere `ddtrace>=3.4.0`)
- [Mensajes de chat transmitidos][7]:
  - `ConverseStream` (requiere `ddtrace>=3.5.0`)

<div class="alert alert-info">La integración de Amazon Bedrock no admite el rastreo de llamadas de incrustación.</div>

[1]: /es/integrations/amazon-bedrock
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[4]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[5]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[6]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de Amazon Bedrock][1] proporciona trazado automático para las llamadas del modelo de chat del SDK de Node.js de Amazon Bedrock (utilizando [BedrockRuntimeClient][2]).

### Métodos rastreados

La integración de Amazon Bedrock instrumenta los siguientes métodos:

- [Mensajes de chat][3]:
  - `InvokeModel`

[1]: /es/integrations/amazon-bedrock
[2]: https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agentes de Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Agentes de Amazon Bedrock proporciona trazado automático para las llamadas de invocación de agentes del SDK de Python de Amazon Bedrock (utilizando [Boto3][1]/[Botocore][2]).

### Métodos rastreados

La integración de Agentes de Amazon Bedrock instrumenta los siguientes métodos:

- [Invocar Agente][3]:
  - `InvokeAgent` (requiere ddtrace>=3.10.0)

<div class="alert alert-info">La integración de Agentes de Amazon Bedrock, por defecto, solo traza el método general <code>InvocarAgente</code>. Para habilitar
el trazado de pasos intra-agente, debe establecer <code>enableTrace=True</code> en los parámetros de solicitud de <code>InvocarAgente</code>.</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[2]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Antropico" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de Antropico][1] proporciona trazado automático para las llamadas de mensajes de chat del [SDK de Python de Antropico][2].

### Métodos rastreados

La integración de Antropico instrumenta los siguientes métodos:

- [Mensajes de chat][3] (incluyendo llamadas transmitidas):
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Mensajes de chat transmitidos][4]:
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

[1]: /es/integrations/anthropic
[2]: https://docs.anthropic.com/en/api/client-sdks#python
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de Anthropic][1] proporciona seguimiento automático para las llamadas de mensajes de chat del [SDK de Node.js de Anthropic][2].

### Métodos rastreados

La integración de Antropico instrumenta los siguientes métodos:

- [Mensajes de chat][3] (incluyendo llamadas transmitidas):
  - `anthropic.messages.create()`
- [Mensajes de chat transmitidos][4]:
  - `anthropic.messages.stream()`

[1]: /es/integrations/anthropic
[2]: https://docs.claude.com/en/api/client-sdks#typescript
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="CrewAI" level="h3" expanded=false id="crewai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de CrewAI][1] rastrea automáticamente la ejecución de los inicios de Crew, incluyendo invocaciones de tareas/agentes/herramientas, realizadas a través del [SDK de Python de CrewAI][2].

### Métodos rastreados

La integración de CrewAI instrumenta los siguientes métodos:

- [Inicio de Crew][3]:
  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Ejecución de Tareas][4]:
  - `task.execute_sync()`
  - `task.execute_async()`

- [Ejecución de Agentes][5]:
  - `agent.execute_task()`

- [Invocación de Herramientas][6]:
  - `tool.invoke()`

[1]: /es/integrations/crewai
[2]: https://docs.crewai.com/introduction
[3]: https://docs.crewai.com/concepts/crews#kicking-off-a-crew
[4]: https://docs.crewai.com/concepts/tasks
[5]: https://docs.crewai.com/concepts/agents
[6]: https://docs.crewai.com/concepts/tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google ADK" level="h3" expanded=false id="google-adk" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Google ADK proporciona seguimiento automático para ejecuciones de agentes, llamadas a herramientas y ejecuciones de código realizadas a través del [SDK de Python de Google ADK][1].

### Métodos rastreados

La integración de Google ADK instrumenta los siguientes métodos:

- [El agente ejecuta][2]
- [Llamadas de herramientas][3]
- [Ejecuciones de código][4]

Ambos métodos `run_live` y `run_async` son compatibles.

[1]: https://google.github.io/adk-docs/#python
[2]: https://google.github.io/adk-docs/agents/
[3]: https://google.github.io/adk-docs/tools
[4]: https://google.github.io/adk-docs/agents/llm-agents/#code-execution
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google GenAI" level="h3" expanded=false id="google-genai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Google GenAI rastrea automáticamente los métodos en el [Google GenAI Python SDK][1].

**Nota:** El [Google GenAI Python SDK][1] sucede al Google GenerativeAI SDK y expone tanto la API de desarrollador de Gemini como Vertex.

### Métodos rastreados

La integración de Google GenAI instrumenta los siguientes métodos:

- [Generando contenido][2] (incluyendo llamadas transmitidas):
  - `models.generate_content()` (También captura `chat.send_message()`)
  - `aio.models.generate_content()` (También captura `aio.chat.send_message()`)
- [Incrustando contenido][3]
  -`models.embed_content()`
  -`aio.models.embed_content()`

[1]: https://ai.google.dev/gemini-api/docs
[2]: https://ai.google.dev/api/generate-content#method:-models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:-models.embedcontent
{{% /tab %}}
{{% tab "Node.js" %}}
La integración de Google GenAI rastrea automáticamente los métodos en el [Google GenAI Node.js SDK][1] al instrumentar el [`@google/genai` paquete][4].

**Nota:** El [Google GenAI Node.js SDK][1] sucede al [Google GenerativeAI SDK][6] y expone tanto la API de desarrollador de Gemini como Vertex.

### Métodos rastreados

La integración de Google GenAI instrumenta los siguientes métodos:

- [Generando contenido][2] (incluyendo [llamadas transmitidas][5])
- [Incrustando contenido][3]

[1]: https://ai.google.dev/gemini-api/docs#javascript
[2]: https://ai.google.dev/api/generate-content#text_gen_text_only_prompt-JAVASCRIPT
[3]: https://ai.google.dev/api/embeddings#embed_content-JAVASCRIPT
[4]: https://www.npmjs.com/package/@google/genai
[5]: https://ai.google.dev/api/generate-content#text_gen_text_only_prompt_streaming-JAVASCRIPT
[6]: https://www.npmjs.com/package/@google/generative-ai
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LangChain" level="h3" expanded=false id="langchain" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de LangChain][1] proporciona trazado automático para el [SDK de Python de LangChain][2] LLM, modelo de chat y llamadas de cadena.

### Métodos rastreados

La integración de LangChain instrumenta los siguientes métodos:

- [LLMs][3]:
  - `llm.invoke()`, `llm.ainvoke()`
  - `llm.stream()`, `llm.astream()`
- [Modelos de chat][4]
  - `chat_model.invoke()`, `chat_model.ainvoke()`
  - `chat_model.stream()`, `chat_model.astream()`
- [Cadenas/LCEL][5]
  - `chain.invoke()`, `chain.ainvoke()`
  - `chain.batch()`, `chain.abatch()`
  - `chain.stream()`, `chain.astream()`
- [Embeddings][6]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
- [Herramientas][7]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Recuperación][8]
  - `langchain_community.<vectorstore>.similarity_search()`
  - `langchain_pinecone.similarity_search()`
- [Plantillas de Prompt][9]
  - `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">Para obtener los mejores resultados, asigne plantillas a variables con nombres significativos. La instrumentación automática utiliza estos nombres para identificar los mensajes.</div>

  ```python
  # "translation_template" will be used to identify the template in Datadog
  translation_template = PromptTemplate.from_template("Translate {text} to {language}")
  chain = translation_template | llm
  ```
[1]: /es/integrations/langchain/
[2]: https://python.langchain.com/docs/introduction/
[3]: https://python.langchain.com/v0.2/docs/concepts/#llms
[4]: https://python.langchain.com/docs/concepts/chat_models/
[5]: https://python.langchain.com/docs/concepts/runnables/
[6]: https://python.langchain.com/docs/concepts/embedding_models/
[7]: https://python.langchain.com/docs/concepts/tools/
[8]: https://python.langchain.com/docs/concepts/retrieval/
[9]: https://docs.langchain.com/langsmith/manage-prompts-programmatically#pull-a-prompt
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de LangChain][1] proporciona trazado automático para el [SDK de LangChain Node.js][2], modelo de chat, cadena y llamadas a embeddings de OpenAI.

### Métodos rastreados

La integración de LangChain instrumenta los siguientes métodos:

- [LLMs][3]:
  - `llm.invoke()`
- [Modelos de chat][4]
  - `chat_model.invoke()`
- [Cadenas][5]
  - `chain.invoke()`
  - `chain.batch()`
- [Embeddings][6]
  - `embeddings.embedQuery()`
  - `embeddings.embedDocuments()`

[1]: /es/integrations/langchain/
[2]: https://js.langchain.com/docs/introduction/
[3]: https://js.langchain.com/docs/integrations/llms/
[4]: https://js.langchain.com/docs/concepts/chat_models
[5]: https://js.langchain.com/docs/how_to/sequence/
[6]: https://js.langchain.com/docs/integrations/text_embedding/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LangGraph" level="h3" expanded=false id="langgraph" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de LangGraph traza automáticamente las invocaciones de `Pregel/CompiledGraph` y `RunnableSeq (node)` realizadas a través del [SDK de LangGraph Python][1].

### Métodos rastreados

La integración de LangGraph instrumenta versiones sincrónicas y asincrónicas de los siguientes métodos:

- [CompiledGraph.invoke(), Pregel.invoke(), CompiledGraph.stream(), Pregel.stream()][2]
- [RunnableSeq.invoke()][3]

[1]: https://langchain-ai.github.io/langgraph/concepts/sdk/
[2]: https://blog.langchain.dev/langgraph/#compile
[3]: https://blog.langchain.dev/langgraph/#nodes
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LiteLLM" level="h3" expanded=false id="litellm" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de LiteLLM][1] proporciona trazado automático para el [SDK de LiteLLM Python][2] y [métodos de enrutador de servidor proxy][3].

### Métodos rastreados

La integración de LiteLLM instrumenta los siguientes métodos:

- [Completaciones de chat][4] (incluyendo llamadas transmitidas):
  - `litellm.completion`
  - `litellm.acompletion`
- [Completaciones][5] (incluyendo llamadas transmitidas):
  - `litellm.text_completion`
  - `litellm.atext_completion`
- Completaciones de chat de enrutador (incluyendo llamadas transmitidas):
  - `router.Router.completion`
  - `router.Router.acompletion`
- Completaciones de enrutador (incluyendo llamadas transmitidas):
  - `router.Router.text_completion`
  - `router.Router.atext_completion`

[1]: /es/integrations/litellm
[2]: https://docs.litellm.ai/docs/#litellm-python-sdk
[3]: https://docs.litellm.ai/docs/routing
[4]: https://docs.litellm.ai/docs/completion
[5]: https://docs.litellm.ai/docs/text_completion
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="MCP" level="h3" expanded=false id="mcp" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración del Protocolo de Contexto del Modelo (MCP) instrumenta llamadas de herramientas del cliente y del servidor en el [MCP][1] SDK.

### Métodos rastreados

Los instrumentos de integración de MCP los siguientes métodos:

- [Llamadas de Herramientas del Cliente][2]:
  - `mcp.client.session.ClientSession.call_tool`

- [Llamadas de Herramientas del Servidor][3]:
  - `mcp.server.fastmcp.tools.tool_manager.ToolManager.call_tool`

[1]: https://modelcontextprotocol.io/docs/getting-started/intro
[2]: https://github.com/modelcontextprotocol/python-sdk?tab=readme-ov-file#writing-mcp-clients
[3]: https://github.com/modelcontextprotocol/python-sdk?tab=readme-ov-file#tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI, Azure OpenAI" level="h3" expanded=false id="openai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de OpenAI][1] proporciona trazado automático para los [puntos finales de finalización y chat del OpenAI Python SDK][2] hacia OpenAI y Azure OpenAI.

### Métodos rastreados

La integración de OpenAI instrumenta los siguientes métodos, incluyendo llamadas transmitidas:

- [Finalizaciones][3]:
   - `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
   - `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
- [Finalizaciones de chat][4]:
   - `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
   - `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`
- [Respuestas][5]:
   - `OpenAI().responses.create()`
   - `AsyncOpenAI().responses.create()`
   - `OpenAI().responses.parse()` (a partir de `ddtrace==3.17.0`)
   - `AsyncOpenAI().responses.parse()` (a partir de `ddtrace==3.17.0`)
- [Llamadas realizadas a DeepSeek a través del OpenAI Python SDK][6] (a partir de `ddtrace==3.1.0`)

[1]: /es/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://platform.openai.com/docs/api-reference/completions
[4]: https://platform.openai.com/docs/api-reference/chat
[5]: https://platform.openai.com/docs/api-reference/responses
[6]: https://api-docs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de OpenAI][1] proporciona trazado automático para los [puntos finales de finalización, chat y embeddings del OpenAI Node.js SDK][2] hacia OpenAI y [Azure OpenAI][3].

### Métodos rastreados

La integración de OpenAI instrumenta los siguientes métodos, incluyendo llamadas transmitidas:

- [Finalizaciones][4]:
  - `openai.completions.create()` y `azureopenai.completions.create()`
- [Completaciones de chat][5]:
  - `openai.chat.completions.create()` y `azureopenai.chat.completions.create()`
- [Incrustaciones][6]:
  - `openai.embeddings.create()` y `azureopenai.embeddings.create()`
- [Llamadas realizadas a DeepSeek a través del SDK de OpenAI Node.js][7] (a partir de `dd-trace@5.42.0`)
- [Respuestas][8]
  - `openai.responses.create()` (a partir de `dd-trace@5.76.0`)

[1]: /es/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://www.npmjs.com/package/openai#microsoft-azure-openai
[4]: https://platform.openai.com/docs/api-reference/completions
[5]: https://platform.openai.com/docs/api-reference/chat
[6]: https://platform.openai.com/docs/api-reference/embeddings
[7]: https://api-docs.deepseek.com/
[8]: https://platform.openai.com/docs/api-reference/responses

{{% /tab %}}

{{% tab "Java" %}}
La [integración de OpenAI][1] proporciona seguimiento automático para los puntos finales de [completación del SDK de OpenAI Java][2], completaciones de chat, incrustaciones y respuestas hacia OpenAI y Azure OpenAI.

### Métodos rastreados

La integración de OpenAI instrumenta los siguientes métodos en `OpenAIClient`, incluyendo llamadas transmitidas:

- [Completaciones][3]:
  - `openAiClient.completions().create()`
  - `openAiClient.completions().createStreaming()`
  - `openAiClient.async().completions().create()`
  - `openAiClient.async().completions().createStreaming()`
- [Completaciones de chat][4]:
  - `openAiClient.chat().completions().create()`
  - `openAiClient.chat().completions().createStreaming()`
  - `openAiClient.async().chat().completions().create()`
  - `openAiClient.async().chat().completions().createStreaming()`
- [Incrustaciones][5]:
  - `openAiClient.embeddings().create()`
  - `openAiClient.async().embeddings().create()`
- [Respuestas][6]:
  - `openAiClient.responses().create()`
  - `openAiClient.responses().createStreaming()`
  - `openAiClient.async().responses().create()`
  - `openAiClient.async().responses().createStreaming()`

El proveedor (OpenAI vs Azure OpenAI) se detecta automáticamente según el `baseUrl` configurado en `ClientOptions`. Todos los métodos admiten variantes tanto bloqueantes como asíncronas (basadas en CompletableFuture).

[1]: /es/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://platform.openai.com/docs/api-reference/completions
[4]: https://platform.openai.com/docs/api-reference/chat
[5]: https://platform.openai.com/docs/api-reference/embeddings
[6]: https://platform.openai.com/docs/api-reference/responses

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agentes de OpenAI" level="h3" expanded=false id="openai-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Agentes de OpenAI convierte el [seguimiento incorporado][1] del [SDK de Agentes de OpenAI][2] en
formato de Observabilidad LLM y lo envía al producto de Observabilidad LLM de Datadog al agregar un procesador de trazas de Datadog.

Las siguientes operaciones son compatibles:
- [`traces`][3]
- [`agent`][4]
- [`generation`][5] utilizando la integración de Datadog con [OpenAI](#openai)
- [`response`][6]
- [`guardrail`][7]
- [`handoff`][8]
- [`function`][9]
- [`custom`][10]

[1]: https://openai.github.io/openai-agents-python/tracing/
[2]: https://openai.github.io/openai-agents-python/
[3]: https://openai.github.io/openai-agents-python/ref/tracing/traces/
[4]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.agent_span
[5]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.generation_span
[6]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.response_span
[7]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.guardrail_span
[8]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.handoff_span
[9]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.function_span
[10]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.custom_span
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Pydantic AI" level="h3" expanded=false id="pydantic-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Pydantic AI instrumenta las invocaciones de agentes y las llamadas a herramientas realizadas utilizando el marco de agentes [Pydantic AI][1].

### Métodos rastreados

La integración de Pydantic AI instrumenta los siguientes métodos:

- [Invocaciones de Agentes][2] (incluyendo cualquier herramienta o conjunto de herramientas asociadas con el agente):
  - `agent.Agent.iter` (también rastrea `agent.Agent.run` y `agent.Agent.run_sync`)
  - `agent.Agent.run_stream`

[1]: https://ai.pydantic.dev/
[2]: https://ai.pydantic.dev/agents/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agentes de Strands" level="h3" expanded=false id="strands-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
A partir de [v1.11.0][1], [Agentes de Strands][2] emite de manera nativa spans compatibles con [convenciones semánticas de OpenTelemetry GenAI v1.37][3], que Datadog LLM Observability ingiere automáticamente sin requerir el rastreador de Datadog.

Para instrucciones de configuración y un ejemplo completo, consulte [Instrumentación de OpenTelemetry — Usando Agentes de Strands][4].

[1]: https://github.com/strands-agents/sdk-python/releases/tag/v1.11.0
[2]: https://strandsagents.com
[3]: https://opentelemetry.io/docs/specs/semconv/gen-ai/
[4]: /es/llm_observability/instrumentation/otel_instrumentation#using-strands-agents
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vercel AI SDK" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
La integración del [Vercel AI SDK][1] rastrea automáticamente la generación de texto y objetos, embeddings y llamadas a herramientas al interceptar los spans de OpenTelemetry creados por el núcleo subyacente del [Vercel AI SDK][2] y convertirlos en spans de Datadog LLM Observability.

### Métodos rastreados
- [Generación de texto][3]:
  - `generateText`
  - `streamText`
- [Generación de objetos][4]:
  - `generateObject`
  - `streamObject`
- [Incorporación][5]:
  - `embed`
  - `embedMany`
- [Llamada a herramientas][6]:
  - `tool.execute`

### Telemetría del SDK de Vercel AI Core

Esta integración parchea automáticamente el rastreador pasado a cada uno de los métodos rastreados bajo la opción [`experimental_telemetry`][7]. Si no se pasa ninguna configuración `experimental_telemetry`, la integración permite que aún se envíen spans de Observabilidad LLM.

```javascript
require('dd-trace').init({
  llmobs: {
    mlApp: 'my-ml-app',
  }
});

const { generateText } = require('ai');
const { openai } = require('@ai-sdk/openai');

async function main () {
  let result = await generateText({
    model: openai('gpt-4o'),
    ...
    experimental_telemetry: {
      isEnabled: true,
      tracer: someTracerProvider.getTracer('ai'), // this tracer will be patched to format and send created spans to Datadog LLM Observability
    }
  });

  result = await generateText({
    model: openai('gpt-4o'),
    ...
  }); // since no tracer is passed in, the integration will enable it to still send LLM Observability spans
}
```

**Nota**: Si `experimental_telemetry.isEnabled` está configurado en `false`, la integración no lo activa y no envía spans a la Observabilidad LLM.

[1]: /es/integrations/vercel-ai-sdk
[2]: https://ai-sdk.dev/docs/introduction
[3]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[4]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[5]: https://ai-sdk.dev/docs/ai-sdk-core/embeddings
[6]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
[7]: https://ai-sdk.dev/docs/ai-sdk-core/telemetry
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vertex AI" level="h3" expanded=false id="vertex-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de Vertex AI][1] rastrea automáticamente la generación de contenido y las llamadas de mensajes de chat realizadas a través del [SDK de Python de Vertex AI de Google][2].

### Métodos rastreados

La integración de Vertex AI instrumenta los siguientes métodos:

- [Generando contenido][3] (incluyendo llamadas transmitidas):
  - `model.generate_content()`
  - `model.generate_content_async()`

- [Mensajes de chat][4] (incluyendo llamadas transmitidas):
  - `chat.send_message()`
  - `chat.send_message_async()`

[1]: /es/integrations/google-cloud-vertex-ai/
[2]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest
[3]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[4]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de Vertex AI][1] rastrea automáticamente la generación de contenido y las llamadas de mensajes de chat realizadas a través del [SDK de Node.js de Vertex AI de Google][2].

### Métodos rastreados

La integración de Vertex AI instrumenta los siguientes métodos:

- [Generando contenido][3]:
  - `model.generateContent()`
  - `model.generateContentStream()`
- [Mensajes de chat][4]:
  - `chat.sendMessage()`
  - `chat.sendMessageStream()`

[1]: /es/integrations/google-cloud-vertex-ai/
[2]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest
[3]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-text-prompt-requests
[4]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-multiturn-chat-requests
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## Habilitar o deshabilitar integraciones LLM

Todas las integraciones están **habilitadas por defecto**.

### Deshabilitar todas las integraciones LLM

{{< tabs >}}
{{% tab "Python" %}}
Utiliza la [configuración del SDK en código][1] y especifica `integrations_enabled=False`.

**Ejemplo**: Configuración del SDK en código que deshabilita todas las integraciones LLM

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)
```

[1]: /es/llm_observability/instrumentation/sdk?tab=python#in-code-setup
{{% /tab %}}

{{% tab "Node.js" %}}
Utiliza la [configuración del SDK en código][1] y especifica `plugins: false`.

**Ejemplo**: Configuración del SDK en código que desactiva todas las integraciones de LLM

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

[1]: /es/llm_observability/instrumentation/sdk?tab=nodejs#in-code-setup
{{% /tab %}}
{{< /tabs >}}

### Solo habilitar integraciones específicas de LLM

{{< tabs >}}
{{% tab "Python" %}}
1. Utiliza la [configuración del SDK en código][1] y desactiva todas las integraciones con `integrations_enabled=False`.
2. Habilita manualmente integraciones seleccionadas con `ddtrace.patch()`.

**Ejemplo**: Configuración del SDK en código que solo habilita la integración de LangChain

```python
from ddtrace import patch
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)

patch(langchain=True)
```

[1]: /es/llm_observability/instrumentation/sdk?tab=python#in-code-setup
{{% /tab %}}

{{% tab "Node.js" %}}
1. Utiliza la [configuración del SDK en código][1] y desactiva todas las integraciones con `plugins: false`.
2. Habilita manualmente integraciones seleccionadas con `use()`.

**Ejemplo**: Configuración del SDK en código que solo habilita la integración de LangChain

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
tracer.use('langchain', true);
```

[1]: /es/llm_observability/instrumentation/sdk?tab=nodejs#in-code-setup
{{% /tab %}}
{{< /tabs >}}

Para un control más específico sobre el parcheo de bibliotecas y la integración que inicia el span, puedes establecer las siguientes variables de entorno:

`DD_TRACE_DISABLED_PLUGINS`
: Una cadena separada por comas de nombres de integraciones que se desactivan automáticamente cuando se inicializa el rastreador.<br>
**Ejemplo**: `DD_TRACE_DISABLED_PLUGINS=openai,http`

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: Una cadena separada por comas de nombres de bibliotecas que no se parchean cuando se inicializa el rastreador.<br>
**Ejemplo**: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`

## Lectura Adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/instrumentation/sdk
[2]: /es/llm_observability/quickstart/