---
aliases:
- /ko/agent/kubernetes/daemonset_setup
- /ko/agent/kubernetes/helm
- /ko/agent/kubernetes/installation
further_reading:
- link: infrastructure/livecontainers/
  tag: 설명서
  text: 실시간 컨테이너
- link: /agent/kubernetes/configuration
  tag: 설명서
  text: 쿠버네티스에서 Datadog 에이전트 설정
- link: /agent/kubernetes/integrations
  tag: 설명서
  text: 통합 설정하기
- link: /agent/kubernetes/apm
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: agent/kubernetes/log
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/tag
  tag: 설명서
  text: 컨테이너, 포드 또는 노드에서 내보내는 모든 데이터에 태그를 할당합니다.
kind: 설명서
title: 쿠버네티스에 Datadog 에이전트 설치하기
---

## 설치

쿠버네티스 환경에서 Datadog 에이전트를 설치하는 세 가지 방법은 다음과 같습니다.

- Datadog 오퍼레이터
- Helm 차트
- 데몬셋

AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, Oracle Container Engine for Kubernetes (OKE) 등 주요 쿠버네티스 배포에 대한 전용 설명서 및 예제는 [쿠버네티스 배포][1]를 참조하세요.

쿠버네티스 컨트롤 플레인 모니터링에 대한 전용 설명서와 예제는 [쿠버네티스 컨트롤 플레인 모니터링][2]을 참조하세요.

### 최소 에이전트 및 클러스터 에이전트 버전

최신 쿠버네티스 버전과 관련된 일부 기능에는 최소 Datadog 에이전트 버전이 필요합니다.

| 쿠버네티스 버전  | 에이전트 버전  | 클러스터 에이전트 버전 | 이유                                |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | 1.9.0+                | Kubelet 메트릭 사용 중단           |
| 1.21.0+            | 7.36.0+        | 1.20.0+               | 쿠버네티스 리소스 사용 중단       |
| 1.22.0+            | 7.37.0+        | 7.37.0+               | 동적 서비스 계정 토큰 지원 |

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">Datadog 오퍼레이터는 일반적으로 1.0.0 버전과 함께 사용할 수 있으며, DatadogAgent 커스텀 리소스의 <code>v2alpha1</code>버전을 조정합니다.</div>

[Datadog 오퍼레이터][1]는 쿠버네티스와 OpenShift에 Datadog 에이전트를 배포하는 방법입니다. 커스텀 리소스 상태에서 배포 상황, 상태, 오류를 보고하고 고급 설정 옵션을 통해 오류 발생 위험을 줄입니다.

## 전제 조건

Datadog Operator를 사용하려면 다음의 전제 조건을 만족해야 합니다.

- **쿠버네티스 클러스터 버전 >= v1.20.X**: 테스트는 >= `1.20.0` 버전에서 수행되었으나 `>= v1.11.0` 버전에서도 작동해야 합니다. 이전 버전의 CRD 지원이 제한되어 있기 때문에 오퍼레이터가 예상대로 작동하지 않을 수 있습니다.
- `datadog-operator` 배포용 [`Helm`][2].
- `datadog-agent` 설치용 [`Kubectl` CLI][3].

## 오퍼레이터로 에이전트 배포

오퍼레이터와 함께 최소한의 단계를 거쳐 Datadog 에이전트를 배포하려면 [`datadog-operator`][4] Helm 차트를 참조하세요. 구체적인 단계는 다음과 같습니다.

1. [Datadog 오퍼레이터][5]를 설치합니다:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. API 및 앱 키로 Kubernetes 시크릿을 생성합니다.

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>`와 `<DATADOG_APP_KEY>`를 [Datadog API 및 애플리케이션 키][6]로 교체합니다.

2. Datadog 에이전트 배포 설정의 사양이 포함된 파일을 생성합니다. 가장 간단한 설정은 다음과 같습니다:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
```

3. 위의 설정 파일로 Datadog 에이전트를 배포합니다:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

## 초기화

다음 명령어는 위의 지시에 따라 생성된 쿠버네티스 리소스 전체를 삭제합니다.

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

허용 오차 사용에 대한 정보 및 오퍼레이터 설정에 대한 자세한 내용은 [Datadog 오퍼레이터 고급 설정 가이드][7]를 참조하세요.

## 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 [Datadog 커스텀 리소스(CR)][8]에 다음을 추가합니다:

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

## 컨테이너 레지스트리

컨테이너 이미지 레지스트리를 수정하려면 [컨테이너 레지스트리 변경하기][9] 가이드를 참조하세요.

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ko/agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md
[9]: /ko/agent/guide/changing_container_registry/#kubernetes-with-the-datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

커스텀 릴리스 이름 `<RELEASE_NAME>`(예: `datadog-agent`)을 사용하여 차트를 설치합니다:

