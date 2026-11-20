---
aliases:
- /ko/agent/kubernetes/legacy
- /ko/agent/faq/kubernetes-legacy
- /ko/agent/guide/kubernetes-legacy
further_reading:
- link: /agent/kubernetes/daemonset_setup/
  tag: 도움말
  text: Kubernetes DaemonSet 설정
- link: /agent/kubernetes/host_setup/
  tag: 도움말
  text: Kubernetes \u0008호스트 설정
- link: /agent/kubernetes/metrics/
  tag: 도움말
  text: Kubernetes 메트릭
title: 레거시 Kubernetes 버전
---

Agent는 Kubernetes 버전 1.76 이상에서 도입된 기능 및 엔드포인트를 이용하기 때문에 해당 프로그램을 대상 기본 설정이 되어 있습니다. 이보다 이전 버전의 경우 설치 단계가 더 많아집니다.

- [RBAC 개체][1](`ClusterRoles` 및 `ClusterRoleBindings`)는 Kubernetes 1.6 및 OpenShift 3.3부터 사용할 수 있지만 다른 `apiVersion` 접두사를 사용해 이용할 수 있습니다.

  * `rbac.authorization.k8s.io/v1`: Kubernetes 1.8+ (및 OpenShift 3.9+), 기본 apiVersion
  * `rbac.authorization.k8s.io/v1beta1`: Kubernetes 1.5 ~ 1.7(및 OpenShift 3.7)
  * `v1`: Openshift 3.3~3.6

    다음 `sed` 호출을 사용하여 Datadog Agent yaml 매니페스트를 적용합니다.

    ```
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrole.yaml | kubectl apply -f -
    sed "s%authorization.k8s.io/v1%authorization.k8s.io/v1beta1%" clusterrolebinding.yaml | kubectl apply -f -
    ```

    또는 Openshift 3.3~3.6을 사용합니다.

    ```
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrole.yaml | oc apply -f -
    sed "s%rbac.authorization.k8s.io/v1%v1%" clusterrolebinding.yaml | oc apply -f -
    ```

- `kubelet` 점검은 Kubernetes 1.7.6+(OpenShift 3.7.0+) 프로메테우스 엔드포인트에서 메트릭을 검색합니다. 이전 버전의 경우 [cAdvisor 포트 모드 활성화][2]를 사용하세요.

- 기본 데몬셋은 [Downward API][3]을 활용하여 kubelet IP를 에이전트로 전달합니다. 이는 버전 1.7 이상에서만 작동합니다. 여기에서 다른 방법으로 kubelet을 활성화하는 방법을 알아보세요.

  * 버전 1.6에서는 `fieldPath: spec.nodeName`을 사용하여 노드 이름이 포드에서 확인 및 연결 가능한지 검토합니다.
  * `DD_KUBERNETES_KUBELET_HOST`가 설정되지 않은 경우 Agent는 Docker에서 노드 호스트 이름을 검색하여 연결을 시도합니다. `Docker info | grep "Name:"`을 참조하여 이름을 확인할 수 있고 연결 가능한지 확인하세요.
  * Docker 기본 게이트웨이의 IP가 클러스터에서 일정하다면 `DD_KUBERNETES_KUBELET_HOST` 환경 변수에 해당 IP를 전달하세요. `ip addr show | grep docker0` 명령으로 IP를 검색할 수 있습니다.

- 기본 설정의 경우 API 서버와 kubelet의 [무기명 토큰 인증][4]이 필요합니다. 버전 1.3에서 kubelet은 무기명 토큰 인증을 지원하지 않으므로 `Datadog-Agent` 서비스 계정에 클라이언트 인증서를 설정하고 Agent에 전달해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/
[2]: https://github.com/DataDog/integrations-core/tree/73b475d0762829a32c70b63da2564eaa15b1d942/kubelet#compatibility
[3]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information
[4]: https://kubernetes.io/docs/reference/access-authn-authz/authentication/#service-account-tokens