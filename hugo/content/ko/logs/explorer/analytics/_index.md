---
aliases:
- /ko/logs/explorer/group
- /ko/logs/group
description: 쿼리된 로그를 필드, 패턴 및 트랜잭션으로 그룹화하고 심층 분석을 위해 여러 검색 쿼리, 수식 및 함수를 만듭니다.
further_reading:
- link: logs/explorer/search
  tag: 설명서
  text: 필터 로그
- link: logs/explorer/visualize
  tag: 설명서
  text: 로그에서 시각화 생성
- link: /logs/explorer/export
  tag: 설명서
  text: Log Explorer 뷰 내보내기
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: 블로그
  text: 참조 테이블을 사용하여 로그에 더 많은 컨텍스트 추가
title: 로그 분석
---

## 개요

로그는 개별 이벤트로서 가치가 있습니다. 하지만 중요한 정보가 이벤트의 하위 집합에 존재하는 경우도 있습니다.

{{< whatsnext desc="이 정보를 노출하려면 로그를 다음과 같이 그룹화할 수 있습니다.:" >}}
    {{< nextlink href="logs/explorer/analytics/#group-logs-by-fields" >}}필드{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/patterns" >}}패턴{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/transactions" >}}트랜잭션{{< /nextlink >}}
{{< /whatsnext >}}

로그 쿼리 편집기에서 쿼리한 로그의 집계를 전환할 수 있습니다. 로그 그룹화, 집계 및 측정을 위해 선택한 필드는 다른 보기 및 집계 유형을 전환해도 저장됩니다.

{{< img src="logs/explorer/aggregations.jpg" alt="로그와 필드, 패턴, 트랜잭션으로 그룹화하는 옵션을 표시하는 막대 그래프" style="width:100%;" >}}

