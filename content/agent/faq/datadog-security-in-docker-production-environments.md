---
title: Datadog security in Docker production environments
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/basic_agent_usage/docker"
  tag: "Documentation"
  text: Learn more about Datadog Docker agent
---

The official Docker repository doesn't provide any real signature system. You can [build the container by yourself](https://github.com/DataDog/docker-dd-agent) (a simple clone then docker build is enough). The build  installs the Agent from our signed APT repo.

We recognize that Docker [does not recommend](http://blog.docker.com/tag/docker-1-2/) using the **--privileged** flag in production environments. This flag was part of our work to add the missing metrics (such as network) to the Agent container. However it doesn't bring any additional metrics for now, so you can drop it completely.

We don't ask for specific kernel capabilities so the container should run with the [default set](https://github.com/docker/docker/blob/v1.4.1/daemon/execdriver/native/template/default_template.go#L12). These are the minimum capabilities required by Docker.

We ask to mount into the Agent a few directories:

* The Docker daemon socket. This is RW so that we can query it to get the list of containers and events.
* The list of mounts and cgroups to collect Docker performance metrics. This is RO.
* If these mounts are a problem for you, you can remove them all but then the Docker integration no longer works.

If you use some integrations, you may need to link containers with the Agent so that it can contact it (example: get the status page from Apache). There is no restriction around that (you can namespace, restrict it, etc.) as long as the Agent can get the HTTP page.

You may also want to use [DogStatsD](/developers/dogstatsd), in which case other containers sends UDP datagrams to the [Agent](/agent/). 

{{< partial name="whats-next/whats-next.html" >}}