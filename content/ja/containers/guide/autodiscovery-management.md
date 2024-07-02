---
title: Container Discovery Management
aliases:
 - /agent/autodiscovery/management
 - /agent/kubernetes/management
 - /agent/guide/autodiscovery-management
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Create and load an Autodiscovery Integration Template
---

デフォルトで、Datadog Agent は、利用可能なすべてのコンテナを自動的に検出する設定になっています。検出パラメーターを制限したりデータの収集をコンテナのサブセットのみに制限するには、それぞれのコンフィギュレーションで取り扱いを設定します。

## オートディスカバリーパターン 

Datadog Agent は、コンテナ環境内のホストごとに 1 回デプロイする必要があります。これは通常、Kubernetes の DaemonSet (Helm または Operator によって管理される) や ECS Daemon Services によって行われます。デプロイされた各 Datadog Agent は、それぞれのホスト上のすべてのコンテナを自動的に検出し、監視します。

Agent の検出ルールを調整することで、メトリクスとログの収集を制限できます。メトリクスの収集を制限されたコンテナは、オートディスカバリーベースの Agent インテグレーションでも制限されます。[ログ "Container Collect All" 機能][1]が有効な場合、以下に説明するルールによって他にブロックされない限り、検出されたすべてのコンテナでログが収集されます。

これらの制限は、以下のいずれかによって設定することができます。
- Datadog Agent コンテナに環境変数を提供し、それをコンテナの許可リスト/ブロックリストとして使用する。
- Adding annotations to your Kubernetes pods to block individual pods or containers.

最初のオプションは、クラスター全体で除外するコンテナ名、イメージ、または Kubernetes ネームスペースのリストとして良く機能します。2 つ目のオプションは、Kubernetes でより精密な除外設定を行う場合に良く機能します。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けず、常にすべてのコンテナを対象とします。

## Agent の構成

### 環境変数
**Agent v7.20+** では、以下の環境変数を使用して、イメージ名、コンテナ名、または Kubernetes ネームスペースによってコンテナを除外します。除外されたコンテナからはログとメトリクスが収集されません。

| 環境変数 | 説明 |
| ------------ | ----------- |
| `DD_CONTAINER_EXCLUDE` | 除外するコンテナのブロックリスト。 |
| `DD_CONTAINER_EXCLUDE_METRICS` | メトリクスが除外されるコンテナのブロックリスト。 |
| `DD_CONTAINER_EXCLUDE_LOGS` | ログが除外されるコンテナのブロックリスト。 |
| `DD_CONTAINER_INCLUDE` | 含めるコンテナの許可リスト。 |
| `DD_CONTAINER_INCLUDE_METRICS` | メトリクスが含まれるコンテナの許可リスト。 |
| `DD_CONTAINER_INCLUDE_LOGS` | ログが含まれるコンテナの許可リスト。 |

**Agent <=v7.19** では、環境変数 `DD_AC_INCLUDE` と `DD_AC_EXCLUDE` を使用して、イメージまたは名前でコンテナを含めたり除外したりできます。これらの環境変数は、それ以降の Agent のバージョンでは非推奨です。

それぞれの含める操作または除外する操作は、スペースで区切られた正規表現の文字列のリストとして定義されます。コンテナの名前 (`name`)、イメージ名 (`image`)、Kubernetes ネームスペース (`kube_namespace`) に基づいて、コンテナを含めたり除外したりできます。

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

代わりに、`image:.*` または `kube_namespace:.*` を使用することもできます。`name:`、`image:`、`kube_namespace:` のプレフィックスを付けずに `.*` を構成しても動作しません。

### 包含動作と除外動作

含める操作は除外する操作よりも優先されます。例えば、`ubuntu` や `debian` のイメージだけを監視したい場合は、まず他のイメージをすべて除外してから、どのイメージを含めるかを指定します。

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

Helm チャートの `datadog.containerExclude`、`datadog.containerInclude`、`datadog.containerExcludeLogs`、`datadog.containerIncludeLogs`、`datadog.containerExcludeMetrics`、`datadog.containerIncludeMetrics` にスペース区切りの文字列を指定します。

##### 例

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "Containerized Agent" %}}

Helm や Operator を使用していない環境では、起動時に以下の環境変数を Agent コンテナに渡すことができます。

##### Docker の例
```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### ECS の例
```json
"environment": [
  {
    "name": "DD_CONTAINER_EXCLUDE",
    "value": "image:<IMAGE_NAME>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

#### Pause コンテナ

Datadog Agent は、デフォルトで Kubernetes と OpenShift の pause コンテナを除外します。これにより、これらのコンテナのメトリクス収集および請求対象のコンテナとしてのカウントが防止されます。しかし、これらのコンテナは `kubernetes.containers.running` や `docker.containers.running` などのコンテナカウントメトリクスではカウントされます。

この動作を無効にし、pause コンテナの監視を含めるには

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
      - name: DD_EXCLUDE_PAUSE_CONTAINER
        value: "false"
```
{{% /tab %}}
{{% tab "Helm" %}}

Helm チャートで、`datadog.excludePauseContainer` を `true` または `false` に設定します。

##### 例

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "Containerized Agent" %}}

Helm や Operator を使用していない環境では、起動時に以下の環境変数を Agent コンテナに渡すことができます。

Set `DD_EXCLUDE_PAUSE_CONTAINER` to `false`.
{{% /tab %}}
{{< /tabs >}}

## ポッド除外構成

**Agent v7.45+** では、Kubernetes ポッドにアノテーションを設定してオートディスカバリーを制御できます。除外ルールを追加するには、以下のアノテーションに値 `"true"` を設定します。

| アノテーション | 説明 |
| ------------ | ----------- |
| `ad.datadoghq.com/exclude` | ポッド全体を除外します |
| `ad.datadoghq.com/logs_exclude` | ポッド全体からのログ収集を除外します |
| `ad.datadoghq.com/metrics_exclude` | ポッド全体からのメトリクス収集を除外します |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude` | ポッド内の `<CONTAINER_NAME>` を持つコンテナを除外します |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude` | ポッド内の `<CONTAINER_NAME>` を持つコンテナからのログ収集を除外します |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | ポッド内の `<CONTAINER_NAME>` を持つコンテナからのメトリクス収集を除外します |

#### ポッド全体を除外します。
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/exclude: "true"
    spec:
      containers:
        #(...)
```

#### コンテナからのログ収集を除外します。
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/helper.logs_exclude: "true"
    spec:
      containers:
        - name: app
          #(...)
        - name: helper
          #(...)
```

### 準備のできていないポッドを許容する

デフォルトでは、`unready` ポッドは Datadog Agent がチェックをスケジュールしたときに無視されます。そのため、これらのポッドからメトリクス、サービスチェック、およびログは収集されません。この挙動をオーバーライドするためには、アノテーション `ad.datadoghq.com/tolerate-unready` を `"true"` に設定してください。例:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tolerate-unready: "true"
  ...
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/log/?tab=helm#log-collection
