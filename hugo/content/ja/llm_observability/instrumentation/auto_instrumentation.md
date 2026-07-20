---
aliases:
- /ja/tracing/llm_observability/auto_instrumentation
- /ja/llm_observability/auto_instrumentation
- /ja/llm_observability/setup/auto_instrumentation
- /ja/llm_observability/sdk/auto_instrumentation
further_reading:
- link: /llm_observability/instrumentation/sdk/
  tag: Documentation
  text: LLM Observability SDK リファレンス
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: Blog
  text: Datadog LLM Observability を使用して、LLM プロンプトを追跡、比較、最適化します
- link: https://www.datadoghq.com/blog/mcp-client-monitoring
  tag: Blog
  text: Datadog LLM Observability を使用して、MCP クライアントのエンドツーエンドの可視性を取得します。
title: LLM Observability のための自動インスツルメンテーション
---
## 概要

Datadog の LLM Observability は、さまざまな [LLM インテグレーション](#llmintegrations) を通じて、サポートされている LLM フレームワークやライブラリへの呼び出しを自動的にトレースし、注釈を付けることができます。[LLM Observability SDK][2] を使用して LLM アプリケーションを実行すると、これらの LLM インテグレーションはデフォルトで有効になり、コードを変更することなく、すぐにトレースと観測可能性を提供します。

<div class="alert alert-info"> 自動インスツルメンテーションは、<a href="#supported-frameworks-and-libraries"> サポートされているフレームワークやライブラリ</a> への呼び出しに対して機能します。他の呼び出しをトレースするには (例: API 呼び出し、データベースクエリ、内部関数)、<a href="/llm_observability/instrumentation/sdk"> LLM Observability SDK リファレンス</a> を参照し、手動でインスツルメンテーションを追加する方法を確認してください。</div>


###サポートされているフレームワークとライブラリ
{{< tabs >}}
{{% tab "Python " %}}
| フレームワーク                                       | サポートされているバージョン | トレースバージョン |
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
| [Strands Agents](#strandsagents)               | >= 1.11.0          | すべて            |
| [Vertex AI](#vertexai)                         | >= 1.71.1          | >= 2.18.0      |


{{% /tab %}}
{{% tab "Node.js" %}}
| フレームワーク                                       | サポートされているバージョン | トレースバージョン |
||||
| [Amazon Bedrock](#amazonbedrock)          | >= 3.422.0         | >= 5.35.0 (CJS)、>=5.35.0 (ESM)             |
| [Anthropic](#anthropic)                    | >= 0.14.0          | >= 5.71.0 (CJS)、>=5.71.0 (ESM)             |
| [LangChain](#langchain)                    | >= 0.1.0           | >= 5.32.0 (CJS), >=5.38.0 (ESM)             |
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 4.49.0、>= 5.25.0 (CJS)、>= 5.38.0 (ESM) |
| [Vercel AI SDK](#vercelaisdk)            | >=4.0.0            | >= 5.63.0 (CJS)、>=5.63.0 (ESM)             |
| [VertexAI](#vertexai)                     | >= 1.0.0           | >= 5.44.0 (CJS), >=5.44.0 (ESM)             |
| [Google GenAI](#googlegenai)              | >= 1.19.0          | >= 5.81.0 (CJS), >=5.81.0 (ESM)             |

{{% collapse-content title="ESM (ESMAScript モジュール) へのサポート" level="h4" expanded=false id="esm-support" %}}
ESM プロジェクトの自動インスツルメンテーションは、`ddtrace@>=5.38.0` からサポートされています。ESM プロジェクトで自動インスツルメンテーションを有効にするには、次の Node オプションでアプリケーションを実行してください。

```bash
--import dd-trace/register.js
```

[commandline setup](/llm_observability/instrumentation/sdk/?tab=nodejs#commandlinesetup) には、代わりに次のオプションを使用してください。

```bash
--import dd-trace/initialize.mjs
# or
--loader dd-trace/initialize.mjs
```

#####トラブルシューティング: モジュールの互換性のためのカスタムローダー

このオプションを使用してアプリケーションを起動する際にエラーが発生した場合、モジュールの互換性の問題が考えられます。モジュールとファイルを除外した独自のフックファイルを作成できます。

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

このカスタムローダーを使用するには、次の Node オプションでアプリケーションを実行してください。

```bash
--import ./hook.mjs
```
{{% /collapse-content %}}

{{% collapse-content title="バンドルされたアプリケーション (esbuild、Webpack) をサポートしています。" level="h4" expanded=false id="bundling-support" %}}
バンドルされたアプリケーション (esbuild、Webpack) でLLM Observability インテグレーションを使用するには、これらのインテグレーションのモジュールをバンドルから除外する必要があります。

#####esbuild
esbuild を使用している場合は、[Node.js トレーサーによるバンドリング](/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling) を参照してください。

#####Webpack
Webpack の場合、webpack 設定の `externals` セクションに対応するインテグレーションを指定してください。

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

{{% collapse-content title="Next.js のサポート" level="h4" expanded=false id="nextjs-support" %}}
アプリケーション内でトレーサーを適切に初期化して、自動インスツルメンテーションが正しく機能するようにしてください。Next.js アプリケーションに TypeScript または ESM を使用している場合は、次のように `instrumentation.{ts/js}` ファイル内でトレーサーを初期化し、構成オプションを環境変数として指定してください。

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

それ以外の場合、CommonJS Next.js アプリケーションでは、`init` 関数を直接使用できます。

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


次に、`ddtrace` および `serverExternalPackages` 内の他のサポートされているインテグレーションを、`next.config.{ts/js}` ファイルで指定してください。

```javascript
// next.config.ts
module.exports = {
  serverExternalPackages: ['dd-trace', 'openai'], // add any other supported integrations here to be auto-instrumented
}
```
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Java" %}}
| フレームワーク                                  | サポートされているバージョン | トレーサーバージョン |
||||
| [OpenAI](#openai), [Azure OpenAI](#openai) | >= 3.0.0           | >= 1.59.0      |

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Datadog LLM Observability は、ネイティブに <a href="https://opentelemetry.io/docs/specs/semconv/gen-ai/">OpenTelemetry GenAI セマンティック規約 v1.37+</a> に準拠したスパンを発行する任意のフレームワークもサポートしており、Datadog トレーサーを必要としません。詳細については、<a href="/llm_observability/instrumentation/otel_instrumentation">OpenTelemetry インスツルメンテーション</a>を参照してください。</div>

##LLM インテグレーション

Datadog の LLM インテグレーションは、トレースされた呼び出しのレイテンシ、エラー、入力パラメーター、入力および出力メッセージ、トークン使用量 (利用可能な場合) をキャプチャします。

{{% collapse-content title="Amazon Bedrock" level="h3" expanded=false id="amazon-bedrock" %}}
{{< tabs >}}
{{% tab "Python " %}}
[Amazon Bedrock インテグレーション][1] は、Amazon Bedrock Runtime Python SDK のチャットモデル呼び出しに対して自動インスツルメンテーションを提供します ([Boto3][2]/[Botocore][3] を使用)。

###トレース対象メソッド

Amazon Bedrock インテグレーションは、以下のメソッドをインスツルメントします。

 [チャットメッセージ][4]:
   `InvokeModel`
 [ストリーミングされたチャットメッセージ][5]:
    `InvokeModelWithResponseStream`
 [チャットメッセージ][6]:
   `Converse` (`ddtrace>=3.4.0` が必要)
 [ストリーミングされたチャットメッセージ][7]:
   `ConverseStream` (`ddtrace>=3.5.0` が必要)

<div class="alert alert-info">Amazon Bedrock インテグレーションは、埋め込み呼び出しのトレースをサポートしていません。</div>

[1]: /ja/integrations/amazonbedrock
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[4]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
[5]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html
[6]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html
[7]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ConverseStream.html
{{% /tab %}}

{{% tab "Node.js" %}}
[Amazon Bedrock インテグレーション][1] は、Amazon Bedrock Runtime Node.js SDK のチャットモデル呼び出しに対して自動トレースを提供します ([BedrockRuntimeClient][2] を使用)。

###トレース対象メソッド

Amazon Bedrock インテグレーションは、以下のメソッドをインスツルメントします。

[チャットメッセージ][3]:
   `InvokeModel`

[1]: /ja/integrations/amazonbedrock
[2]: https://www.npmjs.com/package/@awssdk/clientbedrockruntime
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Amazon Bedrock エージェント" level="h3" expanded=false id="amazon-bedrock-agents" %}}
{{< tabs >}}
{{% tab "Python " %}}
Amazon Bedrock エージェントインテグレーションは、Amazon Bedrock エージェントランタイム Python SDK のエージェント呼び出しに対して自動トレースを提供します ([Boto3][1]/[Botocore][2] を使用)。

###トレース対象メソッド

Amazon Bedrock エージェントインテグレーションは、以下のメソッドをインスツルメントします。

 [Invoke Agent][3]:
   `InvokeAgent` (ddtrace>=3.10.0 が必要)

<div class="alert alert-info">Amazon Bedrock エージェントインテグレーションは、デフォルトでは、全体の <code>InvokeAgent</code> メソッドのみをトレースします。エージェント内の
ステップをトレースするには、<code>enableTrace=True</code> を <code>InvokeAgent</code> リクエストパラメーターに設定する必要があります。</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[2]: https://botocore.amazonaws.com/v1/documentation/api/latest/reference/services/bedrockruntime.html
[3]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agentruntime_InvokeAgent.html
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Anthropic" level="h3" expanded=false id="anthropic" %}}
{{< tabs >}}
{{% tab "Python " %}}
[Anthropic インテグレーション][1] は、[Anthropic Python SDK][2] のチャットメッセージ呼び出しに対して自動トレースを提供します。

###トレース対象メソッド

Anthropic インテグレーションは、以下のメソッドをインスツルメントします。

 [チャットメッセージ][3] (ストリーミングされた呼び出しを含む):
   `Anthropic().messages.create()`、`AsyncAnthropic().messages.create()`
 [ストリーミングされたチャットメッセージ][4]：
   `Anthropic().messages.stream()`、`AsyncAnthropic().messages.stream()`

[1]: /ja/integrations/anthropic
[2]: https://docs.anthropic.com/en/api/clientsdks#python
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messagesstreaming
{{% /tab %}}

{{% tab "Node.js" %}}
[Anthropic インテグレーション][1] は、[Anthropic Node.js SDK][2] のチャットメッセージ呼び出しの自動トレースを提供します。

###トレース対象メソッド

Anthropic インテグレーションは、以下のメソッドをインスツルメントします。

 [チャットメッセージ][3] (ストリーミングされた呼び出しを含む):
   `anthropic.messages.create()`
 [ストリーミングされたチャットメッセージ][4]：
   `anthropic.messages.stream()`

[1]: /ja/integrations/anthropic
[2]: https://docs.claude.com/en/api/clientsdks#typescript
[3]: https://docs.anthropic.com/en/api/messages
[4]: https://docs.anthropic.com/en/api/messagesstreaming
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="CrewAI" level="h3" expanded=false id="crewai" %}}
{{< tabs >}}
{{% tab "Python " %}}
[CrewAI インテグレーション][1] は、[CrewAI の Python SDK][2] を通じて行われるタスク/エージェント/ツールの呼び出しを含む Crew キックオフの実行を自動的にトレースします。

###トレース対象メソッド

CrewAI インテグレーションは、以下のメソッドをインスツルメントします。

 [Crew キックオフ][3]:
   `crew.kickoff()`
   `crew.kickoff_async()`
   `crew.kickoff_for_each()`
   `crew.kickoff_for_each_async()`

 [タスク実行][4]:
   `task.execute_sync()`
   `task.execute_async()`

 [エージェント実行][5]:
   `agent.execute_task()`

 [ツール呼び出し][6]:
   `tool.invoke()`

[1]: /ja/integrations/crewai
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
{{% tab "Python " %}}
Google ADK インテグレーションは、[Google の ADK Python SDK][1] を通じて行われるエージェントの実行、ツールの呼び出し、およびコードの実行を自動的にトレースします。

###トレース対象メソッド

Google ADK インテグレーションは、以下のメソッドをインスツルメントします。

 [Agent Runs][2]
 [Tool Calls][3]
 [コードの実行][4]

`run_live` と `run_async` の両方のメソッドがサポートされています。

[1]: https://google.github.io/adkdocs/#python
[2]: https://google.github.io/adkdocs/agents/
[3]: https://google.github.io/adkdocs/tools
[4]: https://google.github.io/adkdocs/agents/llmagents/#codeexecution
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Google GenAI" level="h3" expanded=false id="google-genai" %}}
{{< tabs >}}
{{% tab "Python " %}}
Google GenAI インテグレーションは、[Google GenAI Python SDK][1] 内のメソッドを自動的にトレースします。

**注意:** [Google GenAI Python SDK][1] は Google GenerativeAI SDK の後継であり、Gemini Developer API と Vertex の両方に対応しています。

###トレース対象メソッド

Google GenAI インテグレーションは、以下のメソッドをインスツルメントします。

 [コンテンツ生成][2] (ストリーミング呼び出しを含む):
   `models.generate_content()` (`chat.send_message()` もキャプチャ)
   `aio.models.generate_content()` (`aio.chat.send_message()` もキャプチャ)
 [コンテンツ埋め込み][3]
  `models.embed_content()`
  `aio.models.embed_content()`

[1]: https://ai.google.dev/geminiapi/docs
[2]: https://ai.google.dev/api/generatecontent#method:models.generatecontent
[3]: https://ai.google.dev/api/embeddings#method:models.embedcontent
{{% /tab %}}
{{% tab "Node.js" %}}
Google GenAI インテグレーションは、[`@google/genai` パッケージ][4] をインスツルメントすることにより、[Google GenAI Node.js SDK][1] 内のメソッドを自動的にトレースします。

**注意:** [Google GenAI Node.js SDK][1] は [Google GenerativeAI SDK][6] の後継であり、Gemini Developer API と Vertex の両方に対応しています。

###トレース対象メソッド

Google GenAI インテグレーションは、以下のメソッドをインスツルメントします。

 [コンテンツ生成][2] ([ストリーミング呼び出し][5] を含む)
 [コンテンツ埋め込み][3]

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
{{% tab "Python " %}}
[LangChain インテグレーション][1] は、[LangChain Python SDK][2] の LLM、チャットモデル、チェーン呼び出しの自動トレースを提供します。

###トレース対象メソッド

LangChain インテグレーションは、以下のメソッドをインスツルメントします。

 [LLMs][3]:
   `llm.invoke()`、`llm.ainvoke()`
   `llm.stream()`、`llm.astream()`
 [チャットモデル][4]
   `chat_model.invoke()`、`chat_model.ainvoke()`
   `chat_model.stream()`、`chat_model.astream()`
 [Chains/LCEL][5]
   `chain.invoke()`、`chain.ainvoke()`
   `chain.batch()`、`chain.abatch()`
   `chain.stream()`、`chain.astream()`
 [Embeddings][6]
   OpenAI : `OpenAIEmbeddings.embed_documents()`, `OpenAIEmbeddings.embed_query()`
 [Tools][7]
   `BaseTool.invoke()`、`BaseTool.ainvoke()`
 [Retrieval][8]
   `langchain_community.<vectorstore>.similarity_search()`
   `langchain_pinecone.similarity_search()`
 [プロンプトテンプレート][9]
   `BasePromptTemplate.invoke()`、`BasePromptTemplate.ainvoke()`

  <div class="alert alert-info">最良の結果を得るために、テンプレートに意味のある名前の変数を割り当ててください。自動インスツルメンテーションは、これらの名前を使用してプロンプトを特定します。</div>

  ```python
  # "translation_template" will be used to identify the template in Datadog
  translation_template = PromptTemplate.from_template("Translate {text} to {language}")
  chain = translation_template | llm
  ```
[1]: /ja/integrations/langchain/
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
[LangChain インテグレーション][1] は、[LangChain Node.js SDK][2] のLLM、チャットモデル、チェーン、および OpenAI 埋め込みモデルの呼び出しに対して自動トレースを提供します。

###トレース対象メソッド

LangChain インテグレーションは、以下のメソッドをインスツルメントします。

 [LLMs][3]:
   `llm.invoke()`
 [チャットモデル][4]
   `chat_model.invoke()`
 [Chains][5]
   `chain.invoke()`
   `chain.batch()`
 [Embeddings][6]
   `embeddings.embedQuery()`
   `embeddings.embedDocuments()`

[1]: /ja/integrations/langchain/
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
{{% tab "Python " %}}
LangGraph インテグレーションは、[LangGraph Python SDK][1] を通じて行われた `Pregel/CompiledGraph` および `RunnableSeq (node)` の呼び出しを自動的にトレースします。

###トレース対象メソッド

LangGraph インテグレーションは、以下のメソッドの同期および非同期バージョンをインスツルメントします。

 [CompiledGraph.invoke()、Pregel.invoke()、CompiledGraph.stream()、Pregel.stream()][2]
 [RunnableSeq.invoke()][3]

[1]: https://langchainai.github.io/langgraph/concepts/sdk/
[2]: https://blog.langchain.dev/langgraph/#compile
[3]: https://blog.langchain.dev/langgraph/#nodes
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="LiteLLM" level="h3" expanded=false id="litellm" %}}
{{< tabs >}}
{{% tab "Python " %}}
[LiteLLM インテグレーション][1] は、[LiteLLM Python SDK][2] および [プロキシサーバールーター呼び出し][3] の自動トレースを提供します。

###トレース対象メソッド

LiteLLM インテグレーションは、以下のメソッドをインスツルメントします。

 [チャット完了][4] (ストリーミング呼び出しを含む):
   `litellm.completion`
   `litellm.acompletion`
 [完了][5] (ストリーミング呼び出しを含む):
   `litellm.text_completion`
   `litellm.atext_completion`
 ルーターチャット完了 (ストリーミング呼び出しを含む):
   `router.Router.completion`
   `router.Router.acompletion`
 ルーター完了 (ストリーミング呼び出しを含む):
   `router.Router.text_completion`
   `router.Router.atext_completion`

[1]: /ja/integrations/litellm
[2]: https://docs.litellm.ai/docs/#litellmpythonsdk
[3]: https://docs.litellm.ai/docs/routing
[4]: https://docs.litellm.ai/docs/completion
[5]: https://docs.litellm.ai/docs/text_completion
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="MCP" level="h3" expanded=false id="mcp" %}}
{{< tabs >}}
{{% tab "Python " %}}
Model Context Protocol (MCP) インテグレーションは、[MCP][1] SDK におけるクライアントおよびサーバーツール呼び出しをインスツルメントします。

###トレース対象メソッド

MCP インテグレーションは、以下のメソッドをインスツルメントします。

 [クライアントツール呼び出し][2]:
   `mcp.client.session.ClientSession.call_tool`

 [サーバーツール呼び出し][3]:
   `mcp.server.fastmcp.tools.tool_manager.ToolManager.call_tool`

[1]: https://modelcontextprotocol.io/docs/gettingstarted/intro
[2]: https://github.com/modelcontextprotocol/pythonsdk?tab=readmeovfile#writingmcpclients
[3]: https://github.com/modelcontextprotocol/pythonsdk?tab=readmeovfile#tools
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI、Azure OpenAI" level="h3" expanded=false id="openai" %}}
{{< tabs >}}
{{% tab "Python " %}}
[OpenAI インテグレーション][1] は、[OpenAI Python SDK][2] の完了エンドポイントおよびチャット完了エンドポイントに対して、OpenAI および Azure OpenAI への自動トレースを提供します。

###トレース対象メソッド

OpenAI インテグレーションは、ストリーミングされた呼び出しを含め、以下のメソッドをインスツルメントします。

 [完了][3]:
    `OpenAI().completions.create()`、`AzureOpenAI().completions.create()`
    `AsyncOpenAI().completions.create()`、`AsyncAzureOpenAI().completions.create()`
 [チャット完了][4]:
    `OpenAI().chat.completions.create()`、`AzureOpenAI().chat.completions.create()`
    `AsyncOpenAI().chat.completions.create()`、`AsyncAzureOpenAI().chat.completions.create()`
 [レスポンス][5]:
    `OpenAI().responses.create()`
    `AsyncOpenAI().responses.create()`
    `OpenAI().responses.parse()` (現在のバージョン: `ddtrace==3.17.0`)
    `AsyncOpenAI().responses.parse()` (現在のバージョン: `ddtrace==3.17.0`)
  [OpenAI Python SDK を通じて DeepSeek に対して行われた呼び出し][6] (現在のバージョン: `ddtrace==3.1.0`)

[1]: /ja/integrations/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://platform.openai.com/docs/apireference/completions
[4]: https://platform.openai.com/docs/apireference/chat
[5]: https://platform.openai.com/docs/apireference/responses
[6]: https://apidocs.deepseek.com/

{{% /tab %}}

{{% tab "Node.js" %}}
[OpenAI インテグレーション][1] は、[OpenAI Node.js SDK][2] の完了エンドポイント、チャット完了エンドポイント、埋め込みエンドポイントに対して、OpenAI および [Azure OpenAI][3] への自動トレースを提供します。

###トレース対象メソッド

OpenAI インテグレーションは、ストリーミングされた呼び出しを含め、以下のメソッドをインスツルメントします。

 [完了][4]:
   `openai.completions.create()` および `azureopenai.completions.create()`
 [チャット完了][5]:
   `openai.chat.completions.create()` および `azureopenai.chat.completions.create()`
 [埋め込み][6]:
   `openai.embeddings.create()` および `azureopenai.embeddings.create()`
 [OpenAI Node.js SDK を通じて DeepSeek に行われた呼び出し][7] (現在のバージョン: `ddtrace@5.42.0`）
 [Responses][8]
   `openai.responses.create()` (現在のバージョン: `ddtrace@5.76.0`)

[1]: /ja/integrations/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://www.npmjs.com/package/openai#microsoftazureopenai
[4]: https://platform.openai.com/docs/apireference/completions
[5]: https://platform.openai.com/docs/apireference/chat
[6]: https://platform.openai.com/docs/apireference/embeddings
[7]: https://apidocs.deepseek.com/
[8]: https://platform.openai.com/docs/apireference/responses

{{% /tab %}}

{{% tab "Java" %}}
[OpenAI インテグレーション][1] は、[OpenAI Java.js SDK][2] の完了エンドポイント、チャット完了エンドポイント、埋め込みエンドポイント、応答エンドポイントに対して、OpenAI および Azure OpenAI への自動トレースを提供します。

###トレース対象メソッド

OpenAI インテグレーションは、ストリーミングされた呼び出しを含め、`OpenAIClient` 上の以下のメソッドをインスツルメントします。

 [完了][3]:
   `openAiClient.completions().create()`
   `openAiClient.completions().createStreaming()`
   `openAiClient.async().completions().create()`
   `openAiClient.async().completions().createStreaming()`
 [チャット完了][4]:
   `openAiClient.chat().completions().create()`
   `openAiClient.chat().completions().createStreaming()`
   `openAiClient.async().chat().completions().create()`
   `openAiClient.async().chat().completions().createStreaming()`
 [埋め込み][5]:
   `openAiClient.embeddings().create()`
   `openAiClient.async().embeddings().create()`
 [応答][6]:
   `openAiClient.responses().create()`
   `openAiClient.responses().createStreaming()`
   `openAiClient.async().responses().create()`
   `openAiClient.async().responses().createStreaming()`

プロバイダー (OpenAI と Azure OpenAI の区別 )は、`ClientOptions` で設定された `baseUrl` に基づいて自動的に検出されます。すべてのメソッドは、ブロッキングおよび非同期 (CompletableFuture ベース) の形式の両方をサポートしています。

[1]: /ja/integrations/openai/
[2]: https://platform.openai.com/docs/apireference/introduction
[3]: https://platform.openai.com/docs/apireference/completions
[4]: https://platform.openai.com/docs/apireference/chat
[5]: https://platform.openai.com/docs/apireference/embeddings
[6]: https://platform.openai.com/docs/apireference/responses

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="OpenAI Agent" level="h3" expanded=false id="openai-agents" %}}
{{< tabs >}}
{{% tab "Python " %}}
OpenAI Agent インテグレーションは、[組み込みトレース][1] を [OpenAI Agents SDK][2] から変換します。
LLM Observability フォーマットに変換し、Datadog の LLM Observability製品 に Datadog トレースプロセッサーを追加して送信します。

次の操作がサポートされています。
 [`traces`][3]
 [`agent`][4]
 [`generation`][5] Datadog の [OpenAI インテグレーション](#openai) を使用
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
{{% tab "Python " %}}
Pydantic AI インテグレーションは、[Pydantic AI][1] エージェントフレームワークを使用して行われるエージェント呼び出しとツール呼び出しをインスツルメントします。

###トレース対象メソッド

Pydantic AI インテグレーションは、以下のメソッドをインスツルメントします。

 [エージェント呼び出し][2] (エージェントに関連するツールやツールセットを含む):
   `agent.Agent.iter` (`agent.Agent.run` と `agent.Agent.run_sync` もトレースします)
   `agent.Agent.run_stream`

[1]: https://ai.pydantic.dev/
[2]: https://ai.pydantic.dev/agents/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Strands Agents" level="h3" expanded=false id="strands-agents" %}}
{{< tabs >}}
{{% tab "Python " %}}
[v1.11.0][1] 以降、[Strands Agents][2] は、[OpenTelemetry GenAI セマンティック規約 v1.37][3] に準拠したスパンをネイティブに発行し、Datadog LLM Observability が Datadog トレーサーを必要とせずに自動的に取り込むことができます。

セットアップ手順と完全な例については、[Strands Agent を使用した OpenTelemetry インスツルメンテーション][4] を参照してください。

[1]: https://github.com/strandsagents/sdkpython/releases/tag/v1.11.0
[2]: https://strandsagents.com
[3]: https://opentelemetry.io/docs/specs/semconv/genai/
[4]: /ja/llm_observability/instrumentation/otel_instrumentation#usingstrandsagents
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="Vercel AI SDK" level="h3" expanded=false id="vercel-ai-sdk" %}}
{{< tabs >}}
{{% tab "Node.js" %}}
[Vercel AI SDK][1] インテグレーションは、基盤となるコア [Vercel AI SDK][2] によって作成された OpenTelemetry スパンをインターセプトし、それを Datadog LLM Observability スパンに変換することによって、テキストおよびオブジェクト生成、埋め込み、ツール呼び出しを自動的にトレースします。

###トレース対象メソッド
 [テキスト生成][3]:
   `generateText`
   `streamText`
 [オブジェクト生成][4]:
   `generateObject`
   `streamObject`
 [埋め込み][5]:
   `embed`
   `embedMany`
 [ツール呼び出し][6]:
   `tool.execute`

### Vercel AI Core SDK テレメトリ

このインテグレーションは、[`experimental_telemetry`オプション][7] の下で追跡された各メソッドに渡されたトレーサーを自動的にパッチします。`experimental_telemetry` 構成が渡されない場合、インテグレーションは LLM Observability のスパンを送信できるようにそれを有効にします。

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

**注意**: `experimental_telemetry.isEnabled` が `false` に設定されている場合、インテグレーションはそれをオンにせず、LLM Observability にスパンを送信しません。

[1]: /ja/integrations/vercelaisdk
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
{{% tab "Python " %}}
[Vertex AI インテグレーション][1] は、[Google の Vertex AI Python SDK][2] を通じて行われたコンテンツ生成とチャットメッセージ呼び出しを自動的に追跡します。

###トレース対象メソッド

Vertex AI インテグレーションは、以下のメソッドをインスツルメントします。

 [コンテンツ生成][3] (ストリーミングされた呼び出しを含む)
   `model.generate_content()`
   `model.generate_content_async()`

 [チャットメッセージ][4] (ストリーミングされた呼び出しを含む):
   `chat.send_message()`
   `chat.send_message_async()`

[1]: /ja/integrations/googlecloudvertexai/
[2]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest
[3]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest/summary_method#vertexai_preview_generative_models_GenerativeModel_generate_content_summary
[4]: https://cloud.google.com/vertexai/generativeai/docs/reference/python/latest/summary_method#vertexai_generative_models_ChatSession_send_message_summary
{{% /tab %}}

{{% tab "Node.js" %}}
[Vertex AI インテグレーション][1] は、[Google の Vertex AI Node.js SDK][2] を通じて行われたコンテンツ生成とチャットメッセージの呼び出しを自動的に追跡します。

###トレース対象メソッド

Vertex AI インテグレーションは、以下のメソッドをインスツルメントします。

 [コンテンツ生成][3]:
   `model.generateContent()`
   `model.generateContentStream()`
 [チャットメッセージ][4]:
   `chat.sendMessage()`
   `chat.sendMessageStream()`

[1]: /ja/integrations/googlecloudvertexai/
[2]: https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest
[3]: https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest#sendtextpromptrequests
[4]: https://cloud.google.com/vertexai/generativeai/docs/reference/nodejs/latest#sendmultiturnchatrequests
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## LLM インテグレーションの有効化/無効化

すべてのインテグレーションは**デフォルトで有効になっています**。

### すべての LLM インテグレーションの無効化

{{< tabs >}}
{{% tab "Python " %}}
[incode SDK セットアップ][1] を使用し、`integrations_enabled=False` を指定してください。

**例**: すべての LLM インテグレーションを無効にする incode SDK セットアップ

```python
from ddtrace.llmobs import LLMObs

LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  integrations_enabled=False
)
```

[1]: /ja/llm_observability/instrumentation/sdk?tab=python#incodesetup
{{% /tab %}}

{{% tab "Node.js" %}}
[incode SDK セットアップ][1] を使用し、`plugins: false`を指定します。

**例**: すべての LLM インテグレーションを無効にする incode SDK セットアップ

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
```

[1]: /ja/llm_observability/instrumentation/sdk?tab=nodejs#incodesetup
{{% /tab %}}
{{< /tabs >}}

### 特定の LLM インテグレーションのみの有効化

{{< tabs >}}
{{% tab "Python " %}}
1. [incode SDK セットアップ][1] を使用し、`integrations_enabled=False` で全てのインテグレーションを無効にします。
2. 特定のインテグレーションを手動で有効にするには、`ddtrace.patch()` を使用します。

**例**: LangChain インテグレーションのみを有効にする incode SDK セットアップ

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

[1]: /ja/llm_observability/instrumentation/sdk?tab=python#incodesetup
{{% /tab %}}

{{% tab "Node.js" %}}
1. [incode SDK セットアップ][1] を使用し、`plugins: false` で全てのインテグレーションを無効にします。
2. 特定のインテグレーションを手動で有効にするには、`use()` を使用します。

**例**: LangChain インテグレーションのみを有効にする incode SDK セットアップ

```javascript
const tracer = require('dd-trace').init({
  llmobs: { ... },
  plugins: false
});
const { llmobs } = tracer;
tracer.use('langchain', true);
```

[1]: /ja/llm_observability/instrumentation/sdk?tab=nodejs#incodesetup
{{% /tab %}}
{{< /tabs >}}

ライブラリのパッチ適用やスパンを開始するインテグレーションをより細かく制御するには、以下の環境変数を設定します。

`DD_TRACE_DISABLED_PLUGINS`
: トレーサー初期化時に自動的に無効化されるインテグレーション名をカンマ区切りで指定する文字列<br>
**例**: `DD_TRACE_DISABLED_PLUGINS=openai,http`

`DD_TRACE_DISABLED_INSTRUMENTATIONS`
: トレーサーの初期化時にパッチが適用されないライブラリ名を、カンマ区切りで並べた文字列<br>
**例**: `DD_TRACE_DISABLED_INSTRUMENTATIONS=openai,http`

##参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/llm_observability/instrumentation/sdk
[2]: /ja/llm_observability/quickstart/