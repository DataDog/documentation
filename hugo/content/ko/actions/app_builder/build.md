---
aliases:
- /ko/app_builder/build
- /ko/service_management/app_builder/build
description: 드래그 앤 드롭 UI 구성 요소, 쿼리 및 JavaScript 표현식을 사용하여 블루프린트를 바탕으로 또는 처음부터 사용자
  지정 앱을 만들어 보세요.
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: 설명서
  text: Action Catalog
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: 학습 센터
  text: App Builder 시작하기
title: 앱 빌드하기
---
[App Builder][1] 페이지에서 앱을 만들거나 기존 앱을 편집할 수 있습니다. 이 페이지에는 다음을 포함하여 기존 앱에 대한 정보가 나열됩니다.
- 작성자
- 태그
- 각 앱이 마지막으로 수정된 날짜
- 각 앱의 게시 여부

App Builder 페이지에서 앱에 액세스하고 필터링할 수 있습니다. 앱 위에 마우스를 올리면 앱을 편집, 삭제, 조회 및 복제할 수 있는 옵션이 표시됩니다. 또한 {{< ui >}}My apps{{< /ui >}} 토글을 활성화하여 본인이 만든 앱만 볼 수 있습니다.

{{< img src="actions/app_builder/app-builder-my-apps-2025-11-19.png" alt="'My apps'만 표시하도록 필터링된 App Builder 페이지" style="width:100%;" >}}

## 앱 만들기 {#create-an-app}

새 앱을 만들 때 [AI][22], [블루프린트][18], [레이아웃][19] 또는 [액션][20]을 사용하여 시작할 수 있습니다. 또는 [처음부터 시작][21]하거나 [App Playground][23]를 사용하여 App Builder에 대해 자세히 알아볼 수 있습니다.

### AI로 앱 빌드하기 {#build-an-app-with-ai}

Bits AI를 사용하면 단일 프롬프트에서 전체 앱을 생성할 수 있습니다. 만들려는 앱을 설명하면 UI 에이전트가 기존 데이터 및 권한에 매핑된 UI, 액션 및 로직을 자동으로 생성합니다. 그런 다음 코드를 작성하지 않고도 채팅을 통해 구성 요소, 흐름 또는 스타일을 수정하며 반복할 수 있습니다.

Bits AI로 앱을 빌드하려면 다음 단계를 따르세요.
1. [App Builder][1]에서 {{< ui >}}New App{{< /ui >}}을 클릭합니다.
1. 제안된 프롬프트를 클릭하거나 만들려는 앱을 설명하는 프롬프트를 입력합니다. 결과를 개선하려면 가능한 한 자세히 입력하세요. 다음은 프롬프트의 예입니다.
   - `Display a list of AWS Lambda functions in a table. Allow the user to filter by function name and specify the limit.`
   - `Display GitHub pull requests in a table.`
1. <kbd>Enter</kbd>를 눌러 프롬프트를 보냅니다. Bits AI는 기존 데이터 및 권한에 매핑된 앱의 UI, 액션 및 논리를 자동으로 생성합니다.
    - Bits AI가 앱을 생성하는 동안 실제 데이터로 앱을 빌드하기 위한 연결을 설정할 기회가 제공될 수 있습니다. 이 단계를 완료하거나 건너뛰어 데이터 없이 앱 레이아웃을 더 빠르게 빌드할 수 있습니다.
    - Bits AI는 프롬프트에 응답하는 동안 가끔 명확한 설명을 요구하는 질문을 합니다. 이런 경우 응답을 입력한 후 <kbd>Enter</kbd>를 누르세요. 
    - Bits AI가 앱에 액션을 추가한 후, 액션에 모의 데이터를 사용할지, 해당 단계를 건너뛸지 선택할 수 있습니다. 모의 데이터를 사용하면 Bits AI가 액션의 출력을 추론하고 해당 데이터를 구성 요소에 자동으로 연결할 수 있습니다(예: 표의 데이터 소스 설정). 이 단계를 건너뛰면 나중에 수동으로 출력을 연결할 수 있습니다.
1. Bits AI가 앱을 생성한 후 {{< ui >}}Edit with AI{{< /ui >}}를 클릭하거나 수동으로 [앱을 맞춤 설정][15]할 수 있습니다.

