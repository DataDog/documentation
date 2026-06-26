---
app_id: azure-db-for-mysql
app_uuid: e0f71c73-4783-4ada-8bcf-d7f870a7b933
assets:
  dashboards:
    azure_db_for_mysql: assets/dashboards/azure_db_for_mysql.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dbformysql_servers.storage_used
      - azure.dbformysql_flexibleservers.cpu_percent
      metadata_path: metadata.csv
      prefix: azure.dbformysql
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 225
    source_type_name: Azure DB for MySQL
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
git_integration_title: azure_db_for_mysql
integration_id: azure-db-for-mysql
integration_title: Azure DB for MySQL
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_db_for_mysql
public_title: Azure DB for MySQL
short_description: Azure DB for MySQL의 핵심 메트릭 추적하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure DB for MySQL의 핵심 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure DB for MySQL
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Database for MySQL는 완전관리형 엔터프라이즈 지원 커뮤니티 MySQL 데이터베이스를 제공하는 서비스입니다.

Azure Database for MySQL 메트릭을 얻으면 다음을 할 수 있습니다.

- MySQL 데이터베이스의 성능을 가시화
- MySQL 데이터베이스의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-db-for-mysql" >}}


### 이벤트

Azure Database for MySQL 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Database for MySQL 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mysql/azure_db_for_mysql_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/