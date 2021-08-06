---
title: Using the Docker integration with Podman container runtime
kind: documentation
---

Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Read more on [https://podman.io/][1].

Podman is an alternative to Docker as it provides a Docker-compatible CLI interface and socket. This specificity allows to use the Datadog Agent Docker integration with Podman containers.

## Requirements

* Podman version >= 3.2.0
* Podman configured to expose its communication socket. [2]
* Datadog Agent version >= 7.30.0

## Agent deployment as a podman container

To deploy the agent as a podman container, the command to run is very similar to the one used for [docker][3].

```
$ podman run -d --name dd-agent \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    --privileged \
    gcr.io/datadoghq/agent:latest
```

The 2 importants differences are:
* `-v /run/podman/podman.sock:/run/podman/podman.sock:ro` to mount the Podman socket instead of the docker socket.
* `-e DOCKER_HOST=unix:///run/podman/podman.sock` to configure the agent communication with the Podman socket.

All the other dockers configuration options should be compatible too.


## Known limitations

* Container logs aggregation are not yet supported.
* The activation of the Podman socket, can be option in some setup, It might need to enable.


[1]: https://podman.io/
[2]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/assembly_using-the-container-tools-api_using-the-container-tools-cli
[3]: agent/docker
