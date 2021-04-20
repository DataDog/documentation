---
title: コンテナディスカバリー管理
kind: ガイド
aliases:
  - /ja/agent/autodiscovery/management
  - /ja/agent/kubernetes/management
further_reading:
  - link: /agent/kubernetes/integrations/
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
---
Datadog Agent は、利用可能なすべてのコンテナを自動検出する設定になっています。検出パラメーターを制限したりデータの収集をコンテナのサブセットのみに制限するには、それぞれのコンフィギュレーションで取り扱いを設定します。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けず、常にすべてのコンテナを対象とします。

Agent をホスト上のバイナリとして実行する場合は、[Agent](?tab=agent) タブの説明に従ってオートディスカバリー境界を構成してください。Agent をコンテナとして実行する場合は、[コンテナ化 Agent](?tab=containerizedagent) タブの説明に従ってオートディスカバリー境界を構成してください。

## コンテナを除外する

`name`、`image`、`kube_namespace` に基づく除外ルールで Agent のオートディスカバリー境界からのコンテナを除外し、そこから **NO DATA** を集めます。コンテナと除外ルールが一致すると、最初に包含ルールに一致しない限り含まれることはありません。

**注**: 除外条件は正規表現をサポートし、カンマ区切り文字列のリストとして定義されます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

**Agent v7.20 以降**でオートディスカバリーから**画像** `<IMAGE_NAME>` を持つ任意の Docker コンテナを削除し、**ログとメトリクス**を除外するには、Datadog Agent に以下の環境変数を追加してください。

```shell
DD_CONTAINER_EXCLUDE = "image:<IMAGE_NAME>"
```

たとえば、以下のコンフィギュレーションは Docker Cloud にあるこれらのコンテナを除外するように Agent に指示します。

```shell
DD_CONTAINER_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

正規表現 `DD_CONTAINER_EXCLUDE = "image:dockercloud/.*"` を使用してすべてのコンテナを無視することもできます。

**Agent v7.19 以前**でオートディスカバリーから**画像** `<IMAGE_NAME>`を持つ特定のDockerコンテナを削除するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_EXCLUDE = "image:<IMAGE_NAME>"
```

上記の通り、以下のコンフィギュレーションは Docker Cloud にあるこれらのコンテナを除外するように Agent に指示します。

```shell
DD_AC_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

`DD_AC_EXCLUDE` は **Agent v7.20 以降では推奨されません**。

**Agent v7.20 以降**でオートディスカバリーから**名前** `<NAME>` を持つ任意の Docker コンテナを削除し、**ログとメトリクス**を除外するには、Datadog Agent に以下の環境変数を追加してください。

```shell
DD_CONTAINER_EXCLUDE = "name:<NAME>"
```

たとえば、除外ルールを使用して、Agentコンテナそのものを除外します。

```shell
DD_CONTAINER_EXCLUDE = "name:dd-agent"
```

**Agent v7.19 以前**でオートディスカバリーから**名前**`<IMAGE_NAME>`を持つ特定のDockerコンテナを削除するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_EXCLUDE = "name:<NAME>"
```

たとえば、除外ルールを使用して、Agentコンテナそのものを除外します。

```shell
DD_AC_EXCLUDE = "name:dd-agent"
```

**Agent v7.20 以降**では、除外条件を使い**ログのみまたはメトリクスのみ**を除外することもできます。たとえば、画像 `<IMAGE_NAME>`を持つコンテナからログを除外するには、次の環境変数を Datadog Agent に追加します。

```shell
DD_CONTAINER_EXCLUDE_LOGS = "image:<IMAGE_NAME>"
```

同様に、メトリクスを除外するには、

```shell
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME>"
```

Kubernetes で、ネームスペース`<ネームスペース>` 内のすべての Pod コンテナをオートディスカバリーから削除するには、Datadog Agent に以下の環境変数を追加します。

```shell
DD_CONTAINER_EXCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

オートディスカバリーから画像`<IMAGE_NAME>`を持つ特定のDockerコンテナを削除するには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
container_exclude: [image:<IMAGE_NAME>]
```

オートディスカバリーから名前`<NAME>`を持つ特定のDockerコンテナを削除するには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
container_exclude: [name:<NAME>]
```

**Agent v7.20 以降**では、除外条件を使いログのみまたはメトリクスのみを除外することもできます。たとえば、画像 `<IMAGE_NAME>`を持つコンテナからログを除外するには、次の環境変数を Datadog Agent に追加します。

```shell
container_exclude_logs: [image:<IMAGE_NAME>]
```

同様に、**Agent v7.20 以降**でメトリクスを除外するには、

```shell
container_exclude_metrics: [image:<IMAGE_NAME>]
```

Kubernetes で、ネームスペース`<ネームスペース>` 内のすべての Pod コンテナをオートディスカバリーから削除するには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
container_exclude: [kube_namespace:<NAMESPACE>]
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**注**: Kubernetes を使用する場合、マニフェスト`.spec.containers[0].name` にあるべきなのはコンテナ`<NAME>` です。

## コンテナを対象に含める

`name` または `image` に基づく包含ルールで` Agent のオートディスカバリー境界からのコンテナを含め、そのコンテナから**のみ**のデータを集めます。コンテナと包含ルールが一致すると、常にオートディスカバリー境界に含まれることになります。

