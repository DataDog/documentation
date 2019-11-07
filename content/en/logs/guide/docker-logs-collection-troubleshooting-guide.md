---
title: Docker Log Collection Troubleshooting Guide
kind: documentation
---

There are a number of common problems that arise when sending new container logs to Datadog, whether you are using the Container Agent or a locally installed Host Agent. If you experience issues sending new logs to Datadog, this list may help you troubleshoot. If you continue to have trouble after reviewing the items on this page, [contact our support team][1] for further assistance.

## Logging isn't enabled

Check whether log collection is enabled.

{{< tabs >}} 
{{% tab "Container Installation" %}}

Check that `DD_LOGS_ENABLED=true` is set in your environment variables.

{{% /tab %}} 
{{% tab "Host Installation" %}}

Check your `datadog.yaml` file for `logs_enabled: true`

{{% /tab %}} 
{{< /tabs >}}

## Unable to connect to Docker socket

When the Agent is unable to connect to the Docker socket, the "Logs Agent" section of the Agent status displays `Status: Pending` to indicate that it hasn't started collecting container logs.

``` 
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0

  container_collect_all
  ---------------------
    Type: docker
    Status: Pending
```

{{< tabs >}} {{% tab "Container Installation" %}}

For the Container Agent, the connection to the socket is handled by mounting the docker socket directly into the container. If this step hasn't been performed, you see the following logs when the Agent starts:

```
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:51 in NewLauncher) | Could not setup the docker launcher: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:58 in NewLauncher) | Could not setup the kubernetes launcher: /var/log/pods not found
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:61 in NewLauncher) | Container logs won't be collected
```

And this log will appear when the Agent attempts to run the container check:

```
2019-10-09 14:12:27 UTC | PROCESS | CRITICAL | (collector.go:91 in runCheck) | Unable to run check 'container': temporary failure in detector, will retry later: No collector detected
```

Relaunch the Agent container with the following option: `-v /var/run/docker.sock:/var/run/docker.sock:ro` to allow access to the Docker socket.
{{% /tab %}} {{% tab "Host Installation" %}}
If you're using the Host Agent, the user `dd-agent` needs to be added to the Docker group in order to have permission to read from the Docker socket. If the Agent user isn't added to the Docker user group, Agent Status command will show `Status: Pending` under "Logs Agent". You should also see the following error logs in the Agent log file at `/var/log/datadog/agent.log`:

```
2019-10-11 09:17:56 UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
2019-10-11 09:17:56 UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

 To add the Host Agent to the Docker user group, perform the following command: `usermod -a -G docker dd-agent`.
{{% /tab %}} {{< /tabs >}}

{{< tabs >}} {{% tab "Container Installation" %}}
## `container_collect_all` isn't set
Sometimes when you run the Agent status command the Log Status shows no integrations and you see `LogsProcessed: 0 and LogsSent: 0`.

```
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0
```

When you see this, it means that the Agent isn't collecting any log files from your integrations. For the Container Agent, this can happen if you haven't set the environment variable `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` since without this option the container Agent won't try to collect logs from other containers. To double check what environment variables you've set, run the command `docker inspect <agent-container>`.

Add the following environment variable to allow the Agent to detect containers: `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`.

{{% /tab %}} {{% tab "Host Installation" %}}
When you see this, it means that the Agent isn't collecting any log files from your integrations. For the Host Agent, this can happen if you haven't set the parameter `container_collect_all` in your `datadog.yaml` to `true`. Without this option the container Agent won't try to collect logs from other containers.

Add the following lines in your `datadog.yaml` file to allow the Agent to detect containers:

```
logs_config:
  container_collect_all: true
