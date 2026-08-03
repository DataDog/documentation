---
description: OpenTelemetry を使用し、GenAI セマンティック規約に従って LLM アプリケーションをインスツルメンテーションし、Datadog
  SDK を使用せずに Datadog LLM Observability にトレースを送信します。
title: OpenTelemetry インスツルメンテーション
---
## 概要 {#overview}
OpenTelemetry の生成 AI 向け標準化セマンティック規約を使用することで、任意の OpenTelemetry 互換ライブラリまたはフレームワークを用いて LLM アプリケーションをインスツルメンテーションし、LLM Observability でトレースを可視化できます。

LLM Observability は、[生成 AI 向け OpenTelemetry 1.37+ セマンティック規約][1]に従った OpenTelemetry トレースの取り込みをサポートしています。これにより、Datadog LLM Observability SDK や Datadog Agent を必要とせずに、OpenTelemetry でインスツルメンテーションされたアプリケーションから LLM トレースを Datadog に直接送信できます。

## 前提条件 {#prerequisites}

- [Datadog API キー][2]
- OpenTelemetry でインスツルメンテーションされ、[生成 AI 向け OpenTelemetry 1.37+ セマンティック規約][1]に従ったトレースを出力するアプリケーション

OpenTelemetry スパンの<a href="/llm_observability/evaluations/external_evaluations#submitting-external-evaluations-with-the-api">外部評価を API に直接</a>送信するには、評価に <code>source:otel</code> タグを含める必要があります。スパンを参照する場合は、 <code>span_id</code> および <code>trace_id</code> を 10 進数文字列として指定してください。OpenTelemetry はネイティブで16進数の ID を使用するため、評価を送信する前に10進数に変換してください。例えば、Python の <code>int(hex_span_id, 16)</code> を使用して、16 進数のスパン ID を10 進数の値に変換します。

OpenTelemetry スパンを使用した Prompt Tracking の詳細については、<a href="/llm_observability/monitoring/prompt_tracking#opentelemetry-instrumentation">Prompt Tracking - OpenTelemetry インスツルメンテーション</a>を参照してください。

また、<a href="/llm_observability/experiments/setup#using-opentelemetry-spans-inside-experiments">LLM Observability Experiments</a> 内で OpenTelemetry スパンを使用することもできます。  <code>DD_TRACE_OTEL_ENABLED=1</code>を設定することで、実験タスク内で作成された OTel スパンは自動的に実験スパンの子として表示されます。

## セットアップ {#setup}

OpenTelemetry トレースを LLM Observability に送信するには、次の設定で OpenTelemetry エクスポーターを構成してください。

### 構成 {#configuration}

