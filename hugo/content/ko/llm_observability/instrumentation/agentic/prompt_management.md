---
title: Prompt Management Agentic Integration
---
## 목표 {#goal}

기존 Datadog 관리형 프롬프트를 사용하거나 애플리케이션의 로컬 프롬프트를 승격하고, 애플리케이션의 기존 동작을 폴백으로 유지하며, Agent Observability에서 관리형 프롬프트 사용을 추적하세요.

## 워크플로 선택 {#select-the-workflow}

- **기존 관리형 프롬프트 사용:** 사용자의 요청에 프롬프트 ID, 환경 및 변수 이름이 포함된 경우, Prompt Management를 다시 활성화할지 묻지 말고 그대로 사용하세요.
- **로컬 프롬프트 승격:** 이 워크플로는 사용자가 기본 [Agentic Instrumentation 가이드](/llm_observability/instrumentation/agentic)를 통해 동의한 후에만 사용하세요. 선택한 로컬 채팅 프롬프트를 승격하고, 첫 번째 버전을 요청된 환경에 배포한 다음, 런타임 검색을 통합하세요.

## 가이드라인 {#guidelines}

1. Prompt Management 런타임 검색은 Python 애플리케이션에서만 지원됩니다. 대상 애플리케이션이 Python이 아닌 경우, 런타임 검색을 추가하지 마세요. 기본 [Agentic Instrumentation 가이드](/llm_observability/instrumentation/agentic)로 돌아가서 선택한 프롬프트를 구조화된 프롬프트 추적으로 대신 계측하세요. 직접 HTTP 클라이언트를 구현하거나 애플리케이션을 Python으로 다시 작성하지 마세요.
2. 애플리케이션을 수정하기 전에 검사하세요. 패키지 관리자, 구성 및 시크릿 관리 워크플로, 시작 명령, 기존 Datadog 계측, LLM 공급자, 프롬프트 구성 및 공급자 호출 사이트를 식별하세요.
3. 기존 관리형 프롬프트의 경우, 사용자에게 확인을 요청하지 말고 사용자가 프롬프트에서 제공한 프롬프트 ID, 환경 및 변수 이름을 그대로 사용하세요. 승격의 경우, 선택한 프롬프트의 목적을 바탕으로 내용을 알기 쉽게 나타내는 프롬프트 ID를 정하고 프롬프트를 생성하기 전에 사용자에게 확인을 요청하세요.
4. 여러 프롬프트 또는 공급자 호출 사이트가 가능할 경우, 사용자에게 수정할 사이트를 묻고 답변을 받은 후에 편집하세요.
5. 애플리케이션의 기존 패키지 관리자, 구성 워크플로, 시작 명령, 공급자, 모델 및 비즈니스 동작을 유지하세요. `os.getenv()`와 같은 기존 주변 환경 변수 사용은 `.env` 또는 구성 파일이 없는 경우에도 구성 규칙입니다. 묻지 말고 해당 규칙을 확장하세요. 리포지토리에 적용 가능한 규칙이 없는 경우, 새로운 방식을 임의로 도입하지 말고 어떤 방식을 사용할지 사용자에게 물어본 후 답변을 기다리세요.
6. 관리형 프롬프트 검색을 애플리케이션의 기존 프롬프트 구성 경계에 유지하세요. 헬퍼, 라이브러리 또는 기타 구성 요소가 이미 프롬프트 구성을 담당하고 있는 경우, 이를 공급자 호출 사이트로 옮기거나 중복 구현하지 마세요.
7. 여러 로컬 프롬프트 조각이 하나의 공급자 호출로 구성될 때, 최종 공급자 대면 메시지 목록을 단일 관리형 프롬프트로 승격하세요. 중첩된 관리형 프롬프트 참조를 생성하지 마세요. 사용자가 조각을 독립적으로 관리하기를 명시적으로 원하는 경우, 기존 구성을 유지하고 해당 조각을 명시적으로 추적하세요.
8. 리포지토리 소유권 경계를 따르세요. 체크아웃된 리포지토리가 라이브러리이고 사용 불가능한 호스트 애플리케이션이 런타임 구성, 시크릿, 계측 또는 시작을 소유하고 있더라도, 라이브러리가 소유한 패키지 종속성, 프롬프트 구성 및 공급자 호출 변경 사항을 구현하세요. 호스트 측 구성을 임의로 만들거나, 라이브러리 내부에서 트레이싱을 초기화하거나, 실시간 검증을 했다고 주장하지 마세요. 남아 있는 정확한 호스트 측 작업을 보고하세요. 필수 코드 변경 사항이 체크아웃된 리포지토리에 속하지 않는 경우에만 호스트 애플리케이션을 요청하세요.
9. 사용자의 프롬프트에서 제공된 모든 API 또는 애플리케이션 키를 시크릿으로 취급하세요. 소스 코드, 추적되는 구성, 문서, 로그 또는 최종 응답에 이를 커밋하거나 반복하지 마세요. 제공된 자격 증명은 애플리케이션의 기존 커밋되지 않은 로컬 구성 또는 시크릿 관리 워크플로를 통해 구성하고, 사용자에게 이를 다시 입력하도록 요구하지 마세요. 자격 증명 값을 명령 인수나 검색 패턴에 절대 넣지 마세요. 리터럴 자격 증명 값을 검색하지 말고 파일 경로, `git status` 및 `git diff`을 사용하여 시크릿이 추적 대상에서 제외되었는지 확인하세요. 작업이 대화에서 직접 제공된 경우, 로컬 자격 증명이 포함된 사본을 출력하거나 다시 읽지 마세요.
10. 애플리케이션 시작 또는 요청 경로에서 관리형 프롬프트를 생성, 업데이트 또는 배포하지 마세요. 승격은 사용자가 동의한 후 코딩 에이전트가 수행하는 일회성 설정 작업입니다.

