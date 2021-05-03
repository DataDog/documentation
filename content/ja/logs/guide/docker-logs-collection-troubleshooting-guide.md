---
title: Docker ログ収集のトラブルシューティングガイド
kind: documentation
---
コンテナ Agent、またはローカルにインストールされたホスト Agent で Datadog に新しいコンテナ ログを送信する際に、よく障害となる問題がいくつかあります。新しいログを Datadog に送信する際に問題が発生した場合は、このガイドをトラブルシューティングにお役立てください。それでも問題が解決しない場合は、[Datadog サポートチーム][1]までお問い合わせください。

## Agent のステータスのチェック

1. ロギング Agent に問題があるか確認するには、以下のコマンドを実行します。

    ```
    docker exec -it <CONTAINER_NAME> agent status
    ```

2. すべてがスムーズに稼働している場合は、以下のようなステータスが表示されるはずです。　

    ```
    ==========
    Logs Agent
    ==========
        LogsProcessed: 42
        LogsSent: 42

      container_collect_all
      ---------------------
        Type: docker
        Status: OK
        Inputs: 497f0cc8b673397ed31222c0f94128c27a480cb3b2022e71d42a8299039006fb
    ```

3. ログ Agent のステータスが上記とは異なる場合、以下のセクションにあるトラブルシューティングのヒントを参照してください。

