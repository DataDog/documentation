---
app_id: nextcloud
app_uuid: a48ccc77-3e72-4e3b-b439-3ebe7e2688b7
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nextcloud.server.database.size
      metadata_path: metadata.csv
      prefix: nextcloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10214
    source_type_name: Nextcloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: emeric.planet@gmail.com
  support_email: emeric.planet@gmail.com
categories:
- コラボレーション
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nextcloud/README.md
display_on_public_website: true
draft: false
git_integration_title: nextcloud
integration_id: nextcloud
integration_title: Nextcloud
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: nextcloud
public_title: Nextcloud
short_description: Nextcloud インスタンスからの総合的な統計を追跡
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Collaboration
  - Offering::Integration
  configuration: README.md#Setup
  description: Nextcloud インスタンスからの総合的な統計を追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nextcloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは [Nextcloud][1] を監視します。

## セットアップ

Nextcloud チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Nextcloud チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-nextcloud==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### 設定

1. Nextcloud の[メトリクス](#メトリクス) を収集するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `nextcloud.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nextcloud.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンド][8]を実行し、Checks セクションで `nextcloud` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nextcloud" >}}


#### Optional metrics

The `nextcloud.system.apps.*` metrics are optional and enabled with the `apps_stats` configuration key. Beginning with Nextcloud 28, the monitoring endpoint no longer provides information about available app updates, as gathering the data always involves at least one external request to apps.nextcloud.com.

It is still possible to ask the monitoring endpoint to [show new app updates][10] by using the URL parameter `skipApps=false`. However, Nextcloud recommends to not check this endpoint too often.

### イベント

Nextcloud には、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "nextcloud" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://nextcloud.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/datadog_checks/nextcloud/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/metadata.csv
[10]: https://github.com/nextcloud/serverinfo#api
[11]: https://github.com/DataDog/integrations-extras/blob/master/nextcloud/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/