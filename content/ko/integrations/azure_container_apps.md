---
app_id: azure-container-apps
app_uuid: 4cfaeef2-96d5-4497-be6a-8d06169e8ddb
assets:
  dashboards:
    azure_container_apps: assets/dashboards/azure_container_apps.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.app_containerapps.requests
      metadata_path: metadata.csv
      prefix: azure.app_containerapps
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 800
    source_type_name: Azure Container Apps
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- 클라우드
- 컨테이너
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_apps
integration_id: azure-container-apps
integration_title: Azure Container Apps
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_apps
public_title: Azure Container Apps
short_description: Track key Azure Container Apps metrics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: Track key Azure Container Apps metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Apps
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Container Apps를 사용하면 서버리스 컨테이너를 사용하여 최신 앱과 마이크로서비스를 구축하고 배포할 수 있습니다. 자세한 내용은 Azure Container Apps에 대한 [Microsoft 설명서][1]를 참조하세요.

## 설정

### 설치

아직 설정하지 않았다면 [Microsoft Azure 통합을 먼저][2] 설정하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-container-apps" >}}


### 이벤트

Azure Container Apps 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Azure Container Apps 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.microsoft.com/en-us/azure/container-apps/overview
[2]: https://docs.datadoghq.com/ko/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_apps/azure_container_apps_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/