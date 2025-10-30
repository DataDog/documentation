---
title: Using the Docker integration with Podman container runtime
description: Deploy and monitor Datadog Agent with Podman container runtime using rootless and rootful containers
aliases:
 - /agent/guide/podman-support-with-docker-integration
---

Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Read more on [https://podman.io/][1].

With Podman, you can deploy rootless or rootful containers. Rootless containers can be run by users that do not have admin rights, whereas rootful containers run as root. The main advantage that rootless containers provide is that potential attackers cannot gain root permissions on the host when the container is compromised. The Datadog Agent works with both rootless and rootful containers.

## Requirements

* Podman version >= 3.2.0
* Datadog Agent version >= 7.54.0

## Host Agent installation

Host Agent installations require multiple manual steps and permission tweaks for the Agent to be able to collect data. Those fixes are not always permanent and are required again if containers restart. Instead of using a host installation, Datadog recommends using `rootless` or `rootful` installations, which are easier to perform and maintain.

## Agent deployment as a Podman rootless container

The commands for installing the Agent as a rootless Podman container are similar to those used for [Docker][2].

The main difference is that the Agent does not need to have access to the runtime socket. Instead, it relies on the Podman DB to extract the container information that it needs. Instead of mounting the Docker socket and setting `DOCKER_HOST`, the only thing needed is to mount the Podman DB location into the container.

Setting up Podman DB path depends on your Agent version.

### Agent v7.54.0 or greater

Agent versions 7.54.0 and greater can autodetect the Podman DB if the proper `containers` path is provided.

1. To discover the exact location of containers folder, run the following command:
   ```shell
   podman info -f json | jq -r '.store.graphRoot' | sed 's/\/storage$//'
   ```
   Output should be similar to the following:
   ```
   $HOME/.local/share/containers
   ```
   In the example above, `<CONTAINERS_PATH>` resolves to `$HOME/.local/share/containers`.

1. Run one of the following commands to deploy the Agent.
   1. To deploy the Agent without logging:

      **Note**: Replace `<CONTAINERS_PATH>` with the path to your containers directory, `<API_KEY>` with your API key, and `<DD_HOSTNAME>` with your Datadog hostname:
      ```shell
      podman run -d --name dd-agent \
        --cgroupns host --pid host \
        -v <CONTAINERS_PATH>:/var/lib/containers:ro \
        -v /proc/:/host/proc/:ro \
        -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
        -e DD_API_KEY=<API_KEY> \
        -e DD_HOSTNAME=<DD_HOSTNAME> \
        gcr.io/datadoghq/agent:latest
      ```

    1. To deploy the Agent with log collection run the agent as follows:
       ```shell
       podman run -d --name dd-agent \
           --cgroupns host --pid host \
           -v <CONTAINERS_PATH>:/var/lib/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -e DD_API_KEY=<API_KEY> \
           -e DD_HOSTNAME=<DD_HOSTNAME> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_USE_PODMAN_LOGS=true \
           gcr.io/datadoghq/agent:latest
       ```

**Note:** The Datadog Agent can only collect logs for Podman containers started with `--log-driver=k8s-file`.

### Agent versions v7.54.0 and below

{{< tabs >}}

{{% tab "Podman version &ge; 4.8" %}}

Podman versions 4.8 or greater use SQLite as the default database backend, and BoltDB is deprecated from v5.

1. Find the path to your Podman DB using the following command:
   
   **Note:** In most cases the Podman DB path is `/var/lib/containers/storage/db.sql`, but it might be different on your system.

   ```shell
   GRAPH_ROOT=$(podman info -f json | jq -r '.store.graphRoot') && \
   find "$GRAPH_ROOT" -name "bolt_state.db" -o -name "db.sql" 2>/dev/null | head -1
   ```

1. Run the following command to deploy the Agent. Replace `<PODMAN_DB_PATH>` with the path to your Podman DB, `<API_KEY>` with your API key, and `<DD_HOSTNAME>` with your Datadog hostname:
    ```shell
    podman run -d --name dd-agent \
       --cgroupns host --pid host \
       -v <PODMAN_DB_PATH>:/var/lib/containers/storage/db.sql:ro \
       -v /proc/:/host/proc/:ro \
       -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
       -e DD_API_KEY=<API_KEY> \
       -e DD_HOSTNAME=<DD_HOSTNAME> \
       gcr.io/datadoghq/agent:latest
    ```

{{% /tab %}}

{{% tab "Podman versions &lt; 4.8" %}}

Podman versions below 4.8 use BoltDB as the default database backend.

1. Find the path to your Podman DB using the following command:
   **Note:** In most cases the Podman DB path is `/var/lib/containers/storage/db.sql`, but it might be different on your system.

   ```shell
   GRAPH_ROOT=$(podman info -f json | jq -r '.store.graphRoot') && \
   find "$GRAPH_ROOT" -name "bolt_state.db" -o -name "db.sql" 2>/dev/null | head -1
   ```

1. Run the following command to deploy the Agent. Replace `<PODMAN_DB_PATH>` with the path to your Podman DB, `<API_KEY>` with your API key, and `<DD_HOSTNAME>` with your Datadog hostname:

    ```shell
    podman run -d --name dd-agent \
       --cgroupns host --pid host \
       -v $PODMAN_DB_PATH:/var/lib/containers/storage/libpod/bolt_state.db:ro \
       -v /proc/:/host/proc/:ro \
       -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
       -e DD_API_KEY=<API_KEY> \
       -e DD_HOSTNAME=<DD_HOSTNAME> \
       gcr.io/datadoghq/agent:latest
    ```
{{% /tab %}}
{{< /tabs >}}

The Agent should detect all the containers managed by the non-admin user that ran the Podman command and emit `container.*` metrics for all of them.

## Agent deployment as a Podman rootful container

When running rootful containers, you have two options. You can rely on the Podman DB as in the example above with rootless containers, or you can use the Podman socket.

### Using the Podman DB

The command to run using the DB is identical to the one provided above for [rootless containers](#agent-deployment-as-a-podman-rootless-container), but note that the DB path is different for each user, including root. Use the same discovery command as above.

### Using the Podman socket

The Podman socket is compatible with the Docker one. That's why in this case, the Datadog Agent will run everything as if it was running on Docker. This means that it will emit `docker.*` metrics, for example.

To deploy the Agent relying on the Podman socket run as root:

```shell
sudo podman run -d --name dd-agent \
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
