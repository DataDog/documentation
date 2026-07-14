---
app_id: azure-usage-and-quotas
app_uuid: 26bac8f2-d8b8-4623-8d55-3b4a5cc94abd
assets:
  dashboards:
    azure_usage_and_quotas: assets/dashboards/azure_usage_and_quotas.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.usage.current_value
      metadata_path: metadata.csv
      prefix: azure.usage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 306
    source_type_name: Azure Usage and Quotas
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- 클라우드
- cost management
- 네트워크
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_usage_and_quotas
integration_id: azure-usage-and-quotas
integration_title: Azure Usage and Quotas
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_usage_and_quotas
public_title: Azure Usage and Quotas
short_description: Azure Usage and Quotas allows you to keep track of your current
  usages and limits.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Cost Management
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Usage and Quotas allows you to keep track of your current usages
    and limits.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Usage and Quotas
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure 구독에는 사전 구성된 리소스 제한량이 있습니다. 예상치 못한 프로비저닝 실패를 예방하려면 Azure 환경을 설계 및 규모 조정을 할 때 이 제한량을 염두에 두어야 합니다. Azure 사용량 및 할당량 메트릭을 얻으면 다음을 할 수 있습니다.

- 할당량 대비 컴퓨터, 네트워크, 스토리지 리소스 사용량 가시화
- 할당 제한량을 초과하지 않도록 하여 프로비저닝 실패 방지

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure-usage-and-quotas" >}}


### 이벤트

Azure Quota 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Quota 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/