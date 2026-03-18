---
aliases:
- /es/tracing/llm_observability/auto_instrumentation
- /es/llm_observability/auto_instrumentation
- /es/llm_observability/setup/auto_instrumentation
- /es/llm_observability/sdk/auto_instrumentation
further_reading:
- link: /llm_observability/instrumentation/sdk/
  tag: Documentation
  text: Referencia del SDK de observabilidad de LLM
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Realiza un seguimiento, compara y optimiza tus indicaciones para modelos de
    lenguaje grande (LLM) con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/mcp-client-monitoring
  tag: Blog
  text: Consigue una visibilidad integral de los clientes de MCP con Datadog LLM Observability
title: Instrumentación automática para la observabilidad de los modelos de lenguaje
  grande (LLM)
---
## Resumen

La observabilidad de LLM de Datadog permite rastrear y anotar automáticamente las llamadas a los marcos y bibliotecas de LLM compatibles a través de diversas [integraciones de LLM](#llmintegrations). Cuando [ejecutas tu aplicación LLM con el SDK de observabilidad de LLM][2], estas integraciones de LLM se activan de forma predeterminada y proporcionan trazas y observabilidad listas para usar, sin que tengas que modificar tu código.

<div class="alert alert-info">Automatic instrumentation works for calls to <a href="#supported-frameworks-and-libraries">supported frameworks and libraries</a>. To trace other calls (for example: API calls, database queries, internal functions), see the <a href="/llm_observability/instrumentation/sdk">LLM Observability SDK reference</a> for how to add manual instrumentation.</div>


### Marcos y bibliotecas compatibles
{{< tabs >}}
{{% tab "Python" %}}
| Marco                                       | Versiones compatibles | Versión de Tracer |
||||
| [Amazon Bedrock](#amazonbedrock)               | >= 1.31.57         | >= 2.9.0       |
| [Amazon Bedrock Agents](#amazonbedrockagents) | >= 1.38.26         | >= 3.10.0      |
| [Anthropic](#anthropic)                         | >= 0.28.0          | >= 2.10.0      |
| [CrewAI](#crewai)                               | >= 0.105.0         | >= 3.5.0       |
| [Google ADK](#googleadk)                       | >= 1.0.0           | >= 3.15.0      |
| [Google GenAI](#googlegenai)                   | >= 1.21.1          | >= 3.11.0      |
| [LangChain](#langchain)                         | >= 0.0.192         | >= 2.9.0       |
| [LangGraph](#langgraph)                         | >= 0.2.23          | >= 3.10.1      |
| [LiteLLM](#litellm)                             | >= 1.70.0          | >= 3.9.0       |
| [MCP](#mcp)                                     | >= 1.10.0          | >= 3.11.0      |
| [OpenAI](#openai), [Azure OpenAI](#openai)      | >= 0.26.5          | >= 2.9.0       |
| [OpenAI Agents](#openaiagents)                 | >= 0.0.2           | >= 3.5.0       |
| [Pydantic AI](#pydanticai)                     | >= 0.3.0           | >= 3.11.0      |
| [Strands Agents](#strandsagents)               | >= 1.11.0          | Cualquiera            |
| [Vertex AI](#vertexai)                         | >= 1.71.1          | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| Marco                                  | Versiones compatibles | Versión de Tracer                              |
||||
| [Amazon Bedrock](#amazonbedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >= 5.35.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS), >= 5.71.0 (ESM)             |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >= 5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercelaisdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)             |
| [VertexAI](#vertexai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >= 5.44.0 (ESM)             |
| [Google GenAI](#googlegenai)              | >= 1.19.0          | >= 5.81.0 (CJS), >= 5.81.0 (ESM)             |

{{% collapse-content title="Compatibilidad con módulos ECMAScript (ESM)" level="h4" expanded=false id="esm-support" %}}
La instrumentación automática para proyectos ESM es compatible a partir de `ddtrace@>=5.38.0`. Para habilitar la instrumentación automática en tus proyectos ESM, ejecuta tu aplicación con la siguiente opción de Node:

```bash```
--import dd-trace/register.js
```

Para la [configuración de la línea de comandos](/llm_observability/instrumentation/sdk/?tab=nodejs#commandlinesetup), utiliza en su lugar la siguiente opción:

```bash```
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

##### Solución de problemas: incompatibilidad del cargador personalizado con el módulo

Si se producen errores al iniciar la aplicación al utilizar esta opción, es probable que se trate de una incompatibilidad entre módulos. Puedes crear tu propio archivo de ganchos excluyendo el módulo y el archivo en cuestión:

```javascript```
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

Para utilizar este cargador personalizado, ejecuta tu aplicación con la siguiente opción de Node:

```bash```
--import ./hook.mjs
```
{{% /collapse-content %}}

{{% collapse-content title="Compatibilidad con aplicaciones integradas (esbuild, Webpack)" level="h4" expanded=false id="bundling-support" %}}
Para utilizar las integraciones de observabilidad de LLM en aplicaciones empaquetadas (esbuild, Webpack), debes excluir los módulos de estas integraciones del proceso de empaquetado.

##### esbuild
Si utilizas esbuild, consulta [Integración con el rastreador de Node.js](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling).

##### Webpack
En el caso de Webpack, especifica la integración correspondiente en la sección `externals` de la configuración de Webpack:

```javascript```
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

{{% collapse-content title="Compatibilidad con Next.js" level="h4" expanded=false id="nextjs-support" %}}
Inicializa correctamente el rastreador en tu aplicación para garantizar que la instrumentación automática funcione correctamente. Si utilizas TypeScript o ESM en tu aplicación Next.js, inicializa el rastreador en un archivo `instrumentation.{ts/js}` de la siguiente manera, especificando las opciones de configuración como variables de entorno:

```typescript```
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const initializeImportName = 'dd-trace/initialize.mjs';
    await import(/* webpackIgnore: true */ initializeImportName as 'dd-trace/initialize.mjs')
  }

  // ...
}
```

Por otra parte, en el caso de las aplicaciones CommonJS de Next.js, puedes utilizar la función `init` directamente:

```javascript```
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


A continuación, asegúrate de especificar `ddtrace` y cualquier otra integración compatible en `serverExternalPackages` dentro de tu archivo `next.config.{ts/js}`:
```javascript```
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', 'openai'], // add any other supported integrations here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Java" %}}
| Marco de trabajo                                  | Versiones compatibles | Versión de Tracer |
||||
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 1.59.0      |

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Datadog LLM Observability also supports any framework that natively emits <a href="https://opentelemetry.io/docs/specs/semconv/gen-ai/">OpenTelemetry GenAI semantic convention v1.37+</a>-compliant spans, without requiring the Datadog tracer. See <a href="/llm_observability/instrumentation/otel_instrumentation">OpenTelemetry Instrumentation</a> for details.</div>

## Integraciones de LLM

Las integraciones de LLM de Datadog registran la latencia, los errores, los parámetros de entrada, los mensajes de entrada y salida, y el uso de tokens (cuando esté disponible) para las llamadas rastreadas.

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración con Amazon Bedrock][1] ofrece instrumentación automática para las llamadas al modelo de chat del SDK de Python de Amazon Bedrock Runtime (mediante [Boto3][2]/[Botocore][3]).

### Métodos rastreados

La integración de Amazon Bedrock implementa los siguientes métodos:

 [Mensajes de chat][4]:
   `InvokeModel`
 [Mensajes de chat transmitidos][5]:
    `InvokeModelWithResponseStream`
 [Mensajes de chat][6]:
   `Converse` (requiere `ddtrace>=3.4.0`)
 [Mensajes de chat transmitidos][7]:
   `ConverseStream` (requiere `ddtrace>=3.5.0`)

<div class="alert alert-info">The Amazon Bedrock integration does not support tracing embedding calls.</div>

[1]: /es/integraciones/amazonbedrock
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[4]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[5]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[6]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración con Amazon Bedrock][1] ofrece seguimiento automático de las llamadas al modelo de chat del SDK de Amazon Bedrock Runtime para Node.js (mediante [BedrockRuntimeClient][2]).

### Métodos rastreados

La integración de Amazon Bedrock implementa los siguientes métodos:

 [Mensajes de chat][3]:
   `InvokeModel`

[1]: /es/integraciones/amazonbedrock
[2]: https://www.npmjs.com/package/@awssdk/clientbedrockruntime
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agentes de Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Amazon Bedrock Agents ofrece seguimiento automático de las llamadas de invocación de agentes del SDK de Python para Amazon Bedrock Agents Runtime (mediante [Boto3][1]/[Botocore][2]).

### Métodos rastreados

La integración de Amazon Bedrock Agents implementa los siguientes métodos:

 [Iniciar agente][3]:
   `InvokeAgent` (requiere ddtrace >= 3.10.0)

<div class="alert alert-info">The Amazon Bedrock Agents integration, by default, only traces the overall <code>InvokeAgent</code> method. To enable
tracing intra-agent steps, you must set <code>enableTrace=True</code> in the <code>InvokeAgent</code> request parameters.</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[2]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agentruntime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Antropic" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de Anthropic][1] ofrece un seguimiento automático de las llamadas a mensajes de chat del [SDK de Python de Anthropic][2].

### Métodos rastreados

La integración de Anthropic implementa los siguientes métodos:

 [Mensajes de chat][3] (incluidas las llamadas transmitidas):
   `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
 [Mensajes de chat transmitidos][4]:
   `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

[1]: /es/integraciones/antropica
[2]: https://docs.anthropic.com/en/api/clientsdks#python
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messagesstreaming
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de Anthropic][1] ofrece seguimiento automático de las llamadas de mensajes de chat del [SDK de Anthropic para Node.js][2].

### Métodos rastreados

La integración de Anthropic implementa los siguientes métodos:

 [Mensajes de chat][3] (incluidas las llamadas transmitidas):
   `anthropic.messages.create()`
 [Mensajes de chat transmitidos][4]:
   `anthropic.messages.stream()`

[1]: /es/integraciones/antropica
[2]: https://docs.claude.com/en/api/clientsdks#typescript
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messagesstreaming
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="CrewAI" level="h3" expanded=false id="crewai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de CrewAI][1] realiza un seguimiento automático de la ejecución de las operaciones de inicio de Crew, incluidas las invocaciones de tareas, agentes y herramientas, realizadas a través del [SDK de Python de CrewAI][2].

### Métodos rastreados

La integración de CrewAI implementa los siguientes métodos:

 [Reunión inicial del equipo][3]:
   `crew.kickoff()`
   `crew.kickoff_async()`
   `crew.kickoff_for_each()`
   `crew.kickoff_for_each_async()`

 [Ejecución de tareas][4]:
   `task.execute_sync()`
   `task.execute_async()`

 [Ejecución del agente][5]:
   `agent.execute_task()`

 [Invocación de herramienta][6]:
   `tool.invoke()`

[1]: /es/integraciones/crewai
[2]: https://docs.crewai.com/introduction
[3]: https://docs.crewai.com/concepts/crews#kickingoffacrew
[4]: https://docs.crewai.com/concepts/tasks
[5]: https://docs.crewai.com/concepts/agents
[6]: https://docs.crewai.com/concepts/tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google ADK" level="h3" expanded=false id="google-adk" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Google ADK ofrece un seguimiento automático de las ejecuciones de agentes, las llamadas a herramientas y las ejecuciones de código realizadas a través del [SDK de Python de Google ADK][1].

### Métodos rastreados

La integración de Google ADK implementa los siguientes métodos:

 [Ejecuciones del agente][2]
 [Llamadas a herramientas][3]
 [Ejecución de código][4]

Se admiten tanto el método `run_live` como el método `run_async`.

[1]: https://google.github.io/adkdocs/#python
[2]: https://google.github.io/adkdocs/agents/
[3]: https://google.github.io/adkdocs/tools
[4]: https://google.github.io/adkdocs/agents/llmagents/#codeexecution
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google GenAI" level="h3" expanded=false id="google-genai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Google GenAI rastrea automáticamente los métodos del [SDK de Python de Google GenAI][1].

**Nota:** El [SDK de Google GenAI para Python][1] sustituye al SDK de Google GenerativeAI y ofrece acceso tanto a la API de Gemini Developer como a Vertex.

### Métodos rastreados

La integración de Google GenAI implementa los siguientes métodos:

 [Generación de contenido][2] (incluidas las llamadas transmitidas):
   `models.generate_content()` (También captura `chat.send_message()`)
   `aio.models.generate_content()` (También captura `aio.chat.send_message()`)
 [Contenido incrustado][3]
  `models.embed_content()`
  `aio.models.embed_content()`

[1]: https://ai.google.dev/geminiapi/docs
[2]: https://ai.google.dev/api/generatecontent#method:models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:models.embedcontent
{{% /tab %}}
{{% tab "Node.js" %}}
La integración de Google GenAI realiza un seguimiento automático de los métodos del [SDK de Google GenAI para Node.js][1] mediante la instrumentación del [paquete `@google/genai`][4].

**Nota:** El [SDK de Google GenAI para Node.js][1] sustituye al [SDK de Google GenerativeAI][6] y ofrece acceso tanto a la API de Gemini Developer como a Vertex.

### Métodos rastreados

La integración de Google GenAI implementa los siguientes métodos:

 [Generación de contenido][2] (incluidas las [llamadas retransmitidas][5])
 [Contenido incrustado][3]

[1]: https://ai.google.dev/geminiapi/docs#javascript
[2]: https://ai.google.dev/api/generatecontent#text_gen_text_only_promptJAVASCRIPT
[3]: https://ai.google.dev/api/embeddings#embed_contentJAVASCRIPT
[4]: https://www.npmjs.com/package/@google/genai
[5]: https://ai.google.dev/api/generatecontent#text_gen_text_only_prompt_streamingJAVASCRIPT
[6]: https://www.npmjs.com/package/@google/generativeai
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LangChain" level="h3" expanded=false id="langchain" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de LangChain][1] ofrece seguimiento automático de las llamadas a modelos de lenguaje grande (LLM), modelos de chat y cadenas de llamadas del [SDK de Python de LangChain][2].

### Métodos rastreados

La integración de LangChain implementa los siguientes métodos:

 [LLM][3]:
   `llm.invoke()`, `llm.ainvoke()`
   `llm.stream()`, `llm.astream()`
 [Modelos de chat][4]
   `chat_model.invoke()`, `chat_model.ainvoke()`
   `chat_model.stream()`, `chat_model.astream()`
 [Cadenas/LCEL][5]
   `chain.invoke()`, `chain.ainvoke()`
   `chain.batch()`, `chain.abatch()`
   `chain.stream()`, `chain.astream()`
 [Incrustaciones][6]
   OpenAI: `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
 [Herramientas][7]
   `BaseTool.invoke()`, `BaseTool.ainvoke()`
 [Recuperación][8]
   `langchain_community.<vectorstore>.similarity_search()`
   `langchain_pinecone.similarity_search()`
 [Plantillas de indicaciones][9]
   `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">For best results, assign templates to variables with meaningful names. Automatic instrumentation uses these names to identify prompts.</div>

  ```python```
  # "translation_template" will be used to identify the template in Datadog
  translation_template = PromptTemplate.from_template("Translate {text} to {language}")
  chain = translation_template | llm
  ```
[1]: /es/integraciones/langchain/
[2]: https://python.langchain.com/docs/introduction/
[3]: https://python.langchain.com/v0.2/docs/concepts/#llms
[4]: https://python.langchain.com/docs/concepts/chat_models/
[5]: https://python.langchain.com/docs/concepts/runnables/
[6]: https://python.langchain.com/docs/concepts/embedding_models/
[7]: https://python.langchain.com/docs/concepts/tools/
[8]: https://python.langchain.com/docs/concepts/retrieval/
[9]: https://docs.langchain.com/langsmith/managepromptsprogrammatically#pullaprompt
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de LangChain][1] ofrece seguimiento automático para las llamadas a modelos de lenguaje grande (LLM), modelos de chat, cadenas y incrustaciones de OpenAI del [SDK de LangChain para Node.js][2].

### Métodos rastreados

La integración de LangChain implementa los siguientes métodos:

 [LLM][3]:
   `llm.invoke()`
 [Modelos de chat][4]
   `chat_model.invoke()`
 [Cadenas][5]
   `chain.invoke()`
   `chain.batch()`
 [Incrustaciones][6]
   `embeddings.embedQuery()`
   `embeddings.embedDocuments()`

[1]: /es/integraciones/langchain/
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
La integración de LangGraph realiza un seguimiento automático de las invocaciones de `Pregel/CompiledGraph` y `RunnableSeq (node)` realizadas a través del [SDK de Python de LangGraph][1].

### Métodos rastreados

La integración de LangGraph implementa versiones síncronas y asíncronas de los siguientes métodos:

 [CompiledGraph.invoke(), Pregel.invoke(), CompiledGraph.stream(), Pregel.stream()][2]
 [RunnableSeq.invoke()][3]

[1]: https://langchainai.github.io/langgraph/concepts/sdk/
[2]: https://blog.langchain.dev/langgraph/#compile
[3]: https://blog.langchain.dev/langgraph/#nodes
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LiteLLM" level="h3" expanded=false id="litellm" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de LiteLLM][1] ofrece seguimiento automático para el [SDK de LiteLLM para Python][2] y los [métodos del enrutador del servidor proxy][3].

### Métodos rastreados

La integración de LiteLLM implementa los siguientes métodos:

 [Conversaciones completadas][4] (incluidas las llamadas transmitidas):
   `litellm.completion`
   `litellm.acompletion`
 [Llamadas completadas][5] (incluidas las llamadas transmitidas):
   `litellm.text_completion`
   `litellm.atext_completion`
 Conclusiones de las conversaciones del router (incluidas las llamadas transmitidas):
   `router.Router.completion`
   `router.Router.acompletion`
 Conclusiones del enrutador (incluidas las llamadas en streaming):
   `router.Router.text_completion`
   `router.Router.autocompletar_texto`

[1]: /es/integraciones/litellm
[2]: https://docs.litellm.ai/docs/#litellmpythonsdk
[3]: https://docs.litellm.ai/docs/routing
[4]: https://docs.litellm.ai/docs/completion
[5]: https://docs.litellm.ai/docs/text_completion
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="MCP" level="h3" expanded=false id="mcp" %}}
{{< tabs >}}
{{% tab "Python" %}}
El Protocolo de Contexto de Modelos (MCP) integra las llamadas a herramientas de cliente y servidor en el SDK de [MCP][1].

### Métodos rastreados

La integración de MCP implementa los siguientes métodos:

 [Llamadas de la herramienta del cliente][2]:
   `mcp.client.session.ClientSession.call_tool`

 [Llamadas a herramientas del servidor][3]:
   `mcp.server.fastmcp.tools.tool_manager.ToolManager.call_tool`

[1]: https://modelcontextprotocol.io/docs/gettingstarted/intro
[2]: https://github.com/modelcontextprotocol/pythonsdk?tab=readmeovfile#writingmcpclients
[3]: https://github.com/modelcontextprotocol/pythonsdk?tab=readmeovfile#tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI, Azure OpenAI" level="h3" expanded=false id="openai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de OpenAI][1] ofrece seguimiento automático de los puntos finales de autocompletado y autocompletado de chat del [SDK de Python de OpenAI][2] para OpenAI y Azure OpenAI.

### Métodos rastreados

La integración de OpenAI implementa los siguientes métodos, incluidas las llamadas en tiempo real:

 [Finalizaciones][3]:
    `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
    `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
 [Autocompletado en el chat][4]:
    `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
    `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`
 [Respuestas][5]:
    `OpenAI().responses.create()`
    `AsyncOpenAI().responses.create()`
    `OpenAI().responses.parse()` (a partir de `ddtrace==3.17.0`)
    `AsyncOpenAI().responses.parse()` (a partir de `ddtrace==3.17.0`)
  [Llamadas realizadas a DeepSeek a través del SDK de Python de OpenAI][6] (a partir de `ddtrace==3.1.0`)

[1]: /es/integraciones/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://platform.openai.com/docs/apireference/completions
[4]: https://platform.openai.com/docs/apireference/chat
[5]: https://platform.openai.com/docs/apireference/responses
[6]: https://apidocs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de OpenAI][1] ofrece seguimiento automático para los puntos finales de autocompletado, autocompletado de chat e incrustaciones del [SDK de OpenAI para Node.js][2] en OpenAI y [Azure OpenAI][3].

### Métodos rastreados

La integración de OpenAI implementa los siguientes métodos, incluidas las llamadas en tiempo real:

 [Finalizaciones][4]:
   `openai.completions.create()` y `azureopenai.completions.create()`
 [Autocompletado en el chat][5]:
   `openai.chat.completions.create()` y `azureopenai.chat.completions.create()`
 [Incrustaciones][6]:
   `openai.embeddings.create()` y `azureopenai.embeddings.create()`
 [Llamadas realizadas a DeepSeek a través del SDK de Node.js de OpenAI][7] (a fecha de `ddtrace@5.42.0`)
 [Respuestas][8]
   `openai.responses.create()` (a partir de `ddtrace@5.76.0`)

[1]: /es/integraciones/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://www.npmjs.com/package/openai#microsoftazureopenai
[4]: https://platform.openai.com/docs/apireference/completions
[5]: https://platform.openai.com/docs/apireference/chat
[6]: https://platform.openai.com/docs/apireference/embeddings
[7]: https://apidocs.deepseek.com/
[8]: https://platform.openai.com/docs/apireference/responses

{{% /tab %}}

{{% tab "Java" %}}
La [integración de OpenAI][1] ofrece seguimiento automático para los puntos finales de autocompletado, autocompletado de chat, incrustaciones y respuestas del [SDK de Java de OpenAI][2] para OpenAI y Azure OpenAI.

### Métodos rastreados

La integración de OpenAI implementa los siguientes métodos en `OpenAIClient`, incluidas las llamadas en tiempo real:

 [Finalizaciones][3]:
   `openAiClient.completions().create()`
   `openAiClient.completions().createStreaming()`
   `openAiClient.async().completions().create()`
   `openAiClient.async().completions().createStreaming()`
 [Autocompletado en el chat][4]:
   `openAiClient.chat().completions().create()`
   `openAiClient.chat().completions().createStreaming()`
   `openAiClient.async().chat().completions().create()`
   `openAiClient.async().chat().completions().createStreaming()`
 [Incrustaciones][5]:
   `openAiClient.embeddings().create()`
   `openAiClient.async().embeddings().create()`
 [Respuestas][6]:
   `openAiClient.responses().create()`
   `openAiClient.responses().createStreaming()`
   `openAiClient.async().responses().create()`
   `openAiClient.async().responses().createStreaming()`

El proveedor (OpenAI o Azure OpenAI) se detecta automáticamente en función de la `baseUrl` configurada en `ClientOptions`. Todos los métodos admiten variantes tanto bloqueantes como asíncronas (basadas en CompletableFuture).

[1]: /es/integraciones/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://platform.openai.com/docs/apireference/completions
[4]: https://platform.openai.com/docs/apireference/chat
[5]: https://platform.openai.com/docs/apireference/embeddings
[6]: https://platform.openai.com/docs/apireference/responses

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agentes de OpenAI" level="h3" expanded=false id="openai-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de OpenAI Agents convierte el [rastreo integrado][1] del [SDK de OpenAI Agents][2] en
convierte los datos al formato LLM Observability y los envía al producto LLM Observability de Datadog añadiendo un procesador de trazas de Datadog.

Se admiten las siguientes operaciones:
 [`traces`][3]
 [`agente`][4]
 [`generación`][5] mediante la integración de [OpenAI](#openai) de Datadog
 [`respuesta`][6]
 [`barandilla`][7]
 [`handoff`][8]
 [`función`][9]
 [`personalizado`][10]

[1]: https://openai.github.io/openaiagentspython/tracing/
[2]: https://openai.github.io/openaiagentspython/
[3]: https://openai.github.io/openaiagentspython/ref/tracing/traces/
[4]: https://openai.github.io/openaiagentspython/ref/tracing/#agents.tracing.agent_span
[5]: https://openai.github.io/openaiagentspython/ref/tracing/#agents.tracing.generation_span
[6]: https://openai.github.io/openaiagentspython/ref/tracing/#agents.tracing.response_span
[7]: https://openai.github.io/openaiagentspython/ref/tracing/#agents.tracing.guardrail_span
[8]: https://openai.github.io/openaiagentspython/ref/tracing/#agents.tracing.handoff_span
[9]: https://openai.github.io/openaiagentspython/ref/tracing/#agents.tracing.function_span
[10]: https://openai.github.io/openaiagentspython/ref/tracing/#agents.tracing.custom_span
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Pydantic IA" level="h3" expanded=false id="pydantic-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Pydantic AI gestiona las invocaciones de agentes y las llamadas a herramientas realizadas mediante el marco de agentes [Pydantic AI][1].

### Métodos rastreados

La integración de Pydantic AI implementa los siguientes métodos:

 [Invocaciones de agentes][2] (incluidas las herramientas o conjuntos de herramientas asociados al agente):
   `agent.Agent.iter` (también rastrea `agent.Agent.run` y `agent.Agent.run_sync`)
   `agent.Agent.run_stream`

[1]: https://ai.pydantic.dev/
[2]: https://ai.pydantic.dev/agents/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agentes de Strands" level="h3" expanded=false id="strands-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
A partir de la versión [v1.11.0][1], [Strands Agents][2] genera de forma nativa tramos que cumplen con las [convenciones semánticas de OpenTelemetry GenAI v1.37][3], que Datadog LLM Observability ingesta automáticamente sin necesidad del rastreador de Datadog.

Para obtener instrucciones de configuración y un ejemplo completo, consulta [Instrumentación de OpenTelemetry: uso de los agentes Strands][4].

[1]: https://github.com/strandsagents/sdkpython/releases/tag/v1.11.0
[2]: https://strandsagents.com
[3]: https://opentelemetry.io/docs/specs/semconv/genai/
[4]: /es/llm_observability/instrumentation/otel_instrumentation#uso-de-los-agentes-de-Strand
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="SDK de Vercel AI" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
La integración del [Vercel AI SDK][1] realiza un seguimiento automático de la generación de texto y objetos, las incrustaciones y las llamadas a herramientas, interceptando los intervalos de OpenTelemetry creados por el núcleo subyacente del [Vercel AI SDK][2] y convirtiéndolos en intervalos de observabilidad de LLM de Datadog.

### Métodos rastreados
 [Generación de texto][3]:
   `generateText`
   `streamText`
 [Generación de objetos][4]:
   `generateObject`
   `streamObject`
 [Incrustación][5]:
   `embed`
   `embedMany`
 [Llamada a herramienta][6]:
   `tool.execute`

### Telemetría del SDK de Vercel AI Core

Esta integración aplica automáticamente el tracer pasado a cada uno de los métodos rastreados bajo la opción [`experimental_telemetry`][7]. Si no se proporciona ninguna configuración de `experimental_telemetry`, la integración permite seguir enviando intervalos de observabilidad de LLM.

```javascript```
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

**Nota**: Si `experimental_telemetry.isEnabled` está establecido en `false`, la integración no lo activa y no envía spans a LLM Observability.

[1]: /es/integraciones/vercelaisdk
[2]: https://aisdk.dev/docs/introduction
[3]: https://aisdk.dev/docs/aisdkcore/generatingtext
[4]: https://aisdk.dev/docs/aisdkcore/generatingstructureddata
[5]: https://aisdk.dev/docs/aisdkcore/embeddings
[6]: https://aisdk.dev/docs/aisdkcore/toolsandtoolcalling
[7]: https://aisdk.dev/docs/aisdkcore/telemetry
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vertex AI" level="h3" expanded=false id="vertex-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de Vertex AI][1] realiza un seguimiento automático de la generación de contenido y de las llamadas de mensajes de chat realizadas a través del [SDK de Python de Vertex AI de Google][2].

### Métodos rastreados

La integración de Vertex AI implementa los siguientes métodos:

 [Generación de contenido][3] (incluidas las llamadas transmitidas):
   `model.generate_content()`
   `model.generate_content_async()`

 [Mensajes de chat][4] (incluidas las llamadas transmitidas):
   `chat.send_message()`
   `chat.send_message_async()`

[1]: /es/integraciones/googlecloudvertexai/
[2]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest
[3]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[4]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de Vertex AI][1] realiza un seguimiento automático de la generación de contenido y de las llamadas de mensajes de chat realizadas a través del [SDK de Vertex AI para Node.js de Google][2].

### Métodos rastreados

La integración de Vertex AI implementa los siguientes métodos:

 [Generación de contenido][3]:
   `model.generateContent()`
   `model.generateContentStream()`
 [Mensajes de chat][4]:
   `chat.sendMessage()`
   `chat.sendMessageStream()`

[1]: /es/integraciones/googlecloudvertexai/
[2]: https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest
[3]: https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest#sendtextpromptrequests
[4]: https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest#sendmultiturnchatrequests
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## Activar o desactivar las integraciones de LLM

Todas las integraciones están **activadas de forma predeterminada**.

### Desactivar todas las integraciones de LLM

{{< tabs >}}
{{% tab "Python" %}}
Utiliza la [configuración del SDK de incode][1] y especifica `integrations_enabled=False`.

**Ejemplo**: Configuración del SDK de Incode que desactiva todas las integraciones de LLM

```python```
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)
```

[1]: /es/llm_observability/instrumentation/sdk?tab=python#incodesetup
{{% /tab %}}

{{% tab "Node.js" %}}
Utiliza la [configuración del SDK de incode][1] y especifica `plugins: false`.

**Ejemplo**: Configuración del SDK de Incode que desactiva todas las integraciones de LLM

```javascript```
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

[1]: /es/llm_observability/instrumentation/sdk?tab=nodejs#incodesetup
{{% /tab %}}
{{< /tabs >}}

### Habilitar solo integraciones específicas de LLM

{{< tabs >}}
{{% tab "Python" %}}
1. Utiliza la [configuración del SDK de incode][1] y desactiva todas las integraciones con `integrations_enabled=False`.
2. Habilita manualmente determinadas integraciones con `ddtrace.patch()`.

**Ejemplo**: Configuración del SDK de Incode que solo habilita la integración con LangChain

```python```
from ddtrace import patch
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)

patch(langchain=True)
```

[1]: /es/llm_observability/instrumentation/sdk?tab=python#incodesetup
{{% /tab %}}

{{% tab "Node.js" %}}
1. Utiliza la [configuración del SDK de incode][1] y desactiva todas las integraciones con `plugins: false`.
2. Habilita manualmente determinadas integraciones con `use()`.

**Ejemplo**: Configuración del SDK de Incode que solo habilita la integración con LangChain

```javascript```
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
tracer.use('langchain', true);
```

[1]: /es/llm_observability/instrumentation/sdk?tab=nodejs#incodesetup
{{% /tab %}}
{{< /tabs >}}

Para tener un control más específico sobre la aplicación de parches a las bibliotecas y la integración que inicia el span, puedes configurar las siguientes variables de entorno:

`DD_TRACE_DISABLED_PLUGINS`
: Una cadena de nombres de integración separados por comas que se desactivan automáticamente al inicializar el rastreador.<br>
**Ejemplo**: `DD_TRACE_DISABLED_PLUGINS=openai,http`

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: Una cadena de nombres de bibliotecas, separados por comas, que no se modifican al inicializar el rastreador.<br>
**Ejemplo**: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`

## Lecturas recomendadas

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/instrumentation/sdk
[2]: /es/llm_observability/quickstart/