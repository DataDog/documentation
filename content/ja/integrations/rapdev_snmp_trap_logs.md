---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-snmp-trap-logs
app_uuid: 754df420-1cf8-4742-b98c-9d3a76f83c41
assets:
  dashboards:
    RapDev SNMP Trap Logs: assets/dashboards/rapdev_snmp_trap_logs_dashboard.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- ネットワーク
- snmp
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snmp_trap_logs
integration_id: rapdev-snmp-trap-logs
integration_title: SNMP Trap Logs
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snmp_trap_logs
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: snmp-trap-logs
  short_description: このインテグレーションの定額料金
  unit_price: 1000
public_title: SNMP Trap Logs
short_description: SNMP トラップメッセージの Datadog ログへの変換
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Network
  - Category::SNMP
  - Supported OS::Linux
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: SNMP トラップメッセージの Datadog ログへの変換
  media:
  - caption: RapDev SNMP Trap Logs
    image_url: images/1.png
    media_type: image
  - caption: SNMP トラップログメッセージ
    image_url: images/2.png
    media_type: image
  - caption: パースされた SNMP トラップ
    image_url: images/3.png
    media_type: image
  - caption: SNMP Trap Log ダッシュボード
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  support: README.md#Support
  title: SNMP Trap Logs
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 概要
RapDev SNMP Trap Logs パッケージは、何千もの異なる SNMP デバイスの SNMP Trap メッセージを Datadog Logs に変換することが可能です。できるだけ多くの MIB ファイルを収集し、SNMP トラップを人間が読めるログメッセージに翻訳できるような形式に変換しています。

このパッケージには、Logstash を SNMP トラップレシーバーとして設定するためのインストールスクリプトが付属しており、適切な構成と MIB ファイルを使用してメッセージを翻訳し、Datadog 内のネットワークイベントにアラートすることができます。

本パッケージに含まれる全 MIB の一覧は、[mib_yamls.txt ファイル][4]をご参照ください。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- メール: [support@rapdev.io][7]
- チャット: [rapdev.io][3]
- 電話: 855-857-0222

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [SNMP トラップによるネットワークパフォーマンスの問題の監視と診断][8]

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？RapDev へ[お問い合わせ](mailto:support@rapdev.io)ください！導入のサポートをいたします。*

[1]: https://docs.datadoghq.com/ja/logs/guide/enrichment-tables
[2]: https://docs.datadoghq.com/ja/logs/log_configuration/processors/?tab=ui#log-message-remapper
[3]: https://www.rapdev.io/#Get-in-touch
[4]: https://files.rapdev.io/datadog/configs/mib_yamls.txt
[5]: mailto:sales@rapdev.io
[6]: https://mibs.observium.org
[7]: mailto:support@rapdev.io
[8]: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-trap-logs" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。