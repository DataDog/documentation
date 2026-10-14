---
aliases:
- /ko/llm_observability/instrumentation/otel_instrumentation/
description: GenAI 또는 OpenInference 시맨틱 규칙을 사용하여 OpenTelemetry로 LLM 애플리케이션을 계측하고 Datadog
  SDK 없이 Agent Observability로 트레이스를 전송하세요.
title: OpenTelemetry 계측
---
## 개요 {#overview}
생성형 AI 작업에 대한 OpenTelemetry의 표준화된 시맨틱 규칙을 사용하면 OpenTelemetry와 호환되는 라이브러리나 프레임워크로 LLM 애플리케이션을 계측하고 Agent Observability에서 트레이스를 시각화할 수 있습니다.

Agent Observability는 [생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙][1] 또는 지원되는 [OpenInference 시맨틱 규칙][12]을 따르는 OpenTelemetry 트레이스 수집을 지원합니다. 이렇게 하면 Agent Observability SDK 또는 Datadog Agent 없이도 OpenTelemetry로 계측한 애플리케이션에서 직접 Datadog으로 LLM 트레이스를 전송할 수 있습니다.

## 전제 조건 {#prerequisites}

- [Datadog API 키][2]
- [생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙][1] 또는 지원되는 [OpenInference 시맨틱 규칙][12]을 따르는 트레이스를 내보내도록 OpenTelemetry로 계측된 애플리케이션

## 지원되는 기능 {#supported-features}

### 평가 {#evaluations}

