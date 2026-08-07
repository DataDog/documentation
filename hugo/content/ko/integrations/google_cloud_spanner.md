---
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: 통합
dependencies: []
description: Spanner 인스턴스의 리소스 사용량을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_spanner/
draft: false
git_integration_title: google_cloud_spanner
has_logo: true
integration_id: google-cloud-spanner
integration_title: Google Spanner
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_spanner
public_title: Datadog-Google Spanner 통합
short_description: Spanner 인스턴스의 리소스 사용량을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Cloud Spanner는 강력한 일관성과 수평적 확장성을 전부 갖춘 최초이자 유일한 관계형 데이터베이스 서비스입니다.

Google Spanner 메트릭을 수집하면 다음을 할 수 있습니다.

- Spanner 데이터베이스 성능을 가시화합니다.
- Spanner 데이터베이스의 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 메트릭 수집

#### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

### 로그 수집

Google Cloud Spanner 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Spanner 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Cloud Spanner 로그를 필터링하세요.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub Sub로 내보내기" >}}

4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-spanner" >}}


### 이벤트

Google Cloud Spanner 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Spanner 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_spanner/google_cloud_spanner_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/