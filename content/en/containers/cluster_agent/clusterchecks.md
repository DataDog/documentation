---
title: Cluster Checks
aliases:
    - /agent/autodiscovery/clusterchecks
    - /agent/faq/kubernetes-state-cluster-check
    - /agent/cluster_agent/clusterchecks
further_reading:
    - link: '/containers/cluster_agent/'
      tag: 'Documentation'
      text: 'Datadog Cluster Agent'
    - link: '/containers/troubleshooting/cluster-and-endpoint-checks'
      tag: 'Documentation'
      text: 'Troubleshooting Cluster Checks'
    - link: '/containers/guide/clustercheckrunners'
      text: 'Cluster Check Runners'
      tag: 'Documentation'
---

## Overview

The Datadog Agent automatically discovers containers and creates check configurations by using the [Autodiscovery mechanism][1].

_Cluster checks_ extend this mechanism to monitor noncontainerized workloads, including:

- Datastores and endpoints ran outside of the cluster (for example, RDS or CloudSQL).
- Load-balanced cluster services (for example, Kubernetes services).

This ensures that only **one** instance of each check runs as opposed to **each** node-based Agent Pod running this corresponding check. The [Cluster Agent][2] holds the configurations and dynamically dispatches them to node-based Agents. The Agents connect to the Cluster Agent every ten seconds and retrieve the configurations to run. If an Agent stops reporting, the Cluster Agent removes it from the active pool and dispatches the configurations to other Agents. This ensures that one (and only one) instance always runs, even as nodes are added and removed from the cluster.

Metrics, events, and service checks collected by cluster checks are submitted without a hostname, as it is not relevant. A `cluster_name` tag is added, to allow you to scope and filter your data.

Using cluster checks is recommended if your infrastructure is configured for high availability (HA).

## Set up cluster check dispatching
The setup process involves enabling the dispatching ability in the Cluster Agent, as well as ensuring the Agents are prepared to receive configurations from the `clusterchecks` provider. Once this is done, configurations are passed to the Cluster Agent through mounted configuration files or through Kubernetes service annotations.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Cluster check dispatching is enabled in the Operator deployment of the Cluster Agent by using the `spec.features.clusterChecks.enabled` configuration key:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

This enables the cluster check setup in the Cluster Agent and allows it to process configurations from the Kubernetes service annotations (`kube_services`).

{{% /tab %}}
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

This enables the cluster check setup in the Cluster Agent and allows it to process configurations from the Kubernetes service annotations (`kube_services`).
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
### Cluster Agent

Once your [Cluster Agent][1] is running, make the following changes to the Cluster Agent deployment:

1. Set the environment variable `DD_CLUSTER_CHECKS_ENABLED` to `true`.
2. Pass your cluster name as `DD_CLUSTER_NAME`. To help you scope your metrics, Datadog injects your cluster name as a `cluster_name` instance tag to all configurations.
3. If the service name is different from the default `datadog-cluster-agent`, ensure the `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` environment variable reflects the service name.
4. To enable the Cluster Agent to process configurations from the Kubernetes service annotations, set **both** `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables to `kube_services`.

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

### Cluster check runners

The [Datadog Helm Chart][3] and the [Datadog Operator][4] additionally offer the possibility to deploy cluster check runners, which are a deployment for a small set of Datadog Agents configured to run these dispatched cluster checks only—instead of dispatching these to the normal node-based Agents. See the [Cluster Check Runner][5] guide for more details.

### Advanced dispatching

The Cluster Agent can use an advanced dispatching logic for cluster checks, which takes into account the execution time and metric samples from check instances. This logic enables the Cluster Agent to optimize dispatching and distribution between cluster check runners.

To configure advanced dispatching logic, set the `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` environment variable to `true` for the Cluster Agent. See [Cluster Agent environment variables][15] for how to set environment variables in your Datadog Operator manifest or Helm chart.

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
Running [custom Agent checks][6] as cluster checks is supported, as long as all node-based Agents are able to run the check. This means your custom check code:

- Must be installed on all node-based Agents where the `clusterchecks` config provider is enabled.
- Must **not** depend on local resources that are not accessible to all Agents.

## Setting up check configurations

### Configuration from configuration files

When the URL or IP of a given resource is constant (for example, an external service endpoint or a public URL), a static configuration can be passed to the Cluster Agent as YAML files. The file name convention and syntax are the same as the static configurations on the node-based Agent, with the required addition of the `cluster_check: true` line.

In Cluster Agent v1.18.0+, you can use `advanced_ad_identifiers` and [Autodiscovery template variables][7] in your check configuration to target Kubernetes services ([see example][8]).

{{< tabs >}}
{{% tab "Datadog Operator" %}}
With the Datadog Operator, these configuration files can be created within the `spec.override.clusterAgent.extraConfd.configDataMap` section:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            init_config:
              - <INIT_CONFIG>
            instances:
              - <INSTANCES_CONFIG>
```

Alternatively, you can create a ConfigMap to store the static configuration file and mount this ConfigMap to the Cluster Agent using the `spec.override.clusterAgent.extraConfd.configMap` field:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configMap:
          name: "<NAME>-config-map"
          items:
            - key: <INTEGRATION_NAME>-config
              path: <INTEGRATION_NAME>.yaml
