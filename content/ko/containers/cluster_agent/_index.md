---
aliases:
- /ko/agent/kubernetes/cluster/
- /ko/agent/cluster_agent/
- /ko/containers/cluster_agent/event_collection
- /ko/containers/cluster_agent/metadata_provider
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog 클러스터 에이전트 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 Kubernetes 워크로드 자동 확장
kind: 설명서
title: Kubernetes용 클러스터 에이전트
---

## 개요

Datadog 클러스터 에이전트는 클러스터 레벨 모니터링 데이터를 수집하기 위해 간소화된 중앙 집중식 접근 방식을 제공합니다. 클러스터 에이전트는 API 서버와 노드 기반 에이전트 간의 프록시 역할을 하여, 서버 로드를 완화하는 데 도움이 됩니다. 또한 클러스터 레벨 메타데이터를 노드 기반 에이전트에 전달하여 로컬에서 수집된 메트릭의 메타데이터의 품질을 향상합니다. 

Datadog 클러스터 에이전트를 사용하면 다음을 실행할 수 있습니다.

* 에이전트가 인프라에 미치는 영향을 완화합니다.
* 노드 기반 에이전트를 각각의 노드로 격리하여 kubelet에서 메트릭 및 메타데이터만 읽도록 RBAC 규칙을 줄입니다.
* 로컬에서 수집된 메트릭의 메타데이터 품질을 향상시키기 위해, API 서버에서만 찾을 수 있는 클러스터 레벨 메타데이터를 노드 에이전트에 제공합니다. 
* 서비스 또는 SPOF 모니터링 및 이벤트와 같은 클러스터 레벨 데이터 수집을 활성화합니다.
* 커스텀 Kubernetes 메트릭 및 외부 메트릭과 함께 Horizontal Pod Autoscaling(HPA)을 사용합니다. 자세한 내용은 [커스텀 및 외부 메트릭에 대한 오토스케일링 가이드][1]를 참고하세요.

Helm 차트 v2.7.0이나 Datadog Operator v1.0.0+을 사용해 Datadog 에이전트를 설치한 경우, **Datadog 클러스터 에이전트가 기본값으로 활성화**되어 있습니다.

Docker를 사용하는 경우 Docker 허브 및 GCR에서 Datadog 클러스터 에이전트를 사용할 수 있습니다.

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/cluster-agent][2]      | [gcr.io/datadoghq/cluster-agent][3]                       |

<div class="alert alert-warning">Docker Hub는 이미지 풀 속도 제한에 영향을 받습니다. Datadog에서는 Docker Hub를 사용하지 않는 사용자의 경우 Datadog 에이전트와 클러스터 에이전트 구성을 GCR 또는 ECR에서 Datadog 에이전트에서 풀하여 업데이트할 것을 권장합니다. 자세한 설명은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참고하세요.</div>

### 최소 에이전트 및 클러스터 에이전트 버전

최신 Kubernetes 버전과 관련된 일부 기능에는 최소 Datadog 에이전트 버전이 필요합니다.

| Kubernetes 버전  | 에이전트 버전  | 클러스터 에이전트 버전 | 이유                                |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | 1.9.0+                | Kubelet 메트릭 사용 중단           |
| 1.21.0+            | 7.36.0+        | 1.20.0+               | Kubernetes 리소스 사용 중단       |
| 1.22.0+            | 7.37.0+        | 7.37.0+               | 동적 서비스 계정 토큰 지원 |

{{< whatsnext desc="이 섹션에는 다음 주제를 포함합니다">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>설정</u>: Kubernetes 클러스터에서 Datadog 클러스터 에이전트를 설정합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>명령 및 옵션</u>: 클러스터 에이전트에서 사용할 수 있는 모든 명령과 옵션 목록입니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>클러스터 점검</u>: 클러스터 점검은 Kubernetes 서비스와 마찬가지로 로드 밸런스 클러스터 서비스에 자동탐지와 점검을 기능을 제공합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>엔드포인트 점검</u>: 엔드포인트 점검은 클러스터 점검이 확장되어 클러스터 서비스 뒤에 있는 엔드포인트를 모니터링합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Admission Controller</u>: 단순화된 애플리케이션 Pod 구성을 위해 Admission Controller를 구성합니다.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>클러스터 에이전트 트러블슈팅</u>: Datadog 클러스터 에이전트의 트러블슈팅 정보를 찾습니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[2]: https://hub.docker.com/r/datadog/cluster-agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent