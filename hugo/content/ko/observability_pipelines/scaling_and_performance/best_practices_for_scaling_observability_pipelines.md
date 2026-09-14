---
aliases:
- /ko/observability_pipelines/best_practices_for_scaling_observability_pipelines/
description: 대규모 배포 환경에서 Observability Pipelines Worker를 확장하기 위해 권장되는 애그리게이터 아키텍처,
  인스턴스 최적화 및 용량 계획 사례를 알아보세요.
further_reading:
- link: https://www.datadoghq.com/architecture/op-vm-deployment/
  tag: 아키텍처 센터
  text: Observability Pipelines VM 배포
- link: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/
  tag: 아키텍처 센터
  text: Kubernetes 배포를 위한 Observability Pipelines
title: Observability Pipelines 확장을 위한 모범 사례
---
<div class="alert alert-info">
이 가이드에서는 프로덕션 수준의 대규모 배포를 다룹니다.
</div>

## 개요 {#overview}

다른 서비스와 마찬가지로 Observability Pipelines Worker를 인프라에 배포하여 데이터를 가로채고, 조작하고, 대상으로 전달하세요. 각 Observability Pipelines Worker 인스턴스는 독립적으로 작동하도록 설계되어 로드 밸런싱을 통해 아키텍처를 확장할 수 있습니다.

이 가이드에서는 신규 Observability Pipelines Worker 사용자를 위한 권장 애그리게이터 패턴을 소개하며, 특히 다음 내용을 다룹니다.

