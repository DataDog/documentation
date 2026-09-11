---
app_id: google-cloud-run
app_uuid: 20ba733c-60a3-4c78-9c54-0f86025d6ea6
assets:
  dashboards:
    gcp_cloudrun: assets/dashboards/gcp_cloudrun.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.run.container.cpu.allocation_time
      metadata_path: metadata.csv
      prefix: gcp.run.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 233
    source_type_name: Google Cloud Run
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- containers
- google cloud
- log collection
- orchestration
custom_kind: integration
dependencies: []
description: 클러스터 전체에서 메트릭, 트레이스, 로그를 수집하고 Datadog에서 분석하세요.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  tag: 블로그
  text: Datadog으로 Cloud Run 모니터링
- link: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  tag: 블로그
  text: Google Cloud Run 메트릭을 수집하는 방법
- link: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  tag: 블로그
  text: Google Cloud Run 모니터링을 위한 주요 메트릭
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: 설명서
  text: Anthos용 Google Cloud Run
git_integration_title: google_cloud_run
has_logo: true
integration_id: google-cloud-run
integration_title: Google Cloud Run
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_run
public_title: Google Cloud Run
short_description: 관리형 컴퓨팅 플랫폼에서 HTTP 요청을 통해 호출된 스테이트리스 컨테이너를 실행합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Containers
  - Category::Google Cloud
  - Category::Log Collection
  - 카테고리::오케스트레이션
  - Offering::Integration
  configuration: README.md#Setup
  description: 관리형 컴퓨팅 플랫폼에서 HTTP 요청을 통해 호출된 스테이트리스 컨테이너를 실행합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  - resource_type: 설명서
    url: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  support: README.md#Support
  title: Google Cloud Run
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Cloud Run은 HTTP 요청으로 호출 가능한 스테이트리스(Stateless) 컨테이너를 실행할 수 있게 해주는 관리형 컴퓨팅 플랫폼입니다.

이 통합을 사용하고 컨테이너를 계측하여 Datadog의 모든 Cloud Run 메트릭, 트레이스, 로그를 확인하세요.

Cloud Run for Anthos에 대한 자세한 내용은 [Google Cloud Run for Anthos 문서][1]를 참조하세요.

## 설정

### 메트릭 수집

#### 설치

기본 메트릭 수집을 시작하려면 [Google Cloud Platform 통합][2]을 설정하세요. 커스텀 메트릭을 설정하려면 [서버리스 문서][3]를 참조하세요.

### 로그 수집

#### 통합
Google Cloud Run은 [감사 로그][4]도 노출합니다.
Google Cloud Run 로그는 Google Cloud Logging으로 수집되어 Cloud Pub/Sub 주제를 통해 Dataflow 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정][5]하세요.

이 작업이 완료되면 Google Cloud Logging에서 Google Cloud Run 로그를 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][6]로 이동하여 Google Cloud Run 로그를 필터링하세요.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub Sub로 내보내기" >}}

4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

#### 직접 로깅
Cloud Run 서비스에서 Datadog에 직접 애플리케이션을 로깅하는 방법은 [서버리스 문서][3]를 참조하세요.

### 추적

완전 관리형 Google Cloud Run에 대한 전문적인 Agent 설정 지침은 [서버리스 문서][3]에서 확인하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-run" >}}


### 이벤트

Google Cloud Functions 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Google Cloud Functions 통합에는 서비스 점검이 포함되지 않습니다.


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_run_for_anthos/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[3]: https://docs.datadoghq.com/ko/serverless/google_cloud_run
[4]: https://cloud.google.com/run/docs/audit-logging
[5]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[6]: https://console.cloud.google.com/logs/viewer
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run/google_cloud_run_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/