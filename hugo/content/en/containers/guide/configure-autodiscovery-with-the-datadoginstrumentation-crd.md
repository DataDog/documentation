---
title: Configure Autodiscovery with DatadogInstrumentation CRD
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

The `DatadogInstrumentation` custom resource (CR) lets you configure [Autodiscovery][1] checks and logs with a single Kubernetes resource instead of [pod annotations][2]. With this approach, you can enable, update, and remove integration configurations without editing your Agent or application and triggering a rollout.

Use the `DatadogInstrumentation` CR when you want to:

- Configure checks and logs without modifying workload manifests or adding annotations.
- Use a structured resource spec with validation instead of raw JSON in annotations.
- Centrally manage per-workload Autodiscovery configuration as a dedicated, version-controlled Kubernetes resource.
- Update or remove Autodiscovery configuration without restarting your application pods.

When you create or update a `DatadogInstrumentation` resource, the [Datadog Cluster Agent][3] validates the target, reports resource status, and applies the Autodiscovery configuration to the targeted workload.

## Requirements

Upgrade to  **v7.82+**  of the Datadog Agent and Cluster Agent and install the `DatadogInstrumentation` CRD with one of the following:
- Datadog Operator **v1.29** or later.
- Datadog Helm chart **v3.236.0** or later.

## Setup

The `DatadogInstrumentation` controller runs in the Cluster Agent and is disabled by default. Enable it with the Datadog Operator or Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Update your Helm repositories:

```shell
helm repo update
```

2. Upgrade the Datadog Operator:

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

3. Add the `agent.datadoghq.com/instrumentation-crd-enabled` annotation to your `DatadogAgent` resource. The Cluster Agent must be v7.82.0 or later.

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

4. Apply the change:

```shell
kubectl apply -f datadog-agent.yaml
```

The Operator sets the required Cluster Agent and Node Agent environment variables, and configures the required RBAC for the Cluster Agent automatically.

{{% /tab %}}
{{% tab "Helm" %}}

1. Update your Helm repositories:

```shell
helm repo update
```

2. In your `datadog-values.yaml` file, enable the controller:

```yaml
datadog:
  instrumentationCrd:
    enabled: true
```

3. Upgrade your release:

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

## Target workloads

`DatadogInstrumentation` (DDI) for Autodiscovery has three parts:

- `spec.targetRef`: identifies the workload to configure, by `apiVersion`, `kind`, and `name`. Your custom resource and target workload must be in the same namespace.
- `spec.config.checks`: defines integration checks to run against your workload.
- `spec.config.logs`: defines logs to collect from your workload.

You can target the following Kubernetes resources:

| Target | Group/version/resource | Minimum Agent version | Notes |
|---|---|---|---|
| Deployment | `apps/v1/deployments` | 7.82.0 | |
| DaemonSet | `apps/v1/daemonsets` | 7.82.0 | |
| StatefulSet | `apps/v1/statefulsets` | 7.82.0 | |
| CronJob | `batch/v1/cronjobs` | 7.82.0 | |
| Job | `batch/v1/jobs` | 7.82.0 | |
| Service | `core/v1/services` | 7.82.0 | Supports checks only. See [Service targets](#service-targets). |
| Rollout | `argoproj.io/v1alpha1/rollouts` | 7.83.0 | Requires [Argo Rollouts][7]. |

This example configures a [Redis integration][4] for a `StatefulSet` named `redis`, mirroring this [annotation-based example][2].

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_TARGETS_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
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
: Required for workload targets. The value must match a container name in the pod. Omit this field for Service targets.

`initConfig`
: Optional. The `init_config` section for the integration.

`instances`
: Optional. Check instance settings. Each instance can use [Autodiscovery template variables][5], including `%%host%%`.

Each entry in `logs` accepts the same log collection options as Autodiscovery log annotations, such as `tags`, `type`, and `path`. Each entry requires a `containerName` matching a container in the pod.

### Target Services

Targeting a `Service` configures an [endpoint check][6] similar to an annotation on a Kubernetes service.

- Datadog schedules one endpoint check for each endpoint of the Service.
- `%%host%%` resolves to the endpoint IP.
- If an endpoint is backed by a Kubernetes Pod, Datadog adds the Pod tags collected for that Pod.
- If an endpoint is not backed by a Pod, Datadog converts the check into a regular cluster check without Pod-specific tags.

<div class="alert alert-info">

Service targets do not use `containerName`; omit that field.

</div>

Below is an example configuring a nginx check against a Kubernetes `Service`:

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

When more than one configuration source applies to a workload, the Datadog Agent resolves them in the following order (highest precedence first):

1. Pod annotations
2. `DatadogInstrumentation` custom resource
3. Static configuration, such as auto-configuration or mounted files

If a workload already has annotation-based Autodiscovery configuration for a check or log collection, your `DatadogInstrumentation` configuration does not override it.

## One resource per target

A workload or Service can be the target of only one `DatadogInstrumentation` resource within a namespace. A validation webhook rejects a resource whose `targetRef` already belongs to another resource, or whose `targetRef` points to an unsupported kind.

## Verify scheduled checks

The resource status shows whether the Cluster Agent accepted the configuration. To verify that the checks are scheduled, run `agent configcheck` on the Node Agent where the target workload runs.

Checks configured through a `DatadogInstrumentation` resource list `instrumentation-checks` as the configuration provider and `datadoginstrumentation:<NAMESPACE>/<CR_NAME>` as the configuration source. The following example shows the output for a `redisdb` check scheduled from a resource that targets a Redis workload:

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
Init Config:
{}
Log Config:
- tags:
  - env:demo
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
[7]: https://argoproj.github.io/rollouts/