**注**: 包含ルールは正規表現をサポートし、カンマ区切り文字列のリストとして定義されます。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

**Agent v7.20 以前**でオートディスカバリーから**画像** `<IMAGE_NAME>`を持つ特定のDockerコンテナを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME>"
```

**Agent v7.19 以前**でオートディスカバリーから**画像** `<IMAGE_NAME>` を持つ特定の Docker コンテナを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_INCLUDE = "image:<IMAGE_NAME>"
```

`DD_AC_INCLUDE` は **Agent v7.20 以降では推奨されません**。

**Agent v7.20 以前**でオートディスカバリーから**名前** `<NAME>`を持つ特定のDockerコンテナを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
DD_CONTAINER_INCLUDE = "name:<NAME>"
```

たとえば、`Ubuntu` や `Debian` 画像のみをモニターして残りを削除したい場合、次のように指定します。

```shell
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

**Agent v7.19 以前**でオートディスカバリーから**名前** `<IMAGE_NAME>` を持つ特定の Docker コンテナを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
DD_AC_INCLUDE = "name:<NAME>"
```

上記の通り、`Ubuntu` や `Debian` 画像のみをモニターして残りを削除したい場合、次のように指定します。

```shell
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu image:debian"
```

**Agent v7.20 以降**では、包含条件を使いログのみまたはメトリクスのみを含めることもできます。たとえば、画像 `<IMAGE_NAME>`を持つコンテナのログを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME>"
```

同様に、メトリクスを含めるには、

```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME>"
```

Kubernetes で、ネームスペース`<ネームスペース>` 内のすべての Pod コンテナをオートディスカバリーに含めるには、Datadog Agent に以下の環境変数を追加します。

```shell
DD_CONTAINER_INCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

オートディスカバリーから画像`<IMAGE_NAME>`を持つ特定のDockerコンテナを含めるには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
container_include: [image:<IMAGE_NAME>]
```

オートディスカバリーから名前`<NAME>`を持つ特定のDockerコンテナを含めるには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
container_include: [name:<NAME>]
```

**Agent v7.20 以降**では、包含条件を使いログのみまたはメトリクスのみを含めることもできます。たとえば、画像 `<IMAGE_NAME>`を持つコンテナのログを含めるには、次の環境変数を Datadog Agent に追加します。

```shell
container_include_logs: [image:<IMAGE_NAME>]
```

同様に、メトリクスを含めるには、

```shell
container_include_metrics: [image:<IMAGE_NAME>]
```

Kubernetes で、ネームスペース <ネームスペース> 内のすべての Pod コンテナをオートディスカバリーに含めるには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]に次のコンフィギュレーションブロックを追加します。

```yaml
container_include: [kube_namespace:<NAMESPACE>]
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**注**: Kubernetes を使用する場合、マニフェスト`.spec.containers[0].name` にあるべきなのはコンテナ`<NAME>` です。

## 包含動作と除外動作

規則がグローバルであるかメトリクスやログのみに適用されるかにかかわらず、常に包含動作が優先されます。

クロスカテゴリーの包含/除外規則を混在させることはできません。たとえば、画像名 `<IMAGE_NAME_1>` のコンテナを含め、画像名 `<IMAGE_NAME_2>` のコンテナからメトリクスのみを除外する際、以下のようにします。

{{< tabs >}}
{{% tab "Containerized Agent" %}}
```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME_2>"
```

つまり、`DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME_1>"` の設定だけでは不十分です

{{% /tab %}}
{{% tab "Agent" %}}
```yaml
container_include_metrics: [image:<IMAGE_NAME_1>]
container_include_logs: [image:<IMAGE_NAME_1>]
container_exclude_metrics: [image:<IMAGE_NAME_2>]
```

つまり、`container_include: [image:<IMAGE_NAME_1>]` の設定だけでは不十分です。
{{% /tab %}}
{{< /tabs >}}

グローバルリストと選択（ログとメトリクス）リストの間に相互関係はありません。つまり、コンテナをグローバルに除外してから `container_include_logs` と `container_include_metrics` で含めることはできません。

## Pause コンテナ

Datadog Agent は、デフォルトで Kubernetes や OpenShift の Pause コンテナを除外しますが、除外コンテナのようなコンテナ数にはカウントされます。

この動作を無効にし、オートディスカバリー境界に Pause コンテナに含めるには、[Agent `datadog.yaml` コンフィギュレーションファイル][1]で `exclude_pause_container` パラメーターを `false` に設定するか、Agent 環境変数 `DD_EXCLUDE_PAUSE_CONTAINER="false"` を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file