---
app_id: shoreline-software-license
app_uuid: d1da5605-5ef5-47bc-af8d-16005945e21e
assets: {}
author:
  homepage: https://shoreline.io/
  name: Shoreline.io
  sales_email: sales@shoreline.io
  support_email: support@shoreline.io
  vendor_id: shoreline
categories:
- 自動化
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: shoreline_software_license
integration_id: shoreline-software-license
integration_title: Shoreline.io
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/terms_of_service_shoreline.pdf
manifest_version: 2.0.0
name: shoreline_software_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.shoreline.shoreline
  product_id: software-license
  short_description: 1 ホスト/月あたり。ポッドやコンテナの追加費用なし
  tag: ホスト
  unit_label: ホスト
  unit_price: 25
public_title: Shoreline.io
short_description: トリガーされたモニターを修復するためのオートメーション構築
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Automation
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: トリガーされたモニターを修復するためのオートメーション構築
  media:
  - caption: 修復ダッシュボード
    image_url: images/remediation_dashboard.png
    media_type: image
  - caption: 修復自動化セットアップの例
    image_url: images/automate_remediation.png
    media_type: image
  - caption: フリート全体でのインタラクティブなデバッグと修理の例
    image_url: images/fleetwide_interactive_debugging_and_repair.png
    media_type: image
  - caption: フリート全体での linux コマンドの詳細の例
    image_url: images/fleetwide_linux_command_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Shoreline.io
---



## 概要

Shoreline のインシデント自動化により、DevOps と Site Reliability Engineer (SRE) は、**大規模なデバッグ**をインタラクティブに行い、迅速に**修復を構築**して反復作業を排除することができます。

デバッグ・修復機能により、サーバーに個別に SSH 接続することなく、サーバーファーム全体でリアルタイムにコマンドを実行することができます。Linux コマンド、シェルスクリプト、クラウドプロバイダー API の呼び出しなど、Linux コマンドプロンプトで入力できるものなら何でも実行でき、これらのデバッグセッションを Datadog モニターに接続したオートメーションにすることができます。

Shoreline アプリは、モニターがトリガーされると自動的に自動化を実行し、平均修復時間 (MTTR) と手作業を大幅に削減します。

Shoreline は、待機中の全員が最高の SRE と同等の能力を発揮できるよう支援します。Shoreline は、オンコールチームにデバッグツールと承認された修復アクションを提供し、エスカレーションを減らしてインシデントを迅速に修正し、ミスを減らして初回で正しくインシデントを修正できるよう支援します。

まずは、[Shoreline][3] でトライアルアカウントを設定してください。
## サポート

Shoreline へのサポートやリクエストはメールにてご連絡ください。

メール: [support@shoreline.io][2]
詳しくは、[Shoreline のドキュメント][9]を参照してください。

[1]: images/integrate_shoreline_and_datadog.png
[2]: mailto:support@shoreline.io
[3]: https://shoreline.io/datadog?source=DatadogMarketplace
[4]: https://docs.shoreline.io/integrations/datadog
[5]: https://docs.shoreline.io/installation/kubernetes
[6]: https://docs.shoreline.io/installation/kubernetes#install-with-helm
[7]: https://docs.shoreline.io/installation/virtual-machines
[8]: images/link_icon.svg
[9]: https://docs.shoreline.io/
[10]: https://app.datadoghq.com/account/settings#integrations/shoreline-integration
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/shoreline-software-license" target="_blank">こちらをクリック</a>してください。