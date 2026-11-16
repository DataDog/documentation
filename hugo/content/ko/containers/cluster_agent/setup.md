---
algolia:
  tags:
  - cluster agent
aliases:
- /ko/agent/cluster_agent/setup
- /ko/agent/cluster_agent/event_collection
- /ko/containers/cluster_agent/event_collection
description: Kubernetes 클러스터 모니터링 및 자동 확장을 위한 Datadog Cluster Agent 설치 및 구성
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog Cluster Agent 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 Kubernetes 워크로드 자동 확장
- link: /agent/cluster_agent/clusterchecks/
  tag: 설명서
  text: Autodiscovery로 클러스터 검사 실행
- link: /agent/cluster_agent/troubleshooting/
  tag: 설명서
  text: Datadog Cluster Agent 문제 해결
- link: https://www.datadoghq.com/architecture/kubernetes-workload-autoscaling-with-datadog/
  tag: 아키텍처 센터
  text: Datadog을 이용한 Kubernetes 워크로드 자동 확장
- link: https://www.datadoghq.com/architecture/efficient-kubernetes-monitoring-with-the-datadog-cluster-agent/
  tag: 아키텍처 센터
  text: Datadog Cluster Agent를 이용한 효율적인 Kubernetes 모니터링
- link: https://www.datadoghq.com/architecture/real-world-applications-of-the-datadog-cluster-agent-part-one/
  tag: 아키텍처 센터
  text: Datadog Cluster Agent의 실제 활용 사례(1부)
title: Datadog Cluster Agent 설정
---
Helm 차트 v2.7.0 이상 또는 Datadog Operator v0.7.0 이상을 사용해 Datadog Agent를 배포하면 Cluster Agent가 기본적으로 활성화됩니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator v1.0.0부터 Cluster Agent가 기본적으로 활성화됩니다. Operator는 필수 RBAC를 생성하고, Cluster Agent를 배포하고, Agent DaemonSet 구성을 수정합니다.

이로 인해 안전한 통신을 위해 Cluster Agent와 Datadog Agent가 공유하는 `Secret`에 임의 토큰이 자동으로 생성됩니다. `global.clusterAgentToken` 필드를 설정하여 이 토큰을 수동으로 지정할 수도 있습니다. 기존 `Secret`의 이름과 이 토큰이 포함된 데이터 키를 참조하여 설정할 수도 있습니다.

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
      clusterAgentTokenSecret:
        secretName: <SECRET_NAME>
        keyName: <KEY_NAME>
  ```

수동으로 설정하는 경우 이 토큰은 32자의 영숫자 문자여야 합니다.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트 v2.7.0부터 Cluster Agent가 기본적으로 활성화됩니다.

이전 버전을 활성화하려는 경우 또는 `clusterAgent` 키를 재정의하는 사용자 지정 [datadog-values.yaml][1]을 사용하는 경우, 다음 Cluster Agent 구성을 사용해 [datadog-values.yaml][1] 파일을 업데이트해야 합니다.

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- Set this to false to disable Datadog Cluster Agent
    enabled: true
  ```

그런 다음 Datadog Helm 차트를 업그레이드합니다.

이 작업은 자동으로 Cluster Agent와 Datadog Agent의 필수 RBAC 파일을 업데이트합니다. 두 Agent는 동일한 API 키를 사용합니다.

이로 인해 안전한 통신을 위해 Cluster Agent와 Datadog Agent가 공유하는 `Secret`에 임의 토큰이 자동으로 생성됩니다. `clusterAgent.token` 구성을 사용하여 이 토큰을 수동으로 지정할 수 있습니다. `clusterAgent.tokenExistingSecret` 구성을 통해 `token` 값을 포함하는 기존 `Secret`의 이름을 참조하여 설정할 수도 있습니다.

수동으로 설정하는 경우 이 토큰은 32자의 영숫자 문자여야 합니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "수동(DaemonSet)" %}}