アプリケーションに以下の環境変数を設定します。

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
```

`<YOUR_API_KEY>` をユーザーの [Datadog API キー][2]に置き換えます。

フレームワークが以前に 1.37 未満の OpenTelemetry 仕様バージョンをサポートしていた場合は、次の設定も必要です。

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

この環境変数は、現在はバージョン 1.37+ のセマンティック規約をサポートしているものの、以前は旧バージョンをサポートしていたフレームワーク (例: [strands-agents][5]) 向けに、1.37+ 準拠の OpenTelemetry トレースを有効にします。

**注**:
* デフォルトの OpenTelemetry SDK 以外の OpenTelemetry ライブラリを使用している場合は、ライブラリの API に応じてエンドポイント、プロトコル、およびヘッダーを異なる方法で設定する必要がある場合があります。適切な設定方法については、ライブラリのドキュメントを参照してください。
* OpenTelemetry インスツルメンテーションを使用する場合、LLM Observability に送信されるデータの一部は、対応する APM トレースにも書き込まれる場合があります。機密データを保護している場合は、LLM Observability のアクセス制御に一致するように APM で Restricted Dataset を構成することも検討してください。詳細については、[データアクセス制御][8]を参照してください。

#### strands-agents を使用する {#using-strands-agents}

[`strands-agents` ライブラリ][5]を使用している場合、OpenTelemetry v1.37+ に準拠したトレースを有効にするために追加の環境変数を設定する必要があります。

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

この環境変数は、`strands-agents` が生成 AI 向けの OpenTelemetry v1.37+ セマンティック規約に従ったトレースを出力することを保証します。これは LLM Observability に必要です。

### インスツルメンテーション {#instrumentation}

LLM Observability に互換性のあるトレースを生成するには、次のいずれかを実行してください。

- OpenTelemetry ライブラリまたは[生成 AI 向け OpenTelemetry 1.37+ セマンティック規約][1]に従ってスパンを出力するインスツルメンテーションパッケージを使用してください。
- セマンティック規約で定義された必要な `gen_ai.*` 属性を持つスパンを生成するカスタム OpenTelemetry インスツルメンテーションを作成してください。

アプリケーションがデータの送信を開始すると、トレースは自動的に [**LLM Observability Traces** ページ][3]に表示されます。UI でトレースを検索するには、`ml_app` 属性を使用してください。これは自動的に OpenTelemetry ルートスパンの `service` 属性の値に設定されます。

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> バージョン 0.47+ がサポートされています。<a href="#using-openllmetry">OpenLLMetry の例</a>をご覧ください。
<li/>OpenInference はサポートされていません。
<li/>トレースを送信してから、LLM Observability Traces page に表示されるまでに 3〜5 分の遅延が発生する場合があります。APM が有効になっている場合、トレースは APM Traces page にすぐに表示されます。
</ul>
</div>

## テスト済みのフレームワークとライブラリ {#tested-frameworks-and-libraries}

これらのフレームワークとライブラリは、Datadog LLM Observability でテストされています。[生成 AI 向け OpenTelemetry 1.37+ セマンティック規約][1]に準拠したスパンを発行するフレームワークはすべてサポートされています。

{{< tabs >}}
{{% tab "Python" %}}
| フレームワーク | インスツルメンテーション | サポートされているバージョン |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | ネイティブ | >= 1.11.0 |
| [OpenLLMetry][34] | [`traceloop-sdk`][35] | >= 0.47.0 |

[5]: https://pypi.org/project/strands-agents/
[20]: https://platform.openai.com/docs/api-reference/introduction
[21]: https://pypi.org/project/opentelemetry-instrumentation-openai-v2/
[22]: https://docs.anthropic.com/en/api/
[23]: https://pypi.org/project/opentelemetry-instrumentation-anthropic/
[24]: https://ai.google.dev/gemini-api/docs
[25]: https://pypi.org/project/opentelemetry-instrumentation-google-genai/
[26]: https://cloud.google.com/vertex-ai/generative-ai/docs/overview
[27]: https://pypi.org/project/opentelemetry-instrumentation-vertexai/
[28]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[29]: https://pypi.org/project/opentelemetry-instrumentation-botocore/
[30]: https://python.langchain.com/docs/introduction/
[31]: https://pypi.org/project/opentelemetry-instrumentation-langchain/
[32]: https://docs.llamaindex.ai/
[33]: https://pypi.org/project/opentelemetry-instrumentation-llamaindex/
[34]: https://www.traceloop.com/openllmetry
[35]: https://pypi.org/project/traceloop-sdk/
{{% /tab %}}
{{% tab "Node.js" %}}
| フレームワーク | インスツルメンテーション | サポートされているバージョン |
|-----------|----------------|--------------------|
| [OpenAI][40] | [`@opentelemetry/instrumentation-openai`][41] | >= 4.19.0 |

[40]: https://platform.openai.com/docs/api-reference/introduction
[41]: https://www.npmjs.com/package/@opentelemetry/instrumentation-openai
{{% /tab %}}
{{% tab "Java" %}}
| フレームワーク | インスツルメンテーション | サポートされているバージョン |
|-----------|----------------|--------------------|
| [Spring AI][50] | ネイティブ ([Micrometer][51]を通じて) | >= 1.0.0 |
| [LangChain4j][52] | ネイティブ (OpenTelemetryモジュール) | >= 0.31.0 |
| [AWS Bedrock][53] | [OpenTelemetry Java Agent][54] | AWS SDK >= 2.2 |

[50]: https://docs.spring.io/spring-ai/reference/
[51]: https://micrometer.io/
[52]: https://docs.langchain4j.dev/
[53]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[54]: https://opentelemetry.io/docs/zero-code/java/agent/
{{% /tab %}}
{{< /tabs >}}

## 例 {#examples}

### Strands Agents を使用する {#using-strands-agents-1}

以下の例は、OpenTelemetry インテグレーションを使用した [Strands Agents][7] による完全なアプリケーションを示しています。このアプローチは、生成 AI 向け OpenTelemetry バージョン 1.37+ のセマンティック規約をサポートする任意のフレームワークで機能します。

```python
from strands import Agent
from strands_tools import calculator, current_time
from strands.telemetry.config import StrandsTelemetry
import os

