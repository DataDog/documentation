---
aliases:
- /ko/integrations/azure_customerinsights
categories:
- cloud
- azure
custom_kind: 통합
dependencies: []
description: Azure Customer Insights의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_customer_insights/
draft: false
git_integration_title: azure_customer_insights
has_logo: true
integration_id: azure-customerinsights
integration_title: Microsoft Azure Customer Insights
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_customer_insights
public_title: Datadog-Microsoft Azure Customer Insights 통합
short_description: Azure Customer Insights의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Customer Insights는 어떤 규모의 조직이든 다양한 데이터 세트 속에서 인사이트와 지식을 추출하여 고객을 360° 각도에서 전체적으로 파악하도록 도와줍니다.

Datadog Azure 통합을 사용해 Customer Insights 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_customer_insights" >}}


### 이벤트

Customer Insights 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Customer Insights 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_customer_insights/azure_customer_insights_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/