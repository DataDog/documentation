---
title: Configure Autodiscovery with the DatadogInstrumentation CRD
description: Configure Autodiscovery checks for Kubernetes workloads through the DatadogInstrumentation custom resource instead of pod annotations.
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

<div class="alert alert-info">Configuring Autodiscovery with the <code>DatadogInstrumentation</code> custom resource is in beta.</div>

## Overview

The `DatadogInstrumentation` custom resource (CR) lets you configure [Autodiscovery][1] checks for specific Kubernetes workloads through a single Kubernetes resource, instead of [pod annotations][2]. With this approach, you can enable, update, and roll back integration configurations without editing pod specs or triggering Agent or application rollouts.

Use the `DatadogInstrumentation` CR when you want to:

- Configure Autodiscovery checks without modifying workload manifests or adding annotations.
- Use a structured resource spec with validation instead of raw JSON in annotations.
- Centrally manage per-workload check configuration as a dedicated, version-controlled Kubernetes resource.
- Update or remove check configuration without restarting your application pods.

The configuration is reconciled by a controller in the [Datadog Cluster Agent][3]. When you create or update a `DatadogInstrumentation` resource, the Cluster Agent validates the target, reports resource status, and schedules checks against the targeted workload.

## Requirements

- Datadog Agent and Cluster Agent v7.81 or later.

To install the CRD and enable the controller, use one of the following:

- Datadog Operator v1.28 or later.
- Datadog Helm chart v2.223.0 or later.

## Enable the controller

The `DatadogInstrumentation` controller runs in the Cluster Agent and is disabled by default. Enable it with the Datadog Operator or Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

While the feature is in beta, opt in by adding the `agent.datadoghq.com/instrumentation-crd-enabled` annotation to your `DatadogAgent` resource. The Cluster Agent must be v7.81.0 or later.

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

## Configure a workload check

A `DatadogInstrumentation` resource has two main parts:

- `spec.targetRef`: identifies the workload to configure, by `apiVersion`, `kind`, and `name`. The resource and the target workload must be in the same namespace.
- `spec.config.checks`: defines the Autodiscovery configurations applied to the target.

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
        containerImage:
          - redis
        initConfig: {}
        instances:
          - host: "%%host%%"
            port: "6379"
            password: "%%env_REDIS_PASSWORD%%"
        logs:
          - source: redis
            service: redis_service
```

Apply the resource:

```shell
kubectl apply -f redis-instrumentation.yaml
```

Check the resource status:

```shell
kubectl describe datadoginstrumentation <YOUR_CR_NAME> -n <YOUR_TARGETS_NAMESPACE>
```

Each entry in `checks` accepts the following fields. For workload targets, provide `instances`, `logs`, or both. If neither is provided, the resource is rejected.

`integration`
: Required. The name of the Datadog integration to run, for example `redisdb`.

`containerImage`
: Required for workload targets. Not used for Service targets. A list of container image identifiers to match against the target workload's containers.

`initConfig`
: Optional. The `init_config` section for the integration.

`instances`
: Optional. Check instance settings. Each instance can use [Autodiscovery template variables][5], including `%%host%%`.

`logs`
: Optional. The log collection configuration for the matching containers.

### Service targets

To configure an [endpoint check][6], set `targetRef` to a `Service`. Service targets behave the same way as endpoint checks configured with Kubernetes service annotations:

- Datadog schedules one endpoint check for each endpoint of the Service.
- `%%host%%` resolves to the endpoint IP.
- If an endpoint is backed by a Kubernetes Pod, Datadog adds the Pod and container tags collected for that Pod.
- If an endpoint is not backed by a Pod, Datadog converts the check into a regular cluster check without Pod-specific tags.

Service targets do not use `containerImage`; omit that field.

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

If a workload already has annotation-based Autodiscovery configuration for a check, your `DatadogInstrumentation` configuration will not override it.

## One resource per target

A workload or Service can be the target of only one `DatadogInstrumentation` resource within a namespace. A validation webhook will reject a resource whose `targetRef` already belongs to another resource, or whose `targetRef` points to an unsupported kind.

## Check the status

The controller reports the result of reconciling each resource through Kubernetes status conditions. Use the status to view the state of the check configuration, including target resolution and whether the configuration was applied:

```shell
kubectl describe datadoginstrumentation <YOUR_CR_NAME> -n <YOUR_TARGETS_NAMESPACE>
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/containers/autodiscovery/
[2]: /containers/kubernetes/integrations/
[3]: /containers/cluster_agent/
[4]: /integrations/redisdb/
[5]: /containers/guide/template_variables/
[6]: /containers/cluster_agent/endpointschecks/
