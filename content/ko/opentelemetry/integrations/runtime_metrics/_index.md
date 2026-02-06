---
aliases:
- /ko/opentelemetry/runtime_metrics/
- /ko/opentelemetry/integrations/runtime_metrics/go/
- /ko/opentelemetry/integrations/runtime_metrics/dotnet/
- /ko/opentelemetry/integrations/runtime_metrics/java/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: 설명서
  text: APM 런타임 메트릭
- link: /opentelemetry/mapping/metrics_mapping/
  tag: 설명서
  text: OpenTelemetry 메트릭 매핑
title: OpenTelemetry 런타임 메트릭
---

## 개요

런타임 메트릭은 메모리 사용량, 가비지 수집, 병렬화 등 애플리케이션 성능에 관한 인사이트를 제공합니다. Datadog 추적 라이브러리는 지원되는 각 언어에 [런타임 메트릭 수집][5] 서비스를 제공하며, OpenTelemetry(OTel)도 OpenTelemetry SDK를 통해 Datadog로 전송할 수 있는 호환되는 런타임 메트릭을 수집합니다.

## 호환성

Datadog는 다음 언어에 OpenTelemetry 런타임 메트릭을 지원합니다.
- Java
- .NET
- Go

호스트 및 컨테이너 메트릭 매핑에 관한 자세한 내용은 [OpenTelemetry 메트릭 매핑][1]을 참조하세요.

## 설정 지침

### 1. 사전 요건

- [Datadog에 전송하도록 OpenTelemetry 메트릭을 성공적으로 설정했습니다.][2]
- [Datadog와 호환되는 언어 통합][3]을 설치했습니다.

### 2. 애플리케이션 설정

런타임 메트릭을 전송하도록 OpenTelemetry SDK를 설정하기 위한 지침을 보려면 언어를 선택하세요.

{{< tabs >}}
{{% tab "Java" %}}

#### 자동 계측

Java 애플리케이션에 [OpenTelemetry 자동 계측][3]을 사용하면 런타임 메트릭이 기본적으로 활성화됩니다.

#### 수동 계측

[OpenTelemetry 수동 계측][4]을 사용하는 경우 Java 버전 가이드를 참고하세요.
- [Java 8][5]
- [Java 17][6]

[3]: https://opentelemetry.io/docs/instrumentation/java/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/java/manual/
[5]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java8/library
[6]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/tree/main/instrumentation/runtime-telemetry/runtime-telemetry-java17/library

{{% /tab %}}

{{% tab "Go" %}}

OpenTelemetry Go 애플리케이션은 [수동으로 계측됩니다][3]. 런타임 메트릭을 사용하려면 [런타임 패키지][4] 문서를 참고하세요.

[3]: https://opentelemetry.io/docs/instrumentation/go/manual/
[4]: https://pkg.go.dev/go.opentelemetry.io/contrib/instrumentation/runtime

{{% /tab %}}

{{% tab ".NET" %}}

</div>NET OpenTelemetry SDK의 최소 지원 버전은 <a href="https://github.com/open-telemetry/opentelemetry-dotnet/releases/tag/core-1.5.0">1.5.0입니다</a>.<div class="alert alert-danger">

#### 자동 계측

.NET 애플리케이션에 [OpenTelemetry 자동 계측][3]을 사용하는 경우 런타임 메트릭이 기본적으로 활성화됩니다.

#### 수동 계측

[OpenTelemetry 매뉴얼 계측][4]을 사용하는 경우 [OpenTelemetry.Instrumentation.Runtime 라이브러리][5] 설명서를 참조하세요.

#### 메트릭 내보내기 간격

.NET OTel SDK의 기본 메트릭 내보내기 간격은 Datadog.NET SDK의 기본값과 다릅니다. Datadog는 .NET 서비스에서 [OTEL_METRIC_EXPORT_INTERVAL][7] 환경 변수를 기본 Datadog 메트릭 내보내기 간격과 일치하도록 설정할 것을 권장합니다.

```
OTEL_METRIC_EXPORT_INTERVAL=10000
```

[3]: https://opentelemetry.io/docs/instrumentation/net/automatic/
[4]: https://opentelemetry.io/docs/instrumentation/net/manual/
[5]: https://github.com/open-telemetry/opentelemetry-dotnet-contrib/tree/main/src/OpenTelemetry.Instrumentation.Runtime
[7]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/#periodic-exporting-metricreader

{{% /tab %}}

{{< /tabs >}}

## 런타임 메트릭 대시보드 보기

설정이 완료되면 런타임 메트릭을 볼 수 있습니다.
- 서비스 상세 정보 페이지(아래 Java 예시 참조)
- 플레임 그래프 메트릭 탭
- 기본값 [런타임 대시보드][7]

