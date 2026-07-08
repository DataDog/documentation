---
aliases:
- /ko/tracing/llm_observability/sdk/python
- /ko/llm_observability/sdk/python
- /ko/llm_observability/setup/sdk/python
- /ko/llm_observability/setup/sdk/nodejs
- /ko/llm_observability/setup/sdk
- /ko/llm_observability/setup/sdk/java
- /ko/llm_observability/sdk/java
- /ko/llm_observability/sdk/
- /ko/llm_observability/instrumentation/custom_instrumentation
- /ko/tracing/llm_observability/trace_an_llm_application
- /ko/llm_observability/setup
further_reading:
- link: https://www.datadoghq.com/blog/llm-prompt-tracking
  tag: 블로그
  text: Datadog LLM Observability를 통해 LLM 프롬프트를 추적, 비교 및 최적화하세요.
title: LLM Observability SDK 참조
---
## 개요 {#overview}

Datadog의 LLM Observability SDK는 자동 계측과 수동 계측 API를 모두 제공하여 LLM 애플리케이션에 대한 관측 가능성과 인사이트를 제공합니다.

## 설정 {#setup}

### 요구 사항 {#requirements}

- [Datadog API 키][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{< tabs >}}
{{% tab "Python" %}}
- 최신 `ddtrace` 패키지가 설치되어 있어야 합니다(Python 3.7 이상 필요).
   ```shell
   pip install ddtrace
   ```
{{% /tab %}}

{{% tab "Node.js" %}}
- 최신 `dd-trace` 패키지가 설치되어 있어야 합니다(Node.js 16 이상 필요).
   ```shell
   npm install dd-trace
   ```

{{% /tab %}}

{{% tab "Java" %}}
- 최신 [`dd-trace-java` JAR][1] 파일을 다운로드해야 합니다. LLM Observability SDK는 `dd-trace-java` v1.51.0 이상에서 지원됩니다(Java 8 이상 필요).

[1]: https://github.com/DataDog/dd-trace-java
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="명령줄 설정" level="h3" expanded=false id="command-line-setup" %}}

{{< tabs >}}
{{% tab "Python" %}}
`ddtrace-run` 명령을 사용하여 애플리케이션을 실행하고 필수 환경 변수를 지정하여 LLM Observability를 활성화합니다.

**참고**: : `ddtrace-run`은 모든 LLM Observability 통합을 자동으로 활성화합니다.

{{< code-block lang="shell">}}
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run <YOUR_APP_STARTUP_COMMAND>
{{< /code-block >}}

####  명령줄 설정용 환경 변수 {#environment-variables-for-command-line-setup}

`DD_SITE`
: 필수 - _string_
<br />LLM 데이터를 제출할 대상 Datadog 사이트입니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

`DD_LLMOBS_ENABLED`
: 필수 - _integer 또는 string_
<br />LLM Observability로 데이터 전송을 활성화하는 토글입니다. `1` 또는 `true`로 설정해야 합니다.

`DD_LLMOBS_ML_APP`
: 선택 사항 - _string_
<br />모든 트레이스와 스팬이 그룹화되는 LLM 애플리케이션, 서비스 또는 프로젝트의 이름입니다. 이를 통해 서로 다른 애플리케이션 또는 실험을 구분할 수 있습니다. 허용 문자 및 기타 제약 사항은 [애플리케이션 명명 지침](#application-naming-guidelines)을 참조하세요. 특정 루트 스팬에 대해 이 값을 재정의하려면 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요. 지정하지 않으면 [`DD_SERVICE`][1] 값 또는 업스트림 서비스에서 전파된 `DD_LLMOBS_ML_APP` 값이 기본값으로 사용됩니다.
<br />**참고**: 버전 `ddtrace==3.14.0` 이전에는 이 값이 **필수 필드**였습니다.

`DD_LLMOBS_AGENTLESS_ENABLED`
: 선택 사항 - _integer 또는 string_ - **기본값**: `false`
<br />Datadog Agent를 사용하지 않는 경우에만 필요하며, 이 경우 `1` 또는 `true`로 설정해야 합니다.

`DD_API_KEY`
: 선택 사항 - _string_
<br />Datadog API 키입니다. Datadog Agent를 사용하지 않는 경우에만 필요합니다.

[1]: /ko/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}

{{% tab "Node.js" %}}
`NODE_OPTIONS="--import dd-trace/initialize.mjs"`를 사용하여 애플리케이션을 실행하고 필수 환경 변수를 지정하여 LLM Observability를 활성화합니다.

**참고**: : `dd-trace/initialize.mjs`는 모든 APM 통합을 자동으로 활성화합니다.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 \
DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> NODE_OPTIONS="--import dd-trace/initialize.mjs" node <YOUR_APP_ENTRYPOINT>
```

####  명령줄 설정용 환경 변수 {#environment-variables-for-command-line-setup-1}

`DD_SITE`
: 필수 - _string_
<br />LLM 데이터를 제출할 Datadog 사이트입니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

`DD_LLMOBS_ENABLED`
: 필수 - _integer 또는 string_
<br />LLM Observability로 데이터 전송을 활성화하는 토글입니다. `1` 또는 `true`로 설정해야 합니다.

`DD_LLMOBS_ML_APP`
: 선택 사항 - _string_
<br />모든 트레이스와 스팬이 그룹화되는 LLM 애플리케이션, 서비스 또는 프로젝트의 이름입니다. 이를 통해 서로 다른 애플리케이션 또는 실험을 구분할 수 있습니다. 허용 문자 및 기타 제약 사항은 [애플리케이션 명명 지침](#application-naming-guidelines)을 참조하세요. 특정 루트 스팬에 대해 이 값을 재정의하려면 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요. 지정하지 않으면 [`DD_SERVICE`][1] 값 또는 업스트림 서비스에서 전파된 `DD_LLMOBS_ML_APP` 값이 기본값으로 사용됩니다.
<br />**참고**: 버전 `dd-trace@5.66.0` 이전에는 이 값이 **필수 필드**였습니다.

`DD_LLMOBS_AGENTLESS_ENABLED`
: 선택 사항 - _integer 또는 string_ - **기본값**: `false`
<br />Datadog Agent를 사용하지 않는 경우에만 필요하며, 이 경우 `1` 또는 `true`로 설정해야 합니다.

`DD_API_KEY`
: 선택 사항 - _string_
<br />Datadog API 키입니다. Datadog Agent를 사용하지 않는 경우에만 필요합니다.

[1]: /ko/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{% tab "Java" %}}

`dd-trace-java`를 사용하여 애플리케이션을 실행하고 필수 파라미터를 환경 변수 또는 시스템 속성으로 지정하여 LLM Observability를 활성화합니다.

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> \
java -javaagent:path/to/your/dd-trace-java-jar/dd-java-agent-SNAPSHOT.jar \
-Ddd.service=my-app -Ddd.llmobs.enabled=true -Ddd.llmobs.ml.app=my-ml-app -jar path/to/your/app.jar
```

#### 환경 변수 및 시스템 속성 {#environment-variables-and-system-properties}

다음 파라미터는 환경 변수(예: `DD_LLMOBS_ENABLED`) 또는 Java 시스템 속성(예: `dd.llmobs_enabled`)으로 제공할 수 있습니다.

`DD_SITE` 또는 `dd.site`
: 필수 - _string_
<br />LLM 데이터를 제출할 대상 Datadog 사이트입니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

`DD_LLMOBS_ENABLED` 또는 `dd.llmobs.enabled`
: 필수 - _integer 또는 string_
<br />LLM Observability로 데이터 전송을 활성화하는 토글입니다. `1` 또는 `true`로 설정해야 합니다.

`DD_LLMOBS_ML_APP` 또는 `dd.llmobs.ml.app`
: 선택 사항 - _string_
<br />모든 트레이스와 스팬이 그룹화되는 LLM 애플리케이션, 서비스 또는 프로젝트의 이름입니다. 이를 통해 서로 다른 애플리케이션 또는 실험을 구분할 수 있습니다. 허용 문자 및 기타 제약 사항은 [애플리케이션 명명 지침](#application-naming-guidelines)을 참조하세요. 특정 루트 스팬에 대해 이 값을 재정의하려면 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요. 지정하지 않으면 [`DD_SERVICE`][1] 값 또는 업스트림 서비스에서 전파된 `DD_LLMOBS_ML_APP` 값이 기본값으로 사용됩니다.
<br />**참고**: `dd-trace-java`버전 1.54.0 이전에는 이 값이 **필수 필드**였습니다.

`DD_LLMOBS_AGENTLESS_ENABLED` 또는 `dd.llmobs.agentless.enabled`
: 선택 사항 - _integer 또는 string_ - **기본값**: `false`
<br />Datadog Agent를 사용하지 않는 경우에만 필요하며, 이 경우 `1` 또는 `true`로 설정해야 합니다.

`DD_API_KEY` 또는 `dd.api.key`
: 선택 사항 - _string_
<br />Datadog API 키입니다. Datadog Agent를 사용하지 않는 경우에만 필요합니다.

[1]: /ko/getting_started/tagging/unified_service_tagging?tab=kubernetes#non-containerized-environment
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="인코드 설정" level="h3" expanded=false id="in-code-setup" %}}

[명령줄 설정](#command-line-setup) 대신 프로그래밍 방식으로도 LLM Observability를 활성화할 수 있습니다.

{{< tabs >}}
{{% tab "Python" %}}

`LLMObs.enable()` 함수를 사용하여 LLM Observability를 활성화합니다.

<div class="alert alert-info">
이 설정 방식은 <code>ddtrace-run</code> 명령과 함께 사용하지 마세요.
</div>

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
LLMObs.enable(
  ml_app="<YOUR_ML_APP_NAME>",
  api_key="<YOUR_DATADOG_API_KEY>",
  site="<YOUR_DATADOG_SITE>",
  agentless_enabled=True,
)
{{< /code-block >}}

##### 파라미터 {#parameters}

`ml_app`
: 선택 사항 - _string_
<br />모든 트레이스와 스팬이 그룹화되는 LLM 애플리케이션, 서비스 또는 프로젝트의 이름입니다. 이를 통해 서로 다른 애플리케이션 또는 실험을 구분할 수 있습니다. 허용 문자 및 기타 제약 사항은 [애플리케이션 명명 지침](#application-naming-guidelines)을 참조하세요. 주어진 트레이스에 대해 이 값을 재정의하려면 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요. 지정하지 않으면 `DD_LLMOBS_ML_APP` 값이 기본값으로 사용됩니다.

`integrations_enabled` - **기본값**: `true`
: 선택 사항 - _boolean_
<br />Datadog에서 지원하는 [LLM 통합][1]에 대해 LLM 호출을 자동으로 추적하도록 활성화하는 플래그입니다. 지정하지 않으면 모든 지원되는 LLM 통합이 기본적으로 활성화됩니다. LLM 통합을 사용하지 않으려면 이 값을 `false`로 설정하세요.

`agentless_enabled`
: 선택 사항 - _boolean_ - **기본값**: `false`
<br />Datadog Agent를 사용하지 않는 경우에만 필요하며, 이 경우 `True`로 설정해야 합니다. 이 구성은 `ddtrace` 라이브러리가 Datadog Agent가 필요한 데이터를 전송하지 않도록 구성합니다. 지정하지 않으면 `DD_LLMOBS_AGENTLESS_ENABLED` 값이 기본값으로 사용됩니다.

`site`
: 선택 사항 - _string_
<br />LLM 데이터를 제출할 Datadog 사이트입니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. 지정하지 않으면 `DD_SITE` 값이 기본값으로 사용됩니다.

`api_key`
: 선택 사항 - _string_
<br />Datadog API 키입니다. Datadog Agent를 사용하지 않는 경우에만 필요합니다. 지정하지 않으면 `DD_API_KEY` 값이 기본값으로 사용됩니다.

`env`
: 선택 사항 - _string_
<br />애플리케이션이 실행되는 환경 이름입니다(예: : `prod`, `pre-prod`, `staging`). 지정하지 않으면 `DD_ENV` 값이 기본값으로 사용됩니다.

`service`
: 선택 사항 - _string_
<br />애플리케이션에 사용되는 서비스의 이름입니다. 지정하지 않으면 `DD_SERVICE` 값이 기본값으로 사용됩니다.

[1]: /ko/llm_observability/instrumentation/auto_instrumentation/
{{% /tab %}}

{{% tab "Node.js" %}}

<div class="alert alert-info">
이 설정 방식은 <code>dd-trace/initialize.mjs</code> 명령과 함께 사용하지 마세요.
</div>

`init()` 함수를 사용하여 LLM Observability를 활성화합니다.

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
    agentlessEnabled: true,
  },
  site: "<YOUR_DATADOG_SITE>",
  env: "<YOUR_ENV>",
});

