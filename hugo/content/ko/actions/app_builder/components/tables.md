---
aliases:
- /ko/service_management/app_builder/tables/
- /ko/service_management/app_builder/components/tables
description: 클라이언트 사이드 필터링, 서버 사이드 필터링, 로딩 표시기, 동적 값을 포함한 고급 표 컴포넌트 기능.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: 설명서
  text: 구성 요소
- link: /actions/app_builder/build/
  tag: 설명서
  text: 앱 빌드
title: 표
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder는 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

본 페이지에서는 App Builder 앱에서 표 컴포넌트를 조정하는 데 사용할 수 있는 고급 기능에 대해 알아봅니다.

## 클라이언트 사이드 필터링{#client-side-filtering}

이미 아이템 목록이 가득 차 필터링하려는 경우, 클라이언트 페이지에서 다양한 방법으로 필터링이 가능합니다.

### 열 필터링{#column-filtering}

{{< ui >}}Columns{{< /ui >}}에서 열을 확장하고 {{< ui >}}Filterable{{< /ui >}} 옵션을 활성화하여 사용자가 해당 열의 항목별로 필터링할 수 있도록 합니다. 활성화되면 표 헤더에 드롭다운 메뉴가 나타나며, 사용자가 해당 열에서 필터링할 항목을 선택할 수 있습니다.

### 날짜 범위별 필터링{#filter-by-date-range}

날짜 범위 필터링을 허용하려면 {{< ui >}}Appearance{{< /ui >}}에서 {{< ui >}}Has Date Range Filter{{< /ui >}} 옵션을 활성화하고 필터링할 데이터 경로를 선택합니다. 활성화되면 표 헤더에 드롭다운 메뉴가 나타나며, 사용자가 필터링할 스팬을 선택할 수 있습니다.

### 검색으로 필터링{#filter-with-search}

표에 검색창을 추가하려면 {{< ui >}}Appearance{{< /ui >}}에서 {{< ui >}}Is Searchable{{< /ui >}} 옵션을 활성화합니다.

### 텍스트 입력 또는 검색 컴포넌트로 표 필터링하기{#filter-a-table-with-a-text-input-or-search-component}

일반적인 사용 케이스 중 하나는 텍스트 입력 컴포넌트의 값을 사용하여 표 컴포넌트를 필터링하는 것입니다.

예를 들어, 텍스트 입력 컴포넌트를 사용하여 필터링할 수 있는 표로 대시보드를 목록화하려면 다음에 따릅니다.

1. {{< ui >}}\+{{< /ui >}} 버튼으로 새 쿼리를 추가합니다.
1. 'list dashboards'를 검색하고 {{< ui >}}List Dashboards{{< /ui >}} 작업을 클릭합니다. 쿼리 이름을 `listDashboards0`으로 지정합니다.
1. 앱에 텍스트 입력 또는 검색 컴포넌트를 추가합니다. 이름을 `searchInput`으로 지정합니다.
1. 표 컴포넌트를 추가합니다.
1. 표의 {{< ui >}}data source{{< /ui >}} 속성을 생성한 텍스트 입력 또는 검색 컴포넌트로 필터링된 데이터로 설정합니다. 이 예제에서는 {{< ui >}}data source{{< /ui >}}를 다음 표현식으로 설정합니다.

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(searchInput.value))}
    ```

텍스트 입력 컴포넌트에 텍스트를 입력하면 해당 텍스트를 기준으로 표의 행이 필터링됩니다.

### 선택 컴포넌트로 표 필터링하기{#filter-a-table-with-a-select-component}

또 다른 일반적인 사용 케이스 중 하나는 선택 표 컴포넌트를 사용해 필터링하는 것입니다.

예를 들어, 선택 컴포넌트를 사용하여 필터링할 수 있는 표로 대시보드를 목록화하려면 다음에 따릅니다.

1. {{< ui >}}\+{{< /ui >}} 버튼으로 새 쿼리를 추가합니다.
1. 'list dashboards'를 검색하고 {{< ui >}}List Dashboards{{< /ui >}} 작업을 클릭합니다. 쿼리 이름을 `listDashboards0`으로 지정합니다.
1. 앱에 선택 컴포넌트를 추가합니다. 이름을 `selectInput`으로 지정합니다.
1. 표 컴포넌트를 추가합니다.
1. 표의 {{< ui >}}data source{{< /ui >}} 속성을 선택 컴포넌트로 필터링된 데이터로 설정합니다. 이 예제에서는 {{< ui >}}data source{{< /ui >}}를 다음 표현식으로 설정합니다.

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(selectInput.value))}
    ```

선택 컴포넌트에서 값을 선택하면 해당 값을 기준으로 표의 행이 필터링됩니다.

### 포스트 쿼리 변환을 사용하여 쿼리 결과 필터링하기 {#filter-query-results-using-a-post-query-transformation}

쿼리 자체의 결과를 필터링한 다음 표에서 해당 결과를 사용하려면 다음 단계에 따릅니다.

