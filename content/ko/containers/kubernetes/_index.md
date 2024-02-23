---
aliases:
- /ko/guides/basic_agent_usage/kubernetes
- /ko/agent/basic_agent_usage/kubernetes
- /ko/tracing/kubernetes/
- /ko/tracing/setup/kubernetes
- /ko/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
- /ko/integrations/faq/can-i-install-the-agent-on-my-Kubernetes-master-node-s/
- /ko/integrations/faq/docker-ecs-kubernetes-events/
- /ko/integrations/faq/container-integration-event/
- /ko/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250/
- /ko/agent/kubernetes/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: 릴리스 노트
  text: 최신 Datadog 컨테이너 릴리스를 확인하세요(앱 로그인 필요).
- link: /agent/guide/autodiscovery-management
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/guide/docker-deprecation
  tag: 설명서
  text: 쿠버네티스(Kubernetes) 도커(Docker) 런타임 지원 중단
kind: 설명서
title: 쿠버네티스(Kubernetes)
---

## 개요

쿠버네티스 클러스터에서 Datadog 에이전트를 실행하여 클러스터와 애플리케이션 메트릭, 트레이스와 로그 수집을 시작하세요.

**참고**: 에이전트 v6.0 이상만 쿠버네티스 v1.7.6 이상을 지원합니다. 이전 버전의 쿠버네티스의 경우 [레거시 쿠버네티스 버전 섹션][1]을 참조하세요.

에이전트 명령의 경우 [에이전트 명령 가이드][2]를 참조하세요.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>설치</u>: 쿠버네티스 환경에서 Datadog 에이전트를 설치합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>구성</u>: 이벤트를 수집하고, 프록시 설정을 덮어쓰고, DogStatsD를 사용해 커스텀 메트릭을 보내고, 컨테이너 허용 목록과 차단 목록을 구성하고, 사용 가능한 환경 변수 전체 목록을 참조합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>배포</u>: AWS EKS(Elastic Kubernetes Service), AKS(Azure Kubernetes Service), GKE(Google Kubernetes Engine), 레드햇(Red Hat) OpenShift, Rancher 및 OKE(Oracle Container Engine for Kubernetes)를 포함하여 주요 쿠버네티스 배포를 위한 기본 구성을 검토합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: 트레이스 수집 설정: 에이전트를 구성하여 트레이스를 허용하고, 포드를 구성하여 에이전트와 통신하도록 하고, 애플리케이션 트레이스를 구성하여 트레이스를 내보냅니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>로그 수집</u>: 쿠버네티스 환경에서 로그 수집을 설정합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>태그 추출</u>: 에이전트를 구성하여 태그를 생성하고 컨테이너, 포드, 또는 노드에서 내보내기된 모든 메트릭, 트레이스와 로그를 쿠버네티스 레이블 또는 주석에 따라 할당합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>통합 및 자동 검색</u>: 쿠버네티스 환경에서 통합을 구성하려면, Datadog의 자동 검색 기능을 사용합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus 및 OpenMetrics</u>: 쿠버네티스에서 실행되는 애플리케이션에서 노출된 Prometheus 및 OpenMetrics 메트릭을 수집합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>컨트롤 플레인 모니터링</u>: 쿠버네티스 API 서버, 컨트롤러 관리자, 스케줄러 등을 모니터링합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>수집된 데이터</u>: 쿠버네티스 클러스터에 배포되면 에이전트가 수집한 메트릭 목록을 확인합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/kubernetes-legacy/
[2]: /ko/agent/guide/agent-commands/