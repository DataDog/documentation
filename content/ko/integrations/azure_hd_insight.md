---
app_id: azure-hdinsight
app_uuid: 2b5359ca-2d39-4a43-8f8a-49ec30f6bee3
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: azure.hdinsight_clusters.gateway_requests
      metadata_path: metadata.csv
      prefix: azure.hdinsight_clusters
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 294
    source_type_name: Azure HD Insight
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
git_integration_title: azure_hd_insight
integration_id: azure-hdinsight
integration_title: Azure HD Insight
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_hd_insight
public_title: Azure HD Insight
short_description: Track key Azure HD Insight metrics.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Setup
  description: Track key Azure HD Insight metrics.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure HD Insight
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Azure HDInsight는 대량의 데이터를 쉽고 빠르며 비용 효율적으로 처리할 수 있게 해주는 클라우드 서비스입니다.

Datadog Azure 통합을 사용해 Azure HDInsight 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_hd_insight" >}}


### 이벤트

Azure HDInsight 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure HDInsight 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/