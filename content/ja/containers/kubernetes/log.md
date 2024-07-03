---
aliases:
- /ja/agent/kubernetes/log
further_reading:
- link: /agent/kubernetes/apm/
  tag: Documentation
  text: Collect your application traces
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Collect your Prometheus metrics
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Collect automatically your applications metrics and logs
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Assign tags to all data emitted by a container
title: Kubernetes log collection
---

このページでは、Kubernetes ログファイルからのログの収集について説明します。

Datadog Agent のログの収集方法は 2 通りあり、Kubernetes ログファイルか [Docker ソケット][1]を使用します。Datadog では、以下の場合、Kubernetes ログファイルの使用を推奨しています。

* Docker がランタイムではない、**または**
* 各ノードで 10 個を超えるコンテナが使用されている

Docker API は、一度に 1 つのコンテナからログを取得するように最適化されています。同じノードに多数のコンテナがある場合、Docker ソケットからログを収集すると、Kubernetes ログファイルを通じて収集するより多くのリソースを消費する可能性があります。Docker ソケットを使用したログの収集方法については、[Docker ソケットによるログ収集][1]を参照してください。

## ログ収集

アプリケーションログの収集を開始する前に、Kubernetes クラスターで Datadog Agent が実行されていることを確認してください。

DaemonSet を使用したログ収集の構成については、[DaemonSet ログ収集][9]を参照してください。それ以外の場合は、以下の手順に従ってください。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` マニフェストを次のように更新します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

完全な例は、[ログとメトリクスの収集が有効なマニフェスト][1]例を参照してください。`features.logCollection.containerCollectAll` を `true` に設定すると、デフォルトで検出されたすべてのコンテナからログを収集することができます。`false` (デフォルト) に設定すると、ログ収集を有効にするためにオートディスカバリーのログ構成を指定する必要があります。

### 非特権

(オプション) 非特権インストールを実行するには、[DatadogAgent カスタムリソース][2] に以下を追加します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

  override:
    nodeAgent:
      securityContext:
        runAsUser: <USER_ID>
        supplementalGroups:
          - <DOCKER_GROUP_ID>
```

- `<USER_ID>` を Agent を実行する UID に置き換えます。
- `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-with-logs-apm.yaml
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

Helm によるログの収集を有効にするには、次のログ収集コンフィギュレーションで [datadog-values.yaml][1] ファイルを更新してから、Datadog Helm チャートをアップグレードします。

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

`datadog.logs.containerCollectAll` を `true` に設定すると、デフォルトで検出されたすべてのコンテナからログを収集することができます。`false` (デフォルト) に設定すると、ログ収集を有効にするためにオートディスカバリーのログ構成を指定する必要があります。

### 非特権

(オプション) 非特権インストールを実行するには、`values.yaml` ファイルに以下を追加します。

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

- `<USER_ID>` を Agent を実行する UID に変更します。
- `<DOCKER_GROUP_ID>` を Docker または containerd ソケットを所有するグループ ID に置き換えます。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">
<strong>非特権インストールに関する警告</strong>
<br/><br/>
非特権インストールを実行する場合、Agent は <code>/var/log/pods</code> にあるログファイルを読み取ることができる必要があります。
<br/><br/>
containerd ランタイムを使用している場合、<code>/var/log/pods</code> にあるログファイルは、<code>root</code> グループのメンバーが読み取り可能です。上記の手順により、Agent は <code>root</code> グループで実行されます。何も作業は必要はありません。
<br/><br/>
Docker ランタイムを使用している場合、<code>/var/log/pods</code> にあるログファイルは、<code>root</code> ユーザーのみがトラバース可能な <code>/var/lib/docker/containers</code> へのシンボリックリンクになります。そのため、Docker ランタイムを使用すると、<code>root</code> 以外の Agent が<code>/var/log/pods</code> 内のログを読み取ることはできません。Agent コンテナ に Docker ソケットをマウントし、Docker デーモンを介してポッドログを取得できるようにする必要があります。
<br/><br/>
Docker ソケットがマウントされている場合に <code>/var/log/pods</code> からログを収集するには、環境変数 <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (または <code>Datadog.yaml</code> の <code>logs_config.k8s_container_use_file</code>) を <code>true</code> に設定します。これにより、Agent がファイル収集モードを使用するようになります。
</div>

## インテグレーションログ

[オートディスカバリー][10]では、テンプレートを使ってコンテナ上でログ収集 (およびその他の機能) の構成を行うことができます。

オートディスカバリーを使用してインテグレーションのログ収集を構成するには、以下のパラメーターを使用します。

| パラメーター            | 必須 | 説明                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<LOG_CONFIG>`       | いいえ       | Agent v6.5 以上における、特定の Datadog-`<INTEGRATION_NAME>` の `logs:` セクションの構成 |

`<LOG_CONFIG>` のスキーマはインテグレーションに依存します。このスキーマは、各インテグレーションの `conf.yaml.example` ファイルで確認できます。

### 構成

{{< tabs >}}
{{% tab "Kubernetes ポッドアノテーション" %}}
Autodiscovery では、Agent が自動的にすべてのポッドアノテーションを対象にインテグレーションテンプレートを検索します。

オートディスカバリーは、特定の構成を特定のコンテナに適用するために、イメージ**ではなく**名前でコンテナを識別します。`<CONTAINER_IDENTIFIER>` を `.spec.containers[0].image` ではなく、`.spec.containers[0].name` と一致させようと試みます。

<div class="alert alert-info">
Kubernetes ポッドを (<code>kind:Pod</code> で) <i>直接</i>定義する場合は、次のセクションに示すように、各ポッドのアノテーションを <code>metadata</code> セクションに追加します。
<br/><br/>
Kubernetes ポッドを<i>間接的に</i> (レプリケーションコントローラー、ReplicaSets、またはデプロイメントを使用して) 定義する場合は、<code>.spec.template.metadata</code> の下にポッドアノテーションを追加します。</div>

#### 単一コンテナの構成
ポッド内の特定の `<CONTAINER_IDENTIFIER>` についてログ収集を構成するには、次のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<ポッド名>'
  annotations:
    ad.datadoghq.com/<コンテナ識別子>.logs: '[<ログ_コンフィグ>]'
    # (...)
spec:
  containers:
    - name: '<コンテナ識別子>'
# (...)
```

#### 2 つの異なるコンテナの構成
ポッド内の 2 つの異なるコンテナ `<CONTAINER_IDENTIFIER_1>` と `<CONTAINER_IDENTIFIER_2>` に 2 つの異なるインテグレーションテンプレートを適用するには、次のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<ポッド名>'
  annotations:
    ad.datadoghq.com/<コンテナ識別子_1>.logs: '[<ログ_コンフィグ_1>]'
    # (...)
    ad.datadoghq.com/<コンテナ識別子_2>.logs: '[<ログ_コンフィグ_2>]'
spec:
  containers:
    - name: '<コンテナ識別子_1>'
    # (...)
    - name: '<コンテナ識別子_2>'
# (...)
```

{{% /tab %}}

{{% tab "Key-value ストア" %}}

オートディスカバリーでは、[Consul][1]、Etcd、および Zookeeper をインテグレーションテンプレートソースとして使用できます。

key-value ストアを使用するには、Agent の `datadog.yaml` コンフィギュレーションファイルでストアを構成し、このファイルをコンテナ化 Agent 内にマウントします。または、key-value ストアを環境変数としてコンテナ化 Agent に渡します。

#### `datadog.yaml` の場合

`datadog.yaml` ファイルで、key-value ストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を以下のように設定します。

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

次に、[Agent を再起動][2]して、構成の変更を適用します。

#### 環境変数の場合

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下でテンプレートを探します。オートディスカバリーは、以下のような key-value 階層を前提とします。

```yaml
/datadog/
  check_configs/
    <コンテナ識別子>/
      - logs: ["<ログ_コンフィグ>"]
    ...
```

**注**: key-value ストアを使用している場合、オートディスカバリーは特定の構成を特定のコンテナに適用するために、`<CONTAINER_IDENTIFIER>` と `.spec.containers[0].image` の一致を試みることで、コンテナを**イメージ**で識別します。

[1]: /ja/integrations/consul/
[2]: /ja/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

### 例
#### Datadog-Redis インテグレーション

{{< tabs >}}
{{% tab "Kubernetes ポッドアノテーション" %}}

以下のポッドアノテーションは、Redis コンテナのインテグレーションテンプレートを定義します。すべてのログに `source` および `service` 属性でタグ付けします (カスタムタグを含む)。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "init_config": {},
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }  
    ad.datadoghq.com/redis.logs: '[{"source": "redis","service": "<YOUR_APP_NAME>","tags": ["env:prod"]}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}
{{% tab "Key-value store" %}}
以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成し、すべてのログに正しい `source` および `service` 属性でタグ付けします。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をインテグレーション構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

auto-conf ファイルとは異なり、**key-value ストアの場合は、コンテナ識別子として短いイメージ名 (`redis` など) も長いイメージ名 (`redis:latest` など) も使用できます**。

{{% /tab %}}
{{< /tabs >}}

`source` および `service` 属性の詳細については、[予約済み属性][11]を参照してください。

#### アノテーションで構成したファイルから

Datadog では、より自動的にログ収集を設定できるように、コンテナ化されたアプリケーションには `stdout` と `stderr` の出力ストリームを使用することを推奨しています。しかし、Agent は、アノテーションに基づいてファイルから直接ログを収集することもできます。これらのログを収集するには、`ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs` を `type: file` と `path` の構成で使用します。このようなアノテーションを持つファイルから収集されたログは、コンテナ自体から来るログと同じタグのセットで自動的にタグ付けされます。

