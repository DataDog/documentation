---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    gunicorn: assets/dashboards/gunicorn_dashboard.json
  logs:
    source: gunicorn
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    gunicorn_processes: assets/saved_views/gunicorn_processes.json
    status_code_overview: assets/saved_views/status_code_overview.json
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gunicorn/README.md'
display_name: Gunicorn
draft: false
git_integration_title: gunicorn
guid: 5347bfe1-2e9b-4c92-9410-48b8659ce10f
integration_id: gunicorn
integration_title: Gunicorn
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gunicorn.
metric_to_check: gunicorn.workers
name: gunicorn
process_signatures:
  - 'gunicorn: master'
public_title: Datadog-Gunicorn インテグレーション
short_description: リクエスト率、リクエスト処理時間、ログメッセージ率、ワーカープロセス数を監視。
support: コア
supported_os:
  - linux
  - mac_os
---
![Gunicorn のダッシュボード][1]

## 概要

Datadog Agent は、Gunicorn の主要なメトリクスとして、実行中のワーカープロセス数のみを収集します。サービスチェックについても、Gunicorn が実行中かどうかのみを送信します。

Gunicorn 自身は、これ以外にも以下のようなメトリクスを DogStatsD 経由で提供しています。

- 合計リクエスト率
- ステータスコード (2xx、3xx、4xx、5xx) 別のリクエスト率
- リクエスト処理時間 (平均値、中央値、最大値、95 パーセンタイルなど)
- ログレベル (重大、エラー、警告、例外) 別のログメッセージ率

## セットアップ

### インストール

Datadog Agent の Gunicorn チェックは [Datadog Agent][2] パッケージに含まれています。Gunicorn サーバーに追加でインストールする必要はありません。

Gunicorn チェックでは、Gunicorn アプリの Python 環境に [`setproctitle`][3] パッケージが含まれている必要があります。これがないと、Datadog Agent は常に `gunicorn` マスタープロセスが見つからない (したがって、ワーカーも見つからない) と報告します。`gunicorn.workers` メトリクスを収集する場合は、アプリの Python 環境に `setproctitle` パッケージをインストールしてください。

### コンフィギュレーション

Gunicorn の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `gunicorn.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル gunicorn.yaml][5] を参照してください。

#### メトリクスの収集

##### Gunicorn の DogStatsD への接続

1. バージョン 19.1 以降の Gunicorn では、[DogStatsD][7] のような StatsD プロトコルを実装するデーモンにメトリクスを送信する[オプションが提供][6]されるようになりました。Gunicorn の多くのオプションと同様に、このオプションは CLI (`--statsd-host`) で `gunicorn` に渡すか、アプリの構成ファイル (`statsd_host`) で設定できます。**すべての Gunicorn メトリクス**を収集するには、`"localhost:8125"` で [DogStatsD][7] へメトリクスを送信するようにアプリを構成し、アプリを再起動します。

2. [Gunicorn のメトリクス](#メトリクス)の収集を開始するには、`gunicorn.d/conf.yaml` ファイルに次の構成ブロックを追加します。

```yaml
init_config:

instances:
    ## @param proc_name - 文字列 - 必須
    ## gunicorn プロセスの名前。次の gunicorn サーバーの場合:
    ##
    ## gunicorn --name <WEB_APP_NAME> <WEB_APP_CONFIG>.ini
    ##
    ## 名前は `<WEB_APP_NAME>` です
  - proc_name: <YOUR_APP_NAME>
```

2. [Agent を再起動][2]すると、Datadog への Gunicorn メトリクスの送信が開始されます。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. [Gunicorn のドキュメント][8]の説明に従い、コマンド `--access-logfile <MY_FILE_PATH>` を使用してアクセスログファイルのパスを設定します。

3. [Gunicorn のドキュメント][9]の説明に従い、コマンド `--error-logfile FILE, --log-file <MY_FILE_PATH>` を使用してエラーログファイルのパスを設定します。

4. Gunicorn のログの収集を開始するには、次の構成ブロックを `gunicorn.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/gunicorn/access.log
       service: "<MY_SERVICE>"
       source: gunicorn

     - type: file
       path: /var/log/gunicorn/error.log
       service: "<MY_SERVICE>"
       source: gunicorn
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \[\d{4}-\d{2}-\d{2}
   ```

    `service` パラメーターと `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gunicorn.yaml][5] を参照してください。

5. [Agent を再起動します][2]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `gunicorn` を探します。

ステータスが `OK` でない場合は、トラブルシューティングセクションを参照してください。

`netstat` を使用して、Gunicorn が**自身の**メトリクスを送信していることを確認します。

```text
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:38374         127.0.0.1:8125          ESTABLISHED 15500/gunicorn: mas
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "gunicorn" >}}


### イベント

Gunicorn チェックには、イベントは含まれません。

### サービスのチェック

**gunicorn.is_running**:<br>
Agent が Gunicorn マスタープロセスまたは稼働中/アイドル状態のワーカープロセスを見つけられない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

### Agent が Gunicorn プロセスを見つけられない

```shell
  Checks
  ======

    gunicorn (5.12.1)
    -----------------
      - instance #0 [ERROR]: 'Found no master process with name: gunicorn: master [my_web_app]'
      - Collected 0 metrics, 0 events & 1 service check
      - Dependencies:
          - psutil: 4.4.1
```

Gunicorn が実際には実行されていないか、アプリの Python 環境に `setproctitle` パッケージがインストールされていないことが原因です。

`setproctitle` がインストールされていない場合は、プロセステーブルに Gunicorn が次のように表示されます。

```text
$ ps -ef | grep gunicorn
ubuntu   18013 16695  2 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18018 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
ubuntu   18019 18013  0 20:23 pts/0    00:00:00 /usr/bin/python /usr/bin/gunicorn --config test-app-config.py gunicorn-test:app
```

**インストールされている**場合は、Datadog Agent が想定する形式で `gunicorn` プロセスが表示されます。

```text
$ ps -ef | grep gunicorn
ubuntu   18457 16695  5 20:26 pts/0    00:00:00 gunicorn: master [my_app]
ubuntu   18462 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
ubuntu   18463 18457  0 20:26 pts/0    00:00:00 gunicorn: worker [my_app]
```

## その他の参考資料

- [Datadog を使用した Gunicorn パフォーマンスの監視][12]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/gunicorn/images/gunicorn-dash.png
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://pypi.python.org/pypi/setproctitle
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/datadog_checks/gunicorn/data/conf.yaml.example
[6]: https://docs.gunicorn.org/en/stable/settings.html#statsd-host
[7]: https://docs.datadoghq.com/ja/guides/dogstatsd/
[8]: https://docs.gunicorn.org/en/stable/settings.html#accesslog
[9]: https://docs.gunicorn.org/en/stable/settings.html#errorlog
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/gunicorn/metadata.csv
[12]: https://www.datadoghq.com/blog/monitor-gunicorn-performance