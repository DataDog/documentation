---
aliases:
- /ja/integrations/faq/compose-and-the-datadog-agent
- /ja/agent/guide/compose-and-the-datadog-agent
further_reading:
- link: https://github.com/DataDog/docker-compose-example
  tag: ソースコード
  text: Datadog で Docker Compose を使用する例
- link: /agent/docker/
  tag: Documentation
  text: Datadog Docker Agent ドキュメント
- link: /agent/docker/log/
  tag: Documentation
  text: Datadog Docker Log コレクションドキュメント
title: Compose と Datadog Agent
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

### APM トレース収集

上記の Redis 例を基に、Compose を使用して Datadog Agent を構成し、アプリケーション トレースを収集することもできます。この `docker-compose.yml` は、GitHub の [Docker Compose 例][4]から取得したものです。

```yaml
version: "4"
services:
  web:
    build: web
    command: ddtrace-run python app.py
    ports:
     - "5000:5000"
    volumes:
     - ./web:/code # 新しい app パスに対応するように変更
    links:
     - redis
    environment:
     - DATADOG_HOST=datadog # web アプリが Datadog ライブラリを初期化する際に使用
     - DD_AGENT_HOST=dd-agent # トレース送信先として dd-agent を指す
  redis:
    image: redis
  # Agent セクション
  datadog:
    container_name: dd-agent
    build: datadog
    links:
     - redis # redis がコンテナで解決可能なホスト名になるように保証
     - web # web アプリがメトリクスを送信できるように保証
    environment:
     - DD_API_KEY=<YOUR_API_KEY>
     - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # 他コンテナからのカスタム メトリクスを Agent が受信できるようにする
     - DD_APM_ENABLED=true # トレースを有効化
     - DD_APM_NON_LOCAL_TRAFFIC=true # 他コンテナからのトレースを Agent が受信できるようにする
     - DD_AGENT_HOST=dd-agent # web コンテナがトレースを Agent に転送できるようにする
     - DD_SITE=datadoghq.com # データ送信先の Datadog インスタンスを指定 (例: EU1 なら datadoghq.eu に変更)
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

`<YOUR_API_KEY>` をあなたの API キーに置き換えてください。

前述の例での主な変更点は、`DD_AGENT_HOST` 環境変数の設定です。トレースを収集するためには、`web` コンテナと Agent コンテナの両方で同じ値にする必要があります。`DD_APM_ENABLED` は APM を有効にし、`DD_APM_NON_LOCAL_TRAFFIC` は Agent が他コンテナからのトレースを受信できるようにします。

この例では、Python Web アプリの `requirements.txt` に `ddtrace` ライブラリも追加しており、`ddtrace-run` で初期化して APM を有効化します。(以下のリストにある `datadog` ライブラリは、カスタム DogStatsD メトリクスを収集するために使用されます。)
```
flask
redis
datadog
ddtrace <--
``` 

最後に、Web アプリの `Dockerfile` を次のように変更して、`service`、`env`、`version` タグを設定します:

```dockerfile
FROM python:2.7
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt

# ここで DD タグを設定する
ENV DD_SERVICE web        <-- Datadog での "service" 名を設定
ENV DD_ENV sandbox        <-- Datadog での "env" 名を設定
ENV DD_VERSION 1.0        <-- Datadog での "version" 番号を設定
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

**注**: この構成では `Redis` コンテナのログのみを収集します。Datadog Agent のログを収集したい場合は、同様の `com.datadoghq.ad.logs` ラベルを追加してください。すべてのコンテナからログを収集するには、環境変数 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` を `true` に設定します。詳細は [Docker ログ収集][5]を参照してください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /ja/agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: https://github.com/DataDog/docker-compose-example
[5]: /ja/agent/logs/