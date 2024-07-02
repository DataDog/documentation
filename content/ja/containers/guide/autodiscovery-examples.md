---
title: "Autodiscovery: Scenarios & Examples"
further_reading:
- link: /agent/kubernetes/log/
  tag: ドキュメント
  text: アプリケーションログの収集
- link: /agent/kubernetes/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/kubernetes/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/kubernetes/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
---

This page contains detailed example templates for configuring integrations in containerized environments in the following scenarios:

- [Redis integration for all Redis containers](#redis-integration-for-all-redis-containers)
- [Apache integration with HTTP Check for all Apache containers](#apache-integration-and-http-check-on-apache-containers)

For more information about containers and integrations, see [Docker and Integrations][2] and [Kubernetes and Integrations][3].

All examples make use of Datadog's Autodiscovery feature, which allows you to define configuration templates for Agent Checks on designated sets of containers. For more information about Autodiscovery, see [Getting Started with Containers: Autodiscovery][1].

## Redis integration for all Redis containers

In this example scenario, you have a containerized environment in which you want to set up and configure the [Datadog-Redis integration][5] for all containers that match the name `redis`. You have one container named `redis` and another named `my-custom-redis`, and you want to configure the Redis integration for **both** containers.

The Redis integration comes with [default auto-configuration][4], but you want to additionally specify a `password` parameter and configure log collection. 

Hypothetically, if you were to configure this integration **on a host**, you could reference [`redisdb.d/conf.yaml.example`][6] for parameters and create a `conf.yaml` file that contains the following:

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

Here, `<PASSWORD>` corresponds to the password to use for the connection.

To apply this configuration to your Redis containers: first, store your password as an environment variable named `REDIS_PASSWORD`; then: 

{{< tabs >}}
{{% tab "Kubernetes annotations" %}}

In your pod manifest:

**Autodiscovery annotations v2** (for Datadog Agent v7.36+)

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

**Autodiscovery annotations v1** 

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
{{% tab "Docker labels" %}}

**docker-compose.yaml**

For Datadog Agent v7.36+:

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

For earlier Agent versions:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "Local file" %}}
1. Create a `conf.d/redisdb.d/conf.yaml` file on your host:

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

2. ホスト の `conf.d/` フォルダーをコンテナ化 Agent の `conf.d` フォルダーにマウントします。
{{% /tab %}}
{{% tab "ConfigMap" %}}

In a ConfigMap:

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

Then, in your manifest, define the `volumeMounts` and `volumes`:

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

以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成します。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

3 つの値がそれぞれリストであることに注目してください。オートディスカバリーは、共有リストインデックスに基づいて、リスト項目をインテグレーション構成に集約します。この例の場合は、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成が作成されます。

{{% /tab %}}
{{% tab "Datadog Operator" %}}

In `datadog-agent.yaml`:

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
As a result, the Agent contains a `redisdb.yaml` file with the above configuration in the `conf.d` directory.

**Note**: The Redis integration comes with [default auto-configuration][1], which takes precedence over configuration set in the Datadog Operator manifest. Because of this, the provided example manifest uses the `DD_IGNORE_AUTOCONF` variable to disable auto-configuration.

[1]: /containers/guide/auto_conf
{{% /tab %}}
{{% tab "Helm" %}}

In `datadog-values.yaml`:

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
As a result, the Agent contains a `redisdb.yaml` file with the above configuration in the `conf.d` directory.

**Note**: The Redis integration comes with [default auto-configuration][1], which takes precedence over configuration set in Helm values. Because of this, the provided example uses `datadog.ignoreAutoConfig` to disable auto-configuration.

[1]: /containers/guide/auto_conf
{{% /tab %}}
{{< /tabs >}}

All of these examples use [Autodiscovery template variables][7]:
- `%%host%%` is dynamically populated with the container's IP.
- `%%env_REDIS_PASSWORD%%` references an environment variable named `REDIS_PASSWORD` as seen by the Agent process.

## Apache integration and HTTP Check on Apache containers

In this example scenario, you have a containerized environment in which you want to set up and configure the [Datadog-Apache integration][8] for all containers that match the name `apache`. You also want to set up an [HTTP Check][9] for testing two endpoints, `/website_1` and `/website_2`

The Apache integration comes with [default auto-configuration][4], but you want to add an additional configuration: you want to set the [collection interval][11] to 30 seconds.

Hypothetically, if you were to configure this integration **on a host**, you could reference the configuration options in [`apache.d/conf.yaml.example`][10] and [`http_check.d/conf.yaml.example`][12]. You would create two `conf.yaml` files:

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
{{% tab "Kubernetes annotations" %}}

**Autodiscovery Annotations v2** (for Datadog Agent v7.36+)

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
{{% tab "Docker labels" %}}

**Dockerfile** 

For Datadog Agent v7.36+:

```yaml
LABEL "com.datadoghq.ad.checks"='{"apache": {"instances": [{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}]}, "http_check":{"instances": [{"name":"my_website_1","url":"http://%%host%%/website_1","timeout":1},{"name":"my_website_2","url":"http://%%host%%/website_2","timeout":1}]}}'
```

For earlier Agent versions:
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

**Note**: The Apache integration comes with [default auto-configuration][1], which takes precedence over configuration set in the Datadog Operator manifest. Because of this, the provided example manifest uses the `DD_IGNORE_AUTOCONF` variable to disable auto-configuration.

[1]: /containers/guide/auto_conf

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

**Note**: The Apache integration comes with [default auto-configuration][1], which takes precedence over configuration set in Helm values. Because of this, the provided example uses `datadog.ignoreAutoConfig` to disable auto-configuration.

[1]: /containers/guide/auto_conf

{{% /tab %}}
{{< /tabs >}}

All of these examples use [Autodiscovery template variables][7]:
- `%%host%%` is dynamically populated with the container's IP.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/containers/autodiscovery
[2]: /containers/docker/integrations
[3]: /containers/kubernetes/integrations
[4]: /containers/guide/auto_conf
[5]: /integrations/redisdb
[6]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[7]: /containers/guide/template_variables/
[8]: /integrations/apache
[9]: /integrations/http_check/
[10]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[11]: /developers/write_agent_check/#updating-the-collection-interval
[12]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example