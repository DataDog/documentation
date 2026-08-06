---
aliases:
- /ko/integrations/google_cloud_datastore
app_id: google-cloud-datastore
categories:
- cloud
- data stores
- google cloud
- log collection
- mobile
custom_kind: integration
description: Cloud Datastore는 확장성이 뛰어난 웹 및 모바일 애플리케이션용 NoSQL 데이터베이스입니다.
media: []
title: Google Cloud Datastore
---
## 개요

Cloud Datastore는 확장성이 뛰어난 웹 및 모바일 애플리케이션용 NoSQL 데이터베이스입니다.

Google Datastore 메트릭을 수집하면 다음을 할 수 있습니다.

- 데이터스토어의 성능을 시각화합니다.
- 데이터스토어의 성능과 애플리케이션의 상관관계를 파악합니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Datastore 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Datastore 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Datastore 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.datastore.api.request_count** <br>(count) | Datastore API 호출<br>_request로 표시_ |
| **gcp.datastore.entity.read_sizes.avg** <br>(gauge) | 읽은 엔티티 크기의 평균<br>_byte로 표시_ |
| **gcp.datastore.entity.read_sizes.samplecount** <br>(count) | 읽은 엔티티 크기 샘플 수<br>_byte로 표시_ |
| **gcp.datastore.entity.read_sizes.sumsqdev** <br>(gauge) | 읽은 엔티티 크기 제곱편차 합계<br>_byte로 표시_ |
| **gcp.datastore.entity.ttl_deletion_count** <br>(count) | TTL 서비스에서 삭제된 엔티티 총 개수.|
| **gcp.datastore.entity.ttl_expiration_to_deletion_delays.avg** <br>(count) | TTL이 설정된 엔티티가 만료된 시점부터 실제로 삭제된 시점까지 경과된 평균 시간<br>_second로 표시_ |
| **gcp.datastore.entity.ttl_expiration_to_deletion_delays.samplecount** <br>(count) | TTL이 설정된 엔티티가 만료된 시점부터 실제로 삭제된 시점까지 경과 시간 샘플 수<br>_second로 표시_ |
| **gcp.datastore.entity.ttl_expiration_to_deletion_delays.sumsqdev** <br>(count) | TTL이 설정된 엔티티가 만료된 시점부터 실제로 삭제된 시점까지 경과 시간 제곱편차 합계<br>_second로 표시_ |
| **gcp.datastore.entity.write_sizes.avg** <br>(gauge) | 쓰기 완료된 엔티티 크기의 평균<br>_byte로 표시_ |
| **gcp.datastore.entity.write_sizes.samplecount** <br>(gauge) | 쓰기 완료된 엔티티 크기 샘플 수<br>_byte로 표시_ |
| **gcp.datastore.entity.write_sizes.sumsqdev** <br>(gauge) | 쓰기 완료된 엔티티 크기 제곱편차 합계<br>_byte로 표시_ |
| **gcp.datastore.index.write_count** <br>(count) | Datastore 인덱스 쓰기<br>_write로 표시_ |

### 이벤트

Google Cloud Datastore 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Datastore 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.