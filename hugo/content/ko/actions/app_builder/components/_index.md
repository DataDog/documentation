---
aliases:
- /ko/service_management/app_builder/components
description: 버튼, 양식, 표, 차트 및 대화형 요소를 포함한 App Builder UI 구성 요소에 대한 포괄적인 참조 자료입니다.
disable_toc: true
further_reading:
- link: /actions/app_builder/components/tables/
  tag: 설명서
  text: 표
- link: /actions/app_builder/build/
  tag: 설명서
  text: 앱 빌드
- link: /actions/app_builder/expressions/
  tag: 설명서
  text: JavaScript 표현식
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: 학습 센터
  text: App Builder를 사용하여 타사 통합을 위한 셀프 서비스 앱 빌드
title: 구성 요소
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder는 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

## 개요 {#overview}
이 페이지에서는 App Builder에서 앱을 생성할 때 사용할 수 있는 UI 구성 요소 목록을 제공합니다.

많은 구성 요소 속성에서 제공되는 값 중 하나를 선택할 수 있습니다. 속성 값에 표현식을 사용하려면 속성 옆의 {{< ui >}}&lt;/&gt;{{< /ui >}}를 클릭하여 코드 편집기를 사용하세요. 

이벤트를 트리거할 수 있는 모든 구성 요소의 경우 [이벤트 및 반응][13]에 사용 가능한 반응 목록이 제공됩니다. 이러한 구성 요소는 [사용자 지정 반응][14]도 사용할 수 있습니다.

App Builder에서 JavaScript를 사용하는 방법에 대한 자세한 내용은 [JavaScript 표현식][7]을 참조하세요. 구성 요소를 템플릿으로 저장하는 방법에 대한 자세한 내용은 [재사용 가능한 모듈][12]을 참조하세요.
<br>

## 사용 가능한 구성 요소 {#available-components}

{{% collapse-content title="버튼" level="h3" %}}
버튼 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general}

Label
: 버튼에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

#### 디스플레이 {#appearance}

Intent
: 버튼의 색상을 제어하며, 색상은 버튼의 목적을 나타냅니다.<br>
**제공되는 값**: default, danger, success, warning

Is Primary
: 특정 페이지나 워크플로에서 가장 중요한 액션에 사용자의 주의를 끌도록 설계되었습니다.<br>
**제공되는 값**: on, off

Is Borderless
: 버튼에서 테두리를 제거합니다. 마우스를 올리면 배경이 채워집니다.<br>
**제공되는 값**: on, off

Is Loading
: 로딩 인디케이터를 표시합니다.<br>
**제공되는 값**: on, off

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events}

Event
: **값**: click

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

#### 데이터 검사 {#inspect-data}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}


{{% collapse-content title="콜아웃 값" level="h3" %}}
콜아웃 값 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-1}

Label
: 구성 요소 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Value
: 콜아웃이 강조하는 값입니다.<br>
**값**: 문자열 또는 표현식

Unit
: 값과 관련된 단위입니다.<br>
**값**: 문자열 또는 표현식

#### 스타일 {#style}

Style
: 구성 요소의 시각적 스타일입니다.<br>
**제공되는 값**: default, success, warning, danger, blue, purple, pink, orange, yellow, red, green, gray, vivid blue, vivid purple, vivid pink, vivid orange, vivid yellow, vivid red, vivid green

Size
: 값의 크기에 비례하도록 메트릭 크기를 반응형으로 조정합니다.<br>
**제공되는 값**: sm, md, lg, xl

#### 디스플레이 {#appearance-1}

Is Loading
: 로딩 인디케이터를 표시합니다.<br>
**제공되는 값**: on, off

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 데이터 검사 {#inspect-data-1}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-1}

이 구성 요소를 컨텍스트 내에서 조회하려면 [EC2 Instance Manager][3] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}



{{% collapse-content title="확인란" level="h3" %}}
확인란 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-2}

Label
: 구성 요소 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Options
: 사용자가 선택할 수 있는 확인란의 목록입니다. 형식은 각 객체가 `label` 및 `value` 키-값 쌍으로 구성된 객체 배열입니다. 최소 옵션 수는 1개입니다.<br>
**값**: 표현식<br>
**예시**:<br>
:     ```json
      ${[
        {
            "label": "Staging",
            "value": "staging"
        },
        {
            "label": "Production",
            "value": "production"
        }
      ]}
      ```