1. [Helm 설치하기][1].
2.  [Datadog `values.yaml` 설정 파일][2]을 참조하여 `values.yaml`을 생성합니다. Datadog은 차트 버전 업그레이 드 시 원활한 진행을 위해 재정의해야 하는 값만 `values.yaml`에 포함할 것을 권장합니다.
3. 새로 설치하는 경우 Helm Datadog repo를 추가합니다:
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
4. [에이전트 설치 지침][3]에서 Datadog API 키를 검색하고 실행합니다:

- **Helm v3+**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

  `<TARGET_SYSTEM>`을 운영 체제 이름: `linux` 또는 `windows`로 교체합니다.

- **Helm v1/v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
    ```

이 차트는 데몬셋을 사용하여 클러스터의 모든 노드에 Datadog 에이전트를 추가합니다. 또한 선택적으로 [kube-state-metrics 차트][4]를 배포하여 클러스터에 대한 메트릭의 추가 소스로 사용합니다. 설치 후 몇 분 후에 Datadog은 호스트와 메트릭을 보고하기 시작합니다.

다음으로, 사용하려는 Datadog 기능을 활성화합니다: [APM][5], [로그][6]

**참조**:

- Datadog 차트의 설정 가능한 매개 변수 및 기본값의 전체 목록은 [Datadog Helm 리포지토리 README][7]를 참조하세요.

### 컨테이너 레지스트리

배포 지역에서 Google 컨테이너 레지스트리 ([gcr.io/datadoghq][8])에 액세스할 수 없는 경우, `values.yaml` 파일에서 다음 설정이 포함된 다른 레지스트리를 사용합니다:

- 공용 AWS ECR 레지스트리 ([public.ecr.aws/dataadog][9])인 경우 다음을 사용합니다:

  ```yaml
  registry: public.ecr.aws/datadog
  ```

- 도커 허브 레지스트리 ([docker.io/datadog][10])인 경우 다음을 사용합니다:

  ```yaml
  registry: docker.io/datadog
  ```

**참고**:

- Datadog 차트를 AWS 환경에 배포할 때는 공용 AWS ECR 레지스트리 ([public.ecr.aws/datadog][9])를 사용하는 것이 좋습니다.

### 차트 v1.x에서 업그레이드하기

Datadog 차트는 v2.0에서 리팩터링되어 `values.yaml` 매개 변수를 보다 논리적인 방식으로 재그룹화했습니다.

현재 배포된 차트 버전이 `v2.0.0` 이전 버전인 경우 [마이그레이션 가이드][11]에 따라 이전 설정을 새 필드에 매핑합니다.

### 차트 v2.x의 Kube 상태 메트릭 코어

Datadog은 새로운 배포에서 다음 값을 가진 최신 `kube-state-metrics` 코어를 사용할 것을 권장합니다:

```yaml
...
datadog:
...
  kubeStateMetricsCore:
    enabled: true
