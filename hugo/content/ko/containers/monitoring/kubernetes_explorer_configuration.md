---
aliases:
- /ko/infrastructure/livecontainers/configuration
- /ko/infrastructure/containers/configuration
further_reading:
- link: /infrastructure/hostmap/
  tag: 설명서
  text: 인프라 맵을 통한 모든 호스트 및 컨테이너 확인
- link: /infrastructure/process/
  tag: 설명서
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
title: Kubernetes Explorer 구성
---
이 페이지는 Datadog의 [Containers][1] 페이지에 대한 구성 옵션을 나열합니다. Containers 페이지와 제공 기능에 대한 자세한 내용은 [Containers View][2] 문서를 참조하세요.

## Kubernetes Explorer 구성 {#configure-kubernetes-explorer}

### 리소스 수집 호환성 매트릭스 {#resource-collection-compatibility-matrix}

다음 표에는 수집된 리소스 목록과 각 리소스에 대한 최소 에이전트, 클러스터 에이전트 및 헬름 차트 버전이 나와 있습니다.

| 리소스 | 최소 Agent 버전 | 최소 Cluster Agent 버전* | 최소 Helm 차트 버전 | 최소 Kubernetes 버전 |
|---|---|---|---|---|
| ClusterRoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ClusterRoles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Clusters | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| CronJobs | 7.33.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| CustomResourceDefinitions | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| CustomResources | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| DaemonSets | 7.33.0 | 1.18.0 | 2.16.3 | 1.16.0 |
| Deployments | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| HorizontalPodAutoscalers | 7.33.0 | 7.51.0 | 2.10.0 | 1.1.1 |
| Ingresses | 7.33.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| Jobs | 7.33.0 | 1.18.0 | 2.15.5 | 1.16.0 |
| Namespaces | 7.33.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| 네트워크 정책 | 7.33.0 | 7.56.0 | 3.57.2 | 1.14.0 |
| Nodes | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| PersistentVolumeClaims | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| PersistentVolumes | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Pods | 7.33.0 | 1.18.0 | 3.9.0 | 1.17.0 |
| ReplicaSets | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| RoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ServiceAccounts | 7.33.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| Services | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| Statefulsets | 7.33.0 | 1.15.0 | 2.20.1 | 1.16.0 |
| VerticalPodAutoscalers | 7.33.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**참고**: Cluster Agent 버전 1.22 이후에는 버전 7.39.0부터 Agent 릴리스 버전 번호 체계를 따릅니다.

### 리소스에 사용자 지정 태그 추가 {#add-custom-tags-to-resources}

Kubernetes 리소스에 커스텀 태그를 추가하여 Kubernetes 리소스 보기 내에서 쉽게 필터링할 수 있습니다.

추가 태그는 `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 환경 변수를 통해 추가됩니다.

**참고**: 이 태그는 Kubernetes 리소스 보기에서만 표시됩니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml`에서 `agents.containers.processAgent.env`와 `clusterAgent.env`를 설정하여 Process Agent와 Cluster Agent 모두에 환경 변수를 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
    agents:
      containers:
        processAgent:
          env:
            - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
              value: "tag1:value1 tag2:value2"
    clusterAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
```

그런 다음 새로운 구성을 적용합니다.

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

[공식 Helm 차트][1]를 사용하는 경우, [values.yaml][2]에서 `agents.containers.processAgent.env` 및 `clusterAgent.env`를 설정하여 Process Agent와 Cluster Agent 모두에 환경 변수를 추가합니다.

```yaml
agents:
  containers:
    processAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
clusterAgent:
  env:
    - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
      value: "tag1:value1 tag2:value2"
