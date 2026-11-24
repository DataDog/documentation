---
aliases:
- /ko/cloud_cost_management/real_time_costs
description: 클라우드 지출을 실시간으로 조회하고 분석하세요.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
- link: /cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
  tag: 설명서
  text: 실시간 이상 탐지 모니터 생성
title: 실시간 비용
---
<div class="alert alert-info">Azure 및 Google Cloud의 실시간 비용은 미리 보기로 제공되고 있습니다.</div>

## 개요 {#overview}

실시간 비용은 AWS, Azure 및 Google Cloud 컴퓨팅 비용을 거의 실시간으로 추정하므로 며칠이 아닌 몇 분 또는 몇 시간 내에 비용 변화에 대응할 수 있습니다. Datadog은 Datadog Agent가 수집하는 실시간 사용량 데이터에서 추정치를 생성하고, Cloud Cost Management 청구 데이터의 최근 평균 시간당 비용을 사용하여 해당 사용량의 가격을 책정합니다.

실시간 비용을 사용하면 다음을 할 수 있습니다.
- 조기에 이상 탐지 및 [실시간 이상 탐지 모니터][3]로 해당 이상에 대해 경고
- 최근 변경 사항의 영향 관찰
- 시간당 또는 시간 미만 단위의 지출 추세 모니터링
- 빠르게 변화하는 Kubernetes 클러스터에 대한 심층적인 가시성 확보

실시간 비용은 다음에 대해 제공됩니다.

| 공급자 | 적용 대상 지출 | 실시간 메트릭 | 가격 책정 기준 |
|---|---|---|---|
| AWS | Amazon EC2 인스턴스 및 EC2에서 실행되는 Kubernetes | `aws.cost.net.amortized.realtime.estimated` | 인스턴스 유형, 리전 및 AWS 계정별 최근 평균 시간당 순 상각 EC2 가격 |
| Azure(미리 보기) | Azure Virtual Machines 컴퓨팅 및 Azure VM에서 실행되는 Kubernetes | `azure.cost.amortized.realtime.estimated` | 인스턴스 유형, 리전 및 Azure 구독별 최근 평균 시간당 상각 VM 가격 |
| Google Cloud(미리 보기) | Compute Engine 인스턴스(vCPU 및 메모리) 및 Compute Engine에서 실행되는 Kubernetes | `gcp.cost.amortized.realtime.estimated` | 머신 유형, 리전 및 Google Cloud 프로젝트별 최근 평균 시간당 상각 vCPU 및 메모리 가격 |

실시간 비용은 컴퓨팅에만 적용됩니다. 다음 요금은 제외됩니다.
- **AWS**: EBS, 네트워킹 및 Amazon EC2 인스턴스 컴퓨팅 외의 기타 요금
- **Azure**: 관리형 디스크, 스토리지, 대역폭, 네트워킹 및 Virtual Machines 컴퓨팅 사용량 외의 기타 요금(`chargetype:Usage`). 사용하지 않은 Azure 용량 예약도 제외됩니다.
- **Google Cloud**: Persistent Disk, GPU, 네트워킹, OS 라이선스, 외부 IP 주소 및 Compute Engine 인스턴스의 vCPU(코어) 및 메모리(RAM) SKU 외의 기타 요금. 크레딧 및 예약 요금도 제외됩니다.

## 요구 사항 {#requirements}

실시간 비용은 Cloud Cost Management Enterprise 고객에게 제공됩니다. 시작하기 전에 다음을 확인하세요.

- AWS 계정, Azure 구독 또는 Google Cloud 프로젝트에 대해 Cloud Cost Management가 활성화되어 있습니다.
- 각 EC2 인스턴스, Azure VM 또는 Compute Engine 인스턴스에 Datadog Agent가 설치되어 있습니다.
- (선택 사항) 실시간 Kubernetes 비용의 경우 클러스터에 대해 Datadog Container Monitoring이 활성화되어 있습니다. 설정은 [컨테이너 비용 할당][2]을 참조하세요.

## 실시간 비용 쿼리 {#query-real-time-costs}

Metrics Explorer 및 대시보드의 표준 {{< ui >}}Metrics{{< /ui >}} 소스 아래에서 실시간 비용을 찾으세요. 다음과 같이 공급자에 맞는 쿼리를 사용하세요.

