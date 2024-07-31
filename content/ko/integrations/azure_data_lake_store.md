---
aliases:
- /ko/integrations/azure_datalakestore
categories:
- azure
- 클라우드
- 데이터 스토어
custom_kind: 통합
dependencies: []
description: Azure Data Lake Store의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_store/
draft: false
git_integration_title: azure_data_lake_store
has_logo: true
integration_id: azure-datalakestore
integration_title: Microsoft Azure Data Lake Store
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_lake_store
public_title: Datadog-Microsoft Azure Data Lake Store 통합
short_description: Azure Data Lake Store의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Data Lake Store는 빅 데이터 분석을 지원하는 무제한 데이터 레이크입니다.

Datadog Azure 통합을 사용해 Data Lake Store 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_data_lake_store" >}}


**참고**: 이 통합에서는 Data Lake Storage Gen 1 메트릭만 수집합니다. Data Lake Storage Gen 2는 Azure Blob Storage에서 구축되었기 때문에 Datadog의 Blob Storage 네임스페이스 `azure.storage_storageaccounts_blobservices.*` 아래에서 메트릭을 찾을 수 있습니다. 자세한 내용은 [Azure Data Lake Storage Gen 2][3] 설명서를 참고하세요.

### 이벤트

Azure Data Lake Store 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Data Lake Store 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_store/azure_data_lake_store_metadata.csv
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction
[4]: https://docs.datadoghq.com/ko/help/