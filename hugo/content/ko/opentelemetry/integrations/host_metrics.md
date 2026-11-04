---
aliases:
- /ko/opentelemetry/collector_exporter/host_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 문서
  text: OpenTelemetry Collector 설정
title: 호스트 메트릭
---
## 개요 {#overview}

{{< img src="/opentelemetry/collector_exporter/host_metrics.png" alt="OpenTelemetry 호스트 메트릭 대시보드" style="width:100%;" >}}

<div class="alert alert-danger">Datadog Agent와 함께 <a href="/opentelemetry/setup/ddot_collector/">DDOT Collector</a>를 실행하는 경우, 호스트 메트릭 수신기는 필요하지 않습니다. Agent는 이미 호스트 메트릭을 수집합니다.</div>

CPU, 디스크, 메모리 사용량 등의 시스템 메트릭을 수집하려면 컬렉터에서 [호스트 메트릭 수신기][1]를 활성화하세요. 

지원되는 운영 체제를 포함한 자세한 내용은 [호스트 메트릭 수신기][1]에 대한 OpenTelemetry 프로젝트 설명서를 참조하세요.


## 설정 {#setup}

이러한 예시에서는 OpenTelemetry Collector Contrib v0.154.0의 구성 요소 식별자를 사용합니다. 다른 버전이나 배포판의 경우 해당 배포판이 지원하는 식별자를 사용하세요.

{{< tabs >}}
{{% tab "호스트" %}}

Collector 구성에 다음 줄을 추가합니다.

```yaml
receivers:
  host_metrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:

```

{{% /tab %}}

{{% tab "Kubernetes" %}}

메트릭을 수집해야 하는 각 노드에 호스트 메트릭 수신기를 설정합니다. 클러스터의 모든 노드에서 호스트 메트릭을 수집하려면 호스트 메트릭 수신기를 DaemonSet 수집기로 배포합니다. Collector 구성에서 다음을 추가합니다.

```yaml
receivers:
  host_metrics:
    collection_interval: 10s
    scrapers:
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      disk:
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load:
      memory:
      network:
      processes:

```

{{% /tab %}}

{{< /tabs >}}

구성의 메트릭 파이프라인에 있는 `host_metrics` 목록에 `receivers`를 추가합니다. 해당 파이프라인에 이미 있는 프로세서를 유지합니다. Datadog OTLP 메트릭 수집 엔드포인트는 델타 메트릭만 허용하고 호스트 메트릭 수신기는 누적 합계를 생성하므로 파이프라인에는 `cumulativetodelta`가 필요합니다. [권장 Collector 설정][5]에는 해당 프로세서가 포함되어 있습니다.


## 수집된 데이터 {#data-collected}

호스트 메트릭은 [호스트 메트릭 수신기][4]에서 수집합니다. 수신기 설정에 대한 자세한 내용은 [OpenTelemetry Collector 설정][5]을 참조하세요.

Datadog 메트릭에 매핑된 메트릭은 다음 보기에서 사용됩니다.
- [인프라 호스트 맵][6]
- [인프라 목록][7]
- [호스트 기본 대시보드][8]
- [APM 트레이스 보기 호스트 정보][9]

**참고**: 트레이스와 호스트 메트릭을 연관시키려면 각 서비스에 대해 [Unified Service Tagging 속성][10]을 구성하고, 서비스 및 컬렉터 인스턴스 모두에 대해 `host.name` 리소스 속성을 각각에 해당하는 기본 호스트로 설정합니다. 

다음 표에는 Datadog의 기본 제공 인앱 환경에서 사용하기 위해 수집되는 OpenTelemetry 호스트 메트릭이 나열되어 있습니다.

{{< mapping-table resource="host.csv">}}

OpenTelemetry와 Datadog 메트릭 이름 간의 전체 매핑은 [OpenTelemetry 메트릭 매핑][2]을 참조하세요.


## 로깅 출력 예시 {#example-logging-output}

```
ResourceMetrics #1
Resource SchemaURL: https://opentelemetry.io/schemas/1.9.0
Resource attributes:
     -> k8s.pod.ip: Str(192.168.63.232)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-07e7d48cedbec9e86)
     -> host.image.id: Str(ami-0cbbb5a8c6f670bb6)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-49-157.ec2.internal)
     -> os.type: Str(linux)
     -> kube_app_instance: Str(opentelemetry-collector-gateway)
     -> k8s.pod.name: Str(opentelemetry-collector-gateway-688585b95-l2lds)
     -> k8s.pod.uid: Str(d8063a97-f48f-4e9e-b180-8c78a56d0a37)
     -> k8s.replicaset.uid: Str(9e2d5331-f763-43a3-b0be-9d89c0eaf0cd)
     -> k8s.replicaset.name: Str(opentelemetry-collector-gateway-688585b95)
     -> k8s.deployment.name: Str(opentelemetry-collector-gateway)
     -> kube_app_name: Str(opentelemetry-collector)
     -> k8s.namespace.name: Str(otel-ds-gateway)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:08Z)
     -> k8s.node.name: Str(ip-192-168-49-157.ec2.internal)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/hostmetricsreceiver/memory 0.88.0-dev
Metric #0
Descriptor:
     -> Name: system.memory.usage
     -> Description: Bytes of memory in use.
     -> Unit: By
     -> DataType: Sum
     -> IsMonotonic: false
     -> AggregationTemporality: Cumulative
NumberDataPoints #0
Data point attributes:
     -> state: Str(used)
StartTimestamp: 2023-08-21 13:45:37 +0000 UTC
Timestamp: 2023-11-20 13:04:19.489045896 +0000 UTC
Value: 1153183744
```


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[2]: /ko/opentelemetry/guide/metrics_mapping/#host-metrics
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[5]: /ko/opentelemetry/setup/collector_exporter/
[6]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[7]: https://app.datadoghq.com/infrastructure
[8]: /ko/opentelemetry/reference/otel_metrics/#out-of-the-box-dashboards
[9]: /ko/tracing/trace_explorer/trace_view/?tab=hostinfo
[10]: /ko/opentelemetry/correlate/#prerequisite-unified-service-tagging