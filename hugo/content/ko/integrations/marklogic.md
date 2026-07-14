---
app_id: marklogic
categories:
- 데이터 저장소
- 로그 수집
custom_kind: 통합
description: MarkLogic 데이터베이스, 포레스트(forests), 호스트 및 서버에 대한 메트릭을 추적합니다.
integration_version: 6.1.2
media: []
supported_os:
- linux
- macos
- 윈도우즈(Windows)
title: MarkLogic
---
## 개요

이 점검은 Datadog Agent를 통해 [MarkLogic](https://www.marklogic.com)을 모니터링합니다. MarkLogic Server는 운영 및 분석 데이터의 데이터 허브 역할을 하도록 설계된 멀티 모델 데이터베이스입니다.

## 설정

아래 지침을 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 구성하세요. 컨테이너 환경에서 구성하려면 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations)을 참고하세요.

### 설치

MarkLogic 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 없습니다.

#### MarkLogic 준비

API 또는 Admin 인터페이스를 사용하여 Datadog Agent용 사용자를 생성하고 최소한 [`manage-user`](https://docs.marklogic.com/guide/admin/pre_def_roles#id_64197) 역할 권한을 부여하세요.
`enable_health_service_checks` 구성을 사용하려면 Datadog MarkLogic 사용자에게 최소한 [`manage-admin`(https://docs.marklogic.com/guide/admin/pre_def_roles#id_28243) 역할을 부여하세요.

##### API

1. 이 요청을 다음 특정 값으로 수정하여 Datadog 사용자를 생성합니다.

   ```shell
   curl -X POST --anyauth --user <ADMIN_USER>:<ADMIN_PASSWORD> -i -H "Content-Type: application/json" -d '{"user-name": "<USER>", "password": "<PASSWORD>", "roles": {"role": "manage-user"}}' http://<HOSTNAME>:8002/manage/v2/users
   ```

   올바른 `<ADMIN_USER>` 및 `<ADMIN_PASSWORD>`를 사용하고, `<USER>` 및 `<PASSWORD>`를 Datadog Agent가 사용하는 사용자 이름과 비밀번호로 바꿉니다.
   자세한 내용은 MarkLogic 도움말 [POST /manage/v2/users](https://docs.marklogic.com/REST/POST/manage/v2/users)를 참고하세요.

1. 다음과 같이 충분한 권한이 있는 사용자를 생성했는지 확인합니다.

   ```shell
   curl -X GET --anyauth --user <USER>:<PASSWORD> -i http://<HOSTNAME>:8002/manage/v2
   ```

##### 관리자 인터페이스

1. 관리자 계정으로 QConsole에 로그인합니다. 기본적으로 QConsole은 `http://<HOSTNAME>:8000/qconsole`에서 사용할 수 있습니다.

1. 데이터베이스로 `Security`, 쿼리 유형으로 `XQuery`을 선택합니다.

1. 쿼리를 실행하여 `<USER>` 및 `<PASSWORD>`을 Datadog 에이전트에서 사용하는 항목으로 변경합니다.

   ```
   xquery version "1.0-ml";
   import module namespace sec="http://marklogic.com/xdmp/security" at 
       "/MarkLogic/security.xqy";

   sec:create-user(
       "<USER>",
       "Datadog Agent user",
       "<PASSWORD>",
       "manage-user",
       (xdmp:permission("security", "read")),
       ("http://marklogic.com/dev_modules"))

   ```

   자세한 내용은 MarkLogic 도움말 [sec:create-user](https://docs.marklogic.com/sec:create-user)을 참고하세요.

1. 충분한 권한이 있는 사용자를 생성했는지 확인하려면 `<USER>` 및 `<PASSWORD>`을 사용하여 `http://<HOSTNAME>:8002`(기본 포트)에서 인증합니다.

### 설정

#### 호스트

1. MarkLogic 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리의 루트에 있는 `conf.d/` 폴더의`marklogic.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 `marklogic.d/conf.yaml` 파일]https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example)을 참고하세요. 구성 파일의 사용자 관련 설정에는 생성한 Datadog Agent 사용자를 사용하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. Datadog 에이전트에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

1. `marklogic.d/conf.yaml` 파일에 이 설정 블록을 추가하여 MarkLogic 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/opt/MarkLogic/Logs/ErrorLog.txt
         source: marklogic
       - type: file
         path: /var/opt/MarkLogic/Logs/80002_AccessLog.txt
         source: marklogic
   ```

   `path` 값을 변경하고 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 `marklogic.d/conf.yaml` 파일](https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example)을 참고하세요. 

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `marklogic`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **marklogic.databases.average_forest_size** <br>(gauge) | 데이터베이스에 첨부된 평균 포레스트 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.backup_count** <br>(gauge) | 백업 중인 포레스트의 최대 개수.<br>_unit으로 표시됨_ |
| **marklogic.databases.backup_read_load** <br>(gauge) | 백업 시 디스크 읽기에 소요한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.backup_read_rate** <br>(gauge) | 디스크 백업 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.backup_write_load** <br>(gauge) | 백업 시 디스크 쓰기에 소요한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.backup_write_rate** <br>(gauge) | 백업 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.compressed_tree_cache_hit_rate** <br>(gauge) | 압축된 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.databases.compressed_tree_cache_miss_rate** <br>(gauge) | 압축된 캐시의 평균 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.databases.data_size** <br>(gauge) | 디스크에 저장된 데이터베이스 총 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.database_replication_receive_load** <br>(gauge) | 데이터베이스 복제 시 데이터 수신에 소요한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.database_replication_receive_rate** <br>(gauge) | 데이터베이스 복제 시 데이터 수신 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.database_replication_send_load** <br>(gauge) | 데이터베이스 복제 시 데이터 전송에 소요한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.database_replication_send_rate** <br>(gauge) | 데이터베이스 복제 시 데이터 전송 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.deadlock_rate** <br>(gauge) | 데드락 발생률.<br>_lock으로 표시됨_ |
| **marklogic.databases.deadlock_wait_load** <br>(gauge) | 데드락으로 이어진 락 대기 시간 비율(경과 시간 대비)|
| **marklogic.databases.device_space** <br>(gauge) | 디바이스에 남은 공간.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.fast_data_size** <br>(gauge) | 디스크에 저장된 고속 저장소의 총 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.forests_count** <br>(gauge) | 데이터베이스에 포함된 포레스트 수.<br>_unit으로 표시됨_ |
| **marklogic.databases.in_memory_size** <br>(gauge) | 데이터베이스에 사용된 총 메모리 양.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.journal_write_load** <br>(gauge) | 저널 기록에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.journal_write_rate** <br>(gauge) | 저널에 데이터를 기록하는 데 걸리는 이동 평균.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.large_binary_cache_hit_rate** <br>(gauge) | 대용량 바이너리 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.databases.large_binary_cache_miss_rate** <br>(gauge) | 대용량 바이너리 캐시의 평균 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.databases.large_data_size** <br>(gauge) | 디스크에 저장된 대용량 데이터 총 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.large_read_load** <br>(gauge) | 대용량 문서 디스크 읽기 시간 비율(경과 시간 대비)|
| **marklogic.databases.large_read_rate** <br>(gauge) | 디스크 대용량 문서 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.large_write_load** <br>(gauge) | 대용량 문서 디스크 쓰기 시간 비율(경과 시간 대비)|
| **marklogic.databases.large_write_rate** <br>(gauge) | 대용량 문서 데이터 쓰기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.largest_forest_size** <br>(gauge) | 데이터베이스에 연결된 가장 큰 포레스트 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.least_remaining_space_forest** <br>(gauge) | 남은 여유 공간의 최소 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.list_cache_hit_rate** <br>(gauge) | 리스트 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.databases.list_cache_miss_rate** <br>(gauge) | 리스트 캐시에서 발생하는 평균 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.databases.merge_count** <br>(gauge) | 병합되는 포레스트의 최대 개수.|
| **marklogic.databases.merge_read_load** <br>(gauge) | 병합 작업 중 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.merge_read_rate** <br>(gauge) | 디스크 병합 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.merge_write_load** <br>(gauge) | 병합 작업 중 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.merge_write_rate** <br>(gauge) | 병합 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.min_capacity** <br>(gauge) | 포레스트 최소 가용량 비율 (%).|
| **marklogic.databases.query_read_load** <br>(gauge) | 쿼리 실행 중 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.query_read_rate** <br>(gauge) | 디스크 쿼리 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.read_lock_hold_load** <br>(gauge) | 읽기 잠금을 유지한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.read_lock_rate** <br>(gauge) | 읽기 잠금 획득 속도.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.read_lock_wait_load** <br>(gauge) | 읽기 잠금을 획득하기 위해 대기한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.reindex_count** <br>(gauge) | 데이터베이스의 재인덱싱 포레스트 총 개수.|
| **marklogic.databases.restore_count** <br>(gauge) | 복원 중인 포레스트 최대 수.|
| **marklogic.databases.restore_read_load** <br>(gauge) | 복구용 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.restore_read_rate** <br>(gauge) | 디스크 복원 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.restore_write_load** <br>(gauge) | 복구용 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.databases.restore_write_rate** <br>(gauge) | 복원 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.save_write_load** <br>(gauge) | 메모리 내 스탠드 쓰기에 소요된 스레드 시간의 이동 평균 비율(경과 시간 대비).|
| **marklogic.databases.save_write_rate** <br>(gauge) | 인메모리 스탠드 데이터 쓰기 처리량의 이동 평균.<br>_mebibyte로 표시됨_ |
| **marklogic.databases.total_load** <br>(gauge) | 처리 부하 계수 합계.|
| **marklogic.databases.total_merge_size** <br>(gauge) | 데이터베이스의 활성 포레스트 머지 총 용량<br>_mebibyte로 표시됨_ |
| **marklogic.databases.total_rate** <br>(gauge) | 처리 속도 계수 합계.|
| **marklogic.databases.triple_cache_hit_rate** <br>(gauge) | 리스트 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.databases.triple_cache_miss_rate** <br>(gauge) | 리스트 캐시에서 발생하는 평균 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.databases.triple_value_cache_hit_rate** <br>(gauge) | 리스트 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.databases.triple_value_cache_miss_rate** <br>(gauge) | 리스트 캐시에서 발생하는 평균 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.databases.write_lock_hold_load** <br>(gauge) | 쓰기 잠금을 유지하는 데 소요된 스레드 시간 비율(경과 시간 대비).|
| **marklogic.databases.write_lock_rate** <br>(gauge) | 쓰기 잠금 획득 속도.<br>_lock으로 표시됨_ |
| **marklogic.databases.write_lock_wait_load** <br>(gauge) | 쓰기 잠금 획득을 위해 대기한 스레드 시간 비율(경과 시간 대비).|
| **marklogic.forests.backup_count** <br>(gauge) | 백업 중인 포레스트의 최대 개수.<br>_unit으로 표시됨_ |
| **marklogic.forests.backup_read_load** <br>(gauge) | 백업 시 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.backup_read_rate** <br>(gauge) | 디스크 백업 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.backup_write_load** <br>(gauge) | 백업 시 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.backup_write_rate** <br>(gauge) | 백업 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.compressed_tree_cache_hit_rate** <br>(gauge) | 압축된 캐시에 대한 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.forests.compressed_tree_cache_miss_rate** <br>(gauge) | 압축된 캐시에 대한 평균 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.forests.compressed_tree_cache_ratio** <br>(gauge) | 압축된 캐시 비율.<br>_percent로 표시됨_ |
| **marklogic.forests.current_foreign_master_cluster** <br>(gauge) | 로컬 클러스터와 연결된 클러스터 ID.<br>_unit으로 표시됨_ |
| **marklogic.forests.current_foreign_master_fsn** <br>(gauge) | 외부 마스터로부터 수신한 마지막 저널 프레임 ID.<br>_unit으로 표시됨_ |
| **marklogic.forests.current_master_fsn** <br>(gauge) | 로컬 마스터의 저널 프레임 ID.<br>_unit으로 표시됨_ |
| **marklogic.forests.database_replication_receive_load** <br>(gauge) | 데이터베이스 복제 시 데이터 수신에 소요한 스레드 시간 비율(경과 시간에 비례)|
| **marklogic.forests.database_replication_receive_rate** <br>(gauge) | 데이터베이스 복제 데이터 수신량의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.database_replication_send_load** <br>(gauge) | 데이터베이스 복제 시 데이터 전송에 소요한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.database_replication_send_rate** <br>(gauge) | 데이터베이스 복제 데이터 전송량의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.deadlock_rate** <br>(gauge) | 데드락 발생률.<br>_lock으로 표시됨_ |
| **marklogic.forests.deadlock_wait_load** <br>(gauge) | 데드락으로 이어진 잠금 대기 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.device_space** <br>(gauge) | 포레스트 디바이스에 남은 공간 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.forest_reserve** <br>(gauge) | 머지에 필요한 공간 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.journal_write_load** <br>(gauge) | 저널 기록에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.journal_write_rate** <br>(gauge) | 저널에 데이터를 기록하는 데 걸리는 이동 평균.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.journals_size** <br>(gauge) | 저널이 디스크에서 차지하는 공간의 양.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.large_binary_cache_hit_rate** <br>(gauge) | 대형 바이너리 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.forests.large_binary_cache_hits** <br>(gauge) | 대용량 바이너리 캐시의 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.forests.large_binary_cache_miss_rate** <br>(gauge) | 대용량 바이너리 캐시의 평균 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.forests.large_binary_cache_misses** <br>(gauge) | 대용량 바이너리 캐시의 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.forests.large_data_size** <br>(gauge) | 디스크에서 큰 객체가 차지하는 공간의 양.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.large_read_load** <br>(gauge) | 대용량 문서 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.large_read_rate** <br>(gauge) | 디스크 대용량 문서 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.large_write_load** <br>(gauge) | 대용량 문서 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.large_write_rate** <br>(gauge) | 대용량 문서 데이터 쓰기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.list_cache_hit_rate** <br>(gauge) | 리스트 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.forests.list_cache_miss_rate** <br>(gauge) | 리스트 캐시에서 발생하는 평균 캐시 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.forests.list_cache_ratio** <br>(gauge) | 목록 캐시 비율<br>_percent로 표시됨_ |
| **marklogic.forests.max_query_timestamp** <br>(gauge) | 쿼리가 실행된 가장 긴 타임스탬프.<br>_millisecond로 표시됨_ |
| **marklogic.forests.max_stands_per_forest** <br>(gauge) | 하나의 포레스트 당 최대 스탠드 수.<br>_unit으로 표시됨_ |
| **marklogic.forests.merge_count** <br>(gauge) | 병합 중인 포레스트 최대 개수.<br>_unit으로 표시됨_ |
| **marklogic.forests.merge_read_load** <br>(gauge) | 병합 작업 중 디스크 읽기에 소요된 스레드 시간 비율 (경과 시간 대비)|
| **marklogic.forests.merge_read_rate** <br>(gauge) | 디스크 병합 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.merge_write_load** <br>(gauge) | 병합 작업 중 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.merge_write_rate** <br>(gauge) | 병합 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.min_capacity** <br>(gauge) | 포레스트가 수용할 수 있는 최소 용량(%)<br>_percent로 표시됨_ |
| **marklogic.forests.nonblocking_timestamp** <br>(gauge) | 트랜잭션 확정을 기다리지 않고 쿼리를 즉시 실행할 수 있는 최신 타임스탬프<br>_millisecond로 표시됨_ |
| **marklogic.forests.orphaned_binaries** <br>(gauge) | 고립된 대용량 바이너리 개수.<br>_item으로 표시됨_ |
| **marklogic.forests.query_read_load** <br>(gauge) | 쿼리 실행 중 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.query_read_rate** <br>(gauge) | 디스크 쿼리 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.read_lock_hold_load** <br>(gauge) | 읽기 잠금을 유지한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.read_lock_rate** <br>(gauge) | 읽기 잠금 획득 속도.<br>_lock으로 표시됨_ |
| **marklogic.forests.read_lock_wait_load** <br>(gauge) | 읽기 잠금을 획득하기 위해 대기한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.restore_count** <br>(gauge) | 복원 중인 포레스트 최대 수.<br>_unit으로 표시됨_ |
| **marklogic.forests.restore_read_load** <br>(gauge) | 복구 시 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.restore_read_rate** <br>(gauge) | 디스크 복원 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.restore_write_load** <br>(gauge) | 복구 시 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.forests.restore_write_rate** <br>(gauge) | 복원 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.save_write_load** <br>(gauge) | 메모리 내 스탠드 쓰기 스레드 시간 이동 평균(경과 시간 대비 )|
| **marklogic.forests.save_write_rate** <br>(gauge) | 메모리 내 스탠드 쓰기 스레드 시간 이동 평균<br>_mebibyte로 표시됨_ |
| **marklogic.forests.state_not_open** <br>(gauge) | 열리지 않은 포레스트 수.<br>_unit으로 표시됨_ |
| **marklogic.forests.storage.disk_size** <br>(gauge) | 스탠드가 디스크에서 차지하는 공간의 양.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.storage.host.capacity** <br>(gauge) | 사용 가능한 저장 공간 비율.<br>_percent로 표시됨_ |
| **marklogic.forests.storage.host.device_space** <br>(gauge) | 포레스트 디바이스에 남은 공간.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.storage.host.forest_reserve** <br>(gauge) | 병합에 필요한 공간 크기.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.storage.host.forest_size** <br>(gauge) | 포레스트 전체 일반 저장 용량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.storage.host.large_data_size** <br>(gauge) | 대용량 객체 디스크 점유 용량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.storage.host.remaining_space** <br>(gauge) | 포레스트 전체 가용 저장 용량.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.total_forests** <br>(gauge) | 전체 포레스트 수.<br>_unit으로 표시됨_ |
| **marklogic.forests.total_load** <br>(gauge) | 처리 부하 계수 합계|
| **marklogic.forests.total_rate** <br>(gauge) | 처리 속도 계수 합계.<br>_mebibyte로 표시됨_ |
| **marklogic.forests.triple_cache_hit_rate** <br>(gauge) | 리스트 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.forests.triple_cache_miss_rate** <br>(gauge) | 리스트 캐시에서 발생하는 평균 캐시 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.forests.triple_value_cache_hit_rate** <br>(gauge) | 리스트 캐시의 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.forests.triple_value_cache_miss_rate** <br>(gauge) | 리스트 캐시에서 발생하는 평균 캐시 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.forests.write_lock_hold_load** <br>(gauge) | 쓰기 잠금을 유지하는 데 소요된 스레드 시간 비율(경과 시간 대비).|
| **marklogic.forests.write_lock_rate** <br>(gauge) | 쓰기 잠금 획득 속도.<br>_lock으로 표시됨_ |
| **marklogic.forests.write_lock_wait_load** <br>(gauge) | 쓰기 잠금 획득을 위해 대기한 스레드 시간 비율(경과 시간 대비).|
| **marklogic.hosts.backup_read_load** <br>(gauge) | 백업 시 디스크 읽기 스레드 시간 비율(경과 시간 대비).|
| **marklogic.hosts.backup_read_rate** <br>(gauge) | 디스크 백업 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.backup_write_load** <br>(gauge) | 백업 시 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비).|
| **marklogic.hosts.backup_write_rate** <br>(gauge) | 백업 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.deadlock_rate** <br>(gauge) | 데드락 발생률.<br>_lock으로 표시됨_ |
| **marklogic.hosts.deadlock_wait_load** <br>(gauge) | 데드락으로 이어진 잠금 대기 총 시간.<br>_second로 표시됨_ |
| **marklogic.hosts.external_binary_read_load** <br>(gauge) | 외부 바이너리 문서에서 디스크 읽기에 스레드가 소요한 시간 비율(경과 시간 대비).|
| **marklogic.hosts.external_binary_read_rate** <br>(gauge) | 외부 바이너리 문서의 디스크 읽기 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.foreign_xdqp_client_receive_load** <br>(gauge) | 외부 xdqp 클라이언트에게 데이터를 수신하는데 소요된 스레드 시간 비율(경과 시간 대비).|
| **marklogic.hosts.foreign_xdqp_client_receive_rate** <br>(gauge) | 데이터를 수신하는 외부 xdqp 클라이언트의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.foreign_xdqp_client_send_load** <br>(gauge) | 외부 xdqp 클라이언트로 데이터를 전송하는 데 소요된 시간(경과 시간 대비).|
| **marklogic.hosts.foreign_xdqp_client_send_rate** <br>(gauge) | 데이터를 전송하는 외부 xdqp 클라이언트의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.foreign_xdqp_server_receive_load** <br>(gauge) | 외부 xdqp 서버로부터 데이터를 수신하는 데 소요된 시간(경과 시간 대비).|
| **marklogic.hosts.foreign_xdqp_server_receive_rate** <br>(gauge) | 데이터를 수신하는 외부 xdqp 서버의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.foreign_xdqp_server_send_load** <br>(gauge) | 외부 xdqp 서버로 데이터를 전송하는 데 소요된 시간(경과 시간 대비).|
| **marklogic.hosts.foreign_xdqp_server_send_rate** <br>(gauge) | 데이터를 전송하는 외부 xdqp 서버의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.journal_write_load** <br>(gauge) | 전체 경과 시간 중 저널 기록에 소요된 스레드 시간 비중.|
| **marklogic.hosts.journal_write_rate** <br>(gauge) | 저널에 데이터를 기록하는 데 걸리는 이동 평균.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.large_read_load** <br>(gauge) | 대용량 문서 디스크 읽기 시간 비율(경과 시간 대비)|
| **marklogic.hosts.large_read_rate** <br>(gauge) | 디스크 대용량 문서 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.large_write_load** <br>(gauge) | 대용량 문서 디스크 쓰기 시간 비율(경과 시간 대비)|
| **marklogic.hosts.large_write_rate** <br>(gauge) | 대용량 문서용 데이터 쓰기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.memory_process_huge_pages_size** <br>(gauge) | MarkLogic 프로세스의 대용량 페이지 크기. Linux 플랫폼에서 사용 가능합니다. /proc/\[MLpid\]/smaps의 /anon_hugepage 이후 크기의 합계입니다.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.memory_process_rss** <br>(gauge) | MarkLogic 프로세스의 프로세스 상주 크기(RSS).<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.memory_process_swap_rate** <br>(gauge) | MarkLogic 프로세스의 스왑 속도.<br>_page로 표시됨_ |
| **marklogic.hosts.memory_size** <br>(gauge) | 스탠드가 메모리에서 차지하는 공간의 양.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.memory_system_free** <br>(gauge) | 사용 가능한 시스템 메모리. Linux에서는 /proc/meminfo의 MemFree, Windows에서는 GlobalMemoryStatusEx의 ullAvailPhys를 통해 확인할 수 있습니다.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.memory_system_pagein_rate** <br>(gauge) | 시스템 페이지 인 비율.<br>_page로 표시됨_ |
| **marklogic.hosts.memory_system_pageout_rate** <br>(gauge) | 시스템 페이지 아웃 비율.<br>_page로 표시됨_ |
| **marklogic.hosts.memory_system_swapin_rate** <br>(gauge) | 시스템 스왑 인 비율.<br>_page로 표시됨_ |
| **marklogic.hosts.memory_system_swapout_rate** <br>(gauge) | 시스템 스왑 아웃 비율.<br>_page로 표시됨_ |
| **marklogic.hosts.memory_system_total** <br>(gauge) | 시스템 전체 메모리 용량. Linux에서는 /proc/meminfo의 MemTotal, Windows에서는 GlobalMemoryStatusEx의 ullTotalPhys 값을 사용합니다.<br>_mebibyte로표시됨_ |
| **marklogic.hosts.merge_read_load** <br>(gauge) | 병합 작업 중 디스크 읽기에 소요된 스레드 시간 비율 (경과 시간 대비)|
| **marklogic.hosts.merge_read_rate** <br>(gauge) | 디스크에서 병합 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.merge_write_load** <br>(gauge) | 병합 작업 중 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.merge_write_rate** <br>(gauge) | 병합 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.query_read_load** <br>(gauge) | 쿼리 실행 중 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.query_read_rate** <br>(gauge) | 디스크 쿼리 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.read_lock_hold_load** <br>(gauge) | 읽기 잠금을 유지한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.read_lock_rate** <br>(gauge) | 읽기 잠금 획득 속도.<br>_lock으로 표시됨_ |
| **marklogic.hosts.read_lock_wait_load** <br>(gauge) | 읽기 잠금을 획득하기 위해 대기한 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.restore_read_load** <br>(gauge) | 복구 시 디스크 읽기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.restore_read_rate** <br>(gauge) | 디스크 복원 데이터 읽기 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.restore_write_load** <br>(gauge) | 복구 시 디스크 쓰기에 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.restore_write_rate** <br>(gauge) | 복원 시 데이터 쓰기 작업의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.save_write_load** <br>(gauge) | 메모리 내 스탠드 쓰기에 소요된 스레드 시간의 이동 평균 비율(경과 시간 대비).|
| **marklogic.hosts.save_write_rate** <br>(gauge) | 인메모리 스탠드 데이터 쓰기 처리량의 이동 평균.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.total_cpu_stat_system** <br>(gauge) | 시스템 총 CPU 사용률.<br>_percent로 표시됨_ |
| **marklogic.hosts.total_cpu_stat_user** <br>(gauge) | 사용자 총 CPU 사용률.<br>_percent로 표시됨_ |
| **marklogic.hosts.total_hosts** <br>(gauge) | 총 호스트 수.<br>_host로 표시됨_ |
| **marklogic.hosts.total_hosts_offline** <br>(gauge) | 총 오프라인 호스트 수.<br>_host로 표시됨_ |
| **marklogic.hosts.total_load** <br>(gauge) | 처리 부하 계수 합계.|
| **marklogic.hosts.total_rate** <br>(gauge) | 처리 속도 계수 합계.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.write_lock_hold_load** <br>(gauge) | 쓰기 잠금을 유지하는 데 소요된 스레드 시간 비율(경과 시간 대비).|
| **marklogic.hosts.write_lock_rate** <br>(gauge) | 쓰기 잠금 획득 속도.<br>_lock으로 표시됨_ |
| **marklogic.hosts.write_lock_wait_load** <br>(gauge) | 쓰기 잠금을 유지하는 데 소요된 총 시간.|
| **marklogic.hosts.xdqp_client_receive_load** <br>(gauge) | xdqp 클라이언트에서 데이터를 수신하는 데 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.xdqp_client_receive_rate** <br>(gauge) | 데이터를 수신하는 XDQP 클라이언트 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.xdqp_client_send_load** <br>(gauge) | xdqp 클라이언트에서 데이터를 전송하는 데 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.xdqp_client_send_rate** <br>(gauge) | 데이터를 전송하는 xdqp 클라이언트의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.xdqp_server_receive_load** <br>(gauge) | xdqp 서버에서 데이터를 수신하는 데 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.xdqp_server_receive_rate** <br>(gauge) | 데이터를 수신하는 xdqp 서버의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.hosts.xdqp_server_send_load** <br>(gauge) | xdqp 서버에서 데이터를 전송하는 데 소요된 스레드 시간 비율(경과 시간 대비)|
| **marklogic.hosts.xdqp_server_send_rate** <br>(gauge) | 데이터를 전송하는 xdqp 서버의 이동 평균 처리량.<br>_mebibyte로 표시됨_ |
| **marklogic.requests.max_seconds** <br>(gauge) | 활성 요청의 최대 지속 시간(초).<br>_second로 표시됨_ |
| **marklogic.requests.mean_seconds** <br>(gauge) | 활성 요청 또는 열린 트랜잭션의 평균 소요 시간(초).<br>_second로 표시됨_ |
| **marklogic.requests.median_seconds** <br>(gauge) | 활성 요청 또는 열린 트랜잭션의 중간 소요 시간(초).<br>_second로 표시됨_ |
| **marklogic.requests.min_seconds** <br>(gauge) | 활성 요청 또는 열린 트랜잭션의 최소 지속 시간(초).<br>_second로 표시됨_ |
| **marklogic.requests.ninetieth_percentile_seconds** <br>(gauge) | 활성 요청의 90번째 백분위수에 해당하는 길이(초).<br>_second로 표시됨_ |
| **marklogic.requests.query_count** <br>(gauge) | 총 활성 쿼리 요청 수.<br>_query로 표시됨_ |
| **marklogic.requests.standard_dev_seconds** <br>(gauge) | 활성 요청 또는 오픈 트랜잭션에 대한 표준 편차(초).<br>_second로 표시됨_ |
| **marklogic.requests.total_requests** <br>(gauge) | 총 활성 요청 수.<br>_request로 표시됨_ |
| **marklogic.requests.update_count** <br>(gauge) | 총 활성 업데이트 요청 수.<br>_request로 표시됨_ |
| **marklogic.servers.expanded_tree_cache_hit_rate** <br>(gauge) | 확장된 캐시에서 발생한 평균 적중 횟수.<br>_hit로 표시됨_ |
| **marklogic.servers.expanded_tree_cache_miss_rate** <br>(gauge) | 확장된 캐시에서 발생한 평균 캐시 미스 횟수.<br>_miss로 표시됨_ |
| **marklogic.servers.request_count** <br>(gauge) | 요청 비율.<br>_request로 표시됨_ |
| **marklogic.servers.request_rate** <br>(gauge) | 클러스터에 대한 총 요청 수.<br>_request로 표시됨_ |
| **marklogic.transactions.max_seconds** <br>(gauge) | 활성 트랜잭션의 최대 지속 시간(초).<br>_second로 표시됨_ |
| **marklogic.transactions.mean_seconds** <br>(gauge) | 활성 요청 또는 열린 트랜잭션의 평균 소요 시간(초).<br>_second로 표시됨_ |
| **marklogic.transactions.median_seconds** <br>(gauge) | 활성 요청 또는 열린 트랜잭션의 중간 소요 시간(초).<br>_second로 표시됨_ |
| **marklogic.transactions.min_seconds** <br>(gauge) | 활성 요청 또는 열린 트랜잭션의 최소 지속 시간(초).<br>_second로 표시됨_ |
| **marklogic.transactions.ninetieth_percentile_seconds** <br>(gauge) | 활성 요청의 90번째 백분위수에 해당하는 길이(초).<br>_second로 표시됨_ |
| **marklogic.transactions.standard_dev_seconds** <br>(gauge) | 활성 요청 또는 열린 트랜잭션에 대한 표준 편차(초).<br>_second로 표시됨_ |
| **marklogic.transactions.total_transactions** <br>(gauge) | 총 열린 트랜잭션 수.<br>_transaction으로 표시됨_ |

### 이벤트

MarkLogic은 이벤트를 포함하지 않습니다.

### 서비스 점검

**marklogic.can_connect**

Agent가 쿼리 엔드포인트에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical, unknown_

**marklogic.database.health**

데이터베이스 상태가 `critical`이면, `CRITICAL`을, `maintenance`, `offline`, `at-risk`이면, `WARNING`을, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, warning, critical, unknown_

**marklogic.forest.health**

포레스트 상태가 `critical`이면 `CRITICAL`을, `maintenance`, `offline`, `at-risk` 상태이면 `WARNING`을, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, warning, critical, unknown_

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀](https://docs.datadoghq.com/help)에 문의하세요.