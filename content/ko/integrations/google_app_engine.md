---
app_id: google-app-engine
app_uuid: 873be5df-897f-450d-856d-99cea1ffae03
assets:
  dashboards:
    gcp_appengine: assets/dashboards/gcp_appengine.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - gcp.gae.memcache.hit_ratio
      - gcp.gae.http.server.response_latencies.avg
      - gcp.gae.system.cpu.usage
      - gcp.gae.flex.instance.connections.current
      metadata_path: metadata.csv
      prefix: gcp.gae
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 87
    source_type_name: Google 앱 엔진
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- configuration & deployment
- google cloud
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_app_engine
integration_id: google-app-engine
integration_title: Google 앱 엔진
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_app_engine
public_title: Google 앱 엔진
short_description: "Google App Engine: Google의 Platform as a Service \n클라우드에서 실행되는\
  \ 앱 모니터링"
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::설정 및 배포
  - Category::Google Cloud
  - Offering::Integration
  configuration: README.md#Setup
  description: "Google App Engine: Google의 Platform as a Service \n클라우드에서 실행되는 앱 모니터링"
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google 앱 엔진
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

프로젝트에 Google 앱 엔진 통합을 설치합니다.

- 멤캐시, 작업 대기열, 데이터 저장소 등 Google 앱 엔진 서비스 메트릭을 확인합니다.
- 백분위수, 레이턴시, 비용 표시 등 요청에 대한 메트릭을 확인합니다.
- Google 앱 엔진 메트릭에 버전별 태그를 설정하고 다양한 버전의 성능을 비교하세요.

[API][1] 또는 [DogStatsD][2]를 사용해 Datadog으로 커스텀 메트릭을 전송할 수도 있습니다.

## 설정

### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][3]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

### 로그 수집

Google 앱 엔진 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][4]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google 앱 엔진 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][5]로 이동해 Google 앱 엔진 로그를 필터링하세요.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-app-engine" >}}


### 이벤트

Google 앱 엔진 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google 앱 엔진 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[3]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[4]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/