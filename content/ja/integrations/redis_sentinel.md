---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/README.md
display_name: Redis Sentinel
draft: false
git_integration_title: redis_sentinel
guid: 8efe0a8c-88c6-4a2f-aa04-60d92051c458
integration_id: redis-sentinel
integration_title: Redis Sentinel
integration_version: 1.1.0
is_public: true
kind: インテグレーション
maintainer: '@krasnoukhov'
manifest_version: 1.0.0
metric_prefix: redis.
metric_to_check: redis.sentinel.known_sentinels
name: redis_sentinel
public_title: Datadog-Redis Sentinel インテグレーション
short_description: Redis Sentinel は Redis に高可用性を提供します。
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

Redis の Sentinel サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Sentinel の状態を視覚化および監視できます。
- フェイルオーバーが通知されます。

## セットアップ

Redis Sentinel チェックは [Datadog Agent][1] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Redis Sentinel チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][2]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-redis_sentinel==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][3]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Redis Sentinel の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][4]のルートにある `conf.d/` フォルダーの `redis_sentinel.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル upsc.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

## 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `redis_sentinel` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "redis_sentinel" >}}


### イベント

Redis の Sentinel チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "redis_sentinel" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/assets/service_checks.json
[10]: http://docs.datadoghq.com/help