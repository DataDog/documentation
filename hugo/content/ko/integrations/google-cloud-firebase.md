---
aliases:
- /ko/integrations/google_cloud_firebase
app_id: google-cloud-firebase
categories:
- cloud
- google cloud
- log collection
- mobile
custom_kind: integration
description: Firebase는 앱을 빠르게 개발할 수 있도록 도와주는 모바일 플랫폼입니다.
media: []
title: Google Cloud Firebase
---
## 개요

Firebase는 고품질 앱을 빠르게 개발하고, 사용자 기반을 늘리고, 더 많은 수익을 창출할 수 있도록 도와드리는 모바일 플랫폼입니다.

Google Firebase 메트릭을 수집하면 다음을 할 수 있습니다.

- Firebase 데이터베이스 및 호스팅 서비스 성능을 시각화합니다.
- Firebase 도구 성능과 애플리케이션의 상관관계를 파악합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Firebase 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Firebase 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Firebase 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.firebaseappcheck.resources.verification_count** <br>(count) | 대상 리소스에 대해 통합 서비스가 실행한 검증.|
| **gcp.firebaseappcheck.services.verification_count** <br>(count) | 통합 서비스에서 실행하는 검증.|
| **gcp.firebaseauth.phone_auth.phone_verification_count** <br>(count) | 전화 인증 상세 횟수.|
| **gcp.firebasedatabase.io.database_load** <br>(gauge) | 유형별 I/O 데이터베이스 부하 비율<br>_percent로 표시_ |
| **gcp.firebasedatabase.io.persisted_bytes_count** <br>(count) | 디스크에 저장된 데이터 용량(바이트)<br>_byte로 표시_ |
| **gcp.firebasedatabase.io.sent_responses_count** <br>(count) | 클라이언트에 전송되거나 브로드캐스트된 응답 수<br>_ byte로 표시_  |
| **gcp.firebasedatabase.io.utilization** <br>(gauge) | I/O 사용 비율<br>_percent로 표시_ |
| **gcp.firebasedatabase.network.active_connections** <br>(gauge) | 미처리 연결 수<br>_connection으로 표시_ |
| **gcp.firebasedatabase.network.api_hits_count** <br>(count) | 유형별로 그룹화된 데이터베이스 히트 수.|
| **gcp.firebasedatabase.network.broadcast_load** <br>(gauge) | 클라이언트에 브로드캐스트를 준비하고 전송하는 데 걸리는 시간 활용률.|
| **gcp.firebasedatabase.network.disabled_for_overages** <br>(gauge) | 네트워크 사용량 초과로 인해 Firebase 데이터베이스가 비활성화되었는지 여부를 나타냅니다.|
| **gcp.firebasedatabase.network.https_requests_count** <br>(count) | 수신된 HTTPS 요청 수.|
| **gcp.firebasedatabase.network.monthly_sent** <br>(gauge) | 총 송신 바이트 수(집계되며 매월 초기화됨)<br>_ byte로 표시_ |
| **gcp.firebasedatabase.network.monthly_sent_limit** <br>(gauge) | Firebase 데이터베이스 월별 네트워크 한도<br>_byte로 표시_ |
| **gcp.firebasedatabase.network.sent_bytes_count** <br>(count) | Firebase 데이터베이스 외부 대역폭 사용량<br>_byte로 표시_ |
| **gcp.firebasedatabase.network.sent_payload_and_protocol_bytes_count** <br>(count) | 암호화 오버헤드를 제외한 송신 대역폭 사용량<br>_byte로 표시_ |
| **gcp.firebasedatabase.network.sent_payload_bytes_count** <br>(count) | 암호화나 프로토콜 없이 전송되는 대역폭 사용량<br>_byte로 표시_ |
| **gcp.firebasedatabase.rules.evaluation_count** <br>(count) | Firebase Realtime Database Security Rule 평가 횟수.|
| **gcp.firebasedatabase.storage.disabled_for_overages** <br>(gauge) | Firebase 데이터베이스가 저장 공간 초과로 인해 비활성화되었는지 여부를 나타냅니다.|
| **gcp.firebasedatabase.storage.limit** <br>(gauge) | Firebase 데이터베이스 저장 한도<br>_byte로 표시_ |
| **gcp.firebasedatabase.storage.total_bytes** <br>(gauge) | Firebase 데이터베이스 스토리지 크기<br>_byte로 표시_ |
| **gcp.firebasedataconnect.connector.datasource_latencies.avg** <br>(count) | 커넥터가 실행한 사전 정의된 작업에서 조회된 데이터 소스의 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.connector.datasource_latencies.samplecount** <br>(count) | 커넥터가 실행한 사전 정의된 작업에서 조회된 데이터 소스의 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.connector.datasource_latencies.sumsqdev** <br>(count) | 커넥터가 실행한 사전 정의된 작업에서 조회된 데이터 소스의 지연 시간 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.connector.datasource_request_bytes_count** <br>(count) | 커넥터가 실행한 사전 정의된 작업에서 조회된 데이터 소스로 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.firebasedataconnect.connector.datasource_response_bytes_count** <br>(count) | 커넥터가 실행한 사전 정의된 작업에서 조회된 데이터 소스가 반환환 바이트 수<br>_byte로 표시_ |
| **gcp.firebasedataconnect.connector.network.sent_bytes_count** <br>(count) | 커넥터를 통해 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.firebasedataconnect.connector.operation_count** <br>(count) | 커넥터가 실행한 사전 정의된 작업 수.|
| **gcp.firebasedataconnect.connector.operation_latencies.avg** <br>(count) | 커넥터가 실행한 사전 정의된 작업의 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.connector.operation_latencies.samplecount** <br>(count) | 커넥터가 실행한 사전 정의된 작업 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.connector.operation_latencies.sumsqdev** <br>(count) | 커넥터가 실행한 사전 정의된 작업 지연 시간 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.service.datasource_latencies.avg** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업으로 조회된 데이터 소스 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.service.datasource_latencies.samplecount** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업으로 조회된 데이터 소스 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.service.datasource_latencies.sumsqdev** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업으로 조회된 데이터 소스 지연 시간 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.service.datasource_request_bytes_count** <br>(count) | 서비스에서 직접 실행된 임의의 관리 작업으로 인해 데이터 소스에 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.firebasedataconnect.service.datasource_response_bytes_count** <br>(count) | 서비스에서 직접 실행된 임의의 관리 작업으로 인해 데이터 소스가 반환한 바이트 수<br>_byte로 표시_ |
| **gcp.firebasedataconnect.service.network.sent_bytes_count** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업으로 인해 전송된 바이트 수<br>_byte로 표시_ |
| **gcp.firebasedataconnect.service.operation_count** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업 횟수.|
| **gcp.firebasedataconnect.service.operation_latencies.avg** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업 평균 지연 시간<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.service.operation_latencies.samplecount** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업 지연 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.firebasedataconnect.service.operation_latencies.sumsqdev** <br>(count) | 서비스에서 직접 실행된 임의의 관리자 작업 지연 시간 제곱편차 합계<br>_millisecond로 표시_ |
| **gcp.firebaseextensions.extension.version.active_instances** <br>(gauge) | 게시된 확장 버전의 활성 인스턴스 수.|
| **gcp.firebasehosting.network.monthly_sent** <br>(gauge) | 전송된 총 바이트 수(매월 집계 및 초기화)<br>_byte로 표시_ |
| **gcp.firebasehosting.network.monthly_sent_limit** <br>(gauge) | Firebase Hosting 월간 네트워크 한도<br>_byte로 표시_ |
| **gcp.firebasehosting.network.sent_bytes_count** <br>(count) | Firebase Hosting 외부 대역폭 사용량<br>_byte로 표시_ |
| **gcp.firebasehosting.storage.limit** <br>(gauge) | Firebase Hosting 저장소 한도<br>_byte로 표시_ |
| **gcp.firebasehosting.storage.total_bytes** <br>(gauge) | Firebase Hosting 저장소 크기<br>_byte로 표시_ |
| **gcp.firebasestorage.rules.evaluation_count** <br>(count) | 읽기 또는 쓰기 요청에 따라 실행된 Cloud Storage용 Firebase Security Rules 평가 횟수.|

### 이벤트

Google Firebase 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Firebase 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.