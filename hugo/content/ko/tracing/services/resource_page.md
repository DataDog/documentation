---
aliases:
- /ko/tracing/visualization/resource/
further_reading:
- link: https://www.datadoghq.com/blog/dependency-map-navigator/
  tag: 블로그
  text: 종속성 맵 내비게이터를 사용하여 서비스 다운스트림의 성능 문제를 정확히 파악합니다.
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 애플리케이션 성능 모니터링(APM) 추적 설정 방법 알아보기
- link: /tracing/service_catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스 검색 및 카탈로그 작성
- link: /tracing/services/service_page/
  tag: 설명서
  text: Datadog 서비스에 대해 자세히 알아보기
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Datadog 트레이스 읽는 법 이해하기
title: 자원현황 페이지
---

{{< img src="tracing/visualization/resource/resource-page-cropped.png" alt="주요 메트릭의 모니터링 상태와 트렌드를 보여주는 APM 자원현황 페이지" >}}

리소스는 정해진 [서비스][1](일반적으로 개별 엔드포인트 또는 쿼리)에 대한 특정 작업입니다. 리소스에 대한 자세한 내용을 확인하려면 [애플리케이션 성능 모니터링(APM) 시작하기][2]를 참조하세요. 각 리소스에 관하여 애플리케이션 성능 모니터링(APM)은 다음을 포함한 대시보드 페이지를 자동으로 생성합니다.

* 주요 서비스 상태 메트릭
* 해당 서비스와 연관된 모든 모니터링의 모니터링 상태
* 해당 서비스와 연관된 모든 리소스의 메트릭 목록

## 기본 제공 그래프

Datadog은 주어진 리소스에 대한 기본 그래프를 제공해 드립니다. 각 그래프의 드롭다운 메뉴를 사용하여 표시 정보를 변경할 수 있습니다.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="초당 요청, 레이턴시, 총 오류, 서비스당 소요 퍼센트 시간을 보여주는 기본 제공 리소스 그래프" style="width:90%;">}}

{{% apm-ootb-graphs %}}

### 대시보드로 내보내기

각 그래프의 우상단에서 위쪽 화살표를 클릭하면 기존 [대시보드][4]로 그래프를 내보낼 수 있습니다.

### 레이턴시 분포

자원현황 페이지에는 다음과 같이 리소스 레이턴시 분포 그래프도 표시됩니다.

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="리소스 요청당 소요된 시간 분포를 보여주는 레이턴시 분포 그래프" style="width:100%;">}}

우상단의 백분위수 선택기를 사용하여 특정 백분위수를 확대하거나, 사이드바 위로 마우스를 올리면 백분위수 마커를 볼 수 있습니다.

{{< img src="tracing/visualization/service/latency_distribution_sidebar.png" alt="백분위수 필터링이 가능한 레이턴시 분포 그래프 사이드바의 클로즈업" style="width:50%;">}}

## 내비게이터로 종속성 매핑

리소스의 업스트림 및 다운스트림 서비스 종속성 맵을 전부 확인할 수도 있습니다. 서비스 종속성 맵 내비게이터를 사용하면 요청 카운트, 특정 리소스(엔드포인트, 데이터베이스 쿼리 등) 엔드 투 엔드 처리 스팬(span)과 함께 서비스 플로우를 확인할 수 있습니다.

본 맵은 수집한 스팬(span) 샘플에 기반하며, 샘플은 트레이스의 구조를 고려하는 고정 샘플링 알고리즘이 생성합니다. 샘플링 알고리즘은 설정할 수 없으며 수집 제어의 영향을 받지 않습니다.

종속성 맵은 서비스 엔트리 스팬(span)이 포함된 리소스에만 사용할 수 있습니다.

{{< img src="tracing/visualization/resource/dependency-map-navigator-cropped.png" alt="서비스 종속성 목록과 서비스 간의 요청 다이어그램 플로우가 있는 리소스용 종속성 맵." style="width:100%;" >}}

노드 위로 마우스를 올리면 초당 요청 수, 오류율, 평균 레이턴시를 포함한 각 서비스의 메트릭을 확인할 수 있습니다. 노드를 클릭하면 서비스(현황) 페이지, 관련 트레이스 등을 볼 수 있는 옵션이 포함된 컨텍스트 메뉴가 열립니다.

