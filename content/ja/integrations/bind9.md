---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- モニター
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_name: BIND 9
draft: false
git_integration_title: bind9
guid: bce6961c-4312-11e9-b210-d663bd873d93
integration_id: bind9
integration_title: bind9
integration_version: 1.0.0
is_public: true
kind: インテグレーション
maintainer: ashuvyas45@gmail.com
manifest_version: 1.0.0
metric_prefix: bind9.
metric_to_check: bind9.nsstat_AuthQryRej
name: bind9
public_title: bind9
short_description: bind9 サーバーのメトリクスを収集する Datadog インテグレーション
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

Bind9 DNS サーバーからメトリクスを取得すると、以下のことができます。

- bind9 統計を視覚化および監視できます。

![スナップ][1]

## セットアップ

Bind9 チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Bind9 チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-bind9==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Bind9 の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `bind9.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル bind9.d/conf.yaml][6] を参照してください。

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [Agent を再起動します][7]。

### 検証

[Agent の `status` サブコマンドを実行][8]し、Checks セクションで `bind9` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "bind9" >}}


### イベント

bind9 チェックにはイベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "bind9" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help