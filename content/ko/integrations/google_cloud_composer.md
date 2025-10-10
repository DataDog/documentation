---
app_id: google-cloud-composer
app_uuid: 59f5f810-7282-4b41-bb10-80d6e8839a73
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.composer.environment.api.request_count
      metadata_path: metadata.csv
      prefix: gcp.composer.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 264
    source_type_name: Google Cloud Composer
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 설정 및 배포
- google cloud
- 로그 수집
custom_kind: 통합
dependencies: []
description: 주요 Google Cloud Composer 메트릭을 추적합니다.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_composer/
draft: false
git_integration_title: google_cloud_composer
has_logo: true
integration_id: google-cloud-composer
integration_title: Google Cloud Composer
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_composer
public_title: Google Cloud Composer
short_description: 클라우드와 온프레미스 데이터 센터 전체의 파이프라인을 모니터링하고 일정을 예약해 주는 서비스
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - 카테고리::설정 및 배포
  - Category::Google Cloud
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 클라우드와 온프레미스 데이터 센터 전체의 파이프라인을 모니터링하고 일정을 예약해 주는 서비스
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Composer
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Google Cloud Composer는 클라우드 및 온프레미스 데이터센터 전반에 걸쳐 파이프라인을 작성, 예약 및 모니터링할 수 있도록 도와드리는 완전관리형 워크플로우 오케스트레이션 서비스입니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Composer에서 메트릭을 수집합니다.

## 설정

### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

### 로그 수집

Google Cloud Composer 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Composer 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Cloud Composer 로그를 필터링하세요.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-composer" >}}


### 이벤트

Google Cloud Composer 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Composer 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_composer/google_cloud_composer_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/