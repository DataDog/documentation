---
aliases:
- /ko/agent/kubernetes/daemonset_setup
- /ko/agent/kubernetes/helm
- /ko/agent/kubernetes/installation
description: Datadog Operator, Helm 또는 kubectl을 사용해 Kubernetes에서 Datadog Agent 설치
  및 구성
further_reading:
- link: /agent/kubernetes/configuration
  tag: 설명서
  text: Kubernetes에서 Datadog Agent를 추가로 구성
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: 소스 코드
  text: Datadog Helm 차트 - 모든 구성 옵션
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: 소스 코드
  text: Datadog Helm 업그레이드
title: Kubernetes에 Datadog Agent 설치
---
## 개요 {#overview}

이 페이지에서는 Kubernetes 환경에 Datadog Agent를 설치하는 방법을 설명합니다.

AWS Elastic Kubernetes Service(EKS), Azure Kubernetes Service(AKS), Google Kubernetes Engine(GKE), Red Hat OpenShift, Rancher 및 Oracle Container Engine for Kubernetes(OKE)를 포함한 주요 Kubernetes 배포판에 대한 전용 문서 및 예제는 [Kubernetes 배포][1]를 참조하세요.

Kubernetes 컨트롤 플레인 모니터링에 대한 전용 문서 및 예제는 [Kubernetes 컨트롤 플레인 모니터링][2]을 참조하세요.

### 최소 Kubernetes 및 Datadog Agent 버전 {#minimum-kubernetes-and-datadog-agent-versions}

최신 Kubernetes 버전과 관련된 일부 기능은 최소 Datadog Agent 버전을 요구합니다.

| Kubernetes 버전 | Agent 버전 | Cluster Agent 버전 | 사유 |
| ------------------ | ------------- | --------------------- | ------------------------------------------------------------------------------ |
| 1.16.0+            | 7.19.0+       | 1.9.0+                | Kubelet 메트릭 사용 중단                                                    |
| 1.21.0+            | 7.36.0+       | 1.20.0+               | Kubernetes 리소스 사용 중단                                                |
| 1.22.0+            | 7.37.0+       | 7.37.0+               | 동적 서비스 계정 토큰 지원                                         |
| 1.25.0+            | 7.40.0+       | 7.40.0+               | `v1` API 그룹 지원                                                        |
| 1.33.0+            | 7.67.0+       | 7.67.0+               | `/pods` 출력에서 Kubernetes `AllocatedResources`과의 비호환성 수정 |

최적의 호환성을 위해 Datadog은 Cluster Agent와 Agent를 동일한 버전으로 유지할 것을 권장합니다.

## 설치 {#installation}

Datadog의 [Kubernetes에 설치하기][16] 페이지를 사용하여 설치 과정을 진행하세요.

1. **설치 방법 선택**

   다음 설치 방법 중 하나를 선택합니다.

   - [Datadog Operator][9] (권장): Kubernetes 및 OpenShift에 Datadog Agent를 배포하는 데 사용할 수 있는 Kubernetes [operator][10]입니다. 사용자 지정 리소스 상태에 배포 상태, 상태 정보 및 오류를 보고하며, 상위 수준 구성 옵션을 통해 잘못된 구성을 방지합니다.
   - [Helm][11]
   - 수동 설치. [DaemonSet를 사용하여 수동으로 Datadog Agent 설치 및 구성][12]을 참조하세요..
  
<div class="alert alert-info">Kubernetes 환경에서 <a href="/containers/kubernetes/apm">Single Step Instrumentation(SSI)</a>을 사용하여 APM을 구현할 계획이라면 Datadog Agent를 별도의 네임스페이스에 설치하세요. SSI는 Datadog Agent와 동일한 네임스페이스에 있는 포드를 계측하지 않습니다.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}
<div class="alert alert-info"><a href="https://helm.sh">Helm</a> 및 <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">kubectl CLI</a>가 필요합니다.</div>

2. **Datadog Operator 설치**

   현재 네임스페이스에 Datadog Operator를 설치하려면 다음 명령을 실행합니다.
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - `<DATADOG_API_KEY>`를 [Datadog API 키][1]로 바꾸세요.

3. **`datadog-agent.yaml`** 구성

   다음 내용을 포함하는 `datadog-agent.yaml` 파일을 생성합니다.
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
   ```
   - `<CLUSTER_NAME>`를 클러스터 이름으로 바꾸세요. 
   - `<DATADOG_SITE>`를 [Datadog site][2] 값으로 바꾸세요. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요.)

4. **위 구성 파일을 사용하여 Agent 배포**

   실행:
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info"><a href="https://helm.sh">Helm</a>이 필요합니다.</div>

2. **Datadog Helm 저장소 추가**

   실행:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - `<DATADOG_API_KEY>`를 [Datadog API 키][1]로 바꾸세요.

3. **`datadog-values.yaml`** 구성

   다음 내용을 포함하는 `datadog-values.yaml` 파일을 생성합니다.
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
   ```
   
   - `<CLUSTER_NAME>`를 클러스터 이름으로 바꾸세요.
   - `<DATADOG_SITE>`를 [Datadog site][2] 값으로 바꾸세요. 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요.)

