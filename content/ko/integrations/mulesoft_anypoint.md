---
algolia:
  subcategory: Marketplace 통합
app_id: ioconnect-mulesoft-anypoint
app_uuid: fdb057e7-9be6-459f-ab3e-e745766e9158
assets:
  dashboards:
    'IO Connect Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Operations: RTF Infrastructure': assets/dashboards/rtf_infrastructure.json
    'IO Connect Operations: RTF Resource Allocation and Usage': assets/dashboards/rtf_resource_allocation.json
    'IO Connect Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
      metadata_path: metadata.csv
      prefix: ioconnect.mulesoft.anypoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10117
    source_type_name: IO Connect MuleSoft Anypoint
  monitors:
    Servers status: assets/monitors/server_disconnected_monitor.json
    '[CloudHub] Apps status': assets/monitors/cloudhub_app_stopped_monitor.json
    '[CloudHub] CPU load': assets/monitors/cloudhub_cpu_load_monitor.json
    '[CloudHub] Memory usage': assets/monitors/cloudhub_memory_usage_monitor.json
    '[CloudHub] Overload queue': assets/monitors/cloudhub_queue_overload_monitor.json
    '[On-Prem] Apps errors': assets/monitors/onpremise_app_error_monitor.json
    '[On-Prem] Apps status': assets/monitors/onpremise_app_stopped_monitor.json
    '[On-Prem] CPU load': assets/monitors/onpremise_cpu_load_monitor.json
    '[On-Prem] Memory usage': assets/monitors/onpremise_memory_usage_monitor.json
    '[RTF] App Status Pending': assets/monitors/rtf_application_status_pending.json
    '[RTF] App Status Stopped': assets/monitors/rtf_applications_has_been_stopped.json
    '[RTF] CPU Total Usage': assets/monitors/rtf_cpu_total_usage.json
    '[RTF] Memory Total Usage': assets/monitors/rtf_memory_usage.json
author:
  homepage: https://www.ioconnectservices.com/
  name: IO Connect Services
  sales_email: dmi@ioconnectservices.com
  support_email: support_ddp@ioconnectservices.com
  vendor_id: ioconnect
categories:
- cloud
- marketplace
- 네트워크
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mulesoft_anypoint
integration_id: ioconnect-mulesoft-anypoint
integration_title: Mule®
integration_version: ''
is_public: true
kind: 통합
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: mulesoft_anypoint
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: Datadog.marketplace.ioconnect.mulesoft_anypoint
  product_id: mulesoft-anypoint
  short_description: 프로덕션 vCore당 단가
  tag: vcoreid
  unit_label: 프로덕션 vCore
  unit_price: 200
public_title: Mule®
short_description: 'MuleSoft 제품에서 메트릭을 수집하여 Datadog로 업로드합니다. '
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - "\b카테고리::클라우드"
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: MuleSoft 제품에서 메트릭을 수집하여 Datadog로 업로드합니다.
  media:
  - caption: '운영: API 대시보드'
    image_url: images/dmi_ops_apis.png
    media_type: image
  - caption: '운영: 인프라스트럭처 대시보드'
    image_url: images/dmi_ops_infra.png
    media_type: image
  - caption: '운영: 리소스 할당 및 사용 대시보드'
    image_url: images/dmi_ops_allocation.png
    media_type: image
  - caption: '개발: 최적화 대시보드'
    image_url: images/dmi_dev_optimization.png
    media_type: image
  - caption: '경영진: 비용 최적화 대시보드'
    image_url: images/dmi_exec_cost_optimization.png
    media_type: image
  - caption: Mule 4용 Datadog 커넥터
    image_url: images/dmi_mule_connector.png
    media_type: image
  - caption: Datadog APM
    image_url: images/dmi_apm_traces.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mule®
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 개요

Datadog Mule® 통합은 에이전트에 기반한 통합으로, MuleSoft 제품에서 메트릭을 수집하여 Datadog에 업로드합니다.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_bundle.png" alt="Datadog Mule® 통합 번들" >}}

메트릭을 사용하여 기본 제공되는 대시보드 및 모니터를 활용하거나 자신만의 시각화를 만들 수 있습니다.

### **Mule 애플리케이션에 필요한 관측 가능성**

#### 운영(_인프라, API, 알림 및 리소스 할당 대시보드_)

