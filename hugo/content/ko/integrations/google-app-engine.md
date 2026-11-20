---
aliases:
- /ko/integrations/google_app_engine
app_id: google-app-engine
categories:
- cloud
- configuration & deployment
- google cloud
custom_kind: integration
description: 'Google App Engine: Google의 서비스형 플랫폼. 클라우드에서 실행되는 앱을 모니터링합니다.'
media: []
title: Google App Engine
---
## 개요

프로젝트에 Google 앱 엔진 통합을 설치합니다.

- 멤캐시, 작업 대기열, 데이터 저장소 등 Google 앱 엔진 서비스 메트릭을 확인합니다.
- 백분위수, 레이턴시, 비용 표시 등 요청에 대한 메트릭을 확인합니다.
- Google 앱 엔진 메트릭에 버전별 태그를 설정하고 다양한 버전의 성능을 비교하세요.

[API](https://docs.datadoghq.com/api/latest/using-the-api/) 또는 [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/)를 통해 커스텀 메트릭을 Datadog으로 전송할 수도 있습니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

### 로그 수집

Google App Engine 로그는 Google Cloud Logging으로 수집되어 클라우드 Pub/Sub 토픽을 통해 Dataflow 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog Dataflow 템플릿으로 로깅을 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google 앱 엔진 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동해 Google App Engine 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.gae.flex.autoscaler.capacity** <br>(gauge) | 사용 용량과 서비스 중인 VM 수를 곱한 값.|
| **gcp.gae.flex.autoscaler.connections.current** <br>(gauge) | App Engine 가변형 환경 인스턴스당 현재 읽기 및 쓰기 연결 수. 오토스케일링에 사용됩니다.<br>_connection으로 표시_ |
| **gcp.gae.flex.autoscaler.current_utilization** <br>(gauge) | 서비스 중인 모든 VM의 지정된 메트릭의 사용률 합계.|
| **gcp.gae.flex.autoscaler.server.request_count** <br>(count) | App Engine 가변형 환경 인스턴스의 요청 개수. 오토스케일링에 사용됩니다.|
| **gcp.gae.flex.connections.current** <br>(gauge) | App Engine 가변형 환경 버전당 현재 활성화된 연결 수.<br>_connection으로 표시_ |
| **gcp.gae.flex.cpu.reserved_cores** <br>(gauge) | App Engine 가변형 환경 버전에 할당된 총 CPU 코어 수.<br>_core로 표시_ |
| **gcp.gae.flex.cpu.utilization** <br>(gauge) | App Engine 가변형 환경 버전에 할당된 CPU의 부분 사용률. 해당 값은 일반적으로 0.0에서 1.0 사이의 숫자이나 일부 머신 유형은 1.0 초과 버스팅을 허용합니다.<br>_percent로 표시_ |
| **gcp.gae.flex.disk.read_bytes_count** <br>(count) | App Engine 가변형 환경 버전에서 디스크에서 읽은 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.flex.disk.write_bytes_count** <br>(count) | App Engine 가변형 환경 버전에서 디스크에서 작성한 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.connections.current** <br>(count) | App Engine 가변형 환경 인스턴트당 현재 활성화된 연결 수.<br>_connection으로 표시_ |
| **gcp.gae.flex.instance.container.cpu.limit** <br>(gauge) | CPU 시간 제한(해당되는 경우).<br>_unit으로 표시_ |
| **gcp.gae.flex.instance.container.cpu.usage_time** <br>(gauge) | 컨테이너당 CPU 사용량(CPU 초)<br>_second로 표시_ |
| **gcp.gae.flex.instance.container.memory.limit** <br>(gauge) | 컨테이너가 사용할 수 있는 총 메모리.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.container.memory.usage** <br>(gauge) | 컨테이너가 사용 중인 총 메모리.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.container.network.received_bytes_count** <br>(count) | 모든 네트워크 인터페이스를 통해 컨테이너가 수신한 바이트.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.container.network.sent_bytes_count** <br>(count) | 모든 네트워크 인터페이스를 통해 컨테이너가 전송한 바이트.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.container.restart_count** <br>(count) | 컨테이너가 재시작된 횟수.|
| **gcp.gae.flex.instance.container.uptime** <br>(gauge) | 컨테이너가 가동된 시간.<br>_second로 표시_ |
| **gcp.gae.flex.instance.cpu.usage_time** <br>(count) | 모든 vCPU의 델타 vCPU 사용량(vCPU 초). 이 값은 VM의 하이퍼바이저가 보고하는 값으로, VM 내부에서 보고하는 `agent.googleapis.com/cpu/usage_time`과 다를 수 있습니다.<br>_second로 표시_ |
| **gcp.gae.flex.instance.cpu.utilization** <br>(gauge) | 단일 App Engine 가변형 인스턴스의 모든 코어에 대한 CPU의 부분 사용률. 값은 일반적으로 단일 코어의 경우 0.0에서 1.0 사이의 숫자입니다(총 1.0을 초과할 수 있음).|
| **gcp.gae.flex.instance.disk.io.read_bytes_count** <br>(count) | 디스크에서 읽은 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.disk.io.write_bytes_count** <br>(count) | 디스크에 기록된 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.guest.disk.bytes_used** <br>(gauge) | 파일 시스템의 디스크 사용 바이트 수.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.guest.memory.bytes_used** <br>(gauge) | 각 메모리 상태별 메모리 사용량(바이트). 모든 상태의 값을 합하면 머신의 총 메모리가 산출됩니다.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.healthcheck.liveness.request_count** <br>(count) | 상태 및 오류 코드가 포함된 Flex 인스턴스에 대한 Liveness 상태 확인 요청 수.<br>_request로 표시_ |
| **gcp.gae.flex.instance.healthcheck.readiness.request_count** <br>(count) | 상태 및 오류 코드가 포함된 Flex 인스턴스에 대한 Readiness 상태 확인 요청 수.<br>_request로 표시_ |
| **gcp.gae.flex.instance.jvm.gc.count** <br>(count) | 발생한 총 가비지 컬렉션 횟수.<br>_garbage collection으로 표시됨_ |
| **gcp.gae.flex.instance.jvm.gc.time** <br>(count) | 누적된 가비지 컬렉션 경과 시간(밀리초)<br>_millisecond로 표시_ |
| **gcp.gae.flex.instance.jvm.memory.usage** <br>(gauge) | 메모리 사용량.|
| **gcp.gae.flex.instance.jvm.os.cpu_time** <br>(count) | Java 가상 머신이 실행 중인 프로세스가 사용하는 CPU 시간.<br>_nanosecond로 표시_ |
| **gcp.gae.flex.instance.jvm.thread.num_live** <br>(gauge) | 현재 라이브 스레드 수.<br>_thread로 표시_ |
| **gcp.gae.flex.instance.jvm.thread.peak** <br>(gauge) | 최대 라이브 스레드 수.<br>_thread로 표시_ |
| **gcp.gae.flex.instance.jvm.uptime** <br>(count) | Java 가상 머신의 업타임 시간.<br>_millisecond로 표시_ |
| **gcp.gae.flex.instance.log_entry_count** <br>(count) | 로깅 Agent가 작성한 로그 엔트리 개수.<br>_entry로 표시_ |
| **gcp.gae.flex.instance.log_entry_retry_count** <br>(count) | 로깅 Agent가 다시 시도한 로그-엔트리 기록 개수.<br>_write로 표시_ |
| **gcp.gae.flex.instance.network.received_bytes_count** <br>(count) | App Engine 가변형 인스턴스에 들어오는 네트워크 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.network.sent_bytes_count** <br>(count) | App Engine 가변형 인스턴스에서 나가는 네트워크 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.flex.instance.nginx.connections.accepted_count** <br>(count) | 허용된 총 연결 수.<br>_connection으로 표시_ |
| **gcp.gae.flex.instance.nginx.connections.current** <br>(gauge) | 현재 NGINX에 연결된 연결 수.<br>_connection으로 표시_ |
| **gcp.gae.flex.instance.nginx.connections.handled_count** <br>(count) | 처리한 총 연결 수.|
| **gcp.gae.flex.instance.uptime** <br>(gauge) | VM이 실행된 시간(초).<br>_second로 표시_ |
| **gcp.gae.flex.instance.web_socket.closed_connections_count** <br>(count) | 종료된 웹소켓 연결 개수.|
| **gcp.gae.flex.instance.web_socket.durations.avg** <br>(count) | NGINX에서 측정한 웹소켓 연결 지속 시간의 평균.<br>_second로 표시_ |
| **gcp.gae.flex.instance.web_socket.durations.samplecount** <br>(count) | NGINX에서 측정한 웹소켓 연결 지속 시간의 샘플 개수.<br>_second로 표시_ |
| **gcp.gae.flex.instance.web_socket.durations.sumsqdev** <br>(count) | NGINX에서 측정한 웹소켓 연결 지속 시간의 제곱 편차 합계.<br>_second로 표시_ |
| **gcp.gae.flex.instance.ws.avg_duration** <br>(gauge) | 특정 App Engine 가변형 인스턴스에 대한 웹소켓 요청의 평균.<br>_second로 표시_ |
| **gcp.gae.flex.network.received_bytes_count** <br>(count) | App Engine 가변형 환경 버전의 모든 VM에 들어오는 네트워크 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.flex.network.sent_bytes_count** <br>(count) | App Engine 가변형 환경 버전의 모든 VM에서 나가는 네트워크 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.http.server.dos_intercept_count** <br>(count) | DoS 공격을 방지하기 위해 실행된 차단 개수.<br>_occurrence로 표시_ |
| **gcp.gae.http.server.quota_denial_count** <br>(count) | 앱의 할당량 초과로 인해 실패한 요청 개수.<br>_request로 표시_ |
| **gcp.gae.http.server.response_count** <br>(count) | HTTP 응답 개수.<br>_response로 표시_ |
| **gcp.gae.http.server.response_latencies.avg** <br>(gauge) | 평균 HTTP 응답 레이턴시.<br>_millisecond로 표시_ |
| **gcp.gae.http.server.response_latencies.p95** <br>(gauge) | HTTP 응답 레이턴시의 95 백분위수.<br>_millisecond로 표시_ |
| **gcp.gae.http.server.response_latencies.p99** <br>(gauge) | HTTP 응답 레이턴시의 99 백분위수.<br>_millisecond로 표시_ |
| **gcp.gae.http.server.response_latencies.samplecount** <br>(count) | HTTP 응답 레이턴시의 샘플 개수.<br>_millisecond로 표시_ |
| **gcp.gae.http.server.response_latencies.sumsqdev** <br>(gauge) | HTTP 응답 레이턴시의 편차 제곱합.<br>_millisecond로 표시_ |
| **gcp.gae.http.server.response_style_count** <br>(count) | 서버 스타일별 HTTP 응답 개수.<br>_response로 표시_ |
| **gcp.gae.infrastructure.cloudsql.connection_latencies.avg** <br>(count) | App Engine에서 Cloud SQL로 향하는 연결의 레이턴시 평균 분포(마이크로초).<br>_microsecond로 표시_ |
| **gcp.gae.infrastructure.cloudsql.connection_latencies.samplecount** <br>(count) | App Engine에서 Cloud SQL로 향하는 연결의 레이턴시 분포 샘플 개수(마이크로초).<br>_microsecond로 표시_ |
| **gcp.gae.infrastructure.cloudsql.connection_latencies.sumsqdev** <br>(count) | App Engine에서 Cloud SQL로 향하는 연결의 레이턴시 분포의 편차 제곱합(마이크로초).<br>_microsecond로 표시_ |
| **gcp.gae.infrastructure.cloudsql.connection_refused_count** <br>(count) | App Engine에서 Cloud SQL로 향하는 거부된 연결의 총수.|
| **gcp.gae.infrastructure.cloudsql.connection_request_count** <br>(count) | App Engine에서 Cloud SQL로 향하는 연결 요청의 총수.|
| **gcp.gae.infrastructure.cloudsql.received_bytes_count** <br>(count) | App Engine이 네트워크를 통해 Cloud SQL로부터 수신한 바이트 수.<br>_byte로 표시_ |
| **gcp.gae.infrastructure.cloudsql.sent_bytes_count** <br>(count) | App Engine이 네트워크를 통해 Cloud SQL로 전송한 바이트 수.<br>_byte로 표시_ |
| **gcp.gae.memcache.access_ages.avg** <br>(count) | 캐시된 아이템에 액세스 시 해당 아이템의 평균 수명.<br>_second로 표시_ |
| **gcp.gae.memcache.access_ages.samplecount** <br>(count) | 캐시된 아이템에 액세스 시 해당 아이템 수명의 샘플 개수.<br>_second로 표시_ |
| **gcp.gae.memcache.access_ages.sumsqdev** <br>(count) | 캐시된 아이템에 액세스 시 해당 아이템 수명의 편차 제곱합.<br>_second로 표시_ |
| **gcp.gae.memcache.backend_request_count** <br>(count) | 백엔드에 기록된 캐시 요청 개수.<br>_request로 표시_ |
| **gcp.gae.memcache.cache_size_limit** <br>(gauge) | 앱 구성에 따른 예상 최대 캐시 크기.<br>_byte로 표시_ |
| **gcp.gae.memcache.centi_mcu_count** <br>(count) | 1/100 Memcache Compute Unit으로 표시된 Memcache 이용률.<br>_unit으로 표시_ |
| **gcp.gae.memcache.centi_mcu_limit** <br>(gauge) | 1/100 Memcache Compute Unit으로 표시된 예상 최대 Memcache 크기.<br>_unit으로 표시_ |
| **gcp.gae.memcache.eviction_count** <br>(count) | 공간 제약으로 인해 캐시에서 삭제된 아이템의 비율.<br>_item으로 표시_ |
| **gcp.gae.memcache.hit_bytes_count** <br>(count) | 캐시 히트로 제공된 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.memcache.hit_count** <br>(count) | 캐시 히트율.<br>_request으로 표시_ |
| **gcp.gae.memcache.hit_ratio** <br>(gauge) | 모든 Memcache 작업 대비 성공한 히트의 백분율.<br>_hit로 표시_ |
| **gcp.gae.memcache.hot_keys.avg** <br>(count) | 핫 키의 초당 쿼리 수(QPS) 평균 분포.<br>_request로 표시_ |
| **gcp.gae.memcache.hot_keys.samplecount** <br>(count) | 핫 키의 초당 쿼리 수(QPS) 분포의 샘플 개수.<br>_request로 표시_ |
| **gcp.gae.memcache.hot_keys.sumsqdev** <br>(count) | 핫 키의 초당 쿼리 수(QPS) 분포의 편차 제곱합.<br>_request로 표시_ |
| **gcp.gae.memcache.miss_count** <br>(count) | 캐시 미스율<br>_request로 표시_ |
| **gcp.gae.memcache.operation_count** <br>(count) | 명령 및 상태별로 그룹화된 Memcache 키 작업 개수.<br>_operation으로 표시_ |
| **gcp.gae.memcache.received_bytes_count** <br>(count) | 앱이 Memcache API로부터 수신한 바이트 수로, 상태 및 Memcache 명령별로 그룹화한 값.<br>_byte로 표시_ |
| **gcp.gae.memcache.sent_bytes_count** <br>(count) | 앱이 Memcache API를 통해 전송한 바이트 수로, 상태 및 Memcache 명령별로 그룹화한 값.<br>_byte로 표시_ |
| **gcp.gae.memcache.set_bytes_count** <br>(count) | Set 명령으로 수신한 바이트 개수.<br>_byte로 표시_ |
| **gcp.gae.memcache.used_cache_size** <br>(gauge) | 저장된 모든 아이템의 총 크기로 계산된 캐시 크기.|
| **gcp.gae.system.billed_instance_estimate_count** <br>(gauge) | 고객에게 청구되는 인스턴스 수 예상치.<br>_instance로 표시_ |
| **gcp.gae.system.cpu.usage** <br>(gauge) | 모든 인스턴스의 CPU 사용량(메가사이클 단위).|
| **gcp.gae.system.cpu.utilization** <br>(gauge) | 모든 활성 인스턴스에 대한 CPU 사용률 평균.|
| **gcp.gae.system.instance_count** <br>(gauge) | 존재하는 인스턴스 수.<br>_instance로 표시_ |
| **gcp.gae.system.memory.usage** <br>(gauge) | 실행 중인 인스턴트가 사용하는 총 메모리.<br>_byte로 표시_ |
| **gcp.gae.system.network.received_bytes_count** <br>(count) | 수신 네트워크 대역폭의 개수.<br>_byte로 표시_ |
| **gcp.gae.system.network.sent_bytes_count** <br>(count) | 발신 네트워크 대역폭의 개수.<br>_byte로 표시_ |
| **gcp.gae.system.pending_queue.pending_requests** <br>(gauge) | 보류 중인 요청 수.|

### 이벤트

Google 앱 엔진 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google 앱 엔진 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.