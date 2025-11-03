---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-ansible-automation-platform
app_uuid: fe1cdb5a-023a-4489-80df-cf5e30031389
assets:
  dashboards:
    RapDev Ansible Automation Jobs Dashboard: assets/dashboards/rapdev_ansible_automation_jobs_dashboard.json
    RapDev Ansible Automation Overview Dashboard: assets/dashboards/rapdev_ansible_automation_overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.ansible_automation_platform.organization_count
      metadata_path: metadata.csv
      prefix: rapdev.ansible_automation_platform.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14094161
    source_type_name: RapDev Ansible Automation Platform
  monitors:
    Ansible Job Failed: assets/monitors/ansible_job_failed.json
    Ansible Node has reached maximum capacity: assets/monitors/ansible_node_capacity.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- マーケットプレイス
- 開発ツール
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_ansible_automation_platform
integration_id: rapdev-ansible-automation-platform
integration_title: Ansible Automation Platform
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_ansible_automation_platform
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.ansible_automation_platform
  product_id: ansible-automation-platform
  short_description: Ansible 実行ノードあたりの単価
  tag: ansible_node_uuid
  unit_label: Ansible 実行ノード
  unit_price: 10
public_title: Ansible Automation Platform
short_description: Ansible Automation Platform の使用状況、ジョブ、イベントの監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Ansible Automation Platform の使用状況、ジョブ、イベントの監視
  media:
  - caption: Ansible Automation Platform - 概要ダッシュボード
    image_url: images/overview_dashboard.png
    media_type: image
  - caption: Ansible Automation Platform - ジョブダッシュボード
    image_url: images/jobs_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ansible Automation Platform
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

Ansible Automation Platform は、シンプルで強力なエージェントレス技術の実装により、組織内のユーザーがオートメーションコンテンツを共有、検証、管理できるようにします。このインテグレーションには、Ansible Automation Controller のさまざまなコンポーネントの全体的な健全性を示す 2 つのダッシュボードが事前に組み込まれています。また、Automation Controller の実行ノードで実行されるさまざまな種類のジョブのステータスに関するメトリクスも含まれています。

Automation Platform 環境の監視を始める際に役立つよう、Ansible ジョブの実行に失敗した場合にアラートを送信するモニターが含まれています。


## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。

- サポート: [support@rapdev.io][6]
- セールス: sales@rapdev.io
- チャット: [rapdev.io][7]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら][6]から RapDev にメッセージをお送りいただければ、導入をサポートいたします！*

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.ansible.com/automation-controller/4.0.0/html/quickstart/create_user.html
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: mailto:support@rapdev.io
[7]: https://www.rapdev.io/#Get-in-touch
[8]: mailto:sales@rapdev.io

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-ansible-automation-platform" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。