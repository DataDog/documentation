---
aliases:
- /fr/tracing/llm_observability/auto_instrumentation
- /fr/llm_observability/auto_instrumentation
- /fr/llm_observability/setup/auto_instrumentation
- /fr/llm_observability/sdk/auto_instrumentation
further_reading:
- link: /llm_observability/instrumentation/sdk/
  tag: Documentation
  text: Guide de référence du SDK d'observabilité LLM
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Suivez, comparez et optimisez vos invites LLM grâce à Datadog LLM Observability
- link: https://www.datadoghq.com/blog/mcp-client-monitoring
  tag: Blog
  text: Bénéficiez d'une visibilité de bout en bout sur les clients MCP grâce à Datadog
    LLM Observability
title: Instrumentation automatique pour l'observabilité des modèles de langage de
  grande envergure
---
## Aperçu

La fonctionnalité « LLM Observability » de Datadog permet de tracer et d'annoter automatiquement les appels vers les frameworks et bibliothèques LLM pris en charge grâce à diverses intégrations[ ](#llm-integrations)LLM. Lorsque vous [exécutez votre application LLM à l'aide du SDK LLM Observability][2], ces intégrations LLM sont activées par défaut et offrent des traces et une observabilité prêtes à l'emploi, sans que vous ayez à modifier votre code.

<div class="alert alert-info">L'instrumentation automatique fonctionne pour les appels vers les frameworks et <a href="#supported-frameworks-and-libraries">bibliothèques pris en</a> charge. Pour suivre d'autres appels (par exemple : appels API, requêtes de base de données, fonctions internes), consultez la <a href="/llm_observability/instrumentation/sdk">documentation du SDK LLM </a>Observability pour savoir comment ajouter une instrumentation manuelle.</div>


