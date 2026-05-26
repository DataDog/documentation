---
aliases:
- /ko/integrations/google_cloud_composer
app_id: google-cloud-composer
categories:
- cloud
- configuration & deployment
- google cloud
- log collection
custom_kind: integration
description: 클라우드와 온프레미스 데이터 센터 전체의 파이프라인을 모니터링하고 일정을 예약해 주는 서비스
media: []
title: Google Cloud Composer
---
## 개요

Google Cloud Composer는 클라우드 및 온프레미스 데이터센터 전반에 걸쳐 파이프라인을 작성, 예약 및 모니터링할 수 있도록 도와드리는 완전관리형 워크플로우 오케스트레이션 서비스입니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud Composer에서 메트릭을 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google Cloud Composer 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud Composer 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud Composer 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.composer.environment.active_schedulers** <br>(gauge) | 활성 스케줄러 인스턴스 수.|
| **gcp.composer.environment.active_triggerers** <br>(gauge) | 활성 트리거 인스턴스 수.|
| **gcp.composer.environment.active_webservers** <br>(gauge) | 활성 웹 서버 인스턴스 수.|
| **gcp.composer.environment.api.request_count** <br>(count) | 지금까지 확인된 Composer API 요청 수<br>_request로 표시_ |
| **gcp.composer.environment.api.request_latencies.avg** <br>(gauge) | Composer API 호출 지연 시간 분포<br>_millisecond로 표시_ |
| **gcp.composer.environment.api.request_latencies.samplecount** <br>(count) | API 요청 대기 시간 샘플 수<br>_millisecond로 표시_ |
| **gcp.composer.environment.api.request_latencies.sumsqdev** <br>(gauge) | API 요청 지연 시간 제곱 편차 합계<br>_second로 표시_ |
| **gcp.composer.environment.celery.execute_command_failure_count** <br>(count) | Celery 태스크에서 0이 아닌 종료 코드의 누적 수(`celery.execute_command.failure` Airflow 메트릭에 해당).|
| **gcp.composer.environment.celery.task_timeout_error_count** <br>(count) | Celery Broker에 Task를 게시할 때 발생한  AirflowTaskTimeout 오류 누적 수(`celery.task_timeout_error` Airflow 메트릭에 해당).|
| **gcp.composer.environment.collect_db_dag_duration** <br>(gauge) | DB에서 직렬화된 모든 DAG를 가져오는 데 걸린 시간(`collect_db_dags` Airflow 메트릭에 해당)<br>_millisecond로 표시_  |
| **gcp.composer.environment.dag_callback.exception_count** <br>(count) | DAG 콜백에서 발생한 누적 예외 수(`dag.callback_exceptions` Airflow 메트릭에 해당).|
| **gcp.composer.environment.dag_file.refresh_error_count** <br>(count) | DAG 파일을 로딩 중 누적 실패 횟수(`dag_file_refresh_error` Airflow 메트릭에 해당).|
| **gcp.composer.environment.dag_processing.last_duration** <br>(gauge) | 지정된 DAG 파일을 로드하는 데 걸린 시간(`dag_processing.last_duration.<dag_file>` Airflow 메트릭에 해당)<br>_millisecond로 표시_ |
| **gcp.composer.environment.dag_processing.last_run_elapsed_time** <br>(gauge) | DAG 파일이 마지막으로 처리된 이후 시간(`dag_processing.last_run.seconds_ago.<dag_file>` Airflow 메트릭에 해당)<br>_second로 표시_ |
| **gcp.composer.environment.dag_processing.manager_stall_count** <br>(count) | DagFileProcessorManager의 누적 스톨 수(`dag_processing.manager_stalls` Airflow 메트릭에 해당).|
| **gcp.composer.environment.dag_processing.parse_error_count** <br>(count) | DAG 파일을 구문 분석하는 동안 발생한 오류 수<br>_ error로 표시_ |
| **gcp.composer.environment.dag_processing.processes** <br>(gauge) | 현재 실행 중인 DAG 구문 분석 프로세스 수<br>_process로 표시_ |
| **gcp.composer.environment.dag_processing.processor_timeout_count** <br>(count) | 처리 시간 초과로 인해 종료된 파일 프로세서 수.|
| **gcp.composer.environment.dag_processing.total_parse_time** <br>(gauge) | 모든 DAG 파일을 한 번 스캔하고 가져오는 데 걸리는 시간(초)<br>_second로 표시_ |
| **gcp.composer.environment.dagbag_size** <br>(gauge) | 현재 DAG 모음 크기. |
| **gcp.composer.environment.database.airflow.size** <br>(gauge) | Airflow 메타데이터 데이터베이스 크기<br>_byte로 표시_ |
| **gcp.composer.environment.database.auto_failover_request_count** <br>(count) | 인스턴스 자동 장애 조치 요청 누적 횟수.|
| **gcp.composer.environment.database.available_for_failover** <br>(gauge) | Cloud SQL 인스턴스가 HA(고가용성)로 활성화되어 있으며 장애 조치 준비가 완료된 경우 True(값 > 0)|
| **gcp.composer.environment.database.cpu.reserved_cores** <br>(gauge) | 데이터베이스 인스턴스에 예약된 코어 수<br>_core로 표시_ |
| **gcp.composer.environment.database.cpu.usage_time** <br>(count) | 데이터베이스 인스턴스 CPU 사용 시간(초)<br>_second로 표시_ |
| **gcp.composer.environment.database.cpu.utilization** <br>(gauge) | 데이터베이스 인스턴스의 CPU 사용률(0.0~1.0).|
| **gcp.composer.environment.database.disk.bytes_used** <br>(gauge) | 데이터베이스 인스턴스에서 사용된 디스크 공간(바이트)<br>_byte로 표시_ |
| **gcp.composer.environment.database.disk.quota** <br>(gauge) | 데이터베이스 인스턴스의 최대 데이터 디스크 크기(바이트)<br>_byte로 표시_ |
| **gcp.composer.environment.database.disk.utilization** <br>(gauge) | 데이터베이스 인스턴스의 디스크 할당량 사용률(0.0~1.0).|
| **gcp.composer.environment.database.memory.bytes_used** <br>(gauge) | 데이터베이스 인스턴스의 메모리 사용량(바이트)<br>_ byte로 표시_ |
| **gcp.composer.environment.database.memory.quota** <br>(gauge) | 데이터베이스 인스턴스의 최대 RAM 크기(바이트)<br>_byte로 표시_ |
| **gcp.composer.environment.database.memory.utilization** <br>(gauge) | 데이터베이스 인스턴스의 메모리 사용률(0.0~1.0).|
| **gcp.composer.environment.database.network.connections** <br>(gauge) | 데이터베이스 인스턴스의 동시 연결 수.|
| **gcp.composer.environment.database.network.max_connections** <br>(gauge) | 데이터베이스 인스턴스에 허용되는 최대 동시 연결 수.|
| **gcp.composer.environment.database.network.received_bytes_count** <br>(count) | 데이터베이스 인스턴스가 수신한 바이트 수<br>_byte로 표시_ |
| **gcp.composer.environment.database.network.sent_bytes_count** <br>(count) | 데이터베이스 인스턴스가 전송한 바이트 수<br>_ byte로 표시_  |
| **gcp.composer.environment.database_health** <br>(gauge) | Composer Airflow 데이터베이스 상태.|
| **gcp.composer.environment.database_retention.execution_durations.avg** <br>(gauge) | 데이터베이스 보존 작업 실행의 누적 기간 평균 분포<br>_second로 표시_ |
| **gcp.composer.environment.database_retention.execution_durations.samplecount** <br>(gauge) | 데이터베이스 보존 작업 실행의 누적 기간 분포 샘플 수<br>_second로 표시_ |
| **gcp.composer.environment.database_retention.execution_durations.sumsqdev** <br>(gauge) | 데이터베이스 보존 작업 실행 누적 기간 분포의 제곱 편차 합계<br>_second로 표시_ |
| **gcp.composer.environment.database_retention.finished_execution_count** <br>(count) | 데이터베이스 보존 실행 누적 횟수.|
| **gcp.composer.environment.database_retention.retention_gap** <br>(gauge) | 아직 정리가 필요한 오래된 데이터<br>_hour로 표시_ |
| **gcp.composer.environment.email.sla_notification_failure_count** <br>(count) | SLA 위반 이메일 알림 시도 실패 횟수.|
| **gcp.composer.environment.executor.open_slots** <br>(gauge) | 실행기에서 열린 슬롯 수.|
| **gcp.composer.environment.executor.queued_tasks** <br>(gauge) | 실행기에 대기 중인 태스크 수<br>_ task로 표시_ |
| **gcp.composer.environment.executor.running_tasks** <br>(gauge) | 실행기에서 실행 중인 태스크 수<br>_task로 표시_ |
| **gcp.composer.environment.finished_task_instance_count** <br>(count) | 완료된 태스크 인스턴스 전체 수<br>_ instance로 표시_ |
| **gcp.composer.environment.health.airflow_api_check_count** <br>(count) | Airflow API 점검 누적 횟수.|
| **gcp.composer.environment.health.autoscaling_check_count** <br>(count) | 자동 확장 구성 요소 점검 누적 횟수.|
| **gcp.composer.environment.health.cmek_encryption_check_count** <br>(count) | CMEK 암호화 점검 누적 횟수.|
| **gcp.composer.environment.health.container_restart_count** <br>(count) | 컨테이너 재시작 누적 횟수.|
| **gcp.composer.environment.health.dependency_check_count** <br>(count) | 종속성 점검 누적 횟수.|
| **gcp.composer.environment.health.dependency_permissions_check_count** <br>(count) | 종속성 권한 점검 누적 횟수.|
| **gcp.composer.environment.health.pod_event_count** <br>(count) | 포드 이벤트 누적 횟수.|
| **gcp.composer.environment.health.redis_queue_check_count** <br>(count) | Redis 대기열 점검 누적 횟수.|
| **gcp.composer.environment.healthy** <br>(gauge) | Composer 환경 상태.|
| **gcp.composer.environment.job.count** <br>(count) | 시작된 작업(예: SchedulerJob, LocalTaskJob) 누적 개수(`<job_name>_start`, `<job_name>_end` Airflow 메트릭에 해당).|
| **gcp.composer.environment.job.heartbeat_failure_count** <br>(count) | 작업에서 발생한 하트비트 실패 누적 횟수(`<job_name>_heartbeat_failure` Airflow 메트릭에 해당).|
| **gcp.composer.environment.maintenance_operation** <br>(gauge) | 특정 유형의 유지보수 작업이 있는지에 관한 정보.|
| **gcp.composer.environment.num_celery_workers** <br>(gauge) | Celery 워커 수<br>_worker로 표시됨_ |
| **gcp.composer.environment.operator.created_task_instance_count** <br>(count) | 오퍼레이터별 생성된 태스크 인스턴스 누적 수(`task_instance_created-<operator_name>` Airflow 메트릭에 해당).|
| **gcp.composer.environment.operator.finished_task_instance_count** <br>(count) | 오퍼레이터별 완료된 태스크 인스턴스 누적 수( `operator_successes_<operator_name>`, `operator_failures_<operator_name>` Airflow 메트릭에 해당).|
| **gcp.composer.environment.pool.open_slots** <br>(gauge) | 풀에서 사용 가능한 슬롯 수.|
| **gcp.composer.environment.pool.queued_slots** <br>(gauge) | 풀에 대기 중인 슬롯 수(`pool.queued_slots.<pool_name>` Airflow 메트릭에 해당).|
| **gcp.composer.environment.pool.running_slots** <br>(gauge) | 풀에서 실행 중인 슬롯 수.|
| **gcp.composer.environment.pool.starving_tasks** <br>(gauge) | 풀에서 대기 중인 태스크 수.|
| **gcp.composer.environment.scheduler.critical_section_duration** <br>(gauge) | 스케줄러 루프의 크리티컬 섹션에서 소요된 시간 – 한 번에 하나의 스케줄러만 이 루프에 진입할 수 있음(`scheduler.critical_section_duration` Airflow 메트릭에 해당).<br>_millisecond로 표시_ |
| **gcp.composer.environment.scheduler.critical_section_lock_failure_count** <br>(count) | 스케줄러 프로세스가 작업을 실행자로 보내기 위해 크리티컬 섹션의 락을 얻으려 시도했으나, 다른 프로세스에 의해 이미 잠겨 있었던 누적 횟수(`scheduler.critical_section_busy` Airflow 메트릭에 해당).|
| **gcp.composer.environment.scheduler.pod_eviction_count** <br>(count) | Airflow 스케줄러 포드 퇴출 수.|
| **gcp.composer.environment.scheduler.task.externally_killed_count** <br>(count) | 외부에서 종료된 태스크 누적 수(`scheduler.tasks.killed_externally` Airflow 메트릭에 해당).|
| **gcp.composer.environment.scheduler.task.orphan_count** <br>(count) | 정리되거나 재할당된 고아 태스크 누적 개수(`scheduler.orphaned_tasks.cleared`, `scheduler.orphaned_tasks.adopted` Airflow 메트릭에 해당).|
| **gcp.composer.environment.scheduler.tasks** <br>(gauge) | 스케줄러가 관리하는 태스크 수(`scheduler.tasks.running`, `scheduler.tasks.starving`, `scheduler.tasks.executable` Airflow 메트릭에 해당).|
| **gcp.composer.environment.scheduler_heartbeat_count** <br>(count) | 스케줄러 하트비트.|
| **gcp.composer.environment.sla_callback_notification_failure_count** <br>(count) | 실패한 SLA 미스 콜백 알림 시도의 누적 횟수(`sla_callback_notification_failure` Airflow 메트릭에 해당).|
| **gcp.composer.environment.smart_sensor.exception_failures** <br>(gauge) | 이전 스마트 센서 포킹 루프에서 예외로 인해 발생한 실패 횟수.|
| **gcp.composer.environment.smart_sensor.infra_failures** <br>(gauge) | 이전 스마트 센서 포킹 루프에서 발생한 인프라 장애 횟수.|
| **gcp.composer.environment.smart_sensor.poked_exception** <br>(gauge) | 이전 스마트 센서 포킹 루프에서 예외가 발생한 횟수.|
| **gcp.composer.environment.smart_sensor.poked_success** <br>(gauge) | 이전 포킹 루프에서 스마트 센서가 새로 포킹한 태스크 수.|
| **gcp.composer.environment.smart_sensor.poked_tasks** <br>(gauge) | 이전 포킹 루프에서 스마트 센서가 포킹한 태스크 수.|
| **gcp.composer.environment.snapshot.creation_count** <br>(count) | 생성된 예약 스냅샷 수.|
| **gcp.composer.environment.snapshot.creation_elapsed_time** <br>(gauge) | 마지막 예약 스냅샷 생성 후 경과 시간<br>_second로 표시_ |
| **gcp.composer.environment.snapshot.size** <br>(gauge) | 마지막 예약 스냅샷 크기(바이트)<br>_byte로 표시_ |
| **gcp.composer.environment.task_instance.previously_succeeded_count** <br>(count) | 태스크 인스턴스가 실행 전에 이미 SUCCESS 상태였던 누적 횟수(`previously_succeeded` Airflow 메트릭에 해당).|
| **gcp.composer.environment.task_queue_length** <br>(gauge) | 큐에 있는 태스크 수<br>_task로 표시_ |
| **gcp.composer.environment.trigger.blocking_count** <br>(count) | 트리거의 메인 스레드를 차단한 트리거 총 개수.|
| **gcp.composer.environment.trigger.failed_count** <br>(count) | 실패한 트리거 총 개수.|
| **gcp.composer.environment.trigger.succeeded_count** <br>(count) | 성공한 트리거 총 개수.|
| **gcp.composer.environment.unfinished_task_instances** <br>(gauge) | 완료되지 않은 상태의 전체 태스크 인스턴스<br>_instance로 표시_ |
| **gcp.composer.environment.web_server.cpu.reserved_cores** <br>(gauge) | 웹 서버 인스턴스를 위해 예약된 코어 수<br>_core로 표시_ |
| **gcp.composer.environment.web_server.cpu.usage_time** <br>(count) | 웹 서버 인스턴스 CPU 사용 시간(초)<br>_second로 표시_ |
| **gcp.composer.environment.web_server.health** <br>(gauge) | Airflow 웹 서버 상태.|
| **gcp.composer.environment.web_server.memory.bytes_used** <br>(gauge) | 웹 서버 인스턴스 메모리 사용량(바이트)<br>_byte로 표시_ |
| **gcp.composer.environment.web_server.memory.quota** <br>(gauge) | 웹 서버 인스턴스 최대 RAM 크기(바이트)<br>_byte로 표시_ |
| **gcp.composer.environment.worker.max_workers** <br>(gauge) | Airflow 워커 최대 수<br>_worker로 표시_ |
| **gcp.composer.environment.worker.min_workers** <br>(gauge) | Airflow 워커 최소 수<br>_worker로 표시_ |
| **gcp.composer.environment.worker.pod_eviction_count** <br>(count) | Airflow 워커 포드 퇴출 수<br>_eviction으로 표시_ |
| **gcp.composer.environment.worker.scale_factor_target** <br>(gauge) | Airflow 워커 수 조정 계수.|
| **gcp.composer.environment.zombie_task_killed_count** <br>(count) | 종료된 좀비 태스크 수<br>_ task로 표시_ |
| **gcp.composer.workflow.dag.run_duration** <br>(gauge) | DAG 실행이 종료 상태에 도달하는 데 걸린 시간(`dagrun.duration.success.<dag_id>`, `dagrun.duration.failed.<dag_id>` Airflow 메트릭에 해당).<br>_millisecond로 표시_ |
| **gcp.composer.workflow.dependency_check_duration** <br>(gauge) | DAG 종속성 확인에 걸린 시간(`dagrun.dependency-check.<dag_id>` Airflow 메트릭에 해당).<br>_millisecond로 표시_  |
| **gcp.composer.workflow.run_count** <br>(count) | 지금까지 완료된 워크플로 실행 수.|
| **gcp.composer.workflow.run_duration** <br>(gauge) | 워크플로우 실행 완료 소요 시간<br>_second로 표시_ |
| **gcp.composer.workflow.schedule_delay** <br>(gauge) | 예정된 DagRun 시작일과 실제 DagRun 시작일 사이의 지연(`dagrun.schedule_delay.<dag_id>` Airflow 메트릭에 해당).<br>_millisecond로 표시_  |
| **gcp.composer.workflow.task.log_file_size** <br>(gauge) | 워크플로 태스크가 생성한 로그 파일 크기(바이트)<br>_byte로 표시_ |
| **gcp.composer.workflow.task.removed_from_dag_count** <br>(count) | 특정 DAG에서 제거된 태스크 수의 누적값 (즉, 해당 작업이 더 이상 DAG에 존재하지 않음)( `task_removed_from_dag.<dag_id>` Airflow 메트릭에 해당).|
| **gcp.composer.workflow.task.restored_to_dag_count** <br>(count) | 특정 DAG에서 복원된 태스크 수의 누적값 (즉, DB에서 이전에 REMOVED 상태였던 태스크 인스턴스가 DAG 파일에 다시 추가된 경우(`task_restored_to_dag.<dag_id>` Airflow 메트릭에 해당).|
| **gcp.composer.workflow.task.run_count** <br>(count) | 지금까지 완료된 워크플로 태스크 수<br>_task로 표시_ |
| **gcp.composer.workflow.task.run_duration** <br>(gauge) | 태스크 완료 시간<br>_second로 표시_ |
| **gcp.composer.workflow.task.schedule_delay** <br>(gauge) | 첫 번째 태스크 시작일과 DagRun 예상 시작일 사이의 경과 시간(`dagrun.<dag_id>.first_task_scheduling_delay` Airflow 메트릭에 해당).<br>_millisecond로 표시_  |
| **gcp.composer.workflow.task_instance.finished_count** <br>(count) | 완료된 태스크 인스턴스 누적 수(`ti.finish.<dag_id>.<task_id>.<state>` Airflow 메트릭에 해당).|
| **gcp.composer.workflow.task_instance.queued_duration** <br>(gauge) | 대기열 상태에서 걸린 시간(`dag.<dag_id>.<task_id>.queued_duration` Airflow 메트릭에 해당)<br>_millisecond로 표시_ |
| **gcp.composer.workflow.task_instance.run_duration** <br>(gauge) | 작업을 완료하는 데 걸린 시간(`dag.<dag_id>.<task_id>.duration` Airflow 메트릭에 해당)<br>_millisecond로 표시_ |
| **gcp.composer.workflow.task_instance.started_count** <br>(count) | 주어진 DAG에서 시작된 태스크 누적 수(`ti.start.<dag_id>.<task_id>` Airflow 메트릭에 해당).|
| **gcp.composer.workflow.task_runner.terminated_count** <br>(count) | 태스크 러너가 반환 코드와 함께 종료된 워크플로 태스크 수.|
| **gcp.composer.workload.cpu.reserved_cores** <br>(gauge) | 워크로드 인스턴스에 예약된 코어 수.|
| **gcp.composer.workload.cpu.usage_time** <br>(count) | 워크로드 인스턴스 CPU 사용 시간<br>_second로 표시_ |
| **gcp.composer.workload.disk.bytes_used** <br>(gauge) | 워크로드 인스턴스에서 사용된 디스크 공간(바이트)<br>_byte로 표시_ |
| **gcp.composer.workload.disk.quota** <br>(gauge) | 워크로드 인스턴스 최대 데이터 디스크 크기(바이트)<br>_byte로 표시_ |
| **gcp.composer.workload.log_entry_count** <br>(count) | 지정된 심각도 수준의 로그 발생 누적 횟수.|
| **gcp.composer.workload.memory.bytes_used** <br>(gauge) | 워크로드 인스턴스 메모리 사용량(바이트)<br>_byte로 표시_ |
| **gcp.composer.workload.memory.quota** <br>(gauge) | 워크로드 인스턴스 최대 RAM 크기(바이트)<br>_byte로 표시_ |
| **gcp.composer.workload.restart_count** <br>(count) | 워크로드 재시작 누적 횟수.|
| **gcp.composer.workload.trigger.num_running** <br>(gauge) | 트리거에서 실행 중인 트리거 수.|
| **gcp.composer.workload.uptime** <br>(gauge) | 워크로드 생성 이후 시간<br>_second로 표시_  |

### 이벤트

Google Cloud Composer 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Composer 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.