---
title: Docker Log collection
kind: documentation
aliases:
    - /logs/docker
    - /logs/languages/docker
    - /logs/log_collection/docker
further_reading:
    - link: 'logs/explorer'
      tag: 'Documentation'
      text: 'Learn how to explore your logs'
    - link: "/agent/docker/apm/"
      tag: "Documentation"
      text: "Collect your application traces"
    - link: "/agent/docker/prometheus/"
      tag: "Documentation"
      text: "Collect your Prometheus metrics"
    - link: "/agent/docker/integrations/"
      tag: "Documentation"
      text: "Collect automatically your applications metrics and logs"
    - link: "/agent/guide/autodiscovery-management/"
      tag: "Documentation"
      text: "Limit data collection to a subset of containers only"
    - link: "/agent/docker/tag/"
      tag: "Documentation"
      text: "Assign tags to all data emitted by a container"
---

## Overview

Datadog Agent 6+ collects logs from containers. Two types of installation are available:

Configuring log collection depends on your current environment. Choose one of the following installations to get started:

- If your environment writes **all** logs to `stdout`/`stderr`, follow the [containerized Agent](?tab=containerized-agent#installation) installation.

- If you cannot deploy the containerized Agent and your container writes **all** logs to `stdout`/`stderr`, follow the [host Agent](?tab=hostagent#installation) installation to enable containerized logging within your Agent configuration file.

- If your container writes logs to files (only partially writes logs to `stdout`/`stderr` and writes logs to files OR fully writes logs to files), follow the [host Agent with custom log collection](?tab=hostagentwithcustomlogging#installation) installation or follow the [containerized Agent](?tab=containerized-agent#installation) installation and check the [log collection from file with Autodiscovery configuration example](?tab=logcollectionfromfile#examples).

## Installation

{{< tabs >}}
{{% tab "Container Installation" %}}

To run a [Docker container][1] that embeds the Datadog Agent to monitor your host, use the following command:

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY="<DATADOG_API_KEY>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

**Note**: On Windows systems, run this command without volume mounts. That is:

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY="<DATADOG_API_KEY>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           gcr.io/datadoghq/agent:latest
```

It is recommended that you pick the latest version of the Datadog Agent. Consult the full list of available [images for Agent v6][2] on GCR.

The commands related to log collection are:

| Command                                               | Description                                                                                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-e DD_LOGS_ENABLED=true`                             | Enables log collection when set to `true`. The Agent looks for log instructions in configuration files.                                                          |
| `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`        | Adds a log configuration that enables log collection for all containers.                                                                                         |
| `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` | To prevent loss of container logs during restarts or network issues, the last log line collected for each container in this directory is stored on the host.     |
| `-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`               | Prevents the Datadog Agent from collecting and sending its own logs and metrics. Remove this parameter if you want to collect the Datadog Agent logs or metrics. This parameter value supports regular expressions. |
| `-v /var/run/docker.sock:/var/run/docker.sock:ro`     | Logs are collected from container `stdout/stderr` from the Docker socket.                                                                                        |

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "Host Agent" %}}

1. Install the [latest version of the Agent][1] on your host.
2. Collecting logs is _disabled_ by default in the Datadog Agent. To enable it, add the following lines in your `datadog.yaml` configuration file:

    ```yaml
    logs_enabled: true
    listeners:
        - name: docker
    config_providers:
        - name: docker
          polling: true
    logs_config:
        container_collect_all: true
    ```

3. [Restart the Agent][2] to see all of your container logs in Datadog.

[1]: /agent/basic_agent_usage/
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Host Agent with Custom Logging" %}}

1. Install the [latest version of the Agent][1] on your host.
2. Follow the [Custom Log Collection documentation][2] to tail files for logs.

    To gather logs from your `<APP_NAME>` application stored in `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` create a `<APP_NAME>.d/conf.yaml` file at the root of your [Agent's configuration directory][3] with the following content:

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [Restart the Agent][4] to see all of your container logs in Datadog.

[1]: /agent/basic_agent_usage/
[2]: /agent/logs/#custom-log-collection
[3]: /agent/guide/agent-configuration-files/
[4]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**Important notes**:

- Container metadata is not retrieved with custom log collection, therefore the Agent does not automatically assign container tags to logs. Use [custom tags][1] to create container tags.

- `source` and `service` default to the `short_image` tag value in Datadog Agent 6.8+. The source and service values can be overridden with Autodiscovery as described below. Setting the `source` value to an integration name results in the installation of integration Pipelines that parse your logs and extract relevant information from them.

- Logs coming from container `Stderr` have a default status of `Error`.

- If using the _journald_ logging driver instead of Docker's default json-file logging driver, see the [journald integration][2] documentation for details regarding the setup for containerized environments. Refer to the [journald filter units][2] documentation for more information on parameters for filtering.

## Log integrations

In Datadog Agent 6.8+, `source` and `service` default to the `short_image` tag value. This allows Datadog to identify the log source for each container and automatically install the corresponding integration.

The container short image name might not match the integration name for custom images, and can be overwritten to better reflect the name of your application. This can be done with [Datadog Autodiscovery][1] and [pod annotations in Kubernetes][3] or container labels.

Autodiscovery expects labels to follow this format, depending on the file type:

{{< tabs >}}
{{% tab "Dockerfile" %}}

Add the following `LABEL` to your Dockerfile:

```text
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker-Compose" %}}

Add the following label in your `docker-compose.yaml` file:

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "Run Command" %}}

Add the following label as a run command:

```text
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

Where `<LOG_CONFIG>` is the log collection configuration you would find inside an integration configuration file. [See log collection configuration to learn more][4].

**Note**: When configuring the `service` value through docker labels, Datadog recommends using unified service tagging as a best practice. Unified service tagging ties all Datadog telemetry together, including logs, through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][5] documentation.

### Examples

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

The following Dockerfile enables the NGINX log integration on the corresponding container (`service` value can be changed):

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

To enable both the metric and logs NGINX integrations:

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java multi-line logs" %}}

For multi-line logs like stack traces, the Agent has [multi-line processing rules][1] to aggregate lines into a single log.

Example log (Java stack traces):

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Use the `com.datadoghq.ad.logs` label as below on your containers to make sure that the above log is properly collected:

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

See the [multi-line processing rule documentation][1] to get more pattern examples.


[1]: /agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}
{{% tab "From file" %}}

