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

<div class="alert alert-info">Datadog ofrece diversas funciones de inteligencia artificial (IA) y Machine Learning (ML). Las <a href="/integraciones/#cat-aiml">integraciones de IA/ML en la página de integraciones y el Marketplace de Datadog </a> son funcionalidades de toda la plataforma de Datadog. <br><br> Por ejemplo, APM ofrece una integración nativa con OpenAI para la monitorización de tu uso de OpenAI, mientras que monitorización de infraestructura ofrece una integración con NVIDIA DCGM Exporter para monitorizar cargas de trabajo de IA de computación intensiva. Estas integraciones son diferentes de la oferta de LLM Observability.</div>

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

Puedes habilitar mediante programación el rastreo automático de llamadas de LLM a un modelo LLM compatible como OpenAI o un marco como LangChain configurando `integrations_enabled` en `true` en la función `LLMOBs.enable()`. Además de capturar la latencia y los errores, las integraciones capturan los parámetros de entrada, los mensajes de entrada y salida y el uso de tokens (si está disponible) de cada llamada rastreada.

**Nota:** Cuando se utilizan los marcos o bibliotecas compatibles de LLM Observability, no se requiere ninguna instrumentación manual adicional (como los decoradores de función) para capturar estas llamadas. Para llamadas personalizadas o adicionales dentro de tu aplicación de LLM que no se rastrean automáticamente (como llamadas a la API, consultas a bases de datos o funciones internas), puedes usar [decoradores de función][18] para rastrear manualmente estas operaciones y capturar tramos (spans) detallados para cualquier parte de tu aplicación que no esté cubierta por la instrumentación automática.

## Activar y desactivar integraciones

Todas las integraciones están activadas por defecto.

Para desactivar todas las integraciones, utiliza la [configuración del SDK en el código][12] y especifica `integrations_enabled=False`.

Para activar sólo determinadas integraciones:
1. Utiliza la [configuración del SDK en el código][12], especificando `integrations_enabled=False`.
2. Habilita manualmente la integración con `ddtrace.patch()` en la parte superior del archivo de entrada de tu aplicación de LLM:

```python
from ddtrace import patch
from ddtrace.llmobs import LLMObs

LLMObs.enable(integrations_enabled=False, ...)
patch(openai=True)
patch(langchain=True)
patch(anthropic=True)
patch(gemini=True)
patch(botocore=True)
```

**Nota**: Utiliza `botocore` como nombre de la integración de [Amazon Bedrock](#amazon-bedrock) al habilitarla manualmente.

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

**Nota:** La integración de Amazon Bedrock aún no admite el rastreo de llamadas de incrustación.

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

[1]: https://platform.openai.com/docs/api-reference/introduction
[2]: https://platform.openai.com/docs/api-reference/completions
[3]: https://platform.openai.com/docs/api-reference/chat
[4]: https://python.langchain.com/v0.2/docs/introduction/
[5]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[6]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[8]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[9]: https://docs.anthropic.com/en/api/client-sdks#python
[10]: https://docs.anthropic.com/en/api/messages
[11]: https://docs.anthropic.com/en/api/messages-streaming
[12]: /es/llm_observability/setup/sdk/python/#in-code-setup
[13]: https://python.langchain.com/v0.2/docs/concepts/#llms
[14]: https://python.langchain.com/v0.2/docs/concepts/#chat-models
[15]: https://python.langchain.com/v0.2/docs/concepts/#runnable-interface
[16]: /es/llm_observability/setup/sdk/python
[17]: https://python.langchain.com/v0.2/docs/concepts/#embedding-models
[18]: /es/llm_observability/setup/sdk/#tracing-spans
[19]: https://ai.google.dev/gemini-api/docs
[20]: https://ai.google.dev/api/generate-content#method:-models.streamgeneratecontent
[21]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest
[22]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[23]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
[24]: https://python.langchain.com/v0.2/docs/concepts/#tools
[25]: https://python.langchain.com/v0.2/docs/concepts/#retrieval

{{% /tab %}}
{{% tab "Node.js" %}}

## Información general

El [SDK de LLM Observability Node.js][4] de Datadog proporciona integraciones que rastrean automáticamente y anotan llamadas a marcos y bibliotecas de LLM. Sin cambiar tu código, puedes obtener trazas y la observabilidad de las llamadas que tu aplicación de LLM hace a los siguientes marcos:


| Marco                               | Versiones compatibles | Versión del rastreador       |
|-----------------------------------------|--------------------|----------------------|
| [OpenAI](#openai) (JS común)           | v3.0.0 o anterior           | >= 4.49.0, >= 5.25.0 |

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

### Soporte de ESM

La integración de OpenAI para el rastreador de Node.js no es compatible en ESM. Para utilizar OpenAI junto con `dd-trace` en tus proyectos de ESM sin errores, crea el siguiente script:

```javascript
// register.mjs

import { register } from 'node:module';

register("import-in-the-middle/hook.mjs", import.meta.url, {
  parentURL: import.meta.url,
  data: { include: ["openai"]}, // this is the important bit here
});
```

Y empieza tu aplicación con:

```bash
DD_SITE=<YOUR_DATADOG_SITE> node --import ./register.js --require dd-trace/init script.js
```

Esto evita cualquier problema de compatibilidad con OpenAI y `dd-trace` en los proyectos de ESM.

En este caso, el rastreo no se utiliza para las llamadas de OpenAI. Para añadir este rastreo para LLM Observability, puedes instrumentar tus llamadas a OpenAI con el método [`llmobs.trace()`][7].

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... }
});

// user application code

function makeOpenAICall (input) {
  // user code
  const response = await llmobs.trace({ kind: 'llm', name: 'openai.createChatCompletion', modelName: 'gpt-4', modelProvider: 'openai' }, async () => {
    const res = await openai.chat.completions.create({ ... });
    llmobs.annotate({
      inputData: input,
      outputData: res.choices[0].message.content
    })

    return res;
  });

  // user code to do something with `response`
}
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
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}