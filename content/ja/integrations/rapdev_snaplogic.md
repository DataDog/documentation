---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-snaplogic
app_uuid: c3f2e4a6-a17f-4b66-b72d-4be62b648fb8
assets:
  dashboards:
    RapDev SnapLogic Snaplex Dashboard: assets/dashboards/snaplex_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.snaplogic.snaplex_node.running
      metadata_path: metadata.csv
      prefix: rapdev.snaplogic.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6643655
    source_type_name: RapDev SnapLogic
  monitors:
    Connection to SnapLogic API is Failing: assets/monitors/snaplogic_can_connect.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- 開発ツール
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snaplogic
integration_id: rapdev-snaplogic
integration_title: SnapLogic
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snaplogic
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.snaplogic
  product_id: snaplogic
  short_description: Snaplex の単価
  tag: snaplex_label
  unit_label: SnapLogic Snaplex
  unit_price: 10
public_title: SnapLogic
short_description: SnapLogic パイプラインと Snaplex を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: SnapLogic パイプラインと Snaplex を監視する
  media:
  - caption: SnapLogic ダッシュボード
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SnapLogic
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
SnapLogic は、クラウドデータソース、SaaS アプリケーション、オンプレミスのビジネスアプリケーションを接続するための iPaaS (Integration Platform as a Service) ツールを提供するソフトウェア企業です。RapDev による SnapLogic インテグレーションは、Agent チェックベースのインテグレーションで、SnapLogic REST API にクエリを実行して、[Snaplex][8] とパイプラインのデータをメトリクスとして、組織のアクティビティをログとして取得します。

### ワークフローの自動化
このインテグレーションでは、`collect_activity_logs` が `conf.yaml` ファイルで有効になっている場合にのみ、 SnapLogic 組織のアクティビティログが収集されます。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][7]
- 営業: [sales@rapdev.io][1]
- チャット: [rapdev.io][6]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織にとって重要な機能が欠けていますか？[こちら][7]から私たちにメッセージをお送りいただければ、我々が作成いたします！！*

---
[1]: mailto:sales@rapdev.io
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1439028/Creating+a+User
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://www.rapdev.io/#Get-in-touch
[7]: mailto:support@rapdev.io
[8]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1437953/The+SnapLogic+Snaplex
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-snaplogic" target="_blank">こちらをクリック</a>してください。