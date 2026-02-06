---
aliases:
- /ko/agent/kubernetes/cluster/
- /ko/agent/cluster_agent/
- /ko/containers/cluster_agent/event_collection
- /ko/containers/cluster_agent/metadata_provider
description: Datadog Cluster Agent로 클러스터 수준의 모니터링 데이터를 중앙화된 방식으로 수집
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog 클러스터 에이전트 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 Kubernetes 워크로드 자동 확장
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: 블로그
  text: Datadog의 CSI 드라이버로 고성능 옵저버빌리티를 확보해 Kubernetes 환경 보안 강화
title: Kubernetes용 클러스터 에이전트
---

## 개요

Datadog 클러스터 에이전트는 클러스터 레벨 모니터링 데이터를 수집하기 위해 간소화된 중앙 집중식 접근 방식을 제공합니다. 클러스터 에이전트는 API 서버와 노드 기반 에이전트 간의 프록시 역할을 하여, 서버 로드를 완화하는 데 도움이 됩니다. 또한 클러스터 레벨 메타데이터를 노드 기반 에이전트에 전달하여 로컬에서 수집된 메트릭의 메타데이터의 품질을 향상합니다. 

Datadog Cluster Agent를 사용해 다음을 할 수 있습니다.

* 에이전트가 인프라에 미치는 영향을 완화합니다.
* 노드 기반 에이전트를 각각의 노드로 격리하여 kubelet에서 메트릭 및 메타데이터만 읽도록 RBAC 규칙을 줄입니다.
* 로컬에서 수집된 메트릭의 메타데이터 품질을 향상시키기 위해, API 서버에서만 찾을 수 있는 클러스터 레벨 메타데이터를 노드 에이전트에 제공합니다. 
* 서비스 또는 SPOF 모니터링 및 이벤트와 같은 클러스터 레벨 데이터 수집을 활성화합니다.
* HPA(Horizontal Pod Autoscaling)를 커스텀 Kubernetes 메트릭 및 외부 메트릭과 함께 사용하세요. 자세한 내용은 [커스텀 및 외부 메트릭으로 오토스케일링 가이드][1]를 참고하세요.

Helm 차트 v2.7.0 또는 Datadog Operator v1.0.0+를 사용해 Datadog Agent를 설치한 경우, **Datadog Cluster Agent가 기본적으로 활성화**되어 있습니다.

Datadog는 컨테이너 이미지를 Google Artifact Registry, Amazon ECR, Azure ACR, Docker Hub에 게시합니다.

| Google Artifact Registry | Amazon ECR             | Azure ACR            | Docker Hub        |
| ------------------------ | ---------------------- | -------------------- | ----------------- |
| gcr.io/datadoghq         | public.ecr.aws/datadog | datadoghq.azurecr.io | docker.io/datadog |

기본적으로 Cluster Agent 이미지를 Google Artifact Registry(`gcr.io/datadoghq`)에서 풀링합니다. 배포 환경에서 Artifact Registry를 사용할 수 없는 경우에는 다른 레지스트리를 사용하세요.

<div class="alert alert-danger">Docker Hub에는 이미지 풀링 속도 제한이 있습니다. Docker Hub 고객이 아닌 경우, Datadog에서는 Datadog Agent와 Cluster Agent 구성을 업데이트하여 GCR이나 ECR에서 풀링하도록 구성할 것을 권고합니다. 예시를 보려면 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참고하세요.</div>

### 최소 에이전트 및 클러스터 에이전트 버전

Datadog에서는 최적의 호환성을 위해 동일한 버전의 Cluster Agent와 Agent를 사용할 것을 권장합니다. Kubernetes 버전과 Datadog 버전의 지원 메트릭스 전체를 보려면 [Kubernetes 설치 페이지][2]를 참고하세요.

{{< whatsnext desc="이 섹션에는 다음 주제를 다룹니다.">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>설정</u>: 내 Kubernetes Cluster에 Datadog Cluster를 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>명령 및 옵션</u>: Cluster Agent의 모든 명령 및 옵션 목록을 봅니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>클러스터 점검</u>: 클러스터 점검을 사용하면 로드 밸런스가 완료된 클러스터 서비스(예: Kubernetes 서비스)에 자동 탐지를 활성화하고 점검을 실행할 수 있습니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>엔드포인트 점검</u>: 엔드포인트 점을 이용하면 클러스터 점검을 확장하여 클러스터 서비스의 엔드포인트를 점검합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u>: Admission Controller를 구성해 더욱 간편하게 애플리케이션 Pod를 구성할 수 있습니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent 트러블슈팅</u>: Datadog Cluster Agent의 트러블슈팅 정보를 확인할 수 있습니다.{{< /nextlink >}}
{{< /whatsnext >}}

## Cluster Agent 모니터링
Datadog Agent에는 자동으로 Cluster Agent를 모니터링하는 통합 기능이 포함되어 있습니다. 이 통합은 Cluster Agent와 동일한 노드에 있는 일반 Datadog Agent 포드에서 실행됩니다. Cluster Agent 자체에서 실행되지 않습니다. 자세한 내용은 [Datadog Cluster Agent 통합 설명서][3]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[2]: /ko/containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/ko/integrations/datadog_cluster_agent/