#### 디스플레이 {#appearance-2}

Is Multiline
: 확인란 텍스트를 새 줄로 줄 바꿈할지, 아니면 줄임표로 생략할지 결정합니다.<br>
**제공되는 값**: on, off

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-1}

Event
: **값**: change<br>

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

#### 데이터 검사 {#inspect-data-2}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-2}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}



{{% collapse-content title="컨테이너" level="h3" %}}
컨테이너 구성 요소에는 다음과 같은 속성이 있습니다.

#### 디스플레이 {#appearance-3}

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 데이터 검사 {#inspect-data-3}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-3}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}



{{% collapse-content title="사용자 지정 차트" level="h3" %}}
사용자 지정 차트 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-3}

Vega Specification
: 유효한 Vega-Lite 또는 Vega JSON 사양을 나타내는 문자열입니다.

#### 디스플레이 {#appearance-4}

Is Loading
: 로딩 인디케이터를 표시합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 데이터 검사 {#inspect-data-4}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-4}

이 구성 요소의 사용 방법을 보여주는 예시는 [사용자 지정 차트][10]를 참조하세요.

{{% /collapse-content %}}


{{% collapse-content title="날짜 선택기" level="h3" %}}
날짜 선택기 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-4}

Label
: 날짜 선택기 상단에 표시되는 레이블입니다.<br>
**값**: 문자열 또는 표현식

Tooltip
: 입력 레이블 위에 마우스를 올렸을 때 표시할 툴팁입니다. 툴팁에는 마크다운을 포함할 수 있습니다.<br>
**값**: 문자열 또는 표현식

Default Value
: 날짜 선택기의 기본 날짜이며, 밀리초 단위의 UNIX 타임스탬프로 표시됩니다.<br>
**값**: 정수

Allow Future Dates
: 현재 날짜 이후의 날짜를 설정할 수 있는지 여부를 결정합니다.<br>
**제공되는 값**: on, off

#### 디스플레이 {#appearance-5}

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-2}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-5}

속성과 값을 JSON 형식으로 표시합니다. 값은 밀리초 단위의 UNIX 타임스탬프와 ISO(연, 월, 일, 시, 분, 초, 밀리초) 형식으로 모두 표시됩니다.

{{% /collapse-content %}}


{{% collapse-content title="날짜 범위 선택기" level="h3" %}}
날짜 범위 선택기 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-5}

Default timeframe
: 날짜 선택기에 표시되는 기본 기간입니다.<br>
**제공되는 값**: past 5 minutes, past 30 minutes, past 1 hour, past 4 hours, past 1 day

#### 디스플레이 {#appearance-6}

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-3}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

#### 데이터 검사 {#inspect-data-6}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-5}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}


{{% collapse-content title="구분선" level="h3" %}}
구분선 구성 요소에는 다음과 같은 속성이 있습니다.

#### 디스플레이 {#appearance-7}

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 데이터 검사 {#inspect-data-7}

속성을 JSON 형식으로 표시합니다.

{{% /collapse-content %}}


{{% collapse-content title="파일 입력" level="h3" %}}
파일 입력 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-6}

Accepted File Types
: 파일 입력 구성 요소가 허용하는 파일 유형을 결정합니다.<br>
**값**: .csv, .json

#### 디스플레이 {#appearance-8}

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-4}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

#### 데이터 검사 {#inspect-data-8}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

{{% /collapse-content %}}


{{% collapse-content title="이미지" level="h3" %}}
이미지 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-7}

Source
: 표시할 이미지입니다. 지원되는 형식은 JPG, PNG, GIF입니다. 최대 업로드 크기는 4MB입니다.<br>
**값**: URL 또는 파일

#### 디스플레이 {#appearance-9}

Fit
: 이미지 구성 요소의 경계 내에서 이미지의 크기를 결정합니다.<br>
**제공되는 값**: fill, contain, cover, none

Padding
: 이미지의 경계와 이미지 구성 요소의 경계 사이의 간격 너비를 결정합니다.<br>
**제공되는 값**: none, small, medium, large

Vertical Alignment
: 이미지 구성 요소의 경계 내에서 이미지의 수직 위치를 결정합니다.<br>
**제공되는 값**: align top, align center, align bottom

Horizontal Alignment 
: 이미지 구성 요소의 경계 내에서 이미지의 수평 위치를 결정합니다.<br>
**제공되는 값**: align left, align center, align right

