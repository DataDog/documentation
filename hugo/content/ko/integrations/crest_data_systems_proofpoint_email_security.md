---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-proofpoint-email-security
app_uuid: 4e419332-b689-486b-ae36-09abecd41a9e
assets:
  dashboards:
    Crest Proofpoint - Isolation Dashboard: assets/dashboards/cds_proofpoint_isolation.json
    Crest Proofpoint - TAP Dashboard: assets/dashboards/cds_proofpoint_tap.json
    Crest Proofpoint On Demand - Email Security: assets/dashboards/cds_proofpoint_on_demand_email_security.json
    Crest Proofpoint On Demand - TLS Overview: assets/dashboards/cds_proofpoint_on_demand_tls_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.proofpoint.tap.messages_blocked.spamScore
      metadata_path: metadata.csv
      prefix: cds.proofpoint
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10379
    source_type_name: crest_data_systems_proofpoint_email_security
  monitors:
    Proofpoint Email Security Service Check Monitor: assets/monitors/cds_service_check_monitor.json
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- 데이터 스토어
- 이벤트 관리
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_proofpoint_email_security
integration_id: crest-data-systems-proofpoint-email-security
integration_title: Proofpoint 이메일 보안
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_proofpoint_email_security
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems_proofpoint_email_security
  product_id: proofpoint-email-security
  short_description: 등록된 Proofpoint 사용자당
  tag: users
  unit_label: 등록된 Proofpoint 사용자
  unit_price: 1.0
public_title: Proofpoint 이메일 보안
short_description: Proofpoint TAP, Proofpoint On-Demand, Proofpoint Isolation 모니터링
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
  - 카테고리::데이터 저장
  - '카테고리:: 이벤트 관리'
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  - 제출한 데이터 유형::로그
  configuration: README.md#Setup
  description: Proofpoint TAP, Proofpoint On-Demand, Proofpoint Isolation 모니터링
  media:
  - caption: Crest Proofpoint - TAP 대시보드
    image_url: images/crest_data_systems_proofpoint_tap_1.png
    media_type: image
  - caption: Crest Proofpoint - TAP 대시보드
    image_url: images/crest_data_systems_proofpoint_tap_2.png
    media_type: image
  - caption: Crest Proofpoint On Demand - 이메일 보안
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_1.png
    media_type: image
  - caption: Crest Proofpoint On Demand - 이메일 보안
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_2.png
    media_type: image
  - caption: Crest Proofpoint On Demand - 이메일 보안
    image_url: images/crest_data_systems_proofpoint_on_demand_email_security_3.png
    media_type: image
  - caption: Crest Proofpoint On Demand - TLS 개요
    image_url: images/crest_data_systems_proofpoint_on_demand_tls_1.png
    media_type: image
  - caption: Crest Proofpoint On Demand - TLS 개요
    image_url: images/crest_data_systems_proofpoint_on_demand_tls_2.png
    media_type: image
  - caption: Crest Proofpoint - 격리
    image_url: images/crest_data_systems_proofpoint_isolation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Proofpoint 이메일 보안
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Proofpoint 이메일 보안 통합은 [Proofpoint TAP][7], [Proofpoint on Demand][8], [Proofpoint Isolation][9]을 모니터링 및 시각화합니다.

### Proofpoint Targeted Attack Protection(TAP)

**Proofpoint Targeted Attack Protection(TAP)**는 오늘날 진화하는 보안 환경에서 표적 공격으로부터 조직을 보호하기 위해 설계된 고급 위협 방어 솔루션입니다. TAP는 첨단 기술, 위협 인텔리전스, 실시간 분석을 조합하여 고급 멀웨어, 피싱 공격, 소셜 엔지니어링 기법을 포함한 이메일 기반 위협에 대한 포괄적 보호 기능을 제공합니다. 또한 이메일로 공격하는 지능형 위협을 탐지, 완화, 차단하도록 도와드립니다. 본 솔루션은 악성 첨부 파일과 URL로 멀웨어를 설치하거나 사용자를 속여 비밀번호 및 기타 민감한 정보를 공유하도록 유도하는 공격을 탐지합니다.

### Proofpoint on Demand

**Proofpoint on Demand**는 다양한 사이버 위협으로부터 비즈니스를 보호하기 위해 설계된 클라우드 기반 종합 사이버 보안 플랫폼입니다. 이메일 보안, 위협 인텔리전스, 정보 보호, 규정 준수 솔루션 등의 다양한 서비스를 제공합니다. 이를 통해 정보에 입각한 결정을 내리고 보안 태세를 전반을 강화하는 데 필요한 조치를 취할 수 있습니다. 아울러 본 앱은 통신 암호화 상태에 관해 통찰력 있는 세부 정보를 제공하여 데이터 보호 조치에 관한 이해를 제고합니다.

#### Proofpoint on Demand 주요 기능

* **이메일 트래픽 모니터링:** 메시지 플로를 모니터링하여 스팸, 피싱 시도, 기타 이메일 관련 위협을 사전에 식별 및 방지합니다.
* **규정 준수 모니터링:** 이메일 커뮤니케이션을 모니터링하여 Data Loss Prevention(DLP), Domain-based Message Authentication, Reporting, and Conformance(DMARC) 및 기타 해당 지침 등의 내부 정책 및 외부 규정을 준수하는지 확인합니다.
* **인시던트 조사:** 이메일 보안 및 규정 준수 데이터를 활용하여 잠재적 보안 인시던트에 철저한 조사를 실행합니다. 보안 위협 출처를 추적하고 그 영향을 평가하는 작업이 포함됩니다.
* **사용자 행동 모니터링:** 이메일 관련 행동을 면밀히 관찰하여 내부자 위협이나 무단 액세스 시도 징후를 감지합니다.

### Proofpoint Isolation

**Proofpoint Isolation**는 잠재적 악성 콘텐츠로부터 사용자를 격리 및 보호하여 사이버 보안을 강화하도록 설계되었습니다. 사용자가 유해하거나 의심스러운 콘텐츠와 직접 상호 작용하는 것을 방지하여 사이버 위협의 위험을 줄이는 것이 주요 목표입니다.

본 통합은 다음을 모니터링합니다.
- `Messages Blocked and Delivered` 및 `Clicks Blocked and Permitted`는 Proofpoint TAP 서버에서 처리됩니다.
- Proofpoint on Demand Log Service를 데이터 소스로 사용하고 보안 WebSocket(WSS) 프로토콜을 활용하는 메시지 유형 데이터입니다.
- 사용자의 웹 브라우징 및 이메일 활동은 Proofpoint Isolation Server에서 관리합니다.


## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 고객지원: [datadog.integrations@crestdata.ai][5]
- 세일즈: [datadog-sales@crestdata.ai][6]
- 웹사이트: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][14]

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://www.proofpoint.com/us/products/advanced-threat-protection/targeted-attack-protection
[8]: https://www.proofpoint.com/us/products/email-security-and-protection/email-protection
[9]: https://www.proofpoint.com/us/products/cloud-security/isolation
[10]: https://proofpointisolation.com
[11]: https://docs.crestdata.ai/datadog-integrations-readme/Proofpoint_Email_Security.pdf
[12]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[13]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[14]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
이 애플리케이션은 Datadog Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-proofpoint-email-security" target="_blank">Marketplace에서 애플리케이션을 구매하세요</a>.