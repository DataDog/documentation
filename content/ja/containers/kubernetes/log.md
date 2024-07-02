---
aliases:
- /ja/agent/kubernetes/log
further_reading:
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/kubernetes/integrations/
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動で収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
title: Kubernetes ログの収集
---

Agent がログを収集する方法には、[Docker ソケット][1]から収集する方法と、[Kubernetes ログファイル](#ログの収集)から収集する方法 (Kubernetes によって自動的に処理されます) の 2 つがあります。次の場合、Datadog では Kubernetes ログファイルの使用を推奨しています。

* Docker がランタイムではない、**または**
* 各ノードで 10 個を超えるコンテナが使用されている

Docker API は、一度に 1 つのコンテナからログを取得するように最適化されています。同じノードに多数のコンテナがある場合、Docker ソケットからログを収集すると、Kubernetes ログファイルロジックで収集するより、はるかに多くのリソースを消費する可能性があります。

## ログの収集

アプリケーションのログを収集するには、[Kubernetes クラスターで Datadog Agent を実行する][2]必要があります。Agent でログの収集を有効にするには、次の手順に従ってください。

{{< tabs >}}
{{% tab "Operator" %}}

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

完全な例は、[ログとメトリクスの収集が有効なマニフェスト][1]例を参照してください。`features.logCollection.containerCollectAll` を `true` に設定すると、デフォルトで検出されたすべてのコンテナからログを収集することができます。`false` (デフォルト) に設定すると、ログ収集を有効にするためにオートディスカバリーのログ構成を指定する必要があります。

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

## 非特権

(オプション) 非特権インストールを実行するには、[DatadogAgent Custom Resource][2] に以下を追加します。

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

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-logs.yaml
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

Helm によるログの収集を有効にするには、次のログ収集コンフィギュレーションで [datadog-values.yaml][1] ファイルを更新してから、Datadog Helm チャートをアップグレードします。

```yaml
datadog:
  ## @param logs - object - required
  ## ログ Agent を有効にし、カスタムコンフィグを提供
  #
  logs:
    ## @param enabled - boolean - optional - default: false
    ## これを有効にし、Datadog Agent のログの収集を開始します。
    #
    enabled: true

    ## @param containerCollectAll - boolean - optional - default: false
    ## これを有効にし、すべてのコンテナのログの収集を可能にします。
    #
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

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

DaemonSet を使用したログ収集の構成は、[DaemonSet ログ収集][9]を参照してください。

**警告**: 非特権インストールを実行する際、Agent が `/var/log/pods` のログファイルを読み取れる必要があります。
`containerd` の場合、`/var/log/pods` のログファイルは `root` グループのメンバーに読み取り可能です。上記の手順により、`Agent` が依然として `root` グループで実行しているため、動作します。
`docker` の場合、`/var/log/pods` のログファイルは  `root` ユーザーによってのみ走査可能な、`/var/lib/docker/containers` へのシンボリックリンクです。したがって、`docker` の場合は非`root` Agentが `/var/log/pods` のポッドログを読み取ることは不可能です。Docker ソケットは、Docker Daemon を通じてポッドログを取得できるよう、Agent のコンテナにマウントされている必要があります。

**注**: Docker ソケットがマウントされていても、`/var/log/pods` からログを収集したい場合は、Agent にファイル収集モードを強制するために環境変数 `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` (または `datadog.yaml` 内の `logs_config.k8s_container_use_file`) を `true` に設定します。

## オートディスカバリー

オートディスカバリーの目的は、特定のコンテナに対して Agent チェックを実行するときに、Datadog インテグレーションのログコンフィギュレーションを適用することです。このロジックの詳細については、ホストで Agent を実行している場合の [Agent インテグレーションの構成方法][1]ドキュメントを参照してください。

オートディスカバリーを使用してインテグレーションを構成するには、以下のパラメーターを使用します。

| パラメーター            | 必須 | 説明                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<LOG_CONFIG>`       | ✕       | Agent v6.5 以上における、特定の Datadog-`<INTEGRATION_NAME>` の `logs:` セクションの構成 |

[**オートディスカバリー対応の Agent インテグレーションの完全なリストとそれらのパラメーターの例をご覧ください**][3]

以下の各セクションのタブで、特定のコンテナにインテグレーションテンプレートを適用するそれぞれの方法を示します。次の方法があります。

* [Kubernetes ポッドアノテーション](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [Key-Value ストア](?tab=keyvaluestore#configuration)
* [Helm](?tab=helm#configuration)

### コンフィギュレーション

**注**: Datadog では、ポッドアノテーションを使い `service` 値を設定する際のベストプラクティスとして、統合サービスタグ付けの使用をお勧めしています。統合サービスタグ付けは `env`、`service`、`version` の 3 つの標準タグを使用して、ログを含むすべての Datadog テレメトリーと結合します。ご使用環境で統合タグ付けを構成する方法に関する詳細は、[統合サービスタグ付け][4]ドキュメントをご参照ください。

{{< tabs >}}
{{% tab "Kubernetes" %}}

インテグレーションテンプレートは、Kubernetes のポッドアノテーションに格納できます。オートディスカバリーを使用して、Agent は、自身が Kubernetes 上で実行されているかどうかを検出し、すべてのポッドアノテーションでインテグレーションテンプレートを自動的に探します。

特定のコンフィギュレーションを特定のコンテナに適用するために、オートディスカバリーはコンテナをイメージではなく、**名前**で識別します。つまり、`<コンテナ識別子>` は、`.spec.containers[0].image` とではなく `.spec.containers[0].name` との一致が試みられます。ポッド内の特定の `<コンテナ識別子>` で Datadog インテグレーションのオートディスカバリーを構成するには、以下のアノテーションをポッドに追加します。

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

**注**: `kind: Pod` を使用して Kubernetes ポッドを直接定義する場合は、各ポッドのアノテーションを `metadata` セクションの直下に追加します。Replication Controller、Replica Set、または Deployment を使用してポッドを間接的に定義する場合は、ポッドアノテーションを `.spec.template.metadata` の下に追加します。

{{% /tab %}}
{{% tab "File" %}}

テンプレートをローカルファイルとして保存し、それをコンテナ化 Agent 内にマウントする場合は、外部サービスや特定のオーケストレーションプラットフォームを必要としません。この方法の欠点は、テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要がある点です。Agent は、マウントされた `/conf.d` ディレクトリでオートディスカバリーテンプレートを探します。

Agent v6.2.0 (および v5.24.0) 以降、デフォルトテンプレートはポートを自動検出するのではなく、監視対象ソフトウェアのデフォルトポートを使用します。別のポートを使用する必要がある場合は、[Docker コンテナラベル](?tab=docker-labels)または [Kubernetes ポッドアノテーション](?tab=kubernetes-annotations)で、カスタムオートディスカバリーテンプレートを指定します。

デフォルトのインテグレーションテンプレートは、基本的なケース向けです。追加オプションを有効にするためにカスタム Datadog インテグレーション構成が必要な場合は、別のコンテナ識別子を使用します。あるいは、テンプレート変数インデックスを使用して、独自のオートディスカバリー構成ファイルを作成します。

1. ホストに `conf.d/<INTEGRATION_NAME>.d/conf.yaml` ファイルを作成し、カスタムオートディスカバリー構成を追加します。
2. ホスト の `conf.d/` フォルダーをコンテナ化 Agent の `conf.d` フォルダーにマウントします。

**注**: これは Docker Socket 経由でログを収集する場合のみサポートされ、Kubernetes のログファイル方式を使用する場合はサポートされません。Kubernetes 環境でログ収集に Docker Socket を使用するには、ランタイムが Docker で、`DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` が `false` に設定されていることを確認してください。

**オートディスカバリー構成ファイル例**:

```text
ad_identifiers:
  <インテグレーションオートディスカバリー識別子>

logs:
  <ログ_コンフィグ>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][1]のドキュメントを参照してください。

**注**: Agent はファイル名から直接 `<INTEGRATIONS_NAME>` を推測するため、この名前を設定する必要はありません。

[1]: /ja/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

Kubernetes では、[ConfigMaps][1] を使用できます。以下のテンプレートと[Kubernetes カスタムインテグレーションに関するドキュメント][2]を参照してください。

**注**: これは Docker Socket 経由でログを収集する場合のみサポートされ、Kubernetes のログファイル方式を使用する場合はサポートされません。Kubernetes 環境でログ収集に Docker Socket を使用するには、ランタイムが Docker で、`DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` が `false` に設定されていることを確認してください。

```text
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<名前>-config-map"
  namespace: default
data:
  <インテグレーション名>-config: |-
    ad_identifiers:
      <インテグレーションオートディスカバリー識別子>
    logs:
      <ログ_コンフィグ>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][3]のドキュメントを参照してください。

[1]: /ja/agent/kubernetes/integrations/#configmap
[2]: /ja/agent/kubernetes/integrations/
[3]: /ja/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" %}}

オートディスカバリーでは、[Consul][1]、Etcd、および Zookeeper をインテグレーションテンプレートソースとして使用できます。key-value ストアを使用するには、Agent の `datadog.yaml` 構成ファイルでストアを構成し、このファイルをコンテナ化 Agent 内にマウントします。あるいは、key-value ストアを環境変数としてコンテナ化 Agent に渡します。

**datadog.yaml での構成**

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

**環境変数での構成**

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
[2]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Helm" %}}

`confd` 内で、インテグレーションごとにログコレクションをカスタマイズできます。この方法で、希望するコンフィギュレーションを Agent コンテナにマウントします。

**注**: これは Docker Socket 経由でログを収集する場合のみサポートされ、Kubernetes のログファイル方式を使用する場合はサポートされません。Kubernetes 環境でログ収集に Docker Socket を使用するには、ランタイムが Docker で、`DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` が `false` に設定されていることを確認してください。

  ```yaml
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
      init_config:
      instances:
        (...)
      logs:
        <LOGS_CONFIG>
  ```

{{% /tab %}}
{{< /tabs >}}

### 例 - Datadog Redis インテグレーション

{{< tabs >}}
{{% tab "Kubernetes" %}}

以下のポッドアノテーションは、カスタム `password` パラメーターを使用して `redis` コンテナのインテグレーションテンプレートを定義し、すべてのログに正しい `source` および `service` 属性でタグ付けします (カスタムタグを含む)。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source": "redis","service": "redis","tags": ["env:prod"]}]'
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
{{% tab "ConfigMap" %}}

次の ConfigMap は、ログを収集するための `source` と `service` 属性を持つ `redis` コンテナのインテグレーションテンプレートを定義し、そのすべてのログにカスタムタグを含む正しい `source` と `service` 属性でタグ付けします。

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redisdb-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    logs:
      - source: redis
        service: redis
        tags:
          - env:prod
```

マニフェストで `volumeMounts` と `volumes` を定義します。

```yaml
# (...)
        volumeMounts:
        # (...)
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # (...)
      volumes:
      # (...)
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# (...)
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
{{% tab "Helm" %}}

次のコンフィギュレーションは、ログを収集するための `source` 属性と `service` 属性を使用して、Redis コンテナのインテグレーションテンプレートを定義しています。
  ```yaml
  confd:
    redis.yaml: |-
      ad_identifiers:
        - redis
      logs:
        - source: redis
          service: redis
          tags: env:prod
  ```

**注**: 上記のコンフィギュレーションは、このインテグレーションからのログのみを収集します。すでに Redis インテグレーションから他のデータを収集している場合は、`logs` セクションを既存のコンフィギュレーションに追加できます。

{{% /tab %}}
{{< /tabs >}}

### 例 - アノテーションで構成されたファイルからのログ収集

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

Kubernetes のログにタグがない場合、ログが送信されるときに Agent の内部タグ付け機が関連するコンテナやポッドのタグをまだ持っていないことが原因である可能性があります。Log Agent がタグ付けの準備ができるまで数秒待つようにするには、環境変数 `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` を使用して、何秒待つかを設定します。デフォルト値は 0 です。

```yaml
# ログが送信される前に、Log Agent が内部タガーで関連するコンテナまたはポッドタグをログに追加するのを待つ秒数です。
# 例えば、Log Agent を 5 秒待つように設定するためには、値に整数を使用します。
tagger_warmup_duration: 5
```

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