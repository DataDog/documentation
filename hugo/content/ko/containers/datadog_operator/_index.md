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
  text: Datadog Operator 및 Admission Controller를 사용한 애플리케이션 계측
title: Datadog Operator
---
[Datadog Operator][1]는 오픈 소스 [Kubernetes Operator][2]로, Kubernetes 환경에서 Datadog Agent를 배포하고 구성할 수 있도록 해줍니다. 

Operator를 사용하면 단일 사용자 지정 리소스 정의(CRD)를 통해 노드 기반 Agent, [Cluster Agent][3], 그리고 [Cluster Checks Runner][4]를 배포할 수 있습니다. Operator는 Operator CRD 상태에 배포 상태, 상태 정보, 오류 정보를 보고합니다. Operator는 상위 수준의 구성 옵션을 사용하므로 잘못된 구성으로 인한 위험을 줄일 수 있습니다.

Agent를 배포한 후 Datadog Operator는 다음 기능을 제공합니다.

- Agent 구성에 대한 유효성 검사
- 모든 Agent를 최신 구성 상태로 유지
- Agent 리소스 생성 및 업데이트를 위한 오케스트레이션
- Operator의 CRD 상태를 통한 Agent 구성 상태 보고
- 선택적으로 Datadog의 [ExtendedDaemonSet][5]을 사용한 고급 DaemonSet 배포 지원

### Helm 차트 또는 DaemonSet 대신 Datadog Operator를 사용하는 이유 {#why-use-the-datadog-operator-instead-of-a-helm-chart-or-daemonset}

Kubernetes에 Datadog Agent를 설치할 때 Helm 차트 또는 DaemonSet을 사용할 수도 있습니다. 그러나 Datadog Operator를 사용하면 다음과 같은 장점이 있습니다.

- Datadog 모범 사례를 기반으로 하는 기본 설정이 내장되어 있습니다.
- 향후 기능 확장을 위해 더 유연한 구성이 가능합니다.
- [Kubernetes Operator][2]로서 Datadog Operator는 Kubernetes API에서 1급 리소스로 취급됩니다.
- Helm 차트와 달리 Datadog Operator는 Kubernetes 조정 루프에 포함됩니다.

Datadog은 DaemonSet을 사용한 Agent 배포를 완전히 지원하지만, DaemonSet을 수동으로 구성하는 경우 오류가 발생할 가능성이 상당히 높습니다. 따라서 DaemonSet 사용은 권장되지 않습니다.

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