const llmobs = tracer.llmobs;
{{< /code-block >}}

**`llmobs` 구성 옵션**

`mlApp`
: 선택 사항 - _string_
<br />모든 트레이스와 스팬이 그룹화되는 LLM 애플리케이션, 서비스 또는 프로젝트의 이름입니다. 이를 통해 서로 다른 애플리케이션 또는 실험을 구분할 수 있습니다. 허용 문자 및 기타 제약 사항은 [애플리케이션 명명 지침](#application-naming-guidelines)을 참조하세요. 주어진 트레이스에 대해 이 값을 재정의하려면 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요. 지정하지 않으면 `DD_LLMOBS_ML_APP` 값이 기본값으로 사용됩니다.

`agentlessEnabled`
: 선택 사항 - _boolean_ - **기본값**: `false`
<br />Datadog Agent를 사용하지 않는 경우에만 필요하며, 이 경우 `true`로 설정해야 합니다. 이 구성은 `dd-trace` 라이브러리가 Datadog Agent가 필요한 데이터를 전송하지 않도록 구성합니다. 지정하지 않으면 `DD_LLMOBS_AGENTLESS_ENABLED` 값이 기본값으로 사용됩니다.

**일반 트레이서 구성 옵션**:

`site`
: 선택 사항 - _string_
<br />LLM 데이터를 제출할 Datadog 사이트입니다. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. 지정하지 않으면 `DD_SITE` 값이 기본값으로 사용됩니다.

`env`
: 선택 사항 - _string_
<br />애플리케이션이 실행되는 환경 이름입니다(예: : `prod`, `pre-prod`, `staging`). 지정하지 않으면 `DD_ENV` 값이 기본값으로 사용됩니다.

`service`
: 선택 사항 - _string_
<br />애플리케이션에 사용되는 서비스의 이름입니다. 지정하지 않으면 `DD_SERVICE` 값이 기본값으로 사용됩니다.

##### 환경 변수 {#environment-variables}

다음 값을 환경 변수로 설정하세요. 프로그래밍 방식으로는 구성할 수 없습니다.

`DD_API_KEY`
: 선택 사항 - _string_
<br />Datadog API 키입니다. Datadog Agent를 사용하지 않는 경우에만 필요합니다.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="AWS Lambda 설정" level="h3" expanded=false id="aws-lambda-setup" %}}

기존 AWS Lambda 함수를 LLM Observability로 계측하려면 Datadog 확장 및 해당 언어 레이어를 사용할 수 있습니다.

1. AWS 콘솔에서 CloudShell을 엽니다.
2. Datadog CLI 클라이언트를 설치합니다.

```shell
npm install -g @datadog/datadog-ci
```
3. Datadog API 키와 사이트를 설정합니다.

```shell
export DD_API_KEY=<YOUR_DATADOG_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
```
이미 Secrets Manager에 저장된 시크릿이 있거나 이를 사용하려는 경우, 해당 시크릿의 ARN을 사용하여 API 키를 설정할 수 있습니다.

```shell
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>
```
4. LLM Observability를 사용하도록 Lambda 함수를 설치합니다(Datadog 확장 레이어 버전 77 이상 필요).
{{< tabs >}}
{{% tab "Python" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Node.js" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}

{{% tab "Java" %}}

```shell
datadog-ci lambda instrument -f <YOUR_LAMBDA_FUNCTION_NAME> -r <AWS_REGION> -v {{< latest-lambda-layer-version layer="dd-trace-java" >}} -e {{< latest-lambda-layer-version layer="extension" >}} --llmobs <YOUR_LLMOBS_ML_APP>
```
{{% /tab %}}
{{< /tabs >}}

4. Lambda 함수를 호출한 후 Datadog UI에서 LLM Observability 트레이스가 표시되는지 확인합니다.

Lambda 함수가 반환되기 전에 `flush` 메서드를 사용하여 LLM Observability 트레이스를 수동으로 플러시합니다.

{{< tabs >}}
{{% tab "Python" %}}

```python
from ddtrace.llmobs import LLMObs
def handler():
  # function body
  LLMObs.flush()
```
{{% /tab %}}

{{% tab "Node.js" %}}

```javascript
import tracer from 'dd-trace';
const llmobs = tracer.llmobs;

export const handler = async (event) => {
  // your function body
  llmobs.flush();
};
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}


SDK를 설치하고 애플리케이션을 실행하면 자동 계측을 통해 LLM Observability에 일부 데이터가 표시되는 것을 확인할 수 있습니다. 아직 지원되지 않는 라이브러리에서 생성된 사용자 지정 프레임워크나 작업을 수집하려면 수동 계측을 사용할 수 있습니다.

## 수동 계측 {#manual-instrumentation}

{{< tabs >}}
{{% tab "Python" %}}

LLM 작업을 캡처하기 위해 함수 데코레이터를 사용하여 워크플로를 손쉽게 계측할 수 있습니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def handle_user_request():
    ...
{{< /code-block >}}

또는 세밀한 작업을 캡처하기 위해 컨텍스트 관리자 기반 접근 방식을 사용할 수도 있습니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

with LLMObs.llm(model="gpt-4o"):
    call_llm()
    LLMObs.annotate(
        metrics={
            "input_tokens": ...,
            "output_tokens": ...,
        },
    )
{{< /code-block >}}


사용 가능한 스팬 종류의 목록은 [스팬 종류 설명서][1]를 참조하세요. 함수 내부 작업을 보다 세밀하게 추적하려면 [인라인 메서드를 사용한 스팬 추적](#tracing-spans-using-inline-methods)을 참조하세요.

[1]: /ko/llm_observability/terms/
{{% /tab %}}

{{% tab "Node.js" %}}

스팬을 추적하려면 추적하려는 함수에 대해 함수 래퍼로 `llmobs.wrap(options, function)`을 사용하세요. 사용 가능한 스팬 종류의 목록은 [스팬 종류 설명서][1]를 참조하세요. 함수 내부 작업을 보다 세밀하게 추적하려면 [인라인 메서드를 사용한 스팬 추적](#tracing-spans-using-inline-methods)을 참조하세요.

### 스팬 종류 {#span-kinds}

스팬 종류는 필수이며, `llmobs` 추적 함수(`trace`, `wrap`, `decorate`)에 전달되는 `options` 객체에서 지정합니다. 지원되는 스팬 종류의 목록은 [스팬 종류 설명서][1]를 참조하세요.

**참고:** 유효하지 않은 스팬 종류의 스팬은 LLM Observability에 제출되지 않습니다.

### 함수 인수/출력/이름 자동 캡처 {#automatic-function-argumentoutputname-capturing}

`llmobs.wrap`(TypeScript의 경우 [`llmobs.decorate`](#function-decorators-in-typescript) 포함)는 추적 중인 함수의 입력값, 출력값 및 함수 이름을 자동으로 캡처하려고 시도합니다. 스팬에 수동으로 주석을 달아야 하는 경우 [스팬 강화](#enriching-spans)를 참조하세요. 입력과 출력에 주석을 달면 자동 수집된 값을 재정의하게 됩니다. 또한 함수 이름을 재정의하려면 `llmobs.wrap` 함수의 options 객체에 `name` 속성을 전달하면 됩니다.

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'differentFunctionName' }, processMessage)
{{< /code-block >}}

### 래핑된 함수의 스팬 종료 조건 {#conditions-for-finishing-a-span-for-a-wrapped-function}

`llmobs.wrap`은 [`tracer.wrap`][2]의 기본 동작을 확장합니다. 함수가 호출될 때 생성된 기본 스팬은 다음 조건에서 종료됩니다.

- 함수가 Promise를 반환하면 Promise가 해결되거나 거부될 때 스팬이 종료됩니다.
- 함수의 마지막 파라미터가 콜백인 경우 해당 콜백이 호출될 때 스팬이 종료됩니다.
- 함수가 콜백을 받지 않고 Promise도 반환하지 않으면 함수 실행이 끝날 때 스팬이 종료됩니다.

다음 예시는 마지막 인수가 콜백인 두 번째 조건을 보여줍니다.

#### 예시 {#example}

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res, next) {
  const err = ... // user application logic
  // the span for this function is finished when `next` is called
  next(err)
}
myAgentMiddleware = llmobs.wrap({ kind: 'agent' }, myAgentMiddleware)

app.use(myAgentMiddleware)

{{< /code-block >}}

애플리케이션에서 콜백 함수를 사용하지 않는 경우, 인라인 추적 블록을 사용하는 것이 좋습니다. 자세한 내용은 [인라인 메서드를 사용한 스팬 추적](#tracing-spans-using-inline-methods)을 참조하세요.

{{< code-block lang="javascript" >}}
const express = require('express')
const app = express()

function myAgentMiddleware (req, res) {
  // the `next` callback is not being used here
  return llmobs.trace({ kind: 'agent', name: 'myAgentMiddleware' }, () => {
    return res.status(200).send('Hello World!')
  })
}

app.use(myAgentMiddleware)

{{< /code-block >}}

[1]: /ko/llm_observability/terms/
[2]: /ko/tracing/trace_collection/custom_instrumentation/nodejs/dd-api/?tab=wrapper
{{% /tab %}}
{{% tab "Java" %}}

### 스팬 시작하기 {#starting-a-span}

스팬은 시작하려는 스팬의 종류에 따라 여러 방법으로 시작할 수 있습니다. 지원되는 스팬 종류의 목록은 [스팬 종류 설명서][1]를 참조하세요.

모든 스팬은 `LLMObsSpan`의 객체 인스턴스로 시작됩니다. 각 스팬에는 스팬과 상호작용하고 데이터를 기록할 수 있는 메서드가 제공됩니다.

### 스팬 종료하기 {#finishing-a-span}

트레이스를 Datadog 앱에 제출하고 표시하려면 스팬을 종료해야 합니다.

스팬을 종료하려면 스팬 객체 인스턴스에서 `finish()`를 호출하세요. 가능한 경우, 예외가 발생하더라도 스팬이 제출되도록 `try/finally` 블록으로 감싸는 것이 좋습니다.

#### 예시 {#example-1}

```java
    try {
        LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", "ml-app-override", "session-141");
        // user logic
        // interact with started span
    } finally {
      workflowSpan.finish();
    }
```

[1]: /ko/llm_observability/terms/#span-kinds
{{% /tab %}}
{{< /tabs >}}

### LLM 호출 {#llm-calls}

<div class="alert alert-info"><a href="/llm_observability/instrumentation/auto_instrumentation/">Datadog의 LLM 통합</a>에서 지원하는 LLM 제공업체 또는 프레임워크를 사용하는 경우, 이러한 작업을 추적하기 위해 LLM 스팬을 수동으로 시작할 필요가 없습니다.</div>

<div class="alert alert-info">LLM 스팬을 수동으로 계측하는 경우에는 토큰 수(예: <code>input_tokens</code>, <code>output_tokens</code>및 <code>total_tokens</code>)를 직접 기록해야 하며, 이를 위해 스팬에 주석을 달아야 합니다. 자세한 내용은 <a href="#enriching-spans">스팬 강화</a>를 참조하세요.</div>

{{< tabs >}}
{{% tab "Python" %}}
LLM 호출을 추적하려면 함수 데코레이터 `ddtrace.llmobs.decorators.llm()`을 사용하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="llm-span-arguments" %}}

`model_name`
: 필수 - _string_
<br/>호출된 LLM의 이름입니다.

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`model_provider`
: 선택 사항 - _string_ - **기본값**: `"custom"`
<br />모델 제공자의 이름입니다.
<br />**참고**: 미국 달러 기준 예상 비용을 표시하려면 `model_provider` 값을 `openai`, `azure_openai` 또는 `anthropic` 중 하나로 설정하세요.

`session_id`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`ml_app`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-2}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call(prompt):
    completion = ... # user application logic to invoke LLM
    LLMObs.annotate(
        input_data=[{"role": "user", "content": prompt}],
        output_data=[{"role": "assistant", "content": completion}],
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
    )
    return completion
{{< /code-block >}}
{{% /tab %}}

{{% tab "Node.js" %}}
LLM 호출을 추적하려면 스팬 종류를 `llm`로 지정하고 필요에 따라 options 객체에 다음 인수를 지정하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="llm-span-arguments" %}}

`modelName`
: 선택 사항 - _string_ - **기본값**: `"custom"`
<br/>호출된 LLM의 이름입니다.

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`modelProvider`
: 선택 사항 - _string_ - **기본값**: `"custom"`
<br/>모델 제공자의 이름입니다.
<br />**참고**: 미국 달러 기준 예상 비용을 표시하려면 `modelProvider` 값을 `openai`, `azure_openai` 또는 `anthropic` 중 하나로 설정하세요.

`sessionId`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`mlApp`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-3}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: prompt }],
    outputData: [{ role: "assistant", content: completion }],
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
LLM 호출을 추적하려면 아래 나열된 인수와 함께 다음 메서드를 가져와 호출하세요.

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startLLMSpan(spanName, modelName, modelProvider, mlApp, sessionID);
```

{{% collapse-content title="인수" level="h4" expanded=false id="llm-span-arguments" %}}

`spanName`
: 선택 사항 - _String_
<br/>작업의 이름입니다. 지정하지 않으면 `spanName`은 스팬 종류를 기본값으로 사용합니다.

`modelName`
: 선택 사항 - _String_ - **기본값**: `"custom"`
<br/>호출된 LLM의 이름입니다.

`modelProvider`
: 선택 사항 - _String_ - **기본값**: `"custom"`
<br/>모델 제공자의 이름입니다.
<br />**참고**: 미국 달러 기준 예상 비용을 표시하려면 `modelProvider` 값을 `openai`, `azure_openai` 또는 `anthropic` 중 하나로 설정하세요.

`mlApp`
: 선택 사항 - _String_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. null이 아닌 값을 제공하면 애플리케이션 시작 시 지정된 ML 애플리케이션 이름을 재정의합니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

`sessionId`
: 선택 사항 - _String_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-4}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeModel() {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String inference = ... // user application logic to invoke LLM
    llmSpan.annotateIO(...); // record the input and output
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "total_tokens", 955
    ));
    llmSpan.finish();
    return inference;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### 워크플로 {#workflows}

