---
app_id: milvus
categories:
- ai/ml
- 로그 수집
custom_kind: 통합
description: Milvus 배포 환경의 성능 및 사용량을 모니터링하세요.
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Milvus
---
## 개요

이 점검은 Datadog Agent를 통해 [Milvus][1]를 모니터링합니다. 개별 작업의 지연 시간 및 실행 횟수의 정보를 수집하여 Milvus 배포 성능에 관한 인사이트를 제공합니다. 또한 이 통합을 통해 배포 크기 및 리소스 할당을 모니터링할 수 있습니다.

## 설정

### 설치

Milvus 점검은 [Datadog Agent][2] 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 없습니다.

### 설정

#### 호스트

호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [컨테이너화](#컨테이너화된-환경) 섹션을 참조하세요.

{{< tabs >}}

{{% tab "Host" %}}

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `milvus.d/conf.yaml` 파일을 편집하여 Milvus 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 milvus.d/conf.yaml][3]을 참고하세요.

1. [Agent를 다시 시작합니다][4].

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경이라면 [Autodiscovery 통합 템플릿][5]에서 자세한 적용 방법을 확인하세요.

{{% /tab %}}

{{< /tabs >}}

#### 로그

Milvus 통합을 통해 Milvus 포드 또는 컨테이너에서 로그를 수집할 수 있습니다.

{{< tabs >}}

{{% tab "Host" %}}

Milvus 독립 실행형 컨테이너에서 로그를 수집하려면 이 옵션을 적용합니다.

1. Datadog Agent에서 로그 수집은 기본적으로 비활성화되어 있으므로 `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `milvus.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 해제하고 편집합니다. 다음 예시를 참고하세요.

   ```yaml
   logs:
     - type: docker
       source: milvus
       service: milvus
   ```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Milvus Kubernetes 클러스터에서 로그를 수집하려면 이 옵션을 적용합니다.

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 이를 활성화하려면 [Kubernetes 로그 수집][6]을 참고하세요.

