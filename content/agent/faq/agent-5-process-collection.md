---
title: Process collection with agent v5
kind: faq
---


## Standard Agent Configuration

**Live Processes has been introduced in Datadog Agent version 5.16.0.**  
Refer to the instructions for standard [Agent installation][1] for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the [configuration file](/agent/faq/where-is-the-configuration-file-for-the-agent) at :

```
/etc/dd-agent/datadog.conf
```

and adding the following line to the `[Main]` section:
```
    process_agent_enabled: true
```

After configuration is complete, [restart the Agent](/agent/faq/agent-commands/#start-stop-restart-the-agent).  
**Note**: To collect container information in the standard install, the dd-agent user needs to have permissions to access docker.sock.

## Docker container

Update to the Datadog Agent image version 5.16.0 or above:

    $ docker pull datadog/docker-dd-agent

Follow the instructions for [docker-dd-agent](https://github.com/DataDog/docker-dd-agent), passing in the following attributes, in addition to any other custom settings as appropriate:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

## Kubernetes Daemonset

In the [dd-agent.yaml](https://github.com/DataDog/docker-dd-agent#configuration-files) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

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

Refer to the standard [daemonset installation](/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) and the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) information pages for further documentation.
