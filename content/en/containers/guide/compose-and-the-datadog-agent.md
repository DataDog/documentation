---
title: Compose and the Datadog Agent
further_reading:
    - link: 'https://github.com/DataDog/docker-compose-example'
      tag: "Source Code"
      text: 'Using Docker Compose with Datadog Example'
    - link: '/agent/docker/'
      tag: 'Documentation'
      text: 'Datadog Docker Agent documentation'
    - link: '/agent/docker/log/'
      tag: 'Documentation'
      text: 'Datadog Docker Log collection documentation'
aliases:
    - /integrations/faq/compose-and-the-datadog-agent
    - /agent/guide/compose-and-the-datadog-agent
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
    pid: host
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

### APM Trace Collection

Building on the Redis example above, we can also use Compose to configure the Datadog agent to collect application traces. This `docker-compose.yml` is pulled from [this Docker compose example you can find on our GitHub page][4].

```yaml
version: "4"
services:
  web:
    build: web
    command: ddtrace-run python app.py
    ports:
     - "5000:5000"
    volumes:
     - ./web:/code # modified here to take into account the new app path
    links:
     - redis
    environment:
     - DATADOG_HOST=datadog # used by the web app to initialize the Datadog library
     - DD_AGENT_HOST=dd-agent # points to dd-agent to send traces
  redis:
    image: redis
  # agent section
  datadog:
    container_name: dd-agent
    build: datadog
    links:
     - redis # ensures that redis is a host that the container can find
     - web # ensures that the web app can send metrics
    environment:
     - DD_API_KEY=__your_datadog_api_key_here__
     - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # enables agent to receive custom metrics from other containers
     - DD_APM_ENABLED=true # enables tracing
     - DD_APM_NON_LOCAL_TRAFFIC=true # enables agent to receive traces from other containers
     - DD_AGENT_HOST=dd-agent # allows web container to forward traces to agent
     - DD_SITE=datadoghq.com # determines datadog instance to send data to (e.g change to datadoghq.eu for EU1)
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

The main changes to point above are the configuration of the `DD_AGENT_HOST` environment variable, which must be the same for our `web` container and our Agent container in order to collect traces. `DD_APM_ENABLED` and `DD_APM_NON_LOCAL_TRAFFIC` enable APM and allow our agent to receive traces from other containers. 

Additionally we've added the `ddtrace` library to the `requirements.txt` for our Python web app. This is why we're able to initialize it with `ddtrace-run` to enable APM (the `datadog` library mentioned below is used for collection custom, DogStatsD metrics).
```
flask
redis
datadog
ddtrace <--
``` 

Lastly, it is a good idea to set the `service`, `env`, and `version` tags for our application. We can do this by modifying our web app's `Dockerfile` like so. 

```dockerfile
FROM python:2.7
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt

# This is where you set DD tags
ENV DD_SERVICE web        <-- This sets the "service" name in Datadog
ENV DD_ENV sandbox        <-- This sets the "env" name in Datadog
ENV DD_VERSION 1.0        <-- This sets the "version" number in Datadog
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
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
     - DD_LOGS_ENABLED=true
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
     - /var/lib/docker/containers:/var/lib/docker/containers:ro
```

**Note**: The above configuration only collects logs from the `Redis` container. Logs can be collected from the Datadog Agent by adding a similar `com.datadoghq.ad.logs` label. Log collection can also be explicitly enabled for all containers by setting the environment variable `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` to `true`. See the complete [Docker log collection documentation][5] for additional details.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: https://github.com/DataDog/docker-compose-example
[5]: /agent/logs/
