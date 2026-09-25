---
title: Hostname and Tagging
description: Configure consistent host identification and tagging for OpenTelemetry telemetry sent to Datadog.
aliases:
- /opentelemetry/collector_exporter/hostname_tagging
further_reading:
- link: "/opentelemetry/setup/collector_exporter/"
  tag: "Documentation"
  text: "Setting Up the OpenTelemetry Collector"
- link: "/opentelemetry/mapping/hostname/"
  tag: "Documentation"
  text: "Mapping OpenTelemetry Semantic Conventions to Hostnames"
---

{{< img src="opentelemetry/collector_exporter/hostname_tagging.png" alt="Hostname information collected from OpenTelemetry" style="width:100%;" >}}

## Overview

Datadog uses OpenTelemetry resource attributes to match metrics, traces, and logs to hosts. When all telemetry from a host identifies the host the same way, you can correlate signals from that host, and the telemetry inherits the host's tags.

For the hostname resolution order and the full list of supported resource attributes, see [Mapping OpenTelemetry Semantic Conventions to Hostnames][8].

## Hostname recommendations

The right configuration depends on how you send telemetry to Datadog. Find each setup in your telemetry path and follow its section. For example, if a node-level Collector sends telemetry through a gateway, follow the recommendations for both the node-level Collector and the gateway.