{{< img src="opentelemetry/otel_runtime_metrics_service_page.png" alt="JVM 메트릭 탭에서 OpenTelemetry 런타임 메트릭을 표시하는 서비스 페이지" style="width:100%;" >}}

## 수집한 데이터

Datadog와 함께 OpenTelemetry 런타임 메트릭을 사용하는 경우 다음 두 항목 모두를 수신하게 됩니다.
- 원본 OpenTelemetry 런타임 메트릭
- 동등한 메트릭의 Datadog 런타임 메트릭 매핑

OpenTelemetry 런타임 메트릭에는 소스에 따라 다음과 같은 접두사가 붙습니다.

| 소스 | 접두사 |
| --- | --- |
| [OTel Collector Datadog Exporter][100] | `otel.process.runtime.*` |
| [Datadog Agent OTLP Ingest][101] | `process.runtime.*` |

다음은 OpenTelemetry 매핑을 통해 지원되는 Datadog 런타임 메트릭 목록입니다. "N/A"는 메트릭에 해당하는 OpenTelemetry가 없음을 나타냅니다.

<div class="alert alert-danger">OpenTelemetry 런타임 메트릭은 Datadog에 메트릭 이름으로 매핑됩니다. OpenTelemetry 런타임 메트릭의 호스트 메트릭 이름을 변경하면 매핑이 깨지므로 변경하지 마세요.</div>

[100]: /ko/opentelemetry/setup/collector_exporter/
[101]: /ko/opentelemetry/setup/otlp_ingest_in_the_agent

{{< tabs >}}
{{% tab "Java" %}}

