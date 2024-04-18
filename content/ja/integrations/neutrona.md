---
app_id: neutrona
app_uuid: f44f84d4-1436-4ab1-8023-b952850b64c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: neutrona.azure.expressroute.egress_bps
      metadata_path: metadata.csv
      prefix: neutrona.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10051
    source_type_name: Neutrona
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neutrona
  sales_email: david@neutrona.com
  support_email: david@neutrona.com
categories:
- クラウド
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neutrona/README.md
display_on_public_website: true
draft: false
git_integration_title: neutrona
integration_id: neutrona
integration_title: Neutrona
integration_version: 1.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: neutrona
public_title: Neutrona
short_description: Neutrona Telemetry
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Neutrona Telemetry
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Neutrona
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Azure (ExpressRoute) への [Neutrona][1] クラウド接続サービスを監視します。

- Azure (ExpressRoute)

## 計画と使用

Neutrona チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Neutrona チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-neutrona==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Neutrona の[メトリクス](#metrics)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `neutrona.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル neutrona.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `neutrona` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "neutrona" >}}


### ヘルプ

現時点で、Neutrona には、サービスのチェック機能は含まれません。

### ヘルプ

現時点で、Neutrona には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://telemetry.neutrona.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/datadog_checks/neutrona/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/neutrona/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/