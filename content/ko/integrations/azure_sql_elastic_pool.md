---
categories:
- azure
- cloud
- data stores
- provisioning
dependencies: []
description: Azure SQL Elastic Pool의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/
draft: false
git_integration_title: azure_sql_elastic_pool
has_logo: true
integration_id: azure-sql-elastic-pool
integration_title: Microsoft Azure SQL Elastic Pool
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_sql_elastic_pool
public_title: Datadog-Microsoft Azure SQL Elastic Pool 통합
short_description: Azure SQL Elastic Pool의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Elastic Pool은 효과적인 비용으로 다양한 데이터베이스의 성능을 관리할 수 있는 간단한 솔루션입니다.

Azure SQL Elastic Pool 메트릭을 얻으면 다음을 할 수 있습니다.

- SQL Elastic Pools의 성능을 가시화
- SQL Elastic Pools의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_sql_elastic_pool" >}}


### 이벤트

Azure SQL Elastic Pools 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure SQL Elastic Pools 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_elastic_pool/azure_sql_elastic_pool_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/