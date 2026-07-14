---
description: Container Cost Allocation을 사용해 조직 전체에서 Cloud Cost Management 비용을 할당하는
  방법을 알아보세요.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management 자세히 알아보기
private: true
title: 컨테이너 비용 할당
---

{{< jqmath-vanilla >}}

## 개요

Datadog Cloud Cost Management(CCM)은 자동으로 클라우드 클러스터의 비용을 해당 클러스터에서 실행되는 개별 서비스와 워크로드에 할당합니다. 포드, 노드, 컨테이너, 작업 태그로 강화된 비용 메트릭을 사용하여 전체 클라우드 비용 맥락에서 컨테이너 워크로드의 비용을 시각화할 수 있습니다.

클라우드
: CCM에서는 AWS, Azure 또는 Google 호스트 인스턴스의 비용을 할당합니다. 호스트는 클라우드 공급자의 비용 및 사용량 보고서에 안내된 컴퓨터(AWS EC2, Azure 가상 머신, 또는 Google Cloud의 Compute Engine 인스턴스 등)로, Kubernetes 포드가 실행 중일 수 있습니다.

리소스
: CCM은 Kubernetes 클러스터에 대한 비용을 할당하며 포드에서 사용된 Kubernetes 영구 볼륨 등 많은 연계 리소스의 비용 분석을 포함합니다.

CCM은 [**컨테이너** 페이지][1]에서 사용 중인 클라우드 및 오케스트레이터에 따라 CPU, 메모리 등을 포함하는 리소스 비용을 표시합니다.

{{< img src="cloud_cost/container_cost_allocation/container_allocation.png" alt="컨테이너 페이지에서 지난달 요청 및 유휴 비용을 표시하는 클라우드 비용 할당 표" style="width:100%;" >}}

## 사전 필수 조건

{{< tabs >}}
{{% tab "AWS" %}}

CCM은 Elastic Kubernetes Service(EKS)를 통해 관리되는 항목을 포함해 Amazon ECS 클러스터 및 모든 Kubernetes 클러스터의 비용을 할당합니다.

다음 표는 각각의 최소 Agent 및 클러스터 Agent 버전과 수집된 기능 목록을 보여줍니다.

| 기능 | 최소 에이전트 버전 | 최소 클러스터 Agent 버전 |
|---|---|---|
| 컨테이너 비용 할당 | 7.27.0 | 1.11.0 |
| GPU 컨테이너 비용 할당 | 7.54.0 | 7.54.0 |
| AWS 영구 볼륨 할당 | 7.46.0 | 1.11.0 |
| 데이터 전송 비용 할당    | 7.58.0 | 7.58.0 |

1. [클라우드 비용 설정 페이지][101]에서 AWS 클라우드 비용 관리 통합을 구성하세요.
1. Kubernetes 지원의 경우, Kubernetes 환경에서 [**Datadog Agent**][102]를 설치하고 Agent 구성에서 [**Orchestrator Explorer**][103]를 활성화했는지 확인하세요.
1. Amazon ECS 지원의 경우, ECS 작업에서 [**Datadog Container Monitoring**][104]을 설정하세요.
1. 선택적으로 사용량 기반 ECS 할당을 위해 [AWS 분할 비용 할당][105]을 활성화하세요.
1. 스토리지 비용 할당을 활성화하려면, [EBS 메트릭 수집][108]을 설정하세요.
1. GPU 컨테이너 비용 할당을 활성화하려면 [Datadog DCGM 통합][106]을 설치하세요.
1. 데이터 전송 비용 할당을 활성화하려면 [Cloud Network Monitoring][107]을 설정하세요. **참고**: 추가 비용이 적용됩니다.

**참고**: GPU 컨테이너 비용 할당은 `nvidia.com/gpu` 형식의 포드 요청만 지원합니다.

[101]: https://app.datadoghq.com/cost/setup
[102]: /ko/containers/kubernetes/installation/?tab=operator
[103]: /ko/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: /ko/containers/amazon_ecs/
[105]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[106]: /ko/integrations/dcgm/?tab=kubernetes#installation
[107]: /ko/network_monitoring/cloud_network_monitoring/setup
[108]: /ko/integrations/amazon_ebs/#metric-collection

{{% /tab %}}
{{% tab "Azure" %}}

CCM은 Azure Kubernetes Service(AKS)에서 관리되는 항목을 포함해 모든 Kubernetes 클러스터 비용을 할당합니다.

다음 표는 각각에 대한 최소 Agent 및 클러스터 Agent 버전과 수집된 기능 목록을 보여줍니다.

