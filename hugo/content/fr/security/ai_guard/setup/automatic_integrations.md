---
further_reading:
- link: /security/ai_guard/setup/manual_integrations/
  tag: Documentation
  text: Intégrations manuelles
- link: /security/ai_guard/setup/sdk/
  tag: Documentation
  text: SDK
title: Intégrations automatiques
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard n'est pas disponible dans le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

AI Guard peut évaluer automatiquement les appels LLM effectués via des packages de l'écosystème IA pris en charge, sans nécessiter d'appels API manuels. Lorsque votre application utilise l'un des packages pris en charge, le SDK Datadog l'instrumente pour évaluer automatiquement ces appels via AI Guard. Aucune modification de code n'est requise.

## Frameworks et bibliothèques pris en charge {#supported-frameworks-and-libraries}

{{< tabs >}}
{{% tab "Python" %}}
| Package                      | Versions prises en charge | Version du SDK |
|------------------------------|--------------------|-------------|
| [LangChain](#python)         | >= 0.1.20          | >= 3.14.0   |
| [OpenAI](#python)            | >= 1.102.0         | >= 4.10.0   |
| [Anthropic](#python)         | >= 0.28.0          | >= 4.11.0   |

{{% /tab %}}
{{% tab "Node.js" %}}
| Package                          | Versions prises en charge | Version du SDK |
|----------------------------------|--------------------|-------------|
| [AI SDK](#nodejs)                | v6                 | >= 5.95.0   |
| [OpenAI](#nodejs)                | >= 4.87.0          | >= 5.105.0  |
| [Anthropic](#nodejs)             | >= 0.14.0          | >= 6.11.0   |

{{% /tab %}}
{{% tab "Ruby" %}}
| Package                          | Versions prises en charge | Version du SDK |
|----------------------------------|--------------------|-------------|
| [RubyLLM](#ruby)                 | >= 1.0.0           | >= 2.28.0   |

{{% /tab %}}
{{< /tabs >}}

{{< partial name="security-platform/aiguard-sdk-setup.html" target="automatic" >}}

## Intégrations {#integrations}

### Python {#python}

{{< tabs >}}
{{% tab "LangChain" %}}
L'intégration LangChain applique automatiquement les évaluations AI Guard aux appels effectués via le [LangChain Python SDK][1].

#### Opérations suivies {#traced-operations}

AI Guard évalue automatiquement les opérations LangChain suivantes :

- LLMs :
  - `llm.invoke()`, `llm.ainvoke()`
- [Modèles de chat][2] :
  - `chat_model.invoke()`, `chat_model.ainvoke()`
- [Outils][3] :
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`

[1]: https://docs.langchain.com/oss/python/langchain/overview
[2]: https://docs.langchain.com/oss/python/langchain/models
[3]: https://docs.langchain.com/oss/python/langchain/tools
{{% /tab %}}
{{% tab "OpenAI" %}}
L'intégration OpenAI applique automatiquement les évaluations AI Guard aux appels effectués via le [OpenAI Python SDK][1].

#### Opérations suivies {#traced-operations-1}

AI Guard évalue automatiquement les opérations OpenAI suivantes :

- [Chat completions][2] :
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [Responses API][3] :
  - `client.responses.create()`
  - `client.responses.parse()`

[1]: https://github.com/openai/openai-python
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{% tab "Anthropic" %}}
L'intégration Anthropic applique automatiquement les évaluations AI Guard aux appels effectués via le [Anthropic Python SDK][1].

#### Opérations suivies {#traced-operations-2}

AI Guard évalue automatiquement les opérations Anthropic suivantes :

- [Messages][2] :
  - `client.messages.create()`
  - `client.messages.stream()`

Pour le package `anthropic` >= 0.37.0, AI Guard évalue également les opérations de messages bêta suivantes :

- Messages bêta :
  - `client.beta.messages.create()`
  - `client.beta.messages.stream()`

[1]: https://github.com/anthropics/anthropic-sdk-python
[2]: https://docs.anthropic.com/en/api/messages
{{% /tab %}}
{{< /tabs >}}

### Node.js {#nodejs}

{{< tabs >}}
{{% tab "AI SDK" %}}
L'intégration [AI SDK][1] applique automatiquement les évaluations AI Guard à la génération de texte et d'objets, aux embeddings et aux appels d'outils.

#### Opérations suivies {#traced-operations-3}

- [Génération de texte][2] :
  - `generateText`
  - `streamText`
- [Génération d'objets][3] :
  - `generateObject`
  - `streamObject`
- [Appels d'outils][4] :
  - `tool.execute`

[1]: https://ai-sdk.dev/docs/introduction
[2]: https://ai-sdk.dev/docs/ai-sdk-core/generating-text
[3]: https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data
[4]: https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling
{{% /tab %}}
{{% tab "OpenAI" %}}
L'intégration OpenAI applique automatiquement les évaluations AI Guard aux appels effectués via le [OpenAI Node.js SDK][1].

#### Opérations suivies {#traced-operations-4}

AI Guard évalue automatiquement les opérations OpenAI suivantes :

- [Chat completions][2] :
  - `client.chat.completions.create()`
  - `client.chat.completions.parse()`
- [Responses API][3] :
  - `client.responses.create()`

**Remarque :** Les requêtes en streaming (`stream: true`) ne sont pas évaluées par AI Guard.

[1]: https://github.com/openai/openai-node
[2]: https://platform.openai.com/docs/api-reference/chat
[3]: https://platform.openai.com/docs/api-reference/responses
{{% /tab %}}
{{< /tabs >}}

### Ruby {#ruby}

{{< tabs >}}
{{% tab "RubyLLM" %}}
L'intégration [RubyLLM][1] applique automatiquement les évaluations AI Guard aux messages de chat et aux appels d'outils.

#### Opérations suivies {#traced-operations-5}

AI Guard évalue automatiquement les opérations RubyLLM suivantes :

- [Chat][2] :
  - `RubyLLM::Chat#ask`
  - `RubyLLM::Chat#complete`
- [Appels d'outils][3] :
  - `RubyLLM::Chat#handle_tool_calls`

[1]: https://rubyllm.com/
[2]: https://rubyllm.com/chat/
[3]: https://rubyllm.com/tools/
{{% /tab %}}
{{< /tabs >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}