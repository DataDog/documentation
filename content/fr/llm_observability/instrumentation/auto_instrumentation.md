---
aliases:
- /fr/tracing/llm_observability/auto_instrumentation
- /fr/llm_observability/auto_instrumentation
- /fr/llm_observability/setup/auto_instrumentation
- /fr/llm_observability/sdk/auto_instrumentation
further_reading:
- link: /llm_observability/instrumentation/sdk/
  tag: Documentation
  text: Référence du SDK d'observabilité LLM
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos invites LLM avec l'observabilité LLM de
    Datadog
- link: https://www.datadoghq.com/blog/mcp-client-monitoring
  tag: Blog
  text: Obtenez une visibilité de bout en bout sur les clients MCP avec l'observabilité
    LLM de Datadog
title: Instrumentation automatique pour l'observabilité LLM
---
## Aperçu

L'observabilité LLM de Datadog peut automatiquement tracer et annoter les appels aux frameworks et bibliothèques LLM pris en charge via diverses [intégrations LLM](#llm-integrations). Lorsque vous [exécutez votre application LLM avec le SDK d'observabilité LLM][2], ces intégrations LLM sont activées par défaut et fournissent des traces et une observabilité prêtes à l'emploi, sans que vous ayez à modifier votre code.

<div class="alert alert-info">L'instrumentation automatique fonctionne pour les appels aux <a href="#supported-frameworks-and-libraries">frameworks et bibliothèques pris en charge</a>. Pour tracer d'autres appels (par exemple : appels API, requêtes de base de données, fonctions internes), consultez la <a href="/llm_observability/instrumentation/sdk">référence du SDK d'observabilité LLM</a> pour savoir comment ajouter une instrumentation manuelle.</div>


