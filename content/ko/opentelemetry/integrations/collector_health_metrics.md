---
aliases:
- /ko/opentelemetry/collector_exporter/collector_health_metrics
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: OpenTelemetry 설정 컬렉터(Collector)
title: 서비스 상태 메트릭
---

## 개요

{{< img src="/opentelemetry/collector_exporter/collector_health_metrics.png" alt="OpenTelemetry 컬렉터 서비스 상태 메트릭 대시보드" style="width:100%;" >}}

OpenTelemetry 컬렉터 자체에서 서비스 상태 메트릭을 수집하려면, Datadog 탐색기에서 [Prometheus 리시버][1]를 설정합니다.

자세한 내용을 확인하려면 [Prometheus 리시버][1]용  OpenTelemetry 프로젝트 설명서를 참조하세요.

## 설정

컬렉터(Collector) 설정에 다음 줄을 추가합니다.

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
      - job_name: 'otelcol'
        scrape_interval: 10s
        static_configs:
        - targets: ['0.0.0.0:8888']
```

## 수집한 데이터

| OpenTelemetry 메트릭 | 설명 |
|---|---|
| `otelcol_process_uptime` | 프로세스 업타임 |
| `otelcol_process_memory_rss` | 물리적 메모리 총량(레지던트 세트 크기) |
| `otelcol_exporter_queue_size` | 재시도 대기열의 현재 크기(일괄 처리) |
| `otelcol_exporter_sent_spans` | 대상에게 전송 완료된 스팬(span) 개수 |
| `otelcol_exporter_send_failed_metric_points` | 대상에게 전송 실패한 메트릭 포인트 개수 |
| `otelcol_exporter_send_failed_spans` | 대상에게 전송 실패한 스팬(span) 개수 |
| `otelcol_process_cpu_seconds` | CPU 사용자 및 시스템 시간 총계(초) |
| `otelcol_receiver_refused_spans` | 파이프라인으로 푸시할 수 없는 스팬(span)의 개수 |
| `otelcol_exporter_queue_capacity` | 재시도 대기열의 고정 수용량(일괄 처리) |
| `otelcol_receiver_accepted_spans` | 파이프라인으로 푸시한 스팬(span)의 개수 |
| `otelcol_exporter_sent_metric_points` | 대상에게 전송 완료된 메트릭 포인트 개수 |
| `otelcol_exporter_enqueue_failed_spans` | 전송 대기열에 추가 실패한 스팬(span)의 개수 |
| `otelcol_scraper_errored_metric_points` | 스크랩에 실패한 메트릭 포인트 개수 |
| `otelcol_scraper_scraped_metric_points` | 스크랩 완료한 메트릭 포인트 개수 |
| `otelcol_receiver_refused_metric_points` | 파이프라인으로 푸시할 수 없는 메트릭 포인트 개수 |
| `otelcol_receiver_accepted_metric_points` | 파이프라인으로 푸시한 메트릭 포인트 개수 |
| `otelcol_process_runtime_heap_alloc_bytes` | 할당된 힙(heap) 오브젝트 바이트('go doc runtime.MemStats.HeapAlloc' 참조) |
| `otelcol_process_runtime_total_alloc_bytes` | 힙 객체에 할당된 누적 바이트('go doc runtime.MemStats.TotalAlloc' 참조) |
| `otelcol_exporter_enqueue_failed_log_records` | 전송 대기열에 추가 실패한 로그 레코드 개수 |
| `otelcol_processor_batch_timeout_trigger_send` | 시간 초과 트리거로 인해 배치가 전송된 횟수 |
| `otelcol_exporter_enqueue_failed_metric_points` | 전송 대기열에 추가 실패한 메트릭 포인트 개수 |
| `otelcol_process_runtime_total_sys_memory_bytes` | OS에서 확보한 메모리 바이트 총계([ `runtime.MemStats.Sys`][3]의 Go 문서 참조) |
| `otelcol_processor_batch_batch_size_trigger_send` | 사이즈 트리거로 인해 배치가 전송된 횟수 |
| `otelcol_exporter_sent_log_records` | 대상에게 전송 완료된 로그 레코드 개수 |
| `otelcol_receiver_refused_log_records` | 파이프라인으로 푸시할 수 없는 로그 레코드 개수 |
| `otelcol_receiver_accepted_log_records` | 파이프라인으로 푸시한 로그 레코드 개수 |


## 전체 예제 설정

Datadog 내보내기를 사용한 전체 작업 예제 설정을 확인하려면 [`collector-metrics.yaml`][2]을 참조하세요.

## 로깅 출력 예시

```
ResourceMetrics #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> service.name: Str(opentelemetry-collector)
     -> net.host.name: Str(192.168.55.78)
     -> service.instance.id: Str(192.168.55.78:8888)
     -> net.host.port: Str(8888)
     -> http.scheme: Str(http)
     -> k8s.pod.ip: Str(192.168.55.78)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-0368add8e328c28f7)
     -> host.image.id: Str(ami-08a2e6a8e82737230)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-53-115.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.pod.name: Str(opentelemetry-collector-agent-gqwm8)
     -> k8s.daemonset.name: Str(opentelemetry-collector-agent)
     -> k8s.daemonset.uid: Str(6d6fef61-d4c7-4226-9b7b-7d6b893cb31d)
     -> k8s.node.name: Str(ip-192-168-53-115.ec2.internal)
     -> kube_app_name: Str(opentelemetry-collector)
     -> kube_app_instance: Str(opentelemetry-collector)
     -> k8s.namespace.name: Str(otel-staging)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:23Z)
     -> k8s.pod.uid: Str(988d1bdc-5baf-4e98-942f-ab026a371daf)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/prometheusreceiver 0.88.0-dev
Metric #0
Descriptor:
     -> Name: otelcol_otelsvc_k8s_namespace_added
     -> Description: Number of namespace add events received
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
Data point attributes:
     -> service_instance_id: Str(d80d11f9-aa84-4e16-818d-3e7d868c0cfe)
     -> service_name: Str(otelcontribcol)
     -> service_version: Str(0.88.0-dev)
StartTimestamp: 1970-01-01 00:00:00 +0000 UTC
Timestamp: 2023-11-20 13:17:36.881 +0000 UTC
Value: 194151496.000000
Metric #9
Descriptor:
     -> Name: otelcol_receiver_accepted_spans
     -> Description: Number of spans successfully pushed into the pipeline.
     -> Unit: 
     -> DataType: Sum
     -> IsMonotonic: true
     -> AggregationTemporality: Cumulative
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector-metrics.yaml
[3]: https://pkg.go.dev/runtime#MemStats.Sys