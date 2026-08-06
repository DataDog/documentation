---
description: GenAI 시맨틱 규칙을 사용하여 OpenTelemetry를 사용하는 LLM 애플리케이션을 계측하고 Datadog SDK 없이
  트레이스를 Datadog LLM Observability에 전송하세요.
title: OpenTelemetry 계측
---
## 개요 {#overview}
생성형 AI 작업에 대한 OpenTelemetry의 표준화된 시맨틱 규칙을 사용하면 각종 OpenTelemetry 호환 라이브러리 또는 프레임워크를 사용하는 LLM 애플리케이션을 계측하고 트레이스를 LLM Observability에서 시각화할 수 있습니다.

LLM Observability는 [생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙][1]을 따르는 OpenTelemetry 트레이스 수집을 지원합니다. 이렇게 하면 OpenTelemetry로 계측한 애플리케이션에서 직접 LLM 트레이스를 Datadog으로 전송할 수 있고 Datadog LLM Observability SDK 또는 Datadog Agent가 필요하지 않습니다.

## 전제 조건 {#prerequisites}

- [Datadog API 키][2]
- [생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙][1]에 따라 트레이스를 발생시키는 OpenTelemetry로 계측한 애플리케이션

OpenTelemetry 스팬에 대하여 <a href="/llm_observability/evaluations/external_evaluations#submitting-external-evaluations-with-the-api">외부 평가를 API로 직접</a> 전송하려면 평가에 <code>source:otel</code> 태그를 포함해야 합니다. 스팬을 참조할 때는 <code>span_id</code> 및 <code>trace_id</code> 를 십진수 문자열로 제공하세요. OpenTelemetry는 기본적으로 16진수 ID를 사용하므로, 평가를 제출하기 전에 십진수로 변환하세요. 예를 들어 Python의 <code>int(hex_span_id, 16)</code> 를 사용하여 16진수 스팬 ID를 그에 상응하는 십진수로 변환합니다.

OpenTelemetry 스팬과 함께 Prompt Tracking을 사용하는 방법에 관한 자세한 내용은 <a href="/llm_observability/monitoring/prompt_tracking#opentelemetry-instrumentation">Prompt Tracking - OpenTelemetry 계측</a>을 참조하세요.

OpenTelemetry 스팬은 <a href="/llm_observability/experiments/setup#using-opentelemetry-spans-inside-experiments">LLM Observability Experiments</a> 내에서도 사용할 수 있습니다. 코드 <code>DD_TRACE_OTEL_ENABLED=1</code>를 설정하면 실험 작업 안에서 생성된 OTel 스팬이 해당 실험 스팬의 하위 항목으로 자동으로 표시됩니다.

## 설정 {#setup}

OpenTelemetry 트레이스를 LLM Observability로 전송하려면 다음 설정을 사용하여 OpenTelemetry Exporter를 구성하세요.

### 구성 {#configuration}

애플리케이션에 다음 환경 변수를 설정합니다.

```
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT={{< region-param key="otlp_trace_endpoint" code="true" >}}
OTEL_EXPORTER_OTLP_TRACES_HEADERS=dd-api-key=<YOUR_API_KEY>,dd-otlp-source=llmobs
```

`<YOUR_API_KEY>`를 [Datadog API 키][2]로 대체합니다.

프레임워크가 이전에 1.37 이전 OpenTelemetry 사양 버전을 지원한 경우, 다음도 설정해야 합니다.

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

이 환경 변수는 현재 버전 1.37+ 시맨틱 규칙을 지원하지만 이전에 구형 버전을(예를 들어 [strands-agents][5]) 지원했던 프레임워크에 대하여 1.37+ 버전과 호환되는 OpenTelemetry 트레이스를 활성화합니다.

