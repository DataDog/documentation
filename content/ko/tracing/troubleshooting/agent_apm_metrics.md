---
aliases:
- /ko/agent/faq/agent-apm-metrics/
- /ko/tracing/send_traces/agent-apm-metrics/
title: Datadog 에이전트로 전송한 애플리케이션 성능 모니터링(APM) 메트릭
---

하단에서 [애플리케이션 성능 모니터링(APM)이 활성화][1]된 경우 Datadog 에이전트가 전송하는, 즉시 사용 가능한 추적 메트릭의 목록을 확인하세요. 해당 메트릭 대부분을 활용하는 즉시 사용 가능한 대시보드를 사용하려면 Datadog 계정으로 [APM 모니터링 대시보드][2]를 불러옵니다.



`datadog.trace_agent.cpu_percent`
: **유형**: 게이지<br>
코어의 백분율로 표시한 CPU 사용량입니다. 예를 들어, `50` 값은 코어의 절반, `200` 값은 코어 2개를 나타냅니다.

`datadog.trace_agent.events.max_eps.current_rate`
: **유형**: 게이지<br>
에이전트가 수신하는 초당 애플리케이션 성능 모니터링(APM) 이벤트의 수

`datadog.trace_agent.events.max_eps.max_rate`
: **유형**: 게이지<br>
에이전트 설정의 max_events_per_second와 동일한 파라미터.

`datadog.trace_agent.events.max_eps.reached_max`
: **유형**: 게이지<br>
max_events_per_second에 도달할 때마다 `1`로 설정되며, 그렇지 않은 경우 `0`입니다.

`datadog.trace_agent.events.max_eps.sample_rate`
: **유형**: 게이지<br>
에이전트가 수신한 이벤트에 적용된 샘플 속도

`datadog.trace_agent.heap_alloc`
: **유형**: 게이지<br>
Go 런타임에서 보고한 힙(Heap) 할당.

`datadog.trace_agent.heartbeat`
: **유형**: 게이지<br>
10초마다 1씩 증가합니다.

`datadog.trace_agent.normalizer.spans_malformed`
: **유형**: 카운트<br>
시스템에서 허용하려면 변경해야 하는, 잘못된 형식의 필드가 존재하는 스팬(span)의 수입니다.

`datadog.trace_agent.obfuscation.sql_cache.hits`
: **유형**: 카운트<br>
해당하는 키를 찾은 값에 대한 GET 호출의 개수입니다.

`datadog.trace_agent.obfuscation.sql_cache.misses`
: **유형**: 카운트<br>
해당하는 키를 찾지 못한 값에 대한 GET 호출의 개수입니다.

`datadog.trace_agent.panic`
: **유형**: 게이지<br>
코드 패닉마다 1씩 증가합니다.

`datadog.trace_agent.profile`
: **유형**: 카운트<br>
프로필 엔드포인트의 리버스 프록시가 생성될 때마다 1씩 증가합니다.

`datadog.trace_agent.receiver.error`
: **유형**: 카운트<br>
디코딩, 포맷 또는 기타 오류로 인해 API가 페이로드를 거부한 횟수입니다.

`datadog.trace_agent.receiver.events_extracted`
: **유형**: 카운트<br>
샘플링한 총 애플리케이션 성능 모니터링(APM) 이벤트입니다.

`datadog.trace_agent.receiver.events_sampled`
: **유형**: 카운트<br>
`max_events_per_second` 파라미터 샘플러로 샘플링한 총 애플리케이션 성능 모니터링(APM) 이벤트입니다.

`datadog.trace_agent.receiver.oom_kill`
: **유형**: 카운트<br>
과도한 메모리 사용(max_memory의 150%)으로 인해 에이전트가 자체 종료된 횟수입니다.

`datadog.trace_agent.receiver.out_chan_fill`
: **유형**: 게이지<br>
내부 메트릭. 수신기 출력 채널의 점유 백분율입니다.

`datadog.trace_agent.receiver.payload_accepted`
: **유형**: 카운트<br>
에이전트가 허용한 페이로드의 수입니다.

`datadog.trace_agent.receiver.payload_refused`
: **유형**: 카운트<br>
샘플링으로 인해 수신기가 거부한 페이로드의 수입니다.

`datadog.trace_agent.receiver.spans_dropped`
: **유형**: 카운트<br>
에이전트가 거부한 스팬(span)의 수입니다.

`datadog.trace_agent.receiver.spans_filtered`
: **유형**: 카운트<br>
에이전트가 필터링한 스팬(span)의 수입니다.

`datadog.trace_agent.receiver.spans_received`
: **유형**: 카운트<br>
에이전트가 수신한 스팬(span)의 총 개수입니다.

`datadog.trace_agent.receiver.tcp_connections`
: **유형**: 카운트<br>
에이전트로 전송되는 TCP 연결 횟수입니다.

`datadog.trace_agent.receiver.trace`
: **유형**: 카운트<br>
수신 및 허용된 트레이스의 개수입니다.

