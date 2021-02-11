---
title: Process collection with Agent v5
kind: faq
private: true
---

## Standard Agent configuration

**Live Processes is available in Datadog Agent version 5.16.0.**
Refer to the instructions for standard [Agent installation][1] for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the [configuration file][2] at:

```text
/etc/dd-agent/datadog.conf
```

and adding the following line to the `[Main]` section:

```yaml
    process_agent_enabled: true
```

After configuration is complete, [restart the Agent][3].
**Note**: To collect container information in the standard install, the `dd-agent` user needs to have permissions to access `docker.sock`.

## Docker container

Update to Datadog Agent image version 5.16.0 or above:

    $ docker pull gcr.io/datadoghq/docker-dd-agent

Follow the instructions for [docker-dd-agent][4], passing in the following attributes, in addition to any other custom settings as appropriate:

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

## Kubernetes DaemonSet

In the [dd-agent.yaml][5] manifest used to create the DaemonSet, add the following environment variables, volume mount, and volume:

```yaml
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

Refer to the standard [DaemonSet installation][6] and the [docker-dd-agent][4] information pages for further documentation.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/faq/where-is-the-configuration-file-for-the-agent/
[3]: /agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: https://github.com/DataDog/docker-dd-agent
[5]: https://github.com/DataDog/docker-dd-agent#configuration-files
[6]: /agent/kubernetes/