{{< tabs >}}
{{% tab "Python" %}}
워크플로 스팬을 추적하려면 함수 데코레이터 `ddtrace.llmobs.decorators.workflow()`를 사용하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="workflow-span-arguments" %}}
`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`session_id`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`ml_app`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-5}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

워크플로 스팬을 추적하려면 스팬 종류를 `workflow`로 지정하고 필요에 따라 options 객체에 인수를 지정하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="workflow-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`sessionId`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`mlApp`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-6}

{{< code-block lang="javascript" >}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
워크플로 스팬을 추적하려면 아래 나열된 인수와 함께 다음 메서드를 가져와 호출하세요.

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startWorkflowSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="인수" level="h4" expanded=false id="workflow-span-arguments" %}}

`spanName`
: 선택 사항 - _String_
<br/>작업의 이름입니다. 지정하지 않으면 `spanName`은 스팬 종류를 기본값으로 사용합니다.

`mlApp`
: 선택 사항 - _String_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. null이 아닌 값을 제공하면 애플리케이션 시작 시 지정된 ML 애플리케이션 이름을 재정의합니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

`sessionId`
: 선택 사항 - _String_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-7}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String executeWorkflow() {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("my-workflow-span-name", null, "session-141");
    String workflowResult = workflowFn(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return workflowResult;
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### 에이전트 {#agents}

{{< tabs >}}
{{% tab "Python" %}}
에이전트 실행을 추적하려면 함수 데코레이터 `ddtrace.llmobs.decorators.agent()`를 사용하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`session_id`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`ml_app`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.
{{% /collapse-content %}}

#### 예시 {#example-8}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import agent

@agent
def react_agent():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
에이전트 실행을 추적하려면 스팬 종류를 `agent`로 지정하고 필요에 따라 options 객체에 인수를 지정하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="agent-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`sessionId`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`mlApp`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-9}

{{< code-block lang="javascript" >}}
function reactAgent () {
  ... // user application logic
  return
}
reactAgent = llmobs.wrap({ kind: 'agent' }, reactAgent)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
에이전트 실행을 추적하려면 아래 나열된 인수와 함께 다음 메서드를 가져와 호출하세요.

```
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startAgentSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="인수" level="h4" expanded=false id="agent-span-arguments" %}}

`spanName`
: 선택 사항 - _String_
<br/>작업의 이름입니다. 지정하지 않으면 `spanName`은 추적된 함수의 이름을 기본값으로 사용합니다.

`mlApp`
: 선택 사항 - _String_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. null이 아닌 값을 제공하면 애플리케이션 시작 시 지정된 ML 애플리케이션 이름을 재정의합니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

`sessionId`
: 선택 사항 - _String_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### 도구 호출 {#tool-calls}

{{< tabs >}}
{{% tab "Python" %}}
도구 호출을 트레이스하려면 함수 데코레이터 `ddtrace.llmobs.decorators.tool()`을 사용하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`session_id`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`ml_app`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-10}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import tool

@tool
def call_weather_api():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
도구 호출을 추적하려면 스팬 종류를 `tool`로 지정하고 필요에 따라 options 객체에 인수를 지정하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="tool-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`sessionId`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`mlApp`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-11}

{{< code-block lang="javascript" >}}
function callWeatherApi () {
  ... // user application logic
  return
}
callWeatherApi = llmobs.wrap({ kind: 'tool' }, callWeatherApi)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
도구 호출을 추적하려면 아래 나열된 인수와 함께 다음 메서드를 가져와 호출하세요.

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startToolSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="인수" level="h4" expanded=false id="tool-span-arguments" %}}

`spanName`
: 선택 사항 - _String_
<br/>작업의 이름입니다. 지정하지 않으면 `spanName`은 추적된 함수의 이름을 기본값으로 사용합니다.

`mlApp`
: 선택 사항 - _String_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. null이 아닌 값을 제공하면 애플리케이션 시작 시 지정된 ML 애플리케이션 이름을 재정의합니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

`sessionId`
: 선택 사항 - _String_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### 작업 {#tasks}

{{< tabs >}}
{{% tab "Python" %}}
작업 스팬을 트레이스하려면 함수 데코레이터 `LLMObs.task()`를 사용하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`session_id`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`ml_app`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-12}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task

@task
def sanitize_input():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
작업 스팬을 추적하려면 스팬 종류를 `task`로 지정하고 필요에 따라 options 객체에 인수를 지정하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="task-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`sessionId`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`mlApp`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-13}

