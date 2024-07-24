---
app_id: syncthing
app_uuid: a61c3428-6898-45be-8a20-89f4c039a56d
assets:
  dashboards:
    Syncthing Overview: assets/dashboards/syncthing_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: syncthing.connections.count
      metadata_path: metadata.csv
      prefix: syncthing.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10276
    source_type_name: Syncthing
  monitors:
    '[Syncthing] Device not connected': assets/monitors/syncthing_device_not_connected.json
    '[Syncthing] Disconnected': assets/monitors/syncthing_disconnected.json
    '[Syncthing] Folder error': assets/monitors/syncthing_folder_error.json
    '[Syncthing] Out of sync': assets/monitors/syncthing_out_of_sync.json
    '[Syncthing] Service error': assets/monitors/syncthing_service_error.json
    '[Syncthing] System error': assets/monitors/syncthing_system_error.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: Alexander@Bushnev.pro
  support_email: Alexander@Bushnev.pro
categories:
- コラボレーション
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/syncthing/README.md
display_on_public_website: true
draft: false
git_integration_title: syncthing
integration_id: syncthing
integration_title: Syncthing
integration_version: 1.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: syncthing
public_title: Syncthing
short_description: Syncthing インスタンスからの全体的な統計情報を追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Collaboration
  - Category::Security
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Syncthing インスタンスからの全体的な統計情報を追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Syncthing
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Syncthing は、2 台以上のコンピュータ間でファイルをリアルタイムに同期させます。このインテグレーションにより、Datadog を使用して [Syncthing][1] を監視することができます。

## 計画と使用

Syncthing チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Syncthing チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent で Syncthing チェックをインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-syncthing==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Syncthing の[メトリクス](#metrics) を収集するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `syncthing.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル syncthing.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンド][8]を実行し、Checks セクションで `syncthing` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "syncthing" >}}


### ヘルプ

Syncthing には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "syncthing" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://syncthing.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/datadog_checks/syncthing/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/syncthing/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/