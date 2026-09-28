---
aliases:
- /ja/llm_observability/instrumentation/otel_instrumentation/
description: OpenTelemetry を使用し、GenAI または OpenInference セマンティック規約に従って LLM アプリケーションをインスツルメンテーションし、Datadog
  SDK を使用せずに Agent Observability にトレースを送信します。
title: OpenTelemetry インスツルメンテーション
---
## 概要 {#overview}
OpenTelemetry の生成 AI 用の標準化セマンティック規約を使用することで、任意の OpenTelemetry 互換ライブラリまたはフレームワークを用いて LLM アプリケーションをインスツルメンテーションし、Agent Observability でトレースを表示できます。

Agent Observability は、[生成 AI 向け OpenTelemetry 1.37+ セマンティック規約][1] またはサポートされている [OpenInference セマンティック規約][12] のいずれかに従った OpenTelemetry トレースの取り込みをサポートしています。これにより、Agent Observability SDK や Datadog Agent を必要とせずに、OpenTelemetry でインスツルメンテーションされたアプリケーションから LLM トレースを Datadog に直接送信できます。

## 前提条件 {#prerequisites}

- [Datadog API キー][2]
- OpenTelemetry でインスツルメンテーションされ、[生成 AI 向け OpenTelemetry 1.37+ セマンティック規約][1] またはサポートされている [OpenInference セマンティック規約][12] に従ったトレースを出力するアプリケーション

## サポートされる機能 {#supported-features}

### 評価 {#evaluations}

