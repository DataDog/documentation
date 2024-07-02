---
title: Compose and the Datadog Agent
further_reading:
    - link: "https://github.com/DataDog/docker-compose-example"
      tag: ソースコード
      text: Using Docker Compose with Datadog Example
    - link: /agent/docker/
      tag: Documentation
      text: Datadog Docker Agent documentation
    - link: /agent/docker/log/
      tag: Documentation
      text: Datadog Docker Log collection documentation
aliases:
    - /integrations/faq/compose-and-the-datadog-agent
    - /agent/guide/compose-and-the-datadog-agent
---

[Compose][1] は、複数のコンテナを 1 つのアプリケーションとして定義、ビルド、実行できるようにすることで、Docker 上でのアプリケーション構築を簡素化する Docker ツールです。

[単一コンテナのインストール手順][2]では、純正の Datadog Agent コンテナが実行されますが、Compose アプリケーションの一部である他のコンテナ化されたサービスに対してインテグレーションを有効にしたい場合があります。そのためには、インテグレーション用の YAML ファイルと Datadog Agent のベースイメージを組み合わせて、Datadog Agent コンテナを作成する必要があります。その後、コンテナを Compose YAML に追加します。

### Redis の例

以下は、Compose を使用して Redis コンテナを監視する例です。ファイル構造は

```text
|- docker-compose.yml
|- datadog
  |- Dockerfile
  |- conf.d
    |-redisdb.yaml
```

`docker-compose.yml` ファイルは、コンテナがどのように連携するかを記述し、コンテナの構成に関するいくつかの詳細を設定します。

```yaml
version: '3'
services:
  redis:
    image: redis
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

`redisdb.yaml` は [redisdb.yaml.example ファイル][3]に倣い、Datadog Agent に `redis`というホスト (上記の `docker-compose.yaml` で定義) を探し、Redis の標準ポートを使用するよう指示します。

```yaml
init_config:

instances:
    - host: redis
      port: 6379
```

`Dockerfile` は、Docker compose が適切な場所に `redisdb.yaml` ファイルを含む Datadog Agent イメージをビルドするよう指示するために使用されます。

```
FROM gcr.io/datadoghq/agent:latest
ADD conf.d/redisdb.yaml /etc/datadog-agent/conf.d/redisdb.yaml
```


### ログ収集

Datadog Agent がコンテナログを収集できるように、`docker-compose.yml` を拡張することが可能です。

```yaml
version: '3'
services:
  redis:
    image: redis
    labels:
      com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
     - DD_LOGS_ENABLED=true
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
     - /var/lib/docker/containers:/var/lib/docker/containers:ro
```

**注**: 上記の構成では、`Redis` コンテナからログを収集するのみです。同様の `com.datadoghq.ad.logs` ラベルを追加することで、Datadog Agent からログを収集することができます。また、環境変数 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` を `true` に設定することにより、全てのコンテナに対して明示的にログ収集を有効にすることができます。詳細は [Docker ログ収集ドキュメント][4]を参照してください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: /agent/logs/
