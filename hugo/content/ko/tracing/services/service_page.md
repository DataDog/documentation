---
algolia:
  tags:
  - service page
aliases:
- /ko/tracing/visualization/service/
description: 상태 메트릭, 종속성, 배포, 오류 추적 및 보안 인사이트를 포함한 포괄적인 서비스 개요입니다.
further_reading:
- link: /tracing/trace_collection/
  tag: 설명서
  text: 애플리케이션에서 APM 트레이싱을 설정하는 방법 알아보기
- link: /internal_developer_portal/catalog/
  tag: 설명서
  text: Datadog에 보고하는 서비스를 발견하고 카탈로그에 등록하기
- link: /tracing/services/resource_page/
  tag: 설명서
  text: 리소스 성능 및 트레이스 자세히 살펴보기
- link: /tracing/trace_explorer/trace_view/
  tag: 설명서
  text: Datadog 트레이스 읽는 법 이해하기
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: 블로그
  text: APM 서비스 페이지 URL을 클립보드에 추가하기
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: 블로그
  text: APM Security View를 사용하여 위험, 취약성 및 공격에 대한 가시성 확보
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: 학습 센터
  text: APM Metrics 및 트레이스 시작하기
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: 학습 센터
  text: Datadog APM을 사용하여 애플리케이션 버그 진단하기
title: 서비스 페이지
---
{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="상세 서비스 페이지" style="width:100%;">}}

## 개요 {#overview}

카탈로그에서 서비스를 선택하면 상세 서비스 페이지로 이동합니다. 서비스는 동일한 작업을 수행하는 프로세스의 집합입니다(예: 웹 프레임워크 또는 데이터베이스(서비스 정의 방식에 대한 자세한 내용은 [APM 시작하기][1]를 참조)).

이 페이지에서 다음 항목을 확인하세요.

