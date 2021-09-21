---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    crio: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/crio/README.md
display_name: CRI-O
draft: false
git_integration_title: crio
guid: 40fd8230-d178-4e8e-9e6a-6ce4acc19a85
integration_id: cri-o
integration_title: CRI-O
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: crio.
metric_to_check: crio.operations.count
name: crio
public_title: Datadog-CRI-O インテグレーション
short_description: CRI-O のすべてのメトリクスを Datadog で追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [CRI-O][1] を監視します。

## セットアップ

### インストール

このインテグレーションは、CRI-O の `--enable-metrics` オプションに依存します。このオプションはデフォルトでは無効です。有効にした場合は、`127.0.0.1:9090/metrics` でメトリクスが公開されます。

### コンフィギュレーション

1. CRI-Oのパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `crio.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル crio.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `crio` を探します。

## 収集データ

CRI-O は、ランタイムによって実行される操作のカウントとレイテンシーに関するメトリクスを収集します。
さらに、Datadog-CRI-O インテグレーションは、CRI-O Golang バイナリ自体の CPU 使用率とメモリ使用量を収集します。

### メトリクス
{{< get-metrics-from-git "crio" >}}


### サービスのチェック
{{< get-service-checks-from-git "crio" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。


[1]: http://cri-o.io
[2]: https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-information
[5]: https://github.com/DataDog/integrations-core/blob/master/crio/metadata.csv
[6]: https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json
[7]: https://docs.datadoghq.com/ja/help/