---
aliases:
- /ko/observability_pipelines/architecture/networking/
title: (레거시) 네트워킹
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines는 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
본 지침은 대규모 프로덕션 수준 배포용입니다.
</div>

## 네트워크 토폴로지

### 네트워크 경계

대부분의 사용자는 여러 클라우드, 지역, VPC, 클러스터 등 많은 네트워크 경계를 가진 복잡한 프로덕션 환경을 관리합니다. 이러한 환경에서 Observability Pipelines Worker를 어디에 배치할지 결정하는 것은 쉽지 않습니다. 따라서 Datadog에서는 계정, VPC 및 클러스터가 여러 개 있는 경우에도 지역당 하나의 Observability Pipelines Worker Aggregator로 시작할 것을 권장합니다. 이와 같이 설정하면 네트워킹이 가장 광범위하고 세분화되어  공용 인터넷을 통해 데이터가 전송되는 것을 방지할 수 있습니다. 클러스터가 여러 개인 경우, 유틸리티 또는 도구 클러스터에 Observability Pipelines Worker를 배포하거나 공유 서비스에 가장 적합한 클러스터를 선택하세요.

{{< img src="observability_pipelines/production_deployment_overview/multi-cluster.png" alt="다이어그램, 여러 에이전트가 있는 두 개의 클러스터에서 여러 네트워크 로드 밸런서가 있는 유틸리티 및 도구 클러스터 및 여러 Observability Pipelines Workers가 Aggregator로 데이터를 전송하는 클라우드 리전을 표시." style="width:75%;" >}}

Observability Pipelines Worker 사용량이 증가함에 따라 여러 Observability Pipelines Worker 배포가 어디에 적합한지 명확해질 수 있습니다.

다중 배포에 관한 자세한 내용은 [고급 설정][1]을 참조하세요.

### DNS 및 서비스 검색

기본 DNS를 통한 서비스 검색이 지원되더라도 조직에서는 다른 형태의 서비스 검색을 도입했을 수 있습니다. Observability Pipelines Worker Aggregator 및 서비스 검색은 보유한 서비스 검색 매커니즘을 통해 확인해야 합니다.

{{< img src="observability_pipelines/production_deployment_overview/dns_service_discovery.png" alt="에이전트 클러스터, 로드 밸런서 클러스터, Observability Pipelines Workers Aggregator의 클라우드 리전을 보여주는 다이어그램. 각 그룹이 DNS나 서비스 레지스트리에 별도의 쿼리를 전송함" style="width:60%;" >}}

서비스 검색을 사용하면 고정 IP 주소가 아닌 명명된 호스트 이름으로 에이전트를 설정하여 트래픽의 라우팅 및 로드밸런싱을 용이하게 할 수 있습니다. 에이전트는 이러한 방법으로 로드 밸런서를 검색하고 로드 밸런서 역시 이러한 방법으로 Observability Pipelines Worker Aggregator를 검색합니다.

Observability Pipelines Worker 자체는 DNS 쿼리를 확인하지 않으며 이를 시스템 수준 확인자(예: [Linux 확인][2])에 위임합니다.

## 네트워크 트래픽

### 프록시

Observability Pipelines Worker는 모든 발신 HTTP 트래픽을 프록시로 라우팅하는 글로벌 프록시 옵션을 제공합니다. 프록시를 사용할지 여부는 조직의 보안 및 네트워킹 기본 설정에 따라 다릅니다.

### 포트

Observability Pipelines Worker를 사용하려면 네트워크 관리자가 쉽게 검색할 수 있도록 모든 포트를 명시적으로 설정해야 합니다. 따라서 Observability Pipelines Worker의 설정 파일을 확인하는 방법으로 노출된 모든 포트의 전체 인벤토리를 볼 수 있습니다. Observability Pipelines Worker Aggregator는 다음과 같은 포트를 노출시키는 기본 설정과 함께 제공됩니다.

| 포트 | 소스         | 프로토콜  | 방향| 설명                            |
| ---  | -------------- | ----------| -------- | ---------------------------------------|
| 8282 | Datadog Agent  | HTTP      | 수신 | 유동적 소스에서 데이터를 수신합니다.   |
| 123  | 파일          | Syslog    | 수신 | Syslog 소스에서 데이터를 수신합니다.   |

관리자가 포트를 변경했을 수 있으므로 노출된 정확한 포트는 Observability Pipelines Worker 설정에서 확인하시기 바랍니다.

### 프로토콜

Observability Pipelines Worker는 다양한 프로코톨에서 데이터를 전송하고 수신하도록 설계되었습니다. Datadog는 통합을 가장 잘 지원하는 프로토콜을 사용할 것을 권장합니다. 애플리케이션 수준 전송 확인을 위한 HTTP 기반 프로토콜과 가능한 경우 플랫폼간 유비쿼터스 지원을 선택하세요. 아니면 TCP-기반 프로코톨을 선택하세요. UDP의 경우 데이터 손실의 위험이 있으므로 권장하지 않습니다.

#### 작업자 간 커뮤니케이션

통합 아키텍처를 예로 들면, Observability Pipelines Worker 소스 및 싱크를 사용하여 Observability Pipelines Worker 인스턴스 간에 데이터를 전송할 수 있습니다. 이러한 소스는 효율적인 무손실 통신을 위해 GRPC 프로토콜을 사용합니다.

#### Agent 통신

Observability Pipelines Worker는 여러 에이전트용 특정 소스를 제공합니다. 예를 들어 `datadog_agent` 소스는 Datadog Agent에서 무손실 구조화된 형식으로 모든 데이터 유형을 수신할 수 있도록 처리합니다.

### 압축

압축은 Datadog 벤치마크에 따라 처리량을 50% 감소시킬 수 있습니다. 압축을 주의하여 사용하고 활성화 후 성능을 모니터링하세요.

네트워크 트래픽 압축은 성능에 미치는 영향 때문에 비용에 민감한 진입 시나리오에서만 사용해야 합니다(예: 공용 인터넷을 통한 데이터 전송). 그러므로 압축은 내부 네트워크 트래픽에는 권장되지 않습니다.

[1]: /ko/observability_pipelines/legacy/architecture/advanced_configurations
[2]: https://wiki.archlinux.org/title/Domain_name_resolution