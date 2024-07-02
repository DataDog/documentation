---
aliases:
- /ja/agent/autodiscovery/management
- /ja/agent/kubernetes/management
- /ja/agent/guide/autodiscovery-management
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: オートディスカバリーのインテグレーションテンプレートの作成とロード
title: コンテナディスカバリー管理
---

デフォルトで、Datadog Agent は、利用可能なすべてのコンテナを自動的に検出する設定になっています。検出パラメーターを制限したりデータの収集をコンテナのサブセットのみに制限するには、それぞれのコンフィギュレーションで取り扱いを設定します。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けず、常にすべてのコンテナを対象とします。

## 環境変数
Agent をコンテナとして実行する場合は、[Containerized Agent](?tab=containerizedagent) タブの指示を使用します。Agent をホスト上のバイナリとして実行する場合は、[Host Agent](?tab=hostagent) タブの指示を使用します。

{{< tabs >}}
{{% tab "Containerized Agent" %}}

**Agent v7.20+** では、以下の環境変数を使用して、イメージ、名前、または Kubernetes ネームスペースによってコンテナを除外します。除外されたコンテナからはログとメトリクスが収集されません。

| 環境変数 | 説明 |
| ------------ | ----------- |
| `DD_CONTAINER_EXCLUDE` | 除外するコンテナのブロックリスト。 |
| `DD_CONTAINER_EXCLUDE_METRICS` | メトリクスが除外されるコンテナのブロックリスト。 |
| `DD_CONTAINER_EXCLUDE_LOGS` | ログが除外されるコンテナのブロックリスト。 |
| `DD_CONTAINER_INCLUDE` | 含めるコンテナの許可リスト。 |
| `DD_CONTAINER_INCLUDE_METRICS` | メトリクスが含まれるコンテナの許可リスト。 |
| `DD_CONTAINER_INCLUDE_LOGS` | ログが含まれるコンテナの許可リスト。 |

**Agent <=v7.19** では、環境変数 `DD_AC_INCLUDE` と `DD_AC_EXCLUDE` を使用して、イメージまたは名前でコンテナを含めたり除外したりできます。これらの環境変数は、それ以降の Agent のバージョンでは非推奨です。

{{% /tab %}}
{{% tab "ホスト Agent" %}}

| 環境変数 | 説明 |
| ------------ | ----------- |
| `container_exclude` | 除外するコンテナのブロックリスト。 |
| `container_exclude_metrics` | メトリクスが除外されるコンテナのブロックリスト。Agent v7.20+ でサポートされています。 |
| `container_exclude_logs` | ログが除外されるコンテナのブロックリスト。Agent v7.20+ でサポートされています。 |
| `container_include` | 含めるコンテナのブロックリスト。 |
| `container_include_metrics` | メトリクスが含まれるコンテナのブロックリスト。Agent v7.20+ でサポートされています。 |
| `container_include_logs` | ログが含まれるコンテナのブロックリスト。Agent v7.20+ でサポートされています。 |

{{% /tab %}}
{{< /tabs >}}

## 使用方法

### 値の定義

{{< tabs >}}
{{% tab "Containerized Agent" %}}
それぞれの包含または除外は、スペースで区切られた正規表現文字列のリストとして定義されます。コンテナの名前 (`name`)、イメージ名 (`image`)、Kubernetes ネームスペース (`kube_namespace`) に基づいて、コンテナを包含または除外できます。

#### 例
`dd-agent` という名前のコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

