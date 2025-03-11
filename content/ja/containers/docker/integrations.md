---
aliases:
- /ja/agent/docker/integrations
further_reading:
- link: /agent/docker/log/
  tag: ドキュメント
  text: ログの収集
- link: /agent/docker/apm/
  tag: ドキュメント
  text: アプリケーショントレースの収集
- link: /agent/docker/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスの収集
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集をコンテナのサブセットのみに制限
- link: /agent/docker/tag/
  tag: ドキュメント
  text: コンテナから送信された全データにタグを割り当て
title: Docker and Integrations
---

This page covers how to install and configure integrations for your Docker infrastructure by using a Datadog feature known as _Autodiscovery_. Autodiscovery enables you to use [variables][1] like `%%host%%` to dynamically populate your configuration settings. 

For a detailed explanation of how Autodiscovery works, see [Getting Started with Containers: Autodiscovery][2]. For advanced Autodiscovery options, such as excluding certain containers from Autodiscovery or tolerating unready pods, see [Container Discovery Management][3].

If you are using Kubernetes, see [Kubernetes and Integrations][4].

<div class="alert alert-info">
The following Datadog integrations don't work with Autodiscovery because they require either process tree data or filesystem access: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, and <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
To monitor integrations that are not compatible with Autodiscovery, you can use a Prometheus exporter in the pod to expose an HTTP endpoint, and then use the <a href="/integrations/openmetrics/">OpenMetrics integration</a> (which supports Autodiscovery) to find the pod and query the endpoint. 
</div>

## Set up your integration

Some integrations require setup steps, such as creating an access token or granting read permission to the Datadog Agent. Follow the instructions in the **Setup** section of your integration's documentation.

### コミュニティのインテグレーション
To use an integration that is not packaged with the Datadog Agent, you must build a custom image that contains your desired integration. See [Use Community Integrations][5] for instructions.

## 構成

Some commonly-used integrations come with default configuration for Autodiscovery. See [Autodiscovery auto-configuration][6] for details, including a list of auto-configured integrations and their corresponding default configuration files. If your integration is in this list, and the default configuration is sufficient for your use case, no further action is required.

Otherwise:

1. Choose a configuration method (Docker labels, a local file, or a key-value store) that suits your use case.
2. Reference the template format for your chosen method. Each format contains placeholders, such as `<CONTAINER_IDENTIFIER>`.
3. [Supply values](#placeholder-values) for these placeholders.

{{< tabs >}}
{{% tab "Labels" %}}

#### Dockerfile

Datadog Agent v7.36+ の場合:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

古いバージョンの Agent の場合:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<インテグレーション名>]'
LABEL "com.datadoghq.ad.init_configs"='[<初期構成>]'
LABEL "com.datadoghq.ad.instances"='[<インスタンス構成>]'
LABEL "com.datadoghq.ad.logs"='[<ログ構成>]'
```

#### docker-compose.yaml

Datadog Agent v7.36+ の場合:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

古いバージョンの Agent の場合:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<インテグレーション名>]'
  com.datadoghq.ad.init_configs: '[<初期構成>]'
  com.datadoghq.ad.instances: '[<インスタンス構成>]'
  com.datadoghq.ad.logs: '[<ログ構成>]'
```

#### Using docker run, nerdctl run, or podman run

Datadog Agent v7.36+ の場合:

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

古いバージョンの Agent の場合:

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**注**: これらのラベルを構成する際に、JSON をエスケープすることができます。例:
```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm
When using Swarm mode for Docker Cloud, labels must be applied to the image.

Datadog Agent v7.36+ の場合:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'

```

古いバージョンの Agent の場合:

```yaml
version: "1.0"
services:
...
  project:
    image: '<イメージ名>'
    labels:
      com.datadoghq.ad.check_names: '[<インテグレーション名>]'
      com.datadoghq.ad.init_configs: '[<初期構成>]'
      com.datadoghq.ad.instances: '[<インスタンス構成>]'
      com.datadoghq.ad.logs: '[<ログ構成>]'

```

{{% /tab %}}
{{% tab "ローカルファイル" %}}

You can store Autodiscovery templates as local files inside the mounted `/conf.d` directory. You must restart your Agent containers each time you change, add, or remove templates.