4. **위 구성 파일을 사용하여 Agent 배포**

   실행:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   Windows에서는 <code>--set targetSystem=windows</code> 을(를) <code>helm install</code> 명령에 추가하세요.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Agent 설치 확인**

   Datadog의 [Containers][13] 페이지에서 `app.kubernetes.io/component:agent` 태그가 지정된 Agent 포드가 표시되는지 확인합니다. Agent 포드는 배포 후 몇 분 이내에 감지됩니다.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> 은 호스트와 Cluster Check를 범위 지정하는 데 사용됩니다. 이 고유 이름은 마침표(.)로 구분된 토큰 형식이어야 하며 다음 제한 사항을 따라야 합니다.
<ul>
  <li/>소문자, 숫자 및 하이픈(-)만 포함
  <li/>문자로 시작
  <li/>문자 또는 숫자로 끝남
  <li/>80자 이하
</ul>
</div>

### 권한 없는 설치 {#unprivileged-installation}

권한 없는 설치를 실행하려면 원하는 `<USER_ID>` 및 `<GROUP ID>`에 대해 다음 `securityContext` 구성을 추가합니다.

- `<USER_ID>`을 Datadog Agent를 실행할 UID로 바꾸세요. Datadog은 [Datadog Agent v7.48+][26]의 기존 `dd-agent` 사용자를 위해 이 값을 `100`으 설정할 것을 권장합니다.
- `<GROUP_ID>`를 Docker 또는 containerd 소켓을 소유한 그룹 ID로 바꾸세요.

이 설정은 Agent의 포드 수준에서 `securityContext`를 지정합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
권한 없는 설치를 실행하려면 `datadog-agent.yaml`에 다음 내용을 추가합니다.

