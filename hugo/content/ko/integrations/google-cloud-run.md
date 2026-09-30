---
aliases:
- /ko/integrations/google_cloud_run
app_id: google-cloud-run
categories:
- 클라우드
- 컨테이너
- google cloud
- 로그 수집
- 오케스트레이션
custom_kind: 통합
description: 관리형 컴퓨팅 플랫폼에서 HTTP 요청을 통해 호출된 스테이트리스 컨테이너를 실행합니다.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-cloud-run-datadog/
  tag: 블로그
  text: Datadog으로 Cloud Run 모니터링
- link: https://www.datadoghq.com/blog/collecting-cloud-run-metrics/
  tag: 블로그
  text: Google Cloud Run 메트릭을 수집하는 방법
- link: https://www.datadoghq.com/blog/key-metrics-for-cloud-run-monitoring/
  tag: 블로그
  text: Google Cloud Run 모니터링을 위한 주요 메트릭
- link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
  tag: 설명서
  text: Google Cloud Run 문서
media: []
title: Google Cloud Run
---
## 개요

Cloud Run은 HTTP 요청으로 호출 가능한 스테이트리스(Stateless) 컨테이너를 실행할 수 있게 해주는 관리형 컴퓨팅 플랫폼입니다.

이 통합을 사용하고 컨테이너를 계측하여 Datadog의 모든 Cloud Run 메트릭, 트레이스, 로그를 확인하세요.

