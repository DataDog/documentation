---
aliases:
- /ko/cloud_cost_management/real_time_costs
description: 클라우드 지출을 실시간으로 조회하고 분석하세요.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management에 대해 알아보기
title: 실시간 비용
---
## 개요 {#overview}

실시간 비용은 Amazon EC2 비용(Kubernetes 비용 할당 포함)에 대한 거의 실시간 추정치를 제공하므로, 며칠이 아닌 몇 분 또는 몇 시간 내에 비용 변화에 대응할 수 있습니다. 추정치는 인스턴스 유형, 리전 및 AWS 계정별 최근 평균 시간당 순 상각 EC2 가격을 기준으로 Datadog Agent의 실시간 사용량 데이터를 사용하여 생성됩니다.

실시간 비용을 사용하여 다음을 수행하세요.
- 이상 징후 조기 탐지
- 최근 변경 사항의 영향 관찰
- 시간당 또는 시간 미만 단위의 지출 추세 모니터링
- 빠르게 변화하는 Kubernetes 클러스터에 대한 심층적인 가시성 확보

실시간 비용은 다음 항목에 대해 제공됩니다.
- Amazon EC2 지출(EBS, 네트워킹 및 유사 서비스 제외)
- EC2에서 실행되는 Kubernetes

## 요구 사항 {#requirements}

실시간 비용은 Cloud Cost Management Enterprise 고객에게 제공됩니다.

- AWS 계정에 Cloud Cost Management가 활성화되어 있어야 함
- 각 EC2 인스턴스에 Datadog Agent가 설치되어 있어야 함
- (필요시) Kubernetes 비용을 실시간으로 확인하려면 [Container Cost Allocation][2]의 설정 가이드에 따라 클러스터에 대해 Datadog Container Monitoring을 활성화하세요.

## 실시간 비용 쿼리 방법 {#how-to-query-real-time-costs}

실시간 비용은 Metrics Explorer 및 대시보드의 표준 {{< ui >}}Metrics{{< /ui >}} 소스에서 찾을 수 있으며, `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)`을 사용하여 쿼리해야 합니다.
- `sum` 또는 `sum by` 집계
- `count`로([rate 메트릭과 count 메트릭 비교][1]에 대해 자세히 알아보기)
- 롤업 `sum`, 최소 5분(위 쿼리에서는 300초, 실시간 비용은 5분마다 업데이트됩니다)

롤업은 1시간과 같이 더 길게 설정하여 시간 단위로 비용을 확인할 수 있습니다. 시간당 비용은 절감형 플랜 및 예약 구매 전에 사용 패턴을 더 잘 이해하는 데 도움이 될 수 있습니다.

## 실시간 Kubernetes 할당 {#real-time-kubernetes-allocation}

기존 컨테이너 비용 할당과 유사하게, EC2 인스턴스 비용은 해당 인스턴스에서 실행된 Kubernetes 포드별로 분류됩니다. 포드에 사용된 모든 태그는 실시간으로 사용할 수 있으며, 팀, 서비스 또는 환경과 같은 **포드의 사용자 지정 태그** 및 **기본 제공 Kubernetes 태그**가 포함됩니다.
- `allocated_spend_type`, 이는 컴퓨팅 비용을 워크로드에서 사용한 CPU 및 메모리(`usage`), 워크로드에서 요청했지만 사용되지 않은 CPU 및 메모리(`workload_idle`), 그리고 어떤 워크로드에서도 예약하지 않은 CPU 및 메모리(`cluster_idle`)로 분할합니다.
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `pod_name`
- `pod_phase`
- `pod_status`

유휴 상태이거나 포드가 실행되지 않는 노드도 `kube_cluster_name` 및 `orchestrator:kubernetes`와 같은 Kubernetes 태그를 유지하므로, 완전히 유휴 상태인 클러스터의 비용을 그룹화하여 확인할 수 있습니다.

## 태그 {#tags}

실시간 비용에 대한 태그는 다른 Cloud Cost Management 메트릭의 태그와 유사하지만 동일하지 않습니다.
- 모든 태그 값은 소문자이며, 메트릭 데이터와 같이 정규화됩니다.
- Tag Pipelines 및 사용자 지정 할당 규칙은 적용되지 않습니다.
- 일부 비용 및 사용량 보고서(CUR) 특정 태그와 FOCUS 태그는 실시간 비용 메트릭에 존재하지 않을 수 있습니다. 이는 실시간 비용이 CUR이 아닌 Datadog Agent가 수집한 사용량 데이터를 사용하여 주로 도출되기 때문입니다.

## 정확도 {#accuracy}

실시간 비용은 Datadog Agent가 모니터링하는 EC2 호스트에 대해 CUR의 일일 EC2 비용 데이터와 10% 이내의 오차를 유지하는 것을 목표로 합니다. 실시간 비용은 짧은 지연 시간으로 데이터를 제공하는 것을 우선시하므로 데이터가 일시적으로 누락되거나 공백이 발생할 수 있습니다. 장기적인 비용 추세 분석을 위해 Datadog은 직접적인 AWS 청구 데이터를 기반으로 하는 Cloud Cost 메트릭의 사용을 권장합니다.

`estimated_hourly_cost` 태그를 사용하여 인스턴스 유형의 시간당 예상 단가를 파악할 수 있습니다.

- 분산의 원인은 다음과 같습니다.
  - 최근 온디맨드, 약정 및 스팟 지출 조합에 따라 변동되는 시간당 평균
  - 실제 인스턴스 시작 및 종료 시간과 Datadog Agent가 보고하는 시간 간의 미세한 차이
- 다음과 같은 경우 과소 추정이 발생할 수 있습니다.
  - EC2 인스턴스가 Datadog Agent에 의해 모니터링되지 않는 경우
  - 새로 사용된 인스턴스 유형이나 리전이 CCM 청구 데이터에 아직 나타나지 않은 경우
  - 추정치가 컴퓨팅 비용만 포함하는 경우(EBS, 네트워킹 등은 제외)
- 다음과 같은 경우 과대 추정이 발생할 수 있습니다.
  - 인스턴스가 Datadog Agent에 의해 모니터링되지만 CCM 청구 데이터에는 포함되지 않는 경우

[1]: /ko/metrics/types/?tab=rate#metric-types
[2]: /ko/cloud_cost_management/allocation/container_cost_allocation/