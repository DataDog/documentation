---
app_id: nn-sdwan
app_uuid: 8ff5c833-1498-4e63-9ef2-8deecf444d09
assets:
  dashboards:
    Netnology SD-WAN Overview: assets/dashboards/nn_sdwan_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - nn_sdwan.device_control_status
      - nn_sdwan.app_aware_routing.latency
      metadata_path: metadata.csv
      prefix: nn_sdwan.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Netnology SD-WAN
  monitors:
    High Latency Monitor: assets/monitors/high-latency-monitor.json
    Packet Loss Monitor: assets/monitors/packet-loss-monitor.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: info@netnology.io
  support_email: info@netnology.io
categories:
- モニタリング
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/README.md
display_on_public_website: true
draft: false
git_integration_title: nn_sdwan
integration_id: nn-sdwan
integration_title: Netnology Cisco SD-WAN
integration_version: 1.0.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: nn_sdwan
oauth: {}
public_title: Netnology Cisco SD-WAN
short_description: Netnology の Cisco SDWAN コントローラメトリクスエクスポーター
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
  - Category::Monitoring
  - Category::Network
  configuration: README.md#Setup
  description: Netnology の Cisco SDWAN コントローラメトリクスエクスポーター
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Netnology Cisco SD-WAN
---



## 概要

このチェックは、[Netnology][1] が提供する SD-WAN プラットフォームを使用して、Datadog Agent を通じて Cisco SD-WAN コントローラを監視します。このチェックにより、ユーザーは複数の Cisco SD-WAN コントローラのネットワークの健全性とパフォーマンスを同時に監視することができます。収集した情報は、ダッシュボードの集計や構成されたモニター/アラートの通知に使用できます。

現在、SD-WAN コントローラのターゲットとしてサポートされているのは、Cisco vManage デバイスのみです。

## セットアップ

Netnology Cisco SD-WAN インテグレーションは [Datadog Agent][2] パッケージに含まれていないため、手動でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従いチェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ``` bash
   datadog-agent integration install -t nn_sdwan==1.0.0
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Cisco SD-WAN のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `nn_sdwan.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nn_sdwan.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `nn_sdwan` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nn_sdwan" >}}


### イベント

Netnology Cisco SD-WAN インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "nn_sdwan" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://netnology.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/datadog_checks/nn_sdwan/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/