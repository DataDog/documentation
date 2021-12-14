---
title: Mitigating the Risk of Log4Shell
kind: faq
---

If you are using the Datadog Agent between versions v7.17.0/v6.17.0 and v7.32.2/v6.32.2, you may be impacted by the vulnerability presented by Log4Shell (CVE-2021-44228). If you are using an Agent earlier than v7.17.0/v6.17.0, you should not be impacted by the vulnerability unless you configured log4j to log with the JMS Appender (an option that is not supported by the Agent, but if you did it, disable the appender).

**If you are on an impacted version, to mitigate the vulnerability, the best option is to upgrade your Datadog Agent to v7.32.2 (v6.32.2) or later.** 

If you are not able to upgrade your Agent at this time, use these instructions to implement an environment variable (`LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` on the JMXFetch process or the Agent process) to mitigate the vulnerability: 

## Host installs

On Linux, the instructions depend on the init system and on the distribution:

### Systemd-based systems:

#### RedHat/CentOS 7 and 8; Amazon Linux 2; SUSE 12+; Ubuntu 16.04+/Debian 8+

1. Create an override file with the following contents at `/etc/systemd/system/datadog-agent.service.d/log4j_override.conf`:
    ```
    [Service]
    Environment="LOG4J_FORMAT_MSG_NO_LOOKUPS=true"
    ```
2. Reload the systemd service definitions: `sudo systemctl daemon-reload`
3. Restart the datadog-agent service: `sudo systemctl datadog-agent restart`


### Upstart-based systems 

Instructions are different depending on the Linux distribution:

#### Ubuntu 14.04

1. Create an override file with the following contents at `/etc/init/datadog-agent.override`:
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Stop and start the datadog-agent service: `sudo stop datadog-agent && sudo start datadog-agent`

**Note**: Use `start` and `stop`, because `restart` does not pick up the service configuration change.

#### RedHat/Centos 6; Amazon Linux 1:

1. Add the following line at the end of the existing `/etc/init/datadog-agent.conf` file:
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Stop and start the datadog-agent service: `sudo stop datadog-agent && sudo start datadog-agent`

**Note**: Use `start` and `stop`, because `restart` does not pick up the service configuration change.

**Note**: The `/etc/init/datadog-agent.conf` file is overwritten when the Agent is re-installed, upgraded, or downgraded, you must run these steps again if you upgrade, downgrade, or reinstall the Agent until you upgrade the Agent to v7.32.2/v6.32.2 or above.

### Windows

1. Run an administrator PowerShell on the machine.
2. Run the following snippet:
    ```
    [Environment]::SetEnvironmentVariable("LOG4J_FORMAT_MSG_NO_LOOKUPS", "true", "Machine")
    ```
3. Restart the Datadog Agent service to apply the changes.

**Note**: This applies to all JVMs running on the host.

### AIX

`Jmxfetch.jar` is included in the AIX agent install bundle, but there is no code in the AIX agent that runs the `jmxfetch` code. If you are not manually starting the `jmxfetch` process, the `jmxfetch.jar` is not used and can be deleted from `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`.

If you are manually running the `jmxfetch.jar`, pass the following flag to the Java process: `‐Dlog4j2.formatMsgNoLookups=True`


## Containerized Agent

### Docker (Linux and Windows)

Specify the following environment variable when running the datadog-agent container, by adding it to the `docker run` command: `-e LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`

### Kubernetes

Set the environment variable `LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` on the `agent` container, or on all Datadog containers. With the official Datadog Helm chart, add the environment variable to the list under the `datadog.env` value, for example:

```
datadog:
  env:
    - name: "LOG4J_FORMAT_MSG_NO_LOOKUPS"
      value: "true"
```
