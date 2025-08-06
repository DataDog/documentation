---
app_id: azure-analysisservices
app_uuid: 1705f0be-a2cb-4ebe-83f4-edc42bf735f6
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.analysisservices_servers.command_pool_job_queue_length
      metadata_path: metadata.csv
      prefix: azure.analysisservices_servers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 276
    source_type_name: Azure Analysis Services
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- azure
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_analysis_services
integration_id: azure-analysisservices
integration_title: Azure Analysis Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_analysis_services
public_title: Azure Analysis Services
short_description: 주요 Azure Analysis Services 메트릭을 추적하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: 주요 Azure Analysis Services 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Analysis Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Analysis Services는 클라우드에서 엔터프라이즈급 데이터 모델을 제공하는 완전 관리형 PaaS(Platform as a Service)입니다.

Datadog Azure 통합을 사용하여 Azure Analysis Services에서 메트릭을 수집합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_analysis_services" >}}


### 이벤트

Azure Analysis Services 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure Analysis Services 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_analysis_services/azure_analysis_services_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/