{{< code-block lang="javascript" >}}
function sanitizeInput () {
  ... // user application logic
  return
}
sanitizeInput = llmobs.wrap({ kind: 'task' }, sanitizeInput)
{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
작업 스팬을 추적하려면 아래 나열된 인수와 함께 다음 메서드를 가져와 호출하세요.

```java
import datadog.trace.api.llmobs.LLMObs;
LLMObs.startTaskSpan(spanName, mlApp, sessionID);
```

{{% collapse-content title="인수" level="h4" expanded=false id="task-span-arguments" %}}

`spanName`
: 선택 사항 - _String_
<br/>작업의 이름입니다. 지정하지 않으면 `spanName`은 추적된 함수의 이름을 기본값으로 사용합니다.

`mlApp`
: 선택 사항 - _String_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. null이 아닌 값을 제공하면 애플리케이션 시작 시 지정된 ML 애플리케이션 이름을 재정의합니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

`sessionId`
: 선택 사항 - _String_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.


{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### 임베딩 {#embeddings}

{{< tabs >}}
{{% tab "Python" %}}
임베딩 작업을 추적하려면 함수 데코레이터 `LLMObs.embedding()`을 사용하세요.

**참고**: 임베딩 스팬의 입력에 주석을 달려면 다른 스팬 유형과 다른 형식을 사용해야 합니다. 임베딩 입력을 지정하는 방법에 대한 자세한 내용은 [스팬 강화](#enriching-spans)를 참조하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="embedding-span-arguments" %}}

`model_name`
: 필수 - _string_
<br/>호출된 LLM의 이름입니다.

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름으로 설정됩니다.

`model_provider`
: 선택 사항 - _string_ - **기본값**: `"custom"`

`session_id`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`ml_app`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-14}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import embedding

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
임베딩 작업을 추적하려면 스팬 종류를 `embedding`로 지정하고 필요에 따라 options 객체에 인수를 지정하세요.

**참고**: 임베딩 스팬의 입력에 주석을 달려면 다른 스팬 유형과 다른 형식을 사용해야 합니다. 임베딩 입력을 지정하는 방법에 대한 자세한 내용은 [스팬 강화](#enriching-spans)를 참조하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="embedding-span-arguments" %}}

`modelName`
: 선택 사항 - _string_ - **기본값**: `"custom"`
<br/>호출된 LLM의 이름입니다.

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름으로 설정됩니다.

`modelProvider`
: 선택 사항 - _string_ - **기본값**: `"custom"`
<br/>모델 제공자의 이름입니다.

`sessionId`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`mlApp`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-15}

{{< code-block lang="javascript" >}}
function performEmbedding () {
  ... // user application logic
  return
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)
{{< /code-block >}}


{{% /tab %}}
{{< /tabs >}}

### 검색 {#retrievals}

{{< tabs >}}
{{% tab "Python" %}}
검색 스팬을 추적하려면 함수 데코레이터 `ddtrace.llmobs.decorators.retrieval()`을 사용하세요.

**참고**: 검색 스팬의 출력에 주석을 달려면 다른 스팬 유형과 다른 형식을 사용해야 합니다. 검색 출력을 지정하는 방법에 대한 자세한 내용은 [스팬 강화](#enriching-spans)를 참조하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`session_id`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`ml_app`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-16}

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import retrieval

@retrieval
def get_relevant_docs(question):
    context_documents = ... # user application logic
    LLMObs.annotate(
        input_data=question,
        output_data = [
            {"id": doc.id, "score": doc.score, "text": doc.text, "name": doc.name} for doc in context_documents
        ]
    )
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

검색 스팬을 추적하려면 스팬 종류를 `retrieval`로 지정하고 필요에 따라 options 객체에 다음 인수를 지정하세요.

**참고**: 검색 스팬의 출력에 주석을 달려면 다른 스팬 유형과 다른 형식을 사용해야 합니다. 검색 출력을 지정하는 방법에 대한 자세한 내용은 [스팬 강화](#enriching-spans)를 참조하세요.

{{% collapse-content title="인수" level="h4" expanded=false id="retrieval-span-arguments" %}}

`name`
: 선택 사항 - _string_
<br/>작업의 이름입니다. 지정하지 않으면 `name`은 추적된 함수의 이름을 기본값으로 사용합니다.

`sessionId`
: 선택 사항 - _string_
<br/>기본 사용자 세션의 ID입니다. 자세한 내용은 [사용자 세션 추적](#tracking-user-sessions)을 참조하세요.

`mlApp`
: 선택 사항 - _string_
<br/>해당 작업이 속한 ML 애플리케이션의 이름입니다. 자세한 내용은 [여러 애플리케이션 추적](#tracing-multiple-applications)을 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-17}

다음에는 스팬에 주석을 다는 예시도 포함되어 있습니다. 자세한 내용은 [스팬 강화](#enriching-spans)를 참조하세요.

{{< code-block lang="javascript" >}}
function getRelevantDocs (question) {
  const contextDocuments = ... // user application logic
  llmobs.annotate({
    inputData: question,
    outputData: contextDocuments.map(doc => ({
      id: doc.id,
      score: doc.score,
      text: doc.text,
      name: doc.name
    }))
  })
  return
}
getRelevantDocs = llmobs.wrap({ kind: 'retrieval' }, getRelevantDocs)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 스팬 중첩 {#nesting-spans}

현재 스팬이 종료되기 전에 새로운 스팬을 시작하면 두 스팬 간에 자동으로 부모-자식 관계가 추적됩니다. 부모 스팬은 더 큰 작업을 나타내며, 자식 스팬은 그 안의 더 작은 중첩된 하위 작업을 나타냅니다.

{{< tabs >}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import task, workflow

@workflow
def extract_data(document):
    preprocess_document(document)
    ... # performs data extraction on the document
    return

@task
def preprocess_document(document):
    ... # preprocesses a document for data extraction
    return
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
function preprocessDocument (document) {
  ... // preprocesses a document for data extraction
  return
}
preprocessDocument = llmobs.wrap({ kind: 'task' }, preprocessDocument)

function extractData (document) {
  preprocessDocument(document)
  ... // performs data extraction on the document
  return
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)
{{< /code-block >}}
{{% /tab %}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;
import datadog.trace.api.llmobs.LLMObsSpan;

public class MyJavaClass {
  public void preprocessDocument(String document) {
  LLMObsSpan taskSpan = LLMObs.startTaskSpan("preprocessDocument", null, "session-141");
   ...   // preprocess document for data extraction
   taskSpan.annotateIO(...); // record the input and output
   taskSpan.finish();
  }

  public String extractData(String document) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("extractData", null, "session-141");
    preprocessDocument(document);
    ... // perform data extraction on the document
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
  }
}

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}


## 스팬 강화 {#enriching-spans}

<div class="alert alert-info">
여기서 사용되는 <code>metrics</code> 파라미터는 개별 스팬의 속성으로 연결되는 숫자 값을 의미하며, <a href="/llm_observability/monitoring/metrics/">Datadog 플랫폼 메트릭</a>을 의미하는 것은 아닙니다. 인지되는 특정 키(예: <code>input_tokens</code>, <code>output_tokens</code>및 <code>total_tokens</code>)의 경우 Datadog는 이러한 스팬 속성을 사용해 해당 플랫폼 메트릭(예: <code>ml_obs.span.llm.input.tokens</code>)을 생성하며, 생성된 메트릭은 대시보드와 모니터에서 사용할 수 있습니다.
</div>

{{< tabs >}}
{{% tab "Python" %}}
SDK는 입력, 출력 및 메타데이터로 스팬을 강화하기 위해 `LLMObs.annotate()` 메서드를 제공합니다.

`LLMObs.annotate()` 메서드는 다음 인수를 허용합니다.

{{% collapse-content title="인수" level="h4" expanded=false id="annotating-span-arguments" %}}

`span`
: 선택 사항 - _Span_ - **기본값**: 현재 활성 스팬
<br />주석을 달 스팬입니다. `span`가 제공되지 않으면(함수 데코레이터를 사용하는 경우 등) SDK는 현재 활성 스팬에 주석을 답니다.

`input_data`
: 선택 사항 - _JSON 직렬화 가능 유형 또는 딕셔너리 목록_
<br />JSON 직렬화 가능 유형(LLM 이외의 스팬용) 또는 다음 형식의 딕셔너리 목록: `{"content": "...", "role": "...", "tool_calls": ..., "tool_results": ...}`. 여기서 `"tool_calls"`는 함수 호출(function calling) 시나리오를 위한 선택적 도구 호출 딕셔너리 목록이며, 필수 키는 `"name"`, `"arguments"`이고 선택적 키는 `"tool_id"`, `"type"`입니다. 또한 `"tool_results"`는 선택적 도구 결과 딕셔너리 목록이며, 필수 키는 `"result"`, 선택적 키는 `"name"`, `"tool_id"`, `"type"`입니다. **참고**: 임베딩 스팬은 예외적으로 문자열 또는 다음 형식의 딕셔너리(또는 딕셔너리 목록)를 사용해야 합니다. `{"text": "..."}`.

`output_data`
: 선택 사항 - _JSON 직렬화 가능 유형 또는 딕셔너리 목록_
<br />JSON 직렬화 가능 유형(LLM 이외의 스팬용) 또는 다음 형식의 딕셔너리 목록입니다. `{"content": "...", "role": "...", "tool_calls": ...}`. 여기서 `"tool_calls"`는 함수 호출 시나리오를 위한 선택적 도구 호출 딕셔너리 목록이며, 필수 키는 `"name"`, `"arguments"`, 선택적 키는 `"tool_id"`, `"type"`입니다. **참고**: 검색 스팬은 예외적으로 문자열 또는 다음 형식의 딕셔너리(또는 딕셔너리 목록)를 사용해야 합니다. `{"text": "...", "name": "...", "score": float, "id": "..."}`.

`tool_definitions`
: 선택 사항 - _딕셔너리 목록_
<br />함수 호출 시 사용할 도구 정의 딕셔너리 목록입니다. 각 도구 정의에는 필수 `"name": "..."` 키와 선택 사항인 `"description": "..."`, `"schema": {...}` 키가 포함되어야 합니다.

`metadata`
: 선택 사항 - _dictionary_
<br />스팬이 설명하는 입력 또는 출력 작업과 관련된 메타데이터 정보(`model_temperature`, `max_tokens`, `top_k` 등)를 사용자가 추가할 수 있는 JSON 직렬화 가능 키-값 쌍의 딕셔너리입니다.

`metrics`
: 선택 사항 - _dictionary_
<br />스팬이 설명하는 작업과 관련된 메트릭(`input_tokens`, `output_tokens`, `total_tokens`, `time_to_first_token` 등)을 사용자가 추가할 수 있는 JSON 직렬화 가능 키와 숫자 값의 딕셔너리입니다. `time_to_first_token`의 단위는 초이며, 기본적으로 생성되는 `duration` 메트릭과 동일합니다.

`tags`
: 선택 사항 - _dictionary_
<br />사용자가 스팬에 태그로 추가할 수 있는 JSON 직렬화 가능 키-값 쌍의 딕셔너리입니다. 예시 키: `session`, `env`, `system`, `version`. 태그에 대한 자세한 내용은 [태그 시작하기](/getting_started/tagging/)를 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-18}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import embedding, llm, retrieval, workflow

@llm(model_name="model_name", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    LLMObs.annotate(
        span=None,
        input_data=[{"role": "user", "content": "Hello world!"}],
        output_data=[{"role": "assistant", "content": "How can I help?"}],
        metadata={"temperature": 0, "max_tokens": 200},
        metrics={"input_tokens": 4, "output_tokens": 6, "total_tokens": 10},
        tags={"host": "host_name"},
    )
    return resp

@workflow
def extract_data(document):
    resp = llm_call(document)
    LLMObs.annotate(
        input_data=document,
        output_data=resp,
        tags={"host": "host_name"},
    )
    return resp

@embedding(model_name="text-embedding-3", model_provider="openai")
def perform_embedding():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data={"text": "Hello world!"},
        output_data=[0.0023064255, -0.009327292, ...],
        metrics={"input_tokens": 4},
        tags={"host": "host_name"},
    )
    return

@retrieval(name="get_relevant_docs")
def similarity_search():
    ... # user application logic
    LLMObs.annotate(
        span=None,
        input_data="Hello world!",
        output_data=[{"text": "Hello world is ...", "name": "Hello, World! program", "id": "document_id", "score": 0.9893}],
        tags={"host": "host_name"},
    )
    return

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
SDK는 입력, 출력 및 메타데이터로 스팬에 주석을 달기 위해 `llmobs.annotate()` 메서드를 제공합니다.

`LLMObs.annotate()` 메서드는 다음 인수를 허용합니다.

{{% collapse-content title="인수" level="h4" expanded=false id="annotating-span-arguments" %}}
`span`
: 선택 사항 - _Span_ - **기본값**: 현재 활성 스팬
<br />주석을 달 스팬입니다. `span`이 제공되지 않으면(함수 래퍼를 사용하는 경우 등) SDK는 현재 활성 스팬에 주석을 답니다.

`annotationOptions`
: 필수 - _object_
<br />스팬에 주석을 달기 위한 다양한 유형의 데이터 객체입니다.

`annotationOptions` 객체에는 다음 항목이 포함될 수 있습니다.

`inputData`
: 선택 사항 - _JSON 직렬화 가능 유형 또는 객체 목록_
<br />JSON 직렬화 가능 유형(LLM 이외의 스팬용) 또는 다음 형식의 딕셔너리 목록: `{role: "...", content: "..."}`(LLM 스팬용)입니다.  **참고**: 임베딩 스팬은 예외적으로 문자열 또는 다음 형식의 객체(또는 객체 목록)를 사용해야 합니다. `{text: "..."}`.

`outputData`
: 선택 사항 - _JSON 직렬화 가능 유형 또는 객체 목록_
<br />JSON 직렬화 가능 유형(LLM 이외의 스팬용) 또는 다음 형식의 객체 목록`{role: "...", content: "..."}`(LLM 스팬용)입니다. **참고**: 검색 스팬은 예외적으로 문자열 또는 다음 형식의 객체(또는 객체 목록)를 사용해야 합니다. `{text: "...", name: "...", score: number, id: "..."}`.

`metadata`
: 선택 사항 - _객체_
<br />스팬이 설명하는 입력 또는 출력 작업과 관련된 메타데이터 정보(`model_temperature`, `max_tokens`, `top_k` 등)를 사용자가 추가할 수 있는 JSON 직렬화 가능 키-값 쌍 객체입니다.

`metrics`
: 선택 사항 - _객체_
<br />스팬이 설명하는 작업과 관련된 메트릭(`input_tokens`, `output_tokens`, `total_tokens` 등)을 사용자가 추가할 수 있는 JSON 직렬화 가능 키와 숫자 값의 객체입니다.

`tags`
: 선택 사항 - _객체_
<br />스팬의 컨텍스트와 관련된 태그(`session`, `environment`, `system`, `versioning` 등)를 사용자가 추가할 수 있는 JSON 직렬화 가능 키-값 쌍 객체입니다. 태그에 대한 자세한 내용은 [태그 시작하기](/getting_started/tagging/)를 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-19}

{{< code-block lang="javascript" >}}
function llmCall (prompt) {
  const completion = ... // user application logic to invoke LLM
  llmobs.annotate({
    inputData: [{ role: "user", content: "Hello world!" }],
    outputData: [{ role: "assistant", content: "How can I help?" }],
    metadata: { temperature: 0, max_tokens: 200 },
    metrics: { input_tokens: 4, output_tokens: 6, total_tokens: 10 },
    tags: { host: "host_name" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind:'llm', modelName: 'modelName', modelProvider: 'modelProvider' }, llmCall)

function extractData (document) {
  const resp = llmCall(document)
  llmobs.annotate({
    inputData: document,
    outputData: resp,
    tags: { host: "host_name" }
  })
  return resp
}
extractData = llmobs.wrap({ kind: 'workflow' }, extractData)

function performEmbedding () {
  ... // user application logic
  llmobs.annotate(
    undefined, { // this can be set to undefined or left out entirely
      inputData: { text: "Hello world!" },
      outputData: [0.0023064255, -0.009327292, ...],
      metrics: { input_tokens: 4 },
      tags: { host: "host_name" }
    }
  )
}
performEmbedding = llmobs.wrap({ kind: 'embedding', modelName: 'text-embedding-3', modelProvider: 'openai' }, performEmbedding)

function similaritySearch () {
  ... // user application logic
  llmobs.annotate(undefined, {
    inputData: "Hello world!",
    outputData: [{ text: "Hello world is ...", name: "Hello, World! program", id: "document_id", score: 0.9893 }],
    tags: { host: "host_name" }
  })
  return
}
similaritySearch = llmobs.wrap({ kind: 'retrieval', name: 'getRelevantDocs' }, similaritySearch)

{{< /code-block >}}

{{% /tab %}}
{{% tab "Java" %}}
SDK는 입력, 출력, 메트릭 및 메타데이터를 사용해 스팬에 주석을 다는 여러 메서드를 제공합니다.

### 입력 및 출력에 주석 달기 {#annotating-inputs-and-outputs}

`LLMObsSpan` 인터페이스의 `annotateIO()` 멤버 메서드를 사용하여 `LLMObsSpan`에 구조화된 입력 데이터와 출력 데이터를 추가할 수 있습니다. 여기에는 선택적 인수와 LLM 메시지 객체가 포함됩니다.

#### 인수 {#arguments}

인수가 null이거나 비어 있으면 아무 일도 발생하지 않습니다. 예를 들어 `inputData`이 비어 있지 않은 문자열이고 `outputData`가 null인 경우에는 `inputData`만 기록됩니다.

`inputData`
: 선택 사항 - _String_ 또는 _List<LLMObs.LLMMessage>_
<br />LLM 이외의 스팬의 경우 문자열, LLM 스팬의 경우 `LLMObs.LLMMessage` 목록입니다.

`outputData`
: 선택 사항 - _String_ 또는 _List<LLMObs.LLMMessage>_
<br />LLM 이외의 스팬의 경우 문자열, LLM 스팬의 경우 `LLMObs.LLMMessage` 목록입니다.

#### LLM 메시지 {#llm-messages}
LLM 스팬은 `LLMObs.LLMMessage` 객체를 사용하여 LLM 메시지로 주석을 달아야 합니다.

`LLMObs.LLMMessage` 객체는 `LLMObs.LLMMessage.from()`을 호출하여 생성할 수 있으며, 다음 인수를 사용합니다.

`role`
: 필수 - _String_
<br />메시지 작성자의 역할을 설명하는 문자열입니다.

`content`
: 필수 - _String_
<br />메시지의 내용을 포함하는 문자열입니다.

#### 예시 {#example-20}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String systemMessage = "You are a helpful assistant";
    Response chatResponse = ... // user application logic to invoke LLM
    llmSpan.annotateIO(
      Arrays.asList(
        LLMObs.LLMMessage.from("user", userInput),
        LLMObs.LLMMessage.from("system", systemMessage)
      ),
      Arrays.asList(
        LLMObs.LLMMessage.from(chatResponse.role, chatResponse.content)
      )
    );
    llmSpan.finish();
    return chatResponse;
  }
}
```

### 메트릭 추가 {#adding-metrics}

#### 메트릭 일괄 추가 {#bulk-add-metrics}

`LLMObsSpan` 인터페이스의 `setMetrics()` 멤버 메서드는 여러 메트릭을 한 번에 추가하기 위해 다음 인수를 허용합니다.

##### 인수 {#arguments-1}

`metrics`
: 필수 - _Map<String, Number>_
<br />작업과 관련된 메트릭(예: `input_tokens`, `output_tokens`, `total_tokens`)을 기록하기 위해 사용자가 추가할 수 있는 JSON 직렬화 가능 키와 숫자 값의 맵입니다.

#### 단일 메트릭 추가 {#add-a-single-metric}

`LLMObsSpan` 인터페이스의 `setMetric()` 멤버 메서드는 단일 메트릭을 추가하기 위해 다음 인수를 허용합니다.

##### 인수 {#arguments-2}

`key`
: 필수 - _CharSequence_
<br /> 메트릭의 이름입니다.

`value`
: 필수 - _int_, _long_ 또는 _double_
<br /> 메트릭의 값입니다.

#### 예시 {#examples}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setMetrics(Map.of(
      "input_tokens", 617,
      "output_tokens", 338,
      "time_per_output_token", 0.1773
    ));
    llmSpan.setMetric("total_tokens", 955);
    llmSpan.setMetric("time_to_first_token", 0.23);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### 태그 추가 {#adding-tags}

태그에 대한 자세한 내용은 [태그 시작하기][1]를 참조하세요.

#### 태그 일괄 추가 {#bulk-add-tags}

`LLMObsSpan` 인터페이스의 `setTags()` 멤버 메서드는 여러 태그를 한 번에 추가하기 위해 다음 인수를 허용합니다.

##### 인수 {#arguments-3}

`tags`
: 필수 - _Map<String, Object>_
<br />스팬의 컨텍스트를 설명하기 위해 사용자가 추가할 수 있는 JSON 직렬화 가능 키-값 쌍의 맵입니다(예: `session`, `environment`, `system`, `version`).

#### 단일 태그 추가 {#add-a-single-tag}

`LLMObsSpan` 인터페이스의 `setTag()` 멤버 메서드는 단일 태그를 추가하기 위해 다음 인수를 허용합니다.

##### 인수 {#arguments-4}

`key`
: 필수 - _String_
<br /> 태그의 키입니다.

`value`
: 필수 - _int_, _long_, _double_, _boolean_, 또는 _String_
<br /> 태그의 값입니다.

#### 예시 {#examples-1}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = ... // user application logic to invoke LLM
    llmSpan.setTags(Map.of(
      "chat_source", "web",
      "users_in_chat", 3
    ));
    llmSpan.setTag("is_premium_user", true);
    llmSpan.finish();
    return chatResponse;
  }
}
```

### 오류에 주석 달기 {#annotating-errors}

#### Throwable 추가(권장) {#adding-a-throwable-recommended}

`LLMObsSpan` 인터페이스의 `addThrowable()` 멤버 메서드는 스택 추적이 포함된 Throwable을 첨부하기 위해 다음 인수를 허용합니다.

##### 인수 {#arguments-5}

`throwable`
: 필수 - _Throwable_
<br /> 발생한 Throwable/예외입니다.

#### 오류 메시지 추가 {#adding-an-error-message}

`LLMObsSpan` 인터페이스의 `setErrorMessage()` 멤버 메서드는 오류 문자열을 첨부하기 위해 다음 인수를 허용합니다.

##### 인수 {#arguments-6}

`errorMessage`
: 필수 - _String_
<br /> 오류 메시지입니다.

#### 오류 플래그 설정 {#setting-an-error-flag}

`LLMObsSpan` 인터페이스의 `setError()` 멤버 메서드는 작업에 오류가 발생했음을 표시하기 위해 다음 인수를 허용합니다.

##### 인수 {#arguments-7}

`error`
: 필수 - _boolean_
<br />스팬에 오류가 발생한 경우 `true`입니다.

#### 예시 {#examples-2}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();
    }
    return chatResponse;
  }
}
```

### 메타데이터에 주석 달기 {#annotating-metadata}

`LLMObsSpan` 인터페이스의 `setMetadata()` 멤버 메서드는 다음 인수를 허용합니다.

`metadata`
: 필수 - _Map<String, Object>_
<br />스팬이 설명하는 입력 또는 출력 작업과 관련된 메타데이터를 포함하는 JSON 직렬화 가능 키-값 쌍의 맵입니다.

#### 예시 {#example-21}

```java
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    llmSpan.setMetadata(
      Map.of(
        "temperature", 0.5,
        "is_premium_member", true,
        "class", "e1"
      )
    );
    String chatResponse = ... // user application logic to invoke LLM
    return chatResponse;
  }
}
```

[1]: /ko/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

### 자동 계측된 스팬에 주석 달기 {#annotating-auto-instrumented-spans}

{{< tabs >}}
{{% tab "Python" %}}

SDK의 `LLMObs.annotation_context()` 메서드는 주석 컨텍스트가 활성화된 동안 시작되는 모든 자동 계측된 스팬을 수정하는 데 사용할 수 있는 컨텍스트 관리자를 반환합니다.

`LLMObs.annotation_context()` 메서드는 다음 인수를 허용합니다.

{{% collapse-content title="인수" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: 선택 사항 - _str_
<br />주석 컨텍스트 내에서 시작된 자동 계측된 모든 스팬의 이름을 재정의하는 이름입니다.

`prompt`
: 선택 사항 - _dictionary_
<br />LLM 호출에 사용된 프롬프트를 나타내는 딕셔너리입니다. 전체 스키마 및 지원되는 키에 대해서는 [Prompt 객체](#prompt-tracking-arguments) 설명서를 참조하세요. `Prompt` 객체를 `ddtrace.llmobs.utils`에서 가져와 `prompt` 인수로 전달할 수도 있습니다. **참고**: 이 인수는 LLM 스팬에만 적용됩니다.

`tags`
: 선택 사항 - _dictionary_
<br />사용자가 스팬에 태그로 추가할 수 있는 JSON 직렬화 가능 키-값 쌍의 딕셔너리입니다. 예시 키: `session`, `env`, `system`, `version`. 태그에 대한 자세한 내용은 [태그 시작하기](/getting_started/tagging/)를 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-22}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def rag_workflow(user_question):
    context_str = retrieve_documents(user_question).join(" ")

    with LLMObs.annotation_context(
        prompt = Prompt(
            id="chatbot_prompt",
            version="1.0.0",
            template="Please answer the question using the provided context: {{question}}\n\nContext:\n{{context}}",
            variables={
                "question": user_question,
                "context": context_str,
            }
        ),
        tags = {
            "retrieval_strategy": "semantic_similarity"
        },
        name = "augmented_generation"
    ):
        completion = openai_client.chat.completions.create(...)
    return completion.choices[0].message.content

{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

SDK의 `llmobs.annotationContext()`는 콜백 함수 범위 내에서 시작된 모든 자동 계측된 스팬을 수정하는 데 사용할 수 있는 콜백 함수를 허용합니다.

`llmobs.annotationContext()` 메서드는 첫 번째 인수로 다음 옵션을 허용합니다.

{{% collapse-content title="옵션" level="h4" expanded=false id="annotating-autoinstrumented-span-arguments" %}}

`name`
: 선택 사항 - _str_
<br />주석 컨텍스트 내에서 시작된 자동 계측된 모든 스팬의 이름을 재정의하는 이름입니다.

`tags`
: 선택 사항 - _객체_
<br />사용자가 스팬에 태그로 추가할 수 있는 JSON 직렬화 가능 키-값 쌍의 객체입니다. 예시 키: `session`, `env`, `system`, `version`. 태그에 대한 자세한 내용은 [태그 시작하기](/getting_started/tagging/)를 참조하세요.

{{% /collapse-content %}}

#### 예시 {#example-23}

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function ragWorkflow(userQuestion) {
    const contextStr = retrieveDocuments(userQuestion).join(" ");

    const completion = await llmobs.annotationContext({
      tags: {
        retrieval_strategy: "semantic_similarity"
      },
      name: "augmented_generation"
    }, async () => {
      const completion = await openai_client.chat.completions.create(...);
      return completion.choices[0].message.content;
    });
}

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## 프롬프트 추적 {#prompt-tracking}

LLM 스팬에 구조화된 프롬프트 메타데이터를 첨부하여 결과를 재현하고, 변경 사항을 감사하며, 버전 간 프롬프트 성능을 비교할 수 있습니다. 템플릿을 사용할 때 LLM Observability는 템플릿 콘텐츠 변경에 따라 [버전 추적](#version-tracking) 기능도 제공합니다.

{{< tabs >}}
{{% tab "Python" %}}
LLM 호출 전에 프롬프트 메타데이터를 첨부하려면 `LLMObs.annotation_context(prompt=...)`를 사용합니다. 스팬 주석에 대한 자세한 내용은 [스팬 강화](#enriching-spans)를 참조하세요.

#### 인수 {#arguments-8}

{{% collapse-content title="인수" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: 필수 - dictionary
<br />아래의 프롬프트 스키마를 따르는 타입 지정 딕셔너리입니다.

{{% /collapse-content %}}

{{% collapse-content title="프롬프트 구조" level="h4" expanded=false id="prompt-structure" %}}

지원되는 키:

- `id` (str): 이 프롬프트의 논리적 식별자입니다. `ml_app`마다 고유해야 합니다. 기본값은 `{ml_app}-unnamed_prompt`입니다.
- `version` (str): 프롬프트의 버전 태그입니다(예: "1.0.0"). 자세한 내용은 [버전 추적](#version-tracking)을 참조하세요.
- `variables` (Dict[str, str]): 템플릿 자리표시자를 채우는 데 사용되는 변수입니다.
- `template` (str): 자리표시자가 포함된 템플릿 문자열입니다(예: `"Translate {{text}} to {{lang}}"`).
- `chat_template` (List[Message]): 다중 메시지 템플릿 형식입니다. `{ "role": "<role>", "content": "<template string with placeholders>" }` 객체 목록을 제공합니다.
- `tags` (Dict[str, str]): 프롬프트 실행에 첨부할 태그입니다.
- `rag_context_variables` (List[str]): 실제/컨텍스트 콘텐츠를 포함하는 변수 키입니다. [환각 탐지](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)에 사용됩니다.
- `rag_query_variables` (List[str]): 사용자 쿼리를 포함하는 변수 키입니다. [환각 탐지](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)에 사용됩니다.

{{% /collapse-content %}}

#### 예: 단일 템플릿 프롬프트 {#example-single-template-prompt}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def answer_question(text):
    # Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    with LLMObs.annotation_context(prompt={
        "id": "translation-template",
        "version": "1.0.0",
        "chat_template": [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        "variables": {"lang": "fr", "text": text},
        "tags": {"team": "nlp"}
    }):
        # Example provider call (replace with your client)
        completion = openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": f"Translate to fr: {text}"}]
        )
    return completion
{{< /code-block >}}

#### 예: LangChain 프롬프트 템플릿 {#example-langchain-prompt-templates}

LangChain의 프롬프트 템플릿 기능을 자동 계측과 함께 사용하는 경우, 템플릿을 의미 있는 이름의 변수에 할당하세요. 자동 계측은 이러한 변수 이름을 사용하여 프롬프트를 식별합니다.

{{< code-block lang="python" >}}
# "translation_template" will be used to identify the template in Datadog
translation_template = PromptTemplate.from_template("Translate {text} to {language}")
chain = translation_template | llm
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

LLM 호출 전에 프롬프트 메타데이터를 첨부하려면 `llmobs.annotationContext({ prompt: ... }, () => { ... })`를 사용합니다. 스팬 주석에 대한 자세한 내용은 [스팬 강화](#enriching-spans)를 참조하세요.

#### 인수 {#arguments-9}

{{% collapse-content title="옵션" level="h4" expanded=false id="prompt-tracking-arguments" %}}

`prompt`
: 필수 - object
<br />아래 Prompt 스키마를 따르는 객체입니다.

{{% /collapse-content %}}

{{% collapse-content title="프롬프트 구조" level="h4" expanded=false id="prompt-structure" %}}

지원되는 속성:

- `id` (string): 이 프롬프트의 논리적 식별자입니다. `ml_app`마다 고유해야 합니다. 기본값은 `{ml_app}-unnamed_prompt`입니다.
- `version` (string): 프롬프트의 버전 태그입니다(예: "1.0.0"). 자세한 내용은 [버전 추적](#version-tracking)을 참조하세요.
- `variables` (Record<string, string>): 템플릿 자리표시자를 채우는 데 사용되는 변수입니다.
- `template` (string | List[Message]): 자리표시자를 포함하는 템플릿 문자열 또는 메시지 목록입니다(예: `"Translate {{text}} to {{lang}}"`). Alternatively, a list of `{ "role": "<role>", "content": "<template string with placeholders>" }` 형식의 객체 목록입니다.
- `tags` (Record<string, string>): 프롬프트 실행에 첨부할 태그입니다.
- `contextVariables` (string[]): 실제/컨텍스트 콘텐츠를 포함하는 변수 키입니다. [환각 탐지](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)에 사용됩니다.
- `queryVariables` (string[]): 사용자 쿼리를 포함하는 변수 키입니다. [환각 탐지](/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/template_evaluations#hallucination)에 사용됩니다.

{{% /collapse-content %}}

#### 예: 단일 템플릿 프롬프트 {#example-single-template-prompt-1}

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function answerQuestion(text) {
    // Attach prompt metadata to the upcoming LLM span using LLMObs.annotation_context()
    return llmobs.annotationContext({
      prompt: {
        id: "translation-template",
        version: "1.0.0",
        chat_template: [{"role": "user", "content": "Translate to {{lang}}: {{text}}"}],
        variables: {"lang": "fr", "text": text},
        tags: {"team": "nlp"}
      }
    }, () => {
      // Example provider call (replace with your client)
      return openaiClient.chat.completions.create({
          model: "gpt-4o",
          messages: [{"role": "user", "content": f"Translate to fr: {text}"}]
        });
    });
}
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

#### 참고 {#notes}
- 프롬프트 주석 기능은 LLM 스팬에서만 사용할 수 있습니다.
- 올바른 LLM 스팬에 적용되도록 공급자 호출 직전에 주석을 추가하세요.
- 애플리케이션 내에서 서로 다른 프롬프트를 구분하기 위해 고유한 프롬프트 `id`를 사용하세요.
- Keep templates static by using placeholder syntax (like `{{variable_name}}`) and define dynamic content in the `variables` section.
- 블록 내에서 여러 자동 계측 LLM 호출을 위해 주석 컨텍스트를 사용하여 호출 간에 동일한 프롬프트 메타데이터를 적용하세요. [자동 계측된 스팬 주석 달기](#annotating-auto-instrumented-spans)를 참조하세요.

### 버전 추적 {#version-tracking}

LLM Observability는 명시적인 버전이 지정되지 않은 경우 프롬프트에 대해 자동 버전 관리를 제공합니다. 프롬프트 메타데이터에 `template` 또는 `chat_template`을 제공하고 `version` 태그를 지정하지 않으면 시스템은 템플릿 콘텐츠의 해시를 계산하여 자동으로 버전을 생성합니다. 반대로 `version` 태그를 지정하면, LLM Observability는 자동 생성 버전 대신 사용자가 지정한 버전 레이블을 사용합니다.

버전 관리 시스템은 다음과 같이 작동합니다.
- **자동 버전 관리**: `version` 태그가 지정되지 않으면 LLM Observability는 `template` 또는 `chat_template` 콘텐츠의 해시를 계산하여 숫자 버전 식별자를 자동 생성합니다.
- **수동 버전 관리**: `version` 태그가 지정되면 LLM Observability는 사용자가 지정한 버전 레이블을 그대로 사용합니다.
- **버전 기록**: 자동 생성 버전과 수동 지정 버전 모두 버전 기록에 유지되어 시간 경과에 따른 프롬프트 변화를 추적할 수 있습니다.

이렇게 하면 템플릿 내용 변경에 따른 자동 버전 관리에 의존할 수도 있고, 직접 버전 라벨을 지정하여 버전 관리를 완전히 제어할 수도 있는 유연성을 제공합니다.

## 비용 모니터링 {#cost-monitoring}
LLM/임베딩 스팬에 토큰 메트릭(자동 비용 추적용) 또는 비용 메트릭(수동 비용 추적용)을 연결합니다. 토큰 메트릭은 Datadog이 제공업체 가격을 기반으로 비용을 계산할 수 있게 해주며, 비용 메트릭은 맞춤형 모델이나 지원되지 않는 모델을 사용할 때 직접 가격 정보를 제공할 수 있게 해줍니다. 자세한 내용은 [비용][14]을 참조하세요.

자동 계측을 사용하는 경우, 토큰 및 비용 메트릭은 스팬에 자동으로 표시됩니다. 수동으로 계측하는 경우, 아래 지침을 따릅니다.

<div class="alert alert-info">이 문맥에서 "토큰 메트릭" 및 "비용 메트릭"은 <code>metrics</code> 파라미터( <code>LLMObs.annotate()</code> 메서드의 파라미터)를 통해 스팬에 첨부하는 숫자형 키-값 쌍을 의미합니다. 이는 <a href="/llm_observability/monitoring/metrics/">Datadog 플랫폼의 LLM Observability 메트릭</a>과는 별개의 개념입니다. 인지되는 키(예: <code>input_tokens</code>, <code>output_tokens</code>, <code>input_cost</code>및 <code>output_cost</code>)의 경우 Datadog는 이러한 스팬 속성을 사용해 해당 플랫폼 메트릭(예: <code>ml_obs.span.llm.input.cost</code>)을 생성하며, 생성된 메트릭은 대시보드와 모니터에서 사용할 수 있습니다.</div>

{{< tabs >}}
{{% tab "Python" %}}

#### 사용 사례: 일반 모델 제공업체 사용 {#use-case-using-a-common-model-provider}
Datadog은 OpenAI, Azure OpenAI, Anthropic, Google Gemini 등 일반 모델 제공업체를 지원합니다. 이들 제공업체를 사용할 때는 LLM 요청에 `model_name`, `model_provider`, 토큰 사용량에만 주석을 달면 됩니다. Datadog은 제공업체 가격을 기반으로 예상 비용을 자동 계산합니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="gpt-5.1", model_provider="openai")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate token metrics
    LLMObs.annotate(
        metrics={
          "input_tokens": 50,
          "output_tokens": 120,
          "total_tokens": 170,
          "non_cached_input_tokens": 13,  # optional
          "cache_read_input_tokens": 22,  # optional
          "cache_write_input_tokens": 15, # optional
        },
    )
    return resp
{{< /code-block >}}

#### 사용 사례: 사용자 지정 모델 사용하기 {#use-case-using-a-custom-model}
사용자 지정 또는 지원되지 않는 모델의 경우, 비용 데이터를 수동으로 스팬에 주석으로 달아야 합니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="custom_model", model_provider="model_provider")
def llm_call(prompt):
    resp = ... # llm call here
    # Annotate cost metrics
    LLMObs.annotate(
        metrics={
          "input_cost": 3,
          "output_cost": 7,
          "total_cost": 10,
          "non_cached_input_cost": 1,    # optional
          "cache_read_input_cost": 0.6,  # optional
          "cache_write_input_cost": 1.4, # optional
        },
    )
    return resp
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## 평가 {#evaluations}

LLM Observability SDK는 평가를 Datadog에 내보내고 제출할 수 있는 메서드를 제공합니다.

<div class="alert alert-info">풍부한 결과 메타데이터를 갖춘 재사용 가능한 클래스 기반 평가기(<code>BaseEvaluator</code>, <code>BaseSummaryEvaluator</code>)를 구축하려면 <a href="/llm_observability/guide/evaluation_developer_guide/">평가 개발자 가이드</a>를 참조하세요.</div>

평가는 단일 스팬에 연결해야 합니다. 대상 스팬은 다음 두 가지 방법 중 하나로 식별할 수 있습니다.
- _태그 기반 연결_ - 고유 키-값 태그 쌍을 단일 스팬에 설정하여 평가를 연결합니다. 태그 키-값 쌍이 여러 스팬과 일치하거나 일치하는 스팬이 없는 경우 평가 연결에 실패합니다.
- _직접 스팬 참조_ - 스팬의 고유 트레이스 ID와 스팬 ID 조합을 사용하여 평가를 연결합니다.

### 스팬 내보내기 {#exporting-a-span}
{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.export_span()`을 사용하여 스팬에서 스팬 컨텍스트를 추출할 수 있습니다. 이 메서드는 평가를 해당 스팬과 연결할 때 유용합니다.

#### 인수 {#arguments-10}
`LLMObs.export_span()` 메서드는 다음 인수를 허용합니다.

`span`
: 선택 사항 - _Span_
<br />스팬 컨텍스트(스팬 ID와 트레이스 ID)를 추출할 스팬입니다. 지정하지 않으면(함수 데코레이터를 사용할 때와 같이) SDK는 현재 활성 스팬을 내보냅니다.

#### 예시 {#example-24}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM
    span_context = LLMObs.export_span(span=None)
    return completion
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
`llmobs.exportSpan()`을 사용하여 스팬에서 스팬 컨텍스트를 추출할 수 있습니다. 이 방법을 사용하여 평가를 해당 스팬과 연결해야 합니다.

#### 인수 {#arguments-11}

`llmobs.exportSpan()` 메서드는 다음 인수를 허용합니다.

`span`
: 선택 사항 - _Span_
<br />스팬 컨텍스트(스팬 ID와 트레이스 ID)를 추출할 스팬입니다. 제공하지 않으면(함수 래퍼를 사용할 때와 같이) SDK는 현재 활성 스팬을 내보냅니다.

#### 예시 {#example-25}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 평가 제출하기 {#submitting-evaluations}

{{< tabs >}}
{{% tab "Python" %}}
`LLMObs.submit_evaluation()`을 사용하여 주어진 스팬과 연결된 사용자 지정 평가를 제출할 수 있습니다.

<div class="alert alert-info"><code>LLMObs.submit_evaluation_for</code> 는 더 이상 사용되지 않으며 ddtrace의 다음 주요 버전(4.0)에서 제거될 예정입니다. 마이그레이션하려면, 사용 중인 <code>LLMObs.submit_evaluation_for</code> 호출의 이름을 <code>LLMObs.submit_evaluation</code>으로 변경하세요.</div>

**참고**: 사용자 지정 평가는 사용자가 구현하고 호스팅하는 평가자입니다. Datadog이 내장 평가기를 사용해 자동으로 계산하는 기본 제공 평가와는 다릅니다. 애플리케이션용 기본 제공 평가를 구성하려면 Datadog의 [**LLM Observability** > **Settings** > **Evaluations**][1] 페이지를 사용하세요.

`LLMObs.submit_evaluation()` 메서드는 다음 인수를 허용합니다.

{{% collapse-content title="인수" level="h4" expanded=false id="submit-evals-arguments" %}}
`label`
: 필수 - _string_
<br />평가의 이름입니다.

`metric_type`
: 필수 - _string_
<br />평가의 유형입니다. `categorical`, `score`, `boolean` 또는 `json`이어야 합니다.

`value`
: 필수 - _string, numeric type 또는 dict_
<br />평가의 값입니다. 문자열(`metric_type==categorical`), 정수/실수(`metric_type==score`), 불리언(`metric_type==boolean`) 또는 딕셔너리(`metric_type==json`)여야 합니다.

`span`
: 선택 사항 - _dictionary_
<br />이 평가와 연결된 스팬을 고유하게 식별하는 딕셔너리입니다. `span_id`(string) 및 `trace_id`(string)을 포함해야 합니다. 이 딕셔너리는 [`LLMObs.export_span()`](#exporting-a-span)을 사용해 생성할 수 있습니다.

`span_with_tag_value`
: 선택 사항 - _dictionary_
<br />이 평가와 연결된 스팬을 고유하게 식별하는 딕셔너리입니다. `tag_key`(string) 및 `tag_value`(string)을 포함해야 합니다.

   **참고**: `span` 또는 `span_with_tag_value` 중 정확히 하나만 지정해야 합니다. 두 개를 모두 제공하거나 둘 다 제공하지 않으면 ValueError가 발생합니다.

`ml_app`
: 필수 - _string_
<br />ML 애플리케이션의 이름입니다.

`timestamp_ms`
: 선택 사항 - _integer_
<br />평가 메트릭 결과가 생성된 밀리초 단위의 유닉스 타임스탬프입니다. 제공하지 않으면 현재 시간으로 기본값이 설정됩니다.

`tags`
: 선택 사항 - _dictionary_
<br />사용자가 평가와 관련하여 태그로 추가할 수 있는 문자열 키-값 쌍의 딕셔너리입니다. 태그에 대한 자세한 내용은 [태그 시작하기](/getting_started/tagging/)를 참조하세요.

`assessment`
: 선택 사항 - _string_
<br />평가 결과에 대한 판단입니다. 허용되는 값은 `pass` 및 `fail`입니다.

`reasoning`
: 선택 사항 - _string_
<br />평가 결과에 대한 설명 텍스트입니다.

`metadata`
: 선택 사항 - _dictionary_
<br />평가 결과와 관련된 구조화된 임의 메타데이터를 포함하는 딕셔너리입니다.
{{% /collapse-content %}}

#### 예시 {#example-26}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import llm

@llm(model_name="claude", name="invoke_llm", model_provider="anthropic")
def llm_call():
    completion = ... # user application logic to invoke LLM

    # joining an evaluation to a span via a tag key-value pair
    msg_id = get_msg_id()
    LLMObs.annotate(
        tags = {'msg_id': msg_id}
    )

    LLMObs.submit_evaluation(
        span_with_tag_value = {
            "tag_key": "msg_id",
            "tag_value": msg_id
        },
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )

    # joining an evaluation to a span via span ID and trace ID
    span_context = LLMObs.export_span(span=None)
    LLMObs.submit_evaluation(
        span_context = span_context,
        ml_app = "chatbot",
        label="harmfulness",
        metric_type="score",
        value=10,
        tags={"evaluation_provider": "ragas"},
        assessment="fail",
        reasoning="Malicious intent was detected in the user instructions.",
        metadata={"details": ["jailbreak", "SQL injection"]}
    )
    return completion
{{< /code-block >}}

[1]: https://app.datadoghq.com/llm/evaluations

{{% /tab %}}

{{% tab "Node.js" %}}

`llmobs.submitEvaluation()`을 사용하여 주어진 스팬과 연결된 사용자 지정 평가를 제출할 수 있습니다.

`llmobs.submitEvaluation()` 메서드는 다음 인수를 허용합니다.

{{% collapse-content title="인수" level="h4" expanded=false id="submit-evals-arguments" %}}

`span_context`
: 필수 - _dictionary_
<br />평가를 연결할 스팬 컨텍스트입니다. 이는 `LLMObs.export_span()`의 출력이어야 합니다.

`evaluationOptions`
: 필수 - _object_
<br />평가 데이터의 객체입니다.

`evaluationOptions` 객체에는 다음 항목이 포함될 수 있습니다.

`label`
: 필수 - _string_
<br />평가의 이름입니다.

`metricType`
: 필수 - _string_
<br />평가의 유형입니다. "categorical", "score", "boolean", "json" 중 하나여야 합니다.

`value`
: 필수 - _string 또는 numeric type_
<br />평가의 값입니다. 문자열(범주형 평가 `metric_type`), 숫자(점수 평가 `metric_type`), 불리언(불리언 평가 `metric_type`) 또는 JSON 객체(JSON 평가 `metric_type`)여야 합니다.

`tags`
: 선택 사항 - _dictionary_
<br />사용자가 평가와 관련하여 태그로 추가할 수 있는 문자열 키-값 쌍의 딕셔너리입니다. 태그에 대한 자세한 내용은 [태그 시작하기](/getting_started/tagging/)를 참조하세요.

`assessment`
: 선택 사항 - _string_
<br />평가 결과에 대한 판단입니다. 허용되는 값은 `pass` 및 `fail`입니다.

`reasoning`
: 선택 사항 - _string_
<br />평가 결과에 대한 설명 텍스트입니다.

`metadata`
: 선택 사항 - _dictionary_
<br />평가 결과와 관련된 구조화된 임의 메타데이터를 포함하는 JSON 객체입니다.
{{% /collapse-content %}}

#### 예시 {#example-27}

{{< code-block lang="javascript" >}}
function llmCall () {
  const completion = ... // user application logic to invoke LLM
  const spanContext = llmobs.exportSpan()
  llmobs.submitEvaluation(spanContext, {
    label: "harmfulness",
    metricType: "score",
    value: 10,
    tags: { evaluationProvider: "ragas" }
  })
  return completion
}
llmCall = llmobs.wrap({ kind: 'llm', name: 'invokeLLM', modelName: 'claude', modelProvider: 'anthropic' }, llmCall)
{{< /code-block >}}

[1]: /ko/getting_started/tagging/
{{% /tab %}}
{{% tab "Java" %}}

주어진 스팬과 관련된 사용자 지정 평가를 제출하려면 `LLMObs.SubmitEvaluation()`을 사용하세요.

`LLMObs.SubmitEvaluation()` 메서드는 다음 인수를 허용합니다.

{{% collapse-content title="인수" level="h4" expanded=false id="submit-evals-arguments" %}}

`llmObsSpan`
: 필수 - _LLMObsSpan_
<br />평가를 연결할 스팬 컨텍스트입니다.

`label`
: 필수 - _String_
<br />평가의 이름입니다.

`categoricalValue` 또는 `scoreValue`
: 필수 - _String_ 또는 _double_
<br />평가의 값입니다. 문자열(범주형 평가의 경우) 또는 double(점수 평가의 경우)이어야 합니다.

`tags`
: 선택 사항 - _Map<String, Object>_
<br />평가에 태그를 지정하는 데 사용하는 문자열 키-값 쌍 딕셔너리입니다. 태그에 대한 자세한 내용은 [태그 시작하기](/getting_started/tagging/)를 참조하세요.
{{% /collapse-content %}}

#### 예시 {#example-28}

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String invokeChat(String userInput) {
    LLMObsSpan llmSpan = LLMObs.startLLMSpan("my-llm-span-name", "my-llm-model", "my-company", "maybe-ml-app-override", "session-141");
    String chatResponse = "N/A";
    try {
      chatResponse = ... // user application logic to invoke LLM
    } catch (Exception e) {
      llmSpan.addThrowable(e);
      throw new RuntimeException(e);
    } finally {
      llmSpan.finish();

      // submit evaluations
      LLMObs.SubmitEvaluation(llmSpan, "toxicity", "toxic", Map.of("language", "english"));
      LLMObs.SubmitEvaluation(llmSpan, "f1-similarity", 0.02, Map.of("provider", "f1-calculator"));
    }
    return chatResponse;
  }
}
{{< /code-block >}}

[1]: /ko/getting_started/tagging/
{{% /tab %}}
{{< /tabs >}}

## 스팬 처리 {#span-processing}

스팬의 입력 및 출력 데이터를 수정하려면 프로세서 함수를 구성할 수 있습니다. 프로세서 함수는 스팬 태그에 접근할 수 있어 조건부 입력/출력 수정이 가능합니다. 프로세서 함수는 수정된 스팬을 반환하여 전송하거나 `None`/`null`을 반환하여 스팬이 완전히 전송되지 않도록 할 수도 있습니다. 이는 민감한 데이터를 포함하거나 특정 기준을 충족하는 스팬을 필터링할 때 유용합니다.

{{< tabs >}}
{{% tab "Python" %}}

### 예시 {#example-29}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_output") == "true":
        for message in span.output:
            message["content"] = ""
    return span


# If using LLMObs.enable()
LLMObs.enable(
  ...
  span_processor=redact_processor,
)
# else when using `ddtrace-run`
LLMObs.register_processor(redact_processor)

with LLMObs.llm("invoke_llm_with_no_output"):
    LLMObs.annotate(tags={"no_output": "true"})
{{< /code-block >}}


### 예시: 자동 계측을 통한 조건부 수정 {#example-conditional-modification-with-auto-instrumentation}

자동 계측을 사용할 때는 스팬이 항상 컨텍스트상 접근 가능한 상태가 아닙니다. 자동 계측된 스팬의 입력과 출력을 조건부로 수정하려면 `annotation_context()`를 스팬 프로세서와 함께 사용할 수 있습니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan

def redact_processor(span: LLMObsSpan) -> LLMObsSpan:
    if span.get_tag("no_input") == "true":
        for message in span.input:
            message["content"] = ""
    return span

LLMObs.register_processor(redact_processor)


def call_openai():
    with LLMObs.annotation_context(tags={"no_input": "true"}):
        # make call to openai
        ...
{{< /code-block >}}

### 예시: 스팬이 전송되지 않도록 방지하기 {#example-preventing-spans-from-being-emitted}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs import LLMObsSpan
from typing import Optional

def filter_processor(span: LLMObsSpan) -> Optional[LLMObsSpan]:
    # Skip spans that are marked as internal or contain sensitive data
    if span.get_tag("internal") == "true" or span.get_tag("sensitive") == "true":
        return None  # This span will not be emitted

    # Process and return the span normally
    return span

LLMObs.register_processor(filter_processor)

# This span will be filtered out and not sent to Datadog
with LLMObs.workflow("internal_workflow"):
    LLMObs.annotate(tags={"internal": "true"})
    # ... workflow logic
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}

