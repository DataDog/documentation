---
title: Using the Docker integration with Podman container runtime
kind: documentation
---

Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Read more on [https://podman.io/][1].

Podman is an alternative to Docker as it provides a Docker-compatible CLI interface and socket. This specificity allows you to use the Datadog Agent Docker integration with Podman containers.

## Requirements

* Podman version >= 3.2.0
* Podman configured to expose its [communication socket][2].
* Datadog Agent version >= 7.30.0

## Agent deployment as a podman container

To deploy the Agent as a Podman container, the command to run is very similar to the one used for [Docker][3].

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

The two importants differences are:
* `-v /run/podman/podman.sock:/run/podman/podman.sock:ro` to mount the Podman socket instead of the Docker socket.
* `-e DOCKER_HOST=unix:///run/podman/podman.sock` to configure the Agent communication with the Podman socket.



## Known limitations

* Container logs aggregation is not supported.
* The activation of the Podman socket can be optional depending on your setup. It may need to be enabled.


[1]: https://podman.io/
[2]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/assembly_using-the-container-tools-api_using-the-container-tools-cli
[3]: agent/docker
