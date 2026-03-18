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

L'observabilité LLM de Datadog peut automatiquement tracer et annoter les appels aux frameworks et bibliothèques LLM pris en charge via diverses [intégrations LLM](#llmintegrations). Lorsque vous [exécutez votre application LLM avec le SDK d'observabilité LLM][2], ces intégrations LLM sont activées par défaut et fournissent des traces et une observabilité prêtes à l'emploi, sans que vous ayez à modifier votre code.

<div class="alert alert-info">Automatic instrumentation works for calls to <a href="#supported-frameworks-and-libraries">supported frameworks and libraries</a>. To trace other calls (for example: API calls, database queries, internal functions), see the <a href="/llm_observability/instrumentation/sdk">LLM Observability SDK reference</a> for how to add manual instrumentation.</div>


### Frameworks et bibliothèques pris en charge
{{< tabs >}}
{{% tab "Python" %}}
| Framework                                       | Versions prises en charge | Version du traceur |
||||
| [Amazon Bedrock](#amazonbedrock)               | >= 1.31.57         | >= 2.9.0       |
| [Agents Amazon Bedrock](#amazonbedrockagents) | >= 1.38.26         | >= 3.10.0      |
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
| [Strands Agents](#strandsagents)               | >= 1.11.0          | Any            |
| [Vertex AI](#vertexai)                         | >= 1.71.1          | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| Cadre                                      | Versions prises en charge | Version du traceur                          |
||||
| [Amazon Bedrock](#amazonbedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS), >=5.71.0 (ESM)             |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercelaisdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)             |
| [VertexAI](#vertexai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |
| [Google GenAI](#googlegenai)              | >= 1.19.0          | >= 5.81.0 (CJS), >=5.81.0 (ESM)             |

{{% collapse-content title="Prise en charge des modules ESMAScript (ESM)" level="h4" expanded=false id="esm-support" %}}
L'instrumentation automatique pour les projets ESM est prise en charge à partir de `ddtrace@>=5.38.0`. Pour activer l'instrumentation automatique dans vos projets ESM, exécutez votre application avec l'option Node suivante :

```bash
--import dd-trace/register.js
```

Pour [configuration en ligne de commande](/llm_observability/instrumentation/sdk/?tab=nodejs#commandlinesetup), utilisez l'option suivante à la place :

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

##### Dépannage : Chargeur personnalisé pour incompatibilité de module

S'il y a des erreurs lors du lancement de votre application en utilisant cette option, il s'agit probablement d'une incompatibilité de module. Vous pouvez créer votre propre fichier de hook avec le module et le fichier en question exclus :

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
Si vous utilisez esbuild, consultez [Bundling with the Node.js tracer](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling).

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
Initialisez correctement le traceur dans votre application pour garantir que l'autoinstrumentation fonctionne correctement. Si vous utilisez TypeScript ou ESM pour votre application Next.js, initialisez le traceur dans un fichier `instrumentation.{ts/js}` comme suit, en spécifiant vos options de configuration en tant que variables d'environnement :

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

Sinon, pour les applications Next.js CommonJS, vous pouvez utiliser la fonction `init` directement :

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


Ensuite, assurez-vous de spécifier `ddtrace` et toutes les autres intégrations prises en charge dans `serverExternalPackages` dans votre fichier `next.config.{ts/js}` :
```javascript
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', 'openai'], // add any other supported integrations here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Java" %}}
| Framework                                  | Versions prises en charge | Version du traceur |
||||
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 1.59.0      |

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Datadog LLM Observability also supports any framework that natively emits <a href="https://opentelemetry.io/docs/specs/semconv/gen-ai/">OpenTelemetry GenAI semantic convention v1.37+</a>-compliant spans, without requiring the Datadog tracer. See <a href="/llm_observability/instrumentation/otel_instrumentation">OpenTelemetry Instrumentation</a> for details.</div>

## Intégrations LLM

Les intégrations LLM de Datadog capturent la latence, les erreurs, les paramètres d'entrée, les messages d'entrée et de sortie, ainsi que l'utilisation des jetons (lorsque disponible) pour les appels tracés.

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration Amazon Bedrock][1] fournit une instrumentation automatique pour les appels du modèle de chat du SDK Python d'Amazon Bedrock Runtime (utilisant [Boto3][2]/[Botocore][3]).

### Méthodes tracées

L'intégration Amazon Bedrock instrumente les méthodes suivantes :

 [Messages de chat][4] :
   `InvokeModel`
 [Messages de chat en streaming][5] :
    `InvokeModelWithResponseStream`
 [Messages de chat][6] :
   `Converse` (nécessite `ddtrace>=3.4.0`)
 [Messages de chat en streaming][7] :
   `ConverseStream` (nécessite `ddtrace>=3.5.0`)

<div class="alert alert-info">The Amazon Bedrock integration does not support tracing embedding calls.</div>

[1]: /fr/integrations/amazonbedrock
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[4]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[5]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[6]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
{{% /tab %}}

{{% tab "Node.js" %}}
L'intégration [Amazon Bedrock][1] fournit un traçage automatique pour les appels de modèle de chat du SDK Node.js d'Amazon Bedrock Runtime (en utilisant [BedrockRuntimeClient][2]).

### Méthodes tracées

L'intégration Amazon Bedrock instrumente les méthodes suivantes :

 [Messages de chat][3] :
   `InvokeModel`

[1]: /fr/integrations/amazonbedrock
[2] : https://www.npmjs.com/package/@awssdk/clientbedrockruntime
[3] : https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agents Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration des Agents Amazon Bedrock fournit un traçage automatique pour les appels d'invocation d'agent du SDK Python d'Amazon Bedrock Agents Runtime (en utilisant [Boto3][1]/[Botocore][2]).

### Méthodes tracées

L'intégration des Agents Amazon Bedrock instrumente les méthodes suivantes :

 [Inviter l'agent][3] :
   `InvokeAgent` (nécessite ddtrace>=3.10.0)

<div class="alert alert-info">The Amazon Bedrock Agents integration, by default, only traces the overall <code>InvokeAgent</code> method. To enable
tracing intra-agent steps, you must set <code>enableTrace=True</code> in the <code>InvokeAgent</code> request parameters.</div>

[1] : https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[2] : https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[3] : https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agentruntime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Anthropic" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration [Anthropic][1] fournit un traçage automatique pour les appels de messages de chat du [SDK Python d'Anthropic][2].

### Méthodes tracées

L'intégration Anthropic instrumente les méthodes suivantes :

 [Messages de chat][3] (y compris les appels en streaming) :
   `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
 [Messages de chat en streaming][4] :
   `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

[1] : /integrations/anthropic
[2]: https://docs.anthropic.com/fr/api/clientsdks#python
[3]: https://docs.anthropic.com/fr/api/messages
[4]: https://docs.anthropic.com/fr/api/messagesstreaming
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration Anthropic][1] fournit un traçage automatique pour les appels de messages de chat du [SDK Node.js d'Anthropic][2].

### Méthodes tracées

L'intégration Anthropic instrumente les méthodes suivantes :

 [Messages de chat][3] (y compris les appels en streaming) :
   `anthropic.messages.create()`
 [Messages de chat en streaming][4] :
   `anthropic.messages.stream()`

[1] : /integrations/anthropic
[2]: https://docs.claude.com/fr/api/clientsdks#typescript
[3]: https://docs.anthropic.com/fr/api/messages
[4]: https://docs.anthropic.com/fr/api/messagesstreaming
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="CrewAI" level="h3" expanded=false id="crewai" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration CrewAI][1] trace automatiquement l'exécution des lancements de Crew, y compris les invocations de tâches/agents/outils, effectuées via le [SDK Python de CrewAI][2].

### Méthodes tracées

L'intégration CrewAI instrumente les méthodes suivantes :

 [Lancement de Crew][3] :
   `crew.kickoff()`
   `crew.kickoff_async()`
   `crew.kickoff_for_each()`
   `crew.kickoff_for_each_async()`

 [Exécution de Tâche][4] :
   `task.execute_sync()`
   `task.execute_async()`

 [Exécution d'Agent][5] :
   `agent.execute_task()`

 [Invocation d'outil][6] :
   `tool.invoke()`

[1] : /integrations/crewai
[2] : https://docs.crewai.com/introduction
[3] : https://docs.crewai.com/concepts/crews#kickingoffacrew
[4] : https://docs.crewai.com/concepts/tasks
[5] : https://docs.crewai.com/concepts/agents
[6] : https://docs.crewai.com/concepts/tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google ADK" level="h3" expanded=false id="google-adk" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration Google ADK fournit un traçage automatique pour les exécutions d'agents, les appels d'outils et les exécutions de code effectuées via [Google's ADK Python SDK][1].

### Méthodes tracées

L'intégration Google ADK instrumente les méthodes suivantes :

 [Exécutions d'agents][2]
 [Appels d'outils][3]
 [Exécutions de code][4]

Les méthodes `run_live` et `run_async` sont prises en charge.

[1] : https://google.github.io/adkdocs/#python
[2] : https://google.github.io/adkdocs/agents/
[3] : https://google.github.io/adkdocs/tools
[4] : https://google.github.io/adkdocs/agents/llmagents/#codeexecution
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google GenAI" level="h3" expanded=false id="google-genai" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration Google GenAI trace automatiquement les méthodes dans le [SDK Python Google GenAI][1].

**Remarque :** Le [SDK Python Google GenAI][1] succède au SDK Google GenerativeAI et expose à la fois l'API développeur Gemini et Vertex.

### Méthodes tracées

L'intégration Google GenAI instrumente les méthodes suivantes :

 [Génération de contenu][2] (y compris les appels en streaming) :
   `models.generate_content()` (Capture également `chat.send_message()` )
   `aio.models.generate_content()` (Capture également `aio.chat.send_message()` )
 [Intégration de contenu][3]
  `models.embed_content()`
  `aio.models.embed_content()`

[1]: https://ai.google.dev/geminiapi/docs
[2]: https://ai.google.dev/api/generatecontent#method:models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:models.embedcontent
{{% /tab %}}
{{% tab "Node.js" %}}
L'intégration Google GenAI trace automatiquement les méthodes dans le [SDK Node.js Google GenAI][1] en instrumentant le [`@google/genai` package][4].

**Remarque :** Le [SDK Node.js Google GenAI][1] succède au [SDK Google GenerativeAI][6] et expose à la fois l'API développeur Gemini et Vertex.

### Méthodes tracées

L'intégration Google GenAI instrumente les méthodes suivantes :

 [Génération de contenu][2] (y compris [les appels en streaming][5])
 [Intégration de contenu][3]

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
L'[intégration LangChain][1] fournit un traçage automatique pour le [SDK Python de LangChain][2], le modèle de chat et les appels de chaîne.

### Méthodes tracées

L'intégration LangChain instrumente les méthodes suivantes :

 [LLMs][3] :
   `llm.invoke()`, `llm.ainvoke()`
   `llm.stream()`, `llm.astream()`
 [Modèles de chat][4]
   `chat_model.invoke()`, `chat_model.ainvoke()`
   `chat_model.stream()`, `chat_model.astream()`
 [Chaînes/LCEL][5]
   `chain.invoke()`, `chain.ainvoke()`
   `chain.batch()`, `chain.abatch()`
   `chain.stream()`, `chain.astream()`
 [Incorporations][6]
   OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
 [Outils][7]
   `BaseTool.invoke()`, `BaseTool.ainvoke()`
 [Récupération][8]
   `langchain_community.<vectorstore>.recherche_de_similarité()`
   `langchain_pinecone.recherche_de_similarité()`
 [Modélisation de Prompt][9]
   `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">For best results, assign templates to variables with meaningful names. Automatic instrumentation uses these names to identify prompts.</div>

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
[9]: https://docs.langchain.com/langsmith/managepromptsprogrammatically#pullaprompt
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration LangChain][1] fournit un traçage automatique pour les appels LLM, modèle de chat, chaîne et embeddings OpenAI du [SDK LangChain Node.js][2].

### Méthodes tracées

L'intégration LangChain instrumente les méthodes suivantes :

 [LLMs][3] :
   `llm.invoke()`
 [Modèles de chat][4]
   `chat_model.invoke()`
 [Chaînes][5]
   `chain.invoke()`
   `chain.batch()`
 [Incorporations][6]
   `embeddings.embedQuery()`
   `embeddings.embedDocuments()`

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
L'intégration LangGraph trace automatiquement les invocations de `Pregel/CompiledGraph` et `RunnableSeq (node)` effectuées via le [LangGraph Python SDK][1].

### Méthodes tracées

L'intégration LangGraph instrumente les versions synchrones et asynchrones des méthodes suivantes :

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
L'[intégration LiteLLM][1] fournit un traçage automatique pour le [LiteLLM Python SDK][2] et les [méthodes de routeur de serveur proxy][3].

### Méthodes tracées

L'intégration LiteLLM instrumente les méthodes suivantes :

 [Chat Completions][4] (y compris les appels en streaming) :
   `litellm.completion`
   `litellm.acompletion`
 [Complétions][5] (y compris les appels en streaming) :
   `litellm.text_completion`
   `litellm.atext_completion`
 Router les complétions de chat (y compris les appels en streaming) :
   `router.Router.completion`
   `router.Router.acompletion`
 Router les complétions (y compris les appels en streaming) :
   `router.Router.text_completion`
   `router.Router.atext_completion`

[1] : /integrations/litellm
[2] : https://docs.litellm.ai/docs/#litellmpythonsdk
[3] : https://docs.litellm.ai/docs/routing
[4] : https://docs.litellm.ai/docs/completion
[5] : https://docs.litellm.ai/docs/text_completion
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="MCP" level="h3" expanded=false id="mcp" %}}
{{< tabs >}}
{{% tab "Python" %}}
Le protocole de contexte de modèle (MCP) intègre les appels d'outils client et serveur dans le SDK [MCP][1].

### Méthodes tracées

L'intégration MCP instrumente les méthodes suivantes :

 [Appels d'outils client][2] :
   `mcp.client.session.ClientSession.call_tool`

 [Appels d'outils serveur][3] :
   `mcp.server.fastmcp.tools.tool_manager.ToolManager.call_tool`

[1] : https://modelcontextprotocol.io/docs/gettingstarted/intro
[2] : https://github.com/modelcontextprotocol/pythonsdk?tab=readmeovfile#writingmcpclients
[3] : https://github.com/modelcontextprotocol/pythonsdk?tab=readmeovfile#tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI, Azure OpenAI" level="h3" expanded=false id="openai" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration OpenAI][1] fournit un traçage automatique pour les points de terminaison de [OpenAI Python SDK][2] pour les complétions et les complétions de chat vers OpenAI et Azure OpenAI.

### Méthodes tracées

L'intégration OpenAI instrumente les méthodes suivantes, y compris les appels en continu :

 [Complétions][3] :
    `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
    `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
 [Complétions de chat][4] :
    `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
    `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`
 [Réponses][5] :
    `OpenAI().responses.create()`
    `AsyncOpenAI().responses.create()`
    `OpenAI().responses.parse()` (à partir de `ddtrace==3.17.0`)
    `AsyncOpenAI().responses.parse()` (à partir de `ddtrace==3.17.0`)
  [Appels effectués à DeepSeek via le SDK Python OpenAI][6] (à partir de `ddtrace==3.1.0`)

[1]: /fr/integrations/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://platform.openai.com/docs/apireference/completions
[4]: https://platform.openai.com/docs/apireference/chat
[5]: https://platform.openai.com/docs/apireference/responses
[6]: https://apidocs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration OpenAI][1] fournit un traçage automatique pour les points de terminaison de complétion, de complétion de chat et d'incorporations du [SDK OpenAI Node.js][2] vers OpenAI et [Azure OpenAI][3].

### Méthodes tracées

L'intégration OpenAI instrumente les méthodes suivantes, y compris les appels en continu :

 [Complétions][4] :
   `openai.completions.create()` et `azureopenai.completions.create()`
 [Complétions de chat][5] :
   `openai.chat.completions.create()` et `azureopenai.chat.completions.create()`
 [Incorporations][6] :
   `openai.embeddings.create()` et `azureopenai.embeddings.create()`
 [Appels effectués à DeepSeek via le SDK OpenAI Node.js][7] (à partir de `ddtrace@5.42.0`)
 [Réponses][8]
   `openai.responses.create()` (à partir de `ddtrace@5.76.0`)

[1]: /fr/integrations/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://www.npmjs.com/package/openai#microsoftazureopenai
[4]: https://platform.openai.com/docs/apireference/completions
[5]: https://platform.openai.com/docs/apireference/chat
[6]: https://platform.openai.com/docs/apireference/embeddings
[7]: https://apidocs.deepseek.com/
[8]: https://platform.openai.com/docs/apireference/responses

{{% /tab %}}

{{% tab "Java" %}}
L'[intégration OpenAI][1] fournit un traçage automatique pour les points de terminaison de complétion, de complétion de chat, d'incorporations et de réponses du [SDK Java OpenAI][2] vers OpenAI et Azure OpenAI.

### Méthodes tracées

L'intégration OpenAI instrumente les méthodes suivantes sur `OpenAIClient`, y compris les appels en streaming :

 [Complétions][3] :
   `openAiClient.completions().create()`
   `openAiClient.completions().createStreaming()`
   `openAiClient.async().completions().create()`
   `openAiClient.async().completions().createStreaming()`
 [Complétions de chat][4] :
   `openAiClient.chat().completions().create()`
   `openAiClient.chat().completions().createStreaming()`
   `openAiClient.async().chat().completions().create()`
   `openAiClient.async().chat().completions().createStreaming()`
 [Incorporations][5] :
   `openAiClient.embeddings().create()`
   `openAiClient.async().embeddings().create()`
 [Réponses][6] :
   `openAiClient.responses().create()`
   `openAiClient.responses().createStreaming()`
   `openAiClient.async().responses().create()`
   `openAiClient.async().responses().createStreaming()`

Le fournisseur (OpenAI vs Azure OpenAI) est automatiquement détecté en fonction de l'`baseUrl` configuré dans `ClientOptions`. Toutes les méthodes prennent en charge à la fois des variantes bloquantes et asynchrones (basées sur CompletableFuture).

[1]: /fr/integrations/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://platform.openai.com/docs/apireference/completions
[4]: https://platform.openai.com/docs/apireference/chat
[5]: https://platform.openai.com/docs/apireference/embeddings
[6]: https://platform.openai.com/docs/apireference/responses

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agents OpenAI" level="h3" expanded=false id="openai-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration des Agents OpenAI convertit le [tracé intégré][1] du [SDK des Agents OpenAI][2] en
format d'observabilité LLM et l'envoie au produit d'observabilité LLM de Datadog en ajoutant un processeur de trace Datadog.

Les opérations suivantes sont prises en charge :
 [`traces`][3]
 [`agent`][4]
 [`generation`][5] utilisant l'intégration [OpenAI](#openai) de Datadog
 [`response`][6]
 [`guardrail`][7]
 [`handoff`][8]
 [`function`][9]
 [`custom`][10]

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

{{% collapse-content title="Pydantic AI" level="h3" expanded=false id="pydantic-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration Pydantic AI instrumente les invocations d'agents et les appels d'outils effectués à l'aide du cadre d'agents [Pydantic AI][1].

### Méthodes tracées

L'intégration Pydantic AI instrumente les méthodes suivantes :

 [Invocations d'agents][2] (y compris tous les outils ou ensembles d'outils associés à l'agent) :
   `agent.Agent.iter` (trace également `agent.Agent.run` et `agent.Agent.run_sync`)
   `agent.Agent.run_stream`

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

[1]: https://github.com/strandsagents/sdkpython/releases/tag/v1.11.0
[2]: https://strandsagents.com
[3]: https://opentelemetry.io/docs/specs/semconv/genai/
[4]: /fr/llm_observability/instrumentation/otel_instrumentation#usingstrandsagents
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vercel AI SDK" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
L'intégration du [Vercel AI SDK][1] trace automatiquement la génération de texte et d'objets, les embeddings et les appels d'outils en interceptant les spans OpenTelemetry créés par le cœur sous-jacent du [Vercel AI SDK][2] et en les convertissant en spans de Datadog LLM Observability.

### Méthodes tracées
 [Génération de texte][3] :
   `generateText`
   `streamText`
 [Génération d'objet][4] :
   `generateObject`
   `streamObject`
 [Embedding][5] :
   `embed`
   `embedMany`
 [Appel d'outil][6] :
   `tool.execute`

### Télémétrie du Vercel AI Core SDK

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

[1]: /fr/integrations/vercelaisdk
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
L'[intégration Vertex AI][1] trace automatiquement la génération de contenu et les appels de messages de chat effectués via le [SDK Python de Vertex AI de Google][2].

### Méthodes tracées

L'intégration Vertex AI instrumente les méthodes suivantes :

 [Générer du contenu][3] (y compris les appels en streaming) :
   `model.generate_content()`
   `model.generate_content_async()`

 [Messages de chat][4] (y compris les appels en streaming) :
   `chat.send_message()`
   `chat.send_message_async()`

[1]: /fr/integrations/googlecloudvertexai/
[2]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest
[3]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[4]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration Vertex AI][1] trace automatiquement la génération de contenu et les appels de messages de chat effectués via le [SDK Node.js de Vertex AI de Google][2].

### Méthodes tracées

L'intégration Vertex AI instrumente les méthodes suivantes :

 [Générer du contenu][3]:
   `model.generateContent()`
   `model.generateContentStream()`
 [Messages de chat][4] :
   `chat.sendMessage()`
   `chat.sendMessageStream()`

[1]: /fr/integrations/googlecloudvertexai/
[2] : https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest
[3] : https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest#sendtextpromptrequests
[4] : https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest#sendmultiturnchatrequests
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## Activer ou désactiver les intégrations LLM

Toutes les intégrations sont **activées par défaut**.

### Désactiver toutes les intégrations LLM

{{< tabs >}}
{{% tab "Python" %}}
Utilisez la [configuration du SDK incode][1] et spécifiez `integrations_enabled=False`.

**Exemple** : Configuration du SDK incode qui désactive toutes les intégrations LLM

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)
```

[1] : /llm_observability/instrumentation/sdk?tab=python#incodesetup
{{% /tab %}}

{{% tab "Node.js" %}}
Utilisez la [configuration du SDK incode][1] et spécifiez `plugins: false`.

**Exemple** : Configuration du SDK incode qui désactive toutes les intégrations LLM

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

[1] : /llm_observability/instrumentation/sdk?tab=nodejs#incodesetup
{{% /tab %}}
{{< /tabs >}}

### Activer uniquement des intégrations LLM spécifiques

{{< tabs >}}
{{% tab "Python" %}}
1. Utilisez la [configuration du SDK incode][1] et désactivez toutes les intégrations avec `integrations_enabled=False`.
2. Activez manuellement certaines intégrations avec `ddtrace.patch()`.

**Exemple** : Configuration du SDK incode qui active uniquement l'intégration LangChain

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

[1] : /llm_observability/instrumentation/sdk?tab=python#incodesetup
{{% /tab %}}

{{% tab "Node.js" %}}
1. Utilisez la [configuration du SDK Incode][1] et désactivez toutes les intégrations avec `plugins: false`.
2. Activez manuellement certaines intégrations avec `use()`.

**Exemple** : Configuration du SDK Incode qui n'active que l'intégration LangChain

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
tracer.use('langchain', true);
```

[1]: /fr/llm_observability/instrumentation/sdk?tab=nodejs#incodesetup
{{% /tab %}}
{{< /tabs >}}

Pour un contrôle plus spécifique sur le patching de la bibliothèque et l'intégration qui démarre le span, vous pouvez définir les variables d'environnement suivantes :

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