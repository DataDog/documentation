---
description: 브라우저 테스트 기록에서 단계를 자동으로 기록하고 수동으로 설정하는 방법을 알아보기
further_reading:
- link: /synthetics/browser_tests/advanced_options/
  tag: 설명서
  text: 브라우저 테스트를 위한 고급 옵션에 대해 알아보기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: 외부 사이트
  text: Terraform으로 Synthetic 글로벌 변수 생성 및 관리
kind: 설명서
title: 브라우저 테스팅 단계
---

## 개요

단계는 브라우저 테스트에서 기록하고 편집하거나 빌드할 수 있는 일련의 작업입니다. 브라우저 테스트에서 실행할 단계를 정의하려면 Datadog 테스트 레코더 확장 프로그램에서 직접 기록하거나 수동으로 추가하세요. 각 단계에는 설정 가능한 [고급 옵션][1] 세트가 포함됩니다.

각 단계의 기본 제한 시간은 60초입니다. 전용 [시간 초과 옵션][2]을 통해 이 기본 시간 초과를 재정의할 수 있습니다.

## 자동으로 기록된 단계

**Start Recording**을 클릭하면, [Datadog 브라우저 테스트 레코더 확장 프로그램][3]이 자동으로 웹사이트의 단계를 감지하고 기록합니다.

### 클릭

페이지의 요소와 상호 작용하면 단계가 기록됩니다.

{{< img src="synthetics/browser_tests/click_step.mp4" alt="Click type dropdown menu in the Click step type" video="true" width="60%" >}}

단계를 클릭하고 실행 타임에서 브라우저 테스트를 수행할 클릭 유형을 선택합니다:


* 왼쪽 클릭에 해당하는 기본 클릭
* 더블 클릭
* 오른쪽 클릭에 해당하는 컨텍스트 클릭

### 유형 텍스트

Datadog은 `select` 드롭다운 메뉴에서 옵션을 선택하는 것과 같이 애플리케이션에서 수행하는 단계를 기록하며, 요약 내용이 단계로 표시됩니다.

{{< img src="synthetics/browser_tests/input_text.mp4" alt="Browser Test Input Text Step" video="true" width="95%" >}}

### 옵션 선택

Datadog은 `select` 드롭다운 메뉴에서 옵션을 선택하는 것과 같이 애플리케이션에서 수행하는 단계를 기록하며, 요약 내용은 왼쪽 코너에서 단계로 나타납니다.

{{< img src="synthetics/browser_tests/select_options.png" alt="Select options step" style="width:70%;" >}}

### 업로드 파일

**Upload** 단계를 기록하려면, 다음 중 하나를 수행하세요:

* 브라우저에서 데스크탑을 여세요
* 기록할 iframe에 파일을 끌어다 놓으세요

Datadog은 업로드와 같이 애플리케이션에서 수행하는 단계를 기록하고, 요약 내용은 왼쪽 코너에 단계로 나타납니다. 최대 10개의 파일을 업로드할 수 있으며 각각 5MB의 제한이 있습니다.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Create an upload file step" style="width:70%;" >}}

## 수동으로 추가된 단계

브라우저 테스트 기록의 왼쪽 모서리에서 수동으로 단계를 추가하고 정렬할 수 있습니다.

### 어설션

어설션을 사용하면 브라우저 테스트가 시뮬레이션된 사용자 여정의 어느 시점에서나 예상되는 상태에 있는지 검증할 수 있습니다.

테스트가 예상되는 상태로 종료되는지 확인하려면 **어설션**으로 브라우저 테스트를 종료해야 합니다.

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Options for assertions in a browser test step" style="width:70%;" >}}

일부 어설션은 페이지 요소의 **클릭** 또는 **어설션**과 같이 사용자가 마지막으로 상호 작용한 페이지인 활성 페이지의 유효성을 검사합니다.

단계를 생성하려면, 어설션 유형을 선택합니다:

{{< tabs >}}
{{% tab "활성 페이지에서 요소 테스트" %}}

#### 요소의 콘텐츠를 테스트하기

이 어설션 단계를 생성하여 브라우저 테스트에서 페이지 요소를 선택하고 특정 값이 포함되어 있는지 확인합니다.

#### 요소의 속성을 테스트하기

