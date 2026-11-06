---
aliases:
- /ko/service_management/app_builder/expressions
description: App Builder에서 JavaScript 표현식을 사용하여 구성 요소, 쿼리 및 앱 상태 간에 사용자 지정 상호 작용을
  만드세요.
further_reading:
- link: /actions/app_builder/build/
  tag: 설명서
  text: 앱 빌드하기
- link: /actions/app_builder/components/
  tag: 설명서
  text: 구성 요소
title: JavaScript 표현식
---
App Builder 어디에서나 JavaScript(JS) 표현식을 사용하여 앱의 여러 부분 간에 사용자 지정 상호 작용을 만들 수 있습니다. 표현식을 시작하면 App Builder는 앱에 있는 기존 쿼리와 구성 요소를 기반으로 자동 완성 제안을 제공합니다. 자동 완성 제안을 클릭하여 표현식에 사용하거나, 키보드의 화살표 키를 사용하여 선택한 다음 Enter 키를 누르세요.

{{< img src="actions/app_builder/app-builder-variable.png" alt="표현식으로 무엇을 입력해야 할지 확실하지 않은 경우, ${를 입력하여 사용 가능한 모든 표현식이 포함된 제안 메뉴를 열 수 있습니다." style="width:70%;" >}}

[쿼리 후 변환][1]과 같은 일부 필드는 기본적으로 코드 편집기를 표시하며 일반 JS를 허용합니다. 다른 모든 필드에서는 JS 표현식을 `${}`로 묶으세요. 예를 들어, `textInput0` 및 `textInput1`이라는 두 개의 텍스트 입력 구성 요소 값을 텍스트 구성 요소의 {{< ui >}}Content{{< /ui >}} 속성에 보간하려면(느낌표 추가) `${textInput0.value} ${textInput1.value}!` 표현식을 사용합니다.

{{< img src="actions/app_builder/interpolation-2.png" alt="텍스트 구성 요소는 각각 텍스트 입력 구성 요소 값에서 보간된 'Hello'와 'World'라는 단어로 채워집니다." style="width:70%;" >}}

