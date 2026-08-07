---
app_id: azure-eventgrid
app_uuid: 55b5c82c-bba0-4bb5-b9a7-50096b97f0bb
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.eventgrid_topics.publish_success_count
      metadata_path: metadata.csv
      prefix: azure.eventgrid
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 291
    source_type_name: Azure Event Grid
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
git_integration_title: azure_event_grid
integration_id: azure-eventgrid
integration_title: Azure Event Grid
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_event_grid
public_title: Azure Event Grid
short_description: 주요 Azure Event Grid 메트릭을 추적하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: 주요 Azure Event Grid 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Event Grid
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Event Grid는 게시-구독 모델을 사용하여 균일한 이벤트 소비를 가능케 하는 완전 관리 지능형 이벤트 라우팅 서비스입니다.

Datadog Azure 통합을 사용해 Azure Event Grid 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{ get-metrics-from-git "azure-eventgrid" }}


### 이벤트

Azure Event Grid 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure Event Grid 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_grid/azure_event_grid_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/