---
title: Process collection with Agent v5
kind: faq
---

## Standard Agent Configuration

**Live Processes has been introduced in Datadog Agent version 5.16.0.**  
Refer to the instructions for standard [Agent installation][1] for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the [configuration file][2] at :

```
/etc/dd-agent/datadog.conf
```

and adding the following line to the `[Main]` section:
```
    process_agent_enabled: true
```

After configuration is complete, [restart the Agent][3].  
**Note**: To collect container information in the standard install, the dd-agent user needs to have permissions to access docker.sock.

## Docker container

Update to the Datadog Agent image version 5.16.0 or above:

    $ docker pull datadog/docker-dd-agent

Follow the instructions for [docker-dd-agent][4], passing in the following attributes, in addition to any other custom settings as appropriate:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

## Kubernetes Daemonset

In the [dd-agent.yaml][5] manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

```
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

Refer to the standard [daemonset installation][6] and the [docker-dd-agent][4] information pages for further documentation.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/faq/where-is-the-configuration-file-for-the-agent
[3]: /agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://github.com/DataDog/docker-dd-agent
[5]: https://github.com/DataDog/docker-dd-agent#configuration-files
[6]: /integrations/kubernetes/#installation-via-daemonsets-kubernetes-110