기존 앱을 반복해서 개선하려면 다음 단계를 따르세요.
1. [앱 목록][14]에서 앱 위에 마우스를 올리고 편집 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.
1. AI **<i class="icon-bits-ai"></i>** 아이콘을 클릭합니다.
1. 앱에 추가할 동작에 대한 상세 프롬프트를 입력합니다. 사용하려는 통합 및 액션을 포함합니다.
1. <kbd>Enter</kbd>를 눌러 앱에 기능을 추가합니다.

### 블루프린트로 앱 빌드하기 {#build-an-app-from-a-blueprint}

Blueprints는 일반적인 사용 사례를 다루고 앱 설정 모범 사례를 보여주는 유용한 앱 템플릿입니다. 여기에는 앱의 기능을 익히는 데 사용할 수 있는 데모 데이터가 포함되어 있습니다. [Datastore 관리][24] 및 [Synthetics 내보내기][25]와 같이 사용자가 맞춤 설정할 수 있는 시작 앱을 만드는 블루프린트도 있습니다. [How to: Custom Code][26]와 같이 제목에 'how to'가 포함된 Blueprints는 App Builder 기능에 대한 튜토리얼이 내장된 템플릿입니다.

1. [App Builder][1]에서 [**Blueprints**][2] 탭을 클릭합니다.
1. 사용할 블루프린트를 클릭합니다. 
1. {{< ui >}}Open in Editor{{< /ui >}}를 클릭합니다.
1. [앱을 맞춤 설정][15]합니다.

<div class="alert alert-tip"><a href="https://app.datadoghq.com/integrations">통합 페이지</a>에서도 블루프린트에 액세스할 수 있습니다. 통합을 클릭한 다음 <b>모니터링 리소스</b>를 클릭하여 사용 가능한 블루프린트를 확인하세요.</div>

### 레이아웃으로 앱 빌드하기 {#build-an-app-from-a-layout}

레이아웃을 선택하는 것은 최소한의 구성으로 바로 편집 가능한 앱을 만드는 가장 빠른 방법입니다. 

레이아웃에서 앱을 만들려면 다음 단계를 따르세요.
1. [App Builder][1]에서 {{< ui >}}New App{{< /ui >}}을 클릭합니다.
1. 온보딩 모달에서 {{< ui >}}Layouts{{< /ui >}}을 클릭합니다.
1. 레이아웃을 선택합니다. 세 가지 옵션이 있습니다. 
    - {{< ui >}}Table Manager{{< /ui >}}: 쿼리에서 데이터를 나열하고, 필터링하며, 정렬합니다.
    - {{< ui >}}Form{{< /ui >}}: 입력을 수집하고 액션을 트리거합니다(생성, 업데이트, 요청 등). 더 자세한 양식 템플릿은 [**양식**][27]을 참조하세요.
    - {{< ui >}}Custom Chart{{< /ui >}}: 미리 만들어진 막대 차트에 데이터를 적용하여 쿼리를 시각화합니다.
1. {{< ui >}}Use Layout{{< /ui >}}을 클릭합니다.
1. [앱을 맞춤 설정][15]합니다.

### 액션으로 앱 빌드하기 {#build-an-app-from-an-action}

[Action Catalog][17]에서 통합과 특정 액션을 선택하여 앱을 생성할 수 있습니다. App Builder는 액션과 해당 쿼리를 미리 구성하여 앱 캔버스에 실시간 데이터를 가져옵니다. 그런 다음 구성 요소를 연결하고 즉시 앱을 테스트할 수 있습니다. 이 방법은 이미 염두에 둔 통합 및 액션(예: [Datadog Datastore][28]와 상호 작용)이 있는 경우에 가장 좋습니다.

1. [App Builder][1]에서 {{< ui >}}New App{{< /ui >}}을 클릭합니다. 
1. 온보딩 모달에서 **액션**을 클릭합니다. 
1. 통합을 선택한 다음 **계속**을 클릭합니다.
1. 하나 이상의 액션을 선택합니다. 각 액션 세트는 선택한 통합에 특화된 템플릿입니다. 선택할 수 있는 액션 수에는 제한이 없습니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. [앱을 맞춤 설정][15]합니다.