Border
: 이미지 구성 요소의 가장자리에 시각적 테두리가 있는지 여부를 결정합니다.<br>
**제공되는 값**: on, off

Transparent Background
: 이미지 구성 요소 내부의 배경이 투명한지 여부를 결정합니다.<br>
**제공되는 값**: on, off

Is Loading
: 이미지가 로드되는 동안 로딩 아이콘을 표시할지 여부를 결정합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 데이터 검사 {#inspect-data-9}

속성을 JSON 형식으로 표시합니다.

{{% /collapse-content %}}


{{% collapse-content title="통합 로고" level="h3" %}}
통합 로고 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-8}

Integration Id
: 표시할 통합 로고 아이콘을 지정합니다.<br>
**값**: 문자열 또는 표현식<br>
**예시**: datadog, amazon-s3, postgres, okta

#### 디스플레이 {#appearance-10}

Horizontal Alignment
: 구성 요소 내에서 로고의 수평 위치를 제어합니다.<br>
**제공되는 값**: align left, align center, align right

Vertical Alignment
: 구성 요소 내에서 로고의 수직 위치를 제어합니다.<br>
**제공되는 값**: align top, align center, align bottom

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

Is Loading
: 로딩 인디케이터를 표시합니다.<br>
**제공되는 값**: on, off

#### 데이터 검사 {#inspect-data-10}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

{{% /collapse-content %}}


{{% collapse-content title="양식" level="h3" %}}
양식 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-9}

Title
: 양식의 제목입니다.<br>
**값**: 문자열 또는 표현식

Default value
: 앱이 양식에 채우는 기본값입니다. 특정 필드를 채우려면 JSON 표기법을 사용할 수 있습니다. 예를 들어, `{"org":"frontend"}`를 사용하여 `org` 필드를 `frontend` 값으로 채울 수 있습니다.<br>
**값**: 문자열 또는 표현식

#### 필드 {#fields}

각 항목은 양식의 필드를 나타냅니다. 각 필드에는 유형: `textInput`, `select`, `textArea` 또는 `text` 중 하나가 있습니다.

필드에는 필드 유형에 따라 다음 속성 중 일부 또는 전부가 포함됩니다.

Field name
: 필드의 고유 식별자입니다. 이 식별자를 사용하여 표현식에서 필드를 참조할 수 있습니다.<br>
**값**: 문자열 또는 표현식

Label
: 필드 위에 표시되는 레이블입니다.<br>
**값**: 문자열 또는 표현식

Content
: `text` 필드에 표시되는 콘텐츠입니다.<br>
**값**: 문자열 또는 표현식

Options
: `select` 필드에서 사용할 수 있는 옵션입니다. 옵션은 객체 배열이어야 하며, 옵션 값에 대한 `const` 키와 옵션 레이블에 대한 선택적 `title` 키가 포함되어야 합니다.<br>**값**: 각 객체의 `label` 및 `value`는 문자열 또는 표현식일 수 있습니다.<br>
GUI(기본값)를 사용하여 각 객체를 채우거나 {{< ui >}}Raw{{< /ui >}} 전환을 통해 원시 JSON 입력을 사용하여 전체 객체 배열을 제공할 수 있습니다.

Placeholder text
: 값이 입력되지 않았을 때 `textInput` 또는 `textArea` 필드에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 필드가 양식에 표시되는지 여부를 결정합니다.<br>
**제공되는 값**: on, off

Is Required
: 양식을 제출하기 위해 필드가 필수인지 여부를 결정합니다.<br>
**제공되는 값**: on, off

#### 디스플레이 {#appearance-11}

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-5}

Event
: **값**: submit, change, validate

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: `form0.setValue({name: 'node-group-1'})`은 `form0` 구성 요소의 값을 `{name: 'node-group-1'}`로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-11}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

{{% /collapse-content %}}


{{% collapse-content title="JSON 입력" level="h3" %}}
JSON 입력 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-10}

Label
: 구성 요소 상단에 표시되는 텍스트입니다.

Default value
: 구성 요소에 표시되는 기본 JSON 값입니다.

#### 디스플레이 {#appearance-12}

Is Read Only
: 구성 요소가 읽기 전용인지 여부를 결정합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-6}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

#### 데이터 검사 {#inspect-data-12}

속성 및 값 쌍을 JSON 형식으로 표시합니다.
{{% /collapse-content %}}



