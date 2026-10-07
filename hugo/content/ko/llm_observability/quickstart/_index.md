---
aliases:
- /ko/tracing/llm_observability/quickstart
description: Agent Observability SDK를 사용하여 Python, Node.js 또는 Java LLM 애플리케이션을 계측하여
  Agent Observability를 시작하세요.
further_reading:
- link: /llm_observability/instrument/auto_instrumentation
  tag: 설명서
  text: 지원되는 자동 계측 프레임워크 및 라이브러리
- link: /llm_observability/instrument/sdk
  tag: 설명서
  text: 수동 계측을 위한 Agent Observability SDK 참조
- link: /llm_observability/instrument/api
  tag: 설명서
  text: 언어 중립적 계측을 위한 Agent Observability HTTP API
- link: /llm_observability/instrument/otel_instrumentation
  tag: 설명서
  text: OpenTelemetry로 계측
- link: /llm_observability/configure/evaluations
  tag: 평가
  text: 애플리케이션에서 평가 구성
- link: /llm_observability/lapdog
  tag: 설명서
  text: Agent Observability를 위한 로컬 개발 도구
title: 빠른 시작
---
이 페이지는 Datadog의 Agent Observability SDK를 사용하여 Python, Node.js 또는 Java LLM 애플리케이션을 계측하는 방법을 보여줍니다.

### 전제 조건 {#prerequisites}