# Configure AWS credentials for Bedrock access
os.environ["AWS_PROFILE"] = "<YOUR_AWS_PROFILE>"
os.environ["AWS_DEFAULT_REGION"] = "<YOUR_AWS_REGION>"

# Enable latest GenAI semantic conventions (1.37)
os.environ["OTEL_SEMCONV_STABILITY_OPT_IN"] = "gen_ai_latest_experimental"

# Configure OTLP endpoint to send traces to Datadog LLM Observability
os.environ["OTEL_EXPORTER_OTLP_TRACES_PROTOCOL"] = "http/protobuf"
os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "{{< region-param key="otlp_trace_endpoint" code="true" >}}"
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = f"dd-api-key={os.getenv('DD_API_KEY')},dd-otlp-source=llmobs"

# Initialize telemetry with OTLP exporter
telemetry = StrandsTelemetry()
telemetry.setup_otlp_exporter()

# Create agent with tools
agent = Agent(tools=[calculator, current_time])

# Run the agent
if __name__ == "__main__":
    result = agent("I was born in 1993, what is my age?")
    print(f"Agent: {result}")
```

### カスタム OpenTelemetry インスツルメンテーション {#custom-opentelemetry-instrumentation}

以下の例は、カスタム OpenTelemetry コードを使用して LLM アプリケーションをインスツルメンテーションする方法を示しています。このアプローチにより、アプリケーションが出力するトレースとスパンを完全に制御できます。

```python
import os
import json
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource, SERVICE_NAME
from openai import OpenAI

# Configure OpenTelemetry to send traces to Datadog
os.environ["OTEL_EXPORTER_OTLP_TRACES_ENDPOINT"] = "{{< region-param key="otlp_trace_endpoint" code="true" >}}"
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = "dd-api-key=<YOUR_DATADOG_API_KEY>,dd-otlp-source=llmobs"
os.environ["OTEL_SEMCONV_STABILITY_OPT_IN"] = "gen_ai_latest_experimental"

# Initialize OpenTelemetry SDK
resource = Resource(attributes={SERVICE_NAME: "simple-llm-example"})
provider = TracerProvider(resource=resource)
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)

# Make LLM call with OpenTelemetry tracing
with tracer.start_as_current_span(
    "chat gpt-4o",
    kind=trace.SpanKind.CLIENT,
) as span:
    model = "gpt-4o"
    max_tokens = 1024
    temperature = 0.7
    messages = [{"role": "user", "content": "Explain OpenTelemetry in one sentence."}]

    # Set request attributes
    span.set_attribute("gen_ai.provider.name", "openai")
    span.set_attribute("gen_ai.request.model", model)
    span.set_attribute("gen_ai.operation.name", "chat")
    span.set_attribute("gen_ai.request.max_tokens", max_tokens)
    span.set_attribute("gen_ai.request.temperature", temperature)

    # Add input messages as event
    input_messages_parts = []
    for msg in messages:
        input_messages_parts.append({
            "role": msg["role"],
            "parts": [{"type": "text", "content": msg["content"]}]
        })

    span.add_event(
        "gen_ai.client.inference.operation.details",
        {
            "gen_ai.input.messages": json.dumps(input_messages_parts)
        }
    )

    # Make actual LLM call
    client = OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
    response = client.chat.completions.create(
        model=model,
        max_tokens=max_tokens,
        temperature=temperature,
        messages=messages
    )

    # Set response attributes from actual data
    span.set_attribute("gen_ai.response.id", response.id)
    span.set_attribute("gen_ai.response.model", response.model)
    span.set_attribute("gen_ai.response.finish_reasons", [response.choices[0].finish_reason])
    span.set_attribute("gen_ai.usage.input_tokens", response.usage.prompt_tokens)
    span.set_attribute("gen_ai.usage.output_tokens", response.usage.completion_tokens)

    # Add output messages as event
    output_text = response.choices[0].message.content
    span.add_event(
        "gen_ai.client.inference.operation.details",
        {
            "gen_ai.output.messages": json.dumps([{
                "role": "assistant",
                "parts": [{"type": "text", "content": output_text}],
                "finish_reason": response.choices[0].finish_reason
            }])
        }
    )

    print(f"Response: {output_text}")

