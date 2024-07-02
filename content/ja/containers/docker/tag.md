---
title: Docker Tag Extraction
aliases:
- /agent/docker/tag
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Getting started with tags
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Using tags with Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
---

## 概要

Datadog Agent は、タグを作成し、ラベルまたは環境変数に基づいてコンテナが発行するすべてのメトリクス、トレース、ログに割り当てることができます。

ホスト上で Agent をバイナリとして実行している場合は、[Agent](?tab=agent) タブの手順を使用してタグ抽出を構成します。Agent をコンテナとして実行している場合は、[コンテナ化された Agent](?tab=containerizedagent) タブの手順でタグ抽出を構成します。

### すぐに使えるタグ付け

Agent は、タグを自動検出し、コンテナにより送信されたすべてのデータにアタッチします。アタッチされるタグのリストは、Agent の[カーディナリティコンフィギュレーション][1]に基づきます。

| タグ                 | カーディナリティ  | 要件                                 |
|----------------------|--------------|---------------------------------------------|
| `container_name`     | 大         | N/A<br/> **注**: containerd ランタイムには含まれません。                                         |
| `container_id`       | 大         | N/A                                         |
| `rancher_container`  | 大         | Rancher 環境                         |
| `mesos_task`         | オーケストレーター | Mesos 環境                           |
| `docker_image`       | 小          | N/A<br/> **注**: containerd ランタイムには含まれません。                                         |
| `image_name`         | 小          | N/A                                         |
| `short_image`        | 小          | N/A                                         |
| `image_tag`          | 小          | N/A                                         |
| `swarm_service`      | 小          | Swarm 環境                           |
| `swarm_namespace`    | 小          | Swarm 環境                           |
| `rancher_stack`      | 小          | Rancher 環境                         |
| `rancher_service`    | 小          | Rancher 環境                         |
| `env`                | 小          | [統合サービスタグ付け][2]有効        |
| `version`            | 小          | [統合サービスタグ付け][2]有効        |
| `service`            | 小          | [統合サービスタグ付け][2]有効        |
| `marathon_app`       | 小          | Marathon 環境                        |
| `chronos_job`        | 小          | Mesos 環境                           |
| `chronos_job_owner`  | 小          | Mesos 環境                           |
| `nomad_task`         | 小          | Nomad 環境                           |
| `nomad_job`          | 小          | Nomad 環境                           |
| `nomad_group`        | 小          | Nomad 環境                           |
| `git.commit.sha`     | 小          | [org.opencontainers.image.revision][3] の使用 |
| `git.repository_url` | 小          | [org.opencontainers.image.source][3] の使用   |

### 統合サービスタグ付け

Datadog では、コンテナ化環境のベストプラクティスとして、タグを付ける際に統合サービスタグ付けを使用することをおすすめしています。統合サービスタグ付けは、`env`、`service`、`version` の 3 つの標準タグを使用して Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、専用の[統合サービスタグ付けドキュメント][2]をご参照ください。

## ラベルをタグとして抽出

Agent v6.0 以降、Agent は特定のコンテナのラベルを収集し、それらをタグとして使用して、このコンテナが発行するすべてのデータにアタッチできます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

特定のコンテナラベル `<LABEL_NAME>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<LABEL_NAME>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**注**: `<LABEL_NAME>` は、大文字と小文字を区別しません。つまり、`foo` と `FOO` のラベルを使用していて、`DD_CONTAINER_LABELS_AS_TAGS='{"foo": "bar"}'` を設定すると、`foo` および `FOO` の両方が `bar` にマッピングされます。

**注**: `DD_CONTAINER_LABELS_AS_TAGS` は古い `DD_DOCKER_LABELS_AS_TAGS` と同等で、`DD_CONTAINER_ENV_AS_TAGS` は `DD_DOCKER_ENV_AS_TAGS` と同等です。

{{% /tab %}}
{{% tab "Agent" %}}

特定のコンテナラベル `<LABEL_NAME>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
container_labels_as_tags:
  <LABEL_NAME>: <TAG_KEY>
```

たとえば、次のように設定できます。

```yaml
container_labels_as_tags:
  com.docker.compose.service: service_name
```


[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## 環境変数をタグとして抽出

Datadog は [Docker、Kubernetes、ECS、Swarm、Mesos、Nomad、Rancher][4] から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数               | 説明                             |
|------------------------------------|-----------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | コンテナラベルを抽出する                |
| `DD_CONTAINER_ENV_AS_TAGS`         | コンテナ環境変数を抽出する |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | ポッドラベルを抽出します                      |
| `DD_CHECKS_TAG_CARDINALITY`        | タグをチェックメトリクスに追加します               |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | タグをカスタムメトリクスに追加します              |

Agent v7.20 以降では、コンテナ化された Agent はコンテナラベルからタグを自動検出できます。このプロセスにより、Agent は、Agent の `datadog.yaml` ファイルを変更することなく、コンテナによって発行されたすべてのデータにカスタムタグを関連付けることができます。

タグは次の形式で追加する必要があります。

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY_1>:<TAG_VALUE_1>", "<TAG_KEY_2>:<TAG_VALUE_2>"]'
```

Agent v6.0 以降、Agent は特定のコンテナの環境変数を収集し、それらをタグとして使用して、このコンテナが発行するすべてのデータにアタッチできます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

特定のコンテナ環境変数 `<ENVVAR_NAME>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、次の環境変数を Datadog Agent に追加します。

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENVVAR_NAME>": "<TAG_KEY>"}'
```

たとえば、次のように設定できます。

```bash
DD_CONTAINER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

特定のコンテナ環境変数 `<ENVVAR_NAME>` を抽出し、Datadog 内のタグキー `<TAG_KEY>` として変換するには、[Agent `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
container_env_as_tags:
  <ENVVAR_NAME>: <TAG_KEY>
```

たとえば、次のように設定できます。

```yaml
container_env_as_tags:
  ENVIRONMENT: env
```

[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/docker/tag/#extract-environment-variables-as-tags
[2]: /getting_started/tagging/unified_service_tagging
[3]: https://github.com/opencontainers/image-spec/blob/02efb9a75ee11e05937b535cc5f228f9343ab2f5/annotations.md#pre-defined-annotation-keys
[4]: /agent/docker/?tab=standard#tagging
