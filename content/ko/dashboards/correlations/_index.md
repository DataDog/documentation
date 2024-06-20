---
aliases:
- /ko/graphing/correlations/
further_reading:
- link: /dashboards/
  tag: 설명서
  text: Datadog 대시보드
- link: /notebooks/
  tag: 설명서
  text: Datadog 노트북
- link: /tracing/services/service_page/
  tag: 설명서
  text: APM 서비스 페이지
- link: /watchdog/
  tag: 설명서
  text: Watchdog
title: 메트릭 상관관계
---

## 개요

<div class="alert alert-info">메트릭 상관관계는 <strong>메트릭</strong> 데이터 소스가 있는 <a href="https://docs.datadoghq.com/dashboards/widgets/timeseries/">시계열 위젯</a>에 사용할 수 있습니다.

메트릭 상관관계는 거의 동시에 불규칙한 동작을 보인 기타 메트릭을 검색하여 관찰된 문제의 잠재적인 근본 원인을 찾는 데 도움이 될 수 있습니다. 상관관계는 대시보드, 통합, APM 및 커스텀 메트릭과 같은 다양한 소스에서 메트릭을 스캔합니다.

## 검색

대시보드, 노트북, APM, Watchdog 경고 또는 모니터 상태 페이지에서 메트릭 상관관계 탐색을 시작할 수 있습니다.

* 그래프를 마우스 왼쪽 버튼으로 클릭하고 **Find correlated metrics**를 선택합니다.
* 전체 화면 그래프에서 **Correlations** 탭을 클릭합니다.

{{< img src="dashboards/correlations/find_correlated_metrics.png" alt="대시보드 그래프 메뉴 옵션 상호 연관된 메트릭 찾기" style="width:80%;">}}

{{< img src="dashboards/correlations/correlations_tab.png" alt="대시보드 검색" style="width:80%;">}}

상관관계는 메트릭에 대한 관심 영역(비정상적 동작)을 자동으로 감지하려고 *시도*합니다. 관심 영역이 자동으로 선택되지 않거나 조정이 필요한 경우 [edit search](#edit) 옵션에서 관심 영역을 수동으로 그릴 수 있습니다. Datadog은 관심 영역과 일치하는 시간에 비정상적인 동작을 나타내는 다른 메트릭을 검색합니다.

**참고**: 상관관계 검색은 단일 메트릭에 사용할 수 있습니다. 다중 메트릭이 있는 그래프의 경우 다수의 관심 영역을 선택하세요. 전체 화면 그래프에서 그래프 범례의 한 계열을 선택한 다음 **Correlations** 탭을 클릭합니다.

### 편집

상관관계의 기본 검색 파라미터를 사용자 정의할 수 있습니다. 전체 화면 그래프의 *Correlations* 탭에서 **Edit Search** 버튼을 클릭하거나 그래프를 직접 클릭하세요.

* 상관관계 검색을 위한 시간 프레임을 설정하려면 그래프를 클릭하고 드래그하세요. 특정 영역이 이미 선택된 경우(분홍색 상자) 선택 영역을 이동하거나 크기를 조정할 수 있습니다.
* 상관관계를 검색할 소스(APM 서비스, 통합, 대시보드 또는 커스텀 메트릭)를 정의합니다.
* 특정 카테고리에서 `Auto-select` 또는 `Custom select` 동 작업을 수행합니다. 커스텀 메트릭의 경우 하나 이상 선택해야 합니다.
* 커스텀 메트릭은 기본적으로 선택되지 않은 유일한 카테고리입니다. 상관관계를 검색할 메트릭 네임스페이스 또는 단일 메트릭을 선택하세요.
* 태그 필터 상자를 사용하여 태그로 검색 범위를 지정하세요.

### 결과

검색 그래프 아래에 다음과 같은 검색 결과 목록이 표시됩니다.

* **Type**: 소스 유형(APM 서비스, 통합, 대시보드 또는 커스텀 메트릭)을 나타내는 그래픽입니다.
* **Source**: 상관 메트릭의 소스 이름입니다.
* **Correlations**: 검색된 상관 메트릭 수입니다.
* **Preview**: 상관 메트릭의 미리보기 그래프입니다.

{{< img src="dashboards/correlations/search_results.png" alt="검색 결과" style="width:80%;">}}

결과가 로드되면 모든 결과를 기다리지 않고도 상세 정보를 탐색할 수 있습니다. 검색이 완료되면 "Search completed!"라는 메시지가 표시됩니다.

## 조사

[결과 목록](#results)에서 해당 상관관계의 세부정보를 확인할 행을 선택하세요.

* 대시보드와 마찬가지로 그래프 위로 마우스를 가져가면 다른 모든 그래프에 시간 동기화 라인이 생성됩니다.
* 모든 소스를 보려면 메뉴에서 필터를 제거하세요.
* 각 메트릭의 소스는 이름으로 연결됩니다. 예를 들어, 대시보드 이름은 해당 대시보드에 연결됩니다.
* 내보내기 아이콘을 사용하여 그래프를 대시보드, 노트북으로 내보내거나, 쿼리를 복사합니다.

{{< img src="dashboards/correlations/correlated_metric_source_details.png" alt="상호 관련된 메트릭 소스의 세부정보 보기" style="width:90%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}