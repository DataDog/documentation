---
categories:
- azure
- cloud
- 데이터 스토어
custom_kind: 통합
dependencies: []
description: Azure Blob Storage의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_blob_storage/
draft: false
git_integration_title: azure_blob_storage
has_logo: true
integration_id: azure-blob-storage
integration_title: Microsoft Azure Blob Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_blob_storage
public_title: Datadog-Microsoft Azure Blob Storage 통합
short_description: Azure Blob Storage의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Blob Storage는 클라우드용 Microsoft 개체 스토리지 솔루션입니다. 구조화되지 않은 데이터를 대량으로 저장하기 위해 Blog 스토리지를 최적화합니다. Azure Blob Storage에서 메트릭을 얻으면 다음을 할 수 있습니다.

- Blog Storage의 성능 가시화
- Blog Storage의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_blob_storage" >}}


### 이벤트

Azure Blob Storage 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Blob Storage 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_blob_storage/azure_blob_storage_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/