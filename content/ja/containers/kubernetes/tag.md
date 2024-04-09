---
aliases:
- /ja/agent/autodiscovery/tag/
- /ja/agent/kubernetes/tag
further_reading:
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグの概要
- link: /getting_started/tagging/using_tags/
  tag: ドキュメント
  text: Datadog でタグを使用する
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
kind: documentation
title: Kubernetes タグ抽出
---

Agent は、タグを作成し、ラベルまたはアノテーションに基づいてポッドが発行するすべてのメトリクス、トレース、ログに割り当てることができます。

ホスト上で Agent をバイナリとして実行している場合は、[Agent](?tab=agent) タブの手順を使用してタグ抽出を構成します。Kubernetes クラスターで Agent をコンテナとして実行している場合は、[コンテナ化された Agent](?tab=containerizedagent) タブの手順でタグ抽出を構成します。

## すぐに使えるタグ

Agent は、タグを自動検出して、ポッド全体またはこのポッド内の個別のコンテナにより送信されたすべてのデータにアタッチします。自動的にアタッチされるタグのリストは、Agent の[カーディナリティコンフィギュレーション][1]に基づきます。

<div style="overflow-x: auto;">

  | タグ                           | 粒度  | ソース                                                                  | 要件                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | 高         | ポッドステータス                                                              | N/A                                                 |
  | `display_container_name`      | 高         | ポッドステータス                                                              | N/A                                                 |
  | `pod_name`                    | オーケストレーター | ポッドメタデータ                                                            | N/A                                                 |
  | `oshift_deployment`           | オーケストレーター | ポッドアノテーション `openshift.io/deployment.name`                           | OpenShift 環境およびポッドアノテーションが必要 |
  | `kube_ownerref_name`          | オーケストレーター | ポッド ownerref                                                            | ポッドにオーナーが必要                              |
  | `kube_job`                    | オーケストレーター | ポッド ownerref                                                            | ポッドはジョブにアタッチされていることが必要                       |
  | `kube_job`                    | 低 | ポッド ownerref
| ポッドは cronjob にアタッチされていることが必要                    |
  | `kube_replica_set`            | 低 | ポッド ownerref                                                            | ポッドはレプリカセットにアタッチされていることが必要               |
  | `kube_service`                | 低 | Kubernetes サービスディスカバリー                                            | ポッドは Kubernetes サービスの後方にあることが必要                  |
  | `kube_daemon_set`             | 低          | ポッド ownerref                                                            | ポッドは DaemonSet セットにアタッチされていることが必要                 |
  | `kube_container_name`         | 低          | ポッドステータス                                                              | N/A                                                 |
  | `kube_namespace`              | 低          | ポッドメタデータ                                                            | N/A                                                 |
  | `kube_app_name`               | 低          | ポッドラベル `app.kubernetes.io/name`                                      | ポッドラベルが必要                                |
  | `kube_app_instance`           | 低          | ポッドラベル `app.kubernetes.io/instance`                                  | ポッドラベルが必要                                |
  | `kube_app_version`            | 低          | ポッドラベル `app.kubernetes.io/version`                                   | ポッドラベルが必要                                |
  | `kube_app_component`          | 低          | ポッドラベル `app.kubernetes.io/component`                                 | ポッドラベルが必要                                |
  | `kube_app_part_of`            | 低          | ポッドラベル `app.kubernetes.io/part-of`                                   | ポッドラベルが必要                                |
  | `kube_app_managed_by`         | 低          | ポッドラベル `app.kubernetes.io/managed-by`                                | ポッドラベルが必要                                |
  | `env`                         | 低          | ポッドラベル `tags.datadoghq.com/env` またはコンテナ envvar `DD_ENV`         | [統合サービスタグ付け][2]有効                |
  | `version`                     | 低          | ポッドラベル `tags.datadoghq.com/version` or container envvar `DD_VERSION` | [統合サービスタグ付け][2]有効                |
  | `service`                     | 低          | ポッドラベル `tags.datadoghq.com/service` or container envvar `DD_SERVICE` | [統合サービスタグ付け][2]有効                |
  | `pod_phase`                   | 低          | ポッドステータス                                                              | N/A                                                 |
  | `oshift_deployment_config`    | 低          | ポッドアノテーション `openshift.io/deployment-config.name`                    | OpenShift 環境およびポッドアノテーションが必要 |
  | `kube_ownerref_kind`          | 低          | ポッド ownerref                                                            | ポッドにオーナーが必要                              |
  | `kube_deployment`             | 低          | ポッド ownerref                                                            | ポッドはデプロイにアタッチされていることが必要                |
  | `kube_replication_controller` | 低          | ポッド ownerref                                                            | ポッドはレプリケーションコントローラーにアタッチされていることが必要    |
  | `kube_stateful_set`           | 低          | ポッド ownerref                                                            | ポッドは statefulset にアタッチされていることが必要               |
  | `persistentvolumeclaim`       | 低          | ポッド仕様                                                                | PVC がポッドにアタッチされていることが必要                   |
  | `kube_cronjob`                | 低          | ポッド ownerref                                                            | ポッドは cronjob にアタッチされていることが必要                   |
  | `image_name`                  | 低          | ポッド仕様                                                                | N/A                                                 |
  | `short_image`                 | 低          | ポッド仕様                                                                | N/A                                                 |
  | `image_tag`                   | 低          | ポッド仕様                                                                | N/A                                                 |
  | `eks_fargate_node`        | 低         | ポッド仕様
