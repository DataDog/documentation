---
aliases:
- /ko/app_builder/variables
- /ko/service_management/app_builder/variables
description: 상태 변수를 사용해 앱 내에 로직을 캡슐화하여 앱의 다양한 구성 요소 간에 데이터를 저장하고 조작하세요.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: 설명서
  text: 앱 빌드
- link: /actions/app_builder/expressions/
  tag: 설명서
  text: JavaScript 표현식
title: 상태 변수
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder는 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

앱 내에 로직을 캡슐화하려면 상태 변수를 사용할 수 있습니다.

## 상태 변수 생성 {#create-a-state-variable}

Bits AI를 통해 상태 변수 추가하기
   1. {{< ui >}}Build with AI{{< /ui >}} 아이콘(**<i class="icon-bits-ai"></i>**)을 클릭합니다.
   1. 변수의 사용자 지정 프롬프트를 입력하거나 `How can you help me with variables?` 프롬프트를 사용해 보세요.

상태 변수를 수동으로 추가하기

1. 앱에서 {{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) 아이콘을 클릭하여 데이터 탭을 엽니다.
1. 더하기({{< ui >}}\+{{< /ui >}})를 클릭한 다음 {{< ui >}}Variable{{< /ui >}}을 선택합니다.
1. (선택 사항) 변수 이름을 클릭하고 이름을 변경합니다.
1. 상태 변수의 초기 값을 정의합니다.

## 앱 예시 {#example-app}

{{< img src="actions/app_builder/state-variables-example-app.mp4" alt="버튼을 클릭하면 콜아웃 값이 녹색 Pass와 빨간색 Fail 간에 전환됩니다." video="true" width="360px">}}

버튼으로 콜아웃 값 구성 요소의 스타일과 값을 변경하는 앱을 만들려면 다음 지침을 따르세요.

### 변수 생성 {#create-the-variables}

1. 앱에서 {{< ui >}}Data{{< /ui >}} ({{< ui >}}{&nbsp;}{{< /ui >}}) 아이콘을 클릭하여 데이터 탭을 엽니다.
1. 더하기({{< ui >}}\+{{< /ui >}})를 클릭한 다음 {{< ui >}}Variable{{< /ui >}}을 선택합니다.
1. 변수 이름을 `callout_value`로 지정하고 {{< ui >}}Initial Value{{< /ui >}}를 `Pass`로 설정합니다.
1. 더하기({{< ui >}}\+{{< /ui >}})를 클릭하여 다른 변수를 생성합니다.
1. 이 변수 이름을 `callout_color`로 지정하고 {{< ui >}}Initial Value{{< /ui >}}를 `green`으로 설정합니다.

### 구성 요소 생성{#create-the-components}

1. 앱에 콜아웃 값 구성 요소를 추가합니다. 다음 값을 입력합니다.
    * {{< ui >}}Value{{< /ui >}}: `${callout_value.value}`
    * {{< ui >}}Style{{< /ui >}}: `${callout_color.value}`
1. 앱에 버튼 구성 요소를 추가하고 레이블을 `Change status`로 설정합니다.
1. {{< ui >}}Events{{< /ui >}}에서 이벤트를 추가합니다. 다음 값을 입력합니다.
    * {{< ui >}}Event{{< /ui >}}: `click`
    * {{< ui >}}Reaction{{< /ui >}}: `custom`
    * {{< ui >}}Callback{{< /ui >}}:
        ```
        ${ () => {
            if(callout_color.value !== "green"){
                callout_color.setValue("green")
                callout_value.setValue("Pass")
            } else {
            callout_color.setValue("red")
            callout_value.setValue("Fail")
            }
        } }
        ```
1. {{< ui >}}Preview{{< /ui >}}를 클릭하면 앱을 미리 볼 수 있습니다.<br>
    앱에서 {{< ui >}}Change status{{< /ui >}} 버튼을 클릭하면 콜아웃 값 요소의 색상과 텍스트가 녹색 Pass와 빨간색 Fail 간에 전환됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][1]의 **#app-builder** 채널에 참여하세요.

[1]: https://chat.datadoghq.com/