{{% collapse-content title="모달" level="h3" %}}
모달 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-11}

Title
: 모달의 제목입니다.<br>
**값**: 문자열 또는 표현식

#### 디스플레이 {#appearance-13}

Size
: 모달의 크기입니다.<br>
**제공되는 값**: sm, md, lg

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-7}

Event
: **값**: toggleOpen, close, open

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setIsOpen<br>
**예시**: `modal0.setIsOpen(true)`는 `modal0`의 상태를 open으로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-13}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-6}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}



{{% collapse-content title="숫자 입력" level="h3" %}}
숫자 입력 구성 요소에는 다음과 같은 속성이 있습니다.

Label
: 구성 요소 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Default value
: 앱이 입력 상자에 채우는 기본값입니다.<br>
**값**: 숫자 또는 숫자로 평가되는 표현식

Placeholder text
: 값이 입력되지 않았을 때 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

#### 검증 {#validation}

Min
: 숫자 입력이 허용하는 최솟값입니다.<br>
**값**: 숫자 또는 숫자로 평가되는 표현식

Max
: 숫자 입력이 허용하는 최댓값입니다.<br>
**값**: 숫자 또는 숫자로 평가되는 표현식

#### 디스플레이 {#appearance-14}

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-8}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: `numberInput0.setValue(3)`은 `numberInput0` 구성 요소의 값을 `3`으로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-14}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-7}

이 구성 요소를 컨텍스트 내에서 조회하려면 [ECS Task Manager][4] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}




{{% collapse-content title="라디오" level="h3" %}}
라디오 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-12}

Label
: 구성 요소 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Options
: 사용자가 선택할 수 있는 라디오 버튼 옵션의 목록입니다. 형식은 각 객체가 `label` 및 `value` 키-값 쌍으로 구성된 객체 배열입니다.<br>
**값**: 표현식<br>
**예시**:<br>
:    ```json
     ${[
       {
           "label": "Staging",
           "value": "staging"
       },
       {
           "label": "Production",
           "value": "production"
       }
     ]}
     ```

Default value
: 라디오가 로드될 때 선택되는 값입니다.<br>
**값**: 문자열 또는 표현식

#### 디스플레이 {#appearance-15}

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-9}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: `radioButtons0.setValue("production")`은 `radioButtons0` 구성 요소의 값을 `"production"`으로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-15}

속성 및 값 쌍을 JSON 형식으로 표시합니다.
{{% /collapse-content %}}



{{% collapse-content title="React 렌더러" level="h3" %}}
React 렌더러 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-13}

React Component Definition
: React 구성 요소를 생성하기 위해 실행되는 코드입니다.<br>

Component Input Props
: React 구성 요소에 전달되어 구성 요소의 props 객체에서 액세스할 수 있는 props입니다.

Initial Component State
: 구성 요소의 초기 상태 값을 설정합니다. 이 상태는 구성 요소가 처음 렌더링될 때 또는 아직 상태가 설정되지 않은 경우에 사용됩니다. 구성 요소는 <code>props.state</code>를 통해 이 데이터에 액세스할 수 있습니다.<br>

#### 디스플레이 {#appearance-16}

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-10}
Event
: **값**: set component state, callback function

Function Name
: **값**: <code>props.customFunctionName</code>

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

#### 데이터 검사 {#inspect-data-16}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 관계 {#relationships}

앱 내 React 렌더러와 구성 요소 간의 데이터 종속성을 표시합니다.

#### 예시 {#example-8}

이 구성 요소의 사용 방법을 보여주는 예시는 [React 렌더러][11]를 참조하세요.

{{% /collapse-content %}}



{{% collapse-content title="검색" level="h3" %}}
검색 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-14}

Default value
: 앱이 검색 상자에 채우는 기본값입니다.<br>
**값**: 문자열 또는 표현식

Placeholder text
: 값이 입력되지 않았을 때 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

#### 디스플레이 {#appearance-17}

Size
: 검색 구성 요소의 크기입니다.<br>
**제공되는 값**: sm, md, lg

Is Loading
: 로딩 인디케이터를 표시합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-11}

Event
: **값**: change, submit

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: `search0.setValue("search query")`는 `search0` 구성 요소의 값을 `"search query"`로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

이벤트에 대한 자세한 내용은 [이벤트][1]를 참조하세요.

