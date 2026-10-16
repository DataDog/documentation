---
aliases:
- /ja/infrastructure/livecontainers/configuration
- /ja/infrastructure/containers/configuration
further_reading:
- link: /infrastructure/hostmap/
  tag: ドキュメント
  text: インフラストラクチャーマップですべてのホスト/コンテナを確認する
- link: /infrastructure/process/
  tag: ドキュメント
  text: システムのあらゆるレベルの事象の把握する
title: Kubernetes エクスプローラーを構成する
---
このページでは、Datadog の [[Containers][1]] ページの構成オプションを表示します。[Containers] ページとその機能の詳細については、[Containers View][2] のドキュメントをご覧ください。

## Kubernetes エクスプローラーを構成する{#configure-kubernetes-explorer}

### リソース収集の互換性マトリックス{#resource-collection-compatibility-matrix}

次の表は、収集されたリソースと、それぞれに対する Agent、Cluster Agent、Helm チャートの最小バージョンのリストです。

| リソース | 最小 Agent バージョン | 最小 Cluster Agent バージョン* | 最小 Helmチャートバージョン | 最小 Kubernetes バージョン |
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
| Network Policies | 7.33.0 | 7.56.0 | 3.57.2 | 1.14.0 |
| Nodes | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| PersistentVolumeClaims | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| PersistentVolumes | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Pods | 7.33.0 | 1.18.0 | 3.9.0 | 1.17.0 |
| ReplicaSets | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| RoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ServiceAccounts | 7.33.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| Services | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| StatefulSets | 7.33.0 | 1.15.0 | 2.20.1 | 1.16.0 |
| VerticalPodAutoscalers | 7.33.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**注**: バージョン 1.22 より後の場合、Cluster Agent のバージョン番号は Agent のリリース番号に従い、バージョン 7.39.0 から始まります。

### リソースにカスタムタグを追加する {#add-custom-tags-to-resources}

カスタムタグを Kubernetes リソースに追加すると、Kubernetes リソースビュー内のフィルタリングが容易になります。

