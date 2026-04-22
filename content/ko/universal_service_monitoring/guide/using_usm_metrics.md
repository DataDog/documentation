---
description: USM 메트릭을 사용하여 모니터, SLO 및 대시보드를 만드는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: 블로그
  text: 유니버설 서비스 모니터링을 사용하면 몇 초 만에 모든 서비스를 자동으로 검색, 매핑 및 모니터링할 수 있습니다.
- link: /universal_service_monitoring
  tag: 설명서
  text: 유니버설 서비스 모니터링에 대해 알아보기
- link: /tracing/metrics
  tag: 설명서
  text: APM 메트릭에 대해 알아보기
title: 모니터, SLO 및 대시보드에서 USM 메트릭 사용
---

## 개요

[Universal Service Monitoring][1]은 인기 있는 컨테이너 태그(예: `app`, `short_image`, `kube_deployment`)를 사용하여 서비스를 검색하고 해당 서비스에 대한 [Software Catalog][2]에 항목을 생성합니다.

Universal Service Monitoring을 통해 발견된 모든 서비스의 인바운드 및 아웃바운드 트래픽에 대한 Datadog의 요청, 오류 및 지속 시간 메트릭에 액세스할 수 있습니다. 이러한 서비스 상태 메트릭은 알림 생성, [배포 추적][3] 및 [서비스 수준 목표(SLO)][4] 설정에 유용하며, 이를 통해 인프라에서 실행 중인 모든 서비스에 관한 광범위한 가시성을 확보할 수 있습니다.

{{< img src="universal_service_monitoring/guide/usm_slo.png" alt="BITSBOUTIQUE용 유니버설 서비스 모니터링 SLO" style="width:100%;" >}}

이 가이드에서는 `universal.http.*`와 같은 USM 메트릭을 검색하고 모니터, SLO 및 대시보드에서 사용하는 방법을 설명합니다.

## USM 메트릭 vs APM 메트릭

| 메트릭 이름                 | 단위   | 유형         | 설명                                       |
|-----------------------------|---------|--------------|---------------------------------------------------|
| universal.http.client       | 초 | 분포 | 아웃바운드 요청의 대기 시간, 카운트, 오류 및 속도.                |
| universal.http.client.hits  | 히트    | 개수        | 총 아웃바운드 요청 및 오류 수.                |
| universal.http.client.apdex | 스코어   | 게이지        | 이 서비스에 대한 아웃바운드 요청의 Apdex 스코어.                |
| universal.http.server       | 초 | 분포 | 인바운드 요청의 대기 시간, 카운트, 오류 및 속도.  |
| universal.http.server.hits  | 히트    | 개수        | 총 인바운드 요청 및 오류 수.                 |
| universal.http.server.apdex | 스코어   | 게이지        | 이 웹 서비스에 대한 Apdex 스코어.             |

APM 메트릭과 달리 오류는 별도의 메트릭이 아닌 `error:true` 태그 아래에서 사용할 수 있습니다.

**참고:** `.hits` 메트릭에는 모든 인프라 태그가 포함되어 있으며, 요청 및 오류 수를 쿼리하는 데 권장되는 방법입니다. 모든 USM 메트릭에 [두 번째 기본 태그][5]를 추가할 수도 있습니다.

### 메트릭 구문

USM 메트릭 쿼리 구문은 `trace.*`를 사용하는 [APM 메트릭 쿼리 구문][6]과 다릅니다. USM 메트릭은 단일 분포 메트릭 이름에 속합니다.

예시:

| APM                                             | USM                                                  |
|-------------------------------------------------|------------------------------------------------------|
| trace.universal.http.client.hits{*}             | count:universal.http.client{*}                       |
| trace.universal.http.client.errors              | count:universal.http.client{error:true}              |
| trace.universal.http.client.hits.by_http_status | count:universal.http.client{*} by http_status_family |
| pXX:trace.universal.http.client{*}              | pXX:universal.http.client{*}                         |
| trace.universal.http.client.apdex{*}            | universal.http.client.apdex{*}                       |

인바운드 트래픽을 캡처하는 `universal.http.server` 작업에도 동일한 번역이 적용됩니다. 배포 메트릭에 관한 자세한 내용은 [APM의 DDSketch 기반 메트릭][7]을 참고하세요.

## 사용량