```

그런 다음 Helm 차트를 업그레이드합니다.

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

프로세스 에이전트와 클러스터 에이전트 컨테이너 모두에서 환경 변수를 설정합니다.

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### 사용자 지정 리소스 수집 {#collect-custom-resources}

[Kubernetes Explorer][3]는 기본적으로 사용자 지정 리소스 정의(CRD)를 자동 수집합니다.

#### 자동 사용자 지정 리소스 수집 호환성 매트릭스 {#automatic-custom-resource-collection-compatibility-matrix}

클러스터에 다음 CRD가 있으면 Agent가 해당 사용자 지정 리소스(CR)를 자동으로 수집합니다. 사용 중인 CRD가 아래 목록에 **없거나** Agent 버전이 이전 버전인 경우, 아래의 **수동 구성** 단계를 따릅니다.

| CRD 그룹                   | CRD 종류                            | CRD 버전       | 최소 Agent 버전 |
| --------------------------- | ----------------------------------- | ------------------ | --------------------- |
| argoproj.io                 | application                         | v1alpha1           | 7.71.0                |
| argoproj.io                 | applicationset                      | v1alpha1           | 7.71.0                |
| argoproj.io                 | rollout                             | v1alpha1           | 7.71.0                |
| azure.karpenter.sh          | *                                   | v1beta1            | 7.71.0                |
| datadoghq.com               | datadogagent                        | v2alpha1           | 7.71.0                |
| datadoghq.com               | datadogagentprofile                 | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogdashboard                    | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadoginstrumentation              | v1alpha1           | 7.83.0                |
| datadoghq.com               | datadogmetric                       | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogmonitor                      | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogpodautoscaler                | v1alpha2           | 7.71.0                |
| datadoghq.com               | datadogslo                          | v1alpha1           | 7.71.0                |
| eks.amazonaws.com           | nodeclass                           | v1, v1beta1        | 7.77.0                |
| karpenter.k8s.aws           | *                                   | v1                 | 7.71.0                |
| karpenter.sh                | *                                   | v1                 | 7.71.0                |
| kubeai.org                  | model                               | v1                 | 7.85.0                |
| kustomize.toolkit.fluxcd.io | kustomization                       | v1                 | 7.76.0                |
| nvidia.com                  | dynamocheckpoint                    | v1alpha1           | 7.84.0                |
| nvidia.com                  | dynamocomponentdeployment           | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeployment               | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeploymentrequest        | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeploymentscalingadapter | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamomodel                         | v1alpha1           | 7.84.0                |
| nvidia.com                  | dynamoworkermetadata                | v1alpha1           | 7.84.0                |
| ray.io                      | raycluster                          | v1, v1alpha1       | 7.84.0                |
| ray.io                      | raycronjob                          | v1                 | 7.84.0                |
| ray.io                      | rayjob                              | v1, v1alpha1       | 7.84.0                |
| ray.io                      | rayservice                          | v1, v1alpha1       | 7.84.0                |
| serving.kserve.io           | clusterservingruntime               | v1alpha1           | 7.85.0                |
| serving.kserve.io           | clusterstoragecontainer             | v1alpha1           | 7.85.0                |
| serving.kserve.io           | inferencegraph                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | inferenceservice                    | v1beta1            | 7.85.0                |
| serving.kserve.io           | llminferenceservice                 | v1alpha2, v1alpha1 | 7.85.0                |
| serving.kserve.io           | llminferenceserviceconfig           | v1alpha2, v1alpha1 | 7.85.0                |
| serving.kserve.io           | localmodelcache                     | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnamespacecache            | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnode                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnodegroup                 | v1alpha1           | 7.85.0                |
| serving.kserve.io           | servingruntime                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | trainedmodel                        | v1alpha1           | 7.85.0                |
| source.toolkit.fluxcd.io    | bucket                              | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | externalartifact                    | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | gitrepository                       | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | helmchart                           | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | helmrepository                      | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | ocirepository                       | v1                 | 7.76.0                |


#### 수동 구성 {#manual-configuration}

다른 CRD의 경우, 다음 단계에 따라 해당 CRD가 정의하는 사용자 지정 리소스를 수집합니다.

1. Datadog에서 [Kubernetes Explorer][3]를 엽니다. 왼쪽 패널의 **Select Resources** 아래에서 [**Kubernetes > Custom Resources > Resource Definitions**][4]를 선택합니다.

1. 탐색기에서 시각화하려는 사용자 지정 리소스를 정의하는 CRD를 찾습니다. **Versions** 열에서 인덱싱을 구성할 `version` 태그를 클릭합니다.

   {{< img src="infrastructure/containers_view/CRD_indexing_access_1.mp4" alt="Custom Resources 드롭다운을 펼치고 Resource Definitions를 선택한 상태의 Kubernetes Explorer 동영상 커서가 표의 특정 행으로 이동한 다음 'Versions' 열에서 버전 하나를 클릭합니다. 커서가 'v1alpha1'을 선택합니다. 모달이 나타납니다." video="true">}}

   모달이 나타납니다.
   {{< img src="infrastructure/containers_view/indexing_modal_1.png" alt="Collecting and Indexing 모달입니다. 두 섹션으로 구성됩니다. Set up Datadog Agent 섹션에는 Agent 구성을 업데이트하는 데 사용할 수 있는 복사 가능한 코드 스니펫이 있고, Select indexed fields for filtering/sorting 섹션에는 인덱싱할 필드를 선택하는 확인란과 미리 보기가 있습니다.">}}

1. 모달의 **Set up Datadog Agent** 섹션에 있는 지침에 따라 사용자 지정 리소스를 수집하지 않는 클러스터의 Agent 구성을 업데이트합니다. 모달에는 Agent가 사용자 지정 리소스를 수집하도록 구성되지 않았거나 클러스터에 사용 가능한 사용자 지정 리소스가 없는 모든 클러스터가 표시됩니다. Agent가 구성되어 있고 사용자 지정 리소스가 존재하지 않는 경우, 별도의 액션은 필요하지 않습니다.

   {{< tabs >}}
   {{% tab "Helm 차트" %}}

   1. `datadog-values.yaml`에 다음 구성을 추가합니다.

      ```yaml
      datadog:
        #(...)
        orchestratorExplorer:
          customResources:
            - <CUSTOM_RESOURCE_NAME>
      ```

   1. Helm 차트를 업그레이드합니다.

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   1. Datadog Agent에 사용자 지정 리소스 수집 권한을 부여하는 옵션을 사용하여 Datadog Operator를 설치합니다.

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. `DatadogAgent` 매니페스트인 `datadog-agent.yaml`에 다음 구성을 추가합니다.

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          orchestratorExplorer:
            customResources:
              - <CUSTOM_RESOURCE_NAME>
      ```

   1. 새 구성을 적용합니다.

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

   각 `<CUSTOM_RESOURCE_NAME>`은 `group/version/kind` 형식을 사용해야 합니다.

