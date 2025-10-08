---
app_id: pusher
app_uuid: 5ee7a117-c7d9-4389-ab02-1566c904a896
assets:
  dashboards:
    pusher: assets/dashboards/pusher_dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - pusher.messages
      metadata_path: metadata.csv
      prefix: pusher.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 165
    source_type_name: Pusher
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- message queues
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pusher
integration_id: pusher
integration_title: Pusher
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pusher
public_title: Pusher
short_description: Pusher에서 Datadog으로 메트릭을 가져와 앱 참여도를 확인 및 모니터링합니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Message Queues
  - Offering::Integration
  configuration: README.md#Setup
  description: Pusher에서 Datadog으로 메트릭을 가져와 앱 참여도를 확인 및 모니터링합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/pusher-monitoring/
  support: README.md#Support
  title: Pusher
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
![Pusher 대시보드][1]

## 개요

Pusher 앱에서 실시간 메시지 및 연결 분석을 모니터링합니다.

- 동시 접속을 실시간으로 시각화합니다.
- 브로드캐스트, 클라이언트 이벤트, 웹훅, API 메시지 등 유형별로 전송된 메시지를 추적합니다.
- 평균, 중앙값, 최대값, 95번째 백분위수 등 메시지 크기에 대한 통계 분석을 확인합니다.
- 빌링 타임테이블 내에서 사용량을 모니터링합니다.

## 설정

### 설치

다음에 따라 Pusher에서 메트릭을 모니터링합니다.

1. [Datadog API 키][2]를 복사합니다.

2. Pusher 계정 설정으로 이동하여 **Datadog 통합** 또는 [로그인][3]을 선택합니다.

3. Datadog API 키를 붙여넣고 **저장**을 클릭합니다.

4. Datadog 대시보드로 돌아가면 기본 Pusher 대시보드 보기에 메트릭이 채워지는 것을 확인합니다.

<div class="alert alert-info">
메트릭이 실시간으로 채워집니다. 통합이 성공적으로 설치되면 과거 데이터가 채워집니다.
</div>

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "pusher" >}}


### 이벤트

Pusher 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Pusher 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Pusher 실시간 모니터링 소개][6]

[1]: images/pusher_dashboard.png
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://dashboard.pusher.com/accounts/sign_in
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/pusher/pusher_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/pusher-monitoring/