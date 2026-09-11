---
aliases:
- /ko/opentelemetry/collector_exporter/docker_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: OpenTelemetry 컬렉터(Collector) 설정
title: Docker 메트릭
---

## 개요

{{< img src="/opentelemetry/collector_exporter/docker_metrics.png" alt="컨테이너 도커(Docker) 메트릭에 있는 OpenTelemetry 대시보드" style="width:100%;" >}}

컨테이너 메트릭을 수집하려면, Datadog 내보내기에서 [도커(Docker) 통계 수신기][1]를 설정합니다.

자세한 내용은 [도커(Docker) 통계 수신기][1]에 대한 OpenTelemetry 프로젝트 설명서를 참조하세요.


## 설정

{{< tabs >}}
{{% tab "Host" %}}

도커(Docker) 통계 수신기는 도커(Docker) 소켓에 액세스해야 합니다. 기본적으로 수신기는 `unix:///var/run/docker.sock`에서 도커(Docker) 소켓을 찾습니다. 도커(Docker) 소켓 경로가 아닌 경우 `endpoint` 설정 줄에 경로를 지정합니다.

컬렉터(Collector) 설정에 다음 줄을 추가합니다:

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # (default)
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```
**참고**: 컬렉터(Collector) 도커(Docker) 이미지를 사용하는 경우, ]도커 소켓에 액세스하려면 컬렉터에 대한 추가 권한을 설정해야 할 수 있습니다][1].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/issues/11791

{{% /tab %}}

{{% tab "Kubernetes" %}}

도커(Docker) 통계 수신기는 도커(Docker) 소켓에 액세스해야 합니다. 쿠버네티스(Kubernetes)에서 도커를 런타임으로 실행하는 경우 도커 소켓을 마운트합니다:

`values.yaml` 에 다음 줄을 추가합니다:
```yaml
extraVolumes:
 - name: docker-sock
   hostPath:
     path: /var/run/docker.sock
extraVolumeMounts:
 - name: docker-sock
   mountPath: /var/run/docker.sock
```

컬렉터(Collector) 설정 에 다음을 추가합니다:

```yaml
receivers:
  docker_stats:
    endpoint: unix:///var/run/docker.sock # default
    metrics:
      container.network.io.usage.rx_packets:
        enabled: true
      container.network.io.usage.tx_packets:
        enabled: true
      container.cpu.usage.system:
        enabled: true
      container.memory.rss:
        enabled: true
      container.blockio.io_serviced_recursive:
        enabled: true
      container.uptime:
        enabled: true
      container.memory.hierarchical_memory_limit:
        enabled: true
```

{{% /tab %}}

{{< /tabs >}}

## 수집한 데이터

수집된 컨테이너 메트릭에 대한 정보는 [OpenTelemetry 메트릭 매핑][2]을 참조하세요.


## 전체 예제 설정

Datadog 내보내기를 사용한 전체 작업 예제 설정은 [`docker-stats.yaml`][3]을 참조하세요.

## 로깅 출력 예시

```
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> container.runtime: Str(docker)
     -> container.hostname: Str(be51776e036e)
     -> container.id: Str(be51776e036e04461169fce2847d4e77be3d83856b474ad544143afc3d48e9e5)
     -> container.image.name: Str(sha256:9bdff337981de15f8cdf9e73b24af64a03e2e6dd1f156a274a15c1d8db98ab79)
     -> container.name: Str(redis-otel)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/dockerstatsreceiver 0.89.0-dev
Metric #6
Descriptor:
     -> Name: container.cpu.utilization
     -> Description: Percent of CPU used by the container.
     -> Unit: 1
     -> DataType: Gauge
NumberDataPoints #0
StartTimestamp: 2023-11-20 14:58:17.522765 +0000 UTC
Timestamp: 2023-11-20 14:58:19.550208 +0000 UTC
Value: 0.170933
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver
[2]: /ko/opentelemetry/guide/metrics_mapping/#container-metrics
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/docker-stats.yaml