1. 모달의 **Select indexed fields for filtering/sorting** 섹션에서 필터링 및 정렬에 사용할 사용자 지정 리소스의 인덱싱 대상 필드를 선택합니다. 일부 CRD의 경우 Datadog에서 기본 구성을 제공합니다. 필요한 경우 추가 필드를 선택할 수 있습니다.

    <div class="alert alert-info">Datadog Agent를 설정하면 사용 가능한 사용자 지정 리소스를 자동으로 수집합니다. 필드 인덱싱은 선택 사항입니다.</div>


    {{< img src="infrastructure/containers_view/CRD_indexing_modal_1.mp4" alt="Collecting and Indexing 모달을 보여주는 동영상 커서가 세 개의 필드를 선택하고 Update Fields를 클릭합니다. 성공 메시지가 표시됩니다." video="true">}}

    For arrays of objects, see the [Indexing complex types](#indexing-complex-types) section.

1.  저장하려면 **Update Fields**를 선택합니다.

필드가 인덱싱된 후에는 해당 필드를 탐색기에 열로 추가하고 정렬하거나 Saved Views에 포함할 수 있습니다. `field#` 접두사를 사용하여 인덱싱된 필드를 필터링할 수도 있습니다.

### 복합 유형 인덱싱 {#indexing-complex-types}

{{< img src="containers/explorer/crd_groupby_1.png" alt="인덱싱 구성: 'Group by' 드롭다운에 no field, containerResource.container, containerResource.name, containerResource.value.type 등의 옵션이 표시된 targets object[] 배열" style="width:100%;" >}}

객체 배열에는 다음 두 가지 그룹화 전략을 사용할 수 있습니다.

-   `No field`: 객체의 중첩된 필드는 중첩된 필드 이름을 기준으로만 인덱싱됩니다.
-   **Field**(예시: `type`, `status` 등): 객체의 중첩된 필드는 각 고유 필드 값을 기준으로 인덱싱됩니다.

##### 예시: DatadogPodAutoscaler 사용자 지정 리소스 필터링 {#example-filtering-on-datadogpodautoscaler-custom-resources}

다음 두 사용자 지정 리소스를 살펴보겠습니다.

**사용자 지정 리소스 1(CR1)**:

```yaml
status:
    conditions:
        - type: HorizontalAbleToScale
          status: 'True'
        - type: VerticalAbleToApply
          status: 'False'
```

**사용자 지정 리소스 2(CR2)**:

```yaml
status:
    conditions:
        - type: VerticalAbleToApply
          status: 'True'
        - type: HorizontalAbleToScale
          status: 'False'
```

두 가지 인덱싱 전략에 따라 `status.conditions`에서 다음과 같이 필터링할 수 있습니다.

{{< tabs >}}
{{% tab "필드 기준 없이 그룹화" %}}

**CR1의 인덱싱된 필드:**

```yaml
status:
    conditions:
        type: [HorizontalAbleToScale, VerticalAbleToApply]
        status: ['True', 'False']
```

**CR2의 인덱싱된 필드:**

```yaml
status:
    conditions:
        type: [VerticalAbleToApply, HorizontalAbleToScale]
        status: ['True', 'False']
```

**쿼리 예시:**

**쿼리 1:**

```text
field#status.conditions.status:"False"
```

**결과:** CR1과 CR2를 반환합니다. 두 CR 모두 `status:"False"`를 가진 객체가 하나 이상 있습니다.

**쿼리 2:**

```text
field#status.conditions.status:"False" AND field#status.conditions.type:VerticalAbleToApply
```

**결과:** CR1과 CR2를 반환합니다. 각 사용자 지정 리소스에는 필터 중 하나 이상과 일치하는 `status.condition` 객체가 최소 하나 있으며, 두 필터에 각각 일치하는 객체가 서로 달라도 됩니다.

{{% /tab %}}
{{% tab "유형별 그룹화" %}}

**CR1의 인덱싱된 필드:**

```yaml
status:
    conditions:
        - HorizontalAbleToScale:
              status: 'True'
        - VerticalAbleToApply:
              status: 'False'
```

**CR2의 인덱싱된 필드:**

```yaml
status:
    conditions:
        - VerticalAbleToApply:
              status: 'True'
        - HorizontalAbleToScale:
              status: 'False'
```

**예시 쿼리:**

```text
field#status.conditions.HorizontalAbleToScale.status:"False"
```

**결과:** CR2를 반환합니다. `type:"HorizontalAbleToScale"` 및 `status:"False"` 조건을 충족하는 `status.condition` 객체만 반환됩니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">리소스당 최대 50개의 필드를 선택할 수 있습니다. 미리 보기를 사용하여 선택한 인덱싱 필드가 올바른지 검증할 수 있습니다.</div>

### Kubernetes State Core 검사를 통한 사용자 지정 리소스 메트릭 수집 {#collect-custom-resource-metrics-using-kubernetes-state-core-check}

<div class="alert alert-info">이 기능에는 Cluster Agent 7.63.0 이상이 필요합니다.</div>

Datadog Cluster Agent를 실행할 때 `kubernetes_state_core` 검사를 사용하여 사용자 지정 리소스 메트릭을 수집할 수 있습니다.

1. 다음 형식에 따라 사용자 지정 리소스의 정의와 메트릭으로 변환할 필드를 작성합니다.
   ```yaml
   #=(...)
   collectCrMetrics:
     - groupVersionKind:
         group: "crd.k8s.amazonaws.com"
         kind: "ENIConfig"
         version: "v1alpha1"
       commonLabels:
         crd_type: "eniconfig"
       labelsFromPath:
         crd_name: [metadata, name]
       metricNamePrefix: "userPrefix"
       metrics:
         - name: "eniconfig"
           help: "ENI Config"
           each:
             type: gauge
             gauge:
               path: [metadata, generation]
     - groupVersionKind:
         group: "vpcresources.k8s.aws"
         kind: "CNINode"
         version: "v1alpha1"
         resource: "cninode-pluralized"
       commonLabels:
         crd_type: "cninode"
       labelsFromPath:
         crd_name: [metadata, name]
       metrics:
         - name: "cninode"
           help: "CNI Node"
           each:
             type: gauge
             gauge:
               path: [metadata, generation]
   ```

   기본적으로 RBAC 및 API 리소스 이름은 groupVersionKind의 kind를 소문자로 변환하고 접미사 's'를 추가하여 생성됩니다(예: Kind: ENIConfig → eniconfigs). Custom Resource Definition(CRD)이 다른 복수형을 사용하는 경우, resource 필드를 지정하여 기본 동작을 재정의할 수 있습니다. 위 예시에서 CNINode는 resource: "cninode-pluralized"를 설정하여 기본값을 재정의합니다.

   메트릭 이름은 다음 규칙에 따라 생성됩니다.
   - 접두사 없음: `kubernetes_state_customresource.<metrics.name>`
   - 접두사: `kubernetes_state_customresource.<metricNamePrefix>_<metric.name>`

   자세한 내용은 [Custom Resource State Metrics][5]를 참조하세요.

2. Helm 또는 Datadog Operator 구성을 업데이트합니다.

   {{< tabs >}}
   {{% tab "Helm 차트" %}}

   1. `datadog-values.yaml`에 다음 구성을 추가합니다.

      ```yaml
      datadog:
        #(...)
        kubeStateMetricsCore:
          collectCrMetrics:
            - <CUSTOM_RESOURCE_METRIC>
      ```

       Replace `<CUSTOM_RESOURCE_METRIC>` with the definitions you wrote in the first step.

   1. Helm 차트를 업그레이드합니다.

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   <div class="alert alert-info">
      이 기능을 사용하려면 Agent Operator v1.20 이상이 필요합니다.
   </div>

   1. Datadog Agent에 사용자 지정 리소스 수집 권한을 부여하는 옵션을 사용하여 Datadog Operator를 설치합니다.

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. `DatadogAgent` 매니페스트인 `datadog-agent.yaml`에 다음 구성을 추가합니다.

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          kubeStateMetricsCore:
            collectCrMetrics:
              - <CUSTOM_RESOURCE_METRIC>
      ```

      Replace `<CUSTOM_RESOURCE_METRIC>` with the definitions you wrote in the first step.

   1. 새 구성을 적용합니다.

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /ko/infrastructure/containers
[3]: https://app.datadoghq.com/orchestration/explorer/pod
[4]: https://app.datadoghq.com/orchestration/explorer/crd
[5]: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md