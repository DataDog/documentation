---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-sophos
app_uuid: 86b68ae7-ba52-4160-bbf5-e1455fafa677
assets:
  dashboards:
    RapDev Sophos Dashboard: assets/dashboards/rapdev_sophos_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.sophos.endpoint.registered
      metadata_path: metadata.csv
      prefix: rapdev.sophos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10192
    source_type_name: RapDev Sophos
  logs: {}
  monitors:
    Endpoint is no longer in good health: assets/monitors/sophos_endpoint_health.json
    Sophos Service is stopped: assets/monitors/sophos_service_running.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- security
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_sophos
integration_id: rapdev-sophos
integration_title: Sophos
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_sophos
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.sophos
  product_id: sophos
  short_description: 엔드포인트당 유닛 비용
  tag: endpoint_name
  unit_label: 등록된 엔드포인트
  unit_price: 1
public_title: Sophos
short_description: Sophos 관리형 엔드포인트의 서비스 상태 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Sophos 관리형 엔드포인트의 서비스 상태 모니터링
  media:
  - caption: Sophos 대시보드
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Sophos
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Sophos 통합은 Sophos 관리형 엔드포인트의 전반적인 서비스 상태를 모니터링하여 관리형 장치가 양호한 서비스 상태인지 확인합니다. 본 통합은 장치 서비스 상태를 모니터링하는 데 사용하는 여러 메트릭의 폭넓은 개요를 제공하는 기본 내장 대시보드 1개가 함께 제공됩니다. 또한 Sophos 통합에는 장치의 서비스 상태가 양호하지 않거나 장치의 Sophos 서비스 중 하나가 중지되는 경우 경고하는 데 사용하는 모니터링 2개가 함께 제공됩니다.

### 모니터링
1. 관리형 엔드포인트 상태가 변경됨
2. 관리형 엔드포인트의 Sophos 서비스가 중지됨

### 대시보드
1. RapDev Sophos 대시보드

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 지원 팀: support@rapdev.io
- 영업 팀: sales@rapdev.io
- 채팅: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*찾고 계신 통합 이 아닌가요? 조직에 꼭 필요한 기능이 없나요? RapDev에 [메시지](mailto:support@rapdev.io)를 남겨주시면 빌드해 드릴게요!!!*.

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/rapdev_sophos/datadog_checks/rapdev_sophos/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-sophos" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.