これらのファイルパスは、Agent に対して **相対的** なものです。したがって、ログファイルを含むディレクトリをアプリケーションと Agent コンテナの両方にマウントして、Agent が適切に可視化できるようにする必要があります。

例えば、共有の `hostPath` ボリュームを使用してこれを行うことができます。下記の Pod は `/var/log/example/app.log` というファイルにログを出力しています。これは `/var/log/example` ディレクトリで行われ、ボリュームと volumeMount がこれを `hostPath` として設定しています。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: logger
  annotations:
    ad.datadoghq.com/busybox.logs: |
      [{
          "type": "file",
          "path": "/var/log/example/app.log",
          "source": "example-source",
          "service": "example-service"
      }]
spec:
  containers:
   - name: busybox
     image: busybox
     command: [ "/bin/sh", "-c", "--" ]
     args: [ "while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;" ]
     volumeMounts:
     - name: applogs
       mountPath: /var/log/example
  volumes:
     - name: applogs
       hostPath:
         path: /var/log/example
```

Agent コンテナに同等のボリュームと VolumeMount パスを設定し、同じログファイルを読み込むことができるようにする必要があります。

```yaml
  containers:
  - name: agent
    # (...)
    volumeMounts:
    - mountPath: /var/log/example
      name: applogs
    # (...)
  volumes:
  - name: applogs
    hostPath:
      path: /var/log/example
    # (...)
```

**注:** この種のアノテーションをコンテナで使用する場合、`stdout` と `stderr` ログはコンテナから自動的に収集されません。コンテナとファイルの両方からの収集が必要な場合は、アノテーションで明示的に有効にする必要があります。次に例を示します。

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: |
  [
    {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
    {"source":"container","service":"example-service"}
  ]
```

この種の組み合わせを使用する場合、`source` と `service` にはファイルから収集されたログのデフォルト値がないため、アノテーションで明示的に設定する必要があります。

## 高度なログの収集

オートディスカバリーログラベルを使用し、高度なログ収集の処理ロジックを適用します。たとえば、

* [Datadog へ送信する前にログを絞り込む][5]。
* [ログの機密データのスクラビング][6]。
* [複数行の集約の実行][7]。

## コンテナを絞り込む

ログの収集元となる対象コンテナを管理することができます。Datadog Agent のログを収集しないようにするには便利な方法です。詳細については[コンテナのディスカバリー管理][8]を参照してください。

## 存続期間が短いコンテナ

デフォルトでは、Agent は 5 秒ごとに新しいコンテナを探します。

Agent v6.12+ では、K8s ファイルログ収集方法 (`/var/log/pods` 経由) を使用している場合、存続期間の短いコンテナのログ (停止またはクラッシュ) が自動的に収集されます。これには、収集初期化コンテナログも含まれます。

## トラブルシューティング

#### 新しいコンテナやポッドでタグが欠落している場合

新しく作成されたコンテナまたはポッドからログを Datadog に送信する場合、Datadog Agent の内部タグ設定機能が、関連するコンテナまたはポッドのタグをまだ持っていない可能性があります。その結果、これらのログからタグが欠落することがあります。

この問題を解決するには、環境変数 `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` を使用して、Datadog Agent が新しく作成されたコンテナやポッドからログの送信を開始するまでの待機時間 (秒単位) を構成します。デフォルト値は `0` です。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
          value: "5"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION
      value: "5"
```
{{% /tab %}}
{{< /tabs >}}

#### 新しいホストまたはノードでホストレベルのタグが欠落している場合

ホストレベルタグは、特定のホストのインフラストラクチャーリストに表示されるタグで、クラウドプロバイダーまたは Datadog Agent のいずれかから供給されます。代表的なホストレベルタグは、`kube_cluster_name`、`region`、`instance-type`、`autoscaling-group` などです。

新しく作成されたホストまたはノードから Datadog にログを送信する場合、ホストレベルタグが[継承][12]されるまでに数分かかることがあります。その結果、ホストレベルタグがこれらのログから欠落する可能性があります。 

この問題を解決するには、環境変数 `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` を使用して、継続時間 (分単位) を構成できます。この期間中、Datadog Agent は、知っているホストレベルタグを、送信された各ログに手動でアタッチします。この期間を過ぎると、Agent は取り込み時のタグの継承に依拠するようになります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
          value: "10m"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
      value: "10m"
```
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/log-collection-with-docker-socket/
[2]: /ja/agent/kubernetes/
[3]: /ja/integrations/#cat-autodiscovery
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /ja/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /ja/agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /ja/agent/guide/autodiscovery-management/
[9]: /ja/containers/guide/kubernetes_daemonset/#log-collection
[10]: /ja/getting_started/containers/autodiscovery
[11]: /ja/logs/log_configuration/attributes_naming_convention/
[12]: /ja/getting_started/tagging/assigning_tags/#integration-inheritance