The Agent v7.25.0+/6.25.0+ can directly collect logs from a file based on a container Autodiscovery label. To collect these logs, use the `com.datadoghq.ad.logs` label as shown below on your containers to collect `/logs/app.log`:

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

Logs collected from a file are tagged with the container metadata. Log collection is linked to the container life cycle, as soon as the container stops, log collection from that file stops.


**Notes**:

- The file path is **relative** to the Agent, so the directory containing the file should be shared between the container running the application and the Agent container. For example, if the container mounts `/logs` each container logging to file may mount a volume such as `/logs/app` where the log file is written.

- When using this kind of label on a container, its `stderr`/`stdout` logs are not collected automatically. If collection from both `stderr`/`stdout` and a file are needed it should be explicity enabled by using a label, for example:
```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- When using this kind of combination, `source` and `service` have no default value and should be explicitly set in the Autodiscovery label.   

{{% /tab %}}
{{< /tabs >}}

**Note**: Autodiscovery features can be used with or without the `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` environment variable. Choose one of the following options:

- Use container labels or pod annotations to choose the containers to collect logs from.
- Use the environment variable to collect logs from all containers and then override the default `source` and `service` values.
- Add processing rules for the wanted subset of containers.

## Advanced log collection

Use Autodiscovery log labels to apply advanced log collection processing logic, for example:

- [Filter logs before sending them to Datadog][6].
- [Scrub sensitive data from your logs][7].
- [Proceed to multi-line aggregation][8].

## Filter containers

It is possible to manage from which containers you want to collect logs. This can be useful to prevent the collection of the Datadog Agent logs for instance. See the [Container Discovery Management][9] to learn more.

## Short lived containers

For a Docker environment, the Agent receives container updates in real time through Docker events. The Agent extracts and updates the configuration from the container labels (Autodiscovery) every 1 seconds.

Since Agent v6.14+, the Agent collects logs for all containers (running or stopped) which means that short lived containers logs that have started and stopped in the past second are still collected as long as they are not removed.

For Kubernetes environments, refer to the [Kubernetes short lived container documentation][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[2]: /agent/logs/?tab=tailfiles
[3]: /integrations/journald/
[4]: /agent/docker/integrations/
[5]: /agent/kubernetes/integrations/?tab=kubernetespodannotations#configuration
[6]: /agent/logs/#custom-log-collection
[7]: /getting_started/tagging/unified_service_tagging
[8]: /agent/logs/advanced_log_collection/?tab=docker#filter-logs
[9]: /agent/logs/advanced_log_collection/?tab=docker#scrub-sensitive-data-from-your-logs
[10]: /agent/kubernetes/log/?tab=daemonset#short-lived-containers
