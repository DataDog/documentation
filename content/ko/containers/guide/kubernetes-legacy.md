---
aliases:
- /ko/agent/kubernetes/legacy
- /ko/agent/faq/kubernetes-legacy
- /ko/agent/guide/kubernetes-legacy
further_reading:
- link: /agent/kubernetes/daemonset_setup/
  tag: 도움말
  text: 쿠버네티스 DaemonSet 설정
- link: /agent/kubernetes/host_setup/
  tag: 도움말
  text: Kubernetes \u0008호스트 설정
- link: /agent/kubernetes/metrics/
  tag: 도움말
  text: Kubernetes 메트릭
kind: guide
title: 레거시 Kubernetes 버전
---

Agent는 이 버전에 도입된 기능과 엔드포인트를 사용하므로 기본 설정은 Kubernetes 1.7.6 이상을 대상으로 합니다. 이전 버전의 경우 추가 설치 단계가 필요합니다.

- [RBAC 개체][1] (`ClusterRoles` 및 `ClusterRoleBindings`)는 Kubernetes 1.6 및 OpenShift 3.3부터 사용할 수 있지만 다른 `apiVersion` 접두사와 사용할 수 있습니다.

  * Kubernetes 1.8+ (그리고 OpenShift 3.9+), 기본 apiVersion: `rbac.authorization.k8s.io/v1`
  * Kubernetes 1.5부터 1.7 (그리고 OpenShift 3.7): `rbac.authorization.k8s.io/v1beta1`
  * Openshift 3.3부터 3.6: `v1`

    다음 `sed` 호출을 사용하여 Datadog Agent yaml 매니페스트를 적용하세요.

    ```
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrole.yaml | kubectl apply -f -
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrolebinding.yaml | kubectl apply -f -
    ```

    또는 Openshift 3.3부터 3.6의 경우:

    ```
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrole.yaml | oc apply -f -
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrolebinding.yaml | oc apply -f -
    ```

- `kubelet` 검사는 Kubernetes 1.7.6+(OpenShift 3.7.0+) prometheus 엔드포인트에서 메트릭을 검색합니다. 이전 버전의 경우 [cAdvisor 포트 모드를 활성화하세요][2].

- 기본 DaemonSet는 [하향 API][3]를 사용하여 kubelet의 IP를 에이전트에 전달합니다. 이는 버전 1.7 이상에서만 작동합니다. 이전 버전의 경우 kubelet 연결을 활성화하는 방법은 다음과 같습니다.

  * 버전 1.6에서는 `fieldPath: spec.nodeName`을 사용하여 파드에서 노드 이름을 확인하고 연결할 수 있는지 확인하세요.
  * `DD_KUBERNETES_KUBELET_HOST`가 설정되지 않은 경우 Agent는 docker에서 노드 호스트 이름을 검색하고 거기에 연결을 시도합니다. 이름을 확인하고 연결할 수 있는지 확인하려면 `docker info | grep "Name:"`을 사용하세요.
  * Docker 기본 게이트웨이의 IP가 클러스터 전체에서 일정한 경우 해당 IP를 `DD_KUBERNETES_KUBELET_HOST`envvar에 전달합니다. `ip addr show | grep docker0` 명령어를 사용하여 IP를 검색할 수 있습니다.

- 기본 설정은 API 서버 및 kubelet에 대한 [bearer 토큰 인증][4]을 사용합니다. 1.3에서 kubelet은 bearer 토큰 인증을 지원하지 않으며, `datadog-agent` 서비스 계정에 대한 클라이언트 인증서를 설정하고 이를 에이전트에 전달합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/admin/authorization/rbac
[2]: https://github.com/DataDog/integrations-core/tree/73b475d0762829a32c70b63da2564eaa15b1d942/kubelet#compatibility
[3]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[4]: https://kubernetes.io/docs/admin/authentication/#service-account-tokens