#### 데이터 검사 {#inspect-data-17}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-9}

이 구성 요소를 컨텍스트 내에서 조회하려면 [EC2 Instance Manager][3] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}

{{% collapse-content title="선택" level="h3" %}}
선택 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-15}

Label
: 구성 요소 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Placeholder text
: 값이 입력되지 않았을 때 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Options
: 사용자가 선택할 수 있는 선택 옵션의 목록입니다. 형식은 각 객체가 `label` 및 `value` 키-값 쌍으로 구성된 객체 배열입니다. <br>
**값**: 표현식<br>
**예시**:<br>
:     ```json
      ${[
        {
            "label": "Staging",
            "value": "staging"
        },
        {
            "label": "Production",
            "value": "production"
        }
      ]}
      ```

Default value
: 선택 항목이 로드될 때 선택되는 값입니다.<br>
**값**: 문자열 또는 표현식

Is Multiselect
: 사용자가 한 번에 둘 이상의 옵션을 선택할 수 있는지 여부를 결정합니다.<br>
**제공되는 값**: on, off

#### 디스플레이 {#appearance-18}

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-12}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: `select0.setValue("staging")`은 `select0` 구성 요소의 값을 `"staging"`으로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-18}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-10}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}


{{% collapse-content title="사이드 패널" level="h3" %}}
사이드 패널 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-16}

Title
: 사이드 패널의 제목입니다.<br>
**값**: 문자열

#### 디스플레이 {#appearance-19}

Width
: 사이드 패널의 너비를 결정합니다. 값 뒤에 퍼센트 기호(`%`)를 포함해야 합니다.<br>
**값**: 정수

Hide Close Button
: 사이드 패널에 패널을 닫기 위한 X가 표시되는지 여부를 결정합니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-13}

Event
: **값**: toggle open, close, open

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setIsOpen<br>
**예시**: `sidePanel0.setIsOpen(true)`는 `sidePanel0`의 상태를 open으로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-19}

속성과 값을 JSON 형식으로 표시합니다.

{{% /collapse-content %}}


{{% collapse-content title="탭" level="h3" %}}

탭 구성 요소에는 다음과 같은 속성이 있습니다.

#### 탭 {#tabs}

탭 보기 목록입니다. 보기를 더 추가하려면 ({{< ui >}}+{{< /ui >}})를 사용하세요.


#### 스타일 {#style-1}

Style
: 탭 구성 요소에 사용되는 색상 스타일입니다.<br>
**제공되는 값**: Default, purple, pink, orange, red, green

Alignment
: 탭 구성 요소 내에서 탭이 정렬되는 방식입니다.<br>
**제공되는 값**: Horizontal(→), vertical(↓)

Impact
: 선택된 탭의 배경에 전체적으로 색상을 적용할지, 아니면 하단의 작은 밴드에만 색상을 적용할지 제어합니다.<br>
**제공되는 값**: High, low


#### 디스플레이 {#appearance-20}

Hide Tabs
: 탭 마커가 표시되는지 여부를 제어합니다.<br>
**제공되는 값**: on, off

Hide Body
: 탭 본문이 표시되는지 여부를 제어합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-14}

Event
: **값**: change

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setTabIndex<br>
**예시**: `tab0.setTabIndex(0)`은 `tab0` 구성 요소의 값을 첫 번째 탭으로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-20}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

{{% /collapse-content %}}

{{% collapse-content title="표" level="h3" %}}

표 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-17}

Title
: 표의 제목입니다. 사용자 지정 서식을 적용하려면 {{< ui >}}Markdown{{< /ui >}}을 선택하세요.<br>
**값**: 문자열

Data source
: 표에 표시할 객체 배열입니다.<br>
**값**: query, demo data, components

#### 열 {#columns}

데이터 소스의 각 데이터 열이 여기에 표시되며 다음과 같은 속성을 가집니다.

Label
: 열 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Data path
: 지정된 열의 객체 및 배열 내에 중첩된 값에 액세스하기 위한 JSON 경로입니다.<br>
**값**: 문자열 또는 표현식

Formatting
: 열에 적용되는 형식 유형입니다.<br>
**제공되는 값**: string, link, status pill, date/time, markdown, tags, percent bar, number, score bar, avatar

Sortable
: 사용자가 열을 기준으로 정렬할 수 있는지 여부를 결정합니다.<br>