| Datadog 메트릭 | 설명 |  OpenTelemetry 메트릭 |
| --- | --- | --- |
| `jvm.heap_memory` | 사용된 Java 힙(heap) 메모리입니다. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.heap_memory_committed` | 사용하기 위해 커밋된 총 Java 힙 메모리입니다. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.heap_memory_init` | 할당된 초기 Java 힙 메모리입니다. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.heap_memory_max` | 사용 가능한 최대 Java 힙 메모리입니다. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.non_heap_memory` | 사용된 총 Java 비-힙 메모리입니다. 비-힙 메모리는 `Metaspace + CompressedClassSpace + CodeCache`입니다. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.non_heap_memory_committed` | 사용하기 위해 커밋된 총 Java 비-힙 메모리입니다. | `process.runtime.jvm.memory.committed` <br> `jvm.memory.committed` |
| `jvm.non_heap_memory_init` | 할당된 초기 Java 비-힙 메모리입니다. | `process.runtime.jvm.memory.init` <br> `jvm.memory.init` |
| `jvm.non_heap_memory_max` | 사용 가능한 최대 Java 비-힙 메모리입니다. | `process.runtime.jvm.memory.limit` <br> `jvm.memory.limit` |
| `jvm.gc.old_gen_size` | 구세대 메모리 풀의 현재 Java 힙 메모리 사용량입니다. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.eden_size` | Eden 메모리 풀의 현재 Java 힙 메모리 사용량입니다. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.survivor_size` | Survivor 메모리 풀의 현재 Java 힙 메모리 사용량입니다. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.gc.metaspace_size` | Metaspace 메모리 풀의 현재 Java 비-힙 메모리 사용량입니다. | `process.runtime.jvm.memory.usage` <br> `jvm.memory.used` |
| `jvm.thread_count` | 실시간 스레드 수입니다. | `process.runtime.jvm.threads.count` <br> `jvm.thread.count` |
| `jvm.loaded_classes` | 현재 로드된 클래스 수입니다. | `process.runtime.jvm.classes.current_loaded` <br> `jvm.class.count` |
| `jvm.cpu_load.system` | 전체 시스템의 최근 CPU 사용률입니다. | `process.runtime.jvm.system.cpu.utilization` <br> `jvm.system.cpu.utilization` |
| `jvm.cpu_load.process` | 프로세스의 최근 CPU 사용률 | `process.runtime.jvm.cpu.utilization` <br> `jvm.cpu.recent_utilization` |
| `jvm.buffer_pool.direct.used` | 직접 버퍼가 사용하는 메모리 측정값입니다. | `process.runtime.jvm.buffer.usage` <br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.direct.count` | 풀의 직접 버퍼 개수입니다. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.direct.limit` | 직접 버퍼의 총 메모리 용량을 측정합니다. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.buffer_pool.mapped.used` | 매핑된 버퍼가 사용하는 메모리 측정값입니다. | `process.runtime.jvm.buffer.usage`<br> `jvm.buffer.memory.usage` |
| `jvm.buffer_pool.mapped.count` | 풀에 매핑된 버퍼의 개수입니다. | `process.runtime.jvm.buffer.count`<br> `jvm.buffer.count` |
| `jvm.buffer_pool.mapped.limit` | 매핑된 버퍼의 총 메모리 용량을 측정합니다. | `process.runtime.jvm.buffer.limit` <br> `jvm.buffer.memory.limit` |
| `jvm.gc.parnew.time` | 경과된 대략적인 누적 가비지 수집 시간입니다. | N/A |
| `jvm.gc.cms.count` | 발생한 총 가비지 수집 횟수입니다. | N/A |
| `jvm.gc.major_collection_count` | 주요 가비지 수집률입니다. 이 메트릭을 수신하도록 `new_gc_metrics: true`를 설정합니다. | N/A |
| `jvm.gc.minor_collection_count` | 부수적 가비지 수거률입니다. 이 메트릭을 수신하도록 `new_gc_metrics: true`를 설정합니다. | N/A |
| `jvm.gc.major_collection_time` | 주요 가비지 수거에 소요되는 시간 비율입니다. `new_gc_metrics: true`를 설정하여 메트릭을 수신합니다. | N/A |
| `jvm.gc.minor_collection_time` | 부수적 가비지 수거에 소요되는 시간 비율입니다. 이 메트릭을 수신하도록 `new_gc_metrics: true`를 설정합니다. | N/A |
| `jvm.os.open_file_descriptors` | 오픈 파일 디스크립터의 수입니다. | N/A |

{{% /tab %}}

{{% tab "Go" %}}

| Datadog 메트릭 | 설명 |  OpenTelemetry 메트릭 |
| --- | --- | --- |
| `runtime.go.num_goroutine` | 생성된 goroutine 수입니다. | `process.runtime.go.goroutines` |
| `runtime.go.num_cgo_call` | CGO 호출 횟수입니다. |`process.runtime.go.cgo.calls` |
| `runtime.go.mem_stats.lookups` | 런타임이 실행한 포인터 조회 횟수입니다. | `process.runtime.go.mem.lookups` |
| `runtime.go.mem_stats.heap_alloc` | 할당된 힙 객체의 바이트 수입니다. | `process.runtime.go.mem.heap_alloc` |
| `runtime.go.mem_stats.heap_sys` | 운영 체제에서 가져온 힙 메모리의 바이트 수입니다. | `process.runtime.go.mem.heap_sys` |
| `runtime.go.mem_stats.heap_idle` | 유휴(사용되지 않은) 스팬의 바이트 수입니다. | `process.runtime.go.mem.heap_idle` |
| `runtime.go.mem_stats.heap_inuse` | 사용 중인 스팬의 바이트 수입니다. | `process.runtime.go.mem.heap_inuse` |
| `runtime.go.mem_stats.heap_released` | 운영 체제에 반환된 물리적 메모리 바이트 수입니다. | `process.runtime.go.mem.heap_released` |
| `runtime.go.mem_stats.heap_objects` | 할당된 힙 객체 수입니다. | `process.runtime.go.mem.heap_objects` |
| `runtime.go.mem_stats.pause_total_ns` | 가비지 수집 누적 나노초(GC)입니다. | `process.runtime.go.gc.pause_total_ns` |
| `runtime.go.mem_stats.num_gc` | 완료된 GC 주기 수입니다. | `process.runtime.go.gc.count` |
| `runtime.go.num_cpu` | 런타임에 감지된 CPU 수입니다. | N/A |
| `runtime.go.mem_stats.alloc` | 할당된 힙 객체의 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.total_alloc` | 힙 객체에 할당된 누적 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.sys` | 운영 체제에서 얻은 총 메모리 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.mallocs` | 할당된 힙 객체의 누적 개수입니다. | N/A |
| `runtime.go.mem_stats.frees` | 해제된 힙 객체의 누적 개수입니다. | N/A |
| `runtime.go.mem_stats.stack_inuse` | 스택 스팬의 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.stack_sys` | 운영 체제에서 가져온 스택 메모리 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.m_span_inuse` | 할당된 mspan 구조의 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.m_span_sys` | 운영 체제에서 mspan 구조와 관련해 획득한 메모리 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.m_cache_inuse` | 할당된 캐시 구조의 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.m_cache_sys` | 운영 체제에서 캐시 구조와 관련해 얻은 메모리 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.buck_hash_sys` | 프로파일링 버킷 해시 테이블의 메모리 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.gc_sys` | 가비지 수집 메타데이터의 메모리 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.other_sys` | 다양한 오프 힙의 메모리 바이트 수입니다. | N/A |
| `runtime.go.mem_stats.next_gc` | 다음 GC 주기의 목표 힙 크기입니다. | N/A |
| `runtime.go.mem_stats.last_gc` | UNIX 시대 이후 나노초 단위로 마지막 가비지 수집이 완료되었습니다. | N/A |
| `runtime.go.mem_stats.num_forced_gc` | 애플리케이션이 강제로 GC 기능을 호출한 GC 주기 횟수입니다. | N/A |
| `runtime.go.mem_stats.gc_cpu_fraction` | 프로그램 시작 이후 GC가 사용한 이 프로그램의 가용 CPU 시간 중 일부입니다. | N/A |
| `runtime.go.gc_stats.pause_quantiles.min` | GC 배포 일시 중지 시간: 최소값입니다. | N/A |
| `runtime.go.gc_stats.pause_quantiles.25p` | GC 배포 일시 중지 시간의 백분위수: 25번째 백분위수입니다. | N/A |
| `runtime.go.gc_stats.pause_quantiles.50p` | GC 베포 일시 중지 시간의 백분위수: 50번째 백분위수입니다. | N/A |
| `runtime.go.gc_stats.pause_quantiles.75p` | GC 베포 일시 중지 시간의 백분위수: 75번째 백분위수입니다. | N/A |
| `runtime.go.gc_stats.pause_quantiles.max` | GC 배포 일시 중지 시간: 최대값입니다. | N/A |

