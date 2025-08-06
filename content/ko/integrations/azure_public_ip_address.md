---
app_id: azure-publicipaddress
app_uuid: a829d4e6-53b4-4cd2-8e83-941066bca46b
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.network_publicipaddresses.byte_count
      metadata_path: metadata.csv
      prefix: azure.network_publicipaddresses
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 299
    source_type_name: Azure Public IP Address
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
git_integration_title: azure_public_ip_address
integration_id: azure-publicipaddress
integration_title: Azure Public IP Address
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_public_ip_address
public_title: Azure Public IP Address
short_description: Azure Public IP Address의 핵심 메트릭 추적하기.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Public IP Address의 핵심 메트릭 추적하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Public IP Address
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Public IP Address가 리소스에 할당되면 인터넷과의 인바운드 통신과 아웃바운드 연결이 가능해집니다.

Datadog Azure 통합을 사용해 Azure Public IP Address 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_public_ip_address" >}}


### 이벤트

Azure Public IP Address 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Public IP Address 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_public_ip_address/azure_public_ip_address_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/