---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
title: ホストメトリクス
---

## 概要

{{< img src="/opentelemetry/collector_exporter/host_metrics.png" alt="OpenTelemetry ホストメトリクスダッシュボード" style="width:100%;" >}}

CPU、ディスク、メモリ使用量などのシステムメトリクスを収集するには、Datadog Exporter で[ホストメトリクスレシーバー][1]を有効にします。

サポートされているオペレーティングシステムなどの詳細については、[ホストメトリクスレシーバー][1]の OpenTelemetry プロジェクトのドキュメントを参照してください。


## NoPassword

{{< tabs >}}
{{% tab "ホスト" %}}

Collector の構成に以下の行を追加します。

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

メトリクスを収集する必要がある各ノードでホストメトリクスレシーバーをセットアップします。クラスター内のすべてのノードからホストメトリクスを収集するには、ホストメトリクスレシーバーを DaemonSet コレクターとしてデプロイします。コレクター構成に以下を追加します。

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

## Datadog Operator

収集されたホストメトリクスについては、[OpenTelemetry メトリクスのマッピング][2]を参照してください。


## 完全な構成例

Datadog Exporter を用いた実際に動作する構成の完全な例については、[`host-metrics.yaml`][3] を参照してください。

## ログ出力例

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
[2]: /ja/opentelemetry/guide/metrics_mapping/#host-metrics
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/host-metrics.yaml