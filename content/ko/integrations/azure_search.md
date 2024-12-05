---
categories:
- cloud
- azure
dependencies: []
description: Azure Cognitive Search의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/azure_search/
draft: false
git_integration_title: azure_search
has_logo: true
integration_id: azure-search
integration_title: Microsoft Azure Cognitive Search
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_search
public_title: Datadog-Microsoft Azure Cognitive Search 통합
short_description: Azure Cognitive Search의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Cognitive Search는 search-as-a-service 클라우드 솔루션입니다. 이 솔루션은 개발자에게 웹, 모바일, 엔터프라이즈 애플리케이션에서 여러 종류의 프라이빗한 컨텐츠를 풍부하게 검색할 수 있도록 API와 도구를 제공합니다.

Datadog Azure 통합을 사용해 Azure Cognitive Search 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_search" >}}


### 이벤트

Azure Cognitive Search 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사

Azure Cognitive Search 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_search/azure_search_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/