---
categories:
- azure
- cloud
- 데이터 스토어
dependencies: []
description: Azure Table Storage의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_table_storage/
draft: false
git_integration_title: azure_table_storage
has_logo: true
integration_id: azure-table-storage
integration_title: Microsoft Azure Table Storage
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_table_storage
public_title: Datadog-Microsoft Azure Table Storage 통합
short_description: Azure Table Storage의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Table Storage는 불완전하게 구조화된 데이터세트를 대량으로 사용해 빠르게 개발할 때 사용하는 NoSQL 키-값 저장소입니다.

Azure Table Storage 메트릭을 얻으면 다음을 할 수 있습니다.

- Table Storage의 성능 가시화
- Table Storage의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_table_storage" >}}


### 이벤트

Azure Table Storage 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Table Storage 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_table_storage/azure_table_storage_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/