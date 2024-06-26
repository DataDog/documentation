---
app_id: insightfinder
app_uuid: 144b8c72-b842-4257-9815-93aa63ad2da1
assets:
  dashboards:
    InsightFinder Dashboard: assets/dashboards/ifdashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: insightfinder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10253
    source_type_name: InsightFinder
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: InsightFinder
  sales_email: support@insightfinder.com
  support_email: support@insightfinder.com
categories:
- アラート設定
- 自動化
- インシデント
- notifications
- ai/ml
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/insightfinder/README.md
display_on_public_website: true
draft: false
git_integration_title: insightfinder
integration_id: insightfinder
integration_title: InsightFinder
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: insightfinder
public_title: InsightFinder
short_description: InsightFinder で DataDog からデータを統合して分析
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Alerting
  - Category::Automation
  - Category::Incidents
  - Category::Notifications
  - Category::AI/ML
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: InsightFinder で DataDog からデータを統合して分析
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: InsightFinder
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[InsightFinder][1] AIOps で、ユーザーに影響が出る前にシステムおよびアプリケーションの問題を特定できます。教師なし機械学習を利用する InsightFinder は、イベント、ログ、メトリクス、そして変化から継続的に学習し、異常検知、インシデント予測、そして機能停止の修復をします。

この双方向インテグレーションは、高度な AIOps 機能を提供します。InsightFinder は、標準的な API を通じて Datadog からデータを取り込み、ビジネスに影響が及ぶ前に異常なイベントを発見します。これらの異常なイベントに対するアラートを Datadog に送信し、チームに通知することができます。

## 計画と使用

### インフラストラクチャーリスト

InsightFinder のインテグレーションを構成してデータを送信するには、[InsightFinder-Datadog インテグレーション][2]を参照してください。Datadog [API キーおよびアプリケーションキー][3]が必要です。


## Agent

[Datadog サポート][4]にお問い合わせいただくか、[InsightFinder サポート][5]にメールしてください。


[1]: https://insightfinder.com/
[2]: https://insightfinder.com/datadog-integration/
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[4]: https://docs.datadoghq.com/ja/help/
[5]: mailto:support@insightfinder.com