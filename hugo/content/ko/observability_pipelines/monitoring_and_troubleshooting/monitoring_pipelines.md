---
aliases:
- /ko/observability_pipelines/monitoring/
description: 상태 그래프와 기본 제공 모니터링을 사용하여 파이프라인, Workers, 그리고 구성 요소의 상태를 추적하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: observability_pipelines/set_up_pipelines
  tag: 설명서
  text: 파이프라인 설정
- link: /monitors/types/metric/
  tag: 설명서
  text: 메트릭 모니터 구성
- link: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
  tag: 설명서
  text: Observability Pipelines 사용 메트릭
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅하기
title: 파이프라인 모니터링
---
## 개요 {#overview}

파이프라인은 관측 가능성 데이터를 수집, 처리 및 라우팅하는 구성 요소로 구성됩니다. 다음과 같은 방법으로 파이프라인 및 구성 요소의 상태를 추적할 수 있습니다.

- [파이프라인](#view-the-status-of-your-pipelines), [Workers](#view-the-status-of-your-workers), [구성 요소](#view-the-status-of-your-pipeline-components)(소스, 프로세서 및 대상)의 상태 그래프를 조회합니다.
- 다음과 같은 경우 경고를 보내는 [기본 제공 모니터](#out-of-the-box-monitors)를 활성화하세요.
    - Observability Pipelines Worker의 CPU 또는 메모리 사용량이 높거나 데이터가 손실되고 있습니다.
    - 구성 요소에서 오류를 발생시키고 있습니다.
    - 정의된 할당량에 도달하였습니다.
- 사용 가능한 [Observability Pipelines 메트릭][5]을 사용하여 자체 대시보드, 노트북 및 모니터를 만드세요.

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipelines_list.png" alt="각 파이프라인의 상태, 이벤트/초 및 바이트/초를 보여주는 파이프라인 목록 페이지입니다." style="width:100%;" >}}

## 파이프라인의 상태 조회{#view-the-status-of-your-pipelines}

1. [Observability Pipelines][1]로 이동하여 파이프라인이 수신 및 전송하는 이벤트 또는 바이트 수를 확인하세요. 이 페이지에 표시된 {{< ui >}}events/s{{< /ui >}} 및 {{< ui >}}bytes/s{{< /ui >}} 메트릭은 15분 평균을 기준으로 합니다.
1. 파이프라인을 선택합니다.
1. 탭을 클릭하여 {{< ui >}}Health{{< /ui >}} 파이프라인 및 해당 구성 요소에 대한 세부 정보를 확인합니다. 다음 그래프를 조회할 수 있습니다.
    - 각 구성 요소가 얼마나 사용되고 있는지, 그리고 구성 요소가 수신 및 전송하는 총 이벤트 수입니다.
    - 대상으로 이루어진 요청 수와 해당 요청에서 발생한 오류 수입니다.
    - 의도적으로 또는 의도치 않게 삭제된 이벤트 수입니다.
    - 지난주 대비 각 구성 요소의 요청 수 및 오류 수의 변화입니다.

상태 그래프를 대시보드, 노트북 또는 모니터로 내보낼 수 있습니다. 내보낸 그래프는 메트릭이 특정 파이프라인 및 구성 요소 태그별로 그룹화되어 있음을 보여줍니다.

## Workers 상태 조회{#view-the-status-of-your-workers}

Observability Pipelines Workers의 리소스 사용량 및 전송된 데이터 그래프를 조회하려면 다음을 수행하세요.

1. [Observability Pipelines][1]로 이동합니다.
1. 파이프라인을 선택합니다.
1. 탭을 클릭하여 {{< ui >}}Workers{{< /ui >}} Workers의 메모리 및 CPU 사용률, 트래픽 통계 및 오류를 확인합니다.
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/workers_tab.png" alt="각 Worker의 메모리 사용률, CPU 사용률, 이벤트/초, 바이트/초 및 오류를 보여주는 Workers 탭입니다." style="width:100%;" >}}
1. 탭을 클릭하여 {{< ui >}}Latest Deployment & Setup{{< /ui >}} Workers의 배포 상태를 확인하세요.
    {{< img src="observability_pipelines/monitoring_and_troubleshooting/worker_deployment_status.png" alt="각 Worker의 배포 상태를 보여주는 최신 배포 및 설정 탭입니다." style="width:100%;" >}}

## 파이프라인 구성 요소의 상태 조회{#view-the-status-of-your-pipeline-components}

소스, 프로세스 또는 대상에 대한 메트릭을 보려면 다음을 수행하세요.

1. [Observability Pipelines][1]로 이동합니다.
1. 파이프라인을 선택합니다.
1. 소스, 프로세서 또는 대상 이름 옆의 톱니바퀴를 클릭한 다음 {{< ui >}}View details{{< /ui >}}를 선택합니다. Datadog은 선택한 구성 요소에 대한 상태 그래프를 표시합니다.
1. 그래프를 [인시던트][2], [대시보드][3] 또는 [노트북][4]으로 내보내려면 그래프의 내보내기 아이콘을 클릭하세요. 내보낸 그래프는 메트릭이 특정 파이프라인 및 구성 요소 태그별로 그룹화되어 있음을 보여줍니다.

{{< img src="observability_pipelines/monitoring_and_troubleshooting/pipeline_health_graphs.png" alt="파이프라인에 대한 유입/유출 이벤트, 유입/유출 바이트, 오류, 삭제된 데이터, 사용률 및 버퍼 이벤트를 보여주는 상태 그래프입니다." style="width:35%;" >}}

## 기본 제공 모니터 {#out-of-the-box-monitors}

기본 제공 모니터를 보려면 다음 단계를 따르세요.

1. [Observability Pipelines][1]로 이동합니다.
1. 파이프라인의 {{< ui >}}Enable monitors{{< /ui >}} 열에서 {{< ui >}}Monitors{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Start{{< /ui >}}를 클릭하여 제안된 사용 사례 중 하나에 대해 모니터를 설정합니다.<br>
    새 메트릭 모니터 페이지는 선택한 사용 케이스를 기반으로 구성됩니다. 구성을 업데이트하여 추가로 사용자 지정할 수 있습니다. 자세한 내용은 [메트릭 모니터 설명서][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com//observability-pipelines/
[2]: /ko/incident_response/incident_management/
[3]: /ko/monitors/types/metric/
[4]: /ko/notebooks/
[5]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/