### 예시 {#example-30}

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function redactProcessor(span) {
  if (span.getTag("no_output") === "true") {
    for (const message of span.output) {
      message.content = ""
    }
  }
  return span
}

llmobs.registerProcessor(redactProcessor)
{{< /code-block >}}

### 예시: 자동 계측을 통한 조건부 수정 {#example-conditional-modification-with-auto-instrumentation-1}

자동 계측을 사용할 때는 스팬이 항상 컨텍스트상 접근 가능한 상태가 아닙니다. 자동 계측된 스팬의 입력과 출력을 조건부로 수정하려면 `llmobs.annotationContext()`를 스팬 프로세서와 함께 사용할 수 있습니다.

{{< code-block lang="javascript" >}}
const { llmobs } = require('dd-trace');

function redactProcessor(span) {
  if (span.getTag("no_input") == "true") {
    for (const message of span.input) {
      message.content = "";
    }
  }

  return span;
}

llmobs.registerProcessor(redactProcessor);

async function callOpenai() {
  await llmobs.annotationContext({ tags: { no_input: "true" } }, async () => {
    // make call to openai
  });
}
{{< /code-block >}}

### 예시: 스팬이 전송되지 않도록 방지하기 {#example-preventing-spans-from-being-emitted-1}

{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>"
  }
})

