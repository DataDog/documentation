---
title: Kubernetes タグ抽出
kind: ドキュメント
aliases:
  - /ja/agent/autodiscovery/tag/
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
  | `kube_replica_set`            | オーケストレーター | ポッド ownerref                                                            | ポッドはレプリカセットにアタッチされていることが必要               |
  | `kube_service`                | オーケストレーター | Kubernetes サービスディスカバリー                                            | ポッドは Kubernetes サービスの後方にあることが必要                  |
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

Agent v7.17 以降では、Agent は Docker ラベルからタグを自動検出できます。このプロセスにより、Agent は、[Agent の `datadog.yaml` ファイルを変更][3]することなく、コンテナによって発行されたすべてのデータにカスタムタグを関連付けることができます。

```yaml
com.datadoghq.ad.tags: '["<タグキー>:タグ値", "<タグキー_1>:<タグ値_1>"]'
```

## タグとしてのノードラベル

Agent v6.0 以降、Agent は特定のノードのラベルを収集し、それらをタグとして使用して、このノード上のすべてのポッドが発行するすべてのメトリクスにアタッチできます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

特定のノードラベル `<ノードラベル>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<ノードラベル>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのノードラベルをタグとしてメトリクスに追加します。この例では、タグ名の前に `<プレフィックス>_` が付いています。

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][1]を参照してください。

[1]: /ja/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

特定のノードラベル `<ノードラベル>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
kubernetes_node_labels_as_tags:
  <ノードラベル>: <タグキー>
```

たとえば、次のように設定できます。

```yaml
kubernetes_node_labels_as_tags:
  app: kube_app
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## タグとしてのポッドラベル

Agent v6.0 以降、Agent は特定のポッドのラベルを収集し、それらをタグとして使用して、このポッドが発行するすべてのメトリクスにアタッチできます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

特定のポッドラベル `<ポッドラベル>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<ポッドラベル>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Agent v6.8.0 以降の場合、次の環境変数構成を使用して、すべてのポッドラベルをタグとしてメトリクスに追加します。この例では、タグ名の前に `<プレフィックス>_` が付いています。

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<プレフィックス>_%%label%%"}'
```

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][1]を参照してください。

[1]: /ja/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

特定のポッドラベル `<ポッドラベル>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
kubernetes_pod_labels_as_tags:
  <ポッドラベル>: <タグキー>
```

たとえば、次のように設定できます。

```yaml
kubernetes_pod_labels_as_tags:
  app: kube_app
```

Agent v6.8.0 以降の場合、次の環境変数構成を使用して、すべてのポッドラベルをタグとしてメトリクスに追加します。この例では、タグ名の前に `<プレフィックス>_` が付いています。

```yaml
kubernetes_pod_labels_as_tags:
  *: <プレフィックス>_%%label%%
```

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][3]を参照してください。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## タグとしてのポッドアノテーション

Agent v6.0 以降、Agent は特定のポッドのアノテーションを収集し、それらをタグとして使用して、このポッドが発行するすべてのメトリクスにアタッチできます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

特定のポッドラベル `<ポッドアノテーション>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<ポッドアノテーション>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Agent v7.24.0 以降の場合、次の環境変数構成を使用して、すべてのポッドアノテーションをタグとしてメトリクスに追加します。この例では、タグ名の前に `<プレフィックス>_` が付いています。

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][1]を参照してください。

[1]: /ja/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

特定のポッドアノテーション `<ポッドアノテーション>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
kubernetes_pod_annotations_as_tags:
  <ポッドアノテーション>: <タグキー>
```

たとえば、次のように設定できます。

```yaml
kubernetes_pod_annotations_as_tags:
  app: kube_app
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## タグとしてのネームスペースラベル

Agent 7.27 以降、Agent は特定のネームスペースのラベルを収集し、それらをタグとして使用して、このネームスペースのすべてのポッドが発行するすべてのメトリクスにアタッチできます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

特定のネームスペースラベル `<NAMESPACE_LABEL>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

次の環境変数コンフィギュレーションを使用して、すべてのポッドラベルをタグとしてメトリクスに追加します。この例では、タグ名の前に `<PREFIX>_` が付いています。

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][1]を参照してください。

[1]: /ja/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

特定のネームスペースラベル `<NAMESPACE_LABEL>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
kubernetes_namespace_labels_as_tags:
  <NAMESPACE_LABEL>: <TAG_KEY>
```

たとえば、次のように設定できます。

```yaml
kubernetes_namespace_labels_as_tags:
  app: kube_app
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/docker/tag/#extract-environment-variables-as-tags
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/agent/kubernetes/tag/?tab=agent#extract-labels-as-tags