---
app_id: azure-db-for-postgresql
app_uuid: 6306388c-c569-497a-ba36-c584c74cfffc
assets:
  dashboards:
    azure_db_for_postgresql: assets/dashboards/azure_db_for_postgresql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dbforpostgresql_servers.storage_used
      - azure.dbforpostgresql_flexibleservers.cpu_percent
      metadata_path: metadata.csv
      prefix: azure.dbforpostgresql
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 223
    source_type_name: Azure DB for PostgreSQL
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
git_integration_title: azure_db_for_postgresql
integration_id: azure-db-for-postgresql
integration_title: Azure DB for PostgreSQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_postgresql
public_title: Azure DB for PostgreSQL
short_description: Azure DB for PostgreSQL의 핵심 메트릭 추적하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure DB for PostgreSQL의 핵심 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB for PostgreSQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Database for PostgreSQL은 완전관리형 엔터프라이즈 지원 커뮤니티 PostgreSQL 데이터베이스를 제공하는 서비스입니다.

Azure DB for PostgreSQL 메트릭을 얻으면 다음을 할 수 있습니다.

- PostgreSQL 데이터베이스의 성능을 가시화
- PostgreSQL 데이터베이스의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-db-for-postgresql" >}}


### 이벤트

Azure DB for PostgreSQL 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure DB for PostgreSQL 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_postgresql/azure_db_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/