---
aliases:
- /ja/agent/autodiscovery/tag/
- /ja/agent/kubernetes/tag
description: Kubernetes の Pod のラベルおよびアノテーションから自動でタグを抽出するよう構成し、モニタリングを強化
further_reading:
- link: /getting_started/tagging/
  tag: よくあるご質問
  text: タグの概要
- link: /getting_started/tagging/using_tags/
  tag: よくあるご質問
  text: Datadog によるタグの使用方法
- link: /agent/guide/autodiscovery-management/
  tag: よくあるご質問
  text: データ収集をコンテナのサブセットのみに制限
title: Kubernetes タグ抽出
---
Datadogエージェントは、Pod (または Pod 内の個々のコンテナ) から発生するメトリクス、トレース、ログに対して、ラベルやアノテーションに基づいて自動的にタグを割り当てることができます。

## すぐに使えるタグ {#out-of-the-box-tags}

自動的に割り当てられるタグのリストは、エージェントの[カーディナリティ設定][1]に依存します。[タグのカーディナリティ][4] は、取り込み前に追加され、カーディナリティ設定によって出力されるメトリクスの数が変わるため、課金に影響を与えることがあります。

<div style="overflow-x: auto;">

  | タグ                           | カーディナリティ  | ソース                                                                                                                        | 要件                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | 高         | Pod のステータス                                                                                                                    | 該当なし                                                 |
  | `display_container_name`      | 高         | Pod のステータス                                                                                                                    | 該当なし                                                 |
  | `pod_name`                    | オーケストレーター | Pod のメタデータ                                                                                                                  | 該当なし                                                 |
  | `oshift_deployment`           | オーケストレーター | Pod のアノテーション `openshift.io/deployment.name`                                                                                 | OpenShift 環境と Pod のアノテーションが存在する必要があります |
  | `kube_ownerref_name`          | オーケストレーター | Pod のオーナー参照                                                                                                                  | Pod にはオーナーが必要です                              |
  | `kube_job`                    | オーケストレーター | Pod のオーナー参照                                                                                                                  | Pod は CronJob に関連付けられている必要があります                   |
  | `kube_job`                    | 低          | Pod のオーナー参照                                                                                                                  | Pod はジョブに関連付けられている必要があります                       |
  | `kube_replica_set`            | 低          | Pod のオーナー参照                                                                                                                  | Pod はレプリカセットに関連付けられている必要があります               |
  | `kube_service`                | 低          | Kubernetes サービスの発見                                                                                                  | Pod は Kubernetes サービスの背後にあります                  |
  | `kube_daemon_set`             | 低          | Pod のオーナー参照                                                                                                                  | Pod は DaemonSet に関連付けられている必要があります                 |
  | `kube_container_name`         | 低          | Pod のステータス                                                                                                                    | 該当なし                                                 |
  | `kube_namespace`              | 低          | Pod のメタデータ                                                                                                                  | 該当なし                                                 |
  | `kube_app_name`               | 低          | Pod のラベル `app.kubernetes.io/name`                                                                                            | Pod のラベルが存在する必要があります                                |
  | `kube_app_instance`           | 低          | Pod のラベル `app.kubernetes.io/instance`                                                                                        | Pod のラベルが存在する必要があります                                |
  | `kube_app_version`            | 低          | Pod のラベル `app.kubernetes.io/version`                                                                                         | Pod のラベルが存在する必要があります                                |
  | `kube_app_component`          | 低          | Pod のラベル `app.kubernetes.io/component`                                                                                       | Pod のラベルが存在する必要があります                                |
  | `kube_app_part_of`            | 低          | Pod のラベル `app.kubernetes.io/part-of`                                                                                         | Pod のラベルが存在する必要があります                                |
  | `kube_app_managed_by`         | 低          | Pod のラベル `app.kubernetes.io/managed-by`                                                                                      | Pod のラベルが存在する必要があります                                |
  | `env`                         | 低          | Pod ラベル `tags.datadoghq.com/env` またはコンテナ環境変数 (`DD_ENV` または `OTEL_RESOURCE_ATTRIBUTES`)                               | [unified service tagging][2]が有効                |
  | `version`                     | 低          | Pod ラベル `tags.datadoghq.com/version` またはコンテナ環境変数 (`DD_VERSION` または `OTEL_RESOURCE_ATTRIBUTES`)                       | [unified service tagging][2]が有効                |
  | `service`                     | 低          | Pod ラベル `tags.datadoghq.com/service` またはコンテナ環境変数 (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES`, または `OTEL_SERVICE_NAME`) | [unified service tagging][2]が有効                |
  | `pod_phase`                   | 低          | Pod ステータス                                                                                                                    | 該当なし                                                 |
  | `oshift_deployment_config`    | 低          | Pod のアノテーション `openshift.io/deployment-config.name`                                                                          | OpenShift 環境および Pod のアノテーションが存在する必要があります |
  | `kube_ownerref_kind`          | 低          | Pod オーナー参照                                                                                                                  | Pod はオーナーを持っている必要があります                              |
  | `kube_deployment`             | 低          | Pod オーナー参照                                                                                                                  | Pod はデプロイメントに関連付けられている必要があります                |
  | `kube_argo_rollout`           | 低          | Pod オーナー参照                                                                                                                  | Pod は Argo ロールアウトに関連付けられている必要があります             |
  | `kube_replication_controller` | 低          | Pod オーナー参照                                                                                                                  | Pod はレプリケーションコントローラーに関連付けられている必要があります    |
  | `kube_stateful_set`           | 低          | Pod オーナー参照                                                                                                                  | Pod はステートフルセットに関連付けられている必要があります               |
  | `persistentvolumeclaim`       | 低          | Pod 仕様                                                                                                                      | PVC はポッドにアタッチされている必要があります                   |
  | `kube_cronjob`                | 低          | Pod オーナー参照                                                                                                                  | Pod は CronJob に関連付けられている必要があります                   |
  | `image_name`                  | 低          | Pod 仕様                                                                                                                      | 該当なし                                                 |
  | `short_image`                 | 低          | Pod 仕様                                                                                                                      | 該当なし                                                 |
  | `image_tag`                   | 低          | Pod 仕様                                                                                                                      | 該当なし                                                 |
  | `eks_fargate_node`            | 低          | Pod 仕様                                                                                                                      | EKS Fargate 環境                             |
  | `kube_runtime_class`          | 低          | Pod 仕様                                                                                                                      | Pod はランタイムクラスに関連付けられている必要があります             |
  | `gpu_vendor`                  | 低          | Pod 仕様                                                                                                                      | コンテナは GPU リソースにアタッチされている必要があります        |
  | `image_id`                    | 低          | コンテナイメージ ID                                                                                                            | 該当なし                                                 |
  | `kube_autoscaler_kind`        | 低          | Kubernetes オートスケーラータイプ                                                                                                    | Kubernetes オートスケーラーを使用する必要があります                  |
  | `kube_priority_class`         | 低          | Pod 優先クラス                                                                                                            | Pod には優先クラスが設定されている必要があります                    |
  | `kube_qos`                    | 低          | Pod のサービス品質クラス                                                                                                  | 該当なし                                                 |

</div>


### ホストタグ {#host-tag}

Agent は Kubernetes 環境情報を "host tags" としてアタッチできます。

<div style="overflow-x: auto;">

  | タグ                 | カーディナリティ | ソース                                                 | 要件                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | 低         | `DD_CLUSTER_NAME` 環境変数またはクラウドプロバイダー統合 | `DD_CLUSTER_NAME` 環境変数またはクラウドプロバイダー統合が有効 |
  | `kube_node_role`    | 低         | ノードラベル `node-role.kubernetes.io/<role>`            | ノードラベルは存在する必要があります                                          |
  | `kube_node`         | 低         | `NodeName`Pod の仕様内のフィールド             |                                                              |
  | `orch_cluster_id`   | 低         | オーケストレーター クラスターのメタデータ                          |  オーケストレーター環境                                    |
  | `kube_distribution` | 低         | ノードラベルと NodeSystemInfo                         |  |
</div>

## タグ Autodiscovery {#tag-autodiscovery}

Agent v6.10 以降、Agent は Pod のアノテーションからタグを自動発見できます。これにより、Agent はこの Pod 内のすべてのデータまたは個々のコンテナから発行されたデータにタグを関連付けることができます。

コンテナ化された環境におけるベストプラクティスとして、Datadog はタグを統一するために unified service tagging の使用を推奨しています。unified service taggingは、3 つの標準タグ `env`, `service`, `version` を使用して Datadog テレメトリを結び付けます。unified service tagging で環境を構成する方法については、専用 の[unified service tagging][2] ドキュメントを参照してください。

特定の Pod から発行され、Agent によって収集されたすべてのデータに `<TAG_KEY>:<TAG_VALUE>` タグを適用するには、Pod で次のアノテーションを使用します:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Pod 内の個々のコンテナ `<TAG_KEY>:<TAG_VALUE>` に `<CONTAINER_NAME>` タグを適用する場合は、Pod で次のアノテーションを使用します:

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Agent v7.17 以降、Agent は Docker ラベルからタグを自動検出できます。このプロセスにより、Agent の設定を変更することなく、コンテナから発信されるすべてのデータにカスタムタグを関連付けることができます。

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

Agent v7.77 以降、タグアノテーションは、ランタイムメタデータに基づく動的タグ付けのための [Autodiscovery テンプレート変数][5] をサポートします。`%%env_<VAR>%%` を除いて、すべてのテンプレート変数がサポートされています。

```yaml
annotations:
  ad.datadoghq.com/tags: '{"pod_ip":"%%host%%","pod_name":"%%kube_pod_name%%","namespace":"%%kube_namespace%%"}'
  ad.datadoghq.com/nginx.tags: '{"container_port":"%%port_80%%"}'
```

## タグの抽出 {#tag-extraction}

バージョン 7.64 以降、Agent と Cluster Agent は、Kubernetes リソースからラベルとアノテーションを収集し、共通の設定からタグとして使用するように構成できます。Agent のコアタグ付け、Cluster Agent の KSM レポート、および両エージェントの Orchestrator Explorer のレポート全体で一貫した報告を確保するために、Datadog では、次のオプションを使用することを推奨します。
- `kubernetesResourcesLabelsAsTags`
- `kubernetesResourcesAnnotationsAsTags`

これらのオプションは、従来の Agent オプション `podLabelsAsTags`, `nodeLabelsAsTags`, `namespaceLabelsAsTags` および任意の KSM 設定オーバーライドの代わりに使用する必要があります。

これらの構成は、メタデータを抽出するオブジェクトのリソースタイプを参照します。各リソースタイプは、`resourceType.apiGroup` 形式で指定する必要があります。ここで `resourceType` はリソースの複数形の名前です。空の API グループのリソース (例: Pod やノード) は、`resourceType` 名のみを使用して指定できます。

例えば、次のコマンド `kubectl api-resources` を実行してこの情報を取得します:

| 名前        | API バージョン                  | Datadog リソース構成  |
|-------------|------------------------------|---------------------------------|
| pods        | v1                           | pods                            |
| nodes       | v1                           | nodes                           |
| namespaces  | v1                           | namespaces                      |
| deployments | apps/v1                      | deployments.apps                |
| roles       | rbac.authorization.k8s.io/v1 | roles.rbac.authorization.k8s.io |

**注:**

- タグ *は*ワークロードと子リソース間でカスケードしません。たとえば、デプロイメントのラベルは、その子 Pod のログに自動的に適用されるわけではありません。Pod データにタグを付与するには、Pod でラベル抽出を直接設定してください。
- タグは*ネームスペースからPodおよびその内部のコンテナに*カスケードします。
- KSMメトリクスのタグ抽出ルールでワイルドカードを使用するには、Datadog Agent 7.73以上を使用してください。

### Kubernetesリソースのラベルをタグとして {#kubernetes-resources-labels-as-tags}

このオプションは、Kubernetes リソースの特定のラベルを抽出し、それを Datadog タグとして送信するために使用します。

{{< tabs >}}

{{% tab "Datadog Operator" %}}

特定のリソースラベル `<LABEL>` を抽出し、Datadog内でタグキー `<TAG_KEY>` に変換するには、オペレーターの `DatadogAgent` 設定ファイルの `datadog-agent.yaml` に次の構成を追加してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      <RESOURCE>:
        <LABEL>: <TAG_KEY>
```

たとえば、ノード、Pod、およびデプロイメントからリソースラベルを抽出するには以下を使用します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Helm" %}}

特定のリソースラベル `<LABEL>` を抽出し、Datadog内でタグキー `<TAG_KEY>` に変換するには、Helmの `datadog-values.yaml` ファイルに次の構成を追加してください。

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    <RESOURCE>:
      <LABEL>: <TAG_KEY>
```

たとえば、ノード、Pod、およびデプロイメントからリソースラベルを抽出するには以下を使用します。

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}

特定のリソースラベル `<LABEL>` を抽出し、Datadog内でタグキー `<TAG_KEY>` に変換するには、**Agent と Cluster Agent の両方** のコンテナに次の環境変数を追加してください。

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"<RESOURCE>":{"<LABEL>":"<TAG_KEY>"}}'
```

たとえば、ノード、Pod、およびデプロイメントからリソースラベルを抽出するには以下を使用します。

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Agent 7.73.0 以上では、すべてのリソースラベルをメトリクスのタグとして追加するために、次の設定を使用します。この例では、タグ名は `<PREFIX>_` で接頭辞が付けられています。

```yaml
    #(...)
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

**注**: カスタムメトリクスによって課金が影響を受ける場合があります。詳細については、[カスタムメトリクスの課金ページ][3] を参照してください。

#### 従来の設定との統合 {#merging-with-legacy-configurations}

<div class="alert alert-info">

この設定オプションは、<a href="/containers/kubernetes/tag/#pod-labels-as-tags">podLabelsAsTags</a>、<a href="/containers/kubernetes/tag/#namespace-labels-as-tags">namespaceLabelsAsTags</a>、および<a href="/containers/kubernetes/tag/#node-labels-as-tags">nodeLabelsAsTags</a>に設定された他の設定と統合されます。競合が発生した場合、<a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">`kubernetesResourcesLabelsAsTags`</a>は統合時に優先されます。

たとえば、次のような設定がある場合

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      label-1: tag-a
      label-2: tag-b

  podLabelsAsTags:
    label-2: legacy-tag-c
    label-3: legacy-tag-d
```

Pod ラベルからタグを抽出するために以下のマッピングが使用されます。

```yaml
label-1: tag-a
label-2: tag-b
label-3: legacy-tag-d
```

</div>

### Kubernetesリソースのアノテーションをタグとして {#kubernetes-resources-annotations-as-tags}

このオプションは、Kubernetes リソースから指定されたアノテーションを抽出し、Datadog タグとして送信します。

{{< tabs >}}

{{% tab "Datadog Operator" %}}

特定のリソースアノテーション `<ANNOTATION>` を抽出し、Datadog内でタグキー `<TAG_KEY>` に変換するには、オペレーターの `DatadogAgent` 設定ファイルの `datadog-agent.yaml` に次の構成を追加してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      <RESOURCE>:
        <ANNOTATION>: <TAG_KEY>
```

たとえば、ノード、Pod、およびデプロイメントからリソースアノテーションを抽出するには以下を使用します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Helm" %}}

特定のリソースアノテーション `<ANNOTATION>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` に変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加してください。

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    <RESOURCE>:
      <ANNOTATION>: <TAG_KEY>
```

たとえば、ノード、Pod、およびデプロイメントからリソースアノテーションを抽出するには以下を使用します。

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}

