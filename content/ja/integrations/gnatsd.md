---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - messaging
  - notification
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gnatsd/README.md'
display_name: Gnatsd
draft: false
git_integration_title: gnatsd
guid: 7edcf450-d9cf-44aa-9053-ece04ac7c21d
integration_id: gnatsd
integration_title: Gnatsd
is_public: true
kind: インテグレーション
maintainer: dev@goldstar.com
manifest_version: 1.0.0
metric_prefix: gnatsd.
name: gnatsd
public_title: Datadog-Gnatsd インテグレーション
short_description: Datadog で gnatsd クラスターを監視。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Gnatsd サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Gnatsd の状態を視覚化および監視できます。
- Gnatsd のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Gnatsd チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][4]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-gnatsd==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Gnatsd [メトリクス](#メトリクス)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーで `gnatsd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル gnatsd.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `gnatsd` を探します。

## 互換性

gnatsd チェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gnatsd" >}}


**注**: カスタム Nats クラスター名を使用する場合、メトリクスは次のようになります。
`gnatsd.connz.connections.cluster_name.in_msgs`

### イベント

gnatsd チェックには、イベントは含まれません。

### サービスのチェック

この gnatsd チェックは、収集するすべてのサービスチェックに次のタグを付けます。

- `server_name:<server_name_in_yaml>`
- `url:<host_in_yaml>`

`gnatsd.can_connect`:
Agent が _monitoring_ エンドポイントから 200 を受信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/gnatsd/datadog_checks/gnatsd/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/datadog-sdk-testing/blob/master/lib/config/metadata.csv
[11]: https://docs.datadoghq.com/ja/help/