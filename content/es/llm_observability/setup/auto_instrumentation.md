---
aliases:
- /es/tracing/llm_observability/auto_instrumentation
- /es/llm_observability/auto_instrumentation
further_reading:
- link: /llm_observability/setup/sdk/python
  tag: Documentación
  text: Más información sobre el SDK de  LLM Observability para Python
- link: /llm_observability/setup/sdk/nodejs
  tag: Documentación
  text: Más información sobre el SDK de LLM Observability para Node.js
title: Instrumentación automática
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">LLM Observability no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

<div class="alert alert-info">Datadog ofrece una variedad de capacidades de inteligencia artificial (IA) y Machine Learning (ML). Las integraciones de <a href="/integrations/#cat-aiml">IA/ML en la página Integraciones y en el Marketplace de Datadog</a> son funcionalidades de toda la plataforma Datadog. <br><br> Por ejemplo, APM ofrece una integración nativa con OpenAI para monitorizar tu uso de OpenAI, mientras que Infrastructure Monitoring ofrece una integración con el DCGM Exporter de NVIDIA para monitorizar cargas de trabajo de IA de computación intensiva. Estas integraciones son diferentes de la oferta de LLM Observability.</div>

{{< tabs >}}
{{% tab "Python" %}}

## Información general

El [SDK de LLM Observability para Python][16] proporciona integraciones que automáticamente rastreen y anoten llamadas a marcos de LLM y bibliotecas. Sin cambiar tu código, puedes obtener trazas y la observabilidad de las llamadas que tu aplicación de LLM hace a los siguientes marcos:

