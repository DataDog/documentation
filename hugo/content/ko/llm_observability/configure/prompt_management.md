---
aliases:
- /ko/llm_observability/monitoring/prompt_management/
description: Prompt Management를 사용하여 Python 애플리케이션에서 관리형 프롬프트를 생성, 버전 관리 및 검색합니다.
further_reading:
- link: /llm_observability/instrument/prompt_tracking
  tag: 문서
  text: 프롬프트 추적
- link: /llm_observability/improve/playground
  tag: 문서
  text: Playground
- link: /llm_observability/instrument/sdk/?tab=python
  tag: 문서
  text: Agent Observability SDK
title: Prompt Management
---
## 개요 {#overview}

Prompt Management는 LLM 애플리케이션에서 사용하는 프롬프트를 위한 중앙 집중식 레지스트리를 제공합니다. 애플리케이션 코드나 구성 파일에 프롬프트 템플릿을 하드코딩하는 대신, Agent Observability를 통해 프롬프트를 생성, 버전 관리 및 업데이트한 다음 런타임에 검색하세요.

런타임 검색은 `ddtrace` SDK를 통해 Python에서 지원됩니다. 프롬프트 검색과 프롬프트 추적은 별개입니다. `LLMObs.get_prompt()`는 Agent Observability를 활성화하지 않고도 관리형 프롬프트를 검색할 수 있지만, LLM 스팬을 생성하고 프롬프트 메타데이터를 연결하려면 Agent Observability를 활성화해야 합니다.

프롬프트 버전을 생성한 후 [Prompt Experimentation][10]을 사용하여 A/B 테스트로 비교하거나 Guarded Rollout을 통해 점진적으로 배포하세요.

Prompt Management는 [프롬프트 추적][1]과 함께 작동합니다. Agent Observability가 활성화되면, 지원되는 자동 계측 LLM 호출에 직접 전달된 관리형 프롬프트가 결과 스팬과 연결됩니다.

## 전제 조건 {#prerequisites}

- Python 3.9 이상.
- ddtrace>=4.13.0
- [Datadog 사이트][2] 및 [Datadog API 키][3]. Datadog Agent를 통해 트레이스가 전송되는 경우에도 프롬프트 검색을 위해 API 키가 필요합니다.
- 환경별로 프롬프트를 확인하기 위한 `llm_observability_read`, `feature_flag_config_read` 및 `feature_flag_environment_config_read` 권한이 있는 [Datadog Application Key][4]. Datadog에서 기존 애플리케이션 키를 선택하는 경우, 해당 키에 이러한 권한이 있는지 확인하세요.
- API 또는 Python SDK를 통해 프롬프트를 관리하려면 애플리케이션 키에 `llm_observability_write` 및 `feature_flag_config_write` 권한도 필요합니다.

## SDK 설치 {#install-the-sdk}

애플리케이션에서 사용하는 Python 환경에 최신 `ddtrace` 패키지를 설치하거나 업그레이드하세요.

```shell
pip install --upgrade ddtrace
```

## Python에서 관리형 프롬프트 사용 {#use-a-managed-prompt-in-python}

### 코딩 에이전트와 Prompt Management 통합 {#integrate-prompt-management-with-a-coding-agent}

다음 프롬프트를 붙여넣어 관리형 프롬프트를 원하는 코딩 에이전트와 통합하세요.

```text
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

Prompt variables: <PROMPT_VARIABLES>

When configuring the environment, use the following values:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
```

필요시, 코딩 에이전트가 동일한 세션에서 통합을 구성하고 확인할 수 있도록 선택한 Datadog 자격 증명을 추가하세요.

```text
Selected Datadog credentials:

DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>

Treat these values as secrets and handle them according to the linked guide. Do not repeat or expose them.
```

**참고:** 프롬프트에 API 및 애플리케이션 키를 포함하는 것은 선택 사항이며, 코딩 에이전트가 Prompt Management를 통합하는 데 필수적이지는 않습니다. 신뢰할 수 있는 코딩 에이전트 세션에서만 포함하세요.

통합이 완료되면 애플리케이션을 실행하고 수정된 LLM 흐름을 트리거하세요. 프롬프트 페이지로 돌아가 사용량을 확인하세요. 새로운 프롬프트 호출이 표시되기까지 1분 정도 걸릴 수 있습니다.

