---
title: Hostname and Tagging
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentation
  text: Setting Up the OpenTelemetry Collector
---

{{< img src="opentelemetry/collector_exporter/hostname_tagging.png" alt="Hostname information collected from OpenTelemetry" style="width:100%;" >}}

## Overview

To extract the correct hostname and host tags, Datadog Exporter uses the [resource detection processor][2] and the [Kubernetes attributes processor][3]. These processors allow for extracting information from hosts and containers in the form of [resource semantic conventions][1], which is then used to build the hostname, host tags, and container tags. These tags enable automatic correlation among telemetry signals and tag-based navigation for filtering and grouping telemetry data within Datadog.

For more information, see the OpenTelemetry project documentation for the [resource detection][2] and [Kubernetes attributes][3] processors.

## セットアップ

{{< tabs >}}
{{% tab "Host" %}}

Add the following lines to your Collector configuration:

```yaml
processors:
  resourcedetection:
    # bare metal
    detectors: [env, system]
    system:
      resource_attributes:
        os.description:
          enabled: true
        host.arch:
          enabled: true
        host.cpu.vendor.id:
          enabled: true
        host.cpu.family:
          enabled: true
        host.cpu.model.id:
          enabled: true
        host.cpu.model.name:
          enabled: true
        host.cpu.stepping:
          enabled: true
        host.cpu.cache.l2.size:
          enabled: true
    # GCP
    detectors: [env, gcp, system]
    # AWS
    detectors: [env, ecs, ec2, system]
    # Azure
    detectors: [env, azure, system]
    timeout: 2s
    override: false
```

{{% /tab %}}

{{% tab "Kubernetes Daemonset" %}}

Add the following lines to `values.yaml`:
```yaml
presets:
  kubernetesAttributes:
    enabled: true
```

The Helm `kubernetesAttributes` preset sets up the service account necessary for the Kubernetes attributes processor to extract metadata from pods. Read [Important Components for Kubernetes][1] for additional information about the required service account. 

Add the following in the Collector configuration:

```yaml
processors:
  k8sattributes:
        passthrough: false
        auth_type: "serviceAccount"
   pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
        - container.image.name
        - container.image.tag
        - container.id
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
  resourcedetection:
    # remove the ones that you do not use
    detectors: [env, eks, ec2, aks, azure, gke, gce, system]
    timeout: 2s
    override: false
```

[1]: https://opentelemetry.io/docs/kubernetes/collector/components/#kubernetes-attributes-processor
{{% /tab %}}

{{% tab "Kubernetes DaemonSet -> Gateway" %}}

Add the following lines to `values.yaml`:
```yaml
presets:
  kubernetesAttributes:
    enabled: true
```

Use the Helm `k8sattributes` preset in both Daemonset and Gateway, to set up the service account necessary for  `k8sattributesprocessor` to extract metadata from pods. Read [Important Components for Kubernetes][1] for additional information about the required service account. 

DaemonSet:

```yaml
processors:
  k8sattributes:
        passthrough: true
        auth_type: "serviceAccount"
  resourcedetection:
    detectors: [env, <eks/ec2>, <aks/azure>, <gke/gce>, system]
    timeout: 2s
    override: false
```
Because the processor is in passthrough mode in the DaemonSet, it adds only the pod IP addresses. These addresses are then used by the Gateway processor to make Kubernetes API calls and extract metadata.

Gateway:

```yaml
processors:
 k8sattributes:
        passthrough: false
        auth_type: "serviceAccount"
   pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
        - container.image.name
        - container.image.tag
        - container.id
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

[1]: https://opentelemetry.io/docs/kubernetes/collector/components/#kubernetes-attributes-processor
{{% /tab %}}
{{% tab "Kubernetes Gateway" %}}

Add the following lines to `values.yaml`:

```yaml
presets:
  kubernetesAttributes:
    enabled: true
```
The Helm `kubernetesAttributes` preset sets up the service account necessary for the Kubernetes attributes processor to extract metadata from pods. Read [Important Components for Kubernetes][1] for additional information about the required service account. 

Add the following in the Collector configuration:

```yaml
processors:
  k8sattributes:
        passthrough: false
        auth_type: "serviceAccount"
   pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
        - container.image.name
        - container.image.tag
        - container.id
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
  resourcedetection:
    detectors: [env, <eks/ec2>, <aks/azure>, <gke/gce>, system]
    timeout: 2s
    override: false
