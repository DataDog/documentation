---
categories:
- cloud
- google cloud
custom_kind: 통합
dependencies: []
description: Google Cloud Logging에 수집된 로그의 크기를 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/google_stackdriver_logging/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/
  tag: 블로그
  text: Datadog으로 Google Cloud 로그 수집하기
git_integration_title: google_stackdriver_logging
has_logo: true
integration_id: google-stackdriver-logging
integration_title: Google Cloud Logging
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_stackdriver_logging
public_title: Datadog-Google Cloud Logging 통합
short_description: Google Stackdriver에 수집된 로그의 크기를 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Cloud Logging 프로덕트를 사용하면 Google Cloud Platform에서 로그 데이터 및 이벤트를 저장, 검색, 분석, 모니터링하고 알림을 전송할 수 있습니다.

Datadog은 Google Cloud Logging **메트릭**을 불러와 다음 작업을 수행합니다.

- Google Cloud 로그의 성능을 시각화합니다.
- Google Cloud 로그 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 설치

Google Cloud 로그의 메트릭은 [Google Cloud Platform 통합][1]의 일부로 포함되어 있습니다. 추가 설치 단계가 필요하지 않습니다.

### 로그 수집

Google Cloud 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-stackdriver-logging" >}}


**참고**: Datadog은 접두어 `gcp.logging.user`가 있는 Google Cloud Logging [사용자 정의 메트릭][4]을 수집합니다.

### 이벤트

Google Cloud Logging 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Logging 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_stackdriver_loggin/google_stackdriver_logging_metadata.csv
[4]: https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface
[5]: https://docs.datadoghq.com/ko/help/