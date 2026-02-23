---
aliases:
- /ko/integrations/google_cloud_filestore
app_id: google-cloud-filestore
categories:
- cloud
- data stores
- google cloud
- log collection
custom_kind: integration
description: 파일 시스템 인터페이스가 필요한 애플리케이션에 공유 파일 시스템을 제공하는 관리 서비스
media: []
title: Google Cloud Filestore
---
## 개요

Google Cloud Filestore는 파일 시스템 인터페이스 및 데이터용 공유 파일 시스템이 필요한 애플리케이션을 위한 관리형 파일 스토리지 서비스입니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Filestore에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Filestore 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Filestore 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Filestore 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.file.nfs.server.average_read_latency** <br>(gauge) | 모든 디스크 읽기 작업의 평균 지연 시간(참고: 이 메트릭은 High Scale 인스턴스에만 표시됩니다).<br>_millisecond로 표시_ |
| **gcp.file.nfs.server.average_write_latency** <br>(gauge) | 모든 디스크 쓰기 작업의 평균 지연 시간(참고: 이 메트릭은 High Scale 인스턴스에만 표시됩니다).<br>_millisecond로 표시_ |
| **gcp.file.nfs.server.domain_reachable** <br>(gauge) | 적어도 하나의 AD 도메인 컨트롤러(DC)에 접근 가능하면 True.|
| **gcp.file.nfs.server.free_bytes** <br>(gauge) | 디스크 여유 공간 총 용량<br>_byte로 표시_ |
| **gcp.file.nfs.server.free_bytes_percent** <br>(gauge) | 디스크 여유 공간 용량 비율<br>_percent로 표시_ |
| **gcp.file.nfs.server.free_raw_capacity_percent** <br>(gauge) | 총 공간 대비 남은 원시 용량 비율. 값은 0.0에서 100.0 사이의 숫자입니다.<br>_percent로 표시_ |
| **gcp.file.nfs.server.instance_available** <br>(gauge) | e2e NFS 프로버가 sec=krb5를 사용하여 인스턴스를 정상적으로 탐지할 수 있으면 True.|
| **gcp.file.nfs.server.locks** <br>(gauge) | 락 개수<br>_lock으로 표시_ |
| **gcp.file.nfs.server.metadata_ops_count** <br>(count) | 디스크 메타데이터 작업 횟수(참고: 이 메트릭은  High Scale 인스턴스에만 표시됩니다).<br>_operation으로 표시_ |
| **gcp.file.nfs.server.procedure_call_count** <br>(count) | NFS 서버 프로시저 호출 횟수.|
| **gcp.file.nfs.server.read_bytes_count** <br>(count) | 디스크에서 읽은 바이트 수<br>_byte로 표시됨_ |
| **gcp.file.nfs.server.read_milliseconds_count** <br>(count) | 디스크 읽기 작업에 소요된 시간(밀리초)<br>_millisecond로 표시_ |
| **gcp.file.nfs.server.read_ops_count** <br>(count) | 디스크 읽기 작업 횟수. 60초마다 샘플링됩니다.<br>_operation으로 표시_ |
| **gcp.file.nfs.server.snapshots_used_bytes** <br>(gauge) | 스냅샷에 사용된 바이트 수.<br>_byte로 표시_ |
| **gcp.file.nfs.server.used_bytes** <br>(gauge) | 사용 디스크 용량(바이트)<br>_byte로 표시_ |
| **gcp.file.nfs.server.used_bytes_percent** <br>(gauge) | 사용 디스크 용량 비율<br>_percent로 표시_ |
| **gcp.file.nfs.server.write_bytes_count** <br>(count) | 디스크에 기록된 바이트 수<br>_byte로 표시됨_ |
| **gcp.file.nfs.server.write_milliseconds_count** <br>(count) | 디스크 쓰기 작업에 소요된 시간(밀리초)<br>_millisecond로 표시됨_ |
| **gcp.file.nfs.server.write_ops_count** <br>(count) | 디스크 쓰기 작업 횟수<br>_operation으로 표시됨_ |

### 이벤트

Google Cloud Filestore 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Filestore 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.