| 공급자 | 쿼리 |
|---|---|
| AWS | `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Azure | `sum:azure.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Google Cloud | `sum:gcp.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |

다음으로 실시간 비용을 쿼리하세요.
- `sum` 또는 `sum by` 집계
- `.as_count()` 수정자([rate 메트릭과 count 메트릭 비교][1]에 대해 자세히 알아보기)
- 5분 이상의 `sum` 롤업(실시간 비용은 5분마다 업데이트되므로 이전 쿼리에서는 300초)

롤업은 1시간과 같이 더 길게 설정하여 시간 단위로 비용을 확인할 수 있습니다. 시간당 비용은 절감형 플랜 및 예약 구매 전에 사용 패턴을 이해하는 데 도움이 됩니다.

## 대시보드에서 실시간 비용 보기 {#view-real-time-costs-in-dashboards}

각 공급자에는 기본 제공 {{< ui >}}Real-Time Cost Overview{{< /ui >}} 대시보드가 있습니다. 이 대시보드에는 확정된 청구 데이터가 제공되기 전의 실시간 비용 추세와 전일 대비 비용 변화가 표시됩니다. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Dashboards{{< /ui >}}][5] 페이지 또는 [Dashboard List][6]에서 찾을 수 있습니다.

대시보드에는 [실시간 비용 요구 사항][7]을 충족한 후의 데이터가 표시됩니다. 추가 설정이 필요하지 않습니다.

## 실시간 Kubernetes 할당 {#real-time-kubernetes-allocation}

컨테이너 비용 할당과 마찬가지로 Datadog은 EC2 인스턴스, Azure VM 및 Compute Engine 인스턴스 비용을 해당 인스턴스에서 실행된 Kubernetes 포드로 세분화합니다. 팀, 서비스 또는 환경과 같은 **포드의 사용자 지정 태그** 및 **기본 제공 Kubernetes 태그**를 포함하여 포드에 사용된 모든 태그를 실시간으로 사용할 수 있습니다.
- `allocated_spend_type`: 컴퓨팅 비용을 워크로드에서 사용한 CPU 및 메모리(`usage`), 워크로드에서 요청했지만 사용되지 않은 CPU 및 메모리(`workload_idle`), 어떤 워크로드에서도 예약하지 않은 CPU 및 메모리(`cluster_idle`)로 분할합니다.
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `kube_daemon_set`
- `pod_name`
- `pod_phase`
- `pod_status`

유휴 상태이거나 포드가 실행되지 않는 노드도 `kube_cluster_name` 및 `orchestrator:kubernetes`와 같은 Kubernetes 태그를 유지하므로 완전히 유휴 상태인 클러스터의 비용을 그룹화하여 확인할 수 있습니다.

## 태그 {#tags}

실시간 비용에 대한 태그는 다음과 같은 방식으로 다른 Cloud Cost Management 메트릭의 태그와 다릅니다.
- 모든 태그 값은 소문자이며, 메트릭 데이터와 같이 정규화됩니다.
- Tag Pipelines 및 사용자 지정 할당 규칙은 적용되지 않습니다.
- 일부 청구 관련 태그(AWS Cost and Usage Report, Azure 비용 내보내기 또는 Google Cloud 청구 내보내기에서 제공) 및 FOCUS 태그는 실시간 비용 메트릭에 존재하지 않을 수 있습니다. 실시간 비용은 주로 청구 데이터가 아닌 Datadog Agent가 수집하는 사용량 데이터에서 파생됩니다.

## 정확도 {#accuracy}

Agent가 모니터링하는 인스턴스의 경우, Datadog은 청구 데이터에 포함된 일일 컴퓨팅 비용의 10% 이내로 실시간 비용을 추정하는 것을 목표로 합니다. 비교에 사용되는 청구 데이터는 공급자에 따라 다릅니다.
- **AWS**: AWS Cost and Usage Report의 EC2 비용
- **Azure**: Azure 비용 내보내기의 상각된 가상 머신 사용 비용
- **Google Cloud**: Google Cloud 청구 내보내기의 상각된 Compute Engine vCPU 및 메모리 비용

실시간 비용은 짧은 지연 시간으로 데이터를 제공하도록 최적화되어 있으므로 데이터가 일시적으로 감소하거나 누락될 수 있습니다. Azure 및 Google Cloud가 미리 보기로 제공되고 있는 경우에 특히 이러한 현상이 발생할 수 있습니다. 장기적인 비용 추세 분석을 위해 청구 데이터를 기반으로 하는 Cloud Cost Management 메트릭이 권장됩니다. 이러한 메트릭에는 최종 크레딧이 포함됩니다.

- 분산의 원인은 다음과 같습니다.
  - 최근 온디맨드(종량제), 약정(절감형 플랜, 예약, 약정 사용 할인) 및 스팟 지출 조합에 따라 변동되는 시간당 평균
  - 실제 인스턴스 시작 및 종료 시간과 Agent가 보고하는 시간 간의 미세한 차이
- 다음과 같은 경우 과소 추정이 발생할 수 있습니다.
  - 인스턴스가 Datadog Agent에 의해 모니터링되지 않는 경우
  - 새로 사용된 인스턴스 유형이나 리전이 CCM 청구 데이터에 아직 나타나지 않은 경우
  - 추정치를 컴퓨팅 이외의 요금을 포함하는 총 지출과 비교하는 경우([개요][4] 섹션 참조)
- 다음과 같은 경우 과대 추정이 발생할 수 있습니다.
  - 인스턴스가 Datadog Agent에 의해 모니터링되지만 CCM 청구 데이터에는 포함되지 않는 경우

분산을 줄이려면 Cloud Cost Management가 적용되고 모든 인스턴스에서 Datadog Agent가 실행되는 계정, 구독 또는 프로젝트로 필터링하세요.

`estimated_hourly_cost` 및 `estimated_daily_cost` 태그를 사용하여 인스턴스 유형의 시간당 및 일일 예상 비용을 확인하세요.

[1]: /ko/metrics/types/?tab=rate#metric-types
[2]: /ko/cloud_cost_management/allocation/container_cost_allocation/
[3]: /ko/cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
[4]: #overview
[5]: https://app.datadoghq.com/cost/analyze/dashboards
[6]: https://app.datadoghq.com/dashboard/lists?q=type%3Aintegration%20cost%20real
[7]: #requirements