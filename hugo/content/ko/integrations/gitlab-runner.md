---
aliases:
- /ko/integrations/gitlab_runner
app_id: gitlab-runner
categories:
- 협업
- 소스 컨트롤
- 문제 추적
- 로그 수집
custom_kind: 통합
description: Datadog을 사용하여 GitLab Runner의 모든 메트릭을 추적하세요.
integration_version: 7.0.0
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: GitLab Runners
---
## 개요

이 통합으로 다음을 할 수 있습니다.

- Prometheus를 통해 GitLab Runners로 수집한 메트릭 가시화 및 모니터링
- GitLab Runner를 검증해 GitLab에 연결

GitLab Runner 및 Prometheus와의 통합에 관한 자세한 내용은 [GitLab Runner 문서](https://docs.gitlab.com/runner/monitoring/)를 참고하세요.

## 설정

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

GitLab Runner 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 GitLab 서버에 추가로 설치할 필요가 없습니다.

### 설정

[Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트에서 `conf.d/` 폴더에 있는 `gitlab_runner.d/conf.yaml` 파일을 편집하여 Runner의 Prometheus 메트릭 엔드포인트와 서비스 점검을 위한 GitLab 마스터를 가리키도록 설정하세요. 사용 가능한 모든 구성 옵션은 [샘플 gitlab_runner.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example)을 참고하세요.

`init_config` 섹션에 있는 `allowed_metrics` 아이템을 사용하면 추출해야 하는 메트릭을 지정할 수 있습니다. 일부 메트릭은 `rate`으로 전송되어야 합니다(예: `ci_runner_errors`).

### 검증

[Agent의 `status` 하위 명령을 실행]((https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `gitlab_runner`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gitlab_runner.ci_docker_machines_provider_machine_creation_duration_seconds_bucket** <br>(gauge) | Docker 머신 생성 시간 히스토그램. GitLab Runner 1.11.0 이하에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_docker_machines_provider_machine_creation_duration_seconds_count** <br>(gauge) | Docker 머신 생성 횟수. GitLab Runner 1.11.0 이하에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_docker_machines_provider_machine_creation_duration_seconds_sum** <br>(gauge) | Docker 머신 생성 시간 합계. GitLab Runner 1.11.0 이하에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_docker_machines_provider_machine_states** <br>(gauge) | 이 공급자의 상태별 현재 CI 머신 개수. GitLab Runner 1.11.0 미만에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_runner_builds** <br>(gauge) | 현재 실행 중인 빌드 수. GitLab Runner 1.11.0 이하에 적용.|
| **gitlab_runner.ci_runner_errors** <br>(count) | 포착된 오류 수. GitLab Runner 1.11.0 미만에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_runner_version_info** <br>(gauge) | 빌드 통계 필드별로 레이블이 지정되지만 값이 항상 '1'로 고정되는 메트릭. GitLab Runner 1.11.0 이하에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_creation_duration_seconds_bucket** <br>(gauge) | SSH Docker 머신 생성 시간 히스토그램. GitLab Runner 1.11.0 이하에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_creation_duration_seconds_count** <br>(gauge) | SSH Docker 머신 생성 횟수. GitLab Runner 1.11.0 이하에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_creation_duration_seconds_sum** <br>(gauge) | SSH Docker 머신 생성 시간 합계. GitLab Runner 1.11.0 이하에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_states** <br>(gauge) | 이 SSH 공급자의 상태별 현재 SSH 머신 수. GitLab Runner 1.11.0 미만에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.gitlab_runner_autoscaling_machine_creation_duration_seconds** <br>(gauge) | Docker 머신 생성 시간 히스토그램. GitLab Runner 1.11.0 이상에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.gitlab_runner_autoscaling_machine_states** <br>(gauge) | 이 공급자의 상태별 현재 머신 수. GitLab Runner 1.11.0 이상에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.gitlab_runner_errors_total** <br>(count) | 포착된 오류 수. GitLab Runner 1.11.0 이상에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.gitlab_runner_jobs** <br>(gauge) | 현재 실행 중인 빌드 수. GitLab Runner 1.11.0 이상에 적용.|
| **gitlab_runner.gitlab_runner_jobs_total** <br>(count) | 실행된 총 작업 수.|
| **gitlab_runner.gitlab_runner_version_info** <br>(gauge) | 빌드 통계 필드별로 레이블이 지정되지만 값이 항상 '1'로 고정되는 메트릭. GitLab Runner 1.11.0 이상에 적용.<br>_request로 표시됨_ |
| **gitlab_runner.go_gc_duration_seconds** <br>(gauge) | GC 호출 시간 요약<br>_request로 표시됨_ |
| **gitlab_runner.go_gc_duration_seconds_count** <br>(gauge) | GC 호출 발생 횟수<br>_request로 표시됨_ |
| **gitlab_runner.go_gc_duration_seconds_sum** <br>(gauge) | GC 호출 횟수 합계<br>_request로 표시됨_ |
| **gitlab_runner.go_goroutines** <br>(gauge) | 현재 존재하는 고루틴 수<br>_ request로 표시됨_ |
| **gitlab_runner.go_memstats_alloc_bytes** <br>(gauge) | 할당되었고, 아직 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_alloc_bytes_total** <br>(count) | 할당된 총 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_buck_hash_sys_bytes** <br>(gauge) | 프로파일링 버킷 해시 테이블에서 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_frees_total** <br>(count) | 총 메모리 해제(free) 횟수<br>_request로 표시됨_ |
| **gitlab_runner.go_memstats_gc_sys_bytes** <br>(gauge) | 가비지 컬렉션 시스템 메타데이터에 사용되는 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_heap_alloc_bytes** <br>(gauge) | 할당되었고, 사용 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_heap_idle_bytes** <br>(gauge) | 사용 대기 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_heap_inuse_bytes** <br>(gauge) | 사용 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_heap_objects** <br>(gauge) | 할당된 객체 수<br>_request로 표시됨_ |
| **gitlab_runner.go_memstats_heap_released_bytes_total** <br>(count) | OS에 반환된 힙 바이트 총 개수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_heap_sys_bytes** <br>(gauge) | 시스템에서 가져온 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_last_gc_time_seconds** <br>(gauge) | 1970년 마지막 가비지 컬렉션 이후 경과된 시간(초)<br>_request로 표시됨_ |
| **gitlab_runner.go_memstats_lookups_total** <br>(count) | 포인터 조회 총 횟수<br>_request로 표시됨_ |
| **gitlab_runner.go_memstats_mallocs_total** <br>(count) | malloc 총 횟수<br>_request로 표시됨_ |
| **gitlab_runner.go_memstats_mcache_inuse_bytes** <br>(gauge) | mcache 구조체에서 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_mcache_sys_bytes** <br>(gauge) | 시스템에서 가져온 mcache 구조체에 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_mspan_inuse_bytes** <br>(gauge) | mspan 구조체에서 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_mspan_sys_bytes** <br>(gauge) | 시스템에서 가져온 mspan 구조체에 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_next_gc_bytes** <br>(gauge) | 다음 가비지 컬렉션이 발생할 때의 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_other_sys_bytes** <br>(gauge) | 다른 시스템 할당에 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_stack_inuse_bytes** <br>(gauge) | 스택 할당자가 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_stack_sys_bytes** <br>(gauge) | 스택 할당자를 위해 시스템에서 얻은 바이트 수<br>_byte로 표시됨_ |
| **gitlab_runner.go_memstats_sys_bytes** <br>(gauge) | 시스템에서 얻은 바이트 수. 모든 시스템 할당량의 합계<br>_byte로 표시됨_ |
| **gitlab_runner.process_cpu_seconds_total** <br>(count) | 사용자 및 시스템 총 CPU 사용 시간(초)<br>_request로 표시됨_ |
| **gitlab_runner.process_max_fds** <br>(gauge) | 열려 있는 파일 디스크립터의 최대 개수<br>_request로 표시됨_ |
| **gitlab_runner.process_open_fds** <br>(gauge) | 열려있는 파일 디스크립터 수<br>_request로 표시됨_ |
| **gitlab_runner.process_resident_memory_bytes** <br>(gauge) | 레지던트 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **gitlab_runner.process_start_time_seconds** <br>(gauge) | Unix Epoch 이후 프로세스 시작 시간(초)<br>_request로 표시됨_ |
| **gitlab_runner.process_virtual_memory_bytes** <br>(gauge) | 가상 메모리 크기(바이트)<br>_byte로 표시됨_ |

### 로그 수집

1. `gitlab_runner` [구성 파일](https://docs.gitlab.com/runner/configuration/advanced-configuration.html)에서 로그 형식을 `json`으로 변경하세요 (GitLab Runner 버전 11.4.0 이상에서 사용 가능):

   ```toml
   log_format = "json"
   ```

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

1. 다음을 실행해 `systemd-journal` 그룹에 `dd-agent` 사용자를 추가하세요.

   ```text
   usermod -a -G systemd-journal dd-agent
   ```

1. 이 구성 블록을 `gitlab_runner.d/conf.yaml` 파일에 추가해 GitLab Runner 로그를 수집하세요.

   ```yaml
   logs:
     - type: journald
       source: gitlab-runner
   ```

   사용 가능한 모든 구성 옵션은 [샘플 gitlab_runner.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 이벤트

GitLab Runner 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검

GitLab Runner 점검에는 Runner와 GitLab 마스터 간 소통을 점검하는 서비스 점검과 로컬 Prometheus 엔드포인트를 사용할 수 있는지를 점검하는 서비스 점검이 포함되어 있습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.