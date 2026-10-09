---
aliases:
- /ko/app_builder/queries
- /ko/service_management/app_builder/queries
description: UI 구성 요소와 백엔드 작업을 연결하는 쿼리를 사용하여 Datadog API 및 통합의 데이터로 앱을 채우세요.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: 문서
  text: 앱 빌드하기
title: 쿼리
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder는 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

쿼리는 Datadog API 또는 지원되는 통합의 데이터로 앱을 채우는 작업입니다. 쿼리는 다른 쿼리나 UI 구성 요소에서 입력을 받아 다른 쿼리 또는 UI 구성 요소에서 사용할 출력을 반환합니다.

Datadog 앱 내의 [Action Catalog][10]는 App Builder를 사용하여 인프라 및 통합에 대해 쿼리로 수행할 수 있는 작업을 제공합니다. 클라우드 공급자, SaaS 도구 및 Datadog 계정에서 작업을 수행하는 액션을 연결하여 엔드투엔드 프로세스를 오케스트레이션하고 자동화할 수 있습니다.

쿼리를 추가하려면 데이터({{< ui >}}{&nbsp;}{{< /ui >}}) 아이콘을 클릭하여 데이터 탭을 여세요. 더하기({{< ui >}}\+{{< /ui >}})를 클릭하고 {{< ui >}}Actions{{< /ui >}}를 선택한 다음 'query'를 검색하여 앱에 추가할 액션을 찾으세요. 쿼리 작업을 추가하면 {{< ui >}}Actions{{< /ui >}} 목록에 나타납니다. 쿼리를 선택하여 구성하세요.

Bits AI를 사용하여 쿼리를 추가, 구성 및 트리거할 수도 있습니다. {{< ui >}}Build with AI{{< /ui >}} 아이콘(**<i class="icon-bits-ai"></i>**)을 클릭하여 시작하세요. 

쿼리는 인증을 위해 [연결][5]을 사용합니다. App Builder는 [Workflow Automation][6]과 연결을 공유합니다.

##  Run settings {#run-settings}

{{< ui >}}Run Settings{{< /ui >}}는 쿼리가 실행되는 시점을 결정합니다. 두 가지 옵션이 있습니다.

- {{< ui >}}Auto{{< /ui >}}: 앱이 로드될 때와 쿼리 인수가 변경될 때마다 쿼리가 실행됩니다.
- {{< ui >}}Manual{{< /ui >}}: 앱의 다른 부분이 쿼리를 트리거할 때 쿼리가 실행됩니다. 예를 들어, 사용자가 UI 버튼 구성 요소를 클릭할 때만 쿼리를 실행하려면 수동 트리거를 사용하세요. 이벤트 트리거에 대한 자세한 내용은 [이벤트][11]를 참조하세요.

## 고급 쿼리 옵션 {#advanced-query-options}

### 디바운스 {#debounce}

디바운스를 구성하면 사용자 입력당 쿼리가 한 번만 트리거됩니다. 기본적으로 디바운스는 `0`밀리초(ms)로 설정되어 있습니다. 쿼리가 너무 자주 호출되지 않도록 디바운스를 늘리세요. 쿼리의 {{< ui >}}Advanced{{< /ui >}} 섹션에서 디바운스를 구성하세요.

### 조건부 쿼리 {#conditional-queries}

쿼리가 실행되기 전에 충족되어야 하는 조건을 설정할 수 있습니다. 쿼리의 {{< ui >}}Advanced{{< /ui >}} 섹션에 있는 {{< ui >}}Condition{{< /ui >}} 필드에 표현식을 입력하여 쿼리 조건을 설정하세요. 쿼리가 실행되려면 이 조건의 평가 결과가 true여야 합니다. 예를 들어, `select0`이라는 UI 구성 요소가 존재하고 비어 있지 않은 경우에만 특정 쿼리를 실행하려면 다음 표현식을 사용하세요.

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

### 쿼리 후 변환 {#post-query-transformation}

쿼리 출력을 단순화하거나 변환하려면 쿼리 후 변환을 수행하세요. 쿼리의 {{< ui >}}Advanced{{< /ui >}} 섹션에 쿼리 후 변환을 추가하세요.

