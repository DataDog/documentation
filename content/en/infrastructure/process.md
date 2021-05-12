---
title: Live Processes
kind: documentation
aliases:
    - /guides/process
    - /graphing/infrastructure/process/
further_reading:
    - link: 'https://www.datadoghq.com/blog/live-process-monitoring/'
      tag: 'Blog'
      text: 'Monitor your processes with Datadog'
    - link: '/infrastructure/process/generate_process_metrics/'
      tag: 'Documentation'
      text: 'Increase the retention of process data with metrics'
    - link: '/infrastructure/livecontainers'
      tag: 'Graphing'
      text: 'Get real-time visibility of all of the containers across your environment'
---

## Introduction

Datadog’s Live Processes gives you real-time visibility into the process running on your infrastructure. Use Live Processes to:

* View all of your running processes in one place
* Break down the resource consumption on your hosts and containers at the process level
* Query for processes running on a specific host, in a specific zone, or running a specific workload
* Monitor the performance of the internal and third-party software you run using system metrics at two-second granularity
* Add context to your dashboards and notebooks 

{{< img src="infrastructure/process/live_processes_main.png" alt="Live Processes Overview"  >}}

## Installation

If you are using Agent 5, [follow this specific installation process][1]. If you are using Agent 6 or 7, [see the intructions below][2]. 

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Once the Datadog Agent is installed, enable Live Processes collection by editing the [Agent main configuration file][1] by setting the following parameter to `true`:

```yaml
process_config:
    enabled: 'true'
```

The `enabled` value is a string with the following options:

- `"true"`: Enable the Process Agent to collect processes and containers.
- `"false"` (default): Only collect containers if available.
- `"disabled"`: Don't run the Process Agent at all.

Additionally, some configuration options may be set as environment variables.

**Note**: Options set as environment variables override the settings defined in the configuration file.

After configuration is complete, [restart the Agent][2].


[1]: /agent/guide/agent-configuration-files/
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Follow the instructions for the [Docker Agent][1], passing in the following attributes, in addition to any other custom settings as appropriate:

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**Note**:

- To collect container information in the standard install, the `dd-agent` user must have permissions to access `docker.sock`.
- Running the Agent as a container still allows you to collect host processes.


[1]: /agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

In the [dd-agent.yaml][1] manifest used to create the Daemonset, add the following environmental variables, volume mount, and volume:

```yaml
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

Refer to the standard [Daemonset installation][2] and the [Docker Agent][3] information pages for further documentation.

**Note**: Running the Agent as a container still allows you to collect host processes.


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: /agent/kubernetes/
[3]: /agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

Update your [datadog-values.yaml][1] file with the following process collection configuration, then upgrade your Datadog Helm chart:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}

{{< /tabs >}}

### Process arguments scrubbing

In order to hide sensitive data on the Live Processes page, the Agent scrubs sensitive arguments from the process command line. This feature is enabled by default and any process argument that matches one of the following words has its value hidden.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Note**: The matching is **case insensitive**.

Define your own list to be merged with the default one, using the `custom_sensitive_words` field in `datadog.yaml` file under the `process_config` section. Use wildcards (`*`) to define your own matching scope. However, a single wildcard (`'*'`) is not supported as a sensitive word.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**Note**: Words in `custom_sensitive_words` must contain only alphanumeric characters, underscores, or wildcards (`'*'`). A wildcard-only sensitive word is not supported.

The next image shows one process on the Live Processes page whose arguments have been hidden by using the configuration above.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="process arguments scrubbing"  style="width:100%;">}}

Set `scrub_args` to `false` to completely disable the process arguments scrubbing.

You can also scrub **all** arguments from processes by enabling the `strip_proc_arguments` flag in your `datadog.yaml` configuration file:

```yaml
process_config:
    strip_proc_arguments: true
