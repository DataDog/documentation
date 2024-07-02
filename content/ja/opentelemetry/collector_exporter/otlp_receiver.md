---
title: OTLP Receiver
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentation
  text: Setting Up the OpenTelemetry Collector
- link: /opentelemetry/otlp_ingest_in_the_agent/
  tag: Documentation
  text: OTLP Ingestion by the Datadog Agent
---

## Overview

To collect OTLP metrics, logs, and traces, configure the [OTLP receiver][1] in your Collector.

For more information, see the OpenTelemetry project documentation for the [OTLP receiver][1].

## セットアップ

Add the following lines to your Collector configuration:

```yaml
receivers:
  otlp:
   protocols:
      http:
       endpoint: "localhost:4318"
      grpc:
       endpoint: "localhost:4317"
```

## データ収集

Traces, metrics, and logs.

## Full example configuration

For a full working example configuration with the Datadog exporter, see [`otlp.yaml`][2].

## Example logging output

```
ResourceSpans #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> k8s.node.name: Str(ip-192-168-61-208.ec2.internal)
     -> process.command_args: Slice(["/app/shippingservice"])
     -> k8s.namespace.name: Str(otel-gateway)
     -> process.pid: Int(1)
     -> service.name: Str(shippingservice)
     -> service.namespace: Str(opentelemetry-demo)
     -> os.type: Str(linux)
     -> k8s.pod.ip: Str(192.168.57.77)
     -> deployment.environment: Str(otel-gateway)
     -> service.instance.id: Str(82323d5f-0e47-4ae6-92b6-583dc1fa33a1)
     -> k8s.pod.name: Str(opentelemetry-demo-shippingservice-7f9b565549-4p2pj)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-0e0b580bbe11883dc)
     -> host.image.id: Str(ami-06f28e19c3ba73ef7)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-61-208.ec2.internal)
     -> k8s.pod.start_time: Str(2023-11-13T15:03:50Z)
     -> k8s.replicaset.uid: Str(537d3c30-fe3d-4999-be1a-51227c90a5e4)
     -> kube_app_name: Str(opentelemetry-demo-shippingservice)
     -> kube_app_instance: Str(opentelemetry-demo)
     -> k8s.pod.uid: Str(82323d5f-0e47-4ae6-92b6-583dc1fa33a1)
     -> k8s.replicaset.name: Str(opentelemetry-demo-shippingservice-7f9b565549)
     -> kube_app_component: Str(shippingservice)
ScopeSpans #0
ScopeSpans SchemaURL: 
InstrumentationScope opentelemetry-otlp 0.11.0
Span #0
    Trace ID       : c4f6d4a8831a5d7b95727da5443ad8a4
    Parent ID      : c7e98372030f17b1
    ID             : f226428843050d12
    Name           : reqwest-http-client
    Kind           : Client
    Start time     : 2023-11-20 12:56:26.401728438 +0000 UTC
    End time       : 2023-11-20 12:56:26.403518138 +0000 UTC
    Status code    : Unset
    Status message : 
Attributes:
     -> http.host: Str(opentelemetry-demo-quoteservice)
     -> http.url: Str(http://opentelemetry-demo-quoteservice:8080/getquote)
     -> http.status_code: Int(200)
     -> thread.name: Str(tokio-runtime-worker)
     -> busy_ns: Int(199789)
     -> code.namespace: Str(reqwest_tracing::reqwest_otel_span_builder)
     -> code.lineno: Int(128)
     -> thread.id: Int(3)
     -> http.method: Str(POST)
     -> http.user_agent: Str()
     -> idle_ns: Int(1588692)
     -> code.filepath: Str(/usr/local/cargo/registry/src/github.com-1ecc6299db9ec823/reqwest-tracing-0.4.0/src/reqwest_otel_span_builder.rs)
     -> net.host.port: Str(8080)
     -> http.scheme: Str(http)
ResourceMetrics #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> service.name: Str(opentelemetry-collector)
     -> net.host.name: Str(192.168.38.72)
     -> service.instance.id: Str(192.168.38.72:8888)
     -> net.host.port: Str(8888)
     -> http.scheme: Str(http)
     -> k8s.pod.ip: Str(192.168.38.72)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-0fb30793f89bd81ab)
     -> host.image.id: Str(ami-0cbbb5a8c6f670bb6)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-37-51.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.pod.uid: Str(01f039fa-abf3-4ab1-8683-923dcf94b391)
     -> k8s.namespace.name: Str(otel-ds-gateway)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:40Z)
     -> k8s.daemonset.uid: Str(694b994d-3488-418a-9f94-284792f1f8da)
     -> k8s.daemonset.name: Str(opentelemetry-collector-agent)
     -> k8s.node.name: Str(ip-192-168-37-51.ec2.internal)
     -> kube_app_name: Str(opentelemetry-collector)
     -> kube_app_instance: Str(opentelemetry-collector)
     -> k8s.pod.name: Str(opentelemetry-collector-agent-4dm92)
ScopeMetrics #0
ScopeMetrics SchemaURL: 
InstrumentationScope otelcol/prometheusreceiver 0.88.0-dev
Metric #0
Descriptor:
     -> Name: otelcol_exporter_queue_capacity
     -> Description: Fixed capacity of the retry queue (in batches)
     -> Unit: 
     -> DataType: Gauge
NumberDataPoints #0
Data point attributes:
     -> exporter: Str(otlp)
     -> service_instance_id: Str(ab73126a-0eff-4678-922d-a96b1fdabcdc)
     -> service_name: Str(otelcontribcol)
     -> service_version: Str(0.88.0-dev)
StartTimestamp: 1970-01-01 00:00:00 +0000 UTC
Timestamp: 2023-11-20 13:01:26.074 +0000 UTC
Value: 1000.000000

ResourceLog #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> k8s.container.name: Str(loadgenerator)
     -> k8s.namespace.name: Str(otel-staging)
     -> k8s.pod.name: Str(opentelemetry-demo-loadgenerator-d8c4d699d-ztt98)
     -> k8s.container.restart_count: Str(1)
     -> k8s.pod.uid: Str(92bf09ed-0db9-4f69-a9d6-1dadf12e01aa)
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
     -> k8s.daemonset.uid: Str(6d6fef61-d4c7-4226-9b7b-7d6b893cb31d)
     -> k8s.daemonset.name: Str(opentelemetry-collector-agent)
     -> k8s.node.name: Str(ip-192-168-53-115.ec2.internal)
     -> kube_app_name: Str(opentelemetry-collector)
     -> kube_app_instance: Str(opentelemetry-collector)
     -> k8s.pod.start_time: Str(2023-11-20T12:53:23Z)
ScopeLogs #0
ScopeLogs SchemaURL: 
InstrumentationScope  
LogRecord #0
ObservedTimestamp: 2023-11-20 13:02:04.332021519 +0000 UTC
Timestamp: 2023-11-20 13:01:46.095736502 +0000 UTC
SeverityText: 
SeverityNumber: Unspecified(0)
Body: Str( return wrapped_send(self, request, **kwargs))
Attributes:
     -> log.file.path: Str(/var/log/pods/otel-staging_opentelemetry-demo-loadgenerator-d8c4d699d-ztt98_92bf09ed-0db9-4f69-a9d6-1dadf12e01aa/loadgenerator/1.log)
     -> time: Str(2023-11-20T13:01:46.095736502Z)
     -> logtag: Str(F)
     -> log.iostream: Str(stderr)
Trace ID: 
Span ID: 
Flags: 0
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/otlp.yaml