const llmobs = tracer.llmobs

function filterProcessor(span) {
  // Skip spans that are marked as internal or contain sensitive data
  if (span.getTag("internal") === "true" || span.getTag("sensitive") === "true") {
    return null  // This span will not be emitted
  }

  // Process and return the span normally
  return span
}

llmobs.registerProcessor(filterProcessor)

// This span will be filtered out and not sent to Datadog
function internalWorkflow() {
  return llmobs.trace({ kind: 'workflow', name: 'internalWorkflow' }, (span) => {
    llmobs.annotate({ tags: { internal: "true" } })
    // ... workflow logic
  })
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## 사용자 세션 추적 {#tracking-user-sessions}

세션 추적을 통해 여러 상호작용을 특정 사용자와 연결할 수 있습니다.

{{< tabs >}}
{{% tab "Python" %}}
새로운 트레이스 또는 새로운 프로세스의 스팬을 위한 루트 스팬을 시작할 때, 기본 사용자 세션의 문자열 ID와 함께 `session_id` 인수를 지정해야 하며, 이는 스팬의 태그로 제출됩니다. 필요에 따라 `user_handle`, `user_name`, 및 `user_id` 태그를 지정할 수도 있습니다.

{{< code-block lang="python" >}}
from ddtrace.llmobs.decorators import workflow

@workflow(session_id="<SESSION_ID>")
def process_user_message():
    LLMObs.annotate(
        ...
        tags = {"user_handle": "poodle@dog.com", "user_id": "1234", "user_name": "poodle"}
    )
    return
{{< /code-block >}}

### 세션 추적 태그 {#session-tracking-tags}

| 태그 | 설명 |
|---|---|
| `session_id` | 단일 사용자 세션을 나타내는 ID입니다(예: 채팅 세션). |
| `user_handle` | 채팅 세션 사용자의 핸들입니다. |
| `user_name` | 채팅 세션 사용자의 이름입니다. |
| `user_id` | 채팅 세션 사용자의 ID입니다. |
{{% /tab %}}

{{% tab "Node.js" %}}
새로운 트레이스 또는 새로운 프로세스의 스팬을 위한 루트 스팬을 시작할 때, 기본 사용자 세션의 문자열 ID와 함께 `sessionId` 인수를 지정해야 합니다.

{{< code-block lang="javascript" >}}
function processMessage() {
    ... # user application logic
    return
}
processMessage = llmobs.wrap({ kind: 'workflow', sessionId: "<SESSION_ID>" }, processMessage)
{{< /code-block >}}
{{% /tab %}}

{{% tab "Java" %}}
새로운 트레이스 또는 새로운 프로세스의 스팬을 위한 루트 스팬을 시작할 때, 기본 사용자 세션의 문자열 ID와 함께 `sessionId` 인수를 지정해야 합니다.

{{< code-block lang="java" >}}
import datadog.trace.api.llmobs.LLMObs;

public class MyJavaClass {
  public String processChat(int userID) {
    LLMObsSpan workflowSpan = LLMObs.startWorkflowSpan("incoming-chat", null, "session-" + System.currentTimeMillis() + "-" + userID);
    String chatResponse = answerChat(); // user application logic
    workflowSpan.annotateIO(...); // record the input and output
    workflowSpan.finish();
    return chatResponse;
  }
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 분산 추적 {#distributed-tracing}

SDK는 분산 서비스 또는 호스트 간의 추적을 지원합니다. 분산 추적은 웹 요청을 통해 스팬 정보를 전파하여 작동합니다.

{{< tabs >}}
{{% tab "Python" %}}

`ddtrace` 라이브러리는 인기 있는 [웹 프레임워크][1] 및 [HTTP][2] 라이브러리에 대한 분산 추적을 지원하는 몇 가지 기본 통합을 제공합니다. 애플리케이션이 이러한 지원 라이브러리를 사용하여 요청을 하는 경우, 다음을 실행하여 분산 추적을 활성화할 수 있습니다.
{{< code-block lang="python">}}
from ddtrace import patch
patch(<INTEGRATION_NAME>=True)
{{< /code-block >}}

애플리케이션이 이러한 지원 라이브러리를 사용하지 않는 경우, HTTP 헤더를 통해 스팬 정보를 주고받아 분산 추적을 수동으로 활성화할 수 있습니다. SDK는 요청 헤더에 추적 컨텍스트를 주입하고 활성화하기 위한 도우미 메서드 `LLMObs.inject_distributed_headers()` 및 `LLMObs.activate_distributed_headers()`를 제공합니다.

### 분산 헤더 주입하기 {#injecting-distributed-headers}

`LLMObs.inject_distributed_headers()` 메서드는 스팬을 받아 해당 컨텍스트를 HTTP 헤더에 주입합니다. 이 메서드는 다음 인수를 허용합니다.

`request_headers`
: 필수 - _dictionary_
<br />추적 컨텍스트 속성으로 확장할 HTTP 헤더입니다.

`span`
: 선택 사항 - _Span_ - **기본값**: `The current active span.`
<br />제공된 요청 헤더에 컨텍스트를 주입할 스팬입니다. 함수 데코레이터가 적용된 스팬을 포함하며, 기본값은 현재 활성 스팬입니다.

### 분산 헤더 활성화하기 {#activating-distributed-headers}

`LLMObs.activate_distributed_headers()` 메서드는 HTTP 헤더를 받아 추적 컨텍스트 속성을 추출하고 이를 새로운 서비스에서 활성화합니다.

**참고**: 다운스트림 서비스에서 스팬을 시작하기 전에 `LLMObs.activate_distributed_headers()`를 호출해야 합니다. 이전에 시작된 스팬(함수 데코레이터 스팬 포함)은 분산 트레이스에 포함되지 않습니다.

이 메서드는 다음 인수를 허용합니다.

`request_headers`
: 필수 - _dictionary_
<br />추적 컨텍스트 속성을 추출할 HTTP 헤더입니다.


### 예시 {#example-31}

{{< code-block lang="python" filename="client.py" >}}
from ddtrace.llmobs import LLMObs
from ddtrace.llmobs.decorators import workflow

@workflow
def client_send_request():
    request_headers = {}
    request_headers = LLMObs.inject_distributed_headers(request_headers)
    send_request("<method>", request_headers)  # arbitrary HTTP call
{{< /code-block >}}

{{< code-block lang="python" filename="server.py" >}}
from ddtrace.llmobs import LLMObs

def server_process_request(request):
    LLMObs.activate_distributed_headers(request.headers)
    with LLMObs.task(name="process_request") as span:
        pass  # arbitrary server work
{{< /code-block >}}

[1]: /ko/tracing/trace_collection/compatibility/python/#integrations
[2]: /ko/tracing/trace_collection/compatibility/python/#library-compatibility
{{% /tab %}}
{{% tab "Node.js" %}}

`dd-trace` 라이브러리는 인기 있는 [웹 프레임워크][1]에 대한 분산 추적을 지원하는 기본 통합을 제공합니다. 트레이서를 사용하면 이러한 통합 기능이 자동으로 활성화되지만, 필요에 따라 다음을 사용하여 비활성화할 수도 있습니다.

{{< code-block lang="javascript">}}
const tracer = require('dd-trace').init({
  llmobs: { ... },
})
tracer.use('http', false) // disable the http integration
{{< /code-block >}}

[1]: /ko/tracing/trace_collection/compatibility/nodejs/#web-framework-compatibility
{{% /tab %}}
{{< /tabs >}}


##  고급 추적 {#advanced-tracing}

{{< tabs >}}
{{% tab "Python" %}}
###  인라인 메서드를 사용한 스팬 추적하기 {#tracing-spans-using-inline-methods}

각 스팬 종류마다 `ddtrace.llmobs.LLMObs` 클래스는 주어진 코드 블록에서 수반되는 작업을 자동으로 추적할 수 있는 해당 인라인 메서드를 제공합니다. 이 메서드는 함수 데코레이터와 동일한 인수 서명을 가지며, `name` 인수가 제공되지 않은 경우 스팬 종류(`llm`, `workflow` 등)로 기본값이 설정됩니다. 이 메서드는 컨텍스트 관리자로 사용할 수 있으며, 코드 블록 실행이 완료되면 스팬이 자동으로 종료됩니다.

####  예시 {#example-32}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    with LLMObs.workflow(name="process_message", session_id="<SESSION_ID>", ml_app="<ML_APP>") as workflow_span:
        ... # user application logic
    return
{{< /code-block >}}

###  컨텍스트 간 스팬 유지하기 {#persisting-a-span-across-contexts}

다른 컨텍스트나 범위에서 스팬을 수동으로 시작하고 중지하려면:

1. 스팬을 수동으로 시작합니다. 동일한 메서드(예: 워크플로 스팬의 경우 `LLMObs.workflow`)를 사용하되, 컨텍스트 관리자가 아닌 일반 함수 호출 방식으로 실행합니다.
2.  스팬 객체를 다른 함수의 인수로 전달합니다.
3.  `span.finish()` 메서드를 사용하여 스팬을 수동으로 중지합니다. **참고**: 스팬은 수동으로 종료해야 하며, 그렇지 않으면 제출되지 않습니다.

####  예시 {#example-33}

{{< code-block lang="python" >}}
from ddtrace.llmobs import LLMObs

def process_message():
    workflow_span = LLMObs.workflow(name="process_message")
    ... # user application logic
    separate_task(workflow_span)
    return

def separate_task(workflow_span):
    ... # user application logic
    workflow_span.finish()
    return
{{< /code-block >}}

####  서버리스 환경에서 강제 플러시 {#force-flushing-in-serverless-environments}

`LLMObs.flush()`는 모든 버퍼링된 LLM Observability 데이터를 Datadog 백엔드로 전송하는 블로킹 함수입니다. 이는 서버리스 환경에서 모든 LLM Observability 트레이스가 제출될 때까지 애플리케이션 종료를 방지하는 데 유용할 수 있습니다.

###  여러 애플리케이션 추적하기 {#tracing-multiple-applications}

SDK는 동일한 서비스에서 여러 LLM 애플리케이션을 추적하는 것을 지원합니다.

환경 변수 `DD_LLMOBS_ML_APP`를 LLM 애플리케이션의 이름으로 구성할 수 있으며, 기본적으로 모든 생성된 스팬이 이 이름으로 그룹화됩니다.

이 구성을 재정의하고 주어진 루트 스팬에 대해 다른 LLM 애플리케이션 이름을 사용하려면, 새로운 트레이스의 루트 스팬을 시작하거나 새로운 프로세스의 스팬을 시작할 때 기본 LLM 애플리케이션의 문자열 이름과 함께 `ml_app` 인수를 전달하세요.

{{< code-block lang="python">}}
from ddtrace.llmobs.decorators import workflow

@workflow(name="process_message", ml_app="<NON_DEFAULT_ML_APP_NAME>")
def process_message():
    ... # user application logic
    return
{{< /code-block >}}

{{% /tab %}}

{{% tab "Node.js" %}}
###  인라인 메서드를 사용한 스팬 추적하기 {#tracing-spans-using-inline-methods-1}

`llmobs` SDK는 주어진 코드 블록에서 수반되는 작업을 자동으로 추적하기 위한 해당 인라인 메서드를 제공합니다. 이 메서드는 함수 래퍼 버전과 동일한 인수 서명을 가지며, 익명 콜백에서 이름을 유추할 수 없기 때문에 `name` 인수가 반드시 필요합니다. 이 메서드는 다음 조건에서 스팬을 종료합니다.

- 함수가 Promise를 반환하면 Promise가 해결되거나 거부될 때 스팬이 종료됩니다.
- 함수의 마지막 파라미터가 콜백인 경우 해당 콜백이 호출될 때 스팬이 종료됩니다.
- 함수가 콜백을 받지 않고 Promise도 반환하지 않으면 함수 실행이 끝날 때 스팬이 종료됩니다.

#### 콜백 없는 예시 {#example-without-a-callback}

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return
  })
}
{{< /code-block >}}