이 어설션 단계를 생성하여 브라우저 테스트에서 페이지 요소를 선택하고 속성 중 하나가 예상 콘텐츠와 일치하는지 확인합니다.

#### 요소가 존재하는지 테스트하기

이 어설션 단계를 생성하면 브라우저 테스트에서 특정 `span`, `div`, `h`, `a` 등의 페이지 요소를 선택하여 페이지에 존재하는지 확인할 수 있습니다. 


브라우저 테스트가 올바른 요소를 타겟팅하도록 드롭다운 메뉴에서 `CSS` 또는 `XPath 1.0`을 선택하고 선택기를 추가하여 사용자 로케이터를 설정합니다. **Test**를 클릭합니다.


Datadog은 더 나은 정확도를 위해 위에 나열된 두 가지 어설션을 사용할 것을 권장합니다. 자세한 내용은 [고급 옵션][1]을 참조하세요.

[1]: /ko/synthetics/browser_tests/advanced_options#user-specified-locator
{{% /tab %}}
{{% tab "활성 페이지 콘텐츠 테스트" %}}

#### 일부 텍스트가 활성 페이지에 존재하지 않는지 테스트하기

이 어설션 단계를 생성하여 브라우저 테스트에서 `Value` 필드에 지정한 텍스트가 현재 기록 중인 페이지에 **없는지** 확인합니다.

#### 활성 페이지에 일부 텍스트가 존재하는지 테스트하기

이 어설션 단계를 생성하여 브라우저 테스트에서 `Value` 필드에 지정한 텍스트가 기록 중인 현재 페이지에 있는지 확인하도록 합니다.

#### 활성 페이지 URL의 콘텐츠를 테스트하기

이 어설션 단계를 생성하여 브라우저 테스트에서 마지막으로 상호 작용한 페이지의 URL에 지정한 값이 포함되어 있는지 확인하도록 합니다.

`string`, `number` 또는 `regex`와 같은 URL 값을 테스트할 수 있습니다.

{{% /tab %}}

{{% tab "특별한 어설션" %}}

#### 이메일이 수신되었는지 테스트하기

이 어설션 단계를 생성하여 브라우저 테스트에서 애플리케이션의 이메일 메커니즘이 작동하는지 확인하고 `string`, `number`, 또는 `regex` 등 지정한 값이 이메일 제목 또는 본문에 존재하는지 확인합니다.

자세한 내용은 [브라우저 테스트를 통한 이메일 검증][1]을 참조하세요.

#### 커스텀 JavaScript로 UI 테스트

이 어설션 단계를 생성하여 JavaScript 코드를 사용하여 활성 페이지에서 커스텀 어설션을 테스트합니다. JavaScript 어설션은 동기 및 비동기 코드를 모두 지원합니다. 브라우저 테스트는 페이지에 스크립트를 추가하여 외부 JavaScript를 로드하므로 웹사이트에서 외부 JavaScript를 허용하는 경우에만 작동합니다.

JavaScript 어설션 함수는 다음 파라미터와 함께 제공되며 반환문이 필요합니다.

* `return`(필수) 문은 테스트 단계가 성공하기 위해 어설션이 충족해야 하는 조건을 반영합니다. 모든 유형이 반환될 수 있지만, 값은 자동으로 부울로 캐스팅됩니다.

* `vars`(선택 사항): 브라우저 테스트의 [변수][2]를 포함하는 문자열입니다. JavaScript 스니펫에서 브라우저 테스트 변수를 참조하려면 `vars.<YOUR_VARIABLE>`를 사용하세요. 예를 들어, 브라우저 테스트에 `USERNAME` 변수가 포함된 경우 `vars.USERNAME`를 사용하여 JavaScript 스니펫에서 호출합니다.

* `element`  (선택 사항): 페이지의 요소 로케이터. 이를 설정하려면 **Select** 및 **Update** 대상 요소 버튼을 사용합니다. 선택한 요소는 Datadog 브라우저 테스트의 다중 배치 알고리즘을 자동으로 사용합니다.

{{< img src="synthetics/browser_tests/js_assertion.mp4" alt="Browser Test JavaScript Assertion" video="true" width="100%" >}}

