---
title: Kubernetes process collection
kind: documentation
---

### Kubernetes Daemonset

In the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

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