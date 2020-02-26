---
title: コンテナディスカバリー管理
kind: documentation
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
  - link: /agent/autodiscovery/ad_identifiers
    tag: ドキュメント
    text: コンテナと該当するインテグレーションテンプレートとの対応
---
Datadog Agent は、利用可能なすべてのコンテナを自動検出する設定になっています。検出パラメーターを制限したりデータの収集をコンテナのサブセットのみに制限するには、それぞれのコンフィギュレーションで取り扱いを設定します。

**注**: `docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` メトリクスは、この設定の影響を受けず、常にすべてのコンテナを対象とします。コンテナごとの課金にも影響しません。

Agent をホスト上のバイナリとして実行する場合は、[Agent](?tab=agent) タブの説明に従ってオートディスカバリー境界を構成してください。Agent をコンテナとして実行する場合は、[コンテナ化 Agent](?tab=containerizedagent) タブの説明に従ってオートディスカバリー境界を構成してください。

## コンテナを除外する

`name` または `image` に基づく除外ルールで Agent のオートディスカバリー境界からのコンテナを除外し、そこから **NO DATA** を集めます。コンテナと除外ルールが一致すると、最初に包含ルールに一致しない限り含まれることはありません。

**注**: 除外ルールは正規表現をサポートし、カンマ区切り文字列のリストとして定義されます。

{{< tabs >}}
{{% tab "Agent" %}}

オートディスカバリーから画像`<IMAGE_NAME>`を持つ特定のDockerコンテナを削除するには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
ac_exclude: [image:<IMAGE_NAME>]
```

オートディスカバリーから名前`<NAME>`を持つ特定のDockerコンテナを削除するには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
ac_exclude: [name:<NAME>]
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

オートディスカバリーから画像`<IMAGE_NAME>`を持つ特定のDockerコンテナを削除するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_EXCLUDE = "image:<IMAGE_NAME>"
```

オートディスカバリーから名前`<NAME>`を持つ特定のDockerコンテナを削除するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_EXCLUDE = "name:<NAME>"
```

たとえば、除外ルールを使用して、Agentコンテナそのものを除外します。

```shell
DD_AC_EXCLUDE = "name:dd-agent"
```

また以下の構成は、Docker Cloud にあるこれらのコンテナを除外するように Agent に指示します。

```shell
DD_AC_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

また、正規表現 `DD_AC_EXCLUDE = "image:dockercloud/*"` を使用してすべてのコンテナを無視することもできます。

{{% /tab %}}
{{< /tabs >}}

**注**: Kubernetes を使用する場合、マニフェスト`.spec.containers[0].name` にあるべきなのはコンテナ`<NAME>` です。

## コンテナを対象に入れる

`name` または `image` に基づく包含ルールで` Agent のオートディスカバリー境界からのコンテナを含め、そのコンテナから**のみ**のデータを集めます。コンテナと包含ルールが一致すると、常にオートディスカバリー境界に含まれることになります。

**注**: 包含ルールは正規表現をサポートし、カンマ区切り文字列のリストとして定義されます。

{{< tabs >}}
{{% tab "Agent" %}}

オートディスカバリーから画像`<IMAGE_NAME>`を持つ特定のDockerコンテナを含めるには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
ac_include: [image:<IMAGE_NAME>]
```

オートディスカバリーから名前`<NAME>`を持つ特定のDockerコンテナを含めるには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
ac_include: [name:<NAME>]
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

オートディスカバリーから画像`<IMAGE_NAME>`を持つ特定のDockerコンテナを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_INCLUDE = "image:<IMAGE_NAME>"
```

オートディスカバリーから名前`<NAME>`を持つ特定のDockerコンテナを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_INCLUDE = "name:<NAME>"
```

たとえば、`Ubuntu` や `Debian` 画像のみをモニターして残りを削除したい場合、次のように指定します。

```shell
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu image:debian"
```

{{% /tab %}}
{{< /tabs >}}

**注**: Kubernetes を使用する場合、マニフェスト`.spec.containers[0].name` にあるべきなのはコンテナ`<NAME>` です。

### Pause コンテナ

Datadog Agent は、デフォルトで Kubernetes や OpenShift の Pause コンテナを除外しますが、除外コンテナのようなコンテナ数にはカウントされます。

この動作を無効にし、オートディスカバリー境界に Pause コンテナに含めるには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]で `exclude_pause_container` パラメーターを `false` に設定するか、Agent 環境変数 `DD_EXCLUDE_PAUSE_CONTAINER="false"` を使用します。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file