---
app_id: google-cloud-apis
app_uuid: b2dc9b16-68b8-47c0-a9e0-351d9c356baa
assets:
  dashboards:
    google-cloud-apis: assets/dashboards/google_cloud_apis_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - API.request_count
      metadata_path: metadata.csv
      prefix: gcp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 262
    source_type_name: Google 클라우드 API
  monitors:
    Instances per VPC approaching limit: assets/monitors/compute_instance_vpc_quota.json
    Service Quota utilization is high: assets/monitors/serviceruntime_rate_quota.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- google cloud
- 메트릭
- 클라우드
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_apis
integration_id: google-cloud-apis
integration_title: Google 클라우드 API
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_apis
public_title: Google 클라우드 API
short_description: Google 클라우드 API를 사용하면 코드에서 Google 클라우드 플랫폼 제품에 액세스할 수 있습니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Google Cloud
  - Category::Metrics
  - 카테고리::클라우드
  - Queried Data Type::Metrics
  - 제공::통합
  configuration: README.md#Setup
  description: Google 클라우드 API를 사용하면 코드에서 Google 클라우드 플랫폼 제품에 액세스할 수 있습니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google 클라우드 API
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Google 클라우드 API를 사용하면 코드에서 Google 클라우드 플랫폼 제품에 액세스할 수 있습니다.

Datadog Google 클라우드 플랫폼 통합을 사용하여 Google 클라우드 API에서 메트릭 수집합니다.

## 설정

### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-apis" >}}


### 이벤트

Google 클라우드 API 통합에는 점검이 포함되어 있지 않습니다.

### 서비스 점검

Google 클라우드 API 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_apis/google_cloud_apis_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/