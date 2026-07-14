---
aliases:
- /ja/agent/autodiscovery/management
- /ja/agent/kubernetes/management
- /ja/agent/guide/autodiscovery-management
- /ja/containers/guide/autodiscovery-management
description: 検出ルールや包含/除外パターンを構成することで、Datadog Agent がモニターするコンテナを制御する
further_reading:
- link: /containers/kubernetes/integrations/
  tag: ドキュメント
  text: Kubernetes の Autodiscovery とのインテグレーションを構成する
- link: /containers/docker/integrations/
  tag: ドキュメント
  text: Docker の Autodiscovery とのインテグレーションを構成する
title: コンテナディスカバリー管理
---
デフォルトで、Datadog Agent は利用可能なすべてのコンテナを自動的に検出します。このドキュメントでは、Datadog Agent の検出範囲を制限してデータ収集を一部のコンテナに限定する方法について説明します。

## コンテナディスカバリーパターン {#container-discovery-patterns}

コンテナ化環境では、ホストごとに一度 Datadog Agent をデプロイする必要があります。デプロイされた各 Datadog Agent は、それぞれのホスト上のすべてのコンテナを自動的に検出および監視します。[`containerCollectAll` オプション][1]が有効になっている場合、Agent は検出されたすべてのコンテナからログを収集します。

Agent の検出ルールを調整することで、メトリクスとログの収集を制限できます。メトリクスの収集を制限されたコンテナは、[Autodiscovery][2] ベースの Agent インテグレーションでも制限されます。

例外を設定する方法は 2 つあります。

- Datadog Agent コンテナに環境変数を提供し、それをコンテナの許可リスト/ブロックリストとして使用する。クラスター全体で除外するコンテナ名、イメージ、またはネームスペースのリストがある場合に推奨されます。
- Kubernetes Pod にアノテーションを追加して個々の Pod またはコンテナをブロックする。細かい除外設定が必要な場合に推奨されます。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、および `.stopped.total` メトリクスはこれらの設定の影響を受けず、常にすべてのコンテナをカウントします。

## シンプルパターンマッチング {#simple-pattern-matching}

以下のテーブルの環境変数を使用して、コンテナフィルタリングを構成します。包含または除外の各設定は、スペースで区切られた正規表現文字列のリストとして定義されます。次の基準に基づいてコンテナを包含したり除外したりできます。

- コンテナ名 (`name`)
- コンテナイメージ名 (`image`)
- Kubernetes ネームスペース (`kube_namespace`)

<div class="alert alert-danger">

`name` パラメーターは、Kubernetes Pod でコンテナが実行されている場合でも、Pod 名ではなくコンテナ名にのみ適用されます。

</div>

### 環境変数 {#environment-variables}

**Agent v7.20+** では、以下の環境変数を使用して、イメージ名、コンテナ名、または Kubernetes ネームスペースによってコンテナを除外します。除外されたコンテナからはログとメトリクスが収集されません。

| 環境変数           | 説明                                         |
| ------------------------------ | --------------------------------------------------- |
| `DD_CONTAINER_EXCLUDE`         | 除外するコンテナのブロックリスト。                |
| `DD_CONTAINER_EXCLUDE_METRICS` | メトリクスが除外されるコンテナのブロックリスト。|
| `DD_CONTAINER_EXCLUDE_LOGS`    | ログが除外されるコンテナのブロックリスト。   |
| `DD_CONTAINER_INCLUDE`         | 含めるコンテナの許可リスト。                |
| `DD_CONTAINER_INCLUDE_METRICS` | メトリクスが含まれるコンテナの許可リスト。|
| `DD_CONTAINER_INCLUDE_LOGS`    | ログが含まれるコンテナの許可リスト。    |

