---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-avd
app_uuid: fcba4622-a19c-4cb7-accf-c2ed8f28fa6a
assets:
  dashboards:
    RapDev - Azure Virtual Desktop Overview: assets/dashboards/rapdev_-_azure_virtual_desktop_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.avd.session_host.active
      metadata_path: metadata.csv
      prefix: rapdev.avd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14602580
    source_type_name: RapDev AVD
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- azure
- marketplace
- 메트릭
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_avd
integration_id: rapdev-avd
integration_title: Azure Virtual Desktop
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_avd
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.avd
  product_id: avd
  short_description: AVD 세션 호스트당 단가.
  tag: session_host
  unit_label: AVD Session Host
  unit_price: 3
public_title: Azure Virtual Desktop
short_description: Azure Virtual Desktop 호스트 풀 및 세션 상태 모니터링
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  - Category::Azure
  - Category::Marketplace
  - Category::Metrics
  - 제공::통합
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Azure Virtual Desktop 호스트 풀 및 세션 상태 모니터링
  media:
  - caption: Overview 대시보드 예시
    image_url: images/RapDev_AVD_Overview1.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Virtual Desktop
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
Azure Virtual Desktop은 Azure에서 호스팅되는 서비스로 데스크톱 및 애플리케이션 가상화를 제공합니다. 단일 및 다중 세션 데스크톱을 모두 지원하며, 개별 원격 애플리케이션 실행 기능도 제공합니다.

Azure Virtual Desktop(AVD) 통합은 세션 호스트 상태 점검은 물론 세션 수 및 성능에 대한 고급 정보도 제공합니다. 이 통합은 기존 Datadog Azure 클라우드 통합을 보완하여 고객이 Datadog의 통합 가시성 플랫폼을 사용하여 Azure Virtual Desktop 데이터를 다른 Azure 서비스 및 인프라와 상호 연관시킬 수 있도록 지원합니다. 이러한 전체적인 뷰를 통해 팀은 문제를 사전에 파악 및 해결하고, 리소스 할당을 최적화하며, 원활한 사용자 경험을 보장할 수 있습니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 지원: [support@rapdev.io][8]
- 영업: [sales@rapdev.io][9]
- 채팅: [rapdev.io][10]
- 전화: 855-857-0222

---
Made with ❤️ in Boston

*원하시는 통합을 찾을 수 없나요? 조직에 필요한 핵심 기능이 빠져있나요? RapDev에 [메시지][8]를 보내주세요.*

[1]: https://docs.datadoghq.com/ko/integrations/guide/azure-manual-setup/?tab=azurecli
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/quick-create-workspace?tabs=azure-portal
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/manage-access?tabs=portal
[4]: https://portal.azure.com/#view/Microsoft_Azure_WVD/WvdManagerMenuBlade/~/hostpools
[5]: https://learn.microsoft.com/en-us/azure/virtual-desktop/diagnostics-log-analytics#push-diagnostics-data-to-your-workspace
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: mailto:support@rapdev.io
[9]: mailto:sales@rapdev.io
[10]: https://www.rapdev.io/#Get-in-touch
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog Technology Partner의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-avd" target="_blank">Marketplace에서 구매하세요</a>.