---
title: Compose and the Datadog Agent
kind: faq
further_reading:
- link: "https://github.com/DataDog/docker-compose-example"
  tag: "Github"
  text: "Using Docker Compose with Datadog Example"
- link: "/agent/docker"
  tag: "Documentation"
  text: "Datadog Docker Agent documentation"
---

[Compose][1] is a Docker tool that simplifies building applications on Docker by allowing you to define, build and run multiple containers as a single application.

While the [single container installation instructions][2] gets the stock Datadog Agent container running, you may want to enable integrations for other containerized services that are part of your Compose application. To do this, you need to combine integration YAML files with the base Datadog Agent image to create your Datadog Agent container. Then, add your container to the Compose YAML.

### Redis example

The following is an example of how you can monitor a Redis container using Compose. The file structure is:

    |- docker-compose.yml
    |- datadog
        |- Dockerfile
        |- conf.d
           |-redisdb.yaml

The `docker-compose.yml` file describes how your containers work together and sets some of the configuration details for the containers.

{{< tabs >}}
{{% tab "US site" %}}

```yaml
version: '3'
services:
  redis:
    image: redis
  datadog:
    links:
     - redis # Connect the Datadog Agent container to the Redis container
    image: datadog/agent:latest
    environment:
     - DD_API_KEY=${DD_API_KEY}
   volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

{{% /tab %}}
{{% tab "EU site" %}}

```yaml
version: '3'
services:
  redis:
    image: redis
  datadog:
    links:
     - redis # Connect the Datadog Agent container to the Redis container
    image: datadog/agent:latest
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE=datadoghq.eu
   volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

{{% /tab %}}
{{< /tabs >}}

The `redisdb.yaml` is patterned after the [redisdb.yaml.example file][3] and tells the Datadog Agent to look for Redis on the host named `redis` (defined in `docker-compose.yaml` above) and to use the standard Redis port:

    init_config:

    instances:
      - host: redis
        port: 6379

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /agent/docker
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