JavaScript 어설션은 활성 페이지의 컨텍스트에서 실행되므로, 이러한 단계에서는 활성 페이지에 정의된 모든 개체(예: 라이브러리, 내장 및 글로벌 변수)에 액세스할 수 있습니다. 외부 라이브러리를 로드하려면 promise를 사용하세요.

예를 들면 다음과 같습니다.

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

#### 다운로드한 파일 테스트하기

이 어설션 단계를 생성하여 브라우저 테스트에서 이전 단계에서 다운로드한 파일을 확인하도록 합니다. 파일이 올바르게 다운로드되었는지 확인하고 파일 이름, 크기 및 MD5 값을 어설트할 수 있습니다.

다운로드를 테스트하는 방법에 대한 자세한 내용은 [테스트 파일 업로드 및 다운로드][3]를 참조하세요.

[1]: /ko/synthetics/guide/email-validation
[2]: /ko/synthetics/browser_tests/actions#use-variables
[3]: /ko/synthetics/guide/testing-file-upload-and-download/#testing-a-file-download
{{% /tab %}}
{{< /tabs >}}

### 내비게이션

{{< img src="synthetics/browser_tests/navigation_step.png" alt="Choose between three navigation types in a browser test recording" style="width:60%;" >}}

#### 페이지 새로 고침

브라우저 테스트가 기록의 현재 페이지를 새로 고치도록 하려면 이 내비게이션 단계를 생성하세요.

#### 이메일로 이동하여 링크를 클릭

[이메일 변수를 생성][4]한 후에는 이 내비게이션 단계를 만들어 브라우저 테스트에서 고유한 Synthetic 메일 받은 편지함에 액세스하도록 합니다.

브라우저 테스트에서 클릭할 이메일과 링크를 선택하세요. 이 단계에서는 해당 페이지로 이동하며 해당 페이지에서 나머지 여정을 계속 진행할 수 있습니다.

#### 특정 링크 따라가기

이 내비게이션 단계를 만들어 브라우저 테스트가 특정 페이지로 이동하도록 합니다. **Enter link URL** 상자에서 URL 앞에 `http` 또는 `https`를 추가해야 합니다.

### 특별 조치

[Datadog 브라우저 테스트 레코더 확장 프로그램][3]을 사용하여 사용자 여정과 관련된 대부분의 단계를 기록하고 모니터링할 수 있습니다. 그러나 확장 프로그램은 **Hover**, **Press Key**, **Scroll** 및 **Wait**와 같은 일부 단계를 자동으로 기록하지 않습니다.

**Special Actions**를 클릭하고 작업 유형을 선택하여 이 어설션 단계를 수동으로 생성합니다.

#### 커서 올리기

이 단계에서는 호버링 메커니즘이 아닌 전용 클릭을 사용하여, 기록 중에 사용자가 요소 위로 마우스를 가져갈 때마다 별도의 단계가 생성되지 않도록 합니다.

**Hover**를 선택하고 요소를 클릭하여 단계를 추가합니다.

#### 키 누르기

**Press Key** 단계를 추가하여 사용자가 키 입력을 입력하는 것을 시뮬레이션합니다. [Datadog 브라우저 테스트 레코더 확장 프로그램][3]은 다음 키를 기록할 수 있습니다:

* Enter
* 화살표 (상, 하, 좌, 우)
* Tab (양식 외부)
* Escape
* Backspace

자동으로 기록되지 않는 키를 누르려면, **Value** 필드에 눌러야 하는 값을 지정합니다.

`Alt`, `Control`, `Meta`, `Shift` 모디파이어를 선택하여 입력된 값에 추가합니다.

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Press Key step in a browser test recording" style="width:50%;" >}}

#### 스크롤

브라우저 테스트는 상호 작용해야 하는 요소로 자동으로 스크롤합니다. 대부분의 경우 스크롤 단계를 수동으로 추가할 필요가 없습니다. 무한 스크롤과 같은 추가 상호 작용을 트리거해야 하는 경우 스크롤 단계를 사용합니다.

브라우저 테스트에서 세로 및 가로로 스크롤할 픽셀 수를 지정합니다.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Scroll step in a browser test recording Test Scroll Step" style="width:50%;" >}}

기본적으로 **Scroll** 단계는 전체 페이지를 스크롤합니다. 특정 요소 (예: 특정 `<div>`)를 스크롤해야 하는 경우, **Target Element**를 클릭하고 브라우저 테스트에서 스크롤할 요소를 선택합니다.