{{% collapse-content title="環境変数を設定する" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator で、これらの環境変数を `spec.override.nodeAgent.env` の下に設定します。

##### 例 {#example}

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

Helm チャートでは、スペースで区切られた文字列を以下のいずれかに提供します。
- `datadog.containerExclude`
- `datadog.containerInclude`
- `datadog.containerExcludeLogs`
- `datadog.containerIncludeLogs`
- `datadog.containerExcludeMetrics`
- `datadog.containerIncludeMetrics`

##### 例 {#example-1}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "コンテナ化された Agent" %}}

Datadog Operator や Helm を使用していない環境では、起動時に以下の環境変数を Agent コンテナに渡すことができます。

##### Docker の例 {#example-docker}

```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### ECS の例 {#example-ecs}

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

{{% /collapse-content %}}

<div class="alert alert-info">

イメージ名フィルター (`image`) は、レジストリやイメージタグまたはダイジェストを含む完全なイメージ名に対して一致します (例:`dockerhub.io/nginx:1.13.1`)。

</div>

#### 例 {#examples}

`dd-agent` という名前のコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

すべてのタグとダイジェストを含む `dockercloud/network-daemon` イメージを使用しているコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon(@sha256)?:.*
```

`dockercloud/network-daemon:1.13.0` イメージを使用しているコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon:1.13.0$"
```

`agent` の単語を含むイメージを持つ任意のコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "image:agent"
```

レジストリに関係なく `foo` イメージを使用している任意のコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "image:^.*/foo(@sha256)?:.*"
```

すべてのコンテナを除外するには

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

代わりに、`image:.*` または `kube_namespace:.*` を使用することもできます。`name:`、`image:`、または `kube_namespace:` のプレフィックスを付けずに `.*` 構成しても動作しません。

### 包含動作と除外動作 {#inclusion-and-exclusion-behavior}

一般的に、含める操作は除外する操作よりも優先されます。例えば、`ubuntu` や `debian` のイメージだけを監視したい場合は、まず他のイメージをすべて除外してからどのイメージを含めるかを指定します。

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/ubuntu(@sha256)?:.* image:^docker.io/library/debian(@sha256)?:.*"
```

このルールの唯一の例外は、`ad.datadoghq.com/exclude` のような Pod 除外アノテーションです。アプリケーションに除外アノテーションが `true` に設定されている場合はこれが優先され、コンテナはモニタリングのために自動検出から除外されます。例えば、`DD_CONTAINER_INCLUDE = "image:.*"` のようにすべてのコンテナを含む条件を持っていても、除外アノテーションが設定されている場合はそのコンテナが必ず含まれるとは限りません。詳細については、[コンテナディスカバリー管理 - Pod 除外構成](#pod-exclude-configuration)を参照してください。

カテゴリをまたがる包含/除外ルールを混在させることはできません。例えば、イメージ名 `foo` を持つコンテナを含めて、イメージ名 `bar` を持つコンテナのメトリクスのみを除外したい場合、以下のようにすると**不十分**です。

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/foo(@sha256)?:.*"
```

代わりに、以下を使用します。

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE_METRICS = "image:^docker.io/library/foo(@sha256)?:.*"
DD_CONTAINER_INCLUDE_LOGS = "image:^docker.io/library/foo(@sha256)?:.*"
```

グローバルリストと選択リスト (ログとメトリクス) の間には相互作用はありません。つまり、コンテナをグローバルに除外して (`DD_CONTAINER_EXCLUDE`)、そのコンテナを `DD_CONTAINER_INCLUDE_LOGS` と `DD_CONTAINER_INCLUDE_METRICS` で含めることはできません。

### コンテナを一時停止 {#pause-containers}

Datadog Agent は、デフォルトで Kubernetes と OpenShift の pause コンテナを除外します。これにより、これらのコンテナのメトリクス収集および請求対象のコンテナとしてのカウントが防止されます。しかし、これらのコンテナは `kubernetes.containers.running` や `docker.containers.running` などのコンテナカウントメトリクスではカウントされます。

この動作を無効にし、pause コンテナの監視を含めるには

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator で、これらの環境変数を `spec.override.nodeAgent.env` の下に設定します。

##### 例 {#example-2}

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

##### 例 {#example-3}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "コンテナ化された Agent" %}}

Helm や Operator を使用していない環境では、起動時に以下の環境変数を Agent コンテナに渡すことができます。

`DD_EXCLUDE_PAUSE_CONTAINER` を `false` に設定します。
{{% /tab %}}
{{< /tabs >}}

## 高度な CEL 除外 {#advanced-cel-exclusion}

**Agent v7.73+** では、`cel_workload_exclude` 構成オプションを使用して Autodiscovery からコンテナをフィルタリングできます。この機能により、テレメトリ収集から除外するコンテナをターゲットにする[共通表現言語][3]ルールを定義できます。

フィルタリングルールでコンテナオブジェクトを表すには、次の属性を使用します。

| 属性                   | 説明                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `container.name`            | コンテナの名前。                                             |
| `container.image.reference` | コンテナイメージの完全な参照 (レジストリ、リポジトリ、タグ/ダイジェスト)。|
| `container.pod.name`        | コンテナを実行している Pod の名前。                             |
| `container.pod.namespace`   | Pod の Kubernetes ネームスペース。                                   |
| `container.pod.annotations` | Pod に適用されるアノテーション (キーバリューマップ)。                    |

### コンフィギュレーション構造 {#configuration-structure}

`cel_workload_exclude`構成オプションは、論理関数 OR として評価されるルールセットのリストとして構成されており、コンテナがいずれかのルールに一致する場合は除外されます。各ルールセットは、除外する `products` と、コンテナに対して一致させる対応する CEL `rules` を定義します。

`products` フィールドは、`metrics`、`logs`、および `global` を受け入れます (リストされたすべての製品からコンテナを除外します)。

<div class="alert alert-danger">
コンフィギュレーションに構造的エラーや CEL 構文の問題が含まれている場合、Agent はエラーで終了し、請求に影響を与える可能性のある意図しないテレメトリの収集を防ぎます。
</div>

以下の例では、名前に `nginx` を含み、`staging` ネームスペースで実行されているコンテナのメトリクスとログは除外されます。さらに、`redis` イメージを実行しているコンテナ、またはアノテーション `low_priority: "true"` を持つ Pod 内のコンテナのログは除外されます。[エージェントのコンフィギュレーションファイル][4]は、この例のように直接更新できます。

```yaml
# datadog.yaml
cel_workload_exclude:
- products: [metrics, logs]
  rules:
    containers:
      - container.name.matches("nginx") && container.pod.namespace == "staging"
- products: [logs]
  rules:
    containers:
      - container.image.reference.matches("redis")
      - container.pod.annotations["low_priority"] == "true"
```

次のいずれかの方法を使用して、CEL バックのワークロード除外を構成することもできます。
- 任意のコンテナ化された Agent セットアップで、JSON 形式の文字列を含む `DD_CEL_WORKLOAD_EXCLUDE` 環境変数を設定します。
- Datadog Operator または Helm チャートの場合、適切な構成オプションに CEL ルールを追加します (以下の例に示すように)。

{{% collapse-content title="CEL 除外ルールの構成" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator (>=v1.23.0) で、`spec.override.nodeAgent.celWorkloadExclude` および `spec.override.clusterAgent.celWorkloadExclude` オプションを使用します。

##### 例 {#example-4}

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
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
    clusterAgent:
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm Chart で、`datadog.celWorkloadExclude` 構成オプションを使用します。

##### 例 {#example-5}

```yaml
datadog:
  celWorkloadExclude:
  - products: [global]
    rules:
      containers:
        - container.name == "redis"
```

{{% /tab %}}
{{% tab "コンテナ化された Agent" %}}

Helm や Operator を使用していない環境では、起動時に以下の環境変数を Agent コンテナに渡すことができます。

##### Docker の例 {#example-docker-1}

```shell
docker run -e DD_CEL_WORKLOAD_EXCLUDE=<JSON_CEL_RULES> ...
```

##### ECS の例 {#example-ecs-1}

```json
"environment": [
  {
    "name": "DD_CEL_WORKLOAD_EXCLUDE",
    "value": "<JSON_CEL_RULES>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="構成オプションの検証" level="h4" expanded=false id="validating-configuration-option" %}}

`agent workloadfilter verify-cel` コマンドを使用して、デプロイする前にコンフィギュレーション構文を検証します。標準入力を介して YAML または JSON 入力を受け入れます。次の例は、未定義のフィールドエラーをキャッチする検証を示しています。

```json
### cel-config.json
[
  {
    "products": ["metrics"],
    "rules":
      {
        "containers":
          [
            'container.undefined_field == "test"',
            'container.name.startsWith("-agent")',
          ],
      },
  },
]
```

```bash
agent workloadfilter verify-cel < cel-config.json

-> Validating CEL Configuration
    Loading YAML file...
✓ YAML loaded successfully (1 bundle(s))

-> Validating configuration structure...
✓ Configuration structure is valid

-> Compiling CEL rules...

  -> metrics
    Resource: container (2 rule(s))
      ✗ Compilation failed: ERROR: <input>:1:10: undefined field 'undefined_field'
 | container.undefined_field == "test" || container.name.startsWith("-agent")
 | .........^
        Rule 1: container.undefined_field == "test"
        Rule 2: container.name.startsWith("-agent")

✗ Validation failed - some rules have errors
Error: CEL compilation failed
```

{{% /collapse-content %}}

#### ルールの例 {#example-rules}

特定の Pod アノテーションを持つコンテナを除外するには

```yaml
container.pod.annotations["monitoring"] == "false"
```

部分文字列 `-dev` を持たないネームスペース内のコンテナを除外するには

```yaml
!container.pod.namespace.matches("-dev")
```

ネームスペース `prod` でのみ`nginx-server` という名前のコンテナを除外するには

```yaml
container.name == "nginx-server" && container.pod.namespace == "prod"
```

部分文字列 `nginx` を持つイメージを実行しているコンテナを除外するには

```yaml
container.image.reference.matches("nginx")
```

グループ化されたロジックを使用してコンテナを除外するには (例: 2 つのネームスペースのいずれかに特定のコンテナ名がある)

```yaml
container.name == "redis" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

Pod のオーナー名に基づいてコンテナを除外するには (例: `my-app` という名前の Deployment または CronJob によって作成されたすべてのコンテナをターゲットにする)

```yaml
container.pod.name.startsWith("my-app")
```

特定のネームスペースセットのコンテナ**のみを含める**には

```yaml
!(container.pod.namespace in ["foo", "bar", "baz"])
```

## Pod 除外構成 {#pod-exclude-configuration}

**Agent v7.45+** では、Kubernetes Pod にアノテーションを設定してオートディスカバリーを制御できます。除外ルールを追加するには、以下のアノテーションに値 `"true"` を設定します。

| アノテーション                                          | 説明                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ad.datadoghq.com/exclude`                          | Pod 全体を除外                                                          |
| `ad.datadoghq.com/logs_exclude`                     | Pod 全体からのログ収集を除外                                      |
| `ad.datadoghq.com/metrics_exclude`                  | Pod 全体からのメトリクス収集を除外                                   |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude`         | Pod 内の `<CONTAINER_NAME>` を持つコンテナを除外                        |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude`    | Pod 内の`<CONTAINER_NAME>` を持つコンテナからのログ収集を除外    |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Pod 内の `<CONTAINER_NAME>` を持つコンテナからのメトリクス収集を除外|

アプリケーション Pod に設定された `ad.datadoghq.com/exclude` アノテーションが最優先されます。つまり、コンテナが `DD_CONTAINER_INCLUDE` を通じてインクルージョンに一致したとしても、Agent はそのコンテナのモニタリングを無視します。メトリクスとログに特有のそれぞれのフィルタリング構成にも同じことが適用されます。

アノテーションベースの除外を適用する際、Agent はコンテナ上のすべての関連する除外アノテーションをチェックします。例えば、NGINX コンテナのログを構成する際、Agent は Pod 上の `ad.datadoghq.com/exclude`、`ad.datadoghq.com/logs_exclude`、`ad.datadoghq.com/nginx.exclude`、または `ad.datadoghq.com/nginx.logs_exclude` アノテーションが `true` であるかを確認します。メトリクスにも同じことが適用されます。

#### Pod 全体を除外 {#exclude-the-entire-pod}

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

#### コンテナからのログ収集を除外 {#exclude-log-collection-from-a-container}

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

### 準備のできていない Pod を許容 {#tolerate-unready-pods}

デフォルトでは、`unready` Pod は Datadog Agent がチェックをスケジュールしたときに無視されます。そのため、これらの Pod から、メトリクス、サービスチェック、およびログは収集されません。この挙動をオーバーライドするためには、アノテーション `ad.datadoghq.com/tolerate-unready` を `"true"` に設定してください。例:

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

## セキュリティ構成 {#security-configuration}

**Agent v7.70+** では、特定のコンテナに対するセキュリティモニタリングを制限できるため、モニターしたいコンテナに対してのみ課金されます。Datadog Operator ではこの機能はサポートされていません。

{{< tabs >}}
{{% tab "Helm" %}}

| 機能                               | コンテナを含める                                   | コンテナを除外する                                   |
|---------------------------------------|-----------------------------------------------------|-----------------------------------------------------|
| [Cloud Security の誤構成][1] | `datadog.securityAgent.compliance.containerInclude` | `datadog.securityAgent.compliance.containerExclude` |
| [Cloud Security の脆弱性][2]   | `datadog.sbom.containerImage.containerInclude`      | `datadog.sbom.containerImage.containerExclude`      |
| [Workload Protection][3]              | `datadog.securityAgent.runtime.containerInclude`    | `datadog.securityAgent.runtime.containerExclude`    |

[1]: /ja/security/cloud_security_management/misconfigurations/
[2]: /ja/security/cloud_security_management/vulnerabilities
[3]: /ja/security/workload_protection/
{{% /tab %}}
{{% tab "構成ファイル" %}}
[Cloud Security の脆弱性][1]については、コンテナを含めるか除外するために構成ファイルで次の形式を使用できます。

```
---
sbom:
  container_image:
    container_include: ...
    container_exclude: ...
```
[1]: /ja/security/cloud_security_management/vulnerabilities
{{% /tab %}}
{{% tab "コンテナ化された Agent" %}}
Helm や Operator を使用していない環境では、起動時に以下の環境変数を Agent コンテナに渡すことができます。

| 機能                               | コンテナを含める                              | コンテナを除外する                              |
|---------------------------------------|------------------------------------------------|------------------------------------------------|
| [Cloud Security の誤構成][1] | `DD_COMPLIANCE_CONFIG_CONTAINER_INCLUDE`       | `DD_COMPLIANCE_CONFIG_CONTAINER_EXCLUDE`       |
| [Cloud Security の脆弱性][2]   | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE`    | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE`    |
| [Workload Protection][3]              | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_INCLUDE` | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_EXCLUDE` |

[1]: /ja/security/cloud_security_management/misconfigurations/
[2]: /ja/security/cloud_security_management/vulnerabilities
[3]: /ja/security/workload_protection/
{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/kubernetes/log/?tab=helm#log-collection
[2]: /ja/getting_started/containers/autodiscovery
[3]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[4]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file