...
```

`kube-state-metrics` 코어에 대한 자세한 내용은 [쿠버네티스 상태 메트릭 코어 설명서][12]를 참조하세요.

### 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 `values.yaml` 파일에 다음을 추가합니다:

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /ko/agent/kubernetes/apm?tab=helm
[6]: /ko/agent/kubernetes/log?tab=helm
[7]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog
[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /ko/integrations/kubernetes_state_core
{{% /tab %}}
{{% tab "DaemonSet" %}}

데몬셋을 활용하여 모든 노드에 Datadog 에이전트를 배포하거나 [nodeSelectors를 사용][1]하여 특정 노드에 배포할 수 있습니다.

Datadog 에이전트를 쿠버네티스 클러스터에 설치하려면:

1. **에이전트 권한을 설정합니다**: 쿠버네티스에 역할 기반 액세스 제어(RBAC)가 활성화되어 있는 경우, Datadog 에이전트 서비스 계정에 대한 RBAC 권한을 설정합니다. 쿠버네티스 1.6 이상부터는 RBAC가 기본적으로 활성화됩니다. 다음 명령으로 적절한 ClusterRole, ServiceAccount, ClusterRoleBinding을 생성합니다:

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

   **참고**: 이러한 RBAC 설정은 `default`네임스페이스를 위한 것입니다. 커스텀 네임스페이스인 경우 적용하기 전에 `namespace` 매개 변수를 업데이트하세요.


2. **Datadog 에이전트 매니페스트를 생성합니다**. 다음 템플릿 중 하나를 사용하여 `datadog-agent.yaml` 매니페스트를 생성하세요:

    | Metrics                   | Logs                      | APM                       | Process                   | NPM                       | Security                       | Linux                   | Windows                 |
    |---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|-------------------------|-------------------------|-------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i>                         | <i class="icon-check-bold"></i> | [Manifest template][2]  | [Manifest template][3] (no security)  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           | [Manifest template][4]  | [Manifest template][5]  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           |                           | [Manifest template][6]  | [Manifest template][7]  |
    | <i class="icon-check-bold"></i> |                           | <i class="icon-check-bold"></i> |                           |                           |                           | [Manifest template][8]  | [Manifest template][9] |
    |                           |                           |                           |                           | <i class="icon-check-bold"></i> |                           | [Manifest template][10] | no template             |
    | <i class="icon-check-bold"></i> |                           |                           |                           |                           |                           | [Manifest template][11] | [Manifest template][12] |

   트레이스 수집을 완전히 활성화하려면 [애플리케이션 포드 설정에 추가 단계가 필요합니다][13]. 각 기능을 개별적으로 활성화하는 방법은 [로그][14], [APM][15], [프로세스][16], [네트워크 성능 모니터링][17], [보안][18] 설명서 페이지를 참조하세요.

   **참고**: 이러한 매니페스트는 `default` 네임스페이스를 위한 것입니다. 커스텀 네임스페이스인 경우 `metadata.namespace` 매개 변수를 업데이트한 후에 적용하세요.

3. `secret-api-key.yaml` 매니페스트에서 `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE`를 base64로 인코딩된 [Datadog API 키][19]로 바꿉니다. API 키의 base64 버전을 얻으려면 다음을 실행하세요:

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. `secret-cluster-agent-token.yaml` 매니페스트에서 `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE`를 base64로 인코딩된 임의의 문자열로 대체합니다. base64 버전을 얻으려면 다음을 실행하세요: 

    ```shell
    echo -n 'Random string' | base64
    ```

   **참고**: 클러스터 에이전트 간 통신을 보호하려면 임의 문자열에 영숫자 32자 이상이 포함되어야 합니다.

5. `datadog-agent.yaml` 매니페스트에서 `DD_SITE` 환경 변수를 사용하여 **Datadog 사이트**를 {{< region-param key="dd_site" code="true" >}}로 설정합니다.

   **참고**: `DD_SITE` 환경 변수가 명시적으로 설정되지 않은 경우 기본값은 `US` `datadoghq.com` 사이트 입니다. 다른 사이트 중 하나(`EU`, `US3`, 또는 `US1-FED`)를 사용하는 경우 잘못된 API 키 메시지가 표시됩니다. 사용 중인 사이트에 적합한 설명를 확인하려면 [문서 사이트 선택기][20]를 사용하세요.

6. 명령어와 함께 **데몬셋을 배포합니다**:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **확인**: Datadog 에이전트가 사용자 환경에서 데몬셋으로 실행되고 있는지 확인하려면, 다음을 실행합니다:

    ```shell
    kubectl get daemonset
    ```

   에이전트가 배포되면 아래 텍스트와 유사한 출력이 표시되며, `DESIRED`와 `CURRENT`는 클러스터에서 실행 중인 노드 수와 동일합니다.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

8. 선택 사항 - **쿠버네티스 상태 메트릭 설정**: [Kube-State 매니페스트 폴더][21]를 다운로드하고 Kubernetes 클러스터에 적용하여 [kube-state 메트릭][22]을 자동으로 수집합니다:

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 [포드 템플릿][19]에 다음을 추가합니다:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  override:
    nodeAgent:
      securityContext:
        runAsUser: 1 # <USER_ID>
        supplementalGroups:
          - 123 # "<DOCKER_GROUP_ID>"
```

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /ko/agent/kubernetes/apm/#setup
[14]: /ko/agent/kubernetes/log/
[15]: /ko/agent/kubernetes/apm/
[16]: /ko/infrastructure/process/?tab=kubernetes#installation
[17]: /ko/network_monitoring/performance/setup/
[18]: /ko/data_security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /ko/getting_started/site/
[21]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[22]: /ko/agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{< /tabs >}}

## 다음 단계

실시간 컨테이너를 설정하려면 [실시간 컨테이너][3]를 참조하세요.

이벤트 수집, 프록시 설정 재정의, DogStatsD로 커스텀 메트릭 전송, 컨테이너 허용 목록과 차단 목록 설정, 사용 가능한 환경 변수 전체 목록에 대한 정보를 확인하려면 [쿠버네티스에서의 Datadog 에이전트 설정][4]을 참조하세요.

통합을 설정하려면 [통합 및 자동 탐지][5]를 참조하세요.

APM을 설정하려면 [쿠버네티스 트레이스 수집][6]을 참조하세요.

로그 수집을 설정하려면 [쿠버네티스 로그 수집][7]을 참조하세요.

[1]: /ko/agent/kubernetes/distributions
[2]: /ko/agent/kubernetes/control_plane
[3]: /ko/infrastructure/livecontainers/configuration/
[4]: /ko/agent/kubernetes/configuration/
[5]: /ko/agent/kubernetes/integrations/
[6]: /ko/agent/kubernetes/apm/
[7]: /ko/agent/kubernetes/log/