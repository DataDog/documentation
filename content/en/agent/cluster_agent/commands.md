---
title: Cluster Agent Commands and Options
kind: documentation
disable_toc: true
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

## Cluster Agent commands

The available commands for the Datadog Cluster Agents are:

| Command                                     | Description                                                                                                                                                                                                                                 |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datadog-cluster-agent status`              | Gives an overview of the components of the Agent and their health.                                                                                                                                                                          |
| `datadog-cluster-agent metamap <NODE_NAME>` | Queries the local cache of the mapping between the pods living on `NODE_NAME`  and the cluster level metadata it's associated with (endpoints ...). Not specifying the `NODE_NAME` runs the mapper on all the nodes of the cluster.         |
| `datadog-cluster-agent flare <CASE_ID>`     | Similarly to the node Agent, the cluster Agent can aggregate the logs and the configurations used and forward an archive to the support team or be deflated and used locally. **Note** this command runs from within the Cluster Agent pod. |

## Cluster Agent Options

The following environment variables are supported:

| Variable                                      | Description                                                                                                                                                                   |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`                                  | Your [Datadog API key][1].                                                                                                                                                    |
| `DD_HOSTNAME`                                 | Hostname to use for the Datadog Cluster Agent.                                                                                                                                |
| `DD_CLUSTER_AGENT_CMD_PORT`                   | Port for the Datadog Cluster Agent to serve, default is `5005`.                                                                                                               |
| `DD_USE_METADATA_MAPPER`                      | Enables the cluster level metadata mapping, default is `true`.                                                                                                                |
| `DD_COLLECT_KUBERNETES_EVENTS`                | Configures the Agent to collect Kubernetes events. Default to `false`. See the [Event collection section](#event-collection) for more details.                                |
| `DD_LEADER_ELECTION`                          | Activates the [leader election][2]. You must set `DD_COLLECT_KUBERNETES_EVENTS` to `true` to activate this feature. Default value is `false`.                                 |
| `DD_LEADER_LEASE_DURATION`                    | Used only if the leader election is activated. See the details [in the leader election section][2]. Value in seconds, 60 by default.                                          |
| `DD_CLUSTER_AGENT_AUTH_TOKEN`                 | 32 characters long token that needs to be shared between the node Agent and the Datadog Cluster Agent.                                                                        |
| `DD_KUBE_RESOURCES_NAMESPACE`                 | Configures the namespace where the Cluster Agent creates the configmaps required for the Leader Election, the Event Collection (optional) and the Horizontal Pod Autoscaling. |
| `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`    | Name of the Kubernetes service Cluster Agents are exposed through. Default is `datadog-cluster-agent`.                                                                        |
| `DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`       | Frequency in seconds to query the API Server to resync the local cache. The default is 5 minutes.                                                                             |
| `DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`  | Timeout in seconds of the client communicating with the API Server. Default is 60 seconds.                                                                                    |
| `DD_EXPVAR_PORT`                              | Change the port for fetching [expvar][3] public variables from the Datadog Cluster Agent. The default is port is `5000`.                                                      |
| `DD_EXTERNAL_METRICS_BATCH_WINDOW`            | Time waited in seconds to process a batch of metrics from multiple Autoscalers. Default to 10 seconds.                                                                        |
| `DD_EXTERNAL_METRICS_MAX_AGE`                 | Maximum age in seconds of a datapoint before considering it invalid to be served. Default to 90 seconds.                                                                      |
| `DD_EXTERNAL_METRICS_AGGREGATOR`              | Aggregator for the Datadog metrics. Applies to all Autoscalers processed. Chose among `sum`/`avg`/`max`/`min`.                                                                |
| `DD_EXTERNAL_METRICS_BUCKET_SIZE`             | Size of the window in seconds used to query metric from Datadog. Default to 300 seconds.                                                                                      |
| `DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE` | Rate to resync local cache of processed metrics with the global store. Useful when there are several replicas of the Cluster Agent.                                           |
| `DD_CLUSTER_CHECKS_ENABLED`                   | Enable Cluster Check Autodiscovery. Default is `false`.                                                                                                                       |
| `DD_EXTRA_CONFIG_PROVIDERS`                   | Additionnal Autodiscovery configuration providers to use.                                                                                                                     |
| `DD_EXTRA_LISTENERS`                          | Additionnal Autodiscovery listeners to run.                                                                                                                                   |
| `DD_CLUSTER_NAME`                             | Cluster name, will be added as instance tag to all cluster check configurations.                                                                                              |
| `DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`          | Name of the instance tag set with the `DD_CLUSTER_NAME` option. Default is `cluster_name`.                                                                                    |
| `DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`   | Time after which node-based Agents are considered down and removed from the pool. Default is 30 seconds.                                                                      |
| `DD_CLUSTER_CHECKS_WARMUP_DURATION`           | Delay between acquiring leadership and starting the Cluster Checks logic, allows for all node-based Agents to register first. Default is 30 seconds.                          |
| `DD_CLUSTER_CHECKS_EXTRA_TAGS`                | Adds extra tags to cluster checks metrics.                                                                                                                                    |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#api
[2]: /agent/kubernetes/event_collection/#leader-election
[3]: https://golang.org/pkg/expvar