예를 들어, Slack _List Channels_ 액션은 각 채널의 ID와 이름이 포함된 사전 배열을 반환합니다. ID를 제외하고 이름 배열만 반환하려면 다음 쿼리 변환을 추가하세요.

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Apply transformations to the raw query output
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

### 쿼리 후 후크 {#post-query-hooks}

UI 구성 요소 이벤트와 마찬가지로 쿼리 실행 후 리액션이 트리거되도록 구성할 수 있습니다. 쿼리 후 후크는 UI 구성 요소 상태를 설정하거나, 모달을 열거나 닫거나, 다른 쿼리를 트리거하거나, 사용자 지정 JavaScript를 실행할 수도 있습니다. 예를 들어, [ECS Task Balancer][7] 블루프린트의 `scaleService` 쿼리는 쿼리 후 후크를 사용하여 실행이 완료된 후 `describeService` 쿼리를 다시 실행합니다.

쿼리 후 후크에서 [상태 함수][12]를 사용할 수 있습니다.

### 오류 알림 {#error-notifications}

시스템에서 오류를 반환할 때 사용자에게 토스트(짧은 알림 메시지)를 표시하려면 쿼리의 {{< ui >}}Advanced{{< /ui >}} 섹션에서 {{< ui >}}Show Toast on Errors{{< /ui >}}를 토글하세요.

### 확인 프롬프트 {#confirmation-prompts}

쿼리를 실행하기 전에 사용자에게 확인을 요청하려면 쿼리의 {{< ui >}}Advanced{{< /ui >}} 섹션에서 {{< ui >}}Requires Confirmation{{< /ui >}} 옵션을 토글하세요.

### 폴링 간격 {#polling-intervals}

앱이 화면에 열려 있는 동안 일정한 간격으로 쿼리를 반복 실행하려면 쿼리의 {{< ui >}}Advanced{{< /ui >}} 섹션에서 {{< ui >}}Polling interval{{< /ui >}}에 간격을 밀리초(ms) 단위로 입력하세요.

**참고**: 쿼리는 백그라운드에서 실행되지 않으며 앱이 열려 있을 때만 실행됩니다.

## 모의 출력 {#mocked-outputs}

에디터에서 앱을 빌드하거나 테스트할 때 실제 쿼리나 동일한 쿼리를 반복해서 실행하지 않으려는 경우가 있습니다. {{< ui >}}Mocked outputs{{< /ui >}}를 활성화한 후 쿼리를 실행하면 App Builder는 쿼리 액션을 실행하는 대신 모의 데이터로 출력을 채웁니다.

이전 쿼리 실행에서 모의 출력을 생성하거나 수동으로 제공할 수 있습니다.

### 이전 실행에서 출력 생성 {#generate-outputs-from-previous-run}

이전 쿼리 실행을 바탕으로 모의 출력 데이터를 생성하려면 다음 단계를 따르세요.

1. 쿼리를 추가하고 나머지 쿼리 파라미터를 입력합니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭하여 쿼리를 한 번 실행합니다.
1. 쿼리의 {{< ui >}}Mocked outputs{{< /ui >}} 섹션에서 {{< ui >}}Generate{{< /ui >}} 탭을 클릭합니다.
1. {{< ui >}}Generate from outputs{{< /ui >}}를 클릭합니다. 이렇게 하면 {{< ui >}}Use Mocked Outputs{{< /ui >}}가 자동으로 켜집니다.<br>
    {{< ui >}}Run{{< /ui >}} 버튼이 {{< ui >}}Run (Mocked){{< /ui >}}으로 변경되며, 다음에 쿼리를 실행할 때 출력이 모의 데이터로 채워집니다.

### 수동으로 출력 제공 {#provide-outputs-manually}

모의 출력을 수동으로 제공하려면 다음 단계를 따르세요.