{{< highlight yaml "hl_lines=14-19" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  override:
    nodeAgent:
      securityContext:
        runAsUser:  <USER_ID>
        supplementalGroups:
          - <GROUP_ID>
{{< /highlight >}}

그런 다음 Agent를 배포합니다.

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
권한 없는 설치를 실행하려면 `datadog-values.yaml` 파일에 다음 내용을 추가합니다.

{{< highlight yaml "hl_lines=5-8" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
  site: <DATADOG_SITE>
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <GROUP_ID>
{{< /highlight >}}

그런 다음 Agent를 배포합니다.

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### 컨테이너 레지스트리 {#container-registries}

Datadog은 Datadog Container Registry, Google Artifact Registry(GAR), Amazon ECR, Azure ACR, Docker Hub에 컨테이너 이미지를 게시합니다.

{{% container-images-table %}}

기본적으로 Datadog Agent Helm 차트는 Datadog 사이트, 클러스터 유형 및 `registryMigrationMode` 값을 기준으로 Agent 이미지 레지스트리를 결정합니다. 이 값과 환경별 제외 규칙에 따라 Agent 이미지는 Datadog Container Registry(`registry.datadoghq.com`) 또는 사이트별 레지스트리에서 가져옵니다. Datadog Operator 차트는 기본적으로 Datadog Agent Helm 차트의 종속성으로 포함되어 있습니다. Datadog Operator 차트 버전 2.19.0부터 해당 종속성을 통해 Operator를 설치하면 Datadog Agent Helm 차트의 `registryMigrationMode` 설정이 Operator가 관리하는 Agent 이미지에도 적용됩니다. Operator Helm 차트 자체에는 `registryMigrationMode` 설정이 정의되어 있지 않으며, Operator 포드 이미지는 Operator 차트의 `image.repository` 값으로 별도 제어됩니다.

<div class="alert alert-warning">Docker Hub에는 이미지 풀 속도 제한이 적용됩니다. Docker Hub 고객이 아니라면 Datadog은 다른 레지스트리에서 이미지를 가져오도록 Datadog Agent 및 Cluster Agent 구성을 업데이트할 것을 권장합니다. 관련 지침은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참조하세요.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator 차트 버전 2.19.0부터 Datadog Agent Helm 차트의 종속성을 통해 Operator를 설치하는 경우, Datadog Agent Helm 차트의 `registryMigrationMode` 설정에서 Operator가 관리하는 Agent 이미지에 대해 `registry.datadoghq.com`를 사용할 수 있습니다. 이전 버전에서는 Agent 이미지를 사이트별 레지스트리(`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq` 또는 `datadoghq.azurecr.io`)에서 가져왔습니다. 이 배포 경로에서 이전 사이트별 레지스트리를 계속 사용하려면 Datadog Agent Helm 차트의 `values.yaml`에서 `registryMigrationMode: ""`을 설정하세요. 이 설정은 레지스트리를 명시적으로 지정한 경우에는 영향을 미치지 않으며, 독립형 Operator Helm 차트의 설정 항목도 아닙니다. Operator 포드 이미지에 다른 레지스트리를 사용하려면 Operator Helm의 `values.yaml`에서 `image.repository`를 설정하세요.

다른 컨테이너 레지스트리를 사용하려면 `datadog-agent.yaml`의 `global.registry`를 수정하세요.

예를 들어 Amazon ECR을 사용하려면 다음과 같이 설정합니다.

{{< highlight yaml "hl_lines=8">}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    registry: public.ecr.aws/datadog
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Helm" %}}

다른 컨테이너 레지스트리를 사용하려면 `datadog-values.yaml`의 `registry`를 수정하세요.

예를 들어 Amazon ECR을 사용하려면 다음과 같이 설정합니다.

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [컨테이너 레지스트리 변경][17]을 참조하세요.

### 제거 {#uninstall}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

이 명령은 Datadog Operator 설치 및 Datadog Agent 배포 시 생성된 모든 Kubernetes 리소스를 삭제합니다.
{{% /tab %}}
{{% tab "Helm" %}}

```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## 다음 단계 {#next-steps}

### Datadog에서 인프라 모니터링 {#monitor-your-infrastructure-in-datadog}
[Containers][13] 페이지를 사용하여 리소스 메트릭 및 패싯 검색 기능과 함께 컨테이너 인프라에 대한 가시성을 확보할 수 있습니다. Containers 페이지 사용 방법은 [컨테이너 보기][14]를 참조하세요.

[Container Images][18] 페이지에서는 환경에서 사용 중인 모든 이미지에 대한 인사이트를 확인할 수 있습니다. 이 페이지에는 [Cloud Security][19]에서 컨테이너 이미지에서 발견한 취약점도 표시됩니다. Container Images 페이지 사용 방법은 [컨테이너 이미지 보기][20]를 참조하세요.

[Kubernetes][21] 섹션에서는 모든 Kubernetes 리소스에 대한 개요를 제공합니다. [Orchestrator Explorer][22]를 사용하면 특정 네임스페이스 또는 가용 영역의 포드, Deployment 및 기타 Kubernetes 리소스의 상태를 모니터링하고, Deployment 내에서 실패한 포드의 리소스 사양을 확인하며, 노드 활동을 관련 로그와 연계하는 등의 작업을 수행할 수 있습니다. [리소스 활용][23] 페이지에서는 Kubernetes 워크로드가 인프라 전반에서 컴퓨팅 리소스를 어떻게 사용하는지에 대한 인사이트를 제공합니다. 이러한 페이지 사용 방법은 [Orchestrator Explorer][24] 및 [Kubernetes 리소스 활용][25]을 참조하세요.

### 기능 활성화 {#enable-features}

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>Kubernetes용 APM</u>: Kubernetes 애플리케이션에 대한 트레이스 수집을 설정하고 구성합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Kubernetes의 로그 수집</u>: Kubernetes 환경에서 로그 수집을 설정합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus 및 OpenMetrics</u>: Kubernetes 내부에서 실행되는 애플리케이션이 노출하는 Prometheus 및 OpenMetrics 메트릭을 수집합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>컨트롤 플레인 모니터링</u>: Kubernetes API 서버, Controller Manager, Scheduler 및 etcd를 모니터링합니다.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>추가 구성</u>: 이벤트 수집, 프록시 구성 재정의, DogStatsD를 사용한 사용자 지정 메트릭 전송, 컨테이너 허용 목록 및 차단 목록 구성, 사용 가능한 전체 환경 변수 목록 참조 등을 수행합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/distributions
[2]: /ko/agent/kubernetes/control_plane
[3]: /ko/infrastructure/livecontainers/configuration/
[4]: /ko/agent/kubernetes/configuration/
[5]: /ko/agent/kubernetes/integrations/
[6]: /ko/agent/kubernetes/apm/
[7]: /ko/agent/kubernetes/log/
[9]: /ko/containers/datadog_operator
[10]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[11]: https://helm.sh
[12]: /ko/containers/guide/kubernetes_daemonset/
[13]: https://app.datadoghq.com/containers
[14]: /ko/infrastructure/containers
[15]: /ko/containers/kubernetes/apm
[16]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[17]: /ko/containers/guide/changing_container_registry/
[18]: https://app.datadoghq.com/containers/images
[19]: /ko/security/cloud_security_management
[20]: /ko/infrastructure/containers/container_images
[21]: https://app.datadoghq.com/kubernetes
[22]: https://app.datadoghq.com/orchestration/overview
[23]: https://app.datadoghq.com/orchestration/resource/pod
[24]: /ko/infrastructure/containers/orchestrator_explorer
[25]: /ko/infrastructure/containers/kubernetes_resource_utilization
[26]: /ko/data_security/kubernetes/#running-container-as-root-user