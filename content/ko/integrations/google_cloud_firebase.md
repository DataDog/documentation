---
app_id: google-cloud-firebase
app_uuid: d7f5267d-56e4-4148-aabb-bec98207c35a
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: gcp.firebasedatabase.io.utilization
      metadata_path: metadata.csv
      prefix: gcp.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 189
    source_type_name: Google Cloud Firebase
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
- log collection
- mobile
custom_kind: 통합
dependencies: []
description: Firebase 서비스로 인한 네트워크 및 데이터 저장소 사용량을 추적합니다.
display_on_public_website: true
doc_link: https://docs.datadoghq.com/integrations/google_cloud_firebase/
draft: false
git_integration_title: google_cloud_firebase
has_logo: true
integration_id: google-cloud-firebase
integration_title: Google Cloud Firebase
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_firebase
public_title: Google Cloud Firebase
short_description: Firebase는 앱을 빠르게 개발할 수 있도록 도와주는 모바일 플랫폼입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Google Cloud
  - Category::Log Collection
  - Category::Mobile
  - Offering::Integration
  configuration: README.md#Setup
  description: Firebase는 앱을 빠르게 개발할 수 있도록 도와주는 모바일 플랫폼입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Cloud Firebase
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Firebase는 고품질 앱을 빠르게 개발하고, 사용자 기반을 늘리고, 더 많은 수익을 창출할 수 있도록 도와드리는 모바일 플랫폼입니다.

Google Firebase 메트릭을 수집하면 다음을 할 수 있습니다.

- Firebase 데이터베이스 및 호스팅 서비스 성능을 시각화합니다.
- Firebase 도구 성능과 애플리케이션의 상관관계를 파악합니다.

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Google Cloud Platform 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

### 로그 수집

Google Firebase 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Firebase 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Firebase 로그를 필터링하세요.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google_cloud_firebase" >}}


### 이벤트

Google Firebase 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Firebase 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/