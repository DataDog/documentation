---
aliases:
- /ko/service_management/app_builder/custom_charts/
- /ko/service_management/app_builder/components/custom_charts
description: Vega-Lite 사양을 사용하여 앱에서 사용자 지정 차트를 생성하고 다양한 차트 유형 및 스타일로 쿼리 데이터를 시각화합니다.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: 설명서
  text: 구성 요소
- link: /actions/workflows/build/
  tag: 설명서
  text: 앱 빌드하기
title: 사용자 지정 차트
---
이 페이지는 App Builder 앱에서 사용자 지정 차트 구성 요소를 사용하는 방법에 대한 예시를 제공합니다.

사용자 지정 차트를 생성하기 위한 기본 워크플로는 다음과 같습니다.

1. 그래프로 나타낼 데이터가 포함된 쿼리를 생성하거나 선택합니다.
1. 사용자 지정 차트 구성 요소를 추가하고 App Builder UI 또는 [Vega-Lite 예시 갤러리][1]에서 차트 스타일을 선택합니다.
1. 예시의 값을 쿼리 데이터로 바꿉니다.

또는 Bits AI를 사용하여 사용자 지정 차트를 시작할 수 있습니다.
   1. {{< ui >}}Build with AI{{< /ui >}} 아이콘({{< ui >}}<i class="icon-bits-ai"></i>{{< /ui >}})을 클릭합니다.
   1. 사용자 지정 프롬프트를 입력하거나 `Can you help me create a custom chart?` 프롬프트를 사용해 보세요.

## 예시 설정 흐름 {#example-setup-flow}

다음 예시는 서비스별로 그룹화된 Datadog 로그를 보여주는 히스토그램 차트를 생성하는 방법을 설명합니다.

### 데이터 소스 설정 {#set-up-your-data-source}

1. {{< ui >}}\+ New Query{{< /ui >}}를 클릭합니다.
1. "search logs"를 검색하고 Datadog {{< ui >}}Search logs{{< /ui >}} 액션을 선택하여 `searchLogs0`이라는 쿼리를 생성합니다.
1. 기존 Datadog 계정 연결을 선택하거나 새로 만듭니다.
1. {{< ui >}}Inputs{{< /ui >}} 아래의 {{< ui >}}Time period{{< /ui >}}에서 {{< ui >}}Past 2 Days{{< /ui >}}를 선택합니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭합니다.<br>왼쪽 하단에 쿼리 결과가 표시되는 패널이 나타납니다.
1. `logs` 아래에서 `0`을 확장한 다음 `content`를 확장합니다. 그러면 각 로그에 사용 가능한 속성이 표시됩니다.


### 사용자 지정 차트 구성 요소 추가 및 차트 스타일 선택 {#add-the-custom-chart-component-and-choose-a-chart-style}

1. {{< ui >}}\+ All Components{{< /ui >}}를 클릭하고 {{< ui >}}Custom Chart{{< /ui >}}를 선택하여 `customChart0`이라는 구성 요소를 추가합니다.
1. {{< ui >}}Show Chart Examples{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Simple Histogram{{< /ui >}}을 선택하고 {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.<br>Vega-Lite 사양에 다음 값이 채워집니다.

   {{< code-block lang="json" disable_copy="true" collapsible="true" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "url": "https://vega.github.io/editor/data/movies.json"
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "bin": true,
            "field": "IMDB Rating"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}{{< /code-block >}}


### 예시 값을 데이터로 바꾸기 {#replace-example-values-with-your-data}

데이터 소스와 x축에 그래프로 표시할 값을 변경하려면 자동 채워진 Vega-Lite 사양을 다음으로 바꾸세요.

{{< highlight json "hl_lines=4 12" >}}${{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {
        "values": searchLogs0.outputs.logs
    },
    "mark": {
        "type": "bar",
        "tooltip": true
    },
    "encoding": {
        "x": {
            "field": "content.service"
        },
        "y": {
            "aggregate": "count"
        }
    }
}}
{{< /highlight >}}

Datadog 로그 데이터가 포함된 히스토그램 차트가 표시됩니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][0]의 **#app-builder** 채널에 참여하세요.

[0]: https://chat.datadoghq.com/
[1]: https://vega.github.io/vega-lite/examples/