# Flush spans before exit
provider.force_flush()
```

この例を実行した後、生成されたトレースを見つけるために LLM Observability UI で `ml_app:simple-llm-example` を検索してください。

### OpenLLMetry を使用する {#using-openllmetry}

以下の例は、[OpenLLMetry](https://github.com/traceloop/openllmetry) を使用して OpenTelemetry により OpenAI 呼び出しを自動的にインスツルメンテーションする方法を示しています。

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.openai import OpenAIInstrumentor
import openai
from opentelemetry.sdk.resources import Resource

resource = Resource.create({
    "service.name": "simple-openllmetry-test",
})

provider = TracerProvider(resource=resource)
trace.set_tracer_provider(provider)

exporter = OTLPSpanExporter(
    endpoint="{{< region-param key="otlp_trace_endpoint" code="true" >}}",
    headers={
        "dd-api-key": "<YOUR_DATADOG_API_KEY>",
        "dd-ml-app": "simple-openllmetry-test",
        "dd-otlp-source": "llmobs",
    },
)

provider.add_span_processor(BatchSpanProcessor(exporter))

OpenAIInstrumentor().instrument()

# Make OpenAI call (automatically traced)
client = openai.OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}]
)

provider.force_flush(timeout_millis=5000)
```

この例を実行した後、生成されたトレースを見つけるために LLM Observability UI で `ml_app:simple-openllmetry-test` を検索してください。

## 属性マッピングリファレンス {#attribute-mapping-reference}

このセクションでは、OpenTelemetry GenAI セマンティック規約 (v1.37+) および OpenLLMetry から Datadog の LLM Observability スパンスキーマへのマッピングを提供します。

<div class="alert alert-info">OpenLLMetry 特有のマッピングは、<a href="#openllmetry-attribute-mappings">OpenLLMetry attribute mappings</a> セクションに別途文書化されています。</div>

### OpenTelemetry 1.37+ 属性マッピング {#opentelemetry-137-attribute-mappings}

#### ベーススパン属性 {#base-span-attributes}

| OTLP フィールド | LLM Observability フィールド | メモ |
|------------|--------------|-------|
| `resource.attributes.service.name` | `ml_app`、`tags.service` | |
| `name` | `name` | 存在する場合は `gen_ai.tool.name` によって上書きされます |
| `parent_span_id` | `parent_id` | |
| `start_time_unix_nano` | `start_ns` | |
| `end_time_unix_nano` | `duration` | 計算: end - start |
0 より大きい場合| `status.code` | `status` | `error`、そうでなければ `ok` |
| `status.message` | `meta.error.message` | |
| `attributes.error.type` | `meta.error.type` | |

#### スパン種別の解決 {#span-kind-resolution}

| `gen_ai.operation.name` | LLM Observability `span.kind` |
|-------------------------|-------------------|
| `generate_content`、`chat`、`text_completion`、`completion` | `llm` |
| `embeddings`、`embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`、`create_agent` | `agent` |
| `rerank`、`unknown`、*(デフォルト)* | `workflow` |

#### モデル情報 {#model-information}