### Frameworks et bibliothèques pris en charge
{{< tabs >}}
{{% tab "Python" %}}
| Framework                                       | Versions prises en charge | Version du traceur |
|-------------------------------------------------|--------------------|----------------|
| [Amazon Bedrock](#amazon-bedrock)               | >= 1.31.57         | >= 2.9.0       |
| [Agents Amazon Bedrock](#amazon-bedrock-agents) | >= 1.38.26         | >= 3.10.0      |
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
| [Strands Agents](#strands-agents)               | >= 1.11.0          | Tout            |
| [Vertex AI](#vertex-ai)                         | >= 1.71.1          | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| Cadre                                  | Versions prises en charge | Version du traceur                              |
|--------------------------------------------|--------------------|---------------------------------------------|
| [Amazon Bedrock](#amazon-bedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS), >=5.71.0 (ESM)             |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercel-ai-sdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)             |
| [VertexAI](#vertex-ai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |
| [Google GenAI](#google-genai)              | >= 1.19.0          | >= 5.81.0 (CJS), >=5.81.0 (ESM)             |

{{% collapse-content title="Prise en charge des modules ESMAScript (ESM)" level="h4" expanded=false id="esm-support" %}}
L'instrumentation automatique pour les projets ESM est prise en charge à partir de `dd-trace@>=5.38.0`. Pour activer l'instrumentation automatique dans vos projets ESM, exécutez votre application avec l'option Node suivante :

```bash
--import dd-trace/register.js
```

Pour [configuration en ligne de commande](/llm_observability/instrumentation/sdk/?tab=nodejs#command-line-setup), utilisez l'option suivante à la place :

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

##### Dépannage : Chargeur personnalisé pour incompatibilité de module

S'il y a des erreurs lors du lancement de votre application en utilisant cette option, il s'agit probablement d'une incompatibilité de module. Vous pouvez créer votre propre fichier de hook en excluant le module et le fichier en question :

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

Pour utiliser ce chargeur personnalisé, exécutez votre application avec l'option Node suivante :

```bash
--import ./hook.mjs
```
{{% /collapse-content %}}

{{% collapse-content title="Support pour les applications empaquetées (esbuild, Webpack)" level="h4" expanded=false id="bundling-support" %}}
Pour utiliser les intégrations LLM Observability dans les applications empaquetées (esbuild, Webpack), vous devez exclure les modules de ces intégrations de l'empaquetage.

##### esbuild
Si vous utilisez esbuild, consultez [L'empaquetage avec le traceur Node.js](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling).

##### Webpack
Pour Webpack, spécifiez l'intégration correspondante dans la section `externals` de la configuration webpack :

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

{{% collapse-content title="Support pour Next.js" level="h4" expanded=false id="nextjs-support" %}}
Initialisez correctement le traceur dans votre application pour garantir que l'auto-instrumentation fonctionne correctement. Si vous utilisez TypeScript ou ESM pour votre application Next.js, initialisez le traceur dans un fichier `instrumentation.{ts/js}` comme suit, en spécifiant vos options de configuration en tant que variables d'environnement :

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

Sinon, pour les applications Next.js CommonJS, vous pouvez utiliser directement la fonction `init` :

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


Ensuite, assurez-vous de spécifier `dd-trace` et toutes les autres intégrations prises en charge dans `serverExternalPackages` dans votre fichier `next.config.{ts/js}` :

```javascript
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', 'openai'], // add any other supported integrations here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Java" %}}
| Cadre                                  | Versions prises en charge | Version du traceur |
|--------------------------------------------|--------------------|----------------|
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 1.59.0      |

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Datadog LLM Observability prend également en charge tout cadre qui émet nativement des spans conformes à la convention sémantique <a href="https://opentelemetry.io/docs/specs/semconv/gen-ai/">OpenTelemetry GenAI v1.37+</a>, sans nécessiter le traceur Datadog. Consultez <a href="/llm_observability/instrumentation/otel_instrumentation">Instrumentation OpenTelemetry</a> pour plus de détails.</div>

## Intégrations LLM

Les intégrations LLM de Datadog capturent la latence, les erreurs, les paramètres d'entrée, les messages d'entrée et de sortie, ainsi que l'utilisation des jetons (lorsqu'elle est disponible) pour les appels tracés.

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration Amazon Bedrock][1] fournit une instrumentation automatique pour les appels du modèle de chat du SDK Python d'Amazon Bedrock Runtime (utilisant [Boto3][2]/[Botocore][3]).

### Méthodes tracées

L'intégration Amazon Bedrock instrumente les méthodes suivantes :

- [Messages de chat][4] :
  - `InvokeModel`
- [Messages de chat en streaming][5] :
  -  `InvokeModelWithResponseStream`
- [Messages de chat][6] :
  - `Converse` (nécessite `ddtrace>=3.4.0`)
- [Messages de chat en streaming][7] :
  - `ConverseStream` (nécessite `ddtrace>=3.5.0`)

<div class="alert alert-info">L'intégration Amazon Bedrock ne prend pas en charge le traçage des appels d'intégration.</div>

[1]: /fr/integrations/amazon-bedrock
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[4]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[5]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[6]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration Amazon Bedrock][1] fournit un traçage automatique pour les appels du modèle de chat du SDK Node.js d'Amazon Bedrock Runtime (utilisant [BedrockRuntimeClient][2]).

### Méthodes tracées

L'intégration Amazon Bedrock instrumente les méthodes suivantes :

- [Messages de chat][3] :
  - `InvokeModel`

[1]: /fr/integrations/amazon-bedrock
[2]: https://www.npmjs.com/package/@aws-sdk/client-bedrock-runtime
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agents Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration des Agents Amazon Bedrock fournit un traçage automatique pour les appels d'invocation d'agent du SDK Python d'Amazon Bedrock Agents Runtime (utilisant [Boto3][1]/[Botocore][2]).

### Méthodes tracées

L'intégration des Agents Amazon Bedrock instrumente les méthodes suivantes :

- [Inviter l'agent][3] :
  - `InvokeAgent` (nécessite ddtrace>=3.10.0)

<div class="alert alert-info">L'intégration des Agents Amazon Bedrock, par défaut, ne trace que la méthode globale <code>InviterAgent</code>. Pour activer
le suivi des étapes intra-agent, vous devez définir <code>enableTrace=True</code> dans les paramètres de requête <code>InvokeAgent</code>.</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[2]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Anthropic" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration Anthropic][1] fournit un suivi automatique pour les appels de messages de chat de l'[SDK Python d'Anthropic][2].

### Méthodes tracées

L'intégration Anthropic instrumente les méthodes suivantes :

- [Messages de chat][3] (y compris les appels en streaming) :
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Messages de chat en streaming][4] :
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

[1]: /fr/integrations/anthropic
[2]: https://docs.anthropic.com/en/api/client-sdks#python
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration Anthropic][1] fournit un suivi automatique pour les appels de messages de chat de l'[SDK Node.js d'Anthropic][2].

### Méthodes tracées

L'intégration Anthropic instrumente les méthodes suivantes :

- [Messages de chat][3] (y compris les appels en streaming) :
  - `anthropic.messages.create()`
- [Messages de chat en streaming][4] :
  - `anthropic.messages.stream()`

[1]: /fr/integrations/anthropic
[2]: https://docs.claude.com/en/api/client-sdks#typescript
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="CrewAI" level="h3" expanded=false id="crewai" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration CrewAI][1] trace automatiquement l'exécution des démarrages Crew, y compris les invocations de tâches/agents/outils, effectuées via l'[SDK Python de CrewAI][2].

### Méthodes tracées

L'intégration CrewAI instrumente les méthodes suivantes :

- [Démarrage Crew][3] :
  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Exécution de tâche][4] :
  - `task.execute_sync()`
  - `task.execute_async()`

- [Exécution d'agent][5] :
  - `agent.execute_task()`

- [Invocation d'outil][6] :
  - `tool.invoke()`

[1]: /fr/integrations/crewai
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
L'intégration Google ADK fournit un suivi automatique pour les exécutions d'agents, les appels d'outils et les exécutions de code effectuées via l'[SDK Python de Google ADK][1].

### Méthodes tracées

L'intégration de l'ADK Google instrumente les méthodes suivantes :

- [Exécutions d'agent][2]
- [Appels d'outils][3]
- [Exécutions de code][4]

Les méthodes `run_live` et `run_async` sont toutes deux prises en charge.

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
L'intégration de Google GenAI trace automatiquement les méthodes dans le [SDK Python Google GenAI][1].

**Remarque :** Le [SDK Python Google GenAI][1] succède au SDK Google GenerativeAI et expose à la fois l'API développeur Gemini ainsi que Vertex.

### Méthodes tracées

L'intégration de Google GenAI instrumente les méthodes suivantes :

- [Génération de contenu][2] (y compris les appels en streaming) :
  - `models.generate_content()` (Capture également `chat.send_message()`)
  - `aio.models.generate_content()` (Capture également `aio.chat.send_message()`)
- [Intégration de contenu][3]
  -`models.embed_content()`
  -`aio.models.embed_content()`

[1]: https://ai.google.dev/gemini-api/docs
[2]: https://ai.google.dev/api/generate-content#method:-models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:-models.embedcontent
{{% /tab %}}
{{% tab "Node.js" %}}
L'intégration de Google GenAI trace automatiquement les méthodes dans le [SDK Node.js Google GenAI][1] en instrumentant le [`@google/genai` package][4].

**Remarque :** Le [SDK Node.js Google GenAI][1] succède au [SDK Google GenerativeAI][6] et expose à la fois l'API développeur Gemini ainsi que Vertex.

### Méthodes tracées

L'intégration de Google GenAI instrumente les méthodes suivantes :

- [Génération de contenu][2] (y compris [appels en streaming][5])
- [Intégration de contenu][3]

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
L'intégration [LangChain][1] fournit un traçage automatique pour le [SDK Python de LangChain][2], le modèle de chat et les appels de chaîne.

### Méthodes tracées

L'intégration LangChain instrumente les méthodes suivantes :

- [LLMs][3] :
  - `llm.invoke()`, `llm.ainvoke()`
  - `llm.stream()`, `llm.astream()`
- [Modèles de chat][4]
  - `chat_model.invoke()`, `chat_model.ainvoke()`
  - `chat_model.stream()`, `chat_model.astream()`
- [Chaînes/LCEL][5]
  - `chain.invoke()`, `chain.ainvoke()`
  - `chain.batch()`, `chain.abatch()`
  - `chain.stream()`, `chain.astream()`
- [Incorporations][6]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
- [Outils][7]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Récupération][8]
  - `langchain_community.<vectorstore>.similarity_search()`
  - `langchain_pinecone.similarity_search()`
- [Modélisation de prompt][9]
  - `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">Pour de meilleurs résultats, assignez des modèles à des variables avec des noms significatifs. L'instrumentation automatique utilise ces noms pour identifier les prompts.</div>

  ```python
  # "translation_template" will be used to identify the template in Datadog
  translation_template = PromptTemplate.from_template("Translate {text} to {language}")
  chain = translation_template | llm
  ```
[1]: /fr/integrations/langchain/
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
L'intégration [LangChain][1] fournit un traçage automatique pour le LLM, le modèle de chat, la chaîne et les appels d'embeddings de [LangChain Node.js SDK][2].

### Méthodes tracées

L'intégration LangChain instrumente les méthodes suivantes :

- [LLMs][3] :
  - `llm.invoke()`
- [Modèles de chat][4]
  - `chat_model.invoke()`
- [Chaînes][5]
  - `chain.invoke()`
  - `chain.batch()`
- [Embeddings][6]
  - `embeddings.embedQuery()`
  - `embeddings.embedDocuments()`

[1]: /fr/integrations/langchain/
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
L'intégration LangGraph trace automatiquement les invocations `Pregel/CompiledGraph` et `RunnableSeq (node)` effectuées via le [LangGraph Python SDK][1].

### Méthodes tracées

L'intégration LangGraph instrumente les versions synchrones et asynchrones des méthodes suivantes :

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
L'intégration [LiteLLM][1] fournit un traçage automatique pour le [LiteLLM Python SDK][2] et les [méthodes de routeur de serveur proxy][3].

### Méthodes tracées

L'intégration LiteLLM instrumente les méthodes suivantes :

- [Chat Completions][4] (y compris les appels en streaming) :
  - `litellm.completion`
  - `litellm.acompletion`
- [Completions][5] (y compris les appels en streaming) :
  - `litellm.text_completion`
  - `litellm.atext_completion`
- Router Chat Completions (y compris les appels en streaming) :
  - `router.Router.completion`
  - `router.Router.acompletion`
- Router Completions (y compris les appels en streaming) :
  - `router.Router.text_completion`
  - `router.Router.atext_completion`

[1]: /fr/integrations/litellm
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
L'intégration du Protocole de Contexte de Modèle (MCP) instrumente les appels d'outils client et serveur dans le SDK [MCP][1].

### Méthodes tracées

L'intégration MCP instrumente les méthodes suivantes :

- [Appels d'outils client][2] :
  - `mcp.client.session.ClientSession.call_tool`

- [Appels d'outils serveur][3] :
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
L'[intégration OpenAI][1] fournit un traçage automatique pour les points de terminaison de complétion et de complétion de chat du [SDK Python d'OpenAI][2] vers OpenAI et Azure OpenAI.

### Méthodes tracées

L'intégration OpenAI instrumente les méthodes suivantes, y compris les appels en continu :

- [Complétions][3] :
   - `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
   - `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
- [Complétions de chat][4] :
   - `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
   - `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`
- [Réponses][5] :
   - `OpenAI().responses.create()`
   - `AsyncOpenAI().responses.create()`
   - `OpenAI().responses.parse()` (à partir de `ddtrace==3.17.0`)
   - `AsyncOpenAI().responses.parse()` (à partir de `ddtrace==3.17.0`)
- [Appels effectués à DeepSeek via le SDK Python d'OpenAI][6] (à partir de `ddtrace==3.1.0`)

[1]: /fr/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://platform.openai.com/docs/api-reference/completions
[4]: https://platform.openai.com/docs/api-reference/chat
[5]: https://platform.openai.com/docs/api-reference/responses
[6]: https://api-docs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration OpenAI][1] fournit un traçage automatique pour les points de terminaison de complétion, de complétion de chat et d'embeddings du [SDK Node.js d'OpenAI][2] vers OpenAI et [Azure OpenAI][3].

### Méthodes tracées

L'intégration OpenAI instrumente les méthodes suivantes, y compris les appels en continu :

- [Complétions][4] :
  - `openai.completions.create()` et `azureopenai.completions.create()`
- [Complétions de chat][5] :
  - `openai.chat.completions.create()` et `azureopenai.chat.completions.create()`
- [Embeddings][6] :
  - `openai.embeddings.create()` et `azureopenai.embeddings.create()`
- [Appels effectués à DeepSeek via le SDK Node.js d'OpenAI][7] (à partir de `dd-trace@5.42.0`)
- [Réponses][8]
  - `openai.responses.create()` (à partir de `dd-trace@5.76.0`)

[1]: /fr/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://www.npmjs.com/package/openai#microsoft-azure-openai
[4]: https://platform.openai.com/docs/api-reference/completions
[5]: https://platform.openai.com/docs/api-reference/chat
[6]: https://platform.openai.com/docs/api-reference/embeddings
[7]: https://api-docs.deepseek.com/
[8]: https://platform.openai.com/docs/api-reference/responses

{{% /tab %}}

{{% tab "Java" %}}
L'intégration [OpenAI][1] fournit un traçage automatique pour les points de terminaison de complétion, de complétion de chat, d'incorporations et de réponses de [OpenAI Java SDK][2] vers OpenAI et Azure OpenAI.

### Méthodes tracées

L'intégration OpenAI instrumente les méthodes suivantes sur `OpenAIClient`, y compris les appels en streaming :

- [Complétions][3] :
  - `openAiClient.completions().create()`
  - `openAiClient.completions().createStreaming()`
  - `openAiClient.async().completions().create()`
  - `openAiClient.async().completions().createStreaming()`
- [Complétions de chat][4] :
  - `openAiClient.chat().completions().create()`
  - `openAiClient.chat().completions().createStreaming()`
  - `openAiClient.async().chat().completions().create()`
  - `openAiClient.async().chat().completions().createStreaming()`
- [Incorporations][5] :
  - `openAiClient.embeddings().create()`
  - `openAiClient.async().embeddings().create()`
- [Réponses][6] :
  - `openAiClient.responses().create()`
  - `openAiClient.responses().createStreaming()`
  - `openAiClient.async().responses().create()`
  - `openAiClient.async().responses().createStreaming()`

Le fournisseur (OpenAI vs Azure OpenAI) est automatiquement détecté en fonction du `baseUrl` configuré dans `ClientOptions`. Toutes les méthodes prennent en charge à la fois des variantes bloquantes et asynchrones (basées sur CompletableFuture).

[1]: /fr/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://platform.openai.com/docs/api-reference/completions
[4]: https://platform.openai.com/docs/api-reference/chat
[5]: https://platform.openai.com/docs/api-reference/embeddings
[6]: https://platform.openai.com/docs/api-reference/responses

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agents OpenAI" level="h3" expanded=false id="openai-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration des Agents OpenAI convertit le [traçage intégré][1] du [SDK des Agents OpenAI][2] en
format d'observabilité LLM et l'envoie au produit d'observabilité LLM de Datadog en ajoutant un processeur de trace Datadog.

Les opérations suivantes sont prises en charge :
- [`traces`][3]
- [`agent`][4]
- [`generation`][5] utilisant l'intégration [OpenAI](#openai) de Datadog
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
L'intégration de Pydantic AI instrumente les invocations d'agents et les appels d'outils effectués à l'aide du cadre d'agents [Pydantic AI][1].

### Méthodes tracées

L'intégration de Pydantic AI instrumente les méthodes suivantes :

- [Invocations d'agents][2] (y compris tous les outils ou ensembles d'outils associés à l'agent) :
  - `agent.Agent.iter` (trace également `agent.Agent.run` et `agent.Agent.run_sync`)
  - `agent.Agent.run_stream`

[1]: https://ai.pydantic.dev/
[2]: https://ai.pydantic.dev/agents/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agents Strands" level="h3" expanded=false id="strands-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
À partir de [v1.11.0][1], [Agents Strands][2] émet nativement des spans conformes aux conventions sémantiques [OpenTelemetry GenAI v1.37][3], que Datadog LLM Observability ingère automatiquement sans nécessiter le traceur Datadog.

Pour des instructions d'installation et un exemple complet, voir [Instrumentation OpenTelemetry — Utilisation des Agents Strands][4].

[1]: https://github.com/strands-agents/sdk-python/releases/tag/v1.11.0
[2]: https://strandsagents.com
[3]: https://opentelemetry.io/docs/specs/semconv/gen-ai/
[4]: /fr/llm_observability/instrumentation/otel_instrumentation#using-strands-agents
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vercel AI SDK" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
L'intégration du [Vercel AI SDK][1] trace automatiquement la génération de texte et d'objets, les embeddings et les appels d'outils en interceptant les spans OpenTelemetry créés par le cœur sous-jacent du [Vercel AI SDK][2] et en les convertissant en spans de Datadog LLM Observability.

### Méthodes tracées
- [Génération de texte][3] :
  - `generateText`
  - `streamText`
- [Génération d'objets][4] :
  - `generateObject`
  - `streamObject`
- [Embedding][5] :
  - `embed`
  - `embedMany`
- [Appel d'outils][6] :
  - `tool.execute`

### Télémétrie Vercel AI Core SDK

Cette intégration patch automatiquement le traceur passé dans chacune des méthodes tracées sous l'option [`experimental_telemetry`][7]. Si aucune configuration `experimental_telemetry` n'est passée, l'intégration permet tout de même d'envoyer des spans LLM Observability.

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

**Remarque** : Si `experimental_telemetry.isEnabled` est défini sur `false`, l'intégration ne l'active pas et n'envoie pas de spans à LLM Observability.

[1]: /fr/integrations/vercel-ai-sdk
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
L'intégration [Vertex AI][1] trace automatiquement la génération de contenu et les appels de messages de chat effectués via le [SDK Python Vertex AI de Google][2].

### Méthodes tracées

L'intégration de Vertex AI instrumente les méthodes suivantes :

- [Génération de contenu][3] (y compris les appels en continu) :
  - `model.generate_content()`
  - `model.generate_content_async()`

- [Messages de chat][4] (y compris les appels en continu) :
  - `chat.send_message()`
  - `chat.send_message_async()`

[1]: /fr/integrations/google-cloud-vertex-ai/
[2]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest
[3]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[4]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration de Vertex AI][1] trace automatiquement la génération de contenu et les appels de messages de chat effectués via le [SDK Node.js de Vertex AI de Google][2].

### Méthodes tracées

L'intégration de Vertex AI instrumente les méthodes suivantes :

- [Génération de contenu][3] :
  - `model.generateContent()`
  - `model.generateContentStream()`
- [Messages de chat][4] :
  - `chat.sendMessage()`
  - `chat.sendMessageStream()`

[1]: /fr/integrations/google-cloud-vertex-ai/
[2]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest
[3]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-text-prompt-requests
[4]: https://cloud.google.com/vertex-ai/generative-ai/docs/reference/nodejs/latest#send-multiturn-chat-requests
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## Activer ou désactiver les intégrations LLM

Toutes les intégrations sont **activées par défaut**.

### Désactiver toutes les intégrations LLM

{{< tabs >}}
{{% tab "Python" %}}
Utilisez le [paramétrage du SDK en code][1] et spécifiez `integrations_enabled=False`.

**Exemple** : Paramétrage du SDK en code qui désactive toutes les intégrations LLM

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)
```

[1]: /fr/llm_observability/instrumentation/sdk?tab=python#in-code-setup
{{% /tab %}}

{{% tab "Node.js" %}}
Utilisez le [paramétrage du SDK en code][1] et spécifiez `plugins: false`.

**Exemple** : Configuration SDK en code qui désactive toutes les intégrations LLM

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

[1]: /fr/llm_observability/instrumentation/sdk?tab=nodejs#in-code-setup
{{% /tab %}}
{{< /tabs >}}

### Activer uniquement des intégrations LLM spécifiques

{{< tabs >}}
{{% tab "Python" %}}
1. Utilisez la [configuration SDK en code][1] et désactivez toutes les intégrations avec `integrations_enabled=False`.
2. Activez manuellement certaines intégrations avec `ddtrace.patch()`.

**Exemple** : Configuration SDK en code qui active uniquement l'intégration LangChain

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

[1]: /fr/llm_observability/instrumentation/sdk?tab=python#in-code-setup
{{% /tab %}}

{{% tab "Node.js" %}}
1. Utilisez la [configuration SDK en code][1] et désactivez toutes les intégrations avec `plugins: false`.
2. Activez manuellement certaines intégrations avec `use()`.

**Exemple** : Configuration SDK en code qui active uniquement l'intégration LangChain

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
tracer.use('langchain', true);
```

[1]: /fr/llm_observability/instrumentation/sdk?tab=nodejs#in-code-setup
{{% /tab %}}
{{< /tabs >}}

Pour un contrôle plus spécifique sur le patching de la bibliothèque et l'intégration qui démarre la portée, vous pouvez définir les variables d'environnement suivantes :

`DD_TRACE_DISABLED_PLUGINS`
: Une chaîne de noms d'intégration séparés par des virgules qui sont automatiquement désactivés lorsque le traceur est initialisé.<br>
**Exemple** : `DD_TRACE_DISABLED_PLUGINS=openai,http`

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: Une chaîne de noms de bibliothèques séparés par des virgules qui ne sont pas patchées lorsque le traceur est initialisé.<br>
**Exemple** : `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/instrumentation/sdk
[2]: /fr/llm_observability/quickstart/