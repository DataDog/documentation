---
app_id: kubevirt-handler
app_uuid: 751006a9-b87a-4f54-acc5-2886ec49073e
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kubevirt_handler.can_connect
      - kubevirt_handler.vmi.cpu_system_usage_seconds.count
      metadata_path: metadata.csv
      prefix: kubevirt_handler.
    process_signatures:
    - virt-handler
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22778164
    source_type_name: KubeVirt Handler
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- incident-teams
- kubernetes
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/README.md
display_on_public_website: true
draft: false
git_integration_title: kubevirt_handler
integration_id: kubevirt-handler
integration_title: KubeVirt Handler
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: kubevirt_handler
public_title: KubeVirt Handler
short_description: KubeVirt Handler デーモンの健全性を監視するための主要メトリクスを収集します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: KubeVirt Handler Daemons の健全性を監視するための主要メトリクスを収集します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: KubeVirt Handler
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


<div class="alert alert-danger">
このインテグレーションは公開ベータ版で、本番ワークロードでの有効化は慎重に行う必要があります。
</div>

## 概要

このチェックは、Datadog Agent を通じて [KubeVirt Handler][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

KubeVirt Handler チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

1. kubevirt_handler のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `kubevirt_handler.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル kubevirt_handler.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションに `kubevirt_handler` チェックが表示されていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kubevirt_handler" >}}


### イベント

KubeVirt Handler インテグレーションには、イベントは含まれません。

### サービスチェック

KubeVirt Handler インテグレーションには、サービス チェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。


[1]: https://docs.datadoghq.com/ja/integrations/kubevirt_handler
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/datadog_checks/kubevirt_handler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_handler/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/