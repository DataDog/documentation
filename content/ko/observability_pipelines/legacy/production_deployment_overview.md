---
aliases:
- /ko/observability_pipelines/production_deployment_overview/
title: (레거시) 배포 설계 및 원칙
---

{{% observability_pipelines/legacy_warning %}}

## 개요

인프라스트럭처에 Observability Pipelines Worker를 배포하기 시작하면 다음과 같은 질문이 생길 수 있습니다.

- 네트워크 내의 어디에 Observability Pipelines Worker를 배포해야 하나요?
- 데이터 수집을 어떻게 해야 하나요?
- 데이터를 어디에서 처리 해야 하나요?

이 가이드에서는 Observability Pipelines Worker 아키텍처를 설계할 때 고려해야 할 사항을 설명합니다. 특히 다음 주제를 중심으로 설명합니다.

- [네트워킹](#networking)
- [데이터 수집](#collecting-data)
- [데이터 처리](#processing-data)
- [데이터 버퍼링](#buffering-data)
- [데이터 라우팅](#routing-data)

## 네트워킹

Observability Pipelines Worker 배포를 설계할 때 해야 하는 첫 단계는 네트워크 내에 어디에 Observability Pipelines Worker가 적합한지, 어디에 배포해야 할지 확인하는 것입니다.

### 네트워크 경계 작업

Observability Pipelines Worker는 애그리게이터로 배포되기 때문에 송신 비용을 최소화하려면 네트워크 경계 내에 배포되어야 합니다. Observability Pipelines Worker에서 수신을 할 때는 공용 인터넷을 통해서는 안 됩니다. 따라서 Datadog에서는 리전 별로 애그리게이터 하나로 시작할 것을 권고합니다.

### 방화벽과 프록시 사용

방화벽을 사용할 경우, 에이전트에서 애그리게이터로 가는 통신을 제한하고, 애그리게이터에서 구성된 소스와 싱크로 가는 통신을 제한합니다.

HTTP 프록시 사용을 선호하는 경우, Observability Pipelines Worker에서 전역 프록시 옵션을 제공하기 때문에 Observability Pipelines Worker HTTP 트래픽 전체를 프록시를 통해 라우팅할 수 있습니다.

### DNS와 서비스 검색 사용

Observability Pipelines Worker 애그리게이터와 서비스는 DNS 또는 서비스 검색으로 확인해야 합니다. 이 전략으로 트래픽 라우팅과 로드 밸런싱을 활성화할 수 있고, 에이전트와 로드 밸런서가 애그리게이터를 찾을 수 있습니다. 문제를 적절하게 분리하기 위해 Observability Pipelines Worker에서는 DNS 쿼리를 확인하지 않습니다. 대신, 이를 시스템 수준 확인자(예: [Linux 확인[1])에 위임합니다.

{{< img src="observability_pipelines/production_deployment_overview/dns_service_discovery.png" alt="에이전트 클러스터, 로드 밸런서 클러스터, Observability Pipelines Workers 애그리게이터의 클라우드 리전을 보여주는 다이어그램. 각 그룹이 DNS나 서비스 레지스트리에 별도의 쿼리를 전송함" style="width:60%;" >}}

### 프로토콜 선택

Datadog에서는 Observability Pipelines Worker에 데이터를 전송할 때 로드 밸런싱과 애플리케이션 수준 전송 승인이 용이한 프로토콜을 선택하는 것을 권고합니다. HTTP와 gRPC가 널리 사용되고 있으며, HTTP/gRPC 기반 서비스와 관련해 효율적이고 효과적으로 작동하도록 돕는 다양한 도구와 설명서가 많기 때문에 추천합니다.

프로토콜에 맞는 소스를 선택하세요. 각 옵저버빌리티 파이프라인 작업자 소스는 서로 다른 프로토콜을 구현합니다. 예를 들어 옵저버빌리티 파이프라인 작업자 소스 및 싱크는 옵저버빌리티 파이프라인 작업자 간 통신을 위해 gRPC를 사용하며, HTTP 소스를 사용하면 HTTP를 통해 데이터를 수신할 수 있습니다. 해당 프로토콜은 [소스][2]를 참조하세요.

## 데이터 수집

파이프라인의 첫 시작은 데이터 수집입니다. 서비스와 시스템에서 데이터를 생성[*](#support)하며, 이 데이터는 수집되어 대상까지 다운스트림으로 전송될 수 있습니다. 이와 같은 데이터 수집은 에이전트에서 하며, 사용할 에이전트를 잘 이해해야 필요한 데이터를 수집할 수 있습니다.

### 에이전트 선택

엔지니어 팀의 시스템 모니터링 능력을 최적화할 수 있는 에이전트를 선택해야 합니다. 따라서 작업에 최적인 에이전트를 선택해 Observability Pipelines Worker와 통합하고 Observability Pipelines Worker를 별도의 애그리게이터로 배포해야 합니다.

예를 들어, Datadog [Network Performance Monitoring][4]은 Datadog Agent와 통합될 때 공급 업체 지정 시스템과 함께 통합되고 공급 업체 지정 데이터를 생성합니다. 데이터가 Observability Pipelines Worker에서 지원되는 데이터 유형이 아니기 때문에 Datadog Agent에서 데이터를 수집하고 Datadog로 바로 전송합니다.

또 다른 예로, Datadog Agent는 서비스 메트릭을 수집하고 공급 업체 지정 Datadog 태그로 보강합니다. 이 경우, Datadog Agent에서 메트릭을 Datadog로 바로 전송하거나 Observability Pipelines Worker을 통해 라우팅합니다. 생성된 데이터가 공급 업체 지정 방식으로 보강되기 때문에 Observability Pipelines Worker를 Datadog Agent 대신 사용해서는 안 됩니다.

에이전트를 통합할 때 데이터를 Observability Pipelines Worker를 통해 라우팅하여 로컬 네트워크에서 에이전트를 통해 Observability Pipelines Worker가 데이터를 직접 수신하도록 구성합니다. `datadog_agent` 또는 `open_telemetry`와 같은 소스 구성 요소 사용해 에이전트에서 데이터를 수신합니다.

##### 에이전트 리스크 감소

에이전트와 통합할 때 에이전트를 단순 데이터 포워더로 구성하고 지원 데이터 유형을 Observability Pipelines Worker를 통해 라우팅하세요. 이렇게 구성하면 에이전트의 부담을 최소화하여 데이터 손실과 서비스 혼잡을 줄일 수 있습니다.

## 데이터 처리

Observability Pipelines Worker 소스와 싱크 간 파이프라인을 효율적으로 설계하려면 데이터 처리 유형과 데이터 처리 장소를 이해하는 것이 좋습니다.

### 처리할 데이터 선택

Observability Pipelines Worker를 사용해 데이터를 처리할 수 있습니다[*](#support). 그러나 연속적 프로파일링 데이터와 같은 실시간 공급 업체 지정 데이터는 상호 정보 교환이 불가능하고 데이터 처리의 장점이 없습니다.

#### 원격 처리

원격 처리의 경우 Observability Pipelines Worker를 별도의 노드에 애그리게이터로 배포할 수 있습니다.

{{< img src="observability_pipelines/production_deployment_overview/aggregator_role.png" alt="Observability Pipelines Worker 애그리게이터 다이어그램. 네트워크 로드 밸런서에서 데이터를 수신하고 여러 싱크로 데이터를 전송하는 Worker가 다수 포함됨" style="width:100%;" >}}

데이터 처리 작업 주체가 노드에서 원격 애그리게이터 노드로 변경됩니다. 내구성과 가용성이 높은 환경(대부분의 환경)에서 원격 처리를 하는 것을 추천합니다. 또 에이전트를 추가할 때 인프라스트럭처를 다시 구조화할 필요가 없기 때문에 설정이 용이합니다.

자세한 내용은 [애그리게이터 아키텍처][5]를 참고하세요.

## 데이터 버퍼링

데이터 버퍼링 방법과 장소 또한 파이프라인 효율성에 영향을 미칩니다.

### 데이터 버퍼링 장소 선택

버퍼링은 대상과 가까운 곳에서 진행되어야 하고, 각 대상에 별도로 버퍼링 장소가 있어야 합니다. 이렇게 구성하면 다음과 같은 장점이 있습니다.

1. 각 대상이 싱크 요구 사항을 충족하면서 버퍼를 구성할 수 있습니다. 자세한 내용은 [데이터 버퍼 방법 선택](#choosing-how-to-buffer-data)을 참고하세요.
2. 각 대상에 독립된 버퍼를 구성하면 대상 한 곳에 오작동이 발생할 경우 버퍼가 구성된 용량에 도달할 때까지 전체 파이프라인이 중지되는 상황을 피할 수 있습니다.

이와 같은 이유로 Observability Pipelines Worker는 버퍼와 싱크를 함께 묶습니다.

{{< img src="observability_pipelines/production_deployment_overview/where_to_buffer.png" alt="노드 에이전트가 Observability Pipelines Worker에 데이터를 보내는 다이어그램. 버퍼가 다른 노드에 있음" style="width:50%;" >}}

### 데이터 버퍼 방법 선택

Observability Pipelines Worker에 내장된 버퍼를 이용하면 작업을 간편화하고 복잡한 외부 버퍼를 사용할 필요가 없습니다.

Observability Pipelines Worker 버퍼 유형을 선택할 때 대상 목적에 가장 적합한 유형을 선택하세요. 예를 들어 분석 시스템 내역의 경우 내구성을 높이기 위해 디스크 버퍼를 사용해야 하고, 분석 시스템은 지연 시간을 낮추기 위해 메모리 버퍼를 사용해야 합니다. 또 이 두 버퍼가 서로 오버플로가 가능하도록 하여 클라이언트로 역압이 발생하는 것을 예방해야 합니다.

{{< img src="observability_pipelines/production_deployment_overview/how_to_buffer.png" alt="Observability Pipelines Worker의 소스가 디스크 버퍼와 메모리 버퍼로 데이터를 전송하는 다이어그램. 버퍼의 싱크가 서로 가까운 곳에 위치하고 있음" style="width:100%;" >}}

## 데이터 라우팅

파이프라인 설계의 마지막은 데이터를 라우팅하여 애그리게이터에서 데이터를 적절한 대상으로 보낼 수 있도록 하는 것입니다. 애그리게이터를 사용해 내 시스템에 가장 적절한 시스템으로 유연하게 데이터를 라우팅하세요.

### 레코드 시스템과 분석 시스템 분리

레코드 시스템과 분석 시스템을 분리해야 목적을 성공적으로 달성하면서 비용을 절감할 수 있습니다. 예를 들어, 레코드 시스템에서는 시간에 따라 대량의 데이터를 배치 처리하고 압축해 비용을 최소화하면서 전체 데이터의 내구성을 높게 유지할 수 있습니다. 분석 시스템은 데이터를 샘플링 및 정리하여 비용을 줄이면서 실시간 분석에 지연 시간을 낮게 유지할 수 있습니다.

{{< img src="observability_pipelines/production_deployment_overview/separating_concerns.png" alt="Observability Pipelines Worker의 소스가 디스크 버퍼로 데이터를 전송하는 다이어그램. 이후 디스크 버퍼에서 보관용으로 데이터를 전송하거나 샘플링용으로 블록 스토리지에 전송함." style="width:100%;" >}}

### 레코드 시스템으로 라우팅(아카이빙)

다음 작업을 통해 레코드 시스템을 최적화하여 내구성을 높이면서 비용을 줄일 수 있습니다.

- 애그리게이터 역할로 아카이브에 쓰기 작업만 하여 노드 재시작과 소프트웨어 실패로 인한 데이터 손실을 줄입니다.
- 디스크 버퍼를 싱크 앞으로 보냅니다.
- 모든 소스의 엔드 투 엔드 승인을 활성화합니다.
- `batch.max_bytes`을 5MiB 이상, `batch.timeout_secs`를 5분 이상으로 설정하고 압축을 활성화합니다(`aws_s3` 싱크와 같은 아카이빙 싱크 기본값).
- 처리되지 않은 원시 데이터를 아카이빙하여 데이터 재생을 허용하고 처리 중 발생하는 데이터 오염의 위험을 줄입니다.

### 분석 시스템으로 라우팅

다음 작업을 통해 분석 시스템을 최적화하여 분석 중 비용을 줄일 수 있습니다.

- 메모리 버퍼를 싱크 앞으로 보냅니다.
- `batch.timeout_sec`를 5초 이하(`datadog_logs`와 같은 분석 싱크 기본값)로 설정합니다.
- `remap` 변형을 사용해 분석에 사용하지 않는 속성을 제거합니다.
- 분석에 사용하지 않는 이벤트 필터링
- 샘플링 로그를 `level` `info` 이하로 설정해 볼륨을 축소하는 것이 좋습니다.

[1]: https://wiki.archlinux.org/title/Domain_name_resolution
[2]: /ko/observability_pipelines/legacy/reference/sources/
[4]: /ko/network_monitoring/performance/
[5]: /ko/observability_pipelines/legacy/architecture/

---

<a name="support"></a> * Observability Pipelines는 로그를 지원합니다. 메트릭 지원은 베타 서비스 중입니다.