다음으로, Log 통합을 포드 어노테이션으로 설정합니다. 이는 파일, configMap 또는 키-값 저장소를 사용하여 구성할 수도 있습니다. 자세한 내용은 [Kubernetes 로그 수집][7]의 구성 섹션을 참고하세요.

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령][8]을 실행하고 Checks 섹션에서 `milvus`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **milvus.bf_search_cnt.bucket** <br>(count) | 요청당 무차별 대입(brute-force) 검색 횟수 히스토그램 버킷|
| **milvus.bf_search_cnt.count** <br>(count) | 요청별 무차별 대입 검색 횟수 집계|
| **milvus.bf_search_cnt.sum** <br>(count) | 요청별 무차별 대입 검색 횟수 합계|
| **milvus.bitset_ratio.bucket** <br>(count) | 비트셋 비율 히스토그램 버킷|
| **milvus.bitset_ratio.count** <br>(count) | 비트셋 비율 계산 횟수|
| **milvus.bitset_ratio.sum** <br>(count) | 비트셋 비율 합계|
| **milvus.build_info** <br>(gauge) | milvus 빌드 정보|
| **milvus.build_latency.bucket** <br>(count) | 인덱스 빌드 지연 시간 히스토그램 버킷|
| **milvus.build_latency.count** <br>(count) | 인덱스 빌드 횟수|
| **milvus.build_latency.sum** <br>(count) | 인덱스 생성 지연 시간(초) 합계<br>_second로 표시됨_ |
| **milvus.cache_hit_cnt.bucket** <br>(count) | 요청별 캐시 히트 횟수 히스토그램 버킷|
| **milvus.cache_hit_cnt.count** <br>(count) | 요청별 캐시 히트 횟수 집계|
| **milvus.cache_hit_cnt.sum** <br>(count) | 요청별 캐시 히트 횟수 합계|
| **milvus.cgo.active_future_total** <br>(gauge) | 활성 퓨처(Future) 총 개수|
| **milvus.cgo.cgo_duration_seconds.bucket** <br>(count) | cgo 호출 지속 시간(초)의 히스토그램 버킷|
| **milvus.cgo.cgo_duration_seconds.count** <br>(count) | cgo 호출 횟수|
| **milvus.cgo.cgo_duration_seconds.sum** <br>(count) | cgo 호출 지속 시간의 합계(초).<br>_second로 표시됨_ |
| **milvus.cgo.cgo_queue_duration_seconds.bucket** <br>(count) | 대기열에 있는 cgo 호출 지속 시간 히스토그램 버킷|
| **milvus.cgo.cgo_queue_duration_seconds.count** <br>(count) | 대기열에 있는 cgo 호출 횟수|
| **milvus.cgo.cgo_queue_duration_seconds.sum** <br>(count) | 대기열에 있는 cgo 호출 지속 시간 합계<br>_second로 표시됨_ |
| **milvus.cgo.running_cgo_call_total** <br>(gauge) | 실행 중인 cgo 호출 총 횟수|
| **milvus.datacoord.channel_checkpoint_unix_seconds** <br>(gauge) | 채널 체크포인트 타임스탬프(Unix 초)|
| **milvus.datacoord.collection_num** <br>(gauge) | 컬렉션 수|
| **milvus.datacoord.consume_datanode_tt_lag_ms** <br>(gauge) | 물리 채널별 현재 시간에서 타임 트래블 시간을 뺀 값<br>_millisecond로 표시됨_ |
| **milvus.datacoord.datanode_num** <br>(gauge) | 데이터 노드 수|
| **milvus.datacoord.import_tasks** <br>(gauge) | 타입과 상태별로 그룹화된 가져오기 작업|
| **milvus.datacoord.index.node_num** <br>(gauge) | IndexCoord가 관리하는 IndexNodes 수|
| **milvus.datacoord.index.req.count** <br>(count) | 인덱스 생성 요청 수|
| **milvus.datacoord.index.task** <br>(gauge) | 유형별 인덱스 작업 수|
| **milvus.datacoord.segment_num** <br>(gauge) | 세그먼트 수|
| **milvus.datacoord.stored.binlog_size** <br>(gauge) | 정상 세그먼트의 바이너리 로그 크기<br>_byte로 표시됨_ |
| **milvus.datacoord.stored.index_files_size** <br>(gauge) | 세그먼트의 인덱스 파일 크기<br>_byte로 표시됨_ |
| **milvus.datacoord.stored.rows_num** <br>(gauge) | 정상 세그먼트에 저장된 행 수|
| **milvus.datacoord.task_execute_max_latency.bucket** <br>(count) | 작업 실행 작업 지연 시간 히스토그램 버킷|
| **milvus.datacoord.task_execute_max_latency.count** <br>(count) | 작업 실행 작업 수|
| **milvus.datacoord.task_execute_max_latency.sum** <br>(count) | 작업 실행 작업 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.datacoord.watched_dml_chanel_num** <br>(gauge) | 데이터노드가 감시하는 데이터 조작 언어 채널 수|
| **milvus.datanode.autoflush_buffer_op.count** <br>(count) | 자동 플러시 버퍼 작업 횟수|
| **milvus.datanode.consume.bytes.count** <br>(count) | 소비된 바이트 수|
| **milvus.datanode.consume.msg.count** <br>(count) | 소비된 메시지 수|
| **milvus.datanode.consume.tt_lag_ms** <br>(gauge) | 물리 채널별 현재 시간에서 타임 트래블 시간을 뺀 값<br>_millisecond로 표시됨_ |
| **milvus.datanode.encode_buffer_latency.bucket** <br>(count) | 인코딩 버퍼 데이터 지연 시간 히스토그램 버킷|
| **milvus.datanode.encode_buffer_latency.count** <br>(count) | 인코딩 버퍼 데이터 작업 횟수|
| **milvus.datanode.encode_buffer_latency.sum** <br>(count) | 인코딩 버퍼 데이터 작업 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.datanode.flowgraph_num** <br>(gauge) | 플로우그래프 수|
| **milvus.datanode.flush.buffer_op.count** <br>(count) | 플러시 버퍼 작업 횟수|
| **milvus.datanode.flush.req.count** <br>(count) | 플러시 요청 횟수|
| **milvus.datanode.flushed_data.rows.count** <br>(count) | 스토리지로 플러시된 행 수|
| **milvus.datanode.flushed_data.size.count** <br>(count) | 스토리지로 플러시된 데이터 바이트 크기<br>_byte로 표시됨_ |
| **milvus.datanode.msg.dispatcher_tt_lag_ms** <br>(gauge) | time.Now() 하위 디스패처의 현재 소비 시간<br>_millisecond로 표시됨_ |
| **milvus.datanode.msg.rows.count** <br>(count) | msgStream에서 소비된 행 수|
| **milvus.datanode.save_latency.bucket** <br>(count) | 플러시 데이터를 스토리지에 저장 시 발생하는 지연 시간 히스토그램 버킷|
| **milvus.datanode.save_latency.count** <br>(count) | 플러시 데이터를 스토리지에 저장한 이벤트 수|
| **milvus.datanode.save_latency.sum** <br>(count) | 플러시 데이터를 스토리지에 저장하는 이벤트들의 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.diskann.range_search_iters.bucket** <br>(count) | DISKANN 범위 검색 반복 횟수 히스토그램 버킷|
| **milvus.diskann.range_search_iters.count** <br>(count) | DISKANN 범위 검색 이벤트 수|
| **milvus.diskann.range_search_iters.sum** <br>(count) | DISKANN 범위 검색 반복 횟수 합계|
| **milvus.diskann.search_hops.bucket** <br>(count) | DISKANN 검색 홉 히스토그램|
| **milvus.diskann.search_hops.count** <br>(count) | DISKANN 검색 홉 이벤트 수|
| **milvus.diskann.search_hops.sum** <br>(count) | DISKANN 검색 홉 합계|
| **milvus.diskann_bitset_ratio.bucket** <br>(count) | 검색 및 범위 검색을 위한 DISKANN 비트셋 비율 히스토그램 버킷|
| **milvus.diskann_bitset_ratio.count** <br>(count) | 검색 및 범위 검색을 위한 DISKANN 비트셋 비율 연산 횟수|
| **milvus.diskann_bitset_ratio.sum** <br>(count) | 검색 및 범위 검색을 위한 DISKANN 비트셋 비율 합계|
| **milvus.exec_latency.bucket** <br>(count) | 요청별 실행 지연 시간 히스토그램 버킷|
| **milvus.exec_latency.count** <br>(count) | 요청별 실행 지연 시간 집계|
| **milvus.exec_latency.sum** <br>(count) | 요청별 실행 지연 시간 합계|
| **milvus.filter.connectivity_ratio.bucket** <br>(count) | 요청별 필터링에 설정된 평균 연결 비율 히스토그램 버킷|
| **milvus.filter.connectivity_ratio.count** <br>(count) | 요청별 필터링에 설정된 연결 비율 집계|
| **milvus.filter.connectivity_ratio.sum** <br>(count) | 요청별 필터링에 설정된 평균 연결 비율 합계|
| **milvus.filter.mv.activated_fields_cnt.bucket** <br>(count) | 요청당 활성화된 구체화된 뷰(Materialized View) 필드 평균값의 히스토그램 버킷|
| **milvus.filter.mv.activated_fields_cnt.count** <br>(count) | 구체화된 뷰 필드를 활성화하는 요청 수|
| **milvus.filter.mv.activated_fields_cnt.sum** <br>(count) | 요청당 활성화된 구체화된 뷰 필드 평균값 합계|
| **milvus.filter.mv.change_base_cnt.bucket** <br>(count) | 요청당 구체화된 뷰 변경 베이스 카운트의 히스토그램 버킷|
| **milvus.filter.mv.change_base_cnt.count** <br>(count) | 구체화된 뷰 변경 베이스 이벤트를 트리거하는 요청 수|
| **milvus.filter.mv.change_base_cnt.sum** <br>(count) | 요청당 구체화된 뷰 변경 베이스 카운트 합계|
| **milvus.filter.mv.only_cnt.bucket** <br>(count) | 요청당 구체화된 뷰 단독 처리 건수 히스토그램 버킷|
| **milvus.filter.mv.only_cnt.count** <br>(count) | 구체화된 뷰 단독 이벤트를 트리거하는 요청 수|
| **milvus.filter.mv.only_cnt.sum** <br>(count) | 구체화된 뷰 단독 처리 건수 합계|
| **milvus.filter.mv.supplement_ep_bool_cnt.bucket** <br>(count) | 구체화된 뷰 보조 진입점 히스토그램 버킷(요청당 비트셋 부울수 기준)|
| **milvus.filter.mv.supplement_ep_bool_cnt.count** <br>(count) | 비트셋 부울 이벤트로 구체화된 뷰 보조 진입점을 트리거한 요청 수|
| **milvus.filter.mv.supplement_ep_bool_cnt.sum** <br>(count) | 비트셋 부울 이벤트에서 구체화된 뷰 보충 진입점의 합계|
| **milvus.flushed_segment_file_num.bucket** <br>(count) | 플러시된 세그먼트 파일 수 히스토그램 버킷|
| **milvus.flushed_segment_file_num.count** <br>(count) | 플러시된 세그먼트 이벤트 수|
| **milvus.flushed_segment_file_num.sum** <br>(count) | 플러시된 세그먼트 파일 수 합계|
| **milvus.go.gc_duration_seconds.count** <br>(count) | 가비지 컬렉션 주기 일시 중지 기간 요약|
| **milvus.go.gc_duration_seconds.quantile** <br>(gauge) | 가비지 컬렉션 주기 일시 중지 기간 요약|
| **milvus.go.gc_duration_seconds.sum** <br>(count) | 가비지 컬렉션 주기 일시 중지 기간 요약|
| **milvus.go.goroutines** <br>(gauge) | 현재 존재하는 고루틴 수.|
| **milvus.go.info** <br>(gauge) | Go 환경에 대한 정보|
| **milvus.go.memstats.alloc_bytes** <br>(gauge) | 할당되어 사용 중인 바이트 수|
| **milvus.go.memstats.alloc_bytes.count** <br>(count) | 해제 여부와 상관없이 할당된 총 바이트 수|
| **milvus.go.memstats.buck_hash_sys_bytes** <br>(gauge) | 프로파일링 버킷 해시 테이블에서 사용된 바이트 수|
| **milvus.go.memstats.frees.count** <br>(count) | 총 free 수|
| **milvus.go.memstats.gc_sys_bytes** <br>(gauge) | 가비지 컬렉션 시스템 메타데이터에 사용된 바이트 수|
| **milvus.go.memstats.heap.alloc_bytes** <br>(gauge) | 할당되어 사용 중인 힙 바이트 수|
| **milvus.go.memstats.heap.idle_bytes** <br>(gauge) | 사용될 힙 바이트 수|
| **milvus.go.memstats.heap.inuse_bytes** <br>(gauge) | 사용 중인 힙 바이트 수|
| **milvus.go.memstats.heap.objects** <br>(gauge) | 할당된 객체 수|
| **milvus.go.memstats.heap.released_bytes** <br>(gauge) | OS에 해제된 힙 바이트 수|
| **milvus.go.memstats.heap.sys_bytes** <br>(gauge) | 시스템에서 가져온 힙 바이트 수|
| **milvus.go.memstats.last_gc_time_seconds** <br>(gauge) | 1970년 마지막 가비지 컬렉션 이후 경과 시간(초)|
| **milvus.go.memstats.lookups.count** <br>(count) | 총 포인터 조회 횟수|
| **milvus.go.memstats.mallocs.count** <br>(count) | malloc 총 개수|
| **milvus.go.memstats.mcache.inuse_bytes** <br>(gauge) | mcache 구조체가 사용 중인 바이트 수|
| **milvus.go.memstats.mcache.sys_bytes** <br>(gauge) | 시스템에서 가져온 mcache 구조체가 사용 중인 바이트 수|
| **milvus.go.memstats.mspan.inuse_bytes** <br>(gauge) | mspan 구조체에서 사용 중인 바이트 수|
| **milvus.go.memstats.mspan.sys_bytes** <br>(gauge) | 시스템에서 가져온 mspan 구조체가 사용 중인 바이트 수|
| **milvus.go.memstats.next_gc_bytes** <br>(gauge) | 다음 가비지 컬렉션이 발생할 때의 힙 바이트 수|
| **milvus.go.memstats.other_sys_bytes** <br>(gauge) | 다른 시스템 할당에 사용된 바이트 수|
| **milvus.go.memstats.stack.inuse_bytes** <br>(gauge) | 스택 할당자가 사용 중인 바이트 수|
| **milvus.go.memstats.stack.sys_bytes** <br>(gauge) | 스택 할당자를 위해 시스템에서 확보한 바이트 수|
| **milvus.go.memstats.sys_bytes** <br>(gauge) | 시스템에서 확보한 바이트 수|
| **milvus.go.threads** <br>(gauge) | 생성된 OS 스레드 수|
| **milvus.graph_search_cnt.bucket** <br>(count) | 요청당 그래프 검색 횟수 히스토그램 버킷|
| **milvus.graph_search_cnt.count** <br>(count) | 그래프 검색을 트리거하는 요청 수|
| **milvus.graph_search_cnt.sum** <br>(count) | 그래프 검색 합계|
| **milvus.hnsw.bitset_ratio.bucket** <br>(count) | 검색 및 범위 검색을 위한 HNSW 비트셋 비율의 히스토그램 버킷|
| **milvus.hnsw.bitset_ratio.count** <br>(count) | 검색 및 범위 검색을 위한 HNSW 비트셋 비율 집계|
| **milvus.hnsw.bitset_ratio.sum** <br>(count) | 검색 및 범위 검색을 위한 HNSW 비트셋 비율 합계|
| **milvus.hnsw.search_hops.bucket** <br>(count) | 레이어 0에서 HNSW 검색 홉 수 히스토그램 버킷|
| **milvus.hnsw.search_hops.count** <br>(count) | 레이어 0에서 HNSW 검색 홉 수|
| **milvus.hnsw.search_hops.sum** <br>(count) | 레이어 0에서 HNSW 검색 홉 합계|
| **milvus.indexnode.build_index_latency.bucket** <br>(count) | 세그먼트의 빌드 인덱스 지연 시간 히스토그램 버킷|
| **milvus.indexnode.build_index_latency.count** <br>(count) | 인덱스 빌드 이벤트 수|
| **milvus.indexnode.build_index_latency.sum** <br>(count) | 인덱스 빌드 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.indexnode.encode_index_latency.bucket** <br>(count) | 인덱스 파일 인코딩 지연 시간의 히스토그램 버킷|
| **milvus.indexnode.encode_index_latency.count** <br>(count) | 인덱스 파일 인코딩 이벤트 수|
| **milvus.indexnode.encode_index_latency.sum** <br>(count) | 인덱스 파일 인코딩 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.indexnode.index.task.count** <br>(count) | 인덱스 노드가 받은 작업 수|
| **milvus.indexnode.index.task_latency_in_queue.bucket** <br>(count) | 대기열에 있는 인덱스 작업 지연 시간 히스토그램 버킷|
| **milvus.indexnode.index.task_latency_in_queue.count** <br>(count) | 대기열에 있는 인덱스 작업 수|
| **milvus.indexnode.index.task_latency_in_queue.sum** <br>(count) | 대기열에 있는 인덱스 작업 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.indexnode.knowhere_build_index_latency.bucket** <br>(count) | Knowhere 인덱스 빌드 지연 시간 히스토그램 버킷|
| **milvus.indexnode.knowhere_build_index_latency.count** <br>(count) | Knowhere 인덱스 빌드 횟수|
| **milvus.indexnode.knowhere_build_index_latency.sum** <br>(count) | knowhere 인덱스 빌드 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.indexnode.save_index_latency.bucket** <br>(count) | 인덱스 파일 저장 지연 시간 히스토그램 버킷|
| **milvus.indexnode.save_index_latency.count** <br>(count) | 인덱스 파일 저장 이벤트 수|
| **milvus.indexnode.save_index_latency.sum** <br>(count) | 인덱스 파일 저장 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.internal.core_search_latency.bucket** <br>(count) | 세그먼트 검색 \[cpp\]l지연 시간(us) 히스토그램 버킷|
| **milvus.internal.core_search_latency.count** <br>(count) | 세그먼트 검색 \[cpp\]l지연 시간(us) 집계|
| **milvus.internal.core_search_latency.sum** <br>(count) | 세그먼트 검색 \[cpp\]l지연 시간(us) 합계<br>_microsecond로 표시됨_ |
| **milvus.internal.mmap.allocated_space_bytes.bucket** <br>(count) | [cpp] mmap 할당 공간 통계 히스토그램 버킷|
| **milvus.internal.mmap.allocated_space_bytes.count** <br>(count) | [cpp] mmap 할당 공간 통계 집계|
| **milvus.internal.mmap.allocated_space_bytes.sum** <br>(count) | [cpp] mmap 할당 공간 통계 합계|
| **milvus.internal.mmap.in_used_space_bytes** <br>(gauge) | \[cpp\]mmap 사용된 공간 통계|
| **milvus.internal.storage.kv_size.bucket** <br>(count) | \[cpp\]키-값 크기 통계 히스토그램 버킷|
| **milvus.internal.storage.kv_size.count** <br>(count) | \[cpp\]키-값 크기 통계 집계|
| **milvus.internal.storage.kv_size.sum** <br>(count) | \[cpp\]키-값 크기 통계 합계|
| **milvus.internal.storage.load_duration.bucket** <br>(count) | 세그먼트 로드 \[cpp\]소요 시간 히스토그램 버킷|
| **milvus.internal.storage.load_duration.count** <br>(count) | 세그먼트 로드 \[cpp\]소요 시간 집계|
| **milvus.internal.storage.load_duration.sum** <br>(count) | 세그먼트 로드 \[cpp\]소요 시간 합계|
| **milvus.internal.storage.op.count** <br>(count) | 영구 데이터 작업 \[cpp\]횟수|
| **milvus.internal.storage.request_latency.bucket** <br>(count) | 클라이언트 측 \[cpp\]요청 지연 시간(밀리초) 히스토그램 버킷|
| **milvus.internal.storage.request_latency.count** <br>(count) | 클라이언트 측 \[cpp\]요청 지연 시간(밀리초) 집계|
| **milvus.internal.storage.request_latency.sum** <br>(count) | 클라이언트 측 \[cpp\]요청 지연 시간(밀리초) 합계<br>_millisecond로 표시됨_ |
| **milvus.io_cnt.bucket** <br>(count) | 요청당 IO 횟수 히스토그램 버킷|
| **milvus.io_cnt.count** <br>(count) | IO 작업을 트리거하는 요청 횟수|
| **milvus.io_cnt.sum** <br>(count) | IO 작업 횟수 합계|
| **milvus.ivf_search_cnt.bucket** <br>(count) | 요청당 역파일 검색 횟수 히스토그램 버킷|
| **milvus.ivf_search_cnt.count** <br>(count) | 역파일 검색을 트리거한 요청 수|
| **milvus.ivf_search_cnt.sum** <br>(count) | 역파일 검색 합계|
| **milvus.load_latency.bucket** <br>(count) | 인덱스 로드 지연 시간(밀리초) 히스토그램 버킷|
| **milvus.load_latency.count** <br>(count) | 인덱스 로드 이벤트 수|
| **milvus.load_latency.sum** <br>(count) | 인덱스 로드 지연 시간(밀리초) 합계<br>_millisecond로 표시됨_ |
| **milvus.meta.kv_size.bucket** <br>(count) | 키-값 크기 통계 히스토그램|
| **milvus.meta.kv_size.count** <br>(count) | 키-값 크기 통계 집계|
| **milvus.meta.kv_size.sum** <br>(count) | 키-값 크기 통계 합계|
| **milvus.meta.op.count** <br>(count) | 메타 작업 수|
| **milvus.meta.request_latency.bucket** <br>(count) | 클라이언트 측 요청 지연 시간 히스토그램 버킷|
| **milvus.meta.request_latency.count** <br>(count) | 클라이언트 측 요청 지연 시간 집계|
| **milvus.meta.request_latency.sum** <br>(count) | 클라이언트 측 요청 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.msg_queue_consumer_num** <br>(gauge) | 소비자 수|
| **milvus.msgstream.op.count** <br>(count) | 스트림 메시지 작업 수|
| **milvus.msgstream.request_latency.bucket** <br>(count) | 클라이언트 측 요청 지연 시간 히스토그램 버킷|
| **milvus.msgstream.request_latency.count** <br>(count) | 클라이언트 측 요청 지연 시간 집계|
| **milvus.msgstream.request_latency.sum** <br>(count) | 클라이언트 측 요청 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.num_node** <br>(gauge) | 노드 및 좌표 수|
| **milvus.process.cpu_seconds.count** <br>(count) | 사용자 및 시스템 CPU 사용 시간 합계(초)|
| **milvus.process.max_fds** <br>(gauge) | 열려 있는 파일 디스크립터의 최대 개수.|
| **milvus.process.open_fds** <br>(gauge) | 열려 있는 파일 디스크립터 수.|
| **milvus.process.resident_memory_bytes** <br>(gauge) | 상주 메모리 크기(바이트)|
| **milvus.process.start_time_seconds** <br>(gauge) | Unix Epoch 이후 프로세스 시작 시간(초)|
| **milvus.process.virtual_memory.bytes** <br>(gauge) | 가상 메모리 크기(바이트)|
| **milvus.process.virtual_memory.max_bytes** <br>(gauge) | 사용 가능한 최대 가상 메모리 용량(바이트)|
| **milvus.proxy.apply.pk_latency.bucket** <br>(count) | 'apply primary key' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.apply.pk_latency.count** <br>(count) | 'apply primary key' 이벤트 수|
| **milvus.proxy.apply.pk_latency.sum** <br>(count) | 'apply primary key' 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.apply.timestamp_latency.bucket** <br>(count) | 프록시 'apply timestamp' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.apply.timestamp_latency.count** <br>(count) | 프록시 'apply timestamp' 이벤트 수|
| **milvus.proxy.apply.timestamp_latency.sum** <br>(count) | 프록시 'apply primary key' 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.assign_segmentID_latency.bucket** <br>(count) | 프록시 'get segmentID from dataCoord' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.assign_segmentID_latency.count** <br>(count) | 프록시 'get segmentID from dataCoord' 이벤트 수|
| **milvus.proxy.assign_segmentID_latency.sum** <br>(count) | 프록시 'get segmentID from dataCoord' 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.cache.hit.count** <br>(count) | 캐시 히트/미스 수|
| **milvus.proxy.cache.update_latency.bucket** <br>(count) | 프록시 'update cache when cache miss' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.cache.update_latency.count** <br>(count) | 프록시 'update cache when cache miss' 이벤트 수|
| **milvus.proxy.cache.update_latency.sum** <br>(count) | 프록시 'update cache when cache miss' 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.delete_vectors.count** <br>(count) | 성공적으로 삭제된 벡터 수|
| **milvus.proxy.msgstream_obj_num** <br>(gauge) | 물리 채널별 MsgStream 객체 수|
| **milvus.proxy.mutation_send_latency.bucket** <br>(count) | 프록시 'send insert request to MsgStream' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.mutation_send_latency.count** <br>(count) | 프록시 'send insert request to MsgStream' 이벤트 수|
| **milvus.proxy.mutation_send_latency.sum** <br>(count) | 프록시 'send insert request to MsgStream' 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.rate_limit_req.count** <br>(count) | 실행된 작업 수|
| **milvus.proxy.report_value.count** <br>(count) | 요청 보고 값|
| **milvus.proxy.req.count** <br>(count) | 실행된 작업 수|
| **milvus.proxy.req.in_queue_latency.bucket** <br>(count) | 요청 대기 시간 히스토그램 버킷|
| **milvus.proxy.req.in_queue_latency.count** <br>(count) | 대기열에 있는 요청 수|
| **milvus.proxy.req.in_queue_latency.sum** <br>(count) | 요청 대기 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.req.latency.bucket** <br>(count) | 각 요청 지연 시간 히스토그램 버킷|
| **milvus.proxy.req.latency.count** <br>(count) | 요청 지연 시간 이벤트 수|
| **milvus.proxy.req.latency.sum** <br>(count) | 요청 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.send_bytes.count** <br>(count) | SDK로 반환된 바이트 수|
| **milvus.proxy.sq.decode_result_latency.bucket** <br>(count) | 프록시 'decode the search result' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.sq.decode_result_latency.count** <br>(count) | 프록시 'decode the search result' 이벤트 수|
| **milvus.proxy.sq.decode_result_latency.sum** <br>(count) | 프록시 'decode the search result' 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.sq.reduce_result_latency.bucket** <br>(count) | 프록시 'reduces search result' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.sq.reduce_result_latency.count** <br>(count) | 프록시 'reduces search result' 이벤트 수|
| **milvus.proxy.sq.reduce_result_latency.sum** <br>(count) | 프록시 'reduces search result' 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.sq.wait_result_latency.bucket** <br>(count) | 프록시 'waits for the result' 이벤트 지연 시간 히스토그램 버킷|
| **milvus.proxy.sq.wait_result_latency.count** <br>(count) | 프록시 'waits for the result' 이벤트 수|
| **milvus.proxy.sq.wait_result_latency.sum** <br>(count) | 프록시 'waits for the result' 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.proxy.sync_segment_request_length.bucket** <br>(count) | 삽입용 세그먼트 할당 시 SegmentIDRequests 길이 히스토그램 버킷|
| **milvus.proxy.sync_segment_request_length.count** <br>(count) | 삽입 이벤트의 세그먼트 할당 횟수|
| **milvus.proxy.sync_segment_request_length.sum** <br>(count) | 삽입용 세그먼트 할당 시 SegmentIDRequests 길이 합계|
| **milvus.proxy.tt_lag_ms** <br>(gauge) | 물리 채널별 현재 시간에서 타임 트래블 시간을 뺀 값<br>_millisecond로 표시됨_ |
| **milvus.quant.compute_cnt.bucket** <br>(count) | 요청당 양자화 연산 카운트 히스토그램 버킷|
| **milvus.quant.compute_cnt.count** <br>(count) | 양자화 연산 이벤트를 트리거한 요청 수|
| **milvus.quant.compute_cnt.sum** <br>(count) | 양자화 연산 이벤트 횟수 합계|
| **milvus.querycoord.collection_num** <br>(gauge) | 컬렉션 수|
| **milvus.querycoord.current_target_checkpoint_unix_seconds** <br>(gauge) | 현재 대상 체크포인트 타임스탬프(Unix 초)|
| **milvus.querycoord.load.latency.bucket** <br>(count) | 전체 컬렉션 로드 시 지연 시간 히스토그램 버킷|
| **milvus.querycoord.load.latency.count** <br>(count) | 전체 컬렉션 로드 시 지연 시간|
| **milvus.querycoord.load.latency.sum** <br>(count) | 전체 컬렉션 로드 시 지연 시간<br>_millisecond로 표시됨_ |
| **milvus.querycoord.load.req.count** <br>(count) | 로드 요청 횟수|
| **milvus.querycoord.partition_num** <br>(gauge) | 파티션 수|
| **milvus.querycoord.querynode_num** <br>(gauge) | QueryCoord가 관리하는 QueryNodes 수|
| **milvus.querycoord.release.latency.bucket** <br>(count) | 릴리스 요청 지연 시간 히스토그램 버킷|
| **milvus.querycoord.release.latency.count** <br>(count) | 릴리스 요청 이벤트 수|
| **milvus.querycoord.release.latency.sum** <br>(count) | 릴리스 요청 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querycoord.release.req.count** <br>(count) | 릴리스 요청 수|
| **milvus.querycoord_task_num** <br>(gauge) | QueryCoord 스케줄러의 작업 수|
| **milvus.querynode.apply_bf_latency.bucket** <br>(count) | 무차별 대입 적용 비용(밀리초) 히스토그램 버킷|
| **milvus.querynode.apply_bf_latency.count** <br>(count) | 무차별 대입 적용 이벤트 수|
| **milvus.querynode.apply_bf_latency.sum** <br>(count) | 무차별 대입 적용 비용 합계(밀리초)<br>_millisecond로 표시됨_ |
| **milvus.querynode.collection_num** <br>(gauge) | 로드된 컬렉션 수|
| **milvus.querynode.consume.bytes_counter.count** <br>(count) | 소비된 바이트 수|
| **milvus.querynode.consume.msg.count** <br>(count) | 소비된 메시지 수|
| **milvus.querynode.consume.tt_lag_ms** <br>(gauge) | 물리 채널별 현재 시간에서 타임 트래블 시간을 뺀 값<br>_millisecond로 표시됨_ |
| **milvus.querynode.disk.cache.evict.bytes.count** <br>(count) | 디스크 캐시에서 제거된 바이트 수<br>_byte로 표시됨_ |
| **milvus.querynode.disk.cache.evict.count** <br>(count) | 디스크 캐시에서 제거된 세그먼트 수|
| **milvus.querynode.disk.cache.evict.duration.count** <br>(count) | 디스크 캐시에서 세그먼트 제거에 소요된 총 시간 비용|
| **milvus.querynode.disk.cache.evict.global_duration.bucket** <br>(count) | 디스크 캐시에서 세그먼트 제거에 소요된 전체 시간 히스토그램 버킷|
| **milvus.querynode.disk.cache.evict.global_duration.count** <br>(count) | 디스크 캐시에서 세그먼트를 제거한 이벤트 수|
| **milvus.querynode.disk.cache.evict.global_duration.sum** <br>(count) | 디스크 캐시에서 세그먼트 제거에 소요된 전체 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.disk.cache.load.bytes.count** <br>(count) | 디스크 캐시에서 로드된 바이트 수<br>_byte로 표시됨_ |
| **milvus.querynode.disk.cache.load.count** <br>(count) | 디스크 캐시에서 로드된 세그먼트 수|
| **milvus.querynode.disk.cache.load.duration.count** <br>(count) | 디스크 캐시에서 세그먼트 로드에 소요된 총 시간 비용|
| **milvus.querynode.disk.cache.load.global_duration.bucket** <br>(count) | 디스크 캐시에서 세그먼트 로드에 소요된 전체 시간 히스토그램 버킷|
| **milvus.querynode.disk.cache.load.global_duration.count** <br>(count) | 디스크 캐시 이벤트에서 세그먼트 로딩 횟수|
| **milvus.querynode.disk.cache.load.global_duration.sum** <br>(count) | 디스크 캐시에서 세그먼트 로드에 소요된 전체 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.disk.used_size** <br>(gauge) | 사용된 디스크 크기(MB)<br>_mebibyte로 표시됨_ |
| **milvus.querynode.dml_vchannel_num** <br>(gauge) | 감시 중인 데이터 조작 언어 채널 수|
| **milvus.querynode.entity.num** <br>(gauge) | 검색/쿼리할 수 있는 엔티티 수 (컬렉션, 파티션, 상태별로 그룹화)|
| **milvus.querynode.entity.size** <br>(gauge) | 컬렉션 및 상태별로 그룹화된 엔티티 메모리 크기<br>_byte로 표시됨_ |
| **milvus.querynode.execute_bytes_counter.count** <br>(count) | 실행 바이트 수|
| **milvus.querynode.flowgraph_num** <br>(gauge) | 플로우그래프 수|
| **milvus.querynode.forward_delete_latency.bucket** <br>(count) | 포워드 삭제 비용(밀리초) 히스토그램 버킷|
| **milvus.querynode.forward_delete_latency.count** <br>(count) | 포워드 삭제 이벤트 수|
| **milvus.querynode.forward_delete_latency.sum** <br>(count) | 포워드 삭제 비용 합계(밀리초)<br>_millisecond로 표시됨_ |
| **milvus.querynode.load.index_latency.bucket** <br>(count) | 세그먼트 인덱스별 로드 지연 시간(밀리초) 히스토그램 버킷|
| **milvus.querynode.load.index_latency.count** <br>(count) | 세그먼트 인덱스 이벤트별 로드 횟수|
| **milvus.querynode.load.index_latency.sum** <br>(count) | 세그먼트 인덱스 이벤트별 로드 지연 시간 합계(밀리초)<br>_millisecond로 표시됨_ |
| **milvus.querynode.load.segment.concurrency** <br>(gauge) | QueryNode에서 동시에 로드되는 세그먼트 수|
| **milvus.querynode.load.segment.latency.bucket** <br>(count) | 세그먼트별 로드 지연 시간 히스토그램 버킷|
| **milvus.querynode.load.segment.latency.count** <br>(count) | 세그먼트별 로드 이벤트 수|
| **milvus.querynode.load.segment.latency.sum** <br>(count) | 세그먼트별 이벤트 로드 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.msg_dispatcher_tt_lag_ms** <br>(gauge) | time.Now() 하위 디스패처의 현재 소비 시간<br>_millisecond로 표시됨_ |
| **milvus.querynode.partition_num** <br>(gauge) | 로드된 파티션 수|
| **milvus.querynode.process_insert_or_delete_latency.bucket** <br>(count) | 프로세스 삽입 또는 삭제 비용(밀리초) 히스토그램 버킷|
| **milvus.querynode.process_insert_or_delete_latency.count** <br>(count) | 프로세스 삽입 또는 삭제 이벤트 수|
| **milvus.querynode.process_insert_or_delete_latency.sum** <br>(count) | 프로세스 삽입 또는 삭제 비용 합계(밀리초)<br>_millisecond로 표시됨_ |
| **milvus.querynode.read_task.concurrency** <br>(gauge) | QueryNode에서 동시에 실행 중인 읽기 작업 수|
| **milvus.querynode.read_task.ready_len** <br>(gauge) | readyQueue에 준비된 읽기 작업 수|
| **milvus.querynode.read_task.unsolved_len** <br>(gauge) | unsolvedQueue에 있는 미해결 읽기 작업 수|
| **milvus.querynode.search.group.nq.bucket** <br>(count) | 그룹화된 검색 작업별 쿼리 수 히스토그램 버킷|
| **milvus.querynode.search.group.nq.count** <br>(count) | 그룹화된 검색 작업 수|
| **milvus.querynode.search.group.nq.sum** <br>(count) | 그룹화된 검색 작업 쿼리 수 합계|
| **milvus.querynode.search.group.size.bucket** <br>(count) | 그룹화된 검색 작업별 작업 수 히스토그램 버킷|
| **milvus.querynode.search.group.size.count** <br>(count) | 그룹화된 검색 작업 수|
| **milvus.querynode.search.group.size.sum** <br>(count) | 그룹화된 검색 작업 수 합계|
| **milvus.querynode.search.group.topk.bucket** <br>(count) | 각 그룹화된 검색 작업 TopK 히스토그램 버킷|
| **milvus.querynode.search.group.topk.count** <br>(count) | 그룹화된 검색 작업 수|
| **milvus.querynode.search.group.topk.sum** <br>(count) | 그룹화된 검색 작업 TopK 합계|
| **milvus.querynode.search.nq.bucket** <br>(count) | 각 검색 작업 쿼리 수 히스토그램 버킷|
| **milvus.querynode.search.nq.count** <br>(count) | 검색 작업 수|
| **milvus.querynode.search.nq.sum** <br>(count) | 검색 작업 쿼리 수 합계|
| **milvus.querynode.search.topk.bucket** <br>(count) | 각 검색 작업 상위 히스토그램 버킷|
| **milvus.querynode.search.topk.count** <br>(count) | 검색 작업 수|
| **milvus.querynode.search.topk.sum** <br>(count) | 검색 작업 상위 합계|
| **milvus.querynode.segment.access.count** <br>(count) | 액세스된 세그먼트 수|
| **milvus.querynode.segment.access.duration.count** <br>(count) | 액세스된 세그먼트 총 시간 비용|
| **milvus.querynode.segment.access.global_duration.bucket** <br>(count) | 세그먼트 액세스에 소요되는 전체 시간 비용 히스토그램 버킷|
| **milvus.querynode.segment.access.global_duration.count** <br>(count) | 세그먼트 액세스 이벤트 수|
| **milvus.querynode.segment.access.global_duration.sum** <br>(count) | 세그먼트 액세스에 소요되는 전체 시간 비용 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.segment.access.wait_cache.count** <br>(count) | 로딩 액세스를 기다리는 세그먼트 수|
| **milvus.querynode.segment.access.wait_cache.duration.count** <br>(count) | 로딩 액세스 대기에 소요되는 총 시간 비용|
| **milvus.querynode.segment.access.wait_cache.global_duration.bucket** <br>(count) | 로딩 액세스 대기에 소요되는 전체 시간 비용 히스토그램 버킷|
| **milvus.querynode.segment.access.wait_cache.global_duration.count** <br>(count) | 로딩 액세스 이벤트 대기 횟수|
| **milvus.querynode.segment.access.wait_cache.global_duration.sum** <br>(count) | 로딩 액세스 이벤트 대기 시간 비용 전체 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.segment.latency_per_vector.bucket** <br>(count) | 세그먼트별 벡터 검색 지연 시간 히스토그램 버킷|
| **milvus.querynode.segment.latency_per_vector.count** <br>(count) | 세그먼트별 단일 벡터 검색 지연 시간 집계|
| **milvus.querynode.segment.latency_per_vector.sum** <br>(count) | 세그먼트별 단일 벡터 검색 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.segment.num** <br>(gauge) | 로드된 세그먼트 수(컬렉션, 파티션, 상태, 인덱싱된 필드 수별로 그룹화)|
| **milvus.querynode.sq.core_latency.bucket** <br>(count) | segcore의 검색 또는 쿼리 지연 시간 히스토그램 버킷|
| **milvus.querynode.sq.core_latency.count** <br>(count) | segcore의 검색 또는 쿼리 이벤트 수|
| **milvus.querynode.sq.core_latency.sum** <br>(count) | segcore의 검색 또는 쿼리 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.sq.queue.latency.bucket** <br>(count) | 대기 중인 검색 또는 쿼리 지연 시간 히스토그램 버킷|
| **milvus.querynode.sq.queue.latency.count** <br>(count) | 검색 또는 쿼리 이벤트 수|
| **milvus.querynode.sq.queue.latency.sum** <br>(count) | 대기 중인 검색 또는 쿼리 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.sq.queue.user_latency.bucket** <br>(count) | 사용자별 검색 또는 쿼리 대기 지연 시간 히스토그램 버킷|
| **milvus.querynode.sq.queue.user_latency.count** <br>(count) | 대기 중인 검색 또는 쿼리 수|
| **milvus.querynode.sq.queue.user_latency.sum** <br>(count) | 사용자별 검색 또는 쿼리 대기 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.sq.reduce_latency.bucket** <br>(count) | 검색 또는 쿼리 결과 축소 지연 시간 히스토그램 버킷|
| **milvus.querynode.sq.reduce_latency.count** <br>(count) | 검색 또는 쿼리 결과 축소 이벤트 수|
| **milvus.querynode.sq.reduce_latency.sum** <br>(count) | 검색 또는 쿼리 결과 축소 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.sq.req.count** <br>(count) | 검색/쿼리 요청 횟수|
| **milvus.querynode.sq.req.latency.bucket** <br>(count) | 검색 또는 쿼리 요청 지연 시간 히스토그램 버킷|
| **milvus.querynode.sq.req.latency.count** <br>(count) | 검색 또는 쿼리 요청 횟수|
| **milvus.querynode.sq.req.latency.sum** <br>(count) | 검색 또는 쿼리 요청 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.sq.segment_latency.bucket** <br>(count) | 세그먼트별 검색 또는 쿼리 지연 시간 히스토그램 버킷|
| **milvus.querynode.sq.segment_latency.count** <br>(count) | 세그멘트별 검색 또는 쿼리 수|
| **milvus.querynode.sq.segment_latency.sum** <br>(count) | 세그먼트별 검색 또는 쿼리 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.sq.wait_tsafe_latency.bucket** <br>(count) | 검색 또는 쿼리 tsafe 대기 시간 히스토그램 버킷|
| **milvus.querynode.sq.wait_tsafe_latency.count** <br>(count) | tsafe를 기다리는 검색 또는 쿼리 발생 횟수|
| **milvus.querynode.sq.wait_tsafe_latency.sum** <br>(count) | 검색 또는 쿼리 tsafe 대기 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.querynode.wait_processing_msg** <br>(gauge) | 메시지 처리 대기 횟수|
| **milvus.querynode.watch_dml_channel_latency.bucket** <br>(count) | 데이터 조작 언어 채널 감시 지연 시간 히스토그램 버킷|
| **milvus.querynode.watch_dml_channel_latency.count** <br>(count) | 데이터 조작 언어 채널 감시 이벤트 수|
| **milvus.querynode.watch_dml_channel_latency.sum** <br>(count) | 데이터 조작 언어 채널 감시 이벤트 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.queue.latency.bucket** <br>(count) | 요청별 대기열 지연 시간 히스토그램 버킷|
| **milvus.queue.latency.count** <br>(count) | 대기열 지연 시간이 있는 요청 수|
| **milvus.queue.latency.sum** <br>(count) | 대기열 지연 시간 합계|
| **milvus.range_search_latency.bucket** <br>(count) | 범위 검색 지연 시간(밀리초) 히스토그램 버킷|
| **milvus.range_search_latency.count** <br>(count) | 범위 검색 작업 수|
| **milvus.range_search_latency.sum** <br>(count) | 범위 검색 지연 시간 합계(밀리초)<br>_millisecond로 표시됨_ |
| **milvus.raw_compute_cnt.bucket** <br>(count) | 요청별 원시 연산 카운트 히스토그램 버킷|
| **milvus.raw_compute_cnt.count** <br>(count) | 원시 연산 작업을 트리거하는 요청 수|
| **milvus.raw_compute_cnt.sum** <br>(count) | 원시 연산 작업 합계|
| **milvus.re_search_cnt.bucket** <br>(count) | 요청당 폴백 검색 횟수 히스토그램 버킷|
| **milvus.re_search_cnt.count** <br>(count) | 폴백 검색 작업을 트리거하는 요청 수|
| **milvus.re_search_cnt.sum** <br>(count) | 폴백 검색 합계|
| **milvus.rootcoord.collection_num** <br>(gauge) | 컬렉션 수|
| **milvus.rootcoord.credential_num** <br>(gauge) | 자격 증명 수|
| **milvus.rootcoord.ddl_req.count** <br>(count) | DDL 작업 수|
| **milvus.rootcoord.ddl_req.latency.bucket** <br>(count) | 각 DDL 작업 지연 시간 히스토그램 버킷|
| **milvus.rootcoord.ddl_req.latency.count** <br>(count) | DDL 작업 수|
| **milvus.rootcoord.ddl_req.latency.sum** <br>(count) | DDL 작업 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.rootcoord.ddl_req.latency_in_queue.bucket** <br>(count) | 대기열에 있는 각 DDL 작업 지연 시간 히스토그램 버킷|
| **milvus.rootcoord.ddl_req.latency_in_queue.count** <br>(count) | 대기열에 있는 DDL 작업 수|
| **milvus.rootcoord.ddl_req.latency_in_queue.sum** <br>(count) | 대기열에 있는 DDL 작업 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.rootcoord.dml_channel_num** <br>(gauge) | DML 채널 수|
| **milvus.rootcoord.entity_num** <br>(gauge) | 컬렉션 및 상태(loaded/total)별로 그룹화된 엔터티 수|
| **milvus.rootcoord.force_deny_writing_counter.count** <br>(count) | milvus가 force-deny-writing 상태로 전환된 횟수|
| **milvus.rootcoord.id_alloc.count** <br>(count) | 할당된 ID 수|
| **milvus.rootcoord.indexed_entity_num** <br>(gauge) | 인덱싱된 엔터티 수(컬렉션, 인덱스 이름, 벡터 인덱스 여부별로 그룹화)|
| **milvus.rootcoord.msgstream_obj_num** <br>(gauge) | 메시지 스트림 수|
| **milvus.rootcoord.num_of_roles** <br>(gauge) | 역할 수|
| **milvus.rootcoord.partition_num** <br>(gauge) | 파티션 수|
| **milvus.rootcoord.produce_tt_lag_ms** <br>(gauge) | 물리 채널별 현재 시간에서 타임 트래블 시간을 뺀 값<br>_millisecond로 표시됨_ |
| **milvus.rootcoord.proxy_num** <br>(gauge) | rootcoord가 관리하는 프록시 노드 수|
| **milvus.rootcoord.qn_mem_high_water_level** <br>(gauge) | QueryNode 메모리 최고 사용량|
| **milvus.rootcoord.sync_timetick_latency.bucket** <br>(count) | 동기화 타임틱 메시지 지연 시간 히스토그램 버킷|
| **milvus.rootcoord.sync_timetick_latency.count** <br>(count) | 동기화 타임틱 메시지 이벤트 수|
| **milvus.rootcoord.sync_timetick_latency.sum** <br>(count) | 타임틱 메시지 이벤트 동기화 지연 시간 합계<br>_millisecond로 표시됨_ |
| **milvus.rootcoord.timestamp** <br>(gauge) | 메모리에 할당된 최신 타임스탬프|
| **milvus.rootcoord.timestamp_saved** <br>(gauge) | 메타 스토리지에 저장된 타임스탬프|
| **milvus.runtime_info** <br>(gauge) | Milvus 가동 시간 정보|
| **milvus.search.latency.bucket** <br>(count) | 검색 지연 시간(밀리초) 히스토그램 버킷|
| **milvus.search.latency.count** <br>(count) | 검색 이벤트 수|
| **milvus.search.latency.sum** <br>(count) | 검색 지연 시간 합계(밀리초)<br>_millisecond로 표시됨_ |
| **milvus.search.topk.bucket** <br>(count) | 검색 TopK 히스토그램 버킷|
| **milvus.search.topk.count** <br>(count) | 검색 TopK 집계|
| **milvus.search.topk.sum** <br>(count) | 검색 TopK 합계|
| **milvus.storage.kv_size** <br>(gauge) | 키-값 크기 통계|
| **milvus.storage.op.count** <br>(count) | 영구 데이터 작업 수|
| **milvus.storage.request_latency** <br>(gauge) | 클라이언트 측 요청 지역 시간|

### 이벤트

Milvus 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Milvus 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀][9]에 문의하세요.

[1]: https://milvus.io/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/milvus/datadog_checks/milvus/data/conf.yaml.example
[4]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: /agent/kubernetes/integrations/
[6]: /agent/kubernetes/log/#setup
[7]: /agent/kubernetes/log/#configuration
[8]: /agent/guide/agent-commands/#agent-status-and-information
[9]: /help/