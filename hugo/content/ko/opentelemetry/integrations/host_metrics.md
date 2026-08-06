---
aliases:
- /ko/opentelemetry/collector_exporter/host_metrics/
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: 설명서
  text: OpenTelemetry 컬렉터(Collector) 설정
title: \u0008호스트 메트릭
---

## 개요

{{< img src="/opentelemetry/collector_exporter/host_metrics.png" alt="OpenTelemetry 호스트 메트릭 대시보드" style="width:100%;" >}}

CPU, 디스크, 메모리 사용량 등의 시스템 메트릭을 수집하려면 컬렉터에서 [호스트 메트릭 수신기][1]를 활성화하세요. 

지원되는 운영 체제를 포함한 자세한 내용은 [호스트 메트릭 수신기][1]에 대한 OpenTelemetry 프로젝트 설명서를 참조하세요.


## 설정

{{< tabs >}}
{{% tab "Host" %}}

컬렉터 설정에 다음 줄을 추가합니다:

```yaml
receivers:
  hostmetrics:
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

메트릭을 수집해야 하는 각 노드에 호스트 메트릭 수신기를 설정합니다. 클러스터의 모든 노드에서 호스트 메트릭을 수집하려면, 호스트 메트릭 수신기를 데몬셋 컬렉터로 배포합니다. 컬렉터 설정에 다음을 추가합니다:

```yaml
receivers:
  hostmetrics:
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

## 수집한 데이터

수집된 호스트 메트릭에 대한 정보는 [OpenTelemetry 메트릭 매핑][2]을 참조하세요.


## 전체 예제 설정

Datadog 내보내기를 사용한 전체 작업 예제 설정은 [`host-metrics.yaml`][3]을 참조하세요.

## 로깅 출력 예시

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
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/host-metrics.yaml