* [서비스 상태](#service-health)
* [서비스 모니터 상태](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [요약 카드](#summary-cards)
{{< site-region region="ap1,us3,us5,eu,us,ap2,uk1" >}}
* [종속성](#dependencies)
{{< /site-region >}}
* [기본 제공 그래프](#out-of-the-box-graphs)
* [이 서비스와 관련된 리소스][2]
* [추가 섹션](#additional-sections)
    *  [배포](#deployments), [Error Tracking](#error-tracking), [트레이스](#traces), [Security](#security) 등

## 서비스 상태 {#service-health}

**서비스 상태**는 즉각적인 주의가 필요한 서비스를 파악할 수 있도록 서비스 상태에 대한 실시간 요약을 제공합니다.

서비스 상태는 여러 신호(모니터, 인시던트 및 Watchdog Insights)를 단일 경보로 통합합니다. 어떤 서비스가 위험 상태인지 확인하여 문제를 더 빠르게 감지하고 해결할 수 있습니다.

{{< img src="/tracing/services/service_page/service-health3.png" alt="서비스 페이지 및 서비스 종속성 맵의 서비스 상태입니다." style="width:100%;" >}}

Datadog의 여러 곳에서 서비스 상태를 확인할 수 있습니다.

1. [카탈로그][23]
2. 서비스 페이지
3. 서비스 종속성 맵(Watchdog이 여러 서비스 종속성에 걸친 문제를 감지한 경우).
4. 서비스 배지

서비스 상태는 다음 조건 중 하나 이상이 충족되면 *Critical* 또는 *Warning*으로 표시됩니다.

|   상태    |                         조건                          |
|-------------|------------------------------------------------------------|
|  **Critical**  | **모니터**: <br>- 페이징 통합(PagerDuty 또는 Opsgenie)이 설정된 음소거되지 않은 모니터가 `ALERT` 상태이며 `past 2 days` 내에 트리거되었습니다.<br><br>**인시던트**: <br>- 심각도와 관계없이 인시던트가 활성 상태입니다.<br><br>**Watchdog Insights**: <br>- 결함이 있는 배포가 진행 중입니다.<br>- APM 지연 시간/오류율 경보가 진행 중입니다.  |
| **Warning** | **모니터**: <br>- 페이징 통합(PagerDuty 또는 Opsgenie)이 설정된 음소거되지 않은 Warning 모니터가 `WARN` 상태이며 `past 2 days` 내에 트리거되었습니다.<br><br>**인시던트**: <br>- 심각도와 관계없이 인시던트가 안정 상태입니다.<br><br>**Watchdog Insights**: <br>- 로그 이상 경보가 진행 중입니다. |                                                                                                                                                                                                   |
|   **Ok**    |    Critical 또는 Warning 상태의 활성 경보가 없습니다.     |                                                                                                                                                                       ||

## 서비스 모니터 {#service-monitor}

서비스 모니터 패널은 서비스에 연결된 활성 모니터링 및 Synthetic 테스트를 보여줍니다.
Datadog은 서비스 유형에 따라 모니터 목록도 제안합니다.

{{< img src="tracing/visualization/service/service_monitors.png" alt="서비스 모니터" style="width:90%;">}}

바로 활성화하거나 직접 [APM 모니터][3]를 생성하세요.

**참고**: `service:<SERVICE_NAME>`가 메타데이터에 태그되어 있거나, 모니터링 쿼리에 포함되어 있거나, 쿼리가 서비스별로 그룹화된 경우 모니터가 APM 서비스에 연결됩니다. Synthetic 테스트에 `service:<SERVICE_NAME>` 태그를 지정하여 APM 서비스에 연결할 수도 있습니다.

## Watchdog Insights {#watchdog-insights}

[Watchdog Insights][7] 캐러셀은 특정 태그에서 감지된 이상과 이상치를 보여주어 문제의 근본 원인을 조사할 수 있도록 합니다. 인사이트는 서비스 태그가 포함된 APM, Continuous Profiler, Log Management 및 인프라 데이터에서 도출됩니다. 이러한 인사이트는 각 제품 페이지에 나타나는 인사이트와 동일합니다. 예를 들어, 서비스 페이지의 동일한 로그 이상값을 [로그 탐색기][19]에서 찾을 수 있습니다.

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog Insights" style="width:100%;">}}

인사이트를 클릭하여 인사이트의 시간 범위, 관련 로그 또는 트레이스, 제안된 다음 단계를 확인하세요.

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Watchdog Insights 세부 정보" style="width:100%;">}}

## 요약 카드 {#summary-cards}

서비스 페이지에는 서비스 상태에 대한 주요 정보가 포함된 요약 카드가 있습니다. 잠재적인 결함이 있는 배포를 쉽게 찾고, 카드를 클릭하여 최신 배포의 세부 정보나 트레이스를 확인하거나 이 서비스의 모든 배포를 확인할 수 있습니다. 오류가 자동으로 문제로 집계되는 [Error Tracking][4]과의 통합을 통해 서비스에서 플래그가 지정된 새로운 문제를 확인하세요.

{{< img src="tracing/visualization/service/summary_cards.png" alt="요약 카드" style="width:100%;">}}

[SLO(Service Level Objectives)][5] 및 [인시던트][6] 요약을 통해 SLO 상태와 진행 중인 인시던트를 모니터링하여 성능 목표를 항상 염두에 둘 수 있습니다. 카드를 클릭하여 서비스에 대한 새 SLO를 생성하거나 인시던트를 선언하세요. [보안 신호][18] 요약은 서비스가 애플리케이션 위협에 어떻게 반응하는지 중점적으로 보여줍니다.

## 기본 제공 그래프 {#out-of-the-box-graphs}

Datadog은 모든 서비스에 대해 기본 제공 그래프를 제공합니다. 각 그래프 위의 드롭다운을 사용하여 표시되는 정보를 변경하세요.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="기본 제공 서비스 그래프" style="width:100%;">}}

{{% apm-ootb-graphs %}}

<div class="alert alert-tip">지연 시간 그래프에서 지연 시간 급증 구간에 마우스를 올리고 <strong>Bits AI로 조사</strong>를 클릭하여 자동 조사를 시작하세요. Bits AI는 영향을 받는 트레이스 전반에서 태그 차이와 병목 현상을 분석합니다. 자세한 내용은 <a href="/bits_ai/bits_chat/">Bits Chat</a>을 참조하세요.</div>

### 내보내기 {#export}

각 그래프의 오른쪽 상단에서 화살표를 클릭하면 기존 [대시보드][10]로 그래프를 내보낼 수 있습니다.

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="대시보드 저장" style="width:60%;">}}

## 리소스 {#resources}

리소스별로 분류된 요청, 지연 시간 및 오류 그래프를 확인하여 문제가 있는 리소스를 파악할 수 있습니다. 리소스는 서비스에 대한 특정 액션(일반적으로 개별 엔드포인트 또는 쿼리)입니다.

아래에는 서비스와 관련된 [리소스][11] 목록이 있습니다. 참고: 리소스가 HTTP 서비스의 외부 인터페이스를 나타내는 경우 목록에 엔드포인트가 대신 표시됩니다.

요청, 지연 시간, 오류 또는 시간별로 서비스의 리소스를 정렬하여 트래픽이 많은 영역이나 잠재적인 문제를 파악할 수 있습니다. 다음 예와 같이 이러한 메트릭 열을 구성할 수 있습니다.

{{< img src="tracing/visualization/service/resources_tab_1.jpg" alt="리소스" style="width:100%;">}}

리소스를 클릭하면 사이드 패널이 열리며, 해당 리소스의 기본 제공 그래프(요청, 오류 및 지연 시간 정보), 리소스 종속성 맵 및 스팬 요약 표가 표시됩니다. 키보드 탐색 키를 사용하여 {{< ui >}}Resources{{< /ui >}} 목록의 리소스 간을 전환하고 서비스 내 리소스를 비교할 수 있습니다. 전체 리소스 페이지를 보려면 {{< ui >}}Open Full Page{{< /ui >}}를 클릭하세요.

[자세한 내용은 전용 리소스 문서를 참조하세요][2].

### 열 {#columns}

리소스 목록에서 표시할 항목을 선택하세요.

* {{< ui >}}Requests{{< /ui >}}: 초당 추적된 요청의 절대량
* {{< ui >}}Requests per second{{< /ui >}}: 초당 추적된 요청의 절대량
* {{< ui >}}Total time{{< /ui >}}: 이 리소스에서 소요된 총 시간 합계
* {{< ui >}}Avg/p75/p90/p95/p99/Max Latency{{< /ui >}}: 추적된 요청의 평균/p75/p90/p95/p99/최대 지연 시간
* {{< ui >}}Errors{{< /ui >}}: 특정 리소스에 대한 절대 오류량
* {{< ui >}}Error Rate{{< /ui >}}: 특정 리소스에 대한 오류 비율

{{< img src="tracing/visualization/service/resource_columns.png" alt="리소스 열" style="width:40%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
## 종속성 {#dependencies}

종속성 맵에서 서비스가 상호 작용하는 업스트림 및 다운스트림 종속성을 시각화합니다. 이 맵은 [APM 메트릭][1]을 기반으로 정확한 요청 수, 오류율 및 지연 시간 메트릭을 나타냅니다. 맵은 종속성을 작업 이름별로 자동으로 그룹화합니다. 예를 들어 서비스가 gRPC를 사용하여 두 개의 다운스트림 서비스를 호출하는 경우 이러한 서비스는 함께 그룹화됩니다. 맵 왼쪽에 있는 표에는 시간 경과에 따른 요청 및 오류율이 표시되며, 이는 실패하는 종속성을 식별하는 데 유용합니다.

데이터베이스, 큐 또는 타사 서비스와 같은 [추론된 서비스 종속성][2]은 보라색 배경 노드로 표시됩니다.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="서비스 페이지 종속성 맵" style="width:100%;">}}

**참고**: [서비스 재정의][3]는 종속성 맵의 노드 사이(연결선)에 표시되어 서비스가 상호 작용하는 실제 원격 서비스, 데이터베이스 또는 큐에 대한 가시성을 유지합니다.

### 특정 서비스 종속성 조사 {#investigating-a-specific-service-dependency}

종속성 서비스 노드를 클릭하여 해당 서비스의 종속성 중 하나를 조사할 수 있습니다. 사이드 패널의 요청 수, 오류 및 지연 시간 메트릭은 서비스에서 다운스트림 종속성으로 이동하는 요청으로 범위가 지정됩니다.

다음 표를 사용하여 서비스에서 다운스트림 종속성으로의 클라이언트 호출에서 어떤 리소스가 호출되는지 확인하세요. 예를 들어 서비스가 데이터베이스를 호출하는 경우 데이터베이스에 대해 수행된 쿼리의 분석을 확인하고 표를 사용하여 느리거나 실패하는 쿼리를 식별합니다.

{{< img src="tracing/visualization/service/dependencies_side_panel.png" alt="서비스 페이지 서비스 종속성 맵" style="width:100%;">}}

[1]: /ko/tracing/metrics/metrics_namespace/
[2]: /ko/tracing/services/inferred_services/
[3]: /ko/tracing/guide/service_overrides/
{{< /site-region >}}

## 추가 섹션 {#additional-sections}

### 배포 {#deployments}
버전 태그로 구성된 서비스의 경우 배포 탭에 버전이 표시됩니다. 버전 섹션에는 선택한 기간 동안 활성화되었던 모든 서비스 버전이 표시되고, 맨 위에 현재 활성 버전이 표시됩니다.

기본적으로 다음을 확인할 수 있습니다.
* 일정 기간 동안 이 서비스에 배포된 버전 이름.
* 이 버전에 해당하는 트레이스가 처음 및 마지막으로 표시된 시간.
* 바로 이전 버전에는 나타나지 않았지만 각 버전에는 나타나는 오류 유형 수를 보여주는 Error Types 표시기.

    **참고**: 이 표시기에는 이전 버전의 트레이스에는 표시되지 않았던 오류가 표시됩니다. 그렇다고 이 버전에서 이러한 오류가 생겼다는 의미는 아닙니다. 새 오류 유형을 살펴보는 것은 오류 조사를 시작하는 아주 좋은 방법일 수 있습니다.

* 초당 요청 수.
* 총 요청에 대한 백분율로 나타낸 오류율.

이 개요 표에서 열을 추가하거나 제거할 수 있으며 선택 사항이 저장됩니다. 추가로 사용 가능한 열은 다음과 같습니다.

* 이전 버전에는 없었지만 버전에서 활성화된 엔드포인트.
* 활성 시간 - 첫 번째 트레이스부터 해당 버전에 대해 Datadog으로 전송된 마지막 트레이스까지의 시간을 표시합니다.
* 총 요청 수.
* 총 오류 수.
* p50, p75, p90, p95, p99 또는 최댓값으로 측정된 지연 시간.

{{< img src="tracing/visualization/service/deployments_1.png" alt="배포" style="width:90%;">}}

[서비스 페이지][12]에서 배포에 대해 자세히 알아보세요.

### Error Tracking {#error-tracking}
서비스에서 발생하는 문제를 확인하세요. 유사한 오류를 집계하여 노이즈가 많은 오류 스트림을 관리 가능한 문제로 전환하고 서비스 오류의 영향을 평가하는 데 도움을 줍니다. [Error Tracking][4]의 문제에 대해 자세히 알아보세요.

이 탭에는 어떤 리소스에 가장 많은 문제가 있는지 보여주는 개요 그래프와 서비스에서 발생하는 가장 일반적인 문제 목록이 있습니다. 목록에서 문제를 클릭하면 스택 트레이스, 관련 코드 버전, 시작 이후 총 오류 발생 횟수 등 세부 정보를 사이드 패널에서 볼 수 있습니다.

{{< img src="tracing/visualization/service/error_tracking_side_panel_1.jpg" alt="Error Tracking 탭" style="width:90%;">}}

### Security {#security}
서비스의 보안 상태를 파악하세요. 여기에는 서비스 라이브러리에 있는 노출된 알려진 취약성과, Datadog이 서비스에 영향을 미치는 애플리케이션 공격을 감지했을 때 자동으로 생성하는 보안 신호가 포함됩니다. 이 신호는 각 공격 시도를 개별적으로 평가하는 대신 검토해야 할 의미 있는 위협을 식별합니다. [App and API Protection][18]에 대해 자세히 알아보세요.

보안 탭의 상단 섹션에는 취약성의 수와 심각도, 공격 타임라인, 공격 유형, 공격자 정보(클라이언트 IP 또는 인증된 사용자)를 보여주는 개요 그래프가 있습니다.

패널의 다음 섹션에는 서비스와 관련된 모든 취약성과 신호가 나열됩니다. 보안 취약성을 클릭하여 관련 세부 정보가 포함된 사이드 패널을 열고 추가 조사 및 취약성 해결을 수행하세요. 보안 신호를 클릭하여 감지된 위협이 무엇인지, 그리고 이를 해결하기 위해 어떤 조치를 취할 수 있는지에 대한 정보를 확인하세요.

{{< img src="tracing/visualization/service/security_tab_1.jpg" alt="보안" style="width:90%;">}}

### 데이터베이스 {#databases}
호스트 세부 정보, 쿼리, 권장 사항 및 다운스트림 데이터베이스 종속성을 확인하고 지연 시간 및 로드 이상값을 파악할 수 있습니다.

#### 쿼리 {#queries}
쿼리 탭에는 샘플링된 스팬 소요 시간의 시각화와 선택한 시간 간격의 전체 쿼리 목록이 포함되어 있습니다. 표에서 쿼리를 선택하여 쿼리 패널을 열고 진단, 오류 세부 정보 및 트레이스를 확인하세요.

#### 데이터베이스 {#databases-1}
데이터베이스 탭에는 이상값을 식별하는 데 도움이 되는 활성 연결 및 평균 쿼리 소요 시간 시각화와 선택한 서비스에 대한 데이터베이스 호스트 전체 목록이 포함되어 있습니다. 목록에서 데이터베이스 호스트를 선택하여 Database Monitoring에서 확인하세요.

[DBM과 APM 연결에 대해 자세히 알아보세요][21].

### 인프라 {#infrastructure}
서비스가 Kubernetes에서 실행 중인 경우 서비스 페이지에서 인프라 탭을 볼 수 있습니다. 라이브 Kubernetes Pods 표는 메모리 사용량이 한도에 가까워졌는지 여부와 같은 포드에 대한 자세한 정보를 표시하며, 프로비저닝된 컴퓨팅 리소스가 최적의 애플리케이션 성능에 필요한 리소스를 초과하는지 확인하여 리소스 할당을 개선할 수 있도록 합니다.

{{< img src="tracing/visualization/service/infra_pods.png" alt="Kubernetes Pods" style="width:90%;">}}

Kubernetes 메트릭 섹션에는 선택한 기간 동안의 인프라 상태에 대한 상위 수준 요약이 포함되어 있으며 CPU, 메모리, 네트워크, 디스크 메트릭 등이 포함됩니다.

{{< img src="tracing/visualization/service/infra_metrics_1.png" alt="Kubernetes 메트릭" style="width:90%;">}}

Kubernetes가 아닌 환경(호스트 기반 설치 등)의 경우 [Unified Service Tagging 문서][13]를 참조하세요.

### 런타임 메트릭 {#runtime-metrics}
트레이싱 클라이언트에서 런타임 메트릭이 활성화된 경우 서비스의 런타임 언어에 해당하는 런타임 메트릭 탭이 표시됩니다. [런타임 메트릭][14]에서 자세히 알아보세요.

{{< img src="tracing/visualization/service/runtime_metrics_1.png" alt="런타임 메트릭" style="width:90%;">}}

### 프로파일링 {#profiling}
[Continuous Profiler][15]가 서비스에 설정되어 있으면 프로파일링 탭이 표시됩니다.

{{< ui >}}Profiling{{< /ui >}} 탭의 정보를 사용하여 지연 시간 및 처리량 변화를 코드 성능 변화와 연관시키세요.

이 예시에서는 다음 코드 라인으로 인해 발생하는 `/GET train`의 잠금 경합 증가와 지연 시간이 어떻게 연결되는지 확인할 수 있습니다.

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison_1.mp4" alt="APM 서비스 페이지에서 프로파일링 비교 페이지로 전환하여 지연 시간을 유발하는 코드 라인 찾기" video=true >}}

### 메모리 누수 {#memory-leaks}
[Continuous Profiler][15]를 설정하고 서비스가 컨테이너화된 환경에서 실행 중인 경우 [메모리 누수][24] 탭을 사용할 수 있습니다.

잠재적인 메모리 누수를 식별하기 위한 워크플로를 안내하고 가장 실행 가능한 데이터를 보여줍니다.

{{< img src="profiler/apm_service_page_memory_leaks.png" alt="메모리 누수" style="width:90%;">}}

### 트레이스 {#traces}
트레이스 탭에서 서비스와 관련된 트레이스 목록을 확인하세요. 이 탭은 이미 서비스, 환경 및 작업 이름으로 필터링되어 있습니다. 상태, 리소스, 오류 유형과 같은 핵심 [패싯][16]을 사용하여 문제의 스팬을 자세히 조회할 수 있습니다. 자세한 내용을 보려면 스팬을 클릭하여 해당 트레이스의 플레임 그래프와 추가 세부 정보를 조회하세요.

{{< img src="tracing/visualization/service/traces_1.png" alt="트레이스" style="width:90%;">}}

### 로그 패턴 {#log-patterns}
서비스 로그에서 공통 패턴을 조회하고, 검색창에서 상태와 같은 패싯을 사용하여 패턴 목록을 필터링하세요. 패턴을 클릭하여 사이드 패널을 열고 어떤 이벤트가 연쇄 반응을 트리거했는지와 같은 세부 정보를 볼 수 있습니다. [로그 패턴][17]에서 자세히 알아보세요.

{{< img src="tracing/visualization/service/log_patterns_1.png" alt="로그 패턴" style="width:90%;">}}

### 비용 {#costs}
비용 탭에서 서비스 인프라 사용과 관련된 비용을 시각화할 수 있습니다.
[Cloud Cost Management에 대해 자세히 알아보세요][22].

{{< img src="tracing/visualization/service/costs_tab_1.png" alt="비용" style="width:90%;">}}

### 프런트엔드 활동 {#frontend-activity}

{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Journey monitoring Preview에 참여하여 프런트엔드 활동 섹션을 사용해 보세요!
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Operations monitoring Preview에 참여하여 프런트엔드 활동 섹션을 사용해 보세요!
{{< /callout >}}

프런트엔드 활동 탭은 백엔드 서비스를 해당 서비스에 의존하는 [Real User Monitoring(RUM)][24] 여정, 작업 및 보기와 연결합니다. 이 탭을 사용하여 서비스 성능이 최종 사용자 경험 및 비즈니스 결과에 어떤 영향을 미치는지 파악할 수 있습니다. 예를 들어 서비스 성능 저하 시 어떤 사용자 여정이 느려지거나 전환에 실패하는지 확인할 수 있습니다.

{{< img src="/tracing/services/service_page/front-end-activity.png" alt="서비스, 여정, 작업, 사용량 세부 정보 및 관련 세션 리플레이를 보여주는 프런트엔드 활동 사이드 패널" style="width:90%;">}}

이 탭의 메트릭은 RUM 데이터와 상관관계가 있는 인덱싱된 스팬에서 계산됩니다. 헤더에는 보기의 기반이 되는 인덱싱된 스팬 수와 전체 스팬 중 인덱싱된 스팬의 비율이 표시됩니다.

#### 전제 조건 {#prerequisites}
- RUM이 프런트엔드 애플리케이션에 설정되어 있습니다.
- RUM과 APM이 연결되어 프런트엔드 이벤트가 이 서비스의 백엔드 트레이스와 상관관계가 있습니다.
- 조직에 RUM 여정 및 작업이 활성화되어 있습니다.

사용자 및 계정 메트릭을 채우려면 RUM SDK가 `usr.id` 및 `account.id` 속성을 전송해야 합니다. 이러한 속성이 없어도 여정, 작업 및 보기 메트릭은 계속 사용할 수 있지만, Datadog은 특정 사용자나 계정에 활동을 귀속시킬 수 없습니다.

#### 보기 필터링 {#filtering-the-view}

탭 상단의 계단식 선택기를 사용하여 가장 광범위한 그룹화에서 가장 구체적인 그룹화로 이동하며 데이터 범위를 지정하세요.

- 여정: Journey Monitoring에서 정의된 사용자가 애플리케이션에서 수행하는 일련의 단계
- 작업: 여정 내에서 추적되는 사용자 작업
- 보기: 선택한 작업과 관련된 개별 RUM 보기(페이지 또는 화면)

#### 요약 메트릭 {#summary-metrics}

요약 카드는 현재 선택 항목에 대한 집계된 프런트엔드 영향을 강조하여 보여줍니다. 각 카드는 선택한 기간 동안의 값과 이전 기간 대비 변화를 보여줍니다.

- 사용자: 선택한 여정에서 활성 상태인 고유 사용자(`usr.id`) 수.
- 계정: 선택한 여정에서 활성 상태인 고유 계정(`account.id`) 수.
- 요청: 이 서비스와 관련된 프런트엔드 요청 수.
- 평균 전환율: 선택한 여정 전반의 평균 전환율.
- p95 지연 시간: 프런트엔드에서 경험한 95번째 백분위수 지연 시간.
- 오류율: 오류가 발생한 프런트엔드 요청의 비율.

#### Product Analytics 보강 {#product-analytics-enrichment}

[Product Analytics][25]를 사용하는 경우, 프런트엔드 활동 탭에 영향을 받는 사용자 및 계정에 대한 보강된 세부 정보가 표시되어 서비스 성능 저하 시 누가 영향을 받는지에 대한 더 많은 컨텍스트를 제공하고 비즈니스 영향도에 따라 작업 우선순위를 정하는 데 도움을 줍니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/
[2]: /ko/tracing/services/resource_page/
[3]: /ko/monitors/types/apm/
[4]: /ko/tracing/error_tracking/
[5]: /ko/service_level_objectives/
[6]: /ko/incident_response/incident_management/
[7]: /ko/watchdog/
[8]: /ko/tracing/metrics/metrics_namespace/
[10]: /ko/dashboards/
[11]: /ko/tracing/glossary/#resources
[12]: /ko/tracing/services/deployment_tracking/#versions-deployed
[13]: /ko/getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /ko/tracing/metrics/runtime_metrics/
[15]: /ko/profiler/
[16]: /ko/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /ko/security/application_security/how-it-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /ko/database_monitoring/connect_dbm_and_apm/
[22]: /ko/cloud_cost_management/
[23]: https://app.datadoghq.com/services
[24]: /ko/profiler/guide/solve-memory-leaks/
[25]: /ko/real_user_monitoring/
[26]: /ko/product_analytics/