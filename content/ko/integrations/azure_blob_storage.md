---
app_id: azure-blob-storage
app_uuid: 57ef97b4-651a-432d-9dc5-f56a94449d75
assets:
  dashboards:
    azure_blob_storage: assets/dashboards/azure_blob_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_blobservices.blob_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_blobservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 226
    source_type_name: Azure Blob Storage
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- 클라우드
- 데이터 저장소
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_blob_storage
integration_id: azure-blob-storage
integration_title: Azure Blob Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_blob_storage
public_title: Azure Blob Storage
short_description: Azure Blob Storage의 핵심 메트릭 추적하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Blob Storage의 핵심 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Blob Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Blob Storage는 클라우드용 Microsoft 개체 스토리지 솔루션입니다. 구조화되지 않은 데이터를 대량으로 저장하기 위해 Blog 스토리지를 최적화합니다. Azure Blob Storage에서 메트릭을 얻으면 다음을 할 수 있습니다.

- Blog Storage의 성능 가시화
- Blog Storage의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-blob-storage" >}}


### 이벤트

Azure Blob Storage 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Blob Storage 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/