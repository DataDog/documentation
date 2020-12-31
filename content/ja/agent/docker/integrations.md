---
title: Docker インテグレーションオートディスカバリー
kind: ドキュメント
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
---
<div class="alert alert-info">
<a href="/getting_started/agent/autodiscovery">この機能の背後にある概念については、オートディスカバリーの概要ドキュメントを参照してください</a>。
</div>

このページでは、インテグレーションオートディスカバリーと Docker を構成する方法について説明します。Kubernetes を使用する場合は、[Kubernetes インテグレーションオートディスカバリーのドキュメント][1]を参照してください。

オートディスカバリーの目的は、特定のコンテナに対して Agent チェックを実行するときに、Datadog インテグレーション構成を適用することです。このロジックのより詳細な内容については、ホストで Agent を実行している場合の [Agent インテグレーションの構成方法][2]のドキュメントを参照してください。

オートディスカバリーを使用してインテグレーションを構成するには、以下のパラメーターを使用します。

| パラメーター            | 必須 | 説明                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<インテグレーション名>` | 〇      | Datadog インテグレーションの名前                                                                   |
| `<初期コンフィギュレーション>`      | 〇      | `特定の Datadog-`<INTEGRATION_NAME>` の init_config:` セクションの構成           |
| `<インスタンスコンフィギュレーション>`  | 〇      | `特定の Datadog-`<INTEGRATION_NAME>` の instances:` セクションの構成             |

[**オートディスカバリー対応の Agent インテグレーションの完全なリストとそれらのパラメーターの例をご覧ください**][3]

以下の各セクションのタブで、特定のコンテナにインテグレーションテンプレートを適用するそれぞれの方法を示します。次の方法があります。

* [Docker ラベル](?tab=docker#configuration)
* [Agent 内にマウントされた構成ファイル](?tab=file#configuration)
* [key-value ストア](?tab=keyvaluestore#configuration)

**注**: サポートされているインテグレーションの一部 ([Ceph][4]、[Varnish][5]、[Postfix][6]、[Cassandra Nodetools][7]、[Gunicorn][8]) は、プロセスツリーデータまたはファイルシステムへのアクセスを必要とするため、標準のオートディスカバリーに対応していません。これらのインテグレーションでオートディスカバリーを有効にするには、ポッドで公式の Prometheus エクスポーターを使用し、次に Agent でオートディスカバリーを使用してポッドを見つけ、エンドポイントをクエリします。

## 構成

{{< tabs >}}
{{% tab "Docker" %}}

Docker コンテナに対してオートディスカバリーを自動的に有効にするには、`/var/run/docker.sock` をコンテナ化 Agent にマウントします。Windows では、`\\.\pipe\docker_engine` をマウントします。

インテグレーションテンプレートは、Docker ラベルとして格納できます。オートディスカバリーを使用して、Agent は自身が Docker 上で実行されているかどうかを検出し、すべてのラベルでインテグレーションテンプレートを自動的に探します。オートディスカバリーは、以下の例のようなラベルを前提としています。

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<インテグレーション名>]'
LABEL "com.datadoghq.ad.init_configs"='[<初期コンフィギュレーション>]'
LABEL "com.datadoghq.ad.instances"='[<インスタンスコンフィギュレーション>]'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<インテグレーション名>]'
  com.datadoghq.ad.init_configs: '[<初期コンフィギュレーション>]'
  com.datadoghq.ad.instances: '[<インスタンスコンフィギュレーション>]'
```

**docker run command**:

```shell
-l com.datadoghq.ad.check_names='[<インテグレーション名>]' -l com.datadoghq.ad.init_configs='[<初期コンフィギュレーション>]' -l com.datadoghq.ad.instances='[<インスタンスコンフィギュレーション>]'
```

**Docker Swarm**:

Docker Cloud の Swarm モードを使用する場合は、以下のようにラベルをイメージに適用する必要があります。

```yaml
version: "1.0"
services:
...
  project:
    image: '<イメージ名>'
    labels:
      com.datadoghq.ad.check_names: '[<インテグレーション名>]'
      com.datadoghq.ad.init_configs: '[<初期コンフィギュレーション>]'
      com.datadoghq.ad.instances: '[<インスタンスコンフィギュレーション>]'

```

**注**: Datadog はオートディスカバリーを構成する際に、コンテナ化環境で Docker を使用してテレメトリを統一することをお勧めします。詳細は、[統合サービスタグ付け][1]のドキュメントを参照してください。


[1]: /ja/getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "File" %}}

テンプレートをローカルファイルとして保存し、それをコンテナ化 Agent 内にマウントする場合は、外部サービスや特定のオーケストレーションプラットフォームを必要としません。この方法の欠点は、テンプレートを変更、追加、または削除するたびに、Agent コンテナを再起動する必要がある点です。Agent は、マウントされた `/conf.d` ディレクトリでオートディスカバリーテンプレートを探します。

Agent v6.2.0 (および v5.24.0) 以降、デフォルトテンプレートはポートを自動検出するのではなく、監視対象ソフトウェアのデフォルトポートを使用します。別のポートを使用する必要がある場合は、[Docker コンテナラベル](?tab=docker-labels)で、カスタムオートディスカバリーテンプレートを指定します。

