---
title: Configure Autodiscovery with the DatadogInstrumentation CRD
description: Configure Autodiscovery checks and logs for Kubernetes workloads through the DatadogInstrumentation custom resource instead of pod annotations.
further_reading:
- link: "/containers/kubernetes/integrations/"
  tag: "Documentation"
  text: "Configure integrations with Autodiscovery"
- link: "/getting_started/containers/autodiscovery/"
  tag: "Documentation"
  text: "Getting Started with Autodiscovery"
- link: "/containers/guide/autodiscovery-examples/"
  tag: "Documentation"
  text: "Autodiscovery scenarios and examples"
- link: "/containers/cluster_agent/"
  tag: "Documentation"
  text: "Datadog Cluster Agent"
---

## Overview

The `DatadogInstrumentation` custom resource (CR) lets you configure [Autodiscovery][1] checks and logs for specific Kubernetes workloads through a single Kubernetes resource, instead of [pod annotations][2]. With this approach, you can enable, update, and roll back integration configurations without editing pod specs or triggering Agent or application rollouts.

Use the `DatadogInstrumentation` CR when you want to:

- Configure Autodiscovery checks and logs without modifying workload manifests or adding annotations.
- Use a structured resource spec with validation instead of raw JSON in annotations.
- Centrally manage per-workload Autodiscovery configuration as a dedicated, version-controlled Kubernetes resource.
- Update or remove Autodiscovery configuration without restarting your application pods.

The configuration is reconciled by a controller in the [Datadog Cluster Agent][3]. When you create or update a `DatadogInstrumentation` resource, the Cluster Agent validates the target, reports resource status, and applies the Autodiscovery configuration to the targeted workload.

## Requirements

- Datadog Agent and Cluster Agent v7.82 or later.

To install the CRD and enable the controller, use one of the following:

- Datadog Operator v1.29 or later.
- Datadog Helm chart v2.223.0 or later.

## Enable the controller

The `DatadogInstrumentation` controller runs in the Cluster Agent and is disabled by default. Enable it with the Datadog Operator or Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Opt in by adding the `agent.datadoghq.com/instrumentation-crd-enabled` annotation to your `DatadogAgent` resource. The Cluster Agent must be v7.82.0 or later.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/instrumentation-crd-enabled: "true"
spec:
  global:
    [...]
```

Apply the change:

```shell
kubectl apply -f datadog-agent.yaml
```

The Operator sets the required Cluster Agent and Node Agent environment variables, and configures the required RBAC for the Cluster Agent automatically.

{{% /tab %}}
{{% tab "Helm" %}}

In your `datadog-values.yaml` file, enable the controller:

```yaml
datadog:
  instrumentationCrd:
    enabled: true
```

Upgrade your release:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

Make sure the `DatadogInstrumentation` CRD is installed before creating resources:

```shell
kubectl get crd datadoginstrumentations.datadoghq.com
```

If you manage Datadog CRDs separately, install or upgrade the Datadog CRDs Helm chart:

```shell
helm upgrade --install datadog-crds datadog/datadog-crds
```

## Configure a workload

A `DatadogInstrumentation` resource has three main parts:

- `spec.targetRef`: identifies the workload to configure, by `apiVersion`, `kind`, and `name`. The resource and the target workload must be in the same namespace.
- `spec.config.checks`: defines integration checks to run against your workload.
- `spec.config.logs`: defines logs to collect from your workload.

You can target the following Kubernetes resources:

- Deployment
- DaemonSet
- StatefulSet
- CronJob
- Job
- Service. Service targets schedule endpoint checks. See [Service targets](#service-targets).

This example configures a [Redis integration][4] for a `Deployment` named `redis`, including log collection. It mirrors this [annotation-based example][2], using the same [template variables][5], including `%%host%%`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_TARGETS_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: redis
  config:
    checks:
      - integration: redisdb
        containerName: redis
        initConfig: {}
        instances:
          - host: "%%host%%"
            port: "6379"
            password: "%%env_REDIS_PASSWORD%%"
    logs:
      - containerName: redis
        tags:
          - env:demo
```

Apply the resource:

```shell
kubectl apply -f redis-instrumentation.yaml
```

Check the resource status:

```shell
kubectl describe datadoginstrumentation <YOUR_CR_NAME> -n <YOUR_TARGETS_NAMESPACE>
```

