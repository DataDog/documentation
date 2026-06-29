---
app_id: azure-arc
app_uuid: 0afa2450-f495-4e18-bdd7-c1cd43e3aebf
assets:
  dashboards:
    azure_arc: assets/dashboards/azure_arc.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.arc_vm.count
      metadata_path: metadata.csv
      prefix: azure.arc_
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 801
    source_type_name: Azure Arc
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- azure
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_arc
integration_id: azure-arc
integration_title: Azure Arc
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_arc
public_title: Azure Arc
short_description: 主要な Azure Arc メトリクスを追跡します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: 主要な Azure Arc メトリクスを追跡します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/azure-arc-integration/
  support: README.md#Support
  title: Azure Arc
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Azure Arc は、Azure プラットフォームを拡張するブリッジであり、データセンター間、エッジ、マルチクラウド環境で実行できる柔軟性を備えたアプリケーションやサービスの構築を支援します。

Azure Arc インテグレーションを使用すると、以下のことが可能になります。

- Azure Arc Servers と Kubernetes Clusters の接続ステータス、タグ、その他の詳細を収集する
- Datadog Agent でも監視している Arc 管理サーバーの場合、Azure Arc タグを Datadog のホストとその関連メトリクスとログに伝播させる
- AWS または GCP インテグレーションでも監視している Arc 管理サーバーの場合、Azure Arc タグを Datadog のホストとその関連クラウドメトリクスとログに伝播させる
- Azure Arc のすぐに使えるダッシュボードで、上記のデータのインサイトとサマリーをすぐに得る

また、Datadog 拡張機能を使用して、Datadog Agent を Arc サーバーに構成およびデプロイすることができます。このオプションの詳細については、[Datadog VM 拡張機能][1]ページをお読みください。

## セットアップ

### インストール

[Microsoft Azure インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

## 収集データ

### メトリクス
{{< get-metrics-from-git "azure-arc" >}}


### イベント

Azure Arc インテグレーションには、イベントは含まれません。

### サービスチェック

Azure Arc インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

[Monitor your Azure Arc hybrid infrastructure with Datadog][5]

[1]: https://docs.datadoghq.com/ja/integrations/guide/powershell-command-to-install-azure-datadog-extension/#install-on-azure-arc
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_arc/azure_arc_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/azure-arc-integration/