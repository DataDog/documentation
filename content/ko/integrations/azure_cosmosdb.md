---
categories:
- azure
- cloud
- 데이터 스토어
custom_kind: 통합
dependencies: []
description: Azure Cosmos DB의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_cosmosdb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-cosmos-db-integrated-cache-datadog/
  tag: 블로그
  text: Datadog로 Azure Cosmos DB 통합 캐시 모니터링하기
git_integration_title: azure_cosmosdb
has_logo: true
integration_id: azure-cosmosdb
integration_title: Microsoft Azure Cosmos DB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_cosmosdb
public_title: Datadog-Microsoft Azure Cosmos DB 통합
short_description: Azure Cosmos DB의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Cosmos DB는 문서, 키-값, 와이드 컬럼, 그래프 데이터베이스를 지원하는 전역 분산형 멀티 모델 데이터베이스 서비스입니다.

Datadog Azure 통합을 사용해 Cosmos DB 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_cosmosdb" >}}


### 이벤트

Azure Cosmos DB 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Cosmos DB 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb/azure_cosmosdb_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/