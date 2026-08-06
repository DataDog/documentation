---
aliases:
- /ko/tracing/llm_observability/quickstart
further_reading:
- link: /llm_observability/evaluations
  tag: 평가
  text: 애플리케이션에서 평가 구성
- link: /llm_observability/instrumentation/custom_instrumentation
  tag: 커스텀 계측
  text: 커스텀 스팬으로 애플리케이션 계측
title: 빠른 시작
---

이 페이지에서는 Datadog의 LLM Observability SDK를 사용해 Python, Node.js, 또는 Java LLM 애플리케이션을 계측하는 방법을 설명합니다.

### 사전 필수 조건

Datadog Agent를 사용하지 않으면서 LLM Observability를 실행하려면 Datadog API 키가 필요합니다. [Datadog](https://app.datadoghq.com/organization-settings/api-keys)에서 API 키를 찾으세요.

### 설정

{{< tabs >}}
{{% tab "Python" %}}

1. SDK 설치:

   ```shell
   pip install ddtrace
   ```

2. Python 시작 명령에 접두사 `ddtrace-run`를 붙입니다.

   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   ddtrace-run <your application command>
   ```

   `<YOUR_DATADOG_API_KEY>`를 내 Datadog API 키로 대체합니다.


[1]: /ko/llm_observability/setup/sdk/python/#command-line-setup
[2]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "Node.js" %}}
1. SDK 설치:

   ```shell
   npm install dd-trace
   ```

2. Node.js 시작 명령에 `NODE_OPTIONS`을 붙입니다.
   ```shell
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" <your application command>
   ```

   `<YOUR_DATADOG_API_KEY>`를 내 Datadog API 키로 대체합니다.

[1]: /ko/llm_observability/setup/sdk/nodejs/#command-line-setup
[2]: /ko/getting_started/site/

{{% /tab %}}
{{% tab "Java" %}}
1. SDK 설치:

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```

2. Java 시작 명령에 `-javaagent` JVM 인수를 붙입니다.
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar \
   -Ddd.llmobs.enabled=true \
   -Ddd.llmobs.ml.app=quickstart-app \
   -Ddd.api.key=<YOUR_DATADOG_API_KEY> \
   -jar path/to/your/app.jar
   ```

   `<YOUR_DATADOG_API_KEY>`를 나의 Datadog API 키로 대체합니다.

[1]: /ko/llm_observability/setup/sdk/java/#command-line-setup
[2]: /ko/getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### 트레이스 보기

애플리케이션에 LLM 호출을 발동하는 요청을 하고 Datadog의 **LLM Observability** 페이지[3]에 있는 **Traces** 탭에서 트레이스를 확인합니다. 트레이스가 보이지 않을 경우 지원되는 라이브러리를 사용하고 있는지 체크해 보세요. 그 외의 경우, 애플리케이션의 LLM 호출을 수동으로 계측해야 할 수 있습니다.


### 다음 단계

애플리케이션에서 트레이스가 전송된 후에는 다음을 할 수 있습니다.

- LLM 애플리케이션의 효과를 측정하는 데 사용할 수 있는 [평가 구성][4].
- 애플리케이션에 [커스텀 계측][5]을 추가하고 자동 계측으로 추출할 수 없는 데이터 추출.


## "Hello World" 애플리케이션 예시

LLM Observability 제품을 탐색해보려면 아래 간단 애플리케이션을 살펴보세요.


{{< tabs >}}
{{% tab "Python" %}}

1. `pip install openai`으로 OpenAI를 설치합니다.

2. `app.py` 예시 스크립트를 저장합니다.

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
1. `npm install openai`으로 OpenAI를 설치합니다.

2. `app.js` 예시 스크립트를 저장합니다.

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

3. 애플리케이션을 실행합니다.
   ```
   DD_LLMOBS_ENABLED=1 \
   DD_LLMOBS_ML_APP=quickstart-app \
   DD_API_KEY=<YOUR_DATADOG_API_KEY> \
   NODE_OPTIONS="--import dd-trace/initialize.mjs" node app.js
   ```

{{% /tab %}}
{{< /tabs >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/setup/sdk/python
[2]: /ko/llm_observability/setup/sdk/nodejs
[3]: https://app.datadoghq.com/llm/traces
[4]: /ko/llm_observability/evaluations
[5]: /ko/llm_observability/instrumentation/custom_instrumentation