## Prompt Management SDK 설치 {#install-the-prompt-management-sdk}

애플리케이션의 기존 패키지 관리자를 사용하여 애플리케이션의 Python 환경에서 `ddtrace` 릴리스를 설치하거나 업그레이드하세요. 초기 상태의 환경에서 설치를 반복할 수 있도록 하고 애플리케이션의 기존 종속성 관리 규칙을 유지하세요.

## 로컬 프롬프트 승격 {#promote-a-local-prompt}

사용자가 기존 관리형 프롬프트 ID를 제공한 경우 이 섹션을 건너뛰세요.

1. 선택한 프롬프트 구성 경계에서 정적 채팅 메시지 템플릿과 동적 값을 분리하세요. `{{variable}}` placeholders in the template and keep a value available for every variable.을 사용하세요.
2. Propose a stable, descriptive prompt ID based on the prompt's purpose, then wait for the user to confirm it. If the deployment environment was not supplied, ask which environment to use at the same time.
3. Before creating the prompt, obtain a Datadog API key and a one-time application key with the `llm_observability_write`, `feature_flag_config_write`, and `feature_flag_environment_config_read` permissions. If the user did not already provide a suitable application key, ask for one. Do not add this setup credential to the application's runtime configuration.
4. Follow the [List environments API](/api/latest/feature-flags/list-environments/) and call `GET /api/v2/feature-flags/environments?dd_env=<URL_ENCODED_DD_ENV>`. The `dd_env` filter matches `DD_ENV` exactly against each environment's `attributes.queries`를 사용하세요.
   - 정확히 하나의 환경이 일치하면 해당 `data[].id`를 Feature Flags 환경 ID로 사용하세요.
   - 둘 이상의 환경이 일치하면 사용자에게 사용할 환경을 물어보세요. 임의로 추측하지 마세요.
   - 환경이 일치하지 않으면 애플리케이션의 현재 `DD_ENV`가 Feature Flags 환경에 매핑되지 않았음을 설명하고 사용자에게 환경을 생성할지 여부를 물어보세요. 명시적인 승인을 받지 않고 다른 `DD_ENV`를 요청하거나 환경을 생성하지 마세요.
     - 사용자가 동의하면 환경의 표시 이름을 요청하고, 해당 환경이 프로덕션 환경인지 물어보세요. 그런 다음 [환경 생성 API](/api/latest/feature-flags/create-an-environment/)를 따라 `queries`에 정확한 `DD_ENV` 값이 포함된 환경을 생성하세요. 제공된 애플리케이션 키로 요청을 시도하세요. 키에 권한이 부족하여 Datadog이 요청을 거부하면 사용자에게 `feature_flag_environment_config_write`를 부여하거나 해당 권한이 있는 애플리케이션 키를 제공하도록 요청한 후 다시 시도하세요. 사용자가 명시적으로 요청하지 않는 한, Feature Flag 승인을 비활성화 상태로 두고 반환된 `data.id`를 사용하세요.
     - 사용자가 거부하면 관리형 프롬프트를 다른 환경에 배포하지 마세요. 프롬프트를 배포하기 전에 애플리케이션의 `DD_ENV`와 일치하는 Feature Flags 환경이 존재해야 함을 설명하세요.
