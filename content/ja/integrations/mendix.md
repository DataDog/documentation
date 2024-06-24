---
app_id: mendix
app_uuid: 4119b134-c828-4e14-95b5-585bb13d314a
assets:
  dashboards:
    Mendix Application Overview: assets/dashboards/MendixApplicationOverview.json
  integration:
    auto_install: true
    metrics:
      check: mx.database.diskstorage_size
      metadata_path: metadata.csv
      prefix: mx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10344
    source_type_name: Mendix
author:
  homepage: https://mendix.com/
  name: Mendix
  sales_email: mxsupport@mendix.com
  support_email: mxsupport@mendix.com
categories:
- クラウド
- 自動化
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mendix/README.md
display_on_public_website: true
draft: false
git_integration_title: mendix
integration_id: mendix
integration_title: Mendix
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: mendix
public_title: Mendix
short_description: Mendix 環境メトリクスの監視
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Cloud
  - Category::Automation
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Mendix 環境メトリクスの監視
  media:
  - caption: Page Editor
    image_url: images/page-editor.png
    media_type: image
  - caption: データハブによるドメインモデル
    image_url: images/domain-model-with-data-hub.png
    media_type: image
  - caption: リソースパックのクラウド開発者向けポータルビュー
    image_url: images/cloud_resource_pack_overview.png
    media_type: image
  - caption: Mendix アプリケーション概要ダッシュボード
    image_url: images/mendix_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mendix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Mendix][1] は、開発者が Mendix Platform 上でアプリを構築するために使用できる[ローコード IDE][2] とビジュアルモデル駆動型開発環境です。

Mendix では、アプリケーションの作成、変更、インテグレーション、テスト、デプロイを簡単に行うことができます。また、組み込みのエディタを使って、分岐線やセキュリティを管理したり、カスタムコードでアプリを拡張することができます。

[Mendix インテグレーション][3]では、Mendix ランタイムメトリクス、Java 仮想マシン (JVM) メトリクス、データベース、SaaS (Software as a Service) 環境メトリクスなど、Mendix エコシステムをモニタリングすることができます。Mendix Studio Pro で Datadog に送信するメトリクスをカスタマイズできます。

**注**: このインテグレーションは、Mendix Cloud および Mendix Cloud Dedicated のデプロイメントモデルに適用されます。

## 計画と使用

Mendix Cloud 上で動作する Mendix アプリケーションの Datadog インテグレーションを有効にするには、[Datadog for Mendix cloud のドキュメント][4]をご覧ください。


## リアルユーザーモニタリング

### データセキュリティ

インテグレーションを有効にすると利用できるメトリクスの一覧は、[Mendix 公式ドキュメント][5]をご覧ください。

### ヘルプ

Mendix インテグレーションには、イベントは含まれません。

### ヘルプ

Mendix インテグレーションには、サービスのチェック機能は含まれません。


## ヘルプ

ご不明な点は、[Mendix サポート][6]までお問い合わせください。

[1]: https://mendix.com/
[2]: https://www.mendix.com/blog/a-low-code-leader-composing-the-modern-enterprise-with-mendix/
[3]: https://docs.mendix.com/developerportal/operate/monitoring-with-apm/
[4]: https://docs.mendix.com/developerportal/operate/datadog-metrics/#2-setting-up-datadog-for-your-mendix-app
[5]: https://docs.mendix.com/developerportal/operate/monitoring-with-apm/#environment
[6]: https://support.mendix.com/hc/en-us