- [아키텍처 모델 및 접근 방식](#architecture)
- [Observability Pipelines Worker 애그리게이터를 수평적으로 확장하기 위한 인스턴스 최적화](#optimize-the-instance)
- Observability Pipelines Worker의 [용량 계획 및 확장](#capacity-planning-and-scaling)을 위한 리소스 용량 추정의 시작점

## 아키텍처 {#architecture}

이 섹션에서는 다음 내용을 다룹니다.

- 아키텍처 모델:
	- [VM 기반 모델](#vm-based-architecture)
	- [Kubernetes 기반 모델](#kubernetes-based-architecture)
- [중앙 집중식 접근 방식과 분산식 접근 방식 비교](#centralized-vs-decentralized-approach)
- [VM 기반 아키텍처와 Kubernetes 기반 아키텍처 중 선택](#choosing-a-vm-based-vs-kubernetes-based-architecture)

### 아키텍처 모델 {#architecture-models}

두 가지 일반적인 아키텍처 모델이 있습니다.

- **가상 머신 기반(VM 기반) 아키텍처**: 로드 밸런서 중심의 호스트 기반 모델입니다.
- **Kubernetes 기반 아키텍처**: 필요시 수신 컨트롤러 또는 로드 밸런서를 중심 진입점으로 사용할 수 있는 컨테이너 기반 모델입니다. 클러스터 외부 소스의 경우, Kubernetes 서비스가 내부 클러스터 요청을 처리합니다.

두 모델 모두 중앙 집중식 또는 분산식 접근 방식에 적용할 수 있습니다. 중앙 집중식 접근 방식에서 Worker는 데이터 센터 또는 리전에 걸쳐 전역 규모로 작동합니다. 분산식 접근 방식에서 Worker는 데이터 소스가 위치한 리전, 데이터 센터 또는 클러스터와 같은 로컬 규모로 작동합니다. 많은 데이터 센터, 리전 또는 클라우드 공급자 계정에 걸쳐 있는 대규모 환경의 경우 하이브리드 모델이 적합할 수 있습니다.

일반적으로 Datadog은 Worker를 데이터 소스와 최대한 가까운 곳에서 운영할 것을 권장합니다. 이렇게 하면 관리 및 인프라 오버헤드가 증가할 수 있지만 네트워크 전송 문제 및 단일 장애점에 대한 우려가 줄어듭니다.

두 모델 모두에 대해 Datadog은 Worker를 [수평적으로][1] 확장하여 증가된 부하를 처리하고 고가용성을 유지할 것을 권장합니다. 관리형 인스턴스 그룹(예: 자동 확장 그룹) 또는 수평적 포드 자동 확장을 사용하여 이를 달성할 수 있습니다.

Worker는 [수직적으로][2] 확장할 수도 있으며, 이는 추가 구성 없이 추가 코어와 메모리를 활용합니다. 많은 규칙이 활성화된 Sensitive Data Scanner 프로세서와 같은 특정 프로세서나 많은 처리가 이루어지는 사용 사례의 경우, Worker는 추가 코어를 활용하여 병렬 스레드 실행을 수행할 수 있습니다. 수직적 확장을 수행할 때, Datadog은 인스턴스 크기를 전체 볼륨의 33% 이하로 처리하도록 제한할 것을 권장합니다. 이를 통해 노드 실패 시 고가용성을 확보할 수 있습니다.

#### VM 기반 아키텍처 {#vm-based-architecture}

다음 아키텍처 다이어그램은 호스트 기반 아키텍처와 관련되어 있으며, 로드 밸런서가 푸시 기반 소스로부터 트래픽을 수신합니다. 풀 기반 소스만 사용하는 경우에는 로드 밸런서가 필요하지 않습니다. 다이어그램에서 Worker는 처리 요구 사항에 따라 확장되는 관리형 인스턴스 그룹의 일부입니다. 자세한 내용은 [Observability Pipelines VM 배포][9]를 참조하세요.

{{< img src="observability_pipelines/scaling_best_practices/vm-infra.png" alt="관리형 인스턴스 그룹의 일부인 Worker를 보여주는 다이어그램" style="width:100%;" >}}


#### Kubernetes 기반 아키텍처 {#kubernetes-based-architecture}

다음 아키텍처 다이어그램은 컨테이너 기반 아키텍처와 관련되어 있으며, Kubernetes 서비스가 StatefulSet에 대한 라우터 역할을 하며 푸시 기반 소스로부터 트래픽을 수신합니다. 클러스터 외부에서 텔레메트리를 보내는 경우 [service.type을 `LoadBalancer`로][3] 설정하거나 [수신 컨트롤러][4]를 설치하고 라우팅을 위한 [수신][5]을 구성하세요. Worker는 StatefulSet의 일부로 실행되며 처리 요구 사항에 따라 용량을 조정하기 위해 수평적 포드 자동 확장을 지원합니다. VM 기반 아키텍처와 마찬가지로 Worker도 수직으로 확장될 수 있으며 병렬 처리를 위해 여러 코어를 활용할 수 있습니다. 자세한 내용은 [Kubernetes 배포를 위한 Observability Pipelines][10]를 참조하세요.

{{< img src="observability_pipelines/scaling_best_practices/containerized-infra.png" alt="StatefulSet의 일부인 Worker를 보여주는 다이어그램" style="width:100%;" >}}

### VM 기반 아키텍처와 Kubernetes 기반 아키텍처 중 선택 {#choosing-a-vm-based-vs-kubernetes-based-architecture}

다음과 같은 경우 Kubernetes 기반 아키텍처를 선택하세요.

- 로그 소스가 Kubernetes 클러스터 내에 있고 분산식 접근 방식을 사용하려는 경우
- 조직에서 Kubernetes를 많이 사용하고 이에 능숙한 경우

조직이 VM 중심적이고 Kubernetes에 능숙하지 않은 경우 VM 기반 아키텍처를 선택하세요.

인프라 관점에서 조직이 가장 잘 갖추고 있는 역량에 따라 두 모델 중 하나를 선택하게 됩니다. 각 모델은 일반적으로 Observability Pipelines의 주요 제약 사항인 CPU 사용률을 기준으로 자동 확장하는 기능을 제공합니다. 자세한 내용은 [인스턴스 최적화][6]를 참조하세요.

### 중앙 집중식 접근 방식과 분산식 접근 방식 비교 {#centralized-vs-decentralized-approach}

Datadog은 데이터 소스와 최대한 가까운 곳에 Worker를 배포하는 분산식 접근 방식을 권장합니다. 이는 리전, 클러스터 또는 데이터 센터와 같이 데이터가 발생하는 각 위치 내에 Worker를 배치하는 것을 의미합니다. 분산식 모델은 다음과 같은 이유로 데이터 볼륨이 많은 환경에 더 적합합니다.

- 리전 간 또는 데이터 센터 간 네트워크 전송 최소화
- 리전 간 또는 계정 간 데이터 전송과 관련된 잠재적인 성능 문제 방지
- 데이터 소스에서 로컬로 처리를 유지함으로써 데이터 전송 비용 절감
- 데이터를 소스에서 처리한 후 전달함으로써 로그 전송 지연 시간 감소

중앙 집중식 배포는 단일 위치에서 Worker를 실행하며 여러 리전, 클러스터 또는 데이터 센터의 데이터를 집계합니다. 단일 Worker 풀은 여러 Kubernetes 클러스터 또는 AWS 계정으로부터 데이터를 수신할 수 있습니다. 이 접근 방식은 데이터 볼륨이 적거나 해당 환경 간에 이미 네트워크 피어링이 존재하는 경우에 가장 적합합니다. 여러 리전 또는 계정에 걸친 대용량 데이터 전송 시 추가 비용이 발생할 수 있습니다.

하이브리드 모델은 분산식 접근 방식과 중앙 집중식 접근 방식의 좋은 절충안이며, 특히 대규모로 광범위하게 분산된 인프라 배포에 적합합니다. 예를 들어, 6개의 리전이 있고 각 리전에 10개의 Kubernetes 클러스터가 있다면 다음과 같은 방식을 피하는 것이 좋습니다.

- 각 클러스터에 Worker 배포 - 60개의 배포가 발생함
- 한 리전에 Worker를 배포하고 여러 리전 간에 트래픽 라우팅 - 단일 장애점 발생

하이브리드 접근 방식은 각 리전에서 전용 Kubernetes 클러스터 또는 관리형 인스턴스 그룹을 사용하여 6개의 배포만 발생합니다. 각 리전 내의 10개 클러스터는 데이터를 해당 리전의 Observability Pipelines Worker(OPW) 배포로 전송합니다.

## 인스턴스 최적화 {#optimize-the-instance}

### 인스턴스 규모 조정 {#instance-sizing}

데이터 변환에 12개의 프로세서를 사용하는 파이프라인에 대한 성능 벤치마킹을 기준으로, Worker는 vCPU당 하루에 약 1TB를 처리할 수 있습니다. 예를 들어, 하루에 4TB의 이벤트가 발생하는 경우 볼륨을 고려하여 충분한 컴퓨팅 리소스와 여유 공간을 프로비저닝해야 합니다. 이는 2코어 머신 또는 컨테이너 3개나 6코어 머신 또는 컨테이너 1개일 수 있습니다. 

Observability Pipelines Worker는 거의 항상 CPU 제약을 받으며, CPU 사용률 메트릭은 오탐을 발생시키지 않으므로 자동 확장을 위한 가장 확실한 신호를 제공합니다. Datadog은 Worker를 자동 확장 그룹의 일부로 배포하거나 [Horizontal Pod Autoscaling][7]을 활성화하여 배포할 것을 권장합니다. 정적으로 구성된 VM 또는 컨테이너 수에 의존하지 마세요. 이를 통해 데이터 손실 없이 트래픽 급증을 안전하게 처리하고, Worker가 다운될 경우에도 고가용성을 유지할 수 있습니다.

처리량이 많은 환경의 경우, Datadog은 일반적으로 네트워크 대역폭이 더 높은 대형 머신 유형을 권장합니다. 자세한 내용은 클라우드 공급자의 설명서를 참조하세요(예: [Amazon EC2 인스턴스 네트워크 대역폭][8]).

| 클라우드 공급자| 권장 사항(최소) |
| ------------- | ------------------------ |
| AWS           | c7i.xlarge               |
| Azure         | F4s v2       	           |
| Google Cloud  | c2-standard-4            |

**참고**: vCPU 1개 = ARM 물리적 CPU 1개 또는 하이퍼스레딩이 포함된 Intel 물리적 CPU 0.5개

### CPU 크기 조정 {#cpu-sizing}

대부분의 Observability Pipelines Worker 워크로드는 CPU 제약을 받으며, 최신 CPU에서 가장 잘 작동합니다.

| 클라우드 공급자| 권장 사항                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Intel Xeon 최신 세대, vCPU 8개(추천), 최소 vCPU 4개 |
| Azure         | Intel Xeon 최신 세대, vCPU 8개(추천), 최소 vCPU 4개 |
| Google Cloud  | Intel Xeon 최신 세대, vCPU 8개(추천), 최소 vCPU 4개 |
| Private       | Intel Xeon 최신 세대, vCPU 8개(추천), 최소 vCPU 4개 |

### CPU 아키텍처 {#cpu-architectures}

Observability Pipelines Worker는 최신 x86 및 ARM CPU 아키텍처에서 실행됩니다.

### 메모리 크기 조정 {#memory-sizing}

Observability Pipelines Worker의 아핀 유형 시스템으로 인해 Observability Pipelines Worker 워크로드에서 메모리가 제약되는 경우는 거의 없습니다. 따라서 Datadog은 vCPU당 최소 2GiB 이상의 메모리를 권장합니다. 메모리 사용량은 인 메모리 버퍼링 및 배치 처리로 인해 대상 수와 함께 증가합니다. 대상 수가 많은 경우 메모리 증량을 고려하세요.

### 디스크 크기 조정 {#disk-sizing}

Observability Pipelines Worker를 설치하려면 디스크 공간 500MB 정도가 필요합니다.

## 용량 계획 및 확장 {#capacity-planning-and-scaling}

### 예측을 위한 단위 {#units-for-estimations}

다음은 예상 리소스 용량을 계산하기 위해 시작 지점이 되는 단위입니다. 그러나 워크로드에 따라 다를 수 있습니다.

| 단위                  | 크기      | Observability Pipelines Worker 처리량*|
| ----------------------| --------- | ----------------------------------------- |
| 구조화되지 않은 로그 이벤트| 약 512바이트| 약 10MiB/s/vCPU                            |
| 구조화된 로그 이벤트  | 약 1.5KB   | 약 25MiB/s/vCPU                            |

*이 수치는 추정 목적을 위한 보수적인 값입니다. vCPU 1개 = ARM 물리적 CPU 1개 및 Intel 물리적 CPU 0.5개

### 확장 {#scaling}

#### 수평적 확장 {#horizontal-scaling}

수평적 확장은 여러 Observability Pipelines Worker 인스턴스에 트래픽을 분산하는 것을 의미합니다. Observability Pipelines Worker는 아무것도 공유하지 않는 아키텍처를 갖추고 있으며, 확장을 복잡하게 만들 수 있는 리더 노드나 어떠한 조정 작업도 요구하지 않습니다.

푸시 기반 소스의 경우, 네트워크 로드 밸런서를 중심으로 Observability Pipelines Worker 인스턴스를 구성하고 필요에 따라 확장 및 축소하세요.

풀 기반 소스에는 로드 밸런서가 필요하지 않습니다. Observability Pipelines Worker를 배포하고 필요에 따라 확장 및 축소하세요. Observability Pipelines Worker가 데이터 읽기를 요청하면 게시-구독 시스템이 데이터에 대한 독점 액세스를 조정합니다.

##### 로드 밸런싱 {#load-balancing}

로드 밸런서는 에이전트와 같은 푸시 기반 소스에만 필요합니다. Kafka와 같은 풀 기반 소스만 사용하는 경우에는 로드 밸런서가 필요하지 않습니다.

###### 클라이언트 측 로드 밸런싱 {#client-side-load-balancing}

클라이언트 측 로드 밸런싱은 권장되지 않습니다. 클라이언트 측 로드 밸런싱은 클라이언트가 여러 Observability Pipelines Worker 인스턴스 간에 트래픽 로드 밸런싱을 수행하는 것을 의미합니다. 이 접근 방식은 더 간단해 보이지만 다음과 같은 이유로 신뢰성이 떨어지고 더 복잡할 수 있습니다.

- 적절한 장애 조치를 포함한 로드 밸런싱은 복잡합니다. 이 영역의 문제는 데이터 손실이나 서비스 중단을 초래하는 인시던트를 발생시킬 수 있으므로 민감합니다. 여러 유형의 클라이언트로 작업하는 경우 이 문제는 더욱 악화됩니다.
- Observability Pipelines Worker 애그리게이터의 목적은 에이전트의 부담을 덜어주는 것이며, 로드 밸런싱을 맡는 것이 이를 돕습니다.

###### 로드 밸런서 유형 {#load-balancer-types}

Datadog은 Observability Pipelines Worker의 프로토콜(TCP, UDP, HTTP)을 지원하는 Layer 4(L4) 로드 밸런서(네트워크 로드 밸런서)를 권장합니다. HTTP 트래픽(Layer 7)만 전송하는 경우에도 Datadog은 성능과 단순성을 위해 L4 로드 밸런서를 권장합니다.

| 클라우드 공급자| 권장 사항                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer(NLB)                               |
| Azure         | Internal Azure Load Balancer                                  |
| Google Cloud  | Internal TCP/UDP Network Load Balancer                        |
| Private       | HAProxy, NGINX 또는 Layer 4를 지원하는 다른 로드 밸런서 |

###### 로드 밸런서 구성 {#load-balancer-configurations}

Datadog은 클라이언트와 로드 밸런서를 구성할 때 다음과 같은 일반 설정을 권장합니다.

- 간단한 라운드 로빈 로드 밸런싱 전략을 사용하세요.
- 영역 간 트래픽 불균형이 심할 경우를 제외하고 영역 간 로드 밸런싱을 활성화하지 마세요.
- 대상 상태를 확인하기 위해 Observability Pipelines Worker의 상태 API 엔드포인트를 사용하도록 로드 밸런서를 구성하세요.
- Observability Pipelines Worker 인스턴스가 확장 또는 축소될 때 자동으로 등록 또는 등록 해제되도록 하세요.
- 클라이언트와 로드 밸런서 모두에 대해 유휴 시간 초과가 1분을 넘지 않도록 keep-alive를 활성화하세요.
- 지원되는 경우 에이전트에서 연결 동시성 및 풀링을 활성화하세요. 지원되지 않는 경우 엣지에 Observability Pipelines Worker를 배포하는 통합 아키텍처를 고려하세요. 연결 풀링은 대량의 데이터를 여러 연결에 분산시켜 트래픽 균형을 맞추는 데 도움이 됩니다.

###### 로드 밸런서 핫 스팟 {#load-balancer-hot-spots}

로드 밸런싱 핫 스팟은 하나 이상의 Observability Pipelines Worker 인스턴스가 균형이 맞지 않는 트래픽을 수신할 때 발생합니다. 핫 스팟은 일반적으로 다음 두 가지 이유 중 하나로 인해 발생합니다.

1. 연결 하나에 대량의 트래픽이 전송되고 있습니다.
2. 하나의 가용 영역에서 발생하는 트래픽이 다른 가용 영역에서 발생하는 트래픽보다 훨씬 더 많습니다.

이러한 경우, 다음과 같은 문제 완화 전략이 권장됩니다.

1. 대규모 연결을 여러 연결로 분할합니다. 대부분의 클라이언트는 여러 연결에 데이터를 분산하는 연결 동시성 및 풀링을 허용합니다. 이 전략을 사용하면 로드 밸런서가 여러 Observability Pipelines Worker 인스턴스에 걸쳐 연결을 분산할 수 있습니다. 클라이언트가 이를 지원하지 않는 경우, Observability Pipelines Worker를 엣지에 추가로 배포할 수 있는 통합 아키텍처를 고려하세요.
2. 로드 밸런서에서 영역 간 로드 밸런싱을 활성화합니다. 영역 간 밸런싱은 모든 가용 영역 트래픽을 모든 Observability Pipelines Worker 인스턴스에 걸쳐 균형 있게 분산합니다.

#### 수직적 확장 {#vertical-scaling}

Observability Pipelines Worker의 동시성 모델은 모든 vCPU를 활용하도록 자동으로 확장됩니다. 동시성 설정이나 구성 변경은 필요하지 않습니다. 수직적 확장을 수행할 때, Datadog은 인스턴스 크기를 전체 볼륨의 50% 이하로 처리하도록 제한하고 고가용성을 위해 두 개 이상의 Observability Pipelines Worker 인스턴스를 배포할 것을 권장합니다.

#### 자동 확장 {#auto-scaling}

자동 확장은 평균 CPU 사용률을 기반으로 해야 합니다. 대부분의 워크로드에서 Observability Pipelines Worker는 CPU 제약을 받습니다. CPU 사용률은 오탐을 발생시키지 않으므로 자동 확장을 위한 가장 확실한 신호입니다. Datadog은 필요에 따라 조정하면서 다음 설정을 사용할 것을 권장합니다.

- 사용률 목표가 85%인 평균 CPU
- 확장 및 축소를 위한 5분의 안정화 기간

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#horizontal-scaling
[2]: /ko/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#vertical-scaling
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L208-L209
[4]: https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L238
[6]: /ko/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#optimize-the-instance
[7]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L70-L85
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html
[9]: https://www.datadoghq.com/architecture/op-vm-deployment/
[10]: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/