---
title: Datadog Live Process Monitoring
kind: documentation
aliases:
  - /guides/process
  - /graphing/infrastructure/process/
further_reading:
- link: "graphing/infrastructure/hostmap"
  tag: "Graphing"
  text: "See all of your hosts together on one screen with the hostmap"
- link: "graphing/infrastructure/livecontainers"
  tag: "Graphing"
  text: "Get real-time visibility of all of the containers across your environment"
---

## Introduction

Datadog's Process Monitoring allows for real-time visibility of the most granular elements in a deployment.

{{< img src="graphing/infrastructure/process/live_process_preview.png" alt="live process preview" responsive="true" >}}

## Installation

The following installation processes are for [Agent 6 only][1]. If you are using Agent 5, [follow this specific installation process][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Once the Datadog Agent is installed, enable Live Processes collection by editing the [Agent main configuration file][1] by setting the following parameter to `true`:

```
process_config:
  enabled: "true"
```

The `enabled` value is a string with the following options:

* `"true"`: Enable the Process Agent to collect processes and containers.
* `"false"` (default): Only collect containers if available.
* `"disabled"`: Don't run the Process Agent at all.

Additionally, some configuration options may be set as environment variables.

**Note**: Options set as environment variables override the settings defined in the configuration file.

After configuration is complete, [restart the Agent][2].


[1]: /agent/guide/agent-configuration-files/
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Follow the instructions for the [Docker Agent][1], passing in the following attributes, in addition to any other custom settings as appropriate:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**Note**:

* To collect container information in the standard install, the `dd-agent` user must have permissions to access `docker.sock`.
* Running the Agent as a container still allows you to collect host processes.


[1]: /agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

In the [dd-agent.yaml][1] manifest used to create the Daemonset, add the following environmental variables, volume mount, and volume:

```
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
[2]: /integrations/kubernetes/#installation-via-daemonsets-kubernetes-110
[3]: /agent/docker/#run-the-docker-agent
{{% /tab %}}
{{< /tabs >}}

### Process Arguments Scrubbing

In order to hide sensitive data on the Live Processes page, the Agent scrubs sensitive arguments from the process command line. This feature is enabled by default and any process argument that matches one of the following words has its value hidden.

```
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**Note**: The matching is **case insensitive**.

Define your own list to be merged with the default one, using the `custom_sensitive_words` field in `datadog.yaml` file under the `process_config` section. Use wildcards (`*`) to define your own matching scope. However, a single wildcard (`'*'`) is not supported as a sensitive word.

```
process_config:
  scrub_args: true
  custom_sensitive_words: ['personal_key', '*token', 'sql*', *pass*d*']
```

**Note**: Words in `custom_sensitive_words` must contain only alphanumeric characters, underscores, or wildcards (`'*'`). A wildcard-only sensitive word is not supported.

The next image shows one process on the Live Processes page whose arguments have been hidden by using the configuration above.

{{< img src="graphing/infrastructure/process/process_arg_scrubbing.png" alt="process arguments scrubbing" responsive="true" style="width:100%;">}}

Set `scrub_args` to `false` to completely disable the process arguments scrubbing.

You can also scrub **all** arguments from processes by enabling the `strip_proc_arguments` flag in your `datadog.yaml` configuration file:

```
process_config:
  strip_proc_arguments: true
```

## Searching, Filtering, and Pivoting

### Search Syntax

Processes and containers are, by their nature, extremely high cardinality objects. Fuzzy string search helps you view relevant information. Below is Datadog's demo environment, filtered with the string `postgres /9.`.

**Note**: `/9.` has matched in the command path, and `postgres` matches the command itself.

{{< img src="graphing/infrastructure/process/postgres.png" alt="Postgres" responsive="true" style="width:80%;">}}

To combine multiple string searches into a complex query, use any of the following Boolean operators:

|              |                                                                                                        |                              |
| :----        | :----                                                                                                  | :----                        |
| **Operator** | **Description**                                                                                       | **Example**                 |
| `AND`        | **Intersection**: both terms are in the selected events (if nothing is added, AND is taken by default) | java AND elasticsearch   |
| `OR`         | **Union**: either term is contained in the selected events                                             | java OR python   |
| `NOT` / `!`      | **Exclusion**: the following term is NOT in the event. You may use the word `NOT` or `!` character to perform the same operation | java NOT elasticsearch <br> **equivalent:** java !elasticsearch |

Use parentheses to group operators together. For example, `(NOT (elasticsearch OR kafka) java) OR python` .


### Tagging

[Tagging][3] enhances navigation. In addition to all existing host-level tags, processes are tagged by `user`.

Furthermore, processes in ECS containers are also tagged by:

* `task_name`
* `task_version`
* `ecs_cluster`

Processeses in Kubernetes containers are tagged by:

* `pod_name`
* `kube_pod_ip`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `Kube_cluster`

### Filtering and Pivoting

First, you can filter down to `role:McNulty-Query`, Datadog's front-end query service, in order to narrow the search. Then you can search for the NGINX master processes and pivot the table by availability zone to be confident about that service staying highly available.

{{< img src="graphing/infrastructure/process/mcnultynginx.png" alt="mcnulty nginx" responsive="true" style="width:80%;">}}

Here, you are checking the Elasticsearch processes for an individual feature team. You have also added metrics for voluntary and involuntary context switches, available in the gear menu on the upper-right of the table.

{{< img src="graphing/infrastructure/process/burritoelasticsearch.png" alt="burrito elasticsearch" responsive="true" style="width:80%;">}}

Below, you have searched for SSH processes and pivoted by `user` to understand who is logged into which hosts.

{{< img src="graphing/infrastructure/process/sshusers.png" alt="ssh users" responsive="true" style="width:80%;">}}

Perhaps this one is less exciting after redaction.

## Scatter Plot

Use the scatter plot analytic to compare two metrics with one another in order to better understand the performance of your containers.

To access the scatter plot analytic [in the Processes page][4] click on the *Show Summary graph* button the select the "Scatter Plot" tab:

{{< img src="graphing/infrastructure/process/scatterplot_selection.png" alt="scatterplot selection" responsive="true" style="width:60%;">}}

By default, the graph groups by the `command` tag key. The size of each dot represents the number of processes in that group, and clicking on a dot displays the individual pids and containers that contribute to the group.

The query at the top of the scatter plot analytic allows you to control your scatter plot analytic:

* Selection of metrics to display.
* Selection of the aggregation method for both metrics.
* Selection of the scale of both X and Y axis (*Linear*/*Log*).

{{< img src="graphing/infrastructure/process/scatterplot.png" alt="container inspect" responsive="true" style="width:80%;">}}

## Enriched Live Containers view

Live Processes adds extra visibility to your container deployments. The [Live Containers][5] feature gives you a similarly comprehensive view of your container and orchestrator environment. When Live Processes is enabled, the process tree for each container is included in the container inspection panel on that page.

{{< img src="graphing/infrastructure/process/containerinspect.png" alt="container inspect" responsive="true" style="width:80%;">}}

## Real-time monitoring

While actively working with the Live Processes, metrics are collected at 2s resolution. This is important for highly volatile metrics such as CPU. In the background, for historical context, metrics are collected at 10s resolution.

## Notes and frequently asked questions

- Collection of open files and current working directory is limited based on the level of privilege of the user running `dd-process-agent`. In the event that `dd-process-agent` is able to access these fields, they are collected automatically.

- Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.

- In container deployments, the `/etc/passwd` file mounted into the `docker-dd-agent` is necessary to collect usernames for each process. This is a public file and the Process Agent does not use any fields except the username. All features except the `user` metadata field function without access to this file.
  - **Note**:  Live Processes only uses the host `passwd` file and does not perform username resolution for users created within containers.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /agent/faq/agent-5-process-collection
[3]: /tagging
[4]: https://app.datadoghq.com/process
[5]: /infrastructure/livecontainers