#### 콜백 있는 예시 {#example-with-a-callback}

{{< code-block lang="javascript" >}}
function processMessage () {
  return llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, (workflowSpan, cb) => {
    ... // user application logic
    let maybeError = ...
    cb(maybeError) // the span will finish here, and tag the error if it is not null or undefined
    return
  })
}
{{< /code-block >}}

이 함수의 반환 유형은 추적된 함수의 반환 유형과 일치합니다.

{{< code-block lang="javascript" >}}
function processMessage () {
  const result = llmobs.trace({ kind: 'workflow', name: 'processMessage', sessionId: '<SESSION_ID>', mlApp: '<ML_APP>' }, workflowSpan => {
    ... // user application logic
    return 'hello world'
  })

  console.log(result) // 'hello world'
  return result
}
{{< /code-block >}}

### TypeScript의 함수 데코레이터 {#function-decorators-in-typescript}

Node.js LLM Observability SDK는 TypeScript 애플리케이션을 위한 함수 데코레이터 역할을 하는 `llmobs.decorate` 함수를 제공합니다. 이 함수의 추적 동작은 `llmobs.wrap`과 동일합니다.

####  예시 {#example-34}

{{< code-block lang="javascript" >}}
// index.ts
import tracer from 'dd-trace';
tracer.init({
  llmobs: {
    mlApp: "<YOUR_ML_APP_NAME>",
  },
});

