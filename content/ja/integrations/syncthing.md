---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Syncthing Overview: assets/dashboards/syncthing_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    '[Syncthing] Disconnected': assets/monitors/syncthing_disconnected.json
    '[Syncthing] Folder error': assets/monitors/syncthing_folder_error.json
    '[Syncthing] Out of sync': assets/monitors/syncthing_out_of_sync.json
    '[Syncthing] System error': assets/monitors/syncthing_system_error.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- コラボレーション
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/syncthing/README.md
display_name: Syncthing
draft: false
git_integration_title: syncthing
guid: 1e29ccc9-cec4-4cf5-b566-2f71021ad315
integration_id: syncthing
integration_title: Syncthing
integration_version: 1.0.0
is_public: true
kind: integration
maintainer: Alexander@Bushnev.ru
manifest_version: 1.0.0
metric_prefix: syncthing.
metric_to_check: syncthing.connections.count
name: syncthing
public_title: Datadog-Syncthing インテグレーション
short_description: Syncthing インスタンスからの全体的な統計情報を追跡
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

Syncthing は、2 台以上のコンピュータ間でファイルをリアルタイムに同期させます。このインテグレーションにより、Datadog を使用して [Syncthing][1] を監視することができます。

## セットアップ

Syncthing チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Syncthing チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent で Syncthing チェックをインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-syncthing==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Syncthing の[メトリクス](#metrics) を収集するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `syncthing.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル syncthing.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンド][8]を実行し、Checks セクションで `syncthing` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "syncthing" >}}


### イベント

Syncthing には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "syncthing" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://syncthing.net/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/datadog_checks/syncthing/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/