5. `LLMObs.list_prompts()`를 사용하여 정확한 프롬프트 ID 일치 여부를 확인하세요. ID가 이미 관리형 프롬프트에 속해 있는 경우 덮어쓰지 말고 해당 프롬프트를 통합할지 아니면 다른 ID를 선택할지 물어보세요. 아직 관리되지 않는 추적된 프롬프트는 기존 ID를 사용하여 승격할 수 있습니다.
6. `env_ids`를 사용하여 첫 번째 버전을 한 번에 생성하고 배포하세요.

```python
from ddtrace.llmobs import LLMObs

created_prompt = LLMObs.create_prompt(
    "<PROMPT_ID>",
    chat_template,
    env_ids=[environment_id],
)
```

프로모션에는 이 공개 SDK 메서드를 사용하세요. 설치된 SDK가 `env_ids`를 허용하지 않는 경우, 생성 중에 프롬프트 배포를 지원하지 않는다고 보고하세요. 해결 방법으로 비공개 SDK 메서드나 Prompt Management HTTP API를 호출하지 마세요.

생성 시 충돌이 보고되면 프롬프트를 다시 나열하세요. 확인된 ID가 의도한 관리형 프롬프트에 속하는 경우에만 프롬프트를 통합하세요. 그렇지 않으면 사용자에게 다른 ID를 선택하도록 요청하세요. 기존 관리형 프롬프트를 자동으로 업데이트하거나 교체하지 마세요.

반환된 `created_prompt["id"]` 값을 유지하세요. 다음은 Datadog 프롬프트 페이지에서 사용하는 프롬프트 UUID입니다. `DD_SITE`에서 Datadog 애플리케이션 호스트를 결정하세요. `datadoghq.com`에는 `app.datadoghq.com`을, `datadoghq.eu`에는 `app.datadoghq.eu`를, `ddog-gov.com`에는 `app.ddog-gov.com`을 사용하고, 기타 지원되는 사이트에는 `DD_SITE` 값 자체를 사용하세요. 성공적인 프로모션 후 최종 응답에 `https://<APPLICATION_HOST>/llm/prompts/<PROMPT_UUID>`를 포함하세요. 애플리케이션 호스트를 확실하게 확인할 수 없다면 URL을 추측하지 말고, 프롬프트 ID로 생성된 프롬프트를 식별한 후 사용자에게 Prompt Management에서 해당 프롬프트를 열도록 안내하세요.

프로모션이 성공한 후 아래의 런타임 구성 및 검색을 계속하세요. 일회성 쓰기 가능 애플리케이션 키는 제거할 수 있습니다. 런타임 검색은 다음 섹션에 설명된 읽기 권한이 있는 최소 권한 애플리케이션 키를 사용해야 합니다.

## 애플리케이션 구성 {#configure-the-application}

애플리케이션의 기존 구성 및 시크릿 관리 워크플로를 사용하여 `ddtrace`가 초기화되기 전에 다음 값을 사용할 수 있도록 하세요.

```text
DD_SITE=<DATADOG_SITE>
DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
DD_LLMOBS_ENABLED=1
```

