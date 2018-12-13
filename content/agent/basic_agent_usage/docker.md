---
title: Basic Docker Agent usage
kind: documentation
aliases:
    - /guides/basic_agent_usage/docker/
further_reading:
- link: "agent/faq/getting-further-with-docker"
  tag: "FAQ"
  text: "Getting further with Docker"
- link: "agent/faq/docker-jmx"
  tag: "FAQ"
  text: "Docker JMX"
- link: "logs/docker"
  tag: "Documentation"
  text: "Collect your Docker logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your Docker processes"
- link: "tracing/docker/"
  tag: "Documentation"
  text: "Collect your Docker traces"
---

To install the Datadog Container Agent, follow the [Agent Installation Instructions][1] or see the information below. The [official Docker Agent 6 image][2] can also be consulted.

**Note**: Docker versions 1.12 and higher are supported.

## How to run it

Get started with a basic docker run using:

```shell
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              datadog/agent:latest
```

### Environment variables

The Agent is highly customizable. Here are the most used environment variables:

#### Global options

| Env Variable  | Description                                                                      |
|---------------|----------------------------------------------------------------------------------|
| `DD_API_KEY`  | Your Datadog API key (**required**)                                              |
| `DD_HOSTNAME` | Hostname to use for metrics (if autodetection fails)                             |
| `DD_TAGS`     | Host tags separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1` |

#### Optional collection Agents

Optional collection Agents are disabled by default for security or performance reasons. Use these environment variables to enable them:

| Env Variable               | Description                                                                                                                                        |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Run the trace-agent along with the infrastructure Agent, allowing the container to accept traces on `8126/tcp`.                                    |
| `DD_APM_NON_LOCAL_TRAFFIC` | Required to allow the Agent container to accept traces at `8126/tcp` from other containers.                                                        |
| `DD_LOGS_ENABLED`          | Run the [log-agent][3] along with the infrastructure Agent.                                                                                        |
| `DD_PROCESS_AGENT_ENABLED` | Enable live process collection in the [process-agent][4]. The Live Container View is already enabled by default if the Docker socket is available. |

#### DogStatsD (custom metrics)

Send custom metrics via [the statsd protocol][5]:

| Env Variable                     | Description                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Listen to DogStatsD packets from other containers (required to send custom metrics).              |
| `DD_HISTOGRAM_PERCENTILES`       | The histogram percentiles to compute (separated by spaces). The default is "0.95".                |
| `DD_HISTOGRAM_AGGREGATES`        | The histogram aggregates to compute (separated by spaces). The default is "max median avg count". |
| `DD_DOGSTATSD_SOCKET`            | Path to the unix socket to listen to. Must be in a `rw` mounted volume.                           |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Enable container detection and tagging for unix socket metrics.                                   |

[Learn more about DogStatsD over Unix Domain Sockets with Docker][6].

#### Tagging

Datadog automatically collects common tags from [Docker][7], [Kubernetes][8], [ECS][9], [Swarm, Mesos, Nomad and Rancher][7], and allow you to extract even more tags with the following options:

| Env Variable                            | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Extract docker container labels                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Extract docker container environment variables            |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extract pod labels                                        |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extract pod annotations                                   |
| `DD_COLLECT_EC2_TAGS`                   | Extract custom EC2 tags without using the AWS integration |

Define these settings in your custom `datadog.yaml` or set them as JSON maps in these envvars. The map key is the source (`label/envvar`) name, and the map value the Datadog tag name.

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

#### Ignore containers

Exclude containers from metrics collection and Autodiscovery. Datadog excludes Kubernetes and OpenShift `pause` containers by default. See the `datadog.yaml.example` file for more documentation, and examples:

| Env Variable    | Description                                                                                                             |
|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | Whitelist of containers to include (separated by spaces). For example: `"image:image_name_1 image:image_name_2"` |
| `DD_AC_EXCLUDE` | Blacklist of containers to exclude (separated by spaces). For example: `"image:image_name_3 image:image_name_4"`        |

**Note**: The `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings and always count all containers. This does not affect your per-container billing.

#### Misc

| Env Variable                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"` |

### Configuration files

If you mount YAML configuration files in the `/conf.d` folder, they are automatically copied to `/etc/datadog-agent/conf.d/` when the container starts. The same can be done for the `/checks.d` folder. Any Python files in the `/checks.d` folder are automatically copied to `/etc/datadog-agent/checks.d/` when the container starts.

1. Create a configuration folder on the host and write your YAML files in it. The examples below can be used for the `/checks.d` folder as well.

    ```
    mkdir /opt/datadog-agent-conf.d
    touch /opt/datadog-agent-conf.d/nginx.yaml
    ```

2. When creating the container, mount this new folder to `/conf.d`.
    ```
    docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -v /opt/datadog-agent-conf.d:/conf.d:ro \
      -e API_KEY={your_api_key_here} \
       datadog/agent:latest
    ```

    _The important part here is `-v /opt/datadog-agent-conf.d:/conf.d:ro`_

Now when the container starts, all files in `/opt/datadog-agent-conf.d` with a `.yaml` extension are copied to `/etc/datadog-agent/conf.d/`. **Note**: To add new files restart the container.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: https://hub.docker.com/r/datadog/agent
[3]: /logs
[4]: /graphing/infrastructure/process
[5]: /developers/dogstatsd
[6]: /developers/dogstatsd/unix_socket
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