4. 上記のようなステータスが表示されるが、ログを受信できない場合は、[ログ Agent のステータスがエラーを表示しない場合](#if-the-logs-agent-status-shows-no-errors)のセクションを参照してください。

## ログ Agent

### ステータス: 停止中

Agent のステータスコマンドを実行すると以下のメッセージが表示される場合:

```text
==========
Logs Agent
==========

  Logs Agent is not running
```

これは、Agent でロギングが有効になっていないことを意味します。

コンテナ Agent のロギングを有効にするには、環境変数 `DD_LOGS_ENABLED=true` を設定します。

### 処理済みまたは送信済みのログはありません

ログ Agent のステータスにインテグレーションが表示されず、`LogsProcessed: 0 and LogsSent: 0` と表示されることがあります。

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0
```

この場合、ログは有効になっていますが、Agent がログを収集するコンテナが指定されていません。

1. 設定した環境変数をチェックするには、`docker inspect <AGENT_CONTAINER>` コマンドを実行します。

2. Agent が他のコンテナからログを収集するように構成するには、`DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 環境変数を `true` に設定してください。

### ステータス: 保留中

ログ Agent のステータスに "Status: Pending" と表示されることがあります。

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0

  container_collect_all
  ---------------------
    Type: docker
    Status: Pending
```

この場合、ログ Agent は稼働していますが、コンテナログの収集を開始していません。それには以下の理由が考えられます。

#### ホスト Agent の後に Docker Daemon が開始

Agent のバージョンが 7.17 よりも古い場合で、ホスト Agent が稼働してから Docker デーモンを開始した場合は、Agent を再起動して、コンテナの収集をトリガーし直してください。

#### Docker ソケットがマウントされていません

コンテナ Agent が Docker コンテナからログを収集するには、Docker ソケットへのアクセスが許可されている必要があります。アクセスできない場合は、以下のログが `agent.log` に表示されます。

```text
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:51 in NewLauncher) | Could not setup the docker launcher: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:58 in NewLauncher) | Could not setup the kubernetes launcher: /var/log/pods not found
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:61 in NewLauncher) | Container logs won't be collected
```

Docker ソケットへのアクセスを可能にするには、`-v /var/run/docker.sock:/var/run/docker.sock:ro` のオプションを使用して Agent コンテナを再起動します。

### ステータス: エラーなし

ログ Agent のステータスが [Agent のステータスのチェック](#check-the-agent-status)の例のように表示されるものの、ログが Datadog プラットフォームに到達しない場合は、次のいずれかの問題が考えられます。

* Datadog へのログの送信に必要なポート (10516) がブロックされる。
* Agent が予期するものとは異なるロギングドライバーが、コンテナに使用されている。

#### ポート 10516 のアウトバウンドトラフィックがブロックされる

Datadog Agent は、ポート 10516 から TCP で Datadog にログを送信します。この接続が使用できない場合、ログは送信に失敗し、それを示すエラーが `agent.log` ファイルに記録されます。

手動で接続をテストするには、次の Telnet または OpenSSL コマンドを実行します (ポート 10514 でも動作しますが、安全性は劣ります)。

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

さらに、次のようなログを送信します。

```text
<API_KEY> これはテストメッセージです
```

ポート 10514 または 10516 を開くことを選択できない場合は、`DD_LOGS_CONFIG_USE_HTTP` 環境変数を `true` に設定して、Datadog Agent が HTTPS 経由でログを送信するよう構成することができます。

#### コンテナに JSON ロギングドライバーが使用されていない

Docker のデフォルトのロギングドライバーは json-file であり、コンテナ Agent はまずこのドライバーから読み取ろうとします。コンテナが別のロギングドライバーを使用するように設定されている場合、ログ Agent はコンテナを見つけることはできますが、ログを収集することができません。コンテナ Agent は、journald ロギングドライバーから読み取るように構成することもできます。

1. どのロギングドライバーがコンテナに使用されているかわからない場合は、`docker inspect <コンテナ名>`を使用して、設定されているロギングドライバーを確認してください。コンテナに JSON ロギングドライバーが使用されている場合は、次のコードブロックが表示されます。

    ```text
    "LogConfig": {
        "Type": "json-file",
        "Config": {}
    },
    ```

2. コンテナに journald Dockerロギングドライバーが使用されている場合は、次のコードブロックが表示されます。

    ```text
    "LogConfig": {
        "Type": "journald",
        "Config": {}
    },
    ```

3. journald ロギングドライバーからログを収集するには、[Datadog-Journald のドキュメントに従って][2] journald インテグレーションを設定してください。

4. [Docker Agent のドキュメント][3]の説明に従って、YAML ファイルをコンテナにマウントする必要があります。Docker コンテナへのログドライバーの設定について詳しくは、[こちらのドキュメント][4]を参照してください。

## Agent は、大量のログ (> 1GB) を保持しているコンテナからログを送信しません

Docker デーモンは、ディスクに大きなログファイルがすでに格納されているコンテナのログを取得しようとしているときに、パフォーマンスの問題が発生する可能性があります。これにより、Datadog Agent が Docker デーモンからコンテナのログを収集しているときに、読み取りタイムアウトが発生する可能性があります。

これが発生すると、Datadog Agent は、30 秒ごとに特定のコンテナに対して `Restarting reader after a read timeout` を含むログを出力し、実際にはメッセージをログに記録している間、そのコンテナからのログの送信を停止します。

デフォルトの読み取りタイムアウトは 30 秒に設定されています。この値を大きくすると、Docker デーモンが Datadog Agent に応答するための時間が長くなります。この値は、`logs_config.docker_client_read_timeout` パラメーターを使用するか、環境変数 `DD_LOGS_CONFIG_DOCKER_CLIENT_READ_TIMEOUT` を使用して、`datadog.yaml` で設定できます。この値は秒単位の継続時間です。以下の例では 60 秒に増やしています。

```yaml
logs_config:
  docker_client_read_timeout: 60
```

## ホスト Agent
### Docker グループの Agent ユーザー

ホスト Agent を使用している場合、Docker ソケットからの読み取り許可を得るにはユーザー `dd-agent` を Docker グループに追加する必要があります。`agent.log` ファイルに以下のエラーログが表示される場合、

```text
2019-10-11 09:17:56 UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied

2019-10-11 09:17:56 UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

ホスト Agent を Docker ユーザーグループに追加するには、`usermod -a -G docker dd-agent` のコマンドを実行します。

[1]: /ja/help/
[2]: /ja/integrations/journald/#setup
[3]: /ja/agent/docker/?tab=standard#mounting-conf-d
[4]: https://docs.docker.com/config/containers/logging/journald/