### 프롬프트 검색 구성 {#configure-prompt-retrieval}

애플리케이션에서 이미 사용 중인 구성 및 시크릿 관리 워크플로를 통해 Datadog 사이트, 자격 증명 및 배포 환경을 제공하세요. 예를 들어, 애플리케이션의 환경 파일, Docker Compose 또는 Kubernetes 구성, 배포 플랫폼 또는 시크릿 관리자를 사용하세요. 런타임 시 `ddtrace`를 가져오기 전에 다음 환경 변수를 설정해야 합니다.

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV`는 프롬프트 버전을 확인하는 데 사용되는 환경을 선택하며, 프롬프트가 배포된 환경과 일치해야 합니다.

### 프롬프트 검색, 형식 지정 및 사용 {#retrieve-format-and-use-a-prompt}

애플리케이션에서 이미 사용 중인 프롬프트를 폴백 프롬프트로 보존하세요. 폴백 프롬프트는 레지스트리, 환경 확인, 네트워크 또는 서버 오류가 발생할 경우 애플리케이션이 계속 작동하도록 합니다.

다음 예시는 채팅 프롬프트를 검색하고 형식을 지정한 다음, 형식화된 메시지를 OpenAI에 직접 전달합니다.

```python
from ddtrace.llmobs import LLMObs
from openai import OpenAI

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": "Acme Inc.",
    "question": "How do I reset my password?",
}

prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    fallback=default_messages,
)
messages = prompt.format(**variables)

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
```

`prompt.format()`은 텍스트 프롬프트의 경우 문자열을, 채팅 프롬프트의 경우 메시지 목록을 반환합니다. 형식화된 값을 LLM 공급자 호출의 해당 텍스트 또는 메시지 파라미터에 전달하세요.

검색에 실패하고 폴백 프롬프트가 제공되지 않으면 `get_prompt()`가 `ValueError`를 발생시킵니다. 폴백 프롬프트가 인증을 대신하지는 않습니다. `DD_API_KEY`는 항상 필요하며, `DD_ENV`가 설정된 경우 `DD_APP_KEY`도 필요합니다.

관리형 프롬프트는 템플릿 내에서 다른 관리형 프롬프트를 참조할 수 없습니다. 프롬프트를 구성하려면 애플리케이션 코드에서 결합하거나 최종 공급자 대상 프롬프트를 단일 프롬프트로 관리하세요.

### 버전 선택 {#select-a-version}

`DD_ENV`가 없으면 `get_prompt()`는 최신 프롬프트 버전을 검색합니다.

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
```

