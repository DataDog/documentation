---
description: 목록을 사용하여 대시보드 구성 및 관리하기
disable_toc: false
further_reading:
- link: dashboards/
  tag: 설명서
  text: 대시보드 개요
- link: dashboards/guide/maintain-relevant-dashboards
  tag: 가이드
  text: 관련 대시보드 유지 관리를 위한 모범 사례
title: Dashboard List
---
## 개요 {#overview}

Dashboard List 기능을 사용하여 늘어나는 대시보드 컬렉션을 체계적으로 구성하고 간소화하세요. 대시보드를 목록으로 그룹화하고, 특정 Teams에 할당하고, 중요한 대시보드는 즐겨찾기로 표시하여 주요 시각화에 빠르게 액세스하세요. Teams별 필터링, 효율적인 관리를 위한 대량 작업, 여러 대시보드에 Teams 할당 등의 기능을 사용하여 대시보드를 더욱 체계적으로 관리하세요. [Dashboard List 페이지][1]에서 사용자 지정 또는 통합 대시보드를 손쉽게 탐색하고 생성 및 관리하세요.
대시보드 보기 및 관리:
- [{{< ui >}}All Dashboards{{< /ui >}} 표를 사용하여 목록을 정렬하고 검색 및 그룹화하세요.](#view-all-dashboards)
- [목록을 사용하여 대시보드 보기를 구성하세요.](#lists)

## 모든 대시보드 보기 {#view-all-dashboards}

{{< ui >}}All Dashboards{{< /ui >}} 표에는 Datadog 조직의 사용자 지정 대시보드와 기본 제공 대시보드가 나열됩니다. 표에서 여러 대시보드를 선택하여 [Teams](#teams)를 대시보드에 연결하거나 대시보드를 [목록](#lists)에 추가하는 등의 대량 작업을 수행할 수 있습니다.

{{< ui >}}Name{{< /ui >}}, {{< ui >}}Modified{{< /ui >}}, {{< ui >}}Popularity{{< /ui >}} 열 헤더를 기준으로 정렬할 수 있습니다.

| 열     | 설명                                                                              |
|------------|------------------------------------------------------------------------------------------|
| 별표       | 현재 사용자가 별표를 표시한 모든 대시보드입니다.                                              |
| 이름       | 사용자 지정 또는 사전 설정 대시보드의 이름입니다.                                              |
| 작성자     | 대시보드 생성자의 프로필 아이콘입니다.                                             |
| Teams      | 대시보드에 할당된 [Teams][2]입니다.                                                    |
| 수정됨   | 사용자 지정 대시보드를 마지막으로 수정한 날짜입니다.                                            |
| 인기도 | 조직 내 대시보드의 상대적인 [인기도](#popularity)입니다.           |
| 아이콘       | 대시보드 유형(Timeboard 또는 Screenboard)을 나타내는 아이콘입니다.                     |


### 인기도 {#popularity}

조직에서 가장 인기 있는 대시보드에는 인기도 막대 5개가 표시됩니다. 다른 모든 대시보드의 인기도는 이 대시보드를 기준으로 합니다. 인기도는 대시보드에 유입되는 트래픽 양을 기준으로 합니다. 인기도는 매일 업데이트되며, 새 대시보드에는 최대 24시간 동안 인기도 막대가 표시되지 않을 수 있습니다.

**참고**: 퍼블릭 대시보드 URL로 유입되는 트래픽은 인기도 계산에서 제외됩니다.

## Teams {#teams}

[팀 필터][3]를 사용하여 선택한 Teams가 소유한 대시보드만 표시하세요. 모든 대시보드를 다시 보려면 선택을 해제하세요.

하나 이상의 대시보드와 연결된 팀을 편집하려면 다음 단계를 따르세요.
1. 수정하려는 각 대시보드 옆의 확인란을 선택합니다.
1. 오른쪽 상단의 {{< ui >}}Edit Teams{{< /ui >}} 드롭다운을 엽니다.
1. 확인란을 사용하여 대시보드에 적절한 Teams를 선택합니다.
1. {{< ui >}}Apply Changes{{< /ui >}}를 클릭합니다.

## 목록 {#lists}

대시보드 목록은 대시보드를 그룹화하여 사용자와 팀이 동일한 컨텍스트 내에서 대시보드 간에 전환할 수 있도록 합니다. 대시보드를 [사전 설정 목록](#preset-lists)이나 사용자 지정 목록에 추가할 수 있습니다.

1. 대시보드 목록을 만들려면 오른쪽 상단의 {{< ui >}}\+ New List{{< /ui >}}를 클릭하세요.
1. 연필 아이콘을 클릭하여 목록 제목을 변경하세요. 목록 제목은 사용자의 이름으로 자동 설정됩니다. 예를 들어, `John's list`입니다.
1. 대시보드를 목록에 추가하세요. [{{< ui >}}All Dashboards{{< /ui >}}](#view-all-dashboards) 표에서 대시보드 제목 옆의 확인란을 선택하세요. 그런 다음 대시보드 목록 오른쪽 상단의 {{< ui >}}Add to{{< /ui >}} 드롭다운을 클릭하고 목록을 선택하세요.

왼쪽 사이드바에는 모든 목록이 표시되며, 팀 또는 검색어로 필터링할 수 있습니다. 이 사이드바를 숨기려면 {{< ui >}}Hide Controls{{< /ui >}}를 전환하세요.

### 즐겨찾기 목록 {#favorite-lists}

즐겨찾기 목록은 현재 로그인한 사용자가 별표를 표시한 대시보드 목록입니다. **참고**: 별표 표시된 목록이 없으면 {{< ui >}}Favorite Lists{{< /ui >}} 카테고리가 숨겨집니다.

### 사전 설정 목록 {#preset-lists}

사전 설정 목록은 Datadog의 기본 제공 대시보드 목록입니다.

| 목록                     | 설명                                                               |
|--------------------------|---------------------------------------------------------------------------|
| 모든 사용자 지정               | 조직 계정의 팀 구성원이 만든 사용자 지정 대시보드입니다. |
| 모든 호스트                | 호스트를 추가할 때 Datadog에서 자동으로 생성되는 대시보드입니다.              |
| 모든 통합         | 통합을 설치할 때 Datadog에서 자동으로 생성되는 대시보드입니다.  |
| 모든 공유               | 인증 또는 공개 링크 공유가 활성화된 대시보드입니다.             |
| 내가 생성함           | 현재 사용자가 생성한 사용자 지정 대시보드입니다.                            |
| 최근 삭제됨         | 지난 30일 이내에 삭제된 대시보드입니다. 이 목록에서 [삭제된 대시보드 복원](#restore-deleted-dashboards)을 수행할 수 있습니다.|
| 보안 및 규정 준수 | 기본 제공 보안 대시보드입니다.                                       |

### 삭제된 대시보드 복원 {#restore-deleted-dashboards}

사전 설정된 {{< ui >}}Recently Deleted{{< /ui >}} 목록을 사용하여 삭제된 대시보드를 복원하세요. 목록에서 복원할 모든 대시보드를 선택하고 {{< ui >}}Restore to{{< /ui >}}를 클릭하세요. 대시보드를 복원할 특정 목록을 선택하거나, {{< ui >}}All Custom{{< /ui >}}을 선택하여 사용자 지정 목록 없이 복원하세요. {{< ui >}}Recently Deleted{{< /ui >}}의 대시보드는 30일 후에 영구적으로 삭제됩니다.

{{< img src="dashboards/list/recently_deleted_restore.png" alt="최근 삭제된 항목 목록에서 삭제된 대시보드 복원" style="width:100%;">}}

## 검색 구문 {#search-syntax}

{{< callout url="#" btn_hidden="true" header="미리 보기" >}}
대시보드 검색 구문은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

Dashboard List 페이지 상단의 검색창을 사용하여 이름, 작성자, 태그 또는 위젯 콘텐츠별로 대시보드를 필터링하세요. 이 검색은 프리 텍스트 쿼리, 키:값 필터, 불리언 연산자 및 범위 비교를 지원합니다.

### 프리 텍스트 검색 {#free-text-search}

하나 이상의 단어를 입력하여 대시보드 제목, 설명, 작성자 이름, 태그 및 위젯 콘텐츠를 검색하세요.

- **단일 토큰**: `redis`는 제목, 작성자, 태그 또는 위젯에 'redis'가 포함된 대시보드와 일치합니다.
- **다중 토큰**: `redis postgres`는 `redis AND postgres`와 동일하며, 두 토큰이 모두 포함되어야 합니다.
- **따옴표로 묶인 구문**: `"web latency"`는 해당 구문과 정확히 일치합니다.
- **와일드카드**: `elastic*`은 'elasticsearch', 'elastic-search' 등과 일치합니다.

### 키:값 필터 {#keyvalue-filters}

`key:value` 구문을 사용하여 결과를 특정 필드로 좁히세요.

| 필터 | 설명 | 예시 |
|--------|-------------|---------|
| `author:<value>` | 작성자 핸들 또는 표시 이름이 | `author:jane.doe` |와 일치하는 대시보드
| `title:<value>` | 대시보드 제목 | `title:elasticsearch` |
| `description:<value>` | 대시보드 설명 | `description:latency` |
| `team:<value>` | 팀 태그 | `team:dashboards-backend` |
| `favorites:true` | 즐겨찾기에 추가한 대시보드 | `favorites:true` |
| `type:<value>` | 대시보드 유형 `custom`, `integration` 또는 `custom_timeboard`, `custom_screenboard`, `integration_timeboard`, `integration_screenboard`와 같은 구체적인 값을 사용하세요. | `type:integration` |
| `is_shared:true` | 링크 공유가 활성화된 대시보드 | `is_shared:true` |
| `popularity:<range>` | 인기도 점수(0~1) | `popularity:>=0.5` |
| `widgets.count:<range>` | 위젯 수 | `widgets.count:<5` |
| `widgets.title:<value>` | 위젯 제목 | `widgets.title:cpu` |
| `widgets.type:<value>` | 위젯 유형 | `widgets.type:geomap` |
| `widgets.metrics:<value>` | 위젯에 사용된 메트릭 | `widgets.metrics:system.cpu.user` |
| `template_variables.name:<value>` | 템플릿 변수 이름 | `template_variables.name:service` |
| `template_variables.prefix:<value>` | 템플릿 변수 접두사 | `template_variables.prefix:env` |
| `template_variables.defaults:<value>` | 템플릿 변수 기본값 | `template_variables.defaults:prod` |
| `template_variables.available_values:<value>` | 사용 가능한 템플릿 변수 값 | `template_variables.available_values:us-east` |

### 불리언 연산자 {#boolean-operators}

`AND`, `OR`, `NOT`을 사용하여 필터를 결합하세요(대소문자 구분). `-` 접두사와 `!` 접두사는 `NOT`과 동일합니다.

| 연산자 | 설명 | 예시 |
|----------|-------------|---------|
| `AND` | 두 조건 모두 일치해야 함 | `type:integration AND team:platform` |
| `OR` | 조건 중 하나라도 일치해야 함 | `k8s OR kubernetes` |
| `NOT` / `-` / `!` | 일치하는 대시보드 제외 | `NOT type:integration` |
| `field:(A OR B)` | 단일 필드 내에서 두 값 중 하나와 일치 | `team:(backend OR frontend)` |

### 범위 연산자 {#range-operators}

`<`, `>`, `<=`, `>=`을 숫자 필드와 함께 사용하세요.

| 필터 | 설명 | 예시 |
|--------|-------------|---------|
| `widgets.count:<N` | N개 미만의 위젯 | `widgets.count:<3` |
| `widgets.count:>=N` | N개 이상의 위젯 | `widgets.count:>=10` |
| `popularity:>=N` | 임계값 이상의 인기도 | `popularity:>=0.2` |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /ko/account_management/teams/
[3]: /ko/account_management/teams/#team-filter