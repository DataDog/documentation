---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rollbar-license
app_uuid: 8b08ddce-a1be-4438-9889-ba4113de9a93
assets: {}
author:
  homepage: https://rollbar.com
  name: Rollbar
  sales_email: support@rollbar.com
  support_email: support@rollbar.com
  vendor_id: rollbar
categories:
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rollbar_license
integration_id: rollbar-license
integration_title: Rollbar
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rollbar_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rollbar.rollbar
  product_id: rollbar
  short_description: 月に 50 万件の例外をリアルタイムで追跡します。
  tag: event
  unit_label: 50 万イベント
  unit_price: 350
public_title: Rollbar
short_description: リアルタイムでエラーをプロアクティブに発見します。
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
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: リアルタイムでエラーをプロアクティブに発見します。
  media:
  - caption: リアルタイムエラー
    image_url: images/realtimeerrors.jpg
    media_type: image
  - caption: Error Traceback
    image_url: images/traceback.jpg
    media_type: image
  - caption: Release Health
    image_url: images/releasehealth.jpg
    media_type: image
  - caption: Frontend Telemetry
    image_url: images/breadcrumbs.jpg
    media_type: image
  - caption: 通知
    image_url: images/msgnotifications.jpg
    media_type: image
  - caption: 通知ルール
    image_url: images/notificationrules.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Rollbar
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

[Rollbar][1] では、開発チームが数秒でエラーをピンポイントで特定できるように、AI によるグループ化で、従来のエラー監視ツールを超えることができます。リアルタイムでエラーを積極的に発見し、適切な担当者に警告し、自動的にロールバックし、修正することができます。

### オートメーショングレードのグループ化
開発者の信頼を築くエラー監視のノイズを低減します。エラーリストから重複を排除することでトリアージが容易になり、手作業の軽減と自動化によりエラーへの対応が迅速になります。

### AI が支援するワークフロー
問題への迅速な対応を実現するプロアクティブなワークフロー。平均認識時間 (MTTA) と平均解決時間 (MTTR) を短縮し、高品質の顧客体験を維持します。

### 各デプロイとのリンクエラー
各エラーのコードコンテキストを取得し、大規模なデバッグを迅速に行うことができます。問題のあるコード行のスタックトレース、`git blame` 情報の取得、各デプロイメントの追跡など、すべてを一箇所で行うことができます。

### シームレスなインテグレーション
Datadog、GitHub、GitHub Enterprise Server、Atlassian、Google Cloud、Terraform、Heroku、Slack、CircleCI

### セキュリティに配慮
厳しい業界標準に完全準拠し、お客様を支援する機能を構築しています。


## Agent

ご質問・お問い合わせは、[こちら][4]までお気軽にどうぞ。

[1]: https://rollbar.com
[2]: https://rollbar.com
[3]: https://docs.rollbar.com/
[4]: https://www.rollbar.com/support
---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rollbar-license" target="_blank">こちらをクリック</a>してください。