1. {{< ui >}}\+{{< /ui >}} 버튼으로 새 쿼리를 추가합니다.
1. 'list dashboards'를 검색하고 {{< ui >}}List Dashboards{{< /ui >}} 작업을 클릭합니다. 쿼리 이름을 `listDashboards0`으로 지정합니다.
1. 앱에 텍스트 입력 또는 검색 컴포넌트를 추가합니다. 이름을 `searchInput`으로 지정합니다.
1. 표 컴포넌트를 추가하고 해당 {{< ui >}}data source{{< /ui >}} 속성을 추가한 쿼리로 설정합니다.
1. 쿼리의 {{< ui >}}Advanced{{< /ui >}} 섹션을 확장하고 {{< ui >}}Post-query Transformation{{< /ui >}}을 찾습니다.
1. `return outputs`를 다음 줄로 바꿉니다.

    ```
    outputs.dashboards.filter(row => row.title.includes(searchInput.value))
    ```

텍스트 입력 컴포넌트에 텍스트를 입력하면 해당 텍스트를 기준으로 표의 행이 필터링됩니다.

변환되지 않은 원본 쿼리 결과가 필요한 경우 `${listDashboards0.rawOutputs}`으로 참조합니다.

## 서버 사이드 필터링 {#server-side-filtering}

경우에 따라 사용자가 텍스트 입력 컴포넌트와 같은 입력에 값을 입력할 때 서버 측에서 값을 필터링하고 새 요청을 발행해야 할 수도 있습니다.

이러한 케이스는 쿼리를 직접 편집하여 서버 측 필터링을 활성화할 수 있습니다.

예를 들어, [GitHub PR 파이프라인][4] 청사진에서 `listOpenedPulls` 쿼리는 다음 URL을 불러오는 입력값을 갖습니다.

```
https://api.github.com/search/issues?q=org:${organizationInput.value}+author:${userNameInput.value}+type:pr+state:open
```

GitHub API는 조직, 작성자 또는 풀 리퀘스트 유형에 따른 필터링을 위해 쿼리 매개변수를 허용합니다. 앞선 쿼리 입력 URL에는 `organizationInput.value`('Organization' 텍스트 입력 컴포넌트의 값) 및 `userNameInput.value`(Username' 텍스트 입력 컴포넌트의 값)에 대한 템플릿 표현식이 포함되어 있습니다. 쿼리 실행 설정을 자동으로 설정하면 이러한 템플릿 표현식 값이 변경될 때 쿼리가 자동으로 새로 고침되고 표 값이 업데이트됩니다.


## 로딩 인디케이터 표시 {#showing-a-loading-indicator}

데이터를 가져오는 동안 표에 로딩 인디케이터를 표시하려면 _표_ `isLoading` 값을 _쿼리_ `isLoading` 속성과 동일하게 설정합니다. 예를 들면 다음과 같습니다.

1. [텍스트 입력으로 필터링하기][2]의 단계를 따릅니다.
1. 표 속성에서 {{< ui >}}Appearance{{< /ui >}} 아래의 {{< ui >}}&lt;/&gt;{{< /ui >}} 옆에 있는 {{< ui >}}Is Loading{{< /ui >}}을 클릭하여 코드 편집기를 엽니다.
1. 표의 `isLoading` 값을 다음 표현식으로 설정합니다.

    ```
    ${listDashboards0.isLoading}
    ```

텍스트 입력 컴포넌트에 새 텍스트를 입력할 때 표에 로딩 인디케이터가 표시됩니다.

## 동적 표 값 {#dynamic-table-values}

표 컴포넌트의 {{< ui >}}data source{{< /ui >}} 속성을 사용하여 표 값을 동적으로 채우고 표 열로 가져올 오브젝트를 제한할 수 있습니다.

예를 들어, [GitHub PR 요약기][3] 블루프린트는 일련의 GitHub 쿼리를 사용하여 리포지토리의 풀 리퀘스트 목록을 요약합니다. 이 쿼리는 아래의 데이터 소스 항목을 사용하여 표를 `title`, `Summary`, `updated_at`, `user`, `html_url`, `state` 등 6개의 열로 제한합니다. 강조 표시된 코드는 각 풀 리퀘스트의 사용자 열을 작성자의 아바타와 GitHub 사용자 이름으로 동적으로 채웁니다.

{{< highlight js "hl_lines=17" >}}
${(() => {
    const summaryById = Object.fromEntries(
        summarizePulls.outputs.map(({id, summary}) => [id, summary])
    );
    return listPulls.outputs.map(result => {
        const {title, updated_at, user, state, html_url} = result;
        const updatedAt = new Date(result.updated_at);
        let summary;
        if (summarizePulls.isLoading) {
            summary = 'Summarizing';
        } else {
            summary = summaryById[result.id] ?? 'N/A';
        }
        return {
            title: `**${title}**`,
            updated_at: updatedAt.toLocaleString(),
            user: {label: user.login, src: user.avatar_url},
            summary,
            state, html_url};
    })
})()}
{{< /highlight >}}

표에서 {{< ui >}}User{{< /ui >}} 열은 각 PR 작성자의 아바타와 GitHub 사용자 이름으로 채워집니다.



## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][0]의 **#app-builder** 채널에 참여하세요.

[0]: https://chat.datadoghq.com/
[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=pagerduty_oncall_manager&viewMode=preview
[2]: /ko/actions/app_builder/components/tables/#filtering-with-a-text-input
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=github-pr-dashboard&viewMode=preview