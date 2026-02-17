---
app_id: azure-containerinstances
app_uuid: 88867a91-04d4-41d3-8ced-36cd87c2a887
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.containerinstance_containergroups.cpu_usage
      metadata_path: metadata.csv
      prefix: azure.containerinstance_containergroups
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 283
    source_type_name: Azure Container Instances
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- 클라우드
- 컨테이너
- 프로비저닝
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_container_instances
integration_id: azure-containerinstances
integration_title: Azure Container Instances
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_container_instances
public_title: Azure Container Instances
short_description: Azure Container Instances의 핵심 메트릭 추적하기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Category::Provisioning
  - Offering::Integration
  configuration: README.md#Setup
  description: Azure Container Instances의 핵심 메트릭 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Container Instances
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure Container Instances는 개발자가 기본 인프라스트럭처를 프로비저닝하거나 관리하지 않고도 컨테이너를 배포할 수 있도록 도와주는 서비스입니다.

Datadog Azure 통합을 사용해 Azure Container Instances 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{ get-metrics-from-git "azure-containerinstances" }}


### 이벤트

Azure Container Instances 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Container Instances 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_container_instances/azure_container_instances_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/