---
aliases:
- /ja/agent/docker/integrations
further_reading:
- link: /agent/docker/log/
  tag: ドキュメント
  text: ログを収集する
- link: /agent/docker/apm/
  tag: ドキュメント
  text: アプリケーション トレースを収集する
- link: /agent/docker/prometheus/
  tag: ドキュメント
  text: Prometheus メトリクスを収集する
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: データ収集を特定のコンテナのみに制限する
- link: /agent/docker/tag/
  tag: ドキュメント
  text: コンテナから出力されるすべてのデータにタグを付与する
title: Docker とインテグレーション
---

このページでは、Datadog の _Autodiscovery_ 機能を使用して Docker インフラストラクチャのインテグレーションをインストールおよび構成する方法を説明しています。Autodiscovery を使用すると、`%%host%%` のような [変数][1] を利用して設定を動的に入力できます。

Autodiscovery がどのように機能するかの詳細な説明は、[コンテナー入門: Autodiscovery][2] を参照してください。特定のコンテナを Autodiscovery から除外したり、未準備の pod を許容したりするなどの高度な Autodiscovery オプションについては、[コンテナ ディスカバリー管理][3] を参照してください。

Kubernetes を使用している場合は、[Kubernetes とインテグレーション][4] を参照してください。

<div class="alert alert-info">
Autodiscovery ではプロセス ツリー データまたはファイル システムへのアクセスが必要になるため、<a href="/integrations/ceph">Ceph</a>、<a href="/integrations/varnish">Varnish</a>、<a href="/integrations/postfix">Postfix</a>、<a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>、および <a href="/integrations/gunicorn">Gunicorn</a> の Datadog インテグレーションは動作しません。<br/><br/>
Autodiscovery に対応していないインテグレーションを監視するには、pod 内に Prometheus エクスポーターを配置して HTTP エンドポイントを公開し、その後 Autodiscovery をサポートする <a href="/integrations/openmetrics/">OpenMetrics インテグレーション</a> を使用して pod を検出し、エンドポイントをクエリします。
</div>

## インテグレーションをセットアップする

一部のインテグレーションでは、アクセス トークンを作成するあるいは Datadog Agent に読み取り権限を付与するなど、セットアップ手順が必要です。詳細は、インテグレーションのドキュメントの **Setup** セクションの手順に従ってください。

### Community インテグレーション
Datadog Agent に同梱されていないインテグレーションを使用する場合は、目的のインテグレーションを含むカスタム イメージをビルドする必要があります。手順については [Community インテグレーションの使用][5] を参照してください。

## 設定

よく使用されるインテグレーションの中には、Autodiscovery 用のデフォルト 設定が同梱されているものがあります。自動設定されているインテグレーション一覧と、それぞれのデフォルト 設定ファイルについては [Autodiscovery 自動設定][6] を参照してください。ご使用のインテグレーションがこの一覧に含まれ、そのデフォルト設定が要件を満たす場合、追加の操作は不要です。

それ以外の場合:

1. ユース ケースに適した設定方法 (Docker ラベル、ローカル ファイル、または Key‑value ストア) を選択してください。
2. 選択した方法のテンプレート 形式を参照してください。各形式には `<CONTAINER_IMAGE>` のようなプレースホルダーが含まれています。
3. これらのプレースホルダーに [値を入力](#placeholder-values) してください。

{{< tabs >}}
{{% tab "Labels" %}}

#### Dockerfile

Datadog Agent v7.36+ の場合:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

旧バージョンの Agent の場合:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

#### docker-compose.yaml

Datadog Agent v7.36+ の場合:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

旧バージョンの Agent の場合:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### docker run、nerdctl run、または podman run を使用する場合

Datadog Agent v7.36+ の場合:

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

旧バージョンの Agent の場合:

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**注**: これらのラベルを設定する際に JSON をエスケープできます。例:
```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm
Docker Cloud で Swarm モードを使用する場合、ラベルはイメージに適用する必要があります。

Datadog Agent v7.36 以上の場合:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'

```

旧バージョンの Agent の場合:

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
{{% tab "Local file" %}}

マウントされた `/conf.d` ディレクトリ内に Autodiscovery テンプレートをローカル ファイルとして保存できます。テンプレートを変更・追加・削除するたびに Agent コンテナを再起動する必要があります。

1. ホスト上に `conf.d/<INTEGRATION_NAME>.d/conf.yaml` ファイルを作成します:
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

2. ホストの `conf.d/` フォルダーをコンテナ化された Agent の `conf.d` フォルダーにマウントします。

"{{% /tab %}}
{{% tab "Key-value store" %}}
Autodiscovery テンプレートは [Consul][1]、[etcd][2]、または [ZooKeeper][3] から取得できます。`datadog.yaml` 構成ファイルでキー バリュー ストアを設定する (その後、このファイルを Agent コンテナ内にマウントする) か、Agent コンテナ内の環境変数として設定できます。"

**datadog.yaml での設定:**

`datadog.yaml` でキー バリュー ストアの `<KEY_VALUE_STORE_IP>` アドレスと `<KEY_VALUE_STORE_PORT>` を設定します:

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

[Datadog Agent を再起動][4] して変更を適用してください。

**環境変数での設定:**

キー バリュー ストアをテンプレート ソースとして有効にすると、Agent は `/datadog/check_configs` キー配下でテンプレートを探します。Autodiscovery は次のようなキー バリュー階層を想定します:

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

### プレースホルダー値

次のようにプレースホルダーに値を入力します:

`<INTEGRATION_NAME>`
: Datadog インテグレーションの名前。例: `etcd`、`redisdb`。

`<CONTAINER_IMAGE>`
: コンテナ イメージを識別するための ID。<br/><br/>
たとえば `redis` を指定すると、`redis` に一致するイメージ名を持つすべてのコンテナに Autodiscovery テンプレートが適用されます。`foo/redis:latest` と `bar/redis:v2` の 2 つのコンテナがあれば、どちらにも適用されます。<br/><br/>
`ad_identifiers` パラメーターはリストを受け取るため、複数のコンテナ ID を指定できます。カスタム ID も使用可能です。詳細は [カスタム Autodiscovery 識別子][7] を参照してください。

`<INIT_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `init_config` セクションに記載されている設定パラメーター。通常は空です。

`<INSTANCES_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `instances` セクションに記載されている設定パラメーター。

`<LOGS_CONFIG>`
: インテグレーションの `<INTEGRATION_NAME>.d/conf.yaml.example` ファイルの `logs` セクションに記載されている設定パラメーター。

## 例

### Redis インテグレーション

Redis は [Autodiscovery 自動設定][6] に対応するテクノロジーの 1 つです。以下の例では、この基本設定を上書きし、`password` パラメーターを追加するカスタム設定を示します。

`REDIS_PASSWORD` という名前の環境変数にパスワードを保存した上で、次を実行します:

{{< tabs >}}
{{% tab "Docker" %}}

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
{{% tab "File" %}}
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
{{% tab "Key-value store" %}}

次の etcd コマンドは `password` パラメーターを含む Redis インテグレーション テンプレートを作成します:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

"ご覧のとおり、これら 3 つの値はすべてリストです。Autodiscovery は同じリスト インデックスを基にリスト項目を組み合わせてインテグレーション設定を生成します。この例では、`check_names[0]`、`init_configs[0]`、`instances[0]` から最初 (かつ唯一) のチェック設定が構成されます。
{{% /tab %}}
{{< /tabs >}}"

これらの例ではすべて [Autodiscovery テンプレート変数][1] を使用しています:
- `%%host%%` はコンテナの IP で動的に置き換えられます。
- `%%env_REDIS_PASSWORD%%` は Agent プロセスから見える `REDIS_PASSWORD` という環境変数を参照します。

複数のコンテナ セットに対して複数のチェックを設定する方法など、さらに多くの例については [Autodiscovery: シナリオ & 例][8] を参照してください。

[1]: /ja/containers/guide/template_variables/
[2]: /ja/getting_started/containers/autodiscovery
[3]: /ja/containers/guide/autodiscovery-management
[4]: /ja/containers/kubernetes/integrations/
[5]: /ja/agent/guide/use-community-integrations/
[6]: /ja/containers/guide/auto_conf
[7]: /ja/containers/guide/ad_identifiers
[8]: /ja/containers/guide/autodiscovery-examples