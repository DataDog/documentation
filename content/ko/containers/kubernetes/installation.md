---
aliases:
- /ko/agent/kubernetes/daemonset_setup
- /ko/agent/kubernetes/helm
- /ko/agent/kubernetes/installation
further_reading:
- link: /agent/kubernetes/configuration
  tag: 설명서
  text: Kubernetes에서 Datadog Agent 추가 설정
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: GitHub
  text: Datadog Helm 차트 - 모든 설정 옵션
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: GitHub
  text: Datadog Helm 업그레이드하기
title: Kubernetes에 Datadog Agent 설치하기
---

## 개요

이 페이지에서는 Kubernetes 환경에 Datadog Agent를 설치하는 방법에 대한 지침을 제공합니다. 기본적으로 Datadog Agent는 DaemonSet에서 실행됩니다.

AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher, Oracle Container Engine for Kubernetes (OKE) 등 주요 Kubernetes 배포에 대한 전용 설명서 및 예제는 [Kubernetes 배포][1]를 참조하세요.

Kubernetes 컨트롤 플레인 모니터링에 대한 전용 설명서와 예제는 [Kubernetes 컨트롤 플레인 모니터링][2]을 참조하세요.

### 최소 Kubernetes 및 Datadog Agent 버전

최신 Kubernetes 버전과 관련된 일부 기능에는 최소 Datadog Agent 버전이 필요합니다.

| Kubernetes 버전  | Agent 버전  | 이유                                |
|--------------------|----------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | Kubelet 메트릭 사용 중단           |
| 1.21.0+            | 7.36.0+        |  Kubernetes 리소스 사용 중단       |
| 1.22.0+            | 7.37.0+        |  동적 서비스 계정 토큰 지원 |

[최소 Kubernetes 및 Cluster Agent 버전][8]도 참조하세요.

## 설치

Kubernetes에 Datadog Agent를 설치하는 데는 다음과 같은 옵션이 있습니다.

- [Datadog Operator][9], [Kubernetes Operator][10] (권장)
- [Helm][11]
- 수동 설치. [DaemonSet를 사용하여 Kubernetes에 Datadog Agent를 수동으로 설치 및 설정][12]을 참조하세요.

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">Datadog 오퍼레이터는 일반적으로 1.0.0 버전과 함께 사용할 수 있으며, DatadogAgent 커스텀 리소스의 <code>v2alpha1</code>버전을 조정합니다.</div>

[Datadog Operator][1]는 Kubernetes 및 OpenShift에 Datadog Agent를 배포하는 방법입니다. 커스텀 리소스 상태에서 배포 상태, 기본 상태 및 오류를 보고하고 더 높은 레벨의 설정 옵션을 통해 잘못된 설정의 위험을 방지합니다.

### 전제 조건

Datadog Operator를 사용하려면 다음의 전제 조건을 만족해야 합니다.

- **Kubernetes 클러스터 버전 v1.20.X+**: 테스트는 v1.20.0+에서 수행되었으며, v1.11.0+에서 지원되어야 합니다. 이전 버전의 경우 제한된 CRD 지원으로 인해 Operator가 예상대로 작동하지 않을 수 있습니다.
- `datadog-operator` 배포용 [`Helm`][2].
- `datadog-agent` 설치용 [`Kubectl` CLI][3].

### 오퍼레이터로 에이전트 배포

1. [Datadog 오퍼레이터][5]를 설치합니다:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. API 및 앱 키로 Kubernetes 시크릿을 생성합니다.

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`를 해당 [Datadog API][6] 및 [애플리케이션 키][7]로 교체하세요.

2. Datadog Agent 배포 설정 사양을 사용하여 `datadog-agent.yaml` 파일을 만듭니다. 가장 간단한 설정은 다음과 같습니다.

   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
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

   `<DATADOG_SITE>`를 [Datadog 사이트][10]로 교체하세요. 귀하의 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에 올바른 사이트가 선택되었는지 확인합니다.)

3. 위의 설정 파일로 Datadog 에이전트를 배포합니다:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://app.datadoghq.com/organization-settings/application-keys
[10]: /ko/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

### 전제 조건

- [Helm][1]
- 새로 설치하는 경우 Helm Datadog repo를 추가합니다:
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

### 차트 설치

1. 빈 `datadog-values.yaml` 파일을 생성합니다. 이 파일에 지정되지 않은 파라미터는 기본적으로 [`values.yaml`][14]에 설정된 파라미터로 설정됩니다.

2. Datadog [API 키][3] 및 [앱 키][15]를 저장할 Kubernetes 비밀을 만듭니다.

   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```
3. 비밀을 참조하려면 다음 파라미터를 `datadog-values.yaml`에 설정하세요.
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    appKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
   clusterAgent:
    metricsProvider:
     enabled: true
   ```
   `<DATADOG_SITE>`를 [Datadog 사이트][13]로 교체하세요. 귀하의 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에 올바른 사이트가 선택되었는지 확인합니다.)
3. 다음 명령을 실행합니다:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

- `<RELEASE_NAME>`: 릴리스 이름. 예: `datadog-agent`.

- `<TARGET_SYSTEM>`: 운영체제 이름. 예: `linux` 또는 `windows`.


**참고**: Helm `2.x`를 사용하는 경우 다음을 실행하세요.
   ```bash
   helm install --name <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /ko/agent/kubernetes/apm?tab=helm
