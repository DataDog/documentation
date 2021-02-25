---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/storm/README.md'
display_name: storm
draft: false
git_integration_title: storm
guid: 5a9ec2c3-8ea0-4337-8c45-a6b8a36b8721
integration_id: storm
integration_title: Storm
is_public: true
kind: インテグレーション
maintainer: '@platinummonkey'
manifest_version: 1.0.0
metric_prefix: storm.
name: storm
public_title: Datadog-Storm インテグレーション
short_description: Apache Storm 1.x.x トポロジー実行統計
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Storm サービスからリアルタイムにメトリクスを取得して、以下のことができます。

- Storm のクラスターメトリクスとトポロジーメトリクスを視覚化して監視できます。
- Storm のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Storm チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従ってホストに Storm チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][1]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-storm==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Storm の[メトリクス](#メトリクス) を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `storm.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル storm.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

## 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションで `storm` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "storm" >}}


### イベント

Storm チェックには、イベントは含まれません。

### サービスのチェック

**`topology_check.{TOPOLOGY NAME}`**

チェックは次の内容を返します。

- `OK` - トポロジーがアクティブな場合。
- `CRITICAL` - トポロジーがアクティブでない場合。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/storm/datadog_checks/storm/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/storm/metadata.csv
[11]: http://docs.datadoghq.com/help