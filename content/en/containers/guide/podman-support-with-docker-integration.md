---
title: Using the Docker integration with Podman container runtime
aliases:
 - /agent/guide/podman-support-with-docker-integration
---

Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Read more on [https://podman.io/][1].

With Podman, we can deploy rootless or rootful containers. Rootless containers can be run by users that do not have admin rights, whereas rootful containers are the ones that run as root.
The main advantage that rootless containers provide is that potential attackers cannot gain root permissions on the host when the container is compromised.
The Datadog Agent works with both rootless and rootful containers.

## Requirements

* Podman version >= 3.2.0
* Datadog Agent version >= 7.30.0

## Agent deployment as a Podman rootless container

To deploy the Agent as a rootless Podman container, the command to run is similar to the one used for [Docker][2].

The main difference is that as the Agent does not have access to the runtime socket, it relies on the Podman DB to extract the container information that it needs. So, instead of mounting the Docker socket and setting `DOCKER_HOST` we need to mount the Podman DB (`<PODMAN_DB_PATH>` in the command below).
In some systems the path of the Podman DB is `$HOME/.local/share/containers/storage/libpod/bolt_state.db` but it might be different in your system. Set `<PODMAN_DB_PATH>` in the command below accordingly.

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v <PODMAN_DB_PATH>:/var/lib/containers/storage/libpod/bolt_state.db:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    gcr.io/datadoghq/agent:latest
```

The Agent should detect all the containers managed by the non-admin user that ran the Podman command and emit `container.*` metrics for all of them.

## Agent deployment as a Podman rootful container

When running rootful containers, we have two options: we can rely on the Podman DB as in the example above with rootless containers, or we can use the Podman socket.

### Using the Podman DB

The command to run using the DB is identical to the one provided above, but note that the DB path is different for each user, including root. For root, it's typically `/var/lib/containers/storage/libpod/bolt_state.db` but it might be different in your system, so set `<PODMAN_DB_PATH>` accordingly.

### Using the Podman socket

The Podman socket is compatible with the Docker one. That's why in this case, the Datadog Agent will run everything as if it was running on Docker. This means that it will emit `docker.*` metrics, for example.

To deploy the Agent relying on the Podman socket run as root:
```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    gcr.io/datadoghq/agent:latest
```

In both cases the Agent should detect all the containers managed by root and emit `container.*` metrics for all of them.

[1]: https://podman.io/
[2]: /agent/docker
