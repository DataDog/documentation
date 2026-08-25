---
description: Autodiscovery を利用してコンテナ化された Kubernetes 環境でインテグレーションを設定するための、詳細な構成例。
further_reading:
- link: /agent/kubernetes/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーション トレースを収集する
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスを収集する
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集を特定のコンテナのみに制限する
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから出力されるすべてのデータにタグを付与する
title: 'オートディスカバリー: シナリオ & 例'
---

このページでは、以下のシナリオにおいて、コンテナ化された環境でインテグレーションを構成するための詳細なサンプルテンプレートを紹介しています。

- [すべての Redis コンテナを対象とした Redis インテグレーション](#redis-integration-for-all-redis-containers)
- [すべての Apache コンテナを対象とした HTTP チェック付きの Apache インテグレーション](#apache-integration-and-http-check-on-apache-containers)

コンテナとインテグレーションの詳細については、[Docker とインテグレーション][2]および [Kubernetes とインテグレーション][3]を参照してください。

すべての例で、Datadog のオートディスカバリー機能が利用されており、指定されたコンテナセット上で Agent チェックのための構成テンプレートを定義することが可能になっています。オートディスカバリーの詳細については、[コンテナの概要: オートディスカバリー][1]を参照してください。

## すべての Redis コンテナを対象とした Redis インテグレーション

このシナリオ例では、コンテナ化された環境があり、`redis` という名前にマッチするすべてのコンテナに対して [Datadog-Redis インテグレーション][5]をセットアップして構成します。`redis` という名前のコンテナと `my-custom-redis` という名前のコンテナがあり、**両方**を対象に Redis インテグレーションを構成します。

Redis インテグレーションには、[デフォルトの自動構成][4]が付属していますが、追加で `password` パラメーターを指定し、ログの収集を構成します。

仮に、このインテグレーションを**ホスト上で**構成する場合は、[`redisdb.d/conf.yaml.example`][6] のパラメーターを参照し、以下の記述を含む `conf.yaml` ファイルを作成することができます。

```yaml
init_config:
instances:
  - host: localhost
    port: 6379
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/redis_6379.log
    source: redis
    service: redis_service
```

ここで、`<PASSWORD>` は接続に使用するパスワードに対応しています。

この構成を Redis コンテナに適用するには、まずパスワードを `REDIS_PASSWORD` という名前の環境変数として格納した後、以下の作業を行います。

{{< tabs >}}
{{% tab "Kubernetes アノテーション" %}}

ポッドマニフェストで:

**Autodiscovery Annotations v2** (Datadog Agent v7.36+ 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Autodiscovery Annotations v1** 

```yaml
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
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}
{{% tab "Docker ラベル" %}}

**docker-compose.yaml**

Datadog Agent v7.36 以上の場合:

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

旧バージョンの Agent の場合:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "Local file" %}}
1. ホストに `conf.d/redisdb.d/conf.yaml` ファイルを作成します:

   ```yaml
   ad_identifiers:
     - redis
   init config:
   instances:
     - host: "%%host%%"
       port: "6379"
       username: "datadog"
       password: "%%env_REDIS_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/redis.log"
       source: "redis"
       service: "redis_service"
   ```

2. ホストの `conf.d/` フォルダーをコンテナ化された Agent の `conf.d` フォルダーにマウントします。
{{% /tab %}}
{{% tab "ConfigMap" %}}

ConfigMap で:

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
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
        password: "%%env_REDIS_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/redis_6379.log"
        source: "redis"
        service: "redis_service"
```

次に、マニフェストで `volumeMounts` と `volumes` を定義します。

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

次の etcd コマンドは `password` パラメーターを含む Redis インテグレーション テンプレートを作成します:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をインテグレーション構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

{{% /tab %}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` で: 

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      env: 
        - name: DD_IGNORE_AUTOCONF
          value: redisdb
      extraConfd:
        configDataMap:
          redisdb.yaml: |-
            ad_identifiers:
              - redis
            init_config:
            instances:
              - host: "%%host%%"
                port: 6379
                password: "%%env_REDIS_PASSWORD%%"
```
その結果、Agent には上記の構成を持つ `redisdb.yaml` ファイルが `conf.d` ディレクトリに格納されます。

**注**: Redis インテグレーションには、[デフォルトの自動構成][1]が付属しており、Datadog Operator マニフェストで設定された構成よりも優先されます。このため、提供されているマニフェストの例では、`DD_IGNORE_AUTOCONF` 変数を使用して自動構成を無効にしています。

[1]: /ja/containers/guide/auto_conf
{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` で:

```yaml
datadog:
  ignoreAutoConfig:
    - redisdb
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
      init_config:
      instances:
        - host: "%%host%%"
          port: 6379
          password: "%%env_REDIS_PASSWORD%%"
```
その結果、Agent には上記の構成を持つ `redisdb.yaml` ファイルが `conf.d` ディレクトリに格納されます。

**注**: Redis インテグレーションには、[デフォルトの自動構成][1]が付属しており、Helm の値で設定された構成よりも優先されます。このため、提供されているマニフェストの例では、`datadog.ignoreAutoConfig` を使用して自動構成を無効にしています。

[1]: /ja/containers/guide/auto_conf
{{% /tab %}}
{{< /tabs >}}

これらの例はすべて、[オートディスカバリー テンプレート変数][7]を使用しています。
- `%%host%%` はコンテナの IP で動的に置き換えられます。
- `%%env_REDIS_PASSWORD%%` は Agent プロセスから見える `REDIS_PASSWORD` という環境変数を参照します。

## すべての Apache コンテナを対象とした HTTP チェック付きの Apache インテグレーション

このシナリオ例では、コンテナ化された環境があり、`apache` という名前にマッチするすべてのコンテナに対して [Datadog-Apache インテグレーション][8]をセットアップして構成します。また、2 つのエンドポイント `/website_1` と `/website_2` をテストするために、[HTTP チェック][9]をセットアップします。

Apache インテグレーションには、[デフォルトの自動構成][4]が付属していますが、さらに構成を追加して、[収集間隔][11]を 30 秒に設定します。

仮に、このインテグレーションを**ホスト上で**構成する場合、[`apache.d/conf.yaml.example`][10] と [`http_check.d/conf.yaml.example`][12] の構成オプションを参照することができます。`conf.yaml` ファイルを 2 つ作成することになります。

{{< code-block lang="yaml" filename="apache.d/conf.yaml" >}}
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
    min_collection_interval: 30
{{< /code-block >}}

{{< code-block lang="yaml" filename="http_check.d/conf.yaml" >}}
init_config:
instances:
  - name: my_website_1
    url: http://%%host%%/website_1
    timeout: 1
  - name: my_website_2
    url: http://%%host%%/website_2
    timeout: 1
{{< /code-block >}}

{{< tabs >}}
{{% tab "Kubernetes アノテーション" %}}

**Autodiscovery Annotations v2** (Datadog Agent v7.36+ 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto",
              "min_collection_interval": 30
            }
          ]
        },
        "http_check": {
          "instances": [
            {
              "name": "my_website_1",
              "url": "http://%%host%%/website_1",
              "timeout": 1
            },
            {
              "name": "my_website_2",
              "url": "http://%%host%%/website_2",
              "timeout": 1
            }
          ]
        }
      }
  labels:
    name: apache
spec:
  containers:
    - name: apache
  # (...)
```

**Autodiscovery Annotations v1** 

```yaml
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
            "apache_status_url": "http://%%host%%/server-status?auto",
            "min_collection_interval": 30
          }
        ],
        [
          {
            "name": "my_website_1",
            "url": "http://%%host%%/website_1",
            "timeout": 1
          },
          {
            "name": "my_website_2",
            "url": "http://%%host%%/website_2",
            "timeout": 1
          }
        ]
      ]
  labels:
    name: apache
spec:
  containers:
    - name: apache
  # (...)
```

{{% /tab %}}
{{% tab "Docker ラベル" %}}

**Dockerfile** 

Datadog Agent v7.36 以上の場合:

```yaml
LABEL "com.datadoghq.ad.checks"='{"apache": {"instances": [{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}]}, "http_check":{"instances": [{"name":"my_website_1","url":"http://%%host%%/website_1","timeout":1},{"name":"my_website_2","url":"http://%%host%%/website_2","timeout":1}]}}'
```

旧バージョンの Agent の場合:
```dockerfile
LABEL "com.datadoghq.ad.check_names"='["apache", "http_check"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='[[{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}],[{"name":"my_website_1","url":"http://%%host%%/website_1","timeout":1},{"name":"my_website_2","url":"http://%%host%%/website_2","timeout":1}]]'
```

{{% /tab %}}
{{% tab "Local file" %}}

* ホストに `conf.d/` フォルダーと `conf.d/apache.d` フォルダーを作成します。
* ホストの `conf.d/apache.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。

```yaml
ad_identifiers:
  - apache

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
    min_collection_interval: 30
```

* 次に、ホストに `conf.d/http_check.d` フォルダーを作成します。
* ホストの `conf.d/http_check.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。

```yaml
ad_identifiers:
  - apache

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

{{% /tab %}}
{{% tab "ConfigMap" %}}

次の ConfigMap は、`apache` と `http_check` コンテナのインテグレーションテンプレートを定義します。

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: apache-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - apache
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
        min_collection_interval: 30
  http-check-config: |-
    ad_identifiers:
      - apache
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

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: apache-auto-config
            mountPath: /conf.d/apache.d/
          - name: http-auto-config
            mountPath: /conf.d/http_check.d/
        # [...]
      volumes:
      # [...]
        - name: apache-auto-config
          configMap:
            name: apache-config-map
            items:
              - key: apache-config
                path: auto_conf.yaml
        - name: http-auto-config
          configMap:
            name: apache-config-map
            items:
              - key: http-check-config
                path: auto_conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```conf
etcdctl set /datadog/check_configs/apache/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/apache/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/apache/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**注**: 各リストの順番が重要です。Agent は、構成の各部分が 3 つのリストの同じインデックスにある場合にのみ、HTTP チェック構成を正しく生成します。

{{% /tab %}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      env:
        - name: DD_IGNORE_AUTOCONF
          value: apache
      extraConfd:
        configDataMap:
          apache.yaml: |-
            ad_identifiers:
              - apache
            init_config:
            instances:
              - apache_status_url: "http://%%host%%/server-status?auto"
                min_collection_interval: 30
          http_check.yaml: |-
            ad_identifiers:
              - apache
            init_config:
            instances:
              - name: "my_website_1"
                url: "http://%%host%%/website_1"
                timeout: 1
              - name: "my_website_2"
                url: "http://%%host%%/website_2"
                timeout: 1
```

**注**: Apache インテグレーションには、[デフォルトの自動構成][1]が付属しており、Datadog Operator マニフェストで設定された構成よりも優先されます。このため、提供されているマニフェストの例では、`DD_IGNORE_AUTOCONF` 変数を使用して自動構成を無効にしています。

[1]: /ja/containers/guide/auto_conf

{{% /tab %}}
{{% tab "Helm" %}}
In `datadog-values.yaml`:

```yaml
datadog:
  ignoreAutoConfig:
    - apache
  confd:
    apache.yaml: |-
      ad_identifiers:
        - apache
      init_config:
      instances:
        - apache_status_url: "http://%%host%%/server-status?auto"
          min_collection_interval: 30
    http_check.yaml: |-
      ad_identifiers:
        - apache
      init_config:
      instances:
        - name: "my_website_1"
          url: "http://%%host%%/website_1"
          timeout: 1
        - name: "my_website_2"
          url: "http://%%host%%/website_2"
          timeout: 1
```

**注**: Apache インテグレーションには、[デフォルトの自動構成][1]が付属しており、Helm の値で設定された構成よりも優先されます。このため、提供されているマニフェストの例では、`datadog.ignoreAutoConfig` を使用して自動構成を無効にしています。

[1]: /ja/containers/guide/auto_conf

{{% /tab %}}
{{< /tabs >}}

これらの例はすべて、[オートディスカバリー テンプレート変数][7]を使用しています。
- `%%host%%` はコンテナの IP で動的に置き換えられます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/autodiscovery
[2]: /ja/containers/docker/integrations
[3]: /ja/containers/kubernetes/integrations
[4]: /ja/containers/guide/auto_conf
[5]: /ja/integrations/redisdb
[6]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[7]: /ja/containers/guide/template_variables/
[8]: /ja/integrations/apache
[9]: /ja/integrations/http_check/
[10]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[11]: /ja/developers/write_agent_check/#updating-the-collection-interval
[12]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example