const { llmobs } = tracer;

class MyAgent {
  @llmobs.decorate({ kind: 'agent' })
  async runChain () {
    ... // user application logic
    return
  }
}

{{< /code-block >}}

###  서버리스 환경에서 강제 플러시 {#force-flushing-in-serverless-environments-1}

`llmobs.flush()`는 모든 버퍼링된 LLM Observability 데이터를 Datadog 백엔드로 전송하는 블로킹 함수입니다. 이는 서버리스 환경에서 모든 LLM Observability 트레이스가 제출될 때까지 애플리케이션 종료를 방지하는 데 유용할 수 있습니다.

### 여러 애플리케이션 추적하기 {#tracing-multiple-applications-1}

SDK는 동일한 서비스에서 여러 LLM 애플리케이션을 추적하는 것을 지원합니다.

환경 변수 `DD_LLMOBS_ML_APP`를 LLM 애플리케이션의 이름으로 구성할 수 있으며, 기본적으로 모든 생성된 스팬이 이 이름으로 그룹화됩니다.

이 구성을 재정의하고 주어진 루트 스팬에 대해 다른 LLM 애플리케이션 이름을 사용하려면, 새로운 트레이스의 루트 스팬을 시작하거나 새로운 프로세스의 스팬을 시작할 때 기본 LLM 애플리케이션의 문자열 이름과 함께 `mlApp` 인수를 전달하세요.

{{< code-block lang="javascript">}}
function processMessage () {
  ... // user application logic
  return
}
processMessage = llmobs.wrap({ kind: 'workflow', name: 'processMessage', mlApp: '<NON_DEFAULT_ML_APP_NAME>' }, processMessage)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### 애플리케이션 이름 지정 가이드라인 {#application-naming-guidelines}

애플리케이션 이름(`DD_LLMOBS_ML_APP`의 값)은 다음 가이드라인을 따라야 합니다.

- 소문자 유니코드 문자열이어야 함
- 최대 193자까지 가능
- 연속 밑줄이나 끝부분 밑줄을 포함할 수 없음
- 다음 문자를 포함할 수 있음
   - 영숫자
   - 밑줄
   - 하이픈
   - 콜론
   - 점
   - 슬래시

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/openai/openai-python
[2]: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
[3]: https://botocore.amazonaws.com/v1/documentation/api/latest/tutorial/index.html
[4]: https://github.com/langchain-ai/langchain
[7]: /ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[8]: /ko/llm_observability/terms/
[9]: /ko/getting_started/tagging/
[10]: https://github.com/DataDog/llm-observability
[11]: /ko/tracing/trace_collection/compatibility/python/#integrations
[12]: /ko/tracing/trace_collection/compatibility/python/#library-compatibility
[13]: /ko/llm_observability/instrumentation/auto_instrumentation/
[14]: /ko/llm_observability/monitoring/cost