---
aliases:
- /ko/graphing/widgets/scatter_plot/
description: 선택한 범위를 서로 다른 두 개의 메트릭과 각각의 집계 방식을 이용해 그래프로 표시하거나, 원시 이벤트를 그래프로 표시하여
  개별 데이터포인트를 검사합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 산점도 위젯
widget_type: scatterplot
---
산점도는 서로 다른 두 변수 집합에서 관찰된 변화 간의 가능한 관계를 식별합니다. 이는 두 변수 간 관계의 강도를 테스트할 수 있는 시각적·통계적 방법을 제공합니다. 산점도 시각화를 사용하면 선택한 범위를 서로 다른 두 개의 메트릭과 각각의 집계 방식을 이용해 그래프로 표시할 수 있습니다. 원시 이벤트를 그래프로 표시하여 개별 데이터포인트를 검사할 수도 있습니다.

{{< img src="dashboards/widgets/scatterplot/scatterplot2.png" alt="산점도 위젯 그래프에는 화면 해상도별 방문 수가 표시됩니다. X축에는 화면 너비가 표시되고, Y축에는 화면 높이가 표시됩니다." >}}

## 설정 {#setup}

### 구성 {#configuration}

1. X축 및 Y축에 사용할 메트릭 또는 기타 데이터 세트를 선택하고, 각각에 적용할 집계 방식을 선택합니다.
1. 산점도의 각 포인트에 대한 범위를 정의합니다(예: `host`, `service`, `app` 또는 `region`).
1. 선택 사항: 
    1. 색상별 태그를 활성화합니다.
    1. X축 및 Y축 설정을 지정합니다.
    1. 범례를 추가하여 데이터포인트를 목록으로 확인합니다.
    1. 그래프에 표시되는 단위를 설정합니다.
    1. 기본적으로 활성화되는 추가 [컨텍스트 링크][1]를 추가합니다. 컨텍스트 링크는 대시보드 위젯을 Datadog의 다른 페이지 또는 타사 애플리케이션과 연결합니다.
1. 위젯이 사용자 지정 타임프레임을 사용하는지 또는 대시보드의 글로벌 타임프레임을 사용하는지 선택합니다.
1. 그래프에 제목을 지정하거나 입력란을 비워 제안된 제목을 사용합니다.

## 집계된 데이터 및 집계되지 않은 데이터 {#aggregated-and-unaggregated-data}

산점도는 두 가지 데이터 모드를 지원하며, 그래프 편집기의 **모드** 토글을 사용하여 전환할 수 있습니다.

- **집계됨**: 필드별로 데이터를 그룹화하고 `avg` 또는 `sum`과 같은 집계를 적용합니다. 각 포인트는 집계된 그룹을 나타냅니다.
- **집계되지 않음**: 원시 이벤트를 그래프로 표시하며, 각 포인트는 로그, 스팬 또는 RUM 이벤트와 같은 단일 이벤트를 나타냅니다. 이 모드를 사용하여 집계로는 포착하기 어려운 이상치와 드물게 나타나는 클러스터를 식별하거나, 동일한 이벤트의 두 필드 간 상관관계를 분석하거나(예: 페이로드 크기가 지연 시간을 예측하는지 여부), 개별 LLM 트레이스를 그래프로 표시할 수 있습니다.

### 집계되지 않은 데이터 모드에서 지원되는 데이터 소스 {#supported-data-sources-for-unaggregated-mode}

다음 소스에서 집계되지 않은 데이터를 그래프로 표시할 수 있습니다.

- Logs
- RUM
- Agent Observability
- Product Analytics
- Spans
- Audit Trail
- Events
- Security Signals
- CI Pipelines
- Network
- Network Device Flows
- Synthetics Test Runs

### 집계되지 않은 데이터를 그래프로 표시 {#plot-unaggregated-data}

{{< img src="dashboards/widgets/scatterplot/scatterplot-mode-configuration.png" alt="산점도 위젯의 구성 화면에서 'Graph your data' 섹션이 표시됩니다. 'Configure Points' 하위 섹션에서 모드가 집계되지 않은 데이터로 설정되어 있습니다." >}}

[대시보드][4]에서 다음 단계를 따르세요.

1. 대시보드에서 산점도 위젯을 열거나 생성합니다.
1. 그래프 편집기에서 원시 이벤트를 지원하는 데이터 소스를 선택합니다.
1. **Mode**를 **집계되지 않은 데이터**로 설정합니다.
1. **Add Measure**를 클릭하여 X축과 Y축을 구성합니다.

개별 이벤트가 그래프에 포인트로 표시됩니다.

## Navigation {#navigation}

산점도 위로 마우스를 가져가면 오른쪽 상단 모서리에 컨트롤이 표시됩니다.

- **Show density**: 데이터 포인트가 가장 집중된 위치를 나타내는 밀도 등고선을 오버레이하여 클러스터와 패턴을 식별하는 데 도움을 줍니다. 활성화하면 컨트롤이 **Hide density**로 변경됩니다.
- **Zoom in** (**+**) 및 **Zoom out** (**-**): 확대/축소 수준을 변경하여 데이터의 특정 영역에 초점을 맞춥니다.
- **Reset View**: 기본 확대/축소 및 위치로 그래프를 되돌립니다.

산점도를 클릭한 상태에서 직접 드래그하여 데이터를 이동합니다.

산점도는 이상치나 최대값과 같은 주목할 만한 포인트에 자동으로 레이블을 지정합니다.

## API {#api}

이 위젯은 **[Dashboards API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]는 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/guide/context-links/
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/
[4]: https://app.datadoghq.com/dashboard/