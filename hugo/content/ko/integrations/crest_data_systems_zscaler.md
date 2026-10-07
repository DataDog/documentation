---
algolia:
  subcategory: Marketplace 통합
app_id: crest-data-systems-zscaler
app_uuid: d5380f02-9141-4dd3-8053-e13bb501b7e8
assets:
  dashboards:
    'Zscaler ZIA: Audit': assets/dashboards/crest_data_systems_zscaler_zia_audit.json
    'Zscaler ZIA: DNS': assets/dashboards/crest_data_systems_zscaler_zia_dns.json
    'Zscaler ZIA: Endpoint': assets/dashboards/crest_data_systems_zscaler_zia_endpoint.json
    'Zscaler ZIA: Firewall': assets/dashboards/crest_data_systems_zscaler_zia_firewall.json
    'Zscaler ZIA: Tunnel': assets/dashboards/crest_data_systems_zscaler_zia_tunnel.json
    'Zscaler ZIA: Web': assets/dashboards/crest_data_systems_zscaler_zia_web.json
    'Zscaler ZPA: App Connector': assets/dashboards/crest_data_systems_zscaler_zpa_app_connector.json
    'Zscaler ZPA: App Protection': assets/dashboards/crest_data_systems_zscaler_zpa_app_protection.json
    'Zscaler ZPA: Audit': assets/dashboards/crest_data_systems_zscaler_zpa_audit.json
    'Zscaler ZPA: Browser Access': assets/dashboards/crest_data_systems_zscaler_zpa_browser_access.json
    'Zscaler ZPA: Private Service Edge': assets/dashboards/crest_data_systems_zscaler_zpa_private_service_edge.json
    'Zscaler ZPA: User Activity': assets/dashboards/crest_data_systems_zscaler_zpa_user_activity.json
    'Zscaler ZPA: User Status': assets/dashboards/crest_data_systems_zscaler_zpa_user_status.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31633910
    source_type_name: crest_data_systems_zscaler
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- security
- 네트워크
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_zscaler
integration_id: crest-data-systems-zscaler
integration_title: Zscaler
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_zscaler
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: zscaler
  short_description: Zscaler 통합의 월 정액 요금
  unit_price: 995.0
public_title: Zscaler
short_description: Zscaler Private Access 및 Zscaler Internet Access를 모니터링하고 인사이트를
  확보하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Security
  - Category::Network
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Zscaler Private Access 및 Zscaler Internet Access를 모니터링하고 인사이트를 확보하세요.
  media:
  - caption: 'Zscaler ZIA: Audit'
    image_url: images/crest_data_systems_zscaler_zia_audit.png
    media_type: 이미지
  - caption: 'Zscaler ZIA: DNS'
    image_url: images/crest_data_systems_zscaler_zia_dns.png
    media_type: 이미지
  - caption: 'Zscaler ZIA: Endpoint'
    image_url: images/crest_data_systems_zscaler_zia_endpoint.png
    media_type: 이미지
  - caption: 'Zscaler ZIA: Web'
    image_url: images/crest_data_systems_zscaler_zia_web.png
    media_type: 이미지
  - caption: 'Zscaler ZPA: User-Status'
    image_url: images/crest_data_systems_zscaler_zpa_user_status.png
    media_type: 이미지
  - caption: 'Zscaler ZPA: Audit'
    image_url: images/crest_data_systems_zscaler_zpa_audit.png
    media_type: 이미지
  - caption: 'Zscaler ZPA: User Activity'
    image_url: images/crest_data_systems_zscaler_zpa_user_activity.png
    media_type: 이미지
  - caption: 'Zscaler ZPA: App Connector'
    image_url: images/crest_data_systems_zscaler_zpa_app_connector.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Zscaler
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Zscaler는 Zero Trust Exchange 플랫폼을 통해 고급 보안 기능을 제공하여 애플리케이션과 인터넷 리소스에 안전하게 접속할 수 있도록 지원합니다. 조직은 **Zscaler Private Access (ZPA)** 및 **Zscaler Internet Access (ZIA)**를 통해 안전하게 원격 연결을 진행하고 인터넷 트래픽 관리를 간소화할 수 있습니다. 

본 통합은 다음 로그 유형 및 하위 유형을 수집합니다.

| 유형                    | 설명                                                                 | SubType                                             |
| ----------------------- | --------------------------------------------------------------------------- | -------------------------------------------------- |
| ZPA: App Connector       | App Connector의 성능 및 가용성과 관련된 메트릭 및 상태 정보 | 메트릭, 상태                                     |
| ZPA: Private Service Edge| Private Service Edge의 성과 및 연결과 관련된 메트릭 및 상태 정보 | 메트릭, 상태                                     |
| ZPA: User                | 최종 사용자 요청, 가용성, 연결 상태에 관한 정보       | 활동, 상태                                    |
| ZPA: Browser Access      | Browser Access 활동에 관한 HTTP 로그 세부 정보                              | 액세스 로그                                         |
| ZPA: Audit               | ZPA Admin Portal의 관리자 활동 전체에 관한 세션 정보        | 감사 로그                                          |
| ZPA: AppProtection       | AppProtection 정책 활동의 세부 사항                                  | AppProtection                                       |
| ZIA: Web                 | 웹 트래픽 및 액세스 관련 로그                                      | 웹 로그                                            |
| ZIA: Firewall            | 방화벽 활동을 자세히 설명하는 로그                                            | 방화벽 로그                                       |
| ZIA: DNS                 | DNS 쿼리 및 응답에 관한 정보                                 | DNS 로그                                            |
| ZIA: Tunnel              | 터널 활동 관련 로그                                             | 터널 로그                                         |
| ZIA: Audit               | 관리자 작업을 캡처하는 관리 감사 로그                           | 감사 로그                                          |
| ZIA: DLP                 | 정책 위반을 캡처하는 데이터 손실 방지 로그                       | 엔드포인트 DLP 로그                                            |

이 통합에는 모니터링 및 보안을 강화할 수 있도록 즉시 사용 가능한 다음 [Datadog Cloud SIEM ][12] 탐지 규칙을 포함합니다.

1. Zscaler ZPA: App Connector 인증 실패 이상
2. Zscaler ZPA: 새로운 위치 또는 의심되는 위치의 활동 탐지
3. Zscaler ZPA: 적격 도메인 이름 오류 이상
4. Zscaler ZPA: 사용자 인증 실패 이상
5. Zscaler ZIA: 심각도가 High, Critical, 또는 Emergency인 DLP 정책 위반
6. Zscaler ZIA: 1시간 후 면제 zdp 모드의 DLP 알림
7. Zscaler ZIA: 비정상적인 인증 실패 횟수
8. Zscaler ZIA: 단일 사용자의 여러 정책 위반

> **참고**: 기본 제공 탐지 규칙을 사용하려면 Datadog에 관련 통합 서비스를 설치해야 하며 Cloud SIEM을 활성화해야 합니다.

## 지원

지원이나 기능 요청이 있을 경우 다음 채널로 Crest Data에 연락하세요.

- 지원 이메일: [datadog.integrations@crestdata.ai][7]
- 영업 이메일: [datadog-sales@crestdata.ai][8]
- 웹사이트: [crestdata.ai][9]
- FAQ: [Crest Data Datadog Marketplace 통합 FAQ][3]




[1]: https://docs.datadoghq.com/ko/agent/?tab=Linux
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Zscaler.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai
[9]: https://www.crestdata.ai/
[10]: https://help.zscaler.com/zpa/configuring-log-receiver
[11]: https://help.zscaler.com/zia/documentation-knowledgebase/analytics/nss/nss-feeds
[12]: https://docs.datadoghq.com/ko/security/cloud_siem/
---
이 애플리케이션은 Datadog 마켓플레이스를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 사용하려면 <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-zscaler" target="_blank">마켓플레이스에서 이 애플리케이션을 구입하세요</a>.