---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-commvault-cloud
app_uuid: 1d9b599d-54ec-4051-897e-74e943010ce7
assets:
  dashboards:
    Rapdev Commvault Cloud Overview: assets/dashboards/rapdev_commvault_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.commvault_cloud.jobs.count
      metadata_path: metadata.csv
      prefix: rapdev.commvault_cloud
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10455
    source_type_name: Rapdev Commvault Cloud
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- クラウド
- marketplace
- コンプライアンス
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_commvault_cloud
integration_id: rapdev-commvault-cloud
integration_title: Commvault Cloud
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_commvault_cloud
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.commvault_cloud
  product_id: commvault-cloud
  short_description: Charge of $5 per job run for monitoring with Commvault Cloud
    / Metallic.io in Datadog.
  tag: unique_job
  unit_label: ジョブ
  unit_price: 1
public_title: Commvault Cloud
short_description: Monitor your Commvault Jobs, Library statuses, Alerts and Events
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
  - Category::Cloud
  - Category::Marketplace
  - カテゴリ::コンプライアンス
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Monitor your Commvault Jobs, Library statuses, Alerts and Events
  media:
  - caption: Commvault Overview Dashboard
    image_url: images/full_view.png
    media_type: image
  - caption: Commvault Overview Dashboard environment overview section 1 of 5
    image_url: images/overview.png
    media_type: image
  - caption: Commvault Overview Dashboard alerts and events overview section 2 of
      5
    image_url: images/alerts_and_events.png
    media_type: image
  - caption: Commvault Overview Dashboard job operations overview section 3 of 5
    image_url: images/jobs.png
    media_type: image
  - caption: Commvault Overview Dashboard library operations section 4 of 5
    image_url: images/libraries.png
    media_type: image
  - caption: Commvault Overview Dashboard storage pools section 5 of 5
    image_url: images/storage_pools.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Commvault Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Commvault simplifies data protection, cyber recovery, and cyber resilience by backing up your data from various sources including databases, virtual machines, applications, and more.  

The Rapdev Commvault Cloud integration offers real-time insights into your backup environment. This integration enables you to track various metrics related to ongoing jobs, storage libraries, console alerts, and events. 

- By pulling detailed data on alerts, it keeps you informed about the nature, age, and total alert count. This helps you respond to any issues quickly. 
- The job monitoring aspect captures crucial information about each backup job, including the size of data in bytes and the duration of the job. This optimizes performance and trend analysis. 
- Storage library monitoring provides a granular view of your storage environment, with specifics on each library, available bytes, data backed up in the past hour, total capacity, free space, and the time of the last backup.  

The Rapdev Commvault Cloud integration pulls data from your Command Center into your Datadog account. This help you leverage enhanced dashboard visualizations, monitoring, and alerting capabilities in Datadog.

To monitor Commvault On-Prem, visit our [Commvault On-Prem integration][8].

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- Support: [support@rapdev.io][4]  
- Sales: [sales@rapdev.io][5]  
- Chat: [rapdev.io][6]  
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*


[1]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[2]: https://docs.datadoghq.com/ja/agent/configuration/agent-commands/?tab=agentv6v7  
[3]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory  
[4]: mailto:support@rapdev.io  
[5]: mailto:sales@rapdev.io  
[6]: https://www.rapdev.io/#Get-in-touch 
[7]: https://api.metallic.io
[8]: https://app.datadoghq.com/marketplace/app/rapdev-commvault/overview

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-commvault-cloud" target="_blank">Click Here</a> to purchase this application.