```

[1]: https://opentelemetry.io/docs/kubernetes/collector/components/#kubernetes-attributes-processor

{{% /tab %}}
{{< /tabs >}}

## データ収集

| OpenTelemetry attribute | Datadog Tag | Processor |
|---|---|---|
| `host.arch` |  | `resourcedetectionprocessor{system}` |
| `host.name` |  | `resourcedetectionprocessor{system,gcp,ec2,azure}` |
| `host.id` |  | `resourcedetectionprocessor{system,gcp,ec2,azure}` |
| `host.cpu.vendor.id` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.family` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.model.id` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.model.name` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.stepping` |  | `resourcedetectionprocessor{system}` |
| `host.cpu.cache.l2.size` |  | `resourcedetectionprocessor{system}` |
| `os.description` |  | `resourcedetectionprocessor{system}` |
| `os.type` |  | `resourcedetectionprocessor{system}` |
| `cloud.provider` | `cloud_provider` | `resourcedetectionprocessor{gcp,ec2,ecs,eks,azure,aks}` |
| `cloud.platform` |  | `"resourcedetectionprocessor{gcp,ec2,ecs,eks,azure,aks}"` |
| `cloud.account.id` |  | `"resourcedetectionprocessor{gcp,ec2,ecs,azure}"` |
| `cloud.region` | `region` | `resourcedetectionprocessor{gcp,ec2,ecs,azure}` |
| `cloud.availability_zone` | `zone` | `resourcedetectionprocessor{gcp,ec2,ecs}` |
| `host.type` |  | `"resourcedetectionprocessor{gcp,ec2}"` |
| `gcp.gce.instance.hostname` |  | `resourcedetectionprocessor{gcp}` |
| `gcp.gce.instance.name` |  | `resourcedetectionprocessor{gcp}` |
| `k8s.cluster.name` | `kube_cluster_name` | `resourcedetectionprocessor{gcp,eks}` |
| `host.image.id` |  | `resourcedetectionprocessor{ec2}` |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` | `k8sattributes` |
| `aws.ecs.task.arn` | `task_arn` | `k8sattributes` |
| `aws.ecs.task.family` | `task_family` | `k8sattributes` |
| `aws.ecs.task.revision` | `task_version` | `k8sattributes` |
| `aws.ecs.launchtype` |  | `k8sattributes` |
| `aws.log.group.names` |  | `k8sattributes` |
| `aws.log.group.arns` |  | `k8sattributes` |
| `aws.log.stream.names` |  | `k8sattributes` |
| `aws.log.stream.arns` |  | `k8sattributes` |
| `azure.vm.name` |  | `k8sattributes` |
| `azure.vm.size` |  | `k8sattributes` |
| `azure.vm.scaleset.name` |  | `k8sattributes` |
| `azure.resourcegroup.name` |  | `k8sattributes` |
| `k8s.cluster.uid` |  | `k8sattributes` |
| `k8s.namespace.name` | `kube_namespace` | `k8sattributes` |
| `k8s.pod.name` | `pod_name` | `k8sattributes` |
| `k8s.pod.uid` |  | `k8sattributes` |
| `k8s.pod.start_time` |  | `k8sattributes` |
| `k8s.deployment.name` | `kube_deployment` | `k8sattributes` |
| `k8s.replicaset.name` | `kube_replica_set` | `k8sattributes` |
| `k8s.replicaset.uid` |  | `k8sattributes` |
| `k8s.daemonset.name` | `kube_daemon_set` | `k8sattributes` |
| `k8s.daemonset.uid` |  | `k8sattributes` |
| `k8s.statefulset.name` | `kube_stateful_set` | `k8sattributes` |
| `k8s.statefulset.uid` |  | `k8sattributes` |
| `k8s.container.name` | `kube_container_name` | `k8sattributes` |
| `k8s.job.name` | `kube_job` | `k8sattributes` |
| `k8s.job.uid` |  | `k8sattributes` |
| `k8s.cronjob.name` | `kube_cronjob` | `k8sattributes` |
| `k8s.node.name` |  | `k8sattributes` |
| `container.id` | `container_id` | `k8sattributes` |
| `container.image.name` | `image_name` | `k8sattributes` |
| `container.image.tag` | `image_tag` | `k8sattributes` |


## Full example configuration