{{% collapse-content title="GUI 사용" level="p" %}}
1. 쿼리를 추가하고 나머지 쿼리 파라미터를 입력합니다.
1. 쿼리의 {{< ui >}}Mocked outputs{{< /ui >}} 섹션에서 {{< ui >}}GUI{{< /ui >}} 탭을 클릭합니다.
1. GUI 보기에 자동으로 표시되는 모든 필수 필드를 입력합니다.
1. 필요시 추가 필드를 추가하려면 ({{< ui >}}\+{{< /ui >}})를 클릭합니다. 드롭다운에서 키를 선택하고 값을 입력합니다. 객체 또는 배열 값을 입력하려면 {{< ui >}}Enter value{{< /ui >}} 필드 뒤에 있는 {{< ui >}}{}{{< /ui >}} 또는 {{< ui >}}[]{{< /ui >}}를 각각 클릭합니다.
{{% /collapse-content %}}

{{% collapse-content title="JSON 사용" level="p" %}}
1. 쿼리를 추가하고 나머지 쿼리 파라미터를 입력합니다.
1. 쿼리의 {{< ui >}}Mocked outputs{{< /ui >}} 섹션에서 {{< ui >}}JSON{{< /ui >}} 탭을 클릭합니다.
1. 쿼리의 예상 출력 형식과 일치하는 JSON을 붙여넣습니다.<br>
    예상 출력 형식을 모르는 경우 쿼리를 한 번 실행한 다음 쿼리의 {{< ui >}}Inspect Data{{< /ui >}} 섹션에서 `outputs`를 참조할 수 있습니다.
{{% /collapse-content %}}


## 작업 순서 {#order-of-operations}

쿼리를 실행할 때 App Builder는 다음 단계를 나열된 순서대로 수행합니다.

1. 쿼리에 대한 {{< ui >}}Condition{{< /ui >}} 표현식이 있는지 확인하고, 있는 경우 조건이 충족되는지 확인합니다. 조건이 충족되지 않으면 실행이 중지됩니다.
2. 쿼리에 대한 입력 데이터를 결정하기 위해 {{< ui >}}Inputs{{< /ui >}}의 모든 표현식을 평가합니다.
3. {{< ui >}}Debounce{{< /ui >}} 속성이 설정된 경우, 디바운스 값으로 정의된 간격만큼 실행을 지연합니다. 이 시간 동안 쿼리 입력이나 해당 종속성이 업데이트되면 현재 쿼리 실행이 중지되고 업데이트된 입력을 사용하여 처음부터 새 실행이 시작됩니다.<br>
   **참고**: 디바운스 간격 내에 둘 이상의 쿼리 요청이 발생하면 마지막 실행 요청을 제외한 모든 요청이 취소됩니다.
4. 쿼리를 실행합니다.
5. 원시 쿼리 응답을 `query.rawOutputs`에 저장합니다.
6. 쿼리 후 변환을 실행하고 `query.outputs`를 그 결과로 설정합니다. 이 프로세스는 앱 데이터의 스냅샷을 생성하여 쿼리 후 변환에 전달합니다.<br>
   **참고**: 쿼리 후 변환은 부작용이 없는 순수 함수여야 합니다. 예를 들어, 쿼리 후 변환에서 상태 변수를 업데이트하지 마세요.
7. 쿼리 출력 데이터에 의존하는 앱의 모든 표현식을 계산합니다.
8. 앱의 {{< ui >}}Events{{< /ui >}}에 있는 모든 {{< ui >}}Reactions{{< /ui >}}를 UI에 정의된 순서대로 실행합니다. 여기에는 리액션 실행 전반에 걸쳐 사용되는 앱의 스냅샷을 생성하는 과정이 포함됩니다. 각 리액션이 실행되기 전에 새로운 스냅샷이 생성되며, 이전 리액션에 의해 변경된 사항은 후속 리액션에서 확인할 수 있습니다.
9. {{< ui >}}Polling interval{{< /ui >}}이 설정되어 있으면 지정된 밀리초 후 쿼리가 다시 실행되도록 예약합니다.


## 예시 앱{#example-apps}

### 워크플로 결과를 앱으로 반환 {#return-workflow-results-to-an-app}
App Builder 쿼리는 Workflow Automation 워크플로를 트리거할 수 있습니다. 앱은 해당 워크플로의 결과를 사용할 수 있습니다.

