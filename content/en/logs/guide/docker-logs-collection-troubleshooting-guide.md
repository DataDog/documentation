---
title: Docker Log Collection Troubleshooting Guide
kind: documentation
---

There are a number of common issues that can get in the way when sending new container logs to Datadog with the Container Agent or with a locally installed Host Agent. If you experience issues sending new logs to Datadog, this guide helps you troubleshoot. If you continue to have trouble, [contact our support team][1] for further assistance.

## Check the Agent status

1. To see if the logging Agent is experiencing any issues, run the following command:

```
docker exec -it <CONTAINER_NAME> agent status
```

2. If everything is running smoothly, you should see something like the following status:

```
==========
Logs Agent
==========
    LogsProcessed: 42
    LogsSent: 42

  container_collect_all
  ---------------------
    Type: docker
    Status: OK
    Inputs: 497f0cc8b673397ed31222c0f94128c27a480cb3b2022e71d42a8299039006fb
```

3. If your status doesn't look like the above, refer to the troubleshooting tips in the following sections.


## The Logs Agent shows "not running" in its status 
If you see the following message when you run the Agent Status command:

```
==========
Logs Agent
==========

  Logs Agent is not running
```

This means that you did not enable logging in the Agent. 

{{< tabs >}} {{% tab "Container Installation" %}}
To enable logging for the Container Agent, set the following environment variable: `DD_LOGS_ENABLED=true`.
{{% /tab %}} {{% tab "Host Installation" %}}
To enable logging for the Host Agent, set `logs_enabled: true` in the `datadog.yaml` file.
{{% /tab %}} {{< /tabs >}}

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
## container_collect_all isn't set
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

## Docker Daemon started after the Host Agent

If the Docker Daemon is started after the Host Agent is already running, you may see the Logs Agent reporting as `Status: Pending`. In this case, restart the Agent to trigger container collection.

## Containers are using the journald logging driver
When containers are set up to use the journald logging driver, the Agent needs to be configured to collect logs from Journald. To collect logs from the journald logging driver you need to set up the journald integration [following this documentation][2].

{{< tabs >}} {{% tab "Container Installation" %}}
For the Docker Agent, you will need to mount the yaml file into your container following the instructions [here][3].

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

For more information on setting log drivers for Docker containers, [see this documentation][4].
{{% /tab %}} {{% tab "Host Installation" %}}
For the Host Agent, remember to add the `dd-agent` user to the `systemd-journal` group by running `usermod -a -G systemd-journal dd-agent`.
{{% /tab %}} {{< /tabs >}}

## Outbound traffic on port 10516 is blocked

The Datadog Agent sends its logs to Datadog over tcp via port 10516. If that connection is not available, logs fail to be sent and an error is recorded in the `agent.log` file to that effect.

Test manually your connection by running a telnet or openssl command like so (port 10514 would work too, but is less secure):

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

And then by sending a log like the following:

```
<API_KEY> this is a test message
```

- If opening the port 10514 or 10516 is not an option, it is possible to ask the Datadog Agent to use the port `443` to forward them (only available with the Datadog Agent) by adding the following in `datadog.yaml`:

```
logs_config:
  use_port_443: true
```

[1]: https://docs.datadoghq.com/help
[2]: /integrations/journald/#configuration
[3]: /agent/docker/?tab=standard#mounting-conf-d
[4]: /config/containers/logging/journald/
