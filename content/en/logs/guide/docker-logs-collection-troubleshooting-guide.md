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

3. If the Logs Agent Status doesn't look like the above, refer to the troubleshooting tips in the following sections.

4. If you see a status like the above example and you still aren't receiving logs, refer to the section [If the Logs Agent Status shows no errors](#if-the-logs-agent-status-shows-no-errors)

## Logs Agent

### Status: not running

If you see the following message when you run the Agent status command:

```text
==========
Logs Agent
==========

  Logs Agent is not running
```

This means that you did not enable logging in the Agent.

To enable logging for the Container Agent, set the following environment variable: `DD_LOGS_ENABLED=true`.

### No logs processed or sent

If the Logs Agent Status shows no integrations and you see `LogsProcessed: 0 and LogsSent: 0`:

```text
==========
Logs Agent
==========
    LogsProcessed: 0
    LogsSent: 0
```

This status means that logs are enabled but you haven't specified which containers the Agent should collect from.

1. To check what environment variables you've set, run the command `docker inspect <AGENT_CONTAINER>`.

2. To configure the Agent to collect from other containers, set the `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` environment variable to `true`.


## Docker log collection from file issues

When collecting Docker container logs from file, the Agent falls back on collection from the Docker socket if it cannot read from the directory where Docker container logs are stored (`/var/lib/docker/containers` on Linux). In some circumstances, the Datadog Agent may fail to collect logs from file. To diagnose this, check the Logs Agent status and look for a file type entry showing an error similar to the following:

```text
    - Type: file
      Identifier: ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834
      Path: /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log
      Status: Error: file /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log does not exist
```

This status means that the Agent is unable to find a log file for a given container. To resolve this issue, check that the folder containing Docker container logs is correctly exposed to the Datadog Agent container. On Linux, it corresponds to  `-v /var/lib/docker/containers:/var/lib/docker/containers:ro` on the command line starting the Agent container, whereas on Windows it corresponds to `-v c:/programdata/docker/containers:c:/programdata/docker/containers:ro`. Note that the directory relative to the underlying host may be different due to specific configuration of the Docker daemon—this is not an issue pending a correct Docker volume mapping. For example, use `-v /data/docker/containers:/var/lib/docker/containers:ro` if the Docker data directory has been relocated to `/data/docker` on the underlying host.

If logs are collected but single lines appear to be split, check that the Docker daemon is using the [JSON logging driver][#your-containers-are-not-using-the-json-logging-driver].

Log collection from file is activated when the environment variable `DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE` is set to `true`. However, some containers may still be tailed from the Docker socket despite this setting. Only containers started after the activation of the option will have their logs collected from file. This situation is typically found when the Datadog Agent is upgraded from a version that was not offering this feature. If desired, it is possible to force all containers (including older ones) to have their logs collected from file by setting the environment variable `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE` to `true`. This may lead to some duplicated logs when the transition occurs.


### Status: pending


If the Logs Agent Status shows `Status: Pending`:

```text
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

This status means that the Logs Agent is running but it hasn't started collecting container logs. There can be a few reasons for this:

#### Docker Daemon started after the host Agent

For Agent version prior to 7.17, if the Docker Daemon starts while the host Agent is already running, restart the Agent to retrigger container collection.

#### Docker socket not mounted

In order for the Container Agent to collect logs from Docker containers, it needs to have access to the Docker socket. If it doesn't have access, the following logs appear in `agent.log`:

```text
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:51 in NewLauncher) | Could not setup the docker launcher: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:58 in NewLauncher) | Could not setup the kubernetes launcher: /var/log/pods not found
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:61 in NewLauncher) | Container logs won't be collected
```

Relaunch the Agent container with the following option: `-v /var/run/docker.sock:/var/run/docker.sock:ro` to allow access to the Docker socket.

### Status: no errors

If the Logs Agent status looks like the example in [Check the Agent status](#check-the-agent-status) but your logs still aren't reaching the Datadog platform, there could be a problem with one of the following:

* The required port (10516) for sending logs to Datadog is being blocked.
* Your container is using a different logging driver than the Agent expects.

#### Outbound traffic on port 10516 is blocked

The Datadog Agent sends its logs to Datadog over tcp via port 10516. If that connection is not available, logs fail to be sent and an error is recorded in the `agent.log` file to that effect.

Test manually your connection by running a telnet or openssl command like so (port 10514 would work too, but is less secure):

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

And then by sending a log like the following:

```text
<API_KEY> this is a test message
```

If opening the port 10514 or 10516 is not an option, it is possible to configure the Datadog Agent to send logs through HTTPS by setting the `DD_LOGS_CONFIG_USE_HTTP` environment variable to `true`:

#### Your containers are not using the JSON logging driver

Docker's default is the json-file logging driver so the Container Agent tries to read from this first. If your containers are set to use a different logging driver, the Logs Agent indicates that it is able to successfully find your containers but it isn't able to collect their logs. The Container Agent can also be configured to read from the journald logging driver.

1. If you're unsure of which logging driver your containers are using, use `docker inspect <CONTAINER_NAME>` to see what logging driver you have set. The following block appears in the Docker Inspect when the container is using the JSON logging driver:

    ```text
    "LogConfig": {
        "Type": "json-file",
        "Config": {}
    },
    ```

2. If the container is set to the journald logging driver the following block appears in the Docker Inspect:

    ```text
    "LogConfig": {
        "Type": "journald",
        "Config": {}
    },
    ```

3. To collect logs from the journald logging driver, set up the journald integration [following the Datadog-Journald documentation][2].

4. Mount the YAML file into your container following the instructions in the [Docker Agent documentation][3]. For more information on setting log drivers for Docker containers, [see this documentation][4].

## Agent doesn't send logs from containers that have persisted a large volume of logs (> 1GB)

The Docker daemon can have performances issues while it is trying to retrieve logs for containers for which it has already stored large logs files on disk. This could lead to read timeouts when the Datadog Agent is gathering the containers' logs from the Docker daemon. 

When it occurs, the Datadog Agent outputs a log containing `Restarting reader after a read timeout` for a given container every 30 seconds and stops sending logs from that container while it is actually logging messages.

The default read timeout is set to 30 seconds, increasing this value gives more time to the Docker daemon to reply to the Datadog Agent. This value can be set in `datadog.yaml` using the `logs_config.docker_client_read_timeout` parameter or by using the environment variable `DD_LOGS_CONFIG_DOCKER_CLIENT_READ_TIMEOUT`. This value is a duration in seconds, find below an example increasing it to 60 seconds:

```yaml
logs_config:
  docker_client_read_timeout: 60
```

## Host Agent
### Agent user in the Docker group

If you're using the Host Agent, the user `dd-agent` needs to be added to the Docker group to have permission to read from the Docker socket. If you see the following error logs in the `agent.log` file:

```text
2019-10-11 09:17:56 UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied

2019-10-11 09:17:56 UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

To add the host Agent to the Docker user group, perform the following command: `usermod -a -G docker dd-agent`.

[1]: /help/
[2]: /integrations/journald/#setup
[3]: /agent/docker/?tab=standard#mounting-conf-d
[4]: https://docs.docker.com/config/containers/logging/journald/
