---
title: Running Cluster Checks with Autodiscovery
kind: documentation
further_reading:
- link: "/agent/autodiscovery"
  tag: "Documentation"
  text: "Main Autodiscovery documentation"
- link: "/agent/autodiscovery/endpointschecks/"
  tag: "Documentation"
  text: "Endpoints Checks documentation"
- link: "/agent/kubernetes/cluster/"
  tag: "Documentation"
  text: "Cluster Agent documentation"
---

## How it Works

The Datadog Agent is able to auto-discover containers and create Check configurations via [the Autodiscovery mechanism][1]. The Cluster Checks feature extends this mechanism to monitor non-containerized workloads, including:

- out-of-cluster datastores and endpoints (eg. RDS or CloudSQL)
- load-balanced cluster services (eg. Kubernetes services)

To ensure that only one instance of each Check runs, [the Cluster Agent][2] holds the configurations and dynamically dispatches them to node-based Agents. The Agents connect to the Cluster Agent every 10 seconds and retrieve the configurations to run. If an Agent stops reporting, the Cluster Agent removes it from the active pool and dispatches the configurations to other Agents. This ensures one (and only one) instance always runs even as nodes are added and removed from the cluster.

Metrics, Events and Service Checks collected by Cluster Checks will be submitted without a hostname, as it is not relevant. A `cluster_name` tag is added, to allow you to scope and slice your data.

This feature is currently supported on Kubernetes for versions 6.9.0+ of the Agent, and versions 1.2.0+ of the Cluster Agent.


## How to set it up

### Cluster Agent setup

This feature requires a running [Cluster Agent][3].

Then enable the cluster check feature:

Starting with version 1.2.0, the Datadog Cluster Agent extends the Autodiscovery mechanism for non-containerized cluster resources. To enable this, make the following changes to the Cluster Agent deployment:

1. Set `DD_CLUSTER_CHECKS_ENABLED` to `true`.
2. Pass your cluster name as `DD_CLUSTER_NAME`. To help you scope your metrics, Datadog injects your cluster name as a `cluster_name` instance tag to all configurations.
3. The recommended leader election lease duration is 15 seconds. Set it with the `DD_LEADER_LEASE_DURATION` environment variable.
4. If the service name is different from the default `datadog-cluster-agent`, ensure the `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` environment variable reflects the service name.

The following two configuration sources are currently supported. [They are described in the Autodiscovery documentation][4]:

* You can mount YAML files from a ConfigMap in the `/conf.d` folder. They are automatically imported by the image's entrypoint.
* Kubernetes service annotations require setting both the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables to `kube_services`.

Note that hostnames are not linked to cluster checks metrics, which limits the use of host tags and the `DD_TAGS` environment variable. To add tags to cluster checks metrics, use the `DD_CLUSTER_CHECKS_EXTRA_TAGS` environment variable.

Refer to [the dedicated Cluster Checks Autodiscovery guide][5] for more configuration and troubleshooting details on this feature.


### Agent setup

Enable the `clusterchecks` configuration provider on the Datadog **Host** Agent. This can be done in two ways:

- By setting the `DD_EXTRA_CONFIG_PROVIDERS` environment variable:

```
DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
```

- Or adding it to the `datadog.yaml` configuration file:

```yaml
config_providers:
  - name: clusterchecks
    polling: true
```

[Restart the Agent][6] to apply the configuration change.

### Custom checks

Running [custom Agent checks][7] as cluster checks is supported, as long as all node-based Agents are able to run it. This means your checks' code:

- Must be installed on all node-based Agents where the `clusterchecks` config provider is enabled.
- Must **not** depend on local resources that are not accessible to all Agents.

## Setting up check configurations

### Static configurations in files

When the IP of a given resource is constant (eg. external service endpoint, public URL...), a static configuration can be passed to the Cluster Agent as yaml files. The file name convention and syntax are the same as the static configurations on the node-based Agent, with the addition of the `cluster_check: true` line.

#### Example: MySQL check on a CloudSQL database

After setting up the CloudSQL instance and [datadog user][8], mount a `/conf.d/mysql.yaml` file in the Cluster Agent container with the following contents:

```yaml
cluster_check: true
init_config:
instances:
  - server: '<PRIVATE_IP_ADDRESS>'
    port: 3306
    user: datadog
    pass: '<YOUR_CHOSEN_PASSWORD>'
```

The `cluster_check` field will inform the Cluster Agent to delegate this Check to one node-based Agent.

### Template Source: Kubernetes Service Annotations

Similar to [annotating Kubernetes Pods][9], Services can be annotated with the following syntax:

```yaml
  ad.datadoghq.com/service.check_names: '[<CHECK_NAME>]'
  ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
  ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

The `%%host%%` [template variable][10] is supported and is replaced by the service's IP. The `kube_namespace` and `kube_service` tags are automatically added to the instance.

#### Example: HTTP check on an nginx-backed service

The following Service definition exposes the Pods from the `my-nginx` deployment and runs an [HTTP check][11] to measure the latency of the load-balanced service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
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

In addition, each pod should be monitored with the [NGINX check][12], as it enables the monitoring of each worker as well as the aggregated service.

## Troubleshooting

Due to their distributed nature, troubleshooting Cluster Checks is a bit more involved. The following sections explain the dispatching process and the associated troubleshooting commands.

### Kubernetes: find the leader Cluster Agent

When leader-election is enabled, only the leader serves Cluster Check configurations to the node-based Agents. The name of the leader is available in the `datadog-leader-election` ConfigMap:

```
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ...''
```

In this case, the leader pod is `cluster-agent-rhttz`. If it is deleted or unresponsive, another pod will automatically take over.

### Autodiscovery in the Cluster Agent

To ensure a configuration (static or autodiscovered) is picked up by the Cluster Agent, use the `configcheck` command in the leader Cluster Agent:

```
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

The `clusterchecks` command allows to inspect the state of the dispatching logic, including:

- which node-based Agents are actively reporting to the Cluster Agent
- which Checks are dispatched on each node

```
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

```
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

The Instance ID matches the one we had earlier.

### Agent status

The Agent `status` command should show the check instance running and reporting successfully.

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

[1]: /agent/autodiscovery
[2]: /agent/kubernetes/cluster
[3]: /agent/kubernetes/cluster/#cluster-checks-autodiscovery
[4]: /agent/autodiscovery/clusterchecks/#setting-up-check-configurations
[5]: /agent/autodiscovery/clusterchecks
[6]: /agent/guide/agent-commands
[7]: /developers/write_agent_check
[8]: /integrations/mysql
[9]: /agent/autodiscovery/?tab=kubernetes#template-source-kubernetes-pod-annotations
[10]: /agent/autodiscovery/?tab=kubernetes#supported-template-variables
[11]: /integrations/http_check
[12]: /integrations/nginx
