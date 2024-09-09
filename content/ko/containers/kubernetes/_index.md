---
aliases:
- /ko/guides/basic_agent_usage/kubernetes
- /ko/agent/basic_agent_usage/kubernetes
- /ko/tracing/kubernetes/
- /ko/tracing/setup/kubernetes
- /ko/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
- /ko/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
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
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 쿠버네티스 모니터링과 관련한 인사이트를 얻으세요.
title: 쿠버네티스(Kubernetes)
---

## 개요

쿠버네티스 클러스터에서 Datadog 에이전트를 실행하여 클러스터와 애플리케이션 메트릭, 트레이스와 로그 수집을 시작하세요.

**참고**: 에이전트 v6.0 이상만 쿠버네티스 v1.7.6+를 지원합니다. 이전 버전의 쿠버네티스의 경우 [레거시 쿠버네티스 버전][1]을 참고하세요.

에이전트 명령의 경우 [에이전트 명령 가이드][2]를 참조하세요.

[쿠버네티스용 클러스터 에이전트][3]를 참고하세요. 클러스터 수준의 모니터링 데이터를 간편하게 수집하는 방법 등 Datadog 클러스터 에이전트와 관련한 상세 정보가 안내되어 있습니다.

{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다.">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>설치</u>: 쿠버네티스 환경에 Datadog 에이전트 설치{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>추가 구성</u>: 이벤트 수집, 프록시 설정 재정의, DogStatsD로 커스텀 메트릭 전송, 컨테이너 허용/차단 목록 구성, 사용할 수 있는 환경 변수 전체 목록 참조{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>배포</u>: AWS EKS(Elastic Kubernetes Service), AKS(Azure Kubernetes Service), GKE(Google Kubernetes Engine), Red Hat OpenShift, Rancher, OKE(Oracle Container Engine for Kubernetes)와 같은 주요 쿠버네티스 배포의 기본 구성 검토{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: 트레이스 수집 설정: 에이전트가 트레이스를 구성하고, 파드가 에이전트와 통신하도록 구성하며, 애플리케이션 추적기가 트레이스를 송신하도록 구성{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>로그 수집</u>: 쿠버네티스 환경에서 로그 수집 설정{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>태그 추출</u>: 에이전트가 컨테이너, 파드, 또는 노드에서 송신하는 메트릭, 트레이스, 로그 전체에 쿠버네티스 레이블 또는 주석에 따라 태그를 생성하고 할당하도록 구성{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u></u>: 쿠버네티스 환경에서 통합을 구성하기 위해 Datadog의 자동 탐지 기능을 사용{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus 및 OpenMetrics</u>: 쿠버네티스 내에서 실행 중인 애플리케이션의 노출된 Prometheus와 OpenMetrics 메트릭을 수집{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u></u>: 쿠버네티스 API 서버, 컨트롤러 매니저, 스케쥴러 등을 모니터링{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>수집된 데이터</u>: 쿠버네티스 클러스터에 배포될 때 에이전트에서 수집된 메트릭 목록 보기{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/kubernetes-legacy/
[2]: /ko/agent/configuration/agent-commands/
[3]: /ko/containers/cluster_agent/