---
aliases:
- /ko/integrations/azure_filestorage
categories:
- azure
- cloud
- 데이터 스토어
dependencies: []
description: 주요 Azure File Storage 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_file_storage/
draft: false
git_integration_title: azure_file_storage
has_logo: true
integration_id: azure-filestorage
integration_title: Microsoft Azure File Storage
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_file_storage
public_title: Datadog-Microsoft Azure File Storage 통합
short_description: 주요 Azure File Storage 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure File Storage는 업계 표준 프로토콜인 SMB(서버 메시지 블록)를 사용하여 액세스할 수 있는 클라우드에서 완전 관리형 파일 공유를 제공합니다.

Datadog Azure 통합을 사용하여 Azure File Storage에서 메트릭을 수집합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_file_storage" >}}


### 이벤트

Azure File Storage 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure File Storage 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_file_storage/azure_file_storage_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/