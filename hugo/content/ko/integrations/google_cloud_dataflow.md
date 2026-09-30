---
app_id: google-cloud-dataflow
app_uuid: 27fcc215-6351-4e39-8320-19fe03ed7634
assets:
  dashboards:
    google_cloud_dataflow: assets/dashboards/google_cloud_dataflow.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.dataflow.job.total_vcpu_time
      metadata_path: metadata.csv
      prefix: gcp.dataflow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 265
    source_type_name: Google Cloud Dataflow
  monitors:
    Job backlog time is high: assets/monitors/backlog_monitor.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- 로그 수집
custom_kind: 통합
dependencies: []
description: 주요 Google Cloud Dataflow 메트릭을 추적합니다.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_dataflow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: 블로그
  text: Datadog으로 Dataflow 파이프라인 모니터링
git_integration_title: google_cloud_dataflow
has_logo: true
integration_id: google-cloud-dataflow
integration_title: Google Cloud Dataflow
integration_version: ''
is_public: true
manifest_version: 2.0.0
monitors:
  Job backlog time is high: assets/monitors/backlog_monitor.json
name: google_cloud_dataflow
public_title: Google Cloud Dataflow
short_description: 실시간 및 과거 모드에서 데이터를 변환하고 강화하는 관리형 서비스.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 실시간 및 과거 모드에서 데이터를 변환하고 강화하는 관리형 서비스.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  support: README.md#Support
  title: Google Cloud Dataflow
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Google Cloud Dataflow는 스트림(실시간) 및 배치(기록) 모드에서 동일한 안정성과 표현 능력으로 데이터를 변환 및 보강할 수 있는 완전관리형 서비스입니다.

Datadog Google Cloud 통합을 사용하여 Google Cloud Dataflow에서 메트릭을 수집합니다.

## 설정

### 메트릭 수집

#### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

### 로그 수집

Google Cloud Dataflow 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Dataflow 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Cloud Dataflow 로그를 필터링하세요.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google_cloud_dataflow" >}}


<div class="alert alert-warning">
Google Cloud Dataflow를 사용하여 Apache Beam 파이프라인 메트릭을 모니터링하는 경우 <a href="https://beam.apache.org/releases/javadoc/current/org/apache/beam/sdk/metrics/Metrics.html">게이지 정적 메서드</a>에서 생성한 메트릭은 수집하지 않습니다. 해당 메트릭을 모니터링해야 하는 경우 <a href="https://micrometer.io/docs">마이크로미터(Micrometer)</a>를 사용할 수 있습니다.
</div>

### 이벤트

Google Cloud Dataflow 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Dataflow 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/