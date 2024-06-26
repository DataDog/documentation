---
title: Cluster Agent Commands and Options
kind: documentation
aliases:
- /agent/cluster_agent/commands
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: "Blog"
  text: "Introducing the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: "Blog"
  text: "Autoscale your Kubernetes workloads with any Datadog metric"
- link: "/agent/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "/agent/kubernetes/daemonset_setup/"
  tag: "Documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

## Cluster Agent commands

The available commands for the Datadog Cluster Agents are:

`datadog-cluster-agent status`              
: Gives an overview of the components of the Agent and their health.

`datadog-cluster-agent metamap <NODE_NAME>` 
: Queries the local cache of the mapping between the pods living on `NODE_NAME`, and the cluster level metadata they are associated with, such as endpoints. Not specifying the `NODE_NAME` runs the mapper on all the nodes of the cluster.

`datadog-cluster-agent flare <CASE_ID>`     
: Similarly to the node-based Agent, the Cluster Agent can aggregate the logs and the configurations used and forward an archive to the support team, or be deflated and used locally. **Note**: this command runs from within the Cluster Agent pod.

## Cluster Agent environment variables

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Set Cluster Agent environment variables under `override.clusterAgent.env`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
Set Cluster Agent environment variables under `clusterAgent.env`:
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
clusterAgent:
  env:
    - name: <ENV_VAR_NAME>
      value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

The following environment variables are supported:

`DD_API_KEY`                                  
: Your [Datadog API key][1].

`DD_CLUSTER_CHECKS_ENABLED`                   
: Enable Cluster Check Autodiscovery. Defaults to `false`.

`DD_CLUSTER_AGENT_AUTH_TOKEN`                 
: 32-character token that needs to be shared between the node Agent and the Datadog Cluster Agent.

`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`    
: Name of the Kubernetes service through which Cluster Agents are exposed. Defaults to `datadog-cluster-agent`.

`DD_CLUSTER_NAME`                             
: Cluster name. Added as an instance tag to all cluster check configurations.

`DD_CLUSTER_CHECKS_ENABLED`
: When true, enables dispatching logic on the leader Cluster Agent. Default: `false`.

`DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`   
: Time (in seconds) after which node-based Agents are considered down and removed from the pool. Defaults to `30` seconds.

`DD_CLUSTER_CHECKS_WARMUP_DURATION`           
: Delay (in seconds) between acquiring leadership and starting the Cluster Checks logic, allowing for all node-based Agents to register first. Default is `30` seconds.

`DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`          
: Name of the instance tag set with the `DD_CLUSTER_NAME` option. Defaults to `cluster_name`.

`DD_CLUSTER_CHECKS_EXTRA_TAGS`                
: Adds extra tags to cluster check metrics.

`DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED`
: When true, the leader Cluster Agent collects stats from the cluster-level check runners to optimize check dispatching logic. Default: `false`.

`DD_CLUSTER_CHECKS_CLC_RUNNERS_PORT`
: The port used by the Cluster Agent client to reach cluster-level check runners and collect their stats. Default: `5005`.

`DD_HOSTNAME`                                 
: Hostname to use for the Datadog Cluster Agent.

`DD_ENV`                                      
: Sets the `env` tag for data emitted by the Cluster Agent. Recommended only if the Cluster Agent monitors services within a single environment.

`DD_USE_METADATA_MAPPER`                      
: Enables cluster level metadata mapping. Defaults to `true`.

`DD_COLLECT_KUBERNETES_EVENTS`                
: Configures the Agent to collect Kubernetes events. Defaults to `false`.

`DD_LEADER_ELECTION`                          
: Activates leader election. Set `DD_COLLECT_KUBERNETES_EVENTS` to `true` to activate this feature. Defaults to `false`.

`DD_LEADER_LEASE_DURATION`                    
: Used only if leader election is activated. Value in seconds, 60 by default.

`DD_KUBE_RESOURCES_NAMESPACE`                 
: Configures the namespace where the Cluster Agent creates the configmaps required for the leader election, event collection (optional), and horizontal pod autoscaling.

`DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`       
: Frequency (in seconds) for querying the API server to resync the local cache. The default is 5 minutes, or `300` seconds.

`DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`  
: Timeout (in seconds) of the client communicating with the API server. Defaults to `60` seconds.

`DD_METRICS_PORT`                              
: Port to expose Datadog Cluster Agent metrics. Defaults to port `5000`.

`DD_EXTERNAL_METRICS_PROVIDER_BATCH_WINDOW`   
: Time waited (in seconds) to process a batch of metrics from multiple autoscalers. Defaults to `10` seconds.

`DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE`        
: Maximum age (in seconds) of a datapoint before considering it invalid to be served. Default to `120` seconds.

`DD_EXTERNAL_METRICS_AGGREGATOR`     
: Aggregator for Datadog metrics. Applies to all autoscalers processed. Choose from `sum`/`avg`/`max`/`min`.

`DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE`    
: Size of the window (in seconds) used to query metrics from Datadog. Defaults to `300` seconds.

`DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE` 
: Rate to resync local cache of processed metrics with the global store. Useful when there are several replicas of the Cluster Agent.

`DD_EXTRA_CONFIG_PROVIDERS`                   
: Additional Autodiscovery configuration providers to use.

`DD_EXTRA_LISTENERS`                          
: Additional Autodiscovery listeners to run.

`DD_PROXY_HTTPS`                
: Sets a proxy server for HTTPS requests.

`DD_PROXY_HTTP`                
: Sets a proxy server for HTTP requests.

`DD_PROXY_NO_PROXY`                
: Sets a list of hosts that should bypass the proxy. The list is space-separated.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
: Configures the CPU request and limit for the init containers.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`
: Configures the memory request and limit for the init containers.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://golang.org/pkg/expvar
