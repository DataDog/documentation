---
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: 통합
dependencies: []
description: 성능, 서비스 상태, 복제에 대한 메트릭 데이터베이스를 추적합니다
doc_link: https://docs.datadoghq.com/integrations/google_cloudsql/
draft: false
git_integration_title: google_cloudsql
has_logo: true
integration_id: google-cloudsql
integration_title: Google Cloud SQL
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloudsql
public_title: Datadog-Google Cloud SQL 통합
short_description: 성능, 서비스 상태, 복제에 대한 메트릭 데이터베이스를 추적합니다
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Cloud SQL은 완전관리형 데이터베이스 서비스로, 클라우드에서 SQL 데이터베이스를 쉽게 설정, 유지, 관리 및 운영할 수 있습니다.

Google Cloud SQL 메트릭을 수집하면 다음을 할 수 있습니다.

- Cloud SQL 데이터베이스의 성능을 시각화합니다.
- Cloud SQL 데이터베이스의 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 설치

#### 메트릭 수집

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

#### 설정

커스텀 Cloud SQL 레이블을 태그로 수집하려면 클라우드 에셋 인벤토리 권한을 활성화합니다.

#### 로그 수집

{{< site-region region="us3" >}}

로그 수집은 이 사이트에서 지원되지 않습니다.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

Google Cloud SQL 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud SQL 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Cloud SQL 로그를 필터링하세요.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer

{{< /site-region >}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloudsql" >}}


### 이벤트

Google Cloud SQL 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**gcp.cloudsql.database.state**
Cloud SQL 인스턴스의 현재 서비스 상태입니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloudsql/google_cloudsql_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/