OpenTelemetry 스팬에 대한 [외부 평가를 API로 직접](/llm_observability/investigate/evaluations/external_evaluations#submitting-external-evaluations-with-the-api) 전송하려면 평가에 `source:otel` 태그를 포함하세요. 스팬을 참조할 때는 `span_id` 및 `trace_id`를 10진수 문자열로 제공하세요. OpenTelemetry는 기본적으로 16진수 ID를 사용하므로, 평가를 제출하기 전에 십진수로 변환하세요. 예를 들어, Python의 `int(hex_span_id, 16)`를 사용하여 16진수 스팬 ID를 10진수로 변환하세요.

### 프롬프트 추적 {#prompt-tracking}

OpenTelemetry 스팬과 함께 프롬프트 추적을 사용하는 방법에 관한 자세한 내용은 [프롬프트 추적 - OpenTelemetry 계측](/llm_observability/instrument/prompt_tracking#opentelemetry-instrumentation)을 참조하세요.

### 실험 {#experiments}

OpenTelemetry 스팬은 [Agent Observability 실험](/llm_observability/improve/experiments/setup#using-opentelemetry-spans-inside-experiments) 내에서도 사용할 수 있습니다. `DD_TRACE_OTEL_ENABLED=1`을 설정하면 실험 작업에서 생성된 OTel 스팬이 해당 실험 스팬의 하위 스팬으로 자동으로 표시됩니다.

### 멀티모달 지원 {#multimodal-support}

OpenTelemetry 메시지의 오디오 및 이미지는 트레이스 보기에 렌더링됩니다. Datadog은 [메시지 내 미디어](#media-in-messages)에 설명된 대로 OpenTelemetry GenAI 시맨틱 규칙을 따르는 메시지 파트에서 미디어를 추출합니다.

base64 바이트로 인라인 처리된 미디어만 렌더링됩니다. 원격 URL은 텍스트 참조로 기록되며 실제로 가져오지는 않습니다. 미디어가 스팬에 도달했을 때 적용되는 필드, 형식 및 크기 제한에 대해서는 [Multimodal Support](/llm_observability/instrument/multimodal/)를 참조하세요.

### 스팬 링크 {#span-links}

부모-자식 관계가 아닌 관계(예: 한 스팬의 출력이 다른 스팬의 입력으로 전달되는 경우)를 표현하려면 GenAI 스팬에서 [OpenTelemetry 스팬 링크][9]를 사용하세요. 두 개의 링크된 스팬이 동일한 트레이스에 있으면 해당 링크는 해당 트레이스의 **Execution Graph**에 엣지로 표시되므로, 형제 스팬 간에 데이터가 어떻게 흐르는지 확인할 수 있습니다(예: 도구의 출력이 다운스트림 LLM 호출로 전달되는 경우).

{{< img src="llm_observability/instrumentation/otel-span-links-execution-graph.png" alt="다중 에이전트 콘텐츠 파이프라인 트레이스에 대한 Execution Graph입니다. 오케스트레이터에는 research-agent, writer-agent, editor-agent가 포함되어 있으며, 이들은 search_web 도구에서 연구용 LLM으로, 다시 연구에서 작성자와 편집자로 이어지는 데이터 흐름을 보여주는 스팬 링크 엣지로 연결되어 있습니다." style="width:100%;" >}}

데이터 흐름의 방향을 나타내려면 `from` 및 `to` 속성을 사용하세요.

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

<div class="alert alert-info">다른 트레이스의 스팬을 가리키는 스팬 링크는 저장되지만, 단일 트레이스를 시각화하는 Execution Graph에는 그려지지 않습니다.</div>

## 설정 {#setup}

Datadog이 OpenTelemetry 트레이스를 수집하기 위해 지원하는 모든 방법을 Agent Observability에서 사용할 수 있습니다. 지원되는 수집 경로의 전체 목록은 [OpenTelemetry 기능 호환성][10]을 참조하세요. 다음은 구성하는 한 가지 방법입니다.

OpenTelemetry 트레이스를 Agent Observability로 전송하려면 다음 설정을 사용하여 OpenTelemetry Exporter를 구성하세요.

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
* OpenTelemetry 계측을 사용할 때, Agent Observability로 전송되는 일부 데이터가 상응하는 APM 트레이스에도 기록될 수 있습니다. 민감한 데이터를 보호 중인 경우, APM에서 Agent Observability 액세스 제어에 일치하도록 Restricted Dataset를 구성하는 방안도 고려하세요. 자세한 내용은 [Data Access Control][8]을 참조하세요.

#### strands-agents 사용 {#using-strands-agents}

[`strands-agents` 라이브러리][5]를 사용 중인 경우, OpenTelemetry v1.37+과 호환되는 트레이스를 활성화하기 위해 추가적인 환경 변수를 설정해야 합니다.

```
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
```

이 환경 변수를 사용하면 `strands-agents`가 Agent Observability에 필요한 생성형 AI용 OpenTelemetry v1.37+ 시맨틱 규칙을 따르는 트레이스를 내보내도록 할 수 있습니다.

### 계측 {#instrumentation}

Agent Observability와 호환되는 트레이스를 생성하려면 다음 중 하나를 수행하세요.

- [생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙][1] 또는 지원되는 [OpenInference 시맨틱 규칙][12]에 따라 스팬을 내보내는 OpenTelemetry 라이브러리 또는 계측 패키지를 사용합니다.
- 선택한 규칙에 정의된 필수 `gen_ai.*` 또는 OpenInference 속성을 생성하는 사용자 지정 OpenTelemetry 계측을 만듭니다.

애플리케이션이 데이터를 전송하기 시작하면 트레이스가 [{{< ui >}}Agent Observability Traces{{< /ui >}} 페이지][3]에 자동으로 나타납니다. UI에서 트레이스를 검색하려면 `ml_app` 속성을 사용하세요. 이 속성은 OpenTelemetry 루트 스팬의 `service` 속성의 값으로 자동으로 설정됩니다.

<div class="alert alert-danger">
<ul>
<li/> <a href="https://traceloop.com/docs/openllmetry/getting-started-python">OpenLLMetry</a> 버전 0.47+가 지원됩니다. <a href="#using-openllmetry">OpenLLMetry 예시</a>를 참조하세요.
<li/> OpenInference 스팬이 지원됩니다. <a href="#using-openinference">OpenInference 예시</a>를 참조하세요.
<li/> <a href="https://langfuse.com/integrations/native/opentelemetry">Langfuse</a> 네이티브 OpenTelemetry 계측이 지원됩니다. <a href="#langfuse-attribute-mappings">Langfuse 속성 매핑</a>을 참조하세요.
<li/> 트레이스를 전송하고 해당 트레이스가 Agent Observability Traces 페이지에 표시되기까지 3~5분의 지연 시간이 있을 수 있습니다. APM을 활성화한 경우, 트레이스가 즉시 APM Traces 페이지에 표시됩니다.
</ul>
</div>

## 테스트된 프레임워크 및 라이브러리 {#tested-frameworks-and-libraries}

이러한 프레임워크 및 라이브러리는 Agent Observability로 테스트되었습니다. [OpenTelemetry 1.37+ GenAI 시맨틱 규칙][1] 또는 [OpenInference 시맨틱 규칙][12]에서 지원되는 속성을 내보내는 프레임워크는 Agent Observability로 스팬을 전송할 수 있습니다.

{{< tabs >}}
{{% tab "Python" %}}
| 프레임워크 | 계측 | 지원되는 버전 |
|-----------|----------------|--------------------|
| [OpenAI][20] | [`opentelemetry-instrumentation-openai-v2`][21] | >= 1.26.0 |
| [OpenAI][20] | [`openinference-instrumentation-openai`][36] | >= 1.26.0 |
| [Anthropic][22] | [`opentelemetry-instrumentation-anthropic`][23] | >= 0.51.0 |
| [Google GenAI][24] | [`opentelemetry-instrumentation-google-genai`][25] | >= 1.32.0 |
| [Google Vertex AI][26] | [`opentelemetry-instrumentation-vertexai`][27] | >= 1.64.0 |
| [AWS Bedrock][28] | [`opentelemetry-instrumentation-botocore`][29] | >= 1.31.57 |
| [LangChain][30] | [`opentelemetry-instrumentation-langchain`][31] | >= 0.3.21 |
| [LlamaIndex][32] | [`opentelemetry-instrumentation-llamaindex`][33] | >= 0.14.12 |
| [Strands Agents][5] | 기본 | >= 1.11.0 |
| [OpenLLMetry][34] | [`traceloop-sdk`][35] | >= 0.47.0 |
| [Langfuse][37] | Native | >= 4.0.0 |

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

이 예시를 실행한 후 Agent Observability UI에서 `ml_app:simple-llm-example`을 검색하여 생성된 트레이스를 찾으세요.

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

이 예시를 실행한 후 Agent Observability UI에서 `ml_app:simple-openllmetry-test`를 검색하여 생성된 트레이스를 찾으세요.

### OpenInference 사용 {#using-openinference}

다음 예시는 [OpenInference OpenAI 계측][11]을 사용하여 OpenAI 호출을 OpenTelemetry로 자동 계측합니다.

OpenTelemetry 익스포터를 구성하고 OpenAI 클라이언트를 계측하세요.

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

이 예시를 실행한 후 Agent Observability UI에서 `ml_app:simple-openinference-test`를 검색하여 생성된 트레이스를 찾으세요.

## 속성 매핑 참조 {#attribute-mapping-reference}

이 섹션에서는 OpenTelemetry GenAI 시맨틱 규칙(v1.37+), OpenLLMetry, OpenInference 및 Langfuse에서 Datadog의 Agent Observability 스팬 스키마로의 매핑을 제공합니다.

스팬에 예상되는 속성이 누락되었거나 속성을 구문 분석할 수 없는 경우, Agent Observability는 해당 스팬에 **매핑 경고** 표시를 추가합니다. 설명 및 수정 방법은 [매핑 경고 문제 해결](#troubleshooting-mapping-warnings)을 참조하세요.

<div class="alert alert-info">공급자별 매핑은 <a href="#openllmetry-attribute-mappings">OpenLLMetry 속성 매핑</a>, <a href="#openinference-attribute-mappings">OpenInference 속성 매핑</a> 및 <a href="#langfuse-attribute-mappings">Langfuse 속성 매핑</a> 섹션에 별도로 문서화되어 있습니다.</div>

### OpenTelemetry 1.37+ 속성 매핑 {#opentelemetry-137-attribute-mappings}

#### 기본 스팬 속성 {#base-span-attributes}

| OTLP 필드 | Agent Observability 필드 | 참고 |
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

| `gen_ai.operation.name` | Agent Observability `span.kind` |
|-------------------------|-------------------|
| `generate_content`, `chat`, `text_completion`, `completion` | `llm` |
| `embeddings`, `embedding` | `embedding` |
| `execute_tool` | `tool` |
| `invoke_agent`, `create_agent` | `agent` |
| `rerank`, `unknown`, *(기본값)* | `workflow` |

#### 모델 정보 {#model-information}

| OTel 속성 | Agent Observability 필드 | 참고 |
|----------------|--------------|-------|
| `gen_ai.operation.name` | `meta.span.kind` | 위의 판별 표 참조 |
| `gen_ai.provider.name` | `meta.model_provider` | `gen_ai.system`, 다음으로 `custom` |으로 폴백됨
| `gen_ai.response.model` | `meta.model_name` | |
| `gen_ai.request.model` | `meta.model_name` | `response.model`이 없는 경우 폴백 |

#### 토큰 사용량 메트릭 {#token-usage-metrics}

| OTel 속성 | Agent Observability 필드 |
|----------------|--------------|
| `gen_ai.usage.input_tokens` | `metrics.input_tokens` |
| `gen_ai.usage.output_tokens` | `metrics.output_tokens` |
| `gen_ai.usage.prompt_tokens` | `metrics.prompt_tokens` |
| `gen_ai.usage.completion_tokens` | `metrics.completion_tokens` |
| `gen_ai.usage.total_tokens` | `metrics.total_tokens` |

#### 요청 파라미터 {#request-parameters}

모든 `gen_ai.request.*` 파라미터는 접두사가 제거된 `meta.metadata.*`로 매핑됩니다.

| OTel 속성 | Agent Observability 필드 |
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

| OTel 속성 | Agent Observability 필드 | 참고 |
|----------------|--------------|-------|
| `gen_ai.tool.name` | `name` | 스팬 이름을 재정의함 |
| `gen_ai.tool.call.id` | `metadata.tool_id` | |
| `gen_ai.tool.description` | `metadata.tool_description` | |
| `gen_ai.tool.type` | `metadata.tool_type` | |
| `gen_ai.tool.definitions` | `meta.tool_definitions` | 구문 분석된 JSON 배열 |
| `gen_ai.tool.call.arguments` | `input.value` | |
| `gen_ai.tool.call.result` | `output.value` | |

#### 세션 및 대화 {#session-and-conversation}

| OTel 속성 | Agent Observability 필드 | 참고 |
|----------------|--------------|-------|
| `gen_ai.conversation.id` | `session_id` | 또한 `metadata.conversation_id` 및 태그에 추가됨 |

APM 트레이스의 최상위 스팬이 gen_ai 스팬이 아닌 경우(예: 여러 LLM을 병렬로 호출하는 HTTP 핸들러), Agent Observability는 해당 APM 트레이스의 각 최상위 gen_ai 스팬에 대해 별도의 Agent Observability 트레이스를 생성합니다. 이러한 분할된 트레이스를 UI에서 그룹화된 상태로 유지하려면 APM 트레이스 내의 각 gen_ai 스팬에서 `gen_ai.conversation.id`을 동일한 값으로 설정하세요. Agent Observability는 `session_id`로 그룹화하므로 결과 트레이스는 서로 다른 Agent Observability 트레이스 ID를 사용하더라도 함께 표시됩니다. 이는 교차 요청 대화 그룹화에 사용되는 것과 동일한 속성입니다.

#### 스팬 링크 {#span-links-1}

GenAI 스팬에 설정한 스팬 링크는 해당 Agent Observability 스팬에 `span_links`로 표시됩니다.

| OTel 스팬 링크 필드 | Agent Observability 필드 | 참고 |
|----------------------|--------------|-------|
| `trace_id` | `span_links[].trace_id` | 128비트 트레이스 ID는 16진수로 내보내집니다. 동일한 트레이스 내 스팬에 대한 링크는 해당 스팬의 Agent Observability 트레이스 ID로 변환됩니다. |
| `span_id` | `span_links[].span_id` | 10진수 |
| `attributes` | `span_links[].attributes` | 속성 키의 점은 밑줄로 대체됩니다(예: `messaging.operation`이 `messaging_operation`으로 변경됨). |

동일한 트레이스 내 스팬 간의 링크는 해당 트레이스의 Execution Graph에서 엣지로 표시됩니다.

#### 응답 속성 {#response-attributes}

| OTel 속성 | Agent Observability 필드 |
|----------------|--------------|
| `gen_ai.response.model` | `meta.model_name` |
| `gen_ai.response.finish_reasons` | `metadata.finish_reasons` |

#### 입력 및 출력 메시지 {#input-and-output-messages}

입력 및 출력 메시지는 다음 소스에서 우선순위 순서대로 추출됩니다.

1. 직접 속성: `gen_ai.input.messages`, `gen_ai.output.messages`, `gen_ai.system_instructions`
2. 이름이 `gen_ai.client.inference.operation.details`인 스팬 이벤트(`meta["events"]`)

| OTel 소스 | Agent Observability 필드 | 참고 |
|-------------|--------------|-------|
| `gen_ai.input.messages` | `meta.input.messages`(llm)/`meta.input.value`(기타) | |
| `gen_ai.output.messages` | `meta.output.messages`(llm)/`meta.output.value`(기타) | |
| `gen_ai.system_instructions` | 입력 앞에 추가됨 | 시스템 역할 메시지로 추가됨 |

##### 메시지 내 미디어 {#media-in-messages}

미디어를 포함하는 메시지 부분은 메시지의 유형이 지정된 `audio_parts` 및 `image_parts` 필드로 추출됩니다.

| 부분 유형 | 동작 |
|-----------|----------|
| `blob`에 `mime_type` 및 인라인 바이트가 포함된 경우 | `image_parts` 또는 `audio_parts`로 추출됩니다. 부분에서 `modality`를 생략하면 MIME 유형을 기반으로 유추됩니다. |
| `uri`에 `data:image/png;base64,...` | 와 같은 base64 이미지 데이터 URI가 포함된 경우 `image_parts`로 추출됩니다. |
| `uri`에 원격 URL이 포함된 경우 | 텍스트 참조 `[<modality>: <uri>]`로 기록됩니다. URL은 가져오지 않습니다. |
| `file`에 `file_id` | 가 있는 경우 텍스트 참조 `[<modality> file: <file_id>]`로 기록됩니다. |

미디어가 다른 부분들 사이에서 위치를 유지할 수 있도록 `[image blob: image/png]`와 같은 위치 표시자가 메시지 텍스트에도 추가됩니다.

오디오는 `blob` 부분을 통해서만 `audio_parts`에 도달합니다. `uri` 부분의 오디오 데이터 URI는 텍스트로 기록되며, 규칙에 따라 인라인 base64 데이터의 부분 유형으로 `blob`을 지정하므로 오디오와 이미지 모두에 `blob`을 사용하는 것이 좋습니다.

트레이스 보기가 렌더링하는 형식 및 적용되는 크기 제한에 대해서는 [멀티모달 지원](/llm_observability/instrument/multimodal/)을 참조하세요.

##### 임베딩 스팬 {#embedding-spans}

| OTel 소스 | Agent Observability 필드 |
|-------------|--------------|
| `gen_ai.input.messages` | `meta.input.documents` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### 태그 {#tags}

태그는 스팬에 직접 배치됩니다.

- `gen_ai.*` 가 아닌 속성은 `key:value` 태그로 변환됨
- 알 수 없는 `gen_ai.*` 키가 접두사를 제거한 상태로 추가됨
- 필터링하여 제외됨: `_dd.*`, `llm.*`, `ddtags`, `events`, 및 이미 매핑된 `gen_ai.*` 키

<div class="alert alert-info"> <code>gen_ai.*</code> Agent Observability 스팬 필드에 명시적으로 매핑되지 않은 모든 속성은 LLM 스팬의 태그에 배치되며, 값당 256자 제한이 적용됩니다. 이 한도를 초과하는 값은 잘립니다. 기타 모든<code>gen_ai</code> 가 아닌 속성은 삭제됩니다.</div>

#### 사용자 지정 메타데이터 {#custom-metadata}

스팬의 `meta.metadata` 필드에 태그 대신 구조화된 메타데이터를 추가하려면 `_dd.ml_obs.metadata` 속성을 JSON **객체** 문자열로 설정하세요. 해당 키와 값(중첩된 객체 및 배열 포함)은 `meta.metadata`에 병합되어 UI에 JSON으로 렌더링됩니다.

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

참고:

- 값은 임의로 중첩될 수 있으며, 태그와 달리 메타데이터에는 값당 256자 제한이 적용되지 않습니다.
- `gen_ai.*` 속성에서 파생된 메타데이터와 충돌하는 키(예: `temperature`)는 사용자가 지정한 값으로 덮어쓰지만, 예약된 `model_name`과 `model_provider`는 예외입니다.
- 값은 반드시 JSON 객체여야 합니다. 유효한 JSON이 아니거나 최상위 배열 또는 스칼라인 값은 삭제됩니다.

### OpenLLMetry 속성 매핑 {#openllmetry-attribute-mappings}

이 섹션은 표준 OpenTelemetry GenAI 시맨틱 규칙과 다르거나 이를 확장하는 OpenLLMetry별 속성 매핑을 기록한 것입니다.

#### 스팬 종류 판별 {#span-kind-resolution-1}

`gen_ai.operation.name`이 없을 때 `llm.request.type`이 폴백으로 사용됩니다.

| `llm.request.type` | Agent Observability `span.kind` |
|--------------------|-------------------|
| `chat` | `llm` |
| `completion` | `llm` |
| `embedding` | `embedding` |
| `rerank` | `workflow` |
| `unknown`, *(기본값)* | `workflow` |

#### 모델 정보 {#model-information-1}

| OpenLLMetry 속성 | Agent Observability 필드 | 참고 |
|-----------------------|--------------|-------|
| `gen_ai.system` | `meta.model_provider` | `gen_ai.provider.name`이 없는 경우 폴백 |

#### 토큰 사용량 메트릭 {#token-usage-metrics-1}

| OpenLLMetry 속성 | Agent Observability 필드 | 참고 |
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

| OpenLLMetry 소스 | Agent Observability 필드 |
|--------------------|--------------|
| `gen_ai.prompt.<index>.content` | `meta.input.documents[].text` |

#### 태그 필터링 {#tags-filtering}

다음 OpenLLMetry별 속성이 태그에서 필터링됩니다.

- `gen_ai.prompt.*`
- `gen_ai.completion.*`
- `llm.*`

### OpenInference 속성 매핑 {#openinference-attribute-mappings}

Agent Observability는 `openinference.span.kind` 속성이 존재하고 비어 있지 않을 때 OpenInference 스팬을 인식합니다. 다음 섹션에서는 전용 Agent Observability 필드에 매핑되는 OpenInference 속성을 문서화합니다.

#### 스팬 종류 판별 {#span-kind-resolution-2}

`gen_ai.operation.name`과`openinference.span.kind`가 모두 존재하면 `gen_ai.operation.name`이 우선합니다.

| `openinference.span.kind` | Agent Observability `span.kind` |
|---------------------------|---------------------------------|
| `LLM` | `llm` |
| `EMBEDDING` | `embedding` |
| `TOOL` | `tool` |
| `AGENT` | `agent` |
| `RETRIEVER` | `retrieval` |
| `CHAIN`, `RERANKER`, `GUARDRAIL`, `EVALUATOR`, `PROMPT`, 기타 값 | `workflow` |

#### 모델 정보 {#model-information-2}

| OpenInference 속성 | Agent Observability 필드 | 참고 |
|-------------------------|---------------------------|-------|
| `llm.provider` | `meta.model_provider` | 선호하는 OpenInference 공급자 소스 |
| `llm.system` | `meta.model_provider` | `llm.provider`가 없을 때의 폴백 |
| `llm.model_name` | `meta.model_name` | |
| `embedding.model_name` | `meta.model_name` | 임베딩 스팬에 대한 폴백 |

`llm`과 `embedding` 스팬의 경우, 누락된 공급자 또는 모델 값은 `unknown`으로 설정됩니다.

#### 토큰 사용량 메트릭 {#token-usage-metrics-2}

| OpenInference 속성 | Agent Observability 필드 |
|-------------------------|---------------------------|
| `llm.token_count.prompt` | `metrics.prompt_tokens` |
| `llm.token_count.completion` | `metrics.completion_tokens` |
| `llm.token_count.total` | `metrics.total_tokens` |
| `llm.token_count.prompt_details.cache_read` | `metrics.cache_read_input_tokens` |
| `llm.token_count.prompt_details.cache_write` | `metrics.cache_write_input_tokens` |
| `llm.token_count.completion_details.reasoning` | `metrics.reasoning_output_tokens` |

#### 세션, 사용자 및 메타데이터 {#session-user-and-metadata}

| OpenInference 속성 | Agent Observability 필드 | 참고 |
|-------------------------|---------------------------|-------|
| `session.id` | `session_id` | 또한 `session_id` 및 `conversation_id` 태그를 추가하고 세션을 트레이스 루트로 전파합니다 |
| `user.id` | `tags` | `user_id:<value>` |로 추가됨
| `tag.tags` | `tags` | 각 목록 항목은 스팬 태그가 됩니다 |
| `llm.invocation_parameters` | `meta.metadata` | JSON 객체로 구문 분석됨 |
| `metadata` | `meta.metadata` | JSON 객체로 구문 분석됨 |

`llm.invocation_parameters` 및 `metadata`의 예약된 Agent Observability 필드는 전용 스팬 필드를 재정의하지 않습니다.

#### 도구 속성 {#tool-attributes-1}

| OpenInference 속성 | Agent Observability 필드 | 참고 |
|-------------------------|---------------------------|-------|
| `tool.name` | `name` | 스팬 이름 재정의 |
| `tool.id` | `meta.metadata.tool_id` | |
| `tool.description` | `meta.metadata.tool_description` | |
| `tool.parameters` | `meta.metadata.tool_parameters` | |
| `input.value` | `meta.input.value` | `tool`, `agent` 및 `workflow` 스팬에 직접 사용됨 |
| `output.value` | `meta.output.value` | `tool`, `agent` 및 `workflow` 스팬에 직접 사용됨 |

#### 입력 및 출력 메시지 {#input-and-output-messages-2}

이러한 속성에서 `<direction>`은 `input` 또는 `output`입니다.
입력 및 출력은 다음 소스에서 우선순위 순서대로 추출됩니다.

1. OpenTelemetry `gen_ai.*` 직접 속성 및 스팬 이벤트
2. OpenLLMetry 인덱싱된 속성
3. OpenInference 인덱싱된 속성
4. OpenInference `input.value` 및 `output.value`

| OpenInference 소스 | Agent Observability 필드 |
|----------------------|---------------------------|
| `llm.input_messages.<index>.*` | `meta.input.messages` (llm) / `meta.input.value` (기타 스팬 종류) |
| `llm.output_messages.<index>.*` | `meta.output.messages` (llm) / `meta.output.value` (기타 스팬 종류) |
| `input.value` | 입력 폴백 |
| `output.value` | 출력 폴백 |

다음과 같은 인덱싱된 메시지 속성이 지원됩니다.

| OpenInference 속성 | 매핑 |
|-------------------------|---------|
| `llm.<direction>_messages.<message-index>.message.role` | 메시지 역할 |
| `llm.<direction>_messages.<message-index>.message.content` | 텍스트 콘텐츠 |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.text` | 순서가 지정된 텍스트 콘텐츠 |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.message_content.image.image.url` | 순서가 지정된 이미지 콘텐츠 |
| `llm.<direction>_messages.<message-index>.message.tool_calls.<tool-index>.tool_call.*` | 도구 호출 ID, 이름 및 인수 |
| `llm.<direction>_messages.<message-index>.message.contents.<content-index>.tool_call.*` | 순서가 지정된 콘텐츠 내의 도구 호출 |
| `llm.<direction>_messages.<message-index>.message.tool_call_id` | 메시지 역할이 `tool` |일 때의 도구 결과 ID

이미지 콘텐츠는 다른 메시지 콘텐츠 사이에서 위치를 유지하면서 이미지 URI에 매핑됩니다.

#### 임베딩 스팬 {#embedding-spans-2}

| OpenInference 소스 | Agent Observability 필드 |
|----------------------|---------------------------|
| `embedding.embeddings.<index>.embedding.text` | `meta.input.documents[].text` |
| N/A | `meta.output.value` = `[N embedding(s) returned]` |

#### 검색 스팬 {#retrieval-spans}

| OpenInference 소스 | Agent Observability 필드 |
|----------------------|---------------------------|
| `input.value` | `meta.input.value` |
| `retrieval.documents.<index>.document.content` | `meta.output.documents[].text` |
| `retrieval.documents.<index>.document.id` | `meta.output.documents[].id` |
| `retrieval.documents.<index>.document.score` | `meta.output.documents[].score` |
| `retrieval.documents.<index>.document.metadata` | `meta.output.documents[].metadata` (구문 분석된 JSON 객체) |

#### 태그 필터링 {#tags-filtering-1}

`llm.*`, `retrieval.*`, `embedding.*` 및 `reranker.*` 접두사가 있는 OpenInference 속성은 태그에서 제외됩니다. `input.value`, `output.value`, `metadata`, `tag.tags` 및 `tool.parameters`와 같이 구체적으로 매핑된 값도 중복 태그에서 제외됩니다.

값이 256자 이하인 기타 비어 있지 않은 OpenInference 속성은 `key:value` 태그로 추가됩니다. `tag.tags` 목록은 스팬 태그로 직접 승격됩니다.

### Langfuse 속성 매핑 {#langfuse-attribute-mappings}

이 섹션은 [Langfuse의 네이티브 OpenTelemetry 계측][13]을 사용하는 애플리케이션에 대한 Langfuse 전용 속성 매핑을 문서화합니다.

#### 탐지 {#detection}

스팬은 비어 있지 않은 `langfuse.observation.type` 속성을 포함할 때 Langfuse 스팬으로 처리됩니다. 이 속성은 `gen_ai.operation.name`이 없을 때 스팬 종류 판별을 위한 폴백으로도 사용됩니다.

#### 스팬 종류 판별 {#span-kind-resolution-3}

| `langfuse.observation.type` | Agent Observability `span.kind` |
|------------------------------|-------------------|
| `generation` | `llm` |
| `embedding` | `embedding` |
| `tool` | `tool` |
| `agent` | `agent` |
| `retriever` | `retrieval` |
| `span`, `event`, `chain`, `evaluator`, `guardrail`, *(default)* | `workflow` |

#### 모델 정보 {#model-information-3}

| Langfuse 속성 | Agent Observability 필드 | 참고 |
|---------------------|--------------|-------|
| `langfuse.observation.metadata.ls_provider` | `meta.model_provider` | |
| `langfuse.observation.model.name` | `meta.model_name` | `gen_ai.response.model`과 `gen_ai.request.model`이 모두 없는 경우의 폴백 |

#### 토큰 사용량 메트릭 {#token-usage-metrics-3}

`langfuse.observation.usage_details`는 JSON 객체입니다. 각 키는 Agent Observability 메트릭에 매핑되며, `gen_ai.usage.*` 속성에서 아직 설정되지 않은 메트릭에 대한 폴백으로 사용됩니다.

| Langfuse 사용량 키 | Agent Observability 필드 |
|----------------------|--------------|
| `input`, `input_tokens` | `metrics.input_tokens` |
| `output`, `output_tokens` | `metrics.output_tokens` |
| `total`, `total_tokens` | `metrics.total_tokens` |
| `prompt_tokens` | `metrics.prompt_tokens` |
| `completion_tokens` | `metrics.completion_tokens` |
| `cache_creation_input_tokens` | `metrics.cache_write_input_tokens` |
| `cache_read_input_tokens`, `cached_tokens` | `metrics.cache_read_input_tokens` |
| `reasoning_tokens` | `metrics.reasoning_output_tokens` |

#### 입력 및 출력 메시지 {#input-and-output-messages-3}

`langfuse.observation.input`과 `langfuse.observation.output`은 채팅 메시지 배열, 단일 메시지 객체 또는 임의의 JSON/문자열 콘텐츠가 될 수 있는 JSON 인코딩 값을 포함합니다. 이러한 항목은 우선순위가 가장 낮은 소스이며, `gen_ai.*` 메시지 속성이 없을 때만 사용됩니다.

각 메시지는 파트 기반 메시지 형태로 변환됩니다.

- `content` 문자열은 `text` 파트가 됩니다.
- `content` 블록 배열은 `image_url` 블록을 `uri` 파트로, `text` 블록을 `text` 파트로 변환하며, 다른 모든 블록은 직렬화된 텍스트로 유지됩니다.
- 메시지의 `tool_calls` 배열은 `tool_call` 파트가 됩니다.
- `role: tool`과 `tool_call_id`가 있는 메시지는 `tool_result` 파트가 됩니다.

##### 도구 스팬 {#tool-spans}

`tool`, `agent` 및 `workflow` 스팬의 경우, 표준 `gen_ai.tool.call.*` 폴백 이후에 `langfuse.observation.input`/`langfuse.observation.output`이 `input.value`/`output.value`로 직접 사용됩니다.

##### 검색 스팬 {#retrieval-spans-1}

`retrieval` 스팬의 경우, `langfuse.observation.input`은 `meta.input.value`에서 쿼리 값으로 사용됩니다. `langfuse.observation.output`은 문서 컬렉션(문서 객체 배열, 문자열 배열 또는 단일 문서 객체)으로 구문 분석되어 `meta.output.documents`로 변환됩니다. 각 문서 객체의 `text`, `content` 또는 `page_content` 키(해당 순서대로 확인)는 `id`, `score` 및 `metadata` 키와 함께 `text`에 매핑됩니다.

##### 임베딩 스팬 {#embedding-spans-3}

`embedding` 스팬의 경우, `langfuse.observation.input`는 검색 문서와 동일한 방식으로 구문 분석되어 `meta.input.documents[].text`로 변환되며, 비어 있지 않은 텍스트를 포함하는 문서만 유지합니다.

#### 세션, 사용자, 메타데이터 및 태그 {#session-user-metadata-and-tags}

| Langfuse 속성 | Agent Observability 필드 | 참고 |
|-----------------------|--------------|-------|
| `langfuse.session.id` | `session_id` | `gen_ai.conversation.id`가 없을 때의 폴백 |
| `langfuse.user.id` | `user_id:` 태그 | 표준 사용자 ID 속성이 없을 때의 폴백 |
| `langfuse.observation.model.parameters` | `meta.metadata.*` | JSON 객체, 메타데이터에 병합됨, 예약된 키(`model_name`, `model_provider`)는 건너뜀 |
| `langfuse.trace.metadata.*`, `langfuse.observation.metadata.*` | `meta.metadata.*` | 접두사를 제거한 후 메타데이터에 병합되며, 예약된 키는 건너뜀 |
| `langfuse.trace.tags` | 태그에 추가됨 | 문자열의 JSON 배열 |

#### 태그 필터링 {#tags-filtering-2}

다음 Langfuse 전용 속성은 다른 곳에서 사용되므로 태그에서 필터링됩니다.

- `langfuse.internal.*`, `langfuse.observation.metadata.*`, `langfuse.trace.metadata.*` (접두사)
- `langfuse.observation.input`, `langfuse.observation.output`, `langfuse.observation.model.name`, `langfuse.observation.model.parameters`, `langfuse.observation.usage_details`, `langfuse.observation.cost_details`, `langfuse.observation.completion_start_time`
- `langfuse.trace.input`, `langfuse.trace.output`, `langfuse.trace.metadata`, `langfuse.trace.tags`
- `langfuse.experiment.item.expected_output`, `langfuse.experiment.item.metadata`, `langfuse.experiment.metadata`

## 매핑 경고 문제 해결 {#troubleshooting-mapping-warnings}

수집 시 Agent Observability는 누락된 입력 메시지나 구문 분석할 수 없는 토큰 수와 같은 스팬 매핑 문제를 감지합니다. 자동으로 실패 처리하는 대신 문제가 있는 스팬에 플래그를 지정합니다.

플래그가 지정된 스팬은 스팬 세부 정보 패널에 **매핑 경고** 표시가 나타납니다. 표시기를 선택하여 스팬의 매핑 경고를 여세요. 각 항목에는 영향을 받는 속성, 제안된 수정 사항 및 [속성 매핑 참조](#attribute-mapping-reference)에 대한 링크가 나열되어 있습니다.

각 경고에는 건너뛴 평가나 사용할 수 없는 비용 추정과 같은 다운스트림 영향에 대한 간략한 설명도 포함되어 있습니다.

매핑 경고는 수집 시 감지됩니다. 이는 청구 또는 스팬 보존에 영향을 미치지 않습니다.

### 매핑 경고 참조 {#mapping-warning-reference}

Datadog에서 검사를 추가하는 경우, 스팬은 다음 표에 나열되지 않은 경고를 표시할 수 있습니다. 이러한 항목은 경고를 트리거한 검사에 기반하여 생성된 제목과 함께 렌더링됩니다.

**검색 값**은 스팬에 저장된 값을 보여줍니다. `@collection_errors` 속성과 함께 사용하여 플래그가 지정된 스팬을 찾으세요(예: `@collection_errors:otel_warning_missing_model_name`).

| 경고 | 검색 값 (`@collection_errors:`) | 속성 | 수정 |
|---------|--------------------------------------|-----------|-----|
| 모델 이름 누락 | `otel_warning_missing_model_name` | 예상 `gen_ai.response.model` | `gen_ai.response.model`을 직접 내보내어 `gen_ai.request.model`에서 모델 이름을 구문 분석할 필요가 없도록 하세요. |
| 모델 공급자 누락 | `otel_warning_missing_model_provider` | 예상 `gen_ai.provider.name` | `gen_ai.provider.name`을 직접 내보내어 `gen_ai.system`에서 공급자를 추론할 필요가 없도록 하세요. |
| 잘못된 형식의 모델 식별자 | `otel_warning_strands_model_malformed` | 설정됨 `gen_ai.request.model` | `gen_ai.response.model`을 직접 내보내어 `gen_ai.request.model`에서 모델 이름을 구문 분석할 필요가 없도록 하세요. |
| 잘못된 형식의 입력 | `otel_warning_input_malformed` | 설정됨 `gen_ai.input.messages` | `gen_ai.input.messages`를 유효한 메시지의 JSON 배열로 내보내세요. |
| 잘못된 형식의 출력 | `otel_warning_output_malformed` | 설정됨 `gen_ai.output.messages` | `gen_ai.output.messages`를 유효한 메시지의 JSON 배열로 내보내세요. |
| 잘못된 형식의 메시지 | `otel_warning_message_malformed` | 설정됨 `gen_ai.input.messages` | 각 메시지에 `role` 및 `content` 필드를 포함하여 내보내세요. |
| 비어 있는 메시지 콘텐츠 | `otel_warning_invalid_parts` | 설정됨 `gen_ai.output.messages` | `content` 문자열 또는 인식되는 `type`이 있는 `parts` 항목을 내보내세요(예: `text`, `tool_call`, `tool_call_response`). |
| 임베딩 입력 누락 | `otel_warning_embedding_input_missing` | 예상 `gen_ai.input.messages` | `gen_ai.input.messages`를 임베드된 텍스트로 설정하세요. |
| 잘못된 형식의 임베딩 입력 | `otel_warning_embedding_input_malformed` | 설정됨 `gen_ai.input.messages` | `gen_ai.input.messages`를 유효한 메시지의 JSON 배열로 내보내세요. |
| 읽을 수 없는 토큰 수 | `otel_warning_token_usage_unparseable` | 설정됨 `gen_ai.usage.input_tokens` | 토큰 수를 문자열이나 객체가 아닌 정수로 내보내세요. |
| 유효하지 않은 토큰 수 | `otel_warning_token_usage_invalid` | 설정됨 `gen_ai.usage.input_tokens` | 음수가 아닌 정수 토큰 수를 내보내세요. |
| 읽을 수 없는 비용 메트릭 | `otel_warning_cost_metrics_unparseable` | 설정됨 `gen_ai.cost.estimated_total` | 비용 메트릭을 문자열이나 객체가 아닌 정수 또는 부동 소수점 수로 내보내세요. |
| 유효하지 않은 비용 메트릭 | `otel_warning_cost_metrics_invalid` | 설정됨 `gen_ai.cost.estimated_total` | 음수가 아닌 비용 값을 내보내세요. |
| 잘못된 형식의 호출 파라미터 | `otel_warning_params_malformed` | 호출 파라미터에 설정됨 | 호출 파라미터를 유효한 JSON 객체로 내보내거나, `gen_ai.request.*` 속성(예: `temperature`, `top_p`, `max_tokens`)으로 개별적으로 설정하세요. |
| 잘못된 형식의 도구 정의 | `otel_warning_tool_definitions_malformed` | 설정됨 `gen_ai.tool.definitions` | `gen_ai.tool.definitions`를 유효한 도구 정의의 JSON 배열로 내보내세요. |
| 잘못된 형식의 도구 정의 | `otel_warning_tool_definition_entry_malformed` | 설정됨 `gen_ai.tool.definitions` | 각 도구 정의에 `name`을 지정하고, `parameters`를 JSON 객체로 만드세요. |
| 도구 이름 누락 | `otel_warning_tool_span_name_missing` | 예상 `gen_ai.tool.name` | 도구 스팬에 `gen_ai.tool.name`을 설정하세요. |
| 도구 호출 이름 누락 | `otel_warning_tool_call_name_missing` | 설정됨 `gen_ai.output.messages` | 각 도구 호출에 `name`을 지정하세요. |
| 작업 이름 누락 | `otel_warning_operation_missing` | 예상 `gen_ai.operation.name` | `gen_ai.operation.name`을 `chat`, `text_completion`, `embeddings`, `execute_tool`, `invoke_agent` 또는 `retriever` 중 하나로 설정하세요. |
| 잘못된 형식의 스팬 이벤트 | `otel_warning_failed_to_parse_span_events` | 설정됨 `events` | 스팬 이벤트에서 유효한 JSON을 내보내거나 `gen_ai.input.messages`와 `gen_ai.output.messages`를 직접 설정하세요. |
| 읽을 수 없는 문서 점수 | `otel_warning_failed_to_parse_document_score` | 설정됨 `output.documents` | 각 문서 점수를 숫자로 내보내세요. |
| 잘못된 형식의 문서 메타데이터 | `otel_warning_document_metadata_malformed` | 설정됨 `output.documents` | 각 문서의 메타데이터를 JSON 객체로 내보내세요. |
| 인식할 수 없는 계측 | `otel_warning_spec_version_unknown` | 예상 `gen_ai.operation.name` | Datadog이 계측을 식별할 수 있도록 `gen_ai.operation.name`과 `gen_ai.system`을 설정하세요. |

### 플래그가 지정된 스팬의 원시 스팬 속성 찾기 {#find-raw-span-attributes-for-a-flagged-span}

플래그가 지정된 스팬에 대해 Datadog이 수신한 원시 속성을 찾으려면 다음 단계를 따르세요.

- APM이 활성화된 경우, 동일한 데이터가 해당 APM 트레이스에도 기록됩니다. 연결된 APM 트레이스를 열어 원시 스팬 속성을 검사합니다.
- 원시 속성을 [매핑 경고 참조](#mapping-warning-reference) 또는 전체 [속성 매핑 참조](#attribute-mapping-reference)의 예상 속성과 비교합니다. 두 보기가 어떻게 연관되는지에 대한 자세한 내용은 [Agent Observability와 APM 상관관계 분석][14]을 참조하세요.
- 잘못된 형식 경고의 경우, 속성 값이 유효한 JSON인지 확인하세요. 일반적인 원인으로는 이중 인코딩, 잘림, 객체가 예상되는 곳에 문자열이나 기타 객체가 아닌 값을 내보내는 경우 등이 있습니다.
- 누락된 속성 경고의 경우, [테스트된 프레임워크 및 라이브러리](#tested-frameworks-and-libraries) 표와 비교하여 계측 라이브러리 버전을 확인하고, 라이브러리에서 필요한 경우 `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`이 설정되어 있는지 확인하세요.

## 지원되는 시맨틱 규칙 {#supported-semantic-conventions}

Agent Observability는 생성형 AI에 대한 OpenTelemetry 1.37+ 시맨틱 규칙을 따르는 스팬을 지원하며, 예를 들면 다음과 같습니다.

- `gen_ai.provider.name`, `"gen_ai.operation.name"`, `gen_ai.request.model` 및 기타 gen_ai 속성이 있는 LLM 작업
- 직접 스팬 속성에 있는, 또는 스팬 이벤트를 통한 작업 입력/출력
- 토큰 사용량 메트릭(`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`)
- 모델 파라미터 및 메타데이터

지원되는 속성 및 각각의 사양 전체 목록은 [생성형 AI에 대한 OpenTelemetry 시맨틱 규칙 설명서][1]를 참조하세요.

## Agent Observability 변환 비활성화 {#disabling-agent-observability-conversion}

생성형 AI 스팬을 APM에만 유지하고 Agent Observability에 표시되지 않게 하려면 `dd_llmobs_enabled` 속성을 `false`로 설정하여 자동 변환을 비활성화하면 됩니다. 트레이스의 어느 스팬에서든 이 속성을 설정하면 트레이스 전체가 Agent Observability로 변환되지 않도록 방지됩니다.

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
    # Disable Agent Observability conversion for this entire trace
    span.set_attribute("dd_llmobs_enabled", False)
```

[1]: https://github.com/open-telemetry/semantic-conventions-genai
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/llm/traces
[4]: /ko/help/
[5]: https://pypi.org/project/strands-agents/
[6]: /ko/llm_observability/investigate/evaluations/external_evaluations
[7]: https://strandsagents.com/latest/
[8]: /ko/account_management/rbac/data_access/
[9]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[10]: /ko/opentelemetry/compatibility/#feature-compatibility
[11]: https://arize-ai.github.io/openinference/python/instrumentation/openinference-instrumentation-openai/
[12]: https://arize-ai.github.io/openinference/spec/semantic_conventions.html
[13]: https://langfuse.com/integrations/native/opentelemetry
[14]: /ko/llm_observability/instrument/agent_observability_and_apm/