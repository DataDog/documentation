---
algolia:
  subcategory: Marketplace 통합
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
    GitHub Issue for Repository is Stale: assets/monitors/github_issue_is_stale_repo.json
    GitHub Issue is Stale: assets/monitors/github_issue_is_stale_org.json
    GitHub Pull Request Has Not Been Updated: assets/monitors/github_pr_is_stale_org.json
    GitHub Pull Request for Repository Has Not Been Updated: assets/monitors/github_pr_is_stale_repo.json
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
- 클라우드
- 협업
custom_kind: integration
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
  short_description: 리포지토리당 단가
  tag: repo_id
  unit_label: GitHub Repository
  unit_price: 1
public_title: GitHub Hosted Agent
short_description: Rapdev Hosted Agent를 사용하여 GitHub 리포지토리 모니터링
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
  - 제공::통합
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Rapdev Hosted Agent를 사용하여 GitHub 리포지토리 모니터링
  media:
  - caption: GitHub Overview 1
    image_url: images/github_overview_dashboard_1.jpg
    media_type: 이미지
  - caption: GitHub Overview 2
    image_url: images/github_overview_dashboard_2.jpg
    media_type: 이미지
  - caption: GitHub Pull Request 1
    image_url: images/github_pull_request_dashboard_1.jpg
    media_type: 이미지
  - caption: GitHub Pull Request 2
    image_url: images/github_pull_request_dashboard_2.jpg
    media_type: 이미지
  - caption: GitHub Issues 1
    image_url: images/github_issues_dashboard_1.jpg
    media_type: 이미지
  - caption: GitHub Issues 2
    image_url: images/github_issues_dashboard_2.jpg
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub Hosted Agent
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

GitHub용 Hosted Agent는 여러 리포지토리의 개발 활동에 관한 인사이트를 제공합니다. GitHub는 소프트웨어 개발, 협업, 보안 분야에서 세계 최고의 플랫폼입니다. 오래된 리포지토리, 풀 요청, 이슈와 같은 문제를 식별하고, 생성자·병합자·담당자 간의 병합 활동을 조율할 수 있습니다.

Hosted Agent는 기존 [RapDev GitHub Marketplace 통합][4]보다 설치 및 구성 방법이 더욱 간편합니다. Hosted Agent는 Datadog의 Marketplace OAuth 기능을 활용하여 RapDev Connection Manager 포털을 통해 GitHub 앱 설치 과정을 안내하고, 여러 GitHub 조직 및 사용자를 지원하여 Datadog에서 통합된 가시성을 제공합니다.

GitHub 통합용 Hosted Agent에는 Datadog 대시보드와 권장 모니터가 포함되어 있어 GitHub 리포지토리 활동을 즉시 관찰할 수 있습니다.

## 지원
지원이나 기능을 요청하려면 다음 채널을 통해 RapDev에 문의하세요.

- 고객지원: [support@rapdev.io][1]
- 영업: [sales@rapdev.io][3]
- 채팅: [rapdev.io][2]
- 전화: 855-857-0222

---
Made with ❤️ in Boston

원하는 통합을 찾을 수 없나요? 조직에 필요한 중요 기능이 빠져있나요? RapDev에 [메시지][1]를 보내주세요.

[1]: mailto:support@rapdev.io
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: https://app.datadoghq.com/marketplace/app/rapdev-github/overview
[5]: https://app.datadoghq.com/organization-settings/api-keys

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-ha-github" target="_blank">Marketplace에서 구매하세요</a>.