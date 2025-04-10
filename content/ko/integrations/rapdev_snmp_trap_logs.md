---
algolia:
  subcategory: Marketplace 통합
app_id: rapdev-snmp-trap-logs
app_uuid: 754df420-1cf8-4742-b98c-9d3a76f83c41
assets:
  dashboards:
    RapDev SNMP Trap Logs: assets/dashboards/rapdev_snmp_trap_logs_dashboard.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- 네트워크
- snmp
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snmp_trap_logs
integration_id: rapdev-snmp-trap-logs
integration_title: SNMP Trap 로그
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snmp_trap_logs
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: snmp-trap-logs
  short_description: 본 통합에 대한 정액제 요금
  unit_price: 1000
public_title: SNMP Trap 로그
short_description: SNMP Trap 메시지를 Datadog 로그로 변환
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Network
  - Category::SNMP
  - Supported OS::Linux
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: SNMP Trap 메시지를 Datadog 로그로 변환
  media:
  - caption: RapDev SNMP Trap 로그
    image_url: images/1.png
    media_type: image
  - caption: SNMP Trap 로그 메시지
    image_url: images/2.png
    media_type: image
  - caption: 파싱된 SNMP Trap
    image_url: images/3.png
    media_type: image
  - caption: SNMP Trap 로그 대시보드
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
  support: README.md#Support
  title: SNMP Trap 로그
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->
## 개요
RapDev SNMP Trap 로그 패키지를 사용하면 SNMP Trap 메시지를 서로 다른 SNMP 장치 수천 개의 Datadog 로그로 변환할 수 있습니다.
찾을 수 있는 최대한 많은 MIB 파일을 수집하고, 이를 SNMP Trap을
사람이 읽을 수 있는 로그 메시지로 번역할 수 있는 포멧으로 변환합니다.

본 패키지에는 로그스태시(Logstash)를 SNMP Trap 리시버로 설정하는 설치 스크립트가 메시지를 번역하여
Datadog 내에서 네트워크 이벤트에 알림을 보낼 수 있는 MIB 파일과 적절한 설정과 함께 제공됩니다.

본 패키지에 포함된 모든 MIB의 목록은 [mib_yamls.txt 파일][4]을 참조하세요.

## 지원

지원 또는 기능 요청은 다음 채널을 통해 RapDev.io에 문의해 주세요.

- 이메일: [support@rapdev.io][7]
- 채팅: [rapdev.io][3]
- 전화: 855-857-0222

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [SNMP Trap으로 네트워크 성능 문제 모니터링 및 진단][8]

---
Made with ❤️ in Boston

*찾고 계신 통합 이 아닌가요? 조직에 꼭 필요한 기능이 없나요? RapDev에 [메시지](mailto:support@rapdev.io)를 남겨주시면 빌드해 드릴게요!!!*.

[1]: https://docs.datadoghq.com/ko/logs/guide/enrichment-tables
[2]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#log-message-remapper
[3]: https://www.rapdev.io/#Get-in-touch
[4]: https://files.rapdev.io/datadog/configs/mib_yamls.txt
[5]: mailto:sales@rapdev.io
[6]: https://mibs.observium.org
[7]: mailto:support@rapdev.io
[8]: https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/rapdev-snmp-trap-logs" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.