### 사용자 지정 앱 만들기 {#create-a-custom-app}

위의 방법들을 사용하고 싶지 않다면, 빈 App Builder 캔버스에서 새 앱을 생성할 수 있습니다.

1. [App Builder][1]에서 {{< ui >}}New App{{< /ui >}}을 클릭합니다. 
1. {{< ui >}}Start From Scratch{{< /ui >}}를 클릭하거나 {{< ui >}}X{{< /ui >}}를 클릭하여 온보딩 모달을 닫습니다.
1. [앱을 맞춤 설정][15]합니다.

### App Playground로 가능한 작업 알아보기 {#see-whats-possible-with-app-playground}

App Playground는 사용자가 앱을 만들고 사용하는 방법을 안내하는 대화형 데모입니다. App Builder를 처음 사용하는 경우 App Playground를 사용하여 다음을 포함한 핵심 개념을 배울 수 있습니다. 
- 데이터 가져오기
- 표에 쿼리 데이터 표시하기
- 쿼리를 실행하도록 버튼 구성하기
- 쿼리의 로딩 상태를 반영하도록 구성 요소의 로딩 상태 구성하기
- 그래프에 데이터 시각화하기

App Playground에 액세스하려면 다음 단계를 따르세요.
1. [App Builder][1]에서 {{< ui >}}New App{{< /ui >}}을 클릭합니다. 
1. {{< ui >}}App Playground{{< /ui >}}를 클릭합니다.
1. 다음 화면의 앱 캔버스(오른쪽 창)에는 App Builder 사용 방법을 안내하는 정보가 표시됩니다. {{< ui >}}Fetching Data{{< /ui >}}와 같은 요소를 클릭하여 해당 기능 사용법에 대한 정보와 지침을 확인하세요. 

## 앱 맞춤 설정하기 {#customize-your-app}

앱은 서로 상호 작용하여 사용자 경험과 각 앱의 바탕이 되는 논리를 형성하는 UI 구성 요소와 쿼리로 구성됩니다. 쿼리 목록과 편집기는 페이지 왼쪽에 나타나고, 앱 캔버스와 UI 구성 요소는 페이지 오른쪽에 나타납니다.