| EKS Fargate 環境                          |
</div>


### ホストタグ

Agent は Kubernetes 環境情報を "host tags" としてアタッチできます。

<div style="overflow-x: auto;">

  | タグ                 | 粒度 | ソース                                                 | 要件                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | 低         | `DD_CLUSTER_NAME` envvar またはクラウドプロバイダーインテグレーション | `DD_CLUSTER_NAME` envvar またはクラウドプロバイダー有効 |
  | `kube_node_role`    | 低         | ノードラベル `node-role.kubernetes.io/<role>`            | ノードラベルが必要                                          |

</div>

## タグのオートディスカバリー

Agent v6.10 以降では、Agent はポッドアノテーションからタグを自動検出できます。これにより、Agent は、ポッド全体またはこのポッド内の個々のコンテナから発行されるすべてのデータにタグを関連付けることができます。

Datadog では、コンテナ化環境のベストプラクティスとして、統合サービスタグ付けを使用してタグを統合することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][2]ドキュメントをご参照ください。

`<タグキー>:<タグ値>` タグを特定のポッドから発行され、Agent によって収集されたすべてのデータに適用するには、ポッドで次のアノテーションを使用します。

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<タグキー>": "<タグ値>","<タグキー_1>": "<タグ値_1>"}'
```

ポッド内の個々のコンテナ `<CONTAINER_IDENTIFIER>` に `<TAG_KEY>:<TAG_VALUE>` タグを適用する場合は、ポッドで次のアノテーションを使用します。

```yaml
annotations:
  ad.datadoghq.com/<コンテナ識別子>.tags: '{"<タグキー>": "<タグ値>","<タグキー_1>": "<タグ値_1>"}'
```

Agent v7.17 以降では、Agent は Docker ラベルからタグを自動検出できます。このプロセスにより、Agent は、Agent 構成を変更することなく、コンテナによって発行されたすべてのデータにカスタムタグを関連付けることができます。

```yaml
com.datadoghq.ad.tags: '["<タグキー>:タグ値", "<タグキー_1>:<タグ値_1>"]'
```

## データセキュリティ
### タグとしてのノードラベル

Agent v6.0 以降、Agent は指定されたノードのラベルを収集し、Datadog のこの `host` に関連するすべてのメトリクス、トレース、ログに関連付けるタグとして使用することができます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたノードラベル `<NODE_LABEL>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加します。

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

たとえば、次のように設定できます。
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

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのノードラベルをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Helm" %}}
指定したノードラベル `<NODE_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加します。

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

たとえば、次のように設定できます。
```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのノードラベルをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Containerized Agent" %}}
特定のノードラベル `<NODE_LABEL>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのノードラベルをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][3]を参照してください。

### タグとしてのポッドラベル

Agent v6.0 以降、Agent は特定のポッドのラベルを収集し、それらをタグとして使用して、このポッドが発行するすべてのメトリクス、トレース、ログに関連付けることができます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたポッドラベル `<POD_LABEL>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加します。

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

