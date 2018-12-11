---
title: Compose and the Datadog Agent
kind: faq
---

[Compose][1] is a Docker tool that simplifies building applications on Docker by allowing you to define, build and run multiple containers as a single application.

While the [Single Container Installation instructions][2] gets the stock Datadog Agent container running, you will most likely want to enable integrations for other containerized services that are part of your Compose application.  
To do this, you'll need to combine integration YAML files with the base Datadog Agent image to create your Datadog Agent container. Then you'll need to add your container to the Compose YAML.

##### Example: Monitoring Redis

Let's look at how you would monitor a Redis container using Compose. Our example file structure is:

    |- docker-compose.yml
    |- datadog
        |- Dockerfile
        |- conf.d
           |-redisdb.yaml

First we'll take a look at the `docker-compose.yml` that describes how our containers work together and sets some of the configuration details for the containers.

```yaml
version: "2"
services:
  # Redis container
  redis:
    image: redis
  # Agent container
  datadog:
    build: datadog
    links:
     - redis # Ensures datadog container can connect to redis container
    environment:
     - API_KEY=__your_datadog_api_key_here__
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/mounts:/host/proc/mounts:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

In this file, we can see that Compose will run the Docker image `redis` and it will also build and run a `datadog` container. By default it will look for a matching directory called `datadog` and run the `Dockerfile` in that directory.

Our `Dockerfile` simply takes the standard [Datadog docker image][3] and places a copy of the `redisdb.yaml` integration configuration into the appropriate directory:

    FROM datadog/docker-dd-agent
    ADD conf.d/redisdb.yaml /etc/dd-agent/conf.d/redisdb.yaml

Finally our `redisdb.yaml` is patterned after the [redisdb.yaml.example file][4] and tells the Datadog Agent to look for Redis on the host named `redis` (defined in our `docker-compose.yaml` above) and the standard Redis port 6379:

    init_config:

    instances:
      - host: redis
        port: 6379

For a more complete example, see our [Docker Compose example project on Github][5].

[1]: https://docs.docker.com/compose/overview
[2]: /integrations/docker_daemon
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[5]: https://github.com/DataDog/docker-compose-example
