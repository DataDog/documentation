---
app_id: pihole
app_uuid: 008d006b-6390-4b93-9302-dc37d9625b18
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pihole.clients_ever_seen
      metadata_path: metadata.csv
      prefix: pihole.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10169
    source_type_name: pihole
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: monganai@tcd.ie
  support_email: monganai@tcd.ie
categories:
- ネットワーク
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pihole/README.md
display_on_public_website: true
draft: false
git_integration_title: pihole
integration_id: pihole
integration_title: Pi-hole
integration_version: 3.14.1
is_public: true
manifest_version: 2.0.0
name: pihole
public_title: Pi-hole
short_description: Pi-hole のデフォルトメトリクスを収集するインテグレーション
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
  - Category::Network
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Pi-hole のデフォルトメトリクスを収集するインテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pi-hole
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [Pi-hole][1] を監視します。

## セットアップ

Pi-hole チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Pi-hole チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-pihole==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### 構成

1. Pi-hole のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `pihole.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[pihole.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `pihole` を探します。

### ログ収集

Linux プラットフォームの場合は、`/etc/datadog-agent/datadog.yaml` で Datadog Agent のログ収集を有効にします。その他のプラットフォームの場合は、[Agent コンフィギュレーションファイルガイド][8]を参照し、コンフィギュレーションファイルの場所を調べてください。

```yaml
logs_enabled: true
```

- ログの収集を開始するには、次のコンフィギュレーションブロックを `pihole.d/conf.yaml` ファイルに対して有効化します。
    ```yaml
    logs:
      - type: file
        path: /var/log/pihole.log
        source: pihole
    ```

## 収集データ

### メトリクス
{{< get-metrics-from-git "pihole" >}}


### イベント

Pi-hole には、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "pihole" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://pi-hole.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[9]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/pihole/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/