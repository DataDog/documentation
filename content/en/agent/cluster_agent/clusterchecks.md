---
title: Running Cluster Checks with Autodiscovery
kind: documentation
aliases:
    - /agent/autodiscovery/clusterchecks
further_reading:
    - link: '/agent/kubernetes/cluster/'
      tag: 'Documentation'
      text: 'Cluster Agent documentation'
---

## Overview

The Datadog Agent can Autodiscover containers and create check configurations with [the Autodiscovery mechanism][1].

Cluster checks extend this mechanism to monitor noncontainerized workloads, including:

- Out-of-cluster datastores and endpoints (for example, RDS or CloudSQL).
- Load-balanced cluster services (for example, Kubernetes services).

To ensure that only one instance of each check runs, [the Cluster Agent][2] holds the configurations and dynamically dispatches them to node-based Agents. The Agents connect to the Cluster Agent every 10 seconds and retrieve the configurations to run. If an Agent stops reporting, the Cluster Agent removes it from the active pool and dispatches the configurations to other Agents. This ensures one (and only one) instance always runs even as nodes are added and removed from the cluster.

Metrics, events, and service checks collected by cluster checks are submitted without a hostname, as it is not relevant. A `cluster_name` tag is added, to allow you to scope and slice your data.

This feature is supported on Kubernetes for versions 6.9.0+ of the Agent, and versions 1.2.0+ of the Cluster Agent.

## Set up cluster checks

### Cluster Agent

This feature requires a running [Cluster Agent][3].

Then enable the cluster check feature:

Starting with version 1.2.0, the Datadog Cluster Agent extends the Autodiscovery mechanism for noncontainerized cluster resources. To enable this, make the following changes to the Cluster Agent deployment:

1. Set `DD_CLUSTER_CHECKS_ENABLED` to `true`.
2. Pass your cluster name as `DD_CLUSTER_NAME`. To help you scope your metrics, Datadog injects your cluster name as a `cluster_name` instance tag to all configurations.
3. The recommended leader election lease duration is 15 seconds. Set it with the `DD_LEADER_LEASE_DURATION` environment variable.
4. If the service name is different from the default `datadog-cluster-agent`, ensure the `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` environment variable reflects the service name.

The following two configuration sources are supported. [They are described in the Autodiscovery documentation][1]:

- You can mount YAML files from a ConfigMap in the `/conf.d` folder. They are automatically imported by the image's entrypoint.
- Kubernetes Service Annotations require setting both the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables to `kube_services`.

Note that hostnames are not linked to cluster checks metrics, which limits the use of host tags and the `DD_TAGS` environment variable. To add tags to cluster checks metrics, use the `DD_CLUSTER_CHECKS_EXTRA_TAGS` environment variable.

### Agent

Enable the `clusterchecks` configuration provider on the Datadog **Node** Agent. This can be done in two ways:

- By setting the `DD_EXTRA_CONFIG_PROVIDERS` environment variable. This takes a space separated string if you have multiple values:

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- Or adding it to the `datadog.yaml` configuration file:

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[Restart the Agent][1] to apply the configuration change.

**Note**: The [Datadog Helm Chart][4] offers the possibility to deploy, via the `clusterChecksRunner` field, a set of Datadog Agents configured to run cluster checks only.

### Custom checks

Running [custom Agent checks][5] as cluster checks is supported, as long as all node-based Agents are able to run it. This means your checks' code:

- Must be installed on all node-based Agents where the `clusterchecks` config provider is enabled.
- Must **not** depend on local resources that are not accessible to all Agents.

### Advanced dispatching

The Cluster Agent can be configured to use an advanced dispatching logic for cluster checks, which takes into account the execution time and metric samples from check instances. This logic enables the Cluster Agent to optimize dispatching and distribution between cluster check runners.

#### Cluster Agent setup

In addition to the steps mentioned in the [Cluster Agent Setup][3] section, you must set `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` to `true`.

#### Cluster check runner setup

The following environment variables are required to configure the cluster check runners (or node Agents) to expose their check stats. The stats are consumed by the Cluster Agent and are used to optimize the cluster checks' dispatching logic.

```
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```

## Setting up check configurations

### Static configurations in files

When the IP of a given resource is constant (eg. external service endpoint, public URL, etc.), a static configuration can be passed to the Cluster Agent as YAML files. The file name convention and syntax are the same as the static configurations on the node-based Agent, with the addition of the `cluster_check: true` line.

#### MySQL check on a CloudSQL database

After setting up a CloudSQL instance and a [Datadog user][6], mount a `/conf.d/mysql.yaml` file in the Cluster Agent container with the following content:

```yaml
cluster_check: true
init_config:
instances:
    - server: '<PRIVATE_IP_ADDRESS>'
      port: 3306
      user: datadog
      pass: '<YOUR_CHOSEN_PASSWORD>'
```

The `cluster_check` field informs the Cluster Agent to delegate this check to one node-based Agent.

### Template source: Kubernetes service annotations

You can annotate services with the following syntax, similar to the syntax for [annotating Kubernetes Pods][1]:

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

The `%%host%%` [template variable][7] is supported and is replaced by the service's IP. The `kube_namespace` and `kube_service` tags are automatically added to the instance.

### Template source: standard labels

```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

The `tags.datadoghq.com` labels set the `env`, `service`, and even `version` as tags on data generated by the check.
These standard labels are part of [Unified Service Tagging][8].

#### Example: HTTP check on an NGINX-backed service

The following Service definition exposes the Pods from the `my-nginx` deployment and runs an [HTTP check][9] to measure the latency of the load balanced service:

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx",
                "url": "http://%%host%%",
                "timeout": 1
              }
            ]
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

In addition, each pod should be monitored with the [NGINX check][10], as it enables the monitoring of each worker as well as the aggregated service.

## Troubleshooting

Due to the distributed nature of cluster checks, troubleshooting them is a bit more involved. The following sections explain the dispatching process and the associated troubleshooting commands.

### Kubernetes: find the leader Cluster Agent

When leader election is enabled, only the leader serves Cluster Check configurations to the node-based Agents. The name of the leader is available in the `datadog-leader-election` ConfigMap:

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

In this case, the leader pod is `cluster-agent-rhttz`. If it is deleted or unresponsive, another pod will automatically take over.

### Autodiscovery in the Cluster Agent

To ensure a configuration (static or Autodiscovered) is picked up by the Cluster Agent, use the `configcheck` command in the leader Cluster Agent:

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Dispatching logic in the Cluster Agent

The `clusterchecks` command allows you to inspect the state of the dispatching logic, including:

- Which node-based Agents are actively reporting to the Cluster Agent.
- Which checks are dispatched on each node.

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:ccheck_testing
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**Note:** the Instance ID will be different from the `configcheck` command, as the instance is modified to add tags and options.

In this case, this configuration is dispatched to the `default-pool-bce5cd34-ttw6` node. Troubleshooting continues from there.

### Autodiscovery in the node-based Agent

The Agent `configcheck` command should show the instance, with the `cluster-checks` source:

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:ccheck_testing
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

The Instance ID matches the one you had earlier.

### Agent status

The Agent `status` command should show the check instance running and reporting successfully.

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/integrations/
[2]: /agent/cluster_agent/
[3]: /agent/cluster_agent/setup/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[5]: /developers/write_agent_check/
[6]: /integrations/mysql/
[7]: /agent/faq/template_variables/
[8]: /getting_started/tagging/unified_service_tagging
[9]: /integrations/http_check/
[10]: /integrations/nginx/
