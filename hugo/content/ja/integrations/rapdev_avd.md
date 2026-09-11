---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-avd
app_uuid: fcba4622-a19c-4cb7-accf-c2ed8f28fa6a
assets:
  dashboards:
    RapDev - Azure Virtual Desktop Overview: assets/dashboards/rapdev_-_azure_virtual_desktop_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.avd.session_host.active
      metadata_path: metadata.csv
      prefix: rapdev.avd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14602580
    source_type_name: RapDev AVD
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- azure
- marketplace
- モニター
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_avd
integration_id: rapdev-avd
integration_title: Azure Virtual Desktop
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_avd
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.avd
  product_id: avd
  short_description: AVD セッションホストごとの単価。
  tag: session_host
  unit_label: AVD セッションホスト
  unit_price: 3
public_title: Azure Virtual Desktop
short_description: Azure Virtual Desktop ホストプールとセッションの健全性を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Azure
  - Category::Marketplace
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Azure Virtual Desktop ホストプールとセッションの健全性を監視する
  media:
  - caption: 概要ダッシュボードの例
    image_url: images/RapDev_AVD_Overview1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Virtual Desktop
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
Azure Virtual Desktop は、Azure でホストされるサービスで、デスクトップおよびアプリケーションの仮想化を提供します。シングルセッションおよびマルチセッションのフルデスクトップをサポートし、個別のリモートアプリケーションの実行も可能です。

Azure Virtual Desktop (AVD) インテグレーションは、セッションホストの健全性チェックに加え、セッション数やパフォーマンスに関する概要情報を取得します。このインテグレーションは、既存の Datadog Azure クラウドインテグレーションを補完し、お客様は Datadog の統合可観測性プラットフォームを通じて、Azure Virtual Desktop のデータを他の Azure サービスやインフラストラクチャーと相関させることができます。この全体的なビューにより、チームは問題を事前に特定して解決し、リソースの最適な割り当てを行い、シームレスなユーザーエクスペリエンスを確保できます。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][8]
- セールス: [sales@rapdev.io][9]
- チャット: [rapdev.io][10]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に必要な重要な機能が欠けていますか？RapDev へ[お問い合わせ][8]ください。私たちがその機能を構築します！*

[1]: https://docs.datadoghq.com/ja/integrations/guide/azure-manual-setup/?tab=azurecli
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/quick-create-workspace?tabs=azure-portal
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/manage-access?tabs=portal
[4]: https://portal.azure.com/#view/Microsoft_Azure_WVD/WvdManagerMenuBlade/~/hostpools
[5]: https://learn.microsoft.com/en-us/azure/virtual-desktop/diagnostics-log-analytics#push-diagnostics-data-to-your-workspace
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: mailto:support@rapdev.io
[9]: mailto:sales@rapdev.io
[10]: https://www.rapdev.io/#Get-in-touch
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-avd" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。