| 기능 | 최소 에이전트 버전 | 최소 클러스터 Agent 버전 |
|---|---|---|
| 컨테이너 비용 할당 | 7.27.0 | 1.11.0 |
| GPU 컨테이너 비용 할당 | 7.54.0 | 7.54.0 |

1. [Cloud Cost Setup 페이지][101]에서 Azure Cost Management 통합을 구성하세요.
1. Kubernetes 환경에서 [**Datadog Agent**][102]를 설치하고 Agent 구성에서 [**Orchestrator Explorer**][103]를 활성화했는지 확인합니다.
1. GPU 컨테이너 비용 할당을 활성화하려면 [Datadog DCGM 통합][104]을 설치합니다.

**참고**: GPU 컨테이너 비용 할당은 `nvidia.com/gpu` 형식의 포드 요청만 지원합니다.

[101]: https://app.datadoghq.com/cost/setup
[102]: /ko/containers/kubernetes/installation/?tab=operator
[103]: /ko/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: https://docs.datadoghq.com/ko/integrations/dcgm/?tab=kubernetes#installation

{{% /tab %}}
{{% tab "Google" %}}

CCM은 Google Kubernetes Engine(GKE)에서 관리되는 항목을 포함해 모든 Kubernetes 클러스터 비용을 할당합니다.

다음 표는 각각에 대한 최소 Agent 및 클러스터 Agent 버전과 수집된 기능 목록을 보여줍니다.

| 기능 | 최소 에이전트 버전 | 최소 클러스터 Agent 버전 |
|---|---|---|
| 컨테이너 비용 할당 | 7.27.0 | 1.11.0 |
| GPU 컨테이너 비용 할당 | 7.54.0 | 7.54.0 |

1. [클라우드 비용 설정 페이지][101]에서 Google Cloud Cost Management 통합을 구성하세요.
1. Kubernetes 환경에서 [**Datadog Agent**][102]를 설치하고 Agent 구성에서 [**Orchestrator Explorer**][103]를 활성화했는지 확인합니다.
1. GPU 컨테이너 비용 할당을 활성화하려면 [Datadog DCGM 통합][104]을 설치합니다.

**참고**: GPU 컨테이너 비용 할당은 `nvidia.com/gpu` 형식의 포드 요청만 지원합니다.

