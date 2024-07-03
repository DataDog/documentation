---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-ha-github
app_uuid: c4bdf039-4223-4505-80dc-d2564dbc8368
assets:
  dashboards:
    RapDev GitHub Hosted Agent Issues: assets/dashboards/github_issues_dashboard.json
    RapDev GitHub Hosted Agent Overview: assets/dashboards/github_overview_dashboard.json
    RapDev GitHub Hosted Agent Pull Request: assets/dashboards/github_pull_requests_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: rapdev.hosted_agent.github.repository
      metadata_path: metadata.csv
      prefix: rapdev.hosted_agent.github.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 82741
    source_type_name: RapDev HA GitHub
  monitors:
    GitHub Issue is Stale - Organization Level: assets/monitors/github_issue_is_stale_org.json
    GitHub Issue is Stale - Repository Level: assets/monitors/github_issue_is_stale_repo.json
    GitHub Pull Request is Stale - Organization Level: assets/monitors/github_pr_is_stale_org.json
    GitHub Pull Request is Stale - Repository Level: assets/monitors/github_pr_is_stale_repo.json
  oauth: assets/oauth_clients.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- クラウド
- コラボレーション
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_ha_github
integration_id: rapdev-ha-github
integration_title: GitHub Hosted Agent
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_ha_github
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.hosted_agent.github
  product_id: rapdev-ha-github
  short_description: リポジトリ 1 個あたりの単価
  tag: repo_id
  unit_label: GitHub リポジトリ
  unit_price: 1
public_title: GitHub Hosted Agent
short_description: Monitor your GitHub repositories using the Rapdev Hosted Agent
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
  - Category::Marketplace
  - Category::Cloud
  - Category::Collaboration
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitor your GitHub repositories using the Rapdev Hosted Agent
  media:
  - caption: GitHub Overview 1
    image_url: images/github_overview_dashboard_1.jpg
    media_type: image
  - caption: GitHub Overview 2
    image_url: images/github_overview_dashboard_2.jpg
    media_type: image
  - caption: GitHub Pull Request 1
    image_url: images/github_pull_request_dashboard_1.jpg
    media_type: image
  - caption: GitHub Pull Request 2
    image_url: images/github_pull_request_dashboard_2.jpg
    media_type: image
  - caption: GitHub Issues 1
    image_url: images/github_issues_dashboard_1.jpg
    media_type: image
  - caption: GitHub Issues 2
    image_url: images/github_issues_dashboard_2.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub Hosted Agent
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

The Hosted Agent for GitHub provides insights into development activity across repositories. GitHub is the world's leading platform software development, collaboration, and security. Identify issues such as stale repositories, pull requests, or issues and align merge activity with creators, mergers, and assignees. 

The Hosted Agent supports a simpler installation and configuration from the existing [RapDev GitHub Marketplace integration][4]. Leveraging Datadog's Marketplace OAuth capabilities, the Hosted Agent provides a guided GitHub App installation process with the RapDev Connection Manager portal and supports multiple GitHub organizations and users for unified observability in Datadog.

The Hosted Agent for GitHub integration includes Datadog dashboards and recommended monitors to assist in providing immediate observability into your GitHub repository activities.

## サポート
For support or feature requests, contact RapDev through the following channels:

- Support: [support@rapdev.io][1]
- 営業: [sales@rapdev.io][3]
- チャット: [rapdev.io][2]
- 電話: 855-857-0222

---
ボストンより ❤️ を込めて

*This isn't the integration you're looking for? Missing a critical feature for your organization? Drop RapDev a [note][1], and we'll build it!!*

[1]: mailto:support@rapdev.io
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: https://app.datadoghq.com/marketplace/app/rapdev-github/overview
[5]: https://app.datadoghq.com/organization-settings/api-keys

---
This application is made available through the Marketplace and is supported by a Datadog Technology Partner. <a href="https://app.datadoghq.com/marketplace/app/rapdev-ha-github" target="_blank">Click Here</a> to purchase this application.