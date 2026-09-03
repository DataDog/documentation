---
aliases:
- /ko/integrations/google_cloud_tasks
app_id: google-cloud-tasks
categories:
- cloud
- google cloud
- log collection
custom_kind: integration
description: 대량 분산 작업의 실행, 디스패칭, 전송을 관리하할 수 있는 관리형 서비스입니다.
media: []
title: Google Cloud Tasks
---
## 개요

Google Cloud Tasks는 대량의 분산 작업의 실행, 디스패칭, 전송을 관리할 수 있는 완전관리형 서비스입니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Tasks에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Task 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Tasks 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Task 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.cloudtasks.api.request_count** <br>(count) | Cloud Task API 호출 수.<br>_request로 표시_ |
| **gcp.cloudtasks.queue.depth** <br>(gauge) | 대기열에 있는 작업 수.|
| **gcp.cloudtasks.queue.task_attempt_count** <br>(count) | 응답 코드별로 분류된 작업 시도 횟수.|
| **gcp.cloudtasks.queue.task_attempt_delays.avg** <br>(gauge) | 예약된 시도 시간과 실제 시도 시간 사이의 지연 시간.<br>_millisecond로 표시_ |
| **gcp.cloudtasks.queue.task_attempt_delays.samplecount** <br>(count) | 작업 시도 지연 시간의 샘플 수.<br>_millisecond로 표시_ |
| **gcp.cloudtasks.queue.task_attempt_delays.sumsqdev** <br>(gauge) | 작업 시도 지연 시간의 제곱 편차 합.<br>_second로 표시_ |

### 이벤트

Google Cloud Tasks 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Tasks 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.