**참고**:
* 기본 OpenTelemetry SDK 외의 OpenTelemetry 라이브러리를 사용 중인 경우, 라이브러리의 API에 따라 엔드포인트, 프로토콜 및 헤더를 다르게 구성해야 할 수 있습니다. 적절한 구성 방법은 라이브러리의 설명서를 참조하세요.
* OpenTelemetry 계측을 사용할 때, LLM Observability로 전송되는 일부 데이터가 상응하는 APM 트레이스에도 기록될 수 있습니다. 민감한 데이터를 보호 중인 경우, APM에서 LLM Observability 액세스 제어에 일치하도록 Restricted Dataset를 구성하는 방안도 고려하세요. 자세한 내용은 [Data Access Control][8]을 참조하세요.

#### strands-agents 사용 {#using-strands-agents}

[`strands-agents` 라이브러리][5]를 사용 중인 경우, OpenTelemetry v1.37+과 호환되는 트레이스를 활성화하기 위해 추가적인 환경 변수를 설정해야 합니다.

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

이 환경 변수를 사용하면 `strands-agents`가 LLM Observability에 필수인, 생성형 AI에 대한 OpenTelemetry v1.37+ 시맨틱 규칙을 따르는 트레이스를 발생시키도록 보장합니다.

### 계측 {#instrumentation}

LLM Observability와 호환되는 트레이스를 생성하려면 다음 중 한 가지 작업을 수행합니다.

- [생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙][1]에 따라 스팬을 발생시키는 OpenTelemetry 라이브러리 또는 계측 패키지를 사용합니다.
- 시맨틱 규칙에 정의된 대로 필요한 `gen_ai.*` 속성이 있는 스팬을 생성하는 사용자 지정 OpenTelemetry 계측을 생성합니다.

애플리케이션이 데이터를 전송하기 시작하면 트레이스가 [**LLM Observability Traces** 페이지][3]에 자동으로 나타납니다. UI에서 트레이스를 검색하려면 `ml_app` 속성을 사용하세요. 이 속성은 OpenTelemetry 루트 스팬의 `service` 속성의 값으로 자동으로 설정됩니다.

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> 버전 0.47+가 지원됩니다. <a href="#using-openllmetry">OpenLLMetry 예시</a>를 참조하세요.
<li/> OpenInference는 지원되지 않습니다.
<li/> 트레이스를 전송하고 해당 트레이스가 LLM Observability Traces 페이지에 표시되기까지 3~5분의 지연 시간이 있을 수 있습니다. APM을 활성화한 경우, 트레이스가 즉시 APM Traces 페이지에 표시됩니다.
</ul>
</div>

## 테스트된 프레임워크 및 라이브러리 {#tested-frameworks-and-libraries}

이러한 프레임워크 및 라이브러리는 Datadog LLM Observability로 테스트되었습니다. [OpenTelemetry 1.37+ GenAI 시맨틱 규칙][1]과 호환되는 스팬을 발생시키는 모든 프레임워크가 지원됩니다.

{{< tabs >}}
{{% tab "Python" %}}
| 프레임워크 | 계측 | 지원되는 버전 |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | 기본 | >= 1.11.0 |
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
| 프레임워크 | 계측 | 지원되는 버전 |
|-----------|----------------|--------------------|
| [OpenAI][40] | [`@opentelemetry/instrumentation-openai`][41] | >= 4.19.0 |

[40]: https://platform.openai.com/docs/api-reference/introduction
[41]: https://www.npmjs.com/package/@opentelemetry/instrumentation-openai
{{% /tab %}}
{{% tab "Java" %}}
| 프레임워크 | 계측 | 지원되는 버전 |
|-----------|----------------|--------------------|
| [Spring AI][50] | 기본([Micrometer][51] 사용) | >= 1.0.0 |
| [LangChain4j][52] | 기본(OpenTelemetry 모듈) | >= 0.31.0 |
| [AWS Bedrock][53] | [OpenTelemetry Java Agent][54] | AWS SDK >= 2.2 |

[50]: https://docs.spring.io/spring-ai/reference/
[51]: https://micrometer.io/
[52]: https://docs.langchain4j.dev/
[53]: https://docs.aws.amazon.com/bedrock/latest/userguide/
[54]: https://opentelemetry.io/docs/zero-code/java/agent/
{{% /tab %}}
{{< /tabs >}}