追加のタグは `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を通じて追加されます。

**注**: これらのタグは、Kubernetes リソースビューにのみ表示されます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`agents.containers.processAgent.env` および `clusterAgent.env` を `datadog-agent.yaml` で設定して、Process Agent と Cluster Agent の両方に環境変数を追加してください。

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

それから、新しい構成を適用します。

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

[公式の Helm チャート][1]を使用している場合、[values.yaml][2] で `agents.containers.processAgent.env` および `clusterAgent.env` を設定して、Process Agent と Cluster Agent の両方に環境変数を追加してください。

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

それから、Helm チャートをアップグレードします。

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

Process Agent と Cluster Agent の両コンテナに環境変数を設定します。

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### カスタムリソースを収集する{#collect-custom-resources}

[Kubernetes エクスプローラー][3]は、デフォルトで Custom Resource Definitions (CRD) を自動的に収集します。

#### 自動カスタムリソース収集の互換性マトリックス{#automatic-custom-resource-collection-compatibility-matrix}

以下の CRD がクラスター内に存在する場合、Agent はそのカスタムリソース (CR) を自動的に収集します。使用している CRD がここにリストされて**いない**場合、または Agent のバージョンが古い場合は、以下の**手動構成**の手順に従ってください。

| CRD グループ                   | CRD 種別                            | CRD バージョン       | 最小 Agent バージョン |
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


#### 手動構成{#manual-configuration}

その他の CRD については、以下の手順に従い、これらの CRD が定義するカスタムリソースを収集してください。

1. Datadog で [Kubernetes エクスプローラー][3]を開きます。左側のパネルの [**Select Resources**] で、[**[Kubernetes] > [Custom Resources] > [Resource Definitions]**][4] を選択します。

1. エクスプローラーで可視化するカスタムリソースを定義する CRD を見つけます。[**Versions**] 列で、インデックス作成を構成する `version` タグをクリックします。

   {{< img src="infrastructure/containers_view/CRD_indexing_access_1.mp4" alt="[Custom Resources] ドロップダウンが展開され、[Resource Definitions] が選択されている Kubernetes エクスプローラーの動画。カーソルがテーブルの行の 1 つに移動し、[Versions] 列にあるバージョンの 1 つをクリックします。カーソルが「v1alpha1」を選択します。モーダルが表示されます。" video="true">}}

   モーダルが表示されます。
   {{< img src="infrastructure/containers_view/indexing_modal_1.png" alt="[Collecting and Indexing] モーダル。2 つのセクションがあります。Agent 構成を更新するためのコピー可能なスニペットを含む [Set up Datadog Agent] セクションと、インデックスを作成するフィールドのチェックボックスとプレビューを含む [Select indexed fields for filtering/sorting] セクションです。">}}

1. モーダルの [**Set up Datadog Agent**] セクションの指示に従い、カスタムリソースを収集していないクラスターの Agent 構成を更新します。このモーダルには、Agent がカスタムリソースを収集するように構成されていないか、クラスター内にカスタムリソースが存在しないために、該当するすべてのクラスターが一覧表示されます。Agent が構成されており、カスタムリソースが存在しない場合、操作は不要です。

   {{< tabs >}}
   {{% tab "Helm チャート" %}}

   1. `datadog-values.yaml` に次の構成を追加します。

      ```yaml
      datadog:
        #(...)
        orchestratorExplorer:
          customResources:
            - <CUSTOM_RESOURCE_NAME>
      ```

   1. Helmチャートをアップグレードします。

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   1. Datadog Agent にカスタムリソースを収集する権限を付与するオプションを指定して、Datadog Operator をインストールします。

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. `DatadogAgent` マニフェスト `datadog-agent.yaml` に次の構成を追加します。

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

   1. 新しい構成を適用します。

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

   各 `<CUSTOM_RESOURCE_NAME>` は `group/version/kind` の形式であることが必要です。

1. モーダルの [**Select indexed fields for filtering/sorting**] で、カスタムリソースからフィルタリングおよび並べ替えのためにインデックスを作成するフィールドを選択します。一部の CRD については、Datadog がデフォルトの構成を提供しています。必要に応じて、追加のフィールドを選択できます。

    <div class="alert alert-info">Datadog Agent のセットアップ後、利用可能なカスタムリソースが自動的に収集されます。フィールドのインデックス作成はオプションです。</div>


    {{< img src="infrastructure/containers_view/CRD_indexing_modal_1.mp4" alt="[Collecting and Indexing] モーダルの動画。カーソルが 3 つのフィールドを選択し、[Update Fields] をクリックします。成功メッセージが表示されます。" video="true">}}

    For arrays of objects, see the [Indexing complex types](#indexing-complex-types) section.

1.  [**Update Fields**] を選択して保存してください。

フィールドのインデックスが作成されると、エクスプローラーで列として追加して並べ替えたり、Saved Views に含めたりできるようになります。プレフィックス `field#` を使用して、インデックス付きフィールドでフィルタリングすることもできます。

### 複雑な型のインデックス作成 {#indexing-complex-types}

{{< img src="containers/explorer/crd_groupby_1.png" alt="インデックス作成の構成: targets object[] 配列。「Group by」ドロップダウンオプションには、no field、containerResource.container、containerResource.name、containerResource.value.type などがあります。" style="width:100%;" >}}

オブジェクトの配列については、2 つのグループ化戦略が利用可能です。

-   `No field`: オブジェクトのネストされたフィールドは、ネストされたフィールド名のみに基づいてインデックスが作成されます。
-   **フィールド** (たとえば、`type`、`status` など): オブジェクトのネストされたフィールドは、各固有のフィールド値に基づいてインデックスが作成されます。

##### 例: DatadogPodAutoscaler カスタムリソースのフィルタリング{#example-filtering-on-datadogpodautoscaler-custom-resources}

これら 2 つのカスタムリソースを検討してください。

**カスタムリソース 1 (CR1)**:

```yaml
status:
    conditions:
        - type: HorizontalAbleToScale
          status: 'True'
        - type: VerticalAbleToApply
          status: 'False'
```

**カスタムリソース 2 (CR2)**:

```yaml
status:
    conditions:
        - type: VerticalAbleToApply
          status: 'True'
        - type: HorizontalAbleToScale
          status: 'False'
```

`status.conditions` では、2 つのインデックス作成戦略に基づいて、以下のフィルタリングが可能です。

