---
description: 일정에 따라 또는 Datadog 신호에 응답하여 세션을 실행하는 Bits Code 자동화를 생성하세요.
disable_toc: false
further_reading:
- link: /bits_ai/bits_ai_dev_agent/
  tag: 설명서
  text: Bits Code
title: 자동화
---
## 개요 {#overview}
예를 들어 새로운 Code Security 탐지 결과나 반복 일정과 같은 트리거가 발생하면, Bits Code가 [세션][1]을 시작하도록 자동화를 생성한 후, 결과를 풀 리퀘스트 또는 Slack 알림으로 전달하세요.

{{< img src="bits_ai/dev_agent/automations/list.png" alt="'Bits로 자동화하기'라는 제목 아래에 이름, 작성자 및 마지막 실행 등의 열과 4개의 행으로 이뤄진 표가 표시됩니다." style="width:100%;" >}}

Bits Code 자동화를 사용하면 다음을 수행할 수 있습니다.

- 각 세션을 수동으로 시작하지 않고도 일정에 따라 코드 수정을 생성합니다.
- 새로운 APM Recommendation, 불안정한 테스트 또는 Code Security 탐지 결과와 같은 다른 Datadog 제품의 신호에 Bits Code가 응답하도록 합니다.
- 결과 코드 변경 사항을 직접 풀 리퀘스트로 라우팅하거나 Slack에서 팀에 알립니다.

