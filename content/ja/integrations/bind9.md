---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - モニター
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md'
display_name: BIND 9
draft: false
git_integration_title: bind9
guid: bce6961c-4312-11e9-b210-d663bd873d93
integration_id: bind9
integration_title: bind9
is_public: true
kind: インテグレーション
maintainer: ashuvyas45@gmail.com
manifest_version: 1.0.0
metric_prefix: bind9.
name: bind9
public_title: Datadog-bind9 インテグレーション
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

Bind9 チェックは [Datadog Agent][2] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従ってホストに Bind9 チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][2]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-bind9==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Bind9 の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][7]のルートにある `conf.d/` フォルダーの `bind9.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル bind9.d/conf.yaml][8] を参照してください。

   ```yaml
   init_config:

   instances:
     - URL: "<BIND_9_STATS_URL>"
   ```

2. [Agent を再起動します][9]

### 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `bind9` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "bind9" >}}


### イベント

現時点で、bind9_check チェックには、イベントは含まれません。

### サービスのチェック

`bind9_check.BIND_SERVICE_CHECK`: DNS の統計チャンネル URL がインスタンスに存在する場合は、`OK` を返します。
`bind9_check.BIND_SERVICE_CHECK`: URL エラーが発生した場合は、`CRITICAL` を返します。

## 開発

Agent ベースのインテグレーションのテストおよび開発方法の詳細については、[メインドキュメント][12]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[12]: https://docs.datadoghq.com/ja/developers/