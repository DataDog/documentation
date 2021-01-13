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

## タグのオートディスカバリー

Agent v6.10 以降では、Agent はポッドアノテーションからタグを自動検出できます。これにより、Agent は、ポッド全体またはこのポッド内の個々のコンテナから発行されるすべてのデータにタグを関連付けることができます。

Datadog では、コンテナ化環境のベストプラクティスとして、統合サービスタグ付けを使用してタグを統合することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][1]ドキュメントをご参照ください。

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

Agent v7.17 以降では、Agent は Docker ラベルからタグを自動検出できます。このプロセスにより、Agent は、[Agent の `datadog.yaml` ファイルを変更][2]することなく、コンテナによって発行されたすべてのデータにカスタムタグを関連付けることができます。

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

**注**: カスタムメトリクスは請求に影響を与える可能性があります。詳細については、[カスタムメトリクスの請求ページ][2]を参照してください。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/account_management/billing/custom_metrics
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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/agent/kubernetes/tag/?tab=agent#extract-labels-as-tags