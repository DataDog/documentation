---
further_reading:
- link: /infrastructure/livecontainers/configuration
  tag: 설명서
  text: 실시간 컨테이너 설정
kind: 설명서
title: 실시간 컨테이너 레거시 설정
---

## 개요

이 페이지에서는 이전 에이전트 버전에 대한 실시간 컨테이너 설정을 다룹니다. 이 지침은 Datadog 에이전트 버전 7.21.1부터 7.27.0, 그리고 클러스터 에이전트 1.9.0부터 1.11.0까지 적용됩니다.

{{< tabs >}}
{{% tab "Helm" %}}

공식 [Datadog 헬름 차트][1]를 사용하는 경우:

- 차트 버전 2.4.5 이상과 2.10.0 이전 버전을 사용하세요. 차트 버전 2.10.0 이후부터는 [최신 설정 지침][2]을 참조하세요.
  **참고**: 에이전트 및 클러스터 에이전트 버전이 헬름 차트 [values.yaml][3] 파일에서 필요한 최소 버전 이상으로 하드코딩되어 있어야 합니다.
-  [values.yaml][3]에서 `datadog.orchestratorExplorer.enabled`를 `true`로 설정하세요.
- 새 버전을 배포합니다.

일부 설정에서는 프로세스 에이전트 및 클러스터 에이전트가 쿠버네티스 클러스터 이름을 자동으로 감지할 수 없습니다. 이 경우 기능이 시작되지 않고 클러스터 에이전트 로그에 다음 경고가 표시됩니다: `Orchestrator explorer enabled but no cluster name set: disabling`. 이 경우, [values.yaml][3]에서 `datadog.clusterName`을 클러스터 이름으로 설정하세요.

[1]: https://github.com/DataDog/helm-charts
[2]: /ko/infrastructure/livecontainers/#configuration
[3]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

클러스터 에이전트가 실행 중이어야 하며 에이전트가 클러스터 에이전트와 통신할 수 있어야 합니다. [클러스터 에이전트 설정][1]을 참조하세요.

1. 다음 환경 변수를 사용하여 클러스터 에이전트 컨테이너를 설정합니다:

    ```yaml
      - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
        value: "true"
    ```

2. 다음 RBAC 사용 권한으로 클러스터 에이전트 클러스터 역할을 설정합니다.

   **참고**: `apps` apiGroups인 경우 실시간 컨테이너는 권한이 필요하며,
   이 권한으로 일반적인 쿠버네티스 리소스 (예: `pods`, `services`, `nodes`)를 수집합니다.
   이 리소스는 [클러스터 에이전트 설정][1]을 따랐다면 이미 RBAC에 있으나 누락된 경우 추가해야 합니다`deployments`, `replicasets` 뒤에):

    ```yaml
      ClusterRole:
      - apiGroups:  # To create the datadog-cluster-id ConfigMap
        - ""
        resources:
        - configmaps
        verbs:
        - create
        - get
        - update
      ...
      - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
        - ""
        resources:
        - namespaces
        verbs:
        - get
      ...
      - apiGroups:  # To collect new resource types
        - "apps"
        resources:
        - deployments
        - replicasets
        - daemonsets
        - statefulsets
        verbs:
        - list
        - get
        - watch
     - apiGroups:
       - networking.k8s.io
       resources:
       - ingresses
       verbs:
       - list
       - watch
    ```

   이러한 권한은 에이전트 데몬셋 및 클러스터 에이전트 디플로이먼트와 동일한 네임스페이스에서 `datadog-cluster-id` 컨피그맵을 생성하고 디플로이먼트 및 레플리카셋을 수집하는 데 필요합니다.

   클러스터 에이전트에 의해 `cluster-id` 컨피그맵이 생성되지 않으면, 에이전트 포드가 시작되지 않고 `CreateContainerConfigError` 상태가 됩니다. 컨피그맵이 존재하지 않아 에이전트 포드가 멈춘 경우, 클러스터 에이전트 권한을 업데이트하고 해당 포드를 재시작하세요. 그러면 컨피그맵이 생성되고 에이전트 포드가 자동으로 복구됩니다.

3. 에이전트 데몬셋에서 실행되는 프로세스 에이전트가 실행 중이어야 하며(프로세스 수집을 실행할 필요는 없음), 다음 옵션으로 구성되어야 합니다.

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    - name: DD_ORCHESTRATOR_CLUSTER_ID
      valueFrom:
        configMapKeyRef:
          name: datadog-cluster-id
          key: id
    ```

일부 설정에서는 프로세스 에이전트와 클러스터 에이전트가 쿠버네티스 클러스터 이름을 자동으로 감지할 수 없습니다. 이 경우 기능이 시작되지 않고 클러스터 에이전트 로그에 다음 경고가 표시됩니다: `Orchestrator explorer enabled but no cluster name set: disabling`. 이 경우 클러스터 에이전트와 프로세스 에이전트 모두의 `env` 섹션에 다음 옵션을 추가해야 합니다:

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

[1]: /ko/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}