---
title: Scaling Observability Pipelines 확장 모범 사례
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines는 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
이 가이드는 대규모 프로덕션 수준 배포용입니다.
</div>

## 개요

Observability Pipelines Worker를 다른 서비스처럼 인프라스트럭처에 배포해 데이터를 가져와 편집하고 대상에 전송할 수 있습니다. 각 Observability Pipelines Worker 인스턴스는 개별적으로 작동하기 때문에 단순한 로드 밸런서로 아키텍처의 규모를 조정할 수 있습니다.

이 가이드에서는 Observability Pipelines Worker 사용자를 위해 추천 애그리게이터 아키텍처에 관해 설명합니다. 특히 다음 주제를 중심으로 설명합니다.

- Observability Pipelines Worker 애그리게이터를 수평적으로 조정해 인스턴스 최적화](#optimize-the-instance)
- Observability Pipelines Worker의 [용량 계획을 세우고 확장](#capacity-planning-and-scaling)하기 위해 리소스 용량 예측을 시작하는 방법 

## 인스턴스 최적화

### 인트턴스 규모 조정

최소 8개의 vCPU와 16 GiB 메모리를 갖춘 컴퓨팅 최적화 인스턴스를 사용하세요. 이 정도가 Observability Pipelines Workers 애그리게이터를 수평으로 확장하는 데 가장 적합한 유닛입니다. Observability Pipelines Worker는 수직으로 확장이 가능하며, 더 큰 인스턴스를 선택할 경우 자동으로 추가 리소스를 이용할 수 있습니다. 가용성을 개선하려면 데이터 볼륨에 최소 2개의 Observability Pipelines Worker 인스턴스를 허용할 수 있는 규모를 선택하세요.

| 클라우드 공급자| 추천                                        |
| ------------- | ----------------------------------------------------- |
| AWS           | c6i.2xlarge(추천) 또는 c6g.2xlarge              |
| Azure         | f8                                                    |
| Google Cloud  | c2(vCPU 8개, 16 GiB 메모리)                           |
| 프라이빗       | vCPU 8개, 메모리 16 GiB                             |

### CPU 크기 조정

Observability Pipelines Worker 워크로드는 CPU의 제약을 받으며, 최신 CPU에서 가장 잘 작동합니다.

| 클라우드 공급자| 추천                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |
| Azure         | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |
| Google 클라우드  | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |
| 프라이빗       | Intel Xeon 최신 세대, vCPUs 8개(추천), 최소 vCPU 4개 |

### CPU 아키텍처

Most Observability Pipelines Worker 워크로드는 최신 CPU 아키텍처에서 실행됩니다. X86_64 아키텍처는 Observability Pipelines Worker가 최적의 성능을 발휘할 수 있도록 도와줍니다.

### 메모리 크기 조정

Observability Pipelines Worker의 아핀 유형 시스템 때문에 Observability Pipelines Worker 워크로드의 메모리는 제약을 거의 받지 않습니다. 따라서 Datadog에서는 vCPU당 최소 2 GiB 이상의 메모리를 사용할 것을 권장합니다. 인 메모리 버퍼링과 배치 처리 때문에 대상 수가 증가할수록 메모리 사용도 증가합니다.  대상이 많을 경우 메모리 증량을 고려해야 합니다.

### 디스크 크기 조정

Observability Pipelines Worker를 설치하려면 디스크 공간 500MB 정도가 필요합니다.

## 용량 계획 및 확장

### 예측을 위한 유닛

다음은 예상 리소스 용량을 계산하기 위해 시작 지점이 되는 유닛입니다. 그러나 워크로드에 따라 다를 수 있습니다.

| 단위                  | 크기      | Observability Pipelines Worker 처리량*|
| ----------------------| --------- | ----------------------------------------- |
| 구조화되지 않은 로그 이벤트| ~512 바이트| ~10 MiB/s/vCPU                            |
| 구조화된 로그 이벤트  | ~1.5 KB   | ~25 MiB/s/vCPU                            |

*이 수치는 예상값을 내기 위해 보수적으로 잡은 것입니다. vCPU 1개 = ARM 물리적 CPU 1개와 Intel 물리적 CPU 0.5개

### 확장

#### 수평적 확장

수평적 확장이란 여러 Observability Pipelines Worker 인스턴스에 트래픽을 분산하는 것을 뜻합니다. Observability Pipelines Worker는 아무것도 공유하지 않는 아키텍처를 갖추고 있고, 확장할 때 복잡한 리더 노드나 다른 조정 작업이 필요 없습니다.

푸시 기반 소스의 경우, Observability Pipelines Worker 인스턴스를 네트워크 로드 밸런서와 함께 구성하고 필요에 따라 확장 및 축소하세요.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_push.png" alt="클라우드 영역을 에이전트, 네트워크 로드 밸런서, Observability Pipelines Worker 애그리게이터로 나눠 표현한 다이어그램. 에이전트에서 나온 데이터는 로드 밸런서,  Observability Pipelines Worker로 전송된 후, 다른 대상으로 이동" style="width:60%;" >}}

로드 밸런서는 풀 기반 소스에 필요하지 않습니다. Observability Pipelines Worker를 배포한 후 상황에 맞게 확장하거나 축소하세요.  Observability Pipelines Worker에서 읽기를 요청하면 게시-구독 시스템에서 데이터 전용 액세스를 부여합니다.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_pull.png" alt="클라우드 영역을 에이전트, 브로커, Observability Pipelines 애그리게이터로 나눠 표현한 다이어그램. 에이전트에서 나온 데이터가 브로커로 전송되고, 이후 브로커와 Observability Pipelines Worker 간에 송수신되며, 마지막으로 Worker에서 다른 대상으로 전송됨." style="width:60%;" >}}

##### 로드 밸런싱

에이전트와 같은 푸시 기반 소스에만 로드 밸런서가 필요합니다. Kafka와 같은 풀 기반 소스만 사용할 경우에는 로드 밸런서가 필요 없습니다.

###### 클라이언트측 로드 밸런싱

클라이언트측 로드 밸런싱을 권장하지 않습니다. 클라이언트측 로드 밸런싱은 클라이언트에서 여러 Observability Pipelines Worker 인스턴스로 트래픽을 로드 밸런싱한다는 뜻입니다. 이 방법이 간단하게 보이지만, 실제로는 안정성이 떨어지고 더 복잡할 수 있습니다. 그 이유는 다음과 같습니다.

- 적절한 장애 조치가 있는 로드 밸런싱은 복잡합니다. 이 영역의 문제는 데이터 손실이나 서비스에 영향을 미치는 인시던트로 이어질 수 있기 때문에 민감합니다. 또 여러 유형의 클라이언트가 있으면 더욱 복잡해집니다.
- Observability Pipelines Worker 애그리게이터의 목적은 에이전트의 책임을 분산시키는 것이며, 로드 밸런싱을 사용해 이를 도울 수 있습니다.

###### 로드 밸런서 유형

Datadog에서는 Observability Pipelines Worker의 프로토콜(TCP, UDP, HTTP)을 지원하는 Layer 4(L4) 로드 밸런서(네트워크 로드 밸런서) 사용을 권고합니다. HTTP 트래픽(Layer 7)만 전송하는 경우에도 성능과 간편함의 측면에서 L4 로드 밸런서를 사용하는 것이 더 좋습니다.

| 클라우드 공급자| 추천                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer(NLB)                               |
| Azure         | Internal Azure Load Balancer                                  |
| Google 클라우드  | Internal TCP/UDP Network Load Balancer                        |
| 프라이빗       | HAProxy, NGINX, 또는 레이어-4 지원되는 기타 로드 밸런서 |

###### 로드 밸런서 구성

Datadog에서는 클라이언트와 로드 밸런서를 구성할 때 다음과 같은 일반 설정을 권장합니다.

- 간단한 라운드 로빈 로드 밸런싱 전략을 사용하세요.
- 영역 간 트래픽 불균형이 심할 경우가 아니면 교차 영역 로드 밸런싱을 사용하지 마세요.
- 대상 상태를 확인을 위해 Observability Pipelines Worker의 API 엔드포인트를 사용해 로드 밸런서를 구성하세요.
- Observability Pipelines Worker 인스턴스가 확장할 때 자동으로 등록/등록 해제되도록 하세요.
- 클라이언트와 로드 밸런서 모두에서 유휴 시간 초과를 1분 이하로 설정하세요.
- 가능할 경우 에이전트에서 연결 동시성 및 풀링을 활성화하세요. 지원되지 않을 경우에는 마지막 단계에 Observability Pipelines Worker를 배포하는 통합 아키텍처를 사용하는 것을 고려해 보세요. 연결 풀링을 사용하면 대량의 데이터가 여러 연결을 통해 분산되도록 하여 트래픽 균형을 맞추는 데 도움을 줍니다.

###### 로드 밸런서 핫 스팟

로드 밸런싱 핫 스팟은 하나 이상의 Observability Pipelines Worker 인스턴스에서 너무 많은 트래픽을 수신할 때 발생합니다. 다음 두 이유 중 하나 때문에 핫 스팟이 발생합니다.

1. 연결 하나에 대량 트래픽이 전송되는 경우
2. 다른 가용 영역에 비해 가용 영역 하나에서 트래픽이 너무 높은 경우

이와 같은 상황이 발생할 경우, 다음 해결 방법을 사용하는 것이 좋습니다.

1. 규모가 큰 연결 하나를 여러 연결로 분할합니다. 대부분의 클라이언트가 데이터를 여러 연결로 분산할 수 있는 동시 연결성과 풀링을 허용합니다. 이와 같은 방법을 사용하면 로드 밸런서가 여러 Observability Pipelines Worker 인스턴스로 연결을 분산할 수 있습니다. 클라이언트에서 이를 지원하지 않을 경우 통합 아키텍처를 사용할 수 있습니다. 통합 아키텍처를 사용하면 마지막 단계에서 Observability Pipelines Worker를 추가로 배포할 수 있습니다.
2. 로드 밸런서에 교차 영역 로드 밸런싱을 활성화하세요. 교차 영역 밸런싱을 이용하면 가용 영역 전체에 있는 트래픽을 Observability Pipelines Worker 인스턴스 전체로 분산하여 균형을 맞춥니다.

#### 수직적 확장

Observability Pipelines Worker의 동시성 모델은 자동으로 vCPU를 모두 사용해 확장합니다. 동시성 설정이나 구성 변경이 따로 필요 없습니다. Datadog에서는 수직적 확장을 할 때 처리하는 인스턴스의 크기를 총 볼륨의 50%를 넘지 않도록 제한하고, 가용성을 높이기 위해 최소 2개의 Observability Pipelines Worker 인스턴스로 배포하는 것을 권고합니다.

#### 자동 스케일링

자동 스케일링은 평균 CPU 사용률을 기준으로 결정해야 합니다. 대부분의 워크로드에서 Observability Pipelines Worker는 CPU의 제약을 받습니다. CPU 사용률은 거짓 양성 신호를 보내지 않기 때문에 자동 스케일링에 사용할 수 있는 가장 유용한 신호입니다. Datadog에서는 다음 설정을 이용하고, 필요에 따라 조정할 것을 권장합니다.

- 평균 CPU 사용률 목표 85%
- 확장 및 축소 안정화 시간 5분