## 예시 {#examples}

### Strands Agents 사용 {#using-strands-agents-1}

다음 예시는 OpenTelemetry 통합과 함께 [Strands Agents][7]를 사용하는 완전한 애플리케이션을 나타낸 것입니다. 이와 같은 접근 방식은 생성형 AI에 대한 OpenTelemetry 버전 1.37+ 시맨틱 규칙을 지원하는 모든 프레임워크에서 작동합니다.

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

### 사용자 지정 OpenTelemetry 계측 {#custom-opentelemetry-instrumentation}

다음 예시는 사용자 지정 OpenTelemetry 코드를 사용하여 LLM 애플리케이션을 계측하는 방법을 나타낸 것입니다. 이 방식으로 접근하면 애플리케이션이 발생시키는 트레이스와 스팬을 완전히 제어할 수 있습니다.

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

이 예시를 실행한 이후, LLM Observability UI에서 `ml_app:simple-llm-example`을 검색하여 생성된 트레이스를 찾으세요.

### OpenLLMetry 사용 {#using-openllmetry}

다음 예시는 [OpenLLMetry](https://github.com/traceloop/openllmetry)를 사용하여 OpenTelemetry로 OpenAI 호출을 자동으로 계측하는 작업을 나타낸 것입니다.

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

이 예시를 실행한 이후, LLM Observability UI에서 `ml_app:simple-openllmetry-test`를 검색하여 생성된 트레이스를 찾으세요.

## 속성 매핑 참조 {#attribute-mapping-reference}

이 섹션은 OpenTelemetry GenAI 시맨틱 규칙(v1.37+) 및 OpenLLMetry와 Datadog의 LLM Observability 스팬 스키마 간의 매핑을 제공합니다.

<div class="alert alert-info">OpenLLMetry별 매핑은 <a href="#openllmetry-attribute-mappings">OpenLLMetry 속성 매핑</a> 섹션에 별도로 기록했습니다.</div>

### OpenTelemetry 1.37+ 속성 매핑 {#opentelemetry-137-attribute-mappings}

#### 기본 스팬 속성 {#base-span-attributes}

| OTLP 필드 | LLM Observability 필드 | 참고 |
|------------|--------------|-------|
| `resource.attributes.service.name` | `ml_app`, `tags.service` | |
| `name` | `name` | 있는 경우 `gen_ai.tool.name`으로 재정의됨 |
| `parent_span_id` | `parent_id` | |
| `start_time_unix_nano` | `start_ns` | |
| `end_time_unix_nano` | `duration` | 계산됨: 종료 - 시작 |
| `status.code` | `status` | `error` > 0인 경우, 아니면 `ok` |
| `status.message` | `meta.error.message` | |
| `attributes.error.type` | `meta.error.type` | |

#### 스팬 종류 판별 {#span-kind-resolution}

| `gen_ai.operation.name` | LLM Observability `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(기본값)* | `workflow` |

#### 모델 정보 {#model-information}

| OTel 속성 | LLM Observability 필드 | 참고 |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | 위의 판별 표 참조 |
| `gen_ai.provider.name` | `meta.model_provider` | `gen_ai.system`, 다음으로 `custom` |으로 폴백됨
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | `response.model`이 없는 경우 폴백 |

#### 토큰 사용량 메트릭 {#token-usage-metrics}

| OTel 속성 | LLM Observability 필드 |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### 요청 파라미터 {#request-parameters}

모든 `gen_ai.request.*` 파라미터는 접두사가 제거된 `meta.metadata.*`로 매핑됩니다.

| OTel 속성 | LLM Observability 필드 |
|----------------|--------------|
| `gen_ai.request.seed` | `metadata.seed` |
| `gen_ai.request.frequency_penalty` | `metadata.frequency_penalty` |
| `gen_ai.request.max_tokens` | `metadata.max_tokens` |
| `gen_ai.request.stop_sequences` | `metadata.stop_sequences` |
| `gen_ai.request.temperature` | `metadata.temperature` |
| `gen_ai.request.top_k` | `metadata.top_k` |
| `gen_ai.request.top_p` | `metadata.top_p` |
| `gen_ai.request.choice.count` | `metadata.choice.count` |

#### 도구 속성 {#tool-attributes}

| OTel 속성 | LLM Observability 필드 | 참고 |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | 스팬 이름을 재정의함 |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | 구문 분석된 JSON 배열 |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### 세션 및 대화 {#session-and-conversation}

| OTel 속성 | LLM Observability 필드 | 참고 |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | 또한 `metadata.conversation_id` 및 태그에 추가됨 |

#### 응답 속성 {#response-attributes}

| OTel 속성 | LLM Observability 필드 |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### 입력 및 출력 메시지 {#input-and-output-messages}

입력 및 출력 메시지는 다음 소스에서 우선순위 순서대로 추출됩니다.

1. 직접 속성: `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. 이름이 `gen_ai.client.inference.operation.details`인 스팬 이벤트(`meta["events"]`)

| OTel 소스 | LLM Observability 필드 | 참고 |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages`(llm)/`meta.input.value`(기타) | |
| `gen_ai.output.messages` | `meta.output.messages`(llm)/`meta.output.value`(기타) | |
| `gen_ai.system_instructions` | 입력 앞에 추가됨 | 시스템 역할 메시지로 추가됨 |

##### 임베딩 스팬 {#embedding-spans}

| OTel 소스 | LLM Observability 필드 |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### 태그 {#tags}

태그는 스팬에 직접 배치됩니다.

- `gen_ai.*` 가 아닌 속성은 `key:value` 태그로 변환됨
- 알 수 없는 `gen_ai.*` 키가 접두사를 제거한 상태로 추가됨
- 필터링하여 제외됨: `_dd.*`, `llm.*`, `ddtags`, `events`, 및 이미 매핑된 `gen_ai.*` 키

<div class="alert alert-info">모든 <code>gen_ai.*</code> 속성이며 LLM Observability 스팬 필드에 명시적으로 매핑되지 않은 속성은 LLM 스팬의 태그에 배치되며, 여기에는 값당 256자의 한도가 적용됩니다. 이 한도를 초과하는 값은 잘립니다. 기타 모든<code>gen_ai</code> 가 아닌 속성은 삭제됩니다.</div>

### OpenLLMetry 속성 매핑 {#openllmetry-attribute-mappings}

이 섹션은 표준 OpenTelemetry GenAI 시맨틱 규칙과 다르거나 이를 확장하는 OpenLLMetry별 속성 매핑을 기록한 것입니다.

#### 스팬 종류 판별 {#span-kind-resolution-1}

`gen_ai.operation.name`이 없을 때 `llm.request.type`이 폴백으로 사용됩니다.

| `llm.request.type` | LLM Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(기본값)* | `workflow` |

#### 모델 정보 {#model-information-1}

| OpenLLMetry 속성 | LLM Observability 필드 | 참고 |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | `gen_ai.provider.name`이 없는 경우 폴백 |

#### 토큰 사용량 메트릭 {#token-usage-metrics-1}

| OpenLLMetry 속성 | LLM Observability 필드 | 참고 |
|-----------------------|--------------|-------|
| `llm.usage.total_tokens` | `metrics.total_tokens` | `gen_ai.usage.total_tokens`가 없는 경우 폴백 |

#### 입력 및 출력 메시지 {#input-and-output-messages-1}

OpenLLMetry는 JSON 배열 대신 인덱싱된 속성을 사용합니다. 이러한 항목은 우선순위가 가장 낮은 소스이며, OTel 표준 소스가 없을 때만 사용됩니다.

##### 프롬프트 속성(입력) {#prompt-attributes-input}

| OpenLLMetry 속성 | 설명 |
|-----------------------|-------------|
| `gen_ai.prompt.<index>.role` | 메시지 역할(사용자, 시스템, 어시스턴트, 도구) |
| `gen_ai.prompt.<index>.content` | 메시지 내용 |
| `gen_ai.prompt.<index>.tool_call_id` | 도구 응답 메시지에 대한 도구 호출 ID |

##### 완료 속성(출력) {#completion-attributes-output}

| OpenLLMetry 속성 | 설명 |
|-----------------------|-------------|
| `gen_ai.completion.<index>.role` | 메시지 역할 |
| `gen_ai.completion.<index>.content` | 메시지 내용 |
| `gen_ai.completion.<index>.finish_reason` | 완료 종료 이유 |

##### 매핑 {#mapping}

메시지는 OTel 호환 형식으로 변환되어 정상적으로 처리됩니다.

| OpenLLMetry 소스 | LLMObs 필드 |
|--------------------|--------------|
| `gen_ai.prompt.*` | `meta.input.messages`(llm)/`meta.input.value`(기타) |
| `gen_ai.completion.*` | `meta.output.messages`(llm)/`meta.output.value`(기타) |

#### 도구 호출 {#tool-calls}

도구 호출은 완료 속성 안에 중첩됩니다.

| OpenLLMetry 속성 | 매핑 대상 |
|-----------------------|---------|
| `gen_ai.completion.<index>.tool_calls.<idx>.name` | `tool_calls[].name` |
| `gen_ai.completion.<index>.tool_calls.<idx>.id` | `tool_calls[].tool_id` |
| `gen_ai.completion.<index>.tool_calls.<idx>.arguments` | `tool_calls[].arguments` |

##### 도구 응답 메시지 {#tool-response-messages}

`role = "tool"` 및 `tool_call_id`가 있는 경우, 메시지는 다음 도구 결과로 변환됨:

| OpenLLMetry 속성 | 매핑 대상 |
|-----------------------|---------|
| `gen_ai.prompt.<index>.tool_call_id` | `tool_results[].tool_id` |
| `gen_ai.prompt.<index>.content` | `tool_results[].result` |

#### 임베딩 스팬 {#embedding-spans-1}

임베딩 스팬의 경우 프롬프트 내용 속성에서 문서가 추출됩니다.

| OpenLLMetry 소스 | LLM Observability 필드 |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### 태그 필터링 {#tags-filtering}

다음 OpenLLMetry별 속성이 태그에서 필터링됩니다.

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

## 지원되는 시맨틱 규칙 {#supported-semantic-conventions}

LLM Observability는 생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙을 따르는 스팬을 지원하며, 예를 들면 다음과 같습니다.

- `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model` 및 기타 gen_ai 속성이 있는 LLM 작업
- 직접 스팬 속성에 있는, 또는 스팬 이벤트를 통한 작업 입력/출력
- 토큰 사용량 메트릭(`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- 모델 파라미터 및 메타데이터

지원되는 속성 및 각각의 사양 전체 목록은 [생성형 AI에 대한 OpenTelemetry 시맨틱 규칙 설명서][1]를 참조하세요.

## LLM Observability 변환 비활성화 {#disabling-llm-observability-conversion}

생성형 AI 스팬을 APM에 유지하고 LLM Observability에 표시되지 않게 하려면 `dd_llmobs_enabled` 속성을 `false`로 설정하여 자동 변환을 비활성화하면 됩니다. 트레이스의 어느 스팬에서든 이 속성을 설정하면 트레이스 전체가 LLM Observability로 변환되지 않도록 방지됩니다.

### 환경 변수 사용 {#using-environment-variables}

`dd_llmobs_enabled=false` 속성을 `OTEL_RESOURCE_ATTRIBUTES` 환경 변수에 추가:

```
OTEL_RESOURCE_ATTRIBUTES=dd_llmobs_enabled=false
```

### 코드 사용 {#using-code}

트레이스의 모든 스팬에서 프로그래밍 방식으로 속성을 설정할 수도 있습니다.

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
[4]: /ko/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /ko/llm_observability/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /ko/account_management/rbac/data_access/