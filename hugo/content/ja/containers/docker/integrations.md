---
aliases:
- /ja/agent/docker/integrations
description: Autodiscovery を使用して、Docker コンテナで実行されているアプリケーションのモニタリングインテグレーションを構成する
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
  text: コンテナから送信された全データにタグを割り当てる
title: Docker とインテグレーション
---
このページでは、_Autodiscovery_ という Datadog 機能を使用して、Docker インフラストラクチャーのインテグレーションをインストールおよび構成する方法について説明します。Autodiscovery により、`%%host%%` のような[変数][1]を使用して構成設定を動的に入力することができます。

Autodiscovery の動作についての詳細な説明は、[コンテナの概要: Autodiscovery][2] を参照してください。特定のコンテナを Autodiscovery から除外したり、準備されていない Pod を許容したりするなどの高度な Autodiscovery オプションについては、[コンテナディスカバリー管理][3]を参照してください。

Kubernetes を使用している場合は、[Kubernetes とインテグレーション][4]を参照してください。

<div class="alert alert-info">
次の Datadog インテグレーションは、プロセスツリーデータまたはファイルシステムアクセスを必要とするため、Autodiscovery では機能しません。<a href="/integrations/ceph">CephCeph</a>、<a href="/integrations/varnish">Varnish</a>、<a href="/integrations/postfix">Postfix</a>、<a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>、および <a href="/integrations/gunicorn">Gunicorn</a>。<br/><br/>
Autodiscovery と互換性のないインテグレーションをモニターするには、Pod 内で Prometheus エクスポーターを使用して HTTP エンドポイントを公開し、<a href="/integrations/openmetrics/">OpenMetrics インテグレーション</a> (Autodiscovery をサポート) を使用して Pod を見つけ、エンドポイントをクエリします。
</div>

## インテグレーションを設定する {#set-up-your-integration}

一部のインテグレーションでは、アクセストークンの作成や Datadog Agent への読み取り権限の付与などのセットアップを行う必要があります。インテグレーションのドキュメントの**セットアップ**セクションの手順に従ってください。

### コミュニティのインテグレーション {#community-integrations}
Datadog Agent に同梱されていないインテグレーションを使用する場合は、目的のインテグレーションを含むカスタムイメージをビルドする必要があります。手順については、[コミュニティインテグレーションを使用する][5]を参照してください。

## 構成 {#configuration}

一般的に使用される一部のインテグレーションには、Autodiscovery 用のデフォルト構成が付属しています。詳細については、[Autodiscovery 自動構成][6]を参照してください。ここには、自動構成されるインテグレーションと対応するデフォルト構成ファイルのリストが記載されています。このリストにご使用のインテグレーションが含まれており、デフォルトの構成がユースケースに十分であれば、追加のアクションは必要ありません。

そうでない場合は、次のようにします。

