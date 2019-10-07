---
title: Docker Log collection
kind: documentation
aliases:
  - /logs/docker
  - /logs/languages/docker
  - /logs/log_collection/docker
further_reading:
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
---

## Overview

Datadog Agent 6+ collects logs from containers. Two types of installation are available:

- On the host, where the Agent is external to the Docker environment
- By deploying the containerized Agent in the Docker environment

Then, collect all the logs from your environment's containers, or filter by container image, name, or container label to choose the logs collected.

This documentation discusses how to collect logs from all running containers, as well as how to leverage Autodiscovery to activate log integrations.

## Setup

### One-step install to collect all the container logs

The first step is to install the Agent (whether the containerized version or directly on the host) and to enable log collection for all the containers.

{{< tabs >}}
{{% tab "Container Installation" %}}

To run a [Docker container][1] that embeds the Datadog Agent to monitor your host, use the following command:

```
docker run -d --name datadog-agent \
           -e DD_API_KEY=<YOUR_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_AC_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent:latest
```

It is recommended that you pick the latest version of the Datadog Agent. Consult the full list of available [images for Agent v6][2] on Docker Hub.

The commands related to log collection are:

| Command                                               | Description                                                                                                                                                  |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-e DD_LOGS_ENABLED=true`                             | Enables log collection when set to `true`. The Agent looks for log instructions in configuration files.                                                      |
| `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`        | Adds a log configuration that enables log collection for all containers.                                                                                     |
| `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` | To prevent loss of container logs during restarts or network issues, the last log line collected for each container in this directory is stored on the host. |
| `-e DD_AC_EXCLUDE="name:datadog-agent"`               | Prevents the Datadog Agent from collecting and sending its own logs. Remove this parameter if you want to collect the Datadog Agent logs.                    |
| `-v /var/run/docker.sock:/var/run/docker.sock:ro`     | Logs are collected from container `stdout/stderr` from the Docker socket.                                                                                    |


[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://hub.docker.com/r/datadog/agent/tags
{{% /tab %}}
{{% tab "Host Installation" %}}

Install the [latest version of Agent 6][1] on your host. The Agent can collect logs from [files on the host][2] or from container `stdout`/`stderr`.

Collecting logs is *disabled* by default in the Datadog Agent. To enable it, add the following lines in your `datadog.yaml` configuration file:

```
logs_enabled: true
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
logs_config:
  container_collect_all: true
```

[Restart the Agent][3] to see all your container logs in Datadog.


[1]: /agent/basic_agent_usage
[2]: /agent/logs/#custom-log-collection
[3]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**Important notes**:

* `source` and `service` default to the `short_image` tag value in Datadog Agent 6.8+.
The source and service values can be overridden with Autodiscovery as described below. Setting the `source` value to an integration name results in the installation of integration Pipelines that parse your logs and extract relevant information from them.

* Logs coming from container `Stderr` have a default status of `Error`.

* If using the *journald* logging driver instead of Docker's default json-file logging driver, see the [journald integration][1] documentation for details regarding the setup for containerized environments.

### Activate Log Integrations

In Datadog Agent 6.8+, `source` and `service` default to the `short_image` tag value. This allows Datadog to identify the log source for each container and automatically install the corresponding integration.

The container short image name might not match the integration name for custom images, and can be overwritten to better reflect the name of your application. This can be done with [Datadog Autodiscovery][2] and [pod annotations in Kubernetes][3] or container labels.

Autodiscovery expects labels to follow this format, depending on the file type:

{{< tabs >}}
{{% tab "Dockerfile" %}}

Add the following `LABEL` to your Dockerfile:

```
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker-Compose" %}}

Add the following label in your `docker-compose.yaml` file:

```
labels:
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Run Command" %}}

Add the following label as a run command:

```
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

Where `<LOG_CONFIG>` is the log collection configuration you would find inside an integration configuration file. [See log collection configuration to learn more][4]

#### Examples

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

The following Dockerfile enables the NGINX log integration on the corresponding container (`service` value can be changed):

```
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

To enable both the metric and logs NGINX integrations:

```
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java multi-line logs" %}}

For multi-line logs like stack traces, the Agent has [multi-line processing rules][1] to aggregate lines into a single log.

Example log (Java stack traces):

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Use the `com.datadoghq.ad.logs` label as below on your containers to make sure that the above log is properly collected:

  ```
  labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
  ```
See the [multi-line processing rule documentation][1] to get more pattern examples.


[1]: /agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}
{{% tab "Kubernetes" %}}

If you are running Kubernetes, pod annotations can be used.

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/nginx.logs: '[{"source":"nginx","service":"webapp"}]'
      labels:
        app: webapp
      name: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:latest

```

Refer to the [Autodiscovery guide][1] for setup, examples, and more information about Autodiscovery.


[1]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
{{% /tab %}}
{{< /tabs >}}

**Note**: Autodiscovery features can be used with or without the `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` environment variable. Choose one of the following options:

* Use container labels or pod annotations to choose the containers to collect logs from.
* Use the environment variable to collect logs from all containers and then override the default `source` and `service` values.
* Add processing rules for the wanted subset of containers.

### Filter containers

It is possible to filter logs, metrics, and Autodiscovery using the following methods. This can be useful to prevent the collection of the Datadog Agent logs.

{{< tabs >}}
{{% tab "Environment variable" %}}

Two environment variables are available to include or exclude a list of containers filtered by image or container name:

* `DD_AC_INCLUDE`: whitelist of containers to always include
* `DD_AC_EXCLUDE`: blacklist of containers to exclude

The format for these options is space-separated strings. For example, if you only want to monitor two images, and exclude the rest, specify:

```
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:cp-kafka image:k8szk"
```

Or to exclude a specific container name:

```
DD_AC_EXCLUDE = "name:datadog-agent"
```

{{% /tab %}}

{{% tab "Configuration File" %}}

Two parameters are available in `datadog.yaml` to include or exclude a list of containers filtered by image or container name:

* `ac_exclude`: whitelist of containers to always include
* `ac_include`: blacklist of containers to exclude

For example, if you only want to monitor two images, and exclude the rest, specify:

```
ac_exclude: ["image:.*"]
ac_include: ["image:cp-kafka", "image:k8szk"]
```

Or to exclude the Datadog Agent:

```
ac_exclude = ["name:datadog-agent"]
```

{{% /tab %}}
{{< /tabs >}}

## Short Lived containers

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) every 1 seconds.

 Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.

For Kubernetes environements, refer to the [Kubernetes short lived container documentation][5]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/journald
[2]: /agent/autodiscovery
[3]: /agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[4]: /agent/logs/#custom-log-collection
[5]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#short-lived-containers
