---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Netnology SD-WAN Overview: assets/dashboards/nn_sdwan_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    High Latency Monitor: assets/monitors/high-latency-monitor.json
    Packet Loss Monitor: assets/monitors/packet-loss-monitor.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- モニタリング
- ネットワーク
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nn_sdwan/README.md
display_name: Netnology SD-WAN
draft: false
git_integration_title: nn_sdwan
guid: a7c79ba9-a4b7-4fa4-b4aa-3868458e2101
integration_id: nn-sdwan
integration_title: Netnology Cisco SD-WAN
integration_version: 1.0.0
is_public: true
kind: integration
maintainer: info@netnology.io
manifest_version: 1.0.0
metric_prefix: nn_sdwan.
metric_to_check:
- nn_sdwan.device_control_status
- nn_sdwan.app_aware_routing.latency
name: nn_sdwan
public_title: Netnology Cisco SD-WAN
short_description: Netnology の Cisco SDWAN コントローラメトリクスエクスポーター
support: contrib
supported_os:
- linux
- mac_os
- windows
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