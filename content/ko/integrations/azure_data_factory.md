---
app_id: azure-datafactory
app_uuid: b85b780d-5e7f-4406-b2e6-d958445cb4f6
assets:
  dashboards:
    azure_data_factory: assets/dashboards/azure_data_factory.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.datafactory_factories.integration_runtime_available_memory
      - azure.datafactory_factories.trigger_succeeded_runs
      - azure.datafactory_factories.activity_succeeded_runs
      - azure.datafactory_factories.pipeline_succeeded_runs
      metadata_path: metadata.csv
      prefix: azure.datafactory_factories
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 287
    source_type_name: Azure Data Factory
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- 클라우드
- 데이터 저장소
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_data_factory
integration_id: azure-datafactory
integration_title: Azure Data Factory
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_data_factory
public_title: Azure Data Factory
short_description: Azure Data Factory의 핵심 메트릭 추적하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Data Factory의 핵심 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Data Factory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Data Factory는 데이터 저장, 이동, 처리 서비스를 자동화된 파이프라인으로 구성할 수 있도록 도와주는 클라우드 데이터 통합 서비스입니다.

Datadog Azure 통합을 사용해 Data Factory 메트릭을 수집할 수 있습니다.

## 설정

### 설치

If you haven't already, set up the [Microsoft Azure integration][1]. No additional installation steps are required.

## 수집한 데이터

### 메트릭
{{ get-metrics-from-git "azure-datafactory" }}


### 이벤트

Azure Data Factory 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Data Factory 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_factory/azure_data_factory_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/