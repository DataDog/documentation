---
app_id: azure-cognitiveservices
app_uuid: 0d77c8ca-d9b6-46a5-925e-c942e00425a2
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.cognitiveservices_accounts.total_calls
      metadata_path: metadata.csv
      prefix: azure.cognitiveservices_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 282
    source_type_name: Azure Cognitive Services
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- azure
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_cognitive_services
integration_id: azure-cognitiveservices
integration_title: Azure Cognitive Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_cognitive_services
public_title: Azure Cognitive Services
short_description: Azure Cognitive Services의 핵심 메트릭 추적하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Cognitive Services의 핵심 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Cognitive Services
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Cognitive Services는 AI나 데이터 과학 기술 및 지식 없이도 개발자가 지능적인 애플리케이션을 개발할 수 있도록 도와주는 서비스와 API, SDK입니다.

Datadog Azure 통합을 사용해 Azure Cognitive Services 메트릭을 수집할 수 있습니다.

## 설정

### 설치

If you haven't already, set up the [Microsoft Azure integration][1]. No additional installation are required.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_cognitive_services" >}}


### 이벤트

Azure Cognitive Services 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Cognitive Services 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cognitive_services/azure_cognitive_services_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/