---
app_id: azure-automation
app_uuid: 4df0e16c-2c9b-472a-962a-12b6d4e3f7c8
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.automation_automationaccounts.total_job
      metadata_path: metadata.csv
      prefix: azure.automation_automationaccounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 281
    source_type_name: Azure Automation
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 자동화
- azure
- 클라우드
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_automation
integration_id: azure-automation
integration_title: Azure Automation
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_automation
public_title: Azure Automation
short_description: Azure Automation의 핵심 메트릭 추적하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::자동화
  - Category::Azure
  - Category::Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Automation의 핵심 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Automation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Automation은 Azure와 Azure 외 환경 전반에 일관적인 관리가 가능하도록 도와주는 클라우드 기반 자동화 및 구성 서비스입니다.

Datadog Azure 통합을 사용해 Azure Automation 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_automation" >}}


### 이벤트

Azure Automation 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure Automation 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_automation/azure_automation_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/