- Mule 서버, 애플리케이션, API 및 기타 IT 인프라스트럭처의 상태를 모니터링합니다.
- Mule 인프라스트럭처에 대한 알림을 수신하고 시각화합니다.
- 조직의 Anypoint 플랫폼 리소스 할당에 대한 인사이트를 얻습니다.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_infra.png" alt="운영: 인프라스트럭처 대시보드" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_apis.png" alt="운영: API 대시보드" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_allocation.png" alt="운영: 리소스 할당 및 사용량 대시보드" >}}

#### 개발(_최적화 대시보드_)

- Mule 애플리케이션의 메모리, CPU 및 네트워크 문제를 빠르게 파악하세요.
- Mule 애플리케이션의 병목 현상을 찾아 성능을 최적화하세요.
- 트러블슈팅을 위해 Mule 4용 Datadog 커넥터를 사용하여 Mule 애플리케이션을 계측하세요.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_dev_optimization.png" alt="개발 최적화 대시보드" >}}

#### 경영진(_비용 최적화 및 다운타임 대시보드_)

- 사용 및 미사용 리소스를 기반으로 ROI를 분석하고 예측하세요.
- Mule 투자의 시스템 업타임 가시성을 확보하세요.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_exec_cost_optimization.png" alt="경영진: 비용 최적화 대시보드" >}}

#### 메트릭은 다음 MuleSoft 제품에서 수집됩니다.

- CloudHub, 런타임 패브릭 및 온프레미스 독립 실행형 서버용 Mule 런타임
- Anypoint 런타임 패브릭
- Anypoint API 관리자 및 API 애널리틱스
- Anypoint 교환
- Anypoint 액세스 관리
- 객체 저장소 v2

### **Datadog 뮬 4 커넥터로 Mule 애플리케이션을 계측하세요.**

{{< img src="marketplace/mulesoft_anypoint/images/dmi_mule_connector.png" alt="Mule 4용 Datadog 커넥터" >}}

Datadog 애플리케이션 성능 모니터링(APM) 추적과 함께 Mule 4용 Datadog 커넥터를 사용하면 즉시 사용 가능한 성능 대시보드를 통해 가시성을 확보할 수 있습니다.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_apm_traces.png" alt="Datadog 애플리케이션 성능 모니터링(APM)" >}}

스팬(span)을 사용하여 필요한 만큼 세부적으로 운영 흐름 성능을 측정하세요.

또한 트랜잭션 내에서 생성된 로그를 하나의 트레이스로 상호 연관시켜 성능 최적화 또는 트러블슈팅 범위의 범위를 좁힐 수 있습니다.

### **트러블슈팅**

도움이 필요하세요? support_ddp@ioconnectservices.com][9]로 문의하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mulesoft_anypoint" >}}


### 서비스 점검

mulesoft_anypoint에는 다음 서비스 점검이 포함되어 있습니다.

1. MuleSoft Anypoint. 이 서비스 점검은 메트릭이 MuleSoft Anypoint에서 올바르게 수집되었는지를 보여줍니다.
2. MuleSoft 통합 라이선스입니다. 이 서비스 점검은 Datadog에 대한 이 MuleSoft 통합의 라이선스가 유효한지 이해하는 데 도움을 줍니다.

### 이벤트

Datadog Mule® 통합은 어떤 이벤트도 포함하지 않습니다.

## 지원

지원 문의는 [support_ddp@ioconnectservices.com][9]로 IO Connect 서비스 지원팀에 문의하세요.

## IO Connect  서비스 소개

IO Connect Services는 정보 기술 컨설팅을 전문으로 하는 기업입니다. 클라우드 기술, 시스템 통합, 빅 데이터, 사이버 보안, 소프트웨어 엔지니어링을 전문으로 합니다. 북미, 유럽 및 라틴 아메리카 전역에서 서비스를 제공하고 있습니다. 본사는 뉴욕 도심에 위치하고 있으며 멕시코 과달라하라와 스페인 마드리드에도 지사를 두고 있습니다.

[https://www.ioconnectservices.com][10]에 방문하세요.

[1]: https://www.ioconnectservices.com
[2]: https://docs.datadoghq.com/ko/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/datadog_checks/mulesoft_anypoint/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/metadata.csv
[7]: https://docs.datadoghq.com/ko/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/ko/developers/guide/custom-python-package/?tab=linux
[9]: mailto:support_ddp@ioconnectservices.com
[10]: https://www.ioconnectservices.com

---
이 애플리케이션은 마켓플레이스를 통해 제공되며 Datadog 기술 파트너가 지원합니다. 이 애플리케이션을 구매하려면 <a href="https://app.datadoghq.com/marketplace/app/ioconnect-mulesoft-anypoint" target="_blank">여기를 클릭하세요</a>.