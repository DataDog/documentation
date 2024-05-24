---
algolia:
  subcategory: Marketplace インテグレーション
app_id: blink-blink
app_uuid: eaa3426f-383b-44b4-a7f9-ff9706ed37f8
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10327
    source_type_name: Blink_blink
author:
  homepage: https://blinkops.com
  name: Blink
  sales_email: support@blinkops.com
  support_email: support@blinkops.com
  vendor_id: blink-subscription
categories:
- orchestration
- notifications
- 自動化
- クラウド
- セキュリティ
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: blink_blink
integration_id: blink-blink
integration_title: Blink
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: blink_blink
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: blink
  short_description: 最大 5000 アクション、10 ユーザーまで。
  unit_price: 500
public_title: Blink
short_description: Blink は、セキュリティとインフラストラクチャーのためのノーコード自動化プラットフォームです
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
  - Category::Orchestration
  - Category::Notifications
  - Category::Automation
  - Category::Cloud
  - Category::Security
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Blink は、セキュリティとインフラストラクチャーのためのノーコード自動化プラットフォームです
  media:
  - caption: Blink のインタラクティブなワークフローを使用して、Datadog のインシデントを自動的に作成および更新します。
    image_url: images/incident.png
    media_type: image
  - caption: Blink オートメーション内から、すべてのアクティブな Datadog インシデントのリストを素早く参照することができます。
    image_url: images/list-incidents.png
    media_type: image
  - caption: Blink インテグレーションを接続し、Datadog のインシデントに対応したアクションを実行するオートメーションの作成を開始します。
    image_url: images/connection-creation.png
    media_type: image
  - caption: スケジュールされた Blink オートメーションを使用して、定期的なイベントに対して Datadog のインシデントを自動的に作成します。
    image_url: images/new-incident.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Blink
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[Blink][1] は、インシデントレスポンスの自動化、クラウドネイティブな運用、セキュリティ運用ワークフローを実現するローコード/ノーコード (LNCN) プラットフォームです。Blink は、クラウドネイティブプラットフォームのセキュリティと信頼性に支えられ、手動タスクをインタラクティブな自動化に変換します。すべてのスクリプトやチケットは、完全に管理されたオートメーションになります。

ユーザーインターフェイスと[オートメーションライブラリ][2]には、5,000 のクラウドネイティブワークフローが搭載されており、新しいオートメーションの作成が容易にできます。Blink は、運用のボトルネックを減らし、より優れたクラウド効率と競争力のある SLA を達成することを支援します。

[すぐに使えるインテグレーション][6]をご覧ください。

- Datadog のインシデントを利用してイベントベースの Blink オートメーションをトリガーする
- Blink から Datadog のインシデントを自動的に作成、更新する
- Blink の Datadog イベントエクスプローラーからインシデントやイベントを表示する
- Blink オートメーションを利用して Datadog インシデントを自動的にリッチ化、修復する

Blink の詳細については、[Blink ドキュメント][3]を参照してください。

## Agent

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://blinkops.com/
[2]: https://library.blinkops.com/
[3]: https://www.docs.blinkops.com/
[4]: https://www.docs.blinkops.com/docs/Integrations/Datadog/
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://app.datadoghq.com/integrations/blink
[7]: https://app.blinkops.com/signup
[8]: mailto:support@blinkops.com

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/blink-blink" target="_blank">こちらをクリック</a>してください。