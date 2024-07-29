---
app_id: unifi-console
app_uuid: 224a050d-7ed3-4e7a-ada6-410f61393fc0
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: unifi.device.status
      metadata_path: metadata.csv
      prefix: unifi.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10298
    source_type_name: Unifi Console
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: antonin.bruneau@gmail.com
  support_email: antonin.bruneau@gmail.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unifi_console/README.md
display_on_public_website: true
draft: false
git_integration_title: unifi_console
integration_id: unifi-console
integration_title: Unifi Console
integration_version: 1.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: unifi_console
public_title: Unifi Console
short_description: このチェックは、Unifi Controller からメトリクスを収集します
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
  configuration: README.md#Setup
  description: このチェックは、Unifi Controller からメトリクスを収集します
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Unifi Console
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [Unifi Console][1] を監視します。

## 計画と使用

Unifi チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Unifi チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-unifi_console==1.2.0
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Unifi Console のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `unifi_console.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[unifi_console.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `unifi_console` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "unifi_console" >}}


### ヘルプ

Unifi Console インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "unifi_console" >}}



## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://ui.com/consoles
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/datadog_checks/unifi_console/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/