---
app_id: google-cloud-anthos
app_uuid: ae7e2e76-77be-446b-a7e4-b341ba20473a
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.anthos.kube_node_status_capacity
      metadata_path: metadata.csv
      prefix: gcp.anthos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 345
    source_type_name: Google Cloud Anthos
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 클라우드
- 오케스트레이션
- google cloud
- 로그 수집
custom_kind: 통합
dependencies: []
description: Anthos 클러스터에서 메트릭과 로그를 수집하고 Datadog에서 분석하세요.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_anthos/
draft: false
git_integration_title: google_cloud_anthos
has_logo: true
integration_id: google-cloud-anthos
integration_title: Google Cloud Anthos
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_anthos
public_title: Google Cloud Anthos
short_description: 최신 애플리케이션을 대규모로 구축하고 실행하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - 카테고리::오케스트레이션
  - Category::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 최신 애플리케이션을 대규모로 구축하고 실행하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Anthos
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Google Cloud Anthos는 Google Cloud 기반 컨트롤 플레인을 갖춘 온프레미스, 엣지 및 여러 퍼블릭 클라우드의 인프라와 애플리케이션을 위한 개발 플랫폼입니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Anthos에서 메트릭을 수집하세요.

## 설정

### 메트릭 수집

#### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

### 로그 수집

Google Cloud Anthos 로그는 Google Cloud Logging을 사용하여 수집하고 Cloud Pub/Sub 주제를 통해 Dataflow 작업으로 전송할 수 있습니다. 아직 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정하세요][2].

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google_cloud_anthos" >}}


### 이벤트

Google Cloud Anthos 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Anthos 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://cloud.google.com/architecture/partners/monitoring-anthos-with-datadog#collecting_logs_with_stackdriver_logging
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_anthos/google_cloud_anthos_metadata.csv
[4]: https://docs.datadoghq.com/ko/help/