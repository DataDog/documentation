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
  - 'https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/README.md'
display_name: Redis Sentinel
draft: false
git_integration_title: redis_sentinel
guid: 8efe0a8c-88c6-4a2f-aa04-60d92051c458
integration_id: redis-sentinel
integration_title: Redis Sentinel
is_public: true
kind: インテグレーション
maintainer: '@krasnoukhov'
manifest_version: 1.1.0
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

Redis の Sentinel チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Redis の Sentinel チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][1]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-redis_sentinel==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Redis Sentinel の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `redis_sentinel.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル upsc.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

## 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションで `redis_sentinel` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "redis_sentinel" >}}


### イベント

Redis の Sentinel チェックには、イベントは含まれません。

### サービスのチェック

**`redis.sentinel.master_is_down`**

チェックは次の内容を返します。

- マスターが動作している場合は、`OK`。
- マスターが停止している場合は、`CRITICAL`。

**`redis.sentinel.master_is_disconnected`**

チェックは次の内容を返します。

- マスターが切断されていない場合は、`OK`。
- マスターが切断されている場合は、`CRITICAL`。

**`redis.sentinel.slave_master_link_down`**

チェックは次の内容を返します。

- マスターのリンクステータスが OK の場合は、`OK`。
- マスターのリンクステータスが OK でない場合は、`CRITICAL`。

**`redis.sentinel.slave_is_disconnected`**

チェックは次の内容を返します。

- スレーブが切断されていない場合は、`OK`。
- スレーブが切断されている場合は、`CRITICAL`。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv