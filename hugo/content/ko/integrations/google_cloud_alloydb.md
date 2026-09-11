---
categories:
- cloud
- google cloud
- 데이터 스토어
- 로그 수집
custom_kind: integration
dependencies: []
description: 쿼리 수, 실행 시간, 업로드된 바이트 및 행 등을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_alloydb/
draft: false
git_integration_title: google_cloud_alloydb
has_logo: true
integration_id: google-cloud-alloydb
integration_title: Google AlloyDB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_alloydb
public_title: Datadog-Google AlloyDB 통합
short_description: 쿼리 수, 실행 시간, 업로드된 바이트 및 행 등을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AlloyDB는 까다로운 트랜잭션 워크로드를 위한 완전 관리형 PostgreSQL 호환 데이터베이스입니다. 
오픈 소스 PostgreSQL과 100% 호환성을 유지하면서 엔터프라이즈급 성능과 가용성을 제공합니다.

Google AlloyDB에서 메트릭을 가져와 다음을 수행할 수 있습니다.

- AlloyDB 클러스터의 성능을 시각화합니다.
- AlloyDB 인스턴스의 성능과 데이터베이스의 상관관계를 파악합니다.

## 설정

### 설치

아직 하지 않았다면, [먼저 Google Cloud Platform 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

### 로그 수집

Google AlloyDB 로그는 Google Cloud Logging으로 수집되어 Cloud Pub/Sub 주제를 통해 Dataflow 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정][2]하세요.

이 작업이 완료되면 Google AlloyDB 로그를 Google Cloud Logging에서 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]에서 Google AlloyDB 로그를 필터링합니다.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-alloydb" >}}


### 이벤트

Google AlloyDB 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google AlloyDB 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_alloydb/google_cloud_alloydb_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/