앱의 기본 요소를 변경하려면 다음 단계를 따르세요.
1. [App Builder][1]에서 앱 위에 마우스를 올리고 편집 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.
1. 필요에 따라 앱을 편집합니다. 
    1. 앱 이름을 클릭하여 다음 요소들을 편집합니다.
        - 이름
        - 설명
        - 태그
        - 디스플레이
    1. [입력 파라미터][29]를 편집합니다.
    1. 앱 캔버스에 [UI 구성 요소](#app-canvas-and-components)를 추가하려면 {{< ui >}}Add Component{{< /ui >}} <i class="icon-component-wui" style="position:relative; top:4px;"></i> 아이콘을 클릭하여 {{< ui >}}Components{{< /ui >}} 탭을 엽니다. 구성 요소를 클릭하거나 캔버스로 드래그하세요.
1. {{< ui >}}View{{< /ui >}} 버튼을 클릭하여 사용자 관점에서 앱을 확인합니다. 보기 모드를 사용하여 앱 UI와 상호 작용하고 쿼리를 테스트하세요. 완료되면 {{< ui >}}Edit{{< /ui >}}을 클릭하여 App Builder로 돌아갑니다.
1. 앱을 저장하려면 {{< ui >}}Save{{< /ui >}}를 클릭합니다.
1. 앱을 게시할 준비가 되면 {{< ui >}}Publish{{< /ui >}}를 클릭합니다. 앱을 게시하면 대시보드에서 사용할 수 있게 됩니다.

### 앱 캔버스 및 구성 요소 {#app-canvas-and-components}

앱 캔버스는 사용자가 상호 작용하는 그래픽 인터페이스를 나타냅니다. 구성 요소를 드래그 앤 드롭하여 캔버스에서 이동할 수 있습니다. 사용 가능한 모든 구성 요소를 보려면 더하기 {{< img src="actions/app_builder/components-icon.png" inline="true" width="30px">}} 아이콘을 클릭하여 {{< ui >}}Components{{< /ui >}} 탭을 여세요.

각 구성 요소에는 사용자가 앱과 상호 작용하는 방식을 제어하는 해당 구성 옵션 목록이 있습니다. 예를 들어 {{< ui >}}Text Input{{< /ui >}} 구성 요소를 사용하면 기본값, 자리 표시자 텍스트 및 레이블을 설정할 수 있습니다. {{< ui >}}Button{{< /ui >}} 구성 요소에는 레이블과 버튼을 눌렀을 때 트리거되는 이벤트가 포함되어 있습니다. 구성 요소에는 구성 요소의 모양과 동작 방식을 변경하는 {{< ui >}}Appearance{{< /ui >}} 섹션도 있습니다. 예를 들어 버튼을 비활성화하거나 표시 여부를 제어할 수 있습니다.

구성 요소를 삭제하거나 복제하려면 구성 요소를 선택하고 점 세 개로 된 줄임표(*...*)를 클릭하여 {{< ui >}}Delete{{< /ui >}} 또는 {{< ui >}}Duplicate{{< /ui >}} 옵션을 표시하세요.

사용 가능한 UI 구성 요소 및 해당 속성 목록은 [구성 요소][9]를 참조하세요.

UI 구성 요소는 [이벤트][11]에 대한 반응을 트리거할 수 있습니다.

[쿼리][12]는 Datadog API 또는 지원되는 통합의 데이터로 앱을 채웁니다. 쿼리는 다른 쿼리나 UI 구성 요소에서 입력을 받아 다른 쿼리 또는 UI 구성 요소에서 사용할 출력을 반환합니다.

App Builder 어디에서나 [JavaScript 표현식][13]을 사용하여 앱의 여러 부분 간에 사용자 지정 상호 작용을 만들 수 있습니다.

## 앱 태그 지정 {#tag-an-app}

태그는 [앱 목록][14]의 열에 표시됩니다.

앱에 태그를 추가하려면 다음 단계를 따르세요.

1. 앱에서 {{< ui >}}App Properties{{< /ui >}} 탭을 엽니다.
1. {{< ui >}}Tags{{< /ui >}} 아래에서 드롭다운을 사용하여 기존 태그를 선택하거나 새 값을 입력한 후 {{< ui >}}Add option: [your text]{{< /ui >}}를 클릭합니다.
1. 앱을 저장합니다.

태그가 앱 목록의 해당 앱 행에 표시됩니다. 이 목록에서 태그를 클릭하여 클립보드에 복사할 수 있습니다.

## 앱을 즐겨찾기에 추가 {#favorite-an-app}

앱을 즐겨찾기에 추가하면 [앱 목록][14] 상단에 고정됩니다. 

앱을 즐겨찾기에 추가하려면 앱 이름 옆에 있는 별 <i class="icon-star-empty-wui" style="position:relative; top:4px;"></i> 아이콘을 클릭하세요. 페이지를 새로 고치면 즐겨찾기한 앱이 앱 목록 상단에 나타납니다.

## 앱 버전 기록 보기 {#view-app-version-history}

App Builder는 앱의 모든 저장된 버전 기록을 보관합니다.

앱의 버전 기록을 보려면 앱의 왼쪽 메뉴에서 버전 기록 {{< img src="icons/version-history.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다.

UI에는 이전에 저장되거나 게시된 앱 버전과 해당 버전을 저장하거나 게시한 사용자의 아이콘이 표시됩니다.

{{< img src="actions/app_builder/version-history-example.png" alt="현재 버전과 이전 버전, 두 개의 항목이 있는 App Builder 버전 기록 목록 예시" style="width:70%;" >}}

다음 작업을 수행할 수 있습니다.

* 앱 버전을 보려면 목록에서 해당 버전을 클릭합니다.
* 기존 앱을 이전 버전으로 덮어쓰려면 버전을 선택한 다음 오른쪽 상단에서 {{< ui >}}Restore Version{{< /ui >}}을 클릭합니다.
* 버전의 복사본인 새 앱을 만들려면 버전을 선택한 다음 오른쪽 상단에서 {{< ui >}}Clone Version{{< /ui >}}을 클릭합니다.


## JSON으로 앱과 상호 작용 {#interact-with-an-app-in-json}

### 앱 편집 {#edit-an-app}

JSON으로 앱을 편집하려면 설정 {{< img src="icons/settings.png" inline="true" style="width:14px;">}} 아이콘을 클릭하고 {{< ui >}}Switch to JSON{{< /ui >}}을 선택하세요. 설정 메뉴의 {{< ui >}}Switch to GUI{{< /ui >}} 옵션을 선택하면 GUI 편집기로 돌아갑니다.

### 앱 복사 {#copy-an-app}

조직 간에 앱 레이아웃을 복사하거나 앱을 백업하려면 설정 {{< img src="icons/settings.png" inline="true" style="width:14px;">}} 아이콘을 클릭하고 {{< ui >}}Switch to JSON{{< /ui >}}을 선택하세요. 그러면 전체 앱에 대한 JSON 코드가 표시됩니다. 이 JSON 코드를 복사하여 텍스트 편집기에 저장하세요. 개발 중에 앱의 중간 상태를 저장하고 필요할 때 해당 상태로 되돌릴 수 있습니다.

앱을 다른 조직으로 복사하려면 다음 단계를 따르세요.
1. 앱을 만듭니다. 
1. {{< ui >}}Settings{{< /ui >}} {{< img src="icons/settings.png" inline="true" style="width:14px;">}} 를 클릭하고 {{< ui >}}Switch to JSON{{< /ui >}}을 선택합니다. 
1. 기존 JSON을 이전에 복사한 JSON으로 바꿉니다. 

설정 메뉴의 {{< ui >}}Switch to GUI{{< /ui >}} 옵션을 선택하면 GUI 편집기로 돌아갑니다.

## 앱 디버그 {#debug-an-app}

App Builder 디버그 콘솔은 실시간 로그, 액션 실행 및 오류를 확인할 수 있는 중앙 집중적 공간을 제공합니다. 

디버그 콘솔에 액세스하려면 [앱 목록][14]에서 앱 위에 마우스를 올리고 편집 {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} 아이콘을 클릭합니다. 오른쪽 하단에 있는 확장 {{< img src="icons/panel-bottom-grow.png" inline="true" style="width:14px;">}} 아이콘을 클릭하면 전체 디버그 콘솔을 볼 수 있습니다. 콘솔 내부의 정보는 다음과 같습니다.
- {{< ui >}}Action Executions{{< /ui >}}: 액션 실행의 성공 및 실패 여부를 관련 입력 및 출력과 함께 추적합니다.
- {{< ui >}}Errors{{< /ui >}}: 오류, 경고 및 정보 메시지에 대한 로그를 확인합니다.
- {{< ui >}}Logs{{< /ui >}}: 액션, 변환기, 변수 및 구성 요소에 대한 구성 오류를 확인합니다.
- {{< ui >}}App State{{< /ui >}}: 실시간 애플리케이션 상태 변경 사항에 액세스합니다.

{{< img src="actions/app_builder/app-builder-debug-console.png" alt="앱 편집기 보기 내의 디버그 콘솔 확장 패널" style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][8]의 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /ko/actions/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /ko/actions/connections
[6]: /ko/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[9]: /ko/actions/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /ko/actions/app_builder/events
[12]: /ko/actions/app_builder/queries
[13]: /ko/actions/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list
[15]: /ko/actions/app_builder/build/#customize-your-app
[16]: /ko/getting_started/integrations/
[17]: /ko/actions/actions_catalog/
[18]: /ko/actions/app_builder/build/#build-an-app-from-a-blueprint
[19]: /ko/actions/app_builder/build/#build-an-app-from-a-layout
[20]: /ko/actions/app_builder/build/#build-an-app-from-an-action
[21]: /ko/actions/app_builder/build/#create-a-custom-app
[22]: /ko/actions/app_builder/build/#build-an-app-with-ai
[23]: /ko/actions/app_builder/build/#see-whats-possible-with-app-playground
[24]: https://app.datadoghq.com/app-builder/apps/edit?template=manage-datastore&viewMode=templatePreview
[25]: https://app.datadoghq.com/app-builder/apps/edit?template=export-synthetics&viewMode=templatePreview
[26]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to__write_custom_code&viewMode=templatePreview
[27]: /ko/actions/forms/
[28]: /ko/actions/datastores/
[29]: /ko/actions/app_builder/embedded_apps/input_parameters/