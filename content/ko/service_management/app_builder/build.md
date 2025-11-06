---
aliases:
- /ko/app_builder/build
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: 설명서
  text: 작업 카탈로그
title: 앱 빌드
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})는 앱 빌더를 지원하지 않습니다.</div>
{{< /site-region >}}

[App Builder][1] 페이지에서 앱을 만들거나 기존 앱을 편집할 수 있습니다. 해당 페이지에는 다음과 같은 기존 앱에 관한 정보가 명시되어 있습니다.
- 작성자
- 상태
- 각 앱이 마지막으로 수정된 날짜
- 앱의 게시 여부

App Builder 페이지에서 앱에 액세스하고 앱을 필터링할 수 있습니다. 앱 위로 마우스를 올리면 앱을 수정, 삭제, 보기 또는 복제할 수 있는 옵션이 표시됩니다. 아울러, **My apps**을 토글하여 내가 만든 앱만 볼 수도 있습니다.

{{< img src="service_management/app_builder/app-builder-my-apps.png" alt="'My apps'만 표시되도록 필터링된 App Builder 페이지" style="width:100%;" >}}

## 앱 만들기

### 블루프린트로 앱 빌드

블루프린트는 일반 사용 사례를 다루는 유용한 앱 스타터입니다. 사용자가 앱에 익숙해지도록 활용할 수 있는 데모 데이터가 포함되어있습니다. 또 블루프린트에는 앱 기능 설정 및 시각 프레젠테이션 모범 사례 쇼케이스도 있습니다.

1. [App Builder][1]에서 [Blueprints][2] 탭을 클릭합니다.
1. 사용하려는 블루프린트를 찾아 **Preview**를 클릭합니다.
1. **Use Blueprint**를 클릭해 앱 블루프린트를 엽니다.
1. 앱 이름과 설명을 변경하려면 앱 이름을 클릭합니다.
1. 각 블루프린트 템플릿에는 데모 데이터가 포함되어 제공됩니다. 앱을 사용자 지정하려면 각 쿼리의 **Connection**을 편집하세요.
1. 앱을 저장하려면 **Save as New App**을 클릭합니다.
1. 앱을 미리 보려면 **Preview**를 클릭합니다. 미리 보기 화면에서 **Edit**를 클릭하여 구성 보기로 돌아갑니다.
1. 앱을 수정한 후에 **Run**을 클릭하여 테스트합니다.
1. 앱을 게시할 준비가 되면 **Publish**를 클릭합니다. 앱을 게시하면 대시보드에서 해당 앱을 사용할 수 있습니다.

### 사용자 지정 앱 만들기

