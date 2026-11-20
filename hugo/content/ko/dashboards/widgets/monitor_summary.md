---
aliases:
- /ko/graphing/widgets/monitor_summary/
description: '모든 Datadog 모니터의 요약 보기 또는 쿼리를 기반으로 한 하위 집합의 요약 보기를 표시합니다. '
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 모니터 요약 위젯
widget_type: manage_status
---

모니터 요약 위젯은 모든 Datadog 모니터의 요약 보기 또는 쿼리를 기반으로 한 하위 집합의 요약 보기를 표시합니다.

{{< img src="dashboards/widgets/monitor_summary/monitor-summary-overview.png" alt="모니터 요약" >}}

## 구성

### 설정

1. 세 가지 요약 유형 중 하나를 선택하세요: `Monitor`, `Group` 또는 `Combined`
    - `Monitor` 요약 유형은 [모니터 쿼리][1]와 일치하는 모니터의 상태와 이름 목록을 표시합니다. 결과 목록에는 다중 경고 모니터 행이 하나만 있으며 해당 행의 상태는 다중 경고 모니터의 전반적인 상태를 나타냅니다. 상태 개수는 각 상태 유형과 일치하는 모니터의 수를 나타냅니다.

    {{< img src="dashboards/widgets/monitor_summary/monitor_summary_type.png" alt="모니터 요약 유형" style="width:80%;">}}

    - `Group` 요약 유형은 상태, 이름, 모니터 쿼리와 일치하는 모니터 그룹 목록을 표시합니다. 다중 경고 모니터는 결과 목록에서 여러 행으로 나뉘며, 다중 경고 모니터에서 각 그룹 및 해당 그룹의 특정 상태와 상응합니다. `Group` 요약 유형은 [Triggered Monitors][2] 페이지와 비슷하게 모니터 쿼리에서 `group` 및 `group_status` 패싯도 지원합니다. 상태 개수는 각 상태 유형과 일치하는 모니터 그룹의 수입니다.

    {{< img src="dashboards/widgets/monitor_summary/group_summary_type.png" alt="그룹 요약 유형" style="width:80%;">}}

    - `Combined` 요약 유형은 그룹 상태의 수와 모니터 쿼리와 일치하는 모니터의 이름 목록을 표시합니다. 다중 경고 모니터는 `Monitor` 요약 유형과 같이 결과 목록에 하나의 행만 있지만 그룹 열에는 모니터의 전체 상태가 아닌 각 상태 유형의 그룹 수가 표시됩니다. `Group` 요약 유형과 마찬가지로 `Combined` 요약 유형도 모니터 쿼리에서 `group` 및 `group_status` 패싯을 지원합니다. 상태 개수는 여전히 `Monitor` 요약 유형과 같이 전반적인 모니터 상태의 개수를 표시합니다.

    {{< img src="dashboards/widgets/monitor_summary/combined_summary_type.png" alt="결합된 요약 유형" style="width:80%;">}}

2. 모니터 쿼리를 입력하여 모니터들의 하위 집합에 대한 모니터 요약 위젯을 표시하세요.

   **참고** 위 링크에 나열된 패싯들 외에도 `Group` 및 `Combined` 요약 유형들도 [Triggered Monitors][2] 페이지처럼 그룹 수준 검색을 위한 `group` 및 `group_status` 패싯들을 지원합니다. 

#### 템플릿 변수

모니터 요약 검색 쿼리의 대시보드에서 생성된 템플릿 변수들을 사용하려면 모니터 관리 페이지와 같은 쿼리 형식을 따르세요.

**예시**

1. `$service` 템플릿 변수를 사용하여 모니터 `scope`를 필터링하기.

   관리 또는 트리거된 모니터 페이지에서 `scope`을 활용하려면 `scope:service:web-store`를 수행해야 합니다.
   따라서 템플릿 변숫값을 위젯에 적용하려면 위젯에서 `scope:$service`를 수행해야 합니다.

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-scope.png" alt="범위 템플릿 변수" style="width:80%;">}}


2. `$env` 템플릿 변수를 사용하여 `group` 모니터를 필터링하기.

   관리 또는 트리거된 모니터 페이지에서 `group`을 활용하려면 `group:env:prod`를 수행해야 합니다.
   따라서 위젯에서 템플릿 변숫값을 위젯에 적용하려면 `group:$env`를 수행해야 합니다.

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-group.png" alt="그룹 템플릿 변수" style="width:80%;">}}

## 옵션

#### 표시 기본 설정

모니터 상태 유형별 모니터의 `Count`, 모니터의 `List` 또는 `Both`만 표시하기로 선택합니다. `Text` 및 `Background` 옵션들은 상태 개수의 텍스트 또는 배경에 상태 색상을 적용할지 여부를 지정합니다. `Hide empty Status Counts` 옵션을 활성화하면 결과 목록에 모니터가 하나 이상인 상태에 대한 상태 개수만 표시합니다.

{{< img src="dashboards/widgets/monitor_summary/display-preferences.png" alt="표시 기본 설정" style="width:80%;">}}

`Show triggered column` 옵션을 선택하면 결과를 트리거된 상태(예: `Alert`, `Warn`또는 `No Data`)에 있는 모니터 또는 모니터 그룹들로 필터링하고, 가장 최근에 트리거된 상태부터 가장 나중에 트리거된 상태 순으로 정렬합니다. 모니터/그룹이 마지막으로 트리거된 이후 경과된 시간을 나타내는 열이 추가됩니다.

{{< img src="dashboards/widgets/monitor_summary/monitor-summary.png" alt="표시 기본 설정" style="width:80%;">}}

## API

해당 위젯은 **[대시보드 API][3]**와 함께 사용할 수 있습니다.  [위젯 JSON 스키마 정의][4]에 대해서는 다음 표를 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/monitors/manage/
[2]: /ko/monitors/manage/#grouped-results
[3]: /ko/api/latest/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/