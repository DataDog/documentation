---
app_id: azure-sql-managed-instance
app_uuid: 877e3fb4-8192-4f54-942d-0d11363ab525
assets:
  dashboards:
    azure-sql-managed-instance-overview: assets/dashboards/azure_sql_managed_instance_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.sql_managedinstances.count
      metadata_path: metadata.csv
      prefix: azure.sql_managedinstances
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39934830
    source_type_name: Azure SQL 관리 인스턴스
  monitors:
    Azure SQL Managed Instance CPU Utilization: assets/monitors/azure_sql_managed_instance_cpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- 메트릭
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_sql_managed_instance
integration_id: azure-sql-managed-instance
integration_title: Azure SQL 관리 인스턴스
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_sql_managed_instance
public_title: Azure SQL 관리 인스턴스
short_description: SQL 관리 인스턴스 통합을 사용해 SQL 관리 인스턴스 데이터베이스의 사용 및 활동을 추적할 수 있습니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: SQL 관리 인스턴스 통합을 사용해 SQL 관리 인스턴스 데이터베이스의 사용 및 활동을 추적할 수 있습니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure SQL 관리 인스턴스
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

Azure SQL 관리 인스턴스는 엔터프라이즈 SQL 서버 데이터 엔진의 완전관리형 버전입니다. SQL 관리 인스턴스 통합을 사용해 SQL 관리 인스턴스 데이터베이스의 사용 및 활동을 추적할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-sql-managed-instance" >}}


### 서비스 점검

Azure SQL 관리 인스턴스에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Azure SQL 관리 인스턴스에는 이벤트가 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog 데이터베이스 모니터링으로 SQL 서버 성능 최적화][4]
- [데이터베이스 모니터링 설명서][5]
- [데이터베이스 모니터링 권장 사항을 통해 데이터베이스 호스트 및 쿼리 성능 향상][6]

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/
[5]: https://docs.datadoghq.com/ko/database_monitoring/
[6]: https://www.datadoghq.com/blog/database-monitoring-recommendations/