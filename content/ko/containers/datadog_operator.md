---
aliases:
- /ko/agent/kubernetes/operator_configuration
- /ko/containers/kubernetes/operator_configuration
further_reading:
- link: /getting_started/containers/datadog_operator
  tag: 가이드
  text: Datadog Operator 시작하기
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: GitHub
  text: 'Datadog Operator: 고급 설치'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: GitHub
  text: 'Datadog Operator: 구성'
title: Datadog Operator
---

[Datadog Operator][1]는 오픈 소스 [Kubernetes Operator][2]로, Kubernetes 환경에서 Datadog 에이전트를 배포하고 구성할 수 있도록 해줍니다.

Operator를 이용하면 단일 커스텀 리소스 정의(CRD)를 사용해 노드 기반 에이전트, [클러스터 에이전트][3], [클러스터 점검 실행기][4]를 배포할 수 있습니다. Operator에서 배포 상태, 정상 여부, Operator의 CRD 오류 상태를 보고합니다. Operator에서는 높은 수준의 구성 옵션을 사용하기 때문에 구성이 잘못될 위험이 적습니다.

에이전트를 배포하면 Datadog Operator가 다음 서비스를 제공합니다.

- 에이전트 구성 유효성
- 에이전트 구성을 최신으로 유지
- 에이전트 리소스 생성 및 업데이트 오케스트레이션
- Operator CRD 상태에서 에이전트 구성 상태 보고
- (선택 사항) Datadog의 [ExtendedDaemonSet][5]을 사용해 고급 DaemonSet 배포를 사용할 수 있음

### Helm 차트나 DaemonSet 대신 Datadog Operator를 사용하면 좋은 점이 무엇인가요?

Kubernetes에 Datadog 에이전트를 설치할 때 Helm 차트나 DaemonSet을 사용해도 됩니다. 그러나 Datadog Operator를 사용하면 다음과 같은 장점이 있습니다.

- Operator에는 Datadog 모범 사례를 기반으로 한 기본 값이 포함되어 있습니다.
- Operator는 향후 개선 사항에 맞게 더욱 유연하게 구성되어 있습니다.
- [Kubernetes Operator][2]이기 때문에 Kubernetes API가 Datadog Operator를 일등급 리소스로 처리합니다.
- Helm 차트와 달리, Operator는 Kubernetes 조정 루프에 포함되어 있습니다.

Datadog에서는 DaemonSet를 사용한 에이전트를 배포를 완벽히 지원합니다. 그러나 수동으로 DaemonSet를 구성하면 오류가 발생할 가능성이 높아지기 때문에 DaemonSet을 사용하는 것을 크게 권장하지 않습니다.

## 사용법

Operator를 사용해 Datadog 에이전트를 배포하는 방법을 배우려면 [Datadog Operator 시작하기][6] 가이드를 참고하세요.

설치 및 구성 옵션을 보려면 [`datadog-operator`][1] 레포 내 [설치][7] 및 [구성][8] 페이지에서 상세 정보를 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://github.com/DataDog/datadog-operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: /ko/containers/cluster_agent
[4]: /ko/containers/cluster_agent/clusterchecks
[5]: https://github.com/DataDog/extendeddaemonset
[6]: /ko/getting_started/containers/datadog_operator
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md