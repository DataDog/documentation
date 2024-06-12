---
app_id: nvidia-jetson
app_uuid: eccb9836-9dc7-443c-ac05-9c341e5ccf90
assets:
  dashboards:
    Nvidia Jetson: assets/dashboards/nvidia_jetson.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: nvidia.jetson.mem.used
      metadata_path: metadata.csv
      prefix: nvidia.jetson.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10134
    source_type_name: Nvidia Jetson
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- iot
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_jetson
integration_id: nvidia-jetson
integration_title: Nvidia Jetson
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nvidia_jetson
public_title: Nvidia Jetson
short_description: Nvidia Jetson ボードに関するメトリクスを収集します
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::IoT
  configuration: README.md#Setup
  description: Nvidia Jetson ボードに関するメトリクスを収集します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia Jetson
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [Nvidia Jetson][1] ボードを監視します。
`tegrastats` から収集されたメトリクスを報告します。

## 計画と使用

### インフラストラクチャーリスト

Nvidia Jetson チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーに `jetson.d/conf.yaml` ファイルを作成して、
   Jetson パフォーマンスデータの収集を開始します。 
   使用可能なすべての構成オプションの詳細については、[サンプル jetson.d/conf.yaml.example][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンド][5]を実行し、Checks セクションで `jetson` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "nvidia_jetson" >}}


以下は、`use_sudo` が true に設定される場合にのみ報告されるメトリクスです。
- `nvidia.jetson.iram.used`
- `nvidia.jetson.iram.total`
- `nvidia.jetson.iram.lfb`
- `nvidia.jetson.emc.freq`
- `nvidia.jetson.gpu.freq`
- `nvidia.jetson.cpu.freq`

### ヘルプ

Nvidia Jetson インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Nvidia Jetson インテグレーションには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://developer.nvidia.com/embedded-computing
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jetson.d/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/nvidia_jetson/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/