`DD_ENV`가 있으면 `get_prompt()`는 해당 환경에 대한 프롬프트 버전을 확인합니다. 이를 위해서는 [전제 조건](#prerequisites)에 나열된 읽기 권한이 있는 `DD_APP_KEY`가 필요합니다.

`DD_ENV`와 관계없이 정확한 숫자 버전을 검색하려면 `version`을 전달하세요.

```python
prompt = LLMObs.get_prompt("customer-support-greeting", version=2)
```

`version` 인수가 환경 확인보다 우선합니다.

### 프롬프트 사용량 추적 {#track-prompt-usage}

관리형 프롬프트를 LLM 스팬과 연결하려면 [Agent Observability 활성화][5]를 수행하고 기존 실행 워크플로를 통해 자동 계측으로 애플리케이션을 실행하세요.

애플리케이션이 Python 프로세스가 시작되기 전에 구성을 수신하는 경우 `ddtrace-run`을 사용하세요. 예를 들어, 이에 상응하는 셸 명령은 다음과 같습니다.

{{< code-block lang="shell" >}}
DD_SITE="<DATADOG_SITE>" \
DD_API_KEY="<DATADOG_API_KEY>" \
DD_APP_KEY="<DATADOG_APP_KEY>" \
DD_ENV="<DEPLOYMENT_ENVIRONMENT>" \
DD_SERVICE="<SERVICE_NAME>" \
DD_LLMOBS_ENABLED=1 \
ddtrace-run python app.py
{{< /code-block >}}

애플리케이션이 Python에서 구성을 로드하는 경우, 먼저 구성을 로드한 다음 LLM 공급자나 다른 애플리케이션 모듈을 가져오기 전에 `ddtrace.auto`를 가져오세요.

```python
from dotenv import load_dotenv

load_dotenv()

import ddtrace.auto

from ddtrace.llmobs import LLMObs
from openai import OpenAI
```

애플리케이션의 일반적인 Python 명령으로 `python app.py`와 같이 이 설정을 실행하세요. `ddtrace-run`을 함께 사용하지 마세요. 애플리케이션이 구성을 로드하기 전에 `ddtrace`를 초기화합니다.

애플리케이션이 Datadog Agent를 통해 데이터를 보내지 않는 경우 `DD_LLMOBS_AGENTLESS_ENABLED=1`도 설정하세요.

[지원되는 자동 계측 공급자][6]의 경우, [프롬프트 검색, 형식 지정 및 사용 ](#retrieve-format-and-use-a-prompt)에 표시된 내용을 따라 `prompt.format()`에서 반환된 값을 공급자 호출에 직접 전달하세요. 이렇게 하면 관리형 프롬프트가 결과 스팬과 자동으로 연결됩니다.

형식이 지정된 값을 복사, 재구축 또는 변환하면 프롬프트 추적 메타데이터가 삭제될 수 있습니다. 예를 들어, 관리형 시스템 프롬프트를 사용자 질문과 연결하면 해당 메타데이터가 없는 새 문자열이 생성됩니다. `LLMObs.annotation_context()`를 사용하여 관리형 프롬프트를 결과 LLM 스팬과 연결하세요.

```python
prompt = LLMObs.get_prompt(
    "customer-support-system-prompt",
    fallback="You are a helpful support agent writing for a {{audience}} audience.",
)
variables = {"audience": audience}
system_prompt = prompt.format(**variables)
combined_prompt = f"{system_prompt}\n\nUser question: {question}"

with LLMObs.annotation_context(
    prompt=prompt.to_annotation_dict(**variables),
):
    response = client.responses.create(
        model="gpt-4o",
        input=combined_prompt,
    )
```

`to_annotation_dict()`에 전달하는 것과 동일한 변수를 `format()`에 전달하여 추적된 프롬프트에 해당 호출에 사용된 값이 포함되도록 하세요.

`annotation_context()` 컨텍스트 내에서 생성된 LLM 스팬과 메타데이터를 연결하며, 스팬 자체를 생성하지는 않습니다. 자동으로 계측되지 않는 공급자의 경우, 먼저 [LLM 호출을 수동으로 계측][7]하여 LLM 스팬을 생성하세요. 명시적 `annotation_context()`가 자동 프롬프트 추적보다 우선합니다. 자세한 내용은 [프롬프트 추적][1]을 참조하세요.

## 프롬프트 생성 및 관리{#create-and-manage-prompts}

{{< ui >}}Prompts{{< /ui >}} UI, Python SDK 또는 API를 통해 프롬프트를 생성하고 새 버전을 게시하세요.

### 프롬프트 생성 {#create-a-prompt}

#### 추적된 프롬프트 승격 {#promote-a-tracked-prompt}

Agent Observability에서 이미 추적 중인 프롬프트를 관리형 프롬프트로 승격하려면 {{< ui >}}Prompts{{< /ui >}} 페이지로 이동하여 프롬프트를 열고 {{< ui >}}Register{{< /ui >}}를 클릭하세요. 그런 다음 UI에서 프롬프트를 업데이트하고 런타임에 검색할 수 있습니다.

#### UI에서 처음부터 만들기 {#in-the-ui-from-scratch}

{{< ui >}}Prompts{{< /ui >}} 페이지로 이동하여 {{< ui >}}\+ New Prompt{{< /ui >}}를 클릭합니다.

프롬프트 편집기에서:

1. 하나 이상의 메시지를 추가하고 각각에 {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}} 또는 {{< ui >}}Assistant{{< /ui >}} 역할을 할당하세요.
2. `{{variable_name}}` 구문을 메시지에 사용하여 동적 콘텐츠를 추가하세요.
3. 필요시: {{< ui >}}Run{{< /ui >}}을 클릭하여 샘플 값으로 프롬프트를 테스트하세요.
4. {{< ui >}}Save Prompt{{< /ui >}}를 클릭하여 저장 대화 상자를 여세요.

사용자 쿼리와 컨텍스트가 변수로 삽입되도록 프롬프트를 구성하세요.

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="Playground 화면에 '{{company}}의 지원 상담원입니다'라는 시스템 프롬프트 메시지와 {{question}}이 포함된 사용자 프롬프트 메시지가 있고, 오른쪽 상단에 'Save Prompt' 버튼이 있습니다." style="width:100%;" >}}