| Marco                                  | Versiones compatibles | Versión del rastreador    |
|--------------------------------------------|--------------------|-------------------|
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 0.26.5          | >= 2.9.0          |
| [Langchain](#langchain)                    | >= 0.0.192         | >= 2.9.0          |
| [Amazon Bedrock](#amazon-bedrock)          | >= 1.31.57         | >= 2.9.0          |
| [Anthropic](#anthropic)                    | >= 0.28.0          | >= 2.10.0         |
| [Google Gemini](#google-gemini)            | >= 0.7.2           | >= 2.14.0         |
| [Vertex AI](#vertex-ai)                    | >= 1.71.1          | >= 2.18.0         |
| [LangGraph](#langgraph)                    | >= 0.2.23          | >= 3.5.0          |
| [Crew AI](#crew-ai)                        | >= 0.105.0         | >= 3.5.0          |
| [OpenAI Agents](#openai-agents)            | >= 0.0.2           | >= 3.5.0          |
| [LiteLLM](#litellm)                        | >= 1.70.0          | >= 3.9.0          |


Puedes habilitar mediante programación el rastreo automático de llamadas de LLM a un modelo LLM compatible como OpenAI o un marco como LangChain configurando `integrations_enabled` en `true` en la función `LLMOBs.enable()`. Además de capturar la latencia y los errores, las integraciones capturan los parámetros de entrada, los mensajes de entrada y salida y el uso de tokens (si está disponible) de cada llamada rastreada.

**Nota:** Cuando se utilizan los marcos o bibliotecas compatibles de LLM Observability, no se requiere ninguna instrumentación manual adicional (como los decoradores de función) para capturar estas llamadas. Para llamadas personalizadas o adicionales dentro de tu aplicación de LLM que no se rastrean automáticamente (como llamadas a la API, consultas a bases de datos o funciones internas), puedes usar [decoradores de función][18] para rastrear manualmente estas operaciones y capturar tramos (spans) detallados para cualquier parte de tu aplicación que no esté cubierta por la instrumentación automática.

## Activar y desactivar integraciones

Todas las integraciones están activadas por defecto.

Para desactivar todas las integraciones, utiliza la [configuración del SDK en el código][12] y especifica `integrations_enabled=False`.

Para activar sólo determinadas integraciones:
1. Utiliza la [configuración del SDK en el código][12], especificando `integrations_enabled=False`.
2. Habilita manualmente la integración con `ddtrace.patch()` en la parte superior del archivo de entrada de tu aplicación de LLM:

``python
from ddtrace import patch
from ddtrace.llmobs import LLMObs

LLMObs.enable(integrations_enabled=False, ...)
patch(openai=True, langchain=True, botocore=["bedrock-runtime"], anthropic=True, gemini=True, vertexai=True, crewai=True, openai_agents=True, langgraph=True, litellm=True)
```

## OpenAI

La integración de OpenAI proporciona un rastreo automático para los endpoints de finalización del [SDK de OpenAI Python][1] y finalización del chat a OpenAI y Azure OpenAI.

### Métodos rastreados

La integración de OpenAI instrumenta los siguientes métodos, incluidas las llamadas trasmitidas:

- [Finalizaciones][2]:
   - `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
   - `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
- [Finalizaciones del chat][3]:
   - `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
   - `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`

## LangChain

La integración de LangChain proporciona un rastreo automático para el LLM del [SDK de LangChain Python][4], el modelo de chat y las llamadas a cadenas.

### Métodos rastreados

La integración de LangChain instrumenta los siguientes métodos:

- [LLMs][13]:
  - `llm.invoke()`, `llm.ainvoke()`
  - `llm.stream()`, `llm.astream()`
- [Modelos de chat][14]
  - `chat_model.invoke()`, `chat_model.ainvoke()`
  - `chat_model.stream()`, `chat_model.astream()`
- [Cadenas/LCEL][15]
  - `chain.invoke()`, `chain.ainvoke()`
  - `chain.batch()`, `chain.abatch()`
  - `chain.stream()`, `chain.astream()`
- [Incrustaciones][17]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
- [Herramientas][24]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Recuperación][25]
  - `langchain_community.<vectorstore>.similarity_search()`
  - `langchain_pinecone.similarity_search()`

## Amazon Bedrock

La integración de Amazon Bedrock proporciona rastreo automático para las llamadas al modelo de chat del SDK de Amazon Bedrock Runtime Python (utilizando [Boto3][5]/[Botocore][6]).

### Métodos rastreados

La integración de Amazon Bedrock instrumenta los siguientes métodos:

- [Mensajes de chat][7]:
  - `InvokeModel`
- [Mensajes de chat transmitidos][8]:
  -  `InvokeModelWithResponseStream`
- [Mensajes de chat][31]:
  - `Converse` (requiere ddtrace>=3.4.0)
- [Mensajes de chat transmitidos][32]:
  - `ConverseStream` (requiere ddtrace>=3.5.0)

**Nota:** La integración Amazon Bedrock aún no admite el rastreo de llamadas de incorporación.

## Anthropic

La integración de Anthropic proporciona rastreo automático para las llamadas de mensajes de chat del [SDK de Anthropic Python][9].

### Métodos rastreados

La integración de Anthropic instrumenta los siguientes métodos:

- [Mensajes de chat][10] (incluidas las llamadas trasmitidas):
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Mensajes de chat transmitidos][11]:
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

## Google Gemini

La integración de Google Gemini proporciona un rastreo automático para las llamadas de generación de contenido del [SDK de Google AI Python][19].

### Métodos rastreados

La integración de Google Gemini instrumenta los siguientes métodos:

- [Generación de contenido][20] (incluidas las llamadas trasmitidas):
  - `model.generate_content()` (También captura `chat.send_message()`)
  - `model.generate_content_async()` (También captura `chat.send_message_async()`)

## Vertex AI

La integración de Vertex AI rastrea automáticamente la generación de contenido y las llamadas de mensajes de chat realizadas a través del [SDK DE Vertex AI Python de Google][21].

### Métodos rastreados

La integración de Vertex AI instrumenta los siguientes métodos:

- [Generación de contenido][22] (incluidas las llamadas trasmitidas):
  - `model.generate_content()`
  - `model.generate_content_async()`

- [Mensajes de chat][23] (incluidas las llamadas trasmitidas):
  - `chat.send_message()`
  - `chat.send_message_async()`

## Crew AI

La integración Crew AI rastrea automáticamente la ejecución de kickoffs Crew, incluyendo las invocaciones a tareas/Agent/herramientas, realizadas a través del [SDK Python de CrewAI][26].

### Métodos rastreados

La integración Crew AI instrumenta los siguientes métodos:

- [Kickoff Crew][27]:
  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Ejecución de tareas][28]:
  - `task.execute_sync()`
  - `task.execute_async()`

- [Ejecución del Agent][29]:
  - `agent.execute_task()`

- [Invocación de herramientas][30]:
  - `tool.invoke()`

## OpenAI Agents

La integración OpenAI Agents convierte el [rastreo incorporado][33] del [SDK de OpenAI Agents][34] en
un formato LLM Observability y lo envía al producto LLM Observability de Datadog, añadiendo un procesador de trazas (trace) de Datadog.

Se admiten las siguientes operaciones:
- [`traces`][35]
- [`agent`][36]
- [`generation`][37] utilizando la integración [OpenAI](#openai) de Datadog
- [`response`][38]
- [`guardrail`][39]
- [`handoff`][40]
- [`function`][41]
- [`custom`][42]

## LangGraph

La integración LangGraph rastrea automáticamente invocaciones `Pregel/CompiledGraph` y `RunnableSeq (node)` realizadas a través del [SDK Python LangGraph][43].

### Métodos rastreados

La integración LangGraph instrumenta versiones síncronas y asíncronas de los siguientes métodos:

- [CompiledGraph.invoke(), Pregel.invoke(), CompiledGraph.stream(), Pregel.stream()][44]
- [RunnableSeq.invoke()][45]


## LiteLLM

La integración de LiteLLM proporciona rastreo automático para el [LiteLLM Python SDK][46] y los [métodos de enrutamiento del servidor proxy][47].

### Métodos rastreados

La integración de LiteLLM instrumenta los siguientes métodos:

- [Finalizaciones del chat][48] (incluidas las llamadas retransmitidas):
  - `litellm.completion`
  - `litellm.acompletion`
- [Finalizaciones][49] (incluidas las convocatorias retransmitidas):
  - `litellm.text_completion`
  - `litellm.atext_completion`
- Finalizaciones del chat del router (incluidas las llamadas en streaming):
  - `router.Router.completion`
  - `router.Router.acompletion`
- Finalizaciones de enrutadores (incluidas las llamadas transmitidas):
  - `router.Router.text_completion`
  - `router.Router.atext_completion`


[1]: https://platform.openai.com/docs/api-reference/introduction
[2]: https://platform.openai.com/docs/api-reference/completions
[3]: https://platform.openai.com/docs/api-reference/chat
[4]: https://python.langchain.com/docs/introduction/
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[6]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[8]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[9]: https://docs.anthropic.com/en/api/client-sdks#python
[10]: https://docs.anthropic.com/en/api/messages
[11]: https://docs.anthropic.com/en/api/messages-streaming
[12]: /es/llm_observability/setup/sdk/python/#in-code-setup
[13]: https://python.langchain.com/v0.2/docs/concepts/#llms
[14]: https://python.langchain.com/docs/concepts/chat_models/
[15]: https://python.langchain.com/docs/concepts/runnables/
[16]: /es/llm_observability/setup/sdk/python
[17]: https://python.langchain.com/docs/concepts/embedding_models/
[18]: /es/llm_observability/setup/sdk/#tracing-spans
[19]: https://ai.google.dev/gemini-api/docs
[20]: https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent
[21]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest
[22]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[23]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
[24]: https://python.langchain.com/docs/concepts/tools/
[25]: https://python.langchain.com/docs/concepts/retrieval/
[26]: https://docs.crewai.com/introduction
[27]: https://docs.crewai.com/concepts/crews#kicking-off-a-crew
[28]: https://docs.crewai.com/concepts/tasks
[29]: https://docs.crewai.com/concepts/agents
[30]: https://docs.crewai.com/concepts/tools
[31]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[32]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
[33]: https://openai.github.io/openai-agents-python/tracing/
[34]: https://openai.github.io/openai-agents-python/
[35]: https://openai.github.io/openai-agents-python/ref/tracing/traces/
[36]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.agent_span
[37]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.generation_span
[38]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.response_span
[39]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.guardrail_span
[40]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.handoff_span
[41]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.function_span
[42]: https://openai.github.io/openai-agents-python/ref/tracing/#agents.tracing.custom_span
[43]: https://langchain-ai.github.io/langgraph/concepts/sdk/
[44]: https://blog.langchain.dev/langgraph/#compile
[45]: https://blog.langchain.dev/langgraph/#nodes
[46]: https://docs.litellm.ai/docs/#litellm-python-sdk
[47]: https://docs.litellm.ai/docs/routing
[48]: https://docs.litellm.ai/docs/completion
[49]: https://docs.litellm.ai/docs/text_completion

{{% /tab %}}
{{% tab "Node.js" %}}

## Información general

El [SDK de LLM Observability Node.js][4] de Datadog proporciona integraciones que rastrean automáticamente y anotan llamadas a marcos y bibliotecas de LLM. Sin cambiar tu código, puedes obtener trazas y la observabilidad de las llamadas que tu aplicación de LLM hace a los siguientes marcos:


| Marco de trabajo                               | Versiones compatibles | Versión del rastreador                              |
|-----------------------------------------|--------------------|---------------------------------------------|
| [OpenAI](#openai)                       | v3.0.0 o anterior           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [LangChain](#langchain)                 | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [Amazon Bedrock](#amazon-bedrock)       | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [VertexAI](#vertex-ai)                  | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |

Además de capturar la latencia y los errores, las integraciones capturan los parámetros de entrada, los mensajes de entrada y salida y el uso de tokens (cuando está disponible) de cada llamada rastreada.

## Activar y desactivar integraciones

Todas las integraciones están activadas por defecto.

Para desactivar todas las integraciones, utiliza la [configuración del SDK en el código][6] y especifica `plugins: false` en la configuración del rastreador general.

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

Para activar sólo determinadas integraciones:
1. Utiliza la [configuración del SDK en el código][6], especificando `plugins: false`.
2. Habilita manualmente la integración con `tracer.use()` en la parte superior del archivo de entrada de tu aplicación de LLM:

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});

const { llmobs } = tracer;
tracer.use('openai', true);
```

Además, puedes configurar las siguientes variables de entorno para tener un control más específico sobre la aplicación de parches en la biblioteca y la integración que inicia el tramo:

`DD_TRACE_DISABLED_PLUGINS`
: **Ejemplo**: `DD_TRACE_DISABLED_PLUGINS=openai,http`<br>
Una cadena separada por comas de nombres de integración desactivados automáticamente cuando se inicializa el rastreador.

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: **Ejemplo**: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`<br>
Una cadena separada por comas de nombres de biblioteca que no se parchean cuando se inicializa el rastreador.

## OpenAI

La integración de OpenAI proporciona el rastreo automático para los endpoints de finalización [del SDK de OpenAI Node.js][1], finalización del chat e incrustaciones.

### Métodos rastreados

La integración de OpenAI instrumenta los siguientes métodos, incluidas las llamadas trasmitidas:

- [Finalizaciones][2]:
  - `openai.completions.create()`
- [Finalizaciones del chat][3]:
  - `openai.chat.completions.create()`
- [Incrustaciones][5]:
  - `openai.embeddings.create()`

## LangChain

La integración LangChain proporciona un rastreo automático del LLM, del modelo de chat, de la cadena y de las llamadas de incorporación OpenAI del [SDK Node.js LangChain][9].

### Métodos rastreados

La integración de LangChain instrumenta los siguientes métodos:

- [LLM][10]:
  - `llm.invoke()`
- [Modelos de chat][11]
  - `chat_model.invoke()`
- [Cadenas] [12]
  - `chain.invoke()`
  - `chain.batch()`
- [Incorporaciones][13]
  - `embeddings.embedQuery()`
  - `embeddings.embedDocuments()`

## Amazon Bedrock

La integración Amazon Bedrock proporciona un rastreo automático de las llamadas al modelo de chat del SDK Node.js Amazon Bedrock Runtime, utilizando [BedrockRuntimeClient][20]).

### Métodos rastreados

La integración de Amazon Bedrock instrumenta los siguientes métodos:

- [Mensajes de chat][16]:
  - `InvokeModel`

## Vertex AI

La integración Vertex AI rastrea automáticamente la generación de contenido y las llamadas de mensajes de chat realizadas a través del [SDK Node.js Vertex AI de Google][17].

### Métodos rastreados

La integración de Vertex AI instrumenta los siguientes métodos:

- [Generación de contenido][18]:
  - `model.generateContent()`
  - `model.generateContentStream()`
- [Mensajes de chat][19]:
  - `chat.sendMessage()`
  - `chat.sendMessageStream()`

### Soporte de ESM

La instrumentación automática de proyectos ECMAScript Module es compatible a partir de `dd-rastrear@>=5.38.0`. Para habilitar la instrumentación automática en tus proyectos ESM, ejecuta tu aplicación con la siguiente opción de Node:

```bash
--import dd-trace/register.js
```

Para [configurar la línea de comandos][14], utiliza la siguiente opción:

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

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

## Compatibilidad con la agrupación
Para utilizar las integraciones de LLM Observability en aplicaciones empaquetadas (esbuild, Webpack, Next.js), debes excluir los módulos de esas integraciones del empaquetado.

Si estás utilizando esbuild, o para obtener información más específica sobre por qué el rastreo no funciona directamente con los agrupadores, consulta [Agrupación con el rastreador de Node.js][8].

Para la agrupación de Webpack o Next.js, especifica la integración correspondiente en la sección `externals` de la configuración de webpack:

```javascript
// next.config.js
module.exports = {
  webpack: (config) => {
    // this may be a necessary inclusion
    config.resolve.fallback = {
      ...config.resolve.fallback,
      graphql: false,
    }

    // exclude OpenAI from bundling
    config.externals.push('openai')

    return config
  }
}

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

[1]: https://platform.openai.com/docs/api-reference/introduction
[2]: https://platform.openai.com/docs/api-reference/completions
[3]: https://platform.openai.com/docs/api-reference/chat
[4]: /es/llm_observability/setup/sdk/nodejs
[5]: https://platform.openai.com/docs/api-reference/embeddings
[6]: /es/llm_observability/setup/sdk/nodejs/#in-code-setup
[7]: /es/llm_observability/setup/sdk/nodejs/#tracing-spans-using-inline-methods
[8]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling
[9]: https://js.langchain.com/docs/introduction/
[10]: https://js.langchain.com/docs/integrations/llms/
[11]: https://js.langchain.com/docs/concepts/chat_models
[12]: https://js.langchain.com/docs/how_to/sequence/
[13]: https://js.langchain.com/docs/integrations/text_embedding/
[14]: /es/llm_observability/setup/sdk/nodejs/#command-line-setup
[15]: https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime
[16]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[17]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest
[18]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-text-prompt-requests
[19]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-multiturn-chat-requests
[20]: https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}