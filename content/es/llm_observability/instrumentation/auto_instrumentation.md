---
aliases:
- /es/tracing/llm_observability/auto_instrumentation
- /es/llm_observability/auto_instrumentation
- /es/llm_observability/setup/auto_instrumentation
- /es/llm_observability/sdk/auto_instrumentation
further_reading:
- link: /llm_observability/instrumentation/sdk/
  tag: Documentación
  text: Referencia del SDK de LLM Observability
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Sigue, compara y optimiza tus mensajes LLM con Datadog LLM Observability
- link: https://www.datadoghq.com/blog/mcp-client-monitoring
  tag: Blog
  text: Obtén visibilidad de principio a fin de los clientes MCP con Datadog LLM Observability
title: Instrumentación automática para LLM Observability
---

## Información general

Datadog LLM Observability puede rastrear automáticamente y anotar llamadas a frameworks y bibliotecas LLM compatibles a través de varias [integraciones LLM](#llm-integrations). Cuando [ejecutas tu aplicación LLM con el SDK de LLM Observability][2], estas integraciones LLM están habilitadas por defecto y proporcionan trazas y observabilidad predefinidas, sin que tengas que cambiar tu código.

<div class="alert alert-info">La instrumentación automática funciona para llamadas a <a href="#supported-frameworks-and-libraries">frameworks y bibliotecas compatibles</a>. Para rastrear otras llamadas (por ejemplo: llamadas a la API, consultas a bases de datos, funciones internas), consulta la <a href="/llm_observability/instrumentation/sdk">referencia del SDK de LLM Observability</a> para saber cómo añadir instrumentación manual.</div>


### Frameworks y bibliotecas compatibles
{{< tabs >}}
{{% tab "Python" %}}
| Framework                                       | Versiones compatibles | Versión del rastreador |
|-------------------------------------------------|--------------------|----------------|
| [Amazon Bedrock](#amazon-bedrock)               | >= 1.31.57         | >= 2.9.0       |
| [Amazon Bedrock Agents](#amazon-bedrock-agents) | >= 1.38.26         | >= 3.10.0      |
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
| [Vertex AI](#vertex-ai)                         | >= 1.71.1          | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| Framework                                  | Versiones compatibles | Versión del rastreador                              |
|--------------------------------------------|--------------------|---------------------------------------------|
| [Amazon Bedrock](#amazon-bedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS), >=5.71.0 (ESM)             |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercel-ai-sdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)             |
| [VertexAI](#vertex-ai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |

{{% collapse-content title="Compatibilidad con módulos ESMAScript (ESM)" level="h4" expanded=false id="esm-support" %}}
La instrumentación automática para proyectos ESM es compatible a partir de `dd-trace@>=5.38.0`. Para habilitar la instrumentación automática en tus proyectos ESM, ejecuta tu aplicación con la siguiente opción de Node:

```bash
--import dd-trace/register.js
```

Para la [configuración de la línea de comandos](/llm_observability/instrumentation/sdk/?tab=nodejs#command-line-setup), utiliza la siguiente opción en su lugar:

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

##### Solución de problemas: cargador personalizado para la incompatibilidad de módulos

Si se producen errores al iniciar la aplicación cuando se utiliza esta opción, es probable que se trate de una incompatibilidad entre módulos. Puedes crear tu propio archivo hook con el módulo y el archivo en cuestión excluidos:

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

Para utilizar este cargador personalizado, ejecuta tu aplicación con la siguiente opción de Node:

```bash
--import ./hook.mjs
```
{{% /collapse-content %}}

{{% collapse-content title="Compatibilidad con aplicaciones empaquetadas (esbuild, Webpack)" level="h4" expanded=false id="bundling-support" %}}
Para utilizar integraciones de LLM Observability en aplicaciones empaquetadas (esbuild, Webpack), debes excluir los módulos de estas integraciones del empaquetado.

##### esbuild
Si utilizas esbuild, consulta [Bundling with the Node.js tracer](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling).

##### Webpack
Para Webpack, especifica la integración correspondiente en la sección `externals` de la configuración de webpack:

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

{{% collapse-content title="Compatibilidad con Next.js" level="h4" expanded=false id="nextjs-support" %}}
Inicializa correctamente el rastreador en tu aplicación para garantizar que la autoinstrumentación funcione correctamente. Si utilizas TypeScript o ESM para tu aplicación Next.js, inicializa el rastreador en un archivo `instrumentation.{ts/js}` como se indica a continuación, especificando tus opciones de configuración como variables de entorno:

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

De lo contrario, para aplicaciones CommonJS Next.js, puedes utilizar directamente la función `init`:

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


A continuación, asegúrate de especificar `dd-trace` y cualquier otra integración compatible en `serverExternalPackages` en tu archivo `next.config.{ts/js}`:
```javascript
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', 'openai'], // add any other supported integrations here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

## Integraciones LLM

Las integraciones LLM de Datadog capturan la latencia, los errores, los parámetros de entrada, los mensajes de entrada y salida y el uso de tokens (si está disponible) de las llamadas rastreadas.

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración con Amazon Bedrock][1] proporciona instrumentación automática para las llamadas al modelo de chat del SDK de Amazon Bedrock Runtime Python (utilizando [Boto3][2]/[Botocore][3]).

### Métodos rastreados

La integración de Amazon Bedrock instrumenta los siguientes métodos:

- [Mensajes de chat][4]:
  - `InvokeModel`
- [Mensajes de chat retransmitidos][5]:
  -  `InvokeModelWithResponseStream`
- [Mensajes de chat][6]:
  - `Converse` (requiere `ddtrace>=3.4.0`)
- [Mensajes de chat retransmitidos][7]:
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
La [integración de Amazon Bedrock][1] proporciona rastreo automático para las llamadas al modelo de chat del SDK de Amazon Bedrock Runtime Node.js (utilizando [BedrockRuntimeClient][2]).

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

{{% collapse-content title="Amazon Bedrock Agents" level="h3" expanded=false id="amazon-bedrock-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de Amazon Bedrock Agents proporciona rastreo automático para las llamadas de invocación de agents del SDK de Amazon Bedrock Agents Runtime Python (utilizando [Boto3][1]/[Botocore][2]).

### Métodos rastreados

La integración de Amazon Bedrock Agents instrumenta los siguientes métodos:

- [Invocar Agent][3]:
  - `InvokeAgent` (requiere ddtrace>=3.10.0)

<div class="alert alert-info">La integración de Amazon Bedrock Agents, por defecto, solo rastrea el método general <code>InvokeAgent</code>. Para habilitar
el rastreo de los pasos dentro del agent, debes establecer <code>enableTrace=True</code> en los parámetros de solicitud de <code>InvokeAgent</code>.</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[2]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Anthropic" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de Anthropic][1] proporciona un rastreo automático de las llamadas a mensajes de chat del [SDK de Anthropic Python][2].

### Métodos rastreados

La integración de Anthropic instrumenta los siguientes métodos:

- [Mensajes de chat][3] (incluidas las llamadas retrasmitidas):
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Mensajes de chat retransmitidos][4]:
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

[1]: /es/integrations/anthropic
[2]: https://docs.anthropic.com/en/api/client-sdks#python
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de Anthropic][1] proporciona rastreo automático para las llamadas a mensajes de chat del [SDK de Anthropic Node.js][2].

### Métodos rastreados

La integración de Anthropic instrumenta los siguientes métodos:

- [Mensajes de chat][3] (incluidas las llamadas retrasmitidas):
  - `anthropic.messages.create()`
- [Mensajes de chat retransmitidos][4]:
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
La integración [CrewAI][1] rastrea automáticamente la ejecución de los lanzamientos de Crew, incluyendo las invocaciones a tareas/agents/herramientas, realizadas a través del [SDK Python de CrewAI][2].

### Métodos rastreados

La integración CrewAI instrumenta los siguientes métodos:

- [Crew Kickoff][3]:
  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Ejecución de tareas][4]:
  - `task.execute_sync()`
  - `task.execute_async()`

- [Ejecución de Agent][5]:
  - `agent.execute_task()`

- [Invocación de herramientas][6]:
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
La integración con Google ADK proporciona un rastreo automático de las ejecuciones de agents, llamadas a herramientas y ejecuciones de código realizadas a través del [SDK de ADK Python de Google][1].

### Métodos rastreados

La integración de Google ADK instrumenta los siguientes métodos:

- [Ejecuciones de Agent][2]
- [Llamadas de herramientas][3]
- [Ejecuciones de código][4]

Se admiten los métodos `run_live` y `run_async`.

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
La integración de Google GenAI rastrea automáticamente métodos en el [SDK de Google GenAI Python][1].

**Nota:** El [SDK de Google GenAI Python][1] tiene prioridad sobre el SDK de Google GenerativeAI, y expone tanto Gemini Developer API como Vertex.

### Métodos rastreados

La integración de Google GenAI instrumenta los siguientes métodos:

- [Generación de contenidos][2] (incluidas las llamadas retransmitidas):
  - `models.generate_content()` (también captura `chat.send_message()`)
  - `aio.models.generate_content()` (también captura `aio.chat.send_message()`)
- [Contenido incrustado][3]
  -`models.embed_content()`
  -`aio.models.embed_content()`

[1]: https://ai.google.dev/gemini-api/docs
[2]: https://ai.google.dev/api/generate-content#method:-models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:-models.embedcontent
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LangChain" level="h3" expanded=false id="langchain" %}}
{{< tabs >}}
{{% tab "Python" %}}
La [integración de LangChain][1] proporciona rastreo automático para el LLM, el modelo de chat y las llamadas a la cadena del [SDK de LangChain Python][2].

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
- [Incrustaciones][6]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
- [Herramientas][7]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Recuperación][8]
  - `langchain_community.<vectorstore>.similarity_search()`
  - `langchain_pinecone.similarity_search()`
- [Plantillas para mensajes][9]
  - `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">Para obtener mejores resultados, asigna plantillas a variables con nombres significativos. La instrumentación automática utiliza estos nombres para identificar las indicaciones.</div>

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
La [integración de LangChain][1] proporciona rastreo automático para LLM del [SDK de LangChain Node.js][2], modelo de chat, cadena y incrustaciones de llamadas a OpenAI.

### Métodos rastreados

La integración de LangChain instrumenta los siguientes métodos:

- [LLMs][3]:
  - `llm.invoke()`
- [Modelos de chat][4]
  - `chat_model.invoke()`
- [Cadenas][5]
  - `chain.invoke()`
  - `chain.batch()`
- [Incrustaciones][6]
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
La integración de LangGraph rastrea automáticamente las invocaciones a `Pregel/CompiledGraph` y `RunnableSeq (node)` realizadas a través del [SDK de LangGraph Python][1].

### Métodos rastreados

La integración LangGraph instrumenta versiones síncronas y asíncronas de los siguientes métodos:

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
La [integración con LiteLLM][1] proporciona rastreo automático para el [SDK de LiteLLM Python][2] y [los métodos de enrutador del servidor proxy][3].

### Métodos rastreados

La integración de LiteLLM instrumenta los siguientes métodos:

- [Finalizaciones del chat][4] (incluidas las llamadas retransmitidas):
  - `litellm.completion`
  - `litellm.acompletion`
- [Finalizaciones][5] (incluidas las llamadas retransmitidas):
  - `litellm.text_completion`
  - `litellm.atext_completion`
- Finalizaciones del chat del enrutador (incluidas las llamadas retransmitidas):
  - `router.Router.completion`
  - `router.Router.acompletion`
- Finalizaciones de enrutadores (incluidas las llamadas retransmitidas):
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
La integración de Model Context Protocol (MCP) instrumenta las llamadas a herramientas de cliente y servidor en el SDK de [MCP][1].

### Métodos rastreados

La integración de MCP instrumenta los siguientes métodos:

- [Llamadas a la herramienta de cliente][2]:
  - `mcp.client.session.ClientSession.call_tool`

- [Llamadas a la herramienta del servidor][3]:
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
La [integración de OpenAI][1] proporciona rastreo automático para la finalización del [SDK de OpenAI Python][2] y los endpoints de finalización de chat a OpenAI y Azure OpenAI.

### Métodos rastreados

La integración de OpenAI instrumenta los siguientes métodos, incluidas las llamadas trasmitidas:

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
-  [Llamadas realizadas a DeepSeek a través del SDK de OpenAI Python][6] (a partir de `ddtrace==3.1.0`)

[1]: /es/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://platform.openai.com/docs/api-reference/completions
[4]: https://platform.openai.com/docs/api-reference/chat
[5]: https://platform.openai.com/docs/api-reference/responses
[6]: https://api-docs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
La [integración OpenAI][1] proporciona rastreo automático para la finalización del [SDK de OpenAI Node.js][2], finalización de chat, y endpoints de incrustaciones a OpenAI y [Azure OpenAI][3].

### Métodos rastreados

La integración de OpenAI instrumenta los siguientes métodos, incluidas las llamadas trasmitidas:

- [Finalizaciones][4]:
  - `openai.completions.create()` y `azureopenai.completions.create()`
- [Finalizaciones de chat][5]:
  - `openai.chat.completions.create()` y `azureopenai.chat.completions.create()`
- [Incrustaciones][6]:
  - `openai.embeddings.create()` y `azureopenai.embeddings.create()`
- [Llamadas realizadas a DeepSeek a través del SDK de OpenAI Node.js][7] (a partir de `dd-trace@5.42.0`)
- [Respuestas][8] (a partir de `dd-trace@5.76.0`)

[1]: /es/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://www.npmjs.com/package/openai#microsoft-azure-openai
[4]: https://platform.openai.com/docs/api-reference/completions
[5]: https://platform.openai.com/docs/api-reference/chat
[6]: https://platform.openai.com/docs/api-reference/embeddings
[7]: https://api-docs.deepseek.com/
[8]: https://platform.openai.com/docs/api-reference/responses/create

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI Agents" level="h3" expanded=false id="openai-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
La integración de OpenAI Agents convierte el [rastreo incorporado][1] del [SDK de OpenAI Agents][2] en
el formato de LLM Observability y lo envía al producto de LLM Observability de Datadog añadiendo un procesador de trazas de Datadog.

Se admiten las siguientes operaciones:
- [`traces`][3]
- [`agent`][4]
- [`generation`][5] utilizando la integración de [OpenAI](#openai) de Datadog
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
La integración de Pydantic AI instrumenta las invocaciones a agents y las llamadas a herramientas realizadas usando el framework de agents de [Pydantic AI][1].

### Métodos rastreados

La integración de Pydantic AI instrumenta los siguientes métodos:

- [Invocaciones del Agent][2] (incluidas las herramientas o conjuntos de herramientas asociados al agent):
  - `agent.Agent.iter` (también rastrea `agent.Agent.run` y `agent.Agent.run_sync`)
  - `agent.Agent.run_stream`

[1]: https://ai.pydantic.dev/
[2]: https://ai.pydantic.dev/agents/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="SDK de Vercel AI" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
La integración del [SDK de Vercel AI][1] rastrea automáticamente la generación de texto y objetos, las incrustaciones y las llamadas a herramientas interceptando los tramos de OpenTelemetry creados por el núcleo subyacente del [SDK de Vercel AI][2] y convirtiéndolos en tramos de Datadog LLM Observability.

### Métodos rastreados
- [Generación de texto][3]:
  - `generateText`
  - `streamText`
- [Generación de objetos][4]:
  - `generateObject`
  - `streamObject`
- [Incrustación][5]:
  - `embed`
  - `embedMany`
- [Llamada a la herramienta][6]:
  - `tool.execute`

### Telemetría del SDK de Vercel AI Core

Esta integración parchea automáticamente el rastreador pasado en cada uno de los métodos rastreados bajo la [opción`experimental_telemetry`][7]. Si no se pasa ninguna configuración `experimental_telemetry`, la integración permite seguir enviando tramos de LLM Observability.

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

**Nota**: Si `experimental_telemetry.isEnabled` está configurado en `false`, la integración no lo activa y no envía tramos a LLM Observability.

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
La integración [Vertex AI][1] rastrea automáticamente la generación de contenidos y las llamadas a mensajes de chat realizadas a través del [SDK de Vertex AI Python de Google][2].

### Métodos rastreados

La integración de Vertex AI instrumenta los siguientes métodos:

- [Generación de contenidos][3] (incluidas las llamadas retransmitidas):
  - `model.generate_content()`
  - `model.generate_content_async()`

- [Mensajes de chat][4] (incluidas las llamadas retransmitidas):
  - `chat.send_message()`
  - `chat.send_message_async()`

[1]: /es/integrations/google-cloud-vertex-ai/
[2]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest
[3]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[4]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
{{% /tab %}}

{{% tab "Node.js" %}}
La [integración de Vertex AI][1] rastrea automáticamente la generación de contenidos y las llamadas a mensajes de chat realizadas a través del [SDK de Vertex AI Node.js de Google][2].

### Métodos rastreados

La integración de Vertex AI instrumenta los siguientes métodos:

- [Generación de contenido][3]:
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

## Activar o desactivar las integraciones LLM

Todas las integraciones están **activadas por defecto**.

### Desactivar todas las integraciones LLM

{{< tabs >}}
{{% tab "Python" %}}
Utiliza la [configuración del SDK en el código][1] y especifica `integrations_enabled=False`.

**Ejemplo**: la configuración del SDK en el código que desactiva todas las integraciones LLM

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
Utiliza la [configuración del SDK en el código][1] y especifica `plugins: false`.

**Ejemplo**: la configuración del SDK en el código que desactiva todas las integraciones LLM

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

### Habilitar solo integraciones LLM específicas

{{< tabs >}}
{{% tab "Python" %}}
1. Utiliza la [configuración del SDK en el código][1] y desactiva todas las integraciones con `integrations_enabled=False`.
2. Habilita manualmente determinadas integraciones con `ddtrace.patch()`.

**Ejemplo**: la configuración del SDK en el código que solo activa la integraciones LangChain

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
1. Utiliza la [configuración del SDK en el código][1] y desactiva todas las integraciones con `plugins: false`.
2. Habilita manualmente determinadas integraciones con `use()`.

**Ejemplo**: la configuración del SDK en el código que solo activa la integraciones LangChain

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

Para un control más específico sobre el parcheo de bibliotecas y la integración que inicia el tramo, puedes establecer las siguientes variables de entorno:

`DD_TRACE_DISABLED_PLUGINS`
: una cadena separada por comas de nombres de integración que se desactivan automáticamente cuando se inicializa el rastreador.<br>
**Ejemplo**: `DD_TRACE_DISABLED_PLUGINS=openai,http`

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: una cadena separada por comas de nombres de bibliotecas que no se parchean cuando se inicializa el rastreador.<br>
**Ejemplo**: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/instrumentation/sdk
[2]: /es/llm_observability/quickstart/