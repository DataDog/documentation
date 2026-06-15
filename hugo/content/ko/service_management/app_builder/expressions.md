---
further_reading:
- link: /service_management/app_builder/build/
  tag: 설명서
  text: 앱 빌드
- link: /service_management/app_builder/components/
  tag: 설명서
  text: 구성 요소
title: 자바스크립트(Javascript) 표현식
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})는 앱 빌더를 지원하지 않습니다.</div>
{{< /site-region >}}

App Builder 내 어디서든 JavaScript(JS) 표현식을 사용하여 앱의 다양한 구성요소 간의 사용자 지정 상호 작용을 만들 수 있습니다. 표현식을 입력하기 시작하면 App Builder는 앱의 기존 쿼리 및 컴포넌트에 기반하여 자동 완성 제안을 제공합니다. 자동 완성 제안을 클릭하여 표현식에 사용하거나, 키보드 화살표 키를 사용한 다음 Enter 키로 선택합니다.

{{< img src="service_management/app_builder/app-builder-variable.png" alt="어떤 표현식을 입력해야 할지 모를 경우 ${를 입력하면 사용 가능한 모든 표현식이 표시되는 제안 메뉴가 열립니다." style="width:70%;" >}}

[쿼리 후 변환][1]과 같은 일부 필드는 기본적으로 코드 편집기를 표시하고 플레인 JS를 허용합니다. 다른 모든 필드에서는 JS 표현식을 `${}`로 묶어야 합니다. 예를 들어, `textInput0` 및 `textInput1`라는 두 텍스트 입력 컴포넌트의 값을 텍스트 컴포넌트의 **Content** 속성에 보간하려면(그리고 느낌표를 추가하려면) `${textInput0.value} ${textInput1.value}!` 표현식을 사용합니다.

{{< img src="service_management/app_builder/interpolation-2.png" alt="텍스트 컴포넌트는 'Hello' 및 'World'라는 단어로 채워지며, 각 단어는 텍스트 입력 컴포넌트의 값으로 보간됩니다." style="width:70%;" >}}