[다중 쿼리](#multiple-queries)를 추가하여 다양한 로그 집합을 동시에 분석하고, 쿼리에 [수식](#formulas) 및 [함수](#functions)를 적용하여 심층 분석할 수 있습니다.

집계는 **인덱싱된 로그에만** 지원됩니다. 색인화되지 않은 로그에 대해 집계를 수행해야 하는 경우 [일시적으로 제외 필터 비활성화][1], [로그 기반 메트릭][2] 생성 및/또는 아카이브에서 [리하이드레이션][3] 실행을 고려하세요.

## 필드별로 로그 그룹화

**Fields**를 기준으로 인덱싱된 로그를 집계하면 쿼리 필터와 일치하는 모든 로그가 그룹으로 집계됩니다(쿼리 검색값 기준).

이러한 집계 외에 다음 측정값을 추출할 수 있습니다.

- 그룹당 **로그 수**
- 그룹별 쿼리 검색 값에 대한 **고유 코딩된 값의 수*(UI에 `count unique of`로 표시됨)
- 그룹별 쿼리 검색 값의 수치에 대한 **통계 연산**(`min`,`max`,`avg`,`percentiles`)

여러 쿼리 검색 값이 포함된 개별 로그는 그만큼 많은 집계에 속합니다. 예를 들어 `team:sre` 및 `team:marketplace` 태그가 있는 로그는 `team:sre` 집계에서 한 번, `team:marketplace` 집계에서 한 번 계산됩니다.

### 로그 그룹 시각화

**Fields** 집계는 [상위 목록][4] 시각화에 대해 하나의 차원을 지원하고 [시계열][5], [테이블][6], [트리 맵][7], [파이 차트][8]에 대해 최대 4개의 차원을 지원합니다.

측정 차원이 여러 개인 경우 첫 번째 차원에 따라 상위 값이 결정되고, 첫 번째 차원의 상위 값 내에서 두 번째 차원에 따라 결정되고, 두 번째 차원의 상위 값 내에서 세 번째 차원에 따라 결정됩니다.

### 여러 쿼리

[시계열][5] 및 [테이블][6] 시각화에서는 여러 쿼리가 지원됩니다. 쿼리 편집기 옆에 있는 `+ Add` 버튼을 클릭하여 여러 쿼리를 추가합니다. 새 쿼리를 추가하면 마지막 쿼리와 해당 그룹화 옵션의 복사본이 됩니다.

{{< img src="logs/explorer/group/add_multiple_queries.mp4" alt="쿼리 편집기에서 여러 쿼리를 추가하는 방법을 보여주는 사용자" video=true style="width:100%;" >}}

쿼리 편집기에서 문자를 클릭하여 현재 시각화에 표시할 쿼리를 선택하거나 선택 취소합니다.

{{< img src="logs/explorer/group/select_multiple_queries.jpg" alt="두 개의 쿼리가 있는 쿼리 편집기(하나는 A로 표시되고 다른 하나는 B로 표시됨)" style="width:100%;" >}}

기본적으로 새 쿼리가 추가되면 선택한 시각화에 표시되도록 자동으로 선택됩니다.

`Timeline for` 드롭다운에서 해당 쿼리를 선택하여 쿼리 중 하나에 대한 타임라인을 표시합니다. `Use facets with` 드롭다운에서 해당 쿼리를 선택하고 [패싯 패널][9]에서 값을 클릭하여 검색 쿼리 중 하나의 범위를 지정하세요. 선택한 쿼리만 선택한 패싯으로 업데이트됩니다.

{{< img src="logs/explorer/group/query_selector.jpg" alt="쿼리 A 및 쿼리 B에 대한 드롭다운 옵션이 있는 선택기의 타임라인을 보여주는 쿼리 편집기" style="width:100%;" >}}

### 함수

함수는 모든 시각화에서 지원됩니다.

쿼리 편집기에서 `Fields` 집계를 클릭하여 로그에 함수를 적용하세요. 필요에 따라 함수를 적용할 패싯 필드를 선택한 후 해당 측정값 옆에 있는 `Σ` 아이콘을 클릭합니다. 선택한 로그 필드에 적용할 함수를 선택하거나 검색하세요.

{{< img src="logs/explorer/group/add_function.mp4" alt="쿼리 편집기를 사용해 함수를 맞춤 설정하는 사용자" video=true style="width:100%;" >}}

Dashboards의 그래프 편집기에서 로그에 사용할 수 있는 모든 함수는  Log Explorer의 로그에 적용할 수 있습니다.

- [Arithmetic][10]
- [Interpolation][11]
- [Timeshift][12]
- [Rate][13]
- [Smoothing][14]
- [Rollup][15]
- [Exclusion][16]

다음은 [Exclusion 함수][16]를 적용하여 로그의 특정 값을 제외하는 방법의 예입니다.

{{< img src="logs/explorer/group/exclusion_function_logs.jpg" alt="컷오프 최소 제외 필터가 100으로 설정된 쿼리" style="width:100%;" >}}

### 수식

쿼리 편집기 옆에 있는 `+ Add` 버튼을 클릭하여 하나 이상의 쿼리에 수식을 적용합니다. 다음 예에서는 수식을 사용하여 `Merchant Tier: Enterprise` / `Merchant Tier: Premium` 고객에 대해 로그에서 `Cart Id` 고유 수 비율을 계산합니다.

{{< img src="logs/explorer/group/multiple_query_formula.jpg" alt="쿼리 A를 쿼리 B로 나누는 수식이 포함된 쿼리 편집기" style="width:100%;" >}}

여러 쿼리가 포함된 수식을 적용하려면 모든 쿼리를 동일한 쿼리 검색 값으로 그룹화해야 합니다. 위의 예에서 두 쿼리는 모두 `Webstore Store Name`로 그룹화됩니다.

`Σ` 아이콘을 클릭하면 수식에 함수를 적용할 수 있습니다. 다음은 전체 로그의 오류 로그 비율에 [Timeshift 함수][12]를 적용하여 현재 데이터와 일주일 전 데이터를 비교하는 방법의 예입니다.

{{< img src="logs/explorer/group/timeshift_function_logs.jpg" alt="Timeshift 함수가 적용된 일주일 전의 수식을 보여주는 쿼리 편집기" style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/indexes/#switch-off-switch-on
[2]: /ko/logs/logs_to_metrics
[3]: /ko/logs/log_configuration/rehydrating/
[4]: /ko/logs/explorer/visualize/#top-list
[5]: /ko/logs/explorer/visualize/#timeseries
[6]: /ko/logs/explorer/visualize/#nested-tables
[7]: /ko/dashboards/widgets/treemap
[8]: /ko/dashboards/widgets/pie_chart
[9]: /ko/logs/explorer/facets/#facet-panel
[10]: /ko/dashboards/functions/arithmetic
[11]: /ko/dashboards/functions/interpolation
[12]: /ko/dashboards/functions/timeshift
[13]: /ko/dashboards/functions/rate
[14]: /ko/dashboards/functions/smoothing
[15]: /ko/dashboards/functions/rollup
[16]: /ko/dashboards/functions/exclusion