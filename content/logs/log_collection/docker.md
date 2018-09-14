---
title: Docker Log collection
kind: documentation
aliases:
  - /logs/docker
  - /logs/languages/docker/
further_reading:
- link: "logs/explorer"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
---

## Overview

Datadog Agent version 6 and greater can collect logs from containers.
Two installations are possible:

- on the host where the Agent is external to the Docker environment
- or by deploying its containerized version in the Docker environment

You can then choose to collect all the logs from all your environment's containers, or to filter by container image, name, or container label to cherry pick what logs should be collected.

This documentation discusses how to collect logs from all running containers, as well as how to leverage the Autodiscovery feature to activate Log Integrations.

## Setup

### One-step install to collect all the container logs

The first step is to install the Agent (whether the containerized version or directly on the host) and to enable log collection for all the containers.

{{< tabs >}}
{{% tab "Container Installation" %}}

The Agent has a [containerized](https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent) installation.
To run a Docker container that embeds the Datadog Agent to monitor your host use the following command:

```
docker run -d --name datadog-agent \
           -e DD_API_KEY=<YOUR_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_AC_EXCLUDE="name:dd-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent:latest
```

It is recommended to pick the latest version of the Datadog Agent. [Consult the full list of available images for Agent v6](https://hub.docker.com/r/datadog/agent/tags/).

The commands related to log collection are the following:

* `-e DD_LOGS_ENABLED=true`: this parameter enables log collection when set to `true`. The Agent looks for log instructions in configuration files.
* `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`: this parameter adds a log configuration that enables log collection for all containers (see `Option 1` below)
* `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`: to make sure you do not lose any logs from containers during restarts or network issues, the last line that was collected for each container in this directory is stored on the host.
* `-e DD_AC_EXCLUDE="name:dd-agent"`: to prevent the Datadog Agent from collecting and sending its own logs. Remove this parameter if you want to collect the Datadog Agent logs.

**Important note**: Integration Pipelines and Processors will not be installed automatically, as the source and service are set to the `docker` generic value.
The source and service values can be overriden thanks to Autodiscovery as described below; it automatically installs integration Pipelines that parse your logs and extract all the relevant information from them.

{{% /tab %}}
{{% tab "Host Installation" %}}

Install the [latest version of the Agent 6](https://docs.datadoghq.com/logs/#getting-started-with-the-agent) on your host.

The Agent can collect logs from [files on the host](https://docs.datadoghq.com/logs/#custom-log-collection) or from [container stdout/stderr](#configuration-file-example).

Collecting logs is *disabled* by default in the Datadog Agent. Add the following to it in `datadog.yaml`: 

```
logs_enabled: true
```

To collect logs from all your containers without any filtering, add the following at the end of `docker.d/conf.yaml` in your agent's `conf.d` directory:

```
logs:
    - type: docker
      service: docker
      source: docker
```

[Restart the Agent](https://docs.datadoghq.com/agent/faq/agent-commands/?tab=agentv6#restart-the-agent) to see all your container logs in your platform.

**Important note**: Integration Pipelines and Processors are not installed automatically as the source and service are set to the `docker` generic value.
The source and service values can be overriden thanks to Autodiscovery as described below; it automatically installs integration Pipelines that parse your logs and extract all the relevant information from them.

{{% /tab %}}
{{< /tabs >}}

### Activate Log Integrations

The second step is to use Autodiscovery to customize the `source` and `service` value. This allows Datadog to identify the log source for each container.

Since version 6.2 of the Datadog Agent, you can configure log collection directly in the container labels. 
Pod annotations are also supported for Kubernetes environment, see the [Kubernetes Autodiscovery documentation][12].

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

#### Examples

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

The following Dockerfile launches an NGINX container with Autodiscovery enabled:

```
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java Multiline logs" %}}

For multi-line logs like stack traces, the Agent has a [multi-line processing rules][13] feature in order to properly aggregate them into a single log.

Example log (Java Stack traces):

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Use the `com.datadoghq.ad.logs` label as below on your containers to make sure that the above log is properly collected:

  ```
  labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}]}]'
  ```
See the [multi-line processing rule documentation][13] to get more pattern examples.

[13]: https://docs.datadoghq.com/logs/log_collection/#multi-line-aggregation

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you are running in Kubernetes, pod annotations can be used.

```
apiVersion: extensions/v1beta1
kind: ReplicaSet
metadata:
  name: nginx
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/nginx.logs: '[{"source":"nginx","service":"webapp"}]'
      labels:
        app: webapp
      name: nginx
    spec:
      containers:
        name: nginx
```

Check our [Autodiscovery Guide][12] for setup, examples, and more information about Autodiscovery.

[12]: https://docs.datadoghq.com/agent/autodiscovery/#template-source-kubernetes-pod-annotations

{{% /tab %}}
{{< /tabs >}}

Note that Autodiscovery features can be used with or without the `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` environment variable.
You can therefore use container labels or pod annotations to cherry pick the containers from which you want to collect logs . Or, use the environment variable to ensure you collect logs from all containers and then override the default `source` and `service` value or add processing rules for the wanted subset of containers.
 
#### Short lived containers

Thanks to Autodiscovery, short lived containers are detected as soon as they are started to ensure their logs are properly collected.
If you are using the host installation of the agent, add this in your `datadog.yaml` file (it is automatically added for the containerized version):

```
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

### Filter containers

You can exclude containers from the log and metric collection and Autodiscovery if these are not useful for you.
This can be useful to prevent the collection of the Datadog Agent logs.

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
DD_AC_EXCLUDE = "name:dd-agent"
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
ac_exclude = ["name:dd-agent"]
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/#getting-started-with-the-agent
[2]: /logs/#custom-log-collection
[3]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[4]: https://github.com/DataDog/docker-dd-agent#enabling-integrations
[5]: /agent/autodiscovery/
[6]: https://hub.docker.com/r/datadog/agent/tags/
[7]: /logs/#filter-logs
[8]: https://docs.datadoghq.com/agent/autodiscovery/#template-source-docker-label-annotations
[9]: https://docs.datadoghq.com/logs/log_collection/#multi-line-aggregation
[11]: https://docs.datadoghq.com/agent/faq/agent-commands/?tab=agentv6#restart-the-agent
[12]: https://docs.datadoghq.com/agent/autodiscovery/#template-source-kubernetes-pod-annotations