```

## Queries

### Scoping processes

Processes are, by nature, extremely high cardinality objects. To refine your scope to view relevant processes, you can use text and tag filters. 

#### Text filters

When you input a text string into the search bar, fuzzy string search is used to query processes containing that text string in their command lines or paths. Enter a string of two or more characters to see results. Below is Datadog's demo environment, filtered with the string `postgres /9.`.

**Note**: `/9.` has matched in the command path, and `postgres` matches the command itself.

{{< img src="infrastructure/process/postgres.png" alt="Postgres"  style="width:80%;">}}

To combine multiple string searches into a complex query, use any of the following Boolean operators:

`AND`
: **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default)<br> **Example**: `java AND elasticsearch`

`OR`
: **Union**: either term is contained in the selected events <br> **Example**: `java OR python`

`NOT` / `!`
: **Exclusion**: the following term is NOT in the event. You may use the word `NOT` or `!` character to perform the same operation<br> **Example**: `java NOT elasticsearch` or `java !elasticsearch`

Use parentheses to group operators together. For example, `(NOT (elasticsearch OR kafka) java) OR python` .

#### Tag filters

You can also filter your processes using Datadog [tags][3], such as `host`, `pod`, `user`, and `service`. Input tag filters directly into the search bar, or select them in the facet panel on the left of the page.

Datadog automatically generates a `command` tag, so that you can filter for
* third-party software (e.g. `command:mongod`, `command:nginx`)
* container management software (e.g. `command:docker`, `command:kubelet`)
* common workloads (e.g. `command:ssh`, `command:CRON`)

### Aggregating processes

[Tagging][3] enhances navigation. In addition to all existing host-level tags, processes are tagged by `user`.

Furthermore, processes in ECS containers are also tagged by:

- `task_name`
- `task_version`
- `ecs_cluster`

Processes in Kubernetes containers are tagged by:

- `pod_name`
- `kube_pod_ip`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `Kube_cluster`

If you have configuration for [Unified Service Tagging][4] in place, `env`, `service`, and `version` will also be picked up automatically.
Having these tags available will let you tie together APM, logs, metrics, and process data.
Note that this setup applies to containerized environments only.

## Scatter plot

Use the scatter plot analytic to compare two metrics with one another in order to better understand the performance of your containers.

To access the scatter plot analytic [in the Processes page][5] click on the _Show Summary graph_ button the select the "Scatter Plot" tab:

{{< img src="infrastructure/process/scatterplot_selection.png" alt="scatterplot selection"  style="width:60%;">}}

By default, the graph groups by the `command` tag key. The size of each dot represents the number of processes in that group, and clicking on a dot displays the individual pids and containers that contribute to the group.

The query at the top of the scatter plot analytic allows you to control your scatter plot analytic:

- Selection of metrics to display.
- Selection of the aggregation method for both metrics.
- Selection of the scale of both X and Y axis (_Linear_/_Log_).

{{< img src="infrastructure/process/scatterplot.png" alt="container inspect"  style="width:80%;">}}

## Process monitors

Use the [Live Process Monitor][6] to generate alerts based on the count of any group of processes across hosts or tags. You can configure process alerts in the [Monitors page][7]. To learn more, see our [Live Process Monitor documentation][6]. 

{{< img src="infrastructure/process/process_monitor.png" alt="Process Monitor"  style="width:80%;">}}

## Processes in dashboards and notebooks

You can graph process metrics in dashboards and notebooks using the [Timeseries widget][8]. To configure: 
1. Select Live Processes as a data source 
2. Filter using text strings in the search bar 
3. Select a process metric to graph
4. Filter using tags in the `From` field

{{< img src="infrastructure/process/process_widget.png" alt="Processes widget"  style="width:80%;">}}

## Monitoring third-party software 

### Autodetected integrations

Datadog uses process collection to autodetect the technologies running on your hosts. This identifies Datadog integrations that can help you monitor these technologies. These auto-detected integrations are displayed in the [Integrations search][1]:

{{< img src="getting_started/integrations/ad_integrations.png" alt="Autodetected integrations" >}}

Each integration has one of two status types:

- **+ Detected**: This integration is not enabled on any host(s) running it.
- **✓ Partial Visibility**: This integration is enabled on some, but not all relevant hosts are running it.

Hosts that are running the integration, but where the integration is not enabled, can be found in the **Hosts** tab of the integrations tile.

### Integration views 

{{< img src="infrastructure/process/integration_views.png" alt="Integration Views" >}}

Once a third-party software has been detected, Live Processes makes it quick and easy to analyze the performance of that software. 
1. To start, click on *Views* at the top right of the page to open a list of pre-set options, including Ngingx, Redis, and Kafka. 
2. Select a view to scope the page to just the processes running that software. 
3. When inspecting a heavy process, shift to the *Integration Metrics* tab to analyze the health of the software on the underlying host. If you have already enabled the relevant Datadog integration, you'll be able to view all performance metrics collected via the integration to dinstinguish between a host-level and software-level issue. For intance, seeing correlated spikes in process CPU and MySQL query latency may indicate that an intensive operation, such as a full table scan, is delaying the execution of other MySQL queries relying onthe same underlying resources. 

You can customize integration views (e.g. when aggregating a query for Nginx processes by host) and other custom queries by clicking the *+Save* button at the top of the page. Doing so will save your query, table column selections, and visualization settings. Create saved views for quick access to the processes you care about without addition configuration, and to share process data with your teammates.  

## Processes across the platform

{{< img src="infrastructure/process/process_platform.gif" alt="Processes across the Platform" >}}

### Live containers

Live Processes adds extra visibility to your container deployments by monitoring the processes running on each of your containers. Click on a container in the [Live Containers][9] page to view its process tree, including the commands it is running and their resource consumption. Use this data alongside other container metrics to determine the root cause of failing containers or deployments.

### APM

In [APM Traces][10], you can click on a service’s span to see the processes running on its underlying infrastructure. A service’s span processes are correlated with the hosts or pods on which the service runs at the time of the request. Analyze process metrics such as CPU and RSS memory alongside code-level errors to distinguish between application-specific and wider infrastructure issues. Clicking on a process will bring you to the Live Processes page. Related processes are not currently supported for serverless and browser traces.

### Network Performance Monitoring 

When you inspect a dependency in the [Network Overview][11], you can view processes running on the underlying infrastructure of the endpoints (e.g. services) communicating with one another. Use process metadata to determine whether poor network connectivity (indicated by a high number of TCP retransmits) or high network call latency (indicated by high TCP round-trip time) could be due to heavy workloads consuming those endpoints' resources, and thus, affecting the health and efficiency of their communication. 

## Real-time monitoring

While actively working with the Live Processes, metrics are collected at 2s resolution. This is important for highly volatile metrics such as CPU. In the background, for historical context, metrics are collected at 10s resolution.

## Additional information

- Collection of open files and current working directory is limited based on the level of privilege of the user running `dd-process-agent`. In the event that `dd-process-agent` is able to access these fields, they are collected automatically.
- Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.
- In container deployments, the `/etc/passwd` file mounted into the `docker-dd-agent` is necessary to collect usernames for each process. This is a public file and the Process Agent does not use any fields except the username. All features except the `user` metadata field function without access to this file. **Note**: Live Processes only uses the host `passwd` file and does not perform username resolution for users created within containers.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/agent-5-process-collection/
[2]: /agent/
[3]: /getting_started/tagging/
[4]: /getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /monitors/monitor_types/process/
[7]: https://app.datadoghq.com/monitors#create/live_process
[8]: /dashboards/widgets/timeseries/#pagetitle
[9]: /infrastructure/livecontainers/
[10]: /tracing/
[11]: /network_monitoring/performance/network_page