{{% /tab %}}

{{% tab ".NET" %}}

| Datadog 메트릭 | 설명 |  OpenTelemetry 메트릭 |
| --- | --- | --- |
| `runtime.dotnet.threads.contention_count` | 스레드가 잠금을 기다리기 위해 중지된 횟수입니다. | `process.runtime.dotnet.`<br>`monitor.lock_contention.count` |
| `runtime.dotnet.exceptions.count` | 첫 번째 기회 예외의 수입니다. | `process.runtime.dotnet.`<br>`exceptions.count` |
| `runtime.dotnet.gc.size.gen0` | 0세대 힙의 크기입니다. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen1` | 1세대 힙의 크기입니다. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.gen2` | 2세대 힙의 크기입니다. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.size.loh` | 대형 객체 힙의 크기입니다. | `process.runtime.dotnet.`<br>`gc.heap.size` |
| `runtime.dotnet.gc.count.gen0` | 0세대 가비지 수집의 개수입니다. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen1` | 1세대 가비지 수집의 개수입니다. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.gc.count.gen2` | 2세대 가비지 수집의 개수입니다. | `process.runtime.dotnet.`<br>`gc.collections.count` |
| `runtime.dotnet.cpu.system` | 커널에서 실행되는 시간(밀리초)입니다. | N/A |
| `runtime.dotnet.cpu.user` | 커널 외부에서 실행되는 밀리초 수입니다. | N/A |
| `runtime.dotnet.cpu.percent` | 애플리케이션이 사용하는 총 CPU의 백분율입니다. | N/A |
| `runtime.dotnet.mem.committed` | 메모리 사용량입니다. | N/A |
| `runtime.dotnet.threads.count` | 스레드 수입니다. | N/A |
| `runtime.dotnet.threads.workers_count` | 스레드 풀의 워커 수입니다(.NET Core에만 해당). | N/A |
| `runtime.dotnet.threads.contention_time` | 잠금을 기다리는 스레드가 소비한 누적 시간입니다(.NET Core에만 해당). | N/A |
| `runtime.dotnet.gc.memory_load` | 프로세스에서 사용하는 총 메모리의 백분율입니다. 이 값이 85를 초과하면 가비지 수집(GC) 동작이 변경됩니다(.NET Core에만 해당). | N/A |
| `runtime.dotnet.gc.pause_time` | GC가 애플리케이션 스레드를 일시 중지한 시간입니다(.NET Core만 해당). | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.total` | 서버가 수신한 총 HTTP 요청 수입니다(.NET Core만 해당). | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.failed` | 서버가 수신한 실패한 HTTP 요청의 수입니다(.NET Core만 해당). | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.current` | 시작되었지만 아직 중지되지 않은 HTTP 요청의 총 수입니다(.NET Core만 해당). | N/A |
| `runtime.dotnet.aspnetcore.`<br>`requests.queue_length` | 서버 HTTP 요청 대기열의 현재 길이입니다(.NET Core에만 해당). | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.total` | 서버에 설정된 총 HTTP 연결 수입니다(.NET Core만 해당). | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.current` | 서버의 현재 활성 HTTP 연결 수입니다(.NET 코어에만 해당). | N/A |
| `runtime.dotnet.aspnetcore.`<br>`connections.queue_length` | HTTP 서버 연결 대기열의 현재 길이입니다(.NET Core에만 해당). | N/A |

{{% /tab %}}

{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/opentelemetry/mapping/metrics_mapping/
[2]: /ko/opentelemetry/setup/
[3]: https://app.datadoghq.com/integrations
[5]: /ko/tracing/metrics/runtime_metrics/
[7]: https://app.datadoghq.com/dash/integration/256/jvm-metrics