1. Create a `conf.d/<INTEGRATION_NAME>.d/conf.yaml` file on your host:
   ```yaml
   ad_identifiers:
     - <CONTAINER_IDENTIFIER>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. ホスト の `conf.d/` フォルダーをコンテナ化 Agent の `conf.d` フォルダーにマウントします。

{{% /tab %}}
{{% tab "Key-value store" %}}
You can source Autodiscovery templates from [Consul][1], [etcd][2], or [ZooKeeper][3]. You can configure your key-value store in the `datadog.yaml` configuration file (and subsequently mount this file inside the Agent container), or as environment variables in the Agent container.

**datadog.yaml での構成**

In `datadog.yaml`, set the `<KEY_VALUE_STORE_IP>` address and `<KEY_VALUE_STORE_PORT>` of your key-value store:

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

[Restart the Datadog Agent][4] to apply your changes.

**環境変数での構成**

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下でテンプレートを探します。オートディスカバリーは、以下のような key-value 階層を前提とします。

```yaml
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCES_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

[1]: /ja/integrations/consul/
[2]: /ja/integrations/etcd/
[3]: /ja/integrations/zk/
[4]: /ja/agent/configuration/agent-commands/

{{% /tab %}}
{{< /tabs >}}

### Placeholder values

Supply placeholder values as follows:

`<INTEGRATION_NAME>`
: The name of your Datadog integration, such as `etcd` or `redisdb`.

`<CONTAINER_IDENTIFIER>`
: An identifier to match against the names (`spec.containers[0].name`, **not** `spec.containers[0].image`) of the containers that correspond to your integration. The `ad_identifiers` parameter takes a list, so you can supply multiple container identifiers.<br/><br/>
For example: if you supply `redis` as a container identifier, your Autodiscovery template is applied to all containers with names that match `redis`. If you have one container running `foo/redis:latest` and `bar/redis:v2`, your Autodiscovery template is applied to both containers.<br/><br/>
You can also use custom identifiers. See [Custom Autodiscovery Identifiers][21].

`<INIT_CONFIG>`
: The configuration parameters listed under `init_config` in your integration's `<INTEGRATION_NAME>.d/conf.yaml.example` file. The `init_config` section is usually empty.

`<INSTANCES_CONFIG>`
: The configuration parameters listed under `instances` in your integration's `<INTEGRATION_NAME>.d/conf.yaml.example` file.

`<LOGS_CONFIG>`
: The configuration parameters listed under `logs` in your integration's `<INTEGRATION_NAME>.d/conf.yaml.example` file.

## 例

### Redis integration

Redis is one the technologies for which [Autodiscovery auto-configuration][6] is available. The following examples demonstrate overriding this basic configuration with a custom configuration that supplies a `password` parameter.

Store your password as an environment variable named `REDIS_PASSWORD`; then:

{{< tabs >}}
{{% tab "Docker" %}}

Datadog Agent v7.36+ の場合:

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

古いバージョンの Agent の場合:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "File" %}}
1. ホストに `conf.d/redisdb.d/conf.yaml` ファイルを作成します。

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
{{% tab "Key-value store" %}}

以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成します。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

Notice that each of the three values is a list. Autodiscovery assembles list items into the integration configurations based on shared list indexes. In this case, it composes the first (and only) check configuration from `check_names[0]`, `init_configs[0]` and `instances[0]`.
{{% /tab %}}
{{< /tabs >}}

All of these examples use [Autodiscovery template variables][1]:
- `%%host%%` には、コンテナの IP が動的に設定されます。
- `%%env_REDIS_PASSWORD%%` は Agent プロセスから見た `REDIS_PASSWORD` という名前の環境変数を参照します。 

For more examples, including how to configure multiple checks for multiple sets of containers, see [Autodiscovery: Scenarios & Examples][8].

[1]: /ja/containers/guide/template_variables/
[2]: /ja/getting_started/containers/autodiscovery
[3]: /ja/containers/guide/autodiscovery-management
[4]: /ja/containers/kubernetes/integrations/
[5]: /ja/agent/guide/use-community-integrations/
[6]: /ja/containers/guide/auto_conf
[7]: /ja/containers/guide/ad_identifiers
[8]: /ja/containers/guide/autodiscovery-examples