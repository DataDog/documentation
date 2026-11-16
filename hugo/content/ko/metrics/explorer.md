---
aliases:
- /ko/graphing/metrics/explorer/
description: 모든 메트릭을 살펴보고 분석을 수행하세요.
further_reading:
- link: /metrics/summary/
  tag: 설명서
  text: Metrics Summary
- link: /metrics/distributions/
  tag: 설명서
  text: Metrics Distributions
- link: /dashboards/guide/quick-graphs/
  tag: 설명서
  text: Quick Graphs
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: 블로그
  text: Observability Pipelines를 사용하여 환경 내의 메트릭 볼륨과 태그 관리하기
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: 블로그
  text: 자연어 쿼리를 사용하여 Datadog 메트릭 탐색하기
title: Metrics Explorer
---
## 개요 {#overview}

[Metrics Explorer][1]는 Datadog에서 메트릭을 검토하기 위한 기본 인터페이스입니다. 고급 옵션을 설정하려면 [노트북][2] 또는 대시보드([스크린보드][3] 또는 [타임보드][4])를 생성하세요.

## 자연어 쿼리 {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">Metrics Explorer용 자연어 쿼리는 선택한 Datadog 사이트({{< region-param key="dd_site_name" >}})에서 사용할 수 없습니다.</div>
{{< /site-region >}}

자연어 쿼리(NLQ)를 사용하여 찾고 있는 내용을 쉬운 영어로 설명하세요. Datadog은 서비스, 속성, 태그와 같은 컨텍스트를 이해하여 요청을 구조화된 메트릭 쿼리로 자동 변환합니다. 이를 통해 복잡한 구문을 작성할 필요 없이 메트릭을 더 쉽게 탐색할 수 있습니다.

이 기능에 액세스하려면 검색 필드에서 {{< ui >}}Ask{{< /ui >}}를 클릭한 후 쿼리를 입력하세요.

{{< img src="/metrics/explorer/metrics_nlq_example_10152025.mp4" alt="쉬운 영어 문구를 사용하여 메트릭을 검색하는 방법을 보여주는 Metrics Explorer의 자연어 쿼리" video=true >}}

조직에 대해 NLQ를 비활성화하려면 [org_management 권한][11]이 있어야 합니다. {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Preferences{{< /ui >}}로 이동하고 자연어 쿼리 기능을 끄세요.

## 세션 {#sessions}

Metrics Explorer는 최근 조사 기록을 자동으로 유지하므로 이전 작업을 다시 작성할 필요 없이 다양한 질문을 더 쉽게 탐색하고 공유할 수 있습니다.

세션을 사용하여 다음 작업을 수행할 수 있습니다.

- **별도의 조사 시작:** {{< ui >}}New Session{{< /ui >}}을 클릭하여 현재 작업을 유지하면서 다른 질문을 탐색할 수 있습니다.
- **이전 작업으로 돌아가기:** 최근 세션을 선택하거나 검색하여 조사를 계속 진행할 수 있습니다.
- **중요한 조사 보존:** 나중에 더 쉽게 인식하고 찾을 수 있도록 세션을 고정하고 이름을 변경할 수 있습니다.
- **대안 탐색:** 세션을 복제하여 원본을 보존하는 상태에서 복사본을 수정할 수 있습니다.
- **조사 공유:** 세션 링크를 복사하여 다른 사용자와 공유할 수 있습니다.
- **사용하지 않는 세션 제거:** 더 이상 필요하지 않은 세션을 삭제합니다.

{{< img src="metrics/explorer/09282026_metric_explorer_sessions.png" alt="Metrics Explorer 세션 예시" style="width:80%;" >}}

## Graphing {#graphing}

쿼리 편집기를 사용하여 Metrics Explorer 페이지에 표시된 그래프를 사용자 지정하세요.

페이지 오른쪽 상단에서 타임프레임을 지정할 수 있습니다. 기본값은 {{< ui >}}Past 1 Hour{{< /ui >}}입니다.

{{< img src="metrics/explorer/metrics_explorer.png" alt="막대 그래프에 쿼리 2개를 표시하는 Metrics Explorer" style="width:80%;" >}}

지난 24시간 동안 보고되지 않은 메트릭은 쿼리 편집기에 나타나지 않습니다. 메트릭 이름 또는 전체 쿼리를 입력하여 이러한 메트릭을 그래프에 수동으로 추가할 수 있습니다.

### 범위 {#scope}

{{< ui >}}from{{< /ui >}} 텍스트 상자를 사용하여 태그 값을 선택하거나 검색하여 필터링 범위를 정의할 수 있습니다. 예를 들어, {{< ui >}}from{{< /ui >}} 텍스트 상자를 사용하면 특정 호스트, 클러스터, 환경 또는 리전의 메트릭 값을 필터링할 수 있습니다.

### 공간 집계 {#space-aggregation}

메트릭 값을 결합하는 데 사용되는 [공간 집계][5]를 정의하세요.

가능한 옵션:

* 보고된 값의 평균(기본값)
* 보고된 값의 최댓값
* 보고된 값의 최솟값
* 보고된 값의 합계

**참고**: 옵션은 선택한 메트릭 유형에 따라 달라질 수 있습니다.

### 함수 및 수식 {#functions-and-formulas}

필요시 함수 버튼을 사용하여 쿼리에 함수를 추가할 수 있습니다. 모든 메트릭 유형에 모든 함수를 사용할 수 있는 것은 아닙니다. 자세한 내용은 [쿼리][6] 설명서를 참조하세요. 

### 분할 그래프 {#split-graph}

{{< ui >}}Split Graph{{< /ui >}} 버튼을 사용하여 리전, 서비스 또는 환경과 같은 태그 값을 기준으로 개별 그래프로 분할된 데이터를 조회할 수 있습니다.

### 내보내기 {#export}

{{< ui >}}Export{{< /ui >}} 버튼(<i class="icon-export"></i>)을 사용하여 그래프를 내보낼 수 있습니다.

- 공유할 그래프 링크 복사
- 링크를 [인시던트][8]에 추가
- [모니터링][9] 생성
- [대시보드][10]에 저장
- [노트북][2]에 저장 

### Quick Graphs {#quick-graphs}

Quick Graphs를 사용하면 [대시보드][4]나 [노트북][2]을 생성할 필요 없이 데이터를 시각화할 수 있는 더 많은 옵션을 이용할 수 있습니다. 이러한 그래프는 영구적인 대시보드나 복잡한 시각화 설정을 만들지 않아도 문제를 파악하고 해결하는 데 유용합니다.

자세한 내용은 [Quick Graphs][7] 설명서를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: /ko/notebooks/
[3]: /ko/dashboards/#screenboards
[4]: /ko/dashboards/#get-started
[5]: /ko/metrics/introduction/#space-aggregation
[6]: /ko/dashboards/querying/#advanced-graphing
[7]: /ko/dashboards/guide/quick-graphs/
[8]: /ko/incident_response/incident_management/
[9]: /ko/monitors/
[10]: /ko/dashboards/
[11]: /ko/account_management/rbac/permissions/#access-management