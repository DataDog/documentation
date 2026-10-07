---
app_id: airbyte
categories:
- ai/ml
- 데이터 저장
custom_kind: integration
description: Airbyte 배포 상태를 모니터링하세요.
integration_version: 1.0.0
media: []
supported_os:
- 리눅스
- windows
- macos
title: Airbyte
---
## 개요

이 점검은 [Airbyte](https://airbyte.com/)를 모니터링합니다. 메트릭은 [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd)를 통해 Datadog으로 전송됩니다.

## 설정

### 설치

Airbyte 통합이 제대로 작동하려면 아래 모든 단계가 필요합니다. 시작하기 전에 StatsD/DogStatsD 매핑 기능이 포함된 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 버전 `>=6.17` 또는 `>=7.17` 이상을 설치하세요.

### 설정

1. Datadog에 메트릭을 전송하도록 Airbyte 배포를 구성합니다(https://docs.airbyte.com/operator-guides/collecting-metrics/).
1. 다음 구성을 추가하여 [Datadog Agent 기본 구성 파일](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) `datadog.yaml`을 업데이트합니다.

```yaml
dogstatsd_mapper_profiles:
  - name: airbyte_worker
    prefix: "worker."
    mappings:
      - match: "worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "worker.*"
        name: "airbyte.worker.$1"
  - name: airbyte_cron
    prefix: "cron."
    mappings:
      - match: "cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
      - match: "cron.*"
        name: "airbyte.cron.$1"
  - name: airbyte_metrics_reporter
    prefix: "metrics-reporter."
    mappings:
      - match: "metrics-reporter.*"
        name: "airbyte.metrics_reporter.$1"
  - name: airbyte_orchestrator
    prefix: "orchestrator."
    mappings:
      - match: "orchestrator.*"
        name: "airbyte.orchestrator.$1"
  - name: airbyte_server
    prefix: "server."
    mappings:
      - match: "server.*"
        name: "airbyte.server.$1"
  - name: airbyte_general
    prefix: "airbyte."
    mappings:
      - match: "airbyte.worker.temporal_workflow_*"
        name: "airbyte.worker.temporal_workflow.$1"
      - match: "airbyte.worker.worker_*"
        name: "airbyte.worker.$1"
      - match: "airbyte.worker.state_commit_*"
        name: "airbyte.worker.state_commit.$1"
      - match: "airbyte.worker.job_*"
        name: "airbyte.worker.job.$1"
      - match: "airbyte.worker.attempt_*"
        name: "airbyte.worker.attempt.$1"
      - match: "airbyte.worker.activity_*"
        name: "airbyte.worker.activity.$1"
      - match: "airbyte.cron.cron_jobs_run"
        name: "airbyte.cron.jobs_run"
```

3. [Agent](https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent)와 Airbyte를 다시 시작합니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **airbyte.cron.jobs_run** <br>(count) | CRON 유형별 CRON 실행 횟수.|
| **airbyte.cron.workflows_healed** <br>(count) | 자체 복구 CRON이 복구한 워크플로 수.|
| **airbyte.metrics_reporter.est_num_metrics_emitted_by_reporter** <br>(count) | 마지막 간격에서 리포터가 방출한 추정 메트릭. 정확한 개수가 아닌 추정치입니다.|
| **airbyte.metrics_reporter.num_orphan_running_jobs** <br>(gauge) | 비활성화되었거나 사용 중단된 연결에 연관된 실행 중인 작업 수.<br>_job으로 표시됨_ |
| **airbyte.metrics_reporter.num_pending_jobs** <br>(gauge) | 보류 중인 작업 수.<br>_job으로 표시됨_ |
| **airbyte.metrics_reporter.num_running_jobs** <br>(gauge) | 실행 중인 작업 수.<br>_job으로 표시됨_ |
| **airbyte.metrics_reporter.num_total_scheduled_syncs_last_day** <br>(gauge) | 지난 하루 동안 실행된 총 동기화 작업 수.<br>_job으로 표시됨_ |
| **airbyte.metrics_reporter.num_unusually_long_syncs** <br>(gauge) | 과거 성능과 비교했을떄 비정상적으로 긴 동기화 작업 수.<br>_job으로 표시됨_ |
| **airbyte.metrics_reporter.oldest_pending_job_age_secs** <br>(gauge) | 가장 오래된 보류 중인 작업 수명(초).<br>_second로 표시됨_ |
| **airbyte.metrics_reporter.oldest_running_job_age_secs** <br>(gauge) | 가장 오래 실행 중인 작업 수명(초).<br>_second로 표시됨_ |
| **airbyte.orchestrator.source_hearbeat_failure** <br>(count) | 소스에 하트비트가 없어 발생한 복제 실패 횟수.|
| **airbyte.server.breaking_change_detected** <br>(count) | 호환성을 저해하는 스키마 변경이 감지된 건수.|
| **airbyte.server.schema_change_auto_propagated** <br>(count) | 전파된 스키마 변경 사항 수.|
| **airbyte.worker.activity.check_connection** <br>(count) | 연결 확인 작업이 시작된 횟수.<br>_ connection으로 표시됨_ |
| **airbyte.worker.activity.dbt_transformation** <br>(count) | DBT 변환 작업이 시작된 횟수.|
| **airbyte.worker.activity.discover_catalog** <br>(count) | 카탈로그 검색 작업이 시작된 횟수.|
| **airbyte.worker.activity.failure** <br>(count) | 실패한 작업의 횟수(작업 유형별 태그 포함).|
| **airbyte.worker.activity.normalization** <br>(count) | 정규화 작업이 시작된 횟수.|
| **airbyte.worker.activity.normalization_summary_check** <br>(count) | 정규화 요약 검사 작업이 시작된 횟수.|
| **airbyte.worker.activity.refresh_schema** <br>(count) | 스키마 새로고침 작업이 시작된 횟수.|
| **airbyte.worker.activity.replication** <br>(count) | 복제 작업이 시작된 횟수.|
| **airbyte.worker.activity.spec** <br>(count) | 사양(Spec) 작업이 시작된 횟수.|
| **airbyte.worker.activity.submit_check_destination_connection** <br>(count) | 연결 검사 제출 작업이 시작된 횟수.<br>_ connection으로 표시됨_ |
| **airbyte.worker.activity.submit_check_source_connection** <br>(count) | 연결 검사 제출 작업이 시작된 횟수.<br>_ connection으로 표시됨_ |
| **airbyte.worker.activity.webhook_operation** <br>(count) | 웹훅 작업이 시작된 횟수.|
| **airbyte.worker.attempt.completed** <br>(count) | 새로운 시도가 완료된 횟수. 시도마다 한 번씩 기록됨.<br>_attempt로 표시됨_ |
| **airbyte.worker.attempt.created** <br>(count) | 새로운 시도가 생성된 횟수. 시도마다 한 번씩 기록됨.<br>_attempt로 표시됨_ |
| **airbyte.worker.attempt.created_by_release_stage** <br>(count) | 새로운 시도가 생성된 횟수. 릴리스 단계별로 태그가 지정되므로 시도 횟수가 이중으로 집계됨.<br>_ attempt로 표시됨_ |
| **airbyte.worker.attempt.failed_by_failure_origin** <br>(count) | 실패한 시도의 실패 원인 수. 하나의 실패에 여러 원인이 있을 수 있으므로, 단일 실패도 여러 번 집계될 수 있음. 실패 원인과 실패 유형별로 태그됨.<br>_attempt로 표시됨_ |
| **airbyte.worker.attempt.failed_by_release_stage** <br>(count) | 실패한 시도 횟수. 릴리스 단계별로 태그가 지정되므로 시도 횟수가 이중으로 집계됨.<br>_attempt로 표시됨_ |
| **airbyte.worker.attempt.succeeded_by_release_stage** <br>(count) | 성공한 시도 횟수. 릴리스 단계별로 태그가 지정되므로 시도 횟수가 이중으로 집계됨.<br>_attempt로 표시됨_ |
| **airbyte.worker.destination_buffer_size** <br>(gauge) | 복제 작업자 대상 버퍼 대기열 크기.<br>_record로 표시됨_ |
| **airbyte.worker.destination_message_read** <br>(count) | 대상에서 읽은 메시지 수.<br>_message로 표시됨_ |
| **airbyte.worker.destination_message_sent** <br>(count) | 대상으로 전송된 메시지 수.<br>_message로 표시됨_ |
| **airbyte.worker.job.cancelled_by_release_stage** <br>(count) | 취소된 작업 수. 릴리스 단계별로 태그가 지정되어 있으므로 작업이 이중으로 집계됨.<br> _job으로 표시됨_ |
| **airbyte.worker.job.created_by_release_stage** <br>(count) | 새로 생성된 작업 수. 릴리스 단계별로 태그가 지정되어 있으므로 작업이 이중으로 집계됨.<br>_job으로 표시됨_ |
| **airbyte.worker.job.failed_by_release_stage** <br>(count) | 작업 실패 횟수. 릴리스 단계별로 태그가 지정되어 있으므로 작업이 이중으로 계산됨.<br>_ job으로 표시됨_ |
| **airbyte.worker.job.succeeded_by_release_stage** <br>(count) | 성공한 작업 수. 릴리스 단계별로 태그가 지정되므로 작업이 이중으로 계산됨.<br>_job으로 표시됨_ |
| **airbyte.worker.notifications_sent** <br>(count) | 전송된 알림 수.|
| **airbyte.worker.replication_bytes_synced** <br>(count) | 복제 중 동기화된 바이트 수.<br>_byte로 표시됨_ |
| **airbyte.worker.replication_records_synced** <br>(count) | 복제 중 동기화된 레코드 수.<br>_record로 표시됨_ |
| **airbyte.worker.source_buffer_size** <br>(gauge) | 복제 작업자 소스 버퍼 대기열 크기.<br>_record로 표시됨_ |
| **airbyte.worker.source_message_read** <br>(count) | 소스에서 읽은 메시지 수.<br>_message로 표시됨_ |
| **airbyte.worker.state_commit.close_successful** <br>(count) | 성공적으로 최종 상태를 플러시하고 종료된 연결의 수.|
| **airbyte.worker.state_commit.not_attempted** <br>(count) | 조기 종료로 인해 상태 커밋 시도가 중단된 횟수.<br>_attempt로 표시됨_ |
| **airbyte.worker.temporal_workflow.attempt** <br>(count) | Temporal 워크플로 시도 횟수.<br>_attempt로 표시됨_ |
| **airbyte.worker.temporal_workflow.failure** <br>(count) | Temporal 워크플로 실패 횟수.|
| **airbyte.worker.temporal_workflow.success** <br>(count) | Temporal 워크플로 동기화 성공 횟수.<br>_success로 표시됨_ |

### 서비스 점검

Airbyte 점검은 서비스 점검을 포함하지 않습니다.

### 이벤트

Airbyte 점검은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.