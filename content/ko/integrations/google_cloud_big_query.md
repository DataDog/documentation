---
categories:
- cloud
- google cloud
- data store
- log collection
dependencies: []
description: 쿼리 개수, 실행 횟수, 업로드 바이트와 행 등을 추적.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_big_query/
draft: false
git_integration_title: google_cloud_big_query
has_logo: true
integration_id: google-cloud-bigquery
integration_title: Google BigQuery
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_cloud_big_query
public_title: Datadog-Google BigQuery 통합
short_description: 쿼리 개수, 실행 횟수, 업로드 바이트, 행 등을 추적.
version: '1.0'
---

## 개요

BigQuery는 Google에서 출시한 서비스로, 페타바이트 규모의 완전관리형, 저비용 엔터프라이즈 데이터 웨어하우스입니다.

Google BigQuery를 사용해 메트릭을 얻으면 다음을 할 수 있습니다.

- BigQuery 쿼리의 성능 가시화
- BigQuery 쿼리의 성능과 애플리케이션의 상관 관계 수립

## 설정

### 설치

아직 설정하지 않았다면, [먼저 Google Cloud Platform 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

### 로그 수집

Google BigQuery 로그는 Google Cloud Logging에서 수집되어 HTTP 푸시 포워더를 통해 Cloud pub/sub으로 전송됩니다. 아직 설정하지 않았다면 [HTTP 푸시 포워더와 Cloud pub/sub][2]을 설정하세요.

설정을 완료한 후, Google BigQuery 로그를 Google Cloud Logging에서 pub/sub으로 내보내세요.

1. [Google Cloud Logging 페이지][3]로 이동해 Google BigQuery 로그를 필터링하세요.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. 대상으로 'Cloud Pub/Sub'를 선택하고 해당 목적으로 생성된 pub/sub를 선택합니다. **참고**: pub/sub는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google_cloud_big_query" >}}


### 이벤트

Google BigQuery 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Google BigQuery 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/