| How you send telemetry | Recommendation |
|---|---|
| [OTLP ingestion by the Datadog Agent](#otlp-ingestion-by-the-datadog-agent) | Run an Agent on every host that generates telemetry. Omit hostname attributes, or set them to the Agent hostname. |
| [DDOT Collector exporting directly to Datadog](#ddot-collector-exporting-directly-to-datadog) | DDOT adds the `infraattributes` processor to Datadog Exporter pipelines by default. On hosts, enable `allow_hostname_override`. On Fargate, supply platform resource attributes. |
| [OpenTelemetry Collector exporting to Datadog over OTLP](#opentelemetry-collector-exporting-to-datadog-over-otlp) | Run a Collector on each host or Kubernetes node. Keep the recommended configuration's `resource_detection` processor, and on Kubernetes, its `k8s_attributes` processor. |
| [Direct OTLP intake without a Collector](#direct-otlp-intake-without-a-collector) | Set host or platform resource attributes in your SDK or managed platform before export. |
| [Collector exporting through a gateway](#collector-exporting-through-a-gateway) | Attach host information in the node-level Collector, and keep those resource attributes through the gateway. |
| [Existing configurations using the Datadog Exporter](#existing-configurations-using-the-datadog-exporter) | Run a Collector on each host or Kubernetes node, and configure the same processors as the recommended setup. |

If you're not sure which setup you have, check your configuration in this order and use the first match:

1. **DDOT Collector**: The Datadog Agent runs the embedded Collector, for example with `otelcollector.enabled: true` in `datadog.yaml` or `otelCollector` enabled in the Helm chart or Datadog Operator.
2. **OTLP ingestion by the Datadog Agent**: `datadog.yaml` has an `otlp_config` section, and applications send OTLP to the Agent.
3. **OpenTelemetry Collector over OTLP**: Your Collector configuration exports with the `otlp_http` exporter to an `otlp.<DD_SITE>` endpoint.
4. **Datadog Exporter**: Your Collector configuration lists the `datadog` exporter.
5. **Direct OTLP intake**: Your SDK or platform sends OTLP to a Datadog intake endpoint, without an Agent or Collector.

If telemetry passes through more than one Collector before it reaches Datadog, also follow the [gateway recommendations](#collector-exporting-through-a-gateway).

### OTLP ingestion by the Datadog Agent

Deploy the Datadog Agent on every host that generates OTLP telemetry. Datadog doesn't support sending telemetry from one host to an Agent on another host. For setup instructions, see [OTLP Ingestion by the Datadog Agent][11].

If incoming telemetry has no valid [hostname attributes][8], Datadog uses the Agent hostname. If you set `host.name`, `host.id`, or another hostname attribute, set it to the Agent hostname to avoid duplicate hosts. To override hostname resolution, set the `datadog.host.name` resource attribute to the Agent hostname.

### DDOT Collector exporting directly to Datadog

The DDOT Collector's `infraattributes` processor adds infrastructure attributes and tags to OTLP telemetry. By default, DDOT adds this processor to pipelines that use the Datadog Exporter. The processor needs resource attributes that identify the source container so it can look up infrastructure tags. For supported attributes and troubleshooting steps, see [Infrastructure tags are missing from telemetry][10].

The rest of the configuration depends on whether the DDOT Collector runs on a host.

#### Host-based deployments

This applies to the DDOT Collector as a [Kubernetes DaemonSet][9] and on [Linux][14] and [Windows][15] hosts.

Because the DDOT Collector runs inside the Datadog Agent, hostname attributes on incoming telemetry can resolve to a different name than the Agent hostname. A single node then appears as two hosts. To use the Agent hostname instead, enable `allow_hostname_override`:

```yaml
processors:
  infraattributes:
    allow_hostname_override: true
```

#### Fargate sidecar deployments

This applies to the DDOT Collector on [ECS Fargate][16] and [EKS Fargate][17], where the Datadog Agent runs as a sidecar container in the same task or pod as your application.

Fargate does not support host-based deployments, so the [host-based guidance](#host-based-deployments) does not apply. Instead, supply the platform resource attributes that `infraattributes` needs:

- On ECS Fargate, add the ECS resource detector to your OpenTelemetry SDK to provide the `aws.ecs.task.arn` attribute.
- On EKS Fargate, add the EKS resource detector to your SDK, or add the resource detection processor with the `[env, eks]` detectors to your DDOT Collector configuration. For an example, see the [EKS Fargate installation guide][17].

### OpenTelemetry Collector exporting to Datadog over OTLP

This applies to the [recommended OpenTelemetry Collector setup][21], where the Collector sends telemetry to Datadog with the OTLP HTTP exporter.

Run one Collector on each host or Kubernetes node, and send telemetry to the Collector on the same host or node. The recommended configurations already set up host detection for each environment. If you adapt them, keep these settings:

- **Hosts and VMs**: The `resource_detection` processor with the `system` detector. On a cloud provider, add its detector.
- **Docker**: The Collector cannot detect the host from inside its container. Set `host.name` in the Collector's `OTEL_RESOURCE_ATTRIBUTES` environment variable.
- **Kubernetes**: The `k8s_attributes` and `resource_detection` processors. On non-cloud Kubernetes, set `k8s.node.name` in the Collector's `OTEL_RESOURCE_ATTRIBUTES` environment variable. On cloud Kubernetes, use the detector for your cloud provider instead of the environment variable.

To add host detection to a Collector configuration that doesn't include it, see [Configure hostname processors in the Collector](#collector-configuration).

The recommended setup's `span_metrics` connector uses host attributes as dimensions, so APM trace metrics keep their host tags. If you adapt the configuration, keep all of its dimensions. For details, see [Span metrics connector][24].

The recommended setup does not support serverless or task-based runtimes such as AWS Lambda, ECS Fargate, and EKS Fargate. For those, see [Direct OTLP intake without a Collector](#direct-otlp-intake-without-a-collector).

<div class="alert alert-info">Hostname resource attributes identify telemetry, but they don't add hosts to the <a href="/infrastructure/list/">Infrastructure Host List</a>. The recommended configuration includes the <a href="/opentelemetry/integrations/host_metrics/">host metrics receiver</a>, which populates the Infrastructure Host List. If you remove it, hosts don't appear there. The GKE Autopilot and AKS Automatic example configurations omit it.</div>

### Direct OTLP intake without a Collector

This applies when telemetry goes directly to [Datadog OTLP intake][22], without a Datadog Agent or OpenTelemetry Collector. For example:

- Applications on hosts that export with an OpenTelemetry SDK
- [Serverless platforms][12] such as AWS Lambda, ECS Fargate, Azure Functions, and Cloud Run
- [Managed platforms][13]

Set the resource attributes for your environment before you export telemetry. Turn on your SDK's built-in resource detectors when available, or set the attributes yourself. On serverless and managed platforms, identify workloads with platform resource attributes instead of `host.name`.

If you run the DDOT Collector as a sidecar on ECS Fargate or EKS Fargate, see [Fargate sidecar deployments](#fargate-sidecar-deployments) instead.

### Collector exporting through a gateway

This applies to OpenTelemetry Collector gateway deployments and to the [DDOT Collector as a gateway on Kubernetes][18].

In a gateway deployment, the Collector that exports to Datadog does not run on the host that produced the telemetry. If telemetry reaches the gateway without host information, telemetry from many hosts can collapse onto the gateway's hostname, or each gateway pod can register as its own host.

Attach host information in the node-level Collector. Then configure the gateway to keep those resource attributes instead of detecting them again.

- **OpenTelemetry Collector**: On Kubernetes, add the `k8s_attributes` processor in passthrough mode and the `resource_detection` processor to the node-level Collector. On cloud Kubernetes, use the detector for your cloud provider. See the **Kubernetes DaemonSet -> Gateway** example in [Configure hostname processors in the Collector](#collector-configuration).
- **DDOT Collector**: Keep the `infraattributes` processor in the DaemonSet configuration, as shown in the [DDOT gateway installation guide][18].

If a gateway deployment reports the wrong host, see [Gateway collector not forwarding host metadata][19].

### Existing configurations using the Datadog Exporter

This applies to existing [OpenTelemetry Collector configurations with the Datadog Exporter][20]. For new Collector configurations, use the [recommended OpenTelemetry Collector setup][21].

Run a Collector on each host or Kubernetes node, and configure host detection the same way as the [recommended setup](#opentelemetry-collector-exporting-to-datadog-over-otlp). The [processor examples](#collector-configuration) on this page work with the Datadog Exporter. For a complete Datadog Exporter example on Amazon EKS, see [`k8s-values.yaml`][4].

If your Collector forwards to a gateway, also follow the [gateway recommendations](#collector-exporting-through-a-gateway).

## Diagnose hostname issues

Datadog emits the `datadog.apm.hostname_issue` gauge when an APM trace hostname is missing, resembles an ephemeral Kubernetes pod, or differs from the hostname reported by the Datadog Agent. This diagnostic metric helps identify hostname configuration problems. It does not affect billing.

A trace has at most one `issue_type`. Use the following table to find the cause and the fix:

| `issue_type` | What it indicates | Recommended action |
|---|---|---|
| `pod_like_gateway_mismatch` | The trace hostname differs from the Agent hostname and resembles a Kubernetes pod name. | Follow the [gateway recommendations](#collector-exporting-through-a-gateway). Attach the Kubernetes node in the node-level Collector, and keep those resource attributes through the gateway. |
| `gateway_hostname_mismatch` | The trace hostname differs from the Agent hostname. | Follow the [gateway recommendations](#collector-exporting-through-a-gateway) and keep hostname resource attributes through the gateway. |
| `empty_hostname` | Datadog did not receive a usable hostname for the trace. | Follow the [recommendation for your setup](#hostname-recommendations) and provide the required host or platform resource attributes. |
| `pod_like_hostname` | The trace hostname resembles an ephemeral Kubernetes pod name. | Configure host detection for [your setup](#hostname-recommendations) so that telemetry identifies the node, host, or platform instead of the pod. |

Available metric tags include `issue_type`, `host`, `env`, `service`, `version`, and `span_source`. Affected spans receive the same `issue_type` tag, which you can use to find example traces and inspect their resource attributes.

The pod-like issue types use common Kubernetes pod naming patterns as a heuristic. After updating your configuration, inspect new traces to confirm that they no longer have the issue type.

## Configure hostname processors in the Collector {#collector-configuration}

Use the [resource detection processor][2] to detect host and cloud attributes, and the [Kubernetes attributes processor][3] to add Kubernetes metadata. Add the processors to your traces, metrics, and logs pipelines. On Kubernetes, list `k8s_attributes` before `resource_detection`. These examples work with both the OTLP HTTP exporter and the Datadog Exporter.

The recommended setup's Host, Docker, and Kubernetes configurations already include these processors. Don't replace them with these examples: the recommended `k8s_attributes` processor also sets `service.name` and other service attributes from pod metadata. Use these examples for gateways, existing Datadog Exporter configurations, and other Collector configurations without host detection.

The component names `resource_detection` and `k8s_attributes` require OpenTelemetry Collector Contrib v0.153.0 or later. Earlier versions use `resourcedetection` and `k8sattributes`. Later versions accept both names.

For complete, tested configurations, see the [recommended OpenTelemetry Collector setup][21].

{{< tabs >}}
{{% tab "Host" %}}

Add the following to your Collector configuration:

```yaml
processors:
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        # Optional: send CPU and OS details to the Infrastructure Host List
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
```

On a cloud provider, add its detector to the start of the `detectors` list:

- Amazon EC2: `[ec2, env, system]`
- Google Cloud: `[gcp, env, system]`
- Azure: `[azure, env, system]`

{{% /tab %}}

{{% tab "Docker" %}}

The Collector cannot detect host information from inside its container. Set `host.name` in the Collector container's `OTEL_RESOURCE_ATTRIBUTES` environment variable (for example, `OTEL_RESOURCE_ATTRIBUTES=host.name=<YOUR_HOST_NAME>`). Then use the `env` detector to read it:

```yaml
processors:
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
```

{{% /tab %}}

{{% tab "Kubernetes DaemonSet" %}}

These examples use the [OpenTelemetry Collector Helm chart][101].

Add the following to `values.yaml`. The service account and cluster role give the `k8s_attributes` processor read access to pod metadata. On non-cloud Kubernetes, `OTEL_RESOURCE_ATTRIBUTES` sets the node name as the host. The Helm chart sets `OTEL_K8S_NODE_NAME`.

```yaml
extraEnvs:
  # Non-cloud Kubernetes only
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: "k8s.node.name=$(OTEL_K8S_NODE_NAME)"
serviceAccount:
  create: true
clusterRole:
  create: true
  rules:
    - apiGroups: [""]
      resources: ["pods", "namespaces", "nodes"]
      verbs: ["get", "watch", "list"]
    - apiGroups: ["apps"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
    - apiGroups: ["extensions"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
```

Don't enable the chart's `kubernetesAttributes` preset with this configuration. The preset adds a second processor named `k8sattributes`.

Add the following to the Collector configuration:

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection
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
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

On a managed Kubernetes distribution, replace the `resource_detection` processor with the variant for your environment, and omit `OTEL_RESOURCE_ATTRIBUTES`. For Amazon EKS, EKS Auto Mode, Google GKE, and Azure AKS variants, see [Managed Kubernetes distributions][102].

[101]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[102]: /opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes DaemonSet -> Gateway" %}}

In the `values.yaml` files for both the DaemonSet and the gateway, add the service account and cluster role shown in the **Kubernetes DaemonSet** tab. Don't enable the chart's `kubernetesAttributes` preset.

DaemonSet:

```yaml
processors:
  k8s_attributes:
    passthrough: true
    auth_type: "serviceAccount"
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

On non-cloud Kubernetes, set `OTEL_RESOURCE_ATTRIBUTES` in the DaemonSet as shown in the **Kubernetes DaemonSet** tab. On a managed Kubernetes distribution, replace the `resource_detection` processor with the variant for your environment from [Managed Kubernetes distributions][201].

In passthrough mode, the DaemonSet's `k8s_attributes` processor adds only the pod IP address. The gateway's `k8s_attributes` processor uses that address to look up pod metadata from the Kubernetes API.

Gateway:

```yaml
processors:
  k8s_attributes:
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

[201]: /opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes Gateway" %}}

Use this configuration when applications send telemetry directly to a gateway, without a DaemonSet Collector. In the gateway's `values.yaml`, add the service account and cluster role shown in the **Kubernetes DaemonSet** tab. Don't enable the chart's `kubernetesAttributes` preset.

Add the following to the Collector configuration:

```yaml
processors:
  k8s_attributes:
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

{{% /tab %}}
{{< /tabs >}}

### Data collected

The following table lists resource attributes that these processors can add. The **Datadog tag** column shows the tag that Datadog creates from the attribute, where one exists.

{{% collapse-content title="Resource attributes and Datadog tags" level="p" %}}

| OpenTelemetry attribute | Datadog tag | Processor |
|---|---|---|
| `host.arch` |  | `resource_detection` (`system`) |
| `host.name` |  | `resource_detection` (`system` or cloud detector) |
| `host.id` |  | `resource_detection` (cloud detector) |
| `host.cpu.vendor.id` |  | `resource_detection` (`system`) |
| `host.cpu.family` |  | `resource_detection` (`system`) |
| `host.cpu.model.id` |  | `resource_detection` (`system`) |
| `host.cpu.model.name` |  | `resource_detection` (`system`) |
| `host.cpu.stepping` |  | `resource_detection` (`system`) |
| `host.cpu.cache.l2.size` |  | `resource_detection` (`system`) |
| `os.description` |  | `resource_detection` (`system`) |
| `os.type` |  | `resource_detection` (`system`) |
| `cloud.provider` | `cloud_provider` | `resource_detection` (cloud detector) |
| `cloud.platform` |  | `resource_detection` (cloud detector) |
| `cloud.account.id` |  | `resource_detection` (cloud detector) |
| `cloud.region` | `region` | `resource_detection` (cloud detector) |
| `cloud.availability_zone` | `zone` | `resource_detection` (cloud detector) |
| `host.type` |  | `resource_detection` (cloud detector) |
| `gcp.gce.instance.hostname` |  | `resource_detection` (`gcp`) |
| `gcp.gce.instance.name` |  | `resource_detection` (`gcp`) |
| `k8s.cluster.name` | `kube_cluster_name` | `resource_detection` (cloud Kubernetes detector) |
| `host.image.id` |  | `resource_detection` (`ec2`) |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` | `resource_detection` (`ecs`) |
| `aws.ecs.task.arn` | `task_arn` | `resource_detection` (`ecs`) |
| `aws.ecs.task.family` | `task_family` | `resource_detection` (`ecs`) |
| `aws.ecs.task.revision` | `task_version` | `resource_detection` (`ecs`) |
| `aws.ecs.launchtype` |  | `resource_detection` (`ecs`) |
| `aws.log.group.names` |  | `resource_detection` (`ecs`) |
| `aws.log.group.arns` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.names` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.arns` |  | `resource_detection` (`ecs`) |
| `azure.vm.name` |  | `resource_detection` (`azure`) |
| `azure.vm.size` |  | `resource_detection` (`azure`) |
| `azure.vm.scaleset.name` |  | `resource_detection` (`azure`) |
| `azure.resourcegroup.name` |  | `resource_detection` (`azure`) |
| `k8s.namespace.name` | `kube_namespace` | `k8s_attributes` |
| `k8s.pod.name` | `pod_name` | `k8s_attributes` |
| `k8s.pod.uid` |  | `k8s_attributes` |
| `k8s.pod.start_time` |  | `k8s_attributes` |
| `k8s.deployment.name` | `kube_deployment` | `k8s_attributes` |
| `k8s.replicaset.name` | `kube_replica_set` | `k8s_attributes` |
| `k8s.replicaset.uid` |  | `k8s_attributes` |
| `k8s.daemonset.name` | `kube_daemon_set` | `k8s_attributes` |
| `k8s.daemonset.uid` |  | `k8s_attributes` |
| `k8s.statefulset.name` | `kube_stateful_set` | `k8s_attributes` |
| `k8s.statefulset.uid` |  | `k8s_attributes` |
| `k8s.container.name` | `kube_container_name` | `k8s_attributes` |
| `k8s.job.name` | `kube_job` | `k8s_attributes` |
| `k8s.job.uid` |  | `k8s_attributes` |
| `k8s.cronjob.name` | `kube_cronjob` | `k8s_attributes` |
| `k8s.node.name` |  | `k8s_attributes` |
| `container.id` | `container_id` | `k8s_attributes` |
| `container.image.name` | `image_name` | `k8s_attributes` |
| `container.image.tag` | `image_tag` | `k8s_attributes` |

{{% /collapse-content %}}

## Custom tagging

### Custom host tags

#### As OTLP resource attributes

To add custom host tags, set resource attributes with the `datadog.host.tag.` prefix.

In an [OpenTelemetry SDK][5], set them with the `OTEL_RESOURCE_ATTRIBUTES` environment variable:

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.host.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

In the Collector, set them with the resource processor:

```yaml
processors:
  resource:
    attributes:
    - key: datadog.host.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

**Note**: With the Datadog Exporter, custom host tags require the opt-in described in [Infrastructure List Host Information][7].

#### In the Datadog Exporter

For existing configurations with the [Datadog Exporter][20], you can also set custom host tags in the exporter's `host_metadata` section:

```yaml
exporters:
  datadog:
    host_metadata:
      tags: ["team:infra", "<TAG_KEY>:<TAG_VALUE>"]
```

These tags apply only to telemetry whose hostname matches the hostname in the exporter's host metadata. To tag telemetry from any host, use a processor. For all options, see the [example Datadog Exporter configuration][6].

### Host aliases

To set host aliases, set the `datadog.host.aliases` resource attribute. For example, use the transform processor:

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.aliases"], ["alias1", "alias2", "alias3"])
```

**Note**: With the Datadog Exporter, host aliases require the opt-in described in [Infrastructure List Host Information][7].

### Custom container tags

To add custom container tags, set resource attributes with the `datadog.container.tag.` prefix.

In an [OpenTelemetry SDK][5], set them with the `OTEL_RESOURCE_ATTRIBUTES` environment variable:

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.container.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

In the Collector, set them with the resource processor:

```yaml
processors:
  resource:
    attributes:
    - key: datadog.container.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/k8s-values.yaml
[5]: https://opentelemetry.io/docs/languages/js/resources/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: /opentelemetry/mapping/host_metadata/
[8]: /opentelemetry/mapping/hostname/
[9]: /opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/
[10]: /opentelemetry/troubleshooting/#infrastructure-tags-are-missing-from-telemetry
[11]: /opentelemetry/setup/otlp_ingest_in_the_agent/
[12]: /opentelemetry/setup/otlp_ingest/serverless/
[13]: /opentelemetry/setup/otlp_ingest/managed_platforms/
[14]: /opentelemetry/setup/ddot_collector/install/linux/
[15]: /opentelemetry/setup/ddot_collector/install/windows/
[16]: /opentelemetry/setup/ddot_collector/install/ecs_fargate/
[17]: /opentelemetry/setup/ddot_collector/install/eks_fargate/
[18]: /opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
[19]: /opentelemetry/troubleshooting/#gateway-collector-not-forwarding-host-metadata
[20]: /opentelemetry/setup/collector_exporter/datadog_exporter/
[21]: /opentelemetry/setup/collector_exporter/
[22]: /opentelemetry/setup/otlp_ingest/
[24]: /opentelemetry/setup/collector_exporter/#span-metrics-connector