저장 대화 상자에서 다음 항목을 입력하세요.

| 필드 | 설명 |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}}| `customer-support-greeting`과 같은 프롬프트의 고유 식별자입니다. 이 ID를 사용하여 `LLMObs.get_prompt()`로 프롬프트를 가져옵니다. |
| {{< ui >}}Description{{< /ui >}} | 이 버전에 대한 참고 사항(필요시)입니다. |
| {{< ui >}}Deployment{{< /ui >}} | 이 버전이 배포되는 환경입니다. |

{{< ui >}}Create Prompt{{< /ui >}}를 클릭하여 프롬프트를 레지스트리에 저장합니다.

### 프롬프트 업데이트, 나열 및 삭제 {#update-list-and-delete-prompts}

#### UI에서 {#in-the-ui}

{{< ui >}}Prompts{{< /ui >}} 페이지에서 프롬프트를 열어 다음을 수행합니다.

- **새 버전 만들기**: {{< ui >}}Edit{{< /ui >}}를 클릭하고 프롬프트 편집기에서 메시지를 업데이트하세요.
- **다른 환경에 버전 배포**: 버전을 선택하고 해당 {{< ui >}}Deployment{{< /ui >}} 환경을 업데이트하세요.
- **프롬프트 삭제**: 프롬프트 옵션 메뉴에서 {{< ui >}}Delete{{< /ui >}}을 선택하세요. 이렇게 하면 레지스트리에서 프롬프트와 해당 버전 기록이 제거됩니다.

### Python SDK 사용{#use-the-python-sdk}

`LLMObs.create_prompt()`를 사용하여 프롬프트를 만들고 첫 번째 버전을 하나 이상의 환경에 배포하세요. `env_ids` 값은 [환경 목록 나열 API][9]에서 얻을 수 있는 Feature Flags 환경 ID입니다.