Cloud Run for Anthos에 관한 자세한 내용은 [Google Cloud Run for Anthos 문서](https://docs.datadoghq.com/integrations/google-cloud-run-for-anthos/)를 참고하세요.

## 설정

### 메트릭 수집

#### 설치

기본 메트릭 수집을 시작하려면 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 커스텀 메트릭을 설정하려면 [서버리스 문서](https://docs.datadoghq.com/serverless/google_cloud_run)를 참조하세요.

### 로그 수집

#### 통합

Google Cloud Run은 [감사 로그]를 노출합니다(https://cloud.google.com/run/docs/audit-logging).
Google Cloud Run 로그는 Google Cloud Logging으로 수집되어 Cloud Pub/Sub 토픽을 통해 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

이 작업이 완료되면 Google Cloud Logging에서 Google Cloud Run 로그를 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Run 로그를 필터링하세요.

1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.

1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub/Sub로 내보내기" >}}

1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

#### 직접 로깅

Cloud Run 서비스에서 Datadog에 직접 애플리케이션을 로깅하는 자세한 방법은 [서버리스 문서](https://docs.datadoghq.com/serverless/google_cloud_run)를 참조하세요.

### 추적

완전 관리형 Google Cloud Run에 대한 전용 Agent 설정 지침은 [서버리스 문서](https://docs.datadoghq.com/serverless/google_cloud_run)에서 확인하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.run.container.billable_instance_time** <br>(rate) | 리비전의 모든 컨테이너 인스턴스에서 집계된 과금 시간(ms/s).<br>_millisecond로 표시_ |
| **gcp.run.container.completed_probe_attempt_count** <br>(count) | 완료된 상태 점검 프로브(health check probe) 시도 횟수와 결과.|
| **gcp.run.container.completed_probe_count** <br>(count) | 완료된 상태 점검 프로브(health check probe) 횟수와 결과.|
| **gcp.run.container.containers** <br>(gauge) | 상태별로 분류된 현재 컨테이너 인스턴스의 수.|
| **gcp.run.container.cpu.allocation_time** <br>(rate) | 리비전의 컨테이너 CPU 할당 시간(초).<br>_core로 표시_ |
| **gcp.run.container.cpu.usage.avg** <br>(gauge) | 메트릭 필드인 컨테이너 이름별로 분류된, 실제 컨테이너 CPU 평균 사용 시간(CPU 초).<br>_second로 표시_ |
| **gcp.run.container.cpu.usage.samplecount** <br>(gauge) | 메트릭 필드인 컨테이너 이름별로 분류된, 실제 컨테이너 CPU 평균 사용 시간(CPU 초).<br>_second로 표시_ |
| **gcp.run.container.cpu.usage.sumsqdev** <br>(gauge) | 메트릭 필드인 컨테이너 이름별로 분류된, 실제 컨테이너 CPU 사용 시간(CPU 초)의 편차 제곱합.<br>_second로 표시_ |
| **gcp.run.container.cpu.utilizations.avg** <br>(gauge) | 리비전의 모든 컨테이너 인스턴스의 평균 컨테이너 CPU 사용률 분포.<br>_fraction으로 표시_ |
| **gcp.run.container.cpu.utilizations.p95** <br>(gauge) | 리비전의 모든 컨테이너 인스턴스의 컨테이너 CPU 사용률의 95번째 백분위수 분포.<br>_fraction으로 표시_ |
| **gcp.run.container.cpu.utilizations.p99** <br>(gauge) | 리비전의 모든 컨테이너 인스턴스의 컨테이너 CPU 사용률의 99번째 백분위수 분포.<br>_fraction으로 표시_ |
| **gcp.run.container.cpu.utilizations.samplecount** <br>(count) | 서비스 요청 시간 분포의 샘플 수(밀리초).<br>_fraction으로 표시_ |
| **gcp.run.container.gpu.memory_usages.avg** <br>(gauge) | 모든 컨테이너 인스턴스의 평균 컨테이너 GPU 메모리 사용량 분포.<br>_byte로 표시_ |
| **gcp.run.container.gpu.memory_usages.samplecount** <br>(gauge) | 모든 컨테이너 인스턴스의 컨테이너 GPU 메모리 사용량 분포의 샘플 수.<br>_byte로 표시_ |
| **gcp.run.container.gpu.memory_usages.sumsqdev** <br>(gauge) | 모든 컨테이너 인스턴스의 컨테이너 GPU 메모리 사용량 분포의 편차 제곱합.<br>_byte로 표시_ |
| **gcp.run.container.gpu.memory_utilizations.avg** <br>(gauge) | 모든 컨테이너 인스턴스의 평균 컨테이너 GPU 메모리 사용률 분포.|
| **gcp.run.container.gpu.memory_utilizations.samplecount** <br>(gauge) | 모든 컨테이너 인스턴스의 컨테이너 GPU 메모리 사용률 분포의 샘플 수.|
| **gcp.run.container.gpu.memory_utilizations.sumsqdev** <br>(gauge) | 모든 컨테이너 인스턴스의 컨테이너 GPU 메모리 사용률 분포의 편차 제곱합.|
| **gcp.run.container.gpu.utilizations.avg** <br>(gauge) | 모든 컨테이너 인스턴스의 평균 컨테이너 GPU 사용률 분포.|
| **gcp.run.container.gpu.utilizations.samplecount** <br>(gauge) | 모든 컨테이너 인스턴스의 컨테이너 GPU 사용률 분포의 샘플 수.|
| **gcp.run.container.gpu.utilizations.sumsqdev** <br>(gauge) | 모든 컨테이너 인스턴스의 컨테이너 GPU 사용률 분포의 편차 제곱합.|
| **gcp.run.container.instance_count** <br>(gauge) | 상태별로 분류된 현재 컨테이너 인스턴스의 수.<br>_container로 표시_ |
| **gcp.run.container.max_request_concurrencies.avg** <br>(gauge) | 1분 동안 각 컨테이너 인스턴스에서 처리되는 평균 최대 동시 요청 수.<br>_request로 표시_ |
| **gcp.run.container.max_request_concurrencies.p95** <br>(gauge) | 1분 동안 각 컨테이너 인스턴스에서 처리되는 최대 동시 요청 수의 95번째 백분위수 분포.<br>_request로 표시_ |
| **gcp.run.container.max_request_concurrencies.p99** <br>(gauge) | 1분 동안 각 컨테이너 인스턴스에서 처리되는 최대 동시 요청 수의 99번째 백분위수 분포.<br>_request로 표시_ |
| **gcp.run.container.max_request_concurrencies.samplecount** <br>(count) | 1분 동안 각 컨테이너 인스턴스에서 처리되는 최대 동시 요청 수 분포의 샘플 수.<br>_request로 표시_ |
| **gcp.run.container.memory.allocation_time** <br>(rate) | 리비전의 컨테이너 메모리 할당량(기가바이트-초).<br>_gibibyte로 표시_ |
| **gcp.run.container.memory.usage.avg** <br>(gauge) | 메트릭 필드인 컨테이너 이름별로 분류된, 실제 컨테이너 메모리 평균 사용량(바이트).<br>_byte로 표시_ |
| **gcp.run.container.memory.usage.samplecount** <br>(gauge) | 메트릭 필드인 컨테이너 이름별로 분류된, 실제 컨테이너 메모리 사용량(바이트)의 샘플 수.<br>_byte로 표시_ |
| **gcp.run.container.memory.usage.sumsqdev** <br>(gauge) | 메트릭 필드인 컨테이너 이름별로 분류된, 실제 컨테이너 메모리 사용량(바이트)의 편차 제곱합.<br>_byte로 표시_ |
| **gcp.run.container.memory.utilizations.avg** <br>(gauge) | 리비전의 모든 컨테이너 인스턴스의 평균 컨테이너 메모리 사용률 분포.<br>_fraction으로 표시_ |
| **gcp.run.container.memory.utilizations.p95** <br>(gauge) | 리비전의 모든 컨테이너 인스턴스의 컨테이너 메모리 사용률의 95번째 백분위수 분포.<br>_fraction으로 표시_ |
| **gcp.run.container.memory.utilizations.p99** <br>(gauge) | 리비전의 모든 컨테이너 인스턴스의 컨테이너 메모리 사용률의 99번째 백분위수 분포.<br>_fraction으로 표시_ |
| **gcp.run.container.memory.utilizations.samplecount** <br>(count) | 리비전의 모든 컨테이너 인스턴스의 컨테이너 메모리 사용률 분포의 샘플 수.<br>_fraction으로 표시_ |
| **gcp.run.container.network.received_bytes_count** <br>(count) | 리비전 수신 소켓 및 HTTP 응답 트래픽(바이트).<br>_byte로 표시_ |
| **gcp.run.container.network.sent_bytes_count** <br>(count) | 리비전 송신 소켓 및 HTTP 응답 트래픽(바이트).<br>_byte로 표시_ |
| **gcp.run.container.network.throttled_inbound_bytes_count** <br>(count) | 네트워크 스로틀링으로 드롭된 수신 바이트 수.<br>_byte로 표시_ |
| **gcp.run.container.network.throttled_inbound_packets_count** <br>(count) | 네트워크 스로틀링으로 드롭된 수신 패킷 수.<br>_byte로 표시_ |
| **gcp.run.container.network.throttled_outbound_bytes_count** <br>(count) | 네트워크 스로틀링으로 드롭된 송신 바이트 수.<br>_byte로 표시_ |
| **gcp.run.container.network.throttled_outbound_packets_count** <br>(count) | 네트워크 스로틀링으로 드롭된 송신 패킷 수.<br>_byte로 표시_ |
| **gcp.run.container.probe_attempt_latencies.avg** <br>(count) | 단일 프로브 시도가 성공 또는 실패하기까지 소요된 평균 시간 분포(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.probe_attempt_latencies.samplecount** <br>(count) | 단일 프로브 시도가 성공 또는 실패하기까지 소요된 시간 분포의 샘플 수(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.probe_attempt_latencies.sumsqdev** <br>(count) | 단일 프로브 시도가 성공 또는 실패하기까지 소요된 시간 분포의 편차 제곱합(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.probe_latencies.avg** <br>(count) | 프로브가 성공 또는 실패하기까지 소요된 평균 시간 분포(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.probe_latencies.samplecount** <br>(count) | 프로브가 성공 또는 실패하기까지 소요된 시간 분포의 샘플 수(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.probe_latencies.sumsqdev** <br>(count) | 프로브가 성공 또는 실패하기까지 소요된 시간 분포의 편차 제곱합(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.startup_latencies.avg** <br>(count) | 새 컨테이너 인스턴스를 시작하는 데 소요된 평균 시간 분포(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.startup_latencies.samplecount** <br>(count) | 새 컨테이너 인스턴스를 시작하는 데 소요된 시간 분포의 샘플 수(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.container.startup_latencies.sumsqdev** <br>(count) | 새 컨테이너 인스턴스를 시작하는 데 소요된 시간 분포의 편차 제곱합(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.infrastructure.cloudsql.connection_latencies.avg** <br>(count) | Cloud Run에서 Cloud SQL로 향하는 연결의 레이턴시 평균 분포(마이크로초).<br>_microsecond로 표시_ |
| **gcp.run.infrastructure.cloudsql.connection_latencies.samplecount** <br>(count) | Cloud Run에서 Cloud SQL로 향하는 연결의 레이턴시 분포 샘플 개수(마이크로초).<br>_microsecond로 표시_ |
| **gcp.run.infrastructure.cloudsql.connection_latencies.sumsqdev** <br>(count) | Cloud Run에서 Cloud SQL로 향하는 연결의 레이턴시 분포의 편차 제곱합(마이크로초).<br>_microsecond로 표시_ |
| **gcp.run.infrastructure.cloudsql.connection_refused_count** <br>(count) | Cloud Run에서 Cloud SQL로 향하는 거부된 총 연결 수.|
| **gcp.run.infrastructure.cloudsql.connection_request_count** <br>(count) | Cloud Run에서 Cloud SQL로 향하는 총 연결 요청 수.|
| **gcp.run.infrastructure.cloudsql.received_bytes_count** <br>(count) | Cloud Run이 네트워크를 통해 Cloud SQL로부터 수신한 바이트 수.<br>_byte로 표시_ |
| **gcp.run.infrastructure.cloudsql.sent_bytes_count** <br>(count) | Cloud Run이 네트워크를 통해 Cloud SQL로 전송한 바이트 수.<br>_byte로 표시_ |
| **gcp.run.job.completed_execution_count** <br>(count) | 완료된 작업 실행 수 및 결과.|
| **gcp.run.job.completed_task_attempt_count** <br>(count) | 완료된 작업 시도 횟수 및 해당 종료 결과.|
| **gcp.run.job.running_executions** <br>(gauge) | 실행 중인 작업 수.|
| **gcp.run.job.running_task_attempts** <br>(gauge) | 실행 중인 작업 시도 횟수.|
| **gcp.run.pending_queue.pending_requests** <br>(gauge) | 보류 중인 요청 수.|
| **gcp.run.request_count** <br>(count) | 서비스 요청 수.<br>_request로 표시됨_ |
| **gcp.run.request_latencies.avg** <br>(gauge) | 서비스 요청 시간의 평균 분포(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.request_latencies.p95** <br>(gauge) | 서비스 요청 시간의 95번째 백분위수 분포(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.request_latencies.p99** <br>(gauge) | 서비스 요청 시간의 99번째 백분위수 분포(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.request_latencies.samplecount** <br>(count) | 서비스 요청 시간 분포의 샘플 수(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.request_latencies.sumsqdev** <br>(gauge) | 서비스 요청 시간 분포의 편차 제곱합(밀리초).<br>_millisecond로 표시_ |
| **gcp.run.enhanced.cold_start** <br>(count) | 컨테이너 또는 함수가 콜드 스타트(Cold start)로 초기화된 횟수.|
| **gcp.run.enhanced.shutdown** <br>(count) | 컨테이너 또는 함수가 셧다운된 횟수.|
| **gcp.run.job.enhanced.task.started** <br>(count) | 작업 시작 횟수.|
| **gcp.run.job.enhanced.task.ended** <br>(count) | 작업 종료 횟수.|
| **gcp.run.job.enhanced.task.duration** <br>(gauge) | 실행 중인 작업 하나당 평균 소요 시간.<br>_millisecond로 표시됨_ |

### 이벤트

Google Cloud Functions 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Google Cloud Functions 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}