이 앱은 워크플로를 트리거하는 버튼을 제공합니다. 워크플로는 Slack 채널로 설문조사를 보내 사용자에게 두 가지 옵션 중 하나를 선택하도록 요청합니다. 사용자가 선택한 옵션에 따라 워크플로는 두 가지 다른 HTTP GET 요청 중 하나를 발행하며, 그 결과로 반환된 데이터가 앱에 표시됩니다.

{{< img src="actions/app_builder/workflow-trigger-from-app.mp4" alt="Trigger Workflow를 클릭하면 Slack에서 설문조사를 실시한 후 고양이 또는 강아지에 관한 무작위 정보를 반환합니다." video="true" width="70%">}}

{{% collapse-content title="앱 빌드" level="h4" %}}

##### 워크플로 생성 {#create-workflow}

1. 새 워크플로 캔버스의 {{< ui >}}Datadog Triggers{{< /ui >}} 아래에서 {{< ui >}}App{{< /ui >}}을 클릭합니다.
1. {{< ui >}}App{{< /ui >}} 트리거 단계 아래에서 플러스({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭한 다음 'Make a decision'을 검색하고 {{< ui >}}Make a decision{{< /ui >}} Slack 액션을 선택합니다.
1. 작업 공간을 선택하고 설문조사를 보낼 채널을 선택합니다.
1. 프롬프트 텍스트에 'Cat fact or dog fact?'를 입력합니다. 그리고 버튼 선택 항목을 'Cat fact'와 'Dog fact'로 변경합니다.
1. 캔버스의 {{< ui >}}Make a decision{{< /ui >}} 단계 아래에서 {{< ui >}}Cat fact{{< /ui >}} 위의 플러스({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭하고 {{< ui >}}Make request{{< /ui >}} HTTP 액션을 추가합니다.
1. 단계 이름을 'Get cat fact'로 지정합니다. {{< ui >}}Inputs{{< /ui >}} 아래의 {{< ui >}}URL{{< /ui >}}에서 {{< ui >}}GET{{< /ui >}}를 선택한 상태로 유지하고 URL `https://catfact.ninja/fact`를 입력합니다.
1. 캔버스의 {{< ui >}}Make a decision{{< /ui >}} 단계 아래에서 {{< ui >}}Dog fact{{< /ui >}} 위의 플러스({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭합니다. 동일한 단계를 따라 {{< ui >}}Make request{{< /ui >}} HTTP 액션을 추가하되 이번에는 단계 이름을 'Get dog fact'로 지정하고 다음 파라미터를 사용합니다.
    * {{< ui >}}URL{{< /ui >}}: `https://dogapi.dog/api/v2/facts`.
    * {{< ui >}}Request Headers{{< /ui >}}: `application/json`의 `Content-Type`
1. cat fact 단계 아래의 플러스({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭합니다. 'Function'을 검색하고 {{< ui >}}Function{{< /ui >}} 데이터 변환 단계를 선택합니다.
1. dog fact 단계 아래의 플러스({{< ui >}}\+{{< /ui >}}) 아이콘에서 JS Function 단계 위에 표시되는 점까지 클릭하여 드래그해 이 {{< ui >}}JS Function{{< /ui >}} 단계에 연결합니다.
1. JS Function의 {{< ui >}}Configure{{< /ui >}} 아래에 있는 {{< ui >}}Script{{< /ui >}}에 다음 코드 스니펫을 사용합니다.
    ```javascript
    const catFact = $.Steps.Get_cat_fact?.body?.fact;
    const dogFactRaw = $.Steps.Get_dog_fact?.body;

    let dogFact;

    try {
        const parsedDogFact = JSON.parse(dogFactRaw);
        dogFact = parsedDogFact.data?.[0]?.attributes?.body;
    } catch {
        // Do nothing
    }

    return catFact != null ? catFact : dogFact;
    ```
1. 워크플로 개요의 {{< ui >}}Output Parameters{{< /ui >}} 아래에 이름이 `output`이고 값이 `인 파라미터를 추가합니다.{{ Steps.Function.data }}` and the Data Type `string`.
1. 워크플로 이름을 'My AB Workflow'로 지정한 다음 워크플로를 저장하고 게시합니다.

##### 앱 생성 {#create-app}

App Builder를 워크플로에 연결하려면 다음 단계를 따르세요.

1. 앱에서 Data({{< ui >}}{&nbsp;}{{< /ui >}}) 아이콘을 클릭하고 플러스({{< ui >}}\+{{< /ui >}})를 클릭한 다음 {{< ui >}}Query{{< /ui >}}를 선택합니다.
1. 'Trigger Workflow'를 검색하고 {{< ui >}}Trigger Workflow{{< /ui >}} Datadog Workflow Automation 항목을 선택합니다.
1. {{< ui >}}Run Settings{{< /ui >}}를 Manual로 설정하고 쿼리 이름을 `triggerWorkflow0`으로 지정합니다.
1. {{< ui >}}Inputs{{< /ui >}} 아래의 {{< ui >}}App Workflow{{< /ui >}}에서 {{< ui >}}My AB Workflow{{< /ui >}}를 선택합니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭하여 워크플로를 실행한 다음 Slack 채널로 이동하여 설문 질문에 답합니다. 이렇게 하면 App Builder에 표시할 예시 데이터가 제공됩니다.
1. 텍스트 구성 요소를 추가합니다. {{< ui >}}Content{{< /ui >}} 아래에 표현식 `${triggerWorkflow0?.outputs?.workflowOutputs?.output}`을 입력합니다.
1. 버튼 구성 요소를 추가합니다. 다음 값을 사용하세요.
    * {{< ui >}}Label{{< /ui >}}: 'Trigger Workflow'
    * {{< ui >}}Is Loading{{< /ui >}}: `${triggerWorkflow0.isLoading}` (표현식을 입력하려면 {{< ui >}}</>{{< /ui >}}를 클릭하세요.)
1. 버튼의 {{< ui >}}Events{{< /ui >}} 아래에서 플러스({{< ui >}}\+{{< /ui >}})를 클릭하여 이벤트를 추가합니다. 다음 값을 사용하세요.
    * {{< ui >}}Event{{< /ui >}}: click
    * {{< ui >}}Reaction{{< /ui >}}: Trigger Query
    * {{< ui >}}Query{{< /ui >}}: `triggerWorkflow0`
1. 앱을 저장합니다.

##### 앱 테스트 {#test-app}

1. 앱에서 {{< ui >}}Preview{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Trigger Workflow{{< /ui >}} 버튼을 클릭합니다.
1. 선택한 Slack 채널에서 설문 질문에 답합니다.<br>
    앱에 선택한 옵션과 관련된 결과가 표시됩니다.
{{% /collapse-content %}}

### 쿼리 출력 데이터 결합 및 변환 {#combine-and-transform-query-output-data}
App Builder에서 쿼리로부터 데이터를 가져온 후, 데이터 변환기를 사용하여 해당 데이터를 결합하고 변환할 수 있습니다.

이 앱은 API에서 두 숫자에 관한 정보를 가져오는 버튼을 제공합니다. 그런 다음 데이터 변환기를 사용하여 두 숫자의 합계를 계산하고 표시합니다.

{{< img src="actions/app_builder/data-transformer.mp4" alt="각 버튼을 클릭하면 새로운 숫자 정보가 표시되며 두 숫자의 합계도 함께 업데이트됩니다." video="true" width="70%">}}

{{% collapse-content title="앱 빌드" level="h4" %}}

##### 쿼리 생성 {#create-queries}

1. 새 앱에서 Data({{< ui >}}{&nbsp;}{{< /ui >}}) 아이콘을 클릭하여 Data 탭을 엽니다.
1. 플러스({{< ui >}}\+{{< /ui >}})를 클릭한 다음 {{< ui >}}Query{{< /ui >}}를 선택합니다. 'Make request'를 검색하고 {{< ui >}}HTTP Make request{{< /ui >}} 액션을 선택합니다.
1. 다음 값을 사용합니다.
    * {{< ui >}}Name{{< /ui >}}: `mathFact1`
    * {{< ui >}}Inputs{{< /ui >}} 아래의 {{< ui >}}URL{{< /ui >}}에 GET `http://numbersapi.com/random/trivia`를 입력합니다.
1. ({{< ui >}}\+{{< /ui >}})를 클릭하여 다른 {{< ui >}}HTTP Make request{{< /ui >}} 쿼리를 추가합니다. 다음 값을 사용하세요.
    * {{< ui >}}Name{{< /ui >}}: `mathFact2`
    * {{< ui >}}Inputs{{< /ui >}} 아래의 {{< ui >}}URL{{< /ui >}}에 GET `http://numbersapi.com/random/trivia`를 입력합니다.

##### 데이터 변환기 추가 {#add-data-transformer}

1. {{< ui >}}Σ{{< /ui >}}(시그마)를 클릭하여 {{< ui >}}Transformers{{< /ui >}} 패널을 엽니다.
1. {{< ui >}}\+ Create Transformer{{< /ui >}}를 클릭합니다.
1. 변환기 이름을 `numberTransformer`로 지정합니다. {{< ui >}}Inputs{{< /ui >}} 아래의 {{< ui >}}function () {{{< /ui >}}에 다음을 입력합니다.
    ```javascript
    // get both random facts
    const fact1 = mathFact1.outputs.body;
    const fact2 = mathFact2.outputs.body;

    // parse the facts to get the first number that appears in them
    const num1 = fact1.match(/\d+/)[0];
    const num2 = fact2.match(/\d+/)[0];

    // complete arithmetic on the numbers to find the sum
    const numSum = Number(num1) + Number(num2)

    return numSum
    ```

##### 앱 캔버스 구성 요소 생성 {#create-app-canvas-components}

1. 앱 캔버스에 버튼을 추가하고 레이블에 'Generate fact 1'을 입력합니다.
1. 버튼의 {{< ui >}}Events{{< /ui >}} 아래에서 다음 값을 사용합니다.
    * {{< ui >}}Event{{< /ui >}}: click
    * {{< ui >}}Reaction{{< /ui >}}: Trigger Query
    * {{< ui >}}Query{{< /ui >}}: mathFact1
1. 다른 버튼을 추가하고 레이블에 'Generate fact 2'를 입력합니다.
1. 버튼의 {{< ui >}}Events{{< /ui >}} 아래에서 다음 값을 사용합니다.
    * {{< ui >}}Event{{< /ui >}}: click
    * {{< ui >}}Reaction{{< /ui >}}: Trigger Query
    * {{< ui >}}Query{{< /ui >}}: mathFact2
1. 첫 번째 버튼 아래에 텍스트 요소를 추가합니다. {{< ui >}}Content{{< /ui >}} 속성에서 {{< ui >}}</>{{< /ui >}}를 클릭하고 표현식 `${mathFact1.outputs.body}`를 입력합니다.
1. 두 번째 버튼 아래에 텍스트 요소를 추가합니다. {{< ui >}}Content{{< /ui >}} 속성에서 {{< ui >}}</>{{< /ui >}}를 클릭하고 표현식 `${mathFact2.outputs.body}`를 입력합니다.
1. {{< ui >}}Content{{< /ui >}} 값이 'Sum of numbers'인 텍스트 요소를 추가합니다.
1. 그 옆에 텍스트 요소를 추가합니다. {{< ui >}}Content{{< /ui >}} 속성에서 {{< ui >}}</>{{< /ui >}}를 클릭하고 표현식 `${numberTransformer.outputs}`를 사용합니다.


##### 앱 테스트 {#test-app-1}

1. 앱에서 {{< ui >}}Preview{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Generate fact 1{{< /ui >}}을 클릭한 다음 {{< ui >}}Generate fact 2{{< /ui >}}를 클릭합니다.<br>
    각 버튼을 클릭하면 앱이 숫자 정보와 숫자의 합계를 업데이트합니다.

{{% /collapse-content %}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][8]의 {{< ui >}}#app-builder{{< /ui >}} 채널에 참여하세요.

[5]: /ko/actions/connections
[6]: /ko/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[10]: https://app.datadoghq.com/actions/action-catalog/
[11]: /ko/actions/app_builder/events
[12]: /ko/actions/app_builder/events/#state-functions