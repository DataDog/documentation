---
app_id: pagerduty-ui
app_uuid: fbbb4a11-4a8f-4911-bdf7-bd867d9bdfb2
assets:
  dashboards:
    PagerDuty for Datadog: assets/dashboards/pagerduty_overview.json
author:
  homepage: https://pagerduty.com
  name: PagerDuty
  sales_email: sales@pagerduty.com
  support_email: support@pagerduty.com
categories:
- アラート設定
- コラボレーション
- インシデント
- 問題追跡
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pagerduty/README.md
display_on_public_website: true
draft: false
git_integration_title: pagerduty_ui
integration_id: pagerduty-ui
integration_title: PagerDuty UI
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: pagerduty_ui
public_title: PagerDuty UI
short_description: Datadog のダッシュボードから PagerDuty のインシデントを監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Collaboration
  - Category::Incidents
  - Category::Issue Tracking
  - Category::Notifications
  - Offering::UI Extension
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog のダッシュボードから PagerDuty のインシデントを監視する
  media:
  - caption: ランディングページ
    image_url: images/landing_page.png
    media_type: image
  - caption: Status Dashboard by PagerDuty
    image_url: images/status_dashboard.jpg
    media_type: image
  - caption: Status Dashboard by PagerDuty
    image_url: images/status_dashboard2.jpg
    media_type: image
  - caption: Incidents by PagerDuty
    image_url: images/incidents.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: PagerDuty UI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

PagerDuty は、イベントデータを継続的に処理、分析、ルーティングするリアルタイムオペレーションプラットフォームです。このシステムは、複数の監視ツールから送られてくるデータの集約ポイントとして機能し、運用の現状を全体的に把握することができます。PagerDuty により、Datadog のお客様は、インシデントのライフサイクルを通じて可視性と説明責任を高めながら、より効果的なインシデントレスポンスを実現することができます。PagerDuty は 2 つの新しいアプリを提供し、ツールを切り替えることなく、どこで作業していても当社のリアルタイムオペレーションプラットフォームのすべての機能を利用することができるようになります。新しいウィジェット「Status Dashboard by PagerDuty」と「Incidents by PagerDuty」をダッシュボードに直接追加して、サービスステータスダッシュボードを確認したり、Datadog から直接緊急度の高いインシデントにリアルタイムに対応することができます。

### Status Dashboard by PagerDuty

Status Dashboard by PagerDuty は、技術対応者、ビジネス対応者、技術およびビジネスリーダーに、システムの健全性をライブで共有表示し、運用上の問題に対する認識を向上させることができます。現在のサービスステータスを表示し、ビジネスサービスが影響を受けている場合は通知を送信してユーザーに警告します。この機能により、インシデント発生時の対応チームと関係者間のコミュニケーションが改善されます。

#### 主な特徴

- チームは、Datadog から直接サービスステータスダッシュボードを表示し、チームのシステムの健全性を迅速にリアルタイムで確認することができます。
- ユーザーは、エンジニアリングチームがすぐに調べたい問題を発見した場合、PagerDuty Datadog アプリから手動でインシデントを発生させることができます。
- このウィジェットは、主要なビジネスサービスの現在のステータスと、それに影響を与えるビジネスサービスを表示し、インシデントの作業中に完全なコンテキストを取得します。
- インシデント発生時の対応チームとステークホルダー間のコミュニケーションを改善します。


#### 要件
- このインテグレーションは、すべての PagerDuty のお客様が利用できます。ただし、以下の機能は Pagerduty Business Plan 以上のお客様のみご利用いただけます。

### Incidents by PagerDuty

Incidents by PagerDuty は、Datadog のインターフェイスから直接インシデント対応を行うことができます。PagerDuty で進行中のインシデントを認識し、解決することができ、ツール間でコンテキストを切り替えることなく、PagerDuty にシームレスなナビゲーションで戻ることができます。

#### 特徴は以下の通りです。
- 緊急度の高いインシデントやアクティブなインシデントを最大 20 件まで表示し、チームに知らせることができます
- チームのためにインシデントを認識し、解決することができます
- PagerDuty に移動して、個々のインシデントとそのサービスを表示したり、インシデントリストを表示することができます


## 計画と使用

1. Datadog アカウントで、Dashboards に移動します。Status Dashboard ウィジェットを追加したいダッシュボードを選択するか、[新しいダッシュボードを作成][1]します。

2. ダッシュボードで、ダッシュボードタイトルの右側にある **+Add Widgets** をクリックします。ウィジェットを右にスクロールし、**PagerDuty** ウィジェットをダッシュボードの好きな位置にドラッグアンドドロップしてください。

3. Custom Widget Editor のモーダルで、**Connect** をクリックします。**サービス地域**を選択し、PagerDuty アカウントに**ログイン**します。Custom Widget Editor にリダイレクトされると、ウィジェットがどのように表示されるかのプレビューが表示されます。プレビューの下にある **Widget options** で、ダッシュボードのデフォルトにする追加機能を任意で選択します。また、オプションで**ウィジェットタイトル**を変更することができます。**Done**をクリックして、ウィジェットをダッシュボードに追加します。

## Agent

PagerDuty のカスタマーになりたい方は [PagerDuty 営業チーム][2]に、トラブルシューティングは [Datadog サポート][3]にお問い合わせください。

ステータスダッシュボード機能、Incidents by Pagerduty を含むプランへのアップグレードをご希望の方は、[Pagerduty 営業チームまでお問い合わせください][2]。

[1]: https://docs.datadoghq.com/ja/dashboards/#new-dashboard
[2]: https://www.pagerduty.com/contact-sales/
[3]: https://www.datadoghq.com/support/