애플리케이션의 기존 식별 정보를 유지하세요. `DD_SERVICE` 또는 `DD_LLMOBS_ML_APP`이 이미 구성되어 있는 경우 해당 값을 유지하고 이 통합의 일부로 애플리케이션 이름을 바꾸지 마세요. 둘 다 구성되지 않은 경우, 기존 애플리케이션, 서비스 또는 프로젝트 이름을 기반으로 `DD_SERVICE`를 논리적 이름으로 설정하세요.

`DD_API_KEY` 는 프롬프트 검색에 필요합니다. `DD_ENV`가 설정된 경우, 해당 환경에 배포된 프롬프트 버전을 확인하려면 `DD_APP_KEY`가 필요합니다. 애플리케이션 키에는 `llm_observability_read`, `feature_flag_config_read`, `feature_flag_environment_config_read` 권한이 있어야 합니다.

애플리케이션이 Datadog Agent를 통해 데이터를 전송하지 않는 경우 다음도 설정하세요.

```text
DD_LLMOBS_AGENTLESS_ENABLED=1
```

프로세스 시작 전에 구성을 사용할 수 있는 경우 기존 시작 워크플로를 유지하고 필요한 경우 자동 계측을 위해 `ddtrace-run`을 사용하세요. 애플리케이션이 Python에서 구성을 로드하는 경우 `ddtrace.auto`를 가져오기 전에 로드한 다음 애플리케이션의 일반 Python 명령을 실행하세요. 애플리케이션 수준 구성 로드와 `ddtrace-run`을 결합하지 마세요.

셸 기반 시작을 문서화할 때 변수를 내보내거나, 시작 명령에서 인라인으로 할당하거나, 애플리케이션의 기존 메커니즘을 유지하여 구성이 하위 Python 프로세스에 도달하는지 확인하세요. 내보내지 않은 단순 셸 할당을 실행 가능한 설정으로 제시하지 마세요.

프롬프트를 승격하는 데 사용되는 쓰기 가능한 애플리케이션 키는 일회성 설정 자격 증명입니다. 사용자가 런타임 사용을 위해 명시적으로 선택했고 필요한 읽기 권한도 있는 경우가 아니면 애플리케이션의 런타임 구성에 추가하지 마세요. 그렇지 않으면 별도의 최소 권한 런타임 애플리케이션 키를 사용하세요.

