---
title: Cluster Agent Features
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/agent/autodiscovery/clusterchecks"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "agent/kubernetes/daemonset_setup"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "/agent/cluster_agent/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

### Event collection

In order to collect events, you need the following environment variables in your `datadog-agent.yaml` manifest:

```
          - name: DD_COLLECT_KUBERNETES_EVENTS
            value: "true"
          - name: DD_LEADER_ELECTION
            value: "true"
```
Enabling the leader election ensures that only one Agent collects the events.

**Note**: You must disable leader election in the Datadog Agent on your nodes before enabling leader election in the Datadog Cluster Agent. Otherwise, leader election may fail and some features such as the external metrics provider or the cluster level checks may not work.

#### Cluster metadata provider

In the Node Agent, set the environment variable `DD_CLUSTER_AGENT_ENABLED` to true.

The environment variable `DD_KUBERNETES_METADATA_TAG_UPDATE_FREQ` can be set to specify how often the Node Agents hit the Datadog Cluster Agent.

Disable the Kubernetes metadata tag collection with `DD_KUBERNETES_COLLECT_METADATA_TAGS`.

#### Custom Metrics Server

The Datadog Cluster Agent implements the External Metrics Provider's interface (currently in beta). Therefore it can serve Custom Metrics to Kubernetes for Horizontal Pod Autoscalers. It is referred throughout the documentation as the Custom Metrics Server, per Kubernetes' terminology.

To enable the Custom Metrics Server:

1. Set `DD_EXTERNAL_METRICS_PROVIDER_ENABLED` to `true` in the Deployment of the Datadog Cluster Agent.
2. Configure the `<DD_APP_KEY>` as well as the `<DD_API_KEY>` in the Deployment of the Datadog Cluster Agent.
Set `DATADOG_HOST` to `https://app.datadoghq.eu` if you are using an EU account.
3. Create a [service exposing the port 443][1] and [register it as an APIService for External Metrics][2].

Refer to [the dedicated Custom metrics server guide][3] to configure the Custom Metrics Server and get more details about this feature.

**Note**: An [HPA][4] is required for values to be served on the external metrics route.

#### Cluster Checks Autodiscovery

Starting with version 1.2.0, the Datadog Cluster Agent can extend the Autodiscovery mechanism for non-containerized cluster resources. To enable this, make the following changes to the Cluster Agent deployment:

1. Set `DD_CLUSTER_CHECKS_ENABLED` to `true`.
1. Pass your cluster name as `DD_CLUSTER_NAME`. It will be injected as a `cluster_name` instance tag to all configurations, to help you scope your metrics.
1. The recommended leader election lease duration is 15 seconds. Set it with the `DD_LEADER_LEASE_DURATION` envvar.
1. If the service name is different from the default `datadog-cluster-agent`, ensure the `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` environment variable reflects that.

Two configuration sources are currently supported, [described in the Autodiscovery documentation][5]:

- yaml files can be mounted from a ConfigMap in the `/conf.d` folder, they will be automatically imported by the image's entrypoint.
- Kubernetes Services annotations requires setting both the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables to `kube_services`.

Note that hostnames are not linked to cluster checks metrics, which limits the use of host tags and the `DD_TAGS` environment variable. To add tags to cluster checks metrics, use the `DD_CLUSTER_CHECKS_EXTRA_TAGS` environment variable.

Refer to [the dedicated Cluster Checks Autodiscovery guide][6] for more configuration and troubleshooting details on this feature.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/cluster-agent-hpa-svc.yaml
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/hpa-example/rbac-hpa.yaml
[3]: https://github.com/DataDog/datadog-agent/blob/master/docs/cluster-agent/CUSTOM_METRICS_SERVER.md
[4]: https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale
[5]: /agent/autodiscovery/clusterchecks/#setting-up-check-configurations
[6]: /agent/autodiscovery/clusterchecks