[**Infrastructure > Universal Service Monitoring**][8]으로 이동하여 Universal Service Monitoring 원격 측정 유형으로 필터링하고 서비스를 클릭하세요. **Performance** 탭에는 적중률, 지연 시간, 요청, 오류 등에 관한 서비스 수준 그래프가 표시됩니다. [모니터](#create-a-monitor) 또는 [SLO](#create-an-slo)를 생성하거나 [Software Catalog][2]에서 [대시보드](#access-a-defined-dashboard)를 확인할 때 이러한 메트릭에 액세스할 수도 있습니다.

### 모니터 생성

임계값을 넘거나 예상 패턴에서 벗어나는 `universal.http.client`와 같은 USM 메트릭이 있을 때 [**APM Monitor**][9]를 생성해 경고를 트리거할 수 있습니다.

1. [**Monitors > New Monitor**][10]로 이동 후 [**APM**][9]을 클릭합니다.
2. **APM Metrics**를 선택하고 서비스 또는 리소스의 `env`, 기타 [기본 태그][11]를 정의합니다. 모니터링할 서비스 또는 리소스를 선택하고 모니터가 쿼리를 평가할 시간 간격을 정의합니다.
3. **Threshold Alert**를 선택하고 트리거할 모니터에 대해 `Requests per Second`와 같은 USM 메트릭을 선택합니다. 그런 다음 값이 알림 및 경고 임계값 **초과** 또는 **미만**이어야 하는지 정의합니다. 알림 임계값에 대한 값을 입력하고 필요시 경고 임계값에 대한 값도 입력합니다.
4. 알림 섹션에는 모니터에 대해 미리 채워진 메시지가 포함되어 있습니다. 알림 이름과 메시지를 사용자 정의하고 이 모니터에 대한 권한을 정의합니다.
5. **생성**을 클릭합니다.

{{< img src="universal_service_monitoring/guide/usm_monitor.png" alt="BITSBOUTIQUE용 유니버설 서비스 모니터링 모니터" style="width:100%;" >}}

자세한 내용은 [APM Monitor 설명서][12]를 참고하세요.

### SLO 생성하기

USM 메트릭에 설정된 목표를 충족하고 시간이 지남에 따라 가용성을 개선하기 위해 서비스별로 [**SLO**][13]를 생성할 수 있습니다. Datadog은 다양한 서비스를 포괄하기 위해 [SLO를 프로그래밍 방식으로 생성][14]할 것을 권장합니다.

Software Catalog에서 SLO를 생성하는 방법:

1. [Software Catalog][8]의 **Reliability** 탭으로 이동합니다.
2. **SLOs** 열 아래에서 서비스 위로 마우스를 가져간 다음 **+ Create Availability SLO** 또는 **+ Create Latency SLO**를 클릭합니다.

{{< img src="universal_service_monitoring/guide/software_catalog_slo_setup.png" alt="BITSBOUTIQUE에 관한 Universal Service Monitoring SLO 설정" style="width:100%;" >}}

(선택 사항) USM 메트릭을 사용하여 수동으로 SLO를 생성하려면:

1. [**Service Management > SLOs**][15]로 이동 후 [**New SLO**][13]를 클릭합니다.
2. **Metric Based**를 선택하고 **Good events (numerator)** 섹션에 두 개의 쿼리를 만듭니다.

   * 쿼리 A: `universal.http.server`와 같은 USM 메트릭을 입력하고, `from` 필드에 기본 `service` 및 `env` 태그를 추가하여 특정 서비스로 필터링합니다. 그런 다음 `as` 필드에서 `count`를 선택합니다.
   * 쿼리 B: `universal.http.server`와 같은 USM 메트릭을 입력하고, `from` 필드에 `error:true` 태그와 더불어 기본 `service` 및 `env` 태그를 추가하여 특정 서비스로 필터링합니다. 그런 다음 `as` 필드에서 `count`를 선택합니다.

3. **+ Add Formula**를 클릭하고 `a-b`를 입력합니다.
4. **Total events (denominator)** 섹션에서 `universal.http.server`와 같은 USM 메트릭을 입력하고, `from` 필드에 기본 `service` 및 `env` 태그를 추가하여 특정 서비스로 필터링합니다. 그런 다음 `as` 필드에서 `count`를 선택합니다.
5. **+ New Target**을 클릭하여 다음 설정으로 목표 임계값을 생성합니다.

   * 기간은 `7 Days`이고 목표 임계값은 `95%`이며 경고 임계값은 `99.5%`입니다. Datadog은 모든 기간에 걸쳐 동일한 목표 임계값을 설정할 것을 권장합니다.

6. SLO의 이름과 설명을 입력합니다. `team` 태그와 더불어 기본 `env` 및 `service` 태그를 설정합니다.
7. **Save and Set Alert**를 클릭합니다.

{{< img src="universal_service_monitoring/guide/usm_slo_setup.png" alt="BITSBOUTIQUE에 대한 유니버설 서비스 모니터링 SLO 설정" style="width:100%;" >}}

자세한 내용은 [Service Level Objectives 설명서][17]를 참고하세요.

### 정의된 대시보드에 액세스

[Software Catalog][2]는 서비스 정의 파일에 정의된 대시보드를 파악하고 **Dashboards** 탭에 목록을 표시합니다. **Manage Dashboards**를 클릭하면 GitHub에서 직접 서비스 정의에 액세스하고 편집할 수 있습니다.

{{< img src="universal_service_monitoring/guide/manage_dashboards.png" alt="Software Catalog 서비스의 Dashboards 탭에 있는 Manage Dashboards 버튼" style="width:90%;" >}}

자세한 내용은 [Dashboards 설명서][16]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/universal_service_monitoring
[2]: /ko/tracing/software_catalog
[3]: /ko/tracing/services/deployment_tracking/
[4]: /ko/service_management/service_level_objectives
[5]: /ko/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[6]: /ko/tracing/metrics/metrics_namespace
[7]: /ko/tracing/guide/ddsketch_trace_metrics/
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/monitors/create/apm
[10]: https://app.datadoghq.com/monitors/create
[11]: /ko/metrics/advanced-filtering/
[12]: /ko/monitors/create/types/apm
[13]: https://app.datadoghq.com/slo/new
[14]: /ko/api/latest/service-level-objectives/
[15]: https://app.datadoghq.com/slo/manage
[16]: /ko/dashboards
[17]: /ko/service_management/service_level_objectives/