`datadog.trace_agent.receiver.traces_bytes`
: **유형**: 카운트<br>
에이전트가 허용한 페이로드의 총 바이트 수입니다.

`datadog.trace_agent.receiver.traces_filtered`
: **유형**: 카운트<br>
(`datadog.yaml` 파일에 정의된 바와 같이) 무시된 리소스로 필터링한 트레이스입니다.

`datadog.trace_agent.receiver.traces_priority`
: **유형**: 카운트<br>
우선 순위가 태그가 있는 우선 순위 샘플러가 처리한 트레이스입니다.

`datadog.trace_agent.receiver.traces_received`
: **유형**: 카운트<br>
수신 및 허용된 트레이스의 개수입니다.

`datadog.trace_agent.started`
: **유형**: 카운트<br>
에이전트가 시작될 때마다 1씩 증가합니다.

`datadog.trace_agent.stats_writer.bytes`
: **유형**: 카운트<br>
전송된 바이트 수(Gzip 후에 산출됨).

`datadog.trace_agent.stats_writer.connection_fill`
: **유형**: 히스토그램 <br>
사용된 송신 연결 백분율입니다.

`datadog.trace_agent.stats_writer.dropped`
: **유형**: 카운트<br>
재시도 불가한 HTTP 오류로 인하여 삭제된 페이로드 수입니다.

`datadog.trace_agent.stats_writer.dropped_bytes`
: **유형**: 카운트<br>
재시도 불가한 HTTP 오류로 인하여 제거된 페이로드 수입니다.

`datadog.trace_agent.stats_writer.encode_ms`
: **유형**: 히스토그램 <br>
통계 페이로드를 인코딩하는 데 소요된 시간입니다.

`datadog.trace_agent.stats_writer.errors`
: **유형**: 카운트<br>
재시도할 수 없는 오류입니다.

`datadog.trace_agent.stats_writer.queue_fill`
: **유형**: 히스토그램 <br>
채워진 대기열의 백분율입니다.

`datadog.trace_agent.stats_writer.retries`
: **유형**: 카운트<br>
실패 시 Datadog API의 재시도 횟수입니다.

`datadog.trace_agent.stats_writer.splits`
: **유형**: 카운트<br>
페이로드가 여러 개로 분할된 횟수입니다.

`datadog.trace_agent.stats_writer.stats_buckets`
: **유형**: 카운트<br>
플러시된 통계 버킷의 수입니다.

`datadog.trace_agent.trace_writer.bytes`
: **유형**: 카운트<br>
전송된 바이트 수(Gzip 후에 산출됨).

`datadog.trace_agent.trace_writer.bytes_uncompressed `
: **유형**: 카운트<br>
전송된 바이트 수(Gzip 전에 산출됨).

`datadog.trace_agent.trace_writer.compress_ms`
: **유형**: 게이지<br>
인코딩된 트레이스 페이로드 압축 소요 시간(밀리초)입니다.

`datadog.trace_agent.trace_writer.connection_fill`
: **유형**: 히스토그램 <br>
트레이스 작성자가 사용한 송신 연결 백분율입니다.
 

`datadog.trace_agent.trace_writer.dropped`
: **유형**: 카운트<br>
재시도 불가한 HTTP 오류로 인하여 제거된 페이로드 수입니다.

`datadog.trace_agent.trace_writer.dropped_bytes`
: **유형**: 카운트<br>
재시도 불가한 HTTP 오류로 인하여 제거된 바이트 수입니다.

`datadog.trace_agent.trace_writer.encode_ms`
: **유형**: 게이지<br>
트레이스 페이로드 인코딩 소요 시간(밀리초)입니다.

`datadog.trace_agent.trace_writer.errors`
: **유형**: 카운트<br>
재시도할 수 없는 오류입니다.

`datadog.trace_agent.trace_writer.events`
: **유형**: 카운트<br>
처리한 이벤트 수입니다.

`datadog.trace_agent.trace_writer.flush_duration`
: **유형**: 게이지<br>
Datadog API에 페이로드를 플러시하는 데 걸린 시간입니다.

`datadog.trace_agent.trace_writer.payloads`
: **유형**: 카운트<br>
전송된 페이로드 수입니다.

`datadog.trace_agent.trace_writer.queue_fill`
: **유형**: 히스토그램 <br>
채워진 송신 페이로드 대기열의 백분율입니다.

`datadog.trace_agent.trace_writer.retries`
: **유형**: 카운트<br>
실패 시 Datadog API의 재시도 횟수입니다.

`datadog.trace_agent.trace_writer.spans`
: **유형**: 카운트<br>
처리한 스팬(span) 수입니다.

`datadog.trace_agent.trace_writer.traces`
: **유형**: 카운트<br>
처리한 트레이스 수입니다.

[1]: /ko/tracing/setup/
[2]: /resources/json/APM_monitoring_dashboard.json