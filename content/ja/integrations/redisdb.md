---
aliases:
  - /ja/integrations/redis/
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - caching
  - log collection
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/redisdb/README.md'
display_name: Redis
git_integration_title: redisdb
guid: 0e2f3ed1-d36b-47a4-b69c-fedb50adf240
integration_id: redis
integration_title: Redis
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: redis.
metric_to_check: redis.net.clients
name: redisdb
process_signatures:
  - redis-server
public_title: Datadog-Redis インテグレーション
short_description: redis のパフォーマンス、メモリ使用量、クライアントのブロック数、キーのエビクション数を追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Redis をデータベース、キャッシュ、メッセージキューのどの用途で使用している場合でも、このインテグレーションを使用して、Redis サーバーの問題や、インフラストラクチャーが Redis サーバーを利用している部分の問題を追跡できます。Datadog Agent の Redis チェックは、パフォーマンスに関連するメトリクス、メモリ使用量、クライアントのブロック数、スレーブ接続数、ディスク持続性、キーの期限切れ数とエビクション数など、多数のメトリクスを収集します。

## セットアップ

### インストール

Redis チェックは [Datadog Agent][2] パッケージに含まれています。Redis サーバーに追加でインストールする必要はありません。

### コンフィグレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

##### メトリクスの収集

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `redisdb.d/conf.yaml` ファイルを編集します。以下のパラメーターは、更新が必要な場合があります。使用可能なすべての構成オプションの詳細については、[サンプル redisdb.d/conf.yaml][4] を参照してください。

   ```yaml
   init_config:
   instances:
     ## @param host - string - required
     ## Enter the host to connect to.
     - host: localhost
       ## @param port - integer - required
       ## Enter the port of the host to connect to.
       port: 6379
   ```

2. [Agent を再起動します][5]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `redisdb.d/conf.yaml` の下部にある、次の構成ブロックのコメントを解除して編集します。

   ```yaml
   logs:
     - type: file
       path: /var/log/redis_6379.log
       source: redis
       sourcecategory: database
       service: myapplication
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル redisdb.yaml][4] を参照してください。

3. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `redisdb`                                                                  |
| `<INIT_CONFIG>`      | 空白または `{}`                                                              |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"6379", "password":"%%env_REDIS_PASSWORD%%"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][11]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "redis", "service": "<YOUR_APP_NAME>"}` |

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `redisdb` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "redisdb" >}}


### イベント

Redis チェックには、イベントは含まれません。

### サービスのチェック

**redis.can_connect**:<br>
Agent が Redis に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**redis.replication.master_link_status**:<br>
この Redis インスタンスがマスターインスタンスに接続できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

- [Redis インテグレーションエラー: "unknown command 'CONFIG'"][8]

### Agent が接続できない

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service chec
```

`redisdb.yaml` 内の接続情報が正しいかどうかをチェックしてください。

### Agent を認証できない

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

`redisdb.yaml` で `password` を設定してください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Redis パフォーマンスメトリクスの監視方法][10]

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/redisdb/metadata.csv
[8]: https://docs.datadoghq.com/ja/integrations/faq/redis-integration-error-unknown-command-config
[9]: https://docs.datadoghq.com/ja/developers/integrations
[10]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics
[11]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#setup