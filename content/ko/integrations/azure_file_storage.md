---
app_id: azure-filestorage
app_uuid: a84f1b3d-9675-4f48-9051-9156d8ad406e
assets:
  dashboards:
    azure_file_storage: assets/dashboards/azure_file_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_fileservices.file_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_fileservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 293
    source_type_name: Azure File Storage
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
git_integration_title: azure_file_storage
integration_id: azure-filestorage
integration_title: Azure File Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_file_storage
public_title: Azure File Storage
short_description: 주요 Azure File Storage 메트릭을 추적하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: 주요 Azure File Storage 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure File Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure File Storage는 업계 표준 프로토콜인 SMB(서버 메시지 블록)를 사용하여 액세스할 수 있는 클라우드에서 완전 관리형 파일 공유를 제공합니다.

Datadog Azure 통합을 사용하여 Azure File Storage에서 메트릭을 수집합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_file_storage" >}}


### 이벤트

Azure File Storage 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure File Storage 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_file_storage/azure_file_storage_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/