特定のリソースアノテーション `<ANNOTATION>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` に変換するには、Agent と Cluster Agent の**両方**のコンテナに次の環境変数を追加してください。

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"<RESOURCE>":{"<ANNOTATION>":"<TAG_KEY>"}}'
```

たとえば、ノード、Pod、およびデプロイメントからリソースアノテーションを抽出するには以下を使用します。

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Agent 7.73.0 以降では、次の構成を使用して、すべてのリソースアノテーションをメトリクスのタグとして追加します。この例では、タグ名は `<PREFIX>_` で接頭辞が付けられています。

```yaml
    #(...)
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

**注**: カスタムメトリクスによって課金が影響を受ける場合があります。詳細については、[カスタムメトリクスの課金ページ][3] を参照してください。

<div class="alert alert-info">

この構成オプションは、<a href="/containers/kubernetes/tag/#pod-annotations-as-tags">podAnnotationsAsTags</a> に設定された他の構成と統合されます。競合が発生した場合、<a href="/containers/kubernetes/tag/#kubernetes-resources-annotations-as-tags">`kubernetesResourcesAnnotationsAsTags`</a>は統合時に優先されます。

たとえば、次のような設定がある場合

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      annotation-1: tag-a
      annotation-2: tag-b

  podAnnotationsAsTags:
    annotation-2: legacy-tag-c
    annotation-3: legacy-tag-d