DaemonSet을 사용하여 Datadog Cluster Agent를 설정하려면 다음 단계를 따르세요.
1. [Cluster Agent RBAC 권한을 구성합니다](#configure-cluster-agent-rbac-permissions).
2. [Cluster Agent 간 통신을 보호합니다](#secure-cluster-agent-to-agent-communication).
3. [Cluster Agent 및 해당 서비스를 생성합니다](#create-the-cluster-agent-and-its-service).
4. [Cluster Agent와 통신하도록 노드 Agent를 구성합니다](#configure-datadog-agent-communication).

### Cluster Agent RBAC 권한 구성 {#configure-cluster-agent-rbac-permissions}

적절한 RBAC가 있어야 Datadog Cluster Agent를 실행할 수 있습니다.

1. [Datadog Cluster Agent RBAC 폴더][1]의 매니페스트를 검토하세요. **참고**: Cluster Agent를 사용할 때 노드 Agent는 Kubernetes API 서버와 상호 작용할 수 없으며, Cluster Agent만 상호 작용할 수 있습니다.

2. Cluster Agent RBAC 권한을 구성하려면 다음 매니페스트를 적용하세요. [노드 Agent DaemonSet][2]을 설정할 때 이미 매니페스트를 적용했을 수도 있습니다.

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  이 작업은 Cluster Agent에 적절한 `ServiceAccount`, `ClusterRole`, `ClusterRoleBinding`을 생성하고 노드 Agent에 대한 `ClusterRole`을 업데이트합니다.

Azure Kubernetes Service(AKS)를 사용하는 경우 추가 권한이 필요할 수 있습니다. [AKS의 DCA용 RBAC][3] FAQ를 참조하세요.

### Cluster Agent 간 통신 보호 {#secure-cluster-agent-to-agent-communication}

Datadog Agent와 Cluster Agent에서는 통신을 보호하기 위해 토큰이 필요합니다. 이 토큰을 Datadog Agent와 Cluster Agent 모두가 환경 변수 `DD_CLUSTER_AGENT_AUTH_TOKEN`에서 참조할 수 있는 `Secret`에 저장하는 것이 좋습니다. 이렇게 하면 일관성을 유지하고 `PodSpec`에서 토큰을 읽을 수 없도록 하는 데 도움이 됩니다.

이 토큰을 생성하려면 다음 한 줄 명령을 실행하여 `token`이 설정된 `datadog-cluster-agent`라는 `Secret`을 생성하세요. `<TOKEN>`은 32자 영숫자 문자로 바꾸면 됩니다.
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**참고:** 이 작업은 기본 네임스페이스에 `Secret`을 생성합니다. 사용자 지정 네임스페이스를 사용하는 경우, 명령을 실행하기 전에 네임스페이스 파라미터를 업데이트하세요.

Cluster Agent에 제공되는 기본 `cluster-agent-deployment.yaml`은 이미 환경 변수 구성을 사용해 이 `Secret`을 확인할 수 있도록 구성되어 있습니다.
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

이 환경 변수는 [Datadog Agent 구성][4] 시 동일한 설정을 사용해 구성해야 합니다.

### Cluster Agent 및 해당 서비스 생성 {#create-the-cluster-agent-and-its-service}

1. 다음 매니페스트를 다운로드합니다.

    * [`agent-services.yaml`: Cluster Agent Service 매니페스트][5]
    * [`secret-api-key.yaml`: Datadog API 키를 포함하는 시크릿][6]
    * [`secret-application-key.yaml`: Datadog 애플리케이션 키를 포함하는 시크릿][7]
    * [`cluster-agent-deployment.yaml`: Cluster Agent 매니페스트][8]
    * [`install_info-configmap.yaml`: 설치 정보 ConfigMap][9]

2. `secret-api-key.yaml` 매니페스트에서 `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE`를 base64로 인코딩된 [Datadog API 키][10]로 바꿉니다. API 키의 base64 버전을 얻으려면 다음을 실행하세요.

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. `secrets-application-key.yaml` 매니페스트에서 `PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE`를 base64로 인코딩된 [Datadog 애플리케이션 키][11]로 바꿉니다.
4. 기본적으로 `cluster-agent-deployment.yaml` 매니페스트는 이전에 `Secret` `datadog-cluster-agent`에서 생성된 토큰을 참조합니다. 이 토큰을 다른 방식으로 저장하는 경우 그에 따라 `DD_CLUSTER_AGENT_AUTH_TOKEN` 환경 변수를 구성하세요.
5. Cluster Agent 배포에서 사용할 수 있도록 이 리소스를 배포합니다.
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. 마지막으로, Datadog Cluster Agent를 배포합니다.
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**참고**: Datadog Cluster Agent에서 환경 변수 `DD_SITE`를 Datadog 사이트로 설정하세요. {{< region-param key="dd_site" code="true" >}}. 기본값은 `US` 사이트 `datadoghq.com`입니다.

### 확인 {#verification}

이 시점에서 다음을 확인할 수 있습니다.

```shell
kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

kubectl get secret

NAME                    TYPE                                  DATA      AGE
datadog-cluster-agent   Opaque                                1         1d

kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**참고**: 이미 Datadog Agent가 실행 중인 경우 Cluster Agent가 실행을 시작하기 전에 [Agent의 `rbac.yaml` 매니페스트][12]를 적용해야 할 수 있습니다.

## Datadog Agent 통신 구성 {#configure-datadog-agent-communication}

Datadog Agent 구성을 수정하여 Datadog Cluster Agent와 통신하세요.

기존 DaemonSet [매니페스트 파일][2]에서 환경 변수 `DD_CLUSTER_AGENT_ENABLED`를 `true`로 설정합니다. 그런 다음 [Cluster Agent 간 통신 보호][13]에서 사용된 것과 동일한 구문을 사용하여 `DD_CLUSTER_AGENT_AUTH_TOKEN`을 설정합니다.

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

이러한 구성을 적용하여 DaemonSet을 재배포하면 Datadog Agent가 Cluster Agent와 통신할 수 있습니다. 전체 예시는 제공된 Cluster Agent [`daemonset.yaml` 매니페스트][14]를 참조하세요.

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests/cluster-agent
[2]: /ko/agent/kubernetes/?tab=daemonset
[3]: /ko/agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: /ko/agent/cluster_agent/setup/?tab=daemonset#configure-the-datadog-agent
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secret-api-key.yaml
[7]: https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/manifests/cluster-agent/secret-application-key.yaml
[8]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/install_info-configmap.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/access/application-keys
[12]: /ko/agent/cluster_agent/setup/?tab=daemonset#configure-rbac-permissions
[13]: /ko/agent/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[14]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml
{{% /tab %}}
{{< /tabs >}}

### 확인 {#verification-1}

다음 명령을 실행하여 Datadog Agent 포드와 Cluster Agent 포드가 실행 중인지 확인할 수 있습니다.

```shell
kubectl get pods | grep agent
```

다음을 확인할 수 있습니다.

```shell
datadog-agent-4k9cd                      1/1       Running   0          2h
datadog-agent-4v884                      1/1       Running   0          2h
datadog-agent-9d5bl                      1/1       Running   0          2h
datadog-agent-dtlkg                      1/1       Running   0          2h
datadog-agent-jllww                      1/1       Running   0          2h
datadog-agent-rdgwz                      1/1       Running   0          2h
datadog-agent-x5wk5                      1/1       Running   0          2h
[...]
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h
```

추가로 [Agent 상태 출력][1]을 사용해 Datadog Agent가 Cluster Agent에 연결되었는지 확인할 수 있습니다.

```shell
kubectl exec -it <AGENT_POD_NAME> agent status
[...]
=====================
Datadog Cluster Agent
=====================

  - Datadog Cluster Agent endpoint detected: https://10.104.246.194:5005
  Successfully connected to the Datadog Cluster Agent.
  - Running: 1.11.0+commit.4eadd95
```

Kubernetes 이벤트가 Datadog 계정으로 들어오기 시작합니다. Agent가 수집한 관련 메트릭은 해당되는 클러스터 수준 메타데이터로 태그 지정됩니다.

## Windows 컨테이너 {#windows-containers}

Datadog Cluster Agent는 Linux 노드에만 배포할 수 있습니다.

Windows 컨테이너를 모니터링하려면 혼합 클러스터에서 Helm 차트를 두 번 설치하세요. 첫 번째 Helm 차트는 Datadog Cluster Agent와 Linux 노드용 Agent DaemonSet을 배포합니다(`targetSystem: linux` 포함). 두 번째 Helm 차트(`targetSystem: windows` 포함)는 Windows 노드에만 Agent를 배포하고 첫 번째 Helm 차트의 일부로 배포된 기존 Cluster Agent에 연결합니다.

다음 `datadog-values.yaml` 파일을 사용하여 Windows 노드에 배포된 Agent와 Cluster Agent 간의 통신을 구성하세요.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart

# Disable datadogMetrics deployment since it should have been already deployed with the first chart.
datadog-crds:
  crds:
    datadogMetrics: false
# Disable kube-state-metrics deployment
datadog:
  kubeStateMetricsEnabled: false
```

자세한 내용은 [Windows 컨테이너 문제 해결][2]을 참조하세요.

## AWS 매니지드 서비스 모니터링 {#monitoring-aws-managed-services}

Amazon Managed Streaming for Apache Kafka(MSK), ElastiCache 또는 Relational Database Service(RDS)와 같은 AWS 매니지드 서비스를 모니터링하려면 Helm 차트에서 `clusterChecksRunner`를 설정하여 `serviceAccountAnnotation`을 통해 IAM 역할이 할당된 포드를 생성하세요. 그런 다음 `clusterAgent.confd` 아래에 통합 구성을 설정하세요.

{{< code-block lang="yaml" filename="datadog-values.yaml">}}
clusterChecksRunner:
  enabled: true
  rbac:
    # clusterChecksRunner.rbac.create -- If true, create & use RBAC resources
    create: true
    dedicated: true
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::***************:role/ROLE-NAME-WITH-MSK-READONLY-POLICY
clusterAgent:
  confd:
    amazon_msk.yaml: |-
      cluster_check: true
      instances:
        - cluster_arn: arn:aws:kafka:us-west-2:*************:cluster/gen-kafka/*******-8e12-4fde-a5ce-******-3
          region_name: us-west-2
{{< /code-block >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/ko/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows