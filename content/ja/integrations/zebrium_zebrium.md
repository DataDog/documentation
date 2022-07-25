---
app_id: zebrium-zebrium
app_uuid: 3e2a6d39-2057-4cb5-bc0e-5610a43afaf7
assets: {}
author:
  homepage: https://www.zebrium.com
  name: Zebrium
  sales_email: hello@zebrium.com
  support_email: support@zebrium.com
  vendor_id: zebrium
categories:
- notification
- 自動化
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zebrium_zebrium
integration_id: zebrium-zebrium
integration_title: Zebrium Root Cause as a Service
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: zebrium_zebrium
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.zebrium.zebrium
  product_id: zebrium
  short_description: Zebrium の価格は、ログイベント量に基づき決定されます
  tag: コア
  unit_label: 百万件のログイベントの取り込み
  unit_price: 0.3
public_title: Zebrium Root Cause as a Service
short_description: Zebrium は、問題の根本原因をダッシュボードに直接表示します
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Notification
  - Category::Automation
  - Offering::Software License
  configuration: README.md#Setup
  description: Zebrium は、問題の根本原因をダッシュボードに直接表示します
  media:
  - caption: 'ビデオ: Datadog の Root Cause Finder。'
    image_url: images/Zebrium_Root_Cause_as_a_Service_thumb.png
    media_type: ビデオ
    vimeo_id: 703040365
  - caption: 2 つの根本原因の検出を示す Zebrium ウィジェット (縦線に赤い点)。
    image_url: images/Zebrium_Root_Cause_Finder_Widget.png
    media_type: image
  - caption: サイドパネルに表示される Zebrium の根本原因サマリー。
    image_url: images/Zebrium_Root_Cause_Finder_With_Side_Panel.png
    media_type: image
  - caption: Zebrium 根本原因レポート詳細 (Zebrium UI)。
    image_url: images/Zebrium_Root_Cause_Report_Details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Zebrium Root Cause as a Service
---



## 概要

**Datadog Marketplace で Zebrium SaaS ライセンスにサインアップしてください。**

問題があることは分かっていても、その原因が分からない場合、[Zebrium][1] は Datadog のダッシュボードに直接根本原因を自動的に表示するように動作します。Zebrium のソリューションは、ログに機械学習を適用しますが、手動でデータを学習させたり、ルールを設定したりする必要はなく、24 時間以内に精度を達成することができます。

Zebrium の使用方法は簡単です。トラブルシューティングを行う際、あちこち調べるのではなく、Datadog のダッシュボードで Zebrium アプリにスクロールし、対応する検出を見るだけでいいのです。

Zebrium のお客様になると、Zebrium と Datadog の 2 点のインテグレーションを使い始めることができます。1) カスタムダッシュボードウィジェットを持つ Zebrium Datadog アプリと、2) Zebrium からイベントやメトリクスを送信するデータインテグレーションです。インストールは、[インテグレーションページ][4]から Zebrium を検索してください。

## サポート
製品に関するお問い合わせや価格に関するご質問は [Zebrium サポート][2]にお問い合わせください。

[1]: https://www.zebrium.com
[2]: mailto:support@zebrium.com
[3]: https://cloud.zebrium.com
[4]: https://app.datadoghq.com/account/settings