---
title: タグの割り当てと抽出
kind: documentation
further_reading:
  - link: tagging/
    tag: ドキュメント
    text: タグの概要
  - link: tagging/using_tags
    tag: ドキュメント
    text: Datadog でタグを使用する
  - link: /agent/autodiscovery/integrations
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
  - link: /agent/autodiscovery/ad_identifiers
    tag: ドキュメント
    text: コンテナと該当するインテグレーションテンプレートとの対応
  - link: /agent/autodiscovery/management
    tag: ドキュメント
    text: Agent オートディスカバリーに含めるコンテナの管理
---
Datadog Agent は、タグを作成して、ラベルまたは環境変数に基づいてコンテナが発行するすべてのメトリクス、トレース、ログに割り当てることができます。
Kubernetes 環境で作業している場合、Agent はタグを作成して、ラベルまたはアノテーションに基づいて Pod が発行するすべてのメトリクス、トレース、ログに割り当てることができます。

ホスト上で Agent をバイナリとして実行している場合は、[Agent](?tab=agent) タブの手順を使用してタグ抽出を構成します。Agent をコンテナとして実行している場合は、[コンテナ化された Agent](?tab=containerizedagent) タブの手順でタグ抽出を構成します。

## Kubernetes

### タグのオートディスカバリー

Agent v6.10 以降では、Agent はポッドアノテーションからタグを自動検出できます。これにより、Agent は、ポッド全体またはこのポッド内の個々のコンテナから発行されるすべてのデータにタグを関連付けることができます。

`<タグキー>":<タグ値>` タグを特定のポッドから発行され、Agent によって収集されたすべてのデータに適用するには、ポッドで次のアノテーションを使用します。

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<タグキー>": "<タグ値>","<タグキー_1>": "<タグ値_1>"}'
```

ポッド内の個々のコンテナ `<コンテナ識別子>` に `<タグキー>":<タグ値>` タグを適用する場合は、ポッドで次のアノテーションを使用します。

```yaml
annotations:
  ad.datadoghq.com/<コンテナ識別子>.tags: '{"<タグキー>": "<タグ値>","<タグキー_1>": "<タグ値_1>"}'
```

### ノードラベルをタグとして抽出

Agent v6.0 以降、Agent は特定のノードのラベルを収集し、それらをタグとして使用して、このノード上のすべてのポッドが発行するすべてのメトリクスにアタッチできます。

{{< tabs >}}
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
{{% tab "Containerized Agent" %}}

特定のノードラベル `<ノードラベル>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<ノードラベル>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

### ポッドラベルをタグとして抽出

Agent v6.0 以降、Agent は特定のポッドのラベルを収集し、それらをタグとして使用して、このポッドが発行するすべてのメトリクスにアタッチできます。

{{< tabs >}}
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

**注**: この方法を使用すると、組織の[メトリクス数が増加][2]し、請求に影響する可能性があります。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /ja/developers/metrics/
{{% /tab %}}
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

**注**: この方法を使用すると、組織の[カスタムメトリクス][1]数が増加し、請求に影響する可能性があります。

[1]: /ja/developers/metrics/
{{% /tab %}}
{{< /tabs >}}

### ポッドアノテーションをタグとして抽出

Agent v6.0 以降、Agent は特定のポッドのアノテーションを収集し、それらをタグとして使用して、このポッドが発行するすべてのメトリクスにアタッチできます。

{{< tabs >}}
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
{{% tab "Containerized Agent" %}}

特定のポッドラベル `<ポッドアノテーション>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<ポッドアノテーション>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

## Docker

### ラベルをタグとして抽出

Agent v6.0 以降、Agent は特定のコンテナのラベルを収集し、それらをタグとして使用して、このコンテナが発行するすべてのデータにアタッチできます。

{{< tabs >}}
{{% tab "Agent" %}}

特定の Docker ラベル `<ラベル名>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
docker_labels_as_tags:
  <ラベル名>: <タグキー>
```

たとえば、次のように設定できます。

```yaml
docker_labels_as_tags:
  com.docker.compose.service: service_name
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

特定の Docker ラベル `<ラベル名>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_DOCKER_LABELS_AS_TAGS='{"<ラベル名>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

{{% /tab %}}
{{< /tabs >}}

### 環境変数をタグとして抽出

Agent v6.0 以降、Agent は特定のコンテナの環境変数を収集し、それらをタグとして使用して、このコンテナが発行するすべてのデータにアタッチできます。

{{< tabs >}}
{{% tab "Agent" %}}

特定の Docker 環境変数 `<環境変数名>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
docker_env_as_tags:
  <環境変数>: <タグキー>
```

たとえば、次のように設定できます。

```yaml
docker_env_as_tags:
  ENVIRONMENT: env
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

特定の Docker 環境変数 `<環境変数名>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_DOCKER_ENV_AS_TAGS='{"<環境変数名>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_DOCKER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}