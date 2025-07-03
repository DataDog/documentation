---
app_id: azure-load-balancer
app_uuid: a97ccfda-404d-4972-a995-63885350075a
assets:
  dashboards:
    azure_load_balancer: assets/dashboards/azure_load_balancer.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_loadbalancers.byte_count
      metadata_path: metadata.csv
      prefix: azure.network_loadbalancers
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 296
    source_type_name: Azure 로드 밸런서
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
git_integration_title: azure_load_balancer
integration_id: azure-load-balancer
integration_title: Azure 로드 밸런서
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_load_balancer
public_title: Azure 로드 밸런서
short_description: Azure Load Balancer의 핵심 메트릭 추적하기.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Load Balancer의 핵심 메트릭 추적하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure 로드 밸런서
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Load Balancer는 인바운드 및 아웃바운드 시나리오를 지원하고, 대기 시간은 낮추면서 처리량을 높이며, TCP와 UDP 애플리케이션에서 흐름을 수백만 개까지 규모 조정할 수 있습니다.

Datadog Azure 통합을 사용해 Azure Load Balancer 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-load-balancer" >}}


### 이벤트

Azure Load Balancer 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Load Balancer 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_load_balancer/azure_load_balancer_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/