#### 대기

기본적으로 브라우저 테스트는 60초의 제한 시간을 두고 단계 또는 다음 단계를 수행하기 전에 페이지가 완전히 로드될 때까지 기다립니다.

페이지 또는 페이지 요소를 로드하는 데 60초 이상 걸리는 경우, 단계의 [고급 옵션][2]에서 시간 제한을 사용자 지정하거나 최대값이 300초인 하드코딩된 대기 단계를 추가할 수 있습니다.

{{< img src="synthetics/browser_tests/browser_test_wait_step.png" alt="Wait step in a browser test recording" style="width:50%;" >}}

이 추가 시간은 브라우저 테스트 기록의 **모든 실행**에 체계적으로 추가됩니다.

### 변수

**Variables**를 클릭하고 드롭다운 메뉴에서 변수 생성 유형을 선택합니다.

{{< img src="synthetics/browser_tests/variables.png" alt="Browser Test Variables" style="width:60%;" >}}

단계 내에서 변수를 사용하는 방법을 알아보려면 [변수 사용](#use-variables)을 참조하세요.

#### 패턴

사용 가능한 내장 기능 중 하나를 선택할 수 있습니다:

`{{ numeric(n) }}`
: `n` 자리 숫자 문자열을 생성합니다.

`{{ alphabetic(n) }}`
: `n` 문자로 알파벳 문자열을 생성합니다.

`{{ alphanumeric(n) }}`
: `n` 문자로 영숫자 문자열을 생성합니다.

`{{ date(n unit, format) }}`
: 테스트가 시작된 UTC 날짜에 해당하는 값을 + 또는 - `n` 단위로 사용하여 Datadog에서 허용되는 형식 중 하나로 날짜를 생성합니다.

`{{ timestamp(n, unit) }}`
: 테스트가 + 또는 - `n` 단위로 시작되는 UTC 타임스탬프에 해당하는 값으로 Datadog의 허용 단위 중 하나로 타임스탬프를 생성합니다.

`{{ uuid }}`
: 버전 4 범용 고유 식별자 (UUID)를 생성합니다.

테스트 결과에서 로컬 변수 값을 명시하지 않으려면 **Hide and obfuscate variable value**를 선택합니다. 변수 문자열을 정의한 후 **Add Variable**를 클릭합니다.

#### 요소

요소의 텍스트를 추출하여 `span` 또는 `div`과 같은 콘텐츠에서 변수를 생성합니다.

#### 이메일 본문

다음 방법 중 하나([`regex`][13] 또는 [`Xpath`][12])를 사용해 이메일 본문에서 변수를 생성합니다.

* [`Regex`][13]는 이메일의 일반 텍스트 본문에서 첫 번째 일치 패턴을 검색하고 반환합니다(예: `/*./`). 패턴을 발견할 수 없는 경우 HTML 본문을 검색합니다.

* [`Xpath`][12]는 이메일이 HTML 본문을 포함할 때만 적용 가능합니다. 해당하는 위치의 콘텐츠를 반환합니다(예: `$`).

#### JavaScript

JavaScript 단계는 동기 및 비동기 코드를 모두 지원합니다. 브라우저 테스트는 페이지에 스크립트를 추가하여 외부 JavaScript를 로드하기 때문에, 웹사이트가 외부 JavaScript를 허용하는 경우에만 작동합니다.

JavaScript 함수는 다음 파라미터와 함께 제공되며 반환문이 필요합니다.

* `return` (필수) 문은 JavaScript 변수와 연결하려는 값을 반환합니다. 이 문은 모든 유형을 반환할 수 있지만 자동으로 값을 문자열로 캐스팅합니다.

* `vars` (선택 사항): 코드 내에서 사용할 수 있는 브라우저 테스트의 [변수](#use-variables)를 포함하는 문자열입니다. JavaScript 스니펫에서 브라우저 테스트 변수를 참조하려면 `vars.<YOUR_VARIABLE>`를 사용하세요. 예를 들어 브라우저 테스트에 이미 `PRICE` 변수가 있는 경우, `vars.PRICE`를 사용하여 JavaScript 스니펫에서 호출합니다.

* `element`  (선택 사항): 페이지의 요소 로케이터. 이를 설정하려면 **Select** 및 **Update** 대상 요소 버튼을 사용합니다. 선택한 요소는 Datadog 브라우저 테스트의 다중 배치 알고리즘을 자동으로 사용합니다.

{{< img src="synthetics/browser_tests/js_variable.mp4" alt="Browser Test JavaScript Variable" video="true" width="100%" >}}

JavaScript 어설션은 활성 페이지의 컨텍스트에서 실행되므로, 이러한 단계에서는 활성 페이지에 정의된 모든 개체(예: 라이브러리, 내장 및 글로벌 변수)에 액세스할 수 있습니다. 외부 라이브러리를 로드하려면 promise를 사용하세요.

예시:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

#### 글로벌 변수

[Synthetic Monitoring 설정][5]에 정의된 글로벌 변수를 선택합니다.

#### 글로벌 변수 - MFA

[Synthetic Monitoring 설정][5]에 정의된 MFA 글로벌 변수를 선택합니다.

이 유형의 글로벌 변수는 시간 기반 일회용 암호(TOTP) 비밀 키를 저장하여 MFA 모듈 및 MFA로 보호되는 워크플로를 테스트할 수 있습니다. 자세한 내용은 [브라우저 테스트에서 멀티 팩터 인증(MFA)용 TOTP][6]를 참조하세요.

#### 이메일

테스트 단계에서 [이메일이 올바르게 전송되었는지 확인][7] 또는 [이메일의 링크로 이동][8]하여 확인 링크를 클릭하는 데 사용할 수 있는 Datadog Synthetics 이메일 주소를 생성합니다.

테스트 실행 간의 충돌을 방지하기 위해 각 테스트 실행 시 고유한 메일함이 생성됩니다.

### 하위 테스트

브라우저 테스트를 다른 브라우저 테스트에서 실행하면 기존 워크플로를 최대 2개 계층까지 중첩하여 재사용할 수 있습니다.

기존 브라우저 테스트를 하위 테스트로 사용하려면, **Add New Subtest**를 클릭하고, **From Existing Test** 탭 아래의 드롭다운 메뉴에서 브라우저 테스트를 선택한 다음, **Add Subtest**를 클릭합니다.

현재 브라우저 테스트의 단계를 하위 테스트로 변환하려면 **Extract From Steps** 탭을 클릭하고 추출하려는 기록된 단계를 선택한 다음  **Convert to Subtest**을 클릭합니다. 기본적으로 하위 테스트는 상위 테스트의 이전 단계와 함께 순서대로 실행됩니다.

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Add a subtest in a browser test" style="width:60%;" >}}

상위 테스트에서 하위 테스트의 변수를 재정의하려면 상위 테스트 레벨에서 생성된 변수의 이름이 하위 테스트에 있는 변수와 동일한지 확인하세요. 변수는 항상 처음에 할당된 값을 사용합니다.

하위 테스트의 고급 옵션에 대한 자세한 내용은 [브라우저 테스트 단계를 위한 고급 옵션][9]을 참조하세요.

하위 테스트를 독립적으로 실행하는 것이 적합하지 않은 경우 일시 중지할 수 있습니다. 테스트는 상위 테스트의 일부로 계속 호출되며 개별적으로 실행되지 않습니다. 자세한 내용은 [테스트 스위트에서 브라우저 테스트 여정 재사용][10]을 참조하세요.

### HTTP 요청

브라우저 테스트의 일부로 HTTP 요청을 실행할 수 있습니다.

{{< img src="synthetics/browser_tests/recorder_http_requests2.png" alt="HTTP Request step" style="width:70%;" >}}

#### 설정

HTTP 요청을 정의하려면:

1. 쿼리할 **Method** 및 **URL**을 선택합니다. `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, 그리고 `OPTIONS` 중에서 선택합니다.
2. 필요시 **Advanced Options**을 지정합니다:

   {{< tabs >}}

   {{% tab "요청 옵션" %}}

   * **Follow redirects**: 요청을 수행할 때 HTTP 테스트가 최대 10개의 리디렉션을 따르도록 하려면 체크 표시합니다.
   * **Ignore server certificate error**: SSL 인증서의 유효성을 검사할 때 오류가 발생하더라도 연결을 통해 HTTP 테스트를 계속하려면 체크 표시합니다.
   * **Request headers**: HTTP 요청에 추가할 헤더를 정의합니다. 기본 헤더(예: `user-agent` 헤더)를 재정의할 수도 있습니다.
   * **Cookies**: HTTP 요청에 추가할 쿠키를 정의합니다. `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>` 형식을 사용하여 여러 쿠키를 설정합니다.

   {{% /tab %}}

   {{% tab "인증" %}}

   * **Client certificate**: 클라이언트 인증서 및 연결된 프라이빗 키를 업로드하여 mTLS를 통해 인증합니다.
   * **HTTP Basic Auth**: HTTP 기본 인증 자격 증명을 추가합니다.
   * **Digest Auth**: Digest 인증 자격 증명을 추가합니다.
   * **NTLM**: NTLM 인증 자격 증명을 추가합니다. NTLMv2와 NTLMv1을 모두 지원합니다.

   {{% /tab %}}

   {{% tab "쿼리 파라미터" %}}

   * **Encode parameters**: 인코딩이 필요한 쿼리 파라미터의 이름과 값을 추가합니다.

   {{< /tabs >}}

   {{% tab "요청 본문" %}}

   * **Body type**: HTTP 요청에 추가하려는 요청 본문 유형(`text/plain`, `application/json`,`text/xml` ,`text/html` ,`application/x-www-form-urlencoded`, `GraphQL` 또는 `None`)을 선택합니다.
   * **Request body**: HTTP 요청 본문의 내용을 추가합니다. 요청 본문의 최대 크기는 50KB로 제한됩니다.

   {{< /tabs >}}

   {{% tab "프록시" %}}

   * **Proxy URL**: HTTP 요청이 통과해야 하는 프록시의 URL을 지정합니다(`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy Header**: 프록시에 대한 HTTP 요청에 포함할 헤더를 추가합니다.

   {{% /tab %}}

   {{% tab "프라이버시" %}}

   * **Do not save response body**: 응답 본문이 런타임에 저장되지 않도록 하려면 이 옵션을 선택하세요. 이렇게 하면 테스트 결과에 민감한 데이터가 표시되지 않도록 하는 데 도움이 되지만, 오류 문제 해결이 어려울 수 있습니다. 보안에 대한 권장 사항은 [Synthetic 모니터링 데이터 보안][1]을 참조하세요.

[1]: /ko/data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}
   </br>
3. **Test URL**을 클릭하여 요청 설정을 테스트합니다. 응답 미리보기가 나타납니다.

{{< img src="synthetics/browser_tests/http_request2.png" alt="Make HTTP Request" style="width:80%;" >}}

#### 어설션 추가

어설션은 예상되는 테스트 결과를 정의합니다. **Test URL**을 클릭하면 `status code`, `response time`, `header`, `content-type`에 있는 기본 어설션이 테스트 응답을 기반으로 추가됩니다. 어설션은 브라우저 테스트에서 HTTP 단계에 대한 선택 사항입니다.

| 유형          | 연산자                                                                                               | 값 유형                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| 본문          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][11], [`xpath`][12] | _문자열_ <br> _[정규식][13]_ <br> _문자열_, _[정규식][13]_ |
| 헤더        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _문자열_ <br>_[정규식][13]_                                      |
| 응답 시간 | `is less than`                                                                                         | _정수 (ms)_                                                  |
| 상태 코드   | `is`, `is not`                                                                                         | _정수_                                                      |

