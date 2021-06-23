---
title: Docker タグの抽出
kind: ドキュメント
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
## 概要

Datadog Agent は、タグを作成し、ラベルまたは環境変数に基づいてコンテナが発行するすべてのメトリクス、トレース、ログに割り当てることができます。

ホスト上で Agent をバイナリとして実行している場合は、[Agent](?tab=agent) タブの手順を使用してタグ抽出を構成します。Agent をコンテナとして実行している場合は、[コンテナ化された Agent](?tab=containerizedagent) タブの手順でタグ抽出を構成します。

### 統合サービスタグ付け

Datadog では、コンテナ化環境のベストプラクティスとして、タグを付ける際に統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][1]ドキュメントをご参照ください。

## ラベルをタグとして抽出

Agent v6.0 以降、Agent は特定のコンテナのラベルを収集し、それらをタグとして使用して、このコンテナが発行するすべてのデータにアタッチできます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

特定の Docker ラベル `<ラベル名>` を抽出し、Datadog 内のタグキー `<タグキー>` として変換するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_DOCKER_LABELS_AS_TAGS='{"<ラベル名>": "<タグキー>"}'
```

たとえば、次のように設定できます。

```shell
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**注**: `<ラベル名>` は、大文字と小文字を区別しません。つまり、`foo` と `FOO` のラベルを使用していて、`DD_DOCKER_LABELS_AS_TAGS='{"foo": "bar"}'` を設定すると、`foo` および `FOO` の両方が `bar` にマッピングされます。

{{% /tab %}}
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
{{< /tabs >}}

## 環境変数をタグとして抽出

Datadog は [Docker、Kubernetes、ECS、Swarm、Mesos、Nomad、Rancher][2] から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数               | 説明                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | docker コンテナラベルを抽出します                |
| `DD_DOCKER_ENV_AS_TAGS`            | docker コンテナー環境変数を抽出します |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | ポッドラベルを抽出します                             |
| `DD_CHECKS_TAG_CARDINALITY`        | タグをチェックメトリクスに追加します                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | タグをカスタムメトリクスに追加します                     |

Agent v7.20 以降では、コンテナ化された Agent は Docker ラベルからタグを自動検出できます。このプロセスにより、Agent は、Agent の `datadog.yaml` ファイルを変更することなく、コンテナによって発行されたすべてのデータにカスタムタグを関連付けることができます。

タグは次の形式で追加する必要があります。

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY_1>:<TAG_VALUE_1>", "<TAG_KEY_2>:<TAG_VALUE_2>"]'
```

Agent v6.0 以降、Agent は特定のコンテナの環境変数を収集し、それらをタグとして使用して、このコンテナが発行するすべてのデータにアタッチできます。

{{< tabs >}}
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

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/agent/docker/?tab=standard#tagging