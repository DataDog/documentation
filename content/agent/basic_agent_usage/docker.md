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
  text: Collect your Docker logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your Docker processes
- link: "tracing/docker/"
  tag: "Documentation"
  text: Collect your Docker traces
---

If you haven't installed the Agent yet, instructions can be found [in the Datadog Agent Integration page][1]. You can also consult the [official Docker Agent 6 image][2].

**Note**: Docker versions 1.12 and higher are supported.

## How to run it

Head over to [datadoghq.com][1] to get the official installation guide.

For a simple docker run, quickly get started with:

```shell
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              datadog/agent:latest
```

### Environment variables

The Agent is highly customizable; here are the most used environment variables:

#### Global options

- `DD_API_KEY`: your API key (**required**)
- `DD_HOSTNAME`: hostname to use for metrics (if autodetection fails)
- `DD_TAGS`: host tags, separated by spaces. For example: `simple-tag-0 tag-key-1:tag-value-1`

#### Optional collection Agents

These features are disabled by default for security or performance reasons, you need to explicitly enable them:

- `DD_APM_ENABLED`: run the trace-agent along with the infrastructure Agent, allowing the container to accept traces on `8126/tcp`
- `DD_LOGS_ENABLED`: run the [log-agent][3] along with the infrastructure Agent.
- `DD_PROCESS_AGENT_ENABLED`: enable live process collection in the [process-agent][4]. The Live Container View is already enabled by default if the Docker socket is available

#### DogStatsD (custom metrics)

Send custom metrics via [the statsd protocol][5]:

- `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`: listen to DogStatsD packets from other containers, required to send custom metrics
- `DD_HISTOGRAM_PERCENTILES`: histogram percentiles to compute, separated by spaces. The default is "0.95"
- `DD_HISTOGRAM_AGGREGATES`: histogram aggregates to compute, separated by spaces. The default is "max median avg count"
- `DD_DOGSTATSD_SOCKET`: path to the unix socket to listen to. Must be in a `rw` mounted volume.
- `DD_DOGSTATSD_ORIGIN_DETECTION`: enable container detection and tagging for unix socket metrics.

[Learn more about DogStatsD over Unix Domain Sockets with Docker][9].

#### Tagging

We automatically collect common tags from [Docker][6], [Kubernetes][7], [ECS][8], [Swarm, Mesos, Nomad and Rancher][6], and allow you to extract even more tags with the following options:

- `DD_DOCKER_LABELS_AS_TAGS` : extract docker container labels
- `DD_DOCKER_ENV_AS_TAGS` : extract docker container environment variables
- `DD_KUBERNETES_POD_LABELS_AS_TAGS` : extract pod labels

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Either define them in your custom `datadog.yaml`, or set them as JSON maps in these envvars. The map key is the source (`label/envvar`) name, and the map value the Datadog tag name.

#### Ignore containers

Exclude containers from the metrics collection and Autodiscovery, if these are not useful for you. We already exclude Kubernetes and OpenShift `pause` containers by default. See the `datadog.yaml.example` file for more documentation, and examples:

* `DD_AC_INCLUDE`: Space-separated strings of the whitelist of containers to always include e.g `"image:image_name_1 image:image_name_2"`
* `DD_AC_EXCLUDE`: Space-separated strings of the blacklist of containers to exclude e.g `"image:image_name_3 image:image_name_4"`

**Note**: The `docker.containers.running`, `.stopped`, `.running.total` and `.stopped.total` metrics are not affected by these settings and always count all containers. This does not affect your per-container billing.

#### Misc

- `DD_PROCESS_AGENT_CONTAINER_SOURCE`: Overrides container source auto-detection to force a single source. e.g `"docker"`, `"ecs_fargate"`, `"kubelet"`

### Configuration files

You can also mount YAML configuration files in the `/conf.d` folder. They will automatically be copied to `/etc/datadog-agent/conf.d/` when the container starts. The same can be done for the `/checks.d` folder: any Python files in the `/checks.d` folder will automatically be copied to `/etc/datadog-agent/checks.d/` when the container starts.

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

Now when the container starts, all files in `/opt/datadog-agent-conf.d` with a `.yaml` extension will be copied to `/etc/datadog-agent/conf.d/`. Note that to add new files you will need to restart the container.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: https://hub.docker.com/r/datadog/agent/
[3]: /logs/
[4]: /graphing/infrastructure/process/
[5]: https://docs.datadoghq.com/developers/dogstatsd/
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[9]: /developers/dogstatsd/unix_socket
