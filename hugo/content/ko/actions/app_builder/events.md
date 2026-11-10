---
aliases:
- /ko/app_builder/events
- /ko/service_management/app_builder/events
description: 동적 앱 상호 작용 및 동작을 위한 상태 함수를 포함하여 UI 구성 요소 이벤트 트리거 및 반응을 구성합니다.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: 설명서
  text: 앱 빌드하기
- link: /actions/app_builder/components/
  tag: 설명서
  text: 구성 요소
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: 학습 센터
  text: App Builder를 사용하여 타사 통합을 위한 셀프 서비스 앱 빌드
title: 이벤트
---
UI 구성 요소는 {{< ui >}}Event{{< /ui >}}에서 반응을 트리거할 수 있습니다. 이벤트 트리거는 구성 요소에 따라 다릅니다. 예를 들어, 버튼 구성 요소는 클릭 이벤트에서 반응을 트리거할 수 있고, 표 구성 요소는 페이지 변경 또는 표 행 클릭 이벤트에서 반응을 트리거할 수 있습니다. 특정 구성 요소에 어떤 이벤트 트리거를 사용할 수 있는지 확인하려면 [구성 요소][1]를 참조하세요.

이벤트는 UI 구성 요소의 상태를 설정하거나, 모달을 열거나 닫거나, 다른 쿼리를 트리거하거나, 사용자 지정 JavaScript를 실행할 수도 있습니다.

예를 들어, [GitHub PR 요약기][2] 블루프린트는 클릭 시 트리거되는 이벤트가 있는 {{< ui >}}Summarize{{< /ui >}} 버튼을 사용합니다. 이 이벤트는 `summarizePulls` 쿼리를 실행하는 {{< ui >}}Trigger Query{{< /ui >}} 반응을 사용합니다.

이벤트를 수동으로 작업하는 것 외에도 Bits AI를 사용하여 이벤트 핸들러를 설정하고, 이벤트 기반 액션을 구성하고, 이벤트 로직을 최적화할 수 있습니다.
   1. {{< ui >}}Build with AI{{< /ui >}} 아이콘(**<i class="icon-bits-ai"></i>**)을 클릭합니다.
   1. 이벤트에 대한 사용자 지정 프롬프트를 입력하거나 `How can you help me with events?` 프롬프트를 사용해 보세요.


## 이벤트 및 반응 {#events-and-reactions}

App Builder에서 이벤트와 반응은 함께 작동하여 구성 요소 동작을 결정합니다. 

구성 요소(예: 버튼 클릭 또는 양식 제출)와 액션(예: 실행 완료) 모두 이벤트를 트리거할 수 있습니다. 이벤트는 사용하는 구성 요소에 따라 다릅니다. 구성 요소별 이벤트 세부 정보는 [구성 요소][1]를 참조하세요.

반응은 이벤트가 트리거될 때 발생하는 일을 지정합니다. 이벤트를 트리거할 수 있는 모든 구성 요소에는 다음과 같은 사용 가능한 반응이 있습니다.: 
- {{< ui >}}Close Modal{{< /ui >}}
- {{< ui >}}Custom{{< /ui >}}
- {{< ui >}}Download File{{< /ui >}}
- {{< ui >}}Open Modal{{< /ui >}}
- {{< ui >}}Open Side Panel{{< /ui >}}
- {{< ui >}}Close Side Panel{{< /ui >}}
- {{< ui >}}Open URL{{< /ui >}}
- {{< ui >}}Set Component State{{< /ui >}}
- {{< ui >}}Set State Variable Value{{< /ui >}}
- {{< ui >}}Toast Notification{{< /ui >}}
- {{< ui >}}Trigger Action{{< /ui >}}

### 사용자 지정 반응 {#custom-reactions}

사용자 지정 반응을 사용하면 내장된 반응을 넘어 더 고급 사용 사례나 사용자 지정 동작을 구현할 수 있습니다. 예를 들어, 앱의 다른 데이터를 기반으로 조건부로 액션을 실행할 수 있습니다. 다음 예시는 현재 사용자의 팀에 따라 서로 다른 액션을 트리거합니다.

```javascript
${() => {
    console.log("Trigger actions by team")
    const teams = global?.user?.teams ?? []
    if (teams.some(t => t?.name === "team1")) {
        makeRequest0?.fetch()
    } else if (teams.some(t => t?.name === "team2")) {
        makeRequest1?.fetch()
    } else {
        makeRequest2?.fetch()
    }
}}
```

## 상태 함수{#state-functions}

App Builder는 일부 유형의 앱 상태 변경을 위한 함수를 제공합니다. 이러한 함수는 특정 구성 요소에 대한 {{< ui >}}Set Component State{{< /ui >}} 반응 및 쿼리 후 후크에서 사용할 수 있습니다.

setIsOpen
: 제공하는 불리언 값에 따라 모달의 상태를 열림 또는 닫힘으로 설정합니다.<br>
**예시**: [구성 요소][1] 문서 페이지의 **모달** 구성 요소 섹션을 참조하세요.

setPageIndex
: 표 구성 요소의 `pageIndex` 속성을 지정한 페이지로 설정합니다. 서버 측 페이지 매김 유형과 함께 작동합니다.<br>
**예시**: [구성 요소][1] 문서 페이지의 **표** 구성 요소 섹션을 참조하세요.

setSelectedRow
: 표 구성 요소의 `selectedRow` 속성을 지정한 행으로 설정합니다.<br>
**예시**: [구성 요소][1] 문서 페이지의 **표** 구성 요소 섹션을 참조하세요.

setTabIndex
: 표 구성 요소의 `selectedTabIndex` 속성을 지정한 탭 인덱스로 설정합니다.<br>
**예시**: [구성 요소][1] 문서 페이지의 **탭** 구성 요소 섹션을 참조하세요.

setValue
: 요소의 값을 함수에 제공한 값으로 설정합니다.<br>
**예시**: [구성 요소][1] 문서 페이지의 **양식**, **숫자 입력**, **라디오 버튼**, **검색**, **선택**, **텍스트 영역** 및 **텍스트 입력** 구성 요소 섹션을 참조하세요.

특정 구성 요소에 어떤 상태 함수를 사용할 수 있는지 확인하려면 [구성 요소][1]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][8]의 **#app-builder** 채널에 참여하세요.

[1]: /ko/actions/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://chat.datadoghq.com/