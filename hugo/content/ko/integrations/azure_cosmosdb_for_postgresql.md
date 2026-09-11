---
aliases:
- /ko/integrations/azure_cosmosdbforpostgresql
categories:
- azure
- cloud
- 데이터 스토어
custom_kind: integration
dependencies: []
description: 주요 Azure Cosmos DB for PostgreSQL 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_cosmosdb_for_postgresql/
draft: false
git_integration_title: azure_cosmosdb_for_postgresql
has_logo: true
integration_id: azure-cosmosdb-for-postgresql
integration_title: Microsoft Azure Cosmos DB for PostgreSQL
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_cosmosdb_for_postgresql
public_title: Datadog-Microsoft Azure Cosmos DB for PostgreSQL Integration
short_description: 주요 Azure Cosmos DB for PostgreSQL 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Cosmos DB for PostgreSQL은 "분산 테이블" 기능으로 확장된 PostgreSQL이며, 이를 통해 확장성이 뛰어난 관계형 애플리케이션을 구축할 수 있습니다. PostgreSQL에서와 동일한 방식으로 단일 노드 클러스터에서 앱 구축을 시작해 보세요. 앱의 확장성 및 성능 요구 사항이 증가함에 따라 테이블을 투명하게 배포하여 여러 노드로 원활하게 확장할 수 있습니다.

Datadog Azure 통합을 사용하여 Azure Cosmos DB for PostgreSQL에 대한 메트릭 및 로그를 수집합니다. 인사이트를 얻기 위해 위해 즉시 사용 가능한 대시보드를 활용할 수도 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-cosmosdb-for-postgresql" >}}


### 이벤트

Azure Cosmos DB for PostgreSQL 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Azure Cosmos DB for PostgreSQL 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb_for_postgresql/azure_cosmosdb_for_postgresql_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/