App Builder는 표준 바닐라 JavaScript 구문을 허용하지만 다음과 같은 사항에 유의해야 합니다.
- 표현식의 결과는 컴포넌트 또는 쿼리 속성에서 예상한 결과와 반드시 일치해야 합니다. 예를 들어, 텍스트 컴포넌트의 **Is Visible** 속성에는 부울 값이 옵니다. 컴포넌트 속성에 맞는 데이터 유형을 확인하려면 [컴포넌트 속성 보기](#view-component-properties)를 참조하세요.
- 코드는 앱 상태에 관한 읽기 전용 액세스 권한이 있지만, App Builder는 Document Object Model(DOM) 또는 브라우저 API에 액세스할 수 없는 샌드박스 적용 환경에서 코드를 실행합니다.

## 컴포넌트 속성 보기

표현식을 생성하기 전에 상호 작용하려는 컴포넌트의 사용 가능한 속성과 기본값 또는 현재 값을 알아두면 도움이 됩니다.

다음 방법으로 컴포넌트에 사용 가능한 속성 및 값을 확인할 수 있습니다.
- **App State**: 앱의 모든 컴포넌트 및 쿼리에 대한 속성 및 값과 상태 변수 또는 대시보드 템플릿 변수 등의 전역 변수를 제공합니다.
- **Inspect Data**: 앱의 특정 컴포넌트 또는 쿼리에 대한 속성 및 값을 제공합니다.
- **Admin Console**: **Admin Console**의 **Data** 탭은 앱의 모든 컴포넌트 및 쿼리에 대한 속성 및 값을 제공합니다.

{{% collapse-content title="App State" level="h4" %}}
**App State**에 액세스하는 방법
1. 왼쪽 사이드 패널에서 **App Properties**를 클릭합니다.
1. **App State** 섹션까지 스크롤을 내립니다.

{{< img src="service_management/app_builder/app-state-2.png" alt="App Properties의 App State 섹션" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h4" %}}
**Inspect Data**에 액세스하는 방법
1. 검사하려는 쿼리 또는 컴포넌트를 클릭합니다.
1. **Inspect Data** 섹션까지 스크롤을 내립니다.

{{< img src="service_management/app_builder/inspect-data-2.png" alt="App Properties의 App State 섹션" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h4" %}}
**Admin Console**에 액세스하는 방법
1. 톱니바퀴(**Settings**) 아이콘을 클릭하고 **Admin Console**을 선택합니다.
1. **Data**를 클릭합니다.

{{< img src="service_management/app_builder/admin-console-2.png" alt="App Properties의 App State 섹션" style="width:50%;" >}}
{{% /collapse-content %}}

## 사용자 지정 컴포넌트 상호 작용

UI 컴포넌트 대부분은 토글 및 텍스트 정렬과 같은 내장 옵션을 제공하여 기본 앱 사용을 지원합니다. 컴포넌트에 사용자 지정 상호작용을 추가하려면 코드 편집기 기호(**</>**)를 클릭하고 JS 표현식을 입력합니다.

### 조건부 가시성

컴포넌트의 가시성을 다른 컴포넌트에 따라 다르게 설정할 수 있습니다.

예를 들어, `textInput0` 및 `textInput1`라는 두 텍스트 입력 컴포넌트에 값이 존재할 때만 텍스트 컴포넌트가 표시되도록 하려면, **Is Visible** 속성에서 `${textInput0.value && textInput1.value}`라는 표현식을 사용합니다.

### 조건부로 컴포넌트 비활성화

가시성 여부와 비슷하게, 다른 컴포넌트나 앱 컨텍스트와 같은 앱의 다른 요소가 조건을 충족하지 않으면 컴포넌트를 비활성화할 수 있습니다.

#### 가시성에 따라 컴포넌트 비활성화

앱에 텍스트 컴포넌트의 내용을 사용하여 메시지를 전송하는 버튼이 있는 경우, 텍스트 컴포넌트가 표시되지 않으면 다음과 같이 버튼을 비활성화할 수 있습니다.
1. 캔버스에서 버튼 컴포넌트를 클릭합니다.
1. **Disabled** 속성 옆의 코드 편집기 기호(**</>**)를 클릭합니다.
1. 표현식 `${!text0.isVisible}`을 추가합니다.

두 텍스트 입력 필드 모두에 내용이 없으면 텍스트 컴포넌트가 보이지 않고 버튼이 비활성화됩니다.

{{< img src="service_management/app_builder/is-disabled.png" alt="두 텍스트 입력 필드 모두에 내용이 없으면 텍스트 컴포넌트가 보이지 않고 버튼이 비활성화됩니다." style="width:100%;" >}}

#### 앱 컨텍스트에 따라 컴포넌트 비활성화

사용자가 속한 팀과 같은 앱 컨텍스트에 따라 컴포넌트를 비활성화할 수도 있습니다.

예를 들어, 다음과 같이 Product Management 팀에 속한 사용자에만 컴포넌트를 사용 설정할 수 있습니다.
1. 캔버스에서 버튼 컴포넌트를 클릭합니다.
1. **Disabled** 속성 옆의 코드 편집기 기호(**</>**)를 클릭합니다.
1. 표현식 `${global.user.teams[0].name == 'Product Management'}`을 추가합니다.

### 로드하는 동안 컴포넌트 비활성화

다른 일반적 사용 사례는 쿼리가 로딩 상태일 때 컴포넌트를 비활성화하는 것입니다. [EC2 Instance Manager blueprint][3]에서 `instanceType` 선택 컴포넌트는 `listInstances` 쿼리가 로드되는 동안 비활성화됩니다. 이를 위해 **Is Disabled** 속성은 `${listInstances.isLoading}` 표현식을 사용합니다.

{{< img src="service_management/app_builder/isloading.png" alt="'listInstances' 쿼리가 로드되는 동안 'instanceType' Select 컴포넌트는 비활성화됩니다." style="width:100%;" >}}

## 사용자 지정 쿼리 상호 작용

컴포넌트와 비슷하게, JS 표현식을 사용하여 사용자 상호작용에 따라 쿼리를 변경할 수 있습니다.

### 사용자 입력에 따른 쿼리 결과 필터링

[PagerDuty On-call Manager blueprint][4]는 사용자 입력에 따라 `listSchedules` 쿼리 결과를 필터링합니다. 사용자는 `team` 및 `user` 선택 컴포넌트에서 팀과 사용자를 선택합니다.

`listSchedules` 쿼리 내에서, 다음의 쿼리 후 변환은 `team` 및 `user` 값에 따라 결과를 필터링합니다.

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

쿼리의 **Run Settings**를 **Auto**로 설정하면 사용자가 `team` 또는 `user` 컴포넌트의 값을 변경할 때마다 쿼리가 실행되도록 할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/app_builder/build/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager