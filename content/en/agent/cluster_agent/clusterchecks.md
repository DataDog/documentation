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

The Datadog Agent can automatically discover containers and create check configurations with [the Autodiscovery mechanism][1] accordingly for those workloads.

Cluster Checks extend this mechanism to monitor noncontainerized workloads, including:

- Datastores and endpoints ran outside of the cluster (for example, RDS or CloudSQL).
- Load-balanced cluster services (for example, Kubernetes services).

This ensures that only **one** instance of each check runs as opposed to **each** node-based Agent pod running this corresponding check. [The Cluster Agent][2] holds the configurations and dynamically dispatches them to node-based Agents. The Agents connect to the Cluster Agent every 10 seconds and retrieve the configurations to run. If an Agent stops reporting, the Cluster Agent removes it from the active pool and dispatches the configurations to other Agents. This ensures one (and only one) instance always runs even as nodes are added and removed from the cluster.

Metrics, events, and service checks collected by cluster checks are submitted without a hostname, as it is not relevant. A `cluster_name` tag is added, to allow you to scope and slice your data.

This strategy can be used if your infrastructure is configured for high availability (HA).

## Set up cluster check dispatching
The setup process involves enabling the dispatching ability in the Cluster Agent, as well as ensuring the Agents are prepared to receive configurations from the `clusterchecks` provider. Once this is done configurations can be passed to the Cluster Agent through mounted config files or through Kubernetes Service Annotations.

{{< tabs >}}
{{% tab "Helm" %}}
Cluster check dispatching is enabled by default in the Helm deployment of the Cluster Agent through the `datadog.clusterChecks.enabled` configuration key:
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

This enables the cluster check setup in the Cluster Agent and allows it to process configurations from the Kubernetes Service Annotations (`kube_services`).
{{% /tab %}}
{{% tab "Operator" %}}
Cluster check dispatching is enabled in the Operator deployment of the Cluster Agent by using the `clusterAgent.config.clusterChecksEnabled` configuration key:
```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  # (...)
  clusterAgent:
    config:
      clusterChecksEnabled: true
```

This enables the cluster check setup in the Cluster Agent and allows it to process configurations from the Kubernetes Service Annotations (`kube_services`).

{{% /tab %}}
{{% tab "Daemonset" %}}
### Cluster Agent

This feature requires a running [Cluster Agent][1]. Once that is running make the following changes to the Cluster Agent Deployment:

1. Set the environment variable `DD_CLUSTER_CHECKS_ENABLED` to `true`.
2. Pass your cluster name as `DD_CLUSTER_NAME`. To help you scope your metrics, Datadog injects your cluster name as a `cluster_name` instance tag to all configurations.
3. If the service name is different from the default `datadog-cluster-agent`, ensure the `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` environment variable reflects the service name.
4. To enable the Cluster Agent to process configurations from the Kubernetes Service Annotations set **both** `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables to `kube_services`.

### Agent

Enable the `clusterchecks` configuration provider on the Datadog **Node** Agent. This can be done in two ways:

- **Recommended**: By setting the `DD_EXTRA_CONFIG_PROVIDERS` environment variable in your Agent DaemonSet. This takes a space-separated string if you have multiple values:

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- Or adding it to the `datadog.yaml` configuration file:

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[1]: /agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}


**Note**: With cluster checks, the metrics reported by the Agent are not linked to a given hostname because they are meant to be cluster-centric metrics and not necessarily host-based metrics. As a result, these metrics do not inherit any host-level tags associated with that host, such as those inherited from a cloud provider or added by the Agent's `DD_TAGS` environment variable. To add tags to cluster check metrics, use the `DD_CLUSTER_CHECKS_EXTRA_TAGS` environment variable.

The [Datadog Helm Chart][3] and the [Datadog Operator][4] additionally offer the possibility to deploy cluster check runners, which are a deployment for a small set of Datadog Agents configured to run these dispatched cluster checks only, as opposed to dispatching these to the normal node-based Agents.

### Advanced dispatching

The Cluster Agent can be configured to use an advanced dispatching logic for cluster checks, which takes into account the execution time and metric samples from check instances. This logic enables the Cluster Agent to optimize dispatching and distribution between cluster check runners.

#### Cluster Agent setup

In addition to the steps mentioned in the Cluster Agent Setup section, you must set the `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` environment variable to `true`.

#### Agent setup

The following environment variables are required to configure the node Agents (or cluster check runners) to expose their check stats. The stats are consumed by the Cluster Agent and are used to optimize the cluster checks' dispatching logic.

```yaml
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```
### Custom checks
Running [custom Agent checks][5] as cluster checks is supported, as long as all node-based Agents are able to run the check. This means your custom check code:

- Must be installed on all node-based Agents where the `clusterchecks` config provider is enabled.
- Must **not** depend on local resources that are not accessible to all Agents.

## Setting up check configurations

### Configuration from static configuration files
When the URL or IP of a given resource is constant (for example, an external service endpoint or a public URL), a static configuration can be passed to the Cluster Agent as YAML files. The file name convention and syntax are the same as the static configurations on the node-based Agent, with the **required** addition of the `cluster_check: true` line.

{{< tabs >}}
{{% tab "Helm" %}}
With Helm, these configuration files can be created within the `clusterAgent.confd` section. **Note**: This is separate from the `datadog.confd` section where the files are created in the node-based Agents. The `<INTEGRATION_NAME>` must exactly match the desired integration check you want to run.

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      init_config:
        - <INIT_CONFIG>
      instances:
        - <INSTANCES_CONFIG>
```
{{% /tab %}}
{{% tab "Daemonset" %}}
With the manual approach you must create a `ConfigMap` to store the desired static configuration files, and mount it into the corresponding `/conf.d` file of the Cluster Agent container. This follows the same approach for [mounting ConfigMaps into the Agent container][1]. For example:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
data:
  <INTEGRATION_NAME>-config: |-
    cluster_check: true
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
```

Then in the manifest for the Cluster Agent Deployment define the `volumeMounts` and `volumes` with respect to your `ConfigMap` and the corresponding key of your data.

```yaml
        volumeMounts:
          - name: <NAME>-config-map
            mountPath: /conf.d/
            # (...)
      volumes:
        - name: <NAME>-config-map
          configMap:
            name: <NAME>-config-map
            items:
              - key: <INTEGRATION_NAME>-config
                path: <INTEGRATION_NAME>.yaml
          #(...)
```
This creates a file in the `/conf.d/` directory of the Cluster Agent corresponding to the integration. For example: `/conf.d/mysql.yaml` or `/conf.d/http_check.yaml`.


[1]: /agent/kubernetes/integrations/?tab=configmap#configuration
{{% /tab %}}
{{< /tabs >}}

#### Example: MySQL check on an externally hosted database

After you set up an externally hosted database, such as CloudSQL or RDS, and a corresponding [Datadog user][6] to access the database, mount a `/conf.d/mysql.yaml` file in the Cluster Agent container with the following content:

```yaml
cluster_check: true
init_config:
instances:
    - server: "<PRIVATE_IP_ADDRESS>"
      port: 3306
      user: datadog
      pass: "<YOUR_CHOSEN_PASSWORD>"
```

#### Example: HTTP_Check on an external URL

If there is a URL you would like the to perform an [HTTP check][7] against once per cluster, mount a `/conf.d/http_check.yaml` file in the Cluster Agent container with the following content:

```yaml
cluster_check: true
init_config:
instances:
    - name: "<EXAMPLE_NAME>"
      url: "<EXAMPLE_URL>"
```

### Configuration from Kubernetes service annotations

You can annotate services with the following syntax, similar to the syntax for [annotating Kubernetes Pods][1]:

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

The `%%host%%` [template variable][8] is supported and is replaced by the service's IP. The `kube_namespace` and `kube_service` tags are automatically added to the instance.

#### Example: HTTP check on an NGINX-backed service

The following Service definition exposes the Pods from the `my-nginx` deployment and runs an [HTTP check][7] to measure the latency of the load balanced service:

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

In addition, each pod should be monitored with the [NGINX check][9], as it enables the monitoring of each worker as well as the aggregated service.

## Troubleshooting

Due to the distributed nature of cluster checks, troubleshooting them is a bit more involved. The following sections explain the dispatching process and the associated troubleshooting commands.

### Kubernetes: find the leader Cluster Agent

When leader election is enabled, only the leader serves Cluster Check configurations to the node-based Agents. If only one replica of the Cluster Agent pod is running, it is the leader. Otherwise, you can identify the name of the leader in the `datadog-leader-election` `ConfigMap`:

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

In this case, the leader pod is `cluster-agent-rhttz`. If the pod is deleted or unresponsive, another pod takes over automatically.

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
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**Note:** the Instance ID is different from the `configcheck` command, as the instance is modified to add tags and options.

In this case, this configuration is dispatched to the `default-pool-bce5cd34-ttw6` node. Troubleshooting continues with respect to the Agent pod on that corresponding node.

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
- cluster_name:example
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
[3]: /agent/cluster_agent/clusterchecksrunner?tab=helm
[4]: /agent/cluster_agent/clusterchecksrunner?tab=operator
[5]: /developers/custom_checks/write_agent_check/
[6]: /integrations/mysql/
[7]: /integrations/http_check/
[8]: /agent/faq/template_variables/
[9]: /integrations/nginx/
