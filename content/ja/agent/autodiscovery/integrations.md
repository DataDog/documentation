---
title: オートディスカバリーのインテグレーションテンプレート
kind: documentation
further_reading:
  - link: logs/
    tag: ドキュメント
    text: ログの収集
  - link: graphing/infrastructure/process
    tag: ドキュメント
    text: プロセスの収集
  - link: tracing
    tag: ドキュメント
    text: トレースの収集
---
オートディスカバリーの目的は、特定のコンテナに対して Agent チェックを実行するときに、Datadog インテグレーション構成を適用することです。このロジックのより詳細な内容については、ホストで Agent を実行している場合の [Agent インテグレーションの構成方法][1]のドキュメントを参照してください。

オートディスカバリーを使用してインテグレーションを構成するには、以下のパラメーターを使用します。

| パラメーター            | 必須 | 説明                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | はい      | Datadog インテグレーションの名前                                                                   |
| `<INIT_CONFIG>`      | はい      | `特定の Datadog-`<INTEGRATION_NAME>` の init_config:` セクションの構成           |
| `<INSTANCE_CONFIG>`  | はい      | `特定の Datadog-`<INTEGRATION_NAME>` の instances:` セクションの構成             |
| `<LOG_CONFIG>`       | いいえ       | Agent v6.5 以上における、特定の Datadog-`<INTEGRATION_NAME>` の `logs:` セクションの構成 |

以下の各セクションのタブで、特定のコンテナにインテグレーションテンプレートを適用するそれぞれの方法を示します。次の方法があります。

* [Kubernetesポッドアノテーション](?tab=kubernetes#configuration)
* [Docker ラベル](?tab=docker#configuration)
* [Agent 内にマウントされた構成ファイル](?tab=file#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [key-value ストア](?tab=keyvaluestore#configuration)

複数のテンプレートソースを使用して同じインテグレーション向けのテンプレートを提供する場合、Agent は以下の順番でテンプレートを検索し、最初に見つかったテンプレートを使用します。

* Kubernetes アノテーション
* Docker ラベル
* ファイル

**注**: サポートされているインテグレーションの一部 ([Ceph][2]、[Varnish][3]、[Postfix][4]、[Cassandra Nodetools][5]、[Gunicorn][6]) は、プロセスツリーデータまたはファイルシステムへのアクセスを必要とするため、標準のオートディスカバリーに対応していません。これらのインテグレーションでオートディスカバリーを有効にするには、ポッドで公式の Prometheus エクスポーターを使用し、次に Agent でオートディスカバリーを使用してポッドを見つけ、エンドポイントをクエリします。たとえば、Kubernetes の標準パターンは、ノードレベルまたはクラスターレベルのコレクターを持つサイドカーアダプターです。この設定によってエクスポーターはデータにアクセスでき、HTTP エンドポイントを使用してそのデータを公開します。これにより、Datadog オートディスカバリーはこのデータにアクセスできます。

## コンフィグレーション

{{< tabs >}}
{{% tab "Kubernetes" %}}

インテグレーションテンプレートは、Kubernetes のポッドアノテーションに格納できます。オートディスカバリーを使用して、Agent は、自身が Kubernetes 上で実行されているかどうかを検出し、すべてのポッドアノテーションでインテグレーションテンプレートを自動的に探します。

特定の構成を特定のコンテナに適用するために、オートディスカバリーはコンテナをイメージではなく、**名前**で識別します。つまり、`<CONTAINER_IDENTIFIER>` は、`.spec.containers[0].image` とではなく `.spec.containers[0].name` との一致が試みられます。ポッド内の特定の `<CONTAINER_IDENTIFIER>` で Datadog インテグレーションのオートディスカバリーを構成するには、以下のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<CHECK_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

ポッド内の 2 つの異なるコンテナ `<CONTAINER_IDENTIFIER_1>` と `<CONTAINER_IDENTIFIER_2>` に 2 つの異なるインテグレーションテンプレートを適用するには、次のアノテーションをポッドに追加します。

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.check_names: '[<CHECK_NAME_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.init_configs: '[<INIT_CONFIG_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.instances: '[<INSTANCE_CONFIG_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.check_names: '[<CHECK_NAME_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.init_configs: '[<INIT_CONFIG_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.instances: '[<INSTANCE_CONFIG_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER_1>'
    # (...)
    - name: '<CONTAINER_IDENTIFIER_2>'
# (...)
```

**注**: `kind: Pod` を使用して Kubernetes ポッドを直接定義する場合は、各ポッドのアノテーションを `metadata` セクションの直下に追加します。Replication Controller、Replica Set、または Deployment を使用してポッドを間接的に定義する場合は、ポッドアノテーションを `.spec.template.metadata` の下に追加します。

{{% /tab %}}
{{% tab "Docker" %}}

インテグレーションテンプレートは、Docker ラベルとして格納できます。オートディスカバリーを使用して、Agent は自身が Docker 上で実行されているかどうかを検出し、すべてのラベルでインテグレーションテンプレートを自動的に探します。オートディスカバリーは、以下の例のようなラベルを前提としています。

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

**docker 実行コマンド**:

```shell
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**Docker Swarm**:

Docker Cloud の Swarm モードを使用する場合は、以下のようにラベルをイメージに適用する必要があります。

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```

{{% /tab %}}
{{% tab "File" %}}

テンプレートをローカルファイルとして保存し、それをコンテナ化 Agent 内にマウントする場合は、外部サービスや特定のオーケストレーションプラットフォームを必要としません。この方法の欠点は、テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要がある点です。Agent は、マウントされた `/conf.d` ディレクトリでオートディスカバリーテンプレートを探します。

Agent v6.2.0 (および v5.24.0) 以降、デフォルトテンプレートはポートを自動検出するのではなく、監視対象ソフトウェアのデフォルトポートを使用します。別のポートを使用する必要がある場合は、[Docker コンテナラベル](?tab=docker-labels)または [Kubernetes ポッドアノテーション](?tab=kubernetes-annotations)で、カスタムオートディスカバリーテンプレートを指定します。

デフォルトのインテグレーションテンプレートは、基本的なケース向けです。追加オプションを有効にするためにカスタム Datadog インテグレーション構成が必要な場合は、別のコンテナ識別子を使用します。あるいは、テンプレート変数インデックスを使用して、独自のオートディスカバリー構成ファイルを作成します。

1. ホストに `conf.d/<INTEGRATION_NAME>.d/conf.yaml` ファイルを作成し、カスタムオートディスカバリー構成を追加します。
2. ホスト の `conf.d/` フォルダーをコンテナ化 Agent の `conf.d` フォルダーにマウントします。

**オートディスカバリー構成ファイル例**:

```
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][1]のドキュメントを参照してください。

**注**: Agent はファイル名から直接 `<INTEGRATIONS_NAME>` を推測するため、この名前を設定する必要はありません。

[1]: /ja/agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "ConfigMap" %}}

Kubernetes では、[ConfigMaps][1] を使用できます。以下のテンプレートと[Kubernetes カスタムインテグレーションに関するドキュメント][2]を参照してください。

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: <NAME>-config-map
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][3]のドキュメントを参照してください。

[1]: /ja/agent/kubernetes/integrations/#configmap
[2]: /ja/agent/kubernetes/integrations
[3]: /ja/agent/autodiscovery/ad_identifiers
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
    <CONTAINER_IDENTIFIER>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCE_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**注**: key-value ストアを使用している場合、オートディスカバリーは特定の構成を特定のコンテナに適用するために、`<CONTAINER_IDENTIFIER>` と `.spec.containers[0].image` の一致を試みることで、コンテナを**イメージ**で識別します。

[1]: /ja/integrations/consul
[2]: /ja/agent/guide/agent-commands
{{< tabs >}}
{{% tab "Files" %}}

## 例
### Datadog Redis インテグレーション

{{< tabs >}}
{{% tab "Kubernetes" %}}

以下のポッドアノテーションは、カスタム `password` パラメーターを使用して `redis` コンテナのインテグレーションテンプレートを定義し、すべてのログに正しい `source` および `service` 属性でタグ付けします。

```
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"redis"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: httpd
      ports:
        - containerPort: 80
```

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。


[1]: /ja/agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "Docker" %}}