```

Pod アノテーションからタグを抽出するために次のマッピングが使用されます。

```yaml
annotation-1: tag-a
annotation-2: tag-b
annotation-3: legacy-tag-d
```

</div>


{{% collapse-content title="レガシー構成" level="h4" expanded=false id="legacy-configuration" %}}
#### ノードラベルをタグとして {#node-labels-as-tags}

<div class="alert alert-info">

Agent バージョン 7.58.0 以降を使用している場合、ノードのラベルをタグとして構成するために <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetesリソースのラベルをタグとして使用</a>することをお勧めします。

</div>

Agent v6.0 以降、Agent は指定されたノードのラベルを収集し、Datadog のこの `host` に関連するすべてのメトリクス、トレース、ログにアタッチするタグとして使用できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたノードラベル `<NODE_LABEL>` を抽出し、Datadog内でタグキー `<TAG_KEY>` として変換するには、オペレーターの `DatadogAgent` 構成ファイルの `datadog-agent.yaml` に次の構成を追加してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      <NODE_LABEL>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      kubernetes.io/arch: arch
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのノードラベルをメトリクスのタグとして追加します。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Helm" %}}
指定されたノードラベル `<NODE_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加してください。

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのノードラベルをメトリクスのタグとして追加します。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}
指定されたノードラベル `<NODE_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加してください。

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのノードラベルをメトリクスのタグとして追加します。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}' # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}
{{< /tabs >}}

**注意**: カスタムメトリクスによって課金が影響を受ける場合があります。詳細については、[カスタムメトリクスの課金ページ][3] を参照してください。

#### Pod ラベルをタグとして {#pod-labels-as-tags}

<div class="alert alert-info">

Agent バージョン 7.58.0 以降を使用している場合、Pod ラベルをタグとして構成する際は、<a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetesリソースのラベル</a>を使用することをお勧めします。

</div>

Agent v6.0 以降、Agent は特定の Pod のラベルを収集し、この Pod が発行するすべてのメトリクス、トレース、ログにアタッチするタグとして使用できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定された Pod ラベル `<POD_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、オペレーターの `DatadogAgent` 構成に以下の構成を追加してください。`datadog-agent.yaml`

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      <POD_LABEL>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべての Pod ラベルをタグとしてメトリクスに追加してください。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Helm" %}}
指定された Pod ラベル `<POD_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加してください。

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべての Pod ラベルをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}
指定された Pod ラベル `<POD_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加してください。

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべての Pod ラベルをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**注意**: カスタムメトリクスによって課金が影響を受ける場合があります。詳細については、[カスタムメトリクスの課金ページ][3] を参照してください。

