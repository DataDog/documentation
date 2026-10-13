---
algolia:
  tags:
  - workflow variables
  - variables
  - mutable
aliases:
- /ko/service_management/workflows/actions/set_variables/
- /ko/service_management/workflows/variables
description: 컨텍스트 변수, 입력 파라미터, 출력 파라미터, 사용자 지정 변수를 사용하여 워크플로 단계 간 데이터를 전달하세요.
disable_toc: false
further_reading:
- link: /actions/workflows/actions/flow_control#for-loop
  tag: 설명서
  text: for 루프를 사용하여 작업을 반복해서 수행하세요
title: 변수 및 파라미터
---
워크플로에서 사용할 수 있는 변수 및 파라미터는 다음과 같습니다.
- [컨텍스트 변수](#context-variables): 컨텍스트 변수는 워크플로 관련 컨텍스트 정보를 저장하거나 트리거 이벤트 또는 워크플로 단계에서 워크플로로 전달되는 데이터를 포괄하는 광범위한 범주의 변경 불가능한 변수입니다.
- [입력 파라미터](#input-parameters): 입력 파라미터는 런타임에 워크플로로 데이터를 전달하는 데 사용할 수 있는 변경 불가능한 키값 쌍입니다.
- [출력 파라미터](#output-parameters): 출력 파라미터를 사용하여 워크플로 결과를 다른 워크플로로 전달할 수 있습니다.
- [사용자 지정 변수](#custom-variables): 사용자 지정 변수는 변경 가능합니다. 이 변수를 사용하여 워크플로 전반에 걸쳐 변수를 선언, 업데이트, 액세스할 수 있습니다.

## 컨텍스트 변수 {#context-variables}

유용한 워크플로를 생성하기 위해서는 한 단계에서 다른 단계로 데이터를 전달하거나, 워크플로의 트리거 소스에서 데이터를 처리하는 단계를 구성해야 하는 경우가 있습니다. 컨텍스트 변수를 통해 이러한 유형의 데이터 보간을 수행할 수 있습니다.

- **워크플로 변수**는 현재 워크플로에 대한 정보를 제공합니다.
    - `WorkflowName`: 워크플로의 이름입니다.
    - `WorkflowId`: 워크플로의 ID입니다.
    - `InstanceId`: 워크플로 실행 인스턴스의 ID입니다.
- 일부 단계의 경우 **단계 출력 변수**를 포함하고 있어 해당 단계에서 워크플로의 후속 단계로 데이터를 전달할 수 있습니다.
- **트리거 변수**는 트리거 이벤트에 의해 워크플로로 전달됩니다.
- **소스 객체 변수**는 트리거 이벤트에 의해 워크플로로 전달됩니다.

각 단계의 {{< ui >}}Context Variables{{< /ui >}} 탭은 해당 단계에서 사용할 수 있는 컨텍스트 변수 전체의 맵을 제시합니다.

{{< img src="actions/workflows/variables/context-variables5.png" alt="컨텍스트 변수 탭" >}}

특정 단계에서 컨텍스트 변수에 액세스하려면 이중 중괄호(`{{`)로 묶으세요. 컨텍스트 변수 내 필드에 액세스하려면 [Handlebars 표현식 구문][4]을 사용하세요.

### 단계 출력 변수 {#step-output-variables}

일부 단계에서는 워크플로의 후속 단계에서 사용 가능한 출력을 생성합니다. `Steps.<step_name>.<variable>` 구문을 사용하여 단계 변수에 액세스하세요. 예를 들어, GitHub 풀 리퀘스트 상태 단계(`Get_pull_request_status`)에서 풀 리퀘스트 상태 변수(`state`)를 가져오려면 다음 컨텍스트 변수를 사용합니다.

```
{{ Steps.Get_pull_request_status.state }}
```

어떤 변수를 찾아야 할지 잘 모르겠다면, Datadog은 입력 과정에서 기존 단계 출력을 제안합니다. 또는 {{< ui >}}Context Variables{{< /ui >}} 탭에서 사용 가능한 변수 목록을 확인할 수 있습니다.

{{< img src="actions/workflows/variables/step-outputs2.png" alt="Datadog은 입력 과정에서 기존 단계 출력을 제안합니다." style="width:100%;" >}}

### 소스 객체 변수 {#source-object-variables}

소스 객체 변수는 실행 시점에 확인되는 트리거 이벤트의 속성입니다. 워크플로에서 사용 가능한 변수는 워크플로 인스턴스 시작을 유발한 트리거 유형에 따라 달라집니다. 예를 들어, 워크플로 인스턴스가 모니터에 의해 트리거된 경우,{{Source.monitor.id}}를 통해 모니터 ID 변수를 사용할 수 있습니다.`. If the workflow is triggered by a security signal detection or notification rule, the signal ID is available using `{{Source.securitySignal.id}}`.

소스 객체의 모든 변수는 {{< ui >}}Context Variables{{< /ui >}} 탭에서 확인할 수 있습니다.

{{< img src="actions/workflows/variables/context-variables-tab-source-object-variables2.png" alt="컨텍스트 변수 탭의 소스 객체 변수" style="width:60%;">}}

## 입력 파라미터 {#input-parameters}

입력 파라미터는 워크플로에 데이터를 전달하는 데 사용할 수 있는 변경 불가능한 키값 쌍입니다. 다음과 같은 워크플로에서 입력 파라미터를 사용할 수 있습니다.
- Dashboard 등에서 수동으로 트리거되는 워크플로
- Monitors 및 Security Signal Notification Rules 등의 멘션 트리거를 사용하는 워크플로

입력 파라미터 추가하기
1. 워크플로 캔버스를 클릭합니다.
1.  {{< ui >}}Input Parameters{{< /ui >}} 옆의 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭합니다.
1. 파라미터 이름, 데이터 유형, 파라미터 설명을 추가합니다. 표시 이름은 파라미터 이름을 기반으로 자동 생성됩니다. {{< ui >}}Use custom display name{{< /ui >}} 상자에 체크 표시를 하여 사용자 지정합니다. 표시 이름은 사람이 읽을 수 있는 파라미터 이름이며, 파라미터 이름은 워크플로 단계에서 해당 파라미터를 참조하는 데 사용됩니다.
1. (선택 사항) 파라미터 기본값을 추가합니다. 기본값을 추가하면 런타임에 해당 파라미터는 선택 사항으로 지정됩니다.

특정 단계에서 입력 파라미터를 참조하려면 다음 구문을 사용합니다. `{{ Trigger.<parameter name>}}`. For example, to reference an input parameter named `user`, use `{{Trigger.user}}`.

{{< ui >}}Input Parameters{{< /ui >}} 섹션에는 기존의 모든 입력 파라미터 이름과 카운터가 동시에 표시됩니다. 카운터 위에 마우스를 올리면 어떤 단계에서 해당 파라미터를 사용 중인지 확인할 수 있습니다.

{{< img src="actions/workflows/variables/input-parameter3.png" alt="카운터 위에 마우스를 올리면 어떤 단계에서 해당 파라미터를 사용 중인지 확인할 수 있습니다." style="width:60%;">}}

워크플로 단계에 다음 구문을 입력하여 암시적 입력 파라미터(워크플로에 존재하지 않는 파라미터)를 추가할 수 있습니다.`{{ Trigger.<parameter name> }}` 다음에 워크플로를 저장할 때 파라미터를 명시적 파라미터로 변환할 수 있는 대화 상자가 나타납니다. 워크플로 트리거 방법에 대한 자세한 정보는 [워크플로 트리거][5]를 참조합니다.

기존 입력 파라미터를 찾으려면`{{ Trigger.`를 입력하여 제안으로 표시되는지 여부를 확인하세요. 또는 {{< ui >}}Context Variables{{< /ui >}} 탭에서 사용 가능한 파라미터 목록을 확인하세요.

## 출력 파라미터 {#output-parameters}

출력 파라미터를 통해 워크플로 결과에 액세스할 수 있습니다. 워크플로 결과를 다른 워크플로나 App Builder 앱으로 전달할 때 유용합니다.

출력 파라미터 추가하기
1. 워크플로 캔버스를 클릭합니다.
1. {{< ui >}}Output Parameters{{< /ui >}} 옆의 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭합니다.
1. 파라미터 이름, 값, 데이터 유형을 추가합니다.
1. (선택 사항) 파라미터 기본값을 추가합니다. 기본값을 추가하면 런타임에 해당 파라미터는 선택 사항으로 지정됩니다.

{{< ui >}}Output Parameters{{< /ui >}} 섹션에는 기존의 모든 출력 파라미터 이름과 카운터가 동시에 표시됩니다.

워크플로 간 데이터 전달에 관한 정보는 [하위 워크플로 결과 액세스][7]를 참조하세요.

출력 파라미터를 통해 워크플로와 App Builder 간에 정보를 전달하는 방법을 보여주는 예시는 [앱에 워크플로 결과 반환][6]을 참조하세요.

## 사용자 지정 변수 {#custom-variables}

변경 가능한 워크플로 변수를 설정하려면 [변수 설정][1] 작업을 사용하세요. 이 작업을 통해 워크플로 전반에 걸쳐 사용자 지정 변수를 선언, 업데이트, 액세스할 수 있으며 보다 복잡한 워크플로 작업을 수행할 수 있습니다. 예를 들면 다음과 같습니다.
- _API 페이지 지정 처리_: API 요청 시 페이지 토큰이나 오프셋을 추적해야 하는 경우가 있습니다.
- _목록 처리_: 변수를 사용하여 배열을 초기화하고 맵(map) 및 리듀스(reduce) 등의 작업을 수행할 수 있습니다.
- _반복_: 변수를 사용하여 [for 루프][2] 내에서 데이터를 조작하고 저장할 수 있습니다. 그런 다음 워크플로의 나머지 단계에서 해당 데이터를 활용할 수 있습니다.

### 사용자 지정 변수 설정{#set-a-custom-variable}

사용자 지정 변수 설정하기
1. 워크플로 캔버스에서 + ({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭하여 작업 카탈로그를 엽니다.
1.  {{< ui >}}Set variable{{< /ui >}}단계를 검색하여 선택합니다.
1. {{< ui >}}Set variable{{< /ui >}} 단계를 클릭하고 {{< ui >}}Step name{{< /ui >}}을 입력합니다.
1. {{< ui >}}variable name{{< /ui >}}을 입력합니다. 변수 이름은 문자로 시작해야 하며 영숫자와 밑줄만 포함할 수 있습니다.
1. 변수 값을 입력합니다.
   - 워크플로 컨텍스트 변수를 사용하려면 ``{{``를 입력합니다.
   - 객체를 생성하려면 {{< ui >}}Create object{{< /ui >}} <i class="icon-api"></i> 버튼을 클릭합니다.
   - 배열을 생성하려면 {{< ui >}}Create array{{< /ui >}} <span id="icon-array">[ ]</span> 버튼을 클릭합니다.

사용자 지정 변수를 설정한 후 해당 값을 변경해야 하는 경우, 추가 {{< ui >}}Set variable{{< /ui >}} 단계를 추가하고 변수를 다시 할당하거나 변수를 새로 생성해야 합니다.

다음은 {{< ui >}}Set variable{{< /ui >}} 단계를 보여주는 워크플로 예시입니다.

1. 워크플로에서 {{< ui >}}Set variable{{< /ui >}} 단계로 시작해 `intList`라는 변수를 선언하고 `[1,2,3,4]` 값을 지정합니다.
1. 두 번째 {{< ui >}}Set variable{{< /ui >}} 단계를 추가한 후 `evenList`라는 변수를 선언하고 `${Variables.intList.filter(number => number % 2 === 0)}` 값을 지정합니다. 이는 홀수를 필터링하는 [인라인 JavaScript 표현식][8]입니다.
1. {{< ui >}}Echo{{< /ui >}} 단계를 추가하여 `evenList`(`2,4`) 값을 에코합니다.

{{< img src="actions/workflows/variables/set-variable-updated.png" alt="이 워크플로는 숫자 목록을 저장할 변수를 설정하고, 인라인 표현식을 사용해 목록에서 홀수를 필터링하는 두 번째 변수를 선언하고, 두 번째 변수 값을 에코합니다." style="width:100%;" >}}

### 사용자 지정 변수 액세스{#access-a-custom-variable}

워크플로에서 다음을 통해 사용자 지정 변수에 액세스할 수 있습니다.{{ Variables.variableName }}`. For example, to access a custom variable named `DashboardList`, use `{{ Variables.DashboardList }}`.

### 반복 {#iteration}

{{< ui >}}For loop{{< /ui >}} 또는 {{< ui >}}While loop{{< /ui >}} 내 사용자 지정 변수를 설정하면 루프 외부에서 사용할 데이터를 저장할 수 있습니다. 예를 들어 {{< ui >}}For loop{{< /ui >}} 내에서 API 요청을 여러 번 수행할 경우, 사용자 지정 변수를 설정하고 반복할 때마다 필요한 데이터를 해당 변수에 추가할 수 있습니다. 루프 외부에서 사용자 지정 변수에 액세스한 후 수집한 데이터를 처리할 수 있습니다.

정의되지 않은 변수로 인한 유형 오류를 방지하려면 루프에서 사용하기 전 사용자 지정 변수를 할당하세요. 아래 예시에서 사용자 지정 변수 `evenList`는 루프에서 사용하기 전 빈 배열로 설정되어 있습니다.

{{< img src="actions/workflows/variables/loop.png" alt="이 워크플로는 루프에서 사용하기 전 변수를 설정합니다." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][3]의 **#workflows** 채널에 참여하세요.

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /ko/actions/workflows/actions/flow_control#for-loop
[3]: https://chat.datadoghq.com/
[4]: https://handlebarsjs.com/guide/expressions.html#expressions
[5]: /ko/actions/workflows/trigger
[6]: /ko/actions/app_builder/queries/#return-workflow-results-to-an-app
[7]: /ko/actions/workflows/trigger/#access-the-result-of-a-child-workflow
[8]: /ko/actions/workflows/expressions/#inline-javascript-expressions