---
description: 각 태그 그룹을 고유한 색상으로 구분된 행에 표시하여 여러 태그 그룹의 시계열 데이터를 비교할 수 있습니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 히트그리드 위젯
widget_type: heatgrid
---
{{< img src="dashboards/widgets/heatgrid/heatgrid.png" alt="히트그리드 위젯 시각화 예시" style="width:100%;">}}

히트그리드 위젯은 태그별로 그룹화된 시계열 데이터를 표시하며, 각 그룹은 별도의 행에 표시되고 값은 색상으로 표현됩니다. 이를 통해 그룹 수가 많더라도 변화를 쉽게 파악하고 그룹을 직접 비교할 수 있습니다.

## 설정 {#setup}

### 구성 {#configuration}

1. 행 간 비교에 사용할 태그를 기준으로 그룹화하도록 쿼리를 구성합니다. 쿼리 결과의 각 그룹은 그리드에서 별도의 행으로 표시됩니다.
   {{< img src="dashboards/widgets/heatgrid/heatgrid_colors.png" alt="정렬, 행 레이블 너비, 범례 및 색상 옵션이 표시된 히트그리드 구성 패널" style="width:90%;">}}
1. {{< ui >}}Sort rows by{{< /ui >}}: **평균값**, **최대값**, **최소값**, **값의 합계** 또는 **레이블**을 기준으로 행을 오름차순 또는 내림차순으로 정렬합니다.
1. {{< ui >}}Colors{{< /ui >}}: 쿼리 값이 행 색상에 매핑되는 방식을 구성합니다.
   - {{< ui >}}Scheme{{< /ui >}}: 사전 설정된 색상 체계를 선택하거나 **Format stops**에서 개별 중지점의 색상 또는 위치를 편집하여 사용자 지정합니다.
   - {{< ui >}}Apply as{{< /ui >}}: **Continuous Gradient**를 선택하여 값을 부드러운 색상 척도에 따라 매핑하거나, **Discrete Conditions**를 선택하여 값 범위를 특정 색상에 매핑합니다.
   - 사용자 지정 그라데이션의 경우, 척도를 따라 중지점을 추가하고 각 중지점에 대한 색상과 위치(0~100%)를 설정합니다.
   - 사용자 지정 불연속 조건의 경우, 각 조건에 대한 색상과 값 범위(하한 및 상한)를 정의합니다. 첫 번째 조건에는 하한이 없고 마지막 조건에는 상한이 없으므로, 조건들이 합쳐져 전체 값 범위를 포괄합니다. **참고**: 첫 번째 버킷의 하한은 데이터 전체의 최소값이며, 마지막 버킷의 상한은 최대값입니다.
   - 각 그라데이션 또는 불연속 조건 세트는 2~6개의 중지점이나 조건을 지원합니다.
1. {{< ui >}}Row label width{{< /ui >}}: 사전 설정된 크기를 사용하여 행 레이블 열의 너비를 선택합니다. 기본적으로 Datadog은 현재 표시된 레이블의 너비에 가장 가까운 크기를 선택합니다.
1. {{< ui >}}Show legend label{{< /ui >}}: 범례 레이블을 표시하거나 숨기려면 전환합니다.

### 옵션 {#options}

#### 단위 재정의{#unit-override}

그리드와 툴팁에 표시되는 단위를 구성합니다.

#### 컨텍스트 링크 {#context-links}

[컨텍스트 링크][1]는 기본적으로 활성화되어 있으며, 켜거나 끌 수 있습니다. 컨텍스트 링크는 대시보드 위젯을 다른 페이지(Datadog 또는 타사)와 연결합니다.

## <!-- API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]는 다음 표를 참조하세요.

{{< dashboards-widgets-api >}} -->

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/guide/context-links/
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/