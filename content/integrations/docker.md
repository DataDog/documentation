---
title: Datadog-Docker Integration
integration_title: Docker
kind: integration
doclevel: basic
adroll_pixel: true
git_integration_title: docker
---

###Overview
{: .int-overview}

Get metrics from Docker in real time to:

* Vizualize your containers' performance.
* Correlate the performance of containers with the applications running inside.

### Metrics

<%= get_metrics_from_git()%> 

We've written two in depth blog posts on Datadog and Docker::

* [Dockerize Datadog](https://www.datadoghq.com/2014/06/docker-ize-datadog/)
* [Monitor Docker with Datadog](https://www.datadoghq.com/2014/06/monitor-docker-datadog/)

### Installation

If you want run the Agent inside a container, follow the Docker Agent installation instructions.

1. Make sure that Docker is installed and running on your server
2. Add the user running the Agent to docker's group.


~~~ shell
usermod -a -G docker dd-agent
~~~


3. Configure the Agent to connect to Docker. Edit ```conf.d/docker.yaml```



        #!yaml
        init_config:

        instances:
            - url: "unix://var/run/docker.sock"
              new_tag_names: true



4. Restart the Agent
5. Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:


        #!shell
        Checks
        ======

          [...]

          docker
          ------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events


Not sure how to execute the last two steps? Visit the Agent Usage Guide for more detailed instructions.

