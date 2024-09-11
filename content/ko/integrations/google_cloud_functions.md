---
categories:
- cloud
- google cloud
- log collection
custom_kind: 통합
dependencies: []
description: 최소, 최대 및 평균 함수 실행 시간을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_functions/
draft: false
git_integration_title: google_cloud_functions
has_logo: true
integration_id: google-cloud-functions
integration_title: Google Cloud Functions
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_functions
public_title: Datadog-Google Cloud Functions 통합
short_description: 최소, 최대 및 평균 함수 실행 시간을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Cloud  Functions는 이벤트 기반 비동기식 경량 컴퓨팅 솔루션으로, 소규모의 단일 기능 함수를 생성할 수 있습니다.

Google Functions 메트릭을 수집하면 다음을 할 수 있습니다.

- 함수의 성능을 시각화합니다.
- 함수의 성능과 애플리케이션의 상관관계를 파악합니다.

## 설정

### 메트릭 수집

#### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

### 로그 수집

Google Cloud Functions 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Functions 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Cloud Functions 로그를 필터링하세요.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google_cloud_functions" >}}


### 이벤트

Google Cloud Functions 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Google Cloud Functions 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/