```

{{% /tab %}} {{< /tabs >}}

{{< tabs >}} {{% tab "Container Installation" %}}
## `/opt/datadog-agent/run` isn't mounted
The Agent keeps track of the last log line collected so that it can pick up where it left off if a container restarts or the network connection gets interrupted. If you have gaps in your logs following a container restart or network issue, make sure to check that:

- timestamps contained in the logs are being properly remapped to the log's official timestamp. If this step hasn't been done then the log's official timestamp will be set as the time of ingestion. In this case, there will appear to be a gap in the logs even though the "missed" logs are being accounted for.
- `/opt/datadog-agent/run` is properly mounted. To double check what environment variables you've set, run the command `docker inspect <agent-container>`.

If `/opt/datadog-agent/run` isn't mounted, restart the Agent container and be sure to include the command `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`. See [this document][2] for the full list of commands related to logs for the container Agent.
{{% /tab %}} {{< /tabs >}}

## An exclusion rule is filtering out your containers

{{< tabs >}} {{% tab "Container Installation" %}}
If you've gone through the above steps and your logs still aren't being ingested, check to see if your `DD_AC_EXCLUDE` rule is filtering out your containers. Setting a regex that is too permissive can cause your containers to be skipped. Setting the rule `DD_AC_EXCLUDE="name:.*"`, for example, filters out all containers.

Here are some ways to confirm if you are experiencing this:

- Check if `Status: Pending` appears in your Agent Log Status. Since all containers are being filtered out, the container log integration reports itself as "Pending" until at least one container is reporting.
- Check if you're receiving metrics from your containers. Since `DD_AC_EXCLUDE` filters containers out for both logs _and_ metrics, you shouldn't see any data coming in for a container if it's being filtered out by this environment variable.
- Run the command `docker inspect <agent-container>` to see what environment variables you've set on your Agent container.

{{% /tab %}} {{% tab "Host Installation" %}}
If you've gone through the above steps and your logs still aren't being ingested, check to see if your `ac_exclude` rule is filtering out your containers. Setting a regex that is too permissive can cause your containers to be skipped. Setting the rule `ac_exclude=[name:.*]`, for example, filters out all containers.

Here are some ways to confirm if you are experiencing this:

- Check if `Status: Pending` appears in your Agent Log Status. Since all containers are being filtered out, the container log integration reports itself as "Pending" until at least one container is reporting.
- Check if you're receiving metrics from your containers. Since `ac_exclude` filters containers out for both logs _and_ metrics, you shouldn't see any data coming in for a container if it's being filtered out by this environment variable.
- Run the command `docker inspect <agent-container>` to see what environment variables you've set on your Agent container.
{{% /tab %}} {{< /tabs >}}

## Docker Daemon started after the Host Agent

If the Docker Daemon is started after the Host Agent is already running, you may see the Logs Agent reporting as `Status: Pending`. In this case, restart the Agent to trigger container collection.

## Containers are using the journald logging driver
When containers are set up to use the journald logging driver, the Agent needs to be configured to collect logs from Journald. To collect logs from the journald logging driver you need to set up the journald integration [following this documentation][3].

{{< tabs >}} {{% tab "Container Installation" %}}
For the Docker Agent, you will need to mount the yaml file into your container following the instructions [here][4].

If you're unsure of which logging driver your containers are using, use `docker inspect <container-name>` to see what logging driver you have set. By default, Docker uses JSON files for logging and you should see the following in your docker inspect if that is the case:

```
"LogConfig": {
    "Type": "json-file",
    "Config": {}
},
```

If the container is set to journald you'll see the following:

```
"LogConfig": {
    "Type": "journald",
    "Config": {}
},
```

For more information on setting log drivers for Docker containers, [see this documentation][5].
{{% /tab %}} {{% tab "Host Installation" %}}
For the Host Agent, remember to add the `dd-agent` user to the `systemd-journal` group by running `usermod -a -G systemd-journal dd-agent`.
{{% /tab %}} {{< /tabs >}}

[1]: https://docs.datadoghq.com/help
[2]: /agent/docker/log/?tab=containerinstallation#one-step-install-to-collect-all-the-container-logs
[3]: /integrations/journald/#configuration
[4]: /agent/docker/?tab=standard#mounting-conf-d
[5]: /config/containers/logging/journald/
