---
aliases:
- /ko/integrations/fly_io
app_id: fly-io
categories:
- OS & 시스템
- 클라우드
- 로그 수집
custom_kind: 통합
description: Fly.io 앱과 기기를 모니터링하세요.
integration_version: 3.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Fly.io
---
<div class="alert alert-warning">
이 통합 기능은 현재 공개 베타 버전입니다. 운영 환경에서 활성화할 경우 주의가 필요합니다.
</div>

## 개요

이 점검은 Datadog Agent를 통해 [Fly.io](https://fly.io/) 메트릭을 모니터링합니다.

## 설정

Fly 애플리케이션에서 실행되는 Agent에 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 설치

Fly.io 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다. Datadog Agent 실행 전용으로 하나의 Fly.io 애플리케이션을 배포하는 것을 권장합니다. 이 Agent는 Fly.io 점검을 실행하여 [Prometheus 메트릭](https://fly.io/docs/metrics-and-logs/metrics/#prometheus-on-fly-io)과 [Machines API](https://fly.io/docs/machines/api/)에서 추가 데이터를 수집할 수 있습니다. 또한, 조직 내 모든 Fly.io 애플리케이션에서 [트레이스](#Application-Traces) 및 사용자 지정 메트릭을 수신하도록 Agent를 구성할 수 있습니다.

#### Fly.io 애플리케이션으로 Agent 배포

1. Fly.io에서 새 애플리케이션을 생성할 때 실행 시 이미지를 [Datadog Agent](https://console.cloud.google.com/artifacts/docker/datadoghq/us/gcr.io/agent)로 설정하걱나 `fly.toml` 파일에 이미지를 제공하세요.

   ```
   [build]
       image = 'gcr.io/datadoghq/agent:7'
   ```

1. `DD_API_KEY`라고 불리는 Datadog API 키에 대한 [시크릿](https://fly.io/docs/flyctl/secrets/)을 설정하고, 필요시 [사이트](https://docs.datadoghq.com/agent/troubleshooting/site/)를 `DD_SITE`로 설정하세요.

1. 앱 디렉터리에 Fly.io 통합용 `conf.yaml` 파일을 생성하고, 통합을 [구성](#Configuration)한 다음, Agent의 `conf.d/fly_io.d/` 디렉터리에 `conf.yaml`로 마운트합니다.

   ```
   instances:
   - empty_default_hostname: true
     headers:
         Authorization: Bearer <YOUR_FLY_TOKEN>
     machines_api_endpoint: http://_api.internal:4280
     org_slug: <YOUR_ORG_SLUG>
   ```

1. 앱을 [배포합니다](https://fly.io/docs/flyctl/deploy/).

**참고**: 애플리케이션에서 트레이스 및 사용자 지정 메트릭을 수집하려면 [애플리케이션 트레이스](#Application-traces)를 참고하세요.

### 설정

1. Fly.io 성능 데이터 수집을 시작하려면 Agent의 구성 디렉터리의 루트에서 `conf.d/` 폴더에 있는 `fly_io.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 fly_io.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/fly_io/datadog_checks/fly_io/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)  Checks 섹션에서 `fly_io`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **fly_io.app.concurrency** <br>(gauge) | |
| **fly_io.app.connect_time.bucket** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.app.connect_time.count** <br>(count) | |
| **fly_io.app.connect_time.sum** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.app.count** <br>(gauge) | 앱 개수|
| **fly_io.app.http_response_time.bucket** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.app.http_response_time.count** <br>(count) | |
| **fly_io.app.http_response_time.sum** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.app.http_responses.count** <br>(gauge) | <br>_response로 표시됨_ |
| **fly_io.app.tcp_connects.count** <br>(gauge) | |
| **fly_io.app.tcp_disconnects.count** <br>(gauge) | |
| **fly_io.edge.data_in** <br>(gauge) | <br>_byte로 표시됨_ |
| **fly_io.edge.data_out** <br>(gauge) | <br>_byte로 표시됨_ |
| **fly_io.edge.http_response_time.bucket** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.edge.http_response_time.count** <br>(count) | |
| **fly_io.edge.http_response_time.sum** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.edge.http_responses.count** <br>(gauge) | <br>_response로 표시됨_ |
| **fly_io.edge.tcp_connects.count** <br>(gauge) | |
| **fly_io.edge.tcp_disconnects.count** <br>(gauge) | |
| **fly_io.edge.tls_handshake_errors** <br>(gauge) | <br>_error로 표시됨_ |
| **fly_io.edge.tls_handshake_time.bucket** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.edge.tls_handshake_time.count** <br>(count) | |
| **fly_io.edge.tls_handshake_time.sum** <br>(count) | <br>_second로 표시됨_ |
| **fly_io.instance.cpu.count** <br>(count) | 각 CPU(cpu_id)가 다양한 종류의 작업(모드)을 실행하는 데 소요한 시간(센티초)|
| **fly_io.instance.disk.io_in_progress** <br>(gauge) | 요청이 적절한 struct request_queue에 전달될 때 증가하고, 요청 처리가 완료되면 감소합니다.|
| **fly_io.instance.disk.reads_completed.count** <br>(count) | 성공적으로 완료된 읽기 작업 총 횟수.|
| **fly_io.instance.disk.reads_merged.count** <br>(count) | 효율성을 위해 서로 인접한 읽기 및 쓰기 작업은 병합될 수 있으며, 이 필드는 이러한 병합이 얼마나 자주 발생했는지를 알려줍니다.|
| **fly_io.instance.disk.sectors_read.count** <br>(count) | 성공적으로 읽은 섹터의 총 개수.|
| **fly_io.instance.disk.sectors_written.count** <br>(count) | 성공적으로 작성된 섹터의 총 개수.|
| **fly_io.instance.disk.time_io.count** <br>(count) | 하나 이상의 요청이 시작되었거나 완료된 경우의 jiffy 수를 집계합니다. 요청이 2 jiffy 이상 실행되면, 동시 요청이 있는 경우 일부 I/O 시간이 집계되지 않을 수 있습니다.<br>_millisecond로 표시됨_ |
| **fly_io.instance.disk.time_io_weighted.count** <br>(count) | 이 필드는 I/O 시작, I/O 완료, I/O 병합, 또는 해당 통계를 읽을 때마다 증가하며, 그 증가분은 ‘진행 중인 I/O 개수(필드 9) × 마지막 업데이트 이후 경과한 I/O 시간(ms)’입니다.<br>_millisecond로 표시됨_ |
| **fly_io.instance.disk.time_reading.count** <br>(count) | 모든 읽기 작업에 소요된 총 밀리초 수.<br>_millisecond로 표시됨_ |
| **fly_io.instance.disk.time_writing.count** <br>(count) | 모든 쓰기 작업에 소요된 총 밀리초 수.<br>_millisecond로 표시됨_ |
| **fly_io.instance.disk.writes_completed.count** <br>(count) | 성공적으로 완료된 쓰기 작업의 총 횟수.|
| **fly_io.instance.disk.writes_merged.count** <br>(count) | 효율성을 위해 서로 인접한 읽기 및 쓰기 작업은 병합될 수 있으며, 이 필드는 이러한 병합이 얼마나 자주 발생했는지를 알려줍니다.|
| **fly_io.instance.filefd.allocated** <br>(gauge) | 할당된 파일 디스크립터 수|
| **fly_io.instance.filefd.max** <br>(gauge) | 최대 파일 디스크립터 수|
| **fly_io.instance.filesystem.block_size** <br>(gauge) | 파일 시스템 블록 크기.|
| **fly_io.instance.filesystem.blocks** <br>(gauge) | 파일 시스템의 총 블록 수|
| **fly_io.instance.filesystem.blocks_avail** <br>(gauge) | 사용 가능한 블록의 총 개수.|
| **fly_io.instance.filesystem.blocks_free** <br>(gauge) | 남아 있는 블록의 총 개수.|
| **fly_io.instance.load.avg** <br>(gauge) | 시스템 부하 평균은 시스템 실행 대기열에 있는 프로세스 수를 측정하는 값으로, 샘플은 1분, 5분, 15분 동안의 평균값을 나타냅니다.<br>_process로 표시됨_ |
| **fly_io.instance.memory.active** <br>(gauge) | 최근에 사용된 메모리이며, 꼭 필요한 경우가 아니면 일반적으로 회수되지 않습니다.<br>_byte로 표시됨_ |
| **fly_io.instance.memory.buffers** <br>(gauge) | 원시 디스크 블록을 위한 임시 저장소<br>_byte로 표시됨_ |
| **fly_io.instance.memory.cached** <br>(gauge) | 디스크에서 읽은 파일에 대한 메모리 캐시(페이지 캐시)와 tmpfs 및 shmem을 포함합니다. SwapCached는 포함되지 않습니다.<br>_byte로 표시됨_ |
| **fly_io.instance.memory.dirty** <br>(gauge) | 디스크에 다시 기록될 때까지 대기 중인 메모리<br>_byte로 표시됨_ |
| **fly_io.instance.memory.inactive** <br>(gauge) | 최근에 사용량이 적었던 메모리. 다른 용도로 재활용될 가능성이 더 높습니다.<br>_ byte로 표시됨_ |
| **fly_io.instance.memory.mem_available** <br>(gauge) | 스와핑 없이 새 애플리케이션을 시작하는 데 사용할 수 있는 메모리 용량을 추정한 값.<br>_byte로 표시됨_ |
| **fly_io.instance.memory.mem_free** <br>(gauge) | 사용 가능한 총 RAM.<br>_byte로 표시됨_ |
| **fly_io.instance.memory.mem_total** <br>(gauge) | 사용 가능한 총 RAM 용량(즉, 물리적 RAM에서 예약된 일부 비트와 커널 바이너리 코드를 제외한 용량)<br>_byte로 표시됨_ |
| **fly_io.instance.memory.pressure_full** <br>(gauge) | 모든 프로세스의 메모리 사용량|
| **fly_io.instance.memory.pressure_some** <br>(gauge) | 하나 이상의 프로세스에서 발생한 메모리 부족 상태|
| **fly_io.instance.memory.shmem** <br>(gauge) | 공유 메모리(shmem) 및 tmpfs에서 사용된 총 메모리 양<br>_byte로 표시됨_ |
| **fly_io.instance.memory.slab** <br>(gauge) | 커널 내 데이터 구조 캐시<br>_byte로 표시됨_ |
| **fly_io.instance.memory.swap_cached** <br>(gauge) | 한 번 스왑 아웃되었다가 다시 메모리로 불러왔지만, 여전히 스왑 파일에도 남아 있는 메모리<br>_byte로 표시됨_ |
| **fly_io.instance.memory.swap_free** <br>(gauge) | RAM에서 제거되어 일시적으로 디스크에 저장된 메모리<br>_byte로 표시됨_ |
| **fly_io.instance.memory.swap_total** <br>(gauge) | 사용 가능한 스왑 공간의 총량<br>_byte로 표시됨_ |
| **fly_io.instance.memory.vmalloc_chunk** <br>(gauge) | 사용 가능한 vmalloc 영역 중 가장 큰 연속 블록<br>_byte로 표시됨_ |
| **fly_io.instance.memory.vmalloc_total** <br>(gauge) | vmalloc 가상 주소 공간의 총 크기<br>_byte로 표시됨_ |
| **fly_io.instance.memory.vmalloc_used** <br>(gauge) | vmalloc 영역에서 사용되는 양<br>_byte로 표시됨_ |
| **fly_io.instance.memory.writeback** <br>(gauge) | 디스크에 활발하게 기록되고 있는 메모리<br>_byte로 표시됨_ |
| **fly_io.instance.net.recv_bytes.count** <br>(count) | 인터페이스가 수신한 유효 바이트 수.<br>_byte로 표시됨_ |
| **fly_io.instance.net.recv_compressed.count** <br>(count) | 올바르게 수신된 압축 패킷 수.|
| **fly_io.instance.net.recv_drop.count** <br>(count) | 수신되었지만 처리되지 않은 패킷 수(예: 리소스 부족 또는 지원되지 않는 프로토콜로 인해 미처리).<br>_packet으로 표시됨_ |
| **fly_io.instance.net.recv_errs.count** <br>(count) | 네트워크 디바이스에 수신된 불량 패킷의 총 개수.<br>_packet으로 표시됨_ |
| **fly_io.instance.net.recv_fifo.count** <br>(count) | 수신자 FIFO 오버플로 이벤트 카운터.|
| **fly_io.instance.net.recv_frame.count** <br>(count) | 수신자 프레임 정렬 오류.|
| **fly_io.instance.net.recv_multicast.count** <br>(count) | 수신된 멀티캐스트 패킷.<br>_packet으로 표시됨_ |
| **fly_io.instance.net.recv_packets.count** <br>(count) | 인터페이스가 수신한 정상 패킷 수.<br>_packet으로 표시됨_ |
| **fly_io.instance.net.sent_bytes.count** <br>(count) | 정상적으로 전송된 바이트 수.<br>_byte로 표시됨_ |
| **fly_io.instance.net.sent_carrier.count** <br>(count) | 전송 중 캐리어 손실로 인한 프레임 전송 오류 횟수.|
| **fly_io.instance.net.sent_colls.count** <br>(count) | 패킷 전송 중 충돌 횟수.|
| **fly_io.instance.net.sent_compressed.count** <br>(count) | 전송된 압축 패킷 수.|
| **fly_io.instance.net.sent_drop.count** <br>(count) | 전송 도중 손실된 패킷 수(예: 리소스 부족으로 인한 손실).<br>_packet으로 표시됨_ |
| **fly_io.instance.net.sent_errs.count** <br>(count) | 전송 오류의 총 횟수.|
| **fly_io.instance.net.sent_fifo.count** <br>(count) | 전송된 FIFO 오버플로 이벤트 카운터.|
| **fly_io.instance.net.sent_packets.count** <br>(count) | 성공적으로 전송된 패킷 수.<br>_packet으로 표시됨_ |
| **fly_io.instance.up** <br>(gauge) | VM이 정상적으로 보고 시 1을 반환|
| **fly_io.instance.volume.size** <br>(gauge) | 볼륨 크기(바이트).<br>_byte로 표시됨_ |
| **fly_io.instance.volume.used** <br>(gauge) | 사용된 볼륨의 백분율.<br>_byte로 표시됨_ |
| **fly_io.machine.count** <br>(gauge) | 실행 중인 머신 수|
| **fly_io.machine.cpus.count** <br>(gauge) | CPU 수|
| **fly_io.machine.gpus.count** <br>(gauge) | GPU 수|
| **fly_io.machine.memory** <br>(gauge) | 머신 메모리<br>_megabyte로 표시됨_ |
| **fly_io.machine.swap_size** <br>(gauge) | Fly Machine을 위해 예약할 스왑 공간<br>_megabyte로 표시됨_ |
| **fly_io.machines_api.up** <br>(gauge) | 점검이 머신 API에 접근할 수 있는지 여부|
| **fly_io.pg.database.size** <br>(gauge) | 데이터베이스 크기<br>_byte로 표시됨_ |
| **fly_io.pg.replication.lag** <br>(gauge) | 복제 지연|
| **fly_io.pg_stat.activity.count** <br>(gauge) | 이 상태의 연결 수|
| **fly_io.pg_stat.activity.max_tx_duration** <br>(gauge) | 활성 트랜잭션이 실행되는 최대 시간(초)<br>_second로 표시됨_ |
| **fly_io.pg_stat.archiver.archived_count** <br>(gauge) | 성공적으로 아카이브된 WAL 파일 수|
| **fly_io.pg_stat.archiver.failed_count** <br>(gauge) | WAL 파일 아카이브 실패 시도 횟수|
| **fly_io.pg_stat.bgwriter.buffers_alloc** <br>(gauge) | 할당된 버퍼 수|
| **fly_io.pg_stat.bgwriter.buffers_backend** <br>(gauge) | 백엔드에서 직접 기록한 버퍼 수|
| **fly_io.pg_stat.bgwriter.buffers_backend_fsync** <br>(gauge) | 백엔드가 자체 fsync 호출을 실행해야 했던 횟수 (일반적으로 백엔드가 자체 쓰기를 수행하는 경우에도 백그라운드 라이터가 이를 처리합니다)|
| **fly_io.pg_stat.bgwriter.buffers_checkpoint** <br>(gauge) | 체크포인트 중에 기록된 버퍼 수|
| **fly_io.pg_stat.bgwriter.buffers_clean** <br>(gauge) | 백그라운드 라이터가 기록한 버퍼 수|
| **fly_io.pg_stat.bgwriter.checkpoint_sync_time** <br>(gauge) | 체크포인트 처리 과정에서 파일이 디스크에 동기화되는 데 소요된 총 시간(밀리초)<br>_millisecond로 표시됨_ |
| **fly_io.pg_stat.bgwriter.checkpoint_write_time** <br>(gauge) | 체크포인트 처리 과정에서 파일이 디스크에 기록되는 데 소요된 총 시간(밀리초)<br>_millisecond로 표시됨_ |
| **fly_io.pg_stat.bgwriter.checkpoints_req** <br>(gauge) | 요청된 체크포인트 중 실행된 횟수|
| **fly_io.pg_stat.bgwriter.checkpoints_timed** <br>(gauge) | 예약된 체크포인트 중 실행된 횟수|
| **fly_io.pg_stat.bgwriter.maxwritten_clean** <br>(gauge) | 백그라운드 라이터가 너무 많은 버퍼를 기록하여 클리닝 스캔을 중단한 횟수|
| **fly_io.pg_stat.bgwriter.stats_reset** <br>(gauge) | 이 통계가 마지막으로 초기화된 시간|
| **fly_io.pg_stat.database.blk_read_time** <br>(gauge) | 이 데이터베이스에서 백엔드가 데이터 파일 블록을 읽는 데 소요된 시간(밀리초)<br>_millisecond로 표시됨_ |
| **fly_io.pg_stat.database.blk_write_time** <br>(gauge) | 이 데이터베이스에서 백엔드가 데이터 파일 블록을 쓰는 데 소요된 시간(밀리초)<br>_millisecond로 표시됨_ |
| **fly_io.pg_stat.database.blks_hit** <br>(gauge) | 디스크 블록이 버퍼 캐시에 이미 존재하여 읽기 작업이 필요하지 않았던 횟수(이는 PostgreSQL 버퍼 캐시의 적중률만 포함하며 운영 체제의 파일 시스템 캐시는 포함하지 않습니다)|
| **fly_io.pg_stat.database.blks_read** <br>(gauge) | 이 데이터베이스에서 읽은 디스크 블록 수|
| **fly_io.pg_stat.database.conflicts** <br>(gauge) | 이 데이터베이스에서 복구와의 충돌로 인해 취소된 쿼리 수. 충돌은 대기 서버에서만 발생합니다.|
| **fly_io.pg_stat.database.conflicts_confl_bufferpin** <br>(gauge) | 이 데이터베이스에서 버퍼 고정으로 인해 취소된 쿼리 수|
| **fly_io.pg_stat.database.conflicts_confl_deadlock** <br>(gauge) | 이 데이터베이스에서 데드락 발생으로 인해 취소된 쿼리 수|
| **fly_io.pg_stat.database.conflicts_confl_lock** <br>(gauge) | 이 데이터베이스에서 잠금 시간 초과로 인해 취소된 쿼리 수|
| **fly_io.pg_stat.database.conflicts_confl_snapshot** <br>(gauge) | 이 데이터베이스에서 오래된 스냅샷으로 인해 취소된 쿼리 수|
| **fly_io.pg_stat.database.conflicts_confl_tablespace** <br>(gauge) | 이 데이터베이스에서 삭제된 테이블스페이스로 인해 취소된 쿼리 수|
| **fly_io.pg_stat.database.deadlocks** <br>(gauge) | 이 데이터베이스에서 감지된 데드락 발생 건 수|
| **fly_io.pg_stat.database.numbackends** <br>(gauge) | 현재 이 데이터베이스에 연결된 백엔드 수. 이 뷰에서 현재 상태를 반영하는 값을 반환하는 유일한 열입니다. 다른 모든 열은 마지막 재설정 이후 누적된 값을 반합니다.|
| **fly_io.pg_stat.database.stats_reset** <br>(gauge) | 이 통계가 마지막으로 초기화된 시간|
| **fly_io.pg_stat.database.tup_deleted** <br>(gauge) | 이 데이터베이스에서 쿼리가 삭제한 행 수|
| **fly_io.pg_stat.database.tup_fetched** <br>(gauge) | 이 데이터베이스에서 쿼리가 가져온 행 수|
| **fly_io.pg_stat.database.tup_inserted** <br>(gauge) | 이 데이터베이스에서 쿼리가 삽입한 행 수|
| **fly_io.pg_stat.database.tup_returned** <br>(gauge) | 이 데이터베이스에서 쿼리가 반환한 행 수|
| **fly_io.pg_stat.database.tup_updated** <br>(gauge) | 이 데이터베이스에서 쿼리가 업데이트한 행 수|
| **fly_io.pg_stat.database.xact_commit** <br>(gauge) | 이 데이터베이스에서 커밋된 트랜잭션 수|
| **fly_io.pg_stat.database.xact_rollback** <br>(gauge) | 이 데이터베이스에서 롤백된 트랜잭션 수|
| **fly_io.pg_stat.replication.pg_current_wal_lsn_bytes** <br>(gauge) | WAL 위치(바이트)<br>_byte로 표시됨_ |
| **fly_io.pg_stat.replication.pg_wal_lsn_diff** <br>(gauge) | 마스터와 슬레이브 간 지연(바이트)<br>_byte로 표시됨_ |
| **fly_io.pg_stat.replication.reply_time** <br>(gauge) | 대기 서버에서 수신한 마지막 응답 메시지의 전송 시간|
| **fly_io.volume.block_size** <br>(gauge) | 각 메모리 블록의 크기(바이트)<br>_byte로 표시됨_ |
| **fly_io.volume.blocks.count** <br>(gauge) | 볼륨에 포함된 블록의 총 개수|
| **fly_io.volume.blocks_avail** <br>(gauge) | 볼륨에서 데이터를 저장할 수 있는 블록 수|
| **fly_io.volume.blocks_free** <br>(gauge) | 데이터 및 루트 사용자 작업에 사용 가능한 총 블록 수|
| **fly_io.volume.created** <br>(gauge) | 볼륨이 생성되었는지 여부|
| **fly_io.volume.encrypted** <br>(gauge) | 볼륨이 암호화되었는지 여부|
| **fly_io.volume.size** <br>(gauge) | 볼륨 크기(GB)<br>_gigabyte로 표시됨_ |

### 이벤트

Fly.io 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Fly.io 통합은 서비스 점검을 포함하지 않습니다.

### 애플리케이션 트레이스

Fly.io 환경에서 애플리케이션의 트레이스를 수집하려면 다음 단계를 따르세요.

1. 애플리케이션을 [계측합니다](https://docs.datadoghq.com/tracing/trace_collection/#instrumentation-types).

1. Datadog Agent를 Fly.io 애플리케이션으로 [배포합니다](#deploying-the-agent-as-a-flyio-application) .

1. 애플리케이션의 `fly.toml` 또는 `Dockerfile`에 필요한 환경 변수를 설정하고 애플리케이션을 배포합니다.

   Datadog Agent 애플리케이션에 메트릭을 전송하려면 다음을 환경 변수로 설정하세요.

   ```
   [env]
       DD_AGENT_HOST="<YOUR_AGENT_APP_NAME>.internal"

   ```

   로그와 메트릭에 대해 동일한 호스트를 보고하도록 하려면 다음 환경 변수를 설정하세요.

   ```
   DD_TRACE_REPORT_HOSTNAME="true"
   ```

   [통합 서비스 태깅](https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=docker#configuration-1)을 사용하려면 다음 환경 변수를 설정하세요.

   ```
   DD_SERVICE="APP_NAME"
   DD_ENV="ENV_NAME"
   DD_VERSION="VERSION"
   ```

   로그와 트레이스를 연관시키기 위해 다음 [단계](https://docs.datadoghq.com/tracing/other_telemetry/connect_logs_and_traces/)를 따르고 이 환경 변수를 설정하세요.

   ```
   DD_LOGS_INJECTION="true"
   ```

1. [Datadog Agent 애플리케이션](#Deploying-the-agent-as-a-Fly.io-application) `fly.toml`에서 다음 환경 변수를 설정하고 앱을 배포합니다.

   ```
   [env]
       DD_APM_ENABLED = "true"
       DD_APM_NON_LOCAL_TRAFFIC = "true"
       DD_DOGSTATSD_NON_LOCAL_TRAFFIC = "true"
       DD_BIND_HOST = "fly-global-services"
   ```

**참고**: Fly.io 인스턴스 설정에서 APM 및 DogStatsD 포트가 (활성화된 경우) 공개적으로 노출되지 않도록 하세요.

### 로그 수집

Fly.io 애플리케이션에서 로그를 수집하기 위해 [fly_logs_shipper](https://github.com/superfly/fly-log-shipper)를 사용합니다.

1. 로그 전송 [프로젝트](https://github.com/superfly/fly-log-shipper)를 복제합니다.

1. `vector-configs/vector.toml` 파일을 수정하여 로그 소스를 `fly_io`로 설정합니다.

   ```
   [transforms.log_json]
   type = "remap"
   inputs = ["nats"]
   source  = '''
   . = parse_json!(.message)
   .ddsource = 'fly-io'
   .host = .fly.app.instance
   .env = <YOUR_ENV_NAME>
   '''
   ```

이 구성은 기본적인 Fly 관련 로그 속성을 파싱합니다. 모든 로그 속성을 완전히 파싱하려면 [Vector 변환](https://vector.dev/docs/reference/configuration/transforms/lua/)을 사용하여 앱별로 `ddsource`를 [알려진 로그 통합](https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source#integration-pipeline-library)으로 설정합니다.

3. [NATS](https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#nats-source-configuration)에 대한 [시크릿](https://fly.io/docs/flyctl/secrets/)을 설정합니다.
   `ORG` 및 `ACCESS_TOKEN`

1. [Datadog](https://github.com/superfly/fly-log-shipper?tab=readme-ov-file#datadog) `DATADOG_API_KEY` 및 `DATADOG_SITE`에 대한 [시크릿](https://fly.io/docs/flyctl/secrets/)을 설정합니다.

1. 로그 전송 앱을 [배포합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information).

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.