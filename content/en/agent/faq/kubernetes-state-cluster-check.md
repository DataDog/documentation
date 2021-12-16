---
title: How do I run the kubernetes_state check as a cluster check?
kind: faq
further_reading:
- link: "/agent/kubernetes/"
  tag: "Documentation"
  text: "Kubernetes with Datadog"
- link: "/agent/autodiscovery/"
  tag: "Documentation"
  text: "Using Autodiscovery with Kubernetes and Docker"
- link: "/agent/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
---

The `kubernetes_state` check, which monitors `kube-state-metrics`, is enabled automatically by [Autodiscovery][1]. In larger Kubernetes clusters, this check may consume too much RAM. In this case, consider running the `kubernetes_state` check as a [cluster check][2].

## Configuration

1. Deploy `kube-state-metrics` with cluster check annotations on its Kubernetes service

	```
	apiVersion: v1
	kind: Service
	metadata:
	  annotations:
	    # ... others
	    ad.datadoghq.com/service.check_names: '["kubernetes_state"]'
	    ad.datadoghq.com/service.init_configs: '[{}]'
	    ad.datadoghq.com/service.instances: |
	      [
	      {
	          "kube_state_url": "http://%%host%%:8080/metrics",
	          "prometheus_timeout": 30,
	          "min_collection_interval": 30,
	          "send_pod_phase_service_checks": false,
	          "telemetry": true
	      }
	      ]
		ad.datadoghq.com/service.ignore_autodiscovery_tags: 'true'
	```

	**Notes**:
	* 8080 is the metrics port. The `prometheus_timeout` and `min_collection_interval` are set to 30 because this setup assumes large payloads, so these metrics are being collected at a lower granularity. Set `send_pod_phase_service_checks` to `true` if you want the pod phase as a service check. Telemetry is only activated in v4.6.1+ of the Datadog `kube-state-metrics` check.
	* Setting `ad.datadoghq.com/service.ignore_autodiscovery_tags` to `'true'` disables adding `kube-state-metrics` service related tags (such as `kube_namespace`, `kube_service`) to the metrics collected by the check. This setting is optional and requires Datadog Cluster Agent v1.8.0+

2. Deploy the Datadog Cluster Agent with the following variables:

	```
		- name: DD_CLUSTER_CHECKS_ENABLED
		  value: true
		- name: DD_EXTRA_CONFIG_PROVIDERS
		  value: "kube_services"
		- name: DD_EXTRA_LISTENERS
		  value: "kube_services"
	```

3. Mount an empty file to override `/etc/datadog-agent/conf.d/kubernetes_state.d/auto_conf.yaml` in the Agent DaemonSet. Otherwise, the Autodiscovered check still runs and may still consume a significant amount of RAM. Configure Agent deployment to mount an empty directory in `/etc/datadog-agent/conf.d/kubernetes_state.d`

    ```
    ...
        volumeMounts:
        ...
          - name: empty-dir
          mountPath: /etc/datadog-agent/conf.d/kubernetes_state.d
        ...
      volumes:
        - name: empty-dir
        emptyDir: {}
        ...
    ```

4. Deploy the Agent.

See the [Running Cluster Checks with Autodiscovery][2] documentation for more information. See options that begin with `clusterchecksDeployment` in the Helm chart [README.md][3].

### Verify check dispatching

Run:

```shell
kubectl exec -it <DATADOG_CLUSTER_AGENT_LEADER> agent clusterchecks
```

This command displays something like:

```text
===== Checks on gke-my-cluster-default-pool-b969f074-npsw =====

=== kubernetes_state check ===
Source: kubernetes-services
Instance ID: kubernetes_state:4a95df9b407f14d7
empty_default_hostname: true
kube_state_url: http://10.59.249.74:8080/metrics
min_collection_interval: 30
prometheus_timeout: 30
send_pod_phase_service_checks: false
tags:
- kube_service:kube-state-metrics
- kube_namespace:kube-system
- cluster_name:test-cluster
telemetry: true
~
Init Config:
{}
===
```

The Agent running on the node returned above should also have a `kubernetes_state` check in its `agent status`.

## Background

If you use Autodiscovery from the DaemonSet, one of your Agents (the one running on the same node as `kube-state-metrics`) runs the check and uses a significant amount of memory, while other Agents in the DaemonSet use far less. To prevent the outlier Agent from getting killed, you could increase the memory limit for all Agents, but this wastes resources. The alternative is to use the DaemonSet for lightweight checks to keep the general memory usage low, and use a small (2-3 pods) dedicated deployment for heavy checks, where each pod has a large amount of RAM and only runs cluster checks.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/agent/autodiscovery/
[2]: /agent/cluster_agent/clusterchecks/
[3]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/README.md