Datadog Agent가 실행 중이지 않은 경우 Agent Observability에는 Datadog API 키가 필요합니다. [Datadog에서](https://app.datadoghq.com/organization-settings/api-keys) API 키를 찾으세요.

### 코딩 에이전트로 Agent Observability 계측{#instrument-agent-observability-with-a-coding-agent}

다음 프롬프트를 붙여넣으시어 원하는 코딩 에이전트로 Agent Observability를 계측하세요.

```bash
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to instrument my application with Datadog Agent Observability. When configuring the environment, use the following values for variable entries:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_API_KEY=<your-dd-api-key>
```

**참고:** API 키를 프롬프트의 일부로 제공하는 것은 선택 사항이며, 코딩 에이전트가 애플리케이션을 계측하는 데 필수는 아닙니다.

### 수동 설정{#manual-setup}

대화형 퀵스타트 환경을 보려면 Datadog의 [인앱 온보딩 흐름](https://app.datadoghq.com/llm/applications?setupMethod=manual&showOnboarding=true)에 있는 설정 지침을 따르세요.

{{< tabs >}}
{{% tab "Python" %}}

1. SDK 설치:

   ```shell
   pip install ddtrace
   ```

2. Python 시작 명령 앞에 `ddtrace-run`을 추가하세요.

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

활성화 후 SDK는 OpenAI, LangChain, LangGraph, Bedrock, Anthropic 등 [지원되는 Python 프레임워크][auto-instr-py]에 대한 호출을 자동으로 트레이스합니다. 사용 중인 프레임워크가 목록에 없으면 [수동 계측][sdk]을 추가하여 LLM 호출을 직접 트레이스하세요.

[auto-instr-py]: /llm_observability/instrument/auto_instrumentation/?tab=python
[sdk]: /llm_observability/instrument/sdk?tab=python

{{% /tab %}}

{{% tab "Node.js" %}}
1. SDK 설치:

   ```shell
   npm install dd-trace
   ```

2. 애플리케이션 진입점에서 Agent Observability를 첫 번째 종속성으로 `dd-trace`를 가져오고 초기화하세요.
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_SITE=<YOUR_DD_SITE> \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

활성화 후, SDK는 OpenAI, LangChain, Vercel AI SDK, Bedrock, Anthropic 등 [지원되는 Node.js 프레임워크][1]에 대한 호출을 자동으로 트레이스합니다. 프레임워크가 목록에 없는 경우, [수동 계측][2]을 추가하여 LLM 호출을 직접 트레이스하세요.

**Next.js**: Agent Observability SDK로 Next.js 애플리케이션을 올바르게 구성하려면 [Agent Observability를 위한 Next.js 애플리케이션 계측][3]을 참조하세요.

[1]: /ko/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[2]: /ko/llm_observability/instrument/sdk?tab=nodejs
[3]: /ko/llm_observability/guide/nextjs_guide

{{% /tab %}}
{{% tab "Java" %}}
1. SDK 설치:

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Java 시작 명령에 `-javaagent` JVM 인수를 추가하세요.
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.site=<YOUR_DD_SITE> \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

활성화 후, SDK는 [지원되는 Java 프레임워크][1]에 대한 호출을 자동으로 트레이스합니다. Java 자동 계측은 OpenAI 및 Azure OpenAI를 지원합니다. Bedrock이나 LangChain4j와 같은 다른 라이브러리의 경우, 대신 [수동 계측][2]을 사용하세요.

[1]: /ko/llm_observability/instrument/auto_instrumentation/?tab=java
[2]: /ko/llm_observability/instrument/sdk?tab=java

{{% /tab %}}
{{% tab "기타 언어/HTTP API" %}}

Python, Node.js, Java 이외의 언어의 경우, [Agent Observability HTTP API][1]를 사용하여 SDK 없이 Datadog으로 스팬을 직접 전송하세요.

애플리케이션이 [OpenTelemetry GenAI 의미 체계 규칙][2]을 준수하는 스팬을 내보내는 경우, 대신 [OpenTelemetry 계측][2]을 참조하세요.

[1]: /ko/llm_observability/instrument/api
[2]: /ko/llm_observability/instrument/otel_instrumentation

{{% /tab %}}
{{< /tabs >}}

Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}. `<YOUR_DATADOG_API_KEY>`를 Datadog API 키로 대체하세요.

### 트레이스 조회 {#view-traces}

애플리케이션에 요청을 전송해 LLM 호출을 트리거한 다음 Datadog [{{< ui >}}Agent Observability{{< /ui >}} 페이지의][3] {{< ui >}}Traces{{< /ui >}} 탭에서 트레이스를 조회하세요.

트레이스가 보이지 않는 경우:

- **라이브러리가 자동 계측되는지 검사**: 자동 계측은 [지원되는 프레임워크 및 라이브러리][6]에 대한 호출만 캡처합니다. [Python][7], [Node.js][8] 또는 [Java][9]에 대한 지원 목록을 확인하세요. 라이브러리가 목록에 없으면 수동으로 계측을 추가해야 합니다.
- **수동 계측 추가**: [Agent Observability SDK][5]를 사용하여 코드에서 직접 스팬으로 LLM 호출을 래핑하세요. 이는 모든 라이브러리나 모델 공급자에 적용됩니다.
- **HTTP API 사용**: [Agent Observability HTTP API][10]는 모든 언어나 프레임워크의 스팬을 허용하며 SDK가 필요하지 않습니다.
- **OpenTelemetry 사용**: 프레임워크가 [OpenTelemetry GenAI 의미 체계 규칙][11]을 준수하는 스팬을 내보내는 경우, 설정 세부 정보는 [OpenTelemetry 계측][11]을 참조하세요.


### 다음 단계 {#next-steps}

애플리케이션에서 트레이스가 제출되면 다음을 수행할 수 있습니다.

- [평가 구성][4]을 통해 LLM 애플리케이션의 효과를 평가할 수 있습니다.
- 애플리케이션에 [수동 계측][5]을 추가하여 자동 계측으로 추출할 수 없는 데이터를 추출하세요.


## 예시 'Hello World' 애플리케이션 {#example-hello-world-application}

Agent Observability 제품 탐색을 시작하는 데 사용할 수 있는 간단한 애플리케이션은 아래를 참조하세요.


{{< tabs >}}
{{% tab "Python" %}}

1. OpenAI를 `pip install openai`로 설치합니다.

2. 예시 스크립트 `app.py`를 저장합니다.

   ```python
   import os
   from openai import OpenAI

   oai_client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
   completion = oai_client.chat.completions.create(
       model="gpt-4o-mini",
       messages=[
        {"role": "system", "content": "You are a helpful customer assistant for a furniture store."},
        {"role": "user", "content": "I'd like to buy a chair for my living room."},
    ],
   )
   ```

3. 애플리케이션을 실행합니다.

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run app.py
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
1. OpenAI를 `npm install openai`로 설치합니다.

2. 예시 스크립트 `app.js`를 저장합니다.

   ```js
   const { OpenAI } = require('openai');
   const oaiClient = new OpenAI(process.env.OPENAI_API_KEY);

   async function main () {
       const completion = await oaiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
             { role: 'system', content: 'You are a helpful customer assistant for a furniture store.' },
             { role: 'user', content: 'I\'d like to buy a chair for my living room.' },
          ]
       });
       return completion;
   }

   main().then(console.log)
   ```

3. 애플리케이션을 실행합니다.
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## Lapdog을 사용하여 로컬에서 Agent Observability 체험 {#try-agent-observability-locally-with-lapdog}

Agent Observability를 로컬에서 무료로 체험하려면 [단계에 따라][12] 애플리케이션을 계측하고 [lapdog](https://lapdog.datadoghq.com)을 사용하여 로컬에서 데이터를 조회하세요.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/llm/traces
[4]: /ko/llm_observability/configure/evaluations
[5]: /ko/llm_observability/instrument/sdk#manual-instrumentation
[6]: /ko/llm_observability/instrument/auto_instrumentation
[7]: /ko/llm_observability/instrument/auto_instrumentation/?tab=python
[8]: /ko/llm_observability/instrument/auto_instrumentation/?tab=nodejs
[9]: /ko/llm_observability/instrument/auto_instrumentation/?tab=java
[10]: /ko/llm_observability/instrument/api
[11]: /ko/llm_observability/instrument/otel_instrumentation
[12]: /ko/llm_observability/lapdog