## 전제 조건 {#prerequisites}
Bits Code 자동화를 설정하려면 다음 조건을 모두 충족해야 합니다.
- Datadog에서 **Bits Code Write**(`bits_dev_write`) 권한이 있어야 합니다.
- Bits Code [설정][2]을 완료해야 합니다.
- 자동화가 [Slack 알림을 출력하도록 계획하고 있다면](#slack-message-output), [Slack 통합][4]을 설정해야 합니다.

## 자동화 생성 {#create-an-automation}
[사용자 정의 자동화를 생성](#create-a-custom-automation)할 수 있거나, [Datadog에서 제공하는 자동화 템플릿을 사용](#create-an-automation-from-a-template)할 수 있습니다.

{{< img src="bits_ai/dev_agent/automations/custom_prompt_creation_form.png" alt="'Bits로 자동화하기'라는 제목 아래에 '사용자 정의 프롬프트' 및 '매주'와 같은 필드가 있는 양식이 표시됩니다." style="width:100%;" >}}

기본적으로 새로 생성된 자동화는 **Active** 상태를 가지며, **My Automations** 목록에 나타납니다.

### 사용자 정의 자동화 생성 {#create-a-custom-automation}
사용자 정의 Bits Code 자동화를 생성하려면 다음 단계를 따르세요.
1. Datadog에서 **Bits AI** > **Bits Code** > [**Automations**][3]로 이동하세요.
1. New Automation**을 클릭하세요**.
1. **자동화 이름** 필드에 자동화를 설명하는 이름을 입력하세요.
1. **Trigger** 섹션에서 [트리거](#triggers)를 구성하세요.
1. **Output** 섹션에서 하나 이상의 [출력](#outputs)을 구성하세요.
1. **Create Automation** 또는 **Create & run now**를 클릭하세요.

### 템플릿으로 자동화 생성 {#create-an-automation-from-a-template}
**Automation Templates** 섹션에서 Datadog에서 제공하는 자동화 템플릿을 찾으세요. 여기에는 다음이 포함될 수 있습니다.

- **APM Recommendation을 기반으로 PR 생성**: 특정 서비스에 대한 APM 권장 사항을 기반으로 풀 요청을 생성합니다.
- **리포지토리의 빈번한 오류 수정**: [**Custom Prompt**](#custom-prompt-trigger) 트리거를 사용하여 Bits Code에 지난 24시간의 로그를 스캔하고 가장 빈번한 오류를 찾아 수정 사항이 포함된 풀 요청을 열도록 지시합니다.

템플릿 타일을 클릭하면 새로운 자동화 양식으로 이동합니다. 자동화를 생성하기 전에 [출력](#outputs)을 구성해야 합니다.

## 트리거 {#triggers}
트리거는 자동화가 실행되는 시점과 Bits Code가 작동하는 대상을 정의합니다. 트리거는 최대 세 가지 요소로 구성됩니다. 

- [제품 탐지 결과](#product-finding-trigger): Datadog 내의 신호(예: Error Tracking 문제)
- [사용자 정의 프롬프트](#custom-prompt-trigger): 선택한 리포지토리에 대해 Bits Code가 수행할 작업을 지시하는 자유 형식의 지침
- [일정](#schedule-trigger): 매일 또는 특정 요일과 같은 반복적인 주기

**Add Trigger**를 클릭하여 구성 요소를 추가하세요. 제품 탐지 결과와 일정을 결합해 사용하거나, 사용자 정의 프롬프트를 일정과 결합해 사용하거나, 제품 탐지 결과를 단독으로 사용할 수 있습니다.

주어진 기간(예: `5 runs per Week`)에 자동화로 생성할 수 있는 Bits Code 세션 수를 제한하려면 **Add Trigger** > **Set max runs**를 클릭하세요. 한 번의 자동화 실행으로 여러 세션을 생성할 수 있습니다. 이 설정을 사용하면 자동화가 생성하는 풀 요청 또는 알림의 수를 제어할 수 있습니다.

### 제품 탐지 결과 트리거 {#product-finding-trigger}
제품 탐지 결과 트리거는 다른 Datadog 제품(예: Error Tracking 또는 Code Security)에서 새로운 문제가 발생할 때 자동화를 실행합니다. 제품 탐지 결과 트리거는 단독으로 사용할 수도 있으며, 이 경우 새로운 탐지 결과가 있을 때마다 자동화가 실행됩니다. 정의한 [일정](#schedule-trigger) 및 조회 기간(**New findings within** 필드에서 설정)과 함께 사용할 수도 있습니다.

<div class="alert alert-info">일반적으로는 새로운 탐지 결과를 즉시 해결하기 위해 제품 탐지 결과 트리거를 단독으로 사용하지만, 일정 및 조회 기간과 결합하여 사용하면 특정 시간대에만 새로운 탐지 결과를 모니터링하도록 설정할 수 있습니다. 예를 들어 매주 수요일에 배포하는 경우, APM Recommendations 트리거가 매주 목요일에 실행되도록 하고 조회 기간을 지난 24시간으로 구성할 수 있습니다.</div>

제품 탐지 결과 트리거를 설정할 때, 제품에 따라 다양한 추가 필터를 구성할 수 있습니다. 예를 들면 다음과 같습니다.
  - **Flaky Test**는 **Repository**, **Branch**(기본적으로 리포지토리의 기본 브랜치임) 및 **Status**에 따라 필터링을 지원합니다.
  - **Code Security(SAST)**는 **Repository**, **Severity**, **Rule to remediate**으로 필터링할 수 있으며, **Filter out findings identified as false positives by Bits AI** 토글을 사용할 수 있습니다.

<div class="alert alert-warning">자동화를 트리거하는 각각의 탐지 결과는 단일 세션에 연결되어 있습니다. 여러 개의 탐지 결과는 단일 세션이나 풀 요청에서 수정할 수 없습니다.</div>

### 사용자 정의 프롬프트 트리거 {#custom-prompt-trigger}
사용자 정의 프롬프트는 자동화가 실행될 때마다 선택한 리포지토리에 대해 Bits Code가 수행할 작업을 자유 형식 텍스트로 알려줍니다. 특정 Datadog 신호에 연결되지 않은 반복 유지 관리 작업(예: 종속성 업데이트 또는 문서 새로 고침)에 사용자 정의 프롬프트를 사용하세요.

### 일정 트리거 {#schedule-trigger}
일정 트리거는 자동화가 실행되는 시간을 제어합니다. [제품 탐지 결과](#product-finding-trigger) 또는 [사용자 정의 프롬프트](#custom-prompt-trigger)와 결합해 사용할 수 있습니다. 일정은 다음과 같은 옵션 중에서 선택하여 설정할 수 있습니다.
  - **선택한 주기마다…**: 미리 설정된 주기를 선택하세요(예: `Every day at 09:00 am`).
  - **사용자 정의 일정**: 특정 요일과 시간(예: `Mo, We, Fr at 03:00 pm`)을 선택하세요.

## 출력 {#outputs}
출력은 [세션][1]이 완료된 후 Bits Code가 수행하는 작업을 정의합니다. 하나의 자동화에는 [풀 리퀘스트 열기](#pull-request-output) 및 [Slack 알림 생성](#slack-message-output)을 포함하여 하나 이상의 출력을 구성할 수 있습니다.

### 풀 리퀘스트 출력 {#pull-request-output}
자동화는 다음과 같이 구성할 수 있습니다.
- **PR 생성**: 제안된 변경 사항으로 풀 리퀘스트를 엽니다.
- **PR 초안 작성**: 제안된 변경 사항으로 초안 풀 리퀘스트를 엽니다.

Bits Code 자동화의 작성자로서, 생성된 모든 풀 리퀘스트의 작성자가 됩니다.

### Slack 메시지 출력 {#slack-message-output}
자동화를 구성하여 [세션][1] 및 코드 변경 사항이 요약된 Slack 메시지를 보낼 수 있습니다. Slack 출력을 추가로 사용하는 경우, Bits Code는 Slack 메시지에 풀 리퀘스트 링크를 포함합니다.

Slack 메시지 출력을 추가하면 Bits Code는 기본적으로 [카탈로그][5]에서 영향을 받는 서비스에 대해 구성된 채널로 메시지를 보냅니다. 대체 Slack 채널을 설정할 수 있으며, 카탈로그에 채널이 설정되어 있지 않은 경우 이 채널이 사용됩니다.

## 자동화 관리 {#manage-automations}
[**Automations**][3]의 **My Automations** 탭에서 생성한 자동화를 확인할 수 있습니다. 조직의 모든 사용자가 생성한 자동화를 보려면 **All**로 전환하세요.

모든 자동화를 일시 중지하거나 재개할 수 있지만, 직접 만든 자동화만 편집하거나 삭제할 수 있습니다.

## 참고 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_ai_dev_agent/#sessions
[2]: /ko/bits_ai/bits_ai_dev_agent/setup/
[3]: https://app.datadoghq.com/code/automations
[4]: /ko/integrations/slack/
[5]: /ko/internal_developer_portal/catalog/