```

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

{{% /tab %}}
{{% tab "Helm" %}}
With Helm, these configuration files can be created within the `clusterAgent.confd` section.

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

**Note**: This is separate from the `datadog.confd` section, where the files are created in the node-based Agents. The `<INTEGRATION_NAME>` must exactly match the desired integration check you want to run.

{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}
With the manual approach you must create a ConfigMap to store the desired static configuration files, and then mount this ConfigMap into the corresponding `/conf.d` file of the Cluster Agent container. This follows the same approach for [mounting ConfigMaps into the Agent container][1]. For example:

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

Then, in the manifest for the Cluster Agent deployment, define the `volumeMounts` and `volumes` with respect to your `ConfigMap` and the corresponding key of your data.

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

After you set up an externally hosted database, such as CloudSQL or RDS, and a corresponding [Datadog user][9] to access the database, mount a `/conf.d/mysql.yaml` file in the Cluster Agent container with the following content:

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

If there is a URL you would like to perform an [HTTP check][10] against once per cluster, mount a `/conf.d/http_check.yaml` file in the Cluster Agent container with the following content:

```yaml
cluster_check: true
init_config:
instances:
    - name: "<EXAMPLE_NAME>"
      url: "<EXAMPLE_URL>"
```

#### Example: HTTP_Check on a Kubernetes service
If there is a Kubernetes service you would like the to perform an [HTTP check][10] against once per cluster:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Use the `spec.override.clusterAgent.extraConfd.configDataMap` field to define your check configuration:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          http_check.yaml: |-
            advanced_ad_identifiers:
              - kube_service:
                  name: "<SERVICE_NAME>"
                  namespace: "<SERVICE_NAMESPACE>"
            cluster_check: true
            init_config:
            instances:
              - url: "http://%%host%%"
                name: "<EXAMPLE_NAME>"
```
{{% /tab %}}
{{% tab "Helm" %}}
Use the `clusterAgent.confd` field to define your check configuration:

```yaml
#(...)
clusterAgent:
  confd:
    http_check.yaml: |-
      advanced_ad_identifiers:
        - kube_service:
            name: "<SERVICE_NAME>"
            namespace: "<SERVICE_NAMESPACE>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{% tab "Manual (DaemonSet)" %}}
Mount a `/conf.d/http_check.yaml` file in the Cluster Agent container with the following content:

```yaml
advanced_ad_identifiers:
  - kube_service:
      name: "<SERVICE_NAME>"
      namespace: "<SERVICE_NAMESPACE>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{< /tabs >}}

**Note:** The field `advanced_ad_identifiers` is supported in Datadog Cluster Agent v1.18+.

### Configuration from Kubernetes service annotations

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Note:** AD Annotations v2 was introduced in Datadog Agent 7.36 to simplify integration configuration. For previous versions of the Datadog Agent, use AD Annotations v1.

The syntax for annotating services is similar to that for [annotating Kubernetes Pods][1]:

```yaml
ad.datadoghq.com/service.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
```

This syntax supports a `%%host%%` [template variable][11], which is replaced by the service's IP. The `kube_namespace` and `kube_service` tags are automatically added to the instance.

#### Example: HTTP check on an NGINX-backed service

The following service definition exposes the Pods from the `my-nginx` deployment and runs an [HTTP check][10] to measure the latency of the load balanced service:

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
      ad.datadoghq.com/service.checks: |
        {
          "http_check": {
            "init_config": {},
            "instances": [
              {
                "url":"http://%%host%%",
                "name":"My Nginx",
                "timeout":1
              }
            ]
          }
        }
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

In addition, each Pod should be monitored with the [NGINX check][12], as it enables the monitoring of each worker as well as the aggregated service.

[1]: /agent/kubernetes/integrations/
[10]: /integrations/http_check/
[11]: /agent/faq/template_variables/
[12]: /integrations/nginx/
{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

The syntax for annotating services is similar to that for [annotating Kubernetes Pods][1]:

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

This syntax supports a `%%host%%` [template variable][11], which is replaced by the service's IP. The `kube_namespace` and `kube_service` tags are automatically added to the instance.

#### Example: HTTP check on an NGINX-backed service

The following service definition exposes the Pods from the `my-nginx` deployment and runs an [HTTP check][10] to measure the latency of the load balanced service:

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

In addition, each Pod should be monitored with the [NGINX check][12], as it enables the monitoring of each worker as well as the aggregated service.

[1]: /agent/kubernetes/integrations/
[10]: /integrations/http_check/
[11]: /agent/faq/template_variables/
[12]: /integrations/nginx/

{{% /tab %}}
{{< /tabs >}}

## Validation

The Datadog Cluster Agent dispatches each cluster check to a node Agent to run. Run the [Datadog Cluster Agent's `clusterchecks` subcommand][13] and look for the check name under the node Agent's hostname:

```
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
(...)
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

Now, run the [node Agent's `status` subcommand][14] and look for the check name under the Checks section.

```
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
[5]: /containers/guide/clustercheckrunners
[6]: /developers/custom_checks/write_agent_check/
[7]: /agent/guide/template_variables/
[8]: /agent/cluster_agent/clusterchecks/#example-http_check-on-a-kubernetes-service
[9]: /integrations/mysql/
[10]: /integrations/http_check/
[11]: /agent/faq/template_variables/
[12]: /integrations/nginx/
[13]: /containers/troubleshooting/cluster-and-endpoint-checks#dispatching-logic-in-the-cluster-agent
[14]: /containers/cluster_agent/commands/#cluster-agent-commands
[15]: /containers/cluster_agent/commands/?tab=datadogoperator#cluster-agent-environment-variables