以下の `docker-compose.yml` ファイルは、カスタム `password` パラメーターを使用して適切な Redis インテグレーションテンプレートを適用します。


```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
```

{{% /tab %}}
{{% tab "File" %}}

Redis は、Agent にパッケージ化されているデフォルトのオートディスカバリーテンプレートの 1 つです。そのため、このファイルをマウントする必要はありません。以下の Redis テンプレートは Agent にパッケージ化されています。

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
```

これは、最小の [Redis インテグレーション構成][1]とほぼ同じですが、`ad_identifiers` オプションがあることがわかります。この必須オプションを使用して、コンテナ識別子を指定できます。オートディスカバリーは、同じホスト上で `redis` イメージを実行するすべてのコンテナにこのテンプレートを適用します。詳細は、[オートディスカバリーの識別子に関するドキュメント][2]を参照してください。

Redis で、統計エンドポイントにアクセスする際に追加の `password` が必要な場合、そのエンドポイントからのログにフラグを正しく設定するには、以下のようにします。

1. ホストに `conf.d/` フォルダーと `conf.d/redis.d` フォルダーを作成します。
2. ホストの `conf.d/redis.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。
3. ホストの `conf.d/` フォルダーをコンテナ化 Agent の `conf.d/` フォルダーにマウントします。

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
    password: "%%env_REDIS_PASSWORD%%"

logs:
  source: redis
  service: redis
```

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][3]を参照してください。


[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /ja/agent/autodiscovery/ad_identifiers
[3]: /ja/agent/autodiscovery/template_variables
{{% /tab %}}
{{% tab "ConfigMap" %}}

次の ConfigMap は、ログを収集するための `source` 属性と `service` 属性を使用して、`redis` コンテナのインテグレーションテンプレートを定義しています。

```
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
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
    logs:
      source: redis
      service: redis
