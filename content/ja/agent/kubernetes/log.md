---
title: Kubernetes ログの収集
kind: documentation
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
---
Agent がログを収集する方法には、[Docker ソケット][1]から収集する方法と、[Kubernetes ログファイル](#ログの収集)から収集する方法 (Kubernetes によって自動的に処理されます) の 2 つがあります。次の場合、Datadog では Kubernetes ログファイルの使用を推奨しています。

* Docker がランタイムではない、**または**
* 各ノードで 10 個を超えるコンテナが使用されている

Docker API は、一度に 1 つのコンテナからログを取得するように最適化されています。同じポッドに多数のコンテナがある場合、Docker ソケットからログを収集すると、Kubernetes ログファイルロジックで収集するより、はるかに多くのリソースを消費する可能性があります。

## ログの収集

アプリケーションのログを収集するには、[Kubernetes クラスターで Datadog Agent を実行する][2]必要があります。Agent でログの収集を有効にするには、次の手順に従ってください。

{{< tabs >}}
{{% tab "DaemonSet " %}}

**注**: このオプションは Windows ではサポートされません。代わりに Helm オプションを使用してください。

DaemonSet によるログの収集を有効にするには

1. `datadog.yaml` Agent  マニフェストの *env* セクションで、`DD_LOGS_ENABLED` 変数と `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 変数を true に設定します。

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE
          value: "name:datadog-agent"
     # (...)
    ```

    **注**: `DD_CONTAINER_EXCLUDE` を設定すると、Datadog Agent で自身のログ収集および送信が実行されなくなります。Datadog Agent ログを収集する場合は、このパラメーターを削除します。詳細については、[コンテナのディスカバリー管理][1]を参照してください。OpenShift 環境内で ImageStreams を使用する場合は、`DD_CONTAINER_INCLUDE` にコンテナの `name` を設定してログを収集します。これらパラメーター値（除外/含む）は正規表現をサポートします。

2. 再起動やネットワーク障害の際にコンテナログを失わないように、`pointdir` ボリュームをマウントします。`/var/log/pods` がこのディレクトリへのシンボリックリンクであるため、Kubernetes ログファイルからログを収集するよう `/var/lib/docker/containers` もマウントします。

    ```yaml
      # (...)
        volumeMounts:
        #  (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
         - name: logpodpath
           mountPath: /var/log/pods
         # Docker runtime directory, replace this path
         # with your container runtime logs directory,
         # or remove this configuration if `/var/log/pods`
         # is not a symlink to any other directory.
         - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
       # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

   `pointdir` は、Agent がログを収集するすべてのコンテナへのポインターを含むファイルを格納するために使用されます。これは、Agent が再起動したり、ネットワークに問題があった場合でも、何も失われないようにするためです。

### 非特権

(オプション) 非特権インストールを実行するには、[ポッドテンプレート][2]に以下を追加します。

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

Agent が非ルートユーザーで実行しているときは、`/var/lib/docker/containers` に含まれるログファイルを直接読み取れません。この場合、Docker Daemon からコンテナログをフェッチできるよう、Agent コンテナの Docker ソケットをマウントする必要があります。

[1]: /ja/agent/guide/autodiscovery-management/
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
{{% tab "Operator" %}}

`datadog-agent.yaml` マニフェストを次のように更新します。

```
agent:
  image:
    name: "gcr.io/datadoghq/agent:latest"
  log:
    enabled: true
```

完全な例については、[ログ とメトリクス収集が有効になっているマニフェスト][1]の例を参照してください。

次に、新しいコンフィギュレーションを適用します。

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

## 非特権

(オプション) 非特権インストールを実行するには、[Datadog CR][8] に以下を追加します。

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://github.com/DataDog/datadog-operator/blob/master/examples/datadog-agent-logs.yaml
{{% /tab %}}
{{< /tabs >}}

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

* [Kubernetesポッドアノテーション](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [key-value ストア](?tab=keyvaluestore#configuration)

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
{{< /tabs >}}

### 例 - Datadog Redis インテグレーション

{{< tabs >}}
{{% tab "Kubernetes" %}}

以下のポッドアノテーションは、カスタム `password` パラメーターを使用して `redis` コンテナのインテグレーションテンプレートを定義し、すべてのログに正しい `source` および `service` 属性でタグ付けします。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"redis"}]'
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

次の ConfigMap は、ログを収集するための `source` 属性と `service` 属性を使用して、`redis` コンテナのインテグレーションテンプレートを定義しています。

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redis-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    logs:
      source: redis
      service: redis
```

マニフェストで `volumeMounts` と `volumes` を定義します。

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # [...]
      volumes:
      # [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成し、すべてのログに正しい `source` および `service` 属性でタグ付けします。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をインテグレーション構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

auto-conf ファイルとは異なり、**key-value ストアの場合は、コンテナ識別子として短いイメージ名 (`redis` など) も長いイメージ名 (`redis:latest` など) も使用できます**。

{{% /tab %}}
{{< /tabs >}}


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