Copyable
: 사용자가 클릭하여 열의 콘텐츠를 복사할 수 있는지 여부를 결정합니다.<br>
**제공되는 값**: on, off

Filterable
: 열에 필터 옵션을 사용할 수 있는지 여부를 결정합니다.<br>
**제공되는 값**: on, off

일부 열에는 {{< ui >}}Formatting{{< /ui >}} 속성에 기반한 추가 속성이 있습니다.

#### 페이지 매김 {#pagination}

Has summary
: 표 바로 위에 페이지 매김 요약 정보를 표시할지 여부를 결정합니다.<br>
**제공되는 값**: on, off

Page size
: 표시할 페이지당 행 수입니다.<br>
**값**: 숫자 또는 숫자로 평가되는 표현식

Total count
: 표에 표시할 총 행 수입니다.<br>
**값**: 숫자 또는 숫자로 평가되는 표현식

Type
: 페이지 매김 유형을 결정합니다.<br>
**제공되는 값**: client side, server side

#### 정렬 {#sorting}

기본 표 정렬을 위한 열과 방향을 선택하세요.
Column
: 정렬 기준 열입니다.<br>
**값**: 열 이름

Direction
: 정렬 방향입니다.<br>
**제공되는 값**: ascending, descending

#### 행 액션 {#row-actions}

행 액션을 추가하면 표에 {{< ui >}}Actions{{< /ui >}} 열이 추가되며, 여기에는 사용자가 정의한 액션 버튼이 포함됩니다. 행에는 여러 액션이 있을 수 있습니다. 액션에는 다음과 같은 속성이 있습니다.

Label
: 액션 버튼에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Primary
: 특정 페이지나 워크플로에서 가장 중요한 액션에 사용자의 주의를 끌도록 설계되었습니다.<br>
**제공되는 값**: on, off

Borderless
: 버튼에서 테두리를 제거합니다. 마우스를 올리면 배경이 채워집니다.<br>
**제공되는 값**: on, off

Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Level
: 의도에 따라 버튼의 색상을 제어합니다.<br>
**제공되는 값**: default, danger, success, warning

Reactions
: 버튼이 트리거하는 반응입니다. 버튼에는 여러 반응이 있을 수 있습니다.<br>
**제공되는 값**: download file, open modal, close modal, open side panel, close side panel, open URL, set component state, set state variable value, toast notification, trigger action, custom<br>
일부 반응 유형에는 추가 속성이 있습니다.

#### 디스플레이 {#appearance-21}

Scrollable
: 표의 스크롤 방향을 결정합니다.<br>
**제공되는 값**: both, vertical

Is Loading
: 로딩 인디케이터를 표시합니다.<br>
**제공되는 값**: on, off

Has text wrapping
: 셀 텍스트의 줄 바꿈 여부를 결정합니다.<br>
**제공되는 값**: on, off

Has subrows
: 각 행에 대한 하위 행을 활성화합니다. 데이터 소스에 `subRows` 속성을 포함합니다.<br>
**제공되는 값**: on, off

Is searchable
: 표에 검색 창을 추가할지 여부를 결정합니다. <br>
**제공되는 값**: on, off

Show sort options
: 사용자에게 정렬 옵션을 제공하는 {{< ui >}}Sort{{< /ui >}} 버튼을 표에 추가합니다.<br>
**제공되는 값**: on, off

Show column options
: 표 열을 표시하거나, 숨기거나, 다시 구성하기 위한 {{< ui >}}Columns{{< /ui >}} 버튼을 표에 추가합니다.<br>
**제공되는 값**: on, off

Has date range filter
: 표에 날짜 범위 필터를 추가합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-15}

Event
: **값**: pageChange, tableRowClick

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setSelectedRow<br>
**예시**: <ul><li>`table0.setSelectedRow(0)`은 `table0`의 `selectedRow` 속성을 첫 번째 행으로 설정합니다.</li><li>`table0.setSelectedRow(null)` 은 `selectedRow` 속성을 지웁니다.</li></ul>
: setPageIndex<br>
**예시**: `table0.setPageIndex(0)`은 `table0`의 `pageIndex` 속성을 첫 번째 페이지로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-21}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-11}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.

표의 고급 기능을 사용하는 방법에 대한 예시는 [표][6]를 참조하세요.

{{% /collapse-content %}}



{{% collapse-content title="텍스트" level="h3" %}}
텍스트 구성 요소에는 다음과 같은 속성이 있습니다.