App Builder는 표준 바닐라 JavaScript 구문을 허용하지만 다음과 같은 주의 사항이 있습니다.
- 표현식의 결과는 구성 요소나 쿼리 속성에서 예상하는 결과와 일치해야 합니다. 예를 들어, 텍스트 구성 요소의 {{< ui >}}Is Visible{{< /ui >}} 속성은 불리언 값을 예상합니다. 구성 요소 속성이 어떤 데이터 유형을 예상하는지 확인하려면 [구성 요소 속성 조회하기](#view-component-properties)를 참조하세요.
- 코드는 앱 상태에 대한 읽기 전용 액세스 권한을 가지지만, App Builder는 DOM(문서 객체 모델)이나 브라우저 API에 액세스할 수 없는 샌드박스 환경에서 코드를 실행합니다.

Bits AI를 사용하여 JS 표현식으로 작업할 수도 있습니다.
   1. {{< ui >}}Build with AI{{< /ui >}} 아이콘(**<i class="icon-bits-ai"></i>**)을 클릭합니다.
   1. 사용자 지정 프롬프트를 입력하거나 `How can you help me with JavaScript expressions?` 프롬프트를 사용해 보세요.

## 구성 요소 속성 조회하기 {#view-component-properties}

표현식을 만들기 전에 상호 작용하려는 구성 요소에 대해 사용 가능한 속성과 기본값 또는 현재 값을 아는 것이 도움이 됩니다.

다음과 같은 방법으로 구성 요소에 대해 사용 가능한 속성과 값을 볼 수 있습니다.
- {{< ui >}}App State{{< /ui >}}: 앱의 모든 구성 요소와 쿼리에 대한 속성 및 값은 물론, 상태 변수나 대시보드 템플릿 변수와 같은 전역 변수를 제공합니다.
- {{< ui >}}Inspect Data{{< /ui >}}: 앱의 특정 구성 요소나 쿼리에 대한 속성 및 값을 제공합니다.
- {{< ui >}}Admin Console{{< /ui >}}: {{< ui >}}Admin Console{{< /ui >}}의 {{< ui >}}Data{{< /ui >}} 탭은 앱의 모든 구성 요소 및 쿼리에 대한 속성과 값을 제공합니다.

{{% collapse-content title="앱 상태" level="h3" %}}
{{< ui >}}App State{{< /ui >}}에 액세스하려면:
1.  왼쪽 사이드 패널에서 {{< ui >}}App Properties{{< /ui >}}를 클릭합니다.
1. {{< ui >}}App State{{< /ui >}} 섹션으로 스크롤합니다.

{{< img src="actions/app_builder/app-state-2.png" alt="앱 속성의 앱 상태 섹션" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h3" %}}
{{< ui >}}Inspect Data{{< /ui >}}에 액세스하려면:
1. 검사하려는 쿼리나 구성 요소를 클릭합니다.
1. {{< ui >}}Inspect Data{{< /ui >}} 섹션으로 스크롤합니다.

{{< img src="actions/app_builder/inspect-data-2.png" alt="앱 속성의 앱 상태 섹션" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h3" %}}
{{< ui >}}Admin Console{{< /ui >}}에 액세스하려면:
1. 톱니바퀴({{< ui >}}Settings{{< /ui >}}) 아이콘을 클릭하고 {{< ui >}}Admin Console{{< /ui >}}을 선택합니다.
1. {{< ui >}}Data{{< /ui >}}를 클릭합니다.

{{< img src="actions/app_builder/admin-console-2.png" alt="앱 속성의 앱 상태 섹션" style="width:50%;" >}}
{{% /collapse-content %}}

## 사용자 지정 구성 요소 상호 작용 {#custom-component-interactions}

대부분의 UI 구성 요소는 토글이나 텍스트 정렬과 같이 기본적인 앱 사용을 지원하는 내장 옵션을 제공합니다. 구성 요소에 사용자 지정 상호 작용을 추가하려면 코드 편집기 기호({{< ui >}}</>{{< /ui >}})를 클릭하고 JS 표현식을 입력하세요.

### 조건부 표시 여부 {#conditional-visibility}

구성 요소의 표시 여부를 다른 구성 요소의 상태에 따라 결정되도록 설정할 수 있습니다.

예를 들어, `textInput0` 및 `textInput1`이라는 두 개의 텍스트 입력 구성 요소에 값이 있을 때만 텍스트 구성 요소가 표시되도록 하려면 {{< ui >}}Is Visible{{< /ui >}} 속성에 `${textInput0.value && textInput1.value}` 표현식을 사용하세요.

### 조건부로 구성 요소 비활성화 {#disable-a-component-conditionally}

표시 여부 설정과 마찬가지로, 다른 구성 요소나 앱 컨텍스트와 같은 앱의 다른 측면에서 조건이 충족되지 않는 한 구성 요소를 비활성화할 수 있습니다.

#### 가시성을 기반으로 구성 요소 비활성화 {#disable-a-component-based-on-visibility}

앱에 텍스트 구성 요소의 콘텐츠를 사용하여 메시지를 보내는 버튼이 있는 경우, 텍스트 구성 요소가 표시되지 않으면 버튼을 비활성화할 수 있습니다.
1. 캔버스에서 버튼 구성 요소를 클릭합니다.
1. {{< ui >}}Is Disabled{{< /ui >}} 속성 옆에 있는 코드 편집기 기호({{< ui >}}</>{{< /ui >}})를 클릭합니다.
1. `${!text0.isVisible}` 표현식을 추가합니다.

두 텍스트 입력 필드에 모두 콘텐츠가 있지 않으면 텍스트 구성 요소는 보이지 않고 버튼은 비활성화됩니다.

{{< img src="actions/app_builder/is-disabled.png" alt="두 텍스트 입력 필드에 모두 콘텐츠가 있지 않으면 텍스트 구성 요소는 보이지 않고 버튼은 비활성화됩니다." style="width:100%;" >}}

#### 앱 컨텍스트를 기반으로 구성 요소 비활성화 {#disable-a-component-based-on-the-app-context}

앱 컨텍스트(예: 사용자가 속한 팀)를 기반으로 구성 요소를 비활성화할 수도 있습니다.

예를 들어, 제품 관리 팀에 속한 사용자에게만 구성 요소를 활성화할 수 있습니다.
1. 캔버스에서 버튼 구성 요소를 클릭합니다.
1.  {{< ui >}}Is Disabled{{< /ui >}} 속성 옆에 있는 코드 편집기 기호({{< ui >}}</>{{< /ui >}})를 클릭합니다.
1. `${global.user.teams[0].name == 'Product Management'}` 표현식을 추가합니다.

### 로딩 중 구성 요소 비활성화 {#disable-a-component-while-loading}

또 다른 일반적인 사용 사례는 쿼리가 로딩 상태일 때 구성 요소를 비활성화하는 것입니다. [EC2 Management 블루프린트][3]에서 `listInstances` 쿼리가 로딩되는 동안 `instanceType` 선택 구성 요소가 비활성화됩니다. 이를 수행하려면 {{< ui >}}Is Disabled{{< /ui >}} 속성에 `${listInstances.isLoading}` 표현식을 사용하세요.

{{< img src="actions/app_builder/isloading.png" alt="'listInstances' 쿼리가 로딩되는 동안 'instanceType' 선택 구성 요소가 비활성화됩니다." style="width:100%;" >}}

## 사용자 지정 쿼리 상호 작용 {#custom-query-interactions}

구성 요소와 마찬가지로 JS 표현식을 사용하여 사용자 상호 작용에 따라 쿼리를 변경할 수 있습니다.

### 사용자 입력에 따라 쿼리 결과 필터링 {#filter-query-results-on-user-input}

[PagerDuty On-call Schedules 블루프린트][4]는 사용자의 입력에 따라 `listSchedules` 쿼리의 결과를 필터링합니다. 사용자가 `team` 및 `user` 선택 구성 요소에서 팀과 사용자를 선택합니다.

`listSchedules` 쿼리 내부에서 다음 쿼리 후 변환은 `team` 및 `user`의 값을 기반으로 결과를 필터링합니다.

{{< code-block lang="js" disable_copy="true" >}}
return outputs.body.schedules.map( s => {
    return {
        ...s,
        users: s.users.map(u => u.summary),
        teams: s.teams.map(u => u.summary)
    }
}).filter(s => {

        const matchesName = !name.value.length ? true : s.name.toLowerCase().includes(name.value.toLowerCase());
        const matchesTeam = team.value === 'Any Team' ? true : s.teams.includes(team.value);
        const matchesUser = user.value === 'Any User' ? true : s.users.includes(user.value);

        return matchesName && matchesUser && matchesTeam ;
    }) || []
{{< /code-block >}}

쿼리의 {{< ui >}}Run Settings{{< /ui >}}를 {{< ui >}}Auto{{< /ui >}}로 설정하면 사용자가 `team` 또는 `user` 구성 요소의 값을 변경할 때마다 쿼리가 실행됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/app_builder/queries/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager