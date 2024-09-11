---
algolia:
  subcategory: Marketplace 통합
app_id: agentil-software-sap-netweaver
app_uuid: 5b070928-c509-4826-93db-8b5e9206c355
assets:
  dashboards:
    ABAP transactions response times: assets/dashboards/agentil_software_abap_transactions_response_times.json
    SAP ABAP Transactions Details: assets/dashboards/agentil_software_abap_transactions_details.json
    SAP Netweaver overview: assets/dashboards/agentil_software_sap_global_overview.json
    SAP Netweaver system dashboard: assets/dashboards/agentil_software_sap_netweaver_system.json
    SAP System IDOCS: assets/dashboards/agentil_software_system_idocs.json
    SAP System Shortdumps: assets/dashboards/agentil_software_system_shortdumps.json
    SAP jobs details: assets/dashboards/agentil_software_sap_jobs_details.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_netweaver.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10218
    source_type_name: AGENTIL Software SAP NetWeaver
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_netweaver
integration_id: agentil-software-sap-netweaver
integration_title: SAP S/4HANA & NetWeaver
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_netweaver
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_netweaver.system
  product_id: sap-netweaver
  short_description: 모니터링되는 SAP 시스템별로 라이선스 1개 카운팅(SID로 식별)
  tag: uri
  unit_label: SAP 시스템(SID)
  unit_price: 250
public_title: SAP S/4HANA & NetWeaver
short_description: S/4HANA와 NetWeaver 시스템의 ABAP 및 J2EE 스택 모니터링
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - 제출한 데이터 유형::메트릭
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: S/4HANA와 NetWeaver 시스템의 ABAP 및 J2EE 스택 모니터링
  media:
  - caption: SAP NetWeaver 글로벌 개요
    image_url: images/dashboard_overview.png
    media_type: image
  - caption: SAP NetWeaver 시스템 대시보드
    image_url: images/dashboard_netweaver.png
    media_type: image
  - caption: SAP NetWeaver 작업 로그
    image_url: images/logs_example_jobs.png
    media_type: image
  - caption: SAP ABAP 트랜잭션 시간
    image_url: images/abap_transaction_response_time.png
    media_type: image
  - caption: SAP ABAP 트랜잭션 상세
    image_url: images/abap_transaction_details.png
    media_type: image
  - caption: SAP IDOC 메시지
    image_url: images/abap_idocs.png
    media_type: image
  - caption: SAP 배경 작업
    image_url: images/abap_background_jobs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP S/4HANA & NetWeaver
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요
SAP NetWeaver 통합은 SAP **NetWeaver**와 **S/4HANA**의 ABAP 및 J2EE 스택을 모니터링합니다.

**에이전트 없는** 원격 연결과 사전 구성된 템플릿을 사용하기 때문에 **몇 분** 안에 통합을 실행할 수 있습니다.

모니터링은 AGENTIL Software의 [Pro.Monitor][1] 플랫폼으로 실행됩니다. 이 플랫폼은 SAP 시스템에서 필요한 모듈과 트랜잭션을 기본 기능으로 제공합니다. 여기에는 **쇼트 덤프, SAP 작업, 트랜잭션 응답 시간, 작업 프로세스 등**이 있습니다.

이 통합에서는 실시간으로 데이터를 수집 및 분석하고 메트릭과 실행 가능한 이벤트를 제공합니다. Pro.Monitor에서 구성하거나 메트릭에서 바로 Datadog 모니터를 생성하여 알림을 세부 조정할 수 있습니다.

### 모니터링 중인 모듈

- ABAP 인스턴스 메모리
- ABAP 인스턴스 응답 시간
- ABAP 락
- ABAP 파라미터
- ABAP 쇼트덤프
- 애플리케이션 로그
- 배치 인풋
- 인증서
- 커스텀 CCMS 모니터링
- Database 백업
- Database 규모
- DB 독점 락
- 디스패처 대기열
- ICM 상태 및 사용량
- IDOC 교환 모니터링
- 인스턴스 가용
- 숫자 범위
- PI/XI 메시지 ABAP
- 프로세스 체인 모니터링
- QRFC/TRFC
- 실시간 데이터
- RFC 대상 가용
- SAP 버퍼
- SAP 클라이언트 변경 설정
- SAPconnect(SCOT/SOST)
- SAP 작업 모니터링
- SAP 트랜잭션 시간
- SAP 트랜스포트
- SAP 사용자
- 스풀
- 시스템 로그
- 업데이트 요청
- 업데이트 서비스
- 작업 프로세스

## 지원

지원이나 기능 요청을 하려면 다음 방법을 통해 GENTIL Software에 문의하세요.

- 이메일: [support@agentil-software.com][2]

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 Netweaver Agentil 제품을 구입해 SAP NetWeaver 모니터링하기][5]

*SAP이나 다른 플랫폼에 사용할 특정한 통합을 위해 신뢰할 만한 파트너를 찾고 있다면, 여기에서 찾으실 수 있습니다. 연락해 주세요.*

---
이 제품은 스이스 제네바에서 설계 및 개발되었습니다.

[1]: https://www.agentil-software.com
[2]: mailto:support@agentil-software.com
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.agentil-software.com/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
---
이 애플리케이션은 Marketplace에서 사용할 수 있고 Datadog Technology Partner에서 지원됩니다. 이 애플리케이션을 구입하려면 <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-netweaver" target="_blank">여기를 클릭</a>하세요.