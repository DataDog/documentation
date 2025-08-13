---
categories:
- cloud
- 데이터 스토어
- google cloud
- 로그 수집
- 모바일
custom_kind: integration
dependencies: []
description: 주요 Google Cloud Firestore 추적 메트릭.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_firestore/
draft: false
git_integration_title: google_cloud_firestore
has_logo: true
integration_id: google-cloud-firestore
integration_title: Google Cloud Firestore
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_firestore
public_title: Datadog-Google Cloud Firestore 통합
short_description: 주요 Google Cloud Firestore 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Cloud Firestore는 파이어베이스와 Google 클라우드 플랫폼에서 제공하는 모바일, 웹, 서버 개발을 위한 유연하고 확장 가능한 데이터베이스입니다.

Datadog Google 클라우드 플랫폼 통합을 사용하여 Google Cloud Firestore에서 메트릭 수집합니다.

## 설정

### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

### 로그 수집

Google Cloud Firestore 로그는 Google 클라우드 로깅으로 수집되어 클라우드 퍼브/서브 주제를 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

이 작업이 완료되면 Google Cloud Firestore 로그를 Google 클라우드 로깅에서 퍼브/서브 항목으로 내보냅니다.

1. [Google 클라우드 로깅 페이지][3]로 이동하여 Google Cloud Firestore 로그를 필터링합니다.
2. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-firestore" >}}


### 이벤트

Google Cloud Firestore 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Google Cloud Firestore 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firestore/google_cloud_firestore_metadata.csv
[5]: https://docs.datadoghq.com/ko/help/