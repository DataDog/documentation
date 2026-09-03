---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-github
app_uuid: 37a265a0-fb4a-463b-aaea-653f5d950c2c
assets:
  dashboards:
    RapDev GitHub Overview: assets/dashboards/RapDevGitHubDashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.github.users.count
      metadata_path: metadata.csv
      prefix: rapdev.github.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10289
    source_type_name: RapDev GitHub
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- cloud
- 협업
- marketplace
- 메트릭
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_github
integration_id: rapdev-github
integration_title: GitHub
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_github
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.github
  product_id: github
  short_description: 리포지토리당 단가
  tag: repo_name
  unit_label: GitHub Repository
  unit_price: 1
public_title: GitHub
short_description: GitHub 조직 또는 기업 모니터링
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Category::Collaboration
  - Category::Marketplace
  - 카테고리::메트릭
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: GitHub 조직 또는 기업 모니터링
  media:
  - caption: GitHub 조직 또는 기업에 대한 일반 메트릭
    image_url: images/RapDevGitHub_DB1.jpg
    media_type: image
  - caption: 모든 러너의 메트릭
    image_url: images/RapDevGitHub_DB2.jpg
    media_type: image
  - caption: 특정 리포지토리의 메트릭
    image_url: images/RapDevGitHub_DB3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: GitHub
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
이 통합은 GitHub API의 다양한 엔드포인트를 통해 GitHub 메트릭을 수집하고 Datadog에 보고합니다. 다음과 같은 메트릭이 전송됩니다.
+ Organization/Enterprise Stats
+ Repository Metrics
+ Self-hosted and Installed Runners
+ GitHub Workflow Monitoring

### 대시보드
이 통합은 **RapDev GitHub 대시보드**라는 기본 대시보드를 제공합니다. 이 대시보드는 시간이 지나면서 Datadog으로 데이터가 전송됨에 따라 채워지며, 특정 리포지토리나 작성자에 관한 검색을 더 좁힐 수 있도록 환경 변수를 포함합니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.
- 지원: support@rapdev.io
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston
*원하시는 통합을 찾을 수 없나요? 조직에 필요한 핵심 기능이 없나요?* RapDev에 [이메일](mailto:support@rapdev.io)을 보내주세요.*

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-github" target="_blank">Marketplace에서 구매하세요</a>.