HTTP 요청은 다음 `content-encoding` 헤더를 사용하여 본문의 압축을 풀 수 있습니다: `br`, `deflate`, `gzip` 및 `identity`.

- 테스트에 응답 본문에 대한 어설션이 포함되어 있지 않으면 본문 페이로드가 삭제되고 Synthetics Worker가 설정한 제한 시간 내에서 요청에 대한 관련 응답 시간을 반환합니다.

- 테스트에 응답 본문에 대한 어설션이 포함되어 있고 제한 시간에 도달하면, `Assertions on the body/response cannot be run beyond this limit` 오류가 나타납니다.

{{< img src="synthetics/browser_tests/assertions.png" alt="Define assertions for your browser test to succeed or fail on" style="width:80%;" >}}

**New Assertion**을 클릭하거나 응답 미리보기를 클릭하여 단계당 최대 20개의 어설션을 생성할 수 있습니다.

#### 응답에서 변수 추출

선택 사항으로 응답 헤더 또는 본문을 파싱하여 HTTP 요청 응답에서 변수를 추출합니다. HTTP 요청 단계가 실행될 때마다 변수 값이 업데이트됩니다. 이 변수가 생성되면 브라우저 테스트의 [다음 단계](#use-variables)에서 사용할 수 있습니다.

변수에 대한 파싱을 시작하려면, **Extract a variable from response content**를 클릭하세요:

1. **Variable Name**을 입력합니다. 변수 이름은 대문자, 숫자, 밑줄만 사용할 수 있으며 세 글자 이상이어야 합니다.
2. 응답 헤더 또는 응답 본문에서 변수를 추출할지 여부를 결정하세요. 

   * **응답 헤더**에서 값 추출: HTTP 요청의 전체 응답 헤더를 변수 값으로 사용하거나 [`regex`][13]로 파싱합니다.
   * **응답 본문**에서 값 추출: HTTP 요청의 전체 응답 본문을 변수 값으로 사용하거나 [`regex`][13], [`JSONPath`][11] 또는 [`XPath`][12]로 파싱합니다.

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="Extracted variable from response" style="width:80%;" >}}