たとえば、次のように設定できます。
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

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのポッドラベルをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Helm" %}}
指定したポッドラベル `<POD_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加します。

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

たとえば、次のように設定できます。
```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのポッドラベルをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Containerized Agent" %}}
特定のポッドラベル `<POD_LABEL>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Agent v6.8.0 以降の場合、次の環境変数構成を使用して、すべてのポッドラベルをタグとしてメトリクスに追加します。この例では、タグ名の前に `<プレフィックス>_` が付いています。

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][3]を参照してください。

### タグとしてのポッドアノテーション

Agent v6.0 以降、Agent は特定のポッドのアノテーションを収集し、それらをタグとして使用して、このポッドが発行するすべてのメトリクス、トレース、ログに関連付けることができます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたポッドアノテーション `<POD_ANNOTATION>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加します。

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

たとえば、次のように設定できます。
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

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのポッドアノテーションをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Helm" %}}
指定したポッドアノテーション `<POD_ANNOTATION>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加します。

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

たとえば、次のように設定できます。
```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのポッドアノテーションをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Containerized Agent" %}}
特定のポッドラベル `<POD_ANNOTATION>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのポッドアノテーションをタグとしてメトリクスに追加します。この例では、タグ名の前に `<プレフィックス>_` が付いています。

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][3]を参照してください。

### タグとしてのネームスペースラベル

Agent 7.27 以降、Agent は特定のネームスペースのラベルを収集し、それらをタグとして使用して、このネームスペースのすべてのポッドが発行するすべてのメトリクス、トレース、ログに関連付けることができます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたネームスペースラベル `<NAMESPACE_LABEL>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加します。

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

たとえば、次のように設定できます。
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

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのネームスペースラベルをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Helm" %}}
指定したネームスペースラベル `<NAMESPACE_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加します。

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

たとえば、次のように設定できます。
```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのネームスペースラベルをタグとしてメトリクスに追加します。この例では、タグの名前の前に `<PREFIX>_` が付いています。

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%%
```
{{% /tab %}}

{{% tab "Containerized Agent" %}}
特定のネームスペースラベル `<NAMESPACE_LABEL>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

次の環境変数コンフィギュレーションを使用して、すべてのポッドラベルをタグとしてメトリクスに追加します。この例では、タグ名の前に `<PREFIX>_` が付いています。

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][3]を参照してください。

### タグとしてのコンテナ環境変数

Agent v7.32+ から、Agent はコンテナ環境変数を収集し、コンテナに対応するすべてのメトリクス、トレース、ログに関連付けるタグとして使用することができます。`docker` と `containerd` の両方のコンテナがサポートされています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定された環境変数 `<ENV_VAR>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加します。

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

たとえば、次のように設定できます。
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
指定した環境変数 `<ENV_VAR>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加します。

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。
```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Containerized Agent" %}}
特定の環境変数 `<ENV_VAR>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

例:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求][3]を参照してください。

### タグとしてのコンテナラベル

Agent v7.33 以降、Agent はコンテナラベルを収集し、タグとして使用できます。Agent は、コンテナに関連するすべてのメトリクス、トレース、ログにタグを関連付けます。

Agent は `docker` と `containerd` コンテナの両方のコンテナラベルからタグを生成することができます。`containerd` の場合、最小サポートバージョンは v1.5.6 です。それ以前のリリースではラベルが正しく伝搬されないためです。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
指定されたコンテナラベル `<CONTAINER_LABEL>` を抽出して、Datadog 内でタグキー `<TAG_KEY>` として変換するには、`datadog-agent.yaml` 内の Operator の `DatadogAgent` 構成に以下の構成を追加します。

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

たとえば、次のように設定できます。
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
指定したコンテナラベル `<CONTAINER_LABEL>` を抽出し、Datadog 内でタグキー `<TAG_KEY>` として変換するには、Helm の `datadog-values.yaml` ファイルに以下の構成を追加します。

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。
```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Containerized Agent" %}}
特定のコンテナラベル `<CONTAINER_LABEL>` を抽出し、タグキー `<TAG_KEY>` に変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

例:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/account_management/billing/custom_metrics