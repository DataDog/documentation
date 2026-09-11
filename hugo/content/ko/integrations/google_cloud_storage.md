---
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: 통합
dependencies: []
description: 주요 Google 클라우드 스토리지 메트릭을 추적합니다.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_storage/
draft: false
git_integration_title: google_cloud_storage
has_logo: true
integration_id: google-cloud-storage
integration_title: Google Storage
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_storage
public_title: Datadog-Google Storage 통합
short_description: 주요 Google 클라우드 스토리지 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Cloud Storage는 실시간 데이터 제공부터 데이터 분석/ML, 데이터 보관까지 개발자 및 기업을 위한 서비스를 제공해 드리는 통합 오브젝트 스토리지입니다.

Google Storage 메트릭을 수집하면 다음을 할 수 있습니다.

- Storage 서비스 성능을 시각화합니다.
- Storage 서비스의 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

#### 설정

커스텀 Cloud Storage 레이블을 태그로 수집하려면 클라우드 에셋 인벤토리 권한을 활성화합니다.

### 로그 수집

Google Cloud  Storage 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Storage 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Cloud Storage 로그를 필터링하세요.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-storage" >}}


### 이벤트

Google Cloud Storage 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Storage 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/