| OTel 属性 | LLM Observability フィールド | メモ |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | 上記の解決表を参照してください |
| `gen_ai.provider.name` | `meta.model_provider` | `gen_ai.system` にフォールバックし、その後 `custom` | にフォールバックします
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | `response.model` が存在しない場合のフォールバック |

#### トークン使用量メトリクス {#token-usage-metrics}

| OTel 属性 | LLM Observability フィールド |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### リクエストパラメーター {#request-parameters}

すべての `gen_ai.request.*` パラメーターは、プレフィックスが削除された `meta.metadata.*` にマッピングされます。

| OTel 属性 | LLM Observability フィールド |
|----------------|--------------|
| `gen_ai.request.seed` | `metadata.seed` |
| `gen_ai.request.frequency_penalty` | `metadata.frequency_penalty` |
| `gen_ai.request.max_tokens` | `metadata.max_tokens` |
| `gen_ai.request.stop_sequences` | `metadata.stop_sequences` |
| `gen_ai.request.temperature` | `metadata.temperature` |
| `gen_ai.request.top_k` | `metadata.top_k` |
| `gen_ai.request.top_p` | `metadata.top_p` |
| `gen_ai.request.choice.count` | `metadata.choice.count` |

#### ツール属性 {#tool-attributes}

| OTel 属性 | LLM Observability フィールド | メモ |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | スパン名を上書きします |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | 解析された JSON 配列 |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### セッションと会話 {#session-and-conversation}

| OTel 属性 | LLM Observability フィールド | メモ |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | また、`metadata.conversation_id` とタグにも追加されます |

#### レスポンス属性 {#response-attributes}

| OTel 属性 | LLM Observability フィールド |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### 入力および出力メッセージ {#input-and-output-messages}

入力および出力メッセージは、以下のソースから優先順位順に抽出されます。

1. 直接属性: `gen_ai.input.messages`、`gen_ai.output.messages`、`gen_ai.system_instructions`
2. 名前が `gen_ai.client.inference.operation.details` のスパンイベント (`meta["events"]`)

| OTel ソース | LLM Observability フィールド | メモ |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (その他) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (その他) | |
| `gen_ai.system_instructions` | 入力の先頭に追加されます | システムロールメッセージとして追加されます |

##### 埋め込みスパン {#embedding-spans}

| OTel ソース | LLM Observability フィールド |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### タグ {#tags}

タグはスパンに直接配置されます。

- 非 `gen_ai.*` 属性は `key:value` タグに変換されます
- 不明な `gen_ai.*` キーは、プレフィックスを削除して追加されます
- フィルタリング対象外: `_dd.*`、`llm.*`、`ddtags`、`events`、およびすでに特定的にマッピングされた `gen_ai.*` キー

<div class="alert alert-info">LLM Observability のスパンフィールドに明示的にマッピングされていないすべての <code>gen_ai.*</code> 属性は、LLM スパンのタグに格納され、各値は 256 文字の制限があります。この制限を超える値は切り詰められます。すべてのその他の非<code>gen_ai</code> 属性は破棄されます。</div>

### OpenLLMetry 属性マッピング {#openllmetry-attribute-mappings}

このセクションでは、標準の OpenTelemetry GenAI セマンティック規約と異なる、またはそれを拡張する OpenLLMetry 特有の属性マッピングについて説明します。

#### スパン種別の解決 {#span-kind-resolution-1}

`llm.request.type` は `gen_ai.operation.name` が存在しない場合のフォールバックとして使用されます。