#### Pod アノテーションをタグとして {#pod-annotations-as-tags}

<div class="alert alert-info">

Agent バージョン 7.58.0 以降の場合、Pod アノテーションをタグとして構成する際は、<a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetesリソースのラベル</a>を使用することをお勧めします。

</div>

Agent v6.0 以降、Agent は特定の Pod のアノテーションを収集し、この Pod が発行するすべてのメトリクス、トレース、ログにアタッチするタグとして使用できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定された Pod アノテーション `<POD_ANNOTATION>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、オペレーターの `DatadogAgent` 構成に以下の構成を追加してください。`datadog-agent.yaml`

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      <POD_ANNOTATION>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべての Pod アノテーションをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
指定された Pod アノテーション `<POD_ANNOTATION>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加してください。

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_ANNOTATION>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべての Pod アノテーションをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}
指定された Pod アノテーション `<POD_ANNOTATION>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加してください。

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべての Pod アノテーションをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名は `<PREFIX>_` を接頭辞として付けられています。

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**注意**: カスタムメトリクスによって課金が影響を受ける場合があります。詳細については、[カスタムメトリクスの課金ページ][3] を参照してください。

#### ネームスペースラベルをタグとして {#namespace-labels-as-tags}

<div class="alert alert-info">

Agent バージョン 7.58.0 以降の場合、ネームスペースラベルをタグとして構成する際は、<a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Kubernetesリソースのラベル</a>を使用することをお勧めします。

</div>

Agent 7.55.0 以降、Agent は特定のネームスペースのラベルを収集し、このネームスペースのすべての Pod が発行するすべてのメトリクス、トレース、ログにアタッチするタグとして使用できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたネームスペースラベル `<NAMESPACE_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、オペレーターの `DatadogAgent` 構成に以下の構成を追加してください。`datadog-agent.yaml`

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      <NAMESPACE_LABEL>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのネームスペースラベルをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名には `<PREFIX>_` の接頭辞が付きます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
指定されたネームスペースラベル `<NAMESPACE_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加してください。

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

たとえば、次を設定できます。

```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのネームスペースラベルをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名には `<PREFIX>_` の接頭辞が付きます。

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}
指定されたネームスペースラベル `<NAMESPACE_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加してください。

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのネームスペースラベルをタグとしてメトリクスに追加します。ただし、KSM からのものは除きます (`kubernetes_state.*`)。この例では、タグ名には `<PREFIX>_` の接頭辞が付きます。

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**注意**: カスタムメトリクスによって課金が影響を受ける場合があります。詳細については、[カスタムメトリクスの課金ページ][3] を参照してください。
{{% /collapse-content %}}

### コンテナ環境変数をタグとして {#container-environment-variables-as-tags}

Agent v7.32 以降の Agent はコンテナ環境変数を収集し、コンテナに対応するすべてのメトリクス、トレース、ログにアタッチするタグとして使用できます。`docker` と `containerd` の両方のコンテナがサポートされています：

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定された環境変数 `<ENV_VAR>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
指定された環境変数 `<ENV_VAR>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加してください。

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}
指定された環境変数 `<ENV_VAR>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加してください。

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

たとえば、以下のとおりです。

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**注意**: カスタムメトリクスは課金に影響する場合があります。詳細については、[カスタムメトリクスの課金][3] を参照してください。

### コンテナラベルをタグとして {#container-labels-as-tags}

Agent v7.33 以降の Agent はコンテナラベルを収集し、タグとして使用することができます。Datadog Agent は、コンテナに関連付けられたすべてのメトリクス、トレース、ログにタグを付けます。

Datadog Agent は、`docker` と `containerd` の両方のコンテナに対してコンテナラベルからタグを生成することができます。`containerd` の場合、最小サポートバージョンは v1.5.6 です。以前のリリースではラベルが正しく伝播されません。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたコンテナラベル `<CONTAINER_LABEL>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
指定されたコンテナラベル `<CONTAINER_LABEL>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加してください。

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

たとえば、次を設定できます。

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "手動 (DaemonSet)" %}}
指定されたコンテナラベル `<CONTAINER_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加してください。

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

たとえば、以下のとおりです。

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**注意**: カスタムメトリクスは課金に影響する場合があります。詳細については、[カスタムメトリクスの課金][3] を参照してください。

##  参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/account_management/billing/custom_metrics
[4]: /ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[5]: /ja/containers/guide/template_variables/