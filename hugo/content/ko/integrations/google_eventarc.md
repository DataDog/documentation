---
app_id: google-eventarc
app_uuid: a10c14f9-f630-439f-a181-c49a1ac79dc5
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 346
    source_type_name: Google Eventarc
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- google cloud
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_eventarc
integration_id: google-eventarc
integration_title: Google Eventarc
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_eventarc
public_title: Google Eventarc
short_description: Eventarc로 Google 서비스, SaaS 및 자체 앱에서 이벤트를 가져옵니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::클라우드
  - Category::Google Cloud
  - 제공::통합
  configuration: README.md#Setup
  description: Eventarc로 Google 서비스, SaaS 및 자체 앱에서 이벤트를 가져옵니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/
  support: README.md#Support
  title: Google Eventarc
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Datadog 이벤트를 [Eventarc][1]로 전송하여 Google 서비스에 전달하면 Datadog 모니터 알림을 통해 Eventarc 기반 워크플로를 시작할 수 있습니다.

## 설정

1. 알림을 수신하는 각 GCP 프로젝트에 기본 [GCP 통합][2]이 설치되어 있는지 확인합니다.

2. Google Cloud Console에서 [Eventarc 채널을 생성][3]합니다

3. Datadog 애플리케이션 내에서 아래 예시의 구문을 사용하여 모니터의 [알림 섹션][4]에 채널 이름과 활성화 토큰을 설정합니다.

![Datadog 모니터 구성 페이지의 'Say what’s happening' 섹션에 HDD Disk Size Above Capacity라는 제목과, 알림 본문에 다음 예시와 같이 Eventarc 채널로 이벤트를 전송하는 문장이 포함되어 있습니다. '알림은 @eventarc-datadog-sandbox_us-central1_my-channel로 전송되며, 이 채널은 Cloud Function: Bump Quota를 트리거합니다.'][5]

### 검증

통합이 활성화되면 Google Cloud Console의 채널이 **Pending**에서 **Active**으로 바뀝니다.

### 자동화된 액션

모니터용 신규 아웃바운드 알림 채널을 설정해 GCP Eventarc 통합으로 자동화 작업을 시작합니다. 자동화 작업으로 GCP 리소스를 다음과 같이 구성할 수 있습니다.

  - Datadog 모니터를 사용하여 Eventarc 워크플로 시작하기
  - Google 환경에서 Cloud Functions, BigQuery 등을 Datadog 모니터와 연결합니다.
  - 알림 이벤트 내의 정보를 사용하여 자동 복구 파이프라인 및 런북을 실행하고, 분석 쿼리 등을 실행합니다.

대상으로 지정할 수 있는 리소스 전체 목록은 [GCP 문서][6]에서 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

Google Eventarc 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Google Eventarc 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Eventarc 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

## 추가 읽기

기타 유용한 문서, 링크 및 기사:

- [Eventarc 및 Datadog으로 인시던트 응답 워크플로 자동화하기][8]

[1]: https://cloud.google.com/eventarc/docs
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[3]: https://cloud.google.com/eventarc/docs/third-parties/create-channels
[4]: https://docs.datadoghq.com/ko/monitors/notify/
[5]: images/eventarc_channel_notification.png
[6]: https://cloud.google.com/eventarc/docs/targets
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://www.datadoghq.com/blog/incident-response-eventarc-datadog/