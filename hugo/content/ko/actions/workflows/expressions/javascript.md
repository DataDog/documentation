---
code_lang: javascript
code_lang_weight: 10
description: App Builder의 JavaScript 표현식 기능 및 제한 사항
title: JavaScript 표현식
type: multi-code-lang
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation은 선택한 Datadog 사이트({{< region-param key=dd_site_name >}})에서 미리보기로 제공됩니다.</div>
{{< /site-region >}}

JavaScript(JS)는 인라인 표현식을 사용하거나 전용 JS {{< ui >}}Function{{< /ui >}} 및 {{< ui >}}Expression{{< /ui >}} 작업을 통해 워크플로에서 사용할 수 있습니다.

## 인라인 JavaScript 표현식 {#inline-javascript-expressions}

전용 JS 단계를 포함할 필요 없이 워크플로 단계에서 직접 JS 표현식을 사용하여 광범위한 데이터 변환을 수행할 수 있습니다.

워크플로에서 인라인 표현식을 사용하려면 표현식을 `${}`로 묶으세요. 예를 들어, 문자열 ID(`Trigger.stringId`)를 정수로 변환하려면 `${ parseInt(Trigger.stringId) }`를 사용하세요.

[Lodash][1] 유틸리티 라이브러리는 인라인 표현식에서 사용할 수 있습니다. Lodash 밑줄 접두사(`_`)는 선택 사항입니다. 예를 들어, `${ _.toNumber("1") }` 및 `${ toNumber("1") }`은 둘 다 유효한 인라인 표현식입니다.

### 예시 {#examples}

#### 타임스탬프 검색 {#retrieve-a-timestamp}

다음 예시는 {{< ui >}}Get hosts total{{< /ui >}} 단계 내에서 Lodash `now()` 함수를 사용하여 지난 1분 동안의 호스트 수를 가져옵니다.

이 작업은 {{< ui >}}From{{< /ui >}} 필드에서 다음 인라인 표현식을 사용합니다.

```js
${ Math.floor(now() / 1000) - 60 }
```

{{< img src="/actions/workflows/expressions/javascript/timestamp.png" alt="now() Lodash 함수를 사용하는 인라인 표현식" style="width:90%;" >}}

#### 값 증가 {#increment-a-value}

다음 예시는 {{< ui >}}Set desired capacity{{< /ui >}} 단계 내에서 원하는 용량을 1만큼 증가시킵니다.

이 작업은 {{< ui >}}Desired capacity{{< /ui >}} 필드에서 다음 인라인 표현식을 사용합니다.

```js
${ Steps.Describe_auto_scaling_group.autoScalingGroup.DesiredCapacity + 1 }
```

{{< img src="/actions/workflows/expressions/javascript/increment.png" alt="원하는 용량을 1만큼 증가시키는 인라인 표현식" style="width:90%;" >}}

## JavaScript 표현식 작업 {#javascript-expression-actions}

[Expression](#expression-step) 및 [Function](#function-step) 작업은 JavaScript를 사용하여 워크플로 내에서 사용자 지정 데이터 변환을 수행합니다. 워크플로 내에서 사용 가능한 모든 컨텍스트 변수의 값을 `$.Steps.<step_name>.<variable>` 구문과 함께 JavaScript 표현식 및 함수의 입력으로 사용합니다.

이러한 작업에서 반환된 데이터는 이후 워크플로 단계에서 참조할 수 있습니다.

밑줄(`_`)을 사용하여 표현식 및 함수 단계에서 [Lodash][1]를 활용할 수 있습니다. 예를 들어, HTTP 요청 단계(`Make_request`)의 HTTP 요청 상태 변수(`status`)를 참조하려면 다음과 같은 컨텍스트 변수를 사용합니다.

```
$.Steps.Make_request.status
```

`Array_function`에서 반환된 배열에 `Bits`라는 이름이 포함되어 있는지 확인하려면 다음 구문을 사용하여 `_.includes` Lodash 함수를 적용하세요.

```
_.includes($.Steps.Array_function.data, "Bits")
```
### 함수 단계 {#function-step}

함수 작업을 사용하면 여러 표현식이 필요한 변수 할당 및 복잡한 데이터 변환을 수행할 수 있습니다.

함수 작업을 추가하려면 다음 단계를 수행하세요.
- 새 워크플로에서 {{< ui >}}Add step{{< /ui >}}을 클릭하고 `function`을 검색합니다. {{< ui >}}Function{{< /ui >}} 작업을 선택하여 워크플로에 추가합니다.
- 기존 워크플로에서 {{< ui >}}\+{{< /ui >}}를 클릭하고 `function`을 검색합니다. {{< ui >}}Function{{< /ui >}} 작업을 선택하여 워크플로에 추가합니다.

#### AI를 사용하여 함수 단계 작성{#write-function-steps-with-ai}

Bits AI를 사용하면 {{< ui >}}Function{{< /ui >}} 단계에 맞춘 JavaScript를 작성할 수 있습니다. 이 기능을 사용하려면 다음 단계를 수행하세요.

1. 워크플로에 {{< ui >}}Function{{< /ui >}} 단계를 추가합니다.
1.  {{< ui >}}General{{< /ui >}} 아래의 {{< ui >}}Script{{< /ui >}} 필드에서 {{< ui >}}<i class="icon-bits-ai"></i> Write with Bits AI{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Describe your transformation script{{< /ui >}} 필드에 스크립트가 수행할 작업에 대한 설명을 입력합니다. 위쪽 화살표({{< ui >}}↑{{< /ui >}})를 클릭하여 설명을 제출합니다.
1. {{< ui >}}Replace script{{< /ui >}}, {{< ui >}}Insert in script{{< /ui >}} 또는 {{< ui >}}Copy to clipboard{{< /ui >}}를 수행할 옵션을 선택합니다.
1. 스크립트를 검사하고 필요에 따라 변경합니다.

### 표현식 단계 {#expression-step}

대부분의 경우 전용 표현식 단계 대신 인라인 표현식을 사용합니다. 표현식 작업은 한 줄 코드를 허용합니다. 예: `[1, 2, 3].filter(x => x < 3)` 표현식에서는 변수 할당을 사용할 수 없습니다.

표현식 작업을 추가하려면 다음 단계를 수행하세요.
- 새 워크플로에서 {{< ui >}}Add step{{< /ui >}}을 클릭하고 `expression`을 검색합니다. {{< ui >}}Expression{{< /ui >}} 작업을 선택하여 워크플로에 추가합니다.
- 기존 워크플로에서 {{< ui >}}\+{{< /ui >}}를 클릭하고 `expression`을 검색합니다. {{< ui >}}Expression{{< /ui >}} 작업을 선택하여 워크플로에 추가합니다.

표현식 단계에서 실행 시에는 사용 가능한 모든 변수의 _복사본_이 사용됩니다. 단계 내에서 변수를 변경해도 단계 외부의 변수 값에는 영향을 주지 않습니다. 표현식의 결과를 변수에 할당하려면 [변수 및 파라미터][2]를 참조하세요.

## 표현식 및 함수 테스트 {#test-expressions-and-functions}

[워크플로 단계 테스트][3] 방법을 살펴보려면 테스트 및 디버그 페이지를 참조하세요.

[1]: https://lodash.com/
[2]: /ko/actions/workflows/variables/
[3]: /ko/actions/workflows/test_and_debug/#test-a-step