```

マニフェストで `volumeMounts` と `volumes` を定義します。

```
[...]
        volumeMounts:
        [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        [...]
      volumes:
      [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
[...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成し、すべてのログに正しい `source` および `service` 属性でタグ付けします。

```
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis"}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をインテグレーション構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。

auto-conf ファイルとは異なり、**key-value ストアの場合は、コンテナ識別子として短いイメージ名 (`redis` など) も長いイメージ名 (`redis:latest` など) も使用できます**。

[1]: /ja/agent/autodiscovery/template_variables
{{< tabs >}}
{{% tab "Files" %}}

### Datadog Apache および HTTP チェックインテグレーション

以下の構成は、`<CONTAINER_IDENTIFIER>`: `httpd` を持つ Apache コンテナイメージに適用されます。オートディスカバリーテンプレートは、Apache コンテナからメトリクスとログを収集し、2 つのエンドポイントをテストするためのインスタンスで Datadog-HTTP チェックをセットアップするように構成されます。

チェック名は、`apache`、`http_check`、およびこれらの `<INIT_CONFIG>`、`<INSTANCE_CONFIG>`、および `<LOG_CONFIG>` です。完全な構成は、それぞれのドキュメントの [Datadog-Apache インテグレーション][8]と [Datadog-HTTP チェックインテグレーション][9]のページにあります。

{{< tabs >}}
{{% tab "Kubernetes" %}}

```
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
    ad.datadoghq.com/apache.init_configs: '[{},{}]'
    ad.datadoghq.com/apache.instances: |
      [
        [
          {
            "apache_status_url": "http://%%host%%/server-status?auto"
          }
        ],
        [
          {
            "name": "<WEBSITE_1>",
            "url": "http://%%host%%/website_1",
            "timeout": 1
          },
          {
            "name": "<WEBSITE_2>",
            "url": "http://%%host%%/website_2",
            "timeout": 1
          }
        ]
      ]
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"webapp"}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

{{% /tab %}}
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<WEBSITE_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<WEBSITE_2>","url":"http://%%host%%/website_2","timeout":1}]]'
  com.datadoghq.ad.logs: '[{"source": "apache", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "File" %}}

* ホストに `conf.d/` フォルダーと `conf.d/apache.d` フォルダーを作成します。
* ホストの `conf.d/apache.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto

logs:
  source: apache
  service: webapp
```

**注**: これは、最小の [Apache チェック構成][1]とほぼ同じですが、`ad_identifiers` オプションがあることがわかります。この必須オプションを使用して、コンテナ識別子を指定できます。オートディスカバリーは、同じホスト上で `httpd` イメージを実行するすべてのコンテナにこのテンプレートを適用します。詳細は、[オートディスカバリーの識別子に関するドキュメント][2]を参照してください。

* 次に、ホストに `conf.d/http_check.d` フォルダーを作成します。
* ホストの `conf.d/http_check.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。

```
ad_identifiers:
  - httpd

init_config:

instances:
  - name: "<WEBSITE_1>"
    url: "http://%%host%%/website_1"
    timeout: 1

  - name: "<WEBSITE_2>"
    url: "http://%%host%%/website_2"
    timeout: 1
```

* 最後に、ホストの `conf.d/` フォルダーをコンテナ化 Agent の `conf.d/` フォルダーにマウントします。

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /ja/agent/autodiscovery/ad_identifiers
{{% /tab %}}
{{% tab "ConfigMap" %}}

次の ConfigMap は、`apache` ログを収集するための `source` 属性と `service` 属性を使用して、`apache` および `http_check` コンテナのインテグレーションテンプレートを定義しています。

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: httpd-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
    logs:
      source: apache
      service: webapp
  http-check-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - name: "<WEBSITE_1>"
        url: "http://%%host%%/website_1"
        timeout: 1
      - name: "<WEBSITE_2>"
        url: "http://%%host%%/website_2"
        timeout: 1
```

マニフェストで `volumeMounts` と `volumes` を定義します。

```
[...]
        volumeMounts:
        [...]
          - name: httpd-config-map
            mountPath: /conf.d
        [...]
      volumes:
      [...]
        - name: httpd-config-map
          configMap:
            name: httpd-config-map
            items:
              - key: apache-config
                path: /apache.d/conf.yaml
              - key: http-check-config
                path: /http_check.d/conf.yaml
[...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
etcdctl set /datadog/check_configs/httpd/logs '[{"source": "apache", "service": "webapp"}]'
```

**注**: 各リストの順番が重要です。Agent は、構成の各部分が 3 つのリストの同じインデックスにある場合にのみ、HTTP チェック構成を正しく生成します。


{{< tabs >}}
{{% tab "Files" %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/integrations/#configuring-agent-integrations
[2]: /ja/integrations/ceph
[3]: /ja/integrations/varnish/#autodiscovery
[4]: /ja/integrations/postfix
[5]: /ja/integrations/cassandra/#agent-check-cassandra-nodetool
[6]: /ja/integrations/gunicorn
[7]: /ja/help
[8]: /ja/integrations/apache/#setup
[9]: /ja/integrations/http_check/#setup