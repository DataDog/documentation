---
app_id: gitlab
categories:
- collaboration
- developer tools
- issue tracking
- log collection
- source control
custom_kind: 통합
description: Datadog으로 모든 GitLab 메트릭을 추적하세요.
integration_version: 10.0.0
media: []
supported_os:
- linux
- windows
- macos
title: GitLab
---
## 개요

이 통합으로 다음을 할 수 있습니다.

- Prometheus를 통해 GitLab과 Gitaly에서 수집한 메트릭 가시화 및 모니터링

자세한 내용은 [Prometheus를 사용하여 GitLab 모니터링](https://docs.gitlab.com/ee/administration/monitoring/prometheus)을 참고하세요.

GitLab 파이프라인을 보다 상세하게 모니터링하려면 [CI Pipeline Visibility](https://app.datadoghq.com/ci/getting-started)을 참고하세요. CI Pipeline Visibility는 사용자 워크플로에 관한 세부적인 인사이트를 제공하고, 상세 Git 메타데이터에 접근할 수 있도록 하며, 시간 경과에 따른 파이프라인 성능을 추적합니다.

## 설정

이 OpenMetrics 기반 통합에는 최신 모드(`openmetrics_endpoint`를 대상 엔드포인트를 참조하도록 설정하여 활성화)와 레거시 모드(대신 `prometheus_url`을 설정하여 활성화)가 있습니다. 최신 기능을 모두 사용하려면 최신 모드를 활성화하세요. 자세한 내용은 [OpenMetrics 기반 통합을 위한 최신 및 레거시 버전 관리](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations)를 참고하세요.

`[OpenMetricsV1]` 또는 `[OpenMetricsV2]`로 표시된 메트릭은 해당 GitLab 통합 모드를 사용해야만 얻을 수 있습니다. 그 외의 모든 메트릭은 두 모드 모두에서 수집됩니다.

### 설치

GitLab 점검 기능은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 GitLab 서버에 별도로 설치할 필요가 없습니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory)의 루트 `conf.d/` 폴더에 있는 `gitlab.d/conf.yaml` 파일을 편집하여 GitLab 메트릭 [엔드포인트](https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics)를 참조하도록 합니다.
   사용 가능한 모든 구성 옵션은 [샘플 gitlab.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example)을 참고하세요. 이전에 이 통합을 구현한 경우 [레거시 예제](https://github.com/DataDog/integrations-core/blob/7.43.x/gitlab/datadog_checks/gitlab/data/conf.yaml.example)를 참고하세요.

1. GitLab 설정 페이지에서 `Enable Prometheus Metrics` 옵션이 활성화되어 있는지 확인하세요(관리자 액세스 필요). 메트릭 수집 활성화 방법에 관한 자세한 내용은 [GitLab Prometheus 메트릭](https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html)을 참고하세요.

1. 내 `/etc/gitlab/gitlab.rb`를 업데이트해 모니터링 엔드포인트에 접근할 수 있도록 허용하세요.

   ```
   gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
   ```

   **참고** 변경 사항을 확인하려면 저장 후 GitLab을 다시 시작하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 그 후 하단에 있는 `logs` 줄의 주석 처리를 제거하여 `envoy.d/conf.yaml`을 편집하세요. GitLab 로그 파일의 올바른 경로로 로그 `path`를 업데이트합니다.

   ```yaml
     logs:
       - type: file
         path: /var/log/gitlab/gitlab-rails/production_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/production.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/api_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                         |
| -------------------- |-----------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `gitlab`                                                                                      |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"gitlab_url":"http://%%host%%/", "openmetrics_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `gitlab`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gitlab.action_cable.active_connections** <br>(gauge) | 현재 연결된 ActionCable WS 클라이언트 수<br>_connection으로 표시됨_ |
| **gitlab.auto_devops_pipelines_completed.count** <br>(count) | \[OpenMetrics V2\] 완료된 Auto DevOps 파이프라인의 카운터(상태별로 라벨링)|
| **gitlab.auto_devops_pipelines_completed_total** <br>(count) | \[OpenMetrics V1\] 완료된 Auto DevOps 파이프라인의 카운터(상태별로 라벨링)|
| **gitlab.banzai.cached_render_real_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 캐시된 출력이 있을 때 Markdown을 HTML로 렌더링하는 데 걸리는 시간<br>_second로 표시됨_ |
| **gitlab.banzai.cached_render_real_duration_seconds.count** <br>(count) | 캐시된 출력이 있을 때 Markdown을 HTML로 렌더링하는 데 걸리는 시간|
| **gitlab.banzai.cached_render_real_duration_seconds.sum** <br>(count) | 캐시된 출력이 있을 때 Markdown을 HTML로 렌더링하는 데 걸리는 시간의 합계<br>_second로 표시됨_ |
| **gitlab.banzai.cacheless_render_real_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 캐시된 출력이 없을 때 Markdown을 HTML로 렌더링하는 데 걸리는 시간<br>_second로 표시됨_ |
| **gitlab.banzai.cacheless_render_real_duration_seconds.count** <br>(count) | 캐시된 출력이 없을 때 Markdown을 HTML로 렌더링하는 데 걸리는 시간 측정|
| **gitlab.banzai.cacheless_render_real_duration_seconds.sum** <br>(count) | 캐시된 출력이 없을 때 Markdown을 HTML로 렌더링하는 데 걸리는 시간의 합계<br>_second로 표시됨_ |
| **gitlab.cache.misses.count** <br>(count) | \[OpenMetrics V2\] 캐시 읽기 미스<br>_second로 표시됨_ |
| **gitlab.cache.misses_total** <br>(count) | \[OpenMetrics V1\] 캐시 읽기 미스 <br>_second로 표시됨_ |
| **gitlab.cache.operation_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 캐시 접근 시간<br>_second로 표시됨_ |
| **gitlab.cache.operation_duration_seconds.count** <br>(count) | 캐시 접근 시간 측정|
| **gitlab.cache.operation_duration_seconds.sum** <br>(count) | 캐시 접근 시간 합계<br>_second로 표시됨_ |
| **gitlab.cache_operations.count** <br>(count) | \[OpenMetrics V2\] 컨트롤러/액션별 캐시 작업 횟수|
| **gitlab.cache_operations_total** <br>(count) | \[OpenMetrics V1\] 컨트롤러/액션별 캐시 작업 횟수|
| **gitlab.ci_pipeline_creation_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] CI/CD 파이프라인을 생성하는 데 걸리는 시간(초)|
| **gitlab.ci_pipeline_creation_duration_seconds.count** <br>(count) | CI/CD 파이프라인을 생성하는 데 걸리는 시간(초)|
| **gitlab.ci_pipeline_creation_duration_seconds.sum** <br>(count) | CI/CD 파이프라인을 생성하는 데 걸리는 시간의 합계<br>_second로 표시됨_ |
| **gitlab.ci_pipeline_size_builds.bucket** <br>(count) | \[OpenMetrics V2\] 파이프라인 소스별로 그룹화된 파이프라인 내 전체 빌드 수|
| **gitlab.ci_pipeline_size_builds.count** <br>(count) | 파이프라인 소스별로 그룹화된 파이프라인 내 전체 빌드 수|
| **gitlab.ci_pipeline_size_builds.sum** <br>(count) | 파이프라인 소스별로 그룹화된 파이프라인 내 전체 빌드 수의 합계|
| **gitlab.database.connection_pool_busy** <br>(gauge) | 소유자가 활성 상태에서 사용 중인 연결<br>_connection으로 표시됨_ |
| **gitlab.database.connection_pool_connections** <br>(gauge) | 현재 풀에 있는 연결<br>_connection으로 표시됨_ |
| **gitlab.database.connection_pool_dead** <br>(gauge) | 소유자가 비활성 상태에서 사용 중인 연결<br>_connection으로 표시됨_ |
| **gitlab.database.connection_pool_idle** <br>(gauge) | 미사용 연결<br>_connection으로 표시됨_ |
| **gitlab.database.connection_pool_size** <br>(gauge) | 연결 풀 전체 용량<br>_connection으로 표시됨_ |
| **gitlab.database.connection_pool_waiting** <br>(gauge) | 현재 이 대기열에서 대기 중인 스레드<br>_thread로 표시됨_ |
| **gitlab.database.transaction_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 데이터베이스 트랜잭션에 소요된 시간(초)<br>_second로 표시됨_ |
| **gitlab.database.transaction_seconds.count** <br>(count) | 데이터베이스 트랜잭션에 소요된 시간(초)|
| **gitlab.database.transaction_seconds.sum** <br>(count) | 데이터베이스 트랜잭션에 소요된 총 시간(초)<br>_second로 표시됨_ |
| **gitlab.db_load_balancing_hosts** <br>(gauge) | 현재 로드 밸런싱 호스트 수<br>_host로 표시됨_ |
| **gitlab.db_partitions_missing** <br>(gauge) | 현재 예상되지만 존재하지 않는 데이터베이스 파티션 수 |
| **gitlab.db_partitions_present** <br>(gauge) | 존재하는 데이터베이스 파티션 수|
| **gitlab.failed_login_captcha.count** <br>(count) | \[OpenMetrics V2\] 로그인 중 CAPTCHA 실패 시도 횟수|
| **gitlab.failed_login_captcha_total** <br>(count) | \[OpenMetrics V1\] 로그인 중 CAPTCHA 실패 시도 횟수|
| **gitlab.geo.attachments** <br>(gauge) | 프라이머리에 있는 첨부 파일 총 개수|
| **gitlab.geo.attachments_failed** <br>(gauge) | 세컨더리에서 동기화에 실패한 첨부 파일 수|
| **gitlab.geo.attachments_synced** <br>(gauge) | 세컨더리에서 동기화된 첨부 파일 수|
| **gitlab.geo.attachments_synced_missing_on_primary** <br>(gauge) | 프라이머리에서 파일이 누락되어 동기화된 것으로 표시된 첨부 파일 수|
| **gitlab.geo.cursor_last_event_id** <br>(gauge) | 세컨더리에서 처리된 이벤트 로그의 마지막 데이터베이스 ID|
| **gitlab.geo.cursor_last_event_timestamp** <br>(gauge) | 세컨더리에서 처리된 이벤트 로그의 마지막 UNIX 타임스탬프|
| **gitlab.geo.db_replication_lag_seconds** <br>(gauge) | 데이터베이스 복제 지연 시간(초)<br>_second로 표시됨_ |
| **gitlab.geo.group.wiki.repositories** <br>(gauge) | 프라이머리에 있는 그룹 위키 수(13.10)|
| **gitlab.geo.group.wiki.repositories_checksum_failed** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 그룹 위키 수(13.10)|
| **gitlab.geo.group.wiki.repositories_checksum_total** <br>(gauge) | 프라이머리에서 체크섬이 필요한 그룹 위키 수(16.3)|
| **gitlab.geo.group.wiki.repositories_checksummed** <br>(gauge) | 프라이머리에서 체크섬 계산에 성공한 그룹 위키 수(13.10)|
| **gitlab.geo.group.wiki.repositories_failed** <br>(gauge) | 세컨더리에서 동기화 가능한 그룹 위키 중 실패한 위키 수(13.10)|
| **gitlab.geo.group.wiki.repositories_registry** <br>(gauge) | 레지스트리에 등록된 그룹 위키 수(13.10)|
| **gitlab.geo.group.wiki.repositories_synced** <br>(gauge) | 세컨더리에 동기화 가능한 그룹 위키 중 동기화된 위키 수(13.10)|
| **gitlab.geo.group.wiki.repositories_verification_failed** <br>(gauge) | 세컨더리에서 인증에 실패한 그룹 위키 수(16.3)|
| **gitlab.geo.group.wiki.repositories_verification_total** <br>(gauge) | 세컨더리에서 인증에 실패한 그룹 위키 수(16.3)|
| **gitlab.geo.group.wiki.repositories_verified** <br>(gauge) | 세컨더리에서 성공적으로 인증된 그룹 위키 수(16.3)|
| **gitlab.geo.job_artifacts_synced_missing_on_primary** <br>(gauge) | 프라이머리에서 파일이 누락되어 동기화된 것으로 표시된 작업 아티팩트 수|
| **gitlab.geo.last_event_id** <br>(gauge) | 프라이머리의 최신 이벤트 로그 항목 데이터베이스 ID|
| **gitlab.geo.last_event_timestamp** <br>(gauge) | 프라이머리 최신 이벤트 로그 항목의 UNIX 타임스탬프|
| **gitlab.geo.last_successful_status_check_timestamp** <br>(gauge) | 상태가 성공적으로 업데이트된 마지막 타임스탬프|
| **gitlab.geo.lfs_objects** <br>(gauge) | 프라이머리에서 사용 가능한 LFS 객체의 총 개수|
| **gitlab.geo.lfs_objects_failed** <br>(gauge) | 세컨더리에서 동기화에 실패한 LFS 객체의 수|
| **gitlab.geo.lfs_objects_synced** <br>(gauge) | 세컨더리에서 동기화된 LFS 객체 수|
| **gitlab.geo.lfs_objects_synced_missing_on_primary** <br>(gauge) | 프라이머리에서 파일이 누락되어 동기화된 것으로 표시된 LFS 객체 수|
| **gitlab.geo.merge_request_diffs** <br>(gauge) | 프라이머리에서 병합 요청 diff 수|
| **gitlab.geo.merge_request_diffs_checksum_failed** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 병합 요청 diff 수|
| **gitlab.geo.merge_request_diffs_checksummed** <br>(gauge) | 프라이머리에서 체크섬이 계산된 병합 요청 diff 수|
| **gitlab.geo.merge_request_diffs_failed** <br>(gauge) | 세컨더리에서 동기화 가능한 병합 요청 diff 중 동기화에 실패한 수|
| **gitlab.geo.merge_request_diffs_registry** <br>(gauge) | 레지스트리에 있는 병합 요청 diff 수|
| **gitlab.geo.merge_request_diffs_synced** <br>(gauge) | 세컨더리에서 동기화 가능한 병합 요청 diff 중 동기화된 수|
| **gitlab.geo.package_files** <br>(gauge) | 프라이머리에 있는 패키지 파일 수|
| **gitlab.geo.package_files_checksum_failed** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 패키지 파일 수|
| **gitlab.geo.package_files_checksummed** <br>(gauge) | 프라이머리에서 체크섬이 계산된 패키지 파일 수|
| **gitlab.geo.package_files_failed** <br>(gauge) | 세컨더리에서 동기화 가능한 패키지 파일 중 동기화에 실패한 수|
| **gitlab.geo.package_files_registry** <br>(gauge) | 레지스트리에 있는 패키지 파일 수|
| **gitlab.geo.package_files_synced** <br>(gauge) | 세컨더리에서 동기화 가능한 패키지 파일 중 동기화된 수|
| **gitlab.geo.project.repositories** <br>(gauge) | 프라이머리에서 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.repositories_checksum_failed** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.repositories_checksum_total** <br>(gauge) | 프라이머리에서 체크섬이 필요한 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.repositories_checksummed** <br>(gauge) | 프라이머리에서 체크섬을 성공적으로 계산한 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.repositories_failed** <br>(gauge) | 세컨더리에서 동기화 가능한 프로젝트 리포지토리 중 실패한 수(16.2)|
| **gitlab.geo.project.repositories_registry** <br>(gauge) | 레지스트리에 등록된 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.repositories_synced** <br>(gauge) | 세컨더리에서 동기화 가능한 프로젝트 리포지토리 중 동기화된 수(16.2)|
| **gitlab.geo.project.repositories_verification_failed** <br>(gauge) | 세컨더리에서 인증에 실패한 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.repositories_verification_total** <br>(gauge) | 세컨더리에 인증을 시도할 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.repositories_verified** <br>(gauge) | 세컨더리에서 성공적으로 인증된 프로젝트 리포지토리 수(16.2)|
| **gitlab.geo.project.wiki.repositories** <br>(gauge) | 프라이머리에 있는 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.project.wiki.repositories_checksum_failed** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.project.wiki.repositories_checksum_total** <br>(gauge) | 프라이머리에서 체크섬을 계산해야 하는 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.project.wiki.repositories_checksummed** <br>(gauge) | 프라이머리에서 체크섬을 성공적으로 계산한 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.project.wiki.repositories_failed** <br>(gauge) | 세컨더리에서 동기화 가능한 프로젝트 위키 리포지토리 중 동기화에 실패한 수(15.10)|
| **gitlab.geo.project.wiki.repositories_registry** <br>(gauge) | 레지스트리에 등록된 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.project.wiki.repositories_synced** <br>(gauge) | 세컨더리에서 동기화 가능한 프로젝트 위키 리포지토리 중 동기화된 수(15.10)|
| **gitlab.geo.project.wiki.repositories_verification_failed** <br>(gauge) | 세컨더리에서 인증에 실패한 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.project.wiki.repositories_verification_total** <br>(gauge) | 세컨더리에서 인증을 시도할 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.project.wiki.repositories_verified** <br>(gauge) | 세컨더리에서 성공적으로 인증된 프로젝트 위키 리포지토리 수(15.10)|
| **gitlab.geo.repositories** <br>(gauge) | 프라이머리에서 사용 가능한 리포지토리 총 개수|
| **gitlab.geo.repositories_checked_count** <br>(gauge) | git fsck를 통해 확인된 리포지토리 수|
| **gitlab.geo.repositories_checked_failed_count** <br>(gauge) | git fsck에서 오류가 발생한 리포지토리 수|
| **gitlab.geo.repositories_checksum_failed_count** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 리포지토리 수|
| **gitlab.geo.repositories_checksum_mismatch_count** <br>(gauge) | 세컨더리에서 체크섬이 일치하지 않는 리포지토리 수|
| **gitlab.geo.repositories_checksummed_count** <br>(gauge) | 프라이머리에서 체크섬이 계산된 리포지토리 수|
| **gitlab.geo.repositories_failed** <br>(gauge) | 세컨더리에서 동기화에 실패한 리포지토리 수|
| **gitlab.geo.repositories_retrying_verification_count** <br>(gauge) | 세컨더리에서 Geo가 적극적으로 수정하려고 시도 중인 리포지토리 인증 실패 수|
| **gitlab.geo.repositories_synced** <br>(gauge) | 세컨더리에 동기화된 리포지토리 수|
| **gitlab.geo.repositories_verification_failed_count** <br>(gauge) | 세컨더리에서 인증에 실패한 리포지토리 수|
| **gitlab.geo.repositories_verified_count** <br>(gauge) | 세컨더리에서 인증된 리포지토리 수|
| **gitlab.geo.status_failed.count** <br>(count) | \[OpenMetrics V2\] Geo Node에서 상태를 가져오는 데 실패한 횟수|
| **gitlab.geo.status_failed_total** <br>(count) | \[OpenMetrics V1\]  Geo Node에서 상태를 가져오는 데 실패한 횟수|
| **gitlab.geo.terraform_states** <br>(gauge) | 프라이머리에 있는 Terraform 상태 수|
| **gitlab.geo.terraform_states_checksum_failed** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 Terraform 상태 수|
| **gitlab.geo.terraform_states_checksummed** <br>(gauge) | 프라이머리에서 체크섬이 계산된 Terraform 상태 수|
| **gitlab.geo.terraform_states_failed** <br>(gauge) | 세컨더리에서 동기화에 실패한 Terraform 상태 수|
| **gitlab.geo.terraform_states_registry** <br>(gauge) | 레지스트리에 등록된 Terraform 상태 수|
| **gitlab.geo.terraform_states_synced** <br>(gauge) | 세컨더리에서 동기화 가능한 Terraform 상태 중 동기화된 수|
| **gitlab.geo.wikis_checksum_failed_count** <br>(gauge) | 프라이머리에서 체크섬 계산에 실패한 위키 수|
| **gitlab.geo.wikis_checksum_mismatch_count** <br>(gauge) | 세컨더리에서 체크섬이 일치하지 않는 위키 수|
| **gitlab.geo.wikis_checksummed_count** <br>(gauge) | 프라이머리에서 체크섬이 계산된 위키 수|
| **gitlab.geo.wikis_retrying_verification_count** <br>(gauge) | 세컨더리에서 Geo가 적극적으로 수정하려고 시도하는 위키 인증 실패 수|
| **gitlab.geo.wikis_verification_failed_count** <br>(gauge) | 세컨더리에서 인증에 실패한 위키 수|
| **gitlab.geo.wikis_verified_count** <br>(gauge) | 세컨더리에서 인증된 위키 수|
| **gitlab.gitaly.cacheinvalidator_rpc.count** <br>(count) | \[OpenMetrics V2\] 캐시 무효화기에서 발생한 RPC 총 횟수.|
| **gitlab.gitaly.catfile_cache_members** <br>(gauge) | \[OpenMetrics V2\] 프로세스 유형별 catfile 캐시 멤버 측정.|
| **gitlab.gitaly.catfile_processes** <br>(gauge) | \[OpenMetrics V2\] .|
| **gitlab.gitaly.command.context_switches.count** <br>(count) | \[OpenMetrics V2\] 쉘 아웃 중애 실행된 컨텍스트 스위치 합계.|
| **gitlab.gitaly.command.cpu_seconds.count** <br>(count) | \[OpenMetrics V2\] 쉘 아웃에 소요된 CPU 시간 합계.|
| **gitlab.gitaly.command.major_page_faults.count** <br>(count) | \[OpenMetrics V2\] 쉘 아웃 중에 발생한 주요 페이지 오류 합계.|
| **gitlab.gitaly.command.minor_page_faults.count** <br>(count) | \[OpenMetrics V2\] 쉘 아웃 중에 발생한 경미한 페이지 오류 합계.|
| **gitlab.gitaly.command.real_seconds.count** <br>(count) | \[OpenMetrics V2\] 쉘 아웃에 걸린 실제 소요 시간 합계.|
| **gitlab.gitaly.command.signals_received.count** <br>(count) | \[OpenMetrics V2\] 쉘 아웃에 걸린 실제 소요 시간 합계.|
| **gitlab.gitaly.command.spawn_token_acquiring_seconds.count** <br>(count) | \[OpenMetrics V2\] 스폰 토큰을 기다리는 데 소요된 총 시간.<br>_second로 표시됨_ |
| **gitlab.gitaly.commands_running** <br>(gauge) | \[OpenMetrics V2\] 현재 실행 중인 프로세스 총 개수.|
| **gitlab.gitaly.concurrency_limiting_acquiring_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 속도 제한이 적용된 호출 시간의 히스토그램 버킷.<br>_second로 표시됨_ |
| **gitlab.gitaly.concurrency_limiting_acquiring_seconds.count** <br>(count) | \[OpenMetrics V2\] 속도 제한이 적용된 호출 시간.<br>_second로 표시됨_ |
| **gitlab.gitaly.concurrency_limiting_acquiring_seconds.sum** <br>(count) | \[OpenMetrics V2\] 속도 제한이 적용된 호출 시간 합계.<br>_second로 표시됨_ |
| **gitlab.gitaly.concurrency_limiting_in_progress** <br>(gauge) | \[OpenMetrics V2\] 동시에 진행 중인 호출 수를 나타내는 게이지.|
| **gitlab.gitaly.concurrency_limiting_queued** <br>(gauge) | \[OpenMetrics V2\] 대기 중인 호출 수를 나타내는 게이지.|
| **gitlab.gitaly.diskcache.bytes_fetched.count** <br>(count) | \[OpenMetrics V2\] 디스크 캐시에서 가져온 바이트 총량.<br>_byte로 표시됨_ |
| **gitlab.gitaly.diskcache.bytes_loser.count** <br>(count) | \[OpenMetrics V2\] 쓰기 손실이 발생한 디스크 캐시 바이트 총량.<br>_byte로 표시됨_ |
| **gitlab.gitaly.diskcache.bytes_stored.count** <br>(count) | \[OpenMetrics V2\] 디스크 캐시에 저장된 바이트 총량.<br>_byte로 표시됨_ |
| **gitlab.gitaly.diskcache.miss.count** <br>(count) | \[OpenMetrics V2\]디스크 캐시 미스 총 횟수.|
| **gitlab.gitaly.diskcache.requests.count** <br>(count) | \[OpenMetrics V2\] 디스크 캐시 요청 총 횟수.|
| **gitlab.gitaly.diskcache.walker_empty_dir.count** <br>(count) | \[OpenMetrics V2\] 발견된 빈 디렉터리의 총 개수.|
| **gitlab.gitaly.diskcache.walker_empty_dir_removal.count** <br>(count) | \[OpenMetrics V2\] 삭제된 빈 디렉터리의 총 개수.|
| **gitlab.gitaly.diskcache.walker_error.count** <br>(count) | \[OpenMetrics V2\]  디스크 캐시 파일 시스템 탐색 중 발생한 총 이벤트 수.|
| **gitlab.gitaly.diskcache.walker_removal.count** <br>(count) | \[OpenMetrics V2\] 트랜잭션 서비스 호출과 응답 수신 사이의 지연 시간.|
| **gitlab.gitaly.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V2\] 가비지 컬렉션 주기 동안의 일시 중지 시간 요약.<br>_second로 표시됨_ |
| **gitlab.gitaly.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V2\] 가비지 컬렉션 주기 동안의 일시 중지 시간 요약.<br>_second로 표시됨_ |
| **gitlab.gitaly.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V2\] 가비지 컬렉션 주기 동안의 일시 중지 시간 요약.<br>_second로 표시됨_ |
| **gitlab.gitaly.go.goroutines** <br>(gauge) | \[OpenMetrics V2\] 현재 존재하는 고루틴 수|
| **gitlab.gitaly.go.info** <br>(gauge) | \[OpenMetrics V2\] Go 환경에 관한 정보.|
| **gitlab.gitaly.go.memstats_alloc_bytes** <br>(gauge) | \[OpenMetrics V2\] 현재 사용 중인 할당된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 프로파일링 버킷 해시 테이블에서 사용된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_frees.count** <br>(count) | \[OpenMetrics V2\] 총 Free 횟수.|
| **gitlab.gitaly.go.memstats_gc_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 가비지 컬렉션 시스템 메타데이터에 사용된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V2\] 힙에 할당되어 아직 사용 중인 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_heap_idle_bytes** <br>(gauge) | \[OpenMetrics V2\] 사용 대기 중인 힙 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] 사용 중인 힙 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_heap_objects** <br>(gauge) | \[OpenMetrics V2\] 할당된 객체 수.|
| **gitlab.gitaly.go.memstats_heap_released_bytes** <br>(gauge) | \[OpenMetrics V2\] OS에 반환된 힙 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_heap_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 시스템에서 가져온 힙 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V2\] 1970년 마지막 가비지 컬렉션 이후 경과된 시간(초)<br>_second로 표시됨_ |
| **gitlab.gitaly.go.memstats_lookups.count** <br>(count) | \[OpenMetrics V2\] 포인터 조회 총 횟수.|
| **gitlab.gitaly.go.memstats_mallocs.count** <br>(count) | \[OpenMetrics V2\] 메모리 할당(malloc) 총 횟수.|
| **gitlab.gitaly.go.memstats_mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] mcache 구조체에서 사용 중인 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 시스템에서 가져온 mcache 구조체에 사용된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] mspan 구조체에서 사용 중인 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 시스템에서 가져온 mspan 구조체에 사용된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_next_gc_bytes** <br>(gauge) | \[OpenMetrics V2\] 다음 가비지 컬렉션이 발생할 때의 힙 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_other_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 다른 시스템 할당에 사용된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] 스택 할당자가 사용 중인 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_stack_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 스택 할당자를 위해 시스템에서 얻은 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.memstats_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] 시스템에서 가져온 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.go.threads** <br>(gauge) | \[OpenMetrics V2\] 생성된 OS 스레드 수.|
| **gitlab.gitaly.grpc_server.handled.count** <br>(count) | \[OpenMetrics V2\] 서버에서 완료된 총 RPC 횟수(성공 여부와 관계없이).|
| **gitlab.gitaly.grpc_server.handling_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 서버에서 애플리케이션 레벨로 처리되었던 gRPC 응답 지연 시간의 히스토그램 버킷.<br>_second로 표시됨_ |
| **gitlab.gitaly.grpc_server.handling_seconds.count** <br>(count) | \[OpenMetrics V2\] 서버에서 애플리케이션 레벨로 처리된 gRPC 응답 지연 시간.<br>_second로 표시됨_ |
| **gitlab.gitaly.grpc_server.handling_seconds.sum** <br>(count) | \[OpenMetrics V2\] 서버에서 애플리케이션 레벨로 처리된 gRPC 응답 지연 시간 합계.<br>_second로 표시됨_ |
| **gitlab.gitaly.grpc_server.msg_received.count** <br>(count) | \[OpenMetrics V2\] 서버에서 수신된 RPC 스트림 메시지 총 개수.|
| **gitlab.gitaly.grpc_server.msg_sent.count** <br>(count) | \[OpenMetrics V2\] 서버에서 전송된 gRPC 스트림 메시지 총 개수.|
| **gitlab.gitaly.grpc_server.started.count** <br>(count) | \[OpenMetrics V2\] 서버에서 시작된 RPC 총 개수.|
| **gitlab.gitaly.hook_transaction_voting_delay_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 트랜잭션 서비스 호출과 응답 수신 사이의 지연 시간.<br>_second로 표시됨_ |
| **gitlab.gitaly.hook_transaction_voting_delay_seconds.count** <br>(count) | \[OpenMetrics V2\] 트랜잭션 서비스 호출과 응답 수신 사이의 지연 시간.<br>_second로 표시됨_ |
| **gitlab.gitaly.hook_transaction_voting_delay_seconds.sum** <br>(count) | \[OpenMetrics V2\] 트랜잭션 서비스 호출과 응답 수신 사이의 지연 시간.<br>_second로 표시됨_ |
| **gitlab.gitaly.inforef_cache_attempt.count** <br>(count) | \[OpenMetrics V2\] 캐시에 접근한 smarthttp info-ref RPC 총 개수.|
| **gitlab.gitaly.list_commits_by_oid_request_size.bucket** <br>(count) | \[OpenMetrics V2\] ListCommitsByOid 요청에서 요청된 커밋 수.|
| **gitlab.gitaly.list_commits_by_oid_request_size.count** <br>(count) | \[OpenMetrics V2\] ListCommitsByOid 요청에서 요청된 커밋 수.|
| **gitlab.gitaly.list_commits_by_oid_request_size.sum** <br>(count) | \[OpenMetrics V2\] ListCommitsByOid 요청에서 요청된 커밋 수.|
| **gitlab.gitaly.pack_objects.acquiring_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 속도 제한이 적용된 시간 호출의 히스토그램 버킷.<br>_second로 표시됨_ |
| **gitlab.gitaly.pack_objects.acquiring_seconds.count** <br>(count) | \[OpenMetrics V2\] 속도 제한이 적용된 호출 시간 <br>_second로 표시됨_ |
| **gitlab.gitaly.pack_objects.acquiring_seconds.sum** <br>(count) | \[OpenMetrics V2\] 속도 제한이 적용된 호출 시간 합계.<br>_second로 표시됨_ |
| **gitlab.gitaly.pack_objects.generated_bytes.count** <br>(count) | \[OpenMetrics V2] git-pack-objects를 실행하여 PackObjectsHook에 생성된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.gitaly.pack_objects.in_progress** <br>(gauge) | \[OpenMetrics V2\] 동시에 진행 중인 호출 수|
| **gitlab.gitaly.pack_objects.queued** <br>(gauge) | \[OpenMetrics V2\] 대기 중인 호출 수를 나타내는 게이지|
| **gitlab.gitaly.pack_objects.served_bytes.count** <br>(count) | \[OpenMetrics V2\] 클라이언트에게 제공된 git-pack-objects 데이터 바이트 수.<br>_ byte_로 표시됨_ |
| **gitlab.gitaly.process_cpu_seconds.count** <br>(count) | \[OpenMetrics V2\] 사용자 및 시스템 CPU 사용 시간(초) 합계.<br>_second로 표시됨_ |
| **gitlab.gitaly.process_max_fds** <br>(gauge) | \[OpenMetrics V2\] 열려 있는 파일 디스크립터 최대 개수.|
| **gitlab.gitaly.process_open_fds** <br>(gauge) | \[OpenMetrics V2\] 열려 있는 파일 디스크립터 수.|
| **gitlab.gitaly.process_resident_memory_bytes** <br>(gauge) | \[OpenMetrics V2\] 레지던트 메모리 크기(바이트).<br>_byte로 표시됨_ |
| **gitlab.gitaly.process_start_time_seconds** <br>(gauge) | \[OpenMetrics V2\] Unix Epoch 이후 프로세스 시작 시간(초).<br>_second로 표시됨_ |
| **gitlab.gitaly.process_virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V2\] 가상 메모리 크기(바이트).<br>_byte로 표시됨_ |
| **gitlab.gitaly.process_virtual_memory_max_bytes** <br>(gauge) | \[OpenMetrics V2\] 사용 가능한 최대 가상 메모리 용량(바이트).<br>_byte로 표시됨_ |
| **gitlab.gitaly.promhttp_metric_handler_requests.count** <br>(count) | \[OpenMetrics V2\] HTTP 상태 코드별 총 스크레이프 수.|
| **gitlab.gitaly.promhttp_metric_handler_requests_in_flight** <br>(gauge) | \[OpenMetrics V2\] 현재 제공되는 스크레이프 수.|
| **gitlab.gitaly.spawn_timeouts.count** <br>(count) | \[OpenMetrics V2\] 프로세스 생성 타임아웃 횟수.|
| **gitlab.gitaly.streamcache_sendfile_bytes.count** <br>(count) | \[OpenMetrics V2\] sendfile을 사용하여 전송된 바이트 수.<br>_byte로 표시됨_ |
| **gitlab.global_search_awaiting_indexing_queue_size** <br>(gauge) | 인덱싱이 일시 중지된 동안 Elasticsearch와 동기화될 데이터베이스 업데이트 수|
| **gitlab.global_search_bulk_cron_queue_size** <br>(gauge) | Elasticsearch와 동기화될 데이터베이스 레코드 수|
| **gitlab.go_gc_duration_seconds** <br>(gauge) | GC 호출 시간 요약<br>_request로 표시됨_ |
| **gitlab.go_gc_duration_seconds_count** <br>(gauge) | GC 호출 시간<br>_request로 표시됨_ |
| **gitlab.go_gc_duration_seconds_sum** <br>(count) | GC 호출 시간 합계<br>_request로 표시됨_ |
| **gitlab.go_goroutines** <br>(gauge) | 현재 존재하는 고루틴 수<br>_ request로 표시됨_ |
| **gitlab.go_memstats_alloc_bytes** <br>(gauge) | 할당되었고, 아직 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_alloc_bytes.count** <br>(count) | \[OpenMetrics V2\] 할당된 총 바이트 수<br>_ byte로 표시됨_ |
| **gitlab.go_memstats_alloc_bytes_total** <br>(count) | \[OpenMetrics V1\] 할당된 총 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_buck_hash_sys_bytes** <br>(gauge) | 프로파일링 버킷 해시 테이블에서 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_frees.count** <br>(count) | \[OpenMetrics V2\] free 총 횟수<br>_request로 표시됨_ |
| **gitlab.go_memstats_frees_total** <br>(count) | \[OpenMetrics V1\] free 총 횟수<br>_request로 표시됨_ |
| **gitlab.go_memstats_gc_cpu_fraction** <br>(gauge) | 프로그램이 시작된 이후 GC가 사용한 가용 CPU 시간의 비율<br>_request로 표시됨_ |
| **gitlab.go_memstats_gc_sys_bytes** <br>(gauge) | 가비지 컬렉션 시스템 메타데이터에 사용되는 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_heap_alloc_bytes** <br>(gauge) | 할당되었고, 사용 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_heap_idle_bytes** <br>(gauge) | 사용 대기 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_heap_inuse_bytes** <br>(gauge) | 사용 중인 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_heap_objects** <br>(gauge) | 할당된 객체 수<br>_request로 표시됨_ |
| **gitlab.go_memstats_heap_released_bytes.count** <br>(count) | \[OpenMetrics V2\] OS에 반환된 힙바이트 총 개수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_heap_released_bytes_total** <br>(count) | \[OpenMetrics V1\] OS에 반환된 힙 바이트 총 개수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_heap_sys_bytes** <br>(gauge) | 시스템에서 가져온 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_last_gc_time_seconds** <br>(gauge) | 1970년 마지막 가비지 컬렉션 이후 경과된 시간(초)<br>_request로 표시됨_ |
| **gitlab.go_memstats_lookups.count** <br>(count) | \[OpenMetrics V2\] 포인터 조회 총 횟수<br>_request로 표시됨_ |
| **gitlab.go_memstats_lookups_total** <br>(count) | \[OpenMetrics V1\] 포인터 조회 총 횟수<br>_request로 표시됨_ |
| **gitlab.go_memstats_mallocs.count** <br>(count) | \[OpenMetrics V2\] malloc 총 횟수<br>_request로 표시됨_ |
| **gitlab.go_memstats_mallocs_total** <br>(count) | \[OpenMetrics V1\] malloc 총 횟수<br>_request로 표시됨_ |
| **gitlab.go_memstats_mcache_inuse_bytes** <br>(gauge) | mcache 구조체에서 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_mcache_sys_bytes** <br>(gauge) | system에서 가져온 mcache 구조체에 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_mspan_inuse_bytes** <br>(gauge) | mspan 구조체에서 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_mspan_sys_bytes** <br>(gauge) | 시스템에서 가져온 mspan 구조체에 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_next_gc_bytes** <br>(gauge) | 다음 가비지 컬렉션이 발생할 때의 힙 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_other_sys_bytes** <br>(gauge) | 다른 시스템 할당에 사용된 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_stack_inuse_bytes** <br>(gauge) | 스택 할당자가 사용 중인 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_stack_sys_bytes** <br>(gauge) | 스택 할당자를 위해 시스템에서 얻은 바이트 수<br>_byte로 표시됨_ |
| **gitlab.go_memstats_sys_bytes** <br>(gauge) | 시스템에서 얻은 바이트 수. 모든 시스템 할당량의 합계<br>_byte로 표시됨_ |
| **gitlab.go_threads** <br>(gauge) | 생성된 OS 스레드 수<br>_request로 표시됨_ |
| **gitlab.http.elasticsearch_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 웹 트랜잭션 중 Elasticsearch 요청 시간|
| **gitlab.http.elasticsearch_requests_duration_seconds.count** <br>(count) | 웹 트랜잭션 중 Elasticsearch 요청 시간|
| **gitlab.http.elasticsearch_requests_duration_seconds.sum** <br>(count) | 웹 트랜잭션 중 Elasticsearch 요청 시간 합계<br>_second로 표시됨_ |
| **gitlab.http.elasticsearch_requests_total** <br>(count) | 웹 트랜잭션 중 Elasticsearch 요청 횟수<br>_request로 표시됨_ |
| **gitlab.http_request_duration_microseconds** <br>(gauge) | HTTP 요청 지연 시간(마이크로초)<br>_request로 표시됨_ |
| **gitlab.http_request_size_bytes** <br>(gauge) | HTTP 요청 크기(바이트)<br>_byte로 표시됨_ |
| **gitlab.http_response_size_bytes** <br>(gauge) | HTTP 요청 크기(바이트)<br>_byte로 표시됨_ |
| **gitlab.job.waiter_started.count** <br>(count) | \[OpenMetrics V2\] 웹 요청이 작업 완료를 기다리는 동안 시작된 작업 배치 수<br>_job으로 표시됨_ |
| **gitlab.job.waiter_started_total** <br>(count) | \[OpenMetrics V1\] 웹 요청이 작업 완료를 기다리는 동안 시작된 작업 배치 수<br>_job으로 표시됨_ |
| **gitlab.job.waiter_timeouts.count** <br>(count) | \[OpenMetrics V2\] 웹 요청이 작업 완료를 기다리는 동안 시간 초과된 작업 ​​배치 수<br>_job으로 표시됨_ |
| **gitlab.job.waiter_timeouts_total** <br>(count) | \[OpenMetrics V1\] 웹 요청이 작업 완료를 기다리는 동안 시간 초과된 작업 ​​배치 수<br>_job으로 표시됨_ |
| **gitlab.method_call_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 메서드 호출 실제 소요 시간<br>_second로 표시됨_ |
| **gitlab.method_call_duration_seconds.count** <br>(count) | 메서드 호출 횟수 실제 소요 시간|
| **gitlab.method_call_duration_seconds.sum** <br>(count) | 메서드 호출 횟수 실제 소요 시간 합계<br>_second로 표시됨_ |
| **gitlab.page_out_of_bounds** <br>(count) | PageLimiter 페이지네이션 한도에 도달한 횟수 카운터|
| **gitlab.pipelines_created.count** <br>(count) | \[OpenMetrics V2\] 생성된 파이프라인 수 카운터|
| **gitlab.pipelines_created_total** <br>(count) | \[OpenMetrics V1\] 생성된 파이프라인 수 카운터|
| **gitlab.process_cpu_seconds.count** <br>(count) | \[OpenMetrics V2\] 사용자 및 시스템 CPU 총 사용 시간(초)<br>_request로 표시됨_ |
| **gitlab.process_cpu_seconds_total** <br>(count) | \[OpenMetrics V1\] 사용자 및 시스템 CPU 총 사용 시간(초)<br>_request로 표시됨_ |
| **gitlab.process_max_fds** <br>(gauge) | 열려 있는 파일 디스크립터의 최대 개수<br>_request로 표시됨_ |
| **gitlab.process_open_fds** <br>(gauge) | 열려있는 파일 디스크립터 수<br>_request로 표시됨_ |
| **gitlab.process_resident_memory_bytes** <br>(gauge) | 레지던트 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **gitlab.process_start_time_seconds** <br>(gauge) | Unix Epoch 이후 프로세스 시작 시간(초)<br>_request로 표시됨_ |
| **gitlab.process_virtual_memory_bytes** <br>(gauge) | 가상 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **gitlab.prometheus_build_info** <br>(gauge) | Prometheus 빌드 시점의 version, revision, branch, goversion으로 라벨링된 값이 항상 '1'인 메트릭<br>_request로 표시됨_ |
| **gitlab.prometheus_config_last_reload_success_timestamp_seconds** <br>(gauge) | 마지막으로 구성이 성공적으로 다시 로드된 타임스탬프<br>_request로 표시됨_ |
| **gitlab.prometheus_config_last_reload_successful** <br>(gauge) | 마지막 구성 재설정 시도가 성공했는지 여부<br>_request로 표시됨_ |
| **gitlab.prometheus_engine_queries** <br>(gauge) | 현재 실행 중이거나 대기 중인 쿼리 수<br>_request로 표시됨_ |
| **gitlab.prometheus_engine_queries_concurrent_max** <br>(gauge) | 동시 쿼리 최대 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_engine_query_duration_seconds** <br>(gauge) | 쿼리 타이밍<br>_request로 표시됨_ |
| **gitlab.prometheus_evaluator_duration_seconds** <br>(gauge) | 규칙 그룹 평가 기간<br>_request로 표시됨_ |
| **gitlab.prometheus_evaluator_iterations.count** <br>(count) | \[OpenMetrics V2\] 실행, 누락 또는 건너뛴 경우를 포함하여 예정된 규칙 그룹 평가의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_evaluator_iterations_missed.count** <br>(count) | \[OpenMetrics V2\] 규칙 그룹 평가 지연으로 인해 누락된 규칙 그룹 평가의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_evaluator_iterations_missed_total** <br>(count) | \[OpenMetrics V1\] 규칙 그룹 평가 지연으로 인해 누락된 규칙 그룹 평가의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_evaluator_iterations_skipped.count** <br>(count) | \[OpenMetrics V2\] 메트릭 저장 용량 제한으로 인해 건너뛴 규칙 그룹 평가의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_evaluator_iterations_skipped_total** <br>(count) | \[OpenMetrics V1\] 메트릭 저장 용량 제한으로 인해 건너뛴 규칙 그룹 평가의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_evaluator_iterations_total** <br>(count) | \[OpenMetrics V1\] 실행, 누락 또는 건너뛴 경우를 포함하여 예정된 규칙 그룹 평가의 총 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_checkpoint_duration_seconds** <br>(gauge) | 열려 있거나 아직 저장되지 않은 청크에 체크포인트를 생성하는 데 걸린 시간(초) <br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_checkpoint_last_duration_seconds** <br>(gauge) | 열려있거나 아직 저장되지 않은 청크를 포함하여 마지막 체크포인트 실행 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_checkpoint_last_size_bytes** <br>(gauge) | 열려 있거나 아직 영구 저장되지 않은 청크들의 마지막 체크포인트 크기<br>_byte로 표시됨_ |
| **gitlab.prometheus_local_storage_checkpoint_series_chunks_written** <br>(gauge) | 열려있거나 아직 저장되지 않은 청크에 체크포인트를 실행하는 동안 시리즈별로 기록된 청크 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_checkpointing** <br>(gauge) | 저장소가 체크포인트 기능을 사용하면 1, 그렇지 않으면 0을 반환<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_chunk_ops.count** <br>(count) | \[OpenMetrics V2\] 유형별 청크 작업의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_chunk_ops_total** <br>(count) | \[OpenMetrics V1\] 유형별 청크 작업 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_chunks_to_persist** <br>(count) | 현재 영구 저장을 기다리는 청크 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_fingerprint_mappings.count** <br>(count) | \[OpenMetrics V2\] 충돌 방지를 위해 매핑되는 지문의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_fingerprint_mappings_total** <br>(count) | \[OpenMetrics V1\] 충돌 방지를 위해 매핑되는 지문의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_inconsistencies.count** <br>(count) | \[OpenMetrics V2\] 로컬 저장소에서 불일치가 감지될 때마다 카운터가 증가함. 이 값이 0보다 크면 가능한 한 빨리 서버를 재시작하세요.<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_inconsistencies_total** <br>(count) | \[OpenMetrics V1\] 로컬 저장소에서 불일치가 감지될 때마다 카운터가 증가함. 이 값이 0보다 크면 가능한 한 빨리 서버를 재시작하세요.<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_indexing_batch_duration_seconds** <br>(gauge) | 배치 인덱싱 소요 시간(초)의 분위수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_indexing_batch_sizes** <br>(gauge) | 배치 크기(배치당 메트릭 수) 인덱싱에 대한 분위수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_indexing_queue_capacity** <br>(gauge) | 인덱싱 대기열 용량<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_indexing_queue_length** <br>(gauge) | 인덱싱 대기 중인 메트릭 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_ingested_samples.count** <br>(count) | \[OpenMetrics V2\] 수집한 샘플 총 개수<br>_ request로 표시됨_ |
| **gitlab.prometheus_local_storage_ingested_samples_total** <br>(count) | \[OpenMetrics V1\] 수집한 샘플의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_maintain_series_duration_seconds** <br>(gauge) | 시계열 유지 보수에 걸린 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_memory_chunkdescs** <br>(gauge) | 현재 메모리에 있는 청크 디스크립터의 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_memory_chunks** <br>(gauge) | 현재 메모리에 있는 청크 개수. 이 개수에는 복제된 청크(즉, 디스크립터가 없는 청크)는 포함되지 않습니다.<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_memory_dirty_series** <br>(gauge) | 현재 충돌 복구 중 디스크 탐색이 필요한 시리즈 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_memory_series** <br>(gauge) | 현재 메모리에 있는 시리즈 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_non_existent_series_matches.count** <br>(count) | \[OpenMetrics V2\] 레이블 매칭 또는 청크 사전 로딩 중에 존재하지 않는 시리즈가 얼마나 자주 참조되었는지 표시. 오래된 레이블 인덱스를 나타내는 지표입니다.<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_non_existent_series_matches_total** <br>(count) | \[OpenMetrics V1\] 레이블 매칭 또는 청크 사전 로딩 중에 존재하지 않는 시리즈가 얼마나 자주 참조되었는지 표시. 오래된 레이블 인덱스를 나타내는 지표입니다.<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_open_head_chunks** <br>(gauge) | 현재 열린 헤드 청크 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_out_of_order_samples.count** <br>(count) | \[OpenMetrics V2\] 시리즈 샘플 중 마지막으로 수신된 샘플의 타임스탬프와 같거나 그 이전이라서 폐기된 샘플의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_out_of_order_samples_total** <br>(count) | \[OpenMetrics V1\] 시린즈 샘플 중 마지막으로 수신된 샘플의 타임스탬프와 같거나 그 이전이라서 폐기된 샘플의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_persist_errors.count** <br>(count) | \[OpenMetrics V2\] 영구 저장 계층에 쓰기 작업 중 발생한 총 오류 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_persist_errors_total** <br>(count) | \[OpenMetrics V1\] 영구 저장 계층에 쓰기 작업 중 발생한 총 오류 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_persistence_urgency_score** <br>(gauge) | 영구 저장해야 하는 청크의 긴급도 점수. 0은 가장 덜 긴급, 1은 가장 긴급<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_queued_chunks_to_persist.count** <br>(count) | \[OpenMetrics V2\] 영구 저장을 위해 대기 중인 청크의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_queued_chunks_to_persist_total** <br>(count) | \[OpenMetrics V1\] 영구 저장을 대기 중인 청크의 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_rushed_mode** <br>(gauge) | 저장소가 긴급 모드이면 1, 그렇지 않으면 0<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_series_chunks_persisted** <br>(gauge) | 시리즈별로 저장된 청크 수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_series_ops.count** <br>(count) | \[OpenMetrics V2\] 유형별 시리즈 작업 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_series_ops_total** <br>(count) | \[OpenMetrics V1\] 유형별 시리즈 작업 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_local_storage_started_dirty** <br>(gauge) | Prometheus 시작 중에 로컬 저장소가 손상된 것으로 확인되었는지 여부 (및 크래시 복구 발생 여부)<br>_request로 표시_ |
| **gitlab.prometheus_local_storage_target_heap_size_bytes** <br>(gauge) | 구성된 대상 힙 크기(바이트)<br>_byte로 표시됨_ |
| **gitlab.prometheus_notifications_alertmanagers_discovered** <br>(gauge) | 발견되어 활성화된 Alertmanager 수<br>_request로 표시됨_ |
| **gitlab.prometheus_notifications_dropped.count** <br>(count) | \[OpenMetrics V2\] Alertmanager로 전송 중 오류로 인해 누락된 총 알림 수<br>_request로 표시됨_ |
| **gitlab.prometheus_notifications_dropped_total** <br>(count) | \[OpenMetrics V1\] Alertmanager로 전송 중 오류로 인해 누락된 총 알림 수<br>_request로 표시됨_ |
| **gitlab.prometheus_notifications_queue_capacity** <br>(gauge) | 알림 대기열 용량<br>_request로 표시됨_ |
| **gitlab.prometheus_notifications_queue_length** <br>(gauge) | 대기열에 있는 알림 수<br>_request로 표시됨_ |
| **gitlab.prometheus_rule_evaluation_failures.count** <br>(count) | \[OpenMetrics V2\] 규칙 평가 실패 총 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_rule_evaluation_failures_total** <br>(count) | \[OpenMetrics V1\] 규칙 평가 실패 총 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_azure_refresh_duration_seconds** <br>(gauge) | Azure-SD 새로 고침에 소요되는 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_azure_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] Azure-SD 새로 고침 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_azure_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] Azure-SD 새로 고침 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_consul_rpc_duration_seconds** <br>(gauge) | Consul RPC 호출 지속 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_consul_rpc_failures.count** <br>(count) | \[OpenMetrics V2\] Consul RPC 호출 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_consul_rpc_failures_total** <br>(count) | \[OpenMetrics V1\] Consul RPC 호출 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_dns_lookup_failures.count** <br>(count) | \[OpenMetrics V2\] DNS-SD 조회 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_dns_lookup_failures_total** <br>(count) | \[OpenMetrics V1\] DNS-SD 조회 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_dns_lookups.count** <br>(count) | \[OpenMetrics V2\] DNS-SD 조회 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_dns_lookups_total** <br>(count) | \[OpenMetrics V1\] DNS-SD 조회 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_ec2_refresh_duration_seconds** <br>(gauge) | EC2-SD 새로 고침에 걸리는 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_ec2_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] TEC2-SD 스크레이프 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_ec2_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] EC2-SD 스크레이프 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_file_read_errors.count** <br>(count) | \[OpenMetrics V2\] 파일-SD 읽기 오류 수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_file_read_errors_total** <br>(count) | \[OpenMetrics V1\] T파일-SD 읽기 오류 수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_file_scan_duration_seconds** <br>(gauge) | 파일-SD 스캔 소요 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_gce_refresh_duration** <br>(gauge) | GCE-SD 새로 고침 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_gce_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] GCE-SD 새로 고침 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_gce_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] GCE-SD 새로 고침 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_kubernetes_events.count** <br>(count) | \[OpenMetrics V2\] 처리된 Kubernetes 이벤트 수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_kubernetes_events_total** <br>(count) | \[OpenMetrics V1\] 처리된 Kubernetes 이벤트 수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_marathon_refresh_duration_seconds** <br>(gauge) | Marathon-SD 새로 고침에 걸리는 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_marathon_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] Marathon-SD 새로 고침 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_marathon_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] Marathon-SD 새로 고침 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_openstack_refresh_duration_seconds** <br>(gauge) | OpenStack-SD 새로 고침에 걸리는 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_openstack_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] OpenStack-SD 스크레이프 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_openstack_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] OpenStack-SD 스크레이프 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_triton_refresh_duration_seconds** <br>(gauge) | Triton-SD 새로 고침에 걸리는 시간(초)<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_triton_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] Triton-SD 스크레이프 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_sd_triton_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] Triton-SD 스크레이프 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_target_interval_length_seconds** <br>(gauge) | 스크레이프 사이의 실제 간격<br>_request로 표시됨_ |
| **gitlab.prometheus_target_scrape_pool_sync.count** <br>(count) | \[OpenMetrics V2\] 스크레이프 풀에서 실행된 총 동기화 횟수<br>_ request로 표시됨_ |
| **gitlab.prometheus_target_scrape_pool_sync_total** <br>(count) | \[OpenMetrics V1\] 스크레이프 풀에서 실행된 총 동기화 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_target_scrapes_exceeded_sample_limit.count** <br>(count) | \[OpenMetrics V2\] 샘플 제한에 도달하여 거부된 스크레이프 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_target_scrapes_exceeded_sample_limit_total** <br>(count) | \[OpenMetrics V1\] 샘플 제한에 도달하여 거부된 스크레이프 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_target_skipped_scrapes.count** <br>(count) | \[OpenMetrics V2\] 메트릭 저장 용량 제한으로 인해 건너뛴 스크레이프 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_target_skipped_scrapes_total** <br>(count) | \[OpenMetrics V1\] 메트릭 저장 용량 제한으로 인해 건너뛴 스크레이프 총 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_target_sync_length_seconds** <br>(gauge) | 스크레이프 풀을 동기화하는 실제 간격<br>_request로 표시됨_ |
| **gitlab.prometheus_treecache_watcher_goroutines** <br>(gauge) | 현재 watcher goroutine 개수<br>_request로 표시됨_ |
| **gitlab.prometheus_treecache_zookeeper_failures.count** <br>(count) | \[OpenMetrics V2\]  ZooKeeper 총 실패 횟수<br>_request로 표시됨_ |
| **gitlab.prometheus_treecache_zookeeper_failures_total** <br>(count) | \[OpenMetrics V1\] ZooKeeper 총 실패 횟수<br>_request로 표시됨_ |
| **gitlab.puma.active_connections** <br>(gauge) | 요청을 처리하는 Puma 스레드 수<br>_thread로 표시됨_ |
| **gitlab.puma.idle_threads** <br>(gauge) | 생성되었지만 요청을 처리하지 않는 Puma 스레드 수<br>_thread로 표시됨_ |
| **gitlab.puma.killer_terminations.count** <br>(count) | \[OpenMetrics V2\] PumaWorkerKille가 종료한 워커 수<br>_worker로 표시됨_ |
| **gitlab.puma.killer_terminations_total** <br>(count) | \[OpenMetrics V1\] PumaWorkerKille가 종료한 워커 수<br>_worker로 표시됨_ |
| **gitlab.puma.max_threads** <br>(gauge) | Puma 워커 스레드의 최대 개수<br>_thread로 표시됨_ |
| **gitlab.puma.pool_capacity** <br>(gauge) | Puma 워커가 현재 처리할 수 있는 요청 수<br>_request로 표시됨_ |
| **gitlab.puma.queued_connections** <br>(gauge) | 해당 Puma 워커의`todo` 세트에서 워커 스레드를 기다리는 연결 수<br>_connection으로 표시됨_ |
| **gitlab.puma.running** <br>(gauge) | 실행 중인 Puma 스레드 수<br>_thread로 표시됨_ |
| **gitlab.puma.running_workers** <br>(gauge) | 부팅된 Puma 워커 수<br>_worker로 표시됨_ |
| **gitlab.puma.stale_workers** <br>(gauge) | 오래된 Puma 워커 수<br>_worker로 표시됨_ |
| **gitlab.puma.workers** <br>(gauge) | Puma 워커 수<br>_worker로 표시됨_ |
| **gitlab.rack.http_request_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 랙 미들웨어의 HTTP 응답 시간<br>_second로 표시됨_ |
| **gitlab.rack.http_request_duration_seconds.count** <br>(count) | 랙 미들웨어의 HTTP 응답 시간|
| **gitlab.rack.http_request_duration_seconds.sum** <br>(count) | 랙 미들웨어의 HTTP 응답 시간 합계<br>_second로 표시됨_ |
| **gitlab.rack.http_requests.count** <br>(count) | \[OpenMetrics V2\] 랙 요청 수<br>_request로 표시됨_ |
| **gitlab.rack.http_requests_total** <br>(count) | \[OpenMetrics V1\] 랙 요청 수<br>_request로 표시됨_ |
| **gitlab.rack.uncaught_errors.count** <br>(count) | \[OpenMetrics V2\] 처리되지 않은 오류를 처리하는 랙 연결 수<br>_connection으로 표시됨_ |
| **gitlab.rack.uncaught_errors_total** <br>(count) | \[OpenMetrics V1\] 처리되지 않은 오류를 처리하는 랙 연결 수<br>_connection으로 표시됨_ |
| **gitlab.rails_queue_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] GitLab Workhorse가 Rails로 요청을 전달하는 데 걸리는 지연 시간<br>_second로 표시됨_ |
| **gitlab.rails_queue_duration_seconds.count** <br>(count) | GitLab Workhorse가 Rails로 요청을 전달하는 데 걸리는 지연 시간|
| **gitlab.rails_queue_duration_seconds.sum** <br>(count) | GitLab Workhorse가 Rails로 요청을 전달하는 데 걸리는 지연 시간 합계<br>_second로 표시됨_ |
| **gitlab.redis.client_exceptions.count** <br>(count) | \[OpenMetrics V2\] 예외 유형별로 분류된 Redis 클라이언트 예외 건수<br>_error로 표시됨_ |
| **gitlab.redis.client_exceptions_total** <br>(count) | \[OpenMetrics V1\] 예외 유형별로 분류된 Redis 클라이언트 예외 건수<br>_error로 표시됨_ |
| **gitlab.redis.client_requests.count** <br>(count) | \[OpenMetrics V2\] Redis 클라이언트 요청 수<br>_request로 표시됨_ |
| **gitlab.redis.client_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 차단 명령을 제외한 Redis 요청 지연 시간|
| **gitlab.redis.client_requests_duration_seconds.count** <br>(count) | 차단 명령을 제외한 Redis 요청 지연 시간|
| **gitlab.redis.client_requests_duration_seconds.sum** <br>(count) | 차단 명령을 제외한 Redis 요청 지연 시간 합계<br>_second로 표시됨_ |
| **gitlab.redis.client_requests_total** <br>(count) | \[OpenMetrics V1\] Redis 클라이언트 요청 수<br>_request로 표시됨_ |
| **gitlab.ruby.file_descriptors** <br>(gauge) | 프로세스당 파일 디스크립터 수|
| **gitlab.ruby.gc_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Ruby가 GC에 소요한 시간<br>_second로 표시됨_ |
| **gitlab.ruby.gc_duration_seconds.count** <br>(count) | Ruby가 GC에 소요한 시간|
| **gitlab.ruby.gc_duration_seconds.sum** <br>(count) | Ruby가 GC에 소요한 시간 합계<br>_second로 표시됨_ |
| **gitlab.ruby.gc_stat** <br>(gauge) | \[OpenMetrics V2\] Ruby 가비지 컬렉터 수|
| **gitlab.ruby.gc_stat.count** <br>(gauge) | \[OpenMetrics V1\] Ruby 가비지 컬렉터 수|
| **gitlab.ruby.gc_stat.heap_allocatable_pages** <br>(gauge) | 사용 가능한 할당 페이지 수<br>_page로 표시됨_ |
| **gitlab.ruby.gc_stat.heap_allocated_pages** <br>(gauge) | 현재 할당된 힙 페이지 수<br>_page로 표시됨_ |
| **gitlab.ruby.gc_stat.heap_available_slots** <br>(gauge) | 힙 페이지의 슬롯 수|
| **gitlab.ruby.gc_stat.heap_eden_pages** <br>(gauge) | 활성 객체를 포함하는 힙 페이지 수<br>_page로 표시됨_ |
| **gitlab.ruby.gc_stat.heap_final_slots** <br>(gauge) | 파이널라이저가 있는 힙 슬롯 수|
| **gitlab.ruby.gc_stat.heap_free_slots** <br>(gauge) | 힙의 빈 슬롯 수|
| **gitlab.ruby.gc_stat.heap_live_slots** <br>(gauge) | 힙에 있는 활성 슬롯 수|
| **gitlab.ruby.gc_stat.heap_marked_slots** <br>(gauge) | 표시된 슬롯 수 또는 오래된 슬롯 수<br>_page로 표시됨_ |
| **gitlab.ruby.gc_stat.heap_sorted_length** <br>(gauge) | 메모리 힙의 길이|
| **gitlab.ruby.gc_stat.heap_tomb_pages** <br>(gauge) | 활성 객체가 없는 힙 페이지 수<br>_page로 표시됨_ |
| **gitlab.ruby.gc_stat.major_gc_count** <br>(gauge) | 주요 가비지 컬렉터 수<br>_garbage collection으로 표시됨_ |
| **gitlab.ruby.gc_stat.malloc_increase_bytes** <br>(gauge) | 힙 외부에 할당된 바이트 수<br>_byte로 표시됨_ |
| **gitlab.ruby.gc_stat.malloc_increase_bytes_limit** <br>(gauge) | 힙 외부에 할당할 수 있는 바이트 수 한도<br>_byte로 표시됨_ |
| **gitlab.ruby.gc_stat.minor_gc_count** <br>(gauge) | 마이너 가비지 컬렉터 수 <br>_garbage collection으로 표시됨_ |
| **gitlab.ruby.gc_stat.old_objects** <br>(gauge) | 오래된 객체 수|
| **gitlab.ruby.gc_stat.old_objects_limit** <br>(gauge) | 오래된 객체 수 제한|
| **gitlab.ruby.gc_stat.oldmalloc_increase_bytes** <br>(gauge) | 오래된 객체를 위해 힙 외부에 할당된 바이트 수<br>_byte로 표시됨_ |
| **gitlab.ruby.gc_stat.oldmalloc_increase_bytes_limit** <br>(gauge) | 오래된 객체에 힙 외부 영역에 할당할 수 있는 바이트 수 한도<br>_byte로 표시됨_ |
| **gitlab.ruby.gc_stat.remembered_wb_unprotected_objects** <br>(gauge) | 새 객체를 참조하는 오래된 객체 수|
| **gitlab.ruby.gc_stat.remembered_wb_unprotected_objects_limit** <br>(gauge) | WB 미적용 객체 제한|
| **gitlab.ruby.gc_stat.total_allocated_objects** <br>(gauge) | 할당된 객체의 총 개수|
| **gitlab.ruby.gc_stat.total_allocated_pages** <br>(gauge) | 할당된 페이지 수<br>_page로 표시됨_ |
| **gitlab.ruby.gc_stat.total_freed_objects** <br>(gauge) | 해제된 객체의 수|
| **gitlab.ruby.gc_stat.total_freed_pages** <br>(gauge) | 해제된 페이지 수<br>_page로 표시됨_ |
| **gitlab.ruby.memory_bytes** <br>(gauge) | 메모리 사용량<br>_byte로 표시됨_ |
| **gitlab.ruby.process_cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 and V2\] 프로세스별 총 CPU 사용 시간<br>_second로 표시됨_ |
| **gitlab.ruby.process_max_fds** <br>(gauge) | 프로세스당 열려 있는 파일 디스크립터의 최대 개수|
| **gitlab.ruby.process_proportional_memory_bytes** <br>(gauge) | 프로세스별 메모리 사용량(PSS/Proportional Set Size)<br>_byte로 표시됨_ |
| **gitlab.ruby.process_resident_memory_bytes** <br>(gauge) | 프로세스별 메모리 사용량<br>_byte로 표시됨_ |
| **gitlab.ruby.process_start_time_seconds** <br>(gauge) | 프로세스 시작 시간의 UNIX 타임스탬프<br>_second로 표시됨_ |
| **gitlab.ruby.process_unique_memory_bytes** <br>(gauge) | 프로세스별 메모리 사용량 (USS/Unique Set Size)<br>_byte로 표시됨_ |
| **gitlab.ruby.sampler_duration_seconds.count** <br>(count) | \[OpenMetrics V2\] 통계 수집에 소요된 시간<br>_second로 표시됨_ |
| **gitlab.ruby.sampler_duration_seconds_total** <br>(count) | \[OpenMetrics V1\] 통계 수집에 소요된 시간<br>_second로 표시됨_ |
| **gitlab.ruby.threads_max_expected_threads** <br>(gauge) | 애플리케이션 작업을 위해 실행될 것으로 예상되는 최대 스레드 수<br>_thread로 표시됨_ |
| **gitlab.ruby.threads_running_threads** <br>(gauge) | 이름별 실행 중인 Ruby 스레드 수<br>_thread로 표시됨_ |
| **gitlab.sidekiq.concurrency** <br>(gauge) | Sidekiq 작업 최대 수<br>_job으로 표시됨_ |
| **gitlab.sidekiq.elasticsearch_requests.count** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업 실행 중 발생한 Elasticsearch 요청 <br>_request로 표시됨_ |
| **gitlab.sidekiq.elasticsearch_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업이 Elasticsearch 서버에 요청을 보내는 데 소요된 시간(초)|
| **gitlab.sidekiq.elasticsearch_requests_duration_seconds.count** <br>(count) | Sidekiq 작업이 Elasticsearch 서버에 요청을 보내는 데 소요된 시간(초).|
| **gitlab.sidekiq.elasticsearch_requests_duration_seconds.sum** <br>(count) | Sidekiq 작업이 Elasticsearch 서버에 요청을 보내는 데 소요된 시간의 합계(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.elasticsearch_requests_total** <br>(count) | \[OpenMetrics V1\] Sidekiq 작업 실행 중 Elasticsearch 요청<br>_request로 표시됨_ |
| **gitlab.sidekiq.jobs_completion_seconds.count** <br>(count) | Sidekiq 작업 완료에 걸리는 시간(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_completion_seconds.sum** <br>(count) | Sidekiq 작업 완료에 걸린 시간(초)의 합계<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_cpu_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업 실행에 걸리는 CPU 시간(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_cpu_seconds.count** <br>(count) | Sidekiq 작업을 실행하는 데 걸린 CPU 시간(초)|
| **gitlab.sidekiq.jobs_cpu_seconds.sum** <br>(count) | Sidekiq 작업을 실행하는 데 걸린 CPU 시간(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_db_second.bucket** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업을 실행하는 데 걸리는 DB 시간(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_db_second.count** <br>(count) | Sidekiq 작업을 실행하는 데 걸리는 DB 시간(초)|
| **gitlab.sidekiq.jobs_db_second.sum** <br>(count) | Sidekiq 작업을 실행하는 데 걸리는 DB 시간 합계(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_failed.count** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업 실패 건수<br>_job로 표시됨_ |
| **gitlab.sidekiq.jobs_failed_total** <br>(count) | \[OpenMetrics V1\] Sidekiq 작업 실패 건수<br>_job으로 표시됨_ |
| **gitlab.sidekiq.jobs_gitaly_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Sidekiq job1을 실행하는 데 걸리는 Gitaly 시간(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_gitaly_seconds.count** <br>(count) | Gitaly에서 Sidekiq 작업을 실행하는 데 걸린 시간(초)|
| **gitlab.sidekiq.jobs_gitaly_seconds.sum** <br>(count) | Sidekiq 작업을 실행하는 데 걸린 Gitaly 시간 합계(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_queue_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업이 실행되기 전에 대기열에 있었던 시간(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_queue_duration_seconds.count** <br>(count) | Sidekiq 작업이 실행되기 전에 대기열에 있었던 시간(초)|
| **gitlab.sidekiq.jobs_queue_duration_seconds.sum** <br>(count) | Sidekiq 작업이 실행되기 전에 대기열에 있었던 시간의 합(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.jobs_retried.count** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업 재시도 횟수<br>_job으로 표시됨_ |
| **gitlab.sidekiq.jobs_retried_total** <br>(count) | \[OpenMetrics V1\] Sidekiq 작업 재시도 횟수<br>_job으로 표시됨_ |
| **gitlab.sidekiq.redis_requests.count** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업 실행 중 Redis 요청<br>_request로 표시됨_ |
| **gitlab.sidekiq.redis_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Sidekiq 작업이 Redis 서버를 쿼리하는 데 소요된 시간(초)|
| **gitlab.sidekiq.redis_requests_duration_seconds.count** <br>(count) | Sidekiq 작업이 Redis 서버를 쿼리하는 데 소요된 시간(초)|
| **gitlab.sidekiq.redis_requests_duration_seconds.sum** <br>(count) | Sidekiq 작업이 Redis 서버를 쿼리하는 데 소요된 시간 합계(초)<br>_second로 표시됨_ |
| **gitlab.sidekiq.redis_requests_total** <br>(count) | \[OpenMetrics V1\] Sidekiq 작업 실행 중 Redis 요청<br>_request로 표시됨_ |
| **gitlab.sidekiq.running_jobs** <br>(gauge) | 실행 중인 Sidekiq 작업 수<br>_job으로 표시됨_ |
| **gitlab.sql_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] SCHEMA 작업 및 BEGIN/COMMIT을 제외한 총 SQL 실행 시간<br>_second로 표시됨_ |
| **gitlab.sql_duration_seconds.count** <br>(count) | SCHEMA 작업 및 BEGIN/COMMIT을 제외한 총 SQL 실행 시간|
| **gitlab.sql_duration_seconds.sum** <br>(count) | SCHEMA 작업 및 BEGIN/COMMIT을 제외한 총 SQL 실행 시간 합계<br>_second로 표시됨_ |
| **gitlab.successful_login_captcha.count** <br>(count) | 로그인 중 CAPTCHA 시도 성공 횟수|
| **gitlab.successful_login_captcha_total** <br>(count) | 로그인 중 CAPTCHA 시도 성공 횟수|
| **gitlab.transaction.allocated_memory_bytes.bucket** <br>(count) | \[OpenMetrics V2\] 모든 트랜잭션을 위해 할당된 메모리 (gitlab_transaction\_\* metrics)<br>_byte로 표시됨_ |
| **gitlab.transaction.allocated_memory_bytes.count** <br>(count) | 모든 트랜잭션을 위해 할당된 메모리 (gitlab_transaction\_\* metrics)<br>_byte로 표시됨_ |
| **gitlab.transaction.allocated_memory_bytes.sum** <br>(count) | 모든 트랜잭션을 위해 할당된 메모리 합계 (gitlab_transaction\_\* metrics)<br>_byte로 표시됨_ |
| **gitlab.transaction.cache_count.count** <br>(count) | \[OpenMetrics V2\] Rails 캐시 호출 총 횟수 (누적)|
| **gitlab.transaction.cache_count_total** <br>(count) | \[OpenMetrics V1\] Rails 캐시 호출 총 횟수 (누적)|
| **gitlab.transaction.cache_duration.count** <br>(count) | \[OpenMetrics V2\] Rails 캐시 호출(누적)에 소요된 총 시간(초)<br>_second로 표시됨_ |
| **gitlab.transaction.cache_duration_total** <br>(count) | \[OpenMetrics V1\] Rails 캐시 호출(누적)에 소요된 총 시간(초)<br>_second로 표시됨_ |
| **gitlab.transaction.cache_read_hit_count.count** <br>(count) | \[OpenMetrics V2\] Rails 캐시 호출에 대한 캐시 적중 횟수<br>_hit로 표시됨_ |
| **gitlab.transaction.cache_read_hit_count_total** <br>(count) | \[OpenMetrics V1\] Rails 캐시 호출에 대한 캐시 적중 횟수<br>_hit로 표시됨_ |
| **gitlab.transaction.cache_read_miss_count.count** <br>(count) | \[OpenMetrics V2\] Rails 캐시 호출에 대한 캐시 미스 횟수<br>_miss로 표시됨_ |
| **gitlab.transaction.cache_read_miss_count_total** <br>(count) | \[OpenMetrics V1\] Rails 캐시 호출에 대한 캐시 미스 횟수<br>_miss로 표시됨_ |
| **gitlab.transaction.duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 모든 트랜잭션 소요 시간 (gitlab_transaction\_\* metrics)<br>_second로 표시됨_ |
| **gitlab.transaction.duration_seconds.count** <br>(count) | 모든 트랜잭션 소요 시간 (gitlab_transaction\_\* metrics)|
| **gitlab.transaction.duration_seconds.sum** <br>(count) | 모든 트랜잭션 소요 시간 합계 (gitlab_transaction\_\* metrics)<br>_second로 표시됨_ |
| **gitlab.transaction.event_build_found.count** <br>(count) | \[OpenMetrics V2\] API/작업/요청에 발견된 빌드 개수|
| **gitlab.transaction.event_build_found_total** <br>(count) | \[OpenMetrics V1\] API/작업/요청에 발견된 빌드 개수|
| **gitlab.transaction.event_build_invalid.count** <br>(count) | \[OpenMetrics V2\] API/작업/요청에 관해 동시 충돌로 인해 무효화된 빌드 개수|
| **gitlab.transaction.event_build_invalid_total** <br>(count) | \[OpenMetrics V1\] API /jobs/request에 대한 동시 충돌로 무효화된 빌드 개수|
| **gitlab.transaction.event_build_not_found.count** <br>(count) | \[OpenMetrics V2\] API /jobs/request에서 빌드를 찾지 못한 횟수|
| **gitlab.transaction.event_build_not_found_cached.count** <br>(count) | \[OpenMetrics V2\] API /jobs/request에 대해 찾을 수 없는 빌드가 캐시된 응답 개수|
| **gitlab.transaction.event_build_not_found_cached_total** <br>(count) | \[OpenMetrics V1\] API /jobs/request에 대해 찾을 수 없는 빌드가 캐시된 응답 개수|
| **gitlab.transaction.event_build_not_found_total** <br>(count) | \[OpenMetrics V1\] API /jobs/request에서 빌드를 찾지 못한 횟수|
| **gitlab.transaction.event_change_default_branch.count** <br>(count) | \[OpenMetrics V2\] 리포지토리 기본 브랜치 변경 횟수|
| **gitlab.transaction.event_change_default_branch_total** <br>(count) | \[OpenMetrics V1\] 리포지토리 기본 브랜치 변경 횟수|
| **gitlab.transaction.event_create_repository.count** <br>(count) | \[OpenMetrics V2\] 새 리포지토리 생성 횟수|
| **gitlab.transaction.event_create_repository_total** <br>(count) | \[OpenMetrics V1\] 새 리포지토리 생성 횟수|
| **gitlab.transaction.event_etag_caching_cache_hit.count** <br>(count) | \[OpenMetrics V2\] etag 캐시 적중 횟수<br>_hit로 표시됨_ |
| **gitlab.transaction.event_etag_caching_cache_hit_total** <br>(count) | \[OpenMetrics V1\] etag 캐시 적중 횟수<br>_hit로 표시됨_ |
| **gitlab.transaction.event_etag_caching_header_missing.count** <br>(count) | \[OpenMetrics V2\] etag 캐시 미스 - 헤더 누락 횟수<br>_miss로 표시됨_ |
| **gitlab.transaction.event_etag_caching_header_missing_total** <br>(count) | \[OpenMetrics V1\] etag 캐시 미스 - 헤더 누락 횟수<br>_miss로 표시됨_ |
| **gitlab.transaction.event_etag_caching_key_not_found.count** <br>(count) | \[OpenMetrics V2\] etag 캐시 미스 - 키 누락 횟수<br>_miss로 표시됨_ |
| **gitlab.transaction.event_etag_caching_key_not_found_total** <br>(count) | \[OpenMetrics V1\] etag 캐시 미스 - 키 누락 횟수<br>_miss로 표시됨_ |
| **gitlab.transaction.event_etag_caching_middleware_used.count** <br>(count) | \[OpenMetrics V2\] eTag 미들웨어 접근 횟수|
| **gitlab.transaction.event_etag_caching_middleware_used_total** <br>(count) | \[OpenMetrics V1\] eTag 미들웨어 접근 횟수|
| **gitlab.transaction.event_etag_caching_resource_changed.count** <br>(count) | \[OpenMetrics V2\] etag 캐시 미스 - 변경된 리소스 횟수|
| **gitlab.transaction.event_etag_caching_resource_changed_total** <br>(count) | \[OpenMetrics V1\] etag 캐시 미스 - 변경된 리소스 횟수|
| **gitlab.transaction.event_fork_repository.count** <br>(count) | \[OpenMetrics V2\] 리포지토리 포크(RepositoryForkWorker) 총 횟수. 소스 리포지토리가 존재할 때만 증가.|
| **gitlab.transaction.event_fork_repository_total** <br>(count) | \[OpenMetrics V1\] 리포지토리 포크(RepositoryForkWorker) 총 횟수. 소스 리포지토리가 존재할 때만 증가.|
| **gitlab.transaction.event_import_repository.count** <br>(count) | \[OpenMetrics V2\] 리포지토리 가져오기 횟수 (RepositoryImportWorker)|
| **gitlab.transaction.event_import_repository_total** <br>(count) | \[OpenMetrics V1\] 리포지토리 가져오기 횟수(RepositoryImportWorker)|
| **gitlab.transaction.event_push_branch.count** <br>(count) | \[OpenMetrics V2\] 모든 브랜치 푸시 횟수|
| **gitlab.transaction.event_push_branch_total** <br>(count) | \[OpenMetrics V1\] 모든 브랜치 푸시 횟수|
| **gitlab.transaction.event_push_commit.count** <br>(count) | \[OpenMetrics V2\] 커밋 횟수|
| **gitlab.transaction.event_push_commit_total** <br>(count) | \[OpenMetrics V1\] 커밋 횟수|
| **gitlab.transaction.event_push_tag.count** <br>(count) | \[OpenMetrics V2\] 태그 푸시 횟수|
| **gitlab.transaction.event_push_tag_total** <br>(count) | \[OpenMetrics V1\] 태그 푸시 횟수|
| **gitlab.transaction.event_rails_exception.count** <br>(count) | \[OpenMetrics V2\] Rails 예외 발생 횟수|
| **gitlab.transaction.event_rails_exception_total** <br>(count) | \[OpenMetrics V1\] Rails 예외 발생 횟수|
| **gitlab.transaction.event_receive_email.count** <br>(count) | \[OpenMetrics V2\] 수신된 이메일 개수 <br>_email로 표시됨_ |
| **gitlab.transaction.event_receive_email_total** <br>(count) | \[OpenMetrics V1\] 수신된 이메일 개수<br>_email로 표시됨_ |
| **gitlab.transaction.event_remote_mirrors_failed.count** <br>(count) | \[OpenMetrics V2\] 실패한 원격 미러링 개수|
| **gitlab.transaction.event_remote_mirrors_failed_total** <br>(count) | \[OpenMetrics V1\] 실패한 원격 미러링 개수|
| **gitlab.transaction.event_remote_mirrors_finished.count** <br>(count) | \[OpenMetrics V2\] 종료된 원격 미러링 개수|
| **gitlab.transaction.event_remote_mirrors_finished_total** <br>(count) | \[OpenMetrics V1\] 종료된 원격 미러링 개수|
| **gitlab.transaction.event_remote_mirrors_running.count** <br>(count) | \[OpenMetrics V2\] 실행 중인 원격 미러링 개수|
| **gitlab.transaction.event_remote_mirrors_running_total** <br>(count) | \[OpenMetrics V1\] 실행 중인 원격 미러링 개수|
| **gitlab.transaction.event_remove_branch.count** <br>(count) | \[OpenMetrics V2\] 리포지토리 브랜치 제거 횟수|
| **gitlab.transaction.event_remove_branch_total** <br>(count) | \[OpenMetrics V1\] 리포지토리 브랜치 제거 횟수|
| **gitlab.transaction.event_remove_repository.count** <br>(count) | \[OpenMetrics V2\] 리포지토리 제거 횟수|
| **gitlab.transaction.event_remove_repository_total** <br>(count) | \[OpenMetrics V1\] 리포지토리 제거 횟수|
| **gitlab.transaction.event_remove_tag.count** <br>(count) | \[OpenMetrics V2\] 어떤 리포지토리에서든 태그가 제거된 횟수|
| **gitlab.transaction.event_remove_tag_total** <br>(count) | \[OpenMetrics V1\] 리포지토리 태그 제거 횟수|
| **gitlab.transaction.event_sidekiq_exception.count** <br>(count) | \[OpenMetrics V2\] Sidekiq 예외 발생 횟수|
| **gitlab.transaction.event_sidekiq_exception_total** <br>(count) | \[OpenMetrics V1\] Sidekiq 예외 발생 횟수|
| **gitlab.transaction.event_stuck_import_jobs.count** <br>(count) | \[OpenMetrics V2\] 중단된 임포트 작업 수|
| **gitlab.transaction.event_stuck_import_jobs_total** <br>(count) | \[OpenMetrics V1\] 중단된 임포트 작업 수|
| **gitlab.transaction.event_update_build.count** <br>(count) | \[OpenMetrics V2\] API /jobs/request/:id에 대한 업데이트 빌드 개수|
| **gitlab.transaction.event_update_build_total** <br>(count) | \[OpenMetrics V1\] API /jobs/request/:id에 대한 업데이트 빌드 개수|
| **gitlab.transaction.new_redis_connections.count** <br>(count) | \[OpenMetrics V2\] 새 Redis 연결 개수<br>_connection으로 표시됨_ |
| **gitlab.transaction.new_redis_connections_total** <br>(count) | \[OpenMetrics V1\] 새 Redis 연결 개수<br>_connection으로 표시됨_ |
| **gitlab.transaction.queue_duration.count** <br>(count) | \[OpenMetrics V2\] 작업 처리 전 대기열에 있던 시간|
| **gitlab.transaction.queue_duration_total** <br>(count) | \[OpenMetrics V1\] 작업 처리 전 대기열에 있던 시간|
| **gitlab.transaction.rails_queue_duration_total** <br>(gauge) | \[OpenMetrics V1 and V2\] GitLab Workhorse가 Rail로 요청을 전달하는 데 걸리는 지연 시간|
| **gitlab.transaction.view_duration.count** <br>(count) | \[OpenMetrics V2\] 뷰 처리 시간|
| **gitlab.transaction.view_duration_total** <br>(count) | \[OpenMetrics V1\] 뷰 처리 시간|
| **gitlab.unicorn.active_connections** <br>(gauge) | 활성 유니콘 연결(작업자) 수<br>_connection으로 표시됨_ |
| **gitlab.unicorn.queued_connections** <br>(gauge) | 대기 중인 Unicorn 연결 수<br>_connection으로 표시됨_ |
| **gitlab.unicorn.workers** <br>(gauge) | Unicorn 작업자 수<br>_worker로 표시됨_ |
| **gitlab.upload_file_does_not_exist** <br>(count) | 업로드된 기록이 해당 파일을 찾지 못한 횟수|
| **gitlab.user_session_logins.count** <br>(count) | \[OpenMetrics V2\] 로그인한 사용자 수|
| **gitlab.user_session_logins_total** <br>(count) | \[OpenMetrics V1\] 로그인한 사용자 수|
| **gitlab.view_rendering_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] 뷰 처리 시간(histogram)<br>_second로 표시됨_ |
| **gitlab.view_rendering_duration_seconds.count** <br>(count) | 뷰 처리 시간(히스토그램)|
| **gitlab.view_rendering_duration_seconds.sum** <br>(count) | 뷰 처리 시간 합계(히스토그램)<br>_second로 표시됨_ |

### 이벤트

GitLab 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

**gitlab.prometheus_endpoint_up**

점검이 GitLab 인스턴스의 Prometheus 메트릭 엔드포인트에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**gitlab.openmetrics.health**

점검이 GitLab 인스턴스의 Prometheus 메트릭 엔드포인트에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**gitlab.gitaly.openmetrics.health**

점검이 GitLab 인스턴스의 Prometheus 메트릭 엔드포인트에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**gitlab.health**

점검이 GitLab 인스턴스에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**gitlab.liveness**

점검이 Rails Controllers와의 교착 상태로 인해 GitLab 인스턴스에 접근할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**gitlab.readiness**

GitLab 인스턴스가 Rails Controllers를 통해 트래픽을 수신할 수 없는 경우 `CRITICAL`을 반환합니다.

_상태: ok, critical_

**gitlab.readiness.master**

마스터를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.database**

데이터베이스를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.cache**

캐시를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.database_load_balancing**

데이터베이스 로드 밸런싱을 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.queues**

대기열을 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.rate_limiting**

속도 제한을 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.repository_cache**

리포지토리 캐시를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.cluster_rate_limiting**

클러스터 속도 제한을 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.sessions**

세션을 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.shared_state**

공유 상태를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.trace_chunks**

트레이스 청크를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.gitaly**

Gitaly를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

**gitlab.readiness.redis**

Redis를 사용할 수 없으면 `CRITICAL`을 반환합니다.

_상태: ok, critical, unknown_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.