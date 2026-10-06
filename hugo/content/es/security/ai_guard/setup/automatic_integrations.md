---
further_reading:
- link: /security/ai_guard/setup/manual_integrations/
  tag: Documentación
  text: Manual Integrations
- link: /security/ai_guard/setup/sdk/
  tag: Documentación
  text: SDK
title: Automatic Integrations
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

AI guard puede evaluar automáticamente las llamadas a LLM realizadas a través de paquetes compatibles del ecosistema de IA, sin necesidad de realizar llamadas a la API de forma manual. Cuando su aplicación utiliza uno de los paquetes compatibles, el SDK de Datadog lo instrumenta para evaluar esas llamadas a través de AI guard automáticamente. No se requieren cambios en el código.

## Marcos de trabajo y bibliotecas compatibles {#supported-frameworks-and-libraries}

{{< tabs >}}
{{% tab "Python" %}}
| Paquete                      | Versiones compatibles | Versión del SDK |
|------------------------------|--------------------|-------------|
| [LangChain](#python)         | >= 0.1.20          | >= 3.14.0   |
| [OpenAI](#python)            | >= 1.102.0         | >= 4.10.0   |
| [Anthropic](#python)         | >= 0.28.0          | >= 4.11.0   |

{{% /tab %}}
{{% tab "Node.js" %}}
| Paquete                          | Versiones compatibles | Versión del SDK |
|----------------------------------|--------------------|-------------|
| [AI SDK](#nodejs)                | v6                 | >= 5.95.0   |
| [OpenAI](#nodejs)                | >= 4.87.0          | >= 5.105.0  |
| [Anthropic](#nodejs)             | >= 0.14.0          | >= 6.11.0   |

{{% /tab %}}
{{% tab "Ruby" %}}
| Paquete                          | Versiones compatibles | Versión del SDK |
|----------------------------------|--------------------|-------------|
| [RubyLLM](#ruby)                 | >= 1.0.0           | >= 2.28.0   |

{{% /tab %}}
{{< /tabs >}}

{{< partial name="security-platform/aiguard-sdk-setup.html" target="automatic" >}}

## Integrations {#integrations}

### Python {#python}

{{< tabs >}}
{{% tab "LangChain" %}}
La integración de LangChain aplica automáticamente evaluaciones de AI Guard a las llamadas realizadas a través del [SDK de Python de LangChain][1].

#### Operaciones rastreadas {#traced-operations}

AI Guard evalúa automáticamente las siguientes operaciones de LangChain:

- LLMs:
  - `llm.invoke()`, `llm.ainvoke()`
- [Chat models][2]:
  - `chat_model.invoke()`, `chat_model.ainvoke()`
- [Tools][3]:
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`

[1]: https://docs.langchain.com/oss/python/langchain/overview
[2]: https://docs.langchain.com/oss/python/langchain/models
[3]: https://docs.langchain.com/oss/python/langchain/tools
{{% /tab %}}
{{% tab "OpenAI" %}}
La integración de OpenAI aplica automáticamente evaluaciones de AI guard a las llamadas realizadas a través del [OpenAI Python SDK][1].

#### Operaciones rastreadas {#traced-operations-1}

AI guard evalúa automáticamente las siguientes operaciones de OpenAI:

- [Chat completions][2]:
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [Responses API][3]:
  - `client.responses.create()`
  - `client.responses.parse()`

[1]: https://github.com/openai/openai-python
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{% tab "Anthropic" %}}
La integración con Anthropic aplica automáticamente evaluaciones de AI guard a las llamadas realizadas a través del [Anthropic Python SDK][1].

#### Operaciones rastreadas {#traced-operations-2}

AI guard evalúa automáticamente las siguientes operaciones de Anthropic:

- [Messages][2]:
  - `client.messages.create()`
  - `client.messages.stream()`

Para el paquete `anthropic` >= 0.37.0, AI guard también evalúa las siguientes operaciones de mensajes beta:

- Beta messages:
  - `client.beta.messages.create()`
  - `client.beta.messages.stream()`

[1]: https://github.com/anthropics/anthropic-sdk-python
[2]: https://docs.anthropic.com/en/api/messages
{{% /tab %}}
{{< /tabs >}}

### Node.js {#nodejs}

{{< tabs >}}
{{% tab "AI SDK" %}}
La integración con [AI SDK][1] aplica automáticamente evaluaciones de AI guard a la generación de texto y objetos, embeddings y llamadas a herramientas.

#### Operaciones rastreadas {#traced-operations-3}

- [Generación de texto][2]:
  - `generateText`
  - `streamText`
- [Generación de objetos][3]:
  - `generateObject`
  - `streamObject`
- [Tool calling][4]:
  - `tool.execute`

[1]: https://ai-sdk.dev/docs/introduction
[2]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[3]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[4]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
{{% /tab %}}
{{% tab "OpenAI" %}}
La integración con OpenAI aplica automáticamente evaluaciones de AI guard a las llamadas realizadas a través del [OpenAI Node.js SDK][1].

#### Operaciones rastreadas {#traced-operations-4}

AI guard evalúa automáticamente las siguientes operaciones de OpenAI:

- [Chat completions][2]:
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [Responses API][3]:
  - `client.responses.create()`

**Nota:** Las solicitudes de streaming (`stream: true`) no son evaluadas por AI guard.

[1]: https://github.com/openai/openai-node
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{< /tabs >}}

### Ruby {#ruby}

{{< tabs >}}
{{% tab "RubyLLM" %}}
La integración de [RubyLLM][1] aplica automáticamente evaluaciones de AI guard a los mensajes de chat y a las llamadas a herramientas.

#### Operaciones rastreadas {#traced-operations-5}

AI guard evalúa automáticamente las siguientes operaciones de RubyLLM:

- [Chat][2]:
  - `RubyLLM::Chat#ask`
  - `RubyLLM::Chat#complete`
- [Llamada a herramientas][3]:
  - `RubyLLM::Chat#handle_tool_calls`

[1]: https://rubyllm.com/
[2]: https://rubyllm.com/chat/
[3]: https://rubyllm.com/tools/
{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}