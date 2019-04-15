---
title: Running Endpoints Checks with Autodiscovery
kind: documentation
further_reading:
- link: "/agent/autodiscovery"
  tag: "Documentation"
  text: "Main Autodiscovery documentation"
- link: "/agent/autodiscovery/clusterchecks/"
  tag: "Documentation"
  text: "Cluster Checks documentation"
- link: "/agent/kubernetes/cluster/"
  tag: "Documentation"
  text: "Cluster Agent documentation"
---

## How it Works

The [Cluster Checks][1] feature offers the possibility to auto-discover and perform Checks on load-balanced cluster services (eg. Kubernetes services). The Endpoints Checks feature extends this mechanism to monitor Endpoints behind cluster services.

The [Cluster Agent][2] holds the configurations and exposes them to node-based Agents so they can consume and convert them into Endpoints Checks.

Endpoints Checks are consumed and scheduled by Agents based on same nodes with worker pods of the service.

The Agents connect to the Cluster Agent every 10 seconds and retrieve the configurations to run, the Endpoints Checks collected will be submitted with service, pod and hostname tags.

This feature is currently supported on Kubernetes for versions 6.9.0+ of the Agent, and versions 1.3.0+ of the Cluster Agent.


## How to set it up

### Cluster Agent setup

This feature requires a running [Cluster Agent with the Cluster Checks feature enabled][3].

### Agent setup

Enable the `clusterchecks` and `endpointschecks` configuration providers on the Datadog **Host** Agent. This can be done in two ways:

- By setting the `DD_EXTRA_CONFIG_PROVIDERS` environment variable:

```
DD_EXTRA_CONFIG_PROVIDERS="clusterchecks endpointschecks"
```

- Or adding it to the `datadog.yaml` configuration file:

```yaml
config_providers:
  - name: clusterchecks
    polling: true
  - name: endpointschecks
    polling: true
```

[Restart the Agent][4] to apply the configuration change.

## Setting up Check Configurations via Kubernetes Service Annotations

Similar to [annotating Kubernetes Pods][5], Services can be annotated with the following syntax:

```yaml
  ad.datadoghq.com/service.check_names: '[<CHECK_NAME>]'
  ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
  ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
  ad.datadoghq.com/endpoints.check_names: '[<CHECK_NAME>]'
  ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
  ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
```

The `%%host%%` [template variable][6] is supported and is replaced by the service's and endpoints' IPs. The `kube_namespace` and `kube_service` tags are automatically added to the instances.

**Note**: It is required to set both `ad.datadoghq.com/service.*` and `ad.datadoghq.com/endpoints.*` annotations to enable the Endpoints Checks on the service's endpoints.

#### Example: HTTP check on an nginx-backed service and its endpoints

The following Service definition exposes the Pods from the `my-nginx` deployment and runs an [HTTP check][7] to measure the latency of the load-balanced service:

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
    ad.datadoghq.com/endpoints.check_names: '["http_check"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
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

## Troubleshooting

Troubleshooting Endpoints Checks is similar to [troubleshooting Cluster Checks][8], the only difference is on the node-based Agents where scheduled Endpoints Checks appear along side the Cluster Check.

**Note**: Endpoints Checks are only scheduled by Agents that share the same nodes with the current service's worker pods.

### Autodiscovery in the node-based Agent

The Agent `configcheck` command should show the instance, with the `endpoints-checks` source:

```
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: endpoints-checks
Instance ID: http_check:My Nginx:57439fa243cf217c
name: My Nginx
tags:
- pod_phase:running
- kube_service:my-nginx
- kube_deployment:my-nginx
- kube_namespace:default
timeout: 1
url: http://10.0.0.196
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint://default/my-nginx
* kubernetes_pod://6c848f40-5d35-11e9-ae71-42010af0016b
* kube_service://6c964fcf-5d35-11e9-ae71-42010af0016b
===
```

### Agent status

The Agent `status` command should show the check instance running and reporting successfully.

```
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
   http_check (3.2.1)
    ------------------
      Instance ID: http_check:My Nginx:57439fa243cf217c [OK]
      Total Runs: 5
      Metric Samples: Last Run: 3, Total: 15
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 5
      Average Execution Time : 61ms
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery/clusterchecks/
[2]: /agent/kubernetes/cluster
[3]: /agent/kubernetes/cluster/#cluster-checks-autodiscovery
[4]: /agent/guide/agent-commands
[5]: /agent/autodiscovery/?tab=kubernetes#template-source-kubernetes-pod-annotations
[6]: /agent/autodiscovery/?tab=kubernetes#supported-template-variables
[7]: /integrations/http_check
[8]: /agent/autodiscovery/clusterchecks/#troubleshooting