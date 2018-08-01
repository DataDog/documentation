---
title: Docker Log collection
kind: documentation
further_reading:
- link: "logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: "logs/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: Learn more about parsing
aliases:
  - /logs/docker
---

## Overview

Datadog Agent version 6 and greater can collect logs from containers.
Two installations are possible:

- on the host where the Agent is external to the Docker environment
- or by deploying its containerized version in the Docker environment

You can then choose to collect all the logs from all your environment's containers, or to filter by container image name or container label to cherry pick what logs should be collected.

## Setup
### Option 1: Host installation

Install the [latest version of the Agent 6][1] on your host.

The Agent can collect logs from [files on the host][2] or from [container stdout/stderr](#configuration-file-example).

To collect logs from all your containers without filtering by image or label, add the following at the end of docker.d/conf.yaml in your agent's conf.d directory:

```
logs:
    - type: docker
      service: docker
```

**Important note**: Integration pipelines and processors will not be installed automatically as the source tag is not set. The integration setup is described below and it automatically installs integration pipelines that parse your logs and extract all the relevant information from them.

### Option 2: Container installation

As explained above, the Agent also has a [containerized][3] installation.

First, let’s create one directory on the host that we will later mount on the containerized Agent:

- `/opt/datadog-agent/run`: to make sure we do not lose any logs from containers during restarts or network issues we store on the host the last line that was collected for each container in this directory

To run a Docker container which embeds the Datadog Agent to monitor your host use the following command:

```
docker run -d --name datadog-agent \
           -e DD_API_KEY=<YOUR_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent:latest
```

Important notes:

- The Docker integration is enabled by default, as well as [autodiscovery][5] in auto configuration mode (remove the listeners: -docker section in `datadog.yaml` to disable it).

- We recommend always picking the latest version of Datadog Agent 6. [Consult the full list of available images for Agent 6][6].

The commands related to log collection are the following:

* `-e DD_LOGS_ENABLED=true`: this parameter enables log collection when set to true. The Agent now looks for log instructions in configuration files.
* `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`: this parameter adds a log configuration that enables log collection for all containers (see `Option 1` below)
* `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`: mount the directory we created to store pointers for each container's logs to make sure we do not lose any.

### Activate Log Collection

#### Option 1: Configuration file

Set the `source` attribute to start using integrations. This allows Datadog to identify the log source for each container.

For containerized installation, begin by creating the configuration directory on the host directly:

- ` /opt/datadog-agent/conf.d`: this is the folder in which integration instructions are provided. Any configuration file added there is automatically picked up by the containerized Agent when restarted. To learn more about this topic refer to the dedicated documentation on [how to enable integrations with the docker agent][4].

Then, mount the directory by adding `-v /opt/datadog-agent/conf.d:/conf.d:ro` in the run command of the containerized agent.

To set the source for a given container filtered by image or label or name, update the log section in an integration or custom .yaml file in your agent's `conf.d` directory or the directory we just created for containerized installation.

```yaml
#Log section
logs:

    # - type : (mandatory) type of log input source (tcp / udp / file / docker)
    #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    #   service : (mandatory) name of the service owning the log
    #   source : (mandatory) attribute that defines which integration is sending the logs
    #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    #   tags: (optional) add tags to each logs collected

  - type: docker
    image: <IMAGE_NAME>    #or label: <MY_LABEL> or name: <CONTAINER_NAME>
    source: <SOURCE>
    sourcecategory: <SOURCE_CATEGORY>
    service: <SERVICE>
```

When filtering on the container image, both exact container image name or short names are supported.
If you have one container running `library/httpd:latest`, the following filtering matches this image name:

* - `image: httpd`
* - `image: library/httpd`
* - `image: httpd:latest`
* - `image: library/httpd:latest`

For more examples of configuration files or Agent capabilities (such as filtering, redacting, multiline, …) read [the advanced log collection functions][7].

#### Option 2: Autodiscovery

Since version 6.2 of the Datadog Agent, you can configure log collection directly in the container labels.

Autodiscovery expects labels to follow this format, depending on the file type:

* Dockerfile: `LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'`
* docker-compose.yaml:

  ```
  labels:
    com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
  ```

* run command: `-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'`

**Docker Example: NGINX Dockerfile**:

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

**Java Multiline logs: Docker compose**

For multiline logs like stack traces, the agent has a [multiline processing rules][9] in order to properly aggregate them into a single log.

Example log:

```
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Use the below label on your Java containers to make sure that the above log is properly collected:

  ```
  labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}]}]'
  ```

Check our [multi-line processing rule documentation][10] to get more pattern examples.

**Kubernetes**

If you are running in Kubernetes and do not use container labels, pod annotation will soon be supported. Check our [Autodiscovery Guide][8] for more information about Autodiscovery setup and examples.

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
[10]: https://docs.datadoghq.com/logs/log_collection/#multi-line-aggregation
