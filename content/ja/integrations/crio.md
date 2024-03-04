---
app_id: cri-o
app_uuid: a5f9ace1-19b5-4928-b98b-21f15d62cce2
assets:
  dashboards:
    crio: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: crio.operations.count
      metadata_path: metadata.csv
      prefix: crio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10044
    source_type_name: CRI-O
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/crio/README.md
display_on_public_website: true
draft: false
git_integration_title: crio
integration_id: cri-o
integration_title: CRI-O
integration_version: 2.6.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: crio
public_title: CRI-O
short_description: CRI-O のすべてのメトリクスを Datadog で追跡
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
  - Category::Containers
  configuration: README.md#Setup
  description: CRI-O のすべてのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CRI-O
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [CRI-O][1] を監視します。

## 計画と使用

### インフラストラクチャーリスト

このインテグレーションは、CRI-O の `--enable-metrics` オプションに依存します。このオプションはデフォルトでは無効です。有効にした場合は、`127.0.0.1:9090/metrics` でメトリクスが公開されます。

### ブラウザトラブルシューティング

1. CRI-Oのパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `crio.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル crio.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `crio` を探します。

## リアルユーザーモニタリング

CRI-O は、ランタイムによって実行される操作のカウントとレイテンシーに関するメトリクスを収集します。
さらに、Datadog-CRI-O インテグレーションは、CRI-O Golang バイナリ自体の CPU 使用率とメモリ使用量を収集します。

### データセキュリティ
{{< get-metrics-from-git "crio" >}}


### ヘルプ
{{< get-service-checks-from-git "crio" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。


[1]: http://cri-o.io
[2]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-information
[5]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json
[7]: https://docs.datadoghq.com/ja/help/