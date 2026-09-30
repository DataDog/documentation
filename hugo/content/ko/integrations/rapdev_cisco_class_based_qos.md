---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-cisco-class-based-qos
app_uuid: 97f3eada-2bd0-4100-94f7-fe7f20132442
assets:
  dashboards:
    RapDev Cisco QOS Dashboard: assets/dashboards/rapdev_cisco_classbased_qos_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.cisco_class_based_qos.devices_monitored
      metadata_path: metadata.csv
      prefix: rapdev.cisco_class_based_qos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10457427
    source_type_name: cisco_class_based_qos
  logs: {}
author:
  homepage: https://rapdev.io
  name: RapDev
  sales_email: sales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- network
- snmp
- 메트릭
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_cisco_class_based_qos
integration_id: rapdev-cisco-class-based-qos
integration_title: QOS(Cisco Quality of Service)
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_cisco_class_based_qos
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.cisco_class_based_qos
  product_id: cisco
  short_description: QOS 디바이스별 단위 가격
  tag: qos_host
  unit_label: QOS 디바이스
  unit_price: 20
public_title: QOS(Cisco Quality of Service)
short_description: Cisco 등급 기반 QOS를 사용해 네트워크 트래픽 모니터링
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 지원 OS::Linux
  - 지원 OS::macOS
  - Category::Marketplace
  - 제공::통합
  - Submitted Data Type::Metrics
  - Category::Network
  - Category::SNMP
  - Category::Metrics
  configuration: README.md#Setup
  description: Cisco 등급 기반 QOS를 사용해 네트워크 트래픽 모니터링
  media:
  - caption: QOS 대시보드 - 라이트 모드 1/3
    image_url: images/dashboard_light_1.jpg
    media_type: image
  - caption: QOS 대시보드 - 라이트 모드 2/3
    image_url: images/dashboard_light_2.jpg
    media_type: image
  - caption: QOS 대시보드 - 라이트 모드 3/3
    image_url: images/dashboard_light_3.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: QOS(Cisco Quality of Service)
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Cisco 네트워크의 QoS(Quality of Service)는 트래픽 관리를 위해 고안한 기술과 사용 사례로, 다양한 네트워크 서비스에서 성능 요건을 충족시킬 수 있도록 도와줍니다. Cisco의 QoS는 특정 네트워크 트래픽에 우선 순위를 부여하여 네트워크 정체 등의 상황에서 대역폭을 수신하고 대기 시간이 짧도록 조정하여 음성 및 영상 컨퍼런스와 같은 중요 애플리케이션이 제대로 작동할 수 있도록 합니다.

Cisco QoS의 핵심 구성 요소에는 다음이 있습니다.
- 분류 및 마킹: 유형에 따라 다르게 처리하기 위해 트래픽 유형을 파악하고 마킹합니다. 이 과정에서 패킷을 검사하고 정책에 따라 여러 등급으로 할당합니다.
- 대기: 트래픽 정체를 관리하고 등급이 높은 트래픽을 우선으로 처리합니다. 여기에 Priority Queuing, WFQ(Weighted Fair Queing), CBWFQ(Class-Based Weighted Fair Queuing)과 같은 알고리듬이 사용됩니다.
- 정체 관리 및 예방: Tail Drop 또는 RED(Random Early Detection)과 같은 도구를 사용해 트래픽 흐름을 관리하고 통제된 방식으로 패킷을 제거하여 네트워크 정체를 예방합니다.
- 트래픽 셰이핑 및 정책 관리: 정의된 대역폭 제한에 맞도록 트래픽 흐름을 통제합니다. 트래픽 셰이핑으로 트래픽 흐름을 부드럽게 유지하면서 정책 관리로 지정된 속도를 초과하는 트래픽을 제거합니다.
- 연결 효율성 메커니즘: LFI(Link Fragmentation and Interleaving)과 압축 방법과 같은 기술로 네트워크 연결 효율성을 개선합니다.

이 통합에서는 일부 정기적으로 Cisco 디바이스에서 MIB 개체를 폴링합니다. 수집된 데이터에는 여러 QoS 정책의 성능과 사용량 통계를 보여주며, 이를 통해 네트워크 관리자가 트래픽 패턴을 분석하고, QoS 정책 효율성을 확인하며, 필요할 시 조정할 수 있습니다.

Cisco의 등급 기반 QoS 통합에서는 SNMP가 활성화된 Cisco 디바이스에서 [등급 기반 트래픽 정책 관리][2]의 통계를 모니터링합니다. 등급 기반 정책 기반은 인터페이스에서 수신 및 발신되는 트래픽의 최대 속도를 통제하도록 도와줍니다.  정책 전과 후에 디바이스 네트워크 흐름의 다양한 등급을 관찰할 수 있고, 특정 정책이 트래픽에 미치는 영향도 관찰할 수 있습니다.

## 지원
지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의하세요.

- 지원팀: [support@rapdev.io][8] 
- 영업틈: [sales@rapdev.io][9] 
- 채팅: [rapdev.io][10]  
- 전화: 855-857-0222

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/qos_plcshp/configuration/xe-16/qos-plcshp-xe-16-book/qos-plcshp-class-plc.html
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://sourceforge.net/projects/net-snmp/
[6]: https://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/7282-12.html
[7]: https://community.cisco.com/t5/networking-knowledge-base/configuration-template-for-snmpv3/ta-p/4666450
[8]: mailto:support@rapdev.io  
[9]: mailto:sales@rapdev.io  
[10]: https://www.rapdev.io/#Get-in-touch  
[11]: https://app.datadoghq.com/marketplace/app/rapdev-snmp-profiles/

---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-cisco-class-based-qos" target="_blank">Marketplace에서 구매하세요</a>.