#### 일반 {#general-18}

Content
: 구성 요소가 표시하는 콘텐츠입니다.<br>
**값**: 문자열 또는 표현식

Content type
: 텍스트를 렌더링하는 방법을 결정합니다. {{< ui >}}Markdown{{< /ui >}}이 선택되면 사용자가 다른 곳에서 호스팅하는 이미지를 포함한 [기본 Markdown 구문][8]이 텍스트 구성 요소에서 지원됩니다.<br>
**제공되는 값**: plain text, Markdown

#### 디스플레이 {#appearance-22}

Text alignment
: 구성 요소 내에서 텍스트의 수평 정렬을 결정합니다.<br>
**제공되는 값**: align left, align center, align right

Vertical alignment
: 구성 요소 내에서 텍스트의 수직 정렬을 결정합니다.<br>
**제공되는 값**: align top, align center, align bottom

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 데이터 검사 {#inspect-data-22}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 관계 {#relationships-1}

앱의 표 데이터와 구성 요소 간의 데이터 종속성을 표시합니다.

#### 예시 {#example-12}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}


{{% collapse-content title="텍스트 영역" level="h3" %}}
텍스트 영역 구성 요소에는 다음과 같은 속성이 있습니다.

Label
: 구성 요소 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Default value
: 텍스트 영역이 로드될 때 선택되는 값입니다.<br>
**값**: 문자열 또는 표현식

Placeholder text
: 값이 입력되지 않았을 때 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

#### 디스플레이 {#appearance-23}

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-16}

Event
: **값**: change, submit

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: `textArea0.setValue("text")`는 `textArea0` 구성 요소의 값을 `"text"`로 설정합니다.<br>
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-23}

속성 및 값 쌍을 JSON 형식으로 표시합니다.
{{% /collapse-content %}}


{{% collapse-content title="텍스트 입력" level="h3" %}}
텍스트 입력 구성 요소에는 다음과 같은 속성이 있습니다.

Label
: 구성 요소 상단에 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

Default value
: 텍스트 입력이 로드될 때 선택되는 값입니다.<br>
**값**: 문자열 또는 표현식

Placeholder text
: 값이 입력되지 않았을 때 표시되는 텍스트입니다.<br>
**값**: 문자열 또는 표현식

#### 디스플레이 {#appearance-24}

Is Disabled
: 비활성화된 스타일을 적용하고 상호작용을 제거합니다.<br>
**제공되는 값**: on, off

Is Visible
: 구성 요소가 최종 사용자에게 표시되는지 여부를 결정합니다. 편집 모드에서는 모든 구성 요소가 계속 표시됩니다.<br>
**제공되는 값**: on, off

#### 이벤트 {#events-17}

Event
: **값**: change, submit

Reaction
: **값**: 예시에는 open modal, trigger action, set component state 등이 있습니다.<br>
사용 가능한 반응의 전체 목록은 [이벤트][1]를 참조하세요.

State Function
: setValue<br>
**예시**: `textInput0.setValue("text")`는 `textInput0` 구성 요소의 값을 `"text"`로 설정합니다.
자세한 내용은 [상태 함수][9]를 참조하세요.

#### 데이터 검사 {#inspect-data-24}

속성 및 값 쌍을 JSON 형식으로 표시합니다.

#### 예시 {#example-13}

이 구성 요소를 컨텍스트 내에서 조회하려면 [Metrics Explorer 및 Monitors Builder][2] 앱 블루프린트를 참조하세요.
{{% /collapse-content %}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][5]의 {{< ui >}}#app-builder{{< /ui >}} 채널에 참여하세요.


[1]: /ko/actions/app_builder/events
[2]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=datadog_metrics_and_monitors&viewMode=preview
[3]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ec2_instance_manager&viewMode=preview
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=ecs_task_manager&viewMode=preview
[5]: https://chat.datadoghq.com/
[6]: /ko/actions/app_builder/components/tables/
[7]: /ko/actions/app_builder/expressions
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /ko/actions/app_builder/events/#state-functions
[10]: /ko/actions/app_builder/components/custom_charts/
[11]: /ko/actions/app_builder/components/react_renderer/
[12]: /ko/actions/app_builder/components/reusable_modules/
[13]: /ko/actions/app_builder/events/#events-and-reactions
[14]: /ko/actions/app_builder/events/#custom-reactions