**참고**: [GKE Autopilot][105]은 [제한](#agentless-kubernetes-costs)이 적용되는 Agentless Kubernetes 설치로만 지원됩니다.

[101]: https://app.datadoghq.com/cost/setup
[102]: /ko/containers/kubernetes/installation/?tab=operator
[103]: /ko/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: https://docs.datadoghq.com/ko/integrations/dcgm/?tab=kubernetes#installation
[105]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview

{{% /tab %}}
{{< /tabs >}}

## 비용 할당

비용 할당은 클라우드 공급자의 호스트 컴퓨팅과 기타 리소스 비용을 연결된 개별 작업이나 포드로 나눕니다. 이렇게 나뉜 비용은 관련 리소스 태그로 검색할 수 있으므로 연결된 모든 범위별로 비용을 상세히 확인할 수 있습니다.

`allocated_resource` 태그를 사용하여 Kubernetes 노드, 컨테이너 오케스트레이션 호스트, 스토리지 볼륨, 전체 클러스트 수준을 포함하는 다양한 수준에서 비용과 연결된 비용 리소스를 시각화합니다.

{{< tabs >}}
{{% tab "AWS" %}}

이렇게 나뉜 비용은 노드, 포드, 작업, 볼륨 태그로 강화됩니다. 이러한 태그를 사용해 연결된 모든 범위별로 비용을 상세히 살펴볼 수 있습니다.

### Kubernetes 태그 추출

피드 또는 기저 노드 등과 같은 직접 리소스의 _태그_만 기본적으로 비용 메트릭에 추가됩니다. 라벨이나 주석을 태그로 포함하거나 네임스페이스 등 관련 리소스에서 태그를 포함하려면, [Kubernetes 태그 추출][201]을 참조하세요.

[201]: /ko/containers/kubernetes/tag/

### 컴퓨팅

Kubernetes 컴퓨팅 할당의 경우 Kubernetes 노드가 연결된 호스트 인스턴스 비용과 결합되어 있습니다. 노드의 클러스트 이름 및 모든 노드 태그는 해당 노드의 전체 계산 비용에 추가됩니다. 이를 통해 노드에 예약된 포드를 고려하지 않고 클러스트 수준 범위를 인스턴스 비용과 연계할 수 있습니다.

다음으로, Datadog은 해당 노드에서 하루 동안 실행된 모든 포드를 확인합니다. 노드의 비용은 각 포드가 사용한 리소스와 실행 시간에 따라 포드에 할당됩니다. 이렇게 계산된 비용에는 해당 포드의 모든 태그 정보가 추가로 반영됩니다.

**참고**: 포드와 노드에서의 _태그_만 비용 메트릭에 추가됩니다. 레이블을 포함하려면, 레이블을 [노드][101] 및 [포드][102] 레이블로 활성화해야 합니다.

다른 모든 비용에는 소스 메트릭 `aws.cost.amortized`으로 동일한 값이 주어집니다.

### 영구 볼륨 스토리지

Kubernetes Persistent Volume 스토리지 할당의 경우 Persistent Volumes(PV), Persistent Volume Claims(PVC), 노드, 포드가 연계된 EBS 볼륨 비용과 결합되어 있습니다. 연결된 모든 PV, PVC, 노드, 포드 태그가 EBS 볼륨 비용 라인 항목에 추가됩니다.

다음으로, Datadog는 해당 날짜에 해당 볼륨을 클레임한 모든 포드를 확인합니다. 볼륨 비용은 각 포드가 사용한 리소스와 실행 시간에 따라 포드에 할당됩니다. 여기서 리소스에는 프로비저닝된 스토리지 용량, IOPS, 처리량이 포함됩니다. 이렇게 할당된 비용에는 해당 포드의 모든 태그 정보가 추가로 반영됩니다.

### EC2 기반 Amazon ECS

ECS 비용 할당의 경우, Datadog는 ECS에 사용된 각 EC2 인스턴스에서 어떤 작업이 실행되었는지를 확인합니다. AWS Split Cost Allocation을 활성화하면, 예약 기준이 아닌 사용량 기준으로 ECS 비용이 할당되어 보다 세분화된 상세 정보를 제공합니다.

작업이 사용한 리소스를 기준으로, Datadog는 해당 인스턴스의 컴퓨팅 비용 중 적절한 비율을 해당 작업에 할당합니다. 이렇게 계산된 비용에는 해당 작업의 모든 태그와, 해당 작업에서 실행 중인 컨테이너의 모든 태그(단, 컨테이너 이름은 제외)가 추가로 반영됩니다.

### Fargate 기반 Amazon ECS

Fargate에서 실행되는 ECS 작업 비용은 [CUR][103]에서 이미 전액 할당되어 있습니다. CCM은 여기에 기본 제공 태그와 컨테이너 태그를 추가하여 AWS Fargate 비용 데이터를 보강합니다.

### 데이터 전송

Kubernetes 데이터 전송 비용 할당의 경우, Kubernetes 노드는 [CUR][103]의 해당 데이터 전송 비용과 매핑됩니다. 해당 노드의 클러스터 이름과 모든 노드 태그가 노드의 전체 데이터 전송 비용에 추가됩니다. 이를 통해 노드에 스케줄된 포드는 고려하지 않고도 데이터 전송 비용에 클러스터 수준의 속성을 연결할 수 있습니다.

다음으로, Datadog는 해당 노드에서 하루 동안 실행된 [워크로드 리소스][104]를 확인합니다. 노드 비용은 네트워크 트래픽 사용량에 따라 워크로드 수준으로 할당됩니다. 이렇게 계산된 비용에는 해당 워크로드 리소스의 모든 태그 정보가 추가로 반영됩니다.

**참고**: 포드와 노드에서의 _태그_만 비용 메트릭에 추가됩니다. 레이블을 포함하려면, 레이블을 [노드][101] 및 [포드][102]에 대한 레이블로 활성화해야 합니다.

정확한 데이터 전송 비용 할당을 위해 모든 AWS 호스트에서 [Cloud Network Monitoring][105]이 활성화되어야 합니다. 일부 호스트에서 Cloud Network Monitoring이 활성화되어 있지 않은 경우, 해당 호스트의 데이터 전송 비용은 할당되지 않으며, 필터 및 그룹화 조건에 따라 별도의 버킷으로 표시될 수 있습니다.

Datadog는 데이터 전송 비용 할당을 [표준 6개 워크로드 리소스][104]에만 지원합니다. [커스텀 워크로드 리소스][106]의 경우, 데이터 전송 비용은 클러스터 수준까지만 할당할 수 있으며 노드/네임스페이스 수준으로는 할당되지 않습니다.

[101]: /ko/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /ko/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
[104]: https://kubernetes.io/docs/concepts/workloads/
[105]: /ko/network_monitoring/cloud_network_monitoring/setup
[106]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

{{% /tab %}}
{{% tab "Azure" %}}

### Kubernetes 태그 추출

포드 또는 기저 노드 등과 같은 직접 리소스의 _태그_만 기본적으로 비용 메트릭에 추가됩니다. 라벨이나 주석을 태그로 포함하거나 공백 등 관련 리소스에서 태그를 포함하려면, [Kubernetes 태그 추출][201]을 참조하세요.

[201]: /ko/containers/kubernetes/tag/

### 컴퓨팅

Kubernetes 컴퓨팅 할당의 경우 Kubernetes 노드가 연결된 호스트 인스턴스 비용과 결합되어 있습니다. 노드의 클러스트 이름 및 모든 노드 태그는 해당 노드에 대한 전체 컴퓨팅 비용에 추가됩니다. 이를 통해 노드에 예약된 포드를 고려하지 않고 클러스트 수준 범위를 인스턴스 비용과 연계할 수 있습니다.

다음으로, Datadog은 해당 노드에서 하루 동안 실행된 모든 포드를 확인합니다. 노드의 비용은 각 포드가 사용한 리소스와 실행 시간에 따라 포드에 할당됩니다. 이렇게 계산된 비용에는 해당 포드의 모든 태그 정보가 추가로 반영됩니다.

**참고**: 포드와 노드에서의 _태그_만 비용 메트릭에 추가됩니다. 레이블을 포함하려면, 레이블을 [노드][101] 및 [포드][102]에 대한 레이블로 활성화해야 합니다.

다른 모든 비용에는 소스 메트릭 `azure.cost.amortized`으로 동일한 값이 주어집니다.

[101]: /ko/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /ko/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags

{{% /tab %}}
{{% tab "Google" %}}

### Kubernetes 태그 추출

포드 또는 기저 노드 등과 같은 직접 리소스의 _태그_만 기본적으로 비용 메트릭에 추가됩니다. 라벨이나 주석을 태그로 포함하거나 공백 등 관련 리소스에서 태그를 포함하려면, [Kubernetes 태그 추출][201]을 참조하세요.

[201]: /ko/containers/kubernetes/tag/

### 컴퓨팅

Kubernetes 컴퓨팅 할당의 경우 Kubernetes 노드가 연결된 호스트 인스턴스 비용과 결합되어 있습니다. 노드의 클러스트 이름 및 모든 노드 태그는 해당 노드에 대한 전체 컴퓨팅 비용에 추가됩니다. 이를 통해 노드에 예약된 포드를 고려하지 않고 클러스트 수준 범위를 인스턴스 비용과 연계할 수 있습니다.

다음으로, Datadog은 해당 노드에서 하루 동안 실행된 모든 포드를 확인합니다. 노드의 비용은 각 포드가 사용한 리소스와 실행 시간에 따라 포드에 할당됩니다. 이렇게 계산된 비용에는 해당 포드의 모든 태그 정보가 추가로 반영됩니다.

**참고**: 포드와 노드에서의 _태그_만 비용 메트릭에 추가됩니다. 레이블을 포함하려면, 레이블을 [노드][101] 및 [포드][102]에 대한 레이블로 활성화해야 합니다.

다른 모든 비용에는 소스 메트릭 `gcp.cost.amortized`으로 동일한 값이 주어집니다.

### Agentless Kubernetes 비용

Datadog Infrastructure Monitoring을 활성화하지 않고 GKE 클러스터 비용을 확인하려면 [GKE 비용 할당][103]을 사용합니다. 모니터링되지 않는 GKE 클러스터에서 이 기능을 사용하려면 GKE 비용 할당을 활성화해야 합니다. 이 방법에는 몇 가지 제한 사항이 있습니다(아래 참고).

#### Datadog Agent의 한계 및 차이점

- 유효 워크로드 비용 추적이 지원되지 않습니다.
- 개별 포드의 비용은 추적되지 않으며, 워크로드 및 네임스페이스의 집계된 비용만 제공됩니다. 또한, `pod_name` 태그는 제공되지 않습니다.
- GKE는 포드 레이블만을 사용하여 데이터를 보강하며, 사용자가 추가한 Datadog 태그는 반영하지 않습니다.
- 전체 한도 목록은 [공식 GKE 설명서][104]에서 찾아볼 수 있습니다.

GKE 비용 할당을 활성화하려면 [공식 GKE 설명서][105]를 참조하세요.

[101]: /ko/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /ko/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations
[104]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#limitations
[105]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#enable_breakdown

{{% /tab %}}
{{< /tabs >}}

## 비용 이해

`allocated_spend_type` 태그를 사용하여 Kubernetes 노드, 컨테이너 오케스트레이션 호스트, 스토리지 볼륨, 또는 전체 클러스터 수준 등 다양한 수준에서 비용에 연결된 소비 카테고리를 시각화할 수 있습니다.

{{< tabs >}}
{{% tab "AWS" %}}

### 컴퓨팅

호스트 인스턴스 비용은 두 가지 구성 요소로 나뉩니다: CPU 60%, 메모리 40%입니다. 호스트 인스턴스에 GPU가 있는 경우, 비용은 세 가지 구성 요소로 나뉘며 GPU 95%, CPU 3%, 메모리 2%로 배분됩니다. 각 구성 요소는 워크로드의 리소스 예약량과 사용량을 기준으로 개별 워크로드에 할당됩니다.

비용은 다음과 같은 지출 유형으로 할당됩니다.

| 지출 유형 | 설명    |
| -----------| -----------    |
| 사용법 | 해당 일의 평균 사용량을 기준으로 워크로드에서 사용하는 리소스(메모리, CPU, GPU 등)의 비용 |
| 유휴 워크로드 | 워크로드에 의해 예약 및 할당되었지만 사용되지 않은 리소스(메모리, CPU, GPU 등)의 비용입니다. 이는 요청된 총 리소스와 평균 사용량 간의 차이를 의미합니다. |
| 유휴 클러스터 | 클러스터에서 워크로드에 의해 예약되지 않은 리소스(메모리, CPU, GPU 등)의 비용입니다. 이는 리소스의 총 비용과 워크로드에 할당된 비용 간의 차이를 의미합니다. |

### 영구 볼륨

EBS 볼륨의 비용은 IOPS, 처리량, 스토리지의 세 가지 구성 요소로 이루어집니다. 각 구성 요소는 볼륨이 마운트된 상태에서 포드의 사용량에 따라 할당됩니다.

| 지출 유형 | 설명    |
| -----------| -----------    |
| 사용법 | 워크로드에서 사용하는 프로비저닝된 IOPS, 처리량, 또는 스토리지의 비용입니다. 스토리지 비용은 해당 일에 사용된 볼륨 스토리지의 최대 사용량을 기준으로 하며, IOPS와 처리량 비용은 해당 일의 평균 볼륨 스토리지 사용량을 기준으로 합니다. |
| 유휴 워크로드 | 워크로드에 의해 예약 및 할당되었지만 사용되지 않은 프로비저닝된 IOPS, 처리량, 또는 스토리지의 비용입니다. 스토리지 비용은 해당 일에 사용된 볼륨 스토리지의 최대 사용량을 기준으로 하며, IOPS와 처리량 비용은 해당 일의 평균 볼륨 스토리지 사용량을 기준으로 합니다. 이는 요청된 총 리소스와 평균 사용량 간의 차이를 의미합니다. **참고:** 이 태그는 [AWS 통합][101]에서 `Resource Collection`을 활성화한 경우에만 사용할 수 있습니다. `Cloud Security Posture Management`에 대한 과금이 발생하지 않도록 하려면, `Resource Collection` 설정 중 `Cloud Security Posture Management` 체크박스를 선택 해제해야 합니다. |
| 유휴 클러스터 | 해당 일에 어떤 포드에도 예약되지 않은 프로비저닝된 IOPS, 처리량, 또는 스토리지의 비용입니다. 이는 리소스의 총 비용과 워크로드에 할당된 비용 간의 차이를 의미합니다. |

참고: 영구 볼륨 할당은 Kubernetes 클러스터에서만 지원되며, Kubernetes StatefulSet에 속한 포드에만 적용됩니다.

[101]: https://app.datadoghq.com/integrations/amazon-web-services

### 데이터 전송

비용은 다음과 같은 지출 유형으로 할당됩니다.

| 지출 유형 | 설명    |
| -----------| -----------    |
| 사용법 | Cloud Network Monitoring에 의해 모니터링되고 할당된 데이터 전송 비용 |
| 모니터링 안 됨 | Cloud Network Monitoring에 의해 모니터링되지 않은 데이터 전송 비용입니다. 이 비용은 할당되지 않습니다. |

{{% /tab %}}
{{% tab "Azure" %}}

### 컴퓨팅

호스트 인스턴스 비용은 두 가지 구성 요소로 나뉩니다: CPU 60%, 메모리 40%입니다. 호스트 인스턴스에 GPU가 있는 경우, 비용은 세 가지 구성 요소로 나뉘며 GPU 95%, CPU 3%, 메모리 2%로 배분됩니다. 각 구성 요소는 워크로드의 리소스 예약량과 사용량을 기준으로 개별 워크로드에 할당됩니다.

비용은 다음과 같은 지출 유형으로 할당됩니다.

| 지출 유형 | 설명    |
| -----------| -----------    |
| 사용법 | 해당 일의 평균 사용량을 기준으로 워크로드에서 사용하는 리소스(메모리, CPU, GPU 등)의 비용 |
| 유휴 워크로드 | 워크로드에 의해 예약 및 할당되었지만 사용되지 않은 리소스(메모리, CPU, GPU 등)의 비용입니다. 이는 요청된 총 리소스와 평균 사용량 간의 차이를 의미합니다. |
| 유휴 클러스터 | 클러스터에서 워크로드에 의해 예약되지 않은 리소스(메모리, CPU, GPU 등)의 비용입니다. 이는 리소스의 총 비용과 워크로드에 할당된 비용 간의 차이를 의미합니다. |

{{% /tab %}}
{{% tab "Google" %}}

### 컴퓨팅

호스트 인스턴스 비용은 두 가지 구성 요소로 나뉩니다: CPU 60%, 메모리 40%입니다. 호스트 인스턴스에 GPU가 있는 경우, 비용은 세 가지 구성 요소로 나뉘며 GPU 95%, CPU 3%, 메모리 2%로 배분됩니다. 각 구성 요소는 워크로드의 리소스 예약량과 사용량을 기준으로 개별 워크로드에 할당됩니다.

비용은 다음과 같은 지출 유형으로 할당됩니다.

| 지출 유형 | 설명    |
| -----------| -----------    |
| 사용법 | 해당 일의 평균 사용량을 기준으로 워크로드에서 사용하는 리소스(메모리, CPU, GPU 등)의 비용 |
| 유휴 워크로드 | 워크로드에 의해 예약 및 할당되었지만 사용되지 않은 리소스(메모리, CPU, GPU 등)의 비용입니다. 이는 요청된 총 리소스와 평균 사용량 간의 차이를 의미합니다. |
| 유휴 클러스터 | 클러스터에서 워크로드에 의해 예약되지 않은 리소스(메모리, CPU, GPU 등)의 비용입니다. 이는 리소스의 총 비용과 워크로드에 할당된 비용 간의 차이를 의미합니다. |
| 모니터링 안 됨 | 지출 유형이 확인되지 않은 리소스의 비용입니다. 이를 해결하려면 해당 클러스터 또는 노드에 Datadog Agent를 설치하세요. |

{{% /tab %}}
{{< /tabs >}}

## 리소스 이해하기

클라우드 제공업체에 따라 일부 리소스는 비용 할당에 사용할 수 있거나 없을 수 있습니다.

| 리소스 | AWS | Azure | Google Cloud |
|---:|---:|---|---|
| CPU | {{< X >}} | {{< X >}} | {{< X >}} |
| 메모리 | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< tooltip text="Persistent volumes" tooltip="관리자에 의해 또는 동적으로 프로비저닝되며, 포드의 생명주기와 독립적으로 데이터를 유지하는 클러스터 내 스토리지 리소스" case="title" >}} | {{< X >}} |  |  |
| {{< tooltip text="Managed service fees" tooltip="클러스터 관리를 위해 클라우드 제공업체가 부과하는 관련 수수료의 비용으로, 관리형 Kubernetes 서비스 또는 기타 컨테이너 오케스트레이션 옵션 비용이 포함됩니다." case="title" >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| ECS 비용 | {{< X >}} | N/A | N/A |
| 데이터 전송 비용 | {{< X >}} | 제한됨* | 제한됨* |
| GPU | {{< X >}} | {{< X >}} | {{< X >}}  |
| {{< tooltip text="Local storage" tooltip="노드에 직접 연결된 스토리지 리소스" case="title" >}} |  | 제한됨* | 제한됨* |

`Limited*` 리소스는 Kubernetes 비용의 일부로 식별되었지만, 특정 워크로드 또는 포드에 완전히 할당되지 않았습니다. 이러한 리소스는 포드 또는 네임스페이스 수준이 아닌 호스트 수준의 비용이며, `allocated_spend_type:<resource>_not_supported`로 식별됩니다.

## 비용 메트릭

사전 요구 사항이 충족되면 다음 비용 메트릭이 자동으로 표시됩니다.

{{< tabs >}}
{{% tab "AWS" %}}

| 비용 메트릭                    | 설명    |
| ---                                | ----------- |
| `aws.cost.amortized.shared.resources.allocated` | 포드 또는 ECS 태스크에서 사용하는 CPU 및 메모리를 기준으로 할당된 EC2 비용입니다. CPU와 메모리는 각각 60:40 비율로 분배되며, 포드에서 GPU를 사용하는 경우 GPU, CPU, 메모리는 각각 95:3:2 비율로 분배됩니다. 또한 할당된 EBS 비용도 포함됩니다. <br>기준: `aws.cost.amortized`* |
| `aws.cost.net.amortized.shared.resources.allocated` | 포드 또는 ECS 태스크에서 사용하는 CPU 및 메모리를 기준으로 할당된 순 EC2 비용입니다. CPU와 메모리는 각각 60:40 비율로 분배되며, 포드에서 GPU를 사용하는 경우 GPU, CPU, 메모리는 각각 95:3:2 비율로 분배됩니다. 또한 할당된 EBS 비용도 포함됩니다. <br> *기준: `aws.cost.net.amortized`(가능한 경우)* |

{{% /tab %}}
{{% tab "Azure" %}}

| 비용 메트릭                    | 설명    |
| ---                                | ----------- |
| `azure.cost.amortized.shared.resources.allocated` | 포드 또는 컨테이너 태스크에서 사용하는 CPU 및 메모리를 기준으로 할당된 Azure VM 비용입니다. CPU와 메모리는 각각 60:40 비율로 분배되며, 포드에서 GPU를 사용하는 경우 GPU, CPU, 메모리는 각각 95:3:2 비율로 분배됩니다. 또한 할당된 Azure 비용도 포함됩니다. <br> *기준: `azure.cost.amortized`* |

{{% /tab %}}
{{% tab "Google" %}}

| 비용 메트릭                    | 설명    |
| ---                                | ----------- |
| `gcp.cost.amortized.shared.resources.allocated` | 포드에서 사용하는 CPU 및 메모리를 기준으로 할당된 Google Compute Engine 비용입니다. CPU와 메모리는 각각 60:40 비율로 분배되며, 포드에서 GPU를 사용하는 경우 GPU, CPU, 메모리는 각각 95:3:2 비율로 분배됩니다. 이 할당 방식은 청구서에 CPU와 메모리 사용량 간의 구체적인 분배 비율이 이미 제공되지 않은 경우에 사용됩니다. <br> 기준: *`gcp.cost.amortized`* |

{{% /tab %}}
{{< /tabs >}}

이 비용 메트릭에는 모든 클라우드 비용이 포함됩니다. 이를 통해 모든 클라우드 비용을 한 번에 계속 시각화할 수 있습니다.

예를 들어, 스토리지 버킷, 클라우드 제공업체 관리형 데이터베이스, Kubernetes 포드에 `team` 태그가 있다고 가정해 보겠습니다. 이러한 메트릭을 사용하면 `team` 기준으로 비용을 그룹화할 수 있으며, 이 경우 세 가지 모두의 비용이 포함됩니다.

## 태그 적용하기

Datadog에서는 다양한 소스를 비용 메트릭으로 전환하기 위해 다음 태그를 통합하고 적용합니다.

{{< tabs >}}
{{% tab "AWS" %}}

### Kubernetes

Kubernetes 포드 및 Kubernetes 노드 태그 외에도, 다음과 같은 기본 제공 태그가 비용 메트릭에 적용됩니다(아래 목록은 일부 예시).

| 기본 제공 태그  |  설명 |
| ---                 | ------------ |
| `orchestrator:kubernetes` | 해당 항목과 연관된 오케스트레이션 플랫폼은 Kubernetes입니다. |
| `kube_cluster_name` | Kubernetes 클러스터 이름입니다. |
| `kube_namespace` | 워크로드가 실행되는 네임스페이스입니다. |
| `kube_deployment` | Kubernetes Deployment 이름입니다. |
| `kube_stateful_set` | Kubernetes StatefulSet 이름입니다. |
| `pod_name` | 개별 포드 이름입니다. |

충돌은 호스트 태그와 같은 낮은 구체성 태그보다 포드 태그와 같은 높은 구체성 태그를 우선 적용하여 해결됩니다. 예를 들어, `service:datadog-agent` 태그가 지정된 Kubernetes 포드가 `service:aws-node` 태그가 지정된 노드에서 실행되는 경우, 최종 태그는 `service:datadog-agent`가 됩니다.

#### 영구 볼륨

Kubernetes 포드 및 Kubernetes 노드 태그 외에도, 다음과 같은 기본 제공 태그가 비용 메트릭에 적용됩니다.

| 기본 제공 태그                      | 설명                                                                                                                                  |
| ---                                     |----------------------------------------------------------------------------------------------------------------------------------------------|
| `persistent_volume_reclaim_policy`      | 영구 볼륨에 설정된 Kubernetes Reclaim Policy                                                                                      |
| `storage_class_name`                    | 영구 볼륨을 인스턴스화하는데 사용된 Kubernetes Storage Class                                                                      |
| `volume_mode`                           | 영구 볼륨의 Volume Mode                                                                                                    |
| `ebs_volume_type`                       | EBS 볼륨의 유형입니다. `gp3`, `gp2`, 또는 기타 값이 될 수 있습니다.                                                                              |

### Amazon ECS

ECS 태스크 태그 외에도, 다음과 같은 기본 제공 태그가 비용 메트릭에 적용됩니다.

참고: ECS 컨테이너의 대부분의 태그가 적용되며, `container_name`는 제외됩니다.

| 기본 제공 태그      |  설명 |
| ---                     | ------------ |
| `orchestrator:ecs`      | 해당 항목과 연관된 오케스트레이션 플랫폼은 Amazon ECS입니다. |
| `ecs_cluster_name`      | ECS 클러스터 이름입니다. |
| `is_aws_ecs`            | ECS 실행과 관련된 모든 비용 |
| `is_aws_ecs_on_ec2`     | EC2에서 ECS를 실행하는 데 발생하는 모든 EC2 컴퓨팅 비용 |
| `is_aws_ecs_on_fargate` | Fargate에서 ECS를 실행하는 데 발생하는 모든 비용 |

### 데이터 전송

다음과 같은 기본 제공 태그가 Kubernetes 워크로드와 관련된 비용 메트릭에 적용됩니다.

| 기본 제공 태그      |  설명 |
| ---                     | ------------ |
| `source_availability_zone` | 데이터 전송이 시작된 가용 영역의 이름 |
| `source_availability_zone_id` | 데이터 전송이 시작된 가용 영역의 ID |
| `source_region` | 데이터 전송이 시작된 리전 |
| `destination_availability_zone` | 데이터 전송이 도착한 가용 영역의 이름 |
| `destination_availability_zone_id` | 데이터 전송이 도착한 가용 영역의 ID |
| `destination_region` | 데이터 전송이 도착한 리전 |
| `allocated_resource:data_transfer` | 데이터 전송 활동과 관련된 비용의 추적 및 할당 |

또한 동일한 노드에 있는 모든 포드에 공통적으로 적용되는 일부 Kubernetes 포드 태그도 함께 적용됩니다.

{{% /tab %}}
{{% tab "Azure" %}}

### Kubernetes

Kubernetes 포드 및 Kubernetes 노드 태그 외에도, 다음과 같은 기본 제공 태그가 비용 메트릭에 적용됩니다(아래 목록은 일부 예시입니다).

| 기본 제공 태그                         | 설명                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | 해당 항목과 연관된 오케스트레이션 플랫폼은 Kubernetes입니다.                                                                                            |
| `kube_cluster_name` | Kubernetes 클러스터 이름입니다. |
| `kube_namespace` | 워크로드가 실행되는 네임스페이스입니다. |
| `kube_deployment` | Kubernetes Deployment 이름입니다. |
| `kube_stateful_set` | Kubernetes StatefulSet 이름입니다. |
| `pod_name` | 개별 포드 이름입니다. |
| `allocated_resource:data_transfer` | Azure 서비스 또는 워크로드에서 사용하는 데이터 전송 활동과 관련된 비용의 추적 및 할당 |
| `allocated_resource:local_storage`         | Azure 서비스 또는 워크로드에서 사용하는 로컬 스토리지 리소스와 관련된 호스트 수준 비용의 추적 및 할당                             |

{{% /tab %}}
{{% tab "Google" %}}

### Kubernetes

Kubernetes 포드 및 Kubernetes 노드 태그 외에도, 다음과 같은 기본 제공 태그가 비용 메트릭에 적용됩니다(아래 목록은 일부 예시입니다).

| 기본 제공 태그                         | 설명                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | 해당 항목과 연관된 오케스트레이션 플랫폼은 Kubernetes입니다.                                                                                            |
| `kube_cluster_name` | Kubernetes 클러스터 이름입니다. |
| `kube_namespace` | 워크로드가 실행되는 네임스페이스입니다. |
| `kube_deployment` | Kubernetes Deployment 이름입니다. |
| `kube_stateful_set` | Kubernetes StatefulSet 이름입니다. |
| `pod_name` | 개별 포드 이름입니다. |
| `allocated_spend_type:not_monitored` | Google Cloud 서비스 또는 워크로드에서 사용하는 리소스와 관련된 [Agentless Kubernetes 비용](#agentless-kubernetes-costs)의 추적 및 할당으로, 해당 리소스는 Datadog Agent에 의해 모니터링되지 않습니다. |
| `allocated_resource:data_transfer` | Google Cloud 서비스 또는 워크로드에서 사용하는 데이터 전송 활동과 관련된 비용의 추적 및 할당 |
| `allocated_resource:gpu` | Google Cloud 서비스 또는 워크로드에서 사용하는 GPU 리소스와 관련된 호스트 수준 비용의 추적 및 할당 |
| `allocated_resource:local_storage` | Google Cloud 서비스 또는 워크로드에서 사용하는 로컬 스토리지 리소스와 관련된 호스트 수준 비용의 추적 및 할당 |

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/containers