OpenTelemetry スパンの[外部評価を API に直接](/llm_observability/investigate/evaluations/external_evaluations#submitting-external-evaluations-with-the-api)送信するには、評価内に `source:otel` タグを含めてください。スパンを参照する際は、`span_id` と `trace_id` を 10 進数文字列として指定してください。OpenTelemetry はネイティブで 16 進数の ID を使用するため、評価を送信する前に 10 進数に変換してください。たとえば、Python の `int(hex_span_id, 16)` を使用して、16 進数のスパン ID を 10 進数に変換します。

### プロンプト追跡 {#prompt-tracking}

OpenTelemetry スパンでプロンプト追跡を使用することについて詳しくは、『[プロンプト追跡 - OpenTelemetry インスツルメンテーション](/llm_observability/instrument/prompt_tracking#opentelemetry-instrumentation)』を参照してください。

### 実験 {#experiments}

OpenTelemetry スパンは、[Agent Observability 実験](/llm_observability/improve/experiments/setup#using-opentelemetry-spans-inside-experiments)内で使用できます。`DD_TRACE_OTEL_ENABLED=1` を設定することで、実験タスク内で作成された OTel スパンは自動的に実験スパンの子として表示されます。

### マルチモーダルサポート {#multimodal-support}

OpenTelemetry メッセージ上の音声と画像は、トレース表示でレンダリングされます。Datadog は、『[メッセージ内のメディア](#media-in-messages)』で説明されているように、OpenTelemetry GenAI セマンティック規約に従うメッセージパーツからメディアを抽出します。

base64 バイトとしてインラインで保持されているメディアのみがレンダリングされます。リモート URL はテキスト参照として記録され、取得されることはありません。メディアがスパンに到達した際に適用されるフィールド、形式、サイズ制限については、『[マルチモーダルサポート](/llm_observability/instrument/multimodal/)』を参照してください。

### スパンリンク {#span-links}

GenAI スパンで [OpenTelemetry スパンリンク][9] を使用して、あるスパンの出力が別のスパンの入力になる場合など、親子関係以外の関係を表現します。リンクされた 2 つのスパンが同じトレース内にある場合、そのリンクはトレースの [**Execution Graph**] (実行グラフ) 内でエッジとして表示されるため、兄弟スパン間でデータがどのように流れるか (例: ツールの出力がダウンストリームの LLM 呼び出しにフィードされるなど) を確認できます。

{{< img src="llm_observability/instrumentation/otel-span-links-execution-graph.png" alt="マルチエージェントコンテンツパイプライントレースの実行グラフ。オーケストレーターには research-agent、writer-agent、editor-agent が含まれており、search_web ツールからリサーチ LLM へ、そしてリサーチからライター、エディターへとデータが流れる様子を示すスパンリンクエッジで接続されています。" style="width:100%;" >}}

`from` 属性と `to` 属性を使用して、データフローの方向を示します。

```python
from opentelemetry import trace
from opentelemetry.trace import Link

tracer = trace.get_tracer(__name__)

# A tool span whose output feeds a downstream LLM call.
with tracer.start_as_current_span("lookup_order") as tool_span:
    tool_span.set_attribute("gen_ai.operation.name", "execute_tool")
    tool_ctx = tool_span.get_span_context()

# The LLM span links back to the tool span: its output became this span's input.
link = Link(context=tool_ctx, attributes={"from": "output", "to": "input"})
with tracer.start_as_current_span("chat gpt-4o", links=[link]) as llm_span:
    llm_span.set_attribute("gen_ai.operation.name", "chat")
```

<div class="alert alert-info">異なるトレース内のスパンを指すスパンリンクは保存されますが、単一のトレースを視覚化する実行グラフには描画されません。</div>

## セットアップ {#setup}

Datadog がサポートする OpenTelemetry トレースのインジェスト方法はすべて、Agent Observability で機能します。サポートされているインジェストパスの全リストについては、[OpenTelemetry 機能の互換性][10] を参照してください。構成方法の 1 つを次に示します。

OpenTelemetry トレースを Agent Observability に送信するには、次の設定で OpenTelemetry エクスポーターを構成してください。

### 構成 {#configuration}

アプリケーションで以下の環境変数を設定します。

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
```

`<YOUR_API_KEY>` をユーザーの [Datadog API キー][2] に置き換えます。

フレームワークで以前に 1.37 より前 OpenTelemetry 仕様バージョンをサポートしていた場合は、次の設定も必要です。

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

この環境変数により、現在はバージョン 1.37+ のセマンティック規約をサポートしているものの、以前は旧バージョン ([strands-agents][5] など) をサポートしていたフレームワーク向けに、1.37+ 準拠の OpenTelemetry トレースが有効になります。

**注**:
* デフォルトの OpenTelemetry SDK 以外の OpenTelemetry ライブラリを使用している場合は、ライブラリの API に応じてエンドポイント、プロトコル、およびヘッダーを異なる方法で設定することが必要な場合があります。適切な設定方法については、ライブラリのドキュメントを参照してください。
* OpenTelemetry インスツルメンテーションを使用する場合、Agent Observability に送信されるデータの一部は、対応する APM トレースにも書き込まれる場合があります。機密データを保護する場合は、Agent Observability のアクセス制御に一致するように APM で制限付きデータセットを構成することも検討してください。詳細については、[データアクセス制御][8] を参照してください。

#### strands-agents を使用する {#using-strands-agents}

[`strands-agents` ライブラリ][5] を使用している場合、OpenTelemetry v1.37+ に準拠したトレースを有効にするために追加の環境変数を設定する必要があります。

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

この環境変数は、`strands-agents` が生成 AI 向けの OpenTelemetry v1.37+ セマンティック規約に従ったトレースを出力することを保証します。これは Agent Observability に必要です。

### インスツルメンテーション {#instrumentation}

Agent Observability に互換性のあるトレースを生成するには、次のいずれかを実行してください。

- OpenTelemetry ライブラリまたは [生成 AI 向け OpenTelemetry 1.37+ セマンティック規約][1]、あるいはサポートされている [OpenInference セマンティック規約][12] に従ってスパンを出力するインスツルメンテーションパッケージを使用してください。
- 選択した規約で定義されている必要な `gen_ai.*` 属性または OpenInference 属性を生成するカスタム OpenTelemetry インスツルメンテーションを作成してください。

アプリケーションがデータの送信を開始すると、トレースは自動的に [{{< ui >}}Agent Observability Traces{{< /ui >}} ページ][3] に表示されます。UI でトレースを検索するには、`ml_app` 属性を使用してください。これは自動的に OpenTelemetry ルートスパンの `service` 属性の値に設定されます。

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> バージョン 0.47+ がサポートされています。<a href="#using-openllmetry">OpenLLMetry の例</a>をご覧ください。
<li/>OpenInference スパンがサポートされています。<a href="#using-openinference">OpenInference の例</a>をご覧ください。
<li/><a href="https://langfuse.com/integrations/native/opentelemetry">Langfuse</a> ネイティブ OpenTelemetry インスツルメンテーションがサポートされています。<a href="#langfuse-attribute-mappings">Langfuse 属性マッピング</a>をご覧ください。
<li/>トレースを送信してから、[Agent Observability Traces] ページに表示されるまでに 3〜5 分の遅延が発生する場合があります。APM が有効になっている場合、トレースは [APM Traces] ページにすぐに表示されます。
</ul>
</div>

## テスト済みのフレームワークとライブラリ {#tested-frameworks-and-libraries}

これらのフレームワークとライブラリは、Agent Observability でテスト済みです。[OpenTelemetry 1.37+ GenAI セマンティック規約][1] または [OpenInference セマンティック規約][12] からサポートされている属性を出力するフレームワークは、スパンを Agent Observability に送信できます。

{{< tabs >}}
{{% tab "Python" %}}
| フレームワーク | インスツルメンテーション | サポートされているバージョン |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [OpenAI][20] | [`openinference-instrumentation-openai`][36] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | ネイティブ | >= 1.11.0 |
| [OpenLLMetry][34] | [`traceloop-sdk`][35] | >= 0.47.0 |
| [Langfuse][37] | ネイティブ | >= 4.0.0 |

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
[36]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
[37]: https://langfuse.com/integrations/native/opentelemetry
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
| [Spring AI][50] | ネイティブ ([Micrometer][51] を通じて) | >= 1.0.0 |
| [LangChain4j][52] | ネイティブ (OpenTelemetry モジュール) | >= 0.31.0 |
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

# Configure OTLP endpoint to send traces to Agent Observability
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

この例を実行した後、Agent Observability UI で `ml_app:simple-llm-example` を検索して、生成されたトレースを見つけてください。

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

この例を実行した後、Agent Observability UI で `ml_app:simple-openllmetry-test` を検索して、生成されたトレースを見つけてください。

### OpenInference の使用{#using-openinference}

以下の例では、[OpenInference OpenAI インスツルメンテーション][11] を使用して、OpenTelemetry で OpenAI 呼び出しを自動的にインスツルメンテーションしています。

OpenTelemetry エクスポーターを構成し、OpenAI クライアントをインスツルメンテーションします。

```python
import openai
from openinference.instrumentation.openai import OpenAIInstrumentor
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

resource = Resource.create({
    "service.name": "simple-openinference-test",
})

provider = TracerProvider(resource=resource)
trace.set_tracer_provider(provider)

exporter = OTLPSpanExporter(
    endpoint="{{< region-param key="otlp_trace_endpoint" code="true" >}}",
    headers={
        "dd-api-key": "<YOUR_DATADOG_API_KEY>",
        "dd-ml-app": "simple-openinference-test",
        "dd-otlp-source": "llmobs",
    },
)

provider.add_span_processor(BatchSpanProcessor(exporter))

OpenAIInstrumentor().instrument(tracer_provider=provider)

# Make OpenAI call (automatically traced)
client = openai.OpenAI(api_key="<YOUR_OPENAI_API_KEY>")
client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "What is 15 multiplied by 7?"}]
)

provider.force_flush(timeout_millis=5000)
```

この例を実行した後、Agent Observability UI で `ml_app:simple-openinference-test` を検索して、生成されたトレースを見つけてください。

## 属性マッピングリファレンス {#attribute-mapping-reference}

このセクションでは、OpenTelemetry GenAI セマンティック規約 (v1.37+)、OpenLLMetry、OpenInference、および Langfuse から Datadog の Agent Observability スパンスキーマへのマッピングを提供します。

スパンに必要な属性が欠落している場合、または属性を解析できない場合、Agent Observability はそのスパンに **マッピングの警告**インジケーターでフラグを付けます。説明と修正については、『[マッピングの警告のトラブルシューティング](#troubleshooting-mapping-warnings)』を参照してください。

<div class="alert alert-info">プロバイダー固有のマッピングは、<a href="#openllmetry-attribute-mappings">OpenLLMetry 属性マッピング</a>、<a href="#openinference-attribute-mappings">OpenInference 属性マッピング</a>、および <a href="#langfuse-attribute-mappings">Langfuse 属性マッピング</a>の各セクションにあります。</div>

### OpenTelemetry 1.37+ 属性マッピング {#opentelemetry-137-attribute-mappings}

#### ベーススパン属性 {#base-span-attributes}

| OTLP フィールド | Agent Observability フィールド | メモ |
|------------|--------------|-------|
| `resource.attributes.service.name` | `ml_app`、`tags.service` | |
| `name` | `name` | 存在する場合は `gen_ai.tool.name` によって上書きされます |
| `parent_span_id` | `parent_id` | |
| `start_time_unix_nano` | `start_ns` | |
| `end_time_unix_nano` | `duration` | end - start を計算|
0 より大きい場合 | `status.code` | `status` | `error`、そうでなければ `ok` |
| `status.message` | `meta.error.message` | |
| `attributes.error.type` | `meta.error.type` | |

#### スパン種別の解決 {#span-kind-resolution}

| `gen_ai.operation.name` | Agent Observability `span.kind` |
|-------------------------|-------------------|
| `generate_content`、`chat`、`text_completion`、`completion` | `llm` |
| `embeddings`、`embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`、`create_agent` | `agent` |
| `rerank`、`unknown`、*(デフォルト)* | `workflow` |

#### モデル情報 {#model-information}

| OTel 属性 | Agent Observability フィールド | メモ |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | 上記の解決表を参照してください |
| `gen_ai.provider.name` | `meta.model_provider` | `gen_ai.system` にフォールバックし、その後 `custom` | にフォールバックします
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | `response.model` が存在しない場合、フォールバックします |

#### トークン使用量メトリクス {#token-usage-metrics}

| OTel 属性 | Agent Observability フィールド |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### リクエストパラメーター {#request-parameters}

すべての `gen_ai.request.*` パラメーターは、プレフィックスが削除された `meta.metadata.*` にマッピングされます。

| OTel 属性 | Agent Observability フィールド |
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

| OTel 属性 | Agent Observability フィールド | メモ |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | スパン名を上書きします |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | 解析された JSON 配列 |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### セッションと会話 {#session-and-conversation}

| OTel 属性 | Agent Observability フィールド | メモ |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | また、`metadata.conversation_id` とタグにも追加されます |

APM トレースの最上位スパンが gen_ai スパンではない場合 (たとえば、複数の LLM を並列で呼び出す HTTP ハンドラーなど)、Agent Observability はその APM トレース内の上位 gen_ai スパンそれぞれに対して個別の Agent Observability トレースを生成します。これらの分割されたトレースを UI 上でグループ化しておくには、APM トレース内の各 gen_ai スパンで `gen_ai.conversation.id` を同じ値に設定します。Agent Observability は `session_id` でグループ化するため、Agent Observability のトレース ID が異なっていても、結果として得られるトレースはまとめて表示されます。これは、リクエスト間の会話のグループ化に使用される属性と同じです。

#### スパンリンク {#span-links-1}

GenAI スパンに設定したスパンリンクは、対応する Agent Observability スパン上で `span_links` として表示されます。

| OTel スパンリンクフィールド | Agent Observability フィールド | メモ |
|----------------------|--------------|-------|
| `trace_id` | `span_links[].trace_id` | 128 ビットのトレース ID は 16 進数として出力されます。同じトレース内のスパンへのリンクは、そのスパンの Agent Observability トレース ID に解決されます。|
| `span_id` | `span_links[].span_id` | 10 進数|
| `attributes` | `span_links[].attributes` | 属性キー内のドットはアンダースコアに置き換えられます (たとえば、`messaging.operation` は `messaging_operation` になります)。|

同じトレース内のスパン間のリンクは、そのトレースの実行グラフ内のエッジとして描画されます。

#### レスポンス属性 {#response-attributes}

| OTel 属性 | Agent Observability フィールド |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### 入力および出力メッセージ {#input-and-output-messages}

入力および出力メッセージは、以下のソースから優先順位順に抽出されます。

1. 直接属性: `gen_ai.input.messages`、`gen_ai.output.messages`、`gen_ai.system_instructions`
2. 名前が `gen_ai.client.inference.operation.details` のスパンイベント (`meta["events"]`)

| OTel ソース | Agent Observability フィールド | メモ |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages` (llm) / `meta.input.value` (その他) | |
| `gen_ai.output.messages` | `meta.output.messages` (llm) / `meta.output.value` (その他) | |
| `gen_ai.system_instructions` | 入力の先頭に追加されます | システムロールメッセージとして追加されます |

##### メッセージ内のメディア {#media-in-messages}

メディアを保持するメッセージ部分は、メッセージ上の型指定された `audio_parts` フィールドと `image_parts` フィールドに抽出されます。

| パートタイプ | 動作 |
|-----------|----------|
| `blob` (`mime_type` およびインラインバイトを含む)| `image_parts` または `audio_parts` に抽出されます。`modality` がない場合、MIME タイプから推論されます。|
| `uri`、base64 画像データ URI を保持するもの、たとえば、`data:image/png;base64,...` | `image_parts` に抽出されます。|
| `uri`、リモート URL を保持するもの|  テキスト参照 `[<modality>: <uri>]` として記録されます。URL はフェッチされません。|
| `file`、次を伴うもの: `file_id` |  テキスト参照 `[<modality> file: <file_id>]` として記録されます。|

メディアが他のパーツの中でその位置を維持できるように、`[image blob: image/png]` のような位置マーカーもメッセージテキストに追加されます。

音声は `blob` パーツを通じてのみ `audio_parts` に到達します。`uri` パーツ上の音声データ URI はテキストとして記録されます。また、慣習によりインライン base64 データのパーツタイプとして `blob` が指定されているため、音声と画像の両方に `blob` を使用することをお勧めします。

トレースビューでレンダリングされるフォーマットおよび適用されるサイズ制限については、『[マルチモーダルサポート](/llm_observability/instrument/multimodal/)』を参照してください。

##### 埋め込みスパン {#embedding-spans}

| OTel ソース | Agent Observability フィールド |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| 該当なし | `meta.output.value` = `[N embedding(s) returned]` |

#### タグ {#tags}

タグはスパンに直接配置されます。

- 非 `gen_ai.*` 属性は `key:value` タグに変換されます
- 不明な `gen_ai.*` キーは、プレフィックスを削除して追加されます
- 以下は除外されます: `_dd.*`、`llm.*`、`ddtags`、`events`、およびすでに特定的にマッピングされた `gen_ai.*` キー

<div class="alert alert-info">Agent Observability のスパンフィールドに明示的にマッピングされていないすべての <code>gen_ai.*</code> 属性は、LLM スパンのタグに格納され、各値の上限は 256 文字です。この制限を超える値は切り詰められます。すべてのその他の非<code>gen_ai</code> 属性は破棄されます。</div>

#### カスタムメタデータ {#custom-metadata}

スパンのタグではなく `meta.metadata` フィールドに構造化メタデータを追加するには、`_dd.ml_obs.metadata` 属性を JSON **オブジェクト** 文字列に設定します。そのキーと値 (ネストされたオブジェクトや配列を含む) は `meta.metadata` にマージされ、UI 上で JSON としてレンダリングされます。

```python
import json

span.set_attribute("_dd.ml_obs.metadata", json.dumps({
    "experiment": "a/b",
    "config": {
        "retry": {"max": 3, "backoff": "exp"},
        "feature_flags": ["new_ranker", "fast_path"],
    },
}))
```

注:

- 値は任意にネストできます。タグとは異なり、メタデータには値あたり 256 文字の制限はありません。
- 属性から`gen_ai.*`派生したメタデータと競合するキー (例: `temperature`) は、ユーザーの値によって上書きされます。ただし、予約されている `model_name` および `model_provider` は例外です。
- 値は JSON オブジェクトであることが必要です。有効な JSON ではない値、またはトップレベルの配列やスカラーである値は破棄されます。

### OpenLLMetry 属性マッピング {#openllmetry-attribute-mappings}

このセクションでは、標準の OpenTelemetry GenAI セマンティック規約と異なる、またはそれを拡張する OpenLLMetry 特有の属性マッピングについて説明します。

#### スパン種別の解決 {#span-kind-resolution-1}

`llm.request.type` は `gen_ai.operation.name` が存在しない場合のフォールバックとして使用されます。

| `llm.request.type` | Agent Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`、*(デフォルト)* | `workflow` |

#### モデル情報 {#model-information-1}

| OpenLLMetry 属性 | Agent Observability フィールド | メモ |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | `gen_ai.provider.name` が存在しない場合のフォールバック |

#### トークン使用量メトリクス {#token-usage-metrics-1}

| OpenLLMetry 属性 | Agent Observability フィールド | メモ |
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

| OpenLLMetry ソース | Agent Observability フィールド |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### タグのフィルタリング {#tags-filtering}

以下の OpenLLMetry 特有の属性は、タグからフィルタリングされます。

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

### OpenInference 属性マッピング {#openinference-attribute-mappings}

Agent Observability は、`openinference.span.kind` 属性が存在し、空でない場合に OpenInference スパンを認識します。以下のセクションでは、Agent Observability フィールドにマッピングされる OpenInference 属性について説明します。

#### スパン種別の解決 {#span-kind-resolution-2}

`gen_ai.operation.name` と `openinference.span.kind` の両方が存在する場合、`gen_ai.operation.name` が優先されます。

| `openinference.span.kind` | Agent Observability `span.kind` |
|---------------------------|---------------------------------|
| `LLM` | `llm` |
| `EMBEDDING` | `embedding` |
| `TOOL` | `tool` |
| `AGENT` | `agent` |
| `RETRIEVER` | `retrieval` |
| `CHAIN`、`RERANKER`、`GUARDRAIL`、`EVALUATOR`、`PROMPT`、その他の値 | `workflow` |

#### モデル情報 {#model-information-2}

| OpenInference 属性 | Agent Observability フィールド | メモ |
|-------------------------|---------------------------|-------|
| `llm.provider` | `meta.model_provider` | 推奨される OpenInference プロバイダーソース |
| `llm.system` | `meta.model_provider` | が存在しない場合`llm.provider`のフォールバック |
| `llm.model_name` | `meta.model_name` | |
| `embedding.model_name` | `meta.model_name` | 埋め込みスパンのフォールバック |

`llm` および `embedding` スパンの場合、プロバイダーまたはモデルの値が欠落していると `unknown` に設定されます。

#### トークン使用量メトリクス {#token-usage-metrics-2}

| OpenInference 属性 | Agent Observability フィールド |
|-------------------------|---------------------------|
| `llm.token_count.prompt` | `metrics.prompt_tokens` |
| `llm.token_count.completion` | `metrics.completion_tokens` |
| `llm.token_count.total` | `metrics.total_tokens` |
| `llm.token_count.prompt_details.cache_read` | `metrics.cache_read_input_tokens` |
| `llm.token_count.prompt_details.cache_write` | `metrics.cache_write_input_tokens` |
| `llm.token_count.completion_details.reasoning` | `metrics.reasoning_output_tokens` |

#### セッション、ユーザー、およびメタデータ {#session-user-and-metadata}

| OpenInference 属性 | Agent Observability フィールド | メモ |
|-------------------------|---------------------------|-------|
| `session.id` | `session_id` | また、`session_id` および `conversation_id` タグを追加し、セッションをトレースルートに伝播します |
| `user.id` | `tags` | `user_id:<value>` | として追加されます
| `tag.tags` | `tags` | 各リスト項目はスパンタグになります |
| `llm.invocation_parameters` | `meta.metadata` | JSON オブジェクトとして解析されます |
| `metadata` | `meta.metadata` | JSON オブジェクトとして解析されます |

`llm.invocation_parameters` および `metadata` 内の予約済み Agent Observability フィールドは、専用のスパンフィールドを上書きしません。

#### ツール属性 {#tool-attributes-1}

| OpenInference 属性 | Agent Observability フィールド | メモ |
|-------------------------|---------------------------|-------|
| `tool.name` | `name` | スパン名を上書きします |
| `tool.id` | `meta.metadata.tool_id` | |
| `tool.description` | `meta.metadata.tool_description` | |
| `tool.parameters` | `meta.metadata.tool_parameters` | |
| `input.value` | `meta.input.value` | `tool`、`agent`、および `workflow` スパンに直接使用されます |
| `output.value` | `meta.output.value` | `tool`、`agent`、および `workflow` スパンに直接使用されます |

#### 入力および出力メッセージ {#input-and-output-messages-2}

これらの属性において、`<direction>` は `input` または `output` です。
入力および出力は、以下のソースから優先順位順に抽出されます。

1. OpenTelemetry `gen_ai.*` 直接属性およびスパンイベント
2. OpenLLMetry インデックス付き属性
3. OpenInference インデックス付き属性
4. OpenInference `input.value` および `output.value`

| OpenInference ソース | Agent Observability フィールド |
|----------------------|---------------------------|
| `llm.input_messages.<index>.*` | `meta.input.messages` (llm) / `meta.input.value` (その他のスパンの種類) |
| `llm.output_messages.<index>.*` | `meta.output.messages` (llm) / `meta.output.value` (その他のスパンの種類) |
| `input.value` | 入力フォールバック |
| `output.value` | 出力フォールバック |

以下のインデックス付きメッセージ属性がサポートされています。

| OpenInference 属性 | マッピング |
|-------------------------|---------|
| `llm.<direction>_messages.<message-index>.message.role` | メッセージロール |
| `llm.<direction>_messages.<message-index>.message.content` | テキストコンテンツ |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.text` | 順序付きテキストコンテンツ |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.image.image.url` | 順序付き画像コンテンツ |
| `llm.<direction>_messages.<message-index>.message.tool_calls.<tool-index>.tool_call.*` | ツール呼び出し ID、名前、および引数 |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.tool_call.*` | 順序付きコンテンツ内のツール呼び出し |
| `llm.<direction>_messages.<message-index>.message.tool_call_id` | メッセージロールが `tool` | の場合、ツール呼び出し ID

画像コンテンツは、他のメッセージコンテンツ内での位置を保持したまま、画像 URI にマッピングされます。

#### 埋め込みスパン {#embedding-spans-2}

| OpenInference ソース | Agent Observability フィールド |
|----------------------|---------------------------|
| `embedding.embeddings.<index>.embedding.text` | `meta.input.documents[].text` |
| 該当なし | `meta.output.value` = `[N embedding(s) returned]` |

#### 取得スパン {#retrieval-spans}

| OpenInference ソース | Agent Observability フィールド |
|----------------------|---------------------------|
| `input.value` | `meta.input.value` |
| `retrieval.documents.<index>.document.content` | `meta.output.documents[].text` |
| `retrieval.documents.<index>.document.id` | `meta.output.documents[].id` |
| `retrieval.documents.<index>.document.score` | `meta.output.documents[].score` |
| `retrieval.documents.<index>.document.metadata` | `meta.output.documents[].metadata` (解析済み JSON オブジェクト)|

#### タグのフィルタリング {#tags-filtering-1}

`llm.*`、`retrieval.*`、`embedding.*`、および `reranker.*` プレフィックスを持つ OpenInference 属性は、タグから除外されます。`input.value`、`output.value`、`metadata`、`tag.tags`、および `tool.parameters` などの具体的にマッピングされた値も、重複タグから除外されます。

値が 256 文字以下のその他の空ではない OpenInference 属性は、`key:value` タグとして追加されます。`tag.tags` リストは直接スパンタグに昇格されます。

### Langfuse 属性マッピング {#langfuse-attribute-mappings}

このセクションでは、[Langfuse のネイティブ OpenTelemetry インスツルメンテーション][13] を使用するアプリケーション向けの、Langfuse 固有の属性マッピングを説明します。

#### 検出 {#detection}

スパンは、空でない `langfuse.observation.type` 属性を持つ場合に Langfuse スパンとして扱われます。この属性は、`gen_ai.operation.name` が存在しない場合のスパン種別解決のフォールバックとしても使用されます。

#### スパン種別の解決 {#span-kind-resolution-3}

| `langfuse.observation.type` | Agent Observability `span.kind` |
|------------------------------|-------------------|
| `generation` | `llm` |
| `embedding` | `embedding` |
| `tool` | `tool` |
| `agent` | `agent` |
| `retriever` | `retrieval` |
| `span`、`event`、`chain`、`evaluator`、`guardrail`、*(デフォルト)* | `workflow` |

#### モデル情報 {#model-information-3}

| Langfuse 属性 | Agent Observability フィールド | メモ |
|---------------------|--------------|-------|
| `langfuse.observation.metadata.ls_provider` | `meta.model_provider` | |
| `langfuse.observation.model.name` | `meta.model_name` | `gen_ai.response.model` および `gen_ai.request.model` が存在しない場合のフォールバック |

#### トークン使用量メトリクス {#token-usage-metrics-3}

`langfuse.observation.usage_details` は JSON オブジェクトです。各キーは Agent Observability メトリクスにマッピングされ、`gen_ai.usage.*` 属性からまだ設定されていないメトリクスのフォールバックとして使用されます。

| Langfuse 使用量キー | Agent Observability フィールド |
|----------------------|--------------|
| `input`、`input_tokens` | `metrics.input_tokens` |
| `output`、`output_tokens` | `metrics.output_tokens` |
| `total`、`total_tokens` | `metrics.total_tokens` |
| `prompt_tokens` | `metrics.prompt_tokens` |
| `completion_tokens` | `metrics.completion_tokens` |
| `cache_creation_input_tokens` | `metrics.cache_write_input_tokens` |
| `cache_read_input_tokens`、`cached_tokens` | `metrics.cache_read_input_tokens` |
| `reasoning_tokens` | `metrics.reasoning_output_tokens` |

#### 入力および出力メッセージ {#input-and-output-messages-3}

`langfuse.observation.input` および `langfuse.observation.output` は、チャットメッセージ配列、単一のメッセージオブジェクト、または任意の JSON/ 文字列コンテンツである JSON エンコードされた値を保持します。これらは優先順位が最も低いソースであり、使用されるのは `gen_ai.*` メッセージ属性が存在しない場合のみです。

各メッセージは、パーツベースのメッセージ形式に変換されます。

- `content` 文字列は `text` パーツになります。
- `content` ブロック配列は、`image_url` ブロックを `uri` パーツに、`text` ブロックを `text` パーツに変換します。その他のブロックはシリアル化されたテキストとして保持されます。
- メッセージ上の `tool_calls` 配列は `tool_call` パーツになります。
- `role: tool` および `tool_call_id` を持つメッセージは、`tool_result` パーツになります。

##### ツールスパン {#tool-spans}

`tool`、`agent`、および `workflow` スパンの場合、標準の`gen_ai.tool.call.*` フォールバックの後に、`langfuse.observation.input`/`langfuse.observation.output` が `input.value`/`output.value` として直接使用されます。

##### 取得スパン {#retrieval-spans-1}

`retrieval` スパンの場合、`langfuse.observation.input` が `meta.input.value` のクエリ値として使用されます。`langfuse.observation.output` は、ドキュメントコレクション (ドキュメントオブジェクトの配列、文字列の配列、または単一のドキュメントオブジェクト) として `meta.output.documents` に解析されます。各ドキュメントオブジェクトの `text`、`content`、または `page_content` キー (この順序でチェックされます) は、`id`、`score`、および `metadata` キーとともに `text` にマッピングされます。

##### 埋め込みスパン {#embedding-spans-3}

`embedding` スパンの場合、`langfuse.observation.input` は取得ドキュメントと同様の方法で `meta.input.documents[].text` に解析され、空ではないテキストを持つドキュメントのみが保持されます。

#### セッション、ユーザー、メタデータ、およびタグ {#session-user-metadata-and-tags}

| Langfuse 属性 | Agent Observability フィールド | メモ |
|-----------------------|--------------|-------|
| `langfuse.session.id` | `session_id` | `gen_ai.conversation.id` が存在しない場合のフォールバック |
| `langfuse.user.id` | `user_id:`タグ | 標準のユーザー ID 属性が存在しない場合のフォールバック |
| `langfuse.observation.model.parameters` | `meta.metadata.*` | JSON オブジェクトはメタデータにマージされ、予約済みキー (`model_name`、`model_provider`) はスキップされます |
| `langfuse.trace.metadata.*`、`langfuse.observation.metadata.*` | `meta.metadata.*` | プレフィックスが削除され、メタデータにマージされ、予約済みキーはスキップされます |
| `langfuse.trace.tags` | タグに追加されます | 文字列の JSON 配列 |

#### タグのフィルタリング {#tags-filtering-2}

以下の Langfuse 固有の属性は、他の場所で使用されるため、タグからフィルタリングされます。

- `langfuse.internal.*`、`langfuse.observation.metadata.*`、`langfuse.trace.metadata.*` (プレフィックス)
- `langfuse.observation.input`、`langfuse.observation.output`、`langfuse.observation.model.name`、`langfuse.observation.model.parameters`、`langfuse.observation.usage_details`、`langfuse.observation.cost_details`、`langfuse.observation.completion_start_time`
- `langfuse.trace.input`、`langfuse.trace.output`、`langfuse.trace.metadata`、`langfuse.trace.tags`
- `langfuse.experiment.item.expected_output`、`langfuse.experiment.item.metadata`、`langfuse.experiment.metadata`

## マッピング警告のトラブルシューティング {#troubleshooting-mapping-warnings}

インジェスト時に、Agent Observability は入力メッセージの欠落やトークン数が解析不能などのスパンマッピングの問題を検出します。影響を受けるスパンには、警告なしで失敗するのではなく、フラグが立てられます。

フラグが立てられたスパンには、スパン詳細パネルで**マッピング警告**インジケーターが表示されます。インジケーターを選択すると、そのスパンのマッピング警告が開きます。各エントリには、影響を受ける属性、推奨される修正方法、および[属性マッピングリファレンス](#attribute-mapping-reference)へのリンクが記載されています。

各警告には、評価のスキップやコスト見積もりの利用不可など、ダウンストリームへの影響に関する簡単な説明も含まれています。

マッピング警告はインジェスト時に検出されます。これらは課金やスパンの保持には影響しません。

### マッピング警告リファレンス {#mapping-warning-reference}

Datadog がチェックを追加した場合、スパンは以下のテーブルに記載されていない警告を表示することがあります。これらは、警告をトリガーしたチェックに基づいて生成されたタイトルとともにレンダリングされます。

**検索値**は、スパンに保存されている値を示します。`@collection_errors` 属性とともに使用して、フラグが立てられたスパンを検索します (たとえば、`@collection_errors:otel_warning_missing_model_name`)。

| 警告 | 検索値 (`@collection_errors:`) | 属性 | 修正 |
|---------|--------------------------------------|-----------|-----|
| モデル名がない | `otel_warning_missing_model_name` | 期待値 `gen_ai.response.model` | `gen_ai.response.model` を直接出力してください。そうすれば、`gen_ai.request.model` からモデル名を解析する必要がなくなります。|
| モデルプロバイダーがない | `otel_warning_missing_model_provider` | 期待値 `gen_ai.provider.name` | `gen_ai.provider.name` を直接出力してください。そうすれば、`gen_ai.system` からプロバイダーを推論する必要がなくなります。|
| モデル識別子の形式が正しくない | `otel_warning_strands_model_malformed` | 対象 `gen_ai.request.model` | `gen_ai.response.model` を直接出力してください。そうすれば、`gen_ai.request.model` からモデル名を解析する必要がなくなります。|
| 入力の形式が正しくない | `otel_warning_input_malformed` | 対象 `gen_ai.input.messages` | 有効な JSON メッセージ配列として `gen_ai.input.messages` を出力してください。|
| 出力の形式が正しくない | `otel_warning_output_malformed` | 対象 `gen_ai.output.messages` | 有効な JSON メッセージ配列として `gen_ai.output.messages` を出力してください。|
| メッセージの形式が正しくない | `otel_warning_message_malformed` | 対象 `gen_ai.input.messages` | 各メッセージを `role` フィールドと `content` フィールド付きで出力してください。|
| 空のメッセージコンテンツ | `otel_warning_invalid_parts` | 対象 `gen_ai.output.messages` | `content` 文字列、または認識できる `type` (たとえば、`text`、`tool_call`、`tool_call_response`) を持つ `parts` エントリを出力してください。|
| 埋め込み入力がない | `otel_warning_embedding_input_missing` | 期待値 `gen_ai.input.messages` | `gen_ai.input.messages` を埋め込みテキストに設定してください。|
| 埋め込み入力の形式が正しくない | `otel_warning_embedding_input_malformed` | 対象 `gen_ai.input.messages` | 有効な JSON メッセージ配列として `gen_ai.input.messages` を出力してください。|
| トークン数が読み取り不能 | `otel_warning_token_usage_unparseable` | 対象 `gen_ai.usage.input_tokens` | トークン数は文字列やオブジェクトではなく、整数として出力してください。|
| トークン数が無効 | `otel_warning_token_usage_invalid` | 対象 `gen_ai.usage.input_tokens` | 負ではない整数のトークン数を出力してください。|
| コストメトリクスが読み取り不能 | `otel_warning_cost_metrics_unparseable` | 対象 `gen_ai.cost.estimated_total` | コストメトリクスは文字列やオブジェクトではなく、整数または浮動小数点数として出力してください。|
| コストメトリクスが無効 | `otel_warning_cost_metrics_invalid` | 対象 `gen_ai.cost.estimated_total` | 負ではないコスト値を出力してください。|
| 呼び出しパラメータの形式が正しくない | `otel_warning_params_malformed` | 呼び出しパラメータが対象 | 呼び出しパラメータを有効な JSON オブジェクトとして出力するか、個別に `gen_ai.request.*`属性 (`temperature`、`top_p`、`max_tokens` など) として設定してください。|
| ツール定義の形式が正しくない | `otel_warning_tool_definitions_malformed` | 対象 `gen_ai.tool.definitions` | 有効な JSON ツール定義配列として `gen_ai.tool.definitions` を出力してください。|
| ツール定義の形式が正しくない | `otel_warning_tool_definition_entry_malformed` | 対象 `gen_ai.tool.definitions` | 各ツール定義に `name` を指定し、その `parameters` を JSON オブジェクトにしてください。|
| ツール名なし | `otel_warning_tool_span_name_missing` | 期待値 `gen_ai.tool.name` | ツールスパンに `gen_ai.tool.name` を設定してください。|
| ツール呼び出し名なし | `otel_warning_tool_call_name_missing` | 対象 `gen_ai.output.messages` | 各ツール呼び出しに `name` を指定してください。|
| 操作名なし | `otel_warning_operation_missing` | 期待値 `gen_ai.operation.name` | `gen_ai.operation.name` を `chat`、`text_completion`、`embeddings`、`execute_tool`、`invoke_agent`、または `retriever` のいずれかに設定してください。|
| スパンイベントの形式が正しくない | `otel_warning_failed_to_parse_span_events` | `events` | スパンイベントで有効な JSON を出力するか、`gen_ai.input.messages` と `gen_ai.output.messages` を直接設定してください。|
| ドキュメントスコアが読み取り不能 | `otel_warning_failed_to_parse_document_score` | 対象 `output.documents` | 各ドキュメントスコアを数値として出力してください。|
| ドキュメントメタデータの形式が正しくない | `otel_warning_document_metadata_malformed` | `output.documents` | 各ドキュメントのメタデータを JSON オブジェクトとして出力してください。|
| 認識されないインスツルメンテーション | `otel_warning_spec_version_unknown` | 期待値 `gen_ai.operation.name` | Datadog がインスツルメンテーションを識別できるように、`gen_ai.operation.name` と `gen_ai.system` を設定してください。|

### フラグが立てられたスパンの生の属性を検索する {#find-raw-span-attributes-for-a-flagged-span}

フラグが立てられたスパンについて Datadog が受信した生の属性を確認するには、以下を行います。

- APM が有効な場合、同じデータが対応する APM トレースにも書き込まれます。リンクされた APM トレースを開いて、生のスパン属性を調査します。
- 生の属性を、[マッピング警告リファレンス](#mapping-warning-reference)または完全な[属性マッピングリファレンス](#attribute-mapping-reference)の期待される属性と比較してください。2 つのビューの関係については、[Agent Observability と APM の関連付け][14] を参照してください。
- 不正な形式の警告については、属性値が有効な JSON であるかどうかを確認してください。一般的な原因として、二重エンコード、切り捨て、オブジェクトが期待されているのに文字列やその他の非オブジェクト値が出力されていることなどが挙げられます。
- 属性の欠落に関する警告については、[テスト済みのフレームワークとライブラリ](#tested-frameworks-and-libraries)テーブルと照らし合わせてインスツルメンテーションライブラリのバージョンを確認し、ライブラリで必要な場合は `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` が設定されていることを確認してください。

## サポートされているセマンティック規約 {#supported-semantic-conventions}

Agent Observability は、生成 AI 向け OpenTelemetry 1.37+ セマンティック規約に従うスパンをサポートしています。具体的には以下のとおりです。

- LLM 操作に `gen_ai.provider.name`、`"gen_ai.operation.name"`、`gen_ai.request.model`、およびその他の gen_ai 属性がある
- 操作の入出力が直接スパン属性またはスパンイベントを介している
- トークン使用量メトリクス (`gen_ai.usage.input_tokens`、`gen_ai.usage.output_tokens`)
- モデルパラメーターおよびメタデータ

サポートされる属性とその仕様の完全な一覧については、[生成 AI 向け OpenTelemetry セマンティック規約ドキュメント][1] を参照してください。

## Agent Observability 変換の無効化 {#disabling-agent-observability-conversion}

生成 AI スパンを APM 内に留め、Agent Observability に表示したくない場合は、`dd_llmobs_enabled` 属性を `false` に設定することで自動変換を無効にできます。トレース内の任意のスパンにこの属性を設定すると、トレース全体が Agent Observability に変換されなくなります。

### 環境変数の使用 {#using-environment-variables}

`dd_llmobs_enabled=false` 属性を `OTEL_RESOURCE_ATTRIBUTES` 環境変数に追加してください。

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### コードの使用 {#using-code}

トレース内の任意のスパンで属性をプログラムで設定することもできます。

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

with tracer.start_as_current_span("my-span") as span:
    # Disable Agent Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://github.com/open-telemetry/semantic-conventions-genai
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /ja/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /ja/llm_observability/investigate/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /ja/account_management/rbac/data_access/
[9]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[10]: /ja/opentelemetry/compatibility/#feature-compatibility
[11]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
[12]: https://arize-ai.github.io/openinference/spec/semantic_conventions.html
[13]: https://langfuse.com/integrations/native/opentelemetry
[14]: /ja/llm_observability/instrument/agent_observability_and_apm/