| `llm.request.type` | LLM Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`、*(デフォルト)* | `workflow` |

#### モデル情報 {#model-information-1}

| OpenLLMetry 属性 | LLM Observability フィールド | メモ |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | `gen_ai.provider.name` が存在しない場合のフォールバック |

#### トークン使用量メトリクス {#token-usage-metrics-1}

| OpenLLMetry 属性 | LLM Observability フィールド | メモ |
|-----------------------|--------------|-------|
| `llm.usage.total_tokens` | `metrics.total_tokens` | `gen_ai.usage.total_tokens` が存在しない場合のフォールバック |

#### 入力および出力メッセージ {#input-and-output-messages-1}

OpenLLMetry は、JSON 配列の代わりにインデックス付き属性を使用します。これらは最も優先度の低いソースであり、OTel の標準ソースが存在しない場合にのみ使用されます。

##### プロンプト属性 (入力) {#prompt-attributes-input}

| OpenLLMetry 属性 | 説明 |
|-----------------------|-------------|
| `gen_ai.prompt.<index>.role` | メッセージロール (user、system、assistant、tool) |
| `gen_ai.prompt.<index>.content` | メッセージ内容 |
| `gen_ai.prompt.<index>.tool_call_id` | ツール応答メッセージのツール呼び出し ID |

##### 完了属性 (出力) {#completion-attributes-output}

| OpenLLMetry 属性 | 説明 |
|-----------------------|-------------|
| `gen_ai.completion.<index>.role` | メッセージロール |
| `gen_ai.completion.<index>.content` | メッセージ内容 |
| `gen_ai.completion.<index>.finish_reason` | 完了終了理由 |

##### マッピング {#mapping}

メッセージは OTel 互換フォーマットに変換され、通常通り処理されます。

| OpenLLMetry ソース | LLMObs フィールド |
|--------------------|--------------|
| `gen_ai.prompt.*` | `meta.input.messages` (llm) / `meta.input.value` (その他) |
| `gen_ai.completion.*` | `meta.output.messages` (llm) / `meta.output.value` (その他) |

#### ツール呼び出し {#tool-calls}

ツール呼び出しは完了属性内にネストされます。

| OpenLLMetry 属性 | マッピング先 |
|-----------------------|---------|
| `gen_ai.completion.<index>.tool_calls.<idx>.name` | `tool_calls[].name` |
| `gen_ai.completion.<index>.tool_calls.<idx>.id` | `tool_calls[].tool_id` |
| `gen_ai.completion.<index>.tool_calls.<idx>.arguments` | `tool_calls[].arguments` |

##### ツール応答メッセージ {#tool-response-messages}

`role = "tool"` と `tool_call_id` が存在する場合、メッセージはツールの結果に変換されます。

| OpenLLMetry 属性 | マッピング先 |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### 埋め込みスパン {#embedding-spans-1}

埋め込みスパンの場合、ドキュメントはプロンプトコンテンツ属性から抽出されます。

| OpenLLMetry ソース | LLM Observability フィールド |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### タグのフィルタリング {#tags-filtering}

以下の OpenLLMetry 特有の属性は、タグからフィルタリングされます。

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

## サポートされているセマンティック規約 {#supported-semantic-conventions}

LLM Observability は、生成 AI 向け OpenTelemetry 1.37+ セマンティック規約に従うスパンをサポートしています。具体的には以下のとおりです。

- LLM 操作は `gen_ai.provider.name`、`"gen_ai.operation.name"`、`gen_ai.request.model`、およびその他の gen_ai 属性を含みます。
- 直接スパン属性またはスパンイベントを介した操作の入力および出力
- トークン使用量メトリクス (`gen_ai.usage.input_tokens`、`gen_ai.usage.output_tokens`)
- モデルパラメーターおよびメタデータ

サポートされている属性とその仕様の完全な一覧については、[生成 AI 向け OpenTelemetry セマンティック規約ドキュメント][1]を参照してください。

## LLM Observability 変換の無効化 {#disabling-llm-observability-conversion}

生成 AI スパンを APM に残し、LLM Observability に表示させたくない場合は、`dd_llmobs_enabled` 属性を `false` に設定することで自動変換を無効にできます。トレース内の任意のスパンにこの属性を設定すると、トレース全体が LLM Observability に変換されるのを防ぎます。

### 環境変数の使用 {#using-environment-variables}

`dd_llmobs_enabled=false` 属性を `OTEL_RESOURCE_ATTRIBUTES` 環境変数に追加してください。

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### コードの使用 {#using-code}

トレース内の任意のスパンに属性をプログラムで設定することもできます。

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("my-span") as span:
    # Disable LLM Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-agent-spans/#spans
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /ja/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /ja/llm_observability/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /ja/account_management/rbac/data_access/