## 단계 순서 관리

개별 단계를 드래그 앤 드롭하여 새 단계를 수동으로 재정렬하는 대신, 기록의 특정 단계에서 테스트 단계에 커서를 놓고 추가 단계를 삽입할 수 있습니다.

1. 기록된 테스트 단계 위로 마우스를 이동하여 **Set Cursor** 아이콘을 클릭합니다. 테스트 단계 위에 파란색 선이 나타납니다.
2. 추가 [테스트 단계](#automatically-recorded-steps)를 기록하거나 [수동으로 단계](#manually- added-steps)를 추가합니다.
3. 테스트 단계 위에 추가적인 단계를 추가한 후 **Clear Cursor**를 클릭하여 종료합니다.

{{< img src="synthetics/browser_tests/recording_cursor_step.mp4" alt="Set the cursor on a test step to add additional steps before this step" video="true" width="100%" >}}

## 변수 사용

수동으로 추가된 단계에서 사용 가능한 모든 변수를 보려면 입력 필드에 `{{`을 입력하세요.

자동으로 기록된 단계에 변수를 사용하려면, **Inject this variable** 아이콘을 클릭하여 기록 중에 변수 값을 입력합니다.

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Click on the test step to inject the value in your recorder page" video="true" width="100%" >}}

브라우저 테스트 단계 (예를 들면, 하위 테스트)에 따라 변수에 다른 값이 할당된 경우 변수는 처음 할당된 값을 체계적으로 사용합니다.

HTTP 요청이나 JavaScript 단계의 변수와 같이 일부 변수는 런타임에만 계산됩니다. 예를 들어, `{{ <YOUR_VARIABLE_NAME> }}`이 포함된 `Type text` 단계가 있다고 가정해 보겠습니다. 테스트 실행 시 `{{ <YOUR_VARIABLE_NAME> }}`는 변수의 연관된 값으로 체계적으로 대체됩니다. 이러한 변수 중 하나를 사용하여 단계를 기록하려면 테스트를 저장하기 전에 실제 변수 값으로 단계를 기록하고 단계의 정의에서 실제 값을 `{{ <YOUR_VARIABLE_NAME> }}`로 대체합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/browser_tests/advanced_options/
[2]: /ko/synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /ko/synthetics/guide/email-validation/#create-an-email-variable
[5]: /ko/synthetics/settings/
[6]: /ko/synthetics/guide/browser-tests-totp
[7]: /ko/synthetics/guide/email-validation/#confirm-the-email-was-sent
[8]: /ko/synthetics/guide/email-validation/#navigate-through-links-in-an-email
[9]: /ko/synthetics/browser_tests/advanced_options/#subtests
[10]: /ko/synthetics/guide/reusing-browser-test-journeys
[11]: https://restfulapi.net/json-jsonpath/
[12]: https://www.w3schools.com/xml/xpath_syntax.asp
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions