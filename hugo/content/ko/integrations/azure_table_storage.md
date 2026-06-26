---
app_id: azure-table-storage
app_uuid: 0d649e43-2cb7-4706-8d4b-3d4156c212f1
assets:
  dashboards:
    azure_table_storage: assets/dashboards/azure_table_storage.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.storage_storageaccounts_tableservices.table_count
      metadata_path: metadata.csv
      prefix: azure.storage_storageaccounts_tableservices
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 222
    source_type_name: Azure Table Storage
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
git_integration_title: azure_table_storage
integration_id: azure-table-storage
integration_title: Azure Table Storage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_table_storage
public_title: Azure Table Storage
short_description: Azure Table Storage의 핵심 메트릭 추적하기.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Table Storage의 핵심 메트릭 추적하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Table Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Table Storage는 불완전하게 구조화된 데이터세트를 대량으로 사용해 빠르게 개발할 때 사용하는 NoSQL 키-값 저장소입니다.

Azure Table Storage 메트릭을 얻으면 다음을 할 수 있습니다.

- Table Storage의 성능 가시화
- Table Storage의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-table-storage" >}}


### 이벤트

Azure Table Storage 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Table Storage 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/