イメージ名が `dockercloud/network-daemon` と `dockercloud/logrotate` の 2 つのコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon$ image:^dockercloud/logrotate$"
```

すべてのコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

また、`image:.*` または `kube_namespace:.*` を使用することもできます。`name:`、`image:`、`kube_namespace:` のプレフィックスを付けずに `.*` を構成しても動作しません。
{{% /tab %}}
{{% tab "Host Agent" %}}
それぞれの包含または除外は、スペースで区切られた正規表現文字列のリストとして定義されます。コンテナの名前 (`name`)、イメージ名 (`image`)、Kubernetes ネームスペース (`kube_namespace`) に基づいて、コンテナを包含または除外できます。

#### 例
`dd-agent` という名前のコンテナを除外するには

```
container_exclude: [name:^dd-agent$]
```

イメージ名が `dockercloud/network-daemon` と `dockercloud/logrotate` の 2 つのコンテナを除外するには

```
container_exclude: [image:^dockercloud/network-daemon$ image:^dockercloud/logrotate$]
```

すべてのコンテナを除外するには

```
container_exclude: [name:.*]
```

また、`image:.*` または `kube_namespace:.*` を使用することもできます。`name:`、`image:`、`kube_namespace:` のプレフィックスを付けずに `.*` を構成しても動作しません。
{{% /tab %}}
{{< /tabs >}}
### 包含動作と除外動作

{{< tabs >}}
{{% tab "Containerized Agent" %}}
包含は除外よりも優先されます。例えば、`ubuntu` や `debian` のイメージだけを監視したい場合は、まず他のイメージをすべて除外してから、どのイメージを含めるかを指定します。

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

カテゴリーをまたがる包含/除外ルールを混在させることはできません。例えば、イメージ名 `foo` を持つコンテナを含めて、イメージ名 `bar` を持つコンテナのメトリクスのみを除外したい場合、以下のようにすると**不十分**です。

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE = "image:^foo$"
```

代わりに、以下を使用します。

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE_METRICS = "image:^foo$"
DD_CONTAINER_INCLUDE_LOGS = "image:^foo$"
```

グローバルリストと選択リスト (ログとメトリクス) の間には相互作用はありません。つまり、コンテナをグローバルに除外して (`DD_CONTAINER_EXCLUDE`)、そのコンテナを `DD_CONTAINER_INCLUDE_LOGS` と `DD_CONTAINER_INCLUDE_METRICS` で含めることはできません。

{{% /tab %}}
{{% tab "Host Agent" %}}
包含は除外よりも優先されます。例えば、`ubuntu` や `debian` のイメージだけを監視したい場合は、まず他のイメージをすべて除外してから、どのイメージを含めるかを指定します。

```
container_exclude: [image:.*]
container_include: [image:ubuntu image:debian]
```

カテゴリーをまたがる包含/除外ルールを混在させることはできません。例えば、イメージ名 `foo` を持つコンテナを含めて、イメージ名 `bar` を持つコンテナのメトリクスのみを除外したい場合、以下のようにすると**不十分**です。

```
container_exclude_metrics: [image:^bar$]
container_include: [image:^foo$]
```

代わりに、以下を使用します。

```
container_exclude_metrics: [image:^bar$]
container_include_metrics: [image:^foo$]
container_include_logs: [image:^foo$]
```

グローバルリストと選択リスト (ログとメトリクス) の間には相互作用はありません。つまり、コンテナをグローバルに除外して (`container_exclude`)、そのコンテナを `container_include_logs` と `container_include_metrics` で含めることはできません。
{{% /tab %}}
{{< /tabs >}}

### 環境変数を設定する
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator で、これらの環境変数を `spec.override.nodeAgent.env` の下に設定します。

##### 例

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
    env:
      - name: DD_CONTAINER_EXCLUDE
        value: "image:<IMAGE_NAME>"
```
{{% /tab %}}
{{% tab "Helm" %}}

Helm チャートの `datadog.containerExclude`、`datadog.containerInclude`、`datadog.containerExcludeLogs`、`datadog.containerIncludeLogs`、`datadog.containerExcludeMetrics`、`datadog.containerIncludeMetrics` にスペース区切りの文字列を指定します。また、`excludePauseContainer` を `true` または `false` に設定することもできます。

##### 例

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: true
```

{{% /tab %}}
{{% tab "Host Agent" %}}
[Agent の `datadog.yaml` コンフィグレーションファイル][1]に環境変数を設定します。

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Pause コンテナ

Datadog Agent は、デフォルトで Kubernetes や OpenShift の Pause コンテナを除外しますが、除外コンテナのようなコンテナ数にはカウントされます。

この動作を無効にし、一時停止コンテナをオートディスカバリーの境界に含めるには

{{< tabs >}}
{{% tab "Containerized Agent" %}}
`DD_EXCLUDE_PAUSE_CONTAINER` を `false` に設定します。
{{% /tab %}}
{{% tab "Host Agent" %}}
`exclude_pause_container` を `false` に設定します。
{{% /tab %}}
{{< /tabs >}}
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file