기존 관리형 프롬프트 통합의 경우, 사용자의 프롬프트에 자격 증명이 포함되어 있지 않으면 사용자에게 제공을 요청하지 마세요. 가능한 경우 코드 및 구성 참조를 완료한 다음, 실시간 프롬프트 확인 및 추적을 확인할 수 없다고 보고하세요. 승격은 다릅니다. 이는 사용자가 승인한 설정 작업이며 [로컬 프롬프트 승격](#promote-a-local-prompt)에 설명된 쓰기 가능한 자격 증명이 필요합니다.

## 관리형 프롬프트 검색 및 형식 지정 {#retrieve-and-format-the-managed-prompt}

1. 사용자에게 확인을 요청하지 말고 기존 관리형 프롬프트에 제공된 프롬프트 ID 및 변수 이름을 사용하세요. 승격된 프롬프트의 경우 승격 중에 확인된 ID와 변수를 사용하세요. 필수 메타데이터가 누락된 경우 추측하지 말고 요청하세요.
2. 모든 관리형 프롬프트 변수에 선택한 프롬프트 구성 경계에서 사용할 수 있는 의미 있는 값이 있는지 확인하세요. 애플리케이션이 값을 제공할 수 없는 경우 사용자에게 매핑 방법을 묻고 답변을 기다리세요.
3. 기존 프롬프트 구성 경계에서 `ddtrace.llmobs`로부터 `LLMObs`를 가져오세요.
4. 거기에 있는 기존 프롬프트 구성을 사용자가 제공한 프롬프트 ID를 사용하여 `LLMObs.get_prompt()`로 교체하세요.
5. 애플리케이션의 기존 채팅 프롬프트를 메시지 목록 `fallback`으로 유지하세요.
6. 동적 폴백 자리 표시자는 제공된 변수 이름을 정확히 사용하여 `{{variable}}` 구문으로 표현합니다. 폴백에는 Python 스타일의 `{variable}` 자리 표시자는 남겨 두지 마세요.
7. Call `prompt.format()`을 제공된 모든 변수의 값과 함께 호출한 후 공급자, 모델 또는 관련 없는 동작을 변경하지 않고 포맷된 메시지를 기존 공급자 호출에 전달하세요.

예를 들면 다음과 같습니다.

```python
from ddtrace.llmobs import LLMObs

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": company,
    "question": question,
}

prompt = LLMObs.get_prompt(
    "<PROMPT_ID>",
    fallback=default_messages,
)
messages = prompt.format(**variables)
```

## 프롬프트 사용량 추적 {#track-prompt-usage}

형식화된 값이 지원되는 자동 계측 공급자에 직접 전달되는 경우, Datadog이 관리형 프롬프트를 결과 LLM 스팬과 자동으로 연결할 수 있도록 해당 값을 변경하지 않고 유지하세요.

애플리케이션이 공급자 호출 전에 형식화된 값을 복사, 재구축, 연결, 변형 또는 기타 방식으로 변환하는 경우, 해당 호출을 `LLMObs.annotation_context()`로 래핑하고 `prompt.to_annotation_dict()`에 전달된 것과 동일한 변수를 `prompt.format()`으로 전달하세요. 다중 턴 루프를 포함하여 사용자 메시지, 어시스턴트 응답, 도구 호출 또는 도구 결과로 형식화된 채팅 메시지 목록을 추가하거나 확장하는 것을 변환으로 취급하고, 해당 대화를 사용하는 모든 공급자 호출에 대해 주석 컨텍스트를 활성 상태로 유지하세요.

통합을 완료하기 전에 `prompt.format()`에서 모든 공급자 호출로의 실제 데이터 흐름을 검사하세요. 중간에 형식화된 값을 복사, 재구축, 연결, 변형 또는 변환하는 작업이 있으면 `annotation_context()`를 사용하세요.

```python
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

`annotation_context()`는 LLM 스팬을 생성하지 않습니다. 공급자가 자동으로 계측되도록 하거나 애플리케이션의 기존 수동 LLM 스팬 계측을 유지하세요.

## 통합 확인 {#verify-the-integration}

1. 애플리케이션의 기존 워크플로를 사용하여 외부 요청을 수행하지 않는 로컬 검사를 수행하세요.
2. Datadog에 쿼리하거나 SDK 스팬 읽기 메서드를 사용하여 프롬프트 추적을 확인하지 마세요.
3. 검증을 위해 애플리케이션을 실행하거나, 공급자 요청을 하거나, 비용을 발생시키거나, 텔레메트리를 내보내거나, 기타 외부 부작용을 일으켜야 하는 경우, 단순히 실행 명령을 제공하는 것만으로 작업을 완료하지 마세요. 코딩 환경의 승인 메커니즘을 통해 해당 명령에 대한 승인을 요청하거나, 사용자에게 직접 물어보고 확인을 기다리세요. 도구 실행 승인은 확인으로 간주됩니다.
4. 사용자가 실행을 승인하면 애플리케이션의 일반적인 실행 워크플로를 사용하고 수정된 공급자 호출을 실행하세요. 사용자가 거부하면 사용자에게 필요한 정확한 명령이나 작업을 제공하세요.
5. 최종 응답에서 애플리케이션이 실행되었는지 여부를 명시하세요. 승격 후 `LLMObs.create_prompt()`로부터 반환된 UUID로 구성된 직접 프롬프트 페이지 링크를 포함하세요. 그렇지 않으면, UUID와 호스트가 알려진 경우 직접 프롬프트 페이지 링크를 포함하세요. 필요한 경우 사용자에게 수정된 LLM 흐름을 트리거하도록 요청하고, Datadog의 해당 프롬프트 페이지로 돌아가서 프롬프트 사용량이 나타날 때까지 잠시 기다리게 하세요.
6. 인증, 권한 부여, 검색 또는 추적 실패를 정확하게 보고하세요. 사용자가 확인하지 않는 한 Datadog 측 추적이 검증되었다고 주장하지 마세요.