```python
from ddtrace.llmobs import LLMObs

chat_template = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

created_prompt = LLMObs.create_prompt(
    "customer-support-greeting",
    chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

다른 버전을 게시하고 배포하려면 `LLMObs.create_prompt_version()`을 사용하세요.

```python
created_version = LLMObs.create_prompt_version(
    "customer-support-greeting",
    updated_chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

프롬프트 생성, 버전 관리 및 배포를 설정 작업으로 처리하세요. 애플리케이션 시작 중이나 요청 처리 경로에서는 이러한 작업을 수행하지 마세요. 런타임에 `LLMObs.get_prompt()`를 사용하여 배포된 프롬프트를 검색하세요.

이러한 메서드에는 [전제 조건](#prerequisites)에 나열된 API 및 애플리케이션 키 권한이 필요합니다.

관리형 프롬프트를 관리하려면 `LLMObs.list_prompts()`와 `LLMObs.list_prompt_versions()`를 사용하고, 메타데이터나 배포를 업데이트하려면 `LLMObs.update_prompt()`와 `LLMObs.update_prompt_version()`을 사용하며, 프롬프트와 해당 프롬프트의 모든 버전을 삭제하려면 `LLMObs.delete_prompt()`를 사용하세요.

### API 사용 {#use-the-api}

Prompt Management API를 사용하여 프롬프트 및 프롬프트 버전을 생성, 검색, 업데이트 및 삭제합니다. 엔드포인트 스키마, 요청 미디어 유형 및 예시는 [Agent Observability API 참조][8]를 참조하세요.

## 프롬프트 구성 버전 관리 {#version-prompt-configuration}

<div class="alert alert-info"><strong>미리 보기:</strong> 버전 관리된 프롬프트 구성은 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 <a href="https://www.datadoghq.com/support/">Datadog 지원팀</a> 또는 고객 성공 관리자에게 문의하세요.</div>

설정을 프롬프트와 함께 저장하여 둘 다 하나의 버전으로 업데이트하고 롤백할 수 있습니다. 구성은 다음 항목에 사용합니다.

- **모델 설정**(예: `model` 및 `temperature`).
- **구조화된 출력 스키마**(예: `response_format`).
- **도구 정의**(예: `tools` 및 `tool_choice`).

구성은 사용자가 정의하는 필드를 포함하는 JSON 객체입니다. 애플리케이션이 이러한 설정을 읽고 적용하며, Datadog은 이를 Playground 실행이나 모델 호출에 자동으로 적용하지 않습니다. 구성에 시크릿을 저장하지 마세요.

### 구성 추가 {#add-configuration}

1. {{< ui >}}Prompts{{< /ui >}} 페이지에서 {{< ui >}}New Prompt{{< /ui >}}를 클릭하고 템플릿을 작성합니다.
2. {{< ui >}}Save Prompt{{< /ui >}}를 클릭합니다. 프롬프트 ID를 입력하고 {{< ui >}}Configuration (optional){{< /ui >}}을 확장한 다음 설정을 추가합니다.

   ```json
   {
     "model": "<MODEL_NAME>",
     "temperature": 0.2
   }
   ```

3. `<MODEL_NAME>`을 이 설정을 지원하는 모델로 바꾼 다음 {{< ui >}}Create prompt{{< /ui >}}를 클릭합니다.

편집기에는 유효한 JSON 객체가 필요합니다. 예시 텍스트는 자리 표시자이며 저장된 구성이 아닙니다.

{{< img src="llm_observability/monitoring/create-prompt-configuration-document-extractor.png" alt="선택 사항인 Configuration 섹션이 펼쳐져 있고 모델, temperature 및 JSON 응답 형식 설정이 표시된 Create New Prompt 대화 상자." style="width:100%;" >}}

### 구성 업데이트{#update-configuration}

1. 프롬프트 버전을 열고 {{< ui >}}Configuration{{< /ui >}} 탭을 선택합니다.
2. {{< ui >}}Update configuration{{< /ui >}}을 클릭하고 설정을 편집합니다.
3. {{< ui >}}Save version{{< /ui >}}을 클릭합니다. 저장하기 전에 차이점을 확인하려면 먼저 {{< ui >}}Review changes{{< /ui >}}를 클릭합니다.

{{< img src="llm_observability/monitoring/configuration-tab-app-configured-cropped.png" alt="저장된 모델 설정과 Update Configuration 버튼이 표시된 Configuration 탭입니다." style="width:100%;" >}}

이렇게 하면 원본을 덮어쓰지 않고 버전이 생성됩니다. 구성 변경 사항을 확인하려면 {{< ui >}}Compare{{< /ui >}}를 사용하세요.

준비가 되면 버전을 환경에 배포하세요. 해당 환경을 조회하는 애플리케이션은 선택된 템플릿과 구성을 함께 수신합니다. 둘 다 롤백하려면 이전 버전을 배포하세요. 저장만으로는 환경이 제공하는 버전이 변경되지 않습니다.

### 애플리케이션에서 구성 사용{#use-configuration-in-your-application}

애플리케이션 환경에 배포된 프롬프트를 가져온 다음 해당 구성을 모델 클라이언트에 전달합니다.

**미리 보기 SDK 액세스:** 사용 중인 언어에 사용할 SDK 버전에 대해서는 Datadog 지원팀이나 고객 성공 관리자에게 문의하세요.

이 예시들은 위에 표시된 구성과 함께 `summarizer`이라는 이름의 프롬프트를 사용합니다.

{{< tabs >}}
{{% tab "Python" %}}

`prompt.config`를 통해 구성에 액세스하세요.

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt("summarizer")
config = prompt.config

model = config["model"]
temperature = config.get("temperature", 0.2)
```

[모델 호출](#retrieve-format-and-use-a-prompt)에서 `prompt.format(...)`과 함께 이러한 값을 사용하세요.

{{% /tab %}}
{{% tab "Node.js" %}}

`dd-trace`가 초기화된 상태에서 비동기 애플리케이션 코드 내의 `prompt.config`에 액세스하세요.

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('summarizer')
const config = prompt.config

const model = config.model
const temperature = config.temperature ?? 0.2
```

이 값들을 형식화된 프롬프트와 함께 기존 모델 클라이언트에 전달하세요.

{{% /tab %}}
{{% tab "Go" %}}

요청 핸들러 또는 애플리케이션 함수에서 `prompt.Config()`에 액세스하세요.

```go
prompt, err := llmobs.GetPrompt(ctx, "summarizer")
if err != nil {
    return err
}
config := prompt.Config()

model := config["model"].(string)
temperature, ok := config["temperature"].(float64)
if !ok {
    temperature = 0.2
}
```

이 값들을 `prompt.Format(...)`에서 반환된 메시지와 함께 모델 클라이언트에 전달하세요.

{{% /tab %}}
{{< /tabs >}}

**API 작성:** [Prompt Management API][8]를 사용하여 프롬프트와 버전을 생성할 수도 있습니다. `config`를 생략하면 새 프롬프트에 대한 빈 구성이 생성되거나 새 버전에 대한 최신 구성이 상속됩니다. 지우려면 `{}`을 전송하세요.

## 고급 사용 {#advanced-usage}

### 하나의 환경에서 여러 버전 제공 {#serve-multiple-versions-from-one-environment}

Prompt Management는 Datadog의 Feature Flags 제품을 기반으로 구축되었습니다. 각 환경은 `get_prompt()` 호출을 기본 버전으로 매핑하며, 타겟팅 규칙과 일치하는 호출에는 다른 버전을 제공할 수도 있습니다.

예를 들어, 타겟팅 규칙을 사용하여 `production`의 사용자 하위 집합에 불안정한 프롬프트 버전을 배포하면서 나머지 사용자에게는 안정적인 버전을 계속 제공할 수 있습니다.

```python
## DD_ENV=production
prompt = LLMObs.get_prompt("my-prompt")               # resolves to the stable version
prompt = LLMObs.get_prompt("my-prompt", tag="unstable") # resolves to the unstable version
```

이를 구성하려면 다음 단계를 따르세요.

1. 프롬프트의 버전 목록에서 환경 위로 마우스를 가져간 다음 {{< ui >}}Targeting Rules{{< /ui >}}를 클릭합니다.

   {{< img src="llm_observability/monitoring/prompt-environment-targeting-rules-link.png" alt="현재 하나의 프롬프트 버전을 제공하는 환경과 Targeting Rules 링크가 표시된 환경 패널." style="width:60%;" >}}

2. {{< ui >}}Add Targeting Rule{{< /ui >}}을 클릭합니다.

   {{< img src="llm_observability/monitoring/prompt-targeting-rules-default-version.png" alt="일치하는 규칙이 없을 때 제공되는 기본 버전과 Add Targeting Rule 버튼이 표시된 환경의 Targeting Rules 패널." style="width:100%;" >}}

3. 규칙 필터를 정의합니다. 예를 들어, 속성 `tag=unstable`을 전달하는 `get_prompt()` 호출을 일치시키고 결과 variant를 불안정한 프롬프트 버전으로 설정합니다.

   {{< img src="llm_observability/monitoring/prompt-targeting-rule-tag-filter.png" alt="불안정으로 설정된 태그 속성과 일치하는 타겟팅 규칙 필터 빌더입니다." style="width:100%;" >}}

4. 규칙을 저장합니다. `tag=unstable`을 포함한 호출은 일치하는 버전으로 매핑되며, 그 외의 호출은 기본 버전으로 폴백됩니다.

타겟팅 규칙에서 참조하는 속성을 키워드 인수로 `get_prompt()`에 전달하세요. 일치하는 속성을 전달하지 않는 호출은 계속해서 환경의 기본 버전으로 매핑됩니다.

타겟팅 규칙과 관계없이 정확한 버전을 가져오려면 [Select a version](#select-a-version)에 설명된 대로 `version`을 전달하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/llm_observability/instrument/prompt_tracking
[2]: /ko/getting_started/site/
[3]: /ko/account_management/api-app-keys/#api-keys
[4]: /ko/account_management/api-app-keys/#application-keys
[5]: /ko/llm_observability/instrument/sdk/?tab=python
[6]: /ko/llm_observability/instrument/auto_instrumentation/?tab=python
[7]: /ko/llm_observability/instrument/sdk/?tab=python#manual-instrumentation
[8]: /ko/api/latest/agent-observability/
[9]: /ko/api/latest/feature-flags/list-environments/
[10]: /ko/llm_observability/configure/prompt_experimentation/