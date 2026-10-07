---
aliases:
- /ko/agent/kubernetes/operator_configuration
- /ko/containers/kubernetes/operator_configuration
description: Kubernetes에서 Datadog Operator를 사용하여 Datadog Agent 배포 및 관리
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: 가이드
  text: Datadog Operator 시작하기
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: 소스 코드
  text: 'Datadog Operator: 고급 설치'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: 소스 코드
  text: 'Datadog Operator: 설정'
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: 아키텍처 센터
  text: Datadog Operator 및 Admission Controller를 사용한 앱 계측
title: Datadog Operator
---
[Datadog Operator][1]는 오픈 소스 [Kubernetes Operator][2]로, Kubernetes 환경에서 Datadog Agent를 배포하고 구성할 수 있도록 해줍니다.

Operator를 사용하면 단일 사용자 지정 리소스 정의(CRD)를 통해 노드 기반 Agent, [Cluster Agent][3], 그리고 [Cluster Checks Runner][4]를 배포할 수 있습니다. Operator는 Operator CRD 상태에 배포 상태, 상태 정보, 오류 정보를 보고합니다. Operator는 상위 수준의 구성 옵션을 사용하므로 잘못된 구성으로 인한 위험을 줄일 수 있습니다.

Agent를 배포한 후 Datadog Operator는 다음 기능을 제공합니다.

- Agent 구성에 대한 유효성 검사
- 모든 Agent를 최신 구성 상태로 유지
- Agent 리소스 생성 및 업데이트를 위한 오케스트레이션
- Operator의 CRD 상태를 통한 Agent 구성 상태 보고
- [DatadogAgentProfiles][10]을 사용하여 단일 리소스에서 노드 그룹별 Agent 구성
- 클러스터 [공급자][11]의 자동 감지로, Amazon EKS 및 Red Hat OpenShift의 컨트롤 플레인 모니터링과 같이 일치하는 구성을 적용합니다.
- Fleet Automation (비공개 프리뷰)을 통한 원격 관리

### Helm 차트 또는 DaemonSet 대신 Datadog Operator를 사용하는 이유 {#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset}

Datadog Agent를 [`datadog` Helm 차트][9] 또는 DaemonSet으로 설치할 수도 있습니다. Datadog은 새로운 배포에 Datadog Operator 사용을 권장합니다.

Helm과 Datadog Operator는 Agent를 관리하는 방식이 다릅니다. Helm은 설치 및 업그레이드 시 `values.yaml` 파일에서 Agent의 Kubernetes 객체를 렌더링합니다. Datadog Operator는 설치 시점뿐만 아니라 지속적으로 단일 `DatadogAgent` 사용자 지정 리소스를 원하는 상태로 조정하는 컨트롤러를 실행합니다.

또한 Datadog Operator는 Helm 차트에는 없는 기능을 제공합니다. 예를 들어, [DatadogAgentProfiles][10]은 하나의 리소스에서 노드 그룹별로 다른 구성을 적용하지만, Helm은 노드 그룹마다 수동으로 작성된 affinity 규칙을 포함한 별도의 차트 릴리스가 필요합니다.

Datadog Operator v1.29.0 이상 버전에서는 Datadog Operator가 주요 클라우드 공급자에서 Helm 차트와 기능적으로 동일한 수준에 도달했으므로, 이를 선택하더라도 기능 손실이 없습니다. 또한 Helm 차트가 게시되지 않은 기본 플랫폼 카탈로그(Red Hat OperatorHub, [Amazon EKS add-on][12], [Google Cloud Marketplace][13])를 통해서도 설치 및 업그레이드할 수 있습니다.

Datadog Operator가 환경에 맞지 않는 경우(아직 지원하지 않는 플랫폼(Talos 또는 Flatcar 등), GKE on Google Distributed Cloud (GDC), 또는 Datadog Operator가 제공하지 않는 Helm 기능이 필요한 경우)에는 `datadog` Helm 차트를 사용하십시오. Datadog Operator가 지원하는 플랫폼 및 공급자에 대한 자세한 내용은 [공급자 문서][11]를 참조하십시오.

Datadog은 DaemonSet을 사용한 Agent 배포를 완전히 지원하지만, DaemonSet을 수동으로 구성하는 경우 오류가 발생할 가능성이 상당히 높으며 권장되지 않습니다.

## 사용 방법 {#usage}

Datadog Operator를 사용하여 Datadog Agent를 배포하는 방법은 [Datadog Operator 시작하기][6] 가이드를 참조하세요.

모든 설치 및 구성 옵션에 대해서는 [`datadog-operator`][1] 리포지토리의 상세 [설치][7] 및 [구성][8] 페이지를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /ko/containers/cluster_agent
[4]: /ko/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /ko/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[9]: /ko/containers/kubernetes/installation?tab=helm
[10]: /ko/containers/datadog_operator/datadog_agent_profiles
[11]: /ko/containers/datadog_operator/providers
[12]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[13]: https://console.cloud.google.com/marketplace/product/datadog-saas/datadog