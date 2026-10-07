---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-infoblox
app_uuid: 7712bdf0-a2eb-487c-8d1e-595c74b99e47
assets:
  dashboards:
    Infoblox Overview Dashboard: assets/dashboards/infoblox_overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.infoblox.utilization
      metadata_path: metadata.csv
      prefix: rapdev.infoblox.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10432
    source_type_name: RapDev Infoblox
  monitors:
    DHCP is not working: assets/monitors/infoblox_dhcp_monitor.json
    DNS has failed: assets/monitors/infoblox_dns_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_infoblox
integration_id: rapdev-infoblox
integration_title: Infoblox
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_infoblox
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: infoblox
  short_description: 본 통합에 대한 정액제 요금
  unit_price: 100
public_title: Infoblox
short_description: Infoblox 노드 및 IPAM 시스템 상태를 메트릭으로 모니터링하세요
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - 카테고리::보안
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: Infoblox 노드 및 IPAM 시스템 상태를 메트릭으로 모니터링하세요
  media:
  - caption: RapDev Infoblox 개요 대시보드
    image_url: images/infoblox_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Infoblox
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Infoblox는 클라우드 중심 네트워킹 및 보안 솔루션을 제공합니다. DNS, DHCP, IP 주소 관리(IPAM)와 같은 핵심 네트워크 서비스에 중점을 둡니다. Infoblox 솔루션은 이러한 중요한 네트워킹 기능을 자동화하고 보호하는 데 유용합니다.

Network Identity Operating System(NIOS)는 Infoblox 핵심 네트워크 서비스를 구동하는 운영 체제입니다. NIOS는 Next Level Networking의 기반이며 네트워크 인프라의 무중단 운영을 보장합니다. NIOS는 DNS, DHCP, IP 주소 관리(IPAM) 배포 및 관리와 관련된 오류 발생 가능성이 높고 시간이 많이 드는 수작업을 자동화하여, 네트워크의 지속적인 가용성과 비즈니스 가동 시간을 보장합니다.

이러한 통합을 통해 Infoblox가 생성하는 요약 보고서에서 메트릭과 서비스 점검을 보고하여 Infoblox 노드 상태와 IPAM 성능을 모니터링할 수 있습니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.

- 고객지원: [support@rapdev.io][6]
- 영업: [sales@rapdev.io][7]
- 채팅: [rapdev.io][5]
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 핵심 기능이 빠져있나요? RapDev에 [메시지][6]를 보내주세요.*

[1]: https://insights.infoblox.com/resources-deployment-guides/infoblox-deployment-infoblox-rest-api
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-infoblox" target="_blank">Marketplace에서 구매하세요</a>.