1. [App Builder][1]에서 **New App**을 클릭합니다.
1. 앱 이름과 설명을 변경하려면 앱 이름을 클릭합니다.
1. 앱 캔버스에 [UI 컴포넌트](#app-canvas-and-components)를 추가하려면, Plus({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}})를 클릭하여 **Components** 탭을 연 다음 컴포넌트를 클릭하거나 캔버스로 드래그합니다.
1. [쿼리](#queries)를 사용하여 캔버스를 채우거나 상호작용합니다.
1. 앱을 저장하려면 **Save as New App**을 클릭합니다.
1. 앱을 미리 보려면 **Preview**를 클릭합니다. 미리 보기 화면에서 **Edit**를 클릭하여 구성 보기로 돌아갑니다.
1. 앱을 수정한 후에 **Run**을 클릭하여 테스트합니다.
1. 앱을 게시할 준비가 되면 **Publish**를 클릭합니다. 앱을 게시하면 대시보드에서 해당 앱을 사용할 수 있습니다.

## 앱 사용자 지정

앱은 서로 상호작용하여 각 앱의 사용자 경험과 로직을 형성하는 UI 컴포넌트와 쿼리로 구성됩니다. 쿼리 목록과 편집기는 페이지의 좌측에 표시되며, 앱 캔버스와 UI 컴포넌트는 페이지의 우측에 표시됩니다.

기본 사용자 지정:
- 앱의 **Name**, **Description** 또는 **Canvas Color**를 편집하려면 상단의 앱 이름을 클릭합니다.
- **Preview** 버튼을 클릭하여 앱을 미리 봅니다. Preview 모드로 사용자 관점에서 앱을 확인할 수 있습니다. Preview 모드를 사용하여 앱 UI와 상호작용하고 쿼리를 테스트합니다. 완료했으면 **Edit**를 클릭하여 앱 빌더로 돌아갑니다.
- 앱을 저장하려면 **Save**를 클릭합니다.
- 앱을 게시할 준비가 되면 **Publish**를 클릭합니다. 앱을 게시하면 대시보드에서 해당 앱을 사용할 수 있습니다.

### 앱 캔버스 및 컴포넌트

앱 캔버스는 사용자가 상호작용하는 그래픽 인터페이스를 나타냅니다. 컴포넌트를 드래그 앤 드롭하여 캔버스에서 이동할 수 있습니다. 사용 가능한 모든 컴포넌트를 확인하려면 Plus({{< img src="service_management/app_builder/components-icon.png" inline="true" width="30px">}})를 클릭해 **Components** 탭을 엽니다.

각 컴포넌트에는 사용자가 앱과 상호작용하는 방식을 제어하는 해당 구성 옵션 목록이 있습니다. 예를 들어, **Text Input** 컴포넌트에서는 기본값, 플레이스홀더 텍스트, 레이블을 설정할 수 있습니다. **Button** 컴포넌트에는 레이블과 버튼을 눌렀을 때 트리거되는 이벤트가 포함됩니다. 컴포넌트에는 컴포넌트의 외형과 동작을 변경하는 **Appearance** 섹션도 있습니다. 예를 들어, 버튼을 비활성화하거나 가시성 여부를 제어할 수 있습니다.

컴포넌트를 삭제 또는 복제하려면, 해당 컴포넌트를 선택하고 점 3개 아이콘(*...*)을 클릭하여 **Delete** 또는 **Duplicate** 옵션을 표시합니다.

사용 가능한 UI 컴포넌트 및 해당 속성 목록을 확인하려면 [Components][9]를 참조하세요.

UI 컴포넌트는 [Event][11]에서 반응을 트리거할 수 있습니다.

[쿼리][12]는 Datadog API 또는 지원되는 통합의 데이터를 사용하여 앱을 채웁니다. 다른 쿼리 또는 UI 컴포넌트의 입력을 받아 다른 쿼리 또는 UI 컴포넌트에서 사용할 수 있도록 출력을 반환합니다.

App Builder의 어디서든 [JavaScript Expressions][13]를 사용하여 앱의 다양한 구성요소 간의 사용자 지정 상호작용을 생성할 수 있습니다.

## 앱에 태그 지정하기

태그는 [앱 목록][14]의 열에 표시됩니다.

다음에 따라 앱에 태그를 추가합니다.

1. 앱의 **App Properties** 탭을 엽니다.
1. **Tags**의 드롭다운 메뉴에서 기존 태그를 선택하거나 새 값을 입력한 후 **Add option: [your text]**를 클릭합니다.
1. 앱을 저장합니다.

태그는 앱 목록에서 해당 앱의 줄에 표시됩니다. 해당 목록에서 태그를 클릭하여 클립보드에 복사할 수 있습니다.

## 앱 즐겨찾기

앱을 즐겨찾기에 추가하고 앱 목록의 맨 위에 고정하려면 [앱 목록][14]에서 앱 이름 옆의 별표를 클릭합니다:

{{< img src="service_management/app_builder/app-list-star.png" alt="어떤 앱도 즐겨찾기 표시가 되어 있지 않은, 앱 4개로 구성된 앱 목록" style="width:40%;" >}}

페이지를 새로 고치면, 별표 표시된 앱이 앱 목록 상단 섹션에 표시됩니다.

{{< img src="service_management/app_builder/app-list-with-favorited-app.png" alt="앱 하나가 즐겨찾기되어 있고 목록 상단에 고정되어 있는, 앱 4개로 구성된 앱 목록" style="width:40%;" >}}

## 앱 버전 기록 보기

App Builder는 앱의 저장된 모든 버전을 기록합니다.

앱 버전 기록을 보려면, 앱의 좌측 메뉴에서 버전 기록 아이콘{{< img src="service_management/app_builder/version-history-icon.png" inline="true">}}을 클릭합니다.

UI에 앱의 저장 또는 게시된 버전이 최대 50개까지 표시되며, 버전을 저장 또는 게시한 사용자의 아이콘도 함께 표시됩니다.

{{< img src="service_management/app_builder/version-history-example.png" alt="현재 버전 및 이전 버전 두 항목이 포함되어 있는, App Builder 버전 기록 목록 예시" style="width:70%;" >}}

다음 작업을 할 수 있습니다.

* 앱 버전을 확인하려면, 목록에서 해당 버전을 클릭합니다.
* 기존 앱을 이전 버전으로 덮어쓰려면, 해당 버전을 선택한 다음 우상단의 **Restore Version**을 클릭합니다.
* 버전을 복제하여 새 앱을 생성하려면, 해당 버전을 선택한 다음 우상단의 **Clone Version**을 클릭합니다.


## JSON으로 앱과 상호작용하기

### 앱 편집하기

JSON으로 앱을 편집하려면, 톱니바퀴(**Settings**) 아이콘을 클릭하고 **Switch to JSON**을 선택합니다. 설정 메뉴의 **Switch to GUI** 옵션을 선택하면 GUI 편집기로 돌아갑니다.

### 앱 내보내기

조직 간에 앱 레이아웃을 복사하거나 백업하려면, 톱니바퀴(**Settings**) 아이콘을 클릭하고 **Switch to JSON**을 선택합니다. 이렇게 하면 전체 앱의 JSON 코드가 표시됩니다. 이 JSON 코드를 복사하여 텍스트 편집기에 저장합니다. 개발 중에 앱의 중간 상태를 저장했다가 필요 시 해당 상태로 돌아갈 수 있습니다.

앱을 다른 조직에 복사하는 방법:
1. 앱을 만듭니다. 
1. 톱니바퀴(**Settings**) 아이콘을 클릭하고 **Switch to JSON**을 선택합니다.
1. 기존 JSON을 이전에 복사한 JSON으로 변경합니다.

설정 메뉴의 **Switch to GUI** 옵션을 선택하면 GUI 편집기로 돌아갑니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][8]의 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /ko/service_management/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /ko/service_management/workflows/connections
[6]: /ko/service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://datadoghq.slack.com/
[9]: /ko/service_management/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /ko/service_management/app_builder/events
[12]: /ko/service_management/app_builder/queries
[13]: /ko/service_management/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list