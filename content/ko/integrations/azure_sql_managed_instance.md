---
categories:
- cloud
- azure
dependencies: []
description: Azure SQL Managed Instance의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_sql_managed_instance/
draft: false
git_integration_title: azure_sql_managed_instance
has_logo: true
integration_id: azure-sql-managed-instance
integration_title: Microsoft Azure SQL Managed Instance
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_sql_managed_instance
public_title: Datadog-Microsoft Azure SQL Managed Instance 통합
short_description: Azure SQL Managed Instance의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure SQL Managed Instance는 규모 조정이 가능한 클라우드 데이터베이스 서비스입니다. 이 서비스는 폭넓은 SQL Server 엔진 호환성에 완전관리형 PaaS(Platform as a service)의 이점을 더했습니다.

Datadog Azure 통합을 사용해 SQL Managed Instance 메트릭을 수집할 수 있습니다.

## 설정
### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터
### 메트릭
{{< get-metrics-from-git "azure_sql_managed_instance" >}}


### 이벤트
Azure SQL Managed Instance 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사
Azure SQL Managed Instance 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

- [https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/][4]

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_managed_instance/azure_sql_managed_instance_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/