---
assets:
  dashboards:
    Nvidia Jetson: assets/dashboards/nvidia_jetson.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - iot
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/README.md'
display_name: Nvidia Jetson
draft: false
git_integration_title: nvidia_jetson
guid: 72845bb7-c3a6-4017-96f6-c232171102f8
integration_id: nvidia-jetson
integration_title: Nvidia Jetson
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: nvidia.jetson.
metric_to_check: nvidia.jetson.mem.used
name: nvidia_jetson
public_title: Nvidia Jetson
short_description: Nvidia Jetson ボードに関するメトリクスを収集します
support: コア
supported_os:
  - linux
---
## 概要

このチェックは [Nvidia Jetson][1] ボードを監視します。
`tegrastats` から収集されたメトリクスを報告します。

## セットアップ

### インストール

Nvidia Jetson チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーに `jetson.d/conf.yaml` ファイルを作成して、
   Jetson パフォーマンスデータの収集を開始します。 
   使用可能なすべての構成オプションの詳細については、[サンプル jetson.d/conf.yaml.example][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `jetson` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nvidia_jetson" >}}


以下は、`use_sudo` が true に設定される場合にのみ報告されるメトリクスです。
- `nvidia.jetson.iram.used`
- `nvidia.jetson.iram.total`
- `nvidia.jetson.iram.lfb`
- `nvidia.jetson.emc.freq`
- `nvidia.jetson.gpu.freq`
- `nvidia.jetson.cpu.freq`

### サービスのチェック

Nvidia Jetson には、サービスのチェック機能は含まれません。 

### イベント

Nvidia Jetson には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://developer.nvidia.com/embedded-computing
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jetson.d/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/