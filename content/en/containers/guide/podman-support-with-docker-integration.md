---
title: Using the Docker integration with Podman container runtime
description: Deploy and monitor Datadog Agent with Podman container runtime using rootless and rootful containers
aliases:
 - /agent/guide/podman-support-with-docker-integration
---

Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Read more on [https://podman.io/][1].

With Podman, we can deploy rootless or rootful containers. Rootless containers can be run by users that do not have admin rights, whereas rootful containers are the ones that run as root.
The main advantage that rootless containers provide is that potential attackers cannot gain root permissions on the host when the container is compromised.
The Datadog Agent works with both rootless and rootful containers.

## Requirements

* Podman version >= 3.2.0
* Datadog Agent version >= 7.54.0

## Host Agent installation

Host Agent installation requires quite a few manual steps and permission tweaks for the Agent to be able to collect the data. Those fixes are not always permanent and are required again if containers restart.
We advice to follow `rootles` and `rootful` installation instead since it is easier to perform and maintain.

## Agent deployment as a Podman rootless container

To deploy the Agent as a rootless Podman container, the command to run is similar to the one used for [Docker][2].

The main difference is that as the Agent does not need to have access to the runtime socket, it relies on the Podman DB to extract the container information that it needs. Instead of mounting the Docker socket and setting `DOCKER_HOST`, the only thing needed is to mount the Podman DB location into the container.

Setting up Podman DB path depends on the Agent version.

**Agent < v7.54.0**
User needs to set the path to Podman DB (`<PODMAN_DB_PATH>` in the command below).

To discover the exact location of Podman DB, run the following command:
```
$ podman info -f json | jq '.store.graphRoot'
"$HOME/.local/share/containers/storage"
```
Check which DB you have at that path and set `<PODMAN_DB_PATH>` accordingly.

Before version 4.8 Podman uses BoltDB as the default database backend.
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

<div class="alert alert-info">
<strong>Podman version 4.8+</strong> uses SQLite as the default database backend, and BoltDB is deprecated from v5. You may need to update the <code>&lt;PODMAN_DB_PATH&gt;</code> to your <code>db.sql</code> path. Generally, this path is <code>/var/lib/containers/storage/db.sql</code>, but it may differ in some systems.
</div>

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v <PODMAN_DB_PATH>:/var/lib/containers/storage/db.sql:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    gcr.io/datadoghq/agent:latest
```

The Agent should detect all the containers managed by the non-admin user that ran the Podman command and emit `container.*` metrics for all of them.

**Agent v7.54.0 and above**

Starting with Agent v7.54.0 it can auto-detect Podman DB if the prorper `containers` path is provided.

To discover the exact location of containers folder, run the following command:
```
$ podman info -f json | jq '.store.graphRoot'
"$HOME/.local/share/containers/storage"
```
In the example above, the containers folder is located at `$HOME/.local/share/containers`.

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v /home/<user>/.local/share/containers:/var/lib/containers:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<api key> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    gcr.io/datadoghq/agent:latest
```

To enable log collection run the agent as follows:

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v /home/<user>/.local/share/containers:/var/lib/containers:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<api key> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    -e DD_LOGS_ENABLED=true \
    -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
    -e DD_LOGS_CONFIG_USE_PODMAN_LOGS=true \
    gcr.io/datadoghq/agent:latest
```

## Agent deployment as a Podman rootful container

When running rootful containers, we have two options: we can rely on the Podman DB as in the example above with rootless containers, or we can use the Podman socket.

### Using the Podman DB

The command to run using the DB is identical to the one provided above, but note that the DB path is different for each user, including root. Use the same discovery command as above.

### Using the Podman socket

The Podman socket is compatible with the Docker one. That's why in this case, the Datadog Agent will run everything as if it was running on Docker. This means that it will emit `docker.*` metrics, for example.

To deploy the Agent relying on the Podman socket run as root:

```
$ sudo podman run -d --name dd-agent \
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