노드의 하이라이트 색상은 서비스의 [모니터링 상태][5]를 나타냅니다. 서비스에 설정 모니터링이 두 개 이상인 경우 가장 심각한 모니터링 상태가 표시됩니다.

{{< img src="tracing/visualization/resource/dependency-navigator-cropped.mp4" video="true" alt="종속성 맵 목록에서 서비스를 선택하여 목록으로 들어오고 나가는 서비스 요청의 플로우를 보여주는 비디오" style="width:100%;" >}}

### 로드 증폭

선택한 리소스 업스트림이 받은 요청의 100% 이상을 수신하는 경우, 서비스의 로드가 증폭된 것입니다. 호출 경로가 주황색으로 강조 표시된 서비스는 로드 증폭이 있는 상태이며, 증폭 배수는 패널 목록에 표시됩니다. 해당 증폭은 리소스가 받은 요청(하단 이미지 맵에 강조 표시됨)과 다운스트림 서비스(맵의 다운스트림 서비스 노드 내부에 표시됨)가 받은 요청에 기반하여 산출됩니다. 목록에서 서비스를 클릭하면 증폭에 기여하는 스팬(span)을 확인할 수 있습니다.

{{< img src="tracing/visualization/resource/dependency-map-requests-cropped.png" alt="특정 리소스로 나가고 들어오는 요청의 플로우를 표시하고, 해당 리소스의 요청 카운트를 강조 표시한 종속성 맵" style="width:100%;" >}}


## 스팬(span) 요약

특정 리소스에 대해 Datadog은 다음과 같이 일치하는 모든 트레이스에 대한 [스팬(span)][6] 분석 내역을 제공해 드립니다.

{{< img src="tracing/visualization/resource/span_stats.png" alt="특정 리소스와 연관된 스팬 목록에 대한 몇 가지 주요 메트릭을 보여주는 테이블" style="width:80%;">}}

표시된 메트릭은 스팬(span)에 따라 제시됩니다.

`Avg Spans/trace`
: 현재 리소스를 포함한 트레이스에 대한 스팬(span)의 평균 발생 횟수입니다. 스팬(span)이 최소 한 번 이상 나타납니다.

`% of Traces`
: 스팬(span)이 최소 한 번 이상 나타나는 현재 리소스를 포함한 트레이스의 백분율값입니다.

`Avg Duration`
: 현재 리소스를 포함한 트레이스에 대한 스팬(span)의 평균 발생 기간입니다. 스팬(span)이 최소 한 번 이상 나타납니다.

`Avg % Exec Time`
: 현재 리소스를 포함한 트레이스에 대한 활성 스팬(span)의 평균 실행 시간 비율입니다. 스팬(span)이 최소 한 번 이상 나타납니다.

**참고**: 스팬(span)은 자식 스팬이 완료될 때까지 대기하지 않을 경우 활성 스팬으로 간주됩니다. 특정 시간에 특정 트레이스에 대해 활성화된 스팬은 모두 리프 스팬(즉, 자식이 없는 스팬)입니다. 

해당 스팬(span) 요약 테이블은 서비스 엔트리 스팬이 포함된 리소스에만 사용할 수 있습니다.

## 트레이스

환경, 서비스, 작업, 리소스 이름에 대해 이미 필터가 적용되어 있는 [트레이스 검색][8] 모달에서 본 리소스와 연관된 [트레이스][7] 목록을 참조하세요.

{{< img src="tracing/visualization/resource/traces_list.png" alt="각 트레이스의 타임스탬프, 기간, 상태, 레이턴시 세부 정보를 보여주는 특정 리소스와 연관된 트레이스 목록" style="width:90%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#services
[2]: /ko/tracing/glossary/
[3]: /ko/tracing/glossary/#trace
[4]: /ko/dashboards/
[5]: /ko/monitors/manage/status/
[6]: /ko/tracing/glossary/#spans
[7]: /ko/tracing/trace_explorer/trace_view/
[8]: /ko/tracing/search/