{{< tabs >}}
{{% tab "フィールドなしでグループ化" %}}

**CR1 のインデックス付きフィールド:**

```yaml
status:
    conditions:
        type: [HorizontalAbleToScale, VerticalAbleToApply]
        status: ['True', 'False']
```

**CR2 のインデックス付きフィールド:**

```yaml
status:
    conditions:
        type: [VerticalAbleToApply, HorizontalAbleToScale]
        status: ['True', 'False']
```

**クエリの例:**

**クエリ 1:**

```text
field#status.conditions.status:"False"
```

**結果:** CR1 と CR2 を返します。両方の CR には、`status:"False"` のオブジェクトが少なくとも 1 つ存在します。

**クエリ 2:**

```text
field#status.conditions.status:"False" AND field#status.conditions.type:VerticalAbleToApply
```

**結果:** CR1とCR2を返します。各カスタムリソース内の少なくとも 1 つの `status.condition` オブジェクトが、いずれかのフィルターに一致します (両方のフィルターに一致するオブジェクトが同じである必要はありません)。

{{% /tab %}}
{{% tab "タイプによるグループ化" %}}

**CR1 のインデックス付きフィールド:**

```yaml
status:
    conditions:
        - HorizontalAbleToScale:
              status: 'True'
        - VerticalAbleToApply:
              status: 'False'
```

**CR2 のインデックス付きフィールド:**

```yaml
status:
    conditions:
        - VerticalAbleToApply:
              status: 'True'
        - HorizontalAbleToScale:
              status: 'False'
```

**クエリの例:**

```text
field#status.conditions.HorizontalAbleToScale.status:"False"
```

**結果:** CR2 を返します。`type:"HorizontalAbleToScale"` と `status:"False"` である `status.condition` オブジェクトのみが返されます。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">リソースごとに最大 50 個のフィールドを選択できます。プレビューを使用して、インデックス作成の選択を検証できます。</div>

### Kubernetes State Core チェックを使用してカスタムリソースメトリクスを収集する{#collect-custom-resource-metrics-using-kubernetes-state-core-check}

<div class="alert alert-info">この機能には Cluster Agent 7.63.0 以降が必要です。</div>

Datadog Cluster Agent を実行している場合、`kubernetes_state_core` チェックを使用してカスタムリソースメトリクスを収集できます。

1. カスタムリソースの定義とメトリクスに変換するフィールドを、次の形式に従って記述します。
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

   デフォルトでは、RBAC および API リソース名は、groupVersionKind の kind を小文字に変換し、「s」サフィックスを追加することにより派生されます (たとえば、Kind: ENIConfig → eniconfigs)。Custom Resource Definition (CRD) が異なる複数形を使用している場合は、リソースフィールドを指定することでこの動作を上書きできます。上記の例では、CNINode は「resource: \"cninode-pluralized\"」を設定することでデフォルトを上書きしています。

   メトリクス名は、次のルールを使用して生成されます。
   - プレフィックスなし: `kubernetes_state_customresource.<metrics.name>`
   - プレフィックス: `kubernetes_state_customresource.<metricNamePrefix>_<metric.name>`

   詳細については、「[Custom Resource State Metrics][5]」を参照してください。

2. Helm または Datadog Operator の構成を更新します。

   {{< tabs >}}
   {{% tab "Helm チャート" %}}

   1. `datadog-values.yaml` に次の構成を追加します。

      ```yaml
      datadog:
        #(...)
        kubeStateMetricsCore:
          collectCrMetrics:
            - <CUSTOM_RESOURCE_METRIC>
      ```

       Replace `<CUSTOM_RESOURCE_METRIC>` with the definitions you wrote in the first step.

   1. Helmチャートをアップグレードします。

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   <div class="alert alert-info">
      この機能には Agent Operator v1.20 以降が必要です。
   </div>

   1. Datadog Agent にカスタムリソースを収集する権限を付与するオプションを指定して、Datadog Operator をインストールします。

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. `DatadogAgent` マニフェスト `datadog-agent.yaml` に次の構成を追加します。

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

   1. 新しい構成を適用します。

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /ja/infrastructure/containers
[3]: https://app.datadoghq.com/orchestration/explorer/pod
[4]: https://app.datadoghq.com/orchestration/explorer/crd
[5]: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md