For a full working example configuration with the Datadog exporter, see [`k8s-values.yaml`][4]. This example is for Amazon EKS.

## Example logging output

```
ResourceSpans #0
Resource SchemaURL: https://opentelemetry.io/schemas/1.6.1
Resource attributes:
     -> container.id: Str(0cb82a1bf21466b4189414cf326683d653114c0f61994c73f78d1750b9fcdf06)
     -> service.name: Str(cartservice)
     -> service.instance.id: Str(5f35cd94-1b9c-47ff-bf45-50ac4a998a6b)
     -> service.namespace: Str(opentelemetry-demo)
     -> k8s.namespace.name: Str(otel-gateway)
     -> k8s.node.name: Str(ip-192-168-61-208.ec2.internal)
     -> k8s.pod.name: Str(opentelemetry-demo-cartservice-567765cd64-cbmwz)
     -> deployment.environment: Str(otel-gateway)
     -> k8s.pod.ip: Str(192.168.45.90)
     -> telemetry.sdk.name: Str(opentelemetry)
     -> telemetry.sdk.language: Str(dotnet)
     -> telemetry.sdk.version: Str(1.5.1)
     -> cloud.provider: Str(aws)
     -> cloud.platform: Str(aws_ec2)
     -> cloud.region: Str(us-east-1)
     -> cloud.account.id: Str(XXXXXXXXXX)
     -> cloud.availability_zone: Str(us-east-1c)
     -> host.id: Str(i-09e82186d7d8d7c95)
     -> host.image.id: Str(ami-06f28e19c3ba73ef7)
     -> host.type: Str(m5.large)
     -> host.name: Str(ip-192-168-50-0.ec2.internal)
     -> os.type: Str(linux)
     -> k8s.deployment.name: Str(opentelemetry-demo-cartservice)
     -> kube_app_name: Str(opentelemetry-demo-cartservice)
     -> k8s.replicaset.uid: Str(ddb3d058-6d6d-4423-aca9-0437c3688217)
     -> k8s.replicaset.name: Str(opentelemetry-demo-cartservice-567765cd64)
     -> kube_app_instance: Str(opentelemetry-demo)
     -> kube_app_component: Str(cartservice)
     -> k8s.pod.start_time: Str(2023-11-13T15:03:46Z)
     -> k8s.pod.uid: Str(5f35cd94-1b9c-47ff-bf45-50ac4a998a6b)
     -> k8s.container.name: Str(cartservice)
     -> container.image.name: Str(XXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com/otel-demo)
     -> container.image.tag: Str(v4615c8d7-cartservice)
ScopeSpans #0
ScopeSpans SchemaURL: 
InstrumentationScope Microsoft.AspNetCore 
Span #0
    Trace ID       : fc6794b53df7e44bab9dced42bdfbf7b
    Parent ID      : 2d3ba75ad6a6b1a0
    ID             : f669b0fcd98365b9
    Name           : oteldemo.CartService/AddItem
    Kind           : Server
    Start time     : 2023-11-20 13:37:11.2060978 +0000 UTC
    End time       : 2023-11-20 13:37:11.2084166 +0000 UTC
    Status code    : Unset
    Status message : 
Attributes:
     -> net.host.name: Str(opentelemetry-demo-cartservice)
     -> net.host.port: Int(8080)
     -> http.method: Str(POST)
     -> http.scheme: Str(http)
     -> http.target: Str(/oteldemo.CartService/AddItem)
     -> http.url: Str(http://opentelemetry-demo-cartservice:8080/oteldemo.CartService/AddItem)
     -> http.flavor: Str(2.0)
     -> http.user_agent: Str(grpc-node-js/1.8.14)
     -> app.user.id: Str(e8521c8c-87a9-11ee-b20a-4eaeb9e6ddbc)
     -> app.product.id: Str(LS4PSXUNUM)
     -> app.product.quantity: Int(3)
     -> http.status_code: Int(200)
     -> rpc.system: Str(grpc)
     -> net.peer.ip: Str(::ffff:192.168.36.112)
     -> net.peer.port: Int(36654)
     -> rpc.service: Str(oteldemo.CartService)
     -> rpc.method: Str(AddItem)
     -> rpc.grpc.status_code: Int(0)
```


[1]: https://opentelemetry.io/docs/specs/semconv/resource/
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/k8s-values.yaml
