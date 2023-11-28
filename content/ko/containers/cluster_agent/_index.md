---
aliases:
- /ko/에이전트/쿠버네티스/클러스터
- /ko/agent/cluster_agent/
- /ko/컨테이너스/클러스터_에이전트/이벤트_컬렉션
- /ko/컨테이너스/클러스터_에이전트/메타데이터_공급자
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog 클러스터 에이전트 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 쿠버네티스(Kubernetes) 워크로드 자동 확장
kind: 설명서
title: 쿠버네티스(Kubernetes)용 클러스터 Agent
---

## 개요

Datadog 클러스터 에이전트는 클러스터 레벨 모니터링 데이터를 수집하기 위해 간소화된 중앙 집중식 접근 방식을 제공합니다. 클러스터 에이전트는 API 서버와 노드 기반 에이전트 간의 프록시 역할을 하여, 서버 로드를 완화하는 데 도움이 됩니다. 또한 클러스터 레벨 메타데이터를 노드 기반 에이전트에 전달하여 로컬에서 수집된 메트릭의 메타데이터의 품질을 향상합니다.

Datadog 클러스터 에이전트를 사용하면 다음을 수행할 수 있습니다:

* 에이전트가 인프라에 미치는 영향을 완화합니다.
* 노드 기반 에이전트를 각각의 노드로 격리하여 kubelet에서 메트릭 및 메타데이터만 읽도록 RBAC 규칙을 줄입니다.
* 로컬에서 수집된 메트릭의 메타데이터 품질을 향상시키기 위해, API 서버에서만 찾을 수 있는 클러스터 레벨 메타데이터를 노드 에이전트에 제공합니다.
* 서비스 또는 SPOF 모니터링 및 이벤트와 같은 클러스터 레벨 데이터 수집을 활성화합니다.
* 커스텀 쿠버네티스(Kubernetes) 메트릭 및 외부 메트릭과 함께 Horizontal Pod Autoscaling HPA)을 사용합니다. 자세한 내용은 [커스텀 및 외부 메트릭에 대한 오토스케일링 가이드][1]를 참조하세요.

도커(Docker)를 사용하는 경우 도커(Docker) 허브 및 GCR에서 Datadog 클러스터 에이전트를 사용할 수 있습니다:

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/cluster-agent][2]      | [gcr.io/datadoghq/cluster-agent][3]                       |

<div class="alert alert-warning">도커(Docker) 허브는 2023년 7월 10일부터 데이터독의 도커(Docker) 허브 레지스트리에 대한 다운로드 속도 제한을 시행할 예정입니다. 레지스트리에서 이미지를 다운로드하면 제한 할당량에 따라 제한이 적용됩니다.<br/><br/>

Datadog는 Datadog 에이전트와 클러스터 에이전트 구성을 업데이트하여 다운로드 속도 제한이 적용되지 않는 다른 레지스트리에서 가져오도록 권장하고 있습니다. 자세한 내용은<a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경"을 참조하세요</a>.</div>

**참고**: Datadog 클러스터 에이전트의 모든 기능을 활용하려면 쿠버네티스(Kubernetes) v1.10 이상을 실행해야 합니다.

{{< whatsnext desc="이 섹션에는 다음 항목이 포함됩니다:">}}
{{< nextlink href="/에이전트/클러스터_에이전트/설정" >}}<u>셋업</u>: 쿠버네티스(Kubernetes) 클러스터에서 Datadog 클러스터 에이전트를 설정합니다.{{< /nextlink >}}
{{< nextlink href="/에이전트/클러스터_에이전트/커맨드" >}}<u>커맨드 & 옵션</u>: 클러스터 에이전트에 사용할 수 있는 모든 명령 및 옵션 목록입니다.{{< /nextlink >}}
{{< nextlink href="/에이전트/클러스터_에이전트/클러스터점검" >}}<u>클러스터 점검</u>: 클러스터 검사는 자동탐지 기능을 제공하고 쿠버네티스(Kubernetes)와 같은 부하 분산된 클러스터 서비스에 대한 점검을 수행합니다..{{< /nextlink >}}
{{< nextlink href="/에이전트/클러스터_에이전트/엔드포인트" >}}<u>엔드포인트점검</u>: 엔드포인트 검사는 클러스터 검사를 확장하여 클러스터 서비스의 모든 엔드포인트를 모니터링합니다.{{< /nextlink >}}
{{< nextlink href="/에이전트/클러스터_에이전트/어드미션_컨트롤러" >}}<u>어드미션 컨트롤러</u>: 단순화된 애플리케이션 파드 설정을 위해 승인 컨트롤러를 설정합니다.{{< /nextlink >}}
{{< nextlink href="/에이전트/클러스터_에이전트/트러블슈팅" >}}<u>클러스터 에이전트 트러블슈팅</u>: Datadog 클러스터 에이전트에 대한 트러블슈팅 정보 찾기t.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[2]: https://hub.docker.com/r/datadog/cluster-agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
