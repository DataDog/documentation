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
description: Kubernetes에서 Datadog Agent 설치 및 구성
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: 학습 센터
  text: Kubernetes Observability 시작하기
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: 릴리스 노트
  text: 최신 Datadog 컨테이너 릴리스를 확인하세요(앱 로그인 필요).
- link: /agent/guide/autodiscovery-management
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/guide/docker-deprecation
  tag: 설명서
  text: Kubernetes에서 Docker 런타임 사용 중단
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 Kubernetes 모니터링과 관련한 인사이트를 얻으세요.
- link: https://www.datadoghq.com/blog/watermark-pod-autoscaler/
  tag: 블로그
  text: Watermark Pod Autoscaler를 사용하여 Kubernetes 포드 스케일 아웃하는 방법 가이드
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: 블로그
  text: Kubernetes 오퍼레이터를 모니터링하여 애플리케이션을 원활하게 운영하기
title: Kubernetes
---
{{< learning-center-callout header="활성화 웨비나 세션에 참여하기" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  이 기반 활성화 세션에서는 Datadog이 Kubernetes를 어떻게 모니터링하는지 중점적으로 다룹니다. Datadog을 Kubernetes에 맞춰 구성하는 방법과 시작하는 방법을 알아보세요. 클러스터 및 애플리케이션 메트릭, 트레이스, 로그를 시각화하고 분석하는 다양한 Datadog 조회 및 도구를 둘러보세요.
{{< /learning-center-callout >}}

## Agent 설치 {#agent-installation}

Agent를 설치하려면 [Datadog Operator][4] 또는 Helm 차트를 사용하여 [Fleet Automation의 인앱 설치 가이드][5]를 따르면 됩니다. 이 가이드 인터페이스를 사용하면 다음과 같은 작업을 할 수 있습니다.
- Kubernetes 배포 선택(예: EKS, AKS 또는 GKE)
- API 키가 미리 채워진 helm 및 kubectl 명령 생성
- UI 기반 구성을 통해 APM, Log Management, 태깅 및 기타 텔레메트리와 같은 기능 활성화


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="Kubernetes에서의 Datadog Agent 인앱 설치 단계입니다." style="width:90%;">}}


Datadog Operator 흐름이 Datadog Operator를 설치하고 사용자 지정 리소스를 사용하여 관측 가능성 커버리지를 구성합니다.

Helm Chart 흐름은 Datadog 구성 요소를 좀 더 직접적으로 설치하고 관측 가능성 기능에 대하여 비슷한 토글을 제공합니다.

두 가지 옵션 모두 구성을 관리할 수 있게 해줍니다. Datadog Operator 또는 Helm 차트는 Kubernetes 기반 모니터링을 위해 Datadog Agent DaemonSet, Cluster Agent Deployment 및 각각의 종속성을 모두 생성합니다.

Datadog Agent로 지원되는 Kubernetes 버전 전체 목록은 [지원되는 버전][6]을 참조하세요.


### 수동 설치 {#manual-installation}

[Fleet Automation의 인앱 설치 도구][5]가 가이드를 따라 구성을 빌드할 방법을 제공합니다. [Kubernetes 설치 문서][7]에서도 환경에 Datadog Operator 또는 Datadog Helm 차트를 수동으로 배포하고 구성하는 방법에 대한 단계를 참조할 수 있습니다.

Datadog에서는 Datadog Operator 또는 Datadog Helm Chart를 사용하여 Kubernetes 리소스를 모두 배포할 것을 권장합니다. 모든 매니페스트를 직접 배포해야 하는 경우, [Kubernetes 수동 설치 설명서][8] 전문을 직접 참조하세요.

Agent 명령은 [Agent Commands 가이드][9]를 참조하세요. Datadog Cluster Agent 및 그 역할에 관한 자세한 내용은 [Kubernetes용 Cluster Agent][3]를 참조하세요.

{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다.">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>설치</u>: Kubernetes 환경에 Datadog Agent를 설치합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>추가 구성</u>: 이벤트 수집, 프록시 구성 재정의, DogStatsD를 사용한 사용자 지정 메트릭 전송, 컨테이너 허용 목록 및 차단 목록 구성, 사용 가능한 전체 환경 변수 목록 참조 등을 수행합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>배포</u>: AWS Elastic Kubernetes Service(EKS), Azure Kubernetes Service(AKS), Google Kubernetes Engine(GKE), Red Hat OpenShift, Rancher 및 Oracle Container Engine for Kubernetes(OKE)를 포함한 주요 Kubernetes 배포의 기본 구성을 검토합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: 트레이스 수집 설정: Agent가 트레이스를 수락하도록 구성하고, 포드가 Agent와 통신하도록 구성하고, 애플리케이션 SDK가 트레이스를 발생시키도록 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/appsec">}}<u>App and API Protection</u>: Kubernetes 수신 프록시 및 게이트웨이에 대하여 App and API Protection을 자동으로 활성화하여 에지에서 위협을 감지하고 API를 보호합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>CSI 드라이버</u>: Datadog CSI 드라이버를 설치 및 설정하고 Datadog CSI 볼륨을 사용하여 DogStatsD 및 Trace Agent UDS 소켓을 마운팅합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>로그 수집</u>: Kubernetes 환경에서 로그 수집을 설정합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>태그 추출</u>: Agent가 Kubernetes 레이블 또는 어노테이션에 따라 컨테이너, 포드 또는 노드가 발생시킨 모든 메트릭, 트레이스, 로그에 대한 태그를 생성하고 할당하도록 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integrations 및 Autodiscovery</u>: Kubernetes 환경에서 통합을 구성하려면 Datadog의 Autodiscovery 기능을 사용합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus 및 OpenMetrics</u>: Kubernetes 내부에서 실행되는 애플리케이션이 노출하는 Prometheus 및 OpenMetrics 메트릭을 수집합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>컨트롤 플레인 모니터링</u>: Kubernetes API 서버, Controller Manager, Scheduler 및 etcd를 모니터링합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>수집된 데이터</u>: Kubernetes 클러스터에 배포했을 때 Agent가 수집하는 메트릭 목록을 확인합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/kubernetes-legacy/
[2]: /ko/agent/configuration/agent-commands/
[3]: /ko/containers/cluster_agent/
[4]: https://docs.datadoghq.com/ko/containers/datadog_operator/
[5]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[6]: /ko/containers/kubernetes/installation?tab=datadogoperator#minimum-kubernetes-and-datadog-agent-versions
[7]: /ko/containers/kubernetes/installation
[8]: https://docs.datadoghq.com/ko/containers/guide/kubernetes_daemonset/
[9]: /ko/agent/configuration/agent-commands/