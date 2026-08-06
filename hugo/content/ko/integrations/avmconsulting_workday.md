---
algolia:
  subcategory: Marketplace 통합
app_id: avmconsulting-workday
app_uuid: 72aa287e-21c7-473a-9efd-523d9687f7f1
assets:
  dashboards:
    AVM Consulting Workday Integrations Trends: assets/dashboards/workday_integrations_trends.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: avmconsulting.workday.total_jobs
      metadata_path: metadata.csv
      prefix: avmconsulting.workday.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10251
    source_type_name: AVM Consulting Workday
  monitors:
    AVM Consulting Workday Connection Status: assets/monitors/workday_connect.json
    AVM Consulting Workday Integration Status: assets/monitors/workday_integrations_monitor.json
author:
  homepage: https://avmconsulting.net/
  name: AVMConsulting
  sales_email: integrations@avmconsulting.net
  support_email: integrations@avmconsulting.net
  vendor_id: avmconsulting
categories:
- log collection
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avmconsulting_workday
integration_id: avmconsulting-workday
integration_title: Workday
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avmconsulting_workday
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.avmconsulting.workday
  product_id: workday
  short_description: 작업당 Workday 가격
  tag: job_id
  unit_label: Workday Job
  unit_price: 1
public_title: Workday
short_description: Workday 통합 상태에 대한 옵저버빌리티 제공
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Workday 통합 상태에 대한 옵저버빌리티 제공
  media:
  - caption: Workday 통합 개요
    image_url: images/Workday_integration_trends.png
    media_type: image
  - caption: Workday 통합 개요
    image_url: images/Workday_integration_trends_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Workday
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Workday 통합은 Workday의 통합 상태를 모니터링하여 전체 작업 실행, 실패한 작업 실행, 각 작업 실행 기간 등 작업 실행과 관련된 풍부한 메트릭을 제공합니다. 또한 이 통합은 작업 실행 로그를 검색하고 각 통합 상태에 대해 알리는 모니터를 제공합니다.

### 모니터

이 통합에는 다음과 같은 권장 모니터가 포함됩니다.

1. Workday에 연결합니다. 이는 Workday에 대한 연결을 모니터링합니다.
2. Workday 통합 상태는 통합별로 그룹화되어 마지막 Workday 통합 이벤트 상태를 확인하는 다중 모니터입니다.

### 대시보드

이 통합에는 Workday 작업 실행에 대한 시각적 요약과 각 Workday 통합에 대해 설정된 모니터 상태를 제공하는 **Workday Integrations Trends**라는 기본 대시보드가 ​​포함되어 있습니다.

### 로그 수집

이 통합은 Workday API를 사용하여 통합 실행을 위한 로그를 수집하고 Datadog REST API를 통해 해당 로그를 Datadog에 제출합니다. 실행 관련 태그는 해당 로그에 동적으로 할당됩니다.

## 지원

지원 또는 기능 요청은 다음 채널을 통해 AVM Consulting에 문의하세요.

 - 이메일: [integrations@avmconsulting.net][6] 
 - 전화: 855-AVM-0555 

### 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Marketplace에서 AVM Consulting 통합을 통해 Workday 모니터링][5]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/developers/guide/custom-python-package/?tab=linux
[5]: https://www.datadoghq.com/blog/workday-monitoring-with-avm-and-datadog/
[6]: mailto:integrations@avmconsulting.net

---
이 애플리케이션은 Marketplace를 통해 제공되며 Datadog 기술 파트너의 지원을 받습니다. 애플리케이션을 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/avmconsulting-workday" target="_blank">여기를 클릭하세요</a>.