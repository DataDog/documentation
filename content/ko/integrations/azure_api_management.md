---
app_id: azure-apimanagement
app_uuid: 122539f9-dc11-4099-9d64-cbd6f50159a5
assets:
  dashboards:
    azure_api_management: assets/dashboards/azure_api_management.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.apimanagement_service.capacity
      metadata_path: metadata.csv
      prefix: azure.apimanagement_service
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 277
    source_type_name: Azure API Management
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
git_integration_title: azure_api_management
integration_id: azure-apimanagement
integration_title: Azure API Management
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_api_management
public_title: Azure API Management
short_description: 주요 Azure API Management 메트릭을 추적하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: 주요 Azure API Management 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure API Management
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure API Management는 고객이 API를 게시, 보호, 변환, 유지 관리 및 모니터링할 수 있는 완전 관리형 서비스입니다.

Datadog Azure 통합을 사용하여 Azure API Management에서 메트릭을 수집합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_api_management" >}}


### 이벤트

Azure API Management 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure API Management 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_api_management/azure_api_management_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/