デフォルトのインテグレーションテンプレートは、基本的なケース向けです。追加オプションを有効にするためにカスタム Datadog インテグレーション構成が必要な場合は、別のコンテナ識別子を使用します。あるいは、テンプレート変数インデックスを使用して、独自のオートディスカバリー構成ファイルを作成します。

1. ホストに `conf.d/<INTEGRATION_NAME>.d/conf.yaml` ファイルを作成し、カスタムオートディスカバリー構成を追加します。
2. ホスト の `conf.d/` フォルダーをコンテナ化 Agent の `conf.d` フォルダーにマウントします。

**オートディスカバリー構成ファイル例**:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` の詳細については、[オートディスカバリーコンテナ識別子][1]のドキュメントを参照してください。

**注**: Agent はファイル名から直接 `<INTEGRATIONS_NAME>` を推測するため、この名前を設定する必要はありません。

[1]: /ja/agent/guide/ad_identifiers/
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
      - check_names: ["<インテグレーション名>"]
      - init_configs: ["<初期コンフィギュレーション>"]
      - instances: ["<インスタンスコンフィギュレーション>"]
    ...
```

**注**: key-value ストアを使用している場合、オートディスカバリーは特定の構成を特定のコンテナに適用するために、`<CONTAINER_IDENTIFIER>` と `.spec.containers[0].image` の一致を試みることで、コンテナを**イメージ**で識別します。

[1]: /ja/integrations/consul/
[2]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## 例

### Datadog Redis インテグレーション

{{< tabs >}}
{{% tab "Docker" %}}

以下の `docker-compose.yml` ファイルは、カスタム `password` パラメーターを使用して適切な Redis インテグレーションテンプレートを適用します。

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
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

Redis で、統計エンドポイントにアクセスする際に追加の `password` が必要な場合、以下のようにします。

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
```

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][3]を参照してください。

[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /ja/agent/guide/ad_identifiers/
[3]: /ja/agent/faq/template_variables/
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

**注**: パスワードがプレーンテキストで保存されることを避けるために、`"%%env_<ENV_VAR>%%"` テンプレート変数ロジックが使用されています。そのため、`REDIS_PASSWORD` 環境変数を Agent に渡す必要があります。[オートディスカバリーテンプレート変数のドキュメント][1]を参照してください。

auto-conf ファイルとは異なり、**key-value ストアの場合は、コンテナ識別子として短いイメージ名 (`redis` など) も長いイメージ名 (`redis:latest` など) も使用できます**。

[1]: /ja/agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

### Datadog Apache および HTTP チェックインテグレーション

以下の構成は、`<コンテナ識別子>`: `httpd` を持つ Apache コンテナイメージに適用されます。オートディスカバリーテンプレートは、Apache コンテナからメトリクスを収集し、2 つのエンドポイントをテストするためのインスタンスで Datadog-HTTP チェックをセットアップするように構成されます。

チェック名は、`apache`、`http_check`、これらの `<初期コンフィギュレーション>`、および `<インスタンスコンフィギュレーション>` です。完全な構成は、それぞれのドキュメントの [Datadog-Apache インテグレーション][9]と [Datadog-HTTP チェックインテグレーション][10]のページにあります。

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<ウェブサイト_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<ウェブサイト_2>","url":"http://%%host%%/website_2","timeout":1}]]'
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
```

**注**: これは、最小の [Apache チェック構成][1]とほぼ同じですが、`ad_identifiers` オプションがあることがわかります。この必須オプションを使用して、コンテナ識別子を指定できます。オートディスカバリーは、同じホスト上で `httpd` イメージを実行するすべてのコンテナにこのテンプレートを適用します。詳細は、[オートディスカバリーの識別子に関するドキュメント][2]を参照してください。

* 次に、ホストに `conf.d/http_check.d` フォルダーを作成します。
* ホストの `conf.d/http_check.d/conf.yaml` の下にカスタムオートディスカバリー構成を追加します。

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - name: "<ウェブサイト_1>"
    url: "http://%%host%%/website_1"
    timeout: 1

  - name: "<ウェブサイト_2>"
    url: "http://%%host%%/website_2"
    timeout: 1
```

* 最後に、ホストの `conf.d/` フォルダーをコンテナ化 Agent の `conf.d/` フォルダーにマウントします。

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /ja/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" %}}

```conf
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<ウェブサイト_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<ウェブサイト_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**注**: 各リストの順番が重要です。Agent は、構成の各部分が 3 つのリストの同じインデックスにある場合にのみ、HTTP チェック構成を正しく生成します。

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/integrations/
[2]: /ja/getting_started/integrations/#configuring-agent-integrations
[3]: /ja/integrations/#cat-autodiscovery
[4]: /ja/integrations/ceph/
[5]: /ja/integrations/varnish/#autodiscovery
[6]: /ja/integrations/postfix/
[7]: /ja/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /ja/integrations/gunicorn/
[9]: /ja/integrations/apache/#setup
[10]: /ja/integrations/http_check/#setup