### Frameworks et bibliothèques pris en charge
{{< tabs >}}
{{% tab "Python" %}}
| CadreVersions prises |  en  |
|-------------------------------------------------|--------------------|----------------|
| [chargeVersion                                        | de TracerAmazon Bedrock](#amazon-bedrock)               | >= 1.31.57         | >= 2.9.       |
| [0Amazon Bedrock Agents](#amazon-bedrock-agents) | >= 1.38.26         | >= 3.10.      |
| [0Anthropic](#anthropic)                         | >= 0.28.0          | >= 2.10.      |
| [0CrewAI](#crewai)                               | >= 0.105.0         | >= 3.5.0Google       |
| [ ADK](#google-adk)                       | >= 1.0.0           | >= 3.15.0Google      |
| [ GenAI](#google-genai)                   | >= 1.21.1          | >= 3.11.      |
| [0LangChain](#langchain)                         | >= 0.0.192         | >= 2.9.       |
| [0LangGraph](#langgraph)                         | >= 0.2.23          | >= 3.10.      |
| [1LiteLLM](#litellm)                             | >= 1.70.0          | >= 3.9.       |
| [0MCP](#mcp)                                     | >= 1.10.0          | >= 3.11.      |
| [0OpenAI](#openai), [Azure OpenAI ](#openai)      | >= 0.26.5           | >= 2.9.       |
| [0 OpenAI Agents ](#openai-agents)                 | >= 0.0.2            | >= 3.5.       |
| [0 Pydantic AI ](#pydantic-ai)                     | >= 0.3.0            | >= 3.11.      |
| [0 Strands Agents ](#strands-agents)               | >= 1.11.            |
| [          | 0 AnyVertex AI ](#vertex-ai)                         | >= 1.71.1           | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| CadreVersions prises |  en                                   | chargeVersion de                               |
|--------------------------------------------|--------------------|---------------------------------------------|
| [TracerAmazon Bedrock](#amazon-bedrock)          | >= 3.422.0         | >= 5.35.0 (CJS), >=5.35.0 (ESM)              |
| [Anthropic ](#anthropic)                    | >= 0.14.0           | >= 5.71.0 (CJS), >= 5.71.0 (ESM)              |
| [LangChain ](#langchain)                    | >= 0.1.0            | >= 5.32.0 (CJS), >= 5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0, >= 5.25.0 (CJS), >= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercel-ai-sdk)            | >=4.0.0            | >= 5.63.0 (CJS), >=5.63.0 (ESM)              |
| [VertexAI ](#vertex-ai)                     | >= 1.0.0            | >= 5.44.0 (CJS), >= 5.44.0 (ESM)              |
| [Google GenAI ](#google-genai)              | >= 1.19.0           | >= 5.81.0 (CJS), >= 5.81.0 (ESM)             |

{{% collapse-content title="Prise en charge des modules ECMAScript (ESM)" level="h4" expanded=false id="esm-support" %}}
L'automatisation de l'instrumentation pour les projets ESM est prise en charge à partir de `dd-trace@>=5.38.0`. Pour activer l'instrumentation automatique dans vos projets ESM, exécutez votre application avec l'option Node suivante :

```bash
--import dd-trace/register.js
```

Pour la configuration[ en ligne de](/llm_observability/instrumentation/sdk/?tab=nodejs#command-line-setup) commande, utilisez plutôt l'option suivante :

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

##### Dépannage : incompatibilité entre le chargeur personnalisé et le module

Si des erreurs surviennent lors du lancement de votre application lorsque vous utilisez cette option, il s'agit probablement d'une incompatibilité entre modules. Vous pouvez créer votre propre fichier de hook en excluant le module et le fichier en question :

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

{{% collapse-content title="Prise en charge des applications intégrées (esbuild, Webpack)" level="h4" expanded=false id="bundling-support" %}}
Pour utiliser les intégrations LLM Observability dans des applications regroupées (esbuild, Webpack), vous devez exclure les modules de ces intégrations du fichier bundling.

##### esbuild
Si vous utilisez esbuild, consultez la section[ « Intégration avec le traceur ](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling)Node.js » de Webpack

##### .
Pour Webpack, indiquez l'intégration correspondante dans la`externals`section de la configuration Webpack :

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

{{% collapse-content title="Prise en charge de Next.js" level="h4" expanded=false id="nextjs-support" %}}
Veillez à initialiser correctement le traceur dans votre application afin de garantir le bon fonctionnement de l'instrumentation automatique. Si vous utilisez TypeScript ou ESM pour votre application Next.js, initialisez le traceur dans un`instrumentation.{ts/js}`fichier comme suit, en spécifiant vos options de configuration sous forme de variables d'environnement :

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

Sinon, pour les applications CommonJS Next.js, vous pouvez utiliser la`init`fonction directement :

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


Veillez ensuite à indiquer`dd-trace`  et toute autre intégration prise en charge dans`serverExternalPackages`  votre`next.config.{ts/js}`fichier :
```javascript
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', 'openai'], // add any other supported integrations here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Java" %}}
| CadreVersions                                   | prises en  | chargeVersion de  |
|--------------------------------------------|--------------------|----------------|
| [TracerOpenAI](#openai), [Azure OpenAI ](#openai) | >= 3.0.0            | >= 1.59.0      |

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Datadog LLM Observability prend également en charge tout framework qui génère nativement des spans conformes<a href="https://opentelemetry.io/docs/specs/semconv/gen-ai/"> à la convention sémantique</a> OpenTelemetry GenAI v1.37 ou supérieure, sans nécessiter le tracer Datadog. Pour plus de détails, consultez la</a> section « <a href="/llm_observability/instrumentation/otel_instrumentation">Instrumentation OpenTelemetry ».</div>

## Intégrations LLM

Les intégrations LLM de Datadog enregistrent la latence, les erreurs, les paramètres d'entrée, les messages d'entrée et de sortie, ainsi que l'utilisation des jetons (le cas échéant) pour les appels tracés.

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration Amazon Bedrock][1] permet l'instrumentation automatique des appels au modèle de chat du SDK Python pour Amazon Bedrock Runtime (à l'aide de [Boto3][2]/[Botocore][3]).Méthodes

###  tracées

L'intégration Amazon Bedrock prend en charge les méthodes suivantes : 

- [Messages de chat][4] : 
  - `InvokeModel`
- [Messages de chat en flux continu][5] : 
  -  `InvokeModelWithResponseStream`
- [Messages de chat][6] :
  - `Converse` (nécessite `ddtrace>=3.4.0`) 
- [Messages de chat en flux continu][7] :
  - `ConverseStream` (nécessite `ddtrace>=3.5.0`)

<div class="alert alert-info">L'intégration Amazon Bedrock ne prend pas en charge le suivi des appels d'intégration.</div>

[1]: /fr/integrations/amazon-bedrock
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[4]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[5]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[6]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration Amazon Bedrock][1] permet le traçage automatique des appels au modèle de chat du SDK Node.js d'Amazon Bedrock Runtime (à l'aide de [BedrockRuntimeClient][2]). Méthodes

###  tracées

L'intégration Amazon Bedrock prend en charge les méthodes suivantes : 

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
L'intégration Amazon Bedrock Agents permet le traçage automatique des appels d'agent du SDK Python pour le runtime Amazon Bedrock Agents (à l'aide de [Boto3][1]/[Botocore][2]). Méthodes

###  tracées

L'intégration Amazon Bedrock Agents prend en charge les méthodes suivantes : 

- [Invoke Agent][3] :
  - `InvokeAgent` (nécessite ddtrace >= 3.10.0)

<div class="alert alert-info">Par défaut, l'intégration Amazon Bedrock Agents ne trace que la méthode </code>InvokeAgent<code> dans son ensemble. Pour activer
Pour suivre les étapes au sein d'un agent, vous devez définir <code>enableTrace=True</code> dans les paramètres de<code> la requête</code> InvokeAgent.</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[2]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Anthropique" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'[intégration Anthropic][1] permet le traçage automatique des appels de messages de chat du [SDK Python d'Anthropic][2]. Méthodes

###  tracées

L'intégration Anthropic prend en charge les méthodes suivantes : 

- [Messages de chat][3] (y compris les appels diffusés en continu) :
  - `Anthropic().messages.create()`, `AsyncAnthropic().messages.create()`
- [Messages de chat diffusés en continu][4] :
  - `Anthropic().messages.stream()`, `AsyncAnthropic().messages.stream()`

[1]: /fr/integrations/anthropic
[2]: https://docs.anthropic.com/en/api/client-sdks#python
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messages-streaming
{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration Anthropic][1] permet le traçage automatique des appels de messages de chat du [SDK Anthropic pour Node.js][2]. Méthodes

###  tracées

L'intégration Anthropic prend en charge les méthodes suivantes : 

- [Messages de chat][3] (y compris les appels diffusés) : 
  - `anthropic.messages.create()`
- [Messages de chat diffusés][4] :
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
L'[intégration CrewAI][1] trace automatiquement l'exécution des démarrages Crew, y compris les appels de tâches, d'agents et d'outils, effectués via le [SDK Python de CrewAI][2].Méthodes

###  tracées

L'intégration CrewAI met en œuvre les méthodes suivantes : 

- [Crew Kickoff][3] : 
  - `crew.kickoff()`
  - `crew.kickoff_async()`
  - `crew.kickoff_for_each()`
  - `crew.kickoff_for_each_async()`

- [Task Execution][4] : 
  - `task.execute_sync()`
  - `task.execute_async()`

- [Agent Execution][5] : 
  - `agent.execute_task()`

- [Tool Invocation][6] :
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
L'intégration de Google ADK permet le traçage automatique des exécutions d'agents, des appels d'outils et des exécutions de code effectuées via le [SDK Python ADK de Google][1].Méthodes

###  tracées

L'intégration de Google ADK prend en charge les méthodes suivantes : 

- [Exécutions d'agent][2]
- [Appels d'outils][3]
- [Exécutions de code][4]

Les méthodes`run_async`  et  sont`run_live` toutes deux prises en charge.

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
L'intégration de Google GenAI trace automatiquement les méthodes du [SDK Python de Google GenAI][1]. 

**Remarque :** le [SDK Python de Google GenAI][1] succède au SDK Google GenerativeAI et expose à la fois l'API Gemini Developer et les méthodes Vertex.

### Traced.

L'intégration de Google GenAI prend en charge les méthodes suivantes : 

- [Génération de contenu][2] (y compris les appels en streaming) :
  - `models.generate_content()` (Capture également`chat.send_message()` )
  - `aio.models.generate_content()` (Capture également`aio.chat.send_message()` ) 
- [Intégration de contenu][3]
  `models.embed_content()`
  `aio.models.embed_content()`

[1]: https://ai.google.dev/gemini-api/docs
[2]: https://ai.google.dev/api/generate-content#method:-models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:-models.embedcontent
{{% /tab %}}
{{% tab "Node.js" %}}
L'intégration de Google GenAI trace automatiquement les méthodes du [SDK Google GenAI pour Node.js][1] en instrumentant le [`@google/genai`package][4]. 

**Remarque :** le [SDK Google GenAI pour Node.js][1] succède au [SDK Google GenerativeAI][6] et expose à la fois l'API Gemini Developer et les méthodes Vertex.

### Traced.

L'intégration de Google GenAI prend en charge les méthodes suivantes : 

- [Génération de contenu][2] (y compris les [appels en continu][5]) 
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
L'[intégration LangChain][1] permet le traçage automatique des appels vers le LLM, le modèle de chat et la chaîne du [SDK Python LangChain][2].Méthodes

###  tracées

L'intégration LangChain met en œuvre les méthodes suivantes : 

- [LLM][3] :
  - `llm.invoke()`, `llm.ainvoke()`
  - `llm.stream()`, `llm.astream()`
- [Modèles de chat][4]
  - `chat_model.invoke()`, `chat_model.ainvoke()`
  - `chat_model.stream()`, `chat_model.astream()`
- [Chains/LCEL][5]
  - `chain.invoke()`, `chain.ainvoke()`
  - `chain.batch()`, `chain.abatch()`
  - `chain.stream()`, `chain.astream()`
- [Embeddings][6]
  - OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
- [Outils][7]
  - `BaseTool.invoke()`, `BaseTool.ainvoke()`
- [Récupération][8]
  - `langchain_community.<vectorstore>.similarity_search()`
  - `langchain_pinecone.similarity_search()`
- [Modèles de prompt][9]
  - `BasePromptTemplate.invoke()`, `BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">Pour obtenir de meilleurs résultats, attribuez les modèles à des variables portant des noms évocateurs. L'instrumentation automatique utilise ces noms pour identifier les invites.</div>

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
L'[intégration LangChain][1] permet le traçage automatique des appels vers le LLM, le modèle de chat, la chaîne et les embeddings OpenAI du [SDK LangChain pour Node.js][2]. Méthodes

###  tracées

L'intégration LangChain met en œuvre les méthodes suivantes : 

- [LLM][3] : 
  - `llm.invoke()`
- [Modèles de chat][4] 
  - `chat_model.invoke()`
- : [Chaînes][5] 
  - `chain.invoke()`
  - `chain.batch()`
- : [Représentations][6]
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
L'intégration LangGraph trace automatiquement`Pregel/CompiledGraph` les`RunnableSeq (node)`appels effectués via le [LangGraph Python SDK][1].Méthodes

###  tracées

LangGraph prend en charge les versions synchrones et asynchrones des méthodes suivantes : 

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
L'[intégration LiteLLM][1] permet le traçage automatique des méthodes du [SDK Python LiteLLM][2] et du [routeur de serveur proxy][3].Méthodes

###  tracées

L'intégration LiteLLM prend en charge les méthodes suivantes : 

- [Complétions de chat][4] (y compris les appels en continu) : 
  - `litellm.completion`
  - `litellm.acompletion`
- [Complétions][5] (y compris les appels en continu) : Complétions
  - `litellm.text_completion`
  - `litellm.atext_completion`
-  de chat du routeur (y compris les appels en continu) : 
  - `router.Router.completion`
  - `router.Router.acompletion`
- Complétions du routeur (y compris les appels en continu) :
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
Le protocole MCP (Model Context Protocol) intègre les appels aux outils client et serveur dans le SDK [MCP][1]. Méthodes

###  tracées

L'intégration MCP implémente les méthodes suivantes : 

- [Appels de l'outil client][2] : 
  - `mcp.client.session.ClientSession.call_tool`

- [Appels de l'outil serveur][3] :
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
L'[intégration OpenAI][1] permet le traçage automatique des points de terminaison de complétion et de complétion de chat du [SDK Python d'OpenAI][2] vers OpenAI et Azure OpenAI. Méthodes

###  Traced

L'intégration OpenAI prend en charge les méthodes suivantes, y compris les appels en continu : 

- [Complétions][3] :
   - `OpenAI().completions.create()`, `AzureOpenAI().completions.create()`
   - `AsyncOpenAI().completions.create()`, `AsyncAzureOpenAI().completions.create()`
- [Complétions de chat][4] :
   - `OpenAI().chat.completions.create()`, `AzureOpenAI().chat.completions.create()`
   - `AsyncOpenAI().chat.completions.create()`, `AsyncAzureOpenAI().chat.completions.create()`
- [Réponses][5] :
   - `OpenAI().responses.create()`
   - `AsyncOpenAI().responses.create()`
   - `OpenAI().responses.parse()` (à la date du `ddtrace==3.17.0`)
   - `AsyncOpenAI().responses.parse()` (à la date du `ddtrace==3.17.0`) 
-  [Appels effectués vers DeepSeek via le SDK Python d'OpenAI][6] (à la date du `ddtrace==3.1.0`)

[1]: /fr/integrations/openai/
[2]: https://platform.openai.com/docs/api-reference/introduction
[3]: https://platform.openai.com/docs/api-reference/completions
[4]: https://platform.openai.com/docs/api-reference/chat
[5]: https://platform.openai.com/docs/api-reference/responses
[6]: https://api-docs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
L'[intégration OpenAI][1] permet le traçage automatique des points de terminaison de complétion, de complétion de chat et d'embeddings du [SDK OpenAI pour Node.js][2] vers OpenAI et [Azure OpenAI][3].Méthodes

###  tracées

L'intégration OpenAI prend en charge les méthodes suivantes, y compris les appels en 
  - `openai.completions.create()`continu : 

- [Complétions][4] ; `azureopenai.completions.create()`
- [Complétions de chat][5] ; `azureopenai.chat.completions.create()`
- [Embeddings
  - `openai.chat.completions.create()`][6] ;
  - `openai.embeddings.create()` `azureopenai.embeddings.create()`
- [Appels vers DeepSeek via le SDK Node.js d'OpenAI][7] (à la date du `dd-trace@5.42.0`) 
- ; [Réponses][8]
  - `openai.responses.create()` (à la date du `dd-trace@5.76.0`)

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
L'[intégration OpenAI][1] permet le traçage automatique des points de terminaison de complétion, de complétion de chat, d'encodage et de réponses du [SDK Java OpenAI][2] vers OpenAI et Azure OpenAI. Méthodes

###  tracées

L'intégration OpenAI met à disposition les méthodes suivantes sur `OpenAIClient`, y compris les appels en continu :

- [Complétions][3]:
  - `openAiClient.completions().create()`
  - `openAiClient.completions().createStreaming()`
  - `openAiClient.async().completions().create()`
  - `openAiClient.async().completions().createStreaming()`
- [Complétions de chat][4]:
  - `openAiClient.chat().completions().create()`
  - `openAiClient.chat().completions().createStreaming()`
  - `openAiClient.async().chat().completions().create()`
  - `openAiClient.async().chat().completions().createStreaming()`
- [Embeddings][5]:
  - `openAiClient.embeddings().create()`
  - `openAiClient.async().embeddings().create()`
- [Réponses][6]:
  - `openAiClient.responses().create()`
  - `openAiClient.responses().createStreaming()`
  - `openAiClient.async().responses().create()`
  - `openAiClient.async().responses().createStreaming()`

Le fournisseur (OpenAI ou Azure OpenAI) est détecté automatiquement en fonction de la`baseUrl`configuration définie dans `ClientOptions`. Toutes les méthodes prennent en charge à la fois les variantes bloquantes et asynchrones (basées sur CompletableFuture).

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
L'intégration OpenAI Agents convertit le [suivi intégré][1] du [SDK OpenAI Agents][2] en
format LLM Observability et l'envoie au produit LLM Observability de Datadog en ajoutant un processeur de traces Datadog.

Les opérations suivantes sont prises en charge :
- [`traces`][3]
- [`agent`][4]
- [`generation`][5] grâce à l'intégration](#openai) OpenAI[ de
-  Datadog[`response`][6]
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

{{% collapse-content title="Pydantic IA" level="h3" expanded=false id="pydantic-ai" %}}
{{< tabs >}}
{{% tab "Python" %}}
L'intégration Pydantic AI gère les invocations d'agents et les appels d'outils effectués à l'aide du framework d'agents [Pydantic AI][1]. Méthodes

###  tracées

L'intégration de l'IA Pydantic prend en charge les méthodes suivantes : 

- [Appels d'agent][2] (y compris tous les outils ou ensembles d'outils associés à l'agent) :
  - `agent.Agent.iter` (ainsi que les traces`agent.Agent.run`  et `agent.Agent.run_sync`)
  - `agent.Agent.run_stream`

[1]: https://ai.pydantic.dev/
[2]: https://ai.pydantic.dev/agents/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Agents Strands" level="h3" expanded=false id="strands-agents" %}}
{{< tabs >}}
{{% tab "Python" %}}
À partir de la version [v1.11.0][1], [Strands Agents][2] génère nativement des segments conformes aux [conventions sémantiques OpenTelemetry GenAI v1.37][3], que Datadog LLM Observability ingère automatiquement sans nécessiter le traceur Datadog.

Pour obtenir des instructions de configuration et un exemple complet, consultez [Instrumentation OpenTelemetry — Utilisation des agents Strands][4].

[1]: https://github.com/strands-agents/sdk-python/releases/tag/v1.11.0
[2]: https://strandsagents.com
[3]: https://opentelemetry.io/docs/specs/semconv/gen-ai/
[4]: /fr/llm_observability/instrumentation/otel_instrumentation#using-strands-agents
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="SDK Vercel AI" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
L'intégration du [Vercel AI SDK][1] assure automatiquement le traçage de la génération de texte et d'objets, des encodages et des appels d'outils en interceptant les spans OpenTelemetry créés par le [Vercel AI SDK][2] sous-jacent et en les convertissant en spans Datadog LLM Observability.Méthodes

###  
- tracées[Génération de texte][3]:
  - `generateText`
  - `streamText`
- [Génération d'objets][4]:
  - `generateObject`
  - `streamObject`
- [Enrobage][5]:
  - `embed`
  - `embedMany`
- [Appel d'outils][6]:
  - `tool.execute`

### Télémétrie du Vercel AI Core SDK

Cette intégration applique automatiquement le traceur transmis à chacune des méthodes tracées via l'option`experimental_telemetry` [7]. Si aucune`experimental_telemetry`configuration n'est fournie, l'intégration permet tout de même d'envoyer des spans LLM Observability.

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

**Remarque **: si`experimental_telemetry.isEnabled`  est défini sur `false`, l'intégration ne l'active pas et n'envoie pas de données de surveillance à LLM Observability.

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
L'[intégration Vertex AI][1] suit automatiquement la génération de contenu et les appels de messages de chat effectués via le [SDK Python Vertex AI de Google][2].Méthodes

###  suivies

L'intégration Vertex AI prend en charge les méthodes suivantes : 

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
L'[intégration Vertex AI][1] suit automatiquement la génération de contenu et les appels de messages de chat effectués via le [SDK Vertex AI Node.js de Google][2]. Méthodes

###  suivies

L'intégration de Vertex AI prend en charge les méthodes suivantes : 

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
Utilisez la [configuration du SDK Incode][1] et indiquez `integrations_enabled=False`.

**Exemple **: configuration du SDK Incode désactivant toutes les intégrations LLM

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
Utilisez la [configuration du SDK Incode][1] et indiquez `plugins: false`.

**Exemple **: configuration du SDK Incode désactivant toutes les intégrations LLM

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

### N'activer que certaines intégrations LLM

{{< tabs >}}
{{% tab "Python" %}}
1. Utilisez la [configuration du SDK Incode][1] et désactivez toutes les intégrations avec `integrations_enabled=False`. 
2. Activez manuellement certaines intégrations avec `ddtrace.patch()`. 

**Exemple **: configuration du SDK Incode qui n'active que l'intégration LangChain

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
1. Utilisez la [configuration du SDK Incode][1] et désactivez toutes les intégrations avec `plugins: false`. 
2. Activez manuellement certaines intégrations avec `use()`. 

**Exemple **: configuration du SDK Incode qui n'active que l'intégration LangChain

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

Pour un contrôle plus précis sur l'application des correctifs aux bibliothèques et sur l'intégration qui déclenche la période d'observation, vous pouvez définir les variables d'environnement suivantes :

`DD_TRACE_DISABLED_PLUGINS`
: Une liste de noms d'intégrations, séparés par des virgules, qui sont automatiquement désactivés lors de l'initialisation du traceur. <br>
**Exemple **: `DD_TRACE_DISABLED_PLUGINS=openai,http`

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: Une liste de noms de bibliothèques, séparés par des virgules, qui ne sont pas modifiés lors de l'initialisation du traceur. <br>
**Exemple **: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`

## Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/instrumentation/sdk
[2]: /fr/llm_observability/quickstart/