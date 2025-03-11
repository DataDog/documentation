---
algolia:
  tags:
  - 클러스터 에이전트
aliases:
- /ko/agent/cluster_agent/setup
- /ko/agent/cluster_agent/event_collection
- /ko/컨테이너스/클러스터_에이전트/이벤트_컬렉션
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog 클러스터 에이전트 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 쿠버네티스(Kubernetes) 워크로드 자동 확장
- link: /agent/cluster_agent/clusterchecks/
  tag: 설명서
  text: 자동탐지로 클러스터 점검 실행
- link: /agent/cluster_agent/troubleshooting/
  tag: 설명서
  text: Datadog 클러스터 에이전트 트러블슈팅
title: Datadog 클러스터 에이전트 설정
---

Helm 차트 v2.7.0+ 또는 Datadog 오퍼레이터 v0.7.0+를 사용해 Datadog 에이전트를 배포하려면 클러스터 에이전트가 기본적으로 활성화되어 있어야 합니다.

{{< tabs >}}
{{% tab "Helm" %}}

Helm 차트 v2.7.0 이래로 클러스터 에이전트는 기본적으로 활성화되어 있습니다.

이전 버전을 활성화하려면 `clusterAgent` 키를 덮어쓰는 커스텀 [datadog-values.yaml][1]을 사용하는 경우, 다음 클러스터 에이전트 설정을 사용해 [datadog-values.yaml][1] 파일을 업데이트해야 합니다.

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- Set this to false to disable Datadog Cluster Agent
    enabled: true
  ```

그런 다음 Datadog Helm 차트를 업그레이드합니다.

이 작업은 자동으로 클러스터 에이전트와 Datadog 에이전트의 필수 RBAC 파일을 업데이트합니다. 양 에이전트는 동일한 API 키를 사용합니다.

오퍼레이터는 또한 일반적으로 양 클러스터 에이전트와 Datadog 에이전트가 통신을 보호하기 위해 공유하는 `Secret`에서 임의 토큰을 생성합니다. `clusterAgent.token` 설정을 사용해 수동으로 이 토큰을 지정할 수 있습니다. 대신 `clusterAgent.tokenExistingSecret` 설정을 통해 `token` 값을 포함하는 기존 `Secret` 이름을 참조하여 이를 설정할 수도 있습니다.

수동으로 설정하는 경우 이 토큰은 32자의 영숫자 문자여야 합니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Datadog 오퍼레이터 v1.0.0 이래로 클러스터 에이전트는 활성화됩니다. 오퍼레이터는 필수 RBAC를 생성하고, 클러스터 에이전트를 배포하고, 에이전트 DaemonSet 설정을 수정합니다.

오퍼레이터는 또한 일반적으로 양 클러스터 에이전트와 Datadog 에이전트가 통신을 보호하기 위해 공유하는 `Secret`에서 임의 토큰을 생성합니다. `global.clusterAgentToken` 필드를 사용해 수동으로 이 토큰을 지정할 수 있습니다. 대신 이 토큰을 포함하는 데이터 키와 기존 `Secret` 읾을 참조하여 이를 설정할 수도 있습니다.

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
{{% tab "Manual (DaemonSet)" %}}

DaemonSet을 사용하여 Datadog 클러스터 에이전트를 설정하는 경우
1. [클러스터 에이전트 RBAC 권한 설정](#configure-cluster-agent-rbac-permissions).
2. [클러스터 에이전트 간 통신 보호](#secure-cluster-agent-to-agent-communication).
3. [클러스터 에이전트와 서비스 생성](#create-the-cluster-agent-and-its-service).
4. [클러스터 에이전트와의 통신을 위해 노드 에이전트 설정](#configure-datadog-agent-communication).

### 클러스터 에이전트 RBAC 권한 설정

Datadog 클러스터 에이전트에는 적절한 RBAC가 활성화되고 실행되어야 합니다.

1. [Datadog 클러스터 에이전트 RBAC 폴더][1]에서 매니페스트를 검토합니다. **참고**: 클러스터 에이전트를 사용하는 경우 노드 에이전트가 쿠버네티스(Kubernetes) API 서버와 상호 작용할 수 없습니다. 클러스터 에이전트만 가능합니다.

2. 클러스터 에이전트 RBAC 권한을 설정하려면 다음 매니페스트를 적용합니다([노드 에이전트 daemonset][2] 설정 시 이미 완료했을 수 있음).

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  이 작업은 클러스터 에이전트를 위해 적절한 `ServiceAccount`, `ClusterRole` 및 `ClusterRoleBinding`를 생성하고 노드 에이전트를 위해 `ClusterRole`를 업데이트합니다.

Azure 쿠버네티스(Kubernetes) 서비스(AKS)를 사용하는 경우 추가 권한이 필요할 수도 있습니다. [AKS의 DCA용 RBAC][3] FAQ를 참조하세요.

### 클러스터 에이전트 간 통신 보호

Datadog 에이전트와 클러스터 에이전트는 통신 보호를 위한 토큰을 필요로 합니다. Datadog 에이전트 및 클러스터 에이전트 모두가 환경 변수 `DD_CLUSTER_AGENT_AUTH_TOKEN`에서 참조할 수 있는 이 토큰을 `Secret`에 저장해 두는 것이 좋습니다. 그러면 일관성을 유지하고 `PodSpec`에서 토큰을 읽는 것을 방지할 수 있습니다.

이 토큰을 생성하려면, 이 한 줄의 명령을 실행하고 `token` 세트를 사용해 이름이 `datadog-cluster-agent`인 `Secret`을 생성합니다. 32개 영숫자 문자로 `<TOKEN>`을 교체합니다.
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**참고:** 이 작업으로 기본 네임스페이스에 `Secret`이 생성됩니다. 커스텀 네임스페이스에 있는 경우 실행하기 전 명령의 네임스페이스 파라미터를 업데이트합니다.

클러스터 에이전트에 제공되는 기본 `cluster-agent-deployment.yaml`가 이미 설정되어 환경 변수 설정을 사용해 이 `Secret`를 확인할 수 있습니다.
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

이 환경 변수는 [Datadog 에이전트 설정][4] 시 동일한 설정을 사용해 설정해야 합니다. 

### 클러스터 에이전트 및 서비스 생성

1. 다음 메니페스트를 다운로드합니다.

    * [`agent-services.yaml`: 클러스터 에이전트 서비스 매니페스트][5]
    * [`secret-api-key.yaml`: Datadog API 키를 포함하는 암호][6]
    * [`secret-application-key.yaml`: Datadog 애플리케이션 키][7]를 포함하는 암호
    * [`cluster-agent-deployment.yaml`: 클러스터 에이전트 매니페스트][8]
    * [`install_info-configmap.yaml`: 설치 정보 Configmap][9]

2. `secret-api-key.yaml` 매니페스트에서 `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE`를 base64로 인코딩된 [Datadog API 키][19]로 바꿉니다. API 키의 base64 버전을 얻으려면 다음을 실행하세요:

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. `secrets-application-key.yaml` 매니페스트에서 base64로 인코딩된 [Datadog 애플리케이션 키][11]로 `PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE`를 대체합니다.
4. 기본적으로 `cluster-agent-deployment.yaml` 매니페스트는 `Secret` `datadog-cluster-agent`에서 이전에 생성한 토큰을 참조합니다. 다른 방법으로 이 토큰을 저장한 경우 `DD_CLUSTER_AGENT_AUTH_TOKEN` 환경 변수를 설정하세요.
5. 클러스터 에이전트 배포를 사용하려면 이 리소스를 배포하세요.
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. 마지막으로 Datadog 클러스터 에이전트를 배포하세요.
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**참고**: Datadog 클러스터 에이전트에서 Datadog 사이트({{< region-param key="dd_site" code="true" >}})에 환경 변수 `DD_SITE`를 설정하세요. 기본적으로 `US` 사이트인 `datadoghq.com`입니다.

### 확인

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

**참고**: 이미 Datadog 에이전트가 실행 중인 경우 클러스터 에이전트가 실행을 시작하기 전 [에이전트 `rbac.yaml` 매니페스트][12]를 적용해야 할 수 있습니다.

## Datadog 에이전트 통신 설정

Datadog 에이전트 설정을 수정하여 Datadog 클러스터 에이전트와 통신하세요.

기존 DaemonSet [매니페스트 파일][1]에서 환경 변수 `DD_CLUSTER_AGENT_ENABLED`를 `true`로 설정하세요. 그런 다음 [클러스터 에이전트 간 통신 보호][13]에서 사용한 동일한 구문으로 `DD_CLUSTER_AGENT_AUTH_TOKEN`을 설정하세요.

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

이러한 설정에서 DaemonSet을 다시 배포한 후 Datadog 에이전트는 클러스터 에이전트와 통신할 수 있습니다. 전체 예시에 제공된 클러스터 에이전트 [`daemonset.yaml` 매니페스트]를 참조할 수 있습니다.

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

### 확인

명령을 실행하여 Datadog 에이전트 포드와 클러스터 에이전트 포드가 실행 중인지 확인할 수 있습니다.

```shell
kubectl get pods | grep agent
```

다음을 참조해야 합니다.

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

추가로 [에이전트 상태 출력][1]을 사용해 Datadog 에이전트가 클러스터 에이전트에 연결되어 있는지 확인할 수 있습니다.

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

쿠버네티스(Kubernetes) 이벤트가 Datadog 계정으로 들어오기 시작합니다. 에이전트가 수집한 관련 메트릭은 해당되는 클러스터 수준 메타데이터로 태그 지정됩니다.

## 윈도우즈(Windows) 컨테이너

Datadog 클러스터 에이전트만 리눅스(Linux) 노드에 배포할 수 있습니다.

윈도우즈(Windows) 컨테이너를 모니터링하려면 혼합된 클러스터에서 Helm 차트 두 개를 설치해야 합니다. 첫 번째 Helm 차트는 Datadog 클러스터 에이전트와 리눅스용 에이전트 DaemonSet를 배포합니다(`targetSystem: linux` 사용). 두 번째 Helm 차트(`targetSystem: windows` 사용) 윈도우즈 노드에서 에이전트만 배포하고 첫 번째 Helm 차트의 일부로 배포된 기존 클러스터 에이전트에 연결합니다.

다음 `values.yaml` 파일을 사용해 윈도우즈 노드와 클러스터 에이전트에 배포된 에이전트 간 통신을 설정합니다.

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

자세한 정보는 [윈도우즈 컨테이너 문제 트러블슈팅][2]를 참조하세요.

## AWS 매니지드 서비스 모니터링

MSK, ElastiCache 또는 RDS 등 AWS 매니지드 서비스를 모니터링하려면 `clusterChecksRunner`를 설정하여 Helm 차트에서 serviceAccountAnnotation을 통해 할당된 IAM 역할이 포함된 포드를 생성합니다. 그런 다음 `clusterAgent.confd` 아래에서 통합 설정을 설정합니다.

{{< code-block lang="yaml" >}}
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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/ko/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows