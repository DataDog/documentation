---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-snaplogic
app_uuid: c3f2e4a6-a17f-4b66-b72d-4be62b648fb8
assets:
  dashboards:
    RapDev SnapLogic Snaplex Dashboard: assets/dashboards/snaplex_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.snaplogic.snaplex_node.running
      metadata_path: metadata.csv
      prefix: rapdev.snaplogic.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6643655
    source_type_name: RapDev SnapLogic
  monitors:
    Can't Connect to SnapLogic: assets/monitors/snaplogic_can_connect.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 개발 툴
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snaplogic
integration_id: rapdev-snaplogic
integration_title: SnapLogic
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snaplogic
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.snaplogic
  product_id: snaplogic
  short_description: Snaplex당 단위 비용
  tag: snaplex_label
  unit_label: SnapLogic Snaplexes
  unit_price: 10
public_title: SnapLogic
short_description: SnapLogic Pipelines 및 Snaplexes 모니터링
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
  - 제출한 데이터 유형::메트릭
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: SnapLogic Pipelines 및 Snaplexes 모니터링
  media:
  - caption: SnapLogic 대시보드
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SnapLogic
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
SnapLogic은 클라우드 데이터 소스, SaaS 애플리케이션, 온프레미스 비즈니스 애플리케이션을 연결하는 Integration Platform as a Service(iPaaS) 툴을 제공하는 소프트웨어 회사입니다. RapDev의 SnapLogic 통합은 Agent 점검 기반 통합으로 SnapLogic REST API를 쿼리하여 [snaplexes][8] 및 파이프라인 데이터를 메트릭으로, 조직 활동 데이터를 로그로 가져옵니다.

### 로그
본 통합은 `conf.yaml` 파일에서 `collect_activity_logs`가 활성화된 경우에만 SnapLogic 조직 활동 로그를 수집합니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.

- 지원: [support@rapdev.io][7]
- 영업 팀: [sales@rapdev.io][1]
- 채팅: [rapdev.io][6]
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하는 통합을 찾을 수 없나요? 조직에 필요한 중요 기능이 빠져 있나요? [메시지][7]를 보내 주시면 빌드해 드립니다!!*

---
[1]: mailto:sales@rapdev.io
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1439028/Creating+a+User
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://www.rapdev.io/#Get-in-touch
[7]: mailto:support@rapdev.io
[8]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1437953/The+SnapLogic+Snaplex
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-snaplogic" target="_blank">Marketplace에서 이 애플리케이션을 구매하세요</a>.