---
aliases:
- /ko/agent/kubernetes/cluster/
- /ko/agent/cluster_agent/
- /ko/containers/cluster_agent/event_collection
- /ko/containers/cluster_agent/metadata_provider
description: Datadog Cluster Agent를 통한 클러스터 수준 모니터링 데이터 수집의 중앙집중식 접근 방식
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog Cluster Agent 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 Kubernetes 워크로드 자동 확장
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: 블로그
  text: Datadog의 CSI 드라이버로 보안 Kubernetes 환경에 고성능 관측 가능성 실현
- link: https://www.datadoghq.com/architecture/efficient-kubernetes-monitoring-with-the-datadog-cluster-agent/
  tag: 아키텍처 센터
  text: Datadog Cluster Agent를 이용한 효율적인 Kubernetes 모니터링
- link: https://www.datadoghq.com/architecture/real-world-applications-of-the-datadog-cluster-agent-part-one/
  tag: 아키텍처 센터
  text: Datadog Cluster Agent의 실제 활용 사례 (1부)
title: Kubernetes용 Cluster Agent
---
## 개요 {#overview}

Datadog Cluster Agent는 클러스터 수준 모니터링 데이터를 보다 간소화되고 중앙집중식으로 수집할 수 있도록 지원합니다. API 서버와 노드 기반 Agent 사이에서 프록시 역할을 수행함으로써, Cluster Agent는 서버 부하를 완화하는 데 도움을 줍니다. 또한 클러스터 레벨 메타데이터를 노드 기반 Agent에 전달하여, 로컬에서 수집된 메트릭의 메타데이터 품질을 향상시킬 수 있도록 합니다.

Datadog Cluster Agent를 사용하면 다음을 수행할 수 있습니다.

* Agent가 인프라에 미치는 영향을 완화합니다.
* 노드 기반 Agent를 각각의 노드로 격리하여 kubelet에서 메트릭 및 메타데이터만 읽도록 RBAC 규칙을 줄입니다.
* 로컬에서 수집된 메트릭의 메타데이터 품질을 향상시키기 위해, API 서버에서만 찾을 수 있는 클러스터 레벨 메타데이터를 노드 기반 Agent에 제공합니다.
* 서비스, SPOF 및 이벤트 모니터링과 같은 클러스터 레벨 데이터 수집을 활성화합니다.
* 사용자 지정 Kubernetes 메트릭 및 외부 메트릭과 함께 Horizontal Pod Autoscaling(HPA)를 사용합니다. 자세한 내용은 [사용자 지정 및 외부 메트릭 기반 Autoscaling 가이드][1]를 참조하세요.

Helm 차트 v2.7.0 또는 Datadog Operator v1.0.0+를 사용하여 Datadog Agent를 설치한 경우, **Datadog Cluster Agent가 기본적으로 활성화됩니다**.

Datadog은 Datadog Container Registry, Google Artifact Registry(GAR), Amazon ECR, Azure ACR, Docker Hub에 컨테이너 이미지를 게시합니다.

{{% container-images-table %}}

기본적으로 Datadog Agent Helm 차트는 Datadog 사이트, 클러스터 유형 및 `registryMigrationMode` 값을 기준으로 Agent 이미지 레지스트리를 결정합니다. 이 값과 환경별 제외 규칙에 따라 Agent 이미지는 Datadog Container Registry(`registry.datadoghq.com`) 또는 사이트별 레지스트리에서 가져옵니다. Datadog Operator 차트는 기본적으로 Datadog Agent Helm 차트의 종속성으로 포함되어 있습니다. Datadog Operator 차트 버전 2.19.0부터 해당 종속성을 통해 Operator를 설치하면 Datadog Agent Helm 차트의 `registryMigrationMode` 설정이 Operator가 관리하는 Agent 이미지에도 적용됩니다. Operator Helm 차트 자체에는 `registryMigrationMode` 설정이 정의되어 있지 않으며, Operator 포드 이미지는 Operator 차트의 `image.repository` 값으로 별도 제어됩니다.

<div class="alert alert-warning">Docker Hub에는 이미지 풀 속도 제한이 적용됩니다. Docker Hub 고객이 아니라면 Datadog은 다른 레지스트리에서 이미지를 가져오도록 Datadog Agent 및 Cluster Agent 구성을 업데이트할 것을 권장합니다. 관련 지침은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참조하세요.</div>

### 최소 Agent 및 Cluster Agent 버전 {#minimum-agent-and-cluster-agent-versions}

최적의 호환성을 위해 Datadog은 Cluster Agent와 Agent를 동일한 버전으로 유지할 것을 권장합니다. Kubernetes 버전과 Datadog 버전의 전체 지원 매트릭스는 [Kubernetes 설치 페이지][2]를 참조하세요.

{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다.">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>설정</u>: Kubernetes 클러스터에서 Datadog Cluster Agent를 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>명령어 및 옵션</u>: Cluster Agent에서 사용할 수 있는 모든 명령어 및 옵션 목록입니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>클러스터 검사</u>: 클러스터 검사는 Kubernetes 서비스와 같이 로드 밸런싱된 클러스터 서비스에 대해 자동 탐지 및 검사를 수행하는 기능을 제공합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>엔드포인트 검사</u>: 엔드포인트 검사는 클러스터 검사를 확장하여 클러스터 서비스 뒤에 있는 모든 엔드포인트를 모니터링합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u>: 간소화된 애플리케이션 포드 구성을 위해 Admission Controller를 구성합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent 문제 해결</u>: Datadog Cluster Agent의 문제 해결 정보를 찾습니다.{{< /nextlink >}}
{{< /whatsnext >}}

## Cluster Agent 모니터링 {#monitoring-the-cluster-agent}
Datadog Agent에는 Cluster Agent를 자동으로 모니터링하는 통합 기능이 포함되어 있습니다. 이 통합 기능은 Cluster Agent와 동일한 노드에 있는 일반 Datadog Agent 포드에서 실행됩니다. Cluster Agent 자체에서는 실행되지 않습니다. 자세한 내용은 [Datadog Cluster Agent 통합 문서][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[2]: /ko/containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/ko/integrations/datadog_cluster_agent/