[6]: /ko/agent/kubernetes/log?tab=helm

[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /ko/integrations/kubernetes_state_core
[13]: /ko/getting_started/site
[14]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[15]: https://app.datadoghq.com/organization-settings/application-keys

{{% /tab %}}
{{< /tabs >}}

### 초기화

{{< tabs >}}
{{% tab "Operator" %}}
다음 명령은 위 지침에 따라 생성된 모든 Kubernetes 리소스를 삭제합니다.

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

허용 오차 사용 정보를 포함하여 Datadog Operator 설정에 대한 자세한 내용은 [Datadog Operator 고급 설정 가이드][1]를 참조하세요.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md

{{% /tab %}}
{{% tab "Helm" %}}
`<RELEASE_NAME>` 디플로이먼트를 제거/삭제하려면:

```bash
helm uninstall <RELEASE_NAME>
```
{{% /tab %}}
{{< /tabs >}}


### 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면:

{{< tabs >}}
{{% tab "Operator" %}}
`datadog-agent`.yaml에서 Datadog 커스텀 리소스(CR)에 다음을 추가합니다.

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

{{% /tab %}}
{{% tab "Helm" %}}
`datadog-values.yaml` 파일에 다음을 추가합니다.

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

- `<USER_ID>`는 Agent를 실행하기 위한 UID입니다.
- `<DOCKER_GROUP_ID>`은 Docker 또는 컨테이너 소켓을 소유한 그룹 ID입니다.

### 컨테이너 레지스트리

{{< tabs >}}
{{% tab "Operator" %}}

컨테이너 이미지 레지스트리를 수정하려면 [컨테이너 레지스트리 변경하기][9] 가이드를 참조하세요.


[9]: /ko/agent/guide/changing_container_registry/#kubernetes-with-the-datadog-operator

{{% /tab %}}
{{% tab "Helm" %}}

<div class="alert alert-warning">Docker Hub는 이미지 가져오기 속도 제한에 영향을 받습니다. Docker Hub의 고객이 아닌 경우 GCR 또는 ECR에서 가져오도록 Datadog Agent 및 Cluster Agent 설정을 업데이트할 것을 권장합니다. 자세한 지침은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참고하세요.</div>

배포 지역에서 Google 컨테이너 레지스트리 ([gcr.io/datadoghq][8])에 액세스할 수 없는 경우, `values.yaml` 파일에서 다음 설정이 포함된 다른 레지스트리를 사용합니다:

- 퍼블릭 Amazon ECR 레지스트리 ([public.ecr.aws/datadog][9])의 경우 다음을 사용합니다.

  ```yaml
  registry: public.ecr.aws/datadog
  ```

- 도커 허브 레지스트리 ([docker.io/datadog][10])인 경우 다음을 사용합니다:

  ```yaml
  registry: docker.io/datadog
  ```

**참고**:

- Datadog 차트가 AWS 환경에 배포되는 경우 퍼블릭 Amazon ECR 레지스트리([public.ecr.aws/datadog][9])를 사용하는 것이 좋습니다.

[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/

{{% /tab %}}
{{< /tabs >}}

## 다음 단계

- **Datadog에서 Kubernetes 인프라스트럭처를 모니터링하세요**. Datadog Operator 또는 Helm 설치를 사용한 경우 Datadog의 [컨테이너 보기][13]에서 컨테이너 모니터링을 시작할 수 있습니다. 자세한 내용은 [컨테이너 보기 문서][14]를 참조하세요.

- **APM을 설정합니다**. [Kubernetes APM - 트레이스 수집][15]을 참조하세요.
- **로그 수집을 설정합니다**. [Kubernetes 로그 수집][7]을 참조하세요.
- **통합을 설정합니다*. [통합 및 자동 탐지][5]를 참조하세요.
- **기타 설정**: 이벤트 수집, 프록시 설정 재정의, DogStatsD로 커스텀 메트릭 전송, 컨테이너 허용 목록 및 차단 목록 설정, 사용 가능한 환경 변수의 전체 목록을 참조를 수행하려면 [추가 Kubernetes 설정][4]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/distributions
[2]: /ko/agent/kubernetes/control_plane
[3]: /ko/infrastructure/livecontainers/configuration/
[4]: /ko/agent/kubernetes/configuration/
[5]: /ko/agent/kubernetes/integrations/
[6]: /ko/agent/kubernetes/apm/
[7]: /ko/agent/kubernetes/log/
[8]: /ko/containers/cluster_agent/#minimum-agent-and-cluster-agent-versions
[9]: /ko/containers/datadog_operator
[10]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[11]: https://helm.sh
[12]: /ko/containers/guide/kubernetes_daemonset/
[13]: https://app.datadoghq.com/containers
[14]: /ko/infrastructure/containers
[15]: /ko/containers/kubernetes/apm