1. ユースケースに適した設定方法 (Docker ラベル、ローカル ファイル、または Key‑value ストア) を選択します。
2. 選択した方法のテンプレート形式を参照します。各形式には、`<CONTAINER_IMAGE>` などのプレースホルダーが含まれています。
3. [これらのプレースホルダーの値を提供](#placeholder-values)します。

{{< tabs >}}
{{% tab "ラベル" %}}

#### Dockerfile {#dockerfile}

Datadog Agent v7.36+ の場合:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

古いバージョンの Agent の場合:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

#### docker-compose.yaml {#docker-composeyaml}

Datadog Agent v7.36+ の場合:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

古いバージョンの Agent の場合:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### docker run、nerdctl run、または podman run を使用する場合{#using-docker-run-nerdctl-run-or-podman-run}

Datadog Agent v7.36+ の場合:

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

古いバージョンの Agent の場合:

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**注**: これらのラベルを設定する際に JSON をエスケープできます。例えば、以下のようになります。

```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm {#docker-swarm}
Docker Cloud で Swarm モードを使用する場合、ラベルはイメージに適用する必要があります。

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
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```

{{% /tab %}}
{{% tab "ローカルファイル" %}}

Autodiscovery テンプレートを、マウントされている `/conf.d` ディレクトリ内にローカルファイルとして保存できます。テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要があります。

1. ホストで `conf.d/<INTEGRATION_NAME>.d/conf.yaml` ファイルを作成します。
   ```yaml
   ad_identifiers:
     - <CONTAINER_IMAGE>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. ホストの `conf.d/` フォルダをコンテナ化された Agent の `conf.d` フォルダにマウントします。

   **docker-compose.yaml**
   ```yaml
   volumes:
     [...]
     - <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d
   ```

   **docker run**
   ```shell
   docker run -d --name datadog-agent \
     [...]
     -v <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d \
   ```

{{% /tab %}}
{{% tab "key-value ストア" %}}
Autodiscovery テンプレートは、[Consul][1]、[etcd][2]、または [ZooKeeper][3] から取得できます。key-value ストアは `datadog.yaml` 構成ファイルで設定するか (その後、このファイルを Agent コンテナ内にマウントします)、または Agent コンテナ内の環境変数として設定できます。

**datadog.yaml での構成**:

`datadog.yaml` で、key-value ストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を設定します。

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

[Datadog Agent を再起動][4]して、変更を適用します。

**環境変数での構成**:

key-value ストアがテンプレートソースとして有効になっている場合、Agent はキー `/datadog/check_configs` の下にテンプレートを探します。Autodiscovery では、このような key-value 階層を使用する必要があります。

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
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

### プレースホルダー値 {#placeholder-values}

次のようにプレースホルダー値を指定します。

`<INTEGRATION_NAME>`
: ご使用の Datadog インテグレーションの名前。たとえば、`etcd` や `redisdb` です。

`<CONTAINER_IMAGE>`
: コンテナイメージに対して照合する識別子。<br/><br/>
例: `redis` をコンテナ識別子として指定した場合、Autodiscovery テンプレートは `redis` と一致するイメージ名を持つすべてのコンテナに適用されます。`foo/redis:latest` と `bar/redis:v2` を実行している 1 つのコンテナを使用している場合、Autodiscovery テンプレートは両方のコンテナに適用されます。<br/><br/>
`ad_identifiers` パラメーターはリストを受け入れるため、複数のコンテナ識別子を指定できます。カスタム識別子も使用できます。[カスタム Autodiscovery 識別子][7]を参照してください。

`<INIT_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `init_config` の下にリストされている構成パラメーター。`init_config` セクションは通常は空です。

`<INSTANCES_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `instances` の下にリストされている構成パラメーター。

`<LOGS_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `logs` の下にリストされている構成パラメーター。

## 例 {#examples}

### Redis インテグレーション{#redis-integration}

Redis は [Autodiscovery 自動設定][6]に対応するテクノロジーの 1 つです。以下の例では、この基本設定を上書きし、`password` パラメーターを追加するカスタム設定を示します。

`REDIS_PASSWORD` という名前の環境変数にパスワードを保存した上で、次を実行します。

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
{{% tab "ファイル" %}}
1. ホストで `conf.d/redisdb.d/conf.yaml` ファイルを作成します。

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

2. ホストの `conf.d/` フォルダをコンテナ化された Agent の `conf.d` フォルダにマウントします。

{{% /tab %}}
{{% tab "key-value ストア" %}}

以下の etcd コマンドは、カスタム `password` パラメーターを使用して Redis インテグレーションテンプレートを作成します。

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

3 つの値はいずれもリストであることに注意してください。Autodiscovery は、共有リストインデックスに基づいてインテグレーション構成にリスト項目を組み立てます。この場合、`check_names[0]`、`init_configs[0]`、および `instances[0]` から最初 (かつ唯一) のチェック構成を構成します。
{{% /tab %}}
{{< /tabs >}}

これらの例ではすべて [Autodiscovery テンプレート変数][1]を使用しています。
- `%%host%%` には、コンテナの IP が動的に設定されます。
- `%%env_REDIS_PASSWORD%%`は、Agent プロセスから見た `REDIS_PASSWORD` という名前の環境変数を参照します。

複数のコンテナセットに対して複数のチェックを設定する方法など、さらに多くの例については [Autodiscovery: シナリオ & 例][8]を参照してください。

[1]: /ja/containers/guide/template_variables/
[2]: /ja/getting_started/containers/autodiscovery
[3]: /ja/containers/guide/autodiscovery-management
[4]: /ja/containers/kubernetes/integrations/
[5]: /ja/agent/guide/use-community-integrations/
[6]: /ja/containers/guide/auto_conf
[7]: /ja/containers/guide/ad_identifiers
[8]: /ja/containers/guide/autodiscovery-examples