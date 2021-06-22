---
title: Compose and the Datadog Agent
kind: faq
further_reading:
    - link: 'https://github.com/DataDog/docker-compose-example'
      tag: 'Github'
      text: 'Using Docker Compose with Datadog Example'
    - link: '/agent/docker/'
      tag: 'Documentation'
      text: 'Datadog Docker Agent documentation'
    - link: '/agent/docker/log/'
      tag: 'Documentation'
      text: 'Datadog Docker Log collection documentation'
---

[Compose][1] is a Docker tool that simplifies building applications on Docker by allowing you to define, build and run multiple containers as a single application.

While the [single container installation instructions][2] gets the stock Datadog Agent container running, you may want to enable integrations for other containerized services that are part of your Compose application. To do this, you need to combine integration YAML files with the base Datadog Agent image to create your Datadog Agent container. Then, add your container to the Compose YAML.

### Redis example

The following is an example of how you can monitor a Redis container using Compose. The file structure is:

```text
|- docker-compose.yml
|- datadog
  |- Dockerfile
  |- conf.d
    |-redisdb.yaml
```

The `docker-compose.yml` file describes how your containers work together and sets some of the configuration details for the containers.

```yaml
version: '3'
services:
  redis:
    image: redis
  datadog:
    build: datadog
    links:
     - redis # Connect the Datadog Agent container to the Redis container
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

The `redisdb.yaml` is patterned after the [redisdb.yaml.example file][3] and tells the Datadog Agent to look for Redis on the host named `redis` (defined in `docker-compose.yaml` above) and to use the standard Redis port:

```yaml
init_config:

instances:
    - host: redis
      port: 6379
```

The `Dockerfile` is used to instruct Docker compose to build a Datadog Agent image including the `redisdb.yaml` file at the right location:

```
FROM gcr.io/datadoghq/agent:latest
ADD conf.d/redisdb.yaml /etc/datadog-agent/conf.d/redisdb.yaml
```


### Log collection

The `docker-compose.yml` can be extended to allow the Datadog Agent to collect container logs.

```yaml
version: '3'
services:
  redis:
    image: redis
    labels:
      com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
  datadog:
    build: datadog
    links:
     - redis # Connect the Datadog Agent container to the Redis container
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
     - DD_LOGS_ENABLED=true
     - DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true # To read log from file instead of the docker socket
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
     - /var/lib/docker/containers:/var/lib/docker/containers:ro
```

**Note**: The above configuration only collects logs from the `Redis` container. Logs can be collected from the Datadog Agent by adding a similar `com.datadoghq.ad.logs` label. Log collection can also be explicitly enabled for all containers by setting the environment variable `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` to `true`. See the complete [Docker log collection documentation][4] for additional details.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: /agent/logs/
