---
aliases:
- /ko/integrations/azure_datalakeanalytics
categories:
- azure
- 클라우드
- 데이터 스토어
custom_kind: 통합
dependencies: []
description: Azure Data Lake Analytics의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_data_lake_analytics/
draft: false
git_integration_title: azure_data_lake_analytics
has_logo: true
integration_id: azure-datalakeanalytics
integration_title: Microsoft Azure Data Lake Analytics
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_data_lake_analytics
public_title: Datadog-Microsoft Azure Data Lake Analytics 통합
short_description: Azure Data Lake Analytics의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Data Lake Analytics는 빅 데이터를 간소화해주는 온디맨드 분석 작업 서비스입니다.

Datadog Azure 통합을 사용해 Data Lake Analytics 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_data_lake_analytics" >}}


### 이벤트

Azure Data Lake Analytics 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Data Lake Analytics 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_lake_analytics/azure_data_lake_analytics_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/