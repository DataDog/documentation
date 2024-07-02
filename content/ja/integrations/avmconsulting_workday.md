---
algolia:
  subcategory: Marketplace インテグレーション
app_id: avmconsulting-workday
app_uuid: 72aa287e-21c7-473a-9efd-523d9687f7f1
assets:
  dashboards:
    AVM Consulting Workday Integrations Trends: assets/dashboards/workday_integrations_trends.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: avmconsulting.workday.total_jobs
      metadata_path: metadata.csv
      prefix: avmconsulting.workday.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10251
    source_type_name: AVM Consulting Workday
  monitors:
    AVM Consulting Workday Connection Status: assets/monitors/workday_connect.json
    AVM Consulting Workday Integration Status: assets/monitors/workday_integrations_monitor.json
author:
  homepage: https://avmconsulting.net/
  name: AVMConsulting
  sales_email: integrations@avmconsulting.net
  support_email: integrations@avmconsulting.net
  vendor_id: avmconsulting
categories:
- ログの収集
- マーケットプレイス
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avmconsulting_workday
integration_id: avmconsulting-workday
integration_title: Workday
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avmconsulting_workday
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.avmconsulting.workday
  product_id: workday
  short_description: Workday のジョブごとの価格
  tag: job_id
  unit_label: Workday ジョブ
  unit_price: 1
public_title: Workday
short_description: Workday インテグレーションのステータスを監視できるようになります
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Workday インテグレーションのステータスを監視できるようになります
  media:
  - caption: Workday インテグレーションの概要
    image_url: images/Workday_integration_trends.png
    media_type: image
  - caption: Workday インテグレーションの概要
    image_url: images/Workday_integration_trends_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Workday
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

この Workday インテグレーションは、Workday におけるインテグレーションの状態を監視し、ジョブ実行の合計、失敗したジョブ実行、各ジョブの実行時間など、ジョブ実行に関する豊富なメトリクスを提供します。また、このインテグレーションは、ジョブ実行ログを取得し、各インテグレーションの状態について警告するモニターを提供します。

### ログ管理

このインテグレーションには、以下の推奨モニターが含まれています。

1. Connect to Workday: Workday への接続を監視します。
2. Workday Integration Status: インテグレーションごとにグループ化され、最後の Workdayインテグレーションイベントの状態を確認するマルチモニターです。

### ライブラリ

このインテグレーションには、**Workday Integrations Trends** という名前のすぐに使えるダッシュボードが含まれており、Workday のジョブ実行の概要や、各 Workdayインテグレーションに構成されているモニターの状態を視覚的に確認することができます。

### レート

このインテグレーションは、Workday API を使用してインテグレーション実行のログを収集し、Datadog REST API を通じてそれらのログを Datadog に送信します。実行に関連するタグは、これらのログに動的に割り当てられます。

## Agent

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから AVM Consulting にお問い合わせください。

 - メール: [integrations@avmconsulting.net][6] 
 - 電話: 855-AVM-0555 

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace の AVM コンサルティングのインテグレーションで Workday を監視する][5]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/developers/guide/custom-python-package/?tab=linux
[5]: https://www.datadoghq.com/blog/workday-monitoring-with-avm-and-datadog/
[6]: mailto:integrations@avmconsulting.net

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/avmconsulting-workday" target="_blank">こちらをクリック</a>してください。