Each entry in `checks` accepts the following fields:

`integration`
: Required. The name of the Datadog integration to run, for example `redisdb`.

`containerName`
: Optional. For workload targets, use the pod container name to apply the check to a specific container. Not used for Service targets.

`initConfig`
: Optional. The `init_config` section for the integration.

`instances`
: Optional. Check instance settings. Each instance can use [Autodiscovery template variables][5], including `%%host%%`.

Each entry in `logs` accepts the same log collection configuration options as Autodiscovery log annotations, such as `source`, `service`, `tags`, `type`, `path`, and `log_processing_rules`. Each log entry also requires `containerName`, which must match the pod container name.

### Service targets

To configure an [endpoint check][6], set `targetRef` to a `Service`. Service targets behave the same way as endpoint checks configured with Kubernetes service annotations:

- Datadog schedules one endpoint check for each endpoint of the Service.
- `%%host%%` resolves to the endpoint IP.
- If an endpoint is backed by a Kubernetes Pod, Datadog adds the Pod tags collected for that Pod.
- If an endpoint is not backed by a Pod, Datadog converts the check into a regular cluster check without Pod-specific tags.

Service targets do not use `containerName`; omit that field.

Example: configure NGINX for endpoints behind a `Service` named `nginx`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_SERVICES_NAMESPACE>
spec:
  targetRef:
    apiVersion: v1
    kind: Service
    name: nginx
  config:
    checks:
      - integration: nginx
        initConfig: {}
        instances:
          - name: "My NGINX Service Endpoints"
            nginx_status_url: "http://%%host%%:%%port%%/status/"
```

## Precedence

When more than one configuration source applies to a workload, Datadog resolves them in the following order (highest precedence first):

1. Pod annotations
2. `DatadogInstrumentation` resources
3. Static configuration, such as auto-configuration or mounted files

If a workload already has annotation-based Autodiscovery configuration for a check or log collection, your `DatadogInstrumentation` configuration does not override it.

## One resource per target

A workload or Service can be the target of only one `DatadogInstrumentation` resource within a namespace. A validation webhook rejects a resource whose `targetRef` already belongs to another resource, or whose `targetRef` points to an unsupported kind.

## Verify scheduled checks

The resource status shows whether the Cluster Agent accepted the configuration. To verify that the checks are scheduled, run `agent configcheck` on the Node Agent where the target workload runs.

Checks configured through a `DatadogInstrumentation` resource list `instrumentation-checks` as the configuration provider, and `datadoginstrumentation:<NAMESPACE>/<CR_NAME>` as the configuration source. The following example shows the output for a `redisdb` check scheduled from a resource that targets a Redis workload:

```text
> agent configcheck
# other configs...

=== redisdb check ===
Configuration provider: instrumentation-checks
Configuration source: datadoginstrumentation:cache/redis-instrumentation
Config for instance ID: redisdb:d5dd267b580bc10e
host: 10.244.0.7
password: "********"
port: 6379
tags:
  - container_id:86fd26bd7ee8c8cd1864103b2a575cdac0d23b1d0961085c000cb96d0f4a2cc9
  - container_name:redis
  - display_container_name:redis_redis-6b4c7b565b-6dhfh
  - env:staging
  - image_id:********@sha256:0a972391db0b24ec336e35d1bc98b237237e26f82bf5120cf2f6b1688d1df973
  - image_name:redis
  - image_tag:latest
  - kube_container_name:redis
  - kube_deployment:redis
  - kube_namespace:cache
  - kube_ownerref_kind:replicaset
  - kube_ownerref_name:redis-6b4c7b565b
  - kube_qos:BestEffort
  - kube_replica_set:redis-6b4c7b565b
  - kube_service:redis
  - pod_name:redis-6b4c7b565b-6dhfh
  - pod_phase:running
  - service:redis
  - short_image:redis
~
Init Config:
{}
Log Config:
- service: redis
  source: redis
Auto-discovery IDs:
* redis
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/containers/autodiscovery/
[2]: /containers/kubernetes/integrations/
[3]: /containers/cluster_agent/
[4]: /integrations/redisdb/
[5]: /containers/guide/template_variables/
[6]: /containers/cluster_agent/endpointschecks/
