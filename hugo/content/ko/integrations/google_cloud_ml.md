---
app_id: google-cloud-ml
app_uuid: ed0cf686-2653-4082-bf00-1ad5d1dcd379
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.ml.training.cpu.utilization
      metadata_path: metadata.csv
      prefix: gcp.ml.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 195
    source_type_name: Google Cloud ML
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- log collection
- ai/ml
custom_kind: 통합
dependencies: []
description: Google Cloud 기계 학습의 주요 메트릭을 추적합니다.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_ml/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: 블로그
  text: 프로덕션 환경의 ML 모델 모니터링 모범 사례
git_integration_title: google_cloud_ml
has_logo: true
integration_id: google-cloud-ml
integration_title: Google Cloud ML
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_ml
public_title: Google Cloud ML
short_description: 어떤 규모나 유형의 데이터에도 적합한 머신 러닝 모델을 쉽게 구축하도록 도와주는 관리 서비스
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::Log Collection
  - Category:AI/ML
  - Offering::Integration
  configuration: README.md#Setup
  description: 어떤 규모나 유형의 데이터에도 적합한 머신 러닝 모델을 쉽게 구축하도록 도와주는 관리 서비스
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  support: README.md#Support
  title: Google Cloud ML
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Google Cloud 기계 학습은 모든 유형의 데이터에서 규모와 상관없이 동작하는 기계 학습 모델을 쉽게 구축할 수 있도록 도와드리는 관리형 서비스입니다.

Google 기계 학습 메트릭을 수집하면 다음을 할 수 있습니다.

- ML 서비스 성능을 시각화합니다.
- ML 서비스의 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Google Cloud Platform 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

### 로그 수집

Google Cloud 기계 학습 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud 기계 학습 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Cloud 기계 학습 로그를 필터링하세요.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-ml" >}}


### 이벤트

Google Cloud 기계 학습 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Google Cloud 기계 학습 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_ml/google_cloud_ml_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/