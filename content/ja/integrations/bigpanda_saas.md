---
app_id: bigpanda-bigpanda
app_uuid: 98cf782f-3d6c-4ea8-8e7b-353da5623794
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ''
      metadata_path: metadata.csv
      prefix: datadog.marketplace.bigpanda.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: BigPanda SaaS
author:
  homepage: https://bigpanda.io
  name: BigPanda
  sales_email: ddogmarketplace@bigpanda.io
  support_email: support@bigpanda.io
  vendor_id: bigpanda
categories:
- マーケットプレイス
- 自動化
- notification
- モニタリング
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: bigpanda_saas
integration_id: bigpanda-bigpanda
integration_title: BigPanda SaaS プラットフォーム
integration_version: ''
is_public: true
kind: インテグレーション
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: bigpanda_saas
oauth: {}
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.bigpanda.bigpanda
  product_id: bigpanda
  short_description: AIOps によるイベント相関および自動化プラットフォーム
  tag: ノード
  unit_label: 監視されるノード
  unit_price: 9.0
public_title: BigPanda SaaS プラットフォーム
short_description: AIOps によるイベント相関および自動化プラットフォーム
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
  - Category::Marketplace
  - Category::Automation
  - Category::Notification
  - Category::Monitoring
  - Offering::Software License
  configuration: README.md#Setup
  description: AIOps によるイベント相関および自動化プラットフォーム
  media:
  - caption: BigPanda は IT 運用、NOC、DevOps チームが動きの速い IT において IT インシデントや障害を検出、調査、解決できるよう支援します。詳細については、https://www.bigpanda.io
      をご覧ください。
    image_url: images/video.png
    media_type: ビデオ
    vimeo_id: 619368097
  - caption: BigPanda の AIOps プラットフォームは DataDog と連携し、ノイズを排除し、インシデントレスポンスを加速させます。
    image_url: images/bigpanda_dd_benefits.png
    media_type: image
  - caption: BigPanda がなければ、複雑な IT 環境はノイズを発生させ、スタッフは貴重な時間を浪費せざるを得なくなります。
    image_url: images/bigpanda_dd_before.png
    media_type: image
  - caption: BigPanda の AIOps プラットフォームは DataDog と連携し、ノイズを排除し、インシデントレスポンスを加速させます。
    image_url: images/bigpanda_dd_after.png
    media_type: image
  - caption: BigPanda Incident Feed -- BigPanda の Incident 360 ビューは、進行中のすべての IT インシデントに対する重要な認識を提供します。
    image_url: images/BP1.png
    media_type: image
  - caption: BigPanda Incident Timeline -- BigPanda の Timeline はインシデントが時間とともにどのように進化しているかを明確に表示します。
    image_url: images/BP2.png
    media_type: image
  - caption: BigPanda Analytics -- BigPanda の Unified Analytics ダッシュボードは、レポートを提供し、KPI
      を追跡するので、チームは継続的に改善することができます。
    image_url: images/BP4.png
    media_type: image
  - caption: BigPanda Analytics 2 -- BigPanda の Unified Analytics ダッシュボードは、レポートを提供し、KPI
      を追跡するので、チームは継続的に改善することができます。
    image_url: images/BP5.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: BigPanda SaaS プラットフォーム
---



## 概要
BigPanda を使用すると、AIOps によるイベント相関および自動化のための SaaS プラットフォームで IT の停止を予防、解決することができます。BigPanda で、Datadog およびその他のサードパーティツールからのアラートが収集され、コンテキストリッチなインシデントに創刊されるため、中断を防ぎインシデント管理の手間を削減できます。

BigPanda は、インフラストラクチャー、ログ管理、APM を含むすべての Datadog モニタリング製品とともにすぐに使えるインテグレーションです。このインテグレーションにより、アラートおよびリッチなトポロジー情報を取り込み、インシデントが停止を招く前に、相関性および根本原因の分析を行うことができます。また、BigPanda では ITSM プラットフォームから CMDB データを取り込み、アラートを強化してDatadog 内外のサービス間の関係のフルスタックビューを提供します。

最終的に、IT Ops、NOC、DevOps、SRE チームがアラートの全体像をすばやく把握し、低パフォーマンスのアプリケーション、システム、またはサービスの根本原因を理解することができるうえ、ユーザー環境におけるアラートノイズの削減およ MTTR の向上を実現できます。

Datadog マーケットプレイスでのご提供には、BigPanda プラットフォームへのアクセスが含まれています。すでに BigPanda をご利用で、インスタンスを Datadog に接続する必要があるお客様は、[こちらをクリック](https://app.datadoghq.com/account/settings#integrations/bigpanda)してインテグレーションをセットアップしてください。

## サポート
BigPanda では、お客様の成功に必要なツールと情報の提供をお約束します。そのため、必要なときに必要なサポートを受けられるよう、以下のとおり複数の方法をご用意しています。BigPanda アプリケーション内（右下のヘルプボタン）からメッセージを送信、ドキュメントで必要な情報を見つける、または FAQ でコミュニティに質問をする、あるいは [support@bigpanda.io](mailto:support@bigpanda.io) までメールを送信しサポートチケットを作成してください。