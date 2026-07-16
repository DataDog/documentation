---
app_id: azure-appserviceenvironment
app_uuid: 918d0126-a4b0-4d8d-b38b-718c6115938d
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.web_hostingenvironments_multirolepools.cpu_percentage
      metadata_path: metadata.csv
      prefix: azure.web_hostingenv
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 278
    source_type_name: Azure App Service 환경
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
git_integration_title: azure_app_service_environment
integration_id: azure-appserviceenvironment
integration_title: Azure App Service 환경
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_app_service_environment
public_title: Azure App Service 환경
short_description: 주요 Azure App Service Environment 메트릭을 추적하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: 주요 Azure App Service Environment 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure App Service 환경
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure App Service Environment는 대규모로 App Service 앱을 안전하게 실행하도록 완전히 격리된 전용 환경을 제공하는 Azure App Service 기능입니다.

Datadog Azure 통합을 사용하여 Azure App Service Environment에서 메트릭을 수집합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{ get-metrics-from-git "azure-appserviceenvironment" }}


### 이벤트

Azure App Service Environment 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure App Service Environment 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_service_environment/azure_app_service_environment_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/