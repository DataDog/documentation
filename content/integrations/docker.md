---
title: Datadog-Docker Integration
integration_title: Docker
kind: integration
adroll_pixel: true
newhlevel: true
git_integration_title: docker
---

# Overview

Get metrics from Docker in real time to:

* Visualize your containers' performance.
* Correlate the performance of containers with the applications running inside them.

![Docker default dashboard](/static/images/docker.png)


# Installation

There are three ways to setup the Docker integration: install the agent on the host, on a single privileged container, and on each individual container.

Whichever you choose, your system will need to have cgroup memory management enabled for the check to succeed. Check out our [Docker agent repository](https://github.com/DataDog/docker-dd-agent#cgroups) for how to enable it.

## Host Installation

1. Ensure Docker is running on the host.
2. Install the agent as described in [the agent installation instructions](https://app.datadoghq.com/account/settings#agent) for your host OS.
3. Enable [the Docker integration tile in the application](https://app.datadoghq.com/account/settings#integrations/docker).
4. Add the agent user to the docker group: `usermod -a -G docker dd-agent`
5. Create a `docker_daemon.yaml` file by copying [the example file in the agent conf.d directory](https://github.com/DataDog/integrations-core/blob/master/docker_daemon/check.py). If you have a standard install of Docker on your host, there shouldn't be anything you need to change to get the integration to work.
6. To enable other integrations, use `docker ps` to identify the ports used by the corresponding applications.
    ![](/static/images/integrations-docker-dockerps.png)

<%= insert_example_links(conf: "docker_daemon", check: "docker_daemon")%>

**Note:** docker_daemon has replaced the older docker integration.

## Single Container Installation

1. Ensure Docker is running on the host.
2. As per [the docker container installation instructions](https://app.datadoghq.com/account/settings#agent/docker), run:

        docker run -d --name dd-agent \
          -v /var/run/docker.sock:/var/run/docker.sock:ro \
          -v /proc/:/host/proc/:ro \
          -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
          -e API_KEY={YOUR API KEY} \
          datadog/docker-dd-agent:latest

### Environment variables

Note that in the command above, you are able to pass your API key to the Datadog Agent using Docker's `-e` environment variable flag. Some other variables you can pass include:

| **Variable** | **Description** |
|---|---|
| API_KEY | Sets your Datadog API key. |
| DD_HOSTNAME | Sets the hostname in the Agent container's datadog.conf file. If this variable is not set, the Agent container will default to using the `Name` field (as reported by the `docker info` command) as the Agent container hostname. |
| DD_URL | Sets the Datadog intake server URL where the Agent will send data. This is useful when [using an agent as a proxy](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy). |
| LOG_LEVEL | Sets logging verbosity (CRITICAL, ERROR, WARNING, INFO, DEBUG). For example, `-e LOG_LEVEL=DEBUG` will set logging to debug mode.
| TAGS | Sets host tags as a comma delimited string. You can pass both simple tags and key-value tags. For example, `-e TAGS="simple-tag, tag-key:tag-value"`. |
| EC2_TAGS | Enabling this feature allows the agent to query and capture custom tags set using the EC2 API during startup. To enable, set the value to "yes", for example, `-e EC2_TAGS=yes`. Note that this feature requires an [IAM role](https://github.com/DataDog/dd-agent/wiki/Capturing-EC2-tags-at-startup) associated with the instance. |
| NON_LOCAL_TRAFFIC | Enabling this feature will allow statsd reporting from any external IP. For example, `-e NON_LOCAL_TRAFFIC=yes`. This can be used to report metrics from other containers or systems. See [network configuration](https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration) for more details.
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD | Sets proxy configuration details. For more information, see the [Agent proxy documentation](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy) |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | Enables and configures Autodiscovery. For more information, please see the [Autodiscovery guide](/guides/autodiscovery/). |
{:.table}

### Running the agent container on Amazon Linux

To run the Datadog Agent container on Amazon Linux, you'll need to make one small change to the `cgroup` volume mount location:

    docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /cgroup/:/host/sys/fs/cgroup:ro \
      -e API_KEY={YOUR API KEY} \
      datadog/docker-dd-agent:latest


### Alpine Linux based container

Our standard Docker image is based on Debian Linux, but as of version 5.7 of the Datadog Agent, we also offer an [Alpine Linux](https://alpinelinux.org/) based image. The Alpine Linux image is considerably smaller in size than the traditional Debian-based image. It also inherits Alpine's security-oriented design.

To use the Alpine Linux image, simply append `-alpine` to the version tag. For example:

    docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -e API_KEY={YOUR API KEY} \
      datadog/docker-dd-agent:latest-alpine

### Image versioning
Starting with version 5.5.0 of the Datadog Agent, the docker image follows a new versioning pattern. This allows us to release changes to the Docker image of the Datadog Agent but with the same version of the Agent.

The Docker image version will have the following pattern: **X.Y.Z** where **X** is the major version of the Docker Image, **Y** is the minor version, **Z** will represent the Agent version.

For example, the first version of the Docker image that will bundle the Datadog Agent 5.5.0 will be: `10.0.550`

### Custom containers and additional information

For more information about building custom Docker containers with the Datadog Agent, the Alpine Linux based image, versioning, and more, please reference [our `docker-dd-agent` project on Github](https://github.com/DataDog/docker-dd-agent).

## Each Container Installation

1. Ensure Docker is running on the host.
2. Add a RUN command to the Dockerfile as listed in [the agent installation instructions in the app](https://app.datadoghq.com/account/settings#agent) for the OS used in the container. For instance, if the container is based on an Ubuntu image, the `Dockerfile` would look similar to the following:

        FROM ubuntu:16.04
        RUN DD_API_KEY={YOUR API KEY} \
          bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/.../install_agent.sh)"


    NOTE: Always refer to the instructions in the app for the latest version of the install command.

# Validate Installation

1. Restart the agent.
2. Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]
          docker_daemon
          -------------
            - instance #0 [OK]
            - Collected 50 metrics, 0 events & 2 service checks

3. In the application on the Infrastructure List, you should see the host with the blue docker pill next to it indicating that the app is receiving the data correctly.

# Metrics

<%= get_metrics_from_git()%>

# Deprecated metrics

The following metrics are reported by a deprecated check and will be eventually removed from the catalog:

* **docker.mem.active_anon**
* **docker.mem.inactive_anon**
* **docker.mem.active_file**
* **docker.mem.inactive_file**
* **docker.mem.mapped_file**
* **docker.mem.pgfault**
* **docker.mem.pgmajfault**
* **docker.mem.pgpgin**
* **docker.mem.pgpgout**
* **docker.mem.unevictable**

The following metrics are now reported with a different name and will be eventually removed from the catalog:

* **docker.disk.used** (now reported as **docker.data.used**)
* **docker.disk.free** (now reported as **docker.data.free**)
* **docker.disk.total** (now reported as **docker.data.total**)

# Compose and the Datadog Agent

[Compose](https://docs.docker.com/compose/overview/) is a Docker tool that simplifies building applications on Docker by allowing you to define, build and run multiple containers as a single application.

While the [Single Container Installation](#single-container-installation) instructions above will get the stock Datadog Agent container running, you will most likely want to enable integrations for other containerized services that are part of your Compose application. To do this, you'll need to combine integration YAML files with the base Datadog Agent image to create your Datadog Agent container. Then you'll need to add your container to the Compose YAML.

## Example: Monitoring Redis

Let's look at how you would monitor a Redis container using Compose. Our example file structure is:

    |- docker-compose.yml
    |- datadog
        |- Dockerfile
        |- conf.d
           |-redisdb.yaml

First we'll take a look at the `docker-compose.yml` that describes how our containers work together and sets some of the configuration details for the containers.

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

In this file, we can see that Compose will run the Docker image `redis` and it will also build and run a `datadog` container. By default it will look for a matching directory called `datadog` and run the `Dockerfile` in that directory.

Our `Dockerfile` simply takes the standard [Datadog docker image](https://hub.docker.com/r/datadog/docker-dd-agent/) and places a copy of the `redisdb.yaml` integration configuration into the appropriate directory:

    FROM datadog/docker-dd-agent
    ADD conf.d/redisdb.yaml /etc/dd-agent/conf.d/redisdb.yaml

Finally our `redisdb.yaml` is patterned after the [redisdb.yaml.example file](https://github.com/DataDog/integrations-core/blob/master/redisdb/conf.yaml.example) and tells the Datadog agent to look for Redis on the host named `redis` (defined in our `docker-compose.yaml` above) and the standard Redis port 6379:

    init_config:

    instances:
      - host: redis
        port: 6379

For a more complete example, please see our [Docker Compose example project on Github](https://github.com/DataDog/docker-compose-example).

# DogStatsD and Docker

Datadog has a huge number of [integrations with common applications](/integrations/), but it can also be used to instrument your custom applications. This is typically using one of the many [Datadog libraries](/libraries/).

Libraries that communicate over HTTP using the [Datadog API](/api/) don't require any special configuration with regard to Docker. However, applications using libraries that integrate with DogStatsD or StatsD will need to configure the library to connect to the Agent. Note that each library will handle this configuration differently, so please refer to the individual library's documentation for more details.

After your code is configured you can run your custom application container using [the `--link` option](https://docs.docker.com/engine/reference/run/#/expose-incoming-ports) to create a network connection between your application container and the Datadog Agent container.

## Example: Monitoring a basic Python application

To start monitoring our application, we first need to run the Datadog container using the [Single Container Installation](#single-container-installation) instructions above. Note that the `docker run` command sets the name of the container to `dd-agent`.

Next, we'll need to instrument our code. Here's a basic Flask-based web application:

    from flask import Flask
    from datadog import initialize, statsd

    # Initialize DogStatsD and set the host.
    initialize(statsd_host = 'dd-agent')

    app = Flask(__name__)

    @app.route('/')
    def hello():
        # Increment a Datadog counter.
        statsd.increment('my_webapp.page.views')

        return "Hello World!"

    if __name__ == "__main__"
        app.run()

In our example code above, we set the DogStatsD host to match the Datadog Agent container name, `dd-agent`.

After we build our web application container, we can run it and use the `--link` argument to setup a network connection to the Datadog Agent container:

    docker run -d --name my-web-app \
      --link dd-agent:dd-agent
      my-web-app

For another example using DogStatsD, see our [Docker Compose example project on Github](https://github.com/DataDog/docker-compose-example).

# Additional resources

Learn more about how to monitor Docker performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/the-docker-monitoring-problem/). We detail the challenges when monitoring Docker, its key performance metrics, how to collect them, and lastly how the largest TV and radio outlet in the U.S. monitors Docker using Datadog.

We've also written several other in-depth blog posts to help you get the most out of Datadog and Docker:

* [How to Monitor Docker Resource Metrics](https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics/)
* [How to Collect Docker Metrics](https://www.datadoghq.com/blog/how-to-collect-docker-metrics/)
* [8 Surprising Facts about Real Docker Adoption](https://www.datadoghq.com/docker-adoption/)
* [Monitor Docker on AWS ECS](https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs/)
* [Dockerize Datadog](https://www.datadoghq